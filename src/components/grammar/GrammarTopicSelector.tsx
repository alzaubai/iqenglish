import React from 'react';
import { ArrowRight, BookOpen, Sparkles, CheckCircle2, ChevronLeft } from 'lucide-react';
import { unit1GrammarTopicsList, GrammarTopicData } from '../../data/unit1GrammarTopics';

interface GrammarTopicSelectorProps {
  onSelectTopic: (topicId: string) => void;
  onBackToUnits: () => void;
}

export const GrammarTopicSelector: React.FC<GrammarTopicSelectorProps> = ({
  onSelectTopic,
  onBackToUnits,
}) => {
  return (
    <div className="space-y-6" dir="rtl">
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
            الوحدة الأولى (Unit 1)
          </span>
        </div>
        <div className="text-xs font-bold text-blue-700 bg-blue-50 border border-blue-200 px-3 py-1.5 rounded-xl font-arabic self-start sm:self-auto">
          الصف الأول المتوسط • 5 مواضيع قواعدية
        </div>
      </div>

      {/* Unit Overview Card */}
      <div className="bg-white rounded-3xl border border-zinc-200 p-4 sm:p-7 shadow-xs text-right">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 text-white text-xs font-mono font-bold">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>UNIT 1 GRAMMAR TOPICS</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-zinc-900 mt-2.5 font-arabic">
              المواضيع القواعدية للوحدة الأولى
            </h2>
            <p className="text-xs sm:text-sm text-zinc-600 font-arabic mt-1.5 max-w-2xl leading-relaxed">
              شرح مبسط ومباشر لقواعد الأول المتوسط مع كروت منظمة لحالات الإثبات والنفي والاستفهام ونماذج امتحانية شهرية من كتاب الطالب والنشاط.
            </p>
          </div>
          <div className="bg-zinc-50 border border-zinc-200 rounded-2xl p-4 text-center shrink-0 self-start sm:self-center">
            <span className="text-xs text-zinc-500 font-arabic block">عدد المواضيع</span>
            <span className="text-2xl font-black text-zinc-900 font-mono block mt-0.5">5 مواضيع</span>
            <span className="text-[11px] text-emerald-700 font-bold bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full inline-block mt-1 font-arabic">
              مكتملة مع التمارين
            </span>
          </div>
        </div>
      </div>

      {/* 5 Grammar Topics Cards Grid */}
      <div className="space-y-3">
        <div className="flex items-center justify-between px-1 text-right">
          <h3 className="text-sm font-bold text-zinc-800 font-arabic flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-zinc-900" />
            <span>اختر الموضوع لدراسته بالتفصيل مع الكروت التفاعلية:</span>
          </h3>
          <span className="text-xs text-zinc-500 font-arabic">5 مواضيع مخصصة</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {unit1GrammarTopicsList.map((topic: GrammarTopicData) => {
            const colorStyles = {
              blue: 'hover:border-blue-500 group-hover:text-blue-600 badge-blue',
              emerald: 'hover:border-emerald-500 group-hover:text-emerald-600 badge-emerald',
              purple: 'hover:border-purple-500 group-hover:text-purple-600 badge-purple',
              amber: 'hover:border-amber-500 group-hover:text-amber-600 badge-amber',
              teal: 'hover:border-teal-500 group-hover:text-teal-600 badge-teal',
            }[topic.color];

            return (
              <div
                key={topic.id}
                onClick={() => onSelectTopic(topic.id)}
                className="bg-white rounded-2xl border border-zinc-200 p-5 sm:p-6 transition-all text-right flex flex-col justify-between hover:border-zinc-900 hover:shadow-md cursor-pointer group relative overflow-hidden"
              >
                <div>
                  {/* Top row: Topic Number & Badge */}
                  <div className="flex items-center justify-between mb-3">
                    <span className="w-7 h-7 rounded-xl bg-zinc-900 text-white text-xs font-bold flex items-center justify-center font-mono">
                      0{topic.number}
                    </span>
                    <span className="text-[11px] font-bold text-zinc-600 bg-zinc-100 border border-zinc-200 px-2.5 py-0.5 rounded-full font-arabic">
                      {topic.badge}
                    </span>
                  </div>

                  {/* Title & English Subtitle */}
                  <h4 className="text-lg sm:text-xl font-bold text-zinc-900 font-arabic group-hover:text-zinc-950 transition-colors">
                    {topic.titleAr}
                  </h4>
                  <p className="text-xs text-zinc-500 font-sans mt-0.5 font-bold" dir="ltr">
                    {topic.titleEn}
                  </p>

                  {/* Summary / Tagline */}
                  <p className="text-xs sm:text-sm text-zinc-600 font-arabic mt-2.5 leading-relaxed">
                    {topic.taglineAr}
                  </p>

                  {/* Topic Features / Sub-badges */}
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {topic.topicType === 'tense' && (
                      <>
                        <span className="text-[11px] bg-zinc-50 border border-zinc-200 text-zinc-700 font-medium px-2 py-0.5 rounded-lg font-arabic">
                          كرت الإثبات
                        </span>
                        <span className="text-[11px] bg-zinc-50 border border-zinc-200 text-zinc-700 font-medium px-2 py-0.5 rounded-lg font-arabic">
                          كرت النفي
                        </span>
                        <span className="text-[11px] bg-zinc-50 border border-zinc-200 text-zinc-700 font-medium px-2 py-0.5 rounded-lg font-arabic">
                          كرت الاستفهام
                        </span>
                        <span className="text-[11px] bg-zinc-50 border border-zinc-200 text-zinc-700 font-medium px-2 py-0.5 rounded-lg font-arabic">
                          نماذج امتحانية
                        </span>
                      </>
                    )}
                    {topic.topicType === 'pronouns' && (
                      <>
                        <span className="text-[11px] bg-zinc-50 border border-zinc-200 text-zinc-700 font-medium px-2 py-0.5 rounded-lg font-arabic">
                          جدول التحويل
                        </span>
                        <span className="text-[11px] bg-zinc-50 border border-zinc-200 text-zinc-700 font-medium px-2 py-0.5 rounded-lg font-arabic">
                          الموقع بنهاية الجملة
                        </span>
                        <span className="text-[11px] bg-zinc-50 border border-zinc-200 text-zinc-700 font-medium px-2 py-0.5 rounded-lg font-arabic">
                          تمرين الكتاب الشامل
                        </span>
                      </>
                    )}
                    {topic.topicType === 'connectors' && (
                      <>
                        <span className="text-[11px] bg-zinc-50 border border-zinc-200 text-zinc-700 font-medium px-2 py-0.5 rounded-lg font-arabic">
                          and (التشابه)
                        </span>
                        <span className="text-[11px] bg-zinc-50 border border-zinc-200 text-zinc-700 font-medium px-2 py-0.5 rounded-lg font-arabic">
                          but (التناقض)
                        </span>
                        <span className="text-[11px] bg-zinc-50 border border-zinc-200 text-zinc-700 font-medium px-2 py-0.5 rounded-lg font-arabic">
                          or (التخيير)
                        </span>
                      </>
                    )}
                    {topic.topicType === 'interests' && (
                      <>
                        <span className="text-[11px] bg-zinc-50 border border-zinc-200 text-zinc-700 font-medium px-2 py-0.5 rounded-lg font-arabic">
                          like / love / enjoy
                        </span>
                        <span className="text-[11px] bg-zinc-50 border border-zinc-200 text-zinc-700 font-medium px-2 py-0.5 rounded-lg font-arabic">
                          interested in
                        </span>
                        <span className="text-[11px] bg-zinc-50 border border-zinc-200 text-zinc-700 font-medium px-2 py-0.5 rounded-lg font-arabic">
                          فعل + ing
                        </span>
                      </>
                    )}
                  </div>
                </div>

                {/* Card footer CTA */}
                <div className="mt-5 pt-3.5 border-t border-zinc-100 flex items-center justify-between">
                  <span className="text-xs font-bold text-zinc-500 font-arabic">
                    {topic.examPractice.length} أسئلة امتحانية تدريبية
                  </span>
                  <div className="inline-flex items-center gap-1 text-xs font-bold text-zinc-900 group-hover:underline font-arabic">
                    <span>فتح الموضوع</span>
                    <ChevronLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
