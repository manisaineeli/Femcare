import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { loadState, saveState, clearAllLocalData, getDefaultState } from '../utils/storage';
import { calculateCycleStatus } from '../utils/cycleCalculator';
import { translations } from '../data/translations';

const AppStateContext = createContext(null);

export function AppStateProvider({ children }) {
  const [state, setState] = useState(() => loadState());

  // Automatically save to localStorage whenever state changes
  useEffect(() => {
    saveState(state);
  }, [state]);

  // Sync dark mode class on document element
  useEffect(() => {
    if (state.darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [state.darkMode]);

  // Translation helper function
  const t = useMemo(() => {
    const lang = state.language || 'en';
    const dict = translations[lang] || translations.en;
    
    return (path) => {
      const keys = path.split('.');
      let current = dict;
      for (const key of keys) {
        if (current && current[key] !== undefined) {
          current = current[key];
        } else {
          // Fallback to English if translation is missing
          let fallback = translations.en;
          for (const fbKey of keys) {
            if (fallback && fallback[fbKey] !== undefined) {
              fallback = fallback[fbKey];
            } else {
              return path;
            }
          }
          return fallback;
        }
      }
      return current;
    };
  }, [state.language]);

  // Memoized cycle calculations
  const cycleStatus = useMemo(() => {
    const { lastPeriodStartDate, cycleLength, periodDuration } = state.userProfile;
    return calculateCycleStatus(lastPeriodStartDate, cycleLength, periodDuration);
  }, [state.userProfile]);

  // Action methods
  const setLanguage = (lang) => {
    setState((prev) => ({ ...prev, language: lang }));
  };

  const toggleDarkMode = () => {
    setState((prev) => ({ ...prev, darkMode: !prev.darkMode }));
  };

  const togglePartnerMode = () => {
    setState((prev) => ({ ...prev, partnerMode: !prev.partnerMode }));
  };

  const updateUserProfile = (updates) => {
    setState((prev) => ({
      ...prev,
      userProfile: { ...prev.userProfile, ...updates }
    }));
  };

  const logTodaySymptoms = (dateKey, logData) => {
    setState((prev) => ({
      ...prev,
      symptomLogs: {
        ...prev.symptomLogs,
        [dateKey]: logData
      }
    }));
  };

  const logWeight = (weightNumber) => {
    const today = new Date().toISOString().split('T')[0];
    setState((prev) => {
      const existing = prev.weightHistory.filter((w) => w.date !== today);
      return {
        ...prev,
        userProfile: { ...prev.userProfile, currentWeight: weightNumber },
        weightHistory: [
          ...existing,
          { date: today, weight: weightNumber, cycleDay: cycleStatus.dayOfCycle }
        ]
      };
    });
  };

  const addHydrationGlass = () => {
    setState((prev) => ({
      ...prev,
      hydration: {
        ...prev.hydration,
        currentGlasses: Math.min(16, prev.hydration.currentGlasses + 1)
      }
    }));
  };

  const resetHydration = () => {
    setState((prev) => ({
      ...prev,
      hydration: {
        ...prev.hydration,
        currentGlasses: 0
      }
    }));
  };

  const addTrustedContact = (contact) => {
    setState((prev) => ({
      ...prev,
      trustedCircle: [
        ...prev.trustedCircle,
        { ...contact, id: `tc-${Date.now()}` }
      ]
    }));
  };

  const removeTrustedContact = (id) => {
    setState((prev) => ({
      ...prev,
      trustedCircle: prev.trustedCircle.filter((c) => c.id !== id)
    }));
  };

  const updateSosSettings = (settings) => {
    setState((prev) => ({
      ...prev,
      sosSettings: { ...prev.sosSettings, ...settings }
    }));
  };

  const addChatMessage = (msg) => {
    setState((prev) => ({
      ...prev,
      chatHistory: [
        ...prev.chatHistory,
        {
          id: `msg-${Date.now()}`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          ...msg
        }
      ]
    }));
  };

  const clearChatHistory = () => {
    setState((prev) => ({
      ...prev,
      chatHistory: []
    }));
  };

  const addJournalEntry = (entry) => {
    setState((prev) => ({
      ...prev,
      journalEntries: [
        { id: `j-${Date.now()}`, date: new Date().toISOString().split('T')[0], ...entry },
        ...prev.journalEntries
      ]
    }));
  };

  const resetAppToDefaults = () => {
    clearAllLocalData();
    setState(getDefaultState());
  };

  const completeOnboarding = () => {
    setState((prev) => ({ ...prev, onboardingComplete: true }));
  };

  const value = {
    state,
    t,
    cycleStatus,
    setLanguage,
    toggleDarkMode,
    togglePartnerMode,
    updateUserProfile,
    logTodaySymptoms,
    logWeight,
    addHydrationGlass,
    resetHydration,
    addTrustedContact,
    removeTrustedContact,
    updateSosSettings,
    addChatMessage,
    clearChatHistory,
    addJournalEntry,
    resetAppToDefaults,
    completeOnboarding
  };

  return (
    <AppStateContext.Provider value={value}>
      {children}
    </AppStateContext.Provider>
  );
}

export function useAppState() {
  const context = useContext(AppStateContext);
  if (!context) {
    throw new Error('useAppState must be used within an AppStateProvider');
  }
  return context;
}
