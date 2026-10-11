import os
import json
import urllib.request
import urllib.error
import time

API_KEY = os.environ.get('ELEVENLABS_API_KEY', 'sk_9d6bd9e07aeb3407c94361704c0306594deb3d9b75f6d5aa')
OUT_DIR = os.path.abspath('public/audio/lesson-4')
os.makedirs(OUT_DIR, exist_ok=True)

# Strictly Female for Girls, Male for Boys
# Based on English for Iraq - 1st Intermediate - Unit 1 Lesson 4
VOICES = {
    'Maysam': {'id': 'EXAVITQu4vr4xnSDxMaL', 'name': 'Sarah (Girl)', 'gender': 'female'},
    'Adel': {'id': 'bIHbv24MWmeRgasZH58o', 'name': 'Will (Boy)', 'gender': 'male'},
    'Bassem': {'id': 'pNInz6obpgDQGcFmaJgB', 'name': 'Adam (Boy)', 'gender': 'male'},
    'Rawan': {'id': 'Xb7hH8MSUJpSbSDYk0k2', 'name': 'Alice (Girl)', 'gender': 'female'},
    'Muna': {'id': 'cgSgspJ2msm6clMCkdW9', 'name': 'Jessica (Girl)', 'gender': 'female'},
    'Laith': {'id': 'ErXwobaYiN019PkySvjV', 'name': 'Antoni (Boy)', 'gender': 'male'},
}

LESSON_4_LINES = [
    {
        'id': 'l4-1',
        'speaker': 'Maysam',
        'text': 'I am Maysam. In my spare time, I like finding out about other countries. I have lots of pictures and stamps. Scrapbook 3 is mine.',
    },
    {
        'id': 'l4-2',
        'speaker': 'Adel',
        'text': 'I am Adel. Some day, I want to go to Africa. Then I can take my own photos of the animals. Scrapbook 6 is mine.',
    },
    {
        'id': 'l4-3',
        'speaker': 'Bassem',
        'text': 'I am Bassem. I want to be a pilot. I am very interested in planes and flying. Scrapbook 4 is mine.',
    },
    {
        'id': 'l4-4',
        'speaker': 'Rawan',
        'text': 'I am Rawan. I enjoy collecting pictures of plants and flowers from around the world. Scrapbook 1 is mine.',
    },
    {
        'id': 'l4-5',
        'speaker': 'Muna',
        'text': 'I am Muna. I am interested in birds. In my spare time, I take photos and find out their names. Scrapbook 2 is mine.',
    },
    {
        'id': 'l4-6',
        'speaker': 'Laith',
        'text': 'I am Laith. I play football and watch it on television. I go to matches. Scrapbook 5 is mine.',
    },
]

def generate_line(item):
    speaker = item['speaker']
    voice_info = VOICES[speaker]
    voice_id = voice_info['id']
    line_id = item['id']
    text = item['text']

    mp3_path = os.path.join(OUT_DIR, f"{line_id}.mp3")
    print(f"[Generating] {line_id} ({speaker} [{voice_info['gender']}] -> Voice: {voice_info['name']})...")

    url = f"https://api.elevenlabs.io/v1/text-to-speech/{voice_id}"
    payload = json.dumps({
        'text': text,
        'model_id': 'eleven_multilingual_v2',
        'voice_settings': {
            'stability': 0.55,
            'similarity_boost': 0.75,
            'style': 0.25,
        }
    }).encode('utf-8')

    for attempt in range(1, 4):
        try:
            req = urllib.request.Request(
                url,
                data=payload,
                headers={
                    'xi-api-key': API_KEY,
                    'Content-Type': 'application/json',
                }
            )
            with urllib.request.urlopen(req) as resp:
                data = resp.read()
                with open(mp3_path, 'wb') as f:
                    f.write(data)
                print(f"[Saved] {line_id}.mp3 ({len(data)} bytes)")
                time.sleep(0.5)
                return data
        except urllib.error.HTTPError as e:
            err_body = e.read().decode('utf-8', errors='ignore')
            print(f"Attempt {attempt} failed for {line_id}: HTTP {e.code} - {err_body}")
            time.sleep(2)
        except Exception as e:
            print(f"Attempt {attempt} failed for {line_id}: {str(e)}")
            time.sleep(2)

    raise RuntimeError(f"Failed to generate {line_id}")

def stitch_full_track(audio_chunks):
    full_mp3_path = os.path.join(OUT_DIR, "track5-full.mp3")
    print("[Stitching] Creating track5-full.mp3...")
    with open(full_mp3_path, 'wb') as out_f:
        for chunk in audio_chunks:
            out_f.write(chunk)
    print(f"[Saved] track5-full.mp3 ({os.path.getsize(full_mp3_path)} bytes)")

def main():
    print("=== ElevenLabs Audio Generation for Lesson 4 ===")
    print("Curriculum: English for Iraq - 1st Intermediate - Unit 1 Lesson 4")
    print("Voices: 3 Girls (Maysam, Rawan, Muna), 3 Boys (Adel, Bassem, Laith)")
    print("-" * 50)
    audio_chunks = []
    for item in LESSON_4_LINES:
        chunk = generate_line(item)
        audio_chunks.append(chunk)
    stitch_full_track(audio_chunks)
    print("=== Successfully generated all Lesson 4 audios! ===")

if __name__ == '__main__':
    main()
