'use client';

export default function Footer() {
  return (
    <footer className="fixed bottom-0 left-0 w-full bg-transparent backdrop-blur-sm border-t border-gray-800/20 px-4 py-2 z-50">
      <div className="flex items-center justify-between max-w-6xl mx-auto">
        <div className="text-white text-xs">
          © 2025 NAVADA
        </div>
        <div className="text-gray-300 text-xs">
          v1.0.0
        </div>
      </div>
    </footer>
  );
}