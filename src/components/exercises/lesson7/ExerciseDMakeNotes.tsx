import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { BookOpen, Sparkles, RefreshCw, Check, Copy } from 'lucide-react';
import { lesson7ActivityData } from '../../../data/activityBookLesson7Data';
import { playSuccessChime } from '../../../utils/audioFeedback';

export const ExerciseDMakeNotes: React.FC = () => {
  const { titleEn, instructionEn, instructionAr, fields, modelPlans } =
    lesson7ActivityData.page16ExDMakeNotes;

  const [userNotes, setUserNotes] = useState<Record<string, string>>({});
  const [showModels, setShowModels] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleInputChange = (fieldId: string, val: string) => {
    setUserNotes((prev) => ({ ...prev, [fieldId]: val }));
  };

  const handleChipClick = (fieldId: string, sample: string) => {
    setUserNotes((prev) => ({ ...prev, [fieldId]: sample }));
  };

  const applyModelPlan = (modelIndex: number) => {
    const model = modelPlans[modelIndex];
    if (!model) return;
    setUserNotes({
      'note-when': model.when,
      'note-where': model.where,
      'note-who': model.who,
      'note-what-do': model.whatDo,
      'note-eat': model.eat,
      'note-feel': model.feel,
    });
    confetti({ particleCount: 35, spread: 60 });
    playSuccessChime();
  };

  const handleReset = () => {
    setUserNotes({});
    setCopied(false);
  };

  const handleCopyNotes = () => {
    const summary = fields
      .map((f) => `${f.fieldLabel}: ${userNotes[f.id] || '(empty)'}`)
      .join('\n');
    navigator.clipboard.writeText(summary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const filledCount = Object.values(userNotes).filter((v) => v.trim().length > 0).length;

  return (
    <div className="bg-white rounded-2xl border border-zinc-200 p-5 sm:p-6 shadow-sm space-y-6" dir="ltr">
      {/* Exercise Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-zinc-200">
        <div>
          <span className="text-xs font-bold text-zinc-500 font-sans block mb-1">
            Activity Book • Page 16 • Exercise D
          </span>
          <h4 className="text-base sm:text-lg font-bold text-zinc-900 font-sans">
            {titleEn}
          </h4>
          <p className="text-xs text-zinc-600 font-arabic mt-1 text-right" dir="rtl">
            {instructionAr}
          </p>
        </div>
        <div className="flex items-center gap-2 shrink-0 self-start sm:self-center">
          <button
            onClick={() => setShowModels(!showModels)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-zinc-200 text-xs font-bold text-zinc-700 bg-zinc-50 hover:bg-zinc-100 transition-colors font-sans cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>{showModels ? 'Hide sample plans' : 'Show sample plans'}</span>
          </button>
          <div className="bg-zinc-100 px-3 py-1.5 rounded-xl text-xs font-bold text-zinc-800 font-sans">
            Filled: {filledCount} / {fields.length}
          </div>
        </div>
      </div>

      {/* Model Plans Collapsible Showcase */}
      {showModels && (
        <div className="bg-zinc-50 rounded-xl border border-zinc-200 p-4 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-zinc-600 font-sans uppercase tracking-wider">
              Curriculum Sample Models (نماذج إجابة منهجية متكاملة)
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            {modelPlans.map((m, idx) => (
              <div
                key={idx}
                className="bg-white border border-zinc-200 rounded-xl p-3.5 space-y-2 text-left"
              >
                <div className="flex items-center justify-between border-b border-zinc-100 pb-2">
                  <span className="text-xs font-bold text-zinc-900 font-sans">
                    {m.titleEn}
                  </span>
                  <button
                    onClick={() => applyModelPlan(idx)}
                    className="text-[11px] font-bold text-zinc-700 hover:text-zinc-900 bg-zinc-100 hover:bg-zinc-200 px-2 py-1 rounded-md font-sans transition-colors cursor-pointer"
                  >
                    Use this model
                  </button>
                </div>
                <div className="text-xs space-y-1 font-sans text-zinc-700">
                  <p><strong className="text-zinc-900">When:</strong> {m.when}</p>
                  <p><strong className="text-zinc-900">Where:</strong> {m.where}</p>
                  <p><strong className="text-zinc-900">Who:</strong> {m.who}</p>
                  <p><strong className="text-zinc-900">What:</strong> {m.whatDo}</p>
                  <p><strong className="text-zinc-900">Food:</strong> {m.eat}</p>
                  <p><strong className="text-zinc-900">Feelings:</strong> {m.feel}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Guided Notes Fields */}
      <div className="space-y-4">
        {fields.map((f, idx) => {
          const val = userNotes[f.id] || '';

          return (
            <div
              key={f.id}
              className="p-3.5 sm:p-4 rounded-xl border border-zinc-200 bg-zinc-50/30 hover:bg-zinc-50 transition-all space-y-2.5 text-left"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5">
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-md bg-zinc-200 text-zinc-800 text-xs font-bold flex items-center justify-center font-sans shrink-0">
                    {idx + 1}
                  </span>
                  <label
                    htmlFor={f.id}
                    className="text-xs sm:text-sm font-bold text-zinc-900 font-sans"
                  >
                    {f.questionEn}
                  </label>
                </div>
                <span className="text-[11px] sm:text-xs text-zinc-500 font-arabic text-right" dir="rtl">
                  {f.questionAr}
                </span>
              </div>

              {/* Text Input */}
              <input
                id={f.id}
                type="text"
                value={val}
                onChange={(e) => handleInputChange(f.id, e.target.value)}
                placeholder={f.placeholderEn}
                className="w-full bg-white border border-zinc-200 rounded-xl px-3.5 py-2 text-xs sm:text-sm font-sans text-zinc-900 focus:outline-none focus:ring-1 focus:ring-zinc-400 placeholder:text-zinc-400"
              />

              {/* Quick sample chips */}
              <div className="flex items-center gap-1.5 flex-wrap pt-0.5">
                <span className="text-[11px] text-zinc-400 font-sans">Quick suggestions:</span>
                {f.sampleAnswers.map((sample, sIdx) => (
                  <button
                    key={sIdx}
                    onClick={() => handleChipClick(f.id, sample)}
                    className="px-2 py-0.5 bg-white border border-zinc-200 hover:border-zinc-300 hover:bg-zinc-100 rounded-md text-[11px] font-sans text-zinc-600 transition-colors cursor-pointer"
                  >
                    {sample}
                  </button>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Action Footer */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-zinc-200">
        <div className="flex items-center gap-2">
          <button
            onClick={handleCopyNotes}
            disabled={filledCount === 0}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold font-sans transition-colors cursor-pointer ${
              filledCount === 0
                ? 'bg-zinc-100 text-zinc-400 cursor-not-allowed'
                : 'bg-zinc-900 hover:bg-zinc-800 text-white'
            }`}
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? 'Copied to clipboard!' : 'Copy my notes'}</span>
          </button>
          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-zinc-100 hover:bg-zinc-200 text-zinc-700 rounded-xl text-xs sm:text-sm font-bold font-sans transition-colors cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Clear</span>
          </button>
        </div>

        <button
          onClick={() => applyModelPlan(0)}
          className="flex items-center gap-1.5 px-3 py-1.5 text-zinc-500 hover:text-zinc-800 text-xs font-bold font-sans hover:bg-zinc-100 rounded-lg transition-colors cursor-pointer"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          <span>Fill with Sample Plan 1</span>
        </button>
      </div>
    </div>
  );
};
