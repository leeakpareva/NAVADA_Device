'use client';

import { useOSStore } from '@/stores/osStore';
import { useState } from 'react';

export default function Taskbar() {
  const { windows, apps, openApp, restoreWindow, focusWindow, activeWindowId } = useOSStore();
  const [showStartMenu, setShowStartMenu] = useState(false);

  return (
    <>
      {/* Start Menu */}
      {showStartMenu && (
        <div
          className="absolute bottom-8 left-1 w-24 bg-gray-800 border border-gray-600 rounded shadow-xl z-50"
        >
          <div className="p-1 border-b border-gray-600">
            <span className="micro-text font-semibold text-white">NAVADA</span>
          </div>
          <div className="py-1">
            {apps.map(app => (
              <button
                key={app.id}
                onClick={() => {
                  openApp(app.id);
                  setShowStartMenu(false);
                }}
                className="w-full px-1 py-1 text-left micro-text text-white hover:bg-gray-700 flex items-center gap-1 touch-btn"
              >
                <span className="text-xs">{app.icon}</span>
                <span>{app.name}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Taskbar */}
      <div className="absolute left-0 right-0 h-5 flex items-center gap-0.5 px-0.5" style={{bottom: '0.3mm', border: 'none', outline: 'none', backgroundColor: 'transparent', opacity: 1, backdropFilter: 'none'}}>
        {/* Open Windows */}
        <div className="flex-1 flex gap-0.5 overflow-x-auto">
          {windows.filter(window => window.appId !== 'screensaver').map(window => (
            <button
              key={window.id}
              onClick={() => {
                if (window.isMinimized) {
                  restoreWindow(window.id);
                } else {
                  focusWindow(window.id);
                }
              }}
              className={`h-3 px-1 text-[7px] font-medium truncate max-w-16 transition-all touch-btn ${
                activeWindowId === window.id && !window.isMinimized
                  ? 'bg-transparent text-white'
                  : window.isMinimized
                  ? 'text-white bg-transparent'
                  : 'text-white bg-transparent'
              }`}
            >
              {window.appId === 'screensaver' ? '🖼️' : window.title}
            </button>
          ))}
        </div>

      </div>

      {/* Click outside to close start menu */}
      {showStartMenu && (
        <div
          className="absolute inset-0 z-40"
          onClick={() => setShowStartMenu(false)}
        />
      )}
    </>
  );
}