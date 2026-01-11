'use client';

import { useState, useEffect } from 'react';
import DeviceFrame from '@/components/device/DeviceFrame';
import BootSequence from '@/components/os/BootSequence';
import Desktop from '@/components/os/Desktop';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import AboutPage from '@/components/pages/AboutPage';
import DesignsPage from '@/components/pages/DesignsPage';
import LearnPage from '@/components/pages/LearnPage';
import SignupPage from '@/components/pages/SignupPage';

export default function Home() {
  const [bootComplete, setBootComplete] = useState(false);
  const [showBoot, setShowBoot] = useState(true);
  const [currentPage, setCurrentPage] = useState('home');

  useEffect(() => {
    // Skip boot on development hot reloads
    const hasBooted = sessionStorage.getItem('navada-booted');
    if (hasBooted) {
      setShowBoot(false);
      setBootComplete(true);
    }
  }, []);

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
              {showBoot ? (
                <BootSequence onComplete={handleBootComplete} />
              ) : (
                <Desktop />
              )}
            </DeviceFrame>
          </main>
        );
    }
  };

  return (
    <>
      <Header onNavigate={handleNavigate} />
      <div className="pt-16">
        {renderCurrentPage()}
      </div>
    </>
  );
}
