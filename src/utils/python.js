import pythonBridge from "python-bridge"

import path from "path"

import fs from "./fs"

export default (filepath) => {
    const python = pythonBridge({ cwd: path.basename(path.dirname(filepath)) })
    return fs.readFile(filepath, "utf8")
        .then((data) => python.ex(data))
        .finally(() => python.end())
}
