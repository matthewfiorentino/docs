/**
 * toc-fix.js
 *
 * Mintlify's built-in TOC tracker uses IntersectionObserver and marks a
 * heading "active" as soon as it enters the viewport from the bottom.
 * On pages with tall content between headings (Mermaid diagrams, large
 * tables, etc.) the next section's heading is already visible at the
 * bottom of the screen while the user is still reading the current one —
 * so the TOC jumps ahead.
 *
 * Fix: after each scroll frame, find the heading whose top edge is just
 * above 40 % of the viewport height (i.e. "the heading I most recently
 * scrolled past") and force-set data-active / data-active-deepest on the
 * matching toc-item li.  We use a double-rAF so our correction always
 * runs after Mintlify's own IO callback has had a chance to fire first.
 */
(function () {
  'use strict';

  /** Fraction of viewport height — heading must be above this to be active */
  var CUTOFF = 0.40;

  function update() {
    var art = document.querySelector('article');
    if (!art) return;

    var headings = Array.from(art.querySelectorAll('h2[id], h3[id]'));
    var tocItems = Array.from(
      document.querySelectorAll('#table-of-contents-content li.toc-item')
    );
    if (!headings.length || !tocItems.length) return;

    /* ── Find the correct active heading ── */
    var cutoff = window.innerHeight * CUTOFF;
    var activeId = headings[0].id; // default: first heading

    for (var i = 0; i < headings.length; i++) {
      if (headings[i].getBoundingClientRect().top < cutoff) {
        activeId = headings[i].id;
      }
    }

    /* ── Check whether Mintlify already has it right ── */
    var current = document.querySelector(
      '#table-of-contents-content li.toc-item[data-active-deepest="true"]'
    );
    var currentHref = current
      ? (current.querySelector('a') || {}).getAttribute
        ? current.querySelector('a').getAttribute('href')
        : ''
      : '';
    if (currentHref === '#' + activeId) return; // already correct, nothing to do

    /* ── Build href → li map ── */
    var map = {};
    tocItems.forEach(function (li) {
      var a = li.querySelector('a');
      if (a) {
        var href = (a.getAttribute('href') || '').replace(/^#/, '');
        map[href] = li;
      }
    });

    var activeLi = map[activeId];
    if (!activeLi) return;

    /* ── Apply correction ── */
    tocItems.forEach(function (li) {
      li.removeAttribute('data-active-deepest');
      li.removeAttribute('data-active');
    });
    activeLi.setAttribute('data-active-deepest', 'true');
    activeLi.setAttribute('data-active', 'true');

    /* ── Reposition the native sliding dot ── */
    var dot = document.querySelector('#table-of-contents div.relative > span');
    if (dot) {
      var a = activeLi.querySelector('a');
      if (a) {
        var aRect = a.getBoundingClientRect();
        var pRect = dot.parentElement.getBoundingClientRect();
        dot.style.top = (aRect.top - pRect.top + aRect.height / 2) + 'px';
      }
    }
  }

  /* Double-rAF ensures we run after Mintlify's IO callback */
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

  function init() {
    window.addEventListener('scroll', scheduleUpdate, { passive: true });
    scheduleUpdate();
  }

  /* Wait for Mintlify's own JS to finish initialising */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () { setTimeout(init, 800); });
  } else {
    setTimeout(init, 800);
  }
})();
