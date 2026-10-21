import { useMemo } from 'react';
import { PlatformConfig } from '../../services/firebase';

export const DEFAULT_UNLOCKED_LESSONS = [
  'lesson-1',
  'u2-lesson-1',
  'u3-lesson-1',
  'u3-lesson-2',
  'u3-lesson-3',
  'u3-lesson-4',
  'u3-lesson-5',
  'u3-lesson-6',
];

export const DEFAULT_UNLOCKED_GRAMMAR_TOPICS = [
  'topic-past-simple',
  'topic-wh-questions',
  'u2-topic-future-will',
  'u3-present-perfect',
];

interface UseAccessControlParams {
  platformConfig: PlatformConfig;
  isTeacherLoggedIn: boolean;
  isExternalSubscriber?: boolean;
}

export function useAccessControl({
  platformConfig,
  isTeacherLoggedIn,
  isExternalSubscriber = false,
}: UseAccessControlParams) {
  // 1. Raw unlocked lists from platform configuration
  const unlockedLessonIds = useMemo(() => {
    if (Array.isArray(platformConfig.unlockedLessons) && platformConfig.unlockedLessons.length > 0) {
      return platformConfig.unlockedLessons;
    }
    return DEFAULT_UNLOCKED_LESSONS;
  }, [platformConfig.unlockedLessons]);

  const unlockedGrammarTopicIds = useMemo(() => {
    if (Array.isArray(platformConfig.unlockedGrammarTopics) && platformConfig.unlockedGrammarTopics.length > 0) {
      return platformConfig.unlockedGrammarTopics;
    }
    return DEFAULT_UNLOCKED_GRAMMAR_TOPICS;
  }, [platformConfig.unlockedGrammarTopics]);

  // 2. Check if a lesson is unlocked for students
  const isLessonUnlocked = (lessonId: string): boolean => {
    return unlockedLessonIds.includes(lessonId);
  };

  // 3. Check if current user can access a lesson
  // (Teachers and paid external subscribers have preview privileges)
  const canUserAccessLesson = (lessonId: string): boolean => {
    if (isTeacherLoggedIn || isExternalSubscriber) return true;
    return isLessonUnlocked(lessonId);
  };

  // 4. Grammar checks
  const isGrammarTopicUnlocked = (topicId: string): boolean => {
    return unlockedGrammarTopicIds.includes(topicId);
  };

  const canUserAccessGrammarTopic = (topicId: string): boolean => {
    if (isTeacherLoggedIn || isExternalSubscriber) return true;
    return isGrammarTopicUnlocked(topicId);
  };

  return {
    unlockedLessonIds,
    unlockedGrammarTopicIds,
    isLessonUnlocked,
    canUserAccessLesson,
    isGrammarTopicUnlocked,
    canUserAccessGrammarTopic,
  };
}
