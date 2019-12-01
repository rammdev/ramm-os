import path from "path"
import fs from "fs-extra"
import getURLTitle from "get-url-title"
import joinURL from "url-join"
import isURL from "is-url-superb"
import scrape from "website-scraper"
import Store from "electron-store"
import urlExists from "url-exist"
import _ from "lodash"
import download from "download"
import got from "../utils/got"

import getExtension from "../utils/get-extension"
import dirs from "../utils/data/dirs"
import yarn from "../utils/yarn"
import snackBarMessage from "./snackbar-message"
import loadApp from "./load-app"
import handleError from "./handle-error"

const appsdb = new Store({
    cwd: path.join("ramm-os", "apps"),
    encryptionKey: "PcdYdENvsstlnBxOxdYAwwrKQgQrSDkJ",
})

const installApp = async (conf, { alert = true, internal = false } = {}) => {
    try {
        if (_.isString(conf) && isURL(conf)) {
            const url = joinURL(conf, "ramm.app.json")
            if (await urlExists(url)) {
                return (await got(url).json()).body
            }

            const title = getURLTitle(conf)
            if (await fs.pathExists(path.join(dirs.store, "appdata", title))) {
                await scrape({
                    urls: [conf],
                    directory: path.join(dirs.store, "appdata", title),
                })
                const opts = {
                    id: title,
                    name: title,
                    start: "index.html",
                }
                appsdb.set(conf.id, opts)
                loadApp(opts, internal)
                if (alert) {
                    snackBarMessage(
                        `Finished installing ${conf.name}.`,
                        0.1,
                    )
                }
            } else {
                loadApp(
                    {
                        id: title,
                        name: title,
                        start: "index.html",
                    },
                    internal,
                )
                if (alert) {
                    snackBarMessage("App already installed!")
                }
            }
        } else if (conf.type !== "ramm-app") snackBarMessage("App does not identify itself as a RAMM OS app.")
        else if (conf.spec !== 0) snackBarMessage("App does not specify a valid spec version.")
        else if (appsdb.has(conf.id)) {
            if (alert) snackBarMessage("App already installed!")
            loadApp(conf, internal)
        } else if (internal) {
            appsdb.set(conf.id, conf)
            if (conf.elevated && conf.dependencies) {
                const deps = _
                    .chain(conf.dependencies)
                    .entries()
                    .map(([key, value]) => `${key}@${value}`)
                    .value()

                yarn("add", ...deps)
                loadApp(conf, internal)
            }
        } else {
            await download(conf.source, dirs.temp, {
                extract: true,
                filename: `${conf.id}.${getExtension(conf.source)}`,
            })
            appsdb.set(conf.id, conf)
            if (conf.elevated && conf.dependencies) {
                const deps = _
                    .chain(conf.dependencies)
                    .entries()
                    .map(([key, value]) => `${key}@${value}`)
                    .value()

                yarn("add", ...deps)
                loadApp(conf, internal)
                if (alert) snackBarMessage(`Finished installing ${conf.name}.`, 0.1)
            }
        }
    } catch (err) {
        handleError(err)
        throw err
    }
}

export default installApp
