# FemCare AI — Pitch Deck 🎤🌸

Two versions of the pitch deck live in this folder:

| File | What it is |
|---|---|
| **`femcare-ai-pitch.html`** | **Interactive HTML deck (recommended for presenting).** Animations, step-by-step reveals, clickable language demo, competitor toggles, count-up stats, confetti, fullscreen + overview mode. |
| **`femcare-ai-pitch.pptx`** | **Native PowerPoint file.** 15 slides, editable in PowerPoint / Google Slides / Keynote. Same content & imagery. |

---

## ▶️ Using the interactive deck (`femcare-ai-pitch.html`)

Just double-click the file — it opens in any modern browser. **No server needed.**

### Controls
| Key / Control | Action |
|---|---|
| `→` / `Space` | Reveal next element, then next slide |
| `←` | Go back |
| `G` | Overview grid of all 15 slides (click to jump) |
| `F` | Fullscreen |
| `P` | Print / Save as PDF |
| `1`–`9`, `0` | Jump straight to a slide |
| Dots (right edge) | Jump to any slide |
| `/` buttons (bottom right) | Prev / next |

### Interactive bits
- **Slide 9 — Languages:** click the `EN / हिन्दी / தமிழ் / తెలుగు` pills and the demo text changes live.
- **Slide 10 — Competitive gap:** switch between *vs Flo / vs Clue / vs Basic trackers*.
- **Every slide:** the `→` key progressively reveals bullets, cards and phones.
- **Slide 1 & 15:** the last slide fires a confetti burst 🎉.

### Export to PDF (for a "classic" slide deck)
Press `P` (or `Ctrl/Cmd+P`), choose **Save as PDF**, set margins to *None*, and enable *Background graphics*. Each slide exports as a full 16:9 page.

---

## 📊 The 15 slides

1. **Cover** — FemCare AI · zero cloud, zero servers, 100% confidential
2. **The Problem** — PCOS & anaemia, period poverty (23M girls), taboo, privacy violation
3. **The Solution** — the private companion overview
4. **Privacy-First Architecture** — Privacy Shield, sandboxed `femcare_state_v1`, on-device Femi AI
5. **Dashboard Tour** — phase intelligence, prediction, health score
6. **Tracker & AI Triage** — calendar + CRITICAL triage demo (112 / 102)
7. **Diet & Fitness** — Palak Dal Khichdi, Til-Gur, luteal water-weight chart
8. **Safety & Shop** — SOS, ₹1 Suvidha pad locator, privacy packaging
9. **Multilingual & Education** — 4 languages, voice journal, Partner Empathy Mode
10. **Competitive Gap** — FemCare vs Flo / Clue / basic trackers
11. **Social Impact** — 23M, 9,500+ access points, anaemia lift
12. **Business Model** — freemium, affiliate commerce, B2B licensing
13. **Go-to-Market** — campus → NGO → grassroots
14. **Roadmap** — voice AI, 12 languages, offline P2P sync
15. **The Ask** — ₹1.5 Cr (~$180K) seed round

---

## 🔧 Rebuilding the `.pptx`

```bash
cd ppt/build-pptx
npm install
node generate.js
```

The generator writes `ppt/femcare-ai-pitch.pptx`. Edit `generate.js` and re-run to tweak content.

*FemCare AI — Dignity, Privacy, and Health in Every Cycle.*