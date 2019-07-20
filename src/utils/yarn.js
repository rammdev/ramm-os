import Promise from "bluebird"
import yarn from "yarn-api"

export default Promise.promisifyAll(yarn)
