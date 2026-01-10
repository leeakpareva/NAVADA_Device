'use client';

import { useState, useRef } from 'react';

export default function YouTubeApp() {
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const [videoId, setVideoId] = useState<string | null>(null);
  const [isValidUrl, setIsValidUrl] = useState(false);
  const [error, setError] = useState('');
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
    <div className="h-full w-full bg-black text-white overflow-auto custom-scrollbar">
      {/* Header with URL Input */}
      <div className="bg-black p-1">
        <div className="flex items-center justify-center mb-1">
          <h1 className="text-[10px] font-bold text-white">📺 YouTube Player</h1>
        </div>

        {/* URL Input */}
        <form onSubmit={handleSubmit} className="w-full">
          <div className="flex bg-gray-800 rounded mb-1">
            <input
              ref={inputRef}
              type="text"
              value={youtubeUrl}
              onChange={(e) => setYoutubeUrl(e.target.value)}
              placeholder="Paste YouTube URL here..."
              className="flex-1 bg-transparent outline-none text-white text-[8px] px-1 py-0.5"
              style={{ fontSize: '8px' }}
            />
            <button
              type="submit"
              className="bg-gray-700 hover:bg-gray-600 px-1 text-[6px] text-white"
            >
              ▶️
            </button>
          </div>

          {/* Error message */}
          {error && (
            <div className="text-[6px] text-gray-200 mb-1">{error}</div>
          )}

          {/* Clear button */}
          {videoId && (
            <button
              onClick={clearVideo}
              className="bg-gray-700 hover:bg-gray-600 text-[6px] text-white px-1 py-0.5 rounded"
            >
              Clear Video
            </button>
          )}
        </form>
      </div>

      {/* YouTube Video Player */}
      {videoId && (
        <div className="p-1">
          <div className="w-full bg-gray-900 rounded overflow-hidden">
            <iframe
              src={`https://www.youtube.com/embed/${videoId}?autoplay=0&rel=0&modestbranding=1`}
              className="w-full aspect-video"
              style={{ height: '60px', minHeight: '60px' }}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title="YouTube Video Player"
            />
          </div>
          <div className="text-[6px] text-gray-400 mt-1 text-center">
            Video ID: {videoId}
          </div>
        </div>
      )}

      {/* Instructions */}
      {!videoId && (
        <div className="p-1">
          <div className="text-[8px] font-medium mb-1 text-gray-300 text-center">
            How to use:
          </div>
          <div className="space-y-1">
            <div className="text-[6px] text-gray-400 text-center">
              1. Copy a YouTube URL
            </div>
            <div className="text-[6px] text-gray-400 text-center">
              2. Paste it in the input above
            </div>
            <div className="text-[6px] text-gray-400 text-center">
              3. Click ▶️ to play
            </div>
          </div>

          <div className="mt-2 text-[6px] text-gray-500 text-center">
            Supports: youtube.com, youtu.be, shorts
          </div>
        </div>
      )}
    </div>
  );
}