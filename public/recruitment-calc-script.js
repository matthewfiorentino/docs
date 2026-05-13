(function () {

  var SF_REFS = [
    { area: 'Cross-therapeutic average (industry-sponsored)', range: '~36%', citation: 'Getz KA et al., 2019' },
    { area: 'CNS / Neuroscience', range: '~57%', citation: 'Getz KA et al., 2019' },
    { area: 'Alzheimer\'s disease (mild)', range: '~44%', citation: 'Goldman D et al., 2020' },
    { area: 'Alzheimer\'s disease (preclinical)', range: '~88%', citation: 'Goldman D et al., 2020' },
    { area: 'Oncology — head & neck (curative intent)', range: '~57%', citation: 'Bashir B et al., PMC9934872' },
    { area: 'Oncology — head & neck (palliative intent)', range: '~29%', citation: 'Bashir B et al., PMC9934872' },
    { area: 'Oncology — lung (palliative intent)', range: '~45%', citation: 'Bashir B et al., PMC9934872' },
    { area: 'GU cancers — prostate (Phase II/III)', range: '~25–28%', citation: 'Sfakianos JP et al., 2018' },
    { area: 'Phase I (healthy volunteers)', range: '~62%', citation: 'Zhao Z et al., 2022' }
  ];

  function calculate(n, eligPerMonth, sfPct, winMonths) {
    var sfRate = sfPct / 100;
    var enrollRate = 1 - sfRate;
    var toScreen = Math.ceil(n / enrollRate);
    var productiveMonths = winMonths * (44 / 52);
    var monthlyEnrol = eligPerMonth * enrollRate;
    var optimisticMonths = toScreen / eligPerMonth;
    var conservativeMonths = optimisticMonths * 2;
    var status;
    if (conservativeMonths <= winMonths) { status = 'green'; }
    else if (optimisticMonths <= winMonths) { status = 'amber'; }
    else { status = 'red'; }
    return {
      toScreen: toScreen,
      monthlyEnrol: monthlyEnrol.toFixed(1),
      productiveMonths: Math.round(productiveMonths),
      optimisticMonths: Math.round(optimisticMonths * 10) / 10,
      conservativeMonths: Math.round(conservativeMonths * 10) / 10,
      windowMonths: winMonths,
      status: status,
      sfPct: sfPct,
      n: n,
      eligPerMonth: eligPerMonth
    };
  }

  function formatMonthsFromNow(months) {
    var d = new Date();
    d.setMonth(d.getMonth() + Math.round(months));
    return d.toLocaleDateString('en-CA', { month: 'long', year: 'numeric' });
  }

  function pluralMonths(n) {
    var r = Math.round(n * 10) / 10;
    return r === 1 ? '1 month' : r + ' months';
  }

  function renderOutput(r) {
    var titles = {
      green: 'Your timeline is realistic',
      amber: 'Your optimistic estimate fits — your conservative estimate does not',
      red: 'Your timeline is not achievable at this enrolment rate'
    };
    var icons = { green: '✓', amber: '⚠', red: '✗' };
    var descs = {
      green: 'Both the optimistic (' + pluralMonths(r.optimisticMonths) + ') and conservative (' + pluralMonths(r.conservativeMonths) + ') estimates fit within your ' + pluralMonths(r.windowMonths) + ' recruitment window. This is the exception, not the rule — confirm your eligible patient count with an OACIS query before committing.',
      amber: 'The optimistic projection (' + pluralMonths(r.optimisticMonths) + ') fits your window, but the conservative estimate (' + pluralMonths(r.conservativeMonths) + ') does not. Experience shows actual accrual averages roughly half of projected. Consider extending your recruitment window or reducing your target N.',
      red: 'Even the optimistic projection (' + pluralMonths(r.optimisticMonths) + ') exceeds your ' + pluralMonths(r.windowMonths) + ' window. The conservative estimate is ' + pluralMonths(r.conservativeMonths) + '. You need more eligible patients per month, a lower screen failure rate, a longer window, or a reduced target N.'
    };

    var scaleMax = Math.max(r.conservativeMonths, r.windowMonths) * 1.05;
    var optPct  = Math.min((r.optimisticMonths  / scaleMax) * 100, 100).toFixed(1);
    var conPct  = Math.min((r.conservativeMonths / scaleMax) * 100, 100).toFixed(1);
    var winPct  = Math.min((r.windowMonths       / scaleMax) * 100, 100).toFixed(1);
    var optOver = r.optimisticMonths  > r.windowMonths;
    var conOver = r.conservativeMonths > r.windowMonths;

    var halveNote = r.sfPct < 20
      ? '<div class="rc-note"><strong>Note on screen failure rate:</strong> Your entered rate of ' + r.sfPct + '% is lower than the cross-therapeutic average of ~36% for industry-sponsored trials. Verify this reflects local data from a prior OACIS search, not an optimistic assumption.</div>'
      : '';

    var html =
      '<div class="rc-status-bar ' + r.status + '">' +
        '<div class="rc-status-icon">' + icons[r.status] + '</div>' +
        '<div class="rc-status-text">' +
          '<div class="rc-status-title">' + titles[r.status] + '</div>' +
          '<p class="rc-status-desc">' + descs[r.status] + '</p>' +
        '</div>' +
      '</div>' +

      '<div class="rc-metrics">' +
        '<div class="rc-metric"><div class="rc-metric-label">Patients to screen</div><div class="rc-metric-value">' + r.toScreen.toLocaleString() + '</div><div class="rc-metric-sub">to enrol ' + r.n + ' at ' + r.sfPct + '% screen failure</div></div>' +
        '<div class="rc-metric"><div class="rc-metric-label">Monthly enrolment rate</div><div class="rc-metric-value">' + r.monthlyEnrol + '</div><div class="rc-metric-sub">participants per month (optimistic)</div></div>' +
        '<div class="rc-metric"><div class="rc-metric-label">Productive months available</div><div class="rc-metric-value">' + r.productiveMonths + '</div><div class="rc-metric-sub">of ' + r.windowMonths + ' total (44 weeks/year)</div></div>' +
        '<div class="rc-metric"><div class="rc-metric-label">Optimistic LPI</div><div class="rc-metric-value">' + pluralMonths(r.optimisticMonths) + '</div><div class="rc-metric-sub">' + formatMonthsFromNow(r.optimisticMonths) + '</div></div>' +
        '<div class="rc-metric"><div class="rc-metric-label">Conservative LPI</div><div class="rc-metric-value">' + pluralMonths(r.conservativeMonths) + '</div><div class="rc-metric-sub">' + formatMonthsFromNow(r.conservativeMonths) + ' — halved projection</div></div>' +
        '<div class="rc-metric"><div class="rc-metric-label">Your window</div><div class="rc-metric-value">' + pluralMonths(r.windowMonths) + '</div><div class="rc-metric-sub">recruitment period in protocol / grant</div></div>' +
      '</div>' +

      '<div class="rc-chart-section">' +
        '<div class="rc-chart-title">Projection vs recruitment window</div>' +
        '<div class="rc-bar-row"><div class="rc-bar-label">Optimistic</div><div class="rc-bar-track"><div class="rc-bar-fill optimistic" style="width:' + optPct + '%"></div></div><div class="rc-bar-val' + (optOver ? ' over' : '') + '">' + pluralMonths(r.optimisticMonths) + '</div></div>' +
        '<div class="rc-bar-row"><div class="rc-bar-label">Conservative</div><div class="rc-bar-track"><div class="rc-bar-fill conservative" style="width:' + conPct + '%"></div></div><div class="rc-bar-val' + (conOver ? ' over' : '') + '">' + pluralMonths(r.conservativeMonths) + '</div></div>' +
        '<div class="rc-bar-row"><div class="rc-bar-label">Your window</div><div class="rc-bar-track"><div class="rc-bar-fill window" style="width:' + winPct + '%"></div></div><div class="rc-bar-val">' + pluralMonths(r.windowMonths) + '</div></div>' +
        '<div class="rc-chart-legend">' +
          '<div class="rc-legend-item"><div class="rc-legend-dot" style="background:#007468"></div> Optimistic (full accrual pace)</div>' +
          '<div class="rc-legend-item"><div class="rc-legend-dot" style="background:#b97800"></div> Conservative (halved projection)</div>' +
          '<div class="rc-legend-item"><div class="rc-legend-dot" style="background:#c8c8d8"></div> Your recruitment window</div>' +
        '</div>' +
      '</div>' +

      halveNote +

      '<div class="rc-note"><strong>Productive recruitment weeks:</strong> The calculator uses 44 productive recruitment weeks per year (not 52), reflecting the impact of clinical commitments, holidays, competing studies, and site activation ramp-up time. This is the figure cited in RI-MUHC operational guidance.</div>' +

      '<div class="rc-warning"><strong>What to do with this number.</strong> The conservative estimate is not a worst case — it is the historically observed average for experienced sites. If the conservative estimate does not fit your window, renegotiate before you commit: extend the timeline, reduce target N with the sponsor, or identify additional recruitment sources. Sponsors track enrolment performance; sites with consistent records receive preferential consideration in future trials.</div>';

    document.getElementById('rc-output').innerHTML = html;
    document.getElementById('rc-output').classList.add('visible');
    document.getElementById('rc-output').scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  function init() {
    var tbody = document.getElementById('rc-ref-body');
    if (tbody) {
      tbody.innerHTML = SF_REFS.map(function (r) {
        return '<tr><td>' + r.area + '</td><td class="rc-range">' + r.range + '</td><td class="rc-cite">' + r.citation + '</td></tr>';
      }).join('');
    }

    document.getElementById('rc-ref-btn').addEventListener('click', function () {
      var tbl = document.getElementById('rc-ref-table');
      var open = tbl.classList.toggle('open');
      this.textContent = open
        ? 'Hide reference table ▴'
        : 'View published screen failure rates by therapeutic area ▾';
    });

    document.getElementById('rc-calc-btn').addEventListener('click', function () {
      var n         = parseFloat(document.getElementById('rc-n').value);
      var elig      = parseFloat(document.getElementById('rc-elig').value);
      var sf        = parseFloat(document.getElementById('rc-sf').value);
      var winMonths = parseFloat(document.getElementById('rc-window').value);
      var out = document.getElementById('rc-output');

      if (!n || !elig || isNaN(sf) || !winMonths) {
        out.innerHTML = '<div class="rc-warning">Please fill in all four fields before calculating.</div>';
        out.classList.add('visible');
        return;
      }
      if (sf < 0 || sf >= 100) {
        out.innerHTML = '<div class="rc-warning">Screen failure rate must be between 0 and 99%.</div>';
        out.classList.add('visible');
        return;
      }
      renderOutput(calculate(n, elig, sf, winMonths));
    });

    ['rc-n', 'rc-elig', 'rc-sf', 'rc-window'].forEach(function (id) {
      document.getElementById(id).addEventListener('keydown', function (e) {
        if (e.key === 'Enter') document.getElementById('rc-calc-btn').click();
      });
    });

    document.getElementById('rc-reset-btn').addEventListener('click', function () {
      ['rc-n', 'rc-elig', 'rc-sf', 'rc-window'].forEach(function (id) {
        document.getElementById(id).value = '';
      });
      var out = document.getElementById('rc-output');
      out.innerHTML = '';
      out.classList.remove('visible');
      document.getElementById('rc-ref-table').classList.remove('open');
      document.getElementById('rc-ref-btn').textContent =
        'View published screen failure rates by therapeutic area ▾';
    });
  }

  var _rcAttempts = 0;
  function rcTryInit() {
    _rcAttempts++;
    if (!document.getElementById('rc-calc-btn')) {
      if (_rcAttempts < 40) setTimeout(rcTryInit, 75);
      return;
    }
    init();
  }
  rcTryInit();

})();
