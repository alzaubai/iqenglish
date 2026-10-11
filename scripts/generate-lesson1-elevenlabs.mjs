import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

const API_KEY = 'sk_9d6bd9e07aeb3407c94361704c0306594deb3d9b75f6d5aa';
const outDir = path.resolve('public/audio/lesson-1');
fs.mkdirSync(outDir, { recursive: true });

const VOICES = {
  Ahmed: { id: 'pNInz6obpgDQGcFmaJgB', name: 'Adam' },
  Faisal: { id: 'ErXwobaYiN019PkySvjV', name: 'Antoni' },
  Rasha: { id: 'EXAVITQu4vr4xnSDxMaL', name: 'Bella' },
  Huda: { id: 'Xb7hH8MSUJpSbSDYk0k2', name: 'Alice' },
  Muna: { id: 'cgSgspJ2msm6clMCkdW9', name: 'Jessica' },
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

const part2Lines = [
  {
    id: 'l1-p2-1',
    speaker: 'Rasha',
    text: 'Did you go away in the holidays?',
  },
  {
    id: 'l1-p2-2',
    speaker: 'Huda',
    text: 'No, Muna and I stayed at home.',
  },
  {
    id: 'l1-p2-3',
    speaker: 'Rasha',
    text: 'What did you do all the time?',
  },
  {
    id: 'l1-p2-4',
    speaker: 'Huda',
    text: 'Oh, lots of things. I saw my friends every day. And I made some clothes.',
  },
  {
    id: 'l1-p2-5',
    speaker: 'Rasha',
    text: 'And what did you do, Muna?',
  },
  {
    id: 'l1-p2-6',
    speaker: 'Muna',
    text: 'Not very much. I got up late every day. And I read lots of books. Oh, and I learnt to cook.',
  },
];

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function generateLine(line) {
  const voice = VOICES[line.speaker];
  if (!voice) throw new Error(`Unknown speaker: ${line.speaker}`);

  const mp3Path = path.join(outDir, `${line.id}.mp3`);
  const wavPath = path.join(outDir, `${line.id}.wav`);

  console.log(`[Generating] ${line.id} (${line.speaker} using ElevenLabs voice: ${voice.name})...`);

  let attempts = 0;
  while (attempts < 3) {
    attempts++;
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
          },
        }),
      });

      if (!response.ok) {
        const errText = await response.text();
        throw new Error(`HTTP ${response.status}: ${errText}`);
      }

      const buffer = Buffer.from(await response.arrayBuffer());
      fs.writeFileSync(mp3Path, buffer);

      // Convert to WAV via ffmpeg
      execSync(`ffmpeg -y -i "${mp3Path}" -ar 44100 "${wavPath}" 2>/dev/null`);

      console.log(`[Success] Saved ${line.id}.mp3 & ${line.id}.wav (${buffer.length} bytes)`);
      await sleep(1000);
      return;
    } catch (err) {
      console.warn(`[Retry ${attempts}] Error generating ${line.id}: ${err.message}`);
      await sleep(3000);
    }
  }

  throw new Error(`Failed to generate ${line.id} after 3 attempts.`);
}

function combineClips(lines, outputBaseName) {
  console.log(`[Combining] Creating full track for ${outputBaseName}...`);
  // Generate 0.5s silence
  const silenceWav = path.join(outDir, 'silence.wav');
  execSync(`ffmpeg -y -f lavfi -i anullsrc=r=44100:cl=mono -t 0.5 -q:a 9 -acodec pcm_s16le "${silenceWav}" 2>/dev/null`);

  const concatListPath = path.join(outDir, `${outputBaseName}_concat.txt`);
  let concatContent = '';
  lines.forEach((line, idx) => {
    const lineWav = path.join(outDir, `${line.id}.wav`);
    concatContent += `file '${lineWav}'\n`;
    if (idx < lines.length - 1) {
      concatContent += `file '${silenceWav}'\n`;
    }
  });

  fs.writeFileSync(concatListPath, concatContent);

  const outWav = path.join(outDir, `${outputBaseName}.wav`);
  const outMp3 = path.join(outDir, `${outputBaseName}.mp3`);

  execSync(`ffmpeg -y -f concat -safe 0 -i "${concatListPath}" -c copy "${outWav}" 2>/dev/null`);
  execSync(`ffmpeg -y -i "${outWav}" -codec:a libmp3lame -qscale:a 2 "${outMp3}" 2>/dev/null`);

  // Cleanup concat list and silence
  if (fs.existsSync(concatListPath)) fs.unlinkSync(concatListPath);
  if (fs.existsSync(silenceWav)) fs.unlinkSync(silenceWav);

  console.log(`[Combined Full] Saved ${outputBaseName}.wav and ${outputBaseName}.mp3`);
}

async function main() {
  console.log('=== Starting ElevenLabs Audio Generation for Lesson 1 ===');
  console.log('Voices configured:');
  console.log(' - Ahmed -> Adam');
  console.log(' - Faisal -> Antoni');
  console.log(' - Rasha -> Bella');
  console.log(' - Huda -> Alice');
  console.log(' - Muna -> Jessica\n');

  console.log('--- Generating Part 1 Lines ---');
  for (const line of part1Lines) {
    await generateLine(line);
  }
  combineClips(part1Lines, 'part1-full');

  console.log('\n--- Generating Part 2 Lines ---');
  for (const line of part2Lines) {
    await generateLine(line);
  }
  combineClips(part2Lines, 'part2-full');

  console.log('\n=== All Lesson 1 Audio Files Generated Successfully! ===');
}

main().catch((err) => {
  console.error('Fatal execution error:', err);
  process.exit(1);
});
