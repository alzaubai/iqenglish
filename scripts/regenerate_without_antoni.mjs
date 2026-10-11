import fs from 'fs';
import path from 'path';

const API_KEY = process.env.ELEVENLABS_API_KEY || 'sk_9d6bd9e07aeb3407c94361704c0306594deb3d9b75f6d5aa';

// NEW VOICE ASSIGNMENTS (ANTONI IS COMPLETELY BANNED):
// Nader: Charlie (IKne3meq5aSn9XLyUdCD) - Young, lively, friendly boy
// Bassem: Liam (TX3LPaxmHKxFdv7VOQHJ) - Clear, youthful, bright boy
// Laith: George (JBFqnCBsd6RMkjVDRZzb) - Energetic, youthful boy
// Adel: Will (bIHbv24MWmeRgasZH58o) - Boy
// Maysam: Sarah (EXAVITQu4vr4xnSDxMaL) - Girl
// Rawan: Alice (Xb7hH8MSUJpSbSDYk0k2) - Girl
// Muna: Jessica (cgSgspJ2msm6clMCkdW9) - Girl
// Narrator: Alice (Xb7hH8MSUJpSbSDYk0k2) - Female

const VOICES = {
  Nader: { id: 'IKne3meq5aSn9XLyUdCD', name: 'Charlie (Boy)' },
  Bassem: { id: 'TX3LPaxmHKxFdv7VOQHJ', name: 'Liam (Boy)' },
  Laith: { id: 'JBFqnCBsd6RMkjVDRZzb', name: 'George (Boy)' },
  Adel: { id: 'bIHbv24MWmeRgasZH58o', name: 'Will (Boy)' },
  Maysam: { id: 'EXAVITQu4vr4xnSDxMaL', name: 'Sarah (Girl)' },
  Rawan: { id: 'Xb7hH8MSUJpSbSDYk0k2', name: 'Alice (Girl)' },
  Muna: { id: 'cgSgspJ2msm6clMCkdW9', name: 'Jessica (Girl)' },
  Narrator: { id: 'Xb7hH8MSUJpSbSDYk0k2', name: 'Alice (Female)' },
};

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function generateAudio(voiceId, text) {
  const url = `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`;
  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
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
        const err = await res.text();
        throw new Error(`HTTP ${res.status}: ${err}`);
      }
      return Buffer.from(await res.arrayBuffer());
    } catch (e) {
      console.warn(`Attempt ${attempt} failed: ${e.message}`);
      await sleep(1500);
    }
  }
  throw new Error(`Failed to generate audio for text: ${text}`);
}

async function updateLesson5() {
  console.log('\n=== 1. Regenerating Lesson 5 (Nader -> Charlie) ===');
  const outDir = path.resolve('public/audio/lesson-5');
  fs.mkdirSync(outDir, { recursive: true });

  const lines = [
    { id: 'l5-1', text: 'My father always has a rest after lunch. I usually do my homework after lunch.' },
    { id: 'l5-2', text: 'I never have a rest in the afternoon. I often watch television for an hour.' },
    { id: 'l5-3', text: 'Then my brother and I sometimes play a game.' },
    { id: 'l5-4', text: 'Of course, Fridays are different. We are never at home. We usually go to the park. We always go to our grandparents house after.' },
  ];

  const chunks = [];
  for (const item of lines) {
    console.log(`  [Lesson 5] ${item.id} (Nader -> Charlie)...`);
    const buf = await generateAudio(VOICES.Nader.id, item.text);
    fs.writeFileSync(path.join(outDir, `${item.id}.mp3`), buf);
    chunks.push(buf);
    await sleep(400);
  }

  const fullTrack = Buffer.concat(chunks);
  fs.writeFileSync(path.join(outDir, 'track7-full.mp3'), fullTrack);
  console.log(`  [Lesson 5] Saved track7-full.mp3 (${fullTrack.length} bytes)`);
}

async function updateLesson4() {
  console.log('\n=== 2. Regenerating Lesson 4 (Bassem -> Liam, Laith -> George) ===');
  const outDir = path.resolve('public/audio/lesson-4');

  // Regenerate Bassem (l4-3)
  console.log('  [Lesson 4] l4-3 (Bassem -> Liam)...');
  const bassemBuf = await generateAudio(
    VOICES.Bassem.id,
    'I am Bassem. I want to be a pilot. I am very interested in planes and flying. Scrapbook 4 is mine.'
  );
  fs.writeFileSync(path.join(outDir, 'l4-3.mp3'), bassemBuf);
  await sleep(400);

  // Regenerate Laith (l4-6)
  console.log('  [Lesson 4] l4-6 (Laith -> George)...');
  const laithBuf = await generateAudio(
    VOICES.Laith.id,
    'I am Laith. I play football and watch it on television. I go to matches. Scrapbook 5 is mine.'
  );
  fs.writeFileSync(path.join(outDir, 'l4-6.mp3'), laithBuf);
  await sleep(400);

  // Re-stitch track5-full.mp3
  console.log('  [Lesson 4] Re-stitching track5-full.mp3...');
  const chunks = [
    fs.readFileSync(path.join(outDir, 'l4-1.mp3')), // Maysam
    fs.readFileSync(path.join(outDir, 'l4-2.mp3')), // Adel
    bassemBuf,                                      // Bassem (Liam)
    fs.readFileSync(path.join(outDir, 'l4-4.mp3')), // Rawan
    fs.readFileSync(path.join(outDir, 'l4-5.mp3')), // Muna
    laithBuf,                                       // Laith (George)
  ];
  const fullTrack = Buffer.concat(chunks);
  fs.writeFileSync(path.join(outDir, 'track5-full.mp3'), fullTrack);
  console.log(`  [Lesson 4] Saved track5-full.mp3 (${fullTrack.length} bytes)`);
}

async function updateLesson6() {
  console.log('\n=== 3. Regenerating Lesson 6 (Bassem -> Liam) ===');
  const outDir = path.resolve('public/audio/lesson-6');

  // Bassem lines in Lesson 6: l6-2, l6-4, l6-6
  const bassemLines = [
    { id: 'l6-2', text: 'Oh, hi, Adel. No, thanks. I am putting some photographs in my scrapbook.' },
    { id: 'l6-4', text: 'Yes! Historical sites in Iraq. I visit different cities and take pictures of ruins.' },
    { id: 'l6-6', text: 'I have lots of them. Because I like them.' },
  ];

  for (const item of bassemLines) {
    console.log(`  [Lesson 6] ${item.id} (Bassem -> Liam)...`);
    const buf = await generateAudio(VOICES.Bassem.id, item.text);
    fs.writeFileSync(path.join(outDir, `${item.id}.mp3`), buf);
    await sleep(400);
  }

  // Re-stitch track9-full.mp3
  console.log('  [Lesson 6] Re-stitching track9-full.mp3...');
  const track9Chunks = [
    fs.readFileSync(path.join(outDir, 'l6-1.mp3')), // Adel
    fs.readFileSync(path.join(outDir, 'l6-2.mp3')), // Bassem (Liam)
    fs.readFileSync(path.join(outDir, 'l6-3.mp3')), // Adel
    fs.readFileSync(path.join(outDir, 'l6-4.mp3')), // Bassem (Liam)
    fs.readFileSync(path.join(outDir, 'l6-5.mp3')), // Adel
    fs.readFileSync(path.join(outDir, 'l6-6.mp3')), // Bassem (Liam)
  ];
  const fullTrack9 = Buffer.concat(track9Chunks);
  fs.writeFileSync(path.join(outDir, 'track9-full.mp3'), fullTrack9);
  console.log(`  [Lesson 6] Saved track9-full.mp3 (${fullTrack9.length} bytes)`);
}

async function main() {
  console.log('====================================================');
  console.log('Permanently Removing & Replacing Antoni from All Lessons');
  console.log('====================================================');

  await updateLesson5();
  await updateLesson4();
  await updateLesson6();

  console.log('\nAll audio files have been successfully regenerated without Antoni!');
}

main().catch((err) => {
  console.error('Error during regeneration:', err);
  process.exit(1);
});
