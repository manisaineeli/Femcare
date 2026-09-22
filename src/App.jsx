import React, { useState } from 'react';
import { AppStateProvider, useAppState } from './context/AppStateContext';
import Header from './components/Header';
import BottomNav from './components/BottomNav';
import PrivacyShieldModal from './components/PrivacyShieldModal';
import SymptomLoggerModal from './components/SymptomLoggerModal';
import SOSModal from './components/SOSModal';

// Pages
import Home from './pages/Home';
import Tracker from './pages/Tracker';
import DietPlan from './pages/DietPlan';
import WeightManager from './pages/WeightManager';
import AIAssistant from './pages/AIAssistant';
import Safety from './pages/Safety';
import Shopping from './pages/Shopping';
import FactsAndQuiz from './pages/FactsAndQuiz';
import Journal from './pages/Journal';

// Icons for quick sub-drawer
import { 
  Home as HomeIcon, Calendar, Utensils, Dumbbell, Bot, ShieldAlert, 
  ShoppingBag, BookOpen, PenLine, ShieldCheck, HeartHandshake 
} from 'lucide-react';

function AppContent() {
  const { state, cycleStatus, t } = useAppState();
  const [activeTab, setActiveTab] = useState('home');
  const [showPrivacyShield, setShowPrivacyShield] = useState(false);
  const [showSymptomLogger, setShowSymptomLogger] = useState(false);
  const [showSOSModal, setShowSOSModal] = useState(false);

  // Render current tab page
  const renderActivePage = () => {
    switch (activeTab) {
      case 'home':
        return (
          <Home
            onOpenSymptomLogger={() => setShowSymptomLogger(true)}
            onOpenSOS={() => setShowSOSModal(true)}
            setActiveTab={setActiveTab}
          />
        );
      case 'tracker':
        return <Tracker onOpenSymptomLogger={() => setShowSymptomLogger(true)} />;
      case 'diet':
        return <DietPlan />;
      case 'weight':
        return <WeightManager />;
      case 'ai':
        return <AIAssistant />;
      case 'safety':
        return <Safety onOpenSOS={() => setShowSOSModal(true)} />;
      case 'shop':
        return <Shopping />;
      case 'facts':
        return <FactsAndQuiz />;
      case 'journal':
        return <Journal />;
      default:
        return <Home onOpenSymptomLogger={() => setShowSymptomLogger(true)} onOpenSOS={() => setShowSOSModal(true)} setActiveTab={setActiveTab} />;
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${state.darkMode ? 'bg-[#0f0b14] text-[#f5eff7]' : 'bg-[#fff8f5] text-[#2c1d28]'}`}>
      {/* Centered Mobile Container on Desktop */}
      <div className="mx-auto w-full max-w-[480px] min-h-screen relative flex flex-col bg-[#120e17] dark:bg-[#120e17] shadow-2xl border-x border-[#2d2238]/60">
        {/* Sticky Header */}
        <Header onOpenPrivacyShield={() => setShowPrivacyShield(true)} />

        {/* Top Horizontal Quick Launcher for Secondary Tabs */}
        <div className="px-3 pt-2 pb-1 overflow-x-auto flex gap-1.5 no-scrollbar border-b border-[#2d2238]/40 bg-[#16101c]/90 backdrop-blur-sm">
          {[
            { id: 'home', label: 'Home', icon: HomeIcon },
            { id: 'tracker', label: 'Cycle', icon: Calendar },
            { id: 'diet', label: 'Diet', icon: Utensils },
            { id: 'weight', label: 'Fitness', icon: Dumbbell },
            { id: 'ai', label: 'AI Triage', icon: Bot },
            { id: 'safety', label: 'Safety SOS', icon: ShieldAlert },
            { id: 'shop', label: 'Period Shop', icon: ShoppingBag },
            { id: 'facts', label: '365 Facts', icon: BookOpen },
            { id: 'journal', label: 'Journal', icon: PenLine }
          ].map((tab) => {
            const Icon = tab.icon;
            const isCurrent = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`whitespace-nowrap px-2.5 py-1 rounded-full text-[11px] font-medium flex items-center gap-1.5 transition-all shrink-0 ${
                  isCurrent
                    ? 'bg-[#b5497a] text-white shadow-sm font-semibold'
                    : 'bg-[#1f1627] text-zinc-400 hover:text-zinc-200 border border-[#31253e]'
                }`}
              >
                <Icon className="w-3 h-3" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Main Content Viewport */}
        <main className="flex-1 px-4 pt-3">
          {renderActivePage()}
        </main>

        {/* Fixed Mobile Bottom Navigation */}
        <BottomNav
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />

        {/* Modals */}
        <PrivacyShieldModal
          isOpen={showPrivacyShield}
          onClose={() => setShowPrivacyShield(false)}
        />

        <SymptomLoggerModal
          isOpen={showSymptomLogger}
          onClose={() => setShowSymptomLogger(false)}
        />

        <SOSModal
          isOpen={showSOSModal}
          onClose={() => setShowSOSModal(false)}
        />
      </div>
    </div>
  );
}

export default function App() {
  return (
    <AppStateProvider>
      <AppContent />
    </AppStateProvider>
  );
}
