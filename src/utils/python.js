import pythonBridge from "python-bridge"

import path from "path"

export default (filepath, cb) => {
    const python = pythonBridge({cwd: path.basename(path.dirname(filepath))})
    python.ex(filepath).then(cb)
    python.end()
}
