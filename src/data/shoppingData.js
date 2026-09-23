// FemCare AI - Discreet Period Care Catalog, Medicines & Health Awareness
// Privacy-first: Zero user purchase history stored on any server.

export const SHOPPING_PRODUCTS = [
  {
    id: "prod-1",
    name: "Jan Aushadhi Suvidha Biodegradable Pads",
    brand: "Govt of India (PMBJP)",
    category: "pads",
    type: "Sanitary Napkins",
    price: 4, // 4 pads pack for ₹4 (₹1/pad!)
    regularMarketPrice: 40,
    unit: "Pack of 4 (₹1 per pad)",
    ecoFriendly: true,
    biodegradable: "100% Oxo-Biodegradable",
    description: "Govt-subsidized high-quality sanitary napkins made with biodegradable cellulose fibers. Non-toxic, soft on skin, and 90% cheaper than commercial plastic pads.",
    badge: "Government Subsidized • ₹1/Pad",
    discreetPack: "Standard Brown Eco Paper Packaging",
    image: "./products/suvidha-pads.jpg",
    inStock: true
  },
  {
    id: "prod-2",
    name: "PureSilicone Medical Grade Menstrual Cup",
    brand: "FemCare Eco",
    category: "cups",
    type: "Menstrual Cup",
    price: 349,
    regularMarketPrice: 799,
    unit: "1 Cup + Breathable Cotton Pouch",
    ecoFriendly: true,
    biodegradable: "Reusable for up to 10 years",
    description: "100% US-FDA approved medical-grade silicone. Leak-free protection for up to 12 hours. Zero odor, rash-free, and saves thousands of single-use pads.",
    badge: "Zero-Waste Hero",
    discreetPack: "Discreet Matte Black Box",
    image: "./products/menstrual-cup.jpg",
    inStock: true
  },
  {
    id: "prod-3",
    name: "Bamboo Organic Cotton Day & Night Pads",
    brand: "Nua / Carmesi Organic",
    category: "pads",
    type: "Organic Pads",
    price: 189,
    regularMarketPrice: 249,
    unit: "Pack of 12 (Wings)",
    ecoFriendly: true,
    biodegradable: "70% Plant Biodegradable",
    description: "Ultra-thin, bleach-free, chlorine-free organic bamboo core with zero artificial fragrances. Includes individual disposal wrappers with red dot stickers.",
    badge: "Chlorine-Free & Gentle",
    discreetPack: "Plain Cardboard Shipper",
    image: "./products/organic-pads.jpg",
    inStock: true
  },
  {
    id: "prod-4",
    name: "Leak-Proof Seamless Period Underwear",
    brand: "FemCare Comfort",
    category: "underwear",
    type: "Period Panty",
    price: 499,
    regularMarketPrice: 899,
    unit: "Pack of 2 (Absorbs 2-3 tampons)",
    ecoFriendly: true,
    biodegradable: "Washable & Reusable 100+ times",
    description: "4-layer absorbent, moisture-wicking technology designed for heavy flow nights and sports. No chafing, no plastic crinkling.",
    badge: "Nighttime Security",
    discreetPack: "Opaque Bubble Mailer",
    image: "./products/period-panties.jpg",
    inStock: true
  },
  {
    id: "prod-5",
    name: "Ayurvedic Cramp Relief Roll-On & Heat Patch",
    brand: "Sirona / FemHerbal",
    category: "wellness",
    type: "Pain Management",
    price: 199,
    regularMarketPrice: 299,
    unit: "50ml Roll-on + 2 Air-Activated Heat Patches",
    ecoFriendly: false,
    biodegradable: "Natural Herbal Actives",
    description: "Infused with Eucalyptus, Camphor, and Menthol oils. Delivers 8 hours of sustained soothing thermal warmth for severe pelvic cramps without medicines.",
    badge: "Instant 15-Min Relief",
    discreetPack: "Unmarked Kraft Envelope",
    image: "./products/heatpatch-rollon.jpg",
    inStock: true
  },
  {
    id: "prod-6",
    name: "100% Organic Cotton Cardboard Applicator Tampons",
    brand: "Sirona Organic",
    category: "tampons",
    type: "Tampons",
    price: 240,
    regularMarketPrice: 320,
    unit: "Pack of 16 Regular/Super",
    ecoFriendly: true,
    biodegradable: "Biodegradable Cardboard Applicator",
    description: "Pure certified organic cotton fibers without synthetic rayon or chemical binders. Smooth insertion with biodegradable cardboard applicator.",
    badge: "Hypoallergenic",
    discreetPack: "Discreet Outer Sleeve",
    image: "./products/organic-tampons.jpg",
    inStock: true
  },
  {
    id: "prod-7",
    name: "pH-Balanced Intimate Feminine Wash",
    brand: "Evereve / Sirona",
    category: "hygiene",
    type: "Intimate Hygiene",
    price: 199,
    regularMarketPrice: 249,
    unit: "200ml Pump Bottle",
    ecoFriendly: false,
    biodegradable: "Soap-Free & Paraben-Free",
    description: "Gentle, gynaec-tested cleanser at pH ~5 for daily use during periods, post-workout or before bed. No fragrance, no SLS — keeps the vulva fresh without stripping natural flora.",
    badge: "pH 5 • Gynaec-Tested",
    discreetPack: "Plain Outer Carton",
    image: "./products/intimate-wash.jpg",
    inStock: true
  },
  {
    id: "prod-8",
    name: "Period Stain Remover Pen",
    brand: "Sirona / Rubifresh",
    category: "hygiene",
    type: "Stain Care",
    price: 149,
    regularMarketPrice: 199,
    unit: "10ml Pre-Treat Pen",
    ecoFriendly: true,
    biodegradable: "Plant Enzymes • Greywater Safe",
    description: "Blood is protein — dab before it sets, leave 10 minutes, then wash normally. Works on underwear, sheets and clothes; fits in a pencil pouch for school/office emergencies.",
    badge: "Treat-Then-Wash",
    discreetPack: "Plain Kraft Box",
    image: "./products/stain-remover-pen.jpg",
    inStock: true
  },
  {
    id: "prod-9",
    name: "Biodegradable Pad Disposal Bags",
    brand: "FemCare Eco",
    category: "hygiene",
    type: "Disposal & Travel",
    price: 99,
    regularMarketPrice: 149,
    unit: "Roll of 30 Bags",
    ecoFriendly: true,
    biodegradable: "Compostable Corn-Starch",
    description: "Opaque, odor-locking corn-starch bags — wrap, roll, toss. Perfect for hostels, travel and public toilets where bins are open. Discreet enough to carry a week's worth.",
    badge: "Odor-Lock",
    discreetPack: "Flat Matte Pouch",
    image: "./products/disposal-bags.jpg",
    inStock: true
  },
  {
    id: "prod-10",
    name: "Microwavable Cramp Heating Belt",
    brand: "FemCare Comfort",
    category: "wellness",
    type: "Heat Therapy",
    price: 399,
    regularMarketPrice: 599,
    unit: "1 Belt + Washable Cover",
    ecoFriendly: true,
    biodegradable: "Reusable • No Electricity",
    description: "Wheat + lavender fill gives ~20 minutes of steady 40–45°C warmth — the same relief many get from painkillers, but drug-free. Wear it under clothes while studying or sleeping.",
    badge: "Drug-Free Relief",
    discreetPack: "Zip Cotton Pouch",
    image: "./products/heating-belt.jpg",
    inStock: true
  }
];

// ── Period Medicines & Pain Relief (Education only — NOT a prescription) ──
export const PERIOD_MEDICINES = [
  {
    id: "med-1",
    name: "Mefenamic Acid 250 mg",
    example: "Brands like Meftal-P / generic",
    category: "NSAID",
    access: "Ask a pharmacist",
    price: 32,
    unit: "Strip of 10 tablets",
    image: "./products/med-mefenamic.jpg",
    usedFor: ["Period cramps (dysmenorrhea)", "Short-term heavy bleeding (as advised)", "Headache & body ache"],
    how: "Blocks prostaglandins — the chemicals that make the uterine wall contract hard — so cramps soften within an hour.",
    dose: "Usually 500 mg at onset, then 250 mg every 6–8 hours with food — maximum 3 days, only if a doctor/pharmacist agrees.",
    safety: "Take with food or milk. Avoid with stomach ulcers, asthma, kidney problems or in pregnancy without medical advice."
  },
  {
    id: "med-2",
    name: "Ibuprofen 400 mg",
    example: "Brands like Brufen / generic",
    category: "NSAID",
    access: "Over the counter",
    price: 19,
    unit: "Strip of 10 tablets",
    image: "./products/med-ibuprofen.jpg",
    usedFor: ["Period & lower-back cramps", "Muscle pain", "Inflammation & swelling"],
    how: "Stops the pain-signal chemicals (prostaglandins) right where the inflammation is.",
    dose: "400 mg every 6–8 hours with food — use the shortest duration that helps (usually first 1–2 days of periods).",
    safety: "Never on an empty stomach. Caution with gastritis/ulcer, asthma or kidney disease; avoid in the third trimester of pregnancy."
  },
  {
    id: "med-3",
    name: "Paracetamol 500 mg",
    example: "Brands like Crocin / Dolo",
    category: "Analgesic",
    access: "Over the counter",
    price: 24,
    unit: "Strip of 15 tablets",
    image: "./products/med-paracetamol.jpg",
    usedFor: ["Mild period pain", "Fever", "Headache"],
    how: "Lowers pain and temperature signals in the brain — gentle on the stomach and doesn't thin the blood.",
    dose: "500 mg every 6 hours if needed — max 4 g (8 tablets) in 24 h for a healthy adult; less if you have liver disease or drink alcohol.",
    safety: "Always check cold & flu combos for hidden paracetamol — doses stack silently and can seriously harm the liver."
  },
  {
    id: "med-4",
    name: "Drotaverine 40 mg",
    example: "Brands like Drotin / generic",
    category: "Antispasmodic",
    access: "Prescription",
    price: 42,
    unit: "Strip of 10 tablets",
    image: "./products/med-drotaverine.jpg",
    usedFor: ["Colicky uterine cramps", "Cramps with IBS-like symptoms", "When NSAIDs are unsuitable"],
    how: "Relaxes the uterine smooth muscle directly — an anti-spasm medicine rather than a painkiller.",
    dose: "40 mg every 8 hours as prescribed — usually considered only when heat + NSAIDs aren't enough.",
    safety: "Not for self-start if you have glaucoma, an enlarged prostate or heart conditions; may cause dry mouth and dizziness."
  },
  {
    id: "med-5",
    name: "Iron + Folic Acid",
    example: "IFA tablets / Ferrous ascorbate combos",
    category: "Supplement",
    access: "Over the counter",
    price: 65,
    unit: "Strip of 30 tablets",
    image: "./products/med-iron-folic.jpg",
    usedFor: ["Heavy periods → low haemoglobin", "Fatigue, breathlessness, pale skin", "Rebuilding after blood loss"],
    how: "Replaces the iron lost with heavy bleeding; folate helps your body build new healthy blood cells.",
    dose: "1 tablet daily (commonly at bedtime with vitamin-C juice) — full benefit takes 8–12 weeks of regular use.",
    safety: "Dark stools are normal. Keep tea/coffee & calcium 1 hour apart; constipation? ask your pharmacist for a gentler salt."
  },
  {
    id: "med-6",
    name: "Topical NSAID Gel (Diclofenac 1%)",
    example: "Brands like Volini / Moov Diclo",
    category: "Topical",
    access: "Over the counter",
    price: 95,
    unit: "30g tube",
    image: "./products/med-diclofenac-gel.jpg",
    usedFor: ["Lower-abdomen & lower-back cramp pain", "Localised muscle ache", "When you can't swallow pills"],
    how: "The anti-inflammatory works through the skin right where it hurts — very little reaches the stomach.",
    dose: "Thin layer on painful areas 3–4 times a day; wash hands after use.",
    safety: "Not on broken or rashy skin; don't cover with a heat pad; avoid eyes and mucous membranes."
  }
];

// ── Health Awareness: how common period conditions are caused ──
export const AWARENESS_CONDITIONS = [
  {
    id: "pcos",
    title: "PCOS / PCOD",
    aka: "Polycystic Ovary Syndrome / Disorder",
    image: "./products/aw-pcos.jpg",
    stat: "≈1 in 10 women of reproductive age — and up to 70% stay undiagnosed (WHO).",
    what: "A hormone + metabolic condition where the ovaries produce extra androgens, so eggs often mature but never ovulate. The 'cysts' are rows of tiny un-released follicles — not tumours or infections. PCOD is the milder, very common partial-maturity variant; PCOS is the full syndrome with metabolic features.",
    causes: [
      "Exact cause is unknown — but it strongly runs in families (genetic link)",
      "High insulin (insulin resistance) pushes the ovaries to make more androgens",
      "Chronic low-grade inflammation amplifies hormone production",
      "Extra weight worsens insulin — yet lean PCOS exists, so weight alone isn't the cause"
    ],
    symptoms: [
      "Irregular, missed or very light periods",
      "Acne/oily skin & unwanted facial or body hair",
      "Thinning hair on the scalp",
      "Hard-to-explain weight gain and sugar cravings",
      "Dark velvet-like patches on neck/armpits",
      "Mood swings, anxiety, low mood",
      "Trouble conceiving"
    ],
    manage: [
      "Track cycles & symptoms (use this app) to spot the pattern",
      "Low-GI plate: dal/roti/veggies with protein at every meal",
      "30-min brisk walk or strength training 5×/week",
      "Sleep 7–8 h — poor sleep spikes insulin and cravings",
      "Medicines only as prescribed (metformin, birth control, inositol)",
      "Yearly screening: thyroid, HbA1c/sugar, lipids"
    ],
    doctorIf: [
      "No period for 3 months in a row",
      "Sudden acne, facial hair or rapid hair fall",
      "Trying to conceive without success for 12 months",
      "Dark skin patches, or snoring + daytime sleepiness (sleep-apnoea signs)",
      "Extreme thirst, frequent urination or blurred vision (get sugar checked)"
    ]
  },
  {
    id: "pmdd",
    title: "PMDD",
    aka: "Premenstrual Dysphoric Disorder — severe PMS",
    image: "./products/aw-pmdd.jpg",
    stat: "Affects 3–8% of menstruating people and is a formally recognised diagnosis (DSM-5).",
    what: "A severe crash in the 7–10 days before periods, caused by the brain reacting too strongly to normal progesterone/estrogen swings — which disrupts serotonin and GABA. It is not 'weakness', not drama, and not bipolar disorder.",
    causes: [
      "Brain's heightened sensitivity to normal cycle hormone changes (serotonin/GABA link)",
      "Genetic tendency — it often runs in families",
      "More likely with a history of depression, anxiety or difficult PMS",
      "Can appear after pregnancy or when starting/stopping hormonal birth control"
    ],
    symptoms: [
      "Intense sadness, panic, rage or feeling 'not myself'",
      "Crying spells, hopelessness, harsh self-criticism",
      "Anger outbursts that damage relationships or work",
      "Brain fog — can't concentrate at school or job",
      "Sleeping too much or too little, low energy",
      "Swollen/tender breasts, bloating, cramps",
      "Everything switches off within a few days of bleeding starting"
    ],
    manage: [
      "Keep a 2-cycle mood diary to prove the monthly pattern",
      "See a gynaecologist or psychiatrist — effective treatments exist",
      "Medicines that help: SSRIs (luteal-phase or continuous) and special pills like drospirenone — as prescribed",
      "CBT/therapy; calcium 1000–1200 mg/day has trial evidence",
      "Cut caffeine, alcohol, salt & sugar during the luteal week"
    ],
    doctorIf: [
      "Suicidal thoughts or self-harm — call Tele-MANAS 14416 or 112 right now",
      "Can't work, study or hold relationships for a week every month",
      "Panic attacks, insomnia or paranoia before periods",
      "Symptoms feel unmanageable — you don't have to endure it"
    ]
  },
  {
    id: "endometriosis",
    title: "Endometriosis",
    aka: "Tissue like the uterine lining growing outside the uterus",
    image: "./products/aw-endometriosis.jpg",
    stat: "Around 1 in 10 women — with an average 7–10 year delay to diagnosis.",
    what: "Endometrium-like tissue implants on the ovaries, tubes, bowel or bladder. It thickens and bleeds with every cycle but has no exit route — triggering inflammation, scarring and pain.",
    causes: [
      "Exact cause unknown — leading theory: retrograde flow of period blood through the tubes",
      "Genetic/family predisposition",
      "Immune system failing to clear the misplaced tissue",
      "Risk rises with early first periods, short cycles and long lifetime ovulation"
    ],
    symptoms: [
      "Period pain that starts before bleeding and worsens every year",
      "Pain during or after sex",
      "Painful or bloody urination/bowel movements during periods",
      "Heavy flow with clots",
      "Chronic pelvic pain between periods; cyclical leg pain",
      "Extreme fatigue",
      "Difficulty conceiving (30–50% of those with endo face fertility issues)"
    ],
    manage: [
      "Diagnosis needs a doctor: pelvic ultrasound or laparoscopy — don't self-diagnose",
      "Pain plan: NSAIDs started early + heat, hormonal therapy as prescribed",
      "Pelvic-floor physiotherapy and TENS help many",
      "Anti-inflammatory diet, gentle regular movement, pacing yourself",
      "Fertility counselling early if you plan children",
      "Surgery (excision/ablation) for severe cases or fertility support"
    ],
    doctorIf: [
      "Pain uncontrolled by heat and normal pain relief",
      "Bleeding soaking pads hourly, or periods longer than 7 days",
      "New pain while urinating or passing stool",
      "Unable to conceive after 12 months (or 6 with known irregular cycles)",
      "Fainting during periods"
    ]
  },
  {
    id: "dysmenorrhea",
    title: "Menstrual Cramps",
    aka: "Dysmenorrhea — painful periods",
    image: "./products/aw-cramps.jpg",
    stat: "80–90% of teens report period pain; ~15% get it severe enough to miss school or work.",
    what: "Primary dysmenorrhea = prostaglandins make the uterus contract so hard it briefly cuts its own blood supply — pain like a mini labour, with no underlying disease. Secondary dysmenorrhea = another condition (endometriosis, fibroids, adenomyosis, infection, copper IUD) is causing the pain.",
    causes: [
      "Prostaglandin overproduction → intense uterine squeezing → cramp pain",
      "Primary cramps usually improve with age and after childbirth",
      "Secondary causes: endometriosis, fibroids, adenomyosis, PID, copper IUD",
      "Risk factors: heavy flow, early first period, smoking, family history"
    ],
    symptoms: [
      "Lower-belly cramps on day 1–2 aching into lower back & thighs",
      "Nausea, loose motions, dizziness",
      "Headache, fatigue, low mood",
      "Severity ranges from 'manageable' to 'can't get out of bed'"
    ],
    manage: [
      "Heating pad on the lower belly — evidence-backed and drug-free",
      "Ibuprofen/mefenamic WITH FOOD at onset works better than waiting for peak pain",
      "Gentle yoga/cat-cow stretches or a short walk",
      "Hydrate, magnesium-rich foods, warm baths",
      "Antispasmodic (drotaverine) if your doctor prescribed one",
      "Combined birth control can reduce cramps — ask your gynaecologist",
      "Log pain each month here — the pattern helps your doctor"
    ],
    doctorIf: [
      "Pain regularly stops you from school or work",
      "Fainting, vomiting or fever along with cramps",
      "Pain steadily worsening year after year (think secondary cause)",
      "Bleeding soaking a pad every hour, or clots bigger than a golf ball",
      "No relief from heat + recommended pain medicines"
    ]
  }
];

// ── Myths vs Facts ──
export const MENSTRUAL_MYTHS = [
  {
    myth: "Period blood removes toxins from the body",
    fact: "Detox is your liver and kidneys' job. Period blood is simply the uterine lining + a little blood + the unfertilised egg."
  },
  {
    myth: "You must not bathe or wash hair during periods",
    fact: "A warm bath actually eases cramps and keeps you hygienic — just dry your hair properly afterwards."
  },
  {
    myth: "PCOS only happens to overweight women",
    fact: "Lean PCOS is very common — a large share of people with PCOS are at a normal or low weight."
  },
  {
    myth: "Irregular periods always mean PCOS",
    fact: "Stress, thyroid issues, sudden weight change, infections and perimenopause also cause irregular cycles — get checked instead of self-labelling."
  },
  {
    myth: "Exercise during periods is harmful",
    fact: "Gentle movement often reduces cramps and lifts mood — listen to your body and skip only what hurts."
  },
  {
    myth: "You can't get pregnant during your period",
    fact: "Sperm can survive up to 5 days — with short cycles, period-time sex can still lead to pregnancy."
  }
];

// ── Danger signs: see a doctor / get emergency help ──
export const RED_FLAGS = [
  "Soaking a pad or tampon every hour for 2+ hours",
  "Fainting, chest pain or severe dizziness",
  "Fever together with severe pelvic pain (possible infection)",
  "Cramps that suddenly become far worse than usual",
  "Severe pain that doesn't ease with heat or recommended pain relief",
  "Bleeding lasting more than 7 days, or clots bigger than a golf ball",
  "3 missed periods in a row (and not pregnant)",
  "Thoughts of self-harm or suicide — call Tele-MANAS 14416 or 112 immediately"
];

// Period Poverty & Emergency Pad Access Centers in India
export const PERIOD_POVERTY_CENTERS = [
  {
    name: "Jan Aushadhi Kendra (All India Network)",
    type: "Govt Distribution Point",
    cost: "₹1 per pad (Suvidha Pads)",
    access: "Walk into any of the 9,500+ Kendras nationwide. No prescription or ID required.",
    helpline: "1800-180-8080",
    timing: "9:00 AM - 8:00 PM Daily"
  },
  {
    name: "Village ASHA & Anganwadi Centers",
    type: "Community Health Worker",
    cost: "Free to ₹6 per pack of 6",
    access: "Available to all adolescent girls (10-19 years) under the National Health Mission.",
    helpline: "Dial 104 (Health Information)",
    timing: "Contact local primary health center (PHC)"
  },
  {
    name: "Red Dot Foundation / Myna Mahila Foundation",
    type: "NGO Doorstep & Urban Slum Access",
    cost: "Free for low-income households",
    access: "Mumbai, Delhi NCR, Bangalore, Pune community distribution hubs.",
    helpline: "022-2556-9878",
    timing: "10:00 AM - 6:00 PM"
  },
  {
    name: "Indian Red Cross Society Emergency Pad Bank",
    type: "Disaster & Emergency Relief",
    cost: "100% Free",
    access: "Available at district Red Cross offices for schools, colleges & emergencies.",
    helpline: "011-23716441",
    timing: "24x7 Emergency Help"
  }
];
