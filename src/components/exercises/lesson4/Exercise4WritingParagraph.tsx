import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Sparkles, CheckCircle2 } from 'lucide-react';
import { lesson4ActivityData } from '../../../data/activityBookLesson4Data';
import { playSuccessChime } from '../../../utils/audioFeedback';

interface Exercise4WritingParagraphProps {
  onProgressUpdate: (completed: boolean) => void;
}

export const Exercise4WritingParagraph: React.FC<Exercise4WritingParagraphProps> = ({ onProgressUpdate }) => {
  const [userText, setUserText] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const writingData = lesson4ActivityData.page11Ex4Writing;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (userText.trim().length > 15) {
      setIsSubmitted(true);
      confetti({ particleCount: 45, spread: 65 });
      playSuccessChime();
      onProgressUpdate(true);
    }
  };

  const handleLoadSample = (sampleText: string) => {
    setUserText(sampleText);
    confetti({ particleCount: 35, spread: 50 });
    playSuccessChime();
  };

  return (
    <div className="bg-white rounded-2xl border border-zinc-200 p-5 sm:p-6 shadow-sm space-y-5" dir="ltr">
      {/* Exercise Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-zinc-200">
        <div>
          <span className="text-xs font-bold text-zinc-500 font-sans block mb-1">
            Activity Book • Page 11 • Exercise 4
          </span>
          <h4 className="text-base sm:text-lg font-bold text-zinc-900 font-sans">
            Write a paragraph about your scrapbook or hobbies.
          </h4>
          <p className="text-xs text-zinc-600 font-arabic mt-1 text-right" dir="rtl">
            اكتب إنشاءً وفقرة كاملة عن دفتر قصاصاتك أو هواياتك واهتماماتك مستعيناً بالنماذج أدناه:
          </p>
        </div>
        <div className="bg-zinc-100 px-3 py-1.5 rounded-xl text-xs font-bold text-zinc-800 shrink-0 self-start sm:self-center font-sans">
          {isSubmitted ? 'Completed ✓' : 'In Progress'}
        </div>
      </div>

      {/* Model Paragraphs (matching Lesson 1 style) */}
      <div className="space-y-2.5">
        <span className="text-xs font-bold text-zinc-700 block font-arabic text-right" dir="rtl">
          نماذج إنشائية للاسترشاد بها:
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {writingData.samples.map((sample, idx) => (
            <div
              key={idx}
              className="p-3.5 rounded-xl border border-zinc-200 bg-zinc-50 space-y-2 text-left"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-zinc-900 font-sans block">
                  {sample.hobbyEn}
                </span>
                <span className="text-[11px] font-bold text-zinc-500 font-arabic" dir="rtl">
                  {sample.hobbyAr}
                </span>
              </div>
              <p className="text-xs text-zinc-600 font-sans leading-relaxed">
                {sample.paragraphEn}
              </p>
              <button
                type="button"
                onClick={() => handleLoadSample(sample.paragraphEn)}
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
      <form onSubmit={handleSubmit} className="space-y-3">
        <label className="text-xs font-bold text-zinc-800 font-sans block">
          Your Paragraph:
        </label>
        <textarea
          value={userText}
          onChange={(e) => setUserText(e.target.value)}
          placeholder="In my spare time, I like collecting... I am interested in..."
          className="w-full h-36 p-4 text-sm border border-zinc-300 rounded-xl focus:ring-1 focus:ring-zinc-900 focus:outline-hidden bg-white leading-relaxed text-left font-sans"
        />

        <div className="pt-2 flex flex-wrap items-center justify-between gap-3 border-t border-zinc-200">
          <div className="text-xs text-zinc-500 font-arabic" dir="rtl">
            {isSubmitted ? (
              <span className="flex items-center gap-1.5 text-emerald-700 font-bold">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                تم حفظ فقرتك الإنشائية وإكمال التمرين بنجاح.
              </span>
            ) : (
              <span>اكتب ما لا يقل عن 15 حرفاً لتأكيد الحفظ.</span>
            )}
          </div>

          <button
            type="submit"
            disabled={userText.trim().length <= 15}
            className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold font-arabic transition-all cursor-pointer ${
              userText.trim().length > 15
                ? 'bg-zinc-900 hover:bg-zinc-800 text-white shadow-2xs'
                : 'bg-zinc-200 text-zinc-400 cursor-not-allowed'
            }`}
          >
            حفظ الإجابة وإكمال الدرس ✓
          </button>
        </div>
      </form>
    </div>
  );
};
