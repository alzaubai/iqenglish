import fs from 'fs';
import path from 'path';

const API_KEYS = [
  'sk_ebf5f7f1302c5bc22c793b420aa5e7f1ee4cbbcce75968fa',
  process.env.ELEVENLABS_API_KEY || 'sk_f6b1208f8f71f6a5435da4514e16666e07689228cd26cd79',
  'sk_f4d486de52917fb5d4e1befca662caa7b1a1cc41f63951a1',
  'sk_9d6bd9e07aeb3407c94361704c0306594deb3d9b75f6d5aa',
];
let currentKeyIndex = 0;

// Approved voice palette (Antoni permanently excluded):
const VOICES = {
  Liam: { id: 'TX3LPaxmHKxFdv7VOQHJ', name: 'Liam (Young American Boy / Narrator)' },
  Charlie: { id: 'IKne3meq5aSn9XLyUdCD', name: 'Charlie (Lively Boy)' },
  Will: { id: 'bIHbv24MWmeRgasZH58o', name: 'Will (Youthful Boy)' },
  George: { id: 'JBFqnCBsd6RMkjVDRZzb', name: 'George (Warm American Adult)' },
  Sarah: { id: 'EXAVITQu4vr4xnSDxMaL', name: 'Sarah (Sweet Young Female)' },
  Jessica: { id: 'cgSgspJ2msm6clMCkdW9', name: 'Jessica (Lively Young Female)' },
  Alice: { id: 'Xb7hH8MSUJpSbSDYk0k2', name: 'Alice (Mature Warm Female)' },
};

function getVoiceForLine(speaker, gender) {
  const norm = speaker.trim().toLowerCase();
  // Female roles
  if (norm === 'singer') return VOICES.Sarah;
  if (norm === 'gwen') return VOICES.Sarah;
  if (norm === 'mrs archer' || norm === 'mother' || norm === 'gran' || norm === 'aunt dana') return VOICES.Alice;
  if (norm === 'tamara' || norm === 'sister' || norm === 'noora' || norm === 'molly') return VOICES.Jessica;
  if (norm === 'muna' || norm === 'zeena' || norm === 'noor' || norm === 'helen' || norm === 'rachel') return VOICES.Sarah;
  // Male roles
  if (norm === 'father' || norm === 'mr archer' || norm === 'teacher' || norm === 'zookeeper') return VOICES.George;
  if (norm === 'len' || norm === 'laith' || norm === 'salman' || norm === 'fox') return VOICES.Will;
  if (norm === 'child' || norm === 'yassir' || norm === 'jack' || norm === 'shepherd boy' || norm === 'bird') return VOICES.Charlie;
  // Default based on gender
  if (gender === 'female') return VOICES.Sarah;
  return VOICES.Liam; // Default young narrator (Liam)
}

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function generateTTS(voiceId, text) {
  const url = `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`;
  for (let attempt = 1; attempt <= 4; attempt++) {
    const key = API_KEYS[currentKeyIndex];
    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'xi-api-key': key,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text,
          model_id: 'eleven_multilingual_v2',
          voice_settings: {
            stability: 0.55,
            similarity_boost: 0.75,
            style: 0.25,
          },
        }),
      });
      if (!res.ok) {
        const errText = await res.text();
        if (errText.includes('quota_exceeded') && currentKeyIndex < API_KEYS.length - 1) {
          console.warn(`[QUOTA] Key ${currentKeyIndex} quota reached. Switching to backup key...`);
          currentKeyIndex++;
          await sleep(1000);
          continue;
        }
        throw new Error(`HTTP ${res.status}: ${errText}`);
      }
      return Buffer.from(await res.arrayBuffer());
    } catch (e) {
      console.warn(`[WARN] Attempt ${attempt} failed: ${e.message}`);
      if (attempt < 4) await sleep(2500);
    }
  }
  throw new Error(`Failed to generate TTS for text: "${text.slice(0, 30)}..."`);
}

async function updateLessonDataFiles(outputBaseDir) {
  const lessonFiles = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  for (const num of lessonFiles) {
    const filePath = path.resolve(process.cwd(), `src/data/unit3/lesson${num}.ts`);
    if (!fs.existsSync(filePath)) continue;

    let content = fs.readFileSync(filePath, 'utf8');

    // Link individual line audioFileUrl
    const lessonDir = path.join(outputBaseDir, `lesson-${num}`);
    if (fs.existsSync(lessonDir)) {
      const files = fs.readdirSync(lessonDir).filter((f) => f.endsWith('.mp3'));
      for (const file of files) {
        const lineId = file.replace('.mp3', '');
        const audioUrl = `/audio/unit-3/lesson-${num}/${file}`;

        const lineRegex = new RegExp(`(id:\\s*['"]${lineId}['"][\\s\\S]*?textAr:\\s*['"][\\s\\S]*?['"],)`, 'g');
        content = content.replace(lineRegex, (match) => {
          if (match.includes('audioFileUrl:')) {
            return match.replace(/audioFileUrl:\s*['"][^'"]+['"],/, `audioFileUrl: '${audioUrl}',`);
          }
          return `${match}\n          audioFileUrl: '${audioUrl}',`;
        });
      }
    }

    // Link track audioFileUrl
    content = content.replace(/(audioTrackNumber:\s*(\d+),[\s\\S]*?description:\s*['"][^'"]+['"],)/g, (match, p1, trackNum) => {
      const trackAudioUrl = `/audio/unit-3/track${trackNum}.mp3`;
      if (match.includes('audioFileUrl:')) {
        return match.replace(/audioFileUrl:\s*['"][^'"]+['"],/, `audioFileUrl: '${trackAudioUrl}',`);
      }
      return `${match}\n      audioFileUrl: '${trackAudioUrl}',\n      hasGeminiAudio: true,`;
    });

    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`[UPDATED FILE] src/data/unit3/lesson${num}.ts`);
  }
}

async function main() {
  const { unit3Lessons } = await import('../src/data/unit3/index.ts');
  const outputBaseDir = path.resolve(process.cwd(), 'public/audio/unit-3');

  console.log('=== RESUMING / COMPLETING UNIT 3 AUDIO GENERATION ===');
  let totalCharsProcessed = 0;
  let totalFilesGenerated = 0;
  let skippedFiles = 0;

  for (const lesson of unit3Lessons) {
    const lessonDir = path.join(outputBaseDir, `lesson-${lesson.lessonNumber}`);
    fs.mkdirSync(lessonDir, { recursive: true });

    for (const transcript of lesson.transcripts) {
      console.log(`\n--- Lesson ${lesson.lessonNumber} | Track ${transcript.audioTrackNumber}: ${transcript.titleEn} ---`);
      const trackBuffers = [];

      for (const line of transcript.lines) {
        const outFilePath = path.join(lessonDir, `${line.id}.mp3`);
        const voice = getVoiceForLine(line.speaker, line.gender);

        if (fs.existsSync(outFilePath) && fs.statSync(outFilePath).size > 1000) {
          console.log(`[SKIP - EXISTS] ${line.id} (${line.speaker})`);
          skippedFiles++;
          trackBuffers.push(fs.readFileSync(outFilePath));
          continue;
        }

        console.log(`[TTS] ${line.id} [${voice.name}] (${line.textEn.length} ch): "${line.textEn.slice(0, 35)}..."`);
        totalCharsProcessed += line.textEn.length;

        const audioBuf = await generateTTS(voice.id, line.textEn);
        fs.writeFileSync(outFilePath, audioBuf);
        trackBuffers.push(audioBuf);
        totalFilesGenerated++;

        await sleep(600); // Throttling
      }

      // Generate merged track file
      if (trackBuffers.length > 0 && transcript.audioTrackNumber) {
        const trackFilePath = path.join(outputBaseDir, `track${transcript.audioTrackNumber}.mp3`);
        if (!fs.existsSync(trackFilePath) || fs.statSync(trackFilePath).size === 0) {
          const combined = Buffer.concat(trackBuffers);
          fs.writeFileSync(trackFilePath, combined);
          console.log(`[TRACK SAVED] ${trackFilePath} (${(combined.length / 1024).toFixed(1)} KB)`);
        }
      }
    }
  }

  console.log('\n--- Updating Lesson Data Files with Audio URLs ---');
  await updateLessonDataFiles(outputBaseDir);

  console.log('\n========================================');
  console.log('ALL UNIT 3 AUDIO GENERATION COMPLETED!');
  console.log(`Generated new files: ${totalFilesGenerated}`);
  console.log(`Skipped existing: ${skippedFiles}`);
  console.log(`Total characters processed: ${totalCharsProcessed}`);
  console.log('========================================\n');
}

main().catch((err) => {
  console.error('FATAL ERROR:', err);
  process.exit(1);
});
