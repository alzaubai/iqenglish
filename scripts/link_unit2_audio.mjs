import fs from 'fs';
import path from 'path';

const projectRoot = 'C:/Users/Lenovo/.gemini/antigravity/scratch/english-for-iraq-unit-1';
const unit2DataPath = path.join(projectRoot, 'src/data/unit2Data.ts');
let content = fs.readFileSync(unit2DataPath, 'utf8');

const targetLessons = [1, 2, 3, 4, 6, 8, 9, 10];
let updatedCount = 0;

for (const lessonNum of targetLessons) {
  const lessonDir = path.join(projectRoot, `public/audio/unit-2/lesson-${lessonNum}`);
  if (!fs.existsSync(lessonDir)) continue;

  const files = fs.readdirSync(lessonDir).filter((f) => f.endsWith('.mp3'));
  for (const file of files) {
    const lineId = file.replace('.mp3', '');
    const audioUrl = `/audio/unit-2/lesson-${lessonNum}/${file}`;

    // Regex to find line object with this ID and inject or update audioFileUrl
    const idRegex = new RegExp(`(id:\\s*'${lineId}',[\\s\\S]*?textAr:\\s*['"\`][\\s\\S]*?['"\`],)`, 'g');
    content = content.replace(idRegex, (match) => {
      if (match.includes('audioFileUrl:')) {
        return match.replace(/audioFileUrl:\s*['"][^'"]+['"],/, `audioFileUrl: '${audioUrl}',`);
      }
      updatedCount++;
      return `${match}\n            audioFileUrl: '${audioUrl}',`;
    });
  }
}

// Ensure track audioFileUrls are pointing to the generated track files
const publicUnit2Dir = path.join(projectRoot, 'public/audio/unit-2');
const trackFiles = fs.readdirSync(publicUnit2Dir).filter((f) => f.startsWith('track') && f.endsWith('.mp3'));
for (const trackFile of trackFiles) {
  const trackNumMatch = trackFile.match(/track(\d+)\.mp3/);
  if (trackNumMatch) {
    const trackNum = trackNumMatch[1];
    const trackAudioUrl = `/audio/unit-2/${trackFile}`;
    const trackRegex = new RegExp(`(audioTrackNumber:\\s*${trackNum},[\\s\\S]*?audioFileUrl:\\s*['"])[^'"]+(['"])`, 'g');
    content = content.replace(trackRegex, `$1${trackAudioUrl}$2`);
  }
}

fs.writeFileSync(unit2DataPath, content, 'utf8');
console.log(`Successfully updated ${updatedCount} lines with audioFileUrl in unit2Data.ts`);
