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

  /* ─── Fix: sidebar group toggle buttons should not navigate ──────────────
     Mintlify's React onClick for collapsible group buttons calls both
     setState (toggle) AND router.push(firstChildUrl). We want the toggle but
     not the navigation. Intercept history.pushState and suppress calls that
     arrive within 300 ms of a toggle-button click.                          */
  (function () {
    var lastToggleMs = 0;

    /* capture phase — fires before React's delegated handlers */
    document.addEventListener('click', function (e) {
      if (e.target.closest('button[aria-label^="Toggle"]')) {
        lastToggleMs = Date.now();
      }
    }, true);

    var _origPush = history.pushState.bind(history);
    history.pushState = function (state, title, url) {
      if (Date.now() - lastToggleMs < 300) return; /* suppress */
      return _origPush(state, title, url);
    };
  }());

  /* ─── Fix: Knowledge Base tab should not appear active on the homepage ───
     index.mdx lives at / and is not inside any tab's pages list, so Mintlify
     defaults to marking the first tab (KB) active. Clear it on the homepage. */
  function clearNavTabsOnHome() {
    if (location.pathname !== '/') return;
    requestAnimationFrame(function () {
      document.querySelectorAll('.nav-tabs a.link, .nav-tabs button.link').forEach(function (el) {
        el.removeAttribute('data-active');
        el.removeAttribute('aria-current');
      });
    });
  }

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

  /* ─── Ensure the injected sliding dot div exists ────────────────────── */
  function ensureDot() {
    var dot = document.getElementById('toc-dot');
    if (!dot) {
      var container = document.getElementById('table-of-contents-content');
      if (!container) return null;
      dot = document.createElement('div');
      dot.id = 'toc-dot';
      container.appendChild(dot);
    }
    return dot;
  }

  /* ─── Walk offsetParent chain to get top relative to an ancestor ─────── */
  function offsetTopFrom(el, ancestor) {
    var top = 0;
    while (el && el !== ancestor) {
      top += el.offsetTop;
      el   = el.offsetParent;
    }
    return top;
  }

  /* ─── Apply the correct active state ─────────────────────────────────── */
  function applyActive(items, activeIdx) {
    var dot       = ensureDot();
    var container = document.getElementById('table-of-contents-content');

    items.forEach(function (item, i) {
      if (i === activeIdx) {
        item.li.setAttribute('data-active-deepest', 'true');
        item.li.setAttribute('data-active',         'true');
        /* Slide the injected dot to the vertical centre of the active link */
        if (dot && container) {
          var linkTop = offsetTopFrom(item.a, container);
          dot.style.top = (linkTop + item.a.offsetHeight / 2) + 'px';
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
      clearNavTabsOnHome();
      waitForToc(10);
    }
  }).observe(document.body, { childList: true, subtree: true });

  /* Initial page load */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () { clearNavTabsOnHome(); waitForToc(10); });
  } else {
    clearNavTabsOnHome();
    waitForToc(10);
  }

})();
