/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { createContext, useContext, useState, useEffect } from 'react';
import { LanguageCode, LanguageOption } from '../types';

export const SUPPORTED_LANGUAGES: LanguageOption[] = [
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी' },
  { code: 'bn', name: 'Bengali', nativeName: 'বাংলা' },
  { code: 'te', name: 'Telugu', nativeName: 'తెలుగు' },
  { code: 'mr', name: 'Marathi', nativeName: 'मराठी' },
  { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்' },
  { code: 'gu', name: 'Gujarati', nativeName: 'ગુજરાતી' },
  { code: 'kn', name: 'Kannada', nativeName: 'ಕನ್ನಡ' },
  { code: 'ml', name: 'Malayalam', nativeName: 'മലയാളം' },
  { code: 'pa', name: 'Punjabi', nativeName: 'ਪੰਜਾਬੀ' },
];

export type TranslationKey =
  | 'appName'
  | 'appTagline'
  | 'appDescription'
  | 'getStarted'
  | 'exploreFeatures'
  | 'ashaPortal'
  | 'login'
  | 'logout'
  | 'dashboard'
  | 'families'
  | 'addFamily'
  | 'visits'
  | 'maternalHealth'
  | 'vaccinationTracker'
  | 'saathiAi'
  | 'offlineSync'
  | 'notifications'
  | 'settings'
  | 'language'
  | 'selectLanguage'
  | 'online'
  | 'offline'
  | 'syncPending'
  | 'allSynced'
  | 'syncNow'
  | 'searchPlaceholder'
  | 'totalFamilies'
  | 'totalMembers'
  | 'upcomingVisits'
  | 'vaccinationsDue'
  | 'maternalFollowups'
  | 'priorityTasks'
  | 'recentActivity'
  | 'recordVisit'
  | 'addPregnancy'
  | 'updateVaccination'
  | 'quickActions'
  | 'welcomeBack'
  | 'ashaWorker'
  | 'householdId'
  | 'headOfFamily'
  | 'village'
  | 'contactNumber'
  | 'save'
  | 'cancel'
  | 'completed'
  | 'due'
  | 'overdue'
  | 'upcoming'
  | 'disclaimer';

const translations: Record<LanguageCode, Record<TranslationKey, string>> = {
  en: {
    appName: 'SwasthyaSaathi',
    appTagline: 'Care that goes everywhere.',
    appDescription:
      'One simple platform to help community health workers keep every family’s health records connected, organized and accessible — even without internet.',
    getStarted: 'Launch ASHA Portal',
    exploreFeatures: 'Explore Platform',
    ashaPortal: 'ASHA Portal',
    login: 'Log In / Demo Mode',
    logout: 'Log Out',
    dashboard: 'Dashboard',
    families: 'Family Records',
    addFamily: 'Add New Family',
    visits: 'Household Visits',
    maternalHealth: 'Maternal Health',
    vaccinationTracker: 'Vaccination Tracker',
    saathiAi: 'Saathi AI Assistant',
    offlineSync: 'Offline & Sync Center',
    notifications: 'Notifications',
    settings: 'Settings',
    language: 'Language',
    selectLanguage: 'Choose Language',
    online: 'Online',
    offline: 'Offline Mode',
    syncPending: 'Changes Pending Sync',
    allSynced: 'All Records Synced',
    syncNow: 'Sync Records Now',
    searchPlaceholder: 'Search family, member, or village...',
    totalFamilies: 'Registered Families',
    totalMembers: 'Total Beneficiaries',
    upcomingVisits: 'Upcoming Visits',
    vaccinationsDue: 'Vaccinations Due',
    maternalFollowups: 'Maternal Follow-ups',
    priorityTasks: 'Priority Follow-up Tasks',
    recentActivity: 'Recent Visits & Records',
    recordVisit: 'Record Visit',
    addPregnancy: 'Add Pregnancy Record',
    updateVaccination: 'Update Vaccination',
    quickActions: 'Quick Actions',
    welcomeBack: 'Welcome back',
    ashaWorker: 'Community Health Worker (ASHA)',
    householdId: 'Household ID',
    headOfFamily: 'Head of Family',
    village: 'Village',
    contactNumber: 'Contact Number',
    save: 'Save Record',
    cancel: 'Cancel',
    completed: 'Completed',
    due: 'Due Today',
    overdue: 'Overdue',
    upcoming: 'Upcoming',
    disclaimer:
      'SwasthyaSaathi is a record-management and community follow-up tool. It is NOT a diagnostic system and does not replace qualified medical professionals.',
  },
  hi: {
    appName: 'स्वास्थ्यसाथी',
    appTagline: 'स्वास्थ्य सेवा जो हर जगह पहुंचे।',
    appDescription:
      'सामुदायिक स्वास्थ्य कार्यकर्ताओं और आशा दीदियों के लिए सरल डिजिटल स्वास्थ्य रिकॉर्ड प्लेटफॉर्म — बिना इंटरनेट के भी पूरी तरह सक्रिय।',
    getStarted: 'आशा पोर्टल शुरू करें',
    exploreFeatures: 'सुविधाएं देखें',
    ashaPortal: 'आशा पोर्टल',
    login: 'लॉग इन / डेमो मोड',
    logout: 'लॉग आउट',
    dashboard: 'डैशबोर्ड',
    families: 'परिवार रजिस्टर',
    addFamily: 'नया परिवार जोड़ें',
    visits: 'गृह भेंट (विजिट्स)',
    maternalHealth: 'मातृ स्वास्थ्य',
    vaccinationTracker: 'टीकाकरण ट्रैकर',
    saathiAi: 'साथी एआई सहायक',
    offlineSync: 'ऑफ़लाइन एवं सिंक केंद्र',
    notifications: 'सूचनाएं',
    settings: 'सेटिंग्स',
    language: 'भाषा',
    selectLanguage: 'भाषा चुनें',
    online: 'ऑनलाइन',
    offline: 'ऑफ़लाइन मोड',
    syncPending: 'सिंक लंबित',
    allSynced: 'सभी रिकॉर्ड सिंक हैं',
    syncNow: 'रिकॉर्ड सिंक करें',
    searchPlaceholder: 'परिवार, सदस्य या गांव खोजें...',
    totalFamilies: 'पंजीकृत परिवार',
    totalMembers: 'कुल लाभार्थी',
    upcomingVisits: 'आगामी गृह भेंट',
    vaccinationsDue: 'टीकाकरण देय',
    maternalFollowups: 'मातृ स्वास्थ्य फॉलो-अप',
    priorityTasks: 'प्राथमिकता कार्य',
    recentActivity: 'हाल की गतिविधियां',
    recordVisit: 'भेंट दर्ज करें',
    addPregnancy: 'गर्भावस्था दर्ज करें',
    updateVaccination: 'टीकाकरण अपडेट करें',
    quickActions: 'त्वरित कार्य',
    welcomeBack: 'स्वागत है',
    ashaWorker: 'सामुदायिक स्वास्थ्य कार्यकर्ता (आशा)',
    householdId: 'परिवार संख्या (HH ID)',
    headOfFamily: 'परिवार का मुखिया',
    village: 'गांव',
    contactNumber: 'संपर्क नंबर',
    save: 'रिकॉर्ड सहेजें',
    cancel: 'रद्द करें',
    completed: 'पूर्ण',
    due: 'आज देय',
    overdue: 'अतिदेय',
    upcoming: 'आगामी',
    disclaimer:
      'स्वास्थ्यसाथी एक रिकॉर्ड प्रबंधन और फॉलो-अप सहायक प्रणाली है। यह कोई नैदानिक ​​प्रणाली नहीं है और पेशेवर डॉक्टरों का विकल्प नहीं है।',
  },
  bn: {
    appName: 'স্বাস্থ্যসাথী',
    appTagline: 'স্বাস্থ্যসেবা যা সর্বত্র পৌঁছে যায়।',
    appDescription: 'কমিউনিটি স্বাস্থ্যকর্মীদের জন্য ডিজিটাল স্বাস্থ্য রেকর্ড প্ল্যাটফর্ম — ইন্টারনেট ছাড়াই সম্পূর্ণ কার্যকরী।',
    getStarted: 'আশা পোর্টাল শুরু করুন',
    exploreFeatures: 'ফিচার দেখুন',
    ashaPortal: 'আশা পোর্টাল',
    login: 'লগ ইন / ডেমো',
    logout: 'লগ আউট',
    dashboard: 'ড্যাশবোর্ড',
    families: 'পরিবার রেকর্ড',
    addFamily: 'নতুন পরিবার যোগ করুন',
    visits: 'গৃহ পরিদর্শন',
    maternalHealth: 'মাতৃ স্বাস্থ্য',
    vaccinationTracker: 'টিকাদান ট্র্যাকার',
    saathiAi: 'সাথী এআই সহায়ক',
    offlineSync: 'অফলাইন ও সিঙ্ক',
    notifications: 'বিজ্ঞপ্তি',
    settings: 'সেটিংস',
    language: 'ভাষা',
    selectLanguage: 'ভাষা নির্বাচন করুন',
    online: 'অনলাইন',
    offline: 'অফলাইন মোড',
    syncPending: 'সিঙ্ক অপেক্ষমান',
    allSynced: 'সমস্ত রেকর্ড সিঙ্ক হয়েছে',
    syncNow: 'এখনই সিঙ্ক করুন',
    searchPlaceholder: 'পরিবার, সদস্য বা গ্রাম খুঁজুন...',
    totalFamilies: 'নিবন্ধিত পরিবার',
    totalMembers: 'মোট সুবিধাভোগী',
    upcomingVisits: 'আসন্ন পরিদর্শন',
    vaccinationsDue: 'বাকি টিকা',
    maternalFollowups: 'মাতৃ ফলো-আপ',
    priorityTasks: 'জরুরি কাজ',
    recentActivity: 'সাম্প্রতিক কার্যক্রম',
    recordVisit: 'পরিদর্শন রেকর্ড করুন',
    addPregnancy: 'গর্ভাবস্থা যুক্ত করুন',
    updateVaccination: 'টিকা আপডেট করুন',
    quickActions: 'দ্রুত পদক্ষেপ',
    welcomeBack: 'স্বাগতম',
    ashaWorker: 'কমিউনিটি স্বাস্থ্যকর্মী (আশা)',
    householdId: 'গৃহ নং',
    headOfFamily: 'পরিবারের প্রধান',
    village: 'গ্রাম',
    contactNumber: 'যোগাযোগ নম্বর',
    save: 'সংরক্ষণ করুন',
    cancel: 'বাতিল করুন',
    completed: 'সম্পন্ন',
    due: 'আজ দিতে হবে',
    overdue: 'দেরি হয়েছে',
    upcoming: 'আসন্ন',
    disclaimer: 'স্বাস্থ্যসাথী একটি রেকর্ড ব্যবস্থাপনা টুল। এটি কোনও মেডিকেল ডায়াগনস্টিক সিস্টেম নয়।',
  },
  te: {
    appName: 'స్వాస్థ్యసాథి',
    appTagline: 'ప్రతిచోటా చేరే సంరక్షణ.',
    appDescription: 'గ్రామీణ ఆరోగ్య కార్యకర్తల కోసం ఆఫ్లైన్ డిజిటల్ హెల్త్ రికార్డ్ వేదిక.',
    getStarted: 'ఆశా పోర్టల్ ప్రారంభించండి',
    exploreFeatures: 'ఫీచర్లు చూడండి',
    ashaPortal: 'ఆశా పోర్టల్',
    login: 'లాగిన్ / డెమో',
    logout: 'లాగ్ అవుట్',
    dashboard: 'డాష్‌బోర్డ్',
    families: 'కుటుంబ రికార్డులు',
    addFamily: 'కొత్త కుటుంబాన్ని జోడించండి',
    visits: 'గృహ సందర్శనలు',
    maternalHealth: 'మాతా సంరక్షణ',
    vaccinationTracker: 'టీకా ట్రాకర్',
    saathiAi: 'సాథి AI సహాయకుడు',
    offlineSync: 'ఆఫ్‌లైన్ & సింక్',
    notifications: 'నోటిఫికేషన్లు',
    settings: 'సెట్టింగ్‌లు',
    language: 'భాష',
    selectLanguage: 'భాషను ఎంచుకోండి',
    online: 'ఆన్‌లైన్',
    offline: 'ఆఫ్‌లైన్ మోడ్',
    syncPending: 'సింక్ పెండింగ్‌లో ఉంది',
    allSynced: 'అన్ని రికార్డులు సింక్ అయ్యాయి',
    syncNow: 'ఇప్పుడే సింక్ చేయండి',
    searchPlaceholder: 'కుటుంబం లేదా గ్రామాన్ని వెతకండి...',
    totalFamilies: 'నమోదైన కుటుంబాలు',
    totalMembers: 'మొత్తం లబ్ధిదారులు',
    upcomingVisits: 'రాబోయే సందర్శనలు',
    vaccinationsDue: 'టీకాలు బాకీ',
    maternalFollowups: 'మాతా ఫాలో-అప్‌లు',
    priorityTasks: 'ప్రాధాన్యతా పనులు',
    recentActivity: 'ఇటీవలి చర్యలు',
    recordVisit: 'సందర్శన నమోదు',
    addPregnancy: 'గర్భం నమోదు',
    updateVaccination: 'టీకా అప్‌డేట్',
    quickActions: 'త్వరిత చర్యలు',
    welcomeBack: 'స్వాగతం',
    ashaWorker: 'ఆశా కార్యకర్త',
    householdId: 'కుటుంబ ఐడి',
    headOfFamily: 'కుటుంబ పెద్ద',
    village: 'గ్రామం',
    contactNumber: 'ఫోన్ నంబర్',
    save: 'భద్రపరచండి',
    cancel: 'రద్దు చేయండి',
    completed: 'పూర్తయింది',
    due: 'ఈరోజు బాకీ',
    overdue: 'గడువు దాటింది',
    upcoming: 'రాబోయేవి',
    disclaimer: 'స్వాస్థ్యసాథి రికార్డుల నిర్వహణ సాధనం మాత్రమే. ఇది వైద్య నిర్ధారణ వ్యవస్థ కాదు.',
  },
  mr: {
    appName: 'स्वास्थ्यसाथी',
    appTagline: 'प्रत्येक घरापर्यंत पोहोचणारी आरोग्य सेवा.',
    appDescription: 'आशा सेविकांसाठी ऑफलाइन डिजिटल आरोग्य नोंदवही प्लॅटफॉर्म.',
    getStarted: 'आशा पोर्टल उघडा',
    exploreFeatures: 'वैशिष्ट्ये पहा',
    ashaPortal: 'आशा पोर्टल',
    login: 'लॉगिन / डेमो',
    logout: 'लॉगआउट',
    dashboard: 'डॅशबोर्ड',
    families: 'कुटुंब नोंदी',
    addFamily: 'नवीन कुटुंब जोडा',
    visits: 'गृहभेटी',
    maternalHealth: 'माता आरोग्य',
    vaccinationTracker: 'लसीकरण ट्रॅकर',
    saathiAi: 'साथी एआय सहाय्यक',
    offlineSync: 'ऑफलाइन आणि सिंक',
    notifications: 'सूचना',
    settings: 'सेटिंग्ज',
    language: 'भाषा',
    selectLanguage: 'भाषा निवडा',
    online: 'ऑनलाइन',
    offline: 'ऑफलाइन मोड',
    syncPending: 'सिंक प्रलंबित',
    allSynced: 'सर्व नोंदी सिंक झाल्या',
    syncNow: 'आता सिंक करा',
    searchPlaceholder: 'कुटुंब किंवा गाव शोधा...',
    totalFamilies: 'नोंदणीकृत कुटुंबे',
    totalMembers: 'एकूण लाभार्थी',
    upcomingVisits: 'आगामी गृहभेटी',
    vaccinationsDue: 'लसीकरण बाकी',
    maternalFollowups: 'माता पाठपुरावा',
    priorityTasks: 'महत्त्वाची कामे',
    recentActivity: 'अलीकडील नोंदी',
    recordVisit: 'भेट नोंदवा',
    addPregnancy: 'गरोदरपण नोंदवा',
    updateVaccination: 'लसीकरण अद्ययावत करा',
    quickActions: 'जलद कृती',
    welcomeBack: 'स्वागत आहे',
    ashaWorker: 'आशा सेविका',
    householdId: 'कुटुंब क्रमांक',
    headOfFamily: 'कुटुंब प्रमुख',
    village: 'गाव',
    contactNumber: 'मोबाईल नंबर',
    save: 'जतन करा',
    cancel: 'रद्द करा',
    completed: 'पूर्ण',
    due: 'आज देय',
    overdue: 'मुदत उलटून गेली',
    upcoming: 'आगामी',
    disclaimer: 'स्वास्थ्यसाथी हे केवळ आरोग्य नोंदवही व्यवस्थापनाचे साधन आहे, वैद्यकीय निदानासाठी नाही.',
  },
  ta: {
    appName: 'சுவாஸ்தியசாதி',
    appTagline: 'எல்லா இடங்களுக்கும் செல்லும் நல்வாழ்வு.',
    appDescription: 'கிராமப்புற ஆஷா பணியாளர்களுக்கான ஆஃப்லைன் டிஜிட்டல் சுகாதார பதிவு தளம்.',
    getStarted: 'ஆஷா போர்ட்டல் திறக்க',
    exploreFeatures: 'அம்சங்கள் பார்க்க',
    ashaPortal: 'ஆஷா போர்ட்டல்',
    login: 'உள்நுழைக / டெமோ',
    logout: 'வெளியேறு',
    dashboard: 'முகப்பு பலகை',
    families: 'குடும்ப பதிவுகள்',
    addFamily: 'புதிய குடும்பம் சேர்க்க',
    visits: 'வீட்டுப் பார்வைகள்',
    maternalHealth: 'தாய்மை நலம்',
    vaccinationTracker: 'தடுப்பூசி கண்காணிப்பான்',
    saathiAi: 'சாதி AI உதவியாளர்',
    offlineSync: 'ஆஃப்லைன் & ஒத்திசைவு',
    notifications: 'அறிவிப்புகள்',
    settings: 'அமைப்புகள்',
    language: 'மொழி',
    selectLanguage: 'மொழியைத் தேர்ந்தெடுக்கவும்',
    online: 'ஆன்லைன்',
    offline: 'ஆஃப்லைன் நிலை',
    syncPending: 'ஒத்திசைவு நிலுவையில் உள்ளது',
    allSynced: 'அனைத்தும் ஒத்திசைக்கப்பட்டன',
    syncNow: 'இப்போதே ஒத்திசைக்க',
    searchPlaceholder: 'குடும்பம் அல்லது ஊரைத் தேடுங்கள்...',
    totalFamilies: 'பதிவுசெய்த குடும்பங்கள்',
    totalMembers: 'மொத்த பயனாளிகள்',
    upcomingVisits: 'வரவிருக்கும் பார்வைகள்',
    vaccinationsDue: 'நிலுவையில் உள்ள தடுப்பூசிகள்',
    maternalFollowups: 'தாய்மார்கள் பின்தொடர்தல்',
    priorityTasks: 'முக்கிய பணிகள்',
    recentActivity: 'சமீபத்திய பார்வைகள்',
    recordVisit: 'பார்வை பதிவு செய்ய',
    addPregnancy: 'கர்ப்பம் பதிவு செய்ய',
    updateVaccination: 'தடுப்பூசி புதுப்பிக்க',
    quickActions: 'விரைவு செயல்கள்',
    welcomeBack: 'நல்வரவு',
    ashaWorker: 'ஆஷா பணியாளர்',
    householdId: 'குடும்ப எண்',
    headOfFamily: 'குடும்பத் தலைவர்',
    village: 'கிராமம்',
    contactNumber: 'தொடர்பு எண்',
    save: 'சேமிக்க',
    cancel: 'ரத்து',
    completed: 'முடிந்தது',
    due: 'இன்று செலுத்த வேண்டியது',
    overdue: 'தாமதமானது',
    upcoming: 'வரவிருக்கும்',
    disclaimer: 'சுவாஸ்தியசாதி என்பது பதிவு மேலாண்மை கருவி மட்டுமே; மருத்துவ சிகிச்சைக்கானது அல்ல.',
  },
  gu: {
    appName: 'સ્વાસ્થ્યસાથી',
    appTagline: 'સંભાળ જે દરેક જગ્યાએ પહોંચે છે.',
    appDescription: 'આશા કાર્યકરો માટે ઑફલાઇન ડિજિટલ હેલ્થ રેકોર્ડ પ્લેટફોર્મ.',
    getStarted: 'આશા પોર્ટલ શરૂ કરો',
    exploreFeatures: 'વિશેષતાઓ જુઓ',
    ashaPortal: 'આશા પોર્ટલ',
    login: 'લૉગ ઇન / ડેમો',
    logout: 'લૉગ આઉટ',
    dashboard: 'ડેશબોર્ડ',
    families: 'પરિવાર રેકોર્ડ્સ',
    addFamily: 'નવો પરિવાર ઉમેરો',
    visits: 'ઘર મુલાકાતો',
    maternalHealth: 'માતૃ આરોગ્ય',
    vaccinationTracker: 'રસીકરણ ટ્રેકર',
    saathiAi: 'સાથી AI સહાયક',
    offlineSync: 'ઑફલાઇન અને સિંક',
    notifications: 'સૂચનાઓ',
    settings: 'સેટિંગ્સ',
    language: 'ભાષા',
    selectLanguage: 'ભાષા પસંદ કરો',
    online: 'ઑનલાઇન',
    offline: 'ઑફલાઇન મોડ',
    syncPending: 'સિંક બાકી',
    allSynced: 'બધા રેકોર્ડ્સ સિંક થયા',
    syncNow: 'હમણાં સિંક કરો',
    searchPlaceholder: 'પરિવાર અથવા ગામ શોધો...',
    totalFamilies: 'નોંધાયેલા પરિવારો',
    totalMembers: 'કુલ લાભાર્થીઓ',
    upcomingVisits: 'આગામી મુલાકાતો',
    vaccinationsDue: 'બાકી રસીકરણ',
    maternalFollowups: 'માતૃ ફોલો-અપ',
    priorityTasks: 'પ્રાથમિકતા કાર્યો',
    recentActivity: 'તાજેતરની પ્રવૃત્તિ',
    recordVisit: 'મુલાકાત નોંધો',
    addPregnancy: 'ગર્ભાવસ્થા નોંધો',
    updateVaccination: 'રસી અપડેટ કરો',
    quickActions: 'ઝડપી કાર્યો',
    welcomeBack: 'સ્વાગત છે',
    ashaWorker: 'આશા કાર્યકર',
    householdId: 'પરિવાર આઈડી',
    headOfFamily: 'પરિવારના વડા',
    village: 'ગામ',
    contactNumber: 'ફોન નંબર',
    save: 'સાચવો',
    cancel: 'રદ કરો',
    completed: 'પૂર્ણ',
    due: 'આજે બાકી',
    overdue: 'મુદત વીતી ગઈ',
    upcoming: 'આગામી',
    disclaimer: 'સ્વાસ્થ્યસાથી માત્ર રેકોર્ડ વ્યવસ્થાપન સાધન છે, તબીબી નિદાન માટે નથી.',
  },
  kn: {
    appName: 'ಸ್ವಾಸ್ಥ್ಯಸಾಥಿ',
    appTagline: 'ಪ್ರತಿಯೊಂದು ಮನೆಗೂ ತಲುಪುವ ಆರೋಗ್ಯ ಆರೈಕೆ.',
    appDescription: 'ಆಶಾ ಕಾರ್ಯಕರ್ತೆಯರಿಗೆ ಆಫ್‌ಲೈನ್ ಡಿಜಿಟಲ್ ಆರೋಗ್ಯ ದಾಖಲೆ ವೇದಿಕೆ.',
    getStarted: 'ಆಶಾ ಪೋರ್ಟಲ್ ತೆರೆಯಿರಿ',
    exploreFeatures: 'ವೈಶಿಷ್ಟ್ಯಗಳನ್ನು ನೋಡಿ',
    ashaPortal: 'ಆಶಾ ಪೋರ್ಟಲ್',
    login: 'ಲಾಗಿನ್ / ಡೆಮೊ',
    logout: 'ಲಾಗ್ ಔಟ್',
    dashboard: 'ಡ್ಯಾಶ್‌ಬೋರ್ಡ್',
    families: 'ಕುಟುಂಬ ದಾಖಲೆಗಳು',
    addFamily: 'ಹೊಸ ಕುಟುಂಬ ಸೇರಿಸಿ',
    visits: 'ಮನೆ ಭೇಟಿಗಳು',
    maternalHealth: 'ಮಾತೃ ಆರೋಗ್ಯ',
    vaccinationTracker: 'ಲಸಿಕೆ ಟ್ರ್ಯಾಕರ್',
    saathiAi: 'ಸಾಥಿ AI ಸಹಾಯಕ',
    offlineSync: 'ಆಫ್‌ಲೈನ್ ಮತ್ತು ಸಿಂಕ್',
    notifications: 'ಅಧಿಸೂಚನೆಗಳು',
    settings: 'ಸೆಟ್ಟಿಂಗ್‌ಗಳು',
    language: 'ಭಾಷೆ',
    selectLanguage: 'ಭಾಷೆಯನ್ನು ಆಯ್ಕೆಮಾಡಿ',
    online: 'ಆನ್‌ಲೈನ್',
    offline: 'ಆಫ್‌ಲೈನ್ ಮೋಡ್',
    syncPending: 'ಸಿಂಕ್ ಬಾಕಿ ಇದೆ',
    allSynced: 'ಎಲ್ಲ ದಾಖಲೆಗಳು ಸಿಂಕ್ ಆಗಿವೆ',
    syncNow: 'ಈಗಲೇ ಸಿಂಕ್ ಮಾಡಿ',
    searchPlaceholder: 'ಕುಟುಂಬ ಅಥವಾ ಊರು ಹುಡುಕಿ...',
    totalFamilies: 'ನೋಂದಾಯಿತ ಕುಟುಂಬಗಳು',
    totalMembers: 'ಒಟ್ಟು ಫಲಾನುಭವಿಗಳು',
    upcomingVisits: 'ಮುಂಬರುವ ಭೇಟಿಗಳು',
    vaccinationsDue: 'ಬಾಕಿ ಲಸಿಕೆಗಳು',
    maternalFollowups: 'ಮಾತೃ ಫಾಲೋ-ಅಪ್',
    priorityTasks: 'ಆದ್ಯತೆಯ ಕೆಲಸಗಳು',
    recentActivity: 'ಇತ್ತೀಚಿನ ಭೇಟಿಗಳು',
    recordVisit: 'ಭೇಟಿ ದಾಖಲಿಸಿ',
    addPregnancy: 'ಗರ್ಭಧಾರಣೆ ದಾಖಲಿಸಿ',
    updateVaccination: 'ಲಸಿಕೆ ಅಪ್‌ಡೇಟ್ ಮಾಡಿ',
    quickActions: 'ತ್ವರಿತ ಕ್ರಿಯೆಗಳು',
    welcomeBack: 'ಸ್ವಾಗತ',
    ashaWorker: 'ಆಶಾ ಕಾರ್ಯಕರ್ತೆ',
    householdId: 'ಕುಟುಂಬ ಸಂಖ್ಯೆ',
    headOfFamily: 'ಕುಟುಂಬದ ಮುಖ್ಯಸ್ಥ',
    village: 'ಗ್ರಾಮ',
    contactNumber: 'ದೂರವಾಣಿ ಸಂಖ್ಯೆ',
    save: 'ಉಳಿಸಿ',
    cancel: 'ರದ್ದುಮಾಡಿ',
    completed: 'ಪೂರ್ಣಗೊಂಡಿದೆ',
    due: 'ಇಂದು ನೀಡಬೇಕು',
    overdue: 'ಅವಧಿ ಮೀರಿದೆ',
    upcoming: 'ಮುಂಬರುವ',
    disclaimer: 'ಸ್ವಾಸ್ಥ್ಯಸಾಥಿ ಆರೋಗ್ಯ ದಾಖಲೆ ನಿರ್ವಹಣಾ ಸಾಧನ ಮಾತ್ರ, ವೈದ್ಯಕೀಯ ಪರೀಕ್ಷೆಯ ಪರ್ಯಾಯವಲ್ಲ.',
  },
  ml: {
    appName: 'സ്വാസ്ഥ്യസാഥി',
    appTagline: 'എല്ലായിടത്തും എത്തുന്ന ആരോഗ്യ പരിചരണം.',
    appDescription: 'ആശ പ്രവർത്തകർക്കായുള്ള ഓഫ്‌ലൈൻ ഡിജിറ്റൽ ഹെൽത്ത് റെക്കോർഡ് പ്ലാറ്റ്‌ഫോം.',
    getStarted: 'ആശ പോർട്ടൽ തുടങ്ങുക',
    exploreFeatures: 'സവിശേഷതകൾ കാണുക',
    ashaPortal: 'ആശ പോർട്ടൽ',
    login: 'ലോഗിൻ / ഡെമോ',
    logout: 'ലോഗ് ഔട്ട്',
    dashboard: 'ഡാഷ്‌ബോർഡ്',
    families: 'കുടുംബ വിവരങ്ങൾ',
    addFamily: 'പുതിയ കുടുംബം ചേർക്കുക',
    visits: 'ഭവന സന്ദർശനങ്ങൾ',
    maternalHealth: 'മാതൃ ആരോഗ്യം',
    vaccinationTracker: 'വാക്സിനേഷൻ ട്രാക്കർ',
    saathiAi: 'സാഥി AI സഹായി',
    offlineSync: 'ഓഫ്‌ലൈൻ & സമന്വയം',
    notifications: 'അറിയിപ്പുകൾ',
    settings: 'ക്രമീകരണങ്ങൾ',
    language: 'ഭാഷ',
    selectLanguage: 'ഭാഷ തിരഞ്ഞെടുക്കുക',
    online: 'ഓൺലൈൻ',
    offline: 'ഓഫ്‌ലൈൻ മോഡ്',
    syncPending: 'സമന്വയം ബാക്കി',
    allSynced: 'എല്ലാ രേഖകളും സമന്വയിപ്പിച്ചു',
    syncNow: 'ഇപ്പോൾ സമന്വയിപ്പിക്കുക',
    searchPlaceholder: 'കുടുംബം അല്ലെങ്കിൽ ഗ്രാമം തിരയുക...',
    totalFamilies: 'രജിസ്റ്റർ ചെയ്ത കുടുംബങ്ങൾ',
    totalMembers: 'ആകെ ഗുണഭോക്താക്കൾ',
    upcomingVisits: 'വരാനിരിക്കുന്ന സന്ദർശനങ്ങൾ',
    vaccinationsDue: 'എടുക്കേണ്ട കുത്തിവെയ്പ്പുകൾ',
    maternalFollowups: 'മാതൃ ഫോളോ-അപ്പുകൾ',
    priorityTasks: 'പ്രധാന ചുമതലകൾ',
    recentActivity: 'സമീപകാല സന്ദർശനങ്ങൾ',
    recordVisit: 'സന്ദർശനം രേഖപ്പെടുത്തുക',
    addPregnancy: 'ഗർഭധാരണം രേഖപ്പെടുത്തുക',
    updateVaccination: 'കുത്തിവെയ്പ്പ് പുതുക്കുക',
    quickActions: 'പെട്ടെന്നുള്ള പ്രവർത്തനങ്ങൾ',
    welcomeBack: 'സ്വാഗതം',
    ashaWorker: 'ആശ പ്രവർത്തക',
    householdId: 'കുടുംബ ഐഡി',
    headOfFamily: 'കുടുംബനാഥൻ/നാഥ',
    village: 'ഗ്രാമം',
    contactNumber: 'ഫോൺ നമ്പർ',
    save: 'സൂക്ഷിക്കുക',
    cancel: 'റദ്ദാക്കുക',
    completed: 'പൂർത്തിയായി',
    due: 'ഇന്ന് ചെയ്യേണ്ടത്',
    overdue: 'കാലാവധി കഴിഞ്ഞത്',
    upcoming: 'വരാനിരിക്കുന്നവ',
    disclaimer: 'സ്വാസ്ഥ്യസാഥി ഒരു റെക്കോർഡ് മാനേജ്‌മെന്റ് ഉപകരണം മാത്രമാണ്, രോഗനിർണ്ണയ സംവിധാനമല്ല.',
  },
  pa: {
    appName: 'ਸਵਾਸਥਿਆਸਾਥੀ',
    appTagline: 'ਸਿਹਤ ਸੰਭਾਲ ਜੋ ਹਰ ਥਾਂ ਪਹੁੰਚੇ।',
    appDescription: 'ਆਸ਼ਾ ਵਰਕਰਾਂ ਲਈ ਔਫਲਾਈਨ ਡਿਜੀਟਲ ਸਿਹਤ ਰਿਕਾਰਡ ਪਲੇਟਫਾਰਮ — ਬਿਨਾਂ ਇੰਟਰਨੈਟ ਦੇ ਵੀ ਪੂਰੀ ਤਰ੍ਹਾਂ ਕਾਰਜਸ਼ੀਲ।',
    getStarted: 'ਆਸ਼ਾ ਪੋਰਟਲ ਸ਼ੁਰੂ ਕਰੋ',
    exploreFeatures: 'ਵਿਸ਼ੇਸ਼ਤਾਵਾਂ ਦੇਖੋ',
    ashaPortal: 'ਆਸ਼ਾ ਪੋਰਟਲ',
    login: 'ਲੌਗ ਇਨ / ਡੈਮੋ',
    logout: 'ਲੌਗ ਆਉਟ',
    dashboard: 'ਡੈਸ਼ਬੋਰਡ',
    families: 'ਪਰਿਵਾਰਕ ਰਿਕਾਰਡ',
    addFamily: 'ਨਵਾਂ ਪਰਿਵਾਰ ਜੋੜੋ',
    visits: 'ਘਰੇਲੂ ਫੇਰੀਆਂ',
    maternalHealth: 'ਮਾਤਾ ਸਿਹਤ',
    vaccinationTracker: 'ਟੀਕਾਕਰਨ ਟਰੈਕਰ',
    saathiAi: 'ਸਾਥੀ AI ਸਹਾਇਕ',
    offlineSync: 'ਔਫਲਾਈਨ ਅਤੇ ਸਿੰਕ',
    notifications: 'ਸੂਚਨਾਵਾਂ',
    settings: 'ਸੈਟਿੰਗਾਂ',
    language: 'ਭਾਸ਼ਾ',
    selectLanguage: 'ਭਾਸ਼ਾ ਚੁਣੋ',
    online: 'ਔਨਲਾਈਨ',
    offline: 'ਔਫਲਾਈਨ ਮੋਡ',
    syncPending: 'ਸਿੰਕ ਬਾਕੀ ਹੈ',
    allSynced: 'ਸਾਰੇ ਰਿਕਾਰਡ ਸਿੰਕ ਹਨ',
    syncNow: 'ਹੁਣੇ ਸਿੰਕ ਕਰੋ',
    searchPlaceholder: 'ਪਰਿਵਾਰ ਜਾਂ ਪਿੰਡ ਖੋਜੋ...',
    totalFamilies: 'ਰਜਿਸਟਰਡ ਪਰਿਵਾਰ',
    totalMembers: 'ਕੁੱਲ ਲਾਭਪਾਤਰੀ',
    upcomingVisits: 'ਆਉਣ ਵਾਲੀਆਂ ਫੇਰੀਆਂ',
    vaccinationsDue: 'ਬਾਕੀ ਟੀਕੇ',
    maternalFollowups: 'ਮਾਤਾ ਫਾਲੋ-ਅੱਪ',
    priorityTasks: 'ਤਰਜੀਹੀ ਕੰਮ',
    recentActivity: 'ਹਾਲੀਆ ਫੇਰੀਆਂ',
    recordVisit: 'ਫੇਰੀ ਦਰਜ ਕਰੋ',
    addPregnancy: 'ਗਰਭ ਅਵਸਥਾ ਦਰਜ ਕਰੋ',
    updateVaccination: 'ਟੀਕਾਕਰਨ ਅੱਪਡੇਟ ਕਰੋ',
    quickActions: 'ਤੇਜ਼ ਕਾਰਵਾਈਆਂ',
    welcomeBack: 'ਜੀ ਆਇਆਂ ਨੂੰ',
    ashaWorker: 'ਆਸ਼ਾ ਵਰਕਰ',
    householdId: 'ਘਰ ਨੰਬਰ',
    headOfFamily: 'ਪਰਿਵਾਰ ਦਾ ਮੁਖੀ',
    village: 'ਪਿੰਡ',
    contactNumber: 'ਸੰਪਰਕ ਨੰਬਰ',
    save: 'ਸੇਵ ਕਰੋ',
    cancel: 'ਰੱਦ ਕਰੋ',
    completed: 'ਮੁਕੰਮਲ',
    due: 'ਅੱਜ ਦੇਣਾ ਹੈ',
    overdue: 'ਮਿਆਦ ਪੁੱਗੀ',
    upcoming: 'ਆਉਣ ਵਾਲਾ',
    disclaimer: 'ਸਵਾਸਥਿਆਸਾਥੀ ਇੱਕ ਰਿਕਾਰਡ ਪ੍ਰਬੰਧਨ ਸਾਧਨ ਹੈ। ਇਹ ਕੋਈ ਡਾਕਟਰੀ ਜਾਂਚ ਪ੍ਰਣਾਲੀ ਨਹੀਂ ਹੈ।',
  },
};

interface LanguageContextType {
  language: LanguageCode;
  setLanguage: (lang: LanguageCode) => void;
  t: (key: TranslationKey) => string;
  languages: LanguageOption[];
  currentLanguageOption: LanguageOption;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<LanguageCode>(() => {
    try {
      const saved = localStorage.getItem('swasthya_lang') as LanguageCode;
      if (saved && translations[saved]) return saved;
    } catch {
      // fallback
    }
    return 'en';
  });

  const setLanguage = (lang: LanguageCode) => {
    setLanguageState(lang);
    try {
      localStorage.setItem('swasthya_lang', lang);
    } catch {
      // ignore storage error
    }
  };

  const t = (key: TranslationKey): string => {
    const langDict = translations[language];
    if (langDict && langDict[key]) {
      return langDict[key];
    }
    // Fallback to English
    return translations.en[key] || key;
  };

  const currentLanguageOption =
    SUPPORTED_LANGUAGES.find((l) => l.code === language) || SUPPORTED_LANGUAGES[0];

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        t,
        languages: SUPPORTED_LANGUAGES,
        currentLanguageOption,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
