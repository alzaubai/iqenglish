import fs from 'fs';
import path from 'path';

const API_KEY = process.env.ELEVENLABS_API_KEY || 'sk_ebf5f7f1302c5bc22c793b420aa5e7f1ee4cbbcce75968fa';

// Voice: Liam (TX3LPaxmHKxFdv7VOQHJ) - American Accent, Youthful / Schoolboy narrator (Natural, Clear, Young)
const VOICE = {
  id: 'TX3LPaxmHKxFdv7VOQHJ',
  name: 'Liam (Young American Boy)',
  gender: 'male',
};

// The complete, official textbook lines for Lesson 10 (Story time: My new friend, the swift)
const LESSON_10_FULL_LINES = [
  {
    id: 'l10-1',
    speaker: 'Narrator',
    text: 'Last month, I was coming home from school when something caught my attention in the bushes.',
  },
  {
    id: 'l10-2',
    speaker: 'Narrator',
    text: "I stopped to take a look. There on the ground, not moving, was a little bird. It looked dead. I didn't know what to do. I know birds can get very scared, but if I left it there, maybe a cat would find it.",
  },
  {
    id: 'l10-3',
    speaker: 'Narrator',
    text: 'I gently wrapped the bird in a scarf and took it home. Then I unwrapped it. I thought it would still look dead.',
  },
  {
    id: 'l10-4',
    speaker: 'Narrator',
    text: "Instead, it jumped out and tried to fly - but one wing didn't open. The bird's wing was hurt. I found a cardboard box and made some holes in the top, so there was plenty of air. Then I put some paper inside the box and moved the bird to its new home.",
  },
  {
    id: 'l10-5',
    speaker: 'Narrator',
    text: 'Mum and I did some research. The bird was a swift. The article said that swifts eat small insects.',
  },
  {
    id: 'l10-6',
    speaker: 'Narrator',
    text: "The article said that swifts almost never put their feet on the ground because it's too dangerous. It also said that they can spend up to ten months flying. Ten months in the air! That's incredible! Another interesting fact is that when they're scared, swifts sometimes pretend to be dead. That's what it was doing when I found it.",
  },
  {
    id: 'l10-7',
    speaker: 'Narrator',
    text: 'I went outside to look for some insects to feed the bird. We put the food and some water in the box and left it in a quiet place. Every day, I went out to look for insects and changed the water. I took the swift out of its box. And every day, it got stronger and stronger.',
  },
  {
    id: 'l10-8',
    speaker: 'Narrator',
    text: 'One day, when I opened the box, it flew straight out of the window. It made me sad to see the bird fly away, but I was also happy, because I helped it get strong again.',
  },
];

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function generateLine(item, voice) {
  console.log(`[GENERATING] ${item.id} (${voice.name}): "${item.text.slice(0, 45)}..."`);

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
      return buffer;
    } catch (err) {
      console.error(`  [Attempt ${attempt} Failed]:`, err.message);
      if (attempt === 3) throw err;
      await sleep(2000);
    }
  }
}

async function main() {
  const publicDir = path.resolve('public/audio/lesson-10');
  const distDir = path.resolve('dist/audio/lesson-10');

  for (const dir of [publicDir, distDir]) {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  }

  console.log('=== STARTING RE-GENERATION OF LESSON 10 AUDIO ===');
  console.log(`Voice: ${VOICE.name} (${VOICE.id})`);
  console.log(`Total sentences: ${LESSON_10_FULL_LINES.length}`);

  const audioBuffers = [];

  for (const item of LESSON_10_FULL_LINES) {
    const buffer = await generateLine(item, VOICE);
    audioBuffers.push({ id: item.id, buffer });

    // Save to public and dist
    fs.writeFileSync(path.join(publicDir, `${item.id}.mp3`), buffer);
    fs.writeFileSync(path.join(distDir, `${item.id}.mp3`), buffer);
    console.log(`  ✓ Saved ${item.id}.mp3 (${buffer.length} bytes) to public & dist`);

    await sleep(600);
  }

  // Combine into track12-full.mp3
  console.log('\n[CONCAT] Merging all 8 lines into track12-full.mp3...');
  const mergedBuffer = Buffer.concat(audioBuffers.map((b) => b.buffer));
  fs.writeFileSync(path.join(publicDir, 'track12-full.mp3'), mergedBuffer);
  fs.writeFileSync(path.join(distDir, 'track12-full.mp3'), mergedBuffer);
  console.log(`  ✓ Saved track12-full.mp3 (${mergedBuffer.length} bytes)`);

  console.log('\n=== ALL LESSON 10 AUDIO FILES REGENERATED AND DEPLOYED TO PUBLIC & DIST! ===');
}

main().catch((err) => {
  console.error('Fatal error during Lesson 10 audio generation:', err);
  process.exit(1);
});
