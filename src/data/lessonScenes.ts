export interface LineSceneIllustration {
  imageUrl: string;
  captionAr: string;
  badgeLabelAr?: string;
  badgeColor?: string;
}

export const LINE_SCENE_IMAGES: Record<string, LineSceneIllustration> = {
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
'l3-3': {
    imageUrl: '/images/dialogue/l3-3.jpg',
    captionAr: 'مريم تذكره: كنا نبحر ونشاهد طيور الفلامنجو والبجع يسقط سمكة على رأسك!',
    badgeLabelAr: 'حادثة البجع والسمكة',
    badgeColor: 'bg-emerald-50 text-emerald-800 border-emerald-200',
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
'l3-9': {
    imageUrl: '/images/dialogue/l3-9.jpg',
    captionAr: 'العائلة تسحب خالد من الماء ثم تعود بالسيارة إلى الفندق',
    badgeLabelAr: 'الإنقاذ والعودة للفندق',
    badgeColor: 'bg-indigo-50 text-indigo-800 border-indigo-200',
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

  // Lesson 6 - Track 9: Adel and Bassem's conversation
  'l6-1': {
    imageUrl: '/images/dialogue/l6-1.jpg',
    captionAr: 'عادل يدعو باسم للذهاب إلى المركز التجاري (المول)',
    badgeLabelAr: 'دعوة إلى المول',
    badgeColor: 'bg-emerald-50 text-emerald-800 border-emerald-200',
  },
  'l6-2': {
    imageUrl: '/images/dialogue/l6-2.jpg',
    captionAr: 'باسم يضع الصور في دفتر قصاصاته (Scrapbook)',
    badgeLabelAr: 'دفتر القصاصات',
    badgeColor: 'bg-sky-50 text-sky-800 border-sky-200',
  },
  'l6-3': {
    imageUrl: '/images/dialogue/l6-3.jpg',
    captionAr: 'عادل يتساءل بفضول: صور مواقع تاريخية في العراق؟',
    badgeLabelAr: 'مواقع تاريخية؟',
    badgeColor: 'bg-amber-50 text-amber-800 border-amber-200',
  },
  'l6-4': {
    imageUrl: '/images/dialogue/l6-4.jpg',
    captionAr: 'باسم يعرض ألبومه بفخر: أزور مدناً وألتقط صوراً للآثار',
    badgeLabelAr: 'صور الآثار العراقية',
    badgeColor: 'bg-blue-50 text-blue-800 border-blue-200',
  },
  'l6-5': {
    imageUrl: '/images/dialogue/l6-5.jpg',
    captionAr: 'عادل يتعجب: هل لديك الكثير؟ ولكن لماذا الآثار؟',
    badgeLabelAr: 'لماذا الآثار بالذات؟',
    badgeColor: 'bg-rose-50 text-rose-800 border-rose-200',
  },
  'l6-6': {
    imageUrl: '/images/dialogue/l6-6.jpg',
    captionAr: 'باسم يبتسم ويحتضن ألبومه: لدي الكثير لأنني أحبها',
    badgeLabelAr: 'شغف بالآثار',
    badgeColor: 'bg-purple-50 text-purple-800 border-purple-200',
  },

  // Lesson 6 - Track 10: Tongue-twister
  'l6-t-1': {
    imageUrl: '/images/dialogue/l6-t-1.jpg',
    captionAr: 'هي تبيع أصداف البحر على شاطئ البحر (تمرين صوت /s/)',
    badgeLabelAr: 'صوت /s/ (Seashells)',
    badgeColor: 'bg-teal-50 text-teal-800 border-teal-200',
  },
  'l6-t-2': {
    imageUrl: '/images/dialogue/l6-t-2.jpg',
    captionAr: 'أصداف البحر على رمال الشاطئ (تمرين صوت /ʃ/)',
    badgeLabelAr: 'صوت /ʃ/ (Shells)',
    badgeColor: 'bg-cyan-50 text-cyan-800 border-cyan-200',
  },

  // Lesson 7 - Ahmed & Faisal in New York
  'l7-ahmed-1': {
    imageUrl: '/images/ahmed-story/ahmed-scene-1.jpg',
    captionAr: 'أحمد وعائلته بحقائب السفر في فندق بنيويورك وصديقه فيصل',
    badgeLabelAr: 'العطلة في نيويورك (New York)',
    badgeColor: 'bg-zinc-100 text-zinc-800 border-zinc-200',
  },
  'l7-ahmed-2': {
    imageUrl: '/images/ahmed-story/ahmed-scene-2.jpg',
    captionAr: 'نزول أحمد من التكسي الأصفر عند شقة فيصل (الساعة 2:30)',
    badgeLabelAr: 'شقة فيصل (At 2:30)',
    badgeColor: 'bg-zinc-100 text-zinc-800 border-zinc-200',
  },
  'l7-ahmed-3': {
    imageUrl: '/images/ahmed-story/ahmed-scene-3.jpg',
    captionAr: 'الصديقان أمام السينما وشعور أحمد بالملل من الفلم',
    badgeLabelAr: 'السينما والفلم الممل (Cinema)',
    badgeColor: 'bg-zinc-100 text-zinc-800 border-zinc-200',
  },
  'l7-ahmed-4': {
    imageUrl: '/images/ahmed-story/ahmed-scene-4.jpg',
    captionAr: 'المشي في سنترال بارك والجلوس تحت الشجرة والحديث عن العراق',
    badgeLabelAr: 'سنترال بارك (Central Park)',
    badgeColor: 'bg-zinc-100 text-zinc-800 border-zinc-200',
  },
  'l7-ahmed-5': {
    imageUrl: '/images/ahmed-story/ahmed-scene-5.jpg',
    captionAr: 'الحديث عن العائلات: فيصل وحيد وأحمد لديه 4 أطفال في عائلته',
    badgeLabelAr: 'الحديث عن العائلة (Families)',
    badgeColor: 'bg-zinc-100 text-zinc-800 border-zinc-200',
  },
  'l7-ahmed-6': {
    imageUrl: '/images/ahmed-story/ahmed-scene-6.jpg',
    captionAr: 'ركوب التكسي والعودة إلى الفندق في تمام الساعة الخامسة (5:00)',
    badgeLabelAr: 'العودة للفندق (At 5:00)',
    badgeColor: 'bg-zinc-100 text-zinc-800 border-zinc-200',
  },

  // Lesson 7 - Track 11: Sana's fantastic day
  'l7-1': {
    imageUrl: '/images/dialogue/l7-1.jpg',
    captionAr: 'سناء وصديقاتها في يوم مشمس وممتع معاً',
    badgeLabelAr: 'يوم رائع مع الصديقات',
    badgeColor: 'bg-amber-50 text-amber-800 border-amber-200',
  },
  'l7-2': {
    imageUrl: '/images/dialogue/l7-2.jpg',
    captionAr: 'صيد السمك المريح للأعصاب في الصباح الهادئ',
    badgeLabelAr: 'صيد السمك (fishing)',
    badgeColor: 'bg-teal-50 text-teal-800 border-teal-200',
  },
  'l7-3': {
    imageUrl: '/images/dialogue/l7-3.jpg',
    captionAr: 'المشي على الشاطئ، جمع الأصداف، وتصوير القوارب',
    badgeLabelAr: 'شاطئ وقوارب (boats)',
    badgeColor: 'bg-sky-50 text-sky-800 border-sky-200',
  },
  'l7-4': {
    imageUrl: '/images/dialogue/l7-4.jpg',
    captionAr: 'لعب كرة القدم في الحديقة وسماع الموسيقى والنزهة',
    badgeLabelAr: 'كرة قدم ونزهة في الحديقة',
    badgeColor: 'bg-emerald-50 text-emerald-800 border-emerald-200',
  },

  // Lesson 8: Karen's letter from Australia
  'l8-1': {
    imageUrl: '/images/dialogue/l8-1.jpg',
    captionAr: 'كارين تكتب رسالتها من سيدني وتطل على دار الأوبرا',
    badgeLabelAr: 'رسالة من سيدني (Sydney)',
    badgeColor: 'bg-blue-50 text-blue-800 border-blue-200',
  },
  'l8-2': {
    imageUrl: '/images/dialogue/l8-2.jpg',
    captionAr: 'التخييم في الطبيعة الأسترالية وقضاء الوقت مع جين',
    badgeLabelAr: 'تخييم في الطبيعة (camping)',
    badgeColor: 'bg-amber-50 text-amber-800 border-amber-200',
  },
  'l8-3': {
    imageUrl: '/images/dialogue/l8-3.jpg',
    captionAr: 'المشي في المتنزهات والتقاط الصور وزيارة المتحف',
    badgeLabelAr: 'متنزه ومتحف (museum)',
    badgeColor: 'bg-stone-50 text-stone-800 border-stone-200',
  },
  'l8-4': {
    imageUrl: '/images/dialogue/l8-4.jpg',
    captionAr: 'عشاء عائلي وتناول السمك المشوي على الفحم (باربيكيو)',
    badgeLabelAr: 'سمك مشوي (barbecue)',
    badgeColor: 'bg-rose-50 text-rose-800 border-rose-200',
  },
  'l8-5': {
    imageUrl: '/images/dialogue/l8-5.jpg',
    captionAr: 'كارين تتصفح ألبوم صور بلدان العالم وتطلب صور العراق',
    badgeLabelAr: 'ألبوم صور معالم العراق',
    badgeColor: 'bg-purple-50 text-purple-800 border-purple-200',
  },

  // Lesson 10 - Track 12: Story time - My new friend, the swift
  'l10-1': {
    imageUrl: '/images/dialogue/l10-1.jpg',
    captionAr: 'العودة من المدرسة وملاحظة شيء ما بين الشجيرات',
    badgeLabelAr: 'حركة بين الشجيرات',
    badgeColor: 'bg-emerald-50 text-emerald-800 border-emerald-200',
  },
  'l10-2': {
    imageUrl: '/images/dialogue/l10-2.jpg',
    captionAr: 'التوقف واكتشاف طائر صغير ملقى على الأرض يبدو ميتاً',
    badgeLabelAr: 'طائر صغير على الأرض',
    badgeColor: 'bg-stone-50 text-stone-800 border-stone-200',
  },
  'l10-3': {
    imageUrl: '/images/dialogue/l10-3.jpg',
    captionAr: 'لف الطائر برفق في وشاح وأخذه للمنزل لتدفئته وحمايته',
    badgeLabelAr: 'إنقاذ بالوشاح',
    badgeColor: 'bg-amber-50 text-amber-800 border-amber-200',
  },
  'l10-4': {
    imageUrl: '/images/dialogue/l10-4.jpg',
    captionAr: 'الطائر يقفز محاولاً الطيران مع ظهور إصابة في جناحه',
    badgeLabelAr: 'جناح مصاب',
    badgeColor: 'bg-rose-50 text-rose-800 border-rose-200',
  },
  'l10-5': {
    imageUrl: '/images/dialogue/l10-5.jpg',
    captionAr: 'البحث مع الأم واكتشاف أن الطائر هو طائر السمامة',
    badgeLabelAr: 'طائر السمامة (swift)',
    badgeColor: 'bg-blue-50 text-blue-800 border-blue-200',
  },
  'l10-6': {
    imageUrl: '/images/dialogue/l10-6.jpg',
    captionAr: 'حقيقة مذهلة: السمامة تقضي حتى 10 أشهر محلقة في الهواء',
    badgeLabelAr: '10 أشهر طيران',
    badgeColor: 'bg-indigo-50 text-indigo-800 border-indigo-200',
  },
  'l10-7': {
    imageUrl: '/images/dialogue/l10-7.jpg',
    captionAr: 'إطعام الطائر الحشرات وتغيير الماء حتى استعاد عافيته وقوته',
    badgeLabelAr: 'عناية يومية وطاقة',
    badgeColor: 'bg-teal-50 text-teal-800 border-teal-200',
  },
  'l10-8': {
    imageUrl: '/images/dialogue/l10-8.jpg',
    captionAr: 'فتح الصندوق وانطلاق السمامة حرة محلقة من النافذة نحو السماء',
    badgeLabelAr: 'انطلاق نحو الحرية',
    badgeColor: 'bg-sky-50 text-sky-800 border-sky-200',
  },

  // ==========================================
  // UNIT 2 - LESSON 1: Our four seasons
  // Track 13: Four Seasons in England
  // ==========================================
  'u2-l1-t13-1': {
    imageUrl: '/images/lessons/u2-lesson-1.jpg',
    captionAr: 'الفصول الأربعة في إنجلترا: الشتاء، الربيع، الصيف، والخريف',
    badgeLabelAr: 'الفصول الأربعة',
    badgeColor: 'bg-indigo-50 text-indigo-800 border-indigo-200',
  },
  'u2-l1-t13-2': {
    imageUrl: '/images/seasons/winter.jpg',
    captionAr: 'الشتاء في إنجلترا: بارد دائماً مع تساقط الثلوج (0°C)',
    badgeLabelAr: 'الشتاء (Winter • 0°C)',
    badgeColor: 'bg-blue-50 text-blue-800 border-blue-200',
  },
  'u2-l1-t13-3': {
    imageUrl: '/images/seasons/spring.jpg',
    captionAr: 'الربيع في إنجلترا: دافئ في الغالب مع أمطار منعشة (15°C)',
    badgeLabelAr: 'الربيع (Spring • 15°C)',
    badgeColor: 'bg-emerald-50 text-emerald-800 border-emerald-200',
  },
  'u2-l1-t13-4': {
    imageUrl: '/images/seasons/summer.jpg',
    captionAr: 'الصيف في إنجلترا: مشمس عادةً وحار في بعض الأحيان (25°C)',
    badgeLabelAr: 'الصيف (Summer • 25°C)',
    badgeColor: 'bg-amber-50 text-amber-800 border-amber-200',
  },
  'u2-l1-t13-5': {
    imageUrl: '/images/seasons/autumn.jpg',
    captionAr: 'الخريف في إنجلترا: معتدل البرودة وعاصف بالرياح (10°C)',
    badgeLabelAr: 'الخريف (Autumn • 10°C)',
    badgeColor: 'bg-orange-50 text-orange-800 border-orange-200',
  },

  // ==========================================
  // UNIT 2 - LESSON 1: London Weather Forecast
  // Track 14: London Weather Forecast
  // ==========================================
  'u2-l1-t14-1': {
    imageUrl: '/images/weather/london-presenter.jpg',
    captionAr: 'مذيعة النشرة في الاستوديو تقدم النشرة الجوية لمدينة لندن',
    badgeLabelAr: 'استوديو النشرة الجوية',
    badgeColor: 'bg-teal-50 text-teal-800 border-teal-200',
  },
  'u2-l1-t14-2': {
    imageUrl: '/images/weather/london-morning.jpg',
    captionAr: 'صباح لندن: طقس معتدل وغائم مع بعض الأمطار والمظلات',
    badgeLabelAr: 'صباح ماطر (Morning)',
    badgeColor: 'bg-sky-50 text-sky-800 border-sky-200',
  },
  'u2-l1-t14-3': {
    imageUrl: '/images/weather/london-afternoon.jpg',
    captionAr: 'فترة بعد الظهر: طقس جاف ومشمس عند نهر التايمز (18°C)',
    badgeLabelAr: 'بعد الظهر مشمس (18°C)',
    badgeColor: 'bg-yellow-50 text-yellow-800 border-yellow-200',
  },
  'u2-l1-t14-4': {
    imageUrl: '/images/weather/london-evening.jpg',
    captionAr: 'مساء لندن البارد: أضواء الشوارع وساعة بيغ بن في هواء المساء المنعش',
    badgeLabelAr: 'مساء بارد (Evening)',
    badgeColor: 'bg-indigo-50 text-indigo-800 border-indigo-200',
  },

  // ==========================================
  // UNIT 2 - LESSON 2: What will we do?
  // Track 15: Grandson and Grandfather Conversation
  // ==========================================
  'u2-l2-t15-1': {
    imageUrl: '/images/lessons/u2-lesson-2.jpg',
    captionAr: 'الحفيد والجد يخططان في غرفة المعيشة الدافئة لما سيفعلانه غداً',
    badgeLabelAr: 'تخطيط الغد (tomorrow)',
    badgeColor: 'bg-indigo-50 text-indigo-800 border-indigo-200',
  },
  'u2-l2-t15-2': {
    imageUrl: '/images/dialogue/u2-l2-1.jpg',
    captionAr: 'صنع كرات الثلج ورميها والمرح في الحديقة وسط تساقط الثلوج',
    badgeLabelAr: 'كرات الثلج (snow to throw)',
    badgeColor: 'bg-cyan-50 text-cyan-800 border-cyan-200',
  },
  'u2-l2-t15-3': {
    imageUrl: '/images/dialogue/u2-l2-1.jpg',
    captionAr: 'سؤال الحفيد عما سيفعلانه في فترة بعد الظهر',
    badgeLabelAr: 'بعد الظهر (tomorrow afternoon)',
    badgeColor: 'bg-cyan-50 text-cyan-800 border-cyan-200',
  },
  'u2-l2-t15-4': {
    imageUrl: '/images/dialogue/u2-l2-2.jpg',
    captionAr: 'الجلوس في الهواء البارد وتناول حلوى الثلج اللذيذة بالملعقة',
    badgeLabelAr: 'أكل الثلج بالملعقة (with a spoon)',
    badgeColor: 'bg-amber-50 text-amber-800 border-amber-200',
  },
  'u2-l2-t15-5': {
    imageUrl: '/images/dialogue/u2-l2-2.jpg',
    captionAr: 'استفسار الحفيد عن بقية النشاطات',
    badgeLabelAr: 'ماذا سنفعل أيضاً؟',
    badgeColor: 'bg-amber-50 text-amber-800 border-amber-200',
  },
  'u2-l2-t15-6': {
    imageUrl: '/images/dialogue/u2-l2-3.jpg',
    captionAr: 'حزم حقيبة السفر على السرير استعداداً للعودة للديار المشمسة الدافئة',
    badgeLabelAr: 'حزم الحقيبة (pack your suitcase)',
    badgeColor: 'bg-emerald-50 text-emerald-800 border-emerald-200',
  },
  'u2-l2-t15-7': {
    imageUrl: '/images/dialogue/u2-l2-3.jpg',
    captionAr: 'سؤال الحفيد عما سيحدث في ليلة الغد',
    badgeLabelAr: 'ليلة الغد (tomorrow night)',
    badgeColor: 'bg-emerald-50 text-emerald-800 border-emerald-200',
  },
  'u2-l2-t15-8': {
    imageUrl: '/images/dialogue/u2-l2-4.jpg',
    captionAr: 'الحفيد مسافر على متن الطائرة ليلاً والجد نائم في فراشه الدافئ بسلام',
    badgeLabelAr: 'على متن الرحلة (on a flight)',
    badgeColor: 'bg-blue-50 text-blue-800 border-blue-200',
  },
  'u2-l2-t15-9': {
    imageUrl: '/images/dialogue/u2-l2-4.jpg',
    captionAr: 'سؤال الحفيد عن العام القادم',
    badgeLabelAr: 'العام القادم (next year)',
    badgeColor: 'bg-blue-50 text-blue-800 border-blue-200',
  },
  'u2-l2-t15-10': {
    imageUrl: '/images/dialogue/u2-l2-5.jpg',
    captionAr: 'اللقاء المرتقب والعناق الحار في صالة الوصول بالمطار في مثل هذا الوقت العام القادم',
    badgeLabelAr: 'لقاء العام القادم (you will be here)',
    badgeColor: 'bg-rose-50 text-rose-800 border-rose-200',
  },

  // ==========================================
  // UNIT 2 - LESSON 3: The months of the year
  // Track 16: The Names of the Months
  // Track 17: The Months Poem
  // ==========================================
  'u2-l3-t16-1': {
    imageUrl: '/images/lessons/u2-lesson-3.jpg',
    captionAr: 'عجلة أشهر السنة الاثني عشر: النصف الأول (كانون الثاني حتى حزيران)',
    badgeLabelAr: 'أشهر السنة (Jan - Jun)',
    badgeColor: 'bg-indigo-50 text-indigo-800 border-indigo-200',
  },
  'u2-l3-t16-2': {
    imageUrl: '/images/lessons/u2-lesson-3.jpg',
    captionAr: 'عجلة أشهر السنة الاثني عشر: النصف الثاني (تموز حتى كانون الأول)',
    badgeLabelAr: 'أشهر السنة (Jul - Dec)',
    badgeColor: 'bg-indigo-50 text-indigo-800 border-indigo-200',
  },
  'u2-l3-t17-1': {
    imageUrl: '/images/dialogue/u2-l3-1.jpg',
    captionAr: 'برد كانون وشباط والانتقال إلى ربيع آذار ونيسان حيث تباع المثلجات',
    badgeLabelAr: 'آيس كريم الربيع (ice cream is sold)',
    badgeColor: 'bg-cyan-50 text-cyan-800 border-cyan-200',
  },
  'u2-l3-t17-2': {
    imageUrl: '/images/dialogue/u2-l3-2.jpg',
    captionAr: 'أيار شهر المتعة والسباحة واللعب تحت أشعة الشمس المشرقة',
    badgeLabelAr: 'سباحة أيار (swim in the sun)',
    badgeColor: 'bg-emerald-50 text-emerald-800 border-emerald-200',
  },
  'u2-l3-t17-3': {
    imageUrl: '/images/dialogue/u2-l3-3.jpg',
    captionAr: 'حرارة الصيف الشديدة في حزيران وتموز وآب والاستظلال بمظلات الشاطئ',
    badgeLabelAr: 'حرارة الصيف (very hot summer)',
    badgeColor: 'bg-amber-50 text-amber-800 border-amber-200',
  },
  'u2-l3-t17-4': {
    imageUrl: '/images/dialogue/u2-l3-4.jpg',
    captionAr: 'اعتدال الطقس وتساقط أوراق الخريف في أيلول وتشرين ثم قدوم أمطار الشتاء',
    badgeLabelAr: 'أوراق الخريف والمطر (here comes rain)',
    badgeColor: 'bg-orange-50 text-orange-800 border-orange-200',
  },

  // ==========================================
  // UNIT 2 - LESSON 4: What's the date?
  // Track 18: Thirty Days Has September Rhyme (6 Poetic Lines)
  // ==========================================
  'u2-l4-t18-1': {
    imageUrl: '/images/dialogue/u2-l4-1.jpg',
    captionAr: 'ثلاثون يوماً في أيلول (30 Days: September)',
    badgeLabelAr: 'أيلول (30 days)',
    badgeColor: 'bg-indigo-50 text-indigo-800 border-indigo-200',
  },
  'u2-l4-t18-2': {
    imageUrl: '/images/dialogue/u2-l4-1.jpg',
    captionAr: 'ونيسان، وحزيران، وتشرين الثاني (April, June and November)',
    badgeLabelAr: 'أشهر الـ 30 يوماً',
    badgeColor: 'bg-indigo-50 text-indigo-800 border-indigo-200',
  },
  'u2-l4-t18-3': {
    imageUrl: '/images/dialogue/u2-l4-2.jpg',
    captionAr: 'وكل الأشهر الباقية فيها واحد وثلاثون يوماً (All the rest have 31)',
    badgeLabelAr: 'أشهر الـ 31 يوماً',
    badgeColor: 'bg-amber-50 text-amber-800 border-amber-200',
  },
  'u2-l4-t18-4': {
    imageUrl: '/images/dialogue/u2-l4-3.jpg',
    captionAr: 'عدا شهر شباط وحده (Except February alone)',
    badgeLabelAr: 'شهر شباط (February)',
    badgeColor: 'bg-cyan-50 text-cyan-800 border-cyan-200',
  },
  'u2-l4-t18-5': {
    imageUrl: '/images/dialogue/u2-l4-3.jpg',
    captionAr: 'ففيه ثمانية وعشرون يوماً صريحة (28 days clear)',
    badgeLabelAr: '28 يوماً (سنة بسيطة)',
    badgeColor: 'bg-cyan-50 text-cyan-800 border-cyan-200',
  },
  'u2-l4-t18-6': {
    imageUrl: '/images/dialogue/u2-l4-3.jpg',
    captionAr: 'وتسعة وعشرون يوماً في كل سنة كبيسة (29 in each leap year)',
    badgeLabelAr: '29 يوماً (سنة كبيسة Leap Year)',
    badgeColor: 'bg-emerald-50 text-emerald-800 border-emerald-200',
  },

  // Track 19: Listening to Birthdays (Dedicated Student Cards)
  'u2-l4-t19-1': {
    imageUrl: '/images/dialogue/u2-l4-bday-1.jpg',
    captionAr: 'عيد ميلاد جاك في الثامن عشر من آذار (Jack: 18th March)',
    badgeLabelAr: 'Jack • 18th March',
    badgeColor: 'bg-blue-50 text-blue-800 border-blue-200',
  },
  'u2-l4-t19-2': {
    imageUrl: '/images/dialogue/u2-l4-bday-2.jpg',
    captionAr: 'عيد ميلاد ياسر في الحادي والعشرين من تشرين الثاني (Yassir: 21st November)',
    badgeLabelAr: 'Yassir • 21st Nov',
    badgeColor: 'bg-amber-50 text-amber-800 border-amber-200',
  },
  'u2-l4-t19-3': {
    imageUrl: '/images/dialogue/u2-l4-bday-3.jpg',
    captionAr: 'عيد ميلاد سارة في الثاني والعشرين من تموز (Sara: 22nd July)',
    badgeLabelAr: 'Sara • 22nd July',
    badgeColor: 'bg-pink-50 text-pink-800 border-pink-200',
  },
  'u2-l4-t19-4': {
    imageUrl: '/images/dialogue/u2-l4-bday-4.jpg',
    captionAr: 'عيد ميلاد سايمون في السادس من شباط (Simon: 6th February)',
    badgeLabelAr: 'Simon • 6th Feb',
    badgeColor: 'bg-sky-50 text-sky-800 border-sky-200',
  },
  'u2-l4-t19-5': {
    imageUrl: '/images/dialogue/u2-l4-bday-5.jpg',
    captionAr: 'عيد ميلاد سوزان في التاسع عشر من نيسان (Susan: 19th April)',
    badgeLabelAr: 'Susan • 19th April',
    badgeColor: 'bg-emerald-50 text-emerald-800 border-emerald-200',
  },
  'u2-l4-t19-6': {
    imageUrl: '/images/dialogue/u2-l4-bday-6.jpg',
    captionAr: 'عيد ميلاد رمزي في التاسع من آب (Ramzi: 9th August)',
    badgeLabelAr: 'Ramzi • 9th August',
    badgeColor: 'bg-indigo-50 text-indigo-800 border-indigo-200',
  },

  // ==========================================
  // UNIT 2 - LESSON 5: Life in Boronuk
  // Track 20: Extreme cold in Russia (-67°C)
  // ==========================================
  'u2-l5-t20-1': {
    imageUrl: '/images/lessons/u2-lesson-5.jpg',
    captionAr: 'تقلبات الطقس الشديدة ومقارنة تقلبات بريطانيا بالبرد الروسي القارس',
    badgeLabelAr: 'بلدة بورونوك (-67°C)',
    badgeColor: 'bg-cyan-50 text-cyan-800 border-cyan-200',
  },
  'u2-l5-t20-2': {
    imageUrl: '/images/lessons/u2-lesson-5.jpg',
    captionAr: 'تغيرات سريعة ومفاجئة في حالة الجو والسماء الملبدة بالغيوم',
    badgeLabelAr: 'تقلبات الجو السريعة',
    badgeColor: 'bg-cyan-50 text-cyan-800 border-cyan-200',
  },
  'u2-l5-t20-3': {
    imageUrl: '/images/lessons/u2-lesson-5.jpg',
    captionAr: 'برودة لدرجة تجمد حبر الأقلام داخل بلدة بورونوك في أقصى شرق روسيا',
    badgeLabelAr: 'بورونوك، شرق روسيا (Boronuk)',
    badgeColor: 'bg-blue-50 text-blue-800 border-blue-200',
  },
  'u2-l5-t20-4': {
    imageUrl: '/images/lessons/u2-lesson-5.jpg',
    captionAr: 'انخفاض درجات الحرارة إلى 67 تحت الصفر (-67°C) مقارنة بالمجمدة المنزلية (-18°C)',
    badgeLabelAr: 'حرارة متجمدة (-67°C)',
    badgeColor: 'bg-indigo-50 text-indigo-800 border-indigo-200',
  },
  'u2-l5-t20-5': {
    imageUrl: '/images/dialogue/u2-l5-5.jpg',
    captionAr: 'تكيف البشر المذهل: خيول سيبيريا في الحقول الثلجية، والأطفال يتجهون للمدرسة',
    badgeLabelAr: 'تكيف السكان والمدرسة والخيول',
    badgeColor: 'bg-emerald-50 text-emerald-800 border-emerald-200',
  },
  'u2-l5-t20-6': {
    imageUrl: '/images/dialogue/u2-l5-1.jpg',
    captionAr: 'مياه الشرب لا تأتي في قوارير بل تُجلب في قوالب ثلجية عملاقة على الزلاجات',
    badgeLabelAr: 'قوالب جليد مياه الشرب (Ice blocks)',
    badgeColor: 'bg-sky-50 text-sky-800 border-sky-200',
  },
  'u2-l5-t20-7': {
    imageUrl: '/images/dialogue/u2-l5-2.jpg',
    captionAr: 'بطاريات الهواتف الذكية تفرغ بسرعة بسبب البرد الشديد، ومحركات السيارات تعمل طوال اليوم',
    badgeLabelAr: 'بطارية الهاتف وتجمد البنزين',
    badgeColor: 'bg-amber-50 text-amber-800 border-amber-200',
  },
  'u2-l5-t20-7a': {
    imageUrl: '/images/dialogue/u2-l5-2.jpg',
    captionAr: 'بطارية الهاتف الذكي تعمل لدقائق معدودة فقط إن لم تُحفظ في مكان دافئ',
    badgeLabelAr: 'تحذير برودة الهاتف (Battery)',
    badgeColor: 'bg-amber-50 text-amber-800 border-amber-200',
  },
  'u2-l5-t20-7b': {
    imageUrl: '/images/dialogue/u2-l5-3.jpg',
    captionAr: 'بنزين السيارات يتجمد في الشتاء، لذلك يترك الأهالي محركات سياراتهم تعمل طوال اليوم',
    badgeLabelAr: 'تشغيل محرك السيارة في الثلج (Car engine)',
    badgeColor: 'bg-orange-50 text-orange-800 border-orange-200',
  },
  'u2-l5-t20-8': {
    imageUrl: '/images/dialogue/u2-l5-4.jpg',
    captionAr: 'تحذير حاسم: إياك وارتداء نظارات بإطار معدني لأنها تلتصق بالجلد وتؤذي الوجه',
    badgeLabelAr: 'خطر النظارات المعدنية (Metal glasses)',
    badgeColor: 'bg-rose-50 text-rose-800 border-rose-200',
  },
  'u2-l5-t20-9': {
    imageUrl: '/images/lessons/u2-lesson-5.jpg',
    captionAr: 'لا أحد يسأل عن طقس الغد في بورونوك لأن الجميع يعلم أنه سيكون شديد البرودة دائماً',
    badgeLabelAr: 'طقس بورونوك الدائم (Cold, Cold, Cold)',
    badgeColor: 'bg-blue-50 text-blue-800 border-blue-200',
  },

  // ==========================================
  // UNIT 2 - LESSON 6: Different schools
  // Reading Text: Yassir and Simon in the Park
  // ==========================================
  'u2-l6-1': {
    imageUrl: '/images/dialogue/u2-l6-1.jpg',
    captionAr: 'سايمون يلعب على لوح التزلج بمفرده في المتنزه في يوم عاصف من شهر كانون الأول',
    badgeLabelAr: 'تزلج في المتنزه (Skateboard)',
    badgeColor: 'bg-teal-50 text-teal-800 border-teal-200',
  },
  'u2-l6-2': {
    imageUrl: '/images/lessons/u2-lesson-6.jpg',
    captionAr: 'ياسر يرحب بسايمون ويسأله عن بلده',
    badgeLabelAr: 'تعارف ياسر وسايمون',
    badgeColor: 'bg-blue-50 text-blue-800 border-blue-200',
  },
  'u2-l6-2b': {
    imageUrl: '/images/lessons/u2-lesson-6.jpg',
    captionAr: 'الولد الآخر من إنجلترا واسمه سايمون',
    badgeLabelAr: 'سايمون من إنجلترا (England)',
    badgeColor: 'bg-indigo-50 text-indigo-800 border-indigo-200',
  },
  'u2-l6-3': {
    imageUrl: '/images/lessons/u2-lesson-6.jpg',
    captionAr: 'سايمون يوضح أن والده يعمل بالبصرة وهو يقضي عطلته هنا',
    badgeLabelAr: 'عطلة في العراق (Holiday)',
    badgeColor: 'bg-cyan-50 text-cyan-800 border-cyan-200',
  },
  'u2-l6-4': {
    imageUrl: '/images/dialogue/u2-l6-2.jpg',
    captionAr: 'دهشة ياسر واستغرابه: في عطلة! ألا تذهب إلى المدرسة؟',
    badgeLabelAr: 'دهشة واستغراب',
    badgeColor: 'bg-amber-50 text-amber-800 border-amber-200',
  },
  'u2-l6-5': {
    imageUrl: '/images/dialogue/u2-l6-2.jpg',
    captionAr: 'سايمون يؤكد أن لديهم عطلة مدرسية في هذا الوقت',
    badgeLabelAr: 'عطلة مدرسية حالياً',
    badgeColor: 'bg-emerald-50 text-emerald-800 border-emerald-200',
  },
  'u2-l6-6': {
    imageUrl: '/images/dialogue/u2-l6-2.jpg',
    captionAr: 'ياسر مستغرب تماماً: عطلة في شهر كانون الأول!',
    badgeLabelAr: 'عطلة في كانون الأول (December)',
    badgeColor: 'bg-amber-50 text-amber-800 border-amber-200',
  },
  'u2-l6-7': {
    imageUrl: '/images/dialogue/u2-l6-3.jpg',
    captionAr: 'الفصول الثلاثة في إنجلترا: خريف، ربيع، وصيف، مع عطل أعياد الميلاد والربيع والصيف',
    badgeLabelAr: 'فصول إنجلترا الثلاثة (Three terms)',
    badgeColor: 'bg-orange-50 text-orange-800 border-orange-200',
  },
  'u2-l6-8': {
    imageUrl: '/images/dialogue/u2-l6-3.jpg',
    captionAr: 'السنة تبدأ في أيلول، وعطلة منتصف الفصل (Half-term holiday) أسبوع في منتصف كل فصل',
    badgeLabelAr: 'عطلة منتصف الفصل (Half-term)',
    badgeColor: 'bg-amber-50 text-amber-800 border-amber-200',
  },
  'u2-l6-9': {
    imageUrl: '/images/dialogue/u2-l6-4.jpg',
    captionAr: 'نظام الكورسات في العراق (Semesters)، ومقارنة عيد الجيش العراقي الثابت بالأعياد المتغيرة',
    badgeLabelAr: 'نظام الفصول بالعراق وعيد الجيش (Jan 6)',
    badgeColor: 'bg-emerald-50 text-emerald-800 border-emerald-200',
  },
  'u2-l6-10': {
    imageUrl: '/images/dialogue/u2-l6-5.jpg',
    captionAr: 'أجواء عيد الفطر المبارك السعيدة وتقديم الكليجة واجتماع العائلة',
    badgeLabelAr: 'عيد الفطر المبارك (Eid al-Fitr)',
    badgeColor: 'bg-rose-50 text-rose-800 border-rose-200',
  },

  // ==========================================
  // UNIT 2 - LESSON 7: Bobsleighing: the fastest winter sport
  // Track 21: Bobsleighing Questions & Answers
  // ==========================================
  'u2-l7-t21-1': {
    imageUrl: '/images/lessons/u2-lesson-7.jpg',
    captionAr: 'سرعة التزلج بالزلاجة الجماعية وشعور الجاذبية الجارف على مسار الجليد المنحدر',
    badgeLabelAr: 'رياضة الزلاجة الجماعية (Bobsleighing)',
    badgeColor: 'bg-cyan-50 text-cyan-800 border-cyan-200',
  },
  'u2-l7-t21-2': {
    imageUrl: '/images/dialogue/u2-l7-1.jpg',
    captionAr: 'انطلاق الفريق الرباعي ودفع الزلاجة بأقصى سرعة ثم القفز داخلها بمهارة رياضية فائقة',
    badgeLabelAr: 'دفع الزلاجة والقفز (Push & Jump)',
    badgeColor: 'bg-blue-50 text-blue-800 border-blue-200',
  },
  'u2-l7-t21-3': {
    imageUrl: '/images/dialogue/u2-l7-2.jpg',
    captionAr: 'سؤال الفتاة: هل يمكن السيطرة والتحكم في اتجاه الزلاجة؟',
    badgeLabelAr: 'التحكم في الزلاجة (Control)',
    badgeColor: 'bg-indigo-50 text-indigo-800 border-indigo-200',
  },
  'u2-l7-t21-4': {
    imageUrl: '/images/dialogue/u2-l7-2.jpg',
    captionAr: 'السائق يسحب مقابض الأسلاك المعدنية لتوجيه الزلاجة يميناً ويساراً في المنعطفات الحادة',
    badgeLabelAr: 'أسلاك التوجيه (Steering wire)',
    badgeColor: 'bg-indigo-50 text-indigo-800 border-indigo-200',
  },
  'u2-l7-t21-5': {
    imageUrl: '/images/dialogue/u2-l7-3.jpg',
    captionAr: 'سؤال الفتاة عن وجود المكابح والفرامل بالزلاجة',
    badgeLabelAr: 'سؤال المكابح (Brakes)',
    badgeColor: 'bg-amber-50 text-amber-800 border-amber-200',
  },
  'u2-l7-t21-6': {
    imageUrl: '/images/dialogue/u2-l7-3.jpg',
    captionAr: 'رجل المكابح بالخلف يسحب المقابض بقوة لتناثر الجليد والتوقف بعد اجتياز خط النهاية',
    badgeLabelAr: 'المكابح بعد النهاية (Finish line)',
    badgeColor: 'bg-orange-50 text-orange-800 border-orange-200',
  },
  'u2-l7-t21-7': {
    imageUrl: '/images/dialogue/u2-l7-4.jpg',
    captionAr: 'سؤال الفتاة عن السرعة القصوى التي يمكن أن تبلغها الزلاجة',
    badgeLabelAr: 'سؤال السرعة (How fast?)',
    badgeColor: 'bg-rose-50 text-rose-800 border-rose-200',
  },
  'u2-l7-t21-8': {
    imageUrl: '/images/dialogue/u2-l7-4.jpg',
    captionAr: 'سرعة قياسية خارقة: 150 كم/ساعة طبيعياً، ورقم قياسي عالمي 201 كم/ساعة أسرع من سيارة الطريق السريع',
    badgeLabelAr: 'رقم قياسي عالمي (201 km/h!)',
    badgeColor: 'bg-red-50 text-red-800 border-red-200',
  },
  'u2-l7-t21-9': {
    imageUrl: '/images/dialogue/u2-l7-2.jpg',
    captionAr: 'سؤال الفتاة: هل هي رياضة خطيرة؟',
    badgeLabelAr: 'سؤال الخطورة (Is it dangerous?)',
    badgeColor: 'bg-amber-50 text-amber-800 border-amber-200',
  },
  'u2-l7-t21-10': {
    imageUrl: '/images/dialogue/u2-l7-2.jpg',
    captionAr: 'ارتداء الخوذات وملابس الحماية والتدريب المكثف مع احتمالية وقوع حوادث واصطدامات',
    badgeLabelAr: 'خوذات وحماية (Helmets & Protection)',
    badgeColor: 'bg-purple-50 text-purple-800 border-purple-200',
  },
  'u2-l7-t21-11': {
    imageUrl: '/images/dialogue/u2-l7-1.jpg',
    captionAr: 'سؤال الفتاة عن مهام كل فرد من أعضاء الفريق الأربعة',
    badgeLabelAr: 'أدوار الفريق (Team members)',
    badgeColor: 'bg-blue-50 text-blue-800 border-blue-200',
  },
  'u2-l7-t21-12': {
    imageUrl: '/images/dialogue/u2-l7-1.jpg',
    captionAr: 'السائق يقود، والآخر يتحكم بالمكابح، واثنان يدفعان الزلاجة بقوة ويمنحانها وزناً وسرعة إضافية',
    badgeLabelAr: 'سائق ومكابح ودفع (Driver & Brakeman)',
    badgeColor: 'bg-emerald-50 text-emerald-800 border-emerald-200',
  },
  'u2-l7-t21-13': {
    imageUrl: '/images/dialogue/u2-l7-5.jpg',
    captionAr: 'سؤال مرح: هل يستطيع اللاعب إغماض عينيه أثناء الانطلاق؟',
    badgeLabelAr: 'إغماض العينين (Close your eyes?)',
    badgeColor: 'bg-teal-50 text-teal-800 border-teal-200',
  },
  'u2-l7-t21-14': {
    imageUrl: '/images/dialogue/u2-l7-5.jpg',
    captionAr: 'جواب طريف: ليست فكرة جيدة للسائق! لكن بقية أعضاء الفريق يمكنهم ذلك وسط احتفال التتويج',
    badgeLabelAr: 'تتويج الأبطال (Medal podium)',
    badgeColor: 'bg-amber-50 text-amber-800 border-amber-200',
  },

  // ==========================================
  // UNIT 2 - LESSON 8: Eid al-Fitr
  // Track 22: Explaining Eid al-Fitr to Simon
  // ==========================================
  'u2-l8-t22-intro-1': {
    imageUrl: '/images/lessons/u2-lesson-8.jpg',
    captionAr: 'سؤال سايمون الفضولي: ما هو عيد الفطر؟',
    badgeLabelAr: 'ما هو عيد الفطر؟',
    badgeColor: 'bg-amber-50 text-amber-800 border-amber-200',
  },
  'u2-l8-t22-intro-2': {
    imageUrl: '/images/lessons/u2-lesson-8.jpg',
    captionAr: 'ياسر يدعو سايمون لمقابلة والده ليحدثه عن العيد',
    badgeLabelAr: 'لقاء والد ياسر',
    badgeColor: 'bg-blue-50 text-blue-800 border-blue-200',
  },
  'u2-l8-t22-1': {
    imageUrl: '/images/lessons/u2-lesson-8.jpg',
    captionAr: 'ياسر يقدم صديقه سايمون القادم من إنجلترا لوالده في غرفة المعيشة',
    badgeLabelAr: 'تعارف مع الوالد (Meeting Dad)',
    badgeColor: 'bg-emerald-50 text-emerald-800 border-emerald-200',
  },
  'u2-l8-t22-2': {
    imageUrl: '/images/lessons/u2-lesson-8.jpg',
    captionAr: 'الوالد يرحب بسايمون ويسأله عن معرفته بشهر رمضان المبارك',
    badgeLabelAr: 'شهر رمضان المبارك',
    badgeColor: 'bg-cyan-50 text-cyan-800 border-cyan-200',
  },
  'u2-l8-t22-3': {
    imageUrl: '/images/lessons/u2-lesson-8.jpg',
    captionAr: 'سايمون يوضح بأدب أنه لا يملك فكرة سابقة عن رمضان',
    badgeLabelAr: 'استفسار سايمون',
    badgeColor: 'bg-amber-50 text-amber-800 border-amber-200',
  },
  'u2-l8-t22-4': {
    imageUrl: '/images/dialogue/u2-l8-1.jpg',
    captionAr: 'الصيام في رمضان: الامتناع عن الطعام والشراب من الفجر حتى مغيب الشمس',
    badgeLabelAr: 'الصيام من الفجر للمغرب (Fasting)',
    badgeColor: 'bg-indigo-50 text-indigo-800 border-indigo-200',
  },
  'u2-l8-t22-5': {
    imageUrl: '/images/dialogue/u2-l8-1.jpg',
    captionAr: 'دهشة سايمون: أليس ذلك صعباً؟ ألا تأكلون طوال النهار؟',
    badgeLabelAr: 'دهشة سايمون من الصيام',
    badgeColor: 'bg-rose-50 text-rose-800 border-rose-200',
  },
  'u2-l8-t22-6': {
    imageUrl: '/images/dialogue/u2-l8-2.jpg',
    captionAr: 'وجبة الإفطار العائلية عند غروب الشمس بفرح وابتهاج بطاعة الله وصحة البدن',
    badgeLabelAr: 'إفطار الصائمين (Iftar at sunset)',
    badgeColor: 'bg-emerald-50 text-emerald-800 border-emerald-200',
  },
  'u2-l8-t22-6b': {
    imageUrl: '/images/dialogue/u2-l8-3.jpg',
    captionAr: 'ذكرى الوالد بالصيام في صيف إنجلترا الطويل من 5 صباحاً حتى 9:30 ليلاً',
    badgeLabelAr: 'صيام صيف إنجلترا (5am to 9:30pm)',
    badgeColor: 'bg-blue-50 text-blue-800 border-blue-200',
  },
  'u2-l8-t22-6c': {
    imageUrl: '/images/dialogue/u2-l8-3.jpg',
    captionAr: 'إعجاب سايمون بالصبر وإعادة السؤال عن ماهية عيد الفطر',
    badgeLabelAr: 'ما هو عيد الفطر؟',
    badgeColor: 'bg-amber-50 text-amber-800 border-amber-200',
  },
  'u2-l8-t22-6d': {
    imageUrl: '/images/lessons/u2-lesson-8.jpg',
    captionAr: 'الوالد يبتسم ويعود للحديث عن فرحة العيد',
    badgeLabelAr: 'ابتسامة الوالد',
    badgeColor: 'bg-teal-50 text-teal-800 border-teal-200',
  },
  'u2-l8-t22-8': {
    imageUrl: '/images/dialogue/u2-l8-4.jpg',
    captionAr: 'عيد الفطر: مهرجان الفرح بختام رمضان والإفطار في وضح النهار',
    badgeLabelAr: 'مهرجان ختام رمضان (Festival)',
    badgeColor: 'bg-purple-50 text-purple-800 border-purple-200',
  },
  'u2-l8-t22-9': {
    imageUrl: '/images/dialogue/u2-l8-4.jpg',
    captionAr: 'صلاة العيد في باحة المسجد، وتقديم الصدقات والهدايا للفقراء، وصلة الأرحام',
    badgeLabelAr: 'صلاة العيد والصدقات (Pray & Charity)',
    badgeColor: 'bg-emerald-50 text-emerald-800 border-emerald-200',
  },
  'u2-l8-t22-10': {
    imageUrl: '/images/dialogue/u2-l8-5.jpg',
    captionAr: 'استفسار سايمون عن معنى عبارة: عيد مبارك!',
    badgeLabelAr: 'معنى عيد مبارك؟',
    badgeColor: 'bg-amber-50 text-amber-800 border-amber-200',
  },
  'u2-l8-t22-11': {
    imageUrl: '/images/dialogue/u2-l8-5.jpg',
    captionAr: 'الوالد يوضح: تعني عطلة سعيدة (Happy Eid)، مع تقديم صواني الكليجة العراقية واحتفال العائلة',
    badgeLabelAr: 'كليجة واحتفال (Eid Mubarak!)',
    badgeColor: 'bg-rose-50 text-rose-800 border-rose-200',
  },
  'u2-l8-t22-12': {
    imageUrl: '/images/lessons/u2-lesson-8.jpg',
    captionAr: 'شكر سايمون على الحديث الشيق والمعلومات الممتعة عن تقاليد العيد',
    badgeLabelAr: 'شكر وتقدير (Thank you)',
    badgeColor: 'bg-blue-50 text-blue-800 border-blue-200',
  },
  'u2-l8-t22-13': {
    imageUrl: '/images/lessons/u2-lesson-8.jpg',
    captionAr: 'الوالد يرحب بسايمون: على الرحب والسعة (Not at all)',
    badgeLabelAr: 'على الرحب والسعة (Not at all)',
    badgeColor: 'bg-teal-50 text-teal-800 border-teal-200',
  },

  // ==========================================
  // UNIT 2 - LESSON 9: Round up
  // Unit 2 Review Summary
  // ==========================================
  'u2-l9-1': {
    imageUrl: '/images/dialogue/u2-l9-1.jpg',
    captionAr: 'مراجعة التعبير عن المستقبل والطقس: غداً سيكون بارداً وعاصفاً صباحاً، ومشمساً بعد الظهر، والحرارة 14 درجة',
    badgeLabelAr: 'توقعات المستقبل (will / won\'t)',
    badgeColor: 'bg-indigo-50 text-indigo-800 border-indigo-200',
  },
  'u2-l9-2': {
    imageUrl: '/images/dialogue/u2-l9-2.jpg',
    captionAr: 'مراجعة كتابة وقراءة التواريخ وأعياد الميلاد: 21st April و 4th December مع بطاقات الهدايا',
    badgeLabelAr: 'نطق وكتابة التواريخ (Dates)',
    badgeColor: 'bg-emerald-50 text-emerald-800 border-emerald-200',
  },
  'u2-l9-3': {
    imageUrl: '/images/dialogue/u2-l9-3.jpg',
    captionAr: 'مراجعة طقس فصول السنة الأربعة: الشتاء بارد دائماً، الربيع ماطر، الصيف حار، والخريف عاصف بالرياح',
    badgeLabelAr: 'فصول السنة الأربعة (Four Seasons)',
    badgeColor: 'bg-amber-50 text-amber-800 border-amber-200',
  },
  'u2-l9-4': {
    imageUrl: '/images/dialogue/u2-l9-4.jpg',
    captionAr: 'قاعدة المستقبل البسيط: استخدام will للإثبات و won’t للنفي مع الأفعال المصدرية',
    badgeLabelAr: 'قاعدة المستقبل (will / won\'t)',
    badgeColor: 'bg-teal-50 text-teal-800 border-teal-200',
  },
  'u2-l9-5': {
    imageUrl: '/images/dialogue/u2-l9-5.jpg',
    captionAr: 'احتفال الطلاب بإتمام مراجعة الوحدة الثانية بنجاح وتفوق!',
    badgeLabelAr: 'إنجاز الوحدة الثانية (Unit 2 Done!)',
    badgeColor: 'bg-rose-50 text-rose-800 border-rose-200',
  },

  // ==========================================
  // UNIT 2 - LESSON 10: Story time: New Year's Day in London
  // Track 23: Riding the London Eye in a snowstorm
  // ==========================================
  'u2-l10-1': {
    imageUrl: '/images/lessons/u2-lesson-10.jpg',
    captionAr: 'ياسر مع والديه وأخته هالة في لندن في صباح بارد من أول أيام العام الجديد أمام عين لندن',
    badgeLabelAr: 'أول أيام العام الجديد (1st January)',
    badgeColor: 'bg-indigo-50 text-indigo-800 border-indigo-200',
  },
  'u2-l10-2': {
    imageUrl: '/images/dialogue/u2-l10-1.jpg',
    captionAr: 'عين لندن: عجلة دوارة عملاقة بارتفاع 135 متراً على ضفة التايمز تطل على أرجاء لندن حتى 80 كم',
    badgeLabelAr: 'عين لندن والتايمز (135m high)',
    badgeColor: 'bg-cyan-50 text-cyan-800 border-cyan-200',
  },
  'u2-l10-3': {
    imageUrl: '/images/dialogue/u2-l10-1.jpg',
    captionAr: 'الخروج بعد الفطور في شوارع لندن الهادئة بعد احتفالات ليلة رأس السنة الصاخبة',
    badgeLabelAr: 'شوارع لندن في الصباح',
    badgeColor: 'bg-blue-50 text-blue-800 border-blue-200',
  },
  'u2-l10-4': {
    imageUrl: '/images/dialogue/u2-l10-1.jpg',
    captionAr: 'تقاليد ليلة رأس السنة: الاحتفالات، زيارة الأصدقاء، وتشابك الأيدي وإنشاد الأغاني عند منتصف الليل',
    badgeLabelAr: 'ليلة رأس السنة (New Year\'s Eve)',
    badgeColor: 'bg-purple-50 text-purple-800 border-purple-200',
  },
  'u2-l10-5': {
    imageUrl: '/images/dialogue/u2-l10-2.jpg',
    captionAr: 'الصعود لكابينة عين لندن، ومع إغلاق الأبواب يبدأ الثلج بالهطول وياسر يصرخ بحماس: إنها تثلج يا هالة!',
    badgeLabelAr: 'صعود الكابينة وبدء الثلج (It\'s snowing!)',
    badgeColor: 'bg-sky-50 text-sky-800 border-sky-200',
  },
  'u2-l10-6': {
    imageUrl: '/images/dialogue/u2-l10-3.jpg',
    captionAr: 'الارتفاع للقمة 135 متراً والدخول في سحابة بيضاء ناصعة لا يرى فيها سوى الثلج المتطاير',
    badgeLabelAr: 'في قلب السحابة البيضاء (White cloud)',
    badgeColor: 'bg-slate-50 text-slate-800 border-slate-300',
  },
  'u2-l10-7': {
    imageUrl: '/images/dialogue/u2-l10-4.jpg',
    captionAr: 'داخل الكابينة في القمة: ياسر يسأل هالة بارتباك: هل أنت خائفة؟ والوالدان صامتان بترقب مشوق',
    badgeLabelAr: 'هل أنت خائفة؟ (Are you frightened?)',
    badgeColor: 'bg-amber-50 text-amber-800 border-amber-200',
  },
  'u2-l10-8': {
    imageUrl: '/images/dialogue/u2-l10-5.jpg',
    captionAr: 'الهبوط بسلام إلى الأرض وسط منظر شتوي ساحر للندن المغطاة بالثلوج الناصعة.. ذكرى لا تُنسى!',
    badgeLabelAr: 'يوم لا ينسى في لندن (Never forget)',
    badgeColor: 'bg-emerald-50 text-emerald-800 border-emerald-200',
  },
};
