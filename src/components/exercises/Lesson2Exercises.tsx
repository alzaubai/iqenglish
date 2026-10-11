import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import {
  lesson2ActivityData,
  ABL2ScrambledSentence
} from '../../data/activityBookData';
import { RotateCcw } from 'lucide-react';
import { CharacterAvatar } from '../CharacterAvatar';

interface Lesson2ExercisesProps {
  onProgressUpdate: (completed: boolean) => void;
}

export const Lesson2Exercises: React.FC<Lesson2ExercisesProps> = ({
  onProgressUpdate,
}) => {
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3 | 4 | 5>(1);

  // Exercise B State
  const [photoOrders, setPhotoOrders] = useState<Record<string, number | ''>>({});
  const [exBChecked, setExBChecked] = useState(false);

  // Exercise 1 State
  const [ex1Answers, setEx1Answers] = useState<Record<string, string>>({});
  const [ex1Checked, setEx1Checked] = useState(false);

  // Exercise 3 State
  const [wordMatches, setWordMatches] = useState<Record<string, string>>({});
  const [ex3Checked, setEx3Checked] = useState(false);

  // Exercise 4 State
  const [constructedTokens, setConstructedTokens] = useState<Record<string, string[]>>({
    'scrambled-a': [],
    'scrambled-b': [],
  });
  const [ex4Checked, setEx4Checked] = useState<Record<string, boolean>>({});

  // Exercise 5 State
  const [saraAnswers, setSaraAnswers] = useState<Record<string, string>>({});
  const [ex5Checked, setEx5Checked] = useState(false);

  // Check Ex B
  const checkExB = () => {
    setExBChecked(true);
    let allGood = true;
    lesson2ActivityData.page6ExBPhotos.forEach((p) => {
      if (photoOrders[p.id] !== p.correctOrder) allGood = false;
    });
    if (allGood) {
      confetti({ particleCount: 40, spread: 60 });
      onProgressUpdate(true);
    }
  };

  // Check Ex 1
  const checkEx1 = () => {
    setEx1Checked(true);
    let allGood = true;
    lesson2ActivityData.page6Ex1Descriptions.forEach((d) => {
      if (ex1Answers[d.id]?.toLowerCase().trim() !== d.correctWord.toLowerCase()) {
        allGood = false;
      }
    });
    if (allGood) {
      confetti({ particleCount: 40, spread: 60 });
      onProgressUpdate(true);
    }
  };

  // Check Ex 3
  const checkEx3 = () => {
    setEx3Checked(true);
    let allGood = true;
    lesson2ActivityData.page7Ex3Meanings.forEach((m) => {
      if (wordMatches[m.id] !== m.id) allGood = false;
    });
    if (allGood) {
      confetti({ particleCount: 40, spread: 60 });
      onProgressUpdate(true);
    }
  };

  // Check Ex 4
  const handleWordChipClick = (sentenceId: string, word: string, add: boolean) => {
    const list = constructedTokens[sentenceId] || [];
    if (add) {
      setConstructedTokens((prev) => ({
        ...prev,
        [sentenceId]: [...list, word],
      }));
    } else {
      const idx = list.lastIndexOf(word);
      if (idx !== -1) {
        const copy = [...list];
        copy.splice(idx, 1);
        setConstructedTokens((prev) => ({ ...prev, [sentenceId]: copy }));
      }
    }
    setEx4Checked((prev) => ({ ...prev, [sentenceId]: false }));
  };

  const checkSentence = (item: ABL2ScrambledSentence) => {
    const list = constructedTokens[item.id] || [];
    const isCorrect =
      list.length === item.correctOrder.length &&
      list.every((w, i) => w === item.correctOrder[i]);
    setEx4Checked((prev) => ({ ...prev, [item.id]: true }));
    if (isCorrect) {
      confetti({ particleCount: 40, spread: 50 });
      onProgressUpdate(true);
    }
  };

  return (
    <div className="space-y-6">
      {/* Exercise Tabs Bar: Right to Left (تمرين 1 on right, 2 next to it, 3, 4, 5 on left) */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2" dir="rtl">
        {[
          { step: 1, title: 'تمرين 1 (الصور)' },
          { step: 2, title: 'تمرين 2 (الصفات)' },
          { step: 3, title: 'تمرين 3 (المعاني)' },
          { step: 4, title: 'تمرين 4 (ترتيب)' },
          { step: 5, title: 'تمرين 5 (سارة)' },
        ].map((tab) => (
          <button
            key={tab.step}
            onClick={() => setCurrentStep(tab.step as any)}
            className={`py-2 sm:py-3 px-2 sm:px-4 text-center rounded-xl font-bold text-xs sm:text-sm transition-all cursor-pointer font-arabic ${
              currentStep === tab.step
                ? 'bg-zinc-900 text-white shadow-sm'
                : 'bg-white hover:bg-zinc-50 border border-zinc-200 text-zinc-700'
            }`}
          >
            {tab.title}
          </button>
        ))}
      </div>

      {/* ======================================================== */}
      {/* STEP 1: Photo Ordering (AB Page 6 Ex B - LTR Layout)     */}
      {/* ======================================================== */}
      {currentStep === 1 && (
        <div className="bg-white rounded-2xl border border-zinc-200 p-5 sm:p-6 shadow-sm space-y-5" dir="ltr">
          <div className="pb-3 border-b border-zinc-200 flex items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold text-zinc-500 font-sans block mb-1">
                Activity Book • Page 6 • Exercise B
              </span>
              <h4 className="text-base sm:text-lg font-bold text-zinc-900 font-sans text-left">
                Listen and number the photographs in the order Richard talks about them (1 to 6).
              </h4>
              <p className="text-xs text-zinc-600 font-arabic mt-1" dir="rtl">
                رتب الصور حسب تسلسل حديث ريتشارد عنها من 1 إلى 6:
              </p>
            </div>
            <div className="shrink-0">
              <CharacterAvatar name="Richard" size="md" />
            </div>
          </div>

          {/* Cards arranged Left to Right */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
            {lesson2ActivityData.page6ExBPhotos.map((photo) => {
              const currentVal = photoOrders[photo.id] ?? '';
              const isAnswered = currentVal !== '';
              const isCorrect = isAnswered && currentVal === photo.correctOrder;

              return (
                <div
                  key={photo.id}
                  className={`p-4 rounded-xl border-2 transition-all text-left ${
                    exBChecked
                      ? isCorrect
                        ? 'border-emerald-500 bg-emerald-50/50'
                        : 'border-rose-400 bg-rose-50/50'
                      : 'border-zinc-200 bg-zinc-50/50'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="w-6 h-6 rounded-md bg-zinc-200 text-zinc-800 text-xs font-bold flex items-center justify-center uppercase font-mono">
                      {photo.letter}
                    </span>
                    <div className="flex items-center gap-2">
                      <select
                        value={currentVal}
                        onChange={(e) => {
                          const val = e.target.value === '' ? '' : parseInt(e.target.value, 10);
                          setPhotoOrders((prev) => ({ ...prev, [photo.id]: val }));
                          setExBChecked(false);
                        }}
                        className={`text-xs font-bold py-1.5 px-3 border rounded-lg bg-white font-sans ${
                          exBChecked
                            ? isCorrect
                              ? 'border-emerald-500 text-emerald-800'
                              : 'border-rose-400 text-rose-800'
                            : 'border-zinc-300'
                        }`}
                      >
                        <option value="">Order...</option>
                        {[1, 2, 3, 4, 5, 6].map((n) => (
                          <option key={n} value={n}>
                            #{n}
                          </option>
                        ))}
                      </select>
                      {/* When checked: if wrong, write correct answer in front of it in GREEN */}
                      {exBChecked && (
                        isCorrect ? (
                          <span className="text-emerald-700 font-bold text-xs shrink-0">
                            ✓ صحيح
                          </span>
                        ) : (
                          <span className="text-emerald-700 font-bold text-xs bg-emerald-100/90 px-2 py-1 rounded-md shrink-0">
                            الحل الصحيح: #{photo.correctOrder}
                          </span>
                        )
                      )}
                    </div>
                  </div>

                  {photo.imageUrl && (
                    <div className="w-full aspect-16/10 rounded-lg overflow-hidden mb-2.5 bg-zinc-100 border border-zinc-200 shadow-2xs">
                      <img
                        src={photo.imageUrl}
                        alt={photo.labelEn}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                  )}

                  {/* English on top, Arabic underneath */}
                  <h5 className="text-sm font-bold text-zinc-900 font-sans">
                    {photo.labelEn}
                  </h5>
                  <p className="text-xs text-zinc-500 font-arabic mt-0.5" dir="rtl">
                    {photo.labelAr}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Action button without spoiler */}
          <div className="pt-3 border-t border-zinc-200 flex items-center justify-end">
            <button
              onClick={checkExB}
              className="px-6 py-2.5 bg-zinc-900 text-white rounded-xl text-xs font-bold hover:bg-zinc-800 cursor-pointer shadow-sm font-arabic"
            >
              التحقق من الإجابات
            </button>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* STEP 2: Adjectives for places (AB Page 6 Ex 1 - LTR)      */}
      {/* ======================================================== */}
      {currentStep === 2 && (
        <div className="bg-white rounded-2xl border border-zinc-200 p-5 sm:p-6 shadow-sm space-y-5" dir="ltr">
          <div className="pb-3 border-b border-zinc-200">
            <span className="text-xs font-bold text-zinc-500 font-sans block mb-1">
              Activity Book • Page 6 • Exercise 1
            </span>
            <h4 className="text-base sm:text-lg font-bold text-zinc-900 font-sans text-left">
              Write one word he uses to describe each thing.
            </h4>
            <p className="text-xs text-zinc-600 font-arabic mt-1" dir="rtl">
              اكتب الصفة التي استخدمها ريتشارد لوصف كل مكان:
            </p>
          </div>

          <div className="space-y-3">
            {lesson2ActivityData.page6Ex1Descriptions.map((item) => {
              const currentVal = ex1Answers[item.id] || '';
              const isAnswered = currentVal.trim() !== '';
              const isCorrect = isAnswered && currentVal.toLowerCase() === item.correctWord.toLowerCase();

              return (
                <div
                  key={item.id}
                  className={`p-3.5 rounded-xl border-2 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-left ${
                    ex1Checked
                      ? isCorrect
                        ? 'border-emerald-500 bg-emerald-50/50'
                        : 'border-rose-400 bg-rose-50/50'
                      : 'border-zinc-200 bg-zinc-50/40'
                  }`}
                >
                  {/* Left: English on top, Arabic underneath */}
                  <div>
                    <span className="text-sm font-bold text-zinc-900 block font-sans">
                      {item.itemEn}
                    </span>
                    <span className="text-xs text-zinc-500 font-arabic block mt-0.5" dir="rtl">
                      {item.itemAr}
                    </span>
                  </div>

                  {/* Right: Select dropdown + correct answer in green in front of it */}
                  <div className="flex items-center gap-2 self-start sm:self-center">
                    <select
                      value={currentVal}
                      onChange={(e) => {
                        setEx1Answers((prev) => ({ ...prev, [item.id]: e.target.value }));
                        setEx1Checked(false);
                      }}
                      className={`text-xs font-bold p-2 border rounded-lg bg-white font-sans ${
                        ex1Checked
                          ? isCorrect
                            ? 'border-emerald-500 text-emerald-800'
                            : 'border-rose-400 text-rose-800'
                          : 'border-zinc-300'
                      }`}
                    >
                      <option value="">Choose adjective...</option>
                      {item.options.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>

                    {/* When checked: if wrong, write correct answer in front of it in GREEN */}
                    {ex1Checked && (
                      isCorrect ? (
                        <span className="text-emerald-700 font-bold text-xs shrink-0">
                          ✓ صحيح
                        </span>
                      ) : (
                        <span className="text-emerald-700 font-bold text-xs bg-emerald-100/90 px-2.5 py-1 rounded-md shrink-0 font-sans">
                          الحل: {item.correctWord}
                        </span>
                      )
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Action button without spoiler */}
          <div className="pt-3 border-t border-zinc-200 flex items-center justify-end">
            <button
              onClick={checkEx1}
              className="px-6 py-2.5 bg-zinc-900 text-white rounded-xl text-xs font-bold hover:bg-zinc-800 cursor-pointer shadow-sm font-arabic"
            >
              التحقق من الإجابات
            </button>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* STEP 3: Word Meanings (AB Page 7 Ex 3 - LTR)             */}
      {/* ======================================================== */}
      {currentStep === 3 && (
        <div className="bg-white rounded-2xl border border-zinc-200 p-5 sm:p-6 shadow-sm space-y-5" dir="ltr">
          <div className="pb-3 border-b border-zinc-200">
            <span className="text-xs font-bold text-zinc-500 font-sans block mb-1">
              Activity Book • Page 7 • Exercise 3
            </span>
            <h4 className="text-base sm:text-lg font-bold text-zinc-900 font-sans text-left">
              What do the words mean? Match each word with its meaning.
            </h4>
            <p className="text-xs text-zinc-600 font-arabic mt-1" dir="rtl">
              ماذا تعني هذه الكلمات؟ طابق كل كلمة مع تعريفها الصحيح بالإنجليزية:
            </p>
          </div>

          <div className="space-y-3">
            {lesson2ActivityData.page7Ex3Meanings.map((m) => {
              const matched = wordMatches[m.id];
              const isAnswered = !!matched;
              const isCorrect = isAnswered && matched === m.id;

              return (
                <div
                  key={m.id}
                  className={`p-4 rounded-xl border-2 transition-all space-y-2 text-left ${
                    ex3Checked
                      ? isCorrect
                        ? 'border-emerald-500 bg-emerald-50/50'
                        : 'border-rose-400 bg-rose-50/50'
                      : 'border-zinc-200 bg-zinc-50/50'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    {/* Left: English on top, Arabic underneath */}
                    <div>
                      <span className="text-base font-bold text-zinc-900 capitalize block font-sans">
                        {m.word}
                      </span>
                      <span className="text-xs text-zinc-500 font-arabic block mt-0.5" dir="rtl">
                        المعنى بالعربية: {m.definitionAr}
                      </span>
                    </div>

                    {/* Right: Select definition + green answer in front if wrong */}
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
                      <select
                        value={matched || ''}
                        onChange={(e) => {
                          setWordMatches((prev) => ({ ...prev, [m.id]: e.target.value }));
                          setEx3Checked(false);
                        }}
                        className={`text-xs p-2 border rounded-lg bg-white font-sans max-w-sm ${
                          ex3Checked
                            ? isCorrect
                              ? 'border-emerald-500 text-emerald-800'
                              : 'border-rose-400 text-rose-800'
                            : 'border-zinc-300'
                        }`}
                      >
                        <option value="">Select English definition...</option>
                        {lesson2ActivityData.page7Ex3Meanings.map((item) => (
                          <option key={item.id} value={item.id}>
                            {item.definitionEn}
                          </option>
                        ))}
                      </select>

                      {ex3Checked && (
                        isCorrect ? (
                          <span className="text-emerald-700 font-bold text-xs shrink-0">
                            ✓ صحيح
                          </span>
                        ) : (
                          <span className="text-emerald-700 font-bold text-xs bg-emerald-100/90 px-2.5 py-1 rounded-md font-sans">
                            الحل الصحيح: {m.definitionEn}
                          </span>
                        )
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Action button without spoiler */}
          <div className="pt-3 border-t border-zinc-200 flex items-center justify-end">
            <button
              onClick={checkEx3}
              className="px-6 py-2.5 bg-zinc-900 text-white rounded-xl text-xs font-bold hover:bg-zinc-800 cursor-pointer shadow-sm font-arabic"
            >
              التحقق من الإجابات
            </button>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* STEP 4: Word Scramble (AB Page 7 Ex 4 - LTR)             */}
      {/* ======================================================== */}
      {currentStep === 4 && (
        <div className="bg-white rounded-2xl border border-zinc-200 p-5 sm:p-6 shadow-sm space-y-5" dir="ltr">
          <div className="pb-3 border-b border-zinc-200">
            <span className="text-xs font-bold text-zinc-500 font-sans block mb-1">
              Activity Book • Page 7 • Exercise 4
            </span>
            <h4 className="text-base sm:text-lg font-bold text-zinc-900 font-sans text-left">
              Put the words in the correct order to make sentences.
            </h4>
            <p className="text-xs text-zinc-600 font-arabic mt-1" dir="rtl">
              رتب الكلمات في الترتيب الصحيح لتكوين جمل تامة:
            </p>
          </div>

          <div className="space-y-6">
            {lesson2ActivityData.page7Ex4Scrambled.map((item, idx) => {
              const constructed = constructedTokens[item.id] || [];
              const available = [...item.scrambled];
              constructed.forEach((w) => {
                const i = available.indexOf(w);
                if (i !== -1) available.splice(i, 1);
              });
              const isChecked = ex4Checked[item.id];
              const isCorrect =
                constructed.length === item.correctOrder.length &&
                constructed.every((w, i) => w === item.correctOrder[i]);

              return (
                <div
                  key={item.id}
                  className={`p-4 rounded-xl border-2 transition-all space-y-3 text-left ${
                    isChecked
                      ? isCorrect
                        ? 'border-emerald-500 bg-emerald-50/40'
                        : 'border-rose-400 bg-rose-50/40'
                      : 'border-zinc-200 bg-zinc-50/50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-zinc-800 font-sans">
                      Sentence ({idx === 0 ? 'a' : 'b'}):
                    </span>
                    <span className="text-xs text-zinc-600 font-arabic" dir="rtl">
                      المعنى المطلوب: {item.arabicTranslation}
                    </span>
                  </div>

                  {/* Built sentence area LTR */}
                  <div className={`min-h-12 p-3 bg-white border-2 rounded-xl flex flex-wrap items-center gap-2 ${
                    isChecked
                      ? isCorrect
                        ? 'border-emerald-500'
                        : 'border-rose-400'
                      : 'border-zinc-300'
                  }`}>
                    {constructed.length === 0 ? (
                      <span className="text-xs text-zinc-400 italic font-sans">
                        Tap words below in order to build sentence...
                      </span>
                    ) : (
                      constructed.map((w, wIdx) => (
                        <button
                          key={wIdx}
                          onClick={() => handleWordChipClick(item.id, w, false)}
                          className="px-3 py-1 bg-zinc-900 text-white rounded-lg text-xs font-bold hover:bg-zinc-800 cursor-pointer font-sans"
                        >
                          {w}
                        </button>
                      ))
                    )}
                    {constructed.length > 0 && (
                      <span className="font-bold text-sm text-zinc-900">
                        {item.punctuation}
                      </span>
                    )}
                  </div>

                  {/* If checked and wrong: show correct sentence in GREEN in front */}
                  {isChecked && !isCorrect && (
                    <div className="p-2.5 rounded-lg bg-emerald-100/90 border border-emerald-300 text-emerald-800 font-bold text-xs font-sans">
                      الجملة الصحيحة: {item.correctOrder.join(' ')}{item.punctuation}
                    </div>
                  )}

                  {/* Remaining words pool LTR */}
                  <div className="flex flex-wrap items-center gap-1.5">
                    {available.map((w, wIdx) => (
                      <button
                        key={wIdx}
                        onClick={() => handleWordChipClick(item.id, w, true)}
                        className="px-3 py-1 bg-zinc-100 hover:bg-zinc-200 border border-zinc-300 rounded-lg text-xs font-semibold text-zinc-800 cursor-pointer font-sans"
                      >
                        + {w}
                      </button>
                    ))}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-between pt-2 border-t border-zinc-200">
                    <button
                      onClick={() =>
                        setConstructedTokens((prev) => ({ ...prev, [item.id]: [] }))
                      }
                      className="text-xs text-zinc-500 hover:text-zinc-800 flex items-center gap-1 cursor-pointer font-sans"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Reset</span>
                    </button>
                    <button
                      onClick={() => checkSentence(item)}
                      disabled={constructed.length === 0}
                      className="px-4 py-1.5 bg-zinc-900 text-white rounded-lg text-xs font-bold hover:bg-zinc-800 cursor-pointer font-arabic"
                    >
                      التحقق من الترتيب
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* STEP 5: Sara's Holiday Notes (AB Page 7 Ex 5 - LTR)      */}
      {/* ======================================================== */}
      {currentStep === 5 && (
        <div className="bg-white rounded-2xl border border-zinc-200 p-5 sm:p-6 shadow-sm space-y-5" dir="ltr">
          <div className="pb-3 border-b border-zinc-200 flex items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold text-zinc-500 font-sans block mb-1">
                Activity Book • Page 7 • Exercise 5
              </span>
              <h4 className="text-base sm:text-lg font-bold text-zinc-900 font-sans text-left">
                Listen to Sara talking about her holidays. Write notes.
              </h4>
              <p className="text-xs text-zinc-600 font-arabic mt-1" dir="rtl">
                استمع إلى سارة وهي تتحدث عن عطلتها وزيارة صديقتها سميرة:
              </p>
            </div>
            <div className="flex items-center -space-x-2 shrink-0">
              <CharacterAvatar name="Sara" size="md" />
              <CharacterAvatar name="Sameera" size="md" />
            </div>
          </div>

          <div className="space-y-3.5">
            {lesson2ActivityData.page7Ex5SaraQuestions.map((q) => {
              const currentVal = saraAnswers[q.id] || '';
              const isAnswered = currentVal.trim() !== '';
              const isCorrect =
                isAnswered &&
                q.correctAnswers.some((ans) =>
                  currentVal.toLowerCase().includes(ans.toLowerCase())
                );

              return (
                <div
                  key={q.id}
                  className={`p-4 rounded-xl border-2 transition-all space-y-2 text-left ${
                    ex5Checked
                      ? isCorrect
                        ? 'border-emerald-500 bg-emerald-50/50'
                        : 'border-rose-400 bg-rose-50/50'
                      : 'border-zinc-200 bg-zinc-50/50'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    {/* English question top, Arabic underneath */}
                    <div>
                      <span className="text-sm font-bold text-zinc-900 block font-sans">
                        {q.questionEn}
                      </span>
                      <span className="text-xs text-zinc-500 font-arabic block mt-0.5" dir="rtl">
                        {q.questionAr}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        value={currentVal}
                        onChange={(e) => {
                          setSaraAnswers((prev) => ({ ...prev, [q.id]: e.target.value }));
                          setEx5Checked(false);
                        }}
                        placeholder="Write answer..."
                        className={`px-3 py-1.5 text-xs border rounded-lg bg-white sm:w-60 focus:ring-1 focus:ring-zinc-900 font-sans ${
                          ex5Checked
                            ? isCorrect
                              ? 'border-emerald-500 text-emerald-800'
                              : 'border-rose-400 text-rose-800'
                            : 'border-zinc-300'
                        }`}
                      />

                      {/* When checked: if wrong, write correct answer in front of it in GREEN */}
                      {ex5Checked && (
                        isCorrect ? (
                          <span className="text-emerald-700 font-bold text-xs shrink-0">
                            ✓ صحيح
                          </span>
                        ) : (
                          <span className="text-emerald-700 font-bold text-xs bg-emerald-100/90 px-2.5 py-1 rounded-md shrink-0 font-sans">
                            الحل الصحيح: {q.correctAnswers[0]}
                          </span>
                        )
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Action button without spoiler */}
          <div className="pt-3 border-t border-zinc-200 flex items-center justify-end">
            <button
              onClick={() => {
                setEx5Checked(true);
                let allGood = true;
                lesson2ActivityData.page7Ex5SaraQuestions.forEach((q) => {
                  const val = saraAnswers[q.id] || '';
                  if (!q.correctAnswers.some((ans) => val.toLowerCase().includes(ans.toLowerCase()))) {
                    allGood = false;
                  }
                });
                if (allGood) {
                  confetti({ particleCount: 40, spread: 60 });
                  onProgressUpdate(true);
                }
              }}
              className="px-6 py-2.5 bg-zinc-900 text-white rounded-xl text-xs font-bold hover:bg-zinc-800 cursor-pointer shadow-sm font-arabic"
            >
              التحقق من الإجابات
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
