export interface KarenComprehensionQuestion {
  id: string;
  number: number;
  questionEn: string;
  questionAr: string;
  correctAnswer: string;
  acceptableAnswers: string[];
  explanationAr: string;
}

export interface ReconstructedQuestion {
  id: string;
  letterRef: string;
  clueEn: string;
  clueAr: string;
  correctQuestionEn: string;
  acceptableVariants: string[];
  explanationAr: string;
}

export interface LetterPlanningSection {
  id: string;
  paragraphNumber: number;
  titleEn: string;
  titleAr: string;
  guideQuestionsEn: string[];
  guideQuestionsAr: string[];
  placeholderEn: string;
  sampleNotesEn: string;
}

export interface ModelLetter {
  titleEn: string;
  titleAr: string;
  instructionEn: string;
  instructionAr: string;
  addressEn: string[];
  dateEn: string;
  greetingEn: string;
  paragraph1En: string;
  paragraph1Ar: string;
  paragraph2En: string;
  paragraph2Ar: string;
  paragraph3En: string;
  paragraph3Ar: string;
  signOffEn: string;
  signatureEn: string;
  fullLetterTextEn: string;
  fullLetterTextAr: string;
  keyWritingTipsAr: string[];
}

export const lesson8ActivityData = {
  // 1. SB Page 11 & Exam Comprehension Questions on Karen's Letter
  comprehensionQuestions: {
    titleEn: "Questions on Karen's Letter",
    titleAr: 'الأسئلة الاستيعابية المهمة لرسالة كارين (ص 11)',
    instructionEn: "Read Karen's letter on page 11 of your Student's Book and write short answers to each question:",
    instructionAr: 'اقرأ رسالة كارين من كتاب الطالب ص 11 واكتب إجابات نموذجية مختصرة عن كل سؤال:',
    questions: [
      {
        id: 'kq-1',
        number: 1,
        questionEn: 'Where does Karen come from?',
        questionAr: 'من أين تأتي كارين؟ (ما هو بلدها؟)',
        correctAnswer: 'She comes from Australia.',
        acceptableAnswers: [
          'australia',
          'from australia',
          'she comes from australia',
          'she is from australia',
          'sydney australia',
          'sydney, australia',
        ],
        explanationAr: 'كارين من أستراليا وتعيش في مدينة سيدني (19 Harbour Street, Sydney, Australia).',
      },
      {
        id: 'kq-2',
        number: 2,
        questionEn: 'Who is Jane?',
        questionAr: 'من هي جين؟',
        correctAnswer: "She is Karen's friend.",
        acceptableAnswers: [
          "karen's friend",
          'karens friend',
          "she is karen's friend",
          'she is karens friend',
          'her friend',
          'a friend of karen',
          'karen friend',
        ],
        explanationAr: 'جين هي صديقة كارين التي أقامت معها أسبوعين في العطلة ("I stayed with my friend, Jane, for two weeks").',
      },
      {
        id: 'kq-3',
        number: 3,
        questionEn: 'What does Karen like to eat?',
        questionAr: 'ماذا تحب كارين أن تأكل؟',
        correctAnswer: 'She likes to eat fish (cooked on a barbecue).',
        acceptableAnswers: [
          'fish',
          'she likes to eat fish',
          'she likes fish',
          'fish on a barbecue',
          'fish cooked on a barbecue',
          'barbecue fish',
        ],
        explanationAr: 'تحب كارين تناول السمك المشوي على الفحم ("Everyone liked fish, so we often had fish cooked on a barbecue").',
      },
      {
        id: 'kq-4',
        number: 4,
        questionEn: 'What does she do in her spare time?',
        questionAr: 'ماذا تفعل كارين في وقت فراغها؟ (ما هي هوايتها؟)',
        correctAnswer: 'She likes collecting photographs of countries around the world.',
        acceptableAnswers: [
          'she likes collecting photographs of countries around the world',
          'collecting photographs of countries around the world',
          'collecting photographs',
          'she collects photographs',
          'collecting photos of countries',
          'collecting photos',
        ],
        explanationAr: 'هوايتها في وقت الفراغ هي جمع صور بلدان العالم ("In my spare time, I like collecting photographs of countries around the world").',
      },
      {
        id: 'kq-5',
        number: 5,
        questionEn: 'Why did she ask Hala for photographs of Iraq?',
        questionAr: 'لماذا طلبت من هالة صوراً للعراق؟',
        correctAnswer: 'Because she does not have any of Iraq.',
        acceptableAnswers: [
          'because she does not have any of iraq',
          'because she doesn’t have any of iraq',
          'because she doesn\'t have any of iraq',
          'she does not have any of iraq',
          'she doesn\'t have any photos of iraq',
          'she doesn’t have any photos of iraq',
          'because she has no photos of iraq',
        ],
        explanationAr: 'لأنها لا تملك أي صورة للعراق في مجموعتها ("I do not have any of Iraq. Can you send me some, please?").',
      },
    ] as KarenComprehensionQuestion[],
  },

  // 2. AB Page 18 - Exercises 1 & 2: Reconstructing Karen's 6 Questions
  reconstructedQuestions: {
    titleEn: "Activity Book p. 18 • Karen's 6 Questions",
    titleAr: 'كتاب النشاط ص 18 • إعادة صياغة أسئلة كارين الستة',
    instructionEn: 'Karen asked six questions in her letter. Write the full questions using the clues provided:',
    instructionAr: 'طرحت كارين ستة أسئلة في رسالتها. اكتب السؤال كاملاً باستخدام الكلمات المفتاحية دون النظر لكتاب الطالب:',
    items: [
      {
        id: 'rq-a',
        letterRef: 'a',
        clueEn: 'back at school?',
        clueAr: 'العودة للمدرسة؟',
        correctQuestionEn: 'Are you back at school now?',
        acceptableVariants: [
          'are you back at school now',
          'are you back at school now?',
          'are you back to school now',
          'are you back at school',
        ],
        explanationAr: 'سألت كارين هالة في بداية رسالتها: "Are you back at school now?" (هل عدتِ للمدرسة الآن؟).',
      },
      {
        id: 'rq-b',
        letterRef: 'b',
        clueEn: 'a museum?',
        clueAr: 'متحف في بغداد؟',
        correctQuestionEn: 'Is there one in Baghdad?',
        acceptableVariants: [
          'is there one in baghdad',
          'is there one in baghdad?',
          'is there a museum in baghdad',
          'is there a museum in baghdad?',
        ],
        explanationAr: 'بعد حديثها عن زيارة المتحف في سيدني سألت: "Is there one in Baghdad?" (هل يوجد متحف في بغداد؟).',
      },
      {
        id: 'rq-c',
        letterRef: 'c',
        clueEn: 'favourite food?',
        clueAr: 'الطعام المفضل؟',
        correctQuestionEn: 'What is your favourite food?',
        acceptableVariants: [
          'what is your favourite food',
          'what is your favourite food?',
          'what is your favorite food',
          'what is your favorite food?',
          'what’s your favourite food',
          "what's your favourite food",
        ],
        explanationAr: 'بعد الحديث عن أكل السمك المشوي سألت: "What is your favourite food?" (ما هو طعامك المفضل؟).',
      },
      {
        id: 'rq-d',
        letterRef: 'd',
        clueEn: 'some photographs?',
        clueAr: 'إرسال بعض الصور؟',
        correctQuestionEn: 'Can you send me some, please?',
        acceptableVariants: [
          'can you send me some, please',
          'can you send me some, please?',
          'can you send me some please',
          'can you send me some photographs',
          'can you send me some photographs, please',
          'can you send me some pictures',
        ],
        explanationAr: 'عندما ذكرت هوايتها بجمع الصور سألت: "Can you send me some, please?" (هل يمكنك إرسال بعض الصور لي من فضلك؟).',
      },
      {
        id: 'rq-e',
        letterRef: 'e',
        clueEn: 'in the holidays?',
        clueAr: 'ماذا فعلتِ في العطلة؟',
        correctQuestionEn: 'What did you do in the holidays?',
        acceptableVariants: [
          'what did you do in the holidays',
          'what did you do in the holidays?',
          'what did you do in your holidays',
          'what did you do in your holidays?',
        ],
        explanationAr: 'السؤال عن أنشطة العطلة: "What did you do in the holidays?" (ماذا فعلتِ في العطلة؟).',
      },
      {
        id: 'rq-f',
        letterRef: 'f',
        clueEn: 'spare time?',
        clueAr: 'وقت الفراغ؟',
        correctQuestionEn: 'What do you do in your spare time?',
        acceptableVariants: [
          'what do you do in your spare time',
          'what do you do in your spare time?',
          'what do you do in spare time',
        ],
        explanationAr: 'السؤال عن وقت الفراغ والهوايات: "What do you do in your spare time?" (ماذا تفعلين في وقت فراغك؟).',
      },
    ] as ReconstructedQuestion[],
  },

  // 3. AB Page 18 - Exercise 3: Planning Reply Letter (Making Notes)
  planningNotes: {
    titleEn: 'Activity Book p. 18 • Make Notes to Plan Your Letter',
    titleAr: 'كتاب النشاط ص 18 • تدوين الملاحظات للتخطيط للرسالة',
    instructionEn: 'Make notes to plan your reply letter to Karen following the 3 paragraph structure:',
    instructionAr: 'دوّن ملاحظاتك للتخطيط لكتابة الرد على رسالة كارين وفق نظام الفقرات الثلاث:',
    sections: [
      {
        id: 'sec-p1',
        paragraphNumber: 1,
        titleEn: 'Paragraph 1: Thank Karen & School',
        titleAr: 'الفقرة 1: شكر كارين والحديث عن المدرسة',
        guideQuestionsEn: [
          'Thank Karen for her friendly letter.',
          'Are you back at school? What is your school like?',
        ],
        guideQuestionsAr: [
          'اشكر كارين على رسالتها اللطيفة.',
          'هل عدت للمدرسة؟ وما هو انطباعك عن مدرستك ومعلميك؟',
        ],
        placeholderEn: 'e.g. Thank you for your letter / Back at school last week / School is big and teachers are kind...',
        sampleNotesEn: 'Thanked Karen for letter; back at school last Sunday; my school is great and teachers are very helpful.',
      },
      {
        id: 'sec-p2',
        paragraphNumber: 2,
        titleEn: 'Paragraph 2: Iraq & The Museum',
        titleAr: 'الفقرة 2: العراق والمتحف والصور',
        guideQuestionsEn: [
          'Answer Karen: Is there a museum in Baghdad or your city?',
          'Tell her about photographs of Iraq you are sending.',
        ],
        guideQuestionsAr: [
          'أجب عن سؤال كارين: هل يوجد متحف في بغداد أو مدينتك؟',
          'أخبرها عن الصور الجميلة للعراق التي سترسلها لها.',
        ],
        placeholderEn: 'e.g. Yes, big museum in Baghdad / historic places / sending beautiful photos of ancient Babylon...',
        sampleNotesEn: 'Yes, famous National Museum in Baghdad; historic places; enclosed three lovely photos of Baghdad landmarks.',
      },
      {
        id: 'sec-p3',
        paragraphNumber: 3,
        titleEn: 'Paragraph 3: Holidays, Spare Time & Food',
        titleAr: 'الفقرة 3: العطلة، وقت الفراغ، والطعام المفضل',
        guideQuestionsEn: [
          'What did you do in the holidays?',
          'What do you do in your spare time?',
          'What is your favourite food?',
        ],
        guideQuestionsAr: [
          'ماذا فعلت في العطلة الصيفية؟',
          'ماذا تفعل في وقت فراغك؟',
          'ما هو طعامك العراقي المفضل؟',
        ],
        placeholderEn: 'e.g. Went to Erbil with family / Play football and chess / Favourite food is dolma and masgouf fish...',
        sampleNotesEn: 'Went to the north of Iraq with family; play football and video games; favourite food is dolma and grilled fish.',
      },
    ] as LetterPlanningSection[],
  },

  // 4. AB Page 19 - Unit 1 Composition: Write a letter to Karen (إنشاء الوحدة الأولى)
  modelLetterComposition: {
    titleEn: 'Unit 1 Composition: Write a letter to Karen',
    titleAr: 'إنشاء الوحدة الأولى: اكتب رسالة إلى كارين (ص 19)',
    instructionEn: 'The official model composition for Unit 1. Learn the structure, practice writing your own letter, and review key rules:',
    instructionAr: 'الإنشاء المقرر للحفظ في امتحانات الشهر ونصف السنة. تعلّم أجزاء الرسالة وتدرب على كتابتها:',
    addressEn: [
      'P.O. Box 24,',
      'Al-Mansour, Baghdad,',
      'Iraq.',
    ],
    dateEn: '15th October',
    greetingEn: 'Dear Karen,',
    paragraph1En:
      'Thank you very much for your letter. I am back at school now. My school is very nice, and my teachers are very kind and helpful.',
    paragraph1Ar:
      'شكراً جزيلاً لكِ على رسالتك. أنا عدتُ إلى المدرسة الآن. مدرستي جميلة جداً، ومدرسو ومدرسات مدرستي طيبون ومتعاونون للغاية.',
    paragraph2En:
      'In Iraq, there are many interesting and historic places. In Baghdad, there is a big and famous museum. I am sending you some lovely photographs of Iraq for your collection.',
    paragraph2Ar:
      'في العراق، توجد الكثير من الأماكن التاريخية والممتعة. وفي بغداد، يوجد متحف كبير ومشهور جداً. أنا أرسل لكِ بعض الصور الجميلة للعراق لتضيفيها إلى مجموعتك.',
    paragraph3En:
      'In the holidays, I went to the north of Iraq with my family. In my spare time, I like playing computer games and football with my friends. My favourite Iraqi food is dolma and grilled fish.',
    paragraph3Ar:
      'في العطلة، ذهبت إلى شمال العراق بصحبة عائلتي. وفي وقت فراغي، أحب لعب ألعاب الحاسوب وكرة القدم مع أصدقائي. طعامي العراقي المفضل هو الدولمة والسمك المسكوف.',
    signOffEn: 'Please write back soon.',
    signatureEn: 'Best wishes,\nHala',
    fullLetterTextEn: `P.O. Box 24,
Al-Mansour, Baghdad,
Iraq.
15th October

Dear Karen,

Thank you very much for your letter. I am back at school now. My school is very nice, and my teachers are very kind and helpful.

In Iraq, there are many interesting and historic places. In Baghdad, there is a big and famous museum. I am sending you some lovely photographs of Iraq for your collection.

In the holidays, I went to the north of Iraq with my family. In my spare time, I like playing computer games and football with my friends. My favourite Iraqi food is dolma and grilled fish.

Please write back soon.

Best wishes,
Hala`,
    fullLetterTextAr: `صندوق بريد 24،
المنصور، بغداد،
العراق.
15 تشرين الأول

عزيزتي كارين،

شكراً جزيلاً لكِ على رسالتك. أنا عدتُ إلى المدرسة الآن. مدرستي جميلة جداً، ومعلمي ومعلماتي طيبون ومتعاونون للغاية.

في العراق، توجد العديد من الأماكن التاريخية والممتعة. وفي بغداد، يوجد متحف كبير ومشهور. أنا أرسل لكِ بعض الصور الجميلة للعراق لمجموعتك.

في العطلة، ذهبت إلى شمال العراق مع عائلتي. وفي وقت فراغي، أحب لعب ألعاب الحاسوب وكرة القدم مع أصدقائي. طعامي المفضل هو الدولمة والسمك المشوي.

أرجو أن تكتبي لي قريباً.

أطيب التمنيات،
هالة`,
    keyWritingTipsAr: [
      'العنوان والتاريخ يُكتبان في الزاوية اليمنى العليا (Upper right corner).',
      'التحية تبدأ بحرف كبير ثم فاصلة: Dear Karen, على سطر مستقل في اليسار.',
      'تقسيم الرسالة إلى 3 فقرات واضحة وترك مسافة بادئة (Indentation) أو سطر فارغ بين كل فقرة وأخرى.',
      'استخدام الحروف الكبيرة (Capital letters) لأسماء الأشخاص (Karen, Hala) والبلدان والمدن (Iraq, Baghdad, Australia, Sydney) والأيام والشهور (October).',
      'الخاتمة تنتهي بعبارة ودية مثل Best wishes, أو Bye for now, متبوعة باسم المرسل في سطر مستقل.',
    ],
  } as ModelLetter,
};
