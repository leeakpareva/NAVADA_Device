'use client';

import { useOSStore } from '@/stores/osStore';

export default function DesktopIcons() {
  const { apps, openApp } = useOSStore();

  // Realistic app icon size proportional to screen dimensions - reduced by 0.5x
  const iconSize = 24;

  return (
    <div className="absolute flex items-start" style={{ top: '0.3mm', left: '0.3mm' }}>
      {apps.map((app, index) => (
        <button
          key={app.id}
          onClick={() => openApp(app.id)}
          onDoubleClick={() => openApp(app.id)}
          className="group flex flex-col items-center p-1 hover:bg-gray-800 transition-all touch-feedback"
          style={{ width: iconSize }}
        >
          <div className="w-5 h-5 flex items-center justify-center text-lg bg-transparent group-hover:bg-gray-700">
            {app.icon}
          </div>
          <span className="text-[9px] text-white font-medium text-center leading-tight w-full mt-0.5 whitespace-nowrap overflow-visible">
            {app.name}
          </span>
        </button>
      ))}
    </div>
  );
}
