(function () {
  function isHome() {
    var p = window.location.pathname;
    return p === '/' || p === '/index' || p === '';
  }

  function inject() {
    if (isHome()) return;

    var footer = document.querySelector('footer');
    if (!footer) return;

    var logoLink = footer.querySelector('a[href="/"]');
    if (!logoLink) return;

    // Don't inject twice
    if (footer.querySelector('.ri-footer-logo-wrap')) return;

    // Swap main logo src
    var mainLogoImg = logoLink.querySelector('img');
    if (mainLogoImg) {
      mainLogoImg.src = '/logo/rimuhc-footer-blue.png';
    }

    // Wrap both logos in a single container we control
    var wrap = document.createElement('div');
    wrap.className = 'ri-footer-logo-wrap';

    // Insert wrap where logoLink currently sits, then move logoLink inside it
    logoLink.parentNode.insertBefore(wrap, logoLink);
    wrap.appendChild(logoLink);

    // Add institute logo inside the same wrap
    var inst = document.createElement('img');
    inst.src = '/logo/institute-dark.png';
    inst.alt = 'Research Institute of the McGill University Health Centre';
    inst.className = 'ri-footer-institute-logo';
    wrap.appendChild(inst);
  }

  var observer = new MutationObserver(function () { inject(); });
  observer.observe(document.documentElement, { childList: true, subtree: true });

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', inject);
  } else {
    inject();
  }
})();
