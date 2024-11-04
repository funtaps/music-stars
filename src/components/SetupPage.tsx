import React from 'react';
import { Plus, Trash2, Music } from 'lucide-react';
import type { Sound, SoundData } from '../types';

interface SetupPageProps {
  sounds: Sound[];
  onUpdate: (sounds: SoundData[]) => void;
}

export function SetupPage({ sounds, onUpdate }: SetupPageProps) {
  const handleAddSound = () => {
    const newSound: SoundData = {
      id: crypto.randomUUID(),
      name: 'New Sound',
      url: 'https://assets.mixkit.co/active_storage/sfx/2571/2571-preview.mp3'
    };
    onUpdate([...sounds, newSound]);
  };

  const handleRemoveSound = (id: string) => {
    onUpdate(sounds.filter(sound => sound.id !== id));
  };

  const handleUpdateSound = (id: string, updates: Partial<SoundData>) => {
    onUpdate(
      sounds.map(sound =>
        sound.id === id ? { ...sound, ...updates } : sound
      )
    );
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="bg-white/5 rounded-lg p-6 backdrop-blur-sm">
        <div className="space-y-4">
          {sounds.map((sound) => (
            <div
              key={sound.id}
              className="flex items-center space-x-4 bg-white/5 p-4 rounded-lg"
            >
              <Music className="text-white/70" />
              <input
                type="text"
                value={sound.name}
                onChange={(e) =>
                  handleUpdateSound(sound.id, { name: e.target.value })
                }
                className="flex-1 bg-transparent text-white border border-white/20 rounded px-3 py-2"
              />
              <input
                type="url"
                value={sound.url}
                onChange={(e) =>
                  handleUpdateSound(sound.id, { url: e.target.value })
                }
                className="flex-2 bg-transparent text-white border border-white/20 rounded px-3 py-2"
                placeholder="Sound URL"
              />
              <button
                onClick={() => handleRemoveSound(sound.id)}
                className="p-2 text-red-400 hover:text-red-300 transition-colors"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          ))}
        </div>

        <button
          onClick={handleAddSound}
          className="mt-6 flex items-center space-x-2 text-white/70 hover:text-white transition-colors"
        >
          <Plus className="w-5 h-5" />
          <span>Add Sound</span>
        </button>
      </div>
    </div>
  );
}