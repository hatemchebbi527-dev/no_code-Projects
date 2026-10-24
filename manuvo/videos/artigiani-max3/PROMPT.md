<context>
Manuvo connects privati and local artisans in Rimini: the privato posts a request for free, artisans of that trade and zone unlock the contacts they want with credits, max 3 artisans per request.
This film plays on TikTok and Instagram Reels (+ Reel FB, Story extract) during Phase 0 (warm-up, before the 22 January 2027 launch). Audience: **artigiani**, the paying side and the one the 6 Nov to 18 Dec pre-registration push needs. Goal: awareness + follow + pre-registration intent, no conversion. Soft CTA "Presto a Rimini · @manuvo.it".
It must read with the sound off: every line is burned in, no voice.
Read `videos/BRAND.md` first. This prompt only adds the story.
</context>

<inputs>
Type: brand teaser / problem-solution, pillar 4 (artigiani / the offer side). The only pillar with no film yet.
Facts from the owner and the code, word for word: max 3 artigiani per richiesta (`src/app/page.tsx` MAX3, `MAX_UNLOCKS_PER_LEAD`); artisans receive only the requests of their own trade and zone (`signup` categories + city); no subscription, you pay only for the contacts you want (ROADMAP.md, prospecting scripts); **5 crediti offerti** at pre-registration, worth 10 euros, enough to unlock **one** contact (an unlock costs 3 to 5 credits, `prisma/seed.ts`). Handle `@manuvo.it`, site `manuvo.automa-ia.net`.
**The hook is a question, never a claim about a competitor.** The owner's brief said "the same contact is resold to ten artisans on other platforms". That is an unprovable factual assertion about named third parties and exposes Manuvo to comparative-disparagement claims, so the film asks the artisan instead: "In quanti l'hanno avuto?" then "Non lo sai." The feeling is recognised, nothing is asserted.
Banned here (not true yet, ROADMAP.md principle 2): SMS verification (Twilio not in production), P.IVA registrata, any promise about the volume of requests, and any "pubblica ora" / "siamo online" CTA.
Assets used: `logo.svg` (particles then extruded lockup, reversed cream on coral as the app does in ComingSoon.tsx), Bricolage / Geist / Geist Mono, the sfx set from `problema-n1`.
Decided: 1080x1920, 60 fps, 12 bars at 144 BPM = 20.000 s. **No music track in the file** (BRAND.md standing choice: the owner adds trending audio per platform); sfx only, kept quiet. Rendered with `--blur 2` (120 fps master), as `problema-n1`.
</inputs>

<direction>
Crowded and anxious at first (one contact, many hands), then cut, then clean and generous.
The message, in three statements: 1. Paghi un contatto e non sai in quanti l'hanno avuto. 2. Su Manuvo, massimo 3 artigiani per richiesta, del tuo mestiere e della tua zona. 3. Zero abbonamenti, e 5 crediti in regalo per il tuo primo contatto.
A camera cut every two beats, giant slammed type, a colour flip per chapter, the hexagon turning a sixth of a turn on the beat. **No viewfinder frame and no timecode** (owner, standing choice in BRAND.md): the corner brackets are removed and the `br` slot stays empty; only the discreet corner labels remain.
Words on screen: PAGHI UN CONTATTO. / IN QUANTI L'HANNO AVUTO? / CINQUE? DIECI? QUINDICI? / NON LO SAI. / MASSIMO 3. / SU MANUVO MAX 3 PER RICHIESTA. / IL TUO MESTIERE. LA TUA ZONA. ZERO ABBONAMENTI. / UNA CHANCE VERA. / 5 CREDITI IN REGALO. Per 1 contatto. / PRESTO A RIMINI · @manuvo.it
</direction>

<cast>
- The brand element: the hexagon. A lead card in 01 and 02, the shield that locks in 04, the prism that turns a sixth in 05, the extruded logo in 06.
- The contact cards are anonymous by construction: an avatar disc, two redacted bars and a lock chip. No invented name, number or review ever appears.
</cast>

<structure>
144 BPM, 4/4, 12 bars, one beat 0.417 s. See `cues.js` and `BEATSHEET.md`.
Bars 1-2, 01 Hook (ink): one coral request card low in frame, nine identical contact cards dropping onto it one per beat, the camera pulling back. PAGHI UN / CONTATTO. then IN QUANTI / L'HANNO AVUTO?
Bars 3-4, 02 Il dubbio (coral flip): the stack fans out into a wall of 18 identical cards, a mono tally climbing with it (STESSA RICHIESTA · 01 to 18) and stopping dead. CINQUE? → DIECI? → QUINDICI? → NON LO SAI.
Bar 5, 03 Il taglio (ink): the wall bursts into particles, three coral hexagons settle toward the lens, the frame shakes; dry cut to black for MASSIMO 3. and half a beat of silence.
Bars 6-8, 04 La soluzione (coral, clean): coral iris from the shield; SU MANUVO / MAX 3 / PER RICHIESTA., then three cream tokens settle in a row one per beat while the three promises stack and hold: IL TUO MESTIERE. / LA TUA ZONA. / ZERO ABBONAMENTI. The shield turns a sixth and locks.
Bars 9-10, 05 Beneficio: UNA CHANCE / VERA. on cream (ink prism), hard cut to ink for 5 CREDITI / IN REGALO. (coral prism) with Per 1 contatto. holding under it; the prism turns a sixth on beats 1 and 3.
Bars 11-12, 06 Manuvo (coral): particles converge into the logo, it turns solid with a shockwave; PRESTO A RIMINI and @manuvo.it held to the end (the closing line gets its 2 s).
</structure>

<gotchas>
The wipe layer lives **inside** `#cam`, under `#words`: an iris or flood is a background transition and must never truncate a headline (it did, and cut "MAX 3" in half).
In 9:16 the camera target sits **above** the subject so the subject reads low in frame and the words get clean colour on top. Getting this backwards put the ink prism under the ink headline and made "UNA CHANCE" invisible.
Text on coral is ink `#1b1e24`, the convention `problema-n1` validated; cream on coral is reserved for one punchline ("Non lo sai.").
A `#scrim` gradient of the scene colour sits behind the headline band in 01, 02 and 04, where the falling cards and the wall would otherwise cross the words.
Every line ends 0.14 s before the next one lands in the same slot, so no exit blur bleeds into an entrance.
Lines hold long enough to be read (`check` Craft: 0.5 s + 0.3 s a word, 2 s for the closing line). This is why the three promises stack and stay instead of flashing one at a time.
Keep `cues.js` free of nested double quotes inside a double-quoted `what:` string; it is evaluated as JS by every script and a stray quote breaks the render.
</gotchas>
