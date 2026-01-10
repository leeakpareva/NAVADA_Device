'use client';

import { useState, useEffect } from 'react';
import { useOSStore } from '@/stores/osStore';
import Window from './Window';
import Taskbar from './Taskbar';
import DesktopIcons from './DesktopIcons';
import TerminalApp from '@/components/apps/TerminalApp';

const appComponents: Record<string, React.ComponentType> = {
  terminal: TerminalApp,
};

export default function Desktop() {
  const { windows } = useOSStore();

  return (
    <div className="w-full h-full bg-black relative overflow-hidden">
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
