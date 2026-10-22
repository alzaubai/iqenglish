import React, { useState, useEffect } from 'react';
import {
  ArrowRight,
  ChevronRight,
  ChevronLeft,
  Lock,
} from 'lucide-react';
import { unit1GrammarTopicsList, GrammarTopicData } from '../../data/unit1GrammarTopics';
import { unit2GrammarTopicsList } from '../../data/unit2GrammarTopics';
import { SpeechEngine } from '../../utils/speech';
import { OverviewTab } from './topic-detail/OverviewTab';
import { AffirmativeTab } from './topic-detail/AffirmativeTab';
import { NegativeTab } from './topic-detail/NegativeTab';
import { QuestionTab } from './topic-detail/QuestionTab';
import { SpellingNotesTab } from './topic-detail/SpellingNotesTab';
import { ExamPracticeTab } from './topic-detail/ExamPracticeTab';
import { PossessivePronounsView } from './topic-detail/PossessivePronounsView';
import { JoiningSentencesView } from './topic-detail/JoiningSentencesView';
import { InterestsView } from './topic-detail/InterestsView';
import { WhQuestionsView } from './topic-detail/WhQuestionsView';
import { ComparativesView } from './topic-detail/ComparativesView';
import { OrdinalDatesView } from './topic-detail/OrdinalDatesView';
import { Unit3GrammarView } from './topic-detail/Unit3GrammarView';

interface GrammarTopicDetailProps {
  topicId: string;
  onBackToTopics: () => void;
  onBackToUnits: () => void;
  onSelectTopic: (topicId: string) => void;
  unlockedGrammarTopics?: string[];
  isTeacher?: boolean;
}

export const GrammarTopicDetail: React.FC<GrammarTopicDetailProps> = ({
  topicId,
  onBackToTopics,
  onBackToUnits,
  onSelectTopic,
  unlockedGrammarTopics,
  isTeacher = false,
}) => {
  const isUnit3 = topicId.startsWith('u3-');
  const isUnit2 = topicId.startsWith('u2-');

  const defaultUnlockedId = isUnit3
    ? 'u3-l1-pres-perf'
    : isUnit2
    ? 'u2-topic-future-will'
    : 'topic-past-simple';

  const isCurrentTopicUnlocked =
    Array.isArray(unlockedGrammarTopics) && unlockedGrammarTopics.length > 0
      ? unlockedGrammarTopics.includes(topicId)
      : topicId === defaultUnlockedId;

  const handleSpeak = (text: string) => {
    SpeechEngine.speakText(text, {
      rate: 0.85,
    });
  };

  // 1. DEDICATED VIEW FOR UNIT 3 TOPICS (Present Perfect, Verb Tables, Adverbs)
  if (isUnit3) {
    const unit3TopicIds = ['u3-l1-pres-perf', 'u3-l2-verb-forms', 'u3-l3-adverbs'];
    const currentIdx = unit3TopicIds.indexOf(topicId);

    return (
      <div className="space-y-6 font-arabic" dir="rtl">
        {/* Breadcrumb Navigation */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-zinc-200 shadow-2xs">
          <div className="flex items-center gap-2">
            <button
              onClick={onBackToTopics}
              className="px-3.5 py-1.5 rounded-xl bg-zinc-100 hover:bg-zinc-200 text-zinc-800 text-xs font-bold flex items-center gap-1.5 cursor-pointer font-arabic transition-colors"
            >
              <ArrowRight className="w-3.5 h-3.5" />
              <span>قائمة مواضيع الوحدة الثالثة</span>
            </button>
            <button
              onClick={onBackToUnits}
              className="px-3 py-1.5 rounded-xl bg-zinc-50 hover:bg-zinc-100 text-zinc-600 text-xs font-medium cursor-pointer font-arabic hidden sm:inline"
            >
              قائمة الوحدات
            </button>
          </div>

          {/* Quick switcher between the 3 topics */}
          <div className="flex items-center gap-1.5 self-end sm:self-auto">
            {unit3TopicIds.map((id, idx) => (
              <button
                key={id}
                onClick={() => onSelectTopic(id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  topicId === id
                    ? 'bg-slate-900 text-white shadow-2xs'
                    : 'bg-zinc-100 text-slate-700 hover:bg-zinc-200'
                }`}
              >
                موضوع 0{idx + 1}
              </button>
            ))}
          </div>
        </div>

        {!isCurrentTopicUnlocked && isTeacher && (
          <div className="p-3.5 bg-amber-50 border border-amber-200 rounded-2xl flex items-center justify-between gap-2 text-amber-900 font-arabic text-xs font-bold shadow-2xs">
            <div className="flex items-center gap-2">
              <Lock className="w-4 h-4 text-amber-600 shrink-0" />
              <span>وضع معاينة المعلم: هذا الموضوع مغلق حالياً أمام الطلاب من لوحة التحكم.</span>
            </div>
            <span className="px-2 py-0.5 rounded-md bg-amber-200/70 text-amber-950 text-[10px]">
              معاينة الأستاذ
            </span>
          </div>
        )}
        <Unit3GrammarView topicId={topicId} onSpeak={handleSpeak} />
      </div>
    );
  }

  // Active topics list for Unit 1 or Unit 2
  const activeUnitTopics = isUnit2 ? unit2GrammarTopicsList : unit1GrammarTopicsList;
  const currentTopic =
    activeUnitTopics.find((t) => t.id === topicId) ||
    unit1GrammarTopicsList.find((t) => t.id === topicId) ||
    unit2GrammarTopicsList.find((t) => t.id === topicId) ||
    unit1GrammarTopicsList[0];

  const currentIndex = activeUnitTopics.findIndex((t) => t.id === currentTopic.id);
  const prevTopic = currentIndex > 0 ? activeUnitTopics[currentIndex - 1] : null;
  const nextTopic =
    currentIndex < activeUnitTopics.length - 1 ? activeUnitTopics[currentIndex + 1] : null;

  // isCurrentTopicUnlocked already declared above

  const isPrevUnlocked = Boolean(
    isTeacher ||
      (prevTopic &&
        (Array.isArray(unlockedGrammarTopics) && unlockedGrammarTopics.length > 0
          ? unlockedGrammarTopics.includes(prevTopic.id)
          : prevTopic.id === defaultUnlockedId))
  );

  const isNextUnlocked = Boolean(
    isTeacher ||
      (nextTopic &&
        (Array.isArray(unlockedGrammarTopics) && unlockedGrammarTopics.length > 0
          ? unlockedGrammarTopics.includes(nextTopic.id)
          : nextTopic.id === defaultUnlockedId))
  );

  // Active sub-tab state depending on topic type
  const [activeTab, setActiveTab] = useState<string>(
    currentTopic.overview ? 'overview' : 'affirmative'
  );

  // Switch default tab on topic switch
  useEffect(() => {
    if (currentTopic.overview) {
      setActiveTab('overview');
    } else if (currentTopic.topicType === 'tense') {
      setActiveTab('affirmative');
    }
  }, [currentTopic.id]);

  // Strict Lock Guard (Allows Teacher to preview locked topics)
  if (!isCurrentTopicUnlocked && !isTeacher) {
    return (
      <div className="space-y-6" dir="rtl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-zinc-200 shadow-2xs">
          <div className="flex items-center gap-2">
            <button
              onClick={onBackToTopics}
              className="px-3.5 py-1.5 rounded-xl bg-zinc-100 hover:bg-zinc-200 text-zinc-800 text-xs font-bold flex items-center gap-1.5 cursor-pointer font-arabic transition-colors"
            >
              <ArrowRight className="w-3.5 h-3.5" />
              <span>قائمة مواضيع {isUnit2 ? 'الوحدة الثانية' : 'الوحدة الأولى'}</span>
            </button>
            <button
              onClick={onBackToUnits}
              className="px-3 py-1.5 rounded-xl bg-zinc-50 hover:bg-zinc-100 text-zinc-600 text-xs font-medium cursor-pointer font-arabic hidden sm:inline"
            >
              قائمة الوحدات
            </button>
          </div>
        </div>

        <div className="bg-white rounded-3xl border border-zinc-200 p-8 sm:p-12 shadow-xs text-center space-y-4 max-w-lg mx-auto my-8">
          <div className="w-16 h-16 rounded-2xl bg-amber-50 border border-amber-200 text-amber-600 flex items-center justify-center mx-auto shadow-xs">
            <Lock className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold text-slate-800 font-arabic">
            هذا الموضوع القواعدي مغلق حالياً
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 font-arabic leading-relaxed">
            تم قفل هذا الموضوع القواعدي من قبل مدرس المادة
          </p>
          <div className="pt-2">
            <button
              onClick={onBackToTopics}
              className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold font-arabic cursor-pointer transition-colors inline-flex items-center gap-2 shadow-xs"
            >
              <ArrowRight className="w-4 h-4" />
              <span>العودة لقائمة المواضيع المتاحة</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Tense sub-tabs configuration for Future with will or past tenses
  const tenseTabs = [
    { id: 'overview', title: '1. المقدمة ودلالات الزمن' },
    { id: 'affirmative', title: '2. صيغة الإثبات (Affirmative)' },
    { id: 'negative', title: '3. صيغة النفي (Negative)' },
    { id: 'question', title: '4. صيغة الاستفهام (Question)' },
    { id: 'practice', title: '5. تمارين امتحانية شهرية' },
  ];

  return (
    <div className="space-y-6 font-arabic" dir="rtl">
      {/* 1. Breadcrumb and Quick switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-zinc-200 shadow-2xs">
        <div className="flex items-center gap-2">
          <button
            onClick={onBackToTopics}
            className="px-3.5 py-1.5 rounded-xl bg-zinc-100 hover:bg-zinc-200 text-zinc-800 text-xs font-bold flex items-center gap-1.5 cursor-pointer font-arabic transition-colors"
          >
            <ArrowRight className="w-3.5 h-3.5" />
            <span>قائمة مواضيع {isUnit2 ? 'الوحدة الثانية' : 'الوحدة الأولى'}</span>
          </button>
          <button
            onClick={onBackToUnits}
            className="px-3 py-1.5 rounded-xl bg-zinc-50 hover:bg-zinc-100 text-zinc-600 text-xs font-medium cursor-pointer font-arabic hidden sm:inline"
          >
            قائمة الوحدات
          </button>
        </div>

        {/* Quick switcher between the topics */}
        <div className="flex items-center gap-1.5 self-end sm:self-auto">
          <button
            onClick={() => {
              if (prevTopic && isPrevUnlocked) {
                onSelectTopic(prevTopic.id);
              }
            }}
            disabled={!prevTopic || !isPrevUnlocked}
            className={`p-2 rounded-xl border text-xs font-bold transition-all ${
              !prevTopic || !isPrevUnlocked
                ? 'border-zinc-200 text-zinc-300 cursor-not-allowed bg-zinc-50'
                : 'border-zinc-300 text-zinc-700 hover:bg-zinc-100 cursor-pointer bg-white'
            }`}
            title={!prevTopic ? 'الموضوع السابق' : !isPrevUnlocked ? 'الموضوع السابق مغلق' : 'الموضوع السابق'}
          >
            <ChevronRight className="w-4 h-4" />
          </button>

          <span className="text-xs font-bold px-3 py-1 bg-zinc-100 text-zinc-800 rounded-xl font-arabic">
            الموضوع {currentTopic.number} من {activeUnitTopics.length}
          </span>

          <button
            onClick={() => {
              if (nextTopic && isNextUnlocked) {
                onSelectTopic(nextTopic.id);
              }
            }}
            disabled={!nextTopic || !isNextUnlocked}
            className={`p-2 rounded-xl border text-xs font-bold transition-all ${
              !nextTopic || !isNextUnlocked
                ? 'border-zinc-200 text-zinc-300 cursor-not-allowed bg-zinc-50'
                : 'border-zinc-300 text-zinc-700 hover:bg-zinc-100 cursor-pointer bg-white'
            }`}
            title={!nextTopic ? 'الموضوع التالي' : !isNextUnlocked ? 'الموضوع التالي مغلق' : 'الموضوع التالي'}
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 2. TOPIC HEADER CARD */}
      <div className="bg-white rounded-3xl border border-zinc-200 p-4 sm:p-7 shadow-xs text-right">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-black px-2.5 py-1 rounded-md bg-zinc-900 text-white font-mono">
                TOPIC 0{currentTopic.number}
              </span>
              <span className="text-xs font-bold px-2.5 py-1 rounded-md bg-blue-50 text-blue-700 border border-blue-200 font-arabic">
                {currentTopic.badge}
              </span>
            </div>

            <h3 className="text-xl sm:text-2xl font-black text-zinc-900 mt-2.5 font-arabic">
              {currentTopic.titleAr}
            </h3>
            <p className="text-xs sm:text-sm text-zinc-500 font-sans mt-0.5 font-bold" dir="ltr">
              {currentTopic.titleEn}
            </p>
            <p className="text-xs sm:text-sm text-zinc-600 font-arabic mt-2 leading-relaxed max-w-2xl">
              {currentTopic.summaryAr}
            </p>
          </div>
        </div>
      </div>

      {/* 3. DEDICATED BESPOKE VIEWS BY TOPIC NATURE */}
      {/* A. Dedicated View for Comparatives & Superlatives */}
      {currentTopic.id === 'u2-topic-comparatives' ? (
        <ComparativesView currentTopic={currentTopic} onSpeak={handleSpeak} />
      ) : /* B. Dedicated View for Ordinal Numbers & Dates */
      currentTopic.id === 'u2-topic-dates-ordinals' ? (
        <OrdinalDatesView currentTopic={currentTopic} onSpeak={handleSpeak} />
      ) : /* C. Future Tense or Past Tenses */
      currentTopic.topicType === 'tense' ? (
        <div className="space-y-6">
          <div className="bg-white p-2 rounded-2xl border border-zinc-200 shadow-2xs flex flex-wrap gap-2">
            {tenseTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 min-w-[95px] sm:min-w-[120px] py-2 sm:py-2.5 px-2.5 sm:px-3 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer font-arabic ${
                  activeTab === tab.id
                    ? 'bg-zinc-900 text-white shadow-2xs'
                    : 'text-zinc-600 hover:bg-zinc-100'
                }`}
              >
                {tab.title}
              </button>
            ))}
          </div>

          {activeTab === 'overview' && currentTopic.overview && (
            <OverviewTab currentTopic={currentTopic} onSpeak={handleSpeak} />
          )}

          {activeTab === 'affirmative' && currentTopic.affirmative && (
            <AffirmativeTab currentTopic={currentTopic} onSpeak={handleSpeak} />
          )}

          {activeTab === 'negative' && currentTopic.negative && (
            <NegativeTab currentTopic={currentTopic} onSpeak={handleSpeak} />
          )}

          {activeTab === 'question' && currentTopic.question && (
            <QuestionTab currentTopic={currentTopic} onSpeak={handleSpeak} />
          )}

          {activeTab === 'practice' && (
            <ExamPracticeTab currentTopic={currentTopic} onSpeak={handleSpeak} />
          )}
        </div>
      ) : currentTopic.topicType === 'pronouns' ? (
        <PossessivePronounsView currentTopic={currentTopic} onSpeak={handleSpeak} />
      ) : currentTopic.topicType === 'connectors' ? (
        <JoiningSentencesView currentTopic={currentTopic} onSpeak={handleSpeak} />
      ) : currentTopic.topicType === 'interests' ? (
        <InterestsView currentTopic={currentTopic} onSpeak={handleSpeak} />
      ) : currentTopic.topicType === 'questions' ? (
        <WhQuestionsView currentTopic={currentTopic} onSpeak={handleSpeak} />
      ) : null}
    </div>
  );
};
export default GrammarTopicDetail;
