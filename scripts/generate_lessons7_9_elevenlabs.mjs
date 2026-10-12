import fs from 'fs';
import path from 'path';

const API_KEY = process.env.ELEVENLABS_API_KEY || 'sk_9d6bd9e07aeb3407c94361704c0306594deb3d9b75f6d5aa';

const VOICES = {
  Sana: { id: 'EXAVITQu4vr4xnSDxMaL', name: 'Sarah (Girl)', gender: 'female' },
  Teacher: { id: 'pNInz6obpgDQGcFmaJgB', name: 'Adam (Educator)', gender: 'male' },
};

const LESSON_7_LINES = [
  // l7-1 is already generated! We check if it exists and skip to save quota!
  {
    id: 'l7-1',
    speaker: 'Sana',
    text: 'I had a fantastic day yesterday. I spent the day with my friends, and we did lots of fun things together.',
  },
  {
    id: 'l7-2',
    speaker: 'Sana',
    text: 'In the morning, we went fishing. We did not catch any fish, but it was very relaxing.',
  },
  {
    id: 'l7-3',
    speaker: 'Sana',
    text: 'Then we walked along the seashore and found some beautiful seashells. I took some pictures of the boats in the sea.',
  },
  {
    id: 'l7-4',
    speaker: 'Sana',
    text: 'My parents said we could have a pizza or go for a picnic. In the afternoon, my friends and I played football in the park and then listened to some music.',
  },
];

const LESSON_9_LINES = [
  {
    id: 'l9-1',
    speaker: 'Teacher',
    text: 'In Unit 1, we learned how to talk about holidays in the past simple: I went swimming every day. I stayed at home.',
  },
  {
    id: 'l9-2',
    speaker: 'Teacher',
    text: 'We learned how to ask questions: Did you visit your friends? Yes, I did. Did you go on picnics? No, I did not.',
  },
  {
    id: 'l9-3',
    speaker: 'Teacher',
    text: 'We also learned adverbs of frequency: I always get up before eight o clock. I usually go on picnics on Fridays. My father never drives fast.',
  },
];

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function generateLine(item, voice, outDir) {
  const filePath = path.join(outDir, `${item.id}.mp3`);
  if (fs.existsSync(filePath) && fs.statSync(filePath).size > 1000) {
    console.log(`[SKIP] Already exists: ${filePath} (${fs.statSync(filePath).size} bytes)`);
    return;
  }

  console.log(`[GENERATING] ${item.id} -> Voice: ${voice.name} (${voice.id}) | Chars: ${item.text.length}...`);
  const url = `https://api.elevenlabs.io/v1/text-to-speech/${voice.id}`;
  const payload = {
    text: item.text,
    model_id: 'eleven_multilingual_v2',
    voice_settings: {
      stability: 0.55,
      similarity_boost: 0.75,
      style: 0.25,
    },
  };

  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'xi-api-key': API_KEY,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const err = await response.text();
        throw new Error(`HTTP ${response.status}: ${err}`);
      }

      const buffer = Buffer.from(await response.arrayBuffer());
      fs.writeFileSync(filePath, buffer);
      console.log(`[SUCCESS] Saved ${filePath} (${buffer.length} bytes)`);
      break;
    } catch (err) {
      console.error(`  [Attempt ${attempt} Failed]:`, err.message);
      if (attempt === 3) throw err;
      await sleep(2000);
    }
  }

  await sleep(600); // Polite rate limit delay
}

async function createFullTrack(lineItems, outDir, fullTrackName) {
  const fullTrackPath = path.join(outDir, fullTrackName);
  console.log(`[CONCAT] Merging lines into ${fullTrackPath}...`);
  const buffers = lineItems.map((item) => {
    const p = path.join(outDir, `${item.id}.mp3`);
    return fs.readFileSync(p);
  });
  const merged = Buffer.concat(buffers);
  fs.writeFileSync(fullTrackPath, merged);
  console.log(`[CONCAT SUCCESS] ${fullTrackPath} (${merged.length} bytes)`);
}

async function main() {
  const l7Dir = path.resolve('public/audio/lesson-7');
  const l9Dir = path.resolve('public/audio/lesson-9');
  fs.mkdirSync(l7Dir, { recursive: true });
  fs.mkdirSync(l9Dir, { recursive: true });

  console.log('=== GENERATING LESSON 7 AUDIO (Sana) ===');
  for (const item of LESSON_7_LINES) {
    await generateLine(item, VOICES.Sana, l7Dir);
  }
  await createFullTrack(LESSON_7_LINES, l7Dir, 'track11-full.mp3');

  console.log('\n=== GENERATING LESSON 9 AUDIO (Teacher) ===');
  for (const item of LESSON_9_LINES) {
    await generateLine(item, VOICES.Teacher, l9Dir);
  }
  await createFullTrack(LESSON_9_LINES, l9Dir, 'track9-full.mp3');

  console.log('\n=== ALL AUDIO ASSETS GENERATED SUCCESSFULLY! ===');
}

main().catch((err) => {
  console.error('Fatal error during audio generation:', err);
  process.exit(1);
});
