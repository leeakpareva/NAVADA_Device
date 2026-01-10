'use client';

import { useState } from 'react';
import ScrollablePage from '@/components/layout/ScrollablePage';

export default function DesignsPage() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const galleryItems = [
    { id: 1, title: 'NAVADA OS Interface', category: 'UI Design' },
    { id: 2, title: 'Micro Display Layout', category: 'Hardware' },
    { id: 3, title: 'Desktop Icons Design', category: 'UI Elements' },
    { id: 4, title: 'Navigation Patterns', category: 'UX Design' },
    { id: 5, title: 'Typography System', category: 'Design System' },
    { id: 6, title: 'Color Palette', category: 'Visual Identity' },
    { id: 7, title: 'Touch Interactions', category: 'Interactive' },
    { id: 8, title: 'Device Frame Design', category: 'Hardware' },
    { id: 9, title: 'App Layouts', category: 'UI Design' },
    { id: 10, title: 'System Components', category: 'UI Library' },
    { id: 11, title: 'User Flow Diagrams', category: 'UX Design' },
    { id: 12, title: 'Responsive Layouts', category: 'Responsive' },
  ];

  const openModal = (id: number) => {
    setSelectedImage(id);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  return (
    <ScrollablePage>
      <div className="bg-black text-white p-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold mb-8 text-white">Design Gallery</h1>

          <div className="space-y-8">
            <section>
              <p className="text-xl text-gray-300 mb-8">
                Explore our innovative design concepts and user interface elements crafted specifically for micro-display environments. Click any image to view in detail.
              </p>
            </section>

            {/* Gallery Grid */}
            <section className="bg-gray-900 p-8 rounded-lg">
              <h2 className="text-3xl font-semibold mb-8 text-white">Design Showcase</h2>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {galleryItems.map((item) => (
                  <div
                    key={item.id}
                    className="group cursor-pointer transform transition-all duration-300 hover:scale-105"
                    onClick={() => openModal(item.id)}
                  >
                    {/* Image Placeholder */}
                    <div className="relative bg-gradient-to-br from-gray-800 to-gray-700 rounded-lg overflow-hidden shadow-lg hover:shadow-white/20 transition-all duration-300">
                      <div className="aspect-square flex items-center justify-center border-2 border-gray-600 group-hover:border-white transition-colors duration-300">
                        {/* Placeholder content */}
                        <div className="text-center p-4">
                          <div className="w-12 h-12 bg-white rounded-lg mx-auto mb-3 flex items-center justify-center group-hover:bg-gray-200 transition-colors">
                            <span className="text-black text-lg font-bold">{item.id}</span>
                          </div>
                          <div className="w-full h-2 bg-gray-600 rounded mb-2"></div>
                          <div className="w-3/4 h-2 bg-gray-600 rounded mx-auto"></div>
                        </div>

                        {/* Hover Overlay */}
                        <div className="absolute inset-0 bg-white bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                          <div className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                            </svg>
                          </div>
                        </div>
                      </div>

                      {/* Image Info */}
                      <div className="p-4">
                        <h3 className="text-white font-semibold text-sm mb-1 group-hover:text-white transition-colors">
                          {item.title}
                        </h3>
                        <p className="text-gray-400 text-xs">{item.category}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Featured Designs */}
            <section className="bg-gray-900 p-8 rounded-lg">
              <h2 className="text-2xl font-semibold mb-6 text-white">Featured Design Concepts</h2>

              <div className="grid md:grid-cols-2 gap-8">
                <div
                  className="group cursor-pointer transform transition-all duration-300 hover:scale-102"
                  onClick={() => openModal(13)}
                >
                  <div className="bg-gradient-to-br from-gray-800 to-gray-700 rounded-lg p-6 border border-gray-600 group-hover:border-white transition-colors">
                    <div className="aspect-video bg-gray-600 rounded-lg mb-4 flex items-center justify-center group-hover:bg-gray-500 transition-colors">
                      <div className="text-center">
                        <div className="w-16 h-16 bg-white rounded-lg mx-auto mb-3 flex items-center justify-center group-hover:scale-110 transition-transform">
                          <span className="text-black text-2xl">🖥️</span>
                        </div>
                        <div className="text-gray-300 text-sm">Micro Display Interface</div>
                      </div>
                    </div>
                    <h3 className="text-white font-semibold mb-2 group-hover:text-white transition-colors">Complete OS Interface</h3>
                    <p className="text-gray-400 text-sm">Full desktop environment optimized for 64x96mm displays</p>
                  </div>
                </div>

                <div
                  className="group cursor-pointer transform transition-all duration-300 hover:scale-102"
                  onClick={() => openModal(14)}
                >
                  <div className="bg-gradient-to-br from-gray-800 to-gray-700 rounded-lg p-6 border border-gray-600 group-hover:border-white transition-colors">
                    <div className="aspect-video bg-gray-600 rounded-lg mb-4 flex items-center justify-center group-hover:bg-gray-500 transition-colors">
                      <div className="text-center">
                        <div className="w-16 h-16 bg-white rounded-lg mx-auto mb-3 flex items-center justify-center group-hover:scale-110 transition-transform">
                          <span className="text-black text-2xl">📱</span>
                        </div>
                        <div className="text-gray-300 text-sm">App Ecosystem</div>
                      </div>
                    </div>
                    <h3 className="text-white font-semibold mb-2 group-hover:text-white transition-colors">Application Framework</h3>
                    <p className="text-gray-400 text-sm">Native and web applications designed for micro-displays</p>
                  </div>
                </div>
              </div>
            </section>

            <div className="h-20"></div>
          </div>
        </div>
      </div>

      {/* Modal Popup */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
          onClick={closeModal}
        >
          <div
            className="relative max-w-4xl w-full max-h-full animate-popup"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              className="absolute -top-12 right-0 text-white hover:text-white transition-colors z-10"
              onClick={closeModal}
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Modal Content */}
            <div className="bg-gray-900 rounded-lg overflow-hidden shadow-2xl transform transition-all duration-300">
              {/* Modal Image Placeholder */}
              <div className="aspect-video bg-gradient-to-br from-gray-800 to-gray-700 flex items-center justify-center border-b border-gray-700">
                <div className="text-center p-8">
                  <div className="w-24 h-24 bg-white rounded-lg mx-auto mb-4 flex items-center justify-center">
                    <span className="text-black text-3xl font-bold">{selectedImage}</span>
                  </div>
                  <h3 className="text-black text-2xl font-semibold mb-2">
                    {galleryItems.find(item => item.id === selectedImage)?.title || 'Design Preview'}
                  </h3>
                  <p className="text-gray-400">
                    {galleryItems.find(item => item.id === selectedImage)?.category || 'Featured Design'}
                  </p>
                  <div className="mt-6 space-y-2">
                    <div className="w-full h-3 bg-gray-600 rounded"></div>
                    <div className="w-4/5 h-3 bg-gray-600 rounded mx-auto"></div>
                    <div className="w-3/5 h-3 bg-gray-600 rounded mx-auto"></div>
                  </div>
                </div>
              </div>

              {/* Modal Info */}
              <div className="p-6">
                <p className="text-gray-300 mb-4">
                  This space will contain the detailed design image and specifications for the selected concept.
                  Each design showcases NAVADA OS's approach to micro-display optimization.
                </p>
                <div className="flex justify-between items-center text-sm text-gray-400">
                  <span>Resolution: 1920x1080</span>
                  <span>Format: PNG</span>
                  <span>Category: {galleryItems.find(item => item.id === selectedImage)?.category}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes popup {
          0% {
            opacity: 0;
            transform: scale(0.8) translateY(20px);
          }
          100% {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }

        .animate-popup {
          animation: popup 0.3s ease-out forwards;
        }
      `}</style>
    </ScrollablePage>
  );
}