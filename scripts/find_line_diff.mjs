import fs from 'fs';
import { execSync } from 'child_process';

const oldApp = execSync('git -C "C:/Users/Lenovo/.gemini/antigravity/scratch/english-for-iraq-unit-1" show 9e7b825:src/App.tsx', { encoding: 'utf8' });
const currApp = fs.readFileSync('src/App.tsx', 'utf8');

const currLines = currApp.split('\n');

for (let i = 0; i < currLines.length; i++) {
  const line = currLines[i];
  if (/[ØÙ]/.test(line)) {
    console.log(`Current Line ${i + 1}: ${line.trim()}`);
  }
}
