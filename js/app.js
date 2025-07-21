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

  // i18n message box
  if(i18nMsgBox && readCookie('i18nClose')){
    i18nMsgBox.hidden = true;
  } else {
    const closeI18nBtn = document.getElementById("close-i18n-notice-box");
    closeI18nBtn.addEventListener("click", ()=>{
      i18nMsgBox.hidden = true;
      createCookie('i18nClose', 1);
    });
  }
});



$(function(){
  var doc = $(document);

  // top link
  // $('#top').click(function(e){
  //   $('html, body').animate({scrollTop : 0}, 500);
  //   return false;
  // });

  // scrolling links
  // var added;
  // doc.scroll(function(e){
  //   if (doc.scrollTop() > 5) {
  //     if (added) return;
  //     added = true;
  //     $('body').addClass('scroll');
  //   } else {
  //     $('body').removeClass('scroll');
  //     added = false;
  //   }
  // })

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

  // if (document.readyState !== 'loading') {
  //   const languageElement = document.getElementById('languageData');
  //   const languagesData = languageElement ? JSON.parse(languageElement.dataset.languages) : [];

  //   const langDisplay = document.getElementById('current-lang');

  //   if (langDisplay) {
  //     const currentLanguage = window.location.pathname.split('/')[1];
  //     const matchedLang = languagesData.find(lang => lang.code === currentLanguage);
  //     langDisplay.textContent = matchedLang ? matchedLang.name : 'English';
  //   }  
  // }

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

  // i18n notice
  // if (readCookie('i18nClose')) {
  //   $('#i18n-notice-box').hide();
  //   $("#i18n-notice-box").addClass("hidden");
  // }
  // else {
  //   $('#close-i18n-notice-box').on('click', function () {
  //     $('#i18n-notice-box').hide();
  //     $("#i18n-notice-box").addClass("hidden");
  //     createCookie('i18nClose', 1);
  //   })
  // }
})



function createCookie(name, value, days) {
  var expires;

  if (days) {
    var date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    expires = "; expires=" + date.toGMTString();
  } else {
   expires = "";
  }
  document.cookie = encodeURIComponent(name) + "=" + encodeURIComponent(value) + expires + "; path=/";
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

/*

Investigate following function

function eraseCookie(name) {
  createCookie(name, "", -1);
}
*/