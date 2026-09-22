// FemCare AI - Multilingual Localization Dictionary
// Supports English, Hindi (हिन्दी), Tamil (தமிழ்), Telugu (తెలుగు)

export const translations = {
  en: {
    appName: "FemCare",
    tagline: "Your private menstrual health companion, powered by AI",
    privacyBanner: "100% Offline-first. Your health data never leaves this device.",
    privacyShield: "Privacy Shield Active",
    nav: {
      home: "Home",
      tracker: "Cycle",
      diet: "Diet",
      weight: "Fitness",
      ai: "Ask Femi",
      safety: "Safety",
      shopping: "Shop",
      facts: "Facts & Quiz",
      journal: "Journal"
    },
    greetings: {
      morning: "Good morning",
      afternoon: "Good afternoon",
      evening: "Good evening",
      night: "Rest well"
    },
    phases: {
      menstrual: {
        name: "Menstrual Phase",
        short: "Period Days",
        desc: "Hormones at their lowest. Prioritize rest, iron-rich warm foods, and gentle self-care.",
        status: "Active Period",
        energy: "Low Energy • Rest Mode"
      },
      follicular: {
        name: "Follicular Phase",
        short: "Follicular",
        desc: "Estrogen is rising! Energy, focus, and creativity rebound. Great time for new habits and strength workouts.",
        status: "Energy Rising",
        energy: "High Energy • Building Phase"
      },
      ovulatory: {
        name: "Ovulatory Phase",
        short: "Fertile Window",
        desc: "Peak estrogen & LH surge. Highest energy and confidence. Peak fertility window.",
        status: "Fertile Window",
        energy: "Peak Energy • Vibrant"
      },
      luteal: {
        name: "Luteal Phase",
        short: "Luteal (Pre-Period)",
        desc: "Progesterone dominant. Normal 1-2kg water retention. Eat magnesium, slow down, and stay hydrated.",
        status: "Pre-Period Days",
        energy: "Winding Down • PMS Care"
      }
    },
    dashboard: {
      periodIn: "Next period in",
      days: "days",
      today: "Period expected today",
      dayOfCycle: "Day",
      ofCycle: "of your cycle",
      estimatedStart: "Estimated start:",
      cycleLengthAvg: "Avg Cycle: 28 Days",
      factOfDay: "Daily Health Fact",
      readMoreFacts: "Explore 365 Facts",
      healthScore: "Daily Vitality Score",
      sleep: "Sleep",
      hydration: "Water",
      activity: "Gentle Move",
      quickActions: "Quick Actions",
      logSymptoms: "Log Symptoms",
      checkDiet: "Cycle Diet",
      askAI: "AI Assistant",
      sosEmergency: "Emergency SOS",
      partnerModeActive: "Partner Empathy Mode Active"
    },
    tracker: {
      title: "Cycle & Symptom Tracking",
      calendarSubtitle: "Colored dots indicate periods, fertile window & logged symptoms",
      logToday: "Log Today's Symptoms & Flow",
      flowIntensity: "Flow Intensity",
      none: "None",
      light: "Light",
      medium: "Medium",
      heavy: "Heavy",
      painLevel: "Pain Level (1-10)",
      symptoms: "Symptoms Observed",
      cramps: "Cramps",
      headache: "Headache",
      bloating: "Bloating",
      fatigue: "Fatigue",
      moodSwings: "Mood Swings",
      acne: "Acne Breakout",
      backPain: "Lower Back Pain",
      cravings: "Sweet/Salty Cravings",
      nausea: "Nausea",
      breastTenderness: "Tender Breasts",
      cycleHistory: "Cycle History & Regularity",
      predictedCycle: "Predicted Next Cycle",
      saveLog: "Save to Local Device",
      loggedSuccess: "Logged securely to device!"
    },
    diet: {
      title: "Cycle-Phased Nutrition",
      subtitle: "Nourish your body according to your hormonal phase",
      currentPhaseDiet: "Recommended for Current Phase",
      generatePlan: "Generate Personalized 7-Day Plan",
      dietPreference: "Dietary Preference",
      veg: "Vegetarian",
      nonVeg: "Non-Veg",
      jain: "Jain",
      vegan: "Vegan",
      hydrationTracker: "Hydration Tracker",
      glasses: "glasses",
      goal: "Goal: 8-10 glasses (2.5L)",
      addGlass: "+1 Glass (250ml)",
      resetWater: "Reset",
      ironRecipes: "5-Ingredient Iron Boosters",
      foodsToEat: "Superfoods to Eat",
      foodsToAvoid: "Foods to Moderate",
      symptomRemedy: "Symptom-Based Nutrition"
    },
    weight: {
      title: "Cycle-Aware Weight & Fitness",
      subtitle: "Understand natural hormonal water shifts without panic",
      waterRetentionNotice: "Normal Cycle Fluctuation: Expect +1 to 2.5 kg temporary water weight during Luteal phase. This is fluid, NOT fat!",
      logWeight: "Log Today's Weight",
      kg: "kg",
      lbs: "lbs",
      trend: "30-Day Weight Trend",
      goalStatus: "Cycle Correlated Progress",
      phaseFitness: "Optimal Movement by Phase"
    },
    ai: {
      title: "Femi — Private AI Companion",
      subtitle: "Ask anything confidentially. Zero chat logs sent to any server.",
      privacyBadge: "Local Device AI • 100% Private",
      askPlaceholder: "Ask about cramps, late period, PCOS, diet...",
      send: "Ask Femi",
      triageTitle: "AI Symptom Triage Analyzer",
      triageBtn: "Run Symptom Triage Check",
      quickPrompts: [
        "How to relieve severe period cramps?",
        "Why is my period 5 days late?",
        "Is weight gain before periods normal?",
        "What are common symptoms of PCOS?",
        "What should I eat during the luteal phase?"
      ],
      emergencyAlert: "URGENT MEDICAL NOTICE: If you are experiencing heavy bleeding (soaking 2+ pads an hour for 2+ hours), sudden 9-10 severe pain, dizziness, or fainting, please seek immediate emergency care."
    },
    safety: {
      title: "Emergency Safety & SOS",
      subtitle: "Instant discreet alerts to your trusted circle with zero cloud lag",
      tapSOS: "ONE-TAP EMERGENCY SOS",
      sosSub: "Sends alert with status & pre-set message to your trusted contacts via SMS / WhatsApp",
      silentAlert: "Silent SOS Mode",
      panicCode: "Panic Passcode Trigger",
      trustedCircle: "Trusted Circle Contacts",
      addContact: "+ Add Trusted Contact",
      emergencyHelplines: "Emergency Helplines (India)",
      nationalEmergency: "National Emergency (Police/Medical/Fire): 112",
      womenHelpline: "Women in Distress Helpline: 181",
      ambulance: "Ambulance: 102 / 108",
      ncwHelpline: "National Commission for Women: 7827170170"
    },
    shop: {
      title: "Shame-Free Period Care Shop",
      subtitle: "Discreet packaging, transparent pricing, and zero purchase tracking",
      privacyMode: "Privacy Packaging Mode (Blurred Preview)",
      priceComparison: "Jan Aushadhi (Govt ₹1) vs Premium Brands",
      ecoFriendly: "Eco-Friendly & Sustainable",
      locatorTitle: "Emergency & Free Pad Locator (ASHA / Jan Aushadhi)",
      subscriptionReminder: "Monthly Replenishment Estimator"
    },
    partner: {
      banner: "Partner Empathy Mode is ON: Helping you understand her cycle phases, mood shifts, and how to best care for her.",
      tipsTitle: "How to Support Her Right Now"
    }
  },
  hi: {
    appName: "फेमकेयर (FemCare)",
    tagline: "आपकी निजी मासिक धर्म साथी, AI द्वारा संचालित",
    privacyBanner: "100% ऑफ़लाइन। आपका स्वास्थ्य डेटा कभी भी आपके फोन से बाहर नहीं जाता।",
    privacyShield: "प्राइवेसी शील्ड सक्रिय",
    nav: {
      home: "होम",
      tracker: "मासिक चक्र",
      diet: "आहार",
      weight: "फिटनेस",
      ai: "फेमी से पूछें",
      safety: "सुरक्षा",
      shopping: "शॉप",
      facts: "तथ्य व क्विज़",
      journal: "डायरी"
    },
    greetings: {
      morning: "सुप्रभात",
      afternoon: "शुभ दोपहर",
      evening: "शुभ संध्या",
      night: "शुभ रात्रि"
    },
    phases: {
      menstrual: {
        name: "मासिक धर्म चरण (Menstrual)",
        short: "पीरियड्स के दिन",
        desc: "हार्मोन सबसे निचले स्तर पर होते हैं। आराम करें, गर्म और आयरन युक्त भोजन लें जैसे दाल, पालक और गुड़।",
        status: "सक्रिय पीरियड",
        energy: "कम ऊर्जा • आराम का समय"
      },
      follicular: {
        name: "फॉलिक्युलर चरण (Follicular)",
        short: "फॉलिक्युलर",
        desc: "एस्ट्रोजन बढ़ रहा है! ऊर्जा, एकाग्रता और ताजगी लौटती है। नई आदतें और व्यायाम शुरू करने का बेहतरीन समय।",
        status: "ऊर्जा वृद्धि",
        energy: "उच्च ऊर्जा • सक्रिय चरण"
      },
      ovulatory: {
        name: "ओव्यूलेशन चरण (Ovulatory)",
        short: "प्रजनन काल",
        desc: "एस्ट्रोजन और एलएच अपने चरम पर। सर्वाधिक ऊर्जा और आत्मविश्वास का समय। गर्भधारण की सबसे अधिक संभावना।",
        status: "फर्टाइल विंडो",
        energy: "चरम ऊर्जा • उत्साह"
      },
      luteal: {
        name: "ल्यूटियल चरण (Luteal)",
        short: "पीरियड से पूर्व",
        desc: "प्रोजेस्टेरोन प्रमुख होता है। 1-2 किलो पानी का अस्थायी वजन बढ़ना पूरी तरह सामान्य है। मैग्नीशियम युक्त आहार लें।",
        status: "पीरियड पूर्व दिन",
        energy: "शांत गति • पीएमएस की देखभाल"
      }
    },
    dashboard: {
      periodIn: "अगला पीरियड",
      days: "दिनों में",
      today: "पीरियड आज अपेक्षित है",
      dayOfCycle: "दिन",
      ofCycle: "आपके चक्र का",
      estimatedStart: "अनुमानित तारीख:",
      cycleLengthAvg: "औसत चक्र: 28 दिन",
      factOfDay: "आज का स्वास्थ्य तथ्य",
      readMoreFacts: "365 तथ्य देखें",
      healthScore: "दैनिक स्वास्थ्य स्कोर",
      sleep: "नींद",
      hydration: "पानी",
      activity: "हल्की हलचल",
      quickActions: "त्वरित क्रियाएं",
      logSymptoms: "लक्षण दर्ज करें",
      checkDiet: "चक्र आहार",
      askAI: "AI सहायक",
      sosEmergency: "आपातकालीन SOS",
      partnerModeActive: "पार्टनर सहानुभूति मोड सक्रिय"
    },
    tracker: {
      title: "मासिक चक्र एवं लक्षण ट्रैकिंग",
      calendarSubtitle: "रंगीन बिंदु पीरियड्स, प्रजनन काल और दर्ज लक्षणों को दर्शाते हैं",
      logToday: "आज के लक्षण और बहाव दर्ज करें",
      flowIntensity: "रक्तस्राव की तीव्रता",
      none: "शून्य",
      light: "हल्का (Light)",
      medium: "मध्यम (Medium)",
      heavy: "अधिक (Heavy)",
      painLevel: "दर्द का स्तर (1-10)",
      symptoms: "अनुभव किए गए लक्षण",
      cramps: "पेट दर्द / ऐंठन",
      headache: "सिरदर्द",
      bloating: "पेट फूलना (Bloating)",
      fatigue: "थकान",
      moodSwings: "मूड बदलना",
      acne: "मुंहासे (Acne)",
      backPain: "कमर दर्द",
      cravings: "मीठा/नमकीन खाने की इच्छा",
      nausea: "जी मिचलाना",
      breastTenderness: "स्तनों में भारीपन",
      cycleHistory: "चक्र का इतिहास व नियमितता",
      predictedCycle: "अनुमानित अगला चक्र",
      saveLog: "डिवाइस पर सुरक्षित सेव करें",
      loggedSuccess: "सफलतापूर्वक सुरक्षित दर्ज किया गया!"
    },
    diet: {
      title: "चक्र-आधारित पोषण एवं आहार",
      subtitle: "हार्मोनल बदलाव के अनुसार अपने शरीर को सही पोषण दें",
      currentPhaseDiet: "वर्तमान चरण के लिए सुझाया गया भोजन",
      generatePlan: "7-दिवसीय व्यक्तिगत आहार योजना बनाएं",
      dietPreference: "आहार प्राथमिकता",
      veg: "शाकाहारी",
      nonVeg: "मांसाहारी",
      jain: "जैन",
      vegan: "वीगन",
      hydrationTracker: "जल सेवन ट्रैकर",
      glasses: "गिलास",
      goal: "लक्ष्य: 8-10 गिलास (2.5 लीटर)",
      addGlass: "+1 गिलास (250ml)",
      resetWater: "रीसेट",
      ironRecipes: "5-सामग्रियों वाले आयरन बूस्टर व्यंजन",
      foodsToEat: "सुपरफूड्स जो जरूर खाएं",
      foodsToAvoid: "परहेज करने योग्य खाद्य",
      symptomRemedy: "लक्षण-आधारित पोषण समाधान"
    },
    weight: {
      title: "मासिक चक्र-सचेत वजन व फिटनेस",
      subtitle: "हार्मोनल बदलाव से होने वाले पानी के वजन को समझें, घबराएं नहीं",
      waterRetentionNotice: "सामान्य चक्र उतार-चढ़ाव: ल्यूटियल चरण में 1 से 2.5 किलो तक अस्थायी जल संचय (Water retention) सामान्य है। यह वसा (फैट) नहीं है!",
      logWeight: "आज का वजन दर्ज करें",
      kg: "किलो",
      lbs: "पाउंड",
      trend: "30-दिनों का वजन रुझान",
      goalStatus: "चक्र से सहसंबंधित प्रगति",
      phaseFitness: "चरण के अनुसार उपयुक्त व्यायाम"
    },
    ai: {
      title: "फेमी — निजी AI स्वास्थ्य साथी",
      subtitle: "बिना किसी झिझक के गोपनीय रूप से पूछें। कोई भी चैट सर्वर पर नहीं भेजी जाती।",
      privacyBadge: "लोकल डिवाइस AI • 100% निजी",
      askPlaceholder: "दर्द, देर से पीरियड, पीसीओएस, डाइट के बारे में पूछें...",
      send: "पूछें",
      triageTitle: "AI लक्षण ट्राइएज विश्लेषक",
      triageBtn: "लक्षण जांच प्रारंभ करें",
      quickPrompts: [
        "पीरियड के दर्द से तुरंत राहत कैसे पाएं?",
        "मेरा पीरियड 5 दिन लेट क्यों है?",
        "क्या पीरियड से पहले वजन बढ़ना सामान्य है?",
        "PCOS के मुख्य लक्षण क्या हैं?",
        "ल्यूटियल चरण में क्या खाना चाहिए?"
      ],
      emergencyAlert: "आपातकालीन चिकित्सा सूचना: यदि आपको अत्यधिक रक्तस्राव हो रहा है (हर घंटे 2 या अधिक पैड 2 घंटे तक भीगना), असहनीय दर्द, चक्कर या बेहोशी आ रही है, तो तुरंत डॉक्टर से संपर्क करें।"
    },
    safety: {
      title: "आपातकालीन सुरक्षा एवं SOS",
      subtitle: "विश्वसनीय संपर्कों को बिना देरी के एक-टैप आपातकालीन अलर्ट भेजें",
      tapSOS: "वन-टैप आपातकालीन SOS",
      sosSub: "SMS या WhatsApp के जरिए आपकी स्थिति व पूर्व-निर्धारित संदेश तुरंत भेजता है",
      silentAlert: "साइलेंट SOS मोड",
      panicCode: "पैनिक कोड ट्रिगर",
      trustedCircle: "विश्वसनीय सुरक्षा चक्र (संपर्क)",
      addContact: "+ संपर्क जोड़ें",
      emergencyHelplines: "आपातकालीन हेल्पलाइन (भारत)",
      nationalEmergency: "राष्ट्रीय आपातकाल (पुलिस/चिकित्सा): 112",
      womenHelpline: "महिला हेल्पलाइन: 181",
      ambulance: "एम्बुलेंस: 102 / 108",
      ncwHelpline: "राष्ट्रीय महिला आयोग: 7827170170"
    },
    shop: {
      title: "झिझक-मुक्त पीरियड केयर स्टोर",
      subtitle: "गोपनीय पैकेजिंग, पारदर्शी मूल्य और शून्य ट्रैकिंग",
      privacyMode: "प्राइवेसी पैकेजिंग मोड (धुंधला पूर्वावलोकन)",
      priceComparison: "जन औषधि (₹1 सुविधा पैड) बनाम महंगे ब्रांड्स",
      ecoFriendly: "पर्यावरण अनुकूल व पुनः प्रयोज्य",
      locatorTitle: "निशुल्क एवं आपातकालीन पैड केंद्र (ASHA / जन औषधि)",
      subscriptionReminder: "मासिक आपूर्ति अनुस्मारक"
    },
    partner: {
      banner: "पार्टनर सहानुभूति मोड चालू है: मासिक धर्म चक्र, मनोदशा में बदलाव और उनकी सही देखभाल समझने में आपकी मदद।",
      tipsTitle: "इस समय उनका सहयोग कैसे करें"
    }
  },
  ta: {
    appName: "ஃபெம்கேர் (FemCare)",
    tagline: "உங்கள் தனிப்பட்ட மாதவிடாய் சுகாதார துணை, AI மூலம் இயங்குகிறது",
    privacyBanner: "100% ஆஃப்லைன். உங்கள் உடல்நலத் தரவு உங்கள் சாதனத்தை விட்டு வெளியேறாது.",
    privacyShield: "தனியுரிமை கவசம் இயக்கத்தில் உள்ளது",
    nav: {
      home: "முகப்பு",
      tracker: "சுழற்சி",
      diet: "உணவு",
      weight: "உடற்தகுதி",
      ai: "ஃபெமியிடம் கேளுங்கள்",
      safety: "பாதுகாப்பு",
      shopping: "ஷாப்",
      facts: "தகவல்கள்",
      journal: "டைரி"
    },
    greetings: {
      morning: "காலை வணக்கம்",
      afternoon: "மதிய வணக்கம்",
      evening: "மாலை வணக்கம்",
      night: "இனிய இரவு"
    },
    phases: {
      menstrual: {
        name: "மாதவிடாய் நிலை (Menstrual)",
        short: "மாதவிடாய் நாட்கள்",
        desc: "ஹார்மோன்கள் குறைவாக இருக்கும். ஓய்வெடுங்கள், கீரை, பருப்பு, பேரீச்சம்பழம் போன்ற இரும்புச்சத்து உணவுகளை உண்ணுங்கள்.",
        status: "மாதவிடாய் இயங்குகிறது",
        energy: "குறைந்த ஆற்றல் • ஓய்வு தேவை"
      },
      follicular: {
        name: "ஃபோலிகுலர் நிலை (Follicular)",
        short: "ஃபோலிகுலர்",
        desc: "ஈஸ்ட்ரோஜன் அதிகரிக்கிறது! ஆற்றல் மற்றும் புத்துணர்ச்சி திரும்பும்.",
        status: "ஆற்றல் உயர்வு",
        energy: "அதிக ஆற்றல் • சுறுசுறுப்பு"
      },
      ovulatory: {
        name: "கருமுட்டை வெளியீட்டு நிலை (Ovulatory)",
        short: "கருத்தரிக்கும் காலம்",
        desc: "அதிகபட்ச ஆற்றல் மற்றும் தன்னம்பிக்கை. கருத்தரிப்பதற்கான உச்ச வாய்ப்பு.",
        status: "கருத்தரிப்பு சாளரம்",
        energy: "உச்ச ஆற்றல்"
      },
      luteal: {
        name: "லூட்டீயல் நிலை (Luteal)",
        short: "மாதவிடாய்க்கு முந்தைய நாட்கள்",
        desc: "1-2 கிலோ தற்காலிக நீர் எடை கூடுதல் இயல்பானது. மெக்னீசியம் நிறைந்த உணவுகளை உண்ணுங்கள்.",
        status: "மாதவிடாய் முன் நாட்கள்",
        energy: "அமைதியான ஆற்றல் • பி.எம்.எஸ் பராமரிப்பு"
      }
    },
    dashboard: {
      periodIn: "அடுத்த மாதவிடாய்",
      days: "நாட்களில்",
      today: "இன்று மாதவிடாய் எதிர்பார்க்கப்படுகிறது",
      dayOfCycle: "நாள்",
      ofCycle: "உங்கள் சுழற்சியில்",
      estimatedStart: "மதிப்பிடப்பட்ட தொடக்கம்:",
      cycleLengthAvg: "சராசரி சுழற்சி: 28 நாட்கள்",
      factOfDay: "இன்றைய சுகாதார உண்மை",
      readMoreFacts: "365 உண்மைகளை காண்க",
      healthScore: "தினசரி ஆரோக்கிய மதிப்பெண்",
      sleep: "தூக்கம்",
      hydration: "தண்ணீர்",
      activity: "உடற்பயிற்சி",
      quickActions: "விரைவு நடவடிக்கைகள்",
      logSymptoms: "அறிகுறிகளைப் பதிவு செய்க",
      checkDiet: "உணவு முறை",
      askAI: "AI உதவியாளர்",
      sosEmergency: "அவசர SOS",
      partnerModeActive: "துணைவர் பரிவு முறை செயலில் உள்ளது"
    },
    tracker: {
      title: "சுழற்சி மற்றும் அறிகுறிகள் கண்காணிப்பு",
      calendarSubtitle: "வண்ணப் புள்ளிகள் மாதவிடாய் மற்றும் கருத்தரிக்கும் நாட்களைக் காட்டுகின்றன",
      logToday: "இன்றைய அறிகுறிகளைப் பதிவு செய்க",
      flowIntensity: "இரத்தப்போக்கு தீவிரம்",
      none: "இல்லை",
      light: "குறைவு",
      medium: "நடுத்தரம்",
      heavy: "அதிகம்",
      painLevel: "வலி நிலை (1-10)",
      symptoms: "அறிகுறிகள்",
      cramps: "வயிற்று வலி",
      headache: "தலைவலி",
      bloating: "வயிற்று உப்புசம்",
      fatigue: "சோர்வு",
      moodSwings: "மனநிலை மாற்றங்கள்",
      acne: "முகப்பரு",
      backPain: "முதுகு வலி",
      cravings: "திடீர் உணவு ஆசை",
      nausea: "குமட்டல்",
      breastTenderness: "மார்பக வலி",
      cycleHistory: "சுழற்சி வரலாறு",
      predictedCycle: "கணிக்கப்பட்ட அடுத்த சுழற்சி",
      saveLog: "சாதனத்தில் பாதுகாப்பாக சேமிக்கவும்",
      loggedSuccess: "பாதுகாப்பாக சேமிக்கப்பட்டது!"
    },
    diet: {
      title: "சுழற்சி அடிப்படையிலான உணவுமுறை",
      subtitle: "ஹார்மோன் நிலைக்கு ஏற்ப சரியான சத்தான உணவுகளை உண்ணுங்கள்",
      currentPhaseDiet: "தற்போதைய நிலைக்கு பரிந்துரைக்கப்பட்ட உணவு",
      generatePlan: "7 நாள் உணவுத் திட்டம் உருவாக்கு",
      dietPreference: "உணவு விருப்பம்",
      veg: "சைவம்",
      nonVeg: "அசைவம்",
      jain: "ஜைன்",
      vegan: "வீகன்",
      hydrationTracker: "தண்ணீர் கண்காணிப்பு",
      glasses: "டம்ளர்கள்",
      goal: "இலக்கு: 8-10 டம்ளர்கள் (2.5 லிட்டர்)",
      addGlass: "+1 டம்ளர் (250மி.லி)",
      resetWater: "மீட்டமை",
      ironRecipes: "5-பொருட்கள் இரும்புச்சத்து ரெசிபிகள்",
      foodsToEat: "உண்ண வேண்டிய உணவுகள்",
      foodsToAvoid: "தவிர்க்க வேண்டிய உணவுகள்",
      symptomRemedy: "அறிகுறி தீர்வு உணவு"
    },
    weight: {
      title: "சுழற்சி விழிப்புணர்வு எடை & உடற்தகுதி",
      subtitle: "இயற்கையான ஹார்மோன் நீர் எடையைப் புரிந்து கொள்ளுங்கள்",
      waterRetentionNotice: "இயல்பான சுழற்சி மாற்றம்: லூட்டீயல் நிலையில் 1 முதல் 2.5 கிலோ வரை நீர் எடை அதிகரிப்பது சாதாரணமானது.",
      logWeight: "இன்றைய எடையைப் பதிவு செய்க",
      kg: "கிலோ",
      lbs: "பவுண்ட்",
      trend: "30 நாள் எடைப் போக்கு",
      goalStatus: "சுழற்சி முன்னேற்றம்",
      phaseFitness: "நிலைக்கேற்ற உடற்பயிற்சி"
    },
    ai: {
      title: "ஃபெமி — தனிப்பட்ட AI துணை",
      subtitle: "எந்தத் தயக்கமும் இன்றி ரகசியமாகக் கேளுங்கள். எவ்விதத் தரவும் சேமிக்கப்படுவதில்லை.",
      privacyBadge: "சாதன AI • 100% தனிப்பயன்",
      askPlaceholder: "வலி, மாதவிடாய் தாமதம், பிசிஓஎஸ் பற்றி கேளுங்கள்...",
      send: "கேளுங்கள்",
      triageTitle: "AI அறிகுறி பகுப்பாய்வி",
      triageBtn: "அறிகுறி சோதனை செய்",
      quickPrompts: [
        "மாதவிடாய் வலியை குறைப்பது எப்படி?",
        "மாதவிடாய் 5 நாட்கள் தாமதமாக காரணம் என்ன?",
        "மாதவிடாய்க்கு முன் எடை அதிகரிப்பது இயல்பானதா?",
        "PCOS அறிகுறிகள் என்ன?",
        "லூட்டீயல் நிலையில் என்ன சாப்பிட வேண்டும்?"
      ],
      emergencyAlert: "அவசர மருத்துவ அறிவிப்பு: அதிக இரத்தப்போக்கு, மயக்கம் அல்லது தாங்க முடியாத கடுமையான வலி ஏற்பட்டால், உடனடியாக மருத்துவரை அணுகவும்."
    },
    safety: {
      title: "அவசர பாதுகாப்பு மற்றும் SOS",
      subtitle: "உங்கள் நம்பகமான வட்டத்திற்கு தாமதமின்றி அவசர எச்சரிக்கை அனுப்பவும்",
      tapSOS: "ஒரு-தட்டல் அவசர SOS",
      sosSub: "SMS / WhatsApp வழியாக உங்கள் நிலையை உடனடியாக அனுப்புகிறது",
      silentAlert: "மௌன SOS முறை",
      panicCode: "அதிர்ச்சி குறியீடு",
      trustedCircle: "நம்பகமான நபர்கள் வட்டம்",
      addContact: "+ தொடர்பைச் சேர்",
      emergencyHelplines: "அவசர உதவி எண்கள் (இந்தியா)",
      nationalEmergency: "தேசிய அவசர எண் (காவல்/மருத்துவம்): 112",
      womenHelpline: "பெண்கள் உதவி எண்: 181",
      ambulance: "ஆம்புலன்ஸ்: 102 / 108",
      ncwHelpline: "தேசிய மகளிர் ஆணையம்: 7827170170"
    },
    shop: {
      title: "கூச்சமற்ற மாதவிடாய் பராமரிப்பு கடை",
      subtitle: "ரகசிய பேக்கிங் மற்றும் வெளிப்படையான விலை",
      privacyMode: "தனியுரிமை பேக்கேஜிங் முறை",
      priceComparison: "ஜன் அவுஷதி (ரூ.1 பேட்) மற்றும் பிற பிராண்டுகள்",
      ecoFriendly: "சுற்றுச்சூழல் நட்பு தயாரிப்புகள்",
      locatorTitle: "இலவச பேட் மையங்கள் (ASHA / ஜன் அவுஷதி)",
      subscriptionReminder: "மாதாந்திர நினைவூட்டல்"
    },
    partner: {
      banner: "துணைவர் பரிவு முறை செயலில் உள்ளது: அவரது மாதவிடாய் சுழற்சி மற்றும் மனநிலை மாற்றங்களை புரிந்து கொள்ள உதவுகிறது.",
      tipsTitle: "இப்போது அவருக்கு எப்படி உதவலாம்"
    }
  },
  te: {
    appName: "ఫెమ్‌కేర్ (FemCare)",
    tagline: "మీ వ్యక్తిగత ఋతు సంరక్షణ సహచరి, AI ఆధారితం",
    privacyBanner: "100% ఆఫ్‌లైన్. మీ ఆరోగ్య డేటా మీ పరికరాన్ని ఎప్పటికీ దాటి వెళ్ళదు.",
    privacyShield: "గోప్యతా కవచం సక్రియం",
    nav: {
      home: "హోమ్",
      tracker: "సైకిల్",
      diet: "ఆహారం",
      weight: "ఫిట్‌నెస్",
      ai: "ఫెమీని అడగండి",
      safety: "భద్రత",
      shopping: "షాప్",
      facts: "వాస్తవాలు",
      journal: "డైరీ"
    },
    greetings: {
      morning: "శుభోదయం",
      afternoon: "శుభ మధ్యాహ్నం",
      evening: "శుభ సాయంత్రం",
      night: "శుభరాత్రి"
    },
    phases: {
      menstrual: {
        name: "పీరియడ్స్ దశ (Menstrual)",
        short: "పీరియడ్స్ రోజులు",
        desc: "హార్మోన్లు తక్కువగా ఉంటాయి. విశ్రాంతి తీసుకోండి, ఐరన్ సమృద్ధిగా ఉండే పప్పులు, పాలకూర, బెల్లం తీసుకోండి.",
        status: "పీరియడ్ కొనసాగుతోంది",
        energy: "తక్కువ శక్తి • విశ్రాంతి సమయం"
      },
      follicular: {
        name: "ఫాలిక్యులర్ దశ (Follicular)",
        short: "ఫాలిక్యులర్",
        desc: "ఈస్ట్రోజెన్ పెరుగుతోంది! శక్తి, ఏకాగ్రత పెరుగుతాయి. వ్యాయామం చేయడానికి అనువైన సమయం.",
        status: "శక్తి పెరుగుదల",
        energy: "అధిక శక్తి • చురుకుదనం"
      },
      ovulatory: {
        name: "అండోత్సర్గ దశ (Ovulatory)",
        short: "సంతానోత్పత్తి విండో",
        desc: "గరిష్ట శక్తి మరియు ఆత్మవిశ్వాసం. గర్భధారణకు అత్యధిక అవకాశం ఉన్న సమయం.",
        status: "సంతానోత్పత్తి సమయం",
        energy: "ఉచ్ఛ శక్తి"
      },
      luteal: {
        name: "లూటియల్ దశ (Luteal)",
        short: "పీరియడ్‌కు ముందు",
        desc: "1-2 కిలోల తాత్కాలిక నీటి బరువు పెరగడం సహజం. మెగ్నీషియం సమృద్ధిగా ఉండే ఆహారం తీసుకోండి.",
        status: "పీరియడ్ ముందు రోజులు",
        energy: "ప్రశాంత శక్తి • PMS సంరక్షణ"
      }
    },
    dashboard: {
      periodIn: "తదుపరి పీరియడ్",
      days: "రోజుల్లో",
      today: "ఈరోజే పీరియడ్ ప్రారంభం కావచ్చు",
      dayOfCycle: "రోజు",
      ofCycle: "మీ సైకిల్‌లో",
      estimatedStart: "అంచనా తేదీ:",
      cycleLengthAvg: "సగటు సైకిల్: 28 రోజులు",
      factOfDay: "నేటి ఆరోగ్య వాస్తవం",
      readMoreFacts: "365 వాస్తవాలు చూడండి",
      healthScore: "రోజువారీ ఆరోగ్య స్కోర్",
      sleep: "నిద్ర",
      hydration: "నీరు",
      activity: "వ్యాయామం",
      quickActions: "త్వరిత చర్యలు",
      logSymptoms: "లక్షణాలు నమోదు చేయండి",
      checkDiet: "సైకిల్ డైట్",
      askAI: "AI అసిస్టెంట్",
      sosEmergency: "అత్యవసర SOS",
      partnerModeActive: "పార్ట్‌నర్ ఎంపతీ మోడ్ యాక్టివ్"
    },
    tracker: {
      title: "ఋతు చక్రం & లక్షణాల ట్రాకింగ్",
      calendarSubtitle: "రంగు చుక్కలు పీరియడ్స్, సారవంతమైన రోజులు & లక్షణాలను చూపుతాయి",
      logToday: "ఈరోజు లక్షణాలను నమోదు చేయండి",
      flowIntensity: "రక్తస్రావం తీవ్రత",
      none: "ఏమీ లేదు",
      light: "తక్కువ (Light)",
      medium: "మధ్యస్థం (Medium)",
      heavy: "ఎక్కువ (Heavy)",
      painLevel: "నొప్పి తీవ్రత (1-10)",
      symptoms: "గమనించిన లక్షణాలు",
      cramps: "కడుపు నొప్పి",
      headache: "తలనొప్పి",
      bloating: "కడుపు ఉబ్బరం",
      fatigue: "అలసట",
      moodSwings: "మానసిక మార్పులు",
      acne: "మొటిమలు",
      backPain: "నడుము నొప్పి",
      cravings: "తీపి/ఉప్పు తినాలనిపించడం",
      nausea: "వికారం",
      breastTenderness: "రొమ్ముల నొప్పి",
      cycleHistory: "గత చరిత్ర & క్రమబద్ధత",
      predictedCycle: "అంచనా వేసిన తదుపరి సైకిల్",
      saveLog: "సురక్షితంగా సేవ్ చేయండి",
      loggedSuccess: "విజయవంతంగా నమోదైంది!"
    },
    diet: {
      title: "సైకిల్ ఆధారిత పోషకాహారం",
      subtitle: "మీ హార్మోన్ల దశకు అనుగుణంగా సరైన ఆహారం తీసుకోండి",
      currentPhaseDiet: "ప్రస్తుత దశకు సూచించిన ఆహారం",
      generatePlan: "7 రోజుల వ్యక్తిగత డైట్ ప్లాన్ రూపొందించండి",
      dietPreference: "ఆహార ప్రాధాన్యత",
      veg: "శాకాహారం",
      nonVeg: "మాంసాహారం",
      jain: "జైన్",
      vegan: "వీగన్",
      hydrationTracker: "నీటి వినియోగ ట్రాకర్",
      glasses: "గ్లాసులు",
      goal: "లక్ష్యం: 8-10 గ్లాసులు (2.5 లీటర్లు)",
      addGlass: "+1 గ్లాసు (250ml)",
      resetWater: "రీసెట్",
      ironRecipes: "5 పదార్థాల ఐరన్ బూస్టర్ వంటకాలు",
      foodsToEat: "తీసుకోవలసిన ముఖ్య ఆహారాలు",
      foodsToAvoid: "తగ్గించవలసిన ఆహారాలు",
      symptomRemedy: "లక్షణాల ఆధారిత ఆహార పరిష్కారం"
    },
    weight: {
      title: "సైకిల్-అవగాహన బరువు & ఫిట్‌నెస్",
      subtitle: "సహజ హార్మోన్ల నీటి బరువును అర్థం చేసుకోండి, కంగారు పడకండి",
      waterRetentionNotice: "సాధారణ సైకిల్ మార్పు: లూటియల్ దశలో 1 నుండి 2.5 కిలోల తాత్కాలిక నీటి బరువు పెరగడం సహజం.",
      logWeight: "ఈరోజు బరువును నమోదు చేయండి",
      kg: "కిలోలు",
      lbs: "పౌండ్లు",
      trend: "30 రోజుల బరువు ట్రెండ్",
      goalStatus: "సైకిల్ సంబంధిత పురోగతి",
      phaseFitness: "దశకు అనువైన వ్యాయామాలు"
    },
    ai: {
      title: "ఫెమీ — ప్రైవేట్ AI తోడు",
      subtitle: "ఎలాంటి సంకోచం లేకుండా అడగండి. మీ చాట్ వివరాలు ఎక్కడికీ వెళ్లవు.",
      privacyBadge: "లోకల్ పరికర AI • 100% ప్రైవేట్",
      askPlaceholder: "నొప్పి, పీరియడ్ ఆలస్యం, PCOS, డైట్ గురించి అడగండి...",
      send: "అడగండి",
      triageTitle: "AI లక్షణాల విశ్లేషణ",
      triageBtn: "లక్షణాల తనిఖీ ప్రారంభించండి",
      quickPrompts: [
        "పీరియడ్ నొప్పి నుండి వెంటనే ఉపశమనం ఎలా?",
        "నా పీరియడ్ 5 రోజులు ఆలస్యం ఎందుకు?",
        "పీరియడ్స్ ముందు బరువు పెరగడం సహజమేనా?",
        "PCOS యొక్క ప్రధాన లక్షణాలు ఏమిటి?",
        "లూటియల్ దశలో ఏం తినాలి?"
      ],
      emergencyAlert: "అత్యవసర వైద్య హెచ్చరిక: గంటకు 2 లేదా అంతకంటే ఎక్కువ ప్యాడ్‌లు తడిసేంత రక్తస్రావం, తలతిరగడం లేదా తీవ్రమైన నొప్పి ఉంటే వెంటనే వైద్యుడిని సంప్రదించండి."
    },
    safety: {
      title: "అత్యవసర భద్రత & SOS",
      subtitle: "మీ నమ్మకమైన వ్యక్తులకు ఒకే ట్యాప్‌తో అలర్ట్ పంపండి",
      tapSOS: "వన్-ట్యాప్ ఎమర్జెన్సీ SOS",
      sosSub: "SMS / WhatsApp ద్వారా మీ ప్రస్తుత స్థితిని వెంటనే పంపుతుంది",
      silentAlert: "సైలెంట్ SOS మోడ్",
      panicCode: "పానిక్ కోడ్ ట్రిగ్గర్",
      trustedCircle: "నమ్మకమైన వ్యక్తుల వృత్తం",
      addContact: "+ కాంటాక్ట్ జోడించండి",
      emergencyHelplines: "అత్యవసర హెల్ప్‌లైన్లు (భారతదేశం)",
      nationalEmergency: "జాతీయ అత్యవసర విభాగం (పోలీస్/వైద్యం): 112",
      womenHelpline: "మహిళా హెల్ప్‌లైన్: 181",
      ambulance: "అంబులెన్స్: 102 / 108",
      ncwHelpline: "జాతీయ మహిళా కమిషన్: 7827170170"
    },
    shop: {
      title: "సంకోచం లేని పీరియడ్ కేర్ స్టోర్",
      subtitle: "డిస్క్రీట్ ప్యాకేజింగ్, పారదర్శక ధరలు మరియు జీరో ట్రాకింగ్",
      privacyMode: "ప్రైవసీ ప్యాకేజింగ్ మోడ్",
      priceComparison: "జన్ ఔషధి (రూ. 1 ప్యాడ్లు) vs బ్రాండెడ్",
      ecoFriendly: "పర్యావరణ హితమైన ఉత్పత్తులు",
      locatorTitle: "ఉచిత ప్యాడ్ కేంద్రాలు (ASHA / జన్ ఔషధి)",
      subscriptionReminder: "నెలవారీ సరఫరా రిమైండర్"
    },
    partner: {
      banner: "పార్ట్‌నర్ ఎంపతీ మోడ్ ఆన్: ఆమె ఋతు దశలు, మానసిక మార్పులను అర్థం చేసుకోవడానికి మరియు ఆమెను సరిగ్గా చూసుకోవడానికి సహాయపడుతుంది.",
      tipsTitle: "ప్రస్తుతం ఆమెకు ఎలా తోడ్పడాలి"
    }
  }
};
