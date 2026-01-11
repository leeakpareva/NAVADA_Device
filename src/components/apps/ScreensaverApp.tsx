'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useOSStore } from '@/stores/osStore';

const retroColors = [
  { name: 'Black', value: '#000000' },
  { name: 'Retro Green', value: '#00FF41' },
  { name: 'Amber', value: '#FFBF00' },
  { name: 'Hot Pink', value: '#FF69B4' },
  { name: 'Cyan', value: '#00FFFF' },
  { name: 'Purple', value: '#9932CC' },
  { name: 'Orange', value: '#FF4500' },
  { name: 'Lime', value: '#32CD32' },
];

// Images will be dynamically loaded from API

export default function ScreensaverApp() {
  const { globalBackground, currentImage, setGlobalBackground, setCurrentImage } = useOSStore();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch images from API
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch('/api/screensaver');
        const data = await response.json();
        setImages(data.images || []);
      } catch (error) {
        console.error('Failed to fetch screensaver images:', error);
        setImages([]);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

  const nextImage = () => {
    if (images.length > 0) {
      const newIndex = (currentImageIndex + 1) % images.length;
      setCurrentImageIndex(newIndex);
      setCurrentImage(images[newIndex]);
    }
  };

  const prevImage = () => {
    if (images.length > 0) {
      const newIndex = (currentImageIndex - 1 + images.length) % images.length;
      setCurrentImageIndex(newIndex);
      setCurrentImage(images[newIndex]);
    }
  };


  const resetToBlack = () => {
    setGlobalBackground('#000000');
    setCurrentImage(null);
  };

  const refreshImages = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/screensaver');
      const data = await response.json();
      setImages(data.images || []);
      setCurrentImageIndex(0);
    } catch (error) {
      console.error('Failed to refresh screensaver images:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-full w-full overflow-auto custom-scrollbar bg-black">
      {/* Header */}
      <div className="bg-gray-900 p-2 border-b border-gray-600">
        <div className="flex items-center justify-between">
          <span className="text-white font-bold text-xs">🖼️ Screensaver Control</span>
          <span className="text-gray-400 text-xs">Current: {currentImage ? 'Image' : globalBackground}</span>
        </div>
      </div>

      {/* Control Panel */}
      <div className="p-3 space-y-3">
        {/* Loading Message */}
        {loading && (
          <div className="text-center py-4">
            <div className="text-white text-xs">Loading images...</div>
          </div>
        )}

        {/* Images Section */}
        {!loading && images.length > 0 && (
          <div className="space-y-2">
            <div className="text-white text-xs font-medium">Images ({images.length}):</div>
            <div className="flex items-center justify-between">
              <button
                onClick={prevImage}
                className="px-2 py-1 bg-gray-700 text-white rounded text-xs hover:bg-gray-600 transition-colors"
              >
                ←
              </button>
              <span className="text-white text-xs">
                {currentImageIndex + 1} / {images.length}
              </span>
              <button
                onClick={nextImage}
                className="px-2 py-1 bg-gray-700 text-white rounded text-xs hover:bg-gray-600 transition-colors"
              >
                →
              </button>
            </div>
            <button
              onClick={() => setCurrentImage(images[currentImageIndex])}
              className="w-full px-2 py-1 bg-blue-600 text-white rounded text-xs hover:bg-blue-500 transition-colors"
            >
              Set Background
            </button>
          </div>
        )}

        {/* No Images Message */}
        {!loading && images.length === 0 && (
          <div className="text-center py-4">
            <div className="text-white text-xs mb-1">No images found</div>
            <div className="text-gray-400 text-xs mb-2">Add images to /public/screensaver/</div>
            <button
              onClick={refreshImages}
              className="px-2 py-1 bg-green-600 text-white rounded text-xs hover:bg-green-500 transition-colors"
            >
              🔄 Refresh
            </button>
          </div>
        )}

        {/* Refresh Button */}
        {!loading && images.length > 0 && (
          <div className="flex justify-center">
            <button
              onClick={refreshImages}
              className="px-2 py-1 bg-green-600 text-white rounded text-xs hover:bg-green-500 transition-colors"
            >
              🔄 Refresh Images
            </button>
          </div>
        )}

        {/* Color Palette */}
        <div className="space-y-2 border-t border-gray-700 pt-3">
          <div className="text-white text-xs font-bold">🎨 Background Colors:</div>
          <div className="grid grid-cols-4 gap-2">
            {retroColors.map((color) => (
              <button
                key={color.value}
                onClick={() => {
                  setGlobalBackground(color.value);
                  setCurrentImage(null); // Clear image when selecting color
                }}
                className={`relative h-10 rounded-lg border-2 transition-all hover:scale-105 ${
                  globalBackground === color.value && !currentImage
                    ? 'border-white ring-2 ring-white/50'
                    : 'border-gray-600 hover:border-gray-400'
                }`}
                style={{ backgroundColor: color.value }}
                title={color.name}
              >
                {globalBackground === color.value && !currentImage && (
                  <span className="absolute inset-0 flex items-center justify-center">
                    <span className="text-white text-xs font-bold bg-black/50 px-1 rounded">✓</span>
                  </span>
                )}
              </button>
            ))}
          </div>
          <div className="text-gray-400 text-xs text-center">Click any color to apply</div>
        </div>


        {/* Reset Button */}
        <div className="pt-2 border-t border-gray-700">
          <button
            onClick={resetToBlack}
            className="w-full px-3 py-2 bg-red-600 text-white rounded-lg text-xs font-bold hover:bg-red-500 transition-colors"
          >
            🔄 Reset to Black
          </button>
        </div>
      </div>
    </div>
  );
}