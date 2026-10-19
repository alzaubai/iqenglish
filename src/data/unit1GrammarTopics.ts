export interface TopicExample {
  en: string;
  ar: string;
  highlight?: string;
  note?: string;
}

export interface ExamSentencePart {
  label: string;
  value: string;
  color?: 'blue' | 'purple' | 'amber' | 'emerald' | 'rose' | 'zinc';
}

export interface ExamSolutionToken {
  text: string;
  isChanged?: boolean;
}

export interface CumulativeStep {
  stepNumber: number;
  titleAr: string;
  explanationAr: string;
  sentenceProgress: string;
  highlightToken?: string;
}

export interface ExamApplicationItem {
  id: string;
  problemEn: string;
  instructionAr: string;
  solutionEn: string;
  solutionTokens?: ExamSolutionToken[];
  dissection?: ExamSentencePart[];
  cumulativeSteps?: CumulativeStep[];
  actionStepAr?: string;
  noteAr: string;
}

export interface TextbookVerb {
  base: string;
  past: string;
  ar: string;
  type: 'regular' | 'irregular';
  note?: string;
}

export interface ExamPracticeItem {
  id: string;
  type: 'choice' | 'correct' | 'transform';
  questionEn: string;
  questionAr: string;
  options?: string[];
  correctAnswer: string;
  explanationAr: string;
}

export interface GrammarTopicData {
  id: string;
  number: number;
  titleAr: string;
  titleEn: string;
  taglineAr: string;
  category: string;
  badge: string;
  color: 'blue' | 'emerald' | 'purple' | 'amber' | 'teal';
  summaryAr: string;
  // Specific sections depending on topic type
  topicType: 'tense' | 'pronouns' | 'connectors' | 'interests';
  
  // Overview for tenses (usage, time markers, spelling, verbs)
  overview?: {
    usageTitleAr: string;
    usageDescAr: string;
    quickNoteAr?: string;
    spellingTitleAr?: string;
    spellingSubtitleAr?: string;
    timeMarkers: { marker: string; ar: string; exampleEn: string }[];
    spellingRules: { titleAr: string; descAr: string; examples: { base: string; changed: string; ar: string }[] }[];
    textbookVerbs: TextbookVerb[];
  };

  // For tenses (Past Simple / Past Continuous)
  timeMarkers?: string[];
  affirmative?: {
    formulaChips: { text: string; isHighlight?: boolean; note?: string }[];
    explanationAr: string;
    examples: TopicExample[];
    examApplications?: ExamApplicationItem[];
  };
  negative?: {
    formulaChips: { text: string; isHighlight?: boolean; note?: string }[];
    explanationAr: string;
    warningAr?: string;
    examples: TopicExample[];
    examApplications?: ExamApplicationItem[];
  };
  question?: {
    formulaChips: { text: string; isHighlight?: boolean; note?: string }[];
    explanationAr: string;
    examples: TopicExample[];
    examApplications?: ExamApplicationItem[];
  };
  spellingNotes?: {
    titleAr: string;
    rules: { titleAr: string; descAr: string; examples: { base: string; changed: string; ar: string }[] }[];
  };

  // For Possessive Pronouns
  pronounsTable?: {
    subject: string;
    adjective?: string;
    possessive: string;
    ar: string;
    exampleEn: string;
    exampleAr: string;
  }[];
  pronounRules?: {
    titleAr: string;
    descAr: string;
    examples: TopicExample[];
  }[];
  pronounApplications?: ExamApplicationItem[];

  // For Connectors (and, but, or)
  connectorsList?: {
    name: string;
    meaningAr: string;
    functionAr: string;
    examples: TopicExample[];
  }[];

  // For Interests (like, love, enjoy, interested in)
  interestsSections?: {
    titleAr: string;
    formulaChips: { text: string; isHighlight?: boolean; note?: string }[];
    explanationAr: string;
    examples: TopicExample[];
  }[];

  // 1st Intermediate Monthly Exam Practice (NOT ministerial!)
  examPractice: ExamPracticeItem[];
}

export const unit1GrammarTopicsList: GrammarTopicData[] = [
  // =========================================================================
  // TOPIC 1: PAST SIMPLE (الماضي البسيط)
  // =========================================================================
  {
    id: 'topic-past-simple',
    number: 1,
    titleAr: 'الماضي البسيط',
    titleEn: 'Past Simple Tense',
    taglineAr: 'التعبير عن حدث حصل في الماضي وانتهى تماماً',
    category: 'الأزمنة',
    badge: 'أساسي للامتحان',
    color: 'blue',
    summaryAr: 'نستخدم زمن الماضي البسيط للتحدث عن فعل حدث وانتهى في الماضي، ونستدل عليه بوجود ظروف زمان محددة مثل (yesterday, last, ago).',
    topicType: 'tense',
    overview: {
      usageTitleAr: 'متى ولماذا نستخدم زمن الماضي البسيط؟',
      usageDescAr: 'نستخدم زمن الماضي البسيط للتعبير عن حدث أو فعل حصل في الماضي وانتهى تماماً في وقت محدد.',
      timeMarkers: [
        { marker: 'yesterday', ar: 'أمس / البارحة', exampleEn: 'Ali played football yesterday.' },
        { marker: 'last (night / week / year)', ar: 'الماضي: الليلة الماضية / الأسبوع الماضي / العام الماضي', exampleEn: 'He went to the mall last night.' },
        { marker: 'ago', ar: 'مضت (تأتي بعد المدة الزمنية: two days ago)', exampleEn: 'They visited the museum two days ago.' },
      ],
      spellingRules: [
        {
          titleAr: '1. القاعدة العامة',
          descAr: 'نضيف ed لنهاية معظم الأفعال الاعتيادية مباشرة:',
          examples: [
            { base: 'play', changed: 'played', ar: 'لعب' },
            { base: 'work', changed: 'worked', ar: 'عمل' },
            { base: 'visit', changed: 'visited', ar: 'زار' },
            { base: 'watch', changed: 'watched', ar: 'شاهد' },
          ],
        },
        {
          titleAr: '2. الفعل المنتهي بحرف e',
          descAr: 'إذا انتهى الفعل الأصلي بالحرف e، نضيف له d فقط:',
          examples: [
            { base: 'like', changed: 'liked', ar: 'أحب' },
            { base: 'live', changed: 'lived', ar: 'عاش' },
          ],
        },
        {
          titleAr: '3. مضاعفة الحرف الصحيح الأخير',
          descAr: 'إذا انتهى الفعل بحرف صحيح مسبوق بحرف علة واحد، نكرر الحرف الصحيح ونضيف ed:',
          examples: [
            { base: 'stop', changed: 'stopped', ar: 'توقف' },
            { base: 'fit', changed: 'fitted', ar: 'ناسب' },
          ],
        },
        {
          titleAr: '4. الفعل المنتهي بحرف y مسبوق بحرف صحيح',
          descAr: 'إذا انتهى الفعل بـ y وقبله حرف صحيح، نقلب y إلى i ونضيف ed (أما إذا قبله علة مثل play فيبقى كما هو):',
          examples: [
            { base: 'study', changed: 'studied', ar: 'درس' },
            { base: 'try', changed: 'tried', ar: 'حاول' },
          ],
        },
      ],
      textbookVerbs: [
        // Regular Verbs (الأفعال القياسية)
        { base: 'play', past: 'played', ar: 'يلعب / لعب', type: 'regular', note: 'كتاب الطالب ص 4' },
        { base: 'work', past: 'worked', ar: 'يعمل / عمل', type: 'regular', note: 'كتاب النشاط ص 3' },
        { base: 'visit', past: 'visited', ar: 'يزور / زار', type: 'regular', note: 'كتاب النشاط ص 6' },
        { base: 'stay', past: 'stayed', ar: 'يبقى أو يقيم / بقي', type: 'regular', note: 'كتاب الطالب ص 5' },
        { base: 'watch', past: 'watched', ar: 'يشاهد / شاهد', type: 'regular', note: 'كتاب النشاط ص 4' },
        { base: 'talk', past: 'talked', ar: 'يتحدث / تحدث', type: 'regular', note: 'كتاب الطالب ص 6' },
        { base: 'listen', past: 'listened', ar: 'يستمع / استمع', type: 'regular', note: 'كتاب الطالب ص 97' },
        { base: 'help', past: 'helped', ar: 'يساعد / ساعد', type: 'regular', note: 'كتاب الطالب ص 97' },
        { base: 'cook', past: 'cooked', ar: 'يطبخ / طبخ', type: 'regular', note: 'كتاب الطالب ص 5' },
        { base: 'stop', past: 'stopped', ar: 'يتوقف / توقف', type: 'regular', note: 'كتاب الطالب ص 97' },
        { base: 'like', past: 'liked', ar: 'يحب / أحب', type: 'regular', note: 'كتاب الطالب ص 6' },
        { base: 'try', past: 'tried', ar: 'يحاول / حاول', type: 'regular', note: 'كتاب الطالب ص 97' },

        // Irregular Verbs (الأفعال الشاذة)
        { base: 'go', past: 'went', ar: 'يذهب / ذهب', type: 'irregular', note: 'كتاب الطالب ص 5' },
        { base: 'see', past: 'saw', ar: 'يرى / رأى', type: 'irregular', note: 'كتاب الطالب ص 5' },
        { base: 'make', past: 'made', ar: 'يصنع / صنع', type: 'irregular', note: 'كتاب الطالب ص 5' },
        { base: 'take', past: 'took', ar: 'يأخذ / أخذ', type: 'irregular', note: 'كتاب الطالب ص 6' },
        { base: 'have / has', past: 'had', ar: 'يملك أو تناول / ملك', type: 'irregular', note: 'كتاب الطالب ص 6' },
        { base: 'do / does', past: 'did', ar: 'يفعل / فعل', type: 'irregular', note: 'كتاب النشاط ص 3' },
        { base: 'get', past: 'got', ar: 'يحصل أو يستيقظ / حصل', type: 'irregular', note: 'got up late ص 5' },
        { base: 'read', past: 'read (تلفظ red)', ar: 'يقرأ / قرأ', type: 'irregular', note: 'كتاب الطالب ص 5' },
        { base: 'write', past: 'wrote', ar: 'يكتب / كتب', type: 'irregular', note: 'كتاب النشاط ص 5' },
        { base: 'swim', past: 'swam', ar: 'يسبح / سبح', type: 'irregular', note: 'كتاب النشاط ص 3' },
        { base: 'buy', past: 'bought', ar: 'يشتري / اشترى', type: 'irregular', note: 'كتاب النشاط ص 7' },
        { base: 'come', past: 'came', ar: 'يأتي / جاء', type: 'irregular', note: 'كتاب الطالب ص 6' },
        { base: 'am / is', past: 'was', ar: 'يكون / كان (للمفرد)', type: 'irregular', note: 'كتاب الطالب ص 6' },
        { base: 'are', past: 'were', ar: 'يكونون / كانوا (للجمع)', type: 'irregular', note: 'كتاب الطالب ص 6' },
      ],
    },
    affirmative: {
      formulaChips: [
        { text: 'الفاعل (Subject)' },
        { text: '+', note: 'مباشرة' },
        { text: 'فعل ماضٍ (Past Verb)', isHighlight: true, note: 'ed أو شاذ' },
        { text: '+', note: '' },
        { text: 'التكملة (Complement)' },
      ],
      explanationAr: 'في حالة الإثبات، يأتي الفاعل أولاً ويليه مباشرة الفعل في صيغة الماضي (قياسي مضاف له ed أو شاذ محفوظ غيباً) مع وجود دلالة زمنية واضحة.',
      examples: [
        { en: 'Ali played football yesterday.', ar: 'لعب علي كرة القدم البارحة. (فعل قياسي: play ➔ played)', highlight: 'played' },
        { en: 'He went to the mall last night.', ar: 'هو ذهب إلى المركز التجاري الليلة الماضية. (فعل شاذ: go ➔ went)', highlight: 'went' },
        { en: 'Omar worked hard yesterday.', ar: 'عمر عمل بجد البارحة. (فعل قياسي: work ➔ worked)', highlight: 'worked' },
        { en: 'The boys visited the museum two days ago.', ar: 'زار الأولاد المتحف قبل يومين. (فعل قياسي: visit ➔ visited)', highlight: 'visited' },
      ],
      examApplications: [
        {
          id: 'app-aff-1',
          problemEn: 'Ali (play) football yesterday. (correct)',
          instructionAr: 'صحح الفعل بين القوسين بوجود دلالة الماضي yesterday:',
          solutionEn: 'Ali played football yesterday.',
          solutionTokens: [
            { text: 'Ali' },
            { text: 'played', isChanged: true },
            { text: 'football' },
            { text: 'yesterday.' },
          ],
          dissection: [
            { label: 'الفاعل (Subject)', value: 'Ali ➔ اسم مفرد مذكر (ضميره He)', color: 'blue' },
            { label: 'المطلوب بين القوسين', value: '(play) ➔ فعل قياسي بين القوسين مطلوب تصحيحه', color: 'purple' },
            { label: 'دلالة الزمن (كلمة السر)', value: 'yesterday ➔ البارحة (تدلنا على زمن الماضي البسيط)', color: 'amber' },
            { label: 'التكملة / المفعول به', value: 'football ➔ كرة القدم', color: 'zinc' },
          ],
          cumulativeSteps: [
            {
              stepNumber: 1,
              titleAr: 'الخطوة 1: ننزل الفاعل في البداية',
              explanationAr: 'الفاعل في الجملة هو Ali (اسم مفرد مذكر - ضميره He)، ننزله في بداية الجملة كما هو.',
              sentenceProgress: 'Ali ...',
              highlightToken: 'Ali',
            },
            {
              stepNumber: 2,
              titleAr: 'الخطوة 2: نصحح الفعل بين القوسين (play ➔ played)',
              explanationAr: 'لوجود دلالة الماضي yesterday، نحوّل الفعل القياسي play إلى الماضي بإضافة ed فيصبح played.',
              sentenceProgress: 'Ali played ...',
              highlightToken: 'played',
            },
            {
              stepNumber: 3,
              titleAr: 'الخطوة 3: ننزل التكملة ودلالة الزمن ونختم بنقطة',
              explanationAr: 'ننزل المفعول به football ودلالة الزمن yesterday كما هي بدون أي تغيير.',
              sentenceProgress: 'Ali played football yesterday.',
              highlightToken: 'played',
            },
          ],
          actionStepAr: 'بما أن الجملة مثبتة في الماضي والفعل play قياسي، نضيف له ed فيصبح (played).',
          noteAr: 'لوجود دلالة الماضي (yesterday)، نحوّل الفعل بين القوسين play إلى الماضي بإضافة ed ليصبح (played).',
        },
        {
          id: 'app-aff-2',
          problemEn: 'He (go) to the mall last night. (past simple)',
          instructionAr: 'ضع الفعل بصيغة الماضي البسيط:',
          solutionEn: 'He went to the mall last night.',
          solutionTokens: [
            { text: 'He' },
            { text: 'went', isChanged: true },
            { text: 'to the mall' },
            { text: 'last night.' },
          ],
          dissection: [
            { label: 'الفاعل (Subject)', value: 'He ➔ فاعل مفرد (هو)', color: 'blue' },
            { label: 'المطلوب بين القوسين', value: '(go) ➔ فعل شاذ يحفظ غيباً (لا يقبل ed أبداً)', color: 'purple' },
            { label: 'دلالة الزمن (كلمة السر)', value: 'last night ➔ الليلة الماضية (ماضي بسيط)', color: 'amber' },
            { label: 'التكملة', value: 'to the mall ➔ إلى المركز التجاري', color: 'zinc' },
          ],
          cumulativeSteps: [
            {
              stepNumber: 1,
              titleAr: 'الخطوة 1: ننزل الفاعل في البداية',
              explanationAr: 'الفاعل هو الضمير He (هو)، ننزله أول كلمة في الجملة.',
              sentenceProgress: 'He ...',
              highlightToken: 'He',
            },
            {
              stepNumber: 2,
              titleAr: 'الخطوة 2: تحويل الفعل الشاذ (go ➔ went)',
              explanationAr: 'المطلب past simple وبوجود last night، الفعل go شاذ وماضيه هو went (لا يقبل ed نهائياً!).',
              sentenceProgress: 'He went ...',
              highlightToken: 'went',
            },
            {
              stepNumber: 3,
              titleAr: 'الخطوة 3: ننزل التكملة ودلالة الزمن ونختم بنقطة',
              explanationAr: 'ننزل to the mall last night كما هي ونضع نقطة.',
              sentenceProgress: 'He went to the mall last night.',
              highlightToken: 'went',
            },
          ],
          actionStepAr: 'المطلب past simple والفعل go شاذ وماضيه هو went.',
          noteAr: 'المطلب past simple وبوجود دلالة (last night)، الفعل go شاذ وماضيه هو (went).',
        },
        {
          id: 'app-aff-3',
          problemEn: 'The boys (visit) the museum two days ago. (correct the verb)',
          instructionAr: 'صحح الفعل بين القوسين بوجود دلالة ago:',
          solutionEn: 'The boys visited the museum two days ago.',
          solutionTokens: [
            { text: 'The boys' },
            { text: 'visited', isChanged: true },
            { text: 'the museum' },
            { text: 'two days ago.' },
          ],
          dissection: [
            { label: 'الفاعل (Subject)', value: 'The boys ➔ فاعل جمع (الأولاد - ضميرهم They)', color: 'blue' },
            { label: 'المطلوب بين القوسين', value: '(visit) ➔ فعل قياسي اعتيادي', color: 'purple' },
            { label: 'دلالة الزمن (كلمة السر)', value: 'two days ago ➔ قبل يومين (ماضي بسيط)', color: 'amber' },
            { label: 'التكملة', value: 'the museum ➔ المتحف', color: 'zinc' },
          ],
          cumulativeSteps: [
            {
              stepNumber: 1,
              titleAr: 'الخطوة 1: ننزل الفاعل الجمع',
              explanationAr: 'الفاعل هو The boys (الأولاد - جمع ضميرهم They)، ننزله في البداية.',
              sentenceProgress: 'The boys ...',
              highlightToken: 'The boys',
            },
            {
              stepNumber: 2,
              titleAr: 'الخطوة 2: تصحيح الفعل القياسي (visit ➔ visited)',
              explanationAr: 'بوجود دلالة ago، نحول الفعل القياسي visit للماضي بإضافة ed ليصبح visited.',
              sentenceProgress: 'The boys visited ...',
              highlightToken: 'visited',
            },
            {
              stepNumber: 3,
              titleAr: 'الخطوة 3: إنزال التكملة ودلالة الزمن',
              explanationAr: 'ننزل the museum two days ago ونختم بنقطة.',
              sentenceProgress: 'The boys visited the museum two days ago.',
              highlightToken: 'visited',
            },
          ],
          actionStepAr: 'لوجود دلالة ago، نصحح الفعل القياسي visit بإضافة ed ليصبح (visited).',
          noteAr: 'لوجود دلالة (ago)، نصحح الفعل القياسي visit بإضافة ed ليصبح (visited).',
        },
        {
          id: 'app-aff-4',
          problemEn: 'Sara (make) a cake yesterday. (past simple)',
          instructionAr: 'ضع الفعل بصيغة الماضي البسيط:',
          solutionEn: 'Sara made a cake yesterday.',
          solutionTokens: [
            { text: 'Sara' },
            { text: 'made', isChanged: true },
            { text: 'a cake' },
            { text: 'yesterday.' },
          ],
          dissection: [
            { label: 'الفاعل (Subject)', value: 'Sara ➔ فاعل مفرد مؤنث (ضميرها She)', color: 'blue' },
            { label: 'المطلوب بين القوسين', value: '(make) ➔ فعل شاذ يتغير شكله في الماضي', color: 'purple' },
            { label: 'دلالة الزمن (كلمة السر)', value: 'yesterday ➔ البارحة (ماضي بسيط)', color: 'amber' },
            { label: 'التكملة', value: 'a cake ➔ كعكة', color: 'zinc' },
          ],
          cumulativeSteps: [
            {
              stepNumber: 1,
              titleAr: 'الخطوة 1: ننزل الفاعل',
              explanationAr: 'الفاعل هو Sara (مفرد مؤنث)، ينزل أولاً.',
              sentenceProgress: 'Sara ...',
              highlightToken: 'Sara',
            },
            {
              stepNumber: 2,
              titleAr: 'الخطوة 2: تحويل الفعل الشاذ (make ➔ made)',
              explanationAr: 'المطلب past simple والفعل make شاذ وماضيه made وليس maked.',
              sentenceProgress: 'Sara made ...',
              highlightToken: 'made',
            },
            {
              stepNumber: 3,
              titleAr: 'الخطوة 3: إنزال التكملة ودلالة الزمن',
              explanationAr: 'ننزل a cake yesterday ونختم بنقطة.',
              sentenceProgress: 'Sara made a cake yesterday.',
              highlightToken: 'made',
            },
          ],
          actionStepAr: 'المطلب past simple والفعل make شاذ وماضيه made.',
          noteAr: 'الفعل (make) شاذ وماضيه (made) وتدل عليه كلمة (yesterday).',
        },
      ],
    },
    negative: {
      formulaChips: [
        { text: 'الفاعل (Subject)' },
        { text: '+', note: '' },
        { text: "didn't (did not)", isHighlight: true, note: 'أداة النفي' },
        { text: '+', note: '' },
        { text: 'فعل مجرد (Base Verb)', isHighlight: true, note: 'خالٍ من أي إضافة' },
        { text: '+', note: '' },
        { text: 'التكملة' },
      ],
      explanationAr: 'عند نفي جملة الماضي البسيط، نضع الفعل المساعد المنفي (didn\'t) بعد الفاعل، ثم نرجع الفعل الماضي إلى أصله (فعل مجرد خالٍ من أي إضافة).',
      warningAr: 'انتبه يا بطل: إياك أن تبقي الفعل بالماضي بعد didn\'t! نرجع الفعل لأصله (مثلاً didn\'t go وليس didn\'t went، و didn\'t work وليس didn\'t worked).',
      examples: [
        { en: 'He did not work hard yesterday.', ar: 'هو لم يعمل بجد البارحة. (worked رجع لأصله work)', highlight: 'did not work' },
        { en: 'Ali didn\'t go to the market last week.', ar: 'علي لم يذهب إلى السوق الأسبوع الماضي. (went رجع لأصله go)', highlight: "didn't go" },
        { en: 'The student didn\'t swim in the pool yesterday.', ar: 'لم يسبح الطالب في المسبح البارحة.', highlight: "didn't swim" },
        { en: 'They didn\'t watch TV last night.', ar: 'هم لم يشاهدوا التلفاز الليلة الماضية.', highlight: "didn't watch" },
      ],
      examApplications: [
        {
          id: 'app-neg-1',
          problemEn: 'He worked hard yesterday. (negative)',
          instructionAr: 'انفِ الجملة باستخدام didn\'t:',
          solutionEn: 'He did not work hard yesterday.',
          solutionTokens: [
            { text: 'He' },
            { text: 'did not work', isChanged: true },
            { text: 'hard' },
            { text: 'yesterday.' },
          ],
          dissection: [
            { label: 'الفاعل (Subject)', value: 'He ➔ فاعل الجملة (هو)', color: 'blue' },
            { label: 'الفعل في الجملة', value: 'worked ➔ فعل ماضي قياسي منتهي بـ ed', color: 'purple' },
            { label: 'المطلب بين القوسين', value: '(negative) ➔ مطلوب تحويل الجملة إلى نفي', color: 'rose' },
            { label: 'دلالة الزمن', value: 'yesterday ➔ البارحة', color: 'amber' },
          ],
          cumulativeSteps: [
            {
              stepNumber: 1,
              titleAr: 'الخطوة 1: ننزل الفاعل',
              explanationAr: 'الفاعل هو He، ننزله في بداية الجملة.',
              sentenceProgress: 'He ...',
              highlightToken: 'He',
            },
            {
              stepNumber: 2,
              titleAr: 'الخطوة 2: نضع أداة النفي didn\'t بعد الفاعل',
              explanationAr: 'المطلب نفي (negative)، فنضع أداة نفي الماضي didn\'t بعد الفاعل مباشرة.',
              sentenceProgress: "He didn't ...",
              highlightToken: "didn't",
            },
            {
              stepNumber: 3,
              titleAr: 'الخطوة 3: إرجاع الفعل لأصله المجرد (worked ➔ work)',
              explanationAr: 'الفعل الأصلي كان worked بالماضي، وبما أن didn\'t دخلت، نحذف ed ليرجع مجرداً (work).',
              sentenceProgress: 'He did not work ...',
              highlightToken: 'did not work',
            },
            {
              stepNumber: 4,
              titleAr: 'الخطوة 4: إنزال باقي الجملة والتكملة',
              explanationAr: 'ننزل hard yesterday كما هي ونختم بنقطة.',
              sentenceProgress: 'He did not work hard yesterday.',
              highlightToken: 'did not work',
            },
          ],
          actionStepAr: 'نضع didn\'t بعد الفاعل He، ونحذف ed من الفعل worked ليرجع مجرداً (work).',
          noteAr: 'نضع didn\'t بعد الفاعل ونرجع الفعل (worked) إلى مصدره المجرد (work) مع بقاء دلالة yesterday.',
        },
        {
          id: 'app-neg-2',
          problemEn: 'Ali went to the market last week. (negative)',
          instructionAr: 'انفِ الجملة بوجود الفعل الشاذ went:',
          solutionEn: 'Ali didn\'t go to the market last week.',
          solutionTokens: [
            { text: 'Ali' },
            { text: "didn't go", isChanged: true },
            { text: 'to the market' },
            { text: 'last week.' },
          ],
          dissection: [
            { label: 'الفاعل (Subject)', value: 'Ali ➔ فاعل الجملة', color: 'blue' },
            { label: 'الفعل في الجملة', value: 'went ➔ ماضي شاذ أصله المجرد (go)', color: 'purple' },
            { label: 'المطلب بين القوسين', value: '(negative) ➔ مطلوب نفي الجملة', color: 'rose' },
            { label: 'دلالة الزمن', value: 'last week ➔ الأسبوع الماضي', color: 'amber' },
          ],
          cumulativeSteps: [
            {
              stepNumber: 1,
              titleAr: 'الخطوة 1: ننزل الفاعل',
              explanationAr: 'الفاعل هو Ali، ينزل في البداية.',
              sentenceProgress: 'Ali ...',
              highlightToken: 'Ali',
            },
            {
              stepNumber: 2,
              titleAr: 'الخطوة 2: نضع أداة النفي didn\'t',
              explanationAr: 'نضع أداة النفي didn\'t بعد الفاعل Ali.',
              sentenceProgress: "Ali didn't ...",
              highlightToken: "didn't",
            },
            {
              stepNumber: 3,
              titleAr: 'الخطوة 3: إرجاع الفعل الشاذ لأصله (went ➔ go)',
              explanationAr: 'الفعل كان went شاذ، وبوجود didn\'t يرجع لأصله المجرد go (إياك أن تبقيه went!).',
              sentenceProgress: "Ali didn't go ...",
              highlightToken: "didn't go",
            },
            {
              stepNumber: 4,
              titleAr: 'الخطوة 4: إنزال باقي الجملة والتكملة',
              explanationAr: 'ننزل to the market last week كما هي.',
              sentenceProgress: "Ali didn't go to the market last week.",
              highlightToken: "didn't go",
            },
          ],
          actionStepAr: 'نضع didn\'t بعد الفاعل Ali، ونرجع الفعل الشاذ went إلى أصله المجرد go.',
          noteAr: 'عند النفي بـ didn\'t، يرجع الفعل الشاذ (went) إلى أصله المجرد (go).',
        },
        {
          id: 'app-neg-3',
          problemEn: 'The student (not swim) in the pool yesterday. (correct)',
          instructionAr: 'صحح الجملة في حالة النفي:',
          solutionEn: 'The student didn\'t swim in the pool yesterday.',
          solutionTokens: [
            { text: 'The student' },
            { text: "didn't swim", isChanged: true },
            { text: 'in the pool' },
            { text: 'yesterday.' },
          ],
          dissection: [
            { label: 'الفاعل (Subject)', value: 'The student ➔ فاعل مفرد (الطالب)', color: 'blue' },
            { label: 'المطلوب بين القوسين', value: '(not swim) ➔ نفي الفعل في الماضي', color: 'rose' },
            { label: 'دلالة الزمن', value: 'yesterday ➔ البارحة', color: 'amber' },
          ],
          cumulativeSteps: [
            {
              stepNumber: 1,
              titleAr: 'الخطوة 1: ننزل الفاعل',
              explanationAr: 'الفاعل هو The student، ينزل أولاً.',
              sentenceProgress: 'The student ...',
              highlightToken: 'The student',
            },
            {
              stepNumber: 2,
              titleAr: 'الخطوة 2: نفي الفعل بـ didn\'t والمجرد',
              explanationAr: 'لوجود not ودلالة الماضي yesterday، ننفي بـ didn\'t ونبقي الفعل مجرداً swim.',
              sentenceProgress: "The student didn't swim ...",
              highlightToken: "didn't swim",
            },
            {
              stepNumber: 3,
              titleAr: 'الخطوة 3: إنزال التكملة ودلالة الزمن',
              explanationAr: 'ننزل in the pool yesterday ونختم بنقطة.',
              sentenceProgress: "The student didn't swim in the pool yesterday.",
              highlightToken: "didn't swim",
            },
          ],
          actionStepAr: 'لوجود not ودلالة yesterday، نضع didn\'t ونبقي الفعل مجرداً swim.',
          noteAr: 'لوجود not ودلالة yesterday، ننفي بـ didn\'t ونبقي الفعل مجرداً (swim).',
        },
        {
          id: 'app-neg-4',
          problemEn: 'They watched TV last night. (negative)',
          instructionAr: 'انفِ الجملة:',
          solutionEn: 'They didn\'t watch TV last night.',
          solutionTokens: [
            { text: 'They' },
            { text: "didn't watch", isChanged: true },
            { text: 'TV' },
            { text: 'last night.' },
          ],
          dissection: [
            { label: 'الفاعل (Subject)', value: 'They ➔ فاعل جمع (هم)', color: 'blue' },
            { label: 'الفعل في الجملة', value: 'watched ➔ فعل ماضي مضاف له ed', color: 'purple' },
            { label: 'المطلب', value: '(negative) ➔ نفي', color: 'rose' },
            { label: 'دلالة الزمن', value: 'last night ➔ الليلة الماضية', color: 'amber' },
          ],
          cumulativeSteps: [
            {
              stepNumber: 1,
              titleAr: 'الخطوة 1: ننزل الفاعل',
              explanationAr: 'الفاعل هو They، ينزل في البداية.',
              sentenceProgress: 'They ...',
              highlightToken: 'They',
            },
            {
              stepNumber: 2,
              titleAr: 'الخطوة 2: نضع أداة النفي didn\'t',
              explanationAr: 'نضع didn\'t بعد They مباشرة.',
              sentenceProgress: "They didn't ...",
              highlightToken: "didn't",
            },
            {
              stepNumber: 3,
              titleAr: 'الخطوة 3: إرجاع الفعل مجرداً (watched ➔ watch)',
              explanationAr: 'نحذف ed من watched ليرجع مجرداً watch.',
              sentenceProgress: "They didn't watch ...",
              highlightToken: "didn't watch",
            },
            {
              stepNumber: 4,
              titleAr: 'الخطوة 4: إنزال باقي الجملة',
              explanationAr: 'ننزل TV last night ونختم بنقطة.',
              sentenceProgress: "They didn't watch TV last night.",
              highlightToken: "didn't watch",
            },
          ],
          actionStepAr: 'نضع didn\'t بعد They ونحذف ed من watched ليرجع مجرداً watch.',
          noteAr: 'نضع didn\'t ونحذف ed من الفعل watched ليصبح مجرداً (watch).',
        },
      ],
    },
    question: {
      formulaChips: [
        { text: 'Did', isHighlight: true, note: 'في البداية' },
        { text: '+', note: '' },
        { text: 'الفاعل (Subject)' },
        { text: '+', note: '' },
        { text: 'فعل مجرد (Base Verb)', isHighlight: true, note: 'مصدر' },
        { text: '+', note: '' },
        { text: 'التكملة + ?' },
      ],
      explanationAr: 'لتكوين سؤال بنعم/لا، نبدأ الجملة بـ (Did)، ثم نكتب الفاعل، ثم نرجع الفعل إلى أصله المجرد، ونضع علامة الاستفهام في النهاية (?) والإجابة تكون قصيرة (Yes, he did / No, he didn\'t).',
      examples: [
        { en: 'Did he go to school yesterday?', ar: 'هل ذهب إلى المدرسة البارحة؟ ➔ Yes, he did. / No, he didn\'t.', highlight: 'Did he go' },
        { en: 'Did Ali play football last night?', ar: 'هل لعب علي كرة القدم الليلة الماضية؟ ➔ Yes, he did.', highlight: 'Did Ali play' },
        { en: 'Did they visit Ur two days ago?', ar: 'هل زاروا أور قبل يومين؟ ➔ Yes, they did.', highlight: 'Did they visit' },
        { en: 'Did she stay at home yesterday?', ar: 'هل بقيت في المنزل البارحة؟ ➔ No, she didn\'t.', highlight: 'Did she stay' },
      ],
      examApplications: [
        {
          id: 'app-q-1',
          problemEn: 'He went to school yesterday. (question)',
          instructionAr: 'صغ سؤالاً بتقديم Did:',
          solutionEn: 'Did he go to school yesterday?',
          solutionTokens: [
            { text: 'Did', isChanged: true },
            { text: 'he' },
            { text: 'go', isChanged: true },
            { text: 'to school' },
            { text: 'yesterday' },
            { text: '?', isChanged: true },
          ],
          dissection: [
            { label: 'الفاعل (Subject)', value: 'He ➔ فاعل الجملة (هو)', color: 'blue' },
            { label: 'الفعل في الجملة', value: 'went ➔ ماضي شاذ أصله المجرد (go)', color: 'purple' },
            { label: 'المطلب بين القوسين', value: '(question) ➔ تكوين سؤال', color: 'emerald' },
            { label: 'دلالة الزمن', value: 'yesterday ➔ البارحة', color: 'amber' },
          ],
          cumulativeSteps: [
            {
              stepNumber: 1,
              titleAr: 'الخطوة 1: نبدأ بأداة السؤال Did',
              explanationAr: 'المطلب تكوين سؤال (question)، فنبدأ بأداة السؤال Did بحرف كبير في البداية.',
              sentenceProgress: 'Did ...',
              highlightToken: 'Did',
            },
            {
              stepNumber: 2,
              titleAr: 'الخطوة 2: نضع الفاعل بعد Did',
              explanationAr: 'ننزل الفاعل he بعد Did مباشرة (بحرف صغير h).',
              sentenceProgress: 'Did he ...',
              highlightToken: 'he',
            },
            {
              stepNumber: 3,
              titleAr: 'الخطوة 3: إرجاع الفعل الشاذ لمصدره (went ➔ go)',
              explanationAr: 'الفعل كان went، وبما أن Did موجودة، يرجع لأصله المجرد go.',
              sentenceProgress: 'Did he go ...',
              highlightToken: 'go',
            },
            {
              stepNumber: 4,
              titleAr: 'الخطوة 4: إنزال التكملة ووضع علامة الاستفهام (?)',
              explanationAr: 'ننزل to school yesterday ونختم بعلامة الاستفهام (?) بدلاً من النقطة.',
              sentenceProgress: 'Did he go to school yesterday?',
              highlightToken: '?',
            },
          ],
          actionStepAr: 'نبدأ السؤال بـ Did، ونكتب الفاعل he، ونرجع went إلى go مجرداً، ونضع علامة الاستفهام (?).',
          noteAr: 'نبدأ بـ Did ونرجع الفعل went إلى go ونضع علامة الاستفهام (?) في النهاية.',
        },
        {
          id: 'app-q-2',
          problemEn: 'Ali played football last night. (ask a question)',
          instructionAr: 'صغ سؤالاً:',
          solutionEn: 'Did Ali play football last night?',
          solutionTokens: [
            { text: 'Did', isChanged: true },
            { text: 'Ali' },
            { text: 'play', isChanged: true },
            { text: 'football' },
            { text: 'last night' },
            { text: '?', isChanged: true },
          ],
          dissection: [
            { label: 'الفاعل (Subject)', value: 'Ali ➔ فاعل الجملة', color: 'blue' },
            { label: 'الفعل في الجملة', value: 'played ➔ فعل ماضي قياسي منتهي بـ ed', color: 'purple' },
            { label: 'المطلب', value: '(ask a question) ➔ اسأل سؤالاً', color: 'emerald' },
            { label: 'دلالة الزمن', value: 'last night ➔ الليلة الماضية', color: 'amber' },
          ],
          cumulativeSteps: [
            {
              stepNumber: 1,
              titleAr: 'الخطوة 1: نبدأ بـ Did',
              explanationAr: 'نبدأ السؤال بأداة الماضي Did.',
              sentenceProgress: 'Did ...',
              highlightToken: 'Did',
            },
            {
              stepNumber: 2,
              titleAr: 'الخطوة 2: نضع الفاعل Ali',
              explanationAr: 'ننزل الفاعل Ali بعد Did.',
              sentenceProgress: 'Did Ali ...',
              highlightToken: 'Ali',
            },
            {
              stepNumber: 3,
              titleAr: 'الخطوة 3: حذف ed وإرجاع الفعل مجرداً (played ➔ play)',
              explanationAr: 'نحذف ed من الفعل played ليصبح مجرداً play.',
              sentenceProgress: 'Did Ali play ...',
              highlightToken: 'play',
            },
            {
              stepNumber: 4,
              titleAr: 'الخطوة 4: إنزال التكملة ووضع علامة الاستفهام (?)',
              explanationAr: 'ننزل football last night ونضع علامة الاستفهام (?).',
              sentenceProgress: 'Did Ali play football last night?',
              highlightToken: '?',
            },
          ],
          actionStepAr: 'نبدأ بـ Did، ونحذف ed من played ليرجع مجرداً play، ونضع علامة الاستفهام (?).',
          noteAr: 'نبدأ بـ Did ونحذف ed من الفعل played ليصبح مجرداً (play) مع علامة الاستفهام.',
        },
        {
          id: 'app-q-3',
          problemEn: 'They visited Ur two days ago. (question)',
          instructionAr: 'صغ سؤالاً:',
          solutionEn: 'Did they visit Ur two days ago?',
          solutionTokens: [
            { text: 'Did', isChanged: true },
            { text: 'they' },
            { text: 'visit', isChanged: true },
            { text: 'Ur' },
            { text: 'two days ago' },
            { text: '?', isChanged: true },
          ],
          dissection: [
            { label: 'الفاعل (Subject)', value: 'They ➔ فاعل جمع (هم)', color: 'blue' },
            { label: 'الفعل في الجملة', value: 'visited ➔ فعل ماضي قياسي', color: 'purple' },
            { label: 'المطلب', value: '(question) ➔ سؤال', color: 'emerald' },
            { label: 'دلالة الزمن', value: 'two days ago ➔ قبل يومين', color: 'amber' },
          ],
          cumulativeSteps: [
            {
              stepNumber: 1,
              titleAr: 'الخطوة 1: نبدأ بـ Did',
              explanationAr: 'نبدأ السؤال بـ Did.',
              sentenceProgress: 'Did ...',
              highlightToken: 'Did',
            },
            {
              stepNumber: 2,
              titleAr: 'الخطوة 2: نضع الفاعل they',
              explanationAr: 'ننزل الفاعل they بعد Did.',
              sentenceProgress: 'Did they ...',
              highlightToken: 'they',
            },
            {
              stepNumber: 3,
              titleAr: 'الخطوة 3: إرجاع الفعل مجرداً (visited ➔ visit)',
              explanationAr: 'نحذف ed من visited ليرجع مجرداً visit.',
              sentenceProgress: 'Did they visit ...',
              highlightToken: 'visit',
            },
            {
              stepNumber: 4,
              titleAr: 'الخطوة 4: إنزال التكملة وعلامة (?)',
              explanationAr: 'ننزل Ur two days ago ونضع علامة الاستفهام (?).',
              sentenceProgress: 'Did they visit Ur two days ago?',
              highlightToken: '?',
            },
          ],
          actionStepAr: 'نبدأ بـ Did، ونحول visited إلى visit مجرداً، ونختم بعلامة الاستفهام (?).',
          noteAr: 'نبدأ بـ Did ونرجع visited إلى visit مع علامة الاستفهام.',
        },
        {
          id: 'app-q-4',
          problemEn: 'She stayed at home yesterday. (question)',
          instructionAr: 'صغ سؤالاً:',
          solutionEn: 'Did she stay at home yesterday?',
          solutionTokens: [
            { text: 'Did', isChanged: true },
            { text: 'she' },
            { text: 'stay', isChanged: true },
            { text: 'at home' },
            { text: 'yesterday' },
            { text: '?', isChanged: true },
          ],
          dissection: [
            { label: 'الفاعل (Subject)', value: 'She ➔ فاعل مفرد مؤنث (هي)', color: 'blue' },
            { label: 'الفعل في الجملة', value: 'stayed ➔ فعل ماضي قياسي', color: 'purple' },
            { label: 'المطلب', value: '(question) ➔ سؤال', color: 'emerald' },
            { label: 'دلالة الزمن', value: 'yesterday ➔ البارحة', color: 'amber' },
          ],
          cumulativeSteps: [
            {
              stepNumber: 1,
              titleAr: 'الخطوة 1: نبدأ بـ Did',
              explanationAr: 'نبدأ السؤال بـ Did.',
              sentenceProgress: 'Did ...',
              highlightToken: 'Did',
            },
            {
              stepNumber: 2,
              titleAr: 'الخطوة 2: نضع الفاعل she',
              explanationAr: 'ننزل الفاعل she بعد Did.',
              sentenceProgress: 'Did she ...',
              highlightToken: 'she',
            },
            {
              stepNumber: 3,
              titleAr: 'الخطوة 3: إرجاع الفعل مجرداً (stayed ➔ stay)',
              explanationAr: 'نحذف ed من stayed ليصبح مجرداً stay.',
              sentenceProgress: 'Did she stay ...',
              highlightToken: 'stay',
            },
            {
              stepNumber: 4,
              titleAr: 'الخطوة 4: إنزال التكملة وعلامة (?)',
              explanationAr: 'ننزل at home yesterday ونضع علامة الاستفهام (?).',
              sentenceProgress: 'Did she stay at home yesterday?',
              highlightToken: '?',
            },
          ],
          actionStepAr: 'نبدأ بـ Did، ونرجع stayed إلى stay مجرداً، ونضع علامة الاستفهام (?).',
          noteAr: 'نبدأ بـ Did ونرجع stayed إلى stay مع علامة الاستفهام.',
        },
      ],
    },
    spellingNotes: {
      titleAr: 'قواعد إضافة (ed) للأفعال القياسية',
      rules: [
        {
          titleAr: '1. القاعدة العامة',
          descAr: 'نضيف ed لنهاية معظم الأفعال:',
          examples: [
            { base: 'play', changed: 'played', ar: 'لعب' },
            { base: 'visit', changed: 'visited', ar: 'زار' },
            { base: 'stay', changed: 'stayed', ar: 'بقي' }
          ]
        },
        {
          titleAr: '2. الفعل المنتهي بحرف e',
          descAr: 'إذا انتهى الفعل بـ e، نضيف له d فقط:',
          examples: [
            { base: 'like', changed: 'liked', ar: 'أحب' },
            { base: 'live', changed: 'lived', ar: 'عاش' }
          ]
        },
        {
          titleAr: '3. مضاعفة الحرف الصحيح',
          descAr: 'إذا انتهى الفعل بحرف صحيح قبله حرف علة واحد نكرر الحرف الأخير ونضيف ed:',
          examples: [
            { base: 'stop', changed: 'stopped', ar: 'توقف' }
          ]
        }
      ]
    },
    examPractice: [
      {
        id: 'ps-q1',
        type: 'transform',
        questionEn: 'The boys play football. (Change into: Past simple)',
        questionAr: 'حوّل الجملة إلى زمن الماضي البسيط:',
        correctAnswer: 'The boys played football.',
        explanationAr: 'الفعل (play) قياسي، نحوّله للماضي بإضافة ed فيصبح (played).'
      },
      {
        id: 'ps-q2',
        type: 'choice',
        questionEn: 'He goes to the mall. (Past simple is: ...)',
        questionAr: 'اختر صيغة الماضي الصحيحة للجملة:',
        options: ['He went to the mall.', 'He goed to the mall.', 'He is going to the mall.'],
        correctAnswer: 'He went to the mall.',
        explanationAr: 'الفعل go شاذ وماضيه went وليس goed.'
      },
      {
        id: 'ps-q3',
        type: 'correct',
        questionEn: 'Omar (work) hard yesterday. (Correct the verb)',
        questionAr: 'صحح الفعل بين القوسين بوجود دلالة yesterday:',
        options: ['worked', 'working', 'works'],
        correctAnswer: 'worked',
        explanationAr: 'كلمة yesterday تدل على الماضي البسيط، لذا نضيف ed للفعل work فيصبح worked.'
      },
      {
        id: 'ps-q4',
        type: 'transform',
        questionEn: 'He worked hard. (Negative)',
        questionAr: 'انفِ الجملة باستخدام didn\'t:',
        correctAnswer: 'He did not work hard.',
        explanationAr: 'عند النفي نضع did not ونرجع الفعل للماضي المجرد (worked تصبح work).'
      },
      {
        id: 'ps-q5',
        type: 'transform',
        questionEn: 'He went to the school. (Make a question)',
        questionAr: 'صغ سؤالاً يبدأ بـ Did:',
        correctAnswer: 'Did he go to the school?',
        explanationAr: 'نبدأ بـ Did ونحول went إلى المصدر المجرد go مع علامة استفهام.'
      }
    ]
  },

  // =========================================================================
  // TOPIC 2: PAST CONTINUOUS (الماضي المستمر)
  // =========================================================================
  {
    id: 'topic-past-continuous',
    number: 2,
    titleAr: 'الماضي المستمر',
    titleEn: 'Past Continuous Tense',
    taglineAr: 'حدث كان مستمراً لفترة محددة في وقت ماضٍ',
    category: 'الأزمنة',
    badge: 'أساسي للامتحان',
    color: 'emerald',
    summaryAr: 'يُستخدم زمن الماضي المستمر للتعبير عن حدث كان حاصلاً ومستمراً في وقت محدد في الماضي. يتكون من فعل الكينونة (was / were) متبوعاً بفعل يحمل (ing).',
    topicType: 'tense',

    // 1. كارت المقدمة والاستخدام ودلالات الزمن وقواعد ing وجدول أفعال الكتاب
    overview: {
      usageTitleAr: 'متى ولماذا نستخدم زمن الماضي المستمر (Past Continuous)؟',
      usageDescAr: 'نستخدم زمن الماضي المستمر للتعبير عن حدث أو نشاط كان حاصلاً ومستمراً لفترة من الوقت في لحظة محددة من الماضي (مثل: البارحة في الساعة الخامسة، أو طوال مساء أمس). يتكون الفعل فيه دائماً من ركنين أساسيين: فعل مساعد (was / were) + فعل رئيسي ينتهي بـ (ing).',
      quickNoteAr: 'ملاحظة فهم سريعة: الحدث كان حاصلاً ومستمراً في وقت محدد في الماضي، ولا يكتمل المعنى إلا بوجود (was/were) متبوعاً بفعل مضاف إليه (ing).',
      spellingTitleAr: '(ing) للفعل',
      spellingSubtitleAr: 'قواعد إملائية أساسية تأتي في فرع الإملاء وتصحيح الأفعال للامتحانات الشهرية',
      timeMarkers: [
        {
          marker: 'at 7 o\'clock yesterday',
          ar: 'في الساعة السابعة البارحة (تحديد وقت دقيق في الماضي)',
          exampleEn: 'Ali was studying English at 7 o\'clock yesterday.',
        },
        {
          marker: 'all day yesterday',
          ar: 'طوال يوم أمس (يدل على استمرار الحدث طوال اليوم)',
          exampleEn: 'They were working hard all day yesterday.',
        },
        {
          marker: 'yesterday afternoon',
          ar: 'بعد ظهر يوم أمس (تحديد فترة زمنية مستمرة)',
          exampleEn: 'The boys were playing football yesterday afternoon.',
        },
        {
          marker: 'at that time',
          ar: 'في ذلك الوقت المحدد من الماضي',
          exampleEn: 'I was reading an interesting story at that time.',
        },
      ],
      spellingRules: [
        {
          titleAr: '1. حذف حرف (e) الصامت من نهاية الفعل',
          descAr: 'إذا انتهى الفعل بحرف e غير منطوق، نحذفه قبل إضافة ing:',
          examples: [
            { base: 'make', changed: 'making', ar: 'يصنع' },
            { base: 'write', changed: 'writing', ar: 'يكتب' },
            { base: 'come', changed: 'coming', ar: 'يأتي' },
            { base: 'live', changed: 'living', ar: 'يعيش' },
          ],
        },
        {
          titleAr: '2. مضاعفة الحرف الصحيح الأخير',
          descAr: 'إذا انتهى الفعل بحرف صحيح قبله حرف علة واحد، نكرر الحرف الأخير ونضيف ing:',
          examples: [
            { base: 'swim', changed: 'swimming', ar: 'يسبح' },
            { base: 'stop', changed: 'stopping', ar: 'يتوقف' },
            { base: 'sit', changed: 'sitting', ar: 'يجلس' },
            { base: 'run', changed: 'running', ar: 'يركض' },
          ],
        },
        {
          titleAr: '3. إضافة (ing) مباشرة لمعظم الأفعال',
          descAr: 'الأفعال الاعتيادية نضيف لها ing مباشرة دون أي تغيير:',
          examples: [
            { base: 'play', changed: 'playing', ar: 'يلعب' },
            { base: 'watch', changed: 'watching', ar: 'يشاهد' },
            { base: 'read', changed: 'reading', ar: 'يقرأ' },
            { base: 'cook', changed: 'cooking', ar: 'يطبخ' },
          ],
        },
        {
          titleAr: '4. الأفعال المنتهية بحرف (y)',
          descAr: 'حرف y يبقى كما هو دائماً ونضيف ing مباشرة (لا يقلب ولا يحذف):',
          examples: [
            { base: 'study', changed: 'studying', ar: 'يدرس' },
            { base: 'stay', changed: 'staying', ar: 'يبقى' },
            { base: 'fly', changed: 'flying', ar: 'يطير' },
            { base: 'cry', changed: 'crying', ar: 'يبكي' },
          ],
        },
      ],
      textbookVerbs: [
        { base: 'play', past: 'playing', ar: 'يلعب', type: 'regular', note: 'كتاب الطالب ص 6 - إضافة مباشرة' },
        { base: 'watch', past: 'watching', ar: 'يشاهد', type: 'regular', note: 'كتاب الطالب ص 6 - إضافة مباشرة' },
        { base: 'read', past: 'reading', ar: 'يقرأ', type: 'regular', note: 'كتاب الطالب ص 7 - إضافة مباشرة' },
        { base: 'cook', past: 'cooking', ar: 'يطبخ', type: 'regular', note: 'كتاب الطالب ص 7 - إضافة مباشرة' },
        { base: 'clean', past: 'cleaning', ar: 'ينظف', type: 'regular', note: 'كتاب النشاط ص 4 - إضافة مباشرة' },
        { base: 'listen', past: 'listening', ar: 'يستمع', type: 'regular', note: 'كتاب الطالب ص 8 - إضافة مباشرة' },
        { base: 'study', past: 'studying', ar: 'يدرس', type: 'regular', note: 'كتاب النشاط ص 5 - y تبقى كما هي' },
        { base: 'stay', past: 'staying', ar: 'يبقى / يقيم', type: 'regular', note: 'كتاب الطالب ص 8 - y تبقى كما هي' },
        { base: 'write', past: 'writing', ar: 'يكتب', type: 'irregular', note: 'كتاب النشاط ص 6 - حذف e الصامتة' },
        { base: 'make', past: 'making', ar: 'يصنع', type: 'irregular', note: 'كتاب الطالب ص 9 - حذف e الصامتة' },
        { base: 'come', past: 'coming', ar: 'يأتي', type: 'irregular', note: 'كتاب النشاط ص 7 - حذف e الصامتة' },
        { base: 'swim', past: 'swimming', ar: 'يسبح', type: 'irregular', note: 'كتاب النشاط ص 8 - مضاعفة m' },
        { base: 'stop', past: 'stopping', ar: 'يتوقف', type: 'irregular', note: 'كتاب الطالب ص 10 - مضاعفة p' },
        { base: 'run', past: 'running', ar: 'يركض', type: 'irregular', note: 'كتاب النشاط ص 9 - مضاعفة n' },
        { base: 'sit', past: 'sitting', ar: 'يجلس', type: 'irregular', note: 'كتاب النشاط ص 10 - مضاعفة t' },
        { base: 'sleep', past: 'sleeping', ar: 'ينام', type: 'regular', note: 'كتاب الطالب ص 11 - علتان فلا نكرر p' },
      ],
    },

    timeMarkers: [
      'at 7 o\'clock yesterday (في الساعة السابعة البارحة)',
      'all day yesterday (طوال يوم أمس)',
      'yesterday afternoon (بعد ظهر يوم أمس)',
      'at that time (في ذلك الوقت)',
    ],

    // 2. كارت الإثبات
    affirmative: {
      formulaChips: [
        { text: 'الفاعل المفرد (I / He / She / It) + was' },
        { text: 'أو' },
        { text: 'الفاعل الجمع (We / You / They) + were' },
        { text: '+', note: '' },
        { text: 'فعل + ing', isHighlight: true, note: 'فعل مستمر' },
        { text: '+', note: '' },
        { text: 'التكملة' },
      ],
      explanationAr: 'في الإثبات، نحدد الفاعل أولاً:\n• إذا كان مفرداً (I, He, She, It أو اسم مفرد مثل Ali أو The boy) ➔ يأخذ (was).\n• إذا كان جمعاً (We, You, They أو اسم جمع مثل The boys) ➔ يأخذ (were).\nثم نضيف مباشرة الفعل الرئيسي مضافاً إليه (ing) مع تطبيق قواعد الإملاء.',
      examples: [
        { en: 'Ali was playing football at 5 o\'clock yesterday.', ar: 'كان علي يلعب كرة القدم في الساعة الخامسة البارحة. (مفرد ➔ was playing)', highlight: 'was playing' },
        { en: 'They were watching TV all evening yesterday.', ar: 'كانوا يشاهدون التلفاز طوال مساء أمس. (جمع ➔ were watching)', highlight: 'were watching' },
        { en: 'The boys were swimming in the river.', ar: 'كان الأولاد يسبحون في النهر. (جمع ➔ were swimming)', highlight: 'were swimming' },
        { en: 'I was reading an email at that time.', ar: 'كنتُ أقرأ بريداً إلكترونياً في ذلك الوقت. (I تأخذ was ➔ was reading)', highlight: 'was reading' },
      ],
      examApplications: [
        {
          id: 'app-pc-aff-1',
          problemEn: 'Ali (play) football at 5 o\'clock yesterday. (Past continuous)',
          instructionAr: 'صحح الفعل بين القوسين بوجود الفاعل المفرد والوقت المحدد:',
          solutionEn: 'Ali was playing football at 5 o\'clock yesterday.',
          solutionTokens: [
            { text: 'Ali' },
            { text: 'was playing', isChanged: true },
            { text: 'football' },
            { text: 'at 5 o\'clock yesterday.' },
          ],
          dissection: [
            { label: 'الفاعل (Subject)', value: 'Ali ➔ فاعل مفرد مذكر (هو He)', color: 'blue' },
            { label: 'المطلوب بين القوسين', value: '(play) ➔ وضعه في صيغة الماضي المستمر', color: 'purple' },
            { label: 'دلالة الوقت والزمن', value: 'at 5 o\'clock yesterday ➔ وقت محدد في الماضي', color: 'amber' },
            { label: 'التكملة', value: 'football ➔ كرة القدم', color: 'zinc' },
          ],
          cumulativeSteps: [
            {
              stepNumber: 1,
              titleAr: 'الخطوة 1: ننزل الفاعل المفرد بالبداية',
              explanationAr: 'الفاعل هو Ali (مفرد مذكر ضميره He)، ننزله في بداية الجملة.',
              sentenceProgress: 'Ali ...',
              highlightToken: 'Ali',
            },
            {
              stepNumber: 2,
              titleAr: 'الخطوة 2: نضع was ونضيف ing للفعل (play ➔ was playing)',
              explanationAr: 'بما أن الفاعل Ali مفرد يأخذ was، ثم نضيف ing للفعل play ليصبح was playing.',
              sentenceProgress: 'Ali was playing ...',
              highlightToken: 'was playing',
            },
            {
              stepNumber: 3,
              titleAr: 'الخطوة 3: ننزل التكملة ودلالة الوقت ونختم بنقطة',
              explanationAr: 'ننزل football at 5 o\'clock yesterday كما هي ونختم بنقطة.',
              sentenceProgress: 'Ali was playing football at 5 o\'clock yesterday.',
              highlightToken: 'was playing',
            },
          ],
          actionStepAr: 'الفاعل Ali مفرد يأخذ was، ونضيف ing للفعل play ليصبح was playing.',
          noteAr: 'المطلب past continuous والفاعل Ali مفرد، فيأخذ was مع فعل مضاف له ing وهو (was playing).',
        },
        {
          id: 'app-pc-aff-2',
          problemEn: 'They (watch) TV all evening yesterday. (correct the verb)',
          instructionAr: 'صحح الفعل في الماضي المستمر مع الفاعل الجمع:',
          solutionEn: 'They were watching TV all evening yesterday.',
          solutionTokens: [
            { text: 'They' },
            { text: 'were watching', isChanged: true },
            { text: 'TV' },
            { text: 'all evening yesterday.' },
          ],
          dissection: [
            { label: 'الفاعل (Subject)', value: 'They ➔ فاعل جمع (هم)', color: 'blue' },
            { label: 'المطلوب بين القوسين', value: '(watch) ➔ تصحيحه للماضي المستمر', color: 'purple' },
            { label: 'دلالة الاستمرار', value: 'all evening yesterday ➔ طوال مساء أمس', color: 'amber' },
            { label: 'التكملة', value: 'TV ➔ التلفاز', color: 'zinc' },
          ],
          cumulativeSteps: [
            {
              stepNumber: 1,
              titleAr: 'الخطوة 1: ننزل الفاعل الجمع (They)',
              explanationAr: 'الفاعل هو الضمير They (هم - جمع)، ننزله في بداية الجملة.',
              sentenceProgress: 'They ...',
              highlightToken: 'They',
            },
            {
              stepNumber: 2,
              titleAr: 'الخطوة 2: نضع were ونضيف ing للفعل (watch ➔ were watching)',
              explanationAr: 'الفاعل They جمع فيأخذ were وليس was، ونضيف ing للفعل watch ليصبح were watching.',
              sentenceProgress: 'They were watching ...',
              highlightToken: 'were watching',
            },
            {
              stepNumber: 3,
              titleAr: 'الخطوة 3: إنزال التكملة وظرف الاستمرار ونختم بنقطة',
              explanationAr: 'ننزل TV all evening yesterday ونختم بنقطة.',
              sentenceProgress: 'They were watching TV all evening yesterday.',
              highlightToken: 'were watching',
            },
          ],
          actionStepAr: 'الفاعل They جمع يأخذ were، ونضيف ing للفعل watch ليصبح were watching.',
          noteAr: 'الفاعل جمع (They) فيأخذ were متبوعاً بـ watching مع دلالة الاستمرار all evening yesterday.',
        },
        {
          id: 'app-pc-aff-3',
          problemEn: 'The boys (swim) in the river. (Past continuous)',
          instructionAr: 'انتبه لمضاعفة الحرف الصحيح عند إضافة ing للفعل:',
          solutionEn: 'The boys were swimming in the river.',
          solutionTokens: [
            { text: 'The boys' },
            { text: 'were swimming', isChanged: true },
            { text: 'in the river.' },
          ],
          dissection: [
            { label: 'الفاعل (Subject)', value: 'The boys ➔ فاعل جمع (الأولاد)', color: 'blue' },
            { label: 'المطلوب بين القوسين', value: '(swim) ➔ فعل ينتهي بصحيح قبله علة واحد', color: 'purple' },
            { label: 'الفعل المساعد المناسب', value: 'were ➔ لأن الفاعل جمع', color: 'emerald' },
            { label: 'التكملة', value: 'in the river ➔ في النهر', color: 'zinc' },
          ],
          cumulativeSteps: [
            {
              stepNumber: 1,
              titleAr: 'الخطوة 1: ننزل الفاعل الجمع (The boys)',
              explanationAr: 'الفاعل هو The boys (الأولاد - جمع ضميرهم They)، ينزل في البداية.',
              sentenceProgress: 'The boys ...',
              highlightToken: 'The boys',
            },
            {
              stepNumber: 2,
              titleAr: 'الخطوة 2: نضع were ونضاعف حرف m (swim ➔ were swimming)',
              explanationAr: 'الفاعل جمع يأخذ were. وفعل swim ينتهي بحرف صحيح قبله علة واحد (i) فنكرر m ثم نضيف ing تصبح were swimming.',
              sentenceProgress: 'The boys were swimming ...',
              highlightToken: 'were swimming',
            },
            {
              stepNumber: 3,
              titleAr: 'الخطوة 3: إنزال التكملة ونختم بنقطة',
              explanationAr: 'ننزل in the river ونختم بنقطة.',
              sentenceProgress: 'The boys were swimming in the river.',
              highlightToken: 'were swimming',
            },
          ],
          actionStepAr: 'الفاعل The boys جمع يأخذ were، ونكرر حرف m في swim لتصبح were swimming.',
          noteAr: 'انتبه للإملاء: فعل swim ينتهي بصحيح قبله علة فيضاعف الحرف الأخير مع were swimming.',
        },
        {
          id: 'app-pc-aff-4',
          problemEn: 'I (write) a story at that time. (Past continuous)',
          instructionAr: 'انتبه للضمير I وحذف e الصامتة قبل إضافة ing:',
          solutionEn: 'I was writing a story at that time.',
          solutionTokens: [
            { text: 'I' },
            { text: 'was writing', isChanged: true },
            { text: 'a story' },
            { text: 'at that time.' },
          ],
          dissection: [
            { label: 'الفاعل (Subject)', value: 'I ➔ ضمير المتكلم (أنا)', color: 'blue' },
            { label: 'المطلوب بين القوسين', value: '(write) ➔ فعل ينتهي بـ e صامتة', color: 'purple' },
            { label: 'الفعل المساعد المناسب', value: 'was ➔ الضمير I يأخذ was دائماً بالماضي المستمر', color: 'emerald' },
            { label: 'دلالة الزمن', value: 'at that time ➔ في ذلك الوقت', color: 'amber' },
          ],
          cumulativeSteps: [
            {
              stepNumber: 1,
              titleAr: 'الخطوة 1: ننزل ضمير المتكلم (I)',
              explanationAr: 'الفاعل هو الضمير I (أنا)، ننزله في بداية الجملة.',
              sentenceProgress: 'I ...',
              highlightToken: 'I',
            },
            {
              stepNumber: 2,
              titleAr: 'الخطوة 2: نضع was ونحذف e من الفعل (write ➔ was writing)',
              explanationAr: 'الضمير I في الماضي المستمر يأخذ was دائماً. وفعل write ينتهي بـ e صامتة فنحذفها ونضيف ing ليصبح was writing.',
              sentenceProgress: 'I was writing ...',
              highlightToken: 'was writing',
            },
            {
              stepNumber: 3,
              titleAr: 'الخطوة 3: إنزال التكملة ودلالة الوقت',
              explanationAr: 'ننزل a story at that time ونختم بنقطة.',
              sentenceProgress: 'I was writing a story at that time.',
              highlightToken: 'was writing',
            },
          ],
          actionStepAr: 'الضمير I يأخذ was، ونحذف حرف e الصامت من write لتصبح was writing.',
          noteAr: 'الضمير I يأخذ was دائماً في الماضي المستمر، وتُحذف حرف e الصامتة من الفعل write.',
        },
      ],
    },

    // 3. كارت النفي
    negative: {
      formulaChips: [
        { text: 'الفاعل' },
        { text: '+', note: '' },
        { text: "was not (wasn't) / were not (weren't)", isHighlight: true, note: 'نفي مباشر' },
        { text: '+', note: '' },
        { text: 'فعل + ing', isHighlight: true, note: 'يبقى مضافاً له ing' },
        { text: '+', note: '' },
        { text: 'التكملة' },
      ],
      explanationAr: 'عند نفي جملة الماضي المستمر، نضع كلمة (not) بعد الفعل المساعد was أو were مباشرة لتصبح (wasn\'t / weren\'t)، ويبقى الفعل كما هو مضافاً له ing (لا نحذف ing في النفي نهائياً!).',
      warningAr: 'احذر جداً: لا تحذف ing من الفعل عند النفي! في الماضي البسيط كنا نرجع الفعل لمجرد لوجود didn\'t، أما في الماضي المستمر فيبقى الفعل حاملاً لـ ing دائماً.',
      examples: [
        { en: 'Huda wasn\'t cooking dinner.', ar: 'لم تكن هدى تطبخ العشاء.', highlight: 'wasn\'t cooking' },
        { en: 'The students weren\'t playing tennis.', ar: 'لم يكن الطلاب يلعبون التنس.', highlight: 'weren\'t playing' },
        { en: 'He wasn\'t sleeping at 10 PM last night.', ar: 'لم يكن نائماً في الساعة العاشرة ليلة البارحة.', highlight: 'wasn\'t sleeping' },
        { en: 'We weren\'t watching the match.', ar: 'لم نكن نشاهد المباراة.', highlight: 'weren\'t watching' },
      ],
      examApplications: [
        {
          id: 'app-pc-neg-1',
          problemEn: 'Huda was cooking dinner. (Negative)',
          instructionAr: 'انفِ جملة الماضي المستمر بوضع not بعد was:',
          solutionEn: 'Huda wasn\'t cooking dinner.',
          solutionTokens: [
            { text: 'Huda' },
            { text: "wasn't cooking", isChanged: true },
            { text: 'dinner.' },
          ],
          dissection: [
            { label: 'الفاعل (Subject)', value: 'Huda ➔ فاعل مفرد', color: 'blue' },
            { label: 'الفعل المساعد في الجملة', value: 'was ➔ فعل مساعد للمفرد', color: 'purple' },
            { label: 'المطلب بين القوسين', value: '(Negative) ➔ مطلوب نفي الجملة', color: 'rose' },
            { label: 'الفعل الرئيسي', value: 'cooking ➔ يبقى حاملاً لـ ing', color: 'zinc' },
          ],
          cumulativeSteps: [
            {
              stepNumber: 1,
              titleAr: 'الخطوة 1: ننزل الفاعل (Huda)',
              explanationAr: 'الفاعل هو Huda، ننزله في بداية الجملة.',
              sentenceProgress: 'Huda ...',
              highlightToken: 'Huda',
            },
            {
              stepNumber: 2,
              titleAr: 'الخطوة 2: نضع not بعد was مع بقاء cooking كما هي',
              explanationAr: 'الفعل المساعد was نضع له not ليصبح wasn\'t، ونبقي cooking كما هي دون حذف ing.',
              sentenceProgress: "Huda wasn't cooking ...",
              highlightToken: "wasn't cooking",
            },
            {
              stepNumber: 3,
              titleAr: 'الخطوة 3: إنزال التكملة ونختم بنقطة',
              explanationAr: 'ننزل dinner ونختم بنقطة.',
              sentenceProgress: "Huda wasn't cooking dinner.",
              highlightToken: "wasn't cooking",
            },
          ],
          actionStepAr: 'نضع not بعد was لتصبح wasn\'t cooking مع بقاء ing على الفعل.',
          noteAr: 'في نفي الماضي المستمر نضع not بعد was فقط، وإياك أن تحذف ing من الفعل cooking!',
        },
        {
          id: 'app-pc-neg-2',
          problemEn: 'The students were playing tennis. (Negative)',
          instructionAr: 'انفِ الجملة مع الفعل المساعد were:',
          solutionEn: 'The students weren\'t playing tennis.',
          solutionTokens: [
            { text: 'The students' },
            { text: "weren't playing", isChanged: true },
            { text: 'tennis.' },
          ],
          dissection: [
            { label: 'الفاعل (Subject)', value: 'The students ➔ فاعل جمع (الطلاب)', color: 'blue' },
            { label: 'الفعل المساعد', value: 'were ➔ فعل مساعد للجمع', color: 'purple' },
            { label: 'المطلب', value: '(Negative) ➔ نفي', color: 'rose' },
            { label: 'التكملة', value: 'tennis ➔ التنس', color: 'zinc' },
          ],
          cumulativeSteps: [
            {
              stepNumber: 1,
              titleAr: 'الخطوة 1: ننزل الفاعل الجمع (The students)',
              explanationAr: 'الفاعل هو The students، ننزله في البداية.',
              sentenceProgress: 'The students ...',
              highlightToken: 'The students',
            },
            {
              stepNumber: 2,
              titleAr: 'الخطوة 2: ننفي were بوضع not لتصبح weren\'t',
              explanationAr: 'الفعل المساعد were نضع له not فيصبح weren\'t، ويبقى الفعل playing حاملاً لـ ing.',
              sentenceProgress: "The students weren't playing ...",
              highlightToken: "weren't playing",
            },
            {
              stepNumber: 3,
              titleAr: 'الخطوة 3: إنزال التكملة tennis ونختم بنقطة',
              explanationAr: 'ننزل tennis ونضع نقطة.',
              sentenceProgress: "The students weren't playing tennis.",
              highlightToken: "weren't playing",
            },
          ],
          actionStepAr: 'نضع not بعد were لتصبح weren\'t playing مع بقاء ing.',
          noteAr: 'نضع not بعد were لتصبح weren\'t مع بقاء playing كما هي.',
        },
        {
          id: 'app-pc-neg-3',
          problemEn: 'He (not sleep) at 10 PM last night. (Past continuous)',
          instructionAr: 'صحح الجملة في حالة النفي للماضي المستمر:',
          solutionEn: 'He wasn\'t sleeping at 10 PM last night.',
          solutionTokens: [
            { text: 'He' },
            { text: "wasn't sleeping", isChanged: true },
            { text: 'at 10 PM' },
            { text: 'last night.' },
          ],
          dissection: [
            { label: 'الفاعل (Subject)', value: 'He ➔ فاعل مفرد (هو)', color: 'blue' },
            { label: 'المطلوب بين القوسين', value: '(not sleep) ➔ نفي في الماضي المستمر', color: 'rose' },
            { label: 'دلالة الزمن', value: 'at 10 PM last night ➔ وقت محدد في الماضي', color: 'amber' },
          ],
          cumulativeSteps: [
            {
              stepNumber: 1,
              titleAr: 'الخطوة 1: ننزل الفاعل (He)',
              explanationAr: 'الفاعل هو He، ننزله في بداية الجملة.',
              sentenceProgress: 'He ...',
              highlightToken: 'He',
            },
            {
              stepNumber: 2,
              titleAr: 'الخطوة 2: نضع wasn\'t ونضيف ing للفعل sleep',
              explanationAr: 'الفاعل He مفرد فيأخذ was، ولوجود not تصبح wasn\'t، ونضيف ing للفعل sleep ليصبح wasn\'t sleeping.',
              sentenceProgress: "He wasn't sleeping ...",
              highlightToken: "wasn't sleeping",
            },
            {
              stepNumber: 3,
              titleAr: 'الخطوة 3: إنزال التكملة والوقت ودلالة الزمن',
              explanationAr: 'ننزل at 10 PM last night ونختم بنقطة.',
              sentenceProgress: "He wasn't sleeping at 10 PM last night.",
              highlightToken: "wasn't sleeping",
            },
          ],
          actionStepAr: 'الفاعل He يأخذ was المنفية (wasn\'t) مع إضافة ing للفعل (sleeping).',
          noteAr: 'وجود not يتطلب فعل مساعد منفي (wasn\'t) مع إضافة ing للفعل sleep.',
        },
        {
          id: 'app-pc-neg-4',
          problemEn: 'We were watching the match. (Negative)',
          instructionAr: 'انفِ الجملة بتحويل were إلى weren\'t:',
          solutionEn: 'We weren\'t watching the match.',
          solutionTokens: [
            { text: 'We' },
            { text: "weren't watching", isChanged: true },
            { text: 'the match.' },
          ],
          dissection: [
            { label: 'الفاعل (Subject)', value: 'We ➔ فاعل جمع (نحن)', color: 'blue' },
            { label: 'الفعل المساعد', value: 'were ➔ ماضي جمع', color: 'purple' },
            { label: 'المطلب', value: '(Negative) ➔ نفي', color: 'rose' },
          ],
          cumulativeSteps: [
            {
              stepNumber: 1,
              titleAr: 'الخطوة 1: ننزل الفاعل الجمع (We)',
              explanationAr: 'الفاعل هو We (نحن)، ننزله في البداية.',
              sentenceProgress: 'We ...',
              highlightToken: 'We',
            },
            {
              stepNumber: 2,
              titleAr: 'الخطوة 2: ننفي were لتصبح weren\'t مع بقاء watching',
              explanationAr: 'نضع not بعد were لتصبح weren\'t، ويبقى الفعل watching كما هو.',
              sentenceProgress: "We weren't watching ...",
              highlightToken: "weren't watching",
            },
            {
              stepNumber: 3,
              titleAr: 'الخطوة 3: إنزال التكملة the match',
              explanationAr: 'ننزل the match ونختم بنقطة.',
              sentenceProgress: "We weren't watching the match.",
              highlightToken: "weren't watching",
            },
          ],
          actionStepAr: 'نضع not بعد were لتصبح weren\'t watching.',
          noteAr: 'نفي were يكون بـ weren\'t ويبقى الفعل watching محتفظاً بـ ing.',
        },
      ],
    },

    // 4. كارت الاستفهام
    question: {
      formulaChips: [
        { text: 'Was / Were', isHighlight: true, note: 'في البداية' },
        { text: '+', note: '' },
        { text: 'الفاعل (Subject)' },
        { text: '+', note: '' },
        { text: 'فعل + ing', isHighlight: true, note: 'مستمر' },
        { text: '+', note: '' },
        { text: 'التكملة + ?' },
      ],
      explanationAr: 'لتكوين سؤال في الماضي المستمر، نتبع طريقة التبديل البسيطة (تقديم وتأخير):\n• نقدم الفعل المساعد (Was أو Were) في بداية الجملة ويكتب بحرف كبير (Capital).\n• نضع الفاعل بعده مباشرة.\n• يبقى الفعل حاملاً لـ (ing) كما هو تماماً.\n• ننزل التكملة ونضع علامة الاستفهام (?) في نهاية الجملة.\n• الإجابات القصيرة: Yes, he was. / No, he wasn\'t. أو Yes, they were. / No, they weren\'t.',
      examples: [
        { en: 'Was Ahmed reading a book?', ar: 'هل كان أحمد يقرأ كتاباً؟ ➔ Yes, he was. / No, he wasn\'t.', highlight: 'Was Ahmed reading' },
        { en: 'Were they studying English at 6 PM?', ar: 'هل كانوا يدرسون الإنجليزية في الساعة 6؟ ➔ Yes, they were.', highlight: 'Were they studying' },
        { en: 'Was Muna cleaning her room?', ar: 'هل كانت منى تنظف غرفتها؟ ➔ Yes, she was.', highlight: 'Was Muna cleaning' },
        { en: 'Were the boys playing football?', ar: 'هل كان الأولاد يلعبون كرة القدم؟ ➔ Yes, they were.', highlight: 'Were the boys playing' },
      ],
      examApplications: [
        {
          id: 'app-pc-q-1',
          problemEn: 'Ahmed was reading a book. (Question)',
          instructionAr: 'صغ سؤالاً بتقديم الفعل المساعد Was في البداية:',
          solutionEn: 'Was Ahmed reading a book?',
          solutionTokens: [
            { text: 'Was', isChanged: true },
            { text: 'Ahmed' },
            { text: 'reading' },
            { text: 'a book' },
            { text: '?', isChanged: true },
          ],
          dissection: [
            { label: 'الفاعل (Subject)', value: 'Ahmed ➔ فاعل مفرد', color: 'blue' },
            { label: 'الفعل المساعد', value: 'was ➔ يقدم في أول الجملة', color: 'purple' },
            { label: 'الفعل الرئيسي', value: 'reading ➔ يبقى حاملاً لـ ing', color: 'emerald' },
            { label: 'المطلب', value: '(Question) ➔ سؤال مع علامة (?)', color: 'amber' },
          ],
          cumulativeSteps: [
            {
              stepNumber: 1,
              titleAr: 'الخطوة 1: نقدم الفعل المساعد Was في البداية',
              explanationAr: 'نبدأ السؤال بـ Was بحرف كبير W.',
              sentenceProgress: 'Was ...',
              highlightToken: 'Was',
            },
            {
              stepNumber: 2,
              titleAr: 'الخطوة 2: ننزل الفاعل Ahmed بعد Was مباشرة',
              explanationAr: 'ننزل الفاعل Ahmed بعد Was.',
              sentenceProgress: 'Was Ahmed ...',
              highlightToken: 'Ahmed',
            },
            {
              stepNumber: 3,
              titleAr: 'الخطوة 3: ننزل الفعل reading حاملاً لـ ing كما هو',
              explanationAr: 'ننزل الفعل reading كما هو دون أي تغيير.',
              sentenceProgress: 'Was Ahmed reading ...',
              highlightToken: 'reading',
            },
            {
              stepNumber: 4,
              titleAr: 'الخطوة 4: إنزال التكملة ونختم بعلامة الاستفهام (?)',
              explanationAr: 'ننزل a book ونضع علامة الاستفهام (?).',
              sentenceProgress: 'Was Ahmed reading a book?',
              highlightToken: '?',
            },
          ],
          actionStepAr: 'نقدم Was في البداية، ننزل الفاعل Ahmed والفعل reading، ونختم بـ (?).',
          noteAr: 'في الماضي المستمر نقدم Was على الفاعل ونحتفظ بـ ing على الفعل ونضع علامة الاستفهام.',
        },
        {
          id: 'app-pc-q-2',
          problemEn: 'They were studying English at 6 PM. (Question)',
          instructionAr: 'حوّل إلى سؤال مع الفاعل الجمع بتقديم Were:',
          solutionEn: 'Were they studying English at 6 PM?',
          solutionTokens: [
            { text: 'Were', isChanged: true },
            { text: 'they' },
            { text: 'studying' },
            { text: 'English' },
            { text: 'at 6 PM' },
            { text: '?', isChanged: true },
          ],
          dissection: [
            { label: 'الفاعل (Subject)', value: 'They ➔ فاعل جمع', color: 'blue' },
            { label: 'الفعل المساعد', value: 'were ➔ يقدم في البداية', color: 'purple' },
            { label: 'المطلب', value: '(Question) ➔ صياغة سؤال', color: 'emerald' },
          ],
          cumulativeSteps: [
            {
              stepNumber: 1,
              titleAr: 'الخطوة 1: نقدم الفعل المساعد Were في البداية',
              explanationAr: 'نبدأ السؤال بـ Were بحرف كبير W.',
              sentenceProgress: 'Were ...',
              highlightToken: 'Were',
            },
            {
              stepNumber: 2,
              titleAr: 'الخطوة 2: ننزل الفاعل they بحرف صغير',
              explanationAr: 'ننزل الفاعل they بعد Were.',
              sentenceProgress: 'Were they ...',
              highlightToken: 'they',
            },
            {
              stepNumber: 3,
              titleAr: 'الخطوة 3: إنزال الفعل studying كما هو مع ing',
              explanationAr: 'ننزل studying دون تغيير.',
              sentenceProgress: 'Were they studying ...',
              highlightToken: 'studying',
            },
            {
              stepNumber: 4,
              titleAr: 'الخطوة 4: إنزال التكملة وختم السؤال بـ (?)',
              explanationAr: 'ننزل English at 6 PM ونضع علامة الاستفهام (?).',
              sentenceProgress: 'Were they studying English at 6 PM?',
              highlightToken: '?',
            },
          ],
          actionStepAr: 'نقدم Were في البداية، ثم الفاعل they، ونبقي studying مع علامة (?).',
          noteAr: 'نقدم Were في بداية السؤال لأن الفاعل they جمع، ونختم بعلامة الاستفهام.',
        },
        {
          id: 'app-pc-q-3',
          problemEn: 'Muna was cleaning her room. (Ask)',
          instructionAr: 'المطلب (Ask) يعني صغ سؤالاً بتقديم Was:',
          solutionEn: 'Was Muna cleaning her room?',
          solutionTokens: [
            { text: 'Was', isChanged: true },
            { text: 'Muna' },
            { text: 'cleaning' },
            { text: 'her room' },
            { text: '?', isChanged: true },
          ],
          dissection: [
            { label: 'الفاعل (Subject)', value: 'Muna ➔ فاعل مفرد', color: 'blue' },
            { label: 'المطلب بين القوسين', value: '(Ask) ➔ يعني اسأل / صغ سؤالاً', color: 'purple' },
            { label: 'الفعل المساعد', value: 'was ➔ يقدم في البداية', color: 'emerald' },
          ],
          cumulativeSteps: [
            {
              stepNumber: 1,
              titleAr: 'الخطوة 1: نبدأ بـ Was',
              explanationAr: 'نقدم Was في بداية السؤال.',
              sentenceProgress: 'Was ...',
              highlightToken: 'Was',
            },
            {
              stepNumber: 2,
              titleAr: 'الخطوة 2: نضع الفاعل Muna',
              explanationAr: 'ننزل الفاعل Muna بعد Was.',
              sentenceProgress: 'Was Muna ...',
              highlightToken: 'Muna',
            },
            {
              stepNumber: 3,
              titleAr: 'الخطوة 3: ننزل الفعل cleaning',
              explanationAr: 'يبقى cleaning كما هو مضافاً له ing.',
              sentenceProgress: 'Was Muna cleaning ...',
              highlightToken: 'cleaning',
            },
            {
              stepNumber: 4,
              titleAr: 'الخطوة 4: إنزال التكملة her room وعلامة (?)',
              explanationAr: 'ننزل her room ونضع علامة الاستفهام (?).',
              sentenceProgress: 'Was Muna cleaning her room?',
              highlightToken: '?',
            },
          ],
          actionStepAr: 'المطلب Ask يعني سؤال: نقدم Was ونضع علامة الاستفهام (?).',
          noteAr: 'عند رؤية كلمة (Ask) بين القوسين، المطلوب هو تكوين سؤال بتقديم Was على Muna.',
        },
        {
          id: 'app-pc-q-4',
          problemEn: 'The boys were playing football. (Make a question)',
          instructionAr: 'صغ سؤالاً بتقديم Were على الفاعل الجمع:',
          solutionEn: 'Were the boys playing football?',
          solutionTokens: [
            { text: 'Were', isChanged: true },
            { text: 'the boys' },
            { text: 'playing' },
            { text: 'football' },
            { text: '?', isChanged: true },
          ],
          dissection: [
            { label: 'الفاعل (Subject)', value: 'The boys ➔ فاعل جمع', color: 'blue' },
            { label: 'المطلب', value: '(Make a question) ➔ صغ سؤالاً', color: 'emerald' },
            { label: 'الفعل المساعد', value: 'were ➔ يقدم في أول السؤال', color: 'purple' },
          ],
          cumulativeSteps: [
            {
              stepNumber: 1,
              titleAr: 'الخطوة 1: نبدأ بـ Were في البداية',
              explanationAr: 'نبدأ السؤال بـ Were بحرف كبير.',
              sentenceProgress: 'Were ...',
              highlightToken: 'Were',
            },
            {
              stepNumber: 2,
              titleAr: 'الخطوة 2: ننزل الفاعل the boys',
              explanationAr: 'ننزل the boys بعد Were.',
              sentenceProgress: 'Were the boys ...',
              highlightToken: 'the boys',
            },
            {
              stepNumber: 3,
              titleAr: 'الخطوة 3: ننزل الفعل playing مع ing',
              explanationAr: 'ننزل playing كما هو دون أي تغيير.',
              sentenceProgress: 'Were the boys playing ...',
              highlightToken: 'playing',
            },
            {
              stepNumber: 4,
              titleAr: 'الخطوة 4: إنزال التكملة football وعلامة الاستفهام (?)',
              explanationAr: 'ننزل football ونضع علامة الاستفهام (?).',
              sentenceProgress: 'Were the boys playing football?',
              highlightToken: '?',
            },
          ],
          actionStepAr: 'نقدم Were في البداية، ثم the boys، ثم playing مع علامة (?).',
          noteAr: 'نقدم Were على الفاعل the boys مع بقاء playing وعلامة الاستفهام (?).',
        },
      ],
    },

    spellingNotes: {
      titleAr: 'قواعد إضافة (ing) للفعل',
      rules: [
        {
          titleAr: '1. حذف حرف e الصامت',
          descAr: 'إذا انتهى الفعل بحرف e صامت غير ملفوظ، نحذف الـ e ونضع ing:',
          examples: [
            { base: 'make', changed: 'making', ar: 'يصنع' },
            { base: 'write', changed: 'writing', ar: 'يكتب' },
            { base: 'come', changed: 'coming', ar: 'يأتي' },
            { base: 'live', changed: 'living', ar: 'يعيش' },
          ],
        },
        {
          titleAr: '2. مضاعفة الحرف الصحيح الأخير',
          descAr: 'إذا انتهى الفعل بحرف صحيح قبله حرف علة واحد، نكرر الحرف الأخير ونضع ing:',
          examples: [
            { base: 'stop', changed: 'stopping', ar: 'يتوقف' },
            { base: 'sit', changed: 'sitting', ar: 'يجلس' },
            { base: 'swim', changed: 'swimming', ar: 'يسبح' },
            { base: 'run', changed: 'running', ar: 'يركض' },
          ],
        },
        {
          titleAr: '3. حرف y لا يتغير',
          descAr: 'حرف y يبقى كما هو دائماً ونضيف ing مباشرة:',
          examples: [
            { base: 'study', changed: 'studying', ar: 'يدرس' },
            { base: 'stay', changed: 'staying', ar: 'يبقى' },
            { base: 'play', changed: 'playing', ar: 'يلعب' },
          ],
        },
      ],
    },

    examPractice: [
      {
        id: 'pc-q1',
        type: 'transform',
        questionEn: 'The boy plays football. (Change into: Past continuous)',
        questionAr: 'حوّل الجملة إلى الماضي المستمر مع الفاعل المفرد:',
        correctAnswer: 'The boy was playing football.',
        explanationAr: 'الفاعل مفرد (The boy) فيأخذ was ونضيف ing للفعل play فتصبح was playing.',
      },
      {
        id: 'pc-q2',
        type: 'transform',
        questionEn: 'They go to the mall. (Change into: Past continuous)',
        questionAr: 'حوّل الجملة إلى الماضي المستمر مع الفاعل الجمع:',
        correctAnswer: 'They were going to the mall.',
        explanationAr: 'الفاعل جمع (They) فيأخذ were ونضيف ing للفعل go فتصبح were going.',
      },
      {
        id: 'pc-q3',
        type: 'correct',
        questionEn: 'Ali (work) hard yesterday afternoon. (Past continuous)',
        questionAr: 'ضع الفعل بصيغة الماضي المستمر:',
        options: ['was working', 'were working', 'worked'],
        correctAnswer: 'was working',
        explanationAr: 'علي فاعل مفرد فيأخذ was مع فعل مضاف له ing وهو was working.',
      },
      {
        id: 'pc-q4',
        type: 'transform',
        questionEn: 'He was cooking dinner. (Make negative)',
        questionAr: 'انفِ الجملة باستخدام not:',
        correctAnswer: "He wasn't cooking dinner.",
        explanationAr: 'نضع not بعد was مباشرة فتصبح wasn\'t cooking دون حذف ing.',
      },
      {
        id: 'pc-q5',
        type: 'transform',
        questionEn: 'They were studying English. (Make a question)',
        questionAr: 'صغ سؤالاً بتقديم Were:',
        correctAnswer: 'Were they studying English?',
        explanationAr: 'نقدم Were على الفاعل they ونضع علامة الاستفهام في النهاية.',
      },
    ],
  },

  // =========================================================================
  // TOPIC 3: PRESENT SIMPLE (المضارع البسيط)
  // =========================================================================
  {
    id: 'topic-present-simple',
    number: 3,
    titleAr: 'المضارع البسيط',
    titleEn: 'Present Simple Tense',
    taglineAr: 'العادات اليومية والحقائق العامة مع قاعدة s الشخص الثالث والنفي بـ don\'t و doesn\'t',
    category: 'الأزمنة',
    badge: 'أساس المنهاج',
    color: 'blue',
    summaryAr: 'نستخدم زمن المضارع البسيط (Present Simple) للتعبير عن العادات والروتين اليومي والحقائق الثابتة. يأخذ الفعل (s أو es) إذا كان الفاعل مفرداً، ويبقى مجرداً مع الفاعل الجمع والضمير I.',
    topicType: 'tense',
    overview: {
      usageTitleAr: 'متى ولماذا نستخدم زمن المضارع البسيط؟',
      usageDescAr: 'نستخدم المضارع البسيط للتحدث عن:\n1. العادات والنشاطات اليومية المتكررة (Daily Routines): مثل الاستيقاظ والذهاب للمدرسة.\n2. الحقائق الثابتة والعلمية (General Facts): مثل دوران الأرض أو غليان الماء.\n3. الحالات الدائمة (Permanent States): مثل مكان السكن أو العمل.',
      quickNoteAr: 'القاعدة الذهبية: الفاعل المفرد (He, She, It, Ali) يحب حرف (s)، بينما الفاعل الجمع (They, We, You) والضمير (I) يفضلون الفعل المجرد الخالي من الإضافات.',
      spellingTitleAr: 'قواعد إضافة (s / es) الشخص الثالث للفاعل المفرد',
      spellingSubtitleAr: 'أربع حالات إملائية مهمة جداً لأسئلة الإملاء والامتحانات الشهرية',
      timeMarkers: [
        { marker: 'every (day/week/month)', ar: 'كل (يوم/أسبوع/شهر) - أكثر دلالة شائعة', exampleEn: 'I go to school every day.' },
        { marker: 'always / usually / often', ar: 'دائماً / عادةً / غالباً (ظروف التكرار)', exampleEn: 'He always gets up early in the morning.' },
        { marker: 'sometimes / never', ar: 'أحياناً / أبداً', exampleEn: 'They sometimes play football on Fridays.' },
        { marker: 'on Sundays / on Fridays', ar: 'في أيام محددة (تكرار وروتين)', exampleEn: 'We visit our grandparents on Fridays.' },
      ],
      spellingRules: [
        {
          titleAr: '1. القاعدة العامة (معظم الأفعال)',
          descAr: 'نضيف حرف (s) فقط لنهاية معظم الأفعال مع الفاعل المفرد:',
          examples: [
            { base: 'play', changed: 'plays', ar: 'يلعب ➔ يلعب (للمفرد)' },
            { base: 'read', changed: 'reads', ar: 'يقرأ ➔ يقرأ' },
            { base: 'write', changed: 'writes', ar: 'يكتب ➔ يكتب' },
            { base: 'visit', changed: 'visits', ar: 'يزور ➔ يزور' },
          ],
        },
        {
          titleAr: '2. الأفعال المنتهية بـ (ch, sh, ss, x, o, z)',
          descAr: 'نضيف لها (es) لتسهيل النطق:',
          examples: [
            { base: 'watch', changed: 'watches', ar: 'يشاهد ➔ يشاهد (للمفرد)' },
            { base: 'wash', changed: 'washes', ar: 'يغسل ➔ يغسل' },
            { base: 'pass', changed: 'passes', ar: 'يمرر / ينجح ➔ يمرر' },
            { base: 'go', changed: 'goes', ar: 'يذهب ➔ يذهب' },
            { base: 'do', changed: 'does', ar: 'يفعل ➔ يفعل' },
          ],
        },
        {
          titleAr: '3. الأفعال المنتهية بـ y وقبله حرف صحيح',
          descAr: 'نقلب حرف y إلى i ثم نضيف es:',
          examples: [
            { base: 'study', changed: 'studies', ar: 'يدرس ➔ يدرس (للمفرد)' },
            { base: 'fly', changed: 'flies', ar: 'يطير ➔ يطير' },
            { base: 'cry', changed: 'cries', ar: 'يبكي ➔ يبكي' },
          ],
        },
        {
          titleAr: '4. الفعل الشاذ الوحيد في المضارع (have)',
          descAr: 'يتحول have مع الفاعل المفرد (He, She, It) إلى has:',
          examples: [
            { base: 'have', changed: 'has', ar: 'يملك / يتناول ➔ للمفرد has' },
          ],
        },
      ],
      textbookVerbs: [
        { base: 'play', past: 'plays', ar: 'يلعب', type: 'regular', note: 'مفرد: +s' },
        { base: 'watch', past: 'watches', ar: 'يشاهد', type: 'irregular', note: 'ينتهي بـ ch: +es' },
        { base: 'go', past: 'goes', ar: 'يذهب', type: 'irregular', note: 'ينتهي بـ o: +es' },
        { base: 'do', past: 'does', ar: 'يفعل / يعمل', type: 'irregular', note: 'ينتهي بـ o: +es' },
        { base: 'study', past: 'studies', ar: 'يدرس', type: 'irregular', note: 'قلب y إلى i + es' },
        { base: 'have', past: 'has', ar: 'يملك / يتناول', type: 'irregular', note: 'شاذ: have ➔ has' },
        { base: 'help', past: 'helps', ar: 'يساعد', type: 'regular', note: 'مفرد: +s' },
        { base: 'live', past: 'lives', ar: 'يعيش / يسكن', type: 'regular', note: 'مفرد: +s' },
        { base: 'get up', past: 'gets up', ar: 'يستيقظ', type: 'regular', note: 'مفرد: +s' },
      ],
    },
    affirmative: {
      formulaChips: [
        { text: 'الفاعل المفرد (He, She, It, Ali)' },
        { text: '+' },
        { text: 'Verb-(s / es)', isHighlight: true, note: 'إضافة s الشخص الثالث' },
        { text: '+' },
        { text: 'Complement' },
        { text: 'أو' },
        { text: 'الفاعل الجمع و I (They, We, You, I)' },
        { text: '+' },
        { text: 'Base Verb (فعل مجرد)', isHighlight: true, note: 'بدون أي إضافة' },
        { text: '+' },
        { text: 'Complement' },
      ],
      explanationAr: 'في الإثبات، نميز نوع الفاعل أولاً:\n1. إذا كان الفاعل مفرداً (He, She, It أو اسم مفرد مثل Ali, My father)، نضيف للفعل (s أو es).\n2. إذا كان الفاعل جمعاً (They, We, You) أو الضمير (I)، يبقى الفعل مجرداً كما هو.',
      examples: [
        { en: 'Ali plays football in the park every Friday.', ar: 'علي يلعب كرة القدم في المتنزه كل يوم جمعة. (الفاعل مفرد Ali ➔ plays)', highlight: 'plays' },
        { en: 'She watches TV in the evening.', ar: 'هي تشاهد التلفاز في المساء. (الفاعل She ➔ watches)', highlight: 'watches' },
        { en: 'They live in Baghdad.', ar: 'هم يعيشون في بغداد. (الفاعل جمع They ➔ live مجرد)', highlight: 'live' },
        { en: 'I get up at six o\'clock every morning.', ar: 'أنا أستيقظ عند الساعة السادسة كل صباح. (الضمير I ➔ get up مجرد)', highlight: 'get up' },
      ],
      examApplications: [
        {
          id: 'ps-app-1',
          problemEn: 'Huda (go) to school by bus every day. (Correct the verb)',
          instructionAr: 'صحح الفعل بين القوسين لوجود الفاعل المفرد Huda والظرف every day',
          solutionEn: 'Huda goes to school by bus every day.',
          noteAr: 'الفاعل مفرد Huda والزمن مضارع بسيط (every day)، والفعل go ينتهي بـ o فنضيف es فتصبح goes.',
        },
        {
          id: 'ps-app-2',
          problemEn: 'We (plays) tennis on Saturdays. (Correct the mistake)',
          instructionAr: 'صحح الخطأ في الجملة',
          solutionEn: 'We play tennis on Saturdays.',
          noteAr: 'الفاعل جمع (We) لا يقبل s الشخص الثالث، فيجب أن يكون الفعل مجرداً (play).',
        },
      ],
    },
    negative: {
      formulaChips: [
        { text: 'المفرد (He, She, It)' },
        { text: '+' },
        { text: "doesn't (does not)", isHighlight: true },
        { text: '+' },
        { text: 'Base Verb (فعل مجرد)', isHighlight: true, note: 'حذف الـ s إجباري' },
        { text: 'أو' },
        { text: 'الجمع و I (They, We, You, I)' },
        { text: '+' },
        { text: "don't (do not)", isHighlight: true },
        { text: '+' },
        { text: 'Base Verb (فعل مجرد)', isHighlight: true },
      ],
      explanationAr: 'في النفي نستخدم فعلين مساعدين منفيين:\n• نستخدم (doesn\'t) مع الفاعل المفرد (He, She, It)، ويجب إرجاع الفعل الرئيسي إلى مصدر مجرد وحذف الـ s فوراً!\n• نستخدم (don\'t) مع الفاعل الجمع والضمير (I, We, You, They) متبوعاً بفعل مجرد.',
      warningAr: 'أكبر خطأ امتحاني: وضع s بعد doesn\'t (خطأ: He doesn\'t plays ❌ | الصحيح: He doesn\'t play ✔️)',
      examples: [
        { en: 'He doesn\'t like fish.', ar: 'هو لا يحب السمك. (حذفنا s من likes بعد doesn\'t)', highlight: "doesn't like" },
        { en: 'She doesn\'t watch horror films.', ar: 'هي لا تشاهد أفلام الرعب.', highlight: "doesn't watch" },
        { en: 'They don\'t wake up late on weekdays.', ar: 'هم لا يستيقظون متأخرين في أيام الأسبوع.', highlight: "don't wake up" },
        { en: 'I don\'t drink tea at night.', ar: 'أنا لا أشرب الشاي ليلاً.', highlight: "don't drink" },
      ],
      examApplications: [
        {
          id: 'ps-neg-app-1',
          problemEn: 'Zaid speaks French well. (Negative)',
          instructionAr: 'حوّل الجملة إلى نفي',
          solutionEn: 'Zaid doesn\'t speak French well.',
          noteAr: 'الفاعل مفرد Zaid فنضع doesn\'t، ونحذف s الشخص الثالث من speaks فتصبح speak.',
        },
        {
          id: 'ps-neg-app-2',
          problemEn: 'They like fast food. (Change into negative)',
          instructionAr: 'انفِ الجملة',
          solutionEn: 'They don\'t like fast food.',
          noteAr: 'الفاعل جمع They فننفي باستخدام don\'t ويبقى الفعل like مجرداً.',
        },
      ],
    },
    question: {
      formulaChips: [
        { text: 'Does' },
        { text: '+' },
        { text: 'الفاعل المفرد (He, She, It)' },
        { text: '+' },
        { text: 'Base Verb (فعل مجرد)', isHighlight: true },
        { text: '+' },
        { text: '? / أجب بـ Yes/No' },
        { text: 'أو' },
        { text: 'Do' },
        { text: '+' },
        { text: 'الجمع أو you (They, We, You)' },
        { text: '+' },
        { text: 'Base Verb (مجرد)', isHighlight: true },
        { text: '+' },
        { text: '?' },
      ],
      explanationAr: 'لتكوين السؤال بنعم أو لا (Yes / No Question):\n• نبدأ بـ (Does) إذا كان الفاعل مفرداً، ويرجع الفعل لمصدر مجرد.\n• نبدأ بـ (Do) إذا كان الفاعل جمعاً أو you.\nوالإجابات القصيرة:\n- Yes, he does. / No, he doesn\'t.\n- Yes, they do. / No, they don\'t.',
      examples: [
        { en: 'Does Ali live in Basra? — Yes, he does. / No, he doesn\'t.', ar: 'هل يعيش علي في البصرة؟ — نعم / كلا.', highlight: 'Does Ali live' },
        { en: 'Do you study English every day? — Yes, I do.', ar: 'هل تدرس الإنجليزية كل يوم؟ — نعم، أدرس.', highlight: 'Do you study' },
        { en: 'Where does your father work?', ar: 'أين يعمل والدك؟ (سؤال بأداة Where مع does والمجرد work)', highlight: 'Where does your father work' },
        { en: 'What do they do at weekends?', ar: 'ماذا يفعلون في عطلات نهاية الأسبوع؟', highlight: 'What do they do' },
      ],
      examApplications: [
        {
          id: 'ps-q-app-1',
          problemEn: 'Muna helps her mother. (Question)',
          instructionAr: 'حوّل الجملة إلى سؤال',
          solutionEn: 'Does Muna help her mother?',
          noteAr: 'الفاعل مفرد Muna فنبدأ بـ Does، ونحذف الـ s من helps لتصبح help، ونضع علامة الاستفهام (?).',
        },
        {
          id: 'ps-q-app-2',
          problemEn: 'Do they play chess? (Short Answer: Yes)',
          instructionAr: 'أجب إجابة قصيرة بالإثبات',
          solutionEn: 'Yes, they do.',
          noteAr: 'السؤال بدأ بـ Do والفاعل they، فالإجابة القصيرة المثبتة هي: Yes, they do.',
        },
      ],
    },
    examPractice: [
      {
        id: 'ps-p1',
        type: 'choice',
        questionEn: 'My brother ______ to school by bus every day.',
        questionAr: 'اختر الفعل المناسب مع الفاعل المفرد My brother وظرف الزمان every day:',
        options: ['goes', 'go', 'going', 'went'],
        correctAnswer: 'goes',
        explanationAr: 'الفاعل مفرد (My brother) والزمن مضارع بسيط لوجود every day، لذا نختار الفعل المضاف له es وهو (goes).',
      },
      {
        id: 'ps-p2',
        type: 'choice',
        questionEn: 'They ______ like winter because it is cold.',
        questionAr: 'اختر أداة النفي المناسبة للفاعل الجمع They في المضارع البسيط:',
        options: ["don't", "doesn't", "aren't", "isn't"],
        correctAnswer: "don't",
        explanationAr: 'الفاعل جمع (They) لذا ننفي باستخدام (don\'t) متبوعة بفعل مجرد.',
      },
      {
        id: 'ps-p3',
        type: 'correct',
        questionEn: 'Sara (study) English every evening. (Correct the verb)',
        questionAr: 'صحح الفعل بين القوسين مع الفاعل المفرد Sara:',
        options: ['studies', 'study', 'studying'],
        correctAnswer: 'studies',
        explanationAr: 'الفاعل مفرد Sara والفعل study ينتهي بـ y قبله حرف صحيح، فنقلب y إلى i ونضيف es فتصبح (studies).',
      },
      {
        id: 'ps-p4',
        type: 'transform',
        questionEn: 'Ali plays football on Friday. (Negative)',
        questionAr: 'حوّل الجملة إلى نفي:',
        options: ["Ali doesn't play football on Friday.", "Ali don't play football on Friday.", "Ali not plays football on Friday."],
        correctAnswer: "Ali doesn't play football on Friday.",
        explanationAr: 'نضع doesn\'t بعد الفاعل المفرد ونحذف s الشخص الثالث من plays ليصبح مجرداً play.',
      },
      {
        id: 'ps-p5',
        type: 'choice',
        questionEn: '______ your brother speak English well?',
        questionAr: 'اختر الفعل المساعد المناسب للسؤال مع الفاعل المفرد your brother:',
        options: ['Does', 'Do', 'Is', 'Are'],
        correctAnswer: 'Does',
        explanationAr: 'الفاعل مفرد (your brother) لذا نسأل بـ (Does) متبوعاً بفعل مجرد.',
      },
      {
        id: 'ps-p6',
        type: 'choice',
        questionEn: 'He doesn\'t ______ coffee in the morning.',
        questionAr: 'اختر صيغة الفعل الصحيحة بعد أداة النفي doesn\'t:',
        options: ['drink', 'drinks', 'drinking', 'drank'],
        correctAnswer: 'drink',
        explanationAr: 'بعد doesn\'t يجب أن يكون الفعل دائماً في المصدر المجرد الخالي من أي إضافة (drink).',
      },
      {
        id: 'ps-p7',
        type: 'transform',
        questionEn: 'They live in Erbil. (Make a question)',
        questionAr: 'حوّل الجملة إلى سؤال:',
        options: ['Do they live in Erbil?', 'Does they live in Erbil?', 'Are they live in Erbil?'],
        correctAnswer: 'Do they live in Erbil?',
        explanationAr: 'الفاعل جمع They فنبدأ السؤال بـ Do ونضع علامة الاستفهام في النهاية.',
      },
      {
        id: 'ps-p8',
        type: 'choice',
        questionEn: 'Does she have a new car? — Yes, ______.',
        questionAr: 'اختر الإجابة القصيرة الصحيحة:',
        options: ['she does', 'she do', 'she has', 'she is'],
        correctAnswer: 'she does',
        explanationAr: 'السؤال بدأ بـ Does والفاعل she، فتكون الإجابة القصيرة: Yes, she does.',
      },
    ],
  },

  // =========================================================================
  // TOPIC 4: ADVERBS OF FREQUENCY (ظروف التكرار)
  // =========================================================================
  {
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
  },

  // =========================================================================
  // TOPIC 5: POSSESSIVE PRONOUNS (ضمائر التملك)
  // =========================================================================
  {
    id: 'topic-possessive-pronouns',
    number: 5,
    titleAr: 'ضمائر التملك',
    titleEn: 'Possessive Pronouns',
    taglineAr: 'إظهار التملك للمتكلم والمخاطب والغائب (mine, yours, ours...)',
    category: 'الضمائر',
    badge: 'سؤال مؤكد بالامتحان',
    color: 'purple',
    summaryAr: 'ضمائر التملك تُشتق من ضمائر الفاعل وتُستخدم لإظهار ملكية الشيء، وموقعها الشائع يكون في نهاية الجملة بدون ذكر اسم الشيء بعدها.',
    topicType: 'pronouns',
    pronounsTable: [
      {
        subject: 'I (أنا)',
        adjective: 'my (مثال: my car)',
        possessive: 'mine',
        ar: 'لي / ملكي',
        exampleEn: 'This car is mine.',
        exampleAr: 'هذه السيارة لي / ملكي.',
      },
      {
        subject: 'We (نحن)',
        adjective: 'our (مثال: our house)',
        possessive: 'ours',
        ar: 'لنا / ملكنا',
        exampleEn: 'This house is ours.',
        exampleAr: 'هذا المنزل ملكنا.',
      },
      {
        subject: 'You (أنت / أنتم)',
        adjective: 'your (مثال: your bag)',
        possessive: 'yours',
        ar: 'لك / لكم',
        exampleEn: 'That bag is yours.',
        exampleAr: 'تلك الحقيبة هي لك.',
      },
      {
        subject: 'They (هم)',
        adjective: 'their (مثال: their ball)',
        possessive: 'theirs',
        ar: 'لهم / ملكهم',
        exampleEn: 'The ball is theirs.',
        exampleAr: 'الكرة ملكهم.',
      },
      {
        subject: 'He (هو)',
        adjective: 'his (مثال: his pen)',
        possessive: 'his',
        ar: 'له / ملكه',
        exampleEn: 'The pen is his.',
        exampleAr: 'القلم له.',
      },
      {
        subject: 'She (هي)',
        adjective: 'her (مثال: her watch)',
        possessive: 'hers',
        ar: 'لها / ملكها',
        exampleEn: 'The watch is hers.',
        exampleAr: 'الساعة لها.',
      },
      {
        subject: 'It (هو/هي لغير العاقل)',
        adjective: 'its (مثال: its food)',
        possessive: 'its',
        ar: 'له / لها',
        exampleEn: 'The food is its.',
        exampleAr: 'الطعام له.',
      },
    ],
    pronounRules: [
      {
        titleAr: 'الموقع الذهبي لضمير التملك في الجملة',
        descAr: 'يأتي ضمير التملك (mine, yours, hers...) دائماً في نهاية الجملة بعد فعل الكينونة (is / are) متبوعاً بنقطة (.) أو فاصلة (,)، ولا نكتب اسم الشيء الممتلك بعده إطلاقاً، بعكس صفات التملك (my car, her watch).',
        examples: [
          { en: 'This car is mine.', ar: 'هذه السيارة ملكي. (جاءت في نهاية الجملة بعد is)', highlight: 'mine' },
          { en: 'That bag is yours.', ar: 'تلك الحقيبة هي لك. (جاءت في نهاية الجملة بعد is)', highlight: 'yours' },
          { en: 'This house is ours.', ar: 'هذا البيت ملكنا. (جاءت في نهاية الجملة بعد is)', highlight: 'ours' },
        ],
      },
      {
        titleAr: 'الفرق البسيط بين صفة التملك وضمير التملك لطالب الأول متوسط',
        descAr: '• صفة التملك (my, your, her, our, their) ➔ يأتي بعدها اسم الشيء الممتلك (مثل: This is my watch).\n• ضمير التملك (mine, yours, hers, ours, theirs) ➔ يأتي في نهاية الجملة بمفرده بدون اسم (مثل: This watch is mine).',
        examples: [
          { en: 'This is my book.', ar: 'صفة تملك (my) لأن كلمة book جاءت بعدها.', highlight: 'my' },
          { en: 'This book is mine.', ar: 'ضمير تملك (mine) لأنه يقف وحده في نهاية الجملة.', highlight: 'mine' },
        ],
      },
    ],
    pronounApplications: [
      {
        id: 'app-pr-1',
        problemEn: 'Sameera lost her watch yesterday. I think this is ________. (her / hers / she)',
        instructionAr: 'كتاب النشاط ص 8 - اختر ضمير التملك المناسب بعد فعل الكينونة is في نهاية الجملة:',
        solutionEn: 'Sameera lost her watch yesterday. I think this is hers.',
        solutionTokens: [
          { text: 'Sameera lost her watch yesterday. I think this is' },
          { text: 'hers.', isChanged: true },
        ],
        dissection: [
          { label: 'المالك (Owner)', value: 'Sameera ➔ مفرد مؤنث (She)', color: 'blue' },
          { label: 'الشيء المفقود', value: 'her watch ➔ ساعتها', color: 'purple' },
          { label: 'موقع الفراغ', value: 'نهاية الجملة بعد is ومتبوع بنقطة (.)', color: 'amber' },
          { label: 'القاعدة الذهبية', value: 'نهاية الجملة بدون اسم ➔ ضمير تملك (hers)', color: 'emerald' },
        ],
        cumulativeSteps: [
          {
            stepNumber: 1,
            titleAr: 'الخطوة 1: تحديد المالك في الجملة الأولى (سميرة)',
            explanationAr: 'المالك المذكور هو سميرة (Sameera) وهي مفرد مؤنث غائب يعوض عنها بضمير الفاعل (She).',
            sentenceProgress: 'Sameera ... (She)',
            highlightToken: 'Sameera',
          },
          {
            stepNumber: 2,
            titleAr: 'الخطوة 2: فحص موقع الفراغ ونهاية الجملة',
            explanationAr: 'الفراغ جاء في نهاية الجملة تماماً بعد فعل الكينونة is ومتبوعاً بنقطة (.) بدون ذكر اسم الساعة watch.',
            sentenceProgress: 'I think this is [ .... ] .',
            highlightToken: 'is',
          },
          {
            stepNumber: 3,
            titleAr: 'الخطوة 3: اختيار ضمير التملك المناسب المشتق من She',
            explanationAr: 'ضمير التملك الخاص بالمؤنث She والذي يأتي منفرداً في نهاية الجملة هو hers.',
            sentenceProgress: 'Sameera lost her watch yesterday. I think this is hers.',
            highlightToken: 'hers',
          },
        ],
        actionStepAr: 'الفراغ في نهاية الجملة بعد is متبوع بنقطة، فنختار hers ولا نختار her لأن her تحتاج اسماً بعدها.',
        noteAr: 'صفة التملك her تأتي قبل الاسم (مثل her watch)، بينما ضمير التملك hers يأتي في نهاية الجملة منفرداً ليعوض عن الاسم كاملاً.',
      },
      {
        id: 'app-pr-2',
        problemEn: 'Bilal, I think this book is ________. You left it in my house. (your / yours / you)',
        instructionAr: 'كتاب النشاط ص 8 - اختر ضمير التملك للمخاطب في نهاية الجملة الأولى:',
        solutionEn: 'Bilal, I think this book is yours. You left it in my house.',
        solutionTokens: [
          { text: 'Bilal, I think this book is' },
          { text: 'yours.', isChanged: true },
          { text: 'You left it in my house.' },
        ],
        dissection: [
          { label: 'المخاطب (Addressee)', value: 'Bilal, ➔ نخاطبه بضمير (You)', color: 'blue' },
          { label: 'الدليل في الجملة', value: 'You left it ➔ أنت تركته', color: 'purple' },
          { label: 'موقع الفراغ', value: 'نهاية الجملة الأولى بعد is وقبل النقطة', color: 'amber' },
          { label: 'القاعدة الذهبية', value: 'المخاطب You في نهاية الجملة ➔ yours', color: 'emerald' },
        ],
        cumulativeSteps: [
          {
            stepNumber: 1,
            titleAr: 'الخطوة 1: تحديد المخاطب (بلال)',
            explanationAr: 'الكلام موجه لبلال بضمير المخاطب You بدليل الجملة التوضيحية (You left it in my house).',
            sentenceProgress: 'Bilal, ... (You)',
            highlightToken: 'Bilal',
          },
          {
            stepNumber: 2,
            titleAr: 'الخطوة 2: فحص موقع الفراغ',
            explanationAr: 'الفراغ وقع في نهاية الجملة الأولى بعد is ومتبوعاً بنقطة (.) دون ذكر كلمة book بعده.',
            sentenceProgress: 'Bilal, I think this book is [ .... ] .',
            highlightToken: 'is',
          },
          {
            stepNumber: 3,
            titleAr: 'الخطوة 3: اختيار ضمير التملك للمخاطب',
            explanationAr: 'ضمير التملك المشتق من You والذي يقف وحده في نهاية الجملة هو yours.',
            sentenceProgress: 'Bilal, I think this book is yours. You left it in my house.',
            highlightToken: 'yours',
          },
        ],
        actionStepAr: 'نختار yours (مع حرف s) في نهاية الجملة، ولا نختار your لأن your تحتاج اسماً بعدها.',
        noteAr: 'ضمير التملك للمخاطب You هو yours، ونميزه بوجود حرف s في نهايته عندما يقع في آخر الجملة.',
      },
      {
        id: 'app-pr-3',
        problemEn: 'We took that ball to the beach. It\'s ________, but those boys think it\'s ________. (ours / theirs)',
        instructionAr: 'كتاب النشاط ص 8 - اختر ضميري التملك المناسبين للطرفين مع أداة التناقض but:',
        solutionEn: 'We took that ball to the beach. It\'s ours, but those boys think it\'s theirs.',
        solutionTokens: [
          { text: 'We took that ball to the beach. It\'s' },
          { text: 'ours,', isChanged: true },
          { text: 'but those boys think it\'s' },
          { text: 'theirs.', isChanged: true },
        ],
        dissection: [
          { label: 'الشطر الأول (نحن)', value: 'We ➔ ضمير التملك التابع له (ours)', color: 'blue' },
          { label: 'الشطر الثاني (الأولاد)', value: 'those boys ➔ جمع غائب (They ➔ theirs)', color: 'purple' },
          { label: 'أداة الربط', value: 'but ➔ تفيد التناقض بين الملكيتين', color: 'amber' },
          { label: 'موقع الفراغين', value: 'كلاهما بعد فعل الكينونة وبدون اسم بعدهما', color: 'emerald' },
        ],
        cumulativeSteps: [
          {
            stepNumber: 1,
            titleAr: 'الخطوة 1: حل الفراغ الأول (ملكنا نحن We)',
            explanationAr: 'الفاعل في الشطر الأول هو We (نحن)، فضمير التملك التابع له بعد It\'s هو ours.',
            sentenceProgress: 'It\'s ours, ...',
            highlightToken: 'ours',
          },
          {
            stepNumber: 2,
            titleAr: 'الخطوة 2: حل الفراغ الثاني (ملك أولئك الأولاد)',
            explanationAr: 'الفاعل في الشطر الثاني هم الأولاد those boys (جمع غائب They)، فضمير التملك بعد think it\'s هو theirs.',
            sentenceProgress: '... but those boys think it\'s theirs.',
            highlightToken: 'theirs',
          },
          {
            stepNumber: 3,
            titleAr: 'الخطوة 3: قراءة الجملة المتكاملة وربطها بـ but',
            explanationAr: 'أخذنا الكرة للشاطئ: هي ملكنا (ours)، لكن الأولاد يعتقدون أنها ملكهم (theirs).',
            sentenceProgress: 'We took that ball to the beach. It\'s ours, but those boys think it\'s theirs.',
            highlightToken: 'ours ... theirs',
          },
        ],
        actionStepAr: 'الفراغ الأول يأخذ ours (عائد على We)، والفراغ الثاني يأخذ theirs (عائد على those boys).',
        noteAr: 'كلا الضميرين ينتهيان بحرف s (ours و theirs) لأن كلاً منهما يقف منفرداً في نهاية عبارته دون تكرار كلمة ball.',
      },
      {
        id: 'app-pr-4',
        problemEn: 'Hala doesn\'t have a radio, so I lent her ________. (my / mine / me)',
        instructionAr: 'كتاب النشاط ص 8 - اختر ضمير التملك للمتكلم I في نهاية الجملة:',
        solutionEn: 'Hala doesn\'t have a radio, so I lent her mine.',
        solutionTokens: [
          { text: 'Hala doesn\'t have a radio, so I lent her' },
          { text: 'mine.', isChanged: true },
        ],
        dissection: [
          { label: 'الفاعل والمُعير', value: 'I lent her ➔ أنا أعرتها (المتكلم I)', color: 'blue' },
          { label: 'الموقف', value: 'Hala doesn\'t have a radio ➔ هالة لا تملك راديو', color: 'purple' },
          { label: 'موقع الفراغ', value: 'نهاية الجملة بعد lent her متبوع بنقطة', color: 'amber' },
          { label: 'القاعدة الذهبية', value: 'ضمير التملك لـ I في نهاية الجملة ➔ mine', color: 'emerald' },
        ],
        cumulativeSteps: [
          {
            stepNumber: 1,
            titleAr: 'الخطوة 1: تحديد الفاعل المعير (صاحب الشيء الأصلي)',
            explanationAr: 'الفاعل الذي قام بالإعارة هو أنا المتكلم (I) بدليل عبارة (so I lent her).',
            sentenceProgress: 'so I lent her ... (I)',
            highlightToken: 'I',
          },
          {
            stepNumber: 2,
            titleAr: 'الخطوة 2: فحص موقع الفراغ في نهاية الجملة',
            explanationAr: 'جاء الفراغ في نهاية الجملة متبوعاً بنقطة (.) دون تكرار كلمة radio لمنع التكرار.',
            sentenceProgress: 'so I lent her [ .... ] .',
            highlightToken: 'lent her',
          },
          {
            stepNumber: 3,
            titleAr: 'الخطوة 3: اختيار ضمير التملك الشاذ التابع لـ I',
            explanationAr: 'ضمير التملك المشتق من I والذي يحل محل (my radio) في نهاية الجملة هو mine.',
            sentenceProgress: 'Hala doesn\'t have a radio, so I lent her mine.',
            highlightToken: 'mine',
          },
        ],
        actionStepAr: 'نختار mine في نهاية الجملة لتعني (ما أملكه / راديوي)، ولا نختار my لأن my تحتاج اسماً بعدها.',
        noteAr: 'ضمير التملك mine شاذ ولا ينتهي بـ s، ويأتي دائماً في نهاية الجملة منفرداً ليعوض عن (my + اسم).',
      },
      {
        id: 'app-pr-5',
        problemEn: 'This blue bicycle belongs to Ahmed. It is ________. (his / him / he)',
        instructionAr: 'امتحانات شهرية - اختر ضمير التملك للمذكر الغائب Ahmed في نهاية الجملة:',
        solutionEn: 'This blue bicycle belongs to Ahmed. It is his.',
        solutionTokens: [
          { text: 'This blue bicycle belongs to Ahmed. It is' },
          { text: 'his.', isChanged: true },
        ],
        dissection: [
          { label: 'المالك (Owner)', value: 'Ahmed ➔ مفرد مذكر غائب (He)', color: 'blue' },
          { label: 'الشيء الممتلك', value: 'This blue bicycle ➔ الدراجة الزرقاء', color: 'purple' },
          { label: 'موقع الفراغ', value: 'في نهاية الجملة بعد It is ومتبوع بنقطة', color: 'amber' },
          { label: 'القاعدة الذهبية', value: 'ضمير التملك المشتق من He هو his', color: 'emerald' },
        ],
        cumulativeSteps: [
          {
            stepNumber: 1,
            titleAr: 'الخطوة 1: تحديد المالك (أحمد)',
            explanationAr: 'المالك هو أحمد (Ahmed) وهو مفرد مذكر غائب يعوض عنه بالضمير (He).',
            sentenceProgress: 'Ahmed ➔ (He)',
            highlightToken: 'Ahmed',
          },
          {
            stepNumber: 2,
            titleAr: 'الخطوة 2: فحص موقع الفراغ',
            explanationAr: 'الفراغ جاء في نهاية الجملة بعد It is متبوعاً بنقطة (.) دون ذكر كلمة bicycle.',
            sentenceProgress: 'It is [ .... ] .',
            highlightToken: 'It is',
          },
          {
            stepNumber: 3,
            titleAr: 'الخطوة 3: اختيار الضمير المناسب',
            explanationAr: 'ضمير التملك المشتق من He هو his ويبقى كما هو بحرف s.',
            sentenceProgress: 'This blue bicycle belongs to Ahmed. It is his.',
            highlightToken: 'his',
          },
        ],
        actionStepAr: 'أحمد مذكر مفرد غائب (He)، وضمير التملك التابع له هو his.',
        noteAr: 'ضمير التملك his ينتهي بحرف s أصلاً، لذلك يبقى his سواء كان صفة تملك أو ضمير تملك.',
      },
      {
        id: 'app-pr-6',
        problemEn: 'I : mine ; they : ________. (Spelling / Complete)',
        instructionAr: 'فرع الإملاء الشهري - أكمل التحويل بنفس نمط ضمائر التملك:',
        solutionEn: 'I : mine ; they : theirs',
        solutionTokens: [
          { text: 'I : mine ; they :' },
          { text: 'theirs', isChanged: true },
        ],
        dissection: [
          { label: 'النموذج المعطى', value: 'I ➔ mine (تحويل الفاعل إلى ضمير تملك)', color: 'blue' },
          { label: 'المطلوب تحويله', value: 'they ➔ ضمير الفاعل الجمع (هم)', color: 'purple' },
          { label: 'الفرع الامتحاني', value: 'سؤال الإملاء والتحويلات (Spelling)', color: 'amber' },
          { label: 'القاعدة الذهبية', value: 'they تصبح theirs بإضافة s', color: 'emerald' },
        ],
        cumulativeSteps: [
          {
            stepNumber: 1,
            titleAr: 'الخطوة 1: قراءة النمط المعطى في السؤال',
            explanationAr: 'المعطى هو تحويل ضمير الفاعل I إلى ضمير التملك mine.',
            sentenceProgress: 'I ➔ mine',
            highlightToken: 'mine',
          },
          {
            stepNumber: 2,
            titleAr: 'الخطوة 2: تطبيق نفس القاعدة على ضمير الفاعل they',
            explanationAr: 'ضمير التملك المشتق من they هو theirs بحرف s في النهاية.',
            sentenceProgress: 'they ➔ theirs',
            highlightToken: 'theirs',
          },
        ],
        actionStepAr: 'ضمير التملك المشتق من they هو theirs بحرف s في النهاية.',
        noteAr: 'هذا النمط يتكرر دائماً في فرع الإملاء بالامتحانات الشهرية للأول متوسط، ركز على حفظ إملاء theirs جيداً.',
      },
    ],
    examPractice: [
      {
        id: 'pr-q1',
        type: 'choice',
        questionEn: 'Sameera lost her watch yesterday. I think this is ______.',
        questionAr: 'فقدت سميرة ساعتها، أعتقد أن هذه الساعة لها:',
        options: ['hers', 'her', 'she', 'herself'],
        correctAnswer: 'hers',
        explanationAr: 'سميرة فتاة مؤنثة (She)، وضمير التملك الذي يأتي في نهاية الجملة بدون اسم بعده هو (hers).'
      },
      {
        id: 'pr-q2',
        type: 'choice',
        questionEn: 'Bilal, I think this book is ______. You left it in my house.',
        questionAr: 'يا بلال، أعتقد أن هذا الكتاب لك:',
        options: ['yours', 'your', 'you', 'yourselves'],
        correctAnswer: 'yours',
        explanationAr: 'نخاطب بلال (You)، وضمير التملك في نهاية الجملة هو (yours).'
      },
      {
        id: 'pr-q3',
        type: 'choice',
        questionEn: 'We took that ball to the beach. It\'s ______, but those boys think it\'s theirs.',
        questionAr: 'أخذنا الكرة للشاطئ، إنها ملكنا (نحن We):',
        options: ['ours', 'our', 'us', 'we'],
        correctAnswer: 'ours',
        explanationAr: 'الفاعل نحن (We)، وضمير التملك الخاص بنا هو (ours).'
      },
      {
        id: 'pr-q4',
        type: 'choice',
        questionEn: 'Hala doesn\'t have a radio, so I lent her ______.',
        questionAr: 'هالة لا تملك مذياعاً، لذا أعرتها مذياعي (أنا I):',
        options: ['mine', 'my', 'me', 'I'],
        correctAnswer: 'mine',
        explanationAr: 'أنا المتكلم (I)، وضمير التملك المناسب في نهاية الجملة هو (mine).'
      },
      {
        id: 'pr-q5',
        type: 'choice',
        questionEn: 'This blue bicycle belongs to Ahmed. It is ______.',
        questionAr: 'هذه الدراجة لأحمد (هو He):',
        options: ['his', 'him', 'he', 'its'],
        correctAnswer: 'his',
        explanationAr: 'أحمد مذكر مفرد (He)، وضمير التملك له هو (his).'
      }
    ]
  },

  // =========================================================================
  // TOPIC 6: JOINING SENTENCES (أدوات الربط)
  // =========================================================================
  {
    id: 'topic-joining-sentences',
    number: 6,
    titleAr: 'أدوات الربط',
    titleEn: 'Joining Sentences: and / but / or',
    taglineAr: 'دمج الجمل وتوضيح العلاقة بين الأفكار',
    category: 'أدوات الربط',
    badge: 'سهل ومضمون',
    color: 'amber',
    summaryAr: 'نستخدم أدوات الربط (and, but, or) لجمع جملتين في جملة واحدة واضحة، حيث تعبر كل أداة عن معنى محدد (التشابه، التناقض، أو التخيير).',
    topicType: 'connectors',
    connectorsList: [
      {
        name: 'and (و)',
        meaningAr: 'تفيد العطف والجمع بين فكرتين متشابهتين أو متوافقتين',
        functionAr: 'نربط بها جملتين إيجابيتين لا يوجد بينهما تناقض.',
        examples: [
          {
            en: 'The burger was huge. It was delicious. ➔ The burger was huge and it was delicious.',
            ar: 'كانت الشطيرة ضخمة ولذيذة.',
            highlight: 'and'
          },
          {
            en: 'The dress was beautiful. It was expensive. ➔ The dress was beautiful and it was expensive.',
            ar: 'كان الفستان جميلاً وكان غالياً.',
            highlight: 'and'
          }
        ]
      },
      {
        name: 'but (لكن)',
        meaningAr: 'تفيد التناقض بين فكرتين مختلفتين',
        functionAr: 'نربط بها جملتين إحداهما إيجابية والأخرى سلبية، وغالباً ما تأتي مع نفي (not / isn\'t / didn\'t).',
        examples: [
          {
            en: 'John is poor. He isn\'t sad. ➔ John is poor but he isn\'t sad.',
            ar: 'جون فقير، لكنه ليس حزيناً. (تناقض مع وجود نفي isn\'t)',
            highlight: 'but'
          },
          {
            en: 'I saw a football match. I didn\'t like it. ➔ I saw a football match but I didn\'t like it.',
            ar: 'شاهدت مباراة كرة قدم، لكني لم أحبها. (تناقض مع نفي didn\'t)',
            highlight: 'but'
          }
        ]
      },
      {
        name: 'or (أو)',
        meaningAr: 'تفيد التخيير بين أمرين أو أكثر',
        functionAr: 'تُستخدم للاختيار بين أمرين، وعند دمج جملتين نحذف الكلمات المكررة ونضع or بين الشيئين.',
        examples: [
          {
            en: 'Do you want fish for dinner? Do you want meat for dinner? ➔ Do you want fish or meat for dinner?',
            ar: 'هل تريد سمكاً أم لحماً للعشاء؟ (حذفنا التكرار Do you want ... for dinner)',
            highlight: 'or'
          },
          {
            en: 'You can have tea or coffee.',
            ar: 'يمكنك شرب الشاي أو القهوة.',
            highlight: 'or'
          }
        ]
      }
    ],
    examPractice: [
      {
        id: 'js-q1',
        type: 'choice',
        questionEn: 'The burger was huge ______ it was delicious.',
        questionAr: 'اختر أداة الربط المناسبة لفكرتين متوافقتين ولذيذتين:',
        options: ['and', 'but', 'or', 'so'],
        correctAnswer: 'and',
        explanationAr: 'الفكرتان متوافقتان وإيجابيتان (ضخمة ولذيذة)، لذا نستخدم أداة العطف (and).'
      },
      {
        id: 'js-q2',
        type: 'choice',
        questionEn: 'John is poor ______ he isn\'t sad.',
        questionAr: 'اختر أداة الربط المناسبة (لاحظ وجود تناقض ونفي isn\'t):',
        options: ['but', 'and', 'or', 'because'],
        correctAnswer: 'but',
        explanationAr: 'يوجد تناقض بين الفقر وعدم الحزن مع وجود نفي، لذا نختار (but) وتعني لكن.'
      },
      {
        id: 'js-q3',
        type: 'choice',
        questionEn: 'Do you want fish ______ meat for dinner?',
        questionAr: 'اختر أداة الربط المناسبة للتخيير بين وجبتين:',
        options: ['or', 'but', 'and', 'yet'],
        correctAnswer: 'or',
        explanationAr: 'السؤال يخير بين السمك أو اللحم، فنستخدم أداة التخيير (or).'
      },
      {
        id: 'js-q4',
        type: 'choice',
        questionEn: 'I saw a football match ______ I didn\'t like it.',
        questionAr: 'شاهدت المباراة، ______ لم تعجبني (تناقض):',
        options: ['but', 'and', 'or', 'so'],
        correctAnswer: 'but',
        explanationAr: 'جملة إيجابية تليها جملة منفية (didn\'t like it) تدل على التناقض، فالجواب هو (but).'
      },
      {
        id: 'js-q5',
        type: 'choice',
        questionEn: 'The dress was beautiful ______ it was expensive.',
        questionAr: 'كان الفستان جميلاً ______ كان غالياً:',
        options: ['and', 'but', 'or', 'if'],
        correctAnswer: 'and',
        explanationAr: 'كلا الصفتين تصفان الفستان بدون نفي، لذا نربطهما بـ (and).'
      }
    ]
  },

  // =========================================================================
  // TOPIC 7: TALKING ABOUT INTERESTS (التعبير عن الاهتمام)
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
  }
];
