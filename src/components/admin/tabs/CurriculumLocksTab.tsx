import React from 'react';
import { CurriculumLocksManager } from '../curriculum/CurriculumLocksManager';

interface CurriculumLocksTabProps {
  unlockedLessonIds: string[];
  onToggleLesson: (lessonId: string) => void;
  onUnlockUnitLessons: (unitLessonIds: string[]) => void;
  onLockUnitLessons: (unitLessonIds: string[]) => void;
  unlockedGrammarTopicIds: string[];
  onToggleGrammarTopic: (topicId: string) => void;
  onUnlockUnitGrammar: (topicIds: string[]) => void;
  onLockUnitGrammar: (topicIds: string[]) => void;
}

export const CurriculumLocksTab: React.FC<CurriculumLocksTabProps> = ({
  unlockedLessonIds,
  onToggleLesson,
  onUnlockUnitLessons,
  onLockUnitLessons,
  unlockedGrammarTopicIds,
  onToggleGrammarTopic,
  onUnlockUnitGrammar,
  onLockUnitGrammar,
}) => {
  return (
    <div className="space-y-6 text-right">
      <CurriculumLocksManager
        unlockedLessonIds={unlockedLessonIds}
        onToggleLesson={onToggleLesson}
        onUnlockUnitLessons={onUnlockUnitLessons}
        onLockUnitLessons={onLockUnitLessons}
        unlockedGrammarTopicIds={unlockedGrammarTopicIds}
        onToggleGrammarTopic={onToggleGrammarTopic}
        onUnlockUnitGrammar={onUnlockUnitGrammar}
        onLockUnitGrammar={onLockUnitGrammar}
      />
    </div>
  );
};
