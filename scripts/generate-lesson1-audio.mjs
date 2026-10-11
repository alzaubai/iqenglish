import { GoogleGenAI } from '@google/genai';
import fs from 'fs';
import path from 'path';

const ai = new GoogleGenAI();
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const outDir = path.resolve('public/audio/lesson-1');
fs.mkdirSync(outDir, { recursive: true });

function buildWavHeader(pcmLength, sampleRate = 24000, numChannels = 1, bitsPerSample = 16) {
  const byteRate = (sampleRate * numChannels * bitsPerSample) / 8;
  const blockAlign = (numChannels * bitsPerSample) / 8;
  const header = Buffer.alloc(44);
  header.write('RIFF', 0);
  header.writeUInt32LE(36 + pcmLength, 4);
  header.write('WAVE', 8);
  header.write('fmt ', 12);
  header.writeUInt32LE(16, 16);
  header.writeUInt16LE(1, 20);
  header.writeUInt16LE(numChannels, 22);
  header.writeUInt32LE(sampleRate, 24);
  header.writeUInt32LE(byteRate, 28);
  header.writeUInt16LE(blockAlign, 32);
  header.writeUInt16LE(bitsPerSample, 34);
  header.write('data', 36);
  header.writeUInt32LE(pcmLength, 40);
  return header;
}

function createSilenceBuffer(durationMs, sampleRate = 24000, numChannels = 1, bitsPerSample = 16) {
  const bytesPerSample = bitsPerSample / 8;
  const totalBytes = Math.floor((durationMs / 1000) * sampleRate * numChannels * bytesPerSample);
  const alignedBytes = totalBytes - (totalBytes % 2);
  return Buffer.alloc(alignedBytes, 0);
}

const part1Lines = [
  { id: 'l1-p1-1', text: 'Did you go away in the holidays?', voice: 'Puck' },
  { id: 'l1-p1-2', text: 'Yes, I went to a village by the river.', voice: 'Charon' },
  { id: 'l1-p1-3', text: 'What did you do there?', voice: 'Puck' },
  { id: 'l1-p1-4', text: 'Oh, I went swimming every day. And I went fishing. It was great!', voice: 'Charon' },
];

const part2Lines = [
  { id: 'l1-p2-1', text: 'Did you go away in the holidays?', voice: 'Zephyr' },
  { id: 'l1-p2-2', text: 'No, Muna and I stayed at home.', voice: 'Kore' },
  { id: 'l1-p2-3', text: 'What did you do all the time?', voice: 'Zephyr' },
  { id: 'l1-p2-4', text: 'Oh, lots of things. I saw my friends every day. And I made some clothes.', voice: 'Kore' },
  { id: 'l1-p2-5', text: 'And what did you do, Muna?', voice: 'Zephyr' },
  { id: 'l1-p2-6', text: 'Not very much. I got up late every day. And I read lots of books. Oh, and I learnt to cook.', voice: 'Kore' },
];

async function generateClip(line) {
  const dest = path.join(outDir, `${line.id}.wav`);
  if (fs.existsSync(dest) && fs.statSync(dest).size > 1000) {
    const raw = fs.readFileSync(dest);
    return raw.subarray(44);
  }

  let attempts = 0;
  while (attempts < 5) {
    attempts++;
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-preview-tts',
        contents: [{ role: 'user', parts: [{ text: line.text }] }],
        config: {
          responseModalities: ['AUDIO'],
          speechConfig: {
            voiceConfig: {
              prebuiltVoiceConfig: { voiceName: line.voice },
            },
          },
        },
      });

      const base64 = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
      if (base64) {
        const rawPcm = Buffer.from(base64, 'base64');
        const header = buildWavHeader(rawPcm.length, 24000, 1, 16);
        const finalWav = Buffer.concat([header, rawPcm]);
        fs.writeFileSync(dest, finalWav);
        console.log(`[Saved] ${line.id}.wav (${finalWav.length} bytes)`);
        await sleep(2500);
        return rawPcm;
      }
    } catch (err) {
      console.warn(`[Retry ${attempts}] Error: ${err?.message || err}. Waiting 6s...`);
      await sleep(6000);
    }
  }
  throw new Error(`Failed to generate ${line.id}.wav`);
}

async function run() {
  console.log('Generating Lesson 1 Part 1 audio...');
  const p1Pcms = [];
  for (const line of part1Lines) {
    const pcm = await generateClip(line);
    p1Pcms.push(pcm);
  }
  const silence = createSilenceBuffer(450);
  const p1Combined = [];
  for (let i = 0; i < p1Pcms.length; i++) {
    p1Combined.push(p1Pcms[i]);
    if (i < p1Pcms.length - 1) p1Combined.push(silence);
  }
  const p1Pcm = Buffer.concat(p1Combined);
  const p1Wav = Buffer.concat([buildWavHeader(p1Pcm.length), p1Pcm]);
  fs.writeFileSync(path.join(outDir, 'part1-full.wav'), p1Wav);
  console.log('[Complete] Saved part1-full.wav');

  console.log('Generating Lesson 1 Part 2 audio...');
  const p2Pcms = [];
  for (const line of part2Lines) {
    const pcm = await generateClip(line);
    p2Pcms.push(pcm);
  }
  const p2Combined = [];
  for (let i = 0; i < p2Pcms.length; i++) {
    p2Combined.push(p2Pcms[i]);
    if (i < p2Pcms.length - 1) p2Combined.push(silence);
  }
  const p2Pcm = Buffer.concat(p2Combined);
  const p2Wav = Buffer.concat([buildWavHeader(p2Pcm.length), p2Pcm]);
  fs.writeFileSync(path.join(outDir, 'part2-full.wav'), p2Wav);
  console.log('[Complete] Saved part2-full.wav');
}

run().catch(console.error);
