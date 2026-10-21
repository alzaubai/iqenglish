import fs from 'fs';

let content = fs.readFileSync('src/App.tsx', 'utf8');

// Replace handleSelectLesson check
content = content.replace(
  /const isUnlocked = effectiveUnlockedLessons\.includes\(lessonId\);[\s\S]*?alert\([^)]+\);[\s\S]*?return;\s*\}/,
  `const isUnlocked = canUserAccessLesson(lessonId);
    if (!isUnlocked) {
      alert('عذراً، هذا الدرس مغلق حالياً من قبل مدرس المادة');
      return;
    }`
);

// Replace handlePrevLesson check
content = content.replace(
  /const isUnlocked = effectiveUnlockedLessons\.includes\(prevLesson\.id\);[\s\S]*?alert\([^)]+\);[\s\S]*?return;\s*\}/,
  `const isUnlocked = canUserAccessLesson(prevLesson.id);
      if (!isUnlocked) {
        alert('عذراً، هذا الدرس مغلق حالياً من قبل مدرس المادة');
        return;
      }`
);

// Replace handleNextLesson check
content = content.replace(
  /const isUnlocked = effectiveUnlockedLessons\.includes\(nextLesson\.id\);[\s\S]*?alert\([^)]+\);[\s\S]*?return;\s*\}/,
  `const isUnlocked = canUserAccessLesson(nextLesson.id);
      if (!isUnlocked) {
        alert('عذراً، هذا الدرس مغلق حالياً من قبل مدرس المادة');
        return;
      }`
);

// Replace handleSelectGrammarTopic check
content = content.replace(
  /const isUnlocked = effectiveUnlockedGrammarTopics\.includes\(topicId\);[\s\S]*?alert\([^)]+\);[\s\S]*?return;\s*\}/,
  `const isUnlocked = canUserAccessGrammarTopic(topicId);
    if (!isUnlocked) {
      alert('عذراً، هذا الموضوع مغلق حالياً من قبل مدرس المادة');
      return;
    }`
);

fs.writeFileSync('src/App.tsx', content, 'utf8');
console.log('App.tsx alerts and checks updated!');
