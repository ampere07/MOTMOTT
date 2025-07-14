import React from 'react';
import { X, Heart } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Modal({ isOpen, onClose }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 animate-modal-appear relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X size={24} />
        </button>
        
        <div className="text-center">
          <div className="mb-6">
            <Heart className="mx-auto text-red-500 fill-red-500 animate-pulse" size={64} />
          </div>
          
          <h2 className="text-3xl font-bold text-red-600 mb-4">
            💖 Heart Completely Filled! 💖
          </h2>
          
          <p className="text-gray-700 text-lg mb-6 leading-relaxed">
            Congratulations! You've filled this heart with pure love and dedication. 
            Your persistence has been rewarded with a heart overflowing with affection!
          </p>
          
          <div className="bg-red-50 rounded-lg p-4 mb-6">
            <p className="text-red-800 font-semibold">
              ✨ Achievement Unlocked: Master of Hearts ✨
            </p>
          </div>
          
          <button
            onClick={onClose}
            className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-8 py-3 rounded-full font-semibold hover:from-red-600 hover:to-pink-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            Start Over
          </button>
        </div>
      </div>
    </div>
  );
}