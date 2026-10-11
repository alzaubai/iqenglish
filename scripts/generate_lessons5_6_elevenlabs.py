import os
import json
import urllib.request
import urllib.error
import time

API_KEY = os.environ.get('ELEVENLABS_API_KEY', 'sk_9d6bd9e07aeb3407c94361704c0306594deb3d9b75f6d5aa')

# Voices configured with strict adherence to gender:
# Adel (Boy): Will (bIHbv24MWmeRgasZH58o)
# Bassem (Boy): Adam (pNInz6obpgDQGcFmaJgB)
# Nader (Boy): Antoni (ErXwobaYiN019PkySvjV)
# Narrator (Female Teacher): Alice (Xb7hH8MSUJpSbSDYk0k2)

VOICES = {
    'Nader': {'id': 'ErXwobaYiN019PkySvjV', 'name': 'Antoni (Boy)', 'gender': 'male'},
    'Adel': {'id': 'bIHbv24MWmeRgasZH58o', 'name': 'Will (Boy)', 'gender': 'male'},
    'Bassem': {'id': 'pNInz6obpgDQGcFmaJgB', 'name': 'Adam (Boy)', 'gender': 'male'},
    'Narrator': {'id': 'Xb7hH8MSUJpSbSDYk0k2', 'name': 'Alice (Female)', 'gender': 'female'},
}

LESSON_5_DATA = {
    'out_dir': os.path.abspath('public/audio/lesson-5'),
    'track_name': 'track7-full.mp3',
    'lines': [
        {
            'id': 'l5-1',
            'speaker': 'Nader',
            'text': 'My father always has a rest after lunch. I usually do my homework after lunch.',
        },
        {
            'id': 'l5-2',
            'speaker': 'Nader',
            'text': 'I never have a rest in the afternoon. I often watch television for an hour.',
        },
        {
            'id': 'l5-3',
            'speaker': 'Nader',
            'text': 'Then my brother and I sometimes play a game.',
        },
        {
            'id': 'l5-4',
            'speaker': 'Nader',
            'text': 'Of course, Fridays are different. We are never at home. We usually go to the park. We always go to our grandparents house after.',
        },
    ]
}

LESSON_6_TRACK9 = {
    'out_dir': os.path.abspath('public/audio/lesson-6'),
    'track_name': 'track9-full.mp3',
    'lines': [
        {
            'id': 'l6-1',
            'speaker': 'Adel',
            'text': 'Hello, Bassem. Do you want to come to the mall?',
        },
        {
            'id': 'l6-2',
            'speaker': 'Bassem',
            'text': 'Oh, hi, Adel. No, thanks. I am putting some photographs in my scrapbook.',
        },
        {
            'id': 'l6-3',
            'speaker': 'Adel',
            'text': 'Photographs of what? Historical sites in Iraq?',
        },
        {
            'id': 'l6-4',
            'speaker': 'Bassem',
            'text': 'Yes! Historical sites in Iraq. I visit different cities and take pictures of ruins.',
        },
        {
            'id': 'l6-5',
            'speaker': 'Adel',
            'text': 'Do you have many? But why ruins?',
        },
        {
            'id': 'l6-6',
            'speaker': 'Bassem',
            'text': 'I have lots of them. Because I like them.',
        },
    ]
}

LESSON_6_TRACK10 = {
    'out_dir': os.path.abspath('public/audio/lesson-6'),
    'track_name': 'track10-full.mp3',
    'lines': [
        {
            'id': 'l6-t-1',
            'speaker': 'Narrator',
            'text': 'She sells seashells on the seashore.',
        },
        {
            'id': 'l6-t-2',
            'speaker': 'Narrator',
            'text': 'The shells she sells are seashells, I am sure.',
        },
    ]
}

def generate_line(item, out_dir):
    speaker = item['speaker']
    voice_info = VOICES[speaker]
    voice_id = voice_info['id']
    line_id = item['id']
    text = item['text']

    mp3_path = os.path.join(out_dir, f"{line_id}.mp3")
    print(f"  [Generating] {line_id} ({speaker} [{voice_info['gender']}] -> Voice: {voice_info['name']})...")

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
                print(f"  [Saved] {line_id}.mp3 ({len(data)} bytes)")
                time.sleep(0.4)
                return data
        except urllib.error.HTTPError as e:
            err_body = e.read().decode('utf-8', errors='ignore')
            print(f"  Attempt {attempt} failed for {line_id}: HTTP {e.code} - {err_body}")
            time.sleep(2)
        except Exception as e:
            print(f"  Attempt {attempt} failed for {line_id}: {str(e)}")
            time.sleep(2)

    raise RuntimeError(f"Failed to generate {line_id}")

def stitch_track(chunks, out_dir, track_filename):
    full_path = os.path.join(out_dir, track_filename)
    print(f"  [Stitching] Creating {track_filename}...")
    with open(full_path, 'wb') as out_f:
        for chunk in chunks:
            out_f.write(chunk)
    print(f"  [Saved] {track_filename} ({os.path.getsize(full_path)} bytes)")

def process_section(sec_data, label):
    print(f"\n=== Processing {label} ===")
    os.makedirs(sec_data['out_dir'], exist_ok=True)
    chunks = []
    for line in sec_data['lines']:
        chunk = generate_line(line, sec_data['out_dir'])
        chunks.append(chunk)
    stitch_track(chunks, sec_data['out_dir'], sec_data['track_name'])

def main():
    print("==================================================")
    print("Generating ElevenLabs Audios for Lesson 5 & Lesson 6")
    print("Curriculum: English for Iraq - 1st Intermediate")
    print("==================================================")

    # 1. Lesson 5 (Track 7)
    process_section(LESSON_5_DATA, "Lesson 5 (Track 7: Nader)")

    # 2. Lesson 6 (Track 9: Adel & Bassem)
    process_section(LESSON_6_TRACK9, "Lesson 6 (Track 9: Adel & Bassem)")

    # 3. Lesson 6 (Track 10: Tongue-twister)
    process_section(LESSON_6_TRACK10, "Lesson 6 (Track 10: Tongue-twister)")

    print("\nAll audios for Lessons 5 & 6 generated successfully!")

if __name__ == '__main__':
    main()
