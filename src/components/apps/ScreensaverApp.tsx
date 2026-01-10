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

const sampleImages = [
  '/screensaver/Burn.png',
  // Add more images here as you put them in /public/screensaver/
  // Example: '/screensaver/yourimage.jpg',
];

export default function ScreensaverApp() {
  const { globalBackground, currentImage, setGlobalBackground, setCurrentImage } = useOSStore();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);


  const nextImage = () => {
    if (sampleImages.length > 0) {
      const newIndex = (currentImageIndex + 1) % sampleImages.length;
      setCurrentImageIndex(newIndex);
      setCurrentImage(sampleImages[newIndex]);
    }
  };

  const prevImage = () => {
    if (sampleImages.length > 0) {
      const newIndex = (currentImageIndex - 1 + sampleImages.length) % sampleImages.length;
      setCurrentImageIndex(newIndex);
      setCurrentImage(sampleImages[newIndex]);
    }
  };


  const resetToBlack = () => {
    setGlobalBackground('#000000');
    setCurrentImage(null);
  };

  return (
    <div className="h-full w-full overflow-auto custom-scrollbar bg-gray-900">
      {/* Header */}
      <div className="bg-gray-800 p-2 border-b border-gray-700">
        <span className="text-white font-medium text-xs">🖼️ Screensaver Control</span>
      </div>

      {/* Control Panel */}
      <div className="p-3 space-y-3">
        {/* Images Section */}
        {sampleImages.length > 0 && (
          <div className="space-y-2">
            <div className="text-white text-xs font-medium">Images:</div>
            <div className="flex items-center justify-between">
              <button
                onClick={prevImage}
                className="px-2 py-1 bg-gray-700 text-white rounded text-xs hover:bg-gray-600 transition-colors"
              >
                ←
              </button>
              <span className="text-white text-xs">
                {currentImageIndex + 1} / {sampleImages.length}
              </span>
              <button
                onClick={nextImage}
                className="px-2 py-1 bg-gray-700 text-white rounded text-xs hover:bg-gray-600 transition-colors"
              >
                →
              </button>
            </div>
            <button
              onClick={() => setCurrentImage(sampleImages[currentImageIndex])}
              className="w-full px-2 py-1 bg-blue-600 text-white rounded text-xs hover:bg-blue-500 transition-colors"
            >
              Set Background
            </button>
          </div>
        )}

        {/* No Images Message */}
        {sampleImages.length === 0 && (
          <div className="text-center py-4">
            <div className="text-white text-xs mb-1">No images found</div>
            <div className="text-gray-400 text-xs">Add images to /public/screensaver/</div>
          </div>
        )}

        {/* Color Palette */}
        <div className="space-y-2">
          <div className="text-white text-xs font-medium">Background Colors:</div>
          <div className="grid grid-cols-4 gap-1">
            {retroColors.map((color) => (
              <button
                key={color.value}
                onClick={() => setGlobalBackground(color.value)}
                className={`w-8 h-8 rounded border-2 transition-all hover:scale-110 ${
                  globalBackground === color.value
                    ? 'border-white shadow-lg'
                    : 'border-gray-500'
                }`}
                style={{ backgroundColor: color.value }}
                title={color.name}
              />
            ))}
          </div>
        </div>


        {/* Reset Button */}
        <div className="pt-2 border-t border-gray-700">
          <button
            onClick={resetToBlack}
            className="w-full px-2 py-1 bg-red-600 text-white rounded text-xs hover:bg-red-500 transition-colors"
          >
            Reset to Black
          </button>
        </div>
      </div>
    </div>
  );
}