const realType = value => Object.getPrototypeOf(value).constructor.name.toLowerCase()

const isObject = value => value !== null && (typeof value === "object" || typeof value === "function")

function recur(object) {
	const result = {}
	let temporary
	for (const i in object) {
		// EnabledPlugin is too nested, also skip functions
		if (i === "enabledPlugin" || typeof object[i] === "function") {
			continue
		} else if (typeof object[i] === "object") {
			// Get props recursively
			temporary = recur(object[i])
			// If object is not {}
			if (isObject(temporary) && temporary !== {}) {
				result[i] = temporary
			}
		} else {
			// String, number or boolean
			result[i] = object[i]
		}
	}

	return result
}

$(".terminal").terminal((command, term) => {
	term.pause()
	if (command === "") {
		term.echo("").resume()
	} else {
		try {
			const result = window.eval(command) // eslint-disable-line no-eval
			if (realType(result) === "object") {
				term.echo(JSON.stringify(recur(result))).resume()
			} else if (realType(result) === "array") {
				term.echo(JSON.stringify(result)).resume()
			} else {
				term.echo(String(result)).resume()
			}
		} catch (error) {
			term.error(String(error)).resume()
		}
	}
}, {
	greetings: "RAMM OS Terminal",
	name: "ramm_os_terminal",
	height: 200,
	prompt: "$ "
})

window.python = require("./python") // eslint-disable-line node/no-missing-require
