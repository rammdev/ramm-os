import path from "path"

import { remote } from "electron"

export default {
	temp: path.join(
		remote.app.getPath("temp"),
		"ramm-os"
	), // Temporary directory
	data: path.join(
		remote.app.getPath("appData"),
		"ramm-os"
	) // Storage directory
}
