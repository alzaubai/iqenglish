export interface TranscriptLine {
  id: string;
  speaker: string;
  gender?: 'male' | 'female';
  textEn: string;
  textAr: string;
  audioFileUrl?: string;
}

export interface TranscriptSection {
  id: string;
  titleEn: string;
  titleAr: string;
  audioTrackNumber: number;
  bookReference: string; // e.g., "Student's Book p. 80"
  description: string;
  audioFileUrl?: string;
  hasGeminiAudio?: boolean;
  lines: TranscriptLine[];
}

export interface ActivityExercise {
  id: string;
  pageNumber: number;
  exerciseNumber: string; // e.g. "1", "2", "3", "B"
  titleEn: string;
  titleAr: string;
  instructionEn: string;
  instructionAr: string;
}

export interface LessonData {
  id: string;
  unitNumber: number;
  lessonNumber: number; // 1 to 10
  titleEn: string;
  titleAr: string;
  subtitleEn: string;
  subtitleAr: string;
  imageUrl?: string;
  transcripts: TranscriptSection[];
}

export interface UnitData {
  id: string;
  unitNumber: number;
  titleEn: string;
  titleAr: string;
  descriptionEn: string;
  descriptionAr: string;
  isAvailable: boolean;
  lessonsCount: number;
}
