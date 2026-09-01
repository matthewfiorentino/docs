# Check after pushing to Mintlify

Running list of things verified locally on `mint dev` that need confirming against the deployed
site, plus open questions that only production can answer. Delete items once confirmed.

---

## ⚠️ Blocking — verify first

### 1. Do the interactive tools actually load?

**Open My Study Roadmap and the Recruitment Realism Calculator on the live site.**

On the local dev server their scripts 404:

| Request | Local result |
|---|---|
| `/roadmap-script.js` (requested by `my-roadmap.mdx:19`) | **404** |
| `/recruitment-calc-script.js` (requested by `recruitment-calculator.mdx:231`) | **404** |
| `/public/roadmap-script.js` | 200 |
| `/images/…` (root folder, for comparison) | 200 |

Root folders map straight to URL paths — `images/` serves at `/images/`, so `public/` serves at
`/public/`. But both pages request their script from the root. Mintlify builds on Next.js, which
*does* conventionally serve `public/` at the root, so production may differ from dev. Untested.

**Corroborating signal:** the two CRC onboarding plans in `roles/coordinator.mdx` are linked as
absolute `raw.githubusercontent.com/…/public/downloads/…` URLs rather than `/downloads/…`. That
looks like someone hit this exact problem and worked around it — which also explains why
institutional documents are being served from a personal GitHub account.

- **If the tools render:** production serves `public/` at root, this is dev-only. Nothing to do.
- **If they don't:** two fixes —
  1. *(preferred)* move `roadmap-script.js` and `recruitment-calc-script.js` to the repo root
     alongside `images/` and `logo/`. No page edits needed, consistent with everything else, and
     lets the onboarding plans switch to `/downloads/…` and drop the GitHub dependency.
  2. change the two `s.src` paths to `/public/…`. Two one-line edits, but entrenches the structure
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
