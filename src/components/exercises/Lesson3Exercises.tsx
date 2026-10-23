import React, { useState } from 'react';
import { Exercise1VerbsTable } from './lesson3/Exercise1VerbsTable';
import { ExerciseBActionTypes } from './lesson3/ExerciseBActionTypes';
import { Exercise5RichardStory } from './lesson3/Exercise5RichardStory';
import { Exercise7Adjectives } from './lesson3/Exercise7Adjectives';
import { ExerciseMariamStory } from './lesson3/ExerciseMariamStory';

interface Lesson3ExercisesProps {
  onProgressUpdate: (completed: boolean) => void;
}

const TABS = [
  { step: 1, title: 'تمرين 1 (جدول الأفعال)' },
  { step: 2, title: 'تمرين 2 (أنواع الأحداث B)' },
  { step: 3, title: 'تمرين 3 (قصة ريتشارد)' },
  { step: 4, title: 'تمرين 4 (الصفات الـ 7)' },
  { step: 5, title: 'تمرين 5 (مريم وشبكة الكلمات)' },
] as const;

export const Lesson3Exercises: React.FC<Lesson3ExercisesProps> = ({ onProgressUpdate }) => {
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
        <Exercise1VerbsTable onProgressUpdate={onProgressUpdate} />
      </div>

      <div className={currentStep === 2 ? 'block' : 'hidden'}>
        <ExerciseBActionTypes onProgressUpdate={onProgressUpdate} />
      </div>

      <div className={currentStep === 3 ? 'block' : 'hidden'}>
        <Exercise5RichardStory onProgressUpdate={onProgressUpdate} />
      </div>

      <div className={currentStep === 4 ? 'block' : 'hidden'}>
        <Exercise7Adjectives onProgressUpdate={onProgressUpdate} />
      </div>

      <div className={currentStep === 5 ? 'block' : 'hidden'}>
        <ExerciseMariamStory onProgressUpdate={onProgressUpdate} />
      </div>
    </div>
  );
};
