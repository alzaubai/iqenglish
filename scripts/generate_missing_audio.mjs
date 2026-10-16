import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

const API_KEY = process.env.ELEVENLABS_API_KEY || 'sk_ebf5f7f1302c5bc22c793b420aa5e7f1ee4cbbcce75968fa';

const VOICES = {
  Liam: 'TX3LPaxmHKxFdv7VOQHJ',     // Liam (Narrator / Yassir)
  Will: 'bIHbv24MWmeRgasZH58o',     // Will (Simon)
  George: 'JBFqnCBsd6RMkjVDRZzb',   // George (Father)
};

const itemsToGenerate = [
  // --- Lesson 6 Missing Narrator line ---
  {
    targetPath: 'public/audio/unit-2/lesson-6/u2-l6-2b.mp3',
    voiceId: VOICES.Liam,
    text: 'The other boy was from England and his name was Simon.',
    label: 'Lesson 6 - Narrator (Simon intro)',
  },

  // --- Lesson 8 Intro lines ---
  {
    targetPath: 'public/audio/unit-2/lesson-8/u2-l8-t22-intro-1.mp3',
    voiceId: VOICES.Will,
    text: "What's Eid al-Fitr?",
    label: 'Lesson 8 - Simon (Opening question)',
  },
  {
    targetPath: 'public/audio/unit-2/lesson-8/u2-l8-t22-intro-2.mp3',
    voiceId: VOICES.Liam,
    text: 'My father will tell you. Come and meet him.',
    label: 'Lesson 8 - Yassir (Meet father)',
  },

  // --- Lesson 8 Ramadan in England story lines ---
  {
    targetPath: 'public/audio/unit-2/lesson-8/u2-l8-t22-6b.mp3',
    voiceId: VOICES.George,
    text: 'But I remember once I was in England during Ramadan. And it was summer when the days are very long in England. We had to fast for a long time, from five o\'clock in the morning until half past nine at night. That was a bit difficult.',
    label: 'Lesson 8 - Father (Summer fasting in England)',
  },
  {
    targetPath: 'public/audio/unit-2/lesson-8/u2-l8-t22-6c.mp3',
    voiceId: VOICES.Will,
    text: "Wow, yes! But what's Eid al-Fitr?",
    label: 'Lesson 8 - Simon (Reaction & refocus)',
  },
  {
    targetPath: 'public/audio/unit-2/lesson-8/u2-l8-t22-6d.mp3',
    voiceId: VOICES.George,
    text: 'Oh, yes. Sorry.',
    label: 'Lesson 8 - Father (Sorry)',
  },

  // --- Lesson 8 Closing lines ---
  {
    targetPath: 'public/audio/unit-2/lesson-8/u2-l8-t22-12.mp3',
    voiceId: VOICES.Will,
    text: 'Thank you for explaining. It was very interesting.',
    label: 'Lesson 8 - Simon (Thank you)',
  },
  {
    targetPath: 'public/audio/unit-2/lesson-8/u2-l8-t22-13.mp3',
    voiceId: VOICES.George,
    text: 'Not at all.',
    label: 'Lesson 8 - Father (You are welcome)',
  },
];

async function generateTTS(voiceId, text) {
  const url = `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`;
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

async function main() {
  console.log('Generating ONLY missing audio snippets...');
  let totalChars = 0;

  for (const item of itemsToGenerate) {
    console.log(`[GENERATING] ${item.label}: "${item.text}" (${item.text.length} chars)...`);
    totalChars += item.text.length;
    const buf = await generateTTS(item.voiceId, item.text);
    fs.writeFileSync(path.resolve(item.targetPath), buf);
    console.log(` -> Saved ${item.targetPath} (${(buf.length / 1024).toFixed(1)} KB)`);
    // Brief throttle
    await new Promise((r) => setTimeout(r, 400));
  }

  console.log(`\nAll ${itemsToGenerate.length} snippets generated! Total characters consumed: ${totalChars}`);

  // Re-merge Track 6
  console.log('\nRe-merging Track 6 (Different Schools)...');
  const track6Parts = [
    'u2-l6-1.mp3',
    'u2-l6-2.mp3',
    'u2-l6-2b.mp3', // new
    'u2-l6-3.mp3',
    'u2-l6-4.mp3',
    'u2-l6-5.mp3',
    'u2-l6-6.mp3',
    'u2-l6-7.mp3',
    'u2-l6-8.mp3',
    'u2-l6-9.mp3',
    'u2-l6-10.mp3',
  ];
  const track6Buffers = track6Parts.map((f) =>
    fs.readFileSync(path.resolve('public/audio/unit-2/lesson-6', f))
  );
  fs.writeFileSync(
    path.resolve('public/audio/unit-2/track6.mp3'),
    Buffer.concat(track6Buffers)
  );
  console.log('Saved public/audio/unit-2/track6.mp3');

  // Re-merge Track 22
  console.log('\nRe-merging Track 22 (Eid al-Fitr)...');
  const track22Parts = [
    'u2-l8-t22-intro-1.mp3', // new: Simon asks what's eid al-fitr
    'u2-l8-t22-intro-2.mp3', // new: Yassir says my father will tell you
    'u2-l8-t22-1.mp3',       // Yassir: Dad this is Simon...
    'u2-l8-t22-2.mp3',       // Father: How do you do Simon...
    'u2-l8-t22-3.mp3',       // Simon: No I'm afraid I don't
    'u2-l8-t22-4.mp3',       // Father: Ramadan is the name...
    'u2-l8-t22-5.mp3',       // Simon: Isn't that difficult?
    'u2-l8-t22-6.mp3',       // Father: Oh yes we eat when sun goes down...
    'u2-l8-t22-6b.mp3',      // new: Father: But I remember once in England...
    'u2-l8-t22-6c.mp3',      // new: Simon: Wow yes! But what's Eid al-Fitr?
    'u2-l8-t22-6d.mp3',      // new: Father: Oh yes. Sorry.
    'u2-l8-t22-8.mp3',       // Father: Eid al-Fitr is a festival...
    'u2-l8-t22-9.mp3',       // Father: First we pray...
    'u2-l8-t22-10.mp3',      // Simon: Eid Mubarak? What does that mean?
    'u2-l8-t22-11.mp3',      // Father: Oh, Happy Eid...
    'u2-l8-t22-12.mp3',      // new: Simon: Thank you for explaining...
    'u2-l8-t22-13.mp3',      // new: Father: Not at all.
  ];
  const track22Buffers = track22Parts.map((f) =>
    fs.readFileSync(path.resolve('public/audio/unit-2/lesson-8', f))
  );
  fs.writeFileSync(
    path.resolve('public/audio/unit-2/track22.mp3'),
    Buffer.concat(track22Buffers)
  );
  console.log('Saved public/audio/unit-2/track22.mp3');

  console.log('\nSUCCESS! All missing parts generated and merged.');
}

main().catch(console.error);
