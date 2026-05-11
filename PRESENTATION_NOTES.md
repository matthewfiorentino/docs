# Stakeholder Presentation — Walkthrough Notes

Casual monologue to accompany a live screen walkthrough. Follows the study journey chronologically: intake → planning → training → submission → conduct → close-out.

---

## Opening — Why this exists

So what I want to show you today is something I've been building called the Clinical Research Hub. I want to walk you through it, show you how it works, and explain the thinking behind it.

The reason it exists comes down to a problem I kept running into in my role as training advisor. Our researchers and staff are frustrated. If you're a new PI trying to figure out how to launch a study, or a coordinator trying to remember which SOP covers consent, or a nurse wondering what certifications they need — the answer is buried somewhere. It's in the Portal, in a PDF, in someone's email, in someone's head. There's no single place where this information lives in a way that's organized and easy to get to.

And the Portal was never designed for this. It was designed for administrative processes and file storage, and we've been trying to make it do double duty as a knowledge management system. It doesn't work well for that. It's fine for what it was built for — HR, finance, sensitive documents, administrative services. But when you try to use it as a place where people go to learn how to do their jobs, it falls short. The information is there, but it's hard to find, hard to navigate, and not designed to be read.

So what I built is a public-facing site. And I want to emphasize the word public, because that was a deliberate choice. There's nothing on this site that's confidential. It's guidance, it's SOPs, it's training requirements, it's regulatory context. There's no reason any of this should be behind a login. And making it public means our investigators can access it from their phones in a clinic, a CRC can pull it up during a monitoring visit, a new trainee can start reading before they even have Portal access.

Eventually — and this is a longer conversation — I think the Portal should stay focused on what it's actually good at. Administrative services, HR processes, sensitive files, financial documents. And public knowledge like this can live out here, where it's searchable, linkable, and designed to actually be read. Not just for clinical research either — this model could work for any research support function at the Institute.

---

## What I learned from other institutions — [no screen, just talking]

Before I started building, I spent a lot of time looking at what other research institutions have done. Harvard, NHS, Duke — Duke especially. We talked about Duke internally for a long time. Their clinical research office site is good — really good. They have role-specific onboarding, dedicated tracks for PIs, coordinators, nurses. They clearly put thought into it.

But here's what I noticed. When you follow their onboarding pathways to the end, you land on a list of CITI training modules. That's the destination. Complete these courses, check these boxes, you're done. And look — CITI is excellent, those courses matter. But the whole system is oriented around training as the endpoint. Learn the thing, pass the quiz, move on.

And that got me thinking about what we actually know about training and retention. People forget most of what they learn in a course within weeks. That's not a criticism of any training program — it's just how memory works. You retain what you use, and you forget what you don't practice. So if someone completes their GCP training in week two and then doesn't think about consent procedures again until month six when they're actually consenting a participant — how much of that training is still with them? Probably not a lot of the details.

So the question for me became: what happens after training? The researcher completes their courses in week two and then spends the next three years running a study. Where do they go when they have a question about consent during a monitoring visit? When they need to remember which SOP covers safety reporting? When a new CRC joins the team mid-study and needs to get up to speed?

I say this as a training advisor, and people are often surprised to hear it — training isn't always the solution. When something goes wrong in a study, or when there's a compliance finding, the reflex is always "we need more training." And sometimes that's true. But I think we need to ask the question more carefully. What problem are we actually trying to solve? Is it that the person was never taught? Or is it that the person was taught, but they can't find the information when they need it six months later?

More often, the real problem is access. The information exists — it's in an SOP, it's in a policy document, it's in someone's head — but it's not accessible in the flow of work. You can't change behaviour if you don't give people the tools to actually do what you're asking them to do. You can train someone on consent procedures all day, but if they can't quickly pull up the right reference when they're in front of a participant, the training doesn't translate into practice.

And here's the other thing — you can't even address training properly without first building the information architecture underneath it. What are you training people on? Where does that content live? How is it organized? If the underlying structure isn't there, training becomes this disconnected event that people sit through and then go back to figuring things out on their own. I wanted to build the foundation first — organize the knowledge, make it accessible, make it consultable — and then training becomes one touchpoint within that larger system, not the whole system.

What I'm really trying to build here is a culture of learning and consultation. Not "learn the thing and move on," but "here's a place you come back to, regularly, in the course of your work." The site should be something people use, not something they visited once during onboarding.

And there's a practical reason this matters right now. CIM is looking to offer new services, expand what they provide to researchers. But how do you communicate that to the community? How do researchers even find out what's available? You need a hub. You need a platform where this information is organized, where changes can be communicated, where people know to look. Without that, every new service just becomes another email that gets buried, another PDF that gets lost. This site is that platform.

The institutions I looked at — Duke being the strongest — they've done the training layer really well. What I'm trying to build is everything else around it.

---

## The homepage — [show screen]

So let me show you the site. Here's the homepage. And the first thing I want to point out is something you probably take for granted on every other website you use — but that we almost never see in healthcare or academic institutions. It's designed. Like, actually designed. There's a clear visual hierarchy, it's not a wall of text, there's a search bar right at the top.

We're all so used to good UX now — we use our phones all day, we use modern web tools — and then we come to work and everything looks like it was built in 2008. I think public institutions and healthcare have been slow to pick up on that. I wanted to fix that here.

### The role selector — [click "I am a..."]

The very first thing the site does is ask: who are you? PI, coordinator, nurse, trainee, volunteer, observer. Because depending on your role, what you need is completely different.

If I click PI — I get a coral card that says "Tell us about your study" with a link to the intake form, and next to it is the PI Pathway. These are two very different entry points. The intake form is for when you have a specific study. The pathway is for when you want to understand the role.

And below that is the study lifecycle — ten phases, concept through archiving. Each phase has cards linking to the relevant pages. So if you're mid-study and you need to deal with a monitoring visit, you click Phase 8 and there it is.

Let me actually walk through this the way a researcher would — starting with that intake form.

---

## Study Intake Form — [click into the intake form]

This is our primary entry point for new studies, and I want to spend a minute on it because it solves several problems at once.

So an investigator comes to this page and answers a series of questions about their planned study — what type of study, what kind of product they're investigating, whether it's single-site or multi-centric, what services they think they'll need.

### What the researcher gets — [walk through the form, show the output]

When they submit, they get a personalized startup checklist — not a generic "here's everything you might need" document, but a filtered list based on their actual answers. If they said it's a Level I drug trial, they get the CTA requirements, the Division 5 training, the full SOP list. If it's a Level V retrospective chart review, they get the privacy impact assessment pathway and the reduced SOP set. It meets them where they are.

### What we get — [show the facilitator side]

On our side, the Research Facilitator receives a structured intake record — the study type, the regulatory pathway, what services the investigator flagged. So when that researcher reaches out for help — and they will — we already have context. We're not starting from scratch asking "tell me about your study" in an email.

And this is where it gets interesting for us operationally. Every intake submission gives us data. We can start to see: how many new studies are coming in per quarter, what types, what services are being requested, where the bottlenecks are. That's dashboard reporting we've never had before. Right now we have almost no visibility into the pipeline of studies before they hit Nagano. This gives us that visibility.

The intake form is surfaced everywhere on the site — homepage, PI panel, lifecycle Phase 3, essential tools. We want every investigator who's even thinking about a study to start here.

---

## Planning and services — [navigate to Planning section / lifecycle Phase 3]

So now the researcher has their checklist. The next question is: what do I actually need to do, and who can help me?

This is where I've tried to better surface the services available to researchers. BCU for biostatistics consulting, CORD for research data management, the MUHC Data Warehouse for patient data access, the Centre for Innovative Medicine for clinical infrastructure — nursing, coordination, monitoring, technical platforms.

These services all exist. But investigators often don't know about them, or they discover them too late. They'll design a protocol without consulting biostatistics, then find out during review that their sample size calculation doesn't hold up. Or they'll get to the enrollment stage and realize they need CIM infrastructure they never arranged.

So I embedded these services directly into the study lifecycle. Phase 3 — Design and Planning — includes cards for BCU, CORD, the Data Warehouse, and CIM right alongside study design and team building. The idea is: these aren't separate services you go find on your own, they're part of your planning process.

And this connects to the point I was making earlier about needing a platform. CIM is expanding what they offer. Other units are adding services. But if there's no central place where researchers go to find this information, how do they find out? It ends up being word of mouth, or an email that gets lost. The site gives these services a place to live — organized by when a researcher would actually need them, not by which department provides them.

The reason our Portal feels disconnected is that it presents services in an organizational chart — "here's what this department does." I'm presenting them in a workflow — "here's what you need at this stage of your study, and here's who provides it."

---

## Regulatory context — [open regulatory framework page]

Before we get into training and submission, I want to show one page that I think captures why this site needs to exist.

Something that's really confusing about clinical research in Quebec is the number of regulatory layers. You have federal regulations — Health Canada, the Food and Drugs Act. You have the national ethics standard — TCPS2. You have Quebec provincial law — the Civil Code, which imposes requirements that don't exist in other provinces. And you have institutional requirements — the MUHC and RI-MUHC's own SOPs and authorization process.

This page maps all four layers and shows how they interact. Who enforces what. Where Quebec law is stricter than the federal standard — like consent compensation under Article 25, which is more restrictive than TCPS2 or ICH GCP. When your SOP obligation comes from GCP, when it comes from the Civil Code, when it comes from institutional policy.

This matters because people follow rules they understand. If a CRC just sees "you must do X" in an SOP, it's a rule to memorize. If they understand that the rule exists because Quebec civil law requires it and Health Canada will inspect for it — that's knowledge. That sticks.

---

## Training and credentials — [click to Training tab]

So the researcher has their plan, they understand the regulatory context. Now: what training do they need?

This is the compliance layer I was talking about earlier. This section maps out what's required by study level — Level I through V plus Sponsor-Investigator. There's a compliance requirements matrix, external certifications guidance — CITI, TCPS2 CORE, GCP, ISO 14155 for devices — and links to TalentLMS for the actual course completion.

One thing I want to point out: training level is determined by study type, not by role. A PI and a CRC on the same Level I drug trial complete the same institutional training. That's a point of confusion I address explicitly here.

But here's where the site differs from just handing someone a list of courses. On this site, training isn't sitting by itself. You don't land on this page in isolation — you arrive here because the intake form told you your study is Level I, or because the PI pathway said "complete training before appearing on the delegation log." Training is one step in a journey, not the whole journey.

And when training is done, the site doesn't stop. It points you to your role pathway. It says: here's what you actually do day to day. Here's where to go when you have a question six months from now. That's the part that addresses retention — not by making people retake courses, but by giving them a place to come back to when they need to remember something. The learning doesn't stop at the quiz. It continues every time someone consults a page on this site during their actual work.

That's what I mean by a culture of consultation. The site should be something people use regularly, not something they visited once during onboarding and never came back to.

### CANTRAIN — [show a CANTRAIN callout on a KB page]

I also linked CANTRAIN throughout the site — Canada's national clinical trials training platform. It's free, it's self-paced, and it covers topics that go beyond our institutional SOPs. It shows up as a callout at the bottom of about 40 Knowledge Base pages, always pointing to the most relevant course for that topic. So if someone finishes reading our consent page and wants to go deeper — the next step is right there.

### Learning Lab

And the Learning Lab — these are practice sessions, team discussion exercises, knowledge checks. Not assessed training — practice. Scenarios you can work through with your team, judgment calls, document review exercises, even an inspection preparation mode. Because training shouldn't stop at "read the SOP and click acknowledge."

### Training connects to roles — [show "What comes next" on training overview]

And once training is done, the question is: "OK, now what do I actually do in my role?" I added a section at the bottom of the training overview that points you to your role pathway. PI, CRC, or Nurse. The journey is: training tells you what to learn, the pathway tells you what to do.

---

## Role guides — [navigate to PI pathway]

The PI pathway maps everything a PI is accountable for — from prerequisites through close-out. There's a responsibility matrix showing what only you sign, what gets delegated to the CRC, what the nurse handles, what the Sub-Investigator can cover.

And then there are operational guides by study type — because running a Level I drug trial is completely different from running a Level V retrospective chart review. The interventional guide walks through pre-activation, active conduct, safety reporting, IP management. The retrospective guide focuses on the privacy impact assessment and data extraction. Same role, different realities.

There's the same structure for CRCs and nurses. The nurse pathway is interesting because nurses at the MUHC operate under dual accountability — the institutional SOPs and their OIIQ professional licence. Both layers apply simultaneously and neither substitutes for the other. The site spells that out clearly.

---

## SOPs — [click to SOPs tab]

Now let me show the SOPs. Every clinical research SOP is on this site — all 26 core SOPs, the Sponsor-Investigator series, the 500 series. Each one has an overview page with key points and a full document page with the complete text.

The overview page I just rebuilt. It mirrors the sidebar structure — eight topic groups, each SOP linked with its training level. If you're thinking "which SOP covers consent?", you look at the Participants group and there they are — CR-006 for ICF design, CR-008 for the consent process, CR-009 for recruitment. You don't have to know the SOP number to find it.

And I surfaced the appendices — 48 ISF templates, 22 TMF templates, 10 Health Canada inspection templates. All downloadable. These used to be hard to find. Now they're right on the overview page.

### Three layers of information — [show KB page → SOP → CANTRAIN]

This is a good moment to talk about something I did on purpose, which is presenting information at different levels. Take consent:

1. The **Knowledge Base page** — this is the accessible version. Plain language, flowcharts, tooltips on every technical term. This is where a new CRC starts.
2. The **SOP** — SOP-CR-008. The controlled document, the compliance standard. More formal, every requirement spelled out. This is what you get tested on in TalentLMS.
3. **CANTRAIN** — the course link at the bottom for professional development beyond the institutional minimum.

KB for understanding, SOP for compliance, CANTRAIN for growth. That three-layer model runs through the entire site. And everything is interlinked — the KB page links to the SOP, the SOP links back to the KB page, both link to CANTRAIN.

Important distinction though — reading the SOPs on this site does not fulfill the training requirement. That still goes through TalentLMS, where the acknowledgement is recorded. I make that very clear on the site. This site is for reference and consultation; TalentLMS is for tracked training.

---

## Submission — [walk through submission section]

So now our researcher has their plan, their training, their team. Time to submit.

The submission section walks through the whole process — preparing your package, submitting through Nagano, tracking your reviews, understanding the triple review process. And there's the full Nagano user guide under the Applications tab for step-by-step screenshots of every form type.

---

## Study conduct — [walk through conduct pages]

Once the study is approved and activated, this is where the team lives day-to-day. Consent procedures, recruitment and enrollment, data integrity, investigational products, biological specimens, safety reporting, monitoring visits.

### Cross-linking in the flow of work

Every page ends with Related Resources linking to the pages you're most likely to need next. SOPs are linked inline — you see "SOP-CR-008" and you can click straight to it. Glossary terms are defined in tooltips — hover over any highlighted term and you get the definition without leaving the page.

This is really the point of the whole thing. You should be able to consult this site in the flow of your work. Not as a separate task you do when you have time, but as something you pull up during a monitoring visit, during a consent discussion, when you're preparing for an inspection.

Think about a CRC who completed their training eight months ago. They're sitting in front of a monitor who's asking about their screening log. That person doesn't need another training module. They need to pull up the screening page on their phone, see the three logs they're supposed to maintain, see the SOP reference, and get back to the visit.

That's what I mean by reducing friction. The right information, accessible when you actually need it. If we want people to do things correctly — and we do — we have to give them the tools to do it. We can't just tell them once in a training course and hope they remember. We have to make it easy to look things up. That's how you actually change behaviour over time. Not by adding more training, but by making the right thing the easy thing to do.

### Pediatric and vulnerable populations — [show these pages]

Two new pages that came out of a gap I noticed. The Montreal Children's Hospital is part of the MUHC, so a significant portion of our research involves children. But until now, the only guidance on pediatric consent was a few lines in the general consent page.

The new Pediatric Research page covers the full picture — Civil Code requirements for minors, the consent and assent hierarchy by age, parental authority scenarios, what the REB expects, how to design an age-appropriate assent form. And there's a parallel Vulnerable Populations page covering capacity assessment, consent modifications, recruitment safeguards — because those come up across many study types, not just pediatric.

---

## Close-out and inspections — [show close-out and HC inspection guide]

And at the end of the lifecycle — close-out procedures, archiving requirements, and the Health Canada inspection guide. That inspection guide is one of the most detailed pages on the site. If you're ever notified of an inspection, this is your starting point — what documents to prepare, what the inspection team is looking for, how observations are classified, and what happens after.

---

## Search and AI — [click the search bar]

Everything on this site is searchable. The search understands the content, not just keywords. And I'm working on an AI assistant that can answer questions based on the actual site content — so instead of searching and reading, you can ask "what training do I need for a Level II device study?" and get a direct answer with links to the relevant pages.

---

## Where this goes

So to wrap up — this is version one. It covers clinical research. But the model scales. Any research support function that publishes guidance, processes, or training requirements could have its own section of a site like this.

The Portal stays for what the Portal is good at — admin, HR, finance, private documents. And public knowledge lives where it's most useful — on an actual modern website, designed to be read, searchable, interlinked, and accessible from anywhere.

And I think what we really need at the RI is to focus more on how we communicate — how we organize workflows, how we structure information, how we make sure people can find what they need when they need it. That's not a training problem. That's an information architecture problem. And it's a problem that has to be solved before training can even be effective, because training has to point somewhere. If the underlying structure isn't there, training becomes a disconnected event that people sit through and then go back to figuring things out on their own.

When units like CIM are expanding their services, or when new SOPs are released, or when regulatory requirements change — how does the community find out? How do researchers know what's available to them? You need a hub for that. You need a place that people know to check. That's what this is.

I think we owe our investigators and staff the same quality of experience they get from every other tool they use in their lives. Not a PDF behind three logins. Not a SharePoint page from 2014. A real site, designed for real use, consulted in real time.

And when the next compliance finding comes in, or when someone says "we need training on that" — maybe the answer is yes, we do need training. But maybe we should also ask: does the person have the tools to do what we're asking them to do? Can they find the information? Is it accessible? Because if it's not, more training isn't going to fix that.
