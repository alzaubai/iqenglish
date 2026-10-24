import fs from 'fs';
import path from 'path';

// Load key from environment or argument or fallback
const API_KEY = process.env.ELEVENLABS_API_KEY || process.argv[2] || '';

if (!API_KEY) {
  console.error('Error: Please provide an active ElevenLabs API key: bun scripts/generate_ahmed_story_elevenlabs.mjs <API_KEY>');
  process.exit(1);
}

const outDir = path.resolve('public/audio/lesson-7');
fs.mkdirSync(outDir, { recursive: true });

// Voice Persona: Charlie (lively, natural young boy) with interactive settings
const VOICE_ID = 'IKne3meq5aSn9XLyUdCD'; // Charlie

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
  console.log(`[GENERATING] ${scene.id} (${scene.text.length} chars) with dynamic stability 0.32...`);

  const url = `https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}`;
  const payload = {
    text: scene.text,
    model_id: 'eleven_multilingual_v2',
    voice_settings: {
      stability: 0.32, // Lower stability for expressive, dynamic, interactive storytelling
      similarity_boost: 0.75,
      style: 0.35,
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
  await sleep(800); // Respect rate limit
  return buffer;
}

async function main() {
  console.log('=== STARTING ELEVENLABS AUDIO GENERATION FOR AHMED STORY ===');
  console.log(`Using Voice: Charlie (${VOICE_ID})`);
  console.log('Settings: stability=0.32 (dynamic/expressive), style=0.35\n');

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
  console.log('=== ALL 6 SCENES + FULL STORY GENERATED SUCCESSFULLY! ===');
}

main().catch((err) => {
  console.error('\nFatal Error:', err.message);
  process.exit(1);
});
