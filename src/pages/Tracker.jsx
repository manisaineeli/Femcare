import React, { useState } from 'react';
import { useAppState } from '../context/AppStateContext';
import { getMonthCalendarData, formatDateKey, getPainRecommendation } from '../utils/cycleCalculator';
import { 
  ChevronLeft, ChevronRight, Calendar as CalendarIcon, Plus, Flame, Sparkles, 
  Droplet, Activity, Info, CheckCircle2, History 
} from 'lucide-react';

export default function Tracker({ onOpenSymptomLogger, onOpenPeriodRecord }) {
  const { state, cycleStatus, t, logTodaySymptoms } = useAppState();
  
  const today = new Date();
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [selectedDate, setSelectedDate] = useState(today);

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const calendarDays = getMonthCalendarData(
    currentYear,
    currentMonth,
    state.userProfile.lastPeriodStartDate,
    state.userProfile.cycleLength,
    state.userProfile.periodDuration,
    state.symptomLogs,
    state.cycleHistory
  );

  const selectedKey = formatDateKey(selectedDate);
  const selectedLog = state.symptomLogs[selectedKey];

  return (
    <div className="space-y-4 pb-24 animate-in fade-in duration-300">
      {/* Page Title */}
      <div className="flex items-center justify-between gap-2">
        <div className="min-w-0">
          <h2 className="text-xl font-bold text-white font-['Outfit']">
            {t('tracker.title')}
          </h2>
          <p className="text-xs text-zinc-400">
            {t('tracker.calendarSubtitle')}
          </p>
        </div>
        <div className="flex items-center gap-1.5 shrink-0">
          <button
            onClick={onOpenPeriodRecord}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#1f1627] border border-[#b5497a]/50 text-[#f4a6b9] text-xs font-semibold hover:bg-[#b5497a]/15 active:scale-95 transition-all"
          >
            <Droplet className="w-3.5 h-3.5" />
            <span>Log Period</span>
          </button>
          <button
            onClick={onOpenSymptomLogger}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-[#b5497a] to-[#d65d95] text-white text-xs font-semibold shadow-md shadow-[#b5497a]/30 active:scale-95 transition-all"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Log Symptoms</span>
          </button>
        </div>
      </div>

      {/* Cycle Month Calendar */}
      <div className="rounded-3xl p-4 bg-[#1e1727] border border-[#31253e] shadow-xl">
        {/* Month Header Nav */}
        <div className="flex items-center justify-between mb-3 px-1">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <CalendarIcon className="w-4 h-4 text-[#f4a6b9]" />
            <span>{monthNames[currentMonth]} {currentYear}</span>
          </h3>
          <div className="flex items-center gap-1">
            <button
              onClick={handlePrevMonth}
              className="p-1.5 rounded-lg bg-[#251d30] text-zinc-300 hover:text-white border border-[#372646]"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={handleNextMonth}
              className="p-1.5 rounded-lg bg-[#251d30] text-zinc-300 hover:text-white border border-[#372646]"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Days of Week */}
        <div className="grid grid-cols-7 gap-1 text-center mb-1">
          {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => (
            <div key={i} className="text-[10px] font-bold text-zinc-400 py-1">
              {d}
            </div>
          ))}
        </div>

        {/* Month Grid */}
        <div className="grid grid-cols-7 gap-1">
          {calendarDays.map((day, idx) => {
            if (day.empty) {
              return <div key={day.key} className="h-10 rounded-xl" />;
            }

            const isSelected = formatDateKey(selectedDate) === day.dateKey;

            return (
              <button
                key={day.dateKey}
                onClick={() => setSelectedDate(day.date)}
                className={`relative h-10 rounded-xl flex flex-col items-center justify-center text-xs transition-all ${
                  isSelected
                    ? 'ring-2 ring-[#f4a6b9] bg-[#b5497a]/30 font-bold text-white'
                    : day.isRecordedPeriodDay
                    ? 'bg-rose-800/60 text-rose-100 hover:bg-rose-800/80 font-semibold'
                    : day.isPeriodDay
                    ? 'bg-rose-900/30 text-rose-200 hover:bg-rose-900/50'
                    : day.isOvulationDay
                    ? 'bg-amber-900/30 text-amber-200 hover:bg-amber-900/50'
                    : day.isFertileDay
                    ? 'bg-purple-900/20 text-purple-200 hover:bg-purple-900/40'
                    : 'text-zinc-300 hover:bg-[#251d30]'
                }`}
              >
                <span className={`leading-none ${day.isToday ? 'underline font-bold text-[#f4a6b9]' : ''}`}>
                  {day.dayNumber}
                </span>

                {/* Status Dot Indicators */}
                <div className="flex items-center gap-0.5 mt-1">
                  {day.isPeriodDay && (
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${
                        day.isRecordedPeriodDay ? 'bg-rose-400' : 'bg-rose-500'
                      }`}
                      title={day.isRecordedPeriodDay ? 'Recorded Period Day' : 'Period Flow'}
                    />
                  )}
                  {day.isOvulationDay && (
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400" title="Ovulation Day" />
                  )}
                  {day.isFertileDay && !day.isOvulationDay && (
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-400" title="Fertile Window" />
                  )}
                  {day.hasLog && (
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" title="Logged Symptoms" />
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* Legend */}
        <div className="mt-4 pt-3 border-t border-[#31253e] flex flex-wrap items-center justify-between gap-2 text-[10px] text-zinc-400">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-rose-500" />
            <span>Predicted Period</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-sm bg-rose-800" />
            <span>Recorded Period</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-purple-400" />
            <span>Fertile Window</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-amber-400" />
            <span>Ovulation</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-cyan-400" />
            <span>Logged Data</span>
          </div>
        </div>
      </div>

      {/* Selected Day Log Details */}
      <div className="rounded-2xl p-4 bg-[#1e1727] border border-[#31253e]">
        <div className="flex items-center justify-between mb-2">
          <h4 className="text-xs font-bold text-white uppercase tracking-wider">
            Selected Date: {selectedKey}
          </h4>
          <button
            onClick={onOpenSymptomLogger}
            className="text-[11px] font-semibold text-[#f4a6b9] hover:underline"
          >
            {selectedLog ? "Edit Symptoms" : "+ Log for this Date"}
          </button>
        </div>

        {selectedLog ? (
          <div className="space-y-2 mt-2">
            <div className="flex items-center gap-2">
              <span className="text-xs text-zinc-400">Flow:</span>
              <span className="text-xs font-bold capitalize text-pink-300">
                {selectedLog.flow || "None"}
              </span>
              <span className="text-xs text-zinc-400 ml-3">Pain Level:</span>
              <span className="text-xs font-bold text-amber-300">
                {selectedLog.pain || 0}/10
              </span>
            </div>

            {selectedLog.symptoms && selectedLog.symptoms.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-1">
                {selectedLog.symptoms.map((s) => (
                  <span key={s} className="text-[10px] px-2 py-0.5 rounded-md bg-[#2d1e39] text-[#f4a6b9] border border-[#3f2a4f]">
                    #{s}
                  </span>
                ))}
              </div>
            )}

            {selectedLog.notes && (
              <p className="text-xs text-zinc-300 italic mt-1 bg-[#251d30] p-2 rounded-lg">
                "{selectedLog.notes}"
              </p>
            )}
          </div>
        ) : (
          <p className="text-xs text-zinc-400 italic py-1">
            No symptoms or notes logged for this date yet. Tap the button above to log!
          </p>
        )}
      </div>

      {/* Cycle Prediction & Science Breakdown */}
      <div className="rounded-2xl p-4 bg-[#1e1727] border border-[#31253e] space-y-3">
        <div className="flex items-center gap-2 text-white font-bold text-xs font-['Outfit']">
          <Sparkles className="w-4 h-4 text-[#f4a6b9]" />
          <span>Cycle Intelligence & Ovulation Forecast</span>
        </div>

        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="p-2.5 rounded-xl bg-[#251d30] border border-[#372646]">
            <span className="text-[10px] text-zinc-400 block">Next Estimated Period</span>
            <span className="font-bold text-white text-sm">{cycleStatus.nextPeriodDateFormatted}</span>
            <span className="text-[10px] text-pink-300 block mt-0.5">
              ({cycleStatus.daysUntilNextPeriod} days away)
            </span>
          </div>

          <div className="p-2.5 rounded-xl bg-[#251d30] border border-[#372646]">
            <span className="text-[10px] text-zinc-400 block">Estimated Ovulation</span>
            <span className="font-bold text-purple-300 text-sm">{cycleStatus.nextOvulationDateFormatted}</span>
            <span className="text-[10px] text-zinc-400 block mt-0.5">
              Fertile Window: Days {cycleStatus.fertileStartDay} - {cycleStatus.fertileEndDay}
            </span>
          </div>
        </div>

        <p className="text-[11px] text-zinc-400 leading-relaxed bg-[#191220] p-2.5 rounded-xl border border-[#31253e]">
          🔒 <strong>Privacy Note:</strong> Ovulation and period estimates are calculated strictly using mathematical models (Knaus-Ogino modified for your personal history) on your local phone processor. No data is ever shared with advertising networks or servers.
        </p>
      </div>

      {/* Cycle History Timeline */}
      <div className="rounded-2xl p-4 bg-[#1e1727] border border-[#31253e]">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <History className="w-4 h-4 text-purple-400" />
            <h4 className="text-xs font-bold text-white font-['Outfit']">
              {t('tracker.cycleHistory')}
            </h4>
          </div>
          <button
            onClick={onOpenPeriodRecord}
            className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#b5497a]/20 border border-[#b5497a]/50 text-[#f4a6b9] text-[11px] font-semibold hover:bg-[#b5497a]/30 active:scale-95 transition-all"
          >
            <Plus className="w-3 h-3" />
            <span>Add Record</span>
          </button>
        </div>

        {state.cycleHistory.length === 0 ? (
          <div className="text-center py-4">
            <Droplet className="w-6 h-6 text-zinc-600 mx-auto" />
            <p className="text-xs text-zinc-400 mt-2">No period records yet.</p>
            <button
              onClick={onOpenPeriodRecord}
              className="mt-2 text-[11px] font-semibold text-[#f4a6b9] hover:underline"
            >
              + Record your first period (from → to)
            </button>
          </div>
        ) : (
          <div className="space-y-2">
            {state.cycleHistory.map((cycle, i) => (
              <div
                key={cycle.id}
                className="p-2.5 rounded-xl bg-[#251d30] border border-[#372646] flex items-start justify-between gap-2 text-xs"
              >
                <div className="min-w-0">
                  <div className="font-semibold text-white flex items-center gap-1.5">
                    <Droplet className="w-3 h-3 text-rose-400 shrink-0" />
                    <span>
                      Period #{state.cycleHistory.length - i}: {cycle.startDate}
                      {cycle.endDate && cycle.endDate !== cycle.startDate && (
                        <span className="text-zinc-300"> → {cycle.endDate}</span>
                      )}
                    </span>
                  </div>
                  <div className="text-[10px] text-zinc-400 mt-0.5">
                    Duration: {cycle.duration} days • Flow: {cycle.flow}
                    {typeof cycle.pain === 'number' && cycle.pain > 0 && ` • Pain: ${cycle.pain}/10`}
                  </div>
                  {cycle.symptoms && cycle.symptoms.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-1">
                      {cycle.symptoms.map((s) => (
                        <span key={s} className="text-[9px] px-1.5 py-0.5 rounded bg-[#2d1e39] text-[#f4a6b9] border border-[#3f2a4f]">
                          #{s}
                        </span>
                      ))}
                    </div>
                  )}
                  {cycle.notes && (
                    <p className="text-[10px] text-zinc-400 italic mt-1">"{cycle.notes}"</p>
                  )}
                </div>
                <div className="text-right shrink-0">
                  <span className="px-2 py-0.5 rounded-md bg-[#31253e] text-[10px] text-pink-300 font-medium">
                    {cycle.cycleLength} Days
                  </span>
                  <span className="block text-[9px] text-zinc-500 mt-1">cycle length</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
