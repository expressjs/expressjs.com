
$(function(){

  var doc = $(document);

  // top link
  $('#top').click(function(e){
    $('html, body').animate({scrollTop : 0}, 500);
    return false;
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

  // edit page link
  var latest = '';
  var branchPath = 'https://github.com/strongloop/expressjs.com';
  var pathName = document.location.pathname;

  var currentVersion = pathName.split('/').splice(-2)[0] || '4x'; // defaults to current version
  var fileName = pathName.split('/').splice(-2)[1];
  var pagePath;
  var editPath;

  // the api doc cannot be edited individually, we'll have to link to the dir instead
  if (fileName == 'api.html') {
    editPath = branchPath + '/tree/gh-pages/_includes/api/en/'+ currentVersion;
  }
  // link to individual doc files
  else {
    pagePath = pathName.replace(/\.html$/, '.md');
    editPath = branchPath + '/blob/gh-pages' + pagePath;
  }

  var editLink;

  if (pathName == '/') editLink = '<a href="' + branchPath + '">Fork the website on GitHub</a>';
  else editLink = '<a href="' + editPath + '">Edit this page on GitHub</a>';

  $('#fork').html(editLink);

  // code highlight

  $('code.language-js').each(function(){
    $(this).addClass('language-javascript').removeClass('language-js')
  })

  $('code.language-sh').each(function(){
    $(this).parent().addClass('language-sh')
  })

  Prism.highlightAll()

  // menu bar

  var prev;
  var n = 0;

  var headings = $('.h2, h3').map(function(i, el){
    return {
      top: $(el).offset().top - 100,
      id: el.id
    }
  });

  function closest() {
    var h;
    var top = $(window).scrollTop();
    var i = headings.length;
    while (i--) {
      h = headings[i];
      if (top >= h.top - 1) return h;
    }
  }

  var currentApiPrefix;
  var parentMenuSelector;
  var lastApiPrefix;

  $(window).bind('load resize', function() {

    $('#menu').css('height', ($(this).height() - 150) + 'px');

  });

  $(document).scroll(function() {

    var h = closest();
    if (!h) return;


    if (window.location.pathname == '/3x/api.html') {

      if (prev) {
      prev.removeClass('active');
      prev.parent().parent().removeClass('active');
      }
      var a = $('a[href="#' + h.id + '"]');
      a.addClass('active');
      a.parent().parent().addClass('active');
      prev = a;

    }

    else {

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

    }

  })

  // show mobile menu
  $('#nav-button, #overlay').click(function () {
    $('#navmenu').toggle()
    $('#overlay').toggle()
  })

  // dropdown menu

  if ('ontouchstart' in document.documentElement) {
    $('#application-menu').dropit({ action: 'click' })
    $('#getting-started-menu').dropit({ action: 'click' })
    $('#guide-menu').dropit({ action: 'click' })
    $('#advanced-topics-menu').dropit({ action: 'click' })
    $('#resources-menu').dropit({ action: 'click' })
    $('#lb-menu').dropit({ action: 'click' })
  }
  else {
    $('#application-menu').dropit({ action: 'mouseenter' })
    $('#getting-started-menu').dropit({ action: 'mouseenter' })
    $('#guide-menu').dropit({ action: 'mouseenter' })
    $('#advanced-topics-menu').dropit({ action: 'mouseenter' })
    $('#resources-menu').dropit({ action: 'mouseenter' })
    $('#lb-menu').dropit({ action: 'mouseenter' })
  }

  // mobile

  // main menu
  $('#navmenu > li').click(function () {

    // applicable only if it has a menu
    if ($(this).find('ul').length) {

      if ($(this).hasClass('active-mobile-menu')) {
        $(this).removeClass('active-mobile-menu')
        $(this).find('.dropit .dropit-submenu').hide()
      }
      else {
        $('.dropit .dropit-submenu').hide()
        $(this).find('.dropit .dropit-submenu').show()
        $('#navmenu li.active-mobile-menu').removeClass('active-mobile-menu')
        $(this).addClass('active-mobile-menu')
      }
    }
    else {
      var path = $(this).find('a').attr('href')
      document.location = path
    }

  })

  // when in mobile mode, menu names should open the submenu
  $('.dropit-trigger a').click(function (e) {

    if (window.matchMedia('(max-width: 899px)').matches) {
      e.preventDefault()
    }

  })

  // sub menu navigation
  $('.dropit-submenu li').click(function () {
    var path = $(this).find('a').attr('href')
    document.location = path
  })

  // i18n notice
  if (readCookie('i18nClose')) {
    $('#i18n-notice-box').hide()
  }
  else {
    $('#close-i18n-notice-box').on('click', function () {
      $('#i18n-notice-box').hide()
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
