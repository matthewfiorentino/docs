(function () {
  // Only inject on non-homepage pages
  function isHome() {
    var p = window.location.pathname;
    return p === '/' || p === '/index' || p === '';
  }

  function inject() {
    if (isHome()) return;

    // Mintlify footer renders the site logo as an <a href="/"> inside the footer element
    var footer = document.querySelector('footer');
    if (!footer) return;

    var logoLink = footer.querySelector('a[href="/"]');
    if (!logoLink) return;

    // Don't inject twice
    if (footer.querySelector('.ri-footer-institute-logo')) return;

    // Swap the main footer logo to the footer-specific version (blue text on white bg)
    var mainLogoImg = logoLink.querySelector('img');
    if (mainLogoImg) {
      mainLogoImg.src = '/logo/rimuhc-footer-blue.png';
      mainLogoImg.style.height = '48px';
      mainLogoImg.style.width = 'auto';
    }

    // Tighten Mintlify's logo column container so logos sit close together
    var col = logoLink.parentNode;
    col.style.display = 'flex';
    col.style.flexDirection = 'column';
    col.style.alignItems = 'flex-start';
    col.style.gap = '8px';

    // Inject institute logo below
    var img = document.createElement('img');
    img.src = '/logo/institute-dark.png';
    img.alt = 'Research Institute of the McGill University Health Centre';
    img.className = 'ri-footer-institute-logo';

    col.insertBefore(img, logoLink.nextSibling);
  }

  // Watch for footer being added to the DOM (SPA navigation)
  var observer = new MutationObserver(function () {
    inject();
  });
  observer.observe(document.documentElement, { childList: true, subtree: true });

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', inject);
  } else {
    inject();
  }
})();
