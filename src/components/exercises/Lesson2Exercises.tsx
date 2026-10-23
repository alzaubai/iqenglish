import React, { useState } from 'react';
import { ExerciseBPhotos } from './lesson2/ExerciseBPhotos';
import { Exercise1Descriptions } from './lesson2/Exercise1Descriptions';
import { Exercise3WordMatches } from './lesson2/Exercise3WordMatches';
import { Exercise4ScrambledSentences } from './lesson2/Exercise4ScrambledSentences';
import { Exercise5SaraInterview } from './lesson2/Exercise5SaraInterview';

interface Lesson2ExercisesProps {
  onProgressUpdate: (completed: boolean) => void;
}

const TABS = [
  { step: 1, title: 'تمرين 1 (الصور)' },
  { step: 2, title: 'تمرين 2 (الصفات)' },
  { step: 3, title: 'تمرين 3 (المعاني)' },
  { step: 4, title: 'تمرين 4 (ترتيب)' },
  { step: 5, title: 'تمرين 5 (سارة)' },
] as const;

export const Lesson2Exercises: React.FC<Lesson2ExercisesProps> = ({
  onProgressUpdate,
}) => {
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
        <ExerciseBPhotos onProgressUpdate={onProgressUpdate} />
      </div>

      <div className={currentStep === 2 ? 'block' : 'hidden'}>
        <Exercise1Descriptions onProgressUpdate={onProgressUpdate} />
      </div>

      <div className={currentStep === 3 ? 'block' : 'hidden'}>
        <Exercise3WordMatches onProgressUpdate={onProgressUpdate} />
      </div>

      <div className={currentStep === 4 ? 'block' : 'hidden'}>
        <Exercise4ScrambledSentences onProgressUpdate={onProgressUpdate} />
      </div>

      <div className={currentStep === 5 ? 'block' : 'hidden'}>
        <Exercise5SaraInterview onProgressUpdate={onProgressUpdate} />
      </div>
    </div>
  );
};
