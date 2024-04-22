// system theme check
if (systemDarkMode()) {
  if(!hasLocalStorage()) {
    // remove icon - toggle not supported
    document.querySelector('#theme-icon-container').remove()
    darkModeOn()
  } else {
    const isDarkMode = localStorage.getItem('darkmode')
    // unless toggled off, dark scheme is on
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
    // remove icon - toggle not supported
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
    // local storage not used until now so 
    // isDarkMode still undefined
  } else {
    // need to check page state 
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
function systemDarkMode() {
  return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
}
