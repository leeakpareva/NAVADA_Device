'use client';

import { useState, useEffect } from 'react';
import ScrollablePage from '@/components/layout/ScrollablePage';

export default function AboutPage() {
  const [isMobile, setIsMobile] = useState(false);

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
  return (
    <ScrollablePage>
      <div className="bg-black text-white">
        <div className={`mx-auto pt-2 ${isMobile ? 'px-4 max-w-sm' : 'px-8 max-w-4xl'}`}>
          <div className={`text-white leading-relaxed ${isMobile ? 'space-y-4' : 'space-y-8'}`}>

            <section>
              <h1 className={`font-bold mb-4 ${isMobile ? 'text-xl text-center' : 'text-3xl'}`}>
                ABOUT RAVEN
              </h1>
              <div className={`mb-4 p-4 bg-gray-900/50 border border-gray-700 rounded-lg ${isMobile ? 'text-center' : ''}`}>
                <h2 className={`font-semibold mb-2 text-white ${isMobile ? 'text-sm' : 'text-lg'}`}>
                  Real-time AI Visual English Notation
                </h2>
                <p className={`text-gray-300 ${isMobile ? 'text-xs' : 'text-sm'}`}>
                  A learning tool designed to bridge the gap between natural language and programming code.
                </p>
              </div>
              <p className={`mb-3 ${isMobile ? 'text-sm text-center' : 'mb-4'}`}>
                RAVEN is an AI learning platform that makes edge computing accessible through hands-on experimentation.
              </p>
              <p className={`mb-3 font-medium ${isMobile ? 'text-sm text-center' : 'mb-4'}`}>
                RAVEN is not a finished product. It is a gateway.
              </p>
              <p className={`${isMobile ? 'text-sm text-center' : ''}`}>
                Learn by building with real hardware, real code, and real-world constraints using Raspberry Pi technology.
              </p>
            </section>

            <section>
              <h2 className={`font-bold mb-3 ${isMobile ? 'text-lg text-center' : 'text-2xl mb-4'}`}>
                THE DEVICE
              </h2>
              <div className={`mb-3 ${isMobile ? 'text-sm' : 'mb-4'}`}>
                <div className={`${isMobile ? 'space-y-1' : 'space-y-2 ml-6'}`}>
                  <div className={isMobile ? 'text-center' : ''}>
                    {isMobile ? '• ' : '• '}Raspberry Pi 4B
                  </div>
                  <div className={isMobile ? 'text-center' : ''}>
                    {isMobile ? '• ' : '• '}3.5" Touch Screen
                  </div>
                  <div className={isMobile ? 'text-center' : ''}>
                    {isMobile ? '• ' : '• '}3D Printed Case
                  </div>
                  <div className={isMobile ? 'text-center' : ''}>
                    {isMobile ? '• ' : '• '}Local AI Workflows
                  </div>
                </div>
              </div>
              {!isMobile && (
                <p className="mb-4">
                  Complete STL files provided free. Build and run AI models locally, experiment with edge computing, and prototype intelligent systems.
                </p>
              )}
              <p className={`${isMobile ? 'text-xs text-center' : 'mt-4'}`}>
                Designed for students, creatives, engineers, and curious minds. No prior experience required.
              </p>
            </section>

            {!isMobile && (
              <section>
                <h2 className="text-2xl font-bold mb-4">THE INITIATIVE</h2>
                <p className="mb-4">
                  RAVEN extends beyond hardware. Our servers provide learning packs, challenges, optimized AI models, and community knowledge sharing.
                </p>
                <p>
                  This hybrid approach prepares builders for a future where intelligence is distributed, private, and efficient.
                </p>
              </section>
            )}

            <section>
              <h2 className={`font-bold mb-3 ${isMobile ? 'text-lg text-center' : 'text-2xl mb-4'}`}>
                TEAM
              </h2>
              <div className={`mb-3 ${isMobile ? 'text-center' : 'mb-4'}`}>
                <p className={`font-semibold ${isMobile ? 'text-sm' : 'mb-2'}`}>Leslie Akpareva, MBA, MA</p>
                <p className={`italic ${isMobile ? 'text-xs' : 'mb-4'}`}>Lead Developer and Designer</p>
                {!isMobile && (
                  <p>
                    Builder and AI engineer focused on making advanced technology accessible through hands-on learning.
                  </p>
                )}
              </div>

              <div className={`${isMobile ? 'text-center' : ''}`}>
                <p className={`font-semibold ${isMobile ? 'text-sm' : 'mb-2'}`}>Chopstix</p>
                <p className={`italic ${isMobile ? 'text-xs' : 'mb-4'}`}>Creative Sponsor</p>
                {!isMobile && (
                  <p>
                    Music producer bringing creative perspective to ensure RAVEN speaks to artists and cultural innovators.
                  </p>
                )}
              </div>
            </section>

            <section>
              <h2 className={`font-bold mb-3 ${isMobile ? 'text-lg text-center' : 'text-2xl mb-4'}`}>
                GET STARTED
              </h2>
              <p className={`mb-3 font-medium ${isMobile ? 'text-sm text-center' : 'text-xl mb-4'}`}>
                Anyone can learn to build the future.
              </p>
              <p className={`mb-3 ${isMobile ? 'text-sm text-center' : 'mb-4'}`}>
                Sign up to receive your free RAVEN starter pack within 72 hours.
              </p>
              <p className={`font-medium ${isMobile ? 'text-sm text-center' : 'text-lg'}`}>
                No cost. No gatekeeping. Just build.
              </p>
            </section>

            <div className={`${isMobile ? 'h-10' : 'h-20'}`}></div>
          </div>
        </div>
      </div>
    </ScrollablePage>
  );
}