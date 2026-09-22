# FemCare AI — Pitch Deck 💗

An interactive, **girly, girl-focused** pitch deck for the FemCare AI app.

> **No business / investor POV** — this edition is 100% about the app's heart and the girls it serves: warmth, wellness, sisterhood, and care. No funding asks, no revenue, no business model, no roadmap, no competitive gap.

---

## 📄 Files in this folder

| File | What it is |
|------|-----------|
| `femcare-ai-pitch.html` | **Interactive web deck** — the primary shareable link. Single-file, works offline, no external deps, 12 girly slides. |
| `femcare-ai-pitch.pptx` | Native PowerPoint (12-slide feminine edition pending regen to match the HTML). |
| `assets/` | Deck photos (cover-flowers, privacy-sec, woman-smile, fitness-yoga, nutrition-bowl, diet-nutrition, community-women, mother-child). |
| `build-pptx/` | `pptxgenjs` Node generator used to rebuild the `.pptx`. |
| `README.md` | This file — deck notes + the reusable **no-business-POV** prompt. |

---

## 🎮 Interactive controls (HTML deck)

- `→` / `Space` — next slide · `←` — previous slide
- `G` — overview grid · `F` — fullscreen
- Number keys `1–12` — jump to a slide
- Tabs inside slides — step-by-step reveal (keeps reveal on tab)
- SOS **hold-to-activate** demo · language demo · confetti 🎉

---

## 🌸 The 4-look design language fused into the app + deck

| Look | Feel |
|------|------|
| **Glassmorphism + gradients** | Frosted glass panels, subtle rose gradients, glow |
| **Warm & friendly** | Soft blush/cream palette, rounded, approachable for women |
| **Apple-minimal** | Whitespace, large tight typography, crisp radii |
| **Interactive wellness** | Cards, progress rings, animations, conversational care |

---

## 🚀 Live links (GitHub Pages)

- App: https://manisaineeli.github.io/Femcare/
- Interactive girly deck: https://manisaineeli.github.io/Femcare/ppt/femcare-ai-pitch.html
- PowerPoint: https://manisaineeli.github.io/Femcare/ppt/femcare-ai-pitch.pptx

Deploy = push to `main` → GitHub Actions Pages workflow copies `ppt/` → `dist/ppt/` and publishes. Keep Pages source set to **GitHub Actions**.

---

## 🧁 Reusable prompt: "No business POV" girly PPT

Use this prompt (with any AI tools like Gemini, Claude, ChatGPT, or the `pptxgenjs` generator) to produce a girl-focused, non-investor deck for *any* product:

```
Create a warm, feminine, girl-focused product presentation titled "<PRODUCT NAME>".

RULES:
1. NO business / investor content of any kind. Specifically EXCLUDE:
   - Funding ask / investment amount / valuation
   - Business model / revenue / monetization / pricing
   - Go-to-market / sales strategy / market size / TAM/SAM/SOM
   - Competitors / competitive gap / market positioning
   - Roadmap / timelines / milestones / financial projections

2. Instead, focus ONLY on:
   - The PROBLEM it solves in the user's everyday life (feelings, not figures)
   - The SOLUTION and how it works, step by step, in simple warm language
   - Real moments: cycles, moods, nutrition, wellness, safety, community
   - Why girls will LOVE it: privacy, warmth, ease, sisterhood

3. DESIGN: make it girly and delightful —
   - Warm Blush + Cream + Rose palette, soft gradients, glassmorphism
   - Rounded, friendly cards and big, clean Apple-like typography
   - Flowers 🌸, hearts 💗, soft motion animations, progress rings
   - Keep it 12–15 slides, image-forward, no dense text walls

4. TONE: "for every girl" — caring, supportive, sisterhood. Never corporate.

Deliver it as: (a) an interactive single-file HTML deck, and (b) a matching .pptx.
```

**Save this README into the repo** so any future deck stays consistent with the girly, no-business-POV style.
