import React, { useState } from 'react';
import { useAppState } from '../context/AppStateContext';
import { 
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid 
} from 'recharts';
import { 
  Dumbbell, Scale, TrendingUp, Info, Sparkles, Check, Flame, Activity, 
  ArrowRight, ShieldCheck 
} from 'lucide-react';

export default function WeightManager() {
  const { state, cycleStatus, t, logWeight, updateUserProfile } = useAppState();
  const [newWeight, setNewWeight] = useState(state.userProfile.currentWeight || 56.4);
  const [loggedToday, setLoggedToday] = useState(false);
  const [activeGoal, setActiveGoal] = useState("maintain"); // "lose", "maintain", "gain"

  const handleWeightSubmit = (e) => {
    e.preventDefault();
    const val = parseFloat(newWeight);
    if (!isNaN(val) && val > 20 && val < 250) {
      logWeight(val);
      setLoggedToday(true);
      setTimeout(() => setLoggedToday(false), 2000);
    }
  };

  // Recharts formatted data
  const chartData = state.weightHistory.map((item) => ({
    date: item.date.slice(5), // MM-DD
    weight: item.weight,
    cycleDay: item.cycleDay
  }));

  const phaseWorkouts = {
    menstrual: {
      intensity: "Gentle & Restorative",
      tagline: "Honor your body's rest mode",
      exercises: [
        { name: "Child's Pose (Balasana)", duration: "5 mins", benefit: "Relieves lower back compression" },
        { name: "Gentle Evening Walk", duration: "20 mins", benefit: "Releases endorphins without elevating cortisol" },
        { name: "Supta Baddha Konasana", duration: "10 mins", benefit: "Opens pelvic muscles and soothes cramps" }
      ]
    },
    follicular: {
      intensity: "High Energy & Strength Building",
      tagline: "Estrogen is surging: prime time for muscle building",
      exercises: [
        { name: "Strength Training / Dumbbells", duration: "35 mins", benefit: "Maximal muscle protein synthesis" },
        { name: "Brisk Jogging or Cycling", duration: "25 mins", benefit: "High cardiovascular capacity" },
        { name: "Vinyasa Flow Yoga", duration: "30 mins", benefit: "Flexibility and joint mobility" }
      ]
    },
    ovulatory: {
      intensity: "Peak Intensity & Power",
      tagline: "Highest energy, stamina, and pain tolerance",
      exercises: [
        { name: "HIIT (High Intensity Intervals)", duration: "20 mins", benefit: "Maximum metabolic burn" },
        { name: "Heavy Resistance Training", duration: "40 mins", benefit: "Peak personal records (PRs)" },
        { name: "Outdoor Sprint Intervals", duration: "15 mins", benefit: "Cardiorespiratory peak" }
      ]
    },
    luteal: {
      intensity: "Moderate Steady State & Pilates",
      tagline: "Metabolism is +200 kcal higher, but joints are looser (relaxin)",
      exercises: [
        { name: "Mat Pilates & Core Stability", duration: "30 mins", benefit: "Tones without joint strain" },
        { name: "Incline Treadmill Walk", duration: "25 mins", benefit: "Steady calorie burn without fatigue" },
        { name: "Deep Yin Yoga & Foam Rolling", duration: "20 mins", benefit: "Reduces pre-menstrual water retention" }
      ]
    }
  };

  const currentWorkout = phaseWorkouts[cycleStatus.phaseKey] || phaseWorkouts.follicular;

  return (
    <div className="space-y-4 pb-24 animate-in fade-in duration-300">
      {/* Title */}
      <div>
        <h2 className="text-xl font-bold text-white font-['Outfit']">
          {t('weight.title')}
        </h2>
        <p className="text-xs text-zinc-400">
          {t('weight.subtitle')}
        </p>
      </div>

      {/* Cycle-Aware Water Retention Callout */}
      <div className="p-3.5 rounded-2xl bg-amber-950/30 border border-amber-500/30 text-xs text-amber-200 flex items-start gap-2.5">
        <Info className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
        <div>
          <span className="font-bold text-white">Understanding Hormonal Water Weight</span>
          <p className="text-[11px] text-amber-200/90 mt-1 leading-relaxed">
            {t('weight.waterRetentionNotice')}
          </p>
        </div>
      </div>

      {/* Log Weight Card */}
      <div className="rounded-2xl p-4 bg-[#1e1727] border border-[#31253e] shadow-md">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Scale className="w-4 h-4 text-[#f4a6b9]" />
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              {t('weight.logWeight')}
            </h4>
          </div>
          <span className="text-xs text-zinc-400">
            Goal: <strong className="text-white">{state.userProfile.weightGoal} kg</strong>
          </span>
        </div>

        <form onSubmit={handleWeightSubmit} className="flex gap-2">
          <div className="relative flex-1">
            <input
              type="number"
              step="0.1"
              value={newWeight}
              onChange={(e) => setNewWeight(e.target.value)}
              className="w-full bg-[#251d30] border border-[#372646] rounded-xl px-3 py-2 text-sm font-bold text-white focus:outline-none focus:border-[#b5497a]"
            />
            <span className="absolute right-3 top-2.5 text-xs text-zinc-400 font-semibold">
              kg
            </span>
          </div>

          <button
            type="submit"
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#b5497a] to-[#d65d95] text-white text-xs font-semibold shadow-md active:scale-95 transition-all"
          >
            {loggedToday ? "Logged!" : "Save"}
          </button>
        </form>
      </div>

      {/* 30-Day Weight Trend Chart (Recharts) */}
      <div className="rounded-3xl p-4 bg-[#1e1727] border border-[#31253e] shadow-xl">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5 font-['Outfit']">
              <TrendingUp className="w-4 h-4 text-[#f4a6b9]" />
              <span>{t('weight.trend')}</span>
            </h4>
            <span className="text-[10px] text-zinc-400">
              Correlated with your 28-day hormonal rhythm
            </span>
          </div>
          <span className="text-xs font-bold text-pink-300">
            Current: {state.userProfile.currentWeight} kg
          </span>
        </div>

        <div className="h-44 w-full -ml-3">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="weightGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#b5497a" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#b5497a" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#2c2237" vertical={false} />
              <XAxis dataKey="date" stroke="#6b587a" fontSize={9} tickLine={false} />
              <YAxis domain={['dataMin - 1', 'dataMax + 1']} stroke="#6b587a" fontSize={9} tickLine={false} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#191220',
                  borderColor: '#372646',
                  borderRadius: '12px',
                  fontSize: '11px',
                  color: '#fff'
                }}
                formatter={(val) => [`${val} kg`, 'Weight']}
                labelFormatter={(label) => `Date: ${label}`}
              />
              <Area
                type="monotone"
                dataKey="weight"
                stroke="#f4a6b9"
                strokeWidth={2.5}
                fillOpacity={1}
                fill="url(#weightGrad)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="mt-2 pt-2 border-t border-[#31253e]/80 flex items-center justify-between text-[10px] text-zinc-400">
          <span>• Lowest: Follicular Phase</span>
          <span>• +1.2kg Peak: Late Luteal Water Hold</span>
        </div>
      </div>

      {/* Cycle-Phased Fitness Recommendations */}
      <div className="rounded-2xl p-4 bg-[#1e1727] border border-[#31253e] space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Dumbbell className="w-4 h-4 text-purple-400" />
            <h4 className="text-xs font-bold text-white uppercase tracking-wider font-['Outfit']">
              {t('weight.phaseFitness')}
            </h4>
          </div>
          <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-purple-900/40 text-purple-300 border border-purple-500/30">
            {currentWorkout.intensity}
          </span>
        </div>

        <p className="text-xs text-zinc-300 italic">
          "{currentWorkout.tagline}"
        </p>

        <div className="space-y-2 text-xs">
          {currentWorkout.exercises.map((ex, i) => (
            <div
              key={i}
              className="p-2.5 rounded-xl bg-[#251d30] border border-[#372646] flex items-center justify-between"
            >
              <div>
                <div className="font-semibold text-white">{ex.name}</div>
                <div className="text-[10px] text-[#f4a6b9]">{ex.benefit}</div>
              </div>
              <span className="text-[11px] font-bold text-zinc-300 bg-[#31253e] px-2 py-1 rounded-lg">
                {ex.duration}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
