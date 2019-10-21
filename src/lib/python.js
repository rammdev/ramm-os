const pythonBridge = require("python-bridge")

const path = require("path")

const fs = require("../utils/fs")

module.exports = (filepath) => {
    const python = pythonBridge({ cwd: path.basename(path.dirname(filepath)) })
    return fs.readFile(filepath, "utf8")
        .then((data) => python.ex(data))
        .finally(() => python.end())
}
