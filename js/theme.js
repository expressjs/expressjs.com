// system theme check
if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
  if(!hasLocalStorage()) {
    darkModeOn()
    // remove icon - cannot turn off
    document.querySelector('#theme-icon-container').remove()
  } else {
    // no use local storage til required
    const isDarkMode = localStorage.getItem('darkmode')
    // unless toggled off, darkmode is on
    isDarkMode === 'false' ? darkModeOff()
    : darkModeOn()
    document.querySelector('.theme-toggle')
    .addEventListener('click', toggleTheme)
  }
} else {
  if (hasLocalStorage()) {
    const isDarkMode = localStorage.getItem('darkmode')
    if (isDarkMode === 'true') darkModeOn()
    document
      .querySelector('.theme-toggle')
      .addEventListener('click', toggleTheme)
  } else {
    // remove theme-toggle icon
    document.querySelector('#theme-icon-container').remove()
  }
}

function toggleTheme(e) {
  const isDarkMode = localStorage.getItem('darkmode')
  if (isDarkMode === 'true') {
    localStorage.setItem('darkmode', 'false')
    darkModeOff()
  } else if (isDarkMode === 'false') {
    localStorage.setItem('darkmode', 'true')
    darkModeOn()
    // isDarkMode stilll undefined
  } else {
    // need to check state 
    if(darkModeState()) {
      localStorage.setItem('darkmode', 'false')
      darkModeOff()
    } else {
      localStorage.setItem('darkmode', 'true')
      darkModeOn()
    }
  }
}
function darkModeOn() {
  document.body.classList.add('dark-mode')
}
function darkModeOff() {
  document.body.classList.remove('dark-mode')
}
function darkModeState() {
  return document.body.classList.contains('dark-mode')
}
function hasLocalStorage() {
  return typeof Storage !== 'undefined'
}
