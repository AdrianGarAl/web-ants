(() => {
  const shared = document.querySelector(".home-shared-modules");
  if (!shared) return;

  const panels = shared.querySelectorAll(".home-shared-panel");
  if (!panels.length) return;

  const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

  const shouldAnimate = () => !reducedMotionQuery.matches;

  const onMediaChange = (query, callback) => {
    if (query.addEventListener) {
      query.addEventListener("change", callback);
    } else {
      query.addListener(callback);
    }
  };

  const setProgress = (value) => {
    panels.forEach((el) => {
      el.style.setProperty("--home-p", value);
    });
  };

  let raf = null;

  const update = () => {
    if (!shouldAnimate()) {
      setProgress("1");
      raf = null;
      return;
    }

    const rect = shared.getBoundingClientRect();
    const vh = window.innerHeight || document.documentElement.clientHeight;
    const moduleCenter = rect.top + rect.height / 2;
    const viewportCenter = vh / 2;
    const distance = Math.abs(moduleCenter - viewportCenter);
    const hold = vh * 0.20;
    const range = Math.max(vh * 0.60, 1);
    const activeDistance = Math.max(0, distance - hold);
    const p = Math.max(0, Math.min(1, 1 - activeDistance / range));

    setProgress(p.toFixed(4));

    raf = null;
  };

  const onScroll = () => {
    if (raf) return;
    raf = requestAnimationFrame(update);
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll);
  onMediaChange(reducedMotionQuery, onScroll);
  onScroll();
})();

(() => {
  const services = document.querySelector(".internal-services-home");
  if (!services) return;

  const grid = services.querySelector(".services-grid");
  const targets = services.querySelectorAll(".service-card");

  if (!targets.length) return;

  targets.forEach((el) => {
    const depth = el.dataset.depth || "1";
    el.style.setProperty("--svc-depth", depth);
  });

  const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

  const shouldAnimate = () => !reducedMotionQuery.matches;

  const onMediaChange = (query, callback) => {
    if (query.addEventListener) {
      query.addEventListener("change", callback);
    } else {
      query.addListener(callback);
    }
  };

  const setProgress = (value) => {
    targets.forEach((el) => {
      el.style.setProperty("--svc-p", value);
    });
  };

  const isSingleColumn = () => {
    if (!grid) return false;

    const columns = window.getComputedStyle(grid).gridTemplateColumns;
    return columns.split(" ").filter(Boolean).length === 1;
  };

  const setCardProgress = (vh) => {
    const start = vh * 0.88;
    const end = vh * 0.45;

    targets.forEach((el) => {
      const rect = el.getBoundingClientRect();
      const raw = (start - rect.top) / (start - end);
      const p = Math.max(0, Math.min(1, raw));

      el.style.setProperty("--svc-p", p.toFixed(4));
    });
  };

  let raf = null;

  const update = () => {
    const vh = window.innerHeight || document.documentElement.clientHeight;

    if (!shouldAnimate()) {
      setProgress("1");
      raf = null;
      return;
    }

    if (isSingleColumn()) {
      setCardProgress(vh);
      raf = null;
      return;
    }

    const rect = services.getBoundingClientRect();
    const start = vh * 0.95;
    const end = vh * 0.15;
    const raw = (start - rect.top) / (start - end);
    const p = Math.max(0, Math.min(1, raw));

    setProgress(p.toFixed(4));

    raf = null;
  };

  const onScroll = () => {
    if (raf) return;
    raf = requestAnimationFrame(update);
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll);
  onMediaChange(reducedMotionQuery, onScroll);
  onScroll();
})();
