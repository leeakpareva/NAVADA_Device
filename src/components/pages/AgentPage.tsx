'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

// Dynamic import with no SSR to prevent hydration issues
const RAVENTerminal = dynamic(() => import('../RAVENTerminal'), {
  ssr: false,
  loading: () => (
    <div className="fixed inset-0 bg-black flex items-center justify-center">
      <div className="text-center">
        <div className="relative inline-block">
          <div className="w-20 h-20 border-4 border-green-500/20 rounded-full"></div>
          <div className="absolute top-0 left-0 w-20 h-20 border-4 border-green-500 rounded-full border-t-transparent animate-spin"></div>
        </div>
        <div className="mt-6">
          <div className="text-green-400 text-xl font-bold animate-pulse">Loading Terminal...</div>
        </div>
      </div>
    </div>
  ),
});

interface AgentPageProps {
  onNavigate?: (page: string) => void;
}

export default function AgentPage({ onNavigate }: AgentPageProps) {
  const [isMobile, setIsMobile] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showTerminal, setShowTerminal] = useState(false);
  const [terminalKey, setTerminalKey] = useState(0);

  // Check if mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Simulate loading and auto-show terminal after a brief delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      setShowTerminal(true);
    }, 2000); // 2 second loading

    return () => clearTimeout(timer);
  }, []);

  // Mobile fallback
  if (isMobile) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center p-4">
        <div className="text-center max-w-md">
          <div className="text-6xl mb-6">🖥️</div>
          <h1 className="text-2xl font-bold mb-4">Desktop Only Feature</h1>
          <p className="text-gray-400 mb-6">
            The RAVEN Terminal Agent is only available on desktop devices for optimal experience.
          </p>
          <p className="text-gray-500 text-sm">
            Please access this page from a desktop or laptop computer.
          </p>
        </div>
      </div>
    );
  }

  // Show loading spinner
  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-black flex items-center justify-center">
        <div className="text-center">
          {/* Spinner */}
          <div className="relative inline-block">
            <div className="w-20 h-20 border-4 border-green-500/20 rounded-full"></div>
            <div className="absolute top-0 left-0 w-20 h-20 border-4 border-green-500 rounded-full border-t-transparent animate-spin"></div>
          </div>

          {/* Loading text */}
          <div className="mt-6">
            <h2 className="text-green-400 text-xl font-bold mb-2">Loading RAVEN Terminal</h2>
            <p className="text-gray-500 text-sm animate-pulse">Initializing AI environment...</p>
          </div>
        </div>
      </div>
    );
  }

  // Show terminal directly after loading
  if (showTerminal) {
    return (
      <RAVENTerminal
        key={terminalKey}
        onClose={onNavigate ? () => onNavigate('home') : undefined}
      />
    );
  }

  return null;
}