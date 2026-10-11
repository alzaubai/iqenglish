import React, { useState } from 'react';
import {
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { lesson1ActivityData } from '../../data/activityBookData';

interface Lesson1ExercisesProps {
  onProgressUpdate: (completed: boolean) => void;
}

export const Lesson1Exercises: React.FC<Lesson1ExercisesProps> = ({
  onProgressUpdate,
}) => {
  const [activeStep, setActiveStep] = useState<1 | 2 | 3>(1);

  // Exercise 1 State
  const [answersYou, setAnswersYou] = useState<Record<string, boolean | null>>({});

  // Exercise 2 State
  const [notesYou, setNotesYou] = useState<string>('');

  // Exercise 3 State
  const [paragraphText, setParagraphText] = useState<string>('');

  const toggleAnswer = (id: string, value: boolean) => {
    setAnswersYou((prev) => ({
      ...prev,
      [id]: prev[id] === value ? null : value,
    }));
  };

  const answeredCount = Object.values(answersYou).filter((v) => v !== null).length;

  const handleCompleteEx1 = () => {
    confetti({
      particleCount: 40,
      spread: 60,
    });
    setActiveStep(2);
    onProgressUpdate(true);
  };

  const handleUseQuickSuggestion = (text: string) => {
    setNotesYou((prev) => (prev ? `${prev}, ${text}` : `I ${text}`));
  };

  const handleLoadSample = (sampleText: string) => {
    setParagraphText(sampleText);
    confetti({
      particleCount: 40,
      spread: 50,
    });
  };

  return (
    <div className="space-y-6">
      {/* Exercise Tabs: Bar starts from Right to Left (تمرين 1 on the right, 2 in middle, 3 on left) */}
      <div className="grid grid-cols-3 gap-2 sm:gap-3" dir="rtl">
        <button
          onClick={() => setActiveStep(1)}
          className={`py-3 px-4 rounded-xl border-2 text-center transition-all cursor-pointer font-arabic ${
            activeStep === 1
              ? 'bg-zinc-900 text-white border-zinc-900 shadow-sm'
              : 'bg-white hover:bg-zinc-50 border-zinc-200 text-zinc-700'
          }`}
        >
          <span className="text-sm font-bold block">تمرين 1</span>
        </button>
        <button
          onClick={() => setActiveStep(2)}
          className={`py-3 px-4 rounded-xl border-2 text-center transition-all cursor-pointer font-arabic ${
            activeStep === 2
              ? 'bg-zinc-900 text-white border-zinc-900 shadow-sm'
              : 'bg-white hover:bg-zinc-50 border-zinc-200 text-zinc-700'
          }`}
        >
          <span className="text-sm font-bold block">تمرين 2</span>
        </button>
        <button
          onClick={() => setActiveStep(3)}
          className={`py-3 px-4 rounded-xl border-2 text-center transition-all cursor-pointer font-arabic ${
            activeStep === 3
              ? 'bg-zinc-900 text-white border-zinc-900 shadow-sm'
              : 'bg-white hover:bg-zinc-50 border-zinc-200 text-zinc-700'
          }`}
        >
          <span className="text-sm font-bold block">تمرين 3</span>
        </button>
      </div>

      {/* ======================================================== */}
      {/* STEP 1: Activity Book Page 4 Exercise 1 (LTR Layout)     */}
      {/* ======================================================== */}
      {activeStep === 1 && (
        <div className="bg-white rounded-2xl border border-zinc-200 p-5 sm:p-6 shadow-sm space-y-5" dir="ltr">
          {/* Header: English on top left, Arabic translation underneath */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-zinc-200">
            <div>
              <span className="text-xs font-bold text-zinc-500 font-sans block mb-1">
                Activity Book • Page 4 • Exercise 1
              </span>
              <h4 className="text-base sm:text-lg font-bold text-zinc-900 font-sans">
                What did you do in the holidays? Read and answer the questions.
              </h4>
              <p className="text-xs text-zinc-600 font-arabic mt-1" dir="rtl">
                ماذا فعلت في العطلة؟ أجب بـ (Yes) أو (No):
              </p>
            </div>
            <div className="bg-zinc-100 px-3 py-1.5 rounded-xl text-xs font-bold text-zinc-800 shrink-0 self-start sm:self-center font-sans">
              Answered: {answeredCount} / 13
            </div>
          </div>

          {/* Exercise items: arranged Left to Right */}
          <div className="space-y-2.5">
            {lesson1ActivityData.page4Ex1.map((item) => {
              const val = answersYou[item.id];
              return (
                <div
                  key={item.id}
                  className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 rounded-xl border border-zinc-200 bg-zinc-50/50 hover:bg-zinc-50 hover:border-zinc-300 transition-all"
                >
                  {/* Left: English Question on top, Arabic underneath */}
                  <div className="text-left">
                    <span className="text-sm sm:text-base font-bold text-zinc-900 block font-sans">
                      {item.questionEn}
                    </span>
                    <span className="text-xs text-zinc-500 font-arabic block mt-0.5" dir="rtl">
                      {item.questionAr}
                    </span>
                  </div>

                  {/* Right: Yes / No buttons */}
                  <div className="flex items-center gap-2 shrink-0 self-start sm:self-center">
                    <button
                      onClick={() => toggleAnswer(item.id, true)}
                      className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer font-sans ${
                        val === true
                          ? 'bg-zinc-900 text-white shadow-xs'
                          : 'bg-white border border-zinc-300 text-zinc-700 hover:bg-zinc-100'
                      }`}
                    >
                      ✓ Yes
                    </button>
                    <button
                      onClick={() => toggleAnswer(item.id, false)}
                      className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer font-sans ${
                        val === false
                          ? 'bg-zinc-800 text-white shadow-xs'
                          : 'bg-white border border-zinc-300 text-zinc-700 hover:bg-zinc-100'
                      }`}
                    >
                      ✗ No
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Footer Controls */}
          <div className="pt-4 border-t border-zinc-200 flex items-center justify-between">
            <span className="text-xs text-zinc-500 font-arabic" dir="rtl">
              أجب عن الأسئلة ثم انتقل للتمرين التالي
            </span>
            <button
              onClick={handleCompleteEx1}
              className="px-5 py-2.5 bg-zinc-900 text-white rounded-xl text-xs font-bold hover:bg-zinc-800 transition-colors flex items-center gap-2 cursor-pointer shadow-sm font-arabic"
            >
              <span>الانتقال للتمرين 2</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* STEP 2: Activity Book Page 4 Exercise 2 (LTR Layout)     */}
      {/* ======================================================== */}
      {activeStep === 2 && (
        <div className="bg-white rounded-2xl border border-zinc-200 p-5 sm:p-6 shadow-sm space-y-5" dir="ltr">
          <div className="pb-4 border-b border-zinc-200">
            <span className="text-xs font-bold text-zinc-500 font-sans block mb-1">
              Activity Book • Page 4 • Exercise 2
            </span>
            <h4 className="text-base sm:text-lg font-bold text-zinc-900 font-sans">
              Did you do anything else? Write notes here.
            </h4>
            <p className="text-xs text-zinc-600 font-arabic mt-1" dir="rtl">
              هل فعلت أي شيء آخر في العطلة؟ اكتب ملاحظاتك هنا:
            </p>
          </div>

          {/* Quick Suggestions LTR */}
          <div className="bg-zinc-50 p-4 rounded-xl border border-zinc-200 space-y-2">
            <span className="text-xs font-bold text-zinc-700 block font-arabic" dir="rtl">
              أفكار سريعة للإضافة بنقرة واحدة:
            </span>
            <div className="flex flex-wrap gap-2">
              {[
                'went swimming every day',
                'went fishing',
                'made some clothes',
                'got up late every day',
                'read lots of books',
                'learnt to cook',
                'visited my grandparents',
              ].map((phrase, i) => (
                <button
                  key={i}
                  onClick={() => handleUseQuickSuggestion(phrase)}
                  className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-white border border-zinc-300 text-zinc-800 hover:bg-zinc-100 transition-colors cursor-pointer font-sans"
                >
                  + {phrase}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-zinc-800 block font-sans">
              Your Notes:
            </label>
            <textarea
              value={notesYou}
              onChange={(e) => setNotesYou(e.target.value)}
              placeholder="e.g. I learnt to cook and visited my grandparents..."
              className="w-full h-32 p-4 text-sm border border-zinc-300 rounded-xl focus:ring-1 focus:ring-zinc-900 focus:outline-none bg-white leading-relaxed text-left font-sans"
            />
          </div>

          <div className="pt-4 border-t border-zinc-200 flex items-center justify-between">
            <button
              onClick={() => setActiveStep(1)}
              className="px-4 py-2 border border-zinc-300 text-zinc-700 rounded-xl text-xs font-bold hover:bg-zinc-50 cursor-pointer flex items-center gap-1 font-arabic"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>العودة للتمرين 1</span>
            </button>
            <button
              onClick={() => {
                setActiveStep(3);
                onProgressUpdate(true);
              }}
              className="px-5 py-2.5 bg-zinc-900 text-white rounded-xl text-xs font-bold hover:bg-zinc-800 transition-colors flex items-center gap-2 cursor-pointer shadow-sm font-arabic"
            >
              <span>الانتقال للتمرين 3</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* STEP 3: Activity Book Page 5 Exercise 3 (LTR Layout)     */}
      {/* ======================================================== */}
      {activeStep === 3 && (
        <div className="bg-white rounded-2xl border border-zinc-200 p-5 sm:p-6 shadow-sm space-y-6" dir="ltr">
          <div className="pb-4 border-b border-zinc-200">
            <span className="text-xs font-bold text-zinc-500 font-sans block mb-1">
              Activity Book • Page 5 • Exercise 3
            </span>
            <h4 className="text-base sm:text-lg font-bold text-zinc-900 font-sans">
              Write a paragraph about your holidays.
            </h4>
            <p className="text-xs text-zinc-600 font-arabic mt-1" dir="rtl">
              اكتب إنشاءً وفقرة كاملة عن عطلتك الصيفية مستعيناً بالنماذج أدناه:
            </p>
          </div>

          {/* Model Paragraphs LTR */}
          <div className="space-y-3">
            <span className="text-xs font-bold text-zinc-700 block font-arabic" dir="rtl">
              نماذج إنشائية للاسترشاد بها:
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {lesson1ActivityData.sampleParagraphs.map((sample, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl border border-zinc-200 bg-zinc-50 space-y-2 text-left"
                >
                  <span className="text-xs font-bold text-zinc-900 font-sans block">
                    {sample.title}
                  </span>
                  <p className="text-xs text-zinc-600 font-sans leading-relaxed">
                    {sample.text}
                  </p>
                  <button
                    onClick={() => handleLoadSample(sample.text)}
                    className="text-xs font-bold text-zinc-900 hover:underline pt-1 block cursor-pointer font-arabic"
                    dir="rtl"
                  >
                    استخدام هذا النموذج في كتابتك ←
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Writing Area */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-zinc-800 font-sans block">
              Your Paragraph:
            </label>
            <textarea
              value={paragraphText}
              onChange={(e) => setParagraphText(e.target.value)}
              placeholder="In the holidays, I went to... with my family..."
              className="w-full h-36 p-4 text-sm border border-zinc-300 rounded-xl focus:ring-1 focus:ring-zinc-900 focus:outline-none bg-white leading-relaxed text-left font-sans"
            />
          </div>

          <div className="pt-4 border-t border-zinc-200 flex items-center justify-between">
            <button
              onClick={() => setActiveStep(2)}
              className="px-4 py-2 border border-zinc-300 text-zinc-700 rounded-xl text-xs font-bold hover:bg-zinc-50 cursor-pointer flex items-center gap-1 font-arabic"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>العودة للتمرين 2</span>
            </button>
            <button
              onClick={() => {
                confetti({
                  particleCount: 50,
                  spread: 60,
                });
                onProgressUpdate(true);
              }}
              disabled={paragraphText.trim().length === 0}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer font-arabic ${
                paragraphText.trim().length > 0
                  ? 'bg-zinc-900 text-white hover:bg-zinc-800 shadow-sm'
                  : 'bg-zinc-300 text-zinc-500 cursor-not-allowed'
              }`}
            >
              حفظ الإجابة وإكمال الدرس ✓
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
