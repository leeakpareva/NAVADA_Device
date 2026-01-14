import React from 'react';

interface AnimatedBackgroundProps {
  children?: React.ReactNode;
  className?: string;
}

export function AnimatedBackground({ children, className = "" }: AnimatedBackgroundProps) {
  return (
    <div className={`relative ${className}`}>
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-black" />
        <div className="absolute inset-0 bg-gradient-to-br from-green-900/10 via-transparent to-green-900/5 animate-pulse" />
      </div>
      {children}
    </div>
  );
}