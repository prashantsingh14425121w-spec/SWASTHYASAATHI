/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import {
  LayoutDashboard,
  Users,
  CalendarCheck,
  ShieldPlus,
  Sparkles,
} from 'lucide-react';
import { useNavigation } from '../../context/NavigationContext';
import { useLanguage } from '../../context/LanguageContext';
import { AppScreen } from '../../types';

export const BottomNav: React.FC = () => {
  const { currentScreen, navigate } = useNavigation();
  const { t } = useLanguage();

  const navItems: { screen: AppScreen; label: string; icon: React.FC<{ className?: string }> }[] = [
    {
      screen: 'dashboard',
      label: t('dashboard'),
      icon: LayoutDashboard,
    },
    {
      screen: 'families',
      label: t('families'),
      icon: Users,
    },
    {
      screen: 'visits',
      label: t('visits'),
      icon: CalendarCheck,
    },
    {
      screen: 'vaccination',
      label: 'Vaccines',
      icon: ShieldPlus,
    },
    {
      screen: 'saathi-ai',
      label: 'Saathi AI',
      icon: Sparkles,
    },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-[#E2EAE5] pb-safe shadow-[0_-2px_10px_rgba(0,0,0,0.03)]">
      <div className="grid grid-cols-5 items-center h-16 px-1">
        {navItems.map((item) => {
          const isActive = currentScreen === item.screen;
          const Icon = item.icon;
          return (
            <button
              key={item.screen}
              onClick={() => navigate(item.screen)}
              className={`flex flex-col items-center justify-center min-h-[48px] py-1 transition-colors relative ${
                isActive ? 'text-[#087F5B]' : 'text-[#78857E] hover:text-[#17231E]'
              }`}
            >
              <div
                className={`p-1 rounded-xl transition-all ${
                  isActive ? 'bg-[#E8F5EF]' : ''
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'text-[#087F5B] stroke-[2.2]' : ''}`} />
              </div>
              <span
                className={`text-[10px] tracking-tight mt-0.5 truncate max-w-[64px] ${
                  isActive ? 'font-bold text-[#087F5B]' : 'font-medium text-[#78857E]'
                }`}
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
