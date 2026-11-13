<div align="center">

<img src="docs/assets/banner.svg" alt="Sorsfonál – a vörös fonal már kötődik hozzád" width="100%">

# LFA · Sorsfonál

**A dating app concept built around the legend of the red thread of fate.**

![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS](https://img.shields.io/badge/CSS-663399?logo=css&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)
![No build](https://img.shields.io/badge/build-none-B3122E)
![Dependencies](https://img.shields.io/badge/dependencies-0-B3122E)
![Status](https://img.shields.io/badge/status-proof%20of%20concept-D4B16A)
[![License: MIT](https://img.shields.io/badge/license-MIT-6E0B1D)](LICENSE)

[English](#english) · [Magyarul](#magyarul)

</div>

---

## English

### About

An old East Asian legend says an invisible red thread connects the people who are meant to meet. **Sorsfonál** ("thread of fate") turns that thread into the way people get matched. Every profile shows how strongly the thread ties you together, what you have in common, and where the thread might snap.

This is a proof of concept. It's plain HTML, CSS and JavaScript, with no server, no build step and no dependencies. Everything is saved in your own browser (`localStorage`), and every profile is made up. The app's interface is in Hungarian.

### Features

- 🧵 **Thread strength:** a 5–99% compatibility score calculated from your profile, in four levels from *thin strand* to *strong thread*.
- 🔗 **Shared strands and weak spots:** each card highlights what connects you, and warns you where the thread could break, including your own deal-breakers.
- ☀️ **Thread of the day:** one pick a day, the strongest thread you haven't decided on yet.
- 💞 **Swipeable cards:** drag or tap. When you both like each other, the red thread is drawn between your two profiles.
- 💬 **Messages:** your matches and chats, with icebreaker ideas based on what you share. The replies are scripted.
- 🎨 **Make it yours:** dark and light themes, sound and animations, all switchable in Settings.
- 💎 **Premium:** a plans page in test mode, with no real payments.

### Quick start

Nothing to install.

```bash
git clone https://github.com/Joker-tek/LFA.git
```

Then open `index.html` in your browser (double-click it). If you prefer a local server, run `python -m http.server 8000` in the folder and go to <http://localhost:8000>.

On your first visit, click **„Kipróbálom minta profillal”** ("Try it with a sample profile"). It fills in a sample profile so you can see the thread at work right away. To start over, go to **Beállítások → „Ismerkedés újraindítása”** (Settings → restart).

### Pages

| Page | What it does |
|---|---|
| `index.html` | Discover: swipeable cards sorted by thread strength, with the thread of the day first |
| `likeok.html` | Who liked you, and who you liked |
| `uzenetek.html` | Matches and conversations, with icebreaker ideas |
| `profil.html` | Your profile, which the thread is calculated from |
| `beallitasok.html` | Theme, sound, filters, privacy and reset |
| `premium.html` | Plans (test mode, no real payments) |
| `belepes.html`, `keresek.html` | Mock-ups of the login and "What are you looking for?" screens |
| `felfedezes.html` | Old link that redirects to `index.html` |

### Project structure

```text
LFA/
├── *.html              one file per page, with its own logic in an inline script
├── script.js           shared logic: storage, profiles, thread score, matches, sound, menu
├── style.css           all styles; theme colours are CSS variables
├── docs/
│   ├── architecture.md how the pages fit together, and what is stored
│   ├── red-thread.md   the matching algorithm and its weights
│   └── assets/         images for the docs
├── AGENTS.md           instructions for AI coding agents
├── CLAUDE.md           Claude Code entry point (loads AGENTS.md)
└── CONTRIBUTING.md     how to work on the project
```

### Documentation

- [Architecture](docs/architecture.md): how a page loads, what each part of `script.js` does, the stored data, theming, and a glossary of the Hungarian names used in the code.
- [How the red thread works](docs/red-thread.md): the scoring table, deal-breakers and levels.
- [Contributing](CONTRIBUTING.md): workflow, code style and the manual test checklist.
- [AGENTS.md](AGENTS.md): rules for AI coding agents working on this repo.

### Contributors

- [Joker-tek](https://github.com/Joker-tek): the app, its pages and design
- [BBQWarrior](https://github.com/BBQWarrior): red thread matching, messages, and the first README

### License

[MIT](LICENSE)

---

## Magyarul

### Mi ez?

Társkereső-koncepció a vörös fonal legendája köré: egy régi kelet-ázsiai legenda szerint láthatatlan vörös fonal köti össze azokat, akiknek találkozniuk kell. A Sorsfonál ezt a szálat keresi.

Sima HTML, CSS és JavaScript, szerver és build nélkül. Minden adat a böngésző `localStorage`-ában marad, a profilok kitalált példák.

### Kipróbálás

Nyisd meg az `index.html`-t a böngészőben, vagy indíts egy helyi szervert a mappában:

```bash
python -m http.server 8000
```

aztán: <http://localhost:8000>. Első látogatáskor a „Kipróbálom minta profillal” gomb kitölt egy minta profilt, így azonnal látszik, hogyan dolgozik a fonal. A Beállításokban az „Ismerkedés újraindítása” mindent visszaállít.

### Oldalak

| Oldal | Mit csinál |
|---|---|
| `index.html` | Ismerkedés: húzható kártyák, a fonal szerint sorba rendezve, elöl „A nap fonala” |
| `likeok.html` | Ki lájkolt téged, és kit lájkoltál te |
| `uzenetek.html` | Egyezések és beszélgetések, jégtörő ötletekkel a közös szálaitokból |
| `profil.html` | A saját profilod (ebből dolgozik a fonal) |
| `beallitasok.html` | Téma, hang, szűrők, adatvédelem |
| `premium.html` | Csomagok (teszt mód, nincs valódi fizetés) |
| `belepes.html`, `keresek.html` | Belépés és „Mit keresel?” minták |

### A fonal

A vörös fonal nem csak díszítés, hanem ez dönti el, kit mutat az oldal:

- **Fonal-erősség.** A te profilod és a másik válaszai alapján (mit kerestek, gyerekek, hobbik, zene, hétvégék, italok, konyhák, humor, szeretetnyelv, alvás, évszak, dohányzás, alkohol, étrend) 5–99% közötti érték, négy fokozattal: vékony szál, laza szál, szoros szál, erős fonal. Csak a kitöltött kérdések számítanak; üres profilnál nincs fonal.
- **Közös szálak és szakadások.** A kártyán kiemelve látszik, mi köt össze titeket, és figyelmeztetés jön, ahol a fonal szakadhat (például mást kerestek). A profil „Ami nálam kizáró ok” mezőjét is figyeli (dohányzás, alkohol, buli).
- **A nap fonala.** Naponta egy ajánlás: a legerősebb szál, amiről még nem döntöttél.
- **Egyezés.** Kölcsönös lájknál a vörös fonal kirajzolódik a két profil között, és meg is lehet írni a másikat.
- **Üzenetek.** Egyezések listája és beszélgetés. Az első üzenethez jégtörő ötleteket ad a közös szálakból; a válaszokat (mintaként) a gép írja.
- **Bemutatkozás.** Első látogatáskor a legenda és két út: profil kitöltése vagy minta profil.

A számítás a `script.js` `fonal()` függvényében van, a súlyok ott könnyen állíthatók. A kitalált profilok (`PEOPLE`) ugyanazokat a kulcsokat használják, mint a `profil.html` mezői. A részletes pontozás (angolul): [docs/red-thread.md](docs/red-thread.md).

### Licenc

[MIT](LICENSE)
