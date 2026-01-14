interface LoadingSpinnerProps {
  size?: 'small' | 'medium' | 'large';
  showText?: boolean;
  text?: string;
  className?: string;
}

export default function LoadingSpinner({
  size = 'medium',
  showText = false,
  text = 'Loading...',
  className = ''
}: LoadingSpinnerProps) {
  const sizeClasses = {
    small: 'w-8 h-8 border-2',
    medium: 'w-12 h-12 border-3',
    large: 'w-16 h-16 border-4'
  };

  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <div className="relative">
        <div className={`${sizeClasses[size]} border-gray-700 rounded-full`}></div>
        <div className={`absolute top-0 left-0 ${sizeClasses[size]} border-green-500 rounded-full border-t-transparent animate-spin`}></div>
      </div>
      {showText && (
        <p className="mt-3 text-sm text-gray-400 animate-pulse">{text}</p>
      )}
    </div>
  );
}