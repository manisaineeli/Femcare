import React, { useState, useRef, useEffect } from 'react';
import { useAppState } from '../context/AppStateContext';
import { FAQ_DATABASE, queryAIKnowledgeBase } from '../data/faqData';
import { evaluateSymptomTriage } from '../utils/aiTriageEngine';
import { isFeature } from '../config/features';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Bot, Send, AlertTriangle, Sparkles, Activity, Trash2, X,
  Droplet, Flower2, ShieldCheck, Dna, Baby, Salad, Stethoscope, ChevronDown,
} from 'lucide-react';

// ---------------- Topic explorer model (built from the live knowledge base) ----
const TOPIC_GROUPS = [
  { id: 'cycle', label: 'Cycle & Cramps', icon: Droplet, cats: ['cycle_basics', 'cramps', 'pain', 'late_period', 'bloating', 'heavy_bleeding', 'blood_color', 'ovulation', 'period_tracking', 'emergency_selfcare'] },
  { id: 'body', label: 'Body & Anatomy', icon: Flower2, cats: ['anatomy', 'pelvic_floor', 'breast', 'urinary', 'digestive', 'musculoskeletal', 'neurological', 'cardiovascular', 'endocrine'] },
  { id: 'puberty', label: 'Puberty & Teens', icon: Flower2, cats: ['puberty'] },
  { id: 'infection', label: 'Infections & Hygiene', icon: ShieldCheck, cats: ['infection', 'discharge', 'hygiene', 'hygiene_products', 'stis'] },
  { id: 'hormones', label: 'Hormones & Conditions', icon: Dna, cats: ['pcos', 'thyroid', 'endometriosis', 'fibroids', 'anemia'] },
  { id: 'life', label: 'Pregnancy & Life Stages', icon: Baby, cats: ['pregnancy', 'fertility', 'contraception', 'postpartum', 'menopause', 'partner_support'] },
  { id: 'food', label: 'Diet & Fitness', icon: Salad, cats: ['diet', 'exercise', 'fitness'] },
  { id: 'glow', label: 'Skin, Hair & Mood', icon: Sparkles, cats: ['skin', 'hair', 'nails', 'mental_pms', 'mental_health', 'myths'] },
  { id: 'check', label: 'Screening & Safety', icon: Stethoscope, cats: ['screening', 'cancer', 'sexual_health'] },
];

const GROUPS = TOPIC_GROUPS
  .map((g) => ({ ...g, entries: FAQ_DATABASE.filter((e) => g.cats.includes(e.category)) }))
  .filter((g) => g.entries.length > 0);
const TOTAL_TOPICS = FAQ_DATABASE.length;

const STARTERS = [
  'What is the uterus?',
  'Why is my period late?',
  'Is white discharge normal?',
];

const CONFIDENCE_STYLE = {
  high: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
  medium: 'bg-amber-500/15 text-amber-400 border-amber-500/30',
  low: 'bg-zinc-500/15 text-zinc-400 border-zinc-500/30',
};

export default function AIAssistant() {
  const { state, t, addChatMessage, clearChatHistory } = useAppState();
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showTriageModal, setShowTriageModal] = useState(false);
  const [triageResult, setTriageResult] = useState(null);
  const [openGroup, setOpenGroup] = useState(null);
  const [showAllInGroup, setShowAllInGroup] = useState(false);

  // Triage Form State
  const [triagePain, setTriagePain] = useState(4);
  const [triageFlow, setTriageFlow] = useState('medium');
  const [triageFever, setTriageFever] = useState(false);
  const [triageFoulOdor, setTriageFoulOdor] = useState(false);
  const [triageDizzy, setTriageDizzy] = useState(false);

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Big auto-growing chat box: grows with the message up to 6 lines, never
  // clipped by the pop-up dock (container reserves clearance below).
  const autoGrowInput = () => {
    const el = inputRef.current;
    if (!el) return;
    const prevHeight = el.offsetHeight;
    el.style.height = 'auto';
    const next = Math.min(el.scrollHeight + 2, 168);
    el.style.height = `${next}px`;
    if (next > prevHeight) scrollToBottom();
  };

  useEffect(() => {
    autoGrowInput();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputText]);

  // Enter sends, Shift+Enter adds a new line
  const handleInputKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [state.chatHistory, isTyping]);

  const handleSendMessage = (textToSend) => {
    const text = (textToSend || inputText).trim();
    if (!text) return;

    // Add user message
    addChatMessage({ sender: 'user', text });
    if (!textToSend) setInputText('');
    setIsTyping(true);

    // Run offline knowledge base matching (instant zero-server lookup)
    setTimeout(() => {
      const response = queryAIKnowledgeBase(text);
      addChatMessage({
        sender: 'femi',
        text: response.answer,
        isEmergency: response.isEmergency,
        lifestyleTip: response.lifestyleTip,
        actionAdvice: response.actionAdvice,
        suggestedTopics: response.suggestedTopics,
        confidence: response.confidence,
        question: response.question
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
      symptomsList: ['cramps', 'bloating'],
    });
    setTriageResult(result);
  };

  const quickPrompts = [
    'How to relieve severe period cramps?',
    'Why is my period 5 days late?',
    'Is weight gain before periods normal?',
    'What are common symptoms of PCOS?',
    'What should I eat during the luteal phase?',
  ];

  const chatIsEmpty = state.chatHistory.length === 0;

  const openTopicGroup = (id) => {
    setShowAllInGroup(false);
    setOpenGroup((prev) => (prev === id ? null : id));
  };

  const askGroupEntry = (question) => {
    setOpenGroup(null);
    handleSendMessage(question);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-140px)] pb-[108px] animate-in fade-in duration-300">
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
              {TOTAL_TOPICS} topics &middot; zero cloud logs &middot; 100% on device
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
        {/* ---------- Welcome hero + topic explorer (empty state) ---------- */}
        {chatIsEmpty && (
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="rounded-3xl border border-[#31253e] bg-gradient-to-b from-[#1e1727] to-[#160f1f] p-4 text-center"
          >
            {/* Animated Femi orb */}
            <div className="relative w-20 h-20 mx-auto mb-3">
              <motion.div
                className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#b5497a]/50 to-[#f4a6b9]/50 blur-xl"
                animate={{ scale: [1, 1.18, 1], opacity: [0.55, 1, 0.55] }}
                transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
              />
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-dashed border-[#f4a6b9]/45"
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 14, ease: 'linear' }}
              >
                <span className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-[#f4a6b9] shadow-[0_0_8px_#f4a6b9]" />
              </motion.div>
              <motion.div
                className="absolute inset-3 rounded-full bg-gradient-to-br from-[#b5497a] to-[#d65d95] flex items-center justify-center shadow-lg shadow-[#b5497a]/50"
                animate={{ scale: [1, 1.07, 1] }}
                transition={{ repeat: Infinity, duration: 2.2, ease: 'easeInOut' }}
              >
                <Bot className="w-7 h-7 text-white" />
              </motion.div>
            </div>

            <h2 className="text-base font-bold text-white font-['Outfit']">
              {state.userProfile?.name ? `Hi ${state.userProfile.name}, I'm Femi` : "Hi, I'm Femi"}
            </h2>
            <p className="text-[11px] text-zinc-400 mt-1 leading-relaxed">
              Ask me anything about the <b className="text-rose-300">whole female body</b> - periods, pain,
              anatomy, hormones, infections, pregnancy, skin, mood and more.
              Every answer is computed right here on your device.
            </p>

            {/* Starter chips */}
            <div className="flex flex-wrap justify-center gap-1.5 mt-3">
              {STARTERS.map((s) => (
                <motion.button
                  key={s}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.25 }}
                  onClick={() => handleSendMessage(s)}
                  className="text-[10px] px-2.5 py-1 rounded-full bg-[#231830] border border-[#3d2a52] text-zinc-300 hover:border-[#b5497a] hover:text-white active:scale-95 transition-all"
                >
                  {s}
                </motion.button>
              ))}
            </div>

            {/* ---------- Topic explorer grid ---------- */}
            {isFeature('femiTopicExplorer') && (
              <div className="mt-4 text-left">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">
                    Explore the female body
                  </span>
                  <span className="text-[9px] text-zinc-600">{TOTAL_TOPICS} topics</span>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  {GROUPS.map((g, i) => {
                    const Icon = g.icon;
                    const isOpen = openGroup === g.id;
                    return (
                      <motion.button
                        key={g.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 + i * 0.05 }}
                        onClick={() => openTopicGroup(g.id)}
                        className={`rounded-xl p-2 flex flex-col items-center gap-1 transition-all active:scale-95 border ${
                          isOpen
                            ? 'bg-[#b5497a]/20 border-[#b5497a] text-white'
                            : 'bg-[#1e1727] border-[#31253e] text-zinc-300 hover:border-[#b5497a]/60'
                        }`}
                      >
                        <Icon className="w-4 h-4 text-[#f4a6b9]" />
                        <span className="text-[9px] font-semibold leading-tight text-center">{g.label}</span>
                        <span className="text-[8px] text-zinc-500">{g.entries.length}</span>
                      </motion.button>
                    );
                  })}
                </div>

                {/* Expanded question list */}
                <AnimatePresence mode="wait">
                  {openGroup && (
                    <motion.div
                      key={openGroup}
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.28 }}
                      className="overflow-hidden"
                    >
                      <div className="mt-2 rounded-xl border border-[#b5497a]/40 bg-[#160f1f] p-2 space-y-1">
                        {(showAllInGroup
                          ? GROUPS.find((g) => g.id === openGroup).entries
                          : GROUPS.find((g) => g.id === openGroup).entries.slice(0, 8)
                        ).map((entry) => (
                          <button
                            key={entry.id}
                            onClick={() => askGroupEntry(entry.question)}
                            className="w-full text-left text-[11px] px-2.5 py-1.5 rounded-lg bg-[#231830] hover:bg-[#2e2040] border border-transparent hover:border-[#3d2a52] text-zinc-300 hover:text-white transition-all active:scale-[0.98]"
                          >
                            {entry.question}
                          </button>
                        ))}
                        {GROUPS.find((g) => g.id === openGroup).entries.length > 8 && (
                          <button
                            onClick={() => setShowAllInGroup((v) => !v)}
                            className="w-full text-[10px] py-1.5 text-rose-300 hover:text-rose-200 font-semibold flex items-center justify-center gap-1"
                          >
                            {showAllInGroup
                              ? 'Show less'
                              : `Show ${GROUPS.find((g) => g.id === openGroup).entries.length - 8} more`}
                            <ChevronDown className={`w-3 h-3 transition-transform ${showAllInGroup ? 'rotate-180' : ''}`} />
                          </button>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}
          </motion.div>
        )}

        {/* ---------- Chat messages ---------- */}
        {state.chatHistory.map((msg) => {
          const isUser = msg.sender === 'user';

          return (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 12, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ type: 'spring', stiffness: 320, damping: 26 }}
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

                {/* Which knowledge entry answered */}
                {!isUser && msg.question && (
                  <div className="text-[9px] text-zinc-500 italic mb-1">
                    Re: {msg.question}
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

                {/* One-tap emergency dialing on red-flag answers */}
                {msg.isEmergency && (
                  <div className="flex gap-2 mt-2">
                    <a
                      href="tel:112"
                      className="flex-1 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-500 text-white text-[10px] font-bold text-center transition-colors active:scale-95"
                    >
                      Call 112
                    </a>
                    <a
                      href="tel:108"
                      className="flex-1 py-1.5 rounded-lg bg-[#251525] border border-rose-500/40 hover:bg-rose-950/50 text-rose-200 text-[10px] font-bold text-center transition-colors active:scale-95"
                    >
                      Call 108
                    </a>
                  </div>
                )}

                {/* Confidence + timestamp row */}
                <div className="mt-1.5 flex items-center justify-between gap-2">
                  <span className="text-[9px]">
                    {msg.sender === 'femi' && msg.confidence && (
                      <span
                        className={`px-1.5 py-0.5 rounded-full border font-semibold uppercase tracking-wide ${
                          CONFIDENCE_STYLE[msg.confidence] || CONFIDENCE_STYLE.low
                        }`}
                      >
                        {msg.confidence} match
                      </span>
                    )}
                  </span>
                  <span className="text-[9px] text-zinc-400">{msg.timestamp}</span>
                </div>

                {/* Clickable follow-up suggestions under Femi's reply */}
                {Array.isArray(msg.suggestedTopics) && msg.suggestedTopics.length > 0 && !msg.isEmergency && (
                  <div className="flex flex-wrap gap-1.5 mt-2 pt-2 border-t border-[#31253e]/80">
                    {msg.suggestedTopics.map((s, i) => (
                      <motion.button
                        key={`${msg.id}-sug-${i}`}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.08 * i }}
                        onClick={() => handleSendMessage(s)}
                        className="text-[10px] px-2 py-1 rounded-full border border-rose-500/40 bg-rose-950/40 text-rose-200 hover:bg-rose-900/50 hover:text-white active:scale-95 transition-all text-left"
                      >
                        {s}
                      </motion.button>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          );
        })}

        {/* Richer typing indicator */}
        {isTyping && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-start"
          >
            <div className="bg-[#1e1727] border border-[#31253e] rounded-2xl rounded-bl-none p-3 flex items-center gap-2.5">
              <div className="relative w-6 h-6">
                <motion.div
                  className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#b5497a] to-[#f4a6b9]"
                  animate={{ scale: [1, 1.15, 1], opacity: [0.7, 1, 0.7] }}
                  transition={{ repeat: Infinity, duration: 1.1 }}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Bot className="w-3.5 h-3.5 text-white" />
                </div>
              </div>
              <div className="flex items-center gap-1">
                {[0, 1, 2].map((i) => (
                  <motion.span
                    key={i}
                    className="w-1.5 h-1.5 rounded-full bg-[#f4a6b9]"
                    animate={{ y: [0, -4, 0], opacity: [0.35, 1, 0.35] }}
                    transition={{ repeat: Infinity, duration: 0.9, delay: i * 0.15 }}
                  />
                ))}
                <span className="text-[11px] text-zinc-400 ml-1.5">
                  Femi is searching the whole-body knowledge base...
                </span>
              </div>
            </div>
          </motion.div>
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

      {/* Large auto-growing chat box - sits clear above the pop-up dock */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSendMessage();
        }}
        className="pt-2 flex items-end gap-2"
      >
        <textarea
          ref={inputRef}
          rows={1}
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={handleInputKeyDown}
          placeholder={t('ai.askPlaceholder')}
          aria-label="Ask Femi anything"
          className="flex-1 resize-none bg-[#1e1727] border border-[#31253e] rounded-2xl px-4 py-3.5 text-sm leading-snug text-white placeholder-zinc-500 focus:outline-none focus:border-[#b5497a] min-h-[52px] max-h-[168px] overflow-y-auto"
        />
        <button
          type="submit"
          disabled={!inputText.trim()}
          className="h-[52px] w-12 shrink-0 rounded-2xl bg-gradient-to-r from-[#b5497a] to-[#d65d95] text-white flex items-center justify-center shadow-md active:scale-95 disabled:opacity-40 transition-all"
        >
          <Send className="w-5 h-5" />
        </button>
      </form>

      {/* Symptom Triage Modal */}
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
                    Clinical heuristic assessment &middot; local &amp; confidential
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
                        <span className="text-[#f4a6b9]">&#10022;</span>
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
