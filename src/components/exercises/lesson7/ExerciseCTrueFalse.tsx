import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { CheckCircle2, XCircle, Sparkles, RefreshCw, Volume2, HelpCircle } from 'lucide-react';
import { lesson7ActivityData, TrueFalseQuestionItem } from '../../../data/activityBookLesson7Data';
import { playSuccessChime } from '../../../utils/audioFeedback';

export const ExerciseCTrueFalse: React.FC = () => {
  const { titleEn, titleAr, instructionEn, instructionAr, audioTrackNumber, questions, transcriptSnippet } =
    lesson7ActivityData.page16ExCTrueFalse;

  const [answers, setAnswers] = useState<Record<string, 'True' | 'False'>>({});
  const [isChecked, setIsChecked] = useState(false);
  const [showTranscript, setShowTranscript] = useState(false);

  const handleSelect = (questionId: string, choice: 'True' | 'False') => {
    setAnswers((prev) => ({ ...prev, [questionId]: choice }));
  };

  const isQuestionCorrect = (q: TrueFalseQuestionItem) => {
    return answers[q.id] === q.correctAnswer;
  };

  const checkAll = () => {
    setIsChecked(true);
    const allCorrect = questions.every(isQuestionCorrect);
    if (allCorrect) {
      confetti({ particleCount: 50, spread: 70 });
      playSuccessChime();
    }
  };

  const resetAll = () => {
    setAnswers({});
    setIsChecked(false);
  };

  const solveAll = () => {
    const model: Record<string, 'True' | 'False'> = {};
    questions.forEach((q) => {
      model[q.id] = q.correctAnswer;
    });
    setAnswers(model);
    setIsChecked(true);
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

  const answeredCount = Object.keys(answers).length;
  const correctCount = questions.filter(isQuestionCorrect).length;

  return (
    <div className="bg-white rounded-2xl border border-zinc-200 p-5 sm:p-6 shadow-sm space-y-6" dir="ltr">
      {/* Exercise Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-zinc-200">
        <div>
          <span className="text-xs font-bold text-zinc-500 font-sans block mb-1">
            Activity Book • Page 16 • Exercise C • Track {audioTrackNumber}
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
            onClick={() => setShowTranscript(!showTranscript)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-zinc-200 text-xs font-bold text-zinc-700 bg-zinc-50 hover:bg-zinc-100 transition-colors font-sans"
          >
            <HelpCircle className="w-3.5 h-3.5 text-zinc-500" />
            <span>{showTranscript ? 'Hide audio text' : 'Show audio text'}</span>
          </button>
          <div className="bg-zinc-100 px-3 py-1.5 rounded-xl text-xs font-bold text-zinc-800 font-sans">
            Answered: {answeredCount} / {questions.length}
          </div>
        </div>
      </div>

      {/* Audio Transcript Collapsible Panel */}
      {showTranscript && (
        <div className="bg-zinc-50 rounded-xl border border-zinc-200 p-4 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-zinc-500 font-sans uppercase tracking-wider">
              Audio Track 11 Transcript (نص استماع سناء)
            </span>
            <button
              onClick={() => playTTS(transcriptSnippet)}
              className="flex items-center gap-1.5 text-xs font-bold text-zinc-700 bg-white border border-zinc-200 px-2.5 py-1 rounded-lg hover:bg-zinc-100 transition-colors font-sans"
            >
              <Volume2 className="w-3.5 h-3.5 text-zinc-600" />
              <span>Listen</span>
            </button>
          </div>
          <p className="text-xs sm:text-sm text-zinc-700 font-sans leading-relaxed italic">
            &ldquo;{transcriptSnippet}&rdquo;
          </p>
        </div>
      )}

      {/* Questions List */}
      <div className="space-y-3.5">
        {questions.map((q) => {
          const selected = answers[q.id];
          const correct = isQuestionCorrect(q);

          return (
            <div
              key={q.id}
              className={`p-3.5 sm:p-4 rounded-xl border transition-all space-y-3 text-left ${
                isChecked
                  ? correct
                    ? 'border-emerald-300 bg-emerald-50/20'
                    : 'border-rose-300 bg-rose-50/20'
                  : 'border-zinc-200 bg-zinc-50/30 hover:bg-zinc-50 hover:border-zinc-300'
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-2.5">
                  <span className="w-6 h-6 rounded-md bg-zinc-200 text-zinc-800 text-xs font-bold flex items-center justify-center font-sans shrink-0 mt-0.5">
                    {q.number}
                  </span>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <p className="text-xs sm:text-sm font-bold text-zinc-900 font-sans leading-snug">
                        {q.statementEn}
                      </p>
                      <button
                        onClick={() => playTTS(q.statementEn)}
                        className="p-1 text-zinc-400 hover:text-zinc-700 rounded transition-colors shrink-0"
                        title="Listen"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <p className="text-[11px] sm:text-xs text-zinc-500 font-arabic text-right" dir="rtl">
                      {q.statementAr}
                    </p>
                  </div>
                </div>

                {/* True / False Choice Buttons */}
                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    onClick={() => handleSelect(q.id, 'True')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold font-sans transition-all cursor-pointer ${
                      selected === 'True'
                        ? 'bg-zinc-900 text-white shadow-xs'
                        : 'bg-white border border-zinc-200 text-zinc-700 hover:bg-zinc-100'
                    }`}
                  >
                    True
                  </button>
                  <button
                    onClick={() => handleSelect(q.id, 'False')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold font-sans transition-all cursor-pointer ${
                      selected === 'False'
                        ? 'bg-zinc-900 text-white shadow-xs'
                        : 'bg-white border border-zinc-200 text-zinc-700 hover:bg-zinc-100'
                    }`}
                  >
                    False
                  </button>
                </div>
              </div>

              {/* Feedback and Explanation when checked */}
              {isChecked && (
                <div
                  className={`pt-2.5 border-t text-xs font-arabic space-y-1 ${
                    correct
                      ? 'border-emerald-200 text-emerald-800'
                      : 'border-rose-200 text-rose-800'
                  }`}
                  dir="rtl"
                >
                  <div className="flex items-center gap-1.5 font-bold">
                    {correct ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    ) : (
                      <XCircle className="w-4 h-4 text-rose-500 shrink-0" />
                    )}
                    <span>
                      {correct ? 'إجابة صحيحة!' : `الإجابة الصحيحة هي: ${q.correctAnswer}`}
                    </span>
                  </div>
                  <p className="text-zinc-600 text-[11px] leading-relaxed mr-5">
                    {q.explanationAr}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Action Footer */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-zinc-200">
        <div className="flex items-center gap-2">
          <button
            onClick={checkAll}
            className="flex items-center gap-1.5 px-4 py-2 bg-zinc-900 hover:bg-zinc-800 text-white rounded-xl text-xs sm:text-sm font-bold font-sans transition-colors cursor-pointer"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>Check answers</span>
          </button>
          <button
            onClick={resetAll}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-zinc-100 hover:bg-zinc-200 text-zinc-700 rounded-xl text-xs sm:text-sm font-bold font-sans transition-colors cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>
        </div>

        <button
          onClick={solveAll}
          className="flex items-center gap-1.5 px-3 py-1.5 text-zinc-500 hover:text-zinc-800 text-xs font-bold font-sans hover:bg-zinc-100 rounded-lg transition-colors cursor-pointer"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          <span>Show Model Solution</span>
        </button>
      </div>

      {isChecked && (
        <div
          className={`p-3.5 rounded-xl text-xs sm:text-sm font-sans flex items-center justify-between border ${
            correctCount === questions.length
              ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
              : 'bg-zinc-50 text-zinc-800 border-zinc-200'
          }`}
        >
          <span>
            {correctCount === questions.length
              ? 'Excellent! All answers are completely correct.'
              : `You got ${correctCount} of ${questions.length} correct. Review explanations above.`}
          </span>
          <span className="font-bold text-xs bg-white px-2 py-0.5 rounded-md border border-zinc-200 text-zinc-700">
            {correctCount} / {questions.length}
          </span>
        </div>
      )}
    </div>
  );
};
