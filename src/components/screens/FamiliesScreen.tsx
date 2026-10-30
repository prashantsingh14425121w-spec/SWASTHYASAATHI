/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  Users,
  Search,
  Plus,
  Filter,
  MapPin,
  Phone,
  Calendar,
  AlertCircle,
  ChevronRight,
  HeartPulse,
  Baby,
} from 'lucide-react';
import { useNavigation } from '../../context/NavigationContext';
import { useLanguage } from '../../context/LanguageContext';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Input } from '../ui/Input';
import { mockHouseholds } from '../../data/mockData';

export const FamiliesScreen: React.FC = () => {
  const { navigate } = useNavigation();
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'pregnant' | 'infant' | 'due'>('all');

  const filteredFamilies = mockHouseholds.filter((family) => {
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      family.familyName.toLowerCase().includes(q) ||
      family.headName.toLowerCase().includes(q) ||
      family.householdId.toLowerCase().includes(q) ||
      family.village.toLowerCase().includes(q);

    if (!matchesSearch) return false;

    if (filterType === 'pregnant') return family.hasPregnantMember;
    if (filterType === 'infant') return family.hasInfant;
    if (filterType === 'due') return (family.pendingVaccinationsCount || 0) > 0;
    return true;
  });

  return (
    <div className="space-y-6 pb-12">
      {/* Header & Primary Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-[#17231E]">
            {t('families')}
          </h1>
          <p className="text-xs text-[#78857E]">
            Village: Rampur · Sub-Center: Chandpur · {mockHouseholds.length} Households Tracked
          </p>
        </div>
        <Button
          variant="primary"
          size="md"
          onClick={() => navigate('add-family')}
          leftIcon={<Plus className="w-4 h-4" />}
          className="font-bold shadow-xs shrink-0"
        >
          {t('addFamily')}
        </Button>
      </div>

      {/* Search & Interactive Filter Controls */}
      <div className="space-y-3">
        <Input
          placeholder="Search by family name, head of house, or HH-RAM ID..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          leftIcon={<Search className="w-4 h-4" />}
          className="bg-white shadow-2xs"
        />

        {/* Filter Segmented Controls */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
          <button
            onClick={() => setFilterType('all')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-colors whitespace-nowrap shrink-0 ${
              filterType === 'all'
                ? 'bg-[#087F5B] text-white shadow-xs'
                : 'bg-white border border-[#E2EAE5] text-[#17231E] hover:bg-[#F8FAF8]'
            }`}
          >
            All Families ({mockHouseholds.length})
          </button>
          <button
            onClick={() => setFilterType('pregnant')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
              filterType === 'pregnant'
                ? 'bg-[#087F5B] text-white shadow-xs'
                : 'bg-white border border-[#E2EAE5] text-[#17231E] hover:bg-[#F8FAF8]'
            }`}
          >
            <HeartPulse className="w-3.5 h-3.5" />
            <span>Maternal / Pregnant</span>
          </button>
          <button
            onClick={() => setFilterType('infant')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
              filterType === 'infant'
                ? 'bg-[#087F5B] text-white shadow-xs'
                : 'bg-white border border-[#E2EAE5] text-[#17231E] hover:bg-[#F8FAF8]'
            }`}
          >
            <Baby className="w-3.5 h-3.5" />
            <span>Infants (Under 1 Year)</span>
          </button>
          <button
            onClick={() => setFilterType('due')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
              filterType === 'due'
                ? 'bg-[#087F5B] text-white shadow-xs'
                : 'bg-white border border-[#E2EAE5] text-[#17231E] hover:bg-[#F8FAF8]'
            }`}
          >
            <AlertCircle className="w-3.5 h-3.5" />
            <span>Vaccines Due</span>
          </button>
        </div>
      </div>

      {/* Families Registry List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredFamilies.map((family) => (
          <Card
            key={family.id}
            variant="default"
            padding="md"
            interactive
            onClick={() => navigate('family-detail', { id: family.id })}
            className="flex flex-col justify-between space-y-4 hover:border-[#087F5B]/40"
          >
            <div className="space-y-2">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-bold text-[#17231E]">
                      {family.familyName}
                    </h3>
                    <span className="font-mono text-xs px-2 py-0.5 rounded-md bg-[#F8FAF8] border border-[#E2EAE5] text-[#78857E]">
                      {family.householdId}
                    </span>
                  </div>
                  <p className="text-xs text-[#78857E] mt-0.5">
                    Head of Family: <strong className="text-[#17231E]">{family.headName}</strong>
                  </p>
                </div>

                <Badge variant={family.rationCardType === 'Antyodaya' ? 'warning' : 'neutral'} size="sm">
                  {family.rationCardType || 'BPL'} Card
                </Badge>
              </div>

              <div className="flex flex-wrap items-center gap-y-1 gap-x-3 text-xs text-[#78857E] pt-1">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-[#087F5B]" />
                  {family.address}, {family.village}
                </span>
                <span className="flex items-center gap-1">
                  <Phone className="w-3.5 h-3.5 text-[#087F5B]" />
                  {family.contactNumber}
                </span>
              </div>
            </div>

            {/* Badges for health milestones */}
            <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100">
              <span className="text-xs font-semibold text-[#17231E]">
                {family.totalMembers} Members
              </span>

              {family.hasPregnantMember && (
                <Badge variant="success" size="sm" icon={<HeartPulse className="w-3 h-3" />}>
                  Pregnant Mother
                </Badge>
              )}

              {family.hasInfant && (
                <Badge variant="info" size="sm" icon={<Baby className="w-3 h-3" />}>
                  Infant Present
                </Badge>
              )}

              {family.pendingVaccinationsCount ? (
                <Badge variant="warning" size="sm">
                  {family.pendingVaccinationsCount} Vaccines Due
                </Badge>
              ) : null}
            </div>

            <div className="flex items-center justify-between text-xs pt-2 text-[#78857E]">
              <span>Last visit: {family.lastVisitDate || 'Not recorded'}</span>
              <span className="text-[#087F5B] font-bold flex items-center gap-0.5">
                <span>View Full Record</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </Card>
        ))}
      </div>

      {filteredFamilies.length === 0 && (
        <div className="text-center py-12 bg-white rounded-2xl border border-[#E2EAE5] space-y-3">
          <Users className="w-8 h-8 text-[#78857E] mx-auto opacity-40" />
          <p className="text-sm font-semibold text-[#17231E]">No families match your search.</p>
          <Button variant="outline" size="sm" onClick={() => setSearchQuery('')}>
            Clear Search Filter
          </Button>
        </div>
      )}
    </div>
  );
};
