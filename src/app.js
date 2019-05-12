const electron = require("electron")

require("electron-compile/lib/initialize-renderer").initializeRendererProcess(electron.remote.getGlobal("globalCompilerHost").readOnlyMode)

const mainWindow = electron.remote.getCurrentWindow()
const eapp = electron.remote.app

import Vue from "vue/dist/vue.min.js"
Vue.config.productionTip = false

import path from "path"

import {
    Promise,
} from "bluebird"

// Provide improved filesystem functions
const fs = require("graceful-fs").gracefulify(require("fs"))

import dayjs from "dayjs"

import Store from "electron-store"

const appsdb = new Store({
    cwd: path.join("ramm-os", "apps"),
    encryptionKey: "PcdYdENvsstlnBxOxdYAwwrKQgQrSDkJ",
})

const db = new Store({
    cwd: path.join("ramm-os", "settings"),
    encryptionKey: "jRZgcRQztwgPUAFEFpYVLsIXyHVnWbaS",
})

import isColour from 'is-color';

const userAgent = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.108 Safari/537.36"

const request = require("request").defaults({
    gzip: true,
    method: "GET",
    headers: {
        "User-Agent": userAgent,
    },
})

const requestjson = request.defaults({
    json: true,
})

const githubapi = request.defaults({
    json: true,
    headers: {
        "Accept": "application/vnd.github.v3+json",
    },
})

import * as mdc from "material-components-web"

window.onload = () => {
    window.$ = require("jquery")

    // Define Vue app
    const app = new Vue({
        el: ".app",
    })

    mdc.autoInit()

    // Fix the ripples of each icon button
    $(`.mdc-icon-button[data-mdc-auto-init="MDCRipple"]`).each((_, {
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

    const loadApp = conf => {
        const el = $(".drawer__user").append(`
            <div class="mdc-layout-grid__cell drawer__app">
                <button class="drawer__icon mdc-icon-button" aria-label="${conf.name}" data-mdc-auto-init="MDCRipple">
                    <img src="${path.resolve(conf.source, conf.icon)}" alt="${conf.name} icon" height="24" width="24">
                </button>
                <p class="drawer__title mdc-typography--caption">${conf.name}</p>
            </div>
        `)
        el.find(".drawer__icon").click(() => launchApp(conf))
        mdc.autoInit($(".drawer__user").children().last().get(0))
        $(`.mdc-icon-button[data-mdc-auto-init="MDCRipple"]`).each((_, {
            MDCRipple,
        }) => MDCRipple.unbounded = true)
    }

    const installApp = (conf, notify = true) => {
        if (conf.type !== "ramm-app") return
        if (conf.spec !== 0) return
        appsdb.set(conf.id, conf)
        loadApp(conf)
        if (notify) snackBarMessage(`Finished installing ${conf.name}.`, 0.1)
    }

    $(".install__start").click(() => $(".install__dialog").get(0).MDCDialog.open())

    $(".install__dialog").get(0).MDCDialog.listen("MDCDialog:closing", ({
        detail
    }) => {
        // Testing string: json:%7B%22type%22:%22ramm-app%22,%22spec%22:0,%22id%22:%22hello-world%22,%22name%22:%22Hello%20World%22%7D
        if (detail.action === "install") {
            if ($(".install__uri").get(0).MDCTextField.value === "") return
            const uri = $(".install__uri").get(0).MDCTextField.value
            const protocol = uri.split(":")[0]
            if (protocol in ["http", "https"]) {
                requestjson(uri, (err, _res, body) => {
                    if (err) snackBarMessage(`Something bad just happened. (${err.message})`)
                    installApp(body)
                })
            } else if (protocol === "json") {
                installApp(JSON.parse(decodeURI(uri).replace("json:", "")))
            } else if (protocol === "file") {
                fs.readFile(decodeURI(uri).replace("file:///", ""), "utf8", (err, data) => {
                    if (err) snackBarMessage(`Something bad just happened. (${err.message})`)
                    installApp(JSON.parse(data))
                })
            } else {
                fs.readFile(path.resolve(uri), "utf8", (err, data) => {
                    if (err) snackBarMessage(`Something bad just happened. (${err.message})`)
                    installApp(JSON.parse(data))
                });
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

    const launchApp = conf => {
        const el = $(`
        <div class="app__container mdc-elevation--z8">
        <header class="app__header mdc-top-app-bar mdc-top-app-bar--dense">
            <div class="mdc-top-app-bar__row">
                <section class="mdc-top-app-bar__section mdc-top-app-bar__section--align-start">
                    <span class="mdc-top-app-bar__title">${conf.name}</span> </section>
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
        </div>
        `)
        const height = $(window).height() * 0.6
        const width = $(window).width() * 0.6
        el.find(".app__header").css("width", width)
        el.append($("<iframe>").attr({
            src: path.resolve(conf.source, conf.start),
            frameborder: 0,
            height: height,
            width: width
        }).css({
            resize: "both"
        }))
        new ResizeObserver(entries => {
            entries.forEach(({contentRect}) => {
                el.find(".app__header").css("width", contentRect.width)
            })
        }).observe(el.find("iframe").get(0));
        // const themeMatch = (/<meta name="theme-color" content="(.+)">/).exec(el.find("iframe").contents().find("html"))
        // console.log(el.find("iframe").contents().find("body"))
        // const themeColour = themeMatch ? themeMatch[0] : undefined
        // if (isColour(themeColour)) el.find(".app__header").css("background-color", themeColour)
        if (isColour(conf.themecolour)) el.find(".app__header").css("background-color", conf.themecolour)

        el.appendTo(".main__content").makeDraggable()
        // el.append(`<div class="shadow">`)
        // console.log(el.find(".shadow").get(0))
        // let shadow = el.find(".shadow").get(0).attachShadow({
        //     mode: 'open'
        // });
        // fs.readFile(path.join(conf.source, conf.start), "utf8", (err, data) => {
        //     if (err) snackBarMessage(`Something bad just happened. (${err.message})`)
        //     console.log(data)
        //     // shadow.innerHTML = data
        //     el.find("iframe").contents().find(":root").html(data)
        // })
        el.find(".app__close").click(() => el.remove())
        mdc.autoInit(el.get(0))
        el.find(`.mdc-icon-button[data-mdc-auto-init="MDCRipple"]`).each((_, {
            MDCRipple,
        }) => MDCRipple.unbounded = true)
    }

    installApp({
        type: "ramm-app",
        spec: 0,
        id: "ros-calculator",
        name: "ROS Calculator",
        source: "src/apps/ros-calculator",
        icon: "resources/icon-48x48.png",
        start: "index.html",
        themecolour: "#4285f4"
    }, false)
}
