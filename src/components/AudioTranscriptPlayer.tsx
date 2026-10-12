import React, { useState, useEffect, useRef } from'react';
import {
  Volume2,
  Play,
  Pause,
  RotateCcw,
  Languages,
  Gauge,
  Sparkles
} from'lucide-react';
import { TranscriptSection, TranscriptLine } from'../types/curriculum';
import { SpeechEngine } from'../utils/speech';
import { findMatchingArabicInLine } from'../utils/wordTranslations';
import { CURRICULUM_CHUNKS, LineChunk } from'../data/curriculumChunks';
import { CharacterAvatar } from'./CharacterAvatar';

interface AudioTranscriptPlayerProps {
  transcripts: TranscriptSection[];
  lessonTitle: string;
}

interface ActiveWordHighlight {
  lineId: string;
  englishWord: string;
  arabicMatch: string | null;
}

interface CharacterProfile {
  nameAr: string;
  tag: string;
  gender:'male' |'female';
  isAlternating: boolean;
  accentBadge: string;
  activeRing: string;
  borderNormal: string;
}

const getCharacterProfile = (speaker: string, gender?:'male' |'female'): CharacterProfile => {
  const norm = speaker.trim().toLowerCase();
  switch (norm) {
    case'ahmed':
      return {
        nameAr:'أحمد',
        tag:'يسأل صديقه عن العطلة',
        gender:'male',
        isAlternating: false,
        accentBadge:'bg-blue-100 text-blue-900 border-blue-200',
        activeRing:'border-blue-400 ring-2 ring-blue-300/80 bg-blue-50/40',
        borderNormal:'border-zinc-200 hover:border-blue-200',
      };
    case'faisal':
      return {
        nameAr:'فيصل',
        tag:'قضى عطلته عند النهر',
        gender:'male',
        isAlternating: true,
        accentBadge:'bg-teal-100 text-teal-900 border-teal-200',
        activeRing:'border-teal-400 ring-2 ring-teal-300/80 bg-teal-50/40',
        borderNormal:'border-zinc-200 hover:border-teal-200',
      };
    case'khalid':
      return {
        nameAr:'خالد',
        tag:'حدثت معه حادثة طريفة في القارب',
        gender:'male',
        isAlternating: true,
        accentBadge:'bg-blue-100 text-blue-900 border-blue-200',
        activeRing:'border-blue-400 ring-2 ring-blue-300/80 bg-blue-50/40',
        borderNormal:'border-zinc-200 hover:border-blue-200',
      };
    case'mariam':
      return {
        nameAr:'مريم',
        tag:'تذكر أخاها بحادثة القارب الطريفة',
        gender:'female',
        isAlternating: false,
        accentBadge:'bg-rose-100 text-rose-900 border-rose-200',
        activeRing:'border-rose-400 ring-2 ring-rose-300/80 bg-rose-50/40',
        borderNormal:'border-zinc-200 hover:border-rose-200',
      };
    case'rasha':
      return {
        nameAr:'رشا',
        tag:'تسأل صديقاتها عن العطلة',
        gender:'female',
        isAlternating: false,
        accentBadge:'bg-purple-100 text-purple-900 border-purple-200',
        activeRing:'border-purple-400 ring-2 ring-purple-300/80 bg-purple-50/40',
        borderNormal:'border-zinc-200 hover:border-purple-200',
      };
    case'huda':
      return {
        nameAr:'هدى',
        tag:'بقيت بالمنزل وصنعت ملابس',
        gender:'female',
        isAlternating: true,
        accentBadge:'bg-pink-100 text-pink-900 border-pink-200',
        activeRing:'border-pink-400 ring-2 ring-pink-300/80 bg-pink-50/40',
        borderNormal:'border-zinc-200 hover:border-pink-200',
      };
    case'muna':
      return {
        nameAr:'منى',
        tag:'قرأت كتباً وتعلّمت الطبخ',
        gender:'female',
        isAlternating: true,
        accentBadge:'bg-amber-100 text-amber-900 border-amber-200',
        activeRing:'border-amber-400 ring-2 ring-amber-300/80 bg-amber-50/40',
        borderNormal:'border-zinc-200 hover:border-amber-200',
      };
    case'richard':
      return {
        nameAr:'ريتشارد',
        tag:'سائح بريطاني في العراق ️',
        gender:'male',
        isAlternating: false,
        accentBadge:'bg-amber-100 text-amber-900 border-amber-200',
        activeRing:'border-amber-400 ring-2 ring-amber-300/80 bg-amber-50/40',
        borderNormal:'border-zinc-200 hover:border-amber-200',
      };
    case'sara':
      return {
        nameAr:'سارة',
        tag:'تتحدث عن عطلتها وزيارة صديقتها',
        gender:'female',
        isAlternating: false,
        accentBadge:'bg-emerald-100 text-emerald-900 border-emerald-200',
        activeRing:'border-emerald-400 ring-2 ring-emerald-300/80 bg-emerald-50/40',
        borderNormal:'border-zinc-200 hover:border-emerald-200',
      };
    case'sameera':
      return {
        nameAr:'سميرة',
        tag:'صديقة سارة من أبوظبي ️',
        gender:'female',
        isAlternating: true,
        accentBadge:'bg-teal-100 text-teal-900 border-teal-200',
        activeRing:'border-teal-400 ring-2 ring-teal-300/80 bg-teal-50/40',
        borderNormal:'border-zinc-200 hover:border-teal-200',
      };
    case'maysam':
      return {
        nameAr:'ميسم',
        tag:'تجمع طوابع وصور معالم بلدان العالم  (دفتر 3)',
        gender:'female',
        isAlternating: false,
        accentBadge:'bg-amber-100 text-amber-900 border-amber-200',
        activeRing:'border-amber-400 ring-2 ring-amber-300/80 bg-amber-50/40',
        borderNormal:'border-zinc-200 hover:border-amber-200',
      };
    case'adel':
    case'adil':
      return {
        nameAr:'عادل',
        tag:'يحب تصوير الحيوانات وسفاري أفريقيا  (دفتر 6)',
        gender:'male',
        isAlternating: true,
        accentBadge:'bg-emerald-100 text-emerald-900 border-emerald-200',
        activeRing:'border-emerald-400 ring-2 ring-emerald-300/80 bg-emerald-50/40',
        borderNormal:'border-zinc-200 hover:border-emerald-200',
      };
    case'bassem':
    case'basim':
      return {
        nameAr:'باسم',
        tag:'مهتم بالطائرات ويحلم أن يصبح طياراً ️‍️ (دفتر 4)',
        gender:'male',
        isAlternating: false,
        accentBadge:'bg-sky-100 text-sky-900 border-sky-200',
        activeRing:'border-sky-400 ring-2 ring-sky-300/80 bg-sky-50/40',
        borderNormal:'border-zinc-200 hover:border-sky-200',
      };
    case'rawan':
      return {
        nameAr:'روان',
        tag:'تجمع صور النباتات والأزهار الملونة  (دفتر 1)',
        gender:'female',
        isAlternating: true,
        accentBadge:'bg-rose-100 text-rose-900 border-rose-200',
        activeRing:'border-rose-400 ring-2 ring-rose-300/80 bg-rose-50/40',
        borderNormal:'border-zinc-200 hover:border-rose-200',
      };
    case'laith':
      return {
        nameAr:'ليث',
        tag:'عاشق لكرة القدم والمباريات ️ (دفتر 5)',
        gender:'male',
        isAlternating: false,
        accentBadge:'bg-red-100 text-red-900 border-red-200',
        activeRing:'border-red-400 ring-2 ring-red-300/80 bg-red-50/40',
        borderNormal:'border-zinc-200 hover:border-red-200',
      };
    case'nader':
      return {
        nameAr:'نادر',
        tag:'يتحدث عن عاداته اليومية وظروف التكرار ⏰',
        gender:'male',
        isAlternating: false,
        accentBadge:'bg-blue-100 text-blue-900 border-blue-200',
        activeRing:'border-blue-400 ring-2 ring-blue-300/80 bg-blue-50/40',
        borderNormal:'border-zinc-200 hover:border-blue-200',
      };
    default: {
      const isFem = gender ==='female';
      return {
        nameAr: speaker,
        tag: isFem ?'طالبة' :'طالب',
        gender: isFem ?'female' :'male',
        isAlternating: false,
        accentBadge: isFem ?'bg-pink-100 text-pink-900 border-pink-200' :'bg-blue-100 text-blue-900 border-blue-200',
        activeRing: isFem
          ?'border-pink-400 ring-2 ring-pink-300/80 bg-pink-50/40'
          :'border-blue-400 ring-2 ring-blue-300/80 bg-blue-50/40',
        borderNormal:'border-zinc-200 hover:border-zinc-300',
      };
    }
  }
};

interface LineSceneIllustration {
  imageUrl: string;
  captionAr: string;
  badgeLabelAr?: string;
  badgeColor?: string;
}

const LINE_SCENE_IMAGES: Record<string, LineSceneIllustration> = {
  // Track 1 (Part 1): Ahmed & Faisal
'l1-p1-1': {
    imageUrl:'/images/dialogue/p1-line1-ahmed-ask.jpg',
    captionAr:'أحمد يسأل فيصل بعد العطلة',
    badgeLabelAr:'السفر في العطلة',
    badgeColor:'bg-blue-50 text-blue-800 border-blue-200',
  },
'l1-p1-2': {
    imageUrl:'/images/dialogue/p1-line2-faisal-village.jpg',
    captionAr:'قرية ريفية هادئة على ضفة النهر ️',
    badgeLabelAr:'قرية عند النهر',
    badgeColor:'bg-teal-50 text-teal-800 border-teal-200',
  },
'l1-p1-3': {
    imageUrl:'/images/dialogue/p1-line3-ahmed-curious.jpg',
    captionAr:'أحمد متفاجئ وفضولي لمعرفة الأنشطة',
    badgeLabelAr:'فضول وحماس',
    badgeColor:'bg-amber-50 text-amber-800 border-amber-200',
  },
'l1-p1-4': {
    imageUrl:'/images/dialogue/p1-line4-faisal-swim-fish.jpg',
    captionAr:'السباحة اليومية وصيد السمك ⭐‍️',
    badgeLabelAr:'سباحة وصيد سمك',
    badgeColor:'bg-emerald-50 text-emerald-800 border-emerald-200',
  },

  // Track 1 (Part 2): Rasha, Huda & Muna
'l1-p2-1': {
    imageUrl:'/images/dialogue/p2-line1-rasha-ask.jpg',
    captionAr:'رشا تسأل صديقتيها عن السفر بالعطلة ️️',
    badgeLabelAr:'سؤال العطلة',
    badgeColor:'bg-purple-50 text-purple-800 border-purple-200',
  },
'l1-p2-2': {
    imageUrl:'/images/dialogue/p2-line2-huda-home.jpg',
    captionAr:'هدى ومنى بقيتا في المنزل ️',
    badgeLabelAr:'البقاء في المنزل',
    badgeColor:'bg-amber-50 text-amber-800 border-amber-200',
  },
'l1-p2-3': {
    imageUrl:'/images/dialogue/p2-line3-rasha-curious.jpg',
    captionAr:'رشا مستغربة وتتساءل عن قضاء الوقت ⏰',
    badgeLabelAr:'دهشة واستفسار',
    badgeColor:'bg-rose-50 text-rose-800 border-rose-200',
  },
'l1-p2-4': {
    imageUrl:'/images/dialogue/p2-line4-huda-clothes-friends.jpg',
    captionAr:'لقاء الصديقات وتفصيل فستان جميل ️',
    badgeLabelAr:'خياطة وصديقات',
    badgeColor:'bg-pink-50 text-pink-800 border-pink-200',
  },
'l1-p2-5': {
    imageUrl:'/images/dialogue/p2-line5-rasha-muna.jpg',
    captionAr:'رشا تلتفت لمنى وتسألها عن نشاطاتها',
    badgeLabelAr:'سؤال موجه لمنى',
    badgeColor:'bg-indigo-50 text-indigo-800 border-indigo-200',
  },
'l1-p2-6': {
    imageUrl:'/images/dialogue/p2-line6-muna-routine.jpg',
    captionAr:'استيقاظ متأخر، قراءة كتب، وتعلّم الطبخ',
    badgeLabelAr:'نوم، كتب، وطبخ',
    badgeColor:'bg-orange-50 text-orange-800 border-orange-200',
  },

  // Lesson 2 - Track 2: Richard's Journey in Iraq
'l2-r-1': {
    imageUrl:'/images/dialogue/l2-r-1.jpg',
    captionAr:'ريتشارد مع عائلته يتصفحون دفتر قصاصات صور رحلة العراق',
    badgeLabelAr:'سجل القصاصات (Scrapbook)',
    badgeColor:'bg-amber-50 text-amber-800 border-amber-200',
  },
'l2-r-2': {
    imageUrl:'/images/dialogue/l2-r-2.jpg',
    captionAr:'الوصول إلى بغداد ليلاً والنوم مباشرة في الفندق',
    badgeLabelAr:'فندق بغداد ليلاً',
    badgeColor:'bg-indigo-50 text-indigo-800 border-indigo-200',
  },
'l2-r-3': {
    imageUrl:'/images/dialogue/l2-r-3.jpg',
    captionAr:'مباراة كرة قدم حماسية في ملعب الشعب واللاعبون رائعون ️',
    badgeLabelAr:'ملعب الشعب (fantastic)',
    badgeColor:'bg-emerald-50 text-emerald-800 border-emerald-200',
  },
'l2-r-4': {
    imageUrl:'/images/dialogue/l2-r-4.jpg',
    captionAr:'السفر بالحافلة عبر الطريق الصحراوي إلى مدينة أور التاريخية ️',
    badgeLabelAr:'حافلة إلى أور (coach)',
    badgeColor:'bg-yellow-50 text-yellow-800 border-yellow-200',
  },
'l2-r-5': {
    imageUrl:'/images/dialogue/l2-r-5.jpg',
    captionAr:'ريتشارد مبهور بعظمة الزقورة الأثرية الشامخة بارتفاع 21 متراً ️',
    badgeLabelAr:'الزقورة (huge & ancient)',
    badgeColor:'bg-orange-50 text-orange-800 border-orange-200',
  },
'l2-r-6': {
    imageUrl:'/images/dialogue/l2-r-6.jpg',
    captionAr:'رحلة الزورق المشحوف المثيرة بين قصب الأهوار وطيور النحام',
    badgeLabelAr:'الأهوار (exciting)',
    badgeColor:'bg-teal-50 text-teal-800 border-teal-200',
  },
'l2-r-7': {
    imageUrl:'/images/dialogue/l2-r-7.jpg',
    captionAr:'ريتشارد يشعر بالملل من التسوق في أسواق أربيل الشعبية ️',
    badgeLabelAr:'أسواق أربيل (boring)',
    badgeColor:'bg-zinc-100 text-zinc-800 border-zinc-200',
  },
'l2-r-8': {
    imageUrl:'/images/dialogue/l2-r-8.jpg',
    captionAr:'قلعة أربيل المهيبة ذات الحجارة الصفراء الساطعة والإطلالة الساحرة ️',
    badgeLabelAr:'قلعة أربيل (amazing)',
    badgeColor:'bg-amber-50 text-amber-800 border-amber-200',
  },
'l2-r-9': {
    imageUrl:'/images/dialogue/l2-r-9.jpg',
    captionAr:'معابد مدينة الحضر القديمة العريقة في قلب الصحراء ️️',
    badgeLabelAr:'آثار الحضر (interesting)',
    badgeColor:'bg-stone-100 text-stone-800 border-stone-200',
  },

  // Lesson 2 - Track 3: Sara and Sameera
'l2-s-1': {
    imageUrl:'/images/dialogue/l2-s-1.jpg',
    captionAr:'سارة تستقبل صديقتها سميرة بحفاوة عند وصولها من أبوظبي',
    badgeLabelAr:'وصول سميرة من أبوظبي',
    badgeColor:'bg-pink-50 text-pink-800 border-pink-200',
  },
'l2-s-2': {
    imageUrl:'/images/dialogue/l2-s-2.jpg',
    captionAr:'جلسة عائلية دافئة وتناول أشهى المأكولات والحلويات في العطلة',
    badgeLabelAr:'أوقات ممتعة وطعام لذيذ',
    badgeColor:'bg-rose-50 text-rose-800 border-rose-200',
  },
'l2-s-3': {
    imageUrl:'/images/dialogue/l2-s-3.jpg',
    captionAr:'سارة وسميرة تزوران المتحف الوطني العراقي وتستمتعان بمشاهدة التماثيل ️',
    badgeLabelAr:'المتحف الوطني (interesting)',
    badgeColor:'bg-amber-50 text-amber-800 border-amber-200',
  },
'l2-s-4': {
    imageUrl:'/images/dialogue/l2-s-4.jpg',
    captionAr:'نزهة مسائية جميلة على ضفة النهر وقت الغروب برفقة الوالدين ‍️‍️',
    badgeLabelAr:'نزهة الغروب على النهر',
    badgeColor:'bg-sky-50 text-sky-800 border-sky-200',
  },

  // Lesson 3 - Track 4: Mariam and Khalid's Boat Accident Story
'l3-1': {
    imageUrl:'/images/dialogue/l3-1.jpg',
    captionAr:'مريم تُري خالداً صورة القارب وقت الغروب على الأريكة ️',
    badgeLabelAr:'صورة الذكرى الجميلة',
    badgeColor:'bg-amber-50 text-amber-800 border-amber-200',
  },
'l3-2': {
    imageUrl:'/images/dialogue/khalid-hmm.jpg',
    captionAr:'خالد محرج ومحمر الوجه: همم، لا أريد التحدث عن ذلك!',
    badgeLabelAr:'تهرب من الذكرى (Hmm)',
    badgeColor:'bg-rose-50 text-rose-800 border-rose-200',
  },
'l3-3a': {
    imageUrl:'/images/dialogue/l3-3.jpg',
    captionAr:'مريم تذكره: كنا نبحر ونشاهد طيور الفلامنجو بالدربيل وبجع يحمل سمكة',
    badgeLabelAr:'مشاهدة الطيور (flamingos)',
    badgeColor:'bg-emerald-50 text-emerald-800 border-emerald-200',
  },
'l3-3b': {
    imageUrl:'/images/dialogue/l3-4.jpg',
    captionAr:'السمكة تصطدم مباشرة برأس خالد مع نجوم الصدمة والذهول!',
    badgeLabelAr:'اصطدام السمكة بالرأس',
    badgeColor:'bg-rose-50 text-rose-800 border-rose-200',
  },
'l3-4': {
    imageUrl:'/images/dialogue/khalid-hmm.jpg',
    captionAr:'خالد يتذكر اصطدام السمكة برأسه وهو محرج وغاضب: همم...',
    badgeLabelAr:'صدمة وإحراج (Hmm)',
    badgeColor:'bg-amber-50 text-amber-800 border-amber-200',
  },
'l3-5': {
    imageUrl:'/images/dialogue/l3-5.jpg',
    captionAr:'مريم تبتسم بحماس وتشير بإصبعها: أتتذكر ماذا حدث بعد ذلك؟',
    badgeLabelAr:'ماذا حدث بعد ذلك؟',
    badgeColor:'bg-purple-50 text-purple-800 border-purple-200',
  },
'l3-6': {
    imageUrl:'/images/dialogue/khalid-hmm.jpg',
    captionAr:'خالد متوتر ومحرج من تذكر اللحظة التالية: همم...',
    badgeLabelAr:'توتر وإحراج (Hmm)',
    badgeColor:'bg-zinc-100 text-zinc-800 border-zinc-200',
  },
'l3-7': {
    imageUrl:'/images/dialogue/l3-7.jpg',
    captionAr:'خالد يقفز فزعاً ويسقط من القارب إلى ماء النهر مع طرطشة ماء كبيرة',
    badgeLabelAr:'السقوط في الماء',
    badgeColor:'bg-sky-50 text-sky-800 border-sky-200',
  },
'l3-8': {
    imageUrl:'/images/dialogue/khalid-hmm.jpg',
    captionAr:'خالد محمر الوجه من شدة الإحراج بعد السقوط بالماء: همم...',
    badgeLabelAr:'إحراج السقوط (Hmm)',
    badgeColor:'bg-teal-50 text-teal-800 border-teal-200',
  },
'l3-9a': {
    imageUrl:'/images/dialogue/l3-9.jpg',
    captionAr:'العائلة تسحب خالد وتلف المنشفة حوله لتدفئته على الشاطئ ️‍️',
    badgeLabelAr:'الإنقاذ بالمنشفة',
    badgeColor:'bg-indigo-50 text-indigo-800 border-indigo-200',
  },
'l3-9b': {
    imageUrl:'/images/dialogue/l3-10.jpg',
    captionAr:'خالد يرتجف من البرد داخل السيارة ملفوفاً بالبطانية',
    badgeLabelAr:'رجفة البرد بالسيارة',
    badgeColor:'bg-blue-50 text-blue-800 border-blue-200',
  },
'l3-10': {
    imageUrl:'/images/dialogue/khalid-hmm.jpg',
    captionAr:'خالد يرتجف ومتضجر وخجلان من الرجوع للفندق: همم...',
    badgeLabelAr:'رجفة وإحراج (Hmm)',
    badgeColor:'bg-blue-50 text-blue-800 border-blue-200',
  },
'l3-11': {
    imageUrl:'/images/dialogue/l3-11.jpg',
    captionAr:'خالد خجلان في غرفته يرفض العشاء بينما العائلة تأكل في المطعم ️️',
    badgeLabelAr:'محرج جداً في الغرفة',
    badgeColor:'bg-orange-50 text-orange-800 border-orange-200',
  },
'l3-12': {
    imageUrl:'/images/dialogue/l3-12.jpg',
    captionAr:'خالد يبتسم بمكر ويشير بإصبعه ممسكاً كرة القدم: هل تتذكرين اليوم التالي؟',
    badgeLabelAr:'رد خالد بالكرة',
    badgeColor:'bg-emerald-50 text-emerald-800 border-emerald-200',
  },
'l3-13': {
    imageUrl:'/images/dialogue/l3-13.jpg',
    captionAr:'مريم تلوح بيديها وتتعرق محاولة الإنكار: لا، لا أتذكر! ‍️',
    badgeLabelAr:'إنكار مريم المرتبك',
    badgeColor:'bg-pink-50 text-pink-800 border-pink-200',
  },
'l3-14': {
    imageUrl:'/images/dialogue/l3-14.jpg',
    captionAr:'مريم تسقط وتجلس في الوحل بالملعب وخالد يشير إليها ويضحك ️',
    badgeLabelAr:'السقوط في الطين والوحل',
    badgeColor:'bg-amber-50 text-amber-800 border-amber-200',
  },
'l3-15': {
    imageUrl:'/images/dialogue/l3-15.jpg',
    captionAr:'مريم على الأريكة عاقدة ذراعيها متضجرة وتنكر: أنا لا أتذكر! ️',
    badgeLabelAr:'إنكار مريم النهائي',
    badgeColor:'bg-rose-50 text-rose-800 border-rose-200',
  },

  // Lesson 4 - Track 5 & 6: Whose scrapbooks are these?
'l4-1': {
    imageUrl:'/images/dialogue/l4-1.jpg',
    captionAr:'ميسم تجمع طوابع وصور معالم بلدان العالم في دفترها (دفتر 3)',
    badgeLabelAr:'ميسم • طوابع وبلدان (Scrapbook 3)',
    badgeColor:'bg-amber-50 text-amber-800 border-amber-200',
  },
'l4-2': {
    imageUrl:'/images/dialogue/l4-2.jpg',
    captionAr:'عادل بقبعة وسفاري يحلم بزيارة أفريقيا وتصوير الحيوانات (دفتر 6)',
    badgeLabelAr:'عادل • حيوانات وأفريقيا (Scrapbook 6)',
    badgeColor:'bg-emerald-50 text-emerald-800 border-emerald-200',
  },
'l4-3': {
    imageUrl:'/images/dialogue/l4-3.jpg',
    captionAr:'باسم بسترة الطيران يحمل مجسم طائرة ويحلم بأن يصبح طياراً (دفتر 4) ️‍️',
    badgeLabelAr:'باسم • طائرات وطيران (Scrapbook 4)',
    badgeColor:'bg-sky-50 text-sky-800 border-sky-200',
  },
'l4-4': {
    imageUrl:'/images/dialogue/l4-4.jpg',
    captionAr:'روان تجمع صور النباتات والزهور الملونة من حول العالم (دفتر 1)',
    badgeLabelAr:'روان • نباتات وأزهار (Scrapbook 1)',
    badgeColor:'bg-rose-50 text-rose-800 border-rose-200',
  },
'l4-5': {
    imageUrl:'/images/dialogue/l4-5.jpg',
    captionAr:'منى بكاميرتها وطائر على كتفها توثق صور الطيور وأسماءها (دفتر 2)',
    badgeLabelAr:'منى • مراقبة وتصوير الطيور (Scrapbook 2)',
    badgeColor:'bg-purple-50 text-purple-800 border-purple-200',
  },
'l4-6': {
    imageUrl:'/images/dialogue/l4-6.jpg',
    captionAr:'ليث بقميص كرة القدم يتابع المباريات بحماس ودفتره للكرة (دفتر 5) ️',
    badgeLabelAr:'ليث • كرة قدم ومباريات (Scrapbook 5)',
    badgeColor:'bg-red-50 text-red-800 border-red-200',
  },

  // Lesson 5 - Track 7 & 8: How often? (Nader's routine)
'l5-1': {
    imageUrl:'/images/dialogue/l5-1.jpg',
    captionAr:'الأب يستريح ويأخذ قيلولة ونادر يحل واجباته بهمة على الطاولة ️',
    badgeLabelAr:'قيلولة الأب وواجب نادر (always / usually)',
    badgeColor:'bg-amber-50 text-amber-800 border-amber-200',
  },
'l5-2': {
    imageUrl:'/images/dialogue/l5-2.jpg',
    captionAr:'نادر يشاهد التلفاز بالريموت بمتعة لمدة ساعة بعد الظهر ️',
    badgeLabelAr:'مشاهدة التلفاز (often)',
    badgeColor:'bg-sky-50 text-sky-800 border-sky-200',
  },
'l5-3': {
    imageUrl:'/images/dialogue/l5-3.jpg',
    captionAr:'نادر وأخوه يلعبان الشطرنج معاً على السجادة بحماس ️',
    badgeLabelAr:'لعبة مع الأخ (sometimes)',
    badgeColor:'bg-emerald-50 text-emerald-800 border-emerald-200',
  },
'l5-4a': {
    imageUrl:'/images/dialogue/l5-4a.jpg',
    captionAr:'العائلة تستمتع بنزهة خضراء ممتعة في الحديقة العامة يوم الجمعة',
    badgeLabelAr:'نزهة الحديقة يوم الجمعة (usually)',
    badgeColor:'bg-teal-50 text-teal-800 border-teal-200',
  },
'l5-4b': {
    imageUrl:'/images/dialogue/l5-4b.jpg',
    captionAr:'نادر وعائلته يزورون بيت الجد والجدة في لقاء عائلي دافئ ومبهج',
    badgeLabelAr:'زيارة الجد والجدة (always)',
    badgeColor:'bg-purple-50 text-purple-800 border-purple-200',
  },
};

export const AudioTranscriptPlayer: React.FC<AudioTranscriptPlayerProps> = ({
  transcripts,
}) => {
  const [activeTrackIndex, setActiveTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentLineId, setCurrentLineId] = useState<string | null>(null);
  const [activeWordInfo, setActiveWordInfo] = useState<ActiveWordHighlight | null>(null);
  const [showArabicTranslation, setShowArabicTranslation] = useState<boolean>(true);
  const [speechRate, setSpeechRate] = useState<number>(1.0); // Default natural normal pace (1.0x)

  const activeTrack = transcripts[activeTrackIndex] || transcripts[0];
  const queueIndexRef = useRef<number>(0);
  const isPlayingRef = useRef<boolean>(false);
  const speechRateRef = useRef<number>(speechRate);
  const currentAudioRef = useRef<HTMLAudioElement | null>(null);

  // Sync speech rate
  useEffect(() => {
    speechRateRef.current = speechRate;
    if (currentAudioRef.current) {
      currentAudioRef.current.playbackRate = speechRate;
    }
  }, [speechRate]);

  // Clean up on unmount
  useEffect(() => {
    return () => {
      stopPlayback();
    };
  }, []);

  // Stop playback when switching track or lesson
  useEffect(() => {
    stopPlayback();
    queueIndexRef.current = 0;
    setCurrentLineId(null);
    setActiveWordInfo(null);
  }, [activeTrackIndex, activeTrack?.id]);

  // Auto-scroll active line box into view smoothly
  useEffect(() => {
    if (currentLineId) {
      const el = document.getElementById(`line-box-${currentLineId}`);
      if (el) {
        el.scrollIntoView({ behavior:'smooth', block:'nearest' });
      }
    }
  }, [currentLineId]);

  const stopPlayback = () => {
    isPlayingRef.current = false;
    setIsPlaying(false);
    setCurrentLineId(null);
    setActiveWordInfo(null);
    SpeechEngine.stop();
    if (currentAudioRef.current) {
      currentAudioRef.current.pause();
      currentAudioRef.current.currentTime = 0;
      currentAudioRef.current = null;
    }
  };

  /**
   * Play lines sequentially with exact millisecond synchronization:
   * Line box highlights in Blue (male) or Pink (female) exactly while that person speaks.
   */
  const playQueueLine = (index: number) => {
    if (!isPlayingRef.current) return;
    const lines = activeTrack.lines;

    if (index >= lines.length) {
      stopPlayback();
      return;
    }

    queueIndexRef.current = index;
    const line = lines[index];
    setCurrentLineId(line.id);

    // If pre-recorded studio audio file exists for this individual line
    if (line.audioFileUrl) {
      if (currentAudioRef.current) {
        currentAudioRef.current.pause();
        currentAudioRef.current = null;
      }
      const audio = new Audio(line.audioFileUrl);
      audio.preload ='auto';
      audio.playbackRate = speechRateRef.current;
      currentAudioRef.current = audio;

      audio.onended = () => {
        if (!isPlayingRef.current) return;
        setTimeout(() => {
          playQueueLine(index + 1);
        }, 280);
      };

      audio.onerror = () => {
        // Fallback to speech engine if network error
        SpeechEngine.speakText(line.textEn, {
          speaker: line.speaker,
          gender: line.gender,
          rate: speechRateRef.current,
          onEnd: () => {
            if (!isPlayingRef.current) return;
            setTimeout(() => playQueueLine(index + 1), 280);
          },
        });
      };

      audio.play().catch(() => {
        SpeechEngine.speakText(line.textEn, {
          speaker: line.speaker,
          gender: line.gender,
          rate: speechRateRef.current,
          onEnd: () => {
            if (!isPlayingRef.current) return;
            setTimeout(() => playQueueLine(index + 1), 280);
          },
        });
      });
      return;
    }

    // Fallback if no studio file for line
    SpeechEngine.speakText(line.textEn, {
      speaker: line.speaker,
      gender: line.gender,
      rate: speechRateRef.current,
      onEnd: () => {
        if (!isPlayingRef.current) return;
        setTimeout(() => playQueueLine(index + 1), 280);
      },
      onError: () => stopPlayback(),
    });
  };

  const playEntireTrack = () => {
    if (!activeTrack || activeTrack.lines.length === 0) return;

    if (isPlaying) {
      stopPlayback();
      return;
    }

    isPlayingRef.current = true;
    setIsPlaying(true);
    queueIndexRef.current = 0;
    playQueueLine(0);
  };

  const playSingleLine = (line: TranscriptLine) => {
    stopPlayback();
    setCurrentLineId(line.id);

    if (line.audioFileUrl) {
      const lineAudio = new Audio(line.audioFileUrl);
      lineAudio.preload ='auto';
      lineAudio.playbackRate = speechRateRef.current;
      currentAudioRef.current = lineAudio;

      lineAudio.onended = () => {
        setCurrentLineId(null);
        currentAudioRef.current = null;
      };

      lineAudio.onerror = () => {
        setCurrentLineId(null);
        currentAudioRef.current = null;
        SpeechEngine.speakText(line.textEn, {
          speaker: line.speaker,
          gender: line.gender,
          rate: speechRateRef.current,
          onEnd: () => setCurrentLineId(null),
        });
      };

      lineAudio.play().catch(() => {
        setCurrentLineId(null);
        currentAudioRef.current = null;
        SpeechEngine.speakText(line.textEn, {
          speaker: line.speaker,
          gender: line.gender,
          rate: speechRateRef.current,
          onEnd: () => setCurrentLineId(null),
        });
      });
      return;
    }

    SpeechEngine.speakText(line.textEn, {
      speaker: line.speaker,
      gender: line.gender,
      rate: speechRateRef.current,
      onEnd: () => {
        setCurrentLineId(null);
      },
    });
  };

  /**
   * Word click handler:
   * 1. Pronounces English word with character voice & pitch.
   * 2. Highlights English word.
   * 3. Finds and simultaneously highlights the matching Arabic translation in the line!
   */
  const handleWordClick = (
    word: string,
    line: TranscriptLine,
    wIdx: number,
    e: React.MouseEvent
  ) => {
    e.stopPropagation();
    const cleanW = word.replace(/[^\w'-]/g,'');
    if (!cleanW) return;

    // Pause any continuous line audio so word is heard clearly
    if (currentAudioRef.current) {
      currentAudioRef.current.pause();
      currentAudioRef.current = null;
    }
    SpeechEngine.stop();

    // Match Arabic translation using line ID, sentence context, and word index
    const arabicMatch = findMatchingArabicInLine(
      cleanW,
      line.textAr,
      line.id,
      line.textEn,
      wIdx
    );

    setActiveWordInfo({
      lineId: line.id,
      englishWord: cleanW,
      arabicMatch,
    });

    const isFemale =
      line.gender ==='female' || SpeechEngine.getSpeakerGender(line.speaker) ==='female';

    // Speak word clearly
    SpeechEngine.speakWord(cleanW, {
      speaker: line.speaker,
      gender: isFemale ?'female' :'male',
      rate: Math.min(speechRateRef.current, 0.82),
      onEnd: () => {
        // Keep highlight active for 1.8 seconds so student can read both English and Arabic
        setTimeout(() => {
          setActiveWordInfo((prev) =>
            prev?.englishWord.toLowerCase() === cleanW.toLowerCase() && prev?.lineId === line.id
              ? null
              : prev
          );
        }, 1800);
      },
      onError: () => {
        setTimeout(() => setActiveWordInfo(null), 1800);
      },
    });
  };

  /**
   * Phrasal Chunk click handler:
   * 1. Pronounces the full natural phrase (e.g. "by the river", "I went", "in the holidays").
   * 2. Highlights the English phrase chunk.
   * 3. Simultaneously highlights the exact matching Arabic equivalent phrase in the line!
   */
  const handleChunkClick = (
    chunk: LineChunk,
    line: TranscriptLine,
    e: React.MouseEvent
  ) => {
    e.stopPropagation();
    if (!chunk.en) return;

    // Pause any continuous line audio so chunk is heard clearly
    if (currentAudioRef.current) {
      currentAudioRef.current.pause();
      currentAudioRef.current = null;
    }
    SpeechEngine.stop();

    setActiveWordInfo({
      lineId: line.id,
      englishWord: chunk.en,
      arabicMatch: chunk.ar,
    });

    const isFemale =
      line.gender ==='female' || SpeechEngine.getSpeakerGender(line.speaker) ==='female';

    const cleanPhraseToSpeak = chunk.en.replace(/[.,!؟،?]/g,'').trim();

    // Speak phrase clearly
    SpeechEngine.speakText(cleanPhraseToSpeak, {
      speaker: line.speaker,
      gender: isFemale ?'female' :'male',
      rate: Math.min(speechRateRef.current, 0.85),
      onEnd: () => {
        setTimeout(() => {
          setActiveWordInfo((prev) =>
            prev?.englishWord === chunk.en && prev?.lineId === line.id ? null : prev
          );
        }, 2200);
      },
      onError: () => {
        setTimeout(() => setActiveWordInfo(null), 2200);
      },
    });
  };

  /**
   * Renders the Arabic sentence with the matched translated phrase highlighted
   */
  const renderArabicLineWithHighlight = (
    textAr: string,
    arabicMatch: string | null,
    isFemale: boolean
  ) => {
    if (!arabicMatch) return <span>{textAr}</span>;

    // Check if target is directly in textAr, or stripped of punctuation
    let target = arabicMatch.trim();
    if (!textAr.includes(target)) {
      target = target.replace(/[.,!؟،]/g,'').trim();
    }
    if (!target || !textAr.includes(target)) {
      return <span>{textAr}</span>;
    }

    const parts = textAr.split(target);
    return (
      <span className="leading-relaxed">
        {parts.map((part, pIdx) => (
          <React.Fragment key={pIdx}>
            {part}
            {pIdx < parts.length - 1 && (
              <mark
                className={`inline-flex items-center px-2 py-0.5 mx-1 rounded-lg font-bold text-sm sm:text-base transition-all duration-300 transform scale-105 shadow-sm ring-2 ${
                  isFemale
                    ?'bg-pink-300 text-pink-950 ring-pink-500 border border-pink-400'
                    :'bg-blue-300 text-blue-950 ring-blue-500 border border-blue-400'
                }`}
              >
                {target}
              </mark>
            )}
          </React.Fragment>
        ))}
      </span>
    );
  };

  return (
    <div className="bg-white rounded-2xl border border-zinc-200 shadow-sm overflow-hidden mb-6 max-w-full" dir="rtl">
      {/* Track Selector & Master Header */}
      <div className="bg-zinc-50 border-b border-zinc-200 p-3.5 sm:p-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className="inline-flex items-center gap-1 bg-emerald-100 text-emerald-800 text-[10px] sm:text-[11px] font-bold px-2 py-0.5 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                مزامنة صوتية ذكية (أزرق للأولاد • وردي للبنات)
              </span>
            </div>
            <h3 className="text-base sm:text-lg font-bold text-zinc-900 font-arabic">
              {activeTrack.titleAr}
            </h3>
            <p className="text-xs text-zinc-500 font-sans mt-0.5" dir="ltr">
              {activeTrack.titleEn}
            </p>
          </div>

          {/* Track selector tabs if multiple tracks in lesson */}
          {transcripts.length > 1 && (
            <div className="flex flex-wrap items-center gap-1.5 p-1 bg-zinc-200/80 rounded-xl self-start sm:self-center max-w-full">
              {transcripts.map((t, idx) => (
                <button
                  key={t.id}
                  onClick={() => setActiveTrackIndex(idx)}
                  className={`px-2.5 sm:px-3 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                    activeTrackIndex === idx
                      ?'bg-white text-zinc-900 shadow-xs'
                      :'text-zinc-600 hover:text-zinc-900'
                  }`}
                >
                  {t.titleAr.includes('الأول')
                    ?'الجزء 1 (أحمد وفيصل)'
                    : t.titleAr.includes('الثاني')
                    ?'الجزء 2 (رشا وهدى ومنى)'
                    : t.titleAr.includes('9')
                    ?'المحادثة (عادل وباسم)'
                    : t.titleAr.includes('10')
                    ?'تمرين النطق'
                    : t.titleAr}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Master Controls: Play, Speed, Translation */}
        <div className="mt-3 sm:mt-4 pt-3 border-t border-zinc-200 flex flex-wrap items-center justify-between gap-2.5">
          <div className="flex flex-wrap items-center gap-2">
            {/* Play Button */}
            <button
              onClick={playEntireTrack}
              className={`flex items-center gap-1.5 sm:gap-2 px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all shadow-sm cursor-pointer ${
                isPlaying
                  ?'bg-zinc-800 text-white ring-2 ring-zinc-400'
                  :'bg-zinc-900 text-white hover:bg-zinc-800'
              }`}
            >
              {isPlaying ? (
                <>
                  <Pause className="w-4 h-4 fill-current shrink-0" />
                  <span>إيقاف مؤقت</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 fill-current shrink-0" />
                  <span className="hidden sm:inline">تشغيل التسجيل كاملاً بالتتابع</span>
                  <span className="sm:hidden">تشغيل التسجيل كاملاً</span>
                </>
              )}
            </button>

            {isPlaying && (
              <button
                onClick={stopPlayback}
                title="إعادة من البداية"
                className="p-2 sm:p-2.5 rounded-xl border border-zinc-300 bg-white text-zinc-700 hover:bg-zinc-100 cursor-pointer"
              >
                <RotateCcw className="w-3.5 sm:w-4 h-3.5 sm:h-4" />
              </button>
            )}

            {/* Speed Selector */}
            <div className="flex items-center gap-0.5 sm:gap-1 bg-white border border-zinc-300 rounded-xl p-0.5 sm:p-1 shadow-2xs">
              <span className="text-[10px] sm:text-[11px] font-bold text-zinc-500 px-1 sm:px-1.5 flex items-center gap-1 font-arabic">
                <Gauge className="w-3 sm:w-3.5 h-3 sm:h-3.5" />
                <span className="hidden sm:inline">السرعة:</span>
              </span>
              <button
                onClick={() => setSpeechRate(0.7)}
                className={`px-2 sm:px-2.5 py-1 text-[11px] sm:text-xs font-bold rounded-lg transition-all cursor-pointer ${
                  speechRate === 0.7
                    ?'bg-zinc-900 text-white'
                    :'text-zinc-600 hover:bg-zinc-100'
                }`}
              >
                <span className="sm:hidden">0.7x</span>
                <span className="hidden sm:inline">0.7x بطيء</span>
              </button>
              <button
                onClick={() => setSpeechRate(0.85)}
                className={`px-2 sm:px-2.5 py-1 text-[11px] sm:text-xs font-bold rounded-lg transition-all cursor-pointer ${
                  speechRate === 0.85
                    ?'bg-zinc-900 text-white'
                    :'text-zinc-600 hover:bg-zinc-100'
                }`}
              >
                <span className="sm:hidden">0.85x</span>
                <span className="hidden sm:inline">0.85x متزن</span>
              </button>
              <button
                onClick={() => setSpeechRate(1.0)}
                className={`px-2 sm:px-2.5 py-1 text-[11px] sm:text-xs font-bold rounded-lg transition-all cursor-pointer ${
                  speechRate === 1.0
                    ?'bg-zinc-900 text-white'
                    :'text-zinc-600 hover:bg-zinc-100'
                }`}
              >
                <span className="sm:hidden">1.0x</span>
                <span className="hidden sm:inline">1.0x عادي</span>
              </button>
            </div>
          </div>

          {/* Toggle Translation */}
          <button
            onClick={() => setShowArabicTranslation(!showArabicTranslation)}
            className={`flex items-center gap-1.5 px-3 sm:px-3.5 py-2 rounded-xl text-xs font-bold border transition-colors cursor-pointer ${
              showArabicTranslation
                ?'bg-white border-zinc-300 text-zinc-900 shadow-2xs'
                :'bg-zinc-200 border-zinc-300 text-zinc-600'
            }`}
          >
            <Languages className="w-3.5 h-3.5 shrink-0" />
            <span>{showArabicTranslation ?'إخفاء الترجمة' :'إظهار الترجمة'}</span>
          </button>
        </div>
      </div>

      {/* Transcript Lines List (Comic Chat Experience) */}
      <div className="p-3 sm:p-6 space-y-4 sm:space-y-5 max-h-[680px] overflow-y-auto bg-zinc-50/50">
        {activeTrack.lines.map((line) => {
          const isLineActive = currentLineId === line.id;
          const profile = getCharacterProfile(line.speaker, line.gender);
          const scene = LINE_SCENE_IMAGES[line.id];

          return (
            <div
              key={line.id}
              id={`line-box-${line.id}`}
              className={`flex items-start gap-2 sm:gap-4 transition-all duration-300 w-full min-w-0 ${
                profile.isAlternating ?'sm:mr-6' :'sm:ml-2'
              }`}
            >
              {/* Character Avatar Column */}
              <div className="shrink-0 flex flex-col items-center pt-1 select-none">
                <CharacterAvatar
                  name={line.speaker}
                  gender={profile.gender}
                  size="md"
                  isActive={isLineActive}
                />
                <span className="text-[10px] sm:text-[11px] font-bold text-zinc-700 font-arabic mt-1 sm:mt-1.5 px-1.5 sm:px-2 py-0.5 rounded-lg bg-white border border-zinc-200 shadow-2xs">
                  {profile.nameAr}
                </span>
              </div>

              {/* Comic Speech Bubble */}
              <div
                className={`flex-1 min-w-0 p-3 sm:p-5 rounded-2xl sm:rounded-3xl border-2 transition-all duration-300 relative shadow-2xs ${
                  isLineActive
                    ? `${profile.activeRing} shadow-md scale-[1.01] ring-2`
                    : `bg-white ${profile.borderNormal} hover:shadow-xs`
                }`}
              >
                {/* Header Row: Speaker Badge, Scene Tag, and Play Button */}
                <div className="flex flex-wrap items-center justify-between gap-1.5 sm:gap-2 mb-2.5 sm:mb-3">
                  <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                    <span
                      className={`font-bold text-[11px] sm:text-xs uppercase px-2.5 sm:px-3 py-1 rounded-xl border flex items-center gap-1 sm:gap-1.5 font-sans shadow-2xs ${profile.accentBadge}`}
                    >
                      <span>{line.speaker}</span>
                      <span className="text-[10px] sm:text-[11px] font-arabic opacity-85">
                        ({profile.nameAr})
                      </span>
                    </span>

                    {/* Scene / Activity Badge */}
                    {scene?.badgeLabelAr && (
                      <span
                        className={`inline-flex items-center gap-1 px-2 sm:px-2.5 py-0.5 rounded-lg text-[11px] sm:text-xs font-bold border font-arabic shadow-2xs ${
                          scene.badgeColor ||'bg-zinc-100 text-zinc-700 border-zinc-200'
                        }`}
                      >
                        <span>{scene.badgeLabelAr}</span>
                      </span>
                    )}

                    {isLineActive && (
                      <span className="inline-flex items-center gap-1 sm:gap-1.5 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-lg text-[11px] sm:text-xs font-bold font-arabic bg-emerald-100 text-emerald-900 border border-emerald-200 animate-pulse">
                        <Volume2 className="w-3 sm:w-3.5 h-3 sm:h-3.5" />
                        <span>يتحدث الآن...</span>
                      </span>
                    )}
                  </div>

                  <button
                    onClick={() => playSingleLine(line)}
                    className={`flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1 sm:py-1.5 text-xs font-bold rounded-xl transition-all cursor-pointer font-arabic shrink-0 ${
                      isLineActive
                        ?'bg-zinc-900 text-white shadow-xs'
                        :'bg-zinc-100 hover:bg-zinc-200 text-zinc-800'
                    }`}
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                    <span>استماع</span>
                  </button>
                </div>

                {/* Main Content: Side-by-side text and dedicated scene illustration */}
                <div className="flex flex-col md:flex-row items-stretch gap-3 sm:gap-4 min-w-0">
                  {/* Text Column (English + Arabic) */}
                  <div className="flex-1 min-w-0 flex flex-col justify-between space-y-2.5 sm:space-y-3">
                    {/* English line (LTR) with Interactive Phrasal Unit Highlighting */}
                    <div
                      className="flex flex-wrap items-center gap-1 sm:gap-1.5 py-1 text-left font-sans min-w-0 max-w-full"
                      dir="ltr"
                    >
                      {CURRICULUM_CHUNKS[line.id] ? (
                        CURRICULUM_CHUNKS[line.id].map((chunk, cIdx) => {
                          const isChunkActive =
                            activeWordInfo?.lineId === line.id &&
                            activeWordInfo?.englishWord === chunk.en;

                          return (
                            <button
                              key={cIdx}
                              type="button"
                              onClick={(e) => handleChunkClick(chunk, line, e)}
                              title={`انقر لنطق "${chunk.en}" • ترجمتها: "${chunk.ar}"`}
                              className={`inline-flex items-center px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-xl text-xs sm:text-base font-bold cursor-pointer transition-all duration-200 select-none border max-w-full break-words ${
                                isChunkActive
                                  ? profile.gender ==='female'
                                    ?'bg-pink-600 text-white font-bold ring-2 ring-pink-300 border-pink-700 shadow-sm scale-105'
                                    :'bg-blue-600 text-white font-bold ring-2 ring-blue-300 border-blue-700 shadow-sm scale-105'
                                  :'bg-zinc-100/90 hover:bg-zinc-200 text-zinc-900 border-zinc-200/90 hover:border-zinc-300 active:scale-95'
                              }`}
                            >
                              {chunk.en}
                            </button>
                          );
                        })
                      ) : (
                        line.textEn.split('').map((w, wIdx) => {
                          const cleanW = w.replace(/[^\w'-]/g,'');
                          const isWordActive =
                            activeWordInfo?.lineId === line.id &&
                            activeWordInfo?.englishWord.toLowerCase() === cleanW.toLowerCase();

                          return (
                            <span
                              key={wIdx}
                              onClick={(e) => handleWordClick(w, line, wIdx, e)}
                              title={`انقر لنطق "${cleanW}" وإظهار ترجمتها المقابلة`}
                              className={`inline-block mr-1.5 px-1.5 py-0.5 rounded-md cursor-pointer transition-all duration-200 select-none hover:bg-zinc-200 active:scale-95 ${
                                isWordActive
                                  ? profile.gender ==='female'
                                    ?'bg-pink-600 text-white font-bold ring-2 ring-pink-300 shadow-sm scale-110'
                                    :'bg-blue-600 text-white font-bold ring-2 ring-blue-300 shadow-sm scale-110'
                                  :''
                              }`}
                            >
                              {w}
                            </span>
                          );
                        })
                      )}
                    </div>

                    {/* Arabic Translation with Synchronized Highlighted Equivalent */}
                    {showArabicTranslation && (
                      <div className="pt-2.5 border-t border-zinc-100 text-right">
                        <p className="text-sm sm:text-base text-zinc-700 font-arabic leading-relaxed">
                          {renderArabicLineWithHighlight(
                            line.textAr,
                            activeWordInfo?.lineId === line.id ? activeWordInfo.arabicMatch : null,
                            profile.gender ==='female'
                          )}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Dedicated Scene Illustration Card */}
                  {scene && (
                    <div className="w-full sm:w-56 md:w-60 lg:w-68 shrink-0 rounded-2xl overflow-hidden border border-zinc-200 bg-white shadow-2xs group self-center md:self-start">
                      <div className="relative aspect-4/3 w-full overflow-hidden bg-white flex items-center justify-center p-1.5">
                        <img
                          src={scene.imageUrl}
                          alt={scene.captionAr}
                          className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                          loading="lazy"
                        />
                      </div>
                      <div className="px-2.5 py-1.5 bg-zinc-50 border-t border-zinc-100 text-center">
                        <span className="text-[11px] font-bold text-zinc-600 font-arabic block leading-tight">
                          {scene.captionAr}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
