/**
 * toc-fix.js
 *
 * Mintlify's built-in IntersectionObserver marks a heading "active" the
 * instant it enters the viewport from the bottom.  On pages with tall
 * content between headings (Mermaid diagrams, large tables, card groups)
 * the next section's heading is already on-screen while the user is still
 * reading the current one, so the TOC jumps ahead.
 *
 * Key design choices:
 *   1. Build the heading list from TOC <a> hrefs, NOT from scanning the
 *      article.  Mintlify components (Accordion, Steps, Card) can render
 *      heading-level elements with IDs that would otherwise pollute the list.
 *   2. A heading is "active" only once its top edge passes 40 % of the
 *      viewport (it has genuinely scrolled into reading position).
 *   3. Double-rAF ensures we run AFTER Mintlify's own IO callback.
 *   4. No early-exit shortcut — always apply the correction.
 *   5. Re-initialises on SPA navigation (Mintlify uses client-side routing).
 */
(function () {
  'use strict';

  /** Fraction of viewport height.  Heading must be ABOVE this to be active. */
  var CUTOFF = 0.40;

  /* ─── Build heading list from the TOC itself ──────────────────────────── */
  function buildList() {
    var links = Array.from(
      document.querySelectorAll('#table-of-contents-content a[href^="#"]')
    );
    return links
      .map(function (a) {
        var id  = decodeURIComponent(a.getAttribute('href').slice(1));
        var el  = document.getElementById(id);
        var li  = a.closest('li.toc-item');
        return el && li ? { id: id, el: el, a: a, li: li } : null;
      })
      .filter(Boolean);
  }

  /* ─── Apply the correct active state ─────────────────────────────────── */
  function applyActive(items, activeIdx) {
    var dot    = document.querySelector('#table-of-contents div.relative > span');
    var dotPar = dot ? dot.parentElement : null;

    items.forEach(function (item, i) {
      if (i === activeIdx) {
        item.li.setAttribute('data-active-deepest', 'true');
        item.li.setAttribute('data-active',         'true');
        /* Reposition the native sliding dot */
        if (dot && dotPar) {
          var aRect = item.a.getBoundingClientRect();
          var pRect = dotPar.getBoundingClientRect();
          dot.style.top = (aRect.top - pRect.top + aRect.height / 2) + 'px';
        }
      } else {
        item.li.removeAttribute('data-active-deepest');
        item.li.removeAttribute('data-active');
      }
    });
  }

  /* ─── Core update logic ───────────────────────────────────────────────── */
  function update() {
    var items = buildList();
    if (!items.length) return;

    var cutoff    = window.innerHeight * CUTOFF;
    var activeIdx = 0; /* default: first heading */

    for (var i = 0; i < items.length; i++) {
      var top = items[i].el.getBoundingClientRect().top;
      if (top < cutoff) {
        activeIdx = i;
      }
    }

    applyActive(items, activeIdx);
  }

  /* ─── Scroll handler — double-rAF so we run after Mintlify's IO ────────  */
  var pending = false;
  function scheduleUpdate() {
    if (pending) return;
    pending = true;
    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        update();
        pending = false;
      });
    });
  }

  /* ─── Init ────────────────────────────────────────────────────────────── */
  var attached = false;
  function init() {
    update(); /* set correct state immediately */
    if (!attached) {
      window.addEventListener('scroll', scheduleUpdate, { passive: true });
      attached = true;
    }
  }

  /* ─── Handle SPA navigation (Mintlify re-renders content without reload) */
  function waitForToc(retries) {
    if (document.querySelector('#table-of-contents-content li.toc-item')) {
      setTimeout(init, 400); /* brief delay lets Mintlify's own IO settle */
    } else if (retries > 0) {
      setTimeout(function () { waitForToc(retries - 1); }, 200);
    }
  }

  /* Observe URL changes (pushState / popState) */
  var lastUrl = location.href;
  new MutationObserver(function () {
    if (location.href !== lastUrl) {
      lastUrl  = location.href;
      attached = false; /* reset so scroll listener re-attaches cleanly */
      waitForToc(10);
    }
  }).observe(document.body, { childList: true, subtree: true });

  /* Initial page load */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () { waitForToc(10); });
  } else {
    waitForToc(10);
  }

})();
