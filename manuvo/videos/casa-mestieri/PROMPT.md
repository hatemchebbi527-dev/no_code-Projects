<context>
Manuvo connects privati and local artisans in Rimini: the privato posts a request for free and without registering, artisans of that trade and zone contact them, max 3 per request.
This film plays on TikTok and Instagram Reels (+ Reel FB, Story extract) during Phase 0, before the 22 January 2027 launch. Audience: **privati**, pillar 3 (mestieri / concrete cases), the last of the four pillars with no film.
It must read with the sound off: every line is burned in, no voice.
Read `videos/BRAND.md` first. This prompt only adds the story.
</context>

<inputs>
Type: problem-solution teaser built on a count progression. Pillar 3.
Reference the owner gave: a Facebook Reel by **EdineLit** (18 s), a before/after of an 80s living room transformed by integrated LED lighting, real interior footage, Italian caption inviting the viewer to renovate. The owner asked for "that overall level, without copying its form".
**Why no before/after here.** A before/after implies a delivered job. Manuvo has not launched and has no completed work; borrowing another artisan's footage or fabricating a transformation would be a false claim. The format is right for later, once registered artisans supply their own jobs with permission. So the film keeps the reference's subject (a real home, real trades, a concrete fix) and drops its form.
Facts from the code: **40** trades in `src/messages/it.json` (`categories`), grouped in 8 families (`src/lib/category-groups.ts`); a privato posts without an account (`page.tsx` FAQ: "No. Pubblichi la tua richiesta senza registrazione: sono gli artigiani a contattarti"); up to 3 quotes (`MAX3` in `page.tsx`).
Banned here (ROADMAP.md principle 2): SMS verification, P.IVA registrata, any promise of price, delay or volume, any "pubblica ora" / "siamo online".
Assets used: `logo.svg` (particles then extruded lockup), Bricolage / Geist / Geist Mono, the sfx set from `problema-n1`.
Decided: 1080x1920, 60 fps, 11 bars at 144 BPM = 18.333 s, close to the reference's 18 s. **No music track** (BRAND.md standing choice); sfx only. Rendered with `--blur 2`.
</inputs>

<direction>
The spine is a progression of counts: ONE point on a house, SIX problems lighting up one per half bar with their trade, FORTY trades as a field, THREE artisans. 1 → 6 → 40 → 3.
The message, in three statements: 1. In casa c'è sempre qualcosa da sistemare. 2. Su Manuvo ci sono 40 mestieri, tutti della tua zona. 3. Pubblichi gratis senza registrarti, ti contattano loro, fino a 3 preventivi.
A camera cut every two beats, giant slammed type, a colour flip per chapter, the hexagon turning a sixth on the beat. No viewfinder of any kind (BRAND.md standing choice).
Words on screen: IN CASA C'È / SEMPRE QUALCOSA. → IDRAULICO · ELETTRICISTA · IMBIANCHINO · CALDAIA · FABBRO · GIARDINAGGIO → 40 MESTIERI. → PUBBLICHI GRATIS. / Senza registrarti. / TI CONTATTANO LORO. / FINO A 3 PREVENTIVI. → PRESTO A RIMINI · @manuvo.it
</direction>

<cast>
- The house: glossy cream walls, an ink roof, dark window openings, an ink door. Built from primitives, deliberately a model and not a photo, so nothing reads as a real job.
- The brand element: the hexagon. The 40 trades as a field of cream tokens, then the three artisans as three tokens turning a sixth together, then the extruded logo.
</cast>

<structure>
144 BPM, 4/4, 11 bars, one beat 0.417 s. See `cues.js` and `BEATSHEET.md`.
Bars 1-2, 01 La casa (ink): the house turns out of the dark, its windows appearing one by one, a single coral bead landing on it. IN CASA C'È / SEMPRE QUALCOSA.
Bars 3-5, 02 I problemi (ink, camera pushing in): six coral markers light up on the house, one per half bar, each with a ring that expands once and its trade named in the HUD face.
Bars 6-7, 03 Quaranta (coral flip): the markers tear off and become a field of 40 cream hexagons settling into a 5x8 grid that breathes. 40 MESTIERI.
Bars 8-9, 04 Come funziona (coral then cream): the field collapses to three tokens; the three promises stack and hold.
Bars 10-11, 05 Manuvo (coral): particles converge into the logo, shockwave, lockup held to the end.
</structure>

<gotchas>
**The roof pointed into the ground.** A `CylinderGeometry(r, r, h, 3)` has its apex at +Z in its section, and `rotation.x = +PI/2` maps +Z to -Y. It needs `-PI/2`. An equilateral prism wide enough for the wall is then taller than the house, so `scale.z = 0.58` flattens the pitch (local Z becomes world height).
**Cream windows on a cream wall never read.** The openings are ink.
**Markers belong on the wall, not inside a window**, or the coral glow reads as red eyes.
**Lighting was overcorrected into milk.** Raising fill to 0.85 and environmentIntensity to 0.7 pushed the cream walls over the bloom threshold and the whole house bloomed. Final: key 1.25, fill 0.42, environmentIntensity 0.42, exposure 0.88, bloom threshold 1.18 so only the coral glow crosses it.
The wipe layer lives inside `#cam`, under `#words`. The scrim behind the headline band runs deeper in chapter 03, where the field of 40 reaches higher than the house did.
Lines hold past the `check` Craft floor (0.5 s + 0.3 s a word): the three promises stack and stay rather than flashing one at a time.
</gotchas>
