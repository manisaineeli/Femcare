// FemCare AI - Knowledge Base & Emergency Triage Logic
// Offline, on-device curated health Q&A covering the female body end-to-end:
// puberty, cycles, reproductive organs, infections, pregnancy & contraception,
// fertility, menopause, plus nutrition, fitness, skin, hair and mental health.
// No server. No tracking. Everything answers locally on the device.

import { ANATOMY_FAQ } from './anatomyFaqData.js';

export const EMERGENCY_RED_FLAGS = [
  {
    keywords: ["faint", "fainted", "unconscious", "collapse", "collapsed", "dizzy", "dizziness", "blackout", "black out", "passed out", "बेहोश"],
    severity: "CRITICAL",
    alert: "IMMEDIATE MEDICAL ALERT: Fainting or acute dizziness during your period can signify hypovolemia (severe blood volume loss), anemia, or an ectopic pregnancy. Please sit down, keep feet elevated, and seek emergency hospital care immediately."
  },
  {
    keywords: ["soaking through", "soaking pad", "2 pads", "pads an hour", "pad every hour", "flooding", "huge clots", "clots bigger than quarter", "clots bigger than lemon", "heavy bleeding per hour", "bleeding through everything"],
    severity: "CRITICAL",
    alert: "HEAVY MENORRHAGIA WARNING: Soaking through 2 or more pads/tampons every hour for 2 consecutive hours, or passing blood clots larger than a 10-rupee coin, indicates excessive bleeding. Please consult a doctor or visit the nearest emergency room."
  },
  {
    keywords: ["extreme pain", "unbearable", "crying from pain", "10/10 pain", "9/10 pain", "fever with discharge", "foul smell", "foul-smelling", "severe fever", "pain with fever"],
    severity: "HIGH",
    alert: "URGENT CLINICAL ATTENTION: Severe acute pain that prevents walking, or high fever accompanied by foul-smelling pelvic discharge, could point to pelvic inflammatory disease (PID), appendicitis, or a ruptured ovarian cyst. Please see a gynecologist promptly."
  },
  {
    keywords: ["sharp pain one side", "sudden sharp pelvic pain", "pain during pregnancy", "bleeding during pregnancy", "ruptured cyst"],
    severity: "HIGH",
    alert: "URGENT: Sudden one-sided pelvic pain with spotting can be a sign of a ruptured cyst or an ectopic (tubal) pregnancy, which is a medical emergency. Please go to the nearest hospital immediately."
  }
];

export const FAQ_DATABASE = [
  // ---------- CYCLE BASICS ----------
  {
    id: 1,
    category: "cycle_basics",
    keywords: ["how does menstrual cycle work", "cycle phases", "menstrual cycle", "period cycle", "what happens in cycle", "hormones cycle", "follicular", "luteal", "ovulatory"],
    question: "How does the menstrual cycle actually work?",
    answer: "Your cycle is a 4-phase hormone loop (usually 21-35 days):\n1) Menstrual (day 1-5) - the uterine lining sheds.\n2) Follicular (day 1-13) - estrogen rises, an egg follicle matures, energy improves.\n3) Ovulation (~day 14) - an egg is released; this is your most fertile window.\n4) Luteal (day 15-28) - progesterone rises, then both hormones drop, triggering your next period.\nCounting from day 1 of bleeding gives you your personal pattern.",
    lifestyleTip: "Track day 1 of bleeding for 3 cycles in the Cycle tab - it reveals your true average length."
  },
  {
    id: 2,
    category: "cycle_basics",
    keywords: ["normal cycle length", "how many days cycle", "21 days", "35 days", "regular cycle", "short cycle", "long cycle"],
    question: "What is a normal cycle length?",
    answer: "A normal adult cycle is 21 to 35 days, with an average of 28. Periods themselves usually last 3-7 days and flow is heaviest on days 1-2. Teen cycles can take 1-3 years to regularize after menarche. Variation of up to 7 days month-to-month is still considered regular.",
    lifestyleTip: "Irregular is only a concern if cycles are shorter than 21 or longer than 35 days for 3 consecutive months."
  },
  {
    id: 3,
    category: "cramps",
    keywords: ["cramp", "cramps", "period pain", "dysmenorrhea", "stomach pain", "stomach ache", "belly pain", "lower abdominal pain", "painful periods"],
    question: "How can I quickly relieve menstrual cramps?",
    answer: "To soothe cramps naturally: 1) Apply a warm heating pad or hot water bottle to your lower abdomen (heat increases blood flow). 2) Sip warm crushed ginger tea or chamomile tea (natural antispasmodics). 3) Try gentle Child's Pose (Balasana) or Cat-Cow stretch. 4) Take magnesium or consult your doctor for an OTC anti-inflammatory like Ibuprofen or Mefenamic acid if pain persists.",
    lifestyleTip: "Avoid excess caffeine and salty snacks on days 1-3, which constrict blood vessels and amplify cramps."
  },
  {
    id: 4,
    category: "late_period",
    keywords: ["late", "delayed", "missed period", "period late", "not coming", "no period", "period didn't come", "days late", "missed my period", "missed my period but not pregnant", "period missing"],
    question: "Why is my period late even if I'm not pregnant?",
    answer: "Cycle variations are very common! A period is considered delayed after day 35. Primary non-pregnancy reasons include: 1) Acute psychological or exam stress (cortisol delays ovulation). 2) Recent illness, flu, or viral infection. 3) Sudden weight change or intense new workout regimes. 4) Thyroid hormone fluctuations. 5) Polycystic Ovary Syndrome (PCOS). If your period is more than 10-14 days late, take a home pregnancy test if sexually active, or track for another cycle.",
    lifestyleTip: "Practice calming breathing exercises and prioritize 8 hours of sleep to reduce cortisol spikes."
  },
  {
    id: 5,
    category: "pcos",
    keywords: ["pcos", "pcod", "cysts", "facial hair", "irregular cycle", "hirsutism", "polycystic", "ovarian cyst"],
    question: "What are the common signs of PCOS and how is it managed?",
    answer: "PCOS (Polycystic Ovary Syndrome) affects 1 in 5 women in India. Key signs include irregular or absent cycles, stubborn cystic acne on chin/jawline, unwanted facial or body hair (hirsutism), thinning scalp hair, and difficulty losing weight due to insulin resistance. Management starts with a low-glycemic Indian diet (millets, dal, greens), daily 30-minute brisk movement, and consulting a gynecologist/endocrinologist.",
    lifestyleTip: "Swap refined white rice and maida for bajra, jowar, or ragi to stabilize blood sugar."
  },
  {
    id: 6,
    category: "bloating",
    keywords: ["bloat", "bloated", "bloating", "swollen", "water weight", "gassy", "gas pain", "puffy", "weight gain", "gaining weight", "weight gain before period", "heavier before period"],
    question: "Why do I feel bloated and gain weight right before my period?",
    answer: "In the Luteal phase (days 17-28), progesterone rises, which relaxes smooth muscles in your gastrointestinal tract, causing slower digestion and temporary water retention of 1 to 2.5 kg (2 to 5 lbs). This is NOT body fat! Once your period starts and progesterone drops, your body flushes out the excess fluid.",
    lifestyleTip: "Drink potassium-rich tender coconut water, eat cucumbers, and cut down on processed chips and pickles."
  },
  {
    id: 7,
    category: "diet",
    keywords: ["luteal", "what to eat before period", "pre period food", "pms diet", "cravings", "diet before period", "food for periods"],
    question: "What should I eat during the Luteal phase?",
    answer: "During your luteal phase, focus on: 1) Magnesium-rich foods (dark chocolate 70%+, pumpkin seeds, almonds, bananas) to curb mood swings and water retention. 2) Complex carbohydrates (brown rice, oats, sweet potatoes) to support serotonin. 3) Herbal teas like peppermint or ginger to ease pre-menstrual digestive sluggishness.",
    lifestyleTip: "Steer clear of excess espresso and sugary desserts, which trigger blood sugar crashes and irritability."
  },
  {
    id: 8,
    category: "heavy_bleeding",
    keywords: ["heavy bleeding", "heavy flow", "too much blood", "blood clots", "menorrhagia", "so much blood", "clots in period", "gushing blood"],
    question: "How do I know if my period bleeding is abnormally heavy?",
    answer: "Normal bleeding is 30-50ml (soaking 3-5 pads a day). Bleeding is abnormally heavy (Menorrhagia) if you: 1) Soak through a pad or tampon in 1-2 hours repeatedly. 2) Pass blood clots larger than a 10-rupee coin or golf ball. 3) Need to wake up multiple times at night to change protection. 4) Bleed longer than 7 days consecutively. If you notice this, get checked for fibroids, polyps, or anemia.",
    lifestyleTip: "Keep an iron supplement or foods like beetroots, dates, and jaggery on hand to prevent iron deficiency."
  },
  {
    id: 9,
    category: "exercise",
    keywords: ["workout", "exercise", "gym", "running", "yoga", "swimming", "physical activity", "fitness during period", "can i exercise"],
    question: "Is it safe to exercise during periods and what workouts are best?",
    answer: "Yes, absolutely safe! In fact, light exercise releases endorphins (nature's painkillers) and reduces prostaglandins. Days 1-2: Prioritize gentle walking, yin yoga, or stretching (avoid inverted postures if uncomfortable). Days 3-5: Transition to moderate cardio or bodyweight exercises. In follicular & ovulatory phases, your body is primed for strength training and high-intensity workouts!",
    lifestyleTip: "Listen to your body. If you feel dizzy or extremely fatigued, rest guilt-free."
  },
  {
    id: 10,
    category: "hygiene_products",
    keywords: ["menstrual cup", "tampon", "pad", "sanitary pad", "cloth pad", "which product", "how to use cup", "period product", "panty liner", "best pad for heavy flow", "pad for heavy flow", "heavy flow pad"],
    question: "Which period product is best for me: pads, cups, or tampons?",
    answer: "Each has distinct benefits: 1) Pads: Easiest to use, non-invasive, ideal for beginners - change every 4-6 hours. 2) Menstrual Cups: Medical-grade silicone, holds 3x more than a pad, zero rash, worn 8-12 hours, lasts up to 10 years (cheapest + most eco-friendly). 3) Tampons: Discreet and great for swimming; must be changed every 4-8 hours. 4) Period underwear/reusable cloth pads: Washable and soft for light days.",
    lifestyleTip: "Always boil a menstrual cup for 5-7 minutes before your cycle begins and after it ends."
  },
  {
    id: 11,
    category: "ovulation",
    keywords: ["ovulation", "fertile", "fertile window", "get pregnant", "egg white discharge", "ovulating", "when am i fertile"],
    question: "How do I recognize when I am ovulating?",
    answer: "Ovulation typically occurs around day 14 of a 28-day cycle (12-16 days before your next period). Common signs include: 1) Clear, stretchy vaginal discharge resembling raw egg whites. 2) Mild one-sided lower abdominal twing (Mittelschmerz). 3) Slight rise in resting basal body temperature. 4) Heightened sense of smell and energy boost.",
    lifestyleTip: "Sperm can live inside the reproductive tract for up to 5 days, making the 5 days before ovulation plus ovulation day your fertile window."
  },
  {
    id: 12,
    category: "blood_color",
    keywords: ["brown blood", "dark blood", "black blood", "spotting", "pink blood", "bright red", "blood color"],
    question: "Why is my period blood dark brown or black at the start or end?",
    answer: "Dark brown or almost black blood is completely normal! It is simply older uterine blood that took longer to exit the body. When hemoglobin is exposed to oxygen in the vagina, it oxidizes, turning from bright red to dark brown or burgundy. It is very common in the first 24 hours or last 2 days of your cycle. Bright red mid-flow and slight pink on light days are also normal.",
    lifestyleTip: "If dark spotting is accompanied by intense foul odor or burning itching, see a doctor to rule out infection."
  },
  {
    id: 13,
    category: "mental_pms",
    keywords: ["crying", "mood swings", "angry", "irritated", "depression before period", "pmdd", "sad before period", "emotional", "mood", "pms", "premenstrual", "premenstrual syndrome"],
    question: "Why do I feel so emotional, sad, or irritable a week before my period?",
    answer: "During the late luteal phase, estrogen and progesterone levels plunge rapidly. This hormonal drop directly impacts serotonin and dopamine (neurotransmitters responsible for mood and joy). If your symptoms cause severe depression or hopeless thoughts every month, speak with a compassionate healthcare provider about PMDD (Premenstrual Dysphoric Disorder).",
    lifestyleTip: "Try 10 minutes of morning sunlight, 300mg magnesium glycinate, and reducing social pressure during pre-period week."
  },
  {
    id: 14,
    category: "skin",
    keywords: ["acne", "pimples", "breakout", "skin", "jawline", "hormonal acne", "oily skin"],
    question: "Why do I break out with pimples on my jawline before my period?",
    answer: "Before menstruation, estrogen and progesterone drop while androgens (like testosterone) remain relatively higher. This stimulates your sebaceous glands to produce thicker sebum (oil), which mixes with dead skin cells and bacteria, triggering hormonal cysts on the chin and jawline.",
    lifestyleTip: "Use a gentle salicylic acid cleanser, keep pillowcases clean, and avoid picking at hormonal nodules."
  },

  // ---------- PUBERTY & FIRST PERIODS ----------
  {
    id: 15,
    category: "puberty",
    keywords: ["first period", "menarche", "when will i get periods", "starting periods", "periods at 12", "periods at 13", "no period yet", "puberty", "when do periods start"],
    question: "When will I get my first period, and how do I know it's coming?",
    answer: "Most girls get their first period between ages 10-15 (average ~12). Clear warning signs that it's coming within the next 6-18 months: breast budding (usually 2 years before), a white or clear vaginal discharge (6-12 months before), a growth spurt, and pubic/armpit hair. When bleeding starts, use a clean pad, note the date as 'Day 1', and know that the first 1-2 cycles may be irregular - that is completely normal.",
    lifestyleTip: "Keep a pad in your school bag from the 10-month mark after discharge appears - it removes all the panic."
  },
  {
    id: 16,
    category: "puberty",
    keywords: ["breast pain", "sore breasts", "tender breasts", "breast growth", "nipple pain", "breast development", "lump in breast", "breast hurt", "hurting breasts", "breast pain before period"],
    question: "Why are my breasts sore or changing?",
    answer: "Breast soreness (mastalgia) is usually hormonal: it peaks in the days before your period when progesterone is high, and eases once bleeding starts. Puberty, growth, and caffeine can also cause tenderness. Most breast tissue feels lumpy or grainy - that's normal fibrous tissue. The one thing to watch: a distinct new lump, one-sided dimpling, or nipple discharge should be checked by a doctor.",
    lifestyleTip: "Switch to a well-fitting non-wire bra on tender days and cut caffeine for a week to see if pain drops."
  },
  {
    id: 17,
    category: "puberty",
    keywords: ["period at 10", "too young", "early puberty", "precocious", "periods early"],
    question: "Is getting periods very early a problem?",
    answer: "If periods start before age 8, it's worth a pediatric endocrinology review (possible precocious puberty). Between 9-12 it's within the normal range and increasingly common due to nutrition and lifestyle. Early menarche slightly raises lifetime risk of PCOS and metabolic issues, so healthy habits from the start matter more.",
    lifestyleTip: "Whatever the age, the message stays the same: it's the body doing its job - not anything the girl did wrong."
  },

  // ---------- DISCHARGE & VAGINAL HEALTH ----------
  {
    id: 18,
    category: "discharge",
    keywords: ["white discharge", "vaginal discharge", "milky discharge", "leucorrhea", "discharge color", "clear discharge", "discharge smell"],
    question: "Is vaginal discharge normal? What color should it be?",
    answer: "Yes - healthy discharge is the vagina's self-cleaning system. Normal discharge is clear or milky-white, may turn stretchy and egg-white around ovulation, and is odorless or mildly tangy. It varies with your cycle, arousal, and hydration. Warning signs that need a doctor: green/yellow discharge, cottage-cheese texture with itching, fishy smell, or accompanied by burning/pain.",
    lifestyleTip: "Wear cotton underwear and skip daily sprays - the vagina's own pH already handles cleaning."
  },
  {
    id: 19,
    category: "infection",
    keywords: ["yeast infection", "candida", "itching", "itchy vagina", "cottage cheese discharge", "burning", "white itchy", "thrush"],
    question: "I have itching and thick white discharge - is it a yeast infection?",
    answer: "Itching plus thick, white, cottage-cheese-like discharge with a sore/burny feeling is the classic signature of vaginal candidiasis (yeast infection). Triggers: antibiotics, tight clothes, humidity, uncontrolled sugar, and lowered immunity. It is not an STI and is very treatable with antifungal pessaries/cream from a pharmacist. Please see a doctor if it's your first time or keeps coming back.",
    lifestyleTip: "Change out of wet workout clothes quickly and avoid sugary drinks - yeast feeds on sugar."
  },
  {
    id: 20,
    category: "infection",
    keywords: ["smell", "bad smell", "fishy smell", "odor", "smelly vagina", "foul odor", "vaginal odour"],
    question: "Why does my vagina smell, and when is it a problem?",
    answer: "A mild, slightly tangy scent is healthy - it comes from natural bacteria and pH. A strong fishy or rotten smell, especially with greyish or greenish discharge, points to Bacterial Vaginosis (BV); a smell with itching and thick white discharge suggests yeast. Both are common, non-shameful, and quickly treatable. Never douche or spray inside - that only wrecks the good bacteria.",
    lifestyleTip: "Rinse only with water from front to back, wear breathable cotton, and change pads regularly."
  },
  {
    id: 21,
    category: "infection",
    keywords: ["uti", "urine infection", "burning urination", "burning while pee", "frequent urination", "urine smell", "cloudy urine"],
    question: "Could burning while urinating be a urine infection?",
    answer: "Burning urination, an urgent need to go, passing only small amounts, cloudy or strong-smelling urine, and lower-belly pressure are classic UTI signs - very common in women because the urethra is short. Drink 3+ liters of water to flush bacteria, do not hold urine, and wipe front to back. If you develop fever, back/side pain or blood in urine, it may have reached the kidneys - see a doctor same day.",
    lifestyleTip: "Drink a glass of water after sex and don't postpone bathroom breaks - both prevent most UTIs."
  },
  {
    id: 22,
    category: "hygiene",
    keywords: ["hygiene", "how to clean", "washing", "wipe", "private parts", "daily care", "underwear", "how to wash"],
    question: "What is the correct way to wash private parts?",
    answer: "Simple rule: outside only, water only. Wash the vulva (outer folds) with plain lukewarm water or a mild, fragrance-free, pH-balanced cleanser - never soap, talc or antiseptic inside the vagina. Always wipe front to back after using the toilet. Change underwear daily (cotton preferred), change pads/tampons every 4-6 hours, and avoid spraying deodorant down there.",
    lifestyleTip: "Keep a spare pair of underwear in your bag on heavy days - it's the cheapest comfort upgrade ever."
  },
  {
    id: 23,
    category: "hygiene",
    keywords: ["period smell", "smell during period", "period odor", "blood smell", "smell after period"],
    question: "Why does it smell during my period?",
    answer: "Menstrual blood leaving the body is exposed to air and vaginal bacteria, which breaks it down into a mild iron or musky scent - completely normal. It intensifies when you wear the same pad too long or wear synthetic underwear. Change protection every 4-6 hours (sooner on heavy days), and rinse the outer area with water.",
    lifestyleTip: "Carry a small pouch with a spare pad, wipes and a zip bag for the used one - no stress anywhere."
  },

  // ---------- PAIN & SYMPTOMS ----------
  {
    id: 24,
    category: "pain",
    keywords: ["back pain", "lower back ache", "backache", "waist pain", "leg pain", "leg cramps", "body ache", "pain in legs"],
    question: "Why do my back and legs ache during periods?",
    answer: "Prostaglandins - the same hormones that trigger uterine contractions - also tighten muscles in your lower back, hips and legs. Referred pain plus mild fluid retention can also press on the sciatic nerve, causing aches down the back of your legs. This is muscular/hormonal, not a bone problem.",
    lifestyleTip: "Try the Iron Cross twist and Pelvic Tilts in the Fitness tab, plus a warm water bottle on the lower back."
  },
  {
    id: 25,
    category: "pain",
    keywords: ["headache", "migraine", "head pain", "head spinning", "dizzy during period"],
    question: "Why do I get headaches or migraines around my period?",
    answer: "Estrogen falls sharply just before menstruation, which lowers pain thresholds and can trigger headaches or menstrual migraine, often on days 1-2. Dehydration, poor sleep and skipped meals make it worse. Regular hydration, magnesium, and early pain relief (before pain peaks) usually control it. New, sudden 'worst headache of your life' needs emergency care.",
    lifestyleTip: "Start water + an early dose of relief at the FIRST twinge - waiting until pain peaks makes it harder to control."
  },
  {
    id: 26,
    category: "pain",
    keywords: ["nausea", "vomiting", "throwing up", "feeling sick", "dizziness period", "motion sickness period"],
    question: "Why do I feel nauseous or like throwing up during my period?",
    answer: "High prostaglandin levels make the uterus contract strongly and can also speed up gut movement - triggering nausea, cramping and even loose motions at the same time. Hunger, low blood sugar and pain amplify it. Small frequent bland meals, ginger tea and heat usually settle it. Recurring vomiting that stops you from eating or drinking needs a doctor's review.",
    lifestyleTip: "Eat small carbohydrate snacks every 2-3 hours on days 1-2 instead of three big meals."
  },
  {
    id: 27,
    category: "pain",
    keywords: ["diarrhea", "loose motions", "constipation", "bowel", "digestion period", "stomach upset"],
    question: "Why do I get loose motions or constipation during periods?",
    answer: "Progesterone and prostaglandins both act on your gut: prostaglandins speed it up (diarrhea) while progesterone slows it (constipation) - so either direction is common around your period. It's hormonal, not food poisoning. Peppermint tea, curd/rice, bananas and soluble fibre usually normalize things within a day or two.",
    lifestyleTip: "Cut oily and very spicy food on days 1-2 and keep curd rice or bananas ready in advance."
  },
  {
    id: 28,
    category: "pain",
    keywords: ["pain in ovulation", "mittelschmerz", "one sided pain", "twing", "pain on one side"],
    question: "I feel a sharp twinge on one side mid-cycle - is that ovulation pain?",
    answer: "Yes, that's Mittelschmerz - a brief one-sided twinge when the ovary releases an egg around mid-cycle. It lasts minutes to a couple of hours, alternates sides month to month, and is harmless. Mild spotting can accompany it. If the pain is severe, lasting, or with fever/vomiting, get it checked to rule out a cyst or appendicitis.",
    lifestyleTip: "A warm bath or heat pad plus rest usually clears ovulation twinges quickly."
  },

  // ---------- CONDITIONS & DIAGNOSES ----------
  {
    id: 29,
    category: "endometriosis",
    keywords: ["endometriosis", "endo", "painful period", "pain during sex", "period pain worse", "chronic pelvic pain"],
    question: "Could my period pain be endometriosis?",
    answer: "Consider endometriosis if: pain starts BEFORE bleeding and is far worse than normal cramps, pain radiates to the back/legs, you have pain during or after sex, heavy periods with clots, or pain with bowel movements. It affects roughly 1 in 10 women and is often dismissed for years - push for a gynecologist consult and, if needed, an ultrasound or laparoscopy. It is manageable with medication, hormones or surgery.",
    lifestyleTip: "Keep a pain diary for 2 cycles (pain score + day) - concrete evidence dramatically speeds up diagnosis."
  },
  {
    id: 30,
    category: "fibroids",
    keywords: ["fibroid", "fibroids", "uterine fibroid", "polyp", "heavy periods fibroid", "uterine", "uterus"],
    question: "What are uterine fibroids and could I have them?",
    answer: "Fibroids are non-cancerous growths of uterine muscle, very common after age 30 (up to 70-80% of women may have some). Clues: persistently heavy bleeding with clots, bleeding longer than 7 days, a feeling of fullness or a firm lower belly, and anemia from blood loss. Small fibroids often need no treatment; larger ones are managed with meds, IUD, or minor procedures.",
    lifestyleTip: "If your bleeding is heavy, check your ferritin/hemoglobin - anemia fatigue is often mistaken for laziness."
  },
  {
    id: 31,
    category: "pcos",
    keywords: ["pcos diet", "pcos weight", "pcos exercise", "reverse pcos", "manage pcos", "insulin resistance"],
    question: "How do I manage PCOS naturally?",
    answer: "PCOS is managed, not cured - and 5 habits do most of the work: 1) Low-glycemic meals (millets, dal, greens, protein at every meal) to steady insulin. 2) A 30-minute brisk walk after meals (best insulin-lowering habit). 3) Sleep 7-8 hours - poor sleep worsens insulin resistance. 4) Inositol or spearmint tea (evidence-backed for cycles/hair) after checking with your doctor. 5) Track cycles - 3 regular months means your plan is working.",
    lifestyleTip: "Walking for 15 minutes right after lunch is more PCOS-effective than a hard workout once a week."
  },
  {
    id: 32,
    category: "thyroid",
    keywords: ["thyroid", "hypothyroid", "hashimoto", "tsh", "hyperthyroid", "weight gain thyroid"],
    question: "Can thyroid problems affect my periods?",
    answer: "Yes - thyroid hormones directly regulate your reproductive hormones. An underactive thyroid (hypothyroid) often causes late, heavy or skipped periods plus weight gain, fatigue, hair fall and feeling cold. An overactive thyroid can cause short, light or missed periods, rapid heartbeat and anxiety. A simple TSH blood test settles it, and treatment usually normalizes cycles within a few months.",
    lifestyleTip: "If you also have PCOS, get thyroid tested too - the two often overlap and confuse the picture."
  },
  {
    id: 33,
    category: "anemia",
    keywords: ["anemia", "iron deficiency", "pale", "tired all the time", "weakness", "low haemoglobin", "fatigue", "exhausted", "anaemic", "anaemia", "haemoglobin", "low hb"],
    question: "Am I anemic from heavy periods?",
    answer: "Classic iron-deficiency signs with periods: tiredness that sleep doesn't fix, pale face/lips/inner eyelids, breathlessness on stairs, dizziness on standing, brittle nails, unusual cravings for ice or clay, and cold hands/feet. Heavy or 7+ day periods are a common cause. A CBC/ferritin test confirms it. Treatment is iron-rich food (dates, ragi, spinach, jaggery, red meat) plus vitamin C to boost absorption, and an iron supplement if levels are low.",
    lifestyleTip: "Have iron food with lemon/citrus and avoid tea/coffee within an hour - they block iron absorption."
  },
  {
    id: 34,
    category: "pregnancy",
    keywords: ["pregnant", "pregnancy", "pregnancy test", "early signs of pregnancy", "missed period pregnant", "conceiving", "baby", "missed period nauseous", "missed period nausea", "nausea after missed period", "late period vomiting", "am i pregnant", "pregnant or late"],
    question: "How do I know if I'm pregnant, and when should I test?",
    answer: "Early signs: a missed period, sore/puffy breasts, tiredness, nausea, more frequent urination, and light spotting (implantation). Take a home urine test from the first day of your missed period - testing too early gives false negatives. A blood hCG test at a clinic is accurate from about 10 days after conception. If you've had unprotected sex and your period is 10+ days late, test.",
    lifestyleTip: "Use first-morning urine for the most sensitive home test result."
  },
  {
    id: 35,
    category: "contraception",
    keywords: ["birth control", "contraception", "pill", "condom", "iud", "avoid pregnancy", "family planning", "prevents pregnancy"],
    question: "What are my birth control options?",
    answer: "Main options: 1) Condoms - only method also protecting against STIs, no prescription needed. 2) Oral contraceptive pill - 99% effective if taken daily; also lightens periods and helps PCOS/acne. 3) IUD - 3-10 years of set-and-forget protection (copper or hormonal). 4) Injectable/implant - discreet, 1-3 monthly. 5) Emergency pill - for accidents only, not routine. Your gynecologist can match one to your cycle, flow and plans.",
    lifestyleTip: "Correct and consistent use matters more than which method you choose - pick the one you'll actually stick with."
  },
  {
    id: 36,
    category: "contraception",
    keywords: ["emergency pill", "i pill", "morning after", "unprotected", "plan b", "accident", "condom broke"],
    question: "I had unprotected sex - what should I do?",
    answer: "Act within the window: an emergency pill (i-pill/Levonorgestrel) works best within 24 hours and can be used up to 72 hours; the Ella pill works up to 120 hours. It is NOT an abortion pill - it delays or prevents ovulation and is less effective than regular methods. Expect a slightly earlier or irregular next period. For ongoing protection, start a regular method and use condoms for STI safety.",
    lifestyleTip: "Don't rely on emergency pills month after month - they're a backup, not a routine method."
  },
  {
    id: 37,
    category: "fertility",
    keywords: ["conceive", "trying to get pregnant", "how to get pregnant", "fertility", "infertility", "not conceiving", "ovulation test"],
    question: "How can I improve my chances of conceiving?",
    answer: "Maximize your fertile window: have intercourse every 1-2 days from day 9 to day 18 of a 28-day cycle, especially the 2 days before and day of ovulation (egg-white discharge is your natural sign). Also: start folic acid 400-800mcg now, maintain a healthy weight, stop smoking/alcohol, manage stress, and both partners get basic fertility checks if there's no success after 12 months (or 6 months if over 35).",
    lifestyleTip: "An LH ovulation test strip (cheap, at-home) removes the guesswork on your most fertile days."
  },
  {
    id: 38,
    category: "stis",
    keywords: ["sti", "std", "hiv", "sexual infection", "safe sex", "condom disease", "gonorrhea", "chlamydia"],
    question: "How do I protect myself from sexual infections (STIs)?",
    answer: "Protection basics: use a condom every time, limit partners, and get tested together before stopping protection. Warning signs needing a doctor: unusual discharge, genital sores/warts, burning urination, or pelvic pain after sex. Many STIs (chlamydia, early HIV) show NO symptoms - so regular screening matters more than waiting for signs. HPV vaccination prevents cervical cancer and is recommended from age 9-26 (and beyond in some cases).",
    lifestyleTip: "A routine annual screening is the single most reliable way to catch silent STIs early."
  },

  // ---------- CANCER SCREENING ----------
  {
    id: 39,
    category: "screening",
    keywords: ["pap smear", "papsmear", "cervical", "cervix", "hpv vaccine", "cancer screening", " cervical cancer"],
    question: "Do I need a Pap smear or HPV vaccine?",
    answer: "Yes, once you're sexually active (or from age 21-25 depending on guidelines): a Pap smear every 3 years screens for cervical cell changes caused by HPV. The HPV vaccine (Gardasil) prevents the high-risk virus strains behind nearly all cervical cancer - given from age 9, ideally before first sexual contact; catch-up doses go up to 26-45. Cervical cancer is one of the most preventable cancers precisely because of these two tools.",
    lifestyleTip: "Book the vaccine + first Pap together in one gynecologist visit - one appointment, decades of protection."
  },
  {
    id: 40,
    category: "screening",
    keywords: ["breast self exam", "breast cancer", "lump", "mammogram", "breast check"],
    question: "How do I check my breasts for problems?",
    answer: "Do a simple breast self-exam once a month, ideally 3-5 days after your period when tissue is least lumpy: with arms down, look in a mirror for shape/dimpling changes; then feel each breast in small circles using flat fingers - covering the whole area from collarbone to below the breast and armpit. Note any NEW discrete lump, one-sided skin dimpling, nipple inversion or bloody discharge and get it checked. Family history? Ask about earlier mammography.",
    lifestyleTip: "Link the check to the first day of your period each month - your cycle becomes the reminder."
  },

  // ---------- MENOPAUSE ----------
  {
    id: 41,
    category: "menopause",
    keywords: ["menopause", "menopausal", "hot flashes", "hot flushes", "no period 40s", "perimenopause", "end of periods", "night sweats"],
    question: "Am I in menopause? What are the signs?",
    answer: "Menopause is confirmed after 12 months with no period (average age ~51; can be 45-55). The lead-up - perimenopause, usually starting in the mid-40s - brings irregular or skipped cycles, hot flushes, night sweats, sleep trouble, vaginal dryness, mood changes and a heavier or lighter flow than before. Symptoms can last 4-10 years but are very manageable with lifestyle, hormonal or non-hormonal treatment.",
    lifestyleTip: "Layered cotton clothing + a cool room + limiting alcohol and spice dramatically reduce hot flush triggers."
  },
  {
    id: 42,
    category: "menopause",
    keywords: ["vaginal dryness", "dryness during sex", "pain during intercourse", "lubricant", "low libido menopause", "loss of desire"],
    question: "Why has sex become painful or dry?",
    answer: "Falling estrogen in perimenopause/menopause thins and dries vaginal tissues (genitourinary syndrome of menopause), making sex uncomfortable - also common right after childbirth and while breastfeeding. Solutions that work: a quality water-based or silicone lubricant, longer foreplay, estrogen moisturizers/cream (prescription), and pelvic floor relaxation. Painful sex also has other causes (infection, endometriosis) - mention it to your gynecologist rather than pushing through.",
    lifestyleTip: "Buy a good lubricant the same way you'd buy moisturizer - comfort should never be optional."
  },
  {
    id: 43,
    category: "menopause",
    keywords: ["libido", "sex drive", "no desire", "low libido", "not in mood", "desire decreased"],
    question: "Is it normal to have a low sex drive sometimes?",
    answer: "Completely normal - libido naturally fluctuates with cycle phase (many feel it peak near ovulation), stress, sleep, relationship comfort, medications (SSRIs, pills) and hormones (postpartum, perimenopause). Persistent loss of desire plus fatigue, hair fall or cold intolerance can point to thyroid or low iron - worth a blood test. It returns more often than not once the underlying factor is addressed.",
    lifestyleTip: "Sleep, stress and relationship safety move libido far more than any supplement does."
  },

  // ---------- MENTAL HEALTH & LIFESTYLE ----------
  {
    id: 44,
    category: "mental_health",
    keywords: ["stress", "anxiety", "panic", "overwhelmed", "burnout", "not sleeping", "insomnia", "mental health", "sleep better", "cant sleep", "sleep before period", "insomnia before period"],
    question: "How do I manage stress, anxiety or bad sleep?",
    answer: "For the body and cycle, evidence-backed basics: 1) Fixed sleep/wake time (even weekends) - irregular sleep raises cortisol and delays periods. 2) Daily 20-30 min walk or yoga - one of the strongest anti-anxiety interventions. 3) 4-7-8 breathing (inhale 4, hold 7, exhale 8) when panic rises. 4) Reduce caffeine after 2 pm. 5) Talk to someone - a friend or counselor. If low mood, hopelessness or panic persists beyond 2 weeks, please reach out to a mental health professional.",
    lifestyleTip: "Write tomorrow's top 3 tasks before bed - a racing mind sleeps far better with a parked to-do list."
  },
  {
    id: 45,
    category: "mental_health",
    keywords: ["body image", "hating my body", "weight shame", "period shame", "embarrassed", "taboo", "alone", "scared of periods"],
    question: "I feel ashamed or embarrassed about my body/periods.",
    answer: "You're not alone, and none of this is dirty or shameful. Periods, discharge, body hair and mood shifts are basic human biology - roughly half the population goes through it. What you're feeling usually comes from growing up in silence around these topics, not from anything real. Learning how your body works (as you're doing now) is itself the cure for most of that fear. Ask the awkward question here - nothing is logged anywhere.",
    lifestyleTip: "Try explaining one period fact to a friend - teaching it back kills the embarrassment fast."
  },

  // ---------- EVERYDAY PRACTICALS ----------
  {
    id: 46,
    category: "diet",
    keywords: ["period food", "eat during period", "what to eat in periods", "diet for periods", "iron food", "period cramps food"],
    question: "What should I eat while I'm on my period?",
    answer: "Best period plate: 1) Iron back-up - dates, jaggery, ragi, spinach, dal, red meat or eggs (you lose iron with blood). 2) Omega-3s - walnuts, flaxseed, fish to calm inflammation/cramps. 3) Magnesium - pumpkin seeds, bananas, dark chocolate to relax muscles. 4) Warm soups, curd rice, khichdi for easy digestion. 5) Plenty of water and hydrating fruits. Vitamin C (lemon, amla) with iron meals boosts absorption.",
    lifestyleTip: "A pinch of lemon on your dal/spinach measurably increases the iron you absorb from it."
  },
  {
    id: 47,
    category: "diet",
    keywords: ["water", "hydration", "how much water", "drinking", "dehydrated"],
    question: "How much water should I drink daily?",
    answer: "Aim for roughly 2.5-3 liters a day (about 8-10 glasses), more if it's hot, you're exercising, or your flow is heavy. Dehydration worsens bloating, headaches, constipation and UTI risk - all of which pile up around your period. A simple test: pale straw-colored urine means you're well hydrated; dark yellow means catch up.",
    lifestyleTip: "Keep a 1-liter bottle and finish it twice - it's the simplest health habit with the biggest payoff."
  },
  {
    id: 48,
    category: "fitness",
    keywords: ["yoga for cramps", "poses for period", "stretch for period", "exercise for pain", "home workout period", "which exercises"],
    question: "Which exercises or yoga poses help period pain?",
    answer: "Top picks (all in the Fitness tab with animations): 1) Pelvic Tilts - releases lower-back grip. 2) Cat-Cow - opens the pelvis and eases cramps. 3) Child's Pose - decompresses the lower back. 4) Butterfly Pose - opens pelvic muscles and soothes cramps. 5) Supine spinal twist - relieves backache. 6) A 20-minute walk - endorphins act as natural painkillers. Hold each stretch 30-45 seconds and breathe into it; never push into sharp pain.",
    lifestyleTip: "Gentle movement daily beats one intense workout weekly for cycle pain."
  },
  {
    id: 49,
    category: "hygiene_products",
    keywords: ["pad rash", "rash", "itching pad", "skin irritation", "chafing", "allergy pad"],
    question: "I get rashes or itching from pads - what do I do?",
    answer: "Pad rash comes from prolonged dampness, friction and fragrance chemicals. Fix it: change every 4-6 hours (even on light days), choose unscented/chemical-free pads, dust a little plain talc-free cornstarch or use a barrier cream, wear cotton underwear, and give your skin air time at home. If rash persists with red welts or swelling, you may have a contact allergy - switch brands or try cloth pads/a cup.",
    lifestyleTip: "Never keep a pad on overnight beyond 8 hours - night is the best time to let the skin breathe."
  },
  {
    id: 50,
    category: "hygiene_products",
    keywords: ["toxic shock", "tampon forgotten", "left tampon in", "tss", "cup safe", "safe to use cup"],
    question: "Are tampons and cups actually safe?",
    answer: "Yes, when used correctly. Tampons: change every 4-8 hours, use the lowest absorbency for your flow, and remove the last one (toxic shock syndrome is rare but serious - seek care for sudden high fever + rash + dizziness while using one). Cups: medical-grade silicone is body-safe, holds more, and lowers rash/TSS risk; boil 5-7 minutes between cycles and wash hands before insertion. Never use both at once.",
    lifestyleTip: "Set a phone reminder for tampon changes on busy days - it takes the guesswork out completely."
  },
  {
    id: 51,
    category: "period_tracking",
    keywords: ["track cycle", "how to track", "calendar", "ovulation app", "predict next period", "irregular tracking"],
    question: "How do I track my cycle properly?",
    answer: "Track four things daily in the Cycle tab: 1) Day 1 of bleeding (that's what predictions run on). 2) Flow level (light/medium/heavy). 3) Symptoms and pain score. 4) Mood. After 3 cycles you'll see your average length, your real ovulation window, and patterns like 'cramps always on day 1' or 'mood dips day 24'. Irregular cycles still become predictable once patterns emerge.",
    lifestyleTip: "Log it the moment you notice bleeding - end-of-day memories shift dates and ruin predictions."
  },
  {
    id: 52,
    category: "partner_support",
    keywords: ["boyfriend", "partner", "husband", "how to support", "tell him", "he doesn't understand"],
    question: "How can my partner understand or support me during periods?",
    answer: "Practical asks that help most: a warm water bottle or lower-back massage, no debate when you say you need rest, picking up pads/medicine without fuss, tolerating mood shifts without taking them personally, and doing a few extra chores on days 1-2. Being specific works better than hoping he'll guess - 'heat pad + quiet evening' beats 'I feel bad'.",
    lifestyleTip: "Share the Reminders card on Home - it turns support from guesswork into a checklist."
  },
  {
    id: 53,
    category: "cycle_basics",
    keywords: ["spotting between periods", "mid cycle bleeding", "brown spotting", "bleeding not period", "breakthrough bleeding"],
    question: "I'm spotting between periods - should I worry?",
    answer: "Light spotting mid-cycle can be normal (ovulation spotting, implantation if sexually active, or starting/stopping birth control hormones). It's usually pink or brown, lasts a few hours to 1-2 days, and needs no treatment. See a doctor if: it's bright red and heavy, happens after sex, recurs every month, has an odor, or comes with pain - those need a cause identified.",
    lifestyleTip: "Note the date and color in your journal - the pattern tells the doctor far more than memory does."
  },
  {
    id: 54,
    category: "cycle_basics",
    keywords: ["period lasted 2 days", "period only 1 day", "short period", "period ended early", "very light period", "period last", "long does a period", "how many days of period"],
    question: "My period only lasted 1-2 days - is something wrong?",
    answer: "Short or light periods can be normal - especially with stress, sudden weight change, high exercise load, breastfeeding, perimenopause, or coming off birth control. Very light flow can also occasionally mean pregnancy. If periods consistently last under 2 days or flow drops noticeably from your usual, check a TSH (thyroid) test and pregnancy first - both are simple to rule out.",
    lifestyleTip: "Compare with your own normal, not your friends' - bodies vary far more than people admit."
  },
  {
    id: 55,
    category: "cycle_basics",
    keywords: ["period came twice", "twice a month", "frequent periods", "two periods", "too often"],
    question: "I got my period twice in one month - is that normal?",
    answer: "One off double month usually comes from stress, illness, travel, ovulation shifts or forgetting birth control pills - cycles can restart and land twice in one calendar month. If it repeats for 3+ cycles, or bleeding is heavy/painful, get checked for fibroids, polyps, infection, thyroid issues or perimenopause. Calendar confusion is common too: two 'periods' 21 days apart still counts as a normal short cycle.",
    lifestyleTip: "Track in the app rather than by calendar date - cycles count from Day 1, not from the month's start."
  },
  {
    id: 56,
    category: "postpartum",
    keywords: ["after birth", "postpartum", "breastfeeding period", "baby", "delivery", "after pregnancy"],
    question: "When do periods return after childbirth?",
    answer: "If you're exclusively breastfeeding, periods often stay away for months (lactational amenorrhea - though ovulation can still surprise you). If not breastfeeding, expect bleeding to restart around 6-10 weeks postpartum. The first few cycles can be heavier, more painful or irregular as hormones settle. Whenever they return, ovulation happens BEFORE bleeding - so fertility can return before you see a period.",
    lifestyleTip: "Fertility can return before your first postpartum period - don't assume breastfeeding is protection."
  },
  {
    id: 57,
    category: "cycle_basics",
    keywords: ["painful period normal", "how much pain is normal", "can't function", "worst pain", "pain scale"],
    question: "How much period pain is actually normal?",
    answer: "Mild-to-moderate cramps for 1-3 days that ease with heat, rest or a painkiller are normal. It stops being 'normal' when: pain doesn't respond to NSAIDs, prevents you going to school/work, is worsening cycle by cycle, starts before bleeding, or comes with vomiting, fever or heavy bleeding. That pattern points to endometriosis, fibroids or infection - all diagnosable and treatable.",
    lifestyleTip: "If painkiller + heat doesn't take the edge off within an hour, that's the signal to get it checked."
  },
  {
    id: 58,
    category: "hygiene",
    keywords: ["swimming period", "bath period", "shower period", "wash hair period", "gym swimming"],
    question: "Can I swim, bathe or wash my hair during my period?",
    answer: "Yes to all three - there is no medical reason to avoid bathing, showering or washing hair during your period; warm baths can even ease cramps. For swimming, a menstrual cup or tampon works well (change right after). Bathing reduces cramps and keeps you fresh. The only real rules are changing protection regularly and drying well afterward.",
    lifestyleTip: "A warm bath on day 1 is one of the cheapest, most effective cramp relievers there is."
  },
  {
    id: 62,
    category: "hair",
    keywords: ["hair fall", "hair loss", "falling hair", "thinning hair", "hair thinning", "losing hair", "balding", "hair breakage"],
    question: "Why am I losing so much hair?",
    answer: "Losing 50-100 hairs a day is normal. Excess shedding (telogen effluvium) is usually triggered by: 1) Hormone shifts around your period, pregnancy or stopping birth control. 2) Iron/ferritin deficiency from heavy periods. 3) Thyroid imbalance. 4) Crash dieting, fever, surgery or intense stress - often 2-3 months AFTER the trigger. 5) PCOS-related thinning, which also brings acne and facial hair. Most of these are reversible once the underlying cause is treated - start with a CBC, ferritin and TSH test.",
    lifestyleTip: "Protein at every meal plus iron-rich foods (dates, ragi, spinach) do more for hair than any supplement stack."
  },
  {
    id: 63,
    category: "sexual_health",
    keywords: ["sex during period", "period sex", "sex on period", "intercourse during period", "safe to have sex in periods", "sex while bleeding"],
    question: "Is it safe to have sex during my period?",
    answer: "Yes - period sex is safe for most people. The cervix sits slightly open, but the uterus is protected and infection risk isn't raised by sex itself. Many people actually enjoy it: orgasm can ease cramps, and the flow acts as natural lubrication. Use a condom for STI protection, expect more mess (dark towels help), and skip it entirely if you have heavy bleeding or pain. If it hurts, add lubrication and see a gynecologist if pain persists.",
    lifestyleTip: "A warm shower first removes the mess-factor and relaxes the muscles that cause cramps."
  },
  {
    id: 59,
    category: "cycle_basics",
    keywords: ["period after sex", "bleeding after sex", "spotting after intercourse", "post coital bleeding"],
    question: "I bled right after sex - is that normal?",
    answer: "One-off light spotting after sex is usually from dryness or mild friction - especially common postpartum, on birth control pills, or in perimenopause. It can also signal an infection, cervical inflammation, polyps or (rarely) something needing a smear check. See a doctor if it happens repeatedly, is heavier than spotting, has an odor, or comes with pain - a gynecologist can find the cause quickly.",
    lifestyleTip: "More lubrication and unhurried timing eliminate most cases of post-sex spotting."
  },
  {
    id: 60,
    category: "emergency_selfcare",
    keywords: ["what to do now", "right now relief", "immediate help", "can't bear pain", "emergency self care"],
    question: "My period just started and I'm in bad shape - what do I do right now?",
    answer: "Right-now checklist: 1) Heat pad or hot water bottle on the lower abdomen (15-20 min). 2) Take an NSAID early - Ibuprofen or Mefenamic acid works better before pain peaks (if safe for you). 3) Sip warm ginger tea and water. 4) Lie down with a pillow under the knees. 5) Change protection every 4-6 hours. 6) Distract: dim light, slow breathing. If pain is 8+/10, with fever, vomiting or soaking through pads hourly - go to a doctor today.",
    lifestyleTip: "Keep a 'period kit' ready: pad, painkiller, chocolate, heat pad - being prepared kills the panic."
  },

  {
    id: 64,
    category: "hygiene",
    keywords: ["change pad", "pad change", "how often change", "changing pads", "pad hours", "every hours pad", "change tampon", "tampon hours", "how often change pad"],
    question: "How often should I change my pad, tampon or cup?",
    answer: "Change on the clock, not on feel: pads every 4-6 hours (sooner on heavy days), tampons every 4-8 hours and never beyond 8, menstrual cups every 8-12 hours, liners every 4-6 hours. Old blood sitting against skin breeds bacteria - that's what causes rashes, odor and irritation, and leaving a tampon in too long raises the rare but serious TSS risk. Night routine: fresh pad before bed, change first thing in the morning.",
    lifestyleTip: "Set a gentle 4-hour phone reminder on heavy days - once it's a habit, you never have to think about it again."
  },
  {
    id: 65,
    category: "pain",
    keywords: ["when to see doctor", "see a doctor", "when is pain normal", "pain not normal", "gynecologist", "serious period pain", "pain red flag", "doctor for pain", "period pain not normal"],
    question: "When is period pain not normal, and when should I see a doctor?",
    answer: "Get checked if your pain: lasts more than 3 days every cycle despite NSAIDs and heat; needs stronger medicine than ibuprofen; stops you working or attending class; starts 1-2 weeks BEFORE bleeding or keeps worsening year after year (the classic endometriosis pattern); comes with fever, vomiting or fainting; is sharply one-sided; or follows very heavy bleeding (anemia). Also see a gynecologist for cycles under 21 or over 35 days, bleeding between periods, bleeding after sex, or any NEW pain after 30. A 3-cycle symptom diary is the fastest route to a real diagnosis.",
    lifestyleTip: "Pain that gets worse cycle after cycle is the biggest endometriosis clue - track it instead of normalizing it."
  },

  // ---------- WHOLE-BODY ANATOMY & SYSTEMIC HEALTH (src/data/anatomyFaqData.js) ----------
  ...ANATOMY_FAQ
];

// ---------------- Small talk & capability replies ----------------
const SMALL_TALK = [
  {
    match: ["hi", "hello", "hey", "namaste", "good morning", "good evening", "yo", "hola"],
    answer: "Hey! I'm Femi - your private, on-device health companion. Ask me anything about your body: periods, cramps, discharge, PCOS, puberty, pregnancy, contraception, menopause, diet, fitness or feelings. Nothing you type ever leaves this device.",
    suggestions: ["Why is my period late?", "Is white discharge normal?", "How do I track my cycle?"]
  },
  {
    match: ["thank", "thanks", "thank you", "thx", "great thanks"],
    answer: "Always happy to help! Remember, everything we discuss stays right here on your device - no servers, no logs. Come back anytime something's on your mind.",
    suggestions: ["What should I eat during periods?", "Yoga poses for cramps", "When am I most fertile?"]
  },
  {
    match: ["who are you", "what are you", "are you real", "are you an ai", "how do you work", "are you a bot"],
    answer: "I'm Femi, an offline health assistant built into FemCare. I answer from a curated, on-device knowledge base covering the female body - I don't call any server, so your questions are never stored or shared. Think of me as a well-read friend who's available at 2 AM without any judgment.",
    suggestions: ["What can you help with?", "Is my data really private?", "How does the menstrual cycle work?"]
  },
  {
    match: ["what can you help", "what can you do", "help me", "capabilities", "topics"],
    answer: "The whole female body - not just periods. Try me on: 1) Reproductive anatomy (uterus, ovaries, tubes, cervix, vagina, vulva, clitoris, pelvic floor), 2) Breasts (lumps, discharge, asymmetry), 3) Urinary (UTIs, leakage), 4) Gut & digestion, 5) Bones, muscles & nerves, 6) Skin, hair & nails, 7) Hormones & metabolism (thyroid, vitamin D, cortisol), 8) Heart & circulation, 9) Puberty, pregnancy, postpartum & menopause, 10) Cancer awareness & infection triage, plus cycle basics, cramps, PCOS, contraception and mood. Just ask in your own words.",
    suggestions: ["What are fallopian tubes?", "Why do I leak urine when I sneeze?", "What are the warning signs of ovarian cancer?"]
  },
  {
    match: ["private", "privacy", "will anyone see", "is this safe", "my data", "stored", "server"],
    answer: "100% private. Every message stays in this browser's local storage on YOUR device - there is no backend, no account, and no analytics. You can erase everything instantly with the trash icon in the top corner.",
    suggestions: ["Who are you?", "How does the menstrual cycle work?", "What should I eat in periods?"]
  },
  {
    match: ["bye", "good night", "goodnight", "see you", "ttyl"],
    answer: "Take care of yourself! Rest, hydrate and be kind to yourself today. I'll be right here whenever you need me.",
    suggestions: ["Why am I so tired before periods?", "How much water should I drink?", "Tips for better sleep"]
  },
  {
    match: ["i love you", "love you", "you're the best", "you are the best"],
    answer: "That's so sweet of you! Right back at you - now go drink a glass of water and stretch for two minutes. Small acts of self-care add up.",
    suggestions: ["Yoga poses for cramps", "What should I eat today?", "How do I reduce stress?"]
  },
  {
    match: ["are you a doctor", "medical advice", "diagnose", "diagnosis", "prescribe"],
    answer: "I'm an educational assistant, not a doctor - I can explain what's likely going on and when to get checked, but I can't diagnose or prescribe. For anything persistent, severe or worrying, please see a gynecologist. I'll always flag red-flag symptoms when I spot them.",
    suggestions: ["When is period pain not normal?", "When should I see a gynecologist?", "What are emergency warning signs?"]
  }
];

// ---------------- Intelligent offline matcher ----------------
const STOP_WORDS = new Set([
  "the", "a", "an", "is", "are", "was", "were", "be", "been", "do", "does", "did",
  "i", "me", "my", "you", "your", "it", "its", "this", "that", "of", "to", "in",
  "on", "at", "for", "with", "and", "or", "can", "could", "should", "would", "will",
  "what", "why", "how", "when", "who", "which", "am", "if", "so", "just", "very",
  "have", "has", "had", "not", "no", "any", "some", "there", "here", "about",
  "during", "please", "really", "much", "many", "also", "always", "never",
  "still", "even", "ever", "tell", "something"
]);

export function normalize(text) {
  return String(text || "")
    .toLowerCase()
    .replace(/[''`]/g, "")
    .replace(/[^a-z0-9\u0900-\u097f\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

// Naive singular stem so "periods/period", "cramps/cramp" match each other
function stem(word) {
  return word.length > 3 && word.endsWith("s") && !word.endsWith("ss")
    ? word.slice(0, -1)
    : word;
}

export function tokenize(text) {
  return normalize(text).split(" ").filter(Boolean);
}

function stemPhrase(text) {
  return tokenize(text).map(stem).join(" ");
}

function contentTokens(text) {
  return tokenize(text)
    .map(stem)
    .filter((w) => w.length > 2 && !STOP_WORDS.has(w));
}

// Document frequency over the corpus => rare, specific words weigh more
const CORPUS_SIZE = FAQ_DATABASE.length;
const DOC_FREQ = new Map();
for (const entry of FAQ_DATABASE) {
  const unique = new Set([
    ...entry.keywords.flatMap((k) => contentTokens(k)),
    ...contentTokens(entry.question)
  ]);
  for (const token of unique) {
    DOC_FREQ.set(token, (DOC_FREQ.get(token) || 0) + 1);
  }
}
function idf(token) {
  const df = DOC_FREQ.get(token) || 0;
  return Math.log(CORPUS_SIZE / (1 + df)) + 1;
}

function buildSuggestions(excludeId) {
  const pool = FAQ_DATABASE.filter((f) => f.id !== excludeId);
  const picked = [];
  const usedCats = new Set();
  // Prefer diverse categories first
  for (const item of pool) {
    if (!usedCats.has(item.category)) {
      usedCats.add(item.category);
      picked.push(item.question);
    }
    if (picked.length >= 3) break;
  }
  return picked;
}

export function scoreEntry(entry, queryNorm, queryTokens) {
  let score = 0;
  const matchedContent = new Set();
  let phraseMatches = 0;
  const queryStemPhrase = queryTokens.map(stem).join(" ");

  // 1) Stem-aware phrase matches - strongest signal ("sex during period" ~ "sex during periods")
  for (const rawKw of entry.keywords) {
    const kwPhrase = stemPhrase(rawKw);
    if (!kwPhrase) continue;
    if (queryStemPhrase.includes(kwPhrase)) {
      const words = kwPhrase.split(" ").length;
      score += 4 + (words - 1) * 3 + Math.min(kwPhrase.length, 20) / 10;
      phraseMatches += 1;
      for (const w of kwPhrase.split(" ")) matchedContent.add(w);
    }
  }

  // 2) IDF-weighted content-token overlap with keywords (rare words count more)
  const kwTokens = new Set(entry.keywords.flatMap((k) => contentTokens(k)));
  const entryQTokens = new Set(contentTokens(entry.question));

  for (const raw of queryTokens) {
    const w = stem(raw);
    if (w.length <= 2 || STOP_WORDS.has(w)) continue;
    if (kwTokens.has(w)) {
      score += idf(w) * 1.5;
      matchedContent.add(w);
    } else if (entryQTokens.has(w)) {
      score += idf(w);
      matchedContent.add(w);
    }
  }

  // 3) Definitional intent: "what is X / explain X" must land on the entry that
  // DEFINES X (its own question starts with "What is/are/does" and names X),
  // not an older entry that merely discusses X in passing (e.g. "uterus" inside
  // the fibroids entry). Breaks otherwise-exact ties in favor of the definition.
  if (/^(what is |what are |what does |explain |tell me about |define |definition of )/.test(queryNorm)) {
    const entryQ = normalize(entry.question);
    if (/^what (is|are|does) /.test(entryQ)) {
      const qSubject = new Set(
        queryTokens.map(stem).filter((w) => w.length > 2 && !STOP_WORDS.has(w))
      );
      if (contentTokens(entry.question).some((w) => qSubject.has(w))) {
        score += 4;
      }
    }
  }

  return {
    score,
    matchedContentCount: matchedContent.size,
    phraseMatches
  };
}

// Detect a broad topic from an unmatched query so the fallback is still relevant
const FALLBACK_TOPICS = [
  {
    keys: ["pregnan", "conceiv", "fertile", "baby", "trying"],
    answer: "On pregnancy and fertility: your fertile window is the 5 days before ovulation plus ovulation day (about day 14 of a 28-day cycle), confirmed by stretchy egg-white discharge or an LH test strip. Start folic acid 400-800mcg now, maintain a healthy weight, and if there's no success after 12 months (6 months if over 35), consult a gynecologist for fertility screening.",
    tip: "Log ovulation signs for 2-3 cycles - the pattern is usually clearer than any single month feels."
  },
  {
    keys: ["breast", "nipple", "chest lump"],
    answer: "On breast health: monthly tenderness and lumpiness that eases after your period is normal hormonal change. Do a self-check 3-5 days after your period - feel the whole area including the armpit. Any NEW hard lump, one-sided dimpling, skin retraction or nipple discharge should be seen by a doctor promptly.",
    tip: "Link the check to Day 1 of your period so your cycle becomes the reminder."
  },
  {
    keys: ["hair", "hairfall", "hair fall", "bald", "thin hair"],
    answer: "On hair fall: shedding of 50-100 hairs daily is normal; more around your period or with stress is usually temporary (telogen effluvium). Persistent thinning with irregular periods, facial hair or acne points to PCOS; with cold intolerance and fatigue, to thyroid. Both are a simple blood test away.",
    tip: "Protein at every meal plus iron-rich foods do more for hair than any supplement stack."
  },
  {
    keys: ["weight", "fat", "lose weight", "obesity", "calorie"],
    answer: "On weight: cycles, water retention and hormones can move the scale 1-2 kg within a month without any fat change. Real change comes from a modest calorie deficit, protein at every meal, daily movement and sleep - crash dieting often delays periods. If weight resists despite all that, check thyroid and insulin (PCOS).",
    tip: "Weigh yourself weekly on the same morning - daily fluctuations only create noise."
  },
  {
    keys: ["period cramp", "pain", "hurt", "ache"],
    answer: "On pain: mild-to-moderate cramps for 1-3 days that ease with heat or a painkiller are normal. Pain that stops daily activity, needs stronger medication, begins before bleeding, or comes with fever/vomiting/heavy bleeding is a signal to get checked for endometriosis, fibroids or infection.",
    tip: "Take an NSAID at the FIRST twinge - early dosing works far better than waiting out the peak."
  },
  {
    keys: ["discharge", "white", "leucorrhoea", "vagina", "vaginal"],
    answer: "On vaginal health: clear or milky-white, mostly odorless discharge is completely healthy - it's the vagina cleaning itself, and it turns stretchy like egg white around ovulation. Green/yellow color, cottage-cheese texture with itching, or a strong fishy smell need a doctor's check for infection.",
    tip: "Water outside, nothing inside - the vagina manages its own pH all by itself."
  },
  {
    keys: ["mood", "sad", "depress", "cry", "angry", "irritab"],
    answer: "On mood: pre-period mood shifts are hormonal - estrogen and progesterone plunge in the late luteal phase, pulling serotonin down with them. Self-care that genuinely helps: morning sunlight, 300mg magnesium, regular sleep, and lighter commitments that week. If low mood, hopelessness or panic lasts beyond 2 weeks, please speak with a professional.",
    tip: "Name it out loud - 'this is my luteal phase' removes most of its power over you."
  },
  {
    keys: ["sleep", "insomnia", "tired", "fatigue", "exhaust"],
    answer: "On sleep and fatigue: period-week fatigue is driven by blood loss, progesterone shifts and pain, while pre-period insomnia comes from falling progesterone and rising temperature. Iron deficiency from heavy bleeding is a very common hidden cause of 'never feeling rested' - a CBC test settles it in a day.",
    tip: "Fixed wake time + morning light repairs sleep faster than any supplement does."
  },
  {
    keys: ["exercise", "gym", "run", "walk", "workout", "fitness"],
    answer: "On exercise: it's safe throughout your cycle and genuinely helps - movement releases endorphins that blunt cramps. Days 1-2 keep it gentle (walk, stretch, yin yoga); follicular and ovulatory days are your strength and HIIT window; luteal days suit steady cardio and pilates.",
    tip: "Match intensity to your energy instead of the calendar - some cycles just ask for a walk."
  },
  {
    keys: ["food", "diet", "eat", "nutrition", "vitamin", "protein"],
    answer: "On nutrition: build plates around protein at every meal, iron-rich foods (dates, ragi, spinach, jaggery, meat), magnesium (seeds, bananas, dark chocolate) and plenty of water. Pair iron with vitamin C and keep tea/coffee an hour away from iron meals - that one habit meaningfully raises your levels.",
    tip: "Add lemon to dal or spinach - it measurably increases the iron you absorb."
  },
  {
    keys: ["stress", "anxious", "panic", "overwhelm", "worried"],
    answer: "On stress and anxiety: stress genuinely delays periods by raising cortisol, which can pause ovulation. The highest-leverage fixes are daily movement, 4-7-8 breathing, fixed sleep timing, and cutting caffeine after 2 pm. If anxiety or low mood persists beyond 2 weeks, reaching out to a counselor is a strong move, not a weak one.",
    tip: "Box breathing (4-4-4-4) for one minute measurably drops stress within a single sitting."
  },
  {
    keys: ["skin", "acne", "pimple", "glow", "face"],
    answer: "On skin: pre-period breakouts along the jawline are hormonal (androgens drive sebum when estrogen drops). Gentle salicylic acid cleansing, not picking, changing pillowcases, and steady blood sugar help most. Sudden severe acne with irregular periods and facial hair is worth checking for PCOS.",
    tip: "Treat the week before your period as 'acne-prep week' rather than damage control."
  },
  {
    keys: ["hygiene", "clean", "wash", "smell", "odor", "foul"],
    answer: "On hygiene: clean only the outside with plain water, always wipe front to back, wear cotton underwear, and change pads or tampons every 4-6 hours. Doubling up on washing or using sprays inside actually creates infections rather than preventing them.",
    tip: "Set a phone reminder for pad changes on heavy days - it removes all the guesswork."
  },
  {
    keys: ["menopause", "hot flash", "perimenopause", "menopaus"],
    answer: "On menopause: it's confirmed after 12 missed months (average age ~51), preceded by perimenopause in the mid-40s with irregular cycles, hot flushes, night sweats, sleep changes and vaginal dryness. Symptoms are very manageable with lifestyle, hormonal or non-hormonal options - no need to simply endure them.",
    tip: "Layered cotton clothing and a cool bedroom cut hot-flush disruption dramatically."
  },
  {
    keys: ["puberty", "first period", "menarche", "teen", "young"],
    answer: "On puberty: first periods usually arrive between 10-15, most often a year or two after breast budding and 6-12 months after white discharge begins. The first cycles are often irregular - that's normal. Knowing the signs in advance is what removes the fear when it happens.",
    tip: "Keep a pad in the bag once discharge appears - preparedness beats panic every time."
  },
  {
    keys: ["tablet", "medicine", "pill", "drug", "antibiotic", "supplement", "dosage"],
    answer: "On medicines: for cramps, an NSAID like Ibuprofen or Mefenamic acid works best when taken early. Painkillers are not a fix for recurring severe pain - that needs a diagnosis. Supplements worth discussing: iron (if heavy bleeding), vitamin D, magnesium and folic acid (if trying to conceive). Always confirm doses with your doctor or pharmacist, especially if you're on birth control or antibiotics.",
    tip: "Keep a note of anything you take regularly - it saves time at every doctor visit."
  },
  {
    keys: ["emergency", "hospital", "ambulance", "dangerous", "serious"],
    answer: "Go to a doctor or emergency room TODAY if any of these appear: soaking 2+ pads hourly for 2 hours, fainting, clots bigger than a 10-rupee coin, fever with foul-smelling discharge, severe one-sided pelvic pain, or bleeding during pregnancy. India's emergency numbers are 112 (general) and 102/108 (ambulance).",
    tip: "When in doubt, get checked - no gynecologist has ever judged someone for coming in early."
  },
  {
    keys: ["sex", "intercourse", "partner", "libido", "desire"],
    answer: "On sexual health: period sex is safe for most people (flow can even ease cramps), libido naturally peaks near ovulation, and dryness or pain is usually fixable with lubricant and more foreplay. Painful sex, post-sex bleeding or unusual discharge after sex should be checked by a gynecologist rather than pushed through.",
    tip: "Comfort and communication move sexual wellbeing far more than any product does."
  }
];

export function queryAIKnowledgeBase(userQuery) {
  if (!userQuery || userQuery.trim() === "") {
    return {
      answer: "I'm Femi, your private health companion! You can ask me about cramps, late periods, PCOS, diet tips, hygiene, or flow concerns. All questions remain 100% private on your device.",
      isEmergency: false,
      suggestedTopics: ["Relieving cramps", "Late period causes", "PCOS symptoms", "Luteal diet"]
    };
  }

  const queryNorm = normalize(userQuery);
  const queryTokens = tokenize(userQuery);

  // 1. Emergency red flags first - always
  for (const flag of EMERGENCY_RED_FLAGS) {
    if (flag.keywords.some((k) => queryNorm.includes(normalize(k)))) {
      return {
        answer: flag.alert,
        isEmergency: true,
        severity: flag.severity,
        actionAdvice: "Please do not wait. Call 112 (National Emergency), 102/108 (Ambulance), or have a family member accompany you to the nearest emergency room immediately.",
        helpline: "112 / 102 / 108"
      };
    }
  }

  // 2. Small talk / capability questions
  const bareQuery = queryNorm.replace(/[?!]/g, "").trim();
  for (const item of SMALL_TALK) {
    if (item.match.some((m) => bareQuery === m || bareQuery.startsWith(m + " ") || bareQuery.endsWith(" " + m))) {
      return {
        answer: item.answer,
        isEmergency: false,
        suggestedTopics: item.suggestions
      };
    }
  }

  // 3. Weighted knowledge-base scoring (phrases > rare tokens > common overlap)
  let bestMatch = null;
  let bestScore = 0;
  let bestHits = 0;
  let bestPhrases = 0;

  for (const entry of FAQ_DATABASE) {
    const { score, matchedContentCount, phraseMatches } = scoreEntry(entry, queryNorm, queryTokens);
    // Higher score wins; exact ties go to the entry matching MORE distinct
    // content words (e.g. "missed period ... not pregnant" must beat an
    // entry that only shares "pregnant").
    if (score > bestScore || (score === bestScore && matchedContentCount > bestHits)) {
      bestMatch = entry;
      bestScore = score;
      bestHits = matchedContentCount;
      bestPhrases = phraseMatches;
    }
  }

  // A single stray rare word must not hijack an answer: require a phrase hit,
  // OR at least two distinct content words, OR a very strong score.
  const isSolidMatch = bestMatch && (
    bestPhrases >= 1 ||
    bestHits >= 2 ||
    bestScore >= 9
  );

  if (isSolidMatch) {
    return {
      question: bestMatch.question,
      answer: bestMatch.answer,
      lifestyleTip: bestMatch.lifestyleTip,
      category: bestMatch.category,
      isEmergency: false,
      suggestedTopics: buildSuggestions(bestMatch.id),
      confidence: bestScore >= 9 ? "high" : bestScore >= 6 ? "medium" : "low"
    };
  }

  // 5. Topic-aware fallback so answers still fit the question's area
  const topic = FALLBACK_TOPICS.find((t) =>
    t.keys.some((k) => queryNorm.includes(k) || queryTokens.includes(k))
  );
  if (topic) {
    return {
      answer: topic.answer,
      lifestyleTip: topic.tip,
      isEmergency: false,
      suggestedTopics: buildSuggestions(null)
    };
  }

  // 6. Final graceful fallback
  return {
    answer: "I want to give you a genuinely correct answer rather than guess, so here's the honest version: your question sits outside my on-device knowledge base. What I cover thoroughly is the female body - cycle phases, cramps, late/missed periods, PCOS, thyroid, discharge and infections, puberty, pregnancy and contraception, fibroids and endometriosis, menopause, diet, fitness, skin, hair and mood.\n\nCould you rephrase it a little, or pick one of the suggestions below? And if something feels wrong in your body, a gynecologist is always the right final call.",
    lifestyleTip: "Track your symptoms for 2-3 consecutive cycles in the Cycle tab - patterns answer a lot of questions.",
    isEmergency: false,
    suggestedTopics: [
      "How does the menstrual cycle work?",
      "Why is my period late?",
      "What are the signs of PCOS?"
    ]
  };
}
