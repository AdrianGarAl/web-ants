document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector(".topbar");
  const toggle = document.querySelector(".topbar-menu-toggle");
  const nav = document.getElementById("site-navigation");
  const overflowMenus = nav ? nav.querySelectorAll(".topbar-nav-item--overflow") : [];

  if (!header || !toggle || !nav) return;

  const mobileQuery = window.matchMedia("(max-width: 980px)");

  const setHeaderHeight = () => {
    const height = Math.round(header.getBoundingClientRect().height || 78);
    header.style.setProperty("--topbar-current-height", `${height}px`);
  };

  const setOverflowMenusOpen = (open) => {
    overflowMenus.forEach((menu) => {
      menu.open = open;
    });
  };

  const setOpen = (open) => {
    document.body.classList.toggle("site-menu-open", open);
    nav.classList.toggle("is-open", open);
    toggle.classList.toggle("is-open", open);
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Close main navigation" : "Open main navigation");

    if (mobileQuery.matches) {
      setOverflowMenusOpen(open);
    } else if (!open) {
      setOverflowMenusOpen(false);
    }

    setHeaderHeight();
  };

  const closeOverflowMenus = () => {
    setOverflowMenusOpen(false);
  };

  toggle.addEventListener("click", () => {
    setOpen(!nav.classList.contains("is-open"));
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      closeOverflowMenus();
      setOpen(false);
    });
  });

  overflowMenus.forEach((menu) => {
    menu.addEventListener("toggle", () => {
      if (mobileQuery.matches && nav.classList.contains("is-open") && !menu.open) {
        menu.open = true;
        return;
      }

      if (!menu.open) return;

      overflowMenus.forEach((otherMenu) => {
        if (otherMenu !== menu) {
          otherMenu.open = false;
        }
      });
    });
  });

  document.addEventListener("click", (event) => {
    if (!mobileQuery.matches && !nav.contains(event.target)) {
      closeOverflowMenus();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeOverflowMenus();
      setOpen(false);
    }
  });

  window.addEventListener("resize", () => {
    setHeaderHeight();

    if (!mobileQuery.matches) {
      setOpen(false);
    } else if (nav.classList.contains("is-open")) {
      setOverflowMenusOpen(true);
    }
  });

  if (typeof mobileQuery.addEventListener === "function") {
    mobileQuery.addEventListener("change", () => {
      setHeaderHeight();

      if (!mobileQuery.matches) {
        setOpen(false);
      } else if (nav.classList.contains("is-open")) {
        setOverflowMenusOpen(true);
      }
    });
  }

  setHeaderHeight();
});
