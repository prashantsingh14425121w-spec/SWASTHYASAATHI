/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { createContext, useContext, useState } from 'react';
import { AppScreen } from '../types';

interface NavigationContextType {
  currentScreen: AppScreen;
  navigate: (screen: AppScreen, params?: Record<string, string | number>) => void;
  goBack: () => void;
  screenParams: Record<string, string | number>;
  screenHistory: AppScreen[];
  isInApp: boolean;
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

export const NavigationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentScreen, setCurrentScreen] = useState<AppScreen>('landing');
  const [screenParams, setScreenParams] = useState<Record<string, string | number>>({});
  const [screenHistory, setScreenHistory] = useState<AppScreen[]>(['landing']);

  const navigate = (screen: AppScreen, params: Record<string, string | number> = {}) => {
    setScreenHistory((prev) => [...prev, screen]);
    setScreenParams(params);
    setCurrentScreen(screen);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goBack = () => {
    if (screenHistory.length > 1) {
      const nextHistory = [...screenHistory];
      nextHistory.pop(); // remove current
      const previousScreen = nextHistory[nextHistory.length - 1];
      setScreenHistory(nextHistory);
      setCurrentScreen(previousScreen);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setCurrentScreen('landing');
    }
  };

  // Determine whether current screen is an authenticated/in-app portal screen
  const isInApp = currentScreen !== 'landing' && currentScreen !== 'login';

  return (
    <NavigationContext.Provider
      value={{
        currentScreen,
        navigate,
        goBack,
        screenParams,
        screenHistory,
        isInApp,
      }}
    >
      {children}
    </NavigationContext.Provider>
  );
};

export const useNavigation = (): NavigationContextType => {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error('useNavigation must be used within a NavigationProvider');
  }
  return context;
};
