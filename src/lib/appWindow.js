import * as mdc from "material-components-web"

import isColour from "is-color"

class AppWindow extends HTMLElement {
    constructor() {
        super()

        const eln = this.attachShadow({mode: "open"})

        const el = $(eln)
        const host = $(eln.host)

        el.prepend(`
            <link rel="stylesheet" href="..\\node_modules\\material-components-web\\dist\\material-components-web.min.css">
            <style>
                .app__container {
                    position: absolute;
                    background-color: white;
                    resize: both;
                }

                .limit-size {
                    min-width: 200px;
                    min-height: 200px;
                }

                .app__drawer {
                    z-index: 6;
                }

                .app__header {
                    z-index: 0;
                    position: absolute;
                    top: 0;
                    min-width: 200px;
                }

                .resizable {
                    resize: both;
                }

                ::-webkit-scrollbar {
                  border-radius: 100px;
                  background-color: transparent;
                  width: 8px;
                  height: 8px;
                }

                ::-webkit-scrollbar-button {
                  height: 0;
                  width: 0;
                }

                ::-webkit-scrollbar-corner {
                  background-color: transparent;
                }

                ::-webkit-scrollbar-thumb {
                  border-radius: 100px;
                  background-color: rgba(0, 0, 0, 0.2);
                  min-height: 28px;
                }

                ::-webkit-scrollbar-thumb:hover {
                  background-color: rgba(0, 0, 0, 0.4);
                }

                ::-webkit-scrollbar-thumb:active {
                  background-color: rgba(0, 0, 0, 0.5);
                }

                ::-webkit-scrollbar-track {
                  background-clip: padding-box;
                  border-width: 0 0 0 4px;
                }
            </style>
            <div class="limit-size app__container mdc-elevation--z8">
            <header class="app__header mdc-top-app-bar mdc-top-app-bar--dense">
                <div class="mdc-top-app-bar__row">
                    <section class="mdc-top-app-bar__section mdc-top-app-bar__section--align-start">
                        <span class="mdc-top-app-bar__title">App</span> </section>
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
            <div class="app__content"></div>
            </div>
            <script src="..\\node_modules\\material-components-web\\dist\\material-components-web.min.js"></script>
        `)

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
        })
    }
}

export default AppWindow
