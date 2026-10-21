import fs from 'fs';

let content = fs.readFileSync('src/App.tsx', 'utf8');

// 1. Add import
if (!content.includes('useAccessControl')) {
  content = content.replace(
    "import { unit3ActivityData } from './data/unit3ActivityBookData';",
    "import { unit3ActivityData } from './data/unit3ActivityBookData';\r\nimport { useAccessControl } from './modules/access-control/useAccessControl';"
  );
}

// 2. Replace effectiveUnlockedLessons & effectiveUnlockedGrammarTopics calculation
const oldCalcTarget = `  const isExternalSubscriber = Boolean(studentSession?.isExternalSubscriber);
  const effectiveUnlockedLessons = (isExternalSubscriber || isTeacherLoggedIn)
    ? [...unit1Lessons.map((l) => l.id), ...unit2Lessons.map((l) => l.id), ...unit3Lessons.map((l) => l.id)]
    : Array.isArray(platformConfig.unlockedLessons)
      ? platformConfig.unlockedLessons
      : ['lesson-1', 'u2-lesson-1', 'u3-lesson-1', 'u3-lesson-2', 'u3-lesson-3'];
  const effectiveUnlockedGrammarTopics = (isExternalSubscriber || isTeacherLoggedIn)
    ? [
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
      ]
    : platformConfig.unlockedGrammarTopics && platformConfig.unlockedGrammarTopics.length > 0
      ? platformConfig.unlockedGrammarTopics
      : ['topic-past-simple', 'u2-topic-future-will'];`;

const newCalc = `  const isExternalSubscriber = Boolean(studentSession?.isExternalSubscriber);
  const {
    unlockedLessonIds,
    unlockedGrammarTopicIds,
    canUserAccessLesson,
    canUserAccessGrammarTopic,
  } = useAccessControl({
    platformConfig,
    isTeacherLoggedIn,
    isExternalSubscriber,
  });`;

const oldCalcTargetCRLF = oldCalcTarget.replace(/\n/g, '\r\n');
const newCalcCRLF = newCalc.replace(/\n/g, '\r\n');

if (content.includes(oldCalcTargetCRLF)) {
  content = content.replace(oldCalcTargetCRLF, newCalcCRLF);
  console.log('Hook integrated (CRLF)');
} else if (content.includes(oldCalcTarget)) {
  content = content.replace(oldCalcTarget, newCalc);
  console.log('Hook integrated (LF)');
} else {
  console.error('Warning: oldCalcTarget not found');
}

// 3. Update handleSelectLesson, handlePrevLesson, handleNextLesson, handleSelectGrammarTopic
content = content.replace(
  "const isUnlocked = effectiveUnlockedLessons.includes(lessonId);\r\n    if (!isUnlocked) {\r\n      alert('عذراً، هذا الدرس مغلق حالياً من قبل مدرس المادة: أ. حسام محمود منصور');\r\n      return;\r\n    }",
  "const isUnlocked = canUserAccessLesson(lessonId);\r\n    if (!isUnlocked) {\r\n      alert('عذراً، هذا الدرس مغلق حالياً من قبل مدرس المادة');\r\n      return;\r\n    }"
);

content = content.replace(
  "const isUnlocked = effectiveUnlockedLessons.includes(prevLesson.id);\r\n      if (!isUnlocked) {\r\n        alert('عذراً، هذا الدرس مغلق حالياً من قبل مدرس المادة: أ. حسام محمود منصور');\r\n        return;\r\n      }",
  "const isUnlocked = canUserAccessLesson(prevLesson.id);\r\n      if (!isUnlocked) {\r\n        alert('عذراً، هذا الدرس مغلق حالياً من قبل مدرس المادة');\r\n        return;\r\n      }"
);

content = content.replace(
  "const isUnlocked = effectiveUnlockedLessons.includes(nextLesson.id);\r\n      if (!isUnlocked) {\r\n        alert('عذراً، هذا الدرس مغلق حالياً من قبل مدرس المادة: أ. حسام محمود منصور');\r\n        return;\r\n      }",
  "const isUnlocked = canUserAccessLesson(nextLesson.id);\r\n      if (!isUnlocked) {\r\n        alert('عذراً، هذا الدرس مغلق حالياً من قبل مدرس المادة');\r\n        return;\r\n      }"
);

content = content.replace(
  "const isUnlocked = effectiveUnlockedGrammarTopics.includes(topicId);\r\n    if (!isUnlocked) {\r\n      alert('عذراً، هذا الموضوع مغلق حالياً من قبل مدرس المادة: أ. حسام محمود منصور');\r\n      return;\r\n    }",
  "const isUnlocked = canUserAccessGrammarTopic(topicId);\r\n    if (!isUnlocked) {\r\n      alert('عذراً، هذا الموضوع مغلق حالياً من قبل مدرس المادة');\r\n      return;\r\n    }"
);

// 4. Update LessonGridSelector props
content = content.replace(
  "unlockedLessonIds={effectiveUnlockedLessons}",
  "unlockedLessonIds={unlockedLessonIds}\r\n                isTeacher={isTeacherLoggedIn}"
);

// 5. Update Grammar views props
content = content.replaceAll(
  "unlockedGrammarTopics={effectiveUnlockedGrammarTopics}",
  "unlockedGrammarTopics={unlockedGrammarTopicIds}"
);

// 6. Update Lesson detail view checks
content = content.replace(
  "const isCurrentLessonUnlocked = effectiveUnlockedLessons.includes(selectedLessonId);",
  "const isCurrentLessonUnlocked = canUserAccessLesson(selectedLessonId);"
);
content = content.replace(
  "const isPrevUnlocked = prevLesson ? effectiveUnlockedLessons.includes(prevLesson.id) : false;",
  "const isPrevUnlocked = prevLesson ? canUserAccessLesson(prevLesson.id) : false;"
);
content = content.replace(
  "const isNextUnlocked = nextLesson ? effectiveUnlockedLessons.includes(nextLesson.id) : false;",
  "const isNextUnlocked = nextLesson ? canUserAccessLesson(nextLesson.id) : false;"
);

fs.writeFileSync('src/App.tsx', content, 'utf8');
console.log('src/App.tsx fully integrated with useAccessControl!');
