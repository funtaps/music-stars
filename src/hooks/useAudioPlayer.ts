import { useEffect, useRef, useCallback } from 'react';
import type { Sound } from '../types';

export function useAudioPlayer(sounds: Sound[]) {
  const audioRefs = useRef<Map<string, HTMLAudioElement>>(new Map());
  const loadingStates = useRef<Map<string, boolean>>(new Map());

  const preloadAudio = useCallback(async (sound: Sound): Promise<HTMLAudioElement> => {
    return new Promise((resolve, reject) => {
      const audio = new Audio();
      
      const handleLoad = () => {
        audio.removeEventListener('canplaythrough', handleLoad);
        audio.removeEventListener('error', handleError);
        resolve(audio);
      };

      const handleError = (e: ErrorEvent) => {
        audio.removeEventListener('canplaythrough', handleLoad);
        audio.removeEventListener('error', handleError);
        reject(new Error(`Failed to load audio: ${e.message}`));
      };

      audio.addEventListener('canplaythrough', handleLoad);
      audio.addEventListener('error', handleError);

      audio.preload = 'auto';
      audio.src = sound.url;
      audio.load();
    });
  }, []);

  useEffect(() => {
    const loadAudio = async (sound: Sound) => {
      if (!audioRefs.current.has(sound.id) && !loadingStates.current.get(sound.id)) {
        loadingStates.current.set(sound.id, true);
        
        try {
          const audio = await preloadAudio(sound);
          audio.loop = true;
          audioRefs.current.set(sound.id, audio);
        } catch (error) {
          console.error(`Error loading audio for ${sound.name}:`, error);
        } finally {
          loadingStates.current.set(sound.id, false);
        }
      }
    };

    sounds.forEach(loadAudio);

    // Cleanup function
    return () => {
      audioRefs.current.forEach((audio) => {
        audio.pause();
        audio.src = '';
      });
      audioRefs.current.clear();
      loadingStates.current.clear();
    };
  }, [sounds, preloadAudio]);

  const pauseSound = useCallback((id: string): boolean | undefined => {
    const audio = audioRefs.current.get(id);
    if (!audio) return;
    audio.pause();
    audio.currentTime = 0;
    return true;
  }, []);

  const playSound = useCallback((id: string): boolean | undefined => {
    const audio = audioRefs.current.get(id);
    if (!audio) return;
    audio.play();
    return true;
  }, []);

  const toggleSound = useCallback((id: string): boolean | undefined => {
    const audio = audioRefs.current.get(id);
    if (!audio) return;

    if (!audio.paused) {
      pauseSound(id);
      return false;
    } else {
      playSound(id);
      return true;
    }
  }, []);

  const isLoading = useCallback((id: string): boolean => {
    return loadingStates.current.get(id) || false;
  }, []);

  return { toggleSound, pauseSound, playSound, isLoading };
}