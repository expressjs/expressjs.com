$(function(){
  var doc = $(document);

  // Configuration for smooth scrolling
  var scrollDuration = 500;
  var headerOffset = 120;

  // Smooth scroll function
  function smoothScrollToElement(target) {
    var $target = $(target);
    
    // Handle IDs with dots (like express.urlencoded)
    if (!$target.length && typeof target === 'string' && target.indexOf('.') > -1) {
      var targetId = target.replace('#', '');
      $target = $('[id="' + targetId + '"]');
    }
    
    if ($target.length) {
      $('html, body').animate({
        scrollTop: $target.offset().top - headerOffset
      }, scrollDuration);
      return true;
    }
    return false;
  }

  // top link
  $('#top').click(function(e){
    $('html, body').animate({scrollTop : 0}, 500);
    return false;
  });

  // Smooth scrolling for all anchor links
  $(document).on('click', 'a[href^="#"]:not([href="#"]):not([href="#top"])', function(e) {
    var href = $(this).attr('href');
    if (smoothScrollToElement(href)) {
      e.preventDefault();
      // Update URL after scroll
      if (history.pushState) {
        history.pushState(null, null, href);
      }
    }
  });

  // Handle direct hash navigation on page load
  $(window).on('load', function() {
    if (window.location.hash) {
      setTimeout(function() {
        smoothScrollToElement(window.location.hash);
      }, 300);
    }
  });

  // scrolling links
  var added;
  doc.scroll(function(e){
    if (doc.scrollTop() > 5) {
      if (added) return;
      added = true;
      $('body').addClass('scroll');
    } else {
      $('body').removeClass('scroll');
      added = false;
    }
  })

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
  if (readCookie('i18nClose')) {
    $('#i18n-notice-box').hide();
    $("#i18n-notice-box").addClass("hidden");
  }
  else {
    $('#close-i18n-notice-box').on('click', function () {
      $('#i18n-notice-box').hide();
      $("#i18n-notice-box").addClass("hidden");
      createCookie('i18nClose', 1);
    })
  }
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

function eraseCookie(name) {
  createCookie(name, "", -1);
}