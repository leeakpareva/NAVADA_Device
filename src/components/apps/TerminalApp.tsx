'use client';

import { useState, useRef, useEffect } from 'react';

interface CommandHistory {
  command: string;
  output: string;
}

const HELP_TEXT = `
Available commands:
  help      - Show this help message
  about     - About NAVADA OS
  clear     - Clear terminal
  date      - Show current date/time
  echo      - Echo text
  ls        - List files
  cat       - View file contents
  whoami    - Current user
  neofetch  - System info
  matrix    - Enter the matrix
`;

const FILES = {
  'readme.txt': 'Welcome to NAVADA OS - A retro computing experience.',
  'projects.md': '# Projects\n- Spider Robot\n- Helix-Procure\n- NAVADA VC',
  'contact.txt': 'Email: hello@navada.dev\nGitHub: @navada',
};

export default function TerminalApp() {
  const [history, setHistory] = useState<CommandHistory[]>([
    { command: '', output: 'NAVADA Terminal v2.6.1\nType "help" for commands.\n' }
  ]);
  const [input, setInput] = useState('');
  const [commandIndex, setCommandIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [history]);

  const executeCommand = (cmd: string) => {
    const parts = cmd.trim().toLowerCase().split(' ');
    const command = parts[0];
    const args = parts.slice(1);

    let output = '';

    switch (command) {
      case '':
        output = '';
        break;
      case 'help':
        output = HELP_TEXT;
        break;
      case 'about':
        output = 'NAVADA OS - Protocol 26/1\nA retro computing interface\nVersion 2.6.1 (2024)';
        break;
      case 'clear':
        setHistory([]);
        return;
      case 'date':
        output = new Date().toString();
        break;
      case 'echo':
        output = args.join(' ');
        break;
      case 'ls':
        output = Object.keys(FILES).join('\n');
        break;
      case 'cat':
        if (args[0] && FILES[args[0] as keyof typeof FILES]) {
          output = FILES[args[0] as keyof typeof FILES];
        } else {
          output = `cat: ${args[0] || 'no file'}: No such file`;
        }
        break;
      case 'whoami':
        output = 'user@protocol26/1';
        break;
      case 'neofetch':
        output = `
  ██╗  ██╗   OS: NAVADA OS
  ███╗ ██║   Kernel: 2.6.1
  ██╔██╗█║   Shell: navsh
  ██║╚████║   Terminal: CRT-EMU
  ██║ ╚███║   CPU: NAVADA-X1
  ╚═╝  ╚══╝   Memory: 32MB/64MB
`;
        break;
      case 'matrix':
        output = '> Entering the matrix...\n> Follow the white rabbit 🐰';
        break;
      default:
        output = `Command not found: ${command}`;
    }

    setHistory(prev => [...prev, { command: cmd, output }]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    executeCommand(input);
    setInput('');
    setCommandIndex(-1);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    const commands = history.filter(h => h.command).map(h => h.command);
    
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      const newIndex = Math.min(commandIndex + 1, commands.length - 1);
      setCommandIndex(newIndex);
      setInput(commands[commands.length - 1 - newIndex] || '');
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      const newIndex = Math.max(commandIndex - 1, -1);
      setCommandIndex(newIndex);
      setInput(newIndex === -1 ? '' : commands[commands.length - 1 - newIndex] || '');
    }
  };

  return (
    <div
      ref={containerRef}
      className="h-full bg-black font-mono text-[7px] text-green-400 overflow-auto custom-scrollbar leading-none"
      style={{ paddingTop: '0.5mm', paddingBottom: '0.5mm', paddingLeft: '1.2mm', paddingRight: '0.5mm' }}
      onClick={() => inputRef.current?.focus()}
    >
      {history.map((entry, index) => (
        <div key={index} className="mb-0.5">
          {entry.command && (
            <div className="flex">
              <span className="text-cyan-400">pi</span>
              <span className="text-green-400">:</span>
              <span className="text-blue-400">~</span>
              <span className="text-green-400">$ {entry.command}</span>
            </div>
          )}
          {entry.output && (
            <pre className="whitespace-pre-wrap text-green-400/90 text-[7px] leading-none">{entry.output}</pre>
          )}
        </div>
      ))}

      <form onSubmit={handleSubmit} className="flex">
        <span className="text-cyan-400">pi</span>
        <span className="text-green-400">:</span>
        <span className="text-blue-400">~</span>
        <span className="text-green-400">$ </span>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 bg-transparent outline-none text-green-400 caret-green-400 text-[7px]"
          spellCheck={false}
          autoComplete="off"
        />
        <span className="cursor-blink text-green-400">▌</span>
      </form>
    </div>
  );
}
