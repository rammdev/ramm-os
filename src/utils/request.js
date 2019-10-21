import request from "request-promise"

import userAgent from "./data/user-agent"

export default request.defaults({
    gzip: true,
    headers: {
        "User-Agent": userAgent,
    },
})
