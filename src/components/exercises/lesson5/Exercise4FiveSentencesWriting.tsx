import React, { useState } from 'react';
import { lesson5ActivityData, SentenceWritingPrompt } from '../../../data/activityBookLesson5Data';
import { CheckCircle2, RotateCcw, Volume2, Copy, Check } from 'lucide-react';
import confetti from 'canvas-confetti';

export const Exercise4FiveSentencesWriting: React.FC = () => {
  const { titleEn, instructionEn, instructionAr, prompts } =
    lesson5ActivityData.page13Ex4Writing;

  const [sentences, setSentences] = useState<Record<string, string>>({
    'wr-1': '',
    'wr-2': '',
    'wr-3': '',
    'wr-4': '',
    'wr-5': '',
  });

  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleSentenceChange = (id: string, text: string) => {
    setSentences((prev) => ({ ...prev, [id]: text }));
  };

  const handleQuickAdd = (p: SentenceWritingPrompt, activityEn: string) => {
    const generated = `I ${p.requiredAdverb} ${activityEn}.`;
    setSentences((prev) => ({ ...prev, [p.id]: generated }));
  };

  const copyModel = (p: SentenceWritingPrompt) => {
    setSentences((prev) => ({ ...prev, [p.id]: p.modelSentence }));
    setCopiedId(p.id);
    setTimeout(() => setCopiedId(null), 1500);
  };

  const handleReset = () => {
    setSentences({
      'wr-1': '',
      'wr-2': '',
      'wr-3': '',
      'wr-4': '',
      'wr-5': '',
    });
  };

  const playTTS = (text: string) => {
    if ('speechSynthesis' in window && text.trim()) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-GB';
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);
    }
  };

  const validatePrompt = (p: SentenceWritingPrompt): { valid: boolean; reason?: string } => {
    const text = (sentences[p.id] || '').trim();
    if (!text) return { valid: false };

    const lower = text.toLowerCase();
    if (!lower.includes(p.requiredAdverb)) {
      return { valid: false, reason: `يجب استخدام الظرف (${p.requiredAdverb}) في هذه الجملة.` };
    }

    if (text.length < 8) {
      return { valid: false, reason: 'الجملة قصيرة جداً؛ اكتب جملة كاملة.' };
    }

    return { valid: true };
  };

  const completedCount = prompts.filter((p) => validatePrompt(p).valid).length;

  return (
    <div className="bg-white rounded-2xl border border-zinc-200 p-5 sm:p-6 shadow-sm space-y-5" dir="ltr">
      {/* Exercise Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-zinc-200">
        <div>
          <span className="text-xs font-bold text-zinc-500 font-sans block mb-1">
            Activity Book • Page 13 • Exercise 4
          </span>
          <h4 className="text-base sm:text-lg font-bold text-zinc-900 font-sans">
            {titleEn}: {instructionEn}
          </h4>
          <p className="text-xs text-zinc-600 font-arabic mt-1 text-right" dir="rtl">
            {instructionAr}
          </p>
        </div>
        <div className="bg-zinc-100 px-3 py-1.5 rounded-xl text-xs font-bold text-zinc-800 shrink-0 self-start sm:self-center font-sans">
          Completed: {completedCount} / {prompts.length}
        </div>
      </div>

      {/* 5 Prompts */}
      <div className="space-y-3.5">
        {prompts.map((p) => {
          const userText = sentences[p.id] || '';
          const { valid, reason } = validatePrompt(p);

          return (
            <div
              key={p.id}
              className={`p-3.5 sm:p-4 rounded-xl border transition-all ${
                valid
                  ? 'border-emerald-300 bg-emerald-50/15'
                  : 'border-zinc-200 bg-zinc-50/40 hover:border-zinc-300'
              }`}
            >
              {/* Header with Circle and Adverb Name */}
              <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-md bg-zinc-200 text-zinc-800 font-bold text-xs flex items-center justify-center font-sans shrink-0">
                    {p.number}
                  </span>

                  <div className="flex items-center gap-1.5 bg-white border border-zinc-200 px-2 py-0.5 rounded-lg">
                    <img
                      src={p.circleImage}
                      alt={p.requiredAdverb}
                      className="w-5 h-5 object-contain shrink-0"
                      loading="lazy"
                    />
                    <span className="text-xs font-sans font-bold text-zinc-900 uppercase">
                      {p.requiredAdverb}
                    </span>
                    <span className="text-[11px] text-zinc-500 font-arabic">
                      ({p.adverbAr})
                    </span>
                  </div>
                </div>

                {valid ? (
                  <span className="flex items-center gap-1 text-emerald-700 font-bold text-xs font-sans">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    Complete
                  </span>
                ) : userText ? (
                  <span className="text-xs text-rose-600 font-arabic font-medium" dir="rtl">
                    {reason}
                  </span>
                ) : null}
              </div>

              {/* Quick Suggestion Chips */}
              <div className="flex flex-wrap items-center gap-1.5 mb-2">
                <span className="text-xs text-zinc-400 font-arabic" dir="rtl">
                  اقتراحات سريعة:
                </span>
                {p.suggestedActivities.map((act) => (
                  <button
                    key={act.en}
                    type="button"
                    onClick={() => handleQuickAdd(p, act.en)}
                    className="px-2 py-0.5 rounded-md bg-zinc-100 hover:bg-zinc-200 text-zinc-700 text-xs font-sans transition-colors cursor-pointer"
                    title={act.ar}
                  >
                    + {act.en}
                  </button>
                ))}
              </div>

              {/* Writing Input */}
              <div>
                <input
                  type="text"
                  value={userText}
                  onChange={(e) => handleSentenceChange(p.id, e.target.value)}
                  placeholder={`Write a sentence using "${p.requiredAdverb}" (e.g. I ${p.requiredAdverb} ...)`}
                  className={`w-full px-3 py-2 rounded-lg border text-sm font-sans transition-all focus:outline-hidden ${
                    valid
                      ? 'bg-white border-emerald-400 text-zinc-900'
                      : 'bg-white border-zinc-300 focus:border-zinc-900 text-zinc-900'
                  }`}
                />
              </div>

              {/* Controls & Model Sentence */}
              <div className="mt-2.5 flex flex-wrap items-center justify-between gap-2 pt-1.5 border-t border-zinc-100">
                <div className="flex items-center gap-2">
                  {userText && (
                    <button
                      type="button"
                      onClick={() => playTTS(userText)}
                      className="px-2 py-1 rounded-md bg-zinc-100 hover:bg-zinc-200 text-zinc-700 text-xs font-sans flex items-center gap-1 transition-colors cursor-pointer"
                      title="Listen"
                    >
                      <Volume2 className="w-3 h-3" />
                      Listen
                    </button>
                  )}

                  <button
                    type="button"
                    onClick={() => copyModel(p)}
                    className="px-2 py-1 rounded-md bg-zinc-100 hover:bg-zinc-200 text-zinc-700 text-xs font-arabic flex items-center gap-1 transition-colors cursor-pointer"
                  >
                    {copiedId === p.id ? (
                      <>
                        <Check className="w-3 h-3 text-emerald-600" />
                        تم النسخ
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" />
                        نسخ النموذج النموذجي
                      </>
                    )}
                  </button>
                </div>

                <div className="text-xs text-zinc-500 font-sans flex items-center gap-1.5">
                  <span className="font-bold text-zinc-700">Model:</span>
                  <span>"{p.modelSentence}"</span>
                  <button
                    type="button"
                    onClick={() => playTTS(p.modelSentence)}
                    className="p-1 rounded-md text-zinc-400 hover:text-zinc-700"
                    title="Listen"
                  >
                    <Volume2 className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Completion & Controls */}
      <div className="flex items-center justify-between pt-2 border-t border-zinc-200">
        <span className="text-xs text-zinc-500 font-arabic" dir="rtl">
          {completedCount === prompts.length
            ? 'أحسنت! أكملت كتابة الجمل الخمس بظروف التكرار بنجاح.'
            : `أكمل كتابة الجمل الخمس (${completedCount}/${prompts.length})`}
        </span>

        <button
          type="button"
          onClick={handleReset}
          className="px-3.5 py-1.5 rounded-xl bg-zinc-100 hover:bg-zinc-200 text-zinc-700 text-xs font-bold font-arabic flex items-center gap-1.5 transition-colors cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          إعادة ضبط الكل
        </button>
      </div>
    </div>
  );
};
