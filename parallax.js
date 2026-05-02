(function () {
  function init() {
    var hero = document.querySelector('.ri-text-hero');
    if (!hero) return;

    // Mobile already uses background-attachment:scroll — skip
    if (window.matchMedia('(max-width: 768px)').matches) return;

    var ticking = false;

    function update() {
      var scrollY = window.scrollY || window.pageYOffset;
      var heroBottom = hero.offsetTop + hero.offsetHeight;

      if (scrollY < heroBottom) {
        // Counter-scroll bg by 40% → net bg movement = 60% of content speed
        hero.style.backgroundPositionY = 'calc(50% + ' + (scrollY * 0.4) + 'px)';
      }
      ticking = false;
    }

    window.addEventListener('scroll', function () {
      if (!ticking) {
        requestAnimationFrame(update);
        ticking = true;
      }
    }, { passive: true });

    update();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
