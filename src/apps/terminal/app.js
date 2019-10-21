const realType = (val) => Object.getPrototypeOf(val).constructor.name.toLowerCase()

const isObject = (value) => value !== null && (typeof value === "object" || typeof value === "function")

function recur(obj) {
    const result = {}
    let temp
    for (const i in obj) {
        // enabledPlugin is too nested, also skip functions
        if (i === "enabledPlugin" || typeof obj[i] === "function") {
            continue
        } else if (typeof obj[i] === "object") {
            // get props recursively
            temp = recur(obj[i])
            // if object is not {}
            if (isObject(temp) && temp !== {}) {
                result[i] = temp
            }
        } else {
            // string, number or boolean
            result[i] = obj[i]
        }
    }
    return result
}

$(".terminal").terminal((command, term) => {
    term.pause()
    if (command !== "") {
        try {
            const result = window.eval(command)
            if (realType(result) === "object") term.echo(JSON.stringify(recur(result))).resume()
            else if (realType(result) === "array") term.echo(JSON.stringify(result)).resume()
            else term.echo(String(result)).resume()
        } catch (e) {
            term.error(String(e)).resume()
        }
    } else {
        term.echo("").resume()
    }
}, {
    greetings: "RAMM OS Terminal",
    name: "ramm_os_terminal",
    height: 200,
    prompt: "$ ",
})

window.python = require("./python") // eslint-disable-line node/no-missing-require
