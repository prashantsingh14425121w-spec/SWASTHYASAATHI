/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  CalendarCheck,
  Plus,
  Search,
  Filter,
  Clock,
  CheckCircle2,
  AlertCircle,
  MapPin,
  HeartPulse,
  User,
} from 'lucide-react';
import { useNavigation } from '../../context/NavigationContext';
import { useOffline } from '../../context/OfflineContext';
import { useLanguage } from '../../context/LanguageContext';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Input, Textarea } from '../ui/Input';
import { Modal } from '../ui/Modal';
import { mockHouseholdVisits, mockHouseholds } from '../../data/mockData';
import { HouseholdVisit, VisitPurpose } from '../../types';

export const VisitsScreen: React.FC = () => {
  const { navigate } = useNavigation();
  const { queueOfflineAction } = useOffline();
  const { t } = useLanguage();

  const [visits, setVisits] = useState<HouseholdVisit[]>(mockHouseholdVisits);
  const [filterPurpose, setFilterPurpose] = useState<string>('all');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form states
  const [selectedHouseholdId, setSelectedHouseholdId] = useState(mockHouseholds[0].id);
  const [memberName, setMemberName] = useState('Meena Yadav');
  const [purpose, setPurpose] = useState<VisitPurpose>('Antenatal Check-up');
  const [observations, setObservations] = useState('');
  const [actionsTaken, setActionsTaken] = useState('');
  const [nextVisitDate, setNextVisitDate] = useState(
    new Date(Date.now() + 7 * 86400000).toISOString().split('T')[0]
  );

  const filteredVisits = visits.filter((v) => {
    if (filterPurpose === 'all') return true;
    return v.purpose === filterPurpose;
  });

  const handleCreateVisit = (e: React.FormEvent) => {
    e.preventDefault();
    const household = mockHouseholds.find((h) => h.id === selectedHouseholdId) || mockHouseholds[0];

    const newVisit: HouseholdVisit = {
      id: `vis-${Date.now()}`,
      householdId: household.id,
      householdCode: household.householdId,
      familyName: household.familyName,
      village: household.village,
      memberName: memberName || household.headName,
      visitDate: new Date().toISOString().split('T')[0],
      purpose,
      observations: observations || 'Routine home observation conducted. Beneficiary in good spirits.',
      actionsTaken: actionsTaken || 'Provided health counseling and reviewed immunization timeline.',
      nextVisitDate,
      ashaWorker: 'Sunita Devi',
      status: 'Completed',
      isOfflineSyncPending: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setVisits([newVisit, ...visits]);
    queueOfflineAction({
      entityType: 'visit',
      action: 'create',
      payload: newVisit,
    });

    setIsModalOpen(false);
    setObservations('');
    setActionsTaken('');
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header & Primary Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-[#17231E]">
            {t('visits')}
          </h1>
          <p className="text-xs text-[#78857E]">
            Track household visits, record field observations, and schedule follow-ups.
          </p>
        </div>
        <Button
          variant="primary"
          size="md"
          onClick={() => setIsModalOpen(true)}
          leftIcon={<Plus className="w-4 h-4" />}
          className="font-bold shadow-xs shrink-0"
        >
          + Record Home Visit
        </Button>
      </div>

      {/* Purpose Filter Bar */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
        <button
          onClick={() => setFilterPurpose('all')}
          className={`px-3 py-1.5 rounded-lg font-medium transition-colors whitespace-nowrap shrink-0 ${
            filterPurpose === 'all'
              ? 'bg-[#087F5B] text-white shadow-xs'
              : 'bg-white border border-[#E2EAE5] text-[#17231E] hover:bg-[#F8FAF8]'
          }`}
        >
          All Visits ({visits.length})
        </button>
        <button
          onClick={() => setFilterPurpose('Antenatal Check-up')}
          className={`px-3 py-1.5 rounded-lg font-medium transition-colors whitespace-nowrap shrink-0 ${
            filterPurpose === 'Antenatal Check-up'
              ? 'bg-[#087F5B] text-white shadow-xs'
              : 'bg-white border border-[#E2EAE5] text-[#17231E] hover:bg-[#F8FAF8]'
          }`}
        >
          Antenatal Check-ups
        </button>
        <button
          onClick={() => setFilterPurpose('Immunization Mobilization')}
          className={`px-3 py-1.5 rounded-lg font-medium transition-colors whitespace-nowrap shrink-0 ${
            filterPurpose === 'Immunization Mobilization'
              ? 'bg-[#087F5B] text-white shadow-xs'
              : 'bg-white border border-[#E2EAE5] text-[#17231E] hover:bg-[#F8FAF8]'
          }`}
        >
          Immunization Mobilization
        </button>
        <button
          onClick={() => setFilterPurpose('Child Health & Nutrition')}
          className={`px-3 py-1.5 rounded-lg font-medium transition-colors whitespace-nowrap shrink-0 ${
            filterPurpose === 'Child Health & Nutrition'
              ? 'bg-[#087F5B] text-white shadow-xs'
              : 'bg-white border border-[#E2EAE5] text-[#17231E] hover:bg-[#F8FAF8]'
          }`}
        >
          Child Health & Nutrition
        </button>
      </div>

      {/* Visits Timeline */}
      <div className="space-y-4">
        {filteredVisits.map((visit) => (
          <Card key={visit.id} variant="default" padding="md" className="space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-[#E2EAE5]">
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-[#17231E]">{visit.familyName}</span>
                <span className="font-mono text-xs px-2 py-0.5 rounded bg-[#F8FAF8] border border-[#E2EAE5] text-[#78857E]">
                  {visit.householdCode}
                </span>
                <Badge variant="info" size="sm">
                  {visit.purpose}
                </Badge>
              </div>

              <div className="flex items-center gap-2 text-xs text-[#78857E]">
                <span>Visit Date: <strong className="text-[#17231E] font-mono">{visit.visitDate}</strong></span>
                {visit.isOfflineSyncPending && (
                  <span className="px-2 py-0.5 rounded bg-orange-100 text-orange-800 text-[10px] font-bold">
                    Pending Sync
                  </span>
                )}
              </div>
            </div>

            <div className="space-y-1.5 text-xs">
              <p className="text-[#17231E]">
                <strong className="text-[#78857E]">Beneficiary:</strong> {visit.memberName}
              </p>
              <p className="text-[#78857E] leading-relaxed">
                <strong className="text-[#17231E]">Observations:</strong> {visit.observations}
              </p>
              <div className="p-2.5 rounded-xl bg-[#E8F5EF] text-[#075C45] font-medium leading-relaxed">
                <strong>Actions Taken:</strong> {visit.actionsTaken}
              </div>
            </div>

            <div className="flex items-center justify-between text-xs pt-1 text-[#78857E]">
              <span className="flex items-center gap-1 text-[#087F5B] font-semibold">
                <Clock className="w-3.5 h-3.5" />
                Next Visit Due: {visit.nextVisitDate}
              </span>
              <button
                onClick={() => navigate('family-detail', { id: visit.householdId })}
                className="hover:text-[#087F5B] font-semibold"
              >
                Open Family Profile →
              </button>
            </div>
          </Card>
        ))}
      </div>

      {/* Record Home Visit Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Record Household Visit"
        description="Log field findings and schedule the next follow-up."
        maxWidth="lg"
      >
        <form onSubmit={handleCreateVisit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-[#17231E]">Select Household</label>
            <select
              value={selectedHouseholdId}
              onChange={(e) => setSelectedHouseholdId(e.target.value)}
              className="w-full min-h-[44px] rounded-xl border border-[#E2EAE5] bg-white px-3 py-2 text-sm text-[#17231E]"
            >
              {mockHouseholds.map((h) => (
                <option key={h.id} value={h.id}>
                  {h.familyName} ({h.householdId}) — Head: {h.headName}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Beneficiary / Person Met"
              value={memberName}
              onChange={(e) => setMemberName(e.target.value)}
              placeholder="e.g. Meena Yadav"
              required
            />

            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-[#17231E]">Purpose of Visit</label>
              <select
                value={purpose}
                onChange={(e) => setPurpose(e.target.value as VisitPurpose)}
                className="w-full min-h-[44px] rounded-xl border border-[#E2EAE5] bg-white px-3 py-2 text-sm text-[#17231E]"
              >
                <option value="Antenatal Check-up">Antenatal Check-up</option>
                <option value="Immunization Mobilization">Immunization Mobilization</option>
                <option value="Postnatal Care">Postnatal Care</option>
                <option value="Child Health & Nutrition">Child Health & Nutrition</option>
                <option value="Chronic Disease Follow-up">Chronic Disease Follow-up</option>
                <option value="General Health Education">General Health Education</option>
              </select>
            </div>
          </div>

          <Textarea
            label="Worker Observations"
            placeholder="Record blood pressure, baby alertness, feeding habits, or fever..."
            value={observations}
            onChange={(e) => setObservations(e.target.value)}
            rows={3}
            required
          />

          <Textarea
            label="Actions Taken & Counseling Provided"
            placeholder="e.g. Handed over IFA tablets, verified 108 ambulance contact, mobilized for VHSND session..."
            value={actionsTaken}
            onChange={(e) => setActionsTaken(e.target.value)}
            rows={2}
            required
          />

          <Input
            label="Next Follow-up Due Date"
            type="date"
            value={nextVisitDate}
            onChange={(e) => setNextVisitDate(e.target.value)}
            required
          />

          <div className="flex items-center justify-end gap-2 pt-2 border-t border-[#E2EAE5]">
            <Button type="button" variant="outline" size="sm" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" size="sm" className="font-bold">
              Save Visit Log
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
