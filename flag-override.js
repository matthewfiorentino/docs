(function () {
  var REPLACEMENTS = {
    'US': { src: '/images/flag-canada.svg', alt: 'Canada' },
    'CA': { src: '/images/flag-quebec.svg', alt: 'Quebec'  }
  };

  // Language name → short code
  var LABELS = {
    'English': 'EN', 'english': 'EN',
    'Français': 'FR', 'français': 'FR', 'French': 'FR', 'french': 'FR'
  };

  function patchLabel(btn) {
    // Replace language name text in any span/div children, or bare text nodes
    btn.querySelectorAll('span, div').forEach(function (el) {
      // Only target leaf-level text nodes (skip containers that hold the flag)
      if (el.querySelector('img')) return;
      var t = el.textContent.trim();
      if (LABELS[t]) el.textContent = LABELS[t];
    });
  }

  function patchImg(img) {
    var rep = REPLACEMENTS[img.alt];
    if (!rep) return;
    if (img.src.indexOf('cloudfront.net/flags') === -1) return;

    img.src = rep.src;
    img.alt = rep.alt;

    // Resize the img itself to flag proportions; don't resize the parent
    // (resizing the parent collapses it and pushes the img below the button)
    img.style.width          = '22px';
    img.style.minWidth       = '22px';
    img.style.height         = '14px';
    img.style.borderRadius   = '2px';
    img.style.objectFit      = 'cover';
    img.style.objectPosition = 'center';
    img.style.display        = 'inline-block';
    img.style.verticalAlign  = 'middle';
    img.style.opacity        = '1';

    // Only remove the circle clip on the parent; keep its layout intact
    var parent = img.parentElement;
    if (parent) {
      parent.style.borderRadius = '2px';
      parent.style.overflow     = 'visible';
      parent.style.display      = 'inline-flex';
      parent.style.alignItems   = 'center';
    }

    // Shorten label text in the ancestor button
    var btn = img.closest('button');
    if (btn) patchLabel(btn);
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
