import React from 'react';
import { ArrowRight, BookOpen, Sparkles, CheckCircle2, Lock } from 'lucide-react';
import { unit1GrammarTopicsList } from '../../data/unit1GrammarTopics';
import { unit2GrammarTopicsList } from '../../data/unit2GrammarTopics';

interface GrammarTopicSelectorProps {
  unitId?: string;
  onSelectTopic: (topicId: string) => void;
  onBackToUnits: () => void;
  unlockedGrammarTopics?: string[];
  isTeacher?: boolean;
}

export const GrammarTopicSelector: React.FC<GrammarTopicSelectorProps> = ({
  unitId = 'unit-1',
  onSelectTopic,
  onBackToUnits,
  unlockedGrammarTopics,
  isTeacher = false,
}) => {
  const isUnit1 = unitId === 'unit-1';
  const isUnit2 = unitId === 'unit-2';
  const isUnit3 = unitId === 'unit-3';

  // Unit 3 topics metadata
  const unit3Topics = [
    {
      id: 'u3-l1-pres-perf',
      number: 1,
      titleAr: 'زمن المضارع التام (Present Perfect Tense)',
      titleEn: 'The Present Perfect Tense',
      taglineAr: 'صيغ have و has مع التصريف الثالث (p.p) للإثبات والنفي والاستفهام',
      badge: 'زمن المضارع التام',
      color: 'emerald',
      features: ['كرت الإثبات', 'كرت النفي', 'كرت الاستفهام'],
    },
    {
      id: 'u3-l2-verb-forms',
      number: 2,
      titleAr: 'أشكال التصريف الثالث وتصاريف الأفعال',
      titleEn: 'Regular & Irregular Past Participles',
      taglineAr: 'جدول تفاعلي شامل لأهم أفعال اليونت الثالث القياسية والشاذة واختبارات عليها',
      badge: 'جدول الأفعال الشاذة',
      color: 'indigo',
      features: ['جدول الأفعال', 'الشواذ المقررة', 'اختبار تصاريف'],
    },
    {
      id: 'u3-l3-adverbs',
      number: 3,
      titleAr: 'ظروف الحال (Adverbs of Manner)',
      titleEn: 'Adverbs of Manner',
      taglineAr: 'قواعد إضافة (ly-) وتحويل الصفات إلى ظروف لوصف طريقة وقوع الفعل والشواذ',
      badge: 'ظروف الحال',
      color: 'amber',
      features: ['قواعد إضافة ly', 'الشواذ fast / well', 'نماذج امتحانية'],
    },
  ];

  const activeTopics = isUnit3
    ? unit3Topics
    : isUnit2
    ? unit2GrammarTopicsList
    : unit1GrammarTopicsList;

  const defaultUnlockedId = isUnit3
    ? 'u3-l1-pres-perf'
    : isUnit2
    ? 'u2-topic-future-will'
    : 'topic-past-simple';

  const unitLabelAr = isUnit3
    ? 'الوحدة الثالثة (Unit 3)'
    : isUnit2
    ? 'الوحدة الثانية (Unit 2)'
    : 'الوحدة الأولى (Unit 1)';

  const unitTitleEn = isUnit3
    ? 'UNIT 3 GRAMMAR TOPICS'
    : isUnit2
    ? 'UNIT 2 GRAMMAR TOPICS'
    : 'UNIT 1 GRAMMAR TOPICS';

  const unitDescAr = isUnit3
    ? 'شرح مبسط ومباشر لمواضيع الوحدة الثالثة الثلاثة: زمن المضارع التام، جدول تصاريف الأفعال الشاذة والقياسية، وظروف الحال (Adverbs of Manner).'
    : isUnit2
    ? 'شرح مبسط ومباشر لمواضيع الوحدة الثانية الثلاثة: المستقبل البسيط مع will، درجات المقارنة والتفضيل، وقراءة وكتابة التواريخ والأعداد الترتيبية.'
    : 'شرح مبسط ومباشر لقواعد الأول المتوسط مع كروت منظمة لحالات الإثبات والنفي والاستفهام ونماذج امتحانية شهرية من كتاب الطالب والنشاط.';

  return (
    <div className="space-y-6 font-arabic" dir="rtl">
      {/* Top Breadcrumb Navigation */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-zinc-200 shadow-2xs">
        <div className="flex items-center gap-2">
          <button
            onClick={onBackToUnits}
            className="px-3.5 py-1.5 rounded-xl bg-zinc-100 hover:bg-zinc-200 text-zinc-800 text-xs font-bold flex items-center gap-1.5 cursor-pointer font-arabic transition-colors"
          >
            <ArrowRight className="w-3.5 h-3.5" />
            <span>العودة لقائمة الوحدات</span>
          </button>
          <span className="text-zinc-300">/</span>
          <span className="text-xs font-bold text-zinc-700 font-arabic">
            {unitLabelAr}
          </span>
        </div>
        <div className="text-xs font-bold text-blue-700 bg-blue-50 border border-blue-200 px-3 py-1.5 rounded-xl font-arabic self-start sm:self-auto">
          الصف الأول المتوسط • {activeTopics.length} مواضيع قواعدية
        </div>
      </div>

      {/* Unit Overview Card */}
      <div className="bg-white rounded-3xl border border-zinc-200 p-5 sm:p-7 shadow-xs text-right">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 text-white text-xs font-mono font-bold">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>{unitTitleEn}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-zinc-900 mt-2.5 font-arabic">
              المواضيع القواعدية • {unitLabelAr}
            </h2>
            <p className="text-xs sm:text-sm text-zinc-600 font-arabic mt-1.5 max-w-2xl leading-relaxed">
              {unitDescAr}
            </p>
          </div>
          <div className="bg-zinc-50 border border-zinc-200 rounded-2xl p-4 text-center shrink-0 self-start sm:self-center">
            <span className="text-xs text-zinc-500 font-arabic block">عدد المواضيع</span>
            <span className="text-2xl font-black text-zinc-900 font-mono block mt-0.5">
              {activeTopics.length} مواضيع
            </span>
            <span className="text-[11px] text-emerald-700 font-bold bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full inline-block mt-1 font-arabic">
              مكتملة مع التمارين
            </span>
          </div>
        </div>
      </div>

      {/* Grammar Topics Cards Grid */}
      <div className="space-y-3">
        <div className="flex items-center justify-between px-1 text-right">
          <h3 className="text-sm font-bold text-zinc-800 font-arabic flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-zinc-900" />
            <span>اختر الموضوع لدراسته بالتفصيل مع الكروت التفاعلية:</span>
          </h3>
          <span className="text-xs text-zinc-500 font-arabic">{activeTopics.length} مواضيع مقررة</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {activeTopics.map((topic: any) => {
            const isUnlocked =
              Array.isArray(unlockedGrammarTopics) && unlockedGrammarTopics.length > 0
                ? unlockedGrammarTopics.includes(topic.id) || topic.id === defaultUnlockedId
                : topic.id === defaultUnlockedId;

            return (
              <div
                key={topic.id}
                onClick={() => {
                  if (isUnlocked || isTeacher) {
                    onSelectTopic(topic.id);
                  }
                }}
                className={`bg-white rounded-2xl border p-5 sm:p-6 transition-all text-right flex flex-col justify-between relative overflow-hidden ${
                  !isUnlocked
                    ? isTeacher
                      ? 'border-amber-300 hover:border-amber-400 bg-amber-50/20 cursor-pointer shadow-2xs group'
                      : 'opacity-75 cursor-not-allowed border-zinc-200'
                    : 'border-zinc-200 hover:border-zinc-900 hover:shadow-md cursor-pointer group'
                }`}
              >
                {!isUnlocked && (
                  <div className={`absolute inset-0 ${isTeacher ? 'bg-zinc-950/60' : 'bg-zinc-950/45'} backdrop-blur-[1.5px] rounded-2xl flex flex-col items-center justify-center text-white z-10 p-3 select-none text-center`}>
                    <div className={`w-9 h-9 rounded-xl ${isTeacher ? 'bg-amber-500 text-white' : 'bg-zinc-900/90 text-amber-400'} flex items-center justify-center mb-1.5 shadow-md`}>
                      <Lock className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-bold font-arabic bg-zinc-900/90 px-2.5 py-1 rounded-lg">
                      {isTeacher ? '🔒 مغلق للطلاب (معاينة المعلم متاحة)' : 'مغلق من قبل مدرس المادة'}
                    </span>
                  </div>
                )}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="w-7 h-7 rounded-xl bg-zinc-900 text-white text-xs font-bold flex items-center justify-center font-mono">
                      0{topic.number}
                    </span>
                    <span className="text-[11px] font-bold text-zinc-600 bg-zinc-100 border border-zinc-200 px-2.5 py-0.5 rounded-full font-arabic">
                      {topic.badge}
                    </span>
                  </div>

                  <h4 className="text-base sm:text-lg font-bold text-zinc-900 font-arabic group-hover:text-zinc-950 transition-colors">
                    {topic.titleAr}
                  </h4>
                  <p className="text-xs text-zinc-500 font-sans mt-0.5 font-bold" dir="ltr">
                    {topic.titleEn}
                  </p>

                  <p className="text-xs text-zinc-600 font-arabic mt-2.5 leading-relaxed">
                    {topic.taglineAr}
                  </p>

                  {/* Features */}
                  {topic.features && (
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {topic.features.map((feat: string, fIdx: number) => (
                        <span
                          key={fIdx}
                          className="text-[11px] bg-zinc-50 border border-zinc-200 text-zinc-700 font-medium px-2 py-0.5 rounded-lg font-arabic"
                        >
                          {feat}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <div className="mt-5 pt-3 border-t border-zinc-100 flex items-center justify-between text-xs font-bold text-zinc-900 font-arabic">
                  <span>فتح الموضوع ←</span>
                  <span className="text-zinc-400 font-sans font-mono">0{topic.number}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
