(function () {
  if (window.__ANTS_PROJECT_MOBILE_MENU_INIT__) return;
  window.__ANTS_PROJECT_MOBILE_MENU_INIT__ = true;

  const init = function () {
    if (!document.body) return;
    if (!document.body.classList.contains('mobile-ready')) {
      document.body.classList.add('mobile-ready');
    }

    const topbar = document.querySelector('.osiris-project-topbar');
    const inner = topbar ? topbar.querySelector('.osiris-project-topbar-inner') : null;
    const logo = inner ? inner.querySelector('.osiris-project-logo') : null;
    const nav = inner ? inner.querySelector('.osiris-project-nav') : null;
    if (!topbar || !inner || !logo || !nav) return;
    if (!document.body.classList.contains('osiris-theme')) {
      document.body.classList.add('osiris-theme');
    }

    if (!nav.id) nav.id = 'projectMainNav';

    let toggle = inner.querySelector('.project-mobile-burger, .reminder-burger, .perseo-mobile-toggle, .vinci-burger, .osiris-burger');
    const hasCustomToggle = !!toggle;

    if (!toggle) {
      toggle = document.createElement('button');
      toggle.type = 'button';
      toggle.className = 'project-mobile-burger';
      toggle.setAttribute('aria-label', 'Open menu');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.setAttribute('aria-controls', nav.id);

      const icon = document.createElement('span');
      icon.className = 'project-mobile-burger-icon';
      icon.setAttribute('aria-hidden', 'true');
      icon.innerHTML = '&#9776;';
      toggle.appendChild(icon);

      if (logo.nextSibling) {
        inner.insertBefore(toggle, logo.nextSibling);
      } else {
        inner.appendChild(toggle);
      }
    }

    const icon =
      toggle.querySelector('.project-mobile-burger-icon') ||
      toggle.querySelector('.reminder-burger-icon') ||
      toggle.querySelector('.perseo-mobile-toggle-icon') ||
      toggle.querySelector('.vinci-burger-icon') ||
      toggle.querySelector('.osiris-burger-icon');

    const mobileQuery = window.matchMedia('(max-width: 980px)');

    const isOpen = function () {
      return (
        document.body.classList.contains('project-menu-open') ||
        document.body.classList.contains('vinci-menu-open') ||
        document.body.classList.contains('perseo-menu-open') ||
        document.body.classList.contains('osiris-menu-open') ||
        nav.classList.contains('is-open')
      );
    };

    const updateHeaderVar = function () {
      const h = topbar.getBoundingClientRect().height || 72;
      document.documentElement.style.setProperty('--mobile-header-h', Math.round(h) + 'px');
    };

    const applyNavOverlayStyles = function (open) {
      const topOffset = topbar ? Math.round(topbar.getBoundingClientRect().bottom) : 72;
      if (mobileQuery.matches && open) {
        const topbarStyles = window.getComputedStyle(topbar);
        const bgImage = topbarStyles.backgroundImage;
        const bgColor = topbarStyles.backgroundColor;
        const hasBgImage = bgImage && bgImage !== 'none';

        nav.style.setProperty('position', 'fixed', 'important');
        nav.style.setProperty('left', '0', 'important');
        nav.style.setProperty('right', '0', 'important');
        nav.style.setProperty('top', topOffset + 'px', 'important');
        nav.style.setProperty('bottom', '0', 'important');
        nav.style.setProperty('z-index', '9998', 'important');
        nav.style.setProperty('width', '100%', 'important');
        nav.style.setProperty('margin', '0', 'important');
        nav.style.setProperty('padding', '1rem 1rem 1.35rem', 'important');
        if (hasBgImage) {
          nav.style.setProperty('background-image', bgImage, 'important');
          nav.style.setProperty('background-color', bgColor, 'important');
          nav.style.setProperty('background-repeat', 'no-repeat', 'important');
          nav.style.setProperty('background-size', 'cover', 'important');
          nav.style.setProperty('background-position', 'center', 'important');
        } else {
          nav.style.removeProperty('background-image');
          nav.style.setProperty('background-color', bgColor, 'important');
        }
        nav.style.setProperty('border-top', '1px solid rgba(255, 255, 255, 0.22)', 'important');
        nav.style.setProperty('overflow-y', 'auto', 'important');
        nav.style.setProperty('overflow-x', 'hidden', 'important');
        nav.style.setProperty('display', 'flex', 'important');
        nav.style.setProperty('flex-direction', 'column', 'important');
        nav.style.setProperty('align-items', 'stretch', 'important');
        nav.style.setProperty('gap', '0', 'important');

        nav.querySelectorAll('a').forEach(function (link) {
          link.style.setProperty('width', '100%', 'important');
          link.style.setProperty('font-size', '1.18rem', 'important');
          link.style.setProperty('line-height', '1.3', 'important');
          link.style.setProperty('padding', '0.85rem 0', 'important');
          link.style.setProperty('border-bottom', '1px solid rgba(255, 255, 255, 0.16)', 'important');
          link.style.setProperty('white-space', 'normal', 'important');
        });
      } else {
        nav.style.removeProperty('position');
        nav.style.removeProperty('left');
        nav.style.removeProperty('right');
        nav.style.removeProperty('top');
        nav.style.removeProperty('bottom');
        nav.style.removeProperty('z-index');
        nav.style.removeProperty('width');
        nav.style.removeProperty('margin');
        nav.style.removeProperty('padding');
        nav.style.removeProperty('background');
        nav.style.removeProperty('background-image');
        nav.style.removeProperty('background-color');
        nav.style.removeProperty('background-repeat');
        nav.style.removeProperty('background-size');
        nav.style.removeProperty('background-position');
        nav.style.removeProperty('border-top');
        nav.style.removeProperty('overflow-y');
        nav.style.removeProperty('overflow-x');
        nav.style.removeProperty('display');
        nav.style.removeProperty('flex-direction');
        nav.style.removeProperty('align-items');
        nav.style.removeProperty('gap');

        nav.querySelectorAll('a').forEach(function (link) {
          link.style.removeProperty('width');
          link.style.removeProperty('font-size');
          link.style.removeProperty('line-height');
          link.style.removeProperty('padding');
          link.style.removeProperty('border-bottom');
          link.style.removeProperty('white-space');
        });
      }
    };

    const syncOverlay = function () {
      updateHeaderVar();
      const open = mobileQuery.matches && isOpen();
      document.body.classList.toggle('menu-overlay-active', open);
      applyNavOverlayStyles(open);

      if (icon && !hasCustomToggle) {
        icon.innerHTML = open ? '&#10005;' : '&#9776;';
      }
      if (!hasCustomToggle) {
        toggle.setAttribute('aria-expanded', String(open));
        toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
      }
    };

    if (!hasCustomToggle) {
      const closeMenu = function () {
        document.body.classList.remove('project-menu-open');
        syncOverlay();
      };

      toggle.addEventListener('click', function () {
        const open = document.body.classList.toggle('project-menu-open');
        if (!open) document.body.classList.remove('menu-overlay-active');
        syncOverlay();
      });

      nav.querySelectorAll('a').forEach(function (link) {
        link.addEventListener('click', closeMenu);
      });
    }

    if (typeof MutationObserver !== 'undefined') {
      const bodyObserver = new MutationObserver(syncOverlay);
      bodyObserver.observe(document.body, { attributes: true, attributeFilter: ['class'] });
      const navObserver = new MutationObserver(syncOverlay);
      navObserver.observe(nav, { attributes: true, attributeFilter: ['class'] });
    }

    window.addEventListener('resize', function () {
      updateHeaderVar();
      if (!mobileQuery.matches && !hasCustomToggle) {
        document.body.classList.remove('project-menu-open');
      }
      syncOverlay();
    });

    if (typeof mobileQuery.addEventListener === 'function') {
      mobileQuery.addEventListener('change', syncOverlay);
    } else if (typeof mobileQuery.addListener === 'function') {
      mobileQuery.addListener(syncOverlay);
    }

    syncOverlay();
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
