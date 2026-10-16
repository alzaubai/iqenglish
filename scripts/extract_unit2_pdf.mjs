import fs from 'fs';
import { PDFParse } from 'pdf-parse';

async function main() {
  console.log('Reading Student Book PDF...');
  const studentBuffer = fs.readFileSync('books/كتاب الانكليزي الطالب الاول المتوسط.pdf');
  const studentParser = new PDFParse({ data: studentBuffer });
  const studentResult = await studentParser.getText();

  console.log(`Student Book has ${studentResult.total} pages.`);
  const studentPages = {};
  for (const page of studentResult.pages) {
    studentPages[page.num] = page.text;
  }
  fs.writeFileSync('scripts/student_book_pages.json', JSON.stringify(studentPages, null, 2));

  console.log('Reading Activity Book PDF...');
  const actBuffer = fs.readFileSync('books/كتاب الانكليزي النشاط الاول المتوسط.pdf');
  const actParser = new PDFParse({ data: actBuffer });
  const actResult = await actParser.getText();

  console.log(`Activity Book has ${actResult.total} pages.`);
  const actPages = {};
  for (const page of actResult.pages) {
    actPages[page.num] = page.text;
  }
  fs.writeFileSync('scripts/activity_book_pages.json', JSON.stringify(actPages, null, 2));

  console.log('Extraction complete!');
}

main().catch(console.error);
