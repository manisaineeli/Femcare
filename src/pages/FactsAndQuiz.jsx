import React, { useState } from 'react';
import { useAppState } from '../context/AppStateContext';
import { factsBank, FACT_CATEGORIES } from '../data/factNotesData';
import { QUIZZES } from '../data/quizzesData';
import confetti from 'canvas-confetti';
import { 
  BookOpen, Sparkles, HelpCircle, Check, X, Share2, Search, 
  Trophy, RotateCcw, ArrowRight 
} from 'lucide-react';

export default function FactsAndQuiz() {
  const { t } = useAppState();
  const [activeTab, setActiveTab] = useState("facts"); // "facts" or "quiz"
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [copiedId, setCopiedId] = useState(null);

  // Quiz State
  const [activeQuizIndex, setActiveQuizIndex] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const currentQuiz = QUIZZES[activeQuizIndex];
  const currentQuestion = currentQuiz.questions[currentQuestionIndex];

  // Filter facts
  const filteredFacts = factsBank.filter((f) => {
    const matchesCat = selectedCategory === "all" || f.category === selectedCategory;
    const matchesSearch = !searchQuery || 
      f.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.fact.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const handleShareFact = (fact) => {
    const text = `💡 FemCare Health Fact:\n"${fact.title}"\n${fact.fact}\nSource: ${fact.source}`;
    if (navigator.share) {
      navigator.share({ title: fact.title, text }).catch(() => {});
    } else {
      navigator.clipboard.writeText(text);
      setCopiedId(fact.id);
      setTimeout(() => setCopiedId(null), 2000);
    }
  };

  const handleOptionSelect = (idx) => {
    if (isAnswered) return;
    setSelectedOption(idx);
    setIsAnswered(true);

    if (idx === currentQuestion.correctIndex) {
      setScore(s => s + 1);
      try {
        confetti({
          particleCount: 30,
          spread: 50,
          origin: { y: 0.6 }
        });
      } catch (e) {}
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex + 1 < currentQuiz.questions.length) {
      setCurrentQuestionIndex(i => i + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setQuizCompleted(true);
      try {
        confetti({
          particleCount: 80,
          spread: 80,
          origin: { y: 0.5 }
        });
      } catch (e) {}
    }
  };

  const resetQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setQuizCompleted(false);
  };

  return (
    <div className="space-y-4 pb-24 animate-in fade-in duration-300">
      {/* Title */}
      <div>
        <h2 className="text-xl font-bold text-white font-['Outfit']">
          Daily Health Facts & Quizzes
        </h2>
        <p className="text-xs text-zinc-400">
          Empowering body literacy, debunking taboos, and knowledge tests
        </p>
      </div>

      {/* Tabs */}
      <div className="flex bg-[#1e1727] p-1 rounded-xl border border-[#31253e]">
        <button
          onClick={() => setActiveTab("facts")}
          className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all ${
            activeTab === "facts"
              ? 'bg-gradient-to-r from-[#b5497a] to-[#d65d95] text-white shadow-sm'
              : 'text-zinc-400 hover:text-white'
          }`}
        >
          365 Health Facts
        </button>
        <button
          onClick={() => setActiveTab("quiz")}
          className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all ${
            activeTab === "quiz"
              ? 'bg-gradient-to-r from-[#b5497a] to-[#d65d95] text-white shadow-sm'
              : 'text-zinc-400 hover:text-white'
          }`}
        >
          Interactive Quizzes
        </button>
      </div>

      {/* 365 Facts Bank View */}
      {activeTab === "facts" && (
        <div className="space-y-3">
          {/* Search Bar */}
          <div className="relative">
            <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search facts (e.g. cramps, jaggery, jan aushadhi)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#1e1727] border border-[#31253e] rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#b5497a]"
            />
          </div>

          {/* Category Filter Chips */}
          <div className="flex gap-1.5 overflow-x-auto pb-1 no-scrollbar">
            {FACT_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`whitespace-nowrap px-3 py-1 rounded-xl text-xs font-medium border transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-[#b5497a] border-[#f4a6b9] text-white shadow-sm'
                    : 'bg-[#1e1727] border-[#31253e] text-zinc-400 hover:text-zinc-200'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Facts List */}
          <div className="space-y-3">
            {filteredFacts.map((fact) => (
              <div
                key={fact.id}
                className="rounded-2xl p-4 bg-[#1e1727] border border-[#31253e] shadow-md space-y-2"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[9px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-full bg-[#31253e] text-[#f4a6b9]">
                    {fact.category}
                  </span>
                  <button
                    onClick={() => handleShareFact(fact)}
                    className="text-zinc-400 hover:text-white flex items-center gap-1 text-[11px]"
                  >
                    {copiedId === fact.id ? (
                      <span className="text-emerald-400 flex items-center gap-1">
                        <Check className="w-3 h-3" /> Copied
                      </span>
                    ) : (
                      <span className="flex items-center gap-1">
                        <Share2 className="w-3 h-3" /> Share
                      </span>
                    )}
                  </button>
                </div>

                <h4 className="text-sm font-bold text-white font-['Outfit']">
                  {fact.title}
                </h4>

                <p className="text-xs text-zinc-300 leading-relaxed">
                  {fact.fact}
                </p>

                <div className="pt-2 border-t border-[#31253e]/60 flex items-center justify-between text-[10px] text-zinc-400 italic">
                  <span>Source: {fact.source}</span>
                  <div className="flex gap-1">
                    {fact.tags.map((t, i) => (
                      <span key={i} className="text-pink-300/80">#{t}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Interactive Quiz Mode View */}
      {activeTab === "quiz" && (
        <div className="space-y-3">
          {/* Quiz Picker */}
          <div className="flex gap-1.5 overflow-x-auto pb-1 no-scrollbar">
            {QUIZZES.map((q, idx) => (
              <button
                key={q.id}
                onClick={() => {
                  setActiveQuizIndex(idx);
                  resetQuiz();
                }}
                className={`whitespace-nowrap px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                  activeQuizIndex === idx
                    ? 'bg-purple-600 border-purple-400 text-white shadow-md'
                    : 'bg-[#1e1727] border-[#31253e] text-zinc-400 hover:text-white'
                }`}
              >
                {q.title}
              </button>
            ))}
          </div>

          {/* Quiz Card */}
          {!quizCompleted ? (
            <div className="rounded-2xl p-5 bg-[#1e1727] border border-[#31253e] shadow-xl space-y-4">
              <div className="flex items-center justify-between text-xs text-zinc-400">
                <span>Question {currentQuestionIndex + 1} of {currentQuiz.questions.length}</span>
                <span className="font-bold text-[#f4a6b9]">Score: {score}</span>
              </div>

              <h3 className="text-base font-bold text-white leading-snug font-['Outfit']">
                {currentQuestion.question}
              </h3>

              <div className="space-y-2">
                {currentQuestion.options.map((opt, idx) => {
                  let optStyle = "bg-[#251d30] border-[#372646] text-zinc-200 hover:border-[#b5497a]";
                  if (isAnswered) {
                    if (idx === currentQuestion.correctIndex) {
                      optStyle = "bg-emerald-950/60 border-emerald-500 text-emerald-200 font-bold";
                    } else if (selectedOption === idx) {
                      optStyle = "bg-rose-950/60 border-rose-500 text-rose-200";
                    } else {
                      optStyle = "bg-[#251d30]/50 border-[#372646]/50 text-zinc-500";
                    }
                  }

                  return (
                    <button
                      key={idx}
                      disabled={isAnswered}
                      onClick={() => handleOptionSelect(idx)}
                      className={`w-full p-3 rounded-xl border text-left text-xs transition-all flex items-center justify-between ${optStyle}`}
                    >
                      <span>{opt}</span>
                      {isAnswered && idx === currentQuestion.correctIndex && (
                        <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                      )}
                      {isAnswered && selectedOption === idx && idx !== currentQuestion.correctIndex && (
                        <X className="w-4 h-4 text-rose-400 shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Explanation Box */}
              {isAnswered && (
                <div className="p-3 rounded-xl bg-purple-950/40 border border-purple-500/30 text-xs text-purple-200 animate-in fade-in">
                  <strong className="text-white block mb-0.5">Explanation:</strong>
                  {currentQuestion.explanation}
                </div>
              )}

              {/* Next Button */}
              {isAnswered && (
                <button
                  onClick={handleNextQuestion}
                  className="w-full py-2.5 rounded-xl bg-gradient-to-r from-[#b5497a] to-[#d65d95] text-white text-xs font-bold shadow-md flex items-center justify-center gap-1.5 active:scale-95 transition-all"
                >
                  <span>{currentQuestionIndex + 1 === currentQuiz.questions.length ? "Finish Quiz" : "Next Question"}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          ) : (
            /* Quiz Completed Score Summary */
            <div className="rounded-2xl p-6 bg-[#1e1727] border border-[#31253e] text-center space-y-3 shadow-xl">
              <div className="w-12 h-12 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-400 flex items-center justify-center mx-auto">
                <Trophy className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white font-['Outfit']">
                Quiz Completed!
              </h3>
              <p className="text-xs text-zinc-300">
                You scored <strong>{score} out of {currentQuiz.questions.length}</strong>! Great job taking charge of your menstrual knowledge.
              </p>
              <button
                onClick={resetQuiz}
                className="inline-flex items-center gap-1.5 px-5 py-2 rounded-xl bg-gradient-to-r from-[#b5497a] to-[#d65d95] text-white text-xs font-bold shadow-md active:scale-95 transition-all"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Retry Quiz</span>
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
