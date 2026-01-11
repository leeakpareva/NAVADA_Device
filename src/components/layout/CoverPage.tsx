'use client';

import Image from 'next/image';

interface CoverPageProps {
  onContinue: () => void;
}

export default function CoverPage({ onContinue }: CoverPageProps) {
  return (
    <div
      className="fixed inset-0 bg-black flex items-center justify-center cursor-pointer z-[9999]"
      onClick={onContinue}
    >
      <Image
        src="/App icons/Coverpage.png"
        alt="RAVEN OS"
        width={320}
        height={480}
        className="object-contain w-full h-full"
        priority
      />
    </div>
  );
}