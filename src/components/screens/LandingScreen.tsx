/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import {
  HeartPulse,
  WifiOff,
  Sparkles,
  Users,
  ShieldCheck,
  CalendarCheck,
  ArrowRight,
  Globe,
  CheckCircle2,
  AlertCircle,
  FileText,
  Clock,
  Smartphone,
  ChevronRight,
} from 'lucide-react';
import { useNavigation } from '../../context/NavigationContext';
import { useLanguage } from '../../context/LanguageContext';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';

export const LandingScreen: React.FC = () => {
  const { navigate } = useNavigation();
  const { t, currentLanguageOption } = useLanguage();

  return (
    <div className="space-y-16 sm:space-y-24 py-4 sm:py-8">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Copy & Actions */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#E8F5EF] text-[#075C45] text-xs font-semibold border border-[#bfe3d4]">
              <WifiOff className="w-3.5 h-3.5 text-[#087F5B]" />
              <span>100% Offline-First Digital Register for ASHA Workers</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#17231E] leading-[1.15] text-balance">
              Care that goes everywhere.
            </h1>

            <p className="text-base sm:text-lg text-[#78857E] leading-relaxed">
              One simple platform to help community health workers keep every family’s health records
              connected, organized, and accessible — even in areas with zero cellular connectivity.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
              <Button
                variant="primary"
                size="lg"
                onClick={() => navigate('dashboard')}
                rightIcon={<ArrowRight className="w-4 h-4" />}
                className="w-full sm:w-auto font-bold"
              >
                Launch ASHA Portal (Demo)
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => {
                  const el = document.getElementById('features-section');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="w-full sm:w-auto"
              >
                Explore Features
              </Button>
            </div>

            {/* Quick trust metrics */}
            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-[#E2EAE5]">
              <div>
                <p className="text-2xl font-extrabold font-mono text-[#087F5B] tabular-nums">48</p>
                <p className="text-xs text-[#78857E]">Households Tracked</p>
              </div>
              <div>
                <p className="text-2xl font-extrabold font-mono text-[#087F5B] tabular-nums">100%</p>
                <p className="text-xs text-[#78857E]">Works Without Net</p>
              </div>
              <div>
                <p className="text-2xl font-extrabold font-mono text-[#087F5B] tabular-nums">10</p>
                <p className="text-xs text-[#78857E]">Indian Languages</p>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual with Real Documentary Photograph & Floating Feature Cards */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-3xl overflow-hidden border border-[#E2EAE5] shadow-[0_12px_40px_rgba(8,127,91,0.08)] bg-[#E8F5EF]/30 aspect-[16/10] sm:aspect-[16/10]">
              <img
                src="/src/assets/images/asha_worker_rural_mother_1793344192729.jpg"
                alt="Indian ASHA community health worker holding tablet and counseling rural mother and child"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />

              {/* Floating Card 1: Family Registered */}
              <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md rounded-2xl p-3 shadow-md border border-white/60 max-w-[210px] hidden xs:block animate-fade-in">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-[#E8F5EF] text-[#087F5B] flex items-center justify-center shrink-0">
                    <Users className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-[11px] font-bold text-[#17231E]">Yadav Family</p>
                    <p className="text-[10px] text-[#78857E]">HH-RAM-014 · 4 Members</p>
                  </div>
                </div>
              </div>

              {/* Floating Card 2: Vaccination Due */}
              <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-md rounded-2xl p-3 shadow-md border border-white/60 max-w-[240px] animate-fade-in">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center shrink-0 border border-amber-200">
                    <AlertCircle className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-amber-700 tracking-wider">
                      Vaccine Due (Oct 31)
                    </span>
                    <p className="text-xs font-bold text-[#17231E] truncate">Ananya Sharma (6 Wks)</p>
                    <p className="text-[10px] text-[#78857E]">Pentavalent-1 & Rota-1</p>
                  </div>
                </div>
              </div>

              {/* Floating Card 3: Maternal Follow-up */}
              <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-md rounded-2xl p-3 shadow-md border border-white/60 max-w-[210px] hidden sm:block animate-fade-in">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-[#E8F5EF] text-[#087F5B] flex items-center justify-center shrink-0">
                    <HeartPulse className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-[11px] font-bold text-[#17231E]">Meena Yadav</p>
                    <p className="text-[10px] text-[#087F5B] font-semibold">ANC-4 Check Scheduled</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. WHY SWASTHYASAATHI — PAPER REGISTERS VS DIGITAL SWASTHYASAATHI */}
      <section className="space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="text-xs font-bold uppercase tracking-wider text-[#087F5B]">
            Solving the Rural Healthcare Bottleneck
          </h2>
          <h3 className="text-2xl sm:text-3xl font-bold text-[#17231E]">
            Why Community Health Workers Need an Offline-First Platform
          </h3>
          <p className="text-sm text-[#78857E]">
            Over 1 million ASHA workers in India visit up to 50 households daily, juggling heavy paper registers under harsh weather and unreliable cellular networks.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Card: The Paper Register Problem */}
          <Card variant="ivory" padding="lg" className="border-red-200 bg-red-50/20 space-y-4">
            <div className="flex items-center gap-2 text-rose-800 font-bold text-sm">
              <AlertCircle className="w-4 h-4" />
              <span>The Pain of Traditional Paper Registers</span>
            </div>
            <ul className="space-y-3 text-xs text-[#17231E]">
              <li className="flex items-start gap-2">
                <span className="text-rose-600 font-bold">✕</span>
                <span>Paper registers get torn, water-damaged during monsoons, or lost in transit.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-600 font-bold">✕</span>
                <span>Calculating child immunization schedules across multiple registers leads to missed doses.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-600 font-bold">✕</span>
                <span>Cloud-only apps fail the moment a health worker enters a remote hamlet or basement room.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-600 font-bold">✕</span>
                <span>Manual monthly reporting to PHCs takes days of tedious tallying by hand.</span>
              </li>
            </ul>
          </Card>

          {/* Card: The SwasthyaSaathi Solution */}
          <Card variant="mint" padding="lg" className="border-[#bfe3d4] space-y-4">
            <div className="flex items-center gap-2 text-[#075C45] font-bold text-sm">
              <CheckCircle2 className="w-4 h-4 text-[#087F5B]" />
              <span>The SwasthyaSaathi Advantage</span>
            </div>
            <ul className="space-y-3 text-xs text-[#17231E]">
              <li className="flex items-start gap-2">
                <span className="text-[#087F5B] font-bold">✓</span>
                <span><strong>Instant Local Persistence:</strong> Every family, visit, and vaccine saves immediately into local device storage.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#087F5B] font-bold">✓</span>
                <span><strong>Automated Due Schedules:</strong> Visual tracking for maternal ANC visits and universal childhood immunization.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#087F5B] font-bold">✓</span>
                <span><strong>Saathi AI Assistance:</strong> Gemini AI summarizes family histories and formats follow-up notes without hallucinations.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#087F5B] font-bold">✓</span>
                <span><strong>Seamless Background Sync:</strong> Changes automatically sync to the server when network connectivity returns.</span>
              </li>
            </ul>
          </Card>
        </div>
      </section>

      {/* 3. KEY FEATURES WITH REAL PHOTOGRAPHS */}
      <section id="features-section" className="space-y-10">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="text-xs font-bold uppercase tracking-wider text-[#087F5B]">
            Platform Capabilities
          </h2>
          <h3 className="text-2xl sm:text-3xl font-bold text-[#17231E]">
            Built Specifically for Community Health Workflows
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Feature 1: Household Visits */}
          <div className="bg-white rounded-2xl border border-[#E2EAE5] overflow-hidden flex flex-col hover:border-[#087F5B]/30 transition-all shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
            <div className="aspect-[4/3] bg-slate-100 overflow-hidden relative">
              <img
                src="/src/assets/images/rural_health_visit_1793344193819.jpg"
                alt="Community health worker visiting rural Indian family"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
              <div className="space-y-1.5">
                <span className="text-[11px] font-bold text-[#087F5B] uppercase tracking-wider">
                  Field Workflow
                </span>
                <h4 className="text-base font-bold text-[#17231E]">Household Visit Management</h4>
                <p className="text-xs text-[#78857E] leading-relaxed">
                  Log home visits, capture observations, track chronic conditions, and schedule next follow-ups in seconds.
                </p>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigate('visits')}
                rightIcon={<ChevronRight className="w-3.5 h-3.5" />}
                className="w-full justify-between"
              >
                View Visit Module
              </Button>
            </div>
          </div>

          {/* Feature 2: Maternal Health */}
          <div className="bg-white rounded-2xl border border-[#E2EAE5] overflow-hidden flex flex-col hover:border-[#087F5B]/30 transition-all shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
            <div className="aspect-[4/3] bg-slate-100 overflow-hidden relative">
              <img
                src="/src/assets/images/maternal_health_guidance_1793344194091.jpg"
                alt="ASHA worker providing prenatal maternal nutrition counseling"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
              <div className="space-y-1.5">
                <span className="text-[11px] font-bold text-[#087F5B] uppercase tracking-wider">
                  Antenatal Care
                </span>
                <h4 className="text-base font-bold text-[#17231E]">Maternal Health Tracking</h4>
                <p className="text-xs text-[#78857E] leading-relaxed">
                  Track trimesters, EDD countdowns, ANC check-ups, IFA tablet distribution, and high-risk flags like anemia.
                </p>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigate('maternal')}
                rightIcon={<ChevronRight className="w-3.5 h-3.5" />}
                className="w-full justify-between"
              >
                View Maternal Module
              </Button>
            </div>
          </div>

          {/* Feature 3: Child Vaccinations */}
          <div className="bg-white rounded-2xl border border-[#E2EAE5] overflow-hidden flex flex-col hover:border-[#087F5B]/30 transition-all shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
            <div className="aspect-[4/3] bg-slate-100 overflow-hidden relative">
              <img
                src="/src/assets/images/child_vaccination_session_1793344194169.jpg"
                alt="Infant receiving routine vaccination at rural health center"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
              <div className="space-y-1.5">
                <span className="text-[11px] font-bold text-[#087F5B] uppercase tracking-wider">
                  Immunization
                </span>
                <h4 className="text-base font-bold text-[#17231E]">Universal Vaccine Tracker</h4>
                <p className="text-xs text-[#78857E] leading-relaxed">
                  Categorized by Birth, 6 Weeks, 10 Weeks, 14 Weeks, and 9-12 Months. Instant alerts for due and overdue doses.
                </p>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigate('vaccination')}
                rightIcon={<ChevronRight className="w-3.5 h-3.5" />}
                className="w-full justify-between"
              >
                View Vaccine Module
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* 4. SAATHI AI SPOTLIGHT */}
      <section className="bg-gradient-to-br from-[#075C45] to-[#087F5B] text-white rounded-3xl p-6 sm:p-10 shadow-lg">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-xs font-semibold backdrop-blur-xs">
              <Sparkles className="w-4 h-4 text-emerald-300" />
              <span>Powered by Google Gemini</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Meet Saathi AI — Your Community Healthcare Assistant
            </h3>
            <p className="text-sm text-emerald-100 leading-relaxed">
              Designed specifically to assist ASHA workers by summarizing complex family records, identifying missing follow-ups, and structuring home visit notes into quick action items.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs">
              <div className="p-3 rounded-xl bg-white/10 backdrop-blur-xs border border-white/10">
                <p className="font-bold">✓ Record-Grounded Summaries</p>
                <p className="text-emerald-100 text-[11px] mt-0.5">
                  Answers based solely on stored records. Zero hallucinations.
                </p>
              </div>
              <div className="p-3 rounded-xl bg-white/10 backdrop-blur-xs border border-white/10">
                <p className="font-bold">✓ AI Safety Guardrails</p>
                <p className="text-emerald-100 text-[11px] mt-0.5">
                  Strictly non-diagnostic; never prescribes medications.
                </p>
              </div>
              <div className="p-3 rounded-xl bg-white/10 backdrop-blur-xs border border-white/10">
                <p className="font-bold">✓ Voice & Audio Support</p>
                <p className="text-emerald-100 text-[11px] mt-0.5">
                  Voice input dictation and speech output for field convenience.
                </p>
              </div>
              <div className="p-3 rounded-xl bg-white/10 backdrop-blur-xs border border-white/10">
                <p className="font-bold">✓ Multilingual Understanding</p>
                <p className="text-emerald-100 text-[11px] mt-0.5">
                  Communicates naturally in Hindi, Bengali, Tamil, Telugu, and more.
                </p>
              </div>
            </div>
            <div className="pt-2">
              <Button
                variant="outline"
                size="md"
                onClick={() => navigate('saathi-ai')}
                className="bg-white text-[#075C45] hover:bg-[#F8FAF8] border-none font-bold"
              >
                Try Saathi AI Assistant
              </Button>
            </div>
          </div>

          {/* Interactive Chat Sample Preview */}
          <div className="lg:col-span-5 bg-white text-[#17231E] rounded-2xl p-4 sm:p-5 shadow-xl border border-[#E2EAE5] space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-[#E2EAE5]">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-[#087F5B] text-white flex items-center justify-center">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-bold">Saathi AI Preview</p>
                  <p className="text-[10px] text-[#78857E]">Grounded in Rampur Records</p>
                </div>
              </div>
              <Badge variant="success" size="sm">
                Safety Verified
              </Badge>
            </div>

            <div className="space-y-2 text-xs">
              <div className="bg-[#F8FAF8] p-2.5 rounded-xl border border-[#E2EAE5]">
                <p className="text-[11px] font-semibold text-[#78857E]">ASHA Worker:</p>
                <p className="text-xs font-medium text-[#17231E]">
                  "Summarize Meena Yadav's pregnancy record and next follow-up."
                </p>
              </div>
              <div className="bg-[#E8F5EF] p-2.5 rounded-xl border border-[#d0e8dd] space-y-1">
                <p className="text-[11px] font-semibold text-[#075C45]">Saathi AI:</p>
                <p className="text-xs text-[#075C45] leading-relaxed">
                  Meena Yadav (HH-RAM-014) is in her 3rd trimester (EDD: 09 Dec 2026). She completed 3 ANC visits. 180 IFA tablets distributed. Blood pressure was normal (118/76) on 24 Oct. Next ANC-4 check is scheduled for <strong>02 November 2026</strong>.
                </p>
                <div className="pt-1 text-[10px] text-[#075C45]/80">
                  Source: Maternal Registry & Household Visit Log
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. FINAL CALL TO ACTION */}
      <section className="text-center bg-[#E8F5EF] rounded-3xl p-8 sm:p-12 border border-[#bfe3d4] space-y-4">
        <h3 className="text-2xl sm:text-3xl font-extrabold text-[#075C45]">
          Ready to experience the future of rural community health?
        </h3>
        <p className="text-sm text-[#075C45]/80 max-w-xl mx-auto">
          Explore the working ASHA portal with realistic demo records, simulate offline airplane mode, and interact with Saathi AI.
        </p>
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Button
            variant="primary"
            size="lg"
            onClick={() => navigate('dashboard')}
            rightIcon={<ArrowRight className="w-4 h-4" />}
            className="w-full sm:w-auto font-bold"
          >
            Launch Demo Portal
          </Button>
          <Button
            variant="outline"
            size="lg"
            onClick={() => navigate('families')}
            className="w-full sm:w-auto bg-white"
          >
            Explore Family Registers
          </Button>
        </div>
      </section>
    </div>
  );
};
