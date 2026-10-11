import fs from 'fs';
import path from 'path';

const API_KEY = process.env.ELEVENLABS_API_KEY || 'sk_9d6bd9e07aeb3407c94361704c0306594deb3d9b75f6d5aa';

const VOICES = {
  Nader: { id: 'ErXwobaYiN019PkySvjV', name: 'Antoni (Boy)', gender: 'male' },
  Adel: { id: 'bIHbv24MWmeRgasZH58o', name: 'Will (Boy)', gender: 'male' },
  Bassem: { id: 'pNInz6obpgDQGcFmaJgB', name: 'Adam (Boy)', gender: 'male' },
  Narrator: { id: 'Xb7hH8MSUJpSbSDYk0k2', name: 'Alice (Female)', gender: 'female' },
};

const LESSON_5_DATA = {
  out_dir: path.resolve('public/audio/lesson-5'),
  track_name: 'track7-full.mp3',
  lines: [
    {
      id: 'l5-1',
      speaker: 'Nader',
      text: 'My father always has a rest after lunch. I usually do my homework after lunch.',
    },
    {
      id: 'l5-2',
      speaker: 'Nader',
      text: 'I never have a rest in the afternoon. I often watch television for an hour.',
    },
    {
      id: 'l5-3',
      speaker: 'Nader',
      text: 'Then my brother and I sometimes play a game.',
    },
    {
      id: 'l5-4',
      speaker: 'Nader',
      text: 'Of course, Fridays are different. We are never at home. We usually go to the park. We always go to our grandparents house after.',
    },
  ],
};

const LESSON_6_TRACK9 = {
  out_dir: path.resolve('public/audio/lesson-6'),
  track_name: 'track9-full.mp3',
  lines: [
    {
      id: 'l6-1',
      speaker: 'Adel',
      text: 'Hello, Bassem. Do you want to come to the mall?',
    },
    {
      id: 'l6-2',
      speaker: 'Bassem',
      text: 'Oh, hi, Adel. No, thanks. I am putting some photographs in my scrapbook.',
    },
    {
      id: 'l6-3',
      speaker: 'Adel',
      text: 'Photographs of what? Historical sites in Iraq?',
    },
    {
      id: 'l6-4',
      speaker: 'Bassem',
      text: 'Yes! Historical sites in Iraq. I visit different cities and take pictures of ruins.',
    },
    {
      id: 'l6-5',
      speaker: 'Adel',
      text: 'Do you have many? But why ruins?',
    },
    {
      id: 'l6-6',
      speaker: 'Bassem',
      text: 'I have lots of them. Because I like them.',
    },
  ],
};

const LESSON_6_TRACK10 = {
  out_dir: path.resolve('public/audio/lesson-6'),
  track_name: 'track10-full.mp3',
  lines: [
    {
      id: 'l6-t-1',
      speaker: 'Narrator',
      text: 'She sells seashells on the seashore.',
    },
    {
      id: 'l6-t-2',
      speaker: 'Narrator',
      text: 'The shells she sells are seashells, I am sure.',
    },
  ],
};

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function generateLine(item, out_dir) {
  const speaker = item.speaker;
  const voiceInfo = VOICES[speaker];
  const voiceId = voiceInfo.id;
  const lineId = item.id;
  const text = item.text;

  const mp3Path = path.join(out_dir, `${lineId}.mp3`);
  console.log(`  [Generating] ${lineId} (${speaker} [${voiceInfo.gender}] -> Voice: ${voiceInfo.name})...`);

  const url = `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`;
  const payload = {
    text: text,
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

function stitchTrack(chunks, out_dir, trackFilename) {
  const fullPath = path.join(out_dir, trackFilename);
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
    const chunk = await generateLine(line, secData.out_dir);
    chunks.append ? chunks.append(chunk) : chunks.push(chunk);
  }
  stitchTrack(chunks, secData.out_dir, secData.track_name);
}

async function main() {
  console.log('==================================================');
  console.log('Generating ElevenLabs Audios for Lesson 5 & Lesson 6');
  console.log('Curriculum: English for Iraq - 1st Intermediate');
  console.log('==================================================');

  await processSection(LESSON_5_DATA, 'Lesson 5 (Track 7: Nader)');
  await processSection(LESSON_6_TRACK9, 'Lesson 6 (Track 9: Adel & Bassem)');
  await processSection(LESSON_6_TRACK10, 'Lesson 6 (Track 10: Tongue-twister)');

  console.log('\nAll audios for Lessons 5 & 6 generated successfully!');
}

main().catch((err) => {
  console.error('Fatal error in audio generation:', err);
  process.exit(1);
});
