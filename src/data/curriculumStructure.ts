export interface ExamGrammarTopic {
  id: string;
  titleAr: string;
  titleEn: string;
}

export interface ExamLesson {
  id: string;
  lessonNumber: number;
  titleAr: string;
  titleEn: string;
  subtitleAr?: string;
}

export interface ExamUnit {
  id: string; // 'unit-1' to 'unit-8'
  unitNumber: number;
  titleAr: string;
  titleEn: string;
  subtitleAr: string;
  lessons: ExamLesson[];
  grammarTopics: ExamGrammarTopic[];
  hasQuestions: boolean;
}

// Complete 8 units for English for Iraq (3rd Intermediate), each containing 10 lessons
export const CURRICULUM_UNITS: ExamUnit[] = [
  {
    id: 'unit-1',
    unitNumber: 1,
    titleAr: 'الوحدة الأولى: أوقات الفراغ والعطل',
    titleEn: 'Unit 1: My spare time & Holidays',
    subtitleAr: 'العطل، أنشطة الماضي، صفات التملك، وظروف التكرار',
    hasQuestions: true,
    grammarTopics: [
      { id: 'topic-past-simple', titleAr: '1. الماضي البسيط (Past Simple)', titleEn: 'Past Simple Tense' },
      { id: 'topic-past-continuous', titleAr: '2. الماضي المستمر (Past Continuous)', titleEn: 'Past Continuous Tense' },
      { id: 'topic-present-simple', titleAr: '3. المضارع البسيط (Present Simple)', titleEn: 'Present Simple Tense' },
      { id: 'topic-adverbs-frequency', titleAr: '4. ظروف التكرار (Adverbs of Frequency)', titleEn: 'Adverbs of Frequency' },
      { id: 'topic-possessive-pronouns', titleAr: '5. ضمائر وصفات التملك (Pronouns)', titleEn: 'Possessive Pronouns' },
      { id: 'topic-joining-sentences', titleAr: '6. أدوات الربط (and / but / or)', titleEn: 'Joining Sentences' },
      { id: 'topic-interests', titleAr: '7. الاهتمامات والصفات (Interests & -ing)', titleEn: 'Interests and Gerunds' },
      { id: 'topic-wh-questions', titleAr: '8. أدوات الاستفهام وتكوين الأسئلة (Wh- Questions)', titleEn: 'Question Formation & Wh- Questions' },
    ],
    lessons: [
      { id: 'lesson-1', lessonNumber: 1, titleAr: 'الدرس 1: العطل (The holidays)', titleEn: 'Lesson 1: The holidays', subtitleAr: 'كتاب النشاط ص 4 وكتاب الطالب ص 5' },
      { id: 'lesson-2', lessonNumber: 2, titleAr: 'الدرس 2: مفردات ريتشارد (Richard in Iraq)', titleEn: 'Lesson 2: Richard in Iraq', subtitleAr: 'كتاب النشاط ص 6 و 7' },
      { id: 'lesson-3', lessonNumber: 3, titleAr: 'الدرس 3: تمارين الأزمنة والماضي', titleEn: 'Lesson 3: Past Activities', subtitleAr: 'كتاب النشاط ص 8 و 9' },
      { id: 'lesson-4', lessonNumber: 4, titleAr: 'الدرس 4: أنشطة العطلة ورسالة الصديق', titleEn: 'Lesson 4: Holiday Activities', subtitleAr: 'كتاب النشاط ص 10' },
      { id: 'lesson-5', lessonNumber: 5, titleAr: 'الدرس 5: ظروف التكرار (How often?)', titleEn: 'Lesson 5: How often?', subtitleAr: 'كتاب الطالب ص 8 وكتاب النشاط ص 12 و 13' },
      { id: 'lesson-6', lessonNumber: 6, titleAr: 'الدرس 6: دفتر قصاصات باسم والآثار', titleEn: "Lesson 6: Bassem's scrapbook", subtitleAr: 'كتاب الطالب ص 9 وكتاب النشاط ص 14 و 15' },
      { id: 'lesson-7', lessonNumber: 7, titleAr: 'الدرس 7: يوم مميز وقصة أحمد (A special day)', titleEn: "Lesson 7: A special day & Ahmed's story", subtitleAr: 'كتاب الطالب ص 10 وكتاب النشاط ص 15 و 16 و 17' },
      { id: 'lesson-8', lessonNumber: 8, titleAr: 'الدرس 8: التعبير الكتابي والإنشاء', titleEn: 'Lesson 8: Writing practice', subtitleAr: 'كتاب النشاط ص 16' },
      { id: 'lesson-9', lessonNumber: 9, titleAr: 'الدرس 9: مراجعة الوحدة الشاملة', titleEn: 'Lesson 9: Round up & Review', subtitleAr: 'كتاب النشاط ص 17 و 18' },
      { id: 'lesson-10', lessonNumber: 10, titleAr: 'الدرس 10: قصة الوحدة (Story time)', titleEn: 'Lesson 10: Story time', subtitleAr: 'كتاب الطالب ص 14 وكتاب النشاط ص 19' },
    ],
  },
  {
    id: 'unit-2',
    unitNumber: 2,
    titleAr: 'الوحدة الثانية: التواريخ والفصول',
    titleEn: 'Unit 2: Dates and seasons',
    subtitleAr: 'فصول السنة، الأشهر، الطقس والمستقبل مع will',
    hasQuestions: false,
    grammarTopics: [
      { id: 'u2-topic-future-will', titleAr: '1. المستقبل البسيط مع will', titleEn: 'Future Simple with will' },
      { id: 'u2-topic-comparatives', titleAr: '2. المقارنة والتفضيل (Comparatives & Superlatives)', titleEn: 'Comparatives & Superlatives' },
      { id: 'u2-topic-dates-ordinals', titleAr: '3. الأعداد الترتيبية والتواريخ (Dates & Ordinals)', titleEn: 'Ordinal Numbers & Dates' },
    ],
    lessons: [
      { id: 'u2-lesson-1', lessonNumber: 1, titleAr: 'الدرس 1: فصولنا الأربعة (Our four seasons)', titleEn: 'Lesson 1: Our four seasons', subtitleAr: 'كتاب الطالب ص 16 وكتاب النشاط ص 22 و 23' },
      { id: 'u2-lesson-2', lessonNumber: 2, titleAr: 'الدرس 2: ماذا سنفعل؟ (What will we do?)', titleEn: 'Lesson 2: What will we do?', subtitleAr: 'كتاب الطالب ص 17 وكتاب النشاط ص 24 و 25' },
      { id: 'u2-lesson-3', lessonNumber: 3, titleAr: 'الدرس 3: أشهر السنة (The months of the year)', titleEn: 'Lesson 3: The months of the year', subtitleAr: 'كتاب الطالب ص 18 وكتاب النشاط ص 26 و 27' },
      { id: 'u2-lesson-4', lessonNumber: 4, titleAr: "الدرس 4: ما هو التاريخ؟ (What's the date?)", titleEn: "Lesson 4: What's the date?", subtitleAr: 'كتاب الطالب ص 19 وكتاب النشاط ص 28 و 29' },
      { id: 'u2-lesson-5', lessonNumber: 5, titleAr: 'الدرس 5: الحياة في بورونوك (Life in Boronuk)', titleEn: 'Lesson 5: Life in Boronuk', subtitleAr: 'كتاب الطالب ص 20 وكتاب النشاط ص 30 و 31' },
      { id: 'u2-lesson-6', lessonNumber: 6, titleAr: 'الدرس 6: مدارس مختلفة (Different schools)', titleEn: 'Lesson 6: Different schools', subtitleAr: 'كتاب الطالب ص 21 وكتاب النشاط ص 32 و 33' },
      { id: 'u2-lesson-7', lessonNumber: 7, titleAr: 'الدرس 7: التزلج بالزلاجة (Bobsleighing)', titleEn: 'Lesson 7: Bobsleighing: the fastest winter sport', subtitleAr: 'كتاب الطالب ص 22 وكتاب النشاط ص 34 و 35' },
      { id: 'u2-lesson-8', lessonNumber: 8, titleAr: 'الدرس 8: عيد الفطر المبارك (Eid al-Fitr)', titleEn: 'Lesson 8: Eid al-Fitr', subtitleAr: 'كتاب الطالب ص 23 وكتاب النشاط ص 36 و 37' },
      { id: 'u2-lesson-9', lessonNumber: 9, titleAr: 'الدرس 9: مراجعة شاملة (Round up)', titleEn: 'Lesson 9: Round up', subtitleAr: 'كتاب الطالب ص 24 وكتاب النشاط ص 38' },
      { id: 'u2-lesson-10', lessonNumber: 10, titleAr: "الدرس 10: رأس السنة في لندن (New Year's Day in London)", titleEn: "Lesson 10: New Year's Day in London", subtitleAr: 'كتاب الطالب ص 25 وكتاب النشاط ص 39' },
    ],
  },
  {
    id: 'unit-3',
    unitNumber: 3,
    titleAr: 'الوحدة الثالثة: ماذا فعلت اليوم؟',
    titleEn: 'Unit 3: What have you done today?',
    subtitleAr: 'المضارع التام، الأعمال المنزلية، وظروف الحال',
    hasQuestions: false,
    grammarTopics: [
      { id: 'u3-present-perfect', titleAr: '1. زمن المضارع التام (Present Perfect)', titleEn: 'Present Perfect Tense' },
      { id: 'u3-past-participle', titleAr: '2. التصريف الثالث للأفعال (Past Participle)', titleEn: 'Past Participle' },
      { id: 'u3-health-feelings', titleAr: '3. التعبير عن الصحة والمشاعر (Health & Feelings)', titleEn: 'Health & Feelings' },
      { id: 'u3-adverbs-manner', titleAr: '4. ظروف الحال (Adverbs of Manner)', titleEn: 'Adverbs of Manner' },
    ],
    lessons: [
      { id: 'u3-lesson-1', lessonNumber: 1, titleAr: 'الدرس 1: لقد أنهيتُ عملي', titleEn: "Lesson 1: I've finished my work", subtitleAr: 'كتاب الطالب ص 26 وكتاب النشاط ص 30 و 31' },
      { id: 'u3-lesson-2', lessonNumber: 2, titleAr: 'الدرس 2: كثرة الأيادي تخفف العمل', titleEn: 'Lesson 2: Many hands make light work', subtitleAr: 'كتاب الطالب ص 27 وكتاب النشاط ص 32 و 33' },
      { id: 'u3-lesson-3', lessonNumber: 3, titleAr: 'الدرس 3: غوين المجدّة ولين الكسول', titleEn: 'Lesson 3: Good Gwen and Lazy Len', subtitleAr: 'كتاب الطالب ص 28 وكتاب النشاط ص 34 و 35' },
      { id: 'u3-lesson-4', lessonNumber: 4, titleAr: 'الدرس 4: أسطوانة الهيبو (The Hippo Roller)', titleEn: 'Lesson 4: The Hippo Roller', subtitleAr: 'كتاب الطالب ص 29 وكتاب النشاط ص 36 و 37' },
      { id: 'u3-lesson-5', lessonNumber: 5, titleAr: 'الدرس 5: ما الأمر؟ (مم تشكو؟)', titleEn: "Lesson 5: What's the matter?", subtitleAr: 'كتاب الطالب ص 30 وكتاب النشاط ص 38 و 39' },
      { id: 'u3-lesson-6', lessonNumber: 6, titleAr: 'الدرس 6: مساعدة الجدة (Helping Gran)', titleEn: 'Lesson 6: Helping Gran', subtitleAr: 'كتاب الطالب ص 31 وكتاب النشاط ص 40 و 41' },
      { id: 'u3-lesson-7', lessonNumber: 7, titleAr: 'الدرس 7: الثعلب الجائع (The Hungry Fox)', titleEn: 'Lesson 7: The Hungry Fox', subtitleAr: 'كتاب الطالب ص 32 وكتاب النشاط ص 42 و 43' },
      { id: 'u3-lesson-8', lessonNumber: 8, titleAr: 'الدرس 8: كان يا ما كان (Once Upon a Time)', titleEn: 'Lesson 8: Once Upon a Time', subtitleAr: 'كتاب الطالب ص 33 وكتاب النشاط ص 44 و 45' },
      { id: 'u3-lesson-9', lessonNumber: 9, titleAr: 'الدرس 9: مراجعة شاملة (Round up)', titleEn: 'Lesson 9: Round up', subtitleAr: 'كتاب الطالب ص 34 وكتاب النشاط ص 46 و 47' },
      { id: 'u3-lesson-10', lessonNumber: 10, titleAr: 'الدرس 10: وقت القصة (Story Time)', titleEn: 'Lesson 10: Story Time', subtitleAr: 'كتاب الطالب ص 35 وكتاب النشاط ص 48 و 49' },
    ],
  },
  {
    id: 'unit-4',
    unitNumber: 4,
    titleAr: 'الوحدة الرابعة: المراجعة العامة الأولى',
    titleEn: 'Unit 4: Revision 1',
    subtitleAr: 'مراجعة وتثبيت مهارات وقواعد الوحدات 1 و 2 و 3',
    hasQuestions: false,
    grammarTopics: [
      { id: 'u4-review-tenses', titleAr: 'مراجعة الأزمنة الماضية والحاضرة', titleEn: 'Tenses Revision' },
      { id: 'u4-review-pronouns', titleAr: 'مراجعة شاملة لضمائر الفاعل والمفعول والتملك', titleEn: 'Pronouns Master Review' },
    ],
    lessons: Array.from({ length: 10 }, (_, i) => ({
      id: `u4-lesson-${i + 1}`,
      lessonNumber: i + 1,
      titleAr: `الدرس ${i + 1}: مراجعة وتمارين (Lesson ${i + 1})`,
      titleEn: `Lesson ${i + 1}: Revision & Exercises`,
      subtitleAr: `الوحدة الرابعة • الدرس ${i + 1}`,
    })),
  },
  {
    id: 'unit-5',
    unitNumber: 5,
    titleAr: 'الوحدة الخامسة: بلدان أخرى وثقافات',
    titleEn: 'Unit 5: Other countries',
    subtitleAr: 'بلدان العالم، الثقافات، والمقارنات والتصريف الثالث',
    hasQuestions: false,
    grammarTopics: [
      { id: 'u5-past-participle', titleAr: 'التصريف الثالث واستخدامات have/has been', titleEn: 'Past Participle & been/gone' },
      { id: 'u5-time-connectors', titleAr: 'أدوات الربط الزمنية (before, after, when)', titleEn: 'Time Connectors' },
    ],
    lessons: Array.from({ length: 10 }, (_, i) => ({
      id: `u5-lesson-${i + 1}`,
      lessonNumber: i + 1,
      titleAr: `الدرس ${i + 1}: بلدان وثقافات (Lesson ${i + 1})`,
      titleEn: `Lesson ${i + 1}: Countries & Cultures`,
      subtitleAr: `الوحدة الخامسة • الدرس ${i + 1}`,
    })),
  },
  {
    id: 'unit-6',
    unitNumber: 6,
    titleAr: 'الوحدة السادسة: المهن والوظائف',
    titleEn: 'Unit 6: Jobs and careers',
    subtitleAr: 'المهن، أدوات التعريف، ضمائر الوصل والمستقبل مع going to',
    hasQuestions: false,
    grammarTopics: [
      { id: 'u6-articles', titleAr: 'أدوات التعريف والتنكير (a, an, the)', titleEn: 'Definite & Indefinite Articles' },
      { id: 'u6-relative-pronouns', titleAr: 'ضمائر الوصل (who, which, that)', titleEn: 'Relative Pronouns' },
      { id: 'u6-future-going-to', titleAr: 'المستقبل للتخطيط مع going to', titleEn: 'Future with going to' },
    ],
    lessons: Array.from({ length: 10 }, (_, i) => ({
      id: `u6-lesson-${i + 1}`,
      lessonNumber: i + 1,
      titleAr: `الدرس ${i + 1}: المهن والوظائف (Lesson ${i + 1})`,
      titleEn: `Lesson ${i + 1}: Careers & Occupations`,
      subtitleAr: `الوحدة السادسة • الدرس ${i + 1}`,
    })),
  },
  {
    id: 'unit-7',
    unitNumber: 7,
    titleAr: 'الوحدة السابعة: البلدان والعادات والتقاليد',
    titleEn: 'Unit 7: Countries and customs',
    subtitleAr: 'المبني للمجهول، ترتيب الظروف، وأدوات الربط',
    hasQuestions: false,
    grammarTopics: [
      { id: 'u7-passive-voice', titleAr: 'المبني للمجهول (Passive Voice)', titleEn: 'Passive Voice' },
      { id: 'u7-adverbs-order', titleAr: 'ترتيب الظروف (حال، مكان، زمان)', titleEn: 'Adverbs Order' },
    ],
    lessons: Array.from({ length: 10 }, (_, i) => ({
      id: `u7-lesson-${i + 1}`,
      lessonNumber: i + 1,
      titleAr: `الدرس ${i + 1}: عادات وتقاليد (Lesson ${i + 1})`,
      titleEn: `Lesson ${i + 1}: Customs & Traditions`,
      subtitleAr: `الوحدة السابعة • الدرس ${i + 1}`,
    })),
  },
  {
    id: 'unit-8',
    unitNumber: 8,
    titleAr: 'الوحدة الثامنة: المراجعة العامة الثانية',
    titleEn: 'Unit 8: Revision 2',
    subtitleAr: 'مراجعة وتثبيت مهارات وقواعد الوحدات 5 و 6 و 7',
    hasQuestions: false,
    grammarTopics: [
      { id: 'u8-final-grammar-review', titleAr: 'مراجعة شاملة لقواعد الكورس الثاني', titleEn: 'Final Comprehensive Review' },
    ],
    lessons: Array.from({ length: 10 }, (_, i) => ({
      id: `u8-lesson-${i + 1}`,
      lessonNumber: i + 1,
      titleAr: `الدرس ${i + 1}: المراجعة النهائية (Lesson ${i + 1})`,
      titleEn: `Lesson ${i + 1}: Final Revision`,
      subtitleAr: `الوحدة الثامنة • الدرس ${i + 1}`,
    })),
  },
];
