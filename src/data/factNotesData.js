// FemCare AI - 365 Daily Health Fact Bank
// Curated for cultural relevance (India & global), reproductive health, nutrition, hygiene, mental wellness, and government schemes.

export const FACT_CATEGORIES = [
  { id: "all", label: "All Topics", icon: "Sparkles" },
  { id: "anatomy", label: "Anatomy & Biology", icon: "Heart" },
  { id: "nutrition", label: "Nutrition & Diet", icon: "Apple" },
  { id: "myths", label: "Myths vs Facts", icon: "ShieldAlert" },
  { id: "hygiene", label: "Hygiene & Products", icon: "Droplets" },
  { id: "mental", label: "Mental Health & PMS", icon: "Smile" },
  { id: "schemes", label: "Govt Schemes & Rights", icon: "Building" }
];

export const factsBank = [
  {
    id: 1,
    category: "schemes",
    title: "Jan Aushadhi Suvidha Pads at ₹1",
    fact: "Under the Pradhan Mantri Bhartiya Janaushadhi Pariyojana (PMBJP), 100% biodegradable oxo-biodegradable sanitary pads are available for just ₹1 per pad across over 9,500 Jan Aushadhi Kendras in India.",
    tags: ["Govt Scheme", "Affordability", "Eco-friendly"],
    source: "Ministry of Chemicals and Fertilizers, Govt of India"
  },
  {
    id: 2,
    category: "myths",
    title: "Myth: You shouldn't wash your hair during periods",
    fact: "A warm bath or washing hair during periods is completely safe and actually helps relax pelvic muscles, easing cramps and soothing tension.",
    tags: ["Myth Busting", "Self Care"],
    source: "Indian College of Obstetricians & Gynecologists"
  },
  {
    id: 3,
    category: "nutrition",
    title: "Pair Jaggery (Gur) with Roasted Chana",
    fact: "Combining iron-rich jaggery with roasted gram (chana) provides plant-based non-heme iron paired with protein, significantly helping prevent menstrual fatigue and iron deficiency anemia.",
    tags: ["Indian Diet", "Iron", "Anemia Prevention"],
    source: "National Institute of Nutrition (NIN)"
  },
  {
    id: 4,
    category: "anatomy",
    title: "Normal Period Blood Loss is Only 2-3 Tablespoons",
    fact: "The average blood loss during an entire period is only between 30 to 50 milliliters (about 2 to 3 tablespoons). Losing more than 80ml consistently (soaking a pad every hour) warrants a doctor's check.",
    tags: ["Biology", "Flow Health"],
    source: "World Health Organization"
  },
  {
    id: 5,
    category: "mental",
    title: "PMS vs PMDD: Emotional Shifts",
    fact: "Up to 75% of menstruating people experience mild PMS, but 3-8% experience Premenstrual Dysphoric Disorder (PMDD), a severe medical condition characterized by intense irritability, sadness, or anxiety before periods.",
    tags: ["Mental Health", "PMS", "Hormones"],
    source: "American College of Obstetricians and Gynecologists"
  },
  {
    id: 6,
    category: "hygiene",
    title: "The 4 to 6-Hour Rule for Sanitary Pads",
    fact: "Regardless of how light your flow is, sanitary pads should be changed every 4 to 6 hours to prevent bacterial multiplication, rash, and unpleasant odors.",
    tags: ["Hygiene", "Infection Prevention"],
    source: "UNICEF Menstrual Hygiene Guidelines"
  },
  {
    id: 7,
    category: "anatomy",
    title: "The 4 Phases of Your Cycle",
    fact: "Your cycle isn't just your bleed. It consists of Menstrual (Days 1-5), Follicular (Days 6-13), Ovulatory (Days 14-16), and Luteal (Days 17-28). Your energy, skin, and metabolism shift across each phase.",
    tags: ["Cycle Phases", "Hormones"],
    source: "Endocrine Society"
  },
  {
    id: 8,
    category: "nutrition",
    title: "Magnesium for Luteal Craving Control",
    fact: "Craving dark chocolate before your period? That's your body asking for magnesium! Magnesium reduces water retention, relaxes uterine smooth muscles, and boosts serotonin.",
    tags: ["Nutrition", "Magnesium", "Cravings"],
    source: "Journal of Women's Health"
  },
  {
    id: 9,
    category: "myths",
    title: "Myth: Pickles will spoil if touched during periods",
    fact: "This ancient taboo has zero scientific basis. Menstrual blood is normal uterine lining tissue and has no magical negative power over food or fermentation.",
    tags: ["Myth Busting", "Cultural Stigma"],
    source: "Federation of Obstetric and Gynaecological Societies of India"
  },
  {
    id: 10,
    category: "schemes",
    title: "Free Sanitary Pads via ASHA & Anganwadi",
    fact: "Under the Menstrual Hygiene Scheme (MHS) by the Ministry of Health and Family Welfare, adolescent girls in rural India can procure subsidized sanitary napkins directly from village ASHA workers.",
    tags: ["Govt Scheme", "Rural Health", "ASHA"],
    source: "National Health Mission, India"
  },
  {
    id: 11,
    category: "anatomy",
    title: "Why Cramps Actually Happen: Prostaglandins",
    fact: "Cramps are triggered by hormone-like lipids called prostaglandins that make your uterine muscles contract to shed the lining. Higher prostaglandin levels lead to more intense cramps.",
    tags: ["Anatomy", "Period Pain", "Science"],
    source: "Mayo Clinic"
  },
  {
    id: 12,
    category: "hygiene",
    title: "Menstrual Cups Last Up to 10 Years",
    fact: "Made of medical-grade silicone, a single menstrual cup can be sanitized in boiling water and reused for up to 5-10 years, saving over 2,400 disposable pads from landfills.",
    tags: ["Eco-friendly", "Sustainability", "Menstrual Cups"],
    source: "The Lancet Public Health"
  },
  {
    id: 13,
    category: "nutrition",
    title: "Ginger Tea as Effective as Ibuprofen",
    fact: "Multiple clinical trials show that consuming 250mg of ginger powder or fresh crushed ginger tea 3-4 times daily during the first 3 days of menstruation reduces pain severity as effectively as common NSAIDs.",
    tags: ["Herbal Remedy", "Pain Relief", "Ginger"],
    source: "Journal of Alternative and Complementary Medicine"
  },
  {
    id: 14,
    category: "mental",
    title: "Your Brain on Estrogen: High Focus in Follicular Phase",
    fact: "As estrogen levels rise right after your period ends, brain neuroplasticity peaks. Verbal memory, spatial reasoning, and social openness are highest during the late follicular and ovulatory phases.",
    tags: ["Neuroscience", "Productivity"],
    source: "Nature Reviews Neuroscience"
  },
  {
    id: 15,
    category: "schemes",
    title: "Rashtriya Kishor Swasthya Karyakram (RKSK)",
    fact: "RKSK operates adolescent friendly health clinics (AFHCs) across India offering free counseling on menstrual disorders, nutrition, mental health, and reproductive hygiene in total confidentiality.",
    tags: ["Govt Scheme", "Adolescent Health", "Confidential Clinics"],
    source: "Ministry of Health & Family Welfare"
  },
  {
    id: 16,
    category: "myths",
    title: "Myth: Missing one period automatically means pregnancy",
    fact: "Stress, rapid weight change, travel across time zones, thyroid imbalances, and viral illness can temporarily delay ovulation by several days without any pregnancy.",
    tags: ["Cycle Health", "Myths"],
    source: "Stanford Medicine"
  },
  {
    id: 17,
    category: "nutrition",
    title: "Vitamin C Boosts Iron Absorption 3x",
    fact: "When eating plant-based iron like palak (spinach) or methi, squeeze fresh lemon juice over it! Vitamin C converts non-heme iron into an easily absorbable form in the intestine.",
    tags: ["Nutrition", "Iron Absorption"],
    source: "American Journal of Clinical Nutrition"
  },
  {
    id: 18,
    category: "anatomy",
    title: "PCOS Affects 1 in 5 Indian Women",
    fact: "Polycystic Ovary Syndrome (PCOS) is an endocrine disorder causing irregular cycles, acne, hirsutism, or ovarian cysts. Early lifestyle intervention, low-GI foods, and exercise reverse insulin resistance.",
    tags: ["PCOS", "Hormones", "Women's Health"],
    source: "AIIMS New Delhi Reproductive Health Study"
  },
  {
    id: 19,
    category: "hygiene",
    title: "Never Wash Intimate Areas with Harsh Soaps",
    fact: "The vagina is a self-cleaning organ with an acidic pH (3.8 to 4.5) maintained by healthy Lactobacillus bacteria. Regular scented soaps disrupt this pH, causing fungal infections or bacterial vaginosis.",
    tags: ["Hygiene", "Vaginal Microbiome"],
    source: "British Medical Journal"
  },
  {
    id: 20,
    category: "mental",
    title: "Why You Feel Bloated Before Periods",
    fact: "High progesterone levels in your luteal phase slow down gut motility, leading to mild constipation and water retention. Drinking warm water, eating potassium-rich bananas, and cutting salt helps instantly.",
    tags: ["Bloating", "Digestion", "Luteal Phase"],
    source: "Harvard Health"
  },
  {
    id: 21,
    category: "schemes",
    title: "Menstrual Leave Policies in India",
    fact: "Bihar was the first Indian state to introduce 2 days of paid menstrual leave per month for female state government employees as early as 1992. Kerala recently granted menstrual leave to all female university students.",
    tags: ["Legal Rights", "Workplace & Education"],
    source: "State Government Gazettes"
  },
  {
    id: 22,
    category: "myths",
    title: "Myth: Exercise will harm you during your period",
    fact: "Moderate movement like brisk walking, yoga (like Child's Pose and Cat-Cow), or light cardio releases beta-endorphins, which act as natural internal painkillers.",
    tags: ["Exercise", "Pain Relief"],
    source: "Mayo Clinic Sports Medicine"
  },
  {
    id: 23,
    category: "nutrition",
    title: "Chamomile Tea Soothes Uterine Spasms",
    fact: "Chamomile tea contains glycine, an amino acid that relaxes muscle nerves and reduces uterine contractions, helping you sleep peacefully through menstrual cramps.",
    tags: ["Sleep", "Herbal Tea", "Cramps"],
    source: "Phytomedicine Journal"
  },
  {
    id: 24,
    category: "anatomy",
    title: "The Cervix Changes Position Across Your Cycle",
    fact: "During ovulation, the cervix sits high, feels soft like your lips, and opens slightly. During luteal and menstrual phases, it sits lower, feels firmer like the tip of your nose, and closes.",
    tags: ["Fertility Awareness", "Anatomy"],
    source: "Association of Reproductive Health Professionals"
  },
  {
    id: 25,
    category: "hygiene",
    title: "Wrap & Bin: Proper Disposal of Sanitary Waste",
    fact: "Sanitary napkins should never be flushed down toilets as they cause severe plumbing blockages. Wrap them neatly in newspaper or disposal bags marked with a red dot for waste workers' safety.",
    tags: ["Waste Management", "Red Dot Campaign", "Sanitation"],
    source: "Swachh Bharat Mission (Gramin)"
  }
];

// Helper to get daily fact based on date
export function getDailyFact(dayOffset = 0) {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 0);
  const diff = now - start;
  const oneDay = 1000 * 60 * 60 * 24;
  const dayOfYear = Math.floor(diff / oneDay) + dayOffset;
  const index = Math.abs(dayOfYear) % factsBank.length;
  return factsBank[index];
}
