import * as Sentry from "@sentry/electron"
Sentry.init({ dsn: "https://cb72fbe9805041d8b198e64b3ed1f7d4@sentry.io/1507690" })

import { app, BrowserWindow } from "electron"

import isDev from "electron-is-dev"

require("update-electron-app")()

import path from "path"

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require("electron-squirrel-startup")) {
    // eslint-disable-line global-require
    app.quit()
}

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

const createWindow = () => {
    // Create the browser window.
    mainWindow = new BrowserWindow({
        width: 1280,
        height: 720,
        icon: path.join(__dirname, "icon.ico"),
        webPreferences: {
            nodeIntegration: false,
            nodeIntegrationInWorker: false,
            contextIsolation: false,
            preload: path.join(__dirname, "app-loader.js"),
            webSecurity: false,
            allowRunningInsecureContent: false,
        },
        fullscreen: true,
        frame: false,
        show: false,
    })

    mainWindow.once("ready-to-show", () => mainWindow.show())

    // and load the index.html of the app.
    mainWindow.loadURL(path.join(__dirname, "index.html"))

    // Open the DevTools.
    if (isDev) mainWindow.webContents.openDevTools()

    // Emitted when the window is closed.
    mainWindow.on("closed", () => {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        mainWindow = null
    })
}

app.setAsDefaultProtocolClient("rammos")

app.commandLine.appendSwitch("autoplay-policy", "no-user-gesture-required")

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", createWindow)

// Quit when all windows are closed.
app.on("window-all-closed", () => {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== "darwin") app.quit()
})

app.on("activate", () => {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (mainWindow === null) createWindow()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
