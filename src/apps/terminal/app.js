const realType = (val) => Object.getPrototypeOf(val).constructor.name.toLowerCase()

const isObject = (value) => value !== null && (typeof value === "object" || typeof value === "function")

function recur(obj) {
    const result = {}
    let temp
    for (const i in obj) {
        // EnabledPlugin is too nested, also skip functions
        if (i === "enabledPlugin" || typeof obj[i] === "function") {
            continue
        } else if (typeof obj[i] === "object") {
            // Get props recursively
            temp = recur(obj[i])
            // If object is not {}
            if (isObject(temp) && temp !== {}) {
                result[i] = temp
            }
        } else {
            // String, number or boolean
            result[i] = obj[i]
        }
    }

    return result
}

$(".terminal").terminal((command, term) => {
    term.pause()
    if (command === "") term.echo("").resume()
    else {
        try {
            const result = window.eval(command) // eslint-disable-line no-eval
            if (realType(result) === "object") term.echo(JSON.stringify(recur(result))).resume()
            else if (realType(result) === "array") term.echo(JSON.stringify(result)).resume()
            else term.echo(String(result)).resume()
        } catch (e) {
            term.error(String(e)).resume()
        }
    }
}, {
    greetings: "RAMM OS Terminal",
    name: "ramm_os_terminal",
    height: 200,
    prompt: "$ ",
})

window.python = require("./python") // eslint-disable-line node/no-missing-require
