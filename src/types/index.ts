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
  defaultSize: { width: number; height: number };
}

export interface GalleryItem {
  id: number;
  title: string;
  description: string;
  image: string;
  category: string;
}
