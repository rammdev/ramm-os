const path = require("path")
const pythonBridge = require("python-bridge")
const fs = require("fs-extra")

module.exports = async (filepath) => {
    const python = pythonBridge({ cwd: path.basename(path.dirname(filepath)) })
    const fileData = await fs.readFile(filepath, "utf8")
    const data = await python(fileData)
    python.end()
    return data
}
