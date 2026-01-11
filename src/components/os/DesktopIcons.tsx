'use client';

import { useOSStore } from '@/stores/osStore';

export default function DesktopIcons() {
  const { apps, openApp } = useOSStore();

  // Increased icon size and spacing to prevent text collision
  const iconSize = 32;

  return (
    <div className="absolute grid grid-cols-3 gap-2" style={{ top: '2.4mm', left: '0.3mm', width: '90%' }}>
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
          <span className="text-[8px] text-white font-medium text-center leading-tight w-full mt-0.5 truncate">
            {app.name}
          </span>
        </button>
      ))}
    </div>
  );
}
