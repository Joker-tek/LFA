# Contributing

Thanks for helping with Sorsfonál! It's a small proof of concept, so you can start right away.

## Run it

```bash
git clone https://github.com/Joker-tek/LFA.git
```

Open `index.html` in your browser. That's it: there's nothing to install or build. (A local server such as `python -m http.server 8000` also works, but you don't need one.)

To start from a clean slate, open a private window, or go to **Beállítások → delete all data**.

## Workflow

1. Create a branch from `main`, for example `feature/chat-photos` or `fix/card-swipe`.
2. Make your change. See the [guidelines](#guidelines) below.
3. Go through the [test checklist](#test-checklist).
4. Open a pull request, fill in the template, and add a screenshot if the change is visible.

Commit messages should start with an imperative verb and fit on one line: `Add photo upload to chat`, `Fix like counter after reset`.

## Guidelines

- **Keep it build-free.** Use plain HTML, CSS and JavaScript with no npm packages, frameworks or backend. The site has to keep working when it's opened with a double-click (`file://`), so don't use ES modules or `fetch()` local files.
- **Shared logic** goes in `script.js`. **Logic for one page** goes in that page's inline `<script>`. **Styles** go in `style.css` and use the theme variables, so both dark and light mode work.
- **Save data** with `load()` and `save()`, under keys that start with `sf_`.
- **Escape text** with `esc()` before putting it into `innerHTML`.
- **The interface is in Hungarian.** Docs are in English. When you add or change a page, update the README pages table in both languages.
- **Changed the matching?** Update [docs/red-thread.md](docs/red-thread.md).
- **Match the existing code style,** and don't reformat code you aren't otherwise changing.

The details are in [docs/architecture.md](docs/architecture.md).

## Test checklist

There are no automated tests yet, so check these by hand in the browser:

- [ ] On a fresh start, the intro appears. **„Kipróbálom minta profillal”** fills in the sample profile, and the cards show a thread %.
- [ ] Cards can be swiped and tapped. Likes show up on `likeok.html`.
- [ ] Liking someone who already liked you (for example Anna, Réka, Márk, Eszter or Gergő) opens the match screen. **„Írok neki”** opens the chat, the icebreakers show, and a scripted reply arrives.
- [ ] Settings save. **„Ismerkedés újraindítása”** brings all the profiles back.
- [ ] It looks right in both the **dark** and **light** themes.
- [ ] It works at **phone width** (around 375 px).
- [ ] The browser console shows **no errors**.

## Reporting bugs and ideas

Use the issue templates under **Issues → New issue**. For a bug, say which page it happened on, what you did, and which browser you used.
