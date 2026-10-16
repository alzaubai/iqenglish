import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

const API_KEY = process.env.ELEVENLABS_API_KEY || 'sk_ebf5f7f1302c5bc22c793b420aa5e7f1ee4cbbcce75968fa';
const VOICE_ID = 'TX3LPaxmHKxFdv7VOQHJ'; // Liam (Narrator)

const linesToFix = [
  {
    id: 'u2-l1-t13-2',
    text: 'In winter, it is always cold and it usually snows. The temperature can be zero degrees.'
  },
  {
    id: 'u2-l1-t13-3',
    text: 'In spring, it is often warm and it usually rains. The temperature is around 15 degrees.'
  },
  {
    id: 'u2-l1-t13-4',
    text: 'In summer, it is usually sunny and it is sometimes hot. The temperature can reach 25 degrees.'
  },
  {
    id: 'u2-l1-t13-5',
    text: 'In autumn, it is cool and it is often windy. The temperature is about 10 degrees.'
  }
];

async function generateTTS(text) {
  const url = `https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}`;
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
}

async function run() {
  const lesson1Dir = path.resolve('public/audio/unit-2/lesson-1');
  const unit2Dir = path.resolve('public/audio/unit-2');

  console.log(`Starting targeted fix for Track 13 (Four Seasons)...`);

  for (const item of linesToFix) {
    console.log(`Generating audio for ${item.id}: "${item.text}" (${item.text.length} chars)...`);
    const audioBuf = await generateTTS(item.text);
    const targetFile = path.join(lesson1Dir, `${item.id}.mp3`);
    fs.writeFileSync(targetFile, audioBuf);
    console.log(`Saved ${targetFile} (${(audioBuf.length / 1024).toFixed(1)} KB)`);
  }

  console.log(`\nRe-combining track13.mp3...`);
  const allParts = [
    'u2-l1-t13-1.mp3',
    'u2-l1-t13-2.mp3',
    'u2-l1-t13-3.mp3',
    'u2-l1-t13-4.mp3',
    'u2-l1-t13-5.mp3'
  ];

  const buffers = allParts.map(file => fs.readFileSync(path.join(lesson1Dir, file)));
  const combined = Buffer.concat(buffers);
  const track13Path = path.join(unit2Dir, 'track13.mp3');
  fs.writeFileSync(track13Path, combined);
  console.log(`Saved ${track13Path} (${(combined.length / 1024).toFixed(1)} KB)`);
  console.log('Done!');
}

run().catch(console.error);
