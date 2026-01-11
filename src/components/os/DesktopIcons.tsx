'use client';

import { useOSStore } from '@/stores/osStore';
import Image from 'next/image';

export default function DesktopIcons() {
  const { apps, openApp } = useOSStore();

  // Increased icon size and spacing to prevent text collision
  const iconSize = 36;

  const renderIcon = (icon: string, appName: string) => {
    // Check if icon is an image path (starts with /)
    if (icon.startsWith('/')) {
      return (
        <Image
          src={icon}
          alt={`${appName} icon`}
          width={32}
          height={32}
          className="object-contain"
        />
      );
    }
    // Otherwise render as emoji (sized to match 32px images)
    return <span className="text-xl" style={{ fontSize: '32px' }}>{icon}</span>;
  };

  return (
    <div className="absolute grid grid-cols-4 gap-1" style={{ top: '2.4mm', left: '1mm', width: '88%' }}>
      {apps.map((app, index) => (
        <button
          key={app.id}
          onClick={() => openApp(app.id)}
          onDoubleClick={() => openApp(app.id)}
          className="group flex flex-col items-center p-1 hover:bg-gray-800 transition-all touch-feedback"
          style={{ width: iconSize }}
        >
          <div className="w-8 h-8 flex items-center justify-center bg-transparent group-hover:bg-gray-700">
            {renderIcon(app.icon, app.name)}
          </div>
          <span className="text-[8px] text-white font-medium text-center leading-tight w-full mt-0.5 break-words">
            {app.name}
          </span>
        </button>
      ))}
    </div>
  );
}
