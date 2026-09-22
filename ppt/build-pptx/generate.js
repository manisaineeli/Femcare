/* FemCare AI — native .pptx generator (pptxgenjs) */
const pptxgen = require("pptxgenjs");
const path = require("path");

const pptx = new pptxgen();
pptx.defineLayout({ name: "WIDE", width: 13.333, height: 7.5 });
pptx.layout = "WIDE";
pptx.author = "FemCare AI";
pptx.subject = "FemCare AI — Private Menstrual Health Companion";

const A = path.join(__dirname, "..", "assets");
const FLOWERS = path.join(A, "cover-flowers.jpg");
const WOMAN = path.join(A, "woman-smile.jpg");
const PRIVACY = path.join(A, "privacy-sec.jpg");
const FITNESS = path.join(A, "fitness-yoga.jpg");
const BOWL = path.join(A, "nutrition-bowl.jpg");
const WOMEN = path.join(A, "community-women.jpg");
const MOTHER = path.join(A, "mother-child.jpg");

const C = {
  bg: "120E17", card: "1E1727", card2: "251D30", border: "31253E",
  pink: "B5497A", pink2: "D65D95", rose: "F4A6B9", purple: "7C5A8C",
  amber: "F0B34C", emerald: "34D399", red: "F87171",
  text: "F6EFF9", muted: "A99BB8", dark: "0B0910",
};
const F = { head: "Arial", body: "Arial" };

/* ---------- helpers ---------- */
function bg(slide, opts = {}) {
  slide.background = { color: C.bg };
  if (opts.image) {
    slide.addImage({ path: opts.image, x: 0, y: 0, w: 13.333, h: 7.5, sizing: { type: "cover", w: 13.333, h: 7.5 } });
    slide.addShape("rect", { x: 0, y: 0, w: 13.333, h: 7.5, fill: { color: C.dark, transparency: opts.tint ?? 45 }, line: { type: "none" } });
  }
}
function card(slide, x, y, w, h, o = {}) {
  return slide.addShape("roundRect", {
    x, y, w, h, rectRadius: 0.12,
    fill: { color: o.fill ?? C.card }, line: { color: o.line ?? C.border, width: 1 },
    shadow: o.shadow === false ? undefined : { type: "outer", color: "000000", blur: 8, offset: 3, angle: 90, opacity: 0.35 },
  });
}
function txt(slide, text, x, y, w, h, o = {}) {
  return slide.addText(text, Object.assign({
    x, y, w, h, fontFace: o.font ?? F.body, fontSize: o.fs ?? 12,
    color: o.color ?? C.text, bold: o.bold ?? false, italic: o.italic ?? false,
    align: o.align ?? "left", valign: o.valign ?? "top",
    lineSpacingMultiple: o.ls ?? 1.15, breakLine: false, fit: o.fit ?? "shrink",
  }, o.more || {}));
}
function kicker(slide, text, y = 0.55) {
  slide.addShape("ellipse", { x: 0.55, y: y + 0.14, w: 0.14, h: 0.14, fill: { color: C.pink2 }, line: { type: "none" } });
  txt(slide, text, 0.82, y, 11.5, 0.32, { fs: 12, bold: true, color: C.rose, more: { charSpacing: 4 } });
}
function title(slide, text, y = 0.95) {
  txt(slide, text, 0.5, y, 12.3, 1.0, { fs: 34, bold: true, color: C.text, font: F.head });
}
function subtitle(slide, text, y = 1.85) {
  txt(slide, text, 0.55, y, 12.2, 0.8, { fs: 14, color: C.muted, valign: "top" });
}
function footer(slide, n) {
  slide.addText(`FemCare AI  ·  ${n}`, { x: 0.55, y: 7.12, w: 6, h: 0.3, fs: 9, color: "857590" });
  slide.addText(n, { x: 12.35, y: 7.12, w: 0.45, h: 0.3, fs: 11, color: C.rose, bold: true, align: "right" });
}
function imgCard(slide, src, x, y, w, h, caption, capTitle) {
  slide.addShape("roundRect", { x, y, w, h, rectRadius: 0.1, fill: { color: C.card }, line: { color: C.border, width: 1 } });
  slide.addImage({ path: src, x: x + 0.08, y: y + 0.08, w: w - 0.16, h: h - 0.16, sizing: { type: "cover", w: w - 0.16, h: h - 0.16 } });
  if (caption) {
    slide.addShape("roundRect", { x: x + 0.16, y: y + h - 0.78, w: w - 0.32, h: 0.62, rectRadius: 0.08, fill: { color: C.dark, transparency: 25 }, line: { color: C.rose, width: 0.5, transparency: 60 } });
    txt(slide, [{ text: (capTitle ? capTitle + "  " : ""), options: { bold: true, color: C.rose } }, { text: caption, options: { color: C.text } }], x + 0.3, y + h - 0.72, w - 0.62, 0.5, { fs: 10.5, valign: "middle" });
  }
}
function statCard(slide, x, y, w, h, big, tag, note, accent = C.pink, first = false) {
  card(slide, x, y, w, h);
  if (first) slide.addShape("ellipse", { x: x + w - 0.7, y: y - 0.35, w: 0.9, h: 0.9, fill: { color: accent, transparency: 60 }, line: { type: "none" } });
  txt(slide, big, x + 0.25, y + 0.18, w - 0.5, 0.55, { fs: 34, bold: true, color: C.rose, font: F.head });
  txt(slide, tag, x + 0.28, y + 0.78, w - 0.55, 0.3, { fs: 11, bold: true, color: accent, more: { charSpacing: 2 } });
  txt(slide, note, x + 0.28, y + 1.1, w - 0.55, h - 1.25, { fs: 11.5, color: C.muted });
}

/* ═══════════ SLIDE 1 · COVER ═══════════ */
let s = pptx.addSlide();
bg(s, { image: FLOWERS, tint: 45 });
s.addShape("rect", { x: 0, y: 0, w: 13.333, h: 7.5, fill: { color: C.dark, transparency: 25 }, line: { type: "none" } });
txt(s, "🌸  OFFLINE-FIRST  ·  PRIVATE  ·  AI-POWERED", 0, 1.15, 13.333, 0.4, { fs: 14, bold: true, color: C.rose, align: "center", more: { charSpacing: 4 } });
txt(s, "FemCare AI", 0, 2.15, 13.333, 1.5, { fs: 86, bold: true, font: F.head, align: "center", color: C.text });
txt(s, "AI", 8.05, 2.15, 2.2, 1.5, { fs: 86, bold: true, font: F.head, align: "left", color: C.rose });
txt(s, "The private menstrual-health companion for women & girls aged 14–45", 0, 3.95, 13.333, 0.5, { fs: 20, color: C.text, align: "center" });
txt(s, "Periods · Nutrition · Fitness · Clinical triage · Safety — all on her device. Nothing leaves it.", 0, 4.55, 13.333, 0.6, { fs: 15, color: C.muted, align: "center" });
["Zero Cloud", "Zero Servers", "100% Confidential"].forEach((b, i) => {
  s.addShape("roundRect", { x: 4.15 + i * 1.75, y: 5.55, w: 1.55, h: 0.5, rectRadius: 0.12, fill: { color: C.dark, transparency: 30 }, line: { color: C.rose, width: 1, transparency: 40 } });
  txt(s, b, 4.15 + i * 1.75, 5.57, 1.55, 0.46, { fs: 13, bold: true, color: C.rose, align: "center" });
});
txt(s, "Dignity · Privacy · Health in every cycle  —  Team FemCare 🌸", 0, 6.6, 13.333, 0.35, { fs: 12, italic: true, color: C.muted, align: "center" });

/* ═══════════ SLIDE 2 · PROBLEM ═══════════ */
s = pptx.addSlide(); bg(s);
kicker(s, "THE PROBLEM"); title(s, "Three crises menstruators face every single day");
subtitle(s, "Periods are treated as a private shame instead of the public-health issue they are.");
imgCard(s, PRIVACY, 7.15, 2.55, 5.6, 4.1, "Global period apps were caught selling intimate fertility & cycle data to ad networks.", "Privacy violation");
statCard(s, 0.55, 2.6, 6.4, 1.32, "1 in 10", "MEDICAL NEGLECT", "Women have PCOS — and over 50% of women in India suffer period-related anaemia, mostly undiagnosed.", C.pink, true);
statCard(s, 0.55, 4.04, 6.4, 1.32, "23 M", "PERIOD POVERTY", "Adolescent girls in India drop out of school yearly for lack of products, sanitation & guidance.", C.purple);
statCard(s, 0.55, 5.48, 6.4, 1.32, "4 in 5", "SILENT TABOO", "Girls miss school rather than talk about it — partners & fathers are never taught how to help.", C.amber);
footer(s, 2);

/* ═══════════ SLIDE 3 · SOLUTION ═══════════ */
s = pptx.addSlide(); bg(s);
kicker(s, "THE SOLUTION"); title(s, "Introducing FemCare AI — one tap to open");
card(s, 0.55, 2.55, 5.9, 4.15, { fill: "0E0A14" });
txt(s, "9:41", 0.8, 2.75, 2, 0.3, { fs: 10, bold: true, color: C.text });
txt(s, "FemCare", 0.8, 3.3, 3, 0.4, { fs: 19, bold: true, color: C.text, font: F.head });
txt(s, "Good morning, Ananya ✨", 0.8, 3.75, 4.5, 0.35, { fs: 13, color: C.muted });
s.addShape("roundRect", { x: 0.8, y: 4.2, w: 5.4, h: 1.55, rectRadius: 0.1, fill: { color: "23152C" }, line: { color: "3F2A4F", width: 1 } });
txt(s, "● CURRENT PHASE", 1.05, 4.36, 2.5, 0.28, { fs: 9, bold: true, color: C.rose });
txt(s, "Follicular Phase", 1.05, 4.68, 3, 0.4, { fs: 17, bold: true, font: F.head });
txt(s, "Energy rising — estrogen builds, mood brightens. Great time to learn & socialize.", 1.05, 5.1, 4.6, 0.55, { fs: 10, color: "CFC2D8" });
txt(s, "🔥 Period in 14 days", 1.05, 5.92, 3.5, 0.3, { fs: 10.5, bold: true });
txt(s, "Quick actions:  ◉ Log symptoms   ◉ Diet   ● Ask AI   ! SOS", 0.8, 6.35, 5.4, 0.3, { fs: 10, color: C.muted });
txt(s, "✓ Predictive cycle engine  —  next period, fertile window, ovulation", 6.75, 2.6, 6.0, 0.45, { fs: 14, color: C.text });
txt(s, "✓ Femi AI  —  offline clinical Q&A + symptom triage, no cloud", 6.75, 3.15, 6.0, 0.45, { fs: 14, color: C.text });
txt(s, "✓ Cycle-phased Indian nutrition & fitness plans", 6.75, 3.7, 6.0, 0.45, { fs: 14, color: C.text });
txt(s, "✓ One-tap Emergency SOS to her trusted circle", 6.75, 4.25, 6.0, 0.45, { fs: 14, color: C.text });
txt(s, "✓ 100% offline — sandboxed localStorage, zero network calls", 6.75, 4.8, 6.0, 0.45, { fs: 14, bold: true, color: C.rose });
imgCard(s, WOMAN, 6.75, 5.5, 6.0, 1.2, "Designed for her lived reality — dark-mode comfort, culturally-resonant, private by default.", "");
footer(s, 3);

/* ═══════════ SLIDE 4 · PRIVACY ═══════════ */
s = pptx.addSlide(); bg(s);
kicker(s, "PRIVACY-FIRST ARCHITECTURE"); title(s, "Your period data never leaves her device");
subtitle(s, "No accounts. No cloud. No analytics pings. The whole AI & knowledge base runs inside the browser.");
card(s, 0.55, 2.55, 5.9, 4.15, { fill: "0E0A14" });
txt(s, "🛡️  Privacy Shield", 0.85, 2.75, 5, 0.4, { fs: 18, bold: true, font: F.head });
txt(s, "Live zero-network verification · Local only", 0.85, 3.2, 5, 0.3, { fs: 11, color: C.muted });
["Network requests ......... 0", "Cloud accounts ........... None", "Data stored .............. This device", "Sandbox ................. femcare_state_v1"].forEach((r, i) => {
  s.addShape("rect", { x: 0.85, y: 3.75 + i * 0.42, w: 5.3, h: 0.34, fill: { color: C.card }, line: { color: C.border, width: 0.5 } });
  txt(s, r, 1.0, 3.8 + i * 0.42, 5.0, 0.3, { fs: 11, color: C.text });
});
s.addShape("roundRect", { x: 0.85, y: 5.75, w: 5.3, h: 0.6, rectRadius: 0.1, fill: { color: C.card }, line: { color: C.emerald, width: 1, transparency: 30 } });
txt(s, "● LIVE NETWORK MONITOR — 0 requests · 0 sockets · 0 calls", 1.0, 5.88, 5.1, 0.3, { fs: 10.5, bold: true, color: C.emerald });
txt(s, "Erase all data permanently →", 0.85, 6.45, 5, 0.3, { fs: 11, bold: true, color: C.rose });
card(s, 6.75, 2.55, 6.0, 1.2); txt(s, "🛡️  Privacy Shield — one tap, live proof", 6.95, 2.75, 5.5, 0.4, { fs: 15, bold: true }); txt(s, "Network monitor + raw local JSON inspector + permanent wipe.", 6.95, 3.2, 5.5, 0.4, { fs: 11.5, color: C.muted });
card(s, 6.75, 3.9, 6.0, 1.2); txt(s, "🗄️  Sandboxed local storage", 6.95, 4.1, 5.5, 0.4, { fs: 15, bold: true }); txt(s, "Everything lives in femcare_state_v1 — encrypted at rest, invisible to the network.", 6.95, 4.55, 5.5, 0.4, { fs: 11.5, color: C.muted });
card(s, 6.75, 5.25, 6.0, 1.45); txt(s, "🧠  Femi AI is 100% on-device", 6.95, 5.45, 5.5, 0.4, { fs: 15, bold: true }); txt(s, "100+ curated clinical Q&A pairs + triage matrix run locally — even on airplane mode.", 6.95, 5.9, 5.5, 0.5, { fs: 11.5, color: C.muted });
footer(s, 4);

/* ═══════════ SLIDE 5 · DASHBOARD TOUR ═══════════ */
s = pptx.addSlide(); bg(s);
kicker(s, "PRODUCT TOUR · 01"); title(s, "A dashboard that understands her cycle");
[
  ["🌗  Phase intelligence", "Menstrual → Follicular → Ovulatory → Luteal, with day-of-cycle, progress ring & energy guidance.", "Day 13 · Rising"],
  ["🔮  Period & fertile-window prediction", "Knaus–Ogino modified algorithm forecasts the next period date and the 6-day fertile window.", null],
  ["❤️  Health score at a glance", "Sleep, hydration & activity compose a daily 0–100 score — plus a fact from a 365-day evidence bank.", null],
  ["⚡  Everything one thumb-tap away", "Symptom logger, Diet, Femi AI and SOS sit in the quick-actions grid — zero friction in a crisis.", null],
].forEach((c, i) => {
  const y = 2.55 + i * 0.95;
  card(s, 0.55, y, 6.3, 0.85);
  txt(s, c[0], 0.8, y + 0.1, 5.8, 0.35, { fs: 14.5, bold: true });
  txt(s, c[1], 0.8, y + 0.43, 5.8, 0.35, { fs: 10.5, color: C.muted });
  if (c[2]) { s.addShape("roundRect", { x: 5.2, y: y + 0.22, w: 1.45, h: 0.4, rectRadius: 0.2, fill: { color: C.pink, transparency: 20 }, line: { color: C.pink, width: 0.5 } }); txt(s, c[2], 5.2, y + 0.28, 1.45, 0.3, { fs: 10, bold: true, color: C.rose, align: "center" }); }
});
imgCard(s, WOMAN, 7.15, 2.55, 5.6, 4.15, "Built for her lived reality — culturally-resonant content with privacy as the default.", "");
footer(s, 5);

/* ═══════════ SLIDE 6 · TRACKER & TRIAGE ═══════════ */
s = pptx.addSlide(); bg(s);
kicker(s, "PRODUCT TOUR · 02"); title(s, "Track cycles. Get clinical triage — offline.");
card(s, 0.55, 2.15, 6.1, 2.25, { fill: "0E0A14" });
txt(s, "September 2026", 0.8, 2.28, 3.5, 0.35, { fs: 15, bold: true, font: F.head });
const days = [["1","2","3","4","5","6","7"],["8","9","10","11","12","13","14"],["15","16","17","18","19","20","21"],["22","23","24","25","26","27","28"]];
days.forEach((row, ri) => row.forEach((d, ci) => {
  let fill = "FFFFFF", col = "2A1D33";
  if (["6","7","8","9"].includes(d)) { fill = C.pink; col = C.text; }
  if (d == "15") { fill = C.amber; col = "2A1503"; }
  s.addText(d, { x: 0.8 + ci * 0.55, y: 2.75 + ri * 0.36, w: 0.5, h: 0.3, fs: 10.5, align: "center", bold: ["6","7","8","9","15"].includes(d), color: col, fill: fill });
  if (["11","12","13","14"].includes(d)) s.addShape("ellipse", { x: 0.8 + ci * 0.55, y: 2.75 + ri * 0.36, w: 0.5, h: 0.3, fill: { type: "none" }, line: { color: "A78BFA", width: 1.2 } });
}));
txt(s, "● Period   ◯ Fertile   ● Ovulation", 0.8, 4.3, 5, 0.3, { fs: 9.5, color: C.muted });
card(s, 0.55, 4.65, 6.1, 1.75, { fill: "0E0A14" });
txt(s, "Log for today · Day 13", 0.8, 4.78, 4, 0.3, { fs: 11, bold: true });
txt(s, "🌿 Flow · Medium        😖 Pain · 6/10", 0.8, 5.15, 5, 0.35, { fs: 11.5 });

card(s, 6.85, 2.15, 5.95, 2.0, { fill: "0E0A14" });
txt(s, "✚  Femi · Symptom Triage", 7.1, 2.28, 4.5, 0.35, { fs: 14, bold: true });
txt(s, "Clinical heuristic · runs 100% offline", 7.1, 2.62, 4.5, 0.3, { fs: 10, color: C.muted });
txt(s, "Pain level", 7.1, 2.95, 2, 0.3, { fs: 11, color: C.muted });
txt(s, "8 / 10", 9.1, 2.95, 1.3, 0.3, { fs: 11, bold: true, color: C.rose, align: "right" });
s.addShape("roundRect", { x: 7.1, y: 3.28, w: 5.4, h: 0.1, rectRadius: 0.05, fill: { color: "2A1D33" }, line: { type: "none" } });
s.addShape("roundRect", { x: 7.1, y: 3.28, w: 4.3, h: 0.1, rectRadius: 0.05, fill: { color: C.red }, line: { type: "none" } });
txt(s, "⚠ Dizziness  ✓   ⚠ Fever  ✓   ⚠ Soaking pads  ✓", 7.1, 3.5, 5.4, 0.3, { fs: 9.5, color: "FDA4AF" });
card(s, 6.85, 4.35, 5.95, 2.05, { fill: "2A1005", line: C.red });
txt(s, "🚨 CRITICAL — SEEK EMERGENCY CARE", 7.1, 4.5, 5.4, 0.35, { fs: 15, bold: true, color: "FECDD3" });
txt(s, "Severe pain + red flags may indicate heavy bleeding or infection. Go to the nearest hospital.", 7.1, 4.95, 5.4, 0.6, { fs: 10.5, color: "FECDD3" });
txt(s, "📞 112 National Emergency      🚑 102 Ambulance", 7.1, 5.7, 5.4, 0.35, { fs: 12, bold: true, color: C.text });
footer(s, 6);

/* ═══════════ SLIDE 7 · DIET & FITNESS ═══════════ */
s = pptx.addSlide(); bg(s);
kicker(s, "PRODUCT TOUR · 03"); title(s, "Nutrition & fitness that ride her hormones");
imgCard(s, BOWL, 0.55, 2.4, 7.0, 2.25, "5-ingredient iron-boosting recipes — localized, affordable, culturally familiar.", "Palak Dal Khichdi · Til-Gur Bites · Haldi Doodh");
card(s, 0.55, 4.85, 3.4, 1.35);
txt(s, "🏃 Cycle-Phased Fitness", 0.8, 4.95, 2.9, 0.35, { fs: 12.5, bold: true });
txt(s, "Menstrual — Restorative yoga\nFollicular — High-intensity strength\nOvulatory — HIIT · peak power\nLuteal — Pilates · steady cardio", 0.8, 5.3, 3.0, 0.9, { fs: 9.5, color: C.muted });
imgCard(s, FITNESS, 4.2, 4.85, 3.35, 1.35, "", "");
card(s, 7.75, 2.4, 5.0, 1.55);
txt(s, "⚖️ Luteal water-weight — normal, not fat", 8.0, 2.52, 4.4, 0.35, { fs: 13.5, bold: true });
// simple chart
const pts = [[0.2,1.05],[0.75,0.95],[1.3,0.82],[1.83,0.75],[2.4,0.68],[2.62,0.62],[3.0,0.5],[3.4,0.4]];
s.addShape("line", { x: 8.0, y: 4.35, w: 4.4, h: 0, line: { color: C.border, width: 1 } });
pts.slice(0, -1).forEach((p, i) => {
  s.addShape("line", { x: 8.0 + p[0] * 0.9, y: 4.62 - p[1] * 0.6, w: (pts[i+1][0]-p[0])*0.9, h: (pts[i+1][1]-p[1]) * -0.6, line: { color: C.pink, width: 2 } });
});
s.addShape("ellipse", { x: 8.0 + 2.62*0.9 - 0.05, y: 4.62 - 0.62*0.6 - 0.05, w: 0.1, h: 0.1, fill: { color: C.amber }, line: { type: "none" } });
txt(s, "+1.2 kg fluid — clears after period", 8.0, 4.62, 4.4, 0.3, { fs: 10, color: C.amber, bold: true });
txt(s, "The chart stops panic & crash dieting — evidence that cycle weight gain is normal.", 8.0, 4.0, 4.4, 0.4, { fs: 10, color: C.muted });
footer(s, 7);

/* ═══════════ SLIDE 8 · SAFETY & SHOP ═══════════ */
s = pptx.addSlide(); bg(s);
kicker(s, "PRODUCT TOUR · 04"); title(s, "Crisis-ready safety & a shame-free economy");
card(s, 0.55, 2.35, 3.9, 2.4, { fill: "0E0A14" });
s.addShape("ellipse", { x: 1.2, y: 2.55, w: 1.15, h: 1.15, fill: { color: C.red, transparency: 10 }, line: { type: "none" } });
txt(s, "🆘", 1.32, 2.72, 0.9, 0.8, { fs: 26, align: "center" });
txt(s, "HOLD SOS", 1.1, 3.85, 1.3, 0.35, { fs: 13, bold: true, align: "center" });
txt(s, "Trusted Circle — Mom ✓ · Best friend ✓ · Brother ●", 0.8, 4.62, 3.3, 0.3, { fs: 9.5, color: C.muted });
card(s, 4.75, 2.35, 3.9, 2.4, { fill: "0E0A14" });
txt(s, "📍 Free-Pad Locator", 5.0, 2.5, 3.4, 0.35, { fs: 13, bold: true });
txt(s, "Jan Aushadhi — Suvidha pads at ₹1", 5.0, 2.9, 3.4, 0.32, { fs: 11.5, bold: true, color: C.amber });
txt(s, "ASHA / Anganwadi free pads & guidance\nRed Cross emergency pad banks", 5.0, 3.3, 3.4, 0.9, { fs: 10, color: C.muted });
txt(s, "9,500+ mapped access points", 5.0, 4.42, 3.4, 0.3, { fs: 10, color: C.emerald, bold: true });
card(s, 8.95, 2.35, 3.85, 2.4, { fill: "0E0A14" });
txt(s, "🛍 Shop · Privacy Packaging", 9.2, 2.5, 3.2, 0.35, { fs: 13, bold: true });
txt(s, "🍶 Menstrual cups\n🌿 Organic bamboo pads\n— product names blurred by default", 9.2, 2.9, 3.2, 1.1, { fs: 10.5, color: C.muted });
txt(s, "Discreet affiliate commerce — no data sold", 9.2, 4.42, 3.2, 0.3, { fs: 10, bold: true, color: C.rose });
[
  "📡 Hold-to-SOS broadcasts WhatsApp + SMS to the trusted circle, with a silent panic code",
  "💰 Period-poverty fix — locator maps Jan Aushadhi Kendras selling ₹1 Suvidha pads",
  "🕶 Privacy Packaging blurs sensitive product names in the shop",
  "🚑 Direct helplines — 112 national emergency, 102 ambulance, one tap away",
].forEach((b, i) => {
  s.addShape("roundRect", { x: 0.55, y: 5.0 + i * 0.52, w: 12.2, h: 0.45, rectRadius: 0.1, fill: { color: C.card }, line: { color: C.border, width: 0.75 } });
  txt(s, b, 0.8, 5.07 + i * 0.52, 11.8, 0.32, { fs: 12, color: C.text });
});
footer(s, 8);

/* ═══════════ SLIDE 9 · MULTILINGUAL ═══════════ */
s = pptx.addSlide(); bg(s);
kicker(s, "INCLUSIVITY"); title(s, "In her language. For everyone who cares for her.");
txt(s, "One-tap toggle:  English · हिन्दी · தமிழ் · తెలుగు — every phase description, fact, recipe & advice translates instantly.", 0.55, 1.9, 12.2, 0.5, { fs: 14, color: C.muted });
["EN  English", "हिन्दी  Hindi", "தமிழ்  Tamil", "తెలుగు  Telugu"].forEach((l, i) => {
  s.addShape("roundRect", { x: 0.55 + i * 1.85, y: 2.55, w: 1.7, h: 0.55, rectRadius: 0.12, fill: { color: i === 0 ? C.pink : C.card }, line: { color: i === 0 ? C.pink : C.border, width: 1 } });
  txt(s, l, 0.55 + i * 1.85, 2.63, 1.7, 0.4, { fs: 12, bold: i === 0, color: i === 0 ? "FFFFFF" : C.muted, align: "center" });
});
card(s, 0.55, 3.45, 6.1, 3.3, { fill: "150D1C" });
txt(s, "🔵 Follicular Phase · Energy Rising 🚀", 0.85, 3.65, 5.5, 0.4, { fs: 15, bold: true });
txt(s, "Estrogen is climbing — great for learning, workouts & big conversations. Switch languages live in the app — the entire UI re-renders instantly.", 0.85, 4.12, 5.5, 0.9, { fs: 11.5, color: C.muted });
txt(s, "📖 Journal · Voice-enabled  🎙", 0.85, 5.25, 5.5, 0.35, { fs: 12.5, bold: true });
txt(s, "\u201CToday felt heavy but I moved more… the app correlated my mood with cycle day 22 — luteal dip. It's not all in my head.\u201D", 0.85, 5.65, 5.5, 0.8, { fs: 10.5, italic: true, color: "CFC2D8" });
card(s, 6.95, 3.45, 5.85, 1.5, { fill: "2C103A", line: "A78BFA" });
txt(s, "🤝 Partner Empathy Mode", 7.2, 3.6, 5.2, 0.4, { fs: 15, bold: true });
txt(s, "Dedicated mode for partners, brothers & fathers — learns how to support her through each phase. Breaks the taboo at the family level.", 7.2, 4.05, 5.2, 0.8, { fs: 11, color: "C4B5FD" });
card(s, 6.95, 5.15, 5.85, 1.6);
txt(s, "📚 365 Facts + Ice-Breaker Quizzes", 7.2, 5.3, 5.2, 0.4, { fs: 15, bold: true });
txt(s, "A daily evidence-based fact bank with sources, and playful quizzes that turn \u201Cthe talk\u201D into something shareable & destigmatized.", 7.2, 5.75, 5.2, 0.9, { fs: 11, color: C.muted });
footer(s, 9);

/* ═══════════ SLIDE 10 · COMPETITIVE ═══════════ */
s = pptx.addSlide(); bg(s);
kicker(s, "MARKET"); title(s, "Where incumbent apps fail — FemCare wins");
const rows = [
  ["Data storage & privacy", "✔ 100% on-device sandboxed localStorage", "✖ Cloud login, data on servers", "✖ Online, synced to backend", "✖ Often ad-tracked"],
  ["Network usage", "✔ 0 requests — verified live monitor", "✖ Always online", "✖ Cloud-first", "✖ Varies / ad networks"],
  ["Language support", "✔ EN · हिन्दी · தமிழ் · తెలుగు (12 next)", "✖ EN + limited locales", "✖ EN core", "✖ None"],
  ["Indian nutrition", "✔ Phase-based — Khichdi, Til-Gur, ₹1 pads", "✖ Generic / Western", "✖ Generic", "✖ None"],
  ["Emergency SOS", "✔ Trusted-circle WhatsApp/SMS + 112/102", "▲ Basic", "▲ No live relay", "✖ None"],
  ["Cost", "✔ Free core forever", "▲ Freemium paywall", "▲ Subscription", "▲ Free (data sold)"],
];
s.addTable(rows, {
  x: 0.55, y: 2.15, w: 12.2, colW: [3.0, 3.7, 1.83, 1.85, 1.82],
  fill: { color: "1E1727" }, border: { type: "solid", color: "31253E", pt: 0.75 },
  fontFace: F.body, fontSize: 10.5, color: C.text, valign: "middle", align: "left",
  rowH: 0.62, autoPage: false, margin: [0.08, 0.12, 0.08, 0.12],
});
// header row + FemCare column emphasis
s.addShape("rect", { x: 0.55, y: 2.15, w: 12.2, h: 0.5, fill: { color: C.pink, transparency: 70 }, line: { type: "none" } });
s.addShape("rect", { x: 3.55, y: 2.15, w: 3.7, h: 3.9, fill: { color: C.pink, transparency: 65 }, line: { type: "none" } });
txt(s, "FemCare AI — offline-first · privacy by design", 3.75, 2.22, 3.4, 0.35, { fs: 13, bold: true, color: C.text });
txt(s, "The difference isn't a feature list — it's who owns the data. We built the trust layer others treat as an afterthought.", 0.55, 6.62, 12.2, 0.5, { fs: 13, italic: true, color: C.muted });
footer(s, 10);

/* ═══════════ SLIDE 11 · IMPACT ═══════════ */
s = pptx.addSlide(); bg(s);
kicker(s, "IMPACT"); title(s, "Health, dignity & equity at scale");
statCard(s, 0.55, 2.55, 3.0, 2.2, "23M", "GIRLS KEPT IN SCHOOL", "Adolescents at risk of period-poverty dropout stay learning via free-pad locator & education.", C.pink, true);
statCard(s, 3.7, 2.55, 3.0, 2.2, "9.5K+", "FREE PAD ACCESS POINTS", "Jan Aushadhi, ASHA & Anganwadi centres and Red Cross banks mapped in-app.", C.purple);
statCard(s, 6.85, 2.55, 3.0, 2.2, "50%+", "ANAEMIA AWARENESS LIFT", "Iron-boosting recipes + Vitamin-C pairing tackle period-related anaemia.", C.amber);
imgCard(s, WOMEN, 10.0, 2.55, 2.8, 2.2, "De-stigmatization — from hostels to villages.", "");
imgCard(s, MOTHER, 0.55, 5.0, 7.0, 1.9, "Reaching the last mile — from urban campuses to ASHA circles.", "");
card(s, 7.75, 5.0, 5.0, 1.9);
txt(s, "🌾 Beyond the app", 8.0, 5.15, 4.5, 0.35, { fs: 14, bold: true });
txt(s, "Partnerships with Myna Mahila, Red Dot Foundation & SEWA bring FemCare into real communities — turning privacy-tech into public-health change.", 8.0, 5.55, 4.5, 1.2, { fs: 11.5, color: C.muted });
footer(s, 11);

/* ═══════════ SLIDE 12 · BUSINESS MODEL ═══════════ */
s = pptx.addSlide(); bg(s);
kicker(s, "BUSINESS MODEL"); title(s, "Privacy-preserving monetization");
subtitle(s, "We never sell data — we sell value. Three revenue engines, each compatible with \u201Cyour period data never leaves your device.\u201D");
[
  [1, "🆓  Freemium Offline App", "Core tracking, AI triage & SOS are 100% free forever. Premium unlocks advanced analytics & deep journaling.", C.emerald],
  [2, "🛍  Discreet Affiliate Commerce", "Commission on sustainable period-care brands — silicone cups, organic bamboo pads — with privacy-safe redirection, never personal data.", C.amber],
  [3, "🏛  B2B Campus & Corporate Wellness", "Offline-packaged health licensing for universities, schools & workplaces — bulk dignity, zero data leaving their premises.", "A5B4FC"],
].forEach((m, i) => {
  const x = 0.55 + i * 4.15;
  card(s, x, 3.0, 3.95, 3.3);
  txt(s, "REVENUE " + m[0], x + 0.3, 3.25, 3.2, 0.3, { fs: 11, bold: true, color: C.rose, more: { charSpacing: 2 } });
  txt(s, m[1], x + 0.3, 3.6, 3.3, 0.8, { fs: 17, bold: true, font: F.head });
  txt(s, m[2], x + 0.3, 4.5, 3.3, 1.6, { fs: 11.5, color: C.muted });
});
footer(s, 12);

/* ═══════════ SLIDE 13 · GO-TO-MARKET ═══════════ */
s = pptx.addSlide(); bg(s);
kicker(s, "GO-TO-MARKET"); title(s, "3 phases to 100,000 users in 6 months");
const phases = [
  ["PHASE 1 · M1–M3", "Campus ignition", "Brand ambassadors across major Indian universities & women's hostels — referral circles go viral through hostel WhatsApp groups.", C.pink],
  ["PHASE 2 · M4–M6", "NGO & public-health rails", "Partner with Myna Mahila, Red Dot Foundation & SEWA for distribution through ASHA & Anganwadi networks.", C.purple],
  ["PHASE 3 · M6+", "Grassroots amplification", "Privacy advocates, women's-health creators & campus-to-city events turn the privacy-first story into national momentum.", C.amber],
];
phases.forEach((p, i) => {
  const x = 0.55 + i * 4.3;
  card(s, x, 3.3, 4.1, 2.9);
  s.addShape("ellipse", { x: x + 0.3, y: 3.05, w: 0.34, h: 0.34, fill: { color: p[3] }, line: { type: "none" } });
  txt(s, p[0], x + 0.3, 3.6, 3.5, 0.3, { fs: 11.5, bold: true, color: p[3] });
  txt(s, p[1], x + 0.3, 3.95, 3.5, 0.4, { fs: 16, bold: true, font: F.head });
  txt(s, p[2], x + 0.3, 4.45, 3.5, 1.5, { fs: 11, color: C.muted });
});
if (phases.length > 1) {
  s.addShape("line", { x: 3.0, y: 3.22, w: 0.5, h: 0, line: { color: C.pink, width: 1.5 } });
  s.addShape("line", { x: 7.4, y: 3.22, w: 0.5, h: 0, line: { color: C.purple, width: 1.5 } });
}
footer(s, 13);

/* ═══════════ SLIDE 14 · ROADMAP ═══════════ */
s = pptx.addSlide(); bg(s);
kicker(s, "PRODUCT ROADMAP"); title(s, "Next 3 quarters — still offline-first");
[
  ["Q1 · 2027", "🗣  Smarter Femi", "Voice-note AI transcription v2 + smart wearable Bluetooth export — synced locally, never through the cloud.", C.rose],
  ["Q2 · 2027", "🌏  12 languages", "Expand to 8 more Indian languages — मराठी, বাংলা, ગુજરાતી, ಕನ್ನಡ and more — plus transliteration.", "A78BFA"],
  ["Q3 · 2027", "🔗  Circle sync w/o internet", "Offline encrypted peer-to-peer sync via Bluetooth & QR codes — family group-share that never touches a server.", C.amber],
].forEach((m, i) => {
  const x = 0.55 + i * 4.3;
  card(s, x, 3.35, 4.1, 2.85);
  txt(s, m[0], x + 0.3, 3.6, 3.5, 0.35, { fs: 13, bold: true, color: m[3] });
  txt(s, m[1], x + 0.3, 4.05, 3.5, 0.5, { fs: 17, bold: true, font: F.head });
  txt(s, m[2], x + 0.3, 4.65, 3.5, 1.4, { fs: 11, color: C.muted });
});
footer(s, 14);

/* ═══════════ SLIDE 15 · THE ASK ═══════════ */
s = pptx.addSlide(); bg(s);
s.addShape("ellipse", { x: 0.5, y: 0.5, w: 4.5, h: 4.5, fill: { color: C.pink, transparency: 86 }, line: { type: "none" } });
s.addShape("ellipse", { x: 9.5, y: 4.8, w: 4.5, h: 4.5, fill: { color: C.purple, transparency: 88 }, line: { type: "none" } });
txt(s, "🌸  THE ASK", 0, 0.9, 13.333, 0.4, { fs: 14, bold: true, color: C.rose, align: "center", more: { charSpacing: 4 } });
txt(s, "Help us take FemCare to every corner of India", 0, 1.5, 13.333, 0.8, { fs: 36, bold: true, font: F.head, align: "center" });
txt(s, "₹1.5 Cr", 0, 2.7, 13.333, 1.4, { fs: 96, bold: true, font: F.head, align: "center", color: C.rose });
txt(s, "≈ $180K USD · Seed & partnerships", 0, 4.3, 13.333, 0.4, { fs: 16, color: C.muted, align: "center" });
["🚜 Rural outreach — scale pad-locator & local content", "🩺 Clinical pilots — with gynecological associations", "🗣 8 more languages — localized public-health content"].forEach((p, i) => {
  s.addShape("roundRect", { x: 2.35 + i * 3.1, y: 5.05, w: 2.95, h: 0.7, rectRadius: 0.12, fill: { color: C.card }, line: { color: C.border, width: 1 } });
  txt(s, p, 2.35 + i * 3.1, 5.18, 2.95, 0.5, { fs: 10.5, align: "center", valign: "middle" });
});
txt(s, "Dignity, privacy & health — in every cycle.   Thank you 🌸   — Team FemCare", 0, 6.55, 13.333, 0.4, { fs: 13, italic: true, color: C.muted, align: "center" });

pptx.writeFile({ fileName: path.join(__dirname, "..", "femcare-ai-pitch.pptx") }).then(() => {
  console.log("✅ femcare-ai-pitch.pptx written to ppt/");
}).catch((e) => { console.error(e); process.exit(1); });