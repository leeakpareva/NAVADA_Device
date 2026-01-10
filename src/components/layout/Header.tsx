'use client';

import { useState } from 'react';

interface HeaderProps {
  onNavigate: (page: string) => void;
}

export default function Header({ onNavigate }: HeaderProps) {
  const [activeMenu, setActiveMenu] = useState('');

  const menuItems = [
    { id: 'about', label: 'About' },
    { id: 'designs', label: 'Designs' },
    { id: 'specification', label: 'Specification' },
    { id: 'signup', label: 'Signup' }
  ];

  const handleMenuClick = (menuId: string) => {
    setActiveMenu(menuId);
    onNavigate(menuId);
  };

  return (
    <header className="w-full bg-black border-b border-gray-800 px-4 py-2">
      <div className="flex items-center justify-between max-w-6xl mx-auto">
        {/* Logo */}
        <div
          className="flex items-center space-x-2 cursor-pointer"
          onClick={() => onNavigate('home')}
        >
          <span className="text-red-500 text-xl font-bold">🍓</span>
          <h1 className="text-white text-xl font-bold">NAVADA</h1>
        </div>

        {/* Navigation Menu */}
        <nav className="flex items-center space-x-6">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleMenuClick(item.id)}
              className={`text-sm font-medium transition-colors hover:text-red-400 ${
                activeMenu === item.id
                  ? 'text-red-500'
                  : 'text-gray-300'
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
}