# RI-MUHC Clinical Research Hub

Documentation site for clinical research at the Research Institute of the McGill University Health Centre — role-based orientation, the Knowledge Base, Clinical Research SOPs, training requirements, Centre for Innovative Medicine guidance, and application guides (Nagano, TalentLMS, REDCap, and others).

Built with [Mintlify](https://mintlify.com). Content is Markdown/MDX; navigation and branding are defined in `docs.json`.

## Development

Install the [Mintlify CLI](https://www.npmjs.com/package/mint):

```
npm i -g mint
```

Run from the folder containing `docs.json`:

```
mint dev
```

Preview at `http://localhost:3333` (see `.claude/launch.json`).

## Publishing

Changes deploy automatically to production when pushed to `main`, via the Mintlify GitHub app.

## Structure

- `roles/`, `kb/`, `sops/`, `training/`, `cim/`, `apps/` — content by section
- `docs.json` — navigation, theme, and site settings
- `custom.css` — brand styling (Barlow / Barlow Condensed, self-hosted in `fonts/`)
- `public/` — interactive tool scripts and downloadable resources
- `images/`, `logo/` — media assets
