document.addEventListener("DOMContentLoaded", function () {
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

  // scroll to top of the page
  scrollToTopBtn.addEventListener("click", function (e) {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    })
  });

  // add/remove class 'scroll' on scroll by 5px
  let added = false;
  window.addEventListener('scroll', function () {
    if (window.scrollY > 5) {
      if (added) return;
      added = true;
      document.body.classList.add('scroll');
    } else {
      document.body.classList.remove('scroll');
      added = false;
    }
  });

  // i18n message box : this box appears hidden for all page.lang != 'en'
  const isI18nCookie = readCookie('i18nClose');
  if(i18nMsgBox && !isI18nCookie) {
    const closeI18nBtn = document.getElementById("close-i18n-notice-box");
    // show notice box
    i18nMsgBox.hidden = false;
    // close notice box
    if (closeI18nBtn) {
      closeI18nBtn.addEventListener("click", ()=>{
        // hide notice
        i18nMsgBox.hidden = true;
        // set session cookie
        createCookie('i18nClose', 1);
        });
      // improve keyboard a11y for
      closeI18nBtn.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          closeI18nBtn.click();
        }
      });
    }};
});



$(function(){
  var doc = $(document);

  // menu bar

  var headings = $('h2, h3').map(function(i, el){
    return {
      top: $(el).offset().top - 200,
      id: el.id
    }
  });

  function closest() {
    var h;
    var top = $(window).scrollTop();
    var i = headings.length;
    while (i--) {
      h = headings[i];
      if (top >= h.top) return h;
    }
  }

  var currentApiPrefix;
  var parentMenuSelector;
  var lastApiPrefix;

  $(document).scroll(function() {
    var h = closest();
    if (!h) return;

    currentApiPrefix = h.id.split('.')[0];
    parentMenuSelector = '#'+ currentApiPrefix + '-menu';

    $(parentMenuSelector).addClass('active');

    if (lastApiPrefix && (lastApiPrefix != currentApiPrefix)) {
      $('#'+ lastApiPrefix + '-menu').removeClass('active');
    }

    $('#menu li a').removeClass('active');

    var a = $('a[href="#' + h.id + '"]');
    a.addClass('active');

    lastApiPrefix = currentApiPrefix.split('.')[0];
  })
})

function createCookie(name, value, days) {
  let expires = "";
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 864e5));
    expires = "; expires=" + date.toUTCString();
  }
  const secureFlag = location.protocol === "https:" ? "; Secure" : "";
  document.cookie = `${encodeURIComponent(name)}=${encodeURIComponent(value)}${expires}; path=/; SameSite=Lax${secureFlag}`;
}


function readCookie(name) {
  var nameEQ = encodeURIComponent(name) + "=";
  var ca = document.cookie.split(';');
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) === ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return decodeURIComponent(c.substring(nameEQ.length, c.length));
  }
  return null;
}
