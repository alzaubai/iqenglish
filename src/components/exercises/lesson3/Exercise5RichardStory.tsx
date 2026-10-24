import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { CheckCircle2, XCircle, Sparkles, RefreshCw, BookOpen, AlertCircle, Languages } from 'lucide-react';
import { lesson3ActivityData, StoryBlankItem } from '../../../data/activityBookLesson3Data';
import { playSuccessChime } from '../../../utils/audioFeedback';

interface Exercise5RichardStoryProps {
  onProgressUpdate: (completed: boolean) => void;
}

export const Exercise5RichardStory: React.FC<Exercise5RichardStoryProps> = ({ onProgressUpdate }) => {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isChecked, setIsChecked] = useState(false);
  const [showGrammarTip, setShowGrammarTip] = useState(true);
  const [visibleTranslations, setVisibleTranslations] = useState<Record<string, boolean>>({});

  const toggleTranslation = (id: string) => {
    setVisibleTranslations((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const items = lesson3ActivityData.page9Ex5Story;

  const handleInputChange = (id: string, val: string) => {
    setAnswers((prev) => ({ ...prev, [id]: val }));
  };

  const isBlankCorrect = (item: StoryBlankItem) => {
    const val = (answers[item.id] || '').trim().toLowerCase();
    return item.acceptableAnswers.map((a) => a.toLowerCase()).includes(val);
  };

  const checkAll = () => {
    setIsChecked(true);
    const allCorrect = items.every(isBlankCorrect);
    if (allCorrect) {
      confetti({ particleCount: 45, spread: 65 });
      playSuccessChime();
      onProgressUpdate(true);
    }
  };

  const resetAll = () => {
    setAnswers({});
    setIsChecked(false);
  };

  const solveAll = () => {
    const model: Record<string, string> = {};
    items.forEach((it) => {
      model[it.id] = it.correctAnswer;
    });
    setAnswers(model);
    setIsChecked(true);
  };

  return (
    <div className="space-y-5" dir="ltr">
      {/* Header */}
      <div className="bg-white rounded-2xl border border-zinc-200 p-5 shadow-sm space-y-2">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-zinc-100 pb-3">
          <div>
            <span className="text-xs font-bold text-zinc-500 font-sans block mb-0.5">
              Activity Book • Page 9 • Exercise 5
            </span>
            <h4 className="text-base sm:text-lg font-black text-zinc-900 font-sans">
              Read and complete the paragraph about Richard.
            </h4>
          </div>
          <button
            type="button"
            onClick={() => setShowGrammarTip(!showGrammarTip)}
            className="px-3 py-1.5 rounded-lg text-xs font-bold border border-zinc-300 bg-zinc-50 hover:bg-zinc-100 text-zinc-700 flex items-center gap-1.5 transition-all cursor-pointer font-arabic"
          >
            <BookOpen className="w-3.5 h-3.5 text-indigo-600" />
            <span>{showGrammarTip ? 'إخفاء صندوق القاعدة' : 'عرض قاعدة الماضي البسيط والمستمر'}</span>
          </button>
        </div>

        <p className="text-xs text-zinc-600 font-arabic text-right leading-relaxed" dir="rtl">
          اقرأ الفقرة واكتب صيغة الأفعال بين القوسين إما بالماضي البسيط (<span dir="ltr">Past Simple</span>) أو الماضي المستمر (<span dir="ltr">Past Continuous</span>):
        </p>
      </div>

      {/* Grammar Box (AB Page 9 Top) */}
      {showGrammarTip && (
        <div className="bg-gradient-to-r from-zinc-900 to-zinc-800 text-white rounded-2xl p-5 shadow-sm space-y-3 text-left">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-lg bg-amber-400 text-zinc-900 text-xs font-black flex items-center justify-center font-sans">
              !
            </span>
            <h5 className="font-bold text-sm text-white font-sans">
              Two ways of talking about the past
            </h5>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
            <div className="bg-white/10 p-3 rounded-xl border border-white/10 space-y-1">
              <span className="font-bold text-amber-300 block font-sans">a. Past simple tense (ماضي بسيط)</span>
              <p className="text-zinc-200 font-sans italic">
                Richard <strong>went</strong> to Iraq in the holidays.
              </p>
              <p className="text-zinc-400 font-arabic text-[11px] text-right" dir="rtl">
                يُستخدم للأحداث المكتملة والمحددة في الماضي.
              </p>
            </div>

            <div className="bg-white/10 p-3 rounded-xl border border-white/10 space-y-1">
              <span className="font-bold text-indigo-300 block font-sans">b. Past continuous tense (ماضي مستمر)</span>
              <p className="text-zinc-200 font-sans italic">
                When he <strong>was staying</strong> in Iraq, he went to a football match.
              </p>
              <p className="text-zinc-400 font-arabic text-[11px] text-right" dir="rtl">
                يُستخدم للحدث المستمر كخلفية (was/were + v-ing) الذي تقاطعه أحداث أخرى.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* The Story Interactive Grid */}
      <div className="bg-white rounded-2xl border border-zinc-200 p-5 sm:p-6 shadow-sm space-y-4">
        <h5 className="text-xs font-black uppercase tracking-wider text-zinc-400 font-sans border-b border-zinc-100 pb-2">
          Richard's Shopping Trip in Baghdad
        </h5>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          {items.map((item) => {
            const val = answers[item.id] || '';
            const correct = isBlankCorrect(item);

            return (
              <div
                key={item.id}
                className={`p-3.5 rounded-xl border-2 transition-all space-y-2 text-left ${
                  isChecked
                    ? correct
                      ? 'border-emerald-400 bg-emerald-50/40'
                      : 'border-rose-300 bg-rose-50/40'
                    : 'border-zinc-200 bg-zinc-50/30 hover:border-zinc-300'
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5">
                    <span className="w-6 h-6 rounded-md bg-zinc-200 text-zinc-800 text-xs font-black flex items-center justify-center font-sans uppercase">
                      {item.index}
                    </span>
                    <span className="font-bold text-xs text-zinc-700 font-sans">
                      Verb: <strong className="text-zinc-900 underline">({item.verb})</strong>
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    {visibleTranslations[item.id] && (
                      <span className="text-[11px] text-zinc-600 font-arabic bg-zinc-100 px-1.5 py-0.5 rounded animate-in fade-in duration-150">
                        {item.verbAr}
                      </span>
                    )}
                    <button
                      type="button"
                      onClick={() => toggleTranslation(item.id)}
                      className={`text-[10px] font-bold px-2 py-0.5 rounded border font-arabic transition-all flex items-center gap-1 cursor-pointer shrink-0 ${
                        visibleTranslations[item.id]
                          ? 'bg-indigo-50 text-indigo-700 border-indigo-300'
                          : 'bg-white text-zinc-600 border-zinc-200 hover:bg-zinc-100 hover:text-zinc-900'
                      }`}
                      title="ترجمة الفعل"
                    >
                      <Languages className="w-2.5 h-2.5 text-indigo-600" />
                      <span>{visibleTranslations[item.id] ? 'إخفاء' : 'ترجمة الفعل'}</span>
                    </button>
                  </div>
                </div>

                <div className="relative">
                  <input
                    type="text"
                    value={val}
                    onChange={(e) => handleInputChange(item.id, e.target.value)}
                    placeholder={`Write past form of (${item.verb})...`}
                    className={`w-full px-3 py-2 text-xs font-bold font-sans rounded-lg border transition-all outline-none ${
                      isChecked
                        ? correct
                          ? 'border-emerald-500 bg-emerald-100/60 text-emerald-900'
                          : 'border-rose-400 bg-rose-100/60 text-rose-900'
                        : 'border-zinc-300 bg-white focus:border-zinc-900 text-zinc-900'
                    }`}
                  />
                  {isChecked && (
                    <div className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none">
                      {correct ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      ) : (
                        <XCircle className="w-4 h-4 text-rose-600" />
                      )}
                    </div>
                  )}
                </div>

                {isChecked && !correct && (
                  <div className="text-xs text-rose-800 font-medium font-arabic text-right space-y-0.5 pt-1 border-t border-rose-200" dir="rtl">
                    <div>الجواب النموذجي: <strong className="font-bold text-rose-900 font-sans">{item.correctAnswer}</strong></div>
                    <div className="text-[11px] text-zinc-600">{item.explanationAr}</div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Full Continuous Story Preview Box */}
      <div className="bg-zinc-50 rounded-2xl border border-zinc-200 p-5 shadow-sm space-y-2 text-left">
        <span className="text-xs font-black uppercase tracking-wider text-zinc-500 font-sans block">
          Full Story Reading (الفقرة كاملة كما وردت في كتاب النشاط):
        </span>
        <p className="text-sm font-sans text-zinc-800 leading-relaxed">
          When Richard was visiting Baghdad, he <strong className="text-indigo-700 underline">{answers['story-a'] || 'wanted'}</strong> to buy a sweater. His father <strong className="text-indigo-700 underline">{answers['story-b'] || 'asked'}</strong> a man in the hotel where to go. The man <strong className="text-indigo-700 underline">{answers['story-c'] || 'gave'}</strong> them the name of a shop. While they <strong className="text-indigo-700 underline">{answers['story-d'] || 'were walking'}</strong> along the street, they <strong className="text-indigo-700 underline">{answers['story-e'] || 'forgot'}</strong> the name of the shop. Then they <strong className="text-indigo-700 underline">{answers['story-f'] || 'saw'}</strong> a street market. A man <strong className="text-indigo-700 underline">{answers['story-g'] || 'was selling'}</strong> sweaters, T-shirts and trainers. Richard <strong className="text-indigo-700 underline">{answers['story-h'] || "didn't like"}</strong> any of the sweaters, but he <strong className="text-indigo-700 underline">{answers['story-i'] || 'bought'}</strong> a pair of trainers and two T-shirts. His father <strong className="text-indigo-700 underline">{answers['story-j'] || "didn't buy"}</strong> anything.
        </p>
      </div>

      {/* Buttons Footer */}
      <div className="bg-white rounded-2xl border border-zinc-200 p-4 shadow-sm flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={checkAll}
            className="px-5 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-white font-bold text-xs sm:text-sm font-arabic shadow-sm flex items-center gap-2 cursor-pointer transition-all"
          >
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>فحص الإجابات</span>
          </button>
          <button
            type="button"
            onClick={resetAll}
            className="px-3 py-2.5 rounded-xl border border-zinc-200 hover:bg-zinc-100 text-zinc-700 font-bold text-xs font-arabic flex items-center gap-1.5 cursor-pointer transition-all"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>إعادة المحاولة</span>
          </button>
        </div>

        <button
          type="button"
          onClick={solveAll}
          className="text-xs font-bold text-zinc-500 hover:text-zinc-900 underline font-arabic cursor-pointer"
        >
          عرض الحل النموذجي
        </button>
      </div>
    </div>
  );
};
