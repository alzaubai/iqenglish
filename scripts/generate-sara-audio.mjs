import { GoogleGenAI } from '@google/genai';
import fs from 'fs';
import path from 'path';

const ai = new GoogleGenAI();
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const outDir = path.resolve('public/audio/lesson-2');
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
  header.writeUInt16LE(1, 20); // Linear PCM
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

const saraLines = [
  {
    id: 'l2-s-1',
    text: 'I enjoyed my holidays very much. I did not go away, but my friend, Sameera, came and stayed with me. She lives in Abu Dhabi. We are the same age - thirteen.',
    voice: 'Kore',
  },
  {
    id: 'l2-s-2',
    text: 'I visited her last year. Sameera first visited Iraq when she was seven - a long time ago! We took her to lots of lovely places on her visit.',
    voice: 'Kore',
  },
  {
    id: 'l2-s-3',
    text: 'We went to the museum, and Sameera said it was very interesting. One weekend, we went to Hatra. Sameera loved that, too. She said it was a fantastic place.',
    voice: 'Kore',
  },
  {
    id: 'l2-s-4',
    text: 'Sometimes in the evenings, we went walking along the river with my parents. It was beautiful. Sometimes we had dinner in a restaurant. We had such delicious food!',
    voice: 'Kore',
  },
];

async function generateSaraClip(line) {
  const dest = path.join(outDir, `${line.id}.wav`);
  if (fs.existsSync(dest) && fs.statSync(dest).size > 1000) {
    console.log(`[Skip] Already exists: ${line.id}.wav`);
    const raw = fs.readFileSync(dest);
    return raw.subarray(44);
  }

  console.log(`[TTS] Generating Sara line: ${line.id}.wav (Voice: ${line.voice})...`);
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
        await sleep(3000);
        return rawPcm;
      }
    } catch (err) {
      console.warn(`[Retry ${attempts}] Error: ${err?.message || err}. Waiting 8s...`);
      await sleep(8000);
    }
  }
  throw new Error(`Failed to generate ${line.id}.wav after multiple attempts`);
}

async function run() {
  console.log('--- Generating Sara audio files (Female Voice: Kore) ---');
  const saraPcms = [];
  for (const line of saraLines) {
    const pcm = await generateSaraClip(line);
    saraPcms.push(pcm);
  }

  // Combine Sara into track3-sara-full.wav
  const silence = createSilenceBuffer(550);
  const combinedList = [];
  for (let i = 0; i < saraPcms.length; i++) {
    combinedList.push(saraPcms[i]);
    if (i < saraPcms.length - 1) {
      combinedList.push(silence);
    }
  }
  const fullPcm = Buffer.concat(combinedList);
  const fullHeader = buildWavHeader(fullPcm.length, 24000, 1, 16);
  const fullWav = Buffer.concat([fullHeader, fullPcm]);
  fs.writeFileSync(path.join(outDir, 'track3-sara-full.wav'), fullWav);
  console.log(`[Complete] Saved track3-sara-full.wav (${fullWav.length} bytes)`);
}

run().catch((err) => {
  console.error('Fatal error in Sara generation:', err);
  process.exit(1);
});
