import { LessonData } from '../../types/curriculum';

export const lesson8: LessonData = {
  id: 'u3-lesson-8',
  unitNumber: 3,
  lessonNumber: 8,
  titleEn: 'Lesson 8: Once upon a time ...',
  titleAr: 'الدرس 8: كان يا ما كان (قصة الراعي الصغير)',
  subtitleEn: 'The traditional fable of the Shepherd Boy and the importance of honesty',
  subtitleAr: 'قصة الراعي الصغير والذئب والدرس الأخلاقي في الصدق وتجنب الكذب',
  imageUrl: '/images/lessons/u3-lesson-8.jpg',
  transcripts: [
    {
      id: 'u3-l8-story',
      titleEn: 'Track 31: Story - The Shepherd Boy',
      titleAr: 'التسجيل 31: القصة - الراعي الصغير',
      audioTrackNumber: 31,
      bookReference: "Student's Book p. 33",
      description: 'Official story of the shepherd boy who tricked the villagers until a real wolf arrived.',
      lines: [
        {
          id: 'u3-l8-t1',
          speaker: 'Narrator',
          gender: 'male',
          textEn: 'A shepherd boy was looking after his sheep in a field near a village. He felt very bored.',
          textAr: 'كان صبي راعٍ يرعى أغنامه في حقل قريب من إحدى القرى، وكان يشعر بملل شديد.',
        },
        {
          id: 'u3-l8-t2',
          speaker: 'Shepherd Boy',
          gender: 'male',
          textEn: "Wolf! Wolf! A wolf is attacking the sheep! Help!",
          textAr: 'ذئب! ذئب! هناك ذئب يهاجم الأغنام! النجدة!',
        },
        {
          id: 'u3-l8-t3',
          speaker: 'Narrator',
          gender: 'male',
          textEn: "The men of the village ran to the field to help him, but there was no wolf. The boy laughed: 'That was a joke!' The villagers were angry: 'That's not funny!'",
          textAr: 'ركض رجال القرية إلى الحقل لمساعدته، لكن لم يكن هناك أي ذئب. ضحك الصبي وقال: "كانت تلك مزحة!" فغضب القرويون وقالوا: "هذا ليس مضحكاً!"',
        },
        {
          id: 'u3-l8-t4',
          speaker: 'Narrator',
          gender: 'male',
          textEn: "A few days later, the boy was bored again. He shouted: 'Wolf! Help! Wolf!' Again the villagers ran to help him, but again there was no wolf. 'We don't believe you!' they said.",
          textAr: 'بعد بضعة أيام، شعر الصبي بالملل مرة أخرى، فصرخ: "ذئب! النجدة! ذئب!" وركض القرويون مجدداً لمساعدته، لكن للمرة الثانية لم يكن هناك ذئب. فقالوا: "نحن لا نصدقك!"',
        },
        {
          id: 'u3-l8-t5',
          speaker: 'Narrator',
          gender: 'male',
          textEn: "Then one evening, a real wolf came into the field. The terrified boy ran towards the village shouting: 'Wolf! Help me, please! A real wolf!' But nobody moved. 'He's lying again,' the villagers said.",
          textAr: 'ثم في أحد المساءات، دخل ذئب حقيقي إلى الحقل. فركض الصبي المذعور نحو القرية صارخاً: "ذئب! ساعدوني من فضلكم! ذئب حقيقي!" لكن أحداً لم يتحرك، وقال القرويون: "إنه يكذب مرة أخرى".',
        },
        {
          id: 'u3-l8-t6',
          speaker: 'Narrator',
          gender: 'male',
          textEn: "The wolf killed all the sheep. The boy sat alone and cried. He learned that nobody believes a liar, even when he tells the truth.",
          textAr: 'فافترس الذئب جميع الأغنام. جلس الصبي وحيداً يبكي؛ لقد تعلم درساً قاسياً أنه لا أحد يصدق الكاذب حتى عندما يقول الحقيقة.',
        },
        {
          id: 'u3-l8-t7',
          speaker: 'Teacher',
          gender: 'male',
          textEn: 'Key vocabulary: shepherd (راعي), bored (شعر بالملل), funny (مضحك), sheep (أغنام), wolf (ذئب), dead (ميت). Moral: Do not tell a lie.',
          textAr: 'مفردات الدرس: راعي، ملل، مضحك، أغنام، ذئب، ميت. العبرة المستفادة: إياك والكذب، وكن صادقاً دائماً.',
        },
      ],
    },
  ],
};
