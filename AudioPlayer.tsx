import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

export function AudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(e => console.error("Audio play failed:", e));
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  return (
    <div className="fixed bottom-4 left-4 z-50 bg-white/80 backdrop-blur-md p-3 rounded-2xl shadow-lg border border-slate-200 flex items-center space-x-3">
      <audio
        ref={audioRef}
        src="https://nu.vgmtreasurechest.com/soundtracks/super-mario-bros/gvlupoaj/01.%20Ground%20Theme.mp3"
        loop
      />
      
      <button 
        onClick={togglePlay}
        className="w-10 h-10 flex items-center justify-center bg-indigo-100 text-indigo-600 rounded-full hover:bg-indigo-200 transition-colors"
      >
        {isPlaying ? (
          <div className="w-3 h-3 bg-indigo-600 rounded-sm" /> // Stop icon
        ) : (
          <div className="w-0 h-0 border-t-[6px] border-t-transparent border-l-[10px] border-l-indigo-600 border-b-[6px] border-b-transparent ml-1" /> // Play icon
        )}
      </button>

      <div className="flex items-center space-x-2">
        <button onClick={toggleMute} className="text-slate-500 hover:text-indigo-600 transition-colors">
          {isMuted || volume === 0 ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
        </button>
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={isMuted ? 0 : volume}
          onChange={(e) => {
            setVolume(parseFloat(e.target.value));
            if (isMuted) setIsMuted(false);
          }}
          className="w-20 accent-indigo-600"
        />
      </div>
    </div>
  );
}
