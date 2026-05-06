(function(){

// Instance guard — invalidates event listeners from any previously-loaded copy
// of this script (e.g. old cached version still attached to document).
var _ikInstance = Date.now() + Math.random();
window._ikCurrentInstance = _ikInstance;

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

  d.isDrugStudy         = a.S3_INT_TYPE === 'drug';
  d.isDeviceStudy       = a.S3_INT_TYPE === 'device';
  d.isNHPStudy          = a.S3_INT_TYPE === 'nhp';
  d.isSponsorInvestigator = a.S4_SPONSORSHIP === 'si';
  d.isIndustrySponsored = a.S4_SPONSORSHIP === 'industry';
  d.isMulticentre       = a.S3_SITES && a.S3_SITES !== 'single';
  d.involvesPHI         = a.S3_PHI === 'yes' || a.S3_PHI === 'unsure';
  d.crossBorder         = a.S3_PHI_CROSSBORDER === 'yes';
  d.needsHCfiling       = a.S3_TYPE === 'interventional' && (a.S3_INT_TYPE === 'drug' || a.S3_INT_TYPE === 'device' || a.S3_INT_TYPE === 'nhp');
  d.involvesMinors      = a.S3_POPULATION === 'minors' || a.S3_POPULATION === 'both';
  d.involvesIncapable   = a.S3_POPULATION === 'incapable' || a.S3_POPULATION === 'both';

  // Pathway recommendation — derived automatically (not shown to user, used for triage record)
  if (stage === 'idea' || stage === 'design') {
    d.recommendedPathway = 'self-serve';
  } else if (d.riskGrouping === 'highest' || a.S4_EXPERIENCE === 'first') {
    d.recommendedPathway = 'warm-handoff';
  } else if (d.riskGrouping === 'high') {
    d.recommendedPathway = 'quick-consult';
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
  'self-serve':    'Self-serve',
  'quick-consult': 'Quick consult',
  'warm-handoff':  'Warm handoff'
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
    items.push('A Health Canada Clinical Trial Application (CTA, Division 5) is required — filed separately from your REB submission. GCP (ICH E6 R3) and Division 5 training are required for all team members. (<a href="/sops/cr-018-overview">CTA overview &rarr;</a>)');
  }
  if (d.isNHPStudy) {
    items.push('A Health Canada CTA for Natural Health Products is required. GCP training and a product dossier are needed before submission.');
  }
  if (d.isDeviceStudy) {
    items.push('A Health Canada Investigational Testing Authorization (ITA) is required for the investigational device. ISO 14155:2020 GCP training required. (<a href="/sops/cr-024-overview">ITA overview &rarr;</a>)');
  }
  if (d.isSponsorInvestigator) {
    items.push('As Sponsor-Investigator, you hold both Sponsor and QI/PI responsibilities simultaneously — Health Canada filings, independent monitoring, IP supply chain, SUSAR reporting, and the Trial Master File. The 100-series SOPs apply. Engage QA early. (<a href="/sops/sponsor-investigator">Sponsor-Investigator SOPs &rarr;</a>)');
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
    items.push('Multicentre studies require site-specific feasibility reviews and coordination. As MUHC lead, you submit via Nagano on behalf of all Quebec RSSS sites. (<a href="/kb/planning/feasibility">Multi-site feasibility &rarr;</a>)');
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
  docs.push('Study budget and contracts — initiate early via the Research Agreements Office. (<a href="/kb/planning/budgets-contracts">Budgets and contracts &rarr;</a>)');

  var activation = [];
  activation.push('Submit via Nagano F11 — triggers REB review and institutional feasibility review in parallel. (<a href="/apps/nagano/overview">Nagano step-by-step guide &rarr;</a>)');
  if (nHC && d.isDrugStudy) {
    activation.push('Health Canada CTA (Division 5) — drug submission timeline is separate from REB review. (<a href="/sops/cr-018-overview">CTA overview &rarr;</a>)');
  }
  if (nHC && d.isDeviceStudy) {
    activation.push('Health Canada ITA for medical devices. (<a href="/sops/cr-024-overview">ITA overview &rarr;</a>)');
  }
  if (a.S4_CIM && a.S4_CIM !== 'no') {
    activation.push('CIM feasibility assessment — required before activation for studies using CIM. (<a href="/cim/planning">Planning your study with the CIM &rarr;</a>)');
  }
  activation.push('MUHC Authorization letter — all review streams must complete before any study activity can begin.');
  if (isInd) {
    activation.push('Sponsor\'s Go Letter — participant enrolment may not begin until this is received.');
  }
  if (isSI) {
    activation.push('Independent monitoring plan required — monitor must not be on the site Task Delegation Log. (<a href="/sops/sponsor-investigator">Sponsor-Investigator SOPs &rarr;</a>)');
  }

  return [
    { title: 'Credentials and training', items: credentials },
    { title: 'Study documents',          items: docs },
    { title: 'Submit and activate',      items: activation }
  ];
}

// ---------------------------------------------------------------------------
// NEXT STEPS — stage-adaptive with Hub links (raw HTML, not escaped)
// ---------------------------------------------------------------------------
function buildNextSteps(a, d) {
  var stage = d.stage;
  var next = [];

  if (stage === 'idea') {
    next.push('Start with the study design and feasibility resources: <a href="/kb/planning/study-design">Design &amp; feasibility &rarr;</a>');
    next.push('Explore planning support services available from the design stage onward: <a href="/#design-planning-support">Design and planning support &rarr;</a>');
    next.push('Browse what it takes to run a clinical study at the RI-MUHC: <a href="/kb/introduction">Introduction to clinical research &rarr;</a>');
    next.push('The Research Facilitator will review your intake and follow up within 5 business days.');

  } else if (stage === 'design') {
    next.push('Review the full PI/QI pathway from intake to activation: <a href="/kb/roles/pi-pathway">PI/QI pathway overview &rarr;</a>');
    next.push('Understand training and credentials requirements for your study type: <a href="/training/compliance-requirements">Compliance requirements &rarr;</a>');
    next.push('Planning support services — biostatistics, CORD, methodology, pre-awards, and more: <a href="/#design-planning-support">Design and planning support &rarr;</a>');
    next.push('The Research Facilitator will review your intake and follow up within 5 business days.');

  } else if (stage === 'submission') {
    next.push('The Research Facilitator will review your intake and follow up within 5 business days.');
    next.push('Step-by-step guide to submitting via Nagano: <a href="/apps/nagano/overview">Submit via Nagano &rarr;</a>');
    if (d.isDrugStudy) {
      next.push('Drug study — Health Canada CTA requirements: <a href="/sops/cr-018-overview">SOP-CR-018 overview &rarr;</a>');
    }
    if (d.isDeviceStudy) {
      next.push('Device study — ITA requirements: <a href="/sops/cr-024-overview">SOP-CR-024 overview &rarr;</a>');
    }
    if (a.S4_CIM && a.S4_CIM !== 'no') {
      next.push('CIM involvement — is CIM right for your study? <a href="/cim/planning">CIM overview &rarr;</a>');
    }
    if (d.isSponsorInvestigator) {
      next.push('Sponsor-Investigator obligations — the 100-series SOPs apply to you: <a href="/sops/sponsor-investigator">Sponsor-Investigator SOPs &rarr;</a>');
    }

  } else if (stage === 'conduct') {
    next.push('Study conduct resources — site setup and day-to-day operations: <a href="/kb/conduct/site-setup">Site activation &rarr;</a>');
    next.push('Data integrity and source documentation: <a href="/kb/conduct/data-integrity">Data integrity &rarr;</a>');
    next.push('AE and SAE reporting procedures: <a href="/sops/cr-012-overview">SOP-CR-012 — AE/SAE reporting &rarr;</a>');
    next.push('The Research Facilitator will review your intake and follow up within 5 business days.');

  } else if (stage === 'closeout') {
    next.push('Study close-out procedures and checklist: <a href="/kb/conduct/close-out">Close-out guide &rarr;</a>');
    next.push('SOP-CR-016 — Study Close-Out: <a href="/sops/cr-016-overview">View SOP &rarr;</a>');
    next.push('The Research Facilitator will review your intake and follow up within 5 business days.');
  }

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
  var intakeId = 'RF-' + d.getFullYear() + pad(d.getMonth()+1, 2) + pad(d.getDate(), 2) + '-' + pad(Math.floor(Math.random()*10000), 4);
  var payload = {
    intakeId: intakeId,
    submittedAt: d.toISOString(),
    answers: state.answers,
    derived: derived,
    schemaVersion: '2.0'
  };

  state.submitted = true;
  console.log('=== RI-MUHC Study Intake — Submission ===');
  console.log(payload);
  showResult(payload);
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
  h += '<h3>Demo mode</h3>';
  h += '<p style="margin-bottom:8px;font-size:12px">In production, this data writes to the Research Facilitator\'s triage record.</p>';
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
