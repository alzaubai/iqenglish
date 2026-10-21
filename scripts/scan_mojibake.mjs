import fs from 'fs';
import path from 'path';

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(fullPath));
    } else if (file.endsWith('.ts') || file.endsWith('.tsx')) {
      results.push(fullPath);
    }
  });
  return results;
}

const files = walk('src');
let totalCorruptedFiles = 0;

for (const file of files) {
  const content = fs.readFileSync(file, 'utf8');
  const matches = content.match(/[ØÙ][^\s\n"'\<\>]+/g);
  if (matches && matches.length > 0) {
    totalCorruptedFiles++;
    console.log(`[!] Found ${matches.length} corrupted tokens in: ${file}`);
    matches.slice(0, 3).forEach(m => console.log('    Sample:', m));
  }
}

if (totalCorruptedFiles === 0) {
  console.log('✅ ALL files in src/ are completely clean! 0 Mojibake characters found!');
}
