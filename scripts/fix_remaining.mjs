import fs from 'fs';

// 1. App.tsx
let appLines = fs.readFileSync('src/App.tsx', 'utf8').split('\n');

for (let i = 0; i < appLines.length; i++) {
  let line = appLines[i];
  if (line.includes('trialMinutesRemaining')) {
    appLines[i] = '                فترة تجريبية مجانية للمنصة: متبقي لك ({trialMinutesRemaining} دقيقة)';
  } else if (line.includes('1. Ø§Ù„Ø§Ø³ØªÙ…Ø§Ø¹')) {
    appLines[i] = '                      <span>1. الاستماع والقراءة التفاعلية</span>';
  } else if (line.includes('2. ØªÙ…Ø§Ø±ÙŠÙ†')) {
    appLines[i] = '                      <span>2. تمارين كتاب النشاط التفاعلية</span>';
  } else if (line.includes('English for Iraq') && line.includes('Ø§Ù„ØµÙ')) {
    appLines[i] = '          <span>English for Iraq • الصف الأول المتوسط • إعداد وإشراف مدرس المادة</span>';
  } else if (line.includes('Ø£Ù†Øª Ù…Ø³Ø¬Ù„ Ø­Ø§Ù„ÙŠØ§Ù‹')) {
    appLines[i] = '                  أنت مسجل حالياً كأستاذ المادة. للاطلاع على درجات وسجلات جميع الطلاب، يرجى فتح لوحة تحكم الأستاذ.';
  } else if (line.includes('Ù ØªØ­ لوحة تحكم الأستاذ')) {
    appLines[i] = '                  فتح لوحة تحكم الأستاذ';
  } else if (line.includes('Ø£Ù†Øª Ù ÙŠ ÙˆØ¶Ø¹:')) {
    appLines[i] = '              أنت في وضع: أستاذ المادة';
  } else if (line.includes('ØªÙ… Ù‚Ù Ù„ Ù‡Ø°Ø§ Ø§Ù„Ø¯Ø±Ø³')) {
    appLines[i] = '                        تم قفل هذا الدرس من قبل مدرس المادة';
  } else if (line.includes('Ø§Ù†ØªÙ‡Øª Ù ØªØ±Ø© Ø§Ù„ØªØ¬Ø±Ø¨Ø©')) {
    appLines[i] = "                  ? 'انتهت فترة التجربة المجانية (ساعة واحدة)'";
  } else if (line.includes('Ø§Ù†ØªÙ‡Øª Ù ØªØ±Ø© Ø§Ø´ØªØ±Ø§ÙƒÙƒ')) {
    appLines[i] = "                  : 'انتهت فترة اشتراكك الإلكتروني'}";
  } else if (line.includes('Ù„Ù‚Ø¯ Ø§Ù†ØªÙ‡Øª Ù ØªØ±Ø© Ø§Ù„Ù…Ø¹Ø§ÙŠÙ†Ø©')) {
    appLines[i] = "                  ? 'لقد انتهت فترة المعاينة التجريبية للمنصة (60 دقيقة). للاشتراك ومواصلة التعلم، يرجى التواصل مع مدرس المادة.'";
  }
}

fs.writeFileSync('src/App.tsx', appLines.join('\n'), 'utf8');

// 2. firebase.ts
let fbLines = fs.readFileSync('src/services/firebase.ts', 'utf8').split('\n');

for (let i = 0; i < fbLines.length; i++) {
  let line = fbLines[i];
  if (line.includes('const groupC')) {
    fbLines[i] = "  const groupC = ['ص', 'ض', 'ط', 'ظ', 'ع', 'غ', 'ف'];";
  } else if (line.includes("return 'Ø¬Ù‡Ø§Ø² ØºÙŠØ±")) {
    fbLines[i] = "  if (typeof navigator === 'undefined') return 'جهاز غير معروف';";
  } else if (line.includes("return 'Ù‡Ø§ØªÙ")) {
    fbLines[i] = "  if (/Android/.test(ua)) return 'هاتف Android';";
  } else if (line.includes("return 'Ù…ØªØµÙ")) {
    fbLines[i] = "  return 'متصفح هاتف / حاسوب';";
  } else if (line.includes('message: \'ÙƒÙˆØ¯ Ø§Ù„Ø§Ø´ØªØ±Ø§Ùƒ')) {
    fbLines[i] = "    return { success: false, expiresAt: '', message: 'كود الاشتراك غير موجود في النظام.' };";
  } else if (line.includes('message: \'Ø¹Ø°Ø±Ø§Ù‹ØŒ Ù‡Ø°Ø§ Ø§Ù„Ø­Ø³Ø§Ø¨')) {
    fbLines[i] = "        message: 'عذراً، هذا الحساب مقفل على جهاز آخر. يرجى التواصل مع مدرس المادة لفك قفل الجهاز ونقله إلى هذا الهاتف.',";
  } else if (line.includes('message: `Ù‡Ø°Ø§ Ø§Ù„ÙƒÙˆØ¯')) {
    fbLines[i] = "        message: `هذا الكود مستخدم بالفعل لطالب آخر (${existingSub.usedByStudentName}) ولا يمكن استخدامه باسم مختلف.`,";
  }
}

fs.writeFileSync('src/services/firebase.ts', fbLines.join('\n'), 'utf8');
console.log('All remaining lines replaced cleanly!');
