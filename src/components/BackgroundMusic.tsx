import React, { useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX, Play } from 'lucide-react';

export default function BackgroundMusic() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [showPlayButton, setShowPlayButton] = useState(true);

  useEffect(() => {
    // Try to auto-play music when component mounts
    const tryAutoPlay = async () => {
      if (audioRef.current) {
        try {
          await audioRef.current.play();
          setIsPlaying(true);
          setShowPlayButton(false);
        } catch (error) {
          console.log('Auto-play blocked by browser - showing play button');
          setShowPlayButton(true);
        }
      }
    };

    tryAutoPlay();
  }, []);

  const startMusic = async () => {
    if (audioRef.current) {
      try {
        await audioRef.current.play();
        setIsPlaying(true);
        setShowPlayButton(false);
      } catch (error) {
        console.error('Failed to play music:', error);
      }
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const togglePlayPause = async () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        try {
          await audioRef.current.play();
          setIsPlaying(true);
          setShowPlayButton(false);
        } catch (error) {
          console.error('Failed to play music:', error);
        }
      }
    }
  };

  return (
    <>
      {/* Initial play button overlay */}
      {showPlayButton && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 text-center shadow-2xl animate-modal-appear">
            <div className="mb-4">
              <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Play className="text-white ml-1" size={24} />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                🎵 Enable Background Music
              </h3>
              <p className="text-gray-600 mb-6">
                Click to start the romantic background music for the best experience!
              </p>
            </div>
            <button
              onClick={startMusic}
              className="bg-gradient-to-r from-pink-500 to-red-500 text-white px-8 py-3 rounded-full font-semibold hover:from-pink-600 hover:to-red-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              🎶 Start Music
            </button>
          </div>
        </div>
      )}

      {/* Music controls */}
      <div className="fixed top-4 right-4 z-40 flex gap-2">
        <button
          onClick={togglePlayPause}
          className="bg-white bg-opacity-20 backdrop-blur-sm rounded-full p-3 hover:bg-opacity-30 transition-all duration-300 shadow-lg"
          title={isPlaying ? 'Pause Music' : 'Play Music'}
        >
          {isPlaying ? (
            <Volume2 className="text-white" size={20} />
          ) : (
            <Play className="text-white ml-0.5" size={20} />
          )}
        </button>
        
        {isPlaying && (
          <button
            onClick={toggleMute}
            className="bg-white bg-opacity-20 backdrop-blur-sm rounded-full p-3 hover:bg-opacity-30 transition-all duration-300 shadow-lg"
            title={isMuted ? 'Unmute' : 'Mute'}
          >
            {isMuted ? (
              <VolumeX className="text-white" size={20} />
            ) : (
              <Volume2 className="text-white" size={20} />
            )}
          </button>
        )}
      </div>
      
      <audio
        ref={audioRef}
        loop
        volume={0.5}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onEnded={() => setIsPlaying(false)}
      >
        <source src="/123.mp3" type="audio/mpeg" />
      </audio>
    </>
  );
}