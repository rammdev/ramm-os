import {Loader} from "es-module-loader/core/loader-polyfill"
const loader = new Loader()

import Promise from "bluebird"

export default (name) => new Promise((resolve, reject) => loader.import(name).then(resolve).catch(reject))
