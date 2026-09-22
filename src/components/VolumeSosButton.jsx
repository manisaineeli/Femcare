import React, { useEffect, useRef, useState } from 'react';
import { Volume2, Plus } from 'lucide-react';
import { isFeature } from '../config/features';

const DOUBLE_PRESS_MS = 600; // two presses within 600ms = double press
const HOLD_MS = 2000; // press-and-hold for 2 seconds = hold trigger
const FIRE_DEBOUNCE_MS = 1500; // cooldown so one intent fires once

/**
 * Always-visible Volume-Up SOS control.
 * Gestures (identical to the requested hardware gesture):
 *   - press the VOL+ button TWICE quickly, or
 *   - press-and-HOLD the VOL+ button for 2 seconds
 *   - hardware Volume-Up key double-press / 2s hold is also listened for,
 *     where the browser/OS exposes it (most mobile browsers reserve the key,
 *     so the on-screen button is the guaranteed path).
 * A normal single tap does nothing, so it can never conflict with one-tap SOS.
 */
export default function VolumeSosButton({ onTrigger, disabled = false }) {
  const [holding, setHolding] = useState(false);
  const [hint, setHint] = useState(true);
  const holdTimer = useRef(null);
  const hintTimer = useRef(null);
  const lastPress = useRef(0);
  const firedRef = useRef(false);
  const onTriggerRef = useRef(onTrigger);
  onTriggerRef.current = onTrigger;
  const disabledRef = useRef(disabled);
  disabledRef.current = disabled;

  const fire = (source) => {
    if (disabledRef.current || firedRef.current) return;
    firedRef.current = true;
    setHint(false);
    clearTimeout(holdTimer.current);
    setHolding(false);
    onTriggerRef.current?.(source);
    setTimeout(() => { firedRef.current = false; }, FIRE_DEBOUNCE_MS);
  };

  const clearHold = () => {
    clearTimeout(holdTimer.current);
    setHolding(false);
  };

  // Shared press-count logic (pointer release + keyboard Enter).
  const registerRelease = () => {
    if (disabledRef.current) return;
    clearHold();
    const now = Date.now();
    if (now - lastPress.current <= DOUBLE_PRESS_MS) {
      lastPress.current = 0;
      fire('volume-up pressed 2 times');
    } else {
      lastPress.current = now;
    }
  };

  const handlePointerDown = () => {
    if (disabledRef.current) return;
    setHolding(true);
    clearTimeout(holdTimer.current);
    holdTimer.current = setTimeout(() => fire('volume-up held 2 seconds'), HOLD_MS);
  };

  // Dismiss the hint after a while or on first interaction.
  useEffect(() => {
    hintTimer.current = setTimeout(() => setHint(false), 7000);
    return () => clearTimeout(hintTimer.current);
  }, []);

  // Hardware Volume-Up key support (best effort - works where the OS allows).
  useEffect(() => {
    if (!isFeature('sosVolumeGesture')) return undefined;
    let keyPressCount = 0;
    let keyReset = null;
    let keyHold = null;

    const isVolumeUp = (e) =>
      e.code === 'AudioVolumeUp' ||
      ['AudioVolumeUp', 'VolumeUp', 'Volumeup'].includes(e.key);

    const onDown = (e) => {
      if (disabledRef.current || !isVolumeUp(e) || e.repeat) return;
      keyPressCount += 1;
      clearTimeout(keyReset);
      keyReset = setTimeout(() => { keyPressCount = 0; }, DOUBLE_PRESS_MS);
      if (keyPressCount >= 2) {
        keyPressCount = 0;
        fire('volume-up pressed 2 times');
      }
      setHolding(true);
      clearTimeout(keyHold);
      keyHold = setTimeout(() => fire('volume-up held 2 seconds'), HOLD_MS);
    };

    const onUp = (e) => {
      if (!isVolumeUp(e)) return;
      clearTimeout(keyHold);
      setHolding(false);
    };

    window.addEventListener('keydown', onDown);
    window.addEventListener('keyup', onUp);
    return () => {
      window.removeEventListener('keydown', onDown);
      window.removeEventListener('keyup', onUp);
      clearTimeout(keyReset);
      clearTimeout(keyHold);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Unmount cleanup.
  useEffect(() => () => {
    clearTimeout(holdTimer.current);
    clearTimeout(hintTimer.current);
  }, []);

  if (!isFeature('sosVolumeGesture') || !isFeature('sosLiveLocation')) return null;

  return (
    <div className="fixed right-4 bottom-24 z-40 flex flex-col items-end gap-1.5 pointer-events-none">
      {hint && (
        <div className="pointer-events-none text-[9px] leading-tight text-center px-2 py-1 rounded-lg bg-[#241622]/95 border border-red-500/40 text-red-200 shadow-lg max-w-[130px]">
          VOL+ : double-press<br />or hold 2s = live SOS
        </div>
      )}
      <button
        type="button"
        disabled={disabled}
        aria-label="Volume Up SOS - double press or hold 2 seconds"
        title="Double-press or hold 2s for Live SOS"
        onPointerDown={handlePointerDown}
        onPointerUp={registerRelease}
        onPointerLeave={clearHold}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            registerRelease();
          }
        }}
        className={`pointer-events-auto relative w-12 h-12 rounded-full bg-gradient-to-br from-red-500 to-rose-600 hover:from-red-400 hover:to-rose-500 text-white shadow-lg shadow-red-950/70 flex items-center justify-center transition-all active:scale-95 select-none touch-none ${
          holding ? 'ring-4 ring-red-400/50 scale-110 animate-pulse' : ''
        } ${disabled ? 'opacity-40 pointer-events-none' : ''}`}
      >
        <Volume2 className="w-5 h-5" />
        <span className="absolute -top-1 -right-1 w-4.5 h-4.5 min-w-[18px] min-h-[18px] rounded-full bg-white flex items-center justify-center shadow">
          <Plus className="w-3 h-3 text-red-600" strokeWidth={4} />
        </span>
        {holding && (
          <span className="absolute -bottom-5 text-[8px] font-bold text-red-300 whitespace-nowrap animate-pulse">
            HOLDING...
          </span>
        )}
      </button>
    </div>
  );
}
