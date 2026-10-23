export interface ScrapbookMatchItem {
  id: string;
  number: number;
  personNameEn: string;
  personNameAr: string;
  hobbyEn: string;
  hobbyAr: string;
  detailsEn: string;
  detailsAr: string;
  imageUrl: string;
  scrapbookImageHint: string;
}

export interface PronounSentenceItem {
  id: string;
  letter: string;
  prefixEn: string;
  suffixEn?: string;
  sentenceAr: string;
  correctWord: string;
  correctWord2?: string; // for double blank sentences like (c) and (f)
  acceptableAnswers: string[];
  options: string[];
  explanationAr: string;
}

export interface NotCorrectItem {
  id: string;
  letter: string;
  promptEn: string;
  promptAr: string;
  options: {
    text: string;
    isCorrectGrammar: boolean; // true = valid grammar, false = invalid (this is the one to tick!)
    type: 'noun' | 'gerund' | 'bare_infinitive';
    reasonAr: string;
  }[];
  explanationAr: string;
}

export interface HobbyDeductionItem {
  id: string;
  letter: string;
  textEn: string;
  textAr: string;
  promptPrefixEn: string;
  sentenceAr: string;
  correctAnswer: string;
  acceptableAnswers: string[];
  explanationAr: string;
  imageHint: string;
}

export const lesson4ActivityData = {
  // AB Page 10 Ex A: Match each person to their scrapbook (1-6)
  page10ExAMatches: [
    {
      id: 'match-1',
      number: 1,
      personNameEn: 'Rawan',
      personNameAr: 'روان',
      hobbyEn: 'Pictures of plants and flowers',
      hobbyAr: 'صور النباتات والزهور من حول العالم',
      detailsEn: 'Enjoys collecting pictures of plants and flowers. Loves colours and shapes.',
      detailsAr: 'تستمتع بجمع صور النباتات والأزهار وتعشق ألوانها وأشكالها.',
      imageUrl: '/images/dialogue/l4-4.jpg',
      scrapbookImageHint: 'دفتر أصفر به أزهار ونباتات وزهرة عباد الشمس',
    },
    {
      id: 'match-2',
      number: 2,
      personNameEn: 'Muna',
      personNameAr: 'منى',
      hobbyEn: 'Birds and photos',
      hobbyAr: 'الطيور والتقاط صورها ومعرفة أسمائها',
      detailsEn: 'Interested in birds. Takes photos in spare time and finds out their names.',
      detailsAr: 'مهتمة بالطيور، تلتقط صورها وتبحث عن أسمائها في وقت فراغها.',
      imageUrl: '/images/dialogue/l4-5.jpg',
      scrapbookImageHint: 'دفتر أزرق به صور طيور ملونة مختلفة',
    },
    {
      id: 'match-3',
      number: 3,
      personNameEn: 'Maysam',
      personNameAr: 'ميسم',
      hobbyEn: 'Pictures and stamps of other countries',
      hobbyAr: 'صور وطوابع البلدان الأخرى',
      detailsEn: 'Likes finding out about other countries. Has lots of pictures and stamps.',
      detailsAr: 'تحب التعرف على بلدان العالم ولديها الكثير من الصور والطوابع البريدية.',
      imageUrl: '/images/dialogue/l4-1.jpg',
      scrapbookImageHint: 'دفتر أخضر به مجموعة طوابع بريدية من دول متعددة',
    },
    {
      id: 'match-4',
      number: 4,
      personNameEn: 'Bassem',
      personNameAr: 'باسم',
      hobbyEn: 'Planes and flying',
      hobbyAr: 'الطائرات والطيران',
      detailsEn: 'Wants to be a pilot. Very interested in planes and flying.',
      detailsAr: 'يريد أن يصبح طياراً ومهتم جداً بالطائرات والتحليق.',
      imageUrl: '/images/dialogue/l4-3.jpg',
      scrapbookImageHint: 'دفتر بنفسجي مرسوم عليه طائرة تحلق فوق المباني',
    },
    {
      id: 'match-5',
      number: 5,
      personNameEn: 'Laith',
      personNameAr: 'ليث',
      hobbyEn: 'Football and matches',
      hobbyAr: 'كرة القدم والمباريات',
      detailsEn: 'Plays it, watches on TV, goes to matches, and collects footballers pictures.',
      detailsAr: 'يلعب كرة القدم ويشاهدها في التلفاز ويحضر المباريات ويجمع صور اللاعبين.',
      imageUrl: '/images/dialogue/l4-6.jpg',
      scrapbookImageHint: 'دفتر أزرق عليه لاعب كرة قدم بقميص برتقالي والكرة',
    },
    {
      id: 'match-6',
      number: 6,
      personNameEn: 'Adel',
      personNameAr: 'عادل',
      hobbyEn: 'Photos of animals in Africa',
      hobbyAr: 'صور حيوانات قارة أفريقيا',
      detailsEn: 'Wants to go to Africa and take photos of animals. Cuts out pictures.',
      detailsAr: 'يريد السفر لأفريقيا لتصوير الحيوانات، ويجمع صورها حالياً من المجلات.',
      imageUrl: '/images/dialogue/l4-2.jpg',
      scrapbookImageHint: 'دفتر أخضر عليه صورة فيل وحيوانات برية في بيئة سافانا',
    },
  ] as ScrapbookMatchItem[],

  // AB Page 10 Ex 1: Possessive Pronouns (All 7 sentences a-g)
  page10Ex1Pronouns: [
    {
      id: 'pro-a',
      letter: 'a',
      prefixEn: 'Sameera lost her watch yesterday. So I think this watch is',
      suffixEn: '.',
      sentenceAr: 'فقدت سميرة ساعتها أمس، لذلك أعتقد أن هذه الساعة هي (ملكها / لها).',
      correctWord: 'hers',
      acceptableAnswers: ['hers'],
      options: ['hers', 'mine', 'yours', 'ours', 'theirs'],
      explanationAr: 'نستخدم (hers) لأن الفاعل المؤنث سميرة (Sameera = She) وضمير التملك المستقل لها هو hers.',
    },
    {
      id: 'pro-b',
      letter: 'b',
      prefixEn: 'Bilal, I think this book is',
      suffixEn: '. You left it in my house yesterday.',
      sentenceAr: 'بلال، أعتقد أن هذا الكتاب هو (لك / ملكك). لقد تركته في بيتي بالأمس.',
      correctWord: 'yours',
      acceptableAnswers: ['yours'],
      options: ['yours', 'mine', 'hers', 'ours', 'theirs'],
      explanationAr: 'المتحدث يوجه الخطاب لبلال (مخاطب = You)، وضمير التملك العائد عليه هو yours.',
    },
    {
      id: 'pro-c',
      letter: 'c',
      prefixEn: 'We took that ball to the beach. It is',
      suffixEn: ', but those boys think it is',
      sentenceAr: 'أخذنا تلك الكرة إلى الشاطئ. إنها (لنا / ملكنا)، لكن أولئك الأولاد يعتقدون أنها (لهم / ملكهم).',
      correctWord: 'ours',
      correctWord2: 'theirs',
      acceptableAnswers: ['ours', 'theirs', 'ours / theirs', 'ours and theirs'],
      options: ['ours / theirs', 'mine / yours', 'hers / ours', 'theirs / mine'],
      explanationAr: 'الفراغ الأول يعود على نحن (We) فنستخدم ours، والفراغ الثاني يعود على الأولاد (those boys = they) فنستخدم theirs.',
    },
    {
      id: 'pro-d',
      letter: 'd',
      prefixEn: "Halla doesn't have a radio, so I lent her",
      suffixEn: '.',
      sentenceAr: 'حلا ليس لديها مذياع (راديو)، لذلك أقرضتها (جهازي / المذياع الخاص بي).',
      correctWord: 'mine',
      acceptableAnswers: ['mine'],
      options: ['mine', 'yours', 'hers', 'ours', 'theirs'],
      explanationAr: 'المتحدث هو الفاعل (I)، وأقرضها الشيء العائد عليه، فضمير التملك هو mine (أي my radio).',
    },
    {
      id: 'pro-e',
      letter: 'e',
      prefixEn: "My brothers want to play with my ball, but they won't let me play with",
      suffixEn: '.',
      sentenceAr: 'إخوتي يريدون اللعب بكرتي، لكنهم لا يسمحون لي باللعب بـ (كرتهم / ما يملكونه).',
      correctWord: 'theirs',
      acceptableAnswers: ['theirs'],
      options: ['theirs', 'ours', 'hers', 'yours', 'mine'],
      explanationAr: 'يعود الضمير على إخوتي (My brothers = they)، وضمير التملك المناسب هو theirs (أي their ball).',
    },
    {
      id: 'pro-f',
      letter: 'f',
      prefixEn: "That pen isn't",
      suffixEn: ". I only lent it to you. It's",
      sentenceAr: 'ذلك القلم ليس (لك / ملكك). أنا فقط أعرته لك. إنه (لي / ملكي) وأنا أحتاجه.',
      correctWord: 'yours',
      correctWord2: 'mine',
      acceptableAnswers: ['yours', 'mine', 'yours / mine'],
      options: ['yours / mine', 'mine / yours', 'hers / ours', 'theirs / mine'],
      explanationAr: 'الفراغ الأول يخاطبه بأنه ليس قلمك (isn\'t yours)، والفراغ الثاني يؤكد أنه قلمي أنا (It\'s mine).',
    },
    {
      id: 'pro-g',
      letter: 'g',
      prefixEn: 'I gave this book to Layla, so now it is',
      suffixEn: '.',
      sentenceAr: 'أعطيت هذا الكتاب لليلى، لذا فهو الآن (لها / ملكها).',
      correctWord: 'hers',
      acceptableAnswers: ['hers'],
      options: ['hers', 'theirs', 'mine', 'yours', 'ours'],
      explanationAr: 'أصبح الكتاب ملكاً لليلى (Layla = She)، وضمير التملك المستقل العائد عليها هو hers.',
    },
  ] as PronounSentenceItem[],

  // AB Page 10 Grammar Box
  page10GrammarBox: {
    titleEn: 'Talking about your interests',
    titleAr: 'التعبير عن الاهتمامات والهوايات',
    verbsEn: ['I like ...', "I'm interested in ...", 'I enjoy ...', 'I love ...'],
    verbsAr: 'أنا أحب... / أنا مهتم بـ... / أنا أستمتع بـ... / أنا أعشق...',
    ruleAr: 'بعد أفعال الاهتمام والشعور (like, enjoy, love) وحرف الجر (interested in)، يمكن استخدام إما:',
    case1Title: '1. صيغة المصدر مع ing (Gerund)',
    case1Examples: ['cooking (الطبخ)', 'writing stories (كتابة القصص)', 'listening to music (الاستماع للموسيقى)', 'playing football (لعب كرة القدم)'],
    case2Title: '2. اسم صريح (Noun)',
    case2Examples: ['tennis (التنس)', 'art (الفن / الرسم)', 'science (العلوم)', 'football (كرة القدم)'],
    warningAr: '⚠️ تحذير مهم: لا يجوز أبداً استخدام فعل مجرد (Bare Infinitive مثل play أو do أو read) بعد هذه العبارات!',
  },

  // AB Page 10 & 11 Ex 2: Tick the option that is NOT correct (a, b, c, d)
  page10Ex2NotCorrect: [
    {
      id: 'nc-a',
      letter: 'a',
      promptEn: 'I like ...',
      promptAr: 'أنا أحب...',
      options: [
        { text: 'football.', isCorrectGrammar: true, type: 'noun', reasonAr: 'صحيح (اسم صريح Noun)' },
        { text: 'playing football.', isCorrectGrammar: true, type: 'gerund', reasonAr: 'صحيح (صيغة مصدر Gerund تنتهي بـ ing)' },
        { text: 'play football.', isCorrectGrammar: false, type: 'bare_infinitive', reasonAr: '❌ غير صحيح! (فعل مجرد bare infinitive لا يجوز بعد like)' },
      ],
      explanationAr: 'الخيار الخاطئ نحواً هو (play football)؛ لأن فعل like يتطلب بعده اسماً أو مصدراً ينتهي بـ ing، ولا يقبل فعلاً مجرداً.',
    },
    {
      id: 'nc-b',
      letter: 'b',
      promptEn: "I'm interested in ...",
      promptAr: 'أنا مهتم بـ...',
      options: [
        { text: 'science.', isCorrectGrammar: true, type: 'noun', reasonAr: 'صحيح (اسم صريح Noun)' },
        { text: 'finding out about science.', isCorrectGrammar: true, type: 'gerund', reasonAr: 'صحيح (فعل مضاف له ing بعد حرف الجر in)' },
        { text: 'do experiments.', isCorrectGrammar: false, type: 'bare_infinitive', reasonAr: '❌ غير صحيح! (فعل مجرد bare infinitive بعد حرف الجر)' },
      ],
      explanationAr: 'الخيار الخاطئ نحواً هو (do experiments)؛ لأن حرف الجر (in) يجب أن يتبعه اسم أو فعل مضاف إليه ing (مثل doing experiments).',
    },
    {
      id: 'nc-c',
      letter: 'c',
      promptEn: 'I enjoy ...',
      promptAr: 'أنا أستمتع بـ...',
      options: [
        { text: 'playing sport.', isCorrectGrammar: true, type: 'gerund', reasonAr: 'صحيح (صيغة مصدر Gerund تنتهي بـ ing)' },
        { text: 'play sport.', isCorrectGrammar: false, type: 'bare_infinitive', reasonAr: '❌ غير صحيح! (فعل مجرد bare infinitive لا يجوز بعد enjoy)' },
        { text: 'sport.', isCorrectGrammar: true, type: 'noun', reasonAr: 'صحيح (اسم صريح Noun)' },
      ],
      explanationAr: 'الخيار الخاطئ نحواً هو (play sport)؛ لأن فعل enjoy يتبعه Gerund أو Noun حصراً.',
    },
    {
      id: 'nc-d',
      letter: 'd',
      promptEn: 'She likes ...',
      promptAr: 'هي تحب...',
      options: [
        { text: 'read.', isCorrectGrammar: false, type: 'bare_infinitive', reasonAr: '❌ غير صحيح! (فعل مجرد bare infinitive لا يجوز بعد likes)' },
        { text: 'reading.', isCorrectGrammar: true, type: 'gerund', reasonAr: 'صحيح (مصدر Gerund منتهي بـ ing)' },
        { text: 'reading books.', isCorrectGrammar: true, type: 'gerund', reasonAr: 'صحيح (مصدر Gerund متبوع بمفعول به)' },
      ],
      explanationAr: 'الخيار الخاطئ نحواً هو (read)؛ لأنه فعل مجرد بدون s وبدون ing.',
    },
  ] as NotCorrectItem[],

  // AB Page 11 Ex 3: Read, think and answer (3 Case Studies)
  page11Ex3Hobbies: [
    {
      id: 'case-a',
      letter: 'a',
      textEn: "I'm in a team. We have training on Monday evenings, and we have a game every Saturday. It's great fun, but we have to work hard.",
      textAr: 'أنا في فريق. لدينا تدريب مساء أيام الاثنين، ولدينا مباراة كل سبت. إنه أمر ممتع للغاية، لكن علينا أن نعمل بجد.',
      promptPrefixEn: "She's interested in",
      sentenceAr: 'هي مهتمة بـ...',
      correctAnswer: 'playing sport',
      acceptableAnswers: ['playing sport', 'sport', 'playing basketball', 'playing football', 'playing in a team'],
      explanationAr: 'لديها تدريب ومباريات منتظمة في فريق، إذن اهتمامها هو ممارسة الرياضة (playing sport) أو الرياضة (sport).',
      imageHint: 'صورة الفتاة الرياضية التي ترتدي النظارات',
    },
    {
      id: 'case-b',
      letter: 'b',
      textEn: 'Every week, I have to make food for all the family. I choose a different country every week and find out more about the things they eat. I love doing it, but my family are very honest. If they don\'t like it, they tell me!',
      textAr: 'كل أسبوع، عليّ إعداد الطعام لجميع أفراد الأسرة. أختار بلداً مختلفاً كل أسبوع وأتعرف على الأطعمة التي يتناولونها. أحب القيام بذلك، لكن عائلتي صريحة جداً؛ إذا لم يعجبهم الطعام يخبرونني!',
      promptPrefixEn: 'He likes',
      sentenceAr: 'هو يحب...',
      correctAnswer: 'cooking',
      acceptableAnswers: ['cooking', 'making food', 'cooking food', 'preparing food'],
      explanationAr: 'يصنع الطعام لعائلته كل أسبوع من مطابخ بلدان مختلفة، إذن هوايته هي الطبخ (cooking) أو إعداد الطعام (making food).',
      imageHint: 'صورة الفتى المبتسم الذي يطبخ لعائلته',
    },
    {
      id: 'case-c',
      letter: 'c',
      textEn: "I'm in a plane, flying high in the sky. The instructor opens the door. We look down and see the world below. Brrr! It's really scary!",
      textAr: 'أنا في الطائرة، أحلق عالياً في السماء. المدرب يفتح الباب. ننظر إلى الأسفل ونرى العالم تحتنا. بررر! إنه أمر مخيف حقاً!',
      promptPrefixEn: 'She enjoys',
      sentenceAr: 'هي تستمتع بـ...',
      correctAnswer: 'skydiving',
      acceptableAnswers: ['skydiving', 'parachuting', 'flying', 'jumping out of planes', 'sky diving'],
      explanationAr: 'في الطائرة ويفتح المدرب الباب للقفز، إذن هي تمارس هواية القفز بالمظلة (skydiving أو parachuting).',
      imageHint: 'صورة الفتاة المستعدة للقفز بالمظلة من الطائرة',
    },
  ] as HobbyDeductionItem[],

  // AB Page 11 Ex 4: Writing prompt
  page11Ex4Writing: {
    promptEn: 'Write another paragraph. Ask your partner to guess.',
    promptAr: 'اكتب فقرة أخرى عن هواية تصف فيها نشاطك ودع زميلك يخمن الهواية:',
    samples: [
      {
        hobbyEn: 'Swimming',
        hobbyAr: 'السباحة',
        paragraphEn: 'I go to the pool three times a week. I love being in the cold water on hot summer days. It keeps me fit and healthy. Guess what I like doing!',
        paragraphAr: 'أذهب إلى المسبح ثلاث مرات في الأسبوع. أحب أن أكون في الماء البارد في أيام الصيف الحارة. هذا يحافظ على لياقتي وصحتي. خمن ماذا أحب أن أفعل!',
      },
      {
        hobbyEn: 'Reading books',
        hobbyAr: 'قراءة الكتب',
        paragraphEn: 'Every night before I sleep, I open my favourite adventure story. I travel to magical places and meet amazing heroes without leaving my bedroom. Guess what I enjoy!',
        paragraphAr: 'كل ليلة قبل أن أنام، أفتح قصة المغامرات المفضلة لدي. أسافر إلى أماكن سحرية وألتقي بأبطال مدهشين دون مغادرة غرفتي. خمن ماذا أستمتع به!',
      },
    ],
  },
};
