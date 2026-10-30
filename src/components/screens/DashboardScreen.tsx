/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  Users,
  CalendarCheck,
  ShieldPlus,
  HeartPulse,
  Plus,
  ArrowRight,
  AlertCircle,
  CheckCircle2,
  Clock,
  Sparkles,
  ChevronRight,
  Calendar,
  Phone,
  MapPin,
} from 'lucide-react';
import { useNavigation } from '../../context/NavigationContext';
import { useLanguage } from '../../context/LanguageContext';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { SafeImage } from '../ui/SafeImage';
import {
  mockAshaProfile,
  mockHouseholds,
  mockMembers,
  mockMaternalRecords,
  mockVaccinations,
  mockHouseholdVisits,
  mockFollowUpTasks,
} from '../../data/mockData';

export const DashboardScreen: React.FC = () => {
  const { navigate } = useNavigation();
  const { t } = useLanguage();
  const [tasks, setTasks] = useState(mockFollowUpTasks);

  const toggleTask = (taskId: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const dueVaccinesCount = mockVaccinations.filter(
    (v) => v.status === 'Due' || v.status === 'Overdue'
  ).length;

  return (
    <div className="space-y-6 sm:space-y-8 pb-12">
      {/* 1. WELCOME BANNER & WORKER TERRITORY */}
      <div className="bg-white rounded-3xl p-5 sm:p-7 border border-[#E2EAE5] shadow-[0_2px_12px_rgba(0,0,0,0.03)] flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl overflow-hidden border border-[#bfe3d4] shrink-0 bg-[#E8F5EF] shadow-2xs">
            <SafeImage
              src="/images/asha-worker-mother.jpg"
              alt="ASHA Worker Sunita Devi"
              className="w-full h-full object-cover object-[70%_20%]"
            />
          </div>
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#087F5B]">
              <HeartPulse className="w-4 h-4" />
              <span>Community Health Register</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-[#17231E]">
              Namaste, {mockAshaProfile.name}
            </h1>
            <div className="flex flex-wrap items-center gap-y-1 gap-x-3 text-xs text-[#78857E]">
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-[#087F5B]" />
                {mockAshaProfile.village} ({mockAshaProfile.subCenter})
              </span>
              <span aria-hidden="true">·</span>
              <span>ID: {mockAshaProfile.workerId}</span>
              <span aria-hidden="true">·</span>
              <span>{mockAshaProfile.district}, {mockAshaProfile.state}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <Button
            variant="secondary"
            size="md"
            onClick={() => navigate('saathi-ai')}
            leftIcon={<Sparkles className="w-4 h-4 text-[#087F5B]" />}
            className="font-semibold"
          >
            Ask Saathi AI
          </Button>
          <Button
            variant="primary"
            size="md"
            onClick={() => navigate('add-family')}
            leftIcon={<Plus className="w-4 h-4" />}
            className="font-bold shadow-xs"
          >
            + Register Family
          </Button>
        </div>
      </div>

      {/* 2. CORE STATS CARDS (Apple minimal styling) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {/* Stat 1: Registered Families */}
        <Card
          variant="default"
          padding="md"
          interactive
          onClick={() => navigate('families')}
          className="flex flex-col justify-between h-32"
        >
          <div className="flex items-center justify-between text-[#78857E]">
            <span className="text-xs font-semibold">Registered Families</span>
            <div className="w-7 h-7 rounded-lg bg-[#E8F5EF] text-[#087F5B] flex items-center justify-center">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div>
            <span className="text-2xl sm:text-3xl font-extrabold font-mono text-[#17231E] tabular-nums">
              {mockAshaProfile.assignedHouseholdsCount}
            </span>
            <p className="text-[11px] text-[#78857E] mt-0.5">192 Total Members</p>
          </div>
        </Card>

        {/* Stat 2: Upcoming Visits */}
        <Card
          variant="default"
          padding="md"
          interactive
          onClick={() => navigate('visits')}
          className="flex flex-col justify-between h-32"
        >
          <div className="flex items-center justify-between text-[#78857E]">
            <span className="text-xs font-semibold">Scheduled Visits</span>
            <div className="w-7 h-7 rounded-lg bg-sky-50 text-sky-700 flex items-center justify-center">
              <CalendarCheck className="w-4 h-4" />
            </div>
          </div>
          <div>
            <span className="text-2xl sm:text-3xl font-extrabold font-mono text-sky-800 tabular-nums">
              3
            </span>
            <p className="text-[11px] text-[#78857E] mt-0.5">Due in next 7 days</p>
          </div>
        </Card>

        {/* Stat 3: Vaccinations Due */}
        <Card
          variant="default"
          padding="md"
          interactive
          onClick={() => navigate('vaccination')}
          className="flex flex-col justify-between h-32"
        >
          <div className="flex items-center justify-between text-[#78857E]">
            <span className="text-xs font-semibold">Vaccines Due</span>
            <div className="w-7 h-7 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center">
              <ShieldPlus className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-2xl sm:text-3xl font-extrabold font-mono text-amber-800 tabular-nums">
                {dueVaccinesCount}
              </span>
              <span className="text-xs text-rose-600 font-bold">(1 Overdue)</span>
            </div>
            <p className="text-[11px] text-[#78857E] mt-0.5">Infants & Toddlers</p>
          </div>
        </Card>

        {/* Stat 4: Maternal Health */}
        <Card
          variant="default"
          padding="md"
          interactive
          onClick={() => navigate('maternal')}
          className="flex flex-col justify-between h-32"
        >
          <div className="flex items-center justify-between text-[#78857E]">
            <span className="text-xs font-semibold">Active Maternal</span>
            <div className="w-7 h-7 rounded-lg bg-rose-50 text-rose-700 flex items-center justify-center">
              <HeartPulse className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-2xl sm:text-3xl font-extrabold font-mono text-[#087F5B] tabular-nums">
                {mockAshaProfile.activeMaternalCount}
              </span>
              <span className="text-xs text-amber-700 font-bold">(1 High Risk)</span>
            </div>
            <p className="text-[11px] text-[#78857E] mt-0.5">Antenatal Tracking</p>
          </div>
        </Card>
      </div>

      {/* 3. WORKING QUICK ACTIONS BAR */}
      <div className="bg-[#E8F5EF] rounded-2xl p-4 sm:p-5 border border-[#bfe3d4]">
        <h3 className="text-xs font-bold text-[#075C45] uppercase tracking-wider mb-3">
          Field Quick Actions
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          <Button
            variant="outline"
            size="md"
            onClick={() => navigate('add-family')}
            leftIcon={<Plus className="w-4 h-4 text-[#087F5B]" />}
            className="bg-white justify-start font-semibold shadow-2xs text-left"
          >
            Add New Family
          </Button>
          <Button
            variant="outline"
            size="md"
            onClick={() => navigate('visits')}
            leftIcon={<CalendarCheck className="w-4 h-4 text-[#087F5B]" />}
            className="bg-white justify-start font-semibold shadow-2xs text-left"
          >
            Record Home Visit
          </Button>
          <Button
            variant="outline"
            size="md"
            onClick={() => navigate('maternal')}
            leftIcon={<HeartPulse className="w-4 h-4 text-[#087F5B]" />}
            className="bg-white justify-start font-semibold shadow-2xs text-left"
          >
            Maternal ANC Entry
          </Button>
          <Button
            variant="outline"
            size="md"
            onClick={() => navigate('vaccination')}
            leftIcon={<ShieldPlus className="w-4 h-4 text-[#087F5B]" />}
            className="bg-white justify-start font-semibold shadow-2xs text-left"
          >
            Update Vaccination
          </Button>
        </div>
      </div>

      {/* 4. TWO-COLUMN SPLIT: PRIORITY TASKS & RECENT TIMELINE */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Priority Follow-Up Tasks */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold text-[#17231E]">Priority Follow-up Tasks</h2>
              <span className="text-xs px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 font-bold font-mono">
                {tasks.filter((t) => !t.completed).length} Pending
              </span>
            </div>
            <button
              onClick={() => navigate('visits')}
              className="text-xs font-semibold text-[#087F5B] hover:underline"
            >
              View Schedule →
            </button>
          </div>

          <div className="space-y-2.5">
            {tasks.map((task) => (
              <div
                key={task.id}
                className={`p-3.5 rounded-xl border transition-all ${
                  task.completed
                    ? 'bg-slate-50 border-slate-200 opacity-60'
                    : task.isHighPriority
                    ? 'bg-white border-amber-300 shadow-2xs'
                    : 'bg-white border-[#E2EAE5]'
                }`}
              >
                <div className="flex items-start gap-3">
                  <button
                    onClick={() => toggleTask(task.id)}
                    className={`mt-0.5 w-5 h-5 rounded-md border flex items-center justify-center transition-colors shrink-0 ${
                      task.completed
                        ? 'bg-[#087F5B] border-[#087F5B] text-white'
                        : 'border-slate-300 bg-white hover:border-[#087F5B]'
                    }`}
                    aria-label="Toggle task completion"
                  >
                    {task.completed && <CheckCircle2 className="w-3.5 h-3.5" />}
                  </button>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <p
                        className={`text-xs font-bold ${
                          task.completed ? 'line-through text-slate-500' : 'text-[#17231E]'
                        }`}
                      >
                        {task.title}
                      </p>
                      {task.isHighPriority && !task.completed && (
                        <span className="text-[10px] uppercase font-bold text-rose-700 bg-rose-50 px-1.5 py-0.5 rounded border border-rose-200">
                          Urgent
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-[#78857E] mt-0.5">{task.description}</p>
                    <div className="flex items-center gap-3 text-[11px] text-[#78857E] mt-1.5">
                      <span className="font-medium text-[#17231E]">{task.beneficiaryName}</span>
                      <span>·</span>
                      <span className="font-mono">{task.householdCode}</span>
                      <span>·</span>
                      <span className="text-amber-800 font-semibold">Due: {task.dueDate}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Recent Household Activity Feed */}
        <div className="lg:col-span-5 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-[#17231E]">Recent Visit Logs</h2>
            <button
              onClick={() => navigate('visits')}
              className="text-xs font-semibold text-[#087F5B] hover:underline"
            >
              All Logs →
            </button>
          </div>

          <div className="bg-white rounded-2xl border border-[#E2EAE5] divide-y divide-[#E2EAE5]">
            {mockHouseholdVisits.map((visit) => (
              <div key={visit.id} className="p-4 space-y-2 hover:bg-[#F8FAF8] transition-colors">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-[#17231E]">{visit.familyName}</span>
                  <span className="font-mono text-[#78857E] text-[11px]">{visit.visitDate}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="info" size="sm">
                    {visit.purpose}
                  </Badge>
                  <span className="text-[11px] text-[#78857E] truncate">
                    Beneficiary: {visit.memberName}
                  </span>
                </div>
                <p className="text-xs text-[#78857E] leading-relaxed line-clamp-2">
                  {visit.observations}
                </p>
                <div className="flex items-center justify-between text-[11px] pt-1">
                  <span className="text-[#087F5B] font-semibold">
                    Next visit: {visit.nextVisitDate}
                  </span>
                  <button
                    onClick={() => navigate('family-detail', { id: visit.householdId })}
                    className="text-[#78857E] hover:text-[#17231E] flex items-center gap-0.5 font-medium"
                  >
                    <span>View Family</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
