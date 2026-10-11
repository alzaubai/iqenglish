import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

const API_KEY = 'sk_9d6bd9e07aeb3407c94361704c0306594deb3d9b75f6d5aa';
const outDir = path.resolve('public/audio/lesson-4');
fs.mkdirSync(outDir, { recursive: true });

// VOICES: Strictly Female for Girls, Male for Boys
// Maysam (Girl): Sarah (EXAVITQu4vr4xnSDxMaL)
// Adel (Boy): Will (bIHbv24MWmeRgasZH58o)
// Bassem (Boy): Adam (pNInz6obpgDQGcFmaJgB)
// Rawan (Girl): Alice (Xb7hH8MSUJpSbSDYk0k2)
// Muna (Girl): Jessica (cgSgspJ2msm6clMCkdW9)
// Laith (Boy): Antoni (ErXwobaYiN019PkySvjV)

const VOICES = {
  Maysam: { id: 'EXAVITQu4vr4xnSDxMaL', name: 'Sarah (Girl)' },
  Adel: { id: 'bIHbv24MWmeRgasZH58o', name: 'Will (Boy)' },
  Bassem: { id: 'pNInz6obpgDQGcFmaJgB', name: 'Adam (Boy)' },
  Rawan: { id: 'Xb7hH8MSUJpSbSDYk0k2', name: 'Alice (Girl)' },
  Muna: { id: 'cgSgspJ2msm6clMCkdW9', name: 'Jessica (Girl)' },
  Laith: { id: 'ErXwobaYiN019PkySvjV', name: 'Antoni (Boy)' },
};

const lesson4Lines = [
  {
    id: 'l4-1',
    speaker: 'Maysam',
    text: 'I am Maysam. In my spare time, I like finding out about other countries. I have lots of pictures and stamps. Scrapbook 3 is mine.',
  },
  {
    id: 'l4-2',
    speaker: 'Adel',
    text: 'I am Adel. Some day, I want to go to Africa. Then I can take my own photos of the animals. Scrapbook 6 is mine.',
  },
  {
    id: 'l4-3',
    speaker: 'Bassem',
    text: 'I am Bassem. I want to be a pilot. I am very interested in planes and flying. Scrapbook 4 is mine.',
  },
  {
    id: 'l4-4',
    speaker: 'Rawan',
    text: 'I am Rawan. I enjoy collecting pictures of plants and flowers from around the world. Scrapbook 1 is mine.',
  },
  {
    id: 'l4-5',
    speaker: 'Muna',
    text: 'I am Muna. I am interested in birds. In my spare time, I take photos and find out their names. Scrapbook 2 is mine.',
  },
  {
    id: 'l4-6',
    speaker: 'Laith',
    text: 'I am Laith. I play football and watch it on television. I go to matches. Scrapbook 5 is mine.',
  },
];

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function generateLine(line) {
  const voice = VOICES[line.speaker];
  if (!voice) throw new Error(`Unknown speaker: ${line.speaker}`);

  const mp3Path = path.join(outDir, `${line.id}.mp3`);
  const wavPath = path.join(outDir, `${line.id}.wav`);

  console.log(`[Generating] ${line.id} (${line.speaker} -> ${voice.name})...`);

  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voice.id}`, {
        method: 'POST',
        headers: {
          'xi-api-key': API_KEY,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: line.text,
          model_id: 'eleven_multilingual_v2',
          voice_settings: {
            stability: 0.55,
            similarity_boost: 0.75,
            style: 0.25,
          },
        }),
      });

      if (!response.ok) {
        const err = await response.text();
        throw new Error(`HTTP ${response.status}: ${err}`);
      }

      const buffer = Buffer.from(await response.arrayBuffer());
      fs.writeFileSync(mp3Path, buffer);

      // Convert to WAV 44.1kHz
      execSync(`ffmpeg -y -i "${mp3Path}" -ar 44100 "${wavPath}" 2>/dev/null`);

      console.log(`[Saved] ${line.id} (${buffer.length} bytes)`);
      await sleep(1000);
      return;
    } catch (e) {
      console.warn(`Attempt ${attempt} failed for ${line.id}: ${e.message}`);
      await sleep(2500);
    }
  }

  throw new Error(`Failed to generate ${line.id}`);
}

function combineFullTrack() {
  console.log('[Combining] Stitching track5-full with natural pauses...');
  const silenceWav = path.join(outDir, 'silence_08.wav');
  execSync(`ffmpeg -y -f lavfi -i anullsrc=r=44100:cl=mono -t 0.8 -q:a 9 -acodec pcm_s16le "${silenceWav}" 2>/dev/null`);

  const concatList = path.join(outDir, 'track5_concat.txt');
  let content = '';
  lesson4Lines.forEach((line, i) => {
    content += `file '${path.join(outDir, `${line.id}.wav`)}'\n`;
    if (i < lesson4Lines.length - 1) {
      content += `file '${silenceWav}'\n`;
    }
  });
  fs.writeFileSync(concatList, content);

  const fullWav = path.join(outDir, 'track5-full.wav');
  const fullMp3 = path.join(outDir, 'track5-full.mp3');

  execSync(`ffmpeg -y -f concat -safe 0 -i "${concatList}" -ar 44100 "${fullWav}" 2>/dev/null`);
  execSync(`ffmpeg -y -i "${fullWav}" -b:a 192k "${fullMp3}" 2>/dev/null`);

  console.log('Successfully created track5-full.wav and track5-full.mp3!');
}

async function main() {
  console.log('=== Starting ElevenLabs Audio Generation for Lesson 4 ===');
  console.log('Voices configured: 3 Girls (Sarah, Alice, Jessica), 3 Boys (Will, Adam, Antoni)');

  for (const line of lesson4Lines) {
    await generateLine(line);
  }

  combineFullTrack();
  console.log('=== All Lesson 4 audios generated successfully! ===');
}

main().catch((err) => {
  console.error('Fatal error in Lesson 4 audio generation:', err);
  process.exit(1);
});
