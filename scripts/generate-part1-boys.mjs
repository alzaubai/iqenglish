import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

const API_KEY = 'sk_9d6bd9e07aeb3407c94361704c0306594deb3d9b75f6d5aa';
const outDir = path.resolve('public/audio/lesson-1');
fs.mkdirSync(outDir, { recursive: true });

// Two completely distinct voices:
// Ahmed: Liam (TX3LPaxmHKxFdv7VOQHJ) - Clear, bright, young inquisitive student
// Faisal: Charlie (IKne3meq5aSn9XLyUdCD) - Friendly, casual, enthusiastic young boy
const VOICES = {
  Ahmed: { id: 'TX3LPaxmHKxFdv7VOQHJ', name: 'Liam' },
  Faisal: { id: 'IKne3meq5aSn9XLyUdCD', name: 'Charlie' },
};

const part1Lines = [
  {
    id: 'l1-p1-1',
    speaker: 'Ahmed',
    text: 'Did you go away in the holidays?',
  },
  {
    id: 'l1-p1-2',
    speaker: 'Faisal',
    text: 'Yes, I went to a village by the river.',
  },
  {
    id: 'l1-p1-3',
    speaker: 'Ahmed',
    text: 'What did you do there?',
  },
  {
    id: 'l1-p1-4',
    speaker: 'Faisal',
    text: 'Oh, I went swimming every day. And I went fishing. It was great!',
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
            stability: 0.52,
            similarity_boost: 0.75,
            style: 0.2,
          },
        }),
      });

      if (!response.ok) {
        const err = await response.text();
        throw new Error(`HTTP ${response.status}: ${err}`);
      }

      const buffer = Buffer.from(await response.arrayBuffer());
      fs.writeFileSync(mp3Path, buffer);

      // Convert to WAV
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

function combinePart1() {
  console.log('[Combining] Stitching part1-full with natural conversational pauses...');
  const silenceWav = path.join(outDir, 'silence_07.wav');
  // 0.7 second natural conversation pause between turns
  execSync(`ffmpeg -y -f lavfi -i anullsrc=r=44100:cl=mono -t 0.7 -q:a 9 -acodec pcm_s16le "${silenceWav}" 2>/dev/null`);

  const concatList = path.join(outDir, 'part1_concat.txt');
  let content = '';
  part1Lines.forEach((line, i) => {
    content += `file '${path.join(outDir, `${line.id}.wav`)}'\n`;
    if (i < part1Lines.length - 1) {
      content += `file '${silenceWav}'\n`;
    }
  });
  fs.writeFileSync(concatList, content);

  const fullWav = path.join(outDir, 'part1-full.wav');
  const fullMp3 = path.join(outDir, 'part1-full.mp3');

  execSync(`ffmpeg -y -f concat -safe 0 -i "${concatList}" -c:a pcm_s16le "${fullWav}" 2>/dev/null`);
  execSync(`ffmpeg -y -i "${fullWav}" -b:a 192k "${fullMp3}" 2>/dev/null`);

  // Cleanup temp concat files
  try {
    fs.unlinkSync(silenceWav);
    fs.unlinkSync(concatList);
  } catch (_) {}

  console.log('[Success] part1-full created successfully!');
}

async function main() {
  for (const line of part1Lines) {
    await generateLine(line);
  }
  combinePart1();

  // Copy updated files to dist if dist exists
  const distDir = path.resolve('dist/audio/lesson-1');
  if (fs.existsSync(distDir)) {
    execSync(`cp -r ${outDir}/* ${distDir}/`);
    console.log('[Synced] Updated dist directory with new audio files.');
  }

  console.log('Done generating Lesson 1 Ahmed & Faisal audio!');
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
