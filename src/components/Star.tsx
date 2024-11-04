import React, { memo } from 'react';
import { Star as StarIcon, Loader2 } from 'lucide-react';
import type { Sound, Position } from '../types';

interface StarProps {
  sound: Sound;
  position: Position;
  onToggle: (id: string) => void;
  isLoading: boolean;
}

export const Star = memo(function Star({ sound, position, onToggle, isLoading }: StarProps) {
  const starSize = sound.isPlaying ? 'w-12 h-12' : 'w-8 h-8';
  
  return (
    <button
      onClick={() => onToggle(sound.id)}
      disabled={isLoading}
      className={`absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ease-in-out
        ${sound.isPlaying ? 'scale-125' : 'scale-100'} 
        ${isLoading ? 'cursor-wait opacity-50' : 'hover:scale-110'}
        disabled:cursor-not-allowed`}
      style={{ left: position.x, top: position.y }}
    >
      {isLoading ? (
        <Loader2 className={`${starSize} animate-spin text-white/70`} />
      ) : (
        <StarIcon 
          className={`${starSize} transition-all duration-300
            ${sound.isPlaying 
              ? 'text-yellow-300 filter drop-shadow-[0_0_8px_rgba(253,224,71,0.8)]' 
              : 'text-white/70 hover:text-white/90'
            }`}
          fill={sound.isPlaying ? 'currentColor' : 'none'}
        />
      )}
      <span className="sr-only">
        {isLoading ? 'Loading' : sound.isPlaying ? 'Stop' : 'Play'} {sound.name}
      </span>
    </button>
  );
});