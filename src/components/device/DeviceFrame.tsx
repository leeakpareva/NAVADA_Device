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
  const [deviceImageSrc, setDeviceImageSrc] = useState('/Front-Website1.png');
  const [showInteractiveScreen, setShowInteractiveScreen] = useState(true);

  // iPhone screen position for mobile devices - more precise iOS alignment
  const iphoneScreenPosition = {
    top: 15,        // % from top - adjusted for better screen area match
    left: 19,       // % from left - centered more accurately
    width: 62,      // % of device width - reduced for better fit
    height: 70,     // % of device height - adjusted for proper aspect ratio
  };

  const [mobileScreenPosition, setMobileScreenPosition] = useState(iphoneScreenPosition);

  // Desktop screen position as percentage of device image
  const desktopScreenPosition = {
    top: 11.425,    // % from top
    left: 32.4,     // % from left - moved out by 0.1
    width: 34.75,   // % of device width
    height: 35.05,  // % of device height
  };

  // Mobile detection and screen positioning adjustment
  useEffect(() => {
    const checkMobile = () => {
      const isMobileUserAgent = /iPhone|iPad|iPod|Android|webOS|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);
      const isSmallScreen = window.innerWidth <= 768; // Mobile breakpoint

      // Detect mobile: actual mobile device OR small screen size (for browser resize)
      setIsMobile(isMobileUserAgent || isSmallScreen);

      // Browser detection for desktop device image selection and interactive screen
      if (!isMobileUserAgent && !isSmallScreen) {
        const userAgent = navigator.userAgent;
        const isChrome = /Chrome/i.test(userAgent) && !/Edg/i.test(userAgent) && !/OPR/i.test(userAgent);

        if (isChrome) {
          // Chrome: Use Front-Website1.png with interactive screen
          setDeviceImageSrc('/Front-Website1.png');
          setShowInteractiveScreen(true);
        } else {
          // All other browsers: Use websiteothers.png without interactive screen
          setDeviceImageSrc('/websiteothers.png');
          setShowInteractiveScreen(false);
        }
      }

      // Adjust screen position based on device characteristics
      if (isIOS) {
        const screenHeight = window.screen.height;
        const screenWidth = window.screen.width;
        const aspectRatio = screenHeight / screenWidth;

        // Different positioning for different iOS devices
        let adjustedPosition = { ...iphoneScreenPosition };

        if (aspectRatio > 2.1) {
          // iPhone X/11/12/13/14/15 Pro and newer (taller screens)
          adjustedPosition = {
            top: 16,
            left: 20,
            width: 60,
            height: 68,
          };
        } else if (aspectRatio > 1.9) {
          // iPhone 6/7/8 Plus
          adjustedPosition = {
            top: 14,
            left: 18,
            width: 64,
            height: 72,
          };
        } else if (aspectRatio > 1.7) {
          // iPhone 6/7/8
          adjustedPosition = {
            top: 15,
            left: 19,
            width: 62,
            height: 70,
          };
        }

        setMobileScreenPosition(adjustedPosition);
      }
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

  // Mobile view - iPhone PNG only
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
          </div>
        </div>
      </div>
    );
  }

  // Desktop view - conditional animated background (Chrome only)
  const desktopContent = (
    <div
      ref={containerRef}
      className="relative w-full h-full flex items-center justify-center max-w-3xl max-h-[90vh]"
      style={{
        margin: '0 auto',
        boxSizing: 'border-box'
      }}
    >
        <div
          className="relative w-full device-frame max-h-full"
          style={{
            aspectRatio: '16/10',
            maxWidth: '100%',
            maxHeight: '100%',
            boxSizing: 'border-box'
          }}
        >
          {/* Device Image */}
          <Image
            src={deviceImageSrc}
            alt="NAVADA Device"
            fill
            priority
            className="object-contain pointer-events-none relative z-10"
            sizes="(max-width: 1200px) 80vw, 672px"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'contain'
            }}
            key={deviceImageSrc} // Force re-render when image source changes
          />

          {/* Interactive Screen Overlay - Only show for Chrome */}
          {showInteractiveScreen && (
            <div
              className="absolute modern-screen overflow-hidden z-20"
              style={{
                position: 'absolute',
                top: `${desktopScreenPosition.top}%`,
                left: `${desktopScreenPosition.left}%`,
                width: `${desktopScreenPosition.width}%`,
                height: `${desktopScreenPosition.height}%`,
                boxSizing: 'border-box'
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
  );

  // Return with or without animated background based on browser
  if (showInteractiveScreen) {
    // Chrome: Show with animated background
    return (
      <AnimatedBackground className="w-full h-screen flex items-center justify-center device-container">
        {desktopContent}
      </AnimatedBackground>
    );
  } else {
    // Other browsers: Show without animated background, move image up by 2mm
    return (
      <div className="w-full h-screen bg-black flex items-center justify-center device-container" style={{ paddingBottom: '2mm' }}>
        {desktopContent}
      </div>
    );
  }
}
