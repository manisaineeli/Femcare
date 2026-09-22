import React, { useState } from 'react';
import { useAppState } from '../context/AppStateContext';
import { 
  CYCLE_DIET_PHASES, SYMPTOM_FOOD_SOLUTIONS, IRON_BOOSTING_RECIPES 
} from '../data/dietPlanData';
import { 
  Utensils, Droplets, Plus, RotateCcw, Sparkles, Check, AlertTriangle, 
  Flame, Leaf, ChevronDown, ChevronUp, BookOpen 
} from 'lucide-react';

export default function DietPlan() {
  const { state, cycleStatus, t, addHydrationGlass, resetHydration, updateUserProfile } = useAppState();
  const [selectedPhase, setSelectedPhase] = useState(cycleStatus.phaseKey);
  const [dietPref, setDietPref] = useState(state.userProfile.dietPreference || "veg");
  const [expandedRecipe, setExpandedRecipe] = useState("r1");
  const [activeTab, setActiveTab] = useState("daily"); // "daily", "recipes", "symptoms"

  const currentPhaseData = CYCLE_DIET_PHASES[selectedPhase] || CYCLE_DIET_PHASES.menstrual;
  const mealPlan = currentPhaseData.mealPlan[dietPref] || currentPhaseData.mealPlan.veg;

  const handleDietPrefChange = (pref) => {
    setDietPref(pref);
    updateUserProfile({ dietPreference: pref });
  };

  const hydrationProgress = Math.min(100, Math.round((state.hydration.currentGlasses / state.hydration.targetGlasses) * 100));

  return (
    <div className="space-y-4 pb-24 animate-in fade-in duration-300">
      {/* Title */}
      <div>
        <h2 className="text-xl font-bold text-white font-['Outfit']">
          {t('diet.title')}
        </h2>
        <p className="text-xs text-zinc-400">
          {t('diet.subtitle')}
        </p>
      </div>

      {/* Sub Tabs */}
      <div className="flex bg-[#1e1727] p-1 rounded-xl border border-[#31253e]">
        {[
          { id: "daily", label: "Cycle Meals" },
          { id: "recipes", label: "Iron Recipes" },
          { id: "symptoms", label: "Symptom Food" }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all ${
              activeTab === tab.id
                ? 'bg-gradient-to-r from-[#b5497a] to-[#d65d95] text-white shadow-sm'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Daily Cycle Meals Tab */}
      {activeTab === "daily" && (
        <div className="space-y-4">
          {/* Phase Selector Pills */}
          <div className="grid grid-cols-4 gap-1.5">
            {[
              { key: "menstrual", label: "Menstrual", days: "Days 1-5" },
              { key: "follicular", label: "Follicular", days: "Days 6-13" },
              { key: "ovulatory", label: "Ovulatory", days: "Days 14-16" },
              { key: "luteal", label: "Luteal", days: "Days 17-28" }
            ].map((p) => {
              const isSelected = selectedPhase === p.key;
              const isCurrent = cycleStatus.phaseKey === p.key;
              return (
                <button
                  key={p.key}
                  onClick={() => setSelectedPhase(p.key)}
                  className={`py-2 px-1 rounded-xl text-center border transition-all ${
                    isSelected
                      ? 'bg-[#b5497a]/25 border-[#f4a6b9] text-white shadow-md'
                      : 'bg-[#1e1727] border-[#31253e] text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  <div className="text-[11px] font-bold truncate">
                    {p.label}
                  </div>
                  <div className="text-[9px] text-zinc-400 mt-0.5">
                    {p.days}
                  </div>
                  {isCurrent && (
                    <span className="text-[8px] font-extrabold uppercase text-[#f4a6b9] block mt-0.5">
                      • You Are Here •
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Phase Context Overview Card */}
          <div className="rounded-2xl p-4 bg-[#1e1727] border border-[#31253e]">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-pink-300">
                {currentPhaseData.phaseName}
              </span>
              <span className="text-[11px] px-2 py-0.5 rounded-full bg-[#31253e] text-zinc-300 font-medium">
                {currentPhaseData.caloricGuideline}
              </span>
            </div>

            <p className="text-xs text-zinc-300 leading-relaxed mb-3">
              {currentPhaseData.hormonalContext}
            </p>

            {/* Dietary Preference Picker */}
            <div className="pt-2.5 border-t border-[#31253e] flex items-center justify-between">
              <span className="text-xs text-zinc-400 font-medium">Dietary Style:</span>
              <div className="flex items-center gap-1">
                {[
                  { id: "veg", label: "Veg" },
                  { id: "nonVeg", label: "Non-Veg" },
                  { id: "jain", label: "Jain" },
                  { id: "vegan", label: "Vegan" }
                ].map((pref) => (
                  <button
                    key={pref.id}
                    onClick={() => handleDietPrefChange(pref.id)}
                    className={`px-2 py-1 rounded-lg text-[11px] font-semibold border transition-all ${
                      dietPref === pref.id
                        ? 'bg-[#b5497a] border-[#f4a6b9] text-white shadow-sm'
                        : 'bg-[#251d30] border-[#372646] text-zinc-400 hover:text-zinc-200'
                    }`}
                  >
                    {pref.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Meal Breakdown for Selected Phase */}
          <div className="rounded-2xl p-4 bg-[#1e1727] border border-[#31253e] space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#f4a6b9]" />
              <span>Personalized {dietPref.toUpperCase()} Meal Schedule</span>
            </h4>

            <div className="space-y-2 text-xs">
              <div className="p-2.5 rounded-xl bg-[#251d30] border border-[#372646]">
                <div className="font-bold text-amber-300 text-[11px] uppercase tracking-wider mb-0.5">
                  🌅 Breakfast
                </div>
                <p className="text-zinc-200">{mealPlan.breakfast}</p>
              </div>

              <div className="p-2.5 rounded-xl bg-[#251d30] border border-[#372646]">
                <div className="font-bold text-emerald-300 text-[11px] uppercase tracking-wider mb-0.5">
                  ☀️ Nourishing Lunch
                </div>
                <p className="text-zinc-200">{mealPlan.lunch}</p>
              </div>

              <div className="p-2.5 rounded-xl bg-[#251d30] border border-[#372646]">
                <div className="font-bold text-pink-300 text-[11px] uppercase tracking-wider mb-0.5">
                  🍵 Afternoon Snack & Herbal Tea
                </div>
                <p className="text-zinc-200">{mealPlan.snack}</p>
              </div>

              <div className="p-2.5 rounded-xl bg-[#251d30] border border-[#372646]">
                <div className="font-bold text-indigo-300 text-[11px] uppercase tracking-wider mb-0.5">
                  🌙 Gentle Dinner
                </div>
                <p className="text-zinc-200">{mealPlan.dinner}</p>
              </div>
            </div>
          </div>

          {/* Superfoods to Eat vs Moderate */}
          <div className="grid grid-cols-2 gap-2">
            <div className="p-3 rounded-2xl bg-emerald-950/20 border border-emerald-500/30 text-xs">
              <div className="flex items-center gap-1 text-emerald-400 font-bold mb-2">
                <Check className="w-3.5 h-3.5" />
                <span>Superfoods to Eat</span>
              </div>
              <ul className="space-y-1 text-[11px] text-zinc-300">
                {currentPhaseData.superfoods.map((food, i) => (
                  <li key={i} className="flex items-start gap-1">
                    <span className="text-emerald-400">•</span>
                    <span>{food}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-3 rounded-2xl bg-rose-950/20 border border-rose-500/30 text-xs">
              <div className="flex items-center gap-1 text-rose-400 font-bold mb-2">
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>Foods to Moderate</span>
              </div>
              <ul className="space-y-1 text-[11px] text-zinc-300">
                {currentPhaseData.foodsToAvoid.map((food, i) => (
                  <li key={i} className="flex items-start gap-1">
                    <span className="text-rose-400">•</span>
                    <span>{food}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Iron Boosting Recipes Tab */}
      {activeTab === "recipes" && (
        <div className="space-y-3">
          <div className="p-3 rounded-2xl bg-[#1e1727] border border-[#31253e] text-xs text-zinc-300 leading-relaxed">
            🌿 <strong>Did you know?</strong> Nearly 50% of Indian women experience iron-deficiency anemia, which intensifies fatigue and cramps during periods. These 5-ingredient recipes naturally restore ferritin without synthetic stomach upset.
          </div>

          {IRON_BOOSTING_RECIPES.map((recipe) => {
            const isExpanded = expandedRecipe === recipe.id;
            return (
              <div
                key={recipe.id}
                className="rounded-2xl p-4 bg-[#1e1727] border border-[#31253e] shadow-md transition-all"
              >
                <div
                  onClick={() => setExpandedRecipe(isExpanded ? null : recipe.id)}
                  className="flex items-center justify-between cursor-pointer"
                >
                  <div>
                    <h4 className="text-sm font-bold text-white font-['Outfit']">
                      {recipe.title}
                    </h4>
                    <p className="text-[11px] text-[#f4a6b9] mt-0.5">
                      {recipe.tagline} • Ready in {recipe.time}
                    </p>
                  </div>
                  <button className="p-1 text-zinc-400 hover:text-white">
                    {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>
                </div>

                {isExpanded && (
                  <div className="mt-3 pt-3 border-t border-[#31253e] space-y-2 text-xs">
                    <div>
                      <span className="font-bold text-zinc-300 block mb-1">5 Simple Ingredients:</span>
                      <ul className="grid grid-cols-1 gap-1 text-[11px] text-zinc-300 pl-1">
                        {recipe.ingredients.map((ing, i) => (
                          <li key={i} className="flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#f4a6b9]" />
                            <span>{ing}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mt-2 bg-[#251d30] p-2.5 rounded-xl border border-[#372646]">
                      <span className="font-bold text-zinc-200 block mb-1">Quick Method:</span>
                      <p className="text-[11px] text-zinc-300 leading-relaxed">
                        {recipe.instructions}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Symptom Food Solutions Tab */}
      {activeTab === "symptoms" && (
        <div className="space-y-3">
          {SYMPTOM_FOOD_SOLUTIONS.map((sol, idx) => (
            <div
              key={idx}
              className="rounded-2xl p-4 bg-[#1e1727] border border-[#31253e] space-y-2"
            >
              <h4 className="text-sm font-bold text-white flex items-center gap-2 font-['Outfit']">
                <span className="w-2 h-2 rounded-full bg-[#f4a6b9]" />
                <span>{sol.symptom}</span>
              </h4>

              <div className="space-y-1.5 text-xs">
                <div className="p-2 rounded-xl bg-emerald-950/30 border border-emerald-500/20 text-emerald-200">
                  <strong>Healing Foods:</strong> {sol.doEat}
                </div>
                <div className="p-2 rounded-xl bg-rose-950/30 border border-rose-500/20 text-rose-200">
                  <strong>Avoid:</strong> {sol.avoid}
                </div>
                <p className="text-[11px] text-zinc-400 italic pt-1">
                  💡 Science: {sol.why}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Hydration Tracker Section (Always visible) */}
      <div className="rounded-2xl p-4 bg-[#1e1727] border border-[#31253e] shadow-md">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-cyan-500/20 text-cyan-400 flex items-center justify-center">
              <Droplets className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white font-['Outfit']">
                {t('diet.hydrationTracker')}
              </h4>
              <span className="text-[10px] text-zinc-400">{t('diet.goal')}</span>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={addHydrationGlass}
              className="flex items-center gap-1 text-xs font-semibold px-3 py-1.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white shadow-md active:scale-95 transition-all"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>{t('diet.addGlass')}</span>
            </button>
            <button
              onClick={resetHydration}
              title="Reset Water"
              className="p-1.5 rounded-xl bg-[#251d30] text-zinc-400 hover:text-white border border-[#372646]"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Visual Progress Bar */}
        <div className="w-full bg-[#251d30] h-3 rounded-full overflow-hidden border border-[#372646] mb-2">
          <div
            className="bg-gradient-to-r from-cyan-500 to-blue-500 h-full rounded-full transition-all duration-300"
            style={{ width: `${hydrationProgress}%` }}
          />
        </div>

        <div className="flex items-center justify-between text-xs font-medium text-zinc-300">
          <span>{state.hydration.currentGlasses} of {state.hydration.targetGlasses} glasses ({(state.hydration.currentGlasses * 0.25).toFixed(1)}L)</span>
          <span className="text-cyan-400 font-bold">{hydrationProgress}% Complete</span>
        </div>
      </div>
    </div>
  );
}
