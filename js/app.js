/*
 Copyright (c) 2016 StrongLoop, IBM, and Express Contributors
 License: MIT
*/

// It uses `window.matchMedia` instead of `window.addEventListener('resize')` because `matchMedia` performs better by not changing its value with every screen resize.
const mobileScreen = window.matchMedia("(max-width: 899px)");
let isSmallScreen = false;

mobileScreen.addEventListener("change", (event) => {
  if (event.matches) {
	isSmallScreen = true;
  }
});

// ------------------- codehighligh -------------------------

const $codejs = document.querySelectorAll("code.language-js");
const $codesh = document.querySelectorAll("code.language-sh");

for (const el of $codejs) {
  el.classList.add("language-javascript");
  el.classList.remove("language-js");
}

for (const el of $codesh) {
  el.parentElement.classList.add("language-sh");
}

Prism.highlightAll();

// ------------------- scroll -------------------------------

let added = false;

window.addEventListener("scroll", () => {
  if (scrollY > 5) {
	if (added) return;
	  added = true;

	  document.body.classList.add("scroll");
	} else {
	  added = false;
	  document.body.classList.remove("scroll");
  }
});

// ------------------- menu api -----------------------------

const $headings = document.querySelectorAll("h2, h3");
const headings = [];

let currentApiPrefix;
let parentMenuSelector;
let lastApiPrefix;

for (const heading of $headings) {
  const rect = heading.getBoundingClientRect();
  const win = heading.ownerDocument.defaultView;

  headings.push({
	top: rect.top + win.pageYOffset - 200,
	id: heading.id,
  });
}

function closest() {
  let h;
  const top = document.scrollingElement.scrollTop;

  let i = headings.length;

  while (i--) {
	h = headings[i];

	if (top >= h.top) return h;
  }
}

window.addEventListener("scroll", () => {
  const h = closest();
  if (!h) return;

  currentApiPrefix = h.id.split(".")[0];
  parentMenuSelector = document.querySelector(`#${currentApiPrefix}-menu`);
  parentMenuSelector.classList.add("active");

  if (lastApiPrefix && lastApiPrefix !== currentApiPrefix) {
	document.querySelector(`#${lastApiPrefix}-menu`).classList.remove("active");
  }

  document.querySelectorAll("#menu li a").forEach(el => el.classList.remove("active"));

  document.querySelector(`a[href="#${h.id}"]`).classList.add("active");

  lastApiPrefix = currentApiPrefix.split(".")[0];
});

//  ------------------- cookies -----------------------------

function createCookie(name, value, days) {
  let expires;

  if (days) {
	const date = new Date();

	date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);

	expires = `; expires=${date.toGMTString()}`;
  } else {
	expires = "";
  }

  document.cookie = `${encodeURIComponent(name)}=${encodeURIComponent(value)}${expires}; path=/`;
}

function readCookie(name) {
  const nameEQ = `${encodeURIComponent(name)}=`;
  const ca = document.cookie.split(";");

  for (let i = 0; i < ca.length; i++) {
	let c = ca[i];

	while (c.charAt(0) === " ") c = c.substring(1, c.length);

	if (c.indexOf(nameEQ) === 0)
	  return decodeURIComponent(c.substring(nameEQ.length, c.length));
  }

  return null;
}

function eraseCookie(name) {
  createCookie(name, "", -1);
}

// ------------------- i18n notice --------------------------

const $i18nNoticeBox = document.querySelector("#i18n-notice-box");

if (readCookie("i18nClose") && $i18nNoticeBox != null) {
  $i18nNoticeBox.style.display = "none";
} else {
  if ($i18nNoticeBox != null) {
	document
	  .querySelector("#close-i18n-notice-box")
	  .addEventListener("click", () => {
		$i18nNoticeBox.style.display = "none";

		createCookie("i18nClose", 1);
	  });
  }
}

$(function () {
	// hilighth e menu item of the current page
	$("#navmenu ul ul")
		.find('a[href="' + document.location.pathname + '"]')
		.addClass("current");

	// menu bar

	$(window).bind("load resize", function () {
		$("#menu").css("height", $(this).height() - 150 + "px");
	});

	$("#tags-side-menu li").on("click", function () {
		// Remove prev 'active's
		$(this).next().siblings().removeClass("active");
		$(this).next().addClass("active");
	});

	// show mobile menu
	$("#nav-button").click(function () {
		$("#navmenu").toggleClass("opens");
		$("#overlay").toggleClass("blurs");
	});

	// close mobile menu
	$("#overlay").click(function () {
		$("#navmenu").removeClass("opens");
		$("#overlay").removeClass("blurs");
	});

	// dropdown menu

	if ("ontouchstart" in document.documentElement) {
		$("#application-menu").dropit({ action: "click" });
		$("#getting-started-menu").dropit({ action: "click" });
		$("#guide-menu").dropit({ action: "click" });
		$("#advanced-topics-menu").dropit({ action: "click" });
		$("#resources-menu").dropit({ action: "click" });
		$("#blog-menu").dropit({ action: "click" });
		$("#lb-menu").dropit({ action: "click" });
		$("#changelog-menu").dropit({ action: "click" });
	} else {
		$("#application-menu").dropit({ action: "mouseenter" });
		$("#getting-started-menu").dropit({ action: "mouseenter" });
		$("#guide-menu").dropit({ action: "mouseenter" });
		$("#advanced-topics-menu").dropit({ action: "mouseenter" });
		$("#resources-menu").dropit({ action: "mouseenter" });
		$("#blog-menu").dropit({ action: "mouseenter" });
		$("#lb-menu").dropit({ action: "mouseenter" });
		$("#changelog-menu").dropit({ action: "mouseenter" });
	}

	// mobile

	// main menu
	$("#navmenu > li").click(function () {
		// applicable only if it has a menu
		if ($(this).find("ul").length) {
			if ($(this).hasClass("active-mobile-menu")) {
				$(this).removeClass("active-mobile-menu");
				$(this).find(".dropit .dropit-submenu").hide();
			} else {
				$(".dropit .dropit-submenu").hide();
				$(this).find(".dropit .dropit-submenu").show();
				$("#navmenu li.active-mobile-menu").removeClass("active-mobile-menu");
				$(this).addClass("active-mobile-menu");
			}
		} else if (isMobile.any || isSmallScreen) {
			var path = $(this).find("a").attr("href");
			document.location = path;
		}
	});

	// when in mobile mode, menu names should open the submenu
	$(".dropit-trigger a").click(function (e) {
		if (window.matchMedia("(max-width: 899px)").matches) {
			e.preventDefault();
		}
	});

	// sub menu navigation
	$(".dropit-submenu li").click(function () {
		if (isMobile.any || isSmallScreen) {
			var path = $(this).find("a").attr("href");
			document.location = path;
		}
	});
});
