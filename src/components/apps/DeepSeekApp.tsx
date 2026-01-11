'use client';

import { useState, useRef, useEffect } from 'react';
import { useOSStore } from '@/stores/osStore';

interface DeepSeekAppProps {
  windowId?: string;
}

interface Message {
  id: string;
  type: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
}

export default function DeepSeekApp({ windowId }: DeepSeekAppProps) {
  const { closeWindow, windows } = useOSStore();
  const currentWindow = windows.find(w => w.appId === 'deepseek');

  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'system',
      content: '🚀 DeepSeek AI Assistant - Advanced coding and reasoning model',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: input.trim(),
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/ai/deepseek', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: input.trim(),
          history: messages.slice(-10)
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to get response from DeepSeek');
      }

      const data = await response.json();

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: data.message || 'I encountered an error processing your request.',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('DeepSeek Error:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'system',
        content: '⚠️ Error: Unable to connect to DeepSeek services',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
      inputRef.current?.focus();
    }
  };

  const handleClose = () => {
    if (currentWindow) {
      closeWindow(currentWindow.id);
    }
  };

  return (
    <div className="h-full w-full bg-black text-blue-400 font-mono flex flex-col">
      {/* Header */}
      <div className="bg-gray-900 p-1 border-b border-blue-600 flex-shrink-0">
        <div className="flex items-center justify-between">
          <span className="text-blue-400 font-bold text-xs">🚀 DeepSeek AI - Advanced Reasoning</span>
          <button
            onClick={handleClose}
            className="text-red-400 hover:text-red-300 font-bold text-xs px-2 cursor-pointer"
            title="Close"
          >
            ✕
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto custom-scrollbar p-2 space-y-1">
        {messages.map((message) => (
          <div key={message.id} className="flex flex-col">
            <div className="flex items-center gap-1 text-xs">
              <span className="text-blue-500">
                [{message.timestamp.toLocaleTimeString()}]
              </span>
              <span className={`font-bold ${
                message.type === 'user'
                  ? 'text-cyan-400'
                  : message.type === 'assistant'
                  ? 'text-blue-400'
                  : 'text-yellow-400'
              }`}>
                {message.type === 'user' ? 'USER' : message.type === 'assistant' ? 'DEEPSEEK' : 'SYSTEM'}:
              </span>
            </div>
            <div className={`text-xs leading-relaxed ml-2 ${
              message.type === 'user'
                ? 'text-cyan-300'
                : message.type === 'assistant'
                ? 'text-blue-300'
                : 'text-yellow-300'
            }`}>
              <pre className="whitespace-pre-wrap font-mono">{message.content}</pre>
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex items-center gap-1 text-xs">
            <span className="text-blue-500">[{new Date().toLocaleTimeString()}]</span>
            <span className="text-blue-400 font-bold">DEEPSEEK:</span>
            <span className="text-blue-300 animate-pulse">Thinking...</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <form onSubmit={handleSubmit} className="border-t border-blue-700 p-1 flex-shrink-0">
        <div className="flex items-center gap-1">
          <span className="text-blue-400 text-xs">{'>'}</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask DeepSeek about coding, math, or complex reasoning..."
            className="flex-1 bg-transparent text-blue-400 text-xs outline-none placeholder-blue-700"
            disabled={isLoading}
            autoFocus
          />
        </div>
      </form>
    </div>
  );
}