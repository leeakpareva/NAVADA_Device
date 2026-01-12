'use client';

import { useState, useEffect } from 'react';
import DeviceFrame from '@/components/device/DeviceFrame';
import CoverPage from '@/components/layout/CoverPage';
import BootLoader from '@/components/layout/BootLoader';
import Desktop from '@/components/os/Desktop';
import Header from '@/components/layout/Header';
import AboutPage from '@/components/pages/AboutPage';
import DesignsPage from '@/components/pages/DesignsPage';
import LearnPage from '@/components/pages/LearnPage';
import SignupPage from '@/components/pages/SignupPage';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

export default function Home() {
  const [showCover, setShowCover] = useState(true);
  const [bootComplete, setBootComplete] = useState(false);
  const [showBoot, setShowBoot] = useState(false);
  const [currentPage, setCurrentPage] = useState('home');
  const [isPageLoading, setIsPageLoading] = useState(false);
  const [pageVisible, setPageVisible] = useState(true);

  useEffect(() => {
    // Always show cover page first, regardless of previous boot status
    // Users must click cover page to enter the app
  }, []);

  const handleCoverClick = () => {
    setShowCover(false);
    setShowBoot(true);
  };

  const handleBootComplete = () => {
    sessionStorage.setItem('navada-booted', 'true');
    setBootComplete(true);
    setTimeout(() => setShowBoot(false), 500);
  };

  const handleNavigate = (page: string) => {
    if (page === currentPage) return; // Don't reload same page

    // Start page transition
    setPageVisible(false);
    setIsPageLoading(true);

    // Simulate loading time for smooth transition
    setTimeout(() => {
      setCurrentPage(page);
      setIsPageLoading(false);

      // Fade in new page
      setTimeout(() => {
        setPageVisible(true);
      }, 50);
    }, 600); // 600ms loading time
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'about':
        return <AboutPage />;
      case 'designs':
        return <DesignsPage />;
      case 'learn':
        return <LearnPage />;
      case 'signup':
        return <SignupPage />;
      case 'home':
      default:
        return (
          <main className="h-full overflow-hidden">
            <DeviceFrame>
              <Desktop />
            </DeviceFrame>
          </main>
        );
    }
  };

  return (
    <>
      {showCover && <CoverPage onContinue={handleCoverClick} />}
      {showBoot && <BootLoader onComplete={handleBootComplete} />}
      {!showCover && !showBoot && (
        <div className={`transition-opacity duration-500 ${bootComplete ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
          <Header onNavigate={handleNavigate} />
          <div className="pt-16 relative">
            {/* Page Loading Spinner */}
            {isPageLoading && (
              <div className="fixed inset-0 z-40 bg-black bg-opacity-50 flex items-center justify-center">
                <LoadingSpinner
                  size="medium"
                  showText={true}
                  text="Loading page..."
                  className="text-white"
                />
              </div>
            )}

            {/* Page Content with Fade Transition */}
            <div className={`transition-opacity duration-500 ${pageVisible ? 'opacity-100' : 'opacity-0'}`}>
              {renderCurrentPage()}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
