import fs from 'fs';

let content = fs.readFileSync('src/data/unit3ActivityBookData.ts', 'utf8');

content = content.replace(
  "titleEn: 'Giving Advice: Choose (should) or (shouldn't)',",
  'titleEn: "Giving Advice: Choose (should) or (shouldn\'t)",'
);

content = content.replace(
  "promptEn: 'Why couldn't Gran clean the house and garden herself?',",
  'promptEn: "Why couldn\'t Gran clean the house and garden herself?",'
);

content = content.replace(
  "options: [\r\n            'Because her back hurt.',\r\n            'Because she was travelling to London.',\r\n            'Because she didn't like flowers.',\r\n            'Because she was watching television.',\r\n          ],",
  'options: [\r\n            "Because her back hurt.",\r\n            "Because she was travelling to London.",\r\n            "Because she didn\'t like flowers.",\r\n            "Because she was watching television.",\r\n          ],'
);

// Also try LF
content = content.replace(
  "options: [\n            'Because her back hurt.',\n            'Because she was travelling to London.',\n            'Because she didn't like flowers.',\n            'Because she was watching television.',\n          ],",
  'options: [\n            "Because her back hurt.",\n            "Because she was travelling to London.",\n            "Because she didn\'t like flowers.",\n            "Because she was watching television.",\n          ],'
);

fs.writeFileSync('src/data/unit3ActivityBookData.ts', content, 'utf8');
console.log('Fixed apostrophes in unit3ActivityBookData.ts');
