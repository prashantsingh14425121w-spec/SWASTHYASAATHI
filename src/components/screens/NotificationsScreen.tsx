/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  Bell,
  AlertCircle,
  Clock,
  HeartPulse,
  ShieldAlert,
  CalendarCheck,
  ChevronRight,
  CheckCircle2,
} from 'lucide-react';
import { useNavigation } from '../../context/NavigationContext';
import { useLanguage } from '../../context/LanguageContext';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';

interface NotificationItem {
  id: string;
  type: 'urgent' | 'maternal' | 'vaccine' | 'session';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  actionScreen?: 'vaccination' | 'maternal' | 'visits' | 'families';
}

export const NotificationsScreen: React.FC = () => {
  const { navigate } = useNavigation();
  const { t } = useLanguage();

  const [notifications, setNotifications] = useState<NotificationItem[]>([
    {
      id: 'notif-1',
      type: 'urgent',
      title: 'Overdue Vaccination Alert',
      message: 'Zaid Ansari (Age 1 Year, HH-RAM-031) missed the MR-1 measles-rubella dose on Oct 15. Please follow up with the family.',
      timestamp: '2 hours ago',
      read: false,
      actionScreen: 'vaccination',
    },
    {
      id: 'notif-2',
      type: 'maternal',
      title: 'ANC-4 Antenatal Check Due',
      message: 'Meena Yadav (HH-RAM-014) is entering her 36th week. Final ANC check and institutional delivery transport voucher must be verified by Nov 02.',
      timestamp: '5 hours ago',
      read: false,
      actionScreen: 'maternal',
    },
    {
      id: 'notif-3',
      type: 'urgent',
      title: 'High Risk Maternal Nutrition Follow-up',
      message: 'Kavita Patel (HH-RAM-039) has mild anemia (Hb 9.2). Confirm daily IFA tablet intake and dietary diversity.',
      timestamp: '1 day ago',
      read: false,
      actionScreen: 'maternal',
    },
    {
      id: 'notif-4',
      type: 'session',
      title: 'VHSND Session Scheduled',
      message: 'Village Health Sanitation & Nutrition Day will be held at Anganwadi Center 1 this Wednesday. 4 infants due for immunization.',
      timestamp: '2 days ago',
      read: true,
      actionScreen: 'visits',
    },
  ]);

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  return (
    <div className="space-y-6 pb-12 max-w-3xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-[#17231E]">
            {t('notifications')}
          </h1>
          <p className="text-xs text-[#78857E]">
            Clinical alerts, overdue vaccination reminders, and session updates.
          </p>
        </div>
        <Button variant="outline" size="sm" onClick={markAllRead} className="text-xs">
          Mark All Read
        </Button>
      </div>

      <div className="space-y-3">
        {notifications.map((item) => (
          <Card
            key={item.id}
            variant="default"
            padding="md"
            interactive
            onClick={() => {
              if (item.actionScreen) navigate(item.actionScreen);
            }}
            className={`space-y-2 transition-all ${
              !item.read ? 'border-[#087F5B]/30 bg-[#F8FAF8]' : ''
            }`}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <div
                  className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                    item.type === 'urgent'
                      ? 'bg-rose-100 text-rose-800'
                      : item.type === 'maternal'
                      ? 'bg-[#E8F5EF] text-[#075C45]'
                      : 'bg-sky-100 text-sky-800'
                  }`}
                >
                  {item.type === 'urgent' ? (
                    <AlertCircle className="w-4 h-4" />
                  ) : item.type === 'maternal' ? (
                    <HeartPulse className="w-4 h-4" />
                  ) : (
                    <CalendarCheck className="w-4 h-4" />
                  )}
                </div>
                <div>
                  <h3 className="text-xs font-bold text-[#17231E]">{item.title}</h3>
                  <span className="text-[10px] text-[#78857E]">{item.timestamp}</span>
                </div>
              </div>

              {!item.read && (
                <span className="w-2 h-2 rounded-full bg-[#087F5B] shrink-0" />
              )}
            </div>

            <p className="text-xs text-[#78857E] leading-relaxed pl-10">
              {item.message}
            </p>

            <div className="flex justify-end pt-1">
              <span className="text-xs font-semibold text-[#087F5B] flex items-center gap-0.5">
                <span>Open Module</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
