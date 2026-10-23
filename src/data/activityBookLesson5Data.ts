export interface SurveyQuestionItem {
  id: string;
  letter: string;
  questionEn: string;
  questionAr: string;
  verbPhraseEn: string;
  isCustomizable?: boolean;
}

export interface PartnerDialogueItem {
  id: string;
  topicEn: string;
  topicAr: string;
  partnerGuess: string;
  partnerGuessAr: string;
  options: {
    textEn: string;
    textAr: string;
    isCorrect?: boolean;
    frequencyAdverb: string;
  }[];
  modelResponseEn: string;
  modelResponseAr: string;
}

export interface CircleSentenceItem {
  id: string;
  letter: string;
  prefixEn: string;
  verbInBrackets: string;
  suffixEn: string;
  fullSentenceAr: string;
  percentage: number;
  adverbEn: string;
  adverbAr: string;
  correctAnswer: string;
  acceptableAnswers: string[];
  circleImage: string;
  ruleExplanationAr: string;
}

export interface SentenceWritingPrompt {
  id: string;
  number: number;
  requiredAdverb: 'always' | 'usually' | 'often' | 'sometimes' | 'never';
  adverbAr: string;
  percentage: number;
  circleImage: string;
  suggestedActivities: {
    en: string;
    ar: string;
  }[];
  modelSentence: string;
  modelSentenceAr: string;
}

export const lesson5ActivityData = {
  // Activity Book p. 12 - Exercise 1: Survey Table (How often do you do these things?)
  page12Ex1Survey: {
    titleEn: 'Exercise 1: How often do you do these things?',
    titleAr: 'تمرين 1: كم مرة تقوم بهذه الأنشطة؟ (استبيان التكرار)',
    instructionEn: 'Put a tick (✓) in the correct column for you.',
    instructionAr: 'ضع علامة (✓) في العمود المناسب لبيان تكرار كل نشاط في حياتك اليومية:',
    columns: [
      { key: 'always', labelEn: 'Yes, always', labelAr: 'نعم، دائماً', percentage: 100, image: '/images/adverbs/adverb-always-100.png', color: 'emerald' },
      { key: 'usually', labelEn: 'Yes, usually', labelAr: 'نعم، عادةً', percentage: 90, image: '/images/adverbs/adverb-usually-90.png', color: 'teal' },
      { key: 'often', labelEn: 'Yes, often', labelAr: 'نعم، غالباً', percentage: 50, image: '/images/adverbs/adverb-often-50.png', color: 'blue' },
      { key: 'sometimes', labelEn: 'Yes, sometimes', labelAr: 'نعم، أحياناً', percentage: 25, image: '/images/adverbs/adverb-sometimes-25.png', color: 'amber' },
      { key: 'never', labelEn: 'No, never', labelAr: 'كلا، أبداً', percentage: 0, image: '/images/adverbs/adverb-never-0.png', color: 'rose' },
    ],
    questions: [
      {
        id: 'sq-a',
        letter: 'a',
        questionEn: 'How often do you go camping?',
        questionAr: 'كم مرة تذهب للتخييم في البرية؟',
        verbPhraseEn: 'go camping',
      },
      {
        id: 'sq-b',
        letter: 'b',
        questionEn: 'How often do you go horse riding?',
        questionAr: 'كم مرة تمارس ركوب الخيل؟',
        verbPhraseEn: 'go horse riding',
      },
      {
        id: 'sq-c',
        letter: 'c',
        questionEn: "How often do you go to your grandparents' house on Friday?",
        questionAr: 'كم مرة تذهب لبيت أجدادك يوم الجمعة؟',
        verbPhraseEn: "go to my grandparents' house on Friday",
      },
      {
        id: 'sq-d',
        letter: 'd',
        questionEn: 'How often do you phone your friends in the evening?',
        questionAr: 'كم مرة تهاتف أصدقاءك في المساء؟',
        verbPhraseEn: 'phone my friends in the evening',
      },
      {
        id: 'sq-e',
        letter: 'e',
        questionEn: 'How often do you visit your friends at the weekend?',
        questionAr: 'كم مرة تزور أصدقاءك في عطلة نهاية الأسبوع؟',
        verbPhraseEn: 'visit my friends at the weekend',
      },
      {
        id: 'sq-f',
        letter: 'f',
        questionEn: 'How often do you write letters to your friends?',
        questionAr: 'كم مرة تكتب رسائل أو بريداً لأصدقائك؟',
        verbPhraseEn: 'write letters to my friends',
      },
      {
        id: 'sq-g',
        letter: 'g',
        questionEn: 'How often do you watch English television programmes?',
        questionAr: 'كم مرة تشاهد برامج تلفزيونية باللغة الإنجليزية؟',
        verbPhraseEn: 'watch English television programmes',
      },
      {
        id: 'sq-h',
        letter: 'h',
        questionEn: 'How often do you listen to English radio programmes?',
        questionAr: 'كم مرة تستمع لبرامج إذاعية باللغة الإنجليزية؟',
        verbPhraseEn: 'listen to English radio programmes',
      },
      // Student-created questions as per textbook (i, j)
      {
        id: 'sq-i',
        letter: 'i',
        questionEn: 'How often do you read an English story?',
        questionAr: 'كم مرة تقرأ قصة باللغة الإنجليزية؟ (سؤال إضافي)',
        verbPhraseEn: 'read an English story',
        isCustomizable: true,
      },
      {
        id: 'sq-j',
        letter: 'j',
        questionEn: 'How often do you help with housework at home?',
        questionAr: 'كم مرة تساعد في الأعمال المنزلية؟ (سؤال إضافي)',
        verbPhraseEn: 'help with housework at home',
        isCustomizable: true,
      },
    ] as SurveyQuestionItem[],
  },

  // Activity Book p. 13 - Exercise 2: Partner Guessing Dialogue
  page13Ex2Dialogue: {
    titleEn: 'Exercise 2: Talk about your partner',
    titleAr: 'تمرين 2: تحدث عن زميلك وخمّن مدى تكرار أنشطته',
    instructionEn: 'Guess how often your partner does things. Respond with the correct frequency.',
    instructionAr: 'خمن مدى تكرار عادات زميلك وتدرب على الردود الشفوية وفق النموذج المنهجي:',
    dialogues: [
      {
        id: 'diag-1',
        topicEn: 'Phoning friends in the evening',
        topicAr: 'مهاتفة الأصدقاء مساءً',
        partnerGuess: 'You usually phone your friends in the evening.',
        partnerGuessAr: 'أنت عادةً تتصل بأصدقائك في المساء.',
        options: [
          { textEn: 'No, sometimes.', textAr: 'كلا، أحياناً.', isCorrect: true, frequencyAdverb: 'sometimes' },
          { textEn: 'Yes, that is right! I always do.', textAr: 'نعم، هذا صحيح! دائماً أفعل ذلك.', isCorrect: true, frequencyAdverb: 'always' },
          { textEn: 'No, never.', textAr: 'كلا، أبداً.', isCorrect: true, frequencyAdverb: 'never' },
        ],
        modelResponseEn: 'No, sometimes. / Yes, always.',
        modelResponseAr: 'كلا، أحياناً. / نعم، دائماً.',
      },
      {
        id: 'diag-2',
        topicEn: 'Going camping',
        topicAr: 'الذهاب للتخييم',
        partnerGuess: 'You never go camping.',
        partnerGuessAr: 'أنت لا تذهب للتخييم أبداً.',
        options: [
          { textEn: 'Yes, that is true. I never go camping.', textAr: 'نعم، هذا صحيح. لا أذهب للتخييم أبداً.', isCorrect: true, frequencyAdverb: 'never' },
          { textEn: 'No, I sometimes go with my family.', textAr: 'كلا، أذهب أحياناً مع عائلتي.', isCorrect: true, frequencyAdverb: 'sometimes' },
          { textEn: 'No, I often go!', textAr: 'كلا، أنا أذهب غالباً!', isCorrect: true, frequencyAdverb: 'often' },
        ],
        modelResponseEn: 'Yes, that is true. I never go camping.',
        modelResponseAr: 'نعم، صحيح. لا أذهب للتخييم إطلاقاً.',
      },
      {
        id: 'diag-3',
        topicEn: 'Watching English TV',
        topicAr: 'مشاهدة التلفاز بالإنجليزية',
        partnerGuess: 'You often watch English television programmes.',
        partnerGuessAr: 'أنت غالباً ما تشاهد برامج باللغة الإنجليزية على التلفاز.',
        options: [
          { textEn: 'Yes, I usually watch cartoons in English.', textAr: 'نعم، أنا عادة أشاهد الرسوم المتحركة بالإنجليزية.', isCorrect: true, frequencyAdverb: 'usually' },
          { textEn: 'No, I never watch them.', textAr: 'كلا، لا أشاهدها أبداً.', isCorrect: true, frequencyAdverb: 'never' },
          { textEn: 'Sometimes, when I have free time.', textAr: 'أحياناً، عندما يكون لدي وقت فراغ.', isCorrect: true, frequencyAdverb: 'sometimes' },
        ],
        modelResponseEn: 'Yes, usually. It helps my English!',
        modelResponseAr: 'نعم، عادةً. فهي تساعدني في تطوير لغتي الإنجليزية!',
      },
    ] as PartnerDialogueItem[],
  },

  // Activity Book p. 13 - Exercise 3: Complete sentences with adverbs & verbs
  page13Ex3Sentences: {
    titleEn: 'Exercise 3: Complete the sentences',
    titleAr: 'تمرين 3: أكمل الجمل بظرف التكرار المناسب والفعل بين القوسين',
    instructionEn: 'Look at the shaded circle to find the adverb. Put the verb in the correct present form.',
    instructionAr: 'انظر إلى نسبة الدائرة المظللة لاختيار ظرف التكرار المناسب، ثم ضع الفعل بين القوسين بالشكل الصحيح:',
    sentences: [
      {
        id: 'sent-a',
        letter: 'a',
        prefixEn: 'She',
        verbInBrackets: 'have',
        suffixEn: "an hour's rest after lunch.",
        fullSentenceAr: 'هي عادةً ما ترتاح لمدة ساعة بعد الغداء.',
        percentage: 90,
        adverbEn: 'usually',
        adverbAr: 'عادةً (90%)',
        correctAnswer: 'usually has',
        acceptableAnswers: ['usually has'],
        circleImage: '/images/adverbs/adverb-usually-90.png',
        ruleExplanationAr: 'الدائرة مظللة بنسبة 90% أي (usually). الفاعل (She) مفرد غائب، لذا يتحول الفعل (have) إلى (has). يوضع الظرف قبل الفعل الرئيسي: usually has.',
      },
      {
        id: 'sent-b',
        letter: 'b',
        prefixEn: 'I',
        verbInBrackets: 'go',
        suffixEn: 'to the park on Friday.',
        fullSentenceAr: 'أنا دائماً أذهب إلى الحديقة يوم الجمعة.',
        percentage: 100,
        adverbEn: 'always',
        adverbAr: 'دائماً (100%)',
        correctAnswer: 'always go',
        acceptableAnswers: ['always go'],
        circleImage: '/images/adverbs/adverb-always-100.png',
        ruleExplanationAr: 'الدائرة مظللة بنسبة 100% أي (always). الفاعل (I) يأخذ الفعل مجرداً (go). يوضع الظرف قبل الفعل الرئيسي: always go.',
      },
      {
        id: 'sent-c',
        letter: 'c',
        prefixEn: 'He',
        verbInBrackets: 'be',
        suffixEn: 'late for class.',
        fullSentenceAr: 'هو لا يتأخر أبداً عن الحصة المدرسية.',
        percentage: 0,
        adverbEn: 'never',
        adverbAr: 'أبداً (0%)',
        correctAnswer: 'is never',
        acceptableAnswers: ['is never'],
        circleImage: '/images/adverbs/adverb-never-0.png',
        ruleExplanationAr: 'الدائرة بيضاء بنسبة 0% أي (never). الفعل المطلوب هو (be)، ومع الفاعل (He) يصبح (is). قاعدة مهمة: ظرف التكرار يوضع بعد فعل be: is never.',
      },
      {
        id: 'sent-d',
        letter: 'd',
        prefixEn: 'I',
        verbInBrackets: 'listen',
        suffixEn: 'to music in my bedroom.',
        fullSentenceAr: 'أنا غالباً ما أستمع للموسيقى في غرفتي.',
        percentage: 50,
        adverbEn: 'often',
        adverbAr: 'غالباً (50%)',
        correctAnswer: 'often listen',
        acceptableAnswers: ['often listen'],
        circleImage: '/images/adverbs/adverb-often-50.png',
        ruleExplanationAr: 'الدائرة نصف مظللة 50% أي (often). الفاعل (I) يأخذ الفعل مجرداً (listen). يوضع الظرف قبل الفعل الرئيسي: often listen.',
      },
      {
        id: 'sent-e',
        letter: 'e',
        prefixEn: 'They',
        verbInBrackets: 'sleep',
        suffixEn: 'in the afternoon.',
        fullSentenceAr: 'هم لا ينامون أبداً في فترة بعد الظهر.',
        percentage: 0,
        adverbEn: 'never',
        adverbAr: 'أبداً (0%)',
        correctAnswer: 'never sleep',
        acceptableAnswers: ['never sleep'],
        circleImage: '/images/adverbs/adverb-never-0.png',
        ruleExplanationAr: 'الدائرة 0% أي (never). الفاعل جمع (They) يأخذ الفعل مجرداً (sleep). يوضع الظرف قبل الفعل الرئيسي: never sleep.',
      },
      {
        id: 'sent-f',
        letter: 'f',
        prefixEn: 'We',
        verbInBrackets: 'be',
        suffixEn: 'at home on Friday evening.',
        fullSentenceAr: 'نحن نكون أحياناً في المنزل مساء يوم الجمعة.',
        percentage: 25,
        adverbEn: 'sometimes',
        adverbAr: 'أحياناً (25%)',
        correctAnswer: 'are sometimes',
        acceptableAnswers: ['are sometimes', 'sometimes are'],
        circleImage: '/images/adverbs/adverb-sometimes-25.png',
        ruleExplanationAr: 'الدائرة ربع مظللة 25% أي (sometimes). الفعل (be) مع الفاعل الجمع (We) يصبح (are). يوضع الظرف بعد فعل be: are sometimes.',
      },
    ] as CircleSentenceItem[],
  },

  // Activity Book p. 13 - Exercise 4: Write five sentences using 5 different adverbs
  page13Ex4Writing: {
    titleEn: 'Exercise 4: Write five sentences',
    titleAr: 'تمرين 4: كتابة خمس جمل باستخدام ظروف التكرار الخمسة',
    instructionEn: 'Write five sentences about how often you do things. Use a different adverb in each sentence.',
    instructionAr: 'اكتب خمس جمل تعبر فيها عن مدى تكرار أنشطتك، مع استخدام ظرف مختلف في كل جملة (always, usually, often, sometimes, never):',
    prompts: [
      {
        id: 'wr-1',
        number: 1,
        requiredAdverb: 'always',
        adverbAr: 'دائماً (100%)',
        percentage: 100,
        circleImage: '/images/adverbs/adverb-always-100.png',
        suggestedActivities: [
          { en: 'wake up early', ar: 'أستيقظ مبكراً' },
          { en: 'do my homework before dinner', ar: 'أحل واجباتي قبل العشاء' },
          { en: 'brush my teeth in the morning', ar: 'أنظف أسناني في الصباح' },
        ],
        modelSentence: 'I always do my homework before dinner.',
        modelSentenceAr: 'أنا دائماً أحل واجباتي المدرسية قبل العشاء.',
      },
      {
        id: 'wr-2',
        number: 2,
        requiredAdverb: 'usually',
        adverbAr: 'عادةً (90%)',
        percentage: 90,
        circleImage: '/images/adverbs/adverb-usually-90.png',
        suggestedActivities: [
          { en: 'walk to school with my friend', ar: 'أمشي إلى المدرسة مع صديقي' },
          { en: 'have lunch with my family', ar: 'أتناول الغداء مع عائلتي' },
          { en: 'read a book before going to sleep', ar: 'أقرأ كتاباً قبل النوم' },
        ],
        modelSentence: 'I usually walk to school with my friend.',
        modelSentenceAr: 'أنا عادةً ما أمشي إلى المدرسة مع صديقي.',
      },
      {
        id: 'wr-3',
        number: 3,
        requiredAdverb: 'often',
        adverbAr: 'غالباً (50%)',
        percentage: 50,
        circleImage: '/images/adverbs/adverb-often-50.png',
        suggestedActivities: [
          { en: 'play football on Saturday', ar: 'ألعب كرة القدم يوم السبت' },
          { en: 'watch television in the evening', ar: 'أشاهد التلفاز في المساء' },
          { en: 'help my mother in the kitchen', ar: 'أساعد أمي في المطبخ' },
        ],
        modelSentence: 'I often play football on Saturday.',
        modelSentenceAr: 'أنا غالباً ما ألعب كرة القدم يوم السبت.',
      },
      {
        id: 'wr-4',
        number: 4,
        requiredAdverb: 'sometimes',
        adverbAr: 'أحياناً (25%)',
        percentage: 25,
        circleImage: '/images/adverbs/adverb-sometimes-25.png',
        suggestedActivities: [
          { en: 'eat ice cream after dinner', ar: 'آكل المثلجات بعد العشاء' },
          { en: 'go swimming at the weekend', ar: 'أذهب للسباحة في نهاية الأسبوع' },
          { en: 'play video games with my brother', ar: 'ألعب ألعاب الفيديو مع أخي' },
        ],
        modelSentence: 'I sometimes go swimming at the weekend.',
        modelSentenceAr: 'أنا أحياناً أذهب للسباحة في عطلة نهاية الأسبوع.',
      },
      {
        id: 'wr-5',
        number: 5,
        requiredAdverb: 'never',
        adverbAr: 'أبداً (0%)',
        percentage: 0,
        circleImage: '/images/adverbs/adverb-never-0.png',
        suggestedActivities: [
          { en: 'am late for school', ar: 'أتأخر عن المدرسة' },
          { en: 'drink coffee at night', ar: 'أشرب القهوة في الليل' },
          { en: 'eat food before washing my hands', ar: 'آكل الطعام قبل غسل يدي' },
        ],
        modelSentence: 'I am never late for school.',
        modelSentenceAr: 'أنا لا أتأخر أبداً عن موعد المدرسة.',
      },
    ] as SentenceWritingPrompt[],
  },
};
