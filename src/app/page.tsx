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

export default function Home() {
  const [showCover, setShowCover] = useState(true);
  const [bootComplete, setBootComplete] = useState(false);
  const [showBoot, setShowBoot] = useState(false);
  const [currentPage, setCurrentPage] = useState('home');

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
    setCurrentPage(page);
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
          <div className="pt-16">
            {renderCurrentPage()}
          </div>
        </div>
      )}
    </>
  );
}
