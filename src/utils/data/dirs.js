import path from "path"

import tempDir from "temp-dir"
import electron from "electron"

export default {
    temp: path.join(tempDir, "ramm-os"), // Temporary directory
    store: path.join(
        (electron.app || electron.remote.app).getPath("appData"),
        "ramm-os"
    ) // Storage directory
}
