// FemCare AI - Cycle Calculation, Prediction, and Phase Engine
// 100% Client-side mathematical models. No external API calls.

/**
 * Format a Date object to YYYY-MM-DD string
 */
export function formatDateKey(date) {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/**
 * Calculate the number of days between two dates
 */
export function daysBetween(date1, date2) {
  const d1 = new Date(date1);
  const d2 = new Date(date2);
  d1.setHours(0, 0, 0, 0);
  d2.setHours(0, 0, 0, 0);
  const diffTime = d2 - d1;
  return Math.round(diffTime / (1000 * 60 * 60 * 24));
}

/**
 * Add days to a date and return a new Date
 */
export function addDays(date, days) {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

/**
 * Main cycle calculator given last period start date and cycle length
 */
export function calculateCycleStatus(lastPeriodDateStr, cycleLength = 28, periodDuration = 5) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const lastPeriod = new Date(lastPeriodDateStr);
  lastPeriod.setHours(0, 0, 0, 0);

  // Day of current cycle (1-indexed)
  const daysSinceStart = daysBetween(lastPeriod, today);
  const dayOfCycle = (daysSinceStart % cycleLength) + 1;

  // Next expected period date
  const nextPeriodDate = addDays(lastPeriod, Math.floor(daysSinceStart / cycleLength + 1) * cycleLength);
  const daysUntilNextPeriod = daysBetween(today, nextPeriodDate);

  // Ovulation typically occurs 14 days before next period
  const ovulationDay = Math.max(12, cycleLength - 14);
  const fertileStartDay = ovulationDay - 5;
  const fertileEndDay = ovulationDay + 1;

  // Next ovulation date
  const currentCycleStart = addDays(lastPeriod, Math.floor(daysSinceStart / cycleLength) * cycleLength);
  const nextOvulationDate = addDays(currentCycleStart, ovulationDay - 1);

  // Phase Determination
  let phaseKey = "follicular";
  if (dayOfCycle <= periodDuration) {
    phaseKey = "menstrual";
  } else if (dayOfCycle < fertileStartDay) {
    phaseKey = "follicular";
  } else if (dayOfCycle <= fertileEndDay) {
    phaseKey = "ovulatory";
  } else {
    phaseKey = "luteal";
  }

  // Progress in cycle (0 to 100%)
  const cycleProgressPercent = Math.min(100, Math.round((dayOfCycle / cycleLength) * 100));

  return {
    dayOfCycle,
    cycleLength,
    periodDuration,
    phaseKey,
    daysUntilNextPeriod,
    nextPeriodDate,
    nextPeriodDateFormatted: nextPeriodDate.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' }),
    nextOvulationDate,
    nextOvulationDateFormatted: nextOvulationDate.toLocaleDateString(undefined, { month: 'short', day: 'numeric' }),
    ovulationDay,
    fertileStartDay,
    fertileEndDay,
    cycleProgressPercent,
    isOverdue: daysUntilNextPeriod < 0
  };
}

/**
 * Generate calendar month days with cycle flags
 */
export function getMonthCalendarData(year, month, lastPeriodDateStr, cycleLength = 28, periodDuration = 5, logs = {}) {
  const firstDayOfMonth = new Date(year, month, 1);
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const startDayOfWeek = firstDayOfMonth.getDay(); // 0 = Sunday

  const days = [];

  // Padding days before the 1st
  for (let i = 0; i < startDayOfWeek; i++) {
    days.push({ empty: true, key: `empty-${i}` });
  }

  const lastPeriod = new Date(lastPeriodDateStr);
  lastPeriod.setHours(0, 0, 0, 0);
  const ovulationOffset = Math.max(12, cycleLength - 14);

  for (let d = 1; d <= daysInMonth; d++) {
    const current = new Date(year, month, d);
    current.setHours(0, 0, 0, 0);
    const dateKey = formatDateKey(current);

    const diff = daysBetween(lastPeriod, current);
    const cycleDay = ((diff % cycleLength) + cycleLength) % cycleLength + 1;

    const isPeriodDay = cycleDay <= periodDuration;
    const isOvulationDay = cycleDay === ovulationOffset;
    const isFertileDay = cycleDay >= (ovulationOffset - 5) && cycleDay <= (ovulationOffset + 1);
    
    // Check if user has logged data on this day
    const dayLog = logs[dateKey] || null;

    const isToday = formatDateKey(new Date()) === dateKey;

    days.push({
      empty: false,
      dayNumber: d,
      date: current,
      dateKey,
      cycleDay,
      isPeriodDay,
      isOvulationDay,
      isFertileDay,
      hasLog: !!dayLog,
      log: dayLog,
      isToday
    });
  }

  return days;
}

/**
 * Pain Scale recommendation generator
 */
export function getPainRecommendation(painScore) {
  if (painScore <= 0) return { level: "None", tip: "You're feeling comfortable! Great day for moderate movement." };
  if (painScore <= 3) return { level: "Mild", tip: "Gentle warmth: sip warm ginger tea, try cat-cow stretch, stay hydrated." };
  if (painScore <= 6) return { level: "Moderate", tip: "Apply heating pad (15-20 min), take 250mg magnesium, resting balasana (child's pose)." };
  if (painScore <= 8) return { level: "Severe", tip: "Deep rest with hot water compress. Consider consulting your doctor regarding NSAIDs (Mefenamic acid/Ibuprofen)." };
  return { level: "Extreme", tip: "Alert: If accompanied by dizziness, vomiting, or heavy bleeding, seek emergency medical care." };
}
