// FemCare AI - LocalStorage Persistence & Zero-Cloud Mock Database
// All user information is stored strictly within browser localStorage.

const STORAGE_KEY = "femcare_state_v1";

/**
 * Default Seed State for first-time launch
 */
export function getDefaultState() {
  const today = new Date();
  
  // Set last period to 12 days ago, placing user currently in late Follicular / early Ovulatory phase
  const lastPeriodDate = new Date();
  lastPeriodDate.setDate(today.getDate() - 12);
  const lastPeriodDateStr = lastPeriodDate.toISOString().split('T')[0];

  // Seed sample past 3 cycles
  const cycle1Start = new Date(today);
  cycle1Start.setDate(today.getDate() - 68);
  const cycle2Start = new Date(today);
  cycle2Start.setDate(today.getDate() - 40);
  const cycle3Start = new Date(lastPeriodDate);
  // A period lasting 5 days runs from startDate to startDate + 4
  const endDateOf = (start) => {
    const end = new Date(start);
    end.setDate(start.getDate() + 4);
    return end.toISOString().split('T')[0];
  };

  // Generate 30 days of weight data with natural luteal fluctuation (1-2kg shift)
  const weightHistory = [];
  const baseWeight = 56.5; // kg
  for (let i = 29; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    const dayKey = d.toISOString().split('T')[0];
    // Add subtle cyclical fluctuation
    const cycleDay = (30 - i) % 28;
    const waterRetention = cycleDay > 18 && cycleDay < 27 ? 1.2 : 0;
    const jitter = (Math.sin(i) * 0.3).toFixed(1);
    const weight = (baseWeight + waterRetention + parseFloat(jitter)).toFixed(1);
    weightHistory.push({
      date: dayKey,
      weight: parseFloat(weight),
      cycleDay: cycleDay + 1
    });
  }

  // Pre-seed some symptom logs
  const sampleLogs = {};
  const yesterdayKey = new Date(today.getTime() - 86400000).toISOString().split('T')[0];
  sampleLogs[yesterdayKey] = {
    flow: "none",
    pain: 1,
    symptoms: ["acne", "fatigue"],
    notes: "Felt productive today, mild tiredness in the evening."
  };

  return {
    version: 1,
    language: "en", // "en", "hi", "ta", "te"
    darkMode: true,
    partnerMode: false,
    onboardingComplete: false,
    userProfile: {
      name: "Aanya",
      age: 24,
      cycleLength: 28,
      periodDuration: 5,
      lastPeriodStartDate: lastPeriodDateStr,
      dietPreference: "veg", // "veg", "nonVeg", "jain", "vegan"
      calorieGoal: 1850,
      weightGoal: 55.0,
      currentWeight: 56.4,
      weightUnit: "kg"
    },
    cycleHistory: [
      { id: "c1", startDate: cycle1Start.toISOString().split('T')[0], endDate: endDateOf(cycle1Start), duration: 5, cycleLength: 28, flow: "medium", pain: 3, symptoms: [], notes: "" },
      { id: "c2", startDate: cycle2Start.toISOString().split('T')[0], endDate: endDateOf(cycle2Start), duration: 5, cycleLength: 28, flow: "medium", pain: 4, symptoms: ["cramps"], notes: "" },
      { id: "c3", startDate: cycle3Start.toISOString().split('T')[0], endDate: endDateOf(cycle3Start), duration: 5, cycleLength: 28, flow: "heavy", pain: 6, symptoms: ["cramps", "fatigue"], notes: "Heavier than usual on day 2." }
    ],
    symptomLogs: sampleLogs,
    weightHistory: weightHistory,
    hydration: {
      todayDate: today.toISOString().split('T')[0],
      currentGlasses: 6,
      targetGlasses: 9
    },
    healthScore: {
      sleepHours: 7.5,
      hydrationGlasses: 6,
      activityMinutes: 35,
      overallScore: 84
    },
    trustedCircle: [
      { id: "tc-1", name: "Mom (Pooja)", phone: "+91 98765 43210", relation: "Mother" },
      { id: "tc-2", name: "Priya (Best Friend)", phone: "+91 98123 45678", relation: "Friend" },
      { id: "tc-3", name: "Dr. Radhika Sharma (Gynec)", phone: "+91 94000 12345", relation: "Doctor" }
    ],
    sosSettings: {
      silentMode: false,
      panicCode: "1122",
      customMessage: "EMERGENCY: I need immediate assistance. Please check on me right now. This is my automated FemCare emergency broadcast."
    },
    chatHistory: [
      {
        id: "msg-1",
        sender: "femi",
        timestamp: new Date(Date.now() - 3600000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        text: "Hi Aanya! I'm Femi, your private health companion. All our chats are processed and stored locally on your device with zero server tracking. How are you feeling today?"
      }
    ],
    journalEntries: [
      {
        id: "j-1",
        date: yesterdayKey,
        mood: "Energetic & Focused",
        content: "Completed 30 minutes of yoga and cooked palak dal. Energy is visibly bouncing back now that my period ended last week."
      }
    ],
    shoppingCartDiscreet: []
  };
}

/**
 * Load state from localStorage or seed with defaults
 */
export function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      const initial = getDefaultState();
      saveState(initial);
      return initial;
    }
    return JSON.parse(raw);
  } catch (err) {
    console.warn("Error loading state from localStorage, falling back to defaults:", err);
    return getDefaultState();
  }
}

/**
 * Save state to localStorage
 */
export function saveState(state) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (err) {
    console.error("Failed to persist state locally:", err);
  }
}

/**
 * Reset all local storage (Privacy Clear)
 */
export function clearAllLocalData() {
  try {
    localStorage.removeItem(STORAGE_KEY);
    return true;
  } catch (err) {
    return false;
  }
}
