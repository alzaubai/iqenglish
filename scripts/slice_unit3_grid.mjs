import fs from 'fs';
import path from 'path';
import { Jimp } from 'jimp';

export async function sliceGrid3x3(inputImagePath) {
  if (!fs.existsSync(inputImagePath)) {
    throw new Error(`Input image does not exist: ${inputImagePath}`);
  }

  console.log(`Reading grid image: ${inputImagePath}`);
  const image = await Jimp.read(inputImagePath);
  const totalW = image.bitmap.width;
  const totalH = image.bitmap.height;
  console.log(`Image dimensions: ${totalW}x${totalH}`);

  const publicDir = path.resolve('public/images/lessons');
  const distDir = path.resolve('dist/images/lessons');
  fs.mkdirSync(publicDir, { recursive: true });
  fs.mkdirSync(distDir, { recursive: true });

  const cellW = Math.floor(totalW / 3);
  const cellH = Math.floor(totalH / 3);

  console.log(`Each grid cell: ${cellW}x${cellH}`);

  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 3; col++) {
      const lessonNum = row * 3 + col + 1;
      const x = col * cellW;
      const y = row * cellH;

      // Small 1% margin trim inside each cell to cleanly avoid grid borders
      const marginX = Math.floor(cellW * 0.02);
      const marginY = Math.floor(cellH * 0.02);
      const cropX = x + marginX;
      const cropY = y + marginY;
      const cropW = cellW - (marginX * 2);
      const cropH = cellH - (marginY * 2);

      const cropped = image.clone().crop({
        x: cropX,
        y: cropY,
        w: cropW,
        h: cropH,
      });

      const fileName = `u3-lesson-${lessonNum}.jpg`;
      const publicPath = path.join(publicDir, fileName);
      const distPath = path.join(distDir, fileName);

      await cropped.write(publicPath);
      await cropped.write(distPath);
      console.log(`Saved Lesson ${lessonNum} -> ${publicPath}`);
    }
  }

  console.log('All 9 Unit 3 lesson images successfully cropped and saved!');
}

const inputArg = process.argv[2];
if (inputArg) {
  sliceGrid3x3(inputArg).catch((err) => {
    console.error('Slicing error:', err);
    process.exit(1);
  });
}
