'use client';

import { useState, useEffect } from 'react';
import DeviceFrame from '@/components/device/DeviceFrame';
import CoverPage from '@/components/layout/CoverPage';
import BootLoader from '@/components/layout/BootLoader';
import Desktop from '@/components/os/Desktop';
import Header from '@/components/layout/Header';
import DesignsPage from '@/components/pages/DesignsPage';
import LearnPage from '@/components/pages/LearnPage';
import AgentPage from '@/components/pages/AgentPage';
import RavenPage from '@/components/pages/RavenPage';
import SignupPage from '@/components/pages/SignupPage';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import PasscodeAuth from '@/components/auth/PasscodeAuth';

export default function Home() {
  const [showCover, setShowCover] = useState(true);
  const [bootComplete, setBootComplete] = useState(false);
  const [showBoot, setShowBoot] = useState(false);
  const [currentPage, setCurrentPage] = useState('home');
  const [isPageLoading, setIsPageLoading] = useState(false);
  const [pageVisible, setPageVisible] = useState(true);
  const [terminalKey, setTerminalKey] = useState(0);

  useEffect(() => {
    // Session Token Generation
    if (typeof window !== 'undefined' && !sessionStorage.getItem('raven-session')) {
      // Fallback UUID generation if crypto.randomUUID is not available
      const generateUUID = () => {
        if (typeof crypto !== 'undefined' && crypto.randomUUID) {
          return crypto.randomUUID();
        } else {
          // Fallback UUID v4 generation
          return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            const r = Math.random() * 16 | 0;
            const v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
          });
        }
      };

      const sessionToken = generateUUID() + '-' + Date.now();
      sessionStorage.setItem('raven-session', sessionToken);
    }

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
    // Special handling for home navigation - always refresh
    if (page === 'home') {
      // Force refresh by incrementing terminal key
      setTerminalKey(prev => prev + 1);

      // If already on home, just return
      if (currentPage === 'home') {
        return;
      }
    }

    if (page === currentPage) {
      // If already on the same page, just refresh the terminal for agent page
      if (page === 'agent') {
        setTerminalKey(prev => prev + 1);
      }
      return;
    }

    // Check if trying to navigate to Agent on mobile
    if (page === 'agent' && window.innerWidth < 768) {
      alert('The RAVEN Terminal Agent is only available on desktop devices.');
      return;
    }

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
      case 'designs':
        return <DesignsPage />;
      case 'learn':
        return <LearnPage />;
      case 'agent':
        return <AgentPage key={terminalKey} onNavigate={handleNavigate} />;
      case 'raven':
        return <RavenPage />;
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
          {currentPage !== 'agent' && <Header onNavigate={handleNavigate} />}
          <div className={currentPage === 'agent' ? '' : 'pt-16 relative'}>
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
