import fs from 'fs';
import path from 'path';

const API_KEYS = [
  'sk_ebf5f7f1302c5bc22c793b420aa5e7f1ee4cbbcce75968fa',
  'sk_9d6bd9e07aeb3407c94361704c0306594deb3d9b75f6d5aa',
];
let currentKeyIndex = 0;
const VOICE_ID = 'TX3LPaxmHKxFdv7VOQHJ'; // Liam (Clear, engaging narrator)

const lines = [
  {
    id: 'u2-l5-t20-1',
    text: "The weather can be very strange, especially in places like England. The weather forecast says it will be warm and sunny, but when you wake up it's cold and rainy.",
  },
  {
    id: 'u2-l5-t20-2',
    text: 'It also changes very quickly. The sky can be blue one moment, and then covered by clouds the next.',
  },
  {
    id: 'u2-l5-t20-3',
    text: 'But can you imagine living somewhere so cold that the ink in your pen freezes? This happens a lot in the town of Boronuk in the east of Russia.',
  },
  {
    id: 'u2-l5-t20-4',
    text: 'In winter, the temperature can go as low as -67°C. The inside of your fridge is 4°C, and your freezer is around -18°C.',
  },
  {
    id: 'u2-l5-t20-5',
    text: 'Humans are very good at adapting to every new situation. For the people of Boronuk life carries on as normal. There are horses in the field, children go to school and adults go to work.',
  },
  {
    id: 'u2-l5-t20-6',
    text: "There are a few things which make life here a little more complicated. Drinking water doesn't come in bottles, it comes in blocks of ice.",
  },
  {
    id: 'u2-l5-t20-7',
    text: "The battery in your phone will only work for a few minutes if you don't keep it warm. Even the petrol in your car will freeze. This is why some people keep their car engines on all day.",
  },
  {
    id: 'u2-l5-t20-8',
    text: 'Oh, and never wear glasses made of metal, because they could stick to your face!',
  },
  {
    id: 'u2-l5-t20-9',
    text: 'Nobody in Boronuk asks what the weather will be like tomorrow, because everyone knows. It will be cold, cold, cold.',
  },
];

async function generateTTS(text) {
  for (let attempt = 0; attempt < API_KEYS.length; attempt++) {
    const key = API_KEYS[currentKeyIndex];
    const res = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}`, {
      method: 'POST',
      headers: {
        'xi-api-key': key,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text,
        model_id: 'eleven_multilingual_v2',
        voice_settings: {
          stability: 0.45,
          similarity_boost: 0.75,
          style: 0.40,
          use_speaker_boost: true,
        },
      }),
    });
    if (res.ok) {
      return Buffer.from(await res.arrayBuffer());
    }
    console.warn(`Key ${currentKeyIndex} failed: ${res.status}. Trying next key...`);
    currentKeyIndex = (currentKeyIndex + 1) % API_KEYS.length;
  }
  throw new Error(`All ElevenLabs keys failed for text: ${text.slice(0, 30)}`);
}

async function main() {
  const publicLessonDir = path.resolve('public/audio/unit-2/lesson-5');
  const distLessonDir = path.resolve('dist/audio/unit-2/lesson-5');
  const publicUnit2Dir = path.resolve('public/audio/unit-2');
  const distUnit2Dir = path.resolve('dist/audio/unit-2');

  fs.mkdirSync(publicLessonDir, { recursive: true });
  fs.mkdirSync(distLessonDir, { recursive: true });

  const allBuffers = [];

  for (const line of lines) {
    console.log(`Generating ${line.id}...`);
    const buf = await generateTTS(line.text);
    fs.writeFileSync(path.join(publicLessonDir, `${line.id}.mp3`), buf);
    fs.writeFileSync(path.join(distLessonDir, `${line.id}.mp3`), buf);
    allBuffers.push(buf);
    console.log(`  Saved ${line.id}.mp3 (${buf.length} bytes)`);
    await new Promise((r) => setTimeout(r, 600));
  }

  const combined = Buffer.concat(allBuffers);
  fs.writeFileSync(path.join(publicUnit2Dir, 'track20.mp3'), combined);
  fs.writeFileSync(path.join(distUnit2Dir, 'track20.mp3'), combined);
  console.log(`Saved track20.mp3 (${combined.length} bytes)`);
  console.log('Done!');
}

main().catch(console.error);
