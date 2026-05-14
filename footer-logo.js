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
    if (footer.querySelector('.ri-footer-logo-rimuhc')) return;

    // Hide the original React-managed logo — don't touch its src
    logoLink.classList.add('ri-footer-original-hidden');

    // Insert our own RIMUHC logo (fully new element, React won't touch it)
    var rimuhcLink = document.createElement('a');
    rimuhcLink.href = 'https://rimuhc.ca';
    rimuhcLink.target = '_blank';
    rimuhcLink.rel = 'noopener noreferrer';
    var rimuhcImg = document.createElement('img');
    rimuhcImg.src = '/logo/RIMUHC_logo_footer1.png';
    rimuhcImg.alt = 'RI-MUHC';
    rimuhcImg.className = 'ri-footer-logo-rimuhc';
    rimuhcLink.appendChild(rimuhcImg);

    // Insert our own institute logo
    var instLink = document.createElement('a');
    instLink.href = 'https://rimuhc.ca';
    instLink.target = '_blank';
    instLink.rel = 'noopener noreferrer';
    var instImg = document.createElement('img');
    instImg.src = '/logo/RIMUHC_logo_footer2.png';
    instImg.alt = 'Research Institute of the McGill University Health Centre';
    instImg.className = 'ri-footer-logo-institute';
    instLink.appendChild(instImg);

    // Mark parent for CSS gap control, insert both before the hidden original
    var col = logoLink.parentNode;
    col.setAttribute('data-ri-footer-logos', 'true');
    col.insertBefore(instLink, logoLink);
    col.insertBefore(rimuhcLink, instLink);
  }

  var observer = new MutationObserver(function () { inject(); });
  observer.observe(document.documentElement, { childList: true, subtree: true });

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', inject);
  } else {
    inject();
  }
})();
