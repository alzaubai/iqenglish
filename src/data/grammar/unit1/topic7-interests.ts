import { GrammarTopicData } from './types';


export const topicInterests: GrammarTopicData = // TOPIC 7: TALKING ABOUT INTERESTS (التعبير عن الاهتمام)
  // =========================================================================
  {
    id: 'topic-interests',
    number: 7,
    titleAr: 'التعبير عن الاهتمام والهوايات',
    titleEn: 'Talking about your Interests',
    taglineAr: 'استخدام like, love, enjoy والعبارة interested in',
    category: 'الهوايات والاهتمامات',
    badge: 'مهم بالامتحان',
    color: 'teal',
    summaryAr: 'عند التحدث عما نحبه أو هواياتنا، نستخدم أفعال الرغبة (like, love, enjoy) متبوعة بفعل مضاف إليه (ing)، أو عبارة (interested in) مسبوقة بفعل كينونة.',
    topicType: 'interests',
    interestsSections: [
      {
        titleAr: '1. أفعال الرغبة والمحبة (like, love, enjoy)',
        formulaChips: [
          { text: 'الفاعل (Subject)' },
          { text: '+', note: '' },
          { text: 'like / love / enjoy', isHighlight: true, note: 'أفعال الرغبة' },
          { text: '+', note: '' },
          { text: 'فعل + ing (V-ing)', isHighlight: true, note: 'اسم الفعل' }
        ],
        explanationAr: 'يأتي بعد أفعال (like = يحب، love = يعشق، enjoy = يستمتع) فعل مضاف له دائماً (ing) يعبر عن الهواية أو الفعالية.',
        examples: [
          { en: 'I like swimming.', ar: 'أنا أحب السباحة. (بعد like نضع swimming)', highlight: 'swimming' },
          { en: 'We love singing.', ar: 'نحن نحب الغناء. (بعد love نضع singing)', highlight: 'singing' },
          { en: 'She enjoys cooking.', ar: 'هي تستمتع بالطبخ. (بعد enjoys نضع cooking)', highlight: 'cooking' },
          { en: 'He doesn\'t like sailing.', ar: 'هو لا يحب الإبحار. (في النفي أيضاً نضع V-ing)', highlight: 'sailing' }
        ]
      },
      {
        titleAr: '2. العبارة المنهجية (interested in = مهتم بـ)',
        formulaChips: [
          { text: 'المفرد + is' },
          { text: 'أو' },
          { text: 'الجمع + are' },
          { text: '+', note: '' },
          { text: 'interested in', isHighlight: true, note: 'مهتم بـ' },
          { text: '+', note: '' },
          { text: 'فعل + ing أو اسم', isHighlight: true, note: 'الهواية' }
        ],
        explanationAr: 'عبارة (interested in) تختلف عن like و enjoy بأنها صفة، لذلك يجب أن يسبقها فعل كينونة:\n• نضع (is) إذا كان الفاعل مفرداً (He, She, It).\n• نضع (are) إذا كان الفاعل جمعاً (We, You, They).\nويأتي بعدها دائماً فعل مع ing أو اسم.',
        examples: [
          { en: 'He is interested in sailing.', ar: 'هو مهتم بالإبحار. (لاحظ وجود is قبل العبارة و ing بعدها)', highlight: 'is interested in sailing' },
          { en: 'They are interested in camping.', ar: 'هم مهتمون بالتخييم. (جمع ➔ are interested in)', highlight: 'are interested in camping' },
          { en: 'I am interested in history.', ar: 'أنا مهتم بالتاريخ. (اسم بعد حرف الجر in)', highlight: 'interested in history' }
        ]
      }
    ],
    examPractice: [
      {
        id: 'in-q1',
        type: 'choice',
        questionEn: 'Samir likes ______ a lot.',
        questionAr: 'اختر الصيغة الصحيحة بعد فعل likes:',
        options: ['travelling', 'travels', 'travel', 'to travelling'],
        correctAnswer: 'travelling',
        explanationAr: 'بعد فعل like / likes نختار دائماً الفعل المضاف إليه ing وهو (travelling).'
      },
      {
        id: 'in-q2',
        type: 'correct',
        questionEn: 'My father enjoys (sail) with my uncle Emad. (Correct the verb)',
        questionAr: 'صحح الفعل بين القوسين بعد فعل enjoys:',
        options: ['sailing', 'sailed', 'sails'],
        correctAnswer: 'sailing',
        explanationAr: 'الفعل enjoy يتبعه دائماً فعل يحمل ing، لذا نضيف ing للفعل sail ليصبح (sailing).'
      },
      {
        id: 'in-q3',
        type: 'choice',
        questionEn: 'We enjoy ______ near the beach.',
        questionAr: 'نحن نستمتع بـ ______ قرب الشاطئ:',
        options: ['camping', 'camped', 'to camp', 'camps'],
        correctAnswer: 'camping',
        explanationAr: 'بعد enjoy نختار اسم الفعل المنتهي بـ ing وهو (camping).'
      },
      {
        id: 'in-q4',
        type: 'choice',
        questionEn: 'He ______ interested in sailing.',
        questionAr: 'اختر فعل الكينونة المناسب للفاعل المفرد He مع عبارة interested in:',
        options: ['is', 'are', 'am', 'be'],
        correctAnswer: 'is',
        explanationAr: 'الفاعل مفرد (He) فيأخذ فعل الكينونة (is) فتصبح He is interested in.'
      },
      {
        id: 'in-q5',
        type: 'choice',
        questionEn: 'She doesn\'t like ______ stories.',
        questionAr: 'هي لا تحب قراءة القصص:',
        options: ['reading', 'read', 'reads', 'readed'],
        correctAnswer: 'reading',
        explanationAr: 'سواء كانت like مثبتة أو منفية (doesn\'t like)، يأتي بعدها فعل مع ing وهو (reading).'
      }
    ]
  };
