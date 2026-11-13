# How the red thread works

The red thread is how Sorsfonál decides who to show you. It compares another person's profile with yours. The result orders the cards, picks the thread of the day, and supplies the icebreaker ideas in Messages.

All of it happens in `fonal(p, m)` in [`script.js`](../script.js):

- `p` is the other person (an entry in `PEOPLE`).
- `m` is your profile (`sf_profile`). If you leave it out, the saved profile is used.

It returns:

```js
{ pct, sz, gond, tilt }
// pct  – thread strength in percent (5–99), or null if there's nothing to compare
// sz   – shared strands: what connects you (shown as highlights on the card)
// gond – weak spots: where the thread may snap (each one costs 10%)
// tilt – deal-breaker hits from your "Ami nálam kizáró ok" field
```

## Only answered questions count

A question only counts if **both** of you answered it. If none of the questions can be compared, `pct` is `null` and no thread is shown. That's why an empty profile shows no thread, and why the sample profile exists.

## Scoring

Each question has a weight. The score is the points you earned, compared with the most points possible across the questions that count.

| Question | Key | Weight | Points |
|---|---|---:|---|
| Hobbies | `hobbik` | 20 | Full points with 3 or more in common, a share of the points with fewer |
| Looking for | `keresem` | 20 | Same answer: 20. Either says "Még nem tudom" (not sure yet): 10. Otherwise a **weak spot** |
| Children | `gyerek` | 12 | Both want children, or neither does: 12. One wants them and the other doesn't: **weak spot**. Anything else: 6 |
| Music | `zene` | 8 | Full points with 2 or more genres in common |
| Weekends | `hetvege` | 8 | Full points with 2 or more habits in common |
| Humour | `humor` | 6 | Full points with 2 or more in common |
| Love language | `szeretet` | 6 | Same answer |
| Smoking | `dohany` | 6 | Same answer: 6. Different: 3. You don't smoke and they smoke regularly: **weak spot** |
| Drinks | `ital` | 5 | Full points with 2 or more in common |
| Cuisine | `konyha` | 5 | Full points with 2 or more in common |
| Sleep | `alvas` | 4 | Same answer (other than "Vegyes", mixed): 4. Either says "Vegyes": 2 |
| Alcohol | `alkohol` | 3 | Same answer: 3. Different: 1.5. You don't drink and they drink often: **weak spot** |
| Diet | `etrend` | 3 | Same answer: 3. Different: 1.5 |
| Season | `idojaras` | 2 | Same favourite season |

The most points possible, when every question counts, is **108**.

## From points to a percentage

```text
pct = round(30 + 69 × points / max) − 10 × weak spots
if there are deal-breaker hits:  pct = min(pct, 25)
pct = clamp(pct, 5, 99)
```

Because the score starts from 30, having little in common doesn't drop it near zero on its own. Only weak spots and deal-breakers push it that low. It also never reaches 100: no thread is perfect.

## Deal-breakers

The free-text field **„Ami nálam kizáró ok”** ("my deal-breakers") is checked for keywords. Upper and lower case don't matter.

| If you wrote… | It's a hit when the other person… |
|---|---|
| `dohány`, `cigi`, `cigaret` | smokes at all |
| `alkohol`, `ivás`, `iszik`, `pia` | drinks often (`Gyakran`) |
| `buli` | parties at weekends |

Any hit caps the thread at **25%**. When something is already a deal-breaker, the matching weak spot isn't counted on top, so you aren't penalised twice for the same thing.

## Levels

| Strength | Level | Badge |
|---|---|---|
| 80–99% | **Erős fonal** (strong thread) | Thicker, glowing thread |
| 65–79% | **Szoros szál** (tight strand) | |
| 40–64% | **Laza szál** (loose strand) | |
| 5–39% | **Vékony szál** (thin strand) | |

The thread drawn in the badge gets thicker as the score goes up (`1 + pct / 22`).

## Changing the weights

The weights are the numbers passed to `set(...)` and added to `max` in `fonal()`. The most possible points adjusts automatically, so you can change one weight without touching the others. **If you change a weight, update the table above too.**

To add a new question:

1. Add it to `profil.html`.
2. Add it to the entries in `PEOPLE` and to `MINTA`.
3. Score it in `fonal()`.
4. Document it here.
