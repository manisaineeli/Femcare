# FemCare AI 🌸
> **Your private menstrual health companion, powered by AI.**  
> *Target Audience:* Women and girls aged 14–45, culturally tailored for India & global users.  
> *Core Promise:* "Your period data never leaves your device. No servers, no cloud. Just privacy-first, AI-powered menstrual health support."

---

## 🌟 Key Highlights & Wow Factors
1. **100% Offline-First PWA:** Zero network transmissions. Zero cloud databases. Sandboxed in browser `localStorage` (`femcare_state_v1`), with a service worker that caches the entire app shell so FemCare opens, installs and runs with **no internet at all** (self-hosted fonts — zero third-party requests).
2. **Realistic 3–8 Day Period Logging:** Both onboarding and the Period Record form enforce a medically realistic **3 to 8 day** start→end range, so predictions are always trained on sane data.
3. **Multilingual Support:** One-tap toggle between **English**, **Hindi (हिन्दी)**, **Tamil (தமிழ்)**, and **Telugu (తెలుగు)**.
4. **AI Symptom Triage Analyzer (WOW 1):** Clinical heuristic evaluating pain (1-10), flow rate, and red flags (dizziness, fever, foul odor) into Benign, Moderate, Urgent, or Critical triage levels with emergency action guidance.
5. **Cycle-Phased Fitness Planner (WOW 2):** Tailored workouts adapting to biological shifts (Restorative yoga in Menstrual phase, High-intensity strength in Follicular, HIIT in Ovulatory, Pilates/steady cardio in Luteal).
6. **Period Poverty & Emergency Pad Locator (WOW 3):** Verified guide to Jan Aushadhi Kendras (₹1 Suvidha pads), village ASHA / Anganwadi centers, and Red Cross emergency pad banks.
7. **AI Period Journal (WOW 4):** Text and voice-enabled reflections with mood logging and cycle correlation.
8. **Partner Empathy Mode (WOW 5):** Dedicated educational mode for male partners, brothers, and fathers to foster empathy and break menstrual taboos.
9. **Blockchain-Style Privacy Shield Proof (WOW 6):** Live verification modal with zero-network monitor, raw local JSON inspector, and permanent local data wipe.

---

## 🛠 Tech Stack
- **Frontend Framework:** React 19 + Vite
- **Styling:** Tailwind CSS v4 + Custom Period-Care Design System (`#b5497a`, `#7c5a8c`, `#f4a6b9`, `#120e17`)
- **Visual Charts:** Recharts (30-day cyclical weight trend)
- **Icons:** Lucide React
- **Celebrations:** Canvas Confetti
- **Storage:** LocalStorage with client-side cryptographic sandboxing

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Development Server
```bash
npm run dev
```
Open `http://localhost:5173` in your browser.

### 3. Build for Production
```bash
npm run build
```

### 4. Verify the Period Range Rule (3–8 days)
```bash
npm run verify        # period range rules (3–8 days) + cycle engine
npm run verify:sw     # offline service-worker behaviour (run `npm run build` first)
```
Onboarding, the Period Record form, the cycle engine and the shop calculator all share one rule: a period runs from **3 to 8 days**, start → end inclusive.

---

## 📴 Offline-First PWA — How to Prove It

FemCare is a real installable PWA: after the **first visit**, it boots with the internet switched off.

1. Build and serve the app (service workers need `http(s)`, not `file://`):
   ```bash
   npm run build
   npm run preview        # http://localhost:4173
   ```
2. Open the app once in the browser — the service worker (`public/sw.js`) installs and precaches the app shell, hashed JS/CSS bundles, icons, manifest and self-hosted fonts.
3. Switch your machine/phone to **Airplane mode** (or DevTools → Network → *Offline*).
4. Reload the page — the full app opens from cache. The header shows an amber **Offline** badge, and tracking, AI chat, diet, SOS and the calendar all keep working.
5. Optional: browser menu → **Install FemCare** / *Add to Home Screen* — it launches standalone with its own icon (`manifest.webmanifest`).

Zero third-party requests: fonts are bundled in `public/fonts` (re-run `powershell -File scripts/download-fonts.ps1` only if you change font families).

---

## 🎬 3-Minute Live Demo Script

| Time | Screen / Action | What to Say & Demonstrate |
|---|---|---|
| **0:00 - 0:30** | **Header & Privacy Shield** | *"Most period tracking apps sell sensitive reproductive data to advertisers. FemCare AI is built on a zero-cloud architecture. Look at this Privacy Shield indicator in the header: when clicked, it reveals zero outgoing network calls and shows all user state is locked in sandboxed local storage on this phone alone."* |
| **0:30 - 1:00** | **Dashboard & Multilingual Toggle** | *"Notice the dark mode default for eye comfort. We see our current phase: Follicular Phase (Energy Rising), cycle day 13, and next period countdown. Let's switch language to Hindi or Tamil—instantly, all phase descriptions, facts, and advice switch seamlessly without reloading."* |
| **1:00 - 1:40** | **Cycle Tracker & Month Calendar** | *"On the Cycle tab, our interactive month calendar marks period days (rose), fertile window (purple), and ovulation (amber). Recording a period asks for a from → to date range validated to a realistic 3–8 days, then logging today's flow and pain level (e.g. 6/10) gives instant medical recommendations."* |
| **1:40 - 2:10** | **Diet Plan & Cycle Weight** | *"Nutrition shifts with our hormones. In the Menstrual phase, we get Indian iron-boosting recipes like Palak Dal Khichdi and Til-Gur ladoos. In the Fitness tab, the Recharts graph proves how luteal water weight (+1.2kg) is normal fluid retention, stopping panic."* |
| **2:10 - 2:40** | **AI Assistant & Symptom Triage (WOW)** | *"Let's ask Femi: 'How to relieve severe cramps?'—we get instant offline answers. Now let's run the AI Symptom Triage Analyzer with severe pain or soaking pads: Femi immediately raises a clinical emergency triage alert with direct 112/102 hospital helplines."* |
| **2:40 - 3:00** | **Safety SOS & Shame-Free Shop** | *"Double-press (or 2-second hold) the VOL+ button: the app locks GPS, then **automatically** opens WhatsApp chats + SMS to every trusted contact with the live location and pre-dials the first contact — 112 stays one tap away. The one-tap Emergency SOS still works as before, and in the Shop tab, Privacy Packaging Mode blurs items while the locator connects rural and low-income girls to ₹1 Jan Aushadhi pads."* |

---

## 📊 Pitch Deck (10 Slides)

### Slide 1: Cover
- **FemCare AI**
- *The Private Menstrual Health Companion, Powered by AI*
- Zero Cloud. Zero Servers. 100% Confidential.

### Slide 2: The Problem
- **Taboo & Medical Neglect:** 1 in 10 women have PCOS; over 50% in India suffer from period-related anemia.
- **Privacy Violation:** Major global period apps were caught selling intimate fertility data to third-party ad networks and data brokers.
- **Period Poverty:** 23 million adolescent girls in India drop out of school annually due to lack of menstrual products and guidance.

### Slide 3: The Solution — FemCare AI
- Complete cycle companion: Period prediction, symptom triage, cycle-phased nutrition, weight management, and emergency safety.
- **True Offline-First AI:** All knowledge bases, algorithms, and chats run 100% inside the user's browser or smartphone.

### Slide 4: The Competitive Gap
- **Flo / Clue:** Require cloud login, track user identities, lack Indian cultural nutrition context.
- **FemCare AI:** Zero servers, multilingual (Hindi, Tamil, Telugu, English), phase-specific Indian diet (Khichdi, Til-Gur, Jan Aushadhi ₹1 pads), built-in emergency SOS.

### Slide 5: Core Product Architecture
- **Privacy Shield:** Sandboxed local storage with live inspection proof.
- **Cycle Engine:** Knaus-Ogino modified algorithm predicting next period and fertile window.
- **Femi AI Engine:** 100+ curated clinical Q&A pairs + heuristic triage matrix detecting red flags.

### Slide 6: Social & Health Impact
- **Combating Anemia:** 5-ingredient iron booster recipes and absorption enhancers (Vitamin C pairing).
- **Ending Period Poverty:** Free pad locator pointing girls to 9,500+ Jan Aushadhi Kendras and ASHA health workers.
- **De-stigmatization:** Partner Empathy Mode teaches men how to support menstruators with compassion.

### Slide 7: Business Model (Privacy-Preserving Monetization)
1. **Freemium Offline App:** Core tracking and SOS 100% free forever.
2. **Discreet Affiliate Commerce:** Commission from sustainable period care brands (silicone cups, organic bamboo pads) with privacy redirection.
3. **B2B Campus & Corporate Wellness:** Custom offline-packaged health licensing for universities, schools, and workplaces.

### Slide 8: Go-to-Market Strategy
- **Phase 1 (Months 1–3):** College campus brand ambassadors across major Indian universities and women's hostels.
- **Phase 2 (Months 4–6):** NGO partnerships (Myna Mahila, Red Dot Foundation, SEWA) and public health distribution.
- **Phase 3 (Months 6+):** Digital privacy advocates and women health creator grassroots campaigns.

### Slide 9: Product Roadmap
- **Q1:** Voice note AI transcription v2 & smart wearable Bluetooth export (local only).
- **Q2:** Expansion to 8 more Indian regional languages (Marathi, Bengali, Gujarati, Kannada, etc.).
- **Q3:** Offline encrypted peer-to-peer circle sync via Bluetooth/QR codes without internet.

### Slide 10: The Ask
- **Partnerships & Seed Funding:** Seeking ₹1.5 Cr ($180K USD) to expand rural outreach, scale localized public health content, and conduct clinical pilot trials with gynecological associations across India.

---

## 🔒 Privacy Architecture Verification
To verify that FemCare AI makes zero outgoing network calls:
1. Open your browser Developer Tools (`F12`).
2. Navigate to the **Network** tab.
3. Filter by `Fetch/XHR`.
4. Interact with tracking, AI chat, triage, and diet plans.
5. Notice **0 network requests** are sent to external servers.

---
*FemCare AI — Dignity, Privacy, and Health in Every Cycle.*
