'use client';

import { useState, useEffect } from 'react';
import { useOSStore } from '@/stores/osStore';
import Window from './Window';
import Taskbar from './Taskbar';
import DesktopIcons from './DesktopIcons';
import TerminalApp from '@/components/apps/TerminalApp';
import ScreensaverApp from '@/components/apps/ScreensaverApp';
import YouTubeApp from '@/components/apps/YouTubeApp';

const appComponents: Record<string, React.ComponentType> = {
  terminal: TerminalApp,
  screensaver: ScreensaverApp,
  youtube: YouTubeApp,
};

export default function Desktop() {
  const { windows, globalBackground, currentImage } = useOSStore();

  return (
    <div
      className="w-full h-full relative overflow-hidden"
      style={{
        backgroundColor: globalBackground,
        backgroundImage: currentImage ? `url(${currentImage})` : undefined,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Desktop Icons */}
      <DesktopIcons />

      {/* Windows */}
      {windows.map(window => {
        const AppComponent = appComponents[window.appId];
        if (!AppComponent || window.isMinimized) return null;

        return (
          <Window key={window.id} windowState={window}>
            <AppComponent />
          </Window>
        );
      })}

      {/* Taskbar */}
      <Taskbar />

      {/* Clock overlay */}
      <div className="absolute text-[6px] text-white" style={{ top: '0.9mm', left: '1.0mm' }}>
        <SystemClock />
      </div>

      {/* Status icons overlay - Battery and WiFi */}
      <div className="absolute flex items-center gap-0.5 text-[6px] text-white" style={{ top: '0.9mm', right: '1.0mm' }}>
        <WiFiIcon />
        <BatteryIcon />
      </div>
    </div>
  );
}

function SystemClock() {
  const [time, setTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
      }));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return <span>{time}</span>;
}

function WiFiIcon() {
  return (
    <div className="flex items-center" title="WiFi Connected">
      <svg width="8" height="6" viewBox="0 0 8 6" fill="none" className="text-white">
        <path d="M1 4.5C1.5 3.5 2.5 3 4 3C5.5 3 6.5 3.5 7 4.5" stroke="currentColor" strokeWidth="0.5"/>
        <path d="M2 5C2.25 4.5 3 4.25 4 4.25C5 4.25 5.75 4.5 6 5" stroke="currentColor" strokeWidth="0.5"/>
        <circle cx="4" cy="5.5" r="0.3" fill="currentColor"/>
      </svg>
    </div>
  );
}

function BatteryIcon() {
  return (
    <div className="flex items-center" title="Battery: 100%">
      <svg width="10" height="6" viewBox="0 0 10 6" fill="none" className="text-white">
        {/* Battery outline */}
        <rect x="0.5" y="1.5" width="7" height="3" rx="0.5" stroke="currentColor" strokeWidth="0.3" fill="none"/>
        {/* Battery tip */}
        <rect x="7.5" y="2.5" width="1" height="1" rx="0.2" fill="currentColor"/>
        {/* Battery fill (100%) */}
        <rect x="1" y="2" width="6" height="2" rx="0.3" fill="currentColor"/>
      </svg>
    </div>
  );
}
