# Handoff — whole-site review of the Clinical Research Hub

**For a fresh chat. You have no prior context; everything you need is here or linked from here.**

**Repo:** `/Users/matthewfiorentino/Desktop/docs` — the RI-MUHC Clinical Research Hub,
a Mintlify documentation site. 145 pages, ~290,000 words.

**Your job, in order:**

1. **Read the whole site.** Not a sample. See §1.
2. **Interrogate the plan below.** It was drafted by another model that surveyed the repo
   structurally but did **not** read the content. You will know more than its author does.
   Argue with it. See §2.
3. **Expand it.** The scope in §5 is a floor, not a ceiling. See §2.
4. **Then execute**, once the user has agreed the revised plan.

Do not start executing before step 2. A wrong plan run efficiently is the expensive outcome here.

---

## 1. First: read the site

Read all of it before forming an opinion on the plan. That is roughly 400k tokens of prose —
use subagents to fan out if you need to, but the *findings* must come back to one context
that has seen the shape of the whole thing.

Reading the site is not the review. It is what qualifies you to redesign the review.

Orientation files, in this order:

| File | What it gives you | Trust |
|---|---|---|
| `README.md` | Stack, structure, how to run it | Current |
| `PROJECT_CONTEXT.md` | The fullest primer — design system, rules, gotchas | **Stale in places.** Says `custom.css` is ~2,450 lines; it is 4,403. Last verified 2026-05-15. Orientation, not fact. |
| `PUSH-CHECKLIST.md` | Open questions, known contradictions, recent changes | Current |
| `deprecated/README.md` | What was cut for the MVP and why | Current |
| `docs.json` | **The only authority on what is actually live** | Current |

Run it locally: `mint dev` (config in `.claude/launch.json`, port 3333). Install with
`npm i -g mint`. Deploys automatically from `main` via the Mintlify GitHub app — so nothing
you commit is private. Recent commits: `090a9ea`, `31884d3`.

### Context you cannot get from the files

- **Launching January 2027.** In pilot now, mid-migration from Mintlify to Grav.
- **Audience:** PIs and research staff. But it is **publicly visible**, and is also meant to
  present The Institute well to outsiders. Both audiences matter.
- **SME review is the bottleneck.** Every SME hour spent adjudicating a contradiction *we*
  introduced is an hour not spent on content only they can verify. That constraint drives
  everything below.
- **Recent large changes** you will see traces of: the Learning Lab, CTMS page, "For CIM
  Staff" section, budget tool and study classifier were all deprecated; the SOP Reader and
  Competency Assessment were merged into one TalentLMS course per level; role guides were
  restructured from 10 pages to 7. Check the restructure actually held.
- **Owner is Matthew Fiorentino**, Research Facilitator — the site's author. Much of what you
  are reviewing is his own earlier work. A comment or a convention in the repo proves a past
  decision was made, not that it was right.

---

## 2. Interrogating and expanding the plan

The plan in §4–§9 is a starting position. Two jobs.

### Interrogate it

Specific things worth attacking:

1. **Is the extraction schema right?** (§6) It is load-bearing. If `entity` is too coarse,
   contradictions will not group; too fine, and they will never collide. Propose better.
2. **Is Phase A too mechanical for a model?** If most of it is regex-able, say so and push it
   into Phase 0. That would be a large saving.
3. **Is `sops/` really out of scope for edits?** (§3) It is 28% of the corpus and being
   replaced at Christmas. Argue if you disagree.
4. **Is the style sample the right cut?** (§7) Or is there a better proxy for pages a public
   reader actually lands on?
5. **Is the priority order in §5 right?** It puts drift first and style last. Challenge it.

### Expand it

The five checks in §5 were chosen by someone who had not read the content. Having read it,
you will see problems that list does not name. **Add them.** Places worth looking that the
plan does not cover:

- **Coverage gaps** — what a PI or coordinator needs that simply is not there. Deprecation
  cut real content (see `deprecated/README.md`); some of it left holes that were never filled.
  The Learning Lab removal is the known one. Are there others?
- **Structural fit** — is the information architecture right? Does `kb/` at 69 pages and
  141,000 words have a shape a stranger can navigate, or has it grown by accretion?
- **The public reader** — the site is publicly visible and represents The Institute. Does it
  read that way, or does it read like an internal wiki that happens to be exposed?
- **Accessibility and plain language** — an unexamined dimension. 290,000 words of dense
  regulatory prose is a real barrier.
- **French** — everything will be translated after content lock. Is anything written in a way
  that will translate badly or expensively?
- **The interactive tools** — My Study Roadmap, Is It Research?, Recruitment Realism
  Calculator. Do they agree with the pages around them?
- **Whatever else the reading turns up.** If something is wrong that no category here
  anticipates, that is the most valuable finding in the review.

Come back with a revised plan and **say plainly what you changed and why**. If a part of the
original was simply wrong, say so — do not work around it politely.

---

## 3. Why this review exists

Not to polish prose. To:

1. Make the site **internally consistent**, so SMEs never referee the Hub against itself.
2. Produce a **question list routed by owner**, so SME review is a series of short specific
   asks rather than "please read 290,000 words."
3. Fix mechanical inconsistency that makes the site look unmaintained to a public reader.
4. Find what is **missing**, not only what is wrong.

Polish is fifth, and cheapest to do later.

---

## 4. Corpus

| Area | Pages | Words | In scope for edits? |
|---|---|---|---|
| `kb/` | 69 | 141,000 | Yes — the core |
| `sops/` | 35 | 80,500 | **No.** QA owns this text; being replaced ~Christmas. **Read-only source for contradiction checking.** |
| `apps/` | 19 | 19,500 | Yes |
| `roles/` | 10 | 31,400 | Yes — just restructured, so check it held |
| `training/`, `cim/`, root | 11 | 17,200 | Yes |
| `public/*.js` | 2 files | ~78 KB | **Yes — user-facing prose lives here.** See §8. |
| `deprecated/`, `fr/` | — | — | Excluded |

Excluding `sops/` from *editing* but keeping it as a *reference corpus* removes 28% of the
rewrite surface while keeping all of its value for finding drift.

## 5. What to check, ranked by what only a whole-site pass can find

| Priority | Check | Why it needs a site-wide pass |
|---|---|---|
| **1** | **Contradiction / drift** — the same fact stated differently on two pages | Invisible to page-level editing. This is the entire justification for the exercise. |
| **2** | **Unverifiable claims** — assertions no one on our side can confirm | Becomes the SME packet. Turns a vague "please review" into specific questions. |
| **3** | **Duplication and altitude** — role guides restating the KB | Drives maintenance cost, and is why drift keeps reappearing |
| **4** | **Mechanical consistency** — casing, terminology, frontmatter | Cheap, deterministic, makes the site look maintained |
| **5** | **Writing style / AI slop** | Real, but lowest risk and easiest to fix later. Sample, do not sweep. |

Add to this list — see §2.

**Already clean. Do not spend agents re-checking:** internal links all resolve (124 unique
targets, 0 broken); 144 pages on disk, 144 in nav, 0 orphans; all 145 pages have `title` and
`description`. Verify with `mint broken-links`, not with a model.

**Ignore `graphify-out/`.** It indexed the JavaScript, not the prose. Useless here.

## 6. Proposed architecture — extract wide, reconcile narrow

The plan turns on one idea: 290,000 words fits in no context, but the *checkable assertions*
inside it do.

**Phase 0 — deterministic checks, no model.** Shell and Python. Output feeds Phase A so
agents do not re-report known problems. Already found this way:

- `Research.facilitator@` (28) vs `research.facilitator@` (27); `EFVP@` (10) vs `efvp@` (13)
- "the Institute" (9) vs "The Institute" (24) outside `sops/` — house rule is capital *The*
- "healthcare" (14) vs "health care" (14); "study coordinator" (12) vs "Study Coordinator" (5)
- 10 distinct "N business days" claims and 12 distinct "N weeks" claims — confirm each is a
  genuinely different process, not one process described inconsistently

**Phase A — extraction (wide fan-out, cheap).** Each agent gets 3–5 pages and emits
**structured JSON only** — no prose, no opinions, no edits:

```json
{ "page": "kb/site-activation/isf.mdx", "line": 212,
  "entity": "record retention, sponsor-held",
  "claim": "25 years",
  "kind": "duration",
  "attributed_to": "ICH E6(R2) 5.5.11",
  "verifiable_internally": false,
  "owner_guess": "QA" }
```

Extract durations, counts, thresholds, money and rates, effective dates, contacts, system and
course names, and role assignments. Nothing else.

**Phase B — reconciliation (one context, narrow input).** One agent reads only the Phase A
JSON — 15–20k tokens instead of 400k — groups by `entity`, flags every group that disagrees
with itself. This is where drift is actually found, and it cannot be found in Phase A.

**Phase C — judgment (targeted).** Only on what Phase B flagged, plus a stratified sample:
the 10 highest-traffic pages, 5 random KB pages, everything changed since June 2026
(`git log --since`).

Sizing: Phase 0 free; Phase A ~40 agents × 3–5 pages ≈ one full read; Phase B 1–3 agents;
Phase C 10–15 agents with specific briefs. ~60 agent calls, with the expensive judgment work
last and aimed at a narrowed target.

## 7. Output contract

One appendable findings file, one JSON object per finding. Not prose reports — they cannot be
merged, sorted or filtered.

```json
{ "id": "DRIFT-001",
  "type": "contradiction | unverifiable | duplication | gap | mechanical | style",
  "severity": "blocker | should-fix | nice-to-have",
  "entity": "record retention, sponsor-held",
  "locations": [ {"file": "kb/site-activation/isf.mdx", "line": 212, "text": "25 years"},
                 {"file": "kb/conduct/data-documentation/data-integrity.mdx", "line": 88, "text": "15 years"} ],
  "owner": "QA",
  "proposed_action": "...",
  "confidence": "high | medium | low" }
```

`owner` routes the SME packet. Groups, derived from the contact addresses the site actually
uses: **QA** (71 mentions), **Research Facilitator** (55), **EFVP** (23), **REB** (17),
**Contracts** (9), **CIM**, **Training**, **HR**, **IT**, **CORD / BCU / Data Warehouse**, **EDI**.

Deliverables:

1. `_review/findings.json` — everything, machine-readable
2. `_review/sme-packet.md` — grouped by owner, as questions answerable without reading the site
3. `_review/style-rules.md` — the house rules enforced, so this does not drift again. The repo
   has **no `CLAUDE.md`**; this should become one.

## 8. Rules, each from an actual mistake on this project

- **Read-only. Propose, do not edit.** Nothing changes without discussing it first.
- **Never trust the filesystem for what is live — check `docs.json`.** `budget-tool` and
  `study-classifier` existed on disk, were publicly reachable, and were in no menu.
- **Scan `public/*.js`, not just `.mdx`.** `roadmap-script.js` (65 KB) is the live My Study
  Roadmap tool and holds user-facing prose. An `.mdx`-only scan missed it during the SOP
  rename and it nearly shipped wrong.
- **Do not reword `sops/*.mdx`.** Contradictions there are *flagged to QA*, not fixed.
- **You cannot verify external facts.** You cannot know whether REB turnaround is really 5
  business days. Never report an external claim as accurate or inaccurate — classify it as
  internally consistent, or contradicted, or route it to an owner. Say when uncertain.
- **Writing standards:** no overstatement, no triplet rhetoric, no invented enthusiasm, no
  AI slop. Grounded and professional.
- **House conventions:** always "the RI-MUHC" (with the article) and "The Institute" (capital
  *The*).

## 9. Anti-patterns

- **One agent per page doing "a general review."** 145 shallow uncorrelated reports and zero
  contradictions found, because no agent ever sees two pages that disagree. This is the
  default failure mode and the reason for the two-phase split.
- **Letting agents edit in parallel.** Merge chaos — there are no feature branches, all work
  is on `main`.
- **Sweeping style across all 145 pages.** Highest cost, lowest severity.
- **Re-checking links, nav and frontmatter.** Already clean; deterministic tools own it.
- **Accepting this plan as written.** See §2.
