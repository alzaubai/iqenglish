import { GoogleGenAI } from '@google/genai';
import fs from 'fs';
import path from 'path';

const ai = new GoogleGenAI();
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const outDir = path.resolve('public/audio/lesson-2');
fs.mkdirSync(outDir, { recursive: true });

function cleanAndFadeWav(rawBuffer) {
  let pos = 12;
  let dataOffset = -1;
  let dataLen = 0;
  let sampleRate = 24000;
  let numChannels = 1;
  let bitsPerSample = 16;

  while (pos + 8 <= rawBuffer.length) {
    const chunkId = rawBuffer.subarray(pos, pos + 4).toString('ascii');
    const chunkSize = rawBuffer.readUInt32LE(pos + 4);
    if (chunkId === 'fmt ') {
      numChannels = rawBuffer.readUInt16LE(pos + 10);
      sampleRate = rawBuffer.readUInt32LE(pos + 12);
      bitsPerSample = rawBuffer.readUInt16LE(pos + 22);
    } else if (chunkId === 'data') {
      dataOffset = pos + 8;
      dataLen = chunkSize;
      break;
    }
    pos += 8 + chunkSize;
  }

  if (dataOffset === -1) {
    throw new Error('No data chunk found');
  }

  const actualLen = Math.min(rawBuffer.length - dataOffset, dataLen);
  const cleanLen = actualLen - (actualLen % 2);
  const pcm = Buffer.from(rawBuffer.subarray(dataOffset, dataOffset + cleanLen));

  const bytesPerSample = bitsPerSample / 8;
  const totalSamples = pcm.length / bytesPerSample;
  const fadeSamples = Math.min(Math.floor(sampleRate * 0.02), totalSamples); // 20ms fade-out
  const startFade = totalSamples - fadeSamples;

  for (let i = 0; i < fadeSamples; i++) {
    const sampleIdx = Math.floor((startFade + i) * bytesPerSample);
    if (sampleIdx + 1 < pcm.length) {
      const originalVal = pcm.readInt16LE(sampleIdx);
      const progress = i / fadeSamples;
      const factor = 0.5 * (1 + Math.cos(Math.PI * progress));
      pcm.writeInt16LE(Math.round(originalVal * factor), sampleIdx);
    }
  }

  return { pcm, sampleRate, numChannels, bitsPerSample };
}

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

const richardLines = [
  {
    id: 'l2-r-1',
    text: 'I went to Iraq with my family in the holidays. I took lots of photos, and I have put some in my scrapbook.',
    voice: 'Puck',
  },
  {
    id: 'l2-r-2',
    text: 'We arrived in Baghdad at night, so we just went to bed in our hotel.',
    voice: 'Puck',
  },
  {
    id: 'l2-r-3',
    text: 'Next day, we toured the city. In the afternoon, there was a football match at Al-Shaab Stadium. My father, my sisters and I really enjoyed the game. The players were fantastic! My mother did not like it so much.',
    voice: 'Puck',
  },
  {
    id: 'l2-r-4',
    text: 'After a few days in Baghdad, we took a coach down to the historical site of Ur. A long time ago, this was the capital of the ancient Sumerian people. It is famous as the birthplace of the prophet Abraham.',
    voice: 'Puck',
  },
  {
    id: 'l2-r-5',
    text: 'The ziggurat is huge! It is about twenty-one metres high. No wonder it is one of the most famous monuments in the world!',
    voice: 'Puck',
  },
  {
    id: 'l2-r-6',
    text: 'On Wednesday, we took a car across to the marshes. The boat trip was quite exciting. My mother told us to sit still, but it was hard to! We saw birds we had never seen before - flamingos and herons and pelicans.',
    voice: 'Puck',
  },
  {
    id: 'l2-r-7',
    text: 'The next day, we travelled to Erbil. It was a long journey, and my sisters were fed up. On Friday morning, we looked around the markets. Then I was fed up! Shopping is so boring!',
    voice: 'Puck',
  },
  {
    id: 'l2-r-8',
    text: 'I liked the Citadel, though. The yellow stone is so bright in the sunshine. It is very high up, and the view is amazing.',
    voice: 'Puck',
  },
  {
    id: 'l2-r-9',
    text: 'For our last trip, we went to Hatra. We stayed at a hotel in the middle of Mosul. Hatra used to be a great city. It was a very important place in many civilizations. The old temples are still beautiful. I will never forget Hatra, or the other wonderful places we visited.',
    voice: 'Puck',
  },
];

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

async function generateClip(line) {
  const dest = path.join(outDir, `${line.id}.wav`);
  if (fs.existsSync(dest) && fs.statSync(dest).size > 1000) {
    console.log(`[Skip] Already exists: ${line.id}.wav`);
    const raw = fs.readFileSync(dest);
    return cleanAndFadeWav(raw).pcm;
  }

  console.log(`[TTS] Generating ${line.id}.wav (${line.voice})...`);
  let attempts = 0;
  while (attempts < 6) {
    attempts++;
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash-lite-tts',
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
        const rawBuf = Buffer.from(base64, 'base64');
        const { pcm, sampleRate, numChannels, bitsPerSample } = cleanAndFadeWav(rawBuf);
        const header = buildWavHeader(pcm.length, sampleRate, numChannels, bitsPerSample);
        const finalWav = Buffer.concat([header, pcm]);
        fs.writeFileSync(dest, finalWav);
        console.log(`[Saved] ${line.id}.wav (${finalWav.length} bytes)`);
        await sleep(5000); // polite pause between requests
        return pcm;
      }
    } catch (err) {
      console.warn(`[Retry ${attempts}] Error: ${err?.message || err}. Waiting 15s...`);
      await sleep(15000);
    }
  }
  throw new Error(`Failed to generate ${line.id}.wav after multiple attempts`);
}

async function run() {
  console.log('--- Starting Lesson 2 Audio Generation ---');
  
  // 1. Generate Richard's lines (Male voice Puck)
  console.log('Generating Richard in Iraq clips (Voice: Puck)...');
  const richardPcms = [];
  for (const line of richardLines) {
    const pcm = await generateClip(line);
    richardPcms.push(pcm);
  }

  // Combine Richard full track
  const silence = createSilenceBuffer(550); // 550ms natural pause between lines
  const richardCombinedList = [];
  for (let i = 0; i < richardPcms.length; i++) {
    richardCombinedList.push(richardPcms[i]);
    if (i < richardPcms.length - 1) {
      richardCombinedList.push(silence);
    }
  }
  const richardFullPcm = Buffer.concat(richardCombinedList);
  const richardFullHeader = buildWavHeader(richardFullPcm.length);
  const richardFullWav = Buffer.concat([richardFullHeader, richardFullPcm]);
  fs.writeFileSync(path.join(outDir, 'track2-richard-full.wav'), richardFullWav);
  console.log(`[Complete] Saved track2-richard-full.wav (${richardFullWav.length} bytes)`);

  // 2. Generate Sara's lines (Female voice Kore)
  console.log('Generating Sara in Iraq clips (Voice: Kore)...');
  const saraPcms = [];
  for (const line of saraLines) {
    const pcm = await generateClip(line);
    saraPcms.push(pcm);
  }

  // Combine Sara full track
  const saraCombinedList = [];
  for (let i = 0; i < saraPcms.length; i++) {
    saraCombinedList.push(saraPcms[i]);
    if (i < saraPcms.length - 1) {
      saraCombinedList.push(silence);
    }
  }
  const saraFullPcm = Buffer.concat(saraCombinedList);
  const saraFullHeader = buildWavHeader(saraFullPcm.length);
  const saraFullWav = Buffer.concat([saraFullHeader, saraFullPcm]);
  fs.writeFileSync(path.join(outDir, 'track3-sara-full.wav'), saraFullWav);
  console.log(`[Complete] Saved track3-sara-full.wav (${saraFullWav.length} bytes)`);

  console.log('--- All Lesson 2 audio generation finished successfully! ---');
}

run().catch((err) => {
  console.error('Fatal error in generation:', err);
  process.exit(1);
});
