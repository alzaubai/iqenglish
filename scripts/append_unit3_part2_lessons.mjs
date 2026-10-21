import fs from 'fs';

let content = fs.readFileSync('src/data/unit3Data.ts', 'utf8');

// Ensure we don't duplicate
if (!content.includes('u3-lesson-4')) {
  const lesson456 = `  // ==========================================
  // Lesson 4: The Hippo Roller
  // ==========================================
  {
    id: 'u3-lesson-4',
    unitNumber: 3,
    lessonNumber: 4,
    titleEn: 'Lesson 4: The Hippo Roller',
    titleAr: 'الدرس 4: أسطوانة الهيبو لنقل المياه',
    subtitleEn: 'An innovative solution for carrying water in Africa',
    subtitleAr: 'حل ابتكاري ذكي لنقل المياه وتخفيف المعاناة في إفريقيا',
    transcripts: [
      {
        id: 'u3-l4-text',
        titleEn: 'Reading: The Hippo Roller',
        titleAr: 'النص القرائي: أسطوانة الهيبو',
        audioTrackNumber: 23,
        bookReference: "Student's Book p. 23",
        description: 'Article explaining the water problem and how the Hippo Roller changed lives.',
        lines: [
          {
            id: 'u3-l4-t23-1',
            speaker: 'Narrator',
            gender: 'male',
            textEn: 'In many parts of Africa, people have to walk long distances every day to collect water for their families.',
            textAr: 'في أجزاء كثيرة من إفريقيا، يضطر الناس لقطع مسافات طويلة مشياً كل يوم لجمع الماء لعائلاتهم.',
          },
          {
            id: 'u3-l4-t23-2',
            speaker: 'Narrator',
            gender: 'male',
            textEn: 'Carrying heavy buckets of water on the head causes severe neck and back pain, and takes many hours of hard work.',
            textAr: 'حمل أوعية الماء الثقيلة فوق الرأس يُسبب آلاماً شديدة في الرقبة والظهر، ويستغرق ساعات طويلة من العمل الشاق.',
          },
          {
            id: 'u3-l4-t23-3',
            speaker: 'Narrator',
            gender: 'male',
            textEn: 'Two South African men have invented a wonderful solution: The Hippo Roller.',
            textAr: 'قام رجلان من جنوب إفريقيا بابتكار حل رائع: أسطوانة الهيبو.',
          },
          {
            id: 'u3-l4-t23-4',
            speaker: 'Narrator',
            gender: 'male',
            textEn: 'The Hippo Roller is a large, strong plastic barrel that can hold 90 litres of water.',
            textAr: 'أسطوانة الهيبو عبارة عن برميل بلاستيكي كبير وقوي يستوعب 90 لتراً من الماء.',
          },
          {
            id: 'u3-l4-t23-5',
            speaker: 'Narrator',
            gender: 'male',
            textEn: 'Instead of carrying the heavy weight on their heads, people can easily push or pull the barrel along the ground using a steel handle.',
            textAr: 'بدلاً من حمل هذا الوزن الثقيل فوق رؤوسهم، يستطيع الناس دفع أو سحب البرميل بسهولة على الأرض باستخدام مقبض فولاذي.',
          },
          {
            id: 'u3-l4-t23-6',
            speaker: 'Narrator',
            gender: 'male',
            textEn: 'Even young children and elderly people can easily move a full roller.',
            textAr: 'حتى الأطفال الصغار وكبار السن يمكنهم تحريك أسطوانة ممتلئة بالماء بكل سهولة.',
          },
          {
            id: 'u3-l4-t23-7',
            speaker: 'Narrator',
            gender: 'male',
            textEn: 'The Hippo Roller has improved the lives of tens of thousands of families across Africa.',
            textAr: 'لقد حسّنت أسطوانة الهيبو حياة عشرات الآلاف من العائلات في مختلف أنحاء إفريقيا.',
          },
        ],
      },
    ],
  },

  // ==========================================
  // Lesson 5: What's the matter?
  // ==========================================
  {
    id: 'u3-lesson-5',
    unitNumber: 3,
    lessonNumber: 5,
    titleEn: "Lesson 5: What's the matter?",
    titleAr: "الدرس 5: ما الأمر؟ (مم تشكو؟)",
    subtitleEn: 'Talking about health problems, feelings, and giving advice',
    subtitleAr: 'الحديث عن الحالات الصحية والمشاعر وإعطاء النصائح الطبية',
    transcripts: [
      {
        id: 'u3-l5-dialogue-1',
        titleEn: 'Dialogue 1: At the Doctor',
        titleAr: 'المحادثة 1: في عيادة الطبيب',
        audioTrackNumber: 24,
        bookReference: "Student's Book p. 24",
        description: 'Tariq visits the doctor because he feels unwell.',
        lines: [
          {
            id: 'u3-l5-t24-1',
            speaker: 'Doctor',
            gender: 'male',
            textEn: "Hello, Tariq. What's the matter with you?",
            textAr: 'مرحباً يا طارق. ما الأمر؟ مم تشكو؟',
          },
          {
            id: 'u3-l5-t24-2',
            speaker: 'Tariq',
            gender: 'male',
            textEn: "I have got a bad headache, Doctor, and my throat hurts when I swallow.",
            textAr: 'عندي صداع شديد يا دكتور، وحلقي يؤلمني عندما أبتلع.',
          },
          {
            id: 'u3-l5-t24-3',
            speaker: 'Doctor',
            gender: 'male',
            textEn: 'Have you got a fever or high temperature?',
            textAr: 'هل لديك حمى أو ارتفاع في درجة الحرارة؟',
          },
          {
            id: 'u3-l5-t24-4',
            speaker: 'Tariq',
            gender: 'male',
            textEn: 'Yes, I feel very hot, shivering and tired.',
            textAr: 'نعم، أشعر بحرارة شديدة ورجفة وتعب عام.',
          },
          {
            id: 'u3-l5-t24-5',
            speaker: 'Doctor',
            gender: 'male',
            textEn: 'You have got a bad cold. You should take this medicine, drink plenty of water, and stay in bed.',
            textAr: 'أنت مصاب بنزلة برد حادة. يجب أن تأخذ هذا الدواء، وتشرب الكثير من الماء، وترتاح في الفراش.',
          },
          {
            id: 'u3-l5-t24-6',
            speaker: 'Tariq',
            gender: 'male',
            textEn: 'Thank you very much, Doctor.',
            textAr: 'شكراً جزيلاً لك يا دكتور.',
          },
        ],
      },
      {
        id: 'u3-l5-dialogue-2',
        titleEn: 'Dialogue 2: Sara and her Mother',
        titleAr: 'المحادثة 2: سارة مع والدتها',
        audioTrackNumber: 25,
        bookReference: "Student's Book p. 24",
        description: 'Sara has a stomachache after eating too many sweets.',
        lines: [
          {
            id: 'u3-l5-t25-1',
            speaker: 'Mother',
            gender: 'female',
            textEn: "What's the matter, Sara? Why are you holding your stomach?",
            textAr: 'ما الأمر يا سارة؟ لماذا تمسكين بطنك؟',
          },
          {
            id: 'u3-l5-t25-2',
            speaker: 'Sara',
            gender: 'female',
            textEn: 'I have got a terrible stomachache, Mum!',
            textAr: 'لدي ألم فظيع في بطني يا أمي!',
          },
          {
            id: 'u3-l5-t25-3',
            speaker: 'Mother',
            gender: 'female',
            textEn: 'Have you eaten too many sweets today?',
            textAr: 'هل تناولتِ الكثير من الحلويات اليوم؟',
          },
          {
            id: 'u3-l5-t25-4',
            speaker: 'Sara',
            gender: 'female',
            textEn: 'Yes, Mum. I have eaten a whole large bag of sweets at school.',
            textAr: 'نعم يا أمي، لقد أكلتُ كيساً كبيراً كاملاً من الحلويات في المدرسة.',
          },
          {
            id: 'u3-l5-t25-5',
            speaker: 'Mother',
            gender: 'female',
            textEn: "That is why your stomach hurts! You shouldn't eat so much sugar. Lie down and drink warm tea.",
            textAr: 'لهذا السبب تؤلمكِ بطنكِ! لا ينبغي أن تأكلي كل هذا السكر. استلقي واشربي شاياً دافئاً.',
          },
        ],
      },
    ],
  },

  // ==========================================
  // Lesson 6: Helping Gran
  // ==========================================
  {
    id: 'u3-lesson-6',
    unitNumber: 3,
    lessonNumber: 6,
    titleEn: 'Lesson 6: Helping Gran',
    titleAr: 'الدرس 6: مساعدة الجدة',
    subtitleEn: 'Grandchildren helping their grandmother with house and garden chores',
    subtitleAr: 'مساعدة الأحفاد لجدتهم في أعمال البيت والحديقة',
    transcripts: [
      {
        id: 'u3-l6-story',
        titleEn: 'Story: Helping Gran',
        titleAr: 'القصة: مساعدة الجدة',
        audioTrackNumber: 26,
        bookReference: "Student's Book p. 25",
        description: 'Noor and Zaid spend Saturday helping their grandmother with tasks.',
        lines: [
          {
            id: 'u3-l6-t26-1',
            speaker: 'Narrator',
            gender: 'male',
            textEn: 'On Saturday morning, Noor and Zaid went to visit their grandmother.',
            textAr: 'في صباح يوم السبت، ذهب نور وزيد لزيارة جدتهما.',
          },
          {
            id: 'u3-l6-t26-2',
            speaker: 'Gran',
            gender: 'female',
            textEn: 'Hello, my dears! I am so happy to see you. My garden is untidy and the kitchen needs cleaning, but my back hurts.',
            textAr: 'أهلاً بكما يا أحبائي! أنا سعيدة جداً برؤيتكما. حديقتي فوضوية والمطبخ يحتاج للتنظيف، لكن ظهري يؤلمني.',
          },
          {
            id: 'u3-l6-t26-3',
            speaker: 'Noor',
            gender: 'female',
            textEn: "Don't worry at all, Gran! We have come especially to help you with everything today.",
            textAr: 'لا تقلقي على الإطلاق يا جدتي! لقد جئنا خصيصاً لمساعدتك في كل شيء اليوم.',
          },
          {
            id: 'u3-l6-t26-4',
            speaker: 'Zaid',
            gender: 'male',
            textEn: 'I have swept the garden path, collected the dry leaves, and watered all the colourful flowers.',
            textAr: 'لقد كنستُ ممر الحديقة، وجمعتُ الأوراق الجافة، وسقيتُ كل الأزهار الملونة.',
          },
          {
            id: 'u3-l6-t26-5',
            speaker: 'Noor',
            gender: 'female',
            textEn: 'And I have cleaned the kitchen floor, washed all the dishes, and baked a delicious apple cake for you!',
            textAr: 'وأنا نظفتُ أرضية المطبخ، وغسلتُ جميع الصحون، وخبزتُ لكِ كعكة تفاح لذيذة!',
          },
          {
            id: 'u3-l6-t26-6',
            speaker: 'Gran',
            gender: 'female',
            textEn: 'What wonderful grandchildren you are! Have you really finished all that work so quickly?',
            textAr: 'يا لكما من حفيدين رائعين! هل أنهيتما حقاً كل هذا العمل بهذه السرعة الكبيرة؟',
          },
          {
            id: 'u3-l6-t26-7',
            speaker: 'Children',
            gender: 'female',
            textEn: "Yes, Gran! Everything is clean and tidy. Now let's sit together and have a lovely tea party in the garden!",
            textAr: 'نعم يا جدتي! كل شيء نظيف ومرتب. الآن دعينا نجلس معاً ونقيم حفلة شاي ممتعة في الحديقة!',
          },
        ],
      },
    ],
  },
];
`;

  const lastBracketIndex = content.lastIndexOf('];');
  if (lastBracketIndex !== -1) {
    content = content.slice(0, lastBracketIndex) + lesson456;
    fs.writeFileSync('src/data/unit3Data.ts', content, 'utf8');
    console.log('unit3Data.ts successfully updated with Lessons 4, 5, 6!');
  }
}
