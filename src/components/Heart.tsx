import React from 'react';
import { Heart as HeartIcon } from 'lucide-react';

interface HeartProps {
  fillLevel: number;
}

export default function Heart({ fillLevel }: HeartProps) {
  const heartSize = 120;
  
  // Calculate color intensity based on fill level
  const getHeartColor = () => {
    if (fillLevel === 0) return 'text-gray-300';
    if (fillLevel < 20) return 'text-pink-200 fill-pink-100';
    if (fillLevel < 40) return 'text-pink-400 fill-pink-200';
    if (fillLevel < 60) return 'text-pink-500 fill-pink-300';
    if (fillLevel < 80) return 'text-red-500 fill-red-300';
    return 'text-red-600 fill-red-500';
  };

  const getGlowEffect = () => {
    if (fillLevel < 20) return '';
    if (fillLevel < 40) return 'drop-shadow-sm';
    if (fillLevel < 60) return 'drop-shadow-md';
    if (fillLevel < 80) return 'drop-shadow-lg';
    return 'drop-shadow-xl';
  };

  return (
    <div className="relative flex flex-col items-center">
      <div className="relative">
        {/* Heart with fill effect */}
        <HeartIcon
          size={heartSize}
          className={`
            transition-all duration-150 ease-out
            ${getHeartColor()}
            ${getGlowEffect()}
            ${fillLevel > 50 ? 'animate-pulse' : ''}
          `}
          style={{
            filter: fillLevel > 80 ? 'brightness(1.2)' : 'none',
            transform: `scale(${1 + (fillLevel / 500)})`
          }}
        />
        
        {/* Fill level indicator */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div 
            className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden"
            style={{ marginTop: '60px' }}
          >
            <div 
              className={`
                h-full transition-all duration-150 ease-out rounded-full
                ${fillLevel < 30 ? 'bg-pink-400' : fillLevel < 70 ? 'bg-red-400' : 'bg-red-600'}
              `}
              style={{ width: `${fillLevel}%` }}
            />
          </div>
        </div>
      </div>
      
      <div className="mt-6 text-center">
        <p className={`
          text-lg font-semibold transition-all duration-300
          ${fillLevel === 0 ? 'text-gray-500' : 
            fillLevel >= 100 ? 'text-red-700 animate-pulse' :
            fillLevel < 50 ? 'text-pink-600' : 'text-red-600'}
        `}>
          {fillLevel === 0 ? 'Click and hold to fill!' :
           fillLevel >= 100 ? 'Heart is completely full! ❤️' :
           'Keep clicking!'}
        </p>
        <p className="text-sm text-gray-600 mt-1">
          Fill Level: {Math.round(fillLevel)}%
        </p>
      </div>
    </div>
  );
}