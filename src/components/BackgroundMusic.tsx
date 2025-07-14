import React, { useEffect, useRef } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

export default function BackgroundMusic() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [isMuted, setIsMuted] = React.useState(false);

  useEffect(() => {
    // Auto-play music when component mounts
    const playMusic = async () => {
      if (audioRef.current) {
        try {
          await audioRef.current.play();
          setIsPlaying(true);
        } catch (error) {
          console.log('Auto-play blocked by browser');
        }
      }
    };

    playMusic();
  }, []);

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <div className="fixed top-4 right-4 z-50">
      <button
        onClick={toggleMute}
        className="bg-white bg-opacity-20 backdrop-blur-sm rounded-full p-3 hover:bg-opacity-30 transition-all duration-300 shadow-lg"
      >
        {isMuted ? (
          <VolumeX className="text-white" size={20} />
        ) : (
          <Volume2 className="text-white" size={20} />
        )}
      </button>
      
      <audio
        ref={audioRef}
        loop
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      >
        {/* Using a placeholder for background music - in production, you'd use an actual audio file */}
        <source src="https://www.soundjay.com/misc/bell-ringing-05.wav" type="audio/wav" />
      </audio>
    </div>
  );
}