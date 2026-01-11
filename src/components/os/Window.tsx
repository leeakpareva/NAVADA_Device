'use client';

import { useRef, useState, useEffect, ReactNode } from 'react';
import { useOSStore } from '@/stores/osStore';
import type { WindowState } from '@/types';

interface WindowProps {
  windowState: WindowState;
  children: ReactNode;
}

export default function Window({ windowState, children }: WindowProps) {
  const { 
    closeWindow, 
    minimizeWindow, 
    maximizeWindow, 
    focusWindow, 
    updateWindowPosition,
    activeWindowId 
  } = useOSStore();
  
  const windowRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  const isActive = activeWindowId === windowState.id;

  const handleMouseDown = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('.window-controls')) return;
    
    focusWindow(windowState.id);
    setIsDragging(true);
    
    const rect = windowRef.current?.getBoundingClientRect();
    if (rect) {
      setDragOffset({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
  };

  useEffect(() => {
    if (!isDragging) return;

    const handleMouseMove = (e: MouseEvent) => {
      const parent = windowRef.current?.parentElement;
      if (!parent) return;

      const parentRect = parent.getBoundingClientRect();
      const newX = e.clientX - parentRect.left - dragOffset.x;
      const newY = e.clientY - parentRect.top - dragOffset.y;

      // Constrain to parent bounds
      const maxX = parentRect.width - windowState.size.width;
      const maxY = parentRect.height - windowState.size.height - 24; // Leave room for taskbar

      updateWindowPosition(windowState.id, {
        x: Math.max(0, Math.min(newX, maxX)),
        y: Math.max(0, Math.min(newY, maxY)),
      });
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, dragOffset, windowState.id, windowState.size, updateWindowPosition]);

  const style: React.CSSProperties = windowState.isMaximized
    ? {
        top: 0,
        left: 0,
        width: '100%',
        height: 'calc(100% - 24px)',
        zIndex: windowState.zIndex,
      }
    : {
        top: windowState.position.y,
        left: windowState.position.x,
        width: windowState.size.width,
        height: windowState.size.height,
        zIndex: windowState.zIndex,
      };

  return (
    <div
      ref={windowRef}
      className={`absolute window ${isActive ? 'ring-2 ring-black/10' : ''} touch-feedback`}
      style={style}
      onClick={() => focusWindow(windowState.id)}
    >
      {/* Title Bar */}
      <div
        className="window-title h-3 flex items-center justify-between px-0.5 cursor-move select-none"
        onMouseDown={handleMouseDown}
      >
        <span className="text-[7px] font-medium text-white truncate">
          {windowState.title}
        </span>

        <div className="window-controls mr-2 flex gap-1">
          <span className="text-[9.3px] text-white hover:text-gray-300 cursor-pointer" onClick={() => minimizeWindow(windowState.id)}>−</span>
          <span className="text-[9.3px] text-white hover:text-gray-300 cursor-pointer" onClick={() => maximizeWindow(windowState.id)}>□</span>
          <span className="text-[9.3px] text-white hover:text-gray-300 cursor-pointer" onClick={() => closeWindow(windowState.id)}>×</span>
        </div>
      </div>

      {/* Content */}
      <div className="h-[calc(100%-12px)] overflow-auto custom-scrollbar bg-gray-900 text-white text-[7px] p-0.5">
        {children}
      </div>
    </div>
  );
}
