'use client';

import { useState, useEffect } from 'react';

interface PasscodeAuthProps {
  onAuthenticated: () => void;
}

export default function PasscodeAuth({ onAuthenticated }: PasscodeAuthProps) {
  const [passcode, setPasscode] = useState('');
  const [error, setError] = useState('');

  const CORRECT_PASSCODE = '2222';

  const handlePasscodeSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (passcode === CORRECT_PASSCODE) {
      localStorage.setItem('navada-authenticated', 'true');
      onAuthenticated();
    } else {
      setError('Invalid passcode');
      setPasscode('');
      setTimeout(() => setError(''), 2000);
    }
  };

  const handlePasscodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Only allow numbers and limit to 4 digits
    if (/^\d{0,4}$/.test(value)) {
      setPasscode(value);
      setError('');
    }
  };

  return (
    <div className="h-full w-full bg-black flex flex-col items-center justify-center text-white p-1">
      {/* Lock Icon - Smaller */}
      <div className="mb-1">
        <div className="w-3 h-3 rounded-full bg-white bg-opacity-10 backdrop-blur-md border border-white border-opacity-30 flex items-center justify-center mb-1 mx-auto">
          <span className="text-[10px]">🔒</span>
        </div>
        <h1 className="text-[10px] font-bold text-center mb-0.5 text-white drop-shadow-lg">NAVADA OS</h1>
        <p className="text-gray-200 text-center drop-shadow-md text-[8px]">Enter passcode</p>
      </div>

      {/* Passcode Dots - Smaller */}
      <div className="flex space-x-1 mb-1">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className={`w-0.5 h-0.5 rounded-full backdrop-blur-md transition-all duration-300 ${
              i <= passcode.length
                ? 'bg-white bg-opacity-80 border border-white shadow-lg'
                : 'bg-white bg-opacity-10 border border-white border-opacity-30'
            }`}
          />
        ))}
      </div>

      {/* Error Message */}
      {error && (
        <p className="text-red-400 text-[7px] mb-0.5 text-center drop-shadow-md">{error}</p>
      )}

      {/* Smaller Round Glass Number Buttons */}
      <div className="grid grid-cols-3 gap-0.5">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, null, 0, 'del'].map((item, index) => {
          if (item === null) return <div key={index}></div>;

          if (item === 'del') {
            return (
              <button
                key={index}
                onClick={() => setPasscode(prev => prev.slice(0, -1))}
                disabled={passcode.length === 0}
                className="w-5 h-5 rounded-full bg-white bg-opacity-10 backdrop-blur-md border border-white border-opacity-30 hover:bg-opacity-20 hover:border-opacity-50 transition-all duration-300 text-white disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center shadow-lg"
              >
                <span className="text-[6px]">⌫</span>
              </button>
            );
          }

          return (
            <button
              key={index}
              onClick={() => {
                if (passcode.length < 4) {
                  const newPasscode = passcode + item.toString();
                  setPasscode(newPasscode);
                  if (newPasscode.length === 4) {
                    if (newPasscode === CORRECT_PASSCODE) {
                      setTimeout(() => {
                        localStorage.setItem('navada-authenticated', 'true');
                        onAuthenticated();
                      }, 200);
                    } else {
                      setTimeout(() => {
                        setError('Wrong passcode!');
                        setPasscode('');
                        setTimeout(() => setError(''), 2000);
                      }, 200);
                    }
                  }
                }
              }}
              className="w-5 h-5 rounded-full bg-white bg-opacity-10 backdrop-blur-md border border-white border-opacity-30 hover:bg-opacity-20 hover:border-opacity-50 transition-all duration-300 text-xs font-bold text-white shadow-lg"
            >
              {item}
            </button>
          );
        })}
      </div>

    </div>
  );
}