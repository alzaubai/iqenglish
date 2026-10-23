import React, { useState } from 'react';
import { ExerciseBRulePosition } from './lesson5/ExerciseBRulePosition';
import { Exercise1FrequencySurvey } from './lesson5/Exercise1FrequencySurvey';
import { Exercise2PartnerGame } from './lesson5/Exercise2PartnerGame';
import { Exercise3AdverbsSentences } from './lesson5/Exercise3AdverbsSentences';
import { Exercise4FiveSentencesWriting } from './lesson5/Exercise4FiveSentencesWriting';

interface Lesson5ExercisesProps {
  onProgressUpdate: (completed: boolean) => void;
}

const TABS = [
  { step: 1, title: 'قاعدة B (موقع ظروف التكرار)' },
  { step: 2, title: 'تمرين 1 (استبيان التكرار)' },
  { step: 3, title: 'تمرين 2 (محادثة الزميل)' },
  { step: 4, title: 'تمرين 3 (إكمال الجمل الست)' },
  { step: 5, title: 'تمرين 4 (كتابة 5 جمل)' },
] as const;

export const Lesson5Exercises: React.FC<Lesson5ExercisesProps> = ({ onProgressUpdate }) => {
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

      {/* Preserve state across tabs by toggling display */}
      <div className={currentStep === 1 ? 'block' : 'hidden'}>
        <ExerciseBRulePosition />
      </div>

      <div className={currentStep === 2 ? 'block' : 'hidden'}>
        <Exercise1FrequencySurvey />
      </div>

      <div className={currentStep === 3 ? 'block' : 'hidden'}>
        <Exercise2PartnerGame />
      </div>

      <div className={currentStep === 4 ? 'block' : 'hidden'}>
        <Exercise3AdverbsSentences />
      </div>

      <div className={currentStep === 5 ? 'block' : 'hidden'}>
        <Exercise4FiveSentencesWriting />
      </div>
    </div>
  );
};
