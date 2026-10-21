import React from 'react';
import { HelpCircle, Volume2 } from 'lucide-react';
import { ExamApplicationItem } from '../../../data/unit1GrammarTopics';
import { HighlightedSentence } from './HighlightedSentence';

interface ExamApplicationsListProps {
  applications: ExamApplicationItem[];
  colorScheme?: 'blue' | 'rose' | 'indigo' | 'emerald';
  titleAr?: string;
  subtitleAr?: string;
  onSpeak: (text: string) => void;
}

export const ExamApplicationsList: React.FC<ExamApplicationsListProps> = ({
  applications,
  colorScheme = 'blue',
  titleAr = 'صيغ وتطبيقات امتحانية',
  subtitleAr = 'تفصيخ وبناء عناصر الجملة خطوة بخطوة وتظليل الكلمة التي تغيّرت',
  onSpeak,
}) => {
  if (!applications || applications.length === 0) return null;

  const colorStyles = {
    blue: {
      headerBg: 'bg-blue-600',
      headerTitle: 'text-blue-950',
      tagBadge: 'bg-blue-50 text-blue-800 border-blue-200',
      instructionBadge: 'text-blue-950 bg-blue-50 border-blue-100',
      stepNumBg: 'bg-blue-600',
      stepDotBg: 'bg-blue-600',
      stepBadge: 'text-blue-700 bg-blue-50 border-blue-200',
      tokenBadge: 'bg-blue-50 text-blue-700 border-blue-200',
      highlightClass: 'text-blue-600 font-black underline decoration-blue-300',
      partLabel: 'text-blue-800',
    },
    rose: {
      headerBg: 'bg-rose-600',
      headerTitle: 'text-rose-950',
      tagBadge: 'bg-rose-50 text-rose-800 border-rose-200',
      instructionBadge: 'text-rose-950 bg-rose-50 border-rose-100',
      stepNumBg: 'bg-rose-600',
      stepDotBg: 'bg-rose-600',
      stepBadge: 'text-rose-700 bg-rose-50 border-rose-200',
      tokenBadge: 'bg-rose-50 text-rose-700 border-rose-200',
      highlightClass: 'text-rose-600 font-black underline decoration-rose-300',
      partLabel: 'text-rose-800',
    },
    indigo: {
      headerBg: 'bg-indigo-600',
      headerTitle: 'text-indigo-950',
      tagBadge: 'bg-indigo-50 text-indigo-800 border-indigo-200',
      instructionBadge: 'text-indigo-950 bg-indigo-50 border-indigo-100',
      stepNumBg: 'bg-indigo-600',
      stepDotBg: 'bg-indigo-600',
      stepBadge: 'text-indigo-700 bg-indigo-50 border-indigo-200',
      tokenBadge: 'bg-indigo-50 text-indigo-700 border-indigo-200',
      highlightClass: 'text-indigo-600 font-black underline decoration-indigo-300',
      partLabel: 'text-indigo-800',
    },
    emerald: {
      headerBg: 'bg-emerald-600',
      headerTitle: 'text-emerald-950',
      tagBadge: 'bg-emerald-50 text-emerald-800 border-emerald-200',
      instructionBadge: 'text-emerald-950 bg-emerald-50 border-emerald-100',
      stepNumBg: 'bg-emerald-600',
      stepDotBg: 'bg-emerald-600',
      stepBadge: 'text-emerald-700 bg-emerald-50 border-emerald-200',
      tokenBadge: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      highlightClass: 'text-emerald-600 font-black underline decoration-emerald-300',
      partLabel: 'text-emerald-800',
    },
  }[colorScheme];

  return (
    <div className="bg-white border border-zinc-200 rounded-3xl p-6 sm:p-7 shadow-xs space-y-5 text-right">
      <div className="flex items-center justify-between border-b border-zinc-100 pb-3">
        <div className="flex items-center gap-2">
          <span className={`p-2 ${colorStyles.headerBg} text-white rounded-xl`}>
            <HelpCircle className="w-5 h-5" />
          </span>
          <div>
            <h4 className={`text-base sm:text-lg font-black ${colorStyles.headerTitle} font-arabic`}>
              {titleAr}
            </h4>
            <span className="text-xs text-zinc-500 font-arabic">
              {subtitleAr}
            </span>
          </div>
        </div>
        <span
          className={`text-xs font-mono font-bold px-3 py-1 ${colorStyles.tagBadge} rounded-xl border`}
          dir="ltr"
        >
          Exam Style
        </span>
      </div>

      <div className="space-y-5">
        {applications.map((item, idx) => (
          <div
            key={item.id}
            className="p-4 sm:p-5 bg-white border border-zinc-200 rounded-2xl space-y-4 shadow-2xs"
          >
            <div className="flex items-center justify-between">
              <span
                className={`w-7 h-7 rounded-xl ${colorStyles.stepNumBg} text-white text-xs font-bold flex items-center justify-center font-mono shadow-xs`}
              >
                {idx + 1}
              </span>
              <span
                className={`text-xs font-bold font-arabic px-3 py-1 rounded-xl border ${colorStyles.instructionBadge}`}
              >
                {item.instructionAr}
              </span>
            </div>

            {/* 1. Problem with bracket */}
            <div className="p-3.5 bg-zinc-50/70 border border-zinc-200 rounded-xl flex items-center justify-between shadow-2xs">
              <p
                className="text-xs sm:text-sm font-bold text-zinc-900 font-sans tracking-tight"
                dir="ltr"
              >
                {item.problemEn}
              </p>
              <button
                onClick={() => onSpeak(item.problemEn)}
                className="p-1.5 rounded-lg bg-white hover:bg-zinc-100 text-zinc-600 cursor-pointer shrink-0 border border-zinc-200"
                title="استمع للسؤال"
              >
                <Volume2 className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* 2. خطوات تفصيخ وبناء الجملة خطوة بخطوة */}
            {item.cumulativeSteps && item.cumulativeSteps.length > 0 ? (
              <div className="bg-zinc-50/60 border border-zinc-200 rounded-2xl p-3.5 sm:p-4 space-y-3">
                <div className="flex items-center justify-between border-b border-zinc-200/80 pb-2">
                  <span className="text-xs font-black text-zinc-900 font-arabic flex items-center gap-1.5">
                    <span className={`w-2 h-2 rounded-full ${colorStyles.stepDotBg}`}></span>
                    <span>خطوات بناء الجملة تفصيلياً (وحدة جوه وحدة):</span>
                  </span>
                  <span
                    className={`text-[11px] font-bold px-2.5 py-0.5 rounded-md border font-arabic ${colorStyles.stepBadge}`}
                  >
                    بناء تدريجي
                  </span>
                </div>

                <div className="space-y-2.5">
                  {item.cumulativeSteps.map((step) => (
                    <div
                      key={step.stepNumber}
                      className="p-3 bg-white rounded-xl border border-zinc-200 shadow-2xs space-y-2 text-right font-arabic"
                    >
                      {/* Header of step */}
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <span
                            className={`w-5 h-5 rounded-md ${colorStyles.stepNumBg} text-white text-[11px] font-bold font-mono flex items-center justify-center shrink-0`}
                          >
                            {step.stepNumber}
                          </span>
                          <span className="font-bold text-xs sm:text-sm text-zinc-900">
                            {step.titleAr}
                          </span>
                        </div>
                        {step.highlightToken && (
                          <span
                            className={`text-[11px] font-mono font-bold px-2 py-0.5 rounded-md border shrink-0 ${colorStyles.tokenBadge}`}
                            dir="ltr"
                          >
                            {step.highlightToken}
                          </span>
                        )}
                      </div>

                      {/* Explanation in Arabic */}
                      <p className="text-xs text-zinc-600 leading-relaxed pr-7">
                        {step.explanationAr}
                      </p>

                      {/* Sentence progress so far */}
                      <div className="flex flex-wrap items-center gap-2 pt-1 pr-7" dir="ltr">
                        <span
                          className="text-[11px] text-zinc-500 font-arabic font-medium shrink-0"
                          dir="rtl"
                        >
                          الجملة حتى الآن:
                        </span>
                        <div className="px-3 py-1 rounded-lg bg-zinc-50 border border-zinc-200 text-xs sm:text-sm font-mono font-bold text-zinc-900 shadow-2xs">
                          <HighlightedSentence
                            sentence={step.sentenceProgress}
                            highlight={step.highlightToken}
                            colorClass={colorStyles.highlightClass}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              item.dissection &&
              item.dissection.length > 0 && (
                <div className="bg-zinc-50/70 border border-zinc-200 rounded-2xl p-3.5 space-y-2">
                  <span className="text-[11px] font-bold text-zinc-600 font-arabic flex items-center gap-1.5">
                    <span>تحليل عناصر الجملة:</span>
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {item.dissection.map((part, pIdx) => (
                      <div
                        key={pIdx}
                        className="p-2.5 rounded-xl border bg-white text-xs flex flex-col gap-0.5 text-right font-arabic"
                      >
                        <span className={`text-[10px] font-bold ${colorStyles.partLabel}`}>
                          {part.label}:
                        </span>
                        <span className="font-bold text-zinc-900 text-xs">{part.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )
            )}

            {/* 3. الحل النموذجي مع تظليل التغيير */}
            <div className="p-3.5 bg-emerald-50/70 border border-emerald-300 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs">
              <div className="space-y-1.5 text-left" dir="ltr">
                <span
                  className="text-[11px] font-bold text-emerald-800 font-arabic block text-right"
                  dir="rtl"
                >
                  الحل النموذجي النهائي:
                </span>
                <div className="flex flex-wrap items-center gap-1.5 font-sans text-sm sm:text-base font-bold text-zinc-900">
                  {item.solutionTokens ? (
                    item.solutionTokens.map((tok, tIdx) => (
                      <span
                        key={tIdx}
                        className={
                          tok.isChanged
                            ? 'bg-emerald-600 text-white px-2.5 py-0.5 rounded-lg shadow-xs font-mono font-black text-sm sm:text-base ring-2 ring-emerald-300'
                            : 'text-zinc-800'
                        }
                      >
                        {tok.text}
                      </span>
                    ))
                  ) : (
                    <span className="font-bold text-emerald-950">{item.solutionEn}</span>
                  )}
                </div>
              </div>
              <button
                onClick={() => onSpeak(item.solutionEn)}
                className="p-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white cursor-pointer shrink-0 self-end sm:self-center shadow-xs flex items-center gap-1.5 text-xs font-bold font-arabic"
                title="استمع للحل"
              >
                <Volume2 className="w-4 h-4" />
                <span>استمع للحل</span>
              </button>
            </div>

            {/* 4. خطوة الحل المباشرة */}
            {item.actionStepAr && (
              <div className="p-3 bg-amber-50/70 border border-amber-200 rounded-xl text-xs font-arabic text-amber-950 flex items-center gap-2">
                <span className="px-2 py-0.5 bg-amber-500 text-white rounded-md font-bold text-[10px] shrink-0">
                  خطوة الحل
                </span>
                <span className="font-bold">{item.actionStepAr}</span>
              </div>
            )}

            {/* 5. توضيح المعلم */}
            <div className="p-3 bg-zinc-50 border border-zinc-200 rounded-xl text-xs font-arabic text-zinc-700 leading-relaxed">
              <span className="font-bold text-zinc-900">شرح طريقة المعالجة:</span> {item.noteAr}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
