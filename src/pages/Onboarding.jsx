import React, { useState } from 'react';
import { useAppState } from '../context/AppStateContext';
import { daysBetween } from '../utils/cycleCalculator';
import { ArrowRight, ArrowLeft, Lock, ShieldCheck, User, CalendarDays, Droplet, Sparkles } from 'lucide-react';

const todayKey = new Date().toISOString().split('T')[0];

export default function Onboarding() {
  const { updateUserProfile, addPeriodRecord, completeOnboarding } = useAppState();

  // Step 1 — About you (name & age)
  const [step, setStep] = useState(1);
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [errors, setErrors] = useState({});

  // Step 2 — Manual period entry (from → to)
  const [periodStart, setPeriodStart] = useState('');
  const [periodEnd, setPeriodEnd] = useState('');
  const [flow, setFlow] = useState('medium');
  const [notes, setNotes] = useState('');

  const canSubmitStep1 = name.trim().length > 0 && age.trim().length > 0;
  const canSubmitStep2 = periodStart.length > 0 && periodEnd.length > 0;

  const validateStep1 = () => {
    const errs = {};
    if (!name.trim()) {
      errs.name = 'Please enter your name';
    }

    const ageNum = parseInt(age, 10);
    if (!age.trim()) {
      errs.age = 'Please enter your age';
    } else if (isNaN(ageNum) || ageNum < 10 || ageNum > 100) {
      errs.age = 'Age should be between 10 and 100';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleStep1Next = (e) => {
    e.preventDefault();
    if (validateStep1()) setStep(2);
  };

  const periodDurationDays =
    periodStart && periodEnd ? daysBetween(periodStart, periodEnd) + 1 : 0;

  const validateStep2 = () => {
    const errs = {};
    if (!periodStart) errs.periodStart = 'Please select the start date';
    if (!periodEnd) errs.periodEnd = 'Please select the end date';

    if (periodStart && periodEnd) {
      const duration = daysBetween(periodStart, periodEnd) + 1;
      if (duration < 1) {
        errs.periodEnd = 'End date must be on or after the start date';
      } else if (duration > 15) {
        errs.periodEnd = 'A period lasts up to 15 days — please check the dates';
      }
    }
    if (periodStart && periodStart > todayKey) {
      errs.periodStart = 'Start date cannot be in the future';
    }
    if (periodEnd && periodEnd > todayKey) {
      errs.periodEnd = 'End date cannot be in the future';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleFinalSubmit = (e) => {
    e.preventDefault();
    if (!validateStep2()) return;

    // Save the manual period record (from → to) — replaces seeded demo cycles
    addPeriodRecord(
      {
        startDate: periodStart,
        endDate: periodEnd,
        flow,
        notes: notes.trim()
      },
      { replaceHistory: true }
    );

    // Save name & age, then enter the app
    updateUserProfile({ name: name.trim(), age: parseInt(age, 10) });
    completeOnboarding();
  };

  const flowOptions = [
    { id: 'light', label: 'Light', icon: '💧' },
    { id: 'medium', label: 'Medium', icon: '💧💧' },
    { id: 'heavy', label: 'Heavy', icon: '💧💧💧' }
  ];

  return (
    <form
      onSubmit={step === 1 ? handleStep1Next : handleFinalSubmit}
      className="flex-1 flex flex-col px-6 pt-10 pb-7 relative animate-femme-bloom"
    >
      {/* Ambient glow */}
      <div className="absolute -top-16 -right-16 w-52 h-52 bg-[#b5497a]/25 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 -left-20 w-44 h-44 bg-[#7c5a8c]/20 rounded-full blur-3xl pointer-events-none" />

      {/* Brand / Welcome */}
      <div className="text-center relative">
        <div className="w-16 h-16 rounded-3xl bg-gradient-to-tr from-[#b5497a] to-[#f4a6b9] flex items-center justify-center shadow-lg shadow-[#b5497a]/30 mx-auto animate-femme-float">
          <span className="text-white text-3xl font-bold leading-none">♀</span>
        </div>

        <h1 className="text-2xl font-bold text-white font-['Outfit'] tracking-tight mt-4">
          Welcome to FemCare
        </h1>
        <p className="text-xs text-zinc-400 mt-1.5 leading-relaxed max-w-[300px] mx-auto">
          Tell us a little about you to personalise your cycle tracking, insights and safety features.
        </p>

        <span className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-wider font-semibold px-2.5 py-1 rounded-full bg-[#b5497a]/20 text-[#f4a6b9] border border-[#b5497a]/40 mt-3">
          <ShieldCheck className="w-3 h-3" />
          Zero-Cloud • 100% Private
        </span>
      </div>

      {/* Step Indicator */}
      <div className="flex items-center justify-center gap-2 mt-5">
        {[
          { n: 1, label: 'About You' },
          { n: 2, label: 'Last Period' }
        ].map((s) => (
          <div
            key={s.n}
            className={`flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full border transition-all ${
              step === s.n
                ? 'bg-[#b5497a]/25 border-[#f4a6b9] text-[#f4a6b9]'
                : step > s.n
                ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-400'
                : 'bg-[#1e1727] border-[#31253e] text-zinc-500'
            }`}
          >
            <span>{step > s.n ? '✓' : s.n}</span>
            <span>{s.label}</span>
          </div>
        ))}
      </div>

      {/* ── Step 1: Name & Age ── */}
      {step === 1 && (
        <div className="mt-6 rounded-3xl p-5 bg-[#1e1727] border border-[#31253e] shadow-xl relative animate-in fade-in duration-200">
          <span className="text-[10px] font-bold uppercase tracking-widest text-[#f4a6b9]">
            About You
          </span>

          {/* Name */}
          <div className="mt-4">
            <label className="text-xs font-semibold text-zinc-300 flex items-center gap-1.5 mb-1.5">
              <User className="w-3.5 h-3.5 text-[#f4a6b9]" />
              Your name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (errors.name) setErrors((p) => ({ ...p, name: undefined }));
              }}
              placeholder="e.g. Aanya"
              autoComplete="name"
              className="w-full bg-[#251d30] border border-[#372646] rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-[#b5497a] transition-colors"
            />
            {errors.name && (
              <p className="text-[11px] text-rose-400 mt-1">{errors.name}</p>
            )}
          </div>

          {/* Age */}
          <div className="mt-4">
            <label className="text-xs font-semibold text-zinc-300 flex items-center gap-1.5 mb-1.5">
              <CalendarDays className="w-3.5 h-3.5 text-[#f4a6b9]" />
              Your age
            </label>
            <input
              type="number"
              inputMode="numeric"
              min="10"
              max="100"
              value={age}
              onChange={(e) => {
                setAge(e.target.value);
                if (errors.age) setErrors((p) => ({ ...p, age: undefined }));
              }}
              placeholder="e.g. 24"
              className="w-full bg-[#251d30] border border-[#372646] rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-[#b5497a] transition-colors"
            />
            {errors.age && (
              <p className="text-[11px] text-rose-400 mt-1">{errors.age}</p>
            )}
          </div>
        </div>
      )}

      {/* ── Step 2: Manual Period Entry (From → To) ── */}
      {step === 2 && (
        <div className="mt-6 rounded-3xl p-5 bg-[#1e1727] border border-[#31253e] shadow-xl relative animate-in fade-in duration-200">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#f4a6b9]">
              Your Last Period
            </span>
            <span className="text-[10px] text-zinc-500">Step 2 of 2</span>
          </div>
          <p className="text-[11px] text-zinc-400 mt-1.5 leading-relaxed">
            Enter the dates your period ran — from the first day to the last day. This powers all your predictions.
          </p>

          {/* From / To dates */}
          <div className="grid grid-cols-2 gap-3 mt-4">
            <div>
              <label className="text-xs font-semibold text-zinc-300 flex items-center gap-1.5 mb-1.5">
                <Droplet className="w-3.5 h-3.5 text-[#f4a6b9]" />
                From (start)
              </label>
              <input
                type="date"
                value={periodStart}
                max={todayKey}
                onChange={(e) => {
                  setPeriodStart(e.target.value);
                  if (errors.periodStart || errors.periodEnd) {
                    setErrors((p) => ({ ...p, periodStart: undefined, periodEnd: undefined }));
                  }
                }}
                className="w-full bg-[#251d30] border border-[#372646] rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-[#b5497a] transition-colors [color-scheme:dark]"
              />
              {errors.periodStart && (
                <p className="text-[11px] text-rose-400 mt-1">{errors.periodStart}</p>
              )}
            </div>

            <div>
              <label className="text-xs font-semibold text-zinc-300 flex items-center gap-1.5 mb-1.5">
                <CalendarDays className="w-3.5 h-3.5 text-[#f4a6b9]" />
                To (end)
              </label>
              <input
                type="date"
                value={periodEnd}
                max={todayKey}
                onChange={(e) => {
                  setPeriodEnd(e.target.value);
                  if (errors.periodEnd) setErrors((p) => ({ ...p, periodEnd: undefined }));
                }}
                className="w-full bg-[#251d30] border border-[#372646] rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-[#b5497a] transition-colors [color-scheme:dark]"
              />
              {errors.periodEnd && (
                <p className="text-[11px] text-rose-400 mt-1">{errors.periodEnd}</p>
              )}
            </div>
          </div>

          {/* Live duration preview */}
          {periodDurationDays > 0 && !errors.periodEnd && (
            <p className="text-[11px] text-emerald-400 mt-2 flex items-center gap-1.5">
              <Sparkles className="w-3 h-3" />
              Period lasted {periodDurationDays} day{periodDurationDays > 1 ? 's' : ''} ({periodStart} → {periodEnd})
            </p>
          )}

          {/* Flow intensity */}
          <div className="mt-4">
            <label className="text-xs font-semibold text-zinc-300 block mb-2">
              How was the flow?
            </label>
            <div className="grid grid-cols-3 gap-2">
              {flowOptions.map((f) => (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => setFlow(f.id)}
                  className={`py-2 px-1 rounded-xl text-center border transition-all text-xs font-medium ${
                    flow === f.id
                      ? 'bg-[#b5497a]/25 border-[#f4a6b9] text-white shadow-sm shadow-[#b5497a]/30'
                      : 'bg-[#251d30] border-[#372646] text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  <div className="text-sm mb-0.5">{f.icon}</div>
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          {/* Optional notes */}
          <div className="mt-4">
            <label className="text-xs font-semibold text-zinc-300 block mb-1.5">
              Anything you noticed? <span className="text-zinc-500 font-normal">(optional)</span>
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={2}
              placeholder="e.g. cramps on day 2, unusually heavy flow…"
              className="w-full bg-[#251d30] border border-[#372646] rounded-xl p-2.5 text-xs text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-[#b5497a] resize-none"
            />
          </div>

          {/* Back to step 1 */}
          <button
            type="button"
            onClick={() => setStep(1)}
            className="mt-3 flex items-center gap-1.5 text-[11px] font-semibold text-zinc-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Edit name & age
          </button>
        </div>
      )}

      {/* Spacer pushes the CTA to the bottom */}
      <div className="flex-1 min-h-[20px]" />

      {/* Privacy note */}
      <p className="flex items-start gap-1.5 text-[11px] text-zinc-400 leading-relaxed">
        <Lock className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
        <span>
          Your details never leave this device — stored only in your browser and used solely to personalise your experience.
        </span>
      </p>

      {/* CTA */}
      <button
        type="submit"
        disabled={step === 1 ? !canSubmitStep1 : !canSubmitStep2}
        className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-[#b5497a] to-[#d65d95] text-white font-bold text-sm shadow-lg shadow-[#b5497a]/40 flex items-center justify-center gap-2 active:scale-95 transition-all disabled:opacity-40 disabled:cursor-not-allowed mt-4"
      >
        <span>{step === 1 ? 'Continue' : 'Save & Get Started'}</span>
        <ArrowRight className="w-4 h-4" />
      </button>

      <p className="text-[10px] text-zinc-500 text-center mt-3">
        No signup • No email • Takes 10 seconds
      </p>
    </form>
  );
}
