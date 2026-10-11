export type SpeakerGender = 'male' | 'female';

export function getSpeakerGender(speaker?: string): SpeakerGender {
  if (!speaker) return 'male';
  const s = speaker.toLowerCase().trim();
  if (
    s.includes('sara') ||
    s.includes('sameera') ||
    s.includes('mariam') ||
    s.includes('maryam') ||
    s.includes('maysam') ||
    s.includes('rawan') ||
    s.includes('huda') ||
    s.includes('muna') ||
    s.includes('rasha') ||
    s.includes('sana') ||
    s.includes('karen') ||
    s.includes('female') ||
    s.includes('girl') ||
    s.includes('mother') ||
    s.includes('sister')
  ) {
    return 'female';
  }
  return 'male';
}

/**
 * Web Speech API utility configured for clear American English (en-US) pronunciation
 * with character-specific voices (Richard = Male, Sara = Female).
 */
export class SpeechEngine {
  private static synth: SpeechSynthesis | null =
    typeof window !== 'undefined' && 'speechSynthesis' in window
      ? window.speechSynthesis
      : null;

  private static voicesLoaded: boolean = false;
  private static cachedVoices: SpeechSynthesisVoice[] = [];

  public static getSpeakerGender(speaker?: string): SpeakerGender {
    return getSpeakerGender(speaker);
  }

  public static isSupported(): boolean {
    return !!this.synth;
  }

  public static init(): void {
    if (!this.synth) return;
    this.cachedVoices = this.synth.getVoices();
    if (this.synth.onvoiceschanged !== undefined) {
      this.synth.onvoiceschanged = () => {
        if (this.synth) {
          this.cachedVoices = this.synth.getVoices();
          this.voicesLoaded = true;
        }
      };
    }
  }

  public static getVoices(): SpeechSynthesisVoice[] {
    if (!this.synth) return [];
    if (this.cachedVoices.length === 0) {
      this.cachedVoices = this.synth.getVoices();
    }
    return this.cachedVoices.filter((v) => v.lang.startsWith('en'));
  }

  public static getVoiceForGender(gender: SpeakerGender): SpeechSynthesisVoice | null {
    const voices = this.getVoices();
    if (voices.length === 0) return null;

    if (gender === 'female') {
      // 1. Google US English / Google female voice (Preferred Google Speech)
      const googleFemale = voices.find(
        (v) =>
          v.name.toLowerCase().includes('google') &&
          (v.name.includes('US English') || v.name.toLowerCase().includes('female') || !v.name.toLowerCase().includes('male'))
      );
      if (googleFemale) return googleFemale;

      // 2. Other natural female voice candidates
      const femaleCandidates = [
        'female',
        'zira',
        'samantha',
        'jenny',
        'aria',
        'victoria',
        'karen',
        'moira',
        'tessa',
        'susan',
        'allison',
        'ava',
      ];
      const match = voices.find((v) => {
        const lower = v.name.toLowerCase();
        return (
          femaleCandidates.some((c) => lower.includes(c)) &&
          !lower.includes('male')
        );
      });
      if (match) return match;
    } else {
      // 1. Google male voices (e.g. Google UK English Male or Google US English)
      const googleMale = voices.find(
        (v) =>
          v.name.toLowerCase().includes('google') &&
          v.name.toLowerCase().includes('male')
      );
      if (googleMale) return googleMale;

      // 2. Male voice candidates
      const maleCandidates = [
        'male',
        'david',
        'guy',
        'mark',
        'alex',
        'daniel',
        'george',
        'fred',
        'oliver',
        'tom',
      ];
      const match = voices.find((v) => {
        const lower = v.name.toLowerCase();
        return maleCandidates.some((c) => lower.includes(c));
      });
      if (match) return match;

      // 3. Fallback to Google US English (can adjust pitch for male)
      const googleUs = voices.find((v) => v.name.toLowerCase().includes('google'));
      if (googleUs) return googleUs;

      // Default male American voice
      const usMale = voices.find(
        (v) => (v.lang === 'en-US' || v.lang === 'en_US') && v.name.toLowerCase().includes('male')
      );
      if (usMale) return usMale;
    }

    // Fallback to best available American voice
    return this.getBestAmericanVoice();
  }

  public static getBestAmericanVoice(): SpeechSynthesisVoice | null {
    const voices = this.getVoices();
    if (voices.length === 0) return null;

    // Prefer Google Speech voices first, then high-quality American English voices
    const preferred =
      voices.find(
        (v) =>
          (v.lang === 'en-US' || v.lang === 'en_US') &&
          v.name.toLowerCase().includes('google')
      ) ||
      voices.find((v) => v.name.toLowerCase().includes('google')) ||
      voices.find(
        (v) =>
          (v.lang === 'en-US' || v.lang === 'en_US') &&
          (v.name.includes('Natural') ||
            v.name.includes('Online') ||
            v.name.includes('Samantha') ||
            v.name.includes('Jenny') ||
            v.name.includes('Guy') ||
            v.name.includes('Aria'))
      ) ||
      voices.find((v) => v.lang === 'en-US' || v.lang === 'en_US') ||
      voices.find((v) => v.lang.startsWith('en'));

    return preferred || null;
  }

  /**
   * Speak an individual word with the exact speaker's character voice and pitch
   * (e.g. Richard = Young American Male, Sara = Young American Female)
   */
  public static speakWord(
    word: string,
    options?: {
      speaker?: string;
      gender?: SpeakerGender;
      rate?: number;
      onStart?: () => void;
      onEnd?: () => void;
      onError?: () => void;
    }
  ): SpeechSynthesisUtterance | null {
    if (!this.synth) return null;

    // Cancel ongoing speech immediately so word clicks are instantaneous
    this.synth.cancel();

    const gender: SpeakerGender =
      options?.gender || getSpeakerGender(options?.speaker);

    const utterance = new SpeechSynthesisUtterance(word);
    utterance.lang = 'en-US';
    // Clear, comfortable speed for single-word educational focus
    utterance.rate = options?.rate ?? 0.82;

    // Character voice and vocal tract formant pitch adjustments
    if (gender === 'female') {
      utterance.pitch = 1.16; // Sweet, natural female resonance matching Sara
      const voice = this.getVoiceForGender('female');
      if (voice) utterance.voice = voice;
    } else {
      utterance.pitch = 0.88; // Confident, young male resonance matching Richard
      const voice = this.getVoiceForGender('male');
      if (voice) utterance.voice = voice;
    }

    if (options?.onStart) utterance.onstart = options.onStart;
    if (options?.onEnd) utterance.onend = options.onEnd;
    if (options?.onError) utterance.onerror = options.onError;

    this.synth.speak(utterance);
    return utterance;
  }

  public static speakText(
    text: string,
    options?: {
      speaker?: string;
      gender?: SpeakerGender;
      rate?: number;
      pitch?: number;
      voice?: SpeechSynthesisVoice | null;
      onStart?: () => void;
      onEnd?: () => void;
      onError?: () => void;
    }
  ): SpeechSynthesisUtterance | null {
    if (!this.synth) return null;

    // Cancel ongoing speech
    this.synth.cancel();

    const gender: SpeakerGender =
      options?.gender || getSpeakerGender(options?.speaker);

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    utterance.rate = options?.rate ?? 0.88;

    if (options?.pitch !== undefined) {
      utterance.pitch = options.pitch;
    } else if (gender === 'female') {
      utterance.pitch = 1.15;
    } else {
      utterance.pitch = 0.9;
    }

    const voice =
      options?.voice ||
      (options?.gender || options?.speaker
        ? this.getVoiceForGender(gender)
        : this.getBestAmericanVoice());

    if (voice) {
      utterance.voice = voice;
    }

    if (options?.onStart) utterance.onstart = options.onStart;
    if (options?.onEnd) utterance.onend = options.onEnd;
    if (options?.onError) utterance.onerror = options.onError;

    this.synth.speak(utterance);
    return utterance;
  }

  public static pause(): void {
    if (this.synth && this.synth.speaking) {
      this.synth.pause();
    }
  }

  public static resume(): void {
    if (this.synth && this.synth.paused) {
      this.synth.resume();
    }
  }

  public static stop(): void {
    if (this.synth) {
      this.synth.cancel();
    }
  }

  public static isSpeaking(): boolean {
    return !!this.synth && this.synth.speaking;
  }
}

// Initialize on load
if (typeof window !== 'undefined') {
  SpeechEngine.init();
}
