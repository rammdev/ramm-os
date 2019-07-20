import path from "path"

import tempDir from "temp-dir"
import {remote} from "electron"

export default {
    temp: path.join(tempDir, "ramm-os"), // Temporary directory
    store: path.join(
        remote.app.getPath("appData"),
        "ramm-os"
    ) // Storage directory
}
