import React, { useState } from 'react';
import { useAppState } from '../context/AppStateContext';
import { 
  PenLine, Mic, MicOff, Sparkles, Calendar, Heart, 
  Trash2, Plus, Check 
} from 'lucide-react';

export default function Journal() {
  const { state, cycleStatus, addJournalEntry } = useAppState();
  const [content, setContent] = useState("");
  const [mood, setMood] = useState("Calm & Grounded");
  const [isListening, setIsListening] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const moodOptions = [
    { label: "Calm & Grounded", emoji: "🌿" },
    { label: "Energetic & Focused", emoji: "⚡" },
    { label: "Sensitive & Reflective", emoji: "🌸" },
    { label: "Fatigued & Restful", emoji: "🌙" },
    { label: "Irritated / PMS", emoji: "🔥" }
  ];

  const handleVoiceInput = () => {
    // Check Web Speech API support
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Speech recognition is not supported in this browser. Please type your thoughts.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-IN';

    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);
    recognition.onerror = () => setIsListening(false);

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setContent(prev => prev ? `${prev} ${transcript}` : transcript);
      setIsListening(false);
    };

    recognition.start();
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (!content.trim()) return;

    addJournalEntry({
      mood,
      content,
      cycleDay: cycleStatus.dayOfCycle,
      phase: cycleStatus.phaseKey
    });

    setContent("");
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2000);
  };

  return (
    <div className="space-y-4 pb-24 animate-in fade-in duration-300">
      {/* Title */}
      <div>
        <h2 className="text-xl font-bold text-white font-['Outfit']">
          AI Period Journal & Mood Logger
        </h2>
        <p className="text-xs text-zinc-400">
          Reflect privately. AI extracts patterns and correlations with your cycle.
        </p>
      </div>

      {/* Write Entry Box */}
      <form onSubmit={handleSave} className="rounded-2xl p-4 bg-[#1e1727] border border-[#31253e] shadow-md space-y-3">
        <div>
          <label className="text-xs font-semibold text-zinc-300 block mb-1.5">
            How are you feeling right now?
          </label>
          <div className="flex gap-1.5 overflow-x-auto pb-1 no-scrollbar">
            {moodOptions.map((m) => (
              <button
                key={m.label}
                type="button"
                onClick={() => setMood(m.label)}
                className={`whitespace-nowrap px-2.5 py-1 rounded-xl text-xs font-medium border transition-all ${
                  mood === m.label
                    ? 'bg-[#b5497a] border-[#f4a6b9] text-white shadow-sm'
                    : 'bg-[#251d30] border-[#372646] text-zinc-300 hover:text-white'
                }`}
              >
                <span className="mr-1">{m.emoji}</span>
                <span>{m.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="relative">
          <textarea
            rows={4}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write freely or tap the mic for voice entry. E.g. 'Felt mild cramps in the afternoon, but ginger tea helped...'"
            className="w-full bg-[#251d30] border border-[#372646] rounded-xl p-3 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#b5497a]"
          />
          <button
            type="button"
            onClick={handleVoiceInput}
            title={isListening ? "Listening..." : "Tap for voice note"}
            className={`absolute right-2.5 bottom-3 p-2 rounded-xl text-xs font-semibold transition-all ${
              isListening
                ? 'bg-rose-600 text-white animate-pulse'
                : 'bg-[#191220] text-zinc-400 hover:text-white border border-[#372646]'
            }`}
          >
            {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
          </button>
        </div>

        <div className="flex items-center justify-between pt-1">
          <span className="text-[11px] text-zinc-400">
            Recorded at Day {cycleStatus.dayOfCycle} ({cycleStatus.phaseKey})
          </span>
          <button
            type="submit"
            disabled={!content.trim()}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#b5497a] to-[#d65d95] text-white text-xs font-bold shadow-md active:scale-95 disabled:opacity-40 transition-all flex items-center gap-1.5"
          >
            {savedSuccess ? <Check className="w-3.5 h-3.5" /> : <PenLine className="w-3.5 h-3.5" />}
            <span>{savedSuccess ? "Saved to Device!" : "Save Entry"}</span>
          </button>
        </div>
      </form>

      {/* Previous Entries Timeline */}
      <div className="space-y-2.5">
        <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-wider">
          Past Journal Entries ({state.journalEntries.length})
        </h3>

        {state.journalEntries.map((entry) => (
          <div
            key={entry.id}
            className="rounded-2xl p-3.5 bg-[#1e1727] border border-[#31253e] space-y-1.5 text-xs shadow-sm"
          >
            <div className="flex items-center justify-between">
              <span className="font-semibold text-pink-300">
                {entry.mood}
              </span>
              <span className="text-[10px] text-zinc-400">
                {entry.date}
              </span>
            </div>
            <p className="text-zinc-200 leading-relaxed">
              "{entry.content}"
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
