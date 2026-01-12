'use client';

interface LoadingSpinnerProps {
  size?: 'small' | 'medium' | 'large';
  className?: string;
  showText?: boolean;
  text?: string;
}

export default function LoadingSpinner({
  size = 'medium',
  className = '',
  showText = false,
  text = 'Loading...'
}: LoadingSpinnerProps) {
  const getSizeClasses = () => {
    switch (size) {
      case 'small':
        return 'w-4 h-4';
      case 'large':
        return 'w-12 h-12';
      case 'medium':
      default:
        return 'w-8 h-8';
    }
  };

  const getInnerSize = () => {
    switch (size) {
      case 'small':
        return 'inset-0.5';
      case 'large':
        return 'inset-2';
      case 'medium':
      default:
        return 'inset-1';
    }
  };

  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      {/* Round spinner with dual rings - same as BootLoader */}
      <div className={`relative ${getSizeClasses()}`}>
        <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-white animate-spin"></div>
        <div
          className={`absolute ${getInnerSize()} rounded-full border-2 border-transparent border-t-gray-400 animate-spin`}
          style={{
            animationDirection: 'reverse',
            animationDuration: '1.5s'
          }}
        ></div>
      </div>

      {showText && (
        <p className="mt-3 text-white text-sm animate-pulse">
          {text}
        </p>
      )}
    </div>
  );
}