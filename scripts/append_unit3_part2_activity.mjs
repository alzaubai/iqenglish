import fs from 'fs';

let content = fs.readFileSync('src/data/unit3ActivityBookData.ts', 'utf8');

if (!content.includes('// LESSON 4: The Hippo Roller')) {
  const act456 = `  // ==========================================
  // LESSON 4: The Hippo Roller (AB pages 36-37)
  // ==========================================
  4: [
    {
      exerciseNumber: 1,
      pageNumber: 36,
      titleEn: 'Reading Comprehension: The Hippo Roller facts',
      titleAr: 'الاستيعاب القرائي: حقائق أسطوانة الهيبو لنقل المياه',
      items: [
        {
          id: 'u3-l4-e1-1',
          promptEn: 'Where do people have to walk long distances to collect water?',
          promptAr: 'أين يضطر الناس لقطع مسافات طويلة مشياً لجمع الماء؟',
          type: 'select',
          options: [
            'In many parts of Africa',
            'In modern European cities',
            'In shopping centres',
            'Near large supermarkets',
          ],
          correctAnswer: 'In many parts of Africa',
        },
        {
          id: 'u3-l4-e1-2',
          promptEn: 'What problems does carrying heavy buckets on the head cause?',
          promptAr: 'ما المشاكل الصحية التي يسببها حمل الأوعية الثقيلة فوق الرأس؟',
          type: 'select',
          options: [
            'Severe neck and back pain',
            'Toothache and stomachache',
            'Broken legs only',
            'No problems at all',
          ],
          correctAnswer: 'Severe neck and back pain',
        },
        {
          id: 'u3-l4-e1-3',
          promptEn: 'How many litres of water can a Hippo Roller hold?',
          promptAr: 'كم لتراً من الماء يستوعب برميل أسطوانة الهيبو؟',
          type: 'select',
          options: ['90 litres', '20 litres', '10 litres', '200 litres'],
          correctAnswer: '90 litres',
        },
        {
          id: 'u3-l4-e1-4',
          promptEn: 'How do people move the Hippo Roller along the ground?',
          promptAr: 'كيف يحرك الناس أسطوانة الهيبو على الأرض؟',
          type: 'select',
          options: [
            'By pushing or pulling it using a steel handle',
            'By lifting it onto their shoulders',
            'By putting it inside a car only',
            'By carrying it on their heads',
          ],
          correctAnswer: 'By pushing or pulling it using a steel handle',
        },
      ],
    },
    {
      exerciseNumber: 2,
      pageNumber: 36,
      titleEn: 'Vocabulary: Definitions and key words',
      titleAr: 'المفردات: طابق الكلمة مع معناها الصحيح',
      items: [
        {
          id: 'u3-l4-e2-1',
          promptEn: 'What is a "barrel"?',
          promptAr: 'ما معنى كلمة (barrel)؟',
          type: 'select',
          options: [
            'برميل / وعاء أسطواني كبير لتخزين السوائل',
            'مقبض حديدي صغير لفتح الأبواب',
            'حبل رفيع لربط الأمتعة',
            'حذاء مخصص للمشي في الجبال',
          ],
          correctAnswer: 'برميل / وعاء أسطواني كبير لتخزين السوائل',
        },
        {
          id: 'u3-l4-e2-2',
          promptEn: 'What does "invent" mean?',
          promptAr: 'ما معنى الفعل (invent)؟',
          type: 'select',
          options: [
            'يبتكر / يخترع شيئاً جديداً لأول مرة',
            'يشتري بضاعة قديمة من السوق',
            'يكسر الأدوات المنزلية',
            'يسكب الماء على الأرض',
          ],
          correctAnswer: 'يبتكر / يخترع شيئاً جديداً لأول مرة',
        },
        {
          id: 'u3-l4-e2-3',
          promptEn: 'What does "distance" mean?',
          promptAr: 'ما معنى كلمة (distance)؟',
          type: 'select',
          options: [
            'المسافة الفاصلة بين مكانين',
            'وزن الأشياء الثقيلة بالكيلوغرام',
            'درجة حرارة الجو في الشتاء',
            'سرعة تدفق المياه في النهر',
          ],
          correctAnswer: 'المسافة الفاصلة بين مكانين',
        },
        {
          id: 'u3-l4-e2-4',
          promptEn: 'What does "elderly" mean?',
          promptAr: 'ما معنى كلمة (elderly)؟',
          type: 'select',
          options: [
            'كبار السن / المسنون',
            'الأطفال الرضع',
            'الرياضيون الشباب',
            'طلاب المدارس الابتدائية',
          ],
          correctAnswer: 'كبار السن / المسنون',
        },
      ],
    },
    {
      exerciseNumber: 3,
      pageNumber: 37,
      titleEn: 'True or False Statements: The Hippo Roller',
      titleAr: 'صح أو خطأ (True / False): أسطوانة الهيبو لنقل المياه',
      items: [
        {
          id: 'u3-l4-e3-1',
          promptEn: 'People carry the Hippo Roller on their heads.',
          promptAr: 'يحمل الناس أسطوانة الهيبو فوق رؤوسهم.',
          type: 'select',
          options: ['False', 'True'],
          correctAnswer: 'False',
        },
        {
          id: 'u3-l4-e3-2',
          promptEn: 'The Hippo Roller can hold up to 90 litres of water.',
          promptAr: 'تستوعب أسطوانة الهيبو حتى 90 لتراً من الماء.',
          type: 'select',
          options: ['True', 'False'],
          correctAnswer: 'True',
        },
        {
          id: 'u3-l4-e3-3',
          promptEn: 'Children can push or pull the full roller easily.',
          promptAr: 'يستطيع الأطفال دفع أو سحب الأسطوانة الممتلئة بسهولة.',
          type: 'select',
          options: ['True', 'False'],
          correctAnswer: 'True',
        },
        {
          id: 'u3-l4-e3-4',
          promptEn: 'The Hippo Roller has made collecting water more difficult.',
          promptAr: 'جعلت أسطوانة الهيبو مهمة جمع الماء أكثر صعوبة.',
          type: 'select',
          options: ['False', 'True'],
          correctAnswer: 'False',
        },
      ],
    },
  ],

  // ==========================================
  // LESSON 5: What's the matter? (AB pages 38-39)
  // ==========================================
  5: [
    {
      exerciseNumber: 1,
      pageNumber: 38,
      titleEn: 'Matching Ailments to Body Parts',
      titleAr: 'طابق اسم العَرَض الصحي أو المرض بجزء الجسم المناسب له',
      items: [
        {
          id: 'u3-l5-e1-1',
          promptEn: 'Where do you feel a "headache"?',
          promptAr: 'أين تشعر بـ (a headache)؟',
          type: 'select',
          options: ['In the head', 'In the tooth', 'In the stomach', 'In the foot'],
          correctAnswer: 'In the head',
        },
        {
          id: 'u3-l5-e1-2',
          promptEn: 'Where do you feel a "toothache"?',
          promptAr: 'أين تشعر بـ (a toothache)؟',
          type: 'select',
          options: ['In the tooth', 'In the ear', 'In the throat', 'In the back'],
          correctAnswer: 'In the tooth',
        },
        {
          id: 'u3-l5-e1-3',
          promptEn: 'Where do you feel a "stomachache"?',
          promptAr: 'أين تشعر بـ (a stomachache)؟',
          type: 'select',
          options: ['In the stomach', 'In the hand', 'In the eye', 'In the shoulder'],
          correctAnswer: 'In the stomach',
        },
        {
          id: 'u3-l5-e1-4',
          promptEn: 'Where do you feel an "earache"?',
          promptAr: 'أين تشعر بـ (an earache)؟',
          type: 'select',
          options: ['In the ear', 'In the nose', 'In the leg', 'In the head'],
          correctAnswer: 'In the ear',
        },
      ],
    },
    {
      exerciseNumber: 2,
      pageNumber: 38,
      titleEn: 'Dialogue Gap-Fill: Complete the conversation',
      titleAr: 'أكمل الفراغات في المحادثة بالكلمة المناسبة',
      items: [
        {
          id: 'u3-l5-e2-1',
          promptEn: "Doctor: What's the ______ with you today?",
          promptAr: 'أكمل السؤال: مم تشكو؟',
          type: 'select',
          options: ['matter', 'problem', 'time', 'weather'],
          correctAnswer: 'matter',
        },
        {
          id: 'u3-l5-e2-2',
          promptEn: 'Patient: I have got a high ______ and feel hot.',
          promptAr: 'أكمل: لدي ارتفاع في...',
          type: 'select',
          options: ['temperature', 'head', 'arm', 'book'],
          correctAnswer: 'temperature',
        },
        {
          id: 'u3-l5-e2-3',
          promptEn: 'Doctor: You have got a bad cold. You should take this ______.',
          promptAr: 'أكمل: يجب أن تأخذ هذا...',
          type: 'select',
          options: ['medicine', 'sweet', 'ball', 'paper'],
          correctAnswer: 'medicine',
        },
      ],
    },
    {
      exerciseNumber: 3,
      pageNumber: 39,
      titleEn: 'Giving Advice: Choose (should) or (shouldn\'t)',
      titleAr: 'إعطاء النصيحة: اختر (should) أو (shouldn\'t) للجمل التالية',
      items: [
        {
          id: 'u3-l5-e3-1',
          promptEn: 'If you have a bad headache, you ______ rest in a quiet room.',
          promptAr: 'إذا كان لديك صداع شديد، أنت (ينبغي / لا ينبغي) أن ترتاح في غرفة هادئة:',
          type: 'select',
          options: ['should', "shouldn't"],
          correctAnswer: 'should',
        },
        {
          id: 'u3-l5-e3-2',
          promptEn: 'You ______ eat too many sugary sweets before going to bed.',
          promptAr: 'أنت (ينبغي / لا ينبغي) أن تأكل الكثير من السكريات قبل النوم:',
          type: 'select',
          options: ["shouldn't", 'should'],
          correctAnswer: "shouldn't",
        },
        {
          id: 'u3-l5-e3-3',
          promptEn: 'If your tooth hurts, you ______ visit the dentist immediately.',
          promptAr: 'إذا كان سنك يؤلمك، أنت (ينبغي / لا ينبغي) زيارة طبيب الأسنان فوراً:',
          type: 'select',
          options: ['should', "shouldn't"],
          correctAnswer: 'should',
        },
        {
          id: 'u3-l5-e3-4',
          promptEn: 'When you have a fever, you ______ drink plenty of clean water.',
          promptAr: 'عندما تكون مصاباً بالحمى، أنت (ينبغي / لا ينبغي) شرب الكثير من الماء النظيف:',
          type: 'select',
          options: ['should', "shouldn't"],
          correctAnswer: 'should',
        },
      ],
    },
  ],

  // ==========================================
  // LESSON 6: Helping Gran (AB pages 40-41)
  // ==========================================
  6: [
    {
      exerciseNumber: 1,
      pageNumber: 40,
      titleEn: 'Story Ordering: Chronological sequence of events',
      titleAr: 'ترتيب أحداث القصة: رتب ما حدث في قصة مساعدة الجدة بالتسلسل الزمني',
      items: [
        {
          id: 'u3-l6-e1-1',
          promptEn: 'What did Noor and Zaid do first on Saturday?',
          promptAr: 'ماذا فعل نور وزيد أولاً صباح يوم السبت؟',
          type: 'select',
          options: [
            'They went to visit their grandmother.',
            'They baked an apple cake at their home.',
            'They played football in the park.',
            'They slept all afternoon.',
          ],
          correctAnswer: 'They went to visit their grandmother.',
        },
        {
          id: 'u3-l6-e1-2',
          promptEn: 'Why couldn\'t Gran clean the house and garden herself?',
          promptAr: 'لماذا لم تتمكن الجدة من تنظيف البيت والحديقة بنفسها؟',
          type: 'select',
          options: [
            'Because her back hurt.',
            'Because she was travelling to London.',
            'Because she didn\'t like flowers.',
            'Because she was watching television.',
          ],
          correctAnswer: 'Because her back hurt.',
        },
        {
          id: 'u3-l6-e1-3',
          promptEn: 'What did Zaid do in the garden?',
          promptAr: 'ماذا فعل زيد في الحديقة لمساعدة جدته؟',
          type: 'select',
          options: [
            'He swept the path and watered the flowers.',
            'He cut down all the green trees.',
            'He played with water on the floor.',
            'He slept on the grass.',
          ],
          correctAnswer: 'He swept the path and watered the flowers.',
        },
        {
          id: 'u3-l6-e1-4',
          promptEn: 'What delicious treat did Noor bake for Gran?',
          promptAr: 'ما الحلوى اللذيذة التي خبزتها نور لجدتها؟',
          type: 'select',
          options: [
            'A delicious apple cake',
            'Chocolate biscuits only',
            'Fried potatoes',
            'Fish and chips',
          ],
          correctAnswer: 'A delicious apple cake',
        },
      ],
    },
    {
      exerciseNumber: 2,
      pageNumber: 40,
      titleEn: 'Grammar in Context: Past Participle gap-fill',
      titleAr: 'القواعد في السياق: ضع الفعل بين القوسين بصيغة التصريف الثالث (P.P)',
      items: [
        {
          id: 'u3-l6-e2-1',
          promptEn: 'Zaid has ______ (sweep) the long garden path.',
          promptAr: 'صيغة التصريف الثالث للفعل (sweep):',
          type: 'select',
          options: ['swept', 'sweeped', 'sweeping', 'sweeps'],
          correctAnswer: 'swept',
        },
        {
          id: 'u3-l6-e2-2',
          promptEn: 'Zaid has ______ (water) all the beautiful flowers.',
          promptAr: 'صيغة التصريف الثالث للفعل القياسي (water):',
          type: 'select',
          options: ['watered', 'watering', 'waters', 'water'],
          correctAnswer: 'watered',
        },
        {
          id: 'u3-l6-e2-3',
          promptEn: 'Noor has ______ (clean) the kitchen floor thoroughly.',
          promptAr: 'صيغة التصريف الثالث للفعل (clean):',
          type: 'select',
          options: ['cleaned', 'cleaning', 'cleans', 'clean'],
          correctAnswer: 'cleaned',
        },
        {
          id: 'u3-l6-e2-4',
          promptEn: 'Noor has ______ (bake) a wonderful apple cake.',
          promptAr: 'صيغة التصريف الثالث للفعل القياسي (bake):',
          type: 'select',
          options: ['baked', 'baking', 'bakes', 'bake'],
          correctAnswer: 'baked',
        },
      ],
    },
    {
      exerciseNumber: 3,
      pageNumber: 41,
      titleEn: 'Comprehension Questions: Helping Gran',
      titleAr: 'أسئلة الفهم العام: قصة مساعدة الجدة',
      items: [
        {
          id: 'u3-l6-e3-1',
          promptEn: 'How did Gran feel when she saw her clean house and garden?',
          promptAr: 'كيف شعرت الجدة عندما رأت بيتها وحديقتها نظيفين ومرتبين؟',
          type: 'select',
          options: [
            'Very happy, grateful and proud',
            'Angry and upset with the children',
            'Sad and lonely',
            'Scared and worried',
          ],
          correctAnswer: 'Very happy, grateful and proud',
        },
        {
          id: 'u3-l6-e3-2',
          promptEn: 'Where did they have the tea party at the end of the story?',
          promptAr: 'أين أقاموا حفلة الشاي الممتعة في نهاية القصة؟',
          type: 'select',
          options: [
            'In the lovely garden',
            'In the school playground',
            'At the hospital',
            'In the car on the road',
          ],
          correctAnswer: 'In the lovely garden',
        },
      ],
    },
  ],
};
`;

  const lastBraceIndex = content.lastIndexOf('};');
  if (lastBraceIndex !== -1) {
    content = content.slice(0, lastBraceIndex) + act456;
    fs.writeFileSync('src/data/unit3ActivityBookData.ts', content, 'utf8');
    console.log('unit3ActivityBookData.ts successfully updated with Lessons 4, 5, 6!');
  }
}
