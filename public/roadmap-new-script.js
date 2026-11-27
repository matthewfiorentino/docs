/**
 * My Study Roadmap (new) — RI-MUHC Clinical Research Hub. Mock-up, batch b482 (Nov. 26, 2026);
 * voice pass and three fixes, batch b483 (Nov. 26, 2026); the logic review's fixes, batch b485 (Nov. 26, 2026).
 *
 * What it does: asks a few questions about what the study will do, names the type of study,
 * and shows the steps of the reader's current stage, each one line and a link to the Hub page
 * that holds its rule. It sends nothing and stores nothing: no network call, no browser storage.
 *
 * Safe on every page: it does nothing unless an element with id "rmn-root" is on the page.
 * It uses only the names rmn- (ids, classes, CSS) and window.__rmnInit / window.__rmnLogic.
 *
 * Layout of this file:
 *   1. DATA: contacts, types of study, stages, questions, steps. Read it like a list.
 *   2. LOGIC: which questions show, which steps apply, the summary text.
 *   3. PAGE: screens, buttons, focus, print.
 *   4. MOUNT: start only where #rmn-root exists.
 *
 * How a step's "on" condition reads: "sponsor: si" means the step shows when the answer to the
 * sponsor question is "si". Several values after the colon mean any of them. Several entries
 * mean all of them. When the answer is "Not sure", the step still shows, as its "ifText"
 * sentence, with who can settle it ("who"). A value written "!x" means the answer does not hold x.
 * "on" can also be a map by type of study, like "stage". "sureOnly" means the step shows only when its
 * answers are settled: a "Not sure" answer is covered by another step's "If" line.
 * "paths" lists the types of study the step belongs to:
 *   L1 drug, L2D device, L2S surgery, L3 natural health product,
 *   L4i prospective with an intervention, L4o prospective without one, L5 retrospective,
 *   ANY type not settled ("Not sure" to the first question).
 * "stage" is plan, submit, ready, recruit, run or close; a map gives a different stage by type.
 * "early" is the reason, in the home's words, that a later-stage step must be planned now.
 */
(function () {
  'use strict';

  /* ======================================================================
     1. DATA
     ====================================================================== */

  var CONTACTS = {
    rf:   { name: 'the Research Facilitator', email: 'research.facilitator@muhc.mcgill.ca' },
    efvp: { name: 'the MUHC’s Directorate of Innovation, Performance and Quality', email: 'efvp@muhc.mcgill.ca' },
    itd:  { name: 'Health Canada’s Investigational Testing division', email: 'it-ee@hc-sc.gc.ca' },
    qa:   { name: 'Quality Assurance', email: 'QAClinicalResearch@muhc.mcgill.ca' },
    cim:  { name: 'the Centre for Innovative Medicine (CIM)', email: 'clinical.research@muhc.mcgill.ca' },
    reb:  { name: 'the REB', email: 'reb@muhc.mcgill.ca' }
  };

  /* The five types of study, as Types of Study names them. */
  var TYPES = {
    L1:  { name: 'a drug study', level: 'Level I', path: '/paths/level-i', pathTitle: 'Drug Studies',
           reason: 'A study that tests a drug is at Level I, whatever else it tests.' },
    L2D: { name: 'a medical device study', level: 'Level II', path: '/paths/level-ii', pathTitle: 'Medical Device and Surgery Studies',
           reason: 'A study that tests a medical device, including software as a medical device, is at Level II.' },
    L2S: { name: 'a surgery study', level: 'Level II', path: '/paths/level-ii', pathTitle: 'Medical Device and Surgery Studies',
           reason: 'A study that tests a surgical procedure is at Level II.' },
    L3:  { name: 'a natural health product study', level: 'Level III', path: '/paths/level-iii', pathTitle: 'Natural Health Product Studies',
           reason: 'A study that tests a natural health product is at Level III.' },
    L4i: { name: 'a prospective study not regulated by Health Canada', level: 'Level IV', path: '/paths/level-iv', pathTitle: 'Prospective Studies Not Regulated by Health Canada',
           reason: 'The study assigns participants to an intervention that Health Canada does not regulate and that involves no surgery. An interventional study is also a clinical trial.',
           reasonSI: 'For a study that Health Canada does not regulate, the RI-MUHC’s standard operating procedures (SOPs) call the principal investigator of an investigator-initiated study its sponsor-investigator.' },
    L4o: { name: 'a prospective study not regulated by Health Canada', level: 'Level IV', path: '/paths/level-iv', pathTitle: 'Prospective Studies Not Regulated by Health Canada',
           reason: 'The study follows participants from the time they are identified, for outcomes or events that happen afterwards.',
           reasonSI: 'For a study that Health Canada does not regulate, the RI-MUHC’s standard operating procedures (SOPs) call the principal investigator of an investigator-initiated study its sponsor-investigator.' },
    L5:  { name: 'a retrospective study', level: 'Level V', path: '/paths/retrospective', pathTitle: 'Retrospective and Secondary-Data Research',
           reason: 'A study that uses only data that already exist, or only samples already held in a biobank, is at Level V.' },
    ANY: { name: null, level: null, path: '/paths', pathTitle: 'Types of Study',
           reason: 'The type of study decides whether Health Canada must authorize it, which SOPs apply and what training its team needs.' }
  };

  /* The six stages, each a heading and one line. Each type's stage links its path's section. */
  var STAGES = [
    { id: 'plan',    title: 'Plan',
      line: 'Check that the site can carry out the study, then get the protocol, the budget and the consent form ready.',
      lineL5: 'Decide which data or samples the study needs, how identifiable they are and whether the study needs consent.' },
    { id: 'submit',  title: 'Submit and wait for approval',
      line: 'Submit the study in Nagano. The study can begin only with REB approval and MUHC Authorization.' },
    { id: 'ready',   title: 'Get the site ready', titleL5: 'Obtain and protect the data',
      line: 'Between MUHC Authorization and the first participant, the site is made ready to run the study.',
      lineL5: 'Once the study is authorized, the team gets access to the data or samples and protects them until they are archived.' },
    { id: 'recruit', title: 'Recruit and consent', noL5: true,
      line: 'Recruitment follows set rules, and consent is a process, not only a signature.' },
    { id: 'run',     title: 'Run the study',
      line: 'Visits take place, data are collected and entered, and adverse events are assessed and reported.',
      lineL4o: 'Visits take place and data are collected and entered. Changes to the study need the REB’s approval first.',
      lineL5: 'The team works with the data, and any change to the study needs the REB’s approval first.' },
    { id: 'close',   title: 'Close and archive',
      line: 'A study doesn’t end with the last participant’s visit. It is closed in Nagano and its records are kept for the required period.',
      lineL5: 'When the study ends, it is closed in Nagano and its documents and data are archived for the required period.' }
  ];

  /* Where each stage starts on each path (its heading's anchor). */
  var STAGE_ANCHORS = {
    L1:  { plan: '#place-the-study', submit: '#submit-the-study-in-nagano', ready: '#activate-the-site', recruit: '#recruit-consent-and-enrol-participants', run: '#run-the-trial', close: '#close-the-trial' },
    L2D: { plan: '#place-the-study', submit: '#submit-the-study-in-nagano', ready: '#activate-the-site', recruit: '#recruit-consent-and-enrol-participants', run: '#run-the-study', close: '#close-the-study' },
    L3:  { plan: '#place-the-study', submit: '#submit-the-study-in-nagano', ready: '#activate-the-site', recruit: '#recruit-consent-and-enrol-participants', run: '#run-the-trial', close: '#close-the-trial' },
    L4i: { plan: '#confirm-that-the-project-is-research', submit: '#submit-the-study-in-nagano', ready: '#get-the-site-ready', recruit: '#recruit-consent-and-enrol-participants', run: '#run-the-study', close: '#close-the-study-and-archive-the-records' },
    L5:  { plan: '#confirm-that-the-project-is-research', submit: '#submit-the-study-in-nagano', ready: '#obtain-and-protect-the-data', run: '#keep-reb-approval-current', close: '#close-the-study' }
  };
  STAGE_ANCHORS.L2S = STAGE_ANCHORS.L2D;
  STAGE_ANCHORS.L4o = STAGE_ANCHORS.L4i;

  /* The questions, one per screen, in order. "show" lists the types of study that see it. */
  var QUESTIONS = [
    { id: 'q1', key: 'q1', brief: 'What the study gives participants', type: 'single', show: 'all',
      title: 'What will participants take, use or have done because of the study?',
      hint: 'If the study tests more than one of these, such as a drug and a device, choose the first one in the list.',
      options: [
        { v: 'drug', short: 'A medication or a vaccine',    label: 'Take or be given a medication or a vaccine', ex: 'Including a biologic, a gene or cell therapy, a blood product or a radiopharmaceutical.' },
        { v: 'device', short: 'A medical device or software',  label: 'Use a medical device, or an app or software meant to diagnose or treat', ex: 'An app or an algorithm intended to diagnose or treat a disease can be a medical device.' },
        { v: 'surgery', short: 'Surgery', label: 'Have surgery', ex: 'Such as a modified surgical technique tested in a randomized controlled trial.' },
        { v: 'nhp', short: 'A natural health product',     label: 'Take a vitamin, a herbal remedy or another natural health product', ex: 'Such as a mineral, a homeopathic preparation or a probiotic.' },
        { v: 'change', short: 'Another intervention',  label: 'Have a change in their care, diet, exercise or therapy that is none of these', ex: 'Such as psychotherapy, physiotherapy, an exercise program or massage.' },
        { v: 'follow', short: 'No intervention (the study follows them)',  label: 'No intervention. The study follows them over time, or collects new information or samples from them', ex: 'Participants may receive treatments as part of their care, but the study doesn’t assign them to one.' },
        { v: 'survey', short: 'No intervention (interviews or surveys about past events)', label: 'No intervention. The study only interviews or surveys people about past events' },
        { v: 'records', short: 'No intervention (existing records, data or samples)', label: 'No intervention. The study only uses records, data or samples that already exist', ex: 'Such as a chart review or a study of samples already held in a biobank.' },
        { v: 'unsure', short: 'Not sure',  label: 'Not sure' }
      ],
      why: 'What a study tests decides whether Health Canada must authorize it, which of the RI-MUHC’s standard operating procedures (SOPs) apply and what training its team needs.',
      mixups: [
        { text: 'A trial of a natural health product is still a clinical trial that Health Canada regulates, even when the product already holds a product licence.', link: '/paths#find-out-what-kind-of-study-yours-is' },
        { text: 'A study that tests a drug as well as a device or a procedure is a drug study.', link: '/paths#find-out-what-kind-of-study-yours-is' }
      ] },

    { id: 'q2drug', key: 'hc', brief: 'The drug', type: 'single', show: 'L1',
      title: 'Which describes the drug the trial uses?',
      options: [
        { v: 'within', short: 'A marketed drug, within its approval',  label: 'A drug marketed in Canada, used within the conditions of its approval' },
        { v: 'outside', short: 'Not marketed, or outside its approval', label: 'A drug not marketed in Canada, or a marketed drug used outside the conditions of its approval' },
        { v: 'radio', short: 'A positron-emitting radiopharmaceutical',   label: 'A positron-emitting radiopharmaceutical, in a basic clinical research study' },
        { v: 'unsure', short: 'Not sure',  label: 'Not sure' }
      ],
      why: 'A drug trial needs Health Canada’s authorization unless it uses a marketed drug within the conditions of its approval. The Personne mandatée waits for that authorization before issuing MUHC Authorization.' },

    { id: 'q2nhp', key: 'hc', brief: 'The product', type: 'single', show: 'L3',
      title: 'Will the trial use the product exactly as its label approved by Health Canada describes?',
      options: [
        { v: 'label', short: 'As its approved label describes',   label: 'Yes, exactly as its approved label describes' },
        { v: 'outside', short: 'Not as its label describes', label: 'No, or the product has no product licence' },
        { v: 'unsure', short: 'Not sure',  label: 'Not sure' }
      ],
      why: 'A natural health product trial needs Health Canada’s authorization unless it uses the product as its approved label describes. The Personne mandatée waits for that authorization before issuing MUHC Authorization.' },

    { id: 'q2device', key: 'hc', brief: 'The device', type: 'single', show: 'L2D',
      title: 'Which describes the device the study tests?',
      options: [
        { v: 'class1', short: 'Class I',     label: 'A Class I device, the lowest-risk class' },
        { v: 'licensed', short: 'Licensed, within its indications',   label: 'A Class II, III or IV device licensed in Canada, used within its licensed indications' },
        { v: 'offlabel', short: 'Licensed, outside its indications',   label: 'A Class II, III or IV device licensed in Canada, used outside its licensed indications' },
        { v: 'unlicensed', short: 'Class II to IV, not licensed', label: 'A Class II, III or IV device that is not licensed in Canada' },
        { v: 'unsure', short: 'Not sure',     label: 'Not sure' }
      ],
      why: 'Whether a device study needs Health Canada’s authorization depends on the device’s class and licence and on the study. Health Canada’s authorization for a device study is an investigational testing authorization (ITA).',
      mixups: [
        { text: 'Health Canada counts a device that the manufacturer provides to the investigator free of charge as sold.', link: '/paths/level-ii#check-whether-a-device-study-needs-an-ita' }
      ] },

    { id: 'q3', key: 'sponsor', brief: 'Sponsor', type: 'single', show: 'L1 L2D L2S L3 L4i L4o',
      title: 'Who sponsors the study?',
      options: [
        { v: 'industry', short: 'A company (industry-sponsored)', label: 'A company (industry-sponsored)', ex: 'Including a study that a contract research organization runs for the company.' },
        { v: 'si', short: 'Me or my supervisor, as the sponsor-investigator', label: 'You or your supervisor, as the sponsor-investigator' },
        { v: 'other', short: 'Another university, hospital or research group', label: 'Another university, hospital or research group, with the MUHC as one of its sites' },
        { v: 'unsure', short: 'Not sure',   label: 'Not sure' }
      ],
      why: 'Who sponsors the study changes some of its steps.',
      mixups: [
        { text: 'A grant-funded trial still has a sponsor. An investigator who both initiates and conducts a clinical trial is its sponsor-investigator, whoever funds it.', link: '/paths#who-sponsors-the-study' }
      ] },

    { id: 'q4', key: 'people', brief: 'Under 18 or unable to consent', type: 'multi', show: 'all',
      title: 'Could the study include anyone under 18, or adults who can’t consent for themselves?',
      titleL5: 'Could the study use the information or samples of anyone under 18, or of adults who can’t consent for themselves?',
      hint: 'Choose every answer that applies.',
      options: [
        { v: 'minors', short: 'Under 18', label: 'People under 18' },
        { v: 'adults', short: 'Adults who can’t consent', label: 'Adults who can’t consent for themselves' },
        { v: 'none', short: 'Neither',   label: 'Neither', exclusive: true },
        { v: 'unsure', short: 'Not sure', label: 'Not sure', exclusive: true }
      ],
      why: 'Consent to research that could interfere with the integrity of a minor or of an adult who can’t consent follows Quebec’s Civil Code.',
      whyL5: 'The REB’s Pediatrics panel reviews all projects involving minors. Who consents depends on the participant’s age and whether they can consent.',
      mixups: [
        { text: 'Quebec’s Civil Code sets no age for assent.', link: '/kb/recruitment/pediatric-research', paths: 'L1 L2D L2S L3 L4i L4o ANY' }
      ] },

    { id: 'q5', key: 'sites', brief: 'Sites', type: 'multi', show: 'all',
      title: 'Besides the MUHC, where else will the study take place?',
      hint: 'Choose every answer that applies.',
      options: [
        { v: 'muhc', short: 'The MUHC only',    label: 'Nowhere else. The MUHC is the only site', exclusive: true },
        { v: 'qcmuhc', short: 'Other Quebec institutions, the MUHC REB reviewing',  label: 'Other public institutions in Quebec, with the MUHC REB reviewing the study for every site', clears: 'qcother' },
        { v: 'qcother', short: 'Other Quebec institutions, another REB reviewing', label: 'Other public institutions in Quebec, with another institution’s REB reviewing the study', clears: 'qcmuhc' },
        { v: 'outside', short: 'Outside Quebec', label: 'Sites in other provinces or countries' },
        { v: 'unsure', short: 'Not sure',  label: 'Not sure', exclusive: true }
      ],
      why: 'A study at more than one public institution in Quebec is reviewed by one REB for every site, and each institution authorizes it at its own site.',
      mixups: [
        { text: 'A study with one Quebec site and sites in other provinces or countries is not a multi-centric study in Quebec’s sense.', link: '/kb/design/multi-centric#know-which-sites-the-framework-does-not-cover' }
      ] },

    { id: 'q6', key: 'efvp', brief: 'Health information', type: 'multi', show: 'all',
      title: 'Will the study use people’s health information in any of these ways?',
      hint: 'An EFVP is a privacy impact assessment of how the study uses people’s health information. Choose every answer that applies.',
      groups: [
        { label: 'Uses that require an EFVP', options: [
          { v: 'prescreen', short: 'Records checked before consent (EFVP required)', label: 'Before people consent, someone will look in their health records to find or check eligible people', notFor: 'L5' },
          { v: 'noconsent', short: 'Identifiable information without consent (EFVP required)', label: 'The study will use identifiable health information without people’s consent', ex: 'Such as a chart review for which no one gives consent.' }
        ] },
        { label: 'Uses that may require an EFVP', options: [
          { v: 'leave', short: 'Information leaves Quebec (EFVP may be required)', label: 'Participants’ information will go outside Quebec, including to another province', ex: 'Such as to a sponsor’s servers, a central lab or a cloud platform. Anonymized data, which can no longer identify anyone, even indirectly, don’t need an EFVP.' },
          { v: 'tech', short: 'New technology for the information (EFVP may be required)',  label: 'The study will get, build or change technology to handle participants’ information', ex: 'Such as an app, a wearable device or a data capture system.' }
        ] }
      ],
      options: [
        { v: 'none', short: 'None',   label: 'None of these', exclusive: true },
        { v: 'unsure', short: 'Not sure', label: 'Not sure', exclusive: true }
      ],
      why: 'Where the study needs an EFVP, MUHC Authorization is given only once the EFVP is approved.',
      mixups: [
        { text: 'A chart review that never contacts anyone still needs an approved EFVP if it uses identifiable health information without consent.', link: '/paths#how-a-study-gets-its-data' },
        { text: 'Information leaving Quebec is the trigger teams most often miss. Another province counts.', link: '/kb/governance/privacy#know-when-an-efvp-is-needed' },
        { text: 'A quality improvement project that needs patients’ health information without their consent still requires an EFVP.', link: '/paths/retrospective#confirm-that-the-project-is-research', paths: 'L4i L4o L5 ANY' }
      ] },

    { id: 'q7', key: 'also', brief: 'The study also', type: 'multi', show: 'all',
      title: 'Does the study also do any of these?',
      hint: 'Choose every answer that applies.',
      options: [
        { v: 'private', short: 'Private funding',    paths: 'all', notWhen: 'sponsor: industry', label: 'Receive money from a company or another private body, a foundation or a not-for-profit organization included' },
        { v: 'indigenous', short: 'First Nations, Inuit or Métis', paths: 'all', label: 'Involve First Nations, Inuit or Métis participants, communities or data', exL5: 'Or use as a variable a catchment area that includes Eeyou Istchee (Quebec’s region 18), such as by postal code.' },
        { v: 'specimens', short: 'Specimens',  paths: 'L1 L2D L2S L3 L4i L4o', label: 'Collect specimens from participants' },
        { v: 'equipment', short: 'Measurement equipment',  paths: 'L2D L2S L4i L4o', label: 'Take measurements on participants with equipment', ex: 'Such as blood pressure cuffs, scales or an electrocardiogram (ECG) machine.' },
        { v: 'econsent', short: 'Electronic consent',   paths: 'L1 L2D L2S L3 L4i L4o ANY', label: 'Use electronic consent' },
        { v: 'nurse', short: 'A nurse dispenses',      paths: 'L1 L3', label: 'Have a nurse give the product directly to participants, instead of the pharmacy' },
        { v: 'devicedrug', short: 'An unlicensed device', paths: 'L1', label: 'Use a Class II, III or IV medical device that is not licensed in Canada' },
        { v: 'cihr', short: 'CIHR funding',       paths: 'L1 L2D L2S L3 L4i', label: 'Receive funding from the Canadian Institutes of Health Research (CIHR)' },
        { v: 'dw', short: 'The Data Warehouse',         paths: 'L5', label: 'Use data from the MUHC Data Warehouse' },
        { v: 'provincial', short: 'Provincial databases', paths: 'L5', label: 'Use Quebec’s provincial administrative databases, such as those of RAMQ or MED-ÉCHO' },
        { v: 'biobank', short: 'A biobank or an existing bank',    paths: 'L5', label: 'Use samples already held in a biobank, or a bank or registry that already exists' },
        { v: 'software', short: 'Software on the data',   paths: 'L5', label: 'Develop or validate software, such as an algorithm, on the data or samples' },
        { v: 'none', short: 'None',   paths: 'all', label: 'None of these', exclusive: true },
        { v: 'unsure', short: 'Not sure', paths: 'all', label: 'Not sure', exclusive: true }
      ],
      why: 'Some studies need extra steps, whatever their level.',
      mixups: [
        { text: 'Funding from a private foundation can make a study billable for the review and authorization fees.', link: '/kb/funding/budgets-contracts#budget-the-reb-and-authorization-fees' }
      ] },

    /* The CIM (b488; MF, ledger rows 422 and 423): readers may not know the CIM, or that they can't decide to use it later.
       Every answer is a row of cim/planning's "Check whether your study needs the CIM", in its own verb, so the stem fits each. */
    { id: 'qcim', key: 'cim', brief: 'The CIM', type: 'multi', show: 'L1 L2D L2S L3 L4i L4o ANY',
      title: 'Do any of these describe your study?',
      hint: 'A study like these may need the Centre for Innovative Medicine (CIM), the RI-MUHC’s clinical research facility. Choose every answer that applies.',
      options: [
        { v: 'phase1', short: 'A Phase I study', paths: 'L1 L2D ANY', label: 'It is a Phase I study of a drug or a medical device', ex: 'In oncology or not, software used to intervene in medical care included.' },
        { v: 'infusion', short: 'Intravenous drugs or infusions', paths: 'L1 ANY', label: 'Participants will receive intravenous drugs or infusions', ex: 'Such as chemotherapy, biotherapy or immunotherapy, or biologics and monoclonal antibodies.' },
        { v: 'functional', short: 'Functional tests', paths: 'L1 L2D L2S L3 L4i L4o ANY', label: 'Participants will have functional tests', ex: 'Such as cardiopulmonary exercise testing, pulmonary function testing, electrocardiograms, Holter monitoring, body composition, imaging or sleep studies.' },
        { v: 'lab', short: 'Specimen processing or biobanking', paths: 'L1 L2D L2S L3 L4i L4o ANY', label: 'The study needs specimen processing or biobanking' },
        { v: 'peds', short: 'A pediatric study', paths: 'L1 L2D L2S L3 L4i L4o ANY', notWhen: 'people: adults, none', label: 'It is a pediatric study' },
        { v: 'monitor', short: 'Monitoring for a study I sponsor', paths: 'L1 L2D L2S L3 L4i L4o ANY', notWhen: 'sponsor: industry, other', label: 'It is a study you or your supervisor sponsor, and it needs monitoring' },
        { v: 'catalis', short: 'CATALIS FAST TRACK', paths: 'L1 L2D L2S L3 ANY', notWhen: 'sponsor: si, other', label: 'It is a study in CATALIS Québec’s FAST TRACK service' },
        { v: 'none', short: 'None', label: 'None of these', exclusive: true },
        { v: 'unsure', short: 'Not sure', label: 'Not sure', exclusive: true }
      ],
      why: 'Plan the CIM’s part in your study before you submit the study. The CIM confirms whether it has the capacity for your study.',
      mixups: [
        { text: 'Any researcher at The Institute can use CIM services, with no formal affiliation with the CIM.', link: '/cim/services' }
      ] },

    { id: 'q8', key: 'stage', brief: 'Stage', type: 'single', show: 'all',
      title: 'Where is your study now?',
      options: [
        { v: 'plan', short: 'Plan',    label: 'Planning it', ex: 'Such as working on the idea, the feasibility, the protocol or the budget.' },
        { v: 'submit', short: 'Submit and wait for approval',  label: 'Submitting it, or waiting for approval' },
        { v: 'ready', short: 'Get the site ready',   label: 'Getting the site ready', labelL5: 'Getting access to the data' },
        { v: 'recruit', short: 'Recruit and consent', label: 'Recruiting participants', notFor: 'L5' },
        { v: 'run', short: 'Run the study',     label: 'Running it' },
        { v: 'close', short: 'Close and archive',   label: 'Closing it, or archiving the records' },
        { v: 'unsure', short: 'Not sure',  label: 'Not sure' }
      ],
      why: 'A study can take years, and each stage has its own steps.',
      mixups: [
        { text: 'Study teams sometimes start recruiting as soon as Nagano shows the study’s approval by the REB. MUHC Authorization is issued only once the scientific, ethics and institutional feasibility reviews have approved the study.', link: '/#submit-your-study-and-follow-its-review-in-nagano' }
      ] }
  ];

  /* The steps. General steps have no "on". Each line names the step and links its home. */
  var STEPS = [
    /* ---- Plan ---- */
    { id: 'g-research', stage: 'plan', paths: 'L4i L4o L5 ANY',
      text: 'Answer the questions that show whether the project is research or quality improvement.', link: '/is-it-research#screening-questions' },
    { id: 'g-hc-place', stage: 'plan', paths: 'L1 L3', on: ['hc: unsure'],
      text: 'Check whether Health Canada must authorize the trial.',
      ifText: 'If you aren’t sure which answer describes the product, check whether Health Canada must authorize the trial.',
      who: 'rf', link: '/paths#check-whether-health-canada-must-authorize-the-study' },
    /* What Health Canada requires, from the answer on the product (b485, the logic review's B1 and B2). */
    { id: 'c-hc-cta', stage: 'plan', paths: 'L1', on: ['hc: outside'], sureOnly: true,
      text: 'The trial needs Health Canada’s authorization through a CTA.', link: '/paths/level-i#place-the-study' },
    { id: 'c-hc-div5', stage: 'plan', paths: 'L1', on: ['hc: within'], sureOnly: true,
      text: 'A trial of a marketed drug within its approved conditions is still conducted in accordance with Division 5 of the Food and Drug Regulations.', link: '/paths/level-i#place-the-study' },
    { id: 'c-hc-nhp', stage: 'plan', paths: 'L3', on: ['hc: outside'], sureOnly: true,
      text: 'Health Canada must authorize the trial, since it doesn’t use the product exactly as its approved label describes.', link: '/paths/level-iii#place-the-study' },
    { id: 'c-hc-nhp-label', stage: 'plan', paths: 'L3', on: ['hc: label'], sureOnly: true,
      text: 'The trial needs no authorization, but it is still a clinical trial that Health Canada regulates.', link: '/paths#check-whether-health-canada-must-authorize-the-study' },
    { id: 'g-hc-device', stage: 'plan', paths: 'L2D', on: ['hc: offlabel, unsure'],
      text: 'Check whether the device study needs an investigational testing authorization (ITA).',
      ifText: 'If you aren’t sure which answer describes the device, check whether the device study needs an investigational testing authorization (ITA).',
      who: 'itd', link: '/kb/governance/laws-regulations#check-whether-a-device-study-needs-an-investigational-testing-authorization' },
    { id: 'c-ita-yes', stage: 'plan', paths: 'L2D', on: ['hc: unlicensed'], sureOnly: true,
      text: 'A Class II, III or IV device that is not licensed in Canada needs an investigational testing authorization (ITA), unless no sale of the device occurs.', link: '/paths/level-ii#check-whether-a-device-study-needs-an-ita' },
    { id: 'c-ita-offlabel', stage: 'plan', paths: 'L2D', on: ['hc: offlabel'], sureOnly: true,
      text: 'In a study that the manufacturer sponsors or that is meant to support a licence application, the device needs an ITA, unless no sale of the device occurs.', link: '/paths/level-ii#check-whether-a-device-study-needs-an-ita' },

    /* Who initiated the study (b485: B11 moves these ahead of the feasibility steps; B8 adds the academic sponsor). */
    { id: 'c-ind-cda', stage: 'plan', paths: 'L1 L2D L2S L3 L4i L4o', on: ['sponsor: industry'],
      text: 'Have the agreement with the sponsor and the institution signed and dated before the team receives confidential study documents.',
      ifText: 'If a company sponsors the study, have the agreement with the sponsor and the institution signed and dated before the team receives confidential study documents.',
      who: 'rf', link: '/kb/funding/clinical-trial-agreements#know-when-the-study-needs-an-agreement' },
    { id: 'c-ind-questionnaire', stage: 'plan', paths: 'L1 L2D L2S L3 L4i L4o', on: ['sponsor: industry'],
      text: 'Answer the sponsor’s questionnaire, and prepare for its site feasibility visit.',
      ifText: 'If a company sponsors the study, answer its questionnaire, and prepare for its site feasibility visit.',
      who: 'rf', link: '/kb/planning/sponsored-trials#answer-the-feasibility-questionnaire' },
    { id: 'c-si-weigh', stage: 'plan', paths: 'L1 L2D L2S L3', on: ['sponsor: si'],
      text: 'Before you commit to a trial you initiate yourself, weigh the duties you will take on as its sponsor as well as the investigator’s.',
      ifText: 'If you initiate the trial yourself, weigh the duties you will take on as its sponsor, before you commit to it.',
      who: 'qa', link: '/kb/planning/sponsor-investigator#what-the-two-roles-mean' },

    /* b488 (principle 1): the sponsor answers lead to steps that exclude one another, so a reader who isn't sure who
       initiated the study gets this one line in their place (COLLAPSE, below). */
    { id: 'c-sponsor-unsure', stage: 'plan', paths: 'L1 L2D L2S L3 L4i L4o', on: ['sponsor: unsure'], asks: true,
      text: 'If you aren’t sure who sponsors the study, ask the Research Facilitator. Some of its steps differ for an industry-sponsored study, a study with a sponsor-investigator and a study that another university, hospital or research group sponsors.',
      ifText: 'If you aren’t sure who sponsors the study, ask the Research Facilitator. Some of its steps differ for an industry-sponsored study, a study with a sponsor-investigator and a study that another university, hospital or research group sponsors.',
      who: 'rf', link: '/paths#who-sponsors-the-study' },

    { id: 'g-feas', stage: 'plan', paths: 'L1 L2D L2S L3 L4i L4o ANY',
      text: 'Once you have the protocol, assess it to find out what the site will need.', link: '/kb/planning/feasibility#before-the-site-feasibility-visit' },
    /* b488 (MF's C13, ledger row 432; one rule for Levels I to IV): the checklist comes before the site agrees to take part,
       so it shows where a company or another academic sponsor sponsors the study (the feasibility page's strip: Levels I to IV). */
    { id: 'g-checklist', stage: 'plan', paths: 'L1 L2D L2S L3 L4i L4o', on: ['sponsor: industry, other'],
      text: 'The site should complete the checklist before it agrees to take part.',
      ifText: 'If a company or another university, hospital or research group sponsors the study, the site should complete the checklist before it agrees to take part.',
      who: 'rf', link: '/kb/planning/feasibility#feasibility-checklist' },
    { id: 'g-ip-storage', stage: 'plan', paths: 'L1 L2D L3',
      text: 'Secure, adequate and temperature-controlled space for the investigational product should be identified.', link: '/kb/planning/feasibility#before-the-site-feasibility-visit' },
    { id: 'g-protocol-review', stage: 'plan', paths: 'L1 L2D L2S L3',
      text: 'The principal investigator and the research team should review the whole protocol, and the Investigator’s Brochure where there is one.', link: '/kb/site-activation/protocol-documents#read-the-protocol-before-the-study-starts' },
    { id: 'c-si-protocol', stage: 'plan', paths: 'L1 L2D L2S L3', on: ['sponsor: si'],
      text: 'Develop the protocol, and ensure that it is written in compliance with all the applicable requirements: regulatory, good clinical practice, sponsor and local.',
      ifText: 'If you sponsor the trial yourself, develop the protocol, and ensure that it is written in compliance with all the applicable requirements: regulatory, good clinical practice, sponsor and local.',
      who: 'qa', link: '/kb/planning/sponsor-investigator#what-the-two-roles-mean' },
    /* At Level IV the protocol and the budget are the sponsor-investigator's (b485, B7); with the type unsettled, every study sees them. */
    { id: 'g-protocol-design', stage: 'plan', paths: 'L4i L4o ANY', on: { L4i: ['sponsor: si'], L4o: ['sponsor: si'], 'default': null },
      text: 'Design the protocol, which sets the research question, the design, the eligibility criteria, the procedures, the data management plan and the statistical analysis.',
      ifText: 'If you initiate the study yourself, design the protocol, which sets the research question, the design, the eligibility criteria, the procedures, the data management plan and the statistical analysis.',
      who: 'rf', link: '/kb/foundations/study-lifecycle#2-design-and-plan-the-study' },
    { id: 'g-actctu', stage: 'plan', paths: 'L4i', on: ['sponsor: si'],
      text: 'For the full protocol of an investigator-initiated interventional study, ask the RI-MUHC’s clinical trial unit (ACT-CTU).',
      ifText: 'If you initiate the interventional study yourself, ask the RI-MUHC’s clinical trial unit (ACT-CTU) for its full protocol.',
      who: 'rf', link: '/kb/recruitment/consent-templates#choose-a-protocol-template' },
    { id: 'g-data-plan', stage: 'plan', paths: 'L5',
      text: 'Decide which data sources the study needs and how identifiable the data will be.', link: '/kb/conduct/data-documentation/data-security#know-how-identifiable-your-data-are' },
    { id: 'g-stats', stage: 'plan', paths: 'L4i L4o L5',
      text: 'For a statistical plan or a sample size, consider involving the Biostatistics Consulting Unit (BCU) at the design stage.', link: '/kb/design-support/bcu' },
    { id: 'g-redcap', stage: 'plan', paths: 'L4i L4o L5',
      text: 'To collect the study’s data in REDCap, consider involving Capture and Optimization of Research Data (CORD) at the protocol stage.', link: '/kb/design-support/cord' },
    { id: 'g-consent-decide', stage: 'plan', paths: 'L5',
      text: 'Decide whether the study needs consent. If it is feasible, participants must give informed consent, even in a retrospective study.', link: '/sops/cr-008#5-4' },
    { id: 'g-budget', stage: 'plan', paths: 'L4i L4o ANY', on: { L4i: ['sponsor: si'], L4o: ['sponsor: si'], 'default': null },
      text: 'The principal investigator prepares the budget, negotiates it and approves it.',
      ifText: 'If you initiate the study yourself, the principal investigator prepares the budget, negotiates it and approves it.',
      who: 'rf', link: '/kb/funding/budgets-contracts' },
    { id: 'c-si-budget', stage: 'plan', paths: 'L1 L2D L2S L3', on: ['sponsor: si'],
      text: 'The principal investigator prepares the budget, negotiates it and approves it.',
      ifText: 'If you sponsor the trial yourself, the principal investigator prepares the budget, negotiates it and approves it.',
      who: 'rf', link: '/kb/funding/budgets-contracts' },
    { id: 'g-agreement-need', stage: 'plan', paths: 'L4i L4o',
      text: 'Check whether the study needs an agreement, such as for collaborators outside the RI-MUHC, McGill University researchers included.', link: '/kb/funding/clinical-trial-agreements#know-when-the-study-needs-an-agreement' },
    { id: 'g-fund', stage: 'plan', paths: 'L4i L4o L5 ANY',
      text: 'If a grant will fund the study, the Pre-Awards Office helps you prepare the application. When you receive the notice of award, request the study’s account.', link: '/kb/funding/research-grants#request-a-research-account' },
    { id: 'g-cred', stage: 'plan', paths: 'all',
      text: 'Before you submit, the principal investigator must hold Human Research Privileges, Researcher Status or a written institutional authorization.', link: '/training/compliance-requirements#know-which-credential-you-need' },
    { id: 'g-train', stage: 'plan', paths: 'all',
      text: 'Everyone on the study should hold the study’s level, or a higher one, before signing its Task Delegation Log.', link: '/training/compliance-requirements#training-requirements-by-study-level',
      note: 'Teams sometimes assume that Quality Assurance’s check covers everyone. The principal investigator must ensure that the people delegated tasks keep the study’s level of training.' },
    { id: 'g-backup', stage: 'plan', paths: 'all',
      text: 'A sub-investigator should be named to back up the principal investigator.', link: '/kb/conduct/study-operations/team-management#name-a-backup-for-the-principal-investigator' },
    { id: 'g-consent-form', stage: 'plan', paths: 'L1 L2D L2S L3 L4i L4o ANY',
      text: 'Prepare the form from the Centre for Applied Ethics’ templates.', link: '/kb/recruitment/consent#prepare-the-consent-form' },
    { id: 'g-ip-letterhead', stage: 'plan', paths: 'L1 L2D L3',
      text: 'For a study of an investigational product, the consent form needs MUHC letterhead with the Medical Records bar code FMU-9997.', link: '/kb/recruitment/consent#prepare-the-consent-form' },
    { id: 'g-recruit-mat', stage: 'plan', paths: 'L1 L2D L2S L3 L4i L4o ANY',
      text: 'Have each material approved before you use it.', link: '/kb/recruitment/recruitment-enrollment#have-recruitment-materials-approved' },

    /* ---- Submit and wait for approval ---- */
    { id: 'g-nagano', stage: 'submit', paths: 'all',
      text: 'Create the project in Nagano and choose its type with care, since it can’t be changed once the project has its Nagano number.', link: '/kb/submission/preparing#choose-the-project-type' },
    { id: 'g-docs', stage: 'submit', paths: 'all',
      text: 'Upload the documents the RI-MUHC’s SOPs list, the study protocol among them.', link: '/kb/submission/preparing#prepare-the-documents' },
    { id: 'g-dept', stage: 'submit', paths: 'L1 L2D L2S L3 L4i L4o ANY',
      text: 'Before you submit, get the approval of the head of each department the study affects.', link: '/kb/submission/preparing#get-approvals-start-the-agreements-and-declare-conflicts' },
    /* b494 (A9): the REB's SOP 105B.002, section 5.2.1, binds every researcher who submits a study to the REB. */
    { id: 'g-coi', stage: 'submit', paths: 'all',
      text: 'In the F11, declare any real, potential or perceived conflict that may affect the study.', link: '/kb/governance/conflict-of-interest#declare-a-conflict-to-the-reb-that-reviews-your-study' },
    { id: 'g-f11-services', stage: 'submit', paths: 'all',
      text: 'Answer the F11’s questions on services and data access accurately, because they start the services’ feasibility reviews.', link: '/kb/submission/preparing#answer-the-f11-questions-on-services-and-data-access' },
    { id: 'g-pharmacy', stage: 'submit', paths: 'L1 L3',
      text: 'In the Nagano submission, answer the questions that start the pharmacy’s review of the study’s feasibility.', link: '/kb/conduct/study-operations/investigational-products#know-what-the-pharmacy-does-and-what-the-principal-investigator-keeps' },
    { id: 'g-mycontracts', stage: 'submit', paths: 'all',
      text: 'Upload every research agreement both to Nagano and to My Contracts on the RI-MUHC Portal.', link: '/kb/funding/clinical-trial-agreements#submit-the-agreement-in-nagano-and-my-contracts',
      note: 'Teams sometimes declare an agreement in Nagano and never make the request in My Contracts.' },
    { id: 'g-no-sign', stage: 'submit', paths: 'L1 L2D L2S L3 L4i L4o ANY',
      text: 'Researchers should never sign a binding contract or agreement before the Research Agreements Office has reviewed it.', link: '/kb/funding/clinical-trial-agreements#sign-the-agreement-at-the-right-time' },
    { id: 'g-agreements-exec', stage: 'submit', paths: 'all',
      text: 'Every agreement must be fully executed before MUHC Authorization.', link: '/kb/submission/submission-overview#institutional-feasibility-review',
      early: 'Every agreement must be fully executed before MUHC Authorization.' },
    { id: 'g-reb-answer', stage: 'submit', paths: 'all',
      text: 'Answer each request from the REB within its deadline for replies.', link: '/kb/submission/tracking-responding#answer-the-reb-within-three-months' },
    { id: 'g-wait', stage: 'submit', paths: 'all',
      text: 'Do not start any research activity, including recruitment, data collection or analysis, until you have both REB approval and MUHC Authorization.', link: '/kb/submission/submission-overview#before-recruitment-and-keeping-approval-valid' },
    { id: 'g-isf', stage: 'submit', paths: 'all',
      text: 'The principal investigator or a delegate should create the site file and keep it current.', link: '/kb/site-activation/isf#set-up-the-isf' },
    { id: 'g-file-letter', stage: 'submit', paths: 'all',
      text: 'File the printed letter in the investigator site file.', link: '/kb/submission/submission-overview#before-recruitment-and-keeping-approval-valid',
      note: 'Teams sometimes keep only the electronic copy.' },

    /* ---- Get the site ready (Level V: obtain and protect the data) ---- */
    { id: 'g-pharm-siv', stage: 'ready', paths: 'L1',
      text: 'Inform the pharmacy and invite it to the site initiation visit, for training on the protocol and the drug.', link: '/kb/conduct/study-operations/investigational-products#know-what-the-pharmacy-does-and-what-the-principal-investigator-keeps' },
    { id: 'g-tdl', stage: 'ready', paths: 'all',
      text: 'Do not perform a study task until your training for it is documented and the task has been delegated on the Task Delegation Log.', link: '/kb/team/building-your-team#delegate-every-task-on-the-task-delegation-log' },
    { id: 'g-register', stage: { L4i: 'plan', 'default': 'ready' }, paths: 'L1 L2D L2S L3 L4i',
      text: 'The sponsor or sponsor-investigator registers the trial in a public registry before the first participant is recruited.', link: '/kb/close-out/publications#trial-registration',
      early: 'The consent form must give the registry’s name, its web address and the trial’s registration number.' },
    { id: 'g-go', stage: 'ready', paths: 'L1 L2D L2S L3 L4i L4o ANY',
      text: 'Do not begin the study until you have the REB’s written approval, MUHC Authorization and the sponsor’s written permission to start, if it issues one.', link: '/kb/site-activation/site-setup#wait-for-the-go-letter-before-you-enrol' },
    /* b494 (the b493 fact check's A4): SOP-CR-019, whose scope is all clinical studies undertaken at the site, sets the
       agreement before Medical Records Services gives access (Addendum 1.2.1), so every type of study sees the step. */
    { id: 'g-confid', stage: 'ready', paths: 'all',
      text: 'Before Medical Records Services gives you access to patients’ medical records, sign the MUHC Confidentiality and Security Agreement and send it to them.', link: '/kb/governance/privacy#keep-participant-information-confidential' },
    { id: 'g-controls', stage: { L4i: 'run', L4o: 'run', 'default': 'ready' }, paths: 'L4i L4o L5',
      text: 'Keep, share and send the data with the controls that match how identifiable they are.', link: '/kb/conduct/data-documentation/data-security#apply-the-controls-for-each-kind-of-data' },
    /* b494 (A5): the REB's SOP 405A.001-2, section 5.2.4.1, binds every researcher whose study the REB reviews. */
    { id: 'g-breach', stage: { L5: 'ready', 'default': 'run' }, paths: 'all',
      text: 'If participants’ information is lost or seen by the wrong person, report it to the REB in Nagano as soon as you become aware of it.', link: '/kb/governance/privacy#report-information-that-is-lost-or-seen-by-the-wrong-person' },
    /* b494 (A6): REB-SOP 405A.001-2, section 5.2.4.2, for every study the REB reviews; staged as g-breach is. */
    { id: 'g-reid', stage: { L5: 'ready', 'default': 'run' }, paths: 'all',
      text: 'The REB counts any accidental or intentional re-identification of a participant as a serious adverse event. Report it to the REB, whether it happened at the MUHC or elsewhere.', link: '/kb/conduct/safety-reporting/reportable-events#assess-and-report-adverse-events' },

    /* ---- Recruit and consent ---- */
    { id: 'g-consent-obtain', stage: 'recruit', paths: 'L1 L2D L2S L3 L4i L4o ANY',
      text: 'Obtain consent on the current REB-approved form, following the steps the RI-MUHC’s SOPs require.', link: '/kb/recruitment/consent#obtain-consent-before-any-study-procedure' },
    { id: 'g-rule2', stage: 'recruit', paths: 'L1 L2D L2S L3 L4i L4o ANY',
      text: 'All required signatures must be on the current REB-approved consent form before any screening procedure takes place. A procedure done even minutes before all the required signatures are on the form is a deviation.', link: '/kb/recruitment/consent#obtain-consent-before-any-study-procedure' },
    { id: 'g-screen', stage: 'recruit', paths: 'L4i L4o',
      text: 'Screen candidates in the order and on the timeline the protocol sets, and record each person on the log.', link: '/kb/recruitment/recruitment-enrollment#screen-candidates' },
    { id: 'g-medrec', stage: 'recruit', paths: 'L1 L2D L3',
      text: 'When a participant starts a study of an investigational product, notify MUHC Medical Records Services, and notify them again when their participation ends.', link: '/kb/recruitment/recruitment-enrollment#notify-medical-records-and-give-a-wallet-card' },
    { id: 'g-wallet', stage: 'recruit', paths: 'L1 L2D L3',
      text: 'In an interventional study of an investigational product, the investigator should give each participant a wallet-size card when their participation begins.', link: '/kb/recruitment/recruitment-enrollment#notify-medical-records-and-give-a-wallet-card' },
    { id: 'g-pay', stage: 'recruit', paths: 'L1 L2D L2S L3 L4i L4o ANY',
      text: 'Keep payments to participants within Quebec’s limits.', link: '/kb/recruitment/consent#compensate-participants-within-the-limits' },

    /* ---- Run the study ---- */
    { id: 'g-data-record', stage: 'run', paths: 'L4i L4o ANY',
      text: 'Record the study’s data in source documents, following the ALCOA+ principles.', link: '/kb/conduct/data-documentation/data-integrity#know-what-counts-as-a-source-document' },
    { id: 'g-ae', stage: 'run', paths: 'L1 L2D L2S L3 L4i',
      text: 'In an interventional study, assess and record every adverse event on the AE Assessment Log and in the source documents.', link: '/kb/conduct/safety-reporting/reportable-events#assess-and-report-adverse-events' },
    { id: 'g-rule4', stage: 'run', paths: 'L1 L2D L2S L3 L4i',
      text: 'Report every serious adverse event to the sponsor within 24 hours of the principal investigator learning of it, unless the REB-approved protocol sets a different timeline.', link: '/kb/conduct/safety-reporting/reportable-events#key-reporting-timelines' },
    { id: 'g-reb-sae', stage: 'run', paths: 'L1 L2D L2S L3 L4i',
      text: 'At a site under the MUHC REB’s approval, report a serious adverse event to the REB by the REB’s deadline if the principal investigator judges that it meets the REB’s three criteria.', link: '/kb/conduct/safety-reporting/reportable-events#assess-and-report-adverse-events' },
    { id: 'g-events-reb', stage: 'run', paths: 'L4i L4o',
      text: 'Report the events the REB lists to the REB in Nagano, each by its own deadline.', link: '/kb/conduct/safety-reporting/reportable-events#report-participant-safety-and-ethical-concerns' },
    { id: 'g-pregnancy', stage: 'run', paths: 'L1 L2D L2S L3 L4i',
      text: 'If a participant in an interventional study becomes pregnant, collect and follow the exposure in utero reports.', link: '/kb/conduct/safety-reporting/reportable-events#track-a-pregnancy-during-a-trial' },
    { id: 'g-deviations', stage: 'run', paths: 'all',
      text: 'Every protocol deviation must be assessed, addressed and documented, and reported as its tier, minor, major or critical, requires.', link: '/kb/conduct/safety-reporting/reportable-events#classify-and-report-protocol-deviations' },
    { id: 'g-ip-manage', stage: 'run', paths: 'L1 L3',
      text: 'Every step at the site, from the investigational product’s receipt to its return or destruction, is documented.', link: '/kb/conduct/study-operations/investigational-products#follow-the-product-from-receipt-to-return-or-destruction' },
    { id: 'g-device-acc', stage: 'run', paths: 'L2D',
      text: 'Keep the records for the investigational devices.', link: '/kb/conduct/study-operations/investigational-products#keep-the-accountability-records' },
    { id: 'g-consent-current', stage: 'run', paths: 'L1 L2D L2S L3 L4i L4o ANY',
      text: 'Keep each participant’s consent valid throughout the study.', link: '/kb/recruitment/consent#keep-consent-current' },
    { id: 'g-amend', stage: 'run', paths: 'all',
      text: 'Before you implement an amendment, wait for every approval it needs.', link: '/kb/conduct/safety-reporting/study-amendments#wait-for-every-approval-before-you-implement-the-amendment' },
    { id: 'g-renew', stage: 'run', paths: 'all',
      text: 'Before the REB’s approval expires, request the continuing review in Nagano, by the deadline the RI-MUHC’s SOPs set.', link: '/kb/submission/submission-overview#before-recruitment-and-keeping-approval-valid' },
    /* b498 (the b495 pooled look's list 1 (a)): REB-SOP 105B.002, section 5.2.5, has the researcher disclose any conflict
       of interest at each continuing review and whenever one arises, so a reader at Run can act on it. */
    { id: 'g-coi-update', stage: 'run', paths: 'all',
      text: 'Declare your conflicts of interest to the REB at each continuing review of the study, and whenever a conflict arises, such as when your responsibilities or financial circumstances change.', link: '/kb/governance/conflict-of-interest#declare-a-conflict-to-the-reb-that-reviews-your-study' },
    { id: 'g-tdl-update', stage: 'run', paths: 'L1 L2D L2S L3 L4i L4o ANY',
      text: 'The Task Delegation Log should be kept up to date throughout the study.', link: '/kb/conduct/study-operations/team-management#keep-the-task-delegation-log-up-to-date' },
    { id: 'g-monitor', stage: 'run', paths: 'L1 L2D L2S L3',
      text: 'Prepare for each monitoring visit, and respond in writing to each observation in the monitoring letter.', link: '/kb/conduct/safety-reporting/monitoring-audits#prepare-for-a-monitoring-visit' },
    { id: 'g-audit-notify', stage: 'run', paths: 'L1 L2D L2S L3 L4i L4o',
      text: 'Notify the REB of any planned audit or inspection of the study.', link: '/kb/conduct/safety-reporting/monitoring-audits#tell-the-reb-about-audits-and-inspections' },

    /* ---- Close and archive ---- */
    /* b485: staged at Run, since its own line says to start well before the last participant's last visit (the check for A3 found it). */
    { id: 'g-closeout-visit', stage: 'run', paths: 'L1 L2D L2S L3',
      text: 'Consider starting to prepare for the close-out visit well before the last participant’s last visit.', link: '/kb/close-out/close-out#preparing-for-the-close-out-visit' },
    /* b494 (the b493 fact check's A2): the RI-MUHC's SOPs don't require drug accountability records for a drug that is the
       subject of a Phase IV clinical trial (SOP-CR-010, Addendum 1.4.3), so for a drug trial the step needs the drug not to be
       a marketed drug used within the conditions of its approval (Health Canada's Phase IV). The natural health product and
       device rows are unchanged: the exemption names drugs, and QA is asked whether it reaches a natural health product.
       b498 (the b495 pooled look's rows 12 and 13): the exemption covers the drug under study, not every investigational
       product of the trial (SOP-CR-016, section 5.3.1: the logs "for all investigational products"; SOP-CR-010, Addendum
       1.4.3, exempts a comparator only if it "hasn't been altered in any manner"). So the "If" line keeps the duty and points
       to the exemptions, and a Phase IV drug trial gets its own line (g-ip-account-p4) instead of none. */
    { id: 'g-ip-account', stage: 'close', paths: 'L1 L2D L3', on: { L1: ['hc: !within'], 'default': null },
      text: 'Every unit of the investigational product must be fully accounted for in the log.',
      ifText: 'Every unit of the investigational product must be fully accounted for in the log. The RI-MUHC’s SOPs do not require drug accountability records for some drugs, such as a drug that is the subject of a Phase IV clinical trial.',
      who: 'rf', link: '/kb/close-out/close-out#supply-reconciliation-and-archiving' },
    { id: 'g-ip-account-p4', stage: 'close', paths: 'L1', on: ['hc: within'], sureOnly: true,
      text: 'The RI-MUHC’s SOPs do not require drug accountability records for some drugs, such as a drug that is the subject of a Phase IV clinical trial. Health Canada calls a trial of a marketed drug within the conditions of its approval a Phase IV clinical trial. Every unit of any other investigational product, such as a placebo or a comparator drug that has been altered, must still be fully accounted for in the log.',
      who: 'rf', link: '/kb/conduct/study-operations/investigational-products#keep-the-accountability-records' },
    { id: 'g-f10', stage: 'close', paths: 'all',
      text: 'When the conditions for closure are met, notify the REB and the Personne mandatée with the Closure of Research Project form in Nagano.', link: '/kb/close-out/close-out#notifying-the-reb-and-health-canada' },
    { id: 'g-archive', stage: 'close', paths: 'all',
      text: 'Archive the study’s documents for the period that applies to your study.', link: '/kb/close-out/close-out#supply-reconciliation-and-archiving' },
    { id: 'g-results', stage: 'close', paths: 'all',
      text: 'Researchers shall make their results public, including results that don’t support the research hypotheses, in a timely manner and without undue restriction.', link: '/kb/close-out/publications' },
    { id: 'g-early-stop', stage: 'close', paths: 'L1 L3',
      text: 'If the sponsor stops the trial, at the site or in its entirety, the qualified investigator must inform the participants and the REB immediately. The qualified investigator is the person responsible for conducting a clinical trial of a drug or a natural health product at a site under Health Canada’s regulations.', link: '/kb/close-out/close-out#if-a-drug-or-natural-health-product-trial-stops-early' },

    /* ===== Steps only some studies take ===== */

    /* The type is not settled */
    { id: 'c-type', stage: 'plan', paths: 'ANY', on: ['q1: !survey'],
      text: 'Check whether Health Canada must authorize the study.',
      ifText: 'If your study tests a drug, a medical device or a natural health product, check whether Health Canada must authorize it. A study of any of these, or of a surgical procedure, has steps of its own.',
      who: 'rf', link: '/paths#check-whether-health-canada-must-authorize-the-study' },

    /* Health Canada authorization */
    { id: 'c-hc-wait', stage: 'submit', paths: 'L1 L2D L3', on: ['auth: yes'],
      text: 'The Personne mandatée waits for Health Canada’s authorization before issuing MUHC Authorization.',
      ifText: 'If the study needs Health Canada’s authorization, the Personne mandatée waits for it before issuing MUHC Authorization.',
      who: { L2D: 'itd', 'default': 'rf' }, link: '/kb/submission/submission-overview#health-canada-authorization',
      early: 'Plan the Health Canada application during study design.' },
    { id: 'c-radio-div3', stage: 'plan', paths: 'L1', on: ['hc: radio'], sureOnly: true,
      text: 'A basic clinical research study of a positron-emitting radiopharmaceutical needs the Minister’s authorization under Division 3 of the Food and Drug Regulations, instead of a Clinical Trial Application (CTA).',
      ifText: 'If the study is a basic clinical research study of a positron-emitting radiopharmaceutical, it needs the Minister’s authorization under Division 3 of the Food and Drug Regulations, instead of a Clinical Trial Application (CTA).',
      who: 'rf', link: '/kb/governance/laws-regulations#check-whether-a-radiopharmaceutical-study-is-a-basic-clinical-research-study' },
    { id: 'c-radio-pharm', stage: 'plan', paths: 'L1', on: ['hc: radio'], sureOnly: true,
      text: 'For a radiopharmaceutical study, consider contacting the Research Pharmacy early in planning.',
      ifText: 'If the study is of a radiopharmaceutical, consider contacting the MUHC Research Pharmacy early in planning.',
      who: 'rf', link: '/kb/conduct/study-operations/investigational-products#radiopharmaceuticals' },
    { id: 'c-marketed', stage: 'run', paths: 'L1 L3', on: ['hc: within, label'],
      text: 'In a study of a marketed product, report adverse reactions to the sponsor or the product’s market authorization holder.',
      ifText: 'If the trial uses a marketed product, report adverse reactions to the sponsor or the product’s market authorization holder.',
      who: 'rf', link: '/kb/conduct/safety-reporting/reportable-events#assess-and-report-adverse-events' },
    { id: 'c-hospital-device', stage: 'run', paths: 'L2D', on: ['hc: licensed, offlabel'],
      text: 'When a study uses a licensed device without an ITA, the hospital must report an incident with that device to Health Canada. Ask Quality Assurance how to report one.',
      ifText: 'If the study uses a licensed device without an ITA, the hospital must report an incident with that device to Health Canada. Ask Quality Assurance how to report one.',
      who: 'qa', link: '/kb/conduct/safety-reporting/reportable-events#hospital-reporting-of-serious-drug-reactions-and-device-incidents' },

    /* A company sponsors the study */
    /* (b485: the questionnaire and the confidentiality agreement moved ahead of the feasibility steps, above.) */
    { id: 'c-ind-budget', stage: 'plan', paths: 'L1 L2D L2S L3 L4i L4o', on: ['sponsor: industry'],
      text: 'The principal investigator negotiates the budget with the sponsor.',
      ifText: 'If a company sponsors the study, the principal investigator negotiates the budget with it.',
      who: 'rf', link: '/kb/funding/budgets-contracts#negotiate-the-budget-with-an-industry-sponsor' },
    { id: 'c-catalis', stage: 'plan', paths: 'L1 L2D L2S L3', on: ['sponsor: industry'],
      text: 'Ask the Research Facilitator whether the study is eligible for CATALIS Québec’s FAST TRACK Evaluation Service.',
      ifText: 'If a company sponsors the study, ask the Research Facilitator whether it is eligible for CATALIS Québec’s FAST TRACK Evaluation Service.',
      who: 'rf', link: '/kb/design/multi-centric#catalis-fast-track' },

    /* You sponsor the study yourself (b485: c-si-weigh moved ahead of the feasibility steps, above) */
    { id: 'c-si-fund', stage: 'plan', paths: 'L1 L2D L2S L3', on: ['sponsor: si'],
      text: 'If a grant will fund the study, the Pre-Awards Office helps you prepare the application. When you receive the notice of award, request the study’s account.',
      ifText: 'If you sponsor the study yourself and a grant will fund it, the Pre-Awards Office helps you prepare the application, and you request the study’s account.',
      who: 'rf', link: '/kb/funding/research-grants#request-a-research-account' },
    { id: 'c-si-insurance', stage: 'plan', paths: 'L1 L2D L2S L3', on: ['sponsor: si'],
      text: 'For the RI-MUHC’s policy to cover the trial, the RI-MUHC should be named as its sponsor.',
      ifText: 'If you sponsor the trial yourself, the RI-MUHC should be named as its sponsor for the RI-MUHC’s policy to cover it.',
      who: 'qa', link: '/kb/funding/research-liability-insurance#cover-a-study-you-sponsor-yourself' },
    { id: 'c-si-monitor', stage: 'plan', paths: 'L1 L2D L2S L3', on: ['sponsor: si'],
      text: 'Develop a risk-based monitoring plan and arrange an independent monitor. You cannot monitor your own study.',
      ifText: 'If you sponsor the trial yourself, develop a risk-based monitoring plan and arrange an independent monitor.',
      who: 'qa', link: '/kb/planning/sponsor-investigator#monitoring-independence' },
    { id: 'c-si-tmf', stage: 'plan', paths: 'L1 L2D L2S L3', on: ['sponsor: si'],
      text: 'Keep the trial master file as well as the investigator site file.',
      ifText: 'If you sponsor the trial yourself, keep the trial master file as well as the investigator site file.',
      who: 'qa', link: '/kb/planning/sponsor-investigator#tmf-and-isf' },
    { id: 'c-si-safety', stage: 'plan', paths: 'L1 L2D L2S L3', on: ['sponsor: si'],
      text: 'Give the REB an acceptable plan for monitoring safety, efficacy or effectiveness (where feasible) and validity.',
      ifText: 'If you sponsor the trial yourself, give the REB an acceptable plan for monitoring safety, efficacy or effectiveness (where feasible) and validity.',
      who: 'qa', link: '/kb/submission/preparing#plan-the-safety-monitoring-of-a-clinical-trial' },
    { id: 'c-si-apply', stage: 'plan', paths: 'L1 L3', on: ['sponsor: si', 'auth: yes'],
      text: 'As the sponsor-investigator, you apply to Health Canada and hold the authorization.',
      ifText: 'If you sponsor the trial yourself and it needs Health Canada’s authorization, you apply to Health Canada and hold the authorization.',
      who: 'qa', link: '/kb/planning/sponsor-investigator#know-who-applies-to-health-canada-and-who-reports-to-it' },
    { id: 'c-si-gmp', stage: 'plan', paths: 'L1 L3', on: ['sponsor: si', 'auth: yes'],
      text: 'Ensure that the product is manufactured and stored in accordance with good manufacturing practices.',
      ifText: 'If you sponsor the trial yourself and it needs Health Canada’s authorization, ensure that the product is manufactured and stored in accordance with good manufacturing practices.',
      who: 'qa', link: '/kb/planning/sponsor-investigator#know-who-ensures-the-product-meets-good-manufacturing-practices' },
    { id: 'c-si-ita', stage: 'plan', paths: 'L2D', on: ['sponsor: si', 'auth: yes'],
      text: 'Only the manufacturer or the importer of a device can apply for an ITA. A sponsor-investigator needs the manufacturer’s cooperation.',
      ifText: 'If you sponsor the study yourself and it needs an ITA, only the manufacturer or the importer of the device can apply for it.',
      who: 'itd', link: '/kb/planning/sponsor-investigator#only-the-manufacturer-or-importer-can-apply' },
    { id: 'c-si-device-qa', stage: 'plan', paths: 'L2D', on: ['sponsor: si'],
      text: 'Consider writing to Quality Assurance and the Research Facilitator at the earliest stage of planning a device study.',
      ifText: 'If you sponsor the device study yourself, consider writing to Quality Assurance and the Research Facilitator at the earliest stage of planning it.',
      who: 'qa', link: '/kb/planning/sponsor-investigator#plan-a-device-study-early-with-quality-assurance' },
    { id: 'c-si-device-gcp', stage: 'plan', paths: 'L2D', on: ['sponsor: si'],
      text: 'For a device trial you initiate, other than one with an in vitro diagnostic device, the RI-MUHC’s SOPs require its testing to comply with the Declaration of Helsinki, ISO 14155 and ISO 14971.',
      ifText: 'If you initiate the device trial yourself, other than one with an in vitro diagnostic device, the RI-MUHC’s SOPs require its testing to comply with the Declaration of Helsinki, ISO 14155 and ISO 14971.',
      who: 'qa', link: '/kb/governance/laws-regulations#follow-good-clinical-practice-in-a-study-regulated-by-health-canada' },
    { id: 'c-si-ctgov', stage: 'ready', paths: 'L1 L2D L2S L3', on: ['sponsor: si'],
      text: 'A sponsor-investigator who registers on ClinicalTrials.gov uses the MUHC’s organization account.',
      ifText: 'If you sponsor the trial yourself and register it on ClinicalTrials.gov, you use the MUHC’s organization account.',
      who: 'qa', link: '/kb/close-out/publications#trial-registration' },
    /* b485 (B5): until QA says whether these hold for a radiopharmaceutical study under Division 3, they show only for a trial that needs a CTA or, for a natural health product, an authorization. */
    { id: 'c-si-report-hc', stage: 'run', paths: 'L1 L3', on: ['sponsor: si', 'hc: outside'],
      text: 'As the sponsor-investigator, report a serious adverse event that meets Health Canada’s criteria to Health Canada yourself.',
      ifText: 'If you sponsor the trial yourself and it needs Health Canada’s authorization, report a serious adverse event that meets Health Canada’s criteria to Health Canada yourself.',
      who: 'qa', link: '/kb/conduct/safety-reporting/reportable-events#know-who-reports-an-sae-to-health-canada' },
    { id: 'c-si-hc-obligations', stage: 'run', paths: 'L1', on: ['sponsor: si', 'hc: outside'],
      text: 'Once the trial is under way, you hold the sponsor’s other obligations to Health Canada.',
      ifText: 'If you sponsor the trial yourself and it needs Health Canada’s authorization, you hold the sponsor’s other obligations to Health Canada once it is under way.',
      who: 'qa', link: '/kb/planning/iit-startup#meet-the-sponsor-obligations-once-the-trial-starts' },

    /* Minors and adults who can't consent */
    { id: 'c-civil', stage: 'plan', paths: 'L1 L2D L2S L3 L4i L4o ANY', on: ['people: minors, adults'],
      text: 'The Civil Code decides who consents for a minor or an adult who can’t consent. Research that could interfere with their integrity must also meet the Civil Code’s added conditions.',
      ifText: 'If the study may include minors or adults who can’t consent, the Civil Code decides who consents for them.',
      who: 'rf', link: '/kb/recruitment/consent#who-can-consent' },
    { id: 'c-peds', stage: 'plan', paths: 'L1 L2D L2S L3 L4i L4o ANY', on: ['people: minors'],
      text: 'Follow Pediatric Research Considerations for what the study needs for a child, such as assent.',
      ifText: 'If the study may include minors, follow Pediatric Research Considerations.',
      who: 'rf', link: '/kb/recruitment/pediatric-research' },
    { id: 'c-vuln', stage: 'plan', paths: 'all', on: ['people: adults'],
      text: 'Follow Research with Participants in Vulnerable Circumstances for what the study needs for an adult who can’t consent.',
      ifText: 'If the study may include adults who can’t consent, follow Research with Participants in Vulnerable Circumstances.',
      who: 'rf', link: '/kb/recruitment/vulnerable-populations' },
    { id: 'c-delegated', stage: 'submit', paths: 'L1 L2D L2S L3 L4i L4o ANY', on: ['people: minors, adults'],
      text: 'A new project that could interfere with the integrity of a minor or of an adult who can’t consent cannot go through delegated review at its first review.',
      ifText: 'If the study may include minors or adults who can’t consent, it cannot go through delegated review at its first review when it could interfere with their integrity.',
      who: 'reb', link: '/kb/submission/submission-overview#how-a-study-is-reviewed' },

    /* Minors and adults who can’t consent, in a retrospective study (b483). No page states what else a study of
       minors' records needs, so the step says what Pediatric Research states and sends the reader to the Research Facilitator. */
    { id: 'c-peds-l5', stage: 'submit', paths: 'L5', on: ['people: minors'],
      text: 'The REB’s Pediatrics panel reviews all projects involving minors. For what else a study of minors’ records needs, ask the Research Facilitator.',
      ifText: 'If the study may involve minors, the REB’s Pediatrics panel reviews all projects involving minors. For what else a study of minors’ records needs, ask the Research Facilitator.',
      who: 'rf', link: '/kb/recruitment/pediatric-research#prepare-the-reb-submission' },
    { id: 'c-consent-l5', stage: 'plan', paths: 'L5', on: ['people: minors, adults'],
      text: 'If the REB decides that the study needs consent, who consents for a minor or an adult who can’t consent depends on their age and whether they can consent.',
      ifText: 'If the study may involve minors or adults who can’t consent, and the REB decides that it needs consent, who consents depends on their age and whether they can consent.',
      who: 'rf', link: '/kb/recruitment/consent#who-can-consent' },

    /* Sites */
    { id: 'c-mc', stage: 'submit', paths: 'all', on: ['sites: qcmuhc, qcother'],
      text: 'Follow Multi-Centric Studies in Quebec.',
      ifText: 'If the study will run at more than one public institution in Quebec, follow Multi-Centric Studies in Quebec.',
      who: 'rf', link: '/kb/design/multi-centric' },
    { id: 'c-meo', stage: 'submit', paths: 'all', on: ['sites: qcother'],
      text: 'When another Quebec REB reviews the study, submit an MEO file in Nagano for the MUHC as a participating site.',
      ifText: 'If another Quebec REB will review the study, submit an MEO file in Nagano for the MUHC as a participating site.',
      who: 'rf', link: '/kb/design/multi-centric#submit-an-meo-file-when-the-muhc-is-a-participating-site' },
    { id: 'c-meo-sae', stage: 'run', paths: 'L1 L2D L2S L3 L4i L4o', on: ['sites: qcother'],
      text: 'If another Quebec REB reviews the study, report each serious adverse event at the MUHC that is unexpected and is related or possibly related to the study to that REB, and in Nagano to the MUHC REB and the Personne mandatée.',
      ifText: 'If another Quebec REB reviews the study, report each serious adverse event at the MUHC that is unexpected and is related or possibly related to the study to that REB, and in Nagano to the MUHC REB and the Personne mandatée.',
      who: 'rf', link: '/kb/conduct/safety-reporting/reportable-events#key-reporting-timelines' },
    { id: 'c-other-site-sae', stage: 'run', paths: 'L2D L2S L4i L4o', on: ['sites: qcmuhc, outside', 'sites: !qcother'],
      text: 'In any study the MUHC REB reviews, a serious adverse event at a site outside its approval needs a report to the REB if the principal investigator judges that it meets the REB’s four criteria.',
      ifText: 'If the study has sites outside the MUHC REB’s approval, a serious adverse event there may need a report to the REB.',
      who: 'rf', link: '/kb/conduct/safety-reporting/reportable-events#report-an-sae-at-another-site-to-the-reb' },
    { id: 'c-cross', stage: 'submit', paths: 'all', on: ['sites: outside'],
      text: 'Follow International and Cross-Border Studies.',
      ifText: 'If the study will have sites outside Quebec, follow International and Cross-Border Studies.',
      who: 'rf', link: '/kb/design/cross-border-studies' },

    /* EFVP: required */
    { id: 'c-prescreen', stage: 'submit', paths: 'L1 L2D L2S L3 L4i L4o ANY', on: ['efvp: prescreen'],
      text: 'To check eligibility in health records before someone consents, the study needs the REB’s approval to use the records without consent, an approved EFVP and then MUHC Authorization.',
      ifText: 'If anyone will check eligibility in health records before people consent, the study needs the REB’s approval to use the records without consent, an approved EFVP and then MUHC Authorization.',
      who: 'efvp', link: '/kb/governance/privacy#get-authorization-before-using-health-records-without-consent' },
    { id: 'c-noconsent', stage: { L5: 'plan', 'default': 'submit' }, paths: 'all', on: ['efvp: noconsent'],
      text: 'A study that uses identifiable health information without consent needs an approved EFVP before it can receive MUHC Authorization.',
      ifText: 'If the study will use identifiable health information without consent, it needs an approved EFVP before it can receive MUHC Authorization.',
      who: 'efvp', link: '/kb/governance/privacy#get-authorization-before-using-health-records-without-consent' },
    { id: 'c-waiver', stage: 'plan', paths: 'L5', on: ['efvp: noconsent'],
      text: 'The REB may approve the use of identifiable information without consent only if the researcher satisfies all of the conditions in the Tri-Council Policy Statement (TCPS 2).',
      ifText: 'If the study will use identifiable information without consent, the REB may approve it only if the researcher satisfies all of the conditions in the Tri-Council Policy Statement (TCPS 2).',
      who: 'reb', link: '/paths/retrospective#decide-whether-the-study-needs-consent' },
    { id: 'c-f18', stage: 'submit', paths: 'L5', on: ['efvp: noconsent'],
      text: 'The EFVP must be completed in French and signed by the principal investigator. Submit it as form F18, with the F11.',
      ifText: 'If the study will use identifiable health information without consent, the EFVP must be completed in French and signed by the principal investigator, and submitted as form F18.',
      who: 'efvp', link: '/kb/governance/privacy#get-authorization-before-using-health-records-without-consent' },
    { id: 'c-muhc-agreement', stage: 'submit', paths: 'L5', on: ['efvp: noconsent'],
      text: 'When access without consent is authorized, the principal investigator signs a written agreement with the MUHC that sets how the information may be used.',
      ifText: 'If access without consent is authorized, the principal investigator signs a written agreement with the MUHC.',
      who: 'efvp', link: '/kb/governance/privacy#get-authorization-before-using-health-records-without-consent' },
    { id: 'c-helpers', stage: 'ready', paths: 'L5', on: ['efvp: noconsent'],
      text: 'If your access was authorized without consent, make sure that anyone you retain for the project meets the obligations of your agreement with the MUHC too.',
      ifText: 'If your access is authorized without consent, make sure that anyone you retain for the project meets the obligations of your agreement with the MUHC too.',
      who: 'efvp', link: '/kb/governance/privacy#get-authorization-before-using-health-records-without-consent' },
    { id: 'c-destroy', stage: 'close', paths: 'L5', on: ['efvp: noconsent'],
      text: 'If access was authorized without consent, destroy the information at the end of the period your agreement with the MUHC sets, and tell the MUHC that you have.',
      ifText: 'If access is authorized without consent, destroy the information at the end of the period your agreement with the MUHC sets, and tell the MUHC that you have.',
      who: 'efvp', link: '/kb/governance/privacy#get-authorization-before-using-health-records-without-consent' },

    /* EFVP: may be required */
    { id: 'c-efvp-may', stage: 'plan', paths: 'all', on: ['efvp: leave, tech'],
      text: 'Consider asking the Directorate of Innovation, Performance and Quality before the protocol is final.',
      ifText: 'If participants’ information will leave Quebec, or the study acquires, develops or alters technology to handle it, consider asking the Directorate of Innovation, Performance and Quality before the protocol is final.',
      who: 'efvp', link: '/kb/governance/privacy#know-when-an-efvp-is-needed' },
    /* b498 (the b495 pooled look's rows 16 and 17): Levels I to III have c-dta-sites, below, for every study, so c-dta
       is for the other types only, and the two never show together. */
    { id: 'c-dta', stage: { L4i: 'plan', L4o: 'plan', L5: 'plan', 'default': 'submit' }, paths: 'L4i L4o L5 ANY', on: ['efvp: leave'],
      text: 'Before data go to a site outside the MUHC or come from one, all parties must sign a data sharing or transfer agreement.',
      ifText: 'If data will go to a site outside the MUHC or come from one, all parties must sign a data sharing or transfer agreement first.',
      who: 'rf', link: '/kb/conduct/data-documentation/data-security#put-an-agreement-in-place-before-data-leave-or-arrive',
      early: 'Every agreement must be fully executed before MUHC Authorization.' },
    /* b494 (the b493 fact check's A8): SOP-CR-106's Addendum, section 1.1, binds any transfer of information to or from a
       non-MUHC site, not only information leaving Quebec, so a study with other sites sees the same line. Levels I to III
       only: the SOP-CR series binds them, and whether the SOP-LR series sets the same rule for Levels IV and V is asked of QA
       (those levels keep c-dta, on information leaving Quebec, as before). It never shows with c-dta: "!leave" leaves that
       answer to c-dta, and "sureOnly" leaves a Not sure answer to c-dta's "If" line.
       b498 (the b495 pooled look's rows 16 and 17): no answer shows whether data go to or come from a non-MUHC site (a
       Not sure on the sites, or a study whose only site is the MUHC but whose data come from elsewhere in Quebec, reached
       no line), so the step shows to every study at Levels I to III. Its sentence carries its own condition. */
    { id: 'c-dta-sites', stage: 'submit', paths: 'L1 L2D L2S L3',
      text: 'Before data go to a site outside the MUHC or come from one, all parties must sign a data sharing or transfer agreement.',
      who: 'rf', link: '/kb/conduct/data-documentation/data-security#put-an-agreement-in-place-before-data-leave-or-arrive',
      early: 'Every agreement must be fully executed before MUHC Authorization.' },

    /* The study also ... */
    /* The CIM (b488): one step for any answer, with cim/planning's reasons; a step for each answer whose "when" differs;
       and, for every reader who answered None, paths/level-iv's line as a step that may apply, so that nobody misses it. */
    { id: 'c-cim', stage: 'plan', paths: 'L1 L2D L2S L3 L4i L4o ANY', on: ['cim: phase1, infusion, functional, lab, peds, monitor, catalis'],
      text: 'Contact the CIM during feasibility, before you submit the study in Nagano and before the research agreement is signed.',
      ifText: 'If the study may use CIM services, contact the CIM before you submit, to determine whether the CIM can provide them.',
      why: 'If you plan to use the CIM without contacting it, the institutional feasibility review can fail when the CIM does not have the capacity. Adding the CIM after the agreement is signed requires a budget amendment, which delays activation.',
      who: 'cim', link: '/cim/planning#contact-the-cim-before-you-submit' },
    { id: 'c-cim-phase1', stage: 'plan', paths: 'L1 L2D ANY', on: ['cim: phase1'], sureOnly: true,
      text: 'For a Phase I study, contact the CIM during protocol development, before you submit the study to the Research Ethics Board (REB). Phase I capacity is limited, and pre-booking is common.',
      link: '/cim/planning#check-whether-your-study-needs-the-cim' },
    { id: 'c-cim-catalis', stage: 'plan', paths: 'L1 L2D L2S L3 ANY', on: ['cim: catalis'], sureOnly: true,
      text: 'The CIM team is contacted at the same time as the sponsor approaches CATALIS.',
      link: '/cim/planning#check-whether-your-study-needs-the-cim' },
    { id: 'c-cim-platform', stage: 'plan', paths: 'L1 L2D L2S L3 L4i L4o ANY', on: ['cim: functional'], sureOnly: true,
      text: 'For functional testing, contact the CIM to book access to a platform.',
      link: '/cim/planning#check-whether-your-study-needs-the-cim' },
    { id: 'c-cim-lab', stage: 'plan', paths: 'L1 L2D L2S L3 L4i L4o ANY', on: ['cim: lab'], sureOnly: true,
      text: 'For specimen processing or biobanking, contact the CIM to book its services.',
      link: '/cim/planning#check-whether-your-study-needs-the-cim' },
    { id: 'c-cim-peds', stage: 'plan', paths: 'L1 L2D L2S L3 L4i L4o ANY', on: ['cim: peds'], sureOnly: true,
      text: 'Contact the CIM to confirm availability on the pediatric side of the Glen site (Block B) for your patient population and type of study.',
      link: '/cim/planning#check-whether-your-study-needs-the-cim' },
    { id: 'c-cim-monitor', stage: 'plan', paths: 'L1 L2D L2S L3 L4i L4o ANY', on: ['cim: monitor'], sureOnly: true,
      text: 'The CIM can provide both the clinical work and the monitoring for a sponsor-investigator study. A sponsor-investigator who delegates monitoring to the CIM keeps the ultimate responsibility for it.',
      link: '/cim/planning#check-whether-your-study-needs-the-cim' },
    { id: 'g-cim-feas', stage: 'plan', paths: 'L1 L2D L2S L3 L4i L4o ANY', on: ['cim: none'], mayApply: true, sureOnly: true,
      text: 'If your study may use the staff, facilities or platforms of the Centre for Innovative Medicine (CIM), consider involving the CIM at the feasibility stage, before the protocol is final and the budget set.',
      who: 'cim', link: '/cim/planning' },
    { id: 'c-fees', stage: 'plan', paths: 'all', on: ['funding: private'],
      text: 'A study funded wholly or partly by private enterprise is billed the review and authorization fees when the private funding exceeds the exemption amount. Include them in the study budget.',
      ifText: 'If private enterprise funds the study wholly or partly, it may be billed the review and authorization fees. Include them in the study budget.',
      who: 'rf', link: '/kb/funding/budgets-contracts#budget-the-reb-and-authorization-fees' },
    { id: 'c-indig', stage: { L5: 'plan', 'default': 'submit' }, paths: 'all', on: ['also: indigenous'],
      text: 'For research with First Nations, Inuit or Métis participants, communities or data, follow Indigenous Research Ethics.',
      ifText: 'If the research involves First Nations, Inuit or Métis participants, communities or data, follow Indigenous Research Ethics.',
      who: 'rf', link: '/kb/recruitment/indigenous-research-ethics' },
    { id: 'c-cree', stage: 'plan', paths: 'L5', on: ['also: indigenous'],
      text: 'If the study uses as a variable a catchment area that includes Eeyou Istchee, check whether the joint review with the Cree Board of Health and Social Services of James Bay applies.',
      ifText: 'If the study uses as a variable a catchment area that includes Eeyou Istchee, check whether the joint review with the Cree Board of Health and Social Services of James Bay applies.',
      who: 'rf', link: '/kb/recruitment/indigenous-research-ethics#check-whether-the-procedure-applies' },
    /* b494 (A7): SOP-CR-011, section 5.1.1, whose scope is all clinical studies undertaken at the site, binds Levels I to III. */
    { id: 'c-specimens', stage: 'ready', paths: 'L1 L2D L2S L3 L4i L4o', on: ['also: specimens'],
      text: 'Before the study is activated, obtain the instructions for managing the specimens.',
      ifText: 'If the study collects specimens from participants, obtain the instructions for managing them before the study is activated.',
      who: 'rf', link: '/kb/conduct/study-operations/biological-specimens#prepare-before-specimen-collection-starts' },
    { id: 'c-equipment', stage: { L2D: 'plan', L2S: 'plan', 'default': 'ready' }, paths: 'L2D L2S L4i L4o', on: ['also: equipment'],
      text: 'Document what the study will use to take measurements on participants.',
      ifText: 'If the study takes measurements on participants with equipment, document it.',
      who: 'rf', link: '/kb/site-activation/site-setup#calibrate-and-maintain-the-study-equipment' },
    /* b485 (A2): planned at Plan, like the electronic consent of a study Health Canada doesn't regulate. */
    { id: 'c-econsent-hc', stage: 'plan', paths: 'L1 L2D L3', on: ['also: econsent'],
      text: 'In a study regulated by Health Canada, the process for obtaining consent with an electronic consent form should also be well detailed in a written document or work instruction. Submit the electronic consent documents to the REB, which must acknowledge them before you use them.',
      ifText: 'If the study will use electronic consent, the process should be well detailed in a written document or work instruction, since Health Canada regulates the study. Submit the electronic consent documents to the REB, which must acknowledge them before you use them.',
      who: 'rf', link: '/kb/recruitment/consent#meet-the-added-conditions-for-a-study-regulated-by-health-canada' },
    { id: 'c-redcap-no', stage: 'plan', paths: 'L1 L2D L3 ANY', on: ['also: econsent', 'q1: !survey'],
      text: 'The RI-MUHC’s REDCap can’t be used for electronic consent in a study regulated by Health Canada.',
      ifText: 'If the study will use electronic consent and Health Canada regulates the study, the RI-MUHC’s REDCap can’t be used for it.',
      who: 'rf', link: '/kb/recruitment/consent#obtain-consent-remotely-or-electronically' },
    { id: 'c-econsent-other', stage: 'plan', paths: 'L2S L4i L4o ANY', on: ['also: econsent', 'q1: settled'],
      text: 'Before you plan electronic consent in a study that Health Canada doesn’t regulate, ask the Research Facilitator for the guidelines on electronic consent in these studies.',
      ifText: 'If the study will use electronic consent and Health Canada doesn’t regulate it, ask the Research Facilitator for the guidelines on electronic consent before you plan it.',
      who: 'rf', link: '/kb/recruitment/consent#obtain-consent-remotely-or-electronically' },
    { id: 'c-nurse', stage: 'submit', paths: 'L1 L3', on: ['also: nurse'],
      text: 'If a nurse is to dispense the product directly to participants, request the approval in Nagano at submission.',
      ifText: 'If a nurse is to dispense the product directly to participants, request the approval in Nagano at submission.',
      who: 'rf', link: '/kb/conduct/study-operations/investigational-products#ask-for-a-nurse-to-dispense-the-product' },
    { id: 'c-devicedrug', stage: 'plan', paths: 'L1', on: ['also: devicedrug'],
      text: 'If the drug trial uses a Class II, III or IV medical device that is not licensed in Canada, an ITA must be filed for the device, separately from the Clinical Trial Application.',
      ifText: 'If the drug trial uses a Class II, III or IV medical device that is not licensed in Canada, an ITA must be filed for the device, separately from the Clinical Trial Application.',
      who: 'itd', link: '/paths/level-i#place-the-study' },
    { id: 'c-cihr', stage: 'ready', paths: 'L1 L2D L2S L3 L4i', on: ['also: cihr'],
      text: 'The Canadian Institutes of Health Research (CIHR) requires a trial it funds to be registered before the first visit of the first participant, and may set other conditions of funding.',
      ifText: 'If the Canadian Institutes of Health Research (CIHR) funds the trial, it requires the trial to be registered before the first visit of the first participant, and may set other conditions of funding.',
      who: 'rf', link: '/kb/close-out/publications#cihr-funded-trials' },
    { id: 'c-dw', stage: 'plan', paths: 'L5', on: ['also: dw'],
      text: 'The Data Warehouse team recommends a consultation before you finalize the protocol and submit it in Nagano.',
      ifText: 'If the study will use Data Warehouse data, the Data Warehouse team recommends a consultation before you finalize the protocol.',
      who: 'rf', link: '/kb/design-support/patient-data#when-to-use-the-data-warehouse' },
    { id: 'c-mdclone', stage: 'plan', paths: 'L5', on: ['also: dw'],
      text: 'To check feasibility before you request real patient data, explore synthetic MUHC patient data in MDClone.',
      ifText: 'If the study will use Data Warehouse data, you can check feasibility first with synthetic MUHC patient data in MDClone.',
      who: 'rf', link: '/kb/design-support/patient-data#explore-synthetic-data-in-mdclone' },
    { id: 'c-dw-request', stage: 'ready', paths: 'L5', on: ['also: dw'],
      text: 'What you need before the Data Warehouse team releases data depends on the type of data you request.',
      ifText: 'If the study will use Data Warehouse data, what you need before the Data Warehouse team releases them depends on the type of data you request.',
      who: 'rf', link: '/kb/design-support/patient-data#requirements-by-data-type' },
    { id: 'c-provincial', stage: 'plan', paths: 'L5', on: ['also: provincial'],
      text: 'To use Quebec’s provincial administrative databases, follow Real-World Evidence and Pragmatic Trials.',
      ifText: 'If the study will use Quebec’s provincial administrative databases, follow Real-World Evidence and Pragmatic Trials.',
      who: 'rf', link: '/kb/design/real-world-evidence#choose-a-quebec-data-source' },
    { id: 'c-banktype', stage: 'submit', paths: 'L5', on: ['also: biobank'],
      text: 'The bank or registry project type in Nagano is for creating a new bank. A project that only uses an existing bank or registry is non-interventional research, and uses the F11-NIR.',
      ifText: 'If the study only uses an existing bank or registry, it is non-interventional research, and uses the F11-NIR. The bank or registry project type in Nagano is for creating a new bank.',
      who: 'rf', link: '/kb/submission/preparing#choose-the-project-type' },
    { id: 'c-biobank-policy', stage: 'plan', paths: 'L5', on: ['also: biobank'],
      text: 'A biobank may have its own policies on access to its samples, and researchers should be aware of them.',
      ifText: 'If the study uses samples from a biobank, the biobank may have its own policies on access to them.',
      who: 'rf', link: '/paths/retrospective#decide-whether-the-study-needs-consent' },
    { id: 'c-software', stage: 'plan', paths: 'L5', on: ['also: software'],
      text: 'Ask Health Canada’s Investigational Testing division whether the study needs an ITA, and ask the Research Facilitator whether Level V still applies.',
      ifText: 'If the study develops or validates software on the data or samples, ask Health Canada’s Investigational Testing division whether it needs an ITA, and ask the Research Facilitator whether Level V still applies.',
      who: 'itd', link: '/kb/design/software-medical-devices#develop-or-validate-software-on-existing-data-or-samples' }
  ];

  /* Each step's link sits on its key words (b483), not on the whole line: the words below, found in the step's line
     (and in its "If" line), case aside. MAILS gives the offices a step names with their address. */
  var KW = {
    'g-research': 'screening questions',
    'g-hc-place': 'whether Health Canada must authorize',
    'g-hc-device': 'investigational testing authorization (ITA)',
    'c-hc-cta': 'Clinical Trial Application (CTA)',
    'c-hc-div5': 'Division 5 of the Food and Drug Regulations',
    'c-hc-nhp': 'Health Canada’s authorization',
    'c-hc-nhp-label': 'a clinical trial that Health Canada regulates',
    'c-ita-yes': 'investigational testing authorization (ITA)',
    'c-ita-offlabel': 'needs an ITA',
    'c-other-sponsor': 'sponsor is the individual',
    'c-sponsor-unsure': 'Who sponsors the study',
    'c-si-protocol': 'Develop the protocol',
    'c-si-budget': 'study budget',
    'g-feas': 'feasibility',
    'g-checklist': 'Study Feasibility Checklist',
    'g-ip-storage': 'space for storing the investigational product',
    'g-protocol-review': 'review the whole protocol',
    'g-protocol-design': 'Design the protocol',
    'g-actctu': 'full protocol',
    'g-data-plan': 'how identifiable the data will be',
    'g-stats': 'Biostatistics Consulting Unit (BCU)',
    'g-redcap': 'Capture and Optimization of Research Data (CORD)',
    'g-consent-decide': 'participants must give informed consent',
    'g-budget': 'study budget',
    'g-agreement-need': 'research agreement',
    'g-fund': 'request the study’s research account',
    'g-cred': 'Human Research Privileges, Researcher Status or a written institutional authorization',
    'g-train': 'the study’s level',
    'g-backup': 'principal investigator’s backup',
    'g-consent-form': 'Prepare the consent form',
    'g-ip-letterhead': 'MUHC letterhead',
    'g-recruit-mat': 'recruitment material',
    'g-nagano': 'project type',
    'g-docs': 'the documents the RI-MUHC’s SOPs list',
    'g-dept': 'head of each department',
    'g-coi': 'conflict of interest',
    'g-f11-services': 'questions on services and data access',
    'g-pharmacy': 'pharmacy’s feasibility review',
    'g-mycontracts': 'My Contracts',
    'g-no-sign': 'Research Agreements Office',
    'g-agreements-exec': 'fully executed',
    'g-reb-answer': 'the REB’s deadline for replies',
    'g-wait': 'both REB approval and MUHC Authorization',
    'g-file-letter': 'printed letter',
    'g-isf': 'investigator site file',
    'g-pharm-siv': 'MUHC Pharmacy',
    'g-tdl': 'Task Delegation Log',
    'g-register': 'public registry',
    'g-go': 'go letter',
    'g-confid': 'MUHC Confidentiality and Security Agreement',
    'g-controls': 'controls',
    'g-breach': 'report it to the REB',
    'g-reid': 'Report it to the REB',
    'g-consent-obtain': 'Obtain consent',
    'g-rule2': 'current REB-approved consent form',
    'g-screen': 'Screening Log',
    'g-medrec': 'notify MUHC Medical Records Services',
    'g-wallet': 'wallet-size card',
    'g-pay': 'Quebec’s limits',
    'g-data-record': 'source documents',
    'g-ae': 'AE Assessment Log',
    'g-rule4': 'Report every serious adverse event to the sponsor',
    'g-reb-sae': 'the REB’s three criteria',
    'g-events-reb': 'events the REB lists',
    'g-pregnancy': 'exposure in utero reports',
    'g-deviations': 'protocol deviation',
    'g-ip-manage': 'investigational product’s path at the site',
    'g-device-acc': 'accountability records',
    'g-consent-current': 'consent valid',
    'g-amend': 'wait for every approval it needs',
    'g-coi-update': 'conflicts of interest',
    'g-renew': 'continuing review',
    'g-tdl-update': 'Task Delegation Log',
    'g-monitor': 'monitoring visit',
    'g-audit-notify': 'planned audit or inspection',
    'g-closeout-visit': 'close-out visit',
    'g-ip-account': 'in the log',
    'g-ip-account-p4': 'some drugs',
    'g-f10': 'Closure of Research Project form',
    'g-archive': 'retention period',
    'g-results': 'make their results public',
    'g-early-stop': 'inform the participants and the REB immediately',
    'c-type': 'whether Health Canada must authorize',
    'c-hc-wait': 'Health Canada’s authorization',
    'c-radio-div3': 'Division 3 of the Food and Drug Regulations',
    'c-radio-pharm': 'MUHC Research Pharmacy',
    'c-marketed': 'report adverse reactions',
    'c-hospital-device': 'the hospital must report an incident',
    'c-ind-questionnaire': 'feasibility questionnaire',
    'c-ind-cda': 'confidentiality agreement',
    'c-ind-budget': 'negotiates the budget',
    'c-catalis': 'FAST TRACK Evaluation Service',
    'c-si-weigh': 'sponsor’s obligations',
    'c-si-fund': 'research account',
    'c-si-insurance': 'RI-MUHC’s policy',
    'c-si-monitor': 'independent monitor',
    'c-si-tmf': 'trial master file',
    'c-si-safety': 'plan for monitoring safety',
    'c-si-apply': 'apply to Health Canada',
    'c-si-gmp': 'good manufacturing practices',
    'c-si-ita': 'can apply for',
    'c-si-device-qa': 'earliest stage of planning',
    'c-si-device-gcp': 'Declaration of Helsinki, ISO 14155 and ISO 14971',
    'c-si-ctgov': 'organization account',
    'c-si-report-hc': 'Health Canada’s criteria',
    'c-si-hc-obligations': 'sponsor’s other obligations to Health Canada',
    'c-civil': 'who consents',
    'c-peds': 'Pediatric Research Considerations',
    'c-vuln': 'Research with Participants in Vulnerable Circumstances',
    'c-delegated': 'delegated review',
    'c-peds-l5': 'Pediatrics panel',
    'c-consent-l5': 'who consents',
    'c-mc': 'Multi-Centric Studies in Quebec',
    'c-meo': 'MEO file',
    'c-meo-sae': 'related or possibly related to the study',
    'c-other-site-sae': 'a report to the REB',
    'c-cross': 'International and Cross-Border Studies',
    'c-prescreen': 'an approved EFVP',
    'c-noconsent': 'approved EFVP',
    'c-waiver': 'Tri-Council Policy Statement (TCPS 2)',
    'c-f18': 'completed in French',
    'c-muhc-agreement': 'written agreement with the MUHC',
    'c-helpers': 'obligations of your agreement',
    'c-destroy': 'destroy the information',
    'c-efvp-may': 'may need an EFVP',
    'c-dta': 'data sharing or transfer agreement',
    'c-dta-sites': 'data sharing or transfer agreement',
    'c-cim': 'before you submit',
    'c-cim-phase1': 'Phase I capacity is limited',
    'c-cim-catalis': 'CATALIS FAST TRACK',
    'c-cim-platform': 'book access to a platform',
    'c-cim-lab': 'book the laboratory’s services',
    'c-cim-peds': 'pediatric side of the Glen site',
    'c-cim-monitor': 'ultimate responsibility',
    'g-cim-feas': 'Centre for Innovative Medicine (CIM)',
    'c-fees': 'review and authorization fees',
    'c-indig': 'Indigenous Research Ethics',
    'c-cree': 'joint review with the Cree Board of Health and Social Services of James Bay',
    'c-specimens': 'obtain the instructions',
    'c-equipment': 'document the equipment',
    'c-econsent-hc': 'written document or work instruction',
    'c-redcap-no': 'REDCap',
    'c-econsent-other': 'electronic consent',
    'c-nurse': 'request the approval in Nagano',
    'c-devicedrug': 'an ITA must be filed for the device',
    'c-cihr': 'registered before the first visit of the first participant',
    'c-dw': 'consultation',
    'c-mdclone': 'MDClone',
    'c-dw-request': 'different requirements',
    'c-provincial': 'Real-World Evidence and Pragmatic Trials',
    'c-banktype': 'F11-NIR',
    'c-biobank-policy': 'its own policies',
    'c-software': 'needs an ITA'
  };
  var MAILS = {
    'c-hospital-device': [['Quality Assurance', 'qa']],
    'c-sponsor-unsure': [['Research Facilitator', 'rf']],
    'c-catalis': [['Research Facilitator', 'rf']],
    'c-si-device-qa': [['Quality Assurance', 'qa'], ['Research Facilitator', 'rf']],
    'c-peds-l5': [['Research Facilitator', 'rf']],
    'c-efvp-may': [['Directorate of Innovation, Performance and Quality', 'efvp']],
    'c-cim': [['the CIM', 'cim']], 'c-cim-phase1': [['the CIM', 'cim']], 'c-cim-catalis': [['the CIM team', 'cim']],
    'c-cim-platform': [['contact the CIM', 'cim']], 'c-cim-lab': [['contact the CIM', 'cim']], 'c-cim-peds': [['contact the CIM', 'cim']],
    'g-cim-feas': [['involving the CIM', 'cim']],
    'c-econsent-other': [['Research Facilitator', 'rf']],
    'c-software': [['Investigational Testing division', 'itd'], ['Research Facilitator', 'rf']]
  };

  /* b488 (MF, ledger rows 424 to 432): each stage's steps in short themed groups, the same groups for every type of study,
     in the order a reader acts. Each group: its heading and a Font Awesome icon the Hub already loads (Mintlify's own set). */
  var GROUPS = {
    plan: [
      { id: 'p-research', title: 'Research or quality improvement',     icon: 'flask' },
      { id: 'p-hc',       title: 'Health Canada’s authorization',        icon: 'scale-balanced' },
      { id: 'p-commit',   title: 'Before you commit to the study',      icon: 'handshake' },
      { id: 'p-site',     title: 'Check that the site can carry it out', icon: 'clipboard-check' },
      { id: 'p-data',     title: 'Privacy and the data',                icon: 'lock' },
      { id: 'p-protocol', title: 'The protocol',                        icon: 'file-lines' },
      { id: 'p-sponsor',  title: 'The sponsor’s duties',                icon: 'user-shield' },
      { id: 'p-money',    title: 'Budget, funding and agreements',      icon: 'coins' },
      { id: 'p-consent',  title: 'Consent and participants',            icon: 'file-signature' },
      { id: 'p-team',     title: 'The team and its training',           icon: 'users' }
    ],
    submit: [
      { id: 's-nagano', title: 'Prepare the submission in Nagano', icon: 'paper-plane' },
      { id: 's-agree',  title: 'Agreements',                       icon: 'file-contract' },
      { id: 's-review', title: 'Reviews the study needs',          icon: 'list-check' },
      { id: 's-wait',   title: 'While you wait for approval',      icon: 'hourglass-half' }
    ],
    ready: [
      { id: 'r-site',     title: 'Prepare the site',              icon: 'hospital' },
      { id: 'r-team',     title: 'Delegated tasks',               icon: 'users' },
      { id: 'r-access',   title: 'Get access to the data',        icon: 'folder-open' },
      { id: 'r-protect',  title: 'Protect the information',       icon: 'shield-halved' },
      { id: 'r-register', title: 'Register the trial',            icon: 'clipboard-list' },
      { id: 'r-start',    title: 'Permission to start',           icon: 'circle-check' }
    ],
    recruit: [
      { id: 'e-consent', title: 'Consent and payments',          icon: 'file-signature' },
      { id: 'e-enrol',   title: 'Screen and enrol participants', icon: 'user-check' }
    ],
    run: [
      { id: 'u-data',    title: 'Data, records and privacy',          icon: 'folder-open' },
      { id: 'u-safety',  title: 'Adverse events and deviations',      icon: 'heart-pulse' },
      { id: 'u-current', title: 'Keep consent and approvals current', icon: 'arrows-rotate' },
      /* b491 (the coordinator, from b488's report): the Task Delegation Log and the sponsor's duties had sat under headings that don't fit them. */
      { id: 'u-sponsor', title: 'The sponsor’s duties',               icon: 'user-shield' },
      { id: 'u-team',    title: 'Delegated tasks',                    icon: 'users' },
      { id: 'u-monitor', title: 'Monitoring and audits',              icon: 'magnifying-glass' }
    ],
    close: [
      { id: 'x-close',   title: 'Close the study',     icon: 'flag-checkered' },
      { id: 'x-archive', title: 'Archive and publish', icon: 'box-archive' }
    ]
  };
  var ICON_BASE = 'https://d3gk2c5xim1je2.cloudfront.net/fontawesome/v7.2.0/regular/';

  /* Each step's group. A step whose stage differs by type of study has a group for each stage it can fall in. */
  var STEP_GROUP = {
    'g-research': 'p-research', 'g-hc-place': 'p-hc', 'c-hc-cta': 'p-hc', 'c-hc-div5': 'p-hc', 'c-hc-nhp': 'p-hc',
    'c-hc-nhp-label': 'p-hc', 'g-hc-device': 'p-hc', 'c-ita-yes': 'p-hc', 'c-ita-offlabel': 'p-hc', 'c-type': 'p-hc',
    'c-radio-div3': 'p-hc', 'c-devicedrug': 'p-hc', 'c-software': 'p-hc',
    'c-sponsor-unsure': 'p-commit', 'c-ind-cda': 'p-commit', 'c-ind-questionnaire': 'p-commit', 'c-si-weigh': 'p-commit', 'c-other-sponsor': 'p-commit', 'c-catalis': 'p-commit',
    'g-feas': 'p-site', 'g-checklist': 'p-site', 'g-ip-storage': 'p-site', 'g-protocol-review': 'p-site', 'c-radio-pharm': 'p-site',
    'c-cim': 'p-site', 'c-cim-phase1': 'p-site', 'c-cim-catalis': 'p-site', 'c-cim-platform': 'p-site', 'c-cim-lab': 'p-site',
    'c-cim-peds': 'p-site', 'c-cim-monitor': 'p-site', 'g-cim-feas': 'p-site',
    'g-data-plan': 'p-data', 'c-waiver': 'p-data', 'c-efvp-may': 'p-data', 'c-cree': 'p-data', 'c-dw': 'p-data', 'c-mdclone': 'p-data',
    'c-provincial': 'p-data', 'c-biobank-policy': 'p-data',
    'c-si-protocol': 'p-protocol', 'g-protocol-design': 'p-protocol', 'g-actctu': 'p-protocol', 'g-stats': 'p-protocol', 'g-redcap': 'p-protocol',
    'c-si-insurance': 'p-sponsor', 'c-si-monitor': 'p-sponsor', 'c-si-tmf': 'p-sponsor', 'c-si-safety': 'p-sponsor', 'c-si-apply': 'p-sponsor',
    'c-si-gmp': 'p-sponsor', 'c-si-ita': 'p-sponsor', 'c-si-device-qa': 'p-sponsor', 'c-si-device-gcp': 'p-sponsor',
    'g-budget': 'p-money', 'c-si-budget': 'p-money', 'c-ind-budget': 'p-money', 'c-fees': 'p-money', 'g-agreement-need': 'p-money',
    'g-fund': 'p-money', 'c-si-fund': 'p-money',
    'g-consent-decide': 'p-consent', 'g-consent-form': 'p-consent', 'g-ip-letterhead': 'p-consent', 'g-recruit-mat': 'p-consent',
    'c-civil': 'p-consent', 'c-peds': 'p-consent', 'c-vuln': 'p-consent', 'c-consent-l5': 'p-consent', 'c-econsent-hc': 'p-consent',
    'c-redcap-no': 'p-consent', 'c-econsent-other': 'p-consent',
    'g-cred': 'p-team', 'g-train': 'p-team', 'g-backup': 'p-team',
    'g-nagano': 's-nagano', 'g-docs': 's-nagano', 'g-dept': 's-nagano', 'g-coi': 's-nagano', 'g-f11-services': 's-nagano',
    'g-pharmacy': 's-nagano', 'c-nurse': 's-nagano', 'c-banktype': 's-nagano', 'c-f18': 's-nagano',
    'g-mycontracts': 's-agree', 'g-no-sign': 's-agree', 'g-agreements-exec': 's-agree', 'c-muhc-agreement': 's-agree',
    'c-hc-wait': 's-review', 'c-prescreen': 's-review', 'c-mc': 's-review', 'c-meo': 's-review', 'c-cross': 's-review',
    'c-delegated': 's-review', 'c-peds-l5': 's-review',
    'g-reb-answer': 's-wait', 'g-wait': 's-wait', 'g-isf': 's-wait', 'g-file-letter': 's-wait',
    'g-pharm-siv': 'r-site', 'g-tdl': 'r-team', 'c-specimens': 'r-site',
    'g-confid': 'r-access', 'c-dw-request': 'r-access',
    'c-helpers': 'r-protect',
    'c-si-ctgov': 'r-register', 'c-cihr': 'r-register',
    'g-go': 'r-start',
    'g-consent-obtain': 'e-consent', 'g-rule2': 'e-consent',
    'g-screen': 'e-enrol', 'g-medrec': 'e-enrol', 'g-wallet': 'e-enrol', 'g-pay': 'e-consent',
    'g-data-record': 'u-data', 'g-ip-manage': 'u-data', 'g-device-acc': 'u-data', 'g-tdl-update': 'u-team',
    'g-ae': 'u-safety', 'g-rule4': 'u-safety', 'g-reb-sae': 'u-safety', 'g-events-reb': 'u-safety', 'g-pregnancy': 'u-safety',
    'g-deviations': 'u-safety', 'c-marketed': 'u-safety', 'c-hospital-device': 'u-safety', 'c-si-report-hc': 'u-safety',
    'c-meo-sae': 'u-safety', 'c-other-site-sae': 'u-safety',
    'g-consent-current': 'u-current', 'g-amend': 'u-current', 'g-coi-update': 'u-current', 'g-renew': 'u-current', 'c-si-hc-obligations': 'u-sponsor',
    'g-monitor': 'u-monitor', 'g-audit-notify': 'u-monitor', 'g-closeout-visit': 'u-monitor',
    'g-ip-account': 'x-close', 'g-ip-account-p4': 'x-close', 'g-f10': 'x-close', 'g-early-stop': 'x-close',
    'g-archive': 'x-archive', 'g-results': 'x-archive', 'c-destroy': 'x-archive',
    /* by stage */
    'g-register': { plan: 'p-sponsor', ready: 'r-register' },
    'g-controls': { ready: 'r-protect', run: 'u-data' },
    'g-breach': { ready: 'r-protect', run: 'u-data' },
    'g-reid': { ready: 'r-protect', run: 'u-data' },
    'c-noconsent': { plan: 'p-data', submit: 's-review' },
    'c-dta': { plan: 'p-money', submit: 's-agree' },
    'c-dta-sites': 's-agree',
    'c-indig': { plan: 'p-data', submit: 's-review' },
    'c-equipment': { plan: 'p-site', ready: 'r-site' }
  };

  /* Each step's short name, shown in bold before its sentence: two to four words naming the thing, from the step's own words. */
  var NAMES = {
    'g-research': 'Screening questions', 'g-hc-place': 'Health Canada’s authorization', 'c-hc-cta': 'Clinical Trial Application',
    'c-hc-div5': 'Still regulated', 'c-hc-nhp': 'Authorization required', 'c-hc-nhp-label': 'Within the product’s licence',
    'g-hc-device': 'Whether an ITA applies', 'c-ita-yes': 'ITA required',
    'c-ita-offlabel': 'Outside its licensed indications', 'c-type': 'Health Canada’s authorization', 'c-radio-div3': 'A different authorization',
    'c-devicedrug': 'An unlicensed device', 'c-software': 'Software on the data',
    'c-ind-cda': 'Confidentiality agreement', 'c-ind-questionnaire': 'Feasibility questionnaire', 'c-si-weigh': 'The sponsor’s obligations',
    'c-sponsor-unsure': 'Sponsorship', 'c-catalis': 'CATALIS FAST TRACK',
    'g-feas': 'Feasibility', 'g-checklist': 'Study Feasibility Checklist', 'g-ip-storage': 'Storage space', 'g-protocol-review': 'Protocol review',
    'c-radio-pharm': 'MUHC Research Pharmacy', 'c-cim': 'CIM timing', 'c-cim-phase1': 'Limited capacity', 'c-cim-catalis': 'FAST TRACK timing',
    'c-cim-platform': 'CIM platforms', 'c-cim-lab': 'CIM laboratory', 'c-cim-peds': 'CIM pediatric space', 'c-cim-monitor': 'CIM monitoring',
    'g-cim-feas': 'Planning with the CIM',
    'g-data-plan': 'Choosing the data', 'c-waiver': 'Use without consent', 'c-efvp-may': 'EFVP may be required', 'c-cree': 'Cree joint review',
    'c-dw': 'Data Warehouse advice', 'c-mdclone': 'Synthetic data', 'c-provincial': 'Quebec’s provincial databases', 'c-biobank-policy': 'Biobank policies',
    'c-si-protocol': 'Writing the protocol', 'g-protocol-design': 'What the protocol sets', 'g-actctu': 'Protocol template', 'g-stats': 'Statistical advice',
    'g-redcap': 'Data collection in REDCap',
    'c-si-insurance': 'Insurance', 'c-si-monitor': 'Monitoring independence', 'c-si-tmf': 'Sponsor’s files', 'c-si-safety': 'Monitoring plan',
    'c-si-apply': 'Application to Health Canada', 'c-si-gmp': 'Manufacturing and storage', 'c-si-ita': 'Applying for an ITA',
    'c-si-device-qa': 'Early advice', 'c-si-device-gcp': 'ISO 14155 and 14971',
    'g-budget': 'Study budget', 'c-si-budget': 'Study budget', 'c-ind-budget': 'Study budget', 'c-fees': 'Fees for private funding',
    'g-agreement-need': 'Research agreement', 'g-fund': 'Grant and research account', 'c-si-fund': 'Grant and research account',
    'g-consent-decide': 'Consent, if feasible', 'g-consent-form': 'Consent form', 'g-ip-letterhead': 'Consent form layout', 'g-recruit-mat': 'Recruitment materials',
    'c-civil': 'Consent for others', 'c-peds': 'Minors', 'c-vuln': 'Adults unable to consent', 'c-consent-l5': 'Consent on another’s behalf',
    'c-econsent-hc': 'Documented process', 'c-redcap-no': 'REDCap’s limit', 'c-econsent-other': 'Guidelines first',
    'g-cred': 'Credential', 'g-train': 'Training level', 'g-backup': 'A backup',
    'g-nagano': 'Project type', 'g-docs': 'Documents with the F11', 'g-dept': 'Department heads', 'g-coi': 'Conflicts of interest',
    'g-f11-services': 'Service questions', 'g-pharmacy': 'Pharmacy’s feasibility review', 'c-nurse': 'A nurse dispenses',
    'c-banktype': 'Using an existing bank', 'c-f18': 'The EFVP form (F18)',
    'g-mycontracts': 'Agreements in My Contracts', 'g-no-sign': 'Review first', 'g-agreements-exec': 'Signed by all parties',
    'c-muhc-agreement': 'Signing the terms',
    'c-hc-wait': 'Waiting for Health Canada', 'c-prescreen': 'Records before consent', 'c-mc': 'Several Quebec institutions', 'c-meo': 'Participating site file',
    'c-cross': 'Sites outside Quebec', 'c-delegated': 'No delegated review', 'c-peds-l5': 'Studies of children',
    'g-reb-answer': 'The REB’s requests', 'g-wait': 'Both approvals first', 'g-isf': 'Investigator site file', 'g-file-letter': 'REB approval letter',
    'g-pharm-siv': 'MUHC Pharmacy', 'g-tdl': 'Training first', 'c-specimens': 'Handling specimens',
    'g-confid': 'Medical records access', 'c-dw-request': 'Data release',
    'g-reid': 'Re-identified participants', 'c-helpers': 'People who help', 'c-si-ctgov': 'The MUHC’s account', 'c-cihr': 'CIHR funding',
    'g-go': 'Go letter',
    'g-consent-obtain': 'The consent process', 'g-rule2': 'Signatures before screening',
    'g-screen': 'Screening Log', 'g-medrec': 'Medical records notices', 'g-wallet': 'Wallet card', 'g-pay': 'Compensation',
    'g-data-record': 'Data integrity', 'g-ip-manage': 'The product’s path', 'g-device-acc': 'Device accountability',
    'g-tdl-update': 'Keeping the log current',
    'g-ae': 'Event assessment', 'g-rule4': 'Safety reporting', 'g-reb-sae': 'Expedited reports', 'g-events-reb': 'Reportable events',
    'g-pregnancy': 'Pregnancy', 'g-deviations': 'Deviation tiers', 'c-marketed': 'Reaction reports', 'c-hospital-device': 'Device incidents',
    'c-si-report-hc': 'Reports to Health Canada', 'c-meo-sae': 'The other REB', 'c-other-site-sae': 'Other sites',
    'g-consent-current': 'Valid consent', 'g-amend': 'Changes to the study', 'g-coi-update': 'Conflicts during the study', 'g-renew': 'Renewal', 'c-si-hc-obligations': 'After the start',
    'g-monitor': 'The sponsor’s monitor', 'g-audit-notify': 'Audits and inspections', 'g-closeout-visit': 'Preparing for close-out',
    'g-ip-account': 'Product accountability', 'g-ip-account-p4': 'Phase IV accountability', 'g-f10': 'The F10', 'g-early-stop': 'A trial stopped early',
    'g-archive': 'Retention period', 'g-results': 'Publication', 'c-destroy': 'Destroying the information',
    'g-register': 'Trial registration', 'g-controls': 'Data controls', 'g-breach': 'Lost information',
    'c-noconsent': 'EFVP required', 'c-dta': 'Data sharing agreement', 'c-dta-sites': 'Data sharing agreement', 'c-indig': 'Indigenous participants', 'c-equipment': 'Study equipment'
  };

  /* b491 (the coordinator's finding: bold names that repeat their sentence): where the sentence no longer names the
     step's destination, the link sits on the bold name, the words that name it. */
  var ON_NAME = [];
  STEPS.forEach(function (s) {
    var k = KW[s.id] ? KW[s.id].toLowerCase() : null;
    var inLines = k && s.text.toLowerCase().indexOf(k) > -1 && (!s.ifText || s.ifText.toLowerCase().indexOf(k) > -1);
    s.kwName = !inLines;
    if (s.kwName) { KW[s.id] = null; ON_NAME.push(s.id); }
  });
  STEPS.forEach(function (s) { s.kw = KW[s.id] || null; s.mails = MAILS[s.id] || null; s.name = NAMES[s.id] || null; s.group = STEP_GROUP[s.id] || null; });
  /* The key words of each "Common mix-up" line's link, by question and place. */
  var MIX_KW = {
    'q1.0': 'a clinical trial that Health Canada regulates', 'q1.1': 'a drug study',
    'q2device.0': 'as sold', 'q3.0': 'sponsor-investigator', 'q4.0': 'no age for assent',
    'q5.0': 'not a multi-centric study', 'q6.0': 'approved EFVP', 'q6.1': 'Information leaving Quebec',
    'q6.2': 'still requires an EFVP', 'q7.0': 'review and authorization fees', 'qcim.0': 'CIM services',
    'q8.0': 'MUHC Authorization'
  };
  /* Where each "Common mix-up" line shows (b483, MF): under the step it is about, in the result, and only when that
     step shows ("paths" limits it to some types of study). A mix-up with no step stays behind its screen's "Why we ask".
     b485 (the logic review's B16): a mix-up that helps a reader choose an answer stays behind its screen, because a step
     that shows only to readers who chose that answer reaches no one who needs it. "forStep" marks a mix-up placed under a
     step that depends on the mix-up's own question, because the mix-up is a fact for the readers that step reaches. */
  var MIX_STEP = {
    'q2device.0': { steps: ['g-hc-device', 'c-ita-yes'], forStep: true }, 'q4.0': { steps: ['c-peds'], forStep: true },
    'q5.0': { steps: ['c-cross'], forStep: true }, 'q6.2': { steps: ['g-research'] },
    'q8.0': { steps: ['g-wait'], paths: 'L1 L2D L2S L3 L4i L4o ANY' }
  };
  var MIX_BY_STEP = {};
  QUESTIONS.forEach(function (q) { (q.mixups || []).forEach(function (m, i) {
    var key = q.id + '.' + i, place = MIX_STEP[key];
    m.key = key; m.kw = MIX_KW[key] || null; m.q = q.key;
    if (place) {
      m.steps = place.steps; m.step = place.steps[0]; m.forStep = !!place.forStep;
      if (place.paths) m.paths = place.paths;
      place.steps.forEach(function (st) { (MIX_BY_STEP[st] = MIX_BY_STEP[st] || []).push(m); });
    }
  }); });

  /* ======================================================================
     2. LOGIC
     ====================================================================== */

  var STAGE_ORDER = ['plan', 'submit', 'ready', 'recruit', 'run', 'close'];
  var UNSURE = 'unsure';

  function has(list, word) { return list === 'all' || (' ' + list + ' ').indexOf(' ' + word + ' ') > -1; }

  /* The type of study, from the first answer. */
  function pathOf(a) {
    return { drug: 'L1', device: 'L2D', surgery: 'L2S', nhp: 'L3', change: 'L4i', follow: 'L4o', records: 'L5', survey: 'ANY', unsure: 'ANY' }[a.q1] || null;
  }

  /* Whether Health Canada must authorize the study: yes, no or unsure. */
  function authOf(a, p) {
    if (p === 'L1') return { outside: 'yes', radio: 'yes', within: 'no' }[a.hc] || UNSURE;
    if (p === 'L3') return { outside: 'yes', label: 'no' }[a.hc] || UNSURE;
    if (p === 'L2D') return { unlicensed: 'yes', licensed: 'no', class1: 'no' }[a.hc] || UNSURE;
    return 'no';
  }

  function qTitle(q, p) { return (p === 'L5' && q.titleL5) ? q.titleL5 : q.title; }
  function qWhy(q, p) { return (p === 'L5' && q.whyL5) ? q.whyL5 : q.why; }

  /* The mix-ups that sit behind a screen's toggle: those with no step. */
  function screenMixups(q, p) { return (q.mixups || []).filter(function (m) { return !m.step && (!m.paths || has(m.paths, p || 'ANY')); }); }
  /* The mix-ups shown under a step in the result. */
  function stepMixups(id, p) { return (MIX_BY_STEP[id] || []).filter(function (m) { return !m.paths || has(m.paths, p); }); }

  function visibleQuestions(a) {
    var p = pathOf(a);
    return QUESTIONS.filter(function (q) {
      if (q.id === 'q1') return true;
      if (!p) return false;
      return has(q.show, p);
    });
  }

  /* b491: an answer that an earlier answer already settles is not offered ("notWhen": "key: values"). For a multi-choice
     earlier answer, it is hidden only when every value given is among those listed (so "adults, none" hides an answer
     unless "minors" or "Not sure" was given). With no answers passed, every answer is offered. */
  function settledAway(o, a) {
    if (!o.notWhen || !a) return false;
    var parts = o.notWhen.split(':'), key = parts[0].trim();
    var vals = parts[1].split(',').map(function (x) { return x.trim(); });
    var given = asList(a[key]);
    if (!given.length) return false;
    return given.every(function (v) { return vals.indexOf(v) > -1; });
  }
  function optionsFor(q, p, a) {
    var opts = [];
    (q.groups || []).forEach(function (g) {
      g.options.forEach(function (o) { if (!o.notFor || !has(o.notFor, p)) opts.push(o); });
    });
    q.options.forEach(function (o) {
      if (o.notFor && has(o.notFor, p)) return;
      if (o.paths && !has(o.paths, p)) return;
      if (settledAway(o, a)) return;
      opts.push(o);
    });
    return opts;
  }

  function asList(v) { return Array.isArray(v) ? v : (v == null ? [] : [v]); }

  /* A step's "on" list for a type of study: a list, or a map by type (b485). */
  function onOf(step, p) {
    if (!step.on) return null;
    if (Array.isArray(step.on)) return step.on;
    var o = step.on.hasOwnProperty(p) ? step.on[p] : step.on['default'];
    return o || null;
  }

  /* One entry of a step's "on" list: true, false or "maybe" (the answer is Not sure). */
  function testEntry(entry, a, p) {
    var parts = entry.split(':');
    var key = parts[0].trim();
    var vals = parts[1].split(',').map(function (s) { return s.trim(); });
    if (key === 'q1' && vals[0] === 'settled') return a.q1 === UNSURE ? 'maybe' : true;
    if (key === 'auth') {
      var au = authOf(a, p);
      if (au === UNSURE) return 'maybe';
      return vals.indexOf(au) > -1;
    }
    /* Private enterprise funds the study: a company sponsors it, or the reader ticked private money (b485, A1). */
    if (key === 'funding') {
      var al = asList(a.also);
      if (a.sponsor === 'industry' || al.indexOf('private') > -1) return true;
      if (al.indexOf(UNSURE) > -1 || a.sponsor === UNSURE) return 'maybe';
      return false;
    }
    var ans = asList(a[key]);
    if (ans.indexOf(UNSURE) > -1) return 'maybe';
    if (key === 'hc' && a.hc === UNSURE) return 'maybe';
    /* "!x": the answer must not hold x (b485, B6). */
    var pos = vals.filter(function (v) { return v.charAt(0) !== '!'; });
    var neg = vals.filter(function (v) { return v.charAt(0) === '!'; }).map(function (v) { return v.slice(1); });
    for (var j = 0; j < neg.length; j++) if (ans.indexOf(neg[j]) > -1) return false;
    if (!pos.length) return true;
    for (var i = 0; i < pos.length; i++) if (ans.indexOf(pos[i]) > -1) return true;
    return false;
  }

  /* Which question a "maybe" comes from, so the reader sees who can settle it. */
  function maybeSource(step, a, p) {
    var out = [];
    (onOf(step, p) || []).forEach(function (e) {
      if (testEntry(e, a, p) === 'maybe') {
        var key = e.split(':')[0].trim();
        if (key === 'funding') {
          if (a.sponsor === UNSURE) out.push('sponsor');
          if (asList(a.also).indexOf(UNSURE) > -1) out.push('also');
        } else out.push(key === 'auth' ? 'hc' : key);
      }
    });
    return out;
  }

  /* An answer whose Not sure gives one line in place of every step it decides (b488). */
  var COLLAPSE = { sponsor: 'c-sponsor-unsure' };
  function reads(step, p, key) { return (onOf(step, p) || []).some(function (e) { return e.split(':')[0].trim() === key; }); }

  function stepApplies(step, a, p) {
    if (!has(step.paths, p)) return false;
    for (var ck in COLLAPSE) if (asList(a[ck]).indexOf(UNSURE) > -1 && step.id !== COLLAPSE[ck] && reads(step, p, ck)) return false;
    var on = onOf(step, p);
    if (!on) return true;
    var maybe = false;
    for (var i = 0; i < on.length; i++) {
      var r = testEntry(on[i], a, p);
      if (r === false) return false;
      if (r === 'maybe') maybe = true;
    }
    /* A "sureOnly" step leaves a Not sure answer to another step's "If" line. */
    if (maybe && step.sureOnly) return false;
    /* A "mayApply" step is a step that may apply whatever the answers (b488: the CIM line for readers who answered None). */
    if (step.mayApply) return 'maybe';
    return maybe ? 'maybe' : true;
  }

  /* A click on an answer of a multi-choice question: the new list of answers (b485, B6). An exclusive answer clears
     the others and is cleared by them; an answer that "clears" another unchecks it. */
  function toggleAnswer(q, p, current, v, checked) {
    var opts = optionsFor(q, p);
    var o = opts.filter(function (x) { return x.v === v; })[0];
    var list = asList(current).slice();
    if (!checked) return list.filter(function (x) { return x !== v; });
    if (o && o.exclusive) return [v];
    list = list.filter(function (x) {
      var ox = opts.filter(function (y) { return y.v === x; })[0];
      if (ox && ox.exclusive) return false;
      if (o && o.clears === x) return false;
      return x !== v;
    });
    list.push(v);
    return list;
  }

  function stageOf(step, p) {
    if (typeof step.stage === 'string') return step.stage;
    return step.stage[p] || step.stage['default'];
  }

  /* A step's group at a stage (b488). */
  function groupOf(step, st) {
    var g = step.group;
    if (!g) return null;
    return typeof g === 'string' ? g : (g[st] || null);
  }

  function stagesFor(p) {
    return STAGES.filter(function (s) { return !(p === 'L5' && s.noL5); });
  }

  function pick(obj, field, p) {
    if (p === 'L5' && obj[field + 'L5']) return obj[field + 'L5'];
    if (p === 'L4o' && obj[field + 'L4o']) return obj[field + 'L4o'];
    return obj[field];
  }

  function whoOf(step, p) {
    if (!step.who) return CONTACTS.rf;
    if (typeof step.who === 'string') return CONTACTS[step.who];
    return CONTACTS[step.who[p] || step.who['default']];
  }

  /* The result: every stage with its steps; which stage is open; the early items. */
  function buildResult(a) {
    var p = pathOf(a);
    var stages = stagesFor(p);
    var open = (a.stage && a.stage !== UNSURE && stages.some(function (s) { return s.id === a.stage; })) ? a.stage : 'plan';
    var openIdx = STAGE_ORDER.indexOf(open);
    var out = stages.map(function (s) {
      return { id: s.id, title: pick(s, 'title', p), line: pick(s, 'line', p),
               anchor: (STAGE_ANCHORS[p] || {})[s.id] || '', general: [], conditional: [], definite: [], maybes: [], early: [], movedEarly: [] };
    });
    var byId = {};
    out.forEach(function (s) { byId[s.id] = s; });
    STEPS.forEach(function (step) {
      var r = stepApplies(step, a, p);
      if (!r) return;
      var st = stageOf(step, p);
      var target = byId[st];
      if (!target) return;
      var item = { id: step.id, stage: st, text: r === 'maybe' && step.ifText ? step.ifText : step.text, conditional: !!onOf(step, p),
                   link: step.link, kw: step.kw || null, mails: step.mails || null, note: step.note || null, group: groupOf(step, st),
                   name: step.name || null, kwName: !!step.kwName, why: step.why || null, asks: !!step.asks,
                   mixups: stepMixups(step.id, p),
                   maybe: r === 'maybe', maybeFrom: r === 'maybe' ? maybeSource(step, a, p) : [],
                   who: r === 'maybe' ? whoOf(step, p) : null, early: step.early || null };
      /* An "early" step of a later stage shows in the open stage instead, with its reason. */
      /* b488: the stage it belongs to keeps it too ("movedEarly"), so that opening that stage on the timeline shows it there. */
      if (step.early && STAGE_ORDER.indexOf(st) > openIdx && byId[open]) { byId[open].early.push(item); target.movedEarly.push(item); return; }
      if (onOf(step, p)) target.conditional.push(item); else target.general.push(item);
      /* b485 (B11, B13): one list per stage in the order of STEPS, and the steps that may apply in a list of their own. */
      if (r === 'maybe') target.maybes.push(item); else target.definite.push(item);
    });
    /* An early item's reason shows unless it repeats the item's own line or another line in the same list (b485, B15). */
    out.forEach(function (s) {
      var texts = s.early.map(function (x) { return x.text; });
      s.early.forEach(function (x) { x.earlyShown = (x.early === x.text || texts.indexOf(x.early) > -1) ? '' : x.early; });
    });
    return { path: p, type: TYPES[p], auth: authOf(a, p), open: open, stageUnsure: a.stage === UNSURE || !a.stage, stages: out };
  }

  /* What one stage shows when it is open on the timeline (b488): its steps in their groups, in the groups' order and,
     inside a group, the order of STEPS; its steps that may apply, as one list; and, at the reader's own stage only, the
     steps of later stages to plan now. A later stage shows its own "plan now" steps among its groups. */
  var STEP_POS = {};
  STEPS.forEach(function (s, i) { STEP_POS[s.id] = i; });
  function stageView(r, id) {
    var s = r.stages.filter(function (x) { return x.id === id; })[0];
    if (!s) return null;
    var own = id === r.open;
    var defs = s.definite.slice(), maybes = s.maybes.slice();
    if (!own) s.movedEarly.forEach(function (x) { (x.maybe ? maybes : defs).push(x); });
    var byPos = function (a, b) { return STEP_POS[a.id] - STEP_POS[b.id]; };
    defs.sort(byPos); maybes.sort(byPos);
    var groups = (GROUPS[id] || []).map(function (g) {
      return { id: g.id, title: g.title, icon: g.icon, items: defs.filter(function (x) { return x.group === g.id; }) };
    }).filter(function (g) { return g.items.length; });
    var ungrouped = defs.filter(function (x) { return !(GROUPS[id] || []).some(function (g) { return g.id === x.group; }); });
    return { id: id, title: s.title, line: s.line, anchor: s.anchor, own: own, groups: groups, ungrouped: ungrouped,
             maybes: maybes, early: own ? s.early : [] };
  }

  /* One plain line of what the answers said (b488), for the study panel. Not sure and None add nothing. */
  var FACTS = {
    hc: {
      L1: { within: 'The drug is marketed in Canada and used within the conditions of its approval.',
            outside: 'The drug is not marketed in Canada, or is used outside the conditions of its approval.',
            radio: 'The drug is a positron-emitting radiopharmaceutical, in a basic clinical research study.' },
      L3: { label: 'The product is used exactly as its approved label describes.',
            outside: 'The product is not used as its approved label describes, or has no product licence.' },
      L2D: { class1: 'The device is a Class I device.',
             licensed: 'The device is licensed in Canada and used within its licensed indications.',
             offlabel: 'The device is licensed in Canada and used outside its licensed indications.',
             unlicensed: 'The device is a Class II, III or IV device that is not licensed in Canada.' }
    },
    sponsor: { industry: 'A company sponsors the study.',
               si: 'You or your supervisor sponsor it, as its sponsor-investigator.',
               other: 'Another university, hospital or research group sponsors it, and the MUHC is one of its sites.' },
    sites: { muhc: 'The MUHC is its only site.',
             qcmuhc: 'Other public institutions in Quebec take part, with the MUHC REB reviewing the study for every site.',
             qcother: 'Other public institutions in Quebec take part, with another institution’s REB reviewing the study.',
             outside: 'It has sites in other provinces or countries.' },
    efvp: { prescreen: 'Before people consent, someone will look in their health records.',
            noconsent: 'It will use identifiable health information without people’s consent.',
            leave: 'Participants’ information will go outside Quebec.',
            tech: 'It will get, build or change technology to handle participants’ information.' }
  };
  /* b491: who sponsors the study, in the panel's heading. */
  var SPONSOR_HEAD = { industry: ', sponsored by a company', si: ', which you or your supervisor sponsor', other: ', sponsored by another institution or research group' };
  /* b491: one short line naming the answers that add steps (people, sites, health information). */
  var ADDS = {
    people: { minors: 'people under 18', adults: 'adults who can’t consent for themselves' },
    sites: { qcmuhc: 'other Quebec institutions under the MUHC REB’s review', qcother: 'other Quebec institutions under another REB’s review', outside: 'sites outside Quebec' },
    efvp: { prescreen: 'a look at health records before consent', noconsent: 'health information used without consent', leave: 'information going outside Quebec', tech: 'new technology for participants’ information' }
  };
  function addsLine(a, p) {
    var items = [];
    ['people', 'sites', 'efvp'].forEach(function (k) { asList(a[k]).forEach(function (v) { if (ADDS[k][v]) items.push(ADDS[k][v]); }); });
    if (!items.length) return '';
    var list = items.length === 1 ? items[0] : items.slice(0, -1).join(', ') + ' and ' + items[items.length - 1];
    return 'Your study also has steps for ' + list + '.';
  }
  function factsLine(a, p) {
    var out = [];
    var hc = FACTS.hc[p];
    if (hc && hc[a.hc]) out.push(hc[a.hc]);
    if (FACTS.sponsor[a.sponsor]) out.push(FACTS.sponsor[a.sponsor]);
    var ppl = asList(a.people);
    var who = [];
    if (ppl.indexOf('minors') > -1) who.push('people under 18');
    if (ppl.indexOf('adults') > -1) who.push('adults who can’t consent for themselves');
    if (who.length) out.push((p === 'L5' ? 'It may use the information or samples of ' : 'It may include ') + who.join(' and ') + '.');
    asList(a.sites).forEach(function (v) { if (FACTS.sites[v]) out.push(FACTS.sites[v]); });
    asList(a.efvp).forEach(function (v) { if (FACTS.efvp[v]) out.push(FACTS.efvp[v]); });
    return out.join(' ');
  }

  /* Labels of the answers, as the reader chose them. */
  function answerLabels(q, a) {
    var p = pathOf(a);
    var val = a[q.key];
    var opts = optionsFor(q, p);
    return asList(val).map(function (v) {
      var o = opts.filter(function (x) { return x.v === v; })[0];
      if (!o) return null;
      return (p === 'L5' && o.labelL5) ? o.labelL5 : o.label;
    }).filter(Boolean);
  }

  var MONTHS = ['Jan.', 'Feb.', 'March', 'April', 'May', 'June', 'July', 'Aug.', 'Sept.', 'Oct.', 'Nov.', 'Dec.'];
  function muhcDate(d) { return MONTHS[d.getMonth()] + ' ' + d.getDate() + ', ' + d.getFullYear(); }

  var FIELDS = [
    { id: 'help',  label: 'What would you like help with?', kind: 'textarea', max: 500 },
    { id: 'title', label: 'The study’s working title, or a few words on the idea', kind: 'text', max: 120 },
    { id: 'pi',    label: 'Who is or will be the principal investigator', kind: 'text', max: 60 },
    { id: 'role',  label: 'Your role on the study', kind: 'select', options: ['', 'Principal investigator', 'Coordinator', 'Trainee', 'Other'] },
    { id: 'dept',  label: 'Your department or unit', kind: 'text', max: 60 },
    { id: 'nagano', label: 'The Nagano number, if the study has one', kind: 'text', max: 20, fromStage: 'submit' },
    { id: 'exp',   label: 'How many studies like this your team has run', kind: 'select', options: ['', 'This is our first', 'A few', 'Many'] }
  ];
  var MAIL_LIMIT = 1500;
  var WARNING = 'Do not include any participant’s name, health information or other details that could identify a participant.';
  var GOVERNS = 'For the rule behind each step, follow the Hub page at its address.';

  function fieldShown(f, a) {
    if (!f.fromStage) return true;
    var i = STAGE_ORDER.indexOf(a.stage);
    return i >= STAGE_ORDER.indexOf(f.fromStage);
  }

  function answersBlock(a) {
    var lines = [];
    visibleQuestions(a).forEach(function (q) {
      var labs = answerLabels(q, a);
      if (labs.length) lines.push('- ' + qTitle(q, pathOf(a)) + ' Answer: ' + labs.join('; '));
    });
    return lines;
  }

  function shortAnswers(a) {
    var p = pathOf(a);
    return visibleQuestions(a).map(function (q) {
      var opts = optionsFor(q, p);
      /* b488: the email leaves out "None of these" and "Neither", so that the added CIM screen keeps it short; the copied
         summary keeps every answer. */
      var vals = asList(a[q.key]);
      if (vals.length === 1 && vals[0] === 'none') return null;
      var labs = vals.map(function (v) { var o = opts.filter(function (x) { return x.v === v; })[0]; return o ? (o.short || o.label) : null; }).filter(Boolean);
      return labs.length ? '- ' + q.brief + ': ' + labs.join('; ') : null;
    }).filter(Boolean);
  }

  function headerLines(a, f, base, r, brief) {
    var lines = [];
    lines.push('My Study Roadmap: a summary for the Research Facilitator');
    lines.push('');
    if (f.help) { lines.push('What I would like help with:'); lines.push(f.help); lines.push(''); }
    var info = [];
    if (f.title) info.push('Working title: ' + f.title);
    if (f.pi) info.push('Principal investigator: ' + f.pi);
    if (f.role) info.push('My role: ' + f.role);
    if (f.dept) info.push('Department or unit: ' + f.dept);
    if (f.nagano && fieldShown({ fromStage: 'submit' }, a)) info.push('Nagano number: ' + f.nagano);
    if (f.exp) info.push('Studies like this our team has run: ' + f.exp);
    if (info.length) { lines = lines.concat(info); lines.push(''); }
    var t = r.type;
    lines.push('Type of study: ' + (t.name ? capital(t.name) + ' (' + t.level + ')' : 'not settled yet'));
    lines.push('Path: ' + base + t.path);
    lines.push('');
    lines.push('My answers:');
    lines = lines.concat(brief ? shortAnswers(a) : answersBlock(a));
    return lines;
  }

  function capital(s) { return s.charAt(0).toUpperCase() + s.slice(1); }
  /* A step's short name, as it opens its line in the summary (b488). */
  function nm(s) { return s.name ? s.name + '. ' : ''; }

  /* The full summary: copy and print carry everything. */
  function buildSummary(a, f, base, date) {
    var r = buildResult(a);
    var lines = headerLines(a, f, base, r);
    var openStage = r.stages.filter(function (s) { return s.id === r.open; })[0];
    lines.push('');
    /* b485 (B22, C8): the summary carries what qualifies each step: its tag, the office to ask, and the stage and
       reason of an early item. */
    lines.push('Steps at the “' + openStage.title + '” stage:');
    /* b488: in the order the page shows them, group by group. */
    var ov = stageView(r, r.open);
    ov.groups.forEach(function (g) { g.items.forEach(function (s) { lines.push('- ' + nm(s) + s.text + ' ' + base + s.link); }); });
    ov.ungrouped.forEach(function (s) { lines.push('- ' + nm(s) + s.text + ' ' + base + s.link); });
    if (openStage.maybes.length) {
      lines.push('');
      lines.push('Steps that may apply to my study:');
      openStage.maybes.forEach(function (s) {
        lines.push('- ' + nm(s) + s.text + ' ' + base + s.link + (s.who ? ' Ask ' + s.who.name + ' (' + s.who.email + ').' : ''));
      });
    }
    if (openStage.early.length) {
      lines.push('');
      lines.push('Plan now for later stages:');
      openStage.early.forEach(function (s) {
        var later = r.stages.filter(function (y) { return y.id === s.stage; })[0];
        lines.push('- ' + nm(s) + s.text + ' ' + base + s.link + ' (Needed at: ' + later.title + '.' + (s.earlyShown ? ' ' + s.earlyShown : '') + ')');
      });
    }
    lines.push('');
    var others = r.stages.filter(function (s) { return s.id !== r.open; });
    /* With no stage anchors (the type not settled), every stage points to the same page: one line (b485, B14). */
    if (!others.some(function (s) { return s.anchor; })) {
      lines.push('Every stage: ' + base + r.type.path);
    } else {
      lines.push('Other stages:');
      others.forEach(function (s) { lines.push('- ' + s.title + ': ' + base + r.type.path + (s.anchor || '')); });
    }
    lines.push('');
    lines.push('Made on ' + muhcDate(date) + '.');
    lines.push(GOVERNS);
    return lines.join('\n');
  }

  /* The short version for the two email links (no step lines). */
  function buildMailBody(a, f, base, date) {
    var r = buildResult(a);
    function make(ff) {
      var lines = headerLines(a, ff, base, r, true);
      lines.push('');
      lines.push('Made on ' + muhcDate(date) + '.');
      lines.push(GOVERNS);
      lines.push('Every step for this type of study: ' + base + r.type.path);
      return lines.join('\n');
    }
    var body = make(f);
    /* Keep the email under MAIL_LIMIT characters: shorten the free-text question, which the copied summary keeps in full. */
    if (body.length > MAIL_LIMIT && f.help) {
      var cut = '\u2026 (continued in the copied summary)';
      var keep = Math.max(0, f.help.length - (body.length - MAIL_LIMIT) - cut.length);
      var g = {}; for (var k in f) g[k] = f[k];
      g.help = keep > 40 ? f.help.slice(0, keep) + cut : 'See the copied summary.';
      body = make(g);
      f = g;
    }
    /* b488: if the answers still take it over the limit, shorten the free-text fields in turn (the copied summary keeps them whole). */
    ['title', 'dept', 'pi'].forEach(function (k) {
      if (body.length <= MAIL_LIMIT || !f[k]) return;
      var h = {}; for (var x in f) h[x] = f[x];
      var room = Math.max(0, f[k].length - (body.length - MAIL_LIMIT) - 1);
      h[k] = room > 10 ? f[k].slice(0, room) + '\u2026' : '';
      body = make(h); f = h;
    });
    return body;
  }

  function mailSubject(a, f) {
    var r = buildResult(a);
    return 'My Study Roadmap: ' + (f.title ? f.title : r.type.pathTitle);
  }

  function mailtoUrl(a, f, base, date) {
    return 'mailto:' + CONTACTS.rf.email + '?subject=' + encodeURIComponent(mailSubject(a, f)) +
      '&body=' + encodeURIComponent(buildMailBody(a, f, base, date));
  }
  function outlookUrl(a, f, base, date) {
    return 'https://outlook.office.com/mail/deeplink/compose?to=' + encodeURIComponent(CONTACTS.rf.email) +
      '&subject=' + encodeURIComponent(mailSubject(a, f)) + '&body=' + encodeURIComponent(buildMailBody(a, f, base, date));
  }

  /* For the check script and later tools. */
  if (typeof window !== 'undefined') {
    window.__rmnLogic = {
      CONTACTS: CONTACTS, TYPES: TYPES, STAGES: STAGES, STAGE_ANCHORS: STAGE_ANCHORS, QUESTIONS: QUESTIONS, STEPS: STEPS,
      FIELDS: FIELDS, qTitle: qTitle, qWhy: qWhy, screenMixups: screenMixups, stepMixups: stepMixups, MIX_BY_STEP: MIX_BY_STEP, WARNING: WARNING, GOVERNS: GOVERNS, STAGE_ORDER: STAGE_ORDER,
      onOf: onOf, stepApplies: stepApplies, stageOf: stageOf, toggleAnswer: toggleAnswer, MIX_STEP: MIX_STEP,
      pathOf: pathOf, authOf: authOf, visibleQuestions: visibleQuestions, optionsFor: optionsFor, buildResult: buildResult,
      buildSummary: buildSummary, buildMailBody: buildMailBody, mailtoUrl: mailtoUrl, outlookUrl: outlookUrl, muhcDate: muhcDate,
      /* b488 */
      progressOf: progressOf, maxQuestions: maxQuestions,
      GROUPS: GROUPS, NAMES: NAMES, ON_NAME: ON_NAME, addsLine: addsLine, SPONSOR_HEAD: SPONSOR_HEAD, STEP_GROUP: STEP_GROUP, groupOf: groupOf, stageView: stageView, factsLine: factsLine,
      /* The page's own HTML for a screen, with no page: for the check script's reading of every screen. */
      renderFor: function (a, opts) {
        opts = opts || {};
        var keep = S; S = freshState(); S.answers = a; S.screen = opts.screen || 'result'; S.qIndex = opts.qIndex || 0;
        S.view = opts.view || null; S.printAll = !!opts.printAll;
        try { return S.screen === 'q' ? renderQuestion() : S.screen === 'summary' ? renderSummary() : S.screen === 'start' ? renderStart() : renderResult(); }
        finally { S = keep; }
      }
    };
  }

  /* ======================================================================
     3. PAGE
     ====================================================================== */

/* b488: the tool's own interactive look, in the Hub's tokens (custom.css :root and .dark), with the light values as
     fallbacks for the mock-up. Straight edges; hairline borders; no side rules, no tag chips, no kicker labels. */
  var CSS = [
    '.rmn { --rmn-navy:var(--ri-heading,#150e51); --rmn-body:var(--ri-text-body,#374151); --rmn-muted:var(--ri-text-secondary,#4b5563); --rmn-line:#d9dce5; --rmn-tint:var(--ri-surface-low,#f4f6f9); --rmn-link:var(--ri-link,#1a73b5); --rmn-icon:#2b9ce2;',
    '  --rmn-note-bg:var(--ri-callout-note-bg,#eef5fc); --rmn-note-text:var(--ri-callout-note-text,#0a3a66); --rmn-note-line:var(--ri-callout-note-border,#b3d4f0);',
    '  --rmn-warn-bg:var(--ri-callout-warn-bg,#fffbf0); --rmn-warn-text:var(--ri-callout-warn-text,#6b4500); --rmn-warn-line:var(--ri-callout-warn-border,#e0d0aa);',
    '  font-family:"Barlow",Arial,sans-serif; color:var(--rmn-body); font-size:16px; line-height:1.55; max-width:52rem; margin:0 0 64px; }',
    '.dark .rmn { --rmn-line:rgba(255,255,255,.18); }',
    '.rmn *, .rmn *::before, .rmn *::after { box-sizing:border-box; }',
    '.rmn h2, .rmn h3, .rmn h4 { color:var(--rmn-navy); margin:0; line-height:1.2; }',
    '.rmn h2, .rmn h3 { font-family:"Barlow Condensed","Arial Narrow",Arial,sans-serif; font-weight:700; }',
    '.rmn h2 { font-size:1.75rem; margin-bottom:.5rem; }',
    '.rmn h3 { font-size:1.4rem; }',
    '.rmn h4 { font-family:"Barlow",Arial,sans-serif; font-size:1.02rem; font-weight:600; }',
    '.rmn h2:focus, .rmn h3:focus, .rmn p:focus { outline:none; }',
    '.rmn p { margin:0 0 .75rem; }',
    '.rmn a { color:var(--rmn-link); text-decoration:underline; text-underline-offset:2px; }',
    '.rmn a:focus-visible, .rmn button:focus-visible, .rmn input:focus-visible, .rmn select:focus-visible, .rmn textarea:focus-visible, .rmn summary:focus-visible { outline:2px solid var(--rmn-link); outline-offset:2px; }',
    /* question screens */
    '.rmn-hint { font-size:.95rem; color:var(--rmn-muted); margin:0 0 .35rem; }',
    '.rmn { container-type:inline-size; }',
    '.rmn-why { margin:.1rem 0 1rem; font-size:.95rem; }',
    /* b492: the question count, a plain line (MF: no progress bar) */
    '.rmn-count { font-size:.9rem; color:var(--rmn-muted); margin:0 0 .4rem; }',
    /* b492: the static note beside the answers on a wide screen, below them on a narrow one */
    '.rmn-side { margin:1.1rem 0 0; padding:12px 14px; border:1px solid var(--rmn-line); background:var(--rmn-tint); font-size:.93rem; }',
    '.rmn-side p { margin:0 0 .5rem; } .rmn-side p:last-child { margin:0; }',
    '.rmn-side b { color:var(--rmn-navy); font-weight:600; }',
    '@container (min-width:44rem) { .rmn-qgrid { display:grid; grid-template-columns:minmax(0,1fr) 15rem; gap:0 1.75rem; align-items:start; } .rmn-qgrid .rmn-side { margin-top:0; } }',
    '.rmn-why summary { cursor:pointer; font-weight:600; color:var(--rmn-navy); display:inline-block; }',
    '.rmn-why p { margin:.5rem 0 0; }',
    '.rmn-gap { height:.9rem; }',
    '.rmn-mix b { color:var(--rmn-navy); font-weight:600; }',
    '.rmn fieldset { border:0; padding:0; margin:1rem 0 0; min-width:0; }',
    '.rmn legend { padding:0; }',
    '.rmn-group-label { font-weight:600; color:var(--rmn-navy); margin:1rem 0 .35rem; font-size:.95rem; }',
    '.rmn-opt { display:flex; gap:.7rem; align-items:flex-start; padding:.65rem .8rem; border:1px solid var(--rmn-line); margin:0 0 -1px; background:transparent; cursor:pointer; }',
    '.rmn-opt:hover { background:var(--rmn-tint); }',
    '.rmn-opt input { margin:.3rem 0 0; width:1.05rem; height:1.05rem; flex-shrink:0; accent-color:var(--rmn-navy); }',
    '.rmn-opt-ex { display:block; font-size:.88rem; color:var(--rmn-muted); margin-top:.1rem; }',
    '.rmn-opt.rmn-on { border-color:var(--rmn-navy); position:relative; z-index:1; }',
    '.rmn-nav { display:flex; flex-wrap:wrap; gap:.6rem; align-items:center; margin-top:1.4rem; }',
    '.rmn-nav-q { justify-content:flex-start; gap:.75rem; }',
    '.rmn-btn { font:inherit; font-weight:600; padding:.55rem 1.1rem; border:1px solid var(--rmn-navy); background:transparent; color:var(--rmn-navy); cursor:pointer; border-radius:0; text-decoration:none !important; display:inline-block; }',
    '.rmn-btn:hover { background:var(--rmn-tint); }',
    '.rmn-btn-main { background:var(--rmn-navy); color:#fff; }',
    '.rmn-btn-main:hover { background:#2b2666; }',
    '.dark .rmn-btn-main { color:#150e51; }',
    '.rmn-btn-link { font:inherit; border:0; background:none; color:var(--rmn-link); text-decoration:underline; text-underline-offset:2px; padding:0; cursor:pointer; }',
    '.rmn-error { color:var(--ri-callout-attention-text,#8a1840); font-size:.95rem; margin-top:.6rem; }',
    '.rmn-summary { border-top:1px solid var(--rmn-line); margin:1rem 0; padding:0; }',
    '.rmn-summary div { display:grid; grid-template-columns:1fr auto; gap:.2rem 1rem; border-bottom:1px solid var(--rmn-line); padding:.6rem 0; }',
    '.rmn-summary dt { font-weight:600; color:var(--rmn-navy); grid-column:1; }',
    '.rmn-summary dd { margin:0; grid-column:1; }',
    '.rmn-summary .rmn-change { grid-column:2; grid-row:1 / span 2; align-self:start; }',
    /* result: the study panel */
    '.rmn-panel { border:1px solid var(--rmn-line); background:var(--rmn-tint); padding:16px 18px; margin:0 0 28px; }',
    '.rmn-panel h2 { font-size:1.6rem; margin:0 0 .35rem; }',
    '.rmn-panel p { margin:0 0 .5rem; }',
    '.rmn-panel .rmn-why { margin:.2rem 0 0; }',
    '.rmn-restart { margin:1rem 0 0; }',
    '.rmn-actions { display:flex; flex-wrap:wrap; gap:.4rem 1.4rem; align-items:center; margin-top:.7rem; font-weight:600; font-size:.95rem; }',
    /* result: the timeline of stages */
    '.rmn-track { list-style:none; margin:0 0 30px; padding:0; display:grid; grid-template-columns:repeat(var(--rmn-n,6), minmax(0,1fr)); position:relative; }',
    '.rmn-track::before { content:""; position:absolute; left:calc(50% / var(--rmn-n,6)); right:calc(50% / var(--rmn-n,6)); top:11px; height:2px; background:#c9cedb; }',
    '.rmn-track li { margin:0; padding:0; list-style:none; min-width:0; position:relative; }',
    '.rmn-track li::marker { content:""; }',
    '.rmn-stage { font:inherit; width:100%; background:none; border:0; cursor:pointer; text-align:center; font-size:.88rem; line-height:1.25; color:var(--rmn-muted); padding:32px 4px 4px; position:relative; }',
    '.rmn-stage::before { content:""; position:absolute; top:2px; left:50%; transform:translateX(-50%); width:20px; height:20px; border-radius:50%; background:var(--ri-surface,#fff); border:2px solid #9aa2b8; }',
    '.rmn-stage:hover { color:var(--rmn-navy); }',
    '.rmn-stage:hover::before { border-color:var(--rmn-navy); }',
    '.rmn-stage[aria-current="true"] { color:var(--rmn-navy); font-weight:700; }',
    '.rmn-stage[aria-current="true"]::before { border-color:var(--rmn-navy); box-shadow:0 0 0 4px #dfe3f0; }',
    '.rmn-stage.rmn-yours::before { background:var(--rmn-navy); border-color:var(--rmn-navy); }',
    '.rmn-stage small { display:block; font-weight:500; font-size:.78rem; color:var(--rmn-muted); margin-top:2px; }',
    /* result: the open stage */
    '.rmn-open-title { font-size:1.75rem; }',
    '.rmn-open-line { margin:.2rem 0 1.4rem; font-size:1.05rem; }',
    '.rmn-group { margin:0 0 24px; }',
    '.rmn-group h4 { display:flex; align-items:center; gap:10px; margin:0 0 10px; }',
    '.rmn-icon { display:inline-block; width:18px; height:18px; flex-shrink:0; background-color:var(--rmn-icon); -webkit-mask-repeat:no-repeat; mask-repeat:no-repeat; -webkit-mask-position:center; mask-position:center; -webkit-mask-size:contain; mask-size:contain; }',
    '.rmn-list { list-style:none; margin:0; padding:0; display:grid; gap:10px; }',
    '.rmn .rmn-list li { list-style:none; position:relative; padding-left:28px; margin:0; }',
    '.rmn .rmn-list li::marker { content:""; }',
    '.rmn .rmn-list li::before { content:""; position:absolute; left:0; top:5px; width:14px; height:14px; border:1.5px solid var(--rmn-navy) !important; border-radius:0 !important; background:var(--ri-surface,#fff) !important; box-shadow:none !important; }',
    '.rmn-list b { color:var(--rmn-navy); font-weight:600; }',
    '.rmn-sub { display:block; font-size:.9rem; color:var(--rmn-muted); margin-top:.2rem; }',
    '.rmn-note { margin:12px 0 0 28px; padding:10px 14px; background:var(--rmn-note-bg); border:1px solid var(--rmn-note-line); color:var(--rmn-note-text); font-size:.95rem; }',
    '.rmn-note b { font-weight:600; }',
    '.rmn-note a { color:inherit; }',
    '.rmn-plan { margin:6px 0 28px; padding:14px 18px; background:var(--rmn-warn-bg); border:1px solid var(--rmn-warn-line); color:var(--rmn-warn-text); }',
    '.rmn-plan h4, .rmn-plan b { color:var(--rmn-warn-text); }',
    '.rmn-plan h4 { margin:0 0 10px; font-weight:700; }',
    '.rmn-plan a { color:inherit; }',
    '.rmn-plan .rmn-sub { color:var(--rmn-warn-text); }',
    '.rmn-maybe h4 { color:var(--rmn-muted); }',
    '.rmn .rmn-maybe .rmn-list li::before { border-style:dashed !important; }',
    '.rmn-maybe .rmn-list b { color:var(--rmn-body); }',
    '.rmn-whole { font-size:.95rem; margin:.4rem 0 0; }',
    /* result: the Research Facilitator panel */
    '.rmn-help { border:1px solid var(--rmn-line); padding:18px; margin-top:36px; }',
    '.rmn-help h2 { font-size:1.45rem; }',
    '.rmn-field { margin:0 0 .9rem; }',
    '.rmn-field label { display:block; font-weight:600; color:var(--rmn-navy); font-size:.95rem; margin-bottom:.2rem; }',
    '.rmn-field input, .rmn-field select, .rmn-field textarea { font:inherit; width:100%; padding:.45rem .55rem; border:1px solid #9aa1b3; border-radius:0; background:var(--ri-surface,#fff); color:var(--ri-text,#111); }',
    '.rmn-field textarea { min-height:5rem; }',
    '.rmn-preview { font-family:ui-monospace,Menlo,Consolas,monospace; font-size:.85rem; min-height:16rem; white-space:pre-wrap; }',
    '.rmn-warn { font-weight:600; color:var(--rmn-navy); margin:.4rem 0 1rem; }',
    '.rmn code.rmn-addr { font-family:inherit; font-weight:600; color:var(--rmn-navy); background:none; padding:0; }',
    '.rmn-out { margin-top:.8rem; }',
    /* Spacing fixes (coordinator, MF ledger row 449): ".rmn p" outranked these classes, so their top margins fell to 0. */
    '.rmn .rmn-note { margin:14px 0 0 28px; }',
    '.rmn .rmn-open-title { margin:0 0 .4rem; }',
    '.rmn .rmn-out { margin-top:1rem; }',
    '.rmn .rmn-side p, .rmn .rmn-plan p, .rmn .rmn-panel p { margin:0 0 .5rem; }',
    '.rmn .rmn-side p:last-child, .rmn .rmn-plan p:last-child, .rmn .rmn-panel p:last-child { margin-bottom:0; }',
    '.rmn .rmn-plan { margin:8px 0 32px; }',
    '.rmn .rmn-help { margin-top:40px; }',
    '.rmn .rmn-group-label { margin:1.5rem 0 .55rem; }',
    '.rmn .rmn-answers > div:first-child .rmn-group-label { margin-top:.25rem; }',
    '.rmn legend h2 { margin-bottom:.75rem; }',
    '.rmn .rmn-hint { margin:0 0 .9rem; }',
    '.rmn-printurl, .rmn-printonly { display:none; }',
    '.rmn-sr { position:absolute; width:1px; height:1px; overflow:hidden; clip:rect(0 0 0 0); white-space:nowrap; }',
    '@media (max-width:600px) {',
    '  .rmn { font-size:15.5px; } .rmn h2 { font-size:1.45rem; } .rmn-nav .rmn-btn { flex:1 1 auto; text-align:center; }',
    '  .rmn-track { grid-template-columns:1fr; gap:0; }',
    '  .rmn-track::before { left:10px; right:auto; top:12px; bottom:12px; width:2px; height:auto; }',
    '  .rmn-stage { text-align:left; padding:6px 4px 6px 34px; font-size:.95rem; }',
    '  .rmn-stage::before { top:8px; left:0; transform:none; }',
    '  .rmn-stage small { display:inline; margin:0 0 0 .4rem; }',
    '  .rmn-note { margin-left:0; }',
    '}',
    '@media print {',
    '  body * { visibility:hidden; }',
    '  .rmn, .rmn * { visibility:visible; }',
    '  .rmn { position:absolute; left:0; top:0; max-width:100%; font-size:11pt; }',
    '  .rmn-noprint { display:none !important; }',
    '  .rmn a { color:#000; text-decoration:none; }',
    '  .rmn-printonly { display:block; margin-top:1rem; }',
    '  .rmn-printurl { display:inline; font-size:9pt; color:#333; word-break:break-all; }',
    '  .rmn-list li, .rmn-note { break-inside:avoid; }',
    '  .rmn .rmn-list li::before { background:#fff !important; border-color:#150e51 !important; -webkit-print-color-adjust:exact; print-color-adjust:exact; }',
    '  .rmn-stage-print { break-before:auto; margin-top:1.2rem; }',
    '}'
  ].join('\n');

  function injectCSS() {
    if (document.getElementById('rmn-css')) return;
    var s = document.createElement('style');
    s.id = 'rmn-css';
    s.textContent = CSS;
    document.head.appendChild(s);
  }

  function esc(s) {
    return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  var S = null;
  function freshState() {
    return { screen: 'start', qIndex: 0, answers: {}, toSummary: false, view: null, printAll: false, fields: {}, previewEdited: false, error: '' };
  }

  function root() { return typeof document === 'undefined' ? null : document.getElementById('rmn-root'); }
  function base() {
    var r = root();
    return (r && r.getAttribute('data-base')) || ((typeof location !== 'undefined' && location.origin) || '');
  }
  /* Internal links: relative on the Hub, absolute in the mock-up. The printed address is always absolute. */
  function href(path) {
    if (/^(https?:|mailto:)/.test(path)) return path;
    var r = root();
    var b = r && r.getAttribute('data-base');
    return b ? b + path : path;
  }
  function absUrl(path) { return /^(https?:|mailto:)/.test(path) ? path : base() + path; }
  function linkHtml(path, text) {
    return '<a href="' + esc(href(path)) + '">' + esc(text) + '</a><span class="rmn-printurl"> (' + esc(absUrl(path)) + ')</span>';
  }
  function mail(c) { return '<a href="mailto:' + esc(c.email) + '">' + esc(c.email) + '</a>'; }
  /* An office's name, linked to its address (STYLE-HUB H). */
  function mailName(c, text) { return '<a href="mailto:' + esc(c.email) + '">' + esc(text) + '</a><span class="rmn-printurl"> (' + esc(c.email) + ')</span>'; }
  /* A line with its link on its key words, and each office it names linked to its address. The printed
     address of the page link goes at the end of the line, so the sentence reads whole on paper. */
  function lineHtml(text, kw, path, mails, onName) {
    var marks = [];
    function find(words, kind, target) {
      if (!words) return;
      var i = text.toLowerCase().indexOf(words.toLowerCase());
      if (i < 0) return;
      for (var k = 0; k < marks.length; k++) if (i < marks[k].end && i + words.length > marks[k].start) return;
      marks.push({ start: i, end: i + words.length, kind: kind, target: target });
    }
    find(kw, 'page', path);
    (mails || []).forEach(function (m) { find(m[0], 'mail', CONTACTS[m[1]]); });
    if (!onName && !marks.some(function (m) { return m.kind === 'page'; })) marks.push({ start: 0, end: text.length, kind: 'page', target: path });
    marks.sort(function (a, b) { return a.start - b.start; });
    var h = '', at = 0;
    marks.forEach(function (m) {
      h += esc(text.slice(at, m.start));
      var w = text.slice(m.start, m.end);
      if (m.kind === 'page') h += '<a href="' + esc(href(m.target)) + '">' + esc(w) + '</a>';
      else h += mailName(m.target, w);
      at = m.end;
    });
    h += esc(text.slice(at));
    return h + '<span class="rmn-printurl"> (' + esc(absUrl(path)) + ')</span>';
  }

  function render(focusSel) {
    var r = root();
    if (!r) return;
    var h = '';
    if (S.screen === 'start') h = renderStart();
    else if (S.screen === 'q') h = renderQuestion();
    else if (S.screen === 'summary') h = renderSummary();
    else if (S.screen === 'result') h = renderResult();
    r.innerHTML = '<div class="rmn">' + h + '<div class="rmn-sr" aria-live="polite" id="rmn-live"></div></div>';
    bind();
    if (focusSel === false) return;
    var f = r.querySelector(focusSel || '[data-rmn-focus]');
    if (f) { f.setAttribute('tabindex', '-1'); f.focus(); }
  }

  /* b492 (MF, ledger row 440, and the coordinator's addition): the most question screens any type of study sees,
     counted from the logic, for the start screen's "at most". */
  var NUM_WORDS = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve'];
  function maxQuestions() {
    return ['drug', 'device', 'surgery', 'nhp', 'change', 'follow', 'survey', 'records', 'unsure'].reduce(function (m, v) {
      return Math.max(m, visibleQuestions({ q1: v }).length);
    }, 0);
  }
  /* b492 (MF, ledger row 440: "a warm explanation of the tool, that's it"): what the tool does for the reader, how long
     it is, and the two things to know before starting. Nothing about how answers or Not sure work. */
  function renderStart() {
    var h = '<h2 data-rmn-focus>Find the steps for your study</h2>';
    h += '<p>What you need to do for a study depends on what it does, who sponsors it and where it takes place. Once you answer, you’ll see what to do at each stage of your study, starting with the stage you’re at now. The ' + mailName(CONTACTS.rf, 'Research Facilitator') + ' can help at any point, and at the end you can send them a summary from your own email.</p>';
    h += '<p>It takes at most ' + NUM_WORDS[maxQuestions()] + ' short questions. Nothing you enter is saved or sent.</p>';
    h += '<p>If you aren’t sure whether your project is research or quality improvement, answer the ' + lineHtml('screening questions', 'screening questions', '/is-it-research#screening-questions') + ' first.</p>';
    h += '<div class="rmn-nav"><button type="button" class="rmn-btn rmn-btn-main" data-act="begin">Start</button></div>';
    return h;
  }

  function currentQuestion() { return visibleQuestions(S.answers)[S.qIndex]; }
  /* b492: the question's number and, once the type of study is known, how many questions there are. */
  function progressOf(a, i) {
    var n = i + 1;
    if (!a || !a.q1) return { n: n, m: 0 };
    return { n: n, m: Math.max(n, visibleQuestions(a).length) };
  }

  function renderQuestion() {
    var a = S.answers, p = pathOf(a), q = currentQuestion();
    var multi = q.type === 'multi';
    var val = asList(a[q.key]);
    var h = '';
    var name = 'rmn-' + q.id;
    h += '<form class="rmn-form" novalidate>';
    /* b492 (the coordinator, from MF: "should questions be numbered? ... a progress indicator"): "Question 1", then
       "Question N of M", M counted from the answers so far (the type is known after the first answer), never below N.
       A plain line only: MF, through the coordinator, "no progress bar". */
    var pr = progressOf(a, S.qIndex);
    h += '<p class="rmn-count" id="rmn-count">' + (pr.m ? 'Question ' + pr.n + ' of ' + pr.m : 'Question ' + pr.n) + '</p>';
    h += '<fieldset' + (S.error ? ' aria-describedby="rmn-err"' : '') + '><legend><h2 data-rmn-focus aria-describedby="rmn-count">' + esc(qTitle(q, p)) + '</h2></legend>';
    if (q.hint) h += '<p class="rmn-hint">' + esc(q.hint) + '</p>';
    h += '<div class="rmn-qgrid"><div class="rmn-answers">';
    function opt(o) {
      var on = val.indexOf(o.v) > -1;
      var id = name + '-' + o.v;
      var lab = (p === 'L5' && o.labelL5) ? o.labelL5 : o.label;
      var ex = (p === 'L5' && o.exL5) ? o.exL5 : o.ex;
      return '<label class="rmn-opt' + (on ? ' rmn-on' : '') + '" for="' + id + '"><input type="' + (multi ? 'checkbox' : 'radio') + '" name="' + name + '" id="' + id + '" value="' + esc(o.v) + '"' + (on ? ' checked' : '') + (o.exclusive ? ' data-exclusive="1"' : '') + '><span>' + esc(lab) + (ex ? '<span class="rmn-opt-ex">' + esc(ex) + '</span>' : '') + '</span></label>';
    }
    if (q.groups) {
      q.groups.forEach(function (g) {
        var opts = g.options.filter(function (o) { return !o.notFor || !has(o.notFor, p); });
        if (!opts.length) return;
        h += '<div role="group" aria-labelledby="' + name + '-' + g.label.replace(/\W+/g, '') + '"><p class="rmn-group-label" id="' + name + '-' + g.label.replace(/\W+/g, '') + '">' + esc(g.label) + '</p>';
        opts.forEach(function (o) { h += opt(o); });
        h += '</div>';
      });
      h += '<div class="rmn-gap"></div>';
      q.options.forEach(function (o) { h += opt(o); });
    } else {
      optionsFor(q, p, a).forEach(function (o) { h += opt(o); });
    }
    h += '</div>';
    /* b492 (MF, ledger row 440: "Why we ask" read as a heading over the answers, and not as a toggle): a static side
       note, after the answers in reading order; beside them on a wide screen, below them on a narrow one. */
    h += '<div class="rmn-side" role="note"><p><b>Why this matters.</b> ' + esc(qWhy(q, p)) + '</p>';
    screenMixups(q, p).forEach(function (m) {
      h += '<p class="rmn-mix"><b>Good to know.</b> ' + lineHtml(m.text, m.kw, m.link) + '</p>';
    });
    h += '</div></div>';
    h += '</fieldset>';
    if (S.error) h += '<p class="rmn-error" id="rmn-err" role="alert">' + esc(S.error) + '</p>';
    h += '<div class="rmn-nav rmn-nav-q"><button type="button" class="rmn-btn" data-act="back">Back</button>';
    h += '<button type="submit" class="rmn-btn rmn-btn-main">Continue</button></div>';
    h += '</form>';
    return h;
  }

  function renderSummary() {
    var a = S.answers;
    var h = '<h2 data-rmn-focus>Check your answers</h2><p>Change any answer before you see your steps.</p><dl class="rmn-summary">';
    visibleQuestions(a).forEach(function (q, i) {
      var labs = answerLabels(q, a);
      h += '<div><dt>' + esc(qTitle(q, pathOf(a))) + '</dt><dd>' + esc(labs.join('; ')) + '</dd>';
      h += '<dd class="rmn-change"><button type="button" class="rmn-btn-link" data-act="change" data-i="' + i + '">Change<span class="rmn-sr"> the answer to: ' + esc(qTitle(q, pathOf(a))) + '</span></button></dd></div>';
    });
    h += '</dl><div class="rmn-nav"><button type="button" class="rmn-btn rmn-btn-main" data-act="result">See my steps</button></div>';
    return h;
  }

  /* b488: a step is a square mark, its short name in bold, then its sentence with the link on the words that name its
     destination. A step that may apply says whom to ask. */
  function itemHtml(s, extra) {
    var nameHtml = s.kwName ? '<a href="' + esc(href(s.link)) + '">' + esc(s.name) + '</a>' : esc(s.name);
    var h = '<li>' + (s.name ? '<b>' + nameHtml + '.</b> ' : '') + lineHtml(s.text, s.kw, s.link, s.mails, s.kwName);
    if (s.why) h += '<span class="rmn-sub">' + esc(s.why) + '</span>';
    /* b488: a line that already opens with "If you aren’t sure" gets "Ask …" only; a line that names whom to ask, nothing. */
    if (s.maybe && s.who && !s.asks) h += '<span class="rmn-sub">' + (/^If you aren’t sure/.test(s.text) ? 'Ask ' : 'If you aren’t sure, ask ') + mailName(s.who, s.who.name) + '.</span>';
    if (extra) h += extra;
    return h + '</li>';
  }
  /* The mix-ups of a list's steps, in the Hub's note colours, after the list (b488: under their step's group). */
  function notesHtml(items) {
    var h = '';
    items.forEach(function (s) {
      if (s.note) h += '<p class="rmn-note"><b>Good to know.</b> ' + esc(s.note) + '</p>';
      (s.mixups || []).forEach(function (m) { h += '<p class="rmn-note"><b>Good to know.</b> ' + lineHtml(m.text, m.kw, m.link) + '</p>'; });
    });
    return h;
  }
  function iconHtml(name) {
    var u = ICON_BASE + name + '.svg';
    return '<span class="rmn-icon" aria-hidden="true" style="-webkit-mask-image:url(&quot;' + esc(u) + '&quot;);mask-image:url(&quot;' + esc(u) + '&quot;)"></span>';
  }

  /* One stage, open: its name and line, its groups, the steps that may apply and, at the reader's stage, what to plan now. */
  function stageHtml(r, v, printing) {
    var t = r.type;
    var h = '<section class="' + (printing ? 'rmn-stage-print' : 'rmn-open') + '" aria-labelledby="rmn-open-h-' + v.id + '">';
    h += '<h3 class="rmn-open-title" id="rmn-open-h-' + v.id + '"' + (printing ? '' : ' data-rmn-stagehead') + '>' + esc(v.title) + '</h3>';
    h += '<p class="rmn-open-line">' + esc(v.line) + '</p>';
    if (v.own && r.stageUnsure && !printing) h += '<p>Since you weren’t sure of your study’s stage, Plan is open. Choose another stage to see its steps.</p>';
    v.groups.forEach(function (g) {
      h += '<div class="rmn-group"><h4>' + iconHtml(g.icon) + '<span>' + esc(g.title) + '</span></h4><ul class="rmn-list">';
      g.items.forEach(function (x) { h += itemHtml(x); });
      h += '</ul>' + notesHtml(g.items) + '</div>';
    });
    if (v.ungrouped.length) {
      h += '<div class="rmn-group"><ul class="rmn-list">';
      v.ungrouped.forEach(function (x) { h += itemHtml(x); });
      h += '</ul>' + notesHtml(v.ungrouped) + '</div>';
    }
    if (v.early.length) {
      h += '<div class="rmn-plan"><h4>Plan now for later stages</h4><ul class="rmn-list">';
      v.early.forEach(function (x) {
        var later = r.stages.filter(function (y) { return y.id === x.stage; })[0];
        h += itemHtml(x, '<span class="rmn-sub">Needed at: ' + esc(later.title) + '.' + (x.earlyShown ? ' ' + esc(x.earlyShown) : '') + '</span>');
      });
      h += '</ul>' + notesHtml(v.early) + '</div>';
    }
    if (v.maybes.length) {
      h += '<div class="rmn-group rmn-maybe"><h4>' + iconHtml('circle-question') + '<span>Steps that may apply to your study</span></h4><ul class="rmn-list">';
      v.maybes.forEach(function (x) { h += itemHtml(x); });
      h += '</ul>' + notesHtml(v.maybes) + '</div>';
    }
    if (v.anchor) h += '<p class="rmn-whole">Read ' + lineHtml('the ' + v.title + ' stage on ' + t.pathTitle, 'the ' + v.title + ' stage on ' + t.pathTitle, t.path + v.anchor) + '.</p>';
    return h + '</section>';
  }

  function typeHeading(t) {
    return t.name ? capital(t.name.replace(/^an? /, '')) + ' (' + t.level + ')' : 'The type of study isn’t settled yet';
  }

  /* The result (b488): the study panel; the stages as a timeline of buttons, each opening its stage; the open stage;
     the Research Facilitator panel last. */
  function renderResult() {
    var a = S.answers, r = buildResult(a), t = r.type;
    var view = S.view && r.stages.some(function (x) { return x.id === S.view; }) ? S.view : r.open;
    /* b491 (the coordinator: the panel was dense again): the heading names the type and, where answered, who sponsors it;
       then at most two short lines of what the answers said that changes the steps; the type's reason behind a toggle;
       then one row, "Change my answers" and "Every step on <path>". "Start again" is at the end of the page. */
    var h = '<div class="rmn-panel">';
    h += '<h2 data-rmn-focus>' + esc(typeHeading(t) + (t.name && SPONSOR_HEAD[a.sponsor] ? SPONSOR_HEAD[a.sponsor] : '')) + '</h2>';
    var lines = [];
    var hcFact = (FACTS.hc[r.path] || {})[a.hc];
    if (t.name) {
      if (hcFact) lines.push(esc(hcFact));
      if (r.path === 'L4o') lines.push('If the study only interviews or surveys participants about past events, ask the ' + mailName(CONTACTS.rf, 'Research Facilitator') + ' which level applies.');
    } else if (a.q1 === 'survey') {
      lines.push('Ask the ' + mailName(CONTACTS.rf, 'Research Facilitator') + ' which level applies. Until then, you see the steps most studies take.');
    } else {
      lines.push('To place it, read ' + lineHtml('Types of Study', 'Types of Study', '/paths#find-out-what-kind-of-study-yours-is') + ' or ask the ' + mailName(CONTACTS.rf, 'Research Facilitator') + '. Until then, you see the steps most studies take.');
    }
    var adds = addsLine(a, r.path);
    if (adds) lines.push(esc(adds));
    lines.slice(0, 2).forEach(function (l) { h += '<p>' + l + '</p>'; });
    h += '<details class="rmn-why rmn-noprint"><summary>' + (t.name ? 'Why this type?' : 'Why the type matters') + '</summary><p>' + esc(t.reason) +
      (t.reasonSI && a.sponsor === 'si' ? ' ' + esc(t.reasonSI) : '') + '</p>';
    if (t.name || a.q1 === 'survey') h += '<p>' + lineHtml('Check the type on Types of Study', 'Types of Study', '/paths#find-out-what-kind-of-study-yours-is') + '.</p>';
    h += '</details>';
    h += '<div class="rmn-actions rmn-noprint"><button type="button" class="rmn-btn" data-act="tosummary">Change my answers</button>';
    if (t.name) h += lineHtml('Every step on ' + t.pathTitle, 'Every step on ' + t.pathTitle, t.path);
    h += '</div>';
    h += '</div>';
    /* The timeline: each stage a button that opens its steps; aria-current on the open one. */
    h += '<nav class="rmn-noprint" aria-label="Stages of your study"><ol class="rmn-track" style="--rmn-n:' + r.stages.length + '">';
    r.stages.forEach(function (s) {
      var yours = s.id === r.open && !r.stageUnsure;
      h += '<li><button type="button" class="rmn-stage' + (yours ? ' rmn-yours' : '') + '" data-act="stage" data-stage="' + s.id + '"' + (s.id === view ? ' aria-current="true"' : '') + ' aria-controls="rmn-open">' + esc(s.title) + (yours ? '<small>Your stage</small>' : '') + '</button></li>';
    });
    h += '</ol></nav>';
    if (S.printAll) {
      r.stages.forEach(function (s) { h += stageHtml(r, stageView(r, s.id), true); });
    } else {
      h += '<div id="rmn-open">' + stageHtml(r, stageView(r, view), false) + '</div>';
    }
    h += '<div class="rmn-printonly"><h3>Your answers</h3><ul class="rmn-list">';
    visibleQuestions(a).forEach(function (q) { h += '<li>' + esc(qTitle(q, r.path)) + ' Answer: ' + esc(answerLabels(q, a).join('; ')) + '</li>'; });
    h += '</ul><p>Printed on ' + esc(muhcDate(new Date())) + '. ' + esc(GOVERNS) + '</p></div>';
    h += renderHelp(r);
    h += '<p class="rmn-restart rmn-noprint"><button type="button" class="rmn-btn-link" data-act="restart">Start again</button></p>';
    return h;
  }

  function renderHelp(r) {
    var a = S.answers, f = S.fields;
    var h = '<section class="rmn-help rmn-noprint" aria-labelledby="rmn-help-h">';
    h += '<h2 id="rmn-help-h">Ask the Research Facilitator for help</h2>';
    h += '<p>Fill in any of these fields to tell the Research Facilitator about your study. Every field is optional. Then send the summary from your own email.</p>';
    h += '<p class="rmn-warn" id="rmn-warn-help">' + esc(WARNING) + '</p>';
    FIELDS.forEach(function (fd) {
      if (!fieldShown(fd, a)) return;
      var id = 'rmn-f-' + fd.id, v = f[fd.id] || '';
      h += '<div class="rmn-field"><label for="' + id + '">' + esc(fd.label) + '</label>';
      if (fd.kind === 'textarea') h += '<textarea id="' + id + '" data-field="' + fd.id + '" maxlength="' + fd.max + '" aria-describedby="rmn-warn-help">' + esc(v) + '</textarea>';
      else if (fd.kind === 'select') { h += '<select id="' + id + '" data-field="' + fd.id + '">'; fd.options.forEach(function (o) { h += '<option value="' + esc(o) + '"' + (o === v ? ' selected' : '') + '>' + esc(o || 'Choose, if you like') + '</option>'; }); h += '</select>'; }
      else h += '<input type="text" id="' + id + '" data-field="' + fd.id + '" maxlength="' + fd.max + '" value="' + esc(v) + '">';
      h += '</div>';
    });
    h += '<div class="rmn-field"><label for="rmn-preview">The summary</label>';
    h += '<textarea id="rmn-preview" class="rmn-preview" aria-describedby="rmn-preview-note">' + esc(S.previewEdited ? S.previewText : currentSummary()) + '</textarea>';
    h += '<span class="rmn-sub" id="rmn-preview-note">You can edit this text before you send it. The two email buttons open a shorter version, without the list of steps.</span>';
    if (S.previewEdited) h += '<button type="button" class="rmn-btn-link" data-act="rebuild">Rebuild the summary from the fields</button>';
    h += '</div>';
    var d = new Date();
    h += '<p>Copy the summary and paste it into an email to the Research Facilitator at <code class="rmn-addr">' + esc(CONTACTS.rf.email) + '</code>, or save it as a PDF to keep.</p>';
    h += '<div class="rmn-nav"><button type="button" class="rmn-btn rmn-btn-main" data-act="copy">Copy the summary</button>';
    h += '<button type="button" class="rmn-btn" data-act="print">Save as PDF or print</button></div>';
    h += '<p class="rmn-out" id="rmn-out"></p>';
    h += '</section>';
    return h;
  }

  function currentSummary() { return buildSummary(S.answers, S.fields, base(), new Date()); }

  function say(msg, el) {
    var live = document.getElementById('rmn-live');
    if (live) { live.textContent = ''; setTimeout(function () { live.textContent = msg; }, 30); }
    var out = el || document.getElementById('rmn-out');
    if (out) out.textContent = msg;
  }

  function copyText(text, done) {
    function fallback() {
      var ta = document.createElement('textarea');
      ta.value = text; ta.setAttribute('readonly', ''); ta.style.position = 'fixed'; ta.style.opacity = '0';
      document.body.appendChild(ta); ta.select();
      var ok = false;
      try { ok = document.execCommand('copy'); } catch (e) { ok = false; }
      document.body.removeChild(ta);
      done(ok);
    }
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(function () { done(true); }, fallback);
    } else fallback();
  }

  function setAnswerFromForm(form, q) {
    var inputs = form.querySelectorAll('input[name="rmn-' + q.id + '"]');
    var vals = [];
    inputs.forEach(function (i) { if (i.checked) vals.push(i.value); });
    if (q.type === 'single') S.answers[q.key] = vals[0];
    else S.answers[q.key] = vals.length ? vals : undefined;
  }

  function nextUnanswered(from) {
    var vis = visibleQuestions(S.answers);
    for (var i = from; i < vis.length; i++) {
      var v = S.answers[vis[i].key];
      if (v == null || (Array.isArray(v) && !v.length)) return i;
      var valid = optionsFor(vis[i], pathOf(S.answers), S.answers).map(function (o) { return o.v; });
      if (asList(v).some(function (x) { return valid.indexOf(x) < 0; })) return i;
    }
    return -1;
  }

  function bind() {
    var r = root();
    var form = r.querySelector('.rmn-form');
    if (form) {
      var q = currentQuestion();
      /* Exclusive answers ("Neither", "Not sure", "Nowhere else") clear the others, and the others clear them.
         An answer that "clears" another (the two Quebec site answers, b485) unchecks it. The rule is toggleAnswer's. */
      form.addEventListener('change', function (e) {
        var t = e.target;
        if (t.type === 'checkbox') {
          var now = [];
          form.querySelectorAll('input[type=checkbox]').forEach(function (i) { if (i.checked && i !== t) now.push(i.value); });
          var keep = toggleAnswer(q, pathOf(S.answers), now, t.value, t.checked);
          form.querySelectorAll('input[type=checkbox]').forEach(function (i) { i.checked = keep.indexOf(i.value) > -1; });
        }
        form.querySelectorAll('.rmn-opt').forEach(function (l) {
          var i = l.querySelector('input'); l.classList.toggle('rmn-on', i.checked);
        });
      });
      form.addEventListener('submit', function (e) {
        e.preventDefault();
        var before = S.answers.q1;
        setAnswerFromForm(form, q);
        var v = S.answers[q.key];
        if (v == null || (Array.isArray(v) && !v.length)) {
          S.error = 'Choose an answer to continue. If you don’t know, choose Not sure.';
          render('#rmn-err');
          return;
        }
        S.error = '';
        if (q.id === 'q1' && before && before !== S.answers.q1) {
          /* A new type of study: its own questions about the product, the extra steps and the stage. */
          delete S.answers.hc; delete S.answers.also; delete S.answers.stage;
        }
        if (S.toSummary) {
          var n = nextUnanswered(0);
          if (n < 0) { S.screen = 'summary'; S.toSummary = false; }
          else S.qIndex = n;
        } else if (S.qIndex < visibleQuestions(S.answers).length - 1) S.qIndex++;
        else S.screen = 'summary';
        render();
      });
    }
    r.querySelectorAll('[data-act]').forEach(function (el) {
      var act = el.getAttribute('data-act');
      if (act === 'mailout') {
        el.addEventListener('click', function () {
          say('Your email program should now show the message. Review it and send it from there. If nothing opened, use Copy the summary and paste it into an email to ' + CONTACTS.rf.email + '.');
        });
        return;
      }
      el.addEventListener('click', function () {
        if (act === 'begin') { S.screen = 'q'; S.qIndex = 0; render(); }
        else if (act === 'back') {
          S.error = '';
          if (S.toSummary) { S.screen = 'summary'; S.toSummary = false; }
          else if (S.qIndex > 0) S.qIndex--;
          else S.screen = 'start';
          render();
        }
        else if (act === 'change') { S.screen = 'q'; S.qIndex = +el.getAttribute('data-i'); S.toSummary = true; render(); }
        else if (act === 'result') { S.screen = 'result'; S.view = null; render(); }
        else if (act === 'tosummary') { S.screen = 'summary'; render(); }
        else if (act === 'restart') { S = freshState(); render(); }
        else if (act === 'stage') {
          var id = el.getAttribute('data-stage');
          S.view = id;
          render('[data-stage="' + id + '"]');
          var head = document.querySelector('[data-rmn-stagehead]');
          say('Showing the steps of the stage ' + (head ? head.textContent : id) + '.', document.getElementById('rmn-live'));
        }
        else if (act === 'copy') {
          var pv = document.getElementById('rmn-preview');
          copyText(pv ? pv.value : currentSummary(), function (ok) {
            say(ok ? 'The summary is copied. Paste it into an email to ' + CONTACTS.rf.email + '.' : 'Copying didn’t work in this browser. Select the summary text and copy it.');
          });
        }
        else if (act === 'copyaddr') {
          copyText(CONTACTS.rf.email, function (ok) { say(ok ? 'The address is copied.' : 'Copying didn’t work in this browser. Select the address and copy it.'); });
        }
        else if (act === 'rebuild') { S.previewEdited = false; S.previewText = ''; render('#rmn-preview'); }
        else if (act === 'print') { window.print(); }
      });
    });
    r.querySelectorAll('[data-field]').forEach(function (el) {
      el.addEventListener('input', function () {
        S.fields[el.getAttribute('data-field')] = el.value.trim();
        refreshOutputs();
      });
      el.addEventListener('change', function () {
        S.fields[el.getAttribute('data-field')] = el.value.trim();
        refreshOutputs();
      });
    });
    var pv = r.querySelector('#rmn-preview');
    if (pv) pv.addEventListener('input', function () { S.previewEdited = true; S.previewText = pv.value; });
  }

  /* Update the summary and the two email links without rebuilding the page, so focus stays put. */
  function refreshOutputs() {
    var r = root(); if (!r) return;
    var pv = r.querySelector('#rmn-preview');
    if (pv && !S.previewEdited) pv.value = currentSummary();
    var links = r.querySelectorAll('a[data-act="mailout"]');
    var d = new Date();
    if (links[0]) links[0].setAttribute('href', outlookUrl(S.answers, S.fields, base(), d));
    if (links[1]) links[1].setAttribute('href', mailtoUrl(S.answers, S.fields, base(), d));
  }

  /* Printing: every stage, one after the other, each link's address printed (b488: the page shows one stage at a time). */
  function beforePrint() {
    if (!S || S.screen !== 'result' || !root()) return;
    S.printAll = true; render(false);
  }
  function afterPrint() {
    if (!S || !S.printAll || !root()) return;
    S.printAll = false; render(false);
  }

  /* ======================================================================
     4. MOUNT
     ====================================================================== */

  var mountedEl = null;
  function init() {
    var r = root();
    if (!r) return;
    injectCSS();
    S = freshState();
    mountedEl = r;
    render(false);
  }

  if (typeof window === 'undefined' || typeof document === 'undefined') return;
  window.__rmnInit = init;
  window.addEventListener('beforeprint', beforePrint);
  window.addEventListener('afterprint', afterPrint);

  function tryMount(n) {
    var r = root();
    if (r) { if (r !== mountedEl) init(); return; }
    if (n > 0) setTimeout(function () { tryMount(n - 1); }, 100);
  }
  /* Mintlify changes pages without reloading. Look for the root after each change of address. */
  var lastUrl = location.href;
  if (document.body && typeof MutationObserver !== 'undefined') {
    new MutationObserver(function () {
      if (location.href !== lastUrl) { lastUrl = location.href; mountedEl = null; setTimeout(function () { tryMount(20); }, 120); }
    }).observe(document.body, { childList: true, subtree: true });
  }
  tryMount(20);
})();
