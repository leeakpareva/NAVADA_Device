'use client';

import { useState, useRef } from 'react';

export default function YouTubeApp() {
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const [videoId, setVideoId] = useState<string | null>(null);
  const [isValidUrl, setIsValidUrl] = useState(false);
  const [error, setError] = useState('');
  const [showMenu, setShowMenu] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Extract YouTube video ID from URL
  const extractVideoId = (url: string): string | null => {
    const patterns = [
      /(?:youtube\.com\/watch\?v=)([^&\n?#]+)/,
      /(?:youtube\.com\/embed\/)([^&\n?#]+)/,
      /(?:youtube\.com\/v\/)([^&\n?#]+)/,
      /(?:youtu\.be\/)([^&\n?#]+)/,
      /(?:youtube\.com\/shorts\/)([^&\n?#]+)/
    ];

    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match) return match[1];
    }
    return null;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!youtubeUrl.trim()) {
      setError('Please enter a YouTube URL');
      return;
    }

    const extractedId = extractVideoId(youtubeUrl);
    if (extractedId) {
      setVideoId(extractedId);
      setIsValidUrl(true);
      setError('');
    } else {
      setError('Invalid YouTube URL');
      setIsValidUrl(false);
      setVideoId(null);
    }
  };

  const clearVideo = () => {
    setVideoId(null);
    setIsValidUrl(false);
    setYoutubeUrl('');
    setError('');
  };

  return (
    <div className="h-full w-full bg-black text-white flex flex-col">

      {/* URL Input Bar */}
      {!videoId && (
        <div className="bg-gray-900 p-1 flex-shrink-0">
          <form onSubmit={handleSubmit} className="w-full">
            <div className="flex bg-gray-700 rounded">
              <input
                ref={inputRef}
                type="text"
                value={youtubeUrl}
                onChange={(e) => setYoutubeUrl(e.target.value)}
                placeholder="Paste YouTube URL here..."
                className="flex-1 bg-transparent outline-none text-white text-[7px] px-1 py-1"
              />
              <button
                type="submit"
                className="bg-gray-600 hover:bg-gray-500 px-2 text-[7px] text-white"
              >
                Play
              </button>
            </div>
            {error && (
              <div className="text-[6px] text-red-400 mt-1">{error}</div>
            )}
          </form>
        </div>
      )}

      {/* Clear Video Button - Only when video is playing */}
      {videoId && (
        <div className="bg-gray-900 p-1 flex-shrink-0">
          <button
            onClick={clearVideo}
            className="bg-gray-600 hover:bg-gray-500 px-2 py-1 text-[7px] text-white rounded"
          >
            Clear Video
          </button>
        </div>
      )}

      {/* YouTube Video Player - Full Screen */}
      {videoId ? (
        <div className="flex-1 relative bg-black min-h-0">
          <iframe
            src={`https://www.youtube.com/embed/${videoId}?autoplay=0&rel=0&modestbranding=1&showinfo=0&controls=1&disablekb=1&fs=0&iv_load_policy=3&origin=${typeof window !== 'undefined' ? window.location.origin : ''}`}
            className="absolute inset-0 w-full h-full"
            style={{
              border: 'none',
              outline: 'none',
              width: '100%',
              height: '100%',
              minWidth: '100%',
              minHeight: '100%'
            }}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            sandbox="allow-scripts allow-same-origin allow-presentation"
            title="YouTube Video Player"
          />
        </div>
      ) : (
        <div className="flex-1 flex items-center justify-center bg-gray-900">
          <div className="text-[8px] text-gray-400">
            Enter YouTube URL above to start watching
          </div>
        </div>
      )}
    </div>
  );
}