import React, { useState } from 'react';
import { SwiftComprehensionQuestions } from './lesson10/SwiftComprehensionQuestions';
import { SwiftTrueFalse } from './lesson10/SwiftTrueFalse';
import { SwiftStoryElements } from './lesson10/SwiftStoryElements';
import { SwiftVocabularyMatch } from './lesson10/SwiftVocabularyMatch';

interface Lesson10ExercisesProps {
  onProgressUpdate: (completed: boolean) => void;
}

const TABS = [
  { step: 1, title: 'تمرين 1: أسئلة الفهم لقصة طائر السمامة (ص 13)' },
  { step: 2, title: 'تمرين 2: صح أو خطأ (كتاب النشاط ص 21)' },
  { step: 3, title: 'تمرين 3: عناصر القصة وحقائق الطائر المذهلة' },
  { step: 4, title: 'تمرين 4: مفردات ومعاني القصة' },
] as const;

export const Lesson10Exercises: React.FC<Lesson10ExercisesProps> = ({ onProgressUpdate }) => {
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3 | 4>(1);

  return (
    <div className="space-y-6">
      {/* Exercise Tabs Bar */}
      <div className="flex flex-nowrap sm:flex-wrap overflow-x-auto no-scrollbar gap-1.5 sm:gap-2 pb-1" dir="rtl">
        {TABS.map((tab) => (
          <button
            key={tab.step}
            onClick={() => setCurrentStep(tab.step)}
            className={`py-2 sm:py-3 px-3 sm:px-4 text-center rounded-xl font-bold text-xs sm:text-sm transition-all cursor-pointer font-arabic shrink-0 ${
              currentStep === tab.step
                ? 'bg-zinc-900 text-white shadow-sm'
                : 'bg-white hover:bg-zinc-50 border border-zinc-200 text-zinc-700'
            }`}
          >
            {tab.title}
          </button>
        ))}
      </div>

      {/* Tab 1: Comprehension Questions */}
      <div className={currentStep === 1 ? 'block' : 'hidden'}>
        <SwiftComprehensionQuestions />
      </div>

      {/* Tab 2: Activity Book Page 21 True / False */}
      <div className={currentStep === 2 ? 'block' : 'hidden'}>
        <SwiftTrueFalse />
      </div>

      {/* Tab 3: Story Elements & Amazing Facts */}
      <div className={currentStep === 3 ? 'block' : 'hidden'}>
        <SwiftStoryElements />
      </div>

      {/* Tab 4: Story Vocabulary */}
      <div className={currentStep === 4 ? 'block' : 'hidden'}>
        <SwiftVocabularyMatch />
      </div>
    </div>
  );
};
