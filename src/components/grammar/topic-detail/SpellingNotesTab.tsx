import React from 'react';
import { GrammarTopicData } from '../../../data/unit1GrammarTopics';

interface SpellingNotesTabProps {
  currentTopic: GrammarTopicData;
}

export const SpellingNotesTab: React.FC<SpellingNotesTabProps> = ({ currentTopic }) => {
  const spellingNotes = currentTopic.spellingNotes;
  if (!spellingNotes) return null;

  return (
    <div className="space-y-5">
      <div className="bg-white border-2 border-zinc-200 rounded-3xl p-6 sm:p-7 shadow-xs space-y-5 text-right">
        <div className="border-b border-zinc-100 pb-3">
          <h4 className="text-base sm:text-lg font-black text-zinc-900 font-arabic">
            {spellingNotes.titleAr}
          </h4>
          <p className="text-xs text-zinc-500 font-arabic mt-1">
            قواعد إملائية مهمة تأتي في أسئلة الإملاء والامتحانات الشهرية للأول متوسط:
          </p>
        </div>

        <div className="space-y-4">
          {spellingNotes.rules.map((rule, idx) => (
            <div key={idx} className="p-4 bg-zinc-50/70 border border-zinc-200 rounded-2xl space-y-2">
              <h5 className="text-sm font-bold text-zinc-900 font-arabic">
                {rule.titleAr}
              </h5>
              <p className="text-xs text-zinc-600 font-arabic">
                {rule.descAr}
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-1 text-xs font-sans" dir="ltr">
                {rule.examples.map((ex, exIdx) => (
                  <div key={exIdx} className="p-2.5 bg-white border border-zinc-200 rounded-xl text-left">
                    <span className="text-zinc-500">{ex.base}</span> ➔{' '}
                    <strong className="text-zinc-900 font-bold">{ex.changed}</strong>
                    <p className="text-[10px] text-zinc-400 font-arabic mt-0.5" dir="rtl">{ex.ar}</p>
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
