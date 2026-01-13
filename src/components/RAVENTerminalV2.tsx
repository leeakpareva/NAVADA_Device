'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import dynamic from 'next/dynamic';

// Types
interface RAVENTerminalV2Props {
  onClose?: () => void;
}

// Custom theme for syntax highlighting
const customTheme = {
  ...vscDarkPlus,
  'pre[class*="language-"]': {
    ...vscDarkPlus['pre[class*="language-"]'],
    background: 'rgba(10, 10, 10, 0.95)',
    padding: '20px',
    fontSize: '14px',
    lineHeight: '1.6',
    borderRadius: '8px',
    border: '1px solid #333',
    boxShadow: 'inset 0 0 20px rgba(0, 255, 0, 0.05)',
  },
  'code[class*="language-"]': {
    ...vscDarkPlus['code[class*="language-"]'],
    fontFamily: '"Fira Code", "Cascadia Code", Monaco, monospace',
  }
};

// Enhanced Color Palette
const colors = {
  bg: '#000000',
  panelBg: '#0a0a0a',
  outputBg: '#050505',
  border: '#222222',
  primary: '#ffffff',
  secondary: '#a0a0a0',
  muted: '#606060',
  success: '#00ff00',
  error: '#ff0000',
  warning: '#ffaa00',
  info: '#00aaff',
  streaming: '#00ff88',
};

// SVG Icons
const Icons = {
  stream: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  ),
  python: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 2L2 7v10c0 5.5 3.9 10.7 10 12 6.1-1.3 10-6.5 10-12V7l-10-5z" />
    </svg>
  ),
};

// Pyodide WebAssembly Python runtime
let pyodideInstance: any = null;

const loadPyodide = async () => {
  if (typeof window === 'undefined') return null;

  if (pyodideInstance) return pyodideInstance;

  try {
    // Dynamically import Pyodide
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/pyodide/v0.24.1/full/pyodide.js';
    document.head.appendChild(script);

    await new Promise((resolve) => {
      script.onload = resolve;
    });

    // @ts-ignore
    pyodideInstance = await window.loadPyodide({
      indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.24.1/full/',
    });

    // Load useful packages
    await pyodideInstance.loadPackage(['numpy', 'matplotlib', 'pandas']);

    return pyodideInstance;
  } catch (error) {
    console.error('Failed to load Pyodide:', error);
    return null;
  }
};

export default function RAVENTerminalV2({ onClose }: RAVENTerminalV2Props) {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);
  const [language, setLanguage] = useState('python');
  const [mode, setMode] = useState('generate');
  const [pyodide, setPyodide] = useState<any>(null);
  const [isPyodideLoading, setIsPyodideLoading] = useState(false);
  const outputRef = useRef<HTMLDivElement>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  // Load Pyodide on mount
  useEffect(() => {
    const initPyodide = async () => {
      setIsPyodideLoading(true);
      const instance = await loadPyodide();
      setPyodide(instance);
      setIsPyodideLoading(false);
    };
    initPyodide();
  }, []);

  // Run Python code locally using WebAssembly
  const runPythonCode = async (code: string) => {
    if (!pyodide) {
      return 'Python runtime is loading...';
    }

    try {
      // Redirect Python output to capture it
      pyodide.runPython(`
        import sys
        from io import StringIO
        sys.stdout = StringIO()
      `);

      // Run the user's code
      pyodide.runPython(code);

      // Get the output
      const output = pyodide.runPython('sys.stdout.getvalue()');

      return output || 'Code executed successfully (no output)';
    } catch (error: any) {
      return `Error: ${error.message}`;
    }
  };

  // Stream AI response with real-time updates
  const streamAIResponse = async (message: string) => {
    if (isStreaming) return;

    setIsStreaming(true);
    setOutput('');

    // Create abort controller for cancellation
    abortControllerRef.current = new AbortController();

    try {
      const response = await fetch('/api/ai/python/stream', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message,
          history: []
        }),
        signal: abortControllerRef.current.signal,
      });

      if (!response.ok) {
        throw new Error('Failed to get AI response');
      }

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();

      if (!reader) {
        throw new Error('No response body');
      }

      let accumulatedText = '';

      while (true) {
        const { done, value } = await reader.read();

        if (done) break;

        const chunk = decoder.decode(value);
        const lines = chunk.split('\n');

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const data = line.slice(6);

            if (data === '[DONE]') {
              setIsStreaming(false);
              return;
            }

            try {
              const parsed = JSON.parse(data);
              accumulatedText += parsed.text;
              setOutput(accumulatedText);

              // Auto-scroll to bottom
              if (outputRef.current) {
                outputRef.current.scrollTop = outputRef.current.scrollHeight;
              }
            } catch (e) {
              // Skip invalid JSON
            }
          }
        }
      }
    } catch (error: any) {
      if (error.name === 'AbortError') {
        console.log('Stream aborted');
      } else {
        console.error('Streaming error:', error);
        setOutput(`Error: ${error.message}`);
      }
    } finally {
      setIsStreaming(false);
      abortControllerRef.current = null;
    }
  };

  // Stop streaming
  const stopStreaming = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      setIsStreaming(false);
    }
  };

  // Handle input submission
  const handleSubmit = async () => {
    if (!input.trim()) return;

    if (mode === 'execute') {
      // Execute Python code locally
      const result = await runPythonCode(input);
      setOutput(result);
    } else {
      // Stream AI response
      await streamAIResponse(`${mode}: ${input} in ${language}`);
    }
  };

  // Parse and render output with syntax highlighting
  const renderOutput = () => {
    if (!output) {
      return (
        <div style={{ color: colors.muted, fontStyle: 'italic', padding: '20px' }}>
          // AI output will appear here...
        </div>
      );
    }

    const lines = output.split('\n');
    let inCodeBlock = false;
    let codeBuffer: string[] = [];
    let codeLanguage = 'python';
    const elements: JSX.Element[] = [];

    lines.forEach((line, index) => {
      // Code block detection
      if (line.startsWith('```')) {
        if (!inCodeBlock) {
          inCodeBlock = true;
          const langMatch = line.match(/```(\w+)/);
          codeLanguage = langMatch?.[1] || language;
        } else {
          // End of code block - render with react-syntax-highlighter
          inCodeBlock = false;
          if (codeBuffer.length > 0) {
            elements.push(
              <div key={`code-${index}`} style={{ margin: '16px 0' }}>
                <div style={{
                  fontSize: '11px',
                  color: colors.muted,
                  marginBottom: '8px',
                  textTransform: 'uppercase',
                  letterSpacing: '1px'
                }}>
                  {codeLanguage} code:
                </div>
                <SyntaxHighlighter
                  language={codeLanguage}
                  style={customTheme}
                  showLineNumbers
                  wrapLines
                  lineProps={(lineNumber) => ({
                    style: {
                      display: 'flex',
                      alignItems: 'center',
                      backgroundColor: lineNumber % 2 === 0 ? 'rgba(255, 255, 255, 0.01)' : 'transparent'
                    }
                  })}
                >
                  {codeBuffer.join('\n')}
                </SyntaxHighlighter>
              </div>
            );
            codeBuffer = [];
          }
        }
      } else if (inCodeBlock) {
        codeBuffer.push(line);
      } else if (line.match(/^[🎯💻🔍🌍💡📋🔴✅]/)) {
        // Section headers with emojis
        elements.push(
          <div key={`header-${index}`} style={{
            fontSize: '16px',
            fontWeight: 'bold',
            color: colors.success,
            marginTop: '24px',
            marginBottom: '12px',
            padding: '10px 16px',
            borderLeft: `4px solid ${colors.success}`,
            background: `linear-gradient(90deg, ${colors.success}20, transparent)`
          }}>
            {line}
          </div>
        );
      } else if (line.match(/^(WHAT|HOW|WHY):/)) {
        // Special comment highlighting
        const [label, ...rest] = line.split(':');
        elements.push(
          <div key={`comment-${index}`} style={{
            padding: '8px 16px',
            margin: '8px 0',
            background: 'rgba(255, 170, 0, 0.1)',
            borderLeft: `3px solid ${colors.warning}`,
            borderRadius: '0 4px 4px 0'
          }}>
            <span style={{
              color: '#ff00ff',
              fontWeight: 'bold',
              textShadow: '0 0 3px #ff00ff'
            }}>
              {label}:
            </span>
            <span style={{ color: colors.primary, marginLeft: '8px' }}>
              {rest.join(':')}
            </span>
          </div>
        );
      } else {
        // Regular text
        elements.push(
          <div key={`text-${index}`} style={{
            color: colors.primary,
            lineHeight: '1.6',
            padding: '4px 0'
          }}>
            {line}
          </div>
        );
      }
    });

    // Handle remaining code buffer if still in code block
    if (inCodeBlock && codeBuffer.length > 0) {
      elements.push(
        <div key="code-final" style={{ margin: '16px 0' }}>
          <SyntaxHighlighter
            language={codeLanguage}
            style={customTheme}
            showLineNumbers
          >
            {codeBuffer.join('\n')}
          </SyntaxHighlighter>
        </div>
      );
    }

    return elements;
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: colors.bg,
      color: colors.primary,
      fontFamily: '"Fira Code", monospace',
      display: 'flex',
      flexDirection: 'column',
      zIndex: 9999
    }}>
      {/* Header */}
      <div style={{
        background: colors.panelBg,
        borderBottom: `1px solid ${colors.border}`,
        padding: '16px 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: colors.success }}>
            RAVEN Terminal v2.0
          </h2>
          {isPyodideLoading && (
            <span style={{ color: colors.warning, fontSize: '12px' }}>
              Loading Python WebAssembly...
            </span>
          )}
          {pyodide && !isPyodideLoading && (
            <span style={{ color: colors.success, fontSize: '12px' }}>
              ✓ Python Runtime Ready
            </span>
          )}
          {isStreaming && (
            <span style={{
              color: colors.streaming,
              fontSize: '12px',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}>
              {Icons.stream} Streaming...
            </span>
          )}
        </div>
        <button
          onClick={onClose}
          style={{
            background: 'transparent',
            border: `1px solid ${colors.border}`,
            color: colors.primary,
            padding: '8px 16px',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Close
        </button>
      </div>

      {/* Controls */}
      <div style={{
        background: colors.panelBg,
        padding: '16px 24px',
        borderBottom: `1px solid ${colors.border}`,
        display: 'flex',
        gap: '12px',
        flexWrap: 'wrap'
      }}>
        <select
          value={mode}
          onChange={(e) => setMode(e.target.value)}
          style={{
            background: colors.outputBg,
            color: colors.primary,
            border: `1px solid ${colors.border}`,
            padding: '8px 12px',
            borderRadius: '4px'
          }}
        >
          <option value="generate">Generate Code</option>
          <option value="explain">Explain Code</option>
          <option value="debug">Debug Code</option>
          <option value="optimize">Optimize Code</option>
          <option value="execute">Execute Python (Local)</option>
        </select>

        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          style={{
            background: colors.outputBg,
            color: colors.primary,
            border: `1px solid ${colors.border}`,
            padding: '8px 12px',
            borderRadius: '4px'
          }}
        >
          <option value="python">Python</option>
          <option value="javascript">JavaScript</option>
          <option value="typescript">TypeScript</option>
          <option value="java">Java</option>
          <option value="cpp">C++</option>
        </select>
      </div>

      {/* Output Area */}
      <div
        ref={outputRef}
        style={{
          flex: 1,
          overflow: 'auto',
          background: colors.outputBg,
          padding: '24px',
          fontFamily: 'monospace'
        }}
      >
        {renderOutput()}
      </div>

      {/* Input Area */}
      <div style={{
        background: colors.panelBg,
        borderTop: `1px solid ${colors.border}`,
        padding: '16px 24px'
      }}>
        <div style={{ display: 'flex', gap: '12px' }}>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && e.ctrlKey) {
                e.preventDefault();
                handleSubmit();
              }
            }}
            placeholder={mode === 'execute' ? 'Enter Python code to execute locally...' : 'Enter your request...'}
            style={{
              flex: 1,
              background: colors.outputBg,
              color: colors.primary,
              border: `1px solid ${colors.border}`,
              borderRadius: '4px',
              padding: '12px',
              resize: 'vertical',
              minHeight: '80px',
              fontFamily: '"Fira Code", monospace',
              fontSize: '14px'
            }}
          />
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <button
              onClick={isStreaming ? stopStreaming : handleSubmit}
              style={{
                background: isStreaming ? colors.error : colors.success,
                color: colors.bg,
                border: 'none',
                padding: '12px 24px',
                borderRadius: '4px',
                cursor: 'pointer',
                fontWeight: 'bold',
                fontSize: '14px'
              }}
            >
              {isStreaming ? 'Stop' : 'Run'} (Ctrl+Enter)
            </button>
            <button
              onClick={() => {
                setInput('');
                setOutput('');
              }}
              style={{
                background: colors.outputBg,
                color: colors.primary,
                border: `1px solid ${colors.border}`,
                padding: '8px 16px',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '12px'
              }}
            >
              Clear
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}