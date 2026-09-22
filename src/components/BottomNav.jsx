import React from 'react';
import {
  Home, Calendar, Utensils, Bot, ShieldAlert, Dumbbell, ShoppingBag, BookOpen, PenLine, Flower2, HeartHandshake
} from 'lucide-react';
import { useAppState } from '../context/AppStateContext';

export default function BottomNav({ activeTab, setActiveTab, onOpenMoreDrawer }) {
  const { t } = useAppState();

  const navItems = [
    { id: 'home', label: t('nav.home') || 'Home', icon: Home },
    { id: 'tracker', label: t('nav.tracker') || 'Cycle', icon: Calendar },
    { id: 'diet', label: t('nav.diet') || 'Diet', icon: Utensils },
    { id: 'ai', label: t('nav.ai') || 'Femi AI', icon: Bot, isHighlight: true },
    { id: 'safety', label: t('nav.safety') || 'SOS', icon: ShieldAlert, isSos: true },
    { id: 'more', label: t('nav.more') || 'More', icon: Flower2, isMore: true },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 px-4 pb-3 pointer-events-none">
      <div className="mx-auto max-w-md pointer-events-auto rounded-[28px] bg-[#1b1226]/70 backdrop-blur-2xl border border-[#b5497a]/25 shadow-[0_30px_60px_-24px_rgba(158,44,94,0.55)] px-2 py-2 flex items-center justify-around">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          const isHighlight = item.isHighlight;
          const isSos = item.isSos;

          if (isHighlight) {
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`relative flex flex-col items-center -top-3.5 transition-transform active:scale-95`}
              >
                <div className={`w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all ${
                  isActive
                    ? 'bg-gradient-to-tr from-[#b5497a] via-[#d65d95] to-[#f4a6b9] text-white ring-4 ring-[#b5497a]/30 shadow-[#b5497a]/50 scale-105'
                    : 'bg-[#b5497a] text-white hover:opacity-95 shadow-[#b5497a]/30'
                }`}>
                  <Icon className="w-6 h-6" />
                </div>
                <span className={`text-[10px] mt-1 font-semibold ${
                  isActive ? 'text-[#f4a6b9]' : 'text-zinc-400'
                }`}>
                  {item.label}
                </span>
              </button>
            );
          }

          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex flex-col items-center py-1 px-2 rounded-xl transition-all active:scale-95 ${
                isActive
                  ? (isActive ? 'text-[#f4a6b9]' : '')
                  : isSos
                  ? 'text-rose-400 hover:text-rose-300'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              <div className="relative">
                <Icon className={`w-5 h-5 ${isActive ? 'stroke-[2.5]' : 'stroke-2'}`} />
                {isSos && (
                  <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-rose-500 animate-ping" />
                )}
              </div>
              <span className={`text-[10px] mt-1 font-semibold ${
                isActive ? 'font-bold text-[#f4a6b9]' : 'text-zinc-400'
              }`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
