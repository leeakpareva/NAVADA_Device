'use client';

import Image from 'next/image';

interface HomePageProps {
  onEnter: () => void;
}

export default function HomePage({ onEnter }: HomePageProps) {
  return (
    <div
      className="w-full h-full bg-black flex items-center justify-center cursor-pointer relative"
      onClick={onEnter}
    >
      <Image
        src="/App icons/Homepage.png"
        alt="RAVEN OS Homepage"
        fill
        className="object-contain"
        priority
      />

      {/* Click hint overlay */}
      <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 z-10">
        <div className="bg-black/70 backdrop-blur-sm px-2 py-1 rounded text-center animate-pulse">
          <p className="text-white text-xs font-medium">Click to enter</p>
        </div>
      </div>
    </div>
  );
}