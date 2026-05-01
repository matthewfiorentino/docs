(function () {
  'use strict';

  /* ── Move desktop search bar into the sidebar ─────────────────────────────
     #search-bar-entry  = full search bar in the navbar (desktop only)
     #search-bar-entry-mobile = icon in mobile nav top-right — left untouched
  ─────────────────────────────────────────────────────────────────────────── */
  function moveSidebarSearch() {
    if (window.innerWidth < 1024) return;

    var search = document.getElementById('search-bar-entry');
    var nav    = document.getElementById('navigation-items');

    // Nothing to do if elements are missing or search is already in the sidebar
    if (!search || !nav || nav.contains(search)) return;

    nav.insertBefore(search, nav.firstChild);

    // Small gap between search bar and the nav list below it
    search.style.marginBottom = '12px';
  }

  /* ── Center the tab strip in its row ──────────────────────────────────────
     .nav-tabs lives inside a flex container with px-12 padding.
     Setting justify-content: center on that container centers the tabs.
  ─────────────────────────────────────────────────────────────────────────── */
  function centerNavTabs() {
    var tabs = document.querySelector('.nav-tabs');
    if (!tabs || !tabs.parentElement) return;

    var row = tabs.parentElement;

    // Guard: skip if already applied
    if (row.dataset.riCentered) return;

    row.style.justifyContent = 'center';
    row.style.paddingLeft    = '0';
    row.style.paddingRight   = '0';
    row.dataset.riCentered   = '1';
  }

  /* ── Run both ─────────────────────────────────────────────────────────── */
  function run() {
    moveSidebarSearch();
    centerNavTabs();
  }

  /* ── Initial run ─────────────────────────────────────────────────────── */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', run);
  } else {
    run();
  }

  /* ── SPA navigation: re-apply after each page change ─────────────────────
     Mintlify is a Next.js SPA. On navigation the URL changes but there is no
     full page reload. We poll for URL changes and re-run after a short delay
     to let React finish rendering the new page's sidebar.
  ─────────────────────────────────────────────────────────────────────────── */
  var lastHref = location.href;

  setInterval(function () {
    if (location.href !== lastHref) {
      lastHref = location.href;
      // Brief delay so the new page's DOM is ready
      setTimeout(run, 200);
    }
  }, 300);

  /* ── MutationObserver fallback for deferred / async renders ──────────────
     Catches cases where the sidebar renders after the initial JS execution.
     The guards inside moveSidebarSearch / centerNavTabs prevent infinite loops.
  ─────────────────────────────────────────────────────────────────────────── */
  if (window.MutationObserver && document.body) {
    new MutationObserver(run).observe(document.body, {
      childList: true,
      subtree: false   // watch only direct children of body to minimise noise
    });
  }

}());
