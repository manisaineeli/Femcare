import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  ShieldAlert, MapPin, PhoneCall, MessageCircle, MessageSquare,
  Copy, Check, AlertTriangle, Users, X,
} from 'lucide-react';
import { useAppState } from '../context/AppStateContext';
import { isFeature } from '../config/features';
import {
  getCurrentLocation, buildSosMessage, whatsappShareLink, whatsappDirectLink,
  whatsappTargets, smsLink, dialNumber, openViaIframe, copyText,
} from '../utils/sosLiveLocation';
import { showSystemNotification } from '../utils/notifications';

// Full-screen Live SOS: grabs geolocation, then AUTOMATICALLY
//   1. opens WhatsApp chat(s) to the trusted circle with the live location,
//   2. prepares the emergency SMS to every trusted contact (hidden iframe —
//      never popup-blocked, so it fires even after the async GPS wait),
//   3. raises an OS-level notification,
//   4. opens the dialer for the first trusted contact (112 if none saved).
// Triggered by the Volume-Up gesture (double press / 2-second hold).
export default function SosLiveOverlay({ isOpen, source = 'emergency SOS', onClose }) {
  const { state } = useAppState();
  const [loc, setLoc] = useState(null);
  const [log, setLog] = useState([]);
  const [copied, setCopied] = useState(false);
  const firedRef = useRef(false);
  const stoppedRef = useRef(false);
  const dialTimerRef = useRef(null);

  const contacts = state.trustedCircle || [];
  const name = state.userProfile?.name || '';

  const addLog = (line) => setLog((prev) => [...prev, line]);

  // Message always tracks the newest location so re-sends carry a fresh pin.
  const msg = useMemo(
    () => buildSosMessage({ name, loc, custom: state.sosSettings?.customMessage, source }),
    [name, loc, state.sosSettings?.customMessage, source]
  );

  const runBroadcast = (locArg) => {
    const m = buildSosMessage({
      name, loc: locArg, custom: state.sosSettings?.customMessage, source,
    });
    const phones = contacts.map((c) => c.phone).filter(Boolean);
    const primary = contacts[0];

    // ── 1) WHATSAPP: one direct chat per trusted contact, pre-filled ──
    if (isFeature('sosAutoAlertCircle')) {
      const urls = whatsappTargets(contacts, m);
      let opened = 0;
      let blocked = false;
      for (let i = 0; i < urls.length; i++) {
        const win = window.open(urls[i], '_blank');
        if (win) opened += 1;
        else { blocked = true; break; }
      }
      if (opened > 0 && contacts.length === 0) {
        addLog('WhatsApp share opened with your live location - pick a contact and hit send.');
      } else if (opened === contacts.length && contacts.length > 0) {
        addLog(`WhatsApp opened for all ${contacts.length} trusted contacts - hit send in each chat.`);
      } else if (opened > 0) {
        addLog(`WhatsApp opened for ${opened}/${contacts.length} contact(s) - tap WA below for the rest.`);
      }
      if (blocked) {
        addLog('Browser blocked the extra WhatsApp popups - tap the green WA buttons below (one tap each).');
      }
      if (contacts.length === 0) {
        addLog('No trusted contacts saved yet - add them in Safety for direct alerts.');
      }
    }

    // ── 2) EMERGENCY SMS to the whole circle (never popup-blocked) ──
    if (isFeature('sosAutoAlertCircle') && phones.length) {
      openViaIframe(smsLink(phones, m));
      addLog(`Emergency SMS to ${phones.length} trusted contact(s) prepared automatically - tap send.`);
    }

    // ── 3) OS-level notification so the device itself flags the SOS ──
    try {
      showSystemNotification('FemCare SOS ACTIVE', {
        body: phones.length
          ? `Live location alert prepared for ${phones.length} trusted contact(s).`
          : 'Live location SOS started - add trusted contacts in Safety.',
        tag: 'femcare-sos',
      });
    } catch { /* notifications optional */ }

    // ── 4) AUTO-CALL: dialer opens for the first trusted contact ──
    if (isFeature('sosAutoDialPrimaryContact') && primary) {
      addLog(`Auto-dialing ${primary.name} in 1.5s (tap STOP if this is a test)...`);
      dialTimerRef.current = setTimeout(() => {
        if (stoppedRef.current) return;
        dialNumber(primary.phone);
        addLog(`Dialer opened for ${primary.name} (${primary.relation}) - press call.`);
      }, 1500);
    } else if (isFeature('sosEmergencyAutoDial')) {
      addLog('Emergency call to 112 dialing in 1.5s (tap STOP if this is a test)...');
      dialTimerRef.current = setTimeout(() => {
        if (stoppedRef.current) return;
        addLog('Dialing 112 now.');
        dialNumber('112');
      }, 1500);
    }
  };

  // Opened: start one-shot location, keep a live watch, auto-broadcast once.
  useEffect(() => {
    if (!isOpen) {
      firedRef.current = false;
      stoppedRef.current = false;
      setLoc(null);
      setLog([]);
      setCopied(false);
      return undefined;
    }
    addLog(`SOS triggered by ${source}. Locating you...`);
    let cancelled = false;
    let watchId = null;

    (async () => {
      // Fast first fix (5s) so the WhatsApp window.open still lands inside
      // the browser's ~5s user-gesture window and is NOT popup-blocked.
      const pos = await getCurrentLocation({ timeout: 5000 });
      if (cancelled || stoppedRef.current) return;
      setLoc(pos);
      addLog(pos.ok ? `Live location locked (+/-${pos.accuracy} m).` : `Location unavailable: ${pos.error}`);
      if (!firedRef.current) {
        firedRef.current = true;
        runBroadcast(pos);
      }
    })();

    if ('geolocation' in navigator) {
      watchId = navigator.geolocation.watchPosition(
        (p) => {
          if (cancelled || stoppedRef.current) return;
          setLoc({
            ok: true,
            lat: p.coords.latitude,
            lng: p.coords.longitude,
            accuracy: Math.round(p.coords.accuracy || 0),
            link: `https://maps.google.com/?q=${p.coords.latitude},${p.coords.longitude}`,
            live: true,
          });
        },
        () => {},
        { enableHighAccuracy: true, maximumAge: 4000, timeout: 15000 }
      );
    }

    return () => {
      cancelled = true;
      if (watchId != null) navigator.geolocation.clearWatch(watchId);
      if (dialTimerRef.current) clearTimeout(dialTimerRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  const handleStop = () => {
    stoppedRef.current = true;
    if (dialTimerRef.current) clearTimeout(dialTimerRef.current);
    onClose?.();
  };

  const handleCopy = async () => {
    const ok = await copyText(msg);
    setCopied(ok);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!isOpen || !isFeature('sosLiveLocation')) return null;

  return (
    <div className="fixed inset-0 z-[60] overflow-y-auto bg-black/92 backdrop-blur-sm p-4 flex items-start justify-center">
      <div className="w-full max-w-md my-auto rounded-3xl border-2 border-red-500/60 bg-[#180c11] shadow-2xl shadow-red-950/60 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-red-600 via-rose-600 to-red-700 px-5 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-white" />
            </span>
            <div>
              <p className="text-white font-extrabold tracking-widest text-sm">LIVE SOS ACTIVE</p>
              <p className="text-white/85 text-[10px] capitalize">Triggered by {source}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-6 h-6 text-white" />
            <button
              onClick={handleStop}
              aria-label="Stop SOS"
              className="w-7 h-7 rounded-full bg-black/25 hover:bg-black/45 flex items-center justify-center transition-colors"
            >
              <X className="w-4 h-4 text-white" />
            </button>
          </div>
        </div>

        <div className="p-4 space-y-3.5">
          {/* Live location */}
          <div className="rounded-2xl bg-[#22121a] border border-red-500/30 p-3.5">
            <div className="flex items-center justify-between mb-1.5">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-red-400" />
                <span className="text-[11px] font-bold text-white uppercase tracking-wider">
                  {loc?.ok ? 'Live Location' : 'Getting Location'}
                </span>
              </div>
              {loc?.ok && (
                <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-red-500/25 text-red-300 border border-red-500/40 animate-pulse">
                  LIVE
                </span>
              )}
            </div>
            {loc?.ok ? (
              <a
                href={loc.link}
                target="_blank"
                rel="noreferrer"
                className="block text-xs text-rose-300 hover:text-rose-200 underline underline-offset-2 break-all"
              >
                {loc.lat.toFixed(5)}, {loc.lng.toFixed(5)} (+/-{loc.accuracy} m) - tap to open map
              </a>
            ) : (
              <p className="text-xs text-zinc-400">
                {loc?.error || 'Waiting for GPS fix - keep location ON for the fastest alert.'}
              </p>
            )}
          </div>

          {/* Status log */}
          {log.length > 0 && (
            <div className="rounded-2xl bg-[#1c1119] border border-[#3b2431] p-3 space-y-1.5 max-h-28 overflow-y-auto">
              {log.map((line, i) => (
                <p key={i} className="text-[11px] text-zinc-300 flex items-start gap-1.5">
                  <AlertTriangle className="w-3 h-3 text-amber-400 mt-0.5 shrink-0" />
                  {line}
                </p>
              ))}
            </div>
          )}

          {/* Trusted circle */}
          <div className="rounded-2xl bg-[#1c1119] border border-[#3b2431] p-3.5">
            <div className="flex items-center gap-2 mb-2.5">
              <Users className="w-4 h-4 text-rose-400" />
              <span className="text-[11px] font-bold text-white uppercase tracking-wider">
                Trusted Circle ({contacts.length})
              </span>
            </div>
            {contacts.length === 0 ? (
              <p className="text-xs text-zinc-400">
                No contacts yet. The WhatsApp/SMS share below still works - and add contacts from the Safety tab.
              </p>
            ) : (
              <div className="space-y-2">
                {contacts.map((c) => (
                  <div
                    key={c.id}
                    className="flex items-center justify-between gap-2 bg-[#241622] rounded-xl px-3 py-2"
                  >
                    <div className="min-w-0">
                      <p className="text-xs font-semibold text-white truncate">{c.name}</p>
                      <p className="text-[10px] text-zinc-500">{c.relation}</p>
                    </div>
                    <div className="flex items-center gap-1.5 shrink-0">
                      <a
                        href={whatsappDirectLink(c.phone, msg)}
                        target="_blank"
                        rel="noreferrer"
                        className="px-2 py-1.5 rounded-lg bg-green-600/85 hover:bg-green-500 text-white text-[10px] font-bold flex items-center gap-1 transition-colors"
                      >
                        <MessageCircle className="w-3 h-3" /> WA
                      </a>
                      <a
                        href={`tel:${String(c.phone).replace(/[^0-9+]/g, '')}`}
                        className="px-2 py-1.5 rounded-lg bg-rose-600/85 hover:bg-rose-500 text-white text-[10px] font-bold flex items-center gap-1 transition-colors"
                      >
                        <PhoneCall className="w-3 h-3" /> Call
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Primary actions */}
          <div className="grid grid-cols-2 gap-2">
            <a
              href={whatsappShareLink(msg)}
              target="_blank"
              rel="noreferrer"
              className="col-span-1 py-3 rounded-2xl bg-green-600 hover:bg-green-500 text-white text-xs font-bold flex items-center justify-center gap-2 transition-colors"
            >
              <MessageCircle className="w-4 h-4" /> WhatsApp
            </a>
            <a
              href={smsLink(contacts.map((c) => c.phone), msg)}
              className="col-span-1 py-3 rounded-2xl bg-[#31507e] hover:bg-[#3d6097] text-white text-xs font-bold flex items-center justify-center gap-2 transition-colors"
            >
              <MessageSquare className="w-4 h-4" /> SMS all
            </a>
            <a
              href="tel:112"
              className="col-span-2 py-4 rounded-2xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-extrabold text-sm tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-red-950/60 transition-all active:scale-95"
            >
              <PhoneCall className="w-5 h-5" /> CALL 112 EMERGENCY
            </a>
            <a
              href="tel:108"
              className="py-2.5 rounded-2xl bg-[#251525] border border-rose-500/30 hover:bg-rose-950/40 text-white text-[11px] font-semibold flex items-center justify-center gap-1.5 transition-colors"
            >
              <PhoneCall className="w-3.5 h-3.5" /> 108 Ambulance
            </a>
            <a
              href="tel:181"
              className="py-2.5 rounded-2xl bg-[#251525] border border-rose-500/30 hover:bg-rose-950/40 text-white text-[11px] font-semibold flex items-center justify-center gap-1.5 transition-colors"
            >
              <PhoneCall className="w-3.5 h-3.5" /> 181 Women Helpline
            </a>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => runBroadcast(loc)}
              className="py-2.5 rounded-2xl bg-[#241622] border border-[#4a3350] hover:border-rose-500/50 text-zinc-200 text-[11px] font-semibold transition-colors"
            >
              Resend with latest location
            </button>
            <button
              onClick={handleCopy}
              className="py-2.5 rounded-2xl bg-[#241622] border border-[#4a3350] hover:border-rose-500/50 text-zinc-200 text-[11px] font-semibold flex items-center justify-center gap-1.5 transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
              {copied ? 'Copied!' : 'Copy my location'}
            </button>
          </div>

          {/* Stop */}
          <button
            onClick={handleStop}
            className="w-full py-3.5 rounded-2xl bg-[#1c1119] border border-zinc-600 hover:border-zinc-400 text-zinc-300 text-xs font-bold uppercase tracking-wider transition-colors"
          >
            I&apos;m safe - stop SOS
          </button>
        </div>
      </div>
    </div>
  );
}
