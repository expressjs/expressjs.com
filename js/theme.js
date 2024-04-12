
// theme toggle
const themeToggleSwitch = document.querySelector('.theme-toggle');
// console.log(themeToggleSwitch)
// const currentTheme = themeToggleSwitch.classList.contains('darkmode-theme') ? 'DARK' : 'DEFAULT'
(() =>{
    localStorage.setItem("darkmode", "true")
    const isDarkMode = localStorage.getItem("darkmode")
    console.log(isDarkMode)
    if (isDarkMode === "true") {
        loadDarkMode()
        // remove default theme class
        // load dark mode
    } else {
        // do nothing
    }
})();
themeToggleSwitch.addEventListener('click', toggleTheme)

function loadDarkMode() {
    document.body.classList.add('dark-mode-body', 'dark-mode')
    const banner = document.querySelector('#blm-banner')
    banner.classList.add('dark-mode')
    const header = document.querySelector('header')
    header.classList.add('dark-mode')
    const logo = document.querySelector('#logo')
    logo.classList.add('dark-mode')
    const navbar= document.querySelector('#navbar')
    navbar.classList.add('dark-mode')
}
function toggleTheme(e) {
    const isDarkMode = localStorage.getItem("darkmode")
    co
    if (isDarkMode) {
        // remove default theme class
        // load dark mode
    } else {
        // do nothing
    }

}
