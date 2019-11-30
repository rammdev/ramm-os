import got from "got"
import userAgent from "ergent"

export default got.extend({
    headers: {
        "user-agent": userAgent,
    },
})
