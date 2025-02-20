// It uses `window.matchMedia` instead of `window.addEventListener('resize')` because `matchMedia` performs better by not changing its value with every screen resize.
const mobileScreen = window.matchMedia("(max-width: 1110px)");
let isSmallScreen = mobileScreen?.matches;

mobileScreen?.addEventListener("change", (event) => {
	isSmallScreen = event.matches

  if (!isSmallScreen) {
		document.body.classList.remove("no-scroll")
	}
});

// Desktop Menu

const itemsMenu = document.querySelectorAll(".submenu");
const navDrawers = document.querySelectorAll('#navmenu > li')
let activeDrawer // active dropdown nav link


for (const el of itemsMenu) {
	el.addEventListener("click", () => {
		if (isSmallScreen || 'ontouchstart' in document.documentElement) {
		// HANDLE ACTIVE LINKS IN DROPDOWN NAV	
		// if no activeDrawer set then page was set in md logic
		if (!activeDrawer) {
			// remove default active link
			removeActiveFromDrawers(navDrawers)
			// set new active drawer to clicked
			activeDrawer = el
			// add active class
			addActiveToDrawer(el)
		// remove prev activeDrawer and set current to active
		} else if (activeDrawer.id !== el.id) {
			activeDrawer.querySelector('a').classList.remove('active')
			addActiveToDrawer(el)
			activeDrawer = el
		}

			for (const item of itemsMenu) {
        // close any open drawers on click next drawer
				if (item.id !== el.id) {
					item.classList.remove("open");
				}
			}
			el.classList.toggle("open");
		}
	});

	el.addEventListener("mouseenter", () => {
		if (!isSmallScreen) {
			el.classList.add("open");
		}
	});

	el.addEventListener("mouseleave", () => {
		if (!isSmallScreen) {
			el.classList.remove("open");
		}
	});
}

// Mobile Menu and Language Picker

const linkItemsMenu = document.querySelectorAll(".submenu > a");
const languageItems = document.querySelectorAll("#language-picker-menu > #navbar > #navmenu > .submenu > a");
const languagePickerMenu = document.querySelector("#language-picker-menu > #navbar > #navmenu");
const menu = document.querySelector("#navmenu");
const overlay = document.querySelector("#overlay");
const navButton = document.querySelector("#nav-button");
const languagePickerButton = document.querySelector("#language-picker-button");

for (const el of linkItemsMenu) {
	el.addEventListener("click", (e) => {
		if (el.classList.contains("open")) {
			el.classList.remove("open");
		}
		
		if (isSmallScreen || 'ontouchstart' in document.documentElement) {
			e.preventDefault();
		}
	});

}

for (const el of languageItems) {
	el.addEventListener("click", (e) => {
		const href = el.getAttribute("href");

		if (href && href !== "#") {
			languagePickerMenu?.classList.remove("opens");
			overlay?.classList.remove("blurs");
			document.body.classList.remove("no-scroll");

			window.location.href = href;
		}
	});
}

navButton?.addEventListener("click", () => {
	const isLanguageMenuOpen = languagePickerMenu?.classList.contains("opens");

	if (isLanguageMenuOpen) {
		languagePickerMenu?.classList.remove("opens");
		menu?.classList.toggle("opens");
	} else {
		menu?.classList.toggle("opens");
		overlay?.classList.toggle("blurs");
		document.body.classList.toggle("no-scroll");
	}
});

languagePickerButton?.addEventListener("click", () => {
	const isMenuOpen = menu?.classList.contains("opens");

	if (isMenuOpen) {
		menu?.classList.remove("opens");
		languagePickerMenu?.classList.toggle("opens");
	} else {
		languagePickerMenu?.classList.toggle("opens");
		overlay?.classList.toggle("blurs");
		document.body.classList.toggle("no-scroll");
	}
});

overlay?.addEventListener("click", () => {
	if (menu?.classList.contains("opens")) {
		menu.classList.remove("opens");
	}
	if (languagePickerMenu?.classList.contains("opens")) {
		languagePickerMenu.classList.remove("opens");
	}
	overlay.classList.remove("blurs");
	document.body.classList.remove("no-scroll");
});

document
	.querySelector(`.submenu-content a[href="{document.location.pathname}"]`)
	?.classList.add("current");

// when active is unknown, loop over and remove any active link
function removeActiveFromDrawers(navDrawers) {
  for (const item of navDrawers) {
    item.querySelector('a').classList.remove('active')
  }
}
// add active to known link
function addActiveToDrawer(drawer) {
	drawer.querySelector('a').classList.add('active')
}
