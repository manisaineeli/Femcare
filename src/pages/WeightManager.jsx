import React, { useState } from 'react';
import { useAppState } from '../context/AppStateContext';
import { 
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid 
} from 'recharts';
import {
  Dumbbell, Scale, TrendingUp, Info, Sparkles, Check, Flame, Activity,
  ArrowRight, ShieldCheck, Timer, HeartPulse
} from 'lucide-react';

// Basic pain-relief exercises (animated GIF demos, bundled locally in /public/exercises)
const painReliefExercises = [
  {
    id: 'pelvic-tilt',
    gif: './exercises/pelvic-tilt.gif',
    name: 'Pelvic Tilts',
    relieves: 'Lower-back cramps & stiffness',
    dose: '10 slow reps',
    steps: 'Lie on your back, knees bent. Gently flatten your lower back into the floor, hold 3 sec, release.'
  },
  {
    id: 'pelvic-tilt-bridge',
    gif: './exercises/pelvic-tilt-bridge.gif',
    name: 'Tilt into Bridge',
    relieves: 'Back pain & tight hips',
    dose: '10 reps',
    steps: 'Tilt your pelvis, then lift your hips toward the ceiling. Squeeze gently at the top, lower slowly.'
  },
  {
    id: 'butterfly-pose',
    gif: './exercises/butterfly-pose.gif',
    name: 'Butterfly Pose',
    relieves: 'Pelvic tension & period cramps',
    dose: '2 minutes',
    steps: 'Sit tall, soles of feet together. Let your knees fall open and flutter them gently.'
  },
  {
    id: 'piriformis-stretch',
    gif: './exercises/piriformis-stretch.gif',
    name: 'Seated Piriformis Stretch',
    relieves: 'Hip & glute pain',
    dose: '30 sec / side',
    steps: 'Seated, cross one ankle over the opposite knee and lean forward with a straight spine.'
  },
  {
    id: 'lower-back-stretch',
    gif: './exercises/lower-back-stretch.gif',
    name: 'Seated Lower-Back Stretch',
    relieves: 'Aching lower back',
    dose: '45 seconds',
    steps: 'Sit on the floor, legs extended. Reach toward your toes and breathe slowly into the stretch.'
  },
  {
    id: 'iron-cross-stretch',
    gif: './exercises/iron-cross-stretch.gif',
    name: 'Iron Cross Twist',
    relieves: 'Stiff spine & waist pain',
    dose: '10 / side',
    steps: 'Lie flat, arms out. Drop both knees to one side, then the other, keeping shoulders grounded.'
  }
];

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

      {/* Pain-Relief Exercises (animated GIF demos) */}
      <div className="rounded-2xl p-4 bg-[#1e1727] border border-[#31253e] shadow-md space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <HeartPulse className="w-4 h-4 text-rose-400" />
            <h4 className="text-xs font-bold text-white uppercase tracking-wider font-['Outfit']">
              Pain-Relief Exercises
            </h4>
          </div>
          <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-rose-900/40 text-rose-300 border border-rose-500/30">
            Basic · No equipment
          </span>
        </div>
        <p className="text-[11px] text-zinc-400 -mt-1">
          Gentle moves that ease cramps, back pain and hip tension. Just follow the animation.
        </p>

        <div className="grid grid-cols-2 gap-2.5">
          {painReliefExercises.map((ex) => (
            <div
              key={ex.id}
              className="rounded-xl bg-[#251d30] border border-[#372646] overflow-hidden"
            >
              <div className="h-32 bg-[#16101c] flex items-center justify-center overflow-hidden border-b border-[#372646]">
                <img
                  src={ex.gif}
                  alt={ex.name}
                  loading="lazy"
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="p-2.5">
                <div className="text-[11px] font-bold text-white leading-tight">{ex.name}</div>
                <div className="text-[10px] text-[#f4a6b9] mt-0.5 leading-snug">{ex.relieves}</div>
                <p className="text-[10px] text-zinc-400 mt-1 leading-snug">{ex.steps}</p>
                <div className="flex items-center gap-1 mt-1.5 text-[10px] font-semibold text-zinc-300">
                  <Timer className="w-3 h-3 text-[#f4a6b9]" />
                  {ex.dose}
                </div>
              </div>
            </div>
          ))}
        </div>
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
