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
        <div className="text-white text-sm">
          Loading{dots}
        </div>
      </div>
    </div>
  );
}