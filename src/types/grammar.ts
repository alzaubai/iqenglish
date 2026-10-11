export interface GrammarExample {
  en: string;
  ar: string;
  highlightWord?: string;
}

export interface GrammarRule {
  id: string;
  titleAr: string;
  titleEn?: string;
  formula: string;
  formulaNoteAr?: string;
  explanationAr: string;
  examples: GrammarExample[];
}

export interface VerbRow {
  base: string;       // المصدر المجرد
  past: string;       // صيغة الماضي
  meaningAr: string;  // المعنى بالعربية
  type: 'regular' | 'irregular';
}

export interface VerbTable {
  titleAr: string;
  descriptionAr?: string;
  rows: VerbRow[];
}

export interface GrammarQuizQuestion {
  id: string;
  questionTextEn: string;
  questionTextAr?: string;
  options: string[];
  correctIndex: number;
  explanationAr: string;
}

export interface GrammarTopic {
  id: string;
  titleAr: string;
  titleEn: string;
  summaryAr: string;
  rules: GrammarRule[];
  verbTables?: VerbTable[];
  examTips?: string[];
  quiz?: GrammarQuizQuestion[];
}

export interface GrammarLesson {
  id: string;
  unitNumber: number;
  lessonNumber: number;
  titleAr: string;
  titleEn: string;
  subtitleAr: string;
  topics: GrammarTopic[];
}

export interface GrammarUnit {
  id: string;
  unitNumber: number;
  titleEn: string;
  titleAr: string;
  descriptionAr: string;
  isAvailable: boolean;
  lessons: GrammarLesson[];
}
