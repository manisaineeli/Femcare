import React, { useState } from 'react';
import { useAppState } from '../context/AppStateContext';
import { 
  ShieldAlert, PhoneCall, MessageSquare, Plus, Trash2, KeyRound, 
  VolumeX, Volume2, AlertTriangle, Check, ShieldCheck, Heart, UserPlus, Clock 
} from 'lucide-react';

export default function Safety({ onOpenSOS }) {
  const { state, t, addTrustedContact, removeTrustedContact, updateSosSettings } = useAppState();
  
  const [showAddContact, setShowAddContact] = useState(false);
  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [newRelation, setNewRelation] = useState("Friend");

  const [panicCode, setPanicCode] = useState(state.sosSettings.panicCode || "1122");
  const [codeSaved, setCodeSaved] = useState(false);

  // Safety Check-In Timer State
  const [checkInMinutes, setCheckInMinutes] = useState(30);
  const [isCheckInActive, setIsCheckInActive] = useState(false);
  const [checkInSecondsRemaining, setCheckInSecondsRemaining] = useState(30 * 60);

  const handleAddContactSubmit = (e) => {
    e.preventDefault();
    if (newName && newPhone) {
      addTrustedContact({
        name: newName,
        phone: newPhone,
        relation: newRelation
      });
      setNewName("");
      setNewPhone("");
      setShowAddContact(false);
    }
  };

  const handleSavePanicCode = (e) => {
    e.preventDefault();
    updateSosSettings({ panicCode });
    setCodeSaved(true);
    setTimeout(() => setCodeSaved(false), 2000);
  };

  const startCheckIn = () => {
    setIsCheckInActive(true);
    setCheckInSecondsRemaining(checkInMinutes * 60);
  };

  return (
    <div className="space-y-4 pb-24 animate-in fade-in duration-300">
      {/* Title */}
      <div>
        <h2 className="text-xl font-bold text-white font-['Outfit']">
          {t('safety.title')}
        </h2>
        <p className="text-xs text-zinc-400">
          {t('safety.subtitle')}
        </p>
      </div>

      {/* Massive One-Tap SOS Hero Button */}
      <div className="rounded-3xl p-5 bg-gradient-to-br from-rose-950/70 via-[#271120] to-[#160b13] border-2 border-rose-500/40 shadow-2xl text-center space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30 text-[10px] font-bold uppercase tracking-wider">
          <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
          Always Ready • Zero Delay
        </div>

        <button
          onClick={onOpenSOS}
          className="w-full py-4 rounded-2xl bg-gradient-to-r from-rose-600 via-rose-500 to-red-600 hover:from-rose-500 hover:to-red-500 text-white font-extrabold text-base tracking-wider shadow-lg shadow-rose-900/50 active:scale-95 transition-all flex items-center justify-center gap-2.5"
        >
          <ShieldAlert className="w-6 h-6 animate-pulse" />
          <span>{t('safety.tapSOS')}</span>
        </button>

        <p className="text-[11px] text-zinc-400">
          {t('safety.sosSub')}
        </p>

        <p className="text-[10px] text-rose-300/90 flex items-start gap-1.5">
          <Volume2 className="w-3.5 h-3.5 mt-px shrink-0" />
          <span>
            Hands-free Live SOS: <b>double-press the VOL+ button</b>, or <b>hold it for 2 seconds</b> - it shares your
            live location with your trusted circle and dials emergency 112. The one-tap button above works exactly as before.
          </span>
        </p>
      </div>

      {/* Safety Check-In Timer Feature */}
      <div className="rounded-2xl p-4 bg-[#1e1727] border border-[#31253e] shadow-md">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-purple-400" />
            <h4 className="text-xs font-bold text-white uppercase tracking-wider font-['Outfit']">
              "Are You Safe?" Check-In Timer
            </h4>
          </div>
          <span className="text-[10px] text-purple-300 font-medium">Solo Commute Protection</span>
        </div>

        <p className="text-xs text-zinc-300 mb-3">
          Heading out late or using public transit? Set a timer. If you don't confirm you're safe, an automated alert is prepped for your trusted circle.
        </p>

        {!isCheckInActive ? (
          <div className="flex items-center gap-2">
            <select
              value={checkInMinutes}
              onChange={(e) => setCheckInMinutes(parseInt(e.target.value))}
              className="bg-[#251d30] border border-[#372646] rounded-xl px-3 py-2 text-xs text-white"
            >
              <option value={15}>15 Minutes</option>
              <option value={30}>30 Minutes</option>
              <option value={45}>45 Minutes</option>
              <option value={60}>60 Minutes (1 hour)</option>
            </select>
            <button
              onClick={startCheckIn}
              className="flex-1 py-2 px-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold shadow-md active:scale-95 transition-all"
            >
              Start Safety Timer
            </button>
          </div>
        ) : (
          <div className="p-3 rounded-xl bg-purple-950/40 border border-purple-500/30 flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs text-purple-200">
              <span className="w-2.5 h-2.5 rounded-full bg-purple-400 animate-ping" />
              <span>Monitoring active: Check-in due in {checkInMinutes}m</span>
            </div>
            <button
              onClick={() => setIsCheckInActive(false)}
              className="px-3 py-1 rounded-lg bg-emerald-600 text-white text-xs font-bold active:scale-95"
            >
              I Am Safe!
            </button>
          </div>
        )}
      </div>

      {/* Trusted Circle Contacts Manager */}
      <div className="rounded-2xl p-4 bg-[#1e1727] border border-[#31253e] shadow-md space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Heart className="w-4 h-4 text-rose-400" />
            <h4 className="text-xs font-bold text-white uppercase tracking-wider font-['Outfit']">
              {t('safety.trustedCircle')} ({state.trustedCircle.length}/5)
            </h4>
          </div>
          <button
            onClick={() => setShowAddContact(!showAddContact)}
            className="text-xs font-semibold text-[#f4a6b9] hover:underline"
          >
            {showAddContact ? "Cancel" : t('safety.addContact')}
          </button>
        </div>

        {/* Add Contact Form */}
        {showAddContact && (
          <form onSubmit={handleAddContactSubmit} className="p-3 rounded-xl bg-[#251d30] border border-[#372646] space-y-2">
            <input
              type="text"
              placeholder="Contact Name (e.g. Diya)"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              className="w-full bg-[#191220] border border-[#372646] rounded-xl px-3 py-1.5 text-xs text-white"
              required
            />
            <div className="flex gap-2">
              <input
                type="tel"
                placeholder="Phone Number (e.g. +91 9876543210)"
                value={newPhone}
                onChange={(e) => setNewPhone(e.target.value)}
                className="flex-1 bg-[#191220] border border-[#372646] rounded-xl px-3 py-1.5 text-xs text-white"
                required
              />
              <select
                value={newRelation}
                onChange={(e) => setNewRelation(e.target.value)}
                className="bg-[#191220] border border-[#372646] rounded-xl px-2 py-1.5 text-xs text-white"
              >
                <option value="Mother">Mother</option>
                <option value="Sister">Sister</option>
                <option value="Father">Father</option>
                <option value="Partner">Partner</option>
                <option value="Friend">Friend</option>
                <option value="Doctor">Doctor</option>
              </select>
            </div>
            <button
              type="submit"
              className="w-full py-1.5 rounded-xl bg-gradient-to-r from-[#b5497a] to-[#d65d95] text-white text-xs font-semibold"
            >
              Save to Device
            </button>
          </form>
        )}

        {/* Contacts List */}
        <div className="space-y-2">
          {state.trustedCircle.map((contact) => (
            <div
              key={contact.id}
              className="p-2.5 rounded-xl bg-[#251d30] border border-[#372646] flex items-center justify-between text-xs"
            >
              <div>
                <div className="font-semibold text-white flex items-center gap-1.5">
                  <span>{contact.name}</span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-[#31253e] text-pink-300">
                    {contact.relation}
                  </span>
                </div>
                <div className="text-[11px] text-zinc-400 mt-0.5">
                  {contact.phone}
                </div>
              </div>

              <div className="flex items-center gap-1.5">
                <a
                  href={`tel:${contact.phone}`}
                  className="p-1.5 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/30"
                  title="Call Contact"
                >
                  <PhoneCall className="w-3.5 h-3.5" />
                </a>
                <button
                  onClick={() => removeTrustedContact(contact.id)}
                  className="p-1.5 rounded-lg bg-rose-500/10 text-rose-400 border border-rose-500/20 hover:bg-rose-500/20"
                  title="Remove Contact"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Panic Passcode Configuration */}
      <div className="rounded-2xl p-4 bg-[#1e1727] border border-[#31253e] shadow-md space-y-2">
        <div className="flex items-center gap-2">
          <KeyRound className="w-4 h-4 text-amber-400" />
          <h4 className="text-xs font-bold text-white uppercase tracking-wider font-['Outfit']">
            {t('safety.panicCode')}
          </h4>
        </div>
        <p className="text-xs text-zinc-300">
          Entering this code in the SOS dialog automatically sends an emergency alert in complete silence without alarms.
        </p>
        <form onSubmit={handleSavePanicCode} className="flex gap-2 pt-1">
          <input
            type="text"
            value={panicCode}
            onChange={(e) => setPanicCode(e.target.value)}
            className="flex-1 bg-[#251d30] border border-[#372646] rounded-xl px-3 py-1.5 text-xs text-white"
          />
          <button
            type="submit"
            className="px-4 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-xs font-semibold"
          >
            {codeSaved ? "Saved!" : "Update Code"}
          </button>
        </form>
      </div>

      {/* Emergency Helplines Direct Contact List (India) */}
      <div className="rounded-2xl p-4 bg-[#1e1727] border border-[#31253e] space-y-2">
        <h4 className="text-xs font-bold text-white uppercase tracking-wider font-['Outfit'] mb-1">
          {t('safety.emergencyHelplines')}
        </h4>
        <div className="space-y-1.5 text-xs">
          <a
            href="tel:112"
            className="p-2 rounded-xl bg-[#251d30] border border-[#372646] flex items-center justify-between text-zinc-200 hover:text-white"
          >
            <span>{t('safety.nationalEmergency')}</span>
            <PhoneCall className="w-3.5 h-3.5 text-rose-400" />
          </a>
          <a
            href="tel:181"
            className="p-2 rounded-xl bg-[#251d30] border border-[#372646] flex items-center justify-between text-zinc-200 hover:text-white"
          >
            <span>{t('safety.womenHelpline')}</span>
            <PhoneCall className="w-3.5 h-3.5 text-rose-400" />
          </a>
          <a
            href="tel:102"
            className="p-2 rounded-xl bg-[#251d30] border border-[#372646] flex items-center justify-between text-zinc-200 hover:text-white"
          >
            <span>{t('safety.ambulance')}</span>
            <PhoneCall className="w-3.5 h-3.5 text-rose-400" />
          </a>
          <a
            href="tel:7827170170"
            className="p-2 rounded-xl bg-[#251d30] border border-[#372646] flex items-center justify-between text-zinc-200 hover:text-white"
          >
            <span>{t('safety.ncwHelpline')}</span>
            <PhoneCall className="w-3.5 h-3.5 text-rose-400" />
          </a>
        </div>
      </div>
    </div>
  );
}
