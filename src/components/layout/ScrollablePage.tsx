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

  return (
    <div className="relative h-screen">
      <div
        ref={scrollRef}
        className="h-full overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-900"
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