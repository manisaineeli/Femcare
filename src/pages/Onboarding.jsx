import React, { useState } from 'react';
import { useAppState } from '../context/AppStateContext';
import { ArrowRight, Lock, ShieldCheck, User, CalendarDays } from 'lucide-react';

export default function Onboarding() {
  const { updateUserProfile, completeOnboarding } = useAppState();
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [errors, setErrors] = useState({});

  const canSubmit = name.trim().length > 0 && age.trim().length > 0;

  const handleStart = (e) => {
    e.preventDefault();

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
    if (Object.keys(errs).length > 0) return;

    // Save details to the local profile, then enter the app
    updateUserProfile({ name: name.trim(), age: ageNum });
    completeOnboarding();
  };

  return (
    <form
      onSubmit={handleStart}
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

      {/* Details Card */}
      <div className="mt-8 rounded-3xl p-5 bg-[#1e1727] border border-[#31253e] shadow-xl relative">
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

      {/* Spacer pushes Get Started to the bottom */}
      <div className="flex-1 min-h-[20px]" />

      {/* Privacy note */}
      <p className="flex items-start gap-1.5 text-[11px] text-zinc-400 leading-relaxed">
        <Lock className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
        <span>
          Your details never leave this device — stored only in your browser and used solely to personalise your experience.
        </span>
      </p>

      {/* Get Started (at the bottom) */}
      <button
        type="submit"
        disabled={!canSubmit}
        className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-[#b5497a] to-[#d65d95] text-white font-bold text-sm shadow-lg shadow-[#b5497a]/40 flex items-center justify-center gap-2 active:scale-95 transition-all disabled:opacity-40 disabled:cursor-not-allowed mt-4"
      >
        <span>Get Started</span>
        <ArrowRight className="w-4 h-4" />
      </button>

      <p className="text-[10px] text-zinc-500 text-center mt-3">
        No signup • No email • Takes 10 seconds
      </p>
    </form>
  );
}
