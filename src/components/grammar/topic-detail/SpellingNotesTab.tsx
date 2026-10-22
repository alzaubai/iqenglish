import React from 'react';
import { Volume2, Sparkles } from 'lucide-react';
import { GrammarTopicData } from '../../../data/unit1GrammarTopics';

interface SpellingNotesTabProps {
  currentTopic: GrammarTopicData;
  onSpeak?: (text: string) => void;
}

export const SpellingNotesTab: React.FC<SpellingNotesTabProps> = ({ currentTopic, onSpeak }) => {
  const spellingNotes = currentTopic.spellingNotes;
  if (!spellingNotes) return null;

  return (
    <div className="space-y-5">
      <div className="bg-white border border-zinc-200/90 rounded-3xl p-5 sm:p-7 shadow-xs space-y-5 text-right">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-zinc-100 pb-3">
          <div>
            <span className="text-xs font-bold text-emerald-700 font-arabic block">
              قواعد الإملاء المنهجية المعتمدة
            </span>
            <h4 className="text-base sm:text-lg font-black text-zinc-900 font-arabic mt-0.5">
              {spellingNotes.titleAr}
            </h4>
          </div>
          <span
            className="text-xs font-mono font-bold px-3 py-1 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-xl self-start sm:self-auto"
            dir="ltr"
          >
            Spelling Rules
          </span>
        </div>

        <p className="text-xs sm:text-sm text-zinc-600 font-arabic leading-relaxed">
          قواعد إملائية مهمة جداً تتكرر في أسئلة الإملاء والامتحانات الشهرية للأول متوسط:
        </p>

        <div className="space-y-4">
          {spellingNotes.rules.map((rule, idx) => (
            <div
              key={idx}
              className="p-4 sm:p-5 bg-zinc-50/80 border border-zinc-200/90 rounded-2xl space-y-3 shadow-2xs"
            >
              <div className="flex items-center justify-between border-b border-zinc-200/60 pb-2">
                <h5 className="text-sm font-bold text-zinc-900 font-arabic flex items-center gap-2">
                  <span className="w-5 h-5 rounded-md bg-emerald-100 text-emerald-800 text-xs font-bold flex items-center justify-center font-mono">
                    {idx + 1}
                  </span>
                  <span>{rule.titleAr}</span>
                </h5>
              </div>

              <p className="text-xs text-zinc-700 font-arabic leading-relaxed">
                {rule.descAr}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5 pt-1 text-xs font-sans" dir="ltr">
                {rule.examples.map((ex, exIdx) => (
                  <div
                    key={exIdx}
                    className="p-2.5 bg-white border border-zinc-200/90 rounded-xl flex items-center justify-between shadow-2xs"
                  >
                    <div className="text-left">
                      <div className="flex items-center gap-1.5 font-mono">
                        <span className="text-zinc-500 font-medium">{ex.base}</span>
                        <span className="text-zinc-400">➔</span>
                        <strong className="text-emerald-700 font-bold">{ex.changed}</strong>
                      </div>
                      <p className="text-[11px] text-zinc-500 font-arabic mt-0.5 text-right" dir="rtl">
                        {ex.ar}
                      </p>
                    </div>
                    {onSpeak && (
                      <button
                        type="button"
                        onClick={() => onSpeak(`${ex.base}, ${ex.changed}`)}
                        className="p-1 rounded-lg bg-zinc-50 hover:bg-zinc-100 text-zinc-600 cursor-pointer shadow-2xs shrink-0"
                        title="استمع"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SpellingNotesTab;
