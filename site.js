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
