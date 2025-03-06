const themeWatcher = watchColorSchemeChange((colorScheme) => {
  if (!hasLocalStorage()) {
    document?.addEventListener('DOMContentLoaded', () => {
      // remove icon - toggle not supported
      document.querySelector('#theme-icon-container').remove()
      toggleSystemTheme(colorScheme)
    })
  } else {
    // user's PS system theme settings
    const systemTheme = localStorage.getItem('system-theme')
    // setting stored in local storage    
    const localTheme = localStorage.getItem('local-theme')
    // // if no local theme set - system is default
    if (localTheme === null) {
      setTheme(colorScheme)
      localStorage.setItem('system-theme', colorScheme || 'light')
    // page load - load any stored themes or set theme
    } else {
      // listen for system changes, update if any 
      if (colorScheme != systemTheme) {
        setTheme(colorScheme)
        localStorage.setItem('system-theme', colorScheme || 'light')
        // override local theme 
        localStorage.removeItem('local-theme')
      } else {
        // else load local theme
        if (localTheme === 'light') {
          lightModeOn()
        } else if (localTheme === 'dark') {
          darkModeOn()
        }
      }
    }
    // wait for load then and add listner on button
    document.addEventListener('DOMContentLoaded', () => {

      document
        .querySelector('.theme-toggle')
        .addEventListener('click', toggleLocalStorageTheme)
    })
  }
})
// set the theme to given value
function setTheme(theme) {
  //  only support dark else any other defaults to light 
  if (theme === 'dark') {
    darkModeOn()
  } else {
    lightModeOn()
  }
}
// toggle btwn themes or set a theme if none set
function toggleLocalStorageTheme(e) {
  const localTheme = localStorage.getItem('local-theme')
  if (localTheme === 'light') {
    localStorage.setItem('local-theme', 'dark')
    darkModeOn()
  } else if (localTheme === 'dark') {
    localStorage.setItem('local-theme', 'light')
    lightModeOn()
    // localTheme still null
  } else {
    // need to check page state then set
    if (darkModeState()) {
      localStorage.setItem('local-theme', 'light')
      lightModeOn()
    } else {
      localStorage.setItem('local-theme', 'dark')
      darkModeOn()
    }
  }
}
function darkModeOn() {
  document?.documentElement?.classList?.remove('light-mode')
  document?.documentElement?.classList?.add('dark-mode')
}
function lightModeOn() {
  document?.documentElement?.classList.remove('dark-mode')
  document?.documentElement?.classList?.add('light-mode')
}
function darkModeState() {
  return document?.documentElement?.classList.contains('dark-mode')
}
function hasLocalStorage() {
  return typeof Storage !== 'undefined'
}
function watchColorSchemeChange(callback) {
  // query user's machine for system setting & use that
  const darkMediaQuery = window?.matchMedia('(prefers-color-scheme: dark)')

  const handleChange = (event) => {
    const newColorScheme = event?.matches ? 'dark' : 'light'
    callback(newColorScheme)
  }
  darkMediaQuery.addEventListener('change', handleChange)
  // handle init load value
  callback(darkMediaQuery.matches ? 'dark': 'light')
  // Return a function to remove the event listener
  return () => darkMediaQuery.removeEventListener('change', handleChange)
}
