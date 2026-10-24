import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Volume2, Users, Sparkles, RefreshCw, Copy, Check, MessageSquare } from 'lucide-react';
import { lesson7ActivityData } from '../../../data/activityBookLesson7Data';
import { playSuccessChime } from '../../../utils/audioFeedback';

export const ExerciseEPartnerInterview: React.FC = () => {
  const { titleEn, instructionEn, instructionAr, turns } =
    lesson7ActivityData.page16ExEPartnerInterview;

  const [partnerNotes, setPartnerNotes] = useState<Record<string, string>>({});
  const [showSpokenResponses, setShowSpokenResponses] = useState<Record<string, boolean>>({});
  const [copied, setCopied] = useState(false);

  const handleNoteChange = (turnId: string, val: string) => {
    setPartnerNotes((prev) => ({ ...prev, [turnId]: val }));
  };

  const handleChipClick = (turnId: string, suggestion: string) => {
    setPartnerNotes((prev) => ({ ...prev, [turnId]: suggestion }));
  };

  const toggleSpokenResponse = (turnId: string) => {
    setShowSpokenResponses((prev) => ({ ...prev, [turnId]: !prev[turnId] }));
  };

  const applyModelNotes = () => {
    const model: Record<string, string> = {};
    turns.forEach((t) => {
      model[t.id] = t.modelNote;
    });
    setPartnerNotes(model);
    confetti({ particleCount: 40, spread: 65 });
    playSuccessChime();
  };

  const handleReset = () => {
    setPartnerNotes({});
    setShowSpokenResponses({});
    setCopied(false);
  };

  const handleCopyNotes = () => {
    const summary = turns
      .map((t) => `${t.questionEn}\n-> Partner's note: ${partnerNotes[t.id] || '(empty)'}`)
      .join('\n\n');
    navigator.clipboard.writeText(summary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const playTTS = (text: string) => {
    if ('speechSynthesis' in window && text.trim()) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);
    }
  };

  const filledCount = Object.values(partnerNotes).filter((v) => v.trim().length > 0).length;

  return (
    <div className="bg-white rounded-2xl border border-zinc-200 p-5 sm:p-6 shadow-sm space-y-6" dir="ltr">
      {/* Exercise Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-zinc-200">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="inline-flex items-center gap-1 text-xs font-bold text-zinc-600 bg-zinc-100 px-2.5 py-0.5 rounded-md font-sans">
              <Users className="w-3.5 h-3.5" />
              Activity Book • Page 16
            </span>
            <span className="text-xs font-semibold text-zinc-500 font-sans">
              Pair Work • Make Notes
            </span>
          </div>
          <h4 className="text-base sm:text-lg font-bold text-zinc-900 font-sans">
            {titleEn}
          </h4>
          <p className="text-xs text-zinc-600 font-arabic mt-1 text-right" dir="rtl">
            {instructionAr}
          </p>
        </div>

        {/* Counter & Action */}
        <div className="flex items-center gap-2 shrink-0 self-start sm:self-center">
          <div className="bg-zinc-100 px-3 py-1.5 rounded-xl text-xs font-bold text-zinc-800 font-sans">
            Notes: {filledCount} / {turns.length}
          </div>
        </div>
      </div>

      {/* Partner Interview Questions & Note Lines */}
      <div className="space-y-4">
        {turns.map((turn) => {
          const userNote = partnerNotes[turn.id] || '';
          const showSpoken = showSpokenResponses[turn.id] || false;

          return (
            <div
              key={turn.id}
              className="p-4 rounded-xl border border-zinc-200 bg-zinc-50/40 hover:bg-zinc-50/80 transition-all space-y-3 text-left"
            >
              {/* Question Turn */}
              <div className="flex items-start justify-between gap-3 border-b border-zinc-200/70 pb-2.5">
                <div className="flex items-start gap-2.5">
                  <span className="w-6 h-6 rounded-md bg-zinc-900 text-white text-xs font-bold flex items-center justify-center font-sans shrink-0 mt-0.5">
                    {turn.questionNumber}
                  </span>
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-zinc-500 uppercase tracking-wider font-sans">
                        You ask:
                      </span>
                      <h5 className="text-xs sm:text-sm font-bold text-zinc-900 font-sans">
                        &ldquo;{turn.questionEn}&rdquo;
                      </h5>
                      <button
                        onClick={() => playTTS(turn.questionEn)}
                        className="p-1 text-zinc-400 hover:text-zinc-700 rounded transition-colors shrink-0"
                        title="Listen to question"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <p className="text-[11px] sm:text-xs text-zinc-500 font-arabic text-right" dir="rtl">
                      {turn.questionAr}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => toggleSpokenResponse(turn.id)}
                  className="flex items-center gap-1 text-[11px] font-sans font-semibold text-zinc-500 hover:text-zinc-900 bg-white hover:bg-zinc-100 border border-zinc-200 px-2 py-0.5 rounded-md transition-colors cursor-pointer shrink-0"
                  title="View partner sample spoken reply"
                >
                  <MessageSquare className="w-3 h-3" />
                  <span>{showSpoken ? 'Hide Speech' : 'Spoken Reply'}</span>
                </button>
              </div>

              {/* Sample Spoken Reply Toggle */}
              {showSpoken && (
                <div className="p-2.5 bg-blue-50/60 border border-blue-200/80 rounded-lg text-xs font-sans text-blue-900 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="font-bold shrink-0">Partner says:</span>
                    <span className="italic">&ldquo;{turn.sampleResponseEn}&rdquo;</span>
                  </div>
                  <button
                    onClick={() => playTTS(turn.sampleResponseEn)}
                    className="p-1 text-blue-600 hover:text-blue-900 rounded transition-colors shrink-0"
                    title="Listen to spoken response"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}

              {/* Note Writing Input Line (Textbook Note format) */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-zinc-700 font-sans flex items-center gap-1.5">
                  <span>Partner&apos;s Notes:</span>
                  <span className="text-[11px] font-normal text-zinc-500 font-arabic" dir="rtl">
                    (دوّن ملاحظتك هنا عن إجابة زميلك)
                  </span>
                </label>
                <input
                  type="text"
                  value={userNote}
                  onChange={(e) => handleNoteChange(turn.id, e.target.value)}
                  placeholder="e.g. Write brief note in English..."
                  className="w-full bg-white border border-zinc-200 rounded-xl px-3.5 py-2 text-xs sm:text-sm font-sans text-zinc-900 focus:outline-none focus:border-zinc-900 focus:ring-1 focus:ring-zinc-900 placeholder:text-zinc-400"
                />

                {/* Quick Suggestion Chips for Solo Learners */}
                <div className="flex flex-wrap items-center gap-1.5 pt-1">
                  <span className="text-[11px] font-bold text-zinc-500 font-sans">
                    Quick suggestions:
                  </span>
                  {turn.suggestedNotes.map((sug, sIdx) => (
                    <button
                      key={sIdx}
                      type="button"
                      onClick={() => handleChipClick(turn.id, sug)}
                      className="px-2 py-0.5 rounded-md text-[11px] font-sans font-medium bg-white hover:bg-zinc-100 border border-zinc-200 text-zinc-700 transition-colors cursor-pointer"
                    >
                      + {sug}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Action Footer */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-zinc-200">
        <div className="flex items-center gap-2">
          <button
            onClick={applyModelNotes}
            className="flex items-center gap-1.5 px-4 py-2 bg-zinc-900 hover:bg-zinc-800 text-white rounded-xl text-xs sm:text-sm font-bold font-sans transition-colors cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Fill Model Partner Notes</span>
          </button>
          <button
            onClick={handleCopyNotes}
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
