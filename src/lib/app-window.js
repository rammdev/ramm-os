import path from "path"
import * as mdc from "material-components-web"
import isColour from "is-color"
import fs from "fs-extra"

const html = fs.readFileSync(path.join(__dirname, "app.html"), "utf8")

import Store from "electron-store"

const appsdb = new Store({
	cwd: path.join("ramm-os", "apps"),
	encryptionKey: "PcdYdENvsstlnBxOxdYAwwrKQgQrSDkJ"
})

const defineReadOnly = (object, key, value) => Object.defineProperty(object, key, {
	writable: false,
	configurable: false,
	enumerable: true,
	value
})

import esImport from "../utils/es-import"

const depAllowed = (id, name) => name.startsWith(".") || Object.keys(appsdb.get(id).dependencies).includes(name)

/**
* App Window.
*/
class AppWindow extends HTMLElement {
	/**
    * Constructor.
    */
	constructor() {
		super()

		const eln = this.attachShadow({ mode: "open" })

		const element = $(eln)
		const host = $(eln.host)

		element.prepend(html)

		$(this).ready(() => {
			$(eln.host.innerHTML).appendTo(element.find(".app__content"))
			host.empty()

			element.makeDraggable()

			element.find(".app__content .resizable").get(0)
			element.find(".mdc-top-app-bar__title").text(host.attr("data-name"))

			const themecolour = host.attr("data-theme")
			if (isColour(themecolour)) {
				element.find(".app__header").css("background-color", themecolour)
			}

			new ResizeObserver(entries => {
				entries.forEach(({ contentRect }) => {
					element.find(".app__header, .app__container").css(
						"width",
						contentRect.width
					)
					element.find(".app__content").css("height", contentRect.height)
				})
			}).observe(element.find(".app__content .resizable").get(0))

			host.mousedown(() => {
				$("app-window").css("z-index", 0)
				host.css("z-index", 1)
			})
			mdc.autoInit(element.get(0))
			element.find(".mdc-icon-button[data-mdc-auto-init=\"MDCRipple\"]").each(
				(_, { MDCRipple }) => {
					MDCRipple.unbounded = true
				}
			)

			element.find(".app__close").click(() => host.remove())

			const height = $(window).height() * 0.5
			const width = $(window).width() * 0.6
			element.find(".app__header, .app__container, .resizable").css("width", width)
			element.find(".app__content, .resizable").css("height", height)

			const { contentWindow } = element.find("iframe").get(0)
			if (appsdb.get(host.attr("data-id")).elevated) {
				defineReadOnly(contentWindow, "require", name => {
					if (depAllowed(host.attr("data-id"), name)) {
						return require(name)
					}

					throw new Error("Not allowed to access dependency!")
				})
				defineReadOnly(contentWindow, "import", name => {
					if (depAllowed(host.attr("data-id"), name)) {
						return esImport(name)
					}

					throw new Error("Not allowed to access dependency!")
				})
			}
		})
	}
}

export default AppWindow
