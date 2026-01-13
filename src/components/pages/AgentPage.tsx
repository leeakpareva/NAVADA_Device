'use client';

import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import dynamic from 'next/dynamic';

// Dynamic import with no SSR to prevent hydration issues
const RAVENTerminal = dynamic(() => import('../RAVENTerminal'), {
  ssr: false,
  loading: () => (
    <div className="h-screen bg-black flex items-center justify-center">
      <div className="text-green-400 animate-pulse">Loading Terminal...</div>
    </div>
  ),
});

interface AgentPageProps {
  onNavigate?: (page: string) => void;
}

// Move terminal lines outside component to prevent recreation
const TERMINAL_LINES = [
  { text: '> Initializing RAVEN Terminal...', delay: 800 },
  { text: '> Real-time AI Visual English Notation', delay: 600 },
  { text: '> Powered by Claude Sonnet 4.5', delay: 500 },
  { text: '', delay: 300 },
  { text: '> Checking system requirements...', delay: 800 },
  { text: '  [OK] Memory: 8GB available', delay: 400 },
  { text: '  [OK] Storage: 128GB available', delay: 350 },
  { text: '  [OK] Network: Connected', delay: 400 },
  { text: '  [OK] Permissions: Granted', delay: 350 },
  { text: '', delay: 300 },
  { text: '> Loading system modules...', delay: 900 },
  { text: '  [OK] Core system initialized', delay: 450 },
  { text: '  [OK] Language processing engine loaded', delay: 500 },
  { text: '  [OK] Neural network connected', delay: 450 },
  { text: '  [OK] Security protocols enabled', delay: 400 },
  { text: '', delay: 400 },
  { text: '> Downloading RAVEN terminal components...', delay: 1000 },
  { text: '  Fetching natural_language_parser.js... [##--------] 20%', delay: 600 },
  { text: '  Fetching natural_language_parser.js... [####------] 40%', delay: 500 },
  { text: '  Fetching natural_language_parser.js... [######----] 60%', delay: 450 },
  { text: '  Fetching natural_language_parser.js... [########--] 80%', delay: 400 },
  { text: '  Fetching natural_language_parser.js... [##########] 100% ✓', delay: 300 },
  { text: '  Fetching code_generator.py... [##--------] 20%', delay: 550 },
  { text: '  Fetching code_generator.py... [####------] 40%', delay: 450 },
  { text: '  Fetching code_generator.py... [######----] 60%', delay: 400 },
  { text: '  Fetching code_generator.py... [########--] 80%', delay: 350 },
  { text: '  Fetching code_generator.py... [##########] 100% ✓', delay: 300 },
  { text: '  Fetching ai_bridge.wasm... [##--------] 20%', delay: 600 },
  { text: '  Fetching ai_bridge.wasm... [####------] 40%', delay: 500 },
  { text: '  Fetching ai_bridge.wasm... [######----] 60%', delay: 450 },
  { text: '  Fetching ai_bridge.wasm... [########--] 80%', delay: 400 },
  { text: '  Fetching ai_bridge.wasm... [##########] 100% ✓', delay: 300 },
  { text: '  Fetching sentiment_analyzer.dll... [##--------] 20%', delay: 550 },
  { text: '  Fetching sentiment_analyzer.dll... [####------] 40%', delay: 450 },
  { text: '  Fetching sentiment_analyzer.dll... [######----] 60%', delay: 400 },
  { text: '  Fetching sentiment_analyzer.dll... [########--] 80%', delay: 350 },
  { text: '  Fetching sentiment_analyzer.dll... [##########] 100% ✓', delay: 300 },
  { text: '  Fetching visual_recognition.so... [##--------] 20%', delay: 600 },
  { text: '  Fetching visual_recognition.so... [####------] 40%', delay: 500 },
  { text: '  Fetching visual_recognition.so... [######----] 60%', delay: 450 },
  { text: '  Fetching visual_recognition.so... [########--] 80%', delay: 400 },
  { text: '  Fetching visual_recognition.so... [##########] 100% ✓', delay: 350 },
  { text: '', delay: 500 },
  { text: '> Verifying downloaded components...', delay: 800 },
  { text: '  Checking integrity of natural_language_parser.js... ✓', delay: 400 },
  { text: '  Checking integrity of code_generator.py... ✓', delay: 350 },
  { text: '  Checking integrity of ai_bridge.wasm... ✓', delay: 400 },
  { text: '  Checking integrity of sentiment_analyzer.dll... ✓', delay: 350 },
  { text: '  Checking integrity of visual_recognition.so... ✓', delay: 400 },
  { text: '', delay: 400 },
  { text: '> Compiling RAVEN modules...', delay: 900 },
  { text: '  Building learning interface... Done', delay: 600 },
  { text: '  Bridging natural language to code... Done', delay: 550 },
  { text: '  Establishing Claude connection... Done', delay: 600 },
  { text: '  Initializing AI models... Done', delay: 550 },
  { text: '  Loading user preferences... Done', delay: 500 },
  { text: '', delay: 500 },
  { text: '> Running final system checks...', delay: 800 },
  { text: '  Testing natural language processing... ✓', delay: 450 },
  { text: '  Testing code generation... ✓', delay: 400 },
  { text: '  Testing AI bridge connectivity... ✓', delay: 450 },
  { text: '  Testing visual recognition... ✓', delay: 400 },
  { text: '', delay: 600 },
  { text: '> System ready.', delay: 500 },
  { text: '> Launching RAVEN Terminal...', delay: 800 },
];

const RAVEN_ASCII = `
 ██████╗  █████╗ ██╗   ██╗███████╗███╗   ██╗
 ██╔══██╗██╔══██╗██║   ██║██╔════╝████╗  ██║
 ██████╔╝███████║██║   ██║█████╗  ██╔██╗ ██║
 ██╔══██╗██╔══██║╚██╗ ██╔╝██╔══╝  ██║╚██╗██║
 ██║  ██║██║  ██║ ╚████╔╝ ███████╗██║ ╚████║
 ╚═╝  ╚═╝╚═╝  ╚═╝  ╚═══╝  ╚══════╝╚═╝  ╚═══╝

 TERMINAL v1.0.0 - Real-time AI Visual English Notation`;

export default function AgentPage({ onNavigate }: AgentPageProps) {
  // Stable initial state function - prevents re-renders
  const [hasInitialized, setHasInitialized] = useState(false);

  // Initialize state based on session storage - run only once
  const getInitialState = () => {
    if (typeof window === 'undefined') {
      return { loaded: false, line: 0 };
    }
    const loaded = sessionStorage.getItem('raven-terminal-loaded') === 'true';
    return { loaded, line: loaded ? TERMINAL_LINES.length : 0 };
  };

  // Initialize states with lazy initialization to prevent re-renders
  const [currentLine, setCurrentLine] = useState(() => getInitialState().line);
  const [showRaven, setShowRaven] = useState(() => getInitialState().loaded);
  const [showEnterButton, setShowEnterButton] = useState(() => getInitialState().loaded);
  const [ravenHover, setRavenHover] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showTerminal, setShowTerminal] = useState(false);
  const [isAnimating, setIsAnimating] = useState(() => !getInitialState().loaded);

  const terminalRef = useRef<HTMLDivElement>(null);
  const animationTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isInitialMount = useRef(true);

  // One-time initialization effect to prevent re-renders
  useEffect(() => {
    if (isInitialMount.current && !hasInitialized && typeof window !== 'undefined') {
      const initialState = getInitialState();

      // Only update state if it differs from current state
      if (initialState.loaded && currentLine !== initialState.line) {
        setCurrentLine(initialState.line);
        setShowRaven(initialState.loaded);
        setShowEnterButton(initialState.loaded);
        setIsAnimating(false);
      }

      setHasInitialized(true);
      isInitialMount.current = false;
    }
  }, [hasInitialized, currentLine]);

  // Check if mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Animation sequence
  useEffect(() => {
    // Don't animate if already completed or if component was pre-loaded
    if (!isAnimating || !hasInitialized) return;

    // Additional safeguard - if session storage shows loaded, don't animate
    if (typeof window !== 'undefined' && sessionStorage.getItem('raven-terminal-loaded') === 'true') {
      return;
    }

    const runAnimation = () => {
      if (currentLine < TERMINAL_LINES.length) {
        animationTimeoutRef.current = setTimeout(() => {
          setCurrentLine(prev => {
            const next = prev + 1;
            if (terminalRef.current) {
              terminalRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
            }
            return next;
          });
        }, TERMINAL_LINES[currentLine].delay);
      } else if (!showRaven) {
        animationTimeoutRef.current = setTimeout(() => {
          setShowRaven(true);
          if (terminalRef.current) {
            setTimeout(() => {
              terminalRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
            }, 200);
          }
        }, 1200);
      } else if (!showEnterButton) {
        animationTimeoutRef.current = setTimeout(() => {
          setShowEnterButton(true);
          setIsAnimating(false);
          // Save state to session storage only if not already saved
          if (sessionStorage.getItem('raven-terminal-loaded') !== 'true') {
            sessionStorage.setItem('raven-terminal-loaded', 'true');
          }
          if (terminalRef.current) {
            setTimeout(() => {
              terminalRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
            }, 200);
          }
        }, 1500);
      }
    };

    runAnimation();

    // Cleanup
    return () => {
      if (animationTimeoutRef.current) {
        clearTimeout(animationTimeoutRef.current);
      }
    };
  }, [currentLine, showRaven, showEnterButton, isAnimating, hasInitialized]);

  const handleEnter = useCallback(() => {
    setShowTerminal(true);
  }, []);

  const handleKeyPress = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && showEnterButton) {
      handleEnter();
    }
  }, [showEnterButton, handleEnter]);

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

  // Show terminal if launched
  if (showTerminal) {
    return (
      <RAVENTerminal
        onClose={() => setShowTerminal(false)}
      />
    );
  }

  return (
    <div
      className="h-screen bg-black text-green-400 font-mono overflow-hidden"
      onKeyPress={handleKeyPress}
      tabIndex={0}
    >
      <div className="h-full overflow-y-auto p-4">
        <div className="max-w-4xl mx-auto pt-8 pb-8">
          <div className="bg-gray-900 rounded-lg border border-gray-700 shadow-2xl">
            <div className="bg-gray-800 px-4 py-2 flex items-center space-x-2 border-b border-gray-700">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <span className="ml-4 text-gray-400 text-sm">RAVEN Terminal</span>
            </div>

            <div className="p-6 min-h-[600px]">
              <div className="space-y-1">
                {TERMINAL_LINES.slice(0, currentLine).map((line, index) => (
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
                {isAnimating && currentLine < TERMINAL_LINES.length && (
                  <span className="inline-block w-2 h-4 bg-green-400 animate-pulse"></span>
                )}
              </div>

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
                      {RAVEN_ASCII}
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
                        A learning tool designed to bridge the gap between natural language and programming code
                      </p>


                      <button
                        onClick={handleEnter}
                        className="relative px-8 py-3 bg-green-600 hover:bg-green-500 text-black font-bold rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg group"
                      >
                        <span className="relative z-10">[ PRESS ENTER TO LAUNCH ]</span>
                        <div className="absolute inset-0 bg-green-400 rounded-lg blur-md opacity-50 group-hover:opacity-75 animate-pulse"></div>
                      </button>
                      <p className="text-gray-500 text-sm mt-3">or click the button above</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {isAnimating && currentLine > 10 && (
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

        * {
          scrollbar-width: thin;
          scrollbar-color: #22c55e #1a1a1a;
        }
      `}</style>
    </div>
  );
}