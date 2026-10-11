export interface GenericQuestionItem {
  id: string;
  promptEn: string;
  promptAr: string;
  type: 'select' | 'text' | 'true-false';
  options?: string[];
  correctAnswer: string;
}

export interface GenericExercise {
  exerciseNumber: number; // 1, 2, 3...
  pageNumber: number;
  titleEn: string;
  titleAr: string;
  items: GenericQuestionItem[];
}

export const lessons3to10ActivityData: Record<number, GenericExercise[]> = {
  // ===================== LESSON 3 =====================
  3: [
    {
      exerciseNumber: 1,
      pageNumber: 8,
      titleEn: 'Past simple forms: Regular and Irregular verbs',
      titleAr: 'صيغ الماضي البسيط: الأفعال القياسية والشاذة',
      items: [
        {
          id: 'l3-e1-1',
          promptEn: 'Past of: land',
          promptAr: 'الماضي من (land)',
          type: 'select',
          options: ['landed', 'landing', 'land'],
          correctAnswer: 'landed',
        },
        {
          id: 'l3-e1-2',
          promptEn: 'Past of: happen',
          promptAr: 'الماضي من (happen)',
          type: 'select',
          options: ['happened', 'happen', 'happening'],
          correctAnswer: 'happened',
        },
        {
          id: 'l3-e1-3',
          promptEn: 'Past of: come',
          promptAr: 'الماضي من (come)',
          type: 'select',
          options: ['came', 'comed', 'come'],
          correctAnswer: 'came',
        },
        {
          id: 'l3-e1-4',
          promptEn: 'Past of: fall',
          promptAr: 'الماضي من (fall)',
          type: 'select',
          options: ['fell', 'falled', 'fall'],
          correctAnswer: 'fell',
        },
        {
          id: 'l3-e1-5',
          promptEn: 'Past of: drive',
          promptAr: 'الماضي من (drive)',
          type: 'select',
          options: ['drove', 'drived', 'driven'],
          correctAnswer: 'drove',
        },
        {
          id: 'l3-e1-6',
          promptEn: 'Past of: hit',
          promptAr: 'الماضي من (hit)',
          type: 'select',
          options: ['hit', 'hitted', 'hat'],
          correctAnswer: 'hit',
        },
      ],
    },
    {
      exerciseNumber: 2,
      pageNumber: 9,
      titleEn: 'Adjectives: Choose the right adjective for each sentence',
      titleAr: 'الصفات: اختر الصفة المناسبة لكل جملة',
      items: [
        {
          id: 'l3-e2-1',
          promptEn: 'My brother cooked dinner last night, and it was...',
          promptAr: 'طهى أخي العشاء الليلة الماضية، وكان...',
          type: 'select',
          options: ['delicious', 'boring', 'terrible', 'horrible'],
          correctAnswer: 'delicious',
        },
        {
          id: 'l3-e2-2',
          promptEn: 'I saw a ... accident on my way to school.',
          promptAr: 'رأيت حادثاً ... في طريقي للمدرسة.',
          type: 'select',
          options: ['terrible', 'lovely', 'delicious', 'beautiful'],
          correctAnswer: 'terrible',
        },
        {
          id: 'l3-e2-3',
          promptEn: 'The Arabian horse is a ... animal.',
          promptAr: 'الحصان العربي حيوان...',
          type: 'select',
          options: ['beautiful', 'boring', 'horrible', 'bad'],
          correctAnswer: 'beautiful',
        },
        {
          id: 'l3-e2-4',
          promptEn: 'Jassim does not like football. He thinks it is...',
          promptAr: 'جاسم لا يحب كرة القدم، ويعتقد أنها...',
          type: 'select',
          options: ['boring', 'delicious', 'fantastic', 'lovely'],
          correctAnswer: 'boring',
        },
      ],
    },
  ],

  // ===================== LESSON 4 =====================
  4: [
    {
      exerciseNumber: 1,
      pageNumber: 10,
      titleEn: 'Possessive Pronouns: mine, yours, hers, ours, theirs',
      titleAr: 'ضمائر التملك: ملكي، ملكك، ملكها، ملكنا، ملكهم',
      items: [
        {
          id: 'l4-e1-1',
          promptEn: 'Sameera lost her watch yesterday. So I think this watch is...',
          promptAr: 'أضاعت سميرة ساعتها أمس، لذلك أعتقد أن هذه الساعة (hers):',
          type: 'select',
          options: ['hers', 'mine', 'yours', 'theirs'],
          correctAnswer: 'hers',
        },
        {
          id: 'l4-e1-2',
          promptEn: 'Bilal, I think this book is... You left it in my house yesterday.',
          promptAr: 'بلال، أعتقد أن هذا الكتاب (yours) لك:',
          type: 'select',
          options: ['yours', 'mine', 'ours', 'hers'],
          correctAnswer: 'yours',
        },
        {
          id: 'l4-e1-3',
          promptEn: 'We took that ball to the beach. It is... but those boys think it is...',
          promptAr: 'أخذنا الكرة للشاطئ؛ إنها لنا (ours) لكن الأولاد يعتقدون أنها لهم (theirs):',
          type: 'select',
          options: ['ours / theirs', 'mine / yours', 'hers / ours'],
          correctAnswer: 'ours / theirs',
        },
        {
          id: 'l4-e1-4',
          promptEn: 'Halla does not have a radio, so I lent her...',
          promptAr: 'ليس لدى هالة مذياع، لذا أعرناها مذياعي (mine):',
          type: 'select',
          options: ['mine', 'yours', 'theirs', 'hers'],
          correctAnswer: 'mine',
        },
      ],
    },
    {
      exerciseNumber: 2,
      pageNumber: 10,
      titleEn: 'Interests: Gerunds and Nouns',
      titleAr: 'الاهتمامات واستخدام صيغة -ing أو الاسم',
      items: [
        {
          id: 'l4-e2-1',
          promptEn: 'Choose the correct form: I like...',
          promptAr: 'أنا أحب...',
          type: 'select',
          options: ['playing football', 'play football'],
          correctAnswer: 'playing football',
        },
        {
          id: 'l4-e2-2',
          promptEn: 'Choose the correct form: I am interested in...',
          promptAr: 'أنا مهتم بـ...',
          type: 'select',
          options: ['science', 'do science', 'does science'],
          correctAnswer: 'science',
        },
      ],
    },
  ],

  // ===================== LESSON 5 =====================
  5: [
    {
      exerciseNumber: 1,
      pageNumber: 12,
      titleEn: 'Adverbs of Frequency: Rule and Position',
      titleAr: 'ظروف التكرار: القاعدة وموقعها في الجملة',
      items: [
        {
          id: 'l5-e1-1',
          promptEn: 'Adverbs of frequency come ... the verb (be).',
          promptAr: 'تأتي ظروف التكرار (بعد / after) فعل be:',
          type: 'select',
          options: ['after', 'before'],
          correctAnswer: 'after',
        },
        {
          id: 'l5-e1-2',
          promptEn: 'With other main verbs, put adverbs ... the verb.',
          promptAr: 'مع بقية الأفعال الرئيسية، نضع ظروف التكرار (قبل / before) الفعل:',
          type: 'select',
          options: ['before', 'after'],
          correctAnswer: 'before',
        },
      ],
    },
    {
      exerciseNumber: 2,
      pageNumber: 13,
      titleEn: 'Complete the sentences with adverbs of frequency',
      titleAr: 'أكمل الجمل بظرف التكرار في مكانه الصحيح',
      items: [
        {
          id: 'l5-e2-1',
          promptEn: 'He ... late for class. (be / never)',
          promptAr: 'هو لا يتأخر أبداً:',
          type: 'select',
          options: ['is never', 'never is', 'never was'],
          correctAnswer: 'is never',
        },
        {
          id: 'l5-e2-2',
          promptEn: 'She ... rice for lunch. (have / usually)',
          promptAr: 'هي عادة تتناول الأرز:',
          type: 'select',
          options: ['usually has', 'has usually', 'usually have'],
          correctAnswer: 'usually has',
        },
        {
          id: 'l5-e2-3',
          promptEn: 'I ... to the park on Friday. (go / always)',
          promptAr: 'أنا دائماً أذهب للمتنزه:',
          type: 'select',
          options: ['always go', 'go always', 'goes always'],
          correctAnswer: 'always go',
        },
      ],
    },
  ],

  // ===================== LESSON 6 =====================
  6: [
    {
      exerciseNumber: 1,
      pageNumber: 14,
      titleEn: "Questions on Bassem's Scrapbook",
      titleAr: 'أسئلة حول دفتر قصاصات باسم',
      items: [
        {
          id: 'l6-e1-1',
          promptEn: 'Where does Adel want to go?',
          promptAr: 'إلى أين يريد عادل الذهاب؟',
          type: 'select',
          options: ['to the mall', 'to the museum', 'to school'],
          correctAnswer: 'to the mall',
        },
        {
          id: 'l6-e1-2',
          promptEn: 'What does Bassem want to do?',
          promptAr: 'ماذا يريد باسم أن يفعل؟',
          type: 'select',
          options: ['put photographs in his scrapbook', 'go shopping', 'play football'],
          correctAnswer: 'put photographs in his scrapbook',
        },
        {
          id: 'l6-e1-3',
          promptEn: 'What does Bassem take photos of?',
          promptAr: 'صور ماذا يلتقط باسم؟',
          type: 'select',
          options: ['historical sites in Iraq (ruins)', 'animals', 'cars'],
          correctAnswer: 'historical sites in Iraq (ruins)',
        },
      ],
    },
  ],

  // ===================== LESSON 7 =====================
  7: [
    {
      exerciseNumber: 1,
      pageNumber: 16,
      titleEn: "True or False: Sana's special day",
      titleAr: 'صح أو خطأ: يوم سناء المميز',
      items: [
        {
          id: 'l7-e1-1',
          promptEn: 'Sana spent the day with her family.',
          promptAr: 'قضت سناء اليوم مع عائلتها (خطأ، مع صديقاتها):',
          type: 'true-false',
          correctAnswer: 'False',
        },
        {
          id: 'l7-e1-2',
          promptEn: 'She went fishing in the afternoon.',
          promptAr: 'ذهبت لصيد السمك بعد الظهر (خطأ، في الصباح):',
          type: 'true-false',
          correctAnswer: 'False',
        },
        {
          id: 'l7-e1-3',
          promptEn: 'She did not catch any fish.',
          promptAr: 'لم تصطد أي سمكة (صح):',
          type: 'true-false',
          correctAnswer: 'True',
        },
        {
          id: 'l7-e1-4',
          promptEn: 'She likes taking pictures of the sea.',
          promptAr: 'تحب التقاط صور البحر والقوارب (صح):',
          type: 'true-false',
          correctAnswer: 'True',
        },
        {
          id: 'l7-e1-5',
          promptEn: 'She played tennis in the park.',
          promptAr: 'لعبت التنس في المتنزه (خطأ، كرة قدم):',
          type: 'true-false',
          correctAnswer: 'False',
        },
        {
          id: 'l7-e1-6',
          promptEn: 'She listened to some music.',
          promptAr: 'استمعت إلى الموسيقى (صح):',
          type: 'true-false',
          correctAnswer: 'True',
        },
      ],
    },
  ],

  // ===================== LESSON 8 =====================
  8: [
    {
      exerciseNumber: 1,
      pageNumber: 18,
      titleEn: 'Questions on the letter from Australia',
      titleAr: 'أسئلة حول رسالة كارين من أستراليا',
      items: [
        {
          id: 'l8-e1-1',
          promptEn: 'Where does Karen come from?',
          promptAr: 'من أين كارين؟',
          type: 'select',
          options: ['Australia (Sydney)', 'Iraq', 'England'],
          correctAnswer: 'Australia (Sydney)',
        },
        {
          id: 'l8-e1-2',
          promptEn: 'Who is Jane?',
          promptAr: 'من هي جين؟',
          type: 'select',
          options: ["Karen's friend", "Karen's sister", "Karen's mother"],
          correctAnswer: "Karen's friend",
        },
        {
          id: 'l8-e1-3',
          promptEn: 'What does Karen like to eat?',
          promptAr: 'ماذا تحب كارين أن تأكل؟',
          type: 'select',
          options: ['fish cooked on a barbecue', 'pizza', 'burgers'],
          correctAnswer: 'fish cooked on a barbecue',
        },
        {
          id: 'l8-e1-4',
          promptEn: 'What does she do in her spare time?',
          promptAr: 'ماذا تفعل في وقت فراغها؟',
          type: 'select',
          options: ['collecting photographs of countries', 'playing tennis', 'swimming'],
          correctAnswer: 'collecting photographs of countries',
        },
      ],
    },
  ],

  // ===================== LESSON 9 =====================
  9: [
    {
      exerciseNumber: 1,
      pageNumber: 20,
      titleEn: 'Round up: Missing letters in adjectives',
      titleAr: 'الحروف المفقودة في الصفات',
      items: [
        {
          id: 'l9-e1-1',
          promptEn: 'Word: l _ v _ ly',
          promptAr: 'أكمل كلمة (l_v_ly):',
          type: 'select',
          options: ['lovely', 'lively', 'lonely'],
          correctAnswer: 'lovely',
        },
        {
          id: 'l9-e1-2',
          promptEn: 'Word: d _ lic _ ous',
          promptAr: 'أكمل كلمة (d_lic_ous):',
          type: 'select',
          options: ['delicious', 'delicate', 'dilicious'],
          correctAnswer: 'delicious',
        },
        {
          id: 'l9-e1-3',
          promptEn: 'Word: te _ _ ible',
          promptAr: 'أكمل كلمة (te__ible):',
          type: 'select',
          options: ['terrible', 'terminable', 'terrble'],
          correctAnswer: 'terrible',
        },
        {
          id: 'l9-e1-4',
          promptEn: 'Word: f _ nt _ st _ c',
          promptAr: 'أكمل كلمة (f_nt_st_c):',
          type: 'select',
          options: ['fantastic', 'fantasy', 'fonstastic'],
          correctAnswer: 'fantastic',
        },
        {
          id: 'l9-e1-5',
          promptEn: 'Word: bo _ ing',
          promptAr: 'أكمل كلمة (bo_ing):',
          type: 'select',
          options: ['boring', 'bowing', 'boiling'],
          correctAnswer: 'boring',
        },
      ],
    },
    {
      exerciseNumber: 2,
      pageNumber: 20,
      titleEn: 'Joining sentences with: and, but, or',
      titleAr: 'ربط الجمل باستخدام: (and, but, or)',
      items: [
        {
          id: 'l9-e2-1',
          promptEn: 'The cheetah is beautiful. It is very fast.',
          promptAr: 'الفهد جميل وهو سريع جداً:',
          type: 'select',
          options: [
            'The cheetah is beautiful and very fast.',
            'The cheetah is beautiful but very fast.',
            'The cheetah is beautiful or very fast.',
          ],
          correctAnswer: 'The cheetah is beautiful and very fast.',
        },
        {
          id: 'l9-e2-2',
          promptEn: 'You can have a sweater. You can have trainers. You can not have both.',
          promptAr: 'يمكنك الحصول على سترة أو حذاء رياضي (تخيير):',
          type: 'select',
          options: [
            'You can have a sweater or trainers.',
            'You can have a sweater and trainers.',
            'You can have a sweater but trainers.',
          ],
          correctAnswer: 'You can have a sweater or trainers.',
        },
      ],
    },
  ],

  // ===================== LESSON 10 =====================
  10: [
    {
      exerciseNumber: 1,
      pageNumber: 21,
      titleEn: 'Story time: True or False (My new friend, the swift)',
      titleAr: 'صح أو خطأ: قصة صديقي طائر السمامة',
      items: [
        {
          id: 'l10-e1-1',
          promptEn: 'There was a cat nearby waiting to eat the swift.',
          promptAr: 'كانت هناك قطة تنتظر افتراسه (خطأ):',
          type: 'true-false',
          correctAnswer: 'False',
        },
        {
          id: 'l10-e1-2',
          promptEn: 'When the narrator unwrapped the swift, it did not move.',
          promptAr: 'عندما فتح الوشاح لم يتحرك الطائر (خطأ، قفز محاولاً الطيران):',
          type: 'true-false',
          correctAnswer: 'False',
        },
        {
          id: 'l10-e1-3',
          promptEn: 'Swifts can fly for almost a year (up to ten months).',
          promptAr: 'تستطيع طيور السمامة الطيران حتى 10 أشهر (صح):',
          type: 'true-false',
          correctAnswer: 'True',
        },
        {
          id: 'l10-e1-4',
          promptEn: 'The narrator wanted the bird to fly away and get strong.',
          promptAr: 'أراد الراوي أن يتعافى الطائر ويطير حراً (صح):',
          type: 'true-false',
          correctAnswer: 'True',
        },
        {
          id: 'l10-e1-5',
          promptEn: 'The narrator was both happy and sad when the swift flew away.',
          promptAr: 'شعر الراوي بالسعادة والحزن معاً عند إطلاق الطائر (صح):',
          type: 'true-false',
          correctAnswer: 'True',
        },
      ],
    },
    {
      exerciseNumber: 2,
      pageNumber: 21,
      titleEn: 'Story time: Story comprehension',
      titleAr: 'فهم قصة طائر السمامة',
      items: [
        {
          id: 'l10-e2-1',
          promptEn: 'Who are the characters in the story?',
          promptAr: 'من هي شخصيات القصة؟',
          type: 'select',
          options: [
            'The narrator, Mum, and the swift',
            'Richard, Father, and Faisal',
            'Karen and Jane',
          ],
          correctAnswer: 'The narrator, Mum, and the swift',
        },
        {
          id: 'l10-e2-2',
          promptEn: 'What is the bird called in the story?',
          promptAr: 'ما اسم الطائر في القصة؟',
          type: 'select',
          options: ['a swift', 'a flamingo', 'a pelican'],
          correctAnswer: 'a swift',
        },
      ],
    },
  ],
};
