$(function () {
  const doc = $(document);

  // top link
  $('#top').click(function (e) {
    $('html, body').animate({ scrollTop: 0 }, 500);
    return false;
  });

  // scrolling links
  let added;
  doc.scroll(function (e) {
    if (doc.scrollTop() > 5) {
      if (added) return;
      added = true;
      $('body').addClass('scroll');
    } else {
      $('body').removeClass('scroll');
      added = false;
    }
  });

  // menu bar

  const headings = $('h2, h3').map(function (i, el) {
    return {
      top: $(el).offset().top - 200,
      id: el.id
    };
  });

  function closest () {
    let h;
    const top = $(window).scrollTop();
    let i = headings.length;
    while (i--) {
      h = headings[i];
      if (top >= h.top) return h;
    }
  }

  let currentApiPrefix;
  let parentMenuSelector;
  let lastApiPrefix;

  if (document.readyState !== 'loading') {
    const languageElement = document.getElementById('languageData');
    const languagesData = languageElement ? JSON.parse(languageElement.dataset.languages) : [];

    const langDisplay = document.getElementById('current-lang');

    if (langDisplay) {
      const currentLanguage = window.location.pathname.split('/')[1];
      const matchedLang = languagesData.find(lang => lang.code === currentLanguage);
      langDisplay.textContent = matchedLang ? matchedLang.name : 'English';
    }
  }

  $(document).scroll(function () {
    const h = closest();
    if (!h) return;

    currentApiPrefix = h.id.split('.')[0];
    parentMenuSelector = '#' + currentApiPrefix + '-menu';

    $(parentMenuSelector).addClass('active');

    if (lastApiPrefix && (lastApiPrefix !== currentApiPrefix)) {
      $('#' + lastApiPrefix + '-menu').removeClass('active');
    }

    $('#menu li a').removeClass('active');

    const a = $('a[href="#' + h.id + '"]');
    a.addClass('active');

    lastApiPrefix = currentApiPrefix.split('.')[0];
  });

  // i18n notice
  if (readCookie('i18nClose')) {
    $('#i18n-notice-box').hide();
    $('#i18n-notice-box').addClass('hidden');
  } else {
    $('#close-i18n-notice-box').on('click', function () {
      $('#i18n-notice-box').hide();
      $('#i18n-notice-box').addClass('hidden');
      createCookie('i18nClose', 1);
    });
  }
});

function createCookie (name, value, days) {
  let expires;

  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    expires = '; expires=' + date.toGMTString();
  } else {
    expires = '';
  }
  document.cookie = encodeURIComponent(name) + '=' + encodeURIComponent(value) + expires + '; path=/';
}

function readCookie (name) {
  const nameEQ = encodeURIComponent(name) + '=';
  const ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return decodeURIComponent(c.substring(nameEQ.length, c.length));
  }
  return null;
}
