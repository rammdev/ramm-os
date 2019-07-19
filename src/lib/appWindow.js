import * as mdc from "material-components-web"

import isColour from "is-color"

import fs from "../utils/fs"

import path from "path"

const html = fs.readFileSync(path.join(__dirname, "app.html"), "utf8")

import Store from "electron-store"

const perms = new Store({
    cwd: path.join("ramm-os", "perms"),
    encryptionKey: "jRZgcRQztwgPUAFEFpYVLsIXyHVnWbaS",
})

const defineReadOnly = (obj, key, value) => Object.defineProperty(obj, key, {
    writable: false,
    configurable: false,
    enumerable: true,
    value
})

/**
* App Window.
*/
class AppWindow extends HTMLElement {
    /**
    * Constructor.
    */
    constructor() {
        super()

        const eln = this.attachShadow({mode: "open"})

        const el = $(eln)
        const host = $(eln.host)

        el.prepend(html)

        $(this).ready(() => {
            $(eln.host.innerHTML).appendTo(el.find(".app__content"))
            host.empty()

            el.makeDraggable()

            el.find(".app__content .resizable").get(0)
            el.find(".mdc-top-app-bar__title").text(host.attr("data-name"))

            const themecolour = host.attr("data-theme")
            if (isColour(themecolour)) {
                el.find(".app__header").css("background-color", themecolour)
            }

            new ResizeObserver((entries) => {
                entries.forEach(({contentRect}) => {
                    el.find(".app__header, .app__container").css(
                        "width",
                        contentRect.width
                    )
                    el.find(".app__content").css("height", contentRect.height)
                })
            }).observe(el.find(".app__content .resizable").get(0))

            host.mousedown(() => {
                $("app-window").css("z-index", 0)
                host.css("z-index", 1)
            })
            mdc.autoInit(el.get(0))
            el.find(".mdc-icon-button[data-mdc-auto-init=\"MDCRipple\"]").each(
                (_, {MDCRipple}) => (MDCRipple.unbounded = true)
            )

            el.find(".app__close").click(() => host.remove())

            const height = $(window).height() * 0.5
            const width = $(window).width() * 0.6
            el.find(".app__header, .app__container, .resizable").css("width", width)
            el.find(".app__content, .resizable").css("height", height)
            window.a = el.find("iframe").get(0)
            const contentWindow = el.find("iframe").get(0).contentWindow
            defineReadOnly(contentWindow, "require", (name) => {
                if (Boolean(perms.get(host.attr("data-id")))) return require(name)
                // TODO: Implement permission request and auto installation
                throw new Error("Not implemented!")
            })
            defineReadOnly(contentWindow, "checkForRequire", () => Boolean(perms.get(host.attr("data-id"))))
            defineReadOnly(contentWindow, "askForRequire", () => {
                // TODO: Implement same permission request then change perm value
                throw new Error("Not implemented!")
            })
        })
    }
}

export default AppWindow
