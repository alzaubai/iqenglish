import fs from 'fs';

const content = fs.readFileSync('src/App.tsx', 'utf8');

// Find all matches of corrupted strings
const matches = content.match(/[ØÙ][^\n"'\<\>]+/g) || [];
console.log(`Found ${matches.length} corrupted snippets in App.tsx`);

for (const sample of matches.slice(0, 5)) {
  const restored = Buffer.from(sample, 'latin1').toString('utf8');
  console.log(`Original: "${sample}" -> Restored: "${restored}"`);
}
