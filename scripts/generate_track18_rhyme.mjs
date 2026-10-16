import fs from 'fs';
import path from 'path';

const API_KEY = 'sk_f4d486de52917fb5d4e1befca662caa7b1a1cc41f63951a1';
const CHARLIE_VOICE_ID = 'IKne3meq5aSn9XLyUdCD'; // Charlie: Lively, enthusiastic young boy

// The 6 rhythmic lines for the poem
const lines = [
  {
    id: 'u2-l4-t18-1',
    text: 'Thirty days has September,',
    spokenText: 'Thirty days... has September,',
  },
  {
    id: 'u2-l4-t18-2',
    text: 'April, June and November.',
    spokenText: 'April, June... and November!',
  },
  {
    id: 'u2-l4-t18-3',
    text: 'All the rest have thirty-one,',
    spokenText: 'All the rest... have thirty-one,',
  },
  {
    id: 'u2-l4-t18-4',
    text: 'Except February alone,',
    spokenText: 'Except February... alone,',
  },
  {
    id: 'u2-l4-t18-5',
    text: 'With only twenty-eight days clear,',
    spokenText: 'With only twenty-eight days clear,',
  },
  {
    id: 'u2-l4-t18-6',
    text: 'And twenty-nine in each leap year!',
    spokenText: 'And twenty-nine... in each leap year!',
  },
];

const fullPoemSpoken = `Thirty days has September,
April, June... and November!
All the rest have thirty-one,
Except February alone,
With only twenty-eight days clear,
And twenty-nine... in each leap year!`;

async function generateAudio(text, voiceSettings) {
  const res = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${CHARLIE_VOICE_ID}`, {
    method: 'POST',
    headers: {
      'xi-api-key': API_KEY,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      text,
      model_id: 'eleven_multilingual_v2',
      voice_settings: voiceSettings || {
        stability: 0.35,
        similarity_boost: 0.80,
        style: 0.70,
        use_speaker_boost: true,
      },
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`ElevenLabs error: ${res.status} - ${err}`);
  }
  return Buffer.from(await res.arrayBuffer());
}

async function main() {
  const targetDir = path.resolve('public/audio/unit-2/lesson-4');
  const distDir = path.resolve('dist/audio/unit-2/lesson-4');
  const unit2AudioDir = path.resolve('public/audio/unit-2');
  const distUnit2AudioDir = path.resolve('dist/audio/unit-2');

  fs.mkdirSync(targetDir, { recursive: true });
  fs.mkdirSync(distDir, { recursive: true });

  console.log('Generating continuous Track 18 full rhyme...');
  const fullTrackBuf = await generateAudio(fullPoemSpoken, {
    stability: 0.38,
    similarity_boost: 0.82,
    style: 0.75,
    use_speaker_boost: true,
  });

  fs.writeFileSync(path.join(unit2AudioDir, 'track18.mp3'), fullTrackBuf);
  fs.writeFileSync(path.join(distUnit2AudioDir, 'track18.mp3'), fullTrackBuf);
  console.log('  Saved track18.mp3 (Full rhythmic poem)');

  console.log('\nGenerating 6 individual rhythmic lines...');
  for (const line of lines) {
    console.log(`  Generating ${line.id}: "${line.text}"`);
    const buf = await generateAudio(line.spokenText, {
      stability: 0.40,
      similarity_boost: 0.80,
      style: 0.65,
      use_speaker_boost: true,
    });

    fs.writeFileSync(path.join(targetDir, `${line.id}.mp3`), buf);
    fs.writeFileSync(path.join(distDir, `${line.id}.mp3`), buf);
    console.log(`  Saved ${line.id}.mp3 (${buf.length} bytes)`);
    await new Promise((r) => setTimeout(r, 600));
  }

  console.log('\nDone! All Track 18 rhyme files generated successfully.');
}

main().catch(console.error);
