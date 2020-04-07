import path from "path"

// Ping sound
const pingSound = new Audio(path.resolve(__dirname, "..", "ping.ogg"))

// Display snackbar message
export default (message, volume = 1) => {
	const snackbar = $(".main__snackbar").get(0).MDCSnackbar
	snackbar.close()
	snackbar.labelText = message
	snackbar.open()
	if (volume > 0) {
		const audio = pingSound.cloneNode()
		audio.volume = volume
		audio.play()
	}
}
