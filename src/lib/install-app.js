import path from "path"

import request from "../utils/request"
import requestjson from "../utils/requestjson"

import extract from "../utils/extract"

import urlExists from "../utils/url-exists"

import scrape from "website-scraper"

import Store from "electron-store"

const appsdb = new Store({
    cwd: path.join("ramm-os", "apps"),
    encryptionKey: "PcdYdENvsstlnBxOxdYAwwrKQgQrSDkJ",
})

import isUrl from "is-url"

import loadApp from "./load-app"

import yarn from "../utils/yarn"

import joinURL from "url-join"

import dirs from "../utils/data/dirs"

import snackBarMessage from "./snackbar-message"

import fs from "../utils/fs"

import handleError from "./handle-error"

const installApp = (conf, { alert = true, internal = false } = {}) => {
    if (isUrl(conf)) {
        urlExists(joinURL(conf, "ramm.app.json")).then((exists) => {
            if (exists) {
                return requestjson(joinURL(conf, "ramm.app.json"))
                    .then((res) => installApp(res))
                    .catch(handleError)
            } else {
                return request(`https://textance.herokuapp.com/rest/title/${encodeURI(conf)}`)
                    .then((res) => fs.pathExists(path.join(dirs.store, "appdata", res))
                        .then((exists) => {
                            if (!exists) {
                                scrape({
                                    urls: [conf],
                                    directory: path.join(dirs.store, "appdata", res),
                                }).then(() => {
                                    const c = {
                                        id: res,
                                        name: res,
                                        start: "index.html",
                                    }
                                    appsdb.set(conf.id, c)
                                    loadApp(c, internal)
                                    if (alert) {
                                        snackBarMessage(
                                            `Finished installing ${conf.name}.`,
                                            0.1
                                        )
                                    }
                                    return
                                })
                            } else {
                                loadApp(
                                    {
                                        id: res,
                                        name: res,
                                        start: "index.html",
                                    },
                                    internal
                                )
                                if (alert) {
                                    snackBarMessage("App already installed!")
                                }
                            }
                            return
                        })
                    )
                    .catch(handleError)
            }
        })
    } else {
        if (conf.type !== "ramm-app") return
        if (conf.spec !== 0) return
        if (appsdb.has(conf.id)) {
            if (alert) snackBarMessage("App already installed!")
            loadApp(conf, internal)
            return
        }
        if (internal) {
            appsdb.set(conf.id, conf)
            if (conf.elevated && conf.dependencies) Reflect.apply(yarn, null, ["add", ...Object.entries(conf.dependencies).map((val) => `${val[0]}@${val[1]}`)]).finally(() => loadApp(conf, internal))
            else loadApp(conf, internal)
        } else {
            const filename = `${conf.id}.${conf.source.split(".").i(-1)}`
            request(conf.source)
                .then(() => extract(path.join(dirs.temp, filename), {
                    dir: path.join(dirs.store, "appdata", conf.id),
                }))
                .then(() => {
                    appsdb.set(conf.id, conf)
                    if (conf.elevated && conf.dependencies) Reflect.apply(yarn, null, ["add", ...Object.entries(conf.dependencies).map((val) => `${val[0]}@${val[1]}`)]).finally(() => loadApp(conf, internal))
                    else loadApp(conf, internal)
                    if (alert) snackBarMessage(`Finished installing ${conf.name}.`, 0.1)
                    return
                })
                .catch(handleError)
                .pipe(fs.createWriteStream(path.join(dirs.temp, filename)))
        }
    }
}

export default installApp
