Sentry.init({ dsn: "https://cb72fbe9805041d8b198e64b3ed1f7d4@sentry.io/1507690" })

import { remote } from "electron"

const mainWindow = remote.getCurrentWindow()
const eapp = remote.app

import path from "path"
import * as Sentry from "@sentry/electron"

// Import Vue from "vue/dist/vue.min.js"
// Vue.config.productionTip = false

import isURL from "is-url-superb"

import fs from "fs-extra"

import dayjs from "dayjs"

fs.ensureDir(dirs.data)

import * as mdc from "material-components-web"

import Store from "electron-store"
import got from "got"
import installApp from "./lib/install-app"

import dirs from "./utils/data/dirs"

const appsdb = new Store({
	cwd: path.join("ramm-os", "apps"),
	encryptionKey: "PcdYdENvsstlnBxOxdYAwwrKQgQrSDkJ"
})

import AppWindow from "./lib/app-window"
import handleError from "./lib/handle-error"

customElements.define("app-window", AppWindow)

window.addEventListener("load", async () => {
	window.$ = require("jquery")

	// Define Vue app
	// const app = new Vue({
	//     el: ".app",
	// })

	mdc.autoInit()

	// Fix the ripples of each icon button
	$(".mdc-icon-button[data-mdc-auto-init=\"MDCRipple\"]").each(
		(_, { MDCRipple }) => {
			MDCRipple.unbounded = true
		}
	)

	$(".action__close").click(() => mainWindow.close())
	$(".action__full").click(() => {
		mainWindow.setFullScreen(!mainWindow.isFullScreen())
		if (mainWindow.isFullScreen()) {
			$(".action__full svg").html(`<path fill="none" d="M0 0h24v24H0V0z" />
            <path d="M5 16h3v3h2v-5H5v2zm3-8H5v2h5V5H8v3zm6 11h2v-3h3v-2h-5v5zm2-11V5h-2v5h5V8h-3z" />`)
			$(".action__full").attr("aria-label", "Windowed Mode")
			$(".action__full-text").html("Windowed Mode")
		} else {
			$(".action__full svg").html(
				"<path fill=\"none\" d=\"M0 0h24v24H0V0z\"/><path d=\"M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z\"/>"
			)
			$(".action__full").attr("aria-label", "Fullscreen Mode")
			$(".action__full-text").html("Fullscreen Mode")
		}
	})
	$(".action__devtools").click(() => mainWindow.toggleDevTools())

	const setTime = () => $(".footer__time").html(dayjs().format("h:mm a"))

	setTime()
	setInterval(setTime, 1000)

	$(".app__drawer")
		.get(0)
		.MDCMenu.hoistMenuToBody()

	const windowResized = () => {
		$(".app__drawer")
			.get(0)
			.MDCMenu.setAbsolutePosition(
				$(window).width() - 16,
				$(window).height() - 80
			)
	}

	$(window).on("resize", windowResized)
	$(window).trigger("resize")

	$(".footer__apps").click(() => {
		$(".app__drawer").get(0).MDCMenu.open = !$(".app__drawer").get(0).MDCMenu.open
	})

	$(".install__start").click(() =>
		$(".install__dialog")
			.get(0)
			.MDCDialog.open()
	)

	$(".install__dialog")
		.get(0)
		.MDCDialog.listen("MDCDialog:closing", async ({ detail }) => {
			// Testing string: json:%7B%22type%22:%22ramm-app%22,%22spec%22:0,%22id%22:%22hello-world%22,%22name%22:%22Hello%20World%22%7D
			if (detail.action === "install") {
				if ($(".install__uri").get(0).MDCTextField.value === "") {
					return
				}

				const uri = $(".install__uri").get(0).MDCTextField.value
				try {
					if (isURL(uri)) {
						installApp(uri)
					} else {
						const { protocol } = new URL(uri)
						if (protocol in ["http:", "https:"]) {
							installApp(await got(uri).json())
						} else if (protocol === "json:") {
							installApp(JSON.parse(decodeURI(uri).replace("json:", "")))
						} else if (protocol === "file:") {
							const data = await fs.readJSON(decodeURI(uri).replace("file:///", ""), "utf8")
							installApp(data)
						} else {
							const data = await fs.readFile(path.resolve(uri), "utf8")
							installApp(data)
						}

						$(".install__uri").get(0).MDCTextField.value = ""
					}
				} catch (error) {
					handleError(error)
				}
			}
		})

	eapp.on("open-url", (event, url) => {
		event.preventDefault()

		console.warn("open-url", `You arrived from: ${url}`)
	})

	$.fn.makeDraggable = function () {
		let pos1 = 0
		let pos2 = 0
		let pos3 = 0
		let pos4 = 0

		const dragMouseDown = event => {
			event.preventDefault()
			pos3 = event.clientX
			pos4 = event.clientY
			$(document).on("mouseup", closeDragElement)
			$(document).on("mousemove", elementDrag)
		}

		this.find("header").on("mousedown", dragMouseDown)

		const elementDrag = event => {
			event.preventDefault()
			pos1 = pos3 - event.clientX
			pos2 = pos4 - event.clientY
			pos3 = event.clientX
			pos4 = event.clientY
			const element = $(this.get(0).host || this)
			const vals = element.offset()
			element.css({
				top: `${vals.top - pos2}px`,
				left: `${vals.left - pos1}px`
			})
		}

		const closeDragElement = () => {
			$(document).off("mouseup", closeDragElement)
			$(document).off("mousemove", elementDrag)
		}
	}

	$(".app__menu")
		.get(0)
		.MDCMenu.hoistMenuToBody()

	$(".main__content").on("contextmenu", event => {
		event.preventDefault()
		$(".app__menu")
			.get(0)
			.MDCMenu.setAbsolutePosition(event.clientX, event.clientY)
		$(".app__menu").get(0).MDCMenu.open = !$(".app__menu").get(0).MDCMenu.open
		return false
	})

	// TODO: Move functions to developer options and allow enabling of developer mode from about.
	window.wipeAppData = name => appsdb.delete(name)
	window.wipeAllApps = () => appsdb.clear()

	installApp(
		{
			type: "ramm-app",
			spec: 0,
			id: "ros-calculator",
			name: "ROS Calculator",
			source: "",
			root: "apps/ros-calculator",
			icon: "resources/icon-48x48.png",
			start: "index.html",
			themecolour: "#4285f4"
		},
		{
			alert: false,
			internal: true
		}
	)

	installApp(
		{
			type: "ramm-app",
			spec: 0,
			id: "terminal",
			name: "Terminal",
			source: "",
			root: "apps/terminal",
			icon: "icon.svg",
			start: "index.html",
			themecolour: "#4285f4",
			elevated: true,
			dependencies: {
				jquery: "^3.4.1",
				"jquery.terminal": "^3.6.3",
				"normalize.css": "^8.0.1",
				"python-bridge": "^1.1.0"
			}
		},
		{
			alert: false,
			internal: true
		}
	)
	window.require = require
	installApp(
		{
			type: "ramm-app",
			spec: 0,
			id: "about",
			name: "About",
			source: "",
			root: "apps/about",
			icon: "icon.svg",
			start: "index.html",
			themecolour: "#4285f4",
			elevated: true
		},
		{
			alert: false,
			internal: true
		}
	)
})
