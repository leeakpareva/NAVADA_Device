'use client';

import { useState, useEffect } from 'react';
import DeviceFrame from '@/components/device/DeviceFrame';
import BootSequence from '@/components/os/BootSequence';
import Desktop from '@/components/os/Desktop';

export default function Home() {
  const [bootComplete, setBootComplete] = useState(false);
  const [showBoot, setShowBoot] = useState(true);

  useEffect(() => {
    // Skip boot on development hot reloads
    const hasBooted = sessionStorage.getItem('navada-booted');
    if (hasBooted) {
      setShowBoot(false);
      setBootComplete(true);
    }
  }, []);

  const handleBootComplete = () => {
    sessionStorage.setItem('navada-booted', 'true');
    setBootComplete(true);
    setTimeout(() => setShowBoot(false), 500);
  };

  return (
    <main className="min-h-screen overflow-hidden">
      <DeviceFrame>
        {showBoot ? (
          <BootSequence onComplete={handleBootComplete} />
        ) : (
          <Desktop />
        )}
      </DeviceFrame>
    </main>
  );
}
