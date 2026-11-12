# LFA – Sorsfonál

Társkereső-koncepció a vörös fonal legendája köré: egy régi kelet-ázsiai legenda szerint láthatatlan vörös fonal köti
össze azokat, akiknek találkozniuk kell. A Sorsfonál ezt a szálat keresi.

Sima HTML, CSS és JavaScript, szerver és build nélkül. Minden adat a böngésző `localStorage`-ában marad, a profilok
kitalált példák.

## Kipróbálás

Nyisd meg az `index.html`-t a böngészőben, vagy indíts egy helyi szervert a mappában:

```
python -m http.server 8000
```

aztán: http://localhost:8000. Első látogatáskor a „Kipróbálom minta profillal” gomb kitölt egy minta profilt, így
azonnal látszik, hogyan dolgozik a fonal. A Beállításokban az „Ismerkedés újraindítása” mindent visszaállít.

## Oldalak

| Oldal | Mit csinál |
|---|---|
| `index.html` | Ismerkedés: húzható kártyák, a fonal szerint sorba rendezve, elöl „A nap fonala” |
| `likeok.html` | Ki lájkolt téged, és kit lájkoltál te |
| `uzenetek.html` | Egyezések és beszélgetések, jégtörő ötletekkel a közös szálaitokból |
| `profil.html` | A saját profilod (ebből dolgozik a fonal) |
| `beallitasok.html` | Téma, hang, szűrők, adatvédelem |
| `premium.html` | Csomagok (teszt mód, nincs valódi fizetés) |
| `belepes.html`, `keresek.html` | Belépés és „Mit keresel?” minták |

## A fonal (boost ág)

A `boost` ágon a vörös fonal nem csak díszítés, hanem ez dönti el, kit mutat az oldal:

- **Fonal-erősség.** A te profilod és a másik válaszai alapján (mit kerestek, gyerekek, hobbik, zene, hétvégék, italok,
  konyhák, humor, szeretetnyelv, alvás, évszak, dohányzás, alkohol, étrend) 5–99% közötti érték, négy fokozattal:
  vékony szál, laza szál, szoros szál, erős fonal. Csak a kitöltött kérdések számítanak; üres profilnál nincs fonal.
- **Közös szálak és szakadások.** A kártyán kiemelve látszik, mi köt össze titeket, és figyelmeztetés jön, ahol a fonal
  szakadhat (például mást kerestek). A profil „Ami nálam kizáró ok” mezőjét is figyeli (dohányzás, alkohol, buli).
- **A nap fonala.** Naponta egy ajánlás: a legerősebb szál, amiről még nem döntöttél.
- **Egyezés.** Kölcsönös lájknál a vörös fonal kirajzolódik a két profil között, és meg is lehet írni a másikat.
- **Üzenetek.** Egyezések listája és beszélgetés. Az első üzenethez jégtörő ötleteket ad a közös szálakból; a válaszokat
  (mintaként) a gép írja.
- **Bemutatkozás.** Első látogatáskor a legenda és két út: profil kitöltése vagy minta profil.

A számítás a `script.js` `fonal()` függvényében van, a súlyok ott könnyen állíthatók. A kitalált profilok (`PEOPLE`)
ugyanazokat a kulcsokat használják, mint a `profil.html` mezői.
