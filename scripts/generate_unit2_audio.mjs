import fs from 'fs';
import path from 'path';

const API_KEY = process.env.ELEVENLABS_API_KEY || 'sk_f4d486de52917fb5d4e1befca662caa7b1a1cc41f63951a1';

// Young American voices mapping:
const VOICE_MAP = {
  Liam: { id: 'TX3LPaxmHKxFdv7VOQHJ', name: 'Liam (Young American Boy / Narrator)' },
  Jessica: { id: 'cgSgspJ2msm6clMCkdW9', name: 'Jessica (Young American Female)' },
  Charlie: { id: 'IKne3meq5aSn9XLyUdCD', name: 'Charlie (Lively Young American Boy)' },
  George: { id: 'JBFqnCBsd6RMkjVDRZzb', name: 'George (Warm American)' },
  Will: { id: 'bIHbv24MWmeRgasZH58o', name: 'Will (Youthful American Boy)' },
};

function getVoiceForLine(lessonNum, speaker) {
  const norm = speaker.trim().toLowerCase();
  if (norm === 'radio presenter') return VOICE_MAP.Jessica;
  if (norm === 'grandson') return VOICE_MAP.Charlie;
  if (norm === 'grandfather') return VOICE_MAP.George;
  if (norm === 'simon') return VOICE_MAP.Will;
  if (norm === 'father') return VOICE_MAP.George;
  if (norm === 'yassir') return VOICE_MAP.Liam;
  return VOICE_MAP.Liam; // Default young narrator (Liam)
}

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function generateTTS(voiceId, text) {
  const url = `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`;
  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'xi-api-key': API_KEY,
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
        throw new Error(`HTTP ${res.status}: ${errText}`);
      }
      return Buffer.from(await res.arrayBuffer());
    } catch (e) {
      console.warn(`[WARN] Attempt ${attempt} failed: ${e.message}`);
      if (attempt < 3) await sleep(2000);
    }
  }
  throw new Error(`Failed to generate TTS for text: "${text.slice(0, 30)}..."`);
}

async function main() {
  const { unit2Lessons } = await import('../src/data/unit2Data.ts');
  const targetLessons = [1, 2, 3, 4, 6, 8, 9, 10]; // Excluding 5 and 7 as requested
  const outputBaseDir = path.resolve(process.cwd(), 'public/audio/unit-2');

  console.log(`Starting audio generation for Unit 2 lessons: ${targetLessons.join(', ')}`);
  let totalCharsProcessed = 0;
  let totalFilesGenerated = 0;
  let skippedFiles = 0;

  for (const lesson of unit2Lessons) {
    if (!targetLessons.includes(lesson.lessonNumber)) continue;

    const lessonDir = path.join(outputBaseDir, `lesson-${lesson.lessonNumber}`);
    fs.mkdirSync(lessonDir, { recursive: true });

    for (const transcript of lesson.transcripts) {
      console.log(`\n--- Processing Lesson ${lesson.lessonNumber} | Track: ${transcript.titleEn} ---`);
      const trackBuffers = [];

      for (const line of transcript.lines) {
        const outFilePath = path.join(lessonDir, `${line.id}.mp3`);
        const voice = getVoiceForLine(lesson.lessonNumber, line.speaker);

        if (fs.existsSync(outFilePath) && fs.statSync(outFilePath).size > 1000) {
          console.log(`[EXISTS - SKIP] ${line.id} (${line.speaker}) -> ${outFilePath}`);
          skippedFiles++;
          trackBuffers.push(fs.readFileSync(outFilePath));
          continue;
        }

        console.log(`[GENERATING] ${line.id} (${voice.name}): "${line.textEn.slice(0, 40)}..." [${line.textEn.length} chars]`);
        totalCharsProcessed += line.textEn.length;

        const audioBuf = await generateTTS(voice.id, line.textEn);
        fs.writeFileSync(outFilePath, audioBuf);
        trackBuffers.push(audioBuf);
        totalFilesGenerated++;

        await sleep(600); // Friendly throttle
      }

      // Generate merged track audio if lines exist
      if (trackBuffers.length > 0) {
        const trackFileName = transcript.audioTrackNumber ? `track${transcript.audioTrackNumber}.mp3` : `${transcript.id}.mp3`;
        const trackFilePath = path.join(outputBaseDir, trackFileName);
        const combined = Buffer.concat(trackBuffers);
        fs.writeFileSync(trackFilePath, combined);
        console.log(`[TRACK SAVED] ${trackFilePath} (${(combined.length / 1024).toFixed(1)} KB)`);
      }
    }
  }

  console.log('\n========================================');
  console.log(`GENERATION COMPLETED SUCCESSFULLY!`);
  console.log(`New files generated: ${totalFilesGenerated}`);
  console.log(`Existing skipped: ${skippedFiles}`);
  console.log(`Total characters consumed: ${totalCharsProcessed}`);
  console.log('========================================\n');
}

main().catch((err) => {
  console.error('FATAL ERROR:', err);
  process.exit(1);
});
