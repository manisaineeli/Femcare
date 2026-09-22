import React, { useState, useRef, useEffect } from 'react';
import { useAppState } from '../context/AppStateContext';
import { queryAIKnowledgeBase } from '../data/faqData';
import { evaluateSymptomTriage } from '../utils/aiTriageEngine';
import { 
  Bot, Send, ShieldCheck, AlertTriangle, Sparkles, Activity, Trash2, 
  HelpCircle, CheckCircle2, ChevronRight, X 
} from 'lucide-react';

export default function AIAssistant() {
  const { state, t, addChatMessage, clearChatHistory } = useAppState();
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showTriageModal, setShowTriageModal] = useState(false);
  const [triageResult, setTriageResult] = useState(null);

  // Triage Form State
  const [triagePain, setTriagePain] = useState(4);
  const [triageFlow, setTriageFlow] = useState("medium");
  const [triageFever, setTriageFever] = useState(false);
  const [triageFoulOdor, setTriageFoulOdor] = useState(false);
  const [triageDizzy, setTriageDizzy] = useState(false);

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [state.chatHistory, isTyping]);

  const handleSendMessage = (textToSend) => {
    const text = (textToSend || inputText).trim();
    if (!text) return;

    // Add user message
    addChatMessage({ sender: "user", text });
    if (!textToSend) setInputText("");
    setIsTyping(true);

    // Run offline knowledge base matching (instant zero-server lookup)
    setTimeout(() => {
      const response = queryAIKnowledgeBase(text);
      addChatMessage({
        sender: "femi",
        text: response.answer,
        isEmergency: response.isEmergency,
        lifestyleTip: response.lifestyleTip,
        actionAdvice: response.actionAdvice
      });
      setIsTyping(false);
    }, 450);
  };

  const handleRunTriage = () => {
    const result = evaluateSymptomTriage({
      painScore: triagePain,
      flowIntensity: triageFlow,
      hasFever: triageFever,
      hasFoulOdor: triageFoulOdor,
      hasDizzinessOrFainting: triageDizzy,
      symptomsList: ["cramps", "bloating"]
    });
    setTriageResult(result);
  };

  const quickPrompts = [
    "How to relieve severe period cramps?",
    "Why is my period 5 days late?",
    "Is weight gain before periods normal?",
    "What are common symptoms of PCOS?",
    "What should I eat during the luteal phase?"
  ];

  return (
    <div className="flex flex-col h-[calc(100vh-140px)] pb-16 animate-in fade-in duration-300">
      {/* Header Bar */}
      <div className="flex items-center justify-between pb-3 border-b border-[#31253e]">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#b5497a] via-[#d65d95] to-[#f4a6b9] flex items-center justify-center shadow-lg shadow-[#b5497a]/30">
            <Bot className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h3 className="font-bold text-white text-sm font-['Outfit']">
                Femi AI
              </h3>
              <span className="text-[10px] bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-1.5 py-0.5 rounded-full font-semibold">
                Offline
              </span>
            </div>
            <p className="text-[10px] text-zinc-400">
              Zero cloud logs • 100% Private on device
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          {/* Symptom Triage Tool Button */}
          <button
            onClick={() => {
              setTriageResult(null);
              setShowTriageModal(true);
            }}
            className="flex items-center gap-1 text-xs px-2.5 py-1.5 rounded-xl bg-purple-950/40 text-purple-300 border border-purple-500/30 hover:bg-purple-900/50 active:scale-95 transition-all"
          >
            <Activity className="w-3.5 h-3.5 text-purple-400" />
            <span className="font-semibold text-[11px]">Symptom Triage</span>
          </button>

          {/* Clear Chat */}
          <button
            onClick={clearChatHistory}
            title="Clear Chat History"
            className="p-1.5 rounded-xl bg-[#251d30] text-zinc-400 hover:text-white border border-[#372646]"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto py-3 space-y-3 pr-1">
        {state.chatHistory.map((msg) => {
          const isUser = msg.sender === "user";

          return (
            <div
              key={msg.id}
              className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[85%] rounded-2xl p-3 text-xs leading-relaxed shadow-md ${
                  isUser
                    ? 'bg-gradient-to-r from-[#b5497a] to-[#d65d95] text-white rounded-br-none'
                    : msg.isEmergency
                    ? 'bg-rose-950/80 border-2 border-rose-500 text-rose-100 rounded-bl-none'
                    : 'bg-[#1e1727] border border-[#31253e] text-zinc-200 rounded-bl-none'
                }`}
              >
                {/* Emergency Flag Badge if applicable */}
                {msg.isEmergency && (
                  <div className="flex items-center gap-1.5 text-rose-400 font-bold uppercase tracking-wider mb-2 pb-1.5 border-b border-rose-500/30 text-[11px]">
                    <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />
                    <span>Clinical Red Flag Detected</span>
                  </div>
                )}

                <p className="whitespace-pre-line">{msg.text}</p>

                {msg.lifestyleTip && (
                  <div className="mt-2 pt-2 border-t border-[#31253e]/80 text-[11px] text-pink-200/90 italic flex items-start gap-1">
                    <Sparkles className="w-3 h-3 text-[#f4a6b9] shrink-0 mt-0.5" />
                    <span>Tip: {msg.lifestyleTip}</span>
                  </div>
                )}

                {msg.actionAdvice && (
                  <div className="mt-2 p-2 rounded-lg bg-rose-900/40 text-[11px] font-bold text-rose-300">
                    {msg.actionAdvice}
                  </div>
                )}

                <div className="mt-1 text-[9px] text-zinc-400 text-right">
                  {msg.timestamp}
                </div>
              </div>
            </div>
          );
        })}

        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-[#1e1727] border border-[#31253e] rounded-2xl rounded-bl-none p-3 flex items-center gap-1.5 text-zinc-400 text-xs">
              <span className="w-2 h-2 rounded-full bg-[#f4a6b9] animate-bounce" />
              <span className="w-2 h-2 rounded-full bg-[#f4a6b9] animate-bounce [animation-delay:0.2s]" />
              <span className="w-2 h-2 rounded-full bg-[#f4a6b9] animate-bounce [animation-delay:0.4s]" />
              <span className="text-[11px] ml-1">Femi is formulating guidance...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Quick Prompts Chips */}
      <div className="pt-2 pb-1 overflow-x-auto flex gap-1.5 no-scrollbar">
        {quickPrompts.map((prompt, i) => (
          <button
            key={i}
            onClick={() => handleSendMessage(prompt)}
            className="whitespace-nowrap text-[11px] px-2.5 py-1 rounded-full bg-[#231830] hover:bg-[#2e2040] border border-[#3d2a52] text-zinc-300 hover:text-white transition-all active:scale-95 shrink-0"
          >
            {prompt}
          </button>
        ))}
      </div>

      {/* Message Input Box */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSendMessage();
        }}
        className="pt-2 flex items-center gap-2"
      >
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder={t('ai.askPlaceholder')}
          className="flex-1 bg-[#1e1727] border border-[#31253e] rounded-2xl px-4 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#b5497a]"
        />
        <button
          type="submit"
          disabled={!inputText.trim()}
          className="w-10 h-10 rounded-2xl bg-gradient-to-r from-[#b5497a] to-[#d65d95] text-white flex items-center justify-center shadow-md active:scale-95 disabled:opacity-40 transition-all"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>

      {/* WOW 1: AI Symptom Triage Modal */}
      {showTriageModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="relative w-full max-w-md bg-[#191222] border border-purple-500/40 rounded-2xl p-5 text-zinc-200 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-[#31253e]">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-purple-600/30 flex items-center justify-center">
                  <Activity className="w-4 h-4 text-purple-300" />
                </div>
                <div>
                  <h3 className="font-bold text-white text-sm font-['Outfit']">
                    AI Symptom Triage Analyzer
                  </h3>
                  <p className="text-[10px] text-purple-300">
                    Clinical heuristic assessment • Local & Confidential
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowTriageModal(false)}
                className="p-1 rounded-lg text-zinc-400 hover:text-white bg-[#251b32]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {!triageResult ? (
              <div className="mt-4 space-y-4 text-xs">
                {/* Pain Slider */}
                <div>
                  <div className="flex justify-between font-semibold mb-1">
                    <span>Pelvic Pain Severity:</span>
                    <span className="text-[#f4a6b9] font-bold">{triagePain}/10</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="10"
                    value={triagePain}
                    onChange={(e) => setTriagePain(parseInt(e.target.value))}
                    className="w-full h-2 bg-[#2a1d3a] rounded-lg accent-[#b5497a]"
                  />
                </div>

                {/* Flow Rate */}
                <div>
                  <label className="font-semibold block mb-1">Bleeding Flow Intensity:</label>
                  <select
                    value={triageFlow}
                    onChange={(e) => setTriageFlow(e.target.value)}
                    className="w-full bg-[#231830] border border-[#372646] rounded-xl p-2 text-xs text-white"
                  >
                    <option value="light">Light (Spotting / Normal light)</option>
                    <option value="medium">Medium (Regular 3-4 pads a day)</option>
                    <option value="heavy">Heavy (Frequent pad changes)</option>
                    <option value="soaking_hourly">Critical: Soaking 2+ pads hourly!</option>
                  </select>
                </div>

                {/* Checkbox Red Flags */}
                <div className="space-y-2 pt-1">
                  <label className="font-semibold block text-zinc-300">Associated Symptoms:</label>
                  
                  <label className="flex items-center gap-2 p-2 rounded-xl bg-[#231830] border border-[#372646] cursor-pointer">
                    <input
                      type="checkbox"
                      checked={triageDizzy}
                      onChange={(e) => setTriageDizzy(e.target.checked)}
                      className="accent-rose-500 rounded"
                    />
                    <span>Dizziness, severe lightheadedness, or feeling faint</span>
                  </label>

                  <label className="flex items-center gap-2 p-2 rounded-xl bg-[#231830] border border-[#372646] cursor-pointer">
                    <input
                      type="checkbox"
                      checked={triageFever}
                      onChange={(e) => setTriageFever(e.target.checked)}
                      className="accent-amber-500 rounded"
                    />
                    <span>High fever or body chills</span>
                  </label>

                  <label className="flex items-center gap-2 p-2 rounded-xl bg-[#231830] border border-[#372646] cursor-pointer">
                    <input
                      type="checkbox"
                      checked={triageFoulOdor}
                      onChange={(e) => setTriageFoulOdor(e.target.checked)}
                      className="accent-purple-500 rounded"
                    />
                    <span>Unusual foul-smelling vaginal discharge</span>
                  </label>
                </div>

                <button
                  onClick={handleRunTriage}
                  className="w-full py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-[#b5497a] text-white font-bold text-xs shadow-lg active:scale-98 transition-all"
                >
                  Generate Clinical Triage Report
                </button>
              </div>
            ) : (
              <div className="mt-4 space-y-3 text-xs animate-in fade-in">
                {/* Severity Badge */}
                <div className={`p-3 rounded-xl border ${
                  triageResult.severity === 'CRITICAL' ? 'bg-rose-950/80 border-rose-500 text-rose-200' :
                  triageResult.severity === 'URGENT' ? 'bg-amber-950/80 border-amber-500 text-amber-200' :
                  'bg-emerald-950/80 border-emerald-500 text-emerald-200'
                }`}>
                  <div className="font-bold text-sm uppercase tracking-wider mb-1">
                    Triage Assessment: {triageResult.severity}
                  </div>
                  {triageResult.urgentAction && (
                    <p className="font-bold text-white mt-1">
                      {triageResult.urgentAction}
                    </p>
                  )}
                </div>

                {/* Probable Causes */}
                <div className="p-3 rounded-xl bg-[#231830] border border-[#372646]">
                  <span className="font-bold text-zinc-300 block mb-1">Probable Biological Causes:</span>
                  <ul className="list-disc list-inside space-y-0.5 text-zinc-300">
                    {triageResult.possibleCauses.map((cause, i) => (
                      <li key={i}>{cause}</li>
                    ))}
                  </ul>
                </div>

                {/* Home Remedies */}
                <div className="p-3 rounded-xl bg-[#231830] border border-[#372646]">
                  <span className="font-bold text-zinc-300 block mb-1">Recommended Immediate Care:</span>
                  <ul className="space-y-1 text-zinc-300">
                    {triageResult.homeRemedies.map((rem, i) => (
                      <li key={i} className="flex items-start gap-1">
                        <span className="text-[#f4a6b9]">•</span>
                        <span>{rem}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex gap-2 pt-2">
                  <button
                    onClick={() => setTriageResult(null)}
                    className="flex-1 py-2 rounded-xl bg-[#251d30] text-zinc-300 text-xs font-semibold hover:text-white"
                  >
                    Recalculate
                  </button>
                  <button
                    onClick={() => setShowTriageModal(false)}
                    className="flex-1 py-2 rounded-xl bg-gradient-to-r from-[#b5497a] to-[#d65d95] text-white text-xs font-bold shadow-md"
                  >
                    Done
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
