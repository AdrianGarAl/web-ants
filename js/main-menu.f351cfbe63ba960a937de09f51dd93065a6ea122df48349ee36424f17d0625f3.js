document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector(".topbar");
  const toggle = document.querySelector(".topbar-menu-toggle");
  const nav = document.getElementById("site-navigation");

  if (!header || !toggle || !nav) return;

  const mobileQuery = window.matchMedia("(max-width: 980px)");

  const setHeaderHeight = () => {
    const height = Math.round(header.getBoundingClientRect().height || 78);
    document.documentElement.style.setProperty("--topbar-current-height", `${height}px`);
  };

  const setOpen = (open) => {
    document.body.classList.toggle("site-menu-open", open);
    nav.classList.toggle("is-open", open);
    toggle.classList.toggle("is-open", open);
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Close main navigation" : "Open main navigation");
    setHeaderHeight();
  };

  toggle.addEventListener("click", () => {
    setOpen(!nav.classList.contains("is-open"));
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => setOpen(false));
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      setOpen(false);
    }
  });

  window.addEventListener("resize", () => {
    setHeaderHeight();

    if (!mobileQuery.matches) {
      setOpen(false);
    }
  });

  if (typeof mobileQuery.addEventListener === "function") {
    mobileQuery.addEventListener("change", () => {
      setHeaderHeight();

      if (!mobileQuery.matches) {
        setOpen(false);
      }
    });
  }

  setHeaderHeight();
});
