// Note: Following code only used on api pages

// highlight current Menu on scroll
const headings = Array.from(document.querySelectorAll("h2, h3"));
const menuLinks = document.querySelectorAll("#menu li a");

const observerOptions = {
    root: null,
    rootMargin: "-10% 0px -65% 0px",
    threshold: 1,
};

const menuObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            const currentApiPrefix = entry.target.id.split(".")[0];
            const parentMenuSelector = `#${currentApiPrefix}-menu`;
            const parentMenuEl = document.querySelector(parentMenuSelector);

            // open submenu on scroll
            if (parentMenuEl) parentMenuEl.classList.add("active");

            // Remove active class from last menu item
            const lastActiveMenu = document.querySelector(".active[id$='-menu']");
            if (lastActiveMenu && lastActiveMenu.id !== parentMenuEl.id) {
                lastActiveMenu.classList.remove("active");
            }

            // Update active link
            menuLinks.forEach((link) => link.classList.remove("active"));
            const activeLink = document.querySelector(`a[href="#${entry.target.id}"]`);
            if (activeLink && !activeLink.classList.contains("active")) activeLink.classList.add("active");
        }
    });
}, observerOptions);

headings.forEach((heading) => menuObserver.observe(heading));

// TOC 
const toggleBtn = document.getElementById("menu-toggle");
const tocList = document.getElementById("menu");

function updateTocVisibility() {
    if (isTocScreen) {
        toggleBtn?.classList.add("show");
    } else {
        toggleBtn?.classList.remove("show");
    }
}

// toc button on page load
updateTocVisibility();

// Listen for changes in screen size
tocScreen.addEventListener("change", (event) => {
    isTocScreen = event.matches;
    updateTocVisibility();
});

// Toggle toc menu on button click
toggleBtn?.addEventListener("click", (e) => {
    toggleBtn.classList.toggle("rotate");
    if (tocList?.classList.contains("open")) {
        tocList.classList.remove("open");
    } else {
        tocList.classList.add("open");
    }
});

// Open/Close sub TOC content on click
document.querySelectorAll("#menu > li > a").forEach((link) => {
    link.addEventListener("click", function (event) {
        event.preventDefault(); // stop navigation to submenu

        // Find the closest parent <li>
        const closestLiParent = link.closest("li");
        const childUlSubMenu = closestLiParent.children[1];

        // If submenu is already active, remove "active" class (toggle behavior)
        if (childUlSubMenu?.classList.contains("active")) {
            childUlSubMenu.classList.remove("active");
        } else {
            // Remove "active" from all other submenus
            document.querySelectorAll("#menu > li > ul").forEach((subMenu) => {
                subMenu.classList.remove("active");
            });

            // Add "active" to the clicked submenu
            childUlSubMenu?.classList.add("active");
        }
    });
});
