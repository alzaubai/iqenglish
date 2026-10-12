/**
 * Offline Media & Audio Cache Engine
 * إعداد وإشراف مدرس المادة: أ. حسام محمود منصور
 * Automatically pre-downloads lesson recordings and images in the background so they play instantly offline.
 */

import { LessonData } from '../types/curriculum';

const BASE_PREFIX = '/iqenglish';

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

/**
 * Prefetch a single URL into cache
 */
async function prefetchUrl(rawUrl?: string): Promise<void> {
  const finalUrl = normalizeMediaUrl(rawUrl);
  if (!finalUrl) return;

  try {
    if ('caches' in window) {
      const cache = await caches.open('iqenglish-media-v2');
      const match = await cache.match(finalUrl);
      if (!match) {
        // Silently fetch and cache
        const res = await fetch(finalUrl, { mode: 'cors' });
        if (res.ok) {
          await cache.put(finalUrl, res.clone());
        }
      }
    } else {
      // Fallback standard prefetch
      const res = await fetch(finalUrl);
      await res.blob();
    }
  } catch {
    // Ignore offline or transient network errors silently
  }
}

/**
 * Prefetch all media for a specific lesson (Audio + Images)
 */
export async function prefetchLessonMedia(lesson: LessonData): Promise<void> {
  if (!lesson) return;

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

  // Fetch sequentially with slight delay to avoid saturating mobile connection
  for (const url of urlsToPrefetch) {
    await prefetchUrl(url);
    await new Promise((r) => setTimeout(r, 120));
  }
}

/**
 * Prefetch current and upcoming lessons in background idle time
 */
export function startBackgroundMediaPrefetch(allLessons: LessonData[], activeLessonId: string): void {
  if (typeof window === 'undefined') return;

  const runPrefetch = async () => {
    // Priority 1: Current active lesson
    const currentLesson = allLessons.find((l) => l.id === activeLessonId) || allLessons[0];
    if (currentLesson) {
      await prefetchLessonMedia(currentLesson);
    }

    // Priority 2: Other lessons in order
    for (const lesson of allLessons) {
      if (lesson.id !== currentLesson?.id) {
        await prefetchLessonMedia(lesson);
      }
    }
  };

  // Run only when device is idle, 3 seconds after page load
  if ('requestIdleCallback' in window) {
    (window as any).requestIdleCallback(() => {
      setTimeout(runPrefetch, 2500);
    });
  } else {
    setTimeout(runPrefetch, 3000);
  }
}
