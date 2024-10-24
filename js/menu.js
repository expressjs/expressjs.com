// It uses `window.matchMedia` instead of `window.addEventListener('resize')` because `matchMedia` performs better by not changing its value with every screen resize.
const mobileScreen = window.matchMedia("(max-width: 1110px)");
let isSmallScreen = mobileScreen?.matches;

mobileScreen?.addEventListener("change", (event) => {
	isSmallScreen = event.matches

	if (!event.matches) {
		document.body.classList.remove("no-scroll")
	}
});

// Desktop Menu

const itemsMenu = document.querySelectorAll(".submenu");

for (const el of itemsMenu) {
	el.addEventListener("click", () => {
		if (isSmallScreen || 'ontouchstart' in document.documentElement) {
			for (const item of itemsMenu) {
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

// Mobile Menu

const linkItemsMenu = document.querySelectorAll(".submenu > a");
const menu = document.querySelector("#navmenu");
const overlay = document.querySelector("#overlay");

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

document.querySelector("#nav-button")?.addEventListener("click", () => {
	menu?.classList.toggle("opens");
	overlay?.classList.toggle("blurs");
	document.body.classList.toggle("no-scroll")
});

// close mobile menu
overlay?.addEventListener("click", () => {
	menu?.classList.remove("opens");
	overlay?.classList.remove("blurs");
	document.body.classList.remove("no-scroll")
});

// hilight the menu item of the current page
document
	.querySelector(`.submenu-content a[href="{document.location.pathname}"]`)
	?.classList.add("current");
