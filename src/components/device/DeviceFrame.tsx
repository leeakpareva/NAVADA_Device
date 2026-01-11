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

  // Desktop screen position as percentage of device image
  const screenPosition = {
    top: 11.425,    // % from top
    left: 32.4,     // % from left - moved out by 0.1
    width: 34.75,   // % of device width
    height: 35.05,  // % of device height
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
    <AnimatedBackground className="w-full h-screen flex items-center justify-center device-container">
      <div
        ref={containerRef}
        className="relative w-full h-full flex items-center justify-center max-w-3xl max-h-[90vh]"
      >
        <div className="relative w-full aspect-[16/10] device-frame max-h-full">
          {/* Device Image */}
          <Image
            src="/Front-Website1.png"
            alt="NAVADA Device"
            fill
            priority
            className="object-contain pointer-events-none relative z-10"
            sizes="(max-width: 1200px) 80vw, 672px"
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
            {/* Screen content with inner border for text spacing */}
            <div className="relative w-full h-full bg-black" style={{ padding: '0.3mm' }}>
              <div className="w-full h-full bg-black">
                {children}
              </div>
            </div>
          </div>

        </div>
      </div>
    </AnimatedBackground>
  );
}
