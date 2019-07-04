import path from "path"

import * as mdc from "material-components-web"

import launchApp from "./launchApp"

export default (conf, internal = false) => {
    const icon = (() => {
        if (!conf.icon) return "generic.svg"
        if (internal) return path.join(conf.root, conf.icon)
        else path.join(dirs.store, "appdata", conf.id, conf.root, conf.icon)
    })()
    const el = $(
        `
            <div class="mdc-layout-grid__cell drawer__app">
                <button class="drawer__icon mdc-icon-button" aria-label="${
    conf.name
}" data-mdc-auto-init="MDCRipple">
                    <img src="${icon}" alt="App icon" height="24" width="24" onerror="if (this.src != 'generic.svg') this.src = 'generic.svg';">
                </button>
                <p class="drawer__title mdc-typography--caption">${
    conf.name
}</p>
            </div>
        `
    )
    el.find(".drawer__icon").click(() => launchApp(conf, internal))
    $(".drawer__user").append(el)
    mdc.autoInit(el.get(0))
    el.find(".mdc-icon-button[data-mdc-auto-init=\"MDCRipple\"]").each(
        (_, {MDCRipple}) => (MDCRipple.unbounded = true)
    )
}