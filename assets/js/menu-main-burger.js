(function () {
  if (window.__ANTS_MENU_MAIN_BURGER_INIT__) return;
  window.__ANTS_MENU_MAIN_BURGER_INIT__ = true;

  const init = function () {
    if (!document.body) return;

    const topbar = document.querySelector('.topbar .topbar-inner');
    const logo = topbar ? topbar.querySelector('.topbar-logo') : null;
    const nav = topbar ? topbar.querySelector('nav') : null;
    if (!topbar || !logo || !nav) return;
    if (!document.body.classList.contains('menu-main')) {
      document.body.classList.add('menu-main');
    }

    if (!nav.id) nav.id = 'antsMainNav';

    let toggle = topbar.querySelector('.ants-main-burger');
    if (!toggle) {
      toggle = document.createElement('button');
      toggle.type = 'button';
      toggle.className = 'ants-main-burger';
      toggle.setAttribute('aria-label', 'Open menu');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.setAttribute('aria-controls', nav.id);

      const icon = document.createElement('span');
      icon.className = 'ants-main-burger-icon';
      icon.setAttribute('aria-hidden', 'true');
      icon.innerHTML = '&#9776;';
      toggle.appendChild(icon);

      if (logo.nextSibling) {
        topbar.insertBefore(toggle, logo.nextSibling);
      } else {
        topbar.appendChild(toggle);
      }
    }

    const icon = toggle.querySelector('.ants-main-burger-icon');
    const mobileQuery = window.matchMedia('(max-width: 980px)');
    const header = topbar.closest('.topbar');

    const applyMobileLayout = function () {
      const headerHeight = header ? header.getBoundingClientRect().height : 72;
      document.documentElement.style.setProperty('--mobile-header-h', Math.round(headerHeight) + 'px');

      if (mobileQuery.matches) {
        topbar.style.display = 'flex';
        topbar.style.flexWrap = 'wrap';
        topbar.style.alignItems = 'center';

        logo.style.order = '1';
        logo.style.marginRight = 'auto';

        toggle.style.display = 'inline-flex';
        toggle.style.order = '2';
        toggle.style.marginLeft = 'auto';
        toggle.style.width = '38px';
        toggle.style.height = '38px';
        toggle.style.border = '1px solid rgba(255, 255, 255, 0.42)';
        toggle.style.borderRadius = '8px';
        toggle.style.background = 'rgba(255, 255, 255, 0.12)';
        toggle.style.color = '#ffffff';
        toggle.style.alignItems = 'center';
        toggle.style.justifyContent = 'center';
        toggle.style.padding = '0';
        toggle.style.cursor = 'pointer';

        if (icon) {
          icon.style.color = '#ffffff';
          icon.style.fontSize = '1.35rem';
          icon.style.lineHeight = '1';
          icon.style.fontWeight = '700';
        }

        nav.style.order = '3';
        nav.style.width = '100%';
        nav.style.marginTop = '0.2rem';
        nav.style.paddingTop = '0.55rem';
        nav.style.borderTop = '1px solid rgba(255, 255, 255, 0.28)';
        nav.style.gap = '0.45rem';
        nav.style.whiteSpace = 'normal';
        nav.style.overflowX = 'visible';
        nav.style.overflowY = 'visible';
        if (document.body.classList.contains('ants-menu-open')) {
          const topOffset = header ? Math.round(header.getBoundingClientRect().bottom) : Math.round(headerHeight);
          nav.style.display = 'flex';
          nav.style.flexDirection = 'column';
          nav.style.alignItems = 'stretch';
          nav.style.setProperty('position', 'fixed', 'important');
          nav.style.setProperty('left', '0', 'important');
          nav.style.setProperty('right', '0', 'important');
          nav.style.setProperty('top', topOffset + 'px', 'important');
          nav.style.setProperty('bottom', '0', 'important');
          nav.style.setProperty('z-index', '9998', 'important');
          nav.style.setProperty('width', '100%', 'important');
          nav.style.setProperty('background', 'rgba(26, 18, 18, 0.97)', 'important');
          nav.style.setProperty('padding', '1rem 1rem 1.4rem', 'important');
          nav.style.setProperty('margin', '0', 'important');
          nav.style.setProperty('border-top', '1px solid rgba(255, 255, 255, 0.22)', 'important');
          nav.style.setProperty('overflow-y', 'auto', 'important');
          nav.style.setProperty('overflow-x', 'hidden', 'important');
          nav.style.setProperty('gap', '0', 'important');
          nav.querySelectorAll('a').forEach(function (link) {
            link.style.setProperty('width', '100%', 'important');
            link.style.setProperty('font-size', '1.2rem', 'important');
            link.style.setProperty('line-height', '1.3', 'important');
            link.style.setProperty('padding', '0.85rem 0', 'important');
            link.style.setProperty('border-bottom', '1px solid rgba(255, 255, 255, 0.16)', 'important');
          });
          document.body.classList.add('menu-overlay-active');
        } else {
          nav.style.display = 'none';
          nav.style.removeProperty('position');
          nav.style.removeProperty('left');
          nav.style.removeProperty('right');
          nav.style.removeProperty('top');
          nav.style.removeProperty('bottom');
          nav.style.removeProperty('z-index');
          nav.style.removeProperty('width');
          nav.style.removeProperty('background');
          nav.style.removeProperty('padding');
          nav.style.removeProperty('margin');
          nav.style.removeProperty('border-top');
          nav.style.removeProperty('overflow-y');
          nav.style.removeProperty('overflow-x');
          nav.style.removeProperty('gap');
          nav.style.borderTop = '1px solid rgba(255, 255, 255, 0.28)';
          nav.style.gap = '0.45rem';
          nav.querySelectorAll('a').forEach(function (link) {
            link.style.removeProperty('width');
            link.style.removeProperty('font-size');
            link.style.removeProperty('line-height');
            link.style.removeProperty('padding');
            link.style.removeProperty('border-bottom');
          });
          document.body.classList.remove('menu-overlay-active');
        }
      } else {
        document.body.classList.remove('ants-menu-open');
        document.body.classList.remove('menu-overlay-active');
        toggle.style.display = 'none';
        nav.style.display = '';
        nav.style.flexDirection = '';
        nav.style.alignItems = '';
        nav.style.order = '';
        nav.style.width = '';
        nav.style.marginTop = '';
        nav.style.paddingTop = '';
        nav.style.borderTop = '';
        nav.style.gap = '';
        nav.style.whiteSpace = '';
        nav.style.overflowX = '';
        nav.style.overflowY = '';
        nav.style.removeProperty('position');
        nav.style.removeProperty('left');
        nav.style.removeProperty('right');
        nav.style.removeProperty('top');
        nav.style.removeProperty('bottom');
        nav.style.removeProperty('z-index');
        nav.style.removeProperty('width');
        nav.style.removeProperty('background');
        nav.style.removeProperty('padding');
        nav.style.removeProperty('margin');
        logo.style.order = '';
        logo.style.marginRight = '';
        topbar.style.display = '';
        topbar.style.flexWrap = '';
        topbar.style.alignItems = '';
        nav.querySelectorAll('a').forEach(function (link) {
          link.style.removeProperty('width');
          link.style.removeProperty('font-size');
          link.style.removeProperty('line-height');
          link.style.removeProperty('padding');
          link.style.removeProperty('border-bottom');
        });
      }
    };

    const closeMenu = function () {
      document.body.classList.remove('ants-menu-open');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.setAttribute('aria-label', 'Open menu');
      if (icon) icon.innerHTML = '&#9776;';
      applyMobileLayout();
    };

    toggle.addEventListener('click', function () {
      const isOpen = document.body.classList.toggle('ants-menu-open');
      toggle.setAttribute('aria-expanded', String(isOpen));
      toggle.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
      if (icon) icon.innerHTML = isOpen ? '&#10005;' : '&#9776;';
      applyMobileLayout();
    });

    nav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', closeMenu);
    });

    window.addEventListener('resize', applyMobileLayout);
    if (typeof mobileQuery.addEventListener === 'function') {
      mobileQuery.addEventListener('change', applyMobileLayout);
    } else if (typeof mobileQuery.addListener === 'function') {
      mobileQuery.addListener(applyMobileLayout);
    }

    applyMobileLayout();
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
