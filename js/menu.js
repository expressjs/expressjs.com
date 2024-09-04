// It uses `window.matchMedia` instead of `window.addEventListener('resize')` because `matchMedia` performs better by not changing its value with every screen resize.
const mobileScreen = window.matchMedia("(max-width: 1064px)");
let isSmallScreen = false;

mobileScreen.addEventListener("change", (event) => {
	if (event.matches) {
		isSmallScreen = true;
	}
});

// Desktop Menu

const $itemsMenu = document.querySelectorAll(".submenu");

for (const el of $itemsMenu) {
	el.addEventListener("mouseenter", () => {
		el.classList.add("open");
	});

	el.addEventListener("mouseleave", () => {
		el.classList.remove("open");
	});

	el.addEventListener("click", () => {
		for (const item of $itemsMenu) {
			if (item.id !== el.id) {
				item.classList.remove("open");
			}
		}	
		el.classList.toggle("open");
	});
}

// Mobile Menu

const $linkItemsMenu = document.querySelectorAll(".submenu > a");
const $linkItemsContentMenu = document.querySelectorAll(".submenu-content a");
const $menu = document.querySelector("#navmenu");
const $overlay = document.querySelector("#overlay");

for (const el of $linkItemsMenu) {
	el.addEventListener("click", (e) => {
		if (el.classList.contains("open")) {
			el.classList.remove("open");
		} else if (mobileScreen.matches) {
			e.preventDefault();
		}
	});
}

document.querySelector("#nav-button").addEventListener("click", () => {
	$menu.classList.toggle("opens");
	$overlay.classList.toggle("blurs");
	document.body.classList.toggle("no-scroll")
});

// close mobile menu
$overlay.addEventListener("click", () => {
	$menu.classList.remove("opens");
	$overlay.classList.remove("blurs");
	document.body.classList.remove("no-scroll")
});

// hilight the menu item of the current page
document
	.querySelector(`.submenu-content a[href="${document.location.pathname}"]`)
	.classList.add("current");
