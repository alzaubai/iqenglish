import fs from 'fs';
import path from 'path';

const projectRoot = 'C:/Users/Lenovo/.gemini/antigravity/scratch/english-for-iraq-unit-1';
const outputBaseDir = path.join(projectRoot, 'public/audio/unit-3');

for (let num = 1; num <= 10; num++) {
  const filePath = path.join(projectRoot, `src/data/unit3/lesson${num}.ts`);
  if (!fs.existsSync(filePath)) continue;

  let content = fs.readFileSync(filePath, 'utf8');

  // Link individual line audioFileUrl
  const lessonDir = path.join(outputBaseDir, `lesson-${num}`);
  if (fs.existsSync(lessonDir)) {
    const files = fs.readdirSync(lessonDir).filter((f) => f.endsWith('.mp3'));
    for (const file of files) {
      const lineId = file.replace('.mp3', '');
      const audioUrl = `/audio/unit-3/lesson-${num}/${file}`;

      const lineRegex = new RegExp(`(id:\\s*['"]${lineId}['"][\\s\\S]*?textAr:\\s*['"\`][\\s\\S]*?['"\`],)`, 'g');
      content = content.replace(lineRegex, (match) => {
        if (match.includes('audioFileUrl:')) {
          return match.replace(/audioFileUrl:\s*['"][^'"]+['"],/, `audioFileUrl: '${audioUrl}',`);
        }
        return `${match}\n          audioFileUrl: '${audioUrl}',`;
      });
    }
  }

  // Link track audioFileUrl
  content = content.replace(/(audioTrackNumber:\s*(\d+),[\s\S]*?description:\s*['"][^'"]+['"],)/g, (match, p1, trackNum) => {
    const trackAudioUrl = `/audio/unit-3/track${trackNum}.mp3`;
    if (match.includes('audioFileUrl:')) {
      return match.replace(/audioFileUrl:\s*['"][^'"]+['"],/, `audioFileUrl: '${trackAudioUrl}',`);
    }
    return `${match}\n      audioFileUrl: '${trackAudioUrl}',\n      hasGeminiAudio: true,`;
  });

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`[LINKED] lesson${num}.ts`);
}
