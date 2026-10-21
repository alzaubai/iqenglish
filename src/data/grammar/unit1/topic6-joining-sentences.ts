import { GrammarTopicData } from './types';

// TOPIC 6: JOINING SENTENCES (أدوات الربط)
// =========================================================================
export const topicJoiningSentences: GrammarTopicData = {
    id: 'topic-joining-sentences',
    number: 6,
    titleAr: 'أدوات الربط',
    titleEn: 'Joining Sentences: and / but / or',
    taglineAr: 'دمج الجمل وتوضيح العلاقة بين الأفكار',
    category: 'أدوات الربط',
    badge: 'سهل ومضمون',
    color: 'amber',
    summaryAr: 'نستخدم أدوات الربط (and, but, or) لجمع جملتين في جملة واحدة واضحة، حيث تعبر كل أداة عن معنى محدد (التشابه، التناقض، أو التخيير).',
    topicType: 'connectors',
    connectorsList: [
      {
        name: 'and (و)',
        meaningAr: 'تفيد العطف والجمع بين فكرتين متشابهتين أو متوافقتين',
        functionAr: 'نربط بها جملتين إيجابيتين لا يوجد بينهما تناقض.',
        examples: [
          {
            en: 'The burger was huge. It was delicious. ➔ The burger was huge and it was delicious.',
            ar: 'كانت الشطيرة ضخمة ولذيذة.',
            highlight: 'and'
          },
          {
            en: 'The dress was beautiful. It was expensive. ➔ The dress was beautiful and it was expensive.',
            ar: 'كان الفستان جميلاً وكان غالياً.',
            highlight: 'and'
          }
        ]
      },
      {
        name: 'but (لكن)',
        meaningAr: 'تفيد التناقض بين فكرتين مختلفتين',
        functionAr: 'نربط بها جملتين إحداهما إيجابية والأخرى سلبية، وغالباً ما تأتي مع نفي (not / isn\'t / didn\'t).',
        examples: [
          {
            en: 'John is poor. He isn\'t sad. ➔ John is poor but he isn\'t sad.',
            ar: 'جون فقير، لكنه ليس حزيناً. (تناقض مع وجود نفي isn\'t)',
            highlight: 'but'
          },
          {
            en: 'I saw a football match. I didn\'t like it. ➔ I saw a football match but I didn\'t like it.',
            ar: 'شاهدت مباراة كرة قدم، لكني لم أحبها. (تناقض مع نفي didn\'t)',
            highlight: 'but'
          }
        ]
      },
      {
        name: 'or (أو)',
        meaningAr: 'تفيد التخيير بين أمرين أو أكثر',
        functionAr: 'تُستخدم للاختيار بين أمرين، وعند دمج جملتين نحذف الكلمات المكررة ونضع or بين الشيئين.',
        examples: [
          {
            en: 'Do you want fish for dinner? Do you want meat for dinner? ➔ Do you want fish or meat for dinner?',
            ar: 'هل تريد سمكاً أم لحماً للعشاء؟ (حذفنا التكرار Do you want ... for dinner)',
            highlight: 'or'
          },
          {
            en: 'You can have tea or coffee.',
            ar: 'يمكنك شرب الشاي أو القهوة.',
            highlight: 'or'
          }
        ]
      }
    ],
    examPractice: [
      {
        id: 'js-q1',
        type: 'choice',
        questionEn: 'The burger was huge ______ it was delicious.',
        questionAr: 'اختر أداة الربط المناسبة لفكرتين متوافقتين ولذيذتين:',
        options: ['and', 'but', 'or', 'so'],
        correctAnswer: 'and',
        explanationAr: 'الفكرتان متوافقتان وإيجابيتان (ضخمة ولذيذة)، لذا نستخدم أداة العطف (and).'
      },
      {
        id: 'js-q2',
        type: 'choice',
        questionEn: 'John is poor ______ he isn\'t sad.',
        questionAr: 'اختر أداة الربط المناسبة (لاحظ وجود تناقض ونفي isn\'t):',
        options: ['but', 'and', 'or', 'because'],
        correctAnswer: 'but',
        explanationAr: 'يوجد تناقض بين الفقر وعدم الحزن مع وجود نفي، لذا نختار (but) وتعني لكن.'
      },
      {
        id: 'js-q3',
        type: 'choice',
        questionEn: 'Do you want fish ______ meat for dinner?',
        questionAr: 'اختر أداة الربط المناسبة للتخيير بين وجبتين:',
        options: ['or', 'but', 'and', 'yet'],
        correctAnswer: 'or',
        explanationAr: 'السؤال يخير بين السمك أو اللحم، فنستخدم أداة التخيير (or).'
      },
      {
        id: 'js-q4',
        type: 'choice',
        questionEn: 'I saw a football match ______ I didn\'t like it.',
        questionAr: 'شاهدت المباراة، ______ لم تعجبني (تناقض):',
        options: ['but', 'and', 'or', 'so'],
        correctAnswer: 'but',
        explanationAr: 'جملة إيجابية تليها جملة منفية (didn\'t like it) تدل على التناقض، فالجواب هو (but).'
      },
      {
        id: 'js-q5',
        type: 'choice',
        questionEn: 'The dress was beautiful ______ it was expensive.',
        questionAr: 'كان الفستان جميلاً ______ كان غالياً:',
        options: ['and', 'but', 'or', 'if'],
        correctAnswer: 'and',
        explanationAr: 'كلا الصفتين تصفان الفستان بدون نفي، لذا نربطهما بـ (and).'
      }
    ]
  };
