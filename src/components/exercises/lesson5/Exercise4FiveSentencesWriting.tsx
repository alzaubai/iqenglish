import React, { useState } from 'react';
import { lesson5ActivityData, SentenceWritingPrompt } from '../../../data/activityBookLesson5Data';
import { PenLine, CheckCircle2, RotateCcw, Volume2, Sparkles, BookOpen, Lightbulb, Copy, Check } from 'lucide-react';
import confetti from 'canvas-confetti';

export const Exercise4FiveSentencesWriting: React.FC = () => {
  const { titleEn, titleAr, instructionEn, instructionAr, prompts } =
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
    // Generate starter sentence e.g. "I always wake up early."
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

  // Validation function for each prompt
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

  const triggerCelebration = () => {
    try {
      confetti({
        particleCount: 80,
        spread: 80,
        origin: { y: 0.6 },
      });
    } catch {
      // ignore
    }
  };

  return (
    <div className="space-y-6" dir="rtl">
      {/* Exercise Header */}
      <div className="bg-linear-to-r from-amber-700 via-orange-700 to-amber-800 text-white p-5 sm:p-6 rounded-2xl shadow-sm border border-amber-600/30">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-white shrink-0">
              <PenLine className="w-5 h-5" />
            </span>
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded-full bg-emerald-400 text-amber-950 text-xs font-black">
                  كتاب النشاط ص 13
                </span>
                <span className="text-amber-200 text-xs font-mono">Exercise 4: 5 Sentences</span>
              </div>
              <h2 className="text-lg sm:text-xl font-bold font-arabic mt-1">{titleAr}</h2>
              <p className="text-xs sm:text-sm text-amber-100 font-sans">{titleEn}</p>
            </div>
          </div>

          <div className="bg-white/10 px-3.5 py-1.5 rounded-xl border border-white/10 text-xs font-bold font-arabic">
            {completedCount} من {prompts.length} مكتمل
          </div>
        </div>
        <div className="mt-3 text-xs sm:text-sm text-amber-100/90 font-arabic leading-relaxed flex flex-col gap-0.5">
          <span>{instructionAr}</span>
          <span className="text-xs text-amber-200/80 font-mono" dir="ltr">
            {instructionEn}
          </span>
        </div>
      </div>

      {/* 5 Writing Prompt Cards */}
      <div className="space-y-4">
        {prompts.map((p) => {
          const userText = sentences[p.id] || '';
          const { valid, reason } = validatePrompt(p);

          return (
            <div
              key={p.id}
              className={`p-4 sm:p-5 rounded-2xl border transition-all ${
                valid
                  ? 'bg-emerald-50/50 border-emerald-300'
                  : 'bg-white border-zinc-200 hover:border-zinc-300 shadow-2xs'
              }`}
            >
              {/* Header with Circle and Adverb Name */}
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-3">
                  <span className="w-7 h-7 rounded-lg bg-zinc-100 text-zinc-700 font-bold text-xs flex items-center justify-center font-mono shrink-0">
                    {p.number}
                  </span>

                  <div className="flex items-center gap-2 bg-zinc-50 border border-zinc-200 px-2.5 py-1 rounded-xl">
                    <img
                      src={p.circleImage}
                      alt={p.requiredAdverb}
                      className="w-7 h-7 object-contain shrink-0"
                      loading="lazy"
                    />
                    <div className="text-left font-mono">
                      <span className="text-xs font-bold text-zinc-900 uppercase">
                        {p.requiredAdverb}
                      </span>
                      <span className="text-[11px] text-zinc-500 font-arabic ml-1.5">
                        ({p.adverbAr})
                      </span>
                    </div>
                  </div>
                </div>

                {valid ? (
                  <span className="flex items-center gap-1 text-emerald-700 font-bold text-xs font-arabic">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    جملة مطابقة للقاعدة
                  </span>
                ) : userText ? (
                  <span className="text-xs text-rose-600 font-arabic font-medium">
                    {reason}
                  </span>
                ) : null}
              </div>

              {/* Quick Suggestion Chips */}
              <div className="mt-3 flex flex-wrap items-center gap-1.5" dir="ltr">
                <span className="text-xs text-zinc-500 font-arabic mr-1" dir="rtl">
                  اقتراحات سريعة:
                </span>
                {p.suggestedActivities.map((act) => (
                  <button
                    key={act.en}
                    onClick={() => handleQuickAdd(p, act.en)}
                    className="px-2.5 py-1 rounded-lg bg-zinc-100 hover:bg-zinc-200 text-zinc-700 text-xs font-mono transition-colors cursor-pointer"
                    title={act.ar}
                  >
                    + {act.en}
                  </button>
                ))}
              </div>

              {/* Writing Input */}
              <div className="mt-3" dir="ltr">
                <input
                  type="text"
                  value={userText}
                  onChange={(e) => handleSentenceChange(p.id, e.target.value)}
                  placeholder={`Write a sentence using "${p.requiredAdverb}" (e.g. I ${p.requiredAdverb} ...)`}
                  className={`w-full px-3.5 py-2.5 rounded-xl border text-sm sm:text-base font-mono transition-all focus:outline-hidden ${
                    valid
                      ? 'bg-white border-emerald-400 focus:ring-2 focus:ring-emerald-200 text-zinc-900'
                      : 'bg-zinc-50 border-zinc-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 text-zinc-900'
                  }`}
                />
              </div>

              {/* Controls & Model Sentence */}
              <div className="mt-3 flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-zinc-100">
                <div className="flex items-center gap-2">
                  {userText && (
                    <button
                      onClick={() => playTTS(userText)}
                      className="px-2.5 py-1 rounded-lg bg-zinc-100 hover:bg-zinc-200 text-zinc-700 text-xs font-mono flex items-center gap-1 transition-colors cursor-pointer"
                      title="استمع لجملتك"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                      استمع
                    </button>
                  )}

                  <button
                    onClick={() => copyModel(p)}
                    className="px-2.5 py-1 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 text-xs font-arabic flex items-center gap-1 transition-colors cursor-pointer"
                  >
                    {copiedId === p.id ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        تم النسخ
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        نسخ النموذج الوزاري
                      </>
                    )}
                  </button>
                </div>

                {/* Model preview */}
                <div className="text-xs text-zinc-600 font-mono flex items-center gap-1.5" dir="ltr">
                  <span className="font-bold text-amber-800 font-arabic" dir="rtl">
                    النموذج:
                  </span>
                  <span>"{p.modelSentence}"</span>
                  <button
                    onClick={() => playTTS(p.modelSentence)}
                    className="p-1 rounded-md hover:bg-zinc-100 text-zinc-500 hover:text-zinc-800"
                    title="استمع للنموذج"
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
      <div className="flex flex-wrap items-center justify-between gap-3 pt-3">
        {completedCount === prompts.length ? (
          <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-2xl flex-1 flex items-center justify-between gap-3 font-arabic">
            <div className="flex items-center gap-2 text-emerald-900 font-bold text-sm">
              <Sparkles className="w-5 h-5 text-emerald-600" />
              أبدعت! كتبت جميع الجمل الخمس مستخدماً ظروف التكرار بدقة تامة.
            </div>
            <button
              onClick={triggerCelebration}
              className="px-4 py-2 rounded-xl bg-emerald-600 text-white font-bold text-xs hover:bg-emerald-700 transition-colors cursor-pointer"
            >
              احتفل مجدداً 🎉
            </button>
          </div>
        ) : (
          <div className="text-xs text-zinc-500 font-arabic">
            أكمل كتابة الجمل الخمس للحصول على التقييم النهائي.
          </div>
        )}

        <button
          onClick={handleReset}
          className="px-4 py-2.5 rounded-xl bg-zinc-100 hover:bg-zinc-200 text-zinc-800 font-bold font-arabic text-sm flex items-center gap-2 transition-all cursor-pointer"
        >
          <RotateCcw className="w-4 h-4" />
          إعادة ضبط الكل
        </button>
      </div>
    </div>
  );
};
