import React, { useState } from 'react';
import { KarenComprehensionQuestions } from './lesson8/KarenComprehensionQuestions';
import { KarenQuestionsReconstruction } from './lesson8/KarenQuestionsReconstruction';
import { KarenLetterPlanning } from './lesson8/KarenLetterPlanning';
import { KarenModelLetterComposition } from './lesson8/KarenModelLetterComposition';

interface Lesson8ExercisesProps {
  onProgressUpdate: (completed: boolean) => void;
}

const TABS = [
  { step: 1, title: 'أسئلة فهم رسالة كارين (ك. الطالب ص 11)' },
  { step: 2, title: 'تمرين 1 و 2 (صياغة أسئلة كارين - ك. النشاط ص 18)' },
  { step: 3, title: 'تمرين 3 (تدوين ملاحظات الرسالة - ك. النشاط ص 18)' },
  { step: 4, title: 'إنشاء الوحدة الأولى (رسالة إلى كارين - ك. النشاط ص 19)' },
] as const;

export const Lesson8Exercises: React.FC<Lesson8ExercisesProps> = ({ onProgressUpdate }) => {
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

      {/* Tab 1: Karen Comprehension Questions */}
      <div className={currentStep === 1 ? 'block' : 'hidden'}>
        <KarenComprehensionQuestions />
      </div>

      {/* Tab 2: Reconstructing Karen's 6 Questions */}
      <div className={currentStep === 2 ? 'block' : 'hidden'}>
        <KarenQuestionsReconstruction />
      </div>

      {/* Tab 3: Planning Reply Letter Notes */}
      <div className={currentStep === 3 ? 'block' : 'hidden'}>
        <KarenLetterPlanning />
      </div>

      {/* Tab 4: Unit 1 Composition - Write a letter to Karen */}
      <div className={currentStep === 4 ? 'block' : 'hidden'}>
        <KarenModelLetterComposition />
      </div>
    </div>
  );
};
