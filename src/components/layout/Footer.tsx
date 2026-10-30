/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { HeartPulse, ShieldAlert, PhoneCall, Globe, WifiOff } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useNavigation } from '../../context/NavigationContext';

export const Footer: React.FC = () => {
  const { t, currentLanguageOption, setLanguage, languages } = useLanguage();
  const { navigate } = useNavigation();

  return (
    <footer className="bg-white border-t border-[#E2EAE5] text-[#78857E] pt-12 pb-16 md:pb-12 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          {/* Col 1: Brand & Tagline */}
          <div className="md:col-span-1 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-[#087F5B] text-white flex items-center justify-center">
                <HeartPulse className="w-4 h-4" />
              </div>
              <span className="text-base font-bold text-[#17231E]">
                Swasthya<span className="text-[#087F5B]">Saathi</span>
              </span>
            </div>
            <p className="text-xs text-[#78857E] leading-relaxed">
              Care that goes everywhere. Offline-first digital health record platform designed for rural India's community health workers.
            </p>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#E8F5EF] text-[#075C45] text-xs font-semibold">
              <WifiOff className="w-3.5 h-3.5" />
              <span>Full Offline Support</span>
            </div>
          </div>

          {/* Col 2: Core Platform Modules */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-[#17231E] uppercase tracking-wider">
              ASHA Workflows
            </h4>
            <ul className="space-y-1.5 text-xs">
              <li>
                <button
                  onClick={() => navigate('families')}
                  className="hover:text-[#087F5B] transition-colors"
                >
                  Family & Household Registers
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('maternal')}
                  className="hover:text-[#087F5B] transition-colors"
                >
                  Maternal Health & ANC
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('vaccination')}
                  className="hover:text-[#087F5B] transition-colors"
                >
                  Child Vaccination Tracker
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('visits')}
                  className="hover:text-[#087F5B] transition-colors"
                >
                  Household Visit Logs
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('saathi-ai')}
                  className="hover:text-[#087F5B] transition-colors text-[#087F5B] font-semibold"
                >
                  Saathi AI Assistant
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Emergency & Health Helplines */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-[#17231E] uppercase tracking-wider flex items-center gap-1.5">
              <PhoneCall className="w-3.5 h-3.5 text-[#087F5B]" />
              Rural Health Helplines
            </h4>
            <ul className="space-y-2 text-xs">
              <li className="flex justify-between items-center py-1 border-b border-slate-100">
                <span>National Emergency Ambulance</span>
                <span className="font-mono font-bold text-[#17231E]">108</span>
              </li>
              <li className="flex justify-between items-center py-1 border-b border-slate-100">
                <span>Pregnant Mother & Child Transport</span>
                <span className="font-mono font-bold text-[#17231E]">102</span>
              </li>
              <li className="flex justify-between items-center py-1">
                <span>National Health Advice Line</span>
                <span className="font-mono font-bold text-[#17231E]">104</span>
              </li>
            </ul>
          </div>

          {/* Col 4: Language Switcher */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-[#17231E] uppercase tracking-wider flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5 text-[#087F5B]" />
              Select Language (10 Indian Languages)
            </h4>
            <div className="grid grid-cols-2 gap-1.5 pt-1">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => setLanguage(lang.code)}
                  className={`text-left px-2 py-1.5 rounded-lg text-xs transition-colors border ${
                    lang.code === currentLanguageOption.code
                      ? 'bg-[#087F5B] text-white border-[#087F5B] font-semibold'
                      : 'bg-[#F8FAF8] border-[#E2EAE5] text-[#17231E] hover:bg-[#E8F5EF]'
                  }`}
                >
                  {lang.nativeName}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Mandatory Health Disclaimer Callout */}
        <div className="p-4 rounded-xl bg-[#F8FAF8] border border-[#E2EAE5] flex items-start gap-3 mb-6">
          <ShieldAlert className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
          <p className="text-xs text-[#78857E] leading-relaxed">
            <strong className="text-[#17231E]">Healthcare Disclaimer:</strong> SwasthyaSaathi is an administrative record-management and follow-up assistance tool for community health workers. It is <span className="font-semibold text-[#17231E]">NOT</span> a diagnostic system, does not prescribe medications, and cannot replace the clinical evaluation of a qualified medical practitioner.
          </p>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-[#E2EAE5] text-xs text-[#78857E]">
          <p>© 2026 SwasthyaSaathi. Built for Rural Community Healthcare.</p>
          <div className="flex items-center gap-4">
            <button onClick={() => navigate('sync-center')} className="hover:text-[#087F5B]">
              Sync Status
            </button>
            <span aria-hidden="true">·</span>
            <button onClick={() => navigate('settings')} className="hover:text-[#087F5B]">
              Privacy & Local Storage
            </button>
            <span aria-hidden="true">·</span>
            <button onClick={() => navigate('dashboard')} className="hover:text-[#087F5B]">
              Demo Portal
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
