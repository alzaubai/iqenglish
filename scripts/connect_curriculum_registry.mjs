import fs from 'fs';

let content = fs.readFileSync('src/App.tsx', 'utf8');

// 1. Update imports
const oldImports = `import { unit1Lessons, unitsList } from './data/unit1Data';
import { unit2Lessons } from './data/unit2Data';
import { unit3Lessons } from './data/unit3Data';
import { lessons3to10ActivityData } from './data/activityBookAllLessons';
import { unit2ActivityData } from './data/unit2ActivityBookData';
import { unit3ActivityData } from './data/unit3ActivityBookData';`;

const newImports = `import {
  getUnitLessons,
  getUnitExercises,
  getUnitLabelAr,
  getAllUnits,
} from './modules/curriculum/curriculumRegistry';`;

const oldImportsCRLF = oldImports.replace(/\n/g, '\r\n');
const newImportsCRLF = newImports.replace(/\n/g, '\r\n');

if (content.includes(oldImportsCRLF)) {
  content = content.replace(oldImportsCRLF, newImportsCRLF);
} else if (content.includes(oldImports)) {
  content = content.replace(oldImports, newImports);
} else {
  console.log('Old imports pattern not matched directly, checking individual');
  content = content.replace(
    /import \{ unit1Lessons[\s\S]*?import \{ unit3ActivityData \} from '\.\/data\/unit3ActivityBookData';/,
    newImports
  );
}

// 2. activeUnitLessons
content = content.replace(
  "const activeUnitLessons = selectedUnitId === 'unit-3' ? unit3Lessons : (selectedUnitId === 'unit-2' ? unit2Lessons : unit1Lessons);",
  "const activeUnitLessons = getUnitLessons(selectedUnitId);"
);

// 3. handleSelectUnit targetLessons
content = content.replace(
  "const targetLessons = unitId === 'unit-3' ? unit3Lessons : (unitId === 'unit-2' ? unit2Lessons : unit1Lessons);",
  "const targetLessons = getUnitLessons(unitId);"
);

// 4. Unit label in breadcrumbs
content = content.replaceAll(
  "{selectedUnitId === 'unit-3' ? 'الوحدة الثالثة' : selectedUnitId === 'unit-2' ? 'الوحدة الثانية' : 'الوحدة الأولى'}",
  "{getUnitLabelAr(selectedUnitId)}"
);

// 5. UnitSelector units prop
content = content.replace(
  "units={unitsList}",
  "units={getAllUnits()}"
);

// 6. Exercises section
const oldExercisesPattern = /\{selectedUnitId === 'unit-3' \? \([\s\S]*?<\/section>/;
const newExercisesSection = `{selectedUnitId === 'unit-1' && currentLesson.lessonNumber === 1 ? (
                    <Lesson1Exercises onProgressUpdate={() => {}} />
                  ) : selectedUnitId === 'unit-1' && currentLesson.lessonNumber === 2 ? (
                    <Lesson2Exercises onProgressUpdate={() => {}} />
                  ) : (
                    <GenericLessonExercises
                      exercises={getUnitExercises(selectedUnitId, currentLesson.lessonNumber)}
                      onProgressUpdate={() => {}}
                    />
                  )}
                </section>`;

content = content.replace(oldExercisesPattern, newExercisesSection);

fs.writeFileSync('src/App.tsx', content, 'utf8');
console.log('App.tsx successfully connected to curriculumRegistry!');
