/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  ShieldPlus,
  Plus,
  Calendar,
  AlertCircle,
  CheckCircle2,
  Clock,
  Filter,
  Syringe,
  Info,
} from 'lucide-react';
import { useNavigation } from '../../context/NavigationContext';
import { useOffline } from '../../context/OfflineContext';
import { useLanguage } from '../../context/LanguageContext';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Input, Textarea } from '../ui/Input';
import { Modal } from '../ui/Modal';
import { mockVaccinations, mockHouseholds } from '../../data/mockData';
import { VaccinationRecord, VaccinationStatus } from '../../types';

export const VaccinationScreen: React.FC = () => {
  const { navigate } = useNavigation();
  const { queueOfflineAction } = useOffline();
  const { t } = useLanguage();

  const [vaccinations, setVaccinations] = useState<VaccinationRecord[]>(mockVaccinations);
  const [statusFilter, setStatusFilter] = useState<'All' | 'Due' | 'Overdue' | 'Completed'>('All');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form states
  const [beneficiaryName, setBeneficiaryName] = useState('Ananya Sharma');
  const [selectedHouseholdId, setSelectedHouseholdId] = useState(mockHouseholds[1].id);
  const [ageGroup, setAgeGroup] = useState('6 Weeks');
  const [vaccineName, setVaccineName] = useState('Pentavalent-1');
  const [doseNumber, setDoseNumber] = useState(1);
  const [scheduledDueDate, setScheduledDueDate] = useState('2026-10-31');
  const [administeredDate, setAdministeredDate] = useState('');
  const [administeredBy, setAdministeredBy] = useState('ANM Rekha at Sub-Center');
  const [batchNumber, setBatchNumber] = useState('PENT-2026-B8');
  const [isGiven, setIsGiven] = useState(false);

  const filteredVaccinations = vaccinations.filter((vac) => {
    if (statusFilter === 'All') return true;
    return vac.status === statusFilter;
  });

  const handleUpdateVaccination = (e: React.FormEvent) => {
    e.preventDefault();
    const household = mockHouseholds.find((h) => h.id === selectedHouseholdId) || mockHouseholds[0];

    const newStatus: VaccinationStatus = isGiven ? 'Completed' : 'Due';

    const newVac: VaccinationRecord = {
      id: `vac-${Date.now()}`,
      beneficiaryName,
      memberId: `mem-${Date.now()}`,
      householdId: household.id,
      householdCode: household.householdId,
      ageGroup,
      vaccineName,
      doseNumber,
      scheduledDueDate,
      administeredDate: isGiven ? administeredDate || new Date().toISOString().split('T')[0] : undefined,
      administeredBy: isGiven ? administeredBy : undefined,
      batchNumber: isGiven ? batchNumber : undefined,
      status: newStatus,
      notes: isGiven ? 'Administered during village session.' : 'Scheduled for upcoming VHSND.',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setVaccinations([newVac, ...vaccinations]);
    queueOfflineAction({
      entityType: 'vaccination',
      action: 'create',
      payload: newVac,
    });

    setIsModalOpen(false);
  };

  const markDoseAsGiven = (vacId: string) => {
    setVaccinations((prev) =>
      prev.map((v) =>
        v.id === vacId
          ? {
              ...v,
              status: 'Completed',
              administeredDate: new Date().toISOString().split('T')[0],
              administeredBy: 'ANM Rekha at Sub-Center',
            }
          : v
      )
    );
    queueOfflineAction({
      entityType: 'vaccination',
      action: 'update',
      payload: { id: vacId, status: 'Completed' },
    });
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header & Primary Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-[#17231E]">
            {t('vaccinationTracker')}
          </h1>
          <p className="text-xs text-[#78857E]">
            Universal Immunization Programme (UIP) child tracking register for Rampur village.
          </p>
        </div>
        <Button
          variant="primary"
          size="md"
          onClick={() => setIsModalOpen(true)}
          leftIcon={<Plus className="w-4 h-4" />}
          className="font-bold shadow-xs shrink-0"
        >
          + Record Vaccination
        </Button>
      </div>

      {/* Advisory Banner */}
      <div className="p-4 rounded-2xl bg-[#E8F5EF] border border-[#bfe3d4] flex items-start gap-3">
        <Info className="w-5 h-5 text-[#087F5B] shrink-0 mt-0.5" />
        <p className="text-xs text-[#075C45] leading-relaxed">
          <strong>UIP Schedule Reference:</strong> Universal immunization includes BCG, Hepatitis B & OPV-0 at Birth; Pentavalent, Rotavirus, fIPV, PCV at 6, 10, and 14 weeks; and MR-1 & Vitamin A at 9-12 months.
        </p>
      </div>

      {/* Status Segmented Control */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
        <button
          onClick={() => setStatusFilter('All')}
          className={`px-3 py-1.5 rounded-lg font-medium transition-colors whitespace-nowrap shrink-0 ${
            statusFilter === 'All'
              ? 'bg-[#087F5B] text-white shadow-xs'
              : 'bg-white border border-[#E2EAE5] text-[#17231E] hover:bg-[#F8FAF8]'
          }`}
        >
          All Doses ({vaccinations.length})
        </button>
        <button
          onClick={() => setStatusFilter('Due')}
          className={`px-3 py-1.5 rounded-lg font-medium transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
            statusFilter === 'Due'
              ? 'bg-[#087F5B] text-white shadow-xs'
              : 'bg-white border border-[#E2EAE5] text-[#17231E] hover:bg-[#F8FAF8]'
          }`}
        >
          <Clock className="w-3.5 h-3.5 text-amber-600" />
          <span>Due Soon ({vaccinations.filter((v) => v.status === 'Due').length})</span>
        </button>
        <button
          onClick={() => setStatusFilter('Overdue')}
          className={`px-3 py-1.5 rounded-lg font-medium transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
            statusFilter === 'Overdue'
              ? 'bg-[#087F5B] text-white shadow-xs'
              : 'bg-white border border-[#E2EAE5] text-[#17231E] hover:bg-[#F8FAF8]'
          }`}
        >
          <AlertCircle className="w-3.5 h-3.5 text-rose-600" />
          <span>Overdue ({vaccinations.filter((v) => v.status === 'Overdue').length})</span>
        </button>
        <button
          onClick={() => setStatusFilter('Completed')}
          className={`px-3 py-1.5 rounded-lg font-medium transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
            statusFilter === 'Completed'
              ? 'bg-[#087F5B] text-white shadow-xs'
              : 'bg-white border border-[#E2EAE5] text-[#17231E] hover:bg-[#F8FAF8]'
          }`}
        >
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
          <span>Completed ({vaccinations.filter((v) => v.status === 'Completed').length})</span>
        </button>
      </div>

      {/* Vaccination Doses List */}
      <div className="space-y-3">
        {filteredVaccinations.map((vac) => {
          const isOverdue = vac.status === 'Overdue';
          const isDue = vac.status === 'Due';
          const isDone = vac.status === 'Completed';

          return (
            <Card
              key={vac.id}
              variant="default"
              padding="md"
              className={`space-y-3 transition-all ${
                isOverdue
                  ? 'border-rose-300 bg-rose-50/15'
                  : isDue
                  ? 'border-amber-200'
                  : ''
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                      isDone
                        ? 'bg-[#E8F5EF] text-[#075C45]'
                        : isOverdue
                        ? 'bg-rose-100 text-rose-800'
                        : 'bg-amber-100 text-amber-800'
                    }`}
                  >
                    <Syringe className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-bold text-[#17231E]">
                        {vac.vaccineName} (Dose {vac.doseNumber})
                      </h3>
                      <span className="text-[11px] font-medium text-[#78857E]">
                        · {vac.ageGroup} Milestone
                      </span>
                    </div>
                    <p className="text-xs text-[#78857E]">
                      Beneficiary: <strong className="text-[#17231E]">{vac.beneficiaryName}</strong> ({vac.householdCode})
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-start sm:self-center">
                  <Badge
                    variant={isDone ? 'success' : isOverdue ? 'danger' : 'warning'}
                    size="md"
                  >
                    {vac.status}
                  </Badge>

                  {!isDone && (
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => markDoseAsGiven(vac.id)}
                      className="font-bold text-xs"
                    >
                      Mark Given
                    </Button>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs pt-1 border-t border-slate-100">
                <div>
                  <span className="text-[#78857E] block text-[11px]">Due Date</span>
                  <span className={`font-mono font-bold ${isOverdue ? 'text-rose-700' : 'text-[#17231E]'}`}>
                    {vac.scheduledDueDate}
                  </span>
                </div>
                <div>
                  <span className="text-[#78857E] block text-[11px]">Administered Date</span>
                  <span className="font-mono text-[#17231E]">
                    {vac.administeredDate || 'Not yet given'}
                  </span>
                </div>
                <div>
                  <span className="text-[#78857E] block text-[11px]">Administered By</span>
                  <span className="text-[#17231E]">{vac.administeredBy || 'Pending'}</span>
                </div>
                <div>
                  <span className="text-[#78857E] block text-[11px]">Batch #</span>
                  <span className="font-mono text-[#78857E]">{vac.batchNumber || '—'}</span>
                </div>
              </div>

              {vac.notes && (
                <p className="text-xs text-[#78857E] bg-[#F8FAF8] p-2 rounded-lg border border-[#E2EAE5]">
                  {vac.notes}
                </p>
              )}
            </Card>
          );
        })}
      </div>

      {/* Record Vaccine Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Record Child Vaccination"
        description="Log vaccine administration or schedule upcoming milestone."
        maxWidth="lg"
      >
        <form onSubmit={handleUpdateVaccination} className="space-y-4">
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-[#17231E]">Select Household</label>
            <select
              value={selectedHouseholdId}
              onChange={(e) => setSelectedHouseholdId(e.target.value)}
              className="w-full min-h-[44px] rounded-xl border border-[#E2EAE5] bg-white px-3 py-2 text-sm text-[#17231E]"
            >
              {mockHouseholds.map((h) => (
                <option key={h.id} value={h.id}>
                  {h.familyName} ({h.householdId})
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Child / Beneficiary Name"
              value={beneficiaryName}
              onChange={(e) => setBeneficiaryName(e.target.value)}
              placeholder="e.g. Ananya Sharma"
              required
            />
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-[#17231E]">Age Milestone</label>
              <select
                value={ageGroup}
                onChange={(e) => setAgeGroup(e.target.value)}
                className="w-full min-h-[44px] rounded-xl border border-[#E2EAE5] bg-white px-3 py-2 text-sm text-[#17231E]"
              >
                <option value="Birth">Birth</option>
                <option value="6 Weeks">6 Weeks</option>
                <option value="10 Weeks">10 Weeks</option>
                <option value="14 Weeks">14 Weeks</option>
                <option value="9-12 Months">9-12 Months</option>
                <option value="16-24 Months">16-24 Months</option>
                <option value="5-6 Years">5-6 Years</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Vaccine Name"
              value={vaccineName}
              onChange={(e) => setVaccineName(e.target.value)}
              placeholder="e.g. Pentavalent, Rotavirus, MR"
              required
            />
            <Input
              label="Scheduled Due Date"
              type="date"
              value={scheduledDueDate}
              onChange={(e) => setScheduledDueDate(e.target.value)}
              required
            />
          </div>

          <div className="p-3.5 rounded-xl bg-[#F8FAF8] border border-[#E2EAE5] space-y-3">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={isGiven}
                onChange={(e) => setIsGiven(e.target.checked)}
                className="rounded text-[#087F5B] focus:ring-[#087F5B] w-4 h-4"
              />
              <span className="text-xs font-bold text-[#17231E]">
                Vaccine already administered to child
              </span>
            </label>

            {isGiven && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <Input
                  label="Administered Date"
                  type="date"
                  value={administeredDate}
                  onChange={(e) => setAdministeredDate(e.target.value)}
                />
                <Input
                  label="Vaccine Batch Number"
                  value={batchNumber}
                  onChange={(e) => setBatchNumber(e.target.value)}
                  placeholder="e.g. BCG-26A-44"
                />
              </div>
            )}
          </div>

          <div className="flex items-center justify-end gap-2 pt-2 border-t border-[#E2EAE5]">
            <Button type="button" variant="outline" size="sm" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" size="sm" className="font-bold">
              Save Vaccination Record
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
