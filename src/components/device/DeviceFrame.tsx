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
  const [isMobile, setIsMobile] = useState(false);
  const [isClient, setIsClient] = useState(false);

  // Screen position as percentage of device image
  // Different coordinates for mobile vs desktop device images
  const desktopScreenPosition = {
    top: 11.425,    // % from top - moved down by 0.2%
    left: 32.5,     // % from left - unchanged
    width: 34.75,   // % of device width - unchanged
    height: 35.05,  // % of device height - reduced by 0.2% from top
  };

  // Mobile screen position for Web-Ready3.png (adjust these values to fit your mobile image)
  const mobileScreenPosition = {
    top: 15,        // % from top - adjust based on Web-Ready3.png screen position
    left: 20,       // % from left - adjust based on Web-Ready3.png screen position
    width: 60,      // % of device width - adjust based on Web-Ready3.png screen size
    height: 70,     // % of device height - adjust based on Web-Ready3.png screen size
  };

  const screenPosition = isMobile ? mobileScreenPosition : desktopScreenPosition;

  useEffect(() => {
    // Set client-side flag
    setIsClient(true);

    const updateDimensions = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setDimensions({ width: rect.width, height: rect.height });
      }
      // Check if mobile (screen width <= 768px)
      setIsMobile(window.innerWidth <= 768);
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  return (
    <AnimatedBackground className="w-full h-screen flex items-center justify-center device-container">
      <div
        ref={containerRef}
        className={`relative w-full h-full flex items-center justify-center ${isMobile ? 'overflow-hidden' : 'max-w-3xl max-h-[90vh]'}`}
      >
        <div className={`relative w-full aspect-[16/10] device-frame ${isMobile ? 'scale-[5] origin-center -translate-y-[20%]' : 'max-h-full'}`}>
          {/* Device Image */}
          <Image
            src={isMobile ? "/Mobile.png" : "/Front-Website1.png"}
            alt="NAVADA Device"
            fill
            priority
            className="object-contain pointer-events-none relative z-10"
            sizes="(max-width: 768px) 90vw, (max-width: 1200px) 80vw, 672px"
          />


          {/* Interactive Screen Overlay - Hidden on mobile */}
          {!isMobile && (
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
          )}

        </div>
      </div>
    </AnimatedBackground>
  );
}
