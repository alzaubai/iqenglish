export interface TopicExample {
  en: string;
  ar: string;
  highlight?: string;
  note?: string;
}

export interface ExamSentencePart {
  label: string;
  value: string;
  color?: 'blue' | 'purple' | 'amber' | 'emerald' | 'rose' | 'zinc';
}

export interface ExamSolutionToken {
  text: string;
  isChanged?: boolean;
}

export interface CumulativeStep {
  stepNumber: number;
  titleAr: string;
  explanationAr: string;
  sentenceProgress: string;
  highlightToken?: string;
}

export interface ExamApplicationItem {
  id: string;
  problemEn: string;
  instructionAr: string;
  solutionEn: string;
  solutionTokens?: ExamSolutionToken[];
  dissection?: ExamSentencePart[];
  cumulativeSteps?: CumulativeStep[];
  actionStepAr?: string;
  noteAr: string;
}

export interface TextbookVerb {
  base: string;
  past: string;
  ar: string;
  type: 'regular' | 'irregular';
  note?: string;
}

export interface ExamPracticeItem {
  id: string;
  type: 'choice' | 'correct' | 'transform';
  questionEn: string;
  questionAr: string;
  options?: string[];
  correctAnswer: string;
  explanationAr: string;
}

export interface GrammarTopicData {
  id: string;
  number: number;
  titleAr: string;
  titleEn: string;
  taglineAr: string;
  category: string;
  badge: string;
  color: 'blue' | 'emerald' | 'purple' | 'amber' | 'teal' | 'indigo';
  summaryAr: string;
  // Specific sections depending on topic type
  topicType: 'tense' | 'pronouns' | 'connectors' | 'interests' | 'questions' | 'comparatives' | 'ordinal-dates';
  
  // Overview for tenses (usage, time markers, spelling, verbs)
  overview?: {
    usageTitleAr: string;
    usageDescAr: string;
    quickNoteAr?: string;
    spellingTitleAr?: string;
    spellingSubtitleAr?: string;
    timeMarkers: { marker: string; ar: string; exampleEn: string }[];
    spellingRules: { titleAr: string; descAr: string; examples: { base: string; changed: string; ar: string }[] }[];
    textbookVerbs: TextbookVerb[];
  };

  // For tenses (Past Simple / Past Continuous)
  timeMarkers?: string[];
  affirmative?: {
    formulaChips: { text: string; isHighlight?: boolean; note?: string }[];
    explanationAr: string;
    examples: TopicExample[];
    examApplications?: ExamApplicationItem[];
  };
  negative?: {
    formulaChips: { text: string; isHighlight?: boolean; note?: string }[];
    explanationAr: string;
    warningAr?: string;
    examples: TopicExample[];
    examApplications?: ExamApplicationItem[];
  };
  question?: {
    formulaChips: { text: string; isHighlight?: boolean; note?: string }[];
    explanationAr: string;
    examples: TopicExample[];
    examApplications?: ExamApplicationItem[];
  };
  spellingNotes?: {
    titleAr: string;
    rules: { titleAr: string; descAr: string; examples: { base: string; changed: string; ar: string }[] }[];
  };

  // For Possessive Pronouns
  pronounsTable?: {
    subject: string;
    adjective?: string;
    possessive: string;
    ar: string;
    exampleEn: string;
    exampleAr: string;
  }[];
  pronounRules?: {
    titleAr: string;
    descAr: string;
    examples: TopicExample[];
  }[];
  pronounApplications?: ExamApplicationItem[];

  // For Connectors (and, but, or)
  connectorsList?: {
    name: string;
    meaningAr: string;
    functionAr?: string;
    examples: TopicExample[];
  }[];

  // For Interests (like, love, enjoy, interested in)
  interestsSections?: {
    titleAr: string;
    formulaChips: { text: string; isHighlight?: boolean; note?: string }[];
    explanationAr: string;
    examples: TopicExample[];
  }[];

  // For Wh- Questions
  questionWordsTable?: {
    word: string;
    meaningAr: string;
    functionAr?: string;
    usageAr?: string;
    exampleEn: string;
    exampleAr: string;
  }[];
  questionRules?: {
    titleAr: string;
    ruleTitleEn?: string;
    formulaChips: { text: string; isHighlight?: boolean; note?: string }[];
    explanationAr: string;
    examples: TopicExample[];
  }[];
  questionApplications?: any[];
  examApplications?: any[];

  // 1st Intermediate Monthly Exam Practice (NOT ministerial!)
  examPractice: ExamPracticeItem[];
}
