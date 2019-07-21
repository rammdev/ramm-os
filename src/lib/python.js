const pythonBridge = require("python-bridge")

const path = require("path")

const fs = require("../utils/fs")

const Promise = require("bluebird")

module.exports = (filepath) => new Promise((resolve, reject) => {
    const python = pythonBridge({cwd: path.basename(path.dirname(filepath))})
    fs.readFile(filepath, "utf8")
        .then((data) => python.ex(data)
            .then(resolve)
            .catch(reject))
        .catch(reject)
        .finally(() => python.end())
})
