// FemCare AI - Offline Clinical Symptom Triage Engine
// Multi-factor diagnostic heuristic developed to emulate clinical assessment without sending data to servers.

export function evaluateSymptomTriage({
  painScore = 0,
  flowIntensity = "medium", // "none", "light", "medium", "heavy", "soaking_hourly"
  hasFever = false,
  hasFoulOdor = false,
  hasDizzinessOrFainting = false,
  symptomsList = [],
  cycleDay = 14,
  durationDays = 3
}) {
  const flags = [];
  let severity = "BENIGN"; // "BENIGN", "MODERATE", "URGENT", "CRITICAL"
  const possibleCauses = [];
  const homeRemedies = [];
  let urgentAction = null;

  // 1. Critical Red Flag Evaluation
  if (hasDizzinessOrFainting || flowIntensity === "soaking_hourly") {
    severity = "CRITICAL";
    flags.push("Severe blood loss / Hemodynamic instability risk (Fainting or soaking pads hourly)");
    possibleCauses.push("Severe Menorrhagia", "Acute Anemia", "Ectopic Pregnancy (if sexually active)");
    urgentAction = "CRITICAL: Please call National Emergency 112, Ambulance 102/108, or go to the nearest emergency room immediately. Do not drive yourself.";
  } else if (hasFever && hasFoulOdor) {
    severity = "URGENT";
    flags.push("Infectious warning sign (Fever combined with foul pelvic odor)");
    possibleCauses.push("Pelvic Inflammatory Disease (PID)", "Bacterial Vaginosis / Endometritis");
    urgentAction = "URGENT: Please book a consultation with a Gynecologist within 24-48 hours. Antibiotic intervention may be necessary.";
  } else if (painScore >= 8) {
    severity = "URGENT";
    flags.push("High intensity debilitating pain (Score 8-10)");
    possibleCauses.push("Secondary Dysmenorrhea", "Endometriosis", "Ovarian Cyst Torsion/Rupture");
    urgentAction = "CONSULT DOCTOR: Severe pain interfering with walking or daily work warrants a comprehensive pelvic ultrasound.";
  } else if (painScore >= 5 || symptomsList.includes("cramps") || symptomsList.includes("bloating")) {
    severity = "MODERATE";
    possibleCauses.push("Primary Dysmenorrhea (prostaglandin-mediated)", "Normal Pre-menstrual Syndrome (PMS)");
  } else {
    severity = "BENIGN";
    possibleCauses.push("Normal Physiological Cycle Fluctuation");
  }

  // Remedies based on symptoms
  if (painScore > 0 || symptomsList.includes("cramps")) {
    homeRemedies.push("Apply localized heating pad to lower pelvis (dilates blood vessels & reduces uterine spasms)");
    homeRemedies.push("Sip warm ginger-cinnamon tea (acts as a natural COX-2 anti-inflammatory)");
    homeRemedies.push("Try gentle Child's Pose (Balasana) or Supta Baddha Konasana (Reclined Butterfly)");
  }

  if (symptomsList.includes("bloating")) {
    homeRemedies.push("Drink tender coconut water or fennel (saunf) infusion to expel sodium water retention");
    homeRemedies.push("Temporarily reduce table salt, deep-fried snacks, and carbonated beverages");
  }

  if (symptomsList.includes("headache")) {
    homeRemedies.push("Hydrate with 500ml room temperature water and rest in a dark, quiet room");
    homeRemedies.push("Gentle peppermint oil massage at temples");
  }

  if (symptomsList.includes("fatigue")) {
    homeRemedies.push("Eat a handful of roasted chana with jaggery (gur) or soaked dates for bioavailable iron");
  }

  return {
    severity,
    flags,
    possibleCauses,
    homeRemedies,
    urgentAction,
    timestamp: new Date().toISOString()
  };
}
