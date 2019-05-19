// setImmediate Polyfill
const _setImmediate = setImmediate
process.once("loaded", () => global.setImmediate = _setImmediate)

import electron from "electron"

const mainWindow = electron.remote.getCurrentWindow()
const eapp = electron.remote.app

// import Vue from "vue/dist/vue.min.js"
// Vue.config.productionTip = false

import path from "path"

const extract = Promise.promisify(require("extract-zip"))

import scrape from "website-scraper"

import isUrl from "is-url"

const dirs = {
    temp: path.join(require("temp-dir"), "ramm-os"), // Temporary directory
    store: path.join((electron.app || electron.remote.app).getPath("appData"), "ramm-os"), // Storage directory
}

Array.prototype.i = function(val) {
    if (val < 0) return this[this.length - Math.abs(val)]
    return this[val]
}

import {
    Promise,
} from "bluebird"

// Provide improved filesystem functions
const fs = require("graceful-fs").gracefulify(require("fs"))

import dayjs from "dayjs"

import url from "url"

import Store from "electron-store"

const appsdb = new Store({
    cwd: path.join("ramm-os", "apps"),
    encryptionKey: "PcdYdENvsstlnBxOxdYAwwrKQgQrSDkJ",
})

const db = new Store({
    cwd: path.join("ramm-os", "settings"),
    encryptionKey: "jRZgcRQztwgPUAFEFpYVLsIXyHVnWbaS",
})

import isColour from "is-color"

const userAgent = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.108 Safari/537.36"

const request = require("request").defaults({
    gzip: true,
    method: "GET",
    headers: {
        "User-Agent": userAgent,
    },
})

const urlExists = (url) => new Promise((resolve, reject) => request.head(url).on("response", (res) => resolve(res.statusCode.toString()[0] === "2")).on("error", (err) => reject(err)))

const requestjson = request.defaults({
    json: true,
})

const githubapi = request.defaults({
    json: true,
    headers: {
        "Accept": "application/vnd.github.v3+json",
    },
})

const populateDirectory = (dir) => new Promise((resolve, reject) =>
    fs.access(dir, fs.constants.F_OK, (err) => {
        if (err) {
            fs.mkdir(dir, {
                recursive: true,
            }, (err) => {
                if (err) reject(err)
                resolve(true)
            })
        } else resolve(false)
    })
)
populateDirectory(dirs.temp)
populateDirectory(dirs.store)

import * as mdc from "material-components-web"

class AppWindow extends HTMLElement {
    constructor() {
        super();
        const el = $(this.attachShadow({
            mode: 'open'
        }))
        window.t = this
        const content = $(this).html()
        console.log($(this).attr())
        el.empty().append(`
            <link rel="stylesheet" href="..\\node_modules\\material-components-web\\dist\\material-components-web.min.css">
            <style>
                .app__container {
                    position: absolute;
                }

                .app__drawer {
                    z-index: 6;
                }

                .app__header {
                    z-index: 0;
                    position: absolute;
                    top: 0;
                }
            </style>
            <div class="app__container mdc-elevation--z8">
            <header class="app__header mdc-top-app-bar mdc-top-app-bar--dense">
                <div class="mdc-top-app-bar__row">
                    <section class="mdc-top-app-bar__section mdc-top-app-bar__section--align-start">
                        <span class="mdc-top-app-bar__title">${$(this).attr("data-name") || "App"}</span> </section>
                    <section class="mdc-top-app-bar__section mdc-top-app-bar__section--align-end">
                        <button class="app__close mdc-icon-button mdc-top-app-bar__action-item--unbounded" title="Search" data-mdc-auto-init="MDCRipple">
                            <svg class="mdc-icon-button__icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                <path fill="none" d="M0 0h24v24H0V0z"/>
                                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"/>
                            </svg>
                        </button>
                    </section>
                </div>
            </header>
            <div class="mdc-top-app-bar--dense-fixed-adjust"></div>
            <div class="app__content">${content}</div>
            </div>
            <script src="..\\node_modules\\material-components-web\\dist\\material-components-web.min.js"></script>
        `)
        if (isColour($(this).attr("data-theme"))) el.find(".app__header").css("background-color", $(this).attr("data-theme"))
        el.makeDraggable()
        const height = $(window).height() * 0.6
        const width = $(window).width() * 0.6
        el.find(".app__header, .app__container").css("width", width)
        // el.append($("<iframe>").attr({
        //     src: path.resolve(dirs.store, "appdata", id, root || "", start),
        //     frameborder: 0,
        //     height,
        //     width,
        // }).css({
        //     resize: "both",
        // }))
        $(".app__content").css({
            "height": height,
            "resize": "both"
        })
        new ResizeObserver((entries) => {
            entries.forEach(({
                contentRect,
            }) => {
                el.find(".app__header").css("width", contentRect.width)
            })
        }).observe(el.find(".app__content").get(0))
    }
}

customElements.define('app-window', AppWindow);

window.onload = () => {
    window.$ = require("jquery")

    // Define Vue app
    // const app = new Vue({
    //     el: ".app",
    // })

    mdc.autoInit()

    // Fix the ripples of each icon button
    $(".mdc-icon-button[data-mdc-auto-init=\"MDCRipple\"]").each((_, {
        MDCRipple,
    }) => MDCRipple.unbounded = true)

    $(".action__close").click(() => mainWindow.close())
    $(".action__full").click(() => {
        mainWindow.setFullScreen(!mainWindow.isFullScreen())
        if (mainWindow.isFullScreen()) {
            $(".action__full svg").html(`<path fill="none" d="M0 0h24v24H0V0z" />
            <path d="M5 16h3v3h2v-5H5v2zm3-8H5v2h5V5H8v3zm6 11h2v-3h3v-2h-5v5zm2-11V5h-2v5h5V8h-3z" />`)
            $(".action__full").attr("aria-label", "Windowed Mode")
            $(".action__full-text").html("Windowed Mode")
        } else {
            $(".action__full svg").html("<path fill=\"none\" d=\"M0 0h24v24H0V0z\"/><path d=\"M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z\"/>")
            $(".action__full").attr("aria-label", "Fullscreen Mode")
            $(".action__full-text").html("Fullscreen Mode")
        }
    })
    $(".action__devtools").click(() => mainWindow.toggleDevTools())

    const setTime = () => $(".footer__time").html(dayjs().format("h:mm a"))

    setTime()
    setInterval(setTime, 1000)

    $(".app__drawer").get(0).MDCMenu.hoistMenuToBody()

    const windowResized = () => {
        $(".app__drawer").get(0).MDCMenu.setAbsolutePosition($(window).width() - 16, $(window).height() - 80)
    }

    $(window).on("resize", windowResized)
    $(window).trigger("resize")

    $(".footer__apps").click(() => $(".app__drawer").get(0).MDCMenu.open = !$(".app__drawer").get(0).MDCMenu.open)

    // Ping sound
    const pingSound = new Audio("ping.ogg")

    // Display snackbar message
    const snackBarMessage = (message, volume = 0.0) => {
        const snackbar = $(".main__snackbar").get(0).MDCSnackbar
        snackbar.close()
        snackbar.labelText = message
        snackbar.open()
        if (volume > 0.0) {
            const audio = pingSound.cloneNode()
            audio.volume = volume
            audio.play()
        }
    }

    const loadApp = (conf) => {
        const el = $(".drawer__user").append(`
            <div class="mdc-layout-grid__cell drawer__app">
                <button class="drawer__icon mdc-icon-button" aria-label="${conf.name}" data-mdc-auto-init="MDCRipple">
                    <img src="${conf.icon ? path.join(dirs.store, "appdata", conf.id, conf.root, conf.icon) : "generic.svg"}" alt="${conf.name} icon" height="24" width="24">
                </button>
                <p class="drawer__title mdc-typography--caption">${conf.name}</p>
            </div>
        `)
        el.find(".drawer__icon").click(() => launchApp(conf))
        mdc.autoInit($(".drawer__user").children().last().get(0))
        $(".mdc-icon-button[data-mdc-auto-init=\"MDCRipple\"]").each((_, {
            MDCRipple,
        }) => MDCRipple.unbounded = true)
    }

    const installApp = (conf, notify = true) => {
        if (isUrl(conf)) {
            urlExists(url.resolve(conf, "ramm.app.json")).then((exists) => {
                if (exists) {
                    requestjson(url.resolve(conf, "ramm.app.json"), (err, _res, body) => {
                        if (err) snackBarMessage(`Something bad just happened. (${err.message})`)
                        installApp(body)
                    })
                } else {
                    request(`https://textance.herokuapp.com/rest/title/${encodeURI(conf)}`, (err, _res, body) => {
                        if (err) snackBarMessage(`Something bad just happened. (${err.message})`)
                        fs.access(path.join(dirs.store, "appdata", body), fs.constants.F_OK, (err) => {
                            if (err) {
                                scrape({
                                    urls: [conf],
                                    directory: path.join(dirs.store, "appdata", body),
                                }).then((_res) => {
                                    const c = {
                                        id: body,
                                        name: body,
                                        start: "index.html",
                                    }
                                    appsdb.set(conf.id, c)
                                    loadApp(c)
                                    if (notify) snackBarMessage(`Finished installing ${conf.name}.`, 0.1)
                                })
                            } else {
                                loadApp({
                                    id: body,
                                    name: body,
                                    start: "index.html",
                                })
                                if (notify) snackBarMessage("App already installed!")
                            }
                        })
                    })
                }
            })
        } else {
            if (conf.type !== "ramm-app") return
            if (conf.spec !== 0) return
            if (appsdb.has(conf.id)) {
                if (notify) snackBarMessage("App already installed!")
                loadApp(conf)
                return
            }
            const filename = `${conf.id}.${conf.source.split(".").i(-1)}`
            request(conf.source, (err, _res, _body) => {
                if (err) snackBarMessage(`Something bad just happened. (${err.message})`)
                extract(path.join(dirs.temp, filename), {
                    dir: path.join(dirs.store, "appdata", conf.id),
                }).then((err) => {
                    if (err) snackBarMessage(`Something bad just happened. (${err.message})`)
                })
                appsdb.set(conf.id, conf)
                loadApp(conf)
                if (notify) snackBarMessage(`Finished installing ${conf.name}.`, 0.1)
            }).pipe(fs.createWriteStream(path.join(dirs.temp, filename)))
        }
    }

    $(".install__start").click(() => $(".install__dialog").get(0).MDCDialog.open())

    $(".install__dialog").get(0).MDCDialog.listen("MDCDialog:closing", ({
        detail,
    }) => {
        // Testing string: json:%7B%22type%22:%22ramm-app%22,%22spec%22:0,%22id%22:%22hello-world%22,%22name%22:%22Hello%20World%22%7D
        if (detail.action === "install") {
            if ($(".install__uri").get(0).MDCTextField.value === "") return
            const uri = $(".install__uri").get(0).MDCTextField.value
            if (isUrl(uri)) {
                installApp(uri)
                return
            }
            const protocol = new URL(uri).protocol
            if (protocol in ["http:", "https:"]) {
                requestjson(uri, (err, _res, body) => {
                    if (err) snackBarMessage(`Something bad just happened. (${err.message})`)
                    installApp(body)
                })
            } else if (protocol === "json:") {
                installApp(JSON.parse(decodeURI(uri).replace("json:", "")))
            } else if (protocol === "file:") {
                fs.readFile(decodeURI(uri).replace("file:///", ""), "utf8", (err, data) => {
                    if (err) snackBarMessage(`Something bad just happened. (${err.message})`)
                    installApp(JSON.parse(data))
                })
            } else {
                fs.readFile(path.resolve(uri), "utf8", (err, data) => {
                    if (err) snackBarMessage(`Something bad just happened. (${err.message})`)
                    installApp(JSON.parse(data))
                })
            }
            $(".install__uri").get(0).MDCTextField.value = ""
        }
    })

    eapp.on("open-url", (event, url) => {
        event.preventDefault()

        console.warn("open-url", `You arrived from: ${url}`)
    })

    $.fn.makeDraggable = function() {
        let pos1 = 0
        let pos2 = 0
        let pos3 = 0
        let pos4 = 0

        const dragMouseDown = (e) => {
            e.preventDefault()
            pos3 = e.clientX
            pos4 = e.clientY
            document.onmouseup = closeDragElement
            document.onmousemove = elementDrag
        }

        this.find("header").on("mousedown", dragMouseDown)

        const elementDrag = (e) => {
            e.preventDefault()
            pos1 = pos3 - e.clientX
            pos2 = pos4 - e.clientY
            pos3 = e.clientX
            pos4 = e.clientY
            this.css({
                top: `${this.offset().top - pos2}px`,
                left: `${this.offset().left - pos1}px`,
            })
        }

        const closeDragElement = () => {
            document.onmouseup = null
            document.onmousemove = null
        }
    }

    const launchApp = ({
        name,
        id,
        root,
        start,
        themecolour,
    }) => {
        // const el = $(`
        // <div class="app__container mdc-elevation--z8">
        // <header class="app__header mdc-top-app-bar mdc-top-app-bar--dense">
        //     <div class="mdc-top-app-bar__row">
        //         <section class="mdc-top-app-bar__section mdc-top-app-bar__section--align-start">
        //             <span class="mdc-top-app-bar__title">${name}</span> </section>
        //         <section class="mdc-top-app-bar__section mdc-top-app-bar__section--align-end">
        //             <button class="app__close mdc-icon-button mdc-top-app-bar__action-item--unbounded" title="Search" data-mdc-auto-init="MDCRipple">
        //                 <svg class="mdc-icon-button__icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
        //                     <path fill="none" d="M0 0h24v24H0V0z"/>
        //                     <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"/>
        //                 </svg>
        //             </button>
        //         </section>
        //     </div>
        // </header>
        // <div class="mdc-top-app-bar--dense-fixed-adjust"></div>
        // </div>
        // `)
        const el = $("<app-window>").attr({
            "data-name": name,
            "data-theme": themecolour
        })
        const height = $(window).height() * 0.6
        const width = $(window).width() * 0.6
        el.find(".app__header").css("width", width)
        el.append($("<iframe>").attr({
            src: path.resolve(dirs.store, "appdata", id, root || "", start),
            frameborder: 0,
            height,
            width,
        }).css({
            resize: "both",
        }))
        new ResizeObserver((entries) => {
            entries.forEach(({
                contentRect,
            }) => {
                el.find(".app__header").css("width", contentRect.width)
            })
        }).observe(el.find("iframe").get(0))

        if (isColour(themecolour)) el.find(".app__header").css("background-color", )

        el.appendTo(".main__content").makeDraggable()
        el.find(".app__close").click(() => el.remove())

        mdc.autoInit(el.get(0))
        el.find(".mdc-icon-button[data-mdc-auto-init=\"MDCRipple\"]").each((_, {
            MDCRipple,
        }) => MDCRipple.unbounded = true)
    }

    $(".app__menu").get(0).MDCMenu.hoistMenuToBody()

    $(".main__content").on("contextmenu", (e) => {
        e.preventDefault()
        $(".app__menu").get(0).MDCMenu.setAbsolutePosition(e.clientX, e.clientY)
        $(".app__menu").get(0).MDCMenu.open = !$(".app__menu").get(0).MDCMenu.open
        return false
    })

    installApp({
        type: "ramm-app",
        spec: 0,
        id: "ros-calculator",
        name: "ROS Calculator",
        source: "https://github.com/Richienb/ros-calculator/archive/master.zip",
        root: "ros-calculator-master",
        icon: "resources/icon-48x48.png",
        start: "index.html",
        themecolour: "#4285f4",
    }, false)
}
