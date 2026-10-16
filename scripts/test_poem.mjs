import fs from 'fs';

const API_KEY = 'sk_f4d486de52917fb5d4e1befca662caa7b1a1cc41f63951a1';

const voices = [
  { id: 'IKne3meq5aSn9XLyUdCD', name: 'Charlie' },
  { id: 'cgSgspJ2msm6clMCkdW9', name: 'Jessica' },
];

const poem = `Thirty days has September,
April, June, and November!
All the rest have thirty-one,
Except February alone,
With only twenty-eight days clear,
And twenty-nine in each leap year!`;

async function run() {
  for (const v of voices) {
    console.log('Testing voice:', v.name);
    const res = await fetch('https://api.elevenlabs.io/v1/text-to-speech/' + v.id, {
      method: 'POST',
      headers: { 'xi-api-key': API_KEY, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        text: poem,
        model_id: 'eleven_multilingual_v2',
        voice_settings: {
          stability: 0.30,
          similarity_boost: 0.75,
          style: 0.70,
          use_speaker_boost: true
        }
      })
    });
    if (res.ok) {
      const buf = Buffer.from(await res.arrayBuffer());
      fs.writeFileSync(`test_poem_${v.name}.mp3`, buf);
      console.log(`Saved test_poem_${v.name}.mp3, size:`, buf.length);
    } else {
      console.error('Error:', await res.text());
    }
  }
}

run();
