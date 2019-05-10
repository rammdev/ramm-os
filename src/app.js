const electron = require("electron")

require("electron-compile/lib/initialize-renderer").initializeRendererProcess(electron.remote.getGlobal("globalCompilerHost").readOnlyMode)

const mainWindow = electron.remote.getCurrentWindow()

import Vue from "vue/dist/vue.min.js"

import path from "path"

// Provide improved filesystem functions
const fs = require("graceful-fs").gracefulify(require("fs"))

import {
    Promise
} from "bluebird"

import Store from "electron-store"
const db = new Store({
    cwd: "settings",
})

import * as mdc from "material-components-web"

window.onload = () => {
    window.$ = require("jquery")

    // Define Vue app
    const app = new Vue({
        el: ".app"
    })

    mdc.autoInit()

    // Fix the ripples of each icon button
    $(".mdc-icon-button[data-mdc-auto-init=\"MDCRipple\"]").each((_, {
        MDCRipple,
    }) => MDCRipple.unbounded = true)

    $(".action__close").click(() => mainWindow.close())
    $(".action__full").click(() => mainWindow.setFullScreen(!mainWindow.isFullScreen()))
}
