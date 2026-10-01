"""Suspense bed for the Manuvo teaser, written on the film's own grid (cues.js).

    uv run --with numpy --with scipy python3 suspense.py assets/audio/bed.wav

140 BPM, 4/4, 10 bars (17.143 s), F minor. Generated from sines, saws and noise,
no samples: royalty-free, ours. It follows the picture:

  bars 1-2  01 Rimini     low drone, heartbeat (lub-dub every 2 beats), clock tick on the beat
  bars 3-4  02 Numeri     the "Jaws" minor second F-Gb starts, heartbeat speeds up,
                          then a hush on "Nessuna risposta" (4.3 to 5.1): drone + one high ping only
  bar  5    03 Fantasma   tremolo cluster (ghosts), 16th ticks, riser, half a beat of silence
  bars 6-7  04 Cambia     impact, the turn: Db major then Eb major, kick on every beat, bells climbing
  bars 8-10 05 Manuvo     impact, F major (VI-VII-I, the reveal), bells on the words,
                          one last heartbeat at bar 10 (the teaser stays a teaser)
"""

import json
import sys
import wave

import numpy as np
from scipy.signal import butter, sosfilt

SR = 48000
BPM, BARS = 140.0, 10
BEAT = 60.0 / BPM
BAR = 4 * BEAT
DUR = BARS * BAR
N = int(round(DUR * SR))
rng = np.random.default_rng(7)


def b(bar, beat=1, frac=0.0):
    return ((bar - 1) * 4 + (beat - 1) + frac) * BEAT


def hz(m):
    return 440.0 * 2 ** ((m - 69) / 12)


def t_(sec):
    return np.arange(int(sec * SR)) / SR


def lp(x, f, order=2):
    return sosfilt(butter(order, f, "low", fs=SR, output="sos"), x)


def hp(x, f, order=2):
    return sosfilt(butter(order, f, "high", fs=SR, output="sos"), x)


def bp(x, lo, hi, order=2):
    return sosfilt(butter(order, [lo, hi], "band", fs=SR, output="sos"), x)


def saw(f, sec, detune=0.0, k=14):
    t = t_(sec)
    y = np.zeros_like(t)
    for h in range(1, k + 1):
        if f * h > SR / 2.2:
            break
        y += np.sin(2 * np.pi * f * (1 + detune) * h * t + h * 0.7) / h
    return y


def env(n, a, r):
    e = np.ones(n)
    na, nr = min(n, max(1, int(a * SR))), min(n, max(1, int(r * SR)))
    e[:na] = np.linspace(0, 1, na)
    e[n - nr:] *= np.linspace(1, 0, nr) ** 2
    return e


L = np.zeros(N)
R = np.zeros(N)


def add(sig, at, gain=1.0, pan=0.0):
    i = int(round(at * SR))
    if i >= N:
        return
    sig = sig[: N - i]
    l, r = np.cos((pan + 1) * np.pi / 4) * 1.4142, np.sin((pan + 1) * np.pi / 4) * 1.4142
    L[i:i + len(sig)] += sig * gain * l
    R[i:i + len(sig)] += sig * gain * r


GAP = b(6, 1) - BEAT / 2  # half a beat of silence before the drop

# 1. Drone (bars 1-5): F1 + F2 + C3 detuned saws, the filter opening as the tension builds.
dsec = GAP
drone = sum(saw(hz(m), dsec, d) for m, d in ((29, 0.0), (41, 0.003), (41, -0.004), (48, 0.002)))
dark, bright = lp(drone, 260, 4), lp(drone, 1100, 4)
u = np.clip(np.arange(len(drone)) / SR / b(5, 4), 0, 1) ** 1.6
d = dark * (1 - u) + bright * u
swell = 0.55 + 0.45 * u
lfo = 1 + 0.12 * np.sin(2 * np.pi * 0.35 * t_(dsec))
add(d * swell * lfo * env(len(d), 0.08, 0.04), 0, 0.16)


# 2. Heartbeat: lub-dub (a sine thump with a pitch drop).
def thump(f0=72, f1=38, sec=0.32, decay=11):
    t = t_(sec)
    f = f1 + (f0 - f1) * np.exp(-t * 28)
    return np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-t * decay)


def heart(at, g=1.0):
    add(thump(), at, 0.62 * g)
    add(thump(64, 36, 0.28, 13), at + 0.3 * BEAT, 0.42 * g)


hb = [b(bar, bt) for bar in (1, 2, 3) for bt in (1, 3)] + [b(4, bt) for bt in (1, 2)] + [b(5, bt) for bt in (1, 2, 3, 4)]
for i, at in enumerate(hb):
    if at < GAP - 0.1:
        heart(at, 0.75 + 0.25 * i / len(hb))


# 3. Clock tick: quarters (bars 1-2), eighths (bars 3-4.2), sixteenths (bar 5).
def tick(f=2600, sec=0.03):
    t = t_(sec)
    return np.sin(2 * np.pi * f * t) * np.exp(-t * 180)


for k in range(8):
    add(tick(), k * BEAT, 0.10, -0.3 if k % 2 else 0.3)
for k in range(12):  # bar 3 to the hush at bar 4 beat 3
    add(tick(3000), b(3) + k * BEAT / 2, 0.09, -0.3 if k % 2 else 0.3)
for k in range(14):
    add(tick(3200), b(5) + k * BEAT / 4, 0.06 + 0.06 * k / 14, -0.3 if k % 2 else 0.3)


# 4. The minor second F2-Gb2 (bars 3-4 until the hush, again in bar 5), getting faster.
def pluck(m, sec=0.32, cut=600):
    y = saw(hz(m), sec, 0.0) + 0.6 * saw(hz(m), sec, 0.005)
    return lp(y, cut, 2) * np.exp(-t_(sec) * 9) * env(int(sec * SR), 0.004, 0.05)


seq = [(b(3, 1), 41), (b(3, 2), 42), (b(3, 3), 41), (b(3, 4), 42)]
seq += [(b(4, 1) + k * BEAT / 2, 41 if k % 2 == 0 else 42) for k in range(4)]
seq += [(b(5, 1) + k * BEAT / 2, 41 if k % 2 == 0 else 42) for k in range(7)]
for i, (at, m) in enumerate(seq):
    add(pluck(m, cut=420 + 40 * i), at, 0.5)
    if at >= b(5):
        add(pluck(m + 12, 0.2, 1400), at, 0.16, 0.4)

# The hush on "Nessuna risposta": one high, slightly sour ping.
ping = np.sin(2 * np.pi * hz(90) * t_(1.2)) * np.exp(-t_(1.2) * 3.5) + 0.4 * np.sin(2 * np.pi * hz(91) * t_(1.2)) * np.exp(-t_(1.2) * 4)
add(ping, b(4, 3), 0.07, 0.2)

# 5. Ghosts (bar 5): tremolo cluster F5 Gb5 C6, swelling.
gsec = GAP - b(5)
tt = t_(gsec)
cluster = sum(np.sin(2 * np.pi * hz(m) * tt + i) for i, m in enumerate((77, 78, 84)))
trem = 0.5 + 0.5 * np.sign(np.sin(2 * np.pi * (BPM / 60 * 4) * tt))
add(lp(cluster * trem, 5000) * np.linspace(0.2, 1, len(tt)) * env(len(tt), 0.05, 0.02), b(5), 0.05)

# 6. Riser into the gap: noise sweeping up + a sine glissando.
rsec = GAP - b(4, 3)
tt = t_(rsec)
noise = rng.standard_normal(len(tt))
parts = []
for j, (lo, hi) in enumerate(((300, 900), (700, 2000), (1500, 4500), (3000, 9000))):
    w = np.clip(1 - np.abs(np.linspace(0, 3, len(tt)) - j), 0, 1)
    parts.append(bp(noise, lo, hi) * w)
riser = sum(parts) * np.linspace(0, 1, len(tt)) ** 2
gl = np.sin(2 * np.pi * np.cumsum(180 * (8 ** np.linspace(0, 1, len(tt)))) / SR) * np.linspace(0, 1, len(tt)) ** 3
add((riser * 0.5 + gl * 0.25) * env(len(tt), 0.3, 0.01), b(4, 3), 0.35)


# 7. Impacts on the drop (bar 6) and on the logo (bar 8).
def impact(at, g=1.0):
    t = t_(2.2)
    f = 26 + 40 * np.exp(-t * 9)
    add(np.tanh(1.5 * np.sin(2 * np.pi * np.cumsum(f) / SR)) * np.exp(-t * 2.2), at, 0.75 * g)
    nz = hp(rng.standard_normal(int(1.4 * SR)), 2500) * np.exp(-t_(1.4) * 3.2)
    add(nz, at, 0.10 * g, -0.2)
    add(nz[::-1][: int(0.25 * SR)] * np.linspace(0, 1, int(0.25 * SR)) ** 3, at - 0.25, 0.06 * g, 0.2)


impact(b(6, 1))
impact(b(8, 1), 0.8)


# 8. The turn: Db major (bar 6), Eb major (bar 7), F major (bars 8-10). Pad + stab + bells.
def pad(notes, at, sec, g, a=0.08, r=0.4, cut=1800):
    y = sum(saw(hz(m), sec, d, 10) for m in notes for d in (-0.004, 0.004))
    add(lp(y, cut, 2) * env(len(y), a, r), at, g)


def kick(at, g):
    t = t_(0.3)
    f = 45 + 90 * np.exp(-t * 40)
    add(np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-t * 14), at, g)


def bell(m, at, g, pan=0.0, sec=1.6):
    t = t_(sec)
    mod = 2.0 * np.exp(-t * 6) * np.sin(2 * np.pi * hz(m) * 3.5 * t)
    add(np.sin(2 * np.pi * hz(m) * t + mod) * np.exp(-t * 3.2), at, g, pan)


pad([49, 53, 56, 61], b(6), BAR + 0.05, 0.05)      # Db major
pad([51, 55, 58, 63], b(7), BAR - 0.05, 0.055)     # Eb major
pad([25, 37], b(6), BAR, 0.12, 0.01, 0.2, 300)     # Db bass
pad([27, 39], b(7), BAR, 0.12, 0.01, 0.2, 300)     # Eb bass
for k in range(8):
    kick(b(6) + k * BEAT, 0.55)
for k in range(16):  # the ostinato keeps going, now on the chord roots
    m = (37 if k < 8 else 39) + (12 if k % 2 else 0)
    add(pluck(m, 0.22, 900), b(6) + k * BEAT / 2, 0.32)
arp = [68, 73, 77, 80, 70, 75, 79, 82]  # Ab4 Db5 F5 Ab5 / Bb4 Eb5 G5 Bb5, climbing
for k, m in enumerate(arp):
    bell(m, b(6, 1) + k * BEAT, 0.09, -0.4 + 0.1 * k)
# A short riser into the logo.
tt = t_(BAR / 2)
add(bp(rng.standard_normal(len(tt)), 1500, 7000) * np.linspace(0, 1, len(tt)) ** 3, b(7, 3), 0.18)

# Bars 8-10: F major, the reveal, held to the end.
end = DUR - b(8)
pad([53, 57, 60, 65], b(8), end, 0.07, 0.15, 1.2, 2200)  # F A C F
pad([29, 41], b(8), end, 0.13, 0.02, 1.2, 280)
bell(77, b(8, 1), 0.12, 0.0, 2.4)
bell(81, b(9, 1), 0.10, -0.3)      # "Presto a Rimini"
bell(84, b(9, 2), 0.10, 0.3)       # "@manuvo.it"
bell(89, b(9, 3), 0.06, 0.0, 2.4)
heart(b(10, 1), 0.7)               # one last heartbeat: it is still a teaser

# Silence before the drop (everything, half a beat), then a fade over the last 0.6 s.
i0, i1 = int(GAP * SR), int(b(6) * SR) - int(0.02 * SR)
for ch in (L, R):
    ch[i0:i1] *= 0.0
    ch[-int(0.6 * SR):] *= np.linspace(1, 0, int(0.6 * SR)) ** 1.5

# Glue: gentle saturation, peak at -1.5 dBFS.
mix = np.stack([L, R], 1)
mix = np.tanh(mix * 1.2) / 1.2
mix *= 10 ** (-1.5 / 20) / np.max(np.abs(mix))

out = sys.argv[1] if len(sys.argv) > 1 else "assets/audio/bed.wav"
with wave.open(out, "wb") as f:
    f.setnchannels(2)
    f.setsampwidth(2)
    f.setframerate(SR)
    f.writeframes((mix * 32767).astype(np.int16).tobytes())
grid = {"bpm": BPM, "firstBeat": 0, "pickupBeats": 0, "beatsPerBar": 4, "bars": BARS, "duration": round(DUR, 4), "style": "suspense (suspense.py)"}
json.dump(grid, open(out.replace(".wav", ".grid.json"), "w"), indent=2)
print(f"{out}: {DUR:.2f}s, {BARS} bars at {BPM:.0f} BPM (suspense)")
