(function(){

// Instance guard — invalidates event listeners from any previously-loaded copy
// of this script (e.g. old cached version still attached to document).
var _ikInstance = Date.now() + Math.random();
window._ikCurrentInstance = _ikInstance;

// ---------------------------------------------------------------------------
// EMAIL CONFIGURATION
//
// This form sends intake submissions by email using EmailJS (emailjs.com).
// EmailJS is a client-side email service — it works without a backend or
// server, which is required here because Mintlify is a static site.
//
// If you want to change the recipient address (toEmail) or swap out the
// email provider, you MUST also have an active EmailJS account wired up.
// Changing toEmail alone won't work without valid serviceId / templateId /
// publicKey credentials pointing to a configured EmailJS service.
//
// HOW TO SET THIS UP (one-time):
//   1. Create a free account at https://www.emailjs.com
//      (free tier = 200 emails/month, no backend needed)
//   2. EmailJS → Email Services → Add New Service
//      Connect your Gmail, Outlook, or SMTP account.
//      Copy the Service ID (e.g. "service_abc123").
//   3. EmailJS → Email Templates → Create New Template
//      Set the template fields as follows:
//        To:      {{to_email}}
//        Subject: {{subject}}
//        Body:    {{{message_html}}}   ← triple braces = unescaped HTML
//      Copy the Template ID (e.g. "template_xyz789").
//   4. EmailJS → Account → General → copy your Public Key.
//   5. Fill in the four values below and deploy.
//
// TO CHANGE THE RECIPIENT EMAIL: update toEmail below. No other code
// changes are needed as long as serviceId / templateId / publicKey remain
// valid. If you rotate or replace the EmailJS account, update all four.
// ---------------------------------------------------------------------------
var IK_EMAIL_CONFIG = {
  serviceId:  'service_p1ld1rp',       // EmailJS → Email Services → Service ID
  templateId: 'template_sqehaop',      // EmailJS → Email Templates → Template ID
  publicKey:  'bY9Iw2R78ouIgz-rb',    // EmailJS → Account → Public Key
  toEmail:    'matthew.fiorentino@muhc.mcgill.ca'
};

// Base URL for email links — relative paths (/kb/...) are fine on screen but
// won't work in email clients. Update this when the site moves to its permanent domain.
var IK_BASE_URL = 'https://ri-muhc.mintlify.app';

var SECTIONS = [
  { n:1, key:'S1', title:'Where are you?',   desc:'Tell us your role and where you are in your study journey.' },
  { n:2, key:'S2', title:'Your study',       desc:'Basic information about the study and your research program.' },
  { n:3, key:'S3', title:'Study type',       desc:'These answers determine your training requirements and regulatory pathway.' },
  { n:4, key:'S4', title:'Your team',        desc:'Who will run the study and what support is already in place.' },
  { n:5, key:'S5', title:'Anything else?',   desc:'Optional — tell us what you need most right now so the Research Facilitator can prepare.' }
];

// ---------------------------------------------------------------------------
// QUESTIONS
// ---------------------------------------------------------------------------
var Q = [

  // ===== SECTION 1 =====
  { id:'S1_STAGE', section:1, type:'single', required:true,
    label:{en:'Where are you in your study journey?'},
    opts:[
      {val:'idea',       en:'Idea or early thinking',                    desc:'Haven\'t started designing yet — exploring feasibility or planning to apply for funding'},
      {val:'design',     en:'Designing the study',                       desc:'Protocol, team, or budget in progress — not yet ready to submit to Nagano'},
      {val:'submission', en:'Preparing to submit or already submitted',  desc:'Working toward or waiting on Nagano / REB approval'},
      {val:'conduct',    en:'Study is approved and actively running',    desc:'MUHC Authorization is in place — looking for conduct support'},
      {val:'closeout',   en:'Close-out or amendment',                    desc:'Wrapping up an existing study or filing a change to an approved study'}
    ]},

  { id:'S1_ENTRY', section:1, type:'single', required:true,
    label:{en:'What is your role?'},
    opts:[
      {val:'pi',             en:'PI / Qualified Investigator',     desc:'You hold ultimate accountability for the study'},
      {val:'crc',            en:'Clinical Research Coordinator',   desc:'Day-to-day coordination and management'},
      {val:'research-staff', en:'Research staff',                  desc:'Nurse, data manager, research assistant, project manager, etc.'},
      {val:'other',          en:'Other (specify)'}
    ]},
  { id:'S1_ENTRY_SPEC', section:1, type:'text', required:true,
    label:{en:'Please specify your role'},
    showIf:function(a){ return a.S1_ENTRY === 'other'; }},

  { id:'S1_ONBEHALF', section:1, type:'yn', required:true,
    label:{en:'Are you completing this on behalf of the PI?'},
    hint:{en:'If yes, enter the PI\'s name and email in the next section alongside the study details.'} },

  { id:'S1_CONTACT_NAME',  section:1, type:'text',  required:true, label:{en:'Your name'} },
  { id:'S1_CONTACT_EMAIL', section:1, type:'email', required:true, label:{en:'Your email'} },

  // ===== SECTION 2 =====
  { id:'S2_TITLE', section:2, type:'text', required:true,
    label:{en:'Working study title'} },

  { id:'S2_PI_NAME', section:2, type:'text', required:true,
    label:{en:'PI name'},
    hint:function(a){
      if (a.S1_ONBEHALF === 'yes') return {en:'The PI this intake is for.'};
      return {en:'If that\'s you, just repeat your name here.'};
    }},
  { id:'S2_PI_EMAIL', section:2, type:'email', required:true, label:{en:'PI email'} },

  { id:'S2_DEPT', section:2, type:'single', required:true,
    label:{en:'RI-MUHC research program'},
    hint:{en:'Select the program your study falls under. If you span multiple programs, choose the primary one.'},
    opts:[
      {val:'brain',  en:'BRaIN',  desc:'Brain Repair and Integrative Neuroscience'},
      {val:'crp',    en:'CRP',    desc:'Cancer Research Program'},
      {val:'chal',   en:'CHAL',   desc:'Cardiovascular Health Across the Lifespan'},
      {val:'chhd',   en:'CHHD',   desc:'Child Health and Human Development'},
      {val:'idigh',  en:'IDIGH',  desc:'Infectious Diseases and Immunity in Global Health'},
      {val:'medic',  en:'MeDiC',  desc:'Metabolic Disorders and Complications'},
      {val:'sis',    en:'SIS',    desc:'Surgical and Interventional Sciences'},
      {val:'resp',   en:'RESP',   desc:'Translational Research in Respiratory Diseases'},
      {val:'other',  en:'Other / not affiliated with a program'}
    ]},
  { id:'S2_DEPT_SPEC', section:2, type:'text', required:true,
    label:{en:'Please specify your department or affiliation'},
    showIf:function(a){ return a.S2_DEPT === 'other'; }},

  { id:'S2_NAGANO_STATUS', section:2, type:'single', required:true,
    label:{en:'Nagano submission status'},
    opts:[
      {val:'not-started', en:'Not started yet'},
      {val:'in-progress', en:'In progress'},
      {val:'ready',       en:'Ready to submit'},
      {val:'submitted',   en:'Submitted — awaiting REB or institutional feedback'},
      {val:'amendment',   en:'Amendment or resubmission of an existing study'}
    ],
    showIf:function(a){ return a.S1_STAGE === 'submission'; }},

  { id:'S2_NAGANO_NUM', section:2, type:'text', required:false,
    label:{en:'Nagano study number'},
    hint:{en:'So the Research Facilitator can pull up your record directly.'},
    showIf:function(a){ return a.S1_STAGE === 'conduct' || a.S1_STAGE === 'closeout'; }},

  // ===== SECTION 3 =====
  { id:'S3_TYPE', section:3, type:'single', required:true,
    label:{en:'What best describes your research?'},
    opts:[
      {val:'interventional',            en:'Interventional',           desc:'You administer or test something — drugs, devices, NHPs, or behavioural interventions'},
      {val:'observational-prospective', en:'Prospective observational', desc:'Participants enrolled and followed forward, but nothing administered'},
      {val:'retrospective',             en:'Retrospective',             desc:'Using data or samples that already exist — chart reviews, registries, biobanked specimens'}
    ],
    showIf:function(a){ return a.S1_STAGE !== 'closeout'; }},

  { id:'S3_INT_TYPE', section:3, type:'single', required:true,
    label:{en:'What type of product or intervention?'},
    hint:{en:'Select the primary category. If multiple apply, choose the highest-risk.'},
    opts:[
      {val:'drug',   en:'Drug, biologic, or advanced therapy',      desc:'Health Canada Division 5 — CTA required'},
      {val:'device', en:'Medical device or surgical / radiotherapy', desc:'ITA required; ISO 14155:2020 applies'},
      {val:'nhp',    en:'Natural health product',                    desc:'CTA-NHP application to Health Canada'},
      {val:'low',    en:'Non-invasive or behavioural',               desc:'No regulated product — psychotherapy, exercise, dietary, educational'}
    ],
    showIf:function(a){ return a.S3_TYPE === 'interventional'; }},

  { id:'S3_PHI', section:3, type:'single', required:true,
    label:{en:'Will the study collect, access, or use identifiable personal health information?'},
    hint:{en:'PHI includes names, health card numbers, dates of birth, diagnosis codes, or any combination that could identify an individual.'},
    opts:[
      {val:'yes',    en:'Yes'},
      {val:'no',     en:'No'},
      {val:'unsure', en:'Unsure', desc:'We\'ll treat as identifiable and clarify together'}
    ],
    showIf:function(a){ return a.S1_STAGE !== 'closeout'; }},

  { id:'S3_PHI_CROSSBORDER', section:3, type:'yn', required:true,
    label:{en:'Will identifiable or coded data be shared outside RI-MUHC or MUHC?'},
    hint:{en:'International sponsors, CROs, central labs, cloud platforms outside Quebec, or any third party receiving participant-level data.'},
    showIf:function(a){ return (a.S3_PHI === 'yes' || a.S3_PHI === 'unsure') && a.S1_STAGE !== 'closeout'; }},

  { id:'S3_SITES', section:3, type:'single', required:true,
    label:{en:'Single-site or multicentre?'},
    opts:[
      {val:'single',      en:'Single-site — MUHC only'},
      {val:'multi-lead',  en:'Multicentre — MUHC is lead / coordinating site',    desc:'You handle regulatory submission and coordinate Quebec RSSS sites'},
      {val:'multi-part',  en:'Multicentre — MUHC is a participating site',         desc:'Another site leads the submission'},
      {val:'multi-cross', en:'Multicentre — cross-provincial or international',    desc:'Sites outside Quebec involved'}
    ],
    showIf:function(a){ return a.S1_STAGE === 'submission'; }},

  { id:'S3_POPULATION', section:3, type:'single', required:true,
    label:{en:'Does your study involve minors or adults who cannot consent for themselves?'},
    hint:{en:'Civil Code of Quebec Art. 21 — these populations require specific authorization procedures in addition to standard REB review.'},
    opts:[
      {val:'no',        en:'No — competent adults only (18+)'},
      {val:'minors',    en:'Yes — includes minors (under 18)'},
      {val:'incapable', en:'Yes — includes adults unable to consent'},
      {val:'both',      en:'Yes — both minors and adults unable to consent'},
      {val:'unsure',    en:'Unsure'}
    ],
    showIf:function(a){ return a.S3_TYPE !== 'retrospective' && a.S1_STAGE !== 'closeout'; }},

  // ===== SECTION 4 =====
  { id:'S4_OPS_LEAD', section:4, type:'single', required:true,
    label:{en:'Who will run day-to-day study operations?'},
    opts:[
      {val:'pi-directly',    en:'PI directly'},
      {val:'crc',            en:'Clinical Research Coordinator'},
      {val:'nurse',          en:'Research nurse'},
      {val:'trainee',        en:'Student / trainee'},
      {val:'cim-staff',      en:'CIM staff'},
      {val:'resident-fellow', en:'Medical resident or fellow'},
      {val:'other',          en:'Other (specify)'}
    ],
    showIf:function(a){ return a.S1_STAGE !== 'idea' && a.S1_STAGE !== 'closeout'; }},
  { id:'S4_OPS_LEAD_SPEC', section:4, type:'text', required:true,
    label:{en:'Please specify'},
    showIf:function(a){ return a.S4_OPS_LEAD === 'other'; }},

  { id:'S4_SPONSORSHIP', section:4, type:'single', required:true,
    label:{en:'Sponsorship arrangement'},
    opts:[
      {val:'industry', en:'Industry-sponsored',                          desc:'Pharma, biotech, or device company holds the Sponsor role'},
      {val:'si',       en:'Investigator-initiated (Sponsor-Investigator)', desc:'You hold all Sponsor obligations — Health Canada filings, monitoring, IP management'},
      {val:'grant',    en:'Grant-funded academic',                        desc:'CIHR, FRQS, foundation, or institutional funding — no regulated product'}
    ],
    def:{mode:'expand',
      title:{en:'What is a Sponsor-Investigator?'},
      body:{en:'A Sponsor-Investigator is someone who both initiates and conducts a trial AND holds all Sponsor responsibilities under Health Canada Division 5: CTA filings, independent monitoring, IP supply chain, SUSAR reporting, and the Trial Master File. Select this only if you hold the CTA. If your study doesn\'t involve a regulated product, select Grant-funded academic.'}},
    showIf:function(a){ return a.S1_STAGE === 'submission' || a.S1_STAGE === 'conduct'; }},

  { id:'S4_EXPERIENCE', section:4, type:'single', required:true,
    label:{en:'How much experience does your team have running studies of this type at the RI-MUHC?'},
    hint:{en:'Helps the Research Facilitator calibrate how much orientation and onboarding support to include.'},
    opts:[
      {val:'first',     en:'First or second study of this type'},
      {val:'some',      en:'Some experience — 3 to 5 studies'},
      {val:'extensive', en:'Extensive — this is routine for our team'}
    ],
    showIf:function(a){ return a.S1_STAGE === 'submission'; }},

  { id:'S4_CIM', section:4, type:'single', required:true,
    label:{en:'Will this study use the Centre for Innovative Medicine (CIM)?'},
    def:{mode:'expand',
      title:{en:'What is CIM?'},
      body:{en:'CIM provides clinical research infrastructure at the Glen and MGH sites: clinical space, research nursing, project management, monitoring, sample handling, and specialized platforms. Phase I oncology and IV administration studies typically route through CIM. If you\'re unsure whether your study qualifies, select Unsure — the Research Facilitator will help clarify.'}},
    opts:[
      {val:'yes',     en:'Yes — fully or primarily through CIM'},
      {val:'partial', en:'Partially — specific CIM services'},
      {val:'no',      en:'No'},
      {val:'unsure',  en:'Unsure — need guidance'}
    ],
    showIf:function(a){ return a.S1_STAGE === 'submission'; }},

  { id:'S4_PI_TRAINED', section:4, type:'single', required:true,
    label:{en:'Has the PI completed RI-MUHC institutional training?'},
    hint:{en:'Institutional training = SOP Reader + Competency Assessment via TalentLMS. Required before signing the Task Delegation Log.'},
    opts:[
      {val:'yes',         en:'Yes — both complete'},
      {val:'in-progress', en:'In progress'},
      {val:'not-yet',     en:'Not yet started'}
    ],
    showIf:function(a){ return a.S1_STAGE === 'submission'; }},

  // ===== SECTION 5 =====
  { id:'S5_SUPPORT_NEEDS', section:5, type:'multi', required:false,
    label:{en:'What do you need most right now? (Select all that apply — optional)'},
    opts:[
      {val:'design-protocol',  en:'Protocol design or feasibility support'},
      {val:'regulatory',       en:'Regulatory submissions — Health Canada or Nagano'},
      {val:'training',         en:'Training and credentials guidance'},
      {val:'budget-contracts', en:'Budget, contracts, or funding'},
      {val:'team-setup',       en:'Hiring or team setup'},
      {val:'data',             en:'Data management, REDCap, or privacy'},
      {val:'cim-connect',      en:'Connect with CIM'},
      {val:'conduct-support',  en:'Study conduct — deviations, SAE reporting, monitoring'},
      {val:'closeout-support', en:'Close-out procedures or amendments'}
    ]},

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
function sectionHasVisibleQuestions(n) {
  var qs = questionsInSection(n);
  for (var i = 0; i < qs.length; i++) {
    if (isVisible(qs[i])) return true;
  }
  return false;
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
  } else if (q.type === 'single') {
    h += '<div class="ik-opts">';
    for (var i = 0; i < q.opts.length; i++) {
      var o = q.opts[i];
      var sel = val === o.val ? ' selected' : '';
      h += '<div class="ik-opt' + sel + '" data-qid="' + q.id + '" data-val="' + escHtml(o.val) + '">';
      h += '<span class="ik-opt-key"></span>';
      h += '<div class="ik-opt-body"><span class="ik-opt-label">' + escHtml(t(o)) + '</span>';
      if (o.desc) h += '<span class="ik-opt-desc">' + escHtml(o.desc) + '</span>';
      h += '</div></div>';
    }
    h += '</div>';
  } else if (q.type === 'yn') {
    var yL = q.ynLabels ? t(q.ynLabels)[0] : 'Yes';
    var nL = q.ynLabels ? t(q.ynLabels)[1] : 'No';
    h += '<div class="ik-yn">';
    h += '<div class="ik-opt' + (val === 'yes' ? ' selected' : '') + '" data-qid="' + q.id + '" data-val="yes"><span class="ik-opt-key"></span><div class="ik-opt-body"><span class="ik-opt-label">' + escHtml(yL) + '</span></div></div>';
    h += '<div class="ik-opt' + (val === 'no' ? ' selected' : '') + '" data-qid="' + q.id + '" data-val="no"><span class="ik-opt-key"></span><div class="ik-opt-body"><span class="ik-opt-label">' + escHtml(nL) + '</span></div></div>';
    h += '</div>';
  } else if (q.type === 'multi') {
    h += '<div class="ik-opts">';
    var valArr = val || [];
    for (var j = 0; j < q.opts.length; j++) {
      var o2 = q.opts[j];
      var sel2 = valArr.indexOf(o2.val) >= 0 ? ' selected' : '';
      h += '<div class="ik-opt multi' + sel2 + '" data-qid="' + q.id + '" data-val="' + escHtml(o2.val) + '" data-multi="1">';
      h += '<span class="ik-opt-key"></span>';
      h += '<div class="ik-opt-body"><span class="ik-opt-label">' + escHtml(t(o2)) + '</span>';
      if (o2.desc) h += '<span class="ik-opt-desc">' + escHtml(o2.desc) + '</span>';
      h += '</div></div>';
    }
    h += '</div>';
  }

  h += '<span class="ik-error" id="err-' + q.id + '" style="display:none"></span>';
  h += '</div>';
  return h;
}

function renderSection(n, scrollToTop) {
  var meta = SECTIONS[n-1];
  var qs = questionsInSection(n);
  var area = document.getElementById('ik-form-area-v2');
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
  if (n > 1) h += '<button type="button" class="ik-btn ik-btn-secondary" onclick="ikNav(-1)">&#8592; Back</button>';
  else h += '<span></span>';
  if (n < SECTIONS.length) h += '<button type="button" class="ik-btn" onclick="ikNav(1)">Continue &#8594;</button>';
  else h += '<button type="button" class="ik-btn ik-btn-submit" onclick="ikSubmit()">Submit intake</button>';
  h += '</div>';

  h += '</div>';
  area.innerHTML = h;

  var fill = document.getElementById('ik-prog-fill-v2');
  var label = document.getElementById('ik-prog-label-v2');
  var sectionLabel = document.getElementById('ik-section-label-v2');
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
    if (idx >= 0) {
      cur.splice(idx, 1);
    } else {
      cur.push(val);
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
  var container = document.getElementById('ik-form-area-v2');
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

document.addEventListener('click', function(e) {
  if (window._ikCurrentInstance !== _ikInstance) return; // stale instance — ignore
  var t = e.target;
  while (t && t !== document.body) {
    if (t.classList && t.classList.contains('ik-opt')) { handleOptClick(t); return; }
    t = t.parentNode;
  }
});
document.addEventListener('input', function(e) {
  if (window._ikCurrentInstance !== _ikInstance) return; // stale instance — ignore
  var el = e.target;
  if (!el) return;
  if ((el.classList && (el.classList.contains('ik-input') || el.classList.contains('ik-textarea'))) && el.getAttribute('data-qid')) {
    handleTextInput(el);
  }
});

// ---------------------------------------------------------------------------
// NAVIGATION — skips sections with no visible questions
// ---------------------------------------------------------------------------
function nextVisibleSection(from, direction) {
  var n = from + direction;
  while (n > 1 && n < SECTIONS.length && !sectionHasVisibleQuestions(n)) {
    n += direction;
  }
  if (n < 1) n = 1;
  if (n > SECTIONS.length) n = SECTIONS.length;
  return n;
}

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
  }
  state.currentSection = nextVisibleSection(state.currentSection, direction);
  renderSection(state.currentSection, true);
};

window.ikRestart = function() {
  state.answers = {};
  state.currentSection = 1;
  state.submitted = false;
  var wrap = document.getElementById('ik-prog-wrap-v2');
  if (wrap) wrap.style.display = '';
  var resultArea = document.getElementById('ik-result-area-v2');
  if (resultArea) resultArea.innerHTML = '';
  renderSection(1, true);
};

// ---------------------------------------------------------------------------
// CLASSIFIER
// ---------------------------------------------------------------------------
function classify(a) {
  var d = {};
  var stage = a.S1_STAGE || 'submission';
  d.stage = stage;

  // Training level
  if (a.S3_TYPE === 'interventional') {
    if (a.S3_INT_TYPE === 'drug')        d.trainingLevel = 'level-1';
    else if (a.S3_INT_TYPE === 'device') d.trainingLevel = 'level-2';
    else if (a.S3_INT_TYPE === 'nhp')    d.trainingLevel = 'level-3';
    else                                  d.trainingLevel = 'level-4';
  } else if (a.S3_TYPE === 'observational-prospective') {
    d.trainingLevel = 'level-4';
  } else if (a.S3_TYPE === 'retrospective') {
    d.trainingLevel = 'level-5';
  }

  // Risk grouping
  if (a.S3_INT_TYPE === 'drug') {
    d.riskGrouping = 'highest';
  } else if (a.S3_TYPE === 'interventional' && (a.S3_INT_TYPE === 'device' || a.S3_INT_TYPE === 'nhp')) {
    d.riskGrouping = 'high';
  } else if (a.S3_TYPE === 'observational-prospective' || a.S3_INT_TYPE === 'low') {
    d.riskGrouping = 'low';
  } else if (a.S3_TYPE === 'retrospective') {
    d.riskGrouping = 'minimal';
  } else {
    d.riskGrouping = 'low';
  }

  // Study type bucket
  if (a.S3_TYPE === 'interventional' && a.S3_INT_TYPE) {
    d.studyTypeBucket = 'interventional-' + a.S3_INT_TYPE;
  } else if (a.S3_TYPE === 'observational-prospective') {
    d.studyTypeBucket = 'observational-prospective';
  } else if (a.S3_TYPE === 'retrospective') {
    d.studyTypeBucket = 'retrospective';
  } else {
    d.studyTypeBucket = 'unknown';
  }

  d.isDrugStudy           = a.S3_INT_TYPE === 'drug';
  d.isDeviceStudy         = a.S3_INT_TYPE === 'device';
  d.isNHPStudy            = a.S3_INT_TYPE === 'nhp';
  d.isSponsorInvestigator = a.S4_SPONSORSHIP === 'si';
  d.isIndustrySponsored   = a.S4_SPONSORSHIP === 'industry';
  d.isMulticentre         = !!(a.S3_SITES && a.S3_SITES !== 'single');
  d.involvesPHI           = a.S3_PHI === 'yes' || a.S3_PHI === 'unsure';
  d.crossBorder           = a.S3_PHI_CROSSBORDER === 'yes';
  d.needsHCfiling         = a.S3_TYPE === 'interventional' && (a.S3_INT_TYPE === 'drug' || a.S3_INT_TYPE === 'device' || a.S3_INT_TYPE === 'nhp');
  d.involvesMinors        = a.S3_POPULATION === 'minors' || a.S3_POPULATION === 'both';
  d.involvesIncapable     = a.S3_POPULATION === 'incapable' || a.S3_POPULATION === 'both';
  // hasCIMComponent must be set before pathway logic
  d.hasCIMComponent       = !!(a.S4_CIM && a.S4_CIM !== 'no');

  // Canonical aliases used in the email report and JSON
  d.hasPHI        = d.involvesPHI;
  d.isCrossBorder = d.crossBorder;
  d.isUrgent      = (a.S2_NAGANO_STATUS === 'ready' || a.S2_NAGANO_STATUS === 'submitted');

  // Pathway recommendation — internal only, shown to Research Facilitator in email, never to the researcher
  if (stage === 'idea') {
    // Too early to classify — Facilitator makes first contact
    d.recommendedPathway = 'intro-call';
  } else if (
    d.isDrugStudy           ||  // all drug studies → Facilitator-led
    d.isIndustrySponsored   ||  // industry sponsor → warm handoff
    d.hasCIMComponent       ||  // CIM involved → route through Facilitator/CIM
    d.isSponsorInvestigator ||  // SI dual obligations → needs active support
    a.S4_EXPERIENCE === 'first' // first study at RI-MUHC → onboarding support needed
  ) {
    d.recommendedPathway = 'warm-handoff';
  } else if (d.riskGrouping === 'high' || d.riskGrouping === 'highest') {
    // device/NHP with experienced team
    d.recommendedPathway = 'consult';
  } else {
    d.recommendedPathway = 'self-serve';
  }

  // Flags — submission track only, max 6, highest priority first
  var flags = [];
  if (stage === 'submission') {
    if (d.crossBorder) {
      flags.push({code:'efvp-crossborder', tone:'coral', label:'Cross-border data transfer — ÉFVP required',
        text:'A Privacy Impact Assessment (ÉFVP) must be completed before any transfer. File F17 or F18 alongside your Nagano F11 submission. International transfers to jurisdictions without equivalent privacy protections require additional safeguards.'});
    }
    if (d.involvesMinors) {
      flags.push({code:'art21-minor', tone:'sky', label:'Minors — Civil Code Art. 21',
        text:'Research involving minors requires written parental or guardian consent. Children 7–13 provide assent as developmentally appropriate; minors 14+ may consent alone only if the REB determines minimal risk.'});
    }
    if (d.involvesIncapable) {
      flags.push({code:'art21-incapable', tone:'coral', label:'Adults unable to consent — Civil Code Art. 21',
        text:'Research involving adults who cannot consent requires authorization from a Personne mandatée, tutor, or curator. Risk must not be disproportionate to expected benefits.'});
    }
    if (d.isSponsorInvestigator && d.needsHCfiling) {
      flags.push({code:'si-dual', tone:'coral', label:'Sponsor-Investigator — dual regulatory obligations',
        text:'You hold both Sponsor and QI/PI responsibilities. As Sponsor: Health Canada filings, independent monitoring, IP supply chain, SUSAR reporting, and the Trial Master File. As QI/PI: all site-level responsibilities. The 100-series SOPs apply — engage QA early in planning.'});
    }
    if (a.S3_SITES === 'multi-lead') {
      flags.push({code:'reb-lead', tone:'sky', label:'Multicentre — MUHC as REB Lead',
        text:'As the Quebec REB Lead site, you submit study documents via Nagano on behalf of all participating RSSS sites.'});
    }
    if (a.S3_SITES === 'multi-cross') {
      flags.push({code:'cross-jurisdiction', tone:'amber', label:'Cross-provincial / international multicentre',
        text:'Sites outside Quebec operate under different regulatory frameworks, data transfer requirements, and consent standards. Engage the Research Facilitator early to plan cross-jurisdiction coordination.'});
    }
  }
  d.flags = flags;

  return d;
}

// ---------------------------------------------------------------------------
// LABEL MAPS
// ---------------------------------------------------------------------------
var LEVEL_LABEL = {
  'level-1': 'Level I — Drug studies',
  'level-2': 'Level II — Medical devices',
  'level-3': 'Level III — Natural health products',
  'level-4': 'Level IV — Observational',
  'level-5': 'Level V — Retrospective'
};
var PATHWAY_LABEL = {
  'intro-call':   'Intro call — point to Hub resources, follow up if they proceed',
  'warm-handoff': 'Warm handoff — Facilitator-led setup, likely involves CIM',
  'consult':      '30-min consult — walk through Hub resources, check credentials',
  'self-serve':   'Self-serve — experienced team, low-risk; brief email follow-up'
};

// ---------------------------------------------------------------------------
// DESIGN GUIDANCE — study-type-specific "what to plan for" (design stage)
// ---------------------------------------------------------------------------
function buildDesignGuidance(a, d) {
  if (d.stage !== 'design' && d.stage !== 'idea') return [];
  var items = [];

  if (d.trainingLevel) {
    var levelDesc = LEVEL_LABEL[d.trainingLevel] || d.trainingLevel;
    items.push('Training level for this study type: <strong>' + escHtml(levelDesc) + '</strong>. All team members performing study tasks need the SOP Reader + Competency Assessment before signing the Task Delegation Log. (<a href="/training/compliance-requirements">Full training requirements &rarr;</a>)');
  }
  if (d.isDrugStudy) {
    items.push('A Health Canada Clinical Trial Application (CTA, Division 5) is required — filed separately from your REB submission. GCP (ICH E6 R3) and Division 5 training are required for all team members. (<a href="/sops/cr-018">CTA overview &rarr;</a>)');
  }
  if (d.isNHPStudy) {
    items.push('A Health Canada CTA for Natural Health Products is required. GCP training and a product dossier are needed before submission.');
  }
  if (d.isDeviceStudy) {
    items.push('A Health Canada Investigational Testing Authorization (ITA) is required for the investigational device. ISO 14155:2020 GCP training required. (<a href="/sops/cr-024">ITA overview &rarr;</a>)');
  }
  if (d.isSponsorInvestigator) {
    items.push('As Sponsor-Investigator, you hold both Sponsor and QI/PI responsibilities simultaneously — Health Canada filings, independent monitoring, IP supply chain, SUSAR reporting, and the Trial Master File. The 100-series SOPs apply. Engage QA early. (<a href="/kb/sponsor-investigator">Sponsor-Investigator SOPs &rarr;</a>)');
  }
  if (d.isIndustrySponsored) {
    items.push('Industry-sponsored studies: the Sponsor provides the protocol and Health Canada authorization. Your team handles site conduct, Task Delegation Log, and ISF. Budget for REB billing fees per Directive ministérielle 2023-016.');
  }
  if (d.involvesPHI && d.crossBorder) {
    items.push('Cross-border data sharing requires an ÉFVP (Privacy Impact Assessment) before any transfer. Plan this into your protocol design and budget timeline.');
  } else if (d.involvesPHI) {
    items.push('Your study involves personal health information. Include a data management and privacy plan in your REB submission. Under Loi 25, confidentiality breaches must be disclosed within 72 hours.');
  }
  if (d.involvesMinors) {
    items.push('Minors require written parental/guardian consent under Civil Code of Quebec Art. 21. Include age-appropriate assent forms and address this in your REB application.');
  }
  if (d.involvesIncapable) {
    items.push('Adults unable to consent require authorization from a Personne mandatée, tutor, or curator (Civil Code Art. 21). Address this explicitly in your REB application.');
  }
  if (a.S3_SITES === 'multi-lead' || a.S3_SITES === 'multi-cross') {
    items.push('Multicentre studies require site-specific feasibility reviews and coordination. As MUHC lead, you submit via Nagano on behalf of all Quebec RSSS sites. (<a href="/kb/feasibility">Multi-site feasibility &rarr;</a>)');
  }
  if (a.S4_CIM && a.S4_CIM !== 'no') {
    items.push('CIM involvement: engage CIM during the design phase, well before your Nagano submission. (<a href="/cim/planning">Planning your study with the CIM &rarr;</a>)');
  }

  return items;
}

// ---------------------------------------------------------------------------
// CHECKLIST — submission track only, 3 groups with Hub links
// ---------------------------------------------------------------------------
function buildChecklist(a, d) {
  if (d.stage !== 'submission') return [];

  var levelNum = d.trainingLevel ? parseInt(d.trainingLevel.split('-')[1], 10) : null;
  var nHC   = d.needsHCfiling;
  var isSI  = a.S4_SPONSORSHIP === 'si';
  var isInd = a.S4_SPONSORSHIP === 'industry';

  var credentials = [];
  credentials.push('Obtain or verify RI-MUHC Research Privileges or Researcher Status for the QI/PI. (<a href="/kb/roles/pi-pathway">PI/QI pathway guide &rarr;</a>)');
  if (levelNum) {
    credentials.push('Complete institutional training: SOP Reader + Competency Assessment via TalentLMS before signing the Task Delegation Log. (<a href="/training/compliance-requirements">Training requirements &rarr;</a>)');
  }
  if (levelNum && levelNum <= 4) {
    credentials.push('ICH E6(R3) Good Clinical Practice (CITI) — renew every 2 years.');
  }
  if (d.trainingLevel === 'level-1') {
    credentials.push('Health Canada Part C Division 5 training required for drug studies.');
  }
  if (d.trainingLevel === 'level-2') {
    credentials.push('ISO 14155:2020 GCP for Medical Devices training required.');
  }
  credentials.push('Prepare the Task Delegation Log — QI/PI signature confirms qualification and training are current.');

  var docs = [];
  docs.push('Finalize the study protocol — QI/PI signature required before submission.');
  docs.push('Prepare the Informed Consent Form using the MUHC REB ICF template. Submit in editable Word format; French translation follows REB approval of the English version.');
  if (nHC) {
    docs.push('Investigator\'s Brochure (IB) or Product Monograph — current version required before REB submission.');
  }
  docs.push('Study budget and contracts — initiate early via the Research Agreements Office. (<a href="/kb/budgets-contracts">Budgets and contracts &rarr;</a>)');

  var activation = [];
  activation.push('Submit via Nagano F11 — triggers REB review and institutional feasibility review in parallel. (<a href="/apps/nagano/overview">Nagano step-by-step guide &rarr;</a>)');
  if (nHC && d.isDrugStudy) {
    activation.push('Health Canada CTA (Division 5) — drug submission timeline is separate from REB review. (<a href="/sops/cr-018">CTA overview &rarr;</a>)');
  }
  if (nHC && d.isDeviceStudy) {
    activation.push('Health Canada ITA for medical devices. (<a href="/sops/cr-024">ITA overview &rarr;</a>)');
  }
  if (a.S4_CIM && a.S4_CIM !== 'no') {
    activation.push('CIM feasibility assessment — required before activation for studies using CIM. (<a href="/cim/planning">Planning your study with the CIM &rarr;</a>)');
  }
  activation.push('MUHC Authorization letter — all review streams must complete before any study activity can begin.');
  if (isInd) {
    activation.push('Sponsor\'s Go Letter — participant enrolment may not begin until this is received.');
  }
  if (isSI) {
    activation.push('Independent monitoring plan required — monitor must not be on the site Task Delegation Log. (<a href="/kb/sponsor-investigator">Sponsor-Investigator SOPs &rarr;</a>)');
  }

  return [
    { title: 'Credentials and training', items: credentials },
    { title: 'Study documents',          items: docs },
    { title: 'Submit and activate',      items: activation }
  ];
}

// ---------------------------------------------------------------------------
// SUPPORT NEEDS — map S5_SUPPORT_NEEDS selections to Hub page links
// ---------------------------------------------------------------------------
function buildSupportLinks(a, d) {
  var needs = a.S5_SUPPORT_NEEDS || [];
  if (needs.length === 0) return [];

  var links = [];

  var needMap = {
    'design-protocol': function() {
      links.push('<strong>Protocol design &amp; feasibility</strong>');
      links.push('Study design, feasibility assessment, and methodology resources: <a href="/kb/study-design">Design &amp; feasibility &rarr;</a>');
      links.push('Planning specialists — BCU, CORD, CIM, pre-awards, HR, EDI: <a href="/kb/study-design">Study design &amp; planning &rarr;</a>');
    },
    'regulatory': function() {
      links.push('<strong>Regulatory submissions</strong>');
      links.push('Step-by-step guide to submitting via Nagano F11: <a href="/apps/nagano/overview">Submit via Nagano &rarr;</a>');
      links.push('Regulatory compliance requirements by study type: <a href="/training/compliance-requirements">Compliance requirements &rarr;</a>');
      if (d.isDrugStudy) links.push('Drug study — Health Canada CTA (Division 5): <a href="/sops/cr-018">SOP-CR-018 — CTA overview &rarr;</a>');
      if (d.isDeviceStudy) links.push('Device study — Health Canada ITA: <a href="/sops/cr-024">SOP-CR-024 — ITA overview &rarr;</a>');
    },
    'training': function() {
      links.push('<strong>Training and credentials</strong>');
      links.push('Training requirements by role and study type: <a href="/training/compliance-requirements">Compliance requirements &rarr;</a>');
      links.push('PI/QI credential pathway — privileges, researcher status, GCP, SOPs: <a href="/kb/roles/pi-pathway">PI/QI pathway &rarr;</a>');
    },
    'budget-contracts': function() {
      links.push('<strong>Budget, contracts, and funding</strong>');
      links.push('Research agreements, budget templates, and pre-awards guidance: <a href="/kb/budgets-contracts">Budgets &amp; contracts &rarr;</a>');
    },
    'team-setup': function() {
      links.push('<strong>Hiring and team setup</strong>');
      links.push('HR, People &amp; Culture — hiring research staff, employment agreements, trainee onboarding: <a href="/kb/hiring-hr-support">HR &amp; People and Culture &rarr;</a>');
    },
    'data': function() {
      links.push('<strong>Data management, REDCap, and privacy</strong>');
      links.push('CORD — REDCap builds, CRF design, and data management planning: <a href="/kb/cord">CORD &rarr;</a>');
      links.push('MUHC patient data — retrospective access across 5 sites: <a href="/kb/data-warehouse">MUHC patient data &rarr;</a>');
      if (d.isCrossBorder || d.hasPHI) {
        links.push('Privacy impact assessment (ÉFVP) — required before cross-border data sharing: <a href="/kb/privacy">Privacy &amp; data governance &rarr;</a>');
      }
    },
    'cim-connect': function() {
      links.push('<strong>Centre for Innovative Medicine (CIM)</strong>');
      links.push('Phase I, oncology, and IV administration studies — CIM infrastructure, staffing, and platforms: <a href="/cim/planning">Planning your study with the CIM &rarr;</a>');
    },
    'conduct-support': function() {
      links.push('<strong>Study conduct</strong>');
      links.push('Site setup, delegation, and activation requirements: <a href="/kb/site-setup">Site activation &rarr;</a>');
      links.push('Data integrity and source documentation standards: <a href="/kb/data-integrity">Data integrity &rarr;</a>');
      links.push('AE and SAE reporting — timelines and Health Canada obligations: <a href="/sops/cr-012">SOP-CR-012 — AE/SAE reporting &rarr;</a>');
    },
    'closeout-support': function() {
      links.push('<strong>Close-out and amendments</strong>');
      links.push('Study close-out checklist and essential document retention: <a href="/kb/close-out">Close-out guide &rarr;</a>');
      links.push('SOP-CR-016 — Study Close-Out procedures: <a href="/sops/cr-016">View SOP &rarr;</a>');
    }
  };

  for (var i = 0; i < needs.length; i++) {
    if (needMap[needs[i]]) needMap[needs[i]]();
  }

  return links;
}

// ---------------------------------------------------------------------------
// NEXT STEPS — stage-adaptive with Hub links (raw HTML, not escaped)
// ---------------------------------------------------------------------------
function buildNextSteps(a, d) {
  var stage = d.stage;
  var next = [];

  if (stage === 'idea') {
    next.push('Start with the study design and feasibility resources: <a href="/kb/study-design">Design &amp; feasibility &rarr;</a>');
    next.push('Planning specialists and design resources — BCU, CORD, CIM, and more: <a href="/kb/study-design">Study design &amp; planning &rarr;</a>');
    next.push('Browse what it takes to run a clinical study at the RI-MUHC: <a href="/kb/introduction">Introduction to clinical research &rarr;</a>');
    next.push('The Research Facilitator will review your intake and follow up within 5 business days.');

  } else if (stage === 'design') {
    next.push('Review the full PI/QI pathway from intake to activation: <a href="/kb/roles/pi-pathway">PI/QI pathway overview &rarr;</a>');
    next.push('Understand training and credentials requirements for your study type: <a href="/training/compliance-requirements">Compliance requirements &rarr;</a>');
    next.push('Planning specialists and methodology resources — BCU, CORD, CIM, pre-awards, and more: <a href="/kb/study-design">Study design &amp; planning &rarr;</a>');
    next.push('The Research Facilitator will review your intake and follow up within 5 business days.');

  } else if (stage === 'submission') {
    next.push('The Research Facilitator will review your intake and follow up within 5 business days.');
    next.push('Step-by-step guide to submitting via Nagano: <a href="/apps/nagano/overview">Submit via Nagano &rarr;</a>');
    if (d.isDrugStudy) {
      next.push('Drug study — Health Canada CTA requirements: <a href="/sops/cr-018">SOP-CR-018 overview &rarr;</a>');
    }
    if (d.isDeviceStudy) {
      next.push('Device study — ITA requirements: <a href="/sops/cr-024">SOP-CR-024 overview &rarr;</a>');
    }
    if (a.S4_CIM && a.S4_CIM !== 'no') {
      next.push('CIM involvement — is CIM right for your study? <a href="/cim/planning">CIM overview &rarr;</a>');
    }
    if (d.isSponsorInvestigator) {
      next.push('Sponsor-Investigator obligations — the 100-series SOPs apply to you: <a href="/kb/sponsor-investigator">Sponsor-Investigator SOPs &rarr;</a>');
    }

  } else if (stage === 'conduct') {
    next.push('Study conduct resources — site setup and day-to-day operations: <a href="/kb/site-setup">Site activation &rarr;</a>');
    next.push('Data integrity and source documentation: <a href="/kb/data-integrity">Data integrity &rarr;</a>');
    next.push('AE and SAE reporting procedures: <a href="/sops/cr-012">SOP-CR-012 — AE/SAE reporting &rarr;</a>');
    next.push('The Research Facilitator will review your intake and follow up within 5 business days.');

  } else if (stage === 'closeout') {
    next.push('Study close-out procedures and checklist: <a href="/kb/close-out">Close-out guide &rarr;</a>');
    next.push('SOP-CR-016 — Study Close-Out: <a href="/sops/cr-016">View SOP &rarr;</a>');
    next.push('The Research Facilitator will review your intake and follow up within 5 business days.');
  }

  return next;
}

// ---------------------------------------------------------------------------
// EMAILJS — loader, HTML builder, sender
//
// loadEmailJS(cb)  — injects the EmailJS browser SDK from CDN the first time
//                    it's needed (lazy load — doesn't affect page load speed).
//                    Calls cb() once the SDK is ready.
//
// buildEmailHtml() — builds the formatted HTML email body: navy header,
//                    readable response summary by section, classification
//                    output, regulatory flags, and raw JSON at the bottom.
//
// sendIntakeEmail()— called automatically on form submit (see ikSubmit).
//                    Fires silently in the background; the user sees the
//                    confirmation screen immediately regardless of email status.
//                    If IK_EMAIL_CONFIG credentials are not filled in, it
//                    logs a warning and exits without throwing.
// ---------------------------------------------------------------------------

function loadEmailJS(cb) {
  if (window.emailjs) { cb(); return; }
  var s = document.createElement('script');
  // EmailJS browser SDK — loaded on demand so it doesn't affect page performance.
  // Pin to major version 4; update here if EmailJS releases breaking changes.
  s.src = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js';
  s.onload = function() {
    window.emailjs.init({ publicKey: IK_EMAIL_CONFIG.publicKey });
    cb();
  };
  s.onerror = function() { console.warn('EmailJS SDK failed to load.'); };
  document.head.appendChild(s);
}

function buildEmailHtml(a, d, payload) {
  var stage = d.stage || 'submission';

  // Helper: readable label for a question value
  function qLabel(qid, val) {
    var q = QMAP[qid];
    if (!q || val == null || val === '') return '—';
    if (q.type === 'multi') {
      if (!val || val.length === 0) return '—';
      var labels = [];
      for (var i = 0; i < val.length; i++) {
        var found = false;
        if (q.opts) {
          for (var j = 0; j < q.opts.length; j++) {
            if (q.opts[j].val === val[i]) { labels.push(q.opts[j].en); found = true; break; }
          }
        }
        if (!found) labels.push(val[i]);
      }
      return labels.join(', ');
    }
    if (q.opts) {
      for (var k = 0; k < q.opts.length; k++) {
        if (q.opts[k].val === val) return q.opts[k].en;
      }
    }
    return String(val);
  }

  function row(label, value) {
    if (!value || value === '—') return '';
    return '<tr><td style="padding:6px 12px 6px 0;font-size:13px;color:#666;white-space:nowrap;vertical-align:top;width:200px">' + label + '</td>' +
           '<td style="padding:6px 0;font-size:13px;color:#111;vertical-align:top">' + value + '</td></tr>';
  }
  function section(title, rows) {
    var content = '';
    for (var i = 0; i < rows.length; i++) content += rows[i];
    if (!content) return '';
    return '<div style="margin-bottom:24px">' +
           '<div style="font-size:11px;font-weight:700;color:#2b9ce2;letter-spacing:.08em;text-transform:uppercase;margin-bottom:8px;border-bottom:1px solid #e8e8e8;padding-bottom:6px">' + title + '</div>' +
           '<table style="border-collapse:collapse;width:100%"><tbody>' + content + '</tbody></table>' +
           '</div>';
  }

  // Stage label
  var stageLabels = {
    idea: 'Idea / early thinking',
    design: 'Designing the study',
    submission: 'Preparing to submit / submitted',
    conduct: 'Study actively running',
    closeout: 'Close-out or amendment'
  };

  // Flag list
  var flagsHtml = '';
  if (d.flags && d.flags.length > 0) {
    var toneColor = { coral: '#c0392b', sky: '#2471a3', amber: '#d68910' };
    flagsHtml += '<div style="margin-bottom:24px"><div style="font-size:11px;font-weight:700;color:#2b9ce2;letter-spacing:.08em;text-transform:uppercase;margin-bottom:8px;border-bottom:1px solid #e8e8e8;padding-bottom:6px">REGULATORY FLAGS</div>';
    for (var fi = 0; fi < d.flags.length; fi++) {
      var fl = d.flags[fi];
      var col = toneColor[fl.tone] || '#555';
      flagsHtml += '<div style="margin-bottom:6px;padding:8px 12px;border-left:3px solid ' + col + ';background:#fafafa;font-size:13px">' +
                   '<strong style="color:' + col + '">' + fl.label + '</strong> ' + fl.text + '</div>';
    }
    flagsHtml += '</div>';
  }

  var html = '<!DOCTYPE html><html><body style="font-family:Arial,sans-serif;max-width:680px;margin:0 auto;background:#fff">' +

    // Header
    '<div style="background:#2b2666;color:#fff;padding:20px 28px;border-radius:8px 8px 0 0">' +
    '<div style="font-size:11px;letter-spacing:.1em;text-transform:uppercase;color:rgba(255,255,255,.6);margin-bottom:4px">RI-MUHC Clinical Research Hub</div>' +
    '<div style="font-size:20px;font-weight:700">Study Intake — ' + (stageLabels[stage] || stage) + '</div>' +
    '<div style="font-size:13px;margin-top:6px;color:rgba(255,255,255,.75)">Ref: ' + payload.intakeId + ' &nbsp;·&nbsp; ' + new Date(payload.submittedAt).toLocaleString('en-CA', { dateStyle: 'medium', timeStyle: 'short' }) + '</div>' +
    '</div>' +

    // Body
    '<div style="padding:24px 28px;border:1px solid #e0e0e0;border-top:none;border-radius:0 0 8px 8px">' +

    section('Submitted by', [
      row('Name',   a.S1_CONTACT_NAME  || '—'),
      row('Email',  a.S1_CONTACT_EMAIL || '—'),
      row('Role',   qLabel('S1_ENTRY', a.S1_ENTRY) + (a.S1_ENTRY_SPEC ? ' — ' + a.S1_ENTRY_SPEC : '')),
      row('On behalf of PI?', qLabel('S1_ONBEHALF', a.S1_ONBEHALF)),
      row('Stage',  stageLabels[stage] || stage)
    ]) +

    section('Study', [
      row('Title',           a.S2_TITLE     || '—'),
      row('PI name',         a.S2_PI_NAME   || '—'),
      row('PI email',        a.S2_PI_EMAIL  || '—'),
      row('Research program',qLabel('S2_DEPT', a.S2_DEPT) + (a.S2_DEPT_SPEC ? ' — ' + a.S2_DEPT_SPEC : '')),
      row('Nagano status',   qLabel('S2_NAGANO_STATUS', a.S2_NAGANO_STATUS)),
      row('Nagano number',   a.S2_NAGANO_NUM || '—')
    ]) +

    (stage !== 'closeout' ? section('Study type', [
      row('Research type',       qLabel('S3_TYPE', a.S3_TYPE)),
      row('Intervention type',   qLabel('S3_INT_TYPE', a.S3_INT_TYPE)),
      row('PHI / identifiable data', qLabel('S3_PHI', a.S3_PHI)),
      row('Cross-border data sharing', qLabel('S3_PHI_CROSSBORDER', a.S3_PHI_CROSSBORDER)),
      row('Sites',               qLabel('S3_SITES', a.S3_SITES)),
      row('Vulnerable populations', qLabel('S3_POPULATION', a.S3_POPULATION))
    ]) : '') +

    ((stage !== 'idea' && stage !== 'closeout') ? section('Team', [
      row('Day-to-day operations', qLabel('S4_OPS_LEAD', a.S4_OPS_LEAD) + (a.S4_OPS_LEAD_SPEC ? ' — ' + a.S4_OPS_LEAD_SPEC : '')),
      row('Sponsorship',           qLabel('S4_SPONSORSHIP', a.S4_SPONSORSHIP)),
      row('Team experience',       qLabel('S4_EXPERIENCE', a.S4_EXPERIENCE)),
      row('CIM involvement',       qLabel('S4_CIM', a.S4_CIM)),
      row('PI institutional training', qLabel('S4_PI_TRAINED', a.S4_PI_TRAINED))
    ]) : '') +

    section('Support needs', [
      row('What they need most', qLabel('S5_SUPPORT_NEEDS', a.S5_SUPPORT_NEEDS))
    ]) +

    // Classification — only show rows where the question was actually asked.
    // classRow() returns '' when wasAsked is false, so unasked fields don't appear as "No".
    (function() {
      function classRow(label, val, wasAsked) {
        if (!wasAsked) return '';
        return row(label, val ? 'Yes' : 'No');
      }
      return section('Classification (Facilitator reference)', [
        row('Training level',      d.trainingLevel ? (LEVEL_LABEL[d.trainingLevel] || d.trainingLevel) : '—'),
        row('Study type',          d.studyTypeBucket && d.studyTypeBucket !== 'unknown' ? d.studyTypeBucket.replace('interventional-','').replace(/-/g,' ') : '—'),
        row('Facilitator action',  PATHWAY_LABEL[d.recommendedPathway] || d.recommendedPathway || '—'),
        classRow('Multicentre',          d.isMulticentre,         a.S3_SITES != null),
        classRow('Sponsor-investigator', d.isSponsorInvestigator, a.S4_SPONSORSHIP != null),
        classRow('Industry-sponsored',   d.isIndustrySponsored,   a.S4_SPONSORSHIP != null),
        classRow('CIM component',        d.hasCIMComponent,       a.S4_CIM != null),
        classRow('PHI / ÉFVP risk',      d.hasPHI,                a.S3_PHI != null),
        classRow('Cross-border data',    d.isCrossBorder,         a.S3_PHI_CROSSBORDER != null),
        classRow('Urgent',               d.isUrgent,              stage === 'submission')
      ]);
    })() +

    flagsHtml +

    // Guidance surfaced to researcher — what they actually saw on screen
    (function() {
      // Strip HTML links to plain text for email readability:
      // <a href="/path">label →</a>  →  label (https://ri-muhc.mintlify.app/path)
      function stripLinks(html) {
        return html
          .replace(/<a [^>]*href="([^"]*)"[^>]*>([^<]*)<\/a>/g, function(_, href, text) {
            var absHref = href.charAt(0) === '/' ? IK_BASE_URL + href : href;
            return text.replace(/\s*→\s*$/, '').trim() + ' (' + absHref + ')';
          })
          .replace(/<[^>]+>/g, '')
          .replace(/&rarr;/g, '→')
          .replace(/&amp;/g, '&')
          .replace(/&lt;/g, '<')
          .replace(/&gt;/g, '>');
      }
      function listSection(title, items) {
        if (!items || items.length === 0) return '';
        var rows = '';
        for (var i = 0; i < items.length; i++) {
          rows += '<tr><td style="padding:3px 0 3px 12px;font-size:12px;color:#444;vertical-align:top">· ' + stripLinks(items[i]) + '</td></tr>';
        }
        return '<div style="margin-bottom:10px"><div style="font-size:11px;font-weight:700;color:#555;margin-bottom:4px">' + title + '</div><table style="border-collapse:collapse;width:100%"><tbody>' + rows + '</tbody></table></div>';
      }

      var surfaced = payload.derived.surfaced || {};
      var nextSteps    = surfaced.nextSteps    || [];
      var guidance     = surfaced.guidance     || [];
      var supportLinks = surfaced.supportLinks || [];
      var checklistGroups = surfaced.checklist || [];
      var hasContent = nextSteps.length || guidance.length || supportLinks.length;
      for (var gi = 0; gi < checklistGroups.length; gi++) {
        if (checklistGroups[gi].items && checklistGroups[gi].items.length) { hasContent = true; break; }
      }
      if (!hasContent) return '';

      var body = '<div style="margin-bottom:24px;padding:16px 18px;background:#f8f8f8;border-radius:8px;border:1px solid #e8e8e8">';
      body += '<div style="font-size:11px;font-weight:700;color:#2b9ce2;letter-spacing:.08em;text-transform:uppercase;margin-bottom:12px;padding-bottom:6px;border-bottom:1px solid #e0e0e0">GUIDANCE SURFACED TO RESEARCHER</div>';
      if (nextSteps.length)    body += listSection('Next steps', nextSteps);
      if (guidance.length)     body += listSection('What to plan for', guidance);
      if (supportLinks.length) body += listSection('Resources for support needs', supportLinks);
      for (var ci = 0; ci < checklistGroups.length; ci++) {
        var grp = checklistGroups[ci];
        if (grp.items && grp.items.length) body += listSection('Checklist — ' + grp.title, grp.items);
      }
      body += '</div>';
      return body;
    })() +

    // Raw JSON
    '<div style="margin-top:24px;border-top:1px solid #e8e8e8;padding-top:16px">' +
    '<div style="font-size:11px;font-weight:700;color:#999;letter-spacing:.08em;text-transform:uppercase;margin-bottom:8px">RAW JSON PAYLOAD</div>' +
    '<pre style="font-size:11px;background:#f5f5f5;padding:14px;border-radius:6px;overflow-x:auto;white-space:pre-wrap;word-break:break-all;color:#333">' + JSON.stringify(payload, null, 2) + '</pre>' +
    '</div>' +

    '</div>' + // end body
    '</body></html>';

  return html;
}

// ---------------------------------------------------------------------------
// CONFIRMATION EMAIL — clean researcher-facing copy (no internal data)
// ---------------------------------------------------------------------------
function buildConfirmationEmailHtml(a, d, payload) {
  var surfaced = payload.derived.surfaced || {};
  var nextSteps    = surfaced.nextSteps    || [];
  var guidance     = surfaced.guidance     || [];
  var supportLinks = surfaced.supportLinks || [];
  var firstName = (a.S1_CONTACT_NAME || '').split(' ')[0] || 'there';

  // Inline link renderer — keeps <a> tags clickable in email clients.
  // Converts relative hrefs to absolute URLs so links work in email.
  function linkList(items) {
    if (!items || items.length === 0) return '';
    var rows = '';
    for (var i = 0; i < items.length; i++) {
      // Make relative hrefs absolute before inserting into email
      var item = items[i].replace(/href="\//g, 'href="' + IK_BASE_URL + '/');
      // Skip bold heading items (support needs category labels — no link)
      var isHeading = item.indexOf('<strong>') === 0 && item.indexOf('<a ') === -1;
      if (isHeading) {
        rows += '<tr><td style="padding:10px 0 4px;font-size:11px;font-weight:700;color:#2b2666;letter-spacing:.06em;text-transform:uppercase">' + item.replace(/<\/?strong>/g,'') + '</td></tr>';
      } else {
        rows += '<tr><td style="padding:3px 0 3px 12px;font-size:13px;color:#333;line-height:1.6;vertical-align:top">· ' + item + '</td></tr>';
      }
    }
    return '<table style="border-collapse:collapse;width:100%"><tbody>' + rows + '</tbody></table>';
  }

  function emailSection(title, content) {
    if (!content) return '';
    return '<div style="margin-bottom:22px">' +
      '<div style="font-size:11px;font-weight:700;color:#2b9ce2;letter-spacing:.08em;text-transform:uppercase;margin-bottom:8px;padding-bottom:6px;border-bottom:1px solid #e8e8e8">' + title + '</div>' +
      content +
      '</div>';
  }

  var nextStepsHtml    = nextSteps.length    ? emailSection('Your next steps',           linkList(nextSteps))    : '';
  var guidanceHtml     = guidance.length     ? emailSection('What to plan for',           linkList(guidance))     : '';
  var supportLinksHtml = supportLinks.length ? emailSection('Resources for your needs',   linkList(supportLinks)) : '';

  return '<!DOCTYPE html><html><body style="margin:0;padding:0;background:#f4f4f5;font-family:Arial,sans-serif;">' +
    '<div style="max-width:640px;margin:32px auto;padding:0 16px 40px;">' +

    // Header
    '<div style="background:#2b2666;color:#fff;padding:24px 28px;border-radius:8px 8px 0 0;">' +
    '<div style="font-size:11px;letter-spacing:.1em;text-transform:uppercase;color:rgba(255,255,255,.55);margin-bottom:6px;">RI-MUHC Clinical Research Hub</div>' +
    '<div style="font-size:20px;font-weight:700;line-height:1.2;">Your intake has been received</div>' +
    '</div>' +

    // Body
    '<div style="padding:28px 28px 24px;border:1px solid #e0e0e0;border-top:none;border-radius:0 0 8px 8px;background:#fff;">' +

    // Greeting
    '<p style="font-size:15px;color:#222;margin:0 0 16px;">Hi ' + firstName + ',</p>' +
    '<p style="font-size:14px;color:#444;line-height:1.7;margin:0 0 8px;">Thanks for completing the study intake form. The Research Facilitator has received your submission and will be in touch within <strong>5 business days</strong>.</p>' +
    '<p style="font-size:13px;color:#888;margin:0 0 24px;">Reference number: <strong style="color:#2b2666;">' + payload.intakeId + '</strong> — keep this for your records.</p>' +

    '<hr style="border:none;border-top:1px solid #ebebeb;margin:0 0 24px;">' +

    nextStepsHtml +
    guidanceHtml +
    supportLinksHtml +

    // Closing
    '<hr style="border:none;border-top:1px solid #ebebeb;margin:24px 0 20px;">' +
    '<p style="font-size:13px;color:#888;line-height:1.6;margin:0;">In the meantime, the <a href="' + IK_BASE_URL + '" style="color:#2b9ce2;text-decoration:none;font-weight:600;">RI-MUHC Clinical Research Hub</a> has guidance for every stage of your study — from design through close-out. Feel free to explore while you wait.</p>' +

    '</div>' + // end body card

    // Footer
    '<div style="margin-top:16px;font-size:11px;color:#aaa;line-height:1.6;text-align:center;">' +
    'This confirmation was sent automatically by the RI-MUHC Clinical Research Hub.<br>' +
    'Please do not reply — contact the Research Facilitator directly if you have questions.' +
    '</div>' +

    '</div>' + // end outer wrapper
    '</body></html>';
}

function sendIntakeEmail(payload) {
  var cfg = IK_EMAIL_CONFIG;

  // Guard: if credentials haven't been filled in, skip silently.
  // This prevents errors in local development or if the config block is
  // accidentally left with placeholder values after a deploy.
  if (!cfg.serviceId || cfg.serviceId === 'YOUR_SERVICE_ID') {
    console.warn('EmailJS not configured — fill in IK_EMAIL_CONFIG at the top of this file.');
    return;
  }

  loadEmailJS(function() {
    var a = payload.answers;
    var d = payload.derived;

    // Subject: [RI-MUHC Intake] RF-YYYYMMDD-XXXX — Study title [study type] — PI: Name
    var studyTypeShort = d.studyTypeBucket
      ? d.studyTypeBucket.replace('interventional-', '').replace(/-/g, ' ')
      : '';
    var subject = '[RI-MUHC Intake] ' + payload.intakeId +
      ' — ' + (a.S2_TITLE ? a.S2_TITLE.substring(0, 50) : 'New intake') +
      (studyTypeShort ? ' [' + studyTypeShort + ']' : '') +
      ' — PI: ' + (a.S2_PI_NAME || 'unknown');

    var messageHtml = buildEmailHtml(a, d, payload);

    // The three template variables below must match what your EmailJS template
    // expects. If you rename them in the EmailJS dashboard, update them here too:
    //   {{to_email}}       → recipient address
    //   {{subject}}        → email subject line
    //   {{{message_html}}} → full HTML body (triple braces = unescaped in EmailJS)
    window.emailjs.send(cfg.serviceId, cfg.templateId, {
      to_email:     cfg.toEmail,
      subject:      subject,
      message_html: messageHtml
    }).then(function() {
      console.log('Facilitator intake email sent — ' + payload.intakeId);
    }).catch(function(err) {
      console.error('EmailJS send to Facilitator failed:', err);
    });

    // Confirmation email to the submitter — clean researcher-facing copy.
    // Only sent if the submitter provided an email address.
    var submitterEmail = a.S1_CONTACT_EMAIL;
    if (submitterEmail && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(submitterEmail)) {
      var confirmSubject = 'Your study intake has been received — ' + payload.intakeId;
      var confirmHtml = buildConfirmationEmailHtml(a, d, payload);
      window.emailjs.send(cfg.serviceId, cfg.templateId, {
        to_email:     submitterEmail,
        subject:      confirmSubject,
        message_html: confirmHtml
      }).then(function() {
        console.log('Confirmation email sent to submitter — ' + payload.intakeId);
      }).catch(function(err) {
        console.error('EmailJS confirmation send failed:', err);
      });
    }
  });
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
  var intakeId = 'RF-' + d.getFullYear() + pad(d.getMonth()+1, 2) + pad(d.getDate(), 2) + '-' + pad(Math.floor(Math.random()*10000), 4);
  var payload = {
    intakeId: intakeId,
    submittedAt: d.toISOString(),
    answers: state.answers,
    derived: derived,
    schemaVersion: '2.0'
  };

  // Attach a record of what guidance was surfaced to the researcher on screen.
  // Useful for the Facilitator's follow-up and for future dashboard analytics.
  payload.derived.surfaced = {
    nextSteps:    buildNextSteps(state.answers, derived),
    guidance:     buildDesignGuidance(state.answers, derived),
    supportLinks: buildSupportLinks(state.answers, derived),
    checklist:    buildChecklist(state.answers, derived),
    flags:        derived.flags || []
  };

  state.submitted = true;
  console.log('=== RI-MUHC Study Intake — Submission ===');
  console.log(payload);
  showResult(payload);
  sendIntakeEmail(payload);
};

function showResult(payload) {
  var a = payload.answers;
  var d = payload.derived;
  var stage = d.stage || 'submission';
  var area = document.getElementById('ik-result-area-v2');
  var formArea = document.getElementById('ik-form-area-v2');
  var progWrap = document.getElementById('ik-prog-wrap-v2');
  if (formArea) formArea.innerHTML = '';
  if (progWrap) progWrap.style.display = 'none';
  if (!area) return;

  var h = '<div class="ik-result">';

  // Confirmation callout
  h += '<div class="ik-confirm">';
  h += '<div class="ik-confirm-icon" aria-hidden="true"></div>';
  h += '<div class="ik-confirm-body">';
  h += '<div class="ik-confirm-title">Your intake has been received</div>';
  h += '<div class="ik-confirm-text">The Research Facilitator will follow up within 5 business days.';
  if (stage === 'submission') h += ' Your startup checklist is below — save or print it for your records.';
  h += ' <span class="ik-confirm-id">Ref: ' + escHtml(payload.intakeId) + '</span></div>';
  h += '</div></div>';

  // Study profile card — any stage where we have a classifiable study type
  if (d.trainingLevel && (stage === 'submission' || stage === 'design')) {
    h += '<div class="ik-profile">';
    h += '<div class="ik-profile-eyebrow">Study profile</div>';
    h += '<div class="ik-profile-title">' + escHtml(a.S2_TITLE || 'Your study') + '</div>';
    h += '<dl class="ik-profile-grid">';
    h += '<div class="ik-profile-stat"><dt>Training level</dt><dd>' + escHtml(LEVEL_LABEL[d.trainingLevel] || d.trainingLevel) + '</dd></div>';
    if (d.studyTypeBucket && d.studyTypeBucket !== 'unknown') {
      var bucketLabel = d.studyTypeBucket.replace('interventional-', '').replace('-', ' ');
      bucketLabel = bucketLabel.charAt(0).toUpperCase() + bucketLabel.slice(1);
      h += '<div class="ik-profile-stat"><dt>Study type</dt><dd>' + escHtml(bucketLabel) + '</dd></div>';
    }
    if (d.isMulticentre) {
      h += '<div class="ik-profile-stat"><dt>Sites</dt><dd>Multicentre</dd></div>';
    }
    h += '</dl></div>';
  }

  // Actions
  h += '<div class="ik-actions" style="margin-top:0;margin-bottom:14px">';
  if (stage === 'submission') h += '<button type="button" class="ik-btn" onclick="ikPrint()">&#128196; Save as PDF / Print</button>';
  h += '<button type="button" class="ik-btn ik-btn-secondary" onclick="ikRestart()">Start a new intake</button>';
  h += '</div>';

  // Next steps — raw HTML allowed (links included)
  h += '<div class="ik-result-section"><h2>Next steps</h2><ul>';
  var next = buildNextSteps(a, d);
  for (var i = 0; i < next.length; i++) h += '<li>' + next[i] + '</li>';
  h += '</ul></div>';

  // Support needs links — based on what they selected in S5_SUPPORT_NEEDS
  var supportLinks = buildSupportLinks(a, d);
  if (supportLinks.length > 0) {
    h += '<div class="ik-result-section"><h2>Resources for what you need</h2><ul>';
    for (var si = 0; si < supportLinks.length; si++) {
      // Bold headings get a spacer class; links get normal li treatment
      var isHeading = supportLinks[si].indexOf('<strong>') === 0 && supportLinks[si].indexOf('<a ') === -1;
      if (isHeading) {
        h += '<li class="ik-support-heading">' + supportLinks[si] + '</li>';
      } else {
        h += '<li>' + supportLinks[si] + '</li>';
      }
    }
    h += '</ul></div>';
  }

  // Design / idea guidance — study-type-specific planning notes
  var guidance = buildDesignGuidance(a, d);
  if (guidance.length > 0) {
    h += '<div class="ik-result-section"><h2>What to plan for</h2><ul>';
    for (var gi0 = 0; gi0 < guidance.length; gi0++) h += '<li>' + guidance[gi0] + '</li>';
    h += '</ul></div>';
  }

  // Regulatory flags — submission track only
  if (stage === 'submission' && d.flags && d.flags.length > 0) {
    h += '<div class="ik-result-section"><h2>Important considerations</h2><div class="ik-flags">';
    for (var f = 0; f < d.flags.length; f++) {
      var fl = d.flags[f];
      h += '<div class="ik-flag ' + fl.tone + '"><strong>' + escHtml(fl.label) + '</strong>' + escHtml(fl.text) + '</div>';
    }
    h += '</div></div>';
  }

  // Startup checklist — submission track only
  if (stage === 'submission') {
    var groups = buildChecklist(a, d);
    var hasGroups = false;
    for (var gi = 0; gi < groups.length; gi++) { if (groups[gi].items && groups[gi].items.length > 0) { hasGroups = true; break; } }
    if (hasGroups) {
      h += '<div class="ik-result-section"><h2>Your startup checklist</h2>';
      for (var gi2 = 0; gi2 < groups.length; gi2++) {
        var grp = groups[gi2];
        if (!grp.items || grp.items.length === 0) continue;
        h += '<div class="ik-checklist-group">';
        h += '<h3 class="ik-checklist-group-title">' + escHtml(grp.title) + '</h3>';
        h += '<ul>';
        for (var ci = 0; ci < grp.items.length; ci++) h += '<li>' + grp.items[ci] + '</li>';
        h += '</ul></div>';
      }
      h += '</div>';
    }
  }

  // Dev/triage data
  h += '<div class="ik-devdata">';
  h += '<h3>Submission data</h3>';
  h += '<p style="margin-bottom:8px;font-size:12px">A copy of this intake has been emailed to the Research Facilitator.</p>';
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
// INIT
// ---------------------------------------------------------------------------
window.ikRenderForm = function() {
  var area = document.getElementById('ik-form-area-v2');
  if (!area) return;
  if (!area.innerHTML.trim()) renderSection(state.currentSection);
};

if (window._ikPollInterval) clearInterval(window._ikPollInterval);
window._ikPollInterval = setInterval(function() {
  window.ikRenderForm && window.ikRenderForm();
}, 400);

window.ikRenderForm();

})();
