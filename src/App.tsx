import React, { useState, useEffect, useRef } from 'react';
import Heart from './components/Heart';
import BackgroundMusic from './components/BackgroundMusic';
import Modal from './components/Modal';

function App() {
  const [fillLevel, setFillLevel] = useState(0);
  const [isClicking, setIsClicking] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isHeartFull, setIsHeartFull] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const drainIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Check if heart is full and show modal
  useEffect(() => {
    if (fillLevel >= 100 && !isHeartFull) {
      setIsHeartFull(true);
      setIsClicking(false);
      setShowModal(true);
    }
  }, [fillLevel, isHeartFull]);

  // Handle continuous clicking
  useEffect(() => {
    if (isClicking && !isHeartFull) {
      // Clear drain interval when clicking
      if (drainIntervalRef.current) {
        clearInterval(drainIntervalRef.current);
        drainIntervalRef.current = null;
      }

      // Fill the heart while clicking
      intervalRef.current = setInterval(() => {
        setFillLevel(prev => {
          const newLevel = Math.min(100, prev + 2);
          return newLevel;
        });
      }, 50);
    } else {
      // Clear fill interval when not clicking
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }

      // Start draining after a short delay
      if (!isHeartFull) {
        const drainDelay = setTimeout(() => {
          drainIntervalRef.current = setInterval(() => {
            setFillLevel(prev => Math.max(0, prev - 1)); // Drain by 1% every 100ms
          }, 100);
        }, 500); // Wait 500ms before starting to drain

        return () => clearTimeout(drainDelay);
      }
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (drainIntervalRef.current) clearInterval(drainIntervalRef.current);
    };
  }, [isClicking, isHeartFull]);

  const handleMouseDown = () => {
    if (!isHeartFull) {
      setIsClicking(true);
    }
  };

  const handleMouseUp = () => {
    setIsClicking(false);
  };

  const handleMouseLeave = () => {
    setIsClicking(false);
  };

  // Touch events for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    e.preventDefault();
    setIsClicking(true);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    e.preventDefault();
    setIsClicking(false);
  };

  const handleModalClose = () => {
    setShowModal(false);
    setIsHeartFull(false);
    setFillLevel(0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-red-50 to-purple-100 flex items-center justify-center relative overflow-hidden">
      {/* Background decorative hearts */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 15 }, (_, i) => (
          <div
            key={i}
            className="absolute animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 2}s`
            }}
          >
            <div className="text-pink-200 text-2xl opacity-30">💕</div>
          </div>
        ))}
      </div>

      {/* Main content */}
      <div className="relative z-10 text-center">
        <div className="mb-8">
          <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-red-600 mb-4">
            HAPPY MONTHSARYY BABYYY
          </h1>
          <p className="text-xl text-gray-600 max-w-md mx-auto">
            ETONG PUSO KO PARA SAYO 0215 bhoxcz raven skrtt
          </p>
        </div>

        <div 
          className={`relative select-none ${!isHeartFull ? 'cursor-pointer' : 'cursor-not-allowed'}`}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <Heart fillLevel={fillLevel} />
        </div>
      </div>

      <BackgroundMusic />
      <Modal isOpen={showModal} onClose={handleModalClose} />
    </div>
  );
}

export default App;