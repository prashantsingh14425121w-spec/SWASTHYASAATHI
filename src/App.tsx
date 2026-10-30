/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import { NavigationProvider, useNavigation } from './context/NavigationContext';
import { OfflineProvider, useOffline } from './context/OfflineContext';
import { Navbar } from './components/layout/Navbar';
import { AppHeader } from './components/layout/AppHeader';
import { BottomNav } from './components/layout/BottomNav';
import { Footer } from './components/layout/Footer';

// Screens
import { LandingScreen } from './components/screens/LandingScreen';
import { LoginScreen } from './components/screens/LoginScreen';
import { DashboardScreen } from './components/screens/DashboardScreen';
import { FamiliesScreen } from './components/screens/FamiliesScreen';
import { FamilyProfileScreen } from './components/screens/FamilyProfileScreen';
import { AddFamilyScreen } from './components/screens/AddFamilyScreen';
import { VisitsScreen } from './components/screens/VisitsScreen';
import { MaternalScreen } from './components/screens/MaternalScreen';
import { VaccinationScreen } from './components/screens/VaccinationScreen';
import { SaathiAiScreen } from './components/screens/SaathiAiScreen';
import { SyncCenterScreen } from './components/screens/SyncCenterScreen';
import { NotificationsScreen } from './components/screens/NotificationsScreen';
import { SettingsScreen } from './components/screens/SettingsScreen';

const MainScreenRouter: React.FC = () => {
  const { currentScreen, isInApp } = useNavigation();

  const renderActiveScreen = () => {
    switch (currentScreen) {
      case 'landing':
        return <LandingScreen />;
      case 'login':
        return <LoginScreen />;
      case 'dashboard':
        return <DashboardScreen />;
      case 'families':
        return <FamiliesScreen />;
      case 'family-detail':
        return <FamilyProfileScreen />;
      case 'add-family':
        return <AddFamilyScreen />;
      case 'visits':
        return <VisitsScreen />;
      case 'maternal':
        return <MaternalScreen />;
      case 'vaccination':
        return <VaccinationScreen />;
      case 'saathi-ai':
        return <SaathiAiScreen />;
      case 'sync-center':
        return <SyncCenterScreen />;
      case 'notifications':
        return <NotificationsScreen />;
      case 'settings':
      case 'languages':
        return <SettingsScreen />;
      default:
        return <LandingScreen />;
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAF8] flex flex-col selection:bg-[#E8F5EF] selection:text-[#087F5B]">
      {/* Dynamic Header: In-App Header inside portal, Navbar on public overview */}
      {isInApp ? <AppHeader /> : <Navbar />}

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {renderActiveScreen()}
      </main>

      {/* Mobile Bottom Thumb Navigation (visible inside portal on mobile) */}
      {isInApp && <BottomNav />}

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default function App() {
  return (
    <LanguageProvider>
      <OfflineProvider>
        <NavigationProvider>
          <MainScreenRouter />
        </NavigationProvider>
      </OfflineProvider>
    </LanguageProvider>
  );
}
