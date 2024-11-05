import { useState } from "react";
import { PlayPage } from "./components/PlayPage";
import { SetupPage } from "./components/SetupPage";
import { defaultSounds } from "./data/defaultSounds";
import type { Sound, SoundData } from "./types";
import { Vector3 } from "three";
import { useAudioPlayer } from "./hooks/useAudioPlayer";

const randomPosition = () =>
  new Vector3(
    Math.random() * 10 - 5,
    Math.random() * 10 - 5,
    Math.random() * 10 - 5
  );

function App() {
  const [currentPage, setCurrentPage] = useState<"play" | "setup">("play");
  const [sounds, setSounds] = useState<Sound[]>(
    defaultSounds.map((sound) => ({
      ...sound,
      position: randomPosition(),
    }))
  );
  const { pauseSound, playSound, isLoading } = useAudioPlayer(sounds);
  const [playingStates, setPlayingStates] = useState<Record<string, boolean>>(
    defaultSounds.reduce((acc, sound) => {
      acc[sound.id as string] = false;
      return acc;
    }, {} as Record<string, boolean>)
  );
  const newSounds = (soundData: SoundData[]) => {
    setSounds(
      soundData.map((sound) => ({
        ...sound,
        position: randomPosition(),
      }))
    );
    setPlayingStates(
      soundData.reduce((acc, sound) => {
        acc[sound.id] = false;
        return acc;
      }, {} as Record<string, boolean>)
    );
  };
  const stopSound = (id: string) => {
    setPlayingStates({
      ...playingStates,
      [id]: false,
    });
    pauseSound(id);
  };
  const startSound = (id: string) => {
    setPlayingStates({
      ...playingStates,
      [id]: true,
    });
    playSound(id);
  };

  const stopAllSounds = () => {
    Object.keys(playingStates).forEach((id) => {
      if (playingStates[id]) {
        stopSound(id);
      }
    });
  };

  const changePage = (page: "play" | "setup") => {
    setCurrentPage(page);
    stopAllSounds();
  };

  const handleSoundUpdate = (updatedSounds: SoundData[]) => {
    stopAllSounds();
    newSounds(updatedSounds);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-purple-900 to-slate-900">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/30 backdrop-blur-sm">
        <div className="px-4 mx-auto max-w-7xl">
          <div className="flex justify-center py-4 space-x-8">
            <button
              onClick={() => changePage("play")}
              className={`px-4 py-2 rounded-full transition-all ${
                currentPage === "play"
                  ? "bg-white/10 text-white"
                  : "text-white/70 hover:text-white"
              }`}
            >
              Play
            </button>
            <button
              onClick={() => changePage("setup")}
              className={`px-4 py-2 rounded-full transition-all ${
                currentPage === "setup"
                  ? "bg-white/10 text-white"
                  : "text-white/70 hover:text-white"
              }`}
            >
              Setup
            </button>
          </div>
        </div>
      </nav>

      <main className="pt-16">
        {currentPage === "play" ? (
          <PlayPage
            sounds={sounds}
            playingStates={playingStates}
            playSound={startSound}
            stopSound={stopSound}
            isLoading={isLoading}
          />
        ) : (
          <SetupPage sounds={sounds} onUpdate={handleSoundUpdate} />
        )}
      </main>
    </div>
  );
}

export default App;
