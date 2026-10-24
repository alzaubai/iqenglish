export interface SwiftComprehensionQuestion {
  id: string;
  number: number;
  questionEn: string;
  questionAr: string;
  correctAnswer: string;
  acceptableAnswers: string[];
  explanationAr: string;
}

export interface SwiftTrueFalseItem {
  id: string;
  number: number;
  statementEn: string;
  statementAr: string;
  correctAnswer: 'True' | 'False';
  explanationAr: string;
  storyQuoteEn: string;
}

export interface StoryFact {
  factEn: string;
  factAr: string;
}

export interface StoryVocabularyWord {
  id: string;
  wordEn: string;
  wordAr: string;
  exampleSentenceEn: string;
  definitionAr: string;
}

export const lesson10ActivityData = {
  // 1. SB Page 13 & School Exam Comprehension Wh-Questions
  comprehensionQuestions: {
    titleEn: 'Questions on the Story: My new friend, the swift',
    titleAr: 'أسئلة الفهم لقصة طائر السَّمامة (امتحانات نصف السنة والامتحانات الشهرية)',
    instructionEn: 'Answer the 6 essential comprehension questions based on the story of the swift:',
    instructionAr: 'أجب عن أسئلة القصة الأساسية الستة المعتمدة في الامتحانات المدرسية كتابةً بالإنجليزية:',
    questions: [
      {
        id: 'sq-1',
        number: 1,
        questionEn: 'Where was the narrator coming from when he found the bird?',
        questionAr: 'من أين كان الراوي عائداً عندما وجد الطائر؟',
        correctAnswer: 'He was coming home from school.',
        acceptableAnswers: [
          'from school',
          'he was coming home from school',
          'coming home from school',
          'school',
          'he was coming from school',
        ],
        explanationAr: 'ذكر الراوي في بداية القصة: "Last month, I was coming home from school" (كنت عائداً إلى البيت من المدرسة).',
      },
      {
        id: 'sq-2',
        number: 2,
        questionEn: 'Where did the narrator find the bird?',
        questionAr: 'أين وجد الراوي الطائر الصغير؟',
        correctAnswer: 'In the bushes on the ground.',
        acceptableAnswers: [
          'in the bushes',
          'on the ground in the bushes',
          'on the ground',
          'in bushes',
          'under the bushes',
        ],
        explanationAr: 'شاهد الراوي شيئاً لفت انتباهه بين الشجيرات وكان طائراً ملقى على الأرض: "something caught my attention in the bushes. There on the ground... was a little bird".',
      },
      {
        id: 'sq-3',
        number: 3,
        questionEn: "Why wasn't the bird moving when the narrator found it?",
        questionAr: 'لماذا لم يكن الطائر يتحرك عندما وجده الراوي؟',
        correctAnswer: "Because its wing was hurt (and it pretended to be dead).",
        acceptableAnswers: [
          "because its wing was hurt",
          "its wing was hurt",
          "the bird's wing was hurt",
          "because it was hurt",
          "it pretended to be dead",
          "because it was scared and pretended to be dead",
          "it was hurt",
        ],
        explanationAr: 'كان جناح الطائر مصاباً ومجروحاً لا يقدر على الطيران، بالإضافة إلى أن طائر السمامة يتظاهر بالموت عندما يكون خائفاً جداً.',
      },
      {
        id: 'sq-4',
        number: 4,
        questionEn: 'What do swifts eat?',
        questionAr: 'ماذا تأكل طيور السَّمامة؟',
        correctAnswer: 'They eat small insects.',
        acceptableAnswers: [
          'small insects',
          'insects',
          'they eat small insects',
          'they eat insects',
        ],
        explanationAr: 'بحثت الأم والراوي في مقال عن الطائر ووجدا: "The article said that swifts eat small insects" (تأكل حشرات صغيرة).',
      },
      {
        id: 'sq-5',
        number: 5,
        questionEn: 'How long can swifts spend flying in the air?',
        questionAr: 'كم من الوقت يمكن أن يقضيه طائر السَّمامة يطير في الهواء دون الهبوط؟',
        correctAnswer: 'Up to ten months (in the air).',
        acceptableAnswers: [
          'up to ten months',
          'ten months',
          '10 months',
          'up to 10 months',
          'for ten months',
          'for 10 months',
        ],
        explanationAr: 'طائر السمامة يقضي معظم حياته في الطيران ويمكن أن يظل في الجو حتى 10 أشهر متواصلة: "they can spend up to ten months flying".',
      },
      {
        id: 'sq-6',
        number: 6,
        questionEn: 'Why was the narrator both sad and happy at the end?',
        questionAr: 'لماذا شعر الراوي بالحزن والسعادة معاً في نهاية القصة؟',
        correctAnswer: 'Sad to see the bird fly away, but happy because he helped it get strong again.',
        acceptableAnswers: [
          'sad to see the bird fly away, but happy because he helped it get strong again',
          'sad because it flew away and happy because he helped it',
          'sad because the bird flew away, but happy because it got strong',
          'sad to see it fly away, happy because he helped it',
        ],
        explanationAr: 'حزن لفراق صديقه الطائر، لكنه فرح وسُرّ لأنه أنقذه وساعده حتى استعاد قوته وطار مجدداً: "It made me sad to see the bird fly away, but I was also happy, because I helped it get strong again".',
      },
    ] as SwiftComprehensionQuestion[],
  },

  // 2. AB Page 21 - True or False Tick Exercise
  page21TrueFalse: {
    titleEn: 'Activity Book p. 21 • True or False? Tick (✓)',
    titleAr: 'كتاب النشاط ص 21 • صح أو خطأ (Tick)',
    instructionEn: 'Read each statement based on the story and tick True (T) or False (F):',
    instructionAr: 'حدد ما إذا كانت كل عبارة صحيحة (True) أم خاطئة (False) بحسب أحداث قصة طائر السَّمامة:',
    items: [
      {
        id: 'st-1',
        number: 1,
        statementEn: 'There was a cat nearby waiting to eat the swift.',
        statementAr: 'كانت هناك قطة قريبة تنتظر لتأكل طائر السمامة.',
        correctAnswer: 'False',
        explanationAr: 'خطأ (False): لم تكن هناك قطة موجودة بالفعل، بل خاف الراوي أن تجده قطة إن تركه في مكانه: "if I left it there, maybe a cat would find it".',
        storyQuoteEn: 'if I left it there, maybe a cat would find it.',
      },
      {
        id: 'st-2',
        number: 2,
        statementEn: 'When the narrator unwrapped the swift, it did not move.',
        statementAr: 'عندما فكّ الراوي الوشاح عن الطائر، لم يتحرك.',
        correctAnswer: 'False',
        explanationAr: 'خطأ (False): بمجرد فك الوشاح، قفز الطائر وحاول الطيران: "Instead, it jumped out and tried to fly".',
        storyQuoteEn: "Instead, it jumped out and tried to fly - but one wing didn't open.",
      },
      {
        id: 'st-3',
        number: 3,
        statementEn: 'Swifts can fly for almost a year.',
        statementAr: 'تستطيع طيور السمامة الطيران لما يقارب السنة (حتى 10 أشهر).',
        correctAnswer: 'True',
        explanationAr: 'صح (True): المقال ذكر أنها تستطيع البقاء محلقة في الجو لمدة تصل إلى عشرة أشهر: "they can spend up to ten months flying".',
        storyQuoteEn: 'they can spend up to ten months flying. Ten months in the air!',
      },
      {
        id: 'st-4',
        number: 4,
        statementEn: 'Swifts like places with little noise.',
        statementAr: 'تحب طيور السمامة الأماكن الهادئة قليلة الضوضاء.',
        correctAnswer: 'True',
        explanationAr: 'صح (True): لذلك وضع الراوي وأمه الصندوق في مكان هادئ: "We put the food and some water in the box and left it in a quiet place".',
        storyQuoteEn: 'We put the food and some water in the box and left it in a quiet place.',
      },
      {
        id: 'st-5',
        number: 5,
        statementEn: 'The narrator wanted the bird to fly away.',
        statementAr: 'أراد الراوي أن يتعافى الطائر ويطير حراً مجدداً.',
        correctAnswer: 'True',
        explanationAr: 'صح (True): هدف الراوي من إنقاذه وإطعامه كان أن يستعيد قوته ويطير: "because I helped it get strong again".',
        storyQuoteEn: 'I was also happy, because I helped it get strong again.',
      },
      {
        id: 'st-6',
        number: 6,
        statementEn: 'The narrator was both happy and sad when the swift flew away.',
        statementAr: 'كان الراوي حزيناً وسعيداً في نفس الوقت عندما طار الطائر بعيداً.',
        correctAnswer: 'True',
        explanationAr: 'صح (True): صرّح بذلك بوضوح: "It made me sad to see the bird fly away, but I was also happy".',
        storyQuoteEn: 'It made me sad to see the bird fly away, but I was also happy, because I helped it get strong again.',
      },
    ] as SwiftTrueFalseItem[],
  },

  // 3. Story Elements & Facts Summary
  storyElements: {
    titleEn: 'Story Elements & Key Facts',
    titleAr: 'عناصر القصة وحقائق طائر السَّمامة المدهشة',
    elements: [
      {
        labelEn: 'Title (عنوان القصة)',
        contentEn: 'My new friend, the swift',
        contentAr: 'صديقي الجديد، طائر السَّمامة',
      },
      {
        labelEn: 'Characters (الشخصيات)',
        contentEn: 'The narrator (a schoolboy), his mother, the injured swift bird',
        contentAr: 'الراوي (تلميذ مدرسي)، والدته، طائر السمامة المصاب',
      },
      {
        labelEn: 'Setting (المكان والزمان)',
        contentEn: 'Coming home from school; inside the narrator’s house',
        contentAr: 'في طريق العودة من المدرسة؛ وداخل منزل الراوي',
      },
      {
        labelEn: 'Main Plot (أحداث القصة)',
        contentEn: 'A boy finds an injured swift, takes it home, cares for it by feeding it small insects and water in a cardboard box, and feels joy when it recovers and flies away.',
        contentAr: 'يعثر فتى على طائر سمامة مصاب الجناح، فيأخذه لمنزله ويعتني به داخل صندوق كرتوني ويغذيه بالحشرات والماء حتى يستعيد قوته ويطير حراً من النافذة.',
      },
      {
        labelEn: 'Moral Lesson (العبرة والهدف)',
        contentEn: 'Showing kindness and care to weak or injured animals and protecting nature.',
        contentAr: 'الرحمة بالحيوانات والطيور الضعيفة والمصابة والعناية بها وحماية الطبيعة.',
      },
    ],
    amazingFacts: [
      {
        factEn: 'Swifts almost never land on the ground because their short legs make it too dangerous.',
        factAr: 'نادراً ما تضع طيور السمامة أرجلها على الأرض لأن أرجلها قصيرة جداً وهبوطها على الأرض يشكل خطراً كبيراً عليها.',
      },
      {
        factEn: 'They can spend up to ten months continuously flying in the air!',
        factAr: 'تستطيع الطيران باستمرار في الجو لمدة تصل إلى 10 أشهر دون أي هبوط!',
      },
      {
        factEn: 'When swifts are frightened, they sometimes pretend to be dead.',
        factAr: 'عندما تشعر بالخوف الشديد، تتظاهر بالموت كوسيلة دفاعية تخدع بها الحيوانات المفترسة.',
      },
      {
        factEn: 'Their main diet consists of small flying insects.',
        factAr: 'غذائها الأساسي يتكون من الحشرات الطائرة الصغيرة.',
      },
    ] as StoryFact[],
  },

  // 4. Story Key Vocabulary
  vocabulary: [
    {
      id: 'voc-swift',
      wordEn: 'swift',
      wordAr: 'طائر السَّمامة',
      exampleSentenceEn: 'The bird was a swift, and it eats small insects.',
      definitionAr: 'نوع من الطيور السريعة جداً يقضي معظم وقته في الطيران.',
    },
    {
      id: 'voc-bushes',
      wordEn: 'bushes',
      wordAr: 'شُجَيرات',
      exampleSentenceEn: 'Something caught my attention in the bushes.',
      definitionAr: 'نباتات وشجيرات منخفضة متجمعة في الحديقة أو جانب الطريق.',
    },
    {
      id: 'voc-cardboard',
      wordEn: 'cardboard box',
      wordAr: 'صندوق كرتوني',
      exampleSentenceEn: 'I made holes in the top of the cardboard box so there was plenty of air.',
      definitionAr: 'صندوق مصنوع من الورق المقوى استُخدم كبيت مؤقت للطائر.',
    },
    {
      id: 'voc-hurt',
      wordEn: 'hurt / injured',
      wordAr: 'مُصاب / مجروح',
      exampleSentenceEn: 'The bird tried to fly, but its wing was hurt.',
      definitionAr: 'تعرض للأذى أو الجرح ولا يستطيع الحركة بحرية.',
    },
    {
      id: 'voc-pretend',
      wordEn: 'pretend',
      wordAr: 'يتظاهر',
      exampleSentenceEn: 'When swifts are scared, they sometimes pretend to be dead.',
      definitionAr: 'يتصرف وكأنه في حالة معينة لخداع الآخرين (كأن يتظاهر بالموت).',
    },
    {
      id: 'voc-incredible',
      wordEn: 'incredible',
      wordAr: 'مذهل / لا يُصدَّق',
      exampleSentenceEn: 'Ten months in the air! That is incredible!',
      definitionAr: 'شيء عظيم ورائع للغاية يثير الدهشة والإعجاب.',
    },
  ] as StoryVocabularyWord[],
};
