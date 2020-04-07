import path from "path"

import dirs from "../utils/data/dirs"

export default (
	{ name, id, root, start, themecolour },
	internal = false
) => {
	const element = $("<app-window>").attr({
		"data-name": name,
		"data-theme": themecolour,
		"data-id": id
	})

	const iframe = $("<iframe>")
		.attr({
			src: internal ?
				path.join(root, start) :
				path.resolve(dirs.data, "appdata", id, root || "", start),
			frameborder: 0
		})
		.addClass("resizable limit-size")

	element.append(iframe)

	element.appendTo(".main__content")
}
