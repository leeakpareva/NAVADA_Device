'use client';

import { useState, useEffect } from 'react';

interface BootSequenceProps {
  onComplete: () => void;
}

const bootMessages = [
  { text: 'NAVADA OS Starting...', delay: 300 },
  { text: 'Initializing system components', delay: 400 },
  { text: 'Loading user interface', delay: 400 },
  { text: 'Connecting to services', delay: 400 },
  { text: 'Preparing desktop environment', delay: 500 },
  { text: 'Ready', delay: 300 },
];

export default function BootSequence({ onComplete }: BootSequenceProps) {
  const [currentMessage, setCurrentMessage] = useState(0);
  const [progress, setProgress] = useState(0);
  const [showLogo, setShowLogo] = useState(false);

  useEffect(() => {
    // Show logo first
    const logoTimer = setTimeout(() => {
      setShowLogo(true);
    }, 200);

    // Process boot messages
    let totalDelay = 800;
    const messageTimers = bootMessages.map((msg, index) => {
      totalDelay += msg.delay;
      return setTimeout(() => {
        setCurrentMessage(index);
        setProgress(((index + 1) / bootMessages.length) * 100);
      }, totalDelay);
    });

    // Complete boot sequence
    const completeTimer = setTimeout(() => {
      setProgress(100);
      setTimeout(onComplete, 600);
    }, totalDelay + 400);

    return () => {
      clearTimeout(logoTimer);
      messageTimers.forEach(timer => clearTimeout(timer));
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <div className="w-full h-full bg-black flex flex-col items-center justify-center p-2">
      {/* Logo */}
      {showLogo && (
        <div className="mb-2 text-center">
          <h1 className="text-lg font-bold text-white mb-1">🍓 NAVADA Pi</h1>
          <p className="micro-text text-gray-300">Raspberry Pi OS</p>
          <div className="w-6 h-0.5 bg-red-600 mx-auto mt-1 rounded"></div>
        </div>
      )}

      {/* Loading Spinner */}
      <div className="mb-2">
        <div className="w-4 h-4 border border-gray-600 border-t-red-500 rounded-full animate-spin"></div>
      </div>

      {/* Current Message */}
      {currentMessage >= 0 && (
        <div className="text-center mb-2">
          <p className="text-white micro-text font-medium">
            {bootMessages[currentMessage]?.text}
          </p>
        </div>
      )}

      {/* Progress Bar */}
      <div className="w-16 mb-1">
        <div className="h-1 bg-gray-800 rounded">
          <div
            className="h-full bg-red-500 rounded transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Progress Text */}
      <div className="micro-text text-gray-400 font-mono">
        {Math.round(progress)}%
      </div>

      {/* Footer */}
      <div className="absolute bottom-2 text-center">
        <p className="micro-text text-gray-400">Pi 64x96mm</p>
      </div>
    </div>
  );
}