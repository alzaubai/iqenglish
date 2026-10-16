import { unit2Lessons } from '../src/data/unit2Data.ts';

for (const l of unit2Lessons) {
  console.log(`\n======================================================`);
  console.log(`LESSON ${l.lessonNumber}: ${l.titleEn} | ${l.titleAr}`);
  console.log(`Book Ref: ${l.subtitleAr || ''} | Subtitle: ${l.subtitleEn || ''}`);
  console.log(`Transcripts: ${l.transcripts?.length || 0}`);
  if (l.transcripts) {
    for (const t of l.transcripts) {
      console.log(`  Track ${t.audioTrackNumber || 'N/A'}: ${t.titleEn} (${t.bookReference})`);
      console.log(`  Lines count: ${t.lines?.length || 0}`);
      for (const line of t.lines) {
        console.log(`    [${line.id}] ${line.speaker}: "${line.textEn.slice(0, 70)}..."`);
      }
    }
  }
}
