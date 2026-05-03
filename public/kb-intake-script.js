(function(){

var SECTIONS = [
  { n:1,  key:'S1',  title:'Start Here',              desc:'Tell us who you are and how to reach you.' },
  { n:2,  key:'S2',  title:'Study identification',    desc:'Basic information about the study and its Nagano submission timing.' },
  { n:3,  key:'S3',  title:'Study classification',    desc:'These answers determine your required training level and applicable regulations.' },
  { n:4,  key:'S4',  title:'Data use and privacy',    desc:'How your study uses personal health information. Drives Loi 25 and ÉFVP requirements.' },
  { n:5,  key:'S5',  title:'Team and staffing',       desc:'Who will run the study day-to-day, and what roles are on the team.' },
  { n:6,  key:'S6',  title:'Training status',         desc:'What training is already complete and where you may need support.' },
  { n:7,  key:'S7',  title:'CIM involvement',         desc:'Whether your study will use the Centre for Innovative Medicine.' },
  { n:8,  key:'S8',  title:'Institutional resources', desc:'MUHC clinical services, data tools, and decentralized trial elements.' },
  { n:9,  key:'S9',  title:'Funding and contracts',   desc:'Sponsorship arrangement, funding status, and agreements needed.' },
  { n:10, key:'S10', title:'Readiness and support',   desc:'What is ready now and how the Office can best help.' }
];

var Q = [
  // ===== SECTION 1 =====
  { id:'S1_ENTRY', section:1, type:'single', required:true,
    label:{en:'Where do you fit in?'},
    opts:[
      {val:'pi', en:'PI / Qualified Investigator'},
      {val:'crc', en:'Clinical Research Coordinator'},
      {val:'research-staff', en:'Research staff (nurse, data manager, project manager, research assistant, etc.)'},
      {val:'other', en:'Other (specify)'}
    ]},
  { id:'S1_ENTRY_SPEC', section:1, type:'text', required:true,
    label:{en:'Please specify your role'},
    showIf:function(a){ return a.S1_ENTRY === 'other'; }},
  { id:'S1_ONBEHALF', section:1, type:'yn', required:true,
    label:{en:'Are you completing this intake on behalf of the PI?'},
    hint:{en:'If yes, you\'ll enter the PI\'s name and email in the next section, alongside the study details.'}},
  { id:'S1_CONTACT_NAME', section:1, type:'text', required:true,
    label:{en:'Your name'}},
  { id:'S1_CONTACT_EMAIL', section:1, type:'email', required:true,
    label:{en:'Your email'}},

  // ===== SECTION 2 =====
  { id:'S2_TITLE', section:2, type:'text', required:true,
    label:{en:'Working study title'}},
  { id:'S2_PI_NAME', section:2, type:'text', required:true,
    label:{en:'PI name'},
    hint:function(a){
      if (a.S1_ONBEHALF === 'yes') return {en:'The Principal Investigator this intake is for.'};
      return {en:'If that\'s you, just repeat your name here.'};
    }},
  { id:'S2_PI_EMAIL', section:2, type:'email', required:true,
    label:{en:'PI email'}},
  { id:'S2_DEPT', section:2, type:'single', required:true,
    label:{en:'RI-MUHC research program'},
    hint:{en:'Select the RI-MUHC program your study falls under. If your affiliation spans multiple programs, choose the primary one for this study.'},
    opts:[
      {val:'brain', en:'BRaIN', desc:'Brain Repair and Integrative Neuroscience'},
      {val:'crp', en:'CRP', desc:'Cancer Research Program'},
      {val:'chal', en:'CHAL', desc:'Cardiovascular Health Across the Lifespan'},
      {val:'chhd', en:'CHHD', desc:'Child Health and Human Development'},
      {val:'idigh', en:'IDIGH', desc:'Infectious Diseases and Immunity in Global Health'},
      {val:'medic', en:'MeDiC', desc:'Metabolic Disorders and Complications'},
      {val:'sis', en:'SIS', desc:'Surgical and Interventional Sciences'},
      {val:'resp', en:'RESP', desc:'Translational Research in Respiratory Diseases'},
      {val:'other', en:'Other / not affiliated with a program (specify)'}
    ]},
  { id:'S2_DEPT_SPEC', section:2, type:'text', required:true,
    label:{en:'Please specify your department or affiliation'},
    showIf:function(a){ return a.S2_DEPT === 'other'; }},
  { id:'S2_NAGANO_STATUS', section:2, type:'single', required:true,
    label:{en:'Nagano submission status'},
    opts:[
      {val:'not-started', en:'Not started'},
      {val:'in-progress', en:'In progress'},
      {val:'ready', en:'Ready to submit'},
      {val:'submitted', en:'Submitted — needs help with feedback'},
      {val:'amendment', en:'Amendment or resubmission of an existing study'}
    ]},
  { id:'S2_NAGANO_NUM', section:2, type:'text', required:false,
    label:function(a){
      if (a.S2_NAGANO_STATUS === 'amendment') return {en:'Original Nagano study number'};
      return {en:'Nagano study number (if assigned)'};
    },
    hint:function(a){
      if (a.S2_NAGANO_STATUS === 'amendment') return {en:'So the Office can pull up the existing record rather than treating this as a new study.'};
      return null;
    },
    showIf:function(a){ return ['in-progress','ready','submitted','amendment'].indexOf(a.S2_NAGANO_STATUS) >= 0; }},
  { id:'S2_NAGANO_DATE', section:2, type:'date',
    required: function(a){ return a.S2_NAGANO_STATUS !== 'not-started'; },
    label:function(a){
      if (a.S2_NAGANO_STATUS === 'submitted') return {en:'Actual Nagano submission date'};
      if (a.S2_NAGANO_STATUS === 'amendment') return {en:'Planned amendment submission date'};
      return {en:'Planned Nagano submission date'};
    },
    hint:function(a){
      if (a.S2_NAGANO_STATUS === 'submitted') return {en:'When did you submit? Helps the Office understand how long you\'ve been waiting for REB feedback.'};
      if (a.S2_NAGANO_STATUS === 'amendment') return {en:'When do you plan to submit the amendment? Helps the Office prioritize coordination.'};
      if (a.S2_NAGANO_STATUS === 'not-started') return {en:'Leave blank if you don\'t have a date yet. A rough estimate is fine if you have one — the Office uses it to gauge timing.'};
      return {en:'When do you plan to submit? Helps the Office prioritize time-sensitive coordination.'};
    }},
  { id:'S2_PROTOCOL_UPLOAD', section:2, type:'file', required:false,
    label:{en:'Upload draft protocol or synopsis (optional)'},
    hint:{en:'A synopsis or full draft helps the Office give you more specific feedback. One file, PDF or Word, max 25 MB.'}},
  { id:'S2_LANGUAGE', section:2, type:'single', required:true,
    label:{en:'In which language(s) will your study documents be prepared?'},
    hint:{en:'Quebec is a bilingual jurisdiction. Consent forms and recruitment materials often require both. French translation typically happens after REB approval of the English version.'},
    opts:[
      {val:'en', en:'English only'},
      {val:'fr', en:'French only'},
      {val:'both', en:'English and French'},
      {val:'unsure', en:'Unsure'}
    ]},

  // ===== SECTION 3 =====
  { id:'S3_HUMAN', section:3, type:'yn', required:true,
    label:{en:'Does your research involve human participants, human biological material, or identifiable data about individuals?'},
    hint:{en:'Includes living or deceased individuals, cell lines, biobanked samples, health records, RAMQ data, or any dataset containing personal health information.'},
    def:{mode:'expand',
      title:{en:'What counts as research involving humans?'},
      body:{en:'<strong>TCPS2 (2022), Article 2.1</strong> defines this broadly. It includes any activity that collects, uses, or discloses personal information, biological materials, or data about living or deceased individuals — even if participants never interact with the research team directly. Common cases people don\'t immediately recognize: chart reviews using identifiable hospital records; secondary analysis of coded data where a re-identification key exists somewhere; studies on stored biospecimens; analysis of datasets containing dates of birth, health card numbers, or diagnosis codes combined with other identifiers.'}},
    endsIfNo:true },
  { id:'S3_TYPE', section:3, type:'single', required:true,
    label:{en:'What best describes how your research interacts with participants or data?'},
    opts:[
      {val:'interventional', en:'Interventional', desc:'You administer, apply, or test something (drugs, devices, NHPs, behavioural interventions)'},
      {val:'observational-prospective', en:'Prospective observational', desc:'Participants enrolled and followed, but nothing administered'},
      {val:'retrospective', en:'Retrospective', desc:'Using data or samples that already exist (chart reviews, registries, biobanked specimens)'}
    ]},
  { id:'S3_INT_TYPE', section:3, type:'single', required:true,
    label:{en:'What type of investigational product or intervention?'},
    hint:{en:'Select the primary intervention. If multiple apply, choose the highest-risk category.'},
    opts:[
      {val:'drug', en:'Drug, biologic, or advanced therapy', desc:'Health Canada Division 5'},
      {val:'device', en:'Medical device or surgical / radiotherapy', desc:'ITA; ISO 14155:2020'},
      {val:'nhp', en:'Natural health product', desc:'CTA-NHP application'},
      {val:'low', en:'Non-invasive or behavioural', desc:'No regulated product — psychotherapy, exercise, dietary, educational'}
    ],
    def:{mode:'expand',
      title:{en:'What counts as a Natural Health Product?'},
      body:{en:'Under Health Canada\'s Natural Health Products Regulations (SOR/2003-196), NHPs include vitamins and minerals, herbal remedies, homeopathic medicines, traditional medicines (Traditional Chinese Medicine, Ayurveda), probiotics, amino acids and essential fatty acids, and some OTC products. Clinical trials of NHPs require a CTA-NHP application to Health Canada. <strong>Dietary interventions:</strong> if your study tests a specific NHP or supplementation strategy using a regulated NHP, it\'s an NHP trial. If it tests a broader dietary pattern (e.g., Mediterranean diet, intermittent fasting) without a specific regulated product, select non-invasive/behavioural instead.'}},
    showIf:function(a){ return a.S3_TYPE === 'interventional'; }},
  { id:'S3_DRUG_DEVICE_COMBO', section:3, type:'yn', required:true,
    label:{en:'Does the drug study also involve an investigational medical device?'},
    ynLabels:{en:['Yes — drug + device','No — drug only']},
    showIf:function(a){ return a.S3_INT_TYPE === 'drug'; }},
  { id:'S3_OBS_MODALITIES', section:3, type:'multi', required:true,
    label:{en:'What modalities does your prospective observational study use? (Select all that apply)'},
    hint:{en:'Most observational studies combine several modalities — tick all that apply.'},
    opts:[
      {val:'survey', en:'Surveys or questionnaires'},
      {val:'interview', en:'Interviews or focus groups (qualitative)'},
      {val:'chart-follow', en:'Chart review combined with prospective follow-up'},
      {val:'biospecimen', en:'Biological sample collection (blood, tissue, saliva, etc.)'},
      {val:'physical-measures', en:'Physical measures (vital signs, anthropometrics, spirometry, ECG)'},
      {val:'imaging', en:'Imaging (MRI, CT, ultrasound, DXA)'},
      {val:'procedures', en:'Procedures beyond standard of care (biopsy, stress test)'},
      {val:'wearable', en:'Wearable devices or digital health tools'},
      {val:'registry', en:'Registry enrolment or longitudinal cohort'}
    ],
    showIf:function(a){ return a.S3_TYPE === 'observational-prospective'; }},
  { id:'S3_RETRO_TYPE', section:3, type:'single', required:true,
    label:{en:'What type of retrospective data or material?'},
    opts:[
      {val:'identifiable', en:'Identifiable or potentially re-identifiable health data', desc:'Hospital records, OACIS, RAMQ, provincial registries, linked datasets'},
      {val:'anonymized', en:'Previously anonymized data or biobanked samples', desc:'Fully de-identified datasets, no re-identification key'}
    ],
    showIf:function(a){ return a.S3_TYPE === 'retrospective'; }},
  { id:'S3_COMPLEXITY', section:3, type:'multi', required:true,
    label:{en:'Does your study involve any of the following? (Select all that apply)'},
    opts:[
      {val:'rct', en:'Randomized'},
      {val:'blinded', en:'Blinded'},
      {val:'placebo', en:'Placebo or sham control'},
      {val:'phase1', en:'Phase I or first-in-human'},
      {val:'invasive', en:'Invasive procedures beyond standard of care'},
      {val:'ae-sae', en:'Adverse event / SAE reporting required'},
      {val:'none', en:'None of the above', exclusive:true}
    ],
    def:{mode:'expand',
      title:{en:'What counts as "beyond standard of care"?'},
      body:{en:'Procedures are "beyond standard of care" when they are performed specifically for the research and would not otherwise be indicated for this participant at this time. Examples: a biopsy that wouldn\'t be clinically indicated; additional blood draws beyond what clinical management requires; imaging performed earlier or more frequently than clinically necessary; or any intervention (even a standard one) added purely because the participant is in the study. If the procedure is part of the participant\'s usual clinical care and the research only observes or records the result, it is not "beyond standard of care."'}},
    showIf:function(a){ return a.S3_TYPE === 'interventional'; }},
  { id:'S3_POPULATION', section:3, type:'multi', required:true,
    label:{en:'Which of these populations will your study include? (Select all that apply — Civil Code of Quebec, Art. 21)'},
    hint:{en:'Determines the consent procedure required — parental consent for minors, mandataire authorization for adults unable to consent. Select competent adults if the study only involves adults who can consent for themselves.'},
    def:{mode:'always',
      title:{en:'Legal capacity to consent under the Civil Code'},
      body:{en:'Under Article 21 of the Civil Code of Quebec, minors (under 18) and adults unable to consent require specific authorization procedures. Minors need parental or guardian consent; children 7–13 provide assent as developmentally appropriate; minors 14+ may consent alone only if the REB determines minimal risk. Adults unable to consent require authorization from a <em>mandataire</em>, tutor, or curator. <strong>This question is separate from the vulnerable populations question below</strong> — that one asks about populations warranting heightened ethical scrutiny even when participants can legally consent.'}},
    opts:[
      {val:'minor', en:'Minors (individuals under 18)'},
      {val:'incapable', en:'Adults unable to consent'},
      {val:'competent', en:'Competent adults (18+)', exclusive:true}
    ],
    showIf:function(a){
      return a.S3_TYPE !== 'retrospective';
    }},
  { id:'S3_VULNERABLE', section:3, type:'multi', required:true,
    label:{en:'Does your target population include any of the following? (Select all that apply — TCPS2 Chapter 4)'},
    hint:{en:'This is separate from the consent question above. TCPS2 Chapter 4 addresses populations warranting heightened ethical scrutiny; many can legally consent but require specific protections in the study design.'},
    def:{mode:'always',
      title:{en:'What counts as a vulnerable population?'},
      body:{en:'In TCPS2 Chapter 4 (Fairness and Equity in Research Participation), vulnerability refers to groups whose circumstances may diminish their ability to freely consent, or who may face risks of stigmatization, discrimination, or exploitation through research participation. This is about context, power, and exposure — not about legal capacity. Select any that apply to your target population. If Indigenous peoples are included, <strong>TCPS2 Chapter 9 also applies</strong> — community engagement and OCAP principles are required, not optional.'}},
    opts:[
      {val:'indigenous', en:'Indigenous peoples (First Nations, Inuit, Métis)'},
      {val:'incarcerated', en:'Incarcerated or detained persons (including parole / probation)'},
      {val:'refugee', en:'Refugees, asylum seekers, persons with precarious immigration status'},
      {val:'linguistic', en:'Linguistic minorities (study materials not in primary language)'},
      {val:'stigmatized', en:'Persons with stigmatized conditions (mental illness, HIV, substance use, etc.)'},
      {val:'economic', en:'Persons in economically precarious circumstances'},
      {val:'dependent', en:'Persons in dependent relationships with the research team'},
      {val:'other', en:'Other (specify)'},
      {val:'none', en:'None of the above', exclusive:true}
    ]},
  { id:'S3_VULNERABLE_SPEC', section:3, type:'text', required:true,
    label:{en:'Please specify other vulnerable population(s)'},
    showIf:function(a){ var v = a.S3_VULNERABLE || []; return v.indexOf('other') >= 0; }},
  { id:'S3_SITES', section:3, type:'single', required:true,
    label:{en:'Single-site or multicentre?'},
    opts:[
      {val:'single', en:'Single-site — MUHC only'},
      {val:'multi-lead', en:'Multicentre — MUHC is lead / coordinating site', desc:'You handle regulatory submission and coordinate Quebec RSSS sites'},
      {val:'multi-part', en:'Multicentre — MUHC is participating site', desc:'Another site leads the submission'},
      {val:'multi-cross', en:'Multicentre — cross-provincial / international', desc:'Sites outside Quebec involved'}
    ]},
  { id:'S3_SITES_DETAIL', section:3, type:'textarea', required:false,
    label:function(a){
      if (a.S3_SITES === 'multi-part') return {en:'Lead site and your role (optional)'};
      if (a.S3_SITES === 'multi-lead') return {en:'Participating Quebec RSSS sites (optional)'};
      return {en:'Sites involved (optional)'};
    },
    hint:function(a){
      if (a.S3_SITES === 'multi-part') return {en:'Which institution leads the study, and what role will the MUHC play? Helps the Office anticipate coordination needs.'};
      if (a.S3_SITES === 'multi-lead') return {en:'Which other Quebec RSSS sites will participate? Rough list is fine.'};
      return {en:'Which provinces or countries are involved? Rough list is fine — helps the Office plan cross-jurisdiction coordination.'};
    },
    showIf:function(a){ return ['multi-lead','multi-part','multi-cross'].indexOf(a.S3_SITES) >= 0; }},

  // ===== SECTION 4 =====
  { id:'S4_PHI', section:4, type:'single', required:true,
    label:{en:'Will your study collect, access, or use identifiable personal health information (PHI)?'},
    hint:{en:'PHI includes names, health card numbers, dates of birth, diagnosis codes.'},
    opts:[
      {val:'yes', en:'Yes'},
      {val:'no', en:'No'},
      {val:'unsure', en:'Unsure', desc:'If unsure, we\'ll treat as identifiable and clarify together during review'}
    ],
    def:{mode:'always',
      title:{en:'What counts as identifiable PHI?'},
      body:{en:'Personal health information is identifiable when any element of the dataset — alone or in combination with other elements — could reasonably be used to identify an individual. This includes obvious identifiers (name, health card number, address, phone), dates (date of birth, admission dates, procedure dates), and indirect identifiers that become identifying in combination (age + postal code + rare diagnosis). <strong>Crucially: coded data is considered identifiable if a re-identification key exists anywhere</strong> — even if your research team does not hold the key. Fully anonymized data means the key has been destroyed and re-identification is not reasonably possible. When in doubt, treat it as identifiable.'}}},
  { id:'S4_CONSENT_TYPE', section:4, type:'single', required:true,
    label:{en:'How is consent for use of PHI being handled?'},
    opts:[
      {val:'consent', en:'Prospective informed consent', desc:'Participants informed and sign or verbally agree'},
      {val:'waiver', en:'Waiver of consent / secondary use authorization from REB', desc:'TCPS2 Article 3.7A / 5.5A'},
      {val:'existing', en:'Prior consent covers secondary use', desc:'Previous study or biobank consent includes permission'}
    ],
    def:{mode:'expand',
      title:{en:'When is a consent waiver available?'},
      body:{en:'Under TCPS2 Articles 3.7A and 5.5A, a REB may waive the requirement for consent only when all of the following apply: (1) the research involves no more than minimal risk to participants; (2) the waiver is unlikely to adversely affect the welfare of participants; (3) the research could not practicably be carried out without the waiver; (4) whenever possible and appropriate, participants will be provided with pertinent information after participation; and (5) the research does not involve a therapeutic intervention or other clinical or diagnostic interventions. For RAMQ or provincial registry data, a separate MSSS/CAI authorization is also required, typically taking 3–6 months.'}},
    showIf:function(a){ return a.S4_PHI === 'yes' || a.S4_PHI === 'unsure'; }},
  { id:'S4_CROSSBORDER', section:4, type:'yn', required:true,
    label:{en:'Will identifiable or coded data be shared outside RI-MUHC / MUHC?'},
    hint:{en:'International sponsors, CROs, central labs, cloud platforms outside Quebec, any third party receiving participant-level data.'},
    showIf:function(a){ return a.S4_PHI === 'yes' || a.S4_PHI === 'unsure'; }},

  // ===== SECTION 5 =====
  { id:'S5_OPS_LEAD', section:5, type:'single', required:true,
    label:{en:'Who will run day-to-day study operations?'},
    opts:[
      {val:'pi-directly', en:'PI directly'},
      {val:'crc', en:'Clinical Research Coordinator'},
      {val:'nurse', en:'Research nurse'},
      {val:'trainee', en:'Student / trainee'},
      {val:'cim-staff', en:'CIM staff'},
      {val:'resident-fellow', en:'Medical student / clinical resident or fellow'},
      {val:'other', en:'Other (specify)'}
    ]},
  { id:'S5_OPS_LEAD_SPEC', section:5, type:'text', required:true,
    label:{en:'Please specify'},
    showIf:function(a){ return a.S5_OPS_LEAD === 'other'; }},
  { id:'S5_ROLES', section:5, type:'multi', required:true,
    label:{en:'Roles on the team (select all that apply)'},
    opts:[
      {val:'co-i', en:'Co-investigator / Sub-investigator'},
      {val:'crc', en:'Clinical Research Coordinator'},
      {val:'nurse', en:'Research nurse'},
      {val:'regulatory', en:'Regulatory / ethics support'},
      {val:'data-redcap', en:'Data manager / REDCap'},
      {val:'pm', en:'Project manager'},
      {val:'lab-coord', en:'Lab coordinator'},
      {val:'monitor', en:'Monitor (internal / external)'},
      {val:'other', en:'Other (specify)'}
    ]},
  { id:'S5_ROLES_SPEC', section:5, type:'text', required:true,
    label:{en:'Please specify other role(s)'},
    showIf:function(a){ var v = a.S5_ROLES || []; return v.indexOf('other') >= 0; }},
  { id:'S5_HIRING', section:5, type:'single', required:true,
    label:{en:'Staffing status'},
    opts:[
      {val:'hired', en:'Team fully hired'},
      {val:'hiring', en:'Hiring in progress'},
      {val:'need-hire', en:'Need to hire'}
    ]},
  { id:'S5_EXPERIENCE', section:5, type:'single', required:true,
    label:{en:'How much experience does your team have running studies of this type and scale at the RI-MUHC?'},
    hint:{en:'Self-assessed — helps the Office calibrate onboarding and support. If team members have experience elsewhere but this is their first RI-MUHC study, select "First or second."'},
    opts:[
      {val:'first', en:'First or second study of this type'},
      {val:'some', en:'Some experience (3–5 studies)'},
      {val:'extensive', en:'Extensive — this is routine work for us'}
    ]},
  { id:'S5_TARGET_ENROLLMENT', section:5, type:'number', required:false, min:0, max:100000,
    label:{en:'Target number of participants at this site (optional)'},
    hint:{en:'If you don\'t have a firm number yet, leave blank or enter a rough estimate. Helps the Office with capacity and staffing conversations.'}},

  // ===== SECTION 6 =====
  { id:'S6_PI_TRAINING', section:6, type:'multi', required:true,
    label:{en:'PI / QI training completed (select all that apply)'},
    hint:{en:'Only institutional training (SOP Reader, Competency Assessment) is required by the RI-MUHC. External courses (GCP, HC Div 5, ISO 14155) are required by study type.'},
    opts:[
      {val:'sop-reader', en:'Institutional SOP Reader'},
      {val:'competency', en:'Institutional Competency Assessment'},
      {val:'gcp', en:'ICH Good Clinical Practice (E6 R3)'},
      {val:'hc-div5', en:'Health Canada Division 5'},
      {val:'iso14155', en:'ISO 14155 (GCP for medical devices)'},
      {val:'none-unsure', en:'None / unsure', exclusive:true}
    ]},
  { id:'S6_PI_SUPPORT_NEEDS', section:6, type:'multi', required:false,
    label:{en:'What does the PI / QI need support with? (Optional)'},
    opts:[
      {val:'accountability-map', en:'Accountability map / obligations'},
      {val:'delegation', en:'Delegation log and oversight plan'},
      {val:'consent', en:'Consent templates / process'},
      {val:'budget-feasibility', en:'Budgeting / feasibility'},
      {val:'regulatory', en:'Regulatory submissions (Health Canada)'},
      {val:'dmp', en:'Data management plan'},
      {val:'recruitment', en:'Recruitment plan'}
    ]},
  { id:'S6_TEAM_CREDENTIALS_MATRIX', section:6, type:'matrix', required:false,
    label:{en:'Training credentials by role'},
    hint:{en:'Which RI-MUHC-recognized trainings has each team member completed? Rows are the roles you selected above. Leave blank if not applicable or unknown.'},
    matrixCols:[
      {val:'sop-reader', en:'SOP Reader'},
      {val:'competency', en:'Competency Assessment'},
      {val:'gcp', en:'ICH GCP'},
      {val:'hc-div5', en:'HC Div 5'},
      {val:'iso14155', en:'ISO 14155'}
    ]},
  { id:'S6_TEAM_FAMILIARITY_MATRIX', section:6, type:'matrix', required:false,
    label:{en:'Working familiarity with practical topics'},
    hint:{en:'Separate from formal training — how comfortable is each team member with these day-to-day activities? Helps the Office target support. Leave blank if not applicable or unknown.'},
    matrixCols:[
      {val:'consent', en:'Consent process'},
      {val:'ae-sae', en:'SAE / AE reporting'},
      {val:'deviations', en:'Protocol deviations'},
      {val:'source-data', en:'Source data & documentation'},
      {val:'monitoring', en:'Monitoring & audits'},
      {val:'data-mgmt', en:'Data management'}
    ]},
  { id:'S6_TEAM_NOTES', section:6, type:'textarea', required:false,
    label:{en:'Anything else the Office should know about your team? (Optional)'},
    hint:{en:'Context we won\'t learn from the matrices — upcoming leave, planned hires, training gaps, special circumstances, etc.'}},

  // ===== SECTION 7 =====
  { id:'S7_CIM_USE', section:7, type:'single', required:true,
    label:{en:'Will this study be run through the Centre for Innovative Medicine (CIM)?'},
    opts:[
      {val:'yes', en:'Yes — fully'},
      {val:'partial', en:'Partially — some services'},
      {val:'no', en:'No'},
      {val:'unsure', en:'Unsure — need guidance'}
    ],
    def:{mode:'expand',
      title:{en:'What counts as "partial" CIM use?'},
      body:{en:'Partial use means your study will draw on specific CIM services without being fully coordinated through CIM. Examples: using CIM research nursing for study visits while the CRC manages the rest; sending samples to CIM for processing while conducting visits in your own clinic; using CIM equipment (ECG, DXA, spirometry) without other CIM services. If you\'re not sure whether your intended use is "partial" or "full," select Unsure — the Office will help clarify.'}}},
  { id:'S7_CIM_CONTACTED', section:7, type:'yn', required:true,
    label:{en:'Have you already been in contact with CIM about this study?'},
    showIf:function(a){ return a.S7_CIM_USE && a.S7_CIM_USE !== 'no'; }},
  { id:'S7_CIM_STATUS', section:7, type:'single', required:true,
    label:{en:'Status of CIM conversation'},
    opts:[
      {val:'intro-done', en:'Intro discussion completed'},
      {val:'feasibility-assess', en:'Feasibility being assessed'},
      {val:'confirmed', en:'CIM services confirmed'},
      {val:'awaiting', en:'Awaiting response'},
      {val:'other', en:'Other (specify)'}
    ],
    showIf:function(a){ return a.S7_CIM_CONTACTED === 'yes'; }},
  { id:'S7_CIM_STATUS_SPEC', section:7, type:'text', required:true,
    label:{en:'Please specify'},
    showIf:function(a){ return a.S7_CIM_STATUS === 'other'; }},
  { id:'S7_CIM_BARRIER', section:7, type:'single', required:true,
    label:{en:'If not yet in contact, why?'},
    opts:[
      {val:'didnt-know', en:'Just hadn\'t gotten to it yet'},
      {val:'unsure-qualifies', en:'Unsure whether study qualifies'},
      {val:'cost-funding', en:'Cost / funding uncertainty'},
      {val:'timeline', en:'Timeline uncertainty'},
      {val:'internal', en:'Already resourced internally'},
      {val:'other', en:'Other (specify)'}
    ],
    showIf:function(a){ return a.S7_CIM_CONTACTED === 'no'; }},
  { id:'S7_CIM_BARRIER_SPEC', section:7, type:'text', required:true,
    label:{en:'Please specify'},
    showIf:function(a){ return a.S7_CIM_BARRIER === 'other'; }},
  { id:'S7_CIM_SERVICES', section:7, type:'multi', required:false,
    label:{en:'What CIM support do you anticipate needing?'},
    hint:{en:'Required if you selected "Partially." Optional otherwise.'},
    opts:[
      {val:'space', en:'Clinical space / visit coordination'},
      {val:'nursing', en:'Research nursing support'},
      {val:'pm', en:'Project management'},
      {val:'monitoring', en:'Monitoring'},
      {val:'samples', en:'Sample handling / processing'},
      {val:'platforms', en:'Technical platform / equipment'},
      {val:'full-service', en:'Full service'},
      {val:'other', en:'Other (specify)'}
    ],
    showIf:function(a){ return a.S7_CIM_USE && a.S7_CIM_USE !== 'no'; }},
  { id:'S7_CIM_SERVICES_SPEC', section:7, type:'text', required:true,
    label:{en:'Please specify'},
    showIf:function(a){ var v = a.S7_CIM_SERVICES || []; return v.indexOf('other') >= 0; }},

  // ===== SECTION 8 =====
  { id:'S8_MUHC_SERVICES', section:8, type:'single', required:true,
    label:{en:'Will the study require MUHC clinical services or resources?'},
    opts:[
      {val:'yes', en:'Yes'},
      {val:'no', en:'No'},
      {val:'unsure', en:'Unsure'}
    ]},
  { id:'S8_MUHC_DETAIL', section:8, type:'multi',
    required: function(a){ return a.S8_MUHC_SERVICES === 'yes'; },
    label:{en:'Which MUHC clinical services will your study need? (Select all that apply)'},
    hint:{en:'If you\'re unsure, tick everything that might apply — the Office will help clarify. Leave blank if you don\'t know yet.'},
    opts:[
      {val:'nursing', en:'Nursing'},
      {val:'pharmacy', en:'Pharmacy'},
      {val:'labs', en:'Labs'},
      {val:'imaging', en:'Imaging'},
      {val:'material', en:'Material resources'},
      {val:'other', en:'Other (specify)'}
    ],
    showIf:function(a){ return a.S8_MUHC_SERVICES === 'yes' || a.S8_MUHC_SERVICES === 'unsure'; }},
  { id:'S8_MUHC_DETAIL_SPEC', section:8, type:'text', required:true,
    label:{en:'Please specify'},
    showIf:function(a){ var v = a.S8_MUHC_DETAIL || []; return v.indexOf('other') >= 0; }},
  { id:'S8_DATA_SOURCE', section:8, type:'multi', required:true,
    label:{en:'Data source (select all that apply)'},
    opts:[
      {val:'emr', en:'MUHC clinical systems / EMR'},
      {val:'registry', en:'Existing registry / dataset'},
      {val:'new-collection', en:'New data collection'},
      {val:'external', en:'External dataset'},
      {val:'other', en:'Other (specify)'}
    ]},
  { id:'S8_DATA_SOURCE_SPEC', section:8, type:'text', required:true,
    label:{en:'Please specify'},
    showIf:function(a){ var v = a.S8_DATA_SOURCE || []; return v.indexOf('other') >= 0; }},
  { id:'S8_DATA_TOOLS', section:8, type:'multi', required:true,
    label:{en:'Data / tool needs (select all that apply)'},
    opts:[
      {val:'warehouse', en:'Data warehouse request'},
      {val:'redcap', en:'REDCap build / support'},
      {val:'storage', en:'Secure storage / computing'},
      {val:'governance', en:'Data governance / security consult'},
      {val:'unsure', en:'I\'d like guidance on this'}
    ],
    def:{mode:'expand',
      title:{en:'What\'s a data governance / security consult?'},
      body:{en:'A data governance consult is a review of how your study collects, stores, accesses, shares, and retains data — including access controls, encryption at rest and in transit, role-based permissions, audit logging, retention schedules, and destruction protocols. It\'s recommended when your study involves identifiable PHI with multiple access points; cloud storage outside Quebec; sharing with external collaborators; novel data types (genomic, imaging, wearable device streams); or any situation where the default institutional controls may not be sufficient.'}}},
  { id:'S8_DCT', section:8, type:'yn', required:true,
    label:{en:'Is this a decentralized or hybrid clinical trial?'},
    hint:{en:'Remote consent, telemedicine visits, direct-to-patient IP shipping, home health visits, wearable devices.'},
    def:{mode:'expand',
      title:{en:'Decentralized vs. hybrid vs. "we just use email"'},
      body:{en:'A decentralized clinical trial (DCT) conducts some or all study activities away from a traditional clinical site. A hybrid trial combines on-site visits with decentralized elements. Specific elements: remote / electronic informed consent; telemedicine study visits; direct-to-patient shipping of investigational product; home health visits by mobile nurses; participant-collected data via wearable devices or smartphone apps; remote source data verification. <strong>Using email to coordinate with participants or send reminders does not make a trial decentralized.</strong> If in doubt, answer Yes.'}},
    showIf:function(a){ return a.S3_TYPE !== 'retrospective'; }},

  // ===== SECTION 9 =====
  { id:'S9_SPONSORSHIP', section:9, type:'single', required:true,
    label:{en:'What is the sponsorship arrangement?'},
    opts:[
      {val:'industry', en:'Industry-sponsored', desc:'Pharma, biotech, or device company holds the Sponsor role'},
      {val:'si', en:'Investigator-initiated (Sponsor-Investigator)', desc:'You hold all Sponsor obligations including HC filings, monitoring, IP management'},
      {val:'grant', en:'Grant-funded academic', desc:'CIHR, FRQS, foundation, or institutional funding; no regulated product'}
    ],
    def:{mode:'always',
      title:{en:'Investigator-initiated vs. Sponsor-Investigator'},
      body:{en:'These terms are often conflated but they are not the same. An <strong>investigator-initiated trial (IIT)</strong> is any study you designed and initiated. <strong>Sponsor-Investigator (S-I)</strong> is a specific regulatory role under Health Canada\'s Division 5: a single person who both initiates and conducts the trial AND assumes all Sponsor responsibilities — Health Canada filings, independent monitoring, IP supply chain and GMP compliance, SUSAR reporting, maintaining the TMF. If your IIT involves a Health Canada-regulated product and you hold the CTA, you are a Sponsor-Investigator. If your IIT doesn\'t involve a regulated product, you are an investigator-initiated PI without the S-I regulatory burden. <strong>Select S-I only if the full regulatory obligation applies.</strong>'}}},
  { id:'S9_FUNDING', section:9, type:'single', required:true,
    label:{en:'Funding status'},
    opts:[
      {val:'funded', en:'Funded'},
      {val:'pending', en:'Pending'},
      {val:'not-funded', en:'Not funded'}
    ]},
  { id:'S9_BUDGET_SUPPORT', section:9, type:'single', required:true,
    label:{en:'Need budgeting support?'},
    opts:[
      {val:'yes', en:'Yes'},
      {val:'no', en:'No'},
      {val:'unsure', en:'Unsure'}
    ]},
  { id:'S9_AGREEMENTS', section:9, type:'single', required:true,
    label:{en:'Agreements / contracts needed?'},
    opts:[
      {val:'industry', en:'Industry sponsor agreement'},
      {val:'multicentre', en:'Multicentre agreements'},
      {val:'data-sharing', en:'Data sharing agreement'},
      {val:'none-unsure', en:'None / unsure'}
    ]},

  // ===== SECTION 10 =====
  { id:'S10_READY_ITEMS', section:10, type:'multi', required:true,
    label:{en:'What is ready now? (Select all that apply)'},
    opts:[
      {val:'protocol', en:'Protocol / synopsis'},
      {val:'consent', en:'Consent draft'},
      {val:'recruitment', en:'Recruitment materials draft'},
      {val:'delegation', en:'Delegation / roles plan'},
      {val:'crf', en:'Data collection plan / CRFs'},
      {val:'safety', en:'Safety reporting plan'},
      {val:'budget', en:'Budget outline (incl. MUHC services)'},
      {val:'data-access', en:'Data access plan (warehouse / REDCap / governance)'}
    ]},
  { id:'S10_SUPPORT_PATHWAY', section:10, type:'single', required:true,
    label:{en:'Preferred support type'},
    opts:[
      {val:'self-serve', en:'Self-serve (microsite)', desc:'I\'ll use the Hub on my own'},
      {val:'quick-consult', en:'Quick consult (30 min)', desc:'A short call to clarify specific questions'},
      {val:'warm-handoff', en:'Warm handoff to full support', desc:'The Office works alongside me through submission'}
    ]}
];

var QMAP = {};
for (var qi = 0; qi < Q.length; qi++) { QMAP[Q[qi].id] = Q[qi]; }

// ---------------------------------------------------------------------------
// STATE
// ---------------------------------------------------------------------------
var state = {
  lang: 'en',
  answers: {},
  currentSection: 1,
  uploadedFile: null,
  submitted: false
};

// ---------------------------------------------------------------------------
// HELPERS
// ---------------------------------------------------------------------------
function t(obj) {
  if (!obj) return '';
  return obj[state.lang] || obj.en || '';
}
function escHtml(s) {
  if (s == null) return '';
  return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}
function isVisible(q) {
  if (!q.showIf) return true;
  try { return !!q.showIf(state.answers); } catch(e) { return false; }
}
function questionsInSection(n) {
  var out = [];
  for (var i = 0; i < Q.length; i++) { if (Q[i].section === n) out.push(Q[i]); }
  return out;
}
function pad(n, w) {
  var s = String(n);
  while (s.length < w) s = '0' + s;
  return s;
}

// ---------------------------------------------------------------------------
// VALIDATION
// ---------------------------------------------------------------------------
function validateQuestion(q) {
  var v = state.answers[q.id];
  var isRequired = typeof q.required === 'function' ? !!q.required(state.answers) : !!q.required;
  if (!isRequired) return null;
  if (q.type === 'multi') {
    if (!v || v.length === 0) return 'This field is required.';
    return null;
  }
  if (v == null || v === '') return 'This field is required.';
  if (q.type === 'email') {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) return 'Please enter a valid email.';
  }
  return null;
}
function validateSection(n) {
  var errors = {};
  var qs = questionsInSection(n);
  for (var i = 0; i < qs.length; i++) {
    if (!isVisible(qs[i])) continue;
    var err = validateQuestion(qs[i]);
    if (err) errors[qs[i].id] = err;
  }
  return errors;
}

// ---------------------------------------------------------------------------
// RENDERERS
// ---------------------------------------------------------------------------
function renderDef(def) {
  if (!def) return '';
  var title = t(def.title);
  var body = t(def.body);
  if (def.mode === 'always') {
    return '<div class="ik-def always"><span class="ik-def-title">' + escHtml(title) + '</span><div>' + body + '</div></div>';
  }
  return '<details class="ik-def expand"><summary>' + escHtml(title) + '</summary><div class="ik-def-body">' + body + '</div></details>';
}

function renderQuestion(q) {
  var val = state.answers[q.id];
  var labelObj = typeof q.label === 'function' ? q.label(state.answers) : q.label;
  var hintObj = typeof q.hint === 'function' ? q.hint(state.answers) : q.hint;
  var label = t(labelObj);
  var hint = hintObj ? t(hintObj) : '';
  var isRequired = typeof q.required === 'function' ? !!q.required(state.answers) : !!q.required;
  var reqMark = isRequired ? '<span class="ik-req" title="Required">*</span>' : '';
  var h = '<div class="ik-q" data-qblock="' + q.id + '">';
  h += '<label class="ik-q-label" for="q-' + q.id + '">' + escHtml(label) + reqMark + '</label>';
  if (hint) h += '<div class="ik-q-hint">' + escHtml(hint) + '</div>';
  if (q.def) h += renderDef(q.def);

  if (q.type === 'text') {
    h += '<input type="text" id="q-' + q.id + '" class="ik-input" data-qid="' + q.id + '" value="' + escHtml(val || '') + '">';
  } else if (q.type === 'textarea') {
    h += '<textarea id="q-' + q.id + '" class="ik-textarea" data-qid="' + q.id + '">' + escHtml(val || '') + '</textarea>';
  } else if (q.type === 'email') {
    h += '<input type="email" id="q-' + q.id + '" class="ik-input" data-qid="' + q.id + '" value="' + escHtml(val || '') + '">';
  } else if (q.type === 'date') {
    h += '<input type="date" id="q-' + q.id + '" class="ik-input" data-qid="' + q.id + '" value="' + escHtml(val || '') + '">';
  } else if (q.type === 'number') {
    var minAttr = typeof q.min === 'number' ? ' min="' + q.min + '"' : '';
    var maxAttr = typeof q.max === 'number' ? ' max="' + q.max + '"' : '';
    h += '<input type="number" id="q-' + q.id + '" class="ik-input" data-qid="' + q.id + '" value="' + escHtml(val == null ? '' : String(val)) + '"' + minAttr + maxAttr + ' style="max-width:180px">';
  } else if (q.type === 'yn') {
    var yL = q.ynLabels ? t(q.ynLabels)[0] : 'Yes';
    var nL = q.ynLabels ? t(q.ynLabels)[1] : 'No';
    h += '<div class="ik-yn">';
    h += '<div class="ik-opt' + (val === 'yes' ? ' selected' : '') + '" data-qid="' + q.id + '" data-val="yes"><span class="ik-opt-key">Y</span><div class="ik-opt-body"><span class="ik-opt-label">' + escHtml(yL) + '</span></div></div>';
    h += '<div class="ik-opt' + (val === 'no' ? ' selected' : '') + '" data-qid="' + q.id + '" data-val="no"><span class="ik-opt-key">N</span><div class="ik-opt-body"><span class="ik-opt-label">' + escHtml(nL) + '</span></div></div>';
    h += '</div>';
  } else if (q.type === 'single') {
    h += '<div class="ik-opts">';
    var keys = 'ABCDEFGHIJ';
    for (var i = 0; i < q.opts.length; i++) {
      var o = q.opts[i];
      var sel = val === o.val ? ' selected' : '';
      h += '<div class="ik-opt' + sel + '" data-qid="' + q.id + '" data-val="' + escHtml(o.val) + '">';
      h += '<span class="ik-opt-key">' + keys.charAt(i) + '</span>';
      h += '<div class="ik-opt-body"><span class="ik-opt-label">' + escHtml(t(o)) + '</span>';
      if (o.desc) h += '<span class="ik-opt-desc">' + escHtml(o.desc) + '</span>';
      h += '</div></div>';
    }
    h += '</div>';
  } else if (q.type === 'multi') {
    h += '<div class="ik-opts">';
    var valArr = val || [];
    for (var j = 0; j < q.opts.length; j++) {
      var o2 = q.opts[j];
      var sel2 = valArr.indexOf(o2.val) >= 0 ? ' selected' : '';
      h += '<div class="ik-opt multi' + sel2 + '" data-qid="' + q.id + '" data-val="' + escHtml(o2.val) + '" data-multi="1">';
      h += '<span class="ik-opt-key">✓</span>';
      h += '<div class="ik-opt-body"><span class="ik-opt-label">' + escHtml(t(o2)) + '</span>';
      if (o2.desc) h += '<span class="ik-opt-desc">' + escHtml(o2.desc) + '</span>';
      h += '</div></div>';
    }
    h += '</div>';
  } else if (q.type === 'matrix') {
    var roles = state.answers.S5_ROLES || [];
    if (roles.length === 0) {
      h += '<div class="ik-q-hint" style="font-style:italic">Select team roles in Section 5 first to see the training matrix.</div>';
    } else {
      h += '<div class="ik-matrix-wrap"><table class="ik-matrix"><thead><tr><th>Role</th>';
      for (var k = 0; k < q.matrixCols.length; k++) {
        h += '<th>' + escHtml(t(q.matrixCols[k])) + '</th>';
      }
      h += '</tr></thead><tbody>';
      var matrix = val || {};
      var roleSrc = QMAP.S5_ROLES.opts;
      for (var r = 0; r < roles.length; r++) {
        var roleVal = roles[r];
        if (roleVal === 'other') continue;
        var roleLabel = roleVal;
        for (var rs = 0; rs < roleSrc.length; rs++) { if (roleSrc[rs].val === roleVal) { roleLabel = t(roleSrc[rs]); break; } }
        h += '<tr><td>' + escHtml(roleLabel) + '</td>';
        for (var c = 0; c < q.matrixCols.length; c++) {
          var colVal = q.matrixCols[c].val;
          var checked = matrix[roleVal] && matrix[roleVal].indexOf(colVal) >= 0;
          h += '<td><input type="checkbox" data-matrix-qid="' + q.id + '" data-row="' + escHtml(roleVal) + '" data-col="' + escHtml(colVal) + '"' + (checked ? ' checked' : '') + '></td>';
        }
        h += '</tr>';
      }
      h += '</tbody></table></div>';
    }
  } else if (q.type === 'file') {
    var fileLabel = state.uploadedFile ? state.uploadedFile.name : 'No file selected';
    h += '<div class="ik-file">';
    h += '<input type="file" id="q-' + q.id + '" accept=".pdf,.doc,.docx" data-qid="' + q.id + '">';
    h += '<label for="q-' + q.id + '" class="ik-file-label">Choose file</label>';
    h += '<span class="ik-file-name" id="fname-' + q.id + '">' + escHtml(fileLabel) + '</span>';
    h += '<span class="ik-file-constraints">PDF, DOC, or DOCX. Max 25 MB.</span>';
    h += '</div>';
  }

  h += '<span class="ik-error" id="err-' + q.id + '" style="display:none"></span>';
  h += '</div>';
  return h;
}

function renderSection(n, scrollToTop) {
  var meta = SECTIONS[n-1];
  var qs = questionsInSection(n);
  var area = document.getElementById('ik-form-area');
  if (!area || !meta) return;

  var h = '<div class="ik-section"><div class="ik-section-head">';
  h += '<div class="ik-section-eyebrow">Section ' + n + ' of ' + SECTIONS.length + '</div>';
  h += '<h1 class="ik-section-title">' + escHtml(meta.title) + '</h1>';
  h += '<p class="ik-section-desc">' + escHtml(meta.desc) + '</p>';
  h += '</div>';

  for (var i = 0; i < qs.length; i++) {
    if (isVisible(qs[i])) h += renderQuestion(qs[i]);
  }

  h += '<div class="ik-nav">';
  if (n > 1) h += '<button type="button" class="ik-btn ik-btn-secondary" onclick="ikNav(-1)">← Back</button>';
  else h += '<span></span>';
  if (n < SECTIONS.length) h += '<button type="button" class="ik-btn" onclick="ikNav(1)">Continue →</button>';
  else h += '<button type="button" class="ik-btn ik-btn-submit" onclick="ikSubmit()">Submit intake</button>';
  h += '</div>';

  h += '</div>';
  area.innerHTML = h;

  var fill = document.getElementById('ikProgFill');
  var label = document.getElementById('ikProgLabel');
  var sectionLabel = document.getElementById('ikSectionLabel');
  if (fill) fill.style.width = Math.round((n / SECTIONS.length) * 100) + '%';
  if (label) label.textContent = 'Section ' + n + ' / ' + SECTIONS.length;
  if (sectionLabel) sectionLabel.textContent = meta.title;

  if (scrollToTop) window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ---------------------------------------------------------------------------
// EVENT HANDLERS
// ---------------------------------------------------------------------------
function handleOptClick(el) {
  var qid = el.getAttribute('data-qid');
  var val = el.getAttribute('data-val');
  var multi = el.getAttribute('data-multi') === '1';
  if (!qid || val == null) return;

  if (multi) {
    var cur = state.answers[qid] || [];
    var idx = cur.indexOf(val);

    var qDef = QMAP[qid];
    var clickedOpt = null;
    var exclusiveVals = [];
    if (qDef && qDef.opts) {
      for (var oi = 0; oi < qDef.opts.length; oi++) {
        if (qDef.opts[oi].val === val) clickedOpt = qDef.opts[oi];
        if (qDef.opts[oi].exclusive) exclusiveVals.push(qDef.opts[oi].val);
      }
    }

    if (idx >= 0) {
      cur.splice(idx, 1);
    } else {
      if (clickedOpt && clickedOpt.exclusive) {
        cur = [val];
      } else {
        for (var ei = 0; ei < exclusiveVals.length; ei++) {
          var exIdx = cur.indexOf(exclusiveVals[ei]);
          if (exIdx >= 0) cur.splice(exIdx, 1);
        }
        cur.push(val);
      }
    }
    state.answers[qid] = cur;
  } else {
    state.answers[qid] = val;
  }

  var qBlock = document.querySelector('[data-qblock="' + qid + '"]');
  if (qBlock) {
    var opts = qBlock.querySelectorAll('.ik-opt');
    for (var i = 0; i < opts.length; i++) {
      var optVal = opts[i].getAttribute('data-val');
      if (multi) {
        var active = (state.answers[qid] || []).indexOf(optVal) >= 0;
        if (active) opts[i].classList.add('selected');
        else opts[i].classList.remove('selected');
      } else {
        if (optVal === val) opts[i].classList.add('selected');
        else opts[i].classList.remove('selected');
      }
    }
    qBlock.classList.remove('has-error');
    var errEl = document.getElementById('err-' + qid);
    if (errEl) errEl.style.display = 'none';
  }

  reconcileVisibility();
}

function reconcileVisibility() {
  var qs = questionsInSection(state.currentSection);
  var container = document.getElementById('ik-form-area');
  if (!container) return;
  var sectionCard = container.querySelector('.ik-section');
  if (!sectionCard) return;
  var navEl = sectionCard.querySelector('.ik-nav');

  for (var i = 0; i < qs.length; i++) {
    var q = qs[i];
    var existing = sectionCard.querySelector('[data-qblock="' + q.id + '"]');
    var shouldShow = isVisible(q);
    if (shouldShow && !existing) {
      var tmp = document.createElement('div');
      tmp.innerHTML = renderQuestion(q);
      var node = tmp.firstChild;
      if (navEl) sectionCard.insertBefore(node, navEl);
      else sectionCard.appendChild(node);
    } else if (!shouldShow && existing) {
      existing.parentNode.removeChild(existing);
      delete state.answers[q.id];
    } else if (shouldShow && existing && (typeof q.label === 'function' || typeof q.hint === 'function' || typeof q.required === 'function')) {
      refreshQuestionLabel(existing, q);
    }
  }
}

function refreshQuestionLabel(qBlock, q) {
  var labelObj = typeof q.label === 'function' ? q.label(state.answers) : q.label;
  var hintObj = typeof q.hint === 'function' ? q.hint(state.answers) : q.hint;
  var isRequired = typeof q.required === 'function' ? !!q.required(state.answers) : !!q.required;
  var labelEl = qBlock.querySelector('.ik-q-label');
  if (labelEl) {
    labelEl.innerHTML = escHtml(t(labelObj)) + (isRequired ? '<span class="ik-req" title="Required">*</span>' : '');
  }
  var hintEl = qBlock.querySelector('.ik-q-hint');
  var newHintText = hintObj ? t(hintObj) : '';
  if (hintEl) {
    if (newHintText) hintEl.textContent = newHintText;
    else hintEl.parentNode.removeChild(hintEl);
  } else if (newHintText && labelEl) {
    var newHint = document.createElement('div');
    newHint.className = 'ik-q-hint';
    newHint.textContent = newHintText;
    labelEl.parentNode.insertBefore(newHint, labelEl.nextSibling);
  }
}

function handleTextInput(el) {
  var qid = el.getAttribute('data-qid');
  if (!qid) return;
  state.answers[qid] = el.value;
}

function handleMatrixCheck(el) {
  var qid = el.getAttribute('data-matrix-qid');
  var row = el.getAttribute('data-row');
  var col = el.getAttribute('data-col');
  if (!qid || !row || !col) return;
  var m = state.answers[qid] || {};
  var rowArr = m[row] || [];
  var idx = rowArr.indexOf(col);
  if (el.checked && idx < 0) rowArr.push(col);
  if (!el.checked && idx >= 0) rowArr.splice(idx, 1);
  m[row] = rowArr;
  state.answers[qid] = m;
}

function handleFileChange(el) {
  var qid = el.getAttribute('data-qid');
  if (!qid) return;
  var file = el.files && el.files[0];
  if (!file) return;
  var maxBytes = 25 * 1024 * 1024;
  var validTypes = ['.pdf','.doc','.docx'];
  var ext = '';
  var dot = file.name.lastIndexOf('.');
  if (dot >= 0) ext = file.name.substring(dot).toLowerCase();
  var nameEl = document.getElementById('fname-' + qid);
  if (validTypes.indexOf(ext) < 0) {
    if (nameEl) nameEl.textContent = 'File must be PDF, DOC, or DOCX';
    el.value = '';
    return;
  }
  if (file.size > maxBytes) {
    if (nameEl) nameEl.textContent = 'File exceeds 25 MB limit';
    el.value = '';
    return;
  }
  state.uploadedFile = { name: file.name, size: file.size, type: file.type };
  state.answers[qid] = file.name;
  if (nameEl) nameEl.textContent = file.name + ' (' + Math.round(file.size / 1024) + ' KB)';
}

document.addEventListener('click', function(e) {
  var t = e.target;
  while (t && t !== document.body) {
    if (t.classList && t.classList.contains('ik-opt')) { handleOptClick(t); return; }
    t = t.parentNode;
  }
});
document.addEventListener('input', function(e) {
  var el = e.target;
  if (!el) return;
  if ((el.classList && (el.classList.contains('ik-input') || el.classList.contains('ik-textarea'))) && el.getAttribute('data-qid')) {
    handleTextInput(el);
  }
});
document.addEventListener('change', function(e) {
  var el = e.target;
  if (!el) return;
  if (el.type === 'file' && el.getAttribute('data-qid')) {
    handleFileChange(el);
  } else if (el.getAttribute && el.getAttribute('data-matrix-qid')) {
    handleMatrixCheck(el);
  }
});

// ---------------------------------------------------------------------------
// NAVIGATION
// ---------------------------------------------------------------------------
window.ikNav = function(direction) {
  if (direction === 1) {
    var errors = validateSection(state.currentSection);
    var errIds = [];
    for (var k in errors) { if (errors.hasOwnProperty(k)) errIds.push(k); }
    if (errIds.length > 0) {
      for (var i = 0; i < errIds.length; i++) {
        var qEl = document.querySelector('[data-qblock="' + errIds[i] + '"]');
        if (qEl) qEl.classList.add('has-error');
        var errEl = document.getElementById('err-' + errIds[i]);
        if (errEl) { errEl.style.display = 'block'; errEl.textContent = errors[errIds[i]]; }
      }
      var firstErr = document.querySelector('.ik-q.has-error');
      if (firstErr) firstErr.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }
    if (state.currentSection === 3 && state.answers.S3_HUMAN === 'no') {
      showOutOfScope();
      return;
    }
  }
  state.currentSection += direction;
  if (state.currentSection < 1) state.currentSection = 1;
  if (state.currentSection > SECTIONS.length) state.currentSection = SECTIONS.length;
  renderSection(state.currentSection, true);
};

function showOutOfScope() {
  var area = document.getElementById('ik-form-area');
  if (!area) return;
  var h = '<div class="ik-out-of-scope">';
  h += '<h2>Outside scope</h2>';
  h += '<p>Research that does not involve human participants, biological material, or personal data does not require RI-MUHC human research startup procedures.</p>';
  h += '<p>If you are uncertain whether your project requires ethics review, contact QA at <strong>qaclinicalresearch&#64;muhc&#46;mcgill&#46;ca</strong>.</p>';
  h += '<div class="ik-actions"><button type="button" class="ik-btn ik-btn-secondary" onclick="ikRestart()">← Start over</button></div>';
  h += '</div>';
  area.innerHTML = h;
  var wrap = document.getElementById('ik-progress-wrap');
  if (wrap) wrap.style.display = 'none';
}

window.ikRestart = function() {
  state.answers = {};
  state.currentSection = 1;
  state.uploadedFile = null;
  state.submitted = false;
  var wrap = document.getElementById('ik-progress-wrap');
  if (wrap) wrap.style.display = '';
  var resultArea = document.getElementById('ik-result-area');
  if (resultArea) resultArea.innerHTML = '';
  renderSection(1, true);
};

// ---------------------------------------------------------------------------
// CLASSIFIER
// ---------------------------------------------------------------------------
function classify(a) {
  var d = {};
  var complexity = a.S3_COMPLEXITY || [];
  var obsMods = a.S3_OBS_MODALITIES || [];
  var hasPhase1 = complexity.indexOf('phase1') >= 0;
  var hasAESAE = complexity.indexOf('ae-sae') >= 0;
  var hasInvasive = complexity.indexOf('invasive') >= 0 || obsMods.indexOf('procedures') >= 0;

  if (a.S3_TYPE === 'interventional') {
    if (a.S3_INT_TYPE === 'drug') d.trainingLevel = 'level-1';
    else if (a.S3_INT_TYPE === 'device') d.trainingLevel = 'level-2';
    else if (a.S3_INT_TYPE === 'nhp') d.trainingLevel = 'level-3';
    else d.trainingLevel = 'level-4';
  } else if (a.S3_TYPE === 'observational-prospective') {
    d.trainingLevel = 'level-4';
  } else if (a.S3_TYPE === 'retrospective') {
    d.trainingLevel = 'level-5';
  }

  if (a.S3_INT_TYPE === 'drug' || (a.S3_INT_TYPE === 'device' && a.S3_DRUG_DEVICE_COMBO === 'yes') || hasPhase1 || hasAESAE) {
    d.riskGrouping = 'highest';
  } else if (a.S3_TYPE === 'interventional' && (a.S3_INT_TYPE === 'device' || a.S3_INT_TYPE === 'nhp' || hasInvasive)) {
    d.riskGrouping = 'high';
  } else if (a.S3_TYPE === 'observational-prospective' || a.S3_INT_TYPE === 'low') {
    d.riskGrouping = 'low';
  } else if (a.S3_TYPE === 'retrospective') {
    d.riskGrouping = 'minimal';
  } else {
    d.riskGrouping = 'low';
  }

  if (a.S3_TYPE === 'interventional' && a.S3_INT_TYPE) {
    d.studyTypeBucket = 'interventional-' + a.S3_INT_TYPE;
  } else if (a.S3_TYPE === 'observational-prospective') {
    d.studyTypeBucket = 'observational-prospective';
  } else if (a.S3_TYPE === 'retrospective' && a.S3_RETRO_TYPE) {
    d.studyTypeBucket = 'retrospective-' + a.S3_RETRO_TYPE;
  } else {
    d.studyTypeBucket = 'unknown';
  }

  d.hasPhase1 = hasPhase1;
  d.hasInvasive = hasInvasive;
  d.hasAESAE = hasAESAE;
  d.isDrugStudy = a.S3_INT_TYPE === 'drug';
  d.isDeviceStudy = a.S3_INT_TYPE === 'device' || a.S3_DRUG_DEVICE_COMBO === 'yes';
  d.isSponsorInvestigator = a.S9_SPONSORSHIP === 'si';
  d.isIndustrySponsored = a.S9_SPONSORSHIP === 'industry';
  d.isMulticentre = a.S3_SITES && a.S3_SITES !== 'single';
  d.involvesPHI = a.S4_PHI === 'yes' || a.S4_PHI === 'unsure';
  d.isAmendment = a.S2_NAGANO_STATUS === 'amendment';

  var daysDelta = null;
  if (a.S2_NAGANO_DATE) {
    var entered = new Date(a.S2_NAGANO_DATE);
    var now = new Date();
    daysDelta = Math.floor((entered - now) / (1000 * 60 * 60 * 24));
    if (a.S2_NAGANO_STATUS === 'submitted') {
      var daysSince = Math.abs(daysDelta);
      if (daysSince < 14) d.urgencyBucket = 'critical';
      else if (daysSince < 42) d.urgencyBucket = 'soon';
      else d.urgencyBucket = 'planned';
      d.daysSinceNagano = daysSince;
      d.daysToNagano = null;
    } else {
      if (daysDelta < 14) d.urgencyBucket = 'critical';
      else if (daysDelta < 42) d.urgencyBucket = 'soon';
      else d.urgencyBucket = 'planned';
      d.daysToNagano = daysDelta;
      d.daysSinceNagano = null;
    }
  } else {
    d.daysToNagano = null;
    d.daysSinceNagano = null;
  }

  d.autoHandoff = (
    a.S2_NAGANO_STATUS !== 'submitted' &&
    (a.S7_CIM_USE === 'yes' || a.S7_CIM_USE === 'partial') &&
    a.S7_CIM_CONTACTED === 'no' &&
    d.daysToNagano != null && d.daysToNagano < 14
  );

  var flags = [];
  if (a.S4_PHI === 'yes' || a.S4_PHI === 'unsure') flags.push({code:'loi25-phi', category:'privacy', tone:'amber', label:'Personal Health Information — Loi 25',
    text:(a.S4_PHI === 'unsure' ? 'You indicated you\'re unsure whether your study involves identifiable PHI. We will treat as identifiable pending clarification. ' : '') + 'Ensure your REB application includes a data management and privacy protection plan. Under Loi 25, any confidentiality breach must be disclosed within 72 hours to the CAI and affected individuals.'});
  if (a.S4_CROSSBORDER === 'yes') flags.push({code:'efvp-crossborder', category:'privacy', tone:'coral', label:'Cross-border data transfer — ÉFVP required',
    text:'A Privacy Impact Assessment (ÉFVP) must be completed before any transfer. International transfers to jurisdictions without equivalent privacy protections require additional safeguards.'});
  if (a.S4_CONSENT_TYPE === 'waiver') flags.push({code:'efvp-waiver', category:'privacy', tone:'amber', label:'Consent waiver — TCPS2 Art. 3.7A / 5.5A',
    text:'The REB must determine the research could not practicably proceed with consent, benefits outweigh risks, and privacy is adequately protected.'});
  if (a.S3_RETRO_TYPE === 'identifiable' || a.S4_CONSENT_TYPE === 'waiver') flags.push({code:'msss-cai', category:'privacy', tone:'amber', label:'RAMQ / registry data — MSSS / CAI authorization',
    text:'Secondary use of RAMQ or provincial registries requires formal authorization from MSSS and/or CAI, plus an ÉFVP. Typically 3–6 months, separate from REB approval.'});
  var pop = a.S3_POPULATION || [];
  if (pop.indexOf('minor') >= 0) flags.push({code:'art21-minor', category:'consent', tone:'sky', label:'Minors — Civil Code Art. 21',
    text:'Research involving minors requires written parental or guardian consent. Assent from children 7–13 as developmentally appropriate. A minor 14 or older may consent alone only if the REB determines minimal risk.'});
  if (pop.indexOf('incapable') >= 0) flags.push({code:'art21-incapable', category:'consent', tone:'coral', label:'Adults unable to consent — Civil Code Art. 21',
    text:'Research involving adults who cannot consent requires authorization from a Personne mandatée, tutor, or curator. The risk of the research must never be disproportionate to the expected benefits.'});
  var vuln = a.S3_VULNERABLE || [];
  var hasVuln = vuln.length > 0 && vuln.indexOf('none') < 0;
  if (hasVuln) flags.push({code:'tcps2-ch4', category:'population', tone:'sky', label:'Vulnerable populations — TCPS2 Chapter 4',
    text:'Your target population warrants heightened ethical scrutiny. The REB will assess your protocol for specific protections, recruitment approaches, and consent procedures. Address this explicitly in your submission.'});
  if (vuln.indexOf('indigenous') >= 0) flags.push({code:'tcps2-ch9', category:'population', tone:'amber', label:'Indigenous research — TCPS2 Chapter 9',
    text:'Research involving Indigenous peoples requires community engagement, OCAP principles (ownership, control, access, possession), and typically formal community approval in addition to REB review.'});
  if (a.S2_LANGUAGE === 'fr' || a.S2_LANGUAGE === 'both') flags.push({code:'language-fr', category:'operational', tone:'sky', label:'French study documents required',
    text:'Plan for French translation of consent forms and recruitment materials. French translation typically happens after REB approval of the English version, but materials must be available in French before recruiting French-speaking participants.'});
  else if (a.S2_LANGUAGE === 'unsure') flags.push({code:'language-unsure', category:'operational', tone:'sky', label:'Study language — needs clarification',
    text:'You indicated you\'re unsure about document language. Quebec institutions typically require consent and recruitment materials in both languages. The Office will help clarify based on your study population and setting.'});
  var isSI = a.S9_SPONSORSHIP === 'si';
  var nHC = a.S3_TYPE === 'interventional' && (a.S3_INT_TYPE === 'drug' || a.S3_INT_TYPE === 'device' || a.S3_INT_TYPE === 'nhp');
  if (isSI && nHC) flags.push({code:'si-dual-obligations', category:'sponsorship', tone:'coral', label:'Sponsor-Investigator — dual regulatory obligations',
    text:'You hold both Sponsor and QI/PI responsibilities simultaneously. As Sponsor: HC filings, independent monitoring, IP supply chain, SUSAR reporting, TMF. As QI/PI: all standard site-level responsibilities. The 100-series SOPs apply. Contact QA early in planning.'});
  else if (isSI) flags.push({code:'si-iit', category:'sponsorship', tone:'amber', label:'Investigator-initiated — additional planning required',
    text:'Even without a regulated product, you initiate and hold accountability for the study. Ensure you have a monitoring plan, clear data management procedures, and a defined close-out process.'});
  if (a.S3_SITES === 'multi-lead') flags.push({code:'reb-lead', category:'scope', tone:'sky', label:'Multicentre — MUHC as REB Lead',
    text:'As the Quebec REB Lead site, you submit study documents via Nagano on behalf of all participating RSSS sites.'});
  if (a.S3_SITES === 'multi-cross') flags.push({code:'cross-jurisdiction', category:'scope', tone:'amber', label:'Cross-provincial / international multicentre',
    text:'Sites outside Quebec operate under different regulatory frameworks, ethics approval reciprocity rules, data transfer requirements, and consent standards. Engage the Research Facilitator early to plan.'});
  if (a.S8_DCT === 'yes') flags.push({code:'dct', category:'operational', tone:'amber', label:'Decentralized / hybrid trial design',
    text:'Decentralized elements require specific protocol provisions, technology validation, and additional REB scrutiny. Under ICH E6(R3), ethics committees must assess DCT-specific risks.'});
  if (a.S9_SPONSORSHIP === 'industry') flags.push({code:'reb-fees-directive', category:'sponsorship', tone:'sky', label:'REB billing fees — Directive ministérielle 2023-016',
    text:'Quebec hospitals bill private enterprise Sponsors for REB review and authorization services. Confirm the Sponsor\'s budget accounts for these before submitting.'});
  if (hasPhase1) flags.push({code:'phase1', category:'scope', tone:'coral', label:'Phase I / first-in-human',
    text:'Phase I studies require enhanced safety oversight, dose-escalation protocols, intensive monitoring. Engage CIM and pharmacy early.'});
  if (nHC) flags.push({code:'ich-e6-r3', category:'operational', tone:'teal', label:'ICH E6(R3) — effective April 2026',
    text:'Health Canada adopted ICH E6(R3) effective April 1, 2026. The guideline introduces a quality management system (QMS) approach, emphasizes risk-proportionate oversight, and updates requirements for electronic systems, decentralized trials, and monitoring.'});
  if (a.S9_FUNDING === 'not-funded') flags.push({code:'funding-not-secured', category:'operational', tone:'amber', label:'Funding not yet secured',
    text:'Your study is not yet funded. The Office can help with budget planning and funding sources, but recruitment and site activation cannot begin until a funding source is confirmed and the agreement is in place.'});
  if (a.S5_HIRING === 'need-hire') flags.push({code:'staffing-gap', category:'operational', tone:'amber', label:'Team not yet in place',
    text:'You indicated you need to hire team members. The Office can advise on hiring timing relative to your Nagano submission and activation milestones. Study-specific training and Task Delegation Log signing cannot complete until the team is in place.'});
  d.flags = flags;

  var readyItems = a.S10_READY_ITEMS || [];
  var allItems = ['protocol','consent','recruitment','delegation','crf','safety','budget','data-access'];
  d.readinessGaps = [];
  for (var j = 0; j < allItems.length; j++) {
    if (readyItems.indexOf(allItems[j]) < 0) d.readinessGaps.push(allItems[j]);
  }

  var researcherChoice = a.S10_SUPPORT_PATHWAY || 'self-serve';
  var engineChoice = 'self-serve';
  if (d.riskGrouping === 'highest' || a.S5_EXPERIENCE === 'first' || d.autoHandoff || flags.length >= 5) {
    engineChoice = 'warm-handoff';
  } else if (d.riskGrouping === 'high' || flags.length >= 3) {
    engineChoice = 'quick-consult';
  }
  var order = ['self-serve','quick-consult','warm-handoff'];
  d.recommendedPathway = order.indexOf(researcherChoice) > order.indexOf(engineChoice) ? researcherChoice : engineChoice;

  var piTraining = a.S6_PI_TRAINING || [];
  d.newToResearch = (a.S5_EXPERIENCE === 'first' && piTraining.indexOf('none-unsure') >= 0);

  if (d.newToResearch) {
    flags.push({code:'new-to-research', category:'operational', tone:'sky', label:'New to RI-MUHC clinical research',
      text:'This appears to be a first study for your team, and institutional training is not yet complete. The Office of Clinical Research will include an orientation to the Hub, the SOP Reader, and the Competency Assessment in your follow-up.'});
  }

  return d;
}

// ---------------------------------------------------------------------------
// LABEL MAPS
// ---------------------------------------------------------------------------
var LEVEL_LABEL = { 'level-1':'Level I — Drug studies', 'level-2':'Level II — Medical devices', 'level-3':'Level III — NHP', 'level-4':'Level IV — Observational', 'level-5':'Level V — Retrospective' };
var PATHWAY_LABEL = { 'self-serve':'Self-serve', 'quick-consult':'Quick consult', 'warm-handoff':'Warm handoff' };
var URGENCY_LABEL = { 'critical':'Critical', 'soon':'Soon', 'planned':'Planned' };
var READINESS_LABEL = { protocol:'Protocol / synopsis', consent:'Consent draft', recruitment:'Recruitment materials', delegation:'Delegation / roles plan', crf:'Data collection plan / CRFs', safety:'Safety reporting plan', budget:'Budget outline', 'data-access':'Data access plan' };

// ---------------------------------------------------------------------------
// CHECKLIST + NEXT STEPS BUILDERS
// ---------------------------------------------------------------------------
function buildChecklist(a, d) {
  var levelNum = d.trainingLevel ? parseInt(d.trainingLevel.split('-')[1], 10) : null;
  var nHC = a.S3_TYPE === 'interventional' && (a.S3_INT_TYPE === 'drug' || a.S3_INT_TYPE === 'device' || a.S3_INT_TYPE === 'nhp');
  var isSI = a.S9_SPONSORSHIP === 'si';
  var isInd = a.S9_SPONSORSHIP === 'industry';

  var credentials = [];
  credentials.push('Obtain or verify RI-MUHC Research Privileges or Researcher Status for the QI/PI and designated backup.');
  if (levelNum) credentials.push('Complete institutional training at ' + (LEVEL_LABEL[d.trainingLevel] || d.trainingLevel) + ': SOP Reader + Competency Assessment via TalentLMS before signing the Task Delegation Log.');
  if (levelNum && levelNum <= 4) credentials.push('ICH E6(R3) Good Clinical Practice (CITI) — renew every 2 years.');
  if (d.trainingLevel === 'level-1') credentials.push('Health Canada Part C Division 5 training (CITI) — required for Level I.');
  if (d.trainingLevel === 'level-2' || (d.trainingLevel === 'level-1' && a.S3_DRUG_DEVICE_COMBO === 'yes')) credentials.push('ISO 14155:2020 GCP for Medical Devices training.');
  credentials.push('Prepare the Task Delegation Log. QI/PI signature confirms qualification and training.');
  credentials.push('Verify the 90-day certificate rule — all certificates must not be within 90 days of expiry at Nagano submission.');

  var docs = [];
  docs.push('Finalize the study protocol. The QI/PI signature confirms commitment to GCP and applicable regulatory requirements.');
  docs.push('Prepare the Informed Consent Form based on the MUHC REB ICF template. Submit in editable Word format; French translation required post-approval.');
  if ((a.S3_POPULATION || []).indexOf('minor') >= 0) docs.push('Prepare age-appropriate assent forms. Parental consent required for all minors.');
  if (nHC) docs.push('Investigator\'s Brochure (IB) or Product Monograph — current version required before submission to REB.');
  docs.push('Study budget using the RI-MUHC template. Overhead varies by funding type.');
  docs.push('Contracts and agreements via the Research Agreements Office — initiate early, contracts can take weeks.');
  docs.push('Conflict of interest disclosure — McGill COI system plus study-level disclosure in the REB submission.');

  var submission = [];
  submission.push('Submit via Nagano (F11 form or applicable variant based on study type).');
  submission.push('REB ethics and scientific review runs in parallel with feasibility streams.');
  submission.push('QA feasibility review — confirms QI/PI Privileges and completed institutional training.');
  submission.push('Research Agreements Office review — required before MUHC Authorization.');
  if (a.S3_INT_TYPE === 'drug' || a.S3_INT_TYPE === 'nhp' || (a.S3_INT_TYPE === 'device' && a.S3_DRUG_DEVICE_COMBO === 'yes')) {
    submission.push('Pharmacy feasibility — triggered by F11 drug/NHP questions. Pharmacy agreement required before study start.');
  }
  if (a.S7_CIM_USE && a.S7_CIM_USE !== 'no') submission.push('CIM feasibility assessment — required for clinical research infrastructure at Glen.');
  submission.push('DPS resource utilization review — required when MUHC clinical resources are used.');
  if ((a.S4_PHI === 'yes' || a.S4_PHI === 'unsure') && (a.S4_CROSSBORDER === 'yes' || a.S4_CONSENT_TYPE === 'waiver')) submission.push('ÉFVP review by MUHC Access to Information Officer — submit F17 or F18 alongside F11.');
  submission.push('MUHC Authorization letter — not granted until all review streams are complete.');
  submission.push('Respond to REB questions within 3 months or the file closes and must be fully resubmitted.');

  var setup = [];
  if (isInd) setup.push('Site Feasibility Visit (SFV) — complete the Study Feasibility Checklist before the visit.');
  if (isSI) setup.push('Internal feasibility assessment using SOP-CR-004 Appendix 1 — population access, team capacity, space, equipment, funding.');
  setup.push('Site Initiation Visit (SIV) — occurs after all approvals are in place.');
  setup.push('Study-specific training — complete review of protocol and IB before SIV.');
  setup.push('Sign the Task Delegation Log — after both institutional and study-specific training are complete.');
  if (nHC) setup.push('Set up Investigator Site File (ISF) per SOP-CR-015.');
  if (isSI) {
    setup.push('Set up Trial Master File (TMF) — Sponsor-level documents including monitoring reports, HC submissions, SUSAR logs.');
    setup.push('Arrange independent monitoring — external CRA, affiliate CRC, or CRO. Monitor must not be on the site Task Delegation Log.');
  }
  if ((a.S8_DATA_TOOLS || []).indexOf('redcap') >= 0) setup.push('REDCap database setup via CORD — engage early for eCRF design and user access configuration.');
  if (isInd || isSI) setup.push('Receive the Sponsor\'s Go Letter — participant enrolment may not begin until this is received.');

  return [
    { title: 'Credentials and training', items: credentials },
    { title: 'Study documents', items: docs },
    { title: 'Submission and review', items: submission },
    { title: 'Site setup and activation', items: setup }
  ];
}

function buildNextSteps(a, d) {
  var next = [];
  var pathway = d.recommendedPathway;

  if (pathway === 'warm-handoff') {
    next.push('The Office of Clinical Research will contact you within 5 business days for a scheduled handoff meeting.');
    next.push('The Research Facilitator will be assigned to your study and will work alongside you through submission.');
  } else if (pathway === 'quick-consult') {
    next.push('The Office of Clinical Research will contact you within 5 business days to schedule a 30-minute consult.');
  } else {
    next.push('Use the Clinical Research Hub as your primary reference. The Office will review your intake and reach out if any concerns arise.');
  }

  if (d.autoHandoff) {
    next.push('Your Nagano submission date is within 14 days and CIM has not yet been engaged. We have flagged this for an urgent warm handoff to the CIM team.');
  }

  var needs = a.S6_PI_SUPPORT_NEEDS || [];
  if (needs.indexOf('regulatory') >= 0) next.push('Regulatory support: Regulatory Affairs will be copied on your triage record.');
  if (needs.indexOf('budget-feasibility') >= 0 || a.S9_BUDGET_SUPPORT === 'yes') next.push('Budget support: Pre-Awards will be notified.');
  if (needs.indexOf('recruitment') >= 0) next.push('Recruitment support: the Research Facilitator will include recruitment planning in your consult.');

  next.push('Review the relevant Hub pages listed below to prepare for your Office meeting.');
  return next;
}

// ---------------------------------------------------------------------------
// SUBMIT + RESULT
// ---------------------------------------------------------------------------
window.ikSubmit = function() {
  var errors = validateSection(state.currentSection);
  var errIds = [];
  for (var k in errors) { if (errors.hasOwnProperty(k)) errIds.push(k); }
  if (errIds.length > 0) {
    for (var i = 0; i < errIds.length; i++) {
      var qEl = document.querySelector('[data-qblock="' + errIds[i] + '"]');
      if (qEl) qEl.classList.add('has-error');
      var errEl = document.getElementById('err-' + errIds[i]);
      if (errEl) { errEl.style.display = 'block'; errEl.textContent = errors[errIds[i]]; }
    }
    var firstErr = document.querySelector('.ik-q.has-error');
    if (firstErr) firstErr.scrollIntoView({ behavior: 'smooth', block: 'center' });
    return;
  }

  var derived = classify(state.answers);
  var d = new Date();
  var intakeId = 'OCR-' + d.getFullYear() + pad(d.getMonth()+1, 2) + pad(d.getDate(), 2) + '-' + pad(Math.floor(Math.random()*10000), 4);
  var submittedMonth = d.getFullYear() + '-' + pad(d.getMonth()+1, 2);
  var submittedQuarter = d.getFullYear() + '-Q' + (Math.floor(d.getMonth() / 3) + 1);
  var payload = {
    intakeId: intakeId,
    submittedAt: d.toISOString(),
    submittedMonth: submittedMonth,
    submittedQuarter: submittedQuarter,
    responseLanguage: state.lang,
    answers: state.answers,
    uploadedFile: state.uploadedFile,
    derived: derived,
    schemaVersion: '1.1'
  };

  state.submitted = true;
  console.log('=== RI-MUHC Clinical Research Intake — Submission ===');
  console.log(payload);
  showResult(payload);
};

function showResult(payload) {
  var a = payload.answers;
  var d = payload.derived;
  var area = document.getElementById('ik-result-area');
  var formArea = document.getElementById('ik-form-area');
  var progWrap = document.getElementById('ik-progress-wrap');
  if (formArea) formArea.innerHTML = '';
  if (progWrap) progWrap.style.display = 'none';
  if (!area) return;

  var h = '<div class="ik-result">';

  h += '<div class="ik-confirm">';
  h += '<div class="ik-confirm-icon" aria-hidden="true"></div>';
  h += '<div class="ik-confirm-body">';
  h += '<div class="ik-confirm-title">Your intake has been received</div>';
  h += '<div class="ik-confirm-text">The Office of Clinical Research will contact you within 5 business days. Your personalized startup checklist is below — save it as a PDF or print it for your records. <span class="ik-confirm-id">Ref: ' + escHtml(payload.intakeId) + '</span></div>';
  h += '</div></div>';

  h += '<div class="ik-profile">';
  h += '<div class="ik-profile-eyebrow">Study profile</div>';
  h += '<div class="ik-profile-title">' + escHtml(a.S2_TITLE || 'Your study') + '</div>';
  h += '<dl class="ik-profile-grid">';
  if (d.trainingLevel) h += '<div class="ik-profile-stat"><dt>Training level</dt><dd>' + escHtml(LEVEL_LABEL[d.trainingLevel] || d.trainingLevel) + '</dd></div>';
  h += '<div class="ik-profile-stat"><dt>Recommended pathway</dt><dd>' + escHtml(PATHWAY_LABEL[d.recommendedPathway] || d.recommendedPathway) + '</dd></div>';
  if (d.urgencyBucket) h += '<div class="ik-profile-stat"><dt>Urgency</dt><dd>' + escHtml(URGENCY_LABEL[d.urgencyBucket] || d.urgencyBucket) + '</dd></div>';
  h += '</dl></div>';

  h += '<div class="ik-actions" style="margin-top:0;margin-bottom:14px">';
  h += '<button type="button" class="ik-btn" onclick="ikPrint()">📄 Save as PDF / Print</button>';
  h += '<button type="button" class="ik-btn ik-btn-secondary" onclick="ikRestart()">Start a new intake</button>';
  h += '</div>';

  h += '<div class="ik-result-section"><h2>Next steps</h2><ul>';
  var next = buildNextSteps(a, d);
  for (var i = 0; i < next.length; i++) h += '<li>' + escHtml(next[i]) + '</li>';
  h += '</ul></div>';

  if (d.flags && d.flags.length > 0) {
    h += '<div class="ik-result-section"><h2>Regulatory flags and considerations</h2><div class="ik-flags">';
    for (var f = 0; f < d.flags.length; f++) {
      var fl = d.flags[f];
      h += '<div class="ik-flag ' + fl.tone + '"><strong>' + escHtml(fl.label) + '</strong>' + escHtml(fl.text) + '</div>';
    }
    h += '</div></div>';
  }

  h += '<div class="ik-result-section"><h2>Your startup checklist</h2>';
  var groups = buildChecklist(a, d);
  for (var gi = 0; gi < groups.length; gi++) {
    var grp = groups[gi];
    if (!grp.items || grp.items.length === 0) continue;
    h += '<div class="ik-checklist-group">';
    h += '<h3 class="ik-checklist-group-title">' + escHtml(grp.title) + '</h3>';
    h += '<ul>';
    for (var ci = 0; ci < grp.items.length; ci++) h += '<li>' + escHtml(grp.items[ci]) + '</li>';
    h += '</ul></div>';
  }
  h += '</div>';

  if (d.readinessGaps && d.readinessGaps.length > 0) {
    h += '<div class="ik-result-section"><h2>Items still to prepare</h2><ul>';
    for (var g = 0; g < d.readinessGaps.length; g++) {
      h += '<li>' + escHtml(READINESS_LABEL[d.readinessGaps[g]] || d.readinessGaps[g]) + '</li>';
    }
    h += '</ul></div>';
  }

  h += '<div class="ik-devdata">';
  h += '<h3>Demo mode — what gets sent to the Office</h3>';
  h += '<p style="margin-bottom:8px">In the production system, the data below is written to SharePoint and becomes the Office of Clinical Research\'s triage record. Researchers don\'t normally see this.</p>';
  h += '<details><summary>View submission data (JSON)</summary>';
  h += '<pre>' + escHtml(JSON.stringify(payload, null, 2)) + '</pre>';
  h += '<button type="button" class="ik-btn ik-btn-secondary" onclick="ikDownload()" style="margin-top:10px">Download JSON</button>';
  h += '</details></div>';

  h += '</div>';
  area.innerHTML = h;
  window.scrollTo({ top: 0, behavior: 'smooth' });

  window._ikLastPayload = payload;
}

window.ikPrint = function() {
  window.print();
};

window.ikDownload = function() {
  if (!window._ikLastPayload) return;
  var blob = new Blob([JSON.stringify(window._ikLastPayload, null, 2)], { type: 'application/json' });
  var url = URL.createObjectURL(blob);
  var a = document.createElement('a');
  a.href = url;
  a.download = window._ikLastPayload.intakeId + '.json';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

// ---------------------------------------------------------------------------
// INIT — render form on load; keep retrying in case Mintlify re-renders
// ---------------------------------------------------------------------------
window.ikRenderForm = function() {
  var area = document.getElementById('ik-form-area');
  if (!area) return;
  if (!area.innerHTML.trim()) renderSection(state.currentSection);
};

// Clear any interval left over from a previous SPA visit, then start a new
// one. Runs indefinitely at 400ms — cheap DOM check, no visible delay.
// The guard in ikRenderForm prevents resetting a form the user is filling.
if (window._ikPollInterval) clearInterval(window._ikPollInterval);
window._ikPollInterval = setInterval(function() {
  window.ikRenderForm && window.ikRenderForm();
}, 400);

window.ikRenderForm();

})();
