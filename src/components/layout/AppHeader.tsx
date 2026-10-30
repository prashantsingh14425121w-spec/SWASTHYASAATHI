/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  ArrowLeft,
  Wifi,
  WifiOff,
  RefreshCw,
  Globe,
  Bell,
  Sparkles,
  User,
  CheckCircle2,
} from 'lucide-react';
import { useNavigation } from '../../context/NavigationContext';
import { useLanguage } from '../../context/LanguageContext';
import { useOffline } from '../../context/OfflineContext';
import { mockAshaProfile } from '../../data/mockData';
import { Button } from '../ui/Button';

export const AppHeader: React.FC = () => {
  const { currentScreen, goBack, screenHistory, navigate } = useNavigation();
  const { t, currentLanguageOption, languages, setLanguage } = useLanguage();
  const {
    effectiveOnline,
    isSimulatedOffline,
    toggleSimulatedOffline,
    pendingSyncCount,
    syncStatus,
    triggerManualSync,
  } = useOffline();

  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);

  const getScreenTitle = () => {
    switch (currentScreen) {
      case 'dashboard':
        return t('dashboard');
      case 'families':
        return t('families');
      case 'family-detail':
        return 'Family Profile';
      case 'add-family':
        return t('addFamily');
      case 'visits':
        return t('visits');
      case 'maternal':
        return t('maternalHealth');
      case 'vaccination':
        return t('vaccinationTracker');
      case 'saathi-ai':
        return t('saathiAi');
      case 'sync-center':
        return t('offlineSync');
      case 'notifications':
        return t('notifications');
      case 'settings':
        return t('settings');
      case 'languages':
        return t('selectLanguage');
      default:
        return 'ASHA Portal';
    }
  };

  return (
    <header className="sticky top-0 z-30 bg-white border-b border-[#E2EAE5] shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-14 sm:h-16 gap-3">
          {/* Left: Back button + Screen title */}
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            {screenHistory.length > 1 && currentScreen !== 'dashboard' && (
              <button
                onClick={goBack}
                className="min-h-[40px] min-w-[40px] flex items-center justify-center rounded-xl text-[#17231E] hover:bg-[#E8F5EF] transition-colors shrink-0"
                aria-label="Go back"
              >
                <ArrowLeft className="w-5 h-5 text-[#17231E]" />
              </button>
            )}

            <div className="min-w-0">
              <h1 className="text-base sm:text-lg font-bold text-[#17231E] truncate">
                {getScreenTitle()}
              </h1>
              <p className="hidden sm:block text-xs text-[#78857E] truncate">
                {mockAshaProfile.name} · {mockAshaProfile.village} · {mockAshaProfile.subCenter}
              </p>
            </div>
          </div>

          {/* Right: Offline status toggle, Sync status, Language, Profile */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Quick Airplane/Offline Mode Simulation Toggle (Critical for Hackathon demo) */}
            <button
              onClick={toggleSimulatedOffline}
              title={
                isSimulatedOffline
                  ? 'Offline Simulation Active. Click to restore internet connection.'
                  : 'Click to simulate offline / airplane mode for testing'
              }
              className={`min-h-[38px] px-2.5 py-1 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors border ${
                effectiveOnline
                  ? 'bg-[#E8F5EF] text-[#075C45] border-[#c0e4d4] hover:bg-[#d5eee2]'
                  : 'bg-amber-100 text-amber-900 border-amber-300 hover:bg-amber-200'
              }`}
            >
              {effectiveOnline ? (
                <>
                  <Wifi className="w-3.5 h-3.5 text-[#087F5B]" />
                  <span className="hidden xs:inline">Online</span>
                </>
              ) : (
                <>
                  <WifiOff className="w-3.5 h-3.5 text-amber-700 animate-pulse" />
                  <span className="font-bold">Offline</span>
                </>
              )}
            </button>

            {/* Sync Status Badge / Manual Sync Trigger */}
            {pendingSyncCount > 0 ? (
              <button
                onClick={() => {
                  if (effectiveOnline) triggerManualSync();
                  else navigate('sync-center');
                }}
                disabled={syncStatus === 'syncing'}
                className="min-h-[38px] px-2.5 py-1 rounded-xl bg-orange-50 border border-orange-200 text-orange-800 text-xs font-medium flex items-center gap-1.5 hover:bg-orange-100 transition-colors"
                title="Click to view pending items or sync"
              >
                <RefreshCw
                  className={`w-3.5 h-3.5 text-orange-600 ${
                    syncStatus === 'syncing' ? 'animate-spin' : ''
                  }`}
                />
                <span className="font-bold">{pendingSyncCount}</span>
                <span className="hidden md:inline">pending</span>
              </button>
            ) : (
              <button
                onClick={() => navigate('sync-center')}
                className="hidden lg:flex min-h-[38px] px-2 py-1 rounded-xl bg-slate-50 border border-slate-200 text-slate-600 text-xs font-medium items-center gap-1.5"
                title="All records are saved and synced"
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-[#087F5B]" />
                <span>Synced</span>
              </button>
            )}

            {/* Saathi AI Quick Button */}
            <button
              onClick={() => navigate('saathi-ai')}
              className={`min-h-[38px] px-2.5 py-1 rounded-xl text-xs font-medium flex items-center gap-1.5 transition-colors border ${
                currentScreen === 'saathi-ai'
                  ? 'bg-[#087F5B] text-white border-[#087F5B]'
                  : 'bg-white text-[#087F5B] border-[#087F5B]/30 hover:bg-[#E8F5EF]'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-[#087F5B]" />
              <span className="font-semibold hidden sm:inline">Saathi AI</span>
            </button>

            {/* Language Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
                className="min-h-[38px] min-w-[38px] p-2 rounded-xl border border-[#E2EAE5] bg-white text-[#17231E] hover:bg-[#F8FAF8] flex items-center justify-center text-xs font-semibold"
                aria-label="Language"
              >
                <Globe className="w-4 h-4 text-[#087F5B]" />
              </button>

              {isLangMenuOpen && (
                <>
                  <div className="fixed inset-0 z-30" onClick={() => setIsLangMenuOpen(false)} />
                  <div className="absolute right-0 mt-2 w-48 rounded-xl bg-white shadow-xl border border-[#E2EAE5] py-1.5 z-40 max-h-72 overflow-y-auto">
                    <div className="px-3 py-1 text-[10px] font-bold text-[#78857E] uppercase tracking-wider border-b border-slate-100">
                      10 Indian Languages
                    </div>
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => {
                          setLanguage(lang.code);
                          setIsLangMenuOpen(false);
                        }}
                        className={`w-full px-3 py-2 text-left text-xs flex items-center justify-between hover:bg-[#E8F5EF] ${
                          lang.code === currentLanguageOption.code
                            ? 'text-[#087F5B] font-bold bg-[#E8F5EF]/60'
                            : 'text-[#17231E]'
                        }`}
                      >
                        <span>{lang.nativeName}</span>
                        <span className="text-[10px] text-[#78857E]">{lang.name}</span>
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Profile Avatar / Settings Button */}
            <button
              onClick={() => navigate('settings')}
              className="min-h-[38px] min-w-[38px] rounded-xl bg-[#E8F5EF] text-[#075C45] flex items-center justify-center font-bold text-xs border border-[#bfe3d4]"
              title="Asha Worker Profile"
            >
              SD
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
