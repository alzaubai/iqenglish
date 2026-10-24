
export interface AhmedStoryScene {
  id: string;
  sceneNumber: number;
  titleEn: string;
  titleAr: string;
  textEn: string;
  textAr: string;
  imageUrl: string;
  audioFileUrl: string;
  timeContext?: string;
  keyVocabulary: { word: string; meaningAr: string }[];
}

export interface AhmedComprehensionQuestion {
  id: string;
  number: number;
  questionEn: string;
  questionAr: string;
  correctAnswer: string;
  acceptableAnswers: string[];
  options: string[];
  explanationAr: string;
  sceneRef: number;
}

export interface TrueFalseQuestionItem {
  id: string;
  number: number;
  statementEn: string;
  statementAr: string;
  correctAnswer: 'True' | 'False';
  explanationAr: string;
  audioQuoteEn: string;
}

export interface GuidedNoteField {
  id: string;
  questionEn: string;
  questionAr: string;
  fieldLabel: string;
  placeholderEn: string;
  sampleAnswers: string[];
}

export interface PartnerInterviewTurn {
  id: string;
  questionNumber: number;
  questionEn: string;
  questionAr: string;
  modelNote: string;
  sampleResponseEn: string;
  suggestedNotes: string[];
}

export interface VerbActivityCollocation {
  id: string;
  verbPast: string;
  verbPresent: string;
  verbAr: string;
  activityEn: string;
  activityAr: string;
  fullSentenceEn: string;
}

export const lesson7ActivityData = {
  // AB Page 16 - Exercise C: True or False on Sana's special day (Track 11)
  page16ExCTrueFalse: {
    titleEn: 'Exercise C: True or False? Tick (✓)',
    titleAr: 'تمرين C: صح أو خطأ حول يوم سناء المميز (ص 16)',
    instructionEn: 'Listen to Track 11 and decide if each statement is True (T) or False (F).',
    instructionAr: 'استمع إلى التسجيل 11 وحدد ما إذا كانت كل عبارة صحيحة (True) أم خاطئة (False):',
    audioTrackNumber: 11,
    audioFileUrl: '/audio/lesson-7/track11-full.mp3',
    transcriptSnippet: "I had a fantastic day yesterday. I spent the day with my friends... In the morning, we went fishing. We did not catch any fish, but it was very relaxing. Then we walked along the seashore and found some beautiful seashells. I took some pictures of the boats in the sea... In the afternoon, my friends and I played football in the park and then listened to some music.",
    questions: [
      {
        id: 'tf-1',
        number: 1,
        statementEn: 'Sana spent the day with her family.',
        statementAr: 'قضت سناء اليوم بصحبة عائلتها.',
        correctAnswer: 'False',
        explanationAr: 'خطأ (False): سناء قالت بوضوح "I spent the day with my friends" (قضيت اليوم مع صديقاتي) وليس مع عائلتها.',
        audioQuoteEn: 'I spent the day with my friends.',
      },
      {
        id: 'tf-2',
        number: 2,
        statementEn: 'In the morning, they went fishing.',
        statementAr: 'في الصباح، ذهبوا لصيد الأسماك.',
        correctAnswer: 'True',
        explanationAr: 'صح (True): قالت سناء "In the morning, we went fishing" (في الصباح ذهبنا لصيد السمك).',
        audioQuoteEn: 'In the morning, we went fishing.',
      },
      {
        id: 'tf-3',
        number: 3,
        statementEn: 'She caught a lot of fish.',
        statementAr: 'اصطادت سناء الكثير من الأسماك.',
        correctAnswer: 'False',
        explanationAr: 'خطأ (False): ذكرت سناء "We did not catch any fish" (لم نصطد أي سمكة).',
        audioQuoteEn: 'We did not catch any fish, but it was very relaxing.',
      },
      {
        id: 'tf-4',
        number: 4,
        statementEn: 'She took pictures of the boats in the sea.',
        statementAr: 'التقطت سناء صوراً للقوارب في البحر.',
        correctAnswer: 'True',
        explanationAr: 'صح (True): ذكرت سناء "I took some pictures of the boats in the sea".',
        audioQuoteEn: 'I took some pictures of the boats in the sea.',
      },
      {
        id: 'tf-5',
        number: 5,
        statementEn: 'She played tennis in the park.',
        statementAr: 'لعبت سناء التنس في المتنزه.',
        correctAnswer: 'False',
        explanationAr: 'خطأ (False): سناء وصديقاتها لعبن كرة القدم "played football in the park" وليس التنس.',
        audioQuoteEn: 'My friends and I played football in the park.',
      },
      {
        id: 'tf-6',
        number: 6,
        statementEn: 'She listened to some music.',
        statementAr: 'استمعت سناء إلى بعض الموسيقى في فترة بعد الظهر.',
        correctAnswer: 'True',
        explanationAr: 'صح (True): قالت سناء "and then listened to some music" (ثم استمعنا إلى بعض الموسيقى).',
        audioQuoteEn: 'and then listened to some music.',
      },
    ] as TrueFalseQuestionItem[],
  },

  // AB Page 16 - Exercise D: Think about a special day. Make notes about it
  page16ExDMakeNotes: {
    titleEn: 'Exercise D: Think about a special day. Make notes about it',
    titleAr: 'تمرين D: فكّر في يوم مميز ودوّن ملاحظاتك عنه (ص 16)',
    instructionEn: 'Plan notes about a memorable day in your life using the guiding questions:',
    instructionAr: 'دوّن ملاحظاتك عن يوم لا يُنسى مررت به للإجابة عن الأسئلة التوجيهية:',
    fields: [
      {
        id: 'note-when',
        questionEn: 'When was it?',
        questionAr: 'متى كان هذا اليوم؟',
        fieldLabel: 'Time / Date (الزمان)',
        placeholderEn: 'e.g. Last Friday / In the summer holiday',
        sampleAnswers: ['Last Friday', 'During the mid-year holiday', 'On my birthday last month'],
      },
      {
        id: 'note-where',
        questionEn: 'Where did you go?',
        questionAr: 'أين ذهبت؟',
        fieldLabel: 'Place (المكان)',
        placeholderEn: 'e.g. To the amusement park / To the lake',
        sampleAnswers: ['To the amusement park in Baghdad', 'To the lake in Habbaniya', 'To my uncle’s farm in the countryside'],
      },
      {
        id: 'note-who',
        questionEn: 'Who did you go with?',
        questionAr: 'مع من ذهبت؟',
        fieldLabel: 'Companions (المرافقون)',
        placeholderEn: 'e.g. With my family / With my best friends',
        sampleAnswers: ['With my family and cousins', 'With my school friends', 'With my parents and younger brother'],
      },
      {
        id: 'note-what-do',
        questionEn: 'What did you do?',
        questionAr: 'ماذا فعلت هناك؟',
        fieldLabel: 'Activities (الأنشطة التي قمت بها)',
        placeholderEn: 'e.g. We had a picnic, rode horses, and took photos',
        sampleAnswers: [
          'We rode the big wheel, played games, and took lots of photographs',
          'We swam in the pool, had a barbecue, and played football',
          'We walked in the fields, picked fresh fruit, and flew kites',
        ],
      },
      {
        id: 'note-eat',
        questionEn: 'What did you eat?',
        questionAr: 'ماذا أكلت وشربت؟',
        fieldLabel: 'Food & Drinks (الطعام والشراب)',
        placeholderEn: 'e.g. Grilled kebab, fresh salad, and orange juice',
        sampleAnswers: [
          'Grilled kebab, fresh bread, and fruit juice',
          'Pizza, French fries, and ice cream',
          'Barbecue chicken, salad, and cold lemonade',
        ],
      },
      {
        id: 'note-feel',
        questionEn: 'How did you feel?',
        questionAr: 'كيف كان شعورك في ذلك اليوم؟',
        fieldLabel: 'Feelings (المشاعر)',
        placeholderEn: 'e.g. I felt fantastic and very happy',
        sampleAnswers: [
          'I felt fantastic and really excited',
          'It was very relaxing and I was so happy',
          'We were tired but we had wonderful fun',
        ],
      },
    ] as GuidedNoteField[],

    modelPlans: [
      {
        titleAr: 'النموذج 1: نزهة عائلية في المتنزه',
        titleEn: 'Model 1: Family Picnic in the Park',
        when: 'Last Friday',
        where: 'To Al-Zawraa Park in Baghdad',
        who: 'With my parents and sisters',
        whatDo: 'Walked in the gardens, played football, and took photos',
        eat: 'Grilled kebab, fresh fruit, and juice',
        feel: 'I felt so happy and cheerful',
      },
      {
        titleAr: 'النموذج 2: رحلة إلى البحيرة مع الأصدقاء',
        titleEn: 'Model 2: Lake Trip with Friends',
        when: 'In the spring holiday',
        where: 'To Lake Habbaniya',
        who: 'With my best friends Ali and Omar',
        whatDo: 'Went fishing, walked on the shore, and listened to music',
        eat: 'Fried fish, bread, and cold drinks',
        feel: 'It was very relaxing and memorable',
      },
    ],
  },

  // AB Page 16 - Exercise E: Ask your partner about their special day
  page16ExEPartnerInterview: {
    titleEn: 'Exercise E: Ask your partner about their special day. Make notes',
    titleAr: 'تمرين E: اسأل زميلك عن يومه المميز ودوّن ملاحظاتك عنه (ص 16)',
    instructionEn: 'Ask your partner these 6 questions about their memorable day and write brief notes in English:',
    instructionAr: 'وجّه هذه الأسئلة الستة لزميلك ودوّن ملاحظات مختصرة عن إجاباته باللغة الإنجليزية كما في كتاب النشاط:',
    turns: [
      {
        id: 'q-1',
        questionNumber: 1,
        questionEn: 'When was your special day?',
        questionAr: 'متى كان يومك المميز؟',
        modelNote: 'Last Friday during the weekend',
        sampleResponseEn: 'It was last Friday during the weekend.',
        suggestedNotes: [
          'Last Friday',
          'During the spring holiday',
          'On my last birthday',
        ],
      },
      {
        id: 'q-2',
        questionNumber: 2,
        questionEn: 'Where did you go?',
        questionAr: 'أين ذهبت؟ ومع من؟',
        modelNote: 'Amusement park with cousins',
        sampleResponseEn: 'I went to the amusement park with my cousins.',
        suggestedNotes: [
          'To the amusement park with cousins',
          'To the national park with family',
          'To the seaside with friends',
        ],
      },
      {
        id: 'q-3',
        questionNumber: 3,
        questionEn: 'What did you do there?',
        questionAr: 'ماذا فعلت هناك؟',
        modelNote: 'Rode the roller coaster and took photos',
        sampleResponseEn: 'We played games, rode the roller coaster, and took pictures.',
        suggestedNotes: [
          'Rode the roller coaster and took photos',
          'Went fishing and walked on the shore',
          'Played football and listened to music',
        ],
      },
      {
        id: 'q-4',
        questionNumber: 4,
        questionEn: 'What did you eat?',
        questionAr: 'ماذا تناولت من طعام ومشروبات؟',
        modelNote: 'Burgers, fries, and fresh lemonade',
        sampleResponseEn: 'We ate delicious burgers and had fresh lemonade.',
        suggestedNotes: [
          'Burgers and fresh lemonade',
          'Grilled kebab and orange juice',
          'Pizza and ice cream',
        ],
      },
      {
        id: 'q-5',
        questionNumber: 5,
        questionEn: 'How did you feel about it?',
        questionAr: 'وكيف كان شعورك في نهاية ذلك اليوم؟',
        modelNote: 'Fantastic and extremely happy',
        sampleResponseEn: 'It was fantastic! I felt extremely happy and energetic.',
        suggestedNotes: [
          'Fantastic and really excited',
          'Very happy and relaxed',
          'Tired but had great fun',
        ],
      },
    ] as PartnerInterviewTurn[],
  },

  // AB Page 15 - Exercise A: Collocations & Past Simple Activity Verbs
  page15ExACollocations: {
    titleEn: 'Exercise A: Past Action Verbs & Activities',
    titleAr: 'تمرين A: مطابقة أفعال الماضي مع أنشطة اليوم المميز (ص 15)',
    instructionEn: 'Match each past tense verb with its correct activity phrase from the lesson:',
    instructionAr: 'طابق كل فعل من أفعال الماضي البسيط مع العبارة والنشاط المناسب له من درس يوم سناء:',
    pairs: [
      {
        id: 'pair-went',
        verbPast: 'went',
        verbPresent: 'go',
        verbAr: 'ذهبَ',
        activityEn: 'fishing in the morning',
        activityAr: 'لصيد السمك في الصباح',
        fullSentenceEn: 'In the morning, we went fishing.',
      },
      {
        id: 'pair-walked',
        verbPast: 'walked',
        verbPresent: 'walk',
        verbAr: 'مشى / سارَ',
        activityEn: 'along the seashore',
        activityAr: 'بمحاذاة شاطئ البحر',
        fullSentenceEn: 'Then we walked along the seashore.',
      },
      {
        id: 'pair-found',
        verbPast: 'found',
        verbPresent: 'find',
        verbAr: 'عثرَ على / وجدَ',
        activityEn: 'some beautiful seashells',
        activityAr: 'بعض الأصداف البحرية الجميلة',
        fullSentenceEn: 'We found some beautiful seashells.',
      },
      {
        id: 'pair-took',
        verbPast: 'took',
        verbPresent: 'take',
        verbAr: 'التقطَ (صوراً)',
        activityEn: 'pictures of the boats in the sea',
        activityAr: 'صوراً للقوارب في عرض البحر',
        fullSentenceEn: 'I took some pictures of the boats in the sea.',
      },
      {
        id: 'pair-played',
        verbPast: 'played',
        verbPresent: 'play',
        verbAr: 'لعبَ',
        activityEn: 'football in the park',
        activityAr: 'كرة القدم في المتنزه',
        fullSentenceEn: 'We played football in the park.',
      },
      {
        id: 'pair-listened',
        verbPast: 'listened',
        verbPresent: 'listen',
        verbAr: 'استمعَ إلى',
        activityEn: 'to some music in the afternoon',
        activityAr: 'إلى بعض الموسيقى بعد الظهر',
        fullSentenceEn: 'We listened to some music in the afternoon.',
      },
      {
        id: 'pair-had',
        verbPast: 'had',
        verbPresent: 'have',
        verbAr: 'قضى / حظيَ بـ',
        activityEn: 'a fantastic day with friends',
        activityAr: 'يوماً رائعاً بصحبة الصديقات',
        fullSentenceEn: 'I had a fantastic day yesterday with my friends.',
      },
    ] as VerbActivityCollocation[],
  },

  // AB Page 17 - Ahmed and Faisal in New York Story Cards (6 Events)
  page17AhmedStory: {
    titleEn: 'Ahmed and Faisal in New York',
    titleAr: 'قصة أحمد وفيصل في نيويورك (كتاب النشاط ص 17)',
    instructionEn: 'Read the story of Ahmed and Faisal. Listen to each event scene in New York:',
    instructionAr: 'اقرأ واستمع لأحداث قصة أحمد وفيصل في نيويورك مقسمة بحسب المشاهد المصورة:',
    fullStoryAudioUrl: '/audio/lesson-7/ahmed-story-full.mp3',
    scenes: [
      {
        id: 'scene-1',
        sceneNumber: 1,
        titleEn: '1. In the Holidays in New York',
        titleAr: '1. العطلة في نيويورك والتعريف بالصديقين',
        textEn: "In the holidays, Ahmed and his family stayed in a hotel in New York. Ahmed's friend, Faisal, lives in New York with his family. Faisal is seventeen, two years older than Ahmed.",
        textAr: 'في العطلة، أقام أحمد وعائلته في فندق في نيويورك. صديق أحمد، فيصل، يعيش في نيويورك مع عائلته. عمر فيصل 17 سنة، وهو أكبر من أحمد بسنتين (أي عمر أحمد 15 سنة).',
        imageUrl: '/images/ahmed-story/ahmed-scene-1.jpg',
        audioFileUrl: '/audio/lesson-7/ahmed-1.mp3',
        timeContext: 'Holidays in New York',
        keyVocabulary: [
          { word: 'stayed in a hotel', meaningAr: 'أقامَ في فندق' },
          { word: 'two years older', meaningAr: 'أكبر بسنتين (عمر أحمد 15)' },
        ],
      },
      {
        id: 'scene-2',
        sceneNumber: 2,
        titleEn: "2. Taxi to Faisal's Flat",
        titleAr: '2. سيارة الأجرة والوصول لشقة فيصل',
        textEn: "One day, Ahmed took a taxi to Faisal's flat. He got there at half past two.",
        textAr: 'في أحد الأيام، استقل أحمد سيارة أجرة (تكسي) إلى شقة فيصل، ووصل إلى هناك في الساعة الثانية والنصف تماماً (2:30).',
        imageUrl: '/images/ahmed-story/ahmed-scene-2.jpg',
        audioFileUrl: '/audio/lesson-7/ahmed-2.mp3',
        timeContext: 'At half past two (2:30)',
        keyVocabulary: [
          { word: 'took a taxi', meaningAr: 'استقل سيارة أجرة' },
          { word: 'flat', meaningAr: 'شقة سكنية' },
          { word: 'half past two', meaningAr: 'الثانية والنصف (2:30)' },
        ],
      },
      {
        id: 'scene-3',
        sceneNumber: 3,
        titleEn: '3. Going to the Cinema',
        titleAr: '3. الذهاب إلى السينما ومغادرتها سريعاً',
        textEn: "'What do you want to do?' asked Faisal. 'Let's go to the cinema,' said Ahmed. They went to the cinema, but they didn't stay long because the film was boring.",
        textAr: 'سأله فيصل: "ماذا تريد أن نفعل؟" قال أحمد: "لنذهب إلى السينما". ذهبا إلى السينما، لكنهما لم يبقيا طويلاً لأن الفلم كان مملاً.',
        imageUrl: '/images/ahmed-story/ahmed-scene-3.jpg',
        audioFileUrl: '/audio/lesson-7/ahmed-3.mp3',
        timeContext: 'Afternoon at the cinema',
        keyVocabulary: [
          { word: 'didn’t stay long', meaningAr: 'لم يبقيا طويلاً' },
          { word: 'boring film', meaningAr: 'فلم ممل' },
        ],
      },
      {
        id: 'scene-4',
        sceneNumber: 4,
        titleEn: '4. Central Park & Talking about Iraq',
        titleAr: '4. الذهاب لسنترال بارك والحديث عن العراق',
        textEn: "They went for a walk in the park. It is a huge park called Central Park. The boys sat under a tree and talked. They talked about Iraq. Faisal said that he liked New York, but he wanted to go back to Iraq.",
        textAr: 'ذهبا للمشي في المتنزه، وهو متنزه ضخم جداً يدعى سنترال بارك. جلس الولدان تحت شجرة وتحدثا عن العراق. قال فيصل إنه يحب نيويورك لكنه يريد العودة إلى العراق.',
        imageUrl: '/images/ahmed-story/ahmed-scene-4.jpg',
        audioFileUrl: '/audio/lesson-7/ahmed-4.mp3',
        timeContext: 'Central Park',
        keyVocabulary: [
          { word: 'huge park', meaningAr: 'متنزه ضخم وكبير جداً' },
          { word: 'sat under a tree', meaningAr: 'جلسا تحت شجرة' },
          { word: 'go back to Iraq', meaningAr: 'يعود إلى العراق' },
        ],
      },
      {
        id: 'scene-5',
        sceneNumber: 5,
        titleEn: '5. Talking about Families',
        titleAr: '5. الحديث عن العائلة وعدد الأطفال',
        textEn: "Then they talked about their families. Faisal said that he did not have any brothers or sisters. Ahmed said that there were four children in his family. They had a great time together.",
        textAr: 'ثم تحدثا عن عائلتيهما. قال فيصل إنه ليس لديه أي إخوة أو أخوات (وحيد)، بينما قال أحمد إن هناك أربعة أطفال في عائلته. وقضيا وقتاً رائعاً معاً.',
        imageUrl: '/images/ahmed-story/ahmed-scene-5.jpg',
        audioFileUrl: '/audio/lesson-7/ahmed-5.mp3',
        timeContext: 'Under the tree',
        keyVocabulary: [
          { word: 'no brothers or sisters', meaningAr: 'ليس لديه إخوة أو أخوات' },
          { word: 'four children', meaningAr: 'أربعة أطفال في عائلة أحمد' },
        ],
      },
      {
        id: 'scene-6',
        sceneNumber: 6,
        titleEn: '6. Returning to the Hotel',
        titleAr: '6. العودة بالتكسي إلى الفندق في الخامسة',
        textEn: "At five o'clock, Ahmed took a taxi back to his hotel.",
        textAr: 'وفي تمام الساعة الخامسة (5:00)، استقل أحمد سيارة أجرة عائداً إلى فندقه.',
        imageUrl: '/images/ahmed-story/ahmed-scene-6.jpg',
        audioFileUrl: '/audio/lesson-7/ahmed-6.mp3',
        timeContext: "At five o'clock (5:00)",
        keyVocabulary: [
          { word: 'five o’clock', meaningAr: 'الساعة الخامسة' },
          { word: 'back to his hotel', meaningAr: 'عائداً إلى فندقه' },
        ],
      },
    ] as AhmedStoryScene[],
  },

  // AB Page 17 - Ahmed and Faisal 8 Comprehension Questions
  page17AhmedQuestions: {
    titleEn: 'Exercise: Questions on Ahmed and Faisal',
    titleAr: 'أسئلة قصة أحمد وفيصل الثمانية (ص 17)',
    instructionEn: 'Answer the 8 official questions based on the story of Ahmed and Faisal in New York:',
    instructionAr: 'أجب عن أسئلة قصة أحمد وفيصل في نيويورك الثمانية المعتمدة:',
    questions: [
      {
        id: 'aq-1',
        number: 1,
        questionEn: 'How old is Ahmed?',
        questionAr: 'كم عمر أحمد؟',
        correctAnswer: 'He is 15 years old.',
        acceptableAnswers: [
          'he is 15 years old',
          'he is 15',
          '15 years old',
          '15',
          'fifteen years old',
          'fifteen',
        ],
        options: [
          'He is 15 years old.',
          'He is 17 years old.',
          'He is 13 years old.',
          'He is 10 years old.',
        ],
        explanationAr: 'فيصل عمره 17 سنة وهو أكبر من أحمد بسنتين (17 - 2 = 15)، إذن عمر أحمد هو 15 سنة.',
        sceneRef: 1,
      },
      {
        id: 'aq-2',
        number: 2,
        questionEn: 'Does Faisal live in a flat or in a house?',
        questionAr: 'هل يعيش فيصل في شقة أم في منزل مستقل؟',
        correctAnswer: 'In a flat.',
        acceptableAnswers: [
          'in a flat',
          'a flat',
          'he lives in a flat',
          'in his flat',
        ],
        options: [
          'In a flat.',
          'In a house.',
          'In a hotel.',
          'On a farm.',
        ],
        explanationAr: 'ذكرت القطعة: "Ahmed took a taxi to Faisal\'s flat" (استقل تكسي إلى شقة فيصل).',
        sceneRef: 2,
      },
      {
        id: 'aq-3',
        number: 3,
        questionEn: 'What time did Ahmed get to Faisal’s flat?',
        questionAr: 'في أي وقت وصل أحمد إلى شقة فيصل؟',
        correctAnswer: 'At half past two (2:30).',
        acceptableAnswers: [
          'at half past two (2:30)',
          'at half past two',
          'half past two',
          'at 2:30',
          '2:30',
          'two thirty',
        ],
        options: [
          'At half past two (2:30).',
          'At five o’clock (5:00).',
          'At one o’clock (1:00).',
          'At midnight.',
        ],
        explanationAr: 'وصل أحمد لشقة فيصل في الثانية والنصف: "He got there at half past two".',
        sceneRef: 2,
      },
      {
        id: 'aq-4',
        number: 4,
        questionEn: 'Did the boys enjoy the film?',
        questionAr: 'هل استمتع الولدان بمشاهدة الفلم في السينما؟',
        correctAnswer: 'No, they didn’t. The film was boring.',
        acceptableAnswers: [
          'no, they didn’t. the film was boring',
          'no, they did not',
          'no, they didn’t',
          'no',
          'the film was boring',
          'they didn’t stay long because the film was boring',
        ],
        options: [
          'No, they didn’t. The film was boring.',
          'Yes, they enjoyed it very much.',
          'They didn’t go to the cinema.',
          'They watched the entire film twice.',
        ],
        explanationAr: 'لم يستمتعا به وخرجا سريعاً لأن الفلم كان مملاً: "they didn\'t stay long because the film was boring".',
        sceneRef: 3,
      },
      {
        id: 'aq-5',
        number: 5,
        questionEn: 'What did they do in Central Park?',
        questionAr: 'ماذا فعل الولدان في سنترال بارك؟',
        correctAnswer: 'They sat under a tree and talked.',
        acceptableAnswers: [
          'they sat under a tree and talked',
          'sat under a tree and talked',
          'they sat under a tree',
          'they talked under a tree',
        ],
        options: [
          'They sat under a tree and talked.',
          'They played football in the park.',
          'They went fishing in the lake.',
          'They rode bicycles.',
        ],
        explanationAr: 'جلسا تحت شجرة وتحدثا عن العراق وعائلتيهما: "The boys sat under a tree and talked".',
        sceneRef: 4,
      },
      {
        id: 'aq-6',
        number: 6,
        questionEn: 'How many children are there in Ahmed’s family?',
        questionAr: 'كم عدد الأطفال في عائلة أحمد؟',
        correctAnswer: 'Four children.',
        acceptableAnswers: [
          'four children',
          'four',
          '4',
          '4 children',
          'there are four children in his family',
        ],
        options: [
          'Four children.',
          'Only one child.',
          'Two children.',
          'Seventeen children.',
        ],
        explanationAr: 'قال أحمد لصديقه إن عائلته تضم أربعة أطفال: "there were four children in his family".',
        sceneRef: 5,
      },
      {
        id: 'aq-7',
        number: 7,
        questionEn: 'Will Faisal always live in New York?',
        questionAr: 'هل سيبقى فيصل يعيش دائماً في نيويورك؟',
        correctAnswer: 'No, he wants to go back to Iraq.',
        acceptableAnswers: [
          'no, he wants to go back to iraq',
          'no, he will not',
          'no',
          'he wants to go back to iraq',
          'no, he wants to return to iraq',
        ],
        options: [
          'No, he wants to go back to Iraq.',
          'Yes, he will live there forever.',
          'No, he wants to move to Australia.',
          'He doesn’t like Iraq.',
        ],
        explanationAr: 'فيصل يحب نيويورك لكنه يحن لوطنه ويريد العودة إلى العراق: "he wanted to go back to Iraq".',
        sceneRef: 4,
      },
      {
        id: 'aq-8',
        number: 8,
        questionEn: 'How did Ahmed get back to his hotel?',
        questionAr: 'كيف عاد أحمد إلى فندقه في نهاية اليوم؟',
        correctAnswer: 'He took a taxi.',
        acceptableAnswers: [
          'he took a taxi',
          'took a taxi',
          'by taxi',
          'taxi',
          'in a taxi',
        ],
        options: [
          'He took a taxi.',
          'He walked on foot.',
          'By bus.',
          'Faisal drove him home.',
        ],
        explanationAr: 'في الساعة الخامسة استقل تكسي عائداً لفندقه: "At five o\'clock, Ahmed took a taxi back to his hotel".',
        sceneRef: 6,
      },
    ] as AhmedComprehensionQuestion[],
  },
};
