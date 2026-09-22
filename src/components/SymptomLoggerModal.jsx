import React, { useState } from 'react';
import { X, Check, Droplet, Activity, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useAppState } from '../context/AppStateContext';
import { getPainRecommendation, formatDateKey } from '../utils/cycleCalculator';

export default function SymptomLoggerModal({ isOpen, onClose, targetDate = new Date() }) {
  const { state, logTodaySymptoms, t } = useAppState();
  const dateKey = formatDateKey(targetDate);
  const existing = state.symptomLogs[dateKey] || {};

  const [flow, setFlow] = useState(existing.flow || "none");
  const [pain, setPain] = useState(existing.pain || 0);
  const [selectedSymptoms, setSelectedSymptoms] = useState(existing.symptoms || []);
  const [notes, setNotes] = useState(existing.notes || "");
  const [savedSuccess, setSavedSuccess] = useState(false);

  if (!isOpen) return null;

  const painTip = getPainRecommendation(pain);

  const symptomOptions = [
    { id: "cramps", label: "Cramps", emoji: "⚡" },
    { id: "headache", label: "Headache", emoji: "🤕" },
    { id: "bloating", label: "Bloating", emoji: "🎈" },
    { id: "fatigue", label: "Fatigue", emoji: "😴" },
    { id: "moodSwings", label: "Mood Swings", emoji: "🎭" },
    { id: "acne", label: "Acne", emoji: "✨" },
    { id: "backPain", label: "Back Pain", emoji: "🦴" },
    { id: "cravings", label: "Cravings", emoji: "🍫" },
    { id: "nausea", label: "Nausea", emoji: "🤢" },
    { id: "breastTenderness", label: "Tender Breasts", emoji: "🌸" }
  ];

  const toggleSymptom = (id) => {
    setSelectedSymptoms((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  const handleSave = () => {
    logTodaySymptoms(dateKey, {
      flow,
      pain,
      symptoms: selectedSymptoms,
      notes,
      updatedAt: new Date().toISOString()
    });

    try {
      confetti({
        particleCount: 40,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#b5497a', '#f4a6b9', '#7c5a8c']
      });
    } catch (e) {
      // Confetti fallback
    }

    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="relative w-full max-w-md bg-[#191222] border border-[#3c2c4d] rounded-2xl p-5 text-zinc-200 shadow-2xl animate-in fade-in zoom-in-95 duration-150 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#31253e]">
          <div>
            <h3 className="font-bold text-white text-base">Log Flow & Symptoms</h3>
            <p className="text-[11px] text-zinc-400">Date: {dateKey} (Private on device)</p>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-zinc-400 hover:text-white bg-[#251b32] hover:bg-[#31253e]"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Flow Intensity */}
        <div className="mt-4">
          <label className="text-xs font-semibold text-zinc-300 block mb-2">
            Flow Intensity
          </label>
          <div className="grid grid-cols-4 gap-2">
            {[
              { id: "none", label: "None", icon: "⚪" },
              { id: "light", label: "Light", icon: "💧" },
              { id: "medium", label: "Medium", icon: "💧💧" },
              { id: "heavy", label: "Heavy", icon: "💧💧💧" }
            ].map((f) => (
              <button
                key={f.id}
                type="button"
                onClick={() => setFlow(f.id)}
                className={`py-2 px-1 rounded-xl text-center border transition-all text-xs font-medium ${
                  flow === f.id
                    ? 'bg-[#b5497a]/25 border-[#f4a6b9] text-white shadow-sm shadow-[#b5497a]/30'
                    : 'bg-[#231830] border-[#372646] text-zinc-400 hover:text-zinc-200'
                }`}
              >
                <div className="text-sm mb-0.5">{f.icon}</div>
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Pain Scale (0 to 10) */}
        <div className="mt-5">
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-xs font-semibold text-zinc-300">
              Pelvic Pain Scale (1 - 10)
            </label>
            <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
              pain >= 7 ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30' :
              pain >= 4 ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' :
              'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
            }`}>
              {pain} / 10 • {painTip.level}
            </span>
          </div>

          <input
            type="range"
            min="0"
            max="10"
            value={pain}
            onChange={(e) => setPain(parseInt(e.target.value))}
            className="w-full h-2 bg-[#2a1d3a] rounded-lg appearance-none cursor-pointer accent-[#b5497a]"
          />

          <div className="mt-2 p-2 rounded-lg bg-[#231830] border border-[#372646] text-[11px] text-pink-200/90 flex items-start gap-1.5">
            <Activity className="w-3.5 h-3.5 text-[#f4a6b9] shrink-0 mt-0.5" />
            <span>{painTip.tip}</span>
          </div>
        </div>

        {/* Symptoms Observed */}
        <div className="mt-5">
          <label className="text-xs font-semibold text-zinc-300 block mb-2">
            Symptoms Experienced
          </label>
          <div className="flex flex-wrap gap-1.5">
            {symptomOptions.map((sym) => {
              const isSelected = selectedSymptoms.includes(sym.id);
              return (
                <button
                  key={sym.id}
                  type="button"
                  onClick={() => toggleSymptom(sym.id)}
                  className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                    isSelected
                      ? 'bg-[#b5497a] border-[#f4a6b9] text-white shadow-sm'
                      : 'bg-[#231830] border-[#372646] text-zinc-300 hover:text-white hover:bg-[#2c1e3d]'
                  }`}
                >
                  <span>{sym.emoji}</span>
                  <span>{sym.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Optional Notes */}
        <div className="mt-4">
          <label className="text-xs font-semibold text-zinc-300 block mb-1">
            Personal Notes (Private)
          </label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={2}
            placeholder="How are you feeling emotionally or physically today?"
            className="w-full bg-[#231830] border border-[#372646] rounded-xl p-2.5 text-xs text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-[#b5497a]"
          />
        </div>

        {/* Save Button */}
        <div className="mt-5 pt-3 border-t border-[#31253e] flex items-center justify-between">
          <button
            onClick={onClose}
            className="text-xs text-zinc-400 hover:text-white px-3 py-1.5"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={savedSuccess}
            className="flex items-center gap-1.5 px-5 py-2 rounded-xl text-xs font-semibold bg-gradient-to-r from-[#b5497a] to-[#d65d95] text-white shadow-lg shadow-[#b5497a]/30 hover:opacity-95 active:scale-95 transition-all"
          >
            {savedSuccess ? (
              <>
                <Check className="w-4 h-4 text-emerald-300" />
                <span>Saved to Device!</span>
              </>
            ) : (
              <>
                <Sparkles className="w-3.5 h-3.5" />
                <span>Save to Device</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
