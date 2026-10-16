/* Accessible disclosure navigation. Content and links also work without JS. */
(() => {
  const header = document.querySelector('.site-header');
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('#main-nav');
  if (!header || !toggle || !nav) return;
  const mobile = window.matchMedia('(max-width: 1100px)');
  header.classList.add('menu-ready');

  function setOpen(open, returnFocus = false) {
    toggle.setAttribute('aria-expanded', String(open));
    nav.hidden = mobile.matches && !open;
    toggle.querySelector('span').textContent = open ? 'Fechar' : 'Menu';
    if (returnFocus) toggle.focus();
  }
  function syncLayout() {
    const hadFocus = nav.contains(document.activeElement);
    toggle.hidden = !mobile.matches;
    setOpen(false, mobile.matches && hadFocus);
  }
  toggle.addEventListener('click', () => setOpen(toggle.getAttribute('aria-expanded') !== 'true'));
  header.addEventListener('keydown', event => {
    if (event.key === 'Escape' && mobile.matches && !nav.hidden) {
      setOpen(false, true);
    }
  });
  nav.addEventListener('click', event => {
    const link = event.target.closest('a');
    if (!link || !mobile.matches) return;
    const targetURL = new URL(link.href);
    if (targetURL.pathname === location.pathname && targetURL.hash) {
      const target = document.getElementById(targetURL.hash.slice(1));
      setOpen(false);
      if (target) {
        target.setAttribute('tabindex', '-1');
        target.focus({preventScroll: true});
        target.addEventListener('blur', () => target.removeAttribute('tabindex'), {once: true});
      }
    } else setOpen(false, true);
  });
  document.addEventListener('click', event => {
    if (mobile.matches && !nav.hidden && !header.contains(event.target)) setOpen(false);
  });
  mobile.addEventListener('change', syncLayout);
  syncLayout();
  for (const link of nav.querySelectorAll('a')) {
    const url = new URL(link.href);
    if (!url.hash && url.pathname === location.pathname) link.setAttribute('aria-current', 'page');
  }
})();

/* Scroll entrances are optional: all editorial content starts readable. */
(() => {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (reducedMotion.matches || !('IntersectionObserver' in window) || !Element.prototype.animate) return;

  const active = new Set();
  const animationsByNode = new WeakMap();
  const pending = new Set();
  const selectors = [
    '.hero-copy > *', '.hero-art', '.scroll-cue',
    '.section-heading > *', '.two-column > div:first-child > *',
    '.copy-block > *', '.audience-row', '.audience-more', '.audience-note',
    '.process-grid > li', '.process .centered > .button',
    '.office-grid > div', '.office-note', '.faq-list > details',
    '.blog-card', '.journal-all', '.contact-inner > div', '.contact-details',
    '.page-hero h1', '.page-hero p', '.breadcrumbs', '.profile-photo',
    '.content-column > *', '.contact-panel', '.cta-panel > *'
  ].join(',');
  // Exclude nested reveal targets: each piece moves exactly once.
  const candidates = Array.from(document.querySelectorAll(selectors));
  const elements = candidates.filter(node => !candidates.some(parent => parent !== node && parent.contains(node)));

  function runAnimation(node, frames, options) {
    const animation = node.animate(frames, options);
    active.add(animation);
    animationsByNode.set(node, animation);
    animation.finished.then(() => active.delete(animation), () => active.delete(animation));
  }
  function reveal(node, delay = 0, animate = true) {
    node.classList.remove('reveal-pending');
    pending.delete(node);
    observer.unobserve(node);
    if (reducedMotion.matches || !animate) return;
    runAnimation(node, [
      {opacity: 0, transform: 'translateY(28px)'},
      {opacity: 1, transform: 'translateY(0)'}
    ], {duration: 820, delay, easing: 'cubic-bezier(.22, 1, .36, 1)', fill: 'backwards'});
  }
  const observer = new IntersectionObserver(entries => {
    let index = 0;
    for (const entry of entries) {
      if (entry.isIntersecting) reveal(entry.target, Math.min(index++ * 70, 210));
    }
  }, {threshold: 0, rootMargin: '0px 0px -24px 0px'});

  for (const node of elements) {
    // Hash destinations and already-read content must never disappear.
    if (node.getBoundingClientRect().top >= innerHeight - 24) {
      node.classList.add('reveal-pending');
      pending.add(node);
    }
    observer.observe(node);
  }
  document.addEventListener('focusin', event => {
    const node = elements.find(element => element.contains(event.target));
    if (!node) return;
    animationsByNode.get(node)?.cancel();
    reveal(node, 0, false);
  });

  const foliageObserver = new IntersectionObserver(entries => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      foliageObserver.unobserve(entry.target);
      if (reducedMotion.matches) continue;
      for (const path of entry.target.querySelectorAll('path')) {
        path.setAttribute('pathLength', '1');
        runAnimation(path, [{strokeDasharray: '1', strokeDashoffset: '1'}, {strokeDasharray: '1', strokeDashoffset: '0'}],
          {duration: 1500, easing: 'cubic-bezier(.22, 1, .36, 1)'});
      }
    }
  }, {threshold: .1});
  document.querySelectorAll('.botanical').forEach(node => foliageObserver.observe(node));

  reducedMotion.addEventListener('change', event => {
    if (!event.matches) return;
    observer.disconnect();
    foliageObserver.disconnect();
    pending.forEach(node => node.classList.remove('reveal-pending'));
    pending.clear();
    active.forEach(animation => animation.cancel());
    active.clear();
  });
})();
