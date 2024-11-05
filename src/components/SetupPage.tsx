import { Plus, Trash2 } from "lucide-react";
import type { Sound, SoundData } from "../types";

interface SetupPageProps {
  sounds: Sound[];
  onUpdate: (sounds: SoundData[]) => void;
}

export function SetupPage({ sounds, onUpdate }: SetupPageProps) {
  const handleAddSound = () => {
    const newSound: SoundData = {
      id: crypto.randomUUID(),
      name: "New Sound",
      url: "https://assets.mixkit.co/active_storage/sfx/2571/2571-preview.mp3",
    };
    onUpdate([...sounds, newSound]);
  };

  const handleRemoveSound = (id: string) => {
    onUpdate(sounds.filter((sound) => sound.id !== id));
  };

  const handleUpdateSound = (id: string, updates: Partial<SoundData>) => {
    onUpdate(
      sounds.map((sound) =>
        sound.id === id ? { ...sound, ...updates } : sound
      )
    );
  };

  return (
    <div className="max-w-2xl p-6 mx-auto">
      <div className="p-6 rounded-lg bg-white/5 backdrop-blur-sm">
        <div className="space-y-4">
          {sounds.map((sound) => (
            <div
              key={sound.id}
              className="flex items-center p-4 space-x-4 rounded-lg bg-white/5"
            >
              <input
                type="text"
                value={sound.name}
                onChange={(e) =>
                  handleUpdateSound(sound.id, { name: e.target.value })
                }
                className="flex-1 px-3 py-2 text-white bg-transparent border rounded border-white/20"
              />
              <input
                type="url"
                value={sound.url}
                onChange={(e) =>
                  handleUpdateSound(sound.id, { url: e.target.value })
                }
                className="px-3 py-2 text-white bg-transparent border rounded flex-2 border-white/20"
                placeholder="Sound URL"
              />
              <button
                onClick={() => handleRemoveSound(sound.id)}
                className="p-2 text-red-400 transition-colors hover:text-red-300"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          ))}
        </div>

        <button
          onClick={handleAddSound}
          className="flex items-center mt-6 space-x-2 transition-colors text-white/70 hover:text-white"
        >
          <Plus className="w-5 h-5" />
          <span>Add Sound</span>
        </button>
      </div>
    </div>
  );
}
