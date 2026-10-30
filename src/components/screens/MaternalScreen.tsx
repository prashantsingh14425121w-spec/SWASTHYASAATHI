/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  HeartPulse,
  Plus,
  Calendar,
  AlertCircle,
  CheckCircle2,
  Clock,
  ShieldAlert,
  ChevronRight,
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
import { mockMaternalRecords, mockHouseholds } from '../../data/mockData';
import { MaternalRecord, PregnancyTrimester } from '../../types';

export const MaternalScreen: React.FC = () => {
  const { navigate } = useNavigation();
  const { queueOfflineAction } = useOffline();
  const { t } = useLanguage();

  const [records, setRecords] = useState<MaternalRecord[]>(mockMaternalRecords);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form states
  const [beneficiaryName, setBeneficiaryName] = useState('');
  const [selectedHouseholdId, setSelectedHouseholdId] = useState(mockHouseholds[0].id);
  const [lastMenstrualPeriod, setLastMenstrualPeriod] = useState('2026-05-15');
  const [estimatedDeliveryDate, setEstimatedDeliveryDate] = useState('2027-02-20');
  const [currentTrimester, setCurrentTrimester] = useState<PregnancyTrimester>('Second');
  const [isHighRisk, setIsHighRisk] = useState(false);
  const [highRiskReason, setHighRiskReason] = useState('Mild Anemia (Hb < 10)');
  const [workerNotes, setWorkerNotes] = useState('');

  const handleCreateMaternalRecord = (e: React.FormEvent) => {
    e.preventDefault();
    const household = mockHouseholds.find((h) => h.id === selectedHouseholdId) || mockHouseholds[0];

    const newRecord: MaternalRecord = {
      id: `mat-${Date.now()}`,
      beneficiaryName: beneficiaryName || 'New Mother',
      memberId: `mem-${Date.now()}`,
      householdId: household.id,
      householdCode: household.householdId,
      registrationDate: new Date().toISOString().split('T')[0],
      lastMenstrualPeriod,
      estimatedDeliveryDate,
      currentTrimester,
      gravida: 1,
      para: 0,
      highRiskCategory: isHighRisk,
      highRiskFactors: isHighRisk ? [highRiskReason] : [],
      ancVisitsCompleted: 1,
      totalAncRequired: 4,
      lastAncDate: new Date().toISOString().split('T')[0],
      nextFollowUpDate: new Date(Date.now() + 14 * 86400000).toISOString().split('T')[0],
      ironFolicAcidTabletsGiven: 100,
      tetanusToxoidDoses: 1,
      workerNotes: workerNotes || 'Registered in village maternal register. Counseled on diet and institutional delivery.',
      status: 'Active',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setRecords([newRecord, ...records]);
    queueOfflineAction({
      entityType: 'maternal',
      action: 'create',
      payload: newRecord,
    });

    setIsModalOpen(false);
    setBeneficiaryName('');
    setWorkerNotes('');
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header & Primary Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-[#17231E]">
            {t('maternalHealth')}
          </h1>
          <p className="text-xs text-[#78857E]">
            Antenatal Care (ANC) registers, EDD monitoring, and high-risk pregnancy follow-ups.
          </p>
        </div>
        <Button
          variant="primary"
          size="md"
          onClick={() => setIsModalOpen(true)}
          leftIcon={<Plus className="w-4 h-4" />}
          className="font-bold shadow-xs shrink-0"
        >
          + Register Pregnancy
        </Button>
      </div>

      {/* Maternal Clinical Safety Notice */}
      <div className="p-4 rounded-2xl bg-[#E8F5EF] border border-[#bfe3d4] flex items-start gap-3">
        <Info className="w-5 h-5 text-[#087F5B] shrink-0 mt-0.5" />
        <p className="text-xs text-[#075C45] leading-relaxed">
          <strong>ASHA Protocol Reminder:</strong> Ensure all pregnant women receive minimum 4 ANC check-ups, 180 Iron-Folic Acid (IFA) tablets, 2 TT/Td doses, and institutional delivery counseling under Janani Suraksha Yojana (JSY).
        </p>
      </div>

      {/* Active Pregnancies Cards */}
      <div className="space-y-4">
        {records.map((mat) => (
          <Card key={mat.id} variant="default" padding="md" className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#E2EAE5]">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-bold text-[#17231E]">
                    {mat.beneficiaryName}
                  </h3>
                  <span className="font-mono text-xs px-2 py-0.5 rounded bg-[#F8FAF8] border border-[#E2EAE5] text-[#78857E]">
                    {mat.householdCode}
                  </span>
                  <Badge variant="success" size="sm">
                    {mat.currentTrimester} Trimester
                  </Badge>
                </div>
                <p className="text-xs text-[#78857E] mt-0.5">
                  Registered: {mat.registrationDate} · Gravida {mat.gravida}, Para {mat.para}
                </p>
              </div>

              <div className="flex items-center gap-2">
                {mat.highRiskCategory ? (
                  <Badge variant="danger" size="md" icon={<ShieldAlert className="w-3.5 h-3.5" />}>
                    High Risk: {mat.highRiskFactors?.join(', ')}
                  </Badge>
                ) : (
                  <Badge variant="neutral" size="sm">
                    Standard Monitoring
                  </Badge>
                )}
              </div>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div className="p-2.5 rounded-xl bg-[#F8FAF8] border border-[#E2EAE5]">
                <span className="text-[#78857E] block text-[11px]">Estimated Delivery</span>
                <span className="font-bold text-[#17231E] font-mono">{mat.estimatedDeliveryDate}</span>
              </div>
              <div className="p-2.5 rounded-xl bg-[#F8FAF8] border border-[#E2EAE5]">
                <span className="text-[#78857E] block text-[11px]">ANC Completed</span>
                <span className="font-bold text-[#17231E]">
                  {mat.ancVisitsCompleted} of {mat.totalAncRequired} Check-ups
                </span>
              </div>
              <div className="p-2.5 rounded-xl bg-[#F8FAF8] border border-[#E2EAE5]">
                <span className="text-[#78857E] block text-[11px]">IFA Tablets Distributed</span>
                <span className="font-bold text-[#17231E] font-mono">{mat.ironFolicAcidTabletsGiven} Tablets</span>
              </div>
              <div className="p-2.5 rounded-xl bg-[#E8F5EF] border border-[#d0e8dd]">
                <span className="text-[#075C45] block text-[11px] font-semibold">Next Follow-up Due</span>
                <span className="font-bold text-[#087F5B] font-mono">{mat.nextFollowUpDate}</span>
              </div>
            </div>

            {mat.workerNotes && (
              <p className="text-xs text-[#78857E] bg-[#F8FAF8] p-3 rounded-xl border border-[#E2EAE5] leading-relaxed">
                <strong className="text-[#17231E]">Worker Observations:</strong> {mat.workerNotes}
              </p>
            )}

            <div className="flex items-center justify-between text-xs pt-1">
              <span className="text-xs text-[#78857E]">
                Last ANC Check: <strong className="text-[#17231E]">{mat.lastAncDate}</strong>
              </span>
              <button
                onClick={() => navigate('family-detail', { id: mat.householdId })}
                className="text-[#087F5B] hover:underline font-semibold flex items-center gap-0.5"
              >
                <span>View Full Household</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </Card>
        ))}
      </div>

      {/* Register Pregnancy Record Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Register Pregnancy (ANC)"
        description="Add a beneficiary to the antenatal health tracking register."
        maxWidth="lg"
      >
        <form onSubmit={handleCreateMaternalRecord} className="space-y-4">
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
              label="Beneficiary / Mother's Name"
              placeholder="e.g. Rekha Devi"
              value={beneficiaryName}
              onChange={(e) => setBeneficiaryName(e.target.value)}
              required
            />
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-[#17231E]">Current Trimester</label>
              <select
                value={currentTrimester}
                onChange={(e) => setCurrentTrimester(e.target.value as PregnancyTrimester)}
                className="w-full min-h-[44px] rounded-xl border border-[#E2EAE5] bg-white px-3 py-2 text-sm text-[#17231E]"
              >
                <option value="First">First Trimester (1-12 Weeks)</option>
                <option value="Second">Second Trimester (13-27 Weeks)</option>
                <option value="Third">Third Trimester (28-40 Weeks)</option>
                <option value="Postpartum">Postpartum Care</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Last Menstrual Period (LMP)"
              type="date"
              value={lastMenstrualPeriod}
              onChange={(e) => setLastMenstrualPeriod(e.target.value)}
              required
            />
            <Input
              label="Estimated Delivery Date (EDD)"
              type="date"
              value={estimatedDeliveryDate}
              onChange={(e) => setEstimatedDeliveryDate(e.target.value)}
              required
            />
          </div>

          <div className="p-3 rounded-xl bg-[#F8FAF8] border border-[#E2EAE5] space-y-2">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={isHighRisk}
                onChange={(e) => setIsHighRisk(e.target.checked)}
                className="rounded text-[#087F5B] focus:ring-[#087F5B] w-4 h-4"
              />
              <span className="text-xs font-bold text-rose-800">
                Flag as High Risk Pregnancy
              </span>
            </label>
            {isHighRisk && (
              <Input
                label="High Risk Factor"
                value={highRiskReason}
                onChange={(e) => setHighRiskReason(e.target.value)}
                placeholder="e.g. Mild Anemia (Hb < 10), Gestational Diabetes, Adolescent Mother"
              />
            )}
          </div>

          <Textarea
            label="Worker Counseling & Nutrition Notes"
            placeholder="Counseling on IFA tablets, green vegetables, diet, and delivery hospital..."
            value={workerNotes}
            onChange={(e) => setWorkerNotes(e.target.value)}
            rows={2}
          />

          <div className="flex items-center justify-end gap-2 pt-2 border-t border-[#E2EAE5]">
            <Button type="button" variant="outline" size="sm" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" size="sm" className="font-bold">
              Save Pregnancy Record
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
