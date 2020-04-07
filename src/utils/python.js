import path from "path"
import pythonBridge from "python-bridge"
import fs from "fs-extra"

export default async filepath => {
	const python = pythonBridge({ cwd: path.basename(path.dirname(filepath)) })
	const fileData = await fs.readFile(filepath, "utf8")
	const data = await python(fileData)
	python.end()
	return data
}
