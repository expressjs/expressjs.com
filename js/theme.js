let themeBtn;
const themeWatcher = watchColorSchemeChange((colorScheme) => {
  if (!hasLocalStorage()) {
    // If localStorage is not supported, use system preference
    document?.addEventListener('DOMContentLoaded', () => {
      // remove icon
      document.querySelector('#theme-toggle').remove()
      setTheme(colorScheme);
    })
  } else {
    // user's PS system theme settings
    const systemTheme = localStorage.getItem('system-theme')
    // setting stored in local storage    
    const localTheme = localStorage.getItem('local-theme')
    // if no local theme set - system is default
    if (localTheme === null) {
      setTheme(colorScheme)
      localStorage.setItem('system-theme', colorScheme)
    // page load - load any stored themes or set theme
    } else {
      // listen for system changes, update if any 
      if (colorScheme != systemTheme) {
        setTheme(colorScheme)
        localStorage.setItem('system-theme', colorScheme)
      } else {
        // else load local theme
        setTheme(localTheme);
      }
    }
    // wait for load then and add listener on button
    document.addEventListener('DOMContentLoaded', () => {
      const themeToggle = document?.querySelector('#theme-toggle');
      themeToggle.addEventListener('click', toggleLocalStorageTheme);
      // set area-label for screen readers
      themeToggle.setAttribute('aria-label', colorScheme ? 'Switch to light mode' : 'Switch to dark mode');
    })
  }
})
// apply current theme
function setTheme(theme) {
  if (theme === 'dark') {
    darkModeOn()
  } else {
    lightModeOn()
  }
}
// toggle btn themes
function toggleLocalStorageTheme() {
  const localTheme = localStorage.getItem('local-theme');
  if (localTheme === 'light') {
    setTheme('dark');
  } else {
    setTheme('light');
  }
}
function darkModeOn() {
  document?.documentElement?.classList.remove('light-mode')
  document?.documentElement?.classList.add('dark-mode')
  updateThemeIcon('dark');
  localStorage.setItem('local-theme', 'dark');
}
function lightModeOn() {
  document?.documentElement?.classList.remove('dark-mode')
  document?.documentElement?.classList.add('light-mode')
  updateThemeIcon('light');
  localStorage.setItem('local-theme', 'light');
}
function hasLocalStorage() {
  return typeof Storage !== 'undefined'
}
function watchColorSchemeChange(callback) {
  // get system theme preference
  const darkMediaQuery = window?.matchMedia('(prefers-color-scheme: dark)')

  const handleChange = (event) => {
    const newColorScheme = event?.matches ? 'dark' : 'light'
    callback(newColorScheme)
  }
  darkMediaQuery.addEventListener('change', handleChange)
  // initial call : if system theme is not dark then light mode is choosen
  callback(darkMediaQuery.matches ? 'dark' : 'light')
  // remove event from window
  return () => darkMediaQuery.removeEventListener('change', handleChange)
}

function updateThemeIcon (theme) {
  const sun = document?.getElementById('icon-sun');
  const moon = document?.getElementById('icon-moon');
  const themeToggle = document?.getElementById('theme-toggle');
  if (!sun || !moon || !themeToggle) return;
  const isDark = theme === 'dark';
  // improve accessibility for screen readers 
  sun.setAttribute('aria-hidden', isDark ? 'false' : 'true');
  moon.setAttribute('aria-hidden', isDark ? 'true' : 'false');
  themeToggle.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
};
