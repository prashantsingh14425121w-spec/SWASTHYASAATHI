/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type LanguageCode =
  | 'en' // English
  | 'hi' // Hindi (हिन्दी)
  | 'bn' // Bengali (বাংলা)
  | 'te' // Telugu (తెలుగు)
  | 'mr' // Marathi (मराठी)
  | 'ta' // Tamil (தமிழ்)
  | 'gu' // Gujarati (ગુજરાતી)
  | 'kn' // Kannada (ಕನ್ನಡ)
  | 'ml' // Malayalam (മലയാളം)
  | 'pa'; // Punjabi (ਪੰਜਾਬੀ)

export interface LanguageOption {
  code: LanguageCode;
  name: string;
  nativeName: string;
}

export type Gender = 'Female' | 'Male' | 'Other';

export interface FamilyMember {
  id: string;
  householdId: string;
  name: string;
  relationship: string;
  gender: Gender;
  age: number;
  dateOfBirth?: string;
  bloodGroup?: string;
  phone?: string;
  isPregnant?: boolean;
  chronicConditions?: string[];
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Household {
  id: string;
  householdId: string; // e.g. "HH-RAM-042"
  headName: string;
  familyName: string;
  village: string;
  gramPanchayat: string;
  subCenter: string;
  address: string;
  contactNumber: string;
  totalMembers: number;
  rationCardType?: 'BPL' | 'APL' | 'Antyodaya';
  assignedAshaWorker: string;
  lastVisitDate?: string;
  nextFollowUpDate?: string;
  hasPregnantMember?: boolean;
  hasInfant?: boolean;
  pendingVaccinationsCount?: number;
  members?: FamilyMember[];
  createdAt: string;
  updatedAt: string;
}

export type PregnancyTrimester = 'First' | 'Second' | 'Third' | 'Postpartum';

export interface MaternalRecord {
  id: string;
  beneficiaryName: string;
  memberId: string;
  householdId: string;
  householdCode: string;
  registrationDate: string;
  lastMenstrualPeriod?: string;
  estimatedDeliveryDate: string;
  currentTrimester: PregnancyTrimester;
  gravida: number; // number of pregnancies
  para: number; // number of births
  highRiskCategory?: boolean;
  highRiskFactors?: string[];
  ancVisitsCompleted: number; // Antenatal Care visits
  totalAncRequired: number;
  lastAncDate?: string;
  nextFollowUpDate: string;
  ironFolicAcidTabletsGiven: number;
  tetanusToxoidDoses: number;
  workerNotes?: string;
  status: 'Active' | 'Delivered' | 'Referred' | 'Completed';
  createdAt: string;
  updatedAt: string;
}

export type VaccinationStatus = 'Completed' | 'Upcoming' | 'Due' | 'Overdue' | 'Not Recorded';

export interface VaccinationRecord {
  id: string;
  beneficiaryName: string;
  memberId: string;
  householdId: string;
  householdCode: string;
  ageGroup: string; // "Birth", "6 Weeks", "10 Weeks", "14 Weeks", "9-12 Months", "16-24 Months", "5-6 Years", "Pregnant"
  vaccineName: string; // e.g. "BCG", "OPV-0", "Hepatitis B", "Pentavalent-1", "Rotavirus-1", "MR-1"
  doseNumber: number;
  scheduledDueDate: string;
  administeredDate?: string;
  administeredBy?: string;
  batchNumber?: string;
  status: VaccinationStatus;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export type VisitPurpose =
  | 'Routine Home Visit'
  | 'Antenatal Check-up'
  | 'Postnatal Care'
  | 'Immunization Mobilization'
  | 'Child Health & Nutrition'
  | 'Chronic Disease Follow-up'
  | 'General Health Education';

export interface HouseholdVisit {
  id: string;
  householdId: string;
  householdCode: string;
  familyName: string;
  village: string;
  memberId?: string;
  memberName?: string;
  visitDate: string;
  purpose: VisitPurpose;
  observations: string;
  actionsTaken: string;
  nextVisitDate: string;
  ashaWorker: string;
  status: 'Completed' | 'Scheduled' | 'Rescheduled';
  isOfflineSyncPending?: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface FollowUpTask {
  id: string;
  title: string;
  category: 'Maternal' | 'Vaccination' | 'Visit' | 'General';
  householdCode: string;
  beneficiaryName: string;
  dueDate: string;
  isHighPriority: boolean;
  completed: boolean;
  description: string;
}

export interface SyncItem {
  id: string;
  entityType: 'household' | 'member' | 'visit' | 'maternal' | 'vaccination';
  action: 'create' | 'update' | 'delete';
  payload: unknown;
  timestamp: string;
  status: 'pending' | 'syncing' | 'synced' | 'failed';
  errorMessage?: string;
}

export type AppScreen =
  | 'landing'
  | 'login'
  | 'dashboard'
  | 'families'
  | 'family-detail'
  | 'add-family'
  | 'visits'
  | 'maternal'
  | 'vaccination'
  | 'saathi-ai'
  | 'sync-center'
  | 'notifications'
  | 'settings'
  | 'languages';

export interface AshaWorkerProfile {
  id: string;
  name: string;
  workerId: string;
  phone: string;
  village: string;
  subCenter: string;
  phcBlock: string;
  district: string;
  state: string;
  assignedHouseholdsCount: number;
  activeMaternalCount: number;
}
