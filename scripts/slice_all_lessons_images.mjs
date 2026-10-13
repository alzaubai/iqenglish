import fs from 'fs';
import path from 'path';
import { Jimp } from 'jimp';

const OUT_DIR = path.resolve('public/images/dialogue');
const DIST_DIR = path.resolve('dist/images/dialogue');

fs.mkdirSync(OUT_DIR, { recursive: true });
fs.mkdirSync(DIST_DIR, { recursive: true });

async function sliceImage(srcPath, crops) {
  console.log(`Loading ${srcPath}...`);
  const img = await Jimp.read(srcPath);

  for (const crop of crops) {
    const cropped = img.clone().crop({
      x: crop.x,
      y: crop.y,
      w: crop.w,
      h: crop.h,
    });

    const targetPublic = path.join(OUT_DIR, crop.name);
    const targetDist = path.join(DIST_DIR, crop.name);

    await cropped.write(targetPublic);
    await cropped.write(targetDist);
    console.log(`  Saved: ${crop.name} (${crop.w}x${crop.h})`);
  }
}

async function main() {
  const img1Path = 'C:/Users/Lenovo/.gemini/antigravity/brain/7f23ec0b-6042-4cd7-afcb-839ed659fa74/.user_uploaded/media_1791849637609_31ebd54b.jpg';
  const img2Path = 'C:/Users/Lenovo/.gemini/antigravity/brain/7f23ec0b-6042-4cd7-afcb-839ed659fa74/.user_uploaded/media_1791849643878_2bd7ffc2.jpg';
  const img3Path = 'C:/Users/Lenovo/.gemini/antigravity/brain/7f23ec0b-6042-4cd7-afcb-839ed659fa74/.user_uploaded/media_1791849649761_d80a212c.jpg';

  console.log('=== CROPPING LESSON 6 & 7 (IMAGE 1) ===');
  await sliceImage(img1Path, [
    // Lesson 6 (Row 0)
    { name: 'l6-1.jpg', x: 25, y: 42, w: 231, h: 206 },
    { name: 'l6-2.jpg', x: 272, y: 42, w: 231, h: 206 },
    { name: 'l6-3.jpg', x: 520, y: 42, w: 231, h: 206 },
    { name: 'l6-4.jpg', x: 768, y: 42, w: 231, h: 206 },
    // Lesson 6 (Row 1)
    { name: 'l6-5.jpg', x: 25, y: 284, w: 231, h: 210 },
    { name: 'l6-6.jpg', x: 272, y: 284, w: 231, h: 210 },
    { name: 'l6-t-1.jpg', x: 520, y: 284, w: 231, h: 210 },
    { name: 'l6-t-2.jpg', x: 768, y: 284, w: 231, h: 210 },
    // Lesson 7 (Row 2)
    { name: 'l7-1.jpg', x: 25, y: 529, w: 231, h: 208 },
    { name: 'l7-2.jpg', x: 272, y: 529, w: 231, h: 208 },
    { name: 'l7-3.jpg', x: 520, y: 529, w: 231, h: 208 },
    { name: 'l7-4.jpg', x: 768, y: 529, w: 231, h: 208 },
  ]);

  console.log('\n=== CROPPING LESSON 10 (IMAGE 2) ===');
  await sliceImage(img2Path, [
    // Lesson 10 (Row 0)
    { name: 'l10-1.jpg', x: 21, y: 18, w: 232, h: 226 },
    { name: 'l10-2.jpg', x: 271, y: 18, w: 232, h: 226 },
    { name: 'l10-3.jpg', x: 521, y: 18, w: 232, h: 226 },
    { name: 'l10-4.jpg', x: 771, y: 18, w: 232, h: 226 },
    // Lesson 10 (Row 1)
    { name: 'l10-5.jpg', x: 21, y: 262, w: 232, h: 225 },
    { name: 'l10-6.jpg', x: 271, y: 262, w: 232, h: 225 },
    { name: 'l10-7.jpg', x: 521, y: 262, w: 232, h: 225 },
    { name: 'l10-8.jpg', x: 771, y: 262, w: 232, h: 225 },
  ]);

  console.log('\n=== CROPPING LESSON 8 (IMAGE 3) ===');
  await sliceImage(img3Path, [
    // Lesson 8 (Row 0)
    { name: 'l8-1.jpg', x: 31, y: 71, w: 303, h: 216 },
    { name: 'l8-2.jpg', x: 361, y: 71, w: 302, h: 216 },
    { name: 'l8-3.jpg', x: 690, y: 71, w: 303, h: 216 },
    // Lesson 8 (Row 1)
    { name: 'l8-4.jpg', x: 30, y: 394, w: 306, h: 218 },
    { name: 'l8-5.jpg', x: 381, y: 394, w: 284, h: 218 },
  ]);

  console.log('\n=== ALL 25 LESSON IMAGES SUCCESSFULLY CROPPED AND PERSISTED! ===');
}

main().catch((err) => {
  console.error('Fatal cropping error:', err);
  process.exit(1);
});
