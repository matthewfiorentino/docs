(function () {
  function replaceFlags() {
    // EN: US flag → Canadian flag
    document.querySelectorAll('img[alt="US"]').forEach(function (img) {
      if (img.src.indexOf('cloudfront.net/flags') !== -1) {
        img.src = '/images/flag-canada.svg';
        img.alt = 'Canada';
      }
    });

    // FR: CA flag → Quebec flag
    document.querySelectorAll('img[alt="CA"]').forEach(function (img) {
      if (img.src.indexOf('cloudfront.net/flags') !== -1) {
        img.src = '/images/flag-quebec.svg';
        img.alt = 'Quebec';
      }
    });
  }

  // Run once on load
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', replaceFlags);
  } else {
    replaceFlags();
  }

  // Also watch for the dropdown being opened (Radix UI mounts items lazily)
  var observer = new MutationObserver(function (mutations) {
    var relevant = mutations.some(function (m) {
      return Array.from(m.addedNodes).some(function (n) {
        return n.nodeType === 1 && (
          n.querySelector && n.querySelector('img[alt="US"], img[alt="CA"]') ||
          (n.tagName === 'IMG' && (n.alt === 'US' || n.alt === 'CA'))
        );
      });
    });
    if (relevant) replaceFlags();
  });

  observer.observe(document.documentElement, { childList: true, subtree: true });
})();
