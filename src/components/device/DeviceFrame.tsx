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
  const [iphoneImageSrc, setIphoneImageSrc] = useState('/App icons/Iphone.png');

  // Desktop screen position as percentage of device image
  const screenPosition = {
    top: 11.425,    // % from top
    left: 32.4,     // % from left - moved out by 0.1
    width: 34.75,   // % of device width
    height: 35.05,  // % of device height
  };

  // iPhone screen position for mobile devices - optimized for iOS web
  const iphoneScreenPosition = {
    top: 11.5,      // % from top - adjusted for iOS viewport
    left: 15.5,     // % from left - slightly adjusted
    width: 69,      // % of device width - slightly wider
    height: 77,     // % of device height - slightly taller
  };

  // Mobile detection
  useEffect(() => {
    const checkMobile = () => {
      const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      const isSmallScreen = window.innerWidth < 1024;
      const isMobileUserAgent = /iPhone|iPad|iPod|Android|webOS|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

      setIsMobile(isMobileUserAgent || (isTouchDevice && isSmallScreen));
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // iPhone image detection and cache-busting for updates
  useEffect(() => {
    const detectIphoneImage = async () => {
      const possiblePaths = [
        '/App icons/Iphone.png',
        '/App icons/iphone.png',
        '/App icons/iPhone.png',
        '/App icons/IPHONE.png'
      ];

      for (const path of possiblePaths) {
        try {
          const response = await fetch(path, { method: 'HEAD' });
          if (response.ok) {
            // Add timestamp for cache-busting to ensure updates are loaded
            const timestamp = new Date().getTime();
            setIphoneImageSrc(`${path}?v=${timestamp}`);
            break;
          }
        } catch (error) {
          // Continue to next path if this one fails
          continue;
        }
      }
    };

    if (isMobile) {
      detectIphoneImage();
    }
  }, [isMobile]);

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

  // Mobile view - iPhone PNG with interactive screen overlay
  if (isMobile) {
    return (
      <div className="w-full h-screen bg-black relative overflow-hidden">
        <div
          ref={containerRef}
          className="relative w-full h-full flex items-center justify-center"
        >
          <div className="relative w-full max-w-sm h-full">
            {/* iPhone Image - Dynamically loaded with cache-busting */}
            <Image
              src={iphoneImageSrc}
              alt="iPhone Mobile Device"
              fill
              priority
              className="object-contain pointer-events-none relative z-10"
              sizes="(max-width: 768px) 100vw, 400px"
              key={iphoneImageSrc} // Force re-render when image source changes
            />

            {/* Interactive Screen Overlay for Mobile */}
            <div
              className="absolute overflow-hidden z-20"
              style={{
                top: `${iphoneScreenPosition.top}%`,
                left: `${iphoneScreenPosition.left}%`,
                width: `${iphoneScreenPosition.width}%`,
                height: `${iphoneScreenPosition.height}%`,
              }}
            >
              {/* Mobile screen content */}
              <div className="relative w-full h-full bg-black">
                {children}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Desktop view - original layout with animated background
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
