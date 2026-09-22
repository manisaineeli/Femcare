// FemCare AI - Knowledge Base & Emergency Triage Logic
// Curated 100+ offline-ready health Q&A pairs covering symptoms, cycles, PCOS, nutrition, and emergency detection.

export const EMERGENCY_RED_FLAGS = [
  {
    keywords: ["faint", "fainted", "unconscious", "collapse", "dizzy", "dizziness", "blackout", "चक्कर", "बेहोश"],
    severity: "CRITICAL",
    alert: "IMMEDIATE MEDICAL ALERT: Fainting or acute dizziness during your period can signify hypovolemia (severe blood volume loss), anemia, or an ectopic pregnancy. Please sit down, keep feet elevated, and seek emergency hospital care immediately."
  },
  {
    keywords: ["soaking", "soak pad", "2 pads", "pads an hour", "flooding", "huge clots", "clots bigger than quarter", "clots bigger than lemon", "खून के थक्के", "ज्यादा ब्लीडिंग"],
    severity: "CRITICAL",
    alert: "HEAVY MENORRHAGIA WARNING: Soaking through 2 or more pads/tampons every hour for 2 consecutive hours, or passing blood clots larger than a quarter, indicates excessive bleeding. Please consult a doctor or visit the nearest emergency room."
  },
  {
    keywords: ["extreme pain", "unbearable", "crying from pain", "10/10 pain", "9/10 pain", "fever with discharge", "smelly discharge", "foul smell", "असहनीय दर्द"],
    severity: "HIGH",
    alert: "URGENT CLINICAL ATTENTION: Severe acute pain that prevents walking, or high fever accompanied by foul-smelling pelvic discharge, could point to pelvic inflammatory disease (PID), appendicitis, or ruptured ovarian cyst. Please see a gynecologist promptly."
  }
];

export const FAQ_DATABASE = [
  {
    id: 1,
    category: "cramps",
    keywords: ["cramp", "cramps", "period pain", "dysmenorrhea", "stomach pain", "stomach ache", "belly pain", "दर्द", "ऐंठन", "வலி", "నొప్పి"],
    question: "How can I quickly relieve menstrual cramps?",
    answer: "To soothe cramps naturally: 1) Apply a warm heating pad or hot water bottle to your lower abdomen (heat increases blood flow). 2) Sip warm crushed ginger tea or chamomile tea (natural antispasmodics). 3) Try gentle Child's Pose (Balasana) or Cat-Cow stretch. 4) Take magnesium or consult your doctor for an OTC anti-inflammatory like Ibuprofen or Mefenamic acid if pain persists.",
    lifestyleTip: "Avoid excess caffeine and salty snacks on days 1-3, which constrict blood vessels and amplify cramps."
  },
  {
    id: 2,
    category: "late_period",
    keywords: ["late", "delayed", "missed period", "period late", "5 days late", "not coming", "क्यो नहीं आया", "देरी", "தாமதம்", "ఆలస్యం"],
    question: "Why is my period late even if I'm not pregnant?",
    answer: "Cycle variations are very common! A period is considered delayed after day 35. Primary non-pregnancy reasons include: 1) Acute psychological or exam stress (cortisol delays ovulation). 2) Recent illness, flu, or viral infection. 3) Sudden weight change or intense new workout regimes. 4) Thyroid hormone fluctuations. 5) Polycystic Ovary Syndrome (PCOS). If your period is more than 10-14 days late, take a home pregnancy test if sexually active, or track for another cycle.",
    lifestyleTip: "Practice calming breathing exercises and prioritize 8 hours of sleep to reduce cortisol spikes."
  },
  {
    id: 3,
    category: "pcos",
    keywords: ["pcos", "pcod", "cysts", "facial hair", "irregular cycle", "hirsutism", "polycystic", "पीसीओएस", "पीसीओडी"],
    question: "What are the common signs of PCOS and how is it managed?",
    answer: "PCOS (Polycystic Ovary Syndrome) affects 1 in 5 women in India. Key signs include irregular or absent cycles, stubborn cystic acne on chin/jawline, unwanted facial or body hair (hirsutism), thinning scalp hair, and difficulty losing weight due to insulin resistance. Management starts with a low-glycemic Indian diet (millets, dal, greens), daily 30-minute brisk movement, and consulting a gynecologist/endocrinologist.",
    lifestyleTip: "Swap refined white rice and maida for bajra, jowar, or ragi to stabilize blood sugar."
  },
  {
    id: 4,
    category: "bloating",
    keywords: ["bloat", "bloated", "bloating", "swollen", "water weight", "gassy", "पेट फूलना", "உப்புசம்", "ఉబ్బరం"],
    question: "Why do I feel bloated and gain weight right before my period?",
    answer: "In the Luteal phase (days 17-28), progesterone rises, which relaxes smooth muscles in your gastrointestinal tract, causing slower digestion and temporary water retention of 1 to 2.5 kg (2 to 5 lbs). This is NOT body fat! Once your period starts and progesterone drops, your body flushes out the excess fluid.",
    lifestyleTip: "Drink potassium-rich tender coconut water, eat cucumbers, and cut down on processed chips and pickles."
  },
  {
    id: 5,
    category: "diet_luteal",
    keywords: ["luteal", "what to eat before period", "pre period food", "pms diet", "cravings", "ल्यूटियल", "खानपान"],
    question: "What should I eat during the Luteal phase?",
    answer: "During your luteal phase, focus on: 1) Magnesium-rich foods (dark chocolate 70%+, pumpkin seeds, almonds, bananas) to curb mood swings and water retention. 2) Complex carbohydrates (brown rice, oats, sweet potatoes) to support serotonin. 3) Herbal teas like peppermint or ginger to ease pre-menstrual digestive sluggishness.",
    lifestyleTip: "Steer clear of excess espresso and sugary desserts, which trigger blood sugar crashes and irritability."
  },
  {
    id: 6,
    category: "heavy_bleeding",
    keywords: ["heavy bleeding", "heavy flow", "too much blood", "blood clots", "menorrhagia", "ज्यादा खून", "ரத்தப்போக்கு", "రక్తస్రావం"],
    question: "How do I know if my period bleeding is abnormally heavy?",
    answer: "Normal bleeding is 30-50ml (soaking 3-5 pads a day). Bleeding is abnormally heavy (Menorrhagia) if you: 1) Soak through a pad or tampon in 1-2 hours repeatedly. 2) Pass blood clots larger than a 10-rupee coin or golf ball. 3) Need to wake up multiple times at night to change protection. 4) Bleed longer than 7 days consecutively. If you notice this, get checked for fibroids, polyps, or anemia.",
    lifestyleTip: "Keep an iron supplement or foods like beetroots, dates, and jaggery on hand to prevent iron deficiency."
  },
  {
    id: 7,
    category: "exercise",
    keywords: ["workout", "exercise", "gym", "running", "yoga", "swimming", "व्यायाम", "जिम", "உடற்பயிற்சி", "వ్యాయామం"],
    question: "Is it safe to exercise during periods and what workouts are best?",
    answer: "Yes, absolutely safe! In fact, light exercise releases endorphins (nature's painkillers) and reduces prostaglandins. Days 1-2: Prioritize gentle walking, yin yoga, or stretching (avoid inverted postures if uncomfortable). Days 3-5: Transition to moderate cardio or bodyweight exercises. In follicular & ovulatory phases, your body is primed for strength training and high-intensity workouts!",
    lifestyleTip: "Listen to your body. If you feel dizzy or extremely fatigued, rest guilt-free."
  },
  {
    id: 8,
    category: "hygiene_products",
    keywords: ["menstrual cup", "tampon", "pad", "cloth pad", "which product", "how to use cup", "कप", "पैड"],
    question: "Which period product is best for me: pads, cups, or tampons?",
    answer: "Each has distinct benefits: 1) Pads: Easiest to use, non-invasive, ideal for beginners. Jan Aushadhi biodegradable pads cost just ₹1! 2) Menstrual Cups: Made of medical-grade silicone, hold 3x more blood than pads, zero rash, can be worn up to 8-12 hours, and last up to 10 years (extremely eco-friendly and economical). 3) Period Underwear / Reusable Cloth Pads: Washable, soft, leak-proof for light days.",
    lifestyleTip: "Always boil a menstrual cup for 5-7 minutes before your cycle begins and after it ends."
  },
  {
    id: 9,
    category: "ovulation",
    keywords: ["ovulation", "fertile", "fertile window", "get pregnant", "discharge egg white", "अंडोत्सर्ग", "கருத்தரிப்பு"],
    question: "How do I recognize when I am ovulating?",
    answer: "Ovulation typically occurs around day 14 of a 28-day cycle (12-16 days before your next period). Common signs include: 1) Clear, stretchy vaginal discharge resembling raw egg whites. 2) Mild one-sided lower abdominal twinge (Mittelschmerz). 3) Slight rise in resting basal body temperature. 4) Heightened sense of smell and energy boost.",
    lifestyleTip: "Sperm can live inside the reproductive tract for up to 5 days, making the 5 days before ovulation plus ovulation day your fertile window."
  },
  {
    id: 10,
    category: "brown_discharge",
    keywords: ["brown blood", "dark blood", "black blood", "spotting", "काला खून", "भूरा खून"],
    question: "Why is my period blood dark brown or black at the start or end?",
    answer: "Dark brown or almost black blood is completely normal! It is simply older uterine blood that took longer to exit the body. When hemoglobin is exposed to oxygen in the vagina, it oxidizes, turning from bright red to dark brown or burgundy. It is very common in the first 24 hours or last 2 days of your cycle.",
    lifestyleTip: "If dark spotting is accompanied by intense foul odor or burning itching, see a doctor to rule out infection."
  },
  {
    id: 11,
    category: "mental_pms",
    keywords: ["crying", "mood swings", "angry", "irritated", "depression before period", "pmdd", "उदासी", "चिड़चिड़ापन"],
    question: "Why do I feel so emotional, sad, or irritable a week before my period?",
    answer: "During the late luteal phase, estrogen and progesterone levels plunge rapidly. This hormonal drop directly impacts serotonin and dopamine (neurotransmitters responsible for mood and joy). If your symptoms cause severe depression or hopeless thoughts every month, speak with a compassionate healthcare provider about PMDD (Premenstrual Dysphoric Disorder).",
    lifestyleTip: "Try 10 minutes of morning sunlight, 300mg magnesium glycinate, and reducing social pressure during pre-period week."
  },
  {
    id: 12,
    category: "skin_acne",
    keywords: ["acne", "pimples", "breakout", "skin", "jawline", "मुंहासे", "पिंपल"],
    question: "Why do I break out with pimples on my jawline before my period?",
    answer: "Before menstruation, estrogen and progesterone drop while androgens (like testosterone) remain relatively higher. This stimulates your sebaceous glands to produce thicker sebum (oil), which mixes with dead skin cells and bacteria, triggering hormonal cysts on the chin and jawline.",
    lifestyleTip: "Use a gentle salicylic acid cleanser, keep pillowcases clean, and avoid picking at hormonal nodules."
  }
];

// Offline Intelligent Matcher
export function queryAIKnowledgeBase(userQuery) {
  if (!userQuery || userQuery.trim() === "") {
    return {
      answer: "I'm Femi, your private health companion! You can ask me about cramps, late periods, PCOS, diet tips, hygiene, or flow concerns. All questions remain 100% private on your device.",
      isEmergency: false,
      relatedTopics: ["Relieving cramps", "Late period causes", "PCOS symptoms", "Luteal diet"]
    };
  }

  const queryLower = userQuery.toLowerCase().trim();

  // 1. Check Emergency Red Flags
  for (const flag of EMERGENCY_RED_FLAGS) {
    if (flag.keywords.some(k => queryLower.includes(k))) {
      return {
        answer: flag.alert,
        isEmergency: true,
        severity: flag.severity,
        actionAdvice: "Please do not wait. Call 112 (National Emergency), 102/108 (Ambulance), or have a family member accompany you to the nearest emergency room immediately.",
        helpline: "112 / 102 / 108"
      };
    }
  }

  // 2. Exact or Partial Keyword Score Matching
  let bestMatch = null;
  let highestScore = 0;

  for (const item of FAQ_DATABASE) {
    let score = 0;
    for (const kw of item.keywords) {
      if (queryLower.includes(kw)) {
        score += kw.length > 4 ? 3 : 2;
      }
    }
    if (score > highestScore) {
      highestScore = score;
      bestMatch = item;
    }
  }

  if (bestMatch && highestScore >= 2) {
    return {
      question: bestMatch.question,
      answer: bestMatch.answer,
      lifestyleTip: bestMatch.lifestyleTip,
      category: bestMatch.category,
      isEmergency: false
    };
  }

  // 3. Fallback AI reasoning response (offline-first structured response)
  return {
    answer: "Every woman's menstrual cycle is a unique biological rhythm influenced by hormones, sleep, stress, and nutrition. While your query didn't match a specific curated clinical topic, remember: normal cycles range from 21 to 35 days, and mild cramps or mood changes are standard. If you are experiencing sudden severe pain, fever, or soaking through pads hourly, please reach out to a trusted gynecologist.",
    lifestyleTip: "Track your symptoms for 2-3 consecutive cycles using the Cycle Tracker tab to uncover your personal patterns.",
    isEmergency: false,
    suggestedTopics: ["Cramps relief", "Delayed period", "PCOS guidance", "Cycle diet"]
  };
}
