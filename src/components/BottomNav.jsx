import React, { useEffect, useRef, useState } from 'react';
import {
  Home, Calendar, Utensils, Bot, ShieldAlert
} from 'lucide-react';
import { useAppState } from '../context/AppStateContext';

// Bottom dock behavior:
//  - Mouse/trackpad (fine pointer): the bar starts hidden and POPS UP when the
//    cursor heads down toward it (lower third moving down, or within 130px of
//    the bottom edge). It tucks away again once the cursor leaves the dock zone.
//    A small glowing handle stays visible while tucked so it's discoverable,
//    and keyboard focus inside the bar keeps it open.
//  - Touch devices have no cursor, so the bar stays always visible there.

export default function BottomNav({ activeTab, setActiveTab }) {
  const { t } = useAppState();

  const isFinePointer =
    typeof window !== 'undefined' &&
    !!window.matchMedia?.('(hover: hover) and (pointer: fine)')?.matches;

  const [visible, setVisible] = useState(() => !(typeof window !== 'undefined' &&
    !!window.matchMedia?.('(hover: hover) and (pointer: fine)')?.matches));
  const visibleRef = useRef(visible);
  const navRef = useRef(null);
  const hideTimerRef = useRef(null);
  const lastYRef = useRef(null);

  useEffect(() => {
    // Touch / no-cursor devices: always visible, no listeners.
    if (!isFinePointer) return undefined;

    const show = () => {
      if (hideTimerRef.current) {
        clearTimeout(hideTimerRef.current);
        hideTimerRef.current = null;
      }
      if (!visibleRef.current) {
        visibleRef.current = true;
        setVisible(true);
      }
    };

    const scheduleHide = () => {
      if (hideTimerRef.current) return;
      hideTimerRef.current = setTimeout(() => {
        hideTimerRef.current = null;
        const focusedInside = navRef.current?.contains(document.activeElement);
        if (visibleRef.current && !focusedInside) {
          visibleRef.current = false;
          setVisible(false);
        }
      }, 420);
    };

    const onMouseMove = (e) => {
      const h = window.innerHeight;
      const y = e.clientY;
      const goingDown = lastYRef.current != null && y > lastYRef.current;
      lastYRef.current = y;

      const nearBottom = y >= h - 130;            // cursor reached the dock zone
      const headingDown = goingDown && y >= h * 0.65; // cursor moving downwards
      const farFromDock = y < h - 220;            // clearly away -> tuck it away

      if (nearBottom || headingDown) {
        show();
      } else if (farFromDock) {
        scheduleHide();
      }
      // Between h-220 and h-130: sticky band - keep current state (no flicker).
    };

    const onFocusIn = (e) => {
      if (navRef.current?.contains(e.target)) show();
    };
    const onFocusOut = () => {
      setTimeout(() => {
        if (!navRef.current?.contains(document.activeElement)) scheduleHide();
      }, 0);
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    document.addEventListener('focusin', onFocusIn);
    document.addEventListener('focusout', onFocusOut);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('focusin', onFocusIn);
      document.removeEventListener('focusout', onFocusOut);
      if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFinePointer]);

  const navItems = [
    { id: 'home', label: t('nav.home') || 'Home', icon: Home },
    { id: 'tracker', label: t('nav.tracker') || 'Cycle', icon: Calendar },
    { id: 'ai', label: t('nav.ai') || 'Femi AI', icon: Bot, isHighlight: true },
    { id: 'diet', label: t('nav.diet') || 'Diet', icon: Utensils },
    { id: 'safety', label: t('nav.safety') || 'SOS', icon: ShieldAlert, isSos: true },
  ];

  return (
    <>
      {/* Peek handle: only visible while the bar is tucked away */}
      <div
        aria-hidden="true"
        className={`fixed bottom-0 left-1/2 -translate-x-1/2 z-40 pointer-events-none transition-opacity duration-300 ${
          visible ? 'opacity-0' : 'opacity-100'
        }`}
      >
        <div className="w-16 h-[5px] rounded-t-full bg-gradient-to-r from-[#b5497a] to-[#f4a6b9] shadow-[0_0_10px_rgba(181,73,122,0.7)]" />
      </div>

      <nav
        ref={navRef}
        className={`fixed bottom-0 left-0 right-0 z-40 px-4 pb-3 pointer-events-none transition-transform duration-300 ease-out will-change-transform ${
          visible ? 'translate-y-0' : 'translate-y-full'
        }`}
      >
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
    </>
  );
}
