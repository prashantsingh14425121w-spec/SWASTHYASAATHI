/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  Settings,
  Globe,
  User,
  ShieldCheck,
  Download,
  Trash2,
  HardDrive,
  LogOut,
  CheckCircle2,
} from 'lucide-react';
import { useNavigation } from '../../context/NavigationContext';
import { useLanguage } from '../../context/LanguageContext';
import { useOffline } from '../../context/OfflineContext';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { mockAshaProfile, mockHouseholds } from '../../data/mockData';

export const SettingsScreen: React.FC = () => {
  const { navigate } = useNavigation();
  const { currentLanguageOption, languages, setLanguage, t } = useLanguage();
  const { clearSyncQueue } = useOffline();

  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const handleExportData = () => {
    const dataStr = JSON.stringify(mockHouseholds, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `swasthyasaathi_rampur_backup_${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 3000);
  };

  return (
    <div className="space-y-6 pb-12 max-w-3xl mx-auto">
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-[#17231E]">
          {t('settings')}
        </h1>
        <p className="text-xs text-[#78857E]">
          Worker profile configuration, language preference, and local storage management.
        </p>
      </div>

      {/* 1. Worker Profile */}
      <Card variant="default" padding="lg" className="space-y-4">
        <div className="flex items-center gap-3 pb-3 border-b border-[#E2EAE5]">
          <div className="w-12 h-12 rounded-2xl bg-[#E8F5EF] text-[#075C45] flex items-center justify-center font-bold text-base border border-[#bfe3d4]">
            SD
          </div>
          <div>
            <h3 className="text-base font-bold text-[#17231E]">{mockAshaProfile.name}</h3>
            <p className="text-xs text-[#78857E]">
              ASHA ID: <strong className="font-mono text-[#17231E]">{mockAshaProfile.workerId}</strong> · {mockAshaProfile.phone}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <div>
            <span className="text-[#78857E] block text-[11px]">Assigned Village</span>
            <span className="font-bold text-[#17231E]">{mockAshaProfile.village}</span>
          </div>
          <div>
            <span className="text-[#78857E] block text-[11px]">Sub-Center</span>
            <span className="font-bold text-[#17231E]">{mockAshaProfile.subCenter}</span>
          </div>
          <div>
            <span className="text-[#78857E] block text-[11px]">PHC Block</span>
            <span className="font-bold text-[#17231E]">{mockAshaProfile.phcBlock}</span>
          </div>
          <div>
            <span className="text-[#78857E] block text-[11px]">District / State</span>
            <span className="font-bold text-[#17231E]">{mockAshaProfile.district}, UP</span>
          </div>
        </div>
      </Card>

      {/* 2. Language Preference (10 Indian Languages) */}
      <Card variant="default" padding="lg" className="space-y-4">
        <div className="flex items-center gap-2 pb-2 border-b border-[#E2EAE5]">
          <Globe className="w-5 h-5 text-[#087F5B]" />
          <div>
            <h3 className="text-sm font-bold text-[#17231E]">Application Language</h3>
            <p className="text-xs text-[#78857E]">
              Current: <strong className="text-[#087F5B]">{currentLanguageOption.nativeName} ({currentLanguageOption.name})</strong>
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => setLanguage(lang.code)}
              className={`p-2.5 rounded-xl text-left border transition-all ${
                lang.code === currentLanguageOption.code
                  ? 'bg-[#087F5B] text-white border-[#087F5B] shadow-xs'
                  : 'bg-[#F8FAF8] border-[#E2EAE5] text-[#17231E] hover:bg-[#E8F5EF]'
              }`}
            >
              <p className="text-xs font-bold">{lang.nativeName}</p>
              <p className={`text-[10px] ${lang.code === currentLanguageOption.code ? 'text-white/80' : 'text-[#78857E]'}`}>
                {lang.name}
              </p>
            </button>
          ))}
        </div>
      </Card>

      {/* 3. Data Storage & Backup */}
      <Card variant="default" padding="lg" className="space-y-4">
        <div className="flex items-center gap-2 pb-2 border-b border-[#E2EAE5]">
          <HardDrive className="w-5 h-5 text-[#087F5B]" />
          <div>
            <h3 className="text-sm font-bold text-[#17231E]">Local Health Data & Backup</h3>
            <p className="text-xs text-[#78857E]">
              Export records for offline review or clear cached tables.
            </p>
          </div>
        </div>

        {downloadSuccess && (
          <div className="p-3 rounded-xl bg-[#E8F5EF] border border-[#bfe3d4] text-[#075C45] text-xs flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#087F5B]" />
            <span>Health records successfully downloaded to your device as JSON.</span>
          </div>
        )}

        <div className="flex flex-wrap items-center gap-3">
          <Button
            variant="outline"
            size="md"
            onClick={handleExportData}
            leftIcon={<Download className="w-4 h-4" />}
            className="text-xs font-semibold"
          >
            Export Health Records (JSON)
          </Button>

          <Button
            variant="ghost"
            size="md"
            onClick={clearSyncQueue}
            leftIcon={<Trash2 className="w-4 h-4 text-rose-700" />}
            className="text-xs text-rose-700 hover:bg-rose-50"
          >
            Clear Sync Queue
          </Button>
        </div>
      </Card>

      {/* 4. Logout / Switch User */}
      <div className="pt-2 flex justify-between items-center text-xs text-[#78857E]">
        <span>SwasthyaSaathi v2.4 · Offline-First Architecture</span>
        <Button
          variant="outline"
          size="sm"
          onClick={() => navigate('landing')}
          leftIcon={<LogOut className="w-3.5 h-3.5" />}
          className="text-xs"
        >
          Exit to Overview
        </Button>
      </div>
    </div>
  );
};
