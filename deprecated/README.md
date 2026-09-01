# Deprecated content

Pages removed from the Clinical Research Hub while scoping the January 2027 MVP.
Excluded from the build via `.mintignore`, so they are not published, not indexed
for search, and not reachable by URL — but they stay in the repo and in git history.

Removed August 2026.

## What is here

| Path | Was at | Why |
|---|---|---|
| `training/learning-lab.mdx` | `/training/learning-lab` | Out of MVP scope. Return undecided. |
| `apps/ctms.mdx` | `/apps/ctms` | Out of MVP scope. |
| `cim/researcher-guide.mdx` | `/cim/researcher-guide` | "For CIM Staff" section — internal audience, out of MVP scope. |
| `cim/training.mdx` | `/cim/training` | As above. |
| `cim/wi-sops.mdx` | `/cim/wi-sops` | As above. |
| `cim/wi/` (24 pages) | `/cim/wi/*` | CIM work instructions. As above. |

## `_pre-removal/`

Copies of the five pages that referenced the Learning Lab, saved **before** those
references were stripped. Keep these until the Learning Lab question is settled — they
are the record of how it was woven into the role guides, and the basis for putting it
back if we decide to.

| File | Learning Lab references it carried |
|---|---|
| `_pre-removal/roles/coordinator.mdx` | 14 — an intro paragraph, 12 lines inside "Learn and reference" accordions across six competency domains, and a card |
| `_pre-removal/index.mdx` | 2 — a card in "Practice and learn", and a mention in the Training section description |
| `_pre-removal/roles/trainee.mdx` | 2 — a card and a list item |
| `_pre-removal/roles/nurse.mdx` | 1 — a card |
| `_pre-removal/roles/volunteer.mdx` | 1 — a list item |

The coordinator page is the one that matters. Six domains — Informed Consent,
Recruitment and Screening, Data Integrity, Adverse Events, Protocol Deviations, and
Monitoring and Audits — each carried a **Learning Lab** line and a **Team Exercise**
line in their "Learn and reference" accordion. Those accordions now list the Knowledge
Base article, the SOPs, and CANTRAIN courses, with no practice layer. That is the gap
to fill if the Learning Lab does not come back.

## To restore

1. `git mv` the pages back to their original paths.
2. Re-add them to `docs.json` navigation.
3. Restore the redirects removed from `docs.json` (23 `/cim/wi/*-overview` entries).
4. Diff the live role guides against `_pre-removal/` to reinstate the practice links.

## Assets moved with these pages

| Path | Was at | Note |
|---|---|---|
| `public/ll-script.js` | `/ll-script.js` | The Learning Lab application itself. Loaded by `training/learning-lab.mdx` line ~6576 as `/ll-script.js` — that path is correct again once both move back. |
| `public/downloads/cim/` (25 files) | `/downloads/cim/*` | Appendix templates and checklists linked from the CIM Work Instruction pages. |

## Text references cleaned up at the same time

These were prose, not links, so a link check would not have caught them.

| Page | Was | Now |
|---|---|---|
| `index.mdx` | Applications described as "Nagano, CTMS, TalentLMS, REDCap, OACIS, and CrossLab" | CTMS dropped from the list |
| `index.mdx` | CIM section "for researchers and CIM staff" | staff audience dropped — that area is gone |
| `roles/coordinator.mdx` | pointed at the CIM Staff Guide for Work Instructions | points at the RI-MUHC Portal |
| `roles/nurse.mdx` | mentioned CIM Work Instructions with nowhere to go | names the Portal and the TalentLMS reader |

Deliberately left alone, because they are not about the deprecated pages:

- `kb/conduct/safety-reporting/deviation-management.mdx` — "spreadsheet, calendar, or CTMS" is the generic industry term.
- `cim/services.mdx` — the "Coming soon — CIM CTMS" note about the OnCore deployment is CIM's own system and still accurate.
- `public/cim-rates.csv`, `public/lab-rates.csv` — loaded at runtime by `budget-tool-script.js`, so a static scan reads them as orphaned. They are not.

---

## `_pre-restructure/` — role guides before the September 2026 restructure

Copies of all ten role pages saved **before** the role-guide restructure (September 2026),
kept as the revert record. The restructure: merged the Level IV and Level V guides into one
IV–V guide per role (`pi-guide-iv-v`, `crc-guide-iv-v`), merged `nurse-guide` into `nurse`,
and slimmed KB-restated material out of the orientation pages and interventional guides.

| File | Was at | What happened |
|---|---|---|
| `_pre-restructure/roles/investigator.mdx` | `/roles/investigator` | Edited in place (slimmed) |
| `_pre-restructure/roles/pi-guide.mdx` | `/roles/pi-guide` | Edited in place (slimmed) |
| `_pre-restructure/roles/pi-guide-iv.mdx` | `/roles/pi-guide-iv` | Merged into `/roles/pi-guide-iv-v`; redirect added |
| `_pre-restructure/roles/pi-guide-v.mdx` | `/roles/pi-guide-v` | Merged into `/roles/pi-guide-iv-v`; redirect added |
| `_pre-restructure/roles/coordinator.mdx` | `/roles/coordinator` | Edited in place (guide cards, drift fixes) |
| `_pre-restructure/roles/crc-guide.mdx` | `/roles/crc-guide` | Edited in place (slimmed, drift fixes) |
| `_pre-restructure/roles/crc-guide-iv.mdx` | `/roles/crc-guide-iv` | Merged into `/roles/crc-guide-iv-v`; redirect added |
| `_pre-restructure/roles/crc-guide-v.mdx` | `/roles/crc-guide-v` | Merged into `/roles/crc-guide-iv-v`; redirect added |
| `_pre-restructure/roles/nurse.mdx` | `/roles/nurse` | Merged with `nurse-guide` in place |
| `_pre-restructure/roles/nurse-guide.mdx` | `/roles/nurse-guide` | Merged into `/roles/nurse`; redirect added |

To revert: copy the files back over `roles/`, restore the removed pages from this folder,
and restore the pre-restructure navigation and redirects in `docs.json`
(`git log docs.json` around September 2026 has the prior state).

## Second pass — orphaned pages (August 2026)

These three were built and publicly reachable by URL but **absent from `docs.json` navigation**, so they had no discovery value while carrying full accuracy and maintenance liability. Confirmed not for public release.

| Path | Was at | Notes |
|---|---|---|
| `kb/funding/budget-tool.mdx` | `/kb/funding/budget-tool` | Rate-dependent calculator. Cites an April 2025 rate and 2023–2024 salary bands. Not in nav; linked only from budget-justifications. |
| `kb/funding/budget-justifications.mdx` | `/kb/funding/budget-justifications` | Prose companion to the budget tool. Not in nav; linked only from budget-tool. The two referenced each other and nothing else. |
| `training/study-classifier.mdx` | `/training/study-classifier` | Self-contained, no script. Not in nav and **linked from zero pages** — reachable only by direct URL. |

Assets moved with them:

| Path | Belonged to |
|---|---|
| `public/budget-tool-script.js` (305 KB) | budget-tool |
| `public/budget-tool-script.js.bak` | budget-tool (was untracked in git) |
| `public/cim-rates.csv`, `public/lab-rates.csv` | loaded at runtime by budget-tool-script.js |
| `public/budget-template.xlsx`, `public/downloads/budget-template.xlsx` | budget-tool |
| `public/kb-intake-script-v1-archive.js` (81 KB) | superseded by `roadmap-script.js` (My Study Roadmap) |

Redirects: budget-tool → budgets-contracts, budget-justifications → funding-applications.
`/training/study-classifier` → `/my-roadmap` already existed and was left as-is.

**Live tools remaining:** My Study Roadmap, Is It Research?, Recruitment Realism Calculator — all three in navigation.
