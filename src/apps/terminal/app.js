function realType(myVar) {
    const argLength = arguments.length

    // validate arguments
    if (argLength !== 1) {
        throw new Error(`Expected 1 arguments, got ${argLength}`)
    }

    return ({})
        .toString
        .call(myVar)
        .match(/\s([a-zA-Z]+)/)[1]
        .toLowerCase()
};

function recur(obj) {
    const result = {}
    let _tmp
    for (const i in obj) {
        // enabledPlugin is too nested, also skip functions
        if (i === "enabledPlugin" || typeof obj[i] === "function") {
            continue
        } else if (typeof obj[i] === "object") {
            // get props recursively
            _tmp = recur(obj[i])
            // if object is not {}
            if (Object.keys(_tmp).length) {
                result[i] = _tmp
            }
        } else {
            // string, number or boolean
            result[i] = obj[i]
        }
    }
    return result
}

$("#terminal").terminal((command, term) => {
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
    prompt: "$ "
})

window.python = require("./python")
