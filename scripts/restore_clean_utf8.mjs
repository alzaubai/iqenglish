import fs from 'fs';

// ==========================================
// 1. FIX src/App.tsx
// ==========================================
let app = fs.readFileSync('src/App.tsx', 'utf8');

const appReplacements = [
  // Trial bar
  ['Ù ØªØ±Ø© ØªØ¬Ø±ÙŠØ¨ÙŠØ© Ù…Ø¬Ø§Ù†ÙŠØ© Ù„Ù„Ù…Ù†ØµØ©: Ù…ØªØ¨Ù‚ÙŠ Ù„Ùƒ ({trialMinutesRemaining} Ø¯Ù‚ÙŠÙ‚Ø©)', 'فترة تجريبية مجانية للمنصة: متبقي لك ({trialMinutesRemaining} دقيقة)'],
  
  // Navigation buttons & titles
  ['title="Ø§Ù„Ø¹ÙˆØ¯Ø© Ù„Ù‚Ø§Ø¦Ù…Ø© Ø§Ù„Ø¯Ø±ÙˆØ³"', 'title="العودة لقائمة الدروس"'],
  ['aria-label="Ø§Ù„Ø¹ÙˆØ¯Ø© Ù„Ù‚Ø§Ø¦Ù…Ø© Ø§Ù„Ø¯Ø±ÙˆØ³"', 'aria-label="العودة لقائمة الدروس"'],
  ["{selectedUnitId === 'unit-2' ? 'Ø§Ù„ÙˆØ­Ø¯Ø© Ø§Ù„Ø«Ø§Ù†ÙŠØ©' : 'Ø§Ù„ÙˆØ­Ø¯Ø© Ø§Ù„Ø£ÙˆÙ„Ù‰'}", '{getUnitLabelAr(selectedUnitId)}'],
  ['Ù‡Ø°Ø§ Ø§Ù„Ø¯Ø±Ø³ Ù…ØºÙ„Ù‚ Ø­Ø§Ù„ÙŠØ§Ù‹', 'هذا الدرس مغلق حالياً'],
  ['ØªÙ… Ù‚Ù Ù„ Ù‡Ø°Ø§ Ø§Ù„Ø¯Ø±Ø³ Ù…Ù† Ù‚Ø¨Ù„ Ù…Ø¯Ø±Ø³ Ø§Ù„Ù…Ø§Ø¯Ø©: Ø£. Ø­Ø³Ø§Ù… Ù…Ø­Ù…ÙˆØ¯ Ù…Ù†ØµÙˆØ±', 'تم قفل هذا الدرس من قبل مدرس المادة'],
  ['<span>Ø§Ù„Ø¹ÙˆØ¯Ø© Ù„Ù‚Ø§Ø¦Ù…Ø© Ø§Ù„Ø¯Ø±ÙˆØ³ Ø§Ù„Ù…ØªØ§Ø­Ø©</span>', '<span>العودة لقائمة الدروس المتاحة</span>'],
  
  // Prev / Next tooltips and labels
  ["title={currentLesson.lessonNumber === 1 ? 'Ø§Ù„Ø¯Ø±Ø³ Ø§Ù„Ø£ÙˆÙ„' : !isPrevUnlocked ? 'Ø§Ù„Ø¯Ø±Ø³ Ø§Ù„Ø³Ø§Ø¨Ù‚ Ù…ØºÙ„Ù‚' : 'Ø§Ù„Ø¯Ø±Ø³ Ø§Ù„Ø³Ø§Ø¨Ù‚'}", "title={currentLesson.lessonNumber === 1 ? 'الدرس الأول' : !isPrevUnlocked ? 'الدرس السابق مغلق' : 'الدرس السابق'}"],
  ['Ø§Ù„Ø¯Ø±Ø³ {currentLesson.lessonNumber} Ù…Ù† 10', 'الدرس {currentLesson.lessonNumber} من 10'],
  ["title={currentLesson.lessonNumber === 10 ? 'Ø§Ù„Ø¯Ø±Ø³ Ø§Ù„Ø£Ø®ÙŠØ±' : !isNextUnlocked ? 'Ø§Ù„Ø¯Ø±Ø³ Ø§Ù„ØªØ§Ù„ÙŠ Ù…ØºÙ„Ù‚' : 'Ø§Ù„Ø¯Ø±Ø³ Ø§Ù„ØªØ§Ù„ÙŠ'}", "title={currentLesson.lessonNumber === 10 ? 'الدرس الأخير' : !isNextUnlocked ? 'الدرس التالي مغلق' : 'الدرس التالي'}"],
  
  // Section headings (The main report from user!)
  ['<span>1. Ø§Ù„Ø§Ø³ØªÙ…Ø§Ø¹ ÙˆØ§Ù„Ù‚Ø±Ø§Ø¡Ø© Ø§Ù„ØªÙ Ø§Ø¹Ù„ÙŠØ©</span>', '<span>1. الاستماع والقراءة التفاعلية</span>'],
  ['<span>2. ØªÙ…Ø§Ø±ÙŠÙ† ÙƒØªØ§Ø¨ Ø§Ù„Ù†Ø´Ø§Ø· Ø§Ù„ØªÙ Ø§Ø¹Ù„ÙŠØ©</span>', '<span>2. تمارين كتاب النشاط التفاعلية</span>'],
  
  // Bottom nav
  ['<span>Ø§Ù„Ø¯Ø±Ø³ Ø§Ù„Ø³Ø§Ø¨Ù‚</span>', '<span>الدرس السابق</span>'],
  ["Ù‚Ø§Ø¦Ù…Ø© Ø¯Ø±ÙˆØ³ {selectedUnitId === 'unit-2' ? 'Ø§Ù„ÙˆØ­Ø¯Ø© Ø§Ù„Ø«Ø§Ù†ÙŠØ©' : 'Ø§Ù„ÙˆØ­Ø¯Ø© Ø§Ù„Ø£ÙˆÙ„Ù‰'} (10 Ø¯Ø±ÙˆØ³)", 'قائمة دروس {getUnitLabelAr(selectedUnitId)}'],
  ['<span>Ø§Ù„Ø¯Ø±Ø³ Ø§Ù„ØªØ§Ù„ÙŠ</span>', '<span>الدرس التالي</span>'],
  
  // Teacher mode footer
  ['Ø£Ù†Øª Ù…Ø³Ø¬Ù„ Ø­Ø§Ù„ÙŠØ§Ù‹ ÙƒØ£Ø³ØªØ§Ø° Ø§Ù„Ù…Ø§Ø¯Ø©. Ù„Ù„Ø§Ø·Ù„Ø§Ø¹ Ø¹Ù„Ù‰ Ø¯Ø±Ø¬Ø§Øª ÙˆØ³Ø¬Ù„Ø§Øª Ø¬Ù…ÙŠØ¹ Ø§Ù„Ø·Ù„Ø§Ø¨ØŒ ÙŠØ±Ø¬Ù‰ Ù ØªØ­ Ù„ÙˆØ­Ø© ØªØ­ÙƒÙ… Ø§Ù„Ø£Ø³ØªØ§Ø°.', 'أنت مسجل حالياً كأستاذ المادة. للاطلاع على درجات وسجلات جميع الطلاب، يرجى فتح لوحة تحكم الأستاذ.'],
  ['Ù ØªØ­ Ù„ÙˆØ­Ø© ØªØ­ÙƒÙ… Ø§Ù„Ø£Ø³ØªØ§Ø°', 'فتح لوحة تحكم الأستاذ'],
  ['<span>English for Iraq â€¢ Ø§Ù„ØµÙ  Ø§Ù„Ø£ÙˆÙ„ Ø§Ù„Ù…ØªÙˆØ³Ø· â€¢ Ø¥Ø¹Ø¯Ø§Ø¯ ÙˆØ¥Ø´Ø±Ø§Ù  Ù…Ø¯Ø±Ø³ Ø§Ù„Ù…Ø§Ø¯Ø©: Ø£. Ø­Ø³Ø§Ù… Ù…Ø­Ù…ÙˆØ¯ Ù…Ù†ØµÙˆØ±</span>', '<span>English for Iraq • الصف الأول المتوسط • إعداد وإشراف مدرس المادة</span>'],
  ['Ø£Ù†Øª Ù ÙŠ ÙˆØ¶Ø¹: Ø£Ø³ØªØ§Ø° Ø§Ù„Ù…Ø§Ø¯Ø©', 'أنت في وضع: أستاذ المادة'],
  ['Ù„ÙˆØ­Ø© ØªØ­ÙƒÙ… Ø§Ù„Ø£Ø³ØªØ§Ø°', 'لوحة تحكم الأستاذ'],
  ['Ø®Ø±ÙˆØ¬', 'خروج'],
  
  // Student footer
  ['Ø§Ù„Ø·Ø§Ù„Ø¨: <strong>{studentSession.fullName}</strong> (Ø´Ø¹Ø¨Ø© {studentSession.section})', 'الطالب: <strong>{studentSession.fullName}</strong> (شعبة {studentSession.section})'],
  ['title="ØªØ³Ø¬ÙŠÙ„ Ø®Ø±ÙˆØ¬ Ø§Ù„Ø·Ø§Ù„Ø¨ ÙˆØ§Ù„Ø¹ÙˆØ¯Ø© Ù„Ø´Ø§Ø´Ø© Ø§Ù„Ø¨Ø¯Ø§ÙŠØ©"', 'title="تسجيل خروج الطالب والعودة لشاشة البداية"'],
  ['Ø®Ø±ÙˆØ¬ Ø§Ù„Ø·Ø§Ù„Ø¨', 'خروج الطالب'],
  
  // Expiry modal
  ["? 'Ø§Ù†ØªÙ‡Øª Ù ØªØ±Ø© Ø§Ù„ØªØ¬Ø±Ø¨Ø© Ø§Ù„Ù…Ø¬Ø§Ù†ÙŠØ© (Ø³Ø§Ø¹Ø© ÙˆØ§Ø­Ø¯Ø©)'", "? 'انتهت فترة التجربة المجانية (ساعة واحدة)'"],
  [": 'Ø§Ù†ØªÙ‡Øª Ù ØªØ±Ø© Ø§Ø´ØªØ±Ø§ÙƒÙƒ Ø§Ù„Ø¥Ù„ÙƒØªØ±ÙˆÙ†ÙŠ'}", ": 'انتهت فترة اشتراكك الإلكتروني'}"],
  ['Ø¹Ø²ÙŠØ²ÙŠ Ø§Ù„Ø·Ø§Ù„Ø¨ <strong className="text-slate-800">{studentSession.fullName}</strong>ØŒ', 'عزيزي الطالب <strong className="text-slate-800">{studentSession.fullName}</strong>،'],
  ["? 'Ù„Ù‚Ø¯ Ø§Ù†ØªÙ‡Øª Ù ØªØ±Ø© Ø§Ù„Ù…Ø¹Ø§ÙŠÙ†Ø© Ø§Ù„ØªØ¬Ø±ÙŠØ¨ÙŠØ© Ù„Ù„Ù…Ù†ØµØ© (60 Ø¯Ù‚ÙŠÙ‚Ø©). Ù„Ù„Ø§Ø´ØªØ±Ø§Ùƒ ÙˆÙ…ÙˆØ§ØµÙ„Ø© Ø§Ù„ØªØ¹Ù„Ù…ØŒ ÙŠØ±Ø¬Ù‰ Ø§Ù„ØªÙˆØ§ØµÙ„ Ù…Ø¹ Ù…Ø¯Ø±Ø³ Ø§Ù„Ù…Ø§Ø¯Ø© Ø£. Ø­Ø³Ø§Ù… Ù…Ø­Ù…ÙˆØ¯ Ù…Ù†ØµÙˆØ±.'", "? 'لقد انتهت فترة المعاينة التجريبية للمنصة (60 دقيقة). للاشتراك ومواصلة التعلم، يرجى التواصل مع مدرس المادة.'"],
  [": 'Ù„Ù‚Ø¯ Ø§Ù†ØªÙ‡Øª ØµÙ„Ø§Ø­ÙŠØ© Ø§Ù„ÙƒÙˆØ¯ Ø§Ù„Ø®Ø§Øµ Ø¨Ø§Ø´ØªØ±Ø§ÙƒÙƒ. Ù„ØªØ¬Ø¯ÙŠØ¯ Ø§Ù„Ø§Ø´ØªØ±Ø§Ùƒ ÙˆÙ…ÙˆØ§ØµÙ„Ø© Ø§Ù„ØªØ¹Ù„Ù…ØŒ ÙŠØ±Ø¬Ù‰ Ø§Ù„ØªÙˆØ§ØµÙ„ Ù…Ø¹ Ù…Ø¯Ø±Ø³ Ø§Ù„Ù…Ø§Ø¯Ø© Ø£. Ø­Ø³Ø§Ù… Ù…Ø­Ù…ÙˆØ¯ Ù…Ù†ØµÙˆØ±.'}", ": 'لقد انتهت صلاحية الكود الخاص باشتراكك. لتجديد الاشتراك ومواصلة التعلم، يرجى التواصل مع مدرس المادة.'}"],
  ['ØªØ³Ø¬ÙŠÙ„ Ø§Ù„Ø®Ø±ÙˆØ¬ ÙˆØ¥Ø¯Ø®Ø§Ù„ ÙƒÙˆØ¯ Ø¬Ø¯ÙŠØ¯', 'تسجيل الخروج وإدخال كود جديد'],
];

let appFixCount = 0;
for (const [target, replacement] of appReplacements) {
  if (app.includes(target)) {
    app = app.replaceAll(target, replacement);
    appFixCount++;
  }
}

fs.writeFileSync('src/App.tsx', app, 'utf8');
console.log(`src/App.tsx cleaned: replaced ${appFixCount} Mojibake targets`);

// ==========================================
// 2. FIX src/services/firebase.ts
// ==========================================
let fb = fs.readFileSync('src/services/firebase.ts', 'utf8');

const fbReplacements = [
  // Subscription plans
  ["'1_hour': { labelAr: 'ØªØ¬Ø±ÙŠØ¨ÙŠ (Ø³Ø§Ø¹Ø© ÙˆØ§Ø­Ø¯Ø©)'", "'1_hour': { labelAr: 'تجريبي (ساعة واحدة)'"],
  ["'1_month': { labelAr: 'Ø´Ù‡Ø± ÙˆØ§Ø­Ø¯ (30 ÙŠÙˆÙ…)'", "'1_month': { labelAr: 'شهر واحد (30 يوم)'"],
  ["'3_months': { labelAr: '3 Ø£Ø´Ù‡Ø± (90 ÙŠÙˆÙ…)'", "'3_months': { labelAr: '3 أشهر (90 يوم)'"],
  ["'6_months': { labelAr: '6 Ø£Ø´Ù‡Ø± (180 ÙŠÙˆÙ…)'", "'6_months': { labelAr: '6 أشهر (180 يوم)'"],
  ["'1_year': { labelAr: 'Ø³Ù†Ø© ÙƒØ§Ù…Ù„Ø© (365 ÙŠÙˆÙ…)'", "'1_year': { labelAr: 'سنة كاملة (365 يوم)'"],
  ['// Optional buyer name or note from teacher (e.g. "Ø­ÙŠØ¯Ø± - Ø¨ØºØ¯Ø§Ø¯")', '// Optional buyer name or note from teacher (e.g. "حيدر - بغداد")'],
  
  // Section mapping
  ["// Map Arabic name to 4 sections (Ø£ØŒ Ø¨ØŒ Ø¬ØŒ Ø¯) based on alphabetical order of the first letter", "// Map Arabic name to 4 sections (أ، ب، ج، د) based on alphabetical order of the first letter"],
  ["export const mapArabicNameToSection = (fullName: string): 'Ø£' | 'Ø¨' | 'Ø¬' | 'Ø¯' => {", "export const mapArabicNameToSection = (fullName: string): 'أ' | 'ب' | 'ج' | 'د' => {"],
  ["if (!fullName || typeof fullName !== 'string') return 'Ø£';", "if (!fullName || typeof fullName !== 'string') return 'أ';"],
  ["if (!clean) return 'Ø£';", "if (!clean) return 'أ';"],
  ['// If student entered "Ø§Ù„" at the start, check the character after "Ø§Ù„" (e.g. "Ø§Ù„Ù…Ù‡Ø¯ÙŠ" -> "Ù…")', '// If student entered "ال" at the start, check the character after "ال" (e.g. "المهدي" -> "م")'],
  ["if (clean.startsWith('Ø§Ù„') && clean.length > 2) {", "if (clean.startsWith('ال') && clean.length > 2) {"],
  ["// Group Ø£: Ø£, Ø¥, Ø¢, Ø§, Ø¡, Ø¨, Øª, Ø«, Ø¬, Ø­, Ø®", "// Group أ: أ, إ, آ, ا, ء, ب, ت, ث, ج, ح, خ"],
  ["const groupA = ['Ø£', 'Ø¥', 'Ø¢', 'Ø§', 'Ø¡', 'Ø¨', 'Øª', 'Ø«', 'Ø¬', 'Ø­', 'Ø®'];", "const groupA = ['أ', 'إ', 'آ', 'ا', 'ء', 'ب', 'ت', 'ث', 'ج', 'ح', 'خ'];"],
  ["// Group Ø¨: Ø¯, Ø°, Ø±, Ø², Ø³, Ø´", "// Group ب: د, ذ, ر, ز, س, ش"],
  ["const groupB = ['Ø¯', 'Ø°', 'Ø±', 'Ø²', 'Ø³', 'Ø´'];", "const groupB = ['د', 'ذ', 'ر', 'ز', 'س', 'ش'];"],
  ["// Group Ø¬: Øµ, Ø¶, Ø·, Ø¸, Ø¹, Øº, Ù ", "// Group ج: ص, ض, ط, ظ, ع, غ, ف"],
  ["const groupC = ['Øµ', 'Ø¶', 'Ø·', 'Ø¸', 'Ø¹', 'Øº', 'Ù '];", "const groupC = ['ص', 'ض', 'ط', 'ظ', 'ع', 'غ', 'ف'];"],
  ["// Group Ø¯: Ù‚, Ùƒ, Ù„, Ù…, Ù†, Ù‡, Ù‡Ù€, Ùˆ, Ø¤, Ù‰, Ø¦, ÙŠ", "// Group د: ق, ك, ل, م, ن, ه, هـ, و, ؤ, ى, ئ, ي"],
  ["const groupD = ['Ù‚', 'Ùƒ', 'Ù„', 'Ù…', 'Ù†', 'Ù‡', 'Ù‡Ù€', 'Ùˆ', 'Ø¤', 'Ù‰', 'Ø¦', 'ÙŠ'];", "const groupD = ['ق', 'ك', 'ل', 'م', 'ن', 'ه', 'هـ', 'و', 'ؤ', 'ى', 'ئ', 'ي'];"],
  ["if (groupA.includes(firstChar)) return 'Ø£';", "if (groupA.includes(firstChar)) return 'أ';"],
  ["if (groupB.includes(firstChar)) return 'Ø¨';", "if (groupB.includes(firstChar)) return 'ب';"],
  ["if (groupC.includes(firstChar)) return 'Ø¬';", "if (groupC.includes(firstChar)) return 'ج';"],
  ["if (groupD.includes(firstChar)) return 'Ø¯';", "if (groupD.includes(firstChar)) return 'د';"],
  ["return 'Ø£';", "return 'أ';"],
  
  // Section H migration
  ["// Migrate any students and submissions in Section H to sections (Ø£ØŒ Ø¨ØŒ Ø¬ØŒ Ø¯) automatically", "// Migrate any students and submissions in Section H to sections (أ، ب، ج، د) automatically"],
  ["if (sec === 'Ù‡Ù€' || sec === 'Ù‡' || sec === 'Ù‡Ø§Ø¡') {", "if (sec === 'هـ' || sec === 'ه' || sec === 'هاء') {"],
  ["(storedSession.section === 'Ù‡Ù€' ||\r\n          storedSession.section === 'Ù‡' ||\r\n          storedSession.section === 'Ù‡Ø§Ø¡')", "(storedSession.section === 'هـ' ||\r\n          storedSession.section === 'ه' ||\r\n          storedSession.section === 'هاء')"],
  ["(storedSession.section === 'Ù‡Ù€' ||\n          storedSession.section === 'Ù‡' ||\n          storedSession.section === 'Ù‡Ø§Ø¡')", "(storedSession.section === 'هـ' ||\n          storedSession.section === 'ه' ||\n          storedSession.section === 'هاء')"],
  ["if (s.section === 'Ù‡Ù€' || s.section === 'Ù‡' || s.section === 'Ù‡Ø§Ø¡') {", "if (s.section === 'هـ' || s.section === 'ه' || s.section === 'هاء') {"],
  
  // Device detector
  ["if (typeof navigator === 'undefined') return 'Ø¬Ù‡Ø§Ø² ØºÙŠØ± Ù…Ø¹Ø±ÙˆÙ ';", "if (typeof navigator === 'undefined') return 'جهاز غير معروف';"],
  ["if (/Android/.test(ua)) return 'Ù‡Ø§ØªÙ  Android';", "if (/Android/.test(ua)) return 'هاتف Android';"],
  ["if (/Windows/.test(ua)) return 'Ø­Ø§Ø³ÙˆØ¨ Windows';", "if (/Windows/.test(ua)) return 'حاسوب Windows';"],
  ["if (/Macintosh/.test(ua)) return 'Ø­Ø§Ø³ÙˆØ¨ Mac';", "if (/Macintosh/.test(ua)) return 'حاسوب Mac';"],
  ["return 'Ù…ØªØµÙ Ø­ Ù‡Ø§ØªÙ  / Ø­Ø§Ø³ÙˆØ¨';", "return 'متصفح هاتف / حاسوب';"],
  
  // Subscription verification messages
  ["return { success: false, expiresAt: '', message: 'ÙƒÙˆØ¯ Ø§Ù„Ø§Ø´ØªØ±Ø§Ùƒ ØºÙŠØ± Ù…ÙˆØ¬ÙˆØ¯ Ù ÙŠ Ø§Ù„Ù†Ø¸Ø§Ù….' };", "return { success: false, expiresAt: '', message: 'كود الاشتراك غير موجود في النظام.' };"],
  ["message: 'Ø¹Ø°Ø±Ø§Ù‹ØŒ Ù‡Ø°Ø§ Ø§Ù„Ø­Ø³Ø§Ø¨ Ù…Ù‚Ù Ù„ Ø¹Ù„Ù‰ Ø¬Ù‡Ø§Ø² Ø¢Ø®Ø±. ÙŠØ±Ø¬Ù‰ Ø§Ù„ØªÙˆØ§ØµÙ„ Ù…Ø¹ Ø£. Ø­Ø³Ø§Ù… Ù„Ù Ùƒ Ù‚Ù Ù„ Ø§Ù„Ø¬Ù‡Ø§Ø² ÙˆÙ†Ù‚Ù„Ù‡ Ø¥Ù„Ù‰ Ù‡Ø°Ø§ Ø§Ù„Ù‡Ø§ØªÙ .',", "message: 'عذراً، هذا الحساب مقفل على جهاز آخر. يرجى التواصل مع مدرس المادة لفك قفل الجهاز ونقله إلى هذا الهاتف.',"],
  ["message: `Ù‡Ø°Ø§ Ø§Ù„ÙƒÙˆØ¯ Ù…Ø³ØªØ®Ø¯Ù… Ø¨Ø§Ù„Ù Ø¹Ù„ Ù„Ø·Ø§Ù„Ø¨ Ø¢Ø®Ø± (${existingSub.usedByStudentName}) ÙˆÙ„Ø§ ÙŠÙ…ÙƒÙ† Ø§Ø³ØªØ®Ø¯Ø§Ù…Ù‡ Ø¨Ø§Ø³Ù… Ù…Ø®ØªÙ„Ù .`,", "message: `هذا الكود مستخدم بالفعل لطالب آخر (${existingSub.usedByStudentName}) ولا يمكن استخدامه باسم مختلف.`,"],
];

let fbFixCount = 0;
for (const [target, replacement] of fbReplacements) {
  if (fb.includes(target)) {
    fb = fb.replaceAll(target, replacement);
    fbFixCount++;
  }
}

fs.writeFileSync('src/services/firebase.ts', fb, 'utf8');
console.log(`src/services/firebase.ts cleaned: replaced ${fbFixCount} Mojibake targets`);
