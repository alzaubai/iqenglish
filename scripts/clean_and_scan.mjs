import fs from 'fs';
import path from 'path';

const appPath = path.resolve('src/App.tsx');
let appContent = fs.readFileSync(appPath, 'utf8');

const lines = appContent.split(/\r?\n/);
let fixedCount = 0;

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  if (line.includes('ØªÙ… Ù‚Ù Ù„ Ù‡Ø°Ø§ Ø§Ù„Ø¯Ø±Ø³')) {
    lines[i] = '                        تم قفل هذا الدرس من قبل مدرس المادة';
    fixedCount++;
  } else if (line.includes('Ù ØªØ') && line.includes('لوحة تحكم الأستاذ')) {
    lines[i] = '                  فتح لوحة تحكم الأستاذ';
    fixedCount++;
  } else if (line.includes('Ø£Ù†Øª Ù ÙŠ ÙˆØ¶Ø¹')) {
    lines[i] = '                  أنت في وضع: أستاذ المادة';
    fixedCount++;
  } else if (line.includes('Ø§Ù†ØªÙ‡Øª Ù ØªØ±Ø© Ø§Ù„ØªØ¬Ø±Ø¨Ø©')) {
    lines[i] = "                  ? 'انتهت فترة التجربة المجانية (ساعة واحدة)'";
    fixedCount++;
  } else if (line.includes('Ø§Ù†ØªÙ‡Øª Ù ØªØ±Ø© Ø§Ø´ØªØ±Ø§ÙƒÙƒ')) {
    lines[i] = "                  : 'انتهت فترة اشتراكك الإلكتروني'}";
    fixedCount++;
  } else if (line.includes('Ù„Ù‚Ø¯ Ø§Ù†ØªÙ‡Øª Ù ØªØ±Ø© Ø§Ù„Ù…Ø¹Ø§ÙŠÙ†Ø©')) {
    lines[i] = "                  ? 'لقد انتهت فترة المعاينة التجريبية للمنصة (60 دقيقة). للاشتراك ومواصلة التعلم، يرجى التواصل مع مدرس المادة.'";
    fixedCount++;
  }
}

fs.writeFileSync(appPath, lines.join('\n'), 'utf8');
console.log(`Successfully fixed ${fixedCount} lines in src/App.tsx`);

// Now full scan of src/ directory
function getAllFiles(dir, exts) {
  let results = [];
  const list = fs.readdirSync(dir);
  for (const file of list) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      results = results.concat(getAllFiles(fullPath, exts));
    } else if (exts.some(ext => file.endsWith(ext))) {
      results.push(fullPath);
    }
  }
  return results;
}

const files = getAllFiles('src', ['.ts', '.tsx', '.json', '.html']);
const mojibakeRegex = /[ØÙ][\u0080-\u00FF]/g;
const teacherRegex = /حسام|منصور/g;

let issuesFound = 0;
for (const file of files) {
  const content = fs.readFileSync(file, 'utf8');
  const fileLines = content.split(/\r?\n/);
  fileLines.forEach((l, idx) => {
    if (mojibakeRegex.test(l)) {
      console.log(`[Mojibake] ${file}:${idx + 1} -> ${l.trim()}`);
      issuesFound++;
    }
    if (teacherRegex.test(l)) {
      console.log(`[TeacherName] ${file}:${idx + 1} -> ${l.trim()}`);
      issuesFound++;
    }
  });
}

if (issuesFound === 0) {
  console.log('✅ ALL files in src/ are 100% clean! Zero Mojibake tokens and zero teacher name occurrences!');
} else {
  console.log(`⚠️ Found ${issuesFound} issues.`);
}
