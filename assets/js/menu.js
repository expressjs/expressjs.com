// It uses `window.matchMedia` instead of `window.addEventListener('resize')` because `matchMedia` performs better by not changing its value with every screen resize.
const mobileScreen = window.matchMedia("(max-width: 1110px)");
let isSmallScreen = mobileScreen?.matches;
const tocScreen = window.matchMedia("(max-width: 800px)");
let isTocScreen = tocScreen.matches;

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
	el.addEventListener("click", (e) => {
		if (e.target.parentNode === el && e.pointerType === "touch" && el.querySelector("a.active")) {
			e.preventDefault(); // Tapping active menu on touchscreen tablet should open menu, not click
		}
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

const langBtn = document.getElementById("langBtn");
const langList = document.getElementById("langList");
const linkItemsMenu = document.querySelectorAll(".submenu > a");
const menu = document.querySelector("#navmenu");
const overlay = document.querySelector("#overlay");
const navButton = document.querySelector("#nav-button");

function closeLangList() {
  langList.classList.remove("open");
  langBtn.setAttribute("aria-expanded", false);
}

function toggleLangList() {
  const isOpen = langList.classList.toggle("open");
  langBtn.setAttribute("aria-expanded", isOpen);
}

// toggle on button click
langBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  toggleLangList();
});

// close on outside click except for lang btn
document.body.addEventListener("click", (e) => {
  if (!langList.contains(e.target)) {
    closeLangList();
  }
});

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

navButton?.addEventListener("click", () => {
	menu?.classList.toggle("opens");
	overlay?.classList.toggle("blurs");
	document.body.classList.toggle("no-scroll");
});

overlay?.addEventListener("click", () => {
	if (menu?.classList.contains("opens")) {
		menu.classList.remove("opens");
	}
	overlay.classList.remove("blurs");
	document.body.classList.remove("no-scroll");
	// TODO : write helper function 
	const isOpen = langList.classList.toggle("open");
	langBtn.setAttribute("aria-expanded", isOpen);
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
