import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { loadState, saveState, clearAllLocalData, getDefaultState } from '../utils/storage';
import { calculateCycleStatus, daysBetween } from '../utils/cycleCalculator';
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

  /**
   * Manually record a period: from startDate to endDate, with period details.
   * Adds/updates the entry in cycleHistory and refreshes the profile
   * (lastPeriodStartDate, periodDuration) when it is the most recent period.
   * Pass { replaceHistory: true } during onboarding to clear seeded demo cycles.
   */
  const addPeriodRecord = (record, { replaceHistory = false } = {}) => {
    const startDate = record.startDate;
    const endDate = record.endDate || record.startDate;
    const duration = daysBetween(startDate, endDate) + 1;

    setState((prev) => {
      const baseHistory = replaceHistory ? [] : prev.cycleHistory;
      // Re-recording the same start date replaces the old entry (no duplicates)
      const history = baseHistory.filter((c) => c.startDate !== startDate);

      // Actual cycle length = days since the closest earlier recorded period
      const earlier = history
        .filter((c) => c.startDate < startDate)
        .sort((a, b) => (a.startDate < b.startDate ? 1 : -1));
      let cycleLength = prev.userProfile.cycleLength || 28;
      if (earlier.length > 0) {
        const gap = daysBetween(earlier[0].startDate, startDate);
        if (gap >= 15 && gap <= 60) cycleLength = gap;
      }

      const entry = {
        id: `p-${Date.now()}`,
        startDate,
        endDate,
        duration,
        cycleLength,
        flow: record.flow || "medium",
        pain: typeof record.pain === "number" ? record.pain : 0,
        symptoms: record.symptoms || [],
        notes: record.notes || "",
        createdAt: new Date().toISOString()
      };

      const updatedHistory = [...history, entry].sort((a, b) =>
        a.startDate < b.startDate ? 1 : -1
      );

      // If this is the latest period, refresh the cycle predictions from it
      const isLatest = updatedHistory.length === 0 || updatedHistory[0].id === entry.id;
      const profileUpdates = isLatest
        ? { lastPeriodStartDate: startDate, periodDuration: duration }
        : {};

      return {
        ...prev,
        cycleHistory: updatedHistory,
        userProfile: { ...prev.userProfile, ...profileUpdates }
      };
    });
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
    addPeriodRecord,
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
