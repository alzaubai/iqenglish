export interface VerbItem {
  id: string;
  infinitive: string;
  infinitiveAr: string;
  past: string;
  column: 1 | 2 | 3; // 1 = regular -ed, 2 = irregular changed, 3 = irregular unchanged
  hint?: string;
}

export interface ActionTypeItem {
  id: string;
  number: 1 | 2 | 3;
  sentenceEn: string;
  sentenceAr: string;
  highlightedPart: string;
  correctType: 'a' | 'b' | 'c';
  correctTypeLabelEn: string;
  correctTypeLabelAr: string;
  explanationAr: string;
}

export interface StoryBlankItem {
  id: string;
  index: string; // 'a', 'b', ...
  verb: string;
  verbAr: string;
  correctAnswer: string;
  acceptableAnswers: string[];
  tense: 'past_simple' | 'past_continuous';
  explanationAr: string;
}

export interface AdjectiveStressItem {
  id: string;
  word: string;
  meaningAr: string;
  stressedPart: string;
  phoneticHint: string;
}

export interface AdjectiveSentenceItem {
  id: string;
  letter: string; // 'a', 'b', 'c', ...
  prefixEn: string;
  suffixEn: string;
  sentenceAr: string;
  correctWord: string;
  acceptableAnswers: string[];
  explanationAr: string;
}

export interface StoryQuestionItem {
  id: string;
  questionNumber: number;
  questionEn: string;
  questionAr: string;
  modelAnswerEn: string;
  modelAnswerAr: string;
  keywords: string[];
}

export const lesson3ActivityData = {
  // Page 8 Ex B: Action Types
  page8ExBActionTypes: [
    {
      id: 'at-1',
      number: 1,
      sentenceEn: 'We were sailing on the boat.',
      sentenceAr: 'كنا نبحر على متن القارب.',
      highlightedPart: 'were sailing',
      correctType: 'b',
      correctTypeLabelEn: 'general background',
      correctTypeLabelAr: 'خلفية عامة للحدث (مستمر لفترة)',
      explanationAr: 'استخدم الماضي المستمر (were sailing) ليعبر عن حدث كان مستمراً في الخلفية لتوضيح الأجواء العامة.',
    },
    {
      id: 'at-2',
      number: 2,
      sentenceEn: 'We were playing football and you fell in the mud.',
      sentenceAr: 'كنا نلعب كرة القدم وسقطتِ أنتِ في الوحل.',
      highlightedPart: 'were playing ... fell',
      correctType: 'c',
      correctTypeLabelEn: 'interrupted action',
      correctTypeLabelAr: 'حدث قاطعه حدث آخر (ماضي مستمر قاطعه ماضي بسيط)',
      explanationAr: 'كان اللعب مستمراً (were playing) وقاطعه فجأة حدث السقوط المفاجئ في الوحل (fell).',
    },
    {
      id: 'at-3',
      number: 3,
      sentenceEn: 'We pulled you out of the water ...',
      sentenceAr: 'سحبناك من الماء...',
      highlightedPart: 'pulled',
      correctType: 'a',
      correctTypeLabelEn: 'completed past action',
      correctTypeLabelAr: 'حدث ماضٍ مكتمل ومنتهٍ (ماضي بسيط)',
      explanationAr: 'حدث السحب (pulled) اكتمل وانتهى في الماضي بشكل محدد وسريع.',
    },
  ] as ActionTypeItem[],

  // Page 8 Ex 1: Complete the table
  page8Ex1Verbs: [
    // Column 1: Regular (-ed)
    { id: 'v-land', infinitive: 'land', infinitiveAr: 'يهبط', past: 'landed', column: 1, hint: 'يضاف ed' },
    { id: 'v-happen', infinitive: 'happen', infinitiveAr: 'يحدث / يقع', past: 'happened', column: 1, hint: 'يضاف ed' },
    { id: 'v-jump', infinitive: 'jump', infinitiveAr: 'يقفز', past: 'jumped', column: 1, hint: 'يضاف ed' },
    { id: 'v-pull', infinitive: 'pull', infinitiveAr: 'يسحب', past: 'pulled', column: 1, hint: 'يضاف ed' },
    { id: 'v-stay', infinitive: 'stay', infinitiveAr: 'يبقى / يمكث', past: 'stayed', column: 1, hint: 'يضاف ed' },

    // Column 2: Irregular (changes form)
    { id: 'v-come', infinitive: 'come', infinitiveAr: 'يأتي', past: 'came', column: 2, hint: 'o تصبح a' },
    { id: 'v-be', infinitive: 'be', infinitiveAr: 'يكون', past: 'was / were', column: 2, hint: 'was للمفرد / were للجمع' },
    { id: 'v-fall', infinitive: 'fall', infinitiveAr: 'يسقط / يقع', past: 'fell', column: 2, hint: 'a تصبح e' },
    { id: 'v-drive', infinitive: 'drive', infinitiveAr: 'يقود سيارة', past: 'drove', column: 2, hint: 'i تصبح o' },
    { id: 'v-do', infinitive: 'do', infinitiveAr: 'يفعل / يعمل', past: 'did', column: 2, hint: 'تتحول إلى did' },

    // Column 3: Irregular (no change)
    { id: 'v-hit', infinitive: 'hit', infinitiveAr: 'يصطدم / يضرب', past: 'hit', column: 3, hint: 'يبقى كما هو دون أي تغيير' },
  ] as VerbItem[],

  // Page 8 Ex 2 & 3: Notes & Extra Verbs
  page8Ex2Rules: {
    titleAr: 'قاعدة الأعمدة الثلاثة (تمرين 2 & 3 ص 8)',
    col1Title: 'العمود 1 (Regular Verbs - أفعال قياسية)',
    col1Rule: 'يضاف إلى نهاية الفعل (ed) أو (d) عند تحويله إلى الماضي البسيط.',
    col1Examples: ['visited', 'watched', 'played', 'walked', 'cooked'],

    col2Title: 'العمود 2 (Irregular Verbs - أفعال شاذة متغيرة)',
    col2Rule: 'يتغير شكل الفعل وحروف العلة فيه بالكامل ولا يقبل إضافة ed.',
    col2Examples: ['went', 'saw', 'bought', 'ate', 'took', 'gave'],

    col3Title: 'العمود 3 (Irregular Unchanged - أفعال شاذة ثابتة)',
    col3Rule: 'أفعال شاذة يبقى شكلها وإملاؤها كما هو تماماً في المضارع والماضي.',
    col3Examples: ['hit', 'put', 'cut', 'cost', 'hurt', 'read (نفس الإملاء)'],
  },

  // Page 8 Ex 4: Wordsearch (12 Past verbs)
  page8Ex4Wordsearch: {
    grid: [
      ['d', 'i', 'd', 'a', 'r', 'f', 'r', 'f', 'r', 'w'],
      ['n', 'e', 'y', 'a', 'c', 'a', 'm', 'e', 'f', 'q'],
      ['m', 's', 'r', 'b', 's', 'l', 'o', 'l', 'h', 's'],
      ['i', 't', 'l', 'n', 'w', 'a', 's', 'l', 'j', 'a'],
      ['h', 'a', 'p', 'p', 'e', 'n', 'e', 'd', 'u', 'p'],
      ['l', 'y', 'u', 'g', 'r', 'k', 's', 'r', 'm', 'o'],
      ['t', 'e', 'l', 'r', 'e', 'd', 'd', 'o', 'p', 'i'],
      ['e', 'd', 'l', 'k', 'h', 'a', 'v', 'v', 'e', 't'],
      ['t', 'w', 'e', 'l', 'a', 'n', 'd', 'e', 'd', 'g'],
      ['r', 'u', 'd', 'i', 'k', 'l', 'a', 's', 'e', 'b'],
    ],
    words: [
      { word: 'did', meaningAr: 'فعل (ماضي do)' },
      { word: 'came', meaningAr: 'أتى (ماضي come)' },
      { word: 'was', meaningAr: 'كان للمفرد (ماضي be)' },
      { word: 'were', meaningAr: 'كانوا للجمع (ماضي be)' },
      { word: 'happened', meaningAr: 'حدث (ماضي happen)' },
      { word: 'landed', meaningAr: 'هبط (ماضي land)' },
      { word: 'drove', meaningAr: 'قاد (ماضي drive)' },
      { word: 'fell', meaningAr: 'سقط (ماضي fall)' },
      { word: 'hit', meaningAr: 'اصطدم (ماضي hit)' },
      { word: 'jumped', meaningAr: 'قفز (ماضي jump)' },
      { word: 'pulled', meaningAr: 'سحب (ماضي pull)' },
      { word: 'stayed', meaningAr: 'بقي (ماضي stay)' },
    ],
  },

  // Page 9 Ex 5: Richard in Baghdad Paragraph
  page9Ex5Story: [
    {
      id: 'story-a',
      index: 'a',
      verb: 'want',
      verbAr: 'يريد',
      correctAnswer: 'wanted',
      acceptableAnswers: ['wanted'],
      tense: 'past_simple',
      explanationAr: 'ماضي بسيط (wanted): أفعال الرغبة والشعور (stative verbs) لا تأتي في صيغة المستمر.',
    },
    {
      id: 'story-b',
      index: 'b',
      verb: 'ask',
      verbAr: 'يسأل / يطلب',
      correctAnswer: 'asked',
      acceptableAnswers: ['asked'],
      tense: 'past_simple',
      explanationAr: 'ماضي بسيط (asked): حدث محدد ومنجز قام به والده.',
    },
    {
      id: 'story-c',
      index: 'c',
      verb: 'give',
      verbAr: 'يعطي',
      correctAnswer: 'gave',
      acceptableAnswers: ['gave'],
      tense: 'past_simple',
      explanationAr: 'ماضي بسيط شاذ (gave): أعطاهم الاسم وانتهى الحدث.',
    },
    {
      id: 'story-d',
      index: 'd',
      verb: 'walk',
      verbAr: 'يمشي / يسير',
      correctAnswer: 'were walking',
      acceptableAnswers: ['were walking'],
      tense: 'past_continuous',
      explanationAr: 'ماضي مستمر (were walking): بعد أداة الربط While ومع الفاعل الجمع (they).',
    },
    {
      id: 'story-e',
      index: 'e',
      verb: 'forget',
      verbAr: 'ينسى',
      correctAnswer: 'forgot',
      acceptableAnswers: ['forgot'],
      tense: 'past_simple',
      explanationAr: 'ماضي بسيط شاذ (forgot): حدث مفاجئ قاطع المشي أثناء سيرهم.',
    },
    {
      id: 'story-f',
      index: 'f',
      verb: 'see',
      verbAr: 'يرى',
      correctAnswer: 'saw',
      acceptableAnswers: ['saw'],
      tense: 'past_simple',
      explanationAr: 'ماضي بسيط شاذ (saw): رأوا السوق الشعبي في لحظة معينة.',
    },
    {
      id: 'story-g',
      index: 'g',
      verb: 'sell',
      verbAr: 'يبيع',
      correctAnswer: 'was selling',
      acceptableAnswers: ['was selling', 'sold'],
      tense: 'past_continuous',
      explanationAr: 'ماضي مستمر (was selling): البائع كان مستمراً في عرض وبيع الملابس عند وصولهم.',
    },
    {
      id: 'story-h',
      index: 'h',
      verb: 'not like',
      verbAr: 'لا يعجب / لم يعجبه',
      correctAnswer: "didn't like",
      acceptableAnswers: ["didn't like", 'did not like'],
      tense: 'past_simple',
      explanationAr: 'نفي ماضي بسيط (didn\'t like): فعل الإعجاب من أفعال المشاعر ولا يقبل المستمر.',
    },
    {
      id: 'story-i',
      index: 'i',
      verb: 'buy',
      verbAr: 'يشتري',
      correctAnswer: 'bought',
      acceptableAnswers: ['bought'],
      tense: 'past_simple',
      explanationAr: 'ماضي بسيط شاذ (bought): اشترى الحذاء والقميصين واكتمل الشراء.',
    },
    {
      id: 'story-j',
      index: 'j',
      verb: 'not buy',
      verbAr: 'لم يشترِ',
      correctAnswer: "didn't buy",
      acceptableAnswers: ["didn't buy", 'did not buy'],
      tense: 'past_simple',
      explanationAr: 'نفي ماضي بسيط (didn\'t buy): لم يشترِ والده أي شيء.',
    },
  ] as StoryBlankItem[],

  // Page 9 Ex 6: Adjective Stresses
  page9Ex6AdjectiveStress: [
    { id: 'adj-1', word: 'beautiful', meaningAr: 'جميل', stressedPart: 'beau', phoneticHint: 'BEAU-ti-ful' },
    { id: 'adj-2', word: 'boring', meaningAr: 'ممل', stressedPart: 'bor', phoneticHint: 'BOR-ing' },
    { id: 'adj-3', word: 'delicious', meaningAr: 'لذيذ', stressedPart: 'li', phoneticHint: 'de-LI-cious' },
    { id: 'adj-4', word: 'fantastic', meaningAr: 'رائع / خيالي', stressedPart: 'tas', phoneticHint: 'fan-TAS-tic' },
    { id: 'adj-5', word: 'horrible', meaningAr: 'فظيع / بشع', stressedPart: 'hor', phoneticHint: 'HOR-ri-ble' },
    { id: 'adj-6', word: 'lovely', meaningAr: 'بديع / جميل / محبوب', stressedPart: 'love', phoneticHint: 'LOVE-ly' },
    { id: 'adj-7', word: 'terrible', meaningAr: 'مروع / سيء جداً', stressedPart: 'ter', phoneticHint: 'TER-ri-ble' },
  ] as AdjectiveStressItem[],

  // Page 9 Ex 7: Use each adjective in one sentence (Complete 7 sentences)
  page9Ex7Sentences: [
    {
      id: 'sent-a',
      letter: 'a',
      prefixEn: 'My brother cooked dinner last night, and it was',
      suffixEn: '.',
      sentenceAr: 'طهى أخي العشاء الليلة الماضية، وكان لذيذاً.',
      correctWord: 'delicious',
      acceptableAnswers: ['delicious'],
      explanationAr: 'delicious تعني لذيذ؛ وهي الصفة المناسبة والوحيدة الخاصة بالأطعمة والعشاء.',
    },
    {
      id: 'sent-b',
      letter: 'b',
      prefixEn: 'I saw a',
      suffixEn: 'accident on my way to school.',
      sentenceAr: 'رأيت حادثاً مروعاً في طريقي إلى المدرسة.',
      correctWord: 'terrible',
      acceptableAnswers: ['terrible', 'horrible'],
      explanationAr: 'terrible تعني مروع وفظيع؛ وتستخدم لوصف الحوادث المؤسفة (accident).',
    },
    {
      id: 'sent-c',
      letter: 'c',
      prefixEn: 'The Arabian horse is a',
      suffixEn: 'animal.',
      sentenceAr: 'الحصان العربي حيوان جميل وبديع.',
      correctWord: 'lovely',
      acceptableAnswers: ['lovely', 'beautiful'],
      explanationAr: 'lovely هي الصفة النموذجية المعتمدة في تمرين كتاب النشاط ودليل المعلم للحصان العربي (The Arabian horse is a lovely animal).',
    },
    {
      id: 'sent-d',
      letter: 'd',
      prefixEn: "Jassim doesn't like football. He thinks it's",
      suffixEn: '.',
      sentenceAr: 'جاسم لا يحب كرة القدم. إنه يعتقد أنها مملة.',
      correctWord: 'boring',
      acceptableAnswers: ['boring'],
      explanationAr: 'boring تعني مملة؛ لأن جاسم لا يحبها فيراها بلا متعة.',
    },
    {
      id: 'sent-e',
      letter: 'e',
      prefixEn: 'Huda saw a',
      suffixEn: 'dress in a shop window. She wants to buy it.',
      sentenceAr: 'رأت هدى فستاناً جميلاً في واجهة المحل. هي تريد شراءه.',
      correctWord: 'beautiful',
      acceptableAnswers: ['beautiful', 'lovely'],
      explanationAr: 'beautiful تعني جميل وأنيق؛ وتستخدم لوصف الفستان والملابس الجذابة.',
    },
    {
      id: 'sent-f',
      letter: 'f',
      prefixEn: 'In some countries, young children have to work all day. I think that is',
      suffixEn: '.',
      sentenceAr: 'في بعض البلدان، يُجبر الأطفال الصغار على العمل طوال اليوم. أعتقد أن ذلك أمر بشع/مريع.',
      correctWord: 'horrible',
      acceptableAnswers: ['horrible', 'terrible'],
      explanationAr: 'horrible تعني بشع وشنيع أخلاقياً وإنسانياً لوصف عمالة الأطفال الصغار.',
    },
    {
      id: 'sent-g',
      letter: 'g',
      prefixEn: 'A cheetah can run at more than 110 kilometres an hour. That is',
      suffixEn: '!',
      sentenceAr: 'يستطيع الفهد الركض بسرعة تتجاوز 110 كيلومترات في الساعة. هذا شيء رائع وخيالي!',
      correctWord: 'fantastic',
      acceptableAnswers: ['fantastic'],
      explanationAr: 'fantastic تعني رائع ومذهل للغاية للتعجب من سرعة الفهد الفائقة.',
    },
  ] as AdjectiveSentenceItem[],

  // Student's Book Page 6 Ex A: Comprehension Questions
  page6StudentBookQuestions: [
    {
      id: 'sb-q1',
      questionNumber: 1,
      questionEn: 'Why is Mariam talking about what happened last year?',
      questionAr: 'لماذا تتحدث مريم عما حدث في العام الماضي؟',
      modelAnswerEn: 'Because a picture came up (on her phone/screen).',
      modelAnswerAr: 'لأن صورة ظهرت لها تذكر بالرحلة النهرية.',
      keywords: ['picture', 'came up', 'photo', 'remember'],
    },
    {
      id: 'sb-q2',
      questionNumber: 2,
      questionEn: 'Does Khalid like talking about what happened? How do you know?',
      questionAr: 'هل يحب خالد التحدث عما حدث؟ وكيف تعرف ذلك؟',
      modelAnswerEn: 'No, he doesn\'t. He says "I don\'t want to talk about it" and just says "Hmm".',
      modelAnswerAr: 'كلا، لا يحب؛ لأنه قال بصراحة "لا أريد التحدث عن ذلك" ويكتفي بالهمهمة.',
      keywords: ['no', 'want to talk', 'hmm'],
    },
    {
      id: 'sb-q3',
      questionNumber: 3,
      questionEn: 'Did Khalid get wet?',
      questionAr: 'هل تبلل خالد بالماء؟',
      modelAnswerEn: 'Yes, he did (he fell into the water).',
      modelAnswerAr: 'نعم، تبلل لأنه سقط في ماء النهر.',
      keywords: ['yes', 'fell', 'water'],
    },
    {
      id: 'sb-q4',
      questionNumber: 4,
      questionEn: 'Why didn\'t Khalid have dinner that night?',
      questionAr: 'لماذا لم يتناول خالد العشاء تلك الليلة؟',
      modelAnswerEn: 'Because he was too embarrassed.',
      modelAnswerAr: 'لأنه كان محرجاً وخجولاً للغاية مما حدث.',
      keywords: ['embarrassed', 'too embarrassed', 'shy'],
    },
    {
      id: 'sb-q5',
      questionNumber: 5,
      questionEn: 'When did Mariam fall in the mud?',
      questionAr: 'متى سقطت مريم في الوحل؟',
      modelAnswerEn: 'The next day, when they were playing football.',
      modelAnswerAr: 'في اليوم التالي، عندما كانوا يلعبون كرة القدم.',
      keywords: ['next day', 'playing football', 'football'],
    },
  ] as StoryQuestionItem[],
};
