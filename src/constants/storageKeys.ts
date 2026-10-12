/**
 * Centralized LocalStorage and SessionStorage Keys
 * Prevents key collision and unintended logout across user roles.
 */
export const STORAGE_KEYS = {
  // Teacher session flag ('true' if teacher is logged in)
  TEACHER_LOGGED_IN: 'iq_is_teacher',

  // Teacher token validating active PIN session
  TEACHER_TOKEN: 'iq_teacher_token',

  // Student profile session JSON
  STUDENT_PROFILE: 'iq_student_profile',

  // Cached platform config (locks, allowed codes, active exam)
  PLATFORM_CONFIG_CACHE: 'iq_platform_config_cache',

  // Generator for dynamic exam completion key
  examDone: (examId: string, studentId: string): string =>
    `iq_exam_done_${examId}_${studentId}`,
} as const;
