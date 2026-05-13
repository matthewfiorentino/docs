(function () {

  var QUESTIONS = {
    A: [
      { id: 'q1', text: 'Does the project involve the use of an experimental medical device, drug, or natural health product that requires approval from Health Canada?' },
      { id: 'q2', text: 'Does the project involve the off-label use of an existing drug?' },
      { id: 'q3', text: 'Is the project funded by, or being submitted to, a funding agency, a research grant, or an award that requires ethics review?' },
      { id: 'q4', text: 'Is the goal of the project to generate new generalizable knowledge by answering a question or testing a hypothesis using methods recognized by the scientific community?' }
    ],
    B: [
      { id: 'q5', text: 'Does the project seek to control for variables or confounders to promote generalizability?' },
      { id: 'q6', text: 'Will you determine the number of participants via formal statistical justifications, power calculations, or expected thematic saturation levels?' },
      { id: 'q7', text: 'Is the project a pilot study or proof of concept designed to support a future, larger research project?' }
    ],
    C: [
      { id: 'q8',  text: 'Is the project the result of a department-wide initiative at the MUHC (e.g., with concerted support from colleagues)?' },
      { id: 'q9',  text: 'Is the immediate goal of the project to improve a process, program, system, or MUHC performance — or to evaluate or implement a best practice at the MUHC?' },
      { id: 'q11', text: 'Do you have reasons to expect that the results of your project will be quickly integrated into local practices at the MUHC?' },
      { id: 'q12', text: 'Would the project still be done even if there were no opportunity to publish the results, or if the results might not be applicable anywhere else?' }
    ]
  };

  function answers() {
    var out = {};
    ['A', 'B', 'C'].forEach(function (grp) {
      QUESTIONS[grp].forEach(function (q) {
        var checked = document.querySelector('input[name="' + q.id + '"]:checked');
        out[q.id] = checked ? checked.value : null;
      });
    });
    return out;
  }

  function evaluate(a) {
    var aYes = QUESTIONS.A.filter(function (q) { return a[q.id] === 'yes'; });
    var bYes = QUESTIONS.B.filter(function (q) { return a[q.id] === 'yes'; }).length;
    var cYes = QUESTIONS.C.filter(function (q) { return a[q.id] === 'yes'; }).length;

    var aAnswered = QUESTIONS.A.filter(function (q) { return a[q.id] !== null; }).length;
    var totalAnswered = aAnswered +
      QUESTIONS.B.filter(function (q) { return a[q.id] !== null; }).length +
      QUESTIONS.C.filter(function (q) { return a[q.id] !== null; }).length;

    if (totalAnswered === 0) {
      return { status: 'empty' };
    }

    if (aYes.length > 0) {
      return {
        status: 'reb-required',
        triggers: aYes.map(function (q) { return q.text; }),
        bYes: bYes,
        cYes: cYes
      };
    }

    if (aAnswered < QUESTIONS.A.length) {
      return { status: 'incomplete-a', missing: QUESTIONS.A.length - aAnswered };
    }

    if (bYes === 0 && cYes === 0) {
      return { status: 'unclear-no-signal', bYes: bYes, cYes: cYes };
    }

    if (bYes >= cYes + 2) {
      return { status: 'likely-research', bYes: bYes, cYes: cYes };
    }
    if (cYes >= bYes + 2) {
      return { status: 'likely-qaqi', bYes: bYes, cYes: cYes };
    }
    return { status: 'unclear-mixed', bYes: bYes, cYes: cYes };
  }

  function renderResult(r) {
    var out = document.getElementById('iir-output');

    if (r.status === 'empty') {
      out.innerHTML = '<div class="iir-warning"><strong>Answer at least the first four questions</strong> before requesting a recommendation.</div>';
      out.classList.add('visible');
      return;
    }
    if (r.status === 'incomplete-a') {
      out.innerHTML = '<div class="iir-warning"><strong>Answer all four definitive-trigger questions</strong> (' + r.missing + ' remaining) before requesting a recommendation. A single YES in this group means REB submission is required.</div>';
      out.classList.add('visible');
      return;
    }

    var bannerClass, bannerTitle, bannerIcon, bodyHtml;

    if (r.status === 'reb-required') {
      bannerClass = 'red';
      bannerIcon = '!';
      bannerTitle = 'REB review is required';
      var triggerList = r.triggers.map(function (t) { return '<li>' + t + '</li>'; }).join('');
      bodyHtml =
        '<p>You answered YES to at least one definitive trigger. The screening rule is decisive at this stage — REB review is required regardless of other answers.</p>' +
        '<p class="iir-result-subhdr">Trigger' + (r.triggers.length > 1 ? 's' : '') + ' identified:</p>' +
        '<ul class="iir-trigger-list">' + triggerList + '</ul>' +
        nextStepsResearch();

    } else if (r.status === 'likely-research') {
      bannerClass = 'amber';
      bannerIcon = '→';
      bannerTitle = 'Likely research';
      bodyHtml =
        '<p>Your answers lean toward research (' + r.bYes + ' research-suggestive YES, ' + r.cYes + ' QA/QI-suggestive YES). No definitive triggers, but the pattern is consistent with a project that should be submitted to the REB.</p>' +
        nextStepsResearch();

    } else if (r.status === 'likely-qaqi') {
      bannerClass = 'green';
      bannerIcon = '✓';
      bannerTitle = 'Likely QA/QI';
      bodyHtml =
        '<p>Your answers lean toward QA/QI (' + r.bYes + ' research-suggestive YES, ' + r.cYes + ' QA/QI-suggestive YES). The project appears to be QA/QI rather than research, and likely does not require REB review under TCPS2 Article 2.5.</p>' +
        nextStepsQaQi();

    } else {
      bannerClass = 'amber';
      bannerIcon = '?';
      bannerTitle = 'Unclear — REB consultation recommended';
      var summary = r.status === 'unclear-mixed'
        ? 'Mixed signals (' + r.bYes + ' research-suggestive YES, ' + r.cYes + ' QA/QI-suggestive YES).'
        : 'No clear signal: Group A all NO, and no YES answers in Groups B or C.';
      bodyHtml =
        '<p>' + summary + ' The TCPS2 principle "when in doubt, consult the REB" applies. Contact the REB directly to request a determination.</p>' +
        nextStepsUnclear();
    }

    out.innerHTML =
      '<div class="iir-banner ' + bannerClass + '">' +
        '<div class="iir-banner-icon">' + bannerIcon + '</div>' +
        '<div class="iir-banner-body">' +
          '<div class="iir-banner-title">' + bannerTitle + '</div>' +
          bodyHtml +
        '</div>' +
      '</div>' +
      '<div class="iir-result-actions">' +
        '<button class="iir-reset-result-btn" id="iir-reset-result-btn" type="button">Reset</button>' +
      '</div>' +
      '<div class="iir-disclaimer"><strong>This tool is an aid, not an authority.</strong> The MUHC REB retains the right to make the ultimate determination regarding the need for REB review, regardless of what this tool indicates. The MUHC CAE\'s <a href="https://muhc.ca/cae/page/templates-consent-forms" target="_blank" rel="noopener">Research vs QA/QI Screening Tool</a> is the canonical version.</div>';

    out.classList.add('visible');

    document.getElementById('iir-reset-result-btn').addEventListener('click', resetAll);

    out.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function nextStepsResearch() {
    return '<div class="iir-next">' +
      '<div class="iir-next-title">What to do next</div>' +
      '<ol>' +
        '<li>Begin your Nagano submission via <a href="/kb/submission-overview">Study Submission and Review</a>.</li>' +
        '<li>Use <a href="/kb/my-roadmap">My Study Roadmap</a> to generate a personalized startup checklist.</li>' +
        '<li>Confirm which ethics route applies (single-site, multi-site Quebec, multi-provincial) on the Submission Overview page.</li>' +
        '<li>Start from the <a href="https://muhc.ca/cae/page/templates-consent-forms" target="_blank" rel="noopener">MUHC CAE consent and protocol templates</a> when drafting your study documents.</li>' +
      '</ol>' +
    '</div>';
  }

  function nextStepsQaQi() {
    return '<div class="iir-next">' +
      '<div class="iir-next-title">What to do next</div>' +
      '<ol>' +
        '<li>If you need an REB exemption letter (e.g., for publication), download the <a href="https://muhc.ca/cae/page/templates-consent-forms" target="_blank" rel="noopener">CAE Research vs QA/QI Screening Tool</a> Word document, complete it, and email it to <a href="mailto:reb@muhc.mcgill.ca">reb@muhc.mcgill.ca</a> with the subject "Request for REB exemption letter."</li>' +
        '<li>If your project will access patient health information without consent, initiate a <strong>Privacy Impact Assessment (EFVP)</strong> directly with <a href="mailto:efvp@muhc.mcgill.ca">efvp@muhc.mcgill.ca</a>.</li>' +
        '<li>If your project will use hospital resources, obtain authorization from the appropriate department(s) directly.</li>' +
        '<li>If your project involves Eeyou/Eenou (Cree) populations, declare it to the Cree Board of Health and Social Services of James Bay at <a href="mailto:18ctr.research.committee@ssss.gouv.qc.ca">18ctr.research.committee@ssss.gouv.qc.ca</a>.</li>' +
        '<li>Ethical concerns related to QA/QI should be directed to the MUHC Centre for Applied Ethics at <a href="mailto:cae@muhc.mcgill.ca">cae@muhc.mcgill.ca</a>.</li>' +
        '<li>If your project later evolves into research, you are responsible for obtaining REB review at that point. The exemption letter will not apply to the new aspects.</li>' +
      '</ol>' +
    '</div>';
  }

  function nextStepsUnclear() {
    return '<div class="iir-next">' +
      '<div class="iir-next-title">What to do next</div>' +
      '<ol>' +
        '<li>Download the <a href="https://muhc.ca/cae/page/templates-consent-forms" target="_blank" rel="noopener">CAE Research vs QA/QI Screening Tool</a> Word document, complete it with your project details, and email it to <a href="mailto:reb@muhc.mcgill.ca">reb@muhc.mcgill.ca</a> for a determination.</li>' +
        '<li>The REB will review and respond.</li>' +
        '<li>While you wait, you can begin reviewing the <a href="/kb/planning-overview">Study Planning Overview</a> so the rest of your planning is not blocked.</li>' +
      '</ol>' +
    '</div>';
  }

  function resetAll() {
    QUESTIONS.A.concat(QUESTIONS.B, QUESTIONS.C).forEach(function (q) {
      document.querySelectorAll('input[name="' + q.id + '"]').forEach(function (i) { i.checked = false; });
    });
    var out = document.getElementById('iir-output');
    out.innerHTML = '';
    out.classList.remove('visible');
    document.querySelectorAll('.iir-q-row').forEach(function (row) {
      row.classList.remove('answered-yes', 'answered-no');
    });
    var root = document.getElementById('iir-root');
    if (root) window.scrollTo({ top: root.offsetTop - 20, behavior: 'smooth' });
  }

  function buildQuestionsHtml() {
    function block(items, startIdx) {
      return items.map(function (q, i) {
        return '<div class="iir-q-row" data-qid="' + q.id + '">' +
          '<div class="iir-q-num">' + (startIdx + i) + '</div>' +
          '<div class="iir-q-text">' + q.text + '</div>' +
          '<div class="iir-q-answer">' +
            '<label class="iir-radio"><input type="radio" name="' + q.id + '" value="yes"><span>Yes</span></label>' +
            '<label class="iir-radio"><input type="radio" name="' + q.id + '" value="no"><span>No</span></label>' +
          '</div>' +
        '</div>';
      }).join('');
    }

    return '<div class="iir-q-group">' +
        '<div class="iir-q-group-hdr"><span class="iir-q-group-letter iir-letter-a">A</span> Definitive REB triggers <span class="iir-q-group-note">any YES = REB submission required</span></div>' +
        block(QUESTIONS.A, 1) +
      '</div>' +
      '<div class="iir-q-group">' +
        '<div class="iir-q-group-hdr"><span class="iir-q-group-letter iir-letter-b">B</span> Suggestive of research <span class="iir-q-group-note">YES answers point to research</span></div>' +
        block(QUESTIONS.B, 5) +
      '</div>' +
      '<div class="iir-q-group">' +
        '<div class="iir-q-group-hdr"><span class="iir-q-group-letter iir-letter-c">C</span> Suggestive of QA/QI <span class="iir-q-group-note">YES answers point to QA/QI</span></div>' +
        block(QUESTIONS.C, 8) +
      '</div>';
  }

  function init() {
    var qContainer = document.getElementById('iir-questions');
    if (!qContainer) return;
    qContainer.innerHTML = buildQuestionsHtml();

    document.querySelectorAll('.iir-q-row input[type="radio"]').forEach(function (input) {
      input.addEventListener('change', function () {
        var row = this.closest('.iir-q-row');
        row.classList.remove('answered-yes', 'answered-no');
        row.classList.add(this.value === 'yes' ? 'answered-yes' : 'answered-no');
      });
    });

    document.getElementById('iir-submit-btn').addEventListener('click', function () {
      renderResult(evaluate(answers()));
    });

    document.getElementById('iir-reset-top-btn').addEventListener('click', resetAll);
  }

  var _attempts = 0;
  function tryInit() {
    _attempts++;
    if (!document.getElementById('iir-submit-btn')) {
      if (_attempts < 40) setTimeout(tryInit, 75);
      return;
    }
    init();
  }
  tryInit();

})();
