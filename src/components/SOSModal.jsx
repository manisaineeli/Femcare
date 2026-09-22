import React, { useState } from 'react';
import { ShieldAlert, PhoneCall, MessageCircle, VolumeX, KeyRound, AlertTriangle, X, Check } from 'lucide-react';
import { useAppState } from '../context/AppStateContext';

export default function SOSModal({ isOpen, onClose }) {
  const { state, t } = useAppState();
  const [passcode, setPasscode] = useState("");
  const [passcodeSuccess, setPasscodeSuccess] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  if (!isOpen) return null;

  const contacts = state.trustedCircle || [];
  const sosMsg = state.sosSettings?.customMessage || "EMERGENCY: I need immediate help. Please check on me!";

  const handleWhatsAppBroadcast = () => {
    const encoded = encodeURIComponent(`${sosMsg} (Sent via FemCare Emergency SOS)`);
    // WhatsApp URL with message
    window.open(`https://wa.me/?text=${encoded}`, '_blank');
  };

  const handleSmsBroadcast = () => {
    const phoneList = contacts.map(c => c.phone.replace(/[^0-9]/g, '')).join(',');
    const encoded = encodeURIComponent(sosMsg);
    window.open(`sms:${phoneList}?body=${encoded}`, '_self');
  };

  const handlePanicSubmit = (e) => {
    e.preventDefault();
    if (passcode === state.sosSettings.panicCode) {
      setPasscodeSuccess(true);
      setTimeout(() => {
        handleWhatsAppBroadcast();
        setPasscodeSuccess(false);
        setPasscode("");
        onClose();
      }, 800);
    } else {
      alert("Invalid panic passcode. Please re-enter.");
      setPasscode("");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 overflow-y-auto">
      <div className="relative w-full max-w-md bg-[#19101b] border-2 border-rose-500/50 rounded-2xl p-5 text-zinc-200 shadow-2xl shadow-rose-900/40 animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-rose-500/20">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-rose-600 flex items-center justify-center shadow-lg shadow-rose-600/40 animate-pulse">
              <ShieldAlert className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-white text-base font-['Outfit']">EMERGENCY SOS</h3>
              <p className="text-[11px] text-rose-300 font-medium">Instant Trusted Circle Broadcast</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-zinc-400 hover:text-white bg-[#2a1727] hover:bg-[#3d1e37]"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Big Alert Banner */}
        <div className="mt-4 p-3 rounded-xl bg-rose-950/40 border border-rose-500/30 text-xs text-rose-200 flex items-start gap-2.5">
          <AlertTriangle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
          <div>
            <span className="font-semibold text-white">One-Tap Alert Broadcast</span>
            <p className="text-[11px] text-rose-300/90 mt-0.5">
              Instantly notifies your <strong>{contacts.length} trusted contacts</strong> via WhatsApp or SMS with your emergency distress notice.
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-4 space-y-2.5">
          <button
            onClick={handleWhatsAppBroadcast}
            className="w-full py-3 px-4 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-sm flex items-center justify-center gap-2.5 shadow-lg shadow-green-900/30 active:scale-98 transition-all"
          >
            <MessageCircle className="w-5 h-5" />
            Broadcast via WhatsApp Now
          </button>

          <button
            onClick={handleSmsBroadcast}
            className="w-full py-2.5 px-4 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-sm flex items-center justify-center gap-2.5 shadow-lg shadow-rose-900/40 active:scale-98 transition-all"
          >
            <ShieldAlert className="w-5 h-5" />
            Send Direct Emergency SMS
          </button>
        </div>

        {/* Emergency Helplines Direct Dial */}
        <div className="mt-5">
          <label className="text-[11px] font-semibold text-zinc-400 uppercase tracking-wider block mb-2">
            Direct Helpline Dial (India)
          </label>
          <div className="grid grid-cols-2 gap-2">
            <a
              href="tel:112"
              className="p-2.5 rounded-xl bg-[#251525] border border-rose-500/30 hover:bg-rose-950/40 flex items-center justify-between text-xs font-semibold text-white transition-all"
            >
              <div className="flex items-center gap-2">
                <PhoneCall className="w-3.5 h-3.5 text-rose-400" />
                <span>112 (Police/Medical)</span>
              </div>
            </a>
            <a
              href="tel:181"
              className="p-2.5 rounded-xl bg-[#251525] border border-rose-500/30 hover:bg-rose-950/40 flex items-center justify-between text-xs font-semibold text-white transition-all"
            >
              <div className="flex items-center gap-2">
                <PhoneCall className="w-3.5 h-3.5 text-rose-400" />
                <span>181 (Women Helpline)</span>
              </div>
            </a>
            <a
              href="tel:102"
              className="p-2.5 rounded-xl bg-[#251525] border border-rose-500/30 hover:bg-rose-950/40 flex items-center justify-between text-xs font-semibold text-white transition-all"
            >
              <div className="flex items-center gap-2">
                <PhoneCall className="w-3.5 h-3.5 text-rose-400" />
                <span>102 (Ambulance)</span>
              </div>
            </a>
            <a
              href="tel:7827170170"
              className="p-2.5 rounded-xl bg-[#251525] border border-rose-500/30 hover:bg-rose-950/40 flex items-center justify-between text-xs font-semibold text-white transition-all"
            >
              <div className="flex items-center gap-2">
                <PhoneCall className="w-3.5 h-3.5 text-rose-400" />
                <span>NCW Helpline</span>
              </div>
            </a>
          </div>
        </div>

        {/* Panic Passcode Section */}
        <div className="mt-5 pt-3 border-t border-rose-500/20">
          <label className="text-xs font-semibold text-zinc-300 flex items-center gap-1.5 mb-1.5">
            <KeyRound className="w-3.5 h-3.5 text-rose-400" />
            <span>Silent Panic Passcode Trigger</span>
          </label>
          <form onSubmit={handlePanicSubmit} className="flex gap-2">
            <input
              type="password"
              placeholder={`Enter code (default: ${state.sosSettings.panicCode})`}
              value={passcode}
              onChange={(e) => setPasscode(e.target.value)}
              className="flex-1 bg-[#251525] border border-rose-500/30 rounded-xl px-3 py-1.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-rose-400"
            />
            <button
              type="submit"
              className="px-3 py-1.5 rounded-xl bg-rose-700 hover:bg-rose-600 text-white text-xs font-semibold active:scale-95 transition-all"
            >
              {passcodeSuccess ? <Check className="w-4 h-4 text-emerald-300" /> : "Trigger"}
            </button>
          </form>
        </div>

        {/* Dismiss */}
        <div className="mt-4 text-center">
          <button
            onClick={onClose}
            className="text-xs text-zinc-400 hover:text-white underline underline-offset-4"
          >
            I am safe now • Close SOS
          </button>
        </div>
      </div>
    </div>
  );
}
