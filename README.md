# FemCare AI 🌸
> **Your private menstrual health companion, powered by AI.**  
> *Target Audience:* Women and girls aged 14–45, culturally tailored for India & global users.  
> *Core Promise:* "Your period data never leaves your device. No servers, no cloud. Just privacy-first, AI-powered menstrual health support."

---

## 🌟 Key Highlights & Wow Factors
1. **100% Offline-First Architecture:** Zero network transmissions. Zero cloud databases. Sandboxed in browser `localStorage` (`femcare_state_v1`).
2. **Multilingual Support:** One-tap toggle between **English**, **Hindi (हिन्दी)**, **Tamil (தமிழ்)**, and **Telugu (తెలుగు)**.
3. **AI Symptom Triage Analyzer (WOW 1):** Clinical heuristic evaluating pain (1-10), flow rate, and red flags (dizziness, fever, foul odor) into Benign, Moderate, Urgent, or Critical triage levels with emergency action guidance.
4. **Cycle-Phased Fitness Planner (WOW 2):** Tailored workouts adapting to biological shifts (Restorative yoga in Menstrual phase, High-intensity strength in Follicular, HIIT in Ovulatory, Pilates/steady cardio in Luteal).
5. **Period Poverty & Emergency Pad Locator (WOW 3):** Verified guide to Jan Aushadhi Kendras (₹1 Suvidha pads), village ASHA / Anganwadi centers, and Red Cross emergency pad banks.
6. **AI Period Journal (WOW 4):** Text and voice-enabled reflections with mood logging and cycle correlation.
7. **Partner Empathy Mode (WOW 5):** Dedicated educational mode for male partners, brothers, and fathers to foster empathy and break menstrual taboos.
8. **Blockchain-Style Privacy Shield Proof (WOW 6):** Live verification modal with zero-network monitor, raw local JSON inspector, and permanent local data wipe.

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

---

## 🎬 3-Minute Live Demo Script

| Time | Screen / Action | What to Say & Demonstrate |
|---|---|---|
| **0:00 - 0:30** | **Header & Privacy Shield** | *"Most period tracking apps sell sensitive reproductive data to advertisers. FemCare AI is built on a zero-cloud architecture. Look at this Privacy Shield indicator in the header: when clicked, it reveals zero outgoing network calls and shows all user state is locked in sandboxed local storage on this phone alone."* |
| **0:30 - 1:00** | **Dashboard & Multilingual Toggle** | *"Notice the dark mode default for eye comfort. We see our current phase: Follicular Phase (Energy Rising), cycle day 13, and next period countdown. Let's switch language to Hindi or Tamil—instantly, all phase descriptions, facts, and advice switch seamlessly without reloading."* |
| **1:00 - 1:40** | **Cycle Tracker & Month Calendar** | *"On the Cycle tab, our interactive month calendar marks period days (rose), fertile window (purple), and ovulation (amber). When we log today's flow and pain level (e.g. 6/10), the app provides instant medical recommendations."* |
| **1:40 - 2:10** | **Diet Plan & Cycle Weight** | *"Nutrition shifts with our hormones. In the Menstrual phase, we get Indian iron-boosting recipes like Palak Dal Khichdi and Til-Gur ladoos. In the Fitness tab, the Recharts graph proves how luteal water weight (+1.2kg) is normal fluid retention, stopping panic."* |
| **2:10 - 2:40** | **AI Assistant & Symptom Triage (WOW)** | *"Let's ask Femi: 'How to relieve severe cramps?'—we get instant offline answers. Now let's run the AI Symptom Triage Analyzer with severe pain or soaking pads: Femi immediately raises a clinical emergency triage alert with direct 112/102 hospital helplines."* |
| **2:40 - 3:00** | **Safety SOS & Shame-Free Shop** | *"One tap on the Emergency SOS prepares a WhatsApp broadcast and SMS to our Trusted Circle. And in the Shop tab, Privacy Packaging Mode blurs items, while the locator connects rural and low-income girls to ₹1 Jan Aushadhi pads."* |

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
