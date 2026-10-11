import fs from 'fs';
import path from 'path';

// Import data files directly
import { unit1Lessons, unitsList } from '../src/data/unit1Data.ts';
import { lessons3to10ActivityData } from '../src/data/activityBookAllLessons.ts';
import { grammarUnitsList } from '../src/data/grammarData.ts';

const allData = {
  unitsList,
  unit1Lessons,
  activityData: lessons3to10ActivityData,
  grammarUnitsList,
};

fs.writeFileSync(
  path.resolve('public/appData.json'),
  JSON.stringify(allData, null, 2),
  'utf-8'
);

console.log('Successfully exported appData.json! Size:', fs.statSync('public/appData.json').size);
