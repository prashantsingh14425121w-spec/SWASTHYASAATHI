/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Users, Plus, Trash2, ArrowLeft, CheckCircle2, ShieldCheck } from 'lucide-react';
import { useNavigation } from '../../context/NavigationContext';
import { useOffline } from '../../context/OfflineContext';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { Input, Textarea } from '../ui/Input';
import { mockHouseholds, mockMembers } from '../../data/mockData';
import { Household, FamilyMember } from '../../types';

export const AddFamilyScreen: React.FC = () => {
  const { navigate, goBack } = useNavigation();
  const { queueOfflineAction } = useOffline();

  const [householdId, setHouseholdId] = useState(`HH-RAM-0${mockHouseholds.length + 10}`);
  const [headName, setHeadName] = useState('');
  const [familyName, setFamilyName] = useState('');
  const [village, setVillage] = useState('Rampur');
  const [address, setAddress] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [rationCardType, setRationCardType] = useState<'BPL' | 'APL' | 'Antyodaya'>('BPL');

  // Dynamic members
  const [members, setMembers] = useState<Array<{ name: string; age: number; gender: 'Female' | 'Male' | 'Other'; relation: string; isPregnant?: boolean }>>([
    { name: '', age: 30, gender: 'Male', relation: 'Head of Family' },
  ]);

  const [isSaved, setIsSaved] = useState(false);

  const addMemberRow = () => {
    setMembers((prev) => [
      ...prev,
      { name: '', age: 25, gender: 'Female', relation: 'Wife' },
    ]);
  };

  const removeMemberRow = (index: number) => {
    setMembers((prev) => prev.filter((_, i) => i !== index));
  };

  const updateMember = (index: number, field: string, value: any) => {
    setMembers((prev) => {
      const copy = [...prev];
      copy[index] = { ...copy[index], [field]: value };
      return copy;
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!headName || !familyName) return;

    const newHousehold: Household = {
      id: `hh-${Date.now()}`,
      householdId,
      headName,
      familyName,
      village,
      gramPanchayat: 'Rampur Kalan',
      subCenter: 'Chandpur Sub-Center',
      address: address || 'Main Village Ward',
      contactNumber: contactNumber || '+91 90000 00000',
      totalMembers: members.length,
      rationCardType,
      assignedAshaWorker: 'Sunita Devi',
      lastVisitDate: new Date().toISOString().split('T')[0],
      nextFollowUpDate: new Date(Date.now() + 7 * 86400000).toISOString().split('T')[0],
      hasPregnantMember: members.some((m) => m.isPregnant),
      hasInfant: members.some((m) => m.age <= 1),
      pendingVaccinationsCount: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    // Add into in-memory mockHouseholds array so other screens see it immediately
    mockHouseholds.unshift(newHousehold);

    // Queue in OfflineContext so sync queue tracks it
    queueOfflineAction({
      entityType: 'household',
      action: 'create',
      payload: newHousehold,
    });

    setIsSaved(true);
    setTimeout(() => {
      navigate('families');
    }, 1200);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 pb-12">
      <div className="flex items-center gap-3">
        <Button variant="outline" size="sm" onClick={goBack} leftIcon={<ArrowLeft className="w-4 h-4" />}>
          Cancel
        </Button>
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-[#17231E]">Register New Household</h1>
          <p className="text-xs text-[#78857E]">
            Add a newly surveyed family in Gram Panchayat Rampur.
          </p>
        </div>
      </div>

      {isSaved && (
        <div className="p-4 rounded-2xl bg-[#E8F5EF] border border-[#bfe3d4] text-[#075C45] flex items-center gap-3 animate-fade-in">
          <CheckCircle2 className="w-5 h-5 text-[#087F5B]" />
          <div>
            <p className="text-xs font-bold">Household Saved Locally</p>
            <p className="text-[11px]">Record safely stored in offline database & queued for synchronization.</p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Section 1: Household Core Info */}
        <Card variant="default" padding="lg" className="space-y-4">
          <h3 className="text-sm font-bold text-[#17231E] pb-2 border-b border-[#E2EAE5]">
            1. Household Identification & Address
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Household ID / Code"
              value={householdId}
              onChange={(e) => setHouseholdId(e.target.value)}
              helperText="Auto-assigned territory prefix"
              required
            />
            <Input
              label="Family Name / Clan"
              placeholder="e.g. Verma Family"
              value={familyName}
              onChange={(e) => setFamilyName(e.target.value)}
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Head of Household Name"
              placeholder="e.g. Rameshwar Verma"
              value={headName}
              onChange={(e) => setHeadName(e.target.value)}
              required
            />
            <Input
              label="Primary Contact Mobile Number"
              placeholder="+91 98XXX XXXXX"
              type="tel"
              value={contactNumber}
              onChange={(e) => setContactNumber(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Village / Tola"
              value={village}
              onChange={(e) => setVillage(e.target.value)}
              required
            />
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-[#17231E]">
                Ration Card Category
              </label>
              <select
                value={rationCardType}
                onChange={(e) => setRationCardType(e.target.value as any)}
                className="w-full min-h-[44px] rounded-xl border border-[#E2EAE5] bg-white px-3 py-2 text-sm text-[#17231E]"
              >
                <option value="BPL">BPL (Below Poverty Line)</option>
                <option value="APL">APL (Above Poverty Line)</option>
                <option value="Antyodaya">Antyodaya Anna Yojana (AAY)</option>
              </select>
            </div>
          </div>

          <Input
            label="Address / Landmark Description"
            placeholder="e.g. Near Community Well, Ward 3"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </Card>

        {/* Section 2: Family Members */}
        <Card variant="default" padding="lg" className="space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-[#E2EAE5]">
            <h3 className="text-sm font-bold text-[#17231E]">
              2. Individual Family Members ({members.length})
            </h3>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={addMemberRow}
              leftIcon={<Plus className="w-3.5 h-3.5" />}
            >
              Add Member
            </Button>
          </div>

          <div className="space-y-3">
            {members.map((member, index) => (
              <div
                key={index}
                className="p-3 rounded-xl bg-[#F8FAF8] border border-[#E2EAE5] space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#087F5B]">
                    Member #{index + 1}
                  </span>
                  {members.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeMemberRow(index)}
                      className="text-xs text-rose-600 hover:text-rose-800 flex items-center gap-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Remove</span>
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                  <div className="sm:col-span-2">
                    <Input
                      label="Full Name"
                      placeholder="Member Name"
                      value={member.name}
                      onChange={(e) => updateMember(index, 'name', e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <Input
                      label="Age (Years)"
                      type="number"
                      min={0}
                      max={120}
                      value={member.age}
                      onChange={(e) => updateMember(index, 'age', parseInt(e.target.value) || 0)}
                      required
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="block text-xs font-semibold text-[#17231E]">Gender</label>
                    <select
                      value={member.gender}
                      onChange={(e) => updateMember(index, 'gender', e.target.value)}
                      className="w-full min-h-[44px] rounded-xl border border-[#E2EAE5] bg-white px-2 py-2 text-xs"
                    >
                      <option value="Female">Female</option>
                      <option value="Male">Male</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <div className="w-1/2">
                    <Input
                      label="Relationship to Head"
                      placeholder="e.g. Wife, Son, Mother"
                      value={member.relation}
                      onChange={(e) => updateMember(index, 'relation', e.target.value)}
                    />
                  </div>

                  {member.gender === 'Female' && member.age >= 18 && member.age <= 49 && (
                    <label className="flex items-center gap-2 cursor-pointer mt-5">
                      <input
                        type="checkbox"
                        checked={member.isPregnant || false}
                        onChange={(e) => updateMember(index, 'isPregnant', e.target.checked)}
                        className="rounded text-[#087F5B] focus:ring-[#087F5B] w-4 h-4"
                      />
                      <span className="text-xs font-semibold text-[#17231E]">Currently Pregnant</span>
                    </label>
                  )}
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Submit Actions */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <Button type="button" variant="outline" size="md" onClick={goBack}>
            Cancel
          </Button>
          <Button type="submit" variant="primary" size="md" className="font-bold">
            Save Household Record
          </Button>
        </div>
      </form>
    </div>
  );
};
