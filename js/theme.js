
// handle init page load & persist theme
(() =>{
    const isDarkMode = localStorage.getItem("darkmode")
    if (isDarkMode === "true") {
        loadDarkMode()
    }
})();
document.querySelector('.theme-toggle').addEventListener('click', toggleTheme)

function toggleTheme(e) {
    const isDarkMode = localStorage.getItem("darkmode")
    // turn off
    if (isDarkMode === "true") {
        localStorage.setItem("darkmode", "false")
        unloadDarkMode()
    // turn on
    } else {
        console.log('set to true?')
        localStorage.setItem("darkmode", "true")
        loadDarkMode()
    }
}
function loadDarkMode() {
    document.body.classList.add('dark-mode')
}
function unloadDarkMode() {
    document.body.classList.remove('dark-mode')
}
