import request from "request-promise"

import version from "../../package.json"

export default request.defaults({
    gzip: true,
    headers: {
        "User-Agent": `RAMM OS v${version}`
    },
})