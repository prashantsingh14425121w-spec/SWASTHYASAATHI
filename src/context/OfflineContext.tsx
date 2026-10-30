/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { createContext, useContext, useState, useEffect } from 'react';
import { SyncItem } from '../types';

interface OfflineContextType {
  isOnline: boolean;
  isSimulatedOffline: boolean;
  effectiveOnline: boolean;
  toggleSimulatedOffline: () => void;
  pendingSyncCount: number;
  syncQueue: SyncItem[];
  syncStatus: 'idle' | 'syncing' | 'completed' | 'error';
  lastSyncedAt: string | null;
  triggerManualSync: () => Promise<void>;
  queueOfflineAction: (item: Omit<SyncItem, 'id' | 'timestamp' | 'status'>) => void;
  clearSyncQueue: () => void;
}

const OfflineContext = createContext<OfflineContextType | undefined>(undefined);

export const OfflineProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isBrowserOnline, setIsBrowserOnline] = useState<boolean>(navigator.onLine);
  const [isSimulatedOffline, setIsSimulatedOffline] = useState<boolean>(false);
  const [syncStatus, setSyncStatus] = useState<'idle' | 'syncing' | 'completed' | 'error'>('idle');
  const [lastSyncedAt, setLastSyncedAt] = useState<string | null>(() => {
    return localStorage.getItem('swasthya_last_sync') || new Date().toISOString();
  });

  // Simulated initial queue with a couple demo changes or retrieved from storage
  const [syncQueue, setSyncQueue] = useState<SyncItem[]>(() => {
    try {
      const saved = localStorage.getItem('swasthya_offline_queue');
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return [];
  });

  useEffect(() => {
    const handleOnline = () => setIsBrowserOnline(true);
    const handleOffline = () => setIsBrowserOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('swasthya_offline_queue', JSON.stringify(syncQueue));
    } catch {
      // ignore
    }
  }, [syncQueue]);

  const effectiveOnline = isBrowserOnline && !isSimulatedOffline;

  const toggleSimulatedOffline = () => {
    setIsSimulatedOffline((prev) => !prev);
  };

  const queueOfflineAction = (item: Omit<SyncItem, 'id' | 'timestamp' | 'status'>) => {
    const newItem: SyncItem = {
      ...item,
      id: `sync_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`,
      timestamp: new Date().toISOString(),
      status: 'pending',
    };
    setSyncQueue((prev) => [newItem, ...prev]);
  };

  const clearSyncQueue = () => {
    setSyncQueue([]);
  };

  const triggerManualSync = async () => {
    if (!effectiveOnline) {
      setSyncStatus('error');
      setTimeout(() => setSyncStatus('idle'), 3000);
      return;
    }

    setSyncStatus('syncing');

    // Simulate reliable sync batching
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setSyncQueue([]);
    const now = new Date().toISOString();
    setLastSyncedAt(now);
    localStorage.setItem('swasthya_last_sync', now);
    setSyncStatus('completed');

    setTimeout(() => {
      setSyncStatus('idle');
    }, 3000);
  };

  return (
    <OfflineContext.Provider
      value={{
        isOnline: isBrowserOnline,
        isSimulatedOffline,
        effectiveOnline,
        toggleSimulatedOffline,
        pendingSyncCount: syncQueue.length,
        syncQueue,
        syncStatus,
        lastSyncedAt,
        triggerManualSync,
        queueOfflineAction,
        clearSyncQueue,
      }}
    >
      {children}
    </OfflineContext.Provider>
  );
};

export const useOffline = (): OfflineContextType => {
  const context = useContext(OfflineContext);
  if (!context) {
    throw new Error('useOffline must be used within an OfflineProvider');
  }
  return context;
};
