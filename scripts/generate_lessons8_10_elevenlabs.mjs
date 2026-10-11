import fs from 'fs';
import path from 'path';

const API_KEY = process.env.ELEVENLABS_API_KEY || 'sk_9d6bd9e07aeb3407c94361704c0306594deb3d9b75f6d5aa';

// Lesson 8: Karen is an Australian girl -> Sarah (EXAVITQu4vr4xnSDxMaL) [Female]
// Lesson 10: Story time boy narrator -> Liam (TX3LPaxmHKxFdv7VOQHJ) [Male]
// Note: Antoni is permanently excluded!

const VOICES = {
  Karen: { id: 'EXAVITQu4vr4xnSDxMaL', name: 'Sarah (Girl)', gender: 'female' },
  NarratorBoy: { id: 'TX3LPaxmHKxFdv7VOQHJ', name: 'Liam (Boy)', gender: 'male' },
};

const LESSON_8_DATA = {
  out_dir: path.resolve('public/audio/lesson-8'),
  track_name: 'track8-full.mp3',
  voice: VOICES.Karen,
  lines: [
    {
      id: 'l8-1',
      speaker: 'Karen',
      text: '19 Harbour Street, Sydney, Australia. Dear Hala, Are you back at school now? I went back last week after a wonderful holiday.',
    },
    {
      id: 'l8-2',
      speaker: 'Karen',
      text: 'I went camping with my family and then I stayed with my friend, Jane, for two weeks. We had a great time.',
    },
    {
      id: 'l8-3',
      speaker: 'Karen',
      text: 'We often walked in the parks and took pictures. One day, we went to the museum. Is there one in Baghdad? Sometimes we went to the cinema in the evenings.',
    },
    {
      id: 'l8-4',
      speaker: 'Karen',
      text: 'Everyone liked fish, so, for dinner, we often had fish cooked on a barbecue. What is your favourite food?',
    },
    {
      id: 'l8-5',
      speaker: 'Karen',
      text: 'In my spare time, I like collecting photographs of countries around the world. I do not have any of Iraq. Can you send me some, please? Bye for now, Karen.',
    },
  ],
};

const LESSON_10_DATA = {
  out_dir: path.resolve('public/audio/lesson-10'),
  track_name: 'track12-full.mp3',
  voice: VOICES.NarratorBoy,
  lines: [
    {
      id: 'l10-1',
      speaker: 'Narrator',
      text: 'Last month, I was coming home from school when something caught my attention in the bushes. I stopped to take a look. There on the ground, not moving, was a little bird. It looked dead.',
    },
    {
      id: 'l10-2',
      speaker: 'Narrator',
      text: 'I gently wrapped the bird in a scarf and took it home. Instead of being dead, it jumped out and tried to fly, but one wing was hurt.',
    },
    {
      id: 'l10-3',
      speaker: 'Narrator',
      text: 'Mum and I did some research. The bird was a swift. The article said that swifts almost never put their feet on the ground because it is too dangerous. They can spend up to ten months flying!',
    },
    {
      id: 'l10-4',
      speaker: 'Narrator',
      text: 'Every day, I went out to look for insects and changed the water. The swift got stronger and stronger. One day, when I opened the box, it flew straight out of the window. I helped it get strong again.',
    },
  ],
};

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function generateLine(item, voice, outDir) {
  const lineId = item.id;
  const mp3Path = path.join(outDir, `${lineId}.mp3`);
  console.log(`  [Generating] ${lineId} (${item.speaker} [${voice.gender}] -> Voice: ${voice.name})...`);

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
      fs.writeFileSync(mp3Path, buffer);
      console.log(`  [Saved] ${lineId}.mp3 (${buffer.length} bytes)`);
      await sleep(400);
      return buffer;
    } catch (e) {
      console.warn(`  Attempt ${attempt} failed for ${lineId}: ${e.message}`);
      await sleep(2000);
    }
  }

  throw new Error(`Failed to generate ${lineId}`);
}

function stitchTrack(chunks, outDir, trackFilename) {
  const fullPath = path.join(outDir, trackFilename);
  console.log(`  [Stitching] Creating ${trackFilename}...`);
  const combined = Buffer.concat(chunks);
  fs.writeFileSync(fullPath, combined);
  console.log(`  [Saved] ${trackFilename} (${combined.length} bytes)`);
}

async function processSection(secData, label) {
  console.log(`\n=== Processing ${label} ===`);
  fs.mkdirSync(secData.out_dir, { recursive: true });
  const chunks = [];
  for (const line of secData.lines) {
    const chunk = await generateLine(line, secData.voice, secData.out_dir);
    chunks.push(chunk);
  }
  stitchTrack(chunks, secData.out_dir, secData.track_name);
}

async function main() {
  console.log('====================================================');
  console.log('Generating ElevenLabs Audios for Lesson 8 & Lesson 10');
  console.log('Curriculum: English for Iraq - 1st Intermediate');
  console.log('Voices: Karen (Girl: Sarah), Story Narrator (Boy: Liam)');
  console.log('====================================================');

  await processSection(LESSON_8_DATA, 'Lesson 8: A letter from Australia (Karen)');
  await processSection(LESSON_10_DATA, 'Lesson 10: Story time (My new friend, the swift)');

  console.log('\nAll audios for Lessons 8 & 10 generated successfully!');
}

main().catch((err) => {
  console.error('Fatal error in audio generation:', err);
  process.exit(1);
});
