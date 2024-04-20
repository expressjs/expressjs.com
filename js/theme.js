// init page load & persist theme
if (hasLocalStorage) {
  const isDarkMode = localStorage.getItem('darkmode')
  if (isDarkMode === 'true') darkModeOn()
  document.querySelector('.theme-toggle').addEventListener('click', toggleTheme)
} else {
  // remove theme-toggle icon
  document.querySelector('#theme-icon-container').remove()
}

function toggleTheme(e) {
  const isDarkMode = localStorage.getItem('darkmode')
  // turn off
  if (isDarkMode === 'true') {
    localStorage.setItem('darkmode', 'false')
    darkModeOff()
    // turn on
  } else {
    localStorage.setItem('darkmode', 'true')
    darkModeOn()
  }
}
function darkModeOn() {
  document.body.classList.add('dark-mode')
}
function darkModeOff() {
  document.body.classList.remove('dark-mode')
}
function hasLocalStorage() {
  return typeof Storage !== 'undefined'
}
