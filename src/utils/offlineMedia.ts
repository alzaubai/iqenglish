/**
 * Offline Media & Audio Cache Engine
 * إعداد وإشراف مدرس المادة: أ. حسام محمود منصور
 * Automatically pre-downloads lesson recordings and images in the background so they play instantly offline.
 */

import { LessonData } from '../types/curriculum';

const BASE_PREFIX = '/iqenglish';
const MEDIA_CACHE = 'iqenglish-media-v3';

function normalizeMediaUrl(url?: string): string | null {
  if (!url || typeof url !== 'string') return null;
  const trimmed = url.trim();
  if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) {
    return trimmed;
  }
  if (trimmed.startsWith(BASE_PREFIX)) {
    return trimmed;
  }
  if (trimmed.startsWith('/')) {
    return `${BASE_PREFIX}${trimmed}`;
  }
  return `${BASE_PREFIX}/${trimmed}`;
}

async function prefetchUrl(rawUrl?: string): Promise<void> {
  const finalUrl = normalizeMediaUrl(rawUrl);
  if (!finalUrl) return;

  try {
    if ('caches' in window) {
      const cache = await caches.open(MEDIA_CACHE);
      const match = await cache.match(finalUrl);
      if (!match) {
        const res = await fetch(finalUrl);
        if (res.ok) {
          await cache.put(finalUrl, res.clone());
        }
      }
    }
  } catch {
    // Silently ignore any errors
  }
}

export async function prefetchLessonMedia(lesson: LessonData): Promise<void> {
  if (!lesson) return;

  try {
    const urlsToPrefetch: string[] = [];

    if (lesson.imageUrl) {
      urlsToPrefetch.push(lesson.imageUrl);
    }

    if (Array.isArray(lesson.transcripts)) {
      for (const t of lesson.transcripts) {
        if (t.audioUrl) urlsToPrefetch.push(t.audioUrl);
        if (t.comicStripImage) urlsToPrefetch.push(t.comicStripImage);
        if (Array.isArray(t.lines)) {
          for (const line of t.lines) {
            if (line.imageUrl) urlsToPrefetch.push(line.imageUrl);
            if (line.audioSegmentUrl) urlsToPrefetch.push(line.audioSegmentUrl);
          }
        }
      }
    }

    for (const url of urlsToPrefetch) {
      await prefetchUrl(url);
      await new Promise((r) => setTimeout(r, 150));
    }
  } catch {
    // Ignore silently
  }
}

export function startBackgroundMediaPrefetch(allLessons: LessonData[], activeLessonId: string): void {
  if (typeof window === 'undefined') return;

  setTimeout(async () => {
    try {
      const currentLesson = allLessons.find((l) => l.id === activeLessonId) || allLessons[0];
      if (currentLesson) {
        await prefetchLessonMedia(currentLesson);
      }
    } catch {
      // Ignore silently
    }
  }, 4000);
}
