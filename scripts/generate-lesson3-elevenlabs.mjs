import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

const API_KEY = 'sk_9d6bd9e07aeb3407c94361704c0306594deb3d9b75f6d5aa';
const outDir = path.resolve('public/audio/lesson-3');
fs.mkdirSync(outDir, { recursive: true });

// Strictly American Accent Voices:
// Khalid (Boy): Will (bIHbv24MWmeRgasZH58o) - Natural, friendly American young male
// Maryam (Girl): Sarah (EXAVITQu4vr4xnSDxMaL) - Bright, clear American young female
const VOICES = {
  Khalid: { id: 'bIHbv24MWmeRgasZH58o', name: 'Will (American Boy)' },
  Maryam: { id: 'EXAVITQu4vr4xnSDxMaL', name: 'Sarah (American Girl)' },
};

const lesson3Lines = [
  {
    id: 'l3-1',
    speaker: 'Maryam',
    text: 'Look at that picture that came up. It was this time last year that we were sailing down the river. Do you remember? It was evening, and we were watching the birds.',
  },
  {
    id: 'l3-2',
    speaker: 'Khalid',
    text: "Hmm, I don't want to talk about it.",
  },
  {
    id: 'l3-3',
    speaker: 'Maryam',
    text: 'Why? It was funny! We were sailing on the boat. Remember? And a pelican dropped a fish on you. You were watching the flamingos when the fish hit you on the head.',
  },
  {
    id: 'l3-4',
    speaker: 'Khalid',
    text: 'Hmm.',
  },
  {
    id: 'l3-5',
    speaker: 'Maryam',
    text: 'And? Do you remember what happened next?',
  },
  {
    id: 'l3-6',
    speaker: 'Khalid',
    text: 'Hmm.',
  },
  {
    id: 'l3-7',
    speaker: 'Maryam',
    text: 'You got scared and jumped up and fell into the water.',
  },
  {
    id: 'l3-8',
    speaker: 'Khalid',
    text: 'Hmm.',
  },
  {
    id: 'l3-9',
    speaker: 'Maryam',
    text: 'We pulled you out of the water, then we drove back to the hotel.',
  },
  {
    id: 'l3-10',
    speaker: 'Khalid',
    text: 'Hmm.',
  },
  {
    id: 'l3-11',
    speaker: 'Maryam',
    text: "You stayed in your room when we were having dinner. You didn't want to come and eat with us - you were too embarrassed!",
  },
  {
    id: 'l3-12',
    speaker: 'Khalid',
    text: 'Hmm. But do you remember what happened the next day?',
  },
  {
    id: 'l3-13',
    speaker: 'Maryam',
    text: "No. No, I don't.",
  },
  {
    id: 'l3-14',
    speaker: 'Khalid',
    text: 'We were playing football and you fell in the mud.',
  },
  {
    id: 'l3-15',
    speaker: 'Maryam',
    text: "I don't remember.",
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
  console.log('[Combining] Stitching track4-full with natural pauses...');
  const silenceWav = path.join(outDir, 'silence_07.wav');
  execSync(`ffmpeg -y -f lavfi -i anullsrc=r=44100:cl=mono -t 0.7 -q:a 9 -acodec pcm_s16le "${silenceWav}" 2>/dev/null`);

  const concatList = path.join(outDir, 'track4_concat.txt');
  let content = '';
  lesson3Lines.forEach((line, i) => {
    content += `file '${path.join(outDir, `${line.id}.wav`)}'\n`;
    if (i < lesson3Lines.length - 1) {
      content += `file '${silenceWav}'\n`;
    }
  });
  fs.writeFileSync(concatList, content);

  const fullWav = path.join(outDir, 'track4-full.wav');
  const fullMp3 = path.join(outDir, 'track4-full.mp3');

  execSync(`ffmpeg -y -f concat -safe 0 -i "${concatList}" -c:a pcm_s16le "${fullWav}" 2>/dev/null`);
  execSync(`ffmpeg -y -i "${fullWav}" -b:a 192k "${fullMp3}" 2>/dev/null`);

  try {
    fs.unlinkSync(silenceWav);
    fs.unlinkSync(concatList);
  } catch (_) {}

  console.log('[Combined] track4-full successfully generated!');
}

async function main() {
  console.log('--- Generating Lesson 3 Audio (American Accent: Khalid & Maryam) ---');
  for (const line of lesson3Lines) {
    await generateLine(line);
  }
  combineFullTrack();
  console.log('--- Done Generating Lesson 3! ---');
}

main().catch((err) => {
  console.error('Fatal error:', err);
  process.exit(1);
});
