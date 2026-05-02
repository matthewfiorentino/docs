(function () {
  var KEY = 'ri-cookie-consent';

  // Already decided — don't show banner again
  if (localStorage.getItem(KEY)) return;

  var css = `
    #ri-cookie-banner {
      position: fixed;
      bottom: 0; left: 0; right: 0;
      z-index: 9999;
      background: #fff;
      border-top: 1px solid #e0e0e8;
      box-shadow: 0 -2px 16px rgba(0,0,0,0.08);
      font-family: Arial, "Helvetica Neue", Helvetica, sans-serif;
    }
    #ri-cookie-inner {
      max-width: 1120px;
      margin: 0 auto;
      padding: 14px 24px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 24px;
      flex-wrap: wrap;
    }
    #ri-cookie-text {
      font-size: 13px;
      color: #444;
      line-height: 1.55;
      margin: 0;
      flex: 1;
      min-width: 200px;
    }
    #ri-cookie-text a {
      color: #2b2666;
      text-decoration: underline;
    }
    #ri-cookie-actions {
      display: flex;
      gap: 10px;
      flex-shrink: 0;
    }
    #ri-cookie-decline {
      background: #fff;
      color: #2b2666;
      border: 1.5px solid #2b2666;
      border-radius: 4px;
      font-size: 12px;
      font-weight: 600;
      padding: 6px 14px;
      cursor: pointer;
      transition: background 0.15s, color 0.15s;
    }
    #ri-cookie-decline:hover {
      background: #2b2666;
      color: #fff;
    }
    #ri-cookie-accept {
      background: #ff537f;
      color: #fff;
      border: 1.5px solid #ff537f;
      border-radius: 4px;
      font-size: 12px;
      font-weight: 700;
      padding: 6px 14px;
      cursor: pointer;
      transition: background 0.15s, border-color 0.15s;
    }
    #ri-cookie-accept:hover {
      background: #e0395e;
      border-color: #e0395e;
    }
    @media (max-width: 600px) {
      #ri-cookie-inner { padding: 12px 16px; }
      #ri-cookie-actions { width: 100%; justify-content: flex-end; }
    }
  `;

  function dismiss(banner) {
    banner.style.transition = 'opacity 0.2s, transform 0.2s';
    banner.style.opacity = '0';
    banner.style.transform = 'translateY(8px)';
    setTimeout(function () { banner.remove(); }, 220);
  }

  var strings = {
    en: {
      text: 'The RI-MUHC Clinical Research Hub uses analytics cookies to measure how this documentation is accessed and used. No personal information is collected. This site’s use of cookies complies with Quebec’s Act respecting the protection of personal information in the private sector (Law 25).',
      accept: 'Accept',
      decline: 'Decline'
    },
    fr: {
      text: 'Le Centre de documentation en recherche clinique de l’IR-CUSM utilise des témoins analytiques pour mesurer la façon dont cette documentation est consultée et utilisée. Aucune information personnelle n’est collectée. L’utilisation de témoins sur ce site est conforme à la Loi 25 (Loi modernisant des dispositions législatives en matière de protection des renseignements personnels).',
      accept: 'Accepter',
      decline: 'Refuser'
    }
  };

  function getLang() {
    if (window.location.pathname.indexOf('/fr') === 0) return 'fr';
    var htmlLang = (document.documentElement.lang || '').toLowerCase();
    if (htmlLang.indexOf('fr') === 0) return 'fr';
    return 'en';
  }

  function init() {
    var t = strings[getLang()];

    var style = document.createElement('style');
    style.textContent = css;
    document.head.appendChild(style);

    var banner = document.createElement('div');
    banner.id = 'ri-cookie-banner';
    banner.setAttribute('lang', getLang());
    banner.innerHTML =
      '<div id="ri-cookie-inner">' +
        '<p id="ri-cookie-text">' + t.text + '</p>' +
        '<div id="ri-cookie-actions">' +
          '<button id="ri-cookie-decline">' + t.decline + '</button>' +
          '<button id="ri-cookie-accept">' + t.accept + '</button>' +
        '</div>' +
      '</div>';

    document.body.appendChild(banner);

    banner.querySelector('#ri-cookie-accept').addEventListener('click', function () {
      localStorage.setItem(KEY, 'accepted');
      dismiss(banner);
    });

    banner.querySelector('#ri-cookie-decline').addEventListener('click', function () {
      localStorage.setItem(KEY, 'declined');
      dismiss(banner);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
