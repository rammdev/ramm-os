const version = require("../../package.json").version

document.querySelector(".version").innerText = version

let clicks = 0
setInterval(() => {
    if (clicks > 0) clicks--
}, 5000)

document.querySelector(".version").addEventListener("click", () => {
    clicks++
    if (clicks === 10) alert("You are now a developer!")
    // TODO: Only show developer mode if developer mode activated.
})
