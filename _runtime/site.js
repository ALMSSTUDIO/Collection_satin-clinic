(() => {
  const script = document.currentScript;
  const site = new URL('../', script.src);
  const reference = new URL(script.dataset.route, 'https://satinclinic.framer.website');
  const badgeSelector = [
    '#__framer-badge-container',
    '.__framer-badge',
    '[data-framer-name="Get Template"]',
    'a[href*="uF9GAyRB-satin-skin-clinic"]',
    'a[data-satin-reference-badge]',
  ].join(',');

  const style = document.createElement('style');
  style.textContent = badgeSelector + '{display:none!important;visibility:hidden!important}';
  document.head.append(style);

  function resolveLink(link) {
    const href = link.getAttribute('href');
    if (!href || href.startsWith('#')) return null;
    if (site.pathname !== '/' && href.startsWith(site.pathname)) {
      return new URL(href, site);
    }
    const target = new URL(href, reference);
    if (target.origin !== reference.origin) return null;

    const route = target.pathname.replace(/^\/+|\/+$/g, '');
    return new URL((route ? route + '/' : '') + target.search + target.hash, site);
  }

  function navigate(event) {
    if (event.button !== undefined && event.button !== 0 && event.button !== 1) return;
    const link = event.target.closest('a[href], [data-nested-link][href]');
    if (!link || link.hasAttribute('download')) return;
    const destination = resolveLink(link);
    if (!destination) return;

    event.preventDefault();
    event.stopImmediatePropagation();
    if (event.button === 1 || event.ctrlKey || event.metaKey || event.shiftKey || link.target === '_blank') {
      window.open(destination.href, '_blank', 'noopener');
    } else {
      location.assign(destination.href);
    }
  }

  document.addEventListener('click', navigate, true);
  document.addEventListener('auxclick', navigate, true);
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' && event.target.matches('[data-nested-link][href]')) {
      navigate(event);
    }
  }, true);

  document.addEventListener('submit', (event) => {
    const form = event.target.closest('form[data-framer-form]');
    if (!form) return;

    event.preventDefault();
    event.stopImmediatePropagation();
    let status = form.querySelector('[data-form-status]');
    if (!status) {
      status = document.createElement('p');
      status.dataset.formStatus = '';
      status.setAttribute('role', 'status');
      form.append(status);
    }
    status.textContent = 'This preview does not send consultation requests.';
  }, true);
})();
