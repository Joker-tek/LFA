# AGENTS.md

Instructions for AI coding agents (Claude Code, Codex, Cursor, Copilot and others) working in this repo.

## The project

**Sorsfonál** (repo: LFA) is a proof-of-concept dating app built around the legend of the red thread of fate. It's a static site of plain HTML, CSS and JavaScript, opened straight from disk. The interface is in Hungarian.

- [docs/architecture.md](docs/architecture.md): how a page loads, what each part of `script.js` does, the stored data, and a glossary of the Hungarian names
- [docs/red-thread.md](docs/red-thread.md): the matching algorithm in `fonal()`
- [CONTRIBUTING.md](CONTRIBUTING.md): workflow and the manual test checklist

## Hard rules

- **No build step and no dependencies.** Don't add `package.json`, npm packages, frameworks, bundlers or a backend.
- **It has to work over `file://`.** People open `index.html` by double-clicking it. So don't use ES modules (`type="module"`) and don't `fetch()` local files: browsers block both on `file://`.
- **Save data only through `load()` and `save()`,** with keys that start with `sf_`. Settings → "delete all data" depends on that prefix.
- **Escape text before inserting it as HTML.** Use `esc()` on any profile or user text before it goes into `innerHTML`.
- **The interface stays in Hungarian.** Docs are in English, and the README is bilingual (English plus a Hungarian section).
- **Profiles are made up.** Don't add real people, real photos, real payments, analytics or tracking.
- **No new third-party resources.** Google Fonts is the only one. Ask before adding a CDN or an external script.
- **Respect user settings.** New animations must honour `prefers-reduced-motion` and the `fx` setting, and new sounds must go through `sfx()`, which honours the sound settings.

## Where changes go

- Logic shared by pages → `script.js`. Logic for one page → that page's inline `<script>`.
- Styles → `style.css`, using the theme variables (`--bg`, `--ink`, `--red` and so on), so the dark and light themes both work.
- **New page:** copy the `<head>` and header of an existing page. Add the page to the menu list in `script.js`'s `DOMContentLoaded` handler, and to the pages table in the README (both languages).
- **New profile question:** add it to `profil.html`, the `PEOPLE` entries and `MINTA`. If it should affect matching, also score it in `fonal()` and document it in `docs/red-thread.md`.
- **Changed `fonal()` weights:** update the table in `docs/red-thread.md`.

## Code style

- Match the compact style of the code around your change: short names, few blank lines, one-space indentation inside functions.
- Identifiers and comments are in Hungarian. Keep to that in existing files, and check the glossary in `docs/architecture.md`.
- Don't reformat, re-indent or rename code you aren't otherwise changing.

## Checking your work

There are no automated tests. Go through the manual checklist in [CONTRIBUTING.md](CONTRIBUTING.md#test-checklist), and make sure the browser console shows no errors.

## Git

- Work on a branch, not `main`. Keep commits small, with imperative subject lines ("Add …", "Fix …").
- Only commit or push when asked.
