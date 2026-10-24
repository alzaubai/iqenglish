import { GrammarLesson, GrammarUnit } from '../types/grammar';

export const unit3GrammarLessons: GrammarLesson[] = [
  // ==========================================
  // Lesson 1: Present Perfect Tense
  // ==========================================
  {
    id: 'grammar-u3-l1',
    unitNumber: 3,
    lessonNumber: 1,
    titleAr: 'الدرس 1: زمن المضارع التام (The Present Perfect Tense)',
    titleEn: 'Lesson 1: Present Perfect Tense (Affirmative, Negative & Questions)',
    subtitleAr: 'صيغ الإثبات والنفي والسؤال واستخدامات have و has مع التصريف الثالث',
    topics: [
      {
        id: 'u3-l1-pres-perf',
        titleAr: 'زمن المضارع التام (The Present Perfect Tense)',
        titleEn: 'Present Perfect Tense',
        summaryAr:
          'يُستخدم زمن المضارع التام للتعبير عن أحداث وقعت في وقت غير محدد في الماضي أو اكتملت للتو، ولها أثر أو نتيجة واضحة في الوقت الحاضر. يتكون دائماً من الفعل المساعد (have / has) متبوعاً بالتصريف الثالث للفعل (Past Participle - p.p).',
        rules: [
          {
            id: 'rule-u3-l1-affirmative',
            titleAr: '1. حالة الإثبات (Affirmative)',
            titleEn: 'Affirmative Sentences',
            formula: 'Subject (الفاعل) + have / has + Past Participle (p.p) + Complement',
            formulaNoteAr: 'نستخدم (has) مع المفرد: He, She, It | ونستخدم (have) مع: I, We, They, You والجمع.',
            explanationAr:
              'في حالة الإثبات، يأتي الفاعل ثم الفعل المساعد المناسب (have أو has)، يليه مباشرة التصريف الثالث للفعل الرئيسي (p.p). يمكن اختصار have إلى (\'ve) واختصار has إلى (\'s).',
            examples: [
              {
                en: "I have washed the windows.",
                ar: 'لقد غسلتُ النوافذ.',
                highlightWord: 'have washed',
              },
              {
                en: "She has cleaned the kitchen floor.",
                ar: 'لقد نظفت أرضية المطبخ.',
                highlightWord: 'has cleaned',
              },
              {
                en: "They have painted the garden gate.",
                ar: 'لقد صبغوا بوابة الحديقة.',
                highlightWord: 'have painted',
              },
            ],
          },
          {
            id: 'rule-u3-l1-negative',
            titleAr: '2. حالة النفي (Negative)',
            titleEn: 'Negative Sentences',
            formula: "Subject + haven't / hasn't + Past Participle (p.p) + Complement",
            formulaNoteAr: "have + not = haven't | has + not = hasn't",
            explanationAr:
              'عند النفي، نضيف أداة النفي (not) مباشرة بعد الفعل المساعد (have / has) مع الإبقاء على الفعل الرئيسي في صيغة التصريف الثالث (p.p) دون تغيير.',
            examples: [
              {
                en: "I haven't tidied my bedroom yet.",
                ar: 'لم أرتب غرفة نومي بعد.',
                highlightWord: "haven't tidied",
              },
              {
                en: "Ahmad hasn't swept the path.",
                ar: 'أحمد لم يكنس الممر.',
                highlightWord: "hasn't swept",
              },
            ],
          },
          {
            id: 'rule-u3-l1-question',
            titleAr: '3. صيغة السؤال القصير (Yes / No Questions)',
            titleEn: 'Yes / No Questions',
            formula: 'Have / Has + Subject + Past Participle (p.p) + Complement + ?',
            formulaNoteAr: 'الإجابة القصيرة: Yes, [الفاعل] have/has. أو No, [الفاعل] haven\'t/hasn\'t.',
            explanationAr:
              'لتكوين سؤال يبدأ بـ (هل)، نضع الفعل المساعد (Have أو Has) في بداية الجملة، يليه الفاعل، ثم التصريف الثالث للفعل.',
            examples: [
              {
                en: 'Have you finished your homework? - Yes, I have.',
                ar: 'هل أنهيتَ واجبك المنزلي؟ - نعم، لقد أنهيت.',
                highlightWord: 'Have you finished',
              },
              {
                en: 'Has Huda cooked the dinner? - No, she hasn\'t.',
                ar: 'هل طبخت هدى العشاء؟ - لا، لم تفعل.',
                highlightWord: 'Has Huda cooked',
              },
            ],
          },
        ],
        examTips: [
          'تذكر دائماً: بعد have و has نختار دائماً التصريف الثالث (p.p) وليس المصدر أو صيغة الماضي البسيط.',
          'الضمائر (He, She, It) وأي اسم مفرد تأخذ (has). بينما (I, We, You, They) وأي اسم جمع تأخذ (have).',
        ],
        quiz: [
          {
            id: 'quiz-u3-l1-1',
            questionTextEn: 'Noor ... finished her English project.',
            questionTextAr: 'نور ... مشروعها للغة الإنجليزية.',
            options: ['has', 'have', 'is', 'was'],
            correctIndex: 0,
            explanationAr: 'الفاعل (Noor) مفرد غائب، لذا نستخدم معها has في المضارع التام.',
          },
          {
            id: 'quiz-u3-l1-2',
            questionTextEn: 'Have they ... the new car?',
            questionTextAr: 'هل ... السيارة الجديدة؟',
            options: ['washed', 'washing', 'washes', 'wash'],
            correctIndex: 0,
            explanationAr: 'بعد الفعل المساعد Have في السؤال، يجب أن يكون الفعل في التصريف الثالث (washed).',
          },
          {
            id: 'quiz-u3-l1-3',
            questionTextEn: 'We ... seen that interesting movie yet.',
            questionTextAr: 'نحن ... ذلك الفيلم الممتع بعد.',
            options: ["haven't", "hasn't", 'not', "aren't"],
            correctIndex: 0,
            explanationAr: 'الفاعل (We) جمع، ونفيه في المضارع التام يكون بـ haven\'t.',
          },
        ],
      },
    ],
  },

  // ==========================================
  // Lesson 2: Past Participles Table (Regular & Irregular)
  // ==========================================
  {
    id: 'grammar-u3-l2',
    unitNumber: 3,
    lessonNumber: 2,
    titleAr: 'الدرس 2: جدول تصاريف الأفعال (Past Participle of Verbs)',
    titleEn: 'Lesson 2: Verb Forms (Infinitive, Past Simple, and Past Participle)',
    subtitleAr: 'التصاريف القياسية والشاذة المقررة في منهج الأول المتوسط',
    topics: [
      {
        id: 'u3-l2-verb-forms',
        titleAr: 'أشكال التصريف الثالث للأفعال (Past Participles)',
        titleEn: 'Regular and Irregular Past Participles',
        summaryAr:
          'ينقسم التصريف الثالث (p.p) إلى نوعين: أفعال قياسية (تنتهي بـ ed مثل الماضي البسيط تماماً)، وأفعال شاذة (Irregular) يتغير شكلها ويجب حفظها عن ظهر قلب لأنها تتكرر دائماً في الامتحانات المدرسية والشهرية.',
        rules: [
          {
            id: 'rule-u3-l2-regular-vs-irregular',
            titleAr: 'الفرق بين الأفعال القياسية والشاذة',
            titleEn: 'Regular vs. Irregular Patterns',
            formula: 'Base (المصدر) -> Past Simple (الماضي البسيط) -> Past Participle (التصريف الثالث)',
            formulaNoteAr: 'الأفعال القياسية: wash -> washed -> washed | الأفعال الشاذة: go -> went -> gone',
            explanationAr:
              'الأفعال القياسية نضيف لها (ed) في كلا التصريفين الثاني والثالث. أما الأفعال الشاذة فتتغير صيغة الماضي عن التصريف الثالث في كثير من الأحيان، مثل: (eat -> ate -> eaten) و (see -> saw -> seen).',
            examples: [
              {
                en: 'She has gone to the market.',
                ar: 'لقد ذهبت إلى السوق (ذهب ولم يعد حتى الآن).',
                highlightWord: 'gone',
              },
              {
                en: 'Have you seen my glasses?',
                ar: 'هل رأيتَ نظارتي؟',
                highlightWord: 'seen',
              },
              {
                en: 'The boys have eaten all the apples.',
                ar: 'لقد أكل الأولاد كل التفاح.',
                highlightWord: 'eaten',
              },
            ],
          },
        ],
        verbTables: [
          {
            titleAr: 'جدول أهم أفعال اليونت الثالث (مصدر، ماضي، وتصريف ثالث)',
            descriptionAr: 'قائمة الأفعال المقررة في كتاب الطالب وكراس النشاط لليونت الثالث:',
            rows: [
              { base: 'wash', past: 'washed', meaningAr: 'يغسل (قياسي)', type: 'regular' },
              { base: 'clean', past: 'cleaned', meaningAr: 'ينظف (قياسي)', type: 'regular' },
              { base: 'paint', past: 'painted', meaningAr: 'يصبغ / يطلي (قياسي)', type: 'regular' },
              { base: 'tidy', past: 'tidied', meaningAr: 'يرتب (قياسي)', type: 'regular' },
              { base: 'cook', past: 'cooked', meaningAr: 'يطبخ (قياسي)', type: 'regular' },
              { base: 'sweep', past: 'swept', meaningAr: 'يكنس (شاذ: swept)', type: 'irregular' },
              { base: 'go', past: 'went', meaningAr: 'يذهب (شاذ: gone)', type: 'irregular' },
              { base: 'see', past: 'saw', meaningAr: 'يرى (شاذ: seen)', type: 'irregular' },
              { base: 'eat', past: 'ate', meaningAr: 'يأكل (شاذ: eaten)', type: 'irregular' },
              { base: 'drink', past: 'drank', meaningAr: 'يشرب (شاذ: drunk)', type: 'irregular' },
              { base: 'do', past: 'did', meaningAr: 'يفعل (شاذ: done)', type: 'irregular' },
              { base: 'write', past: 'wrote', meaningAr: 'يكتب (شاذ: written)', type: 'irregular' },
              { base: 'ride', past: 'rode', meaningAr: 'يركب (شاذ: ridden)', type: 'irregular' },
              { base: 'give', past: 'gave', meaningAr: 'يعطي (شاذ: given)', type: 'irregular' },
            ],
          },
        ],
        quiz: [
          {
            id: 'quiz-u3-l2-1',
            questionTextEn: 'What is the past participle of (ride)?',
            questionTextAr: 'ما هو التصريف الثالث للفعل (ride)؟',
            options: ['ridden', 'rode', 'riding', 'rides'],
            correctIndex: 0,
            explanationAr: 'التصريف الثالث للفعل الشاذ ride هو ridden (ride -> rode -> ridden).',
          },
          {
            id: 'quiz-u3-l2-2',
            questionTextEn: 'Ali has ... his keys on the table.',
            questionTextAr: 'علي ... مفاتيحه على الطاولة.',
            options: ['left', 'leave', 'leaving', 'leaves'],
            correctIndex: 0,
            explanationAr: 'بعد has نختار التصريف الثالث left للفعل leave.',
          },
        ],
      },
    ],
  },

  // ==========================================
  // Lesson 3: Adverbs of Manner
  // ==========================================
  {
    id: 'grammar-u3-l3',
    unitNumber: 3,
    lessonNumber: 3,
    titleAr: 'الدرس 3: ظروف الحال (Adverbs of Manner)',
    titleEn: 'Lesson 3: Adverbs of Manner (Formation, Rules & Irregular Adverbs)',
    subtitleAr: 'قواعد تحويل الصفات إلى ظروف حال لوصف طريقة وقوع الفعل',
    topics: [
      {
        id: 'u3-l3-adverbs',
        titleAr: 'ظروف الحال (Adverbs of Manner)',
        titleEn: 'Adverbs of Manner',
        summaryAr:
          'يُستخدم ظرف الحال للإجابة عن السؤال بـ (How? - كيف؟) ويصف طريقة وقوع الفعل. الصفة (Adjective) تصف الاسم، بينما ظرف الحال (Adverb) يصف الفعل ويأتي عادة بعده أو في نهاية الجملة.',
        rules: [
          {
            id: 'rule-u3-l3-formation-ly',
            titleAr: '1. إضافة (ly-) إلى معظم الصفات القياسية',
            titleEn: 'Adding -ly to Regular Adjectives',
            formula: 'Adjective + ly = Adverb of Manner',
            formulaNoteAr: 'slow -> slowly | quiet -> quietly | careful -> carefully',
            explanationAr:
              'في أغلب الحالات، نضيف الحرفين (ly) إلى نهاية الصفة لنحولها إلى ظرف حال يصف الفعل.',
            examples: [
              {
                en: 'The old man walked slowly across the street.',
                ar: 'مشى الرجل العجوز ببطء عبر الشارع.',
                highlightWord: 'slowly',
              },
              {
                en: 'She spoke quietly because the baby was sleeping.',
                ar: 'تحدثت بهدوء لأن الطفل كان نائماً.',
                highlightWord: 'quietly',
              },
              {
                en: 'He always drives carefully near schools.',
                ar: 'هو يقود دائماً بحذر بالقرب من المدارس.',
                highlightWord: 'carefully',
              },
            ],
          },
          {
            id: 'rule-u3-l3-formation-y',
            titleAr: '2. الصفات المنتهية بـ (y) مسبوق بحرف صحيح',
            titleEn: 'Adjectives Ending in Consonant + y',
            formula: 'End in -y -> replace (y) with (i) + ly -> (-ily)',
            formulaNoteAr: 'happy -> happily | easy -> easily | angry -> angrily',
            explanationAr:
              'إذا انتهت الصفة بحرف (y) وقبله حرف ساكن (صحيح)، نقلب الـ (y) إلى (i) ثم نضيف (ly).',
            examples: [
              {
                en: 'The children played happily in the garden.',
                ar: 'لعب الأطفال بسعادة ومرح في الحديقة.',
                highlightWord: 'happily',
              },
              {
                en: 'He passed the math test easily.',
                ar: 'اجتاز اختبار الرياضيات بسهولة.',
                highlightWord: 'easily',
              },
              {
                en: 'The angry man shouted angrily.',
                ar: 'صرخ الرجل الغاضب بغضب.',
                highlightWord: 'angrily',
              },
            ],
          },
          {
            id: 'rule-u3-l3-irregular-adverbs',
            titleAr: '3. ظروف الحال الشاذة (Irregular Adverbs)',
            titleEn: 'Irregular Adverbs',
            formula: 'good -> well | fast -> fast | hard -> hard',
            formulaNoteAr: 'انتبه بشدة: لا يوجد في اللغة الإنجليزية كلمة goodly أو fastly!',
            explanationAr:
              'هناك صفات شاذة لا نضيف لها (ly): الصفة (good) تتحول إلى الظرف (well)، بينما الصفات (fast, hard) تبقى كما هي بدون أي تغيير سواء كانت صفة أو ظرف.',
            examples: [
              {
                en: 'Zaid is a good player. He plays football well.',
                ar: 'زيد لاعب جيد (صفة للاعب). هو يلعب كرة القدم بشكل جيد (ظرف للفعل يلعب).',
                highlightWord: 'well',
              },
              {
                en: 'The red car was fast. The driver drove very fast.',
                ar: 'السيارة كانت سريعة. السائق قاد بسرعة كبيرة.',
                highlightWord: 'fast',
              },
            ],
          },
        ],
        examTips: [
          'إذا كان الفراغ بعد فعل حركة مثل (walk, drive, speak, run, play) ولا يوجد اسم بعده، فاختر ظرف الحال المنتهي بـ ly أو الظرف الشاذ (well / fast).',
          'إذا كان الفراغ يصف اسماً مباشراً مثل (He is a ... driver)، فاختر الصفة (careful driver).',
        ],
        quiz: [
          {
            id: 'quiz-u3-l3-1',
            questionTextEn: 'Noor is a polite girl. She always speaks ...',
            questionTextAr: 'نور فتاة مهذبة. هي تتحدث دائماً ...',
            options: ['politely', 'polite', 'politeness', 'politer'],
            correctIndex: 0,
            explanationAr: 'الفعل (speaks) يحتاج إلى ظرف حال لوصف طريقة التحدث (politely).',
          },
          {
            id: 'quiz-u3-l3-2',
            questionTextEn: 'He is a good student. He did ... in the examination.',
            questionTextAr: 'إنه طالب مجتهد. لقد أدى ... في الامتحان.',
            options: ['well', 'good', 'goodly', 'better'],
            correctIndex: 0,
            explanationAr: 'ظرف الحال من الصفة good هو الظرف الشاذ well.',
          },
          {
            id: 'quiz-u3-l3-3',
            questionTextEn: 'The tortoise moves very ...',
            questionTextAr: 'السلحفاة تتحرك ...',
            options: ['slowly', 'slow', 'slowness', 'slower'],
            correctIndex: 0,
            explanationAr: 'نصف حركة السلحفاة (moves) بظرف الحال slowly.',
          },
        ],
      },
    ],
  },
];

export const unit3GrammarUnit: GrammarUnit = {
  id: 'unit-3',
  unitNumber: 3,
  titleEn: "Unit 3: I've finished my work",
  titleAr: 'الوحدة الثالثة: لقد أنهيتُ عملي',
  descriptionAr:
    'شرح شامل لزمن المضارع التام (have/has + p.p)، جدول تصاريف الأفعال الشاذة والقياسية، وظروف الحال (Adverbs of Manner).',
  isAvailable: false,
  lessons: unit3GrammarLessons,
};
