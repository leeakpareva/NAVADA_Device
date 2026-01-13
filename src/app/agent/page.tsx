'use client';

import { useEffect } from 'react';

export default function AgentPage() {
  useEffect(() => {
    // Redirect to the Claude artifact URL
    window.location.href = 'https://claude.ai/public/artifacts/385dc733-5fb9-45d3-9405-587058c9a024';
  }, []);

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">Redirecting to AI Agent...</h1>
        <p className="text-gray-400">If you're not redirected automatically, </p>
        <a
          href="https://claude.ai/public/artifacts/385dc733-5fb9-45d3-9405-587058c9a024"
          className="text-blue-400 underline hover:text-blue-300"
        >
          click here
        </a>
      </div>
    </div>
  );
}