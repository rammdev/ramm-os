import path from "path"

import url from "url"

import request from "../utils/request"
import requestjson from "../utils/requestjson"

import extract from "../utils/extract"

import urlExists from "../utils/url-exists"

import scrape from "website-scraper"

import Store from "electron-store"

const appsdb = new Store({
    cwd: path.join("ramm-os", "apps"),
    encryptionKey: "PcdYdENvsstlnBxOxdYAwwrKQgQrSDkJ"
})

import isUrl from "is-url"

import loadApp from "./loadApp"

import yarn from "../utils/yarn"

export default (conf, {alert = true, internal = false} = {}) => {
    if (isUrl(conf)) {
        urlExists(url.resolve(conf, "ramm.app.json")).then((exists) => {
            if (exists) {
                requestjson(url.resolve(conf, "ramm.app.json"))
                    .then(() => installApp(body))
                    .catch(({message}) => snackBarMessage(`Something bad just happened. (${message})`))
            } else {
                request(`https://textance.herokuapp.com/rest/title/${encodeURI(conf)}`)
                    .then((res) => {
                        fs.pathExists(path.join(dirs.store, "appdata", body))
                            .then((exists) => {
                                if (!exists) {
                                    scrape({
                                        urls: [conf],
                                        directory: path.join(dirs.store, "appdata", body)
                                    }).then((_res) => {
                                        const c = {
                                            id: body,
                                            name: body,
                                            start: "index.html"
                                        }
                                        appsdb.set(conf.id, c)
                                        loadApp(c, internal)
                                        if (alert) {
                                            snackBarMessage(
                                                `Finished installing ${conf.name}.`,
                                                0.1
                                            )
                                        }
                                    })
                                } else {
                                    loadApp(
                                        {
                                            id: body,
                                            name: body,
                                            start: "index.html"
                                        },
                                        internal
                                    )
                                    if (alert) {
                                        snackBarMessage("App already installed!")
                                    }
                                }
                            })
                    })
                    .catch(({message}) => snackBarMessage(
                        `Something bad just happened. (${err.message})`
                    ))
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
            if (conf.elevated && conf.dependencies) yarn.apply(null, ["add", ...Object.entries(conf.dependencies).map((val) => `${val[0]}@${val[1]}`)]).finally(() => loadApp(conf, internal))
            else loadApp(conf, internal)
        } else {
            const filename = `${conf.id}.${conf.source.split(".").i(-1)}`
            request(conf.source, (err, _res, _body) => {
                if (err) {
                    snackBarMessage(`Something bad just happened. (${err.message})`)
                }
                extract(path.join(dirs.temp, filename), {
                    dir: path.join(dirs.store, "appdata", conf.id)
                }).then((err) => {
                    if (err) snackBarMessage(`Something bad just happened. (${err.message})`)
                })
                appsdb.set(conf.id, conf)
                if (conf.elevated && conf.dependencies) yarn.apply(null, ["add", ...Object.entries(conf.dependencies).map((val) => `${val[0]}@${val[1]}`)]).finally(() => loadApp(conf, internal))
                else loadApp(conf, internal)
                if (alert) snackBarMessage(`Finished installing ${conf.name}.`, 0.1)
            }).pipe(fs.createWriteStream(path.join(dirs.temp, filename)))
        }
    }
}
