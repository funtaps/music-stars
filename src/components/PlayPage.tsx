import React, { useState } from 'react';
import { Star } from 'lucide-react';
import { Sound } from '../types';
import { SoundStar } from './SoundStar';
import { useAudioPlayer } from '../hooks/useAudioPlayer';

interface PlayPageProps {
  sounds: Sound[];
}

export function PlayPage({ sounds }: PlayPageProps) {
  const [playingStates, setPlayingStates] = useState<Record<string, boolean>>({});
  const { toggleSound, isLoading } = useAudioPlayer(sounds);

  const handleStarClick = (id: string) => {
    const isNowPlaying = toggleSound(id);
    if (isNowPlaying !== undefined) {
      setPlayingStates(prev => ({
        ...prev,
        [id]: isNowPlaying
      }));
    }
  };

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {sounds.map((sound) => (
          <SoundStar
            key={sound.id}
            sound={sound}
            isPlaying={playingStates[sound.id]}
            isLoading={isLoading(sound.id)}
            onClick={() => handleStarClick(sound.id)}
          />
        ))}
      </div>
    </div>
  );
}