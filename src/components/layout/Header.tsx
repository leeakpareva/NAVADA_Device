'use client';

import { useState } from 'react';
import Image from 'next/image';

interface HeaderProps {
  onNavigate: (page: string) => void;
}

export default function Header({ onNavigate }: HeaderProps) {
  const [activeMenu, setActiveMenu] = useState('');

  const menuItems = [
    { id: 'about', icon: '?' },
    { id: 'designs', icon: '◈' },
    { id: 'learn', icon: '⊞' },
    { id: 'signup', icon: '+' }
  ];

  const handleMenuClick = (menuId: string) => {
    setActiveMenu(menuId);
    onNavigate(menuId);
  };

  return (
    <header className="fixed top-0 left-0 w-full backdrop-blur-sm border-b border-gray-800/20 px-4 py-2 z-50" style={{ backgroundColor: 'rgba(0, 0, 0, 0)' }}>
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
            width={80}
            height={30}
            className="object-contain"
          />
        </div>

        {/* Navigation Menu */}
        <nav className="flex items-center space-x-4">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleMenuClick(item.id)}
              className={`w-10 h-10 flex items-center justify-center rounded-lg transition-all hover:bg-white/10 ${
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
      </div>
    </header>
  );
}