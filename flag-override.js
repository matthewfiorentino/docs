(function () {
  var REPLACEMENTS = {
    'US': { src: '/images/flag-canada.svg', alt: 'Canada' },
    'CA': { src: '/images/flag-quebec.svg', alt: 'Quebec'  }
  };

  function patchImg(img) {
    var rep = REPLACEMENTS[img.alt];
    if (!rep) return;
    if (img.src.indexOf('cloudfront.net/flags') === -1) return;

    img.src = rep.src;
    img.alt = rep.alt;

    // Inline styles override Tailwind's rounded-full and any CSS specificity
    img.style.borderRadius   = '2px';
    img.style.objectFit      = 'contain';
    img.style.objectPosition = 'center';
    img.style.opacity        = '1';

    // Fix the parent container circle clip too
    var parent = img.parentElement;
    if (parent) {
      parent.style.borderRadius = '3px';
      parent.style.overflow     = 'visible';
      parent.style.width        = '22px';
      parent.style.height       = '14px';
    }
  }

  function replaceAll() {
    document.querySelectorAll('img[alt="US"], img[alt="CA"]').forEach(patchImg);
  }

  // Watch for flag images being added to the DOM.
  // MutationObserver callbacks run as microtasks — before the browser paints —
  // so swapping src here prevents the original flag from ever being visible.
  var observer = new MutationObserver(function (mutations) {
    mutations.forEach(function (m) {
      m.addedNodes.forEach(function (node) {
        if (node.nodeType !== 1) return;
        if (node.tagName === 'IMG') {
          patchImg(node);
        } else {
          node.querySelectorAll('img[alt="US"], img[alt="CA"]').forEach(patchImg);
        }
      });
    });
  });

  observer.observe(document.documentElement, { childList: true, subtree: true });

  // Also patch anything already in the DOM on load
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', replaceAll);
  } else {
    replaceAll();
  }
})();
