import fs from 'fs';

let content = fs.readFileSync('src/data/unit3CurriculumChunks.ts', 'utf8');

if (!content.includes('// ===================== LESSON 4 =====================')) {
  const chunks456 = `  // ===================== LESSON 4 =====================
  'u3-l4-t23-1': [
    { en: 'In many parts of Africa,', ar: 'في أجزاء كثيرة من إفريقيا،' },
    { en: 'people have to walk long distances', ar: 'يضطر الناس لقطع مسافات طويلة مشياً' },
    { en: 'every day to collect water for their families.', ar: 'كل يوم لجمع الماء لعائلاتهم.' },
  ],
  'u3-l4-t23-2': [
    { en: 'Carrying heavy buckets of water', ar: 'حمل أوعية الماء الثقيلة' },
    { en: 'on the head causes severe neck and back pain,', ar: 'فوق الرأس يُسبب آلاماً شديدة في الرقبة والظهر،' },
    { en: 'and takes many hours of hard work.', ar: 'ويستغرق ساعات طويلة من العمل الشاق.' },
  ],
  'u3-l4-t23-3': [
    { en: 'Two South African men', ar: 'قام رجلان من جنوب إفريقيا' },
    { en: 'have invented a wonderful solution:', ar: 'بابتكار حل رائع:' },
    { en: 'The Hippo Roller.', ar: 'أسطوانة الهيبو.' },
  ],
  'u3-l4-t23-4': [
    { en: 'The Hippo Roller is a large, strong plastic barrel', ar: 'أسطوانة الهيبو عبارة عن برميل بلاستيكي كبير وقوي' },
    { en: 'that can hold 90 litres of water.', ar: 'يستوعب 90 لتراً من الماء.' },
  ],
  'u3-l4-t23-5': [
    { en: 'Instead of carrying the heavy weight on their heads,', ar: 'بدلاً من حمل هذا الوزن الثقيل فوق رؤوسهم،' },
    { en: 'people can easily push or pull the barrel', ar: 'يستطيع الناس دفع أو سحب البرميل بسهولة' },
    { en: 'along the ground using a steel handle.', ar: 'على الأرض باستخدام مقبض فولاذي.' },
  ],
  'u3-l4-t23-6': [
    { en: 'Even young children and elderly people', ar: 'حتى الأطفال الصغار وكبار السن' },
    { en: 'can easily move a full roller.', ar: 'يمكنهم تحريك أسطوانة ممتلئة بالماء بكل سهولة.' },
  ],
  'u3-l4-t23-7': [
    { en: 'The Hippo Roller has improved the lives', ar: 'لقد حسّنت أسطوانة الهيبو حياة' },
    { en: 'of tens of thousands of families across Africa.', ar: 'عشرات الآلاف من العائلات في مختلف أنحاء إفريقيا.' },
  ],

  // ===================== LESSON 5 =====================
  'u3-l5-t24-1': [
    { en: 'Hello, Tariq.', ar: 'مرحباً يا طارق.' },
    { en: "What's the matter with you?", ar: 'ما الأمر؟ مم تشكو؟' },
  ],
  'u3-l5-t24-2': [
    { en: 'I have got a bad headache, Doctor,', ar: 'عندي صداع شديد يا دكتور،' },
    { en: 'and my throat hurts when I swallow.', ar: 'وحلقي يؤلمني عندما أبتلع.' },
  ],
  'u3-l5-t24-3': [
    { en: 'Have you got a fever', ar: 'هل لديك حمى' },
    { en: 'or high temperature?', ar: 'أو ارتفاع في درجة الحرارة؟' },
  ],
  'u3-l5-t24-4': [
    { en: 'Yes, I feel very hot,', ar: 'نعم، أشعر بحرارة شديدة' },
    { en: 'shivering and tired.', ar: 'ورجفة وتعب عام.' },
  ],
  'u3-l5-t24-5': [
    { en: 'You have got a bad cold.', ar: 'أنت مصاب بنزلة برد حادة.' },
    { en: 'You should take this medicine,', ar: 'يجب أن تأخذ هذا الدواء،' },
    { en: 'drink plenty of water, and stay in bed.', ar: 'وتشرب الكثير من الماء، وترتاح في الفراش.' },
  ],
  'u3-l5-t24-6': [
    { en: 'Thank you very much, Doctor.', ar: 'شكراً جزيلاً لك يا دكتور.' },
  ],

  'u3-l5-t25-1': [
    { en: "What's the matter, Sara?", ar: 'ما الأمر يا سارة؟' },
    { en: 'Why are you holding your stomach?', ar: 'لماذا تمسكين بطنك؟' },
  ],
  'u3-l5-t25-2': [
    { en: 'I have got a terrible stomachache, Mum!', ar: 'لدي ألم فظيع في بطني يا أمي!' },
  ],
  'u3-l5-t25-3': [
    { en: 'Have you eaten too many sweets today?', ar: 'هل تناولتِ الكثير من الحلويات اليوم؟' },
  ],
  'u3-l5-t25-4': [
    { en: 'Yes, Mum.', ar: 'نعم يا أمي،' },
    { en: 'I have eaten a whole large bag of sweets at school.', ar: 'لقد أكلتُ كيساً كبيراً كاملاً من الحلويات في المدرسة.' },
  ],
  'u3-l5-t25-5': [
    { en: 'That is why your stomach hurts!', ar: 'لهذا السبب تؤلمكِ بطنكِ!' },
    { en: "You shouldn't eat so much sugar.", ar: 'لا ينبغي أن تأكلي كل هذا السكر.' },
    { en: 'Lie down and drink warm tea.', ar: 'استلقي واشربي شاياً دافئاً.' },
  ],

  // ===================== LESSON 6 =====================
  'u3-l6-t26-1': [
    { en: 'On Saturday morning,', ar: 'في صباح يوم السبت،' },
    { en: 'Noor and Zaid went to visit their grandmother.', ar: 'ذهب نور وزيد لزيارة جدتهما.' },
  ],
  'u3-l6-t26-2': [
    { en: 'Hello, my dears!', ar: 'أهلاً بكما يا أحبائي!' },
    { en: 'I am so happy to see you.', ar: 'أنا سعيدة جداً برؤيتكما.' },
    { en: 'My garden is untidy and the kitchen needs cleaning,', ar: 'حديقتي فوضوية والمطبخ يحتاج للتنظيف،' },
    { en: 'but my back hurts.', ar: 'لكن ظهري يؤلمني.' },
  ],
  'u3-l6-t26-3': [
    { en: "Don't worry at all, Gran!", ar: 'لا تقلقي على الإطلاق يا جدتي!' },
    { en: 'We have come especially to help you with everything today.', ar: 'لقد جئنا خصيصاً لمساعدتك في كل شيء اليوم.' },
  ],
  'u3-l6-t26-4': [
    { en: 'I have swept the garden path,', ar: 'لقد كنستُ ممر الحديقة،' },
    { en: 'collected the dry leaves, and watered all the colourful flowers.', ar: 'وجمعتُ الأوراق الجافة، وسقيتُ كل الأزهار الملونة.' },
  ],
  'u3-l6-t26-5': [
    { en: 'And I have cleaned the kitchen floor,', ar: 'وأنا نظفتُ أرضية المطبخ،' },
    { en: 'washed all the dishes, and baked a delicious apple cake for you!', ar: 'وغسلتُ جميع الصحون، وخبزتُ لكِ كعكة تفاح لذيذة!' },
  ],
  'u3-l6-t26-6': [
    { en: 'What wonderful grandchildren you are!', ar: 'يا لكما من حفيدين رائعين!' },
    { en: 'Have you really finished all that work so quickly?', ar: 'هل أنهيتما حقاً كل هذا العمل بهذه السرعة الكبيرة؟' },
  ],
  'u3-l6-t26-7': [
    { en: 'Yes, Gran! Everything is clean and tidy.', ar: 'نعم يا جدتي! كل شيء نظيف ومرتب.' },
    { en: "Now let's sit together and have a lovely tea party in the garden!", ar: 'الآن دعينا نجلس معاً ونقيم حفلة شاي ممتعة في الحديقة!' },
  ],
};
`;

  const lastBraceIndex = content.lastIndexOf('};');
  if (lastBraceIndex !== -1) {
    content = content.slice(0, lastBraceIndex) + chunks456;
    fs.writeFileSync('src/data/unit3CurriculumChunks.ts', content, 'utf8');
    console.log('unit3CurriculumChunks.ts successfully updated with Lessons 4, 5, 6!');
  }
}
