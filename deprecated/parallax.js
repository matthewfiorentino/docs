/**
 * parallax.js
 *
 * Lightweight scroll-based parallax for the homepage hero background.
 * Shifts the hero's background-position-y at ~8% of scroll velocity,
 * giving a subtle "image moves slower than content" feel. Runs at most
 * once per animation frame.
 */
(function () {
  'use strict';

  function init() {
    var hero = document.querySelector('.ri-text-hero');
    if (!hero) return;

    var ticking = false;
    function update() {
      var y = window.scrollY;
      if (y < hero.offsetHeight * 1.5) {
        hero.style.backgroundPositionY = (50 + y * 0.08) + '%';
      }
      ticking = false;
    }

    window.addEventListener('scroll', function () {
      if (!ticking) {
        requestAnimationFrame(update);
        ticking = true;
      }
    }, { passive: true });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
