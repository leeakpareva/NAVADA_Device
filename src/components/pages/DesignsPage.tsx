'use client';

import { useState, useEffect, useCallback, memo } from 'react';
import ScrollablePage from '@/components/layout/ScrollablePage';
import Image from 'next/image';
import type { GalleryItem } from '@/types';

function DesignsPage() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  // Mobile detection
  useEffect(() => {
    const checkMobile = () => {
      const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      const isSmallScreen = window.innerWidth < 1024;
      const isMobileUserAgent = /iPhone|iPad|iPod|Android|webOS|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

      setIsMobile(isMobileUserAgent || (isTouchDevice && isSmallScreen));
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    // Fetch images from API
    const fetchDesigns = async () => {
      try {
        const response = await fetch('/api/designs');
        const data = await response.json();
        if (data.images && data.images.length > 0) {
          setGalleryItems(data.images);
        }
      } catch (error) {
        console.error('Error fetching designs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDesigns();
  }, []);

  const openModal = useCallback((id: number) => {
    setSelectedImage(id);
  }, []);

  const closeModal = useCallback(() => {
    setSelectedImage(null);
  }, []);

  return (
    <ScrollablePage>
      <div className="bg-black text-white">
        <div className={`mx-auto px-4 sm:px-8 pt-2 ${isMobile ? 'max-w-sm' : 'max-w-6xl'}`}>
          <h1 className={`font-bold mb-4 text-white ${isMobile ? 'text-2xl text-center' : 'text-4xl'}`}>
            Design Gallery
          </h1>

          <div className="space-y-6">
            <section>
              <p className={`text-gray-300 mb-8 ${isMobile ? 'text-sm text-center' : 'text-xl'}`}>
                {isMobile
                  ? 'Our design concepts for micro-displays'
                  : 'Explore our innovative design concepts and user interface elements crafted specifically for micro-display environments. Click any image to view in detail.'
                }
              </p>
            </section>

            {/* Gallery Grid */}
            <section>
              {loading ? (
                <div className="text-center py-12">
                  <p className="text-gray-400">Loading designs...</p>
                </div>
              ) : (
              <div className={`grid gap-4 sm:gap-6 px-4 sm:px-0 ${
                isMobile
                  ? 'grid-cols-2 gap-3'
                  : 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'
              }`}>
                {galleryItems.map((item) => (
                  <div
                    key={item.id}
                    className="group cursor-pointer transform transition-all duration-300 hover:scale-105"
                    onClick={() => openModal(item.id)}
                  >
                    {/* Image */}
                    <div className={`relative w-full ${isMobile ? 'aspect-square' : 'aspect-square'}`}>
                      {item.image ? (
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          className="object-contain"
                          sizes="(max-width: 640px) 50vw, (max-width: 768px) 50vw, 25vw"
                          priority={item.id <= 4}
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-700 rounded-lg flex items-center justify-center">
                          <div className="text-center p-2 sm:p-4">
                            <div className={`bg-white rounded-lg mx-auto mb-2 sm:mb-3 flex items-center justify-center group-hover:bg-gray-200 transition-colors ${
                              isMobile ? 'w-8 h-8' : 'w-12 h-12'
                            }`}>
                              <span className={`text-black font-bold ${isMobile ? 'text-sm' : 'text-lg'}`}>{item.id}</span>
                            </div>
                            <div className={`w-full bg-gray-600 rounded mb-1 sm:mb-2 ${isMobile ? 'h-1' : 'h-2'}`}></div>
                            <div className={`w-3/4 bg-gray-600 rounded mx-auto ${isMobile ? 'h-1' : 'h-2'}`}></div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              )}
            </section>


            <div className="h-20"></div>
          </div>
        </div>
      </div>

      {/* Modal Popup */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-2 sm:p-4"
          onClick={closeModal}
        >
          <div
            className="relative max-w-4xl w-full max-h-[90vh] sm:max-h-full animate-popup"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              className="absolute -top-10 sm:-top-12 right-2 sm:right-0 text-white hover:text-white transition-colors z-10"
              onClick={closeModal}
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Modal Content */}
            <div className="bg-gray-900 rounded-lg overflow-hidden shadow-2xl transform transition-all duration-300">
              {/* Modal Image */}
              <div className="aspect-video bg-gradient-to-br from-gray-800 to-gray-700 flex items-center justify-center border-b border-gray-700 relative">
                {galleryItems.find(item => item.id === selectedImage)?.image ? (
                  <Image
                    src={galleryItems.find(item => item.id === selectedImage)?.image || ''}
                    alt={galleryItems.find(item => item.id === selectedImage)?.title || 'Design Preview'}
                    fill
                    className="object-contain"
                    sizes="(max-width: 1200px) 100vw, 1200px"
                  />
                ) : (
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
                )}
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

export default memo(DesignsPage);