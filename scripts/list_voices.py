import urllib.request
import json

req = urllib.request.Request(
    'https://api.elevenlabs.io/v1/voices',
    headers={'xi-api-key': 'sk_9d6bd9e07aeb3407c94361704c0306594deb3d9b75f6d5aa'}
)
try:
    with urllib.request.urlopen(req) as resp:
        data = json.loads(resp.read().decode())
        print(f"Total voices: {len(data.get('voices', []))}")
        for v in data.get('voices', []):
            labels = v.get('labels', {})
            gender = labels.get('gender', 'unknown')
            age = labels.get('age', 'unknown')
            print(f"{v['voice_id']} | {v['name']} | gender={gender} | age={age}")
except urllib.error.HTTPError as e:
    print('Failed:', e.code, e.read().decode())
