import fs from 'fs';

const fb = fs.readFileSync('src/services/firebase.ts', 'utf8');
const fbLines = fb.split('\n');

for (let i = 0; i < fbLines.length; i++) {
  const line = fbLines[i];
  if (/[ØÙ]/.test(line)) {
    console.log(`FB Line ${i + 1}: ${line.trim()}`);
  }
}
