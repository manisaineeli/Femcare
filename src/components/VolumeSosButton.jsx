import React, { useEffect, useRef, useState } from 'react';
import { Volume2, Plus } from 'lucide-react';
import { isFeature } from '../config/features';

const DOUBLE_PRESS_MS = 600; // two presses within 600ms = double press
const HOLD_MS = 2000; // press-and-hold for 2 seconds = hold trigger
const FIRE_DEBOUNCE_MS = 1500; // cooldown so one intent fires once
const DRAG_THRESHOLD_PX = 6; // movement beyond this = drag instead of tap
const BTN_SIZE = 48; // w-12 h-12
const EDGE_MARGIN = 8; // keep the button fully on-screen while dragging
const POS_KEY = 'femcare_sos_btn_pos'; // saved floating position (device-local)

const clampPos = (x, y) => ({
  x: Math.min(Math.max(x, EDGE_MARGIN), Math.max(EDGE_MARGIN, window.innerWidth - BTN_SIZE - EDGE_MARGIN)),
  y: Math.min(Math.max(y, EDGE_MARGIN), Math.max(EDGE_MARGIN, window.innerHeight - BTN_SIZE - EDGE_MARGIN))
});

const defaultPos = () => clampPos(window.innerWidth - BTN_SIZE - 16, window.innerHeight - 96 - BTN_SIZE);

const loadPos = () => {
  try {
    const raw = localStorage.getItem(POS_KEY);
    if (!raw) return null;
    const p = JSON.parse(raw);
    if (typeof p?.x === 'number' && typeof p?.y === 'number') return clampPos(p.x, p.y);
    return null;
  } catch {
    return null;
  }
};

const savePos = (pos) => {
  try { localStorage.setItem(POS_KEY, JSON.stringify(pos)); } catch { /* ignore */ }
};

/**
 * Always-visible Volume-Up SOS control.
 * Gestures (identical to the requested hardware gesture):
 *   - press the VOL+ button TWICE quickly, or
 *   - press-and-HOLD the VOL+ button for 2 seconds
 *   - hardware Volume-Up key double-press / 2s hold is also listened for,
 *     where the browser/OS exposes it (most mobile browsers reserve the key,
 *     so the on-screen button is the guaranteed path).
 * A normal single tap does nothing, so it can never conflict with one-tap SOS.
 * The button floats: drag it anywhere on screen and the spot is remembered
 * on this device. A drag never counts as a SOS press.
 */
export default function VolumeSosButton({ onTrigger, disabled = false }) {
  const [holding, setHolding] = useState(false);
  const [hint, setHint] = useState(true);
  const [dragging, setDragging] = useState(false);
  const [pos, setPos] = useState(() => loadPos() || defaultPos());
  const posRef = useRef(pos);
  const applyPos = (next) => { posRef.current = next; setPos(next); };
  const holdTimer = useRef(null);
  const hintTimer = useRef(null);
  const lastPress = useRef(0);
  const drag = useRef({ active: false, moved: false, startX: 0, startY: 0, originX: 0, originY: 0 });
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

  const handlePointerDown = (e) => {
    if (disabledRef.current) return;
    if (e.pointerType === 'mouse' && e.button !== 0) return;
    try { e.currentTarget.setPointerCapture(e.pointerId); } catch { /* unsupported */ }
    drag.current = { active: true, moved: false, startX: e.clientX, startY: e.clientY, originX: posRef.current.x, originY: posRef.current.y };
    setHint(false);
    setHolding(true);
    clearTimeout(holdTimer.current);
    holdTimer.current = setTimeout(() => fire('volume-up held 2 seconds'), HOLD_MS);
  };

  const handlePointerMove = (e) => {
    const d = drag.current;
    if (!d.active) return;
    const dx = e.clientX - d.startX;
    const dy = e.clientY - d.startY;
    if (!d.moved && Math.hypot(dx, dy) >= DRAG_THRESHOLD_PX) {
      d.moved = true;
      clearTimeout(holdTimer.current); // a drag is never a hold-SOS
      setHolding(false);
      setDragging(true);
      lastPress.current = 0; // and never half of a double-press
    }
    if (d.moved) {
      e.preventDefault();
      applyPos(clampPos(d.originX + dx, d.originY + dy));
    }
  };

  const endPointer = (e) => {
    const d = drag.current;
    if (!d.active) return;
    d.active = false;
    try { e.currentTarget.releasePointerCapture(e.pointerId); } catch { /* unsupported */ }
    if (d.moved) {
      setDragging(false);
      clearHold();
      savePos(posRef.current); // remember where the user dropped it
      return;
    }
    registerRelease();
  };

  const cancelPointer = () => {
    if (!drag.current.active) return;
    drag.current.active = false;
    setDragging(false);
    clearHold();
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

  // Keep the floating position on-screen after a window/viewport resize.
  useEffect(() => {
    const onResize = () => applyPos(clampPos(posRef.current.x, posRef.current.y));
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  // Unmount cleanup.
  useEffect(() => () => {
    clearTimeout(holdTimer.current);
    clearTimeout(hintTimer.current);
  }, []);

  if (!isFeature('sosVolumeGesture') || !isFeature('sosLiveLocation')) return null;

  return (
    <div
      className="fixed z-40 pointer-events-none"
      style={{ left: pos.x, top: pos.y }}
    >
      {hint && (
        <div className="pointer-events-none absolute bottom-full right-0 mb-2 text-[9px] leading-tight text-center px-2 py-1 rounded-lg bg-[#241622]/95 border border-red-500/40 text-red-200 shadow-lg w-[140px]">
          VOL+ : double-press<br />or hold 2s =<br />
          <span className="text-red-400 font-bold">auto WA + SMS + call</span>
          <span className="block mt-0.5 text-zinc-300">drag me anywhere</span>
        </div>
      )}
      <button
        type="button"
        disabled={disabled}
        aria-label="Volume Up SOS - drag to reposition; double press or hold 2 seconds to automatically WhatsApp, SMS and call your trusted circle"
        title="Drag to move • Double-press or hold 2s: auto WhatsApp + SMS + call with live location"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={endPointer}
        onPointerCancel={cancelPointer}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            registerRelease();
          }
        }}
        className={`pointer-events-auto relative w-12 h-12 rounded-full bg-gradient-to-br from-red-500 to-rose-600 hover:from-red-400 hover:to-rose-500 text-white shadow-lg shadow-red-950/70 flex items-center justify-center transition-all active:scale-95 select-none touch-none ${
          holding ? 'ring-4 ring-red-400/50 scale-110 animate-pulse' : ''
        } ${dragging ? 'cursor-grabbing scale-110 shadow-2xl ring-2 ring-red-300/60 animate-none' : 'cursor-grab'} ${
          disabled ? 'opacity-40 pointer-events-none' : ''
        }`}
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
        {dragging && (
          <span className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-[8px] font-bold text-red-200 whitespace-nowrap">
            DROP HERE
          </span>
        )}
      </button>
    </div>
  );
}
