'use client';

import { useState, useEffect } from 'react';
import { useOSStore } from '@/stores/osStore';
import type { SignupEntry } from '@/lib/database';

interface EmailsAppProps {
  windowId?: string;
}

export default function EmailsApp({ windowId }: EmailsAppProps) {
  const { windows, closeWindow } = useOSStore();
  const currentWindow = windows.find(w => w.id === windowId);
  const [emails, setEmails] = useState<SignupEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalCount, setTotalCount] = useState(0);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [lockCode, setLockCode] = useState('');

  const fetchEmails = async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch emails list
      const emailsResponse = await fetch('/api/signup?action=list');
      if (!emailsResponse.ok) {
        throw new Error('Failed to fetch emails');
      }
      const emailsData = await emailsResponse.json();

      // Fetch total count
      const countResponse = await fetch('/api/signup?action=count');
      if (!countResponse.ok) {
        throw new Error('Failed to fetch count');
      }
      const countData = await countResponse.json();

      setEmails(emailsData.emails || []);
      setTotalCount(countData.count || 0);
    } catch (err) {
      console.error('Error fetching emails:', err);
      setError('Failed to load email data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isUnlocked) {
      fetchEmails();
    }
  }, [isUnlocked]);

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    if (lockCode === '2222') {
      setIsUnlocked(true);
      setLockCode('');
    } else {
      setError('Invalid lock code');
      setLockCode('');
    }
  };

  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleString();
    } catch {
      return dateString;
    }
  };

  const handleClose = () => {
    if (currentWindow) {
      closeWindow(currentWindow.id);
    }
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const exportEmails = () => {
    const emailList = emails.map(entry => entry.email).join('\n');
    const blob = new Blob([emailList], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `navada-signups-${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  };

  if (!isUnlocked) {
    return (
      <div className="h-full w-full bg-gray-900 text-white font-mono flex flex-col text-xs">
        {/* Header */}
        <div className="bg-gray-800 p-2 border-b border-gray-600 flex-shrink-0">
          <div className="flex items-center justify-between">
            <span className="text-red-400 font-bold">🔒 Email Database - LOCKED</span>
            <button
              onClick={handleClose}
              className="text-red-400 hover:text-red-300 font-bold text-xs px-2 cursor-pointer"
              title="Close"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Lock Screen */}
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="text-4xl mb-4">🔒</div>
            <div className="text-gray-400 mb-4">Enter lock code to access emails</div>
            <form onSubmit={handleUnlock} className="space-y-3">
              <input
                type="password"
                value={lockCode}
                onChange={(e) => setLockCode(e.target.value)}
                placeholder="Lock Code"
                className="bg-gray-800 border border-gray-600 rounded px-3 py-2 text-white text-center text-sm focus:border-green-400 outline-none"
                maxLength={4}
                autoFocus
              />
              {error && (
                <div className="text-red-400 text-xs">{error}</div>
              )}
              <div>
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded text-xs transition-colors"
                  disabled={!lockCode}
                >
                  Unlock
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full w-full bg-gray-900 text-white font-mono flex flex-col text-xs">
      {/* Header */}
      <div className="bg-gray-800 p-2 border-b border-gray-600 flex-shrink-0">
        <div className="flex items-center justify-between">
          <span className="text-green-400 font-bold">📧 Email Database</span>
          <div className="flex items-center gap-2">
            <span className="text-gray-400">Total: {totalCount}</span>
            <button
              onClick={fetchEmails}
              className="px-2 py-1 bg-blue-600 hover:bg-blue-700 rounded text-xs transition-colors"
              disabled={loading}
            >
              🔄
            </button>
            {emails.length > 0 && (
              <button
                onClick={exportEmails}
                className="px-2 py-1 bg-green-600 hover:bg-green-700 rounded text-xs transition-colors"
                title="Export emails as .txt file"
              >
                📥
              </button>
            )}
            <button
              onClick={() => setIsUnlocked(false)}
              className="px-2 py-1 bg-red-600 hover:bg-red-700 rounded text-xs transition-colors"
              title="Lock app"
            >
              🔒
            </button>
            <button
              onClick={handleClose}
              className="text-red-400 hover:text-red-300 font-bold text-xs px-2 cursor-pointer"
              title="Close"
            >
              ✕
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <div className="text-blue-400 mb-2">⏳</div>
              <div className="text-gray-400">Loading emails...</div>
            </div>
          </div>
        ) : error ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <div className="text-red-400 mb-2">⚠️</div>
              <div className="text-gray-400">{error}</div>
              <button
                onClick={fetchEmails}
                className="mt-2 px-2 py-1 bg-blue-600 hover:bg-blue-700 rounded text-xs transition-colors"
              >
                Retry
              </button>
            </div>
          </div>
        ) : emails.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <div className="text-gray-400 mb-2">📭</div>
              <div className="text-gray-400">No emails found</div>
            </div>
          </div>
        ) : (
          <div className="h-full overflow-y-auto">
            {/* Table Header */}
            <div className="sticky top-0 bg-gray-800 border-b border-gray-600 p-2">
              <div className="grid grid-cols-12 gap-2 text-gray-300 font-bold text-xs">
                <div className="col-span-1">#</div>
                <div className="col-span-7">Email</div>
                <div className="col-span-4">Date</div>
              </div>
            </div>

            {/* Email List */}
            <div className="space-y-0">
              {emails.map((entry, index) => (
                <div
                  key={entry.id}
                  className="p-2 border-b border-gray-700 hover:bg-gray-800 transition-colors"
                >
                  <div className="grid grid-cols-12 gap-2 items-center text-xs">
                    <div className="col-span-1 text-gray-500">
                      {emails.length - index}
                    </div>
                    <div className="col-span-7">
                      <button
                        onClick={() => copyToClipboard(entry.email)}
                        className="text-cyan-400 hover:text-cyan-300 transition-colors text-left truncate w-full"
                        title="Click to copy email"
                      >
                        {entry.email}
                      </button>
                    </div>
                    <div className="col-span-4 text-gray-400 text-xs">
                      {formatDate(entry.created_at)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="bg-gray-800 p-1 border-t border-gray-600 flex-shrink-0">
        <div className="text-xs text-gray-500 text-center">
          Click email to copy • Use export button to download all emails
        </div>
      </div>
    </div>
  );
}