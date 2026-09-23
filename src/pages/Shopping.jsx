import React, { useState } from 'react';
import { useAppState } from '../context/AppStateContext';
import {
  SHOPPING_PRODUCTS, PERIOD_POVERTY_CENTERS, PERIOD_MEDICINES,
  AWARENESS_CONDITIONS, MENSTRUAL_MYTHS, RED_FLAGS
} from '../data/shoppingData';
import { PRODUCT_GUIDES, PRODUCT_COMPARISON } from '../data/productGuidesData';
import {
  ShoppingBag, Pill, Brain, Calculator, MapPin, Eye, EyeOff, Leaf,
  PhoneCall, ChevronDown, AlertTriangle, Stethoscope, Lightbulb,
  HeartPulse, Megaphone, ShieldAlert, BookOpen, Lock, ListChecks
} from 'lucide-react';

const CATEGORY_LABELS = {
  all: 'All Items',
  pads: 'Pads & Liners',
  cups: 'Menstrual Cups',
  tampons: 'Tampons',
  underwear: 'Period Panties',
  wellness: 'Pain Relief',
  hygiene: 'Hygiene & Travel'
};
const CATEGORY_ORDER = ['all', 'pads', 'cups', 'tampons', 'underwear', 'wellness', 'hygiene'];

const SUB_TABS = [
  { id: 'products', label: 'Catalog', icon: ShoppingBag },
  { id: 'medicines', label: 'Medicines', icon: Pill },
  { id: 'guide', label: 'How to Use', icon: BookOpen },
  { id: 'awareness', label: 'Awareness', icon: Brain },
  { id: 'calculator', label: 'Savings', icon: Calculator },
  { id: 'locator', label: 'Free Centers', icon: MapPin }
];

const ACCESS_STYLE = {
  'Over the counter': 'bg-emerald-500/15 text-emerald-300 border-emerald-500/40',
  'Ask a pharmacist': 'bg-amber-500/15 text-amber-300 border-amber-500/40',
  'Prescription': 'bg-rose-500/15 text-rose-300 border-rose-500/40'
};

const hideBrokenImg = (e) => { e.currentTarget.style.display = 'none'; };

function InfoSection({ title, icon: Icon, color, items }) {
  return (
    <div>
      <h5 className={`text-[11px] font-bold uppercase tracking-wider flex items-center gap-1.5 mb-1.5 ${color}`}>
        <Icon className="w-3.5 h-3.5" />
        {title}
      </h5>
      <ul className="space-y-1.5">
        {items.map((item, i) => (
          <li key={i} className="flex items-start gap-2 text-[11px] text-zinc-300 leading-relaxed">
            <span className="w-1 h-1 rounded-full bg-zinc-500 mt-1.5 shrink-0" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Shopping() {
  const { state, t } = useAppState();
  const [privacyBlur, setPrivacyBlur] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [activeTab, setActiveTab] = useState('products'); // products | medicines | guide | awareness | calculator | locator
  const [openCondition, setOpenCondition] = useState('pcos');
  const [openGuide, setOpenGuide] = useState('pads');

  // Sensitive-content gate for the step-by-step usage guide.
  // Choice is stored only in this device's localStorage (zero-cloud).
  const [showSensitive, setShowSensitive] = useState(() => {
    try { return localStorage.getItem('femcare_sensitive_content') === 'on'; } catch { return false; }
  });
  const setSensitive = (on) => {
    setShowSensitive(on);
    try { localStorage.setItem('femcare_sensitive_content', on ? 'on' : 'off'); } catch { /* ignore */ }
  };

  // Estimator State
  const [estDays, setEstDays] = useState(state.userProfile.periodDuration || 5);
  const [estPadsPerDay, setEstPadsPerDay] = useState(4);

  // Product type chips — built from what actually exists in the catalog
  const categories = CATEGORY_ORDER
    .filter((id) => id === 'all' || SHOPPING_PRODUCTS.some((p) => p.category === id))
    .map((id) => ({ id, label: CATEGORY_LABELS[id] }));

  const filteredProducts = selectedCategory === 'all'
    ? SHOPPING_PRODUCTS
    : SHOPPING_PRODUCTS.filter((p) => p.category === selectedCategory);

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
          <span>{privacyBlur ? 'Privacy ON' : 'Privacy OFF'}</span>
        </button>
      </div>

      {/* Sub Tabs */}
      <div className="flex flex-wrap gap-1.5">
        {SUB_TABS.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${
                isActive
                  ? 'bg-gradient-to-r from-[#b5497a] to-[#d65d95] text-white border-transparent shadow-md shadow-[#b5497a]/30'
                  : 'bg-[#1e1727] border-[#31253e] text-zinc-400 hover:text-white hover:border-[#b5497a]/40'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* ── Products Catalog ── */}
      {activeTab === 'products' && (
        <div className="space-y-3">
          {/* Product Type Filter Chips */}
          <div className="flex gap-1.5 overflow-x-auto pb-1 no-scrollbar">
            {categories.map((cat) => (
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
                className="group rounded-2xl bg-[#1e1727] border border-[#31253e] shadow-md overflow-hidden"
              >
                {/* Product Image */}
                <div className="relative h-36 overflow-hidden bg-gradient-to-br from-[#b5497a]/50 to-[#4b3560]">
                  <img
                    src={prod.image}
                    alt={prod.name}
                    loading="lazy"
                    onError={hideBrokenImg}
                    className={`w-full h-full object-cover transition-all duration-300 ${
                      privacyBlur ? 'blur-md scale-110 group-hover:blur-0 group-hover:scale-100' : ''
                    }`}
                  />
                  <span className="absolute top-2 left-2 text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-black/60 text-[#f4a6b9] border border-[#b5497a]/50">
                    {prod.badge}
                  </span>
                  <span className="absolute bottom-2 right-2 text-[10px] font-semibold px-2 py-0.5 rounded-md bg-black/60 text-zinc-200 border border-white/10">
                    {prod.type}
                  </span>
                </div>

                {/* Content */}
                <div className="p-3.5 space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <h4 className="text-sm font-bold text-white font-['Outfit'] leading-snug">
                        {prod.name}
                      </h4>
                      <span className="text-[11px] text-zinc-400">
                        {prod.brand} • {prod.unit}
                      </span>
                    </div>
                    <div className="text-right shrink-0">
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

                  <p className={`text-xs text-zinc-300 leading-relaxed transition-all duration-200 ${
                    privacyBlur ? 'blur-[5px] select-none group-hover:blur-0' : ''
                  }`}>
                    {prod.description}
                  </p>

                  <div className="flex flex-wrap items-center gap-2 text-[10px] text-zinc-400">
                    <span className="text-emerald-400 flex items-center gap-1">
                      <Leaf className="w-3 h-3" /> {prod.biodegradable}
                    </span>
                    <span>• Packaging: {prod.discreetPack}</span>
                  </div>

                  {privacyBlur && (
                    <p className="text-[9px] text-purple-300 italic pt-0.5">
                      * Hover or tap to unblur details (Privacy Shield Active)
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── Medicines & Cramp Care ── */}
      {activeTab === 'medicines' && (
        <div className="space-y-3">
          {/* Disclaimer */}
          <div className="p-3.5 rounded-2xl bg-amber-950/40 border border-amber-500/40 text-[11px] text-amber-100/90 leading-relaxed">
            <div className="flex items-center gap-1.5 text-amber-300 font-bold text-xs uppercase tracking-wider mb-1">
              <AlertTriangle className="w-3.5 h-3.5" />
              Read First — Awareness, Not a Prescription
            </div>
            These notes are for education only. Medicines can have side effects and interactions that depend on <em>your</em> history — always consult a doctor or licensed pharmacist before starting anything, and never exceed the label dose. Doses below are common adult ranges and may not suit you.
          </div>

          {PERIOD_MEDICINES.map((med) => (
            <div key={med.id} className="rounded-2xl bg-[#1e1727] border border-[#31253e] shadow-md overflow-hidden">
              {/* Medicine Image */}
              <div className="relative h-32 overflow-hidden bg-gradient-to-br from-rose-900/60 to-[#2a1220]">
                <img
                  src={med.image}
                  alt={med.name}
                  loading="lazy"
                  onError={hideBrokenImg}
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-2 left-2 text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-black/60 text-[#f4a6b9] border border-[#b5497a]/50">
                  {med.category}
                </span>
                <span className={`absolute top-2 right-2 text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border bg-black/70 ${
                  ACCESS_STYLE[med.access] || 'bg-black/60 text-zinc-200 border-white/20'
                }`}>
                  {med.access}
                </span>
              </div>

              <div className="p-3.5 space-y-2.5">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <h4 className="text-sm font-bold text-white font-['Outfit']">{med.name}</h4>
                    <span className="text-[11px] text-zinc-400">{med.example} • {med.unit}</span>
                  </div>
                  <span className="text-sm font-extrabold text-emerald-400 shrink-0">₹{med.price}</span>
                </div>

                {/* Used for */}
                <div className="flex flex-wrap gap-1.5">
                  {med.usedFor.map((u) => (
                    <span key={u} className="text-[10px] px-2 py-0.5 rounded-md bg-[#2d1e39] text-[#f4a6b9] border border-[#3f2a4f]">
                      {u}
                    </span>
                  ))}
                </div>

                <p className="text-xs text-zinc-300 leading-relaxed">
                  <strong className="text-white">How it helps:</strong> {med.how}
                </p>

                <div className="p-2.5 rounded-xl bg-[#251d30] border border-[#372646] text-[11px] text-pink-200/90 leading-relaxed flex items-start gap-1.5">
                  <Pill className="w-3.5 h-3.5 text-[#f4a6b9] shrink-0 mt-0.5" />
                  <span><strong className="text-white">Usual dose note:</strong> {med.dose}</span>
                </div>

                <div className="p-2.5 rounded-xl bg-rose-950/40 border border-rose-500/30 text-[11px] text-rose-200/90 leading-relaxed flex items-start gap-1.5">
                  <ShieldAlert className="w-3.5 h-3.5 text-rose-400 shrink-0 mt-0.5" />
                  <span><strong>Safety:</strong> {med.safety}</span>
                </div>
              </div>
            </div>
          ))}

          <p className="text-[11px] text-zinc-500 text-center px-2">
            Emergency? Call <strong className="text-zinc-300">112</strong> • Mental health support: Tele-MANAS <strong className="text-zinc-300">14416</strong>
          </p>
        </div>
      )}

      {/* ── How to Use: Product Types & Guides (Sensitive Content) ── */}
      {activeTab === 'guide' && (
        <div className="space-y-3">
          {/* Sensitive Content Gate */}
          {!showSensitive && (
            <div className="rounded-2xl p-6 bg-[#1e1727] border border-purple-500/40 text-center space-y-3 relative overflow-hidden">
              <div className="absolute -top-14 -right-14 w-44 h-44 bg-purple-600/20 rounded-full blur-3xl pointer-events-none" />
              <div className="w-14 h-14 rounded-2xl bg-purple-950/70 border border-purple-500/40 flex items-center justify-center mx-auto relative">
                <Lock className="w-6 h-6 text-purple-300" />
              </div>
              <h4 className="text-sm font-bold text-white font-['Outfit'] relative">
                Sensitive Content — Hidden
              </h4>
              <p className="text-[11px] text-zinc-400 leading-relaxed relative max-w-[320px] mx-auto">
                This section contains detailed step-by-step usage instructions and illustrations for period products — including internal products like tampons and menstrual cups.
                It stays hidden until <strong className="text-zinc-300">you</strong> choose to see it.
              </p>
              <button
                onClick={() => setSensitive(true)}
                className="relative w-full py-3 rounded-2xl bg-gradient-to-r from-[#b5497a] to-[#d65d95] text-white font-bold text-sm shadow-lg shadow-[#b5497a]/40 flex items-center justify-center gap-2 active:scale-95 transition-all"
              >
                <Eye className="w-4 h-4" />
                <span>Show Sensitive Content</span>
              </button>
              <p className="text-[10px] text-zinc-500 relative">
                Your choice is saved only on this device • You can hide it again anytime
              </p>
            </div>
          )}

          {showSensitive && (
            <>
              {/* Unlocked header with hide option */}
              <div className="flex items-center justify-between gap-2 p-2.5 rounded-xl bg-purple-950/40 border border-purple-500/30">
                <p className="text-[10px] text-purple-200/80 leading-snug flex items-center gap-1.5">
                  <Eye className="w-3.5 h-3.5 shrink-0" />
                  Sensitive content is visible on this device.
                </p>
                <button
                  onClick={() => setSensitive(false)}
                  className="flex items-center gap-1 shrink-0 px-2 py-1 rounded-lg bg-[#1e1727] border border-purple-500/40 text-[10px] font-semibold text-purple-300 hover:text-white transition-colors"
                >
                  <EyeOff className="w-3 h-3" />
                  <span>Hide again</span>
                </button>
              </div>

              {/* Comparison Table */}
              <div className="rounded-2xl p-4 bg-[#1e1727] border border-[#31253e]">
                <div className="flex items-center gap-2 text-white font-bold text-xs uppercase tracking-wider font-['Outfit'] mb-3">
                  <ListChecks className="w-4 h-4 text-[#f4a6b9]" />
                  <span>Compare at a Glance</span>
                </div>
                <div className="overflow-x-auto -mx-1 px-1">
                  <table className="w-full text-[10px] border-collapse">
                    <thead>
                      <tr className="text-left text-zinc-400">
                        <th className="pb-1.5 pr-2 font-semibold">Product</th>
                        <th className="pb-1.5 pr-2 font-semibold">Change every</th>
                        <th className="pb-1.5 pr-2 font-semibold">Typical cost</th>
                        <th className="pb-1.5 pr-2 font-semibold">Eco</th>
                        <th className="pb-1.5 font-semibold">Great for</th>
                      </tr>
                    </thead>
                    <tbody>
                      {PRODUCT_COMPARISON.map((row) => (
                        <tr key={row.type} className="border-t border-[#31253e]">
                          <td className="py-1.5 pr-2 font-bold text-white whitespace-nowrap">{row.type}</td>
                          <td className="py-1.5 pr-2 text-pink-300 whitespace-nowrap">{row.change}</td>
                          <td className="py-1.5 pr-2 text-emerald-300 whitespace-nowrap">{row.cost}</td>
                          <td className="py-1.5 pr-2 text-zinc-300 whitespace-nowrap">{row.eco}</td>
                          <td className="py-1.5 text-zinc-400">{row.greatFor}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Product Guides Accordion */}
              {PRODUCT_GUIDES.map((guide) => {
                const isOpen = openGuide === guide.id;
                return (
                  <div key={guide.id} className="rounded-2xl bg-[#1e1727] border border-[#31253e] overflow-hidden">
                    <button
                      onClick={() => setOpenGuide(isOpen ? null : guide.id)}
                      className="w-full flex items-center gap-3 p-3 text-left hover:bg-[#251d30] transition-colors"
                    >
                      <img
                        src={guide.image}
                        alt=""
                        loading="lazy"
                        onError={hideBrokenImg}
                        className="w-14 h-14 rounded-xl object-cover shrink-0"
                      />
                      <div className="min-w-0 flex-1">
                        <div className="text-sm font-bold text-white font-['Outfit']">{guide.title}</div>
                        <div className="text-[11px] text-zinc-400 truncate">{guide.subtitle}</div>
                      </div>
                      <ChevronDown className={`w-4 h-4 shrink-0 transition-transform ${isOpen ? 'rotate-180 text-[#f4a6b9]' : 'text-zinc-500'}`} />
                    </button>

                    {isOpen && (
                      <div className="px-3.5 pb-3.5 space-y-3.5 animate-in fade-in duration-200">
                        <img
                          src={guide.image}
                          alt={guide.title}
                          loading="lazy"
                          onError={hideBrokenImg}
                          className="w-full h-32 object-cover rounded-xl border border-[#372646]"
                        />

                        {/* Types */}
                        <div>
                          <h5 className="text-[11px] font-bold uppercase tracking-wider text-[#f4a6b9] flex items-center gap-1.5 mb-1.5">
                            <ListChecks className="w-3.5 h-3.5" />
                            Types available
                          </h5>
                          <div className="space-y-1.5">
                            {guide.types.map((ty) => (
                              <div key={ty.name} className="p-2 rounded-lg bg-[#251d30] border border-[#372646] text-[11px]">
                                <div className="flex items-center justify-between gap-2">
                                  <span className="font-bold text-white text-xs">{ty.name}</span>
                                  <span className="text-[9px] px-1.5 py-0.5 rounded bg-[#31253e] text-[#f4a6b9] border border-[#3f2a4f] shrink-0">
                                    {ty.change}
                                  </span>
                                </div>
                                <p className="text-zinc-400 mt-0.5 leading-relaxed">{ty.desc}</p>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* How to use — numbered steps */}
                        <div>
                          <h5 className="text-[11px] font-bold uppercase tracking-wider text-emerald-300 flex items-center gap-1.5 mb-1.5">
                            <BookOpen className="w-3.5 h-3.5" />
                            How to use — step by step
                          </h5>
                          <ol className="space-y-1.5">
                            {guide.howToUse.map((step, i) => (
                              <li key={i} className="flex items-start gap-2 text-[11px] text-zinc-300 leading-relaxed">
                                <span className="w-4 h-4 rounded-full bg-[#b5497a]/30 border border-[#f4a6b9]/50 text-[#f4a6b9] text-[9px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                                  {i + 1}
                                </span>
                                <span>{step}</span>
                              </li>
                            ))}
                          </ol>
                        </div>

                        {/* Tips */}
                        <InfoSection title="Pro tips" icon={Lightbulb} color="text-amber-300" items={guide.tips} />

                        {/* Avoid */}
                        <InfoSection title="Avoid these mistakes" icon={ShieldAlert} color="text-rose-300" items={guide.avoid} />

                        {/* Optional safety warning (e.g. TSS for tampons) */}
                        {guide.warning && (
                          <div className="p-2.5 rounded-xl bg-rose-950/40 border border-rose-500/40 text-[11px] text-rose-200/90 leading-relaxed flex items-start gap-1.5">
                            <AlertTriangle className="w-3.5 h-3.5 text-rose-400 shrink-0 mt-0.5" />
                            <span><strong>Safety warning:</strong> {guide.warning}</span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </>
          )}
        </div>
      )}

      {/* ── Health Awareness ── */}
      {activeTab === 'awareness' && (
        <div className="space-y-3">
          {/* Intro Banner */}
          <div className="p-3.5 rounded-2xl bg-gradient-to-r from-purple-950/70 to-[#271536] border border-purple-500/30 text-xs text-zinc-300 leading-relaxed">
            <div className="flex items-center gap-1.5 text-purple-300 font-bold text-xs uppercase tracking-wider mb-1">
              <Megaphone className="w-3.5 h-3.5" />
              Know Your Body — awareness prevents late diagnoses
            </div>
            Common period conditions explained: how they are <em>caused</em>, what you will feel, and exactly when to see a doctor. Educational info only — not a diagnosis.
          </div>

          {/* Condition Accordions */}
          {AWARENESS_CONDITIONS.map((cond) => {
            const isOpen = openCondition === cond.id;
            return (
              <div key={cond.id} className="rounded-2xl bg-[#1e1727] border border-[#31253e] overflow-hidden">
                <button
                  onClick={() => setOpenCondition(isOpen ? null : cond.id)}
                  className="w-full flex items-center gap-3 p-3 text-left hover:bg-[#251d30] transition-colors"
                >
                  <img
                    src={cond.image}
                    alt=""
                    loading="lazy"
                    onError={hideBrokenImg}
                    className="w-14 h-14 rounded-xl object-cover shrink-0"
                  />
                  <div className="min-w-0 flex-1">
                    <div className="text-sm font-bold text-white font-['Outfit']">{cond.title}</div>
                    <div className="text-[11px] text-zinc-400 truncate">{cond.aka}</div>
                  </div>
                  <ChevronDown className={`w-4 h-4 shrink-0 transition-transform ${isOpen ? 'rotate-180 text-[#f4a6b9]' : 'text-zinc-500'}`} />
                </button>

                {isOpen && (
                  <div className="px-3.5 pb-3.5 space-y-3.5 animate-in fade-in duration-200">
                    <img
                      src={cond.image}
                      alt={cond.title}
                      loading="lazy"
                      onError={hideBrokenImg}
                      className="w-full h-32 object-cover rounded-xl border border-[#372646]"
                    />

                    <p className="text-[11px] text-purple-200 bg-purple-950/40 border border-purple-500/30 rounded-xl px-2.5 py-2 leading-relaxed">
                      📊 {cond.stat}
                    </p>

                    <div>
                      <h5 className="text-[11px] font-bold uppercase tracking-wider text-[#f4a6b9] flex items-center gap-1.5 mb-1.5">
                        <Stethoscope className="w-3.5 h-3.5" />
                        What it is
                      </h5>
                      <p className="text-[11px] text-zinc-300 leading-relaxed">{cond.what}</p>
                    </div>

                    <InfoSection title="How it is caused" icon={Lightbulb} color="text-amber-300" items={cond.causes} />
                    <InfoSection title="Signs you may notice" icon={HeartPulse} color="text-rose-300" items={cond.symptoms} />
                    <InfoSection title="What helps" icon={Stethoscope} color="text-emerald-300" items={cond.manage} />
                    <InfoSection title="See a doctor if…" icon={AlertTriangle} color="text-orange-300" items={cond.doctorIf} />
                  </div>
                )}
              </div>
            );
          })}

          {/* Myths vs Facts */}
          <div className="rounded-2xl p-4 bg-[#1e1727] border border-[#31253e]">
            <div className="flex items-center gap-2 text-white font-bold text-xs uppercase tracking-wider font-['Outfit'] mb-3">
              <Lightbulb className="w-4 h-4 text-amber-300" />
              <span>Myth vs Fact</span>
            </div>
            <div className="space-y-2">
              {MENSTRUAL_MYTHS.map((m, i) => (
                <div key={i} className="p-2.5 rounded-xl bg-[#251d30] border border-[#372646] space-y-1.5">
                  <p className="text-[11px] text-rose-300 leading-relaxed">
                    <span className="font-bold uppercase text-[9px] px-1.5 py-0.5 rounded bg-rose-500/20 border border-rose-500/40 mr-1.5 align-middle">✗ Myth</span>
                    {m.myth}
                  </p>
                  <p className="text-[11px] text-emerald-200 leading-relaxed">
                    <span className="font-bold uppercase text-[9px] px-1.5 py-0.5 rounded bg-emerald-500/20 border border-emerald-500/40 mr-1.5 align-middle">✓ Fact</span>
                    {m.fact}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Red Flags */}
          <div className="rounded-2xl p-4 bg-rose-950/40 border border-rose-500/40">
            <div className="flex items-center gap-2 text-rose-300 font-bold text-xs uppercase tracking-wider font-['Outfit'] mb-2.5">
              <ShieldAlert className="w-4 h-4" />
              <span>See a Doctor Immediately If…</span>
            </div>
            <ul className="space-y-1.5">
              {RED_FLAGS.map((flag, i) => (
                <li key={i} className="flex items-start gap-2 text-[11px] text-rose-100/90 leading-relaxed">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-400 mt-1.5 shrink-0" />
                  <span>{flag}</span>
                </li>
              ))}
            </ul>
            <p className="mt-3 pt-2.5 border-t border-rose-500/30 text-[11px] text-rose-200/80">
              Emergency: <strong>112</strong> • Mental health: Tele-MANAS <strong>14416</strong> • Health info: <strong>104</strong>
            </p>
          </div>
        </div>
      )}

      {/* Savings & Replenishment Calculator */}
      {activeTab === 'calculator' && (
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
                min="3"
                max="8"
                value={estDays}
                onChange={(e) =>
                  setEstDays(
                    Math.min(8, Math.max(3, parseInt(e.target.value) || 5))
                  )
                }
                className="w-full bg-[#251d30] border border-[#372646] rounded-xl px-3 py-1.5 text-white"
              />
              <span className="text-[10px] text-zinc-500 block mt-1">
                Allowed range: 3–8 days
              </span>
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
      {activeTab === 'locator' && (
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
