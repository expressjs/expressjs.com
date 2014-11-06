
$(function(){

  var doc = $(document);

  // top link
  $('#top').click(function(e){
    $('html, body').animate({scrollTop : 0}, 200);
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
    editPath = branchPath + '/tree/gh-pages/'+ currentVersion +'/en/api';
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

  $('code.lang-js, pre.js code').each(function(){
    $(this).addClass('language-javascript').removeClass('lang-js')
  })

  $('code.lang-sh').each(function(){
    $(this).addClass('language-bash').removeClass('lang-sh')
  })

  Prism.highlightAll()

  // menu bar

  var prev;
  var n = 0;

  var headings = $('h3').map(function(i, el){
    return {
      top: $(el).offset().top,
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

  $(document).scroll(function(){
    var h = closest();
    if (!h) return;

    if (prev) {
      prev.removeClass('active');
      prev.parent().parent().removeClass('active');
    }

    var a = $('a[href="#' + h.id + '"]');
    a.addClass('active');
    a.parent().parent().addClass('active');

    prev = a;
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

    // applicable only it has a menu
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

})
