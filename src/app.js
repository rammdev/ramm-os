const electron = require("electron")

require("electron-compile/lib/initialize-renderer").initializeRendererProcess(electron.remote.getGlobal("globalCompilerHost").readOnlyMode)

const mainWindow = electron.remote.getCurrentWindow()

import Vue from "vue/dist/vue.min.js"

import path from "path"

// Provide improved filesystem functions
const fs = require("graceful-fs").gracefulify(require("fs"))

import {
    Promise,
} from "bluebird"

import dayjs from "dayjs"

import Store from "electron-store"
const db = new Store({
    cwd: "settings",
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

    $.fn.makeDraggable = function() {
        let pos1 = 0
        let pos2 = 0
        let pos3 = 0
        let pos4 = 0

        if ($(this).find("header")) $(this).find("header").on("mousedown", dragMouseDown)
        else $(this).on("mousedown", dragMouseDown)

        const dragMouseDown = e => {
            e.preventDefault()
            pos3 = e.clientX
            pos4 = e.clientY
            document.onmouseup = closeDragElement
            document.onmousemove = elementDrag
        }

        const elementDrag = e => {
            e.preventDefault()
            pos1 = pos3 - e.clientX
            pos2 = pos4 - e.clientY
            pos3 = e.clientX
            pos4 = e.clientY
            $(el).css("top", `${elmnt.offsetTop - pos2}px`)
            $(el).css("left", `${elmnt.offsetLeft - pos1}px`)
        }

        const closeDragElement = () => {
            document.onmouseup = null
            document.onmousemove = null
        }
    }

    const loadApp = conf => {

    }
}
