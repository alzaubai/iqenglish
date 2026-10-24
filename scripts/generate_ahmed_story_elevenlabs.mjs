import fs from 'fs';
import path from 'path';

// Load key from environment or argument
const API_KEY = process.env.ELEVENLABS_API_KEY || process.argv[2] || '';

if (!API_KEY) {
  console.error('Error: Please provide an active ElevenLabs API key: bun scripts/generate_ahmed_story_elevenlabs.mjs <API_KEY>');
  process.exit(1);
}

const outDir = path.resolve('public/audio/lesson-7');
fs.mkdirSync(outDir, { recursive: true });

// Voice Persona: Liam (TX3LPaxmHKxFdv7VOQHJ) - Authentic American Accent, Youthful / Schoolboy
const VOICE_ID = 'TX3LPaxmHKxFdv7VOQHJ'; // Liam (American Youth)

const SCENES = [
  {
    id: 'ahmed-1',
    text: "In the holidays, Ahmed and his family stayed in a hotel in New York. Ahmed's friend, Faisal, lives in New York with his family. Faisal is seventeen, two years older than Ahmed.",
  },
  {
    id: 'ahmed-2',
    text: "One day, Ahmed took a taxi to Faisal's flat. He got there at half past two.",
  },
  {
    id: 'ahmed-3',
    text: "'What do you want to do?' asked Faisal. 'Let's go to the cinema,' said Ahmed. They went to the cinema, but they didn't stay long because the film was boring.",
  },
  {
    id: 'ahmed-4',
    text: "They went for a walk in the park. It is a huge park called Central Park. The boys sat under a tree and talked. They talked about Iraq. Faisal said that he liked New York, but he wanted to go back to Iraq.",
  },
  {
    id: 'ahmed-5',
    text: "Then they talked about their families. Faisal said that he did not have any brothers or sisters. Ahmed said that there were four children in his family. They had a great time together.",
  },
  {
    id: 'ahmed-6',
    text: "At five o'clock, Ahmed took a taxi back to his hotel.",
  },
];

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function generateSceneAudio(scene) {
  const filePath = path.join(outDir, `${scene.id}.mp3`);
  console.log(`[GENERATING] ${scene.id} (${scene.text.length} chars) with American accent (Liam)...`);

  const url = `https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}`;
  const payload = {
    text: scene.text,
    model_id: 'eleven_multilingual_v2',
    voice_settings: {
      stability: 0.38, // Dynamic and expressive with American intonation
      similarity_boost: 0.80,
      style: 0.25,
    },
  };

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'xi-api-key': API_KEY,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`HTTP ${response.status}: ${errText}`);
  }

  const buffer = Buffer.from(await response.arrayBuffer());
  fs.writeFileSync(filePath, buffer);
  console.log(`[SUCCESS] Saved ${filePath} (${buffer.length} bytes)`);
  await sleep(1000); // Polite rate limit
  return buffer;
}

async function main() {
  console.log('=== REGENERATING AHMED STORY AUDIO WITH AMERICAN ACCENT (LIAM) ===');
  console.log(`Voice: Liam (${VOICE_ID}) - American Accent, Youthful Storyteller`);
  console.log('Settings: stability=0.38, similarity_boost=0.80, style=0.25\n');

  const buffers = [];
  for (const scene of SCENES) {
    const buf = await generateSceneAudio(scene);
    buffers.push(buf);
  }

  // Concatenate into full story track
  const fullTrackPath = path.join(outDir, 'ahmed-story-full.mp3');
  const merged = Buffer.concat(buffers);
  fs.writeFileSync(fullTrackPath, merged);
  console.log(`\n[FULL TRACK SAVED] ${fullTrackPath} (${merged.length} bytes)`);
  console.log('=== ALL 6 SCENES REGENERATED SUCCESSFULLY WITH AMERICAN ACCENT! ===');
}

main().catch((err) => {
  console.error('\nFatal Error:', err.message);
  process.exit(1);
});
