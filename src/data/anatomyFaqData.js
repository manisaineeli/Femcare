// FemCare AI - Whole-Body Female Anatomy & Health Knowledge Base
// Covers the female body beyond cycles: reproductive organs, breasts, urinary,
// digestion, bones & muscles, skin/hair/nails, hormones, nerves, heart,
// sexual anatomy, pregnancy/postpartum, cancer awareness and common myths.
// Merge into FAQ_DATABASE in faqData.js.

export const ANATOMY_FAQ = [
  // ---------- MASTER OVERVIEW ----------
  {
    id: 148,
    category: "anatomy",
    keywords: ["female anatomy", "anatomy", "body parts", "female body", "female body parts", "reproductive organs", "organs", "parts of the body", "overview"],
    question: "Give me an overview of female anatomy - all the parts and what they do",
    answer: "Here's the whole-body map, system by system. 1) REPRODUCTIVE: two ovaries (store eggs, make estrogen/progesterone), two fallopian tubes (where sperm meets egg), the uterus/womb (grows a lining each cycle - what sheds as your period), the cervix (neck of the uterus, makes cycle-changing mucus), the vagina (self-cleaning canal to the outside), and the vulva (external lips, clitoris, openings). 2) URINARY: two kidneys, ureters, a bladder and a short urethra - the short female urethra is why UTIs are more common in women. 3) BREASTS: milk lobes, ducts, fat and Cooper's ligaments, cycle- and hormone-sensitive. 4) HORMONES: pituitary, thyroid, adrenals and ovaries form a feedback loop that runs your cycle, mood, metabolism and bones. 5) MUSCULO-SKELETAL: pelvis, pelvic-floor hammock supporting bladder/uterus/bowel, spine, hips and legs. 6) NERVOUS/CIRCULATORY: brain, nerves, heart and blood - estrogen protects your heart and bones until menopause. 7) DIGESTIVE: gut runs from mouth to anus and reacts to cycle hormones (constipation pre-period, loose motions on day 1). Ask me about any single part by name - I'll explain what it is, what's normal and when to get checked.",
    lifestyleTip: "Learn your own normal - knowing your baseline is what makes any real change easy to spot early."
  },
  // ---------- REPRODUCTIVE ANATOMY ----------
  {
    id: 100,
    category: "anatomy",
    keywords: ["uterus", "womb", "uterine", "what is uterus"],
    question: "What is the uterus and what does it do?",
    answer: "The uterus (womb) is a pear-shaped muscular organ sitting in the pelvis, between the bladder and rectum. Its inner lining (endometrium) thickens every cycle in case an egg implants; if no pregnancy happens, that lining sheds - that's your period. It's about the size of a fist, tilts forward over the bladder in most people, and its muscle can grow 500x during pregnancy.",
    lifestyleTip: "Warmth and gentle forward-bending stretches relax the uterine ligaments and ease cramping."
  },
  {
    id: 101,
    category: "anatomy",
    keywords: ["ovaries", "ovary", "ovarian", "what do ovaries do"],
    question: "What are ovaries and what do they do?",
    answer: "You have two ovaries, one on each side of the uterus. They do two jobs: 1) Store and release eggs (you're born with all the eggs you'll ever have - about 1-2 million at birth, ~400,000 at puberty, and only ~400 will ever ovulate). 2) Produce estrogen and progesterone, the hormones that drive your cycle, mood, bones, skin and heart protection. A twinge mid-cycle is usually one ovary releasing an egg.",
    lifestyleTip: "Cycle tracking indirectly tracks ovarian health - skipped cycles for 3+ months deserve a doctor's visit."
  },
  {
    id: 102,
    category: "anatomy",
    keywords: ["fallopian tubes", "fallopian tube", "tubes", "oviduct"],
    question: "What are the fallopian tubes?",
    answer: "The two fallopian tubes connect each ovary to the uterus. Fingers called fimbriae sweep the released egg into the tube, which is where sperm usually meets the egg - fertilization happens in the tube, not the uterus. The egg then travels 3-4 days to the uterus to implant. Blocked tubes (from past infection or surgery) are a common cause of fertility trouble, and a pregnancy that implants in the tube is an ectopic emergency.",
    lifestyleTip: "Pelvic infections left untreated are the top preventable cause of blocked tubes - treat unusual discharge early."
  },
  {
    id: 103,
    category: "anatomy",
    keywords: ["cervix", "cervical", "what is cervix", "mouth of uterus"],
    question: "What is the cervix?",
    answer: "The cervix is the lower, narrow neck of the uterus that opens into the vagina. It has two jobs: it produces mucus that changes texture across your cycle (sticky before ovulation, egg-white and stretchy at ovulation, then dry after), and it stays firmly closed to protect the uterus, opening only during labor and menstruation. It's the part sampled in a Pap smear, and it can bulge slightly or feel firm/soft depending on cycle phase.",
    lifestyleTip: "Checking your cervical mucus is one of the simplest free ways to spot your fertile window."
  },
  {
    id: 104,
    category: "anatomy",
    keywords: ["vagina", "vaginal canal", "birth canal", "what is vagina"],
    question: "What is the vagina, exactly?",
    answer: "The vagina is a flexible muscular canal running from the vulva to the cervix - about 7-10 cm long. It's the birth canal, lets period blood out, and accommodates intercourse. Its walls have folds (rugae) so it can stretch and return, it's naturally acidic (pH 3.8-4.5) to block infection, and beneficial lactobacilli bacteria keep that acid balance. It self-cleans with discharge - no internal washing needed.",
    lifestyleTip: "Never douche or put soap inside - the vagina's own acidity is your best infection defense."
  },
  {
    id: 105,
    category: "anatomy",
    keywords: ["vulva", "labia", "labia majora", "labia minora", "private parts anatomy", "external part"],
    question: "What is the vulva? What's normal down there?",
    answer: "The vulva is ALL the external female parts: the mons pubis (fat pad over pubic bone), outer lips (labia majora), inner lips (labia minora), the clitoris, urethral opening, vaginal opening and Bartholin's glands. Normal variation is huge: lips can be asymmetric, longer, shorter, darker or lighter than the rest of your skin - nearly every vulva looks different, and that's healthy. Hair, color and size change with age and hormones.",
    lifestyleTip: "Never compare yours to porn or friends - 'normal' is a very wide range for vulva appearance."
  },
  {
    id: 106,
    category: "anatomy",
    keywords: ["clitoris", "clitoral", "g spot", "pleasure organ"],
    question: "What is the clitoris?",
    answer: "The clitoris is the female pleasure organ - and it's much bigger than the visible nub. What you see (the glans, under the hood at the top of the vulva) is just the tip; internally it has two bulbs and two crura wrapping around the vagina, packed with around 8,000-10,000 nerve endings - more nerve endings than any other structure in the body, and it exists ONLY for pleasure. It has no reproductive or urinary function.",
    lifestyleTip: "Most people need direct clitoral stimulation, not intercourse, to orgasm - that's anatomy, not a problem."
  },
  {
    id: 107,
    category: "anatomy",
    keywords: ["hymen", "hymen break", "virginity test", "first time bleeding hymen"],
    question: "Is the hymen real? Does it break?",
    answer: "The hymen is a thin ring or crescent of tissue around the vaginal opening - most people are born with one. It is NOT a seal: it usually has an opening for period blood, and it stretches with age. It can widen from sports, tampons, self-exploration or intercourse - or intercourse may not change it at all. First-time bleeding is common but NOT guaranteed, and there is no reliable 'virginity test'; the idea of an intact hymen proving virginity is medically false.",
    lifestyleTip: "Anyone demanding a 'virginity check' is relying on a myth - no doctor can verify virginity from an exam."
  },
  {
    id: 108,
    category: "pelvic_floor",
    keywords: ["pelvic floor", "kegel", "kegels", "weak pelvic", "leaking when i jump"],
    question: "What is the pelvic floor and how do I strengthen it?",
    answer: "The pelvic floor is a hammock of muscles supporting your bladder, uterus and bowel. It weakens with pregnancy, childbirth, chronic coughing, heavy lifting and menopause - causing leaks when you sneeze/jump and a heavy feeling down below. Strengthen it with Kegels: squeeze the muscles that stop urine mid-flow (don't do this as your regular toilet habit), hold 5 seconds, release 5 seconds, 10 reps x 3 sets daily. Equally important: fully relax the pelvic floor - many women are too tense, not too weak.",
    lifestyleTip: "Pair Kegels with your daily habit (brushing teeth) - consistency beats intensity for pelvic floor gains."
  },
  {
    id: 109,
    category: "anatomy",
    keywords: ["endometrium", "uterine lining", "lining sheds", "why do we bleed"],
    question: "Why do we actually bleed during a period?",
    answer: "Each cycle the uterus builds a blood-vessel-rich lining (endometrium) preparing for an embryo. If no fertilized egg implants, estrogen and progesterone crash around day 28. That drop signals the lining's spiral arteries to spasm and cut blood supply; the tissue dies, enzymes called prostaglandins make the uterus contract to push it out, and the mix of blood, mucus and tissue leaves through the cervix - about 30-80 ml total over 3-7 days.",
    lifestyleTip: "Prostaglandins cause both the contractions and pain - that's why anti-inflammatory painkillers work best for cramps."
  },

  // ---------- BREASTS ----------
  {
    id: 110,
    category: "breast",
    keywords: ["breast anatomy", "what are breasts made of", "breast tissue", "boobs"],
    question: "What are breasts made of?",
    answer: "Breasts are made of: 1) Lobes and lobules (milk-producing glands, ~15-20 per breast), 2) Ducts carrying milk to the nipple, 3) Fat tissue (which mostly determines size), 4) Fibrous connective tissue and Cooper's ligaments holding shape, plus nerves and blood vessels. Breast size has zero relation to milk production. Tissue feels lumpy or granular normally and gets lumpier before periods and in caffeine-heavy cycles.",
    lifestyleTip: "A well-fitting supportive bra (measured, not guessed) protects Cooper's ligaments from stretch strain."
  },
  {
    id: 111,
    category: "breast",
    keywords: ["breasts different size", "asymmetric breasts", "one breast bigger"],
    question: "One of my breasts is bigger than the other - is that normal?",
    answer: "Yes - some degree of asymmetry affects up to 85% of people and is completely normal, especially during puberty when they develop at different rates. They may differ in size, shape or height. Sudden new asymmetry AFTER your twenties, a distinct lump, skin dimpling or nipple retraction is worth a doctor's check - change matters more than a lifelong difference.",
    lifestyleTip: "Take a baseline look in the mirror once now, so any future CHANGE is easy to notice."
  },
  {
    id: 112,
    category: "breast",
    keywords: ["nipple discharge", "breast leaking", "milky discharge", "clear fluid nipple"],
    question: "My nipples are leaking fluid - should I worry?",
    answer: "Non-pregnancy nipple discharge has common, mostly benign causes: 1) Milky/pelagic discharge can be high prolactin (stress, some medications, thyroid), 2) Clear or yellowish on squeezing is often normal gland secretions, 3) Green/brown 'cheesy' discharge from dilated ducts is usually harmless. Warning pattern: spontaneous, one-sided, single-duct, bloody or skin-crusted discharge needs prompt evaluation to rule out a duct papilla - most are still benign.",
    lifestyleTip: "Note which side, which color, and whether it happens spontaneously - that detail speeds diagnosis 10x."
  },
  {
    id: 113,
    category: "breast",
    keywords: ["breast cyst", "lumpy breasts", "fibrocystic", "painful lump breast", "sore lump"],
    question: "I found a lump - how do I know if it's dangerous?",
    answer: "Most lumps in young people are benign: fibroadenomas (smooth, round, painless, mobile - the most common young-adult lump), simple cysts (tender, vary with cycle), or normal lumpiness. Red flags needing a doctor WITHIN A WEEK: hard, irregular, fixed lump; one that doesn't move; skin dimpling like an orange; nipple pulling inward; bloody discharge; or a lump persisting after your period ends. Any new lump after age 30 should be imaged (ultrasound/mammogram).",
    lifestyleTip: "Check 5-7 days after your period starts, when normal lumpiness is at its lowest."
  },

  // ---------- URINARY ----------
  {
    id: 114,
    category: "urinary",
    keywords: ["why women get uti", "urethra", "urine infection women", "bladder infection"],
    question: "Why do women get urine infections so often?",
    answer: "Anatomy is the reason: the female urethra is only ~4 cm long (vs ~20 cm in men), so bacteria reach the bladder far more easily, and it sits close to both the vagina and anus. Additions: sex can push bacteria in (honeymoon cystitis), holding urine lets bacteria multiply, constipation presses on the bladder, and menopause lowers protective estrogen. Prevention: drink well, don't hold urine, wipe front to back, urinate after sex, and avoid spermicides/sprays.",
    lifestyleTip: "Urinating within 30 minutes after sex measurably cuts UTI risk - it's the single best habit."
  },
  {
    id: 115,
    category: "urinary",
    keywords: ["peeing when i sneeze", "urine leakage", "weak bladder", "incontinence", "can't hold urine"],
    question: "I leak urine when I sneeze or laugh - is that normal?",
    answer: "Stress incontinence (leaks with sneezing, laughing, jumping) is common after childbirth, with heavy lifting, chronic cough or weak pelvic floor - common does NOT mean you must live with it. Fix order: 1) Daily Kegels (5-sec holds, 10 reps x 3), 2) Lose fluid overload - both too little AND too much water worsen it, 3) Treat constipation/cough, 4) Cut bladder irritants (excess caffeine, citrus, fizzy drinks). See a urogynaecologist if leaks are frequent, or if you also feel urgency/frequency (that's overactive bladder, a different issue).",
    lifestyleTip: "Leaking is a muscle problem, not an aging sentence - pelvic floor physiotherapy has 70-80% success rates."
  },
  {
    id: 116,
    category: "urinary",
    keywords: ["frequent urination", "peeing too much", "urine always", "overactive bladder", "night pee"],
    question: "I'm urinating far more than usual - what could it be?",
    answer: "Common causes: 1) High fluid/caffeine/alcohol intake, 2) UTI (with burning/urgency), 3) Pregnancy (from early weeks), 4) Diabetes or prediabetes - especially if you're very thirsty, tired and losing weight, 5) Overactive bladder (sudden urgency, small volumes), 6) Diuretic medicines. Red flags: extreme thirst + large volumes + weight loss, blood in urine, fever with back pain, or new frequency after 40 - get fasting sugar and a urine test.",
    lifestyleTip: "Cut fluids 2 hours before bed and caffeine after 2 pm - most night-time peeing settles with these two changes."
  },

  // ---------- DIGESTION & GUT ----------
  {
    id: 117,
    category: "digestive",
    keywords: ["right side pain", "appendicitis", "lower right pain", "appendix pain vs period"],
    question: "How do I tell period/ovary pain from appendicitis pain?",
    answer: "Ovarian/period pain is usually lower, central or one-sided, comes in waves, tracks your cycle, and both sides can be affected. Appendicitis pain starts around the navel then settles in the LOWER RIGHT, is constant and worsening, is worse with movement/coughing, and often comes with nausea, low fever and loss of appetite - cycle phase is irrelevant. Pain with fever + vomiting + a rigid board-like belly = go to the ER immediately; don't take strong painkillers first, they can mask it.",
    lifestyleTip: "New, one-sided, non-cyclical pain always deserves medical review - your cycle can't explain everything."
  },
  {
    id: 118,
    category: "digestive",
    keywords: ["gut health", "hormones digestion", "ibs periods", "digestion cycle"],
    question: "How do hormones affect my digestion?",
    answer: "Progesterone after ovulation relaxes gut muscle, slowing transit (constipation, bloating). When prostaglandins rise before/during bleeding, the gut speeds up instead (cramps, loose motions). Estrogen also shapes your gut bacteria. That's why IBS-like symptoms often flare pre-period or on day 1 - it's hormonal, not 'in your head'. Support it with fiber (25-30g), fermented curd, 2.5-3L water, and magnesium-rich foods in the luteal phase.",
    lifestyleTip: "Track digestion alongside your cycle for 2 cycles - the hormone link becomes obvious fast."
  },

  // ---------- BONES, MUSCLES & NERVES ----------
  {
    id: 119,
    category: "musculoskeletal",
    keywords: ["sciatica", "shooting leg pain", "hip pain", "nerve pain leg", "pain down leg"],
    question: "I get shooting pain from my back/hip down my leg - what is it?",
    answer: "That pattern often involves the sciatic nerve or round ligament. Cycle-related causes: prostaglandins and fluid retention can irritate the lower back and refer pain down one/both legs pre-period and day 1. Other common causes: a disc pressing a nerve, piriformis (deep buttock) tightness from sitting, or relaxin-driven pelvic instability in pregnancy. Red flags needing prompt care: leg weakness, foot drop, numbness in the saddle area, loss of bladder/bowel control, or pain after an injury.",
    lifestyleTip: "Child's pose, piriformis stretch and the Iron Cross twist (Fitness tab) relieve most cycle-linked leg pain."
  },
  {
    id: 120,
    category: "neurological",
    keywords: ["brain fog", "cant concentrate", "memory before period", "clumsy before period", "numbness tingling"],
    question: "Why do I get brain fog or tingling before my period?",
    answer: "Pre-period brain fog (forgetfulness, slow focus, word-finding trouble) tracks the estrogen drop, which affects acetylcholine and serotonin - plus poor sleep and magnesium depletion. Mild tingling/numbness can come from B12 or iron deficiency (common with heavy periods), magnesium shortage, or anxiety breathing. Red flags needing a doctor: sudden one-sided numbness/weakness, facial droop, speech trouble (stroke - call 112), tingling that doesn't resolve, or numbness spreading.",
    lifestyleTip: "A B12 + ferritin check after heavy cycles resolves 'mystery' fatigue and tingling surprisingly often."
  },
  {
    id: 121,
    category: "musculoskeletal",
    keywords: ["joint pain", "knee pain", "body ache period", "bones ache", "all over pain"],
    question: "Why do my joints and whole body ache during my period?",
    answer: "Two mechanisms: 1) Prostaglandins create inflammation not just in the uterus but systemically, aching knees, hips and lower back, 2) Estrogen dips reduce pain buffering and can shift fluid into joint tissues. It's usually days 1-2 and eases as flow settles. Consistent all-over aching beyond your period, plus morning stiffness over 30 minutes, should be screened for inflammatory causes (thyroid, vitamin D deficiency, arthritis) with simple blood tests.",
    lifestyleTip: "Vitamin D + calcium adequacy and gentle mobility work reduce both cycle aches and long-term bone loss."
  },

  // ---------- SKIN, HAIR, NAILS ----------
  {
    id: 122,
    category: "skin",
    keywords: ["dark patches face", "pigmentation", "melasma", "chloasma", "dark spots hormonal"],
    question: "Why am I getting dark patches or pigmentation on my face?",
    answer: "Melasma ('mask of pregnancy') is driven by estrogen + progesterone + sun: UV light triggers melanocytes, which is why it darkens in summer and fades in winter. Triggers: pregnancy, birth control pills, heat, and harsh skincare. It's not dirt and won't scrub off. Management: broad-spectrum SPF 50 daily (reapply), hat, niacinamide/azelaic acid/vitamin C serums, and azelaic acid or hydroquinone under a dermatologist. It's slow but very treatable.",
    lifestyleTip: "Sunscreen does 80% of the pigmentation work - treat it as the treatment, not a bonus."
  },
  {
    id: 123,
    category: "skin",
    keywords: ["stretch marks", "stretch marks red", "striae", "marks on thighs"],
    question: "Are stretch marks permanent? Can I prevent them?",
    answer: "Stretch marks (striae) form when skin stretches faster than it can adapt - puberty growth spurts, rapid weight change, muscle gain, pregnancy and steroids all trigger them. Red/purple marks are new and inflammatory (most responsive); they fade to silvery-white scars over 6-18 months. You can't fully prevent genetics, but steady weight change, keeping skin hydrated, collagen-supporting vitamin C and not scratching reduce severity. Retinol/centella help early red marks; lasers help older ones.",
    lifestyleTip: "Marks that suddenly appear without growth/weight change are worth a doctor's review (rarely hormonal)."
  },
  {
    id: 124,
    category: "nails",
    keywords: ["nail ridges", "brittle nails", "nails breaking", "nail health", "white spots nails"],
    question: "What do my nails say about my health?",
    answer: "Common signals: brittle/splitting nails = iron or thyroid issue + water exposure; vertical ridges = usually age/genetics (normal); horizontal grooves (Beau's lines) = an illness or high fever 2-3 months ago; white spots = minor past trauma, not automatically zinc; spoon-shaped nails = iron deficiency; nail bed pale = check hemoglobin. Overall: nails reflect your last 3-6 months of nutrition - protein, iron, zinc, biotin and hydration show up here first.",
    lifestyleTip: "Gloves for chores + 6 weeks of iron-rich food usually transforms brittle nails."
  },
  {
    id: 125,
    category: "skin",
    keywords: ["dark inner thighs", "acanthosis", "dark underarms", "black neck", "insulin skin"],
    question: "Why are my inner thighs/underarms dark?",
    answer: "Velvety dark patches (acanthosis nigricans) most often signal HIGH INSULIN - strongly linked to PCOS, prediabetes and weight around the waist. Other causes: friction from chafing, shaving irritation, hormonal changes in pregnancy, or certain medicines. If it's velvety/thick rather than just discolored, get fasting insulin/glucose or HbA1c checked - treating insulin resistance often lightens it. For friction-related darkening: loose cotton clothing, no harsh scrubs, glycolic/lactic acid moisturizers, sunscreen on exposed areas.",
    lifestyleTip: "Walk 15 min after meals - improving insulin is the most effective treatment for this skin sign."
  },

  // ---------- HORMONES & METABOLISM ----------
  {
    id: 126,
    category: "endocrine",
    keywords: ["vitamin d deficiency", "vitamin d low", "sunlight vitamin"],
    question: "Could I be vitamin D deficient?",
    answer: "Very likely if you: live at high latitude, work indoors, cover up in sun, have darker skin, are overweight or rarely eat fish/eggs. Symptoms hide as: fatigue, low mood, bone aches, muscle weakness, poor sleep, frequent colds and hair shedding. It's a simple blood test; treatment is a loading dose then maintenance (often 60,000 IU weekly x 8 weeks under guidance, then 1000-2000 IU/day). Pair with calcium-rich food. Getting 15-20 min of midday sun on arms/face a few days a week helps naturally.",
    lifestyleTip: "Vitamin D works WITH magnesium - add seeds, nuts or greens or the D won't absorb well."
  },
  {
    id: 127,
    category: "endocrine",
    keywords: ["calcium", "bone health", "osteoporosis", "weak bones", "bone density"],
    question: "How do I protect my bones (calcium/osteoporosis prevention)?",
    answer: "Peak bone mass is built by ~30, then lost slowly - women lose faster after menopause when estrogen drops. Daily need: ~1000 mg calcium (curd, ragi, sesame, amaranth, fortified plant milk, small fish with bones, dal) + vitamin D for absorption + weight-bearing exercise (walking, jogging, squats, resistance). Damage accelerators: smoking, excess caffeine/alcohol, very low calorie diets, and skipped periods (low estrogen = fast bone loss). DEXA scan only if you've had fractures, long steroid use, or early menopause.",
    lifestyleTip: "Impact exercise (jumping/walking) signals bones to stay dense more directly than any supplement."
  },
  {
    id: 128,
    category: "endocrine",
    keywords: ["cortisol", "stress hormone", "belly fat stress", "adrenal fatigue", "burnout hormones"],
    question: "Can stress hormones really change my body?",
    answer: "Yes. Chronically high cortisol (work stress, poor sleep, over-exercising, dieting) acts on real mechanisms: it delays ovulation (late/missed periods), drives appetite and fat storage around the abdomen, breaks down muscle, raises blood sugar, suppresses thyroid conversion, weakens immunity and disrupts deep sleep. The fix isn't one big vacation - it's daily regulation: 7-8h sleep, walking, strength training (not extra cardio spam), protein-forward eating, and 10 min of breathing practice. Cycles often normalize within 2-3 months of genuine stress reduction.",
    lifestyleTip: "4-7-8 breathing (inhale 4, hold 7, exhale 8) x 4 rounds, twice daily - the fastest cortisol lever."
  },
  {
    id: 129,
    category: "endocrine",
    keywords: ["prolactin", "milky nipples not pregnant", "high prolactin", "no periods hormone"],
    question: "What is prolactin and why would it be high?",
    answer: "Prolactin is the hormone that makes milk; raised levels without pregnancy cause milky nipple discharge, missed/irregular periods, low libido and sometimes headaches. Common causes: some antidepressants/antipsychotics, frequent breast stimulation, hypothyroidism, stress, and rarely a benign pituitary tumor (prolactinoma - usually medication-responsive). If you have spontaneous one/both-sided milky discharge plus missed periods, ask for prolactin + TSH blood tests; treatment is straightforward.",
    lifestyleTip: "Always include TSH with prolactin - an underactive thyroid often causes both together."
  },

  // ---------- HEART & CIRCULATION ----------
  {
    id: 130,
    category: "cardiovascular",
    keywords: ["heart racing", "palpitations", "heart beating fast", "heart flutter", " skipped beats"],
    question: "My heart races or flutters sometimes - when is it hormonal vs serious?",
    answer: "Benign/hormonal causes are common: palpitations pre-period and during menopause (estrogen affects the electrical system), anxiety/adrenaline surges (often felt as skipped beats), anemia from heavy bleeding, low potassium/magnesium, dehydration, too much caffeine. Seek urgent care if racing comes with chest pain, fainting, breathlessness lying flat, a racing heart at rest over 120 bpm, or family history of sudden cardiac death - those need an ECG/troponin check same day.",
    lifestyleTip: "Cutting caffeine after 2 pm + checking hemoglobin solves palpitations surprisingly often."
  },
  {
    id: 131,
    category: "cardiovascular",
    keywords: ["varicose veins", "spider veins", "swollen veins legs", "veins showing", "legs heavy veins"],
    question: "I have spider/varicose veins on my legs - should I worry?",
    answer: "Spider veins (tiny red/purple webs) are mostly cosmetic and common from genetics, sun, standing work and hormones. True varicose veins (bulging, rope-like, aching, worse by evening) suggest valve leakage - pregnancy raises the risk strongly due to pelvic pressure and blood volume. Manage: daily walks (calf pump helps return blood), elevate legs 15 min, avoid long static standing/sitting, compression stockings for heaviness, weight management. See a vascular doctor if they ulcer, bleed, or the leg swells one-sided suddenly (that needs urgent DVT exclusion).",
    lifestyleTip: "Calf raises every hour while standing/sitting is the cheapest vein-protective habit."
  },

  // ---------- SEXUAL ANATOMY & FUNCTION ----------
  {
    id: 132,
    category: "sexual_health",
    keywords: ["arousal", "not getting wet", "no lubrication", "dryness sex", "lubrication"],
    question: "Why do I sometimes not get lubricated? Is that normal?",
    answer: "Absolutely normal - vaginal wetness fluctuates with arousal quality, stress, cycle phase, medications (antidepressants, birth control), breastfeeding and menopause. Lack of wetness does NOT mean lack of desire - the brain-genital connection can lag. Fixes: more time/stimulation (arousal for many vulvas needs ~20 min, not 2), water-based lubricant, cutting anxiety, reviewing meds with your doctor, and estrogen moisturizers for menopausal dryness. Never rely on 'pushing through' - pain changes the whole response.",
    lifestyleTip: "Buy a good quality lubricant like skincare - comfort compounds into better experiences over time."
  },
  {
    id: 133,
    category: "sexual_health",
    keywords: ["vaginismus", "cant insert anything", "painful penetration", "tightening up", "pain first time"],
    question: "Penetration hurts or feels impossible - could it be vaginismus?",
    answer: "If penetration (tampon, exam, intercourse) triggers involuntary clenching, burning or impossible tightness, it may be vaginismus - a pelvic floor muscle guarding response, often linked to anxiety, past pain, infection or cultural messaging. It is highly treatable: 1) Rule out infection/lack of lubrication, 2) Gradual self-dilation starting with smallest size while fully relaxed, 3) Reverse-kegels (exhale and BULGE outward during attempts), 4) Pelvic floor physiotherapy - the gold standard. Never force it; forcing creates more guarding.",
    lifestyleTip: "Progress only when insertion feels pain-free - the timeline is yours, and recovery rates are high."
  },
  {
    id: 134,
    category: "sexual_health",
    keywords: ["safe sex first time", "first time tips", "losing virginity", "first intercourse"],
    question: "What should I know before first-time sex?",
    answer: "Realities nobody tells you: 1) Consent must be ongoing and verbal from both sides, 2) Penetration needs arousal + lubrication + relaxation - pain means slow down or stop and add lube, 3) Condoms from start to finish prevent pregnancy AND STIs (lubricated latex, check expiry), 4) First bleeding is possible but not required, 5) Urinate after to cut UTI risk, 6) You can stop anytime, no explanations owed. If you're under 18, know local consent laws and trusted-adult options.",
    lifestyleTip: "Being able to say 'slower' or 'stop' is the most important preparation for first sex."
  },

  // ---------- PREGNANCY & POSTPARTUM BODY ----------
  {
    id: 135,
    category: "pregnancy",
    keywords: ["trimester", "pregnancy stages", "what happens pregnant body", "pregnancy changes"],
    question: "What happens to the body across pregnancy?",
    answer: "Trimester map: 1st (wk 1-12) - nausea, breast tenderness, extreme fatigue as hCG surges; uterus grows to fist size. 2nd (wk 13-27) - energy returns, baby movements ('quickening') around 18-20 wks, belly shows, ligament stretching pain possible, skin may darken. 3rd (wk 28-40) - baby gains weight fast, breathlessness from uterus pressing diaphragm, swelling feet, Braxton-Hicks contractions, frequent urination returns. Blood volume nearly doubles; hemoglobin often dips - hence iron checks each trimester.",
    lifestyleTip: "Daily walks, protein + iron + folate rich food, and 8h sleep are the highest-return pregnancy habits."
  },
  {
    id: 136,
    category: "pregnancy",
    keywords: ["labor signs", "when to go hospital", "contractions", "water breaking", "delivery signs"],
    question: "How do I know labor has started?",
    answer: "True labor signs: 1) Contractions getting stronger, longer and closer (regular 5-1-1: every 5 min, 1 min long, for 1 hour), 2) Period-like or wave-like lower back pain with tightening, 3) 'Bloody show' - mucus plug with pink/brown streaks, 4) Water breaking - a gush or steady trickle (note color: clear/pale pink OK, green/brown = meconium, call immediately). GO TO THE HOSPITAL NOW if: water breaks before 37 weeks, bright red bleeding, severe headache/vision changes, baby moving less, or contractions every 2-3 minutes.",
    lifestyleTip: "Pack bag at 36 weeks and note hospital route/time - panicking brains forget basics."
  },
  {
    id: 137,
    category: "postpartum",
    keywords: ["postpartum body", "after birth changes", "lochia", "post delivery", "healing after birth"],
    question: "What happens to my body right after birth?",
    answer: "Expected postpartum changes: 1) Lochia - bleeding for 4-6 weeks (red -> pink -> yellowish), 2) Uterine cramps as the uterus shrinks (worse while breastfeeding), 3) Perineal stitches/c-section wound care - sitz baths, never touch with dirty hands, watch for fever/pus/spreading redness, 4) Night sweats and hair shedding at 3-4 months (telogen effluvium - temporary), 5) Vaginal dryness while breastfeeding (low estrogen), 6) 'Mommy tummy' - separated abs (diastasis recti) needs core retraining, not crunches. Emotionally: baby blues in week 1-2 are normal; sadness beyond 2 weeks or intrusive thoughts need help (postpartum depression is treatable).",
    lifestyleTip: "Heal first, fitness later - walking + pelvic floor is the correct 6-week starting point."
  },
  {
    id: 138,
    category: "postpartum",
    keywords: ["breastfeeding basics", "milk supply", "latching", "nursing", "how to breastfeed"],
    question: "How does breastfeeding actually work, and how do I know baby gets enough?",
    answer: "Supply works on demand: the more the baby removes milk (or you pump), the more prolactin makes next batch - cluster feeding in week 1 is building supply, not failure. Correct latch = wide gape, more areola in mouth than nipple, pain beyond 10-20 sec means re-latch. Getting-enough signs: 6+ wet diapers/day after day 5, weight back to birth by 2 weeks, audible swallowing, settling after feeds. Engorgement relief: cold cabbage/ice packs between feeds, warm compress before, frequent feeding. Mastitis (red wedge + fever) needs prompt antibiotics.",
    lifestyleTip: "Water bottle, snacks and the pillow setup within arm's reach - feeding parents shouldn't have to get up."
  },

  // ---------- CANCER AWARENESS ----------
  {
    id: 139,
    category: "cancer",
    keywords: ["ovarian cancer signs", "ovary cancer warning", "silent cancer symptoms"],
    question: "What are the warning signs of ovarian cancer?",
    answer: "Ovarian cancer is called 'silent' because signs blur into everyday issues. Persistent SYMPTOMS (2+ most days for 2+ weeks): bloating that doesn't go down, pelvic/abdominal pain, always feeling full quickly, and urinary urgency/frequency - plus fatigue, back pain, weight change and constipation. Higher risk: family history of breast/ovarian cancer, BRCA1/2, Ashkenazi heritage, never having given birth, endometriosis. There's no routine screening test - so NEW persistent symptoms after 40-50 deserve a pelvic exam + CA-125/ultrasound.",
    lifestyleTip: "The rule: any symptom that is NEW, PERSISTENT and FREQUENT for 2+ weeks gets checked - don't wait 3 months."
  },
  {
    id: 140,
    category: "cancer",
    keywords: ["cervical cancer signs", "hpv virus", "hpv positive", "cervical cancer symptoms"],
    question: "What causes cervical cancer and how is it prevented?",
    answer: "Nearly all cervical cancer comes from persistent high-risk HPV (human papillomavirus) - a common skin-to-skin STI most people clear within 2 years. Prevention layers: 1) HPV vaccine before exposure (best given age 9-14, catch-up to 26, sometimes 45), 2) Pap smear every 3 years from 21-25, catching abnormal cells BEFORE cancer, 3) Condoms (reduces but doesn't fully prevent HPV), 4) Don't smoke (smoking + HPV multiplies risk). Early cervical cancer often has NO symptoms - which is exactly why screening exists.",
    lifestyleTip: "If you're 26 or under and unvaccinated, ask about HPV vaccine at your next gynecologist visit."
  },
  {
    id: 141,
    category: "cancer",
    keywords: ["endometrial cancer", "uterine cancer", "postmenopausal bleeding", "period after 50"],
    question: "Is bleeding after menopause ever normal?",
    answer: "NO - any vaginal bleeding after 12 months without periods (postmenopausal bleeding) needs investigation within 2 weeks; ~10% of cases signal endometrial (uterine) cancer, and catching it early gives excellent cure rates. Before menopause, warning-pattern bleeding includes: bleeding after sex, cycles shorter than 21 days consistently, very heavy/prolonged bleeding after 45, or any bleeding while on HRT that isn't expected. Causes are often benign (polyps, fibroids, HRT) - that's what the workup determines (ultrasound +/- biopsy).",
    lifestyleTip: "Never dismiss postmenopausal bleeding as 'old age returning' - it's the #1 early sign worth checking."
  },

  // ---------- INFECTIONS BEYOND PERIODS ----------
  {
    id: 142,
    category: "infection",
    keywords: ["bacterial vaginosis", "bv", "grey discharge", "fishy after sex", "green discharge"],
    question: "What's the difference between BV, yeast and trichomoniasis?",
    answer: "Quick self-differentiation: 1) BV - thin grey/white discharge, STRONG fishy smell (worse after sex/periods), mild or no itch; from bacterial imbalance (douching, new partner, antibiotics). 2) Yeast - thick white COTTAGE-CHEESE clumps, intense itch/burning, little odor. 3) Trichomoniasis - green-yellow frothy, foul discharge with urgent burning - an STI needing BOTH partners treated. Only a vaginal swab (5 min at a clinic) confirms - self-treating the wrong one wastes time and can worsen it.",
    lifestyleTip: "If a 'yeast treatment' fails twice, ask for a swab - it's usually a different bug entirely."
  },
  {
    id: 143,
    category: "infection",
    keywords: ["pelvic inflammatory disease", "pid", "infection spreading", "pain after std"],
    question: "What is pelvic inflammatory disease (PID)?",
    answer: "PID is infection spreading from the vagina/cervix up into the uterus, tubes and ovaries - usually untreated chlamydia/gonorrhea, sometimes after childbirth/IUD insertion. Signs: lower belly pain BOTH sides, fever, abnormal foul discharge, pain during sex, bleeding between periods, painful urination. It's a TIME-CRITICAL problem: quick antibiotics clear it, but delayed treatment can scar tubes and affect fertility. If you have fever + pelvic pain, get seen same day - don't wait for a GP appointment next week.",
    lifestyleTip: "New partner + any unusual discharge -> test together; chlamydia is often symptomless yet causes PID."
  },

  // ---------- COMMON MYTHS ----------
  {
    id: 144,
    category: "myths",
    keywords: ["ice cream periods", "can i eat ice cream", "cold drinks period", "papaya periods", "myths about periods"],
    question: "Is it true I can't eat ice cream, papaya or cold food during periods?",
    answer: "No scientific basis. Ice cream, cold drinks, fruits and salads do NOT stop or harm your period - the idea comes from old beliefs about 'cooling the body'. What the evidence actually supports: excess caffeine, very salty food and alcohol can worsen bloating/cramps; papaya (raw) contains no meaningful abortifacient at normal food doses; and no food 'cleans' the uterus. Eat a balanced diet, take what feels comforting warm (heat does relax muscles), and ignore fear-based food rules.",
    lifestyleTip: "Warmth genuinely helps cramps - enjoy the warm tea because it works, not because cold food is 'banned'."
  },
  {
    id: 145,
    category: "myths",
    keywords: ["swimming period myth", "bath period myth", "washing hair periods myth", "exercise myth period"],
    question: "What period myths should I stop believing?",
    answer: "Debunked: 1) 'You can't bathe/wash hair' - you can, and warm baths ease cramps. 2) 'Exercise harms you' - movement reduces prostaglandins. 3) 'You shouldn't touch pickles/plants' - no mechanism exists. 4) 'Period blood is impure/dirty' - it's uterine tissue + blood, not a waste toxin. 5) 'You can't get pregnant on your period' - sperm survives 5 days, so yes you can (rarely). 6) 'Pads must be changed only when full' - change 4-6h for infection/rash prevention. 7) 'Missed period = pregnancy always' - stress/PCOS/thyroid also cause it.",
    lifestyleTip: "Ask 'what's the biological mechanism?' - most period myths collapse under that one question."
  },
  {
    id: 146,
    category: "puberty",
    keywords: ["growth spurt", "getting taller", "height puberty", "when do i stop growing"],
    question: "When do girls stop growing taller?",
    answer: "Puberty growth usually runs: breast budding starts, peak height spurt happens around 11-12 (about 8 cm/year), then growth slows dramatically AFTER the first period - most girls gain only 5-7 cm more over the following 1-2 years. Growth plates fuse under estrogen's influence, usually closing by 15-16 (sometimes 18). Nutrition (protein, calcium, vitamin D), sleep (growth hormone releases in deep sleep) and avoiding chronic illness maximize your genetic potential during that window.",
    lifestyleTip: "Teens need 8-10 hours sleep - real height is built overnight, not in the gym."
  },
  {
    id: 147,
    category: "puberty",
    keywords: ["body odor puberty", "sweating more", "underarm smell", "puberty sweating", "hormonal acne teen"],
    question: "Why did body odor and sweating increase so much?",
    answer: "Androgens activate apocrine glands (in underarms and groin) - these release odorless fluid that skin bacteria convert into strong smell, unlike childhood sweat. It starts around 8-10 and peaks in adolescence, along with oilier skin and acne. Management: wash daily with antibacterial soap on odor areas, dry completely, antiperspirant (not just deodorant - aluminum salts reduce wetness), change clothes after PE, breathable cotton, and shave/trim hair if you prefer (hair traps bacteria). Sudden extreme night sweats deserve a doctor's visit.",
    lifestyleTip: "Stress sweat smells stronger than heat sweat - a spare top in the bag covers presentation days."
  }
];
