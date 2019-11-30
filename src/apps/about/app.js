const { version } = require("../../package.json") // eslint-disable-line node/no-missing-require

/* eslint-disable no-undef */
Waves.init()
Waves.attach(".logo")
/* eslint-enable no-undef */

document.querySelector(".version").textContent = version

let clicks = 0
setInterval(() => {
    if (clicks > 0) clicks--
}, 5000)

document.querySelector(".logo").addEventListener("click", () => {
    clicks++
    if (clicks === 10) document.querySelector(".text").textContent = "You are now a developer!"
    // TODO: Only show developer mode if developer mode activated.
})
