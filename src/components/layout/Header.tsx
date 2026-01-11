'use client';

import { useState } from 'react';

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
    <header className="fixed top-0 left-0 w-full bg-transparent backdrop-blur-sm border-b border-gray-800/20 px-4 py-2 z-50">
      <div className="flex items-center justify-between max-w-6xl mx-auto">
        {/* Logo */}
        <div
          className="flex items-center space-x-2 cursor-pointer"
          onClick={() => {
            onNavigate('home');
            window.location.reload();
          }}
        >
          <h1 className="text-white text-xl font-bold">RAVEN</h1>
        </div>

        {/* Navigation Menu */}
        <nav className="flex items-center space-x-4">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleMenuClick(item.id)}
              className={`w-10 h-10 flex items-center justify-center rounded-lg transition-all hover:bg-white/10 ${
                activeMenu === item.id
                  ? 'bg-white/20 shadow-lg'
                  : 'text-gray-300 hover:text-white'
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