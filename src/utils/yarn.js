import Promise from "bluebird"
import yarn from "yarn-api"

const yarnPromise = Promise.promisify(yarn)

export default (...args) => yarnPromise(args)
