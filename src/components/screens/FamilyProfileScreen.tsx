/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  Users,
  MapPin,
  Phone,
  ArrowLeft,
  CalendarCheck,
  HeartPulse,
  Baby,
  ShieldPlus,
  Plus,
  Sparkles,
  ChevronRight,
  Clock,
  Activity,
} from 'lucide-react';
import { useNavigation } from '../../context/NavigationContext';
import { useLanguage } from '../../context/LanguageContext';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import {
  mockHouseholds,
  mockMembers,
  mockHouseholdVisits,
  mockMaternalRecords,
  mockVaccinations,
} from '../../data/mockData';

export const FamilyProfileScreen: React.FC = () => {
  const { navigate, goBack, screenParams } = useNavigation();
  const { t } = useLanguage();

  const familyId = (screenParams.id as string) || 'hh-001';
  const family = mockHouseholds.find((h) => h.id === familyId) || mockHouseholds[0];
  const members = mockMembers.filter((m) => m.householdId === family.id);
  const visits = mockHouseholdVisits.filter((v) => v.householdId === family.id);
  const maternalRecord = mockMaternalRecords.find((m) => m.householdId === family.id);
  const vaccinations = mockVaccinations.filter((v) => v.householdId === family.id);

  const [activeTab, setActiveTab] = useState<'members' | 'visits' | 'health'>('members');

  return (
    <div className="space-y-6 pb-12">
      {/* Header Back & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" onClick={goBack} leftIcon={<ArrowLeft className="w-4 h-4" />}>
            Back
          </Button>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-bold text-[#17231E]">
                {family.familyName}
              </h1>
              <span className="font-mono text-xs px-2 py-0.5 rounded-md bg-white border border-[#E2EAE5] text-[#78857E]">
                {family.householdId}
              </span>
            </div>
            <p className="text-xs text-[#78857E]">
              Head of Household: <strong className="text-[#17231E]">{family.headName}</strong> · Village {family.village}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => navigate('saathi-ai')}
            leftIcon={<Sparkles className="w-4 h-4 text-[#087F5B]" />}
          >
            Ask Saathi AI
          </Button>
          <Button
            variant="primary"
            size="sm"
            onClick={() => navigate('visits')}
            leftIcon={<CalendarCheck className="w-4 h-4" />}
          >
            + Log Visit
          </Button>
        </div>
      </div>

      {/* Household Overview Summary Card */}
      <Card variant="default" padding="md" className="space-y-4">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
          <div>
            <span className="text-[#78857E] block text-[11px]">Village / Sub-Center</span>
            <span className="font-bold text-[#17231E]">{family.village} ({family.subCenter})</span>
          </div>
          <div>
            <span className="text-[#78857E] block text-[11px]">Address</span>
            <span className="font-bold text-[#17231E]">{family.address}</span>
          </div>
          <div>
            <span className="text-[#78857E] block text-[11px]">Primary Contact</span>
            <span className="font-bold font-mono text-[#17231E]">{family.contactNumber}</span>
          </div>
          <div>
            <span className="text-[#78857E] block text-[11px]">Ration Scheme</span>
            <Badge variant="neutral" size="sm">{family.rationCardType || 'BPL'} Card</Badge>
          </div>
        </div>
      </Card>

      {/* Segmented Tabs: Members, Visits, Health Registry */}
      <div className="flex items-center gap-2 border-b border-[#E2EAE5] pb-2 text-xs font-semibold">
        <button
          onClick={() => setActiveTab('members')}
          className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 ${
            activeTab === 'members'
              ? 'bg-[#087F5B] text-white'
              : 'text-[#78857E] hover:text-[#17231E]'
          }`}
        >
          <Users className="w-3.5 h-3.5" />
          <span>Family Members ({members.length})</span>
        </button>
        <button
          onClick={() => setActiveTab('visits')}
          className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 ${
            activeTab === 'visits'
              ? 'bg-[#087F5B] text-white'
              : 'text-[#78857E] hover:text-[#17231E]'
          }`}
        >
          <CalendarCheck className="w-3.5 h-3.5" />
          <span>Visit History ({visits.length})</span>
        </button>
        <button
          onClick={() => setActiveTab('health')}
          className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 ${
            activeTab === 'health'
              ? 'bg-[#087F5B] text-white'
              : 'text-[#78857E] hover:text-[#17231E]'
          }`}
        >
          <HeartPulse className="w-3.5 h-3.5" />
          <span>Maternal & Vaccines ({vaccinations.length})</span>
        </button>
      </div>

      {/* Tab 1: Family Members List */}
      {activeTab === 'members' && (
        <div className="space-y-3">
          {members.map((member) => (
            <Card key={member.id} variant="default" padding="md" className="space-y-2">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#E8F5EF] text-[#075C45] flex items-center justify-center font-bold text-sm shrink-0">
                    {member.name.charAt(0)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-bold text-[#17231E]">{member.name}</h3>
                      <span className="text-xs text-[#78857E]">({member.relationship})</span>
                      {member.bloodGroup && (
                        <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-slate-100 text-slate-700">
                          {member.bloodGroup}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-[#78857E]">
                      {member.gender} · {member.age} Years {member.dateOfBirth ? `(DOB: ${member.dateOfBirth})` : ''}
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  {member.isPregnant && (
                    <Badge variant="success" size="sm" icon={<HeartPulse className="w-3 h-3" />}>
                      3rd Trimester (ANC Active)
                    </Badge>
                  )}
                  {member.chronicConditions && member.chronicConditions.length > 0 && (
                    <Badge variant="warning" size="sm" icon={<Activity className="w-3 h-3" />}>
                      {member.chronicConditions.join(', ')}
                    </Badge>
                  )}
                </div>
              </div>

              {member.notes && (
                <p className="text-xs text-[#78857E] bg-[#F8FAF8] p-2.5 rounded-xl border border-[#E2EAE5]">
                  <strong className="text-[#17231E]">Health Notes:</strong> {member.notes}
                </p>
              )}
            </Card>
          ))}

          {members.length === 0 && (
            <div className="p-8 text-center bg-white rounded-2xl border border-[#E2EAE5] text-xs text-[#78857E]">
              No individual members registered yet under this household.
            </div>
          )}
        </div>
      )}

      {/* Tab 2: Household Visit History */}
      {activeTab === 'visits' && (
        <div className="space-y-3">
          {visits.map((visit) => (
            <Card key={visit.id} variant="default" padding="md" className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-[#17231E]">{visit.purpose}</span>
                <span className="font-mono text-[#78857E]">{visit.visitDate}</span>
              </div>
              <p className="text-xs text-[#78857E]">
                <strong className="text-[#17231E]">Observations:</strong> {visit.observations}
              </p>
              <p className="text-xs text-[#075C45] bg-[#E8F5EF] p-2 rounded-lg font-medium">
                Action: {visit.actionsTaken}
              </p>
              <div className="flex items-center justify-between text-[11px] text-[#78857E] pt-1">
                <span>Follow-up scheduled: <strong className="text-[#087F5B]">{visit.nextVisitDate}</strong></span>
                <span>ASHA: {visit.ashaWorker}</span>
              </div>
            </Card>
          ))}

          {visits.length === 0 && (
            <div className="p-8 text-center bg-white rounded-2xl border border-[#E2EAE5] text-xs text-[#78857E]">
              No visits recorded yet for this family.
            </div>
          )}
        </div>
      )}

      {/* Tab 3: Maternal & Vaccination Tracker for this family */}
      {activeTab === 'health' && (
        <div className="space-y-4">
          {maternalRecord && (
            <Card variant="mint" padding="md" className="border-[#bfe3d4] space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <HeartPulse className="w-5 h-5 text-[#087F5B]" />
                  <h3 className="text-sm font-bold text-[#075C45]">
                    Maternal Health Record: {maternalRecord.beneficiaryName}
                  </h3>
                </div>
                <Badge variant="success" size="sm">
                  {maternalRecord.currentTrimester} Trimester
                </Badge>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                <div>
                  <span className="text-[#78857E] block text-[11px]">Estimated Delivery</span>
                  <span className="font-bold text-[#17231E]">{maternalRecord.estimatedDeliveryDate}</span>
                </div>
                <div>
                  <span className="text-[#78857E] block text-[11px]">ANC Visits</span>
                  <span className="font-bold text-[#17231E]">{maternalRecord.ancVisitsCompleted} / {maternalRecord.totalAncRequired}</span>
                </div>
                <div>
                  <span className="text-[#78857E] block text-[11px]">IFA Tablets</span>
                  <span className="font-bold text-[#17231E]">{maternalRecord.ironFolicAcidTabletsGiven} Distributed</span>
                </div>
                <div>
                  <span className="text-[#78857E] block text-[11px]">Next Follow-up</span>
                  <span className="font-bold text-[#087F5B]">{maternalRecord.nextFollowUpDate}</span>
                </div>
              </div>
              <p className="text-xs text-[#075C45]">{maternalRecord.workerNotes}</p>
            </Card>
          )}

          <div className="space-y-2">
            <h4 className="text-xs font-bold text-[#17231E] uppercase tracking-wider">
              Child Immunization Records
            </h4>
            {vaccinations.map((vac) => (
              <Card key={vac.id} variant="default" padding="sm" className="flex items-center justify-between text-xs">
                <div>
                  <span className="font-bold text-[#17231E]">{vac.vaccineName} (Dose {vac.doseNumber})</span>
                  <p className="text-[11px] text-[#78857E]">{vac.beneficiaryName} · {vac.ageGroup}</p>
                </div>
                <Badge variant={vac.status === 'Completed' ? 'success' : vac.status === 'Overdue' ? 'danger' : 'warning'} size="sm">
                  {vac.status} ({vac.administeredDate || `Due: ${vac.scheduledDueDate}`})
                </Badge>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
