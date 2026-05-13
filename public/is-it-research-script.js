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
    var bAnswered = QUESTIONS.B.filter(function (q) { return a[q.id] !== null; }).length;
    var cAnswered = QUESTIONS.C.filter(function (q) { return a[q.id] !== null; }).length;
    var totalAnswered = aAnswered + bAnswered + cAnswered;

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
      return {
        status: 'unclear-no-signal',
        bYes: bYes,
        cYes: cYes
      };
    }

    if (bYes >= cYes + 2) {
      return { status: 'likely-research', bYes: bYes, cYes: cYes };
    }
    if (cYes >= bYes + 2) {
      return { status: 'likely-qaqi', bYes: bYes, cYes: cYes };
    }
    return { status: 'unclear-mixed', bYes: bYes, cYes: cYes };
  }

  function buildEmailBody(a, result) {
    var title = document.getElementById('iir-title').value.trim() || '[not provided]';
    var leader = document.getElementById('iir-leader').value.trim() || '[not provided]';
    var dept = document.getElementById('iir-dept').value.trim() || '[not provided]';
    var email = document.getElementById('iir-email').value.trim() || '[not provided]';
    var collabs = document.getElementById('iir-collabs').value.trim() || '[not provided]';
    var target = document.getElementById('iir-target').value.trim() || '[not provided]';
    var bg = document.getElementById('iir-bg').value.trim() || '[not provided]';
    var obj = document.getElementById('iir-obj').value.trim() || '[not provided]';
    var meth = document.getElementById('iir-meth').value.trim() || '[not provided]';
    var risks = document.getElementById('iir-risks').value.trim() || '[not provided]';
    var use = document.getElementById('iir-use').value.trim() || '[not provided]';

    var lines = [];
    lines.push('RESEARCH vs QA/QI SCREENING TOOL — completed form');
    lines.push('Submitted from the RI-MUHC Clinical Research Hub');
    lines.push('');
    lines.push('1. Project title: ' + title);
    lines.push('2. Project leader: ' + leader);
    lines.push('3. Department / affiliation: ' + dept);
    lines.push('4. Project leader email: ' + email);
    lines.push('5. Collaborators: ' + collabs);
    lines.push('6. Target population / process / program / system: ' + target);
    lines.push('');
    lines.push('7. Project summary');
    lines.push('   Background: ' + bg);
    lines.push('   Objective: ' + obj);
    lines.push('   Methods: ' + meth);
    lines.push('   Risks: ' + risks);
    lines.push('   How results will be used at the MUHC: ' + use);
    lines.push('');
    lines.push('SCREENING QUESTIONS');
    lines.push('');
    lines.push('Definitive REB triggers (any YES → REB submission required):');
    QUESTIONS.A.forEach(function (q, i) {
      lines.push('  ' + (i + 1) + '. ' + q.text);
      lines.push('     Answer: ' + (a[q.id] ? a[q.id].toUpperCase() : '[not answered]'));
    });
    lines.push('');
    lines.push('Suggestive of research:');
    QUESTIONS.B.forEach(function (q, i) {
      lines.push('  ' + (i + 5) + '. ' + q.text);
      lines.push('     Answer: ' + (a[q.id] ? a[q.id].toUpperCase() : '[not answered]'));
    });
    lines.push('');
    lines.push('Suggestive of QA/QI:');
    QUESTIONS.C.forEach(function (q) {
      lines.push('  ' + q.id.substring(1) + '. ' + q.text);
      lines.push('     Answer: ' + (a[q.id] ? a[q.id].toUpperCase() : '[not answered]'));
    });
    lines.push('');
    lines.push('TOOL RECOMMENDATION');
    lines.push(resultPlainText(result));
    lines.push('');
    lines.push('Note: this tool replicates the MUHC CAE Research vs QA/QI Screening Tool. The MUHC REB retains the right to make the ultimate determination regarding the need for REB review, regardless of the results implied by use of the screening tool.');
    return lines.join('\n');
  }

  function resultPlainText(r) {
    switch (r.status) {
      case 'reb-required':   return 'REB review required (Group A trigger).';
      case 'likely-research':return 'Likely research (Group B yes: ' + r.bYes + ', Group C yes: ' + r.cYes + '). Recommend submitting via Nagano.';
      case 'likely-qaqi':    return 'Likely QA/QI (Group B yes: ' + r.bYes + ', Group C yes: ' + r.cYes + '). Recommend contacting CAE for an exemption letter if needed.';
      case 'unclear-mixed':  return 'Mixed signals (Group B yes: ' + r.bYes + ', Group C yes: ' + r.cYes + '). Email this completed form to reb@muhc.mcgill.ca for a determination.';
      case 'unclear-no-signal': return 'No clear signal yet (Group A all NO; Groups B and C both 0 YES). Re-read the questions or email this completed form to reb@muhc.mcgill.ca.';
      default: return 'Indeterminate.';
    }
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
    } else if (r.status === 'unclear-mixed' || r.status === 'unclear-no-signal') {
      bannerClass = 'amber';
      bannerIcon = '?';
      bannerTitle = 'Unclear — REB consultation recommended';
      var summary = r.status === 'unclear-mixed'
        ? 'Mixed signals (' + r.bYes + ' research-suggestive YES, ' + r.cYes + ' QA/QI-suggestive YES).'
        : 'No clear signal: Group A all NO, and no YES answers in Groups B or C.';
      bodyHtml =
        '<p>' + summary + ' The TCPS2 principle "when in doubt, consult the REB" applies. Email the completed screening form to reb@muhc.mcgill.ca for a determination.</p>' +
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
      '<div class="iir-actions">' +
        '<button class="iir-action-btn iir-action-primary" id="iir-email-btn" type="button">Email completed form to REB</button>' +
        '<button class="iir-action-btn" id="iir-copy-btn" type="button">Copy summary to clipboard</button>' +
        '<button class="iir-action-btn iir-action-secondary" id="iir-reset-btn" type="button">Reset</button>' +
      '</div>' +
      '<div class="iir-disclaimer"><strong>This tool is an aid, not an authority.</strong> The MUHC REB retains the right to make the ultimate determination regarding the need for REB review, regardless of what this tool indicates. The MUHC CAE\'s <a href="https://muhc.ca/cae/page/templates-consent-forms" target="_blank" rel="noopener">Research vs QA/QI Screening Tool</a> is the canonical version.</div>';

    out.classList.add('visible');

    var emailBtn = document.getElementById('iir-email-btn');
    var copyBtn = document.getElementById('iir-copy-btn');
    var resetBtn = document.getElementById('iir-reset-btn');

    emailBtn.addEventListener('click', function () {
      var ans = answers();
      var body = buildEmailBody(ans, r);
      var subject = r.status === 'likely-qaqi'
        ? 'Request for REB exemption letter'
        : 'Research vs QA/QI screening — request for determination';
      var mailto = 'mailto:reb@muhc.mcgill.ca?subject=' + encodeURIComponent(subject) +
                   '&body=' + encodeURIComponent(body);
      window.location.href = mailto;
    });

    copyBtn.addEventListener('click', function () {
      var ans = answers();
      var body = buildEmailBody(ans, r);
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(body).then(function () {
          copyBtn.textContent = 'Copied ✓';
          setTimeout(function () { copyBtn.textContent = 'Copy summary to clipboard'; }, 2000);
        });
      } else {
        var ta = document.createElement('textarea');
        ta.value = body;
        document.body.appendChild(ta);
        ta.select();
        try { document.execCommand('copy'); copyBtn.textContent = 'Copied ✓'; }
        catch (e) { copyBtn.textContent = 'Copy failed'; }
        document.body.removeChild(ta);
        setTimeout(function () { copyBtn.textContent = 'Copy summary to clipboard'; }, 2000);
      }
    });

    resetBtn.addEventListener('click', resetAll);

    out.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function nextStepsResearch() {
    return '<div class="iir-next">' +
      '<div class="iir-next-title">What to do next</div>' +
      '<ol>' +
        '<li>Begin your Nagano submission via <a href="/kb/submission-overview">Study Submission and Review</a>.</li>' +
        '<li>Use the <a href="/kb/my-roadmap">My Study Roadmap</a> intake to generate a personalized startup checklist.</li>' +
        '<li>Confirm which ethics route applies (single-site, multi-site Quebec, multi-provincial) on the Submission Overview page.</li>' +
        '<li>Start from the <a href="https://muhc.ca/cae/page/templates-consent-forms" target="_blank" rel="noopener">MUHC CAE consent and protocol templates</a> when drafting your study documents.</li>' +
      '</ol>' +
    '</div>';
  }

  function nextStepsQaQi() {
    return '<div class="iir-next">' +
      '<div class="iir-next-title">What to do next</div>' +
      '<ol>' +
        '<li>If you need an REB exemption letter (e.g., for publication), email the completed screening form to <a href="mailto:reb@muhc.mcgill.ca?subject=Request%20for%20REB%20exemption%20letter">reb@muhc.mcgill.ca</a> with the subject "Request for REB exemption letter."</li>' +
        '<li>If your project will access patient health information without consent, initiate an <strong>EFVP (Privacy Impact Assessment)</strong> directly with <a href="mailto:efvp@muhc.mcgill.ca">efvp@muhc.mcgill.ca</a>.</li>' +
        '<li>If your project will use hospital resources, obtain authorization from the appropriate department(s) directly.</li>' +
        '<li>If your project involves Eeyou/Eenou (Cree) populations, declare it to the Cree Board of Health and Social Services of James Bay at <a href="mailto:18ctr.research.committee@ssss.gouv.qc.ca">18ctr.research.committee@ssss.gouv.qc.ca</a>.</li>' +
        '<li>Ethical concerns related to QA/QI should be directed to the MUHC Centre for Applied Ethics at <a href="mailto:cae@muhc.mcgill.ca">cae@muhc.mcgill.ca</a> — not the REB.</li>' +
        '<li>If your project later evolves into research, you are responsible for obtaining REB review at that point. The exemption letter will not apply to the new aspects.</li>' +
      '</ol>' +
    '</div>';
  }

  function nextStepsUnclear() {
    return '<div class="iir-next">' +
      '<div class="iir-next-title">What to do next</div>' +
      '<ol>' +
        '<li>Click <strong>Email completed form to REB</strong> below — this opens a pre-filled message to <a href="mailto:reb@muhc.mcgill.ca">reb@muhc.mcgill.ca</a> with all your answers.</li>' +
        '<li>The REB will review and make a determination.</li>' +
        '<li>While you wait, you can begin reviewing the <a href="/kb/planning-overview">Study Planning Overview</a> so the rest of your planning is not blocked.</li>' +
      '</ol>' +
    '</div>';
  }

  function resetAll() {
    QUESTIONS.A.concat(QUESTIONS.B, QUESTIONS.C).forEach(function (q) {
      var inputs = document.querySelectorAll('input[name="' + q.id + '"]');
      inputs.forEach(function (i) { i.checked = false; });
    });
    ['iir-title','iir-leader','iir-dept','iir-email','iir-collabs','iir-target','iir-bg','iir-obj','iir-meth','iir-risks','iir-use'].forEach(function (id) {
      var el = document.getElementById(id);
      if (el) el.value = '';
    });
    var out = document.getElementById('iir-output');
    out.innerHTML = '';
    out.classList.remove('visible');
    document.querySelectorAll('.iir-q-row').forEach(function (row) { row.classList.remove('answered-yes', 'answered-no'); });
    window.scrollTo({ top: document.getElementById('iir-root').offsetTop - 20, behavior: 'smooth' });
  }

  function buildQuestionsHtml() {
    function block(group, items, startIdx) {
      var rows = items.map(function (q, i) {
        var n = startIdx + i;
        return '<div class="iir-q-row" data-qid="' + q.id + '">' +
          '<div class="iir-q-num">' + n + '</div>' +
          '<div class="iir-q-text">' + q.text + '</div>' +
          '<div class="iir-q-answer">' +
            '<label class="iir-radio"><input type="radio" name="' + q.id + '" value="yes"><span>Yes</span></label>' +
            '<label class="iir-radio"><input type="radio" name="' + q.id + '" value="no"><span>No</span></label>' +
          '</div>' +
        '</div>';
      }).join('');
      return rows;
    }
    var html = '';
    html += '<div class="iir-q-group">';
    html += '<div class="iir-q-group-hdr"><span class="iir-q-group-letter iir-letter-a">A</span> Definitive REB triggers <span class="iir-q-group-note">any YES = REB submission required</span></div>';
    html += block('A', QUESTIONS.A, 1);
    html += '</div>';
    html += '<div class="iir-q-group">';
    html += '<div class="iir-q-group-hdr"><span class="iir-q-group-letter iir-letter-b">B</span> Suggestive of research <span class="iir-q-group-note">YES answers point to research</span></div>';
    html += block('B', QUESTIONS.B, 5);
    html += '</div>';
    html += '<div class="iir-q-group">';
    html += '<div class="iir-q-group-hdr"><span class="iir-q-group-letter iir-letter-c">C</span> Suggestive of QA/QI <span class="iir-q-group-note">YES answers point to QA/QI</span></div>';
    html += block('C', QUESTIONS.C, 8);
    html += '</div>';
    return html;
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
      var r = evaluate(answers());
      renderResult(r);
    });

    document.getElementById('iir-reset-top-btn').addEventListener('click', resetAll);

    var projHdr = document.getElementById('iir-proj-hdr');
    var projBody = document.getElementById('iir-proj-body');
    if (projHdr && projBody) {
      projHdr.addEventListener('click', function () {
        var open = projBody.classList.toggle('open');
        projHdr.querySelector('.iir-disclose').textContent = open ? '▾' : '▸';
      });
    }
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
