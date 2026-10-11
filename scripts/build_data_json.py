import re
import json

def parse_ts_to_json():
    # Read files
    with open('src/data/unit1Data.ts', 'r', encoding='utf-8') as f:
        unit1_content = f.read()

    with open('src/data/activityBookAllLessons.ts', 'r', encoding='utf-8') as f:
        activity_content = f.read()

    with open('src/data/grammarData.ts', 'r', encoding='utf-8') as f:
        grammar_content = f.read()

    print("Read TS files successfully.")

if __name__ == '__main__':
    parse_ts_to_json()
