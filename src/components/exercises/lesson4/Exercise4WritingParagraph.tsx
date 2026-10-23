import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Sparkles, BookOpen, Send, CheckCircle2, Copy, Check } from 'lucide-react';
import { lesson4ActivityData } from '../../../data/activityBookLesson4Data';
import { playSuccessChime } from '../../../utils/audioFeedback';

interface Exercise4WritingParagraphProps {
  onProgressUpdate: (completed: boolean) => void;
}

export const Exercise4WritingParagraph: React.FC<Exercise4WritingParagraphProps> = ({ onProgressUpdate }) => {
  const [userText, setUserText] = useState('');
  const [userHobby, setUserHobby] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);

  const writingData = lesson4ActivityData.page11Ex4Writing;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (userText.trim().length > 15) {
      setIsSubmitted(true);
      confetti({ particleCount: 40, spread: 60 });
      playSuccessChime();
      onProgressUpdate(true);
    }
  };

  const copySample = (text: string, idx: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIdx(idx);
    setTimeout(() => setCopiedIdx(null), 2000);
  };

  return (
    <div className="space-y-5" dir="ltr">
      {/* Header */}
      <div className="bg-white rounded-2xl border border-zinc-200 p-5 shadow-sm space-y-2">
        <span className="text-xs font-bold text-zinc-500 font-sans block mb-0.5">
          Activity Book • Page 11 • Exercise 4
        </span>
        <h4 className="text-base sm:text-lg font-black text-zinc-900 font-sans">
          Write another paragraph. Ask your partner to guess.
        </h4>
        <p className="text-xs text-zinc-600 font-arabic text-right leading-relaxed" dir="rtl">
          اكتب فقرة قصيرة بالإنجليزية تصف فيها نشاطاً أو هواية دون ذكر اسمها مباشرة، لكي يقوم زميلك بتخمينها:
        </p>
      </div>

      {/* Writing Guidelines & Tips */}
      <div className="bg-amber-50/70 rounded-2xl border border-amber-200 p-4 sm:p-5 shadow-2xs space-y-2 text-right" dir="rtl">
        <h5 className="font-bold text-xs sm:text-sm text-amber-950 flex items-center justify-end gap-1.5 font-arabic">
          <BookOpen className="w-4 h-4 text-amber-700" />
          <span>إرشادات لكتابة فقرة متكاملة:</span>
        </h5>
        <ul className="text-xs text-zinc-700 space-y-1 list-disc list-inside font-arabic leading-relaxed">
          <li>اذكر كم مرة تمارسها وأين: <span dir="ltr" className="font-sans font-bold">e.g. I do it at weekends / at the club...</span></li>
          <li>عبّر عن مشاعرك باستخدام عبارات الاهتمام: <span dir="ltr" className="font-sans font-bold">I enjoy / I love / I'm interested in...</span></li>
          <li>اختم بجملة تشويقية للتخمين: <span dir="ltr" className="font-sans font-bold">Guess what my hobby is!</span></li>
        </ul>
      </div>

      {/* Interactive Writing Area */}
      <div className="bg-white rounded-2xl border border-zinc-200 p-5 shadow-sm space-y-4 text-left">
        <form onSubmit={handleSubmit} className="space-y-3.5">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-zinc-700 font-sans block">
              1. What is the secret hobby you are describing? (اسم الهواية السرية):
            </label>
            <input
              type="text"
              value={userHobby}
              onChange={(e) => setUserHobby(e.target.value)}
              placeholder="e.g. Playing chess, Photography, Swimming..."
              className="w-full sm:w-80 px-3 py-2 text-xs font-sans rounded-xl border border-zinc-300 focus:border-zinc-900 outline-none"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-zinc-700 font-sans block">
              2. Your Paragraph (فقرتك الوصفية):
            </label>
            <textarea
              rows={4}
              value={userText}
              onChange={(e) => setUserText(e.target.value)}
              placeholder="In my spare time, I... I love... Guess what I enjoy doing!"
              className="w-full p-3.5 text-xs sm:text-sm font-sans rounded-xl border border-zinc-300 focus:border-zinc-900 outline-none leading-relaxed"
            />
          </div>

          <div className="flex items-center justify-between pt-1">
            <span className="text-[11px] text-zinc-500 font-sans">
              Words count: {userText.trim().split(/\s+/).filter(Boolean).length}
            </span>
            <button
              type="submit"
              disabled={userText.trim().length < 15}
              className={`px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-2 font-arabic transition-all shadow-sm ${
                userText.trim().length >= 15
                  ? 'bg-zinc-900 hover:bg-zinc-800 text-white cursor-pointer'
                  : 'bg-zinc-100 text-zinc-400 cursor-not-allowed'
              }`}
            >
              <Send className="w-4 h-4 text-amber-400" />
              <span>اعتماد ومراجعة الفقرة</span>
            </button>
          </div>
        </form>

        {isSubmitted && (
          <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-950 space-y-2 text-right" dir="rtl">
            <div className="flex items-center justify-end gap-2 font-bold text-sm text-emerald-900">
              <span>أحسنت! تم حفظ فقرتك الإبداعية بنجاح</span>
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            </div>
            <p className="text-xs text-zinc-700 font-sans text-left bg-white p-3 rounded-lg border border-emerald-200" dir="ltr">
              "{userText}"
            </p>
            {userHobby && (
              <p className="text-[11px] text-emerald-800 font-arabic">
                الهواية السرية: <strong>{userHobby}</strong>
              </p>
            )}
          </div>
        )}
      </div>

      {/* Model Paragraphs from the Curriculum */}
      <div className="bg-white rounded-2xl border border-zinc-200 p-5 shadow-sm space-y-3">
        <h5 className="text-xs font-black uppercase tracking-wider text-zinc-500 font-sans border-b border-zinc-100 pb-2">
          Model Paragraphs from Teachers (نماذج جاهزة للاستئناس):
        </h5>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          {writingData.samples.map((sample, idx) => (
            <div
              key={sample.hobbyEn}
              className="p-3.5 rounded-xl border border-zinc-200 bg-zinc-50/60 space-y-2 text-left flex flex-col justify-between"
            >
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-indigo-700 font-sans">
                    Model {idx + 1}: {sample.hobbyEn}
                  </span>
                  <span className="text-[11px] font-bold text-zinc-500 font-arabic">
                    ({sample.hobbyAr})
                  </span>
                </div>
                <p className="text-xs text-zinc-700 font-sans leading-relaxed italic">
                  "{sample.paragraphEn}"
                </p>
              </div>

              <div className="pt-2 border-t border-zinc-100 flex items-center justify-between">
                <span className="text-[10px] text-zinc-500 font-arabic" dir="rtl">
                  {sample.paragraphAr}
                </span>
                <button
                  type="button"
                  onClick={() => copySample(sample.paragraphEn, idx)}
                  className="px-2 py-1 rounded border border-zinc-300 bg-white hover:bg-zinc-100 text-zinc-700 text-[10px] font-bold flex items-center gap-1 cursor-pointer shrink-0 ml-2"
                >
                  {copiedIdx === idx ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedIdx === idx ? 'تم النسخ' : 'نسخ'}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
