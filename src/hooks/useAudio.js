import { useRef, useCallback, useEffect } from 'react';
import audioMap from '../utils/audioMap.js';

const VOICE_SETTINGS = {
  celebration:  { stability: 0.12, similarity_boost: 0.45, style: 0.75, use_speaker_boost: true },
  encouragement:{ stability: 0.16, similarity_boost: 0.50, style: 0.65, use_speaker_boost: true },
  question:     { stability: 0.20, similarity_boost: 0.55, style: 0.55, use_speaker_boost: true },
  emphasis:     { stability: 0.16, similarity_boost: 0.50, style: 0.60, use_speaker_boost: true },
  thinking:     { stability: 0.24, similarity_boost: 0.60, style: 0.35, use_speaker_boost: true },
  statement:    { stability: 0.20, similarity_boost: 0.55, style: 0.50, use_speaker_boost: true },
  instruction:  { stability: 0.20, similarity_boost: 0.55, style: 0.50, use_speaker_boost: true },
};

const VOICE_ID = 'Xb7hH8MSUJpSbSDYk0k2';
const MODEL_ID = 'eleven_multilingual_v2';
const API_KEY  = 'sk_7ef27dccb32144843f8ee5068dfd4223a85326c56c14b00a';

const blobCache = new Map();

export function useAudio(audioEnabled) {
  const currentAudioRef = useRef(null);
  const queueRef        = useRef([]);
  const playingRef      = useRef(false);
  const narrateIdRef    = useRef(0);

  useEffect(() => {
    if (!audioEnabled) {
       narrateIdRef.current++;
       stopAll();
    }
  }, [audioEnabled]);

  const stopAll = useCallback(() => {
    narrateIdRef.current++;
    if (currentAudioRef.current) {
      currentAudioRef.current.pause();
      currentAudioRef.current = null;
    }
    playingRef.current = false;
  }, []);

  const getAudioUrl = useCallback(async (text, style = 'statement') => {
    if (audioMap[text]) return audioMap[text];

    const cacheKey = `${text}__${style}`;
    if (blobCache.has(cacheKey)) return blobCache.get(cacheKey);

    try {
      const settings = VOICE_SETTINGS[style] || VOICE_SETTINGS.statement;
      const res = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}`, {
        method: 'POST',
        headers: {
          'xi-api-key':   API_KEY,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text,
          model_id: MODEL_ID,
          voice_settings: settings,
        }),
      });
      if (!res.ok) throw new Error(`ElevenLabs ${res.status}`);
      const blob = await res.blob();
      const url  = URL.createObjectURL(blob);
      blobCache.set(cacheKey, url);
      return url;
    } catch (err) {
      console.warn('[Audio] ElevenLabs fallback failed:', err.message);
      return null;
    }
  }, []);

  const playSegment = useCallback(async (text, style, expectedId) => {
    if (!audioEnabled || narrateIdRef.current !== expectedId) return;
    const url = await getAudioUrl(text, style);
    if (!url || narrateIdRef.current !== expectedId) return;

    return new Promise((resolve) => {
      const audio = new Audio(url);
      currentAudioRef.current = audio;
      audio.onended  = () => { currentAudioRef.current = null; resolve(); };
      audio.onerror  = () => { currentAudioRef.current = null; resolve(); };
      audio.play().catch(() => resolve());
    });
  }, [audioEnabled, getAudioUrl]);

  const narrate = useCallback(async (segments) => {
    stopAll();
    const currentId = ++narrateIdRef.current;
    playingRef.current = true;

    for (const seg of segments) {
      if (narrateIdRef.current !== currentId) break;
      await playSegment(seg.text, seg.style, currentId);
      if (narrateIdRef.current !== currentId) break;
      await new Promise(r => setTimeout(r, 200));
    }
    if (narrateIdRef.current === currentId) {
      playingRef.current = false;
    }
  }, [stopAll, playSegment]);

  // Tone-based sound effects (no API needed)
  const playTone = useCallback((frequencies, durations) => {
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      let offset = 0;
      frequencies.forEach((freq, i) => {
        const osc  = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.frequency.value = freq;
        gain.gain.setValueAtTime(0.25, ctx.currentTime + offset);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + offset + (durations[i] || 200) / 1000 + 0.3);
        osc.start(ctx.currentTime + offset);
        osc.stop(ctx.currentTime + offset + (durations[i] || 200) / 1000 + 0.3);
        offset += (durations[i] || 200) / 1000;
      });
    } catch { /* ignore */ }
  }, []);

  const sounds = {
    correct: () => playTone([880, 1100, 1320], [120, 120, 200]),
    wrong:   () => playTone([220], [300]),
    badge:   () => playTone([523, 659, 784, 1047], [100, 100, 100, 250]),
    streak:  () => playTone([440, 880, 1100], [80, 80, 200]),
    levelUp: () => playTone([523, 659, 784, 1047, 1319], [70, 70, 70, 70, 300]),
    click:   () => playTone([440], [60]),
  };

  // Segment helpers
  const say       = (text) => ({ text, style: 'statement' });
  const ask       = (text) => ({ text, style: 'question' });
  const cheer     = (text) => ({ text, style: 'celebration' });
  const emphasize = (text) => ({ text, style: 'emphasis' });
  const think     = (text) => ({ text, style: 'thinking' });
  const celebrate = (text) => ({ text, style: 'celebration' });
  const instruct  = (text) => ({ text, style: 'instruction' });
  const encourage = (text) => ({ text, style: 'encouragement' });

  return { narrate, stopAll, sounds, say, ask, cheer, emphasize, think, celebrate, instruct, encourage };
}
