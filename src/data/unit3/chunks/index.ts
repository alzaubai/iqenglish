import { LineChunk } from '../../curriculumChunks';
import { lesson1Chunks } from './lesson1Chunks';
import { lesson2Chunks } from './lesson2Chunks';
import { lesson3Chunks } from './lesson3Chunks';
import { lesson4Chunks } from './lesson4Chunks';
import { lesson5Chunks } from './lesson5Chunks';
import { lesson6Chunks } from './lesson6Chunks';
import { lesson7Chunks } from './lesson7Chunks';
import { lesson8Chunks } from './lesson8Chunks';
import { lesson9Chunks } from './lesson9Chunks';
import { lesson10Chunks } from './lesson10Chunks';

export const UNIT3_CURRICULUM_CHUNKS: Record<string, LineChunk[]> = {
  ...lesson1Chunks,
  ...lesson2Chunks,
  ...lesson3Chunks,
  ...lesson4Chunks,
  ...lesson5Chunks,
  ...lesson6Chunks,
  ...lesson7Chunks,
  ...lesson8Chunks,
  ...lesson9Chunks,
  ...lesson10Chunks,
};

export {
  lesson1Chunks,
  lesson2Chunks,
  lesson3Chunks,
  lesson4Chunks,
  lesson5Chunks,
  lesson6Chunks,
  lesson7Chunks,
  lesson8Chunks,
  lesson9Chunks,
  lesson10Chunks,
};
