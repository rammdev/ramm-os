import path from "path"

import * as mdc from "material-components-web"

import dirs from "../utils/data/dirs"
import launchApp from "./launch-app"

export default (conf, internal = false) => {
	const icon = (() => {
		if (!conf.icon) {
			return "generic.svg"
		}

		if (internal) {
			return path.join(conf.root, conf.icon)
		}

		path.join(dirs.data, "appdata", conf.id, conf.root, conf.icon)
	})()
	const element = $(
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
	element.find(".drawer__icon").click(() => launchApp(conf, internal))
	$(".drawer__user").append(element)
	mdc.autoInit(element.get(0))
	element.find(".mdc-icon-button[data-mdc-auto-init=\"MDCRipple\"]").each((_, { MDCRipple }) => {
		MDCRipple.unbounded = true
	})
}
