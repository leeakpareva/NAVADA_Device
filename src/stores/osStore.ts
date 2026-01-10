import { create } from 'zustand';

export interface WindowState {
  id: string;
  appId: string;
  title: string;
  isMinimized: boolean;
  isMaximized: boolean;
  zIndex: number;
  position: { x: number; y: number };
  size: { width: number; height: number };
}

export interface AppDefinition {
  id: string;
  name: string;
  icon: string;
  defaultSize?: { width: number; height: number };
}

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
  { id: 'terminal', name: 'App', icon: '💻', defaultSize: { width: 280, height: 180 } },
  { id: 'screensaver', name: 'Screensaver', icon: '🖼️', defaultSize: { width: 300, height: 200 } },
];

const getStoredBackground = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('navada-background') || (process.env.NODE_ENV === 'production' ? '#00FF41' : '#000000');
  }
  return process.env.NODE_ENV === 'production' ? '#00FF41' : '#000000';
};

const getStoredImage = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('navada-current-image') || (process.env.NODE_ENV === 'production' ? '/screensaver/Burn.png' : null);
  }
  return process.env.NODE_ENV === 'production' ? '/screensaver/Burn.png' : null;
};

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
    
    const newWindow: WindowState = {
      id: windowId,
      appId: app.id,
      title: app.name,
      isMinimized: false,
      isMaximized: false,
      zIndex: newZIndex,
      position: { x: 10 + offset, y: 10 + offset },
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
    if (typeof window !== 'undefined') {
      localStorage.setItem('navada-background', color);
    }
  },

  setCurrentImage: (imagePath: string | null) => {
    set({ currentImage: imagePath });
    if (typeof window !== 'undefined') {
      if (imagePath) {
        localStorage.setItem('navada-current-image', imagePath);
      } else {
        localStorage.removeItem('navada-current-image');
      }
    }
  },
}));
