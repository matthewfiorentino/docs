# Check after pushing to Mintlify

Running list of things verified locally on `mint dev` that need confirming against the deployed
site, plus open questions that only production can answer. Delete items once confirmed.

---

## ⚠️ Blocking — verify first

### 1. Do the interactive tools actually load?

**Open My Study Roadmap on the live site.** (The Recruitment Realism Calculator was retired on Nov. 10, 2026, in review batch 75: its method and its table of published screen failure rates are now a section of Recruitment, Screening and Enrolment, and `public/recruitment-calc-script.js` was deleted.)

On the local dev server its script 404s:

| Request | Local result |
|---|---|
| `/roadmap-script.js` (requested by `my-roadmap.mdx:19`) | **404** |
| `/public/roadmap-script.js` | 200 |
| `/images/…` (root folder, for comparison) | 200 |

Root folders map straight to URL paths — `images/` serves at `/images/`, so `public/` serves at
`/public/`. But the page requests its script from the root. Mintlify builds on Next.js, which
*does* conventionally serve `public/` at the root, so production may differ from dev. Untested.

**Corroborating signal:** the two CRC onboarding plans in `roles/coordinator.mdx` are linked as
absolute `raw.githubusercontent.com/…/public/downloads/…` URLs rather than `/downloads/…`. That
looks like someone hit this exact problem and worked around it — which also explains why
institutional documents are being served from a personal GitHub account.

- **If the tool renders:** production serves `public/` at root, this is dev-only. Nothing to do.
- **If they don't:** two fixes —
  1. *(preferred)* move `roadmap-script.js` to the repo root
     alongside `images/` and `logo/`. No page edits needed, consistent with everything else, and
     lets the onboarding plans switch to `/downloads/…` and drop the GitHub dependency.
  2. change the `s.src` path to `/public/…`. A one-line edit, but entrenches the structure
     that caused the workaround.

---

## Confirm the deprecations behave

All verified locally, but `.mintignore` behaviour should be confirmed on the real build.

- [ ] `deprecated/` paths return **404**, are absent from search, and don't appear in the AI chat.
      Spot-check `/deprecated/training/learning-lab` and `/deprecated/kb/funding/budget-tool`.
- [ ] Old URLs land somewhere sensible — spot-check `/training/learning-lab`,
      `/apps/ctms`, `/cim/wi/ad001`, `/kb/funding/budget-tool`.
- [ ] Navigation no longer shows Learning Lab, the CTMS menu item, or the "For CIM Staff" group.
- [ ] Site search returns no hits for "Learning Lab", "CTMS" or "Work Instruction" pages.

## Confirm the animation removals

- [ ] Stat numbers on **BCU** and **MUHC Data Warehouse** render at their final value immediately —
      no counting up from zero.
- [ ] Pages appear without the fade-and-slide on load.
- [ ] Homepage hero background stays fixed while scrolling (parallax removed).
- [ ] **TOC scroll tracking still works** — this is the one at risk. `toc-fix.js` had the stat
      counter removed from it; the heading-tracking fix must still function. Scroll a long page
      (e.g. `/kb/foundations/clinical-research-101`) and confirm the right-hand TOC highlights
      the current section.

---

## Open decisions, not yet actioned

- **Card hover lifts** — 13 rules apply `translateY(-1px … -3px)` on hover to cards, role tiles
  and panels. Left in place: they're standard clickability affordance rather than decoration.
  Flag if you want them flat too.
- **Two institutional documents on a personal GitHub account** — the CRC onboarding plans.
  Resolves itself if fix (1) above is taken.
- **Three `[TO CONFIRM]` markers** — `training/supplementary-training`, `cim/services`,
  `cim/planning`. Includes the Catalis Fast Track routing claim.
- **`apps/crosslab.mdx`** — 162 words, effectively a stub.
- **Role guide structure** — RESTRUCTURED September 2026: 10 pages → 7 (IV+V guides merged per
  role, nurse-guide merged into nurse, orientations and interventional guides slimmed of
  KB-restated detail). Originals archived in `deprecated/_pre-restructure/`. After pushing:
  spot-check `/roles/pi-guide-iv-v`, `/roles/crc-guide-iv-v`, and `/roles/nurse` render, and
  that `/roles/pi-guide-iv`, `/roles/crc-guide-v`, `/roles/nurse-guide` redirect.
- **CIM routing — checked, the Hub is right.** (Corrects an entry made 21 Oct from a
  text-extraction misreading of the Feb 2026 symposium deck.) In the rendered roadmap
  (`~/Desktop/Unsorted/RI-MUHC Clinical studies roadmap_JC_Feb 2026 (1) (1).pdf`; same layout
  as slide 10 of `~/Downloads/Clinical Trial Symposium - SMITH CAMPISI.pptx`), industry-
  sponsored and multicentre studies reach an **OR** diamond: *Managed by CIM* **or** *Managed by
  PI research team*. The PI-initiated track also reaches the CIM through Study Design. CIM is
  elective on both tracks, which matches `kb/planning/sponsored-trials.mdx:86` ("not a default
  for all sponsored trials") and the roadmap diagrams. Nothing to change.

- **One agreement, three names.** The glossary (`kb/foundations/glossary.mdx:129-131`) says
  **Clinical Study Agreement (CSA)** "is preferred at the RI-MUHC to avoid confusion with
  Clinical Trial Application", and `kb/governance/institutional-structure.mdx:89` uses it. But
  `kb/funding/clinical-trial-agreements.mdx` is built around "CTA", and most pages plus the
  controlled SOPs (`sops/cr-004`, `cr-005`) say "Site Agreement". Decide the house term; the
  CTA page is the one that cuts against the glossary. SOP wording stays QA's.

- **CIM [TO CONFIRM] markers: the source exists.** The 20 May 2026 Town Hall
  (`~/Desktop/Town Hall_20-May-2026_ALL SLIDES.pdf`, Dr. Genge's section, pp. 10-18) is where
  the Hub's CIM details came from. Checked against the rendered slides:

  | Hub marker | Slide | Verdict |
  |---|---|---|
  | `cim/services.mdx:14`, `cim/planning.mdx:10` — CIM service agreement, from 1 June 2026 | p16 | **Confirmed.** "For Principal Investigators using any research services through the CIM … For all services accessed as June 1st, 2026." |
  | `cim/services.mdx:229` — ODC no longer does research bloodwork | p13 | **Confirmed**, including RVH, hours, iLab booking and SOC labels. |
  | `cim/planning.mdx:78` — Catalis Fast Track through the CIM | p18 | **Confirmed.** "as of June 2026 … all Catalis Fast Track studies … will be conducted through the CIM", pre-study to close-out. |
  | `cim/services.mdx:166` — price list 25 May, two tiers, 35% industry overhead | p15 | **Partly.** Date, two tiers and 35% confirmed. How the platform tiers map onto the two-tier model, and the rates, are not on the slide. |
  | `cim/services.mdx:135` — OnCore CTMS, 12-15 months | p17 | **Matches May status** ("Contract Negotiation", "Recruitment in Progress"). Five months old now; likely moved. |

  **One wording fix the slide supports.** `cim/planning.mdx:10` lists "sponsor-led trials"
  among the trials with priority for CIM facilities. Slide 12 says "Sponsor-led trials,
  **where the CIM is not running the trial**". The dropped qualifier is the clearest
  statement anywhere that sponsored trials normally run without the CIM.

  **Announced at the Town Hall, absent from the Hub** (status in May unclear; ask before
  adding): the Clinical Research Event Response Team (single intake for safety events,
  deviations and misconduct, p9); the MUHC Regulatory Framework required by the MSSS (p8);
  Permission to Contact for Research (p6). The CIM's newest self-presentation (p11: Phase 1
  in-patient admission since Sept 2025, first-in-human, cell and gene therapy including a
  non-oncology CAR-T programme) is mostly absent too.

  **Expectation set at the Town Hall.** Slide 27 announced the Hub with "customized AI-based
  tools to assess your needs". The MVP's tools are rule-based (My Study Roadmap, Is It
  Research?). Worth deciding how that promise is framed at launch.

- **For SME/QA adjudication** (drift found between role pages and KB; role pages now defer to
  the KB, but the KB source itself should be confirmed):
  - True SOP-CR count per level — `training/compliance-requirements.mdx` says 33; the retired
    role-page tables said 30–31. Counts now live only in compliance-requirements.
  - Sub-I PI-backup credential at Level III (NHP): Privileges required, or is Researcher Status
    sufficient where no reserved medical acts are involved? compliance-requirements implies the
    latter; the old crc-guide asserted the former.
  - Sponsor-held record retention: `kb/site-activation/isf.mdx` says 25 years;
    `kb/conduct/data-documentation/data-integrity.mdx` says 15 (amended Feb 2022). One is stale.


---

## SOP Reader and Assessment merge (September 2026)

The SOP Reader and the Competency Assessment are now **one TalentLMS course per level**.
Site-wide language updated to match. After pushing, spot-check:

- [ ] `/training/compliance-requirements` — the requirements matrix now has **one** row for
      SOP Reader and Assessment, and the Mermaid decision tree renders (five branches, each
      reading "SOP-CR/LR Reader and Assessment").
- [ ] `/apps/talentlms` — one card, not two, and its anchor link to
      `#sop-reader-and-assessment` resolves.
- [ ] `/faq`, `/roles/coordinator`, `/roles/trainee`, `/roles/nurse` — no leftover mention of
      a separate Competency Assessment.

### What changed in the model

| | Before | Now |
|---|---|---|
| Structure | SOP Reader (no expiry) + Competency Assessment (separate) | One course per level: read and acknowledge the units, then the assessment |
| Courses | Framed as one Reader + one Assessment | **One per level** — the SOP set differs by level. CR/LR is the *category*, and sets the renewal cycle |
| Renewal | Assessment expired 2 yr (I–III) / 5 yr (IV–V) | Whole course renews 2 yr (SOP-CR) / 5 yr (SOP-LR) |
| SOP revision | That Reader unit reset; you re-read it | SOPs revised on the same 2/5-year cycles. Exceptional revisions handled by note to file — no mid-cycle redo |
| Wording | Called "SOP training" | **Not** called training. "Compliance record", "certificate", or the course name |

Scope: 55 pages touched — the canonical page rewritten, 18 pages that described the two-part
model, and the controlled-document boilerplate on 34 SOP pages.

### Deliberately NOT changed — for QA

`sops/cr-001`, `cr-002`, `cr-003`, `cr-018` reproduce **controlled SOP text**. Their wording is
QA's to change, not ours, and those pages are being replaced with current versions around
Christmas anyway. Two things in that text are now out of date and worth flagging to QA:

- **`sops/cr-001.mdx` §5.11–5.13** still describe the Reader and the training module as separate
  artefacts ("the revised training with quiz and SOP Reader with quiz"), and §5.11/192 describes
  the old mid-cycle path — re-reading a revised SOP and answering its questions to keep an
  unexpired certificate. That is superseded by the note-to-file approach.
- **`sops/cr-003.mdx`** states there are **7 levels** of SOP training, and its table lists Levels
  I–VII. The Hub documents Levels I–V throughout. One of the two is wrong — worth settling before
  launch, since the level model drives the whole compliance matrix.
