import fs from 'fs';
import path from 'path';

const API_KEY = process.env.ELEVENLABS_API_KEY || 'sk_ebf5f7f1302c5bc22c793b420aa5e7f1ee4cbbcce75968fa';

// Voice: Will (bIHbv24MWmeRgasZH58o) - Youthful, friendly, schoolboy narrator voice
const VOICE = {
  id: 'bIHbv24MWmeRgasZH58o',
  name: 'Will (Schoolboy)',
  gender: 'male',
};

const LESSON_10_LINES = [
  {
    id: 'l10-1',
    speaker: 'Narrator',
    text: 'Last month, I was coming home from school when something caught my attention in the bushes.',
  },
  {
    id: 'l10-2',
    speaker: 'Narrator',
    text: 'I stopped to take a look. There on the ground, not moving, was a little bird. It looked dead.',
  },
  {
    id: 'l10-3',
    speaker: 'Narrator',
    text: 'I gently wrapped the bird in a scarf and took it home.',
  },
  {
    id: 'l10-4',
    speaker: 'Narrator',
    text: 'Instead of being dead, it jumped out and tried to fly, but one wing was hurt.',
  },
  {
    id: 'l10-5',
    speaker: 'Narrator',
    text: 'Mum and I did some research. The bird was a swift.',
  },
  {
    id: 'l10-6',
    speaker: 'Narrator',
    text: 'The article said that swifts almost never put their feet on the ground because it is too dangerous. They can spend up to ten months flying!',
  },
  {
    id: 'l10-7',
    speaker: 'Narrator',
    text: 'Every day, I went out to look for insects and changed the water. The swift got stronger and stronger.',
  },
  {
    id: 'l10-8',
    speaker: 'Narrator',
    text: 'One day, when I opened the box, it flew straight out of the window. I helped it get strong again.',
  },
];

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function generateLine(item, voice, outDir) {
  const lineId = item.id;
  const filePath = path.join(outDir, `${lineId}.mp3`);
  console.log(`[GENERATING] ${lineId} (${voice.name}): "${item.text.slice(0, 40)}..."`);

  const url = `https://api.elevenlabs.io/v1/text-to-speech/${voice.id}`;
  const payload = {
    text: item.text,
    model_id: 'eleven_multilingual_v2',
    voice_settings: {
      stability: 0.55,
      similarity_boost: 0.75,
      style: 0.20,
    },
  };

  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'xi-api-key': API_KEY,
          'Content-Type': 'application/json',
          Accept: 'audio/mpeg',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP ${response.status}: ${errorText}`);
      }

      const buffer = Buffer.from(await response.arrayBuffer());
      fs.writeFileSync(filePath, buffer);
      console.log(`  [SUCCESS] Saved ${filePath} (${buffer.length} bytes)`);
      break;
    } catch (err) {
      console.error(`  [Attempt ${attempt} Failed]:`, err.message);
      if (attempt === 3) throw err;
      await sleep(2000);
    }
  }

  await sleep(600);
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
  const l10Dir = path.resolve('public/audio/lesson-10');

  // Delete old audio files first as requested by user
  console.log('=== REMOVING OLD LESSON 10 AUDIO FILES ===');
  if (fs.existsSync(l10Dir)) {
    const existingFiles = fs.readdirSync(l10Dir);
    for (const file of existingFiles) {
      const fullPath = path.join(l10Dir, file);
      fs.unlinkSync(fullPath);
      console.log(`  Deleted old: ${file}`);
    }
  } else {
    fs.mkdirSync(l10Dir, { recursive: true });
  }

  console.log('\n=== GENERATING NEW LESSON 10 AUDIO (Schoolboy Voice - Will) ===');
  for (const item of LESSON_10_LINES) {
    await generateLine(item, VOICE, l10Dir);
  }

  await createFullTrack(LESSON_10_LINES, l10Dir, 'track12-full.mp3');
  console.log('\n=== ALL 8 LESSON 10 AUDIO ASSETS GENERATED SUCCESSFULLY! ===');
}

main().catch((err) => {
  console.error('Fatal error during Lesson 10 audio generation:', err);
  process.exit(1);
});
