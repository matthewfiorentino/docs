

/* ════════════════════════════════════════════
   QUESTION POOL
   applicability: 'all' | 'interventional'
════════════════════════════════════════════ */
var KP_POOL = [

  /* ══════════════════════════════════════════════════════════════
     TOPIC: Adverse Events and SAE Reporting
     Source: SOP-CR-012_08, ICH E6(R3), HC Div 5
     applies: interventional
  ══════════════════════════════════════════════════════════════ */

  { id:'sae-c1', type:'check', topic:'Adverse Events / SAE', topicId:'sae', applies:'interventional',
    q:'What is the maximum reporting window for a non-fatal, non-life-threatening SAE from the site awareness date in a Level I drug study?',
    opts:['7 calendar days','15 calendar days','30 calendar days','It depends on the sponsor\u2019s timeline'],
    correct:1,
    rationale:'15 calendar days for non-fatal, non-life-threatening SAEs. The 7-day window applies only to fatal or life-threatening unexpected SAEs (SUSAR-level), followed by a complete written report within 8 additional calendar days. The clock starts at site awareness \u2014 PI availability is irrelevant.',
    ref:'<a href="/sops/cr-012">SOP-CR-012 \u00a75.5.2\u20135.5.3</a> \u00b7 <a href="/kb/reportable-events">Reportable Events</a>' },

  { id:'sae-c2', type:'check', topic:'Adverse Events / SAE', topicId:'sae', applies:'interventional',
    q:'All SAEs must be reported to the sponsor within how many hours of the QI/PI awareness date?',
    opts:['24 hours','48 hours','72 hours','7 calendar days'],
    correct:0,
    rationale:'Per SOP-CR-012 section 5.4.1, all SAEs must be reported to the sponsor or sponsor-investigator within 24 hours of QI/PI awareness, even if the report is only partially completed. A complete follow-up report should follow within 8 calendar days to allow the sponsor to meet their Health Canada reporting deadline.',
    ref:'<a href="/sops/cr-012">SOP-CR-012 \u00a75.4.1</a>' },

  { id:'sae-c3', type:'check', topic:'Adverse Events / SAE', topicId:'sae', applies:'interventional',
    q:'Who is responsible for the \u201cseriousness\u201d assessment of an adverse event?',
    opts:['The participant, based on how they feel','The sponsor\u2019s medical monitor','The investigator (PI or qualified delegate)','The hospital admitting physician'],
    correct:2,
    rationale:'The QI/PI or a qualified delegate on the task delegation log makes the seriousness assessment. It is a clinical and regulatory judgment based on defined criteria: hospitalization, death, life-threatening condition, disability, congenital anomaly, or medically important event.',
    ref:'<a href="/sops/cr-012">SOP-CR-012 \u00a75.2.6</a>' },

  { id:'sae-c4', type:'check', topic:'Adverse Events / SAE', topicId:'sae', applies:'interventional',
    q:'A participant rates their nausea as \u201csevere.\u201d Does this automatically make it a \u201cserious\u201d adverse event?',
    opts:['Yes \u2014 severe symptoms always meet the SAE definition','No \u2014 severity and seriousness are distinct classifications','Only if the PI considers it clinically significant','Yes, unless the protocol says otherwise'],
    correct:1,
    rationale:'Severity grades intensity (mild / moderate / severe). Seriousness is a regulatory classification based on defined outcomes: hospitalization, death, life-threatening condition, disability, congenital anomaly, or medically important event. A severe headache is not serious; a mild anaphylactic reaction may be. Reporting obligations are triggered by seriousness, not severity.',
    ref:'<a href="/sops/cr-012">SOP-CR-012 \u00a75.2.4\u20135.2.6</a>' },

  { id:'sae-c5', type:'check', topic:'Adverse Events / SAE', topicId:'sae', applies:'interventional',
    q:'How is \u201cexpectedness\u201d of an SAE determined?',
    opts:['By the PI\u2019s clinical judgment at the time of the event','By whether the event is listed in the Investigator\u2019s Brochure (IB)','By the sponsor\u2019s pharmacovigilance team','By comparison to common AEs in the therapeutic area'],
    correct:1,
    rationale:'Expectedness is determined by whether the event \u2014 in terms of nature, severity, or frequency \u2014 is described in the Investigator\u2019s Brochure or other REB-approved documents such as the protocol and ICF. If the AE is not listed or is more severe than listed in the IB, it is considered unexpected. This is a distinct assessment from the PI\u2019s relatedness call.',
    ref:'<a href="/sops/cr-012">SOP-CR-012 \u00a75.3.4, 5.6 (Reminder)</a>' },

  { id:'sae-c6', type:'check', topic:'Adverse Events / SAE', topicId:'sae', applies:'interventional',
    q:'The PI is unreachable when you learn of an SAE. You are the CRC alone at the site. What is the correct action?',
    opts:['Wait until the PI returns \u2014 only the PI can act on an SAE','Complete and sign the SAE report yourself as CRC','Contact another qualified physician on the delegation log; document all attempts; the clock does not pause','Notify the sponsor first and let them manage the timeline'],
    correct:2,
    rationale:'A CRC cannot assess relatedness or causality unless explicitly delegated and clinically qualified. Attempt to reach another physician on the task delegation log with SAE assessment authority. Document all attempts in full. The reporting clock runs from site awareness regardless of PI availability.',
    ref:'<a href="/sops/cr-012">SOP-CR-012 \u00a75.4.1</a> \u00b7 <a href="/sops/cr-002">SOP-CR-002 (Delegation)</a>' },

  { id:'sae-c7', type:'check', topic:'Adverse Events / SAE', topicId:'sae', applies:'interventional',
    q:'When must a reportable SAE be submitted to the REB via Nagano if it is fatal or life-threatening?',
    opts:['24 hours','7 calendar days from QI/PI awareness','15 calendar days from QI/PI awareness','At the next annual continuing review'],
    correct:1,
    rationale:'Per SOP-CR-012 section 5.5.2, if the reportable SAE is life-threatening or fatal, it must be reported to the REB within 7 calendar days of the QI/PI awareness date. Non-life-threatening reportable SAEs have a 15-day window. Both are submitted via the Nagano 3H form.',
    ref:'<a href="/sops/cr-012">SOP-CR-012 \u00a75.5.2\u20135.5.3</a>' },

  /* ── SAE SCENARIOS ── */

  /* 3-part chain: Friday SAE cascade */
  { id:'sae-s1c', type:'check', topic:'Adverse Events / SAE', topicId:'sae', applies:'interventional',
    q:'A participant was hospitalized for chest pain. The sub-investigator on the delegation log assessed the event as \u201cpossibly related\u201d to the study drug and you submitted the initial SAE report to the sponsor. On day 12, the sponsor\u2019s medical monitor calls and asks you to revise the relatedness assessment to \u201cunrelated\u201d before the final report is submitted. They argue it will \u201csimplify the submission.\u201d\n\nWhat do you do?',
    opts:['Revise the assessment as requested \u2014 the sponsor\'s medical monitor has more context about the drug\'s safety profile across all sites','Ask the assessing investigator to reconsider, explaining the sponsor\'s reasoning, and change it only if they agree after independent review','Change it to \u201cunrelated\u201d in the eCRF but keep the original in the source file as a backup','Refuse outright and file a complaint against the sponsor with Health Canada'],
    ans:1,
    rationale:'You do not change the relatedness assessment at the sponsor\u2019s request. The clinical judgment belongs to the investigator who assessed the event. If the sponsor disagrees, the correct mechanism is a written query explaining their reasoning, which the investigator reviews and may respond to with documented rationale. Any change must be audit-trailed; the original assessment must be preserved. Changing a clinical assessment under sponsor pressure is a GCP violation and a data integrity issue. Document this conversation.',
    ref:'<a href="/sops/cr-012">SOP-CR-012</a> \u00b7 <a href="/kb/data-integrity">Data Integrity</a>' },

  /* standalone scenarios */
  { id:'sae-s2', type:'check', topic:'Adverse Events / SAE', topicId:'sae', applies:'interventional',
    q:'A participant in a multi-site trial is hospitalized. The coordinating centre says they will handle the SAE report since they\u2019re the lead site. Do you need to do anything at your site?',
    opts:['No \u2014 the coordinating centre handles all regulatory reporting for multi-site trials','Yes \u2014 notify the MUHC REB via Nagano, document the event in the ISF, and ensure the local QI/PI has assessed participant safety','Only if the participant was hospitalized at the MUHC \u2014 otherwise the event occurred at another institution','Send the coordinating centre your documentation and ask them to include it in their report'],
    ans:1,
    rationale:'Yes. The local QI/PI remains responsible for participant safety at this site and for local REB notification. Even where the lead site handles Health Canada reporting, your site must still notify the MUHC REB via Nagano (3H form) and document the event in your ISF. For the Quebec multi-centrique process, you may also need to notify the MUHC personne mandat\u00e9e. The coordinating centre\u2019s role does not discharge your local regulatory obligations.',
    ref:'<a href="/sops/cr-012">SOP-CR-012 \u00a75.5.8, 5.9.3</a> \u00b7 <a href="/kb/multi-centric">Multi-Centric Studies</a>' },

  { id:'sae-s3', type:'check', topic:'Adverse Events / SAE', topicId:'sae', applies:'interventional',
    q:'A participant completes all study procedures and enters the follow-up period. Three weeks later they are hospitalized for an event the PI considers possibly related to the study drug. The PI says \u201cthey\u2019re off-study, we don\u2019t need to report.\u201d Are they right?',
    opts:['The PI is correct \u2014 once a participant completes the last study visit, reporting obligations end','Report only if the event is directly caused by the study drug, not if it is merely \u201cpossibly related\u201d','The PI is wrong \u2014 SAEs within the protocol-defined follow-up period that are possibly related must still be reported to the sponsor and REB','Document the event in the participant\'s medical chart but do not submit a formal SAE report'],
    ans:2,
    rationale:'No. SAEs that occur within the protocol-defined follow-up period and are possibly related to the study drug or procedures must be reported regardless of whether active participation has ended. The follow-up period exists in the protocol precisely because safety obligations extend beyond the last visit. Report to the sponsor within 24 hours and to the REB within the applicable window. If the PI is resistant, walk them through SOP-CR-012 \u00a75.5.1 directly.',
    ref:'<a href="/sops/cr-012">SOP-CR-012 \u00a75.5.1</a>' },


  /* ══════════════════════════════════════════════════════════════
     TOPIC: Informed Consent Process
     Source: SOP-CR-008_08, TCPS2 (2022), ICH E6(R3), HC GUI-0100
     applies: all
  ══════════════════════════════════════════════════════════════ */

  { id:'ic-c1', type:'check', topic:'Informed Consent', topicId:'consent', applies:'all',
    q:'Under SOP-CR-008, who should obtain informed consent from a participant?',
    opts:['Any trained member of the research team','A qualified person familiar with the study protocol who is not the participant\u2019s treating physician (unless justified to the REB)','The principal investigator only','An administrative staff member with GCP training'],
    correct:1,
    rationale:'The person obtaining informed consent should be qualified, familiar with the study protocol, and able to explain it in lay terms. SOP-CR-008 specifies they should not be the participant\u2019s treating physician or someone with a long-standing relationship with the participant, as this may be perceived as undue influence. If the treating physician must obtain consent, the REB must approve this and the physician must disclose their dual role to the participant.',
    ref:'<a href="/sops/cr-008">SOP-CR-008 \u00a75.1.1</a>' },

  { id:'ic-c2', type:'check', topic:'Informed Consent', topicId:'consent', applies:'all',
    q:'When must informed consent be obtained in relation to study screening procedures?',
    opts:['Before any protocol screening procedures are conducted','Before the first study visit but after initial eligibility checks','Within 24 hours of first contact with the participant','It can be obtained at any point before enrolment'],
    correct:0,
    rationale:'Per SOP-CR-008 section 5.1.1 and SOP-CR-009, informed consent must be obtained prior to any protocol screening procedure being conducted. This is a core GCP and TCPS2 requirement: a person cannot be subject to research procedures unless they have first consented freely and with full information.',
    ref:'<a href="/sops/cr-008">SOP-CR-008 \u00a75.1.1</a> \u00b7 <a href="/sops/cr-009">SOP-CR-009</a>' },

  { id:'ic-c3', type:'check', topic:'Informed Consent', topicId:'consent', applies:'all',
    q:'In Quebec, what is the age of full consent to participate in research?',
    opts:['14 years','16 years','18 years','21 years'],
    correct:2,
    rationale:'Per SOP-CR-008 section 5.8.1 and the Civil Code of Quebec (CCQ, a.21), the age of full consent to research participation in Quebec is 18 years. A minor who is 14 years or older may consent to minimal-risk research only if the REB specifically approves this. Otherwise, consent must be obtained from the person with parental authority or the tutor.',
    ref:'<a href="/sops/cr-008">SOP-CR-008 \u00a75.8.1\u20135.8.2</a> \u00b7 <a href="/kb/consent">Consent in Quebec</a>' },

  { id:'ic-c4', type:'check', topic:'Informed Consent', topicId:'consent', applies:'all',
    q:'According to TCPS2, what does \u201cfree and informed consent\u201d require?',
    opts:['A signed form and verbal confirmation','Voluntary participation based on as full an understanding as reasonably possible of purpose, risks, and benefits','Completion of a standardized quiz to confirm understanding','Consent given at least 48 hours before any procedure'],
    correct:1,
    rationale:'TCPS2 Chapter 3 defines consent as free, informed, and ongoing. \u201cFree\u201d means voluntary, without coercion or undue influence. \u201cInformed\u201d means based on as complete an understanding as is reasonably possible of the research, its risks, and potential benefits. Consent is ongoing \u2014 it can be withdrawn at any time and must be refreshed when material new information becomes available.',
    ref:'<a href="/kb/consent">Consent in Quebec</a> \u00b7 TCPS2 Ch. 3' },

  { id:'ic-c5', type:'check', topic:'Informed Consent', topicId:'consent', applies:'all',
    q:'When must a participant be re-consented following an ICF amendment?',
    opts:['Immediately, even if this delays their next study visit','At their earliest visit to the clinical research site after written REB approval of the amended ICF','Within 30 days of the amendment being approved','Only if the amendment adds new risks'],
    correct:1,
    rationale:'Per SOP-CR-008 section 5.7.4 and HC Guide-0100, a participant must be re-consented on any REB-approved amended ICF at their earliest visit to the clinical research site, unless the sponsor, REB, or internal SOP has specific different requirements. Re-consent must happen after written REB approval is obtained \u2014 not before.',
    ref:'<a href="/sops/cr-008">SOP-CR-008 \u00a75.7.4</a>' },

  { id:'ic-c6', type:'check', topic:'Informed Consent', topicId:'consent', applies:'all',
    q:'What must happen when a participant who was enrolled as a minor reaches 18 years of age during a study?',
    opts:['They can continue under the original consent from their parent/tutor','They must be re-consented as a competent adult as soon as possible','They must withdraw from the study and re-enrol','The QI/PI decides case by case'],
    correct:1,
    rationale:'Per SOP-CR-008 section 5.8.6, when a participant who was enrolled as a minor reaches 18 years of age, legally effective signed consent must be obtained from the participant as soon as possible after reaching full age. The consent of the parent or tutor that covered participation as a minor is no longer sufficient.',
    ref:'<a href="/sops/cr-008">SOP-CR-008 \u00a75.8.6</a>' },

  { id:'ic-s1', type:'check', topic:'Informed Consent', topicId:'consent', applies:'all',
    q:'A participant calls you and says they no longer want to participate in the study. They also ask that all their biological samples be destroyed. How do you handle this?',
    opts:['Process the withdrawal immediately and destroy all samples and data without further discussion','Inform the participant of their right to withdraw, clarify the scope (procedures, data, samples), document the decision, and notify the sponsor','Explain that samples cannot be destroyed once collected and that withdrawal only applies to future procedures','Ask the PI to call the participant and persuade them to stay in the study'],
    ans:1,
    rationale:'Per TCPS2 and SOP-CR-008, consent is ongoing and can be withdrawn at any time. Inform the participant of their right to withdraw without penalty. If they request withdrawal of their biological materials, this must be honoured unless it is genuinely impossible (e.g., samples have already been anonymized and cannot be identified). Document the withdrawal, the date, and any samples returned or destroyed. Notify the sponsor as per the protocol. The participant\u2019s right to withdraw data and materials is part of the consent they gave when enrolling.',
    ref:'<a href="/sops/cr-008">SOP-CR-008 \u00a75.1.16</a> \u00b7 TCPS2 Ch. 3' },

  { id:'ic-s2', type:'check', topic:'Informed Consent', topicId:'consent', applies:'all',
    q:'A participant does not speak English or French. A family member offers to interpret. Can you use them as your interpreter to obtain informed consent?',
    opts:['Yes \u2014 a family member who speaks both languages is the most practical option and understands the participant\'s situation','Yes, but only if the family member signs a confidentiality agreement and the CRC documents their presence','No \u2014 arrange a qualified impartial interpreter; a family member may filter information or exert influence on the consent decision','No \u2014 the participant must learn English or French before they can be enrolled in a study at the MUHC'],
    ans:2,
    rationale:'No \u2014 a family member is not an impartial interpreter. SOP-CR-008 section 5.10.2 requires an impartial qualified interpreter/translator if the participant does not speak English or French. Using a family member introduces risk of filtering, selective translation, or undue influence. Arrange for a qualified interpreter. Document the interpreter\u2019s identity and their role. The REB-approved ICF should be translated, or a short-form consent in the participant\u2019s language used with an impartial witness present.',
    ref:'<a href="/sops/cr-008">SOP-CR-008 \u00a75.10</a>' },

  /* ══════════════════════════════════════════════════════════════
     TOPIC: Roles and Delegation
     Source: SOP-CR-002_09, ICH E6(R3)
     applies: all
  ══════════════════════════════════════════════════════════════ */

  { id:'del-c1', type:'check', topic:'Roles and Delegation', topicId:'delegation', applies:'all',
    q:'A clinical research task has been delegated to a CRC. If that CRC makes an error, who holds ultimate responsibility for the conduct of the study?',
    opts:['The CRC who performed the task','The department head','The Qualified Investigator (QI)/Principal Investigator (PI)','The sponsor'],
    correct:2,
    rationale:'Per SOP-CR-002 and ICH E6(R3), any or all parts of a procedure may be delegated to appropriately trained study team members, but the ultimate responsibility remains with the QI/PI (and sponsor-investigator, where applicable). Delegation does not transfer responsibility \u2014 it distributes tasks while the investigator retains accountability for study conduct.',
    ref:'<a href="/sops/cr-002">SOP-CR-002</a> \u00b7 ICH E6(R3) Principle 9' },

  { id:'del-c2', type:'check', topic:'Roles and Delegation', topicId:'delegation', applies:'all',
    q:'What is required before a study team member can perform a delegated task?',
    opts:['Verbal confirmation from the PI','Documentation of qualification, training, and delegation on the Task Delegation Log','Completion of an online GCP course','Approval from the REB'],
    correct:1,
    rationale:'Per SOP-CR-002, a team member must be qualified by education, training, and experience, and the delegation must be documented on the Task Delegation Log before they can perform a delegated task. Undocumented delegation is equivalent to no delegation from a GCP standpoint. The delegation log must be signed and dated by the PI.',
    ref:'<a href="/sops/cr-002">SOP-CR-002</a>' },

  { id:'del-c3', type:'check', topic:'Roles and Delegation', topicId:'delegation', applies:'interventional',
    q:'Under ISO 14155 (medical devices), how does responsibility differ from ICH GCP (drugs) when tasks are delegated?',
    opts:['There is no difference \u2014 both standards treat responsibility the same','Under ISO 14155, responsibility is delegated with tasks; under ICH GCP, the QI retains ultimate responsibility','Under ISO 14155, only the sponsor holds responsibility; under ICH, only the PI does','ISO 14155 does not address delegation'],
    correct:1,
    rationale:'This is a key difference between the two GCP frameworks. Under ICH E6(R3) for drugs, the QI/PI retains ultimate responsibility even when tasks are delegated. Under ISO 14155:2020 for medical devices, responsibility transfers with the delegated task. This distinction appears directly in SOP-CR-014 and affects how liability is understood in device versus drug trials.',
    ref:'<a href="/sops/cr-002">SOP-CR-002</a> \u00b7 <a href="/sops/cr-014">SOP-CR-014</a> \u00b7 ISO 14155:2020' },

  { id:'del-s2', type:'check', topic:'Roles and Delegation', topicId:'delegation', applies:'interventional',
    q:'During a monitoring visit, the sponsor\u2019s monitor identifies that a study task was performed by a team member whose name does not appear on the delegation log for that task. How should you respond?',
    opts:['Backdate the delegation log to cover the period when the task was performed, then notify the monitor it has been corrected','Acknowledge the finding, investigate when and why it occurred, update the log with the correct date, file a note-to-file, and complete a deviation report','Explain to the monitor that the person was verbally authorized by the PI and that the log is just a formality','Remove the data collected by the undelegated team member from the study records'],
    ans:1,
    rationale:'This is a protocol deviation and a GCP finding. First, acknowledge the finding. Investigate when the undelegated task occurred and who performed it. If the PI did intend to delegate the task to this person, update the delegation log with the correct date and document the retrospective correction with a note-to-file explaining what happened. If the person should not have been performing the task at all, complete a deviation report and CAPA as required. Do not falsely backdate the delegation log.',
    ref:'<a href="/sops/cr-002">SOP-CR-002</a> \u00b7 <a href="/kb/data-integrity">Data Integrity</a>' },


  /* ══════════════════════════════════════════════════════════════
     TOPIC: GCP Principles
     Source: ICH E6(R3), HC GUI-0100
     applies: interventional
  ══════════════════════════════════════════════════════════════ */

  { id:'gcp-c1', type:'check', topic:'GCP Principles', topicId:'gcp', applies:'interventional',
    q:'ICH E6(R3) was formally adopted by Health Canada on what date?',
    opts:['January 6, 2025','June 23, 2025','October 17, 2025','April 1, 2026'],
    correct:3,
    rationale:'Health Canada adopted ICH E6(R3) Good Clinical Practice effective April 1, 2026 (announced October 17, 2025). This replaces E6(R2) as the applicable GCP standard for Health Canada-regulated clinical trials. E6(R3) introduces 11 overarching principles, risk-based quality management, and critical-to-quality factor requirements.',
    ref:'<a href="/kb/governance/regulatory-framework">Regulatory Framework</a> \u00b7 HC GUI-0100 (March 2026)' },

  { id:'gcp-c2', type:'check', topic:'GCP Principles', topicId:'gcp', applies:'interventional',
    q:'What is a \u201ccritical-to-quality\u201d (CtQ) factor under ICH E6(R3)?',
    opts:['Any data element required by the REB','A process or data element that is essential to participant protection or the reliability of trial results','A regulatory requirement that triggers Health Canada inspection','The primary endpoint of the study'],
    correct:1,
    rationale:'ICH E6(R3) introduces the concept of critical-to-quality (CtQ) factors: data elements and processes that, if they fail, would jeopardize participant safety or the reliability of the primary endpoint. Sponsors and investigators are expected to identify CtQ factors prospectively, set tolerance limits, and manage them through a risk-based quality management approach.',
    ref:'<a href="/kb/governance/regulatory-framework">Regulatory Framework</a> \u00b7 ICH E6(R3)' },

  { id:'gcp-c3', type:'check', topic:'GCP Principles', topicId:'gcp', applies:'interventional',
    q:'Under ICH E6(R3), which statement about the rights of trial participants is correct?',
    opts:['The rights of participants may be balanced against scientific interests on a case-by-case basis','The rights, safety, and well-being of trial participants must take precedence over all other interests','Scientific integrity takes precedence when results could benefit many future patients','Participant rights are primarily the sponsor\u2019s responsibility, not the investigator\u2019s'],
    correct:1,
    rationale:'This is Principle 1 of ICH E6(R3), directly restating the Declaration of Helsinki: the rights, safety, and well-being of trial participants must take precedence over the interests of science and society. This is non-negotiable and applies to all parties \u2014 sponsor, investigator, and CRO alike.',
    ref:'<a href="/kb/governance/regulatory-framework">Regulatory Framework</a> \u00b7 ICH E6(R3) Principle 1 (Ethical Conduct)' },

  { id:'gcp-c4', type:'check', topic:'GCP Principles', topicId:'gcp', applies:'interventional',
    q:'What does \u201crisk-based monitoring\u201d mean under ICH E6(R3)?',
    opts:['Conducting more site visits for high-risk participants','Tailoring the monitoring plan to the specific risks to data integrity and participant protection in the trial','Monitoring only the primary endpoint data','Reducing all monitoring to remote-only visits'],
    correct:1,
    rationale:'Risk-based monitoring (RBM) under E6(R3) means tailoring the monitoring strategy to the specific human subject protection and data integrity risks of each trial. This may include centralized data analytics, remote source data review, and targeted on-site visits \u2014 rather than defaulting to 100% on-site source data verification for every data point. The monitoring plan must be documented and focus on critical data and processes.',
    ref:'<a href="/kb/monitoring-audits">Monitoring, Audits and Inspections</a> \u00b7 ICH E6(R3)' },

  { id:'gcp-s1', type:'check', topic:'GCP Principles', topicId:'gcp', applies:'interventional',
    q:'A sponsor\u2019s monitor arrives for a source data verification visit and asks to review a participant\u2019s full hospital medical record, including records unrelated to the study. Your site\u2019s ICF states that participants consent to study-related records access only. What do you do?',
    opts:['Provide the full medical record \u2014 GCP requires investigators to allow monitor access to all source records','Provide study-related records only, consistent with the ICF scope, and escalate to the PI and privacy officer if the monitor insists','Refuse all access until the PI is present to supervise the review','Provide the full record but redact the participant\'s name from each page'],
    ans:1,
    rationale:'You provide access to study-related records only, consistent with what participants consented to. GCP requires that investigators allow the sponsor, monitors, and regulatory authorities access to source records \u2014 but the scope of that access is bounded by the consent and applicable privacy law. Providing unrelated medical records without explicit consent would violate participant privacy and TCPS2/provincial law. Document the monitor\u2019s request and your response. If the monitor insists, escalate to the QI/PI and your institution\u2019s research privacy officer.',
    ref:'<a href="/sops/cr-014">SOP-CR-014 \u00a75.3</a> \u00b7 ICH E6(R3)' },


  /* ══════════════════════════════════════════════════════════════
     TOPIC: Health Canada Division 5
     Source: HC Food and Drug Regulations Part C Div 5, GUI-0100
     applies: interventional
  ══════════════════════════════════════════════════════════════ */

  { id:'hc-c1', type:'check', topic:'Health Canada Division 5', topicId:'div5', applies:'interventional',
    q:'Before a sponsor can sell or import an investigational drug for use in a Canadian clinical trial, what must happen?',
    opts:['REB approval only \u2014 no Health Canada submission is required','A Clinical Trial Application (CTA) must be filed with Health Canada and receive a No Objection Letter (NOL) or not be objected to within 30 days','A Notice of Compliance (NOC) must be obtained','The trial must be registered on ClinicalTrials.gov first'],
    correct:1,
    rationale:'Under Part C, Division 5 of the Food and Drug Regulations, a sponsor must file a CTA with Health Canada. If Health Canada does not object within 30 days, the sponsor may proceed and a No Objection Letter (NOL) is issued. The NOL must be filed with the study\u2019s essential documents. REB approval is also required before the trial begins, and the Clinical Trial Site Information (CTSI) form must be submitted to Health Canada.',
    ref:'<a href="/sops/cr-018">SOP-CR-018 (CTA \u2014 Drugs)</a> \u00b7 HC Div 5 C.05.006' },

  { id:'hc-c2', type:'check', topic:'Health Canada Division 5', topicId:'div5', applies:'interventional',
    q:'Under Division 5, how long must clinical trial records be retained by the sponsor?',
    opts:['7 years','10 years','15 years','25 years'],
    correct:2,
    rationale:'Part C, Division 5 of the Food and Drug Regulations (C.05.012) requires sponsors to retain clinical trial records for 15 years. Health Canada reduced the retention period from 25 years to 15 years effective February 11, 2022. Records must be made available to Health Canada within 2 days if there is a concern regarding participant safety, or within 7 days in any other case.',
    ref:'<a href="/kb/governance/regulatory-framework">Regulatory Framework</a> \u00b7 HC Div 5 C.05.012\u201313' },

  { id:'hc-c3', type:'check', topic:'Health Canada Division 5', topicId:'div5', applies:'interventional',
    q:'The Division 5 regulations do not differentiate between a commercial and a non-commercial sponsor. What does this mean for a physician who initiates their own clinical trial?',
    opts:['They are exempt from Division 5 because they are not a commercial entity','They are considered the sponsor-investigator and must fulfil all sponsor obligations under Division 5','They only need to comply with GCP, not the regulatory requirements','The hospital is the sponsor and bears all regulatory responsibilities'],
    correct:1,
    rationale:'Division 5 explicitly does not differentiate between commercial and non-commercial sponsors. A physician or institution that initiates a trial (sponsor-investigator) must fulfil all sponsor obligations, including filing a CTA, monitoring the trial, and reporting adverse reactions to Health Canada. This is a common misunderstanding among academic researchers.',
    ref:'<a href="/kb/governance/regulatory-framework">Regulatory Framework</a> \u00b7 HC GUI-0100' },

  { id:'hc-c4', type:'check', topic:'Health Canada Division 5', topicId:'div5', applies:'interventional',
    q:'A protocol amendment changes the inclusion criteria in a way that could affect participant safety. When must a CTA amendment (CTA-A) be filed with Health Canada?',
    opts:['Within 15 calendar days after implementing the change','Before implementing the change \u2014 it must be authorized first','At the next annual submission','Only if Health Canada specifically requests it'],
    correct:1,
    rationale:'Under Division 5 (C.05.008), changes to the protocol that could affect the quality or safety of the drug or the risk to participants require a CTA amendment, which must be authorized by Health Canada before implementation. The only exception is if an immediate amendment is necessary to eliminate an immediate hazard to participants, in which case the sponsor may implement first and must notify Health Canada within 15 calendar days.',
    ref:'<a href="/kb/governance/regulatory-framework">Regulatory Framework</a> \u00b7 HC GUI-0100' },

  /* ══════════════════════════════════════════════════════════════
     TOPIC: TCPS2 and Research Ethics
     Source: TCPS2 (2022), SOP-CR-007, SOP-CR-008
     applies: all
  ══════════════════════════════════════════════════════════════ */

  { id:'tcps-c1', type:'check', topic:'Research Ethics / TCPS2', topicId:'tcps2', applies:'all',
    q:'What are the three core principles of TCPS2?',
    opts:['Beneficence, Non-maleficence, Autonomy','Respect for Persons, Concern for Welfare, Justice','Informed Consent, Privacy, Scientific Integrity','Voluntariness, Transparency, Accountability'],
    correct:1,
    rationale:'TCPS2 Chapter 1 establishes three core principles: Respect for Persons (autonomy, free and informed consent), Concern for Welfare (protecting participants\u2019 physical, mental, social, and other interests), and Justice (fair distribution of benefits and burdens of research, equitable inclusion). All research ethics decisions at the REB and researcher level should be guided by these principles.',
    ref:'<a href="/kb/governance/regulatory-framework">Regulatory Framework</a> \u00b7 TCPS2 Ch. 1' },

  { id:'tcps-c2', type:'check', topic:'Research Ethics / TCPS2', topicId:'tcps2', applies:'all',
    q:'A researcher wants to conduct a retrospective chart review and argues they don\u2019t need REB approval because they\u2019re not interacting with participants. Are they correct?',
    opts:['Yes \u2014 no participant interaction means no ethics review required','No \u2014 research involving identifiable human data still requires REB review and approval','Only if the data is de-identified before analysis','It depends on the source of the funding'],
    correct:1,
    rationale:'TCPS2 requires REB review for all research involving humans, including secondary use of identifiable data such as medical records. The absence of direct participant interaction does not exempt research from ethics review. An EFVP (privacy impact assessment) may also be required by the MUHC. Under TCPS2, the REB may grant a waiver of consent for retrospective studies if specific conditions are met.',
    ref:'<a href="/kb/governance/regulatory-framework">Regulatory Framework</a> \u00b7 TCPS2 Ch. 2 &amp; 5 \u00b7 <a href="/sops/cr-008">SOP-CR-008 \u00a75.4</a>' },

  { id:'tcps-c3', type:'check', topic:'Research Ethics / TCPS2', topicId:'tcps2', applies:'all',
    q:'Under TCPS2, can the REB grant a waiver of informed consent for research?',
    opts:['No \u2014 informed consent is always required','Yes, under specific conditions including minimal risk and impracticability of obtaining consent','Yes, whenever the research is considered low risk','Only for retrospective studies, never for prospective ones'],
    correct:1,
    rationale:'TCPS2 Article 3.7A permits the REB to approve an alteration or waiver of consent requirements if: the research presents no more than minimal risk; the alteration is unlikely to adversely affect participant welfare; obtaining consent is impossible or impracticable given the design; and a debriefing plan is in place where appropriate. This is not a blanket exemption \u2014 each condition must be satisfied and documented.',
    ref:'TCPS2 Ch. 3, Art. 3.7A \u00b7 <a href="/sops/cr-008">SOP-CR-008 \u00a75.4</a>' },

  { id:'tcps-s1', type:'check', topic:'Research Ethics / TCPS2', topicId:'tcps2', applies:'all',
    q:'A researcher offers participants a $200 gift card for completing a study involving a lumbar puncture. An REB member raises a concern about undue inducement. How should you think about this?',
    opts:['The payment is reasonable compensation for an invasive procedure and should be approved as proposed','All participant compensation should be eliminated to avoid any appearance of inducement','Assess whether the amount could impair voluntary decision-making given the risk involved, particularly for economically vulnerable participants, and adjust if needed','Cap all study compensation at $50 regardless of the procedure \u2014 this is the TCPS2 standard'],
    ans:2,
    rationale:'TCPS2 and SOP-CR-008 prohibit coercion or undue influence on participants. The key question is whether the incentive is so substantial that it could impair a person\u2019s ability to make a free and rational decision about a procedure that carries real risk. A $200 payment for a lumbar puncture may cross the line from compensation into inducement, particularly for economically vulnerable populations. The REB must assess whether the incentive is proportionate to the burden, inconvenience, and risk involved. The solution is not necessarily to eliminate compensation \u2014 it is to ensure it is reasonable and non-coercive. This should be discussed with the REB.',
    ref:'TCPS2 Ch. 3 \u00b7 <a href="/sops/cr-008">SOP-CR-008 \u00a75.1.12</a>' },


  /* ══════════════════════════════════════════════════════════════
     TOPIC: Data Integrity and Documentation
     Source: SOP-CR-014_08, ICH E6(R3), ALCOA+
     applies: all
  ══════════════════════════════════════════════════════════════ */

  { id:'data-c1', type:'check', topic:'Data Integrity', topicId:'data', applies:'all',
    q:'What does ALCOA+ stand for in the context of clinical research documentation?',
    opts:['Accurate, Legible, Complete, Original, Auditable, plus Complete, Consistent, Enduring, Available','Attributable, Legible, Contemporaneous, Original, Accurate, plus Complete, Consistent, Enduring, Available','Authorized, Legible, Correct, Original, Archived, plus Checked, Compliant, Endorsed, Audited','Accurate, Labelled, Chronological, Organized, Archived, plus Checked, Certified, Endorsed, Accessible'],
    correct:1,
    rationale:'ALCOA+ is the foundational framework for good documentation practices in clinical research: Attributable (who recorded/changed and when), Legible (readable), Contemporaneous (recorded at the time of the action), Original (first recording or certified copy), Accurate (correct, truthful) \u2014 plus the extended elements: Complete, Consistent, Enduring, Available. Per SOP-CR-014, all data collection must follow ALCOA+ principles.',
    ref:'<a href="/sops/cr-014">SOP-CR-014 \u00a75.4.2</a> \u00b7 <a href="/kb/data-integrity">Data Integrity</a>' },

  { id:'data-c2', type:'check', topic:'Data Integrity', topicId:'data', applies:'all',
    q:'How must an error in a source document be corrected in a paper-based study?',
    opts:['Use correction fluid (white-out) to neatly cover the error and write the correct value','Scribble out the error so it cannot be read, write the correction, and initial','Draw a single line through the error without obscuring it, write the correction beside it, then initial, date, and explain','Delete the document and re-create it with the correct data'],
    correct:2,
    rationale:'Per SOP-CR-014 section 5.6.2 and GCP documentation standards, corrections must preserve the original entry (never use correction fluid or scribble), be traceable, and be explained. The correct method is: single line through the error (original still legible), correction written alongside, initialled and dated by an authorized person, with an explanation where needed. This maintains the audit trail.',
    ref:'<a href="/sops/cr-014">SOP-CR-014 \u00a75.6.2</a> \u00b7 <a href="/kb/data-integrity">Data Integrity</a>' },

  { id:'data-c3', type:'check', topic:'Data Integrity', topicId:'data', applies:'all',
    q:'A source document has a blank field for a test result that was not obtained at the visit. What is the correct approach?',
    opts:['Leave it blank so it is clear no entry was made','Write \u201cN/A\u201d or \u201cNot Applicable\u201d with initials and date, and explain if needed','Write a zero to show the field was reviewed','Contact the lab to obtain an estimate'],
    correct:1,
    rationale:'Per SOP-CR-014 section 5.6.1, blank fields must never be left empty. They must be marked \u201cNot Applicable\u201d (N/Ap), \u201cNot Available\u201d (N/Av), or \u201cunknown\u201d with an explanation, and initialled and dated by the person completing the form. A blank field in a clinical trial document is a GCP finding because it is ambiguous \u2014 it could mean the test was not done, the result was not recorded, or the field was simply missed.',
    ref:'<a href="/sops/cr-014">SOP-CR-014 \u00a75.6.1</a>' },

  { id:'data-s2', type:'check', topic:'Data Integrity', topicId:'data', applies:'all',
    q:'During a monitoring visit, the monitor notices that the same handwriting appears in source documents attributed to three different team members. What are the implications?',
    opts:['This is normal \u2014 many sites have one person who completes all forms for efficiency','Investigate immediately: determine who actually recorded each entry, review delegation logs, and escalate to the QI/PI if intentional falsification is suspected','Ask the team members to re-write their entries in their own handwriting going forward','Inform the monitor that handwriting analysis is outside the scope of a monitoring visit'],
    ans:1,
    rationale:'This is a potential data integrity violation and a serious GCP finding. Source documents must be attributable \u2014 the person who recorded the data must be identifiable, and the record must reflect who actually made the entry. If entries attributed to one person are actually written by another, this could indicate falsification of records. Investigate immediately: speak with the team members, review delegation logs, and determine whether there is an innocent explanation (e.g., a supervisor completing forms on behalf of a trained delegate). If deliberate falsification is suspected, escalate to the QI/PI and the institution\u2019s research integrity office.',
    ref:'<a href="/kb/data-integrity">Data Integrity</a> \u00b7 <a href="/sops/cr-014">SOP-CR-014</a>' },


  /* ══════════════════════════════════════════════════════════════
     TOPIC: Monitoring, Audits and Inspections
     Source: SOP-CR-013_08, SOP-CR-017_08, ICH E6(R3)
     applies: interventional
  ══════════════════════════════════════════════════════════════ */

  { id:'mon-c1', type:'check', topic:'Monitoring and Audits', topicId:'monitoring', applies:'interventional',
    q:'What is the key difference between a monitoring visit and a regulatory inspection?',
    opts:['Monitoring is done by the REB; inspections are done by Health Canada','Monitoring is conducted by or on behalf of the sponsor; regulatory inspections are conducted by Health Canada or another regulatory authority','Monitoring focuses on data; inspections focus only on participant safety','There is no meaningful difference \u2014 both review the same things'],
    correct:1,
    rationale:'Per SOP-CR-017, monitoring is conducted by or on behalf of the sponsor to verify that the trial is conducted and data are recorded per the protocol, GCP, and applicable regulations. Regulatory inspections are conducted by Health Canada (or another authority like FDA or EMA) and have regulatory authority behind them \u2014 including the power to impose penalties for non-compliance. Audits may be conducted by the sponsor or an independent third party. Both monitor and inspector are entitled to direct access to source data.',
    ref:'<a href="/sops/cr-017">SOP-CR-017</a> \u00b7 <a href="/sops/cr-013">SOP-CR-013</a>' },

  { id:'mon-c2', type:'check', topic:'Monitoring and Audits', topicId:'monitoring', applies:'interventional',
    q:'What is the potential penalty for obstructing a Health Canada inspector during a clinical trial inspection?',
    opts:['A warning letter only','Loss of REB approval for the study','Fines from $500 to $5,000,000 and/or imprisonment of 3 months to 2 years','The study is automatically terminated'],
    correct:2,
    rationale:'Per SOP-CR-017 and Health Canada POL-0030, obstruction of inspectors is not tolerated. Preventing an inspector from conducting their inspection, or knowingly providing false or misleading information, is a violation of the Food and Drug Act. If convicted, a person may be liable for fines ranging from $500 to $5,000,000 and/or imprisonment of 3 months to 2 years.',
    ref:'<a href="/sops/cr-017">SOP-CR-017 \u00a73.0</a>' },

  { id:'mon-s1', type:'check', topic:'Monitoring and Audits', topicId:'monitoring', applies:'interventional',
    q:'Health Canada inspectors arrive unannounced at your site for a for-cause inspection. The QI/PI is not present and unreachable. What do you do?',
    opts:['Ask the inspectors to return when the PI is available \u2014 only the PI can authorize access to study documents','Cooperate fully, provide access to requested documents, attempt to reach the PI and compliance office, and document everything','Provide access only to documents you personally created and defer all other requests until the PI arrives','Call the sponsor first to get their legal team\'s guidance before providing any documents'],
    ans:1,
    rationale:'Welcome the inspectors and cooperate fully \u2014 obstruction is a serious regulatory offence regardless of whether the PI is present. Immediately attempt to reach the QI/PI and your institution\u2019s research compliance office or a senior study team member. Provide the inspectors with access to the study documents they are entitled to review under HC authority. Do not delay, restrict, or selectively present records. Document the arrival time, inspectors\u2019 names, and all requests made. When the PI is reached, brief them immediately. Per SOP-CR-017, the site should have a plan for unannounced inspections in advance.',
    ref:'<a href="/sops/cr-017">SOP-CR-017</a>' },


  /* ══════════════════════════════════════════════════════════════
     TOPIC: ISO 14155 — Medical Device Trials
     Source: ISO 14155:2020, SOP-CR-024
     applies: interventional
  ══════════════════════════════════════════════════════════════ */

  { id:'iso-c1', type:'check', topic:'ISO 14155 (Medical Devices)', topicId:'iso14155', applies:'interventional',
    q:'Under ISO 14155:2020, what must happen before the first participant is enrolled in a clinical investigation of a medical device?',
    opts:['The sponsor must obtain a No Objection Letter from Health Canada','The clinical investigation must be registered in a publicly accessible database','The principal investigator must complete a device-specific training course','The sponsor must conduct a pilot study with healthy volunteers'],
    correct:1,
    rationale:'ISO 14155:2020 added a requirement \u2014 not present in the 2011 version \u2014 that clinical investigations be registered in a publicly accessible database (e.g., ClinicalTrials.gov) before the first participant is enrolled. This aligns with transparency obligations under Health Canada, ICH E6(R3), and international norms. For device trials in Canada, an Investigational Testing Authorization (ITA) must also be obtained from Health Canada.',
    ref:'<a href="/sops/cr-024">SOP-CR-024</a> \u00b7 ISO 14155:2020' },

  { id:'iso-c2', type:'check', topic:'ISO 14155 (Medical Devices)', topicId:'iso14155', applies:'interventional',
    q:'ISO 14155:2020 applies to which types of medical devices?',
    opts:['All medical devices including Class I (lowest risk)','Higher-risk devices (Class II, III, IV) requiring an Investigational Testing Authorization; Class I does not require ITA','Only implantable devices','Only devices that use software or algorithms'],
    correct:1,
    rationale:'ISO 14155:2020 applies to clinical investigations of medical devices for regulatory purposes. In Canada, Class I medical devices do not require an Investigational Testing Authorization (ITA) from Health Canada, while Class II, III, and IV devices do. ISO 14155 does not apply to in vitro diagnostic (IVD) devices. The standard is used for pre- and post-market investigations.',
    ref:'<a href="/sops/cr-024">SOP-CR-024</a> \u00b7 ISO 14155:2020' },

  { id:'iso-s1', type:'check', topic:'ISO 14155 (Medical Devices)', topicId:'iso14155', applies:'interventional',
    q:'You are coordinating a device trial. The sponsor instructs you to use the same SAE reporting procedures as you would for a drug trial. A team member raises a concern: should you be using a different form for device-related incidents? Who is right?',
    opts:['The sponsor is correct \u2014 SAE reporting is the same for drugs and devices under Health Canada regulations','The team member is right \u2014 device-related incidents may require the Mandatory Medical Device Problem Reporting form and follow ISO 14155 reporting requirements','Use whichever form the sponsor provides \u2014 the sponsor determines reporting procedures regardless of the regulatory framework','Report device incidents to the manufacturer only, not to Health Canada'],
    ans:1,
    rationale:'The team member is right to flag this. For medical device trials, adverse events that are related to the device may be classified as \u201cdevice deficiencies\u201d or \u201cserious adverse device effects\u201d (SADEs) rather than SAEs in the drug sense. Per SOP-CR-012 section 5.9.2, device-related incidents should be reported using the Mandatory Medical Device Problem Reporting form available on the Health Canada website, not the standard drug SAE form. ISO 14155 and SOP-CR-024 govern device incident reporting. Clarify with the sponsor and ensure the protocol specifies the correct forms.',
    ref:'<a href="/sops/cr-012">SOP-CR-012 \u00a75.9.2</a> \u00b7 <a href="/sops/cr-024">SOP-CR-024</a> \u00b7 ISO 14155:2020' },


  /* ══════════════════════════════════════════════════════════════
     TOPIC: Recruitment and Screening
     Source: SOP-CR-009_08, TCPS2, ICH E6(R3)
     applies: all
  ══════════════════════════════════════════════════════════════ */

  { id:'rec-c1', type:'check', topic:'Recruitment and Screening', topicId:'recruitment', applies:'all',
    q:'Who must approve recruitment materials (advertisements, social media posts) before they are used?',
    opts:['The sponsor only','The QI/PI only','Both the REB and MUHC Communications (for public/patient-facing materials)','Health Canada and the REB'],
    correct:2,
    rationale:'Per SOP-CR-009 section 5.1.7\u20135.1.8, all recruitment materials must be submitted to and approved by the REB via Nagano before use. Public-facing and patient-facing advertisements must also be approved by MUHC Communications prior to use. This dual approval requirement is specific to the MUHC context and is in addition to GCP requirements for REB review of all recruitment tools.',
    ref:'<a href="/sops/cr-009">SOP-CR-009 \u00a75.1.7\u20135.1.8</a>' },

  { id:'rec-c2', type:'check', topic:'Recruitment and Screening', topicId:'recruitment', applies:'all',
    q:'A participant meets all inclusion criteria but the CRC is unsure about one exclusion criterion. The PI is unavailable. What should the CRC do?',
    opts:['Enrol the participant and document the uncertainty','Do not enrol the participant until the PI has reviewed the eligibility question and made a documented decision','Ask another CRC for their opinion and enrol if they agree','Contact the sponsor for guidance and enrol if they approve'],
    correct:1,
    rationale:'Per SOP-CR-009, only participants who meet all inclusion criteria and none of the exclusion criteria of the most recently REB-approved protocol may be enrolled. Eligibility determination is a medical/clinical judgment that must be made by the QI/PI or a qualified delegate. If there is any uncertainty about eligibility, do not enrol. Document the question and wait for the PI\u2019s documented assessment. Screen failures should be documented on the Screening Log with the reason.',
    ref:'<a href="/sops/cr-009">SOP-CR-009 \u00a73.0</a>' },

  { id:'rec-s1', type:'check', topic:'Recruitment and Screening', topicId:'recruitment', applies:'all',
    q:'A physician colleague asks you to send her a list of your study participants\u2019 names so she can check if any of them are also her patients. She says she needs this for \u201ccontinuity of care.\u201d What do you do?',
    opts:['Share the list \u2014 continuity of care is a legitimate clinical reason that overrides research confidentiality','Share only the participant study numbers without names so the colleague can cross-reference in her own records','Do not share \u2014 participant identity is confidential; direct the colleague to ask her patients directly or check the medical record if study participation is documented there','Share the list but ask the colleague to sign a confidentiality form first'],
    ans:2,
    rationale:'You cannot share participant nominative information with anyone outside the study team without specific informed consent from participants and/or REB approval. The Participant ID Log \u2014 the only log that links participant names to study numbers \u2014 is never shared with the sponsor and should not be shared with other physicians without explicit authorization. If the colleague needs to know whether a specific patient is in a study for safety reasons, the appropriate route is through the participant themselves, or through Medical Records if the participant\u2019s study participation is documented in OACIS (as required by SOP-CR-008 for IP studies). Document this request and your response.',
    ref:'<a href="/sops/cr-014">SOP-CR-014 \u00a75.3</a> \u00b7 <a href="/sops/cr-009">SOP-CR-009</a>' },


  /* ══════════════════════════════════════════════════════════════
     TOPIC: Protocol Deviations
     Source: SOP-CR-026_01 \u00a75.2.3, 5.3.3 \u00b7 SOP-CR-014_08
     applies: all
  ══════════════════════════════════════════════════════════════ */

  { id:'dev-c1', type:'check', topic:'Protocol Deviations', topicId:'deviations', applies:'all',
    q:'How are protocol deviations categorized under SOP-CR-026?',
    opts:['Reportable and non-reportable','Minor, Major, and Critical','Intentional and unintentional','Protocol, GCP, and administrative'],
    correct:1,
    rationale:'SOP-CR-026 section 5.3.3 defines three categories. Minor: a deficiency or deviation not meeting major/critical criteria. Major: a marked deviation that may result in undue health risks to participants or could invalidate data. Critical: a situation resulting in fatal, life-threatening, or unsafe conditions, or presenting immediate/latent undue risk to participant rights, health, and safety. Falsification of records is also a critical deviation.',
    ref:'<a href="/sops/cr-026">SOP-CR-026 \u00a75.3.3</a>' },

  { id:'dev-c2', type:'check', topic:'Protocol Deviations', topicId:'deviations', applies:'all',
    q:'When must a major or critical protocol deviation be reported to the REB?',
    opts:['At the next annual Continuing Review','Within 30 days of becoming aware','Within 7 days if life-threatening, or 15 days in all other cases','Within 24 hours, same as an SAE'],
    correct:2,
    rationale:'Per SOP-CR-026 section 5.3.3, major and critical deviations must be reported to the REB within 7 days if life-threatening, or within 15 days of becoming aware of the event. A CAPA form must accompany the report. The CAPA should also be sent to the RI-MUHC Quality Assurance department. Minor deviations may be collected and submitted at the time of annual Continuing Review.',
    ref:'<a href="/sops/cr-026">SOP-CR-026 \u00a75.3.3</a>' },

  { id:'dev-c3', type:'check', topic:'Protocol Deviations', topicId:'deviations', applies:'all',
    q:'What is the key difference between a protocol deviation and a protocol amendment?',
    opts:['Amendments require REB approval; deviations do not','Deviations apply to a single occurrence or participant and are not intended to modify the protocol systematically; amendments are intentional and systematic changes','Deviations are always unintentional; amendments are always intentional','There is no meaningful difference \u2014 both require the same process'],
    correct:1,
    rationale:'Per SOP-CR-026 section 5.3.3, a protocol deviation is an unplanned or unforeseen excursion from the approved protocol that applies to a single occurrence or participant and is not intended to modify the overall conduct of the protocol. An amendment is a deliberate, systematic change to the protocol that applies going forward. Intentional deviations should not be implemented without prior Sponsor agreement and REB approval, unless they eliminate an immediate hazard.',
    ref:'<a href="/sops/cr-026">SOP-CR-026 \u00a75.3.3</a>' },

  { id:'dev-c4', type:'check', topic:'Protocol Deviations', topicId:'deviations', applies:'all',
    q:'A participant is in immediate danger and the only way to protect them requires deviating from the protocol. The sponsor and REB are unreachable. Can you deviate?',
    opts:['No \u2014 you must always obtain approval before deviating','Yes \u2014 deviations to eliminate immediate hazard to participants may be implemented without prior approval, but the sponsor and REB must be notified as soon as possible afterward','Yes \u2014 any deviation is permitted if it is in the participant\u2019s best interest','Only if the QI/PI authorizes it in writing first'],
    correct:1,
    rationale:'SOP-CR-026 section 5.2.3 and ICH E6(R3) both permit deviation from the approved protocol without prior approval when necessary to eliminate an immediate hazard to participants. However, the sponsor and REB must be notified as soon as possible after the fact, and the deviation must be documented on the Protocol/GCP/SOP Deviation Log with full explanation and any CAPA implemented.',
    ref:'<a href="/sops/cr-026">SOP-CR-026 \u00a75.2.3</a> \u00b7 ICH E6(R3)' },

  { id:'dev-c5', type:'check', topic:'Protocol Deviations', topicId:'deviations', applies:'all',
    q:'Where must all protocol, GCP, and SOP deviations \u2014 whether intentional or not, and including those detected by a monitor \u2014 be documented?',
    opts:['In the participant\u2019s source documents only','In an email to the sponsor','On the Protocol/GCP/SOP Deviation Log, with CAPA documented for major and critical deviations','In the ISF cover letter at annual Continuing Review'],
    correct:2,
    rationale:'Per SOP-CR-026 section 5.3.3, all deviations observed by the site or detected by a monitor, auditor, or inspector must be documented on the Protocol/GCP/SOP Deviation Log. Major and critical deviations additionally require a completed CAPA form. The CAPA number must be cross-referenced on the Deviation Log. All major/critical deviations must also be reported to the RI-MUHC Quality Assurance department.',
    ref:'<a href="/sops/cr-026">SOP-CR-026 \u00a75.3.3</a>' },

  { id:'dev-s2', type:'check', topic:'Protocol Deviations', topicId:'deviations', applies:'all',
    q:'A monitor flags during a site visit that the same deviation \u2014 a missing eligibility confirmation step \u2014 has occurred in six consecutive participants. The site had been treating it as a minor deviation each time. Is this still minor?',
    opts:['It remains minor as long as each individual instance is minor \u2014 severity is assessed per occurrence','It should be reassessed as major \u2014 a pattern of repeated identical deviations indicates a systemic process failure requiring a CAPA and REB reporting','Combine all six into a single minor deviation entry to simplify documentation','Stop enrolling and close the study until the process is corrected'],
    ans:1,
    rationale:'No \u2014 a pattern of repeated deviations changes the severity assessment. SOP-CR-026 requires that deviations be assessed to identify trends. Six consecutive occurrences of the same eligibility gap is no longer an isolated minor deviation; it indicates a systemic process failure that may have enrolled participants who were not properly confirmed as eligible. This should be reassessed as major, reported to the REB promptly, and a CAPA must be developed and implemented. The fact that each instance was assessed individually as minor does not protect against a trend-level finding during an audit.',
    ref:'<a href="/sops/cr-026">SOP-CR-026 \u00a75.3.3</a> \u00b7 <a href="/kb/data-integrity">Data Integrity</a>' },

  { id:'dev-s3', type:'check', topic:'Protocol Deviations', topicId:'deviations', applies:'all',
    q:'The sponsor sends a written instruction allowing sites to skip a non-critical assessment at one visit for logistical reasons, saying sites can implement it immediately. Can you proceed without REB approval?',
    opts:['Yes \u2014 the sponsor\'s written approval is sufficient authorization to deviate from the protocol','Yes, but only if the assessment is documented as non-critical in the protocol','No \u2014 any deviation from the REB-approved protocol requires REB approval before implementation, regardless of sponsor authorization, unless it eliminates an immediate hazard','No \u2014 sponsor instructions can never modify a protocol; only a formal amendment can'],
    ans:2,
    rationale:'Not necessarily. Even if the sponsor permits it, any deviation from the REB-approved protocol that is not purely administrative \u2014 and skipping a protocol-specified assessment is likely not administrative \u2014 requires REB approval before implementation at the MUHC. SOP-CR-026 section 5.3.3 states that intentional deviations must not be implemented without prior Sponsor agreement and REB approval unless they eliminate an immediate hazard. Get the sponsor\u2019s written confirmation (file it in the ISF), then submit to the REB via Nagano and wait for approval before implementing. Document the sponsor instruction and your REB submission regardless.',
    ref:'<a href="/sops/cr-026">SOP-CR-026 \u00a75.2.3, 5.3.3</a>' },
  /* ── SAE: 3 additional checks (c8-c10) ── */
  { id:'sae-c8', type:'check', topic:'Adverse Events / SAE', topicId:'sae', applies:'interventional',
    q:'A delegated CRC completes the AE Assessment log entry. What two people must initial and date the log?',
    opts:['The CRC and the study coordinator','The CRC who completed the log and the QI/PI providing medical oversight','The QI/PI and the sponsor\u2019s monitor','The CRC and a witness'],
    correct:1,
    rationale:'Per SOP-CR-012 section 5.2.8, the delegated CRC who completed the AE Assessment log and the QI/PI providing medical oversight must both initial and date the log. The QI/PI\u2019s initials confirm their medical assessment of the event \u2014 this is not optional and cannot be delegated away entirely.',
    ref:'<a href="/sops/cr-012">SOP-CR-012 \u00a75.2.8</a>' },

  { id:'sae-c9', type:'check', topic:'Adverse Events / SAE', topicId:'sae', applies:'interventional',
    q:'An abnormal laboratory result is flagged by the lab. Within how many days should a delegated team member report it to the QI/PI for assessment?',
    opts:['Same day or within 5 days','Within 7 days','Within 15 days','Within 30 days'],
    correct:0,
    rationale:'Per SOP-CR-012 section 5.1.8, abnormal laboratory or test results should be reported to the QI/PI on the same day or at the latest 5 days afterwards for assessment. The QI/PI must then review the results and indicate any abnormalities as clinically significant (c.s.) or not clinically significant (n.c.s.), initialling and dating the results as soon as possible.',
    ref:'<a href="/sops/cr-012">SOP-CR-012 \u00a75.1.8</a>' },

  { id:'sae-c10', type:'check', topic:'Adverse Events / SAE', topicId:'sae', applies:'interventional',
    q:'For a study without investigational products (e.g., an observational device study), what does SOP-CR-012 recommend regarding AE/SAE collection?',
    opts:['No AE collection is required without an investigational product','Follow the same procedures for collecting and assessing AEs and SAEs, and report to the REB as applicable','Only report events directly caused by study procedures, not underlying disease','Only collect SAEs \u2014 non-serious AEs do not need to be recorded'],
    correct:1,
    rationale:'Per SOP-CR-012 section 5.9.1, even in studies without an investigational product, it is recommended that the sponsor-investigator and QI/PI follow the same procedures for collecting clinical data related to AEs and SAEs and reporting to the REB. The REB reporting criteria for non-IP studies requires the SAE to be at least possibly related to the study \u2014 not necessarily to a product.',
    ref:'<a href="/sops/cr-012">SOP-CR-012 \u00a75.9.1</a>' },

  /* ── CONSENT: 4 additional checks (ic-c7 to ic-c10) ── */
  { id:'ic-c7', type:'check', topic:'Informed Consent', topicId:'consent', applies:'all',
    q:'When a participant is unable to read, who must be present for the entire informed consent discussion?',
    opts:['A family member who can read to them','An impartial witness','The principal investigator','A second CRC'],
    correct:1,
    rationale:'Per SOP-CR-008 section 5.9.1, if a participant or LAR is unable to read, an impartial witness must be present during the entire informed consent discussion. The witness attests that the information was accurately explained to and understood by the participant or LAR, and that consent was freely given. The witness must sign the ICF alongside the participant.',
    ref:'<a href="/sops/cr-008">SOP-CR-008 \u00a75.9</a>' },

  { id:'ic-c8', type:'check', topic:'Informed Consent', topicId:'consent', applies:'interventional',
    q:'When a participant enrolled in a study with investigational product begins participation, what must be sent to MUHC Medical Records?',
    opts:['A copy of the delegation log only','A Confirmation of Participation form (FMU-9997) and a copy of the signed ICF, filed in the Alert section of OACIS','A summary of the protocol for their treating physician','Nothing \u2014 this is only required if the participant is hospitalized'],
    correct:1,
    rationale:'Per SOP-CR-008 section 5.3.1, when a participant begins a study with investigational product (drug, device, or NHP), the Confirmation of Participation form (FMU-9997) and a copy of the signed ICF must be sent to MUHC Medical Records to be filed in the Alert section of the participant\u2019s OACIS chart. This ensures any caregiver providing emergency or other care is aware of the participant\u2019s study involvement and can access the QI/PI contact information.',
    ref:'<a href="/sops/cr-008">SOP-CR-008 \u00a75.3.1</a>' },

  { id:'ic-c9', type:'check', topic:'Informed Consent', topicId:'consent', applies:'all',
    q:'A participant wants to take the ICF home overnight to review with their family before signing. What should you do?',
    opts:['Decline \u2014 the ICF must be signed at the site on the same day as the consent discussion','Allow it, and instruct the participant to return to the clinic for their dated signature in the presence of study staff','Allow it, and tell the participant they can sign and return it by mail','Allow it only if the REB has specifically approved a take-home consent process'],
    correct:1,
    rationale:'Per SOP-CR-008 section 5.1.14, participants must be permitted to take the ICF home to consult with a family member, care provider, or other trusted individual. If the participant takes the paper ICF home, instruct them to return to the clinic for their dated signature in the presence of study staff. The participant cannot simply mail back a signed form \u2014 the consent process requires documented in-person interaction.',
    ref:'<a href="/sops/cr-008">SOP-CR-008 \u00a75.1.14</a>' },

  { id:'ic-c10', type:'check', topic:'Informed Consent', topicId:'consent', applies:'all',
    q:'Under TCPS2, which of the following is required for a valid waiver of consent?',
    opts:['The research must be completely anonymous','The research must involve no more than minimal risk, consent must be impracticable, and participant welfare must not be adversely affected','The REB chair alone may approve the waiver without full board review','The research must be retrospective only'],
    correct:1,
    rationale:'TCPS2 Article 3.7A sets out the conditions for an REB to grant a waiver of consent: (1) no more than minimal risk to participants; (2) the waiver is unlikely to adversely affect participant welfare; (3) it is impossible or impracticable to conduct the research with prior consent; (4) where applicable, a debriefing plan is in place. All conditions must be satisfied. The REB documents that these conditions are met.',
    ref:'TCPS2 Ch. 3, Art. 3.7A \u00b7 <a href="/sops/cr-008">SOP-CR-008 \u00a75.4</a>' },
  { id:'ic-c11', type:'check', topic:'Informed Consent', topicId:'consent', applies:'all',
    q:'What is the difference between consent and assent in the context of research involving minors?',
    opts:['They are the same thing — the terms are used interchangeably','Consent is given by the legally authorized person (e.g., parent/tutor); assent is the minor’s own agreement to participate, obtained in addition to consent where the minor has sufficient capacity to understand','Assent replaces consent for minors aged 14 and older','Consent is for clinical procedures; assent is for research participation only'],
    correct:1,
    rationale:'Per SOP-CR-008 section 5.8.4 and TCPS2, consent is provided by the legally appointed representative (e.g., parent or tutor) when a participant lacks full legal capacity. Assent is the participant’s own agreement — obtained separately, to the extent compatible with their understanding. Both are required where the minor has sufficient capacity. A child’s maturity and psychological status are considered in determining capacity to provide assent.',
    ref:'<a href="/sops/cr-008">SOP-CR-008 §5.8.4</a> · TCPS2 Ch. 3' },

  /* ── DELEGATION: 7 additional checks (del-c4 to del-c10) ── */
  { id:'del-c4', type:'check', topic:'Roles and Delegation', topicId:'delegation', applies:'all',
    q:'Can a CRC assess the relatedness of an adverse event to the investigational product?',
    opts:['Yes \u2014 any trained team member may assess relatedness','Only if the CRC has a nursing background','Only if the CRC is explicitly delegated this task AND is clinically qualified to make that judgment','No \u2014 relatedness can only be assessed by the sponsor\u2019s medical monitor'],
    correct:2,
    rationale:'Per SOP-CR-012 and SOP-CR-002, relatedness assessment is a clinical judgment. A CRC may only perform it if (1) it is explicitly listed on their task delegation log and (2) they are clinically qualified to make that judgment. A CRC without clinical training cannot assess relatedness regardless of what is on the delegation log. Both conditions must be met.',
    ref:'<a href="/sops/cr-002">SOP-CR-002</a> \u00b7 <a href="/sops/cr-012">SOP-CR-012</a>' },

  { id:'del-c5', type:'check', topic:'Roles and Delegation', topicId:'delegation', applies:'all',
    q:'What is the Qualified Investigator (QI) responsible for under Division 5 that distinguishes them from a sub-investigator?',
    opts:['The QI writes all protocols; sub-investigators only conduct visits','There is only one QI per site, and they are responsible to the sponsor for the overall conduct of the clinical trial at that site','The QI handles all regulatory submissions; sub-investigators handle participant care only','The QI must be a physician; sub-investigators can be any qualified health professional'],
    correct:1,
    rationale:'Under Health Canada Division 5, there must be no more than one Qualified Investigator (QI) per clinical trial site. The QI is responsible to the sponsor for the overall conduct of the trial at the site, and must be entitled to provide health care under the laws of the province. Sub-investigators may assist but the QI holds ultimate site-level responsibility to Health Canada.',
    ref:'<a href="/sops/cr-002">SOP-CR-002</a> \u00b7 HC Div 5' },

  { id:'del-c6', type:'check', topic:'Roles and Delegation', topicId:'delegation', applies:'all',
    q:'A team member listed on the delegation log leaves the study. What must happen to the log?',
    opts:['The log does not need to be updated \u2014 it is a historical record','The person\u2019s entry must be closed out with an end date, and they should no longer perform delegated tasks','Their entry must be deleted to protect privacy','The entire log must be re-issued with a new version number'],
    correct:1,
    rationale:'The task delegation log is a living document that must reflect who is currently authorized to perform each task. When a team member leaves, their entry must be closed out with an end date. This is critical for audit purposes \u2014 an open-ended entry for someone who has left the study suggests they may still be performing tasks, which creates a GCP finding. The log cannot be altered retroactively; it is updated prospectively.',
    ref:'<a href="/sops/cr-002">SOP-CR-002</a>' },

  { id:'del-c7', type:'check', topic:'Roles and Delegation', topicId:'delegation', applies:'all',
    q:'Who is a Sponsor-Investigator?',
    opts:['A sponsor who has contracted an external investigator to run the trial','An individual who both initiates and conducts a clinical trial, assuming all responsibilities of both sponsor and qualified investigator','A co-investigator who also funds the study','A principal investigator at a multi-site coordinating centre'],
    correct:1,
    rationale:'A Sponsor-Investigator is an individual who both initiates and conducts the clinical trial \u2014 they assume the obligations of both the sponsor and the qualified investigator. This is common in academic investigator-initiated trials. The Sponsor-Investigator must fulfil all regulatory sponsor obligations under Division 5, including filing the CTA, monitoring the trial, and reporting adverse reactions to Health Canada.',
    ref:'<a href="/sops/cr-002">SOP-CR-002</a> \u00b7 HC Div 5' },

  { id:'del-c8', type:'check', topic:'Roles and Delegation', topicId:'delegation', applies:'all',
    q:'What does SOP-CR-003 require before a team member can be delegated study tasks?',
    opts:['A signed confidentiality agreement only','Documented evidence of appropriate GCP and SOP training at the required level for the study, prior to performing delegated tasks','Completion of the RI-MUHC onboarding programme only','Approval from the REB'],
    correct:1,
    rationale:'Per SOP-CR-003, all research team members must obtain the appropriate level of institutional training on GCP, Health Canada Division 5 (where applicable), and SOPs before performing delegated tasks. Training must be documented. The training level required depends on the study type (Level I through V). Delegation without documented training is a GCP finding.',
    ref:'<a href="/sops/cr-002">SOP-CR-002</a> \u00b7 <a href="/sops/cr-003">SOP-CR-003</a>' },

  { id:'del-c9', type:'check', topic:'Roles and Delegation', topicId:'delegation', applies:'all',
    q:'The PI delegates SAE reporting to a research nurse who is not a physician. A serious adverse event occurs. The nurse assesses it as "not related" and files the report. Is this acceptable?',
    opts:['Yes \u2014 if the nurse is on the delegation log for SAE reporting, any assessment is valid','No \u2014 relatedness assessment requires clinical medical qualification; a nurse cannot make this judgment unless they are also a clinically qualified physician or equivalent','Yes \u2014 any RN can assess relatedness','No \u2014 only the PI can ever assess relatedness, regardless of delegation'],
    correct:1,
    rationale:'Relatedness assessment is a clinical medical judgment. Simply being on the delegation log for SAE reporting is not sufficient \u2014 the person must also be clinically qualified to make that specific judgment. A research nurse without independent prescribing authority or equivalent clinical qualification cannot assess relatedness. The delegation log task must match the person\u2019s actual clinical qualifications.',
    ref:'<a href="/sops/cr-012">SOP-CR-012 \u00a75.1.3</a> \u00b7 <a href="/sops/cr-002">SOP-CR-002</a>' },

  { id:'del-c10', type:'check', topic:'Roles and Delegation', topicId:'delegation', applies:'all',
    q:'A study has two sites. Can the same physician be the QI at both sites simultaneously under Health Canada Division 5?',
    opts:['Yes \u2014 there is no restriction on how many sites a physician can be QI at','No \u2014 Division 5 requires no more than one QI per site, and a QI at one site cannot simultaneously be QI at another site for the same study','Yes, but only if the sites are within the same institution','No \u2014 a physician can only be QI for one study at a time'],
    correct:1,
    rationale:'Under Health Canada Division 5, there must be no more than one Qualified Investigator per site \u2014 and a single individual cannot simultaneously serve as QI at two different sites for the same trial. Each site requires its own designated QI who is responsible to the sponsor for conduct at that specific site.',
    ref:'HC Div 5 C.05.001 \u00b7 <a href="/sops/cr-002">SOP-CR-002</a>' },
  { id:'del-c11', type:'check', topic:'Roles and Delegation', topicId:'delegation', applies:'all',
    q:'Where must training completed by study team members be documented?',
    opts:['In each team member’s personal employment file only','On a study-specific Training Log filed in the Investigator Site File (ISF)','In the REB submission only','Verbally confirmed by the PI is sufficient'],
    correct:1,
    rationale:'Per SOP-CR-002 and SOP-CR-003, all study-specific training must be documented on a Training Log filed in the ISF. This log records who was trained, what they were trained on, when, and by whom. It is one of the first documents created when setting up a study and is reviewed during monitoring visits and inspections. Training documented only in an HR file is not accessible to monitors or inspectors at the study level.',
    ref:'<a href="/sops/cr-002">SOP-CR-002</a> · <a href="/sops/cr-003">SOP-CR-003</a>' },

  /* ── RECRUITMENT: 8 additional checks (rec-c3 to rec-c10) ── */
  { id:'rec-c3', type:'check', topic:'Recruitment and Screening', topicId:'recruitment', applies:'all',
    q:'What is the purpose of the Participant Identification Log?',
    opts:['To track which participants have completed all study visits','To allow rapid identification of all participants in the event follow-up is necessary \u2014 it is confidential and must never be provided to the sponsor','To document the consent process for each participant','To record screening failures and their reasons'],
    correct:1,
    rationale:'Per SOP-CR-009 section 5.5.1, the Participant Identification Log allows rapid identification of all participants (and their legally appointed representatives, if applicable) in the event follow-up is necessary. This document is confidential. Under no circumstances can it be provided to the sponsor \u2014 it links nominative participant information to study numbers.',
    ref:'<a href="/sops/cr-009">SOP-CR-009 \u00a75.5.1</a>' },

  { id:'rec-c4', type:'check', topic:'Recruitment and Screening', topicId:'recruitment', applies:'all',
    q:'What must be documented in the Participant Screening Log for every participant who does not enrol?',
    opts:['Nothing \u2014 only enrolled participants need to be logged','Their initials, screening number, ICF date, and reason for screen failure (if known)','Their full name and medical record number','Only the screening number and date'],
    correct:1,
    rationale:'Per SOP-CR-009 section 5.6.3, all participants to be screened must be documented using sequential screening numbers in chronological order, with the date the ICF was signed recorded at the time of screening. Reasons for screen failure (if known) must also be documented on the Screening Log. This provides a complete picture of the recruitment funnel and is reviewed during monitoring visits.',
    ref:'<a href="/sops/cr-009">SOP-CR-009 \u00a75.6.3</a>' },

  { id:'rec-c5', type:'check', topic:'Recruitment and Screening', topicId:'recruitment', applies:'all',
    q:'A participant was screened using an older version of the ICF before the REB approved an updated version. Can they be enrolled under the old ICF?',
    opts:['Yes \u2014 screening occurred before the update, so the original ICF is valid','No \u2014 they must be re-consented using the most recently REB-approved ICF before enrolment can proceed','Yes, as long as the changes in the updated ICF are minor','Only if the sponsor approves the enrolment'],
    correct:1,
    rationale:'Per SOP-CR-009 and SOP-CR-008, only participants who meet the inclusion/exclusion criteria of the most recently REB-approved protocol may be enrolled. Similarly, consent must be obtained using the most recently REB-approved ICF. If a participant was screened with an old ICF and the REB has since approved a new version, re-consent must be obtained before enrolment.',
    ref:'<a href="/sops/cr-009">SOP-CR-009</a> \u00b7 <a href="/sops/cr-008">SOP-CR-008 \u00a75.7.4</a>' },

  { id:'rec-c6', type:'check', topic:'Recruitment and Screening', topicId:'recruitment', applies:'all',
    q:'All participants recruited in an MUHC research study must have what?',
    opts:['A family physician affiliated with the MUHC','An MUHC hospital card','Canadian provincial health insurance','A current OACIS chart with at least one prior visit'],
    correct:1,
    rationale:'Per SOP-CR-009 section 5.4.3, all participants recruited in an MUHC research study must have an MUHC hospital card. This is an institutional requirement that facilitates access to their medical records and ensures proper identification within the MUHC system.',
    ref:'<a href="/sops/cr-009">SOP-CR-009 \u00a75.4.3</a>' },

  { id:'rec-c7', type:'check', topic:'Recruitment and Screening', topicId:'recruitment', applies:'all',
    q:'MUHC Communications approval of recruitment materials is obtained at what stage of the approval process?',
    opts:['Before REB submission \u2014 Communications must approve first','Simultaneously with REB submission','After REB approval \u2014 the REB-approved material is then submitted to Communications','Communications approval is optional, not required'],
    correct:2,
    rationale:'Per SOP-CR-009 sections 5.2.2 and 5.3.1, the process is sequential: submit recruitment materials to the REB via Nagano first, obtain REB approval, then submit the REB-approved material to MUHC Communications for their approval. Communications typically responds within 3 days. Both approvals must be obtained and documented in the ISF before the materials are used.',
    ref:'<a href="/sops/cr-009">SOP-CR-009 \u00a75.2.2, 5.3.1</a>' },

  { id:'rec-c8', type:'check', topic:'Recruitment and Screening', topicId:'recruitment', applies:'all',
    q:'If a participant from outside the MUHC patient population is referred to your study, what must you obtain?',
    opts:['Nothing additional \u2014 their consent is sufficient','Certified copies of source documents relevant to the study from the external institution, filed in a timely fashion','An MUHC medical record transfer request approved by the DPS','A separate REB approval for external participant recruitment'],
    correct:1,
    rationale:'Per SOP-CR-009 section 5.4.2, if a participant is referred from outside the MUHC patient population (including the JGH), certified copies of the source documents relevant to the study must be requested and obtained from the external institution and filed in a timely fashion. The request and receipt must be documented, as there can be significant delays.',
    ref:'<a href="/sops/cr-009">SOP-CR-009 \u00a75.4.2</a>' },

  { id:'rec-c9', type:'check', topic:'Recruitment and Screening', topicId:'recruitment', applies:'all',
    q:'What are the three GCP-required participant logs under SOP-CR-009?',
    opts:['Screening Log, Enrolment Log, AE Log','Screening Log, Enrolment Log, Participant Identification Log','ICF Tracking Log, Enrolment Log, Participant Identification Log','Screening Log, Delegation Log, Participant Identification Log'],
    correct:1,
    rationale:'Per SOP-CR-009 section 5.5.1 (referencing ICH GCP E6 and ISO 14155 Annex E), the three GCP-required participant logs are: (1) Participant Screening Log \u2014 identifies screened participants and screen failures; (2) Participant Enrolment Log \u2014 lists enrolled participants and tracks visit dates; (3) Participant Identification Log \u2014 confidential, links nominative information to study numbers for emergency follow-up.',
    ref:'<a href="/sops/cr-009">SOP-CR-009 \u00a75.5.1</a>' },

  { id:'rec-c10', type:'check', topic:'Recruitment and Screening', topicId:'recruitment', applies:'interventional',
    q:'Under SOP-CR-009, what bilingual requirement applies to MUHC recruitment advertisements?',
    opts:['English only is acceptable if the target population is primarily anglophone','Advertisements must be in both French and English','French is required for all patient-facing materials; English is optional','Bilingualism is recommended but not required'],
    correct:1,
    rationale:'Per SOP-CR-009 section 5.1.8, all recruitment advertisements must ensure bilingualism \u2014 both French and English are required. This reflects Quebec language law and the MUHC\u2019s bilingual institutional mandate. Materials must also include correct use of the RI-MUHC or MUHC logo, the full name and title of the QI/PI, and the CRC\u2019s name with an institutional (not personal) phone number.',
    ref:'<a href="/sops/cr-009">SOP-CR-009 \u00a75.1.8</a>' },
  { id:'rec-c11', type:'check', topic:'Recruitment and Screening', topicId:'recruitment', applies:'all',
    q:'A participant meets inclusion criteria but their screening number was not assigned sequentially — a number was skipped. Is this a problem?',
    opts:['No — numbering sequence is administrative and has no GCP significance','Yes — per SOP-CR-009, participants must be documented using sequential screening numbers in chronological order; a skipped number requires explanation in the ISF','Only if the skipped number was already used for another participant','Only if the sponsor requires strict sequential numbering in the protocol'],
    correct:1,
    rationale:'Per SOP-CR-009 section 5.6.3, participants must be documented using sequential screening numbers in chronological order. A skipped number is a GCP finding because it raises questions about whether a participant was screened and not recorded. The gap must be explained with a Note-to-File in the ISF documenting why the number was not used.',
    ref:'<a href="/sops/cr-009">SOP-CR-009 §5.6.3</a>' },

  /* ── DATA INTEGRITY: 7 additional checks (data-c4 to data-c10) ── */
  { id:'data-c4', type:'check', topic:'Data Integrity', topicId:'data', applies:'all',
    q:'What is source data?',
    opts:['Any data entered into the sponsor\u2019s electronic case report form (eCRF)','The original documents or data \u2014 including relevant metadata \u2014 or certified copies, in which the study data were first recorded','Data that has been reviewed and signed by the QI/PI','Any data in the participant\u2019s hospital chart'],
    correct:1,
    rationale:'Per SOP-CR-014 section 5.2.1 and ICH E6(R3), source data are defined as original documents or data (including relevant metadata), or certified copies of the original, in which study data are first recorded and retained at the site. Source data may be on paper or in a validated electronic system. Data transcribed into a CRF from source is secondary to the source \u2014 any discrepancy is resolved by reference to the source.',
    ref:'<a href="/sops/cr-014">SOP-CR-014 \u00a75.2.1</a>' },

  { id:'data-c5', type:'check', topic:'Data Integrity', topicId:'data', applies:'all',
    q:'What is the Participant Identification Log, and who can it be shared with?',
    opts:['A log of all study procedures per participant, shared with the sponsor for monitoring','The only log containing nominative participant information, linking names to study numbers; it must never be shared with the sponsor','A log of participant demographics shared with the REB at annual review','A screening log tracking eligibility determinations, shared with the sponsor\u2019s monitor'],
    correct:1,
    rationale:'Per SOP-CR-014 section 5.2.7, the Participant ID Log (identification code list) is the only log that contains confidential nominative participant information linking names to study numbers. It must never be shared with the sponsor \u2014 the sponsor\u2019s monitor signs a confidentiality agreement and may view de-identified source data, but the ID log remains at the site.',
    ref:'<a href="/sops/cr-014">SOP-CR-014 \u00a75.2.7</a> \u00b7 <a href="/sops/cr-009">SOP-CR-009</a>' },

  { id:'data-c6', type:'check', topic:'Data Integrity', topicId:'data', applies:'all',
    q:'A source document on thermal paper (e.g., an ECG strip) is filed in the study record. What additional step is required?',
    opts:['Scan it into the eCRF system immediately','Photocopy it promptly and have both the thermal copy and the photocopy initialled and dated by the QI/PI','Laminate it to preserve the print','File it as-is \u2014 thermal paper is acceptable indefinitely'],
    correct:1,
    rationale:'Per SOP-CR-014 section 5.4.5, test results on thermal paper (e.g., ECGs) must be photocopied promptly. Both the thermal copy and the photocopy must be initialled and dated by the QI/PI. Thermal paper degrades over time and will become unreadable before the 15-year retention period ends \u2014 the photocopy ensures the data remains legible and attributable.',
    ref:'<a href="/sops/cr-014">SOP-CR-014 \u00a75.4.5</a>' },

  { id:'data-c7', type:'check', topic:'Data Integrity', topicId:'data', applies:'all',
    q:'What ink colour must be used for entries in paper source documents under GCP?',
    opts:['Any colour as long as it is permanent','Permanent black or blue ink; entries must remain legible for up to 15 years','Black ink only','Blue ink only, to distinguish from printed text'],
    correct:1,
    rationale:'Per SOP-CR-014 section 5.6.1, entries in paper source documents must use permanent black or blue ink. The key requirement is that entries remain legible for up to 15 years \u2014 pencil, erasable pens, or fading ink are not acceptable. The choice between black and blue is not mandated, but both must be permanent.',
    ref:'<a href="/sops/cr-014">SOP-CR-014 \u00a75.6.1</a>' },

  { id:'data-c8', type:'check', topic:'Data Integrity', topicId:'data', applies:'all',
    q:'What must a site do if an entire source document is missing?',
    opts:['Recreate it from memory and document the recreation date','Write a Note-to-File explaining the missing document, with initials and date','Leave a blank space in the ISF and note it in the deviation log','Contact the sponsor to confirm whether the data is required'],
    correct:1,
    rationale:'Per SOP-CR-014 section 5.6.1, if an entire paper record is missing, a Note-to-File (NTF) must be written to explain. The NTF must document what is missing, why it is missing (if known), and any steps taken. Simply leaving a gap in the ISF is not acceptable \u2014 the absence must be explained and attributed.',
    ref:'<a href="/sops/cr-014">SOP-CR-014 \u00a75.6.1</a>' },

  { id:'data-c9', type:'check', topic:'Data Integrity', topicId:'data', applies:'interventional',
    q:'Electronic records used in clinical trials at MUHC must comply with which standard?',
    opts:['ISO 27001 (information security)','21 CFR Part 11 (electronic records and signatures)','PIPEDA only','GDPR for European data'],
    correct:1,
    rationale:'Per SOP-CR-014 section 5.1.5 and HC GUI-0100 (which references FDA 21 CFR Part 11), electronic data systems used in Health Canada-regulated studies must be validated and compliant with 21 CFR Part 11. This standard requires audit trails, controlled access, electronic signature requirements, and data security measures. Systems that are not 21 CFR Part 11 compliant require data to be captured on paper instead.',
    ref:'<a href="/sops/cr-014">SOP-CR-014 \u00a75.1.5</a> \u00b7 HC GUI-0100' },

  { id:'data-c10', type:'check', topic:'Data Integrity', topicId:'data', applies:'all',
    q:'A CRF query from the sponsor asks you to explain an inconsistency between the source document and what was transcribed into the eCRF. What is the correct process?',
    opts:['Change the source document to match the CRF','Change the CRF to match the source document, document the correction with a single line through the original entry, initial, date, and explain','Delete the incorrect CRF entry and re-enter the correct value','Ask the sponsor to accept the source document as primary and close the query without correction'],
    correct:1,
    rationale:'Per SOP-CR-014 section 5.6.2, corrections must preserve the original entry. The correct approach for CRF corrections is: draw a single line through the incorrect entry (original must remain legible), enter the correct value, initial, date, and explain. Source documents take precedence \u2014 the CRF must be corrected to match the source, never the other way around. All corrections must be audit-trailed.',
    ref:'<a href="/sops/cr-014">SOP-CR-014 \u00a75.6.2</a>' },
  { id:'data-c11', type:'check', topic:'Data Integrity', topicId:'data', applies:'all',
    q:'What is a certified copy of a source document, and when is it acceptable to use one?',
    opts:['A notarized copy of any document used in a legal proceeding','A copy verified to be an exact duplicate of the original, confirmed by a dated signature — acceptable when original documents cannot be removed from their source (e.g., hospital records) or are needed at multiple locations','A photocopy that has been reviewed by the QI/PI','Any scanned document filed electronically in the eCRF system'],
    correct:1,
    rationale:'Per SOP-CR-014 and ICH E6(R3), a certified copy is a copy that has been verified to be a complete and accurate reproduction of the original, confirmed by a signed and dated attestation. Certified copies are used when originals cannot leave their source location — for example, when OACIS records are printed and de-identified for filing in the ISF. The certification must be documented; an uncertified photocopy does not carry the same evidentiary weight.',
    ref:'<a href="/sops/cr-014">SOP-CR-014</a> · ICH E6(R3)' },

  /* ── MONITORING & AUDITS: 8 additional checks (mon-c3 to mon-c10) ── */
  { id:'mon-c3', type:'check', topic:'Monitoring and Audits', topicId:'monitoring', applies:'interventional',
    q:'What are the three types of clinical research monitoring described in SOP-CR-013?',
    opts:['Initial, interim, and close-out monitoring','On-site, remote, and centralized monitoring','Sponsor monitoring, REB monitoring, and Health Canada inspection','Source data verification, data review, and protocol review'],
    correct:1,
    rationale:'Per SOP-CR-013, there are three types of monitoring: (1) On-site monitoring \u2014 evaluation at the site; allows verification of actual participants and original source documents, assessment of processes not visible remotely. (2) Remote monitoring \u2014 off-site evaluation using de-identified redacted data shared electronically. (3) Centralized monitoring \u2014 remote review of accumulating data by qualified personnel, including statistical analyses to identify trends, outliers, and potential data integrity issues.',
    ref:'<a href="/sops/cr-013">SOP-CR-013</a>' },

  { id:'mon-c4', type:'check', topic:'Monitoring and Audits', topicId:'monitoring', applies:'interventional',
    q:'Who is responsible for monitoring the trial in a sponsor-investigator-initiated study?',
    opts:['The sponsor-investigator \u2014 they must ensure adequate site monitoring is conducted','The REB','Health Canada directly','The CRO automatically, since the sponsor-investigator cannot self-monitor'],
    correct:0,
    rationale:'Per SOP-CR-013 and HC Division 5, monitoring is the sponsor\u2019s responsibility. In a sponsor-investigator-initiated study, the sponsor-investigator must implement a system to manage quality throughout all stages of the study, including ensuring adequate monitoring. They may delegate monitoring activities to a CRO or ARO, but they remain responsible for oversight of any subcontracted functions.',
    ref:'<a href="/sops/cr-013">SOP-CR-013</a> \u00b7 HC Div 5' },

  { id:'mon-c5', type:'check', topic:'Monitoring and Audits', topicId:'monitoring', applies:'interventional',
    q:'What must a site do to ensure data shared during remote monitoring maintains participant confidentiality?',
    opts:['Share data via standard email with password protection only','Redact nominative information (replace with participant study code) before sharing; data must be uploaded to a secure, validated, password-protected database or email','Obtain participant consent before sharing any data remotely','Only share aggregate data, never individual participant records'],
    correct:1,
    rationale:'Per SOP-CR-013, data shared from the site for remote monitoring must be redacted \u2014 nominative information replaced with the participant study code \u2014 and uploaded electronically into a secure, password-protected, validated database or email. This protects participant confidentiality and Sponsor/Sponsor-Investigator proprietary information.',
    ref:'<a href="/sops/cr-013">SOP-CR-013</a> \u00b7 <a href="/sops/cr-014">SOP-CR-014</a>' },

  { id:'mon-c6', type:'check', topic:'Monitoring and Audits', topicId:'monitoring', applies:'interventional',
    q:'What is the purpose of a Site Initiation Visit (SIV)?',
    opts:['To conduct the first monitoring visit and verify source documents','To train the site team on the protocol and study procedures before the first participant is enrolled','To assess site feasibility before the study is approved','To close out the study and verify final data'],
    correct:1,
    rationale:'Per SOP-CR-013, the Site Initiation Visit (SIV) is conducted before the first participant is enrolled to train the site team on the protocol, study procedures, GCP requirements, and sponsor expectations. It is distinct from the monitoring visit. Training documentation from the SIV must be filed in the ISF.',
    ref:'<a href="/sops/cr-013">SOP-CR-013 \u00a710.2</a>' },

  { id:'mon-c7', type:'check', topic:'Monitoring and Audits', topicId:'monitoring', applies:'interventional',
    q:'What happens after a monitoring visit? What must the monitor produce?',
    opts:['Nothing \u2014 verbal feedback during the visit is sufficient','A written monitoring visit report documenting findings, and the site must respond to any open findings in a monitoring letter','A formal audit report submitted to Health Canada','A deviation log update filed in the ISF only'],
    correct:1,
    rationale:'Per SOP-CR-013 section 9.5, after a site monitoring visit the monitor must produce a written Site Visit Report. Any findings or action items are communicated to the site in a Monitoring Letter (ML). The site must review the ML and provide a written Site Response addressing each finding and documenting any corrective actions taken or planned.',
    ref:'<a href="/sops/cr-013">SOP-CR-013 \u00a79.5</a>' },

  { id:'mon-c8', type:'check', topic:'Monitoring and Audits', topicId:'monitoring', applies:'interventional',
    q:'During a Health Canada inspection, an inspector asks to see the Participant Identification Log. What do you do?',
    opts:['Provide it immediately \u2014 Health Canada has full access to all study documents','Provide access to source documents but explain that the Participant Identification Log is confidential and cannot be shared with the sponsor or external parties','Health Canada inspectors are entitled to direct access to source records including the Participant ID Log during a regulatory inspection','Consult with the PI and the institution\u2019s legal department before responding'],
    correct:2,
    rationale:'Health Canada inspectors have regulatory authority and are entitled to direct access to source records during an inspection under the Food and Drugs Act. This is distinct from sponsor access \u2014 the Participant Identification Log cannot be shared with the sponsor, but Health Canada inspectors are a different category. Obstruction of a Health Canada inspector is a regulatory offence under POL-0030. Cooperate fully and document the inspector\u2019s access.',
    ref:'<a href="/sops/cr-017">SOP-CR-017 \u00a73.0</a>' },

  { id:'mon-c9', type:'check', topic:'Monitoring and Audits', topicId:'monitoring', applies:'interventional',
    q:'What is the difference between an audit and an inspection?',
    opts:['There is no meaningful difference','An audit is a systematic independent examination by or on behalf of the sponsor/sponsor-investigator; an inspection is by a regulatory authority such as Health Canada','An audit reviews financial records; an inspection reviews clinical records','An audit is always announced in advance; an inspection is always unannounced'],
    correct:1,
    rationale:'Per SOP-CR-017, an audit is a systematic independent examination of trial-related activities and documents conducted by or on behalf of the sponsor to verify compliance. An inspection is conducted by a regulatory authority \u2014 in Canada, Health Canada \u2014 and carries the force of law. Both may be announced or unannounced, but inspections trigger formal regulatory consequences for findings of non-compliance.',
    ref:'<a href="/sops/cr-017">SOP-CR-017</a>' },

  { id:'mon-c10', type:'check', topic:'Monitoring and Audits', topicId:'monitoring', applies:'interventional',
    q:'The RI-MUHC Quality Assurance department may conduct what type of reviews?',
    opts:['Financial audits of research grants only','Process audits across MUHC/RI-MUHC sites, as well as study-specific requested or for-cause investigations or audits','Protocol feasibility reviews only','Annual training compliance reviews'],
    correct:1,
    rationale:'Per SOP-CR-017 section 1.0, the RI-MUHC Quality Assurance department conducts process audits across MUHC/RI-MUHC sites and may also conduct study-specific requested or for-cause investigations or audits. These are internal quality functions separate from sponsor monitoring or Health Canada inspections. Sites should be prepared for QA reviews at any time.',
    ref:'<a href="/sops/cr-017">SOP-CR-017 \u00a71.0</a>' },

  /* ── GCP PRINCIPLES: 6 additional checks (gcp-c5 to gcp-c10) ── */
  { id:'gcp-c5', type:'check', topic:'GCP Principles', topicId:'gcp', applies:'interventional',
    q:'Under ICH E6(R3), how many overarching principles are there, and what is their key characteristic?',
    opts:['5 principles, each specific to a phase of the trial','11 principles, designed to be flexible and applicable across trial types and settings','14 principles, directly mirroring the Declaration of Helsinki','8 principles, applicable only to interventional drug trials'],
    correct:1,
    rationale:'ICH E6(R3) articulates 11 overarching principles that provide a flexible framework for clinical trial conduct throughout the trial lifecycle. They are designed to be applicable across clinical trial types and settings and to remain relevant as technological and methodological advances occur. The principles are interdependent and should be considered in their totality.',
    ref:'<a href="/kb/governance/regulatory-framework">Regulatory Framework</a> \u00b7 ICH E6(R3)' },

  { id:'gcp-c6', type:'check', topic:'GCP Principles', topicId:'gcp', applies:'interventional',
    q:'What is the primary purpose of ICH GCP as stated in E6(R3)?',
    opts:['To standardize documentation requirements across jurisdictions','To provide a unified standard ensuring participant rights/safety/wellbeing are protected and clinical trial results are reliable','To define the roles of sponsors and investigators','To facilitate drug approval submissions to regulatory authorities'],
    correct:1,
    rationale:'ICH E6(R3) defines GCP as an international ethical, scientific, and quality standard for the conduct of trials that involve human participants. Its dual purpose is to assure (1) that the rights, safety, and well-being of trial participants are protected, and (2) that clinical trial results are reliable. Both goals are equally weighted \u2014 a trial that protects participants but generates unreliable data has also failed GCP.',
    ref:'ICH E6(R3) Introduction · <a href="/kb/governance/regulatory-framework">Regulatory Framework</a>' },

  { id:'gcp-c7', type:'check', topic:'GCP Principles', topicId:'gcp', applies:'interventional',
    q:'What is the structure of ICH E6(R3) compared to E6(R2)?',
    opts:['R3 is shorter and less detailed than R2','R3 has a new structure: overarching Principles plus Annexes that expand on the principles for specific trial types; R2 was a single integrated document','R3 focuses on drug trials only; R2 covered all trial types','R3 replaces the Declaration of Helsinki; R2 did not'],
    correct:1,
    rationale:'ICH E6(R3) introduced a new modular structure: overarching Principles that remain stable over time, plus Annexes that can be updated more rapidly as practice evolves. Annex 1 covers interventional trials (final, January 2025). Annex 2 (decentralized and real-world designs) is in development. This modularity is a deliberate departure from the integrated single-document structure of E6(R2).',
    ref:'ICH E6(R3) Introduction \u00b7 <a href="/kb/governance/regulatory-framework">Regulatory Framework</a>' },

  { id:'gcp-c8', type:'check', topic:'GCP Principles', topicId:'gcp', applies:'interventional',
    q:'What does ICH E6(R3) say about poorly conducted clinical trials?',
    opts:['They may still produce valid data if the endpoint is objective','They are unethical, waste resources, and may yield unreliable results that place participant safety at risk','They require additional monitoring but are otherwise acceptable','They are acceptable only in early-phase trials'],
    correct:1,
    rationale:'ICH E6(R3) is explicit: trials with inadequate design and/or poorly conducted trials may place participant safety at risk, yield inadequate or unreliable results, and are unethical. They waste resources and the efforts of investigators and participants. This framing makes quality not just a regulatory requirement but an ethical obligation.',
    ref:'ICH E6(R3) Principles Introduction · <a href="/kb/governance/regulatory-framework">Regulatory Framework</a>' },

  { id:'gcp-c9', type:'check', topic:'GCP Principles', topicId:'gcp', applies:'interventional',
    q:'Under ICH E6(R3), what is the sponsor\u2019s obligation when tasks are delegated to a Contract Research Organization (CRO)?',
    opts:['Once delegated, the CRO assumes full responsibility and the sponsor has no further obligations','The sponsor retains overall responsibility for the quality and integrity of the trial data; they must ensure oversight of all subcontracted functions','The sponsor\u2019s obligations are transferred to the CRO by written agreement','The sponsor is only responsible for tasks not delegated to the CRO'],
    correct:1,
    rationale:'ICH E6(R3) Principle 9 and Annex 1 are clear: when a sponsor delegates trial-related duties to a CRO, the sponsor retains overall responsibility for the quality and integrity of trial data. The sponsor must ensure oversight of all trial-related duties and functions carried out by the CRO, including those the CRO further subcontracts. Delegation reduces workload but does not transfer responsibility.',
    ref:'ICH E6(R3) Principle 9 (Reliable Results) \u00b7 <a href="/kb/governance/regulatory-framework">Regulatory Framework</a>' },

  { id:'gcp-c10', type:'check', topic:'GCP Principles', topicId:'gcp', applies:'interventional',
    q:'What does ICH E6(R3) require regarding the qualifications of individuals conducting a trial?',
    opts:['All team members must hold GCP certification from an accredited provider','Each individual involved in the conduct of the trial must be qualified by education, training, and experience to perform their respective tasks','Only the principal investigator requires documented qualifications','Qualifications are set by the sponsor; the guideline does not specify requirements'],
    correct:1,
    rationale:'ICH E6(R3) Principle 7 states that clinical trials should be designed and conducted by qualified individuals. Each person involved in trial conduct must be qualified by education, training, and experience to perform their tasks. This principle underpins the delegation framework in SOP-CR-002 and the training requirements in SOP-CR-003 \u2014 qualification must be documented before delegation.',
    ref:'ICH E6(R3) Principle 7 (Risk-Proportionate Processes) \u00b7 <a href="/sops/cr-002">SOP-CR-002</a>' },

  /* ── HEALTH CANADA DIV 5: 6 additional checks (hc-c5 to hc-c10) ── */
  { id:'hc-c5', type:'check', topic:'Health Canada Division 5', topicId:'div5', applies:'interventional',
    q:'A sponsor files a CTA with Health Canada. How long does Health Canada have to review it before the trial may proceed?',
    opts:['14 calendar days','30 calendar days \u2014 the trial may proceed if no objection is raised within this period','60 calendar days','There is no fixed review period; the sponsor must wait for a formal NOL'],
    correct:1,
    rationale:'Under Division 5 (C.05.006), Health Canada has 30 calendar days from receipt of the CTA to object. If no objection is raised within 30 days, the sponsor may proceed and a No Objection Letter (NOL) is issued. The NOL must be kept with the study\u2019s essential documents. If Health Canada needs more information during review, the sponsor has 2 calendar days to provide it.',
    ref:'HC Div 5 C.05.006 \u00b7 <a href="/kb/governance/regulatory-framework">Regulatory Framework</a>' },

  { id:'hc-c6', type:'check', topic:'Health Canada Division 5', topicId:'div5', applies:'interventional',
    q:'Under Division 5, within how many calendar days must a sponsor notify Health Canada of a change that does not require a CTA amendment?',
    opts:['2 calendar days','7 calendar days','15 calendar days','30 calendar days'],
    correct:2,
    rationale:'Under Division 5 (C.05.007), once a trial is authorized, certain changes \u2014 such as administrative information changes or protocol changes that do not alter participant risk \u2014 require written notification to Health Canada within 15 calendar days of the change. Changes that could affect drug quality or participant safety require a CTA amendment and must be authorized before implementation.',
    ref:'HC Div 5 C.05.007\u20138 \u00b7 HC GUI-0100' },

  { id:'hc-c7', type:'check', topic:'Health Canada Division 5', topicId:'div5', applies:'interventional',
    q:'Records must be made available to Health Canada within how many days if there is a concern regarding participant safety?',
    opts:['Immediately upon request','2 calendar days','7 calendar days','30 calendar days'],
    correct:1,
    rationale:'Under Division 5 (C.05.013), if there is a concern regarding the use of a clinical trial drug or a risk to the health of clinical trial participants, records must be made available to Health Canada within 2 calendar days of the request. In any other case, records must be provided within 7 calendar days.',
    ref:'HC Div 5 C.05.013' },

  { id:'hc-c8', type:'check', topic:'Health Canada Division 5', topicId:'div5', applies:'interventional',
    q:'What is a No Objection Letter (NOL) and what does it authorize?',
    opts:['A letter from the REB confirming ethical approval','A letter from Health Canada confirming they have no objection to the CTA; it authorizes the sponsor to sell or import the investigational drug for use in the trial','A letter from the sponsor confirming they will comply with Division 5','A letter from the QI confirming the site is ready to begin the trial'],
    correct:1,
    rationale:'An NOL (No Objection Letter) is issued by Health Canada when it has reviewed the CTA and has no objection to proceeding. It authorizes the sponsor to sell or import the investigational drug for use in the specific clinical trial. The NOL must be filed with the study\u2019s essential documents in the ISF. The trial cannot proceed at a site until both the NOL and REB approval are in place.',
    ref:'HC Div 5 C.05.006 \u00b7 <a href="/sops/cr-018">SOP-CR-018</a>' },

  { id:'hc-c9', type:'check', topic:'Health Canada Division 5', topicId:'div5', applies:'interventional',
    q:'What must be submitted to Health Canada within 15 calendar days of a trial being discontinued in Canada?',
    opts:['Nothing \u2014 discontinuation requires no notification to Health Canada','A detailed report of the reasons for discontinuation, a description of the effect on projected trials, and confirmation that investigators have been notified','A final study report','A CTA amendment noting the discontinuation'],
    correct:1,
    rationale:'Per Division 5 (C.05.015), if a clinical trial is discontinued at one or all sites in Canada, the sponsor must notify Health Canada within 15 calendar days. The notification must include: a detailed report of the reasons for discontinuation, a description of the effect on projected or ongoing trials, and confirmation that each QI has been notified and sent written notice.',
    ref:'HC Div 5 C.05.015' },

  { id:'hc-c10', type:'check', topic:'Health Canada Division 5', topicId:'div5', applies:'interventional',
    q:'Under Division 5, is a sponsor-investigator at an academic institution exempt from CTA requirements?',
    opts:['Yes \u2014 academic institutions are exempt from Division 5','No \u2014 Division 5 does not differentiate between commercial and non-commercial sponsors; academic sponsor-investigators must comply with all sponsor obligations','Only if the study involves a marketed drug used within its approved indications','Only if the study involves fewer than 10 participants'],
    correct:1,
    rationale:'Division 5 explicitly does not differentiate between commercial and non-commercial sponsors. An academic institution or physician who initiates a trial using an unapproved drug or a marketed drug outside its approved indications must file a CTA and comply with all sponsor obligations under Division 5 \u2014 including GCP, monitoring, adverse reaction reporting, and record retention. There is no academic exemption.',
    ref:'HC Div 5 \u00b7 HC GUI-0100 \u00b7 <a href="/kb/governance/regulatory-framework">Regulatory Framework</a>' },

  /* ── TCPS2: 7 additional checks (tcps-c4 to tcps-c10) ── */
  { id:'tcps-c4', type:'check', topic:'Research Ethics / TCPS2', topicId:'tcps2', applies:'all',
    q:'What does the TCPS2 principle of \u201cConcern for Welfare\u201d encompass?',
    opts:['Physical safety only','The quality of the participant\u2019s experience during the study','The totality of participant interests \u2014 physical, mental, social, economic, and cultural \u2014 both during and after the study','Welfare of future patients who may benefit from the research'],
    correct:2,
    rationale:'TCPS2 Chapter 1 defines Concern for Welfare as encompassing the totality of a participant\u2019s interests: physical, mental, social, economic, and cultural welfare. It is not limited to physical safety during the study but includes long-term interests and protections. Researchers and REBs must minimize risk of harm and consider potential benefits, weighing both throughout the study lifecycle.',
    ref:'TCPS2 Ch. 1' },

  { id:'tcps-c5', type:'check', topic:'Research Ethics / TCPS2', topicId:'tcps2', applies:'all',
    q:'Under TCPS2, what does the principle of \u201cJustice\u201d require in relation to participant selection?',
    opts:['That the most vulnerable populations are always excluded from research','That the benefits and burdens of research are distributed fairly, and that criteria for inclusion and exclusion are justified by the research question','That participants are compensated equitably for their time','That research only involves populations who stand to benefit from the results'],
    correct:1,
    rationale:'TCPS2 Chapter 1 defines Justice as requiring fair treatment and equitable distribution of the benefits and burdens of research. Criteria for including or excluding participants must be justified by the research question \u2014 not by convenience or historical exclusion of certain groups. Justice also means that no group is inappropriately burdened with research risks while others receive the benefits.',
    ref:'TCPS2 Ch. 1 & 4' },

  { id:'tcps-c6', type:'check', topic:'Research Ethics / TCPS2', topicId:'tcps2', applies:'all',
    q:'TCPS2 applies to research funded by which agencies?',
    opts:['Health Canada only','CIHR, NSERC, and SSHRC (the Tri-Agencies); researchers are required to adhere to TCPS2 as a condition of funding','Any Canadian federal funding agency','The MUHC and all affiliated institutions, regardless of funding source'],
    correct:1,
    rationale:'TCPS2 is the joint policy of CIHR (Canadian Institutes of Health Research), NSERC (Natural Sciences and Engineering Research Council), and SSHRC (Social Sciences and Humanities Research Council). Researchers are required to adhere to TCPS2 as a condition of funding from these agencies. However, most Canadian institutions \u2014 including RI-MUHC \u2014 require all research involving humans to comply with TCPS2 regardless of funding source.',
    ref:'TCPS2 Introduction' },

  { id:'tcps-c7', type:'check', topic:'Research Ethics / TCPS2', topicId:'tcps2', applies:'all',
    q:'What does TCPS2 say about the capacity of children to consent to research participation?',
    opts:['Children under 18 can never consent independently','Children\u2019s capacity to consent is not based on age but on whether they can understand the significance of the research and the implications of risks and benefits','Children aged 14 and older can always consent independently','Only children aged 16 and over may provide any form of consent or assent'],
    correct:1,
    rationale:'TCPS2 Chapter 3 states that seeking consent from children is not based on their age, but on whether they have the capacity to understand the significance of the research and its risks and benefits. Factors include the nature of the research, the setting, the risk level, and the characteristics of the participants. Note that Quebec provincial law (CCQ) sets 18 as the age of full consent and 14 as the minimum age for independent consent to minimal-risk research with REB approval \u2014 TCPS2 and provincial law must both be considered.',
    ref:'TCPS2 Ch. 3 \u00b7 <a href="/sops/cr-008">SOP-CR-008 \u00a75.8</a>' },

  { id:'tcps-c8', type:'check', topic:'Research Ethics / TCPS2', topicId:'tcps2', applies:'all',
    q:'What is a Legally Appointed Representative (LAR) and when are they involved in consent?',
    opts:['A lawyer appointed to review research contracts on behalf of participants','A person authorized to consent on behalf of a participant who lacks the capacity to consent for themselves \u2014 such as a minor, an unconscious person, or a cognitively impaired adult','A hospital administrator who approves research involving patients','A sponsor-appointed representative who monitors the consent process'],
    correct:1,
    rationale:'Per SOP-CR-008 section 5.8.3 and TCPS2 Chapter 3, a Legally Appointed Representative (LAR) is a person authorized to consent on behalf of participants who cannot consent for themselves: minors, persons who are unconscious, severely ill, or cognitively impaired. The LAR must act in the participant\u2019s best interests. In Quebec, the CCQ specifies who may act as LAR (e.g., person with parental authority for minors, tutor for incapacitated adults).',
    ref:'TCPS2 Ch. 3 \u00b7 <a href="/sops/cr-008">SOP-CR-008 \u00a75.8.3</a>' },

  { id:'tcps-c9', type:'check', topic:'Research Ethics / TCPS2', topicId:'tcps2', applies:'all',
    q:'A researcher wants to offer course credit to university students for participating in their study. Under TCPS2, what is the key concern?',
    opts:['Course credit cannot be offered as an incentive under any circumstances','The incentive must not be so substantial that it impairs students\u2019 ability to make a free and rational decision about participation','Course credit is equivalent to cash payment and must be approved by Health Canada','Students must be excluded from research that involves more than minimal risk regardless of incentive'],
    correct:1,
    rationale:'TCPS2 Chapter 3 requires that consent be free and voluntary. Incentives \u2014 including course credit \u2014 must not be so substantial that they override participants\u2019 ability to make an autonomous, voluntary decision. The concern is coercion or undue influence, particularly when there is a power imbalance (e.g., student/professor). Additionally, if a student withdraws, they must receive the full incentive or a pro-rated share \u2014 penalizing withdrawal is a TCPS2 violation.',
    ref:'TCPS2 Ch. 3, Art. 3.1' },

  { id:'tcps-c10', type:'check', topic:'Research Ethics / TCPS2', topicId:'tcps2', applies:'all',
    q:'What is \u201cminimal risk\u201d research under TCPS2?',
    opts:['Research that involves no physical procedures','Research where the probability and magnitude of harm or discomfort anticipated is not greater than what is ordinarily encountered in daily life or during routine examinations','Research approved by the REB as low-risk','Research that does not involve vulnerable populations'],
    correct:1,
    rationale:'TCPS2 Chapter 2 defines minimal risk as research where the probability and magnitude of possible harms anticipated is not greater than that encountered in aspects of everyday life or during routine physical or psychological examinations. This threshold is used to determine whether research qualifies for delegated review (rather than full board review) and whether waivers of consent or other modifications to standard protections may be considered.',
    ref:'TCPS2 Ch. 2' },

  /* ── ISO 14155: 8 additional checks (iso-c3 to iso-c10) ── */
  { id:'iso-c3', type:'check', topic:'ISO 14155 (Medical Devices)', topicId:'iso14155', applies:'interventional',
    q:'Under ISO 14155:2020, who retains overall responsibility for the clinical investigation when tasks are delegated to a CRO?',
    opts:['The CRO assumes full responsibility once tasks are delegated','The sponsor retains overall responsibility for the investigation, even when tasks are outsourced','The principal investigator shares responsibility equally with the CRO','Responsibility is divided proportionally based on the delegation agreement'],
    correct:1,
    rationale:'Per ISO 14155:2020 Clause 8, the sponsor retains overall responsibility for the clinical investigation even when tasks are delegated or outsourced to a CRO or other service provider. This is the same principle as ICH E6(R3) \u2014 delegation distributes work but does not transfer accountability. The sponsor must ensure investigators are qualified, sites are prepared, and oversight is maintained.',
    ref:'ISO 14155:2020 Clause 8 \u00b7 <a href="/sops/cr-014">SOP-CR-014</a>' },

  { id:'iso-c4', type:'check', topic:'ISO 14155 (Medical Devices)', topicId:'iso14155', applies:'interventional',
    q:'ISO 14155:2020 was the third edition of the standard. What was a key addition compared to the 2011 version?',
    opts:['Informed consent requirements were added for the first time','13 GCP principles aligned with ICH E6(R2) and the Declaration of Helsinki were explicitly articulated','Device classification requirements were introduced','Post-market surveillance was added as a requirement'],
    correct:1,
    rationale:'ISO 14155:2020 (third edition) explicitly added a summary of 13 GCP principles, aligning ISO 14155 more closely with ICH E6(R2) and the Declaration of Helsinki. Other key additions included risk-based monitoring, clinical investigation registration requirements before first enrolment, strengthened informed consent requirements including electronic consent provisions, and enhanced risk management integration throughout the investigation lifecycle.',
    ref:'ISO 14155:2020 \u00b7 <a href="/kb/governance/regulatory-framework">Regulatory Framework</a>' },

  { id:'iso-c5', type:'check', topic:'ISO 14155 (Medical Devices)', topicId:'iso14155', applies:'interventional',
    q:'Under ISO 14155:2020, what must a clinical investigation plan (CIP) \u2014 the device equivalent of a protocol \u2014 include regarding risk?',
    opts:['A general statement that risks have been considered','A prospective risk management plan integrated throughout the investigation, referencing ISO 14971','Risk identification only \u2014 mitigation is the sponsor\u2019s responsibility','Risk information is optional in the CIP if addressed in the Investigator\u2019s Brochure'],
    correct:1,
    rationale:'ISO 14155:2020 integrates risk management throughout the entire clinical investigation process, including the Clinical Investigation Plan (CIP). It requires a risk management plan that references ISO 14971 (medical device risk management). Risk assessment informs the monitoring strategy, deviation reporting thresholds, and safety stopping rules. Risk management is not a one-time activity but is reviewed and updated throughout the investigation.',
    ref:'ISO 14155:2020 Clause 8 & Annex H' },

  { id:'iso-c6', type:'check', topic:'ISO 14155 (Medical Devices)', topicId:'iso14155', applies:'interventional',
    q:'How does adverse event terminology differ between ISO 14155 (devices) and ICH E6 (drugs)?',
    opts:['There is no difference \u2014 the same SAE terminology applies to both','ISO 14155 uses \u201cserious adverse device effects\u201d (SADEs) and \u201cdevice deficiencies\u201d in addition to adverse events; these require specific reporting forms different from drug SAE forms','ISO 14155 does not require adverse event reporting \u2014 only device malfunctions','ISO 14155 uses the same SAE form but adds a device-specific checkbox'],
    correct:1,
    rationale:'ISO 14155:2020 introduces device-specific terminology: \u201cSerious Adverse Device Effect\u201d (SADE) \u2014 an adverse effect that led to death, serious injury, or serious deterioration in health; and \u201cdevice deficiency\u201d \u2014 any inadequacy of a medical device related to identity, quality, durability, reliability, safety, or performance. Per SOP-CR-012 section 5.9.2, device-related incidents must be reported using the Mandatory Medical Device Problem Reporting form on the Health Canada website, not a standard drug SAE form.',
    ref:'ISO 14155:2020 \u00b7 <a href="/sops/cr-012">SOP-CR-012 \u00a75.9.2</a> \u00b7 <a href="/sops/cr-024">SOP-CR-024</a>' },

  { id:'iso-c7', type:'check', topic:'ISO 14155 (Medical Devices)', topicId:'iso14155', applies:'interventional',
    q:'ISO 14155 applies to which of the following studies?',
    opts:['All studies involving any medical product, including drugs','Clinical investigations of medical devices for regulatory purposes, excluding in vitro diagnostic (IVD) devices','Any study involving a device, including post-market studies and retrospective chart reviews','Only pre-market investigations of Class III and IV devices'],
    correct:1,
    rationale:'ISO 14155:2020 addresses good clinical practices for the design, conduct, recording, and reporting of clinical investigations of medical devices carried out in human subjects for regulatory purposes. It explicitly does not apply to in vitro diagnostic (IVD) medical devices. It applies to both pre-market and post-market investigations, and to all risk classes that require investigational testing authorization.',
    ref:'ISO 14155:2020 Scope \u00b7 <a href="/sops/cr-024">SOP-CR-024</a>' },

  { id:'iso-c8', type:'check', topic:'ISO 14155 (Medical Devices)', topicId:'iso14155', applies:'interventional',
    q:'Under ISO 14155, what is the investigator\u2019s obligation regarding protocol deviations?',
    opts:['The investigator may deviate at their discretion if it benefits the participant','Deviations must be reported to the sponsor per protocol timelines, and significant deviations require sponsor approval and ethics committee notification','Deviations are the sponsor\u2019s responsibility to report; the investigator only needs to document them locally','Minor deviations do not need to be reported under ISO 14155'],
    correct:1,
    rationale:'Per ISO 14155:2020, investigators must follow the CIP (protocol) without unauthorized deviations and must seek sponsor approval and ethics committee notification for protocol deviations when necessary. All adverse events and device deficiencies must be reported to the sponsor per protocol timelines. Unlike ICH GCP where ultimate QI responsibility is retained, under ISO 14155 responsibility for a deviation transfers with the delegated task \u2014 but reporting obligations remain clear.',
    ref:'ISO 14155:2020 Clauses 8 & 9' },

  { id:'iso-c9', type:'check', topic:'ISO 14155 (Medical Devices)', topicId:'iso14155', applies:'interventional',
    q:'What does ISO 14155:2020 require regarding clinical investigation results once the investigation is complete?',
    opts:['Results must be submitted to Health Canada only','Results must be posted on a publicly accessible database on completion of the investigation','Results are proprietary and may be withheld at the sponsor\u2019s discretion','Results must be published in a peer-reviewed journal within 2 years'],
    correct:1,
    rationale:'ISO 14155:2020 added a requirement \u2014 not present in the 2011 version \u2014 that investigation results should be posted on a publicly accessible database upon completion of the investigation (defined as when follow-up is complete unless another timepoint is specified in the CIP). This aligns with international transparency obligations and addresses publication bias. National regulations may specify different timing requirements.',
    ref:'ISO 14155:2020 (2020 additions)' },

  { id:'iso-c10', type:'check', topic:'ISO 14155 (Medical Devices)', topicId:'iso14155', applies:'interventional',
    q:'Which Canadian application process governs the use of Class II, III, and IV medical devices in clinical investigations?',
    opts:['A Clinical Trial Application (CTA), the same as for drugs','An Investigational Testing Authorization (ITA), submitted to the Medical Devices Bureau of Health Canada','A Notified Body assessment, as used in the EU','No application is required \u2014 REB approval alone is sufficient'],
    correct:1,
    rationale:'In Canada, clinical investigations of Class II, III, and IV medical devices require an Investigational Testing Authorization (ITA) from Health Canada\u2019s Medical Devices Bureau. Class I devices do not require an ITA. The application results in a No Objection Letter (NOL) if approved. This is separate from the CTA process used for drugs. REB approval is also required and must be obtained before the investigation begins.',
    ref:'<a href="/sops/cr-024">SOP-CR-024</a> \u00b7 <a href="/kb/governance/regulatory-framework">Regulatory Framework</a>' },

  /* ── DEVIATIONS: 5 additional checks (dev-c6 to dev-c10) ── */
  { id:'dev-c6', type:'check', topic:'Protocol Deviations', topicId:'deviations', applies:'all',
    q:'A participant misses their scheduled visit window by 2 days due to illness. The monitor later identifies this as a deviation. How should the severity be assessed?',
    opts:['Always critical \u2014 any deviation from a visit schedule is serious','Depends on whether the visit window miss affects participant safety or data validity: likely minor if no safety or primary endpoint data was missed, but major if critical assessments or safety evaluations were omitted','Always minor for visit window deviations','The sponsor decides severity, not the site'],
    correct:1,
    rationale:'Protocol deviation severity is assessed based on actual impact on participant safety and data validity, not on the type of deviation. A 2-day visit window miss for a routine visit with no critical safety or efficacy assessments is typically minor. The same miss for a visit containing a primary efficacy endpoint, a safety blood draw, or an AE follow-up would be reassessed as major. Severity is contextual and the QI/PI makes the initial assessment.',
    ref:'<a href="/sops/cr-026">SOP-CR-026 \u00a75.3.3</a>' },

  { id:'dev-c7', type:'check', topic:'Protocol Deviations', topicId:'deviations', applies:'all',
    q:'An eligibility deviation is discovered after a participant has completed 6 months of the study. They should not have been enrolled. What is the first step?',
    opts:['Immediately withdraw the participant from the study','Assess the deviation severity, notify the QI/PI and sponsor, document on the deviation log, and let the QI/PI determine whether continued participation is appropriate with the sponsor\u2019s agreement','Retroactively amend the inclusion criteria to cover the participant','Do nothing \u2014 since the participant has been in the study for 6 months without harm, no action is needed'],
    correct:1,
    rationale:'Discovery of an eligibility deviation does not automatically mean the participant must withdraw. The correct first step is to assess severity, notify the QI/PI and sponsor immediately, document the deviation on the Protocol/GCP/SOP Deviation Log, and complete a CAPA form if major or critical. The QI/PI and sponsor together determine whether continued participation is appropriate, weighing the risk of withdrawal against continued exposure. The deviation must be reported to the REB within the applicable timeline.',
    ref:'<a href="/sops/cr-026">SOP-CR-026 \u00a75.3.3</a>' },

  { id:'dev-c8', type:'check', topic:'Protocol Deviations', topicId:'deviations', applies:'all',
    q:'What is a CAPA in the context of protocol deviations?',
    opts:['A regulatory form submitted to Health Canada for all deviations','A Corrective and Preventive Action \u2014 a documented plan addressing why the deviation occurred, how it will be corrected, and how recurrence will be prevented','A clinical assessment of participant adverse effects','A Cost and Protocol Analysis required for REB submission'],
    correct:1,
    rationale:'A CAPA (Corrective and Preventive Action) is a documented quality management tool required for major and critical deviations per SOP-CR-026. It addresses three elements: (1) Corrective action \u2014 what will be done to address the specific deviation; (2) Preventive action \u2014 what systemic change will prevent recurrence; (3) Root cause analysis \u2014 why did it happen. The CAPA number must be cross-referenced on the Deviation Log, and a copy sent to the RI-MUHC Quality Assurance department.',
    ref:'<a href="/sops/cr-026">SOP-CR-026 \u00a75.3.3</a>' },

  { id:'dev-c9', type:'check', topic:'Protocol Deviations', topicId:'deviations', applies:'all',
    q:'What is the key distinction between a \u201cminor\u201d and a \u201cmajor\u201d protocol deviation?',
    opts:['Minor deviations are unintentional; major deviations are intentional','Major deviations may result in undue health risk to participants or could invalidate data; minor deviations do not meet this threshold','Minor deviations only occur at a single visit; major deviations are systematic','Major deviations always require a CTA amendment; minor deviations do not'],
    correct:1,
    rationale:'Per SOP-CR-026 section 5.3.3, a major deviation is a marked deviation that may result in undue health risks to participants or could potentially invalidate data. A minor deviation is a deficiency or deviation not meeting the criteria for major or critical. The key assessment question for major status is: does this deviation affect participant safety or data validity? If yes to either, it is at minimum major.',
    ref:'<a href="/sops/cr-026">SOP-CR-026 \u00a75.3.3</a>' },

  { id:'dev-c10', type:'check', topic:'Protocol Deviations', topicId:'deviations', applies:'all',
    q:'Who must receive a copy of the CAPA for major and critical deviations, in addition to being reported to the REB?',
    opts:['Health Canada directly','The MUHC Director of Professional Services','The RI-MUHC Quality Assurance department','The sponsor\u2019s legal team'],
    correct:2,
    rationale:'Per SOP-CR-026 section 5.3.3, major and critical deviations must be reported to the REB within the applicable timeline (7 days if life-threatening, 15 days otherwise), and the CAPA must also be sent to the RI-MUHC Quality Assurance department. The QA department uses this information for institutional oversight and trend analysis across studies.',
    ref:'<a href="/sops/cr-026">SOP-CR-026 \u00a75.3.3</a>' }


];

/* ════════════════════════════════════════════
   INSPECTION READINESS POOL
   Format: { id, type:'inspection', topic, topicId, applies,
             q (inspector question), prep (what to think about),
             model (model response), gap (common gap), ref }
════════════════════════════════════════════ */
var KP_INSPECTION = [

  /* ── DELEGATION: 5 prompts ── */
  { id:'insp-del-1', type:'inspection', topic:'Roles and Delegation', topicId:'delegation', applies:'interventional',
    q:'Walk me through your delegation log. Who authorized each person on this log to perform their assigned tasks, and when?',
    prep:'Think about what a complete answer looks like. What would you actually pull out and show?',
    model:'The delegation log was authorized by Dr. [QI name], who signed and dated each entry. Each person was added to the log prior to performing their first study task. Each entry includes the date delegation was granted, the specific tasks delegated, and the delegate’s initials confirming they received protocol training. I can cross-reference each entry with the corresponding training record in the ISF.',
    gap:'Delegation logs signed once at study initiation and never updated as staff join or leave. “The PI signed the log at the beginning of the study” implies the log was never maintained — that’s the answer that flags a problem.',
    ref:'ICH E6(R3) §2.3.2 · C.05.012' },

  { id:'insp-del-2', type:'inspection', topic:'Roles and Delegation', topicId:'delegation', applies:'interventional',
    q:'I see three participants were enrolled during the week of [dates]. Your QI’s travel records show she was out of the country that week. Who conducted the eligibility assessments and consent discussions?',
    prep:'Who should have been covering? Where would that be documented? What would you show the inspector?',
    model:'During that period, Dr. [sub-investigator name] served as the acting QI. This is documented on the delegation log — you can see the entry here, which includes the tasks she was authorized to perform in the QI’s absence, and the dates of that coverage. The consent forms and eligibility checklists from that week are signed by Dr. [sub-investigator].',
    gap:'“The CRC handled it and the PI reviewed and signed everything when she got back” confirms the finding rather than resolving it. Retrospective PI signatures on documents from a period when the PI was demonstrably away is a major inspection finding.',
    ref:'GUI-0100 (sub-investigator coverage) · ICH E6(R3) §2.3.1 · C.05.010(f)' },

  { id:'insp-del-3', type:'inspection', topic:'Roles and Delegation', topicId:'delegation', applies:'interventional',
    q:'Your study uses a phlebotomy team for PK blood draws. I don’t see them anywhere in the delegation log or staff training records. How are you ensuring they’re performing the draws correctly?',
    prep:'Are PK blood draws routine or study-specific? How does E6(R3) treat this differently from R2?',
    model:'The PK blood draws are protocol-specific, timed draws with specific handling requirements — not routine clinical draws. The phlebotomy team is documented in the delegation log under the manager who oversees them, consistent with GUI-0100 guidance on manager-level delegation, with individual qualification evidence available in personnel files.',
    gap:'“They’re just doing blood draws — that’s routine” may be correct for truly routine draws but is wrong for protocol-specific PK sampling. The distinction under E6(R3) §2.3.3 is whether the procedure is study-specific or routine clinical practice.',
    ref:'ICH E6(R3) §2.3.3 · GUI-0100 (manager delegation provision)' },

  { id:'insp-del-4', type:'inspection', topic:'Roles and Delegation', topicId:'delegation', applies:'interventional',
    q:'Your RA is listed on the delegation log for “data entry and source document review.” I see notes in the source record where he recorded eligibility assessments. Was he authorized to make those determinations?',
    prep:'What’s the difference between recording data and making a clinical determination? What is the honest answer here?',
    model:'You’re right to flag that. His delegation covers data entry and source document review — not eligibility determination. Eligibility assessments require physician review and are the QI’s responsibility, or a sub-investigator’s if specifically delegated. If he recorded an eligibility assessment, that is outside his delegated scope and represents a deviation we would need to address with a CAPA.',
    gap:'“He was just recording what the nurse told him” or “the PI reviewed it later” are not adequate responses. Informal verbal direction that substitutes for proper delegation is one of the most common inspection findings.',
    ref:'ICH E6(R3) §2.3.2 · C.05.010(g)' },

  { id:'insp-del-5', type:'inspection', topic:'Roles and Delegation', topicId:'delegation', applies:'interventional',
    q:'Show me the training records for everyone on your delegation log. I want to see that each person completed protocol training before performing their first study task.',
    prep:'Where are the training records? Can you demonstrate that training dates predate first activity dates in source records?',
    model:'All training records are in the ISF under [tab/section]. For each staff member you’ll find their GCP certificate, their protocol training log signed by the PI or CRC, and for study-specific procedures, task-specific training records. The dates on each record predate the date they were added to the delegation log and the date of their first activity in source documents.',
    gap:'Training records that are undated or where the PI signed the protocol training log months after the study started. Inspectors compare training dates to first activity dates — any training record dated after the first documented activity for that person is a red flag.',
    ref:'ICH E6(R3) §2.3.2 · C.05.010(g)' },

  /* ── INFORMED CONSENT: 5 prompts ── */
  { id:'insp-con-1', type:'inspection', topic:'Informed Consent Process', topicId:'consent', applies:'all',
    q:'Show me the consent form in this participant’s file. Which REB approval corresponds to this version? Can you show me the REB approval letter for this version?',
    prep:'Can you confirm the version number matches the REB-approved version? Does the approval date predate the participant’s signature?',
    model:'The consent form in this file is version [X], dated [date]. The REB approval is in the ISF under [tab/section] — here is the approval letter confirming that version [X] was approved on [date]. The participant signed on [date], which is after the REB approval date.',
    gap:'Sites without a version-controlled consent log often cannot answer this cleanly. A common finding is producing the form and approval letter without noticing the version numbers don’t match, or that the approval postdates the signature.',
    ref:'ICH E6(R3) §2.8 · C.05.010(h) · TCPS2 Art. 3.2' },

  { id:'insp-con-2', type:'inspection', topic:'Informed Consent Process', topicId:'consent', applies:'all',
    q:'This participant has mild cognitive impairment documented in their medical record. How did you assess their capacity to consent? What documentation exists?',
    prep:'What does your protocol say about capacity assessment? Where would you find that documentation right now?',
    model:'The protocol includes a capacity assessment procedure for cognitively impaired participants. At the time of consent, the PI assessed the participant’s capacity using [procedure]. The assessment is documented in [location]. The participant demonstrated understanding of key elements and was determined capable at that time. We reassess capacity at each visit.',
    gap:'“They signed the form — they seemed to understand.” This conflates eligibility with capacity. No documented capacity assessment is a common finding for studies with cognitively vulnerable populations.',
    ref:'TCPS2 Art. 3.7 · Civil Code Art. 20–21 · ICH E6(R3) §2.8.1' },

  { id:'insp-con-3', type:'inspection', topic:'Informed Consent Process', topicId:'consent', applies:'all',
    q:'There was a protocol amendment 6 months ago. Show me the re-consent documentation for all currently enrolled participants.',
    prep:'Can you account for every enrolled participant — who was re-consented, when, and why any were excluded? Is there REB confirmation?',
    model:'The amendment was issued on [date] and REB approval for the revised form was received on [date]. We identified [N] participants requiring re-consent. Re-consent was completed for all [N] between [date] and [date]. Signed updated forms are in each participant’s file. Participants excluded from re-consent are documented with the rationale, confirmed with the REB.',
    gap:'“The sponsor said only some participants needed re-consent, so we just did those.” Accepting sponsor re-consent instructions without REB verification is a common gap. The rationale for any exclusions must also be documented.',
    ref:'TCPS2 Art. 3.1, 11.7, 11.8 · ICH E6(R3) §2.9' },

  { id:'insp-con-4', type:'inspection', topic:'Informed Consent Process', topicId:'consent', applies:'all',
    q:'This consent form doesn’t mention what happens to participant data if they withdraw. Under ICH E6(R3) and Quebec privacy law, this is required. How do you address this?',
    prep:'Is this element actually in the form? If so, where? If not, what is the plan?',
    model:'You’re correct that ICH E6(R3) §2.8.10(m) and Loi 25 both require disclosure of data handling on withdrawal. [If present:] This is addressed in section [X] on page [Y]. [If absent:] This is a gap — we would submit an amendment to update the consent form and re-consent enrolled participants.',
    gap:'“The sponsor provided this form and the REB approved it.” True, but it doesn’t resolve the finding. Sponsor templates designed for US trials frequently omit Loi 25 and E6(R3) §2.8.10(m)(n) data disclosure requirements.',
    ref:'ICH E6(R3) §2.8.10 · Loi 25 · TCPS2 Art. 3.1' },

  { id:'insp-con-5', type:'inspection', topic:'Informed Consent Process', topicId:'consent', applies:'all',
    q:'I see participant #007 withdrew from the study. Their data is included in the final dataset. Did you have consent for data use after withdrawal? Show me the documentation.',
    prep:'What did the withdrawal conversation cover? Is there a source document note? What does the consent form say about data on withdrawal?',
    model:'When participant #007 called to withdraw, the CRC discussed the data options with them. The participant agreed to allow previously collected data to be used in the analysis but did not agree to further collection. This is documented in the source record from that date. The consent form also addresses this — participants were informed at enrollment that data collected prior to withdrawal may be retained unless they request otherwise.',
    gap:'“They withdrew so we just stopped procedures. We didn’t know we had to discuss data.” Treating withdrawal as a form-completion exercise rather than a consent conversation about data is one of the most common consent management failures.',
    ref:'TCPS2 Art. 3.1, 3.3 · ICH E6(R3) §2.9.1 · Loi 25' }

,

  /* ── SAE REPORTING: 5 prompts ── */
  { id:'insp-sae-1', type:'inspection', topic:'Adverse Events and SAE Reporting', topicId:'sae', applies:'interventional',
    q:'Show me participant #012’s SAE report. What was the site awareness date? Can you show me the contemporaneous documentation that supports that date?',
    prep:'Where is the contemporaneous documentation? Is there a study log entry, email, or source document note timed to the actual day the site learned of the event?',
    model:'The SAE report is here. The site awareness date is [date]. The contemporaneous documentation is the study log entry from [date] at [time], recording the call from the participant’s family. The SAE form was initiated the same day and submitted to the sponsor within [X] hours per our protocol. Dr. [name]’s causality assessment is documented here, signed and dated [date].',
    gap:'“The awareness date is when we filled in the form.” No supporting documentation of the original notification. Or a study log entry that was clearly written after the fact. The SAE form date used as a proxy for awareness date is a common finding.',
    ref:'ICH E6(R3) §2.7.2 · ALCOA+ (contemporaneous) · C.05.014' },

  { id:'insp-sae-2', type:'inspection', topic:'Adverse Events and SAE Reporting', topicId:'sae', applies:'interventional',
    q:'This SAE was assessed as “not related.” The IB version in the participant’s file is version 4.1. I see the sponsor sent version 5.0 two months before this event, which added this type of event to the known reactions list. Did your site receive version 5.0?',
    prep:'Where is your current IB? When did you receive it? Which version was current at the time of the event?',
    model:'The current IB in our ISF is version 5.0, received on [date] — here is the transmittal letter. The SAE occurred after we received version 5.0, so the expectedness assessment was made against version 5.0. The event is listed as a known reaction in that version, which supports the “expected” determination. The file copy showing version 4.1 is an ISF maintenance issue we should correct.',
    gap:'Producing an SAE report where the expectedness determination was made against a prior IB version because the site hadn’t updated their working copy. Sites receive IB updates but don’t always replace working copies, update ISF binders, or document receipt dates.',
    ref:'ICH E2A · ICH E6(R3) §3.13.2(c) · C.05.001 (definition of unexpected)' },

  { id:'insp-sae-3', type:'inspection', topic:'Adverse Events and SAE Reporting', topicId:'sae', applies:'interventional',
    q:'I see participant #019 completed the study 8 weeks ago. There’s a hospital admission 3 weeks after their final visit. Why isn’t this in your SAE records?',
    prep:'What does your protocol say about the follow-up period? When did it end for this participant?',
    model:'The protocol defines the follow-up period as [X weeks] after the last dose. Participant #019’s final dose was [date] and the follow-up period ended [date]. The hospitalization occurred [date], which is [within/after] that period. [If within:] This is a gap we need to address. [If after:] The event is outside the follow-up period — that determination is documented here.',
    gap:'“They already finished — we don’t follow up after completion.” Without reference to the protocol-defined follow-up period. CRCs who close participant files at the final visit without a defined post-completion follow-up process.',
    ref:'ICH E6(R3) §2.7.2 · ICH E2A · Protocol-specific requirements' },

  { id:'insp-sae-4', type:'inspection', topic:'Adverse Events and SAE Reporting', topicId:'sae', applies:'interventional',
    q:'Participant #007 had a serious event assessed as “possibly related.” I see a note in the file that the sponsor called requesting the assessment be changed to “not related.” Show me how this was handled.',
    prep:'Is there documentation that the QI independently reviewed the sponsor’s request? What did the QI decide, and why?',
    model:'The sponsor contacted us on [date]. Dr. [QI] reviewed the query and the additional information provided. [If unchanged:] After reviewing the sponsor’s rationale, Dr. [QI] maintained “possibly related” because [clinical reason], documented in this addendum dated [date]. [If changed:] After reviewing new safety data, Dr. [QI] revised to [assessment] based on [specific clinical rationale]. This is an independent reassessment, not a direction from the sponsor.',
    gap:'“The sponsor told us to change it, so we did.” With no documentation of independent clinical review. Or the assessment changed in the SAE form with no explanation, no addendum, no PI involvement.',
    ref:'ICH E6(R3) §2.7.2 · Data integrity principles · ICH E2A' },

  { id:'insp-sae-5', type:'inspection', topic:'Adverse Events and SAE Reporting', topicId:'sae', applies:'interventional',
    q:'Show me your REB notification for this SUSAR. What is your site’s REB reporting requirement for SUSARs?',
    prep:'Where is the REB notification? When was it submitted relative to site awareness? What does your REB require?',
    model:'Our REB requires SUSAR notification within [X days] of awareness. The SUSAR was identified on [date]. We submitted the REB notification on [date] — here is the submission and REB acknowledgment. Our REB also requires an annual SAE summary, submitted [date] and filed here.',
    gap:'“The sponsor handles all the safety reporting.” Confusing sponsor obligations to Health Canada with site obligations to the local REB. The two run in parallel, not in sequence — the site cannot wait for the sponsor to report to Health Canada before notifying the REB.',
    ref:'TCPS2 Art. 11.7–11.9 · MUHC REB policies · ICH E6(R3) §2.7' },

  /* ── PROTOCOL DEVIATIONS: 5 prompts ── */
  { id:'insp-dev-1', type:'inspection', topic:'Protocol Deviations', topicId:'deviations', applies:'all',
    q:'Show me your protocol deviation log. How many important deviations have you had on this study? Walk me through how each was identified and reported.',
    prep:'Is your log complete? Can you walk through each important deviation with date identified, classification rationale, sponsor notification, REB notification, and CAPA?',
    model:'Our deviation log is here — [N] deviations total, [N] classified as important. Each important deviation was reported to sponsor and REB per their requirements. For each you’ll see the deviation, date identified, classification rationale, both notifications, and the CAPA with evidence of effectiveness.',
    gap:'Deviation logs with only non-important deviations despite obvious eligibility issues; vague descriptions; inability to demonstrate CAPA was implemented and effective.',
    ref:'ICH E6(R3) §2.5.2, §3.9.3 · C.05.010 · MUHC REB policies' },
  { id:'insp-dev-2', type:'inspection', topic:'Protocol Deviations', topicId:'deviations', applies:'all',
    q:'Participant PT-003 was enrolled with a baseline SBP of 159 mmHg. The protocol requires 160–180 mmHg. I don’t see this in your deviation log. How was this participant enrolled?',
    prep:'Is this documented? If not, how do you respond without implying the site deliberately avoided reporting?',
    model:'You’re correct that this is an eligibility deviation. [If logged:] It’s documented here — identified [date], reported to sponsor and REB [dates], CAPA implemented [date]. [If not logged:] This has come to our attention and we are documenting and reporting it now. Impact on PT-003’s data is being assessed with the sponsor.',
    gap:'“The investigator thought the difference was small.” Or: “We didn’t realize that was a deviation.” Both suggest a quality oversight failure. Eligibility deviations found during audits rather than at enrollment indicate no real-time eligibility checking.',
    ref:'ICH E6(R3) §2.5.2 · C.05.010(a)' },
  { id:'insp-dev-3', type:'inspection', topic:'Protocol Deviations', topicId:'deviations', applies:'all',
    q:'I see Participant PT-014 had adherence documented as 68% at Week 4. The protocol requires ≥80%. There’s no deviation report. Why not?',
    prep:'What does the protocol say about adherence thresholds and deviation classification? Can you justify the approach?',
    model:'The adherence finding is in PT-014’s source record at Week 4. [If protocol classifies this as important:] This should have been logged and we didn’t — a gap we will address. [If protocol is silent:] The protocol defines ≥80% as the per-protocol threshold but doesn’t explicitly classify sub-threshold adherence as reportable. Our interpretation is [approach], justified here.',
    gap:'“We noted it but it didn’t seem important enough to report.” Sites that document protocol thresholds in source records but don’t trigger the deviation reporting process when crossed.',
    ref:'ICH E6(R3) §2.5.2 · Protocol-specific requirements · CAPA principles' },
  { id:'insp-dev-4', type:'inspection', topic:'Protocol Deviations', topicId:'deviations', applies:'all',
    q:'I see you had three eligibility deviations in the past 6 months. Each has a CAPA of “staff retrained.” Walk me through the retraining — what was the root cause, who was trained, and what evidence do you have that it was effective?',
    prep:'Can you describe the actual root cause? Who was trained on what and when? What systemic change was made? What evidence shows it worked?',
    model:'The root cause analysis identified [specific cause]. Retraining targeted [staff] on [specific criteria] on [date] — here is the attendance record. We also [describe systemic change]. Since [date] we have had [N] screenings with no further eligibility deviations.',
    gap:'“We retrained the staff.” Without specifying what was covered, who attended, when it happened, or how effectiveness was verified. Three identical CAPAs for three similar deviations is a major red flag.',
    ref:'ICH E6(R3) §3.9.3 · CAPA principles · Quality management standards' },
  { id:'insp-dev-5', type:'inspection', topic:'Protocol Deviations', topicId:'deviations', applies:'all',
    q:'There’s a protocol amendment filed 4 months ago that changed the exclusion criteria. Were there participants enrolled under the old criteria who would have been excluded under the new? Were any deviations related to those original criteria?',
    prep:'Have you reviewed enrolled participants against the new criteria? Do you understand amendments don’t retroactively resolve pre-existing deviations?',
    model:'The amendment was implemented on [date] after REB and Health Canada approval. We reviewed all participants enrolled before the amendment — [N] were affected. For each we assessed impact and documented deviations where applicable. Deviations under the original criteria are documented separately and were not retroactively resolved by the amendment.',
    gap:'“The amendment resolved any issues we had.” Amendments change requirements going forward, not what happened before. Inspectors specifically look for this.',
    ref:'ICH E6(R3) §2.5 · C.05.007, C.05.008 · Deviation documentation principles' }

,

  /* ── MONITORING AND INSPECTION READINESS: 5 prompts ── */
  { id:'insp-mon-1', type:'inspection', topic:'Monitoring and Inspection Readiness', topicId:'monitoring', applies:'interventional',
    q:'Show me your Investigator Site File for this study. Walk me through how it’s organized and tell me when it was last reviewed for completeness.',
    prep:'Can you put your hands on the ISF right now? Is it organized? When was it last reviewed? Where is the current IB? The most recent monitoring visit report? The latest protocol amendment?',
    model:'The ISF is organized according to the sponsor’s template with tabs for [list sections]. The last formal ISF review was [date] — here is the quarterly review checklist. The current IB version is [5.2], received [date] and filed here. The most recent protocol amendment is version [X], REB-approved [date].',
    gap:'“We just organized it for the inspection.” This triggers suspicion about pre-inspection document alterations. An ISF that hasn’t been reviewed in 6+ months will show it — missing documents, outdated versions, and gaps that a quarterly review would have caught.',
    ref:'ICH E6(R3) Appendix C · C.05.012 · GUI-0100' },

  { id:'insp-mon-2', type:'inspection', topic:'Monitoring and Inspection Readiness', topicId:'monitoring', applies:'interventional',
    q:'I see participant PT-007 was enrolled 18 months ago. Show me their complete participant file — consent form, eligibility checklist, all source documents, and CRF entries.',
    prep:'Can you produce an integrated participant file quickly? Consent form and source records in the same location? Eligibility checklist linked to supporting documentation?',
    model:'PT-007’s file is here. The consent form is version [X], signed [date] — REB approval for this version is dated [date, which precedes the signature]. The eligibility checklist walks through each criterion with supporting source documentation. Source documents for each visit are [here / in OACIS]. The last monitoring visit reviewed this file — no outstanding queries.',
    gap:'Inability to produce an integrated participant file; consent and source records in different locations; eligibility checklist present but not linked to supporting documentation. Participant files should allow rapid review of the complete journey from screening to completion.',
    ref:'ICH E6(R3) Appendix C · C.05.012 · GUI-0100' },

  { id:'insp-mon-3', type:'inspection', topic:'Monitoring and Inspection Readiness', topicId:'monitoring', applies:'interventional',
    q:'Show me your IP accountability records. I want to see how the drug was received, stored, dispensed, and returned for this trial.',
    prep:'Where are the IP receipt records? The temperature logs? The dispensing records per participant? Do receipt + dispensed + returned/destroyed reconcile?',
    model:'IP accountability records are in the ISF under [tab]. Each shipment has a receipt record with date, quantity, lot number, and temperature transit data. Storage temperature logs are here. Dispensing records show participant ID, date, quantity, lot number, and pharmacist signature. Return records show [describe]. The totals reconcile: [X] received, [Y] dispensed, [Z] returned/destroyed.',
    gap:'IP records spread across multiple files; missing temperature logs; dispensing records that don’t reconcile with participant visits; no return documentation. The QI is responsible for IP accountability even if a pharmacist performs the physical tasks.',
    ref:'ICH E6(R3) §2.10 · C.05.012 · GUI-0100' },

  { id:'insp-mon-4', type:'inspection', topic:'Monitoring and Inspection Readiness', topicId:'monitoring', applies:'interventional',
    q:'Your last monitoring visit was 6 months ago. I see 4 open CRF queries in the database. Why haven’t these been resolved?',
    prep:'What is the honest explanation for why these are open? What progress has been made? What is the resolution timeline?',
    model:'These queries have been open since the [date] monitoring visit. [Explain genuinely: CRC workload, staff change, pending source document retrieval.] Query [X] was resolved [date] — here is the resolution. Queries [Y] and [Z] are outstanding because [reason] — we expect to close by [date]. I recognize this is a quality gap and our CAPA is [describe].',
    gap:'“We’ve been busy.” Without acknowledging the quality implication. Monitoring queries unresolved beyond 30 days are typically flagged at the next monitoring visit; queries open past 90 days are commonly treated as a quality concern. These are practice benchmarks, not regulatory thresholds, but inspectors will ask about them. Having an explanation ready is essential — the inspector will ask.',
    ref:'ICH E6(R3) §2.12 · §3.11.4.5 · C.05.012' },

  { id:'insp-mon-5', type:'inspection', topic:'Monitoring and Inspection Readiness', topicId:'monitoring', applies:'interventional',
    q:'I want to speak with the PI. What is Dr. Patel’s involvement in this trial? Does he review source data? Has he been present for participant visits?',
    prep:'What can you actually show as evidence of PI involvement? Are there signed source documents? SAE reports? Monitoring visit attendance records?',
    model:'Dr. Patel is actively involved in the study. [Describe specific involvement: he reviews eligibility checklists before randomization, conducts consent for complex cases, reviews and signs SAE reports, attends monitoring visits.] His involvement is documented in source records — you can see his signature on [forms]. He is available today and has been briefed.',
    gap:'“Dr. Patel delegates most things to the CRC — we can answer most questions.” This is a red flag. Inspectors distinguish between a QI who is genuinely engaged and one who signs documents without substantive review. Evidence of active PI oversight is one of the most scrutinized areas of any inspection.',
    ref:'ICH E6(R3) §2.1, §2.3 · C.05.010(f) · GUI-0100' },

  /* ── DATA INTEGRITY: 5 prompts ── */
  { id:'insp-dat-1', type:'inspection', topic:'Data Integrity', topicId:'data', applies:'all',
    q:'I’m going to trace this data point from the CRF back to its source. The CRF shows systolic BP 142 for PT-008 at Week 8. Show me the source document.',
    prep:'Where is the source for BP? Can you pull OACIS for this visit? Do the values match? If not, is the discrepancy documented and explained?',
    model:'The source for BP is the OACIS clinical record. I can pull up PT-008’s OACIS from the Week 8 visit — here it is. The BP is [value]. [If matching:] The CRF entry of 142 matches OACIS. [If discrepant:] There is a discrepancy — OACIS shows [X] and the CRF shows 142. The correction on the worksheet was made on [date] by [initials] using the single-line-through procedure — here is the documented rationale.',
    gap:'Pointing to the worksheet as the only source without checking OACIS; inability to access OACIS; explaining a discrepancy without documentation. CRF entries transcribed from memory rather than from OACIS are a common source of discrepancies.',
    ref:'ICH E6(R3) §2.12.2 · ALCOA+ · C.05.012' },
  { id:'insp-dat-2', type:'inspection', topic:'Data Integrity', topicId:'data', applies:'all',
    q:'Show me how your team makes corrections to paper source documents and eCRF entries. I want to see the procedure and an example of a correction on this study.',
    prep:'What is your correction procedure? Can you show a correctly-made correction — single line, initials, date, reason?',
    model:'Our SOP defines the correction procedure: single line through the error, initials, date, reason if not evident. For eCRF: corrections through the query management system, creating an audit trail. Here is an example in PT-007’s file — correction with initials [XX], date [date], reason “transcription error.” The eCRF audit trail shows the same change by [user ID] on [date].',
    gap:'Corrections with white-out; CRF corrections without audit trail; inability to explain the procedure. Inconsistent application is common under time pressure or with less-experienced staff.',
    ref:'ALCOA+ · ICH E6(R3) §4 (Data Governance) · C.05.012' },
  { id:'insp-dat-3', type:'inspection', topic:'Data Integrity', topicId:'data', applies:'all',
    q:'I’d like to see the visit note for PT-013 for Week 4, then the notes for PT-012 and PT-014 from the same week.',
    prep:'Look at those three notes before the inspector does. Are they individualized? If similar, can you explain what is genuinely different?',
    model:'[If individualized:] Here are the three notes. Each reflects individual clinical findings — some standard procedural language is similar but participant-specific observations are individualized. [If copies:] I need to be transparent — these notes have identical text. This was an error — our CRC used one note as a template. The visits occurred and data was collected, but the notes don’t reflect individual findings. Our CAPA is [describe].',
    gap:'Template note copying across participant files, particularly at high visit volumes. Standard language for procedures is acceptable; copying participant-specific observations is not.',
    ref:'ALCOA+ (Accurate, Contemporaneous) · ICH E6(R3) §2.12' },
  { id:'insp-dat-4', type:'inspection', topic:'Data Integrity', topicId:'data', applies:'all',
    q:'Your eCRF system — is it validated? Show me the validation documentation and demonstrate the audit trail function.',
    prep:'Where is the validation documentation in the ISF? Can you demonstrate the audit trail live?',
    model:'The eCRF system is [name], validated by the sponsor. Validation documentation is in the ISF under [tab]. To demonstrate the audit trail: [navigate to an entry] — you can see user ID, date/time stamp, and any changes with previous/current values and reason. Access is controlled by individual credentials — here is the access log.',
    gap:'Unable to produce validation documentation; claiming “the sponsor validates it” without site documentation; unable to demonstrate the audit trail. Sites often use sponsor eCRF systems without understanding their validation status.',
    ref:'ICH E6(R3) §2.12.10 · GUI-0100 · C.05.012' },
  { id:'insp-dat-5', type:'inspection', topic:'Data Integrity', topicId:'data', applies:'all',
    q:'I see PT-016 has a blank CRF field for the Week 12 blood draw. No notation, no N/A. Why is this field blank?',
    prep:'Do you know what happened? Is there a Note to File? A deviation report? Can you explain this without saying “we forgot”?',
    model:'The Week 12 blood draw was not obtained — the participant declined. [If Note to File:] Here is a Note to File documenting this, signed by [PI/CRC] on [date]. The event is also a logged deviation — here is the entry and CAPA. [If no Note to File:] We need to create one. Our procedure now requires a CRF notation and Note to File for any missing required data.',
    gap:'“We forgot to fill it in.” Or: “Nothing happened that visit.” Blank required CRF fields are not invisible — they require explanation, especially for primary or safety endpoints.',
    ref:'ALCOA+ (Complete) · ICH E6(R3) §2.12 · C.05.012' },

  /* ── RECRUITMENT AND SCREENING: 5 prompts ── */
  { id:'insp-rec-1', type:'inspection', topic:'Recruitment and Screening', topicId:'recruitment', applies:'all',
    q:'Show me your screen failure log. I want to see everyone assessed for eligibility but not enrolled, and the reason they were excluded.',
    prep:'Can you produce the log immediately? Does each entry have a criterion-level reason? Are there obvious gaps relative to your enrollment number?',
    model:'The screen failure log is here under [tab]. We have assessed [N] potential participants and enrolled [N]. The log includes a unique identifier, screening date, and primary reason for screen failure referenced to the specific criterion. For example: [read 2–3 entries]. The failure rate is consistent with the expected rate for this population.',
    gap:'A log with “failed screening” as the reason without criterion detail; inability to produce a log; or obvious gaps relative to enrollment numbers. Borderline cases that were ultimately enrolled should also appear with documentation of the eligibility review.',
    ref:'ICH E6(R3) §2.4.2 · C.05.012 · Protocol requirements' },

  { id:'insp-rec-2', type:'inspection', topic:'Recruitment and Screening', topicId:'recruitment', applies:'all',
    q:'Show me participant PT-003’s eligibility documentation. Walk me through how each criterion was verified.',
    prep:'Can you walk through each criterion with a specific source reference? Is the PI signature dated before enrollment?',
    model:'PT-003’s eligibility checklist is here. For each inclusion criterion: [walk through with source — e.g., “HbA1c 8.4% on [date] at MUHC lab — lab report here; Type 2 diagnosis confirmed in OACIS, Dr. Pham’s note dated [date]”]. For each exclusion criterion: [confirm absence with source]. Dr. Pham reviewed and signed the checklist on [date] prior to enrollment.',
    gap:'Checklists with check marks but no source references; inability to locate supporting documentation for specific criteria; PI signature dated after enrollment rather than before.',
    ref:'ICH E6(R3) §2.4.1 · C.05.010(g) · Protocol eligibility criteria' },

  { id:'insp-rec-3', type:'inspection', topic:'Recruitment and Screening', topicId:'recruitment', applies:'all',
    q:'Show me the REB approval for your recruitment poster. Is this the version currently posted in the clinic?',
    prep:'Which version is in the ISF? Which version is on the wall? Do they match? Does the approval letter specifically reference this material?',
    model:'The recruitment poster in use is version [X], dated [date]. The REB approval is here — approval letter dated [date], referencing this poster version. The poster currently displayed matches the approved version.',
    gap:'An approved poster in the ISF that differs from what is posted; an approval letter that doesn’t specifically reference the recruitment material; or no REB approval for materials clearly in use. Recruitment materials updated without returning to the REB.',
    ref:'ICH E6(R3) §2.4 · TCPS2 Art. 3.1 · GUI-0100 (recruitment materials)' },

  { id:'insp-rec-4', type:'inspection', topic:'Recruitment and Screening', topicId:'recruitment', applies:'all',
    q:'PT-007 enrolled with an HbA1c of 8.1% from your MUHC lab. I see an outside lab result of 7.9% from 3 weeks earlier. Why is this participant enrolled?',
    prep:'Where is the 7.9% result documented? Is it on the eligibility checklist? Is there documented protocol justification for the repeat test?',
    model:'The protocol section [X] allows a repeat screening test at the MUHC lab when an outside result is borderline due to inter-laboratory variability. The outside lab value of 7.9% is documented here in the participant file. Dr. Pham reviewed it and authorized a repeat per protocol section [X]. Both results appear on the eligibility checklist with their dates and lab sources, along with Dr. Pham’s authorization.',
    gap:'“We repeated the test and it was in range.” Without documentation of the first result or protocol justification for repeating. Recording only the qualifying value while omitting the borderline result creates an incomplete eligibility record.',
    ref:'Protocol eligibility procedures · ICH E6(R3) §2.4.1 · ALCOA+ (Complete)' },

  { id:'insp-rec-5', type:'inspection', topic:'Recruitment and Screening', topicId:'recruitment', applies:'all',
    q:'How are you using OACIS to identify potential participants? Is there REB authorization for this activity?',
    prep:'What does the protocol say about pre-screening? Is the REB approval specific about OACIS access for research purposes?',
    model:'[If REB-authorized:] Our pre-screening approach is in protocol section [X] and the REB approval covers it — here is the relevant section. The pre-screening is limited to [scope]. Potentially eligible patients are contacted through their normal care relationship. No study data is collected during pre-screening. [If not authorized:] Dr. Pham identifies potentially eligible patients through his normal clinical practice. No systematic OACIS review for research purposes occurs without the patient’s knowledge.',
    gap:'Sites conducting OACIS chart reviews for research screening without specific REB authorization or Loi 25 consideration. “They’re my patients” is not sufficient under Quebec privacy law.',
    ref:'Loi 25 · TCPS2 Art. 3.1 · REB requirements · MUHC privacy policies' },

  /* ── GCP PRINCIPLES: 5 prompts ── */
  { id:'insp-gcp-1', type:'inspection', topic:'GCP Principles', topicId:'gcp', applies:'interventional',
    q:'Tell me in your own words what GCP is and why this study is being conducted under GCP.',
    prep:'Can you explain the purpose of GCP without reciting a definition? Can you connect it to this specific study and to Health Canada’s role?',
    model:'GCP is the international standard for the design and conduct of clinical trials — it exists to protect participants and ensure that data is reliable enough to support regulatory decisions. This study is under a Health Canada CTA, governed by Division 5 of the Food and Drug Regulations and ICH E6(R3), adopted by Health Canada in April 2026. Health Canada has approved the protocol, has inspection authority, and will use data from this trial to evaluate the safety and efficacy of the investigational drug.',
    gap:'“GCP is the rules for clinical trials.” Mechanically accurate but demonstrates no understanding of purpose. Inspectors assess whether staff understand what they are doing and why — not just whether they can recite regulations.',
    ref:'ICH E6(R3) Preamble and Principles · Health Canada Division 5 · GUI-0100' },

  { id:'insp-gcp-2', type:'inspection', topic:'GCP Principles', topicId:'gcp', applies:'interventional',
    q:'What are the things on this trial that, if they went wrong, would most directly affect participant safety?',
    prep:'Can you identify the study-specific critical-to-quality elements? Not a generic list — the specific criteria and procedures that matter most for this particular study.',
    model:'The things most critical for participant safety on this trial: the eligibility criteria — specifically [name the safety-relevant exclusions], because the protocol was designed around a specific risk profile; SAE reporting, because timely accurate safety data is the most important signal we generate; and IP accountability, because administering the wrong dose would directly harm the participant. Source documentation and consent records are critical for being able to reconstruct what happened if something goes wrong.',
    gap:'Reciting a generic list of GCP obligations without connecting them to the specific risks of this particular study. This tests whether the site has internalized E6(R3) Principle 6 (Quality by Design — Critical-to-Quality factors) or is simply following a checklist.',
    ref:'ICH E6(R3) GCP Principle 6 (Quality by Design) · ICH E6(R3) §2.4, §2.7, §2.10' },

  { id:'insp-gcp-3', type:'inspection', topic:'GCP Principles', topicId:'gcp', applies:'interventional',
    q:'If you identified a problem — something that wasn’t right — what would you do? Walk me through your escalation process.',
    prep:'Do you know your escalation path? Who do you call first? What do you do if the PI is unreachable? How do you handle a safety concern vs. a documentation gap?',
    model:'First: document what I observed contemporaneously — a note to file with date and what I found. Then escalate to the PI immediately for significant issues (safety concern, eligibility problem, data integrity issue). If the PI is unreachable, contact [sub-investigator on delegation log]. For potential misconduct or fraud: MUHC Research Integrity process. For any participant safety concern, a physician must be involved before further study activities occur with that participant.',
    gap:'“I would tell my supervisor.” Without specifics, without knowledge of the escalation pathway, and without distinguishing between issue types. Sites without a documented and communicated escalation process.',
    ref:'ICH E6(R3) §2.3.1, §2.7.1 · GCP Principle 10 (Defined Roles and Responsibilities) · C.05.010' },

  { id:'insp-gcp-4', type:'inspection', topic:'GCP Principles', topicId:'gcp', applies:'interventional',
    q:'How do your GCP training records demonstrate that your team is qualified to conduct this trial?',
    prep:'Where are the GCP certificates? When were they last updated? Are they E6(R3)? Is protocol training documented and dated before each person’s first activity?',
    model:'GCP training records are in the ISF under [tab]. Each staff member has a current GCP certificate — for most staff, that’s the N2/CITI-Canada GCP Basic course covering ICH E6(R3) as of the [year] update. Protocol training is documented separately — here is the protocol training log signed by Dr. [PI] for each staff member, completed before they began study activities. Task-specific training links to the delegation log entries.',
    gap:'Producing GCP certificates but unable to demonstrate training was completed before activities began; outdated certificates (E6(R2) with no E6(R3) update); or unable to link training records to delegation log entries. Health Canada adopted E6(R3) in April 2026 — E6(R2)-only training is no longer current.',
    ref:'ICH E6(R3) §2.3.2 · GCP Principle 5 (Qualified Individuals) · GUI-0100' },

  { id:'insp-gcp-5', type:'inspection', topic:'GCP Principles', topicId:'gcp', applies:'interventional',
    q:'What is your understanding of the difference between your obligations under ICH E6(R3) and under Health Canada Division 5? Are there situations where they differ?',
    prep:'Can you name at least two Division 5 requirements that are specifically Canadian and go beyond or differ from ICH E6(R3)?',
    model:'ICH E6(R3) is the international GCP standard adopted by Health Canada — it provides the general framework. Division 5 is the Canadian regulatory requirement with provisions that are uniquely Canadian or go further than the international standard. Key Canadian differences: Division 5 requires one QI per site; the QI must be entitled to provide health care under Quebec law; delegation log observations are cited under C.05.012; and Division 5 sets a 15-year record retention period. When there’s a difference, we follow whichever is more protective. Both are in effect — we can’t substitute one for the other.',
    gap:'“We follow ICH GCP.” Without awareness that Division 5 is a separate and in some respects more specific layer. Treating the two as interchangeable when they have distinct provisions.',
    ref:'Health Canada Division 5 (C.05.001–C.05.019) · ICH E6(R3) · GUI-0100' }];

/* topic registry — controls the topic grid */
var KP_TOPICS = [
  { id:'sae',        name:'Adverse Events and SAE Reporting',    sop:'SOP-CR-012',       applies:'interventional', live:true },
  { id:'consent',    name:'Informed Consent Process',            sop:'SOP-CR-008',       applies:'all',            live:true },
  { id:'delegation', name:'Roles and Delegation',                sop:'SOP-CR-002',       applies:'all',            live:true },
  { id:'recruitment',name:'Recruitment and Screening',           sop:'SOP-CR-009',       applies:'all',            live:true },
  { id:'deviations', name:'Protocol Deviations',                 sop:'SOP-CR-014, 026',  applies:'interventional', live:true },
  { id:'monitoring', name:'Monitoring and Audits',               sop:'SOP-CR-013, 017',  applies:'interventional', live:true },
  { id:'gcp',        name:'GCP Principles',                      sop:'ICH E6(R3)',        applies:'interventional', live:true },
  { id:'div5',       name:'Health Canada Division 5',            sop:'HC Div 5 / CTA',   applies:'interventional', live:true },
  { id:'tcps2',      name:'Research Ethics and TCPS2',           sop:'TCPS2 (2022)',      applies:'all',            live:true },
  { id:'data',       name:'Data Integrity and Documentation',    sop:'SOP-CR-014',       applies:'all',            live:true },
  { id:'iso14155',   name:'ISO 14155 — Medical Device Trials', sop:'ISO 14155:2020',    applies:'interventional', live:true }
];
/* ════════════════════════════════════════════
   SESSION STATE
════════════════════════════════════════════ */
var kpMode       = '';          /* 'browse' | 'shuffle' */
var kpStudyType  = '';          /* 'interventional' | 'observational' — persists for session */
var kpCurrentPhaseId = '0';
var kpTransitioning  = false;

var kpBrowseTopicId = '';
var kpBrowseType    = '';  /* 'check' | 'scenario' */
var seqQueue   = [];   /* array of question objects */
var seqIndex   = 0;
var seqCorrect = 0;
var seqChecks  = 0;
var seqTransitioning = false;

/* ════════════════════════════════════════════
   PHASE TRANSITIONS
════════════════════════════════════════════ */
function kpAnimateOut(el, cb) {
  el.style.animation = 'phaseOut .28s cubic-bezier(.4,0,1,1) forwards';
  setTimeout(function() {
    el.style.animation = '';
    el.classList.remove('phase-active');
    cb();
  }, 290);
}
function kpAnimateIn(el, animName) {
  el.classList.add('phase-active');
  el.style.animation = (animName || 'phaseIn') + ' .5s cubic-bezier(.16,1,.3,1) forwards';
  setTimeout(function() {
    el.style.animation = '';
    kpTransitioning = false;
  }, 520);
}
function kpTransition(fromId, toId, reverse, noHash) {
  if (kpTransitioning) { return; }
  kpTransitioning = true;
  var from = document.getElementById('kp-phase-' + fromId);
  var to   = document.getElementById('kp-phase-' + toId);
  if (!from || !to) { kpTransitioning = false; return; }
  kpCurrentPhaseId = String(toId);
  if (!noHash) { kpPushHash(String(toId)); }
  kpAnimateOut(from, function() { kpAnimateIn(to, reverse ? 'phaseBack' : 'phaseIn'); });
}
function kpGoBack(targetId) {
  kpTransition(kpCurrentPhaseId, targetId, true);
}
function kpGoBackNoHash(targetId) {
  kpTransition(kpCurrentPhaseId, targetId, true, true);
}

/* ════════════════════════════════════════════
   MODE SELECTION
════════════════════════════════════════════ */
function kpGoHome() {
  kpTransition(kpCurrentPhaseId, '0', true);
  setTimeout(llRefreshStats, 50);
}

function kpGoToPractice() {
  kpTransition('0', 'entry', false);
}

function kpSelectMode(mode) {
  kpMode = mode;
  var lbl = document.getElementById('studytype-mode-label');
  if (lbl) { lbl.textContent = mode === 'browse' ? 'Browse' : 'Shuffle'; lbl.className = 'kp-studytype-label ' + (mode === 'browse' ? 'browse-col' : 'shuffle-col'); }
  kpTransition('entry', 'studytype', false);
}

/* ════════════════════════════════════════════
   STUDY TYPE SELECTION
════════════════════════════════════════════ */
function kpSelectStudyType(type) {
  kpStudyType = type;
  if (kpMode === 'browse') {
    kpBuildTopicGrid();
    kpTransition('studytype', '1', false);
  } else {
    /* re-trigger count tile animations */
    var tiles = document.querySelectorAll('#kp-phase-count .kp-count-tile');
    for (var ti = 0; ti < tiles.length; ti++) {
      tiles[ti].style.animation = 'none';
      void tiles[ti].offsetWidth;
      tiles[ti].style.animation = '';
    }
    kpTransition('studytype', 'count', false);
  }
}

/* ════════════════════════════════════════════
   TOPIC GRID (Browse)
════════════════════════════════════════════ */
function kpBuildTopicGrid() {
  var grid = document.getElementById('kp-topic-grid');
  var html = '';
  for (var i = 0; i < KP_TOPICS.length; i++) {
    var t = KP_TOPICS[i];
    /* filter: observational users don't see interventional-only topics */
    if (kpStudyType === 'observational' && t.applies === 'interventional') { continue; }
    var locked = !t.live;
    /* count questions for this topic + study type */
    var checks = 0;
    for (var j = 0; j < KP_POOL.length; j++) {
      var q = KP_POOL[j];
      if (q.topicId !== t.id) { continue; }
      if (q.applies === 'interventional' && kpStudyType === 'observational') { continue; }
      checks++;
    }
    html += '<div class="kp-topic-tile' + (locked ? ' locked' : '') + '"' +
      (!locked ? ' onclick="kpStartBrowse(\'' + t.id + '\')"' : '') + '>' +
      '<div class="kp-tt-name">' + t.name + '</div>' +
      '<div class="kp-tt-sop">' + t.sop + '</div>' +
      '<div class="kp-tt-pills">';
    if (locked) {
      html += '<span class="kp-tt-pill pending">In development</span>';
    } else {
      html += '<span class="kp-tt-pill checks">' + checks + ' question' + (checks !== 1 ? 's' : '') + '</span>';
    }
    html += '</div></div>';
  }
  grid.innerHTML = html;
  /* re-trigger stagger animations */
  var tiles = grid.querySelectorAll('.kp-topic-tile');
  for (var k = 0; k < tiles.length; k++) {
    tiles[k].style.animationDelay = (0.06 + k * 0.05) + 's';
  }
}

/* ════════════════════════════════════════════
   BUILD SEQUENCE QUEUE
════════════════════════════════════════════ */
function kpBuildBrowseQueue(topicId, type) {
  var queue = [];
  for (var i = 0; i < KP_POOL.length; i++) {
    var q = KP_POOL[i];
    if (q.topicId !== topicId) { continue; }
    if (q.applies === 'interventional' && kpStudyType === 'observational') { continue; }
    if (type && q.type !== type) { continue; }
    queue.push(q);
  }
  return queue;
}

function kpBuildShuffleQueue() {
  var pool = [];
  for (var i = 0; i < KP_POOL.length; i++) {
    var q = KP_POOL[i];
    if (q.type !== 'check') { continue; }  /* shuffle = knowledge checks only */
    if (q.applies === 'interventional' && kpStudyType === 'observational') { continue; }
    pool.push(q);
  }
  /* Fisher-Yates */
  for (var j = pool.length - 1; j > 0; j--) {
    var k = Math.floor(Math.random() * (j + 1));
    var tmp = pool[j]; pool[j] = pool[k]; pool[k] = tmp;
  }
  return pool;
}

/* ════════════════════════════════════════════
   START SEQUENCES
════════════════════════════════════════════ */

function kpStartBrowseNoTransition(topicId) {
  var topic = null;
  for (var i = 0; i < KP_TOPICS.length; i++) { if (KP_TOPICS[i].id === topicId) { topic = KP_TOPICS[i]; break; } }
  kpBrowseTopicId = topicId;
  kpBrowseType = 'check';
}

function kpStartBrowse(topicId) {
  var topic = null;
  for (var i = 0; i < KP_TOPICS.length; i++) { if (KP_TOPICS[i].id === topicId) { topic = KP_TOPICS[i]; break; } }
  kpBrowseTopicId = topicId;
  kpBrowseType = 'check';
  seqIndex = 0; seqCorrect = 0; seqChecks = 0;
  seqQueue = kpBuildBrowseQueue(topicId, 'check');
  document.getElementById('kp-seq-progress-fill').className = 'kp-seq-progress-fill browse-col';
  document.getElementById('kp-seq-title').textContent = topic ? topic.name : topicId;
  document.getElementById('kp-seq-meta').textContent = topic ? topic.sop : '';
  document.getElementById('kp-seq-back-label').textContent = 'Back';
  kpSeqRender();
  kpTransition('1', '2', false);
}

function kpSelectBrowseMode(type) {
  var topic = null;
  for (var i = 0; i < KP_TOPICS.length; i++) { if (KP_TOPICS[i].id === kpBrowseTopicId) { topic = KP_TOPICS[i]; break; } }
  kpBrowseType = type;
  seqIndex  = 0; seqCorrect = 0; seqChecks = 0;
  if (type === 'inspection') {
    seqQueue = kpBuildInspectionQueue(kpBrowseTopicId);
    document.getElementById('kp-seq-progress-fill').className = 'kp-seq-progress-fill inspection-col';
    document.getElementById('kp-seq-title').textContent = 'Inspection Prep';
    document.getElementById('kp-seq-meta').textContent  = topic ? topic.name : kpBrowseTopicId;
  } else {
    seqQueue = kpBuildBrowseQueue(kpBrowseTopicId, type);
    document.getElementById('kp-seq-progress-fill').className = 'kp-seq-progress-fill browse-col';
    document.getElementById('kp-seq-title').textContent = topic ? topic.name : kpBrowseTopicId;
    document.getElementById('kp-seq-meta').textContent  = topic ? topic.sop : '';
  }
  document.getElementById('kp-seq-back-label').textContent = 'Back';
  kpSeqRender();
  kpTransition('mode', '2', false);
}

function kpBuildInspectionQueue(topicId) {
  var queue = [];
  for (var i = 0; i < KP_INSPECTION.length; i++) {
    var q = KP_INSPECTION[i];
    if (q.topicId !== topicId) { continue; }
    if (q.applies === 'interventional' && kpStudyType === 'observational') { continue; }
    queue.push(q);
  }
  return queue;
}

var kpShuffleCount = 10;  /* persists for retry */

function kpStartShuffleWithCount(n) {
  kpShuffleCount = n;
  kpStartShuffle();
  kpTransition('count', '2', false);
}

function kpStartShuffle() {
  var full = kpBuildShuffleQueue();
  seqQueue = full.slice(0, kpShuffleCount);
  seqIndex = 0; seqCorrect = 0; seqChecks = 0;
  document.getElementById('kp-seq-title').textContent = 'Shuffle \u2014 ' + kpShuffleCount + ' questions';
  document.getElementById('kp-seq-meta').textContent  = kpStudyType === 'interventional' ? 'All topics \u00b7 Interventional' : 'All topics \u00b7 Observational';
  document.getElementById('kp-seq-back-label').textContent = 'Change count';
  document.getElementById('kp-seq-progress-fill').className = 'kp-seq-progress-fill shuffle-col';
  kpSeqRender();
}

function kpSeqBack() {
  if (kpMode === 'browse') { kpGoBack('1'); }
  else { kpGoBack('count'); }
}

/* ════════════════════════════════════════════
   SEQUENCE RENDER — one card at a time
════════════════════════════════════════════ */
function kpSeqRender() {
  var total = seqQueue.length;
  var num   = seqIndex + 1;
  var pct   = total > 0 ? ((seqIndex / total) * 100) : 0;
  document.getElementById('kp-seq-progress-fill').style.width = pct + '%';
  document.getElementById('kp-seq-progress-label').textContent = num + ' of ' + total;

  if (seqIndex >= total) { kpShowEnd(); return; }

  var q    = seqQueue[seqIndex];
  var wrap = document.getElementById('kp-seq-card-wrap');
  var keys = ['A','B','C','D'];

  /* work out type label and topic label */
  var typeLabel, topicLabel;
  if (q.group) {
    typeLabel  = q.group;
    topicLabel = 'Part ' + q.step + ' of ' + q.stepTotal;
  } else if (q.type === 'inspection') {
    typeLabel  = 'Inspection Prep';
    topicLabel = q.topic;
  } else {
    typeLabel  = 'Knowledge Check';
    topicLabel = q.topic;
  }

  var isLast = (seqIndex + 1 >= total);
  var isMidGroup = (q.group && q.step < q.stepTotal);
  var isInspectionMode = (kpBrowseType === 'inspection');
  var nextLabel = isLast
    ? (isInspectionMode ? 'Done' : 'See results')
    : (isMidGroup ? 'Continue' : 'Next question');

  var html = '<div class="kp-qcard" id="kp-qcard">';
  if (q.type !== 'inspection') {
    html += '<div class="kp-qcard-type ' + q.type + (q.group ? ' grouped' : '') + '">' + typeLabel + '</div>';
    html += '<div class="kp-qcard-topic">' + topicLabel + '</div>';
  }

  if (q.type === 'inspection') {
    html += '<div class="kp-insp-cols">';
    /* Left col — the question */
    html += '<div class="kp-insp-left">';
    html += '<div class="kp-insp-prompt">Inspector asks:</div>';
    html += '<div class="kp-insp-q">' + q.q + '</div>';
    html += '</div>';
    /* Right col — prep note + reveal */
    html += '<div class="kp-insp-right">';
    if (q.prep) {
      html += '<div class="kp-insp-prep">' + q.prep + '</div>';
    }
    html += '<button class="kp-qcard-reveal-btn inspection-btn" id="kp-reveal-btn" onclick="kpSeqReveal()">Show model response</button>';
    html += '<div class="kp-qcard-rat inspection-rat" id="kp-qcard-rat">' +
      '<div class="kp-qcard-rat-label">Model response</div>' +
      '<div class="kp-qcard-rat-text">' + llLinkifyCitations(q.model) + '</div>' +
      '<div class="kp-insp-gap"><div class="kp-insp-gap-label">Common gap</div><div class="kp-insp-gap-text">' + llLinkifyCitations(q.gap) + '</div></div>' +
      (q.ref ? '<div class="kp-qcard-rat-ref">\u2192 ' + llLinkifyCitations(q.ref) + '</div>' : '') +
      '</div>';
    html += '</div>';
    html += '</div>';
  } else if (q.type === 'check') {
    html += '<div class="kp-qcard-q">' + q.q + '</div>';
    html += '<div class="kp-qcard-opts">';
    for (var i = 0; i < q.opts.length; i++) {
      var isCorrect = (i === q.correct);
      html += '<div class="kp-qopt" onclick="kpSeqAnswer(this,' + isCorrect + ',' + i + ',' + q.correct + ')">' +
        '<span class="kp-qopt-key">' + keys[i] + '</span>' + q.opts[i] + '</div>';
    }
    html += '</div>';
    html += '<div class="kp-qcard-rat check-rat" id="kp-qcard-rat">' +
      '<div class="kp-qcard-rat-label">Answer \u2014 ' + keys[q.correct] + ' is correct</div>' +
      '<div class="kp-qcard-rat-text">' + llLinkifyCitations(q.rationale) + '</div>' +
      '<div class="kp-qcard-rat-ref">\u2192 ' + llLinkifyCitations(q.ref) + '</div></div>';
  } else {
    html += '<div class="kp-qcard-q">' + q.q + '</div>';
    html += '<div class="kp-qcard-reveal-wrap">' +
      '<button class="kp-qcard-reveal-btn" id="kp-reveal-btn" onclick="kpSeqReveal()">Think it through</button></div>';
    html += '<div class="kp-qcard-rat scenario-rat" id="kp-qcard-rat">' +
      '<div class="kp-qcard-rat-label">' + (q.group ? 'What happens next' : 'Rationale') + '</div>' +
      '<div class="kp-qcard-rat-text">' + llLinkifyCitations(q.rationale) + '</div>' +
      (q.ref ? '<div class="kp-qcard-rat-ref">\u2192 ' + llLinkifyCitations(q.ref) + '</div>' : '') +
      '</div>';
  }

  html += '<div class="kp-qcard-next-wrap" id="kp-next-wrap">' +
    '<button class="kp-qcard-next" onclick="kpSeqNext()">' +
    nextLabel +
    ' <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>' +
    '</button></div>';
  html += '</div>';

  wrap.innerHTML = html;
}

function kpSeqAnswer(opt, isCorrect, chosenIdx, correctIdx) {
  var card = document.getElementById('kp-qcard');
  if (!card || card.classList.contains('answered')) { return; }
  card.classList.add('answered');
  var opts = card.querySelectorAll('.kp-qopt');
  for (var i = 0; i < opts.length; i++) {
    opts[i].classList.add('disabled');
    if (i === chosenIdx) { opts[i].classList.add(isCorrect ? 'correct' : 'wrong'); }
    else if (i === correctIdx && !isCorrect) { opts[i].classList.add('correct'); }
    else { opts[i].classList.add('neutral-out'); }
  }
  var rat = document.getElementById('kp-qcard-rat');
  if (rat) { rat.classList.add('visible'); }
  var nw = document.getElementById('kp-next-wrap');
  if (nw) { nw.classList.add('visible'); }
  seqChecks++;
  if (isCorrect) { seqCorrect++; }
}

function kpSeqReveal() {
  var btn = document.getElementById('kp-reveal-btn');
  var rat = document.getElementById('kp-qcard-rat');
  var nw  = document.getElementById('kp-next-wrap');
  if (rat) { rat.classList.add('visible'); setTimeout(function() { rat.scrollIntoView({ behavior: 'smooth', block: 'nearest' }); }, 50); }
  if (nw)  { nw.classList.add('visible'); }
  if (btn) { btn.textContent = 'Hide rationale'; btn.onclick = kpSeqHideReveal; }
}
function kpSeqHideReveal() {
  var btn = document.getElementById('kp-reveal-btn');
  var rat = document.getElementById('kp-qcard-rat');
  if (rat) { rat.classList.remove('visible'); }
  if (btn) { btn.textContent = 'Think it through'; btn.onclick = kpSeqReveal; }
}

function kpSeqNext() {
  if (seqTransitioning) { return; }
  seqTransitioning = true;
  var card = document.getElementById('kp-qcard');
  if (card) {
    card.classList.add('exiting');
    setTimeout(function() {
      seqIndex++;
      seqTransitioning = false;
      var total = seqQueue.length;
      var pct   = total > 0 ? ((seqIndex / total) * 100) : 100;
      document.getElementById('kp-seq-progress-fill').style.width = pct + '%';
      if (seqIndex >= total) {
        /* small pause so progress bar hits 100% before end screen */
        setTimeout(function() { kpShowEnd(); }, 200);
      } else {
        document.getElementById('kp-seq-progress-label').textContent = (seqIndex + 1) + ' of ' + total;
        kpSeqRender();
      }
    }, 230);
  } else {
    seqIndex++;
    seqTransitioning = false;
    kpSeqRender();
  }
}

/* ════════════════════════════════════════════
   END SCREEN
════════════════════════════════════════════ */
function kpShowEnd() {
  var total = seqQueue.length;

  var feedback = '';

  document.getElementById('end-score-num').innerHTML = seqCorrect + '<span>/' + seqChecks + '</span>';
  document.getElementById('end-score-label').textContent = 'correct';
  document.getElementById('end-breakdown').innerHTML = '';
  if (seqCorrect === seqChecks) {
    feedback = 'Perfect score \u2014 solid command of this material. Move on to another topic or try the shuffle for a mixed review.';
  } else if (seqCorrect >= Math.ceil(seqChecks * 0.8)) {
    feedback = 'Strong result. Review the rationale on any questions you weren\u2019t sure about \u2014 the details tend to matter in practice.';
  } else if (seqCorrect >= Math.ceil(seqChecks * 0.6)) {
    feedback = 'A few gaps worth revisiting. Read through the rationale on the ones you missed \u2014 the source SOP links are there if you want to go deeper.';
  } else {
    feedback = 'This material takes repetition. Try again and focus on the rationale \u2014 understanding the reasoning is more useful than memorizing answers.';
  }

  document.getElementById('end-feedback').textContent = feedback;

  /* eyebrow */
  document.getElementById('end-eyebrow').textContent =
    kpMode === 'browse' ? 'Topic complete' : 'Shuffle complete';

  /* button labels */
  document.getElementById('end-btn-primary-label').textContent =
    kpMode === 'shuffle' ? 'Shuffle again' : 'Try again';
  document.getElementById('end-btn-ghost-label').textContent =
    kpMode === 'browse' ? 'Back to topics' : 'Change count';

  kpTransition('2', '3', false);
}

function kpEndPrimary() {
  /* retry — re-run same count for shuffle, same queue type for browse */
  if (kpMode === 'shuffle') {
    var full = kpBuildShuffleQueue();
    seqQueue = full.slice(0, kpShuffleCount);
    document.getElementById('kp-seq-title').textContent = 'Shuffle \u2014 ' + kpShuffleCount + ' questions';
  } else {
    seqQueue = kpBuildBrowseQueue(kpBrowseTopicId, kpBrowseType);
  }
  seqIndex = 0; seqCorrect = 0; seqChecks = 0;
  kpSeqRender();
  var fill = document.getElementById('kp-seq-progress-fill');
  if (fill) { fill.style.width = '0%'; }
  document.getElementById('kp-seq-progress-label').textContent = '1 of ' + seqQueue.length;
  kpTransition('3', '2', true);
}

function kpEndGhost() {
  if (kpMode === 'browse') { kpTransition('3', '1', true); }
  else { kpTransition('3', 'count', true); }
}

/* ════════════════════════════════════════════
   NAV DRAWER
════════════════════════════════════════════ */
function toggleDA(btn) {
  var sub = btn.nextElementSibling;
  var isOpen = sub.classList.contains('open');
  var allSubs = document.querySelectorAll('.da-sub.open');
  var allBtns = document.querySelectorAll('.da-trigger.open');
  for (var i = 0; i < allSubs.length; i++) { allSubs[i].classList.remove('open'); }
  for (var i = 0; i < allBtns.length; i++) { allBtns[i].classList.remove('open'); }
  if (!isOpen) { sub.classList.add('open'); btn.classList.add('open'); }
}
function toggleDASec(btn) {
  var sub = btn.nextElementSibling;
  var isOpen = sub.classList.contains('open');
  sub.classList.toggle('open', !isOpen);
  btn.classList.toggle('open', !isOpen);
}

/* ════════════════════════════════════════════
   INCLUDES
════════════════════════════════════════════ */
/* ════════════════════════════════════════════
   HASH ROUTING
════════════════════════════════════════════ */


/* ════════════════════════════════════════════
   TEAM EXERCISES
════════════════════════════════════════════ */
var kpTeCurrentSlug = '';

function kpStartTeamExercise(slug) {
  kpTeCurrentSlug = slug;
  kpTransition(kpCurrentPhaseId, 'te-' + slug, false);
}

function kpStartTeamExerciseDirect(slug) {
  kpTeCurrentSlug = slug;
  kpActivateDirect('te-' + slug);
}

function teToggle(btn) {
  var body = btn.nextElementSibling;
  var isOpen = body.classList.contains('open');
  body.classList.toggle('open', !isOpen);
  btn.classList.toggle('open', !isOpen);
}

function printVersion(type) {
  if (type === 'facilitator') { document.body.classList.add('print-facilitator'); }
  else { document.body.classList.remove('print-facilitator'); }
  window.print();
  document.body.classList.remove('print-facilitator');
}

/* Map a phase ID to its canonical hash string */
function kpHashFor(phaseId) {
  var map = {
    '0':            '',
    'entry':        'practice',
    'studytype':    'practice/' + kpMode + '/' + kpStudyType,
    'count':        'shuffle/' + kpStudyType,
    '1':            'browse/' + kpStudyType,
    '2':            'browse/' + kpStudyType + '/' + kpBrowseTopicId,
    '3':            'browse/' + kpStudyType + '/' + kpBrowseTopicId + '/end',
    'team-hub':     'team',
    'docreview-hub':'docreview',
    'docreview':    'docreview/' + (kpDrCurrentExercise ? kpDrExerciseId : ''),
    'te-delegation': 'team/delegation',
    'te-consent': 'team/consent',
    'te-sae': 'team/sae',
    'te-deviations': 'team/deviations',
    'te-monitoring': 'team/monitoring',
    'te-data': 'team/data',
    'te-recruitment': 'team/recruitment',
    'te-gcp': 'team/gcp',
    'jc-hub': 'judgement-calls',
    'jc-role': 'judgement-calls/' + jcCurrentRoleId,
    'jc-scenario': 'judgement-calls/' + jcCurrentRoleId + '/' + (jcCurrentScenario ? jcCurrentScenario.id : ''),
    'insp-hub': 'inspection-prep',
    'insp-practice': 'inspection-prep/' + inspCurrentTopicId
  };
  var hash = map[phaseId];
  return (hash !== undefined && hash !== null) ? hash : phaseId;
}

function kpPushHash(phaseId) {
  var hash = kpHashFor(phaseId);
  var newHash = hash ? ('#' + hash) : (window.location.pathname + window.location.search);
  history.pushState({ phase: phaseId }, '', newHash || window.location.pathname);
}

/* Activate a phase directly without animation — used by router on load/popstate */
function kpActivateDirect(phaseId) {
  var allPhases = document.querySelectorAll('.kp-phase');
  for (var i = 0; i < allPhases.length; i++) {
    allPhases[i].classList.remove('phase-active');
    allPhases[i].style.animation = '';
  }
  var target = document.getElementById('kp-phase-' + phaseId);
  if (target) {
    target.classList.add('phase-active');
    kpCurrentPhaseId = String(phaseId);
    kpTransitioning = false;
  }
}

/* Parse hash and restore the correct phase + state */
function kpRouteFromHash() {
  var raw = window.location.hash.replace('#', '');
  var parts = raw ? raw.split('/') : [];
  var p0 = parts[0] || '';
  var p1 = parts[1] || '';
  var p2 = parts[2] || '';
  var p3 = parts[3] || '';

  if (!p0) {
    kpActivateDirect('0');
    return;
  }
  if (p0 === 'practice' && !p1) {
    kpActivateDirect('entry');
    return;
  }
  if (p0 === 'practice' && p1 && p2) {
    /* practice/[mode]/[studytype] — restore studytype screen */
    kpMode = p1;
    kpStudyType = p2;
    var lbl = document.getElementById('studytype-mode-label');
    if (lbl) { lbl.textContent = p1 === 'browse' ? 'Browse' : 'Shuffle'; lbl.className = 'kp-studytype-label ' + (p1 === 'browse' ? 'browse-col' : 'shuffle-col'); }
    kpActivateDirect('studytype');
    return;
  }
  if (p0 === 'shuffle' && p1) {
    kpMode = 'shuffle';
    kpStudyType = p1;
    kpActivateDirect('count');
    return;
  }
  if (p0 === 'browse' && p1 && !p2) {
    kpMode = 'browse';
    kpStudyType = p1;
    kpBuildTopicGrid();
    kpActivateDirect('1');
    return;
  }
  if (p0 === 'browse' && p1 && p2 && !p3) {
    kpMode = 'browse';
    kpStudyType = p1;
    kpBrowseTopicId = p2;
    kpStartBrowseNoTransition(p2);
    kpBuildTopicGrid();
    kpActivateDirect('1');
    return;
  }
  if (p0 === 'browse' && p1 && p2 && p3 && p3 !== 'end') {
    /* deep link to question sequence — restore to topic grid */
    kpMode = 'browse';
    kpStudyType = p1;
    kpBrowseTopicId = p2;
    kpStartBrowseNoTransition(p2);
    kpBuildTopicGrid();
    kpActivateDirect('1');
    return;
  }
  if (p0 === 'team' && !p1) {
    kpActivateDirect('team-hub');
    return;
  }
  if (p0 === 'team' && p1) {
    kpStartTeamExerciseDirect(p1);
    return;
  }
  if (p0 === 'docreview' && !p1) {
    kpActivateDirect('docreview-hub');
    return;
  }
  if (p0 === 'docreview' && p1) {
    kpDrExerciseId = p1;
    kpStartDocReviewDirect(p1);
    return;
  }
  if (p0 === 'inspection-prep' && !p1) {
    kpActivateDirect('insp-hub');
    inspBuildHub();
    return;
  }
  if (p0 === 'inspection-prep' && p1) {
    inspStartTopicDirect(p1);
    return;
  }
  if (p0 === 'judgement-calls' && !p1) {
    kpActivateDirect('jc-hub');
    jcBuildHub();
    return;
  }
  if (p0 === 'judgement-calls' && p1 && p2) {
    jcCurrentRoleId = p1;
    jcStartScenarioDirect(p2);
    return;
  }
  if (p0 === 'judgement-calls' && p1 && !p2) {
    /* p1 could be a role ID or a scenario ID (old 2-part format) */
    /* Check if p1 matches a role first */
    var isRole = false;
    for (var ri = 0; ri < JC_ROLES.length; ri++) { if (JC_ROLES[ri].id === p1) { isRole = true; break; } }
    if (isRole) {
      jcCurrentRoleId = p1;
      jcBuildRole(p1);
      kpActivateDirect('jc-role');
      return;
    }
    /* Otherwise try as a scenario ID */
    for (var si = 0; si < JC_SCENARIOS.length; si++) {
      if (JC_SCENARIOS[si].id === p1) {
        jcCurrentRoleId = JC_SCENARIOS[si].role;
        jcStartScenarioDirect(p1);
        return;
      }
    }
    /* Neither — fall back to hub */
    kpActivateDirect('jc-hub');
    jcBuildHub();
    return;
  }
  /* fallback */
  kpActivateDirect('0');
}

/* popstate — browser back/forward */
window.addEventListener('popstate', function(e) {
  kpTransitioning = false;
  kpRouteFromHash();
});

function loadInclude(url, id, cb) {
  // Guard: only fetch when the target element exists on this page.
  if (!document.getElementById(id)) return;
  fetch(url).then(function(r) { return r.text(); }).then(function(html) {
    var el = document.getElementById(id);
    if (!el) return;
    el.innerHTML = html;
    var scripts = el.querySelectorAll('script');
    for (var i = 0; i < scripts.length; i++) {
      var s = document.createElement('script');
      s.textContent = scripts[i].textContent;
      document.head.appendChild(s);
    }
    if (cb) { cb(); }
  });
}
loadInclude('nav.html', 'site-nav');
loadInclude('footer.html', 'site-footer');

/* ── Compute entry card stats on load ── */
(function() {
  /* count live topics */
  var liveTopics = 0;
  for (var i = 0; i < KP_TOPICS.length; i++) {
    if (KP_TOPICS[i].live) { liveTopics++; }
  }
  /* total questions in pool */
  var totalQ = KP_POOL.length;
  var el;
  el = document.getElementById('stat-topics');
  if (el) { el.textContent = liveTopics; }
  el = document.getElementById('stat-questions');
  if (el) { el.textContent = totalQ; }

  /* auto-launch doc review exercise if returning from hub */
  var drExercise = sessionStorage.getItem('drExercise');
  if (drExercise) {
    sessionStorage.removeItem('drExercise');
    kpGoToDocReviewHub();
    kpStartDocReview(drExercise);
  }
}());

/* ════════════════════════════════════════════
   DOCUMENT REVIEW
════════════════════════════════════════════ */
var KP_DR_EXERCISES = {
  'delegation': {
    caseFile: '<p>The study <strong>ONCO-2026-001</strong> is a Phase II oncology drug trial at the RI-MUHC, with <strong>Dr. M. Lavoie</strong> as Qualified Investigator. The study activated on <strong>January 15, 2026</strong>.</p><p>You also have the following from HR records: <strong>Sophie Leclerc</strong> joined on <strong>April 10, 2026</strong>. <strong>Kevin Tremblay</strong> left on <strong>February 28, 2026</strong>. <strong>Patrick Chen’s</strong> first source document entry is dated <strong>December 14, 2025</strong>.</p><p>Review the delegation log below. Use the arrows to step through each finding.</p>',
    /* row indices (0-based) that have errors */
    errorRows: [0, 1, 3, 4],
    /* which row each finding highlights (null = no highlight) */
    findingRows: [0, 3, 4, 1, 4, null],
    findingCells: [2, 3, 3, 6, 2, null],
    findings: [
      { type:'error', who:'Marie Dupont',
        problem:'“All study activities” is not an acceptable task description.',
        why:'This is not specific enough to allow a monitor or inspector to verify that delegation matches the tasks actually performed. ICH E6(R3) §2.3.3 requires documentation proportionate to the significance of activities.',
        fix:'Tasks should be listed specifically — e.g. “eligibility screening, source document completion, participant follow-up, SAE documentation, CRF data entry.” If the CRC’s role is broad, the tasks should still be enumerated.',
        ref:'ICH E6(R3) §2.3.3 · C.05.012' },
      { type:'error', who:'Sophie Leclerc',
        problem:'Added April 22 — but HR records show she joined the study April 10.',
        why:'Sophie may have performed study tasks between April 10 and April 22 before she was added to the delegation log. Inspectors compare delegation log entry dates against first-activity dates in source records.',
        fix:'Sophie should have been added to the log on or before her first day of study activity. Tasks performed before delegation was documented represent a deviation.',
        ref:'ICH E6(R3) §2.3.3 · C.05.012' },
      { type:'error', who:'Patrick Chen',
        problem:'First source document entry December 14, 2025 — delegation log entry January 8, 2026.',
        why:'Patrick performed study tasks approximately 25 days before he was added to the delegation log, meaning he was performing activities without authorization during that period.',
        fix:'Patrick should have been added to the delegation log before his first study activity. The January date does not retroactively authorize the December activities.',
        ref:'ICH E6(R3) §2.3.3 · C.05.012' },
      { type:'error', who:'Kevin Tremblay',
        problem:'No end date recorded, despite leaving the study February 28, 2026.',
        why:'The delegation log should reflect who is currently authorized. Leaving a former staff member on the log without a removal date implies Kevin is still authorized to act on the study.',
        fix:'When Kevin left, his removal date should have been recorded. This provides a clean audit trail of the period during which he was authorized.',
        ref:'ICH E6(R3) §2.3.3 · C.05.012' },
      { type:'flag', who:'Patrick Chen',
        problem:'Delegated for “eligibility screening” — Kevin was only delegated for “data entry.”',
        why:'Both are Research Assistants, but Patrick has broader delegation. A monitor would ask whether Patrick is qualified for eligibility screening in a way Kevin was not — and the answer should be in the training records.',
        fix:'Ensure training records for Patrick support the eligibility screening task. If he completed additional training, that distinction should be documented and findable.',
        ref:'ICH E6(R3) §2.3.2 · C.05.010(g)' },
      { type:'flag', who:'Compounding consequence',
        problem:'Patrick’s December activities may have affected participant enrolment validity.',
        why:'If any participants were enrolled based on eligibility assessments that included Patrick’s undocumented work, those enrolment records are potentially problematic. One documentation gap can become a data validity issue.',
        fix:'Review enrolment records from December 14 to January 8. For any participants where Patrick’s work contributed to the eligibility determination, consider whether re-confirmation by a properly delegated team member is warranted.',
        ref:'ICH E6(R3) §2.3.2, §2.3.3' }
    ]
  },

  'consent': {
    caseFile: '<p>The study <strong>NEURO-2026-002</strong> is a Phase III Alzheimer’s trial. <strong>Mrs. Marguerite Beaumont</strong>, age 74, has a documented diagnosis of mild Alzheimer’s disease. Her first language is <strong>French</strong>. The consent discussion and eligibility screening labs both took place at the same visit on <strong>May 14, 2026</strong>. The study sponsor is a US company; participant data will be transferred to a US-based data management system.</p><p>Review the consent form signature page below. Use the arrows to step through each finding.</p>',
    errorRows: [0, 1, 2, 3, 4, 5],
    findingRows: [0, 1, 2, 4, 5, 3],
    findingCells: [1, 1, 1, 1, 1, 1],
    findings: [
      { type:'error', who:'Version control',
        problem:'The consent form is dated March 15, 2026 — but REB approval was not granted until April 3, 2026.',
        why:'The form version used predates REB approval. Any participant who signed this version before April 3 consented on a form that had not yet been approved. This is a serious GCP violation affecting data validity and the integrity of the consent process.',
        fix:'Consent must not be obtained using a version of the form until that version has received REB approval. The site should verify that no participants signed before April 3, 2026. If any did, this must be reported as a deviation.',
        ref:'ICH E6(R3) §2.8 · C.05.010(h) · TCPS2 Art. 3.2' },
      { type:'error', who:'Language',
        problem:'The consent form is in English only. Mrs. Beaumont’s first language is French.',
        why:'Quebec’s Charter of the French Language and MUHC institutional policy require that consent materials be available in French. Proceeding with an English-only consent process for a French-speaking participant is both a regulatory gap and an ethical concern about genuine comprehension.',
        fix:'Consent forms must be available in French. An interpreter is not a substitute for a translated consent form. This should have been identified at study activation and a French version obtained from the sponsor or translated.',
        ref:'Charter of the French Language · MUHC institutional policy · TCPS2 Art. 3.2' },
      { type:'error', who:'Timing',
        problem:'Consent and screening labs both took place on May 14 — same day, same visit.',
        why:'If screening labs were drawn before consent was signed, that is a serious GCP violation: study procedures before consent. Even if consent was obtained first, same-day enrollment of a 74-year-old with mild cognitive impairment raises questions about whether adequate time was offered to consider participation.',
        fix:'The source record should document the exact sequence: consent obtained at [time], then labs drawn at [time]. If the sequence is unclear or undocumented, this is a finding. Participants should generally be offered time between the consent discussion and signing.',
        ref:'ICH E6(R3) §2.8.1 · TCPS2 Art. 3.1, 3.2' },
      { type:'error', who:'Witness signature',
        problem:'Witness signature and date lines are blank.',
        why:'For a study involving participants with documented cognitive impairment, a witness signature is standard practice and may be required by the protocol or REB. A blank witness line for this population will be questioned by any monitor or inspector.',
        fix:'Check the protocol and REB approval to confirm whether a witness signature is required for this participant population. If required, the omission is a deviation. If not strictly required, the absence is still notable for a participant with mild Alzheimer’s disease.',
        ref:'ICH E6(R3) §2.8 · Protocol-specific requirements' },
      { type:'error', who:'PI signature date',
        problem:'Participant signed May 14. PI signed May 18 — four days later.',
        why:'This creates a documentation anomaly: the PI’s signature implies review and approval, but it occurred 4 days after the participant signed. A monitor seeing this pattern will ask whether the PI was present for the consent discussion, and what the PI signature actually represents.',
        fix:'If the PI signature indicates review of the consent process (not presence during the discussion), that should be clearly defined in the protocol or SOP. The delay is more explainable in that context — but it still looks like a retrospective endorsement and requires explanation.',
        ref:'ICH E6(R3) §2.8.5 · SOP-CR-008 · ALCOA+ (contemporaneous)' },
      { type:'flag', who:'André Tremblay (CRC)',
        problem:'A CRC conducted the consent discussion for a participant with mild Alzheimer’s disease.',
        why:'For a study involving participants with cognitive impairment, the consent discussion by a CRC rather than a physician warrants scrutiny. Was André delegated for consent? Is he qualified under applicable law for this population? The delegation log should confirm authorization.',
        fix:'Check the delegation log to confirm André is delegated for consent. Confirm the protocol and REB approval address who may conduct consent for this population. In Quebec, the Civil Code adds requirements about capacity assessment that may affect whether a CRC is appropriate.',
        ref:'ICH E6(R3) §2.8.5, §2.3.2 · Civil Code Art. 20–21 · SOP-CR-008' }
    ]
  },

  'sae': {
    caseFile: '<p>The study is <strong>ONCO-IMM-2026-003</strong>, a Phase II oncology immunotherapy trial at the RI-MUHC. <strong>PT-019</strong> was enrolled 6 weeks ago. The participant’s spouse left a voicemail for Sophie (CRC) on <strong>Friday March 14 at 4:48 PM</strong> stating the participant was admitted to hospital <em>that morning</em> with Grade 3 pneumonitis and has been in the ICU since.</p><p>Sophie is delegated for SAE documentation and source record completion. Dr. Beaumont is delegated for medical assessments. The QI is Dr. Ndiaye, who was at a conference and not reachable. The current IB at the site is <strong>version 5.2</strong> (received February 2026), which classifies Grade 3 pneumonitis as <strong>unexpected</strong>. Three other sites have reported Grade 3 pneumonitis in the same week.</p><p>Review the SAE report below. Use the arrows to step through each finding.</p>',
    errorRows: [2, 7, 11, 9, 13],
    findingRows: [2, 7, 11, 9, 13, null],
    findingCells: [1, 1, 1, 1, 1, null],
    findings: [
      { type:'error', who:'Site awareness date',
        problem:'Site awareness date recorded as March 17 (Monday) — but Sophie received the voicemail on Friday March 14 at 4:48 PM.',
        why:'Writing Monday as the awareness date when the site became aware on Friday is falsification of a regulatory record. The reporting clock under the protocol and under Division 5 both run from awareness date. Recording Monday makes the timeline appear compliant when it may not be.',
        fix:'The awareness date should be March 14. The form can note that the PI was unreachable, a sub-investigator was contacted by phone for preliminary assessment, and the form was completed Monday. Both dates should be accurate with the reason for the gap explained.',
        ref:'ICH E6(R3) §2.7.2 · ALCOA+ (contemporaneous, accurate) · C.05.014' },
      { type:'error', who:'Relatedness assessed by CRC',
        problem:'The relatedness assessment (“possibly related”) is entered by Sophie Martin, CRC.',
        why:'Causality assessment is a medical judgment that must be made by a qualified physician. Sophie is delegated for SAE documentation and source record completion — not medical assessment. Dr. Beaumont gave a verbal assessment but it is not documented and she did not sign the field.',
        fix:'Dr. Beaumont should have reviewed and signed the causality assessment, even if done later with appropriate dating. The form should reflect physician determination, not CRC determination.',
        ref:'ICH E6(R3) §2.7.2 · C.05.010(f) · SOP-CR-012' },
      { type:'error', who:'IB version used for expectedness',
        problem:'The expectedness determination was made against IB version 4.1 (2023). The site received IB version 5.2 in February 2026 — before this event.',
        why:'Version 5.2 classifies Grade 3 pneumonitis as unexpected. Using an outdated IB version changed the classification from potential SUSAR to “expected” — a significant error affecting regulatory reporting obligations. If this is a SUSAR under the current IB, the sponsor has a 7-day reporting obligation to Health Canada.',
        fix:'Expectedness must be assessed against the current IB version at the time of the event. The site should have used v5.2, which was already on file. The correct determination is unexpected, which triggers SUSAR classification.',
        ref:'ICH E2A · C.05.001 (definition of unexpected) · ICH E6(R3) §3.13.2(c)' },
      { type:'error', who:'QI signature date',
        problem:'Dr. Ndiaye signed March 21 — 7 days after site awareness on March 14.',
        why:'The SAE was submitted to the sponsor on March 18 (Tuesday) without any physician signature — Dr. Beaumont verbally assessed but did not sign anything. The form was submitted without complete medical authorization. Dr. Ndiaye’s signature 7 days later raises the question of who authorized the submission.',
        fix:'The preliminary SAE form should have been submitted with a note identifying Dr. Beaumont’s verbal assessment and indicating the form was pending formal physician signature. Dr. Beaumont should have signed the form when she returned Monday, not Dr. Ndiaye a week later.',
        ref:'ICH E6(R3) §2.7.2 · SOP-CR-012 · ALCOA+ (attributable)' },
      { type:'error', who:'REB notification',
        problem:'No REB notification submitted as of March 21 — 7 days after site awareness.',
        why:'The MUHC REB has its own SAE/SUSAR notification requirements that run independently of the sponsor’s Health Canada reporting obligations. The site cannot wait for the sponsor to file before notifying the REB. Given that this event may be a SUSAR under the correct IB version, the urgency is heightened.',
        fix:'REB notification should have been submitted within the REB’s required timeframe from site awareness. Check the REB’s SAE/SUSAR policy and submit immediately.',
        ref:'TCPS2 Art. 11.7–11.9 · MUHC REB policies · ICH E6(R3) §2.7' },
      { type:'flag', who:'Cascade effect',
        problem:'Error 3 (wrong IB) → incorrect “expected” determination → event not classified as SUSAR → 7-day Health Canada clock not triggered. Combined with Error 1 (wrong awareness date), the entire reporting timeline is unreliable.',
        why:'A single documentation habit (not maintaining the current IB working copy) and a single shortcut (recording the wrong awareness date) have combined to create a potentially serious compliance failure. Neither error alone would have been catastrophic; together they undermine the integrity of the entire SAE record.',
        fix:'IB version control and contemporaneous awareness documentation are two of the most foundational SAE reporting practices. Both have SOPs for a reason.',
        ref:'C.05.001 · C.05.014 · ICH E2A · SOP-CR-012' }
    ]
  },

  'deviations': {
    caseFile: '<p>The study is <strong>CARDIO-2023-008</strong>, a Phase III hypertension trial at the RI-MUHC. QI is <strong>Dr. R. Patel</strong>. The protocol explicitly states: <strong>eligibility deviations involving primary inclusion/exclusion criteria are important protocol deviations</strong>, and <strong>prohibited concomitant medications represent important deviations requiring expedited reporting</strong>.</p><p>Review the protocol deviation log. Identify all problems with the classifications, documentation, CAPAs, or process implied.</p>',
    errorRows: [0, 1, 2, 3, 4],
    findingRows: [0, 1, 2, 3, 4, null],
    findingCells: [4, 4, 6, 4, 7, null],
    findings: [
      { type:'error', who:'Deviation #001 classification',
        problem:'Deviation #001 (PT-003, SBP 159 mmHg) is classified as non-important.',
        why:'The protocol explicitly states eligibility deviations involving primary inclusion/exclusion criteria are important. Misclassifying it avoided sponsor and REB notifications. In an audit, the misclassification is a more serious finding than the deviation itself.',
        fix:'Reclassify as important. Report to sponsor and REB. Develop a substantive CAPA. “Staff reminded of criteria” is not a CAPA for an important eligibility deviation resulting in an ineligible participant.',
        ref:'ICH E6(R3) §2.5.2 · C.05.010(a) · Protocol classification criteria' },
      { type:'error', who:'Deviation #002 — not a deviation',
        problem:'PT-007’s Week 8 visit on Day 61 is logged as a deviation. Protocol window: Day 56 ±7 = Days 49–63. Day 61 is within window.',
        why:'Logging a non-deviation creates noise in the log and signals the site doesn’t understand its own protocol. An auditor will question every other entry.',
        fix:'Remove or annotate with the correct calculation and documentation of the correction.',
        ref:'ICH E6(R3) §2.5.2 · Protocol visit window table' },
      { type:'error', who:'Deviation #003 REB notification',
        problem:'Sponsor notified January 8. REB not notified until January 22 — 14 days later.',
        why:'REB reporting is independent of sponsor notification. Additionally, this deviation involves a drug interaction safety concern with no documented physician safety assessment for PT-011.',
        fix:'REB notification should be concurrent with sponsor notification. A physician safety assessment and management plan for PT-011’s ramipril use must be documented.',
        ref:'TCPS2 Art. 11.7–11.9 · ICH E6(R3) §2.7.2 · MUHC REB policies' },
      { type:'error', who:'Deviation #004 classification',
        problem:'PT-014’s 68% adherence (required ≥80%) is classified as non-important with no notifications.',
        why:'If the protocol classifies adherence threshold breaches as important, this must be reclassified. The CAPA (“participant counselled”) doesn’t address why adherence was low. PT-014 is now at 71% at Week 8 — the CAPA was ineffective.',
        fix:'Review classification criteria. If important: reclassify, report, and develop a root cause CAPA addressing why adherence is low.',
        ref:'ICH E6(R3) §2.5.2 · CAPA principles · Protocol-specific thresholds' },
      { type:'error', who:'Deviation #005 — no escalation',
        problem:'PT-003’s eligibility deviation appears a second time. Response: “same as #001 — no new action.”',
        why:'A recurring important deviation requires root cause analysis, escalated CAPA, and sponsor notification of the recurrence. “No new action” proves the CAPA for #001 failed.',
        fix:'Escalated response required: new substantive CAPA and sponsor notification of recurrence.',
        ref:'ICH E6(R3) §3.9.3 · CAPA principles' },
      { type:'flag', who:'Systemic pattern',
        problem:'Two misclassified eligibility entries, a non-deviation logged as one, a safety-relevant deviation with inadequate follow-up, and cosmetic CAPAs throughout.',
        why:'An inspector will not treat these as isolated errors. Together they suggest either a fundamental misunderstanding of deviation management or deliberate under-reporting. The pattern is the finding.',
        fix:'Full audit of all deviations. Training on classification, CAPA methodology, and REB notification. PI review and sign-off on all reclassifications.',
        ref:'ICH E6(R3) §2.5.2, §3.9.3 · C.05.010 · Quality management principles' }
    ]
  },

  'monitoring': {
    caseFile: '<p>The study is <strong>CARDIO-2023-008</strong>. CRA J. Fontaine conducted a monitoring visit on <strong>October 15, 2026</strong>. The site submitted written responses on November 12, 2026.</p><p>The table below shows the CRA’s observations (left) and the site’s responses (right). Review each response. Identify what is wrong with it and what a better response would look like. Use the arrows to step through each finding.</p>',
    errorRows: [0, 1, 2, 3, 4],
    findingRows: [0, 1, 2, 3, 4],
    findingCells: [2, 2, 2, 2, 2],
    findings: [
      { type:'error', who:'Response to #1 (consent before REB approval)',
        problem:'“Approval was imminent” is not a GCP standard. The participant’s convenience is irrelevant to the regulatory requirement.',
        why:'The response does not acknowledge this as a deviation, does not document it as such, and proposes no CAPA. “Approval was imminent” sounds like a rationalization, not a compliance response. An inspector will read this as the site not understanding — or not accepting — the rule.',
        fix:'“We have identified this as a protocol deviation — consent was obtained 3 days before REB approval for v2.1. We have documented this as an important deviation and reported it to the REB. CAPA: revised workflow requiring verification of REB approval date before any consent discussion is scheduled. We are reviewing other participant files to confirm this was isolated.”',
        ref:'ICH E6(R3) §2.8 · TCPS2 Art. 3.2 · C.05.010(h)' },
      { type:'error', who:'Response to #2 (retroactive delegation)',
        problem:'“Helping informally” is not a GCP concept. “He is fully trained” does not resolve the retroactive authorization problem.',
        why:'The response accepts the finding without addressing its significance. If Patrick performed study tasks before being delegated, those tasks were unauthorized. The response needs to acknowledge this, document it as a deviation, and explain the CAPA.',
        fix:'“We confirm Patrick performed tasks from December 14 prior to his January 8 log entry. This is a documentation gap. We have logged this as a deviation. CAPA: delegation log entries must be completed before any staff member begins study-specific tasks. Note: Patrick had completed protocol training on [date] prior to December 14.”',
        ref:'ICH E6(R3) §2.3.2 · C.05.010(f)' },
      { type:'error', who:'Response to #3 (open queries)',
        problem:'“We are working on these. The study team has been very busy.” No timeline, no explanation of progress, no evidence of action.',
        why:'Three queries open for almost 3 months at the time of the visit (nearly 4 at the time of the response) is a quality system failure. An inadequate response to this finding signals that the site still doesn’t recognize it as a problem.',
        fix:'“Query for PT-007 (BP entry): we are requesting clarification from the attending physician by [date]. Query for PT-011 (concomitant meds): Dr. Patel reviewed on [date] — CRF correction submitted [date]. Query for PT-014 (adherence): documented in deviation log — see CAPA. All three will be resolved by [specific date].”',
        ref:'ICH E6(R3) §2.12 · §3.11.4.5' },
      { type:'error', who:'Response to #4 (IB version)',
        problem:'“The sponsor did not notify us that we needed to update it.” Shifts responsibility and does not acknowledge the downstream consequence.',
        why:'Sponsors distribute IB updates expecting sites to file and use them. The site has an obligation to maintain the current IB. This response also ignores the critical downstream consequence: SAE assessments made against the wrong IB version may have led to incorrect SUSAR classification.',
        fix:'“We have identified that IB v5.2 was distributed in February 2026 but not filed in the ISF or communicated to the team. We have now filed v5.2 and conducted a retrospective review of SAE/AE assessments made against v5.0 between February and October 2024. [Describe findings.] CAPA: defined process for receiving, filing, and communicating IB updates including a protocol training refresh when IBs change.”',
        ref:'ICH E2A · C.05.001 · ICH E6(R3) §3.13.2(c)' },
      { type:'error', who:'Response to #5 (awareness date)',
        problem:'“The CRC was not able to process the SAE until Monday.” Processing capacity does not change awareness.',
        why:'The site awareness date is when the CRC received the call — Friday at 4:48 PM. The response implicitly acknowledges the Monday date is wrong, without acknowledging that this is incorrect documentation of a regulatory record. This is a more serious framing problem than the original error.',
        fix:'“We acknowledge the site awareness date should be March 14, the date the CRC received the call. The March 17 entry was an error. We have filed a corrected SAE narrative noting the actual awareness date of March 14 and confirming our reporting obligations were met within the required timeline from that date. CAPA: revised SAE procedure requiring immediate source document notation of all participant communications including date and time of awareness.”',
        ref:'ICH E6(R3) §2.7.2 · ALCOA+ (accurate, contemporaneous) · C.05.014' }
    ]
  },

  'data': {
    caseFile: '<p>The study is <strong>CARDIO-2023-008</strong>, a Phase II antihypertensive trial. Participant <strong>PT-008</strong> attended the Week 8 visit on <strong>March 15, 2026</strong>. The CRC is F. Martin.</p><p><strong>OACIS record (clinic nurse, 09:15):</strong> BP 168/94 mmHg. The protocol requires BP measured at the start of each visit in the research clinic setting.</p><p>Review the study worksheet and CRF entry below. Identify all data integrity violations or concerns.</p>',
    errorRows: [0, 2, 4, 5],
    findingRows: [0, 2, 4, 5, 5, null],
    findingCells: [1, 2, 1, 1, 2, null],
    findings: [
      { type:'error', who:'Worksheet — Systolic BP correction',
        problem:'168 mmHg crossed out in red marker, 142 written above. No initials, no date, no reason. OACIS shows 168. CRF shows 142.',
        why:'ALCOA+ Attributable: who made the correction is unknown. Accurate: the change contradicts both OACIS and the original worksheet entry. The only consistent value across all sources is 168 — the “correction” appears to have introduced an error on the primary efficacy endpoint.',
        fix:'Single line through 168, initials, date, reason. Then investigate where 142 came from. If 168 is correct, the CRF must be corrected with documented rationale. This discrepancy on the primary endpoint cannot be left unexplained.',
        ref:'ALCOA+ (Attributable, Accurate, Original) · ICH E6(R3) §2.12' },
      { type:'error', who:'CRF — 4-day entry delay',
        problem:'Visit date March 15; CRF entered March 19. No explanation for the delay.',
        why:'ALCOA+ Contemporaneous: the delay combined with source/CRF discrepancies and an unexplained correction suggests the CRF may have been entered from memory, not from a contemporaneous source.',
        fix:'CRF entry delays should be noted. All entries should derive from contemporaneous source documents — not from memory reconstructed days later.',
        ref:'ALCOA+ (Contemporaneous) · ICH E6(R3) §2.12' },
      { type:'error', who:'Worksheet — Concomitant medications blank',
        problem:'Worksheet field is blank. CRF says “None.”',
        why:'ALCOA+ Complete and Accurate: a blank source cannot verify a CRF entry of “None.” “None” is a positive assertion that requires documentation.',
        fix:'Source documents must be completed at the visit. A blank source field is not the same as documented “None.”',
        ref:'ALCOA+ (Complete, Accurate) · ICH E6(R3) §2.12' },
      { type:'error', who:'Worksheet — No signature or date',
        problem:'No handwritten signature and no date. Only a typed name: “Visit conducted by: F. Martin CRC.”',
        why:'ALCOA+ Attributable: a typed name without a handwritten signature does not satisfy attributability requirements. Source documents must be signed and dated at creation.',
        fix:'All source documents must be signed (handwritten) and dated at the time of creation.',
        ref:'ALCOA+ (Attributable) · ICH E6(R3) §2.12' },
      { type:'flag', who:'CRF — PI review timing',
        problem:'PI reviewed and initialled March 22 — 7 days after the visit, 3 days after CRF entry.',
        why:'Combined with the unattributed correction and the source/CRF discrepancy, this raises a question: did Dr. Khalil actively review the 142 entry knowing OACIS showed 168? The delayed review suggests signing off rather than substantive oversight.',
        fix:'PI review should be timely and substantive. Evidence of active PI engagement with primary endpoint data should be visible in the record.',
        ref:'ICH E6(R3) §2.1, §2.3 · ALCOA+ (Attributable)' }
    ]
  },

  'recruitment': {
    caseFile: '<p>The study is <strong>DIAB-2026-005</strong>, a Phase II diabetes trial at the RI-MUHC. CRC is Marco Ricci.</p><p>The screen failure log below covers all screening assessments to date. Below that is the eligibility checklist for <strong>PT-007</strong>, screened March 28, 2026. Review both documents. Identify all problems with the documentation.</p>',
    errorRows: [0, 4, 6, 10, 13, 14],
    findingRows: [0, 4, 6, 10, 10, 13, null],
    findingCells: [3, 3, 3, 2, 3, 1, null],
    findings: [
      { type:'error', who:'SF-001 and SF-005 — vague failure reasons',
        problem:'Reason recorded as “Didn’t qualify” with no reference to which criterion was not met.',
        why:'This makes it impossible to assess whether the eligibility determination was correct, identify patterns in screen failures, or respond to sponsor questions. A screen failure log must be criterion-specific.',
        fix:'“Failed Exclusion criterion 3 — cardiac hospitalization within 6 months” or “Failed Inclusion criterion 3 — HbA1c 6.8%, below minimum.” Each entry needs a specific criterion reference.',
        ref:'ICH E6(R3) §2.4.2 · C.05.012 · Protocol requirements' },
      { type:'error', who:'SF-005 — same issue',
        problem:'Second “Didn’t qualify” entry with no criterion reference.',
        why:'Vague reasons accumulate across the log, preventing any meaningful pattern analysis. An inspector reviewing a log where half the failures say “didn’t qualify” will not be able to assess site eligibility practices.',
        fix:'Same as SF-001 — document the specific criterion that was not met with the relevant value.',
        ref:'ICH E6(R3) §2.4.2 · C.05.012' },
      { type:'error', who:'SF-014 — “Declined” mislabeled',
        problem:'“Declined” is not a screen failure reason — it is an eligible-but-declined entry. Mixing these in the same column obscures important recruitment data.',
        why:'The distinction matters: a high rate of eligible-but-declined participants signals a recruitment or consent process problem. A high screen failure rate signals a protocol feasibility or population problem. Conflating them hides both signals.',
        fix:'Screen failure logs should distinguish: failed eligibility criteria; eligible but declined to consent; eligible and consented but not enrolled for other reasons.',
        ref:'ICH E6(R3) §2.4.2 · Protocol requirements' },
      { type:'error', who:'PT-007 checklist — missing outside lab HbA1c',
        problem:'The eligibility checklist shows only 8.1% (MUHC lab). The outside lab result of 7.9% from 3 weeks prior is not documented.',
        why:'Both results must appear on the checklist for a complete eligibility record, regardless of which value is used. Recording only the qualifying result while omitting the borderline result is an ALCOA+ Complete violation and creates an indefensible gap if the enrollment is ever questioned.',
        fix:'Both the 7.9% (outside lab, date) and 8.1% (MUHC lab, date) should appear on the checklist, with documented protocol justification for using the MUHC result.',
        ref:'ALCOA+ (Complete) · ICH E6(R3) §2.4.1' },
      { type:'error', who:'PT-007 checklist — no source references',
        problem:'No criterion has a source reference. It is impossible to verify how any eligibility determination was made.',
        why:'An inspector cannot assess whether PT-007 genuinely met all eligibility criteria. For Inclusion 2 (Type 2 diabetes ≥1 year): which OACIS record? For Exclusion 1 (no insulin): self-report, medication list, or clinical record? Every criterion requires a traceable source.',
        fix:'Each criterion entry should reference the specific source document, date, and value that supports the determination.',
        ref:'ICH E6(R3) §2.4.1 · ALCOA+ (Attributable, Accurate)' },
      { type:'error', who:'PT-007 checklist — no PI review',
        problem:'The PI review field is blank. Only Marco Ricci (CRC) has confirmed eligibility.',
        why:'Eligibility determination for a study with specific laboratory thresholds requires PI review and sign-off before enrollment. A CRC confirming eligibility without documented PI review is working outside the appropriate scope of delegation for this type of clinical judgment.',
        fix:'Dr. Pham must review and sign the eligibility checklist before enrollment. The signature should be dated prior to the enrollment date.',
        ref:'ICH E6(R3) §2.3.2, §2.4.1 · C.05.010(g)' }
    ]
  },

  'gcp': {
    caseFile: '<p>The study is <strong>CARDIO-2023-008</strong>, a Phase III cardiovascular trial at the RI-MUHC. QI is <strong>Dr. R. Patel</strong>. The review date is <strong>April 10, 2026</strong>.</p><p><strong>Context:</strong> Health Canada adopted ICH E6(R3) effective April 1, 2026. The N2/CITI-Canada GCP E6(R3) update course is available. The study is currently active.</p><p>Review the staff qualification summary below. Identify all GCP compliance gaps for each team member.</p>',
    errorRows: [0, 1, 3, 4],
    findingRows: [1, 3, [0,1,4], 0, null],
    findingCells: [6, 2, 2,      4, null],
    findings: [
      { type:'error', who:'Marco Ricci — retroactive delegation',
        problem:'First study activity: January 12, 2026. Delegation log entry: January 15, 2026. Marco performed study activities 3 days before he was authorized.',
        why:'Any data or activities from January 12–14 were performed without GCP authorization. This applies regardless of how experienced the CRC is — an uninspected 3-day gap at study activation cannot be retroactively remedied.',
        fix:'Delegation log entries must be completed before the person begins any study activity. The entries for those 3 days should be disclosed as a deviation with a CAPA.',
        ref:'ICH E6(R3) §2.3 · GCP Principle 5 (Qualified Individuals) ·C.05.010(g)' },
      { type:'error', who:'Patrick Chen — no GCP certificate',
        problem:'No GCP certificate on file. Patrick has been performing study activities since December 14, 2025 — over 3 months without any documented GCP training.',
        why:'GCP training is a basic requirement for everyone performing study tasks. No certificate means there is no evidence Patrick was trained before performing study activities. He also has a retroactive delegation issue: first activity December 14, 2025; delegation log entry January 8, 2026.',
        fix:'Patrick must complete GCP training immediately. The absence of training must be documented and reported. CAPA: implement a pre-activation checklist requiring GCP certificate before delegation log entry.',
        ref:'ICH E6(R3) §2.3.2 · GCP Principle 5 (Qualified Individuals) ·GUI-0100' },
      { type:'error', who:'Dr. Patel, Marco Ricci, Dr. Beaumont — E6(R2) certificates, not E6(R3)',
        problem:'Three team members hold ICH GCP E6(R2) certificates. Health Canada adopted E6(R3) effective April 1, 2026. None of the three has completed an E6(R3) update.',
        why:'E6(R3) introduced significant changes — risk-based monitoring, updated data governance, revised delegation and oversight requirements. Certificates covering only R2 do not reflect the current regulatory standard. GCP certificates are also generally expected to be renewed every 2–3 years; Dr. Patel’s is from 2019 (7 years old) and Dr. Beaumont’s from 2021 (5 years old).',
        fix:'All three should complete the N2/CITI-Canada GCP E6(R3) update course before their next delegated activities. This should be tracked in the ISF training log.',
        ref:'GCP Principle 5 (Qualified Individuals) · Health Canada GUI-0100 · ICH E6(R3) §2.3.2' },
      { type:'error', who:'Dr. Patel — self-signed protocol training log',
        problem:'The PI signed her own protocol training log.',
        why:'A training record attributable only to the person being trained does not constitute independent verification — ALCOA+ Attributable. Inspectors will question whether the PI’s training was actually conducted and reviewed.',
        fix:'Protocol training for the PI should be verified by the sponsor representative or an institutional training coordinator, not self-certified.',
        ref:'ALCOA+ (Attributable) · ICH E6(R3) §2.3.2 · GUI-0100' },
      { type:'flag', who:'Quality culture pattern',
        problem:'Reading the table as a whole: retroactive delegation for the CRC; no GCP certificate for an RA performing study tasks since activation; outdated training for the QI and sub-investigator; self-certified PI training.',
        why:'An inspector reviewing this table would not treat these as isolated administrative gaps. Together they suggest a site where training and qualification documentation are managed reactively — and where the oversight function (the PI verifying that their team is qualified) may not be functioning as intended.',
        fix:'A full qualification audit is warranted. Implement a proactive training tracker that flags expiring certificates and triggers updates before activations, not after inspections.',
        ref:'ICH E6(R3) GCP Principles 2, 5 · C.05.010 · Quality management principles' }
    ]
  }
};

var kpDrCurrentExercise = null;
var kpDrExerciseId      = '';
var kpDrCurrentFinding  = 0;
var kpDrRevealed        = false;

function kpGoToTeamHub() {
  kpTransition(kpCurrentPhaseId, 'team-hub', false);
}

function kpGoToInspHub() {
  inspBuildHub();
  kpTransition(kpCurrentPhaseId, 'insp-hub', false);
}

function kpGoToJcHub() {
  jcBuildHub();
  kpTransition(kpCurrentPhaseId, 'jc-hub', false);
}

function kpGoToDocReviewHub() {
  kpTransition(kpCurrentPhaseId, 'docreview-hub', false);
}

function kpStartDocReviewDirect(exerciseId) {
  kpDrExerciseId = exerciseId;
  kpDrCurrentExercise = KP_DR_EXERCISES[exerciseId] || KP_DR_EXERCISES['delegation'];
  kpDrSetup(exerciseId);
  kpActivateDirect('docreview');
}
function kpDrSetup(exerciseId) {
  /* populate case file */
  var caseFileEl = document.getElementById('kp-dr-casefile-body');
  if (caseFileEl && kpDrCurrentExercise.caseFile) { caseFileEl.innerHTML = kpDrCurrentExercise.caseFile; }

  /* update eyebrow and title for this exercise */
  var topicEl = document.getElementById('kp-dr-exercise-topic');
  var titleEl = document.getElementById('kp-dr-exercise-title');
  var titles = {
    'delegation': { topic: 'Delegation and Team Roles', title: 'What’s wrong with this delegation log?' },
    'consent':    { topic: 'Informed Consent Process',  title: 'What’s wrong with this consent form?' },
    'sae':        { topic: 'SAE and Adverse Event Reporting', title: 'What’s wrong with this SAE report?' },
    'deviations': { topic: 'Protocol Deviations',               title: 'What’s wrong with this deviation log?' },
    'monitoring':  { topic: 'Monitoring and Inspection Readiness', title: 'What’s wrong with these site responses?' },
    'data':        { topic: 'Data Integrity',                        title: 'What’s wrong with this source document?' },
    'recruitment': { topic: 'Recruitment and Screening',               title: 'What’s wrong with this screen failure log?' },
    'gcp':         { topic: 'GCP Principles',                             title: 'What’s wrong with this qualification record?' }
  };
  var t = titles[exerciseId] || titles['delegation'];
  if (topicEl) { topicEl.textContent = t.topic; }
  if (titleEl) { titleEl.textContent = t.title; }
  kpDrCurrentFinding  = 0;
  kpDrRevealed        = false;

  /* show correct table for this exercise */
  var delegWrap   = document.getElementById('kp-dr-delegation-wrap');
  var consentWrap = document.getElementById('kp-dr-consent-wrap');
  var saeWrap     = document.getElementById('kp-dr-sae-wrap');
  var deviationsWrap  = document.getElementById('kp-dr-deviations-wrap');
  var monitoringWrap  = document.getElementById('kp-dr-monitoring-wrap');
  var dataWrap        = document.getElementById('kp-dr-data-wrap');
  var recruitmentWrap = document.getElementById('kp-dr-recruitment-wrap');
  var gcpWrap         = document.getElementById('kp-dr-gcp-wrap');
  var allWraps = [delegWrap, consentWrap, saeWrap, deviationsWrap, monitoringWrap, dataWrap, recruitmentWrap, gcpWrap];
  for (var wi = 0; wi < allWraps.length; wi++) { if (allWraps[wi]) { allWraps[wi].style.display = 'none'; } }
  var activeWrap = ({'consent':consentWrap,'sae':saeWrap,'deviations':deviationsWrap,'monitoring':monitoringWrap,'data':dataWrap,'recruitment':recruitmentWrap,'gcp':gcpWrap})[exerciseId] || delegWrap;
  if (activeWrap) { activeWrap.style.display = ''; }

  /* reset rows in both tables */
  var allRows = document.querySelectorAll('.kp-dr-row');
  for (var i = 0; i < allRows.length; i++) {
    allRows[i].classList.remove('confirmed-error');
    var cells = allRows[i].querySelectorAll('td');
    for (var j = 0; j < cells.length; j++) { cells[j].classList.remove('cell-highlighted', 'cell-error'); }
  }

  /* show prompt state — no finding card yet */
  var fc = document.getElementById('kp-dr-finding-card');
  if (fc) {
    fc.innerHTML = '<div class="kp-dr-ready">Take a look at the log above. When you\u2019re ready, step through the findings.</div>';
  }

  /* reset nav */
  var total = kpDrCurrentExercise.findings.length;
  var counter = document.getElementById('kp-dr-counter');
  if (counter) { counter.textContent = '0 of ' + total; }
  var prev = document.getElementById('kp-dr-prev');
  var next = document.getElementById('kp-dr-next');
  if (prev) { prev.disabled = true; }
  if (next) { next.disabled = false; }

}

function kpStartDocReview(exerciseId) {
  kpDrExerciseId = exerciseId;
  kpDrCurrentExercise = KP_DR_EXERCISES[exerciseId] || KP_DR_EXERCISES['delegation'];
  kpDrSetup(exerciseId);
  kpTransition('docreview-hub', 'docreview', false);
}

function kpDrRenderFinding() {
  if (!kpDrCurrentExercise) { return; }
  var findings = kpDrCurrentExercise.findings;
  var total    = findings.length;
  var f        = findings[kpDrCurrentFinding];

  /* reset all cell states (active table only) */
  var activeTbodyId = kpDrCurrentExercise === KP_DR_EXERCISES['consent'] ? 'kp-dr-consent-tbody' : (kpDrCurrentExercise === KP_DR_EXERCISES['sae'] ? 'kp-dr-sae-tbody' : (kpDrCurrentExercise === KP_DR_EXERCISES['deviations'] ? 'kp-dr-deviations-tbody' : (kpDrCurrentExercise === KP_DR_EXERCISES['monitoring'] ? 'kp-dr-monitoring-tbody' : (kpDrCurrentExercise === KP_DR_EXERCISES['data'] ? 'kp-dr-data-tbody' : (kpDrCurrentExercise === KP_DR_EXERCISES['recruitment'] ? 'kp-dr-recruitment-tbody' : (kpDrCurrentExercise === KP_DR_EXERCISES['gcp'] ? 'kp-dr-gcp-tbody' : 'kp-dr-tbody'))))));
  var activeTbody = document.getElementById(activeTbodyId);
  var allCells = activeTbody ? activeTbody.querySelectorAll('td') : [];
  for (var i = 0; i < allCells.length; i++) {
    allCells[i].classList.remove('cell-highlighted', 'cell-error');
  }

  /* softly mark cells for all previous findings (supports array or single row) */
  var rows = activeTbody ? activeTbody.querySelectorAll('.kp-dr-row') : [];
  for (var pi = 0; pi < kpDrCurrentFinding; pi++) {
    var pRowVal = kpDrCurrentExercise.findingRows[pi];
    var pCell   = kpDrCurrentExercise.findingCells[pi];
    if (pRowVal !== null && pRowVal !== undefined && pCell !== null && pCell !== undefined) {
      var pRowArr = Array.isArray(pRowVal) ? pRowVal : [pRowVal];
      for (var pri = 0; pri < pRowArr.length; pri++) {
        if (rows[pRowArr[pri]]) {
          var pCells = rows[pRowArr[pri]].querySelectorAll('td');
          if (pCells[pCell]) { pCells[pCell].classList.add('cell-error'); }
        }
      }
    }
  }

  /* strongly highlight the current finding’s cell(s) (supports array) */
  var rowIdxVal = kpDrCurrentExercise.findingRows[kpDrCurrentFinding];
  var cellIdx   = kpDrCurrentExercise.findingCells[kpDrCurrentFinding];
  if (rowIdxVal !== null && rowIdxVal !== undefined && cellIdx !== null && cellIdx !== undefined) {
    var rowIdxArr = Array.isArray(rowIdxVal) ? rowIdxVal : [rowIdxVal];
    for (var hli = 0; hli < rowIdxArr.length; hli++) {
      if (rows[rowIdxArr[hli]]) {
        var targetCells = rows[rowIdxArr[hli]].querySelectorAll('td');
        if (targetCells[cellIdx]) {
          targetCells[cellIdx].classList.add('cell-highlighted');
          if (hli === 0) { targetCells[cellIdx].scrollIntoView({ behavior: 'smooth', block: 'nearest' }); }
        }
      }
    }
  }

  /* render finding card */
  var fc = document.getElementById('kp-dr-finding-card');
  if (!fc) { return; }
  var _lk = (typeof llLinkifyCitations === 'function') ? llLinkifyCitations : function (s) { return s; };
  fc.innerHTML =
    '<div class="kp-dr-finding ' + f.type + '">' +
      '<div class="kp-dr-finding-head">' +
        '<div class="kp-dr-finding-num">' + (kpDrCurrentFinding + 1) + '</div>' +
        '<div class="kp-dr-finding-who">' + f.who + '</div>' +
        '<div class="kp-dr-finding-tag">' + (f.type === 'error' ? 'Error' : 'Flag') + '</div>' +
      '</div>' +
      '<div class="kp-dr-finding-body">' +
        '<div class="kp-dr-finding-problem">' + f.problem + '</div>' +
        '<div class="kp-dr-finding-why">' + _lk(f.why) + '</div>' +
        '<div class="kp-dr-finding-fix">' + _lk(f.fix) + '</div>' +
        '<div class="kp-dr-finding-ref">→ ' + _lk(f.ref) + '</div>' +
      '</div>' +
    '</div>';

  /* update counter and nav buttons */
  var counter = document.getElementById('kp-dr-counter');
  if (counter) { counter.textContent = (kpDrCurrentFinding + 1) + ' of ' + total; }
  var prev = document.getElementById('kp-dr-prev');
  var next = document.getElementById('kp-dr-next');
  if (prev) { prev.disabled = kpDrCurrentFinding === 0; }
  if (next) {
    next.disabled = kpDrCurrentFinding >= total - 1;
    /* last finding reached — leave cell states as-is */
  }
}

function kpDrPrev() {
  if (!kpDrRevealed) { return; }
  if (kpDrCurrentFinding > 0) {
    kpDrCurrentFinding--;
    kpDrRenderFinding();
  }
}

function kpDrNext() {
  if (!kpDrCurrentExercise) { return; }
  if (!kpDrRevealed) {
    /* first click — reveal finding 1 */
    kpDrRevealed = true;
    kpDrRenderFinding();
  } else if (kpDrCurrentFinding < kpDrCurrentExercise.findings.length - 1) {
    kpDrCurrentFinding++;
    kpDrRenderFinding();
  }
}

function kpDrMarkRows() {
  if (!kpDrCurrentExercise) { return; }
  var rows      = document.querySelectorAll('.kp-dr-row');
  var errorRows = kpDrCurrentExercise.errorRows;
  var findingCells = kpDrCurrentExercise.findingCells;
  var findingRows  = kpDrCurrentExercise.findingRows;
  /* for each finding that has a specific cell, mark that cell */
  for (var fi = 0; fi < findingRows.length; fi++) {
    var riVal = findingRows[fi];
    var ci    = findingCells[fi];
    if (riVal !== null && riVal !== undefined && ci !== null && ci !== undefined) {
      var riArr = Array.isArray(riVal) ? riVal : [riVal];
      for (var mri = 0; mri < riArr.length; mri++) {
        if (rows[riArr[mri]]) {
          var cells = rows[riArr[mri]].querySelectorAll('td');
          if (cells[ci]) { cells[ci].classList.add('cell-error'); }
          rows[riArr[mri]].classList.add('confirmed-error');
        }
      }
    }
  }
}


  /* auto-count active hub cards on landing */
  /* In a SPA the DOMContentLoaded event has already fired by the time this
     script is dynamically injected. Run stat counts immediately.
     Note: kpRouteFromHash() is intentionally NOT called here — calling it
     during script init can throw if hash state references uninitialized
     functions, halting the rest of the script. */
  (function() {
    try {
      var teHub = document.getElementById('kp-phase-team-hub');
      var drHub = document.getElementById('kp-phase-docreview-hub');
      if (teHub) {
        var teCount = teHub.querySelectorAll('.kp-dr-hub-card.active').length;
        var teEl = document.getElementById('stat-te-count');
        if (teEl) { teEl.textContent = teCount; }
      }
      if (drHub) {
        var drCount = drHub.querySelectorAll('.kp-dr-hub-card.active').length;
        var drEl = document.getElementById('stat-dr-count');
        if (drEl) { drEl.textContent = drCount; }
      }
    } catch(e) {}
  }());


/* ════════════════════════════════════════════
   JUDGMENT CALLS — SCENARIO DATA
════════════════════════════════════════════ */
var JC_SCENARIOS = [
  {
    id: 'cra-pressure',
    role: 'crc',
    topic: 'Data Integrity \u00b7 Protocol Compliance \u00b7 PI Oversight',
    title: 'Handling CRA Pressure on a Monitoring Visit',
    desc: 'A sponsor CRA is on-site and needs to close her visit today. Three requests that each cross a line.',
    scenes: 3,
    ref: 'SOP-CR-013, 014, 002',
    live: true,
    intro: 'A sponsor CRA is on-site for a routine monitoring visit and has found some issues. She needs to close the visit today. You need to protect the record.',
    learner: { name: 'Nadia', role: 'CRC, 3 years of experience. Managing this Phase III cardiovascular trial since activation.' },
    npc: { name: 'Karen Whitfield', role: 'Sponsor CRA. Experienced, professional, under pressure to close this visit today. Her flight is at 7 PM.' },
    pressurePoints: [
      {
        label: 'Pressure point 1 \u2014 The correction',
        narration: 'It is 2:15 PM. Karen has been reviewing source documents for two hours. She stops at PT-031\u2019s Week 8 visit worksheet.',
        speaker: 'Karen',
        dialogue: '<p>OK, I\u2019m looking at PT-031\u2019s blood pressure entry. You\u2019ve got 178/94 in the source, but the eCRF says 178/84. Looks like a transcription error \u2014 the 9 became an 8.</p><p>Can you just white-out the 94 in the source and write 84? That way they match and we don\u2019t have to open a query.</p>',
        choices: [
          { text: 'Sure, it\u2019s obviously just a typo. Let me grab the correction fluid.', quality: 'fail', label: 'This compromises the source record',
            feedback: '<p>White-out (correction fluid) is <strong>never acceptable</strong> in source documents. It destroys the original entry, making it impossible to reconstruct what was initially recorded. The original value may actually be correct \u2014 a diastolic of 94 is clinically different from 84 and could affect safety assessments and eligibility.</p><p>Before correcting anything, you need to verify which value is accurate by checking the device printout or repeating the measurement. If a correction is needed, it must follow the single-line method: cross out the error with a single line (so the original remains legible), write the correct value, and add the date, your initials, and a brief reason.</p><span class="jc-fb-ref">ICH E6(R3) \u00a74 Data Governance, ALCOA+ principles \u00b7 21 CFR Part 11 \u00b7 SOP-CR-014</span>' },
          { text: 'I don\u2019t think we should white it out \u2014 that doesn\u2019t feel right. Can we just fix the eCRF instead?', quality: 'partial', label: 'Right instinct, incomplete reasoning',
            feedback: '<p>You correctly identified that white-out is wrong, but <strong>jumping to fix the eCRF assumes the eCRF value is the error</strong>. You don\u2019t actually know which number is correct yet. The source document records 94; the eCRF says 84. The discrepancy could be a transcription error in either direction.</p><p>The correct first step is to verify the original measurement \u2014 check the device printout or automated monitor record. Only then can you determine which document needs correction, and the correction must use proper single-line method with date, initials, and reason.</p><span class="jc-fb-ref">ICH E6(R3) \u00a74 Data Governance, ALCOA+ (original, accurate) \u00b7 SOP-CR-014</span>' },
          { text: 'The source document is the original record \u2014 94 might actually be the correct value. I need to check the monitor printout from the device before we decide which number to correct, and either way the correction has to be single-line with date, initials, and reason.', quality: 'good', label: 'Correct',
            feedback: '<p>This is the right response. You identified that the source document might actually hold the correct value, that verification against the device record comes first, and that any correction \u2014 to either the source or the eCRF \u2014 must follow proper correction procedures.</p><p>A CRA asking you to white-out a source entry is a significant red flag. Even well-intentioned monitors sometimes prioritize data matching over data integrity. Your job is to protect the original record.</p><span class="jc-fb-ref">ICH E6(R3) \u00a74 Data Governance, ALCOA+ principles \u00b7 21 CFR Part 11 \u00b7 SOP-CR-014</span>' }
        ]
      },
      {
        label: 'Pressure point 2 \u2014 The deviation',
        narration: '3:20 PM. Karen has moved on to the visit schedule. She\u2019s flagged something in PT-044\u2019s file.',
        speaker: 'Karen',
        dialogue: '<p>PT-044\u2019s Week 12 visit happened on Day 91 \u2014 the protocol window is Day 84 \u00b1 3. So that\u2019s four days outside the window.</p><p>But look \u2014 the labs were all normal, the participant is fine, no safety signal. If we log this as a deviation it\u2019ll flag in the sponsor\u2019s system and create a whole corrective action loop. Can we just note it as a scheduling variance in your internal tracker and move on?</p>',
        choices: [
          { text: 'That makes sense \u2014 if there\u2019s no safety impact, I don\u2019t see why we\u2019d create extra paperwork. I\u2019ll note it internally.', quality: 'fail', label: 'A deviation is defined by the protocol, not by its outcome',
            feedback: '<p>Whether or not a deviation had a safety impact does not change whether it <em>is</em> a deviation. <strong>The protocol defines a visit window of Day 84 \u00b1 3. Day 91 is outside that window. That is a protocol deviation by definition.</strong></p><p>Logging it as an informal \u201cvariance\u201d instead of a documented deviation means it will not appear in deviation tracking, will not be assessed by the PI, and will not be available for the REB\u2019s continuing review. If a pattern of visit window deviations is developing across participants, you would never see it.</p><p>The severity and impact assessment \u2014 including the fact that labs were normal \u2014 belongs <em>inside</em> the deviation report, not as a reason to avoid filing one.</p><span class="jc-fb-ref">ICH E6(R3) \u00a72.5.2 \u00b7 Health Canada C.05.010 \u00b7 SOP-CR-014, SOP-CR-026</span>' },
          { text: 'I think it still needs to be documented as a deviation, but I take your point about the safety impact \u2014 we can note that in the assessment.', quality: 'partial', label: 'Right on documentation, but watch the framing',
            feedback: '<p>You correctly insisted on documenting it as a deviation \u2014 that\u2019s the essential point. But <strong>\u201cI take your point about the safety impact\u201d concedes ground you shouldn\u2019t concede.</strong> The safety outcome is relevant to the <em>assessment</em> of the deviation, not to whether it gets documented as one.</p><p>When you validate a CRA\u2019s framing (\u201cno safety impact = not really a deviation\u201d), you make it easier for them to push the same argument next time. The classification is determined by the protocol definition, and the PI \u2014 not the CRA \u2014 assesses the impact.</p><span class="jc-fb-ref">ICH E6(R3) \u00a72.5.2 \u00b7 SOP-CR-014, SOP-CR-026</span>' },
          { text: 'The visit was outside the protocol-defined window \u2014 that\u2019s a deviation regardless of the safety outcome. I need to document it on the deviation log with a PI assessment of impact, and I can\u2019t downgrade it to a \u201cvariance\u201d just because the labs were clean. The classification isn\u2019t mine or yours to negotiate \u2014 it\u2019s defined by the protocol.', quality: 'good', label: 'Correct',
            feedback: '<p>This is the right response. You correctly identified that: the protocol defines what constitutes a deviation (not the CRA, not you), the safety outcome belongs in the impact assessment rather than in the classification decision, and the PI must assess it formally on the deviation log.</p><p>The pressure to reclassify deviations as something less reportable is one of the most common forms of sponsor influence at the site level. It is often well-intentioned \u2014 nobody wants unnecessary corrective action loops \u2014 but the documentation decision is not negotiable.</p><span class="jc-fb-ref">ICH E6(R3) \u00a72.5.2 \u00b7 Health Canada C.05.010 \u00b7 SOP-CR-014, SOP-CR-026</span>' }
        ]
      },
      {
        label: 'Pressure point 3 \u2014 The signature',
        narration: '4:40 PM. Karen is packing up her laptop. She has one last request.',
        speaker: 'Karen',
        dialogue: '<p>Last thing. I\u2019ve got three monitoring visit reports that need the PI\u2019s co-signature before I can close this visit in our system. Dr. Andersen is in clinic until 6 \u2014 any chance you can get him to sign them now? He can read through them later, I just need the signatures today.</p><p>I know it\u2019s a lot to ask, but my flight\u2019s at 7 and I really need to close this visit out.</p>',
        choices: [
          { text: 'I\u2019ll run them down to clinic. He trusts us \u2014 I\u2019m sure he\u2019ll sign if I explain you need them today.', quality: 'fail', label: 'A signature without review is a false record',
            feedback: '<p>If Dr. Andersen signs documents he has not read, his signature attests to something that is not true \u2014 that he has reviewed and agrees with the content. <strong>This is a data integrity issue regardless of whether the documents turn out to be accurate.</strong></p><p>The PI\u2019s signature on monitoring visit reports is not a formality. It confirms that the PI is aware of the monitor\u2019s findings, agrees with the resolution of any queries, and takes responsibility for any follow-up actions. Signing blind undermines the PI\u2019s oversight role \u2014 one of the foundational requirements of GCP.</p><p>\u201cHe trusts us\u201d is exactly the reasoning that leads to clustered retroactive signatures \u2014 a common audit finding at academic sites.</p><span class="jc-fb-ref">ICH E6(R3) \u00a72.3.1 (PI oversight) · GCP Principle 10 (Defined Roles and Responsibilities) \u00b7 ALCOA+ \u00b7 SOP-CR-002, SOP-CR-013</span>' },
          { text: 'I can ask him, but I can\u2019t promise he\u2019ll sign without reading them. Would it help if I got him to sign two of the three?', quality: 'partial', label: 'Right instinct, but negotiating weakens your position',
            feedback: '<p>You correctly flagged that the PI should read before signing. But <strong>offering to get him to sign two of the three is still asking him to sign documents without adequate review time.</strong> The problem is not the number of documents \u2014 it is whether the PI has actually reviewed what he is signing.</p><p>Negotiating a partial compromise (\u201ctwo of three\u201d) signals that the principle is flexible. It is not. The CRA\u2019s timeline is a logistical constraint, not a reason to weaken PI oversight. If the sponsor\u2019s system cannot accommodate a PI who reviews documents before signing them, that is a process issue for the sponsor to resolve.</p><span class="jc-fb-ref">ICH E6(R3) \u00a72.3.1 \u00b7 GCP Principle 10 (Defined Roles and Responsibilities) \u00b7 SOP-CR-002, SOP-CR-013</span>' },
          { text: 'I can\u2019t ask him to sign documents he hasn\u2019t reviewed \u2014 his signature means he\u2019s read and agreed, and that has to be true when he signs it. I\u2019ll put them on his desk with a note. If your system needs them today, that\u2019s a timeline issue on the sponsor side, not a reason to short-circuit PI review.', quality: 'good', label: 'Correct',
            feedback: '<p>This is the right response. You protected the integrity of the PI\u2019s signature, correctly identified that the sponsor\u2019s timeline does not override the requirement for genuine review, and offered a practical next step (documents on his desk) without compromising the principle.</p><p>Framing it as \u201ca timeline issue on the sponsor side\u201d is important \u2014 it names the real source of the pressure without being adversarial. The CRA\u2019s flight schedule is not your problem to solve by cutting corners.</p><span class="jc-fb-ref">ICH E6(R3) \u00a72.3.1 (PI oversight) \u00b7 GCP Principle 10 (Defined Roles and Responsibilities) \u00b7 SOP-CR-002, SOP-CR-013</span>' }
        ]
      }
    ],
    endings: {
      3: { label: 'Strong', title: 'You protected the record at every turn.', text: 'You correctly identified all three pressure points: source document integrity, deviation classification, and PI oversight. More importantly, you cited specific regulatory and procedural bases for each position rather than relying on instinct alone. That specificity is what makes the difference \u2014 it turns an uncomfortable disagreement into a professional conversation grounded in shared obligations.' },
      2: { label: 'Competent with gaps', title: 'You got the main decisions right.', text: 'You held firm on two of the three pressure points, which means you recognized most of the issues. Where you gave ground, it was usually not because you missed the problem but because you lacked a specific regulatory basis to articulate why the request was not acceptable. Review the feedback on those points \u2014 precision in your reasoning is what keeps a professional disagreement from turning into a negotiation.' },
      1: { label: 'Needs development', title: 'Several of these requests needed a different answer.', text: 'You recognized some of the issues but agreed to compromises that would create real problems in an audit. None of the requests were unreasonable on the surface \u2014 that is what makes monitoring visit pressure difficult. The corrections, classifications, and signatures you agree to become part of the permanent regulatory record. Review the feedback carefully and consider discussing these scenarios with your team lead.' },
      0: { label: 'Critical concern', title: 'Every request felt reasonable \u2014 and each one crossed a line.', text: 'A destroyed source record, an unreported deviation, and a PI signature that attests to a review that never happened \u2014 each of these would be a distinct finding in an inspection. The pressure in a monitoring visit is rarely hostile. It comes from experienced professionals with legitimate time constraints asking for small shortcuts. Recognizing where the line is, even when the request sounds practical, is the skill this exercise is testing.' }
    }
  },

  /* ── SCENARIO 2: PI — The Feasibility Call ── */
  {
    id:'feasibility-call', role:'pi',
    topic:'Recruitment \u00b7 Consent \u00b7 Conflict of Interest',
    title:'Sponsor Pressure on Enrolment Decisions',
    desc:'A sponsor PM calls to discuss your underperforming enrolment numbers. Three suggestions that each sound reasonable.',
    scenes:3, ref:'SOP-CR-004, 008, 009', live:true,
    intro:'The sponsor\u2019s project manager has scheduled a call to discuss enrolment strategy. Your site is at 11 of 20 with four months left.',
    learner:{name:'Dr. Tremblay',role:'PI on a Phase III diabetes trial. 11 of 20 target participants enrolled with four months remaining.'},
    npc:{name:'Claire Dubois',role:'Sponsor Project Manager. Professional, data-driven, focused on timelines. Her quarterly review is next week.'},
    pressurePoints:[
      {label:'Pressure point 1 \u2014 The rescreen',
       narration:'Claire opens the call by reviewing the site\u2019s enrolment numbers.',
       speaker:'Claire',
       dialogue:'<p>You\u2019re at 11 of 20 with four months left. One thing other sites have found helpful: when a screening value is borderline, repeating it within the protocol\u2019s retest window often brings it into range.</p><p>Your CRC flagged a participant this week with an HbA1c of 7.8 \u2014 the cutoff is 8.0. Would you consider rescreening next week?</p>',
       choices:[
         {text:'Good idea \u2014 I\u2019ll have Marco schedule her for a retest next week.',quality:'fail',label:'Rescreening without clinical justification',
          feedback:'<p>Agreeing to rescreen without clinical justification is enrolment-driven, not clinically indicated. The protocol\u2019s retest provision exists for cases where there is a clinical reason to believe the initial value may not be representative \u2014 recent illness, lab error, fasting status. \u201cThe sponsor suggested it\u201d is not a clinical rationale.</p><span class="jc-fb-ref">ICH E6(R3) Principle 3 (Independent Review) \u00b7 TCPS2 Art. 3.1 \u00b7 SOP-CR-009</span>'},
         {text:'The protocol allows retesting, so I don\u2019t see why not \u2014 we retest borderline values all the time.',quality:'partial',label:'Protocol permits it, but that\u2019s not the question',
          feedback:'<p>The protocol allowing retesting doesn\u2019t mean retesting is always appropriate. \u201cWe do it all the time\u201d is a practice pattern, not a clinical rationale for this specific participant. If retesting becomes routine for every borderline value, an auditor will see a pattern that looks like enrolment-driven rescreening.</p><span class="jc-fb-ref">ICH E6(R3) \u00a73.2 \u00b7 SOP-CR-009</span>'},
         {text:'I\u2019d need to review her chart first \u2014 there might be a clinical reason to retest, but I can\u2019t commit to it on this call.',quality:'good',label:'Correct',
          feedback:'<p>You\u2019re leaving the door open for a clinically justified retest while making clear that the decision is medical, not logistical. If you review the chart and find a clinical reason, a retest is defensible. If there\u2019s no basis, the answer is no.</p><span class="jc-fb-ref">ICH E6(R3) Principle 3 (Independent Review) \u00b7 SOP-CR-004 \u00b7 SOP-CR-009</span>'}
       ]},
      {label:'Pressure point 2 \u2014 The dual role',
       narration:'Claire moves on to the screening pipeline.',
       speaker:'Claire',
       dialogue:'<p>Looking at your screening log, several of your own clinic patients were flagged as \u201capproached but declined.\u201d I know you have a strong rapport with them \u2014 would it help to bring it up again at their next clinic visit?</p>',
       choices:[
         {text:'If they declined, we should respect that. But I can make sure the study poster is visible in the waiting room so they can come to us if they change their mind.',quality:'good',label:'Correct',
          feedback:'<p>You\u2019re respecting the initial refusal while keeping the study accessible. Passive recruitment materials allow the patient to re-engage on their own terms. If a patient approaches the team after seeing the material, the consent discussion should ideally be conducted by someone other than you.</p><span class="jc-fb-ref">TCPS2 Arts. 3.1, 7.4 \u00b7 SOP-CR-009 \u00b7 SOP-CR-008</span>'},
         {text:'I\u2019ll mention it at their next appointment \u2014 I can explain the study better than anyone since I designed the protocol.',quality:'fail',label:'The dual role is the concern here',
          feedback:'<p>Re-approaching patients who have already declined, using the therapeutic relationship as the vehicle, is the dual-role conflict that TCPS2 flags. When you are both the treating physician and the PI, your patients may feel unable to refuse you directly \u2014 even if you don\u2019t intend to pressure them.</p><span class="jc-fb-ref">TCPS2 Arts. 3.1, 7.4 \u00b7 ICH E6(R3) \u00a72.8.9 \u00b7 SOP-CR-008</span>'},
         {text:'That\u2019s a fair point \u2014 I\u2019ll have Marco reach out to them instead, since he\u2019s not their doctor.',quality:'partial',label:'Better, but still re-approaching a refusal',
          feedback:'<p>Having Marco contact patients who already declined is better than doing it yourself, but it\u2019s still re-approaching people who said no. The patient knows their doctor is running the study, and a call from the study team may feel like indirect pressure.</p><span class="jc-fb-ref">TCPS2 Art. 3.1 \u00b7 SOP-CR-009</span>'}
       ]},
      {label:'Pressure point 3 \u2014 The feasibility commitment',
       narration:'Claire wraps up with a direct question.',
       speaker:'Claire',
       dialogue:'<p>Last thing \u2014 we need to update the feasibility projection for the quarterly review. Can I put you down for 20 by the end of Q3? We\u2019d hate to have to adjust the site allocation \u2014 we want to keep the site active.</p>',
       choices:[
         {text:'Put me down for 20. We\u2019ll make it work.',quality:'fail',label:'An aspirational number creates downstream pressure',
          feedback:'<p>Committing to a number you\u2019re not confident you can reach \u2014 knowing that reaching it may require loosening how strictly you apply criteria \u2014 is how enrolment pressure turns into protocol deviations.</p><span class="jc-fb-ref">ICH E6(R3) \u00a73.2 \u00b7 SOP-CR-004</span>'},
         {text:'Based on our current screening rate and the eligible population, 15 to 17 is realistic. I\u2019d rather give you an honest number than one I can\u2019t defend.',quality:'good',label:'Correct',
          feedback:'<p>An honest feasibility update protects everyone. If the sponsor redistributes targets, that\u2019s their prerogative \u2014 and it\u2019s better than having your site scramble to enrol participants who shouldn\u2019t be in the study.</p><span class="jc-fb-ref">ICH E6(R3) \u00a73.2 \u00b7 SOP-CR-004</span>'},
         {text:'Let me talk to Marco and get back to you by Friday with a revised number.',quality:'partial',label:'Deferring avoids the conversation',
          feedback:'<p>Deferring isn\u2019t wrong, but the risk is that \u201cgetting back to her\u201d becomes negotiating a number that splits the difference between honest and aspirational. If your honest assessment is 15\u201317, say so now.</p><span class="jc-fb-ref">ICH E6(R3) \u00a73.2</span>'}
       ]}
    ],
    endings:{
      3:{label:'Strong',title:'You maintained scientific and ethical standards under genuine commercial pressure.',text:'Honest feasibility, respect for refusals, and clinically grounded decisions. That combination is what protects both participants and data quality.'},
      2:{label:'Competent with gaps',title:'You got the key decisions right but left room in one area.',text:'Review the feedback. The issue is usually not the immediate decision but the precedent it sets for future conversations with the sponsor.'},
      1:{label:'Needs development',title:'The enrolment pressure shaped more of your decisions than it should have.',text:'None of Claire\u2019s suggestions were unreasonable on the surface. That is what makes this difficult. Would you document your reasoning for each decision, and would it hold up in a review?'},
      0:{label:'Critical concern',title:'Every decision was commercially sensible and regulatorily problematic.',text:'Enrolment pressure is the most common driver of eligibility deviations, dual-role conflicts, and over-committed feasibility projections at academic sites.'}
    }
  },

  /* ── SCENARIO 3: Research Nurse — The Saturday Night Call ── */
  {
    id:'saturday-call', role:'nurse',
    topic:'SAE Reporting \u00b7 Delegation \u00b7 Data Integrity',
    title:'Weekend SAE With the PI Unavailable',
    desc:'Weekend on-call. A participant is hospitalized. The PI doesn\u2019t want to be disturbed. Three decisions before Monday.',
    scenes:3, ref:'SOP-CR-012, 002, 014', live:true,
    intro:'It is Saturday at 8:15 PM. You are on call. A participant has been hospitalized. The PI is at a family event. The sub-investigator is reachable by phone.',
    learner:{name:'Isabelle',role:'Research nurse on a Phase II oncology immunotherapy trial. On call this weekend.'},
    npc:{name:'Dr. Morin',role:'PI. Responds in terse texts. Not negligent \u2014 trusting his team to handle things.'},
    pressurePoints:[
      {label:'Pressure point 1 \u2014 The awareness clock',
       narration:'Your phone rings. The spouse of an enrolled participant reports he was admitted to hospital this morning with severe abdominal pain \u2014 possible bowel perforation. He\u2019s on cycle 3 of the study drug. You text Dr. Morin.',
       speaker:'Dr. Morin (text)',
       dialogue:'<p>Ok. C\u00f4t\u00e9 is on call \u2014 she can do the assessment. Just make sure the form is ready for me to review Monday.</p>',
       choices:[
         {text:'The PI said Dr. C\u00f4t\u00e9 can handle it \u2014 I\u2019ll let her know and she can take it from here.',quality:'fail',label:'Handing off entirely leaves gaps',
          feedback:'<p>Dr. C\u00f4t\u00e9 can provide the medical assessment, but \u201cshe can take it from here\u201d treats the SAE process as someone else\u2019s responsibility. SAE documentation, form initiation, sponsor notification, and contemporaneous recording of the awareness date are within your delegated scope. Handing off entirely means no one may document the awareness date accurately or submit within the timeline.</p><span class="jc-fb-ref">SOP-CR-012 \u00a75.4.1 \u00b7 SOP-CR-002</span>'},
         {text:'I\u2019ll contact Dr. C\u00f4t\u00e9 now for the medical assessment, initiate the SAE form tonight, and submit the preliminary report to the sponsor within the 24-hour window. Dr. Morin can review and co-sign Monday.',quality:'good',label:'Correct',
          feedback:'<p>You\u2019ve parsed Dr. Morin\u2019s text correctly: Dr. C\u00f4t\u00e9 handles the medical assessment, you handle the documentation and reporting, and Dr. Morin reviews when available. The key insight is that \u201cready for me to review Monday\u201d and \u201csubmit to the sponsor within 24 hours\u201d are not in conflict.</p><span class="jc-fb-ref">SOP-CR-012 \u00a75.4.1 \u00b7 ICH E6(R3) \u00a72.7.2 \u00b7 SOP-CR-002</span>'},
         {text:'Dr. Morin seems comfortable with the timeline, and Dr. C\u00f4t\u00e9 can handle the assessment \u2014 I\u2019ll pull everything together for a Monday review.',quality:'partial',label:'The timeline isn\u2019t addressed',
          feedback:'<p>Dr. Morin\u2019s text isn\u2019t wrong \u2014 Dr. C\u00f4t\u00e9 can do the assessment. But \u201cready for me to review Monday\u201d doesn\u2019t mean \u201cdon\u2019t submit until Monday.\u201d The 24-hour sponsor notification clock started when you took the call. You need to contact Dr. C\u00f4t\u00e9 tonight, initiate the form, and submit the preliminary report within the protocol timeline.</p><span class="jc-fb-ref">SOP-CR-012 \u00a75.4.1 \u00b7 ICH E6(R3) \u00a72.7.2</span>'}
       ]},
      {label:'Pressure point 2 \u2014 The expectedness question',
       narration:'You reach Dr. C\u00f4t\u00e9. She assesses the event as serious and possibly related. She asks you to check the IB for expectedness. IB version 4.3 lists gastrointestinal perforation as a known risk, Grade 1\u20132. Mr. Delisle\u2019s presentation sounds like it could be Grade 3 or higher.',
       speaker:'Dr. C\u00f4t\u00e9 (phone)',
       dialogue:'<p>GI perforation is listed in the IB. I\u2019ll classify it as expected \u2014 that gives us the 15-day window instead of 7.</p>',
       choices:[
         {text:'I\u2019m not a physician \u2014 I can\u2019t question her expectedness assessment.',quality:'fail',label:'This is regulatory information, not a medical challenge',
          feedback:'<p>You\u2019re not questioning a medical judgement \u2014 you\u2019re providing regulatory information. The expectedness determination is a factual comparison between the event and the IB, including severity. You have the IB open and can see that the listed severity is Grade 1\u20132. Flagging that the patient\u2019s presentation may exceed this is within your scope as a delegated research nurse.</p><span class="jc-fb-ref">ICH E6(R3) \u00a72.3.2 \u00b7 SOP-CR-012</span>'},
         {text:'She\u2019s the physician and she\u2019s reviewed the case \u2014 I\u2019ll document it as expected.',quality:'partial',label:'The grade discrepancy matters',
          feedback:'<p>Dr. C\u00f4t\u00e9 is right that GI perforation is in the IB \u2014 but only at Grade 1\u20132. If this event is Grade 3 or higher, the severity exceeds what\u2019s described, which makes it unexpected at this severity. You have the IB in front of you and can see the grade discrepancy. Flagging this isn\u2019t overriding her judgement \u2014 it\u2019s providing information she may not have fully considered.</p><span class="jc-fb-ref">ICH E2A \u00b7 SOP-CR-012 \u00a75.3.4</span>'},
         {text:'The IB lists GI perforation at Grade 1\u20132 only. If this is Grade 3 or higher, it would be unexpected at that severity \u2014 which could make it a SUSAR. Can we hold the expectedness call until we have the hospital records?',quality:'good',label:'Correct',
          feedback:'<p>You\u2019ve identified the critical distinction: expectedness is assessed against nature, severity, and specificity \u2014 not just event name. Holding the determination until you have enough information is the right call, as long as you still meet the reporting timeline. Defaulting to the shorter 7-day timeline is the conservative and defensible choice.</p><span class="jc-fb-ref">ICH E2A \u00b7 C.05.001 \u00b7 SOP-CR-012</span>'}
       ]},
      {label:'Pressure point 3 \u2014 The documentation',
       narration:'It\u2019s 10:30 PM. You\u2019ve documented the awareness, reached Dr. C\u00f4t\u00e9, and initiated the SAE form. You text Dr. Morin a summary. He replies:',
       speaker:'Dr. Morin (text)',
       dialogue:'<p>Thanks Isabelle. When you finalize the form, make sure the timeline looks tight. I don\u2019t want questions about the weekend gap.</p>',
       choices:[
         {text:'Reply: \u201cThe timeline is clean \u2014 awareness documented at 8:15 PM Saturday, Dr. C\u00f4t\u00e9 assessed by phone same evening, form initiated tonight. No gap to explain.\u201d',quality:'good',label:'Correct',
          feedback:'<p>You\u2019ve clarified the situation without making it a confrontation. The documentation already tells a strong story: the site became aware Saturday evening, escalated to a qualified physician the same night, and initiated the form before midnight. By replying with the actual timeline, you\u2019re showing Dr. Morin that the documentation is already tight \u2014 which is probably what he wanted to hear.</p><span class="jc-fb-ref">ALCOA+ \u00b7 ICH E6(R3) \u00a74 \u00b7 SOP-CR-014</span>'},
         {text:'He probably just means document it well \u2014 but to be safe, I\u2019ll use Monday as the awareness date so there\u2019s no gap to explain.',quality:'fail',label:'Interpreting ambiguity toward falsification',
          feedback:'<p>Interpreting an ambiguous instruction in the direction that falsifies a record is not \u201cplaying it safe.\u201d Recording Monday as the awareness date when you became aware Saturday evening is falsification regardless of what Dr. Morin meant. Inspectors routinely cross-reference SAE awareness dates against phone logs, email timestamps, and hospital admission records.</p><span class="jc-fb-ref">ALCOA+ \u00b7 C.05.012 \u00b7 ICH E6(R3) GCP Principle 10 (Defined Roles and Responsibilities)</span>'},
         {text:'Don\u2019t respond to the text \u2014 just document everything correctly with the Saturday date and let him review it Monday.',quality:'partial',label:'Correct action, but silence leaves ambiguity',
          feedback:'<p>Documenting correctly is the essential part. But not responding to an ambiguous instruction from the PI leaves a gap. If Dr. Morin did mean \u201cchange the date,\u201d he\u2019ll discover Monday that you didn\u2019t \u2014 and that conversation will be harder. If he just meant \u201cdocument it well,\u201d a quick confirmation resolves the ambiguity.</p><span class="jc-fb-ref">ALCOA+ \u00b7 SOP-CR-002</span>'}
       ]}
    ],
    endings:{
      3:{label:'Strong',title:'You handled a weekend SAE with the PI unavailable.',text:'You correctly identified a severity-based expectedness issue and handled an ambiguous instruction about documentation by clarifying rather than assuming. These are the situations that test the regulatory framework: not in a classroom, but at 10:30 on a Saturday night.'},
      2:{label:'Competent with gaps',title:'You handled most of this well, but one decision could have created a problem.',text:'Weekend SAE management is one of the highest-pressure situations in clinical research. The combination of time pressure, PI unavailability, and incomplete information makes every shortcut tempting.'},
      1:{label:'Needs development',title:'The pressure of a weekend call shaped too many of your decisions.',text:'The awareness clock, the expectedness determination, and the documentation integrity are three distinct obligations. Review the feedback on each one.'},
      0:{label:'Critical concern',title:'An incorrectly timed report, a questionable expectedness classification, and a falsified awareness date.',text:'Each of these would be a separate finding in an inspection. Weekend pressure explains why these errors happen; it does not make them defensible.'}
    }
  },

  /* ── SCENARIO 4: RA — The Previous CRC's Files ── */
  {
    id:'predecessor-files', role:'ra',
    topic:'Data Integrity \u00b7 Delegation \u00b7 Research Integrity',
    title:'Discrepancies in a Predecessor\u2019s Files',
    desc:'You\u2019re three months in. While filing documents, you discover your predecessor signed checklists for visits she didn\u2019t attend.',
    scenes:3, ref:'SOP-CR-002, 014, 015', live:true,
    intro:'You replaced \u00c9milie, a well-liked CRC who left for another institution. Your PI trained you personally and frequently mentions how smoothly she ran the study. A monitoring visit is next week.',
    learner:{name:'Karim',role:'Research Assistant, 3 months on the job. Preparing the ISF for a monitoring visit next week.'},
    npc:{name:'Dr. Bhatt',role:'PI. Supportive, busy, thinks highly of \u00c9milie. Not trying to cover anything up \u2014 genuinely believes there\u2019s a simple explanation.'},
    pressurePoints:[
      {label:'Pressure point 1 \u2014 The discovery',
       narration:'While organizing the ISF, you notice three consent checklists signed by \u00c9milie during a two-week period when she was on vacation and Dr. Bhatt was the only person on-site. You mention it to Dr. Bhatt.',
       speaker:'Dr. Bhatt',
       dialogue:'<p>\u00c9milie was incredibly organized \u2014 she probably completed the checklists before she left and just dated them for the visit days. She always prepared everything in advance. I wouldn\u2019t worry about it.</p>',
       choices:[
         {text:'I hear you, but the dates don\u2019t line up with the delegation log \u2014 she was listed as on leave. I think we need to look into who actually conducted those consents before the monitor sees this next week.',quality:'good',label:'Correct',
          feedback:'<p>You\u2019re not accusing anyone \u2014 you\u2019re identifying a documentation discrepancy that needs resolution before the monitoring visit. The investigation is straightforward: check who was on-site, whether consents were actually obtained, and whether the documentation can be corrected with a note-to-file. Identifying this proactively is the stronger position.</p><span class="jc-fb-ref">ALCOA+ \u00b7 ICH E6(R3) \u00a72.8.6 \u00b7 SOP-CR-014 \u00b7 SOP-CR-015</span>'},
         {text:'That makes sense \u2014 she was very thorough. I\u2019ll file them as they are.',quality:'fail',label:'Pre-dating consent documentation is falsification',
          feedback:'<p>A consent checklist documents that a specific person conducted a specific consent discussion on a specific date. If \u00c9milie was on vacation, she did not conduct those discussions. Pre-completing and pre-dating consent documentation is falsification, even if the consents themselves were obtained properly by someone else. The monitoring visit next week will surface the same discrepancy.</p><span class="jc-fb-ref">ALCOA+ \u00b7 ICH E6(R3) \u00a72.8.6 \u00b7 SOP-CR-008 \u00b7 SOP-CR-014</span>'},
         {text:'I\u2019ll make a note in my own files but I don\u2019t want to create a problem right before the monitoring visit.',quality:'partial',label:'Self-protection without addressing the problem',
          feedback:'<p>Making a personal note protects you but doesn\u2019t address the problem. The monitor will cross-reference the signatures against the delegation log and study calendar next week \u2014 exactly as you just did. If the discrepancy is discovered without any prior site investigation, it looks worse than if the site identified and addressed it proactively.</p><span class="jc-fb-ref">SOP-CR-015 \u00b7 SOP-CR-014</span>'}
       ]},
      {label:'Pressure point 2 \u2014 The pattern',
       narration:'You look more carefully and find additional issues: one consent form where the participant signed three days before \u00c9milie documented the discussion, and an eligibility checklist confirming a lab value that wasn\u2019t available until two days after the confirmation date. You bring this to Dr. Bhatt.',
       speaker:'Dr. Bhatt',
       dialogue:'<p>Look, \u00c9milie was with us for four years and she never had a single finding. These are probably just sloppy dating \u2014 she was juggling a lot at the end before she left. I think we document what we found and move on. No need to involve QA or anyone else.</p>',
       choices:[
         {text:'You\u2019re right \u2014 she was probably just rushing. I\u2019ll write a note-to-file for each one and we\u2019ll move on.',quality:'fail',label:'A pattern requires more than individual notes-to-file',
          feedback:'<p>What you\u2019ve found is a pattern: consent checklists signed during vacation, mismatched dates, and a lab confirmation predating the result. This is no longer sloppy dating \u2014 it\u2019s a pattern across multiple documents. A note-to-file for each individual finding without escalation treats a systemic issue as isolated mistakes.</p><span class="jc-fb-ref">SOP-CR-014 \u00b7 ICH E6(R3) \u00a74 \u00b7 MUHC Research Integrity Policy</span>'},
         {text:'I\u2019ll document everything I found and present it to the monitor proactively during the visit.',quality:'partial',label:'Proactive, but without institutional support',
          feedback:'<p>Proactive disclosure is better than waiting for the monitor to find it. But presenting findings without first involving QA or the compliance office puts you in the position of reporting on your predecessor without institutional support. The monitor will ask what steps the site is taking \u2014 and \u201cthe RA found it and brought it to the visit\u201d is not a CAPA.</p><span class="jc-fb-ref">SOP-CR-014 \u00b7 SOP-CR-015</span>'},
         {text:'I think this goes beyond dating errors \u2014 there\u2019s a pattern. I\u2019d like to loop in QA or the research compliance office before the monitoring visit so the site has a documented response ready.',quality:'good',label:'Correct',
          feedback:'<p>What you\u2019ve found may have an innocent explanation \u2014 but the pattern warrants formal review. Involving QA before the monitoring visit means the site can present the findings as self-identified with an investigation in progress. That is fundamentally different from having the monitor discover unaddressed discrepancies.</p><span class="jc-fb-ref">SOP-CR-014 \u00b7 SOP-CR-002 \u00b7 MUHC Research Integrity Policy</span>'}
       ]},
      {label:'Pressure point 3 \u2014 The personal cost',
       narration:'Dr. Bhatt pulls you aside.',
       speaker:'Dr. Bhatt',
       dialogue:'<p>Karim, I appreciate your diligence, but I want to be honest with you. If we escalate this formally, it could reflect poorly on my oversight of the study \u2014 these happened on my watch. And \u00c9milie is a colleague. I\u2019m not asking you to hide anything \u2014 I\u2019m asking you to let me handle it quietly. I\u2019ll review the files myself and make sure everything is in order for the monitor.</p>',
       choices:[
         {text:'I understand \u2014 you know the study better than I do. I\u2019ll leave it with you.',quality:'fail',label:'The person whose oversight is in question cannot be the sole reviewer',
          feedback:'<p>Dr. Bhatt is asking you to let the person whose oversight is in question investigate and resolve the findings alone. His concern about how it reflects on him is understandable \u2014 but is exactly why he should not be the sole person managing this. If the monitor later finds issues that were identified internally but not properly escalated, both his oversight and your awareness become part of the finding.</p><span class="jc-fb-ref">ICH E6(R3) \u00a72.3.1 \u00b7 MUHC Research Integrity Policy \u00b7 SOP-CR-014</span>'},
         {text:'I understand this is uncomfortable, and I\u2019m not trying to create a problem for you or \u00c9milie. But I think the safest path for everyone \u2014 including you \u2014 is to have QA review this independently. That way the monitor sees that the site self-identified the issue and followed its own quality process.',quality:'good',label:'Correct',
          feedback:'<p>You\u2019ve acknowledged Dr. Bhatt\u2019s concern without conceding the point. Framing the escalation as protection for the PI \u2014 not as an accusation \u2014 is both accurate and effective. An independent QA review that finds documentation errors and a CAPA is a routine quality event. A monitor discovering the same pattern with no site response is a finding that questions PI oversight.</p><span class="jc-fb-ref">ICH E6(R3) \u00a72.3.1 \u00b7 SOP-CR-014 \u00b7 SOP-CR-002</span>'},
         {text:'I won\u2019t escalate it formally, but I\u2019m going to document exactly what I found, when I found it, and that I raised it with you.',quality:'partial',label:'Self-protection without resolution',
          feedback:'<p>You\u2019re protecting yourself, which is understandable. But a documented record of raising concerns that were then not acted on is not a good outcome for anyone. If the monitor finds the issues and sees that you identified them weeks earlier but the site took no action, the finding is worse.</p><span class="jc-fb-ref">SOP-CR-014 \u00b7 MUHC Research Integrity Policy</span>'}
       ]}
    ],
    endings:{
      3:{label:'Strong',title:'You identified a pattern, escalated properly, and handled the personal dynamics professionally.',text:'Raising concerns about a colleague\u2019s work, especially one your PI respects, is one of the hardest situations in clinical research. You worked through it without backing down or making it adversarial.'},
      2:{label:'Competent with gaps',title:'You caught the problem and made some of the right moves.',text:'Review the feedback. The gap is usually between recognizing the issue and following through on the escalation.'},
      1:{label:'Needs development',title:'The personal dynamics shaped your decisions more than the evidence did.',text:'A respected predecessor, a supportive PI, a monitoring visit next week: these are the conditions in which documentation errors become institutional problems.'},
      0:{label:'Critical concern',title:'You found a pattern of discrepancies and chose not to pursue any of them.',text:'If the monitor identifies what you already identified, the site\u2019s position is significantly worse than if it had self-reported. The personal discomfort of escalation is real, but it\u2019s temporary.'}
    }
  },

  /* ── SCENARIO 5: PM — The Close-Out ── */
  {
    id:'close-out', role:'pm',
    topic:'Study Close-Out \u00b7 Protocol Deviations \u00b7 Consent',
    title:'Study Close-Out Under Sponsor Deadline',
    desc:'The sponsor needs the site file closed by end of June. Three open items that can\u2019t be rushed.',
    scenes:3, ref:'SOP-CR-016, 026, 008', live:true,
    intro:'The last participant completed their final visit six weeks ago. The sponsor\u2019s regulatory submission is in August and they need the site file closed by end of June.',
    learner:{name:'Nathalie',role:'Project Manager for a completed Phase III cardiovascular trial.'},
    npc:{name:'James Chen',role:'Sponsor Clinical Operations Lead. Managing close-out across 40 sites globally. Yours is one of the last.'},
    pressurePoints:[
      {label:'Pressure point 1 \u2014 The open deviations',
       narration:'James opens the call by reviewing the close-out checklist.',
       speaker:'James',
       dialogue:'<p>Your file is in good shape overall. I see six protocol deviations still open \u2014 five minor visit-window issues and one major eligibility deviation that\u2019s been open for four months. For the five minor ones, can your PI sign the CAPA forms I sent? And for the major one \u2014 we\u2019ve assessed it as having no impact on data integrity. Can we close it with that assessment?</p>',
       choices:[
         {text:'If you\u2019ve assessed the eligibility deviation as no impact, I\u2019m comfortable closing it with your assessment on file.',quality:'fail',label:'The sponsor\u2019s assessment doesn\u2019t substitute for the PI\u2019s',
          feedback:'<p>The sponsor\u2019s assessment of impact does not substitute for the PI\u2019s independent assessment, and it does not substitute for REB notification. A major eligibility deviation open for four months without a PI assessment or REB report is a compliance failure \u2014 closing it on the sponsor\u2019s assessment alone adds another one.</p><span class="jc-fb-ref">SOP-CR-026 \u00a75.3.3 \u00b7 ICH E6(R3) \u00a72.5.2</span>'},
         {text:'I\u2019ll get the PI to sign everything and close them all out this week.',quality:'partial',label:'The minor ones are straightforward; the major one isn\u2019t',
          feedback:'<p>Getting the PI to sign the minor CAPA forms quickly is fine. But treating the major eligibility deviation the same way \u2014 as a signature exercise \u2014 misses the point. The PI must review the case, document an independent impact assessment, and the REB must be notified. Rushing a major deviation through close-out is how incomplete CAPAs end up in the regulatory file.</p><span class="jc-fb-ref">SOP-CR-026 \u00a75.3.3 \u00b7 SOP-CR-016</span>'},
         {text:'The five minor ones \u2014 I\u2019ll get those signed this week. But the major eligibility deviation needs the PI\u2019s own impact assessment and needs to go to the REB if it hasn\u2019t already. I can\u2019t close it on the sponsor\u2019s assessment alone.',quality:'good',label:'Correct',
          feedback:'<p>You\u2019ve separated the straightforward items from the one that requires more work. The major deviation has specific obligations: independent PI assessment, REB notification, and a documented CAPA \u2014 not just a signature. You can close the minor ones quickly and give James a realistic timeline for the major one.</p><span class="jc-fb-ref">SOP-CR-026 \u00a75.3.3 \u00b7 ICH E6(R3) \u00a72.5.2 \u00b7 SOP-CR-016</span>'}
       ]},
      {label:'Pressure point 2 \u2014 The unsigned report',
       narration:'James moves on to the monitoring visit reports.',
       speaker:'James',
       dialogue:'<p>The final monitoring visit report from February still doesn\u2019t have the PI\u2019s co-signature. Our CRA sent it three times. Can you get that signed by Friday?</p>',
       choices:[
         {text:'Dr. Martin has told me he hasn\u2019t reviewed it yet. I\u2019ll schedule a 30-minute block with him this week specifically for this review, and I\u2019ll let you know once he\u2019s signed after reading it. If that pushes past Friday, I\u2019ll give you a firm date.',quality:'good',label:'Correct',
          feedback:'<p>You\u2019re being transparent about the reason for the delay, proposing a concrete solution \u2014 dedicated time for actual review \u2014 and offering a firm date rather than a vague promise. James will appreciate a realistic timeline more than another commitment you can\u2019t keep.</p><span class="jc-fb-ref">ICH E6(R3) \u00a72.3.1 \u00b7 SOP-CR-013 \u00b7 SOP-CR-016</span>'},
         {text:'I\u2019ll get him to sign it by Friday \u2014 I\u2019ll put it on his desk with a sticky note.',quality:'fail',label:'If the PI hasn\u2019t read it, a signature is meaningless',
          feedback:'<p>If Dr. Martin hasn\u2019t read the report, getting his signature by Friday means asking him to sign a document he hasn\u2019t reviewed. His signature attests that he has read it, agrees with the findings, and accepts the action items. Signing unread documents is a data integrity issue and one of the most common PI oversight findings.</p><span class="jc-fb-ref">ICH E6(R3) \u00a72.3.1 \u00b7 GCP Principle 10 (Defined Roles and Responsibilities) \u00b7 ALCOA+ \u00b7 SOP-CR-013</span>'},
         {text:'I\u2019ll talk to him \u2014 he\u2019s been busy but I\u2019m sure he can review it this week.',quality:'partial',label:'Three previous promises didn\u2019t work',
          feedback:'<p>\u201cI\u2019m sure he can review it\u201d is an optimistic commitment based on three previous failures. You\u2019re not giving James a firm date, and you\u2019re not addressing the underlying problem. If he doesn\u2019t review it by Friday, you\u2019ll be back on another call making the same promise.</p><span class="jc-fb-ref">SOP-CR-013 \u00b7 SOP-CR-016</span>'}
       ]},
      {label:'Pressure point 3 \u2014 The withdrawal',
       narration:'James raises a final item.',
       speaker:'James',
       dialogue:'<p>Participant 044 withdrew consent eight weeks ago. The withdrawal form only says \u201cparticipant withdrew consent.\u201d It doesn\u2019t specify whether she withdrew from procedures only or also from data use. Since she completed all visits before withdrawing, can we assume she\u2019s fine with her data being used in the final analysis?</p>',
       choices:[
         {text:'She completed all her visits \u2014 I think it\u2019s safe to assume she just didn\u2019t want to come back. Include her data.',quality:'fail',label:'You cannot assume the scope of an unspecified withdrawal',
          feedback:'<p>\u201cParticipant withdrew consent\u201d without specifying scope is an incomplete record. Assuming the narrowest interpretation to preserve the data is convenient but not supported by the documentation. If the participant intended to withdraw her data and it was included in the submission, that\u2019s both a consent violation and a regulatory problem.</p><span class="jc-fb-ref">ICH E6(R3) \u00a72.9.1 \u00b7 TCPS2 Art. 3.1 \u00b7 Loi 25 \u00b7 SOP-CR-008</span>'},
         {text:'The withdrawal form doesn\u2019t specify the scope, so we don\u2019t know her intent. We need to contact her to clarify \u2014 a brief, respectful call. I can have the CRC reach out this week.',quality:'good',label:'Correct',
          feedback:'<p>The withdrawal conversation should have clarified the scope at the time \u2014 but it didn\u2019t, and the fix is to go back and ask. A brief, non-pressuring call that respects her decision and simply asks for clarification is appropriate. If she\u2019s unreachable, consult the REB on how to handle the ambiguity.</p><span class="jc-fb-ref">ICH E6(R3) \u00a72.9.1 \u00b7 TCPS2 Art. 3.1 \u00b7 Loi 25 \u00b7 SOP-CR-008 \u00a75.1.16</span>'},
         {text:'Let me check the consent form \u2014 it might have a clause about data use after withdrawal that covers this.',quality:'partial',label:'A reasonable first step, but not sufficient',
          feedback:'<p>Checking the ICF is reasonable \u2014 many forms include language about data retention after withdrawal. But even if the ICF says data may be retained, the participant\u2019s actual stated wishes at the time of withdrawal take precedence. If she said \u201cI want everything removed\u201d and the CRC only documented \u201cwithdr consent,\u201d the ICF clause doesn\u2019t resolve the ambiguity.</p><span class="jc-fb-ref">TCPS2 Art. 3.1 \u00b7 ICH E6(R3) \u00a72.9.1 \u00b7 SOP-CR-008</span>'}
       ]}
    ],
    endings:{
      3:{label:'Strong',title:'You managed close-out pressure without cutting corners.',text:'You kept all three clean: independent PI assessment of a major deviation, genuine PI review of monitoring reports, and proper resolution of an ambiguous withdrawal.'},
      2:{label:'Competent with gaps',title:'You handled most of the close-out correctly.',text:'One decision could create a problem in the regulatory file. Close-out errors are particularly costly because they go directly into the submission archive.'},
      1:{label:'Needs development',title:'The deadline pressure drove too many of your decisions.',text:'Close-out feels administrative, but the signatures, assessments, and records you finalize now become the permanent regulatory record.'},
      0:{label:'Critical concern',title:'A deviation closed on the sponsor\u2019s assessment, an unread report signed, and an ambiguous withdrawal resolved by assumption.',text:'Each of these would be an audit finding. The sponsor\u2019s August deadline is their constraint, not your standard.'}
    }
  },

  /* ── SCENARIO 6: Data Analyst — The Query Storm ── */
  {
    id:'query-storm', role:'data',
    topic:'Data Integrity \u00b7 Delegation \u00b7 PI Oversight',
    title:'Queries Before Database Lock',
    desc:'140 sponsor queries arrive 48 hours before lock. Some of them sit outside your delegated scope.',
    scenes:3, ref:'SOP-CR-014, 002', live:true,
    intro:'Database lock is Monday. It\u2019s Thursday afternoon and the sponsor has just sent 140 data queries. The PI is in clinic all day Friday.',
    learner:{name:'L\u00e9a',role:'Data Analyst on a Phase III respiratory trial. Database lock is Monday.'},
    npc:{name:'Sylvie',role:'Project Manager. Not malicious, just under extreme deadline pressure. She\u2019s been told the lock cannot slip.'},
    pressurePoints:[
      {label:'Pressure point 1 \u2014 The clinical queries',
       narration:'Sylvie comes to your desk with the query list. About 90 are administrative. The other 50 are clinical \u2014 AE grades, con-med classifications, eligibility re-confirmations.',
       speaker:'Sylvie',
       dialogue:'<p>Can you answer the clinical ones based on what\u2019s in the source records? Dr. Pellerin is in clinic until 5 tomorrow. He can review your answers Monday morning before the lock.</p>',
       choices:[
         {text:'Sure \u2014 I can see the source records and most of these are straightforward. I\u2019ll flag anything I\u2019m unsure about for Dr. Pellerin.',quality:'fail',label:'Clinical queries require clinical judgement',
          feedback:'<p>AE grading, relatedness assessment, and eligibility confirmation are physician responsibilities that cannot be delegated to a data analyst regardless of access to source records. Even if Dr. Pellerin reviews Monday, the query responses will be timestamped with your name \u2014 not the date the PI reviewed them.</p><span class="jc-fb-ref">ICH E6(R3) \u00a72.3.2 \u00b7 SOP-CR-002 \u00b7 SOP-CR-014 \u00b7 ALCOA+</span>'},
         {text:'I\u2019ll handle all 90 administrative queries today and tomorrow. For the clinical ones, I\u2019ll triage them and prepare a summary sheet so Dr. Pellerin can work through them efficiently \u2014 but I can\u2019t answer them myself. Can we get him 30 minutes tomorrow between patients?',quality:'good',label:'Correct',
          feedback:'<p>You\u2019ve separated what\u2019s in your scope from what isn\u2019t, and proposed a practical path forward. Thirty minutes of focused PI time with a prepared summary is often enough. If some queries remain open, a short lock delay is better than responses answered outside the proper delegation.</p><span class="jc-fb-ref">SOP-CR-002 \u00b7 SOP-CR-014 \u00b7 ICH E6(R3) \u00a72.3.1</span>'},
         {text:'I can answer the ones where the source record is clear-cut \u2014 like a con-med that\u2019s obviously an analgesic.',quality:'partial',label:'The issue is scope, not difficulty',
          feedback:'<p>The problem isn\u2019t whether the answer is obvious \u2014 it\u2019s whether you\u2019re the right person to provide it. Con-med classification in a clinical trial involves checking against prohibited medications and assessing interactions with the study drug. The query was sent because the sponsor needs a documented clinical determination, not a data analyst\u2019s reading of the source.</p><span class="jc-fb-ref">SOP-CR-002 \u00b7 ICH E6(R3) \u00a72.3.2</span>'}
       ]},
      {label:'Pressure point 2 \u2014 The discrepancy',
       narration:'While working through administrative queries, you find one that\u2019s not administrative. The source shows systolic BP 162 mmHg; the eCRF shows 126 \u2014 a transposition. The protocol says systolic above 160 triggers a safety review. If 162 is correct, a safety review was missed.',
       speaker:'Sylvie',
       dialogue:'<p>Just correct the eCRF to match the source. It\u2019s clearly a typo \u2014 the digits are transposed.</p>',
       choices:[
         {text:'You\u2019re right \u2014 162 is in the source, so I\u2019ll update the eCRF and close the query.',quality:'fail',label:'The data correction is right; ignoring the safety implication isn\u2019t',
          feedback:'<p>Correcting the eCRF to match the source is the right data correction. But if the correct value is 162, a protocol-specified safety review should have been triggered and wasn\u2019t. Simply fixing the number without flagging the missed safety review means the data is now correct but the oversight failure is buried.</p><span class="jc-fb-ref">ICH E6(R3) \u00a72.5.2 \u00b7 SOP-CR-014</span>'},
         {text:'I\u2019ll correct the eCRF and add a note in the query response that the value may have had safety implications. The PI can follow up after lock.',quality:'partial',label:'Flagging is good; deferring to post-lock is not',
          feedback:'<p>Noting the safety implication is better than ignoring it. But \u201cthe PI can follow up after lock\u201d defers a potential deviation to a point where the database is frozen and corrections require a formal process. If this is a protocol deviation, it should be documented before lock.</p><span class="jc-fb-ref">SOP-CR-014 \u00b7 SOP-CR-026</span>'},
         {text:'I\u2019ll correct the eCRF to 162 \u2014 but this is bigger than a typo. A systolic above 160 should have triggered a safety review that didn\u2019t happen. I need to flag this to Dr. Pellerin before we close this query.',quality:'good',label:'Correct',
          feedback:'<p>You\u2019ve done both jobs: fixing the data error and identifying the clinical consequence. The missed safety review is a separate issue that requires PI assessment \u2014 was the participant harmed? Is this a protocol deviation? These questions need to be answered before database lock, not after.</p><span class="jc-fb-ref">SOP-CR-014 \u00b7 SOP-CR-026 \u00b7 ICH E6(R3) \u00a72.5.2</span>'}
       ]},
      {label:'Pressure point 3 \u2014 The value you doubt',
       narration:'Near the end of the administrative queries: participant 112\u2019s baseline potassium is 2.8 mEq/L. Source says 2.8, eCRF says 2.8. They match. But every other potassium across 12 months is between 4.0 and 4.5. A potassium of 2.8 is severely low. There\u2019s no clinical note about it.',
       speaker:'Sylvie',
       dialogue:'<p>The source says 2.8, the eCRF says 2.8. They match. Confirm it and move on.</p>',
       choices:[
         {text:'The values match, but this doesn\u2019t make clinical sense \u2014 every other potassium is 4.0 to 4.5 and there\u2019s no note addressing a critically low value. I want to check the original lab report before confirming, and the PI needs to see this.',quality:'good',label:'Correct',
          feedback:'<p>You\u2019re doing what a good data analyst does: not just matching numbers but recognizing when a value doesn\u2019t fit the clinical picture. The next step is to pull the original lab report \u2014 the value may have been transcribed incorrectly. Either way, the PI needs to review it before the database locks.</p><span class="jc-fb-ref">ICH E6(R3) \u00a74 \u00b7 ALCOA+ \u00b7 SOP-CR-014</span>'},
         {text:'They match \u2014 confirmed.',quality:'fail',label:'Source-to-eCRF concordance is not the only check',
          feedback:'<p>A potassium of 2.8 in a participant whose values are consistently 4.0\u20134.5 is a clinically significant outlier that should have been flagged and assessed. The absence of any clinical notation suggests either the value was never reviewed or the value itself is wrong \u2014 transcription from the lab, wrong patient\u2019s result, unit error. Confirming without investigation means a potentially erroneous value enters the locked database.</p><span class="jc-fb-ref">ICH E6(R3) \u00a74 \u00b7 ALCOA+ \u00b7 SOP-CR-014</span>'},
         {text:'I\u2019ll confirm the match but add a data note flagging the discrepancy with the participant\u2019s other values. Someone can review it post-lock.',quality:'partial',label:'Better than ignoring it, but check the lab report now',
          feedback:'<p>Flagging it is better than confirming blindly. But \u201cconfirm and note\u201d means the value enters the locked database as confirmed, with a note saying \u201cthis might be wrong.\u201d Post-lock corrections require a formal process. Check the original lab report now \u2014 it takes five minutes and could prevent a data integrity issue in the submission.</p><span class="jc-fb-ref">SOP-CR-014 \u00b7 ICH E6(R3) \u00a74</span>'}
       ]}
    ],
    endings:{
      3:{label:'Strong',title:'You maintained clear scope boundaries and caught what mattered.',text:'Clinical queries stayed with the physician, a missed safety review was surfaced, and a clinically implausible value was investigated before it entered the locked database.'},
      2:{label:'Competent with gaps',title:'You handled most of the pressure well.',text:'One decision could have let a problem slip into the locked database. The queries that look routine are sometimes the ones that matter most.'},
      1:{label:'Needs development',title:'The database lock deadline shaped too many of your decisions.',text:'The queries you answered, confirmed, or deferred each carry your name in the audit trail.'},
      0:{label:'Critical concern',title:'Clinical queries answered outside your delegation, a missed safety review buried, and an implausible value confirmed without investigation.',text:'The locked database becomes the regulatory record. What you confirm today is what the submission contains.'}
    }
  },

  /* -- SCENARIO 7: CRC -- The Consent Conversation -- */
  {
    id:'consent-conversation', role:'crc',
    topic:'Consent \u00b7 Capacity \u00b7 Quebec Civil Code',
    title:'Consent Capacity in Cognitive Decline',
    desc:'A participant shows signs of cognitive decline. Her daughter wants to keep her enrolled. Quebec law has specific rules here.',
    scenes:3, ref:'SOP-CR-008 · CCQ Art. 21, 24', live:true,
    intro:'Mrs. Ouellet, 74, enrolled 8 months ago when her cognition was intact. At today\u2019s visit, she seems noticeably confused. Her daughter Julie is in the waiting room.',
    learner:{name:'Sophie',role:'CRC on a 12-month observational study of cognitive decline in older adults.'},
    npc:{name:'Julie Ouellet',role:'Mrs. Ouellet\u2019s daughter. Caring, involved, wants her mother to continue.'},
    pressurePoints:[
      {label:'Pressure point 1 \u2014 The assessment',narration:'Mrs. Ouellet scores significantly worse on the cognitive assessment. When you ask about the study, she says: \u201cWhat is this for again? I forget why I come here.\u201d You step out to speak with Julie.',speaker:'Julie',dialogue:'<p>She\u2019s been having more bad days lately, but she still wants to come \u2014 she told me so this morning.</p>',choices:[
        {text:'I need to flag this to the PI. Her score dropped and she can\u2019t explain why she\u2019s here \u2014 we need a formal capacity reassessment before any study procedures today.',quality:'good',label:'Correct',feedback:'<p>You\u2019ve identified the trigger: a meaningful cognitive decline combined with statements suggesting she doesn\u2019t understand her participation. The PI needs to conduct a formal capacity assessment before any further procedures.</p><span class="jc-fb-ref">TCPS2 Art. 3.7 \u00b7 CCQ Art. 21 \u00b7 ICH E6(R3) \u00a72.8.1 \u00b7 SOP-CR-008</span>'},
        {text:'Julie says she wants to continue, and she did consent at baseline \u2014 I\u2019ll document the visit and note the lower score.',quality:'fail',label:'Baseline consent does not cover indefinite future',feedback:'<p>Mrs. Ouellet\u2019s statement is a significant indicator that she may no longer understand what she consented to. TCPS2 Article 3.7 requires capacity reassessment when there is reason to believe it has changed. Proceeding without reassessment means continuing with a participant whose capacity is in question.</p><span class="jc-fb-ref">TCPS2 Art. 3.7 \u00b7 ICH E6(R3) \u00a72.8.1 \u00b7 SOP-CR-008</span>'},
        {text:'I\u2019ll explain the study to her again and if she says she wants to continue, that\u2019s good enough.',quality:'partial',label:'Re-explaining is not a capacity assessment',feedback:'<p>Re-explaining is part of a capacity assessment, but \u201cif she says she wants to continue\u201d is not sufficient. Capacity means she understands the research, the risks, and what participation involves \u2014 not just that she\u2019s willing to be here.</p><span class="jc-fb-ref">TCPS2 Art. 3.7 \u00b7 CCQ Art. 21 \u00b7 SOP-CR-008</span>'}
      ]},
      {label:'Pressure point 2 \u2014 The daughter',narration:'The PI determines Mrs. Ouellet does not currently have capacity to consent. You discuss next steps with Julie.',speaker:'Julie',dialogue:'<p>I\u2019m her daughter and I have power of attorney. I want her to stay in the study \u2014 the visits give her structure. Can I consent for her?</p>',choices:[
        {text:'You have power of attorney, so yes \u2014 you can sign on her behalf and we\u2019ll continue.',quality:'fail',label:'Power of attorney does not automatically cover research',feedback:'<p>Power of attorney for care does not automatically authorize research participation under Quebec law. Civil Code Article 21 requires authorization by a mandatary, tutor, or curator AND approval by the Minister\u2019s designated REB. A general power of attorney may not cover research participation.</p><span class="jc-fb-ref">CCQ Art. 21 \u00b7 TCPS2 Art. 3.9 \u00b7 SOP-CR-008 \u00a77</span>'},
        {text:'Let me check the protocol \u2014 if it allows substitute consent, we can continue with your signature.',quality:'partial',label:'Protocol must comply with Quebec law',feedback:'<p>Checking the protocol is reasonable. But many sponsor protocols define \u201clegally authorized representative\u201d using US definitions that may not align with Quebec law. In Quebec, substitute consent for research requires a mandatary, tutor, or curator under Article 21. And Article 24 says if the participant objects, the objection overrides proxy consent.</p><span class="jc-fb-ref">CCQ Art. 21, 24 \u00b7 TCPS2 Art. 3.9 \u00b7 SOP-CR-008 \u00a77</span>'},
        {text:'I appreciate that you\u2019re looking out for her. But under Quebec law, research consent for someone who has lost capacity has specific requirements \u2014 I need to check with the PI and our REB about what your power of attorney covers.',quality:'good',label:'Correct',feedback:'<p>You\u2019re not dismissing Julie \u2014 you\u2019re being transparent that there\u2019s a legal process. The key question is whether her mandate specifically covers research participation, and whether the REB approved this protocol for incapacitated participants with a substitute consent plan.</p><span class="jc-fb-ref">CCQ Art. 21 \u00b7 TCPS2 Art. 3.9 \u00b7 SOP-CR-008 \u00a77</span>'}
      ]},
      {label:'Pressure point 3 \u2014 The objection',narration:'While you\u2019re explaining the process, Mrs. Ouellet says clearly: \u201cI don\u2019t want any more tests. I want to go home.\u201d',speaker:'Julie',dialogue:'<p>She doesn\u2019t know what she\u2019s saying. She was fine this morning \u2014 she told me she wanted to come.</p>',choices:[
        {text:'She did say she wanted to come this morning \u2014 Julie knows her better than we do. Let\u2019s finish the visit.',quality:'fail',label:'A participant\u2019s objection overrides proxy consent',feedback:'<p>Under Civil Code Article 24, if a person incapable of consenting objects to participation, that objection must be respected \u2014 even if a valid proxy has consented. \u201cI don\u2019t want any more tests\u201d is an objection. Julie\u2019s recollection of this morning does not override what Mrs. Ouellet is saying now.</p><span class="jc-fb-ref">CCQ Art. 24 \u00b7 TCPS2 Art. 3.9 \u00b7 SOP-CR-008</span>'},
        {text:'I hear you, Julie, and I know this is difficult. But your mother just said she doesn\u2019t want any more tests. Under Quebec law, even when someone else is authorized to consent, the participant\u2019s own objection has to be respected. We need to stop today\u2019s procedures.',quality:'good',label:'Correct',feedback:'<p>You\u2019ve acknowledged Julie\u2019s perspective without dismissing her, but you\u2019ve been clear about the legal requirement. Article 24 is unambiguous. Stopping today doesn\u2019t mean permanent withdrawal \u2014 it means today\u2019s visit cannot continue over her objection.</p><span class="jc-fb-ref">CCQ Art. 24 \u00b7 TCPS2 Art. 3.9 \u00b7 ICH E6(R3) \u00a72.8.1</span>'},
        {text:'Let\u2019s take a break and see if she feels differently in 30 minutes.',quality:'partial',label:'Risks becoming \u201cwait until she stops objecting\u201d',feedback:'<p>A break isn\u2019t inherently wrong, but \u201clet\u2019s see if she feels differently\u201d risks becoming \u201clet\u2019s wait until she stops objecting.\u201d The safer path is to respect the objection now and discuss next steps with the PI.</p><span class="jc-fb-ref">CCQ Art. 24 \u00b7 TCPS2 Art. 3.9</span>'}
      ]}
    ],
    endings:{
      3:{label:'Strong',title:'You identified a capacity concern, applied Quebec\u2019s substitute consent requirements, and respected a participant\u2019s objection.',text:'Consent in cognitive decline studies is one of the most legally complex areas in clinical research. The Quebec Civil Code requirements are specific and differ from what many protocols assume.'},
      2:{label:'Competent with gaps',title:'You got most of this right, but one decision left a gap.',text:'Review the Civil Code requirements: Article 21 for substitute consent, Article 24 for participant objection.'},
      1:{label:'Needs development',title:'The personal dynamics shaped your decisions more than the legal framework did.',text:'A caring daughter, a participant who seemed willing this morning \u2014 none of these override the Civil Code.'},
      0:{label:'Critical concern',title:'You continued procedures with questionable capacity, accepted proxy consent without verification, and proceeded over an expressed objection.',text:'Each is a serious consent violation under Quebec law.'}
    }
  },

  /* -- SCENARIO 8: PI -- The Sponsor-Investigator Study -- */
  {
    id:'sponsor-inv-study', role:'pi',
    topic:'Sponsor-Investigator Obligations \u00b7 IP Management \u00b7 Safety Reporting',
    title:'Running a Sponsor-Investigator Trial',
    desc:'You hold the CTA for your own trial. Your CRC just surfaced a backlog of compliance failures. Nobody is watching you the way a sponsor would.',
    scenes:3, ref:'SOP-CR-018, 010, 012', live:true,
    intro:'You are running your own investigator-initiated Phase II trial. You hold the CTA. 14 participants, single site. Your CIHR grant runs out in 4 months.',
    learner:{name:'Dr. Caron',role:'PI and sponsor-investigator on a Phase II trial of a repurposed drug for a rare autoimmune condition.'},
    npc:{name:'Am\u00e9lie',role:'Your CRC. Competent and direct. Not afraid to tell you when something is wrong.'},
    pressurePoints:[
      {label:'Pressure point 1 \u2014 The safety backlog',narration:'Am\u00e9lie comes into your office with a list.',speaker:'Am\u00e9lie',dialogue:'<p>I\u2019ve been going through the safety files. There are three SAEs from the past two months that were reported to the REB on time, but the two that qualify as SUSARs were never reported to Health Canada. You\u2019re the sponsor \u2014 that reporting goes through you. The 15-day window has passed for both.</p>',choices:[
        {text:'You\u2019re right \u2014 I dropped the ball. Let me submit both this week with the correct dates and a cover letter explaining the delay. And we need a process so this doesn\u2019t happen again.',quality:'good',label:'Correct',feedback:'<p>You\u2019ve acknowledged the gap, committed to honest late reporting, and identified the systemic issue. Late SUSAR reports are a compliance failure, but they\u2019re correctable. The root cause is likely that you don\u2019t have a pharmacovigilance process \u2014 as sponsor-investigator, you need to build one.</p><span class="jc-fb-ref">C.05.014 \u00b7 SOP-CR-012 \u00b7 ICH E6(R3) \u00a72.7</span>'},
        {text:'They were reported to the REB \u2014 that\u2019s the main thing. I\u2019ll submit them to Health Canada this week and backdate the cover letter so it looks like they were on time.',quality:'fail',label:'Backdating a regulatory submission is falsification',feedback:'<p>Backdating a submission to Health Canada is falsification of a regulatory record \u2014 one of the most serious violations under Division 5. REB reporting and Health Canada reporting are separate obligations that run in parallel. Submit them now, accurately dated, with an explanation for the delay.</p><span class="jc-fb-ref">C.05.014 \u00b7 Division 5 \u00b7 Food and Drug Act \u00b7 SOP-CR-012</span>'},
        {text:'Can you handle the Health Canada submissions? You know the details better than I do.',quality:'partial',label:'Am\u00e9lie can prepare them, but the responsibility is yours',feedback:'<p>Am\u00e9lie can prepare the reports, but you need to review, sign, and submit them. As sponsor-investigator, the SUSAR reports bear your name and your CTA number. This response also avoids the systemic problem: you don\u2019t have a pharmacovigilance process.</p><span class="jc-fb-ref">C.05.014 \u00b7 Division 5 \u00b7 SOP-CR-002</span>'}
      ]},
      {label:'Pressure point 2 \u2014 The labelling error',narration:'Am\u00e9lie brings you something else.',speaker:'Am\u00e9lie',dialogue:'<p>The last batch of study drug \u2014 the labels show the previous protocol version number. The protocol was amended three months ago and the labels weren\u2019t updated. We\u2019ve dispensed this batch to four participants over the past six weeks.</p>',choices:[
        {text:'The drug itself hasn\u2019t changed \u2014 same formulation, same dose. The label version is administrative. Update the remaining stock and move on.',quality:'fail',label:'IP labelling is a regulatory requirement',feedback:'<p>IP labelling is a regulatory requirement under Division 5. A label referencing an outdated protocol version creates traceability problems. You need to assess impact on the four affected participants, document the error, and file a deviation report.</p><span class="jc-fb-ref">C.05.010(d) \u00b7 SOP-CR-010 \u00b7 ICH E6(R3) \u00a72.10</span>'},
        {text:'That\u2019s a problem. I need to assess impact, document it, notify the REB, and correct the labels. Pull together the dispensing records for the four affected participants.',quality:'good',label:'Correct',feedback:'<p>The labelling error is a protocol deviation that needs documentation, impact assessment, and reporting. The formulation and dose haven\u2019t changed, so the safety impact is likely low \u2014 but that assessment needs to be made formally, not assumed.</p><span class="jc-fb-ref">SOP-CR-010 \u00b7 SOP-CR-026 \u00b7 C.05.010(d) \u00b7 ICH E6(R3) \u00a72.10</span>'},
        {text:'Ask the pharmacy to relabel the remaining stock and add a note to each file. We don\u2019t need to report it \u2014 the drug is correct.',quality:'partial',label:'Relabelling is not the whole response',feedback:'<p>Relabelling is part of the corrective action but not all of it. A labelling error affecting four participants is a protocol deviation. As sponsor-investigator, an IP deviation on your study reflects directly on your sponsor obligations.</p><span class="jc-fb-ref">SOP-CR-010 \u00b7 SOP-CR-026 \u00b7 C.05.010(d)</span>'}
      ]},
      {label:'Pressure point 3 \u2014 The grant',narration:'Am\u00e9lie raises the bigger picture.',speaker:'Am\u00e9lie',dialogue:'<p>The grant runs out in four months. We\u2019re behind on enrolment, your independent monitor hasn\u2019t visited in five months, and we\u2019ve just found two unreported SUSARs and an IP deviation. Do we pause enrolment until we catch up, or keep going?</p>',choices:[
        {text:'We can\u2019t pause \u2014 we\u2019ll lose the funding and never finish. Push through and clean things up as we go.',quality:'fail',label:'Active compliance failures are not a backlog',feedback:'<p>Two unreported SUSARs, an IP deviation, and a five-month monitoring gap are active compliance failures. If Health Canada inspects, each will be a finding. \u201cWe were running out of grant money\u201d is not a defence.</p><span class="jc-fb-ref">ICH E6(R3) \u00a73.2 \u00b7 Division 5 \u00b7 SOP-CR-013</span>'},
        {text:'Fix the SUSARs and IP labels, but keep enrolling. The monitoring can wait another month.',quality:'partial',label:'The monitoring gap is the systemic problem',feedback:'<p>Fixing immediate issues is essential. But extending a five-month monitoring gap to six is not acceptable. Independent monitoring is a Division 5 requirement for sponsor-investigator studies. The monitoring gap is the systemic problem behind the other failures.</p><span class="jc-fb-ref">SOP-CR-013 \u00b7 Division 5 \u00b7 ICH E6(R3) \u00a73.11</span>'},
        {text:'You\u2019re right. Get the SUSARs submitted this week, file the IP deviation, and contact the independent monitor. If we can get compliant within four weeks, we continue. If not, we pause.',quality:'good',label:'Correct',feedback:'<p>You\u2019re making the decision conditional on actually achieving compliance. The four-week assessment gives you a concrete deadline. Sponsor-investigator studies are particularly vulnerable to this: no external sponsor pushing for compliance, limited resources, and career investment creating pressure to continue.</p><span class="jc-fb-ref">ICH E6(R3) \u00a73.2 \u00b7 SOP-CR-013 \u00b7 Division 5</span>'}
      ]}
    ],
    endings:{
      3:{label:'Strong',title:'You faced the hardest version of research compliance: every obligation is yours personally.',text:'Honest reporting, proper documentation, and realistic assessment over shortcuts. That\u2019s what distinguishes a well-run investigator-initiated trial.'},
      2:{label:'Competent with gaps',title:'You handled most of this responsibly.',text:'One decision reflected the pressure of wearing both hats. Sponsor-investigator obligations are the same as any commercial sponsor\u2019s.'},
      1:{label:'Needs development',title:'Grant pressure and dual obligations shaped too many decisions.',text:'The obligations you deferred are the ones Health Canada will ask about first.'},
      0:{label:'Critical concern',title:'Falsified submission, undocumented IP deviation, and a decision to push through active failures.',text:'Health Canada does not distinguish between commercial and non-commercial sponsors.'}
    }
  },

  /* -- SCENARIO 9: CRC -- The Multi-Site Call -- */
  {
    id:'multi-site-call', role:'crc',
    topic:'Multi-Site Coordination \u00b7 Deviation Classification \u00b7 Competing Authorities',
    title:'Multi-Site Disagreement Before a DSMB',
    desc:'A participating site disagrees with your PI about a deviation classification. The DSMB meets in two weeks.',
    scenes:3, ref:'SOP-CR-026, 014, 010', live:true,
    intro:'You are coordinating site CRC for a multi-centre Phase III oncology trial with 8 sites across Canada. The DSMB meets in two weeks.',
    learner:{name:'Marc',role:'CRC at the coordinating site. Managing cross-site coordination for the trial.'},
    npc:{name:'Dr. Park',role:'Site 04 PI (Vancouver). Experienced, collegial, but firmly disagrees with your PI\u2019s assessment.'},
    pressurePoints:[
      {label:'Pressure point 1 \u2014 The classification',narration:'Site 04 reported a deviation: a participant received 150mg instead of 100mg \u2014 a 50% dose increase. No adverse effects. Site 04 classified it as minor. Your PI, Dr. Samson, says it should be major. You join a call with Dr. Park and the sponsor\u2019s medical monitor.',speaker:'Dr. Park',dialogue:'<p>I classified it as minor because the participant tolerated the dose without adverse effects. The protocol defines \u201cmajor\u201d as deviations that affect participant safety or data integrity \u2014 and this one didn\u2019t. I\u2019m comfortable with my classification.</p>',choices:[
        {text:'Dr. Samson is the coordinating PI \u2014 he wants it reclassified as major. Can we just update it before the DSMB?',quality:'fail',label:'The coordinating PI cannot unilaterally override the site PI',feedback:'<p>The coordinating PI can request a reclassification, but cannot override the site PI\u2019s assessment. Under ICH E6(R3), the site investigator is responsible for conduct at their site. The proper resolution is through the sponsor\u2019s medical monitor.</p><span class="jc-fb-ref">ICH E6(R3) \u00a72.5.2 \u00b7 SOP-CR-026</span>'},
        {text:'Dr. Park, I understand your reasoning. Dr. Samson\u2019s concern is that a 50% dose increase changes the risk profile regardless of outcome. Can the medical monitor weigh in on how this should be classified under the protocol\u2019s criteria?',quality:'good',label:'Correct',feedback:'<p>You\u2019ve acknowledged both positions and brought in the appropriate arbiter \u2014 the medical monitor, who has oversight of classification criteria across all sites. You\u2019re not overriding Dr. Park or deferring to Dr. Samson.</p><span class="jc-fb-ref">ICH E6(R3) \u00a72.5.2 \u00b7 SOP-CR-026 \u00b7 Sponsor oversight</span>'},
        {text:'The participant is fine and the site PI classified it \u2014 I think we should accept Site 04\u2019s classification.',quality:'partial',label:'Ignoring the coordinating PI\u2019s legitimate concern',feedback:'<p>Accepting the site PI\u2019s classification without discussion may seem respectful, but you\u2019re ignoring a legitimate concern. A 50% dose increase is not trivial, and the absence of harm is not the absence of risk. Your role is to facilitate resolution, not to pick sides.</p><span class="jc-fb-ref">ICH E6(R3) \u00a72.5.2 \u00b7 SOP-CR-026</span>'}
      ]},
      {label:'Pressure point 2 \u2014 The DSMB deadline',narration:'The medical monitor agrees with Dr. Samson \u2014 the deviation should be major. Dr. Park accepts. But a major deviation requires a CAPA and REB notification that can\u2019t be completed before the data cut. The sponsor\u2019s ops lead joins.',speaker:'Sponsor ops',dialogue:'<p>Can Site 04 submit the CAPA and REB notification as \u201cplanned\u201d in the DSMB package? The board needs to see a clean deviation log.</p>',choices:[
        {text:'The DSMB needs to see the deviation as it actually stands \u2014 open, with a CAPA in progress. Presenting it as resolved when it isn\u2019t would misrepresent compliance.',quality:'good',label:'Correct',feedback:'<p>An open major deviation with a CAPA in progress is a factual status. The DSMB can assess the risk with accurate information. Presenting a false picture to a safety board defeats its purpose.</p><span class="jc-fb-ref">ICH E6(R3) \u00a73.9.3 \u00b7 SOP-CR-026 \u00b7 DSMB charter</span>'},
        {text:'That sounds reasonable \u2014 as long as it\u2019s filed eventually.',quality:'fail',label:'A CAPA that hasn\u2019t been implemented is not a CAPA',feedback:'<p>Including an incomplete CAPA in the DSMB package and calling the deviation \u201cresolved\u201d misrepresents the site\u2019s compliance status to the safety board. The DSMB exists to assess participant safety with accurate information.</p><span class="jc-fb-ref">ICH E6(R3) \u00a73.9.3 \u00b7 SOP-CR-026 \u00b7 DSMB charter</span>'},
        {text:'Can we push the data cut back two weeks to give Site 04 time?',quality:'partial',label:'A delay that may not be necessary',feedback:'<p>Better than misrepresenting the status. But a two-week delay affects all 8 sites. The simpler path is to present the deviation accurately. Not every open item needs resolution before a DSMB review.</p><span class="jc-fb-ref">ICH E6(R3) \u00a73.9.3</span>'}
      ]},
      {label:'Pressure point 3 \u2014 The root cause',narration:'After the call, you review Site 04\u2019s report. The dosing error occurred because the pharmacy stored 150mg and 100mg vials side by side with similar labels. The same pharmacy supplies Sites 05 and 06. The sponsor hasn\u2019t asked about other sites.',speaker:'Am\u00e9lie (message)',dialogue:'<p>Should we flag this to Sites 05 and 06? The sponsor hasn\u2019t asked us to \u2014 they\u2019re focused on Site 04.</p>',choices:[
        {text:'The sponsor hasn\u2019t asked \u2014 let\u2019s stay in our lane and focus on Site 04.',quality:'fail',label:'You have safety-relevant information \u2014 withholding it is not \u201cstaying in your lane\u201d',feedback:'<p>The sponsor may not know the same pharmacy serves three sites. If the storage issue exists for Sites 05 and 06, they have the same risk. Waiting for the sponsor to connect the dots when you already have the information is withholding safety-relevant information.</p><span class="jc-fb-ref">ICH E6(R3) \u00a72.10 \u00b7 SOP-CR-010 \u00b7 Quality management</span>'},
        {text:'I\u2019ll mention it to Dr. Samson and let him decide whether to raise it.',quality:'partial',label:'Telling the PI is good; leaving the decision ambiguous is not',feedback:'<p>Telling Dr. Samson is appropriate. But a known IP storage issue at a shared pharmacy is safety-relevant. Passing it up with a clear recommendation is better than leaving the decision ambiguous.</p><span class="jc-fb-ref">ICH E6(R3) \u00a72.10 \u00b7 Quality management</span>'},
        {text:'Yes \u2014 I\u2019ll flag it to the sponsor and recommend they alert Sites 05 and 06 to verify their pharmacy storage. This is a systemic risk, not site-specific.',quality:'good',label:'Correct',feedback:'<p>You\u2019ve identified that the root cause affects multiple sites. Flagging this with a recommendation is the right escalation. You\u2019d be under-performing if you didn\u2019t.</p><span class="jc-fb-ref">ICH E6(R3) \u00a72.10 \u00b7 SOP-CR-010 \u00b7 Quality management</span>'}
      ]}
    ],
    endings:{
      3:{label:'Strong',title:'You held the line on a PI disagreement, protected the DSMB review, and identified a systemic risk across sites.',text:'Multi-site coordination at the CRC level requires judgement that goes beyond your own site\u2019s obligations.'},
      2:{label:'Competent with gaps',title:'You handled most of the multi-site dynamics well.',text:'One decision either deferred a judgement you should have made or accepted a framing you should have questioned.'},
      1:{label:'Needs development',title:'Competing pressures shaped too many of your decisions.',text:'PI disagreements, DSMB deadlines, sponsor expectations \u2014 these are where coordinating-site CRC judgement matters most.'},
      0:{label:'Critical concern',title:'An overridden site PI, a misrepresented deviation log, and an unescalated systemic risk.',text:'The coordinating CRC role exists precisely to prevent these outcomes.'}
    }
  }
];

/* ════════════════════════════════════════════
   JUDGEMENT CALLS — ENGINE (role-based)
════════════════════════════════════════════ */
var jcCurrentScenario = null;
var jcCurrentScene    = 0;
var jcScores          = [];
var jcGoodCount       = 0;
var jcCurrentRoleId   = '';

var JC_ROLES = [
  { id: 'crc',   name: 'Clinical Research Coordinator', short: 'You\u2019re the CRC' },
  { id: 'pi',    name: 'Principal Investigator',        short: 'You\u2019re the PI' },
  { id: 'nurse', name: 'Research Nurse',                short: 'You\u2019re the Research Nurse' },
  { id: 'ra',    name: 'Research Assistant',             short: 'You\u2019re the RA' },
  { id: 'pm',    name: 'Project Manager',                short: 'You\u2019re the PM' },
  { id: 'data',  name: 'Data Analyst',                   short: 'You\u2019re the Data Analyst' }
];

function jcBuildHub() {
  var grid = document.getElementById('jc-hub-grid');
  if (!grid) { return; }
  var html = '';
  for (var r = 0; r < JC_ROLES.length; r++) {
    var role = JC_ROLES[r];
    var count = 0;
    for (var s = 0; s < JC_SCENARIOS.length; s++) {
      if (JC_SCENARIOS[s].role === role.id && JC_SCENARIOS[s].live) { count++; }
    }
    if (count === 0) { continue; }
    html += '<div class="kp-dr-hub-card active" onclick="jcSelectRole(\'' + role.id + '\')">';
    html += '<div class="kp-dr-hub-accent"></div>';
    html += '<div class="kp-dr-hub-title">' + role.name + '</div>';
    html += '<div class="kp-dr-hub-meta">';
    html += '<span class="kp-dr-hub-count">' + count + ' scenario' + (count !== 1 ? 's' : '') + '</span>';
    html += '<span class="kp-dr-hub-cta">\u2192</span>';
    html += '</div></div>';
  }
  grid.innerHTML = html;
  var statEl = document.getElementById('stat-jc-count');
  var liveCount = 0;
  for (var j = 0; j < JC_SCENARIOS.length; j++) { if (JC_SCENARIOS[j].live) { liveCount++; } }
  if (statEl) { statEl.textContent = liveCount; }
}

function jcSelectRole(roleId) {
  jcCurrentRoleId = roleId;
  jcBuildRole(roleId);
  kpTransition(kpCurrentPhaseId, 'jc-role', false);
}

function jcBuildRole(roleId) {
  var role = null;
  for (var r = 0; r < JC_ROLES.length; r++) { if (JC_ROLES[r].id === roleId) { role = JC_ROLES[r]; break; } }
  /* header */
  var header = document.getElementById('jc-role-header');
  if (header && role) {
    header.innerHTML = '<div class="kp-dr-hub-header">' +
      '<div class="kp-dr-eyebrow">Judgement Calls \u2014 ' + role.name + '</div>' +
      '<div class="kp-dr-title">Choose a scenario</div>' +
      '</div>';
  }
  /* scenario cards */
  var grid = document.getElementById('jc-role-grid');
  if (!grid) { return; }
  var html = '';
  for (var i = 0; i < JC_SCENARIOS.length; i++) {
    var s = JC_SCENARIOS[i];
    if (s.role !== roleId) { continue; }
    var cls = s.live ? 'kp-dr-hub-card active' : 'kp-dr-hub-card';
    html += '<div class="' + cls + '" onclick="jcStartScenario(\'' + s.id + '\')">';
    html += '<div class="kp-dr-hub-accent"></div>';
    html += '<div class="kp-dr-hub-topic">' + s.topic + '</div>';
    html += '<div class="kp-dr-hub-title">' + s.title + '</div>';
    html += '<div class="kp-dr-hub-desc">' + s.desc + '</div>';
    html += '<div class="kp-dr-hub-meta">';
    html += '<span class="kp-dr-hub-count">' + s.scenes + ' pressure points \u00b7 ' + s.ref + '</span>';
    html += '<span class="kp-dr-hub-cta">' + (s.live ? 'Start \u2192' : 'Coming soon') + '</span>';
    html += '</div></div>';
  }
  grid.innerHTML = html;
}

function jcStartScenario(id) {
  for (var i = 0; i < JC_SCENARIOS.length; i++) {
    if (JC_SCENARIOS[i].id === id) { jcCurrentScenario = JC_SCENARIOS[i]; break; }
  }
  if (!jcCurrentScenario || !jcCurrentScenario.live) { return; }
  jcCurrentRoleId = jcCurrentScenario.role;
  jcCurrentScene = 0;
  jcScores = [];
  jcGoodCount = 0;
  /* update back label */
  var backLabel = document.getElementById('jc-back-role-label');
  var role = null;
  for (var r = 0; r < JC_ROLES.length; r++) { if (JC_ROLES[r].id === jcCurrentRoleId) { role = JC_ROLES[r]; break; } }
  if (backLabel && role) { backLabel.textContent = role.short; }
  jcRenderHeader();
  jcRenderTracker();
  jcRenderAllScenes();
  jcShowScene(0);
  kpTransition(kpCurrentPhaseId, 'jc-scenario', false);
}

function jcStartScenarioDirect(id) {
  for (var i = 0; i < JC_SCENARIOS.length; i++) {
    if (JC_SCENARIOS[i].id === id) { jcCurrentScenario = JC_SCENARIOS[i]; break; }
  }
  if (!jcCurrentScenario) { kpActivateDirect('jc-hub'); jcBuildHub(); return; }
  jcCurrentRoleId = jcCurrentScenario.role;
  jcCurrentScene = 0;
  jcScores = [];
  jcGoodCount = 0;
  var backLabel = document.getElementById('jc-back-role-label');
  var role = null;
  for (var r = 0; r < JC_ROLES.length; r++) { if (JC_ROLES[r].id === jcCurrentRoleId) { role = JC_ROLES[r]; break; } }
  if (backLabel && role) { backLabel.textContent = role.short; }
  jcRenderHeader();
  jcRenderTracker();
  jcRenderAllScenes();
  jcShowScene(0);
  kpActivateDirect('jc-scenario');
}

function jcGoHub() {
  var rw = document.getElementById('jc-restart-wrap');
  if (rw) { rw.parentNode.removeChild(rw); }
  jcCurrentScenario = null;
  jcCurrentRoleId = '';
  kpTransition(kpCurrentPhaseId, 'jc-hub', true);
}

function jcGoRole() {
  var rw = document.getElementById('jc-restart-wrap');
  if (rw) { rw.parentNode.removeChild(rw); }
  jcCurrentScenario = null;
  jcBuildRole(jcCurrentRoleId);
  kpTransition(kpCurrentPhaseId, 'jc-role', true);
}

/* Init JC stat on landing */
(function() {
  var liveCount = 0;
  for (var j = 0; j < JC_SCENARIOS.length; j++) { if (JC_SCENARIOS[j].live) { liveCount++; } }
  var statEl = document.getElementById('stat-jc-count');
  if (statEl) { statEl.textContent = liveCount; }
})();

/* ════════════════════════════════════════════
   JUDGEMENT CALLS — RENDERING
════════════════════════════════════════════ */
function jcRenderHeader() {
  var s = jcCurrentScenario;
  var html = '<div class="jc-scenario-header">';
  html += '<div class="jc-scenario-eyebrow">Judgement Call</div>';
  html += '<div class="jc-scenario-title">' + s.title + '</div>';
  html += '<div class="jc-scenario-intro">' + s.intro + '</div>';
  html += '<div class="jc-scenario-intro">' + s.pressurePoints.length + ' pressure points. At each one, choose how to respond.</div>';
  html += '<div class="jc-cast">';
  html += '<div class="jc-cast-item"><strong>You \u2014 ' + s.learner.name + '</strong><span class="jc-cast-you">You are playing this role</span><span class="jc-cast-role">' + s.learner.role + '</span></div>';
  html += '<div class="jc-cast-item"><strong>' + s.npc.name + '</strong><span class="jc-cast-role">' + s.npc.role + '</span></div>';
  html += '</div></div>';
  document.getElementById('jc-scenario-header').innerHTML = html;
}

function jcRenderTracker() {
  var n = jcCurrentScenario.pressurePoints.length;
  var html = '<div class="jc-tracker">';
  for (var i = 0; i < n; i++) { html += '<div class="jc-dot' + (i === 0 ? ' current' : '') + '" id="jc-dot-' + i + '"></div>'; }
  html += '</div>';
  document.getElementById('jc-tracker').innerHTML = html;
}

function jcRenderAllScenes() {
  var pp = jcCurrentScenario.pressurePoints;
  var keys = ['A','B','C'];
  var html = '';
  for (var i = 0; i < pp.length; i++) {
    html += '<div class="jc-scene" id="jc-scene-' + i + '" data-state="hidden">';
    html += '<div class="jc-card">';
    html += '<div class="jc-scene-label">' + pp[i].label + '</div>';
    html += '<div class="jc-narration">' + pp[i].narration + '</div>';
    html += '<div class="jc-dialogue"><div class="jc-speaker">' + pp[i].speaker + '</div>' + pp[i].dialogue + '</div>';
    html += '<div class="jc-choices-wrap" id="jc-choices-' + i + '"><div class="jc-choices-label">What do you say?</div>';
    for (var c = 0; c < pp[i].choices.length; c++) {
      html += '<button class="jc-choice" onclick="jcChoose(' + i + ',' + c + ')"><span class="jc-choice-key">' + keys[c] + '</span>' + pp[i].choices[c].text + '</button>';
    }
    html += '</div>';
    html += '<div class="jc-feedback-wrap" id="jc-feedback-' + i + '" style="display:none"></div>';
    html += '</div>';
    html += '</div>';
  }
  document.getElementById('jc-scenes').innerHTML = html;
  document.getElementById('jc-ending').innerHTML = '';
}

function jcShowScene(idx) {
  var el = document.getElementById('jc-scene-' + idx);
  if (el) { el.setAttribute('data-state', 'active'); }
}

function jcChoose(sceneIdx, choiceIdx) {
  var pp = jcCurrentScenario.pressurePoints[sceneIdx];
  var choice = pp.choices[choiceIdx];
  var total = jcCurrentScenario.pressurePoints.length;
  jcScores[sceneIdx] = choice.quality;
  if (choice.quality === 'good') { jcGoodCount++; }
  document.getElementById('jc-choices-' + sceneIdx).style.display = 'none';
  var arrow = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>';
  var fbHtml = '<div class="jc-feedback ' + choice.quality + '"><span class="jc-fb-label">' + choice.label + '</span>' + llLinkifyCitations(choice.feedback) + '</div>';
  if (sceneIdx < total - 1) {
    fbHtml += '<button class="jc-continue" onclick="jcNextScene(' + sceneIdx + ')">Continue ' + arrow + '</button>';
  } else {
    fbHtml += '<button class="jc-continue" onclick="jcShowEnding()">See your result ' + arrow + '</button>';
  }
  var fbEl = document.getElementById('jc-feedback-' + sceneIdx);
  fbEl.innerHTML = fbHtml;
  fbEl.style.display = 'block';
  var dot = document.getElementById('jc-dot-' + sceneIdx);
  if (dot) { dot.className = 'jc-dot done'; }
  if (sceneIdx < total - 1) {
    var nd = document.getElementById('jc-dot-' + (sceneIdx + 1));
    if (nd) { nd.className = 'jc-dot current'; }
  }
  fbEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function jcNextScene(currentIdx) {
  document.getElementById('jc-scene-' + currentIdx).setAttribute('data-state', 'hidden');
  jcCurrentScene = currentIdx + 1;
  jcShowScene(jcCurrentScene);
  var el = document.getElementById('jc-scene-' + jcCurrentScene);
  llPaneScrollToEl(el, 24);
}

function jcShowEnding() {
  var total = jcCurrentScenario.pressurePoints.length;
  var ending = jcCurrentScenario.endings[jcGoodCount] || jcCurrentScenario.endings[0];
  document.getElementById('jc-scene-' + (total - 1)).setAttribute('data-state', 'hidden');
  var html = '<div class="jc-ending">';
  html += '<div class="jc-ending-box"><div class="jc-ending-label">' + ending.label + ' \u2014 ' + jcGoodCount + ' of ' + total + '</div>';
  html += '<h3>' + ending.title + '</h3><p>' + ending.text + '</p></div>';
  html += '<div class="jc-review-label">Review your responses</div></div>';
  document.getElementById('jc-ending').innerHTML = html;
  for (var i = 0; i < total; i++) { document.getElementById('jc-scene-' + i).setAttribute('data-state', 'review'); }
  var rw = document.getElementById('jc-restart-wrap');
  if (rw) { rw.parentNode.removeChild(rw); }
  rw = document.createElement('div');
  rw.id = 'jc-restart-wrap';
  rw.style.marginTop = '32px';
  var restartSvg = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M1 4v6h6M23 20v-6h-6"/><path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15"/></svg>';
  rw.innerHTML = '<button class="jc-restart" onclick="jcRestartScenario()">' + restartSvg + ' Try again</button><button class="kp-back" style="margin-left:20px" onclick="jcGoRole()">Back to scenarios</button>';
  /* Append next-best-item recommendations grouped by this scenario's topic */
  if (typeof llNextBestHTML === 'function') {
    var libItem = null;
    for (var li = 0; li < LL_LIBRARY.length; li++) { if (LL_LIBRARY[li].id === jcCurrentScenario.id) { libItem = LL_LIBRARY[li]; break; } }
    if (libItem && libItem.topicId) {
      var nb = llNextBestHTML(libItem.topicId, 'scenario');
      if (nb) {
        var nbWrap = document.createElement('div');
        nbWrap.innerHTML = nb;
        rw.appendChild(nbWrap);
      }
    }
  }
  document.getElementById('jc-scenes').appendChild(rw);
  var endEl = document.getElementById('jc-ending');
  llPaneScrollToEl(endEl, 24);
}

function jcRestartScenario() {
  var id = jcCurrentScenario.id;
  var rw = document.getElementById('jc-restart-wrap');
  if (rw) { rw.parentNode.removeChild(rw); }
  jcStartScenario(id);
  llPaneTop();
}


/* ════════════════════════════════════════════
   INSPECTION PREP — ENGINE
════════════════════════════════════════════ */
var inspCurrentTopicId = '';
var inspQueue = [];
var inspIndex = 0;

/* Topic metadata for the hub cards */
var INSP_TOPICS = [
  { id:'delegation',  name:'Roles and Delegation',     count:5, ref:'SOP-CR-002' },
  { id:'consent',     name:'Informed Consent Process',  count:5, ref:'SOP-CR-008' },
  { id:'sae',         name:'Adverse Events and SAE Reporting', count:5, ref:'SOP-CR-012' },
  { id:'deviations',  name:'Protocol Deviations',       count:5, ref:'SOP-CR-014, 026' },
  { id:'monitoring',  name:'Monitoring and Audits',      count:5, ref:'SOP-CR-013, 017' },
  { id:'data',        name:'Data Integrity',             count:5, ref:'SOP-CR-014' },
  { id:'recruitment', name:'Recruitment and Screening',  count:5, ref:'SOP-CR-009' },
  { id:'gcp',         name:'GCP Principles',             count:5, ref:'ICH E6(R3)' }
];

function inspBuildHub() {
  var grid = document.getElementById('insp-hub-grid');
  if (!grid) { return; }
  var html = '';
  for (var i = 0; i < INSP_TOPICS.length; i++) {
    var t = INSP_TOPICS[i];
    html += '<div class="kp-dr-hub-card active" onclick="inspStartTopic(\'' + t.id + '\')">';
    html += '<div class="kp-dr-hub-accent"></div>';
    html += '<div class="kp-dr-hub-topic">' + t.name + '</div>';
    html += '<div class="kp-dr-hub-title">' + t.count + ' inspector questions</div>';
    html += '<div class="kp-dr-hub-desc">Practise answering questions an inspector might ask about ' + t.name.toLowerCase() + '.</div>';
    html += '<div class="kp-dr-hub-meta">';
    html += '<span class="kp-dr-hub-count">' + t.ref + '</span>';
    html += '<span class="kp-dr-hub-cta">Start \u2192</span>';
    html += '</div></div>';
  }
  grid.innerHTML = html;
  /* update landing stat */
  var statEl = document.getElementById('stat-insp-count');
  if (statEl) { statEl.textContent = KP_INSPECTION.length; }
}

function inspBuildQueue(topicId) {
  var queue = [];
  for (var i = 0; i < KP_INSPECTION.length; i++) {
    if (KP_INSPECTION[i].topicId === topicId) { queue.push(KP_INSPECTION[i]); }
  }
  return queue;
}

function inspStartTopic(topicId) {
  inspCurrentTopicId = topicId;
  inspQueue = inspBuildQueue(topicId);
  inspIndex = 0;
  inspRenderHeader(topicId);
  inspRenderCard();
  kpTransition(kpCurrentPhaseId, 'insp-practice', false);
}

function inspStartTopicDirect(topicId) {
  inspCurrentTopicId = topicId;
  inspQueue = inspBuildQueue(topicId);
  inspIndex = 0;
  inspRenderHeader(topicId);
  inspRenderCard();
  kpActivateDirect('insp-practice');
}

function inspRenderHeader(topicId) {
  var topicName = topicId;
  for (var i = 0; i < INSP_TOPICS.length; i++) {
    if (INSP_TOPICS[i].id === topicId) { topicName = INSP_TOPICS[i].name; break; }
  }
  var el = document.getElementById('insp-practice-header');
  el.innerHTML = '<div style="margin-bottom:24px">' +
    '<div style="font-size:9px;font-weight:700;letter-spacing:.2em;text-transform:uppercase;color:var(--sky);margin-bottom:8px">Inspection Prep</div>' +
    '<div style="font-size:clamp(18px,2.2vw,24px);font-weight:800;color:var(--navy);letter-spacing:-.02em;margin-bottom:6px">' + topicName + '</div>' +
    '<div style="font-size:13px;color:var(--textd)">' + inspQueue.length + ' questions \u00b7 Formulate your answer before revealing the model response</div>' +
    '</div>';
}

function inspRenderCard() {
  var wrap = document.getElementById('insp-card-wrap');
  if (inspIndex >= inspQueue.length) {
    /* Done — show completion and back */
    var inspNextBest = (typeof llNextBestHTML === 'function' && inspCurrentTopicId)
      ? llNextBestHTML(inspCurrentTopicId, 'inspection-card') : '';
    wrap.innerHTML = '<div style="max-width:680px">' +
      '<div style="border:2px solid var(--navy);padding:24px;margin-bottom:24px">' +
      '<div style="font-size:9px;font-weight:700;letter-spacing:.18em;text-transform:uppercase;color:var(--sky);margin-bottom:10px">Complete</div>' +
      '<h3 style="font-size:18px;font-weight:800;color:var(--navy);margin:0 0 12px">' + inspQueue.length + ' questions reviewed</h3>' +
      '<p style="font-size:14px;color:var(--textm);line-height:1.75;margin:0">The gap between knowing the answer and saying it clearly under pressure is where preparation matters. If any model response was stronger than what you had in mind, that\u2019s the one to practise.</p>' +
      '</div>' +
      '<button class="jc-restart" onclick="inspRestart()" style="margin-right:16px"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M1 4v6h6M23 20v-6h-6"/><path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15"/></svg> Try again</button>' +
      '<button class="kp-back" style="margin-left:4px" onclick="inspGoHub()">Back to topics</button>' +
      inspNextBest +
      '</div>';
    return;
  }
  var q = inspQueue[inspIndex];
  var num = inspIndex + 1;
  var total = inspQueue.length;
  var isLast = (num >= total);

  var html = '<div style="max-width:680px">';
  html += '<div style="font-size:11px;color:var(--textd);font-weight:600;margin-bottom:20px">' + num + ' of ' + total + '</div>';

  /* Two-column layout */
  html += '<div class="kp-insp-cols">';
  /* Left — question */
  html += '<div class="kp-insp-left">';
  html += '<div class="kp-insp-prompt">Inspector asks:</div>';
  html += '<div class="kp-insp-q">' + q.q + '</div>';
  html += '</div>';
  /* Right — prep + reveal */
  html += '<div class="kp-insp-right">';
  if (q.prep) { html += '<div class="kp-insp-prep">' + q.prep + '</div>'; }
  html += '<button class="kp-qcard-reveal-btn inspection-btn" id="insp-reveal-btn" onclick="inspReveal()">Show model response</button>';
  html += '<div class="kp-qcard-rat inspection-rat" id="insp-rat" style="display:none">';
  html += '<div class="kp-qcard-rat-label">Model response</div>';
  html += '<div class="kp-qcard-rat-text">' + llLinkifyCitations(q.model) + '</div>';
  html += '<div class="kp-insp-gap"><div class="kp-insp-gap-label">Common gap</div><div class="kp-insp-gap-text">' + llLinkifyCitations(q.gap) + '</div></div>';
  if (q.ref) { html += '<div class="kp-qcard-rat-ref">\u2192 ' + llLinkifyCitations(q.ref) + '</div>'; }
  html += '</div>';
  html += '</div>';
  html += '</div>';

  /* Next button */
  html += '<div style="margin-top:20px;display:none" id="insp-next-wrap">';
  html += '<button class="jc-continue" onclick="inspNext()">' + (isLast ? 'See results' : 'Next question') + ' <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg></button>';
  html += '</div>';

  html += '</div>';
  wrap.innerHTML = html;
}

function inspReveal() {
  var rat = document.getElementById('insp-rat');
  var btn = document.getElementById('insp-reveal-btn');
  var next = document.getElementById('insp-next-wrap');
  if (rat) { rat.style.display = 'block'; setTimeout(function() { rat.scrollIntoView({ behavior: 'smooth', block: 'nearest' }); }, 50); }
  if (btn) { btn.style.display = 'none'; }
  if (next) { next.style.display = 'block'; }
}

function inspNext() {
  inspIndex++;
  inspRenderCard();
  llPaneTop();
}

function inspRestart() {
  inspIndex = 0;
  inspRenderCard();
  llPaneTop();
}

function inspGoHub() {
  inspCurrentTopicId = '';
  kpTransition(kpCurrentPhaseId, 'insp-hub', true);
}

/* Init inspection stat on landing */
(function() {
  var statEl = document.getElementById('stat-insp-count');
  if (statEl) { statEl.textContent = KP_INSPECTION.length; }
})();

/* ── Landing stat refresh ───────────────────────────────────────────────
   Recalculates and writes all six landing-screen stat values.
   Called: (a) 300 ms after script load — after Mintlify finishes its own
   re-renders that reset dangerouslySetInnerHTML content; (b) every time
   kpGoHome() is called so navigating back always shows fresh counts.
──────────────────────────────────────────────────────────────────────── */
function llRefreshStats() {
  try {
    var el;
    /* knowledge checks */
    el = document.getElementById('stat-topics');
    if (el) { el.textContent = KP_TOPICS.filter(function(t) { return t.live; }).length; }
    el = document.getElementById('stat-questions');
    if (el) { el.textContent = KP_POOL.length + '+'; }
    /* team exercises */
    var teHub = document.getElementById('kp-phase-team-hub');
    if (teHub) {
      el = document.getElementById('stat-te-count');
      if (el) { el.textContent = teHub.querySelectorAll('.kp-dr-hub-card.active').length; }
    }
    /* document review */
    var drHub = document.getElementById('kp-phase-docreview-hub');
    if (drHub) {
      el = document.getElementById('stat-dr-count');
      if (el) { el.textContent = drHub.querySelectorAll('.kp-dr-hub-card.active').length; }
    }
    /* judgement calls */
    var jcLive = 0;
    for (var j = 0; j < JC_SCENARIOS.length; j++) { if (JC_SCENARIOS[j].live) { jcLive++; } }
    el = document.getElementById('stat-jc-count');
    if (el) { el.textContent = jcLive; }
    /* inspection prep */
    el = document.getElementById('stat-insp-count');
    if (el) { el.textContent = KP_INSPECTION.length; }
  } catch(e) {}
}

/* Fire at multiple delays to handle Mintlify SPA re-renders at varying speeds.
   On hard-refresh the 300ms call wins. On SPA nav-back Mintlify's settling
   re-render can arrive later, so 900ms and 1800ms act as fallbacks. */
setTimeout(llRefreshStats, 300);
setTimeout(llRefreshStats, 900);
setTimeout(llRefreshStats, 1800);

/* ════════════════════════════════════════════════════════════════════════
   NEW SHELL ROUTER — single-page architecture with persistent left rail.
   Replaces the legacy phase-stack navigation. Renders into #ll-pane.
   See /Users/matthewfiorentino/.claude/plans/ri-muhc-clinical-research-hub-robust-hamming.md
═══════════════════════════════════════════════════════════════════════ */

/* Modes registered in the rail. Order matches the rail buttons. */
var LL_MODES = [
  { id: 'kc',   label: 'Knowledge Checks' },
  { id: 'te',   label: 'Team Exercises'   },
  { id: 'dr',   label: 'Document Review'  },
  { id: 'jc',   label: 'Judgement Calls'  },
  { id: 'insp', label: 'Inspection Prep'  }
];

var llCurrentMode = '';   /* active mode id */
var llRouting     = false;
var llBooted      = false;

/* ════════════════════════════════════════════════════════════════════════
   LIBRARY · PROGRESS · TRIGGERS · TRACKS · SEARCH (Phase 1 redesign)
   The Lab is scoped to Apply / Solve / Change moments-of-need.
   Atoms live in their original data structures; LL_LIBRARY indexes them
   for search/filter/recommend. No persistence layer — each visit is fresh.
════════════════════════════════════════════════════════════════════════ */

/* Topic display labels (re-used across renderers) */
var LL_TOPIC_LABEL = {
  sae:'SAE & Adverse Events', consent:'Informed Consent', delegation:'Roles & Delegation',
  recruitment:'Recruitment & Screening', deviations:'Protocol Deviations',
  monitoring:'Monitoring & Audits', gcp:'GCP Principles', div5:'Health Canada Div 5',
  tcps2:'TCPS2', data:'Data Integrity', iso14155:'ISO 14155'
};

/* Default role tagging by topic — Phase 1 default; refine per-item later */
var LL_ROLES_BY_TOPIC = {
  sae:        ['crc','pi','nurse'],
  consent:    ['crc','pi','nurse','ra'],
  delegation: ['crc','pi','pm'],
  recruitment:['crc','pi','ra'],
  deviations: ['crc','pi','pm'],
  monitoring: ['crc','pi','pm'],
  gcp:        ['crc','pi','nurse','ra','pm','data'],
  div5:       ['pi','pm'],
  tcps2:      ['crc','pi','pm'],
  data:       ['crc','data','ra'],
  iso14155:   ['crc','pi','pm']
};

/* Trigger chips for the three moment-of-need doorways.
   Each chip routes to a search-results page filtered by topic + moment + optional kind. */
var LL_TRIGGERS = [
  /* I'm about to… (Apply) */
  { id:'about-to-consent',    moment:'apply', topicId:'consent',    label:'Consent a participant' },
  { id:'about-to-sae',        moment:'apply', topicId:'sae',        label:'Report an SAE' },
  { id:'about-to-monitor',    moment:'apply', topicId:'monitoring', label:'Prep a monitoring visit' },
  { id:'about-to-deviation',  moment:'apply', topicId:'deviations', label:'File a deviation' },
  { id:'about-to-delegation', moment:'apply', topicId:'delegation', label:'Add staff to the log' },
  { id:'about-to-recruit',    moment:'apply', topicId:'recruitment',label:'Screen a participant' },
  { id:'about-to-team',       moment:'apply', topicId:null,         label:'Brief the team (30 min)', kind:'team-exercise' },
  /* Something happened… (Solve) */
  { id:'happened-withdrew',   moment:'solve', topicId:'consent',    label:'Participant withdrew', kind:'scenario' },
  { id:'happened-sae-late',   moment:'solve', topicId:'sae',        label:'SAE reported late' },
  { id:'happened-cra-finding',moment:'solve', topicId:'monitoring', label:'Monitor flagged a finding' },
  { id:'happened-bad-data',   moment:'solve', topicId:'data',       label:'Source/eCRF mismatch' },
  { id:'happened-pi-away',    moment:'solve', topicId:'delegation', label:'PI unreachable' },
  { id:'happened-bad-consent',moment:'solve', topicId:'consent',    label:'Consent looks invalid' },
  /* What changed… (Change) */
  { id:'changed-tcps2',       moment:'change', topicId:'tcps2',     label:'TCPS2 / REB rules' },
  { id:'changed-div5',        moment:'change', topicId:'div5',      label:'Health Canada Div 5' },
  { id:'changed-iso',         moment:'change', topicId:'iso14155',  label:'ISO 14155 (devices)' },
  { id:'changed-gcp',         moment:'change', topicId:'gcp',       label:'GCP refresher' },
  { id:'changed-insp',        moment:'change', topicId:null,        label:'Pre-inspection sweep', kind:'inspection-card' }
];

/* Phase 1 Tracks — moment- and audience-shaped paths, not novice arcs */
var LL_TRACKS = [
  {
    id:'consent-visit-prep',
    title:'Consent visit prep',
    moment:'apply',
    audience:'solo',
    durationMin:12,
    desc:'A short warm-up before walking into a consent visit. Three items covering the same topic from different angles.',
    items:[
      { mode:'kc',   ref:'consent',              label:'Quick check — 5 consent MCQs' },
      { mode:'jc',   ref:'consent-conversation', label:'Judgement call — Consent under pressure' },
      { mode:'insp', ref:'consent',              label:'Inspection-style review' }
    ]
  },
  {
    id:'pre-audit',
    title:'Pre-audit checkup',
    moment:'change',
    audience:'solo',
    durationMin:25,
    desc:'Walk the highest-risk areas the way an inspector would. Five items; pause and finish later if needed.',
    items:[
      { mode:'insp', ref:'delegation', label:'Delegation walkthrough' },
      { mode:'insp', ref:'consent',    label:'Consent walkthrough' },
      { mode:'insp', ref:'sae',        label:'SAE walkthrough' },
      { mode:'insp', ref:'monitoring', label:'Monitoring walkthrough' },
      { mode:'dr',   ref:'monitoring', label:'Document review' }
    ]
  },
  /* (Team-facilitated content moved to LL_SESSIONS — Tracks are now solo-only) */
];

/* ════════════════════════════════════════════════════════════════════════
   FACILITATOR SESSIONS
   Pre-baked packs designed to run in a team meeting. Each item carries a
   timing cue and a brief facilitator note (setup, watch-for, prompt).
   The Sessions surface renders these with print-ready styling.
════════════════════════════════════════════════════════════════════════ */
var LL_SESSIONS = [
  {
    id: 'pre-monitoring-15',
    title: 'Pre-monitoring-visit huddle',
    durationMin: 15,
    audience: 'CRC and PI / sub-investigator',
    overview: 'A short warm-up to run with the monitoring CRC and the PI before a sponsor visit. Surfaces the most common pressure points before they happen for real.',
    items: [
      {
        mode: 'kc', ref: 'monitoring',
        title: 'Knowledge check on monitoring (5 questions)',
        timing: '5 min',
        setup: 'Project on screen and answer aloud as a group. Don\'t reveal the rationale until each person has taken a position.',
        watch: 'Disagreement is the useful signal. If everyone gets the same answer immediately, the question may be too easy for this team.'
      },
      {
        mode: 'jc', ref: 'cra-pressure',
        title: 'Scenario: Handling CRA Pressure on a Monitoring Visit',
        timing: '8 min',
        setup: 'Read the intro and the first pressure point aloud. Ask "what would you say?" before showing the choices.',
        watch: 'The "partial" choices are the teaching moments. Press the team on what makes a partial response not enough.'
      }
    ],
    reflection: [
      'Who at our site would actually handle each of these requests if they arrived in a real visit?',
      'Where is our position documented? Could a new CRC find it?'
    ]
  },
  {
    id: 'after-hours-sae-30',
    title: 'After-hours SAE coverage',
    durationMin: 30,
    audience: 'CRC, research nurse, PI, sub-investigator',
    overview: 'A 30-minute team session on SAE management when the PI is unreachable. Pairs the team-discussion exercise with a single decision-pressure scenario.',
    items: [
      {
        mode: 'te', ref: 'sae',
        title: 'Team exercise: Working Through an SAE Cascade',
        timing: '15 min',
        setup: 'Read each situation aloud and discuss before revealing the key points. The exercise prints well — handouts work better than screens for this one.',
        watch: 'Listen for assumptions about who is on the delegation log for after-hours coverage. The exercise often surfaces gaps in the actual coverage plan.'
      },
      {
        mode: 'jc', ref: 'saturday-call',
        title: 'Scenario: Weekend SAE With the PI Unavailable',
        timing: '12 min',
        setup: 'Run as a single sequence. Pause after each pressure point to discuss the choices before the team picks one.',
        watch: 'Pressure point 3 (the documentation request) is where the team\'s real norms come out. Spend extra time here if the discussion gets uncomfortable.'
      }
    ],
    reflection: [
      'What is our actual after-hours coverage plan? Who is on call when, and how do they reach the PI?',
      'If a CRC took an SAE call tonight, would they know exactly which sub-investigator to escalate to?'
    ]
  },
  {
    id: 'consent-deep-60',
    title: 'Consent practice for a vulnerable population',
    durationMin: 60,
    audience: 'Whole study team',
    overview: 'A 60-minute deep-practice session on informed consent in a study with cognitively vulnerable participants. Combines team discussion, decision-pressure scenario, and a document review.',
    items: [
      {
        mode: 'te', ref: 'consent',
        title: 'Team exercise: Verifying a Consent Was Properly Obtained',
        timing: '15 min',
        setup: 'Discuss each situation as a team before reading the key points. Print copies if the room is over four people.',
        watch: 'The team will sometimes treat the consent form as the entire process. Push back: ask what conversation must happen alongside the signature.'
      },
      {
        mode: 'jc', ref: 'consent-conversation',
        title: 'Scenario: Consent Capacity in Cognitive Decline',
        timing: '15 min',
        setup: 'Read each pressure point aloud. The Quebec Civil Code references matter here; pause and confirm everyone understands the substitute-consent rule before moving on.',
        watch: 'Pressure point 3 (the participant\'s objection) is where teams sometimes side with the proxy. The legal answer is unambiguous; the discomfort is the teaching point.'
      },
      {
        mode: 'dr', ref: 'consent',
        title: 'Document review: a problematic consent form',
        timing: '20 min',
        setup: 'Project the case file. Ask the team to identify findings before stepping through the annotated answers.',
        watch: 'Six findings is more than most teams catch on first pass. The point is not to identify all six — it is to develop the habit of looking for them.'
      }
    ],
    reflection: [
      'In a study with cognitively vulnerable participants, who at our site is qualified under Quebec law to assess capacity? How is that documented?',
      'Where does our consent process write down what to do when a participant who previously consented appears to lose capacity?',
      'Would our consent forms pass the same review the team just did?'
    ]
  }
];

/* No-state stance: the Lab is a render-only practice surface. No
   localStorage, no progress tracking, no bookmarks. Each visit is fresh.
   Authentication-gated persistence (if ever added) is out of scope. */

/* ── LL_LIBRARY: derived item index ──────────────────────────────────── */
var LL_LIBRARY = [];

function llBuildLibrary() {
  LL_LIBRARY = [];

  /* Helper: generate a short, card-friendly title from a long question.
     Strips HTML, prefers the first sentence (split on ?/.); falls back
     to a clean word-boundary truncation around 80 chars. */
  function llShortenForCard(s) {
    var t = (s || '').replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
    if (t.length <= 80) return t;
    /* Try first sentence */
    var sentenceEnd = t.search(/[?.!](?:\s|$)/);
    if (sentenceEnd > 0 && sentenceEnd <= 100) return t.slice(0, sentenceEnd + 1);
    /* Fall back to word-boundary cut */
    var cut = t.slice(0, 80);
    var lastSpace = cut.lastIndexOf(' ');
    if (lastSpace > 40) cut = cut.slice(0, lastSpace);
    return cut + '…';
  }

  /* KC items — MCQs */
  for (var i = 0; i < KP_POOL.length; i++) {
    var q = KP_POOL[i];
    if (!q || !q.id) continue;
    LL_LIBRARY.push({
      id: q.id,
      kind: 'mcq',
      title: llShortenForCard(q.q),
      topicId: q.topicId,
      topicLabel: q.topic || LL_TOPIC_LABEL[q.topicId] || '',
      moment: ['apply','solve'],
      roles: LL_ROLES_BY_TOPIC[q.topicId] || ['crc','pi'],
      durationMin: 2,
      applies: q.applies || 'all',
      ref: q.ref || '',
      mode: 'kc',
      openRef: q.topicId,
      searchText: (q.q || '') + ' ' + (q.rationale || '') + ' ' + (q.ref || '')
    });
  }

  /* Inspection cards */
  for (var j = 0; j < KP_INSPECTION.length; j++) {
    var ic = KP_INSPECTION[j];
    if (!ic || !ic.id) continue;
    LL_LIBRARY.push({
      id: ic.id,
      kind: 'inspection-card',
      title: llShortenForCard(ic.q),
      topicId: ic.topicId,
      topicLabel: ic.topic || LL_TOPIC_LABEL[ic.topicId] || '',
      moment: ['change','solve'],
      roles: LL_ROLES_BY_TOPIC[ic.topicId] || ['crc','pi'],
      durationMin: 4,
      applies: ic.applies || 'all',
      ref: ic.ref || '',
      mode: 'insp',
      openRef: ic.topicId,
      searchText: (ic.q || '') + ' ' + (ic.model || '') + ' ' + (ic.gap || '') + ' ' + (ic.ref || '')
    });
  }

  /* JC scenarios */
  for (var k = 0; k < JC_SCENARIOS.length; k++) {
    var sc = JC_SCENARIOS[k];
    if (!sc || !sc.id || sc.live === false) continue;
    var topicId = (sc.topic || '').toLowerCase().indexOf('consent') >= 0 ? 'consent'
                : (sc.topic || '').toLowerCase().indexOf('sae') >= 0 ? 'sae'
                : (sc.topic || '').toLowerCase().indexOf('deviation') >= 0 ? 'deviations'
                : (sc.topic || '').toLowerCase().indexOf('recruit') >= 0 ? 'recruitment'
                : (sc.topic || '').toLowerCase().indexOf('monitor') >= 0 ? 'monitoring'
                : (sc.topic || '').toLowerCase().indexOf('data') >= 0 ? 'data'
                : (sc.topic || '').toLowerCase().indexOf('delegat') >= 0 ? 'delegation'
                : null;
    LL_LIBRARY.push({
      id: sc.id,
      kind: 'scenario',
      title: sc.title || sc.id,
      topicId: topicId,
      topicLabel: sc.topic || (topicId ? LL_TOPIC_LABEL[topicId] : ''),
      moment: ['solve','apply'],
      roles: [sc.role || 'crc'],
      durationMin: 12,
      applies: 'all',
      ref: sc.ref || '',
      mode: 'jc',
      openRef: sc.id,
      searchText: (sc.title || '') + ' ' + (sc.desc || '') + ' ' + (sc.intro || '') + ' ' + (sc.topic || '')
    });
  }

  /* TE exercises */
  for (var t = 0; t < LL_TE_EXERCISES.length; t++) {
    var te = LL_TE_EXERCISES[t];
    LL_LIBRARY.push({
      id: 'te-' + te.slug,
      kind: 'team-exercise',
      title: te.title,
      topicId: te.slug,
      topicLabel: te.topic,
      moment: ['apply'],
      roles: LL_ROLES_BY_TOPIC[te.slug] || ['crc','pi'],
      durationMin: 20,
      applies: 'all',
      ref: te.meta || '',
      mode: 'te',
      openRef: te.slug,
      audience: 'team',
      searchText: te.topic + ' ' + te.title + ' ' + te.meta
    });
  }

  /* DR exercises */
  if (typeof KP_DR_EXERCISES === 'object' && KP_DR_EXERCISES) {
    for (var slug in KP_DR_EXERCISES) {
      if (!KP_DR_EXERCISES.hasOwnProperty(slug)) continue;
      var dr = KP_DR_EXERCISES[slug];
      LL_LIBRARY.push({
        id: 'dr-' + slug,
        kind: 'doc-review',
        title: dr.title || slug,
        topicId: slug,
        topicLabel: dr.topicLabel || LL_TOPIC_LABEL[slug] || '',
        moment: ['solve','change'],
        roles: LL_ROLES_BY_TOPIC[slug] || ['crc','monitor'],
        durationMin: 8,
        applies: 'all',
        ref: dr.ref || '',
        mode: 'dr',
        openRef: slug,
        searchText: (dr.title || '') + ' ' + (dr.intro || '') + ' ' + (dr.subtitle || '')
      });
    }
  }
}

/* ── Search ─────────────────────────────────────────────────────────── */
function llSearch(query, filters) {
  filters = filters || {};
  var q = (query || '').trim().toLowerCase();
  var out = [];
  for (var i = 0; i < LL_LIBRARY.length; i++) {
    var it = LL_LIBRARY[i];
    if (filters.topicId && it.topicId !== filters.topicId) continue;
    if (filters.kind && it.kind !== filters.kind) continue;
    if (filters.moment) {
      var hit = false;
      for (var m = 0; m < it.moment.length; m++) { if (it.moment[m] === filters.moment) { hit = true; break; } }
      if (!hit) continue;
    }
    if (q) {
      var hay = (it.title + ' ' + it.topicLabel + ' ' + (it.searchText || '') + ' ' + (it.ref || '')).toLowerCase();
      if (hay.indexOf(q) < 0) continue;
    }
    out.push(it);
  }
  return out;
}

/* ── In-Lab navigation depth + smart-back helper ──────────────────────
   Track how many in-Lab navigations the user has done so item back-
   buttons can fall back to a sensible destination on deep-link entry. */
window.__llNavDepth = window.__llNavDepth || 0;

/* Smart back: history.back() if we have in-session history,
   otherwise route to the given fallback (default: library).        */
function llBackTo(fallback) {
  if (window.__llNavDepth > 0) {
    /* popstate handler will decrement on the resulting back event */
    history.back();
  } else {
    llRoute(fallback || 'library');
  }
}

/* ── Universal opener — given a library item, render directly ────────
   Skips the legacy mode-hub render so users can never accidentally land
   on an orphaned hub. The inner start function takes over the pane.
   Pushes a history entry so browser back returns to the calling surface. */
function llOpenLibraryItem(itemId, opts) {
  opts = opts || {};
  var item = null;
  for (var i = 0; i < LL_LIBRARY.length; i++) {
    if (LL_LIBRARY[i].id === itemId) { item = LL_LIBRARY[i]; break; }
  }
  if (!item) return;
  /* Hold track context in-memory only so the renderer can show a "you're
     in the X track" banner; no persistence beyond the current page life. */
  if (opts.trackId) {
    window.llCurrentTrackId   = opts.trackId;
    window.llCurrentTrackStep = opts.trackStep || 0;
  } else {
    window.llCurrentTrackId = null;
    window.llCurrentTrackStep = 0;
  }
  /* History-push policy:
     - KC inner function does not push, so we push #item/<id> ourselves.
     - TE / DR / JC / Insp inner functions push their own item-specific
       hash (#team/<slug>, #docreview/<slug>, etc). We increment the
       nav-depth counter to stay accurate.
     - Skip both when called from URL parse to avoid double-push. */
  llCurrentMode = item.mode;
  if (item.mode === 'kc' && typeof llKcStartTopic === 'function') {
    if (!opts.skipPush) {
      var kcHash = 'item/' + item.id;
      if (window.location.hash.replace(/^#/, '') !== kcHash) {
        history.pushState(null, '', '#' + kcHash);
        window.__llNavDepth++;
      }
    }
    llKcStartTopic(item.openRef);
  } else if (item.mode === 'te'   && typeof llTeOpenExercise   === 'function') {
    llTeOpenExercise(item.openRef);
    if (!opts.skipPush) { window.__llNavDepth++; }
  } else if (item.mode === 'dr'   && typeof llDrOpenExercise   === 'function') {
    llDrOpenExercise(item.openRef);
    if (!opts.skipPush) { window.__llNavDepth++; }
  } else if (item.mode === 'jc'   && typeof llJcStartScenario  === 'function') {
    llJcStartScenario(item.openRef);
    if (!opts.skipPush) { window.__llNavDepth++; }
  } else if (item.mode === 'insp' && typeof llInspStartTopic   === 'function') {
    llInspStartTopic(item.openRef);
    if (!opts.skipPush) { window.__llNavDepth++; }
  }
}

/* ── Next-best-item recommender ──────────────────────────────────────
   Given a topic + interaction-kind context, suggest 2-3 related items
   from a different interaction-kind. Renders as a simple card row at
   the end of any item view.                                          */
function llRecommendNext(topicId, currentKind, max) {
  max = max || 3;
  if (!topicId || !LL_LIBRARY.length) return [];
  var pool = [];
  for (var i = 0; i < LL_LIBRARY.length; i++) {
    var it = LL_LIBRARY[i];
    if (it.topicId !== topicId) continue;
    if (currentKind && it.kind === currentKind) continue;
    pool.push(it);
  }
  /* Dedupe by kind so we don't suggest multiple of the same interaction type */
  var out = [], kindsUsed = {};
  for (var o = 0; o < pool.length && out.length < max; o++) {
    var k = pool[o].kind;
    if (kindsUsed[k]) continue;
    kindsUsed[k] = true;
    out.push(pool[o]);
  }
  return out;
}

function llNextBestHTML(topicId, currentKind) {
  var recs = llRecommendNext(topicId, currentKind, 3);
  if (!recs.length) return '';
  var html = '<div class="ll-next-best">';
  html += '<div class="ll-next-best-head">Continue with this topic</div>';
  html += '<div class="ll-next-best-list">';
  for (var i = 0; i < recs.length; i++) {
    var it = recs[i];
    var meta = LL_KIND_META[it.kind] || { label: it.kind, icon: '<circle cx="12" cy="12" r="9"/>' };
    var dur = it.durationMin ? ('&nbsp;·&nbsp;' + it.durationMin + ' min') : '';
    html += '<button class="ll-next-best-item" onclick="llOpenLibraryItem(\'' + it.id + '\')">';
    html +=   '<svg class="ll-next-best-icon" viewBox="0 0 24 24" aria-hidden="true">' + meta.icon + '</svg>';
    html +=   '<span class="ll-next-best-meta">';
    html +=     '<span class="ll-next-best-kind">' + meta.label + dur + '</span>';
    html +=     '<span class="ll-next-best-title">' + it.title + '</span>';
    html +=   '</span>';
    html += '</button>';
  }
  html += '</div></div>';
  return html;
}

/* (llResumeFromKey removed — no progress persistence) */

/* ── Kind label + inline SVG icon for cards (monochrome, no rainbow fills) ── */
var LL_KIND_META = {
  'mcq':             { label: 'Knowledge check', icon: '<path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/>' },
  'team-exercise':   { label: 'Team exercise',   icon: '<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>' },
  'doc-review':      { label: 'Doc review',      icon: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/>' },
  'scenario':        { label: 'Scenario',        icon: '<path d="M12 2L3 7v5c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7L12 2z"/>' },
  'inspection-card': { label: 'Inspection prep', icon: '<circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>' }
};

function llKindBadgeHTML(kind, durationMin) {
  var meta = LL_KIND_META[kind] || { label: kind, icon: '' };
  var dur = durationMin ? ' <span class="ll-card-kind-dur">· ' + durationMin + ' min</span>' : '';
  return '<span class="ll-card-kind">' +
           '<svg viewBox="0 0 24 24" aria-hidden="true">' + meta.icon + '</svg>' +
           meta.label + dur +
         '</span>';
}

function llCardHTML(item, opts) {
  opts = opts || {};
  var topic = item.topicLabel ? ('<span class="ll-card-topic">' + item.topicLabel + '</span>') : '';
  var onclick = opts.trackId
    ? 'llOpenLibraryItem(\'' + item.id + '\', {trackId:\'' + opts.trackId + '\', trackStep:' + (opts.trackStep || 0) + '})'
    : 'llOpenLibraryItem(\'' + item.id + '\')';
  return '<div class="ll-card" onclick="' + onclick + '">' +
           llKindBadgeHTML(item.kind, item.durationMin) +
           '<div class="ll-card-title">' + item.title + '</div>' +
           topic +
         '</div>';
}

/* ── Render: search results ─────────────────────────────────────────── */
function llRenderSearch(pane, query, filters) {
  filters = filters || {};
  var results = llSearch(query, filters);
  /* Pick the most-specific filter for h1; show the others as small tags */
  var h1, tags = [];
  if (query) {
    h1 = '“' + query + '”';
    if (filters.topicId && LL_TOPIC_LABEL[filters.topicId]) tags.push(LL_TOPIC_LABEL[filters.topicId]);
    if (filters.moment)  tags.push({apply:'Apply',solve:'Solve',change:'Change'}[filters.moment] || filters.moment);
  } else if (filters.topicId && LL_TOPIC_LABEL[filters.topicId]) {
    h1 = LL_TOPIC_LABEL[filters.topicId];
    if (filters.moment)  tags.push({apply:'Apply',solve:'Solve',change:'Change'}[filters.moment] || filters.moment);
  } else if (filters.moment) {
    h1 = {apply:'Apply',solve:'Solve',change:'Change'}[filters.moment] || filters.moment;
  } else {
    h1 = 'Search';
  }
  var html = '<div class="ll-breadcrumb"><button class="ll-back-btn" onclick="llBackTo(\'about\')">&#8592; Lab home</button></div>';
  html += '<h1>' + h1 + '</h1>';
  if (tags.length) {
    html += '<div class="ll-search-tags">';
    for (var t = 0; t < tags.length; t++) html += '<span class="ll-search-tag">' + tags[t] + '</span>';
    html += '</div>';
  }
  html += '<div class="ll-pane-sub">' + results.length + ' result' + (results.length === 1 ? '' : 's') + '</div>';
  if (results.length === 0) {
    html += '<div class="ll-stub" style="padding:24px 0">No matches. Try a broader term or browse the <a href="#" onclick="event.preventDefault();llRoute(\'library\');return false">Library</a>.</div>';
  } else {
    html += '<div class="ll-card-grid">';
    for (var i = 0; i < results.length; i++) { html += llCardHTML(results[i]); }
    html += '</div>';
  }
  pane.innerHTML = html;
}

/* ── Render: topic page ──────────────────────────────────────────────
   One page per topicId showing every item across interaction kinds,
   grouped by kind so the user sees the full coverage at a glance.   */
function llRenderTopic(pane, topicId) {
  if (!topicId) { pane.innerHTML = '<div class="ll-stub">No topic specified.</div>'; return; }
  var topicLabel = LL_TOPIC_LABEL[topicId] || topicId;
  var items = llSearch('', { topicId: topicId });

  /* Group by kind in a stable display order */
  var kindOrder = ['mcq', 'inspection-card', 'scenario', 'team-exercise', 'doc-review'];
  var byKind = {};
  for (var i = 0; i < items.length; i++) {
    (byKind[items[i].kind] = byKind[items[i].kind] || []).push(items[i]);
  }

  var html = '<div class="ll-breadcrumb"><button class="ll-back-btn" onclick="llBackTo(\'library\')">&#8592; Library</button></div>';
  html += '<h1>' + topicLabel + '</h1>';
  html += '<div class="ll-pane-sub">' + items.length + ' item' + (items.length === 1 ? '' : 's') + '.</div>';

  for (var k = 0; k < kindOrder.length; k++) {
    var kind = kindOrder[k];
    if (!byKind[kind]) continue;
    var kindMeta = LL_KIND_META[kind] || { label: kind, icon: '<circle cx="12" cy="12" r="9"/>' };
    html += '<div class="ll-topic-section">';
    html += '<div class="ll-topic-section-head">' +
              '<svg viewBox="0 0 24 24" aria-hidden="true">' + kindMeta.icon + '</svg>' +
              kindMeta.label + ' <span class="ll-topic-section-count">' + byKind[kind].length + '</span>' +
            '</div>';
    html += '<div class="ll-card-grid">';
    for (var c = 0; c < byKind[kind].length; c++) { html += llCardHTML(byKind[kind][c]); }
    html += '</div>';
    html += '</div>';
  }
  pane.innerHTML = html;
}

/* ── Render: track ──────────────────────────────────────────────────── */
function llRenderTrack(pane, trackId) {
  var track = null;
  for (var i = 0; i < LL_TRACKS.length; i++) { if (LL_TRACKS[i].id === trackId) { track = LL_TRACKS[i]; break; } }
  if (!track) { pane.innerHTML = '<div class="ll-stub">Track not found.</div>'; return; }
  var html = '<h1>' + track.title + '</h1>';
  html += '<div class="ll-pane-sub">' + track.desc + '</div>';
  html += '<div class="ll-track-meta">' + track.durationMin + ' min · ' + (track.audience === 'team' ? 'Facilitator session' : 'Solo practice') + ' · ' + track.items.length + ' steps</div>';
  html += '<ol class="ll-track-steps">';
  for (var s = 0; s < track.items.length; s++) {
    var it = track.items[s];
    /* Find the library entry — KC/insp keyed by topicId, te/dr by slug prefix, jc by id */
    var libItem = null;
    var lookupId = it.mode === 'te' ? 'te-' + it.ref
                 : it.mode === 'dr' ? 'dr-' + it.ref
                 : null;
    if (lookupId) {
      for (var li = 0; li < LL_LIBRARY.length; li++) { if (LL_LIBRARY[li].id === lookupId) { libItem = LL_LIBRARY[li]; break; } }
    } else if (it.mode === 'jc') {
      for (var lj = 0; lj < LL_LIBRARY.length; lj++) { if (LL_LIBRARY[lj].id === it.ref) { libItem = LL_LIBRARY[lj]; break; } }
    }
    var label = libItem ? libItem.title : it.label;
    var kindLabel = libItem ? (LL_KIND_META[libItem.kind] ? LL_KIND_META[libItem.kind].label : it.mode.toUpperCase()) : it.mode.toUpperCase();
    var dur = libItem && libItem.durationMin ? (' · ~' + libItem.durationMin + ' min') : '';
    var act = '';
    if (libItem) {
      act = ' onclick="llOpenLibraryItem(\'' + libItem.id + '\', {trackId:\'' + trackId + '\', trackStep:' + s + '})"';
    } else if (it.mode === 'kc' || it.mode === 'insp') {
      var fn = it.mode === 'kc' ? 'llKcStartTopic' : 'llInspStartTopic';
      /* Same pattern as llOpenLibraryItem: call inner directly, no mode-hub render */
      act = ' onclick="window.llCurrentTrackId=\'' + trackId + '\';window.llCurrentTrackStep=' + s + ';' + fn + '(\'' + it.ref + '\');window.__llNavDepth=(window.__llNavDepth||0)+1"';
    }
    html += '<li class="ll-track-step"' + act + '>';
    html +=   '<div class="ll-track-step-num">' + (s + 1) + '</div>';
    html +=   '<div class="ll-track-step-body">';
    html +=     '<div class="ll-track-step-kind">' + kindLabel + dur + '</div>';
    html +=     '<div class="ll-track-step-label">' + label + '</div>';
    html +=   '</div>';
    html += '</li>';
  }
  html += '</ol>';
  html += '<div style="margin-top:24px"><button class="ll-back-btn" onclick="llBackTo(\'about\')">&#8592; Lab home</button></div>';
  pane.innerHTML = html;
}

/* ── Render: a moment-of-need doorway (chip grid + inline results) ─────
   Clicking a chip filters the results inline below the chips, in the
   same surface, so the back button from any opened item returns to
   the doorway (not to a separate library-looking page). The doorway
   accepts an optional triggerId to render a chip as already selected. */
/* Cap inline results at this many; deeper sets get a "Show all" reveal */
var LL_DOORWAY_RESULT_CAP = 12;

/* Compute results for a trigger (used both by chip-count and by render) */
function llTriggerResults(trigger) {
  if (!trigger) return [];
  var filters = {};
  if (trigger.moment)  filters.moment  = trigger.moment;
  if (trigger.topicId) filters.topicId = trigger.topicId;
  if (trigger.kind)    filters.kind    = trigger.kind;
  return llSearch('', filters);
}

function llRenderDoorway(pane, moment, triggerId, opts) {
  opts = opts || {};
  var meta = {
    apply:  { title:'About to do something', sub:'Pick the task you’re about to do.' },
    solve:  { title:'Something just happened', sub:'Pick what just came up.' },
    change: { title:'Something changed',     sub:'New SOPs, refreshed regulations, jurisdiction shifts.' }
  }[moment] || { title: moment, sub: '' };

  var html = '<h1>' + meta.title + '</h1><div class="ll-pane-sub">' + meta.sub + '</div>';
  html += '<div class="ll-chips">';
  for (var i = 0; i < LL_TRIGGERS.length; i++) {
    var tr = LL_TRIGGERS[i];
    if (tr.moment !== moment) continue;
    var isSelected = triggerId === tr.id;
    var count = llTriggerResults(tr).length;
    html += '<button class="ll-chip' + (isSelected ? ' selected' : '') +
      '" onclick="llRoute(\'doorway\',{moment:\'' + moment + '\',triggerId:\'' + tr.id + '\',replace:true})">' +
      tr.label + '<span class="ll-chip-count">' + count + '</span></button>';
  }
  html += '</div>';

  /* Inline results when a chip is selected */
  if (triggerId) {
    var trigger = null;
    for (var ti = 0; ti < LL_TRIGGERS.length; ti++) { if (LL_TRIGGERS[ti].id === triggerId) { trigger = LL_TRIGGERS[ti]; break; } }
    var results = llTriggerResults(trigger);
    var capExceeded = !opts.showAll && results.length > LL_DOORWAY_RESULT_CAP;
    var displayResults = capExceeded ? results.slice(0, LL_DOORWAY_RESULT_CAP) : results;

    html += '<div class="ll-doorway-results">';
    html += '<div class="ll-section-head" style="font-size:11px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:var(--ll-text-3);margin-bottom:10px">' +
      results.length + ' item' + (results.length === 1 ? '' : 's') +
      (capExceeded ? ' (showing first ' + LL_DOORWAY_RESULT_CAP + ')' : '') +
      '</div>';
    if (results.length === 0) {
      html += '<div class="ll-stub" style="padding:14px 0">No items match this yet. Try another chip above, or browse the <a href="#" onclick="event.preventDefault();llRoute(\'library\');return false">Library</a>.</div>';
    } else {
      html += '<div class="ll-card-grid">';
      for (var r = 0; r < displayResults.length; r++) { html += llCardHTML(displayResults[r]); }
      html += '</div>';
      if (capExceeded) {
        /* "Show all" expands by re-rendering with no cap; uses a flag in opts */
        html += '<div style="margin-top:14px"><button class="ll-doorway-showall" ' +
          'onclick="llRoute(\'doorway\',{moment:\'' + moment + '\',triggerId:\'' + triggerId + '\',showAll:true,replace:true})">' +
          'Show all ' + results.length + ' items →</button></div>';
      }
    }
    html += '</div>';
  }

  html += '<div style="margin-top:18px"><button class="ll-back-btn" onclick="llBackTo(\'about\')">&#8592; Lab home</button></div>';
  pane.innerHTML = html;
}

/* ── Render: Tracks list (curated solo paths) ──────────────────────── */
function llRenderTracksList(pane) {
  var html = '<h1>Practice paths</h1>';
  html += '<div class="ll-pane-sub">Curated sequences for working through a single task end-to-end.</div>';
  html += '<div class="ll-track-grid">';
  for (var t = 0; t < LL_TRACKS.length; t++) {
    var tr = LL_TRACKS[t];
    html += '<button class="ll-track-card" onclick="llRoute(\'track\',{trackId:\'' + tr.id + '\'})">';
    html +=   '<div class="ll-track-card-title">' + tr.title + '</div>';
    html +=   '<div class="ll-track-card-desc">' + tr.desc + '</div>';
    html +=   '<div class="ll-track-card-meta">' + tr.durationMin + ' min · ' + tr.items.length + ' steps</div>';
    html += '</button>';
  }
  html += '</div>';
  html += '<div style="margin-top:24px"><button class="ll-back-btn" onclick="llBackTo(\'about\')">&#8592; Lab home</button></div>';
  pane.innerHTML = html;
}

/* ── Render: facilitator Sessions list ──────────────────────────────── */
function llRenderSessionsList(pane) {
  var html = '<h1>Facilitated sessions</h1>';
  html += '<div class="ll-pane-sub">Packs for team meetings, with facilitator notes and timing.</div>';
  html += '<div class="ll-sessions-grid">';
  for (var i = 0; i < LL_SESSIONS.length; i++) {
    var s = LL_SESSIONS[i];
    html += '<button class="ll-session-card" onclick="llRoute(\'session\',{sessionId:\'' + s.id + '\'})">';
    html +=   '<div class="ll-session-card-head">';
    html +=     '<span class="ll-session-card-dur">' + s.durationMin + ' min</span>';
    html +=   '</div>';
    html +=   '<div class="ll-session-card-title">' + s.title + '</div>';
    html +=   '<div class="ll-session-card-aud">For: ' + s.audience + '</div>';
    html +=   '<div class="ll-session-card-overview">' + s.overview + '</div>';
    html +=   '<div class="ll-session-card-meta">' + s.items.length + ' items · ' + s.reflection.length + ' reflection prompt' + (s.reflection.length === 1 ? '' : 's') + '</div>';
    html += '</button>';
  }
  html += '</div>';
  html += '<div style="margin-top:24px"><button class="ll-back-btn" onclick="llBackTo(\'about\')">&#8592; Lab home</button></div>';
  pane.innerHTML = html;
}

/* ── Render: a single Facilitator Session ───────────────────────────── */
function llRenderSession(pane, sessionId) {
  var session = null;
  for (var i = 0; i < LL_SESSIONS.length; i++) { if (LL_SESSIONS[i].id === sessionId) { session = LL_SESSIONS[i]; break; } }
  if (!session) { pane.innerHTML = '<div class="ll-stub">Session not found.</div>'; return; }

  var html = '<div class="ll-session">';

  /* Print-only header repeated on each printed page */
  html += '<div class="ll-session-print-head">' + session.title + ' · Facilitator pack</div>';

  /* Session header */
  html += '<h1>' + session.title + '</h1>';
  html += '<div class="ll-session-meta">' + session.durationMin + ' min · ' + session.audience + '</div>';
  html += '<div class="ll-session-overview">' + session.overview + '</div>';

  /* Action row: print + open all */
  html += '<div class="ll-session-actions">';
  html += '<button class="ll-session-action" onclick="window.print()">Print this pack</button>';
  html += '</div>';

  /* Items, numbered with timing + facilitator notes */
  html += '<ol class="ll-session-items">';
  for (var n = 0; n < session.items.length; n++) {
    var it = session.items[n];
    /* Resolve to library item where possible */
    var libItem = null;
    var libId = it.mode === 'te' ? 'te-' + it.ref
              : it.mode === 'dr' ? 'dr-' + it.ref
              : it.ref;
    for (var li = 0; li < LL_LIBRARY.length; li++) { if (LL_LIBRARY[li].id === libId) { libItem = LL_LIBRARY[li]; break; } }
    var kindMeta = libItem ? (LL_KIND_META[libItem.kind] || { label: libItem.kind, icon: '<circle cx="12" cy="12" r="9"/>' }) : { label: it.mode.toUpperCase(), icon: '<circle cx="12" cy="12" r="9"/>' };

    /* Build the open action */
    var openAct = '';
    if (libItem) {
      openAct = 'llOpenLibraryItem(\'' + libItem.id + '\')';
    } else if (it.mode === 'kc') {
      openAct = 'llKcStartTopic(\'' + it.ref + '\');window.__llNavDepth=(window.__llNavDepth||0)+1';
    } else if (it.mode === 'insp') {
      openAct = 'llInspStartTopic(\'' + it.ref + '\');window.__llNavDepth=(window.__llNavDepth||0)+1';
    }

    html += '<li class="ll-session-item">';
    html +=   '<div class="ll-session-item-head">';
    html +=     '<div class="ll-session-item-num">' + (n + 1) + '</div>';
    html +=     '<div class="ll-session-item-head-meta">';
    html +=       '<div class="ll-session-item-kind">';
    html +=         '<svg viewBox="0 0 24 24" aria-hidden="true">' + kindMeta.icon + '</svg>';
    html +=         kindMeta.label + ' · ' + it.timing;
    html +=       '</div>';
    html +=       '<div class="ll-session-item-title">' + it.title + '</div>';
    html +=     '</div>';
    if (openAct) {
      html +=   '<button class="ll-session-item-open" onclick="' + openAct + '">Open →</button>';
    }
    html +=   '</div>';
    html +=   '<div class="ll-session-item-notes">';
    html +=     '<div class="ll-session-note"><span class="ll-session-note-label">Setup</span><span class="ll-session-note-text">' + it.setup + '</span></div>';
    html +=     '<div class="ll-session-note"><span class="ll-session-note-label">Watch for</span><span class="ll-session-note-text">' + it.watch + '</span></div>';
    html +=   '</div>';
    html += '</li>';
  }
  html += '</ol>';

  /* Reflection prompts */
  html += '<div class="ll-session-reflection">';
  html += '<div class="ll-section-head">Reflection prompts</div>';
  html += '<ul class="ll-session-reflection-list">';
  for (var r = 0; r < session.reflection.length; r++) {
    html += '<li>' + session.reflection[r] + '</li>';
  }
  html += '</ul>';
  html += '</div>';

  html += '<div style="margin-top:28px" class="ll-no-print"><button class="ll-back-btn" onclick="llRoute(\'sessions\')">&#8592; All sessions</button></div>';
  html += '</div>';
  pane.innerHTML = html;
}

/* ── Render: library (topic index — grouped by Core / Jurisdiction) ─── */
var LL_TOPIC_GROUPS = {
  core:         ['consent', 'sae', 'delegation', 'deviations', 'monitoring', 'data', 'recruitment', 'gcp'],
  jurisdiction: ['tcps2', 'div5', 'iso14155']
};

/* Short labels for the kind breakdown on Library cards */
var LL_KIND_SHORT = {
  'mcq':             'MCQ',
  'inspection-card': 'inspection prep',
  'scenario':        'scenarios',
  'team-exercise':   'team exercises',
  'doc-review':      'doc reviews'
};

function llRenderLibrary(pane) {
  var byTopic = {};
  for (var i = 0; i < LL_LIBRARY.length; i++) {
    var it = LL_LIBRARY[i];
    var tid = it.topicId || 'other';
    (byTopic[tid] = byTopic[tid] || []).push(it);
  }
  var topicCount = Object.keys(byTopic).filter(function(k){return k!=='other';}).length;
  var html = '<h1>Library</h1>';
  html += '<div class="ll-pane-sub">' + LL_LIBRARY.length + ' items across ' + topicCount + ' topics.</div>';

  function renderTopicGroup(label, ids) {
    var rendered = '';
    var anyShown = 0;
    for (var t = 0; t < ids.length; t++) {
      var tid = ids[t];
      if (!byTopic[tid]) continue;
      anyShown++;
      var topicLabel = LL_TOPIC_LABEL[tid] || tid;
      /* Per-kind breakdown */
      var kindCounts = {};
      for (var ki = 0; ki < byTopic[tid].length; ki++) {
        var k = byTopic[tid][ki].kind;
        kindCounts[k] = (kindCounts[k] || 0) + 1;
      }
      var breakdown = [];
      var kindOrder = ['mcq','inspection-card','scenario','team-exercise','doc-review'];
      for (var ko = 0; ko < kindOrder.length; ko++) {
        var kk = kindOrder[ko];
        if (!kindCounts[kk]) continue;
        breakdown.push(kindCounts[kk] + ' ' + (LL_KIND_SHORT[kk] || kk));
      }
      rendered += '<button class="ll-topic-card" onclick="llRoute(\'topic\',{topicId:\'' + tid + '\'})">';
      rendered +=   '<div class="ll-topic-card-head">';
      rendered +=     '<div class="ll-topic-card-title">' + topicLabel + '</div>';
      rendered +=     '<div class="ll-topic-card-count">' + byTopic[tid].length + '</div>';
      rendered +=   '</div>';
      rendered +=   '<div class="ll-topic-card-breakdown">' + breakdown.join(' · ') + '</div>';
      rendered += '</button>';
    }
    if (!anyShown) return '';
    return '<div class="ll-topic-group">' +
           '<div class="ll-section-head" style="font-size:11px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:var(--ll-text-3);margin:18px 0 10px">' + label + '</div>' +
           '<div class="ll-topic-grid">' + rendered + '</div>' +
           '</div>';
  }

  html += renderTopicGroup('Core topics', LL_TOPIC_GROUPS.core);
  html += renderTopicGroup('Jurisdiction overlays', LL_TOPIC_GROUPS.jurisdiction);

  html += '<div style="margin-top:24px"><button class="ll-back-btn" onclick="llBackTo(\'about\')">&#8592; Lab home</button></div>';
  pane.innerHTML = html;
}

/* (Continue + Saved widgets removed — no localStorage state to surface) */

/* ── Citation hyperlinking helper (Phase B audit) ────────────────────────
   Wraps plain-text regulatory citations in <a> tags at render time.
   Single source of truth for canonical authority URLs.
   Order matters: most-specific patterns first.                          */
var LL_CITE_LINKS = [
  { rx: /ICH\s+E6\s*\(R3\)/g,
    url: 'https://database.ich.org/sites/default/files/ICH_E6(R3)_Step4_FinalGuideline_2025_0106.pdf' },
  { rx: /ICH\s+E6\s*\(R2\)/g,
    url: 'https://database.ich.org/sites/default/files/E6_R2_Addendum.pdf' },
  { rx: /ICH\s+E2A/g,
    url: 'https://database.ich.org/sites/default/files/E2A_Guideline.pdf' },
  { rx: /GUI-?0100/g,
    url: 'https://www.canada.ca/en/health-canada/services/drugs-health-products/compliance-enforcement/good-clinical-practices/guidance-documents/guidance-drugs-clinical-trials-human-subjects-gui-0100.html' },
  { rx: /(?:Health\s+Canada\s+|HC\s+)?Div(?:ision)?\s*5/g,
    url: 'https://laws-lois.justice.gc.ca/eng/regulations/C.R.C.,_c._870/index.html' },
  { rx: /C\.05\.\d{3}(?:\([a-z]\))?(?:[–-]\d+)?/g,
    url: 'https://laws-lois.justice.gc.ca/eng/regulations/C.R.C.,_c._870/index.html' },
  { rx: /TCPS\s*2(?:\s*\(2022\))?/g,
    url: 'https://ethics.gc.ca/eng/tcps2-eptc2_2022_chapter3-chapitre3.html' },
  { rx: /Civil\s+Code(?:\s+Art\.?\s*\d+(?:[–-]\d+)?)?/g,
    url: 'https://www.legisquebec.gouv.qc.ca/en/document/cs/ccq-1991' },
  { rx: /Loi\s*25(?:\s*\(P-39\.1\))?/g,
    url: 'https://www.legisquebec.gouv.qc.ca/en/document/cs/p-39.1' },
  { rx: /ISO\s*14155(?::\d{4})?/g,
    url: 'https://www.iso.org/standard/71690.html' },
  { rx: /21\s*CFR\s*Part\s*11/g,
    url: 'https://www.ecfr.gov/current/title-21/chapter-I/subchapter-A/part-11' },
  { rx: /Declaration\s+of\s+Helsinki/g,
    url: 'https://www.wma.net/policies-post/wma-declaration-of-helsinki-ethical-principles-for-medical-research-involving-human-subjects/' }
];

function llLinkifyCitations(s) {
  if (!s) return s;
  /* Split around existing anchors so we don't double-link inside <a>...</a> */
  var parts = s.split(/(<a [^>]*>[\s\S]*?<\/a>)/);
  for (var p = 0; p < parts.length; p++) {
    if (parts[p].indexOf('<a ') === 0) continue;
    for (var i = 0; i < LL_CITE_LINKS.length; i++) {
      var L = LL_CITE_LINKS[i];
      parts[p] = parts[p].replace(L.rx, function (match) {
        return '<a href="' + L.url + '" target="_blank" rel="noopener">' + match + '</a>';
      });
    }
  }
  return parts.join('');
}

/* ════════════════════════════════════════════════════════════════════════
   END Phase 1 redesign block
════════════════════════════════════════════════════════════════════════ */

function llPane()      { return document.getElementById('ll-pane'); }
function llRailBtns()  { return document.querySelectorAll('.ll-tab'); }
function llMobileSel() { return document.getElementById('ll-mobile-select'); }
function llPaneTop()   { var p = llPane(); if (p) p.scrollTo({ top: 0, behavior: 'smooth' }); }
function llPaneScrollToEl(el, offset) {
  var p = llPane(); if (!p || !el) return;
  var pRect = p.getBoundingClientRect(), eRect = el.getBoundingClientRect();
  p.scrollTo({ top: p.scrollTop + (eRect.top - pRect.top) - (offset || 24), behavior: 'smooth' });
}

/* Top-level orchestrator. modeId is required; sub state lives in mode renderers. */
function llRoute(modeId, opts) {
  if (llRouting) { return; }
  if (!modeId) { modeId = 'about'; }
  opts = opts || {};
  llRouting = true;
  llCurrentMode = modeId;

  /* (Active-state for tab rail removed — Phase 2 IA flip) */

  /* Hash update — about and kc bare-URL states get no hash fragment */
  if (!opts.noHash) {
    var noHashModes = { about: true, kc: true };
    var newHash = noHashModes[modeId] ? '' : modeId;
    /* Encode parameters for the parametric modes */
    if (modeId === 'search') {
      if (opts.triggerId)  newHash = 'search?trigger=' + encodeURIComponent(opts.triggerId);
      else if (opts.query) newHash = 'search?q=' + encodeURIComponent(opts.query);
      else                 newHash = 'search';
    } else if (modeId === 'doorway' && opts.moment) {
      newHash = 'doorway/' + opts.moment + (opts.triggerId ? '/' + opts.triggerId : '');
    } else if (modeId === 'track' && opts.trackId) {
      newHash = 'track/' + opts.trackId;
    } else if (modeId === 'topic' && opts.topicId) {
      newHash = 'topic/' + opts.topicId;
    } else if (modeId === 'library') {
      newHash = 'library';
    } else if (modeId === 'sessions') {
      newHash = 'sessions';
    } else if (modeId === 'session' && opts.sessionId) {
      newHash = 'session/' + opts.sessionId;
    } else if (modeId === 'tracks') {
      newHash = 'tracks';
    }
    var currentHash = window.location.hash.replace(/^#/, '');
    if (currentHash !== newHash) {
      var historyMethod = opts.replace ? 'replaceState' : 'pushState';
      if (newHash) { history[historyMethod](null, '', '#' + newHash); }
      else         { history[historyMethod](null, '', window.location.pathname + window.location.search); }
      if (!opts.replace) { window.__llNavDepth = (window.__llNavDepth || 0) + 1; }
    }
  }

  /* If DR source was moved into pane, restore it before any other mode
     replaces pane content (pane.innerHTML would orphan the moved element). */
  if (modeId !== 'dr') { llDrRestoreSource(); }

  /* Render */
  var pane = llPane();
  if (!pane) { llRouting = false; return; }
  switch (modeId) {
    case 'about':   llRenderAbout(pane);                 break;
    case 'kc':      llRenderKnowledgeChecks(pane, opts); break;
    case 'te':      llRenderTeamExercises(pane, opts);   break;
    case 'dr':      llRenderDocReview(pane, opts);       break;
    case 'jc':      llRenderJudgementCalls(pane, opts);  break;
    case 'insp':    llRenderInspectionPrep(pane, opts);  break;
    case 'search': {
      var q = opts.query || '';
      var filters = {};
      if (opts.moment)  filters.moment  = opts.moment;
      if (opts.topicId) filters.topicId = opts.topicId;
      if (opts.kind)    filters.kind    = opts.kind;
      if (opts.triggerId) {
        for (var ti = 0; ti < LL_TRIGGERS.length; ti++) {
          if (LL_TRIGGERS[ti].id === opts.triggerId) {
            var trg = LL_TRIGGERS[ti];
            if (trg.moment)  filters.moment  = trg.moment;
            if (trg.topicId) filters.topicId = trg.topicId;
            if (trg.kind)    filters.kind    = trg.kind;
            break;
          }
        }
      }
      llRenderSearch(pane, q, filters);
      break;
    }
    case 'doorway': llRenderDoorway(pane, opts.moment || 'apply', opts.triggerId || null, { showAll: !!opts.showAll }); break;
    case 'track':   llRenderTrack(pane, opts.trackId); break;
    case 'topic':   llRenderTopic(pane, opts.topicId); break;
    case 'library': llRenderLibrary(pane); break;
    case 'sessions': llRenderSessionsList(pane); break;
    case 'session': llRenderSession(pane, opts.sessionId); break;
    case 'tracks':  llRenderTracksList(pane); break;
    case 'item':    llOpenLibraryItem(opts.itemId, { skipPush: true }); break;
    default:        pane.innerHTML = '<div class="ll-stub">Unknown mode.</div>';
  }
  pane.scrollTop = 0;
  llRouting = false;
}

var LL_SEE_ALSO_MAP = {
  delegation:  { te: 'delegation',  dr: 'delegation',  insp: 'delegation' },
  consent:     { te: 'consent',     dr: 'consent',     insp: 'consent'    },
  sae:         { te: 'sae',         dr: 'sae',         insp: 'sae'        },
  deviations:  { te: 'deviations',  dr: 'deviations',  insp: 'deviations' },
  monitoring:  { te: 'monitoring',  dr: 'monitoring',  insp: 'monitoring' },
  data:        { te: 'data',        dr: 'data',        insp: 'data'       },
  recruitment: { te: 'recruitment', dr: 'recruitment', insp: 'recruitment'},
  gcp:         { te: 'gcp',         dr: 'gcp',         insp: 'gcp'        }
};

function llSeeAlsoStrip(topicId, currentMode) {
  var map = LL_SEE_ALSO_MAP[topicId];
  if (!map) { return ''; }
  var cfg = {
    te:   { label: 'Team Exercise',   action: 'llTeOpenExercise'  },
    dr:   { label: 'Document Review', action: 'llDrOpenExercise'  },
    insp: { label: 'Inspection Prep', action: 'llInspStartTopic'  }
  };
  var html = '';
  var modes = ['te', 'dr', 'insp'];
  for (var i = 0; i < modes.length; i++) {
    var m = modes[i];
    if (m === currentMode || !map[m]) { continue; }
    html += '<button class="ll-see-also-btn" onclick="' + cfg[m].action + '(\'' + map[m] + '\')">' + cfg[m].label + ' →</button>';
  }
  if (!html) { return ''; }
  return '<div class="ll-see-also">' +
    '<div class="ll-see-also-label">Practise this topic a different way</div>' +
    '<div class="ll-see-also-links">' + html + '</div>' +
    '</div>';
}

function llRenderAbout(pane) {
  /* Three brand-palette doorway accents. Friendly icons, soft tint, distinct destinations. */
  var doorways = [
    { moment:'apply',  title:"I'm about to…",      sub:'Quick prep for a task you’re about to do.',
      accent:'#2b9ce2', tint:'rgba(43,156,226,0.10)',
      icon:'<path d="M13 2 3 14h7l-1 8 10-12h-7l1-8z"/>' /* zap / spark */ },
    { moment:'solve',  title:'Something happened…', sub:'A problem just landed. Think it through.',
      accent:'#ff537f', tint:'rgba(255,83,127,0.10)',
      icon:'<path d="M14.7 6.3a3 3 0 1 1 4 4l-9.5 9.5-5 1 1-5 9.5-9.5z"/><path d="M14 7l3 3"/>' /* wrench-y; problem-solving */ },
    { moment:'change', title:'What changed…',       sub:'New SOPs, new regs, jurisdiction shifts.',
      accent:'#9039f9', tint:'rgba(144,57,249,0.10)',
      icon:'<path d="M12 3v3"/><path d="M12 18v3"/><path d="M5.6 5.6l2.1 2.1"/><path d="M16.3 16.3l2.1 2.1"/><path d="M3 12h3"/><path d="M18 12h3"/><path d="M5.6 18.4l2.1-2.1"/><path d="M16.3 7.7l2.1-2.1"/>' /* sparkle */ }
  ];

  var arrowSvg = '<svg class="ll-doorway-arrow" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';

  var html = '';
  html += '<h1>Learning Lab</h1>';
  html += '<div class="ll-pane-sub">Practice for the moment of need.</div>';

  /* Three moment-of-need doorways */
  html += '<div class="ll-section-head" style="font-size:13px;margin-bottom:8px">Start with a moment of need</div>';
  html += '<div class="ll-doorways">';
  for (var i = 0; i < doorways.length; i++) {
    var d = doorways[i];
    var styleVars = 'style="--dw-accent:' + d.accent + ';--dw-tint:' + d.tint + '"';
    html += '<button class="ll-doorway" ' + styleVars + ' onclick="llRoute(\'doorway\',{moment:\'' + d.moment + '\'})">';
    html +=   '<div class="ll-doorway-icon"><svg viewBox="0 0 24 24" aria-hidden="true">' + d.icon + '</svg></div>';
    html +=   arrowSvg;
    html +=   '<div class="ll-doorway-title">' + d.title + '</div>';
    html +=   '<div class="ll-doorway-sub">' + d.sub + '</div>';
    html += '</button>';
  }
  html += '</div>';

  /* Library + Sessions — peers to the doorways but framed as alternative entries */
  html += '<div class="ll-section-head" style="font-size:13px;margin:32px 0 8px">Browse</div>';
  html += '<div class="ll-alt-tiles">';
  html += '<button class="ll-library-tile" onclick="llRoute(\'library\')">';
  html +=   '<div class="ll-library-tile-body">';
  html +=     '<div class="ll-library-tile-title">Library</div>';
  html +=     '<div class="ll-library-tile-sub">All practice items, organised by topic.</div>';
  html +=   '</div>';
  html +=   '<svg class="ll-library-tile-arrow" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';
  html += '</button>';
  html += '<button class="ll-library-tile" onclick="llRoute(\'tracks\')">';
  html +=   '<div class="ll-library-tile-body">';
  html +=     '<div class="ll-library-tile-title">Practice paths</div>';
  html +=     '<div class="ll-library-tile-sub">Curated sequences for working through one task end-to-end.</div>';
  html +=   '</div>';
  html +=   '<svg class="ll-library-tile-arrow" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';
  html += '</button>';
  html += '<button class="ll-library-tile" onclick="llRoute(\'sessions\')">';
  html +=   '<div class="ll-library-tile-body">';
  html +=     '<div class="ll-library-tile-title">Facilitated sessions</div>';
  html +=     '<div class="ll-library-tile-sub">15, 30, and 60-minute packs for team meetings.</div>';
  html +=   '</div>';
  html +=   '<svg class="ll-library-tile-arrow" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';
  html += '</button>';
  html += '</div>';

  /* Topic chip strip — quick affordance */
  var topicOrder = ['consent', 'sae', 'delegation', 'deviations', 'monitoring', 'data', 'recruitment', 'gcp', 'tcps2', 'div5', 'iso14155'];
  html += '<div class="ll-topics-strip" style="margin-top:24px">';
  html += '<div class="ll-section-head" style="font-size:11px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:var(--ll-text-3);margin-bottom:8px">Topics</div>';
  html += '<div class="ll-topics-strip-chips">';
  for (var to = 0; to < topicOrder.length; to++) {
    var tid = topicOrder[to];
    if (!LL_TOPIC_LABEL[tid]) continue;
    html += '<button class="ll-topic-chip" onclick="llRoute(\'topic\',{topicId:\'' + tid + '\'})">' + LL_TOPIC_LABEL[tid] + '</button>';
  }
  html += '</div></div>';

  pane.innerHTML = html;
}

/* ── Stub renderers (replaced as each mode is migrated) ───────────────── */
function llStubPane(pane, title, sub) {
  pane.innerHTML =
    '<h1>' + title + '</h1>' +
    '<div class="ll-pane-sub">' + sub + '</div>' +
    '<div class="ll-stub">Migration in progress — content will appear here.</div>';
}
/* ════════════════════════════════════════════════════════════════════════
   TEAM EXERCISES — migrated to new shell
════════════════════════════════════════════════════════════════════════ */

var LL_TE_EXERCISES = [
  { slug:'delegation', topic:'Delegation and Team Roles',        title:'Delegation Boundaries on the Study Team',   meta:'4 situations · SOP-CR-002' },
  { slug:'consent',    topic:'Informed Consent Process',         title:'Verifying a Consent Was Properly Obtained', meta:'4 situations · SOP-CR-008' },
  { slug:'sae',        topic:'SAE and Adverse Event Reporting',  title:'Working Through an SAE Cascade',            meta:'4 situations · SOP-CR-012' },
  { slug:'deviations', topic:'Protocol Deviations',              title:'Classifying Protocol Deviations',           meta:'5 issues · ICH E6(R3)' },
  { slug:'monitoring', topic:'Monitoring and Inspection Readiness', title:'Preparing for an Inspection',             meta:'6 questions · ICH E6(R3)' },
  { slug:'data',       topic:'Data Integrity',                   title:'Identifying the Source Record',             meta:'5 situations · ALCOA+' },
  { slug:'recruitment',topic:'Recruitment and Screening',        title:'Recruitment and Eligibility Decisions',     meta:'5 situations · ICH E6(R3)' },
  { slug:'gcp',        topic:'GCP Principles',                   title:'Working with GCP Principles in Practice',   meta:'5 comments · ICH E6(R3)' }
];

var llTeCurrentSlug = '';

function llRenderTeamExercises(pane) {
  var h = (window.location.hash || '').replace(/^#/, '');
  var parts = h.split('/');
  if (parts[0] === 'team' && parts[1]) { llTeOpenExercise(parts[1]); return; }
  /* Bare #te has no destination — redirect to Library */
  llRoute('library');
}

function llTeRenderList(pane) {
  var html = '<h1>Team Exercises</h1>';
  html += '<div class="ll-pane-sub">Case-based discussion exercises for team meetings or solo work. Key points are hidden until you reveal them. Print without key points for group use.</div>';
  html += '<div class="ll-te-list">';
  for (var i = 0; i < LL_TE_EXERCISES.length; i++) {
    var ex = LL_TE_EXERCISES[i];
    html += '<div class="ll-te-item" onclick="llTeOpenExercise(\'' + ex.slug + '\')">';
    html +=   '<div class="ll-te-topic">' + ex.topic + '</div>';
    html +=   '<div class="ll-te-title">' + ex.title + '</div>';
    html +=   '<div class="ll-te-meta">' + ex.meta + '</div>';
    html += '</div>';
  }
  html += '</div>';
  pane.innerHTML = html;
}

function llTeOpenExercise(slug) {
  var source = document.getElementById('kp-phase-te-' + slug);
  if (!source) { return; }
  llTeCurrentSlug = slug;
  var clone = source.cloneNode(true);
  var navRow = clone.querySelector('.kp-nav-row');
  if (navRow) { navRow.parentNode.removeChild(navRow); }
  var navHTML =
    '<div class="ll-kc-seq-nav" style="margin-bottom:24px">' +
      '<button class="ll-back-btn" onclick="llTeBackToList()">&#8592; Back</button>' +
      '<span class="ll-kc-seq-badge">Team Exercises</span>' +
    '</div>';
  llPane().innerHTML = navHTML + clone.innerHTML;
  /* Linkify regulatory citations inside cloned TE content */
  if (typeof llLinkifyCitations === 'function') {
    var refSpans = llPane().querySelectorAll('.te-kp-ref, .kp-dr-ref, .kp-source-ref');
    for (var rs = 0; rs < refSpans.length; rs++) {
      refSpans[rs].innerHTML = llLinkifyCitations(refSpans[rs].innerHTML);
    }
  }
  history.pushState(null, '', '#team/' + slug);
  llPaneTop();
}

function llTeBackToList() {
  llTeCurrentSlug = '';
  llBackTo('library');
}
/* ════════════════════════════════════════════════════════════════════════
   DOCUMENT REVIEW — migrated to new shell
   Strategy: move (not clone) #kp-phase-docreview into #ll-pane so that
   document.getElementById still finds all existing IDs uniquely, allowing
   kpDrSetup / kpDrRenderFinding to work unchanged.
════════════════════════════════════════════════════════════════════════ */

var _llDrSourceParent = null;
var _llDrSourceNext   = null;

var LL_DR_EXERCISES = [
  { slug:'delegation',  topic:'Delegation and Team Roles',           title:"What’s wrong with this delegation log?" },
  { slug:'consent',     topic:'Informed Consent Process',            title:"What’s wrong with this consent form?" },
  { slug:'sae',         topic:'SAE and Adverse Event Reporting',     title:"What’s wrong with this SAE report?" },
  { slug:'deviations',  topic:'Protocol Deviations',                 title:"What’s wrong with this deviation log?" },
  { slug:'monitoring',  topic:'Monitoring and Inspection Readiness', title:"What’s wrong with these site responses?" },
  { slug:'data',        topic:'Data Integrity',                      title:"What’s wrong with this source document?" },
  { slug:'recruitment', topic:'Recruitment and Screening',           title:"What’s wrong with this screen failure log?" },
  { slug:'gcp',         topic:'GCP Principles',                      title:"What’s wrong with this qualification record?" }
];

function llDrRestoreSource() {
  if (!_llDrSourceParent) { return; }
  var source = document.getElementById('kp-phase-docreview');
  if (source && source.parentNode !== _llDrSourceParent) {
    source.style.display = '';
    source.classList.add('kp-phase');  /* restore so shell CSS hides it again */
    var navRow = source.querySelector('.kp-nav-row');
    if (navRow) { navRow.style.display = ''; }
    _llDrSourceParent.insertBefore(source, _llDrSourceNext || null);
  }
}

function llRenderDocReview(pane) {
  var h = (window.location.hash || '').replace(/^#/, '');
  var parts = h.split('/');
  if (parts[0] === 'docreview' && parts[1]) { llDrOpenExercise(parts[1]); return; }
  llRoute('library');
}

function llDrRenderList(pane) {
  var html = '<h1>Document Review</h1>';
  html += '<div class="ll-pane-sub">Constructed research documents with deliberate errors. Identify the issues before stepping through the annotated findings.</div>';
  html += '<div class="ll-te-list">';
  for (var i = 0; i < LL_DR_EXERCISES.length; i++) {
    var ex = LL_DR_EXERCISES[i];
    var count = (KP_DR_EXERCISES[ex.slug] && KP_DR_EXERCISES[ex.slug].findings) ? KP_DR_EXERCISES[ex.slug].findings.length : 0;
    html += '<div class="ll-te-item" onclick="llDrOpenExercise(\'' + ex.slug + '\')">';
    html +=   '<div class="ll-te-topic">' + ex.topic + '</div>';
    html +=   '<div class="ll-te-title">' + ex.title + '</div>';
    html +=   '<div class="ll-te-meta">' + count + ' findings</div>';
    html += '</div>';
  }
  html += '</div>';
  pane.innerHTML = html;
}

function llDrOpenExercise(slug) {
  var source = document.getElementById('kp-phase-docreview');
  if (!source) { return; }
  _llDrSourceParent = source.parentNode;
  _llDrSourceNext   = source.nextSibling;
  var navRow = source.querySelector('.kp-nav-row');
  if (navRow) { navRow.style.display = 'none'; }
  /* kp-phase has display:none !important in shell CSS — remove the class
     so the element is visible when moved into the pane */
  source.classList.remove('kp-phase');
  source.style.display = 'block';
  var pane = llPane();
  pane.innerHTML =
    '<div class="ll-kc-seq-nav" style="margin-bottom:24px">' +
      '<button class="ll-back-btn" onclick="llDrBackToList()">&#8592; Back</button>' +
      '<span class="ll-kc-seq-badge">Document Review</span>' +
    '</div>';
  pane.appendChild(source);
  kpDrExerciseId = slug;
  kpDrCurrentExercise = KP_DR_EXERCISES[slug];
  kpDrSetup(slug);
  history.pushState(null, '', '#docreview/' + slug);
  llPaneTop();
}

function llDrBackToList() {
  llDrRestoreSource();
  llBackTo('library');
}
/* ════════════════════════════════════════════════════════════════════════
   JUDGEMENT CALLS — migrated to new shell
════════════════════════════════════════════════════════════════════════ */

var llJcActive = false;

(function() {
  var _origGoHub   = jcGoHub;
  var _origGoRole  = jcGoRole;
  var _origStart   = jcStartScenario;

  jcGoHub  = function() { if (llJcActive) { llJcBackToRoles();      } else { _origGoHub();  } };
  jcGoRole = function() { if (llJcActive) { llJcBackToScenarios();  } else { _origGoRole(); } };
  jcStartScenario = function(id) { if (llJcActive) { llJcStartScenario(id); } else { _origStart(id); } };
})();

function llRenderJudgementCalls(pane) {
  llJcActive = true;
  var h = (window.location.hash || '').replace(/^#/, '');
  var parts = h.split('/');
  var p0 = parts[0] || '', p1 = parts[1] || '', p2 = parts[2] || '';
  if (p0 === 'judgement-calls' && p1 && p2) { jcCurrentRoleId = p1; llJcStartScenario(p2); return; }
  if (p0 === 'judgement-calls' && p1)        { llJcRenderRoleScenarios(p1); return; }
  llRoute('library');
}

function llJcRenderRoleGrid(pane) {
  var html = '<h1>Judgement Calls</h1>';
  html += '<div class="ll-pane-sub">Realistic pressure scenarios where someone asks you to do something that may not be right. Three decision points per scenario — choose your response, then see the analysis.</div>';
  html += '<div class="ll-kc-topics">';
  for (var r = 0; r < JC_ROLES.length; r++) {
    var role = JC_ROLES[r];
    var count = 0;
    for (var s = 0; s < JC_SCENARIOS.length; s++) {
      if (JC_SCENARIOS[s].role === role.id && JC_SCENARIOS[s].live) { count++; }
    }
    if (count === 0) { continue; }
    html += '<div class="ll-kc-topic" onclick="llJcSelectRole(\'' + role.id + '\')">';
    html +=   '<div class="ll-kc-topic-name">' + role.name + '</div>';
    html +=   '<div class="ll-kc-topic-meta">' + count + ' scenario' + (count !== 1 ? 's' : '') + '</div>';
    html += '</div>';
  }
  html += '</div>';
  pane.innerHTML = html;
}

function llJcSelectRole(roleId) {
  jcCurrentRoleId = roleId;
  history.pushState(null, '', '#judgement-calls/' + roleId);
  llJcRenderRoleScenarios(roleId);
}

function llJcRenderRoleScenarios(roleId) {
  var role = null;
  for (var r = 0; r < JC_ROLES.length; r++) { if (JC_ROLES[r].id === roleId) { role = JC_ROLES[r]; break; } }
  var pane = llPane();
  var html = '<div class="ll-kc-seq-nav">' +
    '<button class="ll-back-btn" onclick="llJcBackToRoles()">&#8592; Back</button>' +
    '<span class="ll-kc-seq-badge">Judgement Calls</span>' +
    '</div>' +
    '<div class="ll-kc-seq-label">' + (role ? role.name : roleId) + '</div>';
  html += '<div class="ll-jc-scenarios">';
  for (var i = 0; i < JC_SCENARIOS.length; i++) {
    var s = JC_SCENARIOS[i];
    if (s.role !== roleId) { continue; }
    if (!s.live) {
      html += '<div class="ll-jc-scenario-coming">';
      html +=   '<div class="ll-jc-scenario-topic">' + s.topic + '</div>';
      html +=   '<div class="ll-kc-topic-name">' + s.title + '</div>';
      html +=   '<div class="ll-kc-topic-meta">' + s.scenes + ' pressure points · Coming soon</div>';
      html += '</div>';
    } else {
      html += '<div class="ll-jc-scenario" onclick="llJcStartScenario(\'' + s.id + '\')">';
      html +=   '<div class="ll-jc-scenario-topic">' + s.topic + '</div>';
      html +=   '<div class="ll-kc-topic-name">' + s.title + '</div>';
      html +=   '<div class="ll-jc-scenario-desc">' + s.desc + '</div>';
      html +=   '<div class="ll-kc-topic-meta">' + s.scenes + ' pressure points · ' + s.ref + '</div>';
      html += '</div>';
    }
  }
  html += '</div>';
  pane.innerHTML = html;
}

function llJcStartScenario(id) {
  var scenario = null;
  for (var i = 0; i < JC_SCENARIOS.length; i++) {
    if (JC_SCENARIOS[i].id === id && JC_SCENARIOS[i].live) { scenario = JC_SCENARIOS[i]; break; }
  }
  if (!scenario) { llJcBackToRoles(); return; }
  jcCurrentScenario  = scenario;
  jcCurrentRoleId    = scenario.role;
  jcCurrentScene     = 0;
  jcScores           = [];
  jcGoodCount        = 0;
  var pane = llPane();
  pane.innerHTML = llJcScenarioHTML();
  history.pushState(null, '', '#judgement-calls/' + jcCurrentRoleId + '/' + id);
  jcRenderHeader();
  jcRenderTracker();
  jcRenderAllScenes();
  jcShowScene(0);
  llPaneTop();
}

function llJcScenarioHTML() {
  return '<div class="ll-kc-seq">' +
    '<div class="ll-kc-seq-nav">' +
      '<button class="ll-back-btn" onclick="llJcBackToScenarios()">&#8592; Back</button>' +
      '<span class="ll-kc-seq-badge">Judgement Calls</span>' +
    '</div>' +
    '<div id="jc-scenario-header"></div>' +
    '<div id="jc-tracker"></div>' +
    '<div id="jc-scenes"></div>' +
    '<div id="jc-ending"></div>' +
  '</div>';
}

function llJcBackToRoles() {
  jcCurrentScenario = null;
  jcCurrentRoleId   = '';
  llBackTo('library');
}

function llJcBackToScenarios() {
  jcCurrentScenario = null;
  llBackTo('library');
}
/* ════════════════════════════════════════════════════════════════════════
   INSPECTION PREP — migrated to new shell
════════════════════════════════════════════════════════════════════════ */

var llInspActive = false;

(function() {
  var _orig = inspGoHub;
  inspGoHub = function() { if (llInspActive) { llInspBackToTopics(); } else { _orig(); } };
})();

function llRenderInspectionPrep(pane) {
  var h = (window.location.hash || '').replace(/^#/, '');
  var parts = h.split('/');
  var p0 = parts[0] || '', p1 = parts[1] || '';
  if (p0 === 'inspection-prep' && p1) { llInspStartTopic(p1); return; }
  llRoute('library');
}

function llInspRenderTopicList(pane) {
  var html = '<h1>Inspection Prep</h1>';
  html += '<div class="ll-pane-sub">Mock inspector questions across ' + INSP_TOPICS.length + ' topics. Formulate your answer before revealing the model response.</div>';
  html += '<div class="ll-kc-topics">';
  for (var i = 0; i < INSP_TOPICS.length; i++) {
    var t = INSP_TOPICS[i];
    html += '<div class="ll-kc-topic" onclick="llInspStartTopic(\'' + t.id + '\')">';
    html +=   '<div class="ll-kc-topic-name">' + t.name + '</div>';
    html +=   '<div class="ll-kc-topic-meta">' + t.count + ' questions · ' + t.ref + '</div>';
    html += '</div>';
  }
  html += '</div>';
  pane.innerHTML = html;
}

function llInspStartTopic(topicId) {
  inspCurrentTopicId = topicId;
  inspQueue = inspBuildQueue(topicId);
  inspIndex = 0;
  var topicName = '';
  for (var i = 0; i < INSP_TOPICS.length; i++) {
    if (INSP_TOPICS[i].id === topicId) { topicName = INSP_TOPICS[i].name; break; }
  }
  var pane = llPane();
  pane.innerHTML = llInspSeqHTML(topicName);
  history.pushState(null, '', '#inspection-prep/' + topicId);
  llInspActive = true;
  inspRenderCard();
  llPaneTop();
}

function llInspSeqHTML(topicName) {
  return '<div class="ll-kc-seq">' +
    '<div class="ll-kc-seq-nav">' +
      '<button class="ll-back-btn" onclick="llInspBackToTopics()">&#8592; Back</button>' +
      '<span class="ll-kc-seq-badge">Inspection Prep</span>' +
    '</div>' +
    '<div class="ll-kc-seq-label">' + topicName + '</div>' +
    '<div id="insp-card-wrap"></div>' +
  '</div>';
}

function llInspBackToTopics() {
  llInspActive = false;
  inspCurrentTopicId = '';
  llBackTo('library');
}

/* ════════════════════════════════════════════════════════════════════════
   KNOWLEDGE CHECKS — migrated to new shell
════════════════════════════════════════════════════════════════════════ */

if (!kpStudyType) { kpStudyType = 'interventional'; }

var llKcActive = false;

(function() {
  var _orig = kpShowEnd;
  kpShowEnd = function() { if (llKcActive) { llKcRenderEnd(); } else { _orig(); } };
})();

function llRenderKnowledgeChecks(pane) {
  var h = (window.location.hash || '').replace(/^#/, '');
  var parts = h.split('/');
  var p0 = parts[0] || '', p1 = parts[1] || '', p2 = parts[2] || '';
  if ((p0 === 'browse' || p0 === 'practice') && (p1 === 'interventional' || p1 === 'observational')) {
    kpStudyType = p1;
  }
  if (p0 === 'shuffle' && p1) { kpStudyType = p1; llKcStartShuffle(); return; }
  if (p0 === 'browse' && p2)  { llKcStartTopic(p2); return; }
  llRoute('library');
}

function llKcRenderGrid(pane) {
  var intl = (kpStudyType !== 'observational');
  var html = '<h1>Knowledge Checks</h1>';
  html += '<div class="ll-pane-sub">Multiple-choice questions with immediate feedback across ' + KP_TOPICS.filter(function(t){ return t.live && (intl || t.applies !== 'interventional'); }).length + ' topics. Browse by topic or shuffle for a randomised mix.</div>';
  html += '<div class="ll-kc-controls">';
  html +=   '<div class="ll-kc-pills">';
  html +=     '<button class="ll-kc-pill' + ( intl ? ' active' : '') + '" onclick="llKcSetStudyType(\'interventional\')">Interventional</button>';
  html +=     '<button class="ll-kc-pill' + (!intl ? ' active' : '') + '" onclick="llKcSetStudyType(\'observational\')">Observational</button>';
  html +=   '</div>';
  html +=   '<button class="ll-kc-shuffle-btn" onclick="llKcStartShuffle()">Shuffle all</button>';
  html += '</div>';
  html += '<div class="ll-kc-topics">';
  for (var i = 0; i < KP_TOPICS.length; i++) {
    var t = KP_TOPICS[i];
    if (!t.live || (!intl && t.applies === 'interventional')) { continue; }
    var count = 0;
    for (var j = 0; j < KP_POOL.length; j++) {
      var q = KP_POOL[j];
      if (q.topicId === t.id && q.type === 'check' && !(q.applies === 'interventional' && !intl)) { count++; }
    }
    html += '<div class="ll-kc-topic" onclick="llKcStartTopic(\'' + t.id + '\')">';
    html +=   '<div class="ll-kc-topic-name">' + t.name + '</div>';
    html +=   '<div class="ll-kc-topic-meta">' + count + ' questions · ' + t.sop + '</div>';
    html += '</div>';
  }
  html += '</div>';
  pane.innerHTML = html;
}

function llKcSetStudyType(type) {
  kpStudyType = type;
  llRoute('kc', { noHash: true });
}

function llKcStartTopic(topicId) {
  var topic = null;
  for (var i = 0; i < KP_TOPICS.length; i++) { if (KP_TOPICS[i].id === topicId) { topic = KP_TOPICS[i]; break; } }
  if (!topic) { return; }
  var intl = (kpStudyType !== 'observational');
  var queue = [];
  for (var j = 0; j < KP_POOL.length; j++) {
    var q = KP_POOL[j];
    if (q.topicId === topicId && q.type === 'check' && !(q.applies === 'interventional' && !intl)) { queue.push(q); }
  }
  if (!queue.length) { return; }
  seqQueue = queue; seqIndex = 0; seqCorrect = 0; seqChecks = 0; seqTransitioning = false;
  kpMode = 'browse'; kpBrowseTopicId = topicId; kpBrowseType = 'check';
  var pane = llPane();
  pane.innerHTML = llKcSeqHTML(topic.name);
  var fill = document.getElementById('kp-seq-progress-fill');
  if (fill) { fill.className = 'kp-seq-progress-fill browse-col'; }
  history.pushState(null, '', '#browse/' + kpStudyType + '/' + topicId);
  llKcActive = true;
  kpSeqRender();
}

function llKcStartShuffle() {
  var intl = (kpStudyType !== 'observational');
  var pool = [];
  for (var i = 0; i < KP_POOL.length; i++) {
    var q = KP_POOL[i];
    if (q.type === 'check' && !(q.applies === 'interventional' && !intl)) { pool.push(q); }
  }
  for (var i = pool.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var tmp = pool[i]; pool[i] = pool[j]; pool[j] = tmp;
  }
  seqQueue = pool; seqIndex = 0; seqCorrect = 0; seqChecks = 0; seqTransitioning = false;
  kpMode = 'shuffle'; kpBrowseType = 'check';
  var pane = llPane();
  pane.innerHTML = llKcSeqHTML('All topics · ' + (intl ? 'Interventional' : 'Observational'));
  var fill = document.getElementById('kp-seq-progress-fill');
  if (fill) { fill.className = 'kp-seq-progress-fill shuffle-col'; }
  history.pushState(null, '', '#shuffle/' + kpStudyType);
  llKcActive = true;
  kpSeqRender();
}

function llKcSeqHTML(label) {
  return '<div class="ll-kc-seq">' +
    '<div class="ll-kc-seq-nav">' +
      '<button class="ll-back-btn" onclick="llKcBackToTopics()">&#8592; Back</button>' +
      '<span class="ll-kc-seq-badge">' + (kpStudyType === 'observational' ? 'Observational' : 'Interventional') + '</span>' +
    '</div>' +
    '<div class="ll-kc-seq-label">' + label + '</div>' +
    '<div class="kp-seq-progress-row">' +
      '<div class="kp-seq-progress-bar"><div id="kp-seq-progress-fill" style="width:0%"></div></div>' +
      '<span id="kp-seq-progress-label" class="kp-seq-progress-label"></span>' +
    '</div>' +
    '<div id="kp-seq-card-wrap"></div>' +
  '</div>';
}

function llKcRenderEnd() {
  var pane = llPane(); if (!pane) { return; }
  llKcActive = false;
  var feedback;
  if (seqChecks === 0 || seqCorrect === seqChecks) {
    feedback = 'Perfect score — solid command of this material. Move on to another topic or try the shuffle for a mixed review.';
  } else if (seqCorrect >= Math.ceil(seqChecks * 0.8)) {
    feedback = 'Strong result. Review the rationale on any questions you weren’t sure about — the details tend to matter in practice.';
  } else if (seqCorrect >= Math.ceil(seqChecks * 0.6)) {
    feedback = 'A few gaps worth revisiting. Read through the rationale on the ones you missed — the SOP links are there if you want to go deeper.';
  } else {
    feedback = 'This material takes repetition. Try again and focus on the rationale — understanding the reasoning is more useful than memorising answers.';
  }
  var topicName = '';
  if (kpMode === 'browse') {
    for (var i = 0; i < KP_TOPICS.length; i++) { if (KP_TOPICS[i].id === kpBrowseTopicId) { topicName = KP_TOPICS[i].name; break; } }
  }
  var nextBest = (kpMode === 'browse' && kpBrowseTopicId) ? llNextBestHTML(kpBrowseTopicId, 'mcq') : '';
  pane.innerHTML =
    '<div class="ll-kc-end">' +
      '<div class="ll-kc-end-eyebrow">' + (kpMode === 'shuffle' ? 'Shuffle complete' : 'Topic complete') + '</div>' +
      '<div class="ll-kc-end-score">' +
        '<span class="ll-kc-end-num">' + seqCorrect + '</span>' +
        '<span class="ll-kc-end-denom">/' + seqChecks + '</span>' +
        '<span class="ll-kc-end-label">correct</span>' +
      '</div>' +
      (topicName ? '<div class="ll-kc-end-topic">' + topicName + '</div>' : '') +
      '<div class="ll-kc-end-feedback">' + feedback + '</div>' +
      '<div class="ll-kc-end-btns">' +
        '<button class="ll-kc-end-retry" onclick="' + (kpMode === 'shuffle' ? 'llKcStartShuffle' : 'llKcRetry') + '()">Try again</button>' +
        '<button class="ll-kc-end-back" onclick="llKcBackToTopics()">&#8592; Back to topics</button>' +
      '</div>' +
    '</div>' +
    nextBest;
}

function llKcRetry()        { llKcStartTopic(kpBrowseTopicId); }
function llKcBackToTopics() {
  llKcActive = false;
  llBackTo('library');
}

/* ── Initial mode from hash, with legacy hash compatibility ──────────── */
function llInitialMode() {
  var h = (window.location.hash || '').replace(/^#/, '');
  if (!h) { return 'about'; }
  var p0 = h.split('/')[0];
  /* Phase 1 hashes */
  if (p0 === 'search' || p0 === 'doorway' || p0 === 'track' || p0 === 'tracks' || p0 === 'topic' || p0 === 'library' || p0 === 'sessions' || p0 === 'session' || p0 === 'item' || p0 === 'about') { return p0; }
  /* Mode short hashes */
  if (p0 === 'kc' || p0 === 'te' || p0 === 'dr' || p0 === 'jc' || p0 === 'insp') { return p0; }
  /* Legacy hash compatibility */
  if (p0 === 'practice' || p0 === 'browse' || p0 === 'shuffle') { return 'kc'; }
  if (p0 === 'team')                                            { return 'te'; }
  if (p0 === 'docreview')                                       { return 'dr'; }
  if (p0 === 'judgement-calls')                                 { return 'jc'; }
  if (p0 === 'inspection-prep')                                 { return 'insp'; }
  return 'kc';
}

/* Phase 1 hash parser — supports search?q=... and doorway/{moment} and track/{id} */
function llHashOpts() {
  var h = (window.location.hash || '').replace(/^#/, '');
  if (!h) return {};
  var parts = h.split('/');
  var p0 = parts[0];
  if (p0 === 'doorway' && parts[1]) return { moment: parts[1], triggerId: parts[2] || null };
  if (p0 === 'track'   && parts[1]) return { trackId: parts[1] };
  if (p0 === 'topic'   && parts[1]) return { topicId: parts[1] };
  if (p0 === 'library')             return {};
  if (p0 === 'sessions')            return {};
  if (p0 === 'session' && parts[1]) return { sessionId: parts[1] };
  if (p0 === 'tracks')              return {};
  if (p0 === 'item'    && parts[1]) return { itemId: parts[1] };
  if (p0 === 'search') {
    var qm = h.indexOf('?');
    if (qm < 0) return {};
    var query = '';
    var rest = h.substring(qm + 1).split('&');
    for (var i = 0; i < rest.length; i++) {
      var kv = rest[i].split('=');
      if (kv[0] === 'q')         query = decodeURIComponent(kv[1] || '');
      else if (kv[0] === 'trigger') { return { triggerId: decodeURIComponent(kv[1] || '') }; }
    }
    return { query: query };
  }
  return {};
}

/* ── Boot ──────────────────────────────────────────────────────────────
   Mintlify can re-render the page on SPA navigation, which wipes our
   event listeners. Re-bind on each boot attempt. Guard against double-
   boot via the llBooted flag and check that #ll-pane exists. */
function llBoot() {
  /* Reset stale DR parent ref — on SPA re-navigation React remounts the
     component, recreating kp-phase-docreview in its original position. */
  _llDrSourceParent = null;
  _llDrSourceNext   = null;
  var pane = llPane();
  if (!pane) { return false; }       /* shell not in DOM yet */
  /* Build the library index on every boot (data is static; cheap to rebuild) */
  llBuildLibrary();
  /* Home button (replaces the old mode-tab rail) */
  var homeBtn = document.querySelector('.ll-home');
  if (homeBtn && !homeBtn.__llBound) {
    homeBtn.__llBound = true;
    homeBtn.addEventListener('click', function () { llRoute('about'); });
  }
  /* Topnav links (Library, etc.) */
  var topnavLinks = document.querySelectorAll('.ll-topnav-link');
  for (var tl = 0; tl < topnavLinks.length; tl++) {
    if (topnavLinks[tl].__llBound) continue;
    topnavLinks[tl].__llBound = true;
    topnavLinks[tl].addEventListener('click', function (e) {
      var route = e.currentTarget.dataset.route;
      if (route) { llRoute(route); }
    });
  }
  /* Global search input */
  var searchInput = document.getElementById('ll-search-input');
  if (searchInput && !searchInput.__llBound) {
    searchInput.__llBound = true;
    var debounce = null;
    searchInput.addEventListener('input', function (e) {
      var v = e.target.value || '';
      if (debounce) clearTimeout(debounce);
      debounce = setTimeout(function () {
        if (v.length === 0) { llRoute('about'); return; }
        llRoute('search', { query: v });
      }, 180);
    });
    searchInput.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') { e.target.value = ''; llRoute('about'); }
    });
  }
  /* popstate — re-route to current hash without pushing a new one.
     Decrements nav depth so llBackTo can tell when in-Lab history is exhausted. */
  window.addEventListener('popstate', function () {
    if (window.__llNavDepth > 0) { window.__llNavDepth--; }
    var opts = llHashOpts();
    opts.noHash = true;
    llRoute(llInitialMode(), opts);
  });
  llBooted = true;
  var initOpts = llHashOpts();
  initOpts.noHash = true;
  llRoute(llInitialMode(), initOpts);
  return true;
}

window.__llInit = function() { llBoot(); };

/* Boot on initial load — try immediately, then poll briefly in case
   Mintlify hasn't committed the shell HTML to the DOM yet. */
(function llBootLoop() {
  if (llBoot()) { return; }
  var tries = 0;
  var t = setInterval(function () {
    tries++;
    if (llBoot() || tries > 20) { clearInterval(t); }
  }, 150);
})();

/* SPA re-navigation guard — Mintlify unmounts/remounts the component when
   navigating away and back, resetting #ll-pane to "Loading…" without
   re-executing this script. Watch for the pane to appear as a new DOM node
   and re-boot whenever it does. The _lastPane reference prevents double-boot
   when the same pane element is observed multiple times during subtree churn. */
(function() {
  var _lastPane = null;
  var obs = new MutationObserver(function() {
    var pane = document.getElementById('ll-pane');
    if (pane && pane !== _lastPane) {
      _lastPane = pane;
      llBoot();
    }
  });
  obs.observe(document.documentElement, { childList: true, subtree: true });
})();
