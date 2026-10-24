import React, { useState } from 'react';
import { ExerciseAActivitiesMatch } from './lesson7/ExerciseAActivitiesMatch';
import { ExerciseCTrueFalse } from './lesson7/ExerciseCTrueFalse';
import { ExerciseDMakeNotes } from './lesson7/ExerciseDMakeNotes';
import { ExerciseEPartnerInterview } from './lesson7/ExerciseEPartnerInterview';
import { AhmedComprehensionQuestions } from './lesson7/AhmedComprehensionQuestions';

interface Lesson7ExercisesProps {
  onProgressUpdate: (completed: boolean) => void;
}

const TABS = [
  { step: 1, title: 'تمرين A (مطابقة أفعال الأنشطة - ص 15)' },
  { step: 2, title: 'تمرين C (صح أو خطأ - يوم سناء - ص 16)' },
  { step: 3, title: 'تمرين D و E (الملاحظات والمقابلة - ص 16)' },
  { step: 4, title: 'تمرين F (الأسئلة الوزارية لقصة أحمد - ص 17)' },
] as const;

export const Lesson7Exercises: React.FC<Lesson7ExercisesProps> = ({ onProgressUpdate }) => {
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

      {/* Tab 1: Page 15 Ex A: Activities Match */}
      <div className={currentStep === 1 ? 'block' : 'hidden'}>
        <ExerciseAActivitiesMatch />
      </div>

      {/* Tab 2: Page 16 Ex C: Sana True or False */}
      <div className={currentStep === 2 ? 'block' : 'hidden'}>
        <ExerciseCTrueFalse />
      </div>

      {/* Tab 3: Page 16 Ex D & E: Notes & Partner Interview */}
      <div className={`space-y-6 ${currentStep === 3 ? 'block' : 'hidden'}`}>
        {currentStep === 3 && (
          <>
            <ExerciseDMakeNotes />
            <ExerciseEPartnerInterview />
          </>
        )}
      </div>

      {/* Tab 4: Page 17 Ex F: Ahmed & Faisal Ministerial Questions */}
      <div className={currentStep === 4 ? 'block' : 'hidden'}>
        <AhmedComprehensionQuestions />
      </div>
    </div>
  );
};
