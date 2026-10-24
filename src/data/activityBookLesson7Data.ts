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
  correctPartnerResponse: string;
  options: string[];
  notesSummary: string;
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
    titleEn: 'Exercise E: Ask your partner about their special day',
    titleAr: 'تمرين E: اسأل زميلك عن يومه المميز (ص 16)',
    instructionEn: 'Practice asking and answering questions about a special day with your partner:',
    instructionAr: 'تدرّب على توجيه أسئلة الماضي البسيط لزميلك وتدوين ملخص إجاباته:',
    turns: [
      {
        id: 'q-1',
        questionNumber: 1,
        questionEn: 'When was your special day?',
        questionAr: 'متى كان يومك المميز؟',
        correctPartnerResponse: 'It was last Friday during the weekend.',
        options: [
          'It was last Friday during the weekend.',
          'I always go to school at seven o’clock.',
          'She sells seashells on the seashore.',
        ],
        notesSummary: 'Time: Last Friday',
      },
      {
        id: 'q-2',
        questionNumber: 2,
        questionEn: 'Where did you go?',
        questionAr: 'أين ذهبت؟',
        correctPartnerResponse: 'I went to the amusement park with my cousins.',
        options: [
          'I went to the amusement park with my cousins.',
          'Because I like ruins in Iraq.',
          'Yes, they are in my scrapbook.',
        ],
        notesSummary: 'Place: Amusement park with cousins',
      },
      {
        id: 'q-3',
        questionNumber: 3,
        questionEn: 'What did you do there?',
        questionAr: 'ماذا فعلت هناك؟',
        correctPartnerResponse: 'We played games, rode the roller coaster, and took pictures.',
        options: [
          'We played games, rode the roller coaster, and took pictures.',
          'No, I did not catch any fish.',
          'Never on Monday mornings.',
        ],
        notesSummary: 'Activities: Roller coaster & photos',
      },
      {
        id: 'q-4',
        questionNumber: 4,
        questionEn: 'What did you eat?',
        questionAr: 'ماذا تناولت من طعام؟',
        correctPartnerResponse: 'We ate delicious burgers and had fresh lemonade.',
        options: [
          'We ate delicious burgers and had fresh lemonade.',
          'To the mall with Adel and Bassem.',
          'I like collecting stamps and postcards.',
        ],
        notesSummary: 'Food: Burgers & lemonade',
      },
      {
        id: 'q-5',
        questionNumber: 5,
        questionEn: 'How did you feel about it?',
        questionAr: 'وكيف كان شعورك في نهاية اليوم؟',
        correctPartnerResponse: 'It was fantastic! I felt extremely happy and energetic.',
        options: [
          'It was fantastic! I felt extremely happy and energetic.',
          'My sisters are called Sana and Huda.',
          'He is putting photos in his scrapbook.',
        ],
        notesSummary: 'Feeling: Fantastic & very happy',
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
};
