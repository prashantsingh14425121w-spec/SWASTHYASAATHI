/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import {
  Wifi,
  WifiOff,
  RefreshCw,
  Database,
  CheckCircle2,
  AlertCircle,
  HardDrive,
  ShieldCheck,
  Clock,
  Layers,
  ArrowRight,
} from 'lucide-react';
import { useOffline } from '../../context/OfflineContext';
import { useLanguage } from '../../context/LanguageContext';
import { useNavigation } from '../../context/NavigationContext';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';

export const SyncCenterScreen: React.FC = () => {
  const {
    effectiveOnline,
    isSimulatedOffline,
    toggleSimulatedOffline,
    pendingSyncCount,
    syncQueue,
    syncStatus,
    lastSyncedAt,
    triggerManualSync,
    clearSyncQueue,
  } = useOffline();

  const { t } = useLanguage();
  const { navigate } = useNavigation();

  return (
    <div className="space-y-6 pb-12 max-w-4xl mx-auto">
      {/* Header */}
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-[#17231E]">
          {t('offlineSync')}
        </h1>
        <p className="text-xs text-[#78857E]">
          Monitor offline database persistence, airplane mode simulation, and background synchronization queue.
        </p>
      </div>

      {/* Main Connectivity & Sync Hero Card */}
      <Card
        variant={effectiveOnline ? 'mint' : 'ivory'}
        padding="lg"
        className={`border-2 transition-colors ${
          effectiveOnline ? 'border-[#bfe3d4]' : 'border-amber-300'
        }`}
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <div
                className={`w-3 h-3 rounded-full ${
                  effectiveOnline ? 'bg-[#087F5B]' : 'bg-amber-600 animate-pulse'
                }`}
              />
              <span className="text-xs font-bold uppercase tracking-wider text-[#17231E]">
                Network Status: {effectiveOnline ? 'Connected (Online)' : 'Airplane / Offline Mode'}
              </span>
            </div>
            <h2 className="text-xl font-bold text-[#17231E]">
              {effectiveOnline
                ? 'Ready for Real-time Cloud Synchronization'
                : 'Offline Cache Active — All Records Stored Locally'}
            </h2>
            <p className="text-xs text-[#78857E]">
              {lastSyncedAt
                ? `Last successful sync: ${new Date(lastSyncedAt).toLocaleString()}`
                : 'No sync recorded yet'}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            {/* Simulation toggle */}
            <Button
              variant="outline"
              size="md"
              onClick={toggleSimulatedOffline}
              leftIcon={effectiveOnline ? <WifiOff className="w-4 h-4 text-amber-700" /> : <Wifi className="w-4 h-4 text-[#087F5B]" />}
              className="bg-white font-semibold text-xs"
            >
              {effectiveOnline ? 'Simulate Airplane Mode' : 'Reconnect Online'}
            </Button>

            {/* Manual Sync Trigger */}
            <Button
              variant="primary"
              size="md"
              onClick={triggerManualSync}
              disabled={!effectiveOnline || syncStatus === 'syncing'}
              isLoading={syncStatus === 'syncing'}
              leftIcon={<RefreshCw className="w-4 h-4" />}
              className="font-bold text-xs"
            >
              {syncStatus === 'syncing' ? 'Syncing...' : 'Sync Records Now'}
            </Button>
          </div>
        </div>
      </Card>

      {/* Offline Storage Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card variant="default" padding="md" className="space-y-1">
          <div className="flex items-center justify-between text-[#78857E]">
            <span className="text-xs font-semibold">Local Storage Engine</span>
            <Database className="w-4 h-4 text-[#087F5B]" />
          </div>
          <p className="text-lg font-bold text-[#17231E]">IndexedDB + Cache API</p>
          <p className="text-[11px] text-[#78857E]">Fully active offline shell</p>
        </Card>

        <Card variant="default" padding="md" className="space-y-1">
          <div className="flex items-center justify-between text-[#78857E]">
            <span className="text-xs font-semibold">Pending Local Mutations</span>
            <HardDrive className="w-4 h-4 text-[#087F5B]" />
          </div>
          <p className="text-lg font-bold font-mono text-[#087F5B]">{pendingSyncCount}</p>
          <p className="text-[11px] text-[#78857E]">Queued for server transmission</p>
        </Card>

        <Card variant="default" padding="md" className="space-y-1">
          <div className="flex items-center justify-between text-[#78857E]">
            <span className="text-xs font-semibold">Sync Integrity</span>
            <ShieldCheck className="w-4 h-4 text-[#087F5B]" />
          </div>
          <p className="text-lg font-bold text-[#17231E]">Conflict-Free UUID</p>
          <p className="text-[11px] text-[#78857E]">Zero duplicate generation</p>
        </Card>
      </div>

      {/* Sync Queue List */}
      <Card variant="default" padding="lg" className="space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-[#E2EAE5]">
          <div>
            <h3 className="text-sm font-bold text-[#17231E]">
              Local Changes Queue ({syncQueue.length} Items)
            </h3>
            <p className="text-xs text-[#78857E]">
              Mutations created or edited on this device awaiting server acknowledgement.
            </p>
          </div>
          {syncQueue.length > 0 && (
            <Button variant="ghost" size="sm" onClick={clearSyncQueue} className="text-xs text-rose-700">
              Clear Queue
            </Button>
          )}
        </div>

        {syncQueue.length > 0 ? (
          <div className="space-y-2.5">
            {syncQueue.map((item) => (
              <div
                key={item.id}
                className="p-3 rounded-xl bg-[#F8FAF8] border border-[#E2EAE5] flex items-center justify-between text-xs"
              >
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-[#17231E] uppercase">
                      [{item.action}] {item.entityType}
                    </span>
                    <Badge variant="warning" size="sm">
                      Pending
                    </Badge>
                  </div>
                  <p className="text-[11px] text-[#78857E] font-mono">
                    ID: {item.id} · Queued at {new Date(item.timestamp).toLocaleTimeString()}
                  </p>
                </div>
                <span className="text-[11px] font-semibold text-[#087F5B]">
                  Safe in local storage
                </span>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 space-y-2">
            <CheckCircle2 className="w-8 h-8 text-[#087F5B] mx-auto" />
            <p className="text-xs font-bold text-[#17231E]">All records are in sync!</p>
            <p className="text-[11px] text-[#78857E]">
              Any visits or family records you create while in airplane mode will appear here.
            </p>
          </div>
        )}
      </Card>
    </div>
  );
};
