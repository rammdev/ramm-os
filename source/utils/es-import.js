import { Loader } from "es-module-loader/core/loader-polyfill"
const loader = new Loader()

export default async name => loader.import(name)
