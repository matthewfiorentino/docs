# Port package — Mintlify → Grav/Helios

**For a fresh Claude session on the Windows box.** Everything you need is in this file or in
`_port/`. You have no prior context; do not assume any.

Generated 2 September 2026 against commit `ecf011b`. If `git log -1` shows something newer,
regenerate the `_port/` data files (§7) before trusting the numbers below.

---

## 1. Your job

Build and prove the migration **locally on this machine**. You are not touching the
institution's server, and you will not have access to it.

The deliverable is a working local Grav site — real content, real navigation, real redirects,
real theme — plus the scripts that produced it. That gets handed to IT as a proven artifact
rather than a request to experiment on their platform.

Order of work is in §8. Read §5 first; three unknowns gate part of the work.

---

## 2. What this is

The **RI-MUHC Clinical Research Hub** — the operational reference for clinical research at
the Research Institute of the McGill University Health Centre. Audience is Principal
Investigators and research staff. **Publicly visible**, and also meant to present The
Institute well to outsiders.

- **Launching January 2027.** In pilot now.
- Mintlify was rejected by IT over **US hosting and Quebec privacy law**. Grav is the
  replacement, self-hosted by the institution.
- IT has built a Grav test environment and holds a licence for the **Helios** premium theme.
- The environment is VPN-only, changes go through Jira, and custom JS needs IT review.
- Site owner is Matthew Fiorentino (Research Facilitator). Much of the content is his own
  earlier work — a convention in the repo proves a past decision was made, not that it was right.

---

## 3. Source repo — verified, not remembered

Repo: `https://github.com/matthewfiorentino/docs` · branch `main` · deploys to Mintlify on push.

| | Count |
|---|---|
| Pages (`.mdx`, excluding `deprecated/` and `fr/`) | **144** |
| Words | **290,260** |
| Redirects in `docs.json` | **200** |
| MDX component instances | **~3,771** |
| `custom.css` | 4,403 lines / 209 KB |
| Images | 81 files / 32 MB |
| Fonts (self-hosted) | 20 × `.woff2` |
| Interactive tool scripts | `public/roadmap-script.js` 66 KB, `public/recruitment-calc-script.js` 12 KB |
| Site-wide JS | `toc-fix.js` 8 KB, `cookie-consent.js` 4 KB, `flag-override.js` 3 KB |

Content by section:

| Section | Pages | Words | Migrate? |
|---|---|---|---|
| `kb/` | 69 | 141,269 | Yes — the core |
| `sops/` | 35 | 80,205 | Yes, but **never reword** — QA owns this text |
| `apps/` | 19 | 19,466 | Yes |
| `roles/` | 10 | 31,423 | Yes |
| `training/` | 4 | 5,870 | Yes |
| `cim/` | 2 | 3,593 | Yes |
| `deprecated/` | — | — | **No.** Excluded from the build via `.mintignore` |
| `fr/` | 1 | — | Stub only. See §6 on French. |

**Do not trust the filesystem for what is live.** `docs.json` is the only authority. Pages
have existed on disk, been publicly reachable, and been in no menu.

---

## 4. Target — what is settled

- **Grav 2.0** (stable since June 2026) with the **Helios** theme — Tailwind CSS 4 + Alpine.js.
- Helios is what `learn.getgrav.org` itself runs, so it is proven at this scale.
- Content becomes **folder-per-page**: `user/pages/<NN>.<slug>/default.md`, with numeric
  prefixes carrying navigation order.
- Components become **shortcodes**, not JSX.
- Styling is **`helios.yaml` config first**, hand-written CSS second.

### Decided, and worth not relitigating

**Do not try to port `custom.css`.** It is written against Mintlify's DOM; Helios renders
entirely different markup. Worse, Tailwind 4 emits its own CSS inside
`@layer theme, base, components, utilities`, and unlayered author CSS beats every layer
unconditionally — so the generic `h1` / `p` / `table` / `a` rules would silently override
Helios's whole base layer while the Mintlify-specific selectors match nothing. `!important`
makes it worse, not better (an unlayered `!important` is the *weakest* important declaration).

Read the old stylesheet for **intent** — the brand tokens — and then leave it behind:

| RI-MUHC token | Where it goes in Helios |
|---|---|
| Navy `#2b2666` | `helios.yaml` → `colors.primary` |
| Coral `#ff537f` | `helios.yaml` → `colors.accent` |
| Barlow / Barlow Condensed | `@font-face` in the theme + override `--helios-font-body` |
| Straight edges, no border-radius | Custom CSS in `@layer components` |
| Sidebar / content / TOC widths | `helios.yaml` → `navigation.*_width` |

**Use `copy`, not theme inheritance.** Helios's own docs say so verbatim: *"select `copy` and
choose Helios as the theme to copy."* This contradicts Grav's core docs, which prefer
inheritance — but Trilby Media wrote both, and for a Tailwind theme `copy` is right, because
an inherited child cannot see the parent's templates and would compile a stylesheet missing
nearly every class Helios uses. Command: `bin/plugin devtools new-theme`.

---

## 5. Three unknowns that gate the work

**Ask Matthew for these. Do not guess, and do not block on them — §8 sequences around them.**

1. **Which Grav version is IT running, and Admin Classic or Admin Next?** Changes the whole
   permission model and determines whether the free Tailwind4 plugin (admin-button CSS
   compilation, no Node) is available. It needs Grav 2.0 + PHP 8.2+.
2. **One site or a multisite?** Determines whether theme config is genuinely shared.
3. **How does content get in — filesystem, git, or admin UI only?** There is **no bulk import
   tool in Grav**. If the answer is "admin UI," the plan changes fundamentally.

Two more that cost money and should be raised early:

- **Search.** Helios supports exactly two providers. Free SimpleSearch has no index and is
  documented for "small to medium" sites — 290,000 words is not that. **YetiSearch Pro is
  $75** and is what the official Helios demo runs. Build locally with SimpleSearch; flag the
  cost.
- **Helios i18n is undocumented.** No mention of a language switcher or translated UI chrome
  anywhere in the Helios docs. Everything gets translated to French after content lock, so
  this needs an answer from Trilby Media. **Unverified — do not assume it works.**

---

## 6. Windows setup — the traps that actually bite

### Git line endings — do this before anything else

```
git config core.autocrlf input
git config core.longpaths true
```

Without the first, every file you touch gets CRLF and the next diff is 145 files of pure
noise. Without the second, Grav's folder-per-page nesting on top of paths like
`kb/conduct/data-documentation/` will exceed Windows' 260-character limit and git will fail
in confusing ways.

### PHP

Grav 2.0 requires **PHP 8.3.11+**. If you lack admin rights, use the portable zip from
`windows.php.net` — no installer needed.

**The Windows-specific gotcha:** extensions ship as DLLs that are *commented out* by default.
Copy `php.ini-development` to `php.ini` and uncomment at minimum:

```
extension=curl
extension=gd
extension=mbstring
extension=openssl
extension=zip
extension=intl
extension=fileinfo
```

Grav will fail with unhelpful errors if these are missing. Verify with `php -m`.

### Running it

```
php -S localhost:8000 system/router.php
```

`bin/grav server` does not exist in the Grav 2.0 CLI. And `bin/grav sandbox` is **not** a
preview sandbox — it creates a symlinked copy of an install, and symlinks on Windows need
developer mode or admin rights. Avoid it.

### Local dev config

Put this in `user/config/system.yaml` or it will look like your edits aren't taking:

```yaml
cache:
  enabled: false
twig:
  cache: false
  auto_reload: true
  debug: true
```

### Node, for the Tailwind build

Needed for `npm run dev` in the theme folder. **Without a watcher running, CSS edits change
nothing** — Helios serves one compiled file, `build/css/site.css`. This is the single most
common "my CSS isn't loading" cause.

### Write the migration scripts in Python, not bash

They have to run here and be re-runnable elsewhere. Python 3 is already a dependency of
nothing in this repo, so pin nothing exotic.

---

## 7. Pre-computed data — in `_port/`

Generated from `docs.json`. **Regenerate if the repo has moved on.**

| File | What it is |
|---|---|
| `build_nav_map.py` | The generator. Re-run it after any `docs.json` change. |
| `nav-order.json` | **The most valuable file here.** All 144 pages in navigation order, each with its computed `grav_folder` and the `url` it must keep. |
| `redirects.json` | All 200 redirects as source/destination pairs. |
| `redirects.site.yaml` | The same, pre-formatted for `user/config/site.yaml` with `[301]` codes. Review before use — families of redirects should collapse into regex rules. |
| `component-census.json` | Every MDX component, total counts plus per-file breakdown across 144 files. Drives the conversion work. |
| `not-in-page-tree.json` | Pages on disk but outside the nav tree. Currently just `contacts`, linked from the navbar and footer. |

### The strategy the map encodes, and why

**This is the riskiest step in the migration.** Mintlify keeps page order in `docs.json`;
Grav keeps it in numeric folder prefixes. Get a prefix wrong and the page *vanishes from the
sidebar while still resolving by URL* — a silent failure, 144 times over.

There were two ways to lay this out, and the choice is already made:

- **Mirror the Mintlify file path**, taking prefixes from nav order. Grav strips `NN.` from
  URLs, so `user/pages/06.kb/02.foundations/05.glossary/` serves at `/kb/foundations/glossary`.
  **All 144 URLs are preserved and the existing 200 redirects stay valid.** ✅ **This is what
  `nav-order.json` contains.**
- Mirror the *nav shape* instead. The sidebar would match exactly — but it **changes all 144
  URLs**, invalidating every redirect and every inbound link. Rejected.

**The one trade-off, and it is small.** Four pages sit under a Mintlify group `root`, so
mirroring file paths makes them siblings of their parent rather than children of it:

| Page | Currently nested under |
|---|---|
| `roles/pi-guide` | Investigator (`roles/investigator`) |
| `roles/pi-guide-iv-v` | Investigator |
| `roles/crc-guide` | Coordinator (`roles/coordinator`) |
| `roles/crc-guide-iv-v` | Coordinator |

Nesting them in Grav restores the sidebar shape but changes those four URLs, so each would
need a redirect. **Four pages, four redirects — ask Matthew which he prefers.** Don't decide
it silently.

One structural quirk the generator already handles: the **Applications tab uses a `menu`
structure, not `groups`**. A naive walk of `docs.json` misses all 19 `apps/` pages.

---

## 8. The work, in order

**1. Stand up Grav + Helios locally.** Prebuilt install zips are in the licence manager at
`licenses.getgrav.org`. Get the key from Matthew — the Grav Premium licence explicitly permits
development and staging copies alongside the one production site. Confirm the plugin set with
IT so local matches theirs.

**2. Write the import script.** `.mdx` → `user/pages/<NN>.<slug>/default.md`, driven by
`_port/nav-order.json`. Frontmatter mapping:

| Mintlify | Grav |
|---|---|
| `title` | `title:` — direct |
| `sidebarTitle` | `menu:` — direct |
| `description` | **nested** under `metadata:` |
| `keywords` (array) | **nested** under `metadata:`, joined into a comma-separated string |
| hidden page | `visible: false` — off the nav, still reachable by URL |
| — | `template:` — selects the Helios layout, likely needed per page |

**3. Convert components.** Work from `component-census.json`, highest count first:

| Mintlify | Count | Helios target |
|---|---|---|
| `<Tooltip>` | 1,177 | Helios tooltip shortcode — **by far the biggest job** |
| `<Accordion>` / `<AccordionGroup>` | 812 | `[doc-details]` |
| `<Step>` / `<Steps>` | 452 | `[doc-steps]` / `[doc-step]` |
| `<Card>` / `<CardGroup>` | 432 | `[doc-card]` / `[doc-grid]` |
| `<Note>` `<Warning>` `<Info>` `<Tip>` | 547 | GitHub alert syntax — `> [!NOTE]` |
| `<Badge>` | 224 | Helios badge shortcode |
| `<Tree>` | 36 | `[doc-file-tree]` |
| `<Tab>` / `<Tabs>` | 49 | `[doc-tabs]` |
| `<Frame>` | 17 | **No equivalent.** Decide: plain image, or a custom shortcode |
| `<Icon>` | 10 | SVG Icons plugin — ships free with Helios |
| `<Update>` | 5 | No equivalent |
| `<Columns>` | 2 | Shortcode Core `[columns]` |
| `<RcCallout>` | 2 | Custom — inspect and decide |
| Tool mounts | 6 | See step 6 |

Requires the **Shortcode Core** plugin, which Helios depends on anyway.

**4. Redirects.** Load `_port/redirects.site.yaml` into `user/config/site.yaml`. Grav supports
regex, so collapse families rather than shipping 200 literals. Do not hand-transcribe.

**5. Verify the render.** This is the point of working locally. Check sidebar behaviour at 144
pages, that ordering came out right, that the TOC holds on the 6,000-word pages, that
`sops/` tables survived. Compare against the live Mintlify site.

**6. The interactive tools — last, and budget properly.** Grav is PHP and Twig; there is no
React runtime. The documented pattern is to build a bundle and load it via the Asset Manager,
with a shortcode providing the mount point. Three tools: My Study Roadmap (66 KB), Is It
Research?, and the Recruitment Realism Calculator.

**Important and useful:** Grav 2.0.20 **removed** page-content script registration entirely
for security reasons. So these must live in the theme or a plugin, under version control —
which is exactly the arrangement IT will want, and is the strongest answer to their JS review.
Do not reach for the Custom JS plugin (third-party, 2 commits) or reintroduce per-page script
injection.

**7. Mermaid.** 34 pages use it. No official plugin; the community one is pinned to Mermaid
10.8.0 (current is 11.x) and its README says it is *"maintained lazily."* Setting
`fenced_code_blocks: true` migrates the existing ` ```mermaid ` fences unchanged, but you
inherit a fork. Flag it; don't solve it silently.

---

## 9. Rules

- **Never reword `sops/*.mdx`.** They reproduce controlled documents QA owns, and are being
  replaced with current versions around Christmas. Structural conversion only. Contradictions
  found there get *flagged*, not fixed.
- **`docs.json` is the authority on what is live**, not the filesystem.
- **Scan `public/*.js` too**, not just `.mdx`. `roadmap-script.js` holds user-facing prose and
  has been missed by `.mdx`-only sweeps before.
- **Never commit `user/data/` or `user/accounts/`.** `user/data/licenses.yaml` holds the
  Helios licence key in plaintext; `user/accounts/` holds password hashes.
- **The Helios theme source cannot go in a repo readable outside the licence scope.** Under a
  Standard licence that scope is one individual.
- **House conventions:** always "the RI-MUHC" (with the article) and "The Institute" (capital
  *The*). Straight edges — no border-radius on content. No thin accent strips on cards.
- **Writing standards:** no overstatement, no triplet rhetoric, no invented enthusiasm. Say
  when something is uncertain.

## 10. Do not

- Do not touch IT's environment. This is local work.
- Do not import `custom.css`. See §4.
- Do not enable Twig-in-content. It has the worst security history in the platform and buys
  nothing for a documentation site.
- Do not assume the three tools are "just a script tag."
- Do not treat this package's numbers as current without checking `git log -1` against
  `ecf011b`.

---

## Regenerating `_port/`

```
python3 _port/build_nav_map.py
```

It reads `docs.json`, walks `navigation.languages[].tabs[]` handling `groups`, `pages` and
`menu` structures, then assigns `NN.` prefixes from sibling order within each parent folder.
Run it from the repo root after any navigation change.

## Reference

| File | What it holds |
|---|---|
| `PROJECT_CONTEXT.md` | Fullest primer — **stale in places**, says `custom.css` is ~2,450 lines when it is 4,403 |
| `PUSH-CHECKLIST.md` | Open questions and known contradictions |
| `deprecated/README.md` | What was cut for the MVP and why |
| `HANDOFF-site-review.md` | The site-review brief (content quality, separate from this port) |
| `README.md` | Stack and structure |
