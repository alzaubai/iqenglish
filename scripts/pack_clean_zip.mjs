import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

const root = 'C:\\Users\\Lenovo\\.gemini\\antigravity\\scratch\\english-for-iraq-unit-1';
const staging = 'C:\\Users\\Lenovo\\.gemini\\antigravity\\scratch\\zip-staging';

if (fs.existsSync(staging)) fs.rmSync(staging, { recursive: true, force: true });
fs.mkdirSync(staging, { recursive: true });

const items = fs.readdirSync(root);

for (const item of items) {
  if (['node_modules', '.git', 'dist', 'zip-staging'].includes(item)) continue;
  const src = path.join(root, item);
  const dest = path.join(staging, item);
  fs.cpSync(src, dest, { recursive: true });
}

console.log('Staged files successfully. Compressing...');
const destZip = 'c:\\Users\\Lenovo\\Downloads\\عمر وخالد\\قص\\english-for-iraq---unit-1-layers (2).zip';
execSync(`powershell -NoProfile -Command "Compress-Archive -Path '${staging}\\*' -DestinationPath '${destZip}' -Force"`);
fs.rmSync(staging, { recursive: true, force: true });
console.log('Zip file updated successfully! Size:', fs.statSync(destZip).size);
