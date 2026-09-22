import React, { useState } from 'react';
import { useAppState } from '../context/AppStateContext';
import { SHOPPING_PRODUCTS, PERIOD_POVERTY_CENTERS } from '../data/shoppingData';
import { 
  ShoppingBag, Eye, EyeOff, ShieldCheck, Sparkles, Leaf, MapPin, 
  PhoneCall, Check, ExternalLink, Calculator, Tag 
} from 'lucide-react';

export default function Shopping() {
  const { state, t } = useAppState();
  const [privacyBlur, setPrivacyBlur] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [activeTab, setActiveTab] = useState("products"); // "products", "locator", "calculator"

  // Estimator State
  const [estDays, setEstDays] = useState(state.userProfile.periodDuration || 5);
  const [estPadsPerDay, setEstPadsPerDay] = useState(4);

  const filteredProducts = selectedCategory === "all"
    ? SHOPPING_PRODUCTS
    : SHOPPING_PRODUCTS.filter(p => p.category === selectedCategory);

  // Estimator Calculations
  const padsPerCycle = estDays * estPadsPerDay;
  const commercialAnnualCost = padsPerCycle * 12 * 12; // ₹12 per regular commercial pad
  const janAushadhiAnnualCost = padsPerCycle * 12 * 1; // ₹1 per Suvidha pad
  const annualSavings = commercialAnnualCost - janAushadhiAnnualCost;

  return (
    <div className="space-y-4 pb-24 animate-in fade-in duration-300">
      {/* Title */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-white font-['Outfit']">
            {t('shop.title')}
          </h2>
          <p className="text-xs text-zinc-400">
            {t('shop.subtitle')}
          </p>
        </div>

        {/* Privacy Blur Toggle */}
        <button
          onClick={() => setPrivacyBlur(!privacyBlur)}
          title="Toggle Privacy Blur for Discreet Browsing"
          className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border text-xs font-semibold transition-all ${
            privacyBlur
              ? 'bg-purple-950/60 text-purple-300 border-purple-500/40'
              : 'bg-[#1e1727] text-zinc-400 border-[#31253e]'
          }`}
        >
          {privacyBlur ? <EyeOff className="w-3.5 h-3.5 text-purple-400" /> : <Eye className="w-3.5 h-3.5" />}
          <span>{privacyBlur ? "Privacy ON" : "Privacy OFF"}</span>
        </button>
      </div>

      {/* Sub Tabs */}
      <div className="flex bg-[#1e1727] p-1 rounded-xl border border-[#31253e]">
        {[
          { id: "products", label: "Catalog" },
          { id: "calculator", label: "Savings Calc" },
          { id: "locator", label: "Free Pad Centers" }
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

      {/* Products Catalog View */}
      {activeTab === "products" && (
        <div className="space-y-3">
          {/* Category Filter Chips */}
          <div className="flex gap-1.5 overflow-x-auto pb-1 no-scrollbar">
            {[
              { id: "all", label: "All Items" },
              { id: "pads", label: "Pads & Liners" },
              { id: "cups", label: "Menstrual Cups" },
              { id: "underwear", label: "Period Panties" },
              { id: "wellness", label: "Pain Relief Patches" }
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`whitespace-nowrap px-3 py-1 rounded-xl text-xs font-medium border transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-[#b5497a] border-[#f4a6b9] text-white shadow-sm'
                    : 'bg-[#1e1727] border-[#31253e] text-zinc-400 hover:text-zinc-200'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Product Cards */}
          <div className="space-y-3">
            {filteredProducts.map((prod) => (
              <div
                key={prod.id}
                className="rounded-2xl p-4 bg-[#1e1727] border border-[#31253e] shadow-md space-y-2 relative overflow-hidden"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#31253e] text-[#f4a6b9]">
                      {prod.badge}
                    </span>
                    <h4 className="text-sm font-bold text-white mt-1 font-['Outfit']">
                      {prod.name}
                    </h4>
                    <span className="text-[11px] text-zinc-400">
                      Brand: {prod.brand} • {prod.unit}
                    </span>
                  </div>

                  <div className="text-right">
                    <div className="text-base font-extrabold text-emerald-400 font-['Outfit']">
                      ₹{prod.price}
                    </div>
                    {prod.regularMarketPrice > prod.price && (
                      <span className="text-[10px] text-zinc-400 line-through">
                        ₹{prod.regularMarketPrice}
                      </span>
                    )}
                  </div>
                </div>

                {/* Privacy Blurred Product Content if enabled */}
                <div className={`transition-all duration-200 ${
                  privacyBlur ? 'filter blur-sm select-none hover:filter-none' : ''
                }`}>
                  <p className="text-xs text-zinc-300 leading-relaxed">
                    {prod.description}
                  </p>
                  <div className="mt-2 flex items-center gap-2 text-[11px] text-zinc-400">
                    <span className="text-emerald-400 flex items-center gap-1">
                      <Leaf className="w-3 h-3" /> {prod.biodegradable}
                    </span>
                    <span>• Packaging: {prod.discreetPack}</span>
                  </div>
                </div>

                {privacyBlur && (
                  <p className="text-[9px] text-purple-300 italic pt-1">
                    * Hover or tap to unblur details (Privacy Shield Active)
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Savings & Replenishment Calculator */}
      {activeTab === "calculator" && (
        <div className="rounded-2xl p-4 bg-[#1e1727] border border-[#31253e] shadow-md space-y-4">
          <div className="flex items-center gap-2 text-white font-bold text-xs uppercase tracking-wider font-['Outfit']">
            <Calculator className="w-4 h-4 text-[#f4a6b9]" />
            <span>{t('shop.subscriptionReminder')}</span>
          </div>

          <p className="text-xs text-zinc-300 leading-relaxed">
            Estimate how many pads you need each cycle and see how switching to Jan Aushadhi (₹1 Suvidha pads) or Menstrual Cups saves money and prevents waste.
          </p>

          <div className="grid grid-cols-2 gap-3 text-xs">
            <div>
              <label className="font-semibold block mb-1">Period Length (Days):</label>
              <input
                type="number"
                min="2"
                max="10"
                value={estDays}
                onChange={(e) => setEstDays(parseInt(e.target.value) || 5)}
                className="w-full bg-[#251d30] border border-[#372646] rounded-xl px-3 py-1.5 text-white"
              />
            </div>

            <div>
              <label className="font-semibold block mb-1">Pads Used Per Day:</label>
              <input
                type="number"
                min="1"
                max="8"
                value={estPadsPerDay}
                onChange={(e) => setEstPadsPerDay(parseInt(e.target.value) || 4)}
                className="w-full bg-[#251d30] border border-[#372646] rounded-xl px-3 py-1.5 text-white"
              />
            </div>
          </div>

          <div className="p-3 rounded-xl bg-[#251d30] border border-[#372646] space-y-2 text-xs">
            <div className="flex justify-between text-zinc-300">
              <span>Estimated Pads Needed Per Cycle:</span>
              <strong className="text-white">{padsPerCycle} Pads</strong>
            </div>
            <div className="flex justify-between text-zinc-300">
              <span>Annual Commercial Cost (~₹12/pad):</span>
              <span className="text-rose-400 font-bold">₹{commercialAnnualCost.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-zinc-300">
              <span>Jan Aushadhi Suvidha Cost (₹1/pad):</span>
              <span className="text-emerald-400 font-bold">₹{janAushadhiAnnualCost.toLocaleString()}</span>
            </div>
            <div className="pt-2 border-t border-[#31253e] flex justify-between text-sm font-bold text-emerald-400">
              <span>Your Annual Savings:</span>
              <span>₹{annualSavings.toLocaleString()} / year</span>
            </div>
          </div>
        </div>
      )}

      {/* WOW 3: Period Poverty Support Locator */}
      {activeTab === "locator" && (
        <div className="space-y-3">
          <div className="p-3.5 rounded-2xl bg-gradient-to-r from-purple-950/60 to-[#271536] border border-purple-500/30 text-xs text-zinc-300 leading-relaxed">
            <div className="flex items-center gap-1.5 text-purple-300 font-bold text-xs uppercase tracking-wider mb-1">
              <MapPin className="w-3.5 h-3.5" />
              <span>Period Dignity & Free Pad Locator</span>
            </div>
            Period poverty affects over 23 million girls in India every year. These verified public centers provide free or ₹1 government pads without paperwork or questions.
          </div>

          <div className="space-y-2.5">
            {PERIOD_POVERTY_CENTERS.map((center, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-2xl bg-[#1e1727] border border-[#31253e] space-y-1.5 text-xs"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-[9px] uppercase font-bold px-1.5 py-0.5 rounded bg-[#31253e] text-purple-300">
                      {center.type}
                    </span>
                    <h4 className="font-bold text-white text-sm mt-1 font-['Outfit']">
                      {center.name}
                    </h4>
                  </div>
                  <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/30">
                    {center.cost}
                  </span>
                </div>

                <p className="text-zinc-300 text-[11px] leading-relaxed">
                  {center.access}
                </p>

                <div className="pt-2 border-t border-[#31253e] flex items-center justify-between text-[11px] text-zinc-400">
                  <span>Timing: {center.timing}</span>
                  <span className="text-[#f4a6b9] font-medium flex items-center gap-1">
                    <PhoneCall className="w-3 h-3" /> {center.helpline}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
