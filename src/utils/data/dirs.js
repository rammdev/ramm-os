import path from "path"

import { remote } from "electron"
import temp from "pkg-temp"

export default {
    temp, // Temporary directory
    store: path.join(
        remote.app.getPath("appData"),
        "ramm-os",
    ), // Storage directory
}
