'use client';

import { useRef, useState, useEffect, ReactNode } from 'react';

interface ScrollablePageProps {
  children: ReactNode;
}

export default function ScrollablePage({ children }: ScrollablePageProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showScrollButtons, setShowScrollButtons] = useState(false);
  const [canScrollUp, setCanScrollUp] = useState(false);
  const [canScrollDown, setCanScrollDown] = useState(false);
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

  const checkScrollability = () => {
    if (scrollRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;
      setCanScrollUp(scrollTop > 0);
      setCanScrollDown(scrollTop < scrollHeight - clientHeight);
      setShowScrollButtons(scrollHeight > clientHeight);
    }
  };

  useEffect(() => {
    const scrollElement = scrollRef.current;
    if (scrollElement) {
      checkScrollability();
      scrollElement.addEventListener('scroll', checkScrollability);
      window.addEventListener('resize', checkScrollability);

      return () => {
        scrollElement.removeEventListener('scroll', checkScrollability);
        window.removeEventListener('resize', checkScrollability);
      };
    }
  }, []);

  const scrollUp = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        top: -window.innerHeight * 0.8,
        behavior: 'smooth'
      });
    }
  };

  const scrollDown = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        top: window.innerHeight * 0.8,
        behavior: 'smooth'
      });
    }
  };

  const scrollToTop = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  };

  const scrollToBottom = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  };

  // Mobile view - with constrained scrolling
  if (isMobile) {
    return (
      <div className="relative bg-black" style={{ height: 'calc(100vh - 64px)' }}>
        <div
          ref={scrollRef}
          className="h-full overflow-y-auto bg-black"
          style={{
            scrollBehavior: 'smooth',
            maxWidth: '100vw',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none'
          }}
        >
          <style jsx>{`
            div::-webkit-scrollbar {
              display: none;
            }
          `}</style>
          {children}
        </div>

        {/* Mobile Scroll Controls */}
        {showScrollButtons && (
          <>
            {/* Compact Mobile Scroll Buttons */}
            <div className="fixed right-4 top-1/2 -translate-y-1/2 flex flex-col space-y-2 z-50">
              <button
                onClick={scrollUp}
                disabled={!canScrollUp}
                className={`w-10 h-10 rounded-full bg-white text-black font-bold text-lg shadow-lg transition-all ${
                  !canScrollUp ? 'opacity-30 cursor-not-allowed' : 'opacity-80 hover:opacity-100'
                }`}
                title="Scroll Up"
              >
                ↑
              </button>
              <button
                onClick={scrollDown}
                disabled={!canScrollDown}
                className={`w-10 h-10 rounded-full bg-white text-black font-bold text-lg shadow-lg transition-all ${
                  !canScrollDown ? 'opacity-30 cursor-not-allowed' : 'opacity-80 hover:opacity-100'
                }`}
                title="Scroll Down"
              >
                ↓
              </button>
            </div>

            {/* Mobile Scroll Progress Indicator */}
            <div className="fixed left-4 top-1/2 -translate-y-1/2 w-1 h-20 bg-gray-800 rounded-full z-50 opacity-60">
              <div
                className="w-full bg-white rounded-full transition-all duration-300"
                style={{
                  height: `${
                    scrollRef.current
                      ? (scrollRef.current.scrollTop / (scrollRef.current.scrollHeight - scrollRef.current.clientHeight)) * 100
                      : 0
                  }%`
                }}
              />
            </div>
          </>
        )}
      </div>
    );
  }

  // Desktop view - original scrollable layout
  return (
    <div className="relative bg-black" style={{ height: 'calc(100vh - 64px)' }}>
      <div
        ref={scrollRef}
        className="h-full overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-900 bg-black"
        style={{ scrollBehavior: 'smooth' }}
      >
        {children}
      </div>

      {/* Scroll Controls */}
      {showScrollButtons && (
        <>
          {/* Floating Scroll Buttons */}
          <div className="fixed right-6 top-1/2 -translate-y-1/2 flex flex-col space-y-2 z-50">
            <button
              onClick={scrollUp}
              disabled={!canScrollUp}
              className={`w-12 h-12 rounded-full bg-white text-black font-bold text-xl shadow-lg transition-all hover:bg-gray-200 ${
                !canScrollUp ? 'opacity-50 cursor-not-allowed' : 'hover:scale-110'
              }`}
              title="Scroll Up"
            >
              ↑
            </button>
            <button
              onClick={scrollDown}
              disabled={!canScrollDown}
              className={`w-12 h-12 rounded-full bg-white text-black font-bold text-xl shadow-lg transition-all hover:bg-gray-200 ${
                !canScrollDown ? 'opacity-50 cursor-not-allowed' : 'hover:scale-110'
              }`}
              title="Scroll Down"
            >
              ↓
            </button>
          </div>

          {/* Quick Navigation Buttons */}
          <div className="fixed bottom-6 right-6 flex space-x-2 z-50">
            <button
              onClick={scrollToTop}
              disabled={!canScrollUp}
              className={`px-4 py-2 bg-gray-800 text-white text-sm rounded-lg shadow-lg transition-all hover:bg-gray-700 ${
                !canScrollUp ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'
              }`}
              title="Top"
            >
              Top
            </button>
            <button
              onClick={scrollToBottom}
              disabled={!canScrollDown}
              className={`px-4 py-2 bg-gray-800 text-white text-sm rounded-lg shadow-lg transition-all hover:bg-gray-700 ${
                !canScrollDown ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'
              }`}
              title="Bottom"
            >
              Bottom
            </button>
          </div>

          {/* Scroll Progress Indicator */}
          <div className="fixed left-6 top-1/2 -translate-y-1/2 w-1 h-32 bg-gray-800 rounded-full z-50">
            <div
              className="w-full bg-white rounded-full transition-all duration-300"
              style={{
                height: `${
                  scrollRef.current
                    ? (scrollRef.current.scrollTop / (scrollRef.current.scrollHeight - scrollRef.current.clientHeight)) * 100
                    : 0
                }%`
              }}
            />
          </div>
        </>
      )}

    </div>
  );
}