import pythonBridge from "python-bridge"

import path from "path"

import fs from "./fs"

import Promise from "bluebird"

export default (filepath) => new Promise((resolve, reject) => {
    const python = pythonBridge({cwd: path.basename(path.dirname(filepath))})
    fs.readFile(filepath, "utf8")
        .then((data) => python.ex(data)
            .then(resolve)
            .catch(reject))
        .catch(reject)
        .finally(() => python.end())
})
