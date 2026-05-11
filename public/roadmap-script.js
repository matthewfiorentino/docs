/**
 * My Study Roadmap — RI-MUHC Clinical Research Hub
 * Screening questions → personalized lifecycle checklist.
 * Self-contained: injects its own CSS, uses localStorage for persistence.
 */
(function () {
  'use strict';

  /* ── Config ───────────────────────────────────────────────────────────── */
  var LS_KEY      = 'rm_state_v2';
  var EMAILJS_SVC = 'service_p1ld1rp';
  var EMAILJS_TPL = 'template_sqehaop';
  var EMAILJS_KEY = 'bY9Iw2R78ouIgz-rb';

  /* ── CSS ──────────────────────────────────────────────────────────────── */
  (function injectCSS() {
    if (document.getElementById('rm-css')) return;
    var s = document.createElement('style');
    s.id = 'rm-css';
    s.textContent = [
      '#rm-root { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif; color: #111; max-width: 660px; padding: 0 0 80px; }',

      /* Screening */
      '.rm-screen { padding: 4px 0 48px; }',
      '.rm-progress { height: 2px; background: #ebebeb; border-radius: 2px; margin-bottom: 36px; overflow: hidden; }',
      '.rm-progress-fill { height: 100%; background: #007a6e; border-radius: 2px; transition: width .35s cubic-bezier(.16,1,.3,1); }',
      '.rm-step-count { font-size: 11px; font-weight: 600; letter-spacing: .06em; color: #bbb; text-align: right; margin-bottom: 28px; text-transform: uppercase; }',
      '.rm-question { font-size: 22px; font-weight: 700; color: #111; line-height: 1.3; letter-spacing: -.02em; margin-bottom: 6px; }',
      '.rm-q-hint { font-size: 13.5px; color: #777; line-height: 1.6; margin-bottom: 24px; }',
      '.rm-options { display: flex; flex-direction: column; gap: 7px; margin-bottom: 36px; }',
      '.rm-opt { display: flex; flex-direction: column; gap: 2px; padding: 13px 16px; border: 1.5px solid #e5e5e5; border-radius: 9px; cursor: pointer; background: #fff; transition: border-color .12s, background .12s; text-align: left; }',
      '.rm-opt:hover { border-color: #007a6e; background: #f7fdfb; }',
      '.rm-opt.selected { border-color: #007a6e; background: #f0faf9; }',
      '.rm-opt-label { font-size: 14.5px; font-weight: 500; color: #111; }',
      '.rm-opt.selected .rm-opt-label { color: #005a52; }',
      '.rm-opt-hint { font-size: 12.5px; color: #999; line-height: 1.45; margin-top: 1px; }',
      '.rm-nav { display: flex; justify-content: space-between; align-items: center; }',
      '.rm-back-btn { font-size: 13.5px; color: #999; cursor: pointer; background: none; border: none; padding: 0; font-family: inherit; }',
      '.rm-back-btn:hover { color: #444; }',
      '.rm-continue-btn { font-size: 13.5px; font-weight: 600; color: #fff; background: #007a6e; border: none; border-radius: 8px; padding: 10px 22px; cursor: pointer; opacity: 0; transition: opacity .2s, background .12s; pointer-events: none; font-family: inherit; }',
      '.rm-continue-btn.on { opacity: 1; pointer-events: auto; }',
      '.rm-continue-btn:hover { background: #005a52; }',

      /* Roadmap — profile bar */
      '.rm-profile-bar { display: flex; align-items: flex-start; justify-content: space-between; gap: 16px; margin-bottom: 20px; padding-bottom: 20px; border-bottom: 1px solid #f0f0f0; }',
      '.rm-profile-meta { flex: 1; }',
      '.rm-profile-eyebrow { font-size: 10px; font-weight: 700; letter-spacing: .1em; text-transform: uppercase; color: #bbb; margin-bottom: 8px; }',
      '.rm-chips { display: flex; flex-wrap: wrap; gap: 5px; }',
      '.rm-chip { font-size: 12px; font-weight: 500; color: #555; background: #f5f5f5; border-radius: 20px; padding: 3px 10px; }',
      '.rm-chip.level { background: #f0faf9; color: #005a52; }',
      '.rm-edit-btn { font-size: 12px; color: #bbb; background: none; border: none; cursor: pointer; padding: 0; font-family: inherit; flex-shrink: 0; white-space: nowrap; margin-top: 2px; }',
      '.rm-edit-btn:hover { color: #555; text-decoration: underline; }',

      /* Flags */
      '.rm-flags { display: flex; flex-direction: column; gap: 8px; margin-bottom: 28px; }',
      '.rm-flag { display: flex; gap: 11px; padding: 11px 14px; border-radius: 8px; font-size: 13.5px; line-height: 1.5; }',
      '.rm-flag-dot { width: 7px; height: 7px; border-radius: 50%; flex-shrink: 0; margin-top: 5px; }',
      '.rm-flag-inner { flex: 1; }',
      '.rm-flag-title { font-weight: 600; display: block; margin-bottom: 2px; }',
      '.rm-flag-detail { color: #555; font-size: 13px; }',
      '.rm-flag-detail a { color: inherit; }',
      '.rm-flag.coral { background: #fef2f2; } .rm-flag.coral .rm-flag-dot { background: #dc2626; } .rm-flag.coral .rm-flag-title { color: #991b1b; }',
      '.rm-flag.amber { background: #fffbeb; } .rm-flag.amber .rm-flag-dot { background: #d97706; } .rm-flag.amber .rm-flag-title { color: #92400e; }',
      '.rm-flag.sky   { background: #eff6ff; } .rm-flag.sky   .rm-flag-dot { background: #2563eb; } .rm-flag.sky   .rm-flag-title { color: #1e40af; }',
      '.rm-flag.teal  { background: #f0faf9; } .rm-flag.teal  .rm-flag-dot { background: #007a6e; } .rm-flag.teal  .rm-flag-title { color: #005a52; }',

      /* Phases */
      '.rm-roadmap { display: flex; flex-direction: column; }',
      '.rm-phase { border-top: 1px solid #f2f2f2; }',
      '.rm-phase-hdr { display: flex; align-items: center; justify-content: space-between; padding: 15px 0; cursor: pointer; user-select: none; }',
      '.rm-phase-hdr:hover .rm-phase-title { color: #007a6e; }',
      '.rm-phase-left { display: flex; align-items: center; gap: 14px; }',
      '.rm-phase-num { font-size: 10px; font-weight: 700; letter-spacing: .08em; text-transform: uppercase; color: #ccc; width: 52px; flex-shrink: 0; }',
      '.rm-phase-title { font-size: 14px; font-weight: 600; color: #222; transition: color .1s; }',
      '.rm-phase-right { display: flex; align-items: center; gap: 10px; }',
      '.rm-phase-count { font-size: 12px; color: #ccc; font-variant-numeric: tabular-nums; }',
      '.rm-phase-count.has-done { color: #007a6e; }',
      '.rm-chevron { font-size: 9px; color: #ccc; transition: transform .2s; display: inline-block; }',
      '.rm-phase.open .rm-chevron { transform: rotate(90deg); }',
      '.rm-phase-body { display: none; padding: 4px 0 18px 66px; flex-direction: column; gap: 1px; }',
      '.rm-phase.open .rm-phase-body { display: flex; }',

      /* Items */
      '.rm-item { display: flex; align-items: flex-start; gap: 11px; padding: 6px 0; }',
      '.rm-checkbox { width: 17px; height: 17px; border-radius: 5px; border: 1.5px solid #ddd; flex-shrink: 0; cursor: pointer; display: flex; align-items: center; justify-content: center; margin-top: 2px; transition: border-color .12s, background .12s; }',
      '.rm-checkbox:hover { border-color: #007a6e; }',
      '.rm-checkbox.done { border-color: #007a6e; background: #007a6e; }',
      '.rm-checkbox.done::after { content: ""; width: 4px; height: 8px; border: 2px solid #fff; border-top: none; border-left: none; transform: rotate(45deg) translate(-1px,-1px); display: block; }',
      '.rm-item-body { flex: 1; min-width: 0; }',
      '.rm-item-text { font-size: 13.5px; color: #222; line-height: 1.55; transition: color .12s; }',
      '.rm-item.done .rm-item-text { color: #bbb; text-decoration: line-through; text-decoration-color: #ddd; }',
      '.rm-item-link { display: inline-flex; align-items: center; gap: 3px; font-size: 12px; color: #007a6e; text-decoration: none; margin-top: 3px; }',
      '.rm-item-link:hover { text-decoration: underline; }',
      '.rm-item-link::after { content: "→"; font-size: 10px; }',

      /* Email CTA */
      '.rm-email-cta { margin: 14px 0 6px; padding: 16px 18px; background: #fafafa; border: 1px solid #ebebeb; border-radius: 10px; }',
      '.rm-email-title { font-size: 13.5px; font-weight: 600; color: #111; margin-bottom: 4px; }',
      '.rm-email-desc { font-size: 12.5px; color: #777; line-height: 1.55; margin-bottom: 14px; }',
      '.rm-email-row { display: flex; gap: 8px; margin-bottom: 8px; }',
      '.rm-email-input { flex: 1; padding: 8px 11px; border: 1.5px solid #e5e5e5; border-radius: 7px; font-size: 13.5px; color: #111; background: #fff; font-family: inherit; outline: none; transition: border-color .12s; }',
      '.rm-email-input:focus { border-color: #007a6e; }',
      '.rm-email-submit { padding: 8px 16px; background: #007a6e; color: #fff; border: none; border-radius: 7px; font-size: 13px; font-weight: 600; cursor: pointer; font-family: inherit; transition: background .12s; white-space: nowrap; }',
      '.rm-email-submit:hover { background: #005a52; }',
      '.rm-email-submit:disabled { background: #ccc; cursor: default; }',
      '.rm-email-ok { font-size: 13px; color: #007a6e; font-weight: 500; display: none; }',

      /* Print button */
      '.rm-print-btn { font-size: 12px; color: #999; background: none; border: 1px solid #e5e5e5; border-radius: 6px; cursor: pointer; padding: 5px 10px; font-family: inherit; transition: border-color .12s, color .12s; }',
      '.rm-print-btn:hover { color: #444; border-color: #bbb; }',
      '.rm-profile-actions { display: flex; align-items: center; gap: 8px; }',

      /* Print */
      '@media print {',
      '  .rm-print-btn, .rm-edit-btn, .rm-chevron, .rm-email-cta { display: none !important; }',
      '  .rm-phase-body { display: flex !important; }',
      '  .rm-phase-hdr { padding: 10px 0; cursor: default; }',
      '  .rm-phase { border-top: 1px solid #ddd; }',
      '  #rm-root { max-width: 100%; }',
      '}',
    ].join('\n');
    document.head.appendChild(s);
  })();

  /* ── Questions ────────────────────────────────────────────────────────── */
  var QS = [
    {
      key: 'stage',
      q: 'Where are you in your study journey?',
      opts: [
        { val: 'idea',       label: 'Early idea or concept',          hint: 'Still developing the research question' },
        { val: 'design',     label: 'Protocol design and planning',   hint: 'Writing the protocol, assembling the team' },
        { val: 'submission', label: 'Ready to submit or submitting',  hint: 'Preparing or actively submitting to REB / Nagano' },
        { val: 'conduct',    label: 'Study underway',                 hint: 'Actively enrolling or in conduct' },
        { val: 'closeout',   label: 'Close-out or post-study',        hint: 'Last participant done, or study completed' }
      ]
    },
    {
      key: 'type',
      q: 'What type of study is this?',
      opts: [
        { val: 'interventional',            label: 'Interventional',                hint: 'Participants receive a drug, device, or other intervention assigned by the protocol' },
        { val: 'observational-prospective', label: 'Prospective observational',     hint: 'Observing outcomes without assigning an intervention' },
        { val: 'retrospective',             label: 'Retrospective or secondary data', hint: 'Analyzing data already collected — charts, registries, biobanks' }
      ]
    },
    {
      key: 'intType',
      q: 'What kind of investigational product?',
      showIf: function (a) { return a.type === 'interventional'; },
      opts: [
        { val: 'drug',   label: 'Drug or biologic',                   hint: 'Includes biosimilars and advanced therapy products' },
        { val: 'device', label: 'Medical device',                     hint: 'Includes diagnostics, surgical devices, implants' },
        { val: 'nhp',    label: 'Natural health product (NHP)',        hint: 'Vitamins, herbal products, homeopathic medicines' },
        { val: 'low',    label: 'Low-risk behavioral or procedural',   hint: 'No Health Canada filing required' }
      ]
    },
    {
      key: 'sponsorship',
      q: 'What is the sponsorship arrangement?',
      opts: [
        { val: 'industry', label: 'Industry-sponsored',       hint: 'A pharmaceutical, biotech, or device company is the sponsor' },
        { val: 'si',       label: 'Sponsor-Investigator',     hint: 'The PI holds both Sponsor and Investigator responsibilities' },
        { val: 'grant',    label: 'Grant-funded or academic', hint: 'CIHR, FRQS, foundation, or investigator-initiated without an industry sponsor' }
      ]
    },
    {
      key: 'phi',
      q: 'Will your study collect or access identifiable health information?',
      hint: 'Includes names, MRNs, dates of birth, diagnoses, or any data that could identify a participant.',
      opts: [
        { val: 'yes',    label: 'Yes' },
        { val: 'no',     label: 'No — fully anonymized or aggregate data only' },
        { val: 'unsure', label: 'Unsure' }
      ]
    },
    {
      key: 'crossBorder',
      q: 'Will identifiable data leave Quebec or Canada?',
      hint: 'Includes sharing with an international sponsor, or data stored on non-Canadian servers.',
      showIf: function (a) { return a.phi === 'yes' || a.phi === 'unsure'; },
      opts: [
        { val: 'yes', label: 'Yes' },
        { val: 'no',  label: 'No — data stays within Quebec or Canada' }
      ]
    },
    {
      key: 'population',
      q: 'Does your study involve vulnerable populations?',
      opts: [
        { val: 'minors',    label: 'Minors (under 18)',              hint: 'Requires parental consent and age-appropriate assent' },
        { val: 'incapable', label: 'Adults unable to consent',       hint: 'Requires a Personne mandatée, tutor, or curator' },
        { val: 'both',      label: 'Both minors and incapable adults' },
        { val: 'none',      label: 'No — standard adult population' }
      ]
    },
    {
      key: 'sites',
      q: 'Is this a single-site or multicentre study?',
      opts: [
        { val: 'single',      label: 'Single site — MUHC only' },
        { val: 'multi-lead',  label: 'Multicentre — MUHC is the Quebec REB Lead', hint: 'Other Quebec RSSS sites participating' },
        { val: 'multi-cross', label: 'Multicentre — cross-provincial or international', hint: 'Sites outside Quebec' }
      ]
    }
  ];

  /* ── Classify ─────────────────────────────────────────────────────────── */
  function classify(a) {
    var p         = {};
    p.stage       = a.stage       || 'design';
    p.type        = a.type;
    p.intType     = a.intType;
    p.isDrug      = a.type === 'interventional' && a.intType === 'drug';
    p.isDevice    = a.type === 'interventional' && a.intType === 'device';
    p.isNHP       = a.type === 'interventional' && a.intType === 'nhp';
    p.isLow       = a.type === 'interventional' && a.intType === 'low';
    p.isInterv    = a.type === 'interventional';
    p.isObs       = a.type === 'observational-prospective';
    p.isRetro     = a.type === 'retrospective';
    p.isIndustry  = a.sponsorship === 'industry';
    p.isSI        = a.sponsorship === 'si';
    p.phi         = a.phi === 'yes' || a.phi === 'unsure';
    p.crossBorder = a.crossBorder === 'yes';
    p.needsHC     = p.isDrug || p.isDevice || p.isNHP;
    p.minors      = a.population === 'minors'    || a.population === 'both';
    p.incapable   = a.population === 'incapable' || a.population === 'both';
    p.multiLead   = a.sites === 'multi-lead';
    p.multiCross  = a.sites === 'multi-cross';
    if      (p.isDrug)                   p.level = 1;
    else if (p.isDevice)                 p.level = 2;
    else if (p.isNHP)                    p.level = 3;
    else if (p.isObs  || p.isLow)        p.level = 4;
    else if (p.isRetro)                  p.level = 5;
    else                                 p.level = 4;
    return p;
  }

  /* ── Flags ────────────────────────────────────────────────────────────── */
  function getFlags(p) {
    var f = [];
    if (p.crossBorder)
      f.push({ tone: 'coral', title: 'Cross-border data — ÉFVP required',
        detail: 'A Privacy Impact Assessment must be completed before any data transfer. File F17 or F18 alongside your Nagano F11 submission.',
        href: '/kb/privacy' });
    else if (p.phi)
      f.push({ tone: 'amber', title: 'Identifiable health information — Loi 25 obligations',
        detail: 'A data management and privacy plan is required in your REB application. Any breach must be reported to the CAI within 72 hours.',
        href: '/kb/privacy' });
    if (p.minors)
      f.push({ tone: 'sky', title: 'Minors — Civil Code Art. 21',
        detail: 'Parental or guardian consent required. Assent for children aged 7–13; minors 14+ may consent alone if REB determines minimal risk.',
        href: '/kb/consent' });
    if (p.incapable)
      f.push({ tone: 'coral', title: 'Adults unable to consent — Personne mandatée required',
        detail: 'Authorization from a mandatary, tutor, or curator is required. Risk must not be disproportionate to expected benefit.',
        href: '/kb/vulnerable-populations' });
    if (p.isSI && p.needsHC)
      f.push({ tone: 'amber', title: 'Sponsor-Investigator — dual regulatory obligations',
        detail: 'You hold both Sponsor and QI/PI responsibilities. The 100-series SOPs apply. Engage QA early in planning.',
        href: '/kb/sponsor-investigator' });
    if (p.multiLead)
      f.push({ tone: 'sky', title: 'Multicentre — MUHC is the Quebec REB Lead',
        detail: 'Submit study documents via Nagano on behalf of all participating RSSS sites.' });
    if (p.multiCross)
      f.push({ tone: 'amber', title: 'Cross-provincial / international — coordinate external ethics reviews',
        detail: 'Sites outside Quebec operate under different regulatory frameworks. Engage the Research Facilitator early.' });
    return f;
  }

  /* ── Profile chips ────────────────────────────────────────────────────── */
  function profileChips(p, a) {
    var stageMap = { idea: 'Idea', design: 'Design', submission: 'Submission', conduct: 'In Conduct', closeout: 'Close-Out' };
    var typeMap  = { interventional: 'Interventional', 'observational-prospective': 'Observational', retrospective: 'Retrospective' };
    var intMap   = { drug: 'Drug', device: 'Device', nhp: 'NHP', low: 'Low-risk' };
    var sponMap  = { industry: 'Industry', si: 'Sponsor-Investigator', grant: 'Grant-Funded' };
    var chips = [];
    if (stageMap[p.stage])      chips.push({ text: stageMap[p.stage] });
    if (p.level)                chips.push({ text: 'Level ' + p.level, cls: 'level' });
    if (typeMap[a.type])        chips.push({ text: typeMap[a.type] });
    if (intMap[a.intType])      chips.push({ text: intMap[a.intType] });
    if (sponMap[a.sponsorship]) chips.push({ text: sponMap[a.sponsorship] });
    if (p.phi)                  chips.push({ text: 'PHI' });
    if (p.crossBorder)          chips.push({ text: 'Cross-border' });
    if (p.minors)               chips.push({ text: 'Minors' });
    if (p.incapable)            chips.push({ text: 'Incapable adults' });
    if (p.multiLead)            chips.push({ text: 'REB Lead' });
    if (p.multiCross)           chips.push({ text: 'Cross-provincial' });
    return chips;
  }

  /* ── Roadmap content ──────────────────────────────────────────────────── */
  function it(key, text, linkLabel, linkHref) {
    return { key: key, text: text, link: linkLabel ? { label: linkLabel, href: linkHref } : null };
  }

  function buildRoadmap(p) {
    var phases = [];

    /* ── Phase 0 — Credentials & Training ── */
    var ph0 = { id: 'p0', num: 'Phase 0', title: 'Credentials & Training', items: [] };
    ph0.items.push(it('p0-privs', 'Obtain or verify Research Privileges or Researcher Status for the PI/QI', 'PI/QI pathway', '/kb/roles/pi-orientation'));
    ph0.items.push(it('p0-sop',   'Complete SOP Reader training for your level via TalentLMS', 'Training requirements', '/training/compliance-requirements'));
    ph0.items.push(it('p0-ca',    'Complete Competency Assessment — certificate required before signing the Delegation Log', 'Training requirements', '/training/compliance-requirements'));
    if (p.level <= 4)
      ph0.items.push(it('p0-gcp', 'Obtain GCP certification (CITI ICH E6) — renew every 2 years. Must not expire within 90 days of submission', 'External certifications', '/training/external-certifications'));
    if (p.isDrug)
      ph0.items.push(it('p0-div5', 'Health Canada Part C Division 5 training — required for drug and biologic studies', 'Training requirements', '/training/compliance-requirements'));
    if (p.isDevice)
      ph0.items.push(it('p0-iso',  'ISO 14155:2020 GCP for Medical Devices training — required for device studies', 'External certifications', '/training/external-certifications'));
    ph0.items.push(it('p0-tdl',   'Prepare the Task Delegation Log — PI/QI signature confirms training and qualification are current', 'SOP-CR-002', '/sops/cr-002'));
    phases.push(ph0);

    /* ── Phase 1 — Study Design & Planning ── */
    var ph1 = { id: 'p1', num: 'Phase 1', title: 'Study Design & Planning', items: [] };
    ph1.items.push(it('p1-lifecycle',  'Review the study lifecycle — understand what lies ahead at each stage', 'Study lifecycle', '/kb/study-lifecycle'));
    ph1.items.push(it('p1-feasibility','Conduct a feasibility assessment — site capacity, patient population, realistic timelines', 'Feasibility', '/kb/feasibility'));
    if (p.isInterv || p.isObs)
      ph1.items.push(it('p1-design',    'Develop or review the study design and protocol structure', 'Study design', '/kb/study-design'));
    if (p.isObs || p.isRetro)
      ph1.items.push(it('p1-bcu',       'Consult BCU (Biostatistics & Clinical Epidemiology) for study design and statistical planning', 'BCU', '/kb/bcu'));
    if (p.isRetro)
      ph1.items.push(it('p1-dw',        'Check the Data Warehouse for variable availability and cohort feasibility before finalizing the protocol', 'Data Warehouse', '/kb/data-warehouse'));
    ph1.items.push(it('p1-budget',     'Develop the study budget — include REB fees, pharmacy, indirect costs, and screen-failure buffer', 'Budgets & contracts', '/kb/budget-negotiation'));
    if (p.isIndustry)
      ph1.items.push(it('p1-cta',       'Negotiate the Clinical Trial Agreement with the sponsor — allow 60–90 days', 'Clinical trial agreements', '/kb/clinical-trial-agreements'));
    if (p.isSI)
      ph1.items.push(it('p1-si',        'Review Sponsor-Investigator obligations — the 100-series SOPs apply to your study', 'Sponsor-Investigator', '/kb/sponsor-investigator'));
    if (p.needsHC)
      ph1.items.push(it('p1-hc-plan',   'Plan the Health Canada filing timeline — allow minimum 30 days for HC review, running in parallel with REB', 'Regulatory requirements', '/kb/regulations'));
    if (p.crossBorder)
      ph1.items.push(it('p1-efvp-plan', 'Plan the ÉFVP (Privacy Impact Assessment) — allow 4–8 weeks to complete before submission', 'Privacy & data governance', '/kb/privacy'));
    if (p.phi)
      ph1.items.push(it('p1-data-plan', 'Plan the data management approach — REDCap build, CRF design, storage and access controls', 'CORD', '/kb/cord'));
    phases.push(ph1);

    /* ── Phase 2 — Pre-Submission Documents ── */
    var ph2 = { id: 'p2', num: 'Phase 2', title: 'Pre-Submission Documents', items: [] };
    ph2.items.push(it('p2-protocol',   'Finalize the study protocol — PI/QI signature required before submission', 'Protocol & essential documents', '/kb/protocol-documents'));
    ph2.items.push(it('p2-icf',        'Prepare the Informed Consent Form using the MUHC REB template (editable Word; French translation follows English REB approval)', 'Consent', '/kb/consent'));
    if (p.needsHC)
      ph2.items.push(it('p2-ib',       "Obtain the current Investigator's Brochure (IB) or Product Monograph — required before submission", 'Protocol & essential documents', '/kb/protocol-documents'));
    if (p.isDrug)
      ph2.items.push(it('p2-cta',      'Prepare the Health Canada Clinical Trial Application (CTA) package', 'SOP-CR-018', '/sops/cr-018'));
    if (p.isDevice)
      ph2.items.push(it('p2-ita',      'Prepare the Health Canada Investigational Testing Authorization (ITA) submission', 'SOP-CR-024', '/sops/cr-024'));
    if (p.crossBorder)
      ph2.items.push(it('p2-efvp',     'Complete the ÉFVP — file F17 (screening) or F18 (non-screening) alongside your Nagano F11 submission', 'Privacy & data governance', '/kb/privacy'));
    if (p.minors)
      ph2.items.push(it('p2-assent',   'Prepare age-appropriate assent form (ages 7–13) and separate parental/guardian consent form', 'Pediatric research', '/kb/pediatric-research'));
    if (p.incapable)
      ph2.items.push(it('p2-mandat',   'Prepare the Personne mandatée (mandatary) consent documentation', 'Consent for incapable adults', '/kb/vulnerable-populations'));
    if (p.phi)
      ph2.items.push(it('p2-dmp',      'Prepare a Data Management Plan — required in the REB submission', 'CORD', '/kb/cord'));
    ph2.items.push(it('p2-agreements', 'Research agreements initiated — contact the Research Agreements Office early in parallel with protocol development', 'Budgets & contracts', '/kb/budgets-contracts'));
    phases.push(ph2);

    /* ── Phase 3 — Submission & Review ── */
    var ph3 = { id: 'p3', num: 'Phase 3', title: 'Submission & Review', items: [], emailCTA: true };
    ph3.items.push(it('p3-nagano',  'Submit via Nagano F11 — triggers REB review and institutional feasibility review in parallel', 'Submitting via Nagano', '/kb/submitting-via-nagano'));
    if (p.isDrug)
      ph3.items.push(it('p3-hc-cta', 'Health Canada CTA filed and 30-day review period underway — may proceed after 30 days if no stop notice received', 'SOP-CR-018', '/sops/cr-018'));
    if (p.isDevice)
      ph3.items.push(it('p3-hc-ita', 'Health Canada ITA filed and under review', 'SOP-CR-024', '/sops/cr-024'));
    ph3.items.push(it('p3-reb',     'REB approval letter received — typically 6–8 weeks for initial review'));
    ph3.items.push(it('p3-pm',      'PM Final Authorization received from the Research Programs Office'));
    if (p.multiLead)
      ph3.items.push(it('p3-rsss',  'Coordinate review at all Quebec RSSS participating sites — MUHC submits as the REB Lead'));
    if (p.multiCross)
      ph3.items.push(it('p3-ext',   'Coordinate ethics and authorization review at all external (non-Quebec) sites'));
    phases.push(ph3);

    /* ── Phase 4 — Activation ── */
    var ph4 = { id: 'p4', num: 'Phase 4', title: 'Activation', items: [] };
    ph4.items.push(it('p4-auth',     'MUHC Authorization letter received — all review streams must be complete before any study activity begins'));
    ph4.items.push(it('p4-tdl',      'Delegation Log finalized — all team members trained, credentialed, and signed', 'SOP-CR-002', '/sops/cr-002'));
    ph4.items.push(it('p4-isf',      'Investigator Site File opened and organized with all essential documents', 'ISF', '/kb/isf'));
    if (p.isIndustry)
      ph4.items.push(it('p4-go',     "Sponsor's Go Letter received — participant enrolment may not begin until this is in hand"));
    if (p.isDrug)
      ph4.items.push(it('p4-pharm',  'Pharmacy agreement in place — investigational product accountability system established', 'SOP-CR-010', '/sops/cr-010'));
    if (p.isSI)
      ph4.items.push(it('p4-monitor','Independent monitor engaged — must not appear on the site Delegation Log', 'Sponsor-Investigator', '/kb/sponsor-investigator'));
    phases.push(ph4);

    /* ── Phase 5 — Conduct ── */
    var ph5 = { id: 'p5', num: 'Phase 5', title: 'Conduct', items: [] };
    ph5.items.push(it('p5-consent',    'Ongoing consent — reconsent participants when the protocol or ICF changes', 'Consent', '/kb/consent'));
    ph5.items.push(it('p5-source',     'Source documentation maintained per GCP — legible, contemporaneous, attributable', 'Data integrity', '/kb/data-integrity'));
    ph5.items.push(it('p5-deviations', 'Protocol deviations identified and reported promptly per SOP', 'SOP-CR-015', '/sops/cr-015'));
    ph5.items.push(it('p5-training',   "Team training records kept current — the 90-day rule applies to amendments"));
    if (p.level <= 3)
      ph5.items.push(it('p5-sae',      'Adverse events and SAEs reported to sponsor; SUSARs to Health Canada within 7/15 days as applicable', 'SOP-CR-012', '/sops/cr-012'));
    if (p.needsHC)
      ph5.items.push(it('p5-ip',       'Investigational product accountability — dispensing records, returns, and reconciliation maintained', 'SOP-CR-010', '/sops/cr-010'));
    if (p.isSI)
      ph5.items.push(it('p5-dsur',     'Annual Development Safety Update Report (DSUR) prepared and submitted to Health Canada', 'Sponsor-Investigator', '/kb/sponsor-investigator'));
    if (p.phi)
      ph5.items.push(it('p5-breach',   'Any privacy breach reported to the CAI and affected participants within 72 hours (Loi 25)', 'Privacy & data governance', '/kb/privacy'));
    phases.push(ph5);

    /* ── Phase 6 — Close-Out ── */
    var ph6 = { id: 'p6', num: 'Phase 6', title: 'Close-Out', items: [] };
    ph6.items.push(it('p6-visit',   'Close-out visit conducted (if required by sponsor or protocol) and sponsor notified', 'Close-out guide', '/kb/close-out'));
    ph6.items.push(it('p6-reb',     'Final close-out report submitted to the REB via Nagano', 'Close-out guide', '/kb/close-out'));
    if (p.isDrug)
      ph6.items.push(it('p6-hc',    'Health Canada close-out letter submitted within 15 days of the last participant visit'));
    ph6.items.push(it('p6-archive', 'Essential documents archived — minimum 15 years for regulated studies', 'ISF & retention', '/kb/isf'));
    if (p.level <= 4)
      ph6.items.push(it('p6-reg',   'Trial registration updated with results — required by most funders and journals', 'Publications', '/kb/publications'));
    ph6.items.push(it('p6-publish', 'Consider publishing your findings — plan authorship, lay summary, and results disclosure', 'Publications', '/kb/publications'));
    phases.push(ph6);

    return phases;
  }

  /* ── Default open phases — all open ──────────────────────────────────── */
  function defaultOpen() {
    return { p0: true, p1: true, p2: true, p3: true, p4: true, p5: true, p6: true };
  }

  /* ── State ────────────────────────────────────────────────────────────── */
  var S = { step: 0, answers: {}, profile: null, checks: {}, phaseOpen: {} };

  function save() {
    try { localStorage.setItem(LS_KEY, JSON.stringify({ answers: S.answers, profile: S.profile, checks: S.checks, phaseOpen: S.phaseOpen })); } catch (e) {}
  }

  function load() {
    try {
      var raw = localStorage.getItem(LS_KEY);
      if (!raw) return false;
      var d = JSON.parse(raw);
      if (!d || !d.answers || !Object.keys(d.answers).length) return false;
      S.answers = d.answers || {}; S.profile = d.profile || null;
      S.checks  = d.checks  || {}; S.phaseOpen = d.phaseOpen || {};
      return true;
    } catch (e) { return false; }
  }

  function reset() {
    S.step = 0; S.answers = {}; S.profile = null; S.checks = {}; S.phaseOpen = {};
    try { localStorage.removeItem(LS_KEY); } catch (e) {}
  }

  /* ── Helpers ──────────────────────────────────────────────────────────── */
  function visibleQs() { return QS.filter(function (q) { return !q.showIf || q.showIf(S.answers); }); }
  function root()       { return document.getElementById('rm-root'); }

  /* ── Screening ────────────────────────────────────────────────────────── */
  function renderScreening() {
    var vis  = visibleQs();
    var q    = vis[S.step];
    if (!q) return;
    var pct  = Math.round((S.step / vis.length) * 100);
    var sel  = S.answers[q.key] || null;

    var h = '';
    h += '<div class="rm-progress"><div class="rm-progress-fill" style="width:' + pct + '%"></div></div>';
    h += '<div class="rm-step-count">' + (S.step + 1) + ' of ' + vis.length + '</div>';
    h += '<div class="rm-question">' + q.q + '</div>';
    if (q.hint) h += '<div class="rm-q-hint">' + q.hint + '</div>';
    h += '<div class="rm-options">';
    q.opts.forEach(function (o) {
      h += '<button class="rm-opt' + (sel === o.val ? ' selected' : '') + '" data-val="' + o.val + '">';
      h += '<span class="rm-opt-label">' + o.label + '</span>';
      if (o.hint) h += '<span class="rm-opt-hint">' + o.hint + '</span>';
      h += '</button>';
    });
    h += '</div>';
    h += '<div class="rm-nav">';
    h += S.step > 0 ? '<button class="rm-back-btn">← Back</button>' : '<span></span>';
    h += '<button class="rm-continue-btn' + (sel ? ' on' : '') + '">Continue →</button>';
    h += '</div>';

    var wrap = document.createElement('div');
    wrap.className = 'rm-screen';
    wrap.innerHTML = h;
    var r = root();
    r.innerHTML = '';
    r.appendChild(wrap);

    wrap.querySelectorAll('.rm-opt').forEach(function (btn) {
      btn.addEventListener('click', function () {
        S.answers[q.key] = btn.dataset.val;
        // clear answers for questions now hidden
        var newVis = visibleQs();
        QS.forEach(function (qq) {
          if (!newVis.some(function (v) { return v.key === qq.key; })) delete S.answers[qq.key];
        });
        save();
        renderScreening();
      });
    });

    var cont = wrap.querySelector('.rm-continue-btn');
    if (cont) {
      cont.addEventListener('click', function () {
        if (!S.answers[q.key]) return;
        var v = visibleQs();
        if (S.step < v.length - 1) { S.step++; renderScreening(); }
        else {
          S.profile   = classify(S.answers);
          S.phaseOpen = defaultOpen(S.profile.stage);
          save();
          renderRoadmap();
        }
      });
    }

    var back = wrap.querySelector('.rm-back-btn');
    if (back) back.addEventListener('click', function () { if (S.step > 0) { S.step--; renderScreening(); } });
  }

  /* ── Roadmap ──────────────────────────────────────────────────────────── */
  function renderRoadmap() {
    var p      = S.profile;
    var flags  = getFlags(p);
    var phases = buildRoadmap(p);
    var chips  = profileChips(p, S.answers);

    var h = '';

    /* Profile bar */
    h += '<div class="rm-profile-bar">';
    h += '<div class="rm-profile-meta">';
    h += '<div class="rm-profile-eyebrow">Your study profile</div>';
    h += '<div class="rm-chips">';
    chips.forEach(function (c) { h += '<span class="rm-chip' + (c.cls ? ' ' + c.cls : '') + '">' + c.text + '</span>'; });
    h += '</div></div>';
    h += '<div class="rm-profile-actions"><button class="rm-print-btn" id="rm-print">Print</button><button class="rm-edit-btn" id="rm-edit">Edit answers</button></div>';
    h += '</div>';

    /* Flags */
    if (flags.length) {
      h += '<div class="rm-flags">';
      flags.forEach(function (f) {
        h += '<div class="rm-flag ' + f.tone + '">';
        h += '<div class="rm-flag-dot"></div>';
        h += '<div class="rm-flag-inner"><span class="rm-flag-title">' + f.title + '</span>';
        h += '<span class="rm-flag-detail">' + f.detail;
        if (f.href) h += ' <a href="' + f.href + '">Learn more →</a>';
        h += '</span></div></div>';
      });
      h += '</div>';
    }

    /* Phases */
    h += '<div class="rm-roadmap">';
    phases.forEach(function (phase) {
      var open  = !!S.phaseOpen[phase.id];
      var done  = phase.items.filter(function (i) { return !!S.checks[i.key]; }).length;
      var total = phase.items.length;

      h += '<div class="rm-phase' + (open ? ' open' : '') + '" id="rmp-' + phase.id + '">';
      h += '<div class="rm-phase-hdr">';
      h += '<div class="rm-phase-left"><span class="rm-phase-num">' + phase.num + '</span><span class="rm-phase-title">' + phase.title + '</span></div>';
      h += '<div class="rm-phase-right"><span class="rm-phase-count' + (done > 0 ? ' has-done' : '') + '">' + done + ' / ' + total + '</span><span class="rm-chevron">▶</span></div>';
      h += '</div>';
      h += '<div class="rm-phase-body">';

      phase.items.forEach(function (item) {
        var checked = !!S.checks[item.key];
        h += '<div class="rm-item' + (checked ? ' done' : '') + '" id="rmi-' + item.key + '">';
        h += '<div class="rm-checkbox' + (checked ? ' done' : '') + '" data-key="' + item.key + '"></div>';
        h += '<div class="rm-item-body"><div class="rm-item-text">' + item.text + '</div>';
        if (item.link) h += '<a class="rm-item-link" href="' + item.link.href + '">' + item.link.label + '</a>';
        h += '</div></div>';
      });

      if (phase.emailCTA) {
        h += '<div class="rm-email-cta" id="rm-email-cta">';
        h += '<div class="rm-email-title">Let the Research Facilitator know about your study</div>';
        h += '<div class="rm-email-desc">Send your study profile — you\'ll receive a follow-up within 5 business days.</div>';
        h += '<div class="rm-email-row"><input class="rm-email-input" id="rm-name" type="text" placeholder="Your name"><input class="rm-email-input" id="rm-email-addr" type="email" placeholder="Your email"></div>';
        h += '<button class="rm-email-submit" id="rm-send">Send to Research Facilitator</button>';
        h += '<div class="rm-email-ok" id="rm-email-ok">✓ Sent — the Research Facilitator will follow up within 5 business days.</div>';
        h += '</div>';
      }

      h += '</div></div>';
    });
    h += '</div>';

    var r = root();
    r.innerHTML = h;

    /* Phase toggle */
    r.querySelectorAll('.rm-phase-hdr').forEach(function (hdr) {
      hdr.addEventListener('click', function () {
        var ph = hdr.closest('.rm-phase');
        var id = ph.id.replace('rmp-', '');
        S.phaseOpen[id] = !S.phaseOpen[id];
        ph.classList.toggle('open', !!S.phaseOpen[id]);
        save();
      });
    });

    /* Checkbox */
    r.querySelectorAll('.rm-checkbox').forEach(function (chk) {
      chk.addEventListener('click', function (e) {
        e.stopPropagation();
        var key = chk.dataset.key;
        S.checks[key] = !S.checks[key];
        save();
        var itemEl = document.getElementById('rmi-' + key);
        if (itemEl) { itemEl.classList.toggle('done', !!S.checks[key]); chk.classList.toggle('done', !!S.checks[key]); }
        var phEl    = chk.closest('.rm-phase');
        if (phEl) {
          var allChk  = phEl.querySelectorAll('.rm-checkbox');
          var doneChk = phEl.querySelectorAll('.rm-checkbox.done').length;
          var countEl = phEl.querySelector('.rm-phase-count');
          if (countEl) { countEl.textContent = doneChk + ' / ' + allChk.length; countEl.classList.toggle('has-done', doneChk > 0); }
        }
      });
    });

    /* Print */
    var printBtn = document.getElementById('rm-print');
    if (printBtn) printBtn.addEventListener('click', function () { window.print(); });

    /* Edit / restart */
    var editBtn = document.getElementById('rm-edit');
    if (editBtn) {
      editBtn.addEventListener('click', function () {
        S.profile = null;
        S.step = 0;
        save();
        renderScreening();
      });
    }

    /* Email */
    var sendBtn = document.getElementById('rm-send');
    if (sendBtn) {
      sendBtn.addEventListener('click', function () {
        var name  = (document.getElementById('rm-name')       || {}).value || '';
        var email = (document.getElementById('rm-email-addr') || {}).value || '';
        if (!name.trim() || !email.trim()) return;
        sendBtn.disabled = true;
        sendBtn.textContent = 'Sending…';
        loadEmailJS(function () {
          window.emailjs.init({ publicKey: EMAILJS_KEY });
          window.emailjs.send(EMAILJS_SVC, EMAILJS_TPL, { message_html: buildEmailBody(name, email, p, S.answers, flags) })
            .then(function () {
              var cta = document.getElementById('rm-email-cta');
              var ok  = document.getElementById('rm-email-ok');
              if (cta) { cta.querySelector('.rm-email-row').style.display = 'none'; sendBtn.style.display = 'none'; }
              if (ok)  ok.style.display = 'block';
            }, function () {
              sendBtn.disabled = false;
              sendBtn.textContent = 'Send to Research Facilitator';
            });
        });
      });
    }
  }

  /* ── Email helpers ────────────────────────────────────────────────────── */
  function loadEmailJS(cb) {
    if (window.emailjs) { cb(); return; }
    var s = document.createElement('script');
    s.src = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js';
    s.onload = cb;
    document.head.appendChild(s);
  }

  function buildEmailBody(name, email, p, a, flags) {
    var tmap  = { interventional: 'Interventional', 'observational-prospective': 'Prospective Observational', retrospective: 'Retrospective / Secondary' };
    var imap  = { drug: 'Drug / Biologic', device: 'Medical Device', nhp: 'Natural Health Product (NHP)', low: 'Low-risk behavioral / procedural' };
    var smap  = { industry: 'Industry-sponsored', si: 'Sponsor-Investigator', grant: 'Grant-funded / Academic' };
    var stmap = { idea: 'Early idea / concept', design: 'Protocol design and planning', submission: 'Submission', conduct: 'In conduct', closeout: 'Close-out' };
    var phimap= { yes: 'Yes', no: 'No', unsure: 'Unsure' };
    var popmap= { minors: 'Minors', incapable: 'Incapable adults', both: 'Minors and incapable adults', none: 'Standard adult population' };
    var sitmap= { single: 'Single site (MUHC)', 'multi-lead': 'Multicentre — MUHC REB Lead', 'multi-cross': 'Multicentre — cross-provincial / international' };
    var rows = [
      ['Investigator', name + ' &lt;' + email + '&gt;'],
      ['Stage', stmap[a.stage] || a.stage],
      ['Training Level', 'Level ' + p.level],
      ['Study type', tmap[a.type] || a.type],
      a.intType ? ['Product type', imap[a.intType] || a.intType] : null,
      ['Sponsorship', smap[a.sponsorship] || a.sponsorship],
      ['Identifiable PHI', phimap[a.phi] || a.phi],
      (a.phi === 'yes' || a.phi === 'unsure') ? ['Cross-border data', a.crossBorder === 'yes' ? 'Yes — ÉFVP required' : 'No'] : null,
      ['Vulnerable populations', popmap[a.population] || a.population],
      ['Sites', sitmap[a.sites] || a.sites]
    ].filter(Boolean);

    var h = '<div style="font-family:Arial,sans-serif;max-width:600px">';
    h += '<div style="background:#007a6e;padding:24px 28px;border-radius:8px 8px 0 0"><h2 style="color:#fff;margin:0;font-size:18px">My Study Roadmap — New Submission</h2>';
    h += '<p style="color:rgba(255,255,255,.8);margin:6px 0 0;font-size:13px">Submitted via the RI-MUHC Clinical Research Hub</p></div>';
    h += '<div style="padding:24px 28px;background:#fff;border:1px solid #e5e5e5;border-top:none;border-radius:0 0 8px 8px">';
    h += '<table style="width:100%;border-collapse:collapse;font-size:14px;margin-bottom:20px">';
    rows.forEach(function (r) {
      h += '<tr><td style="padding:7px 16px 7px 0;color:#888;font-weight:600;white-space:nowrap;vertical-align:top;font-size:13px">' + r[0] + '</td>';
      h += '<td style="padding:7px 0;color:#111;font-size:14px">' + r[1] + '</td></tr>';
    });
    h += '</table>';
    if (flags.length) {
      h += '<div style="border-top:1px solid #f0f0f0;padding-top:16px"><p style="font-size:11px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:#999;margin:0 0 10px">Regulatory flags</p><ul style="margin:0;padding-left:18px;font-size:13.5px;color:#333">';
      flags.forEach(function (f) { h += '<li style="margin-bottom:8px"><strong style="color:#111">' + f.title + '</strong><br>' + f.detail + '</li>'; });
      h += '</ul></div>';
    }
    h += '</div></div>';
    return h;
  }

  /* ── Init & SPA ───────────────────────────────────────────────────────── */
  function init() {
    if (!load()) { S.step = 0; renderScreening(); return; }
    if (S.profile)  { renderRoadmap(); return; }
    // Partially answered — find first unanswered
    var vis = visibleQs();
    for (var i = 0; i < vis.length; i++) {
      if (!S.answers[vis[i].key]) { S.step = i; renderScreening(); return; }
    }
    // All answered but no profile
    S.profile   = classify(S.answers);
    S.phaseOpen = defaultOpen(S.profile.stage);
    save();
    renderRoadmap();
  }

  var _lastUrl = location.href;
  new MutationObserver(function () {
    if (location.href !== _lastUrl) {
      _lastUrl = location.href;
      setTimeout(function () { tryMount(20); }, 120);
    }
  }).observe(document.body, { childList: true, subtree: true });

  function tryMount(n) {
    if (document.getElementById('rm-root')) { init(); return; }
    if (n > 0) setTimeout(function () { tryMount(n - 1); }, 100);
  }

  tryMount(20);
})();
