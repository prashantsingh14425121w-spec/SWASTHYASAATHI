/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { HeartPulse, Globe, ArrowRight, Menu, X, ShieldCheck } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useNavigation } from '../../context/NavigationContext';
import { Button } from '../ui/Button';

export const Navbar: React.FC = () => {
  const { currentLanguageOption, languages, setLanguage, t } = useLanguage();
  const { navigate, currentScreen } = useNavigation();
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-[#E2EAE5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-16">
          {/* Zone 1: Single text element wordmark */}
          <button
            onClick={() => navigate('landing')}
            className="flex items-center gap-2.5 text-left group focus:outline-none shrink-0"
          >
            <div className="w-9 h-9 rounded-xl bg-[#087F5B] text-white flex items-center justify-center shadow-xs group-hover:bg-[#075C45] transition-colors">
              <HeartPulse className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold tracking-tight text-[#17231E] whitespace-nowrap">
                Swasthya<span className="text-[#087F5B]">Saathi</span>
              </span>
            </div>
          </button>

          {/* Zone 2: 4-5 concise single-line nav links */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-[#78857E]">
            <button
              onClick={() => navigate('landing')}
              className={`hover:text-[#087F5B] transition-colors whitespace-nowrap shrink-0 ${
                currentScreen === 'landing' ? 'text-[#087F5B] font-semibold' : ''
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => navigate('dashboard')}
              className="hover:text-[#087F5B] transition-colors whitespace-nowrap shrink-0"
            >
              ASHA Dashboard
            </button>
            <button
              onClick={() => navigate('families')}
              className="hover:text-[#087F5B] transition-colors whitespace-nowrap shrink-0"
            >
              Family Records
            </button>
            <button
              onClick={() => navigate('saathi-ai')}
              className="hover:text-[#087F5B] transition-colors whitespace-nowrap shrink-0 flex items-center gap-1 text-[#087F5B] font-semibold"
            >
              Saathi AI
            </button>
          </nav>

          {/* Zone 3: Language Selector & Primary Action */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Language Selector Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
                className="min-h-[40px] px-2.5 py-1.5 rounded-lg border border-[#E2EAE5] bg-[#F8FAF8] text-xs font-medium text-[#17231E] hover:bg-white transition-colors flex items-center gap-1.5"
                aria-label="Select language"
              >
                <Globe className="w-3.5 h-3.5 text-[#087F5B]" />
                <span className="font-semibold">{currentLanguageOption.nativeName}</span>
              </button>

              {isLangMenuOpen && (
                <>
                  <div
                    className="fixed inset-0 z-30"
                    onClick={() => setIsLangMenuOpen(false)}
                  />
                  <div className="absolute right-0 mt-2 w-48 rounded-xl bg-white shadow-lg border border-[#E2EAE5] py-1.5 z-40 max-h-72 overflow-y-auto">
                    <div className="px-3 py-1 text-[11px] font-semibold text-[#78857E] uppercase tracking-wider border-b border-slate-100">
                      10 Indian Languages
                    </div>
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => {
                          setLanguage(lang.code);
                          setIsLangMenuOpen(false);
                        }}
                        className={`w-full px-3 py-2 text-left text-xs flex items-center justify-between hover:bg-[#E8F5EF] transition-colors ${
                          lang.code === currentLanguageOption.code
                            ? 'text-[#087F5B] font-bold bg-[#E8F5EF]/60'
                            : 'text-[#17231E]'
                        }`}
                      >
                        <span>{lang.nativeName}</span>
                        <span className="text-[11px] text-[#78857E]">{lang.name}</span>
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Launch App / Enter Dashboard CTA */}
            <Button
              variant="primary"
              size="sm"
              onClick={() => navigate('dashboard')}
              rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
              className="hidden sm:inline-flex"
            >
              {t('ashaPortal')}
            </Button>

            {/* Mobile menu trigger */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden min-h-[40px] min-w-[40px] flex items-center justify-center rounded-lg border border-[#E2EAE5] text-[#17231E]"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile dropdown menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-[#E2EAE5] space-y-2">
            <button
              onClick={() => {
                navigate('landing');
                setIsMobileMenuOpen(false);
              }}
              className="w-full text-left px-3 py-2 rounded-lg text-sm font-medium text-[#17231E] hover:bg-[#E8F5EF]"
            >
              Overview
            </button>
            <button
              onClick={() => {
                navigate('dashboard');
                setIsMobileMenuOpen(false);
              }}
              className="w-full text-left px-3 py-2 rounded-lg text-sm font-medium text-[#17231E] hover:bg-[#E8F5EF]"
            >
              {t('dashboard')}
            </button>
            <button
              onClick={() => {
                navigate('families');
                setIsMobileMenuOpen(false);
              }}
              className="w-full text-left px-3 py-2 rounded-lg text-sm font-medium text-[#17231E] hover:bg-[#E8F5EF]"
            >
              {t('families')}
            </button>
            <button
              onClick={() => {
                navigate('visits');
                setIsMobileMenuOpen(false);
              }}
              className="w-full text-left px-3 py-2 rounded-lg text-sm font-medium text-[#17231E] hover:bg-[#E8F5EF]"
            >
              {t('visits')}
            </button>
            <button
              onClick={() => {
                navigate('maternal');
                setIsMobileMenuOpen(false);
              }}
              className="w-full text-left px-3 py-2 rounded-lg text-sm font-medium text-[#17231E] hover:bg-[#E8F5EF]"
            >
              {t('maternalHealth')}
            </button>
            <button
              onClick={() => {
                navigate('vaccination');
                setIsMobileMenuOpen(false);
              }}
              className="w-full text-left px-3 py-2 rounded-lg text-sm font-medium text-[#17231E] hover:bg-[#E8F5EF]"
            >
              {t('vaccinationTracker')}
            </button>
            <button
              onClick={() => {
                navigate('saathi-ai');
                setIsMobileMenuOpen(false);
              }}
              className="w-full text-left px-3 py-2 rounded-lg text-sm font-medium text-[#087F5B] hover:bg-[#E8F5EF]"
            >
              {t('saathiAi')}
            </button>
            <div className="pt-2">
              <Button
                variant="primary"
                size="md"
                className="w-full"
                onClick={() => {
                  navigate('dashboard');
                  setIsMobileMenuOpen(false);
                }}
              >
                {t('ashaPortal')}
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
