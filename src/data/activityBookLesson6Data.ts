export interface DialogueMatchItem {
  id: string;
  number: number;
  adelSpeechEn: string;
  adelSpeechAr: string;
  correctLetter: 'a' | 'b' | 'c' | 'd' | 'e' | 'f' | 'g';
  correctBassemEn: string;
  correctBassemAr: string;
  imageUrl?: string;
}

export interface DialogueOptionItem {
  letter: 'a' | 'b' | 'c' | 'd' | 'e' | 'f' | 'g';
  textEn: string;
  textAr: string;
}

export interface ComprehensionQuestionItem {
  id: string;
  letter: string;
  questionEn: string;
  questionAr: string;
  correctAnswer: string;
  acceptableAnswers: string[];
  options: string[];
  explanationAr: string;
}

export interface GuidedDialogueTurn {
  id: string;
  speaker: string;
  speakerAr: string;
  promptEn: string;
  promptAr: string;
  correctResponse: string;
  options: string[];
}

export interface SoundSortingWord {
  id: string;
  word: string;
  sound: 's' | 'sh'; // /s/ as in 'sells', /ʃ/ as in 'she'
  phonetic: string;
  meaningAr: string;
  sentenceContext: string;
}

export const lesson6ActivityData = {
  // AB Page 14 - Exercise A: Match Adel's lines (1-7) with Bassem's answers (a-g)
  page14ExAMatch: {
    titleEn: 'Exercise A: Match the conversation',
    titleAr: 'تمرين A: مطابقة محادثة عادل وباسم (ص 14)',
    instructionEn: 'Match the sentences 1-7 with the responses a-g to complete the conversation.',
    instructionAr: 'طابق عبارات عادل (1 إلى 7) مع ردود باسم المناسبة (a إلى g) لإكمال المحادثة المنهجية:',
    adelLines: [
      {
        id: 'adel-1',
        number: 1,
        adelSpeechEn: 'Hello, Bassem.',
        adelSpeechAr: 'مرحباً باسم.',
        correctLetter: 'b',
        correctBassemEn: 'Oh, hi, Adel.',
        correctBassemAr: 'أوه، أهلاً عادل.',
        imageUrl: '/images/dialogue/l6-1.jpg',
      },
      {
        id: 'adel-2',
        number: 2,
        adelSpeechEn: 'Do you want to come to the mall?',
        adelSpeechAr: 'هل تريد المجيء إلى المركز التجاري (المول)؟',
        correctLetter: 'd',
        correctBassemEn: 'No, thanks.',
        correctBassemAr: 'لا، شكراً لك.',
        imageUrl: '/images/dialogue/l6-1.jpg',
      },
      {
        id: 'adel-3',
        number: 3,
        adelSpeechEn: 'What are you doing?',
        adelSpeechAr: 'ماذا تفعل؟',
        correctLetter: 'g',
        correctBassemEn: "I'm putting some photographs in my scrapbook.",
        correctBassemAr: 'أنا أضع بعض الصور في دفتر قصاصاتي.',
        imageUrl: '/images/dialogue/l6-2.jpg',
      },
      {
        id: 'adel-4',
        number: 4,
        adelSpeechEn: 'Photographs of what?',
        adelSpeechAr: 'صور ماذا؟',
        correctLetter: 'a',
        correctBassemEn: 'Historical sites in Iraq.',
        correctBassemAr: 'مواقع تاريخية في العراق.',
        imageUrl: '/images/dialogue/l6-3.jpg',
      },
      {
        id: 'adel-5',
        number: 5,
        adelSpeechEn: 'Where do you get the photographs?',
        adelSpeechAr: 'من أين تحصل على الصور؟',
        correctLetter: 'e',
        correctBassemEn: 'I visit different cities and take pictures of ruins.',
        correctBassemAr: 'أزور مدناً ومحافظات مختلفة وألتقط صوراً للآثار والمعالم القديمة.',
        imageUrl: '/images/dialogue/l6-4.jpg',
      },
      {
        id: 'adel-6',
        number: 6,
        adelSpeechEn: 'Do you have many?',
        adelSpeechAr: 'هل لديك الكثير منها؟',
        correctLetter: 'f',
        correctBassemEn: 'I have lots of them.',
        correctBassemAr: 'لدي الكثير منها.',
        imageUrl: '/images/dialogue/l6-6.jpg',
      },
      {
        id: 'adel-7',
        number: 7,
        adelSpeechEn: 'But why ruins?',
        adelSpeechAr: 'ولكن لماذا الآثار بالذات؟',
        correctLetter: 'c',
        correctBassemEn: 'I like them.',
        correctBassemAr: 'لأنني أحبها.',
        imageUrl: '/images/dialogue/l6-5.jpg',
      },
    ] as DialogueMatchItem[],
    options: [
      { letter: 'a', textEn: 'Historical sites in Iraq.', textAr: 'مواقع تاريخية في العراق.' },
      { letter: 'b', textEn: 'Oh, hi, Adel.', textAr: 'أوه، أهلاً عادل.' },
      { letter: 'c', textEn: 'I like them.', textAr: 'لأنني أحبها.' },
      { letter: 'd', textEn: 'No, thanks.', textAr: 'لا، شكراً لك.' },
      { letter: 'e', textEn: 'I visit different cities and take pictures of ruins.', textAr: 'أزور مدناً مختلفة وألتقط صوراً للآثار.' },
      { letter: 'f', textEn: 'I have lots of them.', textAr: 'لدي الكثير منها.' },
      { letter: 'g', textEn: "I'm putting some photographs in my scrapbook.", textAr: 'أنا أضع بعض الصور في دفتر قصاصاتي.' },
    ] as DialogueOptionItem[],
  },

  // AB Page 15 - Exercise 1: Comprehension Questions on Bassem's Scrapbook
  page15Ex1Questions: {
    titleEn: 'Exercise 1: Read and answer the questions',
    titleAr: "تمرين 1: أسئلة استيعاب محادثة باسم وعادل (ص 15)",
    instructionEn: 'Look at the conversation on Student\'s Book page 9 and answer the questions.',
    instructionAr: 'اقرأ محادثة صفحة 9 من كتاب الطالب وأجب عن الأسئلة المنهجية الخمسة:',
    questions: [
      {
        id: 'q-a',
        letter: 'a',
        questionEn: 'Where does Adel want to go?',
        questionAr: 'إلى أين يريد عادل أن يذهب؟',
        correctAnswer: 'To the mall',
        acceptableAnswers: ['to the mall', 'the mall', 'to a mall', 'he wants to go to the mall'],
        options: ['To the mall', 'To the park', 'To the museum', 'To school'],
        explanationAr: 'دعا عادل صديقه باسم قائلاً: "Do you want to come to the mall?". فالإجابة هي إلى المركز التجاري (To the mall).',
      },
      {
        id: 'q-b',
        letter: 'b',
        questionEn: 'What does Bassem want to do?',
        questionAr: 'ماذا يريد باسم أن يفعل في المنزل؟',
        correctAnswer: 'Put photographs in his scrapbook',
        acceptableAnswers: [
          'put photographs in his scrapbook',
          'put photos in his scrapbook',
          'put some photographs in his scrapbook',
          'he wants to put photographs in his scrapbook',
        ],
        options: [
          'Put photographs in his scrapbook',
          'Watch TV in his bedroom',
          'Play computer games',
          'Help his mother in the kitchen',
        ],
        explanationAr: 'اعتذر باسم عن الذهاب لأنه مشغول بوضع الصور في دفتر قصاصاته: "I am putting some photographs in my scrapbook".',
      },
      {
        id: 'q-c',
        letter: 'c',
        questionEn: 'Where does he take the photographs?',
        questionAr: 'أين يلتقط باسم الصور التذكارية؟',
        correctAnswer: 'In different cities in Iraq',
        acceptableAnswers: [
          'in different cities in iraq',
          'different cities in iraq',
          'in different cities',
          'different cities',
          'he visits different cities in iraq',
        ],
        options: [
          'In different cities in Iraq',
          'At his school garden',
          'In other countries abroad',
          'Only in Baghdad',
        ],
        explanationAr: 'أجاب باسم: "I visit different cities and take pictures of ruins" (يزور مدناً ومحافظات مختلفة بالعراق).',
      },
      {
        id: 'q-d',
        letter: 'd',
        questionEn: 'What does he take photographs of?',
        questionAr: 'صور ماذا يلتقط باسم بالتحديد؟',
        correctAnswer: 'Historical sites in Iraq / ruins',
        acceptableAnswers: [
          'historical sites in iraq / ruins',
          'historical sites in iraq',
          'historical sites',
          'ruins',
          'pictures of ruins',
        ],
        options: [
          'Historical sites in Iraq / ruins',
          'Animals and birds',
          'Modern buildings and cars',
          'Food and restaurants',
        ],
        explanationAr: 'باسم مهتم بالمعالم الأثرية والتاريخية في العراق: "Historical sites in Iraq" و "pictures of ruins".',
      },
      {
        id: 'q-e',
        letter: 'e',
        questionEn: 'Why does he take photographs of ruins?',
        questionAr: 'لماذا يفضل التقاط صور الآثار بالذات؟',
        correctAnswer: 'Because he likes them',
        acceptableAnswers: [
          'because he likes them',
          'he likes them',
          'because i like them',
          'i like them',
        ],
        options: [
          'Because he likes them',
          'Because his teacher told him to',
          'Because he sells them to tourists',
          'Because his father asked him to',
        ],
        explanationAr: 'عندما سأله عادل متعجباً "But why ruins؟" أجابه باسم ببساطة: "Because I like them" (لأنه يحبها).',
      },
    ] as ComprehensionQuestionItem[],
  },

  // AB Page 15 - Exercise 2: Guided Dialogue Practice (Hanaa and Rafel)
  page15Ex2Dialogue: {
    titleEn: 'Exercise 2: Talk about hobbies (Model Conversation)',
    titleAr: 'تمرين 2: محادثة مماثلة عن الهوايات (هناء ورافل)',
    instructionEn: 'Complete the dialogue between Hanaa and Rafel using the conversation model.',
    instructionAr: 'أكمل الحوار بين هناء ورافل وفق النموذج المنهجي لمحادثة عادل وباسم:',
    turns: [
      {
        id: 't-1',
        speaker: 'Hanaa',
        speakerAr: 'هناء',
        promptEn: 'Hello, Rafel. Do you want to come to the park?',
        promptAr: 'مرحباً رافل، هل تودين الذهاب معي إلى المتنزه؟',
        correctResponse: 'No, thanks. I am making something.',
        options: [
          'No, thanks. I am making something.',
          'Yes, I want to sleep.',
          'Always we go to school.',
        ],
      },
      {
        id: 't-2',
        speaker: 'Hanaa',
        speakerAr: 'هناء',
        promptEn: 'What are you making?',
        promptAr: 'ماذا تصنعين؟',
        correctResponse: 'I am making a model plane.',
        options: [
          'I am making a model plane.',
          'I was at home.',
          'Ruins in different cities.',
        ],
      },
      {
        id: 't-3',
        speaker: 'Hanaa',
        speakerAr: 'هناء',
        promptEn: 'Why model planes?',
        promptAr: 'ولماذا مجسمات الطائرات بالذات؟',
        correctResponse: 'Because I like planes and flying.',
        options: [
          'Because I like planes and flying.',
          'No, never on Fridays.',
          'To the mall with Adel.',
        ],
      },
    ] as GuidedDialogueTurn[],
  },

  // AB Page 15 - Exercise 3: Pronunciation / Sound Sorter (/s/ and /ʃ/)
  page15Ex3Sounds: {
    titleEn: 'Exercise 3: Pronunciation (/s/ and /ʃ/)',
    titleAr: 'تمرين 3: تمييز أصوات اللسان (/s/ و /ʃ/)',
    instructionEn: 'Sort the words from the tongue-twister into the correct sound column.',
    instructionAr: 'صنّف كلمات تمرين نطق الأصوات (Tongue-twister) حسب صوت السين /s/ أو صوت الشين /ʃ/:',
    tongueTwisterEn: 'She sells seashells on the seashore. The shells she sells are seashells, I am sure.',
    tongueTwisterAr: 'هي تبيع أصداف البحر على شاطئ البحر. والأصداف التي تبيعها أصداف بحرية، أنا متأكد.',
    words: [
      {
        id: 'w-she',
        word: 'She',
        sound: 'sh',
        phonetic: '/ʃiː/',
        meaningAr: 'هي (ضمير غائب)',
        sentenceContext: 'She sells...',
      },
      {
        id: 'w-sells',
        word: 'sells',
        sound: 's',
        phonetic: '/sɛlz/',
        meaningAr: 'تبيع (فعل مضارع)',
        sentenceContext: '...sells seashells...',
      },
      {
        id: 'w-sea',
        word: 'sea (in seashells)',
        sound: 's',
        phonetic: '/siː/',
        meaningAr: 'بحر / بحرية',
        sentenceContext: '...seashells...',
      },
      {
        id: 'w-shells',
        word: 'shells',
        sound: 'sh',
        phonetic: '/ʃɛlz/',
        meaningAr: 'أصداف / قواقع',
        sentenceContext: '...The shells she sells...',
      },
      {
        id: 'w-shore',
        word: 'shore (in seashore)',
        sound: 'sh',
        phonetic: '/ʃɔːr/',
        meaningAr: 'شاطئ / ساحل',
        sentenceContext: '...on the seashore...',
      },
      {
        id: 'w-sure',
        word: 'sure',
        sound: 'sh',
        phonetic: '/ʃʊər/',
        meaningAr: 'متأكد (تبدأ بصوت الشين /ʃ/)',
        sentenceContext: '...I am sure.',
      },
      {
        id: 'w-sites',
        word: 'sites',
        sound: 's',
        phonetic: '/saɪts/',
        meaningAr: 'مواقع (تاريخية)',
        sentenceContext: 'Historical sites...',
      },
      {
        id: 'w-scrapbook',
        word: 'scrapbook',
        sound: 's',
        phonetic: '/ˈskræp.bʊk/',
        meaningAr: 'دفتر قصاصات',
        sentenceContext: '...in my scrapbook.',
      },
    ] as SoundSortingWord[],
  },
};
