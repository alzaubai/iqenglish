import { unit2Lessons } from './src/data/unit2Data';

let grandTotal = 0;
console.log('=== UNIT 2 CHARACTER COUNT BREAKDOWN ===');

unit2Lessons.forEach((l) => {
  let lessonTotal = 0;
  let linesCount = 0;
  l.transcripts.forEach((t) => {
    t.lines.forEach((line) => {
      lessonTotal += line.textEn.length;
      linesCount++;
    });
  });
  grandTotal += lessonTotal;
  console.log(`${l.titleEn} (Lesson ${l.lessonNumber}): ${lessonTotal} chars | ${linesCount} lines`);
});

console.log('----------------------------------------------------');
console.log(`TOTAL CHARACTERS FOR ALL 10 LESSONS: ${grandTotal} characters`);
console.log(`TOTAL LINES: ${unit2Lessons.reduce((acc, l) => acc + l.transcripts.reduce((a, b) => a + b.lines.length, 0), 0)}`);
