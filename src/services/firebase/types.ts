export interface StudentSession {
  id: string;
  fullName: string;
  section: string;
  code: string;
  registeredAt: string;
  lastSeenAt?: any;
  totalTimeSpentMinutes?: number;
  visitCount?: number;
  // External Subscriber Fields
  isExternalSubscriber?: boolean;
  governorate?: string;
  subscriptionDuration?: SubscriptionDuration;
  subscriptionExpiresAt?: string;
  deviceId?: string;
}

export interface ExamQuestion {
  id: string;
  questionEn: string;
  questionAr?: string;
  options: string[];
  correctAnswer: string;
  points: number;
  explanationAr?: string;
}

export interface QuickExam {
  id: string;
  title: string;
  descriptionAr?: string;
  durationMinutes: number;
  questions: ExamQuestion[];
  isActive: boolean;
  createdAt: string;
}

export interface ExamSubmission {
  id?: string;
  examId: string;
  examTitle: string;
  studentId?: string;
  studentName: string;
  studentSection: string;
  studentCode: string;
  score: number;
  totalPoints: number;
  submittedAt: string;
  answers: Record<string, string>;
}

export const DEFAULT_GRAMMAR_TOPIC_IDS = [
  'topic-past-simple',
  'topic-past-continuous',
  'topic-present-simple',
  'topic-adverbs-frequency',
  'topic-possessive-pronouns',
  'topic-joining-sentences',
  'topic-interests',
  'u2-topic-future-will',
  'u2-topic-comparatives',
  'u2-topic-dates-ordinals',
];

export interface SingleUseCode {
  code: string;
  isUsed: boolean;
  createdAt: string;
  usedByStudentName?: string;
  usedByStudentId?: string;
  usedBySection?: string;
  usedAt?: string;
}

export type SubscriptionDuration =
  | '1_hour'
  | '1_day'
  | '1_week'
  | '1_month'
  | '3_months'
  | '6_months'
  | '1_year';

export const SUBSCRIPTION_DURATIONS_MAP: Record<
  SubscriptionDuration,
  { labelAr: string; days: number; prefix: string }
> = {
  '1_hour': { labelAr: 'تجريبي: ساعة واحدة', days: 1 / 24, prefix: 'TRIAL-1H' },
  '1_day': { labelAr: 'تجريبي: يوم كامل (24 ساعة)', days: 1, prefix: 'TRIAL-1D' },
  '1_week': { labelAr: 'تجريبي: أسبوع كامل (7 أيام)', days: 7, prefix: 'TRIAL-1W' },
  '1_month': { labelAr: 'شهر واحد (30 يوم)', days: 30, prefix: 'SUB-1M' },
  '3_months': { labelAr: '3 أشهر (90 يوم)', days: 90, prefix: 'SUB-3M' },
  '6_months': { labelAr: '6 أشهر (180 يوم)', days: 180, prefix: 'SUB-6M' },
  '1_year': { labelAr: 'سنة كاملة (365 يوم)', days: 365, prefix: 'SUB-1Y' },
};

export interface ExternalSubscriptionCode {
  code: string; // e.g. "SUB-3M-9K2L"
  duration: SubscriptionDuration;
  durationDays: number;
  note?: string; // Optional buyer name or note from teacher (e.g. "حيدر - بغداد")
  createdAt: string;
  isUsed: boolean;
  usedByStudentName?: string;
  usedByStudentId?: string;
  governorate?: string;
  usedAt?: string;
  expiresAt?: string;
  deviceId?: string; // Hardware/Browser lock fingerprint
  deviceInfo?: string; // e.g. "iPhone / iOS" or "Android / Chrome"
  status: 'available' | 'active' | 'expired' | 'suspended';
}

export interface PlatformConfig {
  unlockedLessons: string[]; // e.g. ['lesson-1', 'lesson-2']
  unlockedGrammarTopics?: string[]; // e.g. ['topic-past-simple', 'topic-past-continuous', ...]
  grammarUnlocked: boolean;
  masterCode: string;
  allowedCodes: string[];
  singleUseCodes?: SingleUseCode[]; // Single-use one-time activation codes
  externalSubscriptions?: ExternalSubscriptionCode[]; // Paid external online subscriptions
  revokedCodes?: string[]; // Legacy: globally revoked codes (kept for backward compat)
  // Per-student bans: when a specific student is deleted, only they are blocked (by studentId+code pair)
  revokedStudents?: { studentId: string; code: string; name: string }[];
  activeExamId: string | null;
  isMaintenanceMode?: boolean;
  maintenanceMessageAr?: string;
}

// Default initial configuration - strictly only Lesson 1 of Unit 1 & Unit 2 open by default
export const DEFAULT_PLATFORM_CONFIG: PlatformConfig = {
  unlockedLessons: ['lesson-1', 'u2-lesson-1', 'u3-lesson-1', 'u3-lesson-2', 'u3-lesson-3'],
  unlockedGrammarTopics: ['topic-past-simple', 'u2-topic-future-will', 'u3-present-perfect'],
  grammarUnlocked: true,
  masterCode: 'IQ-7788',
  allowedCodes: ['IQ-STAR', 'ENGLISH-1', 'IQ-7788'],
  singleUseCodes: [],
  externalSubscriptions: [],
  revokedCodes: ['IQ-2026', 'IQ-XXXX'],
  activeExamId: null,
  isMaintenanceMode: false,
  maintenanceMessageAr: 'المنصة مغلقة حالياً إلى إشعار آخر بأمر مدرس المادة.',
};

export const TEACHER_PIN_HASH_DEFAULT =
  '16740bf13991fe083fbe5820cc8da08a5d88e5a48f44a3cfcc283c27b2797ba7';
export const LEGACY_TEACHER_PIN_HASH =
  'b512750b9f875c92b5536d7e9e43b83c73ece62752a8a66751cf18937a2d035f';
