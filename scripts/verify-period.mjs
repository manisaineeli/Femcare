// Quick verification of period record logic (run with: node scripts/verify-period.mjs)
import { daysBetween, formatDateKey, getMonthCalendarData, calculateCycleStatus } from '../src/utils/cycleCalculator.js';

let pass = 0, fail = 0;
const check = (name, cond) => {
  if (cond) { pass++; console.log('  PASS', name); }
  else { fail++; console.log('  FAIL', name); }
};

// ── daysBetween (used for duration calc) ──
check('daysBetween same day = 0', daysBetween('2026-09-10', '2026-09-10') === 0);
check('daysBetween 10→14 = 4 (duration 5)', daysBetween('2026-09-10', '2026-09-14') === 4);

// ── Recorded period days on the calendar ──
const history = [
  { id: 'p1', startDate: '2026-09-05', endDate: '2026-09-09', duration: 5, flow: 'heavy' },
  { id: 'p0', startDate: '2026-08-08', endDate: '2026-08-12', duration: 5, flow: 'medium' }
];
const sep = getMonthCalendarData(2026, 8, '2026-09-05', 28, 5, {}, history);
const dayOf = (key) => sep.find((d) => d.dateKey === key);

check('Sep 5 recorded', dayOf('2026-09-05')?.isRecordedPeriodDay === true);
check('Sep 9 (last day) recorded', dayOf('2026-09-09')?.isRecordedPeriodDay === true);
check('Sep 10 NOT recorded', dayOf('2026-09-10')?.isRecordedPeriodDay === false);
check('Aug 10 not marked in Sept view', sep.some((d) => d.dateKey === '2026-08-10' && d.isRecordedPeriodDay) === false);
check('recorded day is period day', dayOf('2026-09-07')?.isPeriodDay === true);

// Single-day period (start == end)
const oneDay = getMonthCalendarData(2026, 8, '2026-09-20', 28, 5, {}, [{ id: 'x', startDate: '2026-09-20', endDate: '2026-09-20' }]);
check('single-day period marked', oneDay.find((d) => d.dateKey === '2026-09-20')?.isRecordedPeriodDay === true);
check('day after single-day not marked', oneDay.find((d) => d.dateKey === '2026-09-21')?.isRecordedPeriodDay === false);

// Empty history still works (backwards compatible)
const noHist = getMonthCalendarData(2026, 8, '2026-09-05', 28, 5, {});
check('empty history OK', Array.isArray(noHist) && noHist.length > 30);

// ── Cycle status refresh after recording latest period ──
const status = calculateCycleStatus('2026-09-05', 28, 5);
check('cycleStatus computes', typeof status.dayOfCycle === 'number' && status.periodDuration === 5);

// ── format key sanity ──
check('formatDateKey', formatDateKey(new Date(2026, 8, 5)) === '2026-09-05');

console.log(`\n${pass} passed, ${fail} failed`);
process.exit(fail > 0 ? 1 : 0);
