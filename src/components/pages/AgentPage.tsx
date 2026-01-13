'use client';

import { useState, useEffect, useRef } from 'react';

export default function AgentPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [currentLine, setCurrentLine] = useState(0);
  const [showRaven, setShowRaven] = useState(false);
  const [showEnterButton, setShowEnterButton] = useState(false);
  const [ravenHover, setRavenHover] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const terminalRef = useRef<HTMLDivElement>(null);

  // Check if mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const terminalLines = [
    { text: '> Initializing RAVEN Terminal...', delay: 100 },
    { text: '> Real-time AI Visual English Notation App', delay: 200 },
    { text: '> Powered by Claude Sonnet 3.5', delay: 150 },
    { text: '', delay: 50 },
    { text: '> Loading system modules...', delay: 300 },
    { text: '  [OK] Core system initialized', delay: 150 },
    { text: '  [OK] Language processing engine loaded', delay: 200 },
    { text: '  [OK] Neural network connected', delay: 150 },
    { text: '', delay: 50 },
    { text: '> Downloading RAVEN terminal code...', delay: 300 },
    { text: '  Fetching natural_language_parser.js... [####------] 40%', delay: 200 },
    { text: '  Fetching natural_language_parser.js... [########--] 80%', delay: 200 },
    { text: '  Fetching natural_language_parser.js... [##########] 100% ✓', delay: 150 },
    { text: '  Fetching code_generator.py... [####------] 40%', delay: 200 },
    { text: '  Fetching code_generator.py... [########--] 80%', delay: 200 },
    { text: '  Fetching code_generator.py... [##########] 100% ✓', delay: 150 },
    { text: '  Fetching ai_bridge.wasm... [####------] 40%', delay: 200 },
    { text: '  Fetching ai_bridge.wasm... [########--] 80%', delay: 200 },
    { text: '  Fetching ai_bridge.wasm... [##########] 100% ✓', delay: 150 },
    { text: '', delay: 50 },
    { text: '> Compiling RAVEN modules...', delay: 300 },
    { text: '  Building learning interface... Done', delay: 250 },
    { text: '  Bridging natural language to code... Done', delay: 250 },
    { text: '  Establishing Claude connection... Done', delay: 250 },
    { text: '', delay: 100 },
    { text: '> System ready.', delay: 200 },
    { text: '> Launching RAVEN Terminal...', delay: 300 },
  ];

  const ravenAscii = `
 ██████╗  █████╗ ██╗   ██╗███████╗███╗   ██╗
 ██╔══██╗██╔══██╗██║   ██║██╔════╝████╗  ██║
 ██████╔╝███████║██║   ██║█████╗  ██╔██╗ ██║
 ██╔══██╗██╔══██║╚██╗ ██╔╝██╔══╝  ██║╚██╗██║
 ██║  ██║██║  ██║ ╚████╔╝ ███████╗██║ ╚████║
 ╚═╝  ╚═╝╚═╝  ╚═╝  ╚═══╝  ╚══════╝╚═╝  ╚═══╝

 TERMINAL v1.0.0 - Real-time AI Visual English Notation`;

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    if (currentLine < terminalLines.length) {
      timeoutId = setTimeout(() => {
        setCurrentLine(currentLine + 1);
        // Auto-scroll to bottom as new lines appear
        if (terminalRef.current) {
          terminalRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
        }
      }, terminalLines[currentLine].delay);
    } else if (!showRaven) {
      timeoutId = setTimeout(() => {
        setShowRaven(true);
        // Scroll to show RAVEN ASCII art
        setTimeout(() => {
          if (terminalRef.current) {
            terminalRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
          }
        }, 100);
      }, 500);
    } else if (!showEnterButton) {
      timeoutId = setTimeout(() => {
        setShowEnterButton(true);
        setIsLoading(false);
        // Scroll to show Enter button
        setTimeout(() => {
          if (terminalRef.current) {
            terminalRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
          }
        }, 100);
      }, 800);
    }

    return () => clearTimeout(timeoutId);
  }, [currentLine, showRaven, showEnterButton]);

  const handleEnter = () => {
    window.open('https://claude.ai/public/artifacts/87664f14-b36e-4c20-b568-46249bed9bce', '_blank');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && showEnterButton) {
      handleEnter();
    }
  };

  // Mobile fallback
  if (isMobile) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center p-4">
        <div className="text-center max-w-md">
          <div className="text-6xl mb-6">🖥️</div>
          <h1 className="text-2xl font-bold mb-4">Desktop Only Feature</h1>
          <p className="text-gray-400 mb-6">
            The RAVEN Terminal Agent is only available on desktop devices for optimal experience.
          </p>
          <p className="text-gray-500 text-sm">
            Please access this page from a desktop or laptop computer.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      className="h-screen bg-black text-green-400 font-mono overflow-hidden"
      onKeyPress={handleKeyPress}
      tabIndex={0}
    >
      {/* Main scrollable container */}
      <div className="h-full overflow-y-auto p-4">
        <div className="max-w-4xl mx-auto pt-8 pb-8">
          {/* Terminal window */}
          <div className="bg-gray-900 rounded-lg border border-gray-700 shadow-2xl">
            {/* Terminal header */}
            <div className="bg-gray-800 px-4 py-2 flex items-center space-x-2 border-b border-gray-700">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <span className="ml-4 text-gray-400 text-sm">RAVEN Terminal</span>
            </div>

            {/* Terminal content */}
            <div className="p-6 min-h-[600px]">
            {/* Loading sequence */}
            <div className="space-y-1">
              {terminalLines.slice(0, currentLine).map((line, index) => (
                <div
                  key={index}
                  className={`${line.text.startsWith('>') ? 'text-green-400' : 'text-gray-300'} ${
                    line.text.includes('[OK]') ? 'text-green-500' : ''
                  } ${line.text.includes('✓') ? 'text-green-400' : ''}`}
                  style={{ animation: 'fadeIn 0.3s ease-in' }}
                >
                  {line.text}
                </div>
              ))}
              {currentLine < terminalLines.length && (
                <span className="inline-block w-2 h-4 bg-green-400 animate-pulse"></span>
              )}
            </div>

            {/* RAVEN ASCII Art */}
            {showRaven && (
              <div className="mt-8 flex flex-col items-center" ref={terminalRef}>
                <div
                  className="relative cursor-pointer transition-transform duration-300 hover:scale-105"
                  onMouseEnter={() => setRavenHover(true)}
                  onMouseLeave={() => setRavenHover(false)}
                >
                  <pre
                    className={`text-xs sm:text-sm animate-fadeIn transition-all duration-300 ${
                      ravenHover ? 'text-cyan-400 drop-shadow-glow' : 'text-green-500'
                    }`}
                  >
                    {ravenAscii}
                  </pre>
                  {ravenHover && (
                    <div className="absolute inset-0 pointer-events-none">
                      <div className="animate-pulse-slow opacity-30 bg-gradient-radial from-green-400 to-transparent"></div>
                    </div>
                  )}
                </div>

                {showEnterButton && (
                  <div className="mt-8 flex flex-col items-center animate-fadeIn">
                    <p className="text-gray-400 mb-4 animate-pulse-slow">
                      Bridging natural language and programming code
                    </p>
                    <button
                      onClick={handleEnter}
                      className="relative px-8 py-3 bg-green-600 hover:bg-green-500 text-black font-bold rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg group"
                    >
                      <span className="relative z-10">[ PRESS ENTER TO LAUNCH ]</span>
                      <div className="absolute inset-0 bg-green-400 rounded-lg blur-md opacity-50 group-hover:opacity-75 animate-pulse"></div>
                    </button>
                    <p className="text-gray-500 text-sm mt-3">
                      or click the button above
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Scroll Indicator */}
        {isLoading && currentLine > 10 && (
          <div className="fixed bottom-4 right-4 animate-bounce">
            <div className="bg-green-600 bg-opacity-20 border border-green-400 rounded-full p-2 backdrop-blur-sm">
              <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </div>
          </div>
        )}
      </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-5px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes pulseSlow {
          0%, 100% {
            opacity: 0.8;
          }
          50% {
            opacity: 1;
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.5s ease-in;
        }

        .animate-pulse-slow {
          animation: pulseSlow 2s ease-in-out infinite;
        }

        .drop-shadow-glow {
          filter: drop-shadow(0 0 10px currentColor);
        }

        /* Custom scrollbar for terminal */
        div::-webkit-scrollbar {
          width: 12px;
        }

        div::-webkit-scrollbar-track {
          background: rgba(26, 26, 26, 0.8);
          border-radius: 6px;
          margin: 10px 0;
        }

        div::-webkit-scrollbar-thumb {
          background: #22c55e;
          border-radius: 6px;
          border: 2px solid rgba(0, 0, 0, 0.3);
        }

        div::-webkit-scrollbar-thumb:hover {
          background: #16a34a;
          border: 2px solid rgba(0, 0, 0, 0.5);
        }

        /* Firefox scrollbar */
        * {
          scrollbar-width: thin;
          scrollbar-color: #22c55e #1a1a1a;
        }
      `}</style>
    </div>
  );
}