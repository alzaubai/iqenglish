import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { lesson2ActivityData } from '../../../data/activityBookData';
import { CharacterAvatar } from '../../CharacterAvatar';

interface ExerciseBPhotosProps {
  onProgressUpdate: (completed: boolean) => void;
}

export const ExerciseBPhotos: React.FC<ExerciseBPhotosProps> = ({ onProgressUpdate }) => {
  const [photoOrders, setPhotoOrders] = useState<Record<string, number | ''>>({});
  const [exBChecked, setExBChecked] = useState(false);

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

  return (
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

      <div className="pt-3 border-t border-zinc-200 flex items-center justify-end">
        <button
          onClick={checkExB}
          className="px-6 py-2.5 bg-zinc-900 text-white rounded-xl text-xs font-bold hover:bg-zinc-800 cursor-pointer shadow-sm font-arabic"
        >
          التحقق من الإجابات
        </button>
      </div>
    </div>
  );
};
