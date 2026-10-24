import React, { useState } from 'react';
import { ExerciseADialogueMatch } from './lesson6/ExerciseADialogueMatch';
import { Exercise1ComprehensionQuestions } from './lesson6/Exercise1ComprehensionQuestions';
import { Exercise2PartnerDialogue } from './lesson6/Exercise2PartnerDialogue';
import { Exercise3SoundsSort } from './lesson6/Exercise3SoundsSort';

interface Lesson6ExercisesProps {
  onProgressUpdate: (completed: boolean) => void;
}

const TABS = [
  { step: 1, title: 'تمرين A (مطابقة المحادثة - ص 14)' },
  { step: 2, title: 'تمرين 1 (أسئلة الاستيعاب - ص 15)' },
  { step: 3, title: 'تمرين 2 (محادثة الهوايات - ص 15)' },
  { step: 4, title: 'تمرين 3 (تمييز الأصوات - ص 15)' },
] as const;

export const Lesson6Exercises: React.FC<Lesson6ExercisesProps> = ({ onProgressUpdate }) => {
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3 | 4>(1);

  return (
    <div className="space-y-6">
      {/* Exercise Tabs Bar: Consistent with site design */}
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

      {/* Preserve state across tabs by toggling display */}
      <div className={currentStep === 1 ? 'block' : 'hidden'}>
        <ExerciseADialogueMatch />
      </div>

      <div className={currentStep === 2 ? 'block' : 'hidden'}>
        <Exercise1ComprehensionQuestions />
      </div>

      <div className={currentStep === 3 ? 'block' : 'hidden'}>
        <Exercise2PartnerDialogue />
      </div>

      <div className={currentStep === 4 ? 'block' : 'hidden'}>
        <Exercise3SoundsSort />
      </div>
    </div>
  );
};
