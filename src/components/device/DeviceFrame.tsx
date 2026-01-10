'use client';

import { ReactNode, useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import { AnimatedBackground } from '@/components/ui/animated-background';

interface DeviceFrameProps {
  children: ReactNode;
}

export default function DeviceFrame({ children }: DeviceFrameProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  // Screen position as percentage of device image
  // REDUCED TO 1.5X - Screen size reduced by 2 from 3x
  // These values are calibrated to fit the screen area perfectly
  const screenPosition = {
    top: 11.425,    // % from top - moved down by 0.2%
    left: 32.5,     // % from left - unchanged
    width: 34.75,   // % of device width - unchanged
    height: 35.05,  // % of device height - reduced by 0.2% from top
  };

  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setDimensions({ width: rect.width, height: rect.height });
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  return (
    <AnimatedBackground className="w-full h-screen flex items-center justify-center">
      <div
        ref={containerRef}
        className="relative w-full max-w-3xl aspect-[16/10] select-none"
        style={{ maxHeight: '90vh' }}
      >
        {/* Device Image */}
        <Image
          src="/Front-Website1.png"
          alt="NAVADA Device"
          fill
          priority
          className="object-contain pointer-events-none relative z-10"
          sizes="(max-width: 768px) 100vw, 672px"
        />

        {/* Interactive Screen Overlay */}
        <div
          className="absolute modern-screen overflow-hidden z-20"
          style={{
            top: `${screenPosition.top}%`,
            left: `${screenPosition.left}%`,
            width: `${screenPosition.width}%`,
            height: `${screenPosition.height}%`,
          }}
        >
          {/* Screen content - keep original black background */}
          <div className="relative w-full h-full bg-black">
            {children}
          </div>
        </div>

        {/* Keyboard interaction hints (optional) */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-xs text-green-400/50 font-mono z-20">
          {/* Could add keyboard shortcut hints here */}
        </div>
      </div>
    </AnimatedBackground>
  );
}
