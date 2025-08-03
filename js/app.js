const languageElement = document.getElementById('languageData');
const languagesData = languageElement ? JSON.parse(languageElement.dataset.languages) : [];
const langDisplay = document.getElementById('current-lang');
const i18nMsgBox = document.getElementById("i18n-notice-box");
const scrollToTopBtn = document.getElementById("top");

// display current language in language picker component
if (langDisplay) {
  const currentLanguage = window.location.pathname.split('/')[1];
  const matchedLang = languagesData.find(lang => lang.code === currentLanguage);
  langDisplay.textContent = matchedLang ? matchedLang.name : 'English';
}

// add/remove class 'scroll' on scroll by 5px
const scrollTarget = document.querySelector('.logo-container');
const scrollObserver = new IntersectionObserver(
  ([entry]) => {
    if (!entry.isIntersecting) {
      document.body.classList.add('scroll');
    } else {
      document.body.classList.remove('scroll');
    }
  },
  {
    root: null,
    threshold: 0,
    rootMargin: '0px 0px 0px 0px'
  }
);

if (scrollTarget) scrollObserver.observe(scrollTarget);

// heighlight current Menu on scroll
const headings = Array.from(document.querySelectorAll("h2, h3"));
const menuLinks = document.querySelectorAll("#menu li a");

const observerOptions = {
  root: null,
  rootMargin: "-10% 0px -65% 0px",
  threshold: 1,
};

const menuObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const currentApiPrefix = entry.target.id.split(".")[0];
      const parentMenuSelector = `#${currentApiPrefix}-menu`;
      const parentMenuEl = document.querySelector(parentMenuSelector);

      // open submenu on scroll
      if (parentMenuEl) parentMenuEl.classList.add("active");

      // Remove active class from last menu item
      const lastActiveMenu = document.querySelector(".active[id$='-menu']");
      if (lastActiveMenu && lastActiveMenu.id !== parentMenuEl.id) {
        lastActiveMenu.classList.remove("active");
      }

      // Update active link
      menuLinks.forEach((link) => link.classList.remove("active"));
      const activeLink = document.querySelector(`a[href="#${entry.target.id}"]`);
      if (activeLink && !activeLink.classList.contains("active")) activeLink.classList.add("active");
    }
  });
}, observerOptions);

headings.forEach((heading) => menuObserver.observe(heading));

// i18n message box : this box appears hidden for all page.lang != 'en'
const isI18nCookie = readCookie('i18nClose');
if (i18nMsgBox && !isI18nCookie) {
  const closeI18nBtn = document.getElementById("close-i18n-notice-box");
  // show notice box
  i18nMsgBox.hidden = false;
  // close notice box
  if (closeI18nBtn) {
    closeI18nBtn.addEventListener("click", () => {
      // hide notice
      i18nMsgBox.hidden = true;
      // set session cookie
      createCookie('i18nClose', 1);
    });

    // keyboard a11y
    closeI18nBtn.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        closeI18nBtn.click();
      }
    });
  }
};

function createCookie(name, value, days) {
  let expires = "";
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 864e5));
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = `${encodeURIComponent(name)}=${encodeURIComponent(value)}${expires}; path=/; SameSite=Lax; Secure`;
}

function readCookie(name) {
  const nameEQ = encodeURIComponent(name) + "=";
  const ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return decodeURIComponent(c.substring(nameEQ.length, c.length));
  }
  return null;
}
