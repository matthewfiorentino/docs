/**
 * My Study Roadmap — RI-MUHC Clinical Research Hub
 * Merged intake + roadmap: screening → auto-send email → personalized lifecycle checklist.
 * Self-contained: injects own CSS, no localStorage.
 */
(function () {
  'use strict';

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

      /* Screening — shared */
      '.rm-screen { padding: 4px 0 48px; }',
      '.rm-progress { height: 2px; background: #ebebeb; border-radius: 2px; margin-bottom: 36px; overflow: hidden; }',
      '.rm-progress-fill { height: 100%; background: #2b9ce2; border-radius: 2px; transition: width .35s cubic-bezier(.16,1,.3,1); }',
      '.rm-step-count { font-size: 11px; font-weight: 600; letter-spacing: .06em; color: #bbb; text-align: right; margin-bottom: 28px; text-transform: uppercase; }',
      '.rm-question { font-size: 22px; font-weight: 700; color: #111; line-height: 1.3; letter-spacing: -.02em; margin-bottom: 6px; }',
      '.rm-q-hint { font-size: 13.5px; color: #777; line-height: 1.6; margin-bottom: 24px; }',
      '.rm-nav { display: flex; justify-content: space-between; align-items: center; }',
      '.rm-back-btn { font-size: 13.5px; color: #999; cursor: pointer; background: none; border: none; padding: 0; font-family: inherit; }',
      '.rm-back-btn:hover { color: #444; }',
      '.rm-continue-btn { font-size: 13.5px; font-weight: 600; color: #fff; background: #2b9ce2; border: none; border-radius: 8px; padding: 10px 22px; cursor: pointer; opacity: 0; transition: opacity .2s, background .12s; pointer-events: none; font-family: inherit; }',
      '.rm-continue-btn.on { opacity: 1; pointer-events: auto; }',
      '.rm-continue-btn:hover { background: #1a5e8a; }',

      /* Single-select */
      '.rm-options { display: flex; flex-direction: column; gap: 7px; margin-bottom: 36px; }',
      '.rm-opt { display: flex; flex-direction: column; gap: 2px; padding: 13px 16px; border: 1.5px solid #e5e5e5; border-radius: 9px; cursor: pointer; background: #fff; transition: border-color .12s, background .12s; text-align: left; }',
      '.rm-opt:hover { border-color: #2b9ce2; background: #eef5fc; }',
      '.rm-opt.selected { border-color: #2b9ce2; background: #e8f4fc; }',
      '.rm-opt-label { font-size: 14.5px; font-weight: 500; color: #111; }',
      '.rm-opt.selected .rm-opt-label { color: #1a5e8a; }',
      '.rm-opt-hint { font-size: 12.5px; color: #999; line-height: 1.45; margin-top: 1px; }',

      /* Multi-select */
      '.rm-multi-options { display: flex; flex-direction: column; gap: 7px; margin-bottom: 28px; }',
      '.rm-multi-opt { display: flex; align-items: center; gap: 12px; padding: 11px 16px; border: 1.5px solid #e5e5e5; border-radius: 9px; cursor: pointer; background: #fff; transition: border-color .12s, background .12s; text-align: left; }',
      '.rm-multi-opt:hover { border-color: #2b9ce2; background: #eef5fc; }',
      '.rm-multi-opt.selected { border-color: #2b9ce2; background: #e8f4fc; }',
      '.rm-multi-check { width: 16px; height: 16px; border: 1.5px solid #ddd; border-radius: 4px; flex-shrink: 0; display: flex; align-items: center; justify-content: center; transition: all .12s; }',
      '.rm-multi-opt.selected .rm-multi-check { background: #2b9ce2; border-color: #2b9ce2; }',
      '.rm-multi-opt.selected .rm-multi-check::after { content: ""; width: 4px; height: 7px; border: 2px solid #fff; border-top: none; border-left: none; transform: rotate(45deg) translate(-1px,-1px); display: block; }',
      '.rm-multi-label { font-size: 14px; font-weight: 500; color: #111; }',
      '.rm-multi-opt.selected .rm-multi-label { color: #1a5e8a; }',
      '.rm-multi-nav { display: flex; justify-content: space-between; align-items: center; margin-top: 8px; }',
      '.rm-skip-btn { font-size: 12.5px; color: #bbb; cursor: pointer; background: none; border: none; padding: 0; font-family: inherit; }',
      '.rm-skip-btn:hover { color: #777; }',

      /* Text inputs */
      '.rm-text-wrap { margin-bottom: 36px; }',
      '.rm-text-input { width: 100%; padding: 12px 14px; border: 1.5px solid #e5e5e5; border-radius: 9px; font-size: 15px; color: #111; background: #fff; font-family: inherit; outline: none; transition: border-color .15s; box-sizing: border-box; }',
      '.rm-text-input:focus { border-color: #2b9ce2; }',
      '.rm-text-input::placeholder { color: #ccc; }',

      /* Contact screen */
      '.rm-contact-fields { display: flex; flex-direction: column; gap: 14px; margin-bottom: 36px; }',
      '.rm-contact-label { font-size: 11px; font-weight: 700; color: #aaa; text-transform: uppercase; letter-spacing: .07em; margin-bottom: 5px; }',
      '.rm-role-opts { display: flex; flex-wrap: wrap; gap: 7px; }',
      '.rm-role-opt { padding: 8px 14px; border: 1.5px solid #e5e5e5; border-radius: 20px; font-size: 13.5px; font-weight: 500; color: #555; cursor: pointer; background: #fff; transition: all .12s; font-family: inherit; }',
      '.rm-role-opt:hover { border-color: #2b9ce2; color: #1a5e8a; background: #eef5fc; }',
      '.rm-role-opt.selected { border-color: #2b9ce2; background: #e8f4fc; color: #1a5e8a; }',
      '.rm-submit-btn { font-size: 13.5px; font-weight: 600; color: #fff; background: #2b9ce2; border: none; border-radius: 8px; padding: 10px 22px; cursor: pointer; font-family: inherit; transition: background .12s; }',
      '.rm-submit-btn:hover { background: #1a5e8a; }',
      '.rm-submit-btn:disabled { background: #ccc; cursor: default; }',

      /* Roadmap — sent chip */
      '.rm-sent-chip { display: flex; align-items: center; gap: 9px; padding: 10px 14px; background: #e8f4fc; border: 1px solid #b3d4f0; border-radius: 8px; margin-bottom: 24px; font-size: 13px; color: #1a5e8a; line-height: 1.5; }',
      '.rm-sent-dot { width: 7px; height: 7px; background: #2b9ce2; border-radius: 50%; flex-shrink: 0; }',

      /* Roadmap — profile bar */
      '.rm-profile-bar { display: flex; align-items: flex-start; justify-content: space-between; gap: 16px; margin-bottom: 20px; padding-bottom: 20px; border-bottom: 1px solid #f0f0f0; }',
      '.rm-profile-meta { flex: 1; }',
      '.rm-profile-eyebrow { font-size: 10px; font-weight: 700; letter-spacing: .1em; text-transform: uppercase; color: #bbb; margin-bottom: 8px; }',
      '.rm-chips { display: flex; flex-wrap: wrap; gap: 5px; }',
      '.rm-chip { font-size: 12px; font-weight: 500; color: #555; background: #f5f5f5; border-radius: 20px; padding: 3px 10px; }',
      '.rm-chip.level { background: #e8f4fc; color: #1a5e8a; }',
      '.rm-profile-actions { display: flex; align-items: center; gap: 8px; flex-shrink: 0; }',
      '.rm-print-btn { font-size: 12px; color: #999; background: none; border: 1px solid #e5e5e5; border-radius: 6px; cursor: pointer; padding: 5px 10px; font-family: inherit; transition: border-color .12s, color .12s; }',
      '.rm-print-btn:hover { color: #444; border-color: #bbb; }',
      '.rm-edit-btn { font-size: 12px; color: #bbb; background: none; border: none; cursor: pointer; padding: 0; font-family: inherit; white-space: nowrap; }',
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
      '.rm-flag.teal  { background: #e8f4fc; } .rm-flag.teal  .rm-flag-dot { background: #2b9ce2; } .rm-flag.teal  .rm-flag-title { color: #1a5e8a; }',

      /* Level callout */
      '.rm-level-callout { background: #f8f9f8; border: 1px solid #e5e5e5; border-radius: 9px; padding: 14px 16px; margin-bottom: 16px; }',
      '.rm-level-name { font-size: 13.5px; font-weight: 700; color: #111; margin-bottom: 2px; }',
      '.rm-level-path { font-size: 12px; color: #888; margin-bottom: 12px; }',
      '.rm-level-reqs { display: flex; flex-direction: column; gap: 5px; }',
      '.rm-level-req { font-size: 13px; color: #444; display: flex; align-items: baseline; gap: 6px; }',
      '.rm-level-req::before { content: "·"; color: #2b9ce2; font-weight: 700; flex-shrink: 0; }',
      '.rm-level-reqs a { color: #2b9ce2; text-decoration: none; }',
      '.rm-level-reqs a:hover { text-decoration: underline; }',
      '.rm-level-where { color: #aaa; font-size: 11.5px; }',

      /* Phases */
      '.rm-roadmap { display: flex; flex-direction: column; }',
      '.rm-phase { border-top: 1px solid #f2f2f2; }',
      '.rm-phase-hdr { display: flex; align-items: center; justify-content: space-between; padding: 15px 0; cursor: pointer; user-select: none; }',
      '.rm-phase-hdr:hover .rm-phase-title { color: #2b9ce2; }',
      '.rm-phase-left { display: flex; align-items: center; gap: 14px; }',
      '.rm-phase-num { font-size: 10px; font-weight: 700; letter-spacing: .08em; text-transform: uppercase; color: #ccc; width: 52px; flex-shrink: 0; }',
      '.rm-phase-title { font-size: 14px; font-weight: 600; color: #222; transition: color .1s; }',
      '.rm-phase-right { display: flex; align-items: center; gap: 10px; }',
      '.rm-phase-count { font-size: 12px; color: #ccc; font-variant-numeric: tabular-nums; }',
      '.rm-phase-count.has-done { color: #2b9ce2; }',
      '.rm-chevron { font-size: 9px; color: #ccc; transition: transform .2s; display: inline-block; }',
      '.rm-phase.open .rm-chevron { transform: rotate(90deg); }',
      '.rm-phase-body { display: none; padding: 4px 0 18px 66px; flex-direction: column; gap: 1px; }',
      '.rm-phase.open .rm-phase-body { display: flex; }',

      /* Items */
      '.rm-item { display: flex; align-items: flex-start; gap: 11px; padding: 6px 0; }',
      '.rm-checkbox { width: 17px; height: 17px; border-radius: 5px; border: 1.5px solid #ddd; flex-shrink: 0; cursor: pointer; display: flex; align-items: center; justify-content: center; margin-top: 2px; transition: border-color .12s, background .12s; }',
      '.rm-checkbox:hover { border-color: #2b9ce2; }',
      '.rm-checkbox.done { border-color: #2b9ce2; background: #2b9ce2; }',
      '.rm-checkbox.done::after { content: ""; width: 4px; height: 8px; border: 2px solid #fff; border-top: none; border-left: none; transform: rotate(45deg) translate(-1px,-1px); display: block; }',
      '.rm-item-body { flex: 1; min-width: 0; }',
      '.rm-item-text { font-size: 13.5px; color: #222; line-height: 1.55; transition: color .12s; }',
      '.rm-item.done .rm-item-text { color: #bbb; text-decoration: line-through; text-decoration-color: #ddd; }',
      '.rm-item-link { display: inline-flex; align-items: center; gap: 3px; font-size: 12px; color: #2b9ce2; text-decoration: none; margin-top: 3px; }',
      '.rm-item-link:hover { text-decoration: underline; }',
      '.rm-item-link::after { content: "→"; font-size: 10px; }',

      /* Print */
      '@media print {',
      '  .rm-print-btn, .rm-edit-btn, .rm-chevron, .rm-sent-chip { display: none !important; }',
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
      key: 'stage', type: 'single',
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
      key: 'studyTitle', type: 'text',
      q: 'Working study title',
      hint: 'A working title is fine — helps the Research Facilitator match your roadmap to your file.',
      placeholder: 'e.g. Phase II trial of X in adults with Y'
    },
    {
      key: 'type', type: 'single',
      q: 'What type of study is this?',
      opts: [
        { val: 'interventional',            label: 'Interventional',                  hint: 'Participants receive a drug, device, or other intervention assigned by the protocol' },
        { val: 'observational-prospective', label: 'Prospective observational',       hint: 'Observing outcomes without assigning an intervention' },
        { val: 'retrospective',             label: 'Retrospective or secondary data', hint: 'Analyzing data already collected — charts, registries, biobanks' }
      ]
    },
    {
      key: 'intType', type: 'single',
      showIf: function (a) { return a.type === 'interventional'; },
      q: 'What kind of investigational product?',
      opts: [
        { val: 'drug',   label: 'Drug or biologic',                  hint: 'Includes biosimilars and advanced therapy products' },
        { val: 'device', label: 'Medical device',                    hint: 'Includes diagnostics, surgical devices, implants' },
        { val: 'nhp',    label: 'Natural health product (NHP)',       hint: 'Vitamins, herbal products, homeopathic medicines' },
        { val: 'low',    label: 'Low-risk behavioural or procedural',  hint: 'No Health Canada filing required' }
      ]
    },
    {
      key: 'sponsorship', type: 'single',
      q: 'What is the sponsorship arrangement?',
      opts: [
        { val: 'industry', label: 'Industry-sponsored',       hint: 'A pharmaceutical, biotech, or device company is the sponsor' },
        { val: 'si',       label: 'Sponsor-Investigator',     hint: 'The PI holds both Sponsor and Investigator responsibilities' },
        { val: 'grant',    label: 'Grant-funded or academic', hint: 'CIHR, FRQS, foundation, or investigator-initiated without an industry sponsor' }
      ]
    },
    {
      key: 'phi', type: 'single',
      q: 'Will your study collect or access identifiable health information?',
      hint: 'Includes names, MRNs, dates of birth, diagnoses, or any data that could identify a participant.',
      opts: [
        { val: 'yes',    label: 'Yes' },
        { val: 'no',     label: 'No — fully anonymized or aggregate data only' },
        { val: 'unsure', label: 'Unsure' }
      ]
    },
    {
      key: 'crossBorder', type: 'single',
      showIf: function (a) { return a.phi === 'yes' || a.phi === 'unsure'; },
      q: 'Will identifiable data leave Quebec or Canada?',
      hint: 'Includes sharing with an international sponsor, or data stored on non-Canadian servers.',
      opts: [
        { val: 'yes', label: 'Yes' },
        { val: 'no',  label: 'No — data stays within Quebec or Canada' }
      ]
    },
    {
      key: 'population', type: 'single',
      q: 'Does your study involve vulnerable populations?',
      opts: [
        { val: 'minors',    label: 'Minors (under 18)',               hint: 'Requires parental consent and age-appropriate assent' },
        { val: 'incapable', label: 'Adults unable to consent',        hint: 'Requires a Personne mandatée, tutor, or curator' },
        { val: 'both',      label: 'Both minors and incapable adults' },
        { val: 'none',      label: 'No — standard adult population' }
      ]
    },
    {
      key: 'sites', type: 'single',
      q: 'Is this a single-site or multicentre study?',
      opts: [
        { val: 'single',      label: 'Single site — MUHC only' },
        { val: 'multi-lead',  label: 'Multicentre — MUHC is the Quebec REB Lead',   hint: 'You handle submission and coordinate other Quebec RSSS sites' },
        { val: 'multi-part',  label: 'Multicentre — MUHC is a participating site',  hint: 'Another site leads the submission' },
        { val: 'multi-cross', label: 'Multicentre — cross-provincial or international', hint: 'Sites outside Quebec involved' }
      ]
    },
    {
      key: 'cim', type: 'single',
      showIf: function (a) { return a.type === 'interventional'; },
      q: 'Will this study use the Centre for Innovative Medicine (CIM)?',
      hint: 'CIM provides clinical space, research nursing, monitoring, and specialized platforms at the Glen and MGH sites.',
      opts: [
        { val: 'yes',     label: 'Yes — fully or primarily through CIM' },
        { val: 'partial', label: 'Partially — specific CIM services' },
        { val: 'no',      label: 'No' },
        { val: 'unsure',  label: 'Unsure' }
      ]
    },
    {
      key: 'experience', type: 'single',
      showIf: function (a) { return a.stage === 'submission' || a.stage === 'conduct'; },
      q: 'How much experience does your team have running studies of this type at the RI-MUHC?',
      hint: 'Helps the Research Facilitator calibrate the level of support to offer.',
      opts: [
        { val: 'first',     label: 'First or second study of this type' },
        { val: 'some',      label: 'Some experience — 3 to 5 studies' },
        { val: 'extensive', label: 'Extensive — this is routine for our team' }
      ]
    },
    {
      key: 'naganoNum', type: 'text', optional: true,
      showIf: function (a) { return a.stage === 'conduct' || a.stage === 'closeout'; },
      q: 'Nagano study number',
      hint: 'So the Research Facilitator can pull up your record directly. Leave blank if you don\'t have it handy.',
      placeholder: 'e.g. 2024-1234'
    },
    {
      key: 'supportNeeds', type: 'multi', optional: true,
      q: 'What do you need most right now?',
      hint: 'Select all that apply — the Research Facilitator will come prepared.',
      opts: [
        { val: 'design-protocol',  label: 'Protocol design or feasibility support' },
        { val: 'regulatory',       label: 'Regulatory submissions — Health Canada or Nagano' },
        { val: 'training',         label: 'Training and credentials guidance' },
        { val: 'budget-contracts', label: 'Budget, contracts, or funding' },
        { val: 'team-setup',       label: 'Hiring or team setup' },
        { val: 'data',             label: 'Data management, REDCap, or privacy' },
        { val: 'cim-connect',      label: 'Connect with CIM' },
        { val: 'conduct-support',  label: 'Study conduct support' },
        { val: 'closeout-support', label: 'Close-out procedures or amendments' }
      ]
    },
    {
      key: '_contact', type: 'contact',
      q: 'Almost there — where should we send your roadmap?',
      hint: 'The Research Facilitator will follow up within 5 business days.'
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
    p.multiPart   = a.sites === 'multi-part';
    p.multiCross  = a.sites === 'multi-cross';
    p.hasCIM      = a.cim === 'yes' || a.cim === 'partial' || a.cim === 'unsure';

    if      (p.isDrug)           p.level = 1;
    else if (p.isDevice)         p.level = 2;
    else if (p.isNHP)            p.level = 3;
    else if (p.isObs || p.isLow) p.level = 4;
    else if (p.isRetro)          p.level = 5;
    else                         p.level = 4;

    /* Pathway — shown to facilitator in email only */
    if (p.stage === 'idea') {
      p.pathway = 'intro-call';
    } else if (p.isDrug || p.isIndustry || p.hasCIM || p.isSI || a.experience === 'first') {
      p.pathway = 'warm-handoff';
    } else if (p.level <= 2) {
      p.pathway = 'consult';
    } else {
      p.pathway = 'self-serve';
    }

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
        href: '/kb/pediatric-research' });
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
    if (p.multiPart)            chips.push({ text: 'Participating site' });
    if (p.multiCross)           chips.push({ text: 'Cross-provincial' });
    return chips;
  }

  /* ── Level training callout ──────────────────────────────────────────── */
  function levelCallout(p) {
    var names = {
      1: 'Level I — Drug / Biologic Study',
      2: 'Level II — Medical Device Study',
      3: 'Level III — Natural Health Product Study',
      4: 'Level IV — Prospective Observational Study',
      5: 'Level V — Retrospective / Secondary Data Study'
    };
    var isCR = p.level <= 3;
    var path = isCR ? 'SOP-CR path · Competency Assessment valid 2 years'
                    : 'SOP-LR path · Competency Assessment valid 5 years';
    var reqs = [];
    if (isCR) {
      reqs.push({ text: 'SOP-CR Reader', where: 'TalentLMS', href: '/training/compliance-requirements' });
      reqs.push({ text: 'Competency Assessment — SOP-CR (valid 2 years)', where: 'TalentLMS', href: '/training/compliance-requirements' });
      reqs.push({ text: 'ICH E6(R3) GCP — Good Clinical Practice (renew every 2 years)', where: 'CITI', href: '/training/external-certifications' });
      if (p.isDrug)   reqs.push({ text: 'Health Canada Division 5 — Drugs for Clinical Trials (renew every 2 years)', where: 'CITI', href: '/training/external-certifications' });
      if (p.isDevice) reqs.push({ text: 'ISO 14155:2020 GCP for Medical Devices (renew every 2 years)', where: 'iso.org', href: '/training/external-certifications' });
    } else {
      reqs.push({ text: 'SOP-LR Reader', where: 'TalentLMS', href: '/training/compliance-requirements' });
      reqs.push({ text: 'Competency Assessment — SOP-LR (valid 5 years)', where: 'TalentLMS', href: '/training/compliance-requirements' });
    }
    var h = '<div class="rm-level-callout">';
    h += '<div class="rm-level-name">' + (names[p.level] || 'Level ' + p.level) + '</div>';
    h += '<div class="rm-level-path">' + path + '</div>';
    h += '<div class="rm-level-reqs">';
    reqs.forEach(function (r) {
      h += '<div class="rm-level-req"><a href="' + r.href + '">' + r.text + '</a> <span class="rm-level-where">' + r.where + '</span></div>';
    });
    h += '</div></div>';
    return h;
  }

  /* ── Roadmap content ─────────────────────────────────────────────────── */
  function it(key, text, linkLabel, linkHref) {
    return { key: key, text: text, link: linkLabel ? { label: linkLabel, href: linkHref } : null };
  }

  function buildRoadmap(p) {
    var phases = [];
    var isCR = p.level <= 3;

    /* Phase 0 — Credentials & Training */
    var ph0 = { id: 'p0', num: 'Phase 0', title: 'Credentials & Training', intro: levelCallout(p), items: [] };
    ph0.items.push(it('p0-privs', 'Obtain Human Research Privileges (physicians/dentists) or Human Researcher Status (all others) — apply via TalentLMS, allow 1–5 business days', 'Privileges & Status', '/training/compliance-requirements'));
    ph0.items.push(it('p0-sop', isCR
      ? 'Complete SOP-CR Reader on TalentLMS — acknowledge all SOPs in the Level I–III track'
      : 'Complete SOP-LR Reader on TalentLMS — acknowledge all SOPs in the Level IV–V track',
      'Training requirements', '/training/compliance-requirements'));
    ph0.items.push(it('p0-ca', isCR
      ? 'Pass Competency Assessment — SOP-CR on TalentLMS (certificate valid 2 years; Reader must be complete first)'
      : 'Pass Competency Assessment — SOP-LR on TalentLMS (certificate valid 5 years; Reader must be complete first)',
      'Training requirements', '/training/compliance-requirements'));
    if (p.level <= 3)
      ph0.items.push(it('p0-gcp',  'Complete ICH E6(R3) GCP — Good Clinical Practice via CITI (renew every 2 years; must not expire within 90 days of submission)', 'External certifications', '/training/external-certifications'));
    if (p.isDrug)
      ph0.items.push(it('p0-div5', 'Complete Health Canada Division 5 — Drugs for Clinical Trials via CITI (renew every 2 years)', 'External certifications', '/training/external-certifications'));
    if (p.isDevice)
      ph0.items.push(it('p0-iso',  'Complete ISO 14155:2020 GCP for Medical Devices — self-train via iso.org (renew every 2 years)', 'External certifications', '/training/external-certifications'));
    ph0.items.push(it('p0-tdl', 'Prepare the Task Delegation Log — all team members must be trained and credentialed before signing', 'SOP-CR-002', '/sops/cr-002'));
    phases.push(ph0);

    /* Phase 1 — Study Design & Planning */
    var ph1 = { id: 'p1', num: 'Phase 1', title: 'Study Design & Planning', items: [] };
    ph1.items.push(it('p1-lifecycle',   'Review the study lifecycle — understand what lies ahead at each stage', 'Study lifecycle', '/kb/study-lifecycle'));
    ph1.items.push(it('p1-feasibility', 'Conduct a feasibility assessment — site capacity, patient population, realistic timelines', 'Feasibility', '/kb/feasibility'));
    if (p.isInterv || p.isObs)
      ph1.items.push(it('p1-design',    'Develop or review the study design and protocol structure', 'Study design', '/kb/study-design'));
    if (p.isObs || p.isRetro)
      ph1.items.push(it('p1-bcu',       'Consult BCU (Biostatistics & Clinical Epidemiology) for study design and statistical planning', 'BCU', '/kb/bcu'));
    if (p.isRetro)
      ph1.items.push(it('p1-dw',        'Check the Data Warehouse for variable availability and cohort feasibility before finalizing the protocol', 'Data Warehouse', '/kb/data-warehouse'));
    ph1.items.push(it('p1-budget',      'Develop the study budget — include REB fees, pharmacy, indirect costs, and screen-failure buffer', 'Budgets & contracts', '/kb/budget-negotiation'));
    if (p.isIndustry)
      ph1.items.push(it('p1-cta-neg',   'Negotiate the Clinical Trial Agreement with the sponsor — allow 60–90 days', 'Clinical trial agreements', '/kb/clinical-trial-agreements'));
    if (p.isSI)
      ph1.items.push(it('p1-si',        'Review Sponsor-Investigator obligations — the 100-series SOPs apply to your study', 'Sponsor-Investigator', '/kb/sponsor-investigator'));
    if (p.needsHC)
      ph1.items.push(it('p1-hc-plan',   'Plan the Health Canada filing timeline — allow minimum 30 days for HC review, running in parallel with REB', 'Regulatory requirements', '/kb/regulations'));
    if (p.crossBorder)
      ph1.items.push(it('p1-efvp-plan', 'Plan the ÉFVP (Privacy Impact Assessment) — allow 4–8 weeks to complete before submission', 'Privacy & data governance', '/kb/privacy'));
    if (p.phi)
      ph1.items.push(it('p1-data-plan', 'Plan the data management approach — REDCap build, CRF design, storage and access controls', 'CORD', '/kb/cord'));
    if (p.hasCIM)
      ph1.items.push(it('p1-cim',       'Engage CIM during the design phase — well before your Nagano submission', 'Planning with CIM', '/cim/planning'));
    phases.push(ph1);

    /* Phase 2 — Pre-Submission Documents */
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

    /* Phase 3 — Submission & Review */
    var ph3 = { id: 'p3', num: 'Phase 3', title: 'Submission & Review', items: [] };
    ph3.items.push(it('p3-nagano',  'Submit via Nagano F11 — triggers REB review and institutional feasibility review in parallel', 'Submitting via Nagano', '/kb/submitting-via-nagano'));
    if (p.isDrug)
      ph3.items.push(it('p3-hc-cta', 'Health Canada CTA filed and 30-day review period underway — may proceed after 30 days if no stop notice received', 'SOP-CR-018', '/sops/cr-018'));
    if (p.isDevice)
      ph3.items.push(it('p3-hc-ita', 'Health Canada ITA filed and under review', 'SOP-CR-024', '/sops/cr-024'));
    ph3.items.push(it('p3-reb',     'REB approval letter received — typically 6–8 weeks for initial review'));
    if (p.multiLead)
      ph3.items.push(it('p3-rsss',  'Coordinate review at all Quebec RSSS participating sites — MUHC submits as the REB Lead'));
    if (p.multiPart)
      ph3.items.push(it('p3-part',  'Confirm lead site REB approval — MUHC local review proceeds in parallel'));
    if (p.multiCross)
      ph3.items.push(it('p3-ext',   'Coordinate ethics and authorization review at all external (non-Quebec) sites'));
    phases.push(ph3);

    /* Phase 4 — Activation */
    var ph4 = { id: 'p4', num: 'Phase 4', title: 'Activation', items: [] };
    ph4.items.push(it('p4-auth',    'MUHC Authorization letter received — all review streams must be complete before any study activity begins'));
    ph4.items.push(it('p4-tdl',     'Delegation Log finalized — all team members trained, credentialed, and signed', 'SOP-CR-002', '/sops/cr-002'));
    ph4.items.push(it('p4-isf',     'Investigator Site File opened and organized with all essential documents', 'ISF', '/kb/isf'));
    if (p.isIndustry)
      ph4.items.push(it('p4-go',    "Sponsor's Go Letter received — participant enrolment may not begin until this is in hand"));
    if (p.isDrug)
      ph4.items.push(it('p4-pharm', 'Pharmacy agreement in place — investigational product accountability system established', 'SOP-CR-010', '/sops/cr-010'));
    if (p.isSI)
      ph4.items.push(it('p4-mon',   'Independent monitor engaged — must not appear on the site Delegation Log', 'Sponsor-Investigator', '/kb/sponsor-investigator'));
    if (p.hasCIM)
      ph4.items.push(it('p4-cim',   'CIM activation confirmed — pharmacy, nursing, and platform agreements in place', 'CIM services', '/cim/services'));
    phases.push(ph4);

    /* Phase 5 — Conduct */
    var ph5 = { id: 'p5', num: 'Phase 5', title: 'Conduct', items: [] };
    ph5.items.push(it('p5-consent',    'Ongoing consent — reconsent participants when the protocol or ICF changes', 'Consent', '/kb/consent'));
    ph5.items.push(it('p5-source',     'Source documentation maintained per GCP — legible, contemporaneous, attributable', 'Data integrity', '/kb/data-integrity'));
    ph5.items.push(it('p5-deviations', 'Protocol deviations identified and reported promptly per SOP', 'SOP-CR-015', '/sops/cr-015'));
    ph5.items.push(it('p5-training',   'Team training records kept current — the 90-day rule applies to amendments'));
    if (p.level <= 3)
      ph5.items.push(it('p5-sae',      'Adverse events and SAEs reported to sponsor; SUSARs to Health Canada within 7/15 days as applicable', 'SOP-CR-012', '/sops/cr-012'));
    if (p.needsHC)
      ph5.items.push(it('p5-ip',       'Investigational product accountability — dispensing records, returns, and reconciliation maintained', 'SOP-CR-010', '/sops/cr-010'));
    if (p.isSI)
      ph5.items.push(it('p5-dsur',     'Annual Development Safety Update Report (DSUR) prepared and submitted to Health Canada', 'Sponsor-Investigator', '/kb/sponsor-investigator'));
    if (p.phi)
      ph5.items.push(it('p5-breach',   'Any privacy breach reported to the CAI and affected participants within 72 hours (Loi 25)', 'Privacy & data governance', '/kb/privacy'));
    phases.push(ph5);

    /* Phase 6 — Close-Out */
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

  function defaultOpen() {
    return { p0: true, p1: true, p2: true, p3: true, p4: true, p5: true, p6: true };
  }

  /* ── State ────────────────────────────────────────────────────────────── */
  var S = { step: 0, answers: {}, profile: null, checks: {}, phaseOpen: {} };

  function reset() {
    S.step = 0; S.answers = {}; S.profile = null; S.checks = {}; S.phaseOpen = {};
  }

  function visibleQs() { return QS.filter(function (q) { return !q.showIf || q.showIf(S.answers); }); }
  function root()       { return document.getElementById('rm-root'); }

  /* ── Screening ────────────────────────────────────────────────────────── */
  function renderScreening() {
    var vis = visibleQs();
    var q   = vis[S.step];
    if (!q) return;
    var pct = Math.round((S.step / vis.length) * 100);

    var h = '';
    h += '<div class="rm-progress"><div class="rm-progress-fill" style="width:' + pct + '%"></div></div>';
    h += '<div class="rm-step-count">' + (S.step + 1) + ' of ' + vis.length + '</div>';
    h += '<div class="rm-question">' + q.q + '</div>';
    if (q.hint) h += '<div class="rm-q-hint">' + q.hint + '</div>';

    if (q.type === 'single') {
      h += renderSingleOpts(q);
      h += renderNav(!!S.answers[q.key], 'Continue →');

    } else if (q.type === 'text') {
      var val = S.answers[q.key] || '';
      h += '<div class="rm-text-wrap"><input class="rm-text-input" id="rm-ti" type="text" value="' + esc(val) + '" placeholder="' + esc(q.placeholder || '') + '"></div>';
      h += renderNav(q.optional || val.trim().length > 0, q.optional ? 'Skip →' : 'Continue →');

    } else if (q.type === 'multi') {
      var sel = Array.isArray(S.answers[q.key]) ? S.answers[q.key] : [];
      h += '<div class="rm-multi-options">';
      q.opts.forEach(function (o) {
        var on = sel.indexOf(o.val) > -1;
        h += '<button class="rm-multi-opt' + (on ? ' selected' : '') + '" data-val="' + o.val + '">';
        h += '<span class="rm-multi-check"></span><span class="rm-multi-label">' + o.label + '</span></button>';
      });
      h += '</div>';
      h += '<div class="rm-multi-nav">';
      h += S.step > 0 ? '<button class="rm-back-btn">← Back</button>' : '<span></span>';
      h += '<div style="display:flex;align-items:center;gap:16px;">';
      if (q.optional) h += '<button class="rm-skip-btn" id="rm-skip">Skip</button>';
      h += '<button class="rm-continue-btn on" id="rm-cont">Continue →</button>';
      h += '</div></div>';

    } else if (q.type === 'contact') {
      var nm = S.answers._name  || '';
      var em = S.answers._email || '';
      var rl = S.answers._role  || '';
      h += '<div class="rm-contact-fields">';
      h += '<div><div class="rm-contact-label">Your name</div><input class="rm-text-input" id="rm-cn" type="text" value="' + esc(nm) + '" placeholder="First Last"></div>';
      h += '<div><div class="rm-contact-label">Your email</div><input class="rm-text-input" id="rm-ce" type="email" value="' + esc(em) + '" placeholder="name@muhc.mcgill.ca"></div>';
      h += '<div><div class="rm-contact-label">Your role</div><div class="rm-role-opts">';
      ['PI / Qualified Investigator', 'Clinical Research Coordinator', 'Research staff', 'Other'].forEach(function (r) {
        h += '<button class="rm-role-opt' + (rl === r ? ' selected' : '') + '" data-role="' + esc(r) + '">' + r + '</button>';
      });
      h += '</div></div></div>';
      h += '<div class="rm-nav">';
      h += '<button class="rm-back-btn">← Back</button>';
      var ready = nm.trim() && em.trim() && rl;
      h += '<button class="rm-submit-btn" id="rm-sub"' + (ready ? '' : ' disabled') + '>Generate my roadmap →</button>';
      h += '</div>';
    }

    var wrap = document.createElement('div');
    wrap.className = 'rm-screen';
    wrap.innerHTML = h;
    var r = root();
    r.innerHTML = '';
    r.appendChild(wrap);

    /* Bind events */
    if (q.type === 'single') {
      wrap.querySelectorAll('.rm-opt').forEach(function (btn) {
        btn.addEventListener('click', function () {
          S.answers[q.key] = btn.dataset.val;
          var nv = visibleQs();
          QS.forEach(function (qq) { if (!nv.some(function (v) { return v.key === qq.key; })) delete S.answers[qq.key]; });
          renderScreening();
        });
      });
      bindContinue(wrap, function () { if (S.answers[q.key]) advance(); });
      bindBack(wrap);
    }

    if (q.type === 'text') {
      var ti = wrap.querySelector('#rm-ti');
      var cb = wrap.querySelector('.rm-continue-btn');
      if (ti && cb) {
        if (!q.optional) {
          ti.addEventListener('input', function () {
            var ok = ti.value.trim().length > 0;
            cb.classList.toggle('on', ok);
            cb.style.pointerEvents = ok ? 'auto' : 'none';
          });
        }
        ti.addEventListener('keydown', function (e) {
          if (e.key === 'Enter' && (q.optional || ti.value.trim())) { S.answers[q.key] = ti.value.trim(); advance(); }
        });
        cb.addEventListener('click', function () { S.answers[q.key] = ti ? ti.value.trim() : ''; advance(); });
        setTimeout(function () { ti.focus(); }, 40);
      }
      bindBack(wrap);
    }

    if (q.type === 'multi') {
      if (!Array.isArray(S.answers[q.key])) S.answers[q.key] = [];
      wrap.querySelectorAll('.rm-multi-opt').forEach(function (btn) {
        btn.addEventListener('click', function () {
          var arr = S.answers[q.key];
          var idx = arr.indexOf(btn.dataset.val);
          if (idx > -1) arr.splice(idx, 1); else arr.push(btn.dataset.val);
          renderScreening();
        });
      });
      var contBtn = wrap.querySelector('#rm-cont');
      if (contBtn) contBtn.addEventListener('click', advance);
      var skipBtn = wrap.querySelector('#rm-skip');
      if (skipBtn) skipBtn.addEventListener('click', function () { S.answers[q.key] = []; advance(); });
      bindBack(wrap);
    }

    if (q.type === 'contact') {
      var cn  = wrap.querySelector('#rm-cn');
      var ce  = wrap.querySelector('#rm-ce');
      var sub = wrap.querySelector('#rm-sub');

      function checkReady() {
        sub.disabled = !(cn.value.trim() && ce.value.trim() && S.answers._role);
      }
      cn.addEventListener('input',  function () { S.answers._name  = cn.value.trim(); checkReady(); });
      ce.addEventListener('input',  function () { S.answers._email = ce.value.trim(); checkReady(); });

      wrap.querySelectorAll('.rm-role-opt').forEach(function (btn) {
        btn.addEventListener('click', function () {
          S.answers._role = btn.dataset.role;
          wrap.querySelectorAll('.rm-role-opt').forEach(function (b) { b.classList.remove('selected'); });
          btn.classList.add('selected');
          checkReady();
        });
      });

      if (sub) {
        sub.addEventListener('click', function () {
          if (sub.disabled) return;
          S.answers._name  = cn.value.trim();
          S.answers._email = ce.value.trim();
          S.profile   = classify(S.answers);
          S.phaseOpen = defaultOpen();
          sendEmail();
          renderRoadmap();
        });
      }
      bindBack(wrap);
      setTimeout(function () { if (cn && !cn.value) cn.focus(); }, 40);
    }
  }

  function renderSingleOpts(q) {
    var h = '<div class="rm-options">';
    q.opts.forEach(function (o) {
      var sel = S.answers[q.key] === o.val;
      h += '<button class="rm-opt' + (sel ? ' selected' : '') + '" data-val="' + o.val + '">';
      h += '<span class="rm-opt-label">' + o.label + '</span>';
      if (o.hint) h += '<span class="rm-opt-hint">' + o.hint + '</span>';
      h += '</button>';
    });
    return h + '</div>';
  }

  function renderNav(canContinue, label) {
    var h = '<div class="rm-nav">';
    h += S.step > 0 ? '<button class="rm-back-btn">← Back</button>' : '<span></span>';
    h += '<button class="rm-continue-btn' + (canContinue ? ' on' : '') + '">' + label + '</button>';
    return h + '</div>';
  }

  function bindContinue(wrap, fn) {
    var b = wrap.querySelector('.rm-continue-btn');
    if (b) b.addEventListener('click', fn);
  }

  function bindBack(wrap) {
    var b = wrap.querySelector('.rm-back-btn');
    if (b) b.addEventListener('click', function () { if (S.step > 0) { S.step--; renderScreening(); } });
  }

  function advance() {
    var vis = visibleQs();
    if (S.step < vis.length - 1) { S.step++; renderScreening(); }
  }

  function esc(s) {
    return String(s || '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
  }

  /* ── Email — auto-send, fire and forget ──────────────────────────────── */
  function sendEmail() {
    var a = S.answers, p = S.profile, flags = getFlags(p);
    var submitterEmail = a._email || '';
    var title = a.studyTitle ? (' — ' + a.studyTitle) : '';
    var subject = '[RI-MUHC Roadmap] New study submission' + title;
    loadEmailJS(function () {
      window.emailjs.init({ publicKey: EMAILJS_KEY });
      /* Notify facilitator */
      window.emailjs.send(EMAILJS_SVC, EMAILJS_TPL, {
        to_email:     'matthew.fiorentino@muhc.mcgill.ca',
        subject:      subject,
        message_html: buildEmailBody(a, p, flags)
      });
      /* Confirmation copy to submitter */
      if (submitterEmail) {
        window.emailjs.send(EMAILJS_SVC, EMAILJS_TPL, {
          to_email:     submitterEmail,
          subject:      'Your study roadmap has been received — RI-MUHC',
          message_html: buildConfirmBody(a, p)
        });
      }
    });
  }

  function buildConfirmBody(a, p) {
    var flags  = getFlags(p);
    var name   = a._name ? a._name.split(' ')[0] : 'there';
    var title  = a.studyTitle || 'your study';
    var stageMap = { idea: 'Early idea / concept', design: 'Protocol design and planning', submission: 'Submission', conduct: 'In conduct', closeout: 'Close-out' };
    var typeMap  = { interventional: 'Interventional', 'observational-prospective': 'Prospective Observational', retrospective: 'Retrospective / Secondary' };
    var intMap   = { drug: 'Drug / Biologic', device: 'Medical Device', nhp: 'Natural Health Product (NHP)', low: 'Low-risk behavioural / procedural' };
    var sponMap  = { industry: 'Industry-sponsored', si: 'Sponsor-Investigator', grant: 'Grant-funded / Academic' };
    var popMap   = { minors: 'Minors', incapable: 'Incapable adults', both: 'Minors and incapable adults', none: 'Standard adult population' };
    var sitMap   = { single: 'Single site (MUHC)', 'multi-lead': 'Multicentre — MUHC REB Lead', 'multi-part': 'Multicentre — MUHC participating', 'multi-cross': 'Multicentre — cross-provincial / international' };
    var expMap   = { first: 'First or second study of this type', some: '3–5 studies', extensive: 'Extensive — routine for this team' };
    var cimMap   = { yes: 'Yes — fully/primarily through CIM', partial: 'Partially — specific CIM services', no: 'No', unsure: 'Unsure' };
    var needMap  = { 'design-protocol': 'Protocol design or feasibility', regulatory: 'Regulatory submissions (Health Canada / Nagano)', training: 'Training and credentials', 'budget-contracts': 'Budget, contracts, or funding', 'team-setup': 'Hiring or team setup', data: 'Data management, REDCap, or privacy', 'cim-connect': 'Connect with CIM', 'conduct-support': 'Study conduct support', 'closeout-support': 'Close-out or amendments' };

    var rows = [
      ['Study title',    esc(title)],
      ['Stage',          stageMap[a.stage] || a.stage],
      ['Training level', 'Level ' + p.level],
      ['Study type',     typeMap[a.type] || a.type],
      a.intType     ? ['Product type',         intMap[a.intType] || a.intType] : null,
      ['Sponsorship',    sponMap[a.sponsorship] || a.sponsorship],
      ['Identifiable PHI', a.phi === 'yes' ? 'Yes' : a.phi === 'unsure' ? 'Unsure' : 'No'],
      (a.phi === 'yes' || a.phi === 'unsure') ? ['Cross-border data', a.crossBorder === 'yes' ? 'Yes — ÉFVP required' : 'No'] : null,
      ['Vulnerable populations', popMap[a.population] || a.population],
      ['Sites',          sitMap[a.sites] || a.sites],
      a.cim         ? ['CIM involvement',  cimMap[a.cim]] : null,
      a.experience  ? ['Team experience',  expMap[a.experience]] : null,
      a.naganoNum   ? ['Nagano number',    esc(a.naganoNum)] : null
    ].filter(Boolean);

    var needs = Array.isArray(a.supportNeeds) ? a.supportNeeds : [];

    var h = '<div style="font-family:Arial,sans-serif;max-width:600px">';
    h += '<div style="background:#2b9ce2;padding:24px 28px;border-radius:8px 8px 0 0">';
    h += '<h2 style="color:#fff;margin:0;font-size:18px">Study Profile Received</h2>';
    h += '<p style="color:rgba(255,255,255,.8);margin:6px 0 0;font-size:13px">RI-MUHC Clinical Research Hub</p></div>';
    h += '<div style="padding:24px 28px;background:#fff;border:1px solid #e5e5e5;border-top:none;border-radius:0 0 8px 8px">';
    h += '<p style="margin:0 0 20px;font-size:14px;color:#111">Hi ' + esc(name) + ', your study profile has been sent to the Research Facilitator, who will be in touch within 5 business days. Here is what we received:</p>';
    h += '<table style="width:100%;border-collapse:collapse;margin-bottom:20px">';
    rows.forEach(function (r) {
      h += '<tr><td style="padding:7px 16px 7px 0;color:#888;font-weight:600;white-space:nowrap;vertical-align:top;font-size:13px">' + r[0] + '</td>';
      h += '<td style="padding:7px 0;color:#111;font-size:14px">' + r[1] + '</td></tr>';
    });
    h += '</table>';
    if (needs.length) {
      h += '<div style="border-top:1px solid #f0f0f0;padding-top:16px;margin-bottom:16px">';
      h += '<p style="font-size:11px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:#999;margin:0 0 8px">Support needed</p>';
      h += '<ul style="margin:0;padding-left:18px;font-size:13.5px;color:#333">';
      needs.forEach(function (n) { h += '<li style="margin-bottom:4px">' + (needMap[n] || n) + '</li>'; });
      h += '</ul></div>';
    }
    if (flags.length) {
      h += '<div style="border-top:1px solid #f0f0f0;padding-top:16px">';
      h += '<p style="font-size:11px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:#999;margin:0 0 10px">Regulatory flags</p>';
      h += '<ul style="margin:0;padding-left:18px;font-size:13.5px;color:#333">';
      flags.forEach(function (f) { h += '<li style="margin-bottom:8px"><strong style="color:#111">' + f.title + '</strong><br>' + f.detail + '</li>'; });
      h += '</ul></div>';
    }
    h += '</div></div>';
    return h;
  }

  function loadEmailJS(cb) {
    if (window.emailjs) { cb(); return; }
    var s = document.createElement('script');
    s.src = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js';
    s.onload = cb;
    document.head.appendChild(s);
  }

  function buildEmailBody(a, p, flags) {
    var stageMap = { idea: 'Early idea / concept', design: 'Protocol design and planning', submission: 'Submission', conduct: 'In conduct', closeout: 'Close-out' };
    var typeMap  = { interventional: 'Interventional', 'observational-prospective': 'Prospective Observational', retrospective: 'Retrospective / Secondary' };
    var intMap   = { drug: 'Drug / Biologic', device: 'Medical Device', nhp: 'Natural Health Product (NHP)', low: 'Low-risk behavioural / procedural' };
    var sponMap  = { industry: 'Industry-sponsored', si: 'Sponsor-Investigator', grant: 'Grant-funded / Academic' };
    var popMap   = { minors: 'Minors', incapable: 'Incapable adults', both: 'Minors and incapable adults', none: 'Standard adult population' };
    var sitMap   = { single: 'Single site (MUHC)', 'multi-lead': 'Multicentre — MUHC REB Lead', 'multi-part': 'Multicentre — MUHC participating', 'multi-cross': 'Multicentre — cross-provincial / international' };
    var expMap   = { first: 'First or second study of this type', some: '3–5 studies', extensive: 'Extensive — routine for this team' };
    var pathMap  = { 'intro-call': 'Intro call — too early to classify; make first contact', 'warm-handoff': 'Warm handoff — Facilitator-led setup recommended', consult: '30-min consult — walk through resources, check credentials', 'self-serve': 'Self-serve — experienced team, lower risk' };
    var cimMap   = { yes: 'Yes — fully/primarily through CIM', partial: 'Partially — specific CIM services', no: 'No', unsure: 'Unsure' };
    var needMap  = { 'design-protocol': 'Protocol design or feasibility', regulatory: 'Regulatory submissions (Health Canada / Nagano)', training: 'Training and credentials', 'budget-contracts': 'Budget, contracts, or funding', 'team-setup': 'Hiring or team setup', data: 'Data management, REDCap, or privacy', 'cim-connect': 'Connect with CIM', 'conduct-support': 'Study conduct support', 'closeout-support': 'Close-out or amendments' };

    var rows = [
      ['Submitted by',   (a._name || '') + ' &lt;' + (a._email || '') + '&gt;' + (a._role ? ' · ' + a._role : '')],
      ['Study title',    a.studyTitle || '—'],
      ['Stage',          stageMap[a.stage] || a.stage],
      ['Training Level', 'Level ' + p.level],
      ['Study type',     typeMap[a.type] || a.type],
      a.intType     ? ['Product type',          intMap[a.intType] || a.intType] : null,
      ['Sponsorship',    sponMap[a.sponsorship] || a.sponsorship],
      ['Identifiable PHI', a.phi === 'yes' ? 'Yes' : a.phi === 'unsure' ? 'Unsure' : 'No'],
      (a.phi === 'yes' || a.phi === 'unsure') ? ['Cross-border data', a.crossBorder === 'yes' ? 'Yes — ÉFVP required' : 'No'] : null,
      ['Vulnerable populations', popMap[a.population] || a.population],
      ['Sites',          sitMap[a.sites] || a.sites],
      a.cim         ? ['CIM involvement',  cimMap[a.cim]] : null,
      a.experience  ? ['Team experience',  expMap[a.experience]] : null,
      a.naganoNum   ? ['Nagano number',    a.naganoNum] : null,
      ['Recommended approach', pathMap[p.pathway] || p.pathway]
    ].filter(Boolean);

    var needs = Array.isArray(a.supportNeeds) ? a.supportNeeds : [];

    var h = '<div style="font-family:Arial,sans-serif;max-width:600px">';
    h += '<div style="background:#2b9ce2;padding:24px 28px;border-radius:8px 8px 0 0">';
    h += '<h2 style="color:#fff;margin:0;font-size:18px">My Study Roadmap — New Submission</h2>';
    h += '<p style="color:rgba(255,255,255,.8);margin:6px 0 0;font-size:13px">RI-MUHC Clinical Research Hub</p></div>';
    h += '<div style="padding:24px 28px;background:#fff;border:1px solid #e5e5e5;border-top:none;border-radius:0 0 8px 8px">';
    h += '<table style="width:100%;border-collapse:collapse;margin-bottom:20px">';
    rows.forEach(function (r) {
      h += '<tr><td style="padding:7px 16px 7px 0;color:#888;font-weight:600;white-space:nowrap;vertical-align:top;font-size:13px">' + r[0] + '</td>';
      h += '<td style="padding:7px 0;color:#111;font-size:14px">' + r[1] + '</td></tr>';
    });
    h += '</table>';

    if (needs.length) {
      h += '<div style="border-top:1px solid #f0f0f0;padding-top:16px;margin-bottom:16px">';
      h += '<p style="font-size:11px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:#999;margin:0 0 8px">What they need</p>';
      h += '<ul style="margin:0;padding-left:18px;font-size:13.5px;color:#333">';
      needs.forEach(function (n) { h += '<li style="margin-bottom:4px">' + (needMap[n] || n) + '</li>'; });
      h += '</ul></div>';
    }

    if (flags.length) {
      h += '<div style="border-top:1px solid #f0f0f0;padding-top:16px">';
      h += '<p style="font-size:11px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:#999;margin:0 0 10px">Regulatory flags</p>';
      h += '<ul style="margin:0;padding-left:18px;font-size:13.5px;color:#333">';
      flags.forEach(function (f) { h += '<li style="margin-bottom:8px"><strong style="color:#111">' + f.title + '</strong><br>' + f.detail + '</li>'; });
      h += '</ul></div>';
    }

    h += '</div></div>';
    return h;
  }

  /* ── Roadmap ──────────────────────────────────────────────────────────── */
  function renderRoadmap() {
    var p      = S.profile;
    var flags  = getFlags(p);
    var phases = buildRoadmap(p);
    var chips  = profileChips(p, S.answers);

    var h = '';

    h += '<div class="rm-sent-chip"><div class="rm-sent-dot"></div>Your study profile has been sent to the Research Facilitator. A confirmation has been sent to ' + esc(S.answers._email || 'your email') + ' — expect a follow-up within 5 business days.</div>';

    h += '<div class="rm-profile-bar">';
    h += '<div class="rm-profile-meta">';
    h += '<div class="rm-profile-eyebrow">Your study profile</div>';
    h += '<div class="rm-chips">';
    chips.forEach(function (c) { h += '<span class="rm-chip' + (c.cls ? ' ' + c.cls : '') + '">' + c.text + '</span>'; });
    h += '</div></div>';
    h += '<div class="rm-profile-actions"><button class="rm-print-btn" id="rm-print">Print</button><button class="rm-edit-btn" id="rm-edit">Edit answers</button></div>';
    h += '</div>';

    if (flags.length) {
      h += '<div class="rm-flags">';
      flags.forEach(function (f) {
        h += '<div class="rm-flag ' + f.tone + '"><div class="rm-flag-dot"></div><div class="rm-flag-inner">';
        h += '<span class="rm-flag-title">' + f.title + '</span>';
        h += '<span class="rm-flag-detail">' + f.detail;
        if (f.href) h += ' <a href="' + f.href + '">Learn more →</a>';
        h += '</span></div></div>';
      });
      h += '</div>';
    }

    h += '<div class="rm-roadmap">';
    phases.forEach(function (phase) {
      var open  = !!S.phaseOpen[phase.id];
      var done  = phase.items.filter(function (i) { return !!S.checks[i.key]; }).length;
      var total = phase.items.length;
      h += '<div class="rm-phase' + (open ? ' open' : '') + '" id="rmp-' + phase.id + '">';
      h += '<div class="rm-phase-hdr">';
      h += '<div class="rm-phase-left"><span class="rm-phase-num">' + phase.num + '</span><span class="rm-phase-title">' + phase.title + '</span></div>';
      h += '<div class="rm-phase-right"><span class="rm-phase-count' + (done > 0 ? ' has-done' : '') + '">' + done + ' / ' + total + '</span><span class="rm-chevron">▶</span></div>';
      h += '</div>';
      h += '<div class="rm-phase-body">';
      if (phase.intro) h += phase.intro;
      phase.items.forEach(function (item) {
        var checked = !!S.checks[item.key];
        h += '<div class="rm-item' + (checked ? ' done' : '') + '" id="rmi-' + item.key + '">';
        h += '<div class="rm-checkbox' + (checked ? ' done' : '') + '" data-key="' + item.key + '"></div>';
        h += '<div class="rm-item-body"><div class="rm-item-text">' + item.text + '</div>';
        if (item.link) h += '<a class="rm-item-link" href="' + item.link.href + '">' + item.link.label + '</a>';
        h += '</div></div>';
      });
      h += '</div></div>';
    });
    h += '</div>';

    var r = root();
    r.innerHTML = h;

    r.querySelectorAll('.rm-phase-hdr').forEach(function (hdr) {
      hdr.addEventListener('click', function () {
        var ph = hdr.closest('.rm-phase');
        var id = ph.id.replace('rmp-', '');
        S.phaseOpen[id] = !S.phaseOpen[id];
        ph.classList.toggle('open', !!S.phaseOpen[id]);
      });
    });

    r.querySelectorAll('.rm-checkbox').forEach(function (chk) {
      chk.addEventListener('click', function (e) {
        e.stopPropagation();
        var key = chk.dataset.key;
        S.checks[key] = !S.checks[key];
        var itemEl = document.getElementById('rmi-' + key);
        if (itemEl) { itemEl.classList.toggle('done', !!S.checks[key]); chk.classList.toggle('done', !!S.checks[key]); }
        var phEl = chk.closest('.rm-phase');
        if (phEl) {
          var doneN = phEl.querySelectorAll('.rm-checkbox.done').length;
          var totN  = phEl.querySelectorAll('.rm-checkbox').length;
          var ct    = phEl.querySelector('.rm-phase-count');
          if (ct) { ct.textContent = doneN + ' / ' + totN; ct.classList.toggle('has-done', doneN > 0); }
        }
      });
    });

    var pb = document.getElementById('rm-print');
    if (pb) pb.addEventListener('click', function () { window.print(); });

    var eb = document.getElementById('rm-edit');
    if (eb) eb.addEventListener('click', function () { reset(); renderScreening(); });
  }

  /* ── Init & SPA ───────────────────────────────────────────────────────── */
  function init() { reset(); renderScreening(); }

  var _lastUrl = location.href;
  new MutationObserver(function () {
    if (location.href !== _lastUrl) { _lastUrl = location.href; setTimeout(function () { tryMount(20); }, 120); }
  }).observe(document.body, { childList: true, subtree: true });

  function tryMount(n) {
    if (document.getElementById('rm-root')) { init(); return; }
    if (n > 0) setTimeout(function () { tryMount(n - 1); }, 100);
  }

  tryMount(20);
})();
