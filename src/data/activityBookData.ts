export interface ABChecklistItem {
  id: string;
  questionEn: string;
  questionAr: string;
  youAnswer: boolean | null;
  partnerAnswer: boolean | null;
}

export interface ABL2PhotoOrder {
  id: string;
  letter: 'a' | 'b' | 'c' | 'd' | 'e' | 'f';
  labelEn: string;
  labelAr: string;
  correctOrder: number;
  hint?: string;
  imageUrl?: string;
}

export interface ABL2DescriptionItem {
  id: string;
  itemEn: string;
  itemAr: string;
  correctWord: string;
  acceptableAnswers: string[];
  options: string[];
}

export interface ABL2WordMeaning {
  id: string;
  word: string;
  definitionEn: string;
  definitionAr: string;
  exampleSentence: string;
}

export interface ABL2ScrambledSentence {
  id: string;
  scrambled: string[];
  correctOrder: string[];
  punctuation: string;
  arabicTranslation: string;
}

export interface ABL2SaraNotes {
  id: string;
  questionEn: string;
  questionAr: string;
  correctAnswers: string[];
  explanation: string;
}

export const lesson1ActivityData = {
  page4Ex1: [
    { id: 'q1', questionEn: 'Did you go away?', questionAr: 'هل سافرت خارج مدينتك؟' },
    { id: 'q2', questionEn: 'Did you go to the park?', questionAr: 'هل ذهبت إلى الحديقة؟' },
    { id: 'q3', questionEn: 'Did you go to any parties?', questionAr: 'هل ذهبت إلى أي حفلات؟' },
    { id: 'q4', questionEn: 'Did you go shopping?', questionAr: 'هل ذهبت للتسوق؟' },
    { id: 'q5', questionEn: 'Did you play any games?', questionAr: 'هل لعبت أي ألعاب؟' },
    { id: 'q6', questionEn: 'Did you visit your friends?', questionAr: 'هل زرت أصدقاءك؟' },
    { id: 'q7', questionEn: 'Did you watch TV?', questionAr: 'هل شاهدت التلفاز؟' },
    { id: 'q8', questionEn: 'Did you read any books?', questionAr: 'هل قرأت أي كتب؟' },
    { id: 'q9', questionEn: 'Did you help in the house?', questionAr: 'هل ساعدت في أعمال المنزل؟' },
    { id: 'q10', questionEn: 'Did you go on a picnic?', questionAr: 'هل ذهبت في نزهة خلوية؟' },
    { id: 'q11', questionEn: 'Did you go camping?', questionAr: 'هل ذهبت للتخييم؟' },
    { id: 'q12', questionEn: 'Did you go to the cinema?', questionAr: 'هل ذهبت إلى السينما؟' },
    { id: 'q13', questionEn: 'Did you stay at home?', questionAr: 'هل بقيت في المنزل؟' },
  ],
  page5WritingTips: [
    { id: 'tip-1', labelEn: 'Spelling', labelAr: 'الإملاء الصحيح للكلمات' },
    { id: 'tip-2', labelEn: 'Punctuation', labelAr: 'علامات الترقيم (الحرف الكبير والنقطة)' },
    { id: 'tip-3', labelEn: 'Wrong words', labelAr: 'تجنب الكلمات الخاطئة' },
    { id: 'tip-4', labelEn: 'Missing words', labelAr: 'التأكد من عدم نسيان كلمات' },
  ],
  sampleParagraphs: [
    {
      title: "Model 1: Holiday by the River (Faisal's style)",
      titleAr: 'النموذج 1: عطلة في القرية والنهر (أسلوب فيصل)',
      text: 'In the holidays, I went away to a small village by the river with my family. It was last month. I went swimming every single day and I also went fishing. I felt very excited and happy because the weather was lovely.',
    },
    {
      title: 'Model 2: Holiday at Home (Muna & Huda style)',
      titleAr: 'النموذج 2: عطلة هادئة في المنزل (أسلوب منى وهدى)',
      text: 'During the holidays, I stayed at home with my brothers and sisters. Every day, I got up late and read lots of interesting storybooks. I also learnt how to cook delicious food and made some nice clothes. I felt relaxed and comfortable.',
    },
  ],
};

export const lesson2ActivityData = {
  // AB Page 6 Ex B: Number the photographs
  page6ExBPhotos: [
    {
      id: 'p-a',
      letter: 'a',
      labelEn: 'Football (Al-Shaab Stadium)',
      labelAr: 'مباراة كرة القدم في ملعب الشعب',
      correctOrder: 1,
      hint: 'Second day in Baghdad afternoon',
      imageUrl: '/images/landmarks/landmark-stadium.jpg',
    },
    {
      id: 'p-d',
      letter: 'd',
      labelEn: 'Ur (Historical site & Ziggurat)',
      labelAr: 'مدينة أور والزقورة التاريخية',
      correctOrder: 2,
      hint: 'After Baghdad, took a coach down to Ur',
      imageUrl: '/images/landmarks/landmark-ziggurat.jpg',
    },
    {
      id: 'p-f',
      letter: 'f',
      labelEn: 'Marshes in the south (The boat trip)',
      labelAr: 'الأهوار في جنوب العراق ورحلة القارب',
      correctOrder: 3,
      hint: 'On Wednesday, boat trip to the marshes',
      imageUrl: '/images/landmarks/landmark-marshes.jpg',
    },
    {
      id: 'p-e',
      letter: 'e',
      labelEn: 'A traditional market in Erbil',
      labelAr: 'الأسواق التقليدية في أربيل',
      correctOrder: 4,
      hint: 'Friday morning in Erbil markets',
      imageUrl: '/images/dialogue/l2-r-7.jpg',
    },
    {
      id: 'p-b',
      letter: 'b',
      labelEn: 'The Citadel in Erbil (Yellow stone)',
      labelAr: 'قلعة أربيل الشهيرة ذات الحجارة الصفراء',
      correctOrder: 5,
      hint: 'Yellow stone Citadel with amazing view',
      imageUrl: '/images/landmarks/landmark-citadel.jpg',
    },
    {
      id: 'p-c',
      letter: 'c',
      labelEn: 'Hatra (Old temples in Mosul)',
      labelAr: 'مدينة الحضر والمعابد التاريخية بالموصل',
      correctOrder: 6,
      hint: 'For our last trip, stayed in Mosul and went to Hatra',
      imageUrl: '/images/landmarks/landmark-hatra.jpg',
    },
  ] as ABL2PhotoOrder[],

  // AB Page 6 Ex 1: Write one word he uses to describe each thing
  page6Ex1Descriptions: [
    {
      id: 'desc-a',
      itemEn: 'a. Football in Iraq',
      itemAr: 'كرة القدم في العراق (اللاعبون)',
      correctWord: 'fantastic',
      acceptableAnswers: ['fantastic'],
      options: ['fantastic', 'huge', 'exciting', 'boring', 'amazing', 'beautiful'],
    },
    {
      id: 'desc-b',
      itemEn: 'b. Ur (The ziggurat)',
      itemAr: 'الزقورة في مدينة أور',
      correctWord: 'huge',
      acceptableAnswers: ['huge'],
      options: ['fantastic', 'huge', 'exciting', 'boring', 'amazing', 'beautiful'],
    },
    {
      id: 'desc-c',
      itemEn: 'c. The marshes in the south of Iraq (The boat trip)',
      itemAr: 'الأهوار في جنوب العراق (رحلة القارب)',
      correctWord: 'exciting',
      acceptableAnswers: ['exciting', 'quite exciting'],
      options: ['fantastic', 'huge', 'exciting', 'boring', 'amazing', 'beautiful'],
    },
    {
      id: 'desc-d',
      itemEn: 'd. The markets (Shopping in the markets)',
      itemAr: 'التسوق في الأسواق بأربيل',
      correctWord: 'boring',
      acceptableAnswers: ['boring'],
      options: ['fantastic', 'huge', 'exciting', 'boring', 'amazing', 'beautiful'],
    },
    {
      id: 'desc-e',
      itemEn: 'e. The Citadel in Erbil (The view from the Citadel)',
      itemAr: 'المنظر والإطلالة من قلعة أربيل',
      correctWord: 'amazing',
      acceptableAnswers: ['amazing'],
      options: ['fantastic', 'huge', 'exciting', 'boring', 'amazing', 'beautiful'],
    },
    {
      id: 'desc-f',
      itemEn: 'f. Hatra (The old temples)',
      itemAr: 'المعابد القديمة في مدينة الحضر',
      correctWord: 'beautiful',
      acceptableAnswers: ['beautiful'],
      options: ['fantastic', 'huge', 'exciting', 'boring', 'amazing', 'beautiful'],
    },
  ] as ABL2DescriptionItem[],

  // AB Page 7 Ex 3: What do the words mean?
  page7Ex3Meanings: [
    {
      id: 'wm-ancient',
      word: 'ancient',
      definitionEn: 'very old; from a long time ago in history',
      definitionAr: 'قديم جداً، يعود لزمن بعيد في التاريخ',
      exampleSentence: 'Ur was the capital of the ancient Sumerian people.',
    },
    {
      id: 'wm-citadel',
      word: 'citadel',
      definitionEn: 'a strong fortress or castle built on high ground to defend a city',
      definitionAr: 'قلعة أو حصن منيع على مكان مرتفع لحماية المدينة',
      exampleSentence: 'The Citadel in Erbil is very high up and has an amazing view.',
    },
    {
      id: 'wm-marsh',
      word: 'marsh',
      definitionEn: 'an area of low land flooded in wet seasons or at high tide, typically with water and reeds',
      definitionAr: 'هور أو مسطح مائي ومستنقعات القصب',
      exampleSentence: 'We took a boat trip across to the marshes and saw pelicans.',
    },
    {
      id: 'wm-ziggurat',
      word: 'ziggurat',
      definitionEn: 'an ancient Mesopotamian stepped pyramid temple tower',
      definitionAr: 'برج معبدي مدرج في بلاد ما بين النهرين (زقورة)',
      exampleSentence: 'The ziggurat of Ur is about 21 metres high.',
    },
    {
      id: 'wm-bright',
      word: 'bright',
      definitionEn: 'giving out or reflecting much light; shining intensely',
      definitionAr: 'ساطع أو مشرق ولامع في ضوء الشمس',
      exampleSentence: 'The yellow stone of the Citadel is so bright in the sunshine.',
    },
  ] as ABL2WordMeaning[],

  // AB Page 7 Ex 4: Put the words in correct order to make sentences
  page7Ex4Scrambled: [
    {
      id: 'scrambled-a',
      scrambled: ['exciting', 'Richard', 'thought', 'the', 'was', 'football', 'match'],
      correctOrder: ['Richard', 'thought', 'the', 'football', 'match', 'was', 'exciting'],
      punctuation: '.',
      arabicTranslation: 'اعتقد ريتشارد أن مباراة كرة القدم كانت حماسية.',
    },
    {
      id: 'scrambled-b',
      scrambled: ['weekend', 'friends', 'you', 'the', 'Do', 'at', 'your', 'visit'],
      correctOrder: ['Do', 'you', 'visit', 'your', 'friends', 'at', 'the', 'weekend'],
      punctuation: '?',
      arabicTranslation: 'هل تزور أصدقاءك في عطلة نهاية الأسبوع؟',
    },
  ] as ABL2ScrambledSentence[],

  // AB Page 7 Ex 5: Listen to Sara talking about her holidays
  page7Ex5SaraQuestions: [
    {
      id: 'sara-a',
      questionEn: "a. What is Sara's friend's name?",
      questionAr: 'ما اسم صديقة سارة؟',
      correctAnswers: ['Sameera', 'samira', 'sameera'],
      explanation: 'Her friend Sameera came and stayed with her (سميرة).',
    },
    {
      id: 'sara-b',
      questionEn: 'b. Where does she live?',
      questionAr: 'أين تعيش صديقتها؟',
      correctAnswers: ['Abu Dhabi', 'abu dhabi'],
      explanation: 'She lives in Abu Dhabi (أبوظبي).',
    },
    {
      id: 'sara-c',
      questionEn: 'c. How old is she?',
      questionAr: 'كم عمر صديقتها؟',
      correctAnswers: ['thirteen', '13', 'thirteen years old', '13 years old'],
      explanation: "We are the same age - thirteen (عمرها 13 عاماً).",
    },
    {
      id: 'sara-d',
      questionEn: "d. Where did Sara's family take her? (Name the 4 places)",
      questionAr: 'إلى أين أخذتها عائلة سارة؟ (الأماكن الأربعة)',
      correctAnswers: ['museum', 'hatra', 'river', 'restaurant'],
      explanation: '1. The museum, 2. Hatra, 3. Walking along the river, 4. A restaurant for delicious food.',
    },
  ] as ABL2SaraNotes[],
};

export { lesson3ActivityData } from './activityBookLesson3Data';

export { lesson4ActivityData } from './activityBookLesson4Data';
