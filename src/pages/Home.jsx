import React from 'react';
import { useAppState } from '../context/AppStateContext';
import { getDailyFact } from '../data/factNotesData';
import { 
  Sparkles, Calendar, Utensils, Bot, ShieldAlert, Heart, Droplets, Moon, 
  Activity, ArrowRight, Share2, Check, Info, Flame, AlertCircle 
} from 'lucide-react';

export default function Home({ onOpenSymptomLogger, onOpenSOS, setActiveTab }) {
  const { state, cycleStatus, t } = useAppState();
  const todayFact = getDailyFact(0);
  const [copiedFact, setCopiedFact] = React.useState(false);

  // Time-based greeting
  const hour = new Date().getHours();
  let greetingKey = "morning";
  if (hour >= 12 && hour < 17) greetingKey = "afternoon";
  else if (hour >= 17 && hour < 21) greetingKey = "evening";
  else if (hour >= 21 || hour < 5) greetingKey = "night";

  const phaseDetails = t(`phases.${cycleStatus.phaseKey}`) || {};

  const handleShareFact = () => {
    const text = `💡 Daily Period Health Fact from FemCare:\n"${todayFact.title}"\n${todayFact.fact}\nSource: ${todayFact.source}`;
    if (navigator.share) {
      navigator.share({ title: todayFact.title, text }).catch(() => {});
    } else {
      navigator.clipboard.writeText(text);
      setCopiedFact(true);
      setTimeout(() => setCopiedFact(false), 2000);
    }
  };

  return (
    <div className="space-y-4 pb-20 animate-in fade-in duration-300">
      {/* Partner Mode Empathy Banner if Active */}
      {state.partnerMode && (
        <div className="p-3.5 rounded-2xl bg-gradient-to-r from-purple-950/80 to-[#2c183a] border border-purple-500/40 shadow-lg">
          <div className="flex items-start gap-2.5">
            <Heart className="w-5 h-5 text-purple-400 mt-0.5 shrink-0" />
            <div>
              <div className="text-xs font-bold text-purple-200 uppercase tracking-wider">
                {t('dashboard.partnerModeActive')}
              </div>
              <p className="text-xs text-purple-300/90 mt-1 leading-relaxed">
                {t('partner.banner')}
              </p>
              <div className="mt-2 text-[11px] font-semibold text-purple-200 bg-purple-900/50 px-2.5 py-1 rounded-lg inline-block">
                Tip for right now ({phaseDetails.short}): {
                  cycleStatus.phaseKey === 'menstrual' ? 'Bring her a warm drink or heat pad, ensure she rests.' :
                  cycleStatus.phaseKey === 'follicular' ? 'Her energy is peaking! Plan outdoor activities together.' :
                  cycleStatus.phaseKey === 'ovulatory' ? 'She is in her vibrant peak phase; great communication days.' :
                  'Pre-period week: Bring dark chocolate, be extra patient with mood shifts.'
                }
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Greeting Banner */}
      <div className="flex items-center justify-between">
        <div>
          <span className="text-xs font-medium text-pink-300/80">
            {t(`greetings.${greetingKey}`)},
          </span>
          <h2 className="text-xl font-bold text-white font-['Outfit']">
            {state.userProfile.name} ✨
          </h2>
        </div>
        <div className="text-right">
          <span className="text-[11px] text-zinc-400 block">
            {t('dashboard.cycleLengthAvg')}
          </span>
          <span className="text-xs font-semibold text-[#f4a6b9]">
            {t('dashboard.dayOfCycle')} {cycleStatus.dayOfCycle} {t('dashboard.ofCycle')}
          </span>
        </div>
      </div>

      {/* Primary Cycle Phase Card */}
      <div className="relative overflow-hidden rounded-3xl p-5 bg-gradient-to-br from-[#23152c] via-[#1d1225] to-[#140c1a] border border-[#3f2a4f] shadow-xl">
        {/* Glow ambient background */}
        <div className="absolute -top-12 -right-12 w-44 h-44 bg-[#b5497a]/20 rounded-full blur-3xl pointer-events-none" />

        <div className="flex items-start justify-between">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-[#b5497a]/20 text-[#f4a6b9] border border-[#b5497a]/40 mb-2">
              <span className="w-2 h-2 rounded-full bg-[#f4a6b9] animate-ping" />
              {phaseDetails.status || "Current Phase"}
            </div>
            <h3 className="text-xl font-bold text-white font-['Outfit']">
              {phaseDetails.name}
            </h3>
            <p className="text-xs text-zinc-300 mt-1 leading-relaxed max-w-[280px]">
              {phaseDetails.desc}
            </p>
          </div>

          {/* Phase Progress Circle Indicator */}
          <div className="relative w-16 h-16 shrink-0 flex items-center justify-center">
            <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 36 36">
              <path
                className="text-[#2f1f3a]"
                strokeWidth="3.5"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <path
                className="text-[#f4a6b9]"
                strokeDasharray={`${cycleStatus.cycleProgressPercent}, 100`}
                strokeWidth="3.5"
                strokeLinecap="round"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
            </svg>
            <div className="absolute text-center">
              <span className="text-xs font-bold text-white leading-none">
                {cycleStatus.dayOfCycle}d
              </span>
            </div>
          </div>
        </div>

        {/* Period Countdown Footer within Card */}
        <div className="mt-4 pt-3.5 border-t border-[#31253e] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-[#b5497a]/30 flex items-center justify-center">
              <Flame className="w-4 h-4 text-[#f4a6b9]" />
            </div>
            <div>
              <div className="text-xs font-bold text-white">
                {cycleStatus.daysUntilNextPeriod > 0
                  ? `${t('dashboard.periodIn')} ${cycleStatus.daysUntilNextPeriod} ${t('dashboard.days')}`
                  : t('dashboard.today')}
              </div>
              <span className="text-[11px] text-zinc-400">
                {t('dashboard.estimatedStart')} {cycleStatus.nextPeriodDateFormatted}
              </span>
            </div>
          </div>

          <button
            onClick={() => setActiveTab('tracker')}
            className="text-xs font-semibold text-[#f4a6b9] hover:text-white flex items-center gap-1 transition-colors"
          >
            <span>Calendar</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Quick Action Chips */}
      <div>
        <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider block mb-2">
          {t('dashboard.quickActions')}
        </label>
        <div className="grid grid-cols-4 gap-2">
          <button
            onClick={onOpenSymptomLogger}
            className="p-2.5 rounded-2xl bg-[#1e1727] hover:bg-[#281e35] border border-[#31253e] flex flex-col items-center text-center transition-all active:scale-95"
          >
            <div className="w-9 h-9 rounded-xl bg-[#b5497a]/20 text-[#f4a6b9] flex items-center justify-center mb-1">
              <Activity className="w-5 h-5" />
            </div>
            <span className="text-[11px] font-medium text-zinc-200 line-clamp-1">
              {t('dashboard.logSymptoms')}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('diet')}
            className="p-2.5 rounded-2xl bg-[#1e1727] hover:bg-[#281e35] border border-[#31253e] flex flex-col items-center text-center transition-all active:scale-95"
          >
            <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-300 flex items-center justify-center mb-1">
              <Utensils className="w-5 h-5" />
            </div>
            <span className="text-[11px] font-medium text-zinc-200 line-clamp-1">
              {t('dashboard.checkDiet')}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('ai')}
            className="p-2.5 rounded-2xl bg-[#1e1727] hover:bg-[#281e35] border border-[#31253e] flex flex-col items-center text-center transition-all active:scale-95"
          >
            <div className="w-9 h-9 rounded-xl bg-purple-500/20 text-purple-300 flex items-center justify-center mb-1">
              <Bot className="w-5 h-5" />
            </div>
            <span className="text-[11px] font-medium text-zinc-200 line-clamp-1">
              {t('dashboard.askAI')}
            </span>
          </button>

          <button
            onClick={onOpenSOS}
            className="p-2.5 rounded-2xl bg-rose-950/30 hover:bg-rose-950/50 border border-rose-500/30 flex flex-col items-center text-center transition-all active:scale-95"
          >
            <div className="w-9 h-9 rounded-xl bg-rose-600/30 text-rose-300 flex items-center justify-center mb-1">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <span className="text-[11px] font-medium text-rose-200 line-clamp-1">
              {t('dashboard.sosEmergency')}
            </span>
          </button>
        </div>
      </div>

      {/* Today's Health Fact Card (from 365 bank) */}
      <div className="rounded-2xl p-4 bg-[#1e1727] border border-[#31253e] shadow-md">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1.5 text-amber-400 font-bold text-xs uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t('dashboard.factOfDay')}</span>
          </div>
          <button
            onClick={handleShareFact}
            title="Share Fact"
            className="text-zinc-400 hover:text-white flex items-center gap-1 text-[11px]"
          >
            {copiedFact ? (
              <span className="text-emerald-400 flex items-center gap-1">
                <Check className="w-3 h-3" /> Copied
              </span>
            ) : (
              <span className="flex items-center gap-1">
                <Share2 className="w-3 h-3" /> Share
              </span>
            )}
          </button>
        </div>

        <h4 className="text-sm font-bold text-white mb-1 font-['Outfit']">
          {todayFact.title}
        </h4>
        <p className="text-xs text-zinc-300 leading-relaxed">
          {todayFact.fact}
        </p>

        <div className="mt-3 pt-2.5 border-t border-[#31253e]/60 flex items-center justify-between text-[10px] text-zinc-400">
          <span className="italic">Ref: {todayFact.source}</span>
          <button
            onClick={() => setActiveTab('facts')}
            className="font-semibold text-[#f4a6b9] hover:underline"
          >
            {t('dashboard.readMoreFacts')} &rarr;
          </button>
        </div>
      </div>

      {/* Health Score Card (3 Metrics) */}
      <div className="rounded-2xl p-4 bg-[#1e1727] border border-[#31253e] shadow-md">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <Activity className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white font-['Outfit']">
                {t('dashboard.healthScore')}
              </h4>
              <p className="text-[10px] text-emerald-400 font-medium">Optimal balance today</p>
            </div>
          </div>
          <span className="text-lg font-extrabold text-emerald-400 font-['Outfit']">
            {state.healthScore?.overallScore || 84}/100
          </span>
        </div>

        <div className="grid grid-cols-3 gap-2 text-center">
          <div className="p-2 rounded-xl bg-[#251d30] border border-[#372646]">
            <Moon className="w-4 h-4 text-indigo-400 mx-auto mb-1" />
            <span className="text-[10px] text-zinc-400 block">{t('dashboard.sleep')}</span>
            <span className="text-xs font-bold text-white">{state.healthScore.sleepHours} hrs</span>
          </div>

          <div className="p-2 rounded-xl bg-[#251d30] border border-[#372646]">
            <Droplets className="w-4 h-4 text-cyan-400 mx-auto mb-1" />
            <span className="text-[10px] text-zinc-400 block">{t('dashboard.hydration')}</span>
            <span className="text-xs font-bold text-white">{state.hydration.currentGlasses} glasses</span>
          </div>

          <div className="p-2 rounded-xl bg-[#251d30] border border-[#372646]">
            <Activity className="w-4 h-4 text-rose-400 mx-auto mb-1" />
            <span className="text-[10px] text-zinc-400 block">{t('dashboard.activity')}</span>
            <span className="text-xs font-bold text-white">{state.healthScore.activityMinutes} min</span>
          </div>
        </div>
      </div>
    </div>
  );
}
