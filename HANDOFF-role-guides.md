# Task — assess the investigator role guides: too much?

**Repo:** `~/Desktop/docs` — the RI-MUHC Clinical Research Hub (Mintlify).
Start by reading `README.md`, then `PUSH-CHECKLIST.md` and `deprecated/README.md` for
recent context.

**Read-only task. Propose, don't edit.**

---

## Context

The Hub is in pilot, launching **January 2027**, currently mid-migration from Mintlify to
Grav. Audience is PIs and research staff. It will be **publicly visible** and is also meant
to present The Institute well to outsiders.

We are scoping a minimum viable product and have been cutting what's too much for phase 1.
Already removed (see `deprecated/README.md`): the Learning Lab, the CTMS page, the whole
"For CIM Staff" section, the budget tool, and the study classifier.

The site is **151 pages / 275,000 words**, of which the Knowledge Base alone is
**71 pages / 133,000 words**. SME review has to happen between now and launch. That
pressure is the reason for this assessment.

---

## The pages to assess

| File | Words | Role |
|---|---|---|
| `roles/investigator.mdx` | 3,214 | Orientation / entry point for PIs |
| `roles/pi-guide.mdx` | 4,488 | Interventional — Levels I–III |
| `roles/pi-guide-iv.mdx` | — | Observational — Level IV |
| `roles/pi-guide-v.mdx` | — | Retrospective — Level V |

Four pages for one role.

## The two questions

### 1. Do these duplicate the Knowledge Base?

`kb/` already explains much of this territory in depth. Are the role guides restating KB
content, or genuinely adding something — sequencing, role framing, "what you personally are
accountable for" — that the KB can't provide?

**Answer with specific examples**, not an impression. Name the guide section and the KB page
that covers the same ground.

### 2. Do the level splits help or overwhelm?

The argument cuts both ways, and both sides are real:

- **For splitting:** someone running a retrospective chart review should not have to wade
  through investigational product, monitoring and safety-reporting content that will never
  apply. Serving them Level V only is a kindness.
- **Against:** four investigator pages may just be confusing. People may not know their
  level when they arrive. And it triples the maintenance and SME-review burden.

Relevant existing machinery:
- `training/compliance-requirements.mdx` defines Levels I–V and has a decision tree
- `my-roadmap.mdx` already personalises guidance by study type (this is a live interactive
  tool, and is linked from the homepage)
- `is-it-research.mdx` is the front-door screening tool

Consider whether personalisation should live in the tools rather than in duplicated pages.

## Also look at, but assess second

The same pattern exists for other roles:
- Coordinator: `roles/coordinator.mdx` + `crc-guide.mdx` + `crc-guide-iv.mdx` + `crc-guide-v.mdx`
- Nurse: `roles/nurse.mdx` + `nurse-guide.mdx`

Ten pages for three roles. If a better structure emerges for investigators, check whether it
generalises — but assess the investigator set first and on its own merits.

---

## What to come back with

1. Whether the guides duplicate the KB — with specific file-and-section examples
2. Whether the level splits are load-bearing or cosmetic
3. A recommendation: **keep as-is / consolidate / restructure** — and if restructure, what shape
4. Rough edit cost. These pages are heavily cross-linked; check inbound links before
   estimating (see the scan recipe below)

**"Leave it alone" is a valid answer.** Say so plainly if that's the conclusion.

---

## Ground rules

- **Read-only.** No edits without discussing first.
- Writing standards: no AI slop, no overstatement, no triplet rhetoric, no invented
  enthusiasm. Professional and grounded. Say when something is uncertain.
- `deprecated/` is excluded from the build via `.mintignore` — **ignore it when scanning.**
- Don't trust the file system for what's live: a page can exist on disk and be absent from
  navigation. Always check `docs.json`. (This caught me out earlier — `budget-tool` and
  `study-classifier` were built and publicly reachable but in no menu.)

## Useful commands

```bash
cd ~/Desktop/docs
mint dev                          # preview at localhost:3333 (config in .claude/launch.json)
cat PUSH-CHECKLIST.md             # open items and known issues
cat deprecated/README.md          # what's been cut and why
```

Check whether a page is actually in the navigation:

```bash
python3 -c "
import json; d=json.load(open('docs.json')); s=json.dumps(d['navigation'])
for p in ['roles/investigator','roles/pi-guide','roles/pi-guide-iv','roles/pi-guide-v']:
    print(f'{p:26}', 'IN NAV' if p in s else 'not in nav')"
```

Count inbound links to a page before estimating edit cost:

```bash
grep -rn "/roles/pi-guide" --include=*.mdx . | grep -v "^./deprecated/"
```
