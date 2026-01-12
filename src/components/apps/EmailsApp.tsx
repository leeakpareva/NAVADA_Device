'use client';

import { useOSStore } from '@/stores/osStore';

interface EmailsAppProps {
  windowId?: string;
}

export default function EmailsApp({ windowId }: EmailsAppProps) {
  const { windows, closeWindow } = useOSStore();
  const currentWindow = windows.find(w => w.id === windowId);

  const handleClose = () => {
    if (currentWindow) {
      closeWindow(currentWindow.id);
    }
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      // Show temporary success message
      const button = document.getElementById(`copy-${text}`);
      if (button) {
        button.textContent = 'Copied!';
        setTimeout(() => {
          button.textContent = 'Copy';
        }, 2000);
      }
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="flex flex-col h-full bg-gray-900 text-white">
      {/* Header */}
      <div className="bg-gray-800 p-1 flex items-center justify-between border-b border-gray-700 flex-shrink-0">
        <div className="flex items-center gap-1">
          <svg className="w-4 h-4 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
            <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
            <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
          </svg>
          <span className="text-xs font-bold">Contact Info</span>
        </div>
        <button
          onClick={handleClose}
          className="w-4 h-4 bg-red-600 hover:bg-red-700 rounded-full flex items-center justify-center transition-colors"
        >
          <span className="text-xs font-bold text-white">×</span>
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 p-4 overflow-y-auto">
        <div className="space-y-6">
          <div className="bg-gray-800 rounded-lg p-4">
            <h2 className="text-lg font-bold mb-4 text-blue-400">Contact Information</h2>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-gray-700 rounded">
                <div>
                  <p className="text-sm text-gray-300">Primary Email</p>
                  <p className="text-white font-medium">lee@navada.info</p>
                </div>
                <button
                  id="copy-lee@navada.info"
                  onClick={() => copyToClipboard('lee@navada.info')}
                  className="px-3 py-1 bg-blue-600 hover:bg-blue-700 rounded text-xs transition-colors"
                >
                  Copy
                </button>
              </div>

              <div className="flex items-center justify-between p-3 bg-gray-700 rounded">
                <div>
                  <p className="text-sm text-gray-300">Secondary Email</p>
                  <p className="text-white font-medium">Send2chopstix@gmail.com</p>
                </div>
                <button
                  id="copy-Send2chopstix@gmail.com"
                  onClick={() => copyToClipboard('Send2chopstix@gmail.com')}
                  className="px-3 py-1 bg-blue-600 hover:bg-blue-700 rounded text-xs transition-colors"
                >
                  Copy
                </button>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-4">
            <h2 className="text-lg font-bold mb-3 text-blue-400">Quick Actions</h2>

            <div className="space-y-2">
              <a
                href="mailto:lee@navada.info"
                className="block w-full p-3 bg-gray-700 hover:bg-gray-600 rounded text-center transition-colors"
              >
                Send Email to Primary
              </a>

              <a
                href="mailto:Send2chopstix@gmail.com"
                className="block w-full p-3 bg-gray-700 hover:bg-gray-600 rounded text-center transition-colors"
              >
                Send Email to Secondary
              </a>
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-4">
            <p className="text-gray-400 text-xs text-center">
              For inquiries about NAVADA/RAVEN, please use the contact form in the Join RAVEN section or email us directly.
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-gray-800 p-1 border-t border-gray-600 flex-shrink-0">
        <div className="text-xs text-gray-500 text-center">
          Click emails to copy • Use mailto links to open in your email client
        </div>
      </div>
    </div>
  );
}