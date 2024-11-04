import React from 'react';
import { Star, Loader } from 'lucide-react';
import { Sound } from '../types';

interface SoundStarProps {
  sound: Sound;
  isPlaying: boolean;
  isLoading: boolean;
  onClick: () => void;
}

export function SoundStar({ sound, isPlaying, isLoading, onClick }: SoundStarProps) {
  return (
    <div className="relative group">
      <button
        onClick={onClick}
        disabled={isLoading}
        className={`
          w-full aspect-square rounded-lg
          ${isPlaying ? 'bg-purple-500/20' : 'bg-white/5'}
          backdrop-blur-sm
          transition-all duration-300
          hover:bg-white/10
          flex items-center justify-center
          disabled:cursor-not-allowed
          disabled:opacity-50
        `}
      >
        {isLoading ? (
          <Loader className="w-12 h-12 text-white/70 animate-spin" />
        ) : (
          <Star
            className={`w-12 h-12 transition-all duration-300 ${
              isPlaying
                ? 'text-purple-400 fill-purple-400 scale-110'
                : 'text-white/70 group-hover:text-white/90'
            }`}
          />
        )}
      </button>
      <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="bg-black/80 text-white text-sm px-3 py-1 rounded-full whitespace-nowrap">
          {sound.name}
        </div>
      </div>
    </div>
  );
}