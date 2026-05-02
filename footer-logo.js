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
    if (footer.querySelector('.ri-footer-institute-logo')) return;

    // Swap main logo src — leave node in place, never move React-owned nodes
    var mainLogoImg = logoLink.querySelector('img');
    if (mainLogoImg) {
      mainLogoImg.src = '/logo/rimuhc-footer-blue.png';
    }

    // Redirect main logo click to rimuhc.ca instead of "/"
    logoLink.addEventListener('click', function (e) {
      e.preventDefault();
      window.open('https://rimuhc.ca', '_blank', 'noopener,noreferrer');
    });

    // Mark the parent so CSS can collapse its gap
    logoLink.parentNode.setAttribute('data-ri-footer-logos', 'true');

    // Insert institute logo wrapped in a rimuhc.ca link
    var instLink = document.createElement('a');
    instLink.href = 'https://rimuhc.ca';
    instLink.target = '_blank';
    instLink.rel = 'noopener noreferrer';

    var inst = document.createElement('img');
    inst.src = '/logo/institute-dark.png';
    inst.alt = 'Research Institute of the McGill University Health Centre';
    inst.className = 'ri-footer-institute-logo';

    instLink.appendChild(inst);
    logoLink.parentNode.insertBefore(instLink, logoLink.nextSibling);
  }

  var observer = new MutationObserver(function () { inject(); });
  observer.observe(document.documentElement, { childList: true, subtree: true });

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', inject);
  } else {
    inject();
  }
})();
