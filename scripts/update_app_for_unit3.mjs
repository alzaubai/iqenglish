import fs from 'fs';

let content = fs.readFileSync('src/App.tsx', 'utf8');

// 1. Imports
content = content.replace(
  "import { unit2Lessons } from './data/unit2Data';",
  "import { unit2Lessons } from './data/unit2Data';\r\nimport { unit3Lessons } from './data/unit3Data';"
);
content = content.replace(
  "import { unit2ActivityData } from './data/unit2ActivityBookData';",
  "import { unit2ActivityData } from './data/unit2ActivityBookData';\r\nimport { unit3ActivityData } from './data/unit3ActivityBookData';"
);

// 2. activeUnitLessons
content = content.replace(
  "const activeUnitLessons = selectedUnitId === 'unit-2' ? unit2Lessons : unit1Lessons;",
  "const activeUnitLessons = selectedUnitId === 'unit-3' ? unit3Lessons : (selectedUnitId === 'unit-2' ? unit2Lessons : unit1Lessons);"
);

// 3. handleSelectUnit
content = content.replace(
  "const targetLessons = unitId === 'unit-2' ? unit2Lessons : unit1Lessons;",
  "const targetLessons = unitId === 'unit-3' ? unit3Lessons : (unitId === 'unit-2' ? unit2Lessons : unit1Lessons);"
);

// 4. effectiveUnlockedLessons
content = content.replace(
  "? [...unit1Lessons.map((l) => l.id), ...unit2Lessons.map((l) => l.id)]",
  "? [...unit1Lessons.map((l) => l.id), ...unit2Lessons.map((l) => l.id), ...unit3Lessons.map((l) => l.id)]"
);
content = content.replace(
  ": ['lesson-1', 'u2-lesson-1'];",
  ": ['lesson-1', 'u2-lesson-1', 'u3-lesson-1', 'u3-lesson-2', 'u3-lesson-3'];"
);

// 5. Remove teacher name leftover
content = content.replace(
  'تم قفل هذا الدرس من قبل مدرس المادة: أ. حسام محمود منصور',
  'تم قفل هذا الدرس من قبل مدرس المادة'
);

// 6. Unit titles
content = content.replaceAll(
  "{selectedUnitId === 'unit-2' ? 'الوحدة الثانية' : 'الوحدة الأولى'}",
  "{selectedUnitId === 'unit-3' ? 'الوحدة الثالثة' : selectedUnitId === 'unit-2' ? 'الوحدة الثانية' : 'الوحدة الأولى'}"
);

// 7. Exercises
const targetStr = `{selectedUnitId === 'unit-2' ? (
                    <GenericLessonExercises
                      exercises={unit2ActivityData[currentLesson.lessonNumber] || []}
                      onProgressUpdate={() => {}}
                    />
                  ) : (`;

const replaceStr = `{selectedUnitId === 'unit-3' ? (
                    <GenericLessonExercises
                      exercises={unit3ActivityData[currentLesson.lessonNumber] || []}
                      onProgressUpdate={() => {}}
                    />
                  ) : selectedUnitId === 'unit-2' ? (
                    <GenericLessonExercises
                      exercises={unit2ActivityData[currentLesson.lessonNumber] || []}
                      onProgressUpdate={() => {}}
                    />
                  ) : (`;

if (content.includes(targetStr)) {
  content = content.replace(targetStr, replaceStr);
  console.log('Exercises replaced (LF/exact)');
} else {
  // Try CRLF
  const targetCRLF = targetStr.replace(/\n/g, '\r\n');
  const replaceCRLF = replaceStr.replace(/\n/g, '\r\n');
  if (content.includes(targetCRLF)) {
    content = content.replace(targetCRLF, replaceCRLF);
    console.log('Exercises replaced (CRLF)');
  } else {
    console.error('Warning: could not find exercises section');
  }
}

fs.writeFileSync('src/App.tsx', content, 'utf8');
console.log('src/App.tsx successfully updated!');
