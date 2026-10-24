import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { PenTool, Sparkles, RefreshCw, Copy, Check } from 'lucide-react';
import { lesson8ActivityData } from '../../../data/activityBookLesson8Data';
import { playSuccessChime } from '../../../utils/audioFeedback';

export const KarenLetterPlanning: React.FC = () => {
  const { titleEn, instructionEn, instructionAr, sections } =
    lesson8ActivityData.planningNotes;

  const [notes, setNotes] = useState<Record<string, string>>({});
  const [copied, setCopied] = useState(false);

  const handleNoteChange = (secId: string, val: string) => {
    setNotes((prev) => ({ ...prev, [secId]: val }));
  };

  const handleApplySample = (secId: string, sample: string) => {
    setNotes((prev) => ({ ...prev, [secId]: sample }));
  };

  const applyAllModelNotes = () => {
    const model: Record<string, string> = {};
    sections.forEach((sec) => {
      model[sec.id] = sec.sampleNotesEn;
    });
    setNotes(model);
    confetti({ particleCount: 40, spread: 65 });
    playSuccessChime();
  };

  const handleReset = () => {
    setNotes({});
    setCopied(false);
  };

  const handleCopy = () => {
    const summary = sections
      .map(
        (sec) =>
          `[${sec.titleEn}]\n${notes[sec.id] || '(No notes entered)'}`
      )
      .join('\n\n');
    navigator.clipboard.writeText(summary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const filledCount = Object.values(notes).filter((v) => v.trim().length > 0).length;

  return (
    <div className="bg-white rounded-2xl border border-zinc-200 p-5 sm:p-6 shadow-sm space-y-6" dir="ltr">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-zinc-200">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="inline-flex items-center gap-1 text-xs font-bold text-zinc-600 bg-zinc-100 px-2.5 py-0.5 rounded-md font-sans">
              <PenTool className="w-3.5 h-3.5" />
              Activity Book • Page 18 • Ex. 3
            </span>
            <span className="text-xs font-semibold text-zinc-500 font-sans">
              3 Paragraph Notes
            </span>
          </div>
          <h4 className="text-base sm:text-lg font-bold text-zinc-900 font-sans">
            {titleEn}
          </h4>
          <p className="text-xs text-zinc-600 font-arabic mt-1 text-right" dir="rtl">
            {instructionAr}
          </p>
        </div>

        <div className="bg-zinc-100 px-3 py-1.5 rounded-xl text-xs font-bold text-zinc-800 font-sans shrink-0 self-start sm:self-center">
          Sections Planned: {filledCount} / {sections.length}
        </div>
      </div>

      {/* 3 Paragraph Planning Cards */}
      <div className="space-y-4">
        {sections.map((sec) => {
          const userNote = notes[sec.id] || '';

          return (
            <div
              key={sec.id}
              className="p-4 rounded-xl border border-zinc-200 bg-zinc-50/40 hover:bg-zinc-50/80 transition-all space-y-3 text-left"
            >
              {/* Section Header */}
              <div className="flex items-start justify-between gap-2 border-b border-zinc-200/70 pb-2.5">
                <div className="flex items-start gap-2.5">
                  <span className="w-6 h-6 rounded-md bg-zinc-900 text-white text-xs font-bold flex items-center justify-center font-sans shrink-0 mt-0.5">
                    {sec.paragraphNumber}
                  </span>
                  <div className="space-y-0.5">
                    <h5 className="text-xs sm:text-sm font-bold text-zinc-900 font-sans">
                      {sec.titleEn}
                    </h5>
                    <p className="text-[11px] sm:text-xs text-zinc-500 font-arabic text-right" dir="rtl">
                      {sec.titleAr}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => handleApplySample(sec.id, sec.sampleNotesEn)}
                  className="px-2.5 py-1 rounded-md text-[11px] font-sans font-bold bg-white hover:bg-zinc-100 border border-zinc-200 text-zinc-700 transition-colors cursor-pointer shrink-0"
                >
                  Use Sample Notes
                </button>
              </div>

              {/* Guiding Questions */}
              <div className="p-3 bg-zinc-100/80 rounded-lg text-xs space-y-1">
                <span className="font-bold text-zinc-700 font-sans block mb-1">
                  Guiding questions (الأسئلة التوجيهية للفقرة):
                </span>
                <ul className="list-disc list-inside space-y-0.5 font-sans text-zinc-700">
                  {sec.guideQuestionsEn.map((gq, idx) => (
                    <li key={idx}>{gq}</li>
                  ))}
                </ul>
                <div className="pt-1 text-[11px] text-zinc-500 font-arabic text-right border-t border-zinc-200/60 mt-1.5" dir="rtl">
                  {sec.guideQuestionsAr.join(' • ')}
                </div>
              </div>

              {/* Notes Input Area */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-zinc-700 font-sans block">
                  Your Notes for Paragraph {sec.paragraphNumber}:
                </label>
                <textarea
                  rows={2}
                  value={userNote}
                  onChange={(e) => handleNoteChange(sec.id, e.target.value)}
                  placeholder={sec.placeholderEn}
                  className="w-full bg-white border border-zinc-200 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm font-sans text-zinc-900 focus:outline-none focus:border-zinc-900 focus:ring-1 focus:ring-zinc-900 placeholder:text-zinc-400 resize-none leading-relaxed"
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-zinc-200">
        <div className="flex items-center gap-2">
          <button
            onClick={applyAllModelNotes}
            className="flex items-center gap-1.5 px-4 py-2 bg-zinc-900 hover:bg-zinc-800 text-white rounded-xl text-xs sm:text-sm font-bold font-sans transition-colors cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Fill Model Plan</span>
          </button>
          <button
            onClick={handleCopy}
            disabled={filledCount === 0}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-zinc-100 hover:bg-zinc-200 disabled:opacity-40 text-zinc-700 rounded-xl text-xs sm:text-sm font-bold font-sans transition-colors cursor-pointer"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied!' : 'Copy notes'}</span>
          </button>
        </div>

        <button
          onClick={handleReset}
          className="flex items-center gap-1.5 px-3 py-1.5 text-zinc-500 hover:text-zinc-800 text-xs font-bold font-sans hover:bg-zinc-100 rounded-lg transition-colors cursor-pointer"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Clear Notes</span>
        </button>
      </div>
    </div>
  );
};
