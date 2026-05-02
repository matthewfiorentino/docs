(function () {
  // Map each flag emoji to the replacement image
  var REPLACEMENTS = {
    '🇺🇸': '/images/flag-canada.svg', // 🇺🇸 → Canada
    '🇫🇷': '/images/flag-quebec.svg', // 🇫🇷 → Quebec
    '🇨🇦': '/images/flag-quebec.svg'  // 🇨🇦 → Quebec (fr-CA)
  };

  var IMG_STYLE = 'width:20px;height:14px;object-fit:cover;vertical-align:middle;display:inline-block;border-radius:2px;';

  var replaced = false;

  function replaceFlags() {
    var navbar = document.getElementById('navbar');
    if (!navbar) return;

    var iter = document.createNodeIterator(navbar, NodeFilter.SHOW_TEXT, null, false);
    var toSwap = [];
    var node;

    while ((node = iter.nextNode())) {
      var val = node.nodeValue || '';
      for (var emoji in REPLACEMENTS) {
        if (val.indexOf(emoji) !== -1) {
          toSwap.push({ node: node, emoji: emoji, src: REPLACEMENTS[emoji] });
          break;
        }
      }
    }

    toSwap.forEach(function (item) {
      var img = document.createElement('img');
      img.src = item.src;
      img.alt = '';
      img.setAttribute('style', IMG_STYLE);

      // If the text node is only the emoji, replace the whole node
      if (item.node.nodeValue.trim() === item.emoji) {
        item.node.parentNode.replaceChild(img, item.node);
      } else {
        // Emoji is mixed with other text — split around it
        var parts = item.node.nodeValue.split(item.emoji);
        var frag = document.createDocumentFragment();
        parts.forEach(function (part, i) {
          if (part) frag.appendChild(document.createTextNode(part));
          if (i < parts.length - 1) frag.appendChild(img.cloneNode());
        });
        item.node.parentNode.replaceChild(frag, item.node);
      }
      replaced = true;
    });
  }

  function attempt(retries) {
    replaceFlags();
    // Retry a few times to handle SPA navigation delays
    if (!replaced && retries > 0) {
      setTimeout(function () { attempt(retries - 1); }, 300);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () { attempt(5); });
  } else {
    attempt(5);
  }
})();
