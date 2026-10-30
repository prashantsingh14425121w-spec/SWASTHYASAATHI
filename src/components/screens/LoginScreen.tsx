/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { HeartPulse, ArrowRight, ShieldCheck, Lock, Smartphone, CheckCircle2 } from 'lucide-react';
import { useNavigation } from '../../context/NavigationContext';
import { useLanguage } from '../../context/LanguageContext';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { Input } from '../ui/Input';
import { SafeImage } from '../ui/SafeImage';
import { mockAshaProfile } from '../../data/mockData';

export const LoginScreen: React.FC = () => {
  const { navigate } = useNavigation();
  const { t } = useLanguage();
  const [phoneNumber, setPhoneNumber] = useState('9876543210');
  const [otp, setOtp] = useState('123456');
  const [showOtp, setShowOtp] = useState(false);

  const handleDemoLogin = () => {
    navigate('dashboard');
  };

  const handlePhoneSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!showOtp) {
      setShowOtp(true);
    } else {
      navigate('dashboard');
    }
  };

  return (
    <div className="max-w-md mx-auto py-12 px-4 space-y-6">
      <div className="text-center space-y-2">
        <div className="w-12 h-12 rounded-2xl bg-[#087F5B] text-white flex items-center justify-center mx-auto shadow-sm">
          <HeartPulse className="w-6 h-6" />
        </div>
        <h2 className="text-2xl font-bold text-[#17231E]">Welcome to SwasthyaSaathi</h2>
        <p className="text-xs text-[#78857E]">
          Community Healthcare Digital Register & Follow-up Assistant
        </p>
      </div>

      {/* 1-Click Demo Entry Card (Recommended for Evaluators) */}
      <Card variant="mint" padding="lg" className="border-[#bfe3d4] space-y-4">
        <div className="flex items-center gap-2 text-xs font-bold text-[#075C45] uppercase tracking-wider">
          <ShieldCheck className="w-4 h-4 text-[#087F5B]" />
          <span>Instant Evaluator Demo Access</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl overflow-hidden border border-[#bfe3d4] shrink-0 bg-[#E8F5EF] shadow-2xs">
            <SafeImage
              src="/images/asha-worker-mother.jpg"
              alt="ASHA Worker Sunita Devi"
              className="w-full h-full object-cover object-[70%_20%]"
            />
          </div>
          <div className="space-y-0.5">
            <p className="text-sm font-bold text-[#075C45]">Enter as ASHA Worker Sunita Devi</p>
            <p className="text-xs text-[#075C45]/80">
              Village: Rampur · Sub-Center: Chandpur · 48 Families
            </p>
          </div>
        </div>
        <Button
          variant="primary"
          size="lg"
          onClick={handleDemoLogin}
          rightIcon={<ArrowRight className="w-4 h-4" />}
          className="w-full font-bold shadow-sm"
        >
          Enter Demo Portal (1-Click)
        </Button>
      </Card>

      {/* Standard Phone / Supabase Mock Form */}
      <Card variant="default" padding="lg" className="space-y-4">
        <div className="pb-2 border-b border-[#E2EAE5]">
          <h3 className="text-sm font-bold text-[#17231E]">Worker Phone Authentication</h3>
          <p className="text-xs text-[#78857E]">Enter registered ASHA mobile number</p>
        </div>

        <form onSubmit={handlePhoneSubmit} className="space-y-4">
          <Input
            label="Mobile Number"
            type="tel"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder="10-digit mobile number"
            leftIcon={<Smartphone className="w-4 h-4" />}
            helperText="Enter 10 digits (Demo pre-filled)"
          />

          {showOtp && (
            <Input
              label="One-Time Password (OTP)"
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Enter 6-digit OTP"
              leftIcon={<Lock className="w-4 h-4" />}
              helperText="Demo OTP pre-filled: 123456"
            />
          )}

          <Button type="submit" variant="outline" size="md" className="w-full font-semibold">
            {showOtp ? 'Verify OTP & Enter' : 'Send Verification OTP'}
          </Button>
        </form>
      </Card>
    </div>
  );
};
