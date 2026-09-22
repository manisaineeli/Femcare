import React from 'react';
import { useAppState } from '../context/AppStateContext';
import { ShieldCheck, Moon, Sun, HeartHandshake, Globe, Sparkles } from 'lucide-react';

export default function Header({ onOpenPrivacyShield }) {
  const { state, setLanguage, toggleDarkMode, togglePartnerMode } = useAppState();

  const languages = [
    { code: 'en', label: 'EN' },
    { code: 'hi', label: 'हिन्दी' },
    { code: 'ta', label: 'தமிழ்' },
    { code: 'te', label: 'తెలుగు' }
  ];

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-[#120e17]/85 dark:bg-[#120e17]/85 border-b border-[#31253e]/80 transition-colors">
      <div className="max-w-md mx-auto px-4 py-3 flex items-center justify-between">
        {/* Brand */}
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#b5497a] to-[#f4a6b9] flex items-center justify-center shadow-lg shadow-[#b5497a]/20">
            <span className="text-white font-bold text-lg leading-none">♀</span>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h1 className="text-lg font-bold tracking-tight bg-gradient-to-r from-[#f4a6b9] via-[#f7d6e0] to-[#b5497a] bg-clip-text text-transparent font-['Outfit']">
                FemCare
              </h1>
              <span className="text-[10px] uppercase tracking-wider font-semibold px-1.5 py-0.5 rounded-full bg-[#b5497a]/20 text-[#f4a6b9] border border-[#b5497a]/40">
                PWA
              </span>
            </div>
            <p className="text-[10px] text-zinc-400 font-medium tracking-wide">
              Zero-Cloud • 100% Private
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-1.5">
          {/* Privacy Shield Button (WOW Factor 6) */}
          <button
            onClick={onOpenPrivacyShield}
            title="Inspect Privacy Proof & Zero-Cloud Guarantee"
            className="flex items-center gap-1 text-xs px-2 py-1.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 transition-all active:scale-95"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
            <span className="hidden sm:inline font-medium text-[11px]">Shield</span>
          </button>

          {/* Language Selector */}
          <div className="relative flex items-center bg-[#1e1727] rounded-lg border border-[#31253e] p-0.5">
            <Globe className="w-3 h-3 text-zinc-400 ml-1.5 mr-0.5" />
            <select
              value={state.language}
              onChange={(e) => setLanguage(e.target.value)}
              className="bg-transparent text-xs font-medium text-zinc-200 py-1 pr-1.5 pl-0.5 focus:outline-none cursor-pointer"
            >
              {languages.map((l) => (
                <option key={l.code} value={l.code} className="bg-[#1e1727] text-white">
                  {l.label}
                </option>
              ))}
            </select>
          </div>

          {/* Partner Mode Toggle */}
          <button
            onClick={togglePartnerMode}
            title={state.partnerMode ? "Partner Mode Active" : "Enable Partner Empathy Mode"}
            className={`p-1.5 rounded-lg border transition-all active:scale-95 ${
              state.partnerMode
                ? 'bg-purple-600 text-white border-purple-400 shadow-md shadow-purple-500/30'
                : 'bg-[#1e1727] text-zinc-400 border-[#31253e] hover:text-zinc-200'
            }`}
          >
            <HeartHandshake className="w-4 h-4" />
          </button>

          {/* Dark / Light Toggle */}
          <button
            onClick={toggleDarkMode}
            title="Toggle Theme"
            className="p-1.5 rounded-lg bg-[#1e1727] text-zinc-400 hover:text-zinc-200 border border-[#31253e] transition-all active:scale-95"
          >
            {state.darkMode ? (
              <Sun className="w-4 h-4 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4 text-purple-400" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
