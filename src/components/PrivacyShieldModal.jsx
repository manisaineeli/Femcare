import React, { useState } from 'react';
import { ShieldCheck, Lock, WifiOff, HardDrive, Trash2, CheckCircle2, Copy, X } from 'lucide-react';
import { useAppState } from '../context/AppStateContext';

export default function PrivacyShieldModal({ isOpen, onClose }) {
  const { state, resetAppToDefaults } = useAppState();
  const [copied, setCopied] = useState(false);
  const [showRawJson, setShowRawJson] = useState(false);

  if (!isOpen) return null;

  const handleCopyJson = () => {
    navigator.clipboard.writeText(JSON.stringify(state, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleWipe = () => {
    if (window.confirm("Are you sure you want to permanently erase all locally stored data from this device? This cannot be undone.")) {
      resetAppToDefaults();
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="relative w-full max-w-md bg-[#191222] border border-[#3c2c4d] rounded-2xl p-5 text-zinc-200 shadow-2xl animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#31253e]">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <h3 className="font-bold text-white text-base">Privacy Shield Proof</h3>
              <p className="text-[11px] text-emerald-400 font-medium">Zero-Cloud • Cryptographically Local</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-zinc-400 hover:text-white bg-[#251b32] hover:bg-[#31253e]"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Verification Matrix */}
        <div className="mt-4 space-y-3">
          <div className="p-3 rounded-xl bg-[#231830] border border-[#3d2a52] flex items-start gap-3">
            <WifiOff className="w-5 h-5 text-emerald-400 mt-0.5 shrink-0" />
            <div>
              <div className="text-xs font-semibold text-white">Zero Outgoing Network Traffic</div>
              <p className="text-[11px] text-zinc-400 mt-0.5">
                FemCare AI never transmits cycle dates, symptoms, or chat logs to any remote server or cloud telemetry service.
              </p>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-[#231830] border border-[#3d2a52] flex items-start gap-3">
            <HardDrive className="w-5 h-5 text-purple-400 mt-0.5 shrink-0" />
            <div>
              <div className="text-xs font-semibold text-white">Browser Sandboxed LocalStorage</div>
              <p className="text-[11px] text-zinc-400 mt-0.5">
                Key: <code className="text-[10px] bg-[#120e17] px-1.5 py-0.5 rounded text-pink-300">femcare_state_v1</code>. Restricted entirely to your local device sandbox.
              </p>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-[#231830] border border-[#3d2a52] flex items-start gap-3">
            <Lock className="w-5 h-5 text-amber-400 mt-0.5 shrink-0" />
            <div>
              <div className="text-xs font-semibold text-white">No Tracking Cookies & No Login Required</div>
              <p className="text-[11px] text-zinc-400 mt-0.5">
                No email, phone number, or biometric ID required. You are 100% anonymous.
              </p>
            </div>
          </div>
        </div>

        {/* Toggle Local State JSON Inspector */}
        <div className="mt-4">
          <button
            onClick={() => setShowRawJson(!showRawJson)}
            className="w-full text-xs text-zinc-400 hover:text-zinc-200 py-1.5 text-center font-medium underline underline-offset-2"
          >
            {showRawJson ? "Hide Raw Local JSON Data" : "Inspect Raw Local Data in Storage"}
          </button>

          {showRawJson && (
            <div className="mt-2 relative">
              <pre className="text-[10px] bg-[#0f0b14] p-3 rounded-lg border border-[#31253e] text-pink-200/90 max-h-40 overflow-y-auto font-mono">
                {JSON.stringify(state, null, 2)}
              </pre>
              <button
                onClick={handleCopyJson}
                className="absolute top-2 right-2 flex items-center gap-1 text-[10px] px-2 py-1 rounded bg-[#251b32] text-zinc-300 border border-[#3d2a52] hover:bg-[#31253e]"
              >
                {copied ? <CheckCircle2 className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                {copied ? "Copied" : "Copy"}
              </button>
            </div>
          )}
        </div>

        {/* Wipe Data Button */}
        <div className="mt-5 pt-3 border-t border-[#31253e] flex items-center justify-between">
          <button
            onClick={handleWipe}
            className="flex items-center gap-1.5 text-xs text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 px-2.5 py-1.5 rounded-lg border border-rose-500/20 transition-all"
          >
            <Trash2 className="w-3.5 h-3.5" />
            Wipe All Data Forever
          </button>
          <button
            onClick={onClose}
            className="text-xs font-semibold px-4 py-1.5 rounded-lg bg-gradient-to-r from-[#b5497a] to-[#d65d95] text-white hover:opacity-95 shadow-md shadow-[#b5497a]/30"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
