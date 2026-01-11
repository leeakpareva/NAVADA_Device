'use client';

import { useState, useEffect } from 'react';

interface BootLoaderProps {
  onComplete: () => void;
}

export default function BootLoader({ onComplete }: BootLoaderProps) {
  const [progress, setProgress] = useState(0);
  const [stage, setStage] = useState('init');
  const [dots, setDots] = useState('');

  useEffect(() => {
    const stages = [
      { name: 'init', text: 'NAVADA OS Initializing', duration: 800 },
      { name: 'boot', text: 'Loading System Components', duration: 1000 },
      { name: 'ready', text: 'System Ready', duration: 1200 }
    ];

    let currentStageIndex = 0;
    let totalProgress = 0;

    const interval = setInterval(() => {
      totalProgress += 2;
      setProgress(Math.min(totalProgress, 100));

      if (totalProgress >= 30 && currentStageIndex === 0) {
        setStage('boot');
        currentStageIndex = 1;
      } else if (totalProgress >= 75 && currentStageIndex === 1) {
        setStage('ready');
        currentStageIndex = 2;
      }

      if (totalProgress >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          onComplete();
        }, 300);
      }
    }, 60);

    // Animated dots effect
    const dotsInterval = setInterval(() => {
      setDots(prev => {
        if (prev.length >= 3) return '';
        return prev + '.';
      });
    }, 300);

    return () => {
      clearInterval(interval);
      clearInterval(dotsInterval);
    };
  }, [onComplete]);

  const getStageText = () => {
    switch (stage) {
      case 'init':
        return 'NAVADA OS Initializing';
      case 'boot':
        return 'Loading System Components';
      case 'ready':
        return 'System Ready';
      default:
        return 'NAVADA OS';
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black flex items-center justify-center">
      <div className="text-center">
        {/* NAVADA Logo */}
        <div className="mb-8">
          <div className="text-white text-4xl font-bold tracking-wider mb-2">
            NAVADA
          </div>
          <div className="text-gray-400 text-sm tracking-widest">
            OPERATING SYSTEM
          </div>
          <div className="text-gray-500 text-xs mt-1">
            Protocol 26/1
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-80 mx-auto mb-6">
          <div className="bg-gray-800 h-1 rounded-full overflow-hidden">
            <div
              className="bg-white h-full transition-all duration-100 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Status Text */}
        <div className="text-white text-sm mb-2">
          {getStageText()}{dots}
        </div>

        {/* Progress Percentage */}
        <div className="text-gray-400 text-xs">
          {progress}%
        </div>

        {/* System Info */}
        <div className="mt-12 text-gray-500 text-xs space-y-1">
          <div>Build: 2025.01.11</div>
          <div>Architecture: ARM64</div>
          <div>Display: 64x96mm Micro-Display</div>
        </div>
      </div>
    </div>
  );
}