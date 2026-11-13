# Architecture

Sorsfonál is a static website with several pages. Each page is its own HTML file. They all share one stylesheet (`style.css`) and one script (`script.js`). There is no framework, no module system, no build step and no backend. The site has to keep working when `index.html` is opened straight from disk (`file://`).

## How a page loads

1. The `<head>` loads the Google Fonts, `style.css` and `script.js`.
2. `script.js` runs straight away. It applies the saved theme before anything is drawn, so the page doesn't flash the wrong colours. Then it defines the shared helpers and data as globals.
3. On `DOMContentLoaded`, `script.js`:
   - builds the menu inside `<nav>`, with badges for pending likes and unread messages,
   - adds the ad placeholders (side rails and a bar inside `.wrap`),
   - adds the glow that follows the cursor.
4. The page's own inline `<script>` at the end of `<body>` uses those helpers to draw its content.

```text
page.html ──loads──▶ style.css
          ──loads──▶ script.js  (theme, helpers, PEOPLE, fonal(), menu)
          ──runs───▶ inline <script>  (this page's logic)
                         │
                         ▼
                    localStorage  (sf_* keys)
```

## What's in `script.js`

| Section | Names | What it does |
|---|---|---|
| Storage | `load(k, d)`, `save(k, v)` | Read and write JSON in `localStorage`. If something fails, `load` returns the default `d`. |
| Theme | `SET()`, `applyTheme()` | Read the settings and set `data-theme` on `<html>`. `auto` follows the system setting. |
| Safety | `esc(s)` | Escapes text before it goes into `innerHTML`. |
| Profiles | `PEOPLE` | The made-up profiles. They use the same keys as the fields in `profil.html`. |
| Likes | `liked()`, `passed()`, `addLike()`, `addPass()`, `pending()`, `used()`, `cap()`, `prem()` | Who you liked or passed on, and the daily like limit (100 a day, unlimited with test Premium). |
| Red thread | `sajat()`, `fonal(p, m)`, `fonalSzo(n)`, `fonalJel(f)` | Your profile, the compatibility score, the level's name, and the thread badge. See [red-thread.md](red-thread.md). |
| Sample profile | `MINTA`, `mintaProfil()` | Fills in a ready-made profile so you can try the app straight away. |
| Matches & messages | `egyezesek()`, `beszelgetes(n)`, `uzen(n, m)`, `olvasatlan(n)`, `olvasva(n)`, `ujUzenet()` | Matches, conversations and unread counts. |
| Sound | `sfx(type)` | Short tones made with the Web Audio API: `yes`, `no`, `match`, `msg`, `click`. |
| Effects | `burst(x, y, kind)` | Bursts of hearts and sparks. They're skipped when the user prefers reduced motion or has turned effects off. |
| Match overlay | `match(p)` | The "Összekötött a fonal!" ("The thread connected you!") dialog, with the animated thread. |
| Startup | `DOMContentLoaded` handler | Menu, ads, cursor glow. |

A profile is identified by its name (`nev`), so every name in `PEOPLE` must be unique.

## Stored data

Everything lives in the browser's `localStorage`, under keys that start with `sf_`. **Beállítások → delete all data** removes every `sf_` key, so any new key must use the same prefix.

| Key | What's in it |
|---|---|
| `sf_profile` | Your profile, using the same keys as the fields in `profil.html` |
| `sf_photo` | Your profile photo as a JPEG data URL |
| `sf_set` | Settings: `theme`, `sound`, `vol`, `fx`, `show`, `min`, `max`, `km`, `hideDist`, `vis`, plus the notification switches `nm`, `nl` and `nn` |
| `sf_liked` | Names of the profiles you liked |
| `sf_passed` | Names of the profiles you passed on |
| `sf_likes` | Today's like count, as `{day, n}` |
| `sf_premium` | Whether test Premium is on |
| `sf_napi` | The thread of the day, as `{day, nev}` |
| `sf_chat` | Conversations, as `{name: [messages]}`. Messages you sent have `en: true`. |
| `sf_seen` | How many replies you've read in each conversation |
| `sf_intro` | Whether the intro has already been shown |

## Theming

The colours are CSS custom properties on `:root`. Dark is the default, and `:root[data-theme=light]` overrides them for the light theme. Use these variables in new styles rather than fixed colours, so both themes keep working.

| Variable | Use |
|---|---|
| `--bg`, `--panel`, `--line` | Page background, cards, borders |
| `--red`, `--red2`, `--deep` | Red thread accents |
| `--gold` | Highlights and the focus outline |
| `--ink`, `--muted` | Main text and secondary text |
| `--head`, `--body` | Heading font (Cormorant Garamond) and body font (Figtree) |

## Glossary

The code uses Hungarian names. These are the common ones:

| Hungarian | English |
|---|---|
| fonal / szál | thread / strand |
| sajat | your own (profile) |
| nev, kor, km | name, age, distance |
| keresem | what you're looking for |
| gyerek | children |
| hobbik, zene, hetvege | hobbies, music, weekends |
| ital, konyha, etrend | drinks, cuisine, diet |
| szeretet | love language |
| alvas, idojaras | sleep habits, favourite season |
| dohany, alkohol | smoking, alcohol |
| kizaro | deal-breakers ("Ami nálam kizáró ok") |
| lajkolt | has already liked you |
| egyezes | match |
| uzenet, beszelgetes | message, conversation |
| valaszok | scripted replies |
| sz, gond, tilt | shared strands, weak spots, deal-breaker hits |
| napi | daily |
| minta | sample |
