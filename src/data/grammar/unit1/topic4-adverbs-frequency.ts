import { GrammarTopicData } from './types';

// TOPIC 4: ADVERBS OF FREQUENCY (ظروف التكرار)
// =========================================================================
export const topicAdverbsFrequency: GrammarTopicData = {
    id: 'topic-adverbs-frequency',
    number: 4,
    titleAr: 'ظروف التكرار',
    titleEn: 'Adverbs of Frequency',
    taglineAr: 'بيان نسبة تكرار الفعل وموقعها مع الفعل الرئيسي وأفعال الكينونة be',
    category: 'الظروف',
    badge: 'سؤال امتحاني ثابت',
    color: 'emerald',
    summaryAr: 'تُستخدم ظروف التكرار (always, usually, often, sometimes, never) لبيان كم مرة يتكرر حدوث الفعل في زمن المضارع البسيط. تأتي قبل الفعل الرئيسي وبعد أفعال الكينونة (am, is, are).',
    topicType: 'interests',
    interestsSections: [
      {
        titleAr: '1. ظروف التكرار الخمسة ومعانيها ونسبها المئوية',
        formulaChips: [
          { text: 'always (دائماً - 100%)', isHighlight: true },
          { text: 'usually (عادةً - 80%)' },
          { text: 'often (غالباً - 70%)' },
          { text: 'sometimes (أحياناً - 50%)' },
          { text: 'never (أبداً / قط - 0%)', isHighlight: true }
        ],
        explanationAr: 'تُستخدم هذه الكلمات الخمس للتعبير عن العادات ومدى تكرارنا للأنشطة اليومية في زمن المضارع البسيط، وتتراوح من الشيء المؤكد دائماً (always 100%) إلى الشيء الذي لا يحدث إطلاقاً (never 0%).',
        examples: [
          { en: 'I always do my homework after school.', ar: 'أنا دائماً أحل واجباتي بعد المدرسة.', highlight: 'always' },
          { en: 'We usually go to the mosque on Fridays.', ar: 'نحن عادةً نذهب إلى المسجد في أيام الجمعة.', highlight: 'usually' },
          { en: 'He often plays football in the park.', ar: 'هو غالباً يلعب كرة القدم في المتنزه.', highlight: 'often' },
          { en: 'We sometimes watch TV in the evening.', ar: 'نحن أحياناً نشاهد التلفاز في المساء.', highlight: 'sometimes' },
          { en: 'She never forgets her school bag.', ar: 'هي لا تنسى حقيبتها المدرسية أبداً.', highlight: 'never' }
        ]
      },
      {
        titleAr: '2. القاعدة الأولى: موقع ظرف التكرار قبل الفعل الرئيسي (Before the Main Verb)',
        formulaChips: [
          { text: 'الفاعل (Subject)' },
          { text: '+' },
          { text: 'ظرف التكرار (always / usually / often / sometimes / never)', isHighlight: true, note: 'قبل الفعل' },
          { text: '+' },
          { text: 'الفعل الرئيسي (Main Verb)', isHighlight: true },
          { text: '+' },
          { text: 'التكملة (Complement)' }
        ],
        explanationAr: 'توضع ظروف التكرار دائماً قبل الفعل الرئيسي في الجملة.\nتنبيه هام جداً بالامتحان: إذا كان الفاعل مفرداً (He, She, It, Ali)، يجب إضافة s الشخص الثالث للفعل الرئيسي بعد ظرف التكرار!',
        examples: [
          { en: 'They always drink tea after breakfast.', ar: 'هم دائماً يشربون الشاي بعد الفطور. (always جاءت قبل الفعل الرئيسي drink)', highlight: 'always drink' },
          { en: 'Ali usually gets up at six o\'clock.', ar: 'علي عادةً يستيقظ عند الساعة السادسة. (الفاعل مفرد Ali ➔ أضفنا s للفعل gets)', highlight: 'usually gets up' },
          { en: 'My brother sometimes helps my father in the garden.', ar: 'أخي أحياناً يساعد أبي في الحديقة.', highlight: 'sometimes helps' },
          { en: 'They never walk to school; they take the bus.', ar: 'هم لا يمشون إلى المدرسة أبداً؛ يركبون الحافلة.', highlight: 'never walk' }
        ]
      },
      {
        titleAr: '3. القاعدة الثانية: موقع ظرف التكرار بعد فعل الكينونة be (After am / is / are)',
        formulaChips: [
          { text: 'الفاعل (Subject)' },
          { text: '+' },
          { text: 'am / is / are (فعل الكينونة)', isHighlight: true },
          { text: '+' },
          { text: 'ظرف التكرار (always / usually / often...)', isHighlight: true, note: 'بعد be مباشرة' },
          { text: '+' },
          { text: 'الصفة أو التكملة' }
        ],
        explanationAr: 'إذا كانت الجملة تحتوي على أحد أفعال الكينونة (am, is, are)، فإن ظرف التكرار يأتي بعدها مباشرة وليس قبلها!\nهذه النقطة هي أكثر سؤال مكرر في الاختيارات الامتحانية (is always وليس always is).',
        examples: [
          { en: 'He is always cheerful and smiling.', ar: 'هو دائماً بشوش ومبتسم. (is always الصحيحة، ولا يجوز always is)', highlight: 'is always' },
          { en: 'They are usually late for dinner.', ar: 'هم عادةً متأخرون على العشاء. (are usually)', highlight: 'are usually' },
          { en: 'It is often very cold in winter.', ar: 'الجو غالباً بارد جداً في الشتاء. (is often)', highlight: 'is often' },
          { en: 'She is never angry with her sisters.', ar: 'هي لا تغضب أبداً من أخواتها. (is never)', highlight: 'is never' }
        ]
      },
      {
        titleAr: '4. ظرف النفي (never) والسؤال بأداة التكرار (How often)',
        formulaChips: [
          { text: 'never = نفي قاطع بدون not', isHighlight: true },
          { text: '•' },
          { text: 'How often + do / does + الفاعل + فعل مجرد + ?', isHighlight: true }
        ],
        explanationAr: '1. كلمة (never) تعطي معنى النفي التام بدون استخدام not أو don\'t / doesn\'t، ولا يجوز الجمع بين not و never في نفس الجملة.\n2. للسؤال عن عدد المرات أو نسبة تكرار الفعل، نستخدم أداة الاستفهام (How often = كم مرة)، وتكون الإجابة باستخدام أحد ظروف التكرار.',
        examples: [
          { en: 'I never eat fast food.', ar: 'أنا لا آكل الوجبات السريعة أبداً. (الجملة منفية بـ never ولا نحتاج don\'t)', highlight: 'never eat' },
          { en: 'How often do you go to the cinema? — I never go.', ar: 'كم مرة تذهب إلى السينما؟ — أنا لا أذهب أبداً.', highlight: 'How often' },
          { en: 'How often does he clean his room? — He always cleans it.', ar: 'كم مرة ينظف غرفته؟ — هو دائماً ينظفها.', highlight: 'How often does he clean' }
        ]
      }
    ],
    examPractice: [
      {
        id: 'adv-q1',
        type: 'choice',
        questionEn: 'He ______ cheerful and polite.',
        questionAr: 'اختر الترتيب الصحيح لظرف التكرار مع فعل الكينونة is:',
        options: ['is always', 'always is', 'always', 'be always'],
        correctAnswer: 'is always',
        explanationAr: 'يأتي ظرف التكرار دائماً بعد فعل الكينونة (am/is/are) فنختار (is always).'
      },
      {
        id: 'adv-q2',
        type: 'choice',
        questionEn: 'They ______ go to the mosque on Fridays.',
        questionAr: 'اختر الترتيب الصحيح لظرف التكرار مع الفعل الرئيسي go:',
        options: ['usually', 'are usually', 'usually are', 'goes usually'],
        correctAnswer: 'usually',
        explanationAr: 'ظرف التكرار يأتي قبل الفعل الرئيسي مباشرة (They usually go).'
      },
      {
        id: 'adv-q3',
        type: 'correct',
        questionEn: 'Ali always (get) up at 6:30. (Correct the verb)',
        questionAr: 'صحح الفعل بين القوسين لوجود الفاعل المفرد Ali مع ظرف التكرار:',
        options: ['gets', 'getting', 'got'],
        correctAnswer: 'gets',
        explanationAr: 'مع الفاعل المفرد الغائب (Ali) نضيف s الشخص الثالث للفعل الرئيسي في المضارع البسيط فتصبح (gets).'
      },
      {
        id: 'adv-q4',
        type: 'choice',
        questionEn: 'She is ______ late for her English class.',
        questionAr: 'اختر ظرف التكرار المناسب بعد فعل الكينونة is:',
        options: ['never', 'not never', 'doesn\'t', 'never is'],
        correctAnswer: 'never',
        explanationAr: 'نختار (never) لأنها تأتي بعد is، ولا نستخدم not مع never.'
      },
      {
        id: 'adv-q5',
        type: 'transform',
        questionEn: 'We drink coffee in the evening. (Insert: sometimes)',
        questionAr: 'أدخل ظرف التكرار (sometimes) في مكانه الصحيح في الجملة:',
        options: ['We sometimes drink coffee in the evening.', 'We drink sometimes coffee in the evening.', 'Sometimes we coffee drink.'],
        correctAnswer: 'We sometimes drink coffee in the evening.',
        explanationAr: 'نضع sometimes قبل الفعل الرئيسي drink فتصبح الجملة: We sometimes drink coffee in the evening.'
      },
      {
        id: 'adv-q6',
        type: 'choice',
        questionEn: '______ do you visit your grandparents? — We usually visit them on Friday.',
        questionAr: 'اختر أداة الاستفهام المناسبة للسؤال عن تكرار الزيارة:',
        options: ['How often', 'How many', 'How much', 'How long'],
        correctAnswer: 'How often',
        explanationAr: 'نسأل عن نسبة تكرار الفعل وعدد المرات بأداة الاستفهام (How often) لوجود ظرف التكرار usually في الجواب.'
      },
      {
        id: 'adv-q7',
        type: 'choice',
        questionEn: 'My father never ______ to loud music.',
        questionAr: 'اختر صيغة الفعل المناسبة مع الفاعل المفرد My father:',
        options: ['listens', 'listen', 'listening', 'listened'],
        correctAnswer: 'listens',
        explanationAr: 'الفاعل مفرد (My father) لذلك يأخذ الفعل s الشخص الثالث بعد never فيصبح (listens).'
      },
      {
        id: 'adv-q8',
        type: 'choice',
        questionEn: 'Which sentence is grammatically CORRECT?',
        questionAr: 'أي جملة من الجمل التالية صحيحة قواعدياً؟',
        options: [
          'He is always happy.',
          'He always is happy.',
          'He is happy always.',
          'Always he is happy.'
        ],
        correctAnswer: 'He is always happy.',
        explanationAr: 'الجملة الصحيحة هي (He is always happy) لأن ظرف التكرار always يأتي بعد فعل الكينونة is.'
      }
    ]
  };
