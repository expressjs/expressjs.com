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
    const localTheme = localStorage.getItem('expressjs-theme');
    if (localTheme === null) {
      localStorage.setItem('expressjs-theme', colorScheme); // store system theme as local theme
      setTheme(colorScheme); // use system theme
    } else {
      setTheme(localTheme); // use previous theme
    };

    document.addEventListener("DOMContentLoaded", ()=>{
      const themeBtn = document.querySelector('#theme-toggle');
      // add click event on theme loggle btn
      themeBtn.addEventListener('click', toggleLocalStorageTheme);
      // set accessibility on page load
      themeBtn.setAttribute('aria-label', colorScheme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
    });
  }
});

// apply given theme
function setTheme(theme) {
  if (theme === 'dark') {
    darkModeOn()
  } else {
    lightModeOn()
  }
}
// toggle theme btn or set a theme if none set
function toggleLocalStorageTheme() {
  let nextTheme;
  const localTheme = localStorage.getItem('expressjs-theme');

  if (localTheme === 'light') {
    nextTheme = 'dark';
  } else if (localTheme === 'dark') {
    nextTheme = 'light';
  } else {
    nextTheme = darkModeState() ? 'light' : 'dark'; // fallback
  };

  localStorage.setItem('local-theme', nextTheme);
  setTheme(nextTheme);
}
function darkModeOn() {
  document?.documentElement?.classList.remove('light-mode')
  document?.documentElement?.classList.add('dark-mode')
  updateThemeIcon('dark');
}
function lightModeOn() {
  document?.documentElement?.classList.remove('dark-mode')
  document?.documentElement?.classList.add('light-mode')
  updateThemeIcon('light');
}
function darkModeState() {
  return document?.documentElement?.classList.contains('dark-mode')
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

function updateThemeIcon(theme) {
  const sun = document.getElementById('icon-sun');
  const moon = document.getElementById('icon-moon');
  const themeBtn = document.querySelector('#theme-toggle');
  if (!sun || !moon) return;

  const isDark = theme === 'dark';

  // hide or show icon 
  sun.hidden = !isDark;
  moon.hidden = isDark;
  // improve accessibility for screen readers 
  sun.setAttribute('aria-hidden', isDark ? 'false' : 'true');
  moon.setAttribute('aria-hidden', isDark ? 'true' : 'false');
  // change label on btn click
  themeBtn.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
};
