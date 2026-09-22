import React from 'react';
import { useAppState } from '../context/AppStateContext';
import { getDailyFact } from '../data/factNotesData';
import { formatDateKey } from '../utils/cycleCalculator';
import {
  Sparkles, Heart, Droplets, Moon,
  Activity, ArrowRight, Share2, Check, Flame, Bell, Clock, Salad, BellRing
} from 'lucide-react';
import {
  getNotificationPermission,
  requestNotificationPermission,
  showSystemNotification,
} from '../utils/notifications';

export default function Home({ setActiveTab }) {
  const { state, cycleStatus, t } = useAppState();
  const todayFact = getDailyFact(0);
  const [copiedFact, setCopiedFact] = React.useState(false);
  const [readNotifs, setReadNotifs] = React.useState({});
  const [notifPermission, setNotifPermission] = React.useState(getNotificationPermission());

  // Time-based greeting
  const hour = new Date().getHours();
  let greetingKey = "morning";
  if (hour >= 12 && hour < 17) greetingKey = "afternoon";
  else if (hour >= 17 && hour < 21) greetingKey = "evening";
  else if (hour >= 21 || hour < 5) greetingKey = "night";

  const phaseDetails = t(`phases.${cycleStatus.phaseKey}`) || {};

  // ── Period date details (shown on hero badge) ──
  const fmtDate = (dateStr, opts) => {
    const d = new Date(`${dateStr}T00:00:00`);
    if (isNaN(d.getTime())) return dateStr;
    return d.toLocaleDateString('en-GB', opts);
  };
  const lastPeriodFormatted = fmtDate(state.userProfile.lastPeriodStartDate, {
    day: 'numeric', month: 'short', year: 'numeric'
  });

  // ── Reminders from the past 10 days (built from local logs) ──
  const reminders = [];
  const lastPeriodDate = new Date(`${state.userProfile.lastPeriodStartDate}T00:00:00`);
  const tenDaysAgo = new Date();
  tenDaysAgo.setDate(tenDaysAgo.getDate() - 10);
  if (!isNaN(lastPeriodDate.getTime()) && lastPeriodDate >= tenDaysAgo && lastPeriodDate <= new Date()) {
    reminders.push({
      key: state.userProfile.lastPeriodStartDate,
      icon: '🌸',
      text: 'Period started — day 1 recorded',
      tag: 'Cycle'
    });
  }
  for (let i = 0; i < 10; i++) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const key = formatDateKey(d);
    const log = state.symptomLogs[key];
    if (log) {
      const syms = (log.symptoms || []).slice(0, 2).join(', ');
      reminders.push({
        key,
        icon: '🩹',
        text: syms
          ? `Symptoms logged — ${syms}${(log.symptoms || []).length > 2 ? '…' : ''}`
          : 'Daily health log saved',
        tag: log.pain > 0 ? `Pain ${log.pain}/10` : 'Log'
      });
    }
    const journal = state.journalEntries.find((j) => j.date === key);
    if (journal) {
      reminders.push({ key, icon: '✍️', text: `Journal entry — ${journal.mood}`, tag: 'Journal' });
    }
  }

  // ── In-app notifications (generated on device from your data) ──
  const notifications = [];
  notifications.push({
    id: 'next-period',
    icon: '🌸',
    title: cycleStatus.daysUntilNextPeriod > 0
      ? `Next period in ${cycleStatus.daysUntilNextPeriod} days`
      : 'Period expected today',
    body: cycleStatus.daysUntilNextPeriod > 0
      ? `Estimated start ${cycleStatus.nextPeriodDateFormatted} — plan rest & supplies.`
      : 'Take it gentle today 🌸'
  });
  notifications.push(
    state.hydration.currentGlasses < state.hydration.targetGlasses
      ? {
          id: 'hydration',
          icon: '💧',
          title: `Hydration ${state.hydration.currentGlasses}/${state.hydration.targetGlasses} glasses`,
          body: 'Sip one glass now to stay on track today.'
        }
      : {
          id: 'hydration-done',
          icon: '💧',
          title: 'Hydration goal reached!',
          body: `${state.hydration.targetGlasses} glasses done — nicely done.`
        }
  );
  const tenAgoKey = (() => { const d = new Date(); d.setDate(d.getDate() - 10); return formatDateKey(d); })();
  const symptomCounts = {};
  Object.entries(state.symptomLogs).forEach(([k, v]) => {
    if (k >= tenAgoKey) {
      (v.symptoms || []).forEach((s) => { symptomCounts[s] = (symptomCounts[s] || 0) + 1; });
    }
  });
  const topSymptom = Object.entries(symptomCounts).sort((a, b) => b[1] - a[1])[0];
  if (topSymptom && topSymptom[1] >= 2) {
    notifications.push({
      id: 'pattern',
      icon: '🤖',
      title: `Femi noticed “${topSymptom[0]}” × ${topSymptom[1]} this week`,
      body: 'Ask Femi AI for tips to ease it.'
    });
  }
  notifications.push({
    id: 'checkin',
    icon: '🩹',
    title: "Today's check-in is waiting",
    body: 'Log how you feel — it sharpens your predictions.'
  });
  notifications.push({
    id: 'diet',
    icon: '🍽',
    title: '5-day period diet plan is ready',
    body: 'Meal suggestions for easier periods are on your Home feed.'
  });
  const unreadCount = notifications.filter((n) => !readNotifs[n.id]).length;
  const markAllRead = () => {
    const all = {};
    notifications.forEach((n) => { all[n.id] = true; });
    setReadNotifs(all);
  };

  // Real system notifications (outside the app, like Instagram)
  const nextPeriodNotifBody =
    cycleStatus.daysUntilNextPeriod > 0
      ? `Your next period is estimated around ${cycleStatus.nextPeriodDateFormatted}.`
      : 'Your period is expected today — take it easy.';

  const enableSystemNotifications = async () => {
    const result = await requestNotificationPermission();
    setNotifPermission(result);
    if (result === 'granted') {
      await showSystemNotification('FemCare notifications on', {
        body: nextPeriodNotifBody,
        tag: 'femcare-welcome',
      });
    }
  };

  // If already allowed, pop one reminder outside the app per app session.
  React.useEffect(() => {
    if (notifPermission !== 'granted') return;
    const todayKey = formatDateKey(new Date());
    if (sessionStorage.getItem('femcareNotifFired') === todayKey) return;
    sessionStorage.setItem('femcareNotifFired', todayKey);
    showSystemNotification(
      cycleStatus.daysUntilNextPeriod > 0
        ? `Period in ${cycleStatus.daysUntilNextPeriod} days`
        : 'Period expected today',
      { body: nextPeriodNotifBody, tag: 'femcare-next-period' }
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [notifPermission]);

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
              Last period: {lastPeriodFormatted}
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

      {/* Reminders — Past 10 Days */}
      <div className="rounded-2xl p-4 bg-[#1e1727] border border-[#31253e] shadow-md">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-purple-500/20 text-purple-400 flex items-center justify-center">
              <Clock className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white font-['Outfit']">Reminders · Last 10 Days</h4>
              <p className="text-[10px] text-zinc-400">Your logs, cycles & journal activity</p>
            </div>
          </div>
          <span className="text-[11px] font-semibold text-[#f4a6b9]">{reminders.length} total</span>
        </div>

        {reminders.length > 0 ? (
          <div className="space-y-2 max-h-44 overflow-y-auto pr-1">
            {reminders.map((r, i) => (
              <div key={r.key + '-' + i} className="flex items-center gap-2.5 p-2 rounded-xl bg-[#251d30] border border-[#372646]">
                <span className="text-[10px] font-bold text-zinc-400 w-12 shrink-0">
                  {fmtDate(r.key, { day: 'numeric', month: 'short' })}
                </span>
                <span className="text-sm">{r.icon}</span>
                <span className="text-[11px] text-zinc-200 flex-1 truncate">{r.text}</span>
                <span className="text-[9px] px-1.5 py-0.5 rounded bg-[#31253e] text-[#f4a6b9] font-semibold shrink-0">
                  {r.tag}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-xs text-zinc-400 italic">
            No reminders in the last 10 days yet — log symptoms or write a journal entry to build your timeline.
          </p>
        )}
      </div>

      {/* In-App Notifications */}
      <div className="rounded-2xl p-4 bg-[#1e1727] border border-[#31253e] shadow-md">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="relative w-7 h-7 rounded-lg bg-[#b5497a]/20 text-[#f4a6b9] flex items-center justify-center">
              <Bell className="w-4 h-4" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping" />
              )}
            </div>
            <div>
              <h4 className="text-xs font-bold text-white font-['Outfit']">Notifications</h4>
              <p className="text-[10px] text-zinc-400">Pops up outside the app, like Instagram</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {notifPermission !== 'granted' && (
              <button
                onClick={enableSystemNotifications}
                className="flex items-center gap-1 text-[11px] font-semibold text-white bg-[#b5497a] hover:bg-[#a33f6d] px-2.5 py-1.5 rounded-lg transition-all"
              >
                <BellRing className="w-3 h-3" />
                Turn on
              </button>
            )}
            {unreadCount > 0 ? (
              <button
                onClick={markAllRead}
                className="text-[11px] font-semibold text-[#f4a6b9] hover:underline"
              >
                Mark all read ({unreadCount})
              </button>
            ) : (
              <span className="text-[11px] font-semibold text-emerald-400">All caught up</span>
            )}
          </div>
        </div>

        <div className="space-y-2">
          {notifications.map((n) => {
            const unread = !readNotifs[n.id];
            return (
              <button
                key={n.id}
                onClick={() => setReadNotifs((p) => ({ ...p, [n.id]: true }))}
                className={`w-full text-left flex items-start gap-2.5 p-2.5 rounded-xl border transition-all active:scale-[0.98] ${
                  unread
                    ? 'bg-[#251d30] border-[#b5497a]/40'
                    : 'bg-[#251d30]/60 border-[#372646] opacity-70'
                }`}
              >
                <span className="text-sm mt-0.5">{n.icon}</span>
                <span className="flex-1">
                  <span className="text-[11px] font-bold text-white block">{n.title}</span>
                  <span className="text-[10px] text-zinc-400 block leading-snug">{n.body}</span>
                </span>
                {unread && <span className="w-2 h-2 rounded-full bg-[#f4a6b9] mt-1 shrink-0" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Diet Suggestions for the 5 Period Days */}
      <div className="rounded-2xl p-4 bg-[#1e1727] border border-[#31253e] shadow-md">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-amber-500/20 text-amber-300 flex items-center justify-center">
              <Salad className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white font-['Outfit']">Diet for your 5 Period Days</h4>
              <p className="text-[10px] text-zinc-400">Eat better, feel better during periods</p>
            </div>
          </div>
          <button
            onClick={() => setActiveTab('diet')}
            className="text-[11px] font-semibold text-[#f4a6b9] hover:underline flex items-center gap-0.5"
          >
            Full plan <ArrowRight className="w-3 h-3" />
          </button>
        </div>

        <div className="space-y-2">
          {[
            ['Day 1', '🧣', 'Warm soups, khichdi & ginger tea — eases cramps'],
            ['Day 2', '🥬', 'Iron refill: spinach, beetroot & jaggery'],
            ['Day 3', '🍊', 'Vitamin-C fruits with meals to absorb iron'],
            ['Day 4', '🥚', 'Protein & magnesium: eggs, paneer, bananas, nuts'],
            ['Day 5', '🥗', 'Light recovery: millets, curd & fresh salads']
          ].map(([day, emoji, tip]) => (
            <div key={day} className="flex items-center gap-2.5 p-2 rounded-xl bg-[#251d30] border border-[#372646]">
              <span className="text-[10px] font-extrabold text-[#f4a6b9] w-9 shrink-0 uppercase">{day}</span>
              <span className="text-sm">{emoji}</span>
              <span className="text-[11px] text-zinc-200 leading-snug">{tip}</span>
            </div>
          ))}
        </div>

        <p className="text-[10px] text-rose-300/90 mt-2.5 bg-rose-950/30 border border-rose-500/25 rounded-lg px-2 py-1.5 leading-relaxed">
          ⚠️ Avoid: cold drinks, fried food & excess caffeine — they can worsen cramps.
        </p>
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
