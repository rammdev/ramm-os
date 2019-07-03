import Promise from "bluebird"
import extractZip from "extract-zip"

export default Promise.promisify(extractZip);