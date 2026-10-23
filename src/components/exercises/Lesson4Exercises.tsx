import React, { useState } from 'react';
import { ExerciseAScrapbookMatch } from './lesson4/ExerciseAScrapbookMatch';
import { Exercise1Pronouns } from './lesson4/Exercise1Pronouns';
import { Exercise2InterestsGerunds } from './lesson4/Exercise2InterestsGerunds';
import { Exercise3HobbiesReading } from './lesson4/Exercise3HobbiesReading';
import { Exercise4WritingParagraph } from './lesson4/Exercise4WritingParagraph';

interface Lesson4ExercisesProps {
  onProgressUpdate: (completed: boolean) => void;
}

const TABS = [
  { step: 1, title: 'تمرين A (مطابقة الدفاتر)' },
  { step: 2, title: 'تمرين 1 (ضمائر التملك)' },
  { step: 3, title: 'تمرين 2 (قاعدة الاهتمامات)' },
  { step: 4, title: 'تمرين 3 (استنتاج الهوايات)' },
  { step: 5, title: 'تمرين 4 (كتابة فقرة)' },
] as const;

export const Lesson4Exercises: React.FC<Lesson4ExercisesProps> = ({ onProgressUpdate }) => {
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3 | 4 | 5>(1);

  return (
    <div className="space-y-6">
      {/* Exercise Tabs Bar: Smooth scrollable on mobile, wrap on tablet/desktop */}
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

      {/* Keep state preserved across tabs by toggling display */}
      <div className={currentStep === 1 ? 'block' : 'hidden'}>
        <ExerciseAScrapbookMatch onProgressUpdate={onProgressUpdate} />
      </div>

      <div className={currentStep === 2 ? 'block' : 'hidden'}>
        <Exercise1Pronouns onProgressUpdate={onProgressUpdate} />
      </div>

      <div className={currentStep === 3 ? 'block' : 'hidden'}>
        <Exercise2InterestsGerunds onProgressUpdate={onProgressUpdate} />
      </div>

      <div className={currentStep === 4 ? 'block' : 'hidden'}>
        <Exercise3HobbiesReading onProgressUpdate={onProgressUpdate} />
      </div>

      <div className={currentStep === 5 ? 'block' : 'hidden'}>
        <Exercise4WritingParagraph onProgressUpdate={onProgressUpdate} />
      </div>
    </div>
  );
};
