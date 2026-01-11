import { create } from 'zustand';
import type { WindowState, AppDefinition } from '@/types';
import { storage, STORAGE_KEYS } from '@/lib/storage';

interface OSState {
  // Windows
  windows: WindowState[];
  activeWindowId: string | null;
  highestZIndex: number;

  // Apps
  apps: AppDefinition[];

  // Global Background
  globalBackground: string;
  currentImage: string | null;

  // Actions
  openApp: (appId: string) => void;
  closeWindow: (windowId: string) => void;
  minimizeWindow: (windowId: string) => void;
  maximizeWindow: (windowId: string) => void;
  restoreWindow: (windowId: string) => void;
  focusWindow: (windowId: string) => void;
  updateWindowPosition: (windowId: string, position: { x: number; y: number }) => void;
  updateWindowSize: (windowId: string, size: { width: number; height: number }) => void;
  setGlobalBackground: (color: string) => void;
  setCurrentImage: (imagePath: string | null) => void;
}

const defaultApps: AppDefinition[] = [
  { id: 'terminal', name: 'App', icon: '/App icons/App.png', defaultSize: { width: 250, height: 160 } },
  { id: 'youtube', name: 'YouTube', icon: '/App icons/Youtube.png', defaultSize: { width: 280, height: 180 } },
  { id: 'ai-agent', name: 'Leslie', icon: '/App icons/Leslie.png', defaultSize: { width: 250, height: 180 } },
  { id: 'screensaver', name: 'Screensaver', icon: '/App icons/ScreenSaver.png', defaultSize: { width: 250, height: 160 } },
  { id: 'raven', name: 'Python', icon: '/App icons/Python.png', defaultSize: { width: 280, height: 180 } },
  { id: 'deepseek', name: 'DeepSeek', icon: '/App icons/DeepSeek.png', defaultSize: { width: 280, height: 180 } },
];

const getStoredBackground = () => storage.getWithEnvironmentDefault(
  STORAGE_KEYS.BACKGROUND,
  '#00FF41',
  '#000000'
);

const getStoredImage = () => storage.getWithEnvironmentDefault(
  STORAGE_KEYS.CURRENT_IMAGE,
  '/screensaver/Burn.png',
  ''
) || null;

export const useOSStore = create<OSState>((set, get) => ({
  windows: [],
  activeWindowId: null,
  highestZIndex: 0,
  apps: defaultApps,
  globalBackground: getStoredBackground(),
  currentImage: getStoredImage(),

  openApp: (appId: string) => {
    const { windows, apps, highestZIndex } = get();
    const app = apps.find(a => a.id === appId);
    
    if (!app) return;

    // Check if app is already open
    const existingWindow = windows.find(w => w.appId === appId);
    if (existingWindow) {
      // Focus existing window
      get().focusWindow(existingWindow.id);
      if (existingWindow.isMinimized) {
        get().restoreWindow(existingWindow.id);
      }
      return;
    }

    const newZIndex = highestZIndex + 1;
    const windowId = `window-${Date.now()}`;

    // Calculate position (stagger windows)
    const offset = (windows.length % 5) * 15;
    const position = { x: 10 + offset, y: 10 + offset };

    const newWindow: WindowState = {
      id: windowId,
      appId: app.id,
      title: app.name,
      isMinimized: false,
      isMaximized: false,
      zIndex: newZIndex,
      position,
      size: app.defaultSize || { width: 250, height: 160 },
    };

    set({
      windows: [...windows, newWindow],
      activeWindowId: windowId,
      highestZIndex: newZIndex,
    });
  },

  closeWindow: (windowId: string) => {
    const { windows, activeWindowId } = get();
    const newWindows = windows.filter(w => w.id !== windowId);
    
    set({
      windows: newWindows,
      activeWindowId: activeWindowId === windowId 
        ? (newWindows.length > 0 ? newWindows[newWindows.length - 1].id : null)
        : activeWindowId,
    });
  },

  minimizeWindow: (windowId: string) => {
    set(state => ({
      windows: state.windows.map(w =>
        w.id === windowId ? { ...w, isMinimized: true } : w
      ),
      activeWindowId: state.activeWindowId === windowId ? null : state.activeWindowId,
    }));
  },

  maximizeWindow: (windowId: string) => {
    set(state => ({
      windows: state.windows.map(w =>
        w.id === windowId ? { ...w, isMaximized: true, position: { x: 0, y: 0 } } : w
      ),
    }));
  },

  restoreWindow: (windowId: string) => {
    const { highestZIndex } = get();
    set(state => ({
      windows: state.windows.map(w =>
        w.id === windowId 
          ? { ...w, isMinimized: false, isMaximized: false, zIndex: highestZIndex + 1 } 
          : w
      ),
      activeWindowId: windowId,
      highestZIndex: highestZIndex + 1,
    }));
  },

  focusWindow: (windowId: string) => {
    const { highestZIndex, windows } = get();
    const window = windows.find(w => w.id === windowId);
    
    if (!window || window.isMinimized) return;
    
    const newZIndex = highestZIndex + 1;
    
    set({
      windows: windows.map(w =>
        w.id === windowId ? { ...w, zIndex: newZIndex } : w
      ),
      activeWindowId: windowId,
      highestZIndex: newZIndex,
    });
  },

  updateWindowPosition: (windowId: string, position: { x: number; y: number }) => {
    set(state => ({
      windows: state.windows.map(w =>
        w.id === windowId ? { ...w, position } : w
      ),
    }));
  },

  updateWindowSize: (windowId: string, size: { width: number; height: number }) => {
    set(state => ({
      windows: state.windows.map(w =>
        w.id === windowId ? { ...w, size } : w
      ),
    }));
  },

  setGlobalBackground: (color: string) => {
    set({ globalBackground: color });
    storage.set(STORAGE_KEYS.BACKGROUND, color);
  },

  setCurrentImage: (imagePath: string | null) => {
    set({ currentImage: imagePath });
    if (imagePath) {
      storage.set(STORAGE_KEYS.CURRENT_IMAGE, imagePath);
    } else {
      storage.remove(STORAGE_KEYS.CURRENT_IMAGE);
    }
  },
}));
