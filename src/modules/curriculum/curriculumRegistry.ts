import { LessonData, UnitData } from '../../types/curriculum';
import { GenericExercise } from '../../data/activityBookAllLessons';
import { LineChunk } from '../../data/curriculumChunks';

import { unit1Lessons, unitsList } from '../../data/unit1Data';
import { unit2Lessons } from '../../data/unit2Data';
import { unit3Lessons } from '../../data/unit3Data';

import { lessons3to10ActivityData } from '../../data/activityBookAllLessons';
import { unit2ActivityData } from '../../data/unit2ActivityBookData';
import { unit3ActivityData } from '../../data/unit3ActivityBookData';

import { CURRICULUM_CHUNKS as unit1Chunks } from '../../data/curriculumChunks';
import { UNIT2_CURRICULUM_CHUNKS as unit2Chunks } from '../../data/unit2CurriculumChunks';
import { UNIT3_CURRICULUM_CHUNKS as unit3Chunks } from '../../data/unit3CurriculumChunks';

export interface UnitBundle {
  id: string;
  unitNumber: number;
  metadata: UnitData;
  lessons: LessonData[];
  activityData: Record<number, GenericExercise[]>;
  chunks: Record<string, LineChunk[]>;
}

export const UNITS_REGISTRY: Record<string, UnitBundle> = {
  'unit-1': {
    id: 'unit-1',
    unitNumber: 1,
    metadata: unitsList[0],
    lessons: unit1Lessons,
    activityData: lessons3to10ActivityData,
    chunks: unit1Chunks,
  },
  'unit-2': {
    id: 'unit-2',
    unitNumber: 2,
    metadata: unitsList[1],
    lessons: unit2Lessons,
    activityData: unit2ActivityData,
    chunks: unit2Chunks,
  },
  'unit-3': {
    id: 'unit-3',
    unitNumber: 3,
    metadata: unitsList.find((u) => u.id === 'unit-3') || unitsList[2],
    lessons: unit3Lessons,
    activityData: unit3ActivityData,
    chunks: unit3Chunks,
  },
};

/**
 * Get the full data bundle for a specific unit
 */
export function getUnitBundle(unitId: string): UnitBundle {
  return UNITS_REGISTRY[unitId] || UNITS_REGISTRY['unit-1'];
}

/**
 * Get lessons array for a specific unit
 */
export function getUnitLessons(unitId: string): LessonData[] {
  return getUnitBundle(unitId).lessons;
}

/**
 * Get activity book exercises for a specific lesson in a unit
 */
export function getUnitExercises(unitId: string, lessonNumber: number): GenericExercise[] {
  const bundle = getUnitBundle(unitId);
  return bundle.activityData[lessonNumber] || [];
}

/**
 * Get phrase chunks for interactive translations in a unit
 */
export function getUnitChunks(unitId: string): Record<string, LineChunk[]> {
  return getUnitBundle(unitId).chunks;
}

/**
 * Get formatted Arabic unit title for breadcrumbs and headers
 */
export function getUnitLabelAr(unitId: string): string {
  switch (unitId) {
    case 'unit-3':
      return 'الوحدة الثالثة';
    case 'unit-2':
      return 'الوحدة الثانية';
    default:
      return 'الوحدة الأولى';
  }
}

/**
 * List all available units for the unit selector
 */
export function getAllUnits(): UnitData[] {
  return unitsList;
}
