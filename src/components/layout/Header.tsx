'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';

interface HeaderProps {
  onNavigate: (page: string) => void;
}

export default function Header({ onNavigate }: HeaderProps) {
  const [activeMenu, setActiveMenu] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const menuItems = [
    { id: 'about', icon: '?' },
    { id: 'designs', icon: '◈' },
    { id: 'learn', icon: '⊞' },
    { id: 'raven', icon: '◯' },
    { id: 'signup', icon: '+' }
  ];

  // Auto-play music when component mounts
  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      // Set audio properties
      audio.loop = true;
      audio.volume = 0.3; // Set to 30% volume

      // Try to auto-play
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
          })
          .catch((error) => {
            // Auto-play was prevented, user needs to interact first
            console.log('Auto-play prevented:', error);
            setIsPlaying(false);
          });
      }
    }
  }, []);

  const toggleMusic = () => {
    const audio = audioRef.current;
    if (audio) {
      if (isPlaying) {
        audio.pause();
        setIsPlaying(false);
      } else {
        audio.play().then(() => {
          setIsPlaying(true);
        }).catch((error) => {
          console.log('Play failed:', error);
        });
      }
    }
  };

  const handleMenuClick = (menuId: string) => {
    setActiveMenu(menuId);
    onNavigate(menuId);
  };

  return (
    <header className="fixed top-0 left-0 w-full backdrop-blur-sm border-b border-gray-800/20 px-4 py-1 z-50" style={{ backgroundColor: 'rgba(0, 0, 0, 0)' }}>
      <div className="flex items-center justify-between max-w-6xl mx-auto">
        {/* Logo */}
        <div
          className="flex items-center space-x-2 cursor-pointer"
          onClick={() => {
            onNavigate('home');
            window.location.reload();
          }}
        >
          <Image
            src="/App icons/RAVENloading.png"
            alt="RAVEN"
            width={60}
            height={24}
            className="object-contain"
          />
        </div>

        {/* Navigation Menu */}
        <nav className="flex items-center space-x-4">
          {/* Music Player */}
          <button
            onClick={toggleMusic}
            className="w-8 h-8 flex items-center justify-center rounded-lg transition-all hover:bg-white/10"
            title={isPlaying ? 'Pause Music' : 'Play Music'}
          >
            <span className="text-lg text-white font-bold">
              {isPlaying ? '⏸' : '▶'}
            </span>
          </button>

          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleMenuClick(item.id)}
              className={`w-8 h-8 flex items-center justify-center rounded-lg transition-all hover:bg-white/10 ${
                activeMenu === item.id
                  ? 'bg-white/20'
                  : ''
              }`}
              title={item.id.charAt(0).toUpperCase() + item.id.slice(1)}
            >
              <span className="text-lg text-white font-bold">
                {item.icon}
              </span>
            </button>
          ))}
        </nav>

        {/* Hidden Audio Element */}
        <audio
          ref={audioRef}
          preload="auto"
          style={{ display: 'none' }}
        >
          <source src="/Sound.wav" type="audio/wav" />
          Your browser does not support the audio element.
        </audio>
      </div>
    </header>
  );
}