import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Mail, Volume2, Copy, Check, Sparkles, BookOpen, CheckSquare, Edit3, Eye } from 'lucide-react';
import { lesson8ActivityData } from '../../../data/activityBookLesson8Data';
import { playSuccessChime } from '../../../utils/audioFeedback';

export const KarenModelLetterComposition: React.FC = () => {
  const model = lesson8ActivityData.modelLetterComposition;

  const [activeSubTab, setActiveSubTab] = useState<'model' | 'practice'>('model');
  const [showArabicTranslation, setShowArabicTranslation] = useState(true);
  const [copied, setCopied] = useState(false);

  // Student practice state
  const [practiceAddress, setPracticeAddress] = useState('P.O. Box 24, Baghdad, Iraq');
  const [practiceDate, setPracticeDate] = useState('15th October');
  const [practiceGreeting, setPracticeGreeting] = useState('Dear Karen,');
  const [practiceP1, setPracticeP1] = useState('');
  const [practiceP2, setPracticeP2] = useState('');
  const [practiceP3, setPracticeP3] = useState('');
  const [practiceSignOff, setPracticeSignOff] = useState('Best wishes,\n(Your Name)');

  const handleCopyModel = () => {
    navigator.clipboard.writeText(model.fullLetterTextEn);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleCopyPractice = () => {
    const fullDraft = `${practiceAddress}\n${practiceDate}\n\n${practiceGreeting}\n\n${practiceP1}\n\n${practiceP2}\n\n${practiceP3}\n\nPlease write back soon.\n\n${practiceSignOff}`;
    navigator.clipboard.writeText(fullDraft);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const fillPracticeFromModel = () => {
    setPracticeAddress(model.addressEn.join(' '));
    setPracticeDate(model.dateEn);
    setPracticeGreeting(model.greetingEn);
    setPracticeP1(model.paragraph1En);
    setPracticeP2(model.paragraph2En);
    setPracticeP3(model.paragraph3En);
    setPracticeSignOff('Best wishes,\nHala');
    confetti({ particleCount: 40, spread: 65 });
    playSuccessChime();
  };

  const playTTS = (text: string) => {
    if ('speechSynthesis' in window && text.trim()) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      utterance.rate = 0.88;
      window.speechSynthesis.speak(utterance);
    }
  };

  const wordCount = (
    practiceP1 + ' ' + practiceP2 + ' ' + practiceP3
  ).trim().split(/\s+/).filter(Boolean).length;

  return (
    <div className="bg-white rounded-2xl border border-zinc-200 p-5 sm:p-6 shadow-sm space-y-6" dir="ltr">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-zinc-200">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="inline-flex items-center gap-1 text-xs font-bold text-zinc-600 bg-zinc-100 px-2.5 py-0.5 rounded-md font-sans">
              <Mail className="w-3.5 h-3.5" />
              Activity Book • Page 19 • Unit 1 Composition
            </span>
            <span className="text-xs font-semibold text-zinc-500 font-sans">
              Required for School Exams
            </span>
          </div>
          <h4 className="text-base sm:text-lg font-bold text-zinc-900 font-sans">
            {model.titleEn}
          </h4>
          <p className="text-xs text-zinc-600 font-arabic mt-1 text-right" dir="rtl">
            الإنشاء المقرر للحفظ في امتحانات الشهر ونصف السنة: اكتب رسالة إلى كارين
          </p>
        </div>

        {/* Sub-tab switcher */}
        <div className="flex items-center gap-1.5 p-1 bg-zinc-100 rounded-xl shrink-0 self-start sm:self-center font-arabic" dir="rtl">
          <button
            onClick={() => setActiveSubTab('model')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeSubTab === 'model'
                ? 'bg-zinc-900 text-white shadow-xs'
                : 'text-zinc-600 hover:text-zinc-900'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>الإنشاء النموذجي للحفظ</span>
          </button>
          <button
            onClick={() => setActiveSubTab('practice')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeSubTab === 'practice'
                ? 'bg-zinc-900 text-white shadow-xs'
                : 'text-zinc-600 hover:text-zinc-900'
            }`}
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>تدرّب على الكتابة</span>
          </button>
        </div>
      </div>

      {/* VIEW 1: Model Composition for Memorization */}
      {activeSubTab === 'model' && (
        <div className="space-y-6">
          {/* Controls Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-zinc-50 rounded-xl border border-zinc-200">
            <div className="flex items-center gap-2">
              <button
                onClick={() => playTTS(model.fullLetterTextEn)}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-zinc-900 hover:bg-zinc-800 text-white rounded-lg text-xs font-bold font-sans transition-colors cursor-pointer"
              >
                <Volume2 className="w-3.5 h-3.5" />
                <span>Listen to Full Letter</span>
              </button>
              <button
                onClick={handleCopyModel}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-white hover:bg-zinc-100 border border-zinc-200 text-zinc-700 rounded-lg text-xs font-bold font-sans transition-colors cursor-pointer"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied!' : 'Copy Letter'}</span>
              </button>
            </div>

            <button
              onClick={() => setShowArabicTranslation(!showArabicTranslation)}
              className="text-xs font-bold text-zinc-600 hover:text-zinc-900 underline font-arabic"
              dir="rtl"
            >
              {showArabicTranslation ? 'إخفاء الترجمة العربية' : 'إظهار الترجمة العربية'}
            </button>
          </div>

          {/* Letter Layout Card */}
          <div className="border border-zinc-200 rounded-2xl p-5 sm:p-7 bg-white shadow-xs space-y-5 font-sans">
            {/* Header: Address & Date in top right */}
            <div className="flex justify-end text-right">
              <div className="text-xs sm:text-sm font-semibold text-zinc-700 space-y-0.5 border-b border-zinc-100 pb-2">
                {model.addressEn.map((line, idx) => (
                  <p key={idx}>{line}</p>
                ))}
                <p className="font-bold text-zinc-900 pt-0.5">{model.dateEn}</p>
              </div>
            </div>

            {/* Greeting */}
            <div>
              <p className="text-sm sm:text-base font-bold text-zinc-900">
                {model.greetingEn}
              </p>
            </div>

            {/* Paragraph 1 */}
            <div className="space-y-1.5">
              <div className="flex items-start justify-between gap-2">
                <p className="text-xs sm:text-sm text-zinc-800 leading-relaxed indent-4">
                  {model.paragraph1En}
                </p>
                <button
                  onClick={() => playTTS(model.paragraph1En)}
                  className="p-1 text-zinc-400 hover:text-zinc-700 rounded transition-colors shrink-0"
                  title="Listen"
                >
                  <Volume2 className="w-3 h-3" />
                </button>
              </div>
              {showArabicTranslation && (
                <p className="text-[11px] sm:text-xs text-zinc-500 font-arabic text-right leading-relaxed pr-4 border-r-2 border-zinc-200 mr-2" dir="rtl">
                  {model.paragraph1Ar}
                </p>
              )}
            </div>

            {/* Paragraph 2 */}
            <div className="space-y-1.5">
              <div className="flex items-start justify-between gap-2">
                <p className="text-xs sm:text-sm text-zinc-800 leading-relaxed indent-4">
                  {model.paragraph2En}
                </p>
                <button
                  onClick={() => playTTS(model.paragraph2En)}
                  className="p-1 text-zinc-400 hover:text-zinc-700 rounded transition-colors shrink-0"
                  title="Listen"
                >
                  <Volume2 className="w-3 h-3" />
                </button>
              </div>
              {showArabicTranslation && (
                <p className="text-[11px] sm:text-xs text-zinc-500 font-arabic text-right leading-relaxed pr-4 border-r-2 border-zinc-200 mr-2" dir="rtl">
                  {model.paragraph2Ar}
                </p>
              )}
            </div>

            {/* Paragraph 3 */}
            <div className="space-y-1.5">
              <div className="flex items-start justify-between gap-2">
                <p className="text-xs sm:text-sm text-zinc-800 leading-relaxed indent-4">
                  {model.paragraph3En}
                </p>
                <button
                  onClick={() => playTTS(model.paragraph3En)}
                  className="p-1 text-zinc-400 hover:text-zinc-700 rounded transition-colors shrink-0"
                  title="Listen"
                >
                  <Volume2 className="w-3 h-3" />
                </button>
              </div>
              {showArabicTranslation && (
                <p className="text-[11px] sm:text-xs text-zinc-500 font-arabic text-right leading-relaxed pr-4 border-r-2 border-zinc-200 mr-2" dir="rtl">
                  {model.paragraph3Ar}
                </p>
              )}
            </div>

            {/* Sign-off & Signature */}
            <div className="pt-3 border-t border-zinc-100 space-y-1">
              <p className="text-xs sm:text-sm font-semibold text-zinc-800">
                {model.signOffEn}
              </p>
              <p className="text-xs sm:text-sm font-bold text-zinc-900 whitespace-pre-line">
                {model.signatureEn}
              </p>
            </div>
          </div>

          {/* Writing Tips (Writing Tip 1) */}
          <div className="p-4 rounded-xl border border-zinc-200 bg-zinc-50/60 space-y-2 text-right" dir="rtl">
            <div className="flex items-center gap-2 justify-end">
              <h5 className="text-xs sm:text-sm font-bold text-zinc-900 font-arabic">
                قواعد وإرشادات كتابة الرسالة (Writing Tip 1):
              </h5>
              <CheckSquare className="w-4 h-4 text-zinc-700" />
            </div>
            <ul className="list-disc list-inside space-y-1 text-xs text-zinc-600 font-arabic leading-relaxed">
              {model.keyWritingTipsAr.map((tip, idx) => (
                <li key={idx}>{tip}</li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* VIEW 2: Student Practice Form */}
      {activeSubTab === 'practice' && (
        <div className="space-y-5 text-left">
          <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-zinc-50 rounded-xl border border-zinc-200">
            <span className="text-xs font-bold text-zinc-700 font-sans">
              Words in body: {wordCount} words
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={fillPracticeFromModel}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-zinc-900 hover:bg-zinc-800 text-white rounded-lg text-xs font-bold font-sans transition-colors cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>Insert Model Draft to Edit</span>
              </button>
              <button
                onClick={handleCopyPractice}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-white hover:bg-zinc-100 border border-zinc-200 text-zinc-700 rounded-lg text-xs font-bold font-sans transition-colors cursor-pointer"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>Copy Draft</span>
              </button>
            </div>
          </div>

          {/* Letter Inputs */}
          <div className="border border-zinc-200 rounded-2xl p-5 space-y-4 bg-white">
            {/* Address & Date */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] font-bold text-zinc-500 uppercase tracking-wider block mb-1">
                  Sender Address (العنوان - أعلى اليمين):
                </label>
                <input
                  type="text"
                  value={practiceAddress}
                  onChange={(e) => setPracticeAddress(e.target.value)}
                  placeholder="e.g. P.O. Box 24, Baghdad, Iraq"
                  className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-3 py-2 text-xs font-sans text-zinc-900 focus:outline-none focus:border-zinc-900"
                />
              </div>
              <div>
                <label className="text-[11px] font-bold text-zinc-500 uppercase tracking-wider block mb-1">
                  Date (التاريخ):
                </label>
                <input
                  type="text"
                  value={practiceDate}
                  onChange={(e) => setPracticeDate(e.target.value)}
                  placeholder="e.g. 15th October"
                  className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-3 py-2 text-xs font-sans text-zinc-900 focus:outline-none focus:border-zinc-900"
                />
              </div>
            </div>

            {/* Greeting */}
            <div>
              <label className="text-[11px] font-bold text-zinc-500 uppercase tracking-wider block mb-1">
                Greeting (التحية):
              </label>
              <input
                type="text"
                value={practiceGreeting}
                onChange={(e) => setPracticeGreeting(e.target.value)}
                placeholder="Dear Karen,"
                className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-3 py-2 text-xs font-sans text-zinc-900 focus:outline-none focus:border-zinc-900"
              />
            </div>

            {/* Paragraph 1 */}
            <div>
              <label className="text-[11px] font-bold text-zinc-700 block mb-1">
                Paragraph 1: Thank Karen & Tell her about your school (الشكر والمدرسة):
              </label>
              <textarea
                rows={3}
                value={practiceP1}
                onChange={(e) => setPracticeP1(e.target.value)}
                placeholder="Thank you very much for your letter. I am back at school now. My school is..."
                className="w-full bg-white border border-zinc-200 rounded-xl p-3 text-xs sm:text-sm font-sans text-zinc-900 focus:outline-none focus:border-zinc-900 placeholder:text-zinc-400 resize-none leading-relaxed"
              />
            </div>

            {/* Paragraph 2 */}
            <div>
              <label className="text-[11px] font-bold text-zinc-700 block mb-1">
                Paragraph 2: Answer Karen about Iraq, Museum & Photos (العراق والمتحف والصور):
              </label>
              <textarea
                rows={3}
                value={practiceP2}
                onChange={(e) => setPracticeP2(e.target.value)}
                placeholder="In Iraq, there are many interesting places. In Baghdad, there is a big museum. I am sending you..."
                className="w-full bg-white border border-zinc-200 rounded-xl p-3 text-xs sm:text-sm font-sans text-zinc-900 focus:outline-none focus:border-zinc-900 placeholder:text-zinc-400 resize-none leading-relaxed"
              />
            </div>

            {/* Paragraph 3 */}
            <div>
              <label className="text-[11px] font-bold text-zinc-700 block mb-1">
                Paragraph 3: Holidays, Spare Time & Favourite Food (العطلة، الهوايات، الأكل المفضل):
              </label>
              <textarea
                rows={3}
                value={practiceP3}
                onChange={(e) => setPracticeP3(e.target.value)}
                placeholder="In the holidays, I went to... In my spare time, I like... My favourite food is..."
                className="w-full bg-white border border-zinc-200 rounded-xl p-3 text-xs sm:text-sm font-sans text-zinc-900 focus:outline-none focus:border-zinc-900 placeholder:text-zinc-400 resize-none leading-relaxed"
              />
            </div>

            {/* Sign-off */}
            <div>
              <label className="text-[11px] font-bold text-zinc-500 uppercase tracking-wider block mb-1">
                Sign-off & Name (الخاتمة واسمك):
              </label>
              <input
                type="text"
                value={practiceSignOff}
                onChange={(e) => setPracticeSignOff(e.target.value)}
                placeholder="Best wishes, [Your Name]"
                className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-3 py-2 text-xs font-sans text-zinc-900 focus:outline-none focus:border-zinc-900"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
