import React, { useState } from 'react';
import { PlayPage } from './components/PlayPage';
import { SetupPage } from './components/SetupPage';
import { defaultSounds } from './data/defaultSounds';
import type { Sound, SoundData } from './types';

function App() {
  const [currentPage, setCurrentPage] = useState<'play' | 'setup'>('play');
  const [sounds, setSounds] = useState<Sound[]>(
    defaultSounds.map(sound => ({ ...sound, isPlaying: false }))
  );

  const handleSoundUpdate = (updatedSounds: SoundData[]) => {
    setSounds(updatedSounds.map(sound => ({ ...sound, isPlaying: false })));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-purple-900 to-slate-900">
      <nav className="fixed top-0 left-0 right-0 bg-black/30 backdrop-blur-sm z-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-center space-x-8 py-4">
            <button
              onClick={() => setCurrentPage('play')}
              className={`px-4 py-2 rounded-full transition-all ${
                currentPage === 'play'
                  ? 'bg-white/10 text-white'
                  : 'text-white/70 hover:text-white'
              }`}
            >
              Play
            </button>
            <button
              onClick={() => setCurrentPage('setup')}
              className={`px-4 py-2 rounded-full transition-all ${
                currentPage === 'setup'
                  ? 'bg-white/10 text-white'
                  : 'text-white/70 hover:text-white'
              }`}
            >
              Setup
            </button>
          </div>
        </div>
      </nav>

      <main className="pt-16">
        {currentPage === 'play' ? (
          <PlayPage sounds={sounds} />
        ) : (
          <SetupPage sounds={sounds} onUpdate={handleSoundUpdate} />
        )}
      </main>
    </div>
  );
}

export default App;