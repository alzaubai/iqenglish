import { GrammarTopicData } from './types';

// TOPIC 8: QUESTION FORMATION & WH- QUESTIONS (أدوات الاستفهام وتكوين الأسئلة)
// =========================================================================
export const topicWhQuestions: GrammarTopicData = {
    id: 'topic-wh-questions',
    number: 8,
    titleAr: 'أدوات الاستفهام وتكوين الأسئلة',
    titleEn: 'Question Formation & Wh- Questions',
    taglineAr: 'أدوات الاستفهام وتكوين السؤال بزمن الماضي والمضارع وكينونة be',
    category: 'تكوين الأسئلة',
    badge: 'أساسي للامتحان التحريري والشفهي',
    color: 'indigo',
    summaryAr: 'تكوين الأسئلة (Wh- Questions) هو ركيزة أساسية في منهج الأول متوسط (كتاب النشاط ص 18-19 رسالة كارين وكتاب الطالب ص 5 و 9). يتعلم الطالب معاني أدوات الاستفهام وكيفية ترتيب السؤال بدقة باستخدام الفعل المساعد المناسب (did / do / does / was / were).',
    topicType: 'questions',
    questionWordsTable: [
      {
        word: 'What',
        meaningAr: 'ماذا / ما',
        usageAr: 'للسؤال عن الأشياء، الأعمال، أو الأحداث غير العاقلة',
        exampleEn: 'What did you do in the holidays?',
        exampleAr: 'ماذا فعلت في العطل؟'
      },
      {
        word: 'Where',
        meaningAr: 'أين',
        usageAr: 'للسؤال عن المكان (Place)',
        exampleEn: 'Where does Karen come from?',
        exampleAr: 'من أين تأتي كارين؟ (أستراليا)'
      },
      {
        word: 'When',
        meaningAr: 'متى',
        usageAr: 'للسؤال عن الزمان والوقت (Time)',
        exampleEn: 'When did Richard visit Iraq?',
        exampleAr: 'متى زار ريتشارد العراق؟'
      },
      {
        word: 'Who',
        meaningAr: 'مَن',
        usageAr: 'للسؤال عن الشخص العاقل أو الفاعل (Person)',
        exampleEn: 'Who is Jane?',
        exampleAr: 'مَن هي جين؟ (صديقة كارين)'
      },
      {
        word: 'Why',
        meaningAr: 'لماذا',
        usageAr: 'للسؤال عن السبب (Reason) وتكون الإجابة غالباً بـ Because',
        exampleEn: 'Why did you go to bed early?',
        exampleAr: 'لماذا ذهبت إلى النوم مبكراً؟'
      },
      {
        word: 'Which',
        meaningAr: 'أيّ / أيّهما',
        usageAr: 'للاختيار والتحديد بين بديلين أو أكثر (Choice)',
        exampleEn: 'Which photograph is your favorite?',
        exampleAr: 'أيّ صورة فوتوغرافية هي المفضلة لديك؟'
      },
      {
        word: 'How',
        meaningAr: 'كيف',
        usageAr: 'للسؤال عن الحال أو وسيلة النقل أو الكيفية (Manner / Means)',
        exampleEn: 'How did you travel to the north?',
        exampleAr: 'كيف سافرت إلى الشمال؟ (By car)'
      },
      {
        word: 'How often',
        meaningAr: 'كم مرة',
        usageAr: 'للسؤال عن عدد المرات ودرجة التكرار (مرتبط بظروف التكرار always, usually)',
        exampleEn: 'How often do you play tennis?',
        exampleAr: 'كم مرة تلعب التنس؟'
      }
    ],
    questionRules: [
      {
        titleAr: '1. تكوين السؤال في زمن الماضي البسيط (Past Simple Question)',
        ruleTitleEn: 'Question with DID (Past Simple)',
        formulaChips: [
          { text: 'Wh- Word', isHighlight: true, note: 'أداة الاستفهام' },
          { text: '+', note: '' },
          { text: 'did', isHighlight: true, note: 'فعل مساعد للماضي' },
          { text: '+', note: '' },
          { text: 'الفاعل (Subject)', note: 'مفرد أو جمع' },
          { text: '+', note: '' },
          { text: 'فعل مجرد (Base Verb)', isHighlight: true, note: 'خالٍ من أي إضافة' },
          { text: '+', note: '' },
          { text: 'تكملة الجملة + ?', note: '' }
        ],
        explanationAr: 'إذا كانت الجملة الأصلية في زمن الماضي البسيط (تحتوي على فعل ماضٍ ed أو شاذ مثل went / bought / visited)، نستخدم الفعل المساعد (did)، ويجب حتماً إرجاع الفعل الأصلي إلى أصله المجرد (infinitive) لأن did ابتلعت علامة الماضي.',
        examples: [
          {
            en: 'Where did you go in the holidays?',
            ar: 'أين ذهبت في العطل؟ (استخدمنا did ثم الفعل المجرد go بدلاً من went)',
            highlight: 'Where did you go'
          },
          {
            en: 'What did Karen send to Hala?',
            ar: 'ماذا أرسلت كارين لهالة؟ (did + Karen + send مجرد)',
            highlight: 'What did Karen send'
          },
          {
            en: 'When did they arrive in Baghdad?',
            ar: 'متى وصلوا إلى بغداد؟ (did + they + arrive مجرد)',
            highlight: 'When did they arrive'
          }
        ]
      },
      {
        titleAr: '2. تكوين السؤال في زمن المضارع البسيط (Present Simple Question)',
        ruleTitleEn: 'Question with DO / DOES (Present Simple)',
        formulaChips: [
          { text: 'Wh- Word', isHighlight: true, note: 'أداة الاستفهام' },
          { text: '+', note: '' },
          { text: 'do / does', isHighlight: true, note: 'فعل مساعد للمضارع' },
          { text: '+', note: '' },
          { text: 'الفاعل (Subject)', note: 'does للمفرد و do للجمع' },
          { text: '+', note: '' },
          { text: 'فعل مجرد (Base Verb)', isHighlight: true, note: 'بدون s الشخص الثالث' },
          { text: '+', note: '' },
          { text: 'تكملة + ?', note: '' }
        ],
        explanationAr: 'في المضارع البسيط:\n• نستخدم (does) إذا كان الفاعل مفرداً (he / she / it / اسم مفرد مثل Karen)، مع حذف حرف s الشخص الثالث من الفعل ليعود مجرداً.\n• نستخدم (do) إذا كان الفاعل جمعاً أو ضمير متكلم (they / we / you / I).',
        examples: [
          {
            en: 'Where does Karen live?',
            ar: 'أين تعيش كارين؟ (does + Karen + live بدون s)',
            highlight: 'Where does Karen live'
          },
          {
            en: 'What do you do in the evening?',
            ar: 'ماذا تفعل في المساء؟ (do + you + do مجرد)',
            highlight: 'What do you do'
          },
          {
            en: 'How often does Ahmed visit the museum?',
            ar: 'كم مرة يزور أحمد المتحف؟ (does + Ahmed + visit مجرد)',
            highlight: 'does Ahmed visit'
          }
        ]
      },
      {
        titleAr: '3. تكوين السؤال مع أفعال الكينونة (Verb to Be: was / were / is / are)',
        ruleTitleEn: 'Question with Verb to BE',
        formulaChips: [
          { text: 'Wh- Word', isHighlight: true, note: 'أداة الاستفهام' },
          { text: '+', note: '' },
          { text: 'was / were / is / are', isHighlight: true, note: 'فعل الكينونة' },
          { text: '+', note: '' },
          { text: 'الفاعل (Subject)', note: '' },
          { text: '+', note: '' },
          { text: 'تكملة + ?', note: '' }
        ],
        explanationAr: 'إذا كانت الجملة الأصلية تحتوي على فعل كينونة أساسي (was / were / is / are)، فنحن لا نحتاج مطلقاً لفعل مساعد خارجي مثل did أو do! نقوم فقط بتقديم فعل الكينونة ليأتي مباشرة بعد أداة الاستفهام وقبل الفاعل.',
        examples: [
          {
            en: 'Where were you yesterday?',
            ar: 'أين كنت البارحة؟ (were تقدمت على you مباشرة دون did)',
            highlight: 'Where were you'
          },
          {
            en: 'Who was with you in the park?',
            ar: 'مَن كان معك في المتنزه؟',
            highlight: 'Who was with you'
          },
          {
            en: 'What is your favorite hobby?',
            ar: 'ما هي هوايتك المفضلة؟',
            highlight: 'What is your'
          }
        ]
      },
      {
        titleAr: '4. السؤال عن الفاعل العاقل باستخدام (Who as Subject)',
        ruleTitleEn: 'Who as Subject (No Auxiliary Verb)',
        formulaChips: [
          { text: 'Who', isHighlight: true, note: 'مَن (للفاعل العاقل)' },
          { text: '+', note: '' },
          { text: 'الفعل كما هو (ماضٍ أو مضارع)', isHighlight: true, note: 'بدون فعل مساعد!' },
          { text: '+', note: '' },
          { text: 'تكملة الجملة + ?', note: '' }
        ],
        explanationAr: 'ملاحظة امتحانية ذكية ومهمة جداً: عندما نسأل عن الفاعل العاقل في بداية الجملة بواسطة (Who)، نقوم فقط بحذف اسم الفاعل ووضع (Who) مكانه دون أي تغيير في زمن الفعل ودون استخدام did أو does!',
        examples: [
          {
            en: 'Who visited Richard?',
            ar: 'مَن زار ريتشارد؟ (الجواب: Ali visited Richard - استبدلنا Ali بـ Who مباشرة)',
            highlight: 'Who visited Richard'
          },
          {
            en: 'Who sent the letter?',
            ar: 'مَن أرسل الرسالة؟ (Karen sent the letter)',
            highlight: 'Who sent the letter'
          }
        ]
      }
    ],
    questionApplications: [
      {
        id: 'wh-app-1',
        instructionAr: 'كوّن سؤالاً عن الجزء الذي تحته خط في زمن الماضي البسيط:',
        problemEn: 'Richard went to the market yesterday. (Ask: Where...?)',
        solutionEn: 'Where did Richard go yesterday?',
        noteAr: 'استخدمنا Where للسؤال عن المكان، واستخدمنا did لأن زمن الجملة ماضي (went)، ثم أرجعنا الفعل إلى أصله المجرد (go) وحذفنا جواب المكان (to the market).',
        dissection: [
          { label: 'الفاعل (Subject)', value: 'Richard ➔ فاعل الجملة', color: 'blue' },
          { label: 'الفعل الأصلي', value: 'went ➔ ماضي شاذ (أصله go)', color: 'purple' },
          { label: 'المطلوب السؤال عنه', value: 'to the market ➔ مكان (Where)', color: 'amber' },
          { label: 'دلالة الزمن', value: 'yesterday ➔ البارحة (توضع في نهاية السؤال)', color: 'zinc' }
        ],
        cumulativeSteps: [
          {
            stepNumber: 1,
            titleAr: 'تحديد أداة الاستفهام المناسبة',
            explanationAr: 'بما أن المراد السؤال عنه هو مكان الذهاب (to the market)، نختار أداة المكان (Where) ونضعها في البداية.',
            sentenceProgress: 'Where'
          },
          {
            stepNumber: 2,
            titleAr: 'إضافة الفعل المساعد لزمن الماضي',
            explanationAr: 'الفعل (went) في الماضي البسيط، لذا نضع الفعل المساعد (did) مباشرة بعد أداة الاستفهام.',
            sentenceProgress: 'Where did'
          },
          {
            stepNumber: 3,
            titleAr: 'إنزال الفاعل',
            explanationAr: 'نكتب فاعل الجملة (Richard) بعد الفعل المساعد.',
            sentenceProgress: 'Where did Richard'
          },
          {
            stepNumber: 4,
            titleAr: 'تجريد الفعل الماضي وحذف الجواب',
            explanationAr: 'نرجع الفعل الماضي (went) إلى صيغة المصدر المجرد (go)، ونحذف عبارة المكان (to the market) لأنها الجواب، وننزل كلمة الزمان (yesterday) ثم نضع علامة الاستفهام (?).',
            sentenceProgress: 'Where did Richard go yesterday?'
          }
        ]
      },
      {
        id: 'wh-app-2',
        instructionAr: 'كوّن سؤالاً عن المكان باستخدام مضارع بسيط (does):',
        problemEn: 'Karen comes from Australia. (Make a question with: Where)',
        solutionEn: 'Where does Karen come from?',
        noteAr: 'الفاعل مفرد (Karen) والفعل ينتهي بـ s الشخص الثالث (comes)، لذا نضع does ونحذف حرف s من الفعل ليصبح come مجرداً، ونحذف جواب المكان (Australia).',
        dissection: [
          { label: 'الفاعل (Subject)', value: 'Karen ➔ فاعل مفرد مؤنث (She)', color: 'blue' },
          { label: 'الفعل الأصلي', value: 'comes ➔ مضارع بسيط فيه s الشخص الثالث', color: 'purple' },
          { label: 'المطلوب السؤال عنه', value: 'Australia ➔ المكان/البلد الأصلي (Where)', color: 'amber' },
          { label: 'حرف الجر المصاحب', value: 'from ➔ يبقى في نهاية السؤال', color: 'zinc' }
        ],
        cumulativeSteps: [
          {
            stepNumber: 1,
            titleAr: 'بدء السؤال بأداة المكان',
            explanationAr: 'نبدأ السؤال بأداة الاستفهام المخصصة للبلد والمكان وهي (Where).',
            sentenceProgress: 'Where'
          },
          {
            stepNumber: 2,
            titleAr: 'اختيار الفعل المساعد المناسب للمفرد',
            explanationAr: 'الفاعل Karen مفرد والفعل مضارع (comes)، إذن نستخدم الفعل المساعد (does).',
            sentenceProgress: 'Where does'
          },
          {
            stepNumber: 3,
            titleAr: 'وضع الفاعل',
            explanationAr: 'نضع الفاعل (Karen) بعد الفعل المساعد does.',
            sentenceProgress: 'Where does Karen'
          },
          {
            stepNumber: 4,
            titleAr: 'تجريد الفعل وحذف جواب البلد',
            explanationAr: 'نحذف s من comes ليعود الفعل مجرداً (come)، ونحتفظ بحرف الجر (from)، ونحذف البلد (Australia) ونختم بعلامة (?).',
            sentenceProgress: 'Where does Karen come from?'
          }
        ]
      },
      {
        id: 'wh-app-3',
        instructionAr: 'كوّن سؤالاً يحتوي على فعل الكينونة was / were:',
        problemEn: 'I was in Erbil during the holidays. (Make a question with: Where)',
        solutionEn: 'Where were you during the holidays?',
        noteAr: 'انتبه: الضمير I في الجواب يتحول إلى you في السؤال، وفعل الكينونة was يتحول تبعاً لذلك إلى were. لا نستخدم did لأن فعل الكينونة يتقدم بنفسه!',
        dissection: [
          { label: 'الفاعل الأصلي', value: 'I ➔ يتحول في السؤال إلى المخاطب (you)', color: 'blue' },
          { label: 'فعل الكينونة', value: 'was ➔ يتحول مع you إلى (were)', color: 'purple' },
          { label: 'المكان المسؤول عنه', value: 'in Erbil ➔ يُحذف من السؤال لأنه الجواب', color: 'amber' },
          { label: 'التكملة الزمنية', value: 'during the holidays ➔ أثناء العطلة', color: 'zinc' }
        ],
        cumulativeSteps: [
          {
            stepNumber: 1,
            titleAr: 'وضع أداة المكان',
            explanationAr: 'نضع أداة المكان (Where) في بداية السؤال.',
            sentenceProgress: 'Where'
          },
          {
            stepNumber: 2,
            titleAr: 'تحويل فعل الكينونة وتقديمه',
            explanationAr: 'نحول الضمير I إلى you، وبما أن you تأخذ were، نقدم were مباشرة بعد أداة الاستفهام.',
            sentenceProgress: 'Where were'
          },
          {
            stepNumber: 3,
            titleAr: 'وضع ضمير المخاطب you',
            explanationAr: 'نكتب الفاعل (you) بعد فعل الكينونة were.',
            sentenceProgress: 'Where were you'
          },
          {
            stepNumber: 4,
            titleAr: 'إكمال السؤال بعلامة الاستفهام',
            explanationAr: 'نحذف جواب المكان (in Erbil)، ونكمل بـ (during the holidays) ثم نضع علامة (?).',
            sentenceProgress: 'Where were you during the holidays?'
          }
        ]
      },
      {
        id: 'wh-app-4',
        instructionAr: 'كوّن سؤالاً عن الفاعل العاقل في بداية الجملة:',
        problemEn: 'Hala received a letter from Karen. (Ask about the subject with: Who)',
        solutionEn: 'Who received a letter from Karen?',
        noteAr: 'عند السؤال عن الفاعل العاقل (Hala)، نستبدل الفاعل مباشرة بـ (Who) ويبقى باقي الكلام والفعل الماضي (received) كما هو دون إضافة did!',
        dissection: [
          { label: 'الفاعل العاقل', value: 'Hala ➔ مستلمة الرسالة (نستبدلها بـ Who)', color: 'blue' },
          { label: 'فعل الجملة', value: 'received ➔ فعل ماضٍ قياسي (يبقى كما هو)', color: 'purple' },
          { label: 'المفعول به', value: 'a letter ➔ رسالة', color: 'amber' },
          { label: 'التكملة', value: 'from Karen ➔ من كارين', color: 'zinc' }
        ],
        cumulativeSteps: [
          {
            stepNumber: 1,
            titleAr: 'استبدال الفاعل بأداة Who',
            explanationAr: 'نحذف الفاعل العاقل (Hala) ونكتب (Who) مكانه مباشرة في بداية السؤال.',
            sentenceProgress: 'Who'
          },
          {
            stepNumber: 2,
            titleAr: 'إبقاء الفعل وبقية الجملة كما هي',
            explanationAr: 'لا نضع أي فعل مساعد (did) إطلاقاً، بل ننزل الفعل (received) وبقية الجملة كاملة.',
            sentenceProgress: 'Who received a letter from Karen'
          },
          {
            stepNumber: 3,
            titleAr: 'وضع علامة الاستفهام',
            explanationAr: 'نختم السؤال بعلامة الاستفهام (?).',
            sentenceProgress: 'Who received a letter from Karen?'
          }
        ]
      }
    ],
    examPractice: [
      {
        id: 'wh-q1',
        type: 'choice',
        questionEn: 'Where ______ you go yesterday?',
        questionAr: 'اختر الفعل المساعد الصحيح لزمن الماضي البسيط بوجود كلمة yesterday:',
        options: ['did', 'do', 'does', 'are'],
        correctAnswer: 'did',
        explanationAr: 'جملة السؤال تحتوي على ظرف الماضي البسيط (yesterday) وفعل مجرد (go)، لذا يجب اختيار الفعل المساعد (did).'
      },
      {
        id: 'wh-q2',
        type: 'correct',
        questionEn: 'What did they (bought) in the mall? (Correct the verb)',
        questionAr: 'صحح صيغة الفعل بين القوسين بعد وجود did في السؤال:',
        options: ['buy', 'buying', 'buys'],
        correctAnswer: 'buy',
        explanationAr: 'بعد الفعل المساعد (did) في السؤال، يجب أن يكون الفعل دائماً في صيغة المصدر المجرد الخالي من أي إضافة، ومجرد bought هو (buy).'
      },
      {
        id: 'wh-q3',
        type: 'choice',
        questionEn: '______ does Karen come from? — She comes from Australia.',
        questionAr: 'اختر أداة الاستفهام المناسبة للسؤال عن البلد والمكان (Australia):',
        options: ['Where', 'When', 'Who', 'What'],
        correctAnswer: 'Where',
        explanationAr: 'الجواب (Australia) اسم مكان وبلد، والأداة المناسبة للسؤال عن المكان هي (Where).'
      },
      {
        id: 'wh-q4',
        type: 'choice',
        questionEn: 'Where ______ Karen live?',
        questionAr: 'اختر الفعل المساعد المناسب للفاعل المفرد (Karen) في المضارع البسيط:',
        options: ['does', 'do', 'did', 'is'],
        correctAnswer: 'does',
        explanationAr: 'الفاعل مفرد (Karen) والفعل مجرد (live)، لذا نستخدم الفعل المساعد (does) في زمن المضارع البسيط.'
      },
      {
        id: 'wh-q5',
        type: 'choice',
        questionEn: '______ took this photograph? — Faisal took it.',
        questionAr: 'اختر أداة الاستفهام المناسبة للسؤال عن الفاعل العاقل (Faisal):',
        options: ['Who', 'What', 'Where', 'Why'],
        correctAnswer: 'Who',
        explanationAr: 'الجواب (Faisal) هو فاعل عاقل، وأداة السؤال عن العاقل هي (Who).'
      },
      {
        id: 'wh-q6',
        type: 'choice',
        questionEn: 'Where ______ you last night? — I was at home.',
        questionAr: 'اختر فعل الكينونة المناسب للضمير you في الماضي:',
        options: ['were', 'was', 'did', 'are'],
        correctAnswer: 'were',
        explanationAr: 'الفاعل في السؤال هو (you) وفي الماضي يأخذ (were). لا نستخدم did لأن الجملة جملة كينونة خالية من فعل رئيسي مجرد.'
      }
    ]
  };
