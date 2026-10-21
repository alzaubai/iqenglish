import fs from 'fs';

let content = fs.readFileSync('src/services/firebase.ts', 'utf8');
const oldTarget = `unlockedLessons: ['lesson-1', 'u2-lesson-1'],\r\n  unlockedGrammarTopics: ['topic-past-simple', 'u2-topic-future-will'],`;
const newTarget = `unlockedLessons: ['lesson-1', 'u2-lesson-1', 'u3-lesson-1', 'u3-lesson-2', 'u3-lesson-3'],\r\n  unlockedGrammarTopics: ['topic-past-simple', 'u2-topic-future-will', 'u3-present-perfect'],`;

if (content.includes(oldTarget)) {
  content = content.replace(oldTarget, newTarget);
  fs.writeFileSync('src/services/firebase.ts', content, 'utf8');
  console.log('firebase.ts updated successfully (CRLF)');
} else {
  // Try LF
  const oldLF = oldTarget.replace(/\r\n/g, '\n');
  const newLF = newTarget.replace(/\r\n/g, '\n');
  if (content.includes(oldLF)) {
    content = content.replace(oldLF, newLF);
    fs.writeFileSync('src/services/firebase.ts', content, 'utf8');
    console.log('firebase.ts updated successfully (LF)');
  } else {
    console.error('Target not found in firebase.ts');
  }
}
