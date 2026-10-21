export interface CharacterProfile {
  nameAr: string;
  tag: string;
  gender: 'male' | 'female';
  isAlternating: boolean;
  accentBadge: string;
  activeRing: string;
  borderNormal: string;
}

export const getCharacterProfile = (
  speaker: string,
  gender?: 'male' | 'female'
): CharacterProfile => {
  const norm = speaker.trim().toLowerCase();
  switch (norm) {
    case 'ahmed':
      return {
        nameAr: 'أحمد',
        tag: 'يسأل صديقه عن العطلة',
        gender: 'male',
        isAlternating: false,
        accentBadge: 'bg-blue-100 text-blue-900 border-blue-200',
        activeRing: 'border-blue-400 ring-2 ring-blue-300/80 bg-blue-50/40',
        borderNormal: 'border-zinc-200 hover:border-blue-200',
      };
    case 'faisal':
      return {
        nameAr: 'فيصل',
        tag: 'قضى عطلته عند النهر',
        gender: 'male',
        isAlternating: true,
        accentBadge: 'bg-teal-100 text-teal-900 border-teal-200',
        activeRing: 'border-teal-400 ring-2 ring-teal-300/80 bg-teal-50/40',
        borderNormal: 'border-zinc-200 hover:border-teal-200',
      };
    case 'khalid':
      return {
        nameAr: 'خالد',
        tag: 'حدثت معه حادثة طريفة في القارب',
        gender: 'male',
        isAlternating: true,
        accentBadge: 'bg-blue-100 text-blue-900 border-blue-200',
        activeRing: 'border-blue-400 ring-2 ring-blue-300/80 bg-blue-50/40',
        borderNormal: 'border-zinc-200 hover:border-blue-200',
      };
    case 'mariam':
      return {
        nameAr: 'مريم',
        tag: 'تذكر أخاها بحادثة القارب الطريفة',
        gender: 'female',
        isAlternating: false,
        accentBadge: 'bg-rose-100 text-rose-900 border-rose-200',
        activeRing: 'border-rose-400 ring-2 ring-rose-300/80 bg-rose-50/40',
        borderNormal: 'border-zinc-200 hover:border-rose-200',
      };
    case 'rasha':
      return {
        nameAr: 'رشا',
        tag: 'تسأل صديقاتها عن العطلة',
        gender: 'female',
        isAlternating: false,
        accentBadge: 'bg-purple-100 text-purple-900 border-purple-200',
        activeRing: 'border-purple-400 ring-2 ring-purple-300/80 bg-purple-50/40',
        borderNormal: 'border-zinc-200 hover:border-purple-200',
      };
    case 'huda':
      return {
        nameAr: 'هدى',
        tag: 'بقيت بالمنزل وصنعت ملابس',
        gender: 'female',
        isAlternating: true,
        accentBadge: 'bg-pink-100 text-pink-900 border-pink-200',
        activeRing: 'border-pink-400 ring-2 ring-pink-300/80 bg-pink-50/40',
        borderNormal: 'border-zinc-200 hover:border-pink-200',
      };
    case 'muna':
      return {
        nameAr: 'منى',
        tag: 'قرأت كتباً وتعلّمت الطبخ',
        gender: 'female',
        isAlternating: true,
        accentBadge: 'bg-amber-100 text-amber-900 border-amber-200',
        activeRing: 'border-amber-400 ring-2 ring-amber-300/80 bg-amber-50/40',
        borderNormal: 'border-zinc-200 hover:border-amber-200',
      };
    case 'richard':
      return {
        nameAr: 'ريتشارد',
        tag: 'سائح بريطاني في العراق ️',
        gender: 'male',
        isAlternating: false,
        accentBadge: 'bg-amber-100 text-amber-900 border-amber-200',
        activeRing: 'border-amber-400 ring-2 ring-amber-300/80 bg-amber-50/40',
        borderNormal: 'border-zinc-200 hover:border-amber-200',
      };
    case 'sara':
      return {
        nameAr: 'سارة',
        tag: 'تتحدث عن عطلتها وزيارة صديقتها',
        gender: 'female',
        isAlternating: false,
        accentBadge: 'bg-emerald-100 text-emerald-900 border-emerald-200',
        activeRing: 'border-emerald-400 ring-2 ring-emerald-300/80 bg-emerald-50/40',
        borderNormal: 'border-zinc-200 hover:border-emerald-200',
      };
    case 'sameera':
      return {
        nameAr: 'سميرة',
        tag: 'صديقة سارة من أبوظبي ️',
        gender: 'female',
        isAlternating: true,
        accentBadge: 'bg-teal-100 text-teal-900 border-teal-200',
        activeRing: 'border-teal-400 ring-2 ring-teal-300/80 bg-teal-50/40',
        borderNormal: 'border-zinc-200 hover:border-teal-200',
      };
    case 'maysam':
      return {
        nameAr: 'ميسم',
        tag: 'تجمع طوابع وصور معالم بلدان العالم  (دفتر 3)',
        gender: 'female',
        isAlternating: false,
        accentBadge: 'bg-amber-100 text-amber-900 border-amber-200',
        activeRing: 'border-amber-400 ring-2 ring-amber-300/80 bg-amber-50/40',
        borderNormal: 'border-zinc-200 hover:border-amber-200',
      };
    case 'adel':
    case 'adil':
      return {
        nameAr: 'عادل',
        tag: 'يحب تصوير الحيوانات وسفاري أفريقيا  (دفتر 6)',
        gender: 'male',
        isAlternating: true,
        accentBadge: 'bg-emerald-100 text-emerald-900 border-emerald-200',
        activeRing: 'border-emerald-400 ring-2 ring-emerald-300/80 bg-emerald-50/40',
        borderNormal: 'border-zinc-200 hover:border-emerald-200',
      };
    case 'bassem':
    case 'basim':
      return {
        nameAr: 'باسم',
        tag: 'مهتم بالطائرات ويحلم أن يصبح طياراً ️‍️ (دفتر 4)',
        gender: 'male',
        isAlternating: false,
        accentBadge: 'bg-sky-100 text-sky-900 border-sky-200',
        activeRing: 'border-sky-400 ring-2 ring-sky-300/80 bg-sky-50/40',
        borderNormal: 'border-zinc-200 hover:border-sky-200',
      };
    case 'rawan':
      return {
        nameAr: 'روان',
        tag: 'تجمع صور النباتات والأزهار الملونة  (دفتر 1)',
        gender: 'female',
        isAlternating: true,
        accentBadge: 'bg-rose-100 text-rose-900 border-rose-200',
        activeRing: 'border-rose-400 ring-2 ring-rose-300/80 bg-rose-50/40',
        borderNormal: 'border-zinc-200 hover:border-rose-200',
      };
    case 'laith':
      return {
        nameAr: 'ليث',
        tag: 'عاشق لكرة القدم والمباريات ️ (دفتر 5)',
        gender: 'male',
        isAlternating: false,
        accentBadge: 'bg-red-100 text-red-900 border-red-200',
        activeRing: 'border-red-400 ring-2 ring-red-300/80 bg-red-50/40',
        borderNormal: 'border-zinc-200 hover:border-red-200',
      };
    case 'nader':
      return {
        nameAr: 'نادر',
        tag: 'يتحدث عن عاداته اليومية وظروف التكرار ⏰',
        gender: 'male',
        isAlternating: false,
        accentBadge: 'bg-blue-100 text-blue-900 border-blue-200',
        activeRing: 'border-blue-400 ring-2 ring-blue-300/80 bg-blue-50/40',
        borderNormal: 'border-zinc-200 hover:border-blue-200',
      };
    case 'narrator':
      return {
        nameAr: 'الراوي',
        tag: 'قراءة نصوص وقطع المنهج',
        gender: 'male',
        isAlternating: false,
        accentBadge: 'bg-emerald-100 text-emerald-900 border-emerald-200',
        activeRing: 'border-emerald-400 ring-2 ring-emerald-300/80 bg-emerald-50/40',
        borderNormal: 'border-zinc-200 hover:border-emerald-200',
      };
    case 'karen':
      return {
        nameAr: 'كارين',
        tag: 'صديقة مراسلة من سيدني، أستراليا',
        gender: 'female',
        isAlternating: false,
        accentBadge: 'bg-amber-100 text-amber-900 border-amber-200',
        activeRing: 'border-amber-400 ring-2 ring-amber-300/80 bg-amber-50/40',
        borderNormal: 'border-zinc-200 hover:border-amber-200',
      };
    case 'sana':
      return {
        nameAr: 'سناء',
        tag: 'تتحدث عن يومها المميز على شاطئ البحر',
        gender: 'female',
        isAlternating: false,
        accentBadge: 'bg-teal-100 text-teal-900 border-teal-200',
        activeRing: 'border-teal-400 ring-2 ring-teal-300/80 bg-teal-50/40',
        borderNormal: 'border-zinc-200 hover:border-teal-200',
      };
    case 'grandson':
      return {
        nameAr: 'الحفيد',
        tag: 'يسأل جده عما سيفعلونه غدا وفي المستقبل',
        gender: 'male',
        isAlternating: false,
        accentBadge: 'bg-blue-100 text-blue-900 border-blue-200',
        activeRing: 'border-blue-400 ring-2 ring-blue-300/80 bg-blue-50/40',
        borderNormal: 'border-zinc-200 hover:border-blue-200',
      };
    case 'grandfather':
      return {
        nameAr: 'الجد',
        tag: 'يجيب حفيده بقوافي لطيفة ومحببة',
        gender: 'male',
        isAlternating: true,
        accentBadge: 'bg-amber-100 text-amber-900 border-amber-200',
        activeRing: 'border-amber-400 ring-2 ring-amber-300/80 bg-amber-50/40',
        borderNormal: 'border-zinc-200 hover:border-amber-200',
      };
    case 'yassir':
      return {
        nameAr: 'ياسر',
        tag: 'طالب عراقي في المتنزه ورحلة لندن',
        gender: 'male',
        isAlternating: false,
        accentBadge: 'bg-emerald-100 text-emerald-900 border-emerald-200',
        activeRing: 'border-emerald-400 ring-2 ring-emerald-300/80 bg-emerald-50/40',
        borderNormal: 'border-zinc-200 hover:border-emerald-200',
      };
    case 'simon':
      return {
        nameAr: 'سايمون',
        tag: 'طالب إنجليزي يعيش والده في البصرة',
        gender: 'male',
        isAlternating: true,
        accentBadge: 'bg-sky-100 text-sky-900 border-sky-200',
        activeRing: 'border-sky-400 ring-2 ring-sky-300/80 bg-sky-50/40',
        borderNormal: 'border-zinc-200 hover:border-sky-200',
      };
    case 'father':
      return {
        nameAr: 'والد ياسر',
        tag: 'يشرح لسايمون عن رمضان وعيد الفطر',
        gender: 'male',
        isAlternating: false,
        accentBadge: 'bg-indigo-100 text-indigo-900 border-indigo-200',
        activeRing: 'border-indigo-400 ring-2 ring-indigo-300/80 bg-indigo-50/40',
        borderNormal: 'border-zinc-200 hover:border-indigo-200',
      };
    case 'radio presenter':
      return {
        nameAr: 'مذيعة النشرة',
        tag: 'تقدم النشرة الجوية لمدينة لندن',
        gender: 'female',
        isAlternating: false,
        accentBadge: 'bg-teal-100 text-teal-900 border-teal-200',
        activeRing: 'border-teal-400 ring-2 ring-teal-300/80 bg-teal-50/40',
        borderNormal: 'border-zinc-200 hover:border-teal-200',
      };
    case 'girl':
      return {
        nameAr: 'المحاورة',
        tag: 'تطرح أسئلة حول رياضة التزلج الجماعي',
        gender: 'female',
        isAlternating: false,
        accentBadge: 'bg-rose-100 text-rose-900 border-rose-200',
        activeRing: 'border-rose-400 ring-2 ring-rose-300/80 bg-rose-50/40',
        borderNormal: 'border-zinc-200 hover:border-rose-200',
      };
    case 'halla':
      return {
        nameAr: 'هالة',
        tag: 'أخت ياسر الكبرى في رحلة عين لندن',
        gender: 'female',
        isAlternating: true,
        accentBadge: 'bg-purple-100 text-purple-900 border-purple-200',
        activeRing: 'border-purple-400 ring-2 ring-purple-300/80 bg-purple-50/40',
        borderNormal: 'border-zinc-200 hover:border-purple-200',
      };
    default: {
      const isFem = gender === 'female';
      return {
        nameAr: speaker,
        tag: isFem ? 'طالبة' : 'طالب',
        gender: isFem ? 'female' : 'male',
        isAlternating: false,
        accentBadge: isFem
          ? 'bg-pink-100 text-pink-900 border-pink-200'
          : 'bg-blue-100 text-blue-900 border-blue-200',
        activeRing: isFem
          ? 'border-pink-400 ring-2 ring-pink-300/80 bg-pink-50/40'
          : 'border-blue-400 ring-2 ring-blue-300/80 bg-blue-50/40',
        borderNormal: 'border-zinc-200 hover:border-zinc-300',
      };
    }
  }
};
