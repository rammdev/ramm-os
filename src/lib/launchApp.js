import path from "path"

export default (
    {name, id, root, start, themecolour},
    internal = false
) => {
    const el = $("<app-window>").attr({
        "data-name": name,
        "data-theme": themecolour
    })
    el.append(
        $("<iframe>")
            .attr({
                src: internal
                    ? path.join(root, start)
                    : path.resolve(dirs.store, "appdata", id, root || "", start),
                frameborder: 0
            })
            .addClass("resizable limit-size")
    )

    el.appendTo(".main__content")
}
