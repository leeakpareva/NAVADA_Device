'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

// Custom syntax highlighter theme
const customSyntaxTheme = {
  ...atomDark,
  'pre[class*="language-"]': {
    ...atomDark['pre[class*="language-"]'],
    background: 'rgba(10, 10, 10, 0.95)',
    padding: '16px',
    fontSize: '14px',
    lineHeight: '1.6',
    borderRadius: '4px',
    border: '1px solid #333',
    boxShadow: 'inset 0 0 20px rgba(0, 255, 0, 0.05)',
    margin: '0',
  },
  'code[class*="language-"]': {
    ...atomDark['code[class*="language-"]'],
    fontFamily: '"Fira Code", "Cascadia Code", Monaco, monospace',
    textShadow: 'none',
  },
  // Enhance specific token colors
  'token.keyword': {
    color: '#ff006a',
    fontWeight: 'bold',
  },
  'token.string': {
    color: '#00ffaa',
  },
  'token.number': {
    color: '#ffaa00',
  },
  'token.comment': {
    color: '#ffff00',
    fontStyle: 'italic',
  },
  'token.function': {
    color: '#00ff00',
  },
  'token.class-name': {
    color: '#88ff00',
  },
  'token.boolean': {
    color: '#ff00aa',
  },
  'token.operator': {
    color: '#ff4444',
  },
  'token.punctuation': {
    color: '#808080',
  },
};

// Types
interface RAVENTerminalProps {
  onClose?: () => void;
}

// Theme Color Palettes
const colorThemes = {
  green: {
    name: 'Matrix Green',
    // Background colors
    bg: '#000000',
    panelBg: '#0a0a0a',
    outputBg: '#050505',
    border: '#222222',
    borderLight: '#333333',
    // Text colors
    primary: '#ffffff',
    secondary: '#a0a0a0',
    muted: '#606060',
    gray: '#888888',
    // Syntax highlighting
    keyword: '#ff006a',
    function: '#00ff00',
    string: '#00ffaa',
    number: '#ffaa00',
    comment: '#ffff00',
    operator: '#ff4444',
    variable: '#00aaff',
    type: '#ff00ff',
    boolean: '#ff00aa',
    decorator: '#ffaa00',
    builtin: '#00ffff',
    className: '#88ff00',
    bracket: '#ffffff',
    punctuation: '#808080',
    // Status colors
    success: '#00ff00',
    error: '#ff0000',
    warning: '#ffaa00',
    info: '#00aaff',
  },
  red: {
    name: 'Cyber Red',
    // Background colors
    bg: '#0a0000',
    panelBg: '#150505',
    outputBg: '#100303',
    border: '#4a1111',
    borderLight: '#5a1818',
    // Text colors
    primary: '#ffcccc',
    secondary: '#ff9999',
    muted: '#cc6666',
    gray: '#aa5555',
    // Syntax highlighting
    keyword: '#ff0066',
    function: '#ff3333',
    string: '#ff6666',
    number: '#ff9900',
    comment: '#ffaa66',
    operator: '#ff0000',
    variable: '#ff6699',
    type: '#ff00aa',
    boolean: '#ff3366',
    decorator: '#ff8800',
    builtin: '#ff9999',
    className: '#ff4466',
    bracket: '#ffcccc',
    punctuation: '#aa6666',
    // Status colors
    success: '#ff6666',
    error: '#ff0000',
    warning: '#ff9900',
    info: '#ff66aa',
  },
  orange: {
    name: 'Solar Orange',
    // Background colors
    bg: '#0a0500',
    panelBg: '#1a0f00',
    outputBg: '#150a00',
    border: '#4a2200',
    borderLight: '#5a3300',
    // Text colors
    primary: '#ffddcc',
    secondary: '#ffaa66',
    muted: '#cc8855',
    gray: '#aa6644',
    // Syntax highlighting
    keyword: '#ff6600',
    function: '#ff9933',
    string: '#ffcc66',
    number: '#ffaa00',
    comment: '#ffdd99',
    operator: '#ff5500',
    variable: '#ff9966',
    type: '#ff6633',
    boolean: '#ff8844',
    decorator: '#ffbb00',
    builtin: '#ffcc99',
    className: '#ff7733',
    bracket: '#ffddcc',
    punctuation: '#aa7755',
    // Status colors
    success: '#ff9933',
    error: '#ff3300',
    warning: '#ffaa00',
    info: '#ff9966',
  },
  purple: {
    name: 'Neon Purple',
    // Background colors
    bg: '#0a0010',
    panelBg: '#150020',
    outputBg: '#100015',
    border: '#3a1155',
    borderLight: '#4a2266',
    // Text colors
    primary: '#eeccff',
    secondary: '#cc99ff',
    muted: '#9966cc',
    gray: '#7755aa',
    // Syntax highlighting
    keyword: '#ff00ff',
    function: '#cc66ff',
    string: '#ff99ff',
    number: '#ff66cc',
    comment: '#cc99ff',
    operator: '#ff00aa',
    variable: '#9966ff',
    type: '#ff00ff',
    boolean: '#ff66ff',
    decorator: '#cc00ff',
    builtin: '#cc99ff',
    className: '#aa66ff',
    bracket: '#eeccff',
    punctuation: '#9966aa',
    // Status colors
    success: '#cc66ff',
    error: '#ff0066',
    warning: '#ff66cc',
    info: '#9966ff',
  },
  blue: {
    name: 'Deep Blue',
    // Background colors
    bg: '#000510',
    panelBg: '#001020',
    outputBg: '#000a15',
    border: '#113355',
    borderLight: '#224466',
    // Text colors
    primary: '#ccddff',
    secondary: '#99bbff',
    muted: '#6688cc',
    gray: '#5577aa',
    // Syntax highlighting
    keyword: '#00aaff',
    function: '#3399ff',
    string: '#66ccff',
    number: '#00ffff',
    comment: '#99ddff',
    operator: '#0099ff',
    variable: '#00aaff',
    type: '#6699ff',
    boolean: '#33aaff',
    decorator: '#00ccff',
    builtin: '#66bbff',
    className: '#4499ff',
    bracket: '#ccddff',
    punctuation: '#6688aa',
    // Status colors
    success: '#00ccff',
    error: '#ff3366',
    warning: '#ffaa00',
    info: '#00aaff',
  },
};

// Default to green theme
const defaultTheme = 'green';

// SVG Icon Components
const Icons = {
  // Mode icons
  generate: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  ),
  explain: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
      <line x1="12" y1="6" x2="16" y2="6" />
      <line x1="12" y1="10" x2="16" y2="10" />
    </svg>
  ),
  debug: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="3" />
      <path d="M12 1v6M12 17v6M4.22 4.22l4.24 4.24M15.54 15.54l4.24 4.24M1 12h6M17 12h6M4.22 19.78l4.24-4.24M15.54 8.46l4.24-4.24" />
    </svg>
  ),
  optimize: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
    </svg>
  ),
  convert: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M23 4v6h-6M1 20v-6h6" />
      <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
    </svg>
  ),
  // UI icons
  copy: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </svg>
  ),
  check: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  ),
  dictionary: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
    </svg>
  ),
  help: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10" />
      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  ),
  colors: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="13.5" cy="6.5" r="3.5" />
      <circle cx="8.5" cy="9.5" r="3.5" />
      <circle cx="8.5" cy="15.5" r="3.5" />
      <circle cx="13.5" cy="17.5" r="3.5" />
      <circle cx="18.5" cy="14.5" r="3.5" />
    </svg>
  ),
  close: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  ),
  arrow: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  ),
  brain: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M9.5 2a2.5 2.5 0 0 1 5 0c0 .8-.4 1.5-1 2M12 2v5M3 13a3 3 0 0 1 3-3h12a3 3 0 0 1 3 3v8a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-8zM7 14h0M17 14h0" />
    </svg>
  ),
  code: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  ),
  error: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="8" x2="12" y2="12" />
      <line x1="12" y1="16" x2="12.01" y2="16" />
    </svg>
  ),
  warning: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
      <line x1="12" y1="9" x2="12" y2="13" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  ),
  // Agent Chat Icons
  user: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  ),
  agent: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="3" />
      <path d="M12 1v6m0 6v6m11-7h-6m-6 0H1m15.5-6.5L17 8l-1.5-1.5M8 16l-1.5 1.5L5 16l1.5-1.5L8 16Z" />
    </svg>
  ),
  send: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="22" y1="2" x2="11" y2="13" />
      <polygon points="22,2 15,22 11,13 2,9 22,2" />
    </svg>
  ),
  clock: (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12,6 12,12 16,14" />
    </svg>
  ),
  chat: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10z" />
    </svg>
  ),
};

// AI Modes
const aiModes = [
  { id: 'generate', name: 'Generate', icon: Icons.generate, description: 'Convert English to code' },
  { id: 'explain', name: 'Explain', icon: Icons.explain, description: 'Understand code' },
  { id: 'debug', name: 'Debug', icon: Icons.debug, description: 'Find and fix errors' },
  { id: 'optimize', name: 'Optimize', icon: Icons.optimize, description: 'Improve performance' },
  { id: 'convert', name: 'Convert', icon: Icons.convert, description: 'Translate languages' },
];

// Supported Languages
const languages = [
  { id: 'python', name: 'Python' },
  { id: 'javascript', name: 'JavaScript' },
  { id: 'typescript', name: 'TypeScript' },
  { id: 'java', name: 'Java' },
  { id: 'sql', name: 'SQL' },
];

// Language Dictionary
const languageDictionary: Record<string, Record<string, string>> = {
  python: {
    'Variables': 'x = 10  # No type declaration needed',
    'Functions': 'def greet(name):\n    return f"Hello {name}"',
    'Lists': 'items = [1, 2, 3]\nitems.append(4)',
    'Dictionaries': 'person = {"name": "Lee", "age": 30}',
    'Loops': 'for item in items:\n    print(item)',
    'Conditionals': 'if x > 5:\n    print("big")\nelif x > 0:\n    print("small")',
    'Classes': 'class Dog:\n    def __init__(self, name):\n        self.name = name',
    'List Comprehension': 'squares = [x**2 for x in range(10)]',
    'Try/Except': 'try:\n    risky()\nexcept Exception as e:\n    print(e)',
    'Lambda': 'double = lambda x: x * 2',
  },
  javascript: {
    'Variables': 'const x = 10;  // immutable\nlet y = 20;    // mutable',
    'Functions': 'function greet(name) {\n  return `Hello ${name}`;\n}',
    'Arrow Functions': 'const greet = (name) => `Hello ${name}`;',
    'Arrays': 'const items = [1, 2, 3];\nitems.push(4);',
    'Objects': 'const person = { name: "Lee", age: 30 };',
    'Loops': 'for (const item of items) {\n  console.log(item);\n}',
    'Conditionals': 'if (x > 5) {\n  console.log("big");\n} else {\n  console.log("small");\n}',
    'Classes': 'class Dog {\n  constructor(name) {\n    this.name = name;\n  }\n}',
    'Promises': 'fetch(url)\n  .then(res => res.json())\n  .catch(err => console.log(err));',
    'Async/Await': 'async function getData() {\n  const res = await fetch(url);\n  return res.json();\n}',
  },
  typescript: {
    'Type Annotations': 'let name: string = "Lee";\nlet age: number = 30;',
    'Interfaces': 'interface Person {\n  name: string;\n  age: number;\n}',
    'Type Aliases': 'type ID = string | number;',
    'Functions': 'function greet(name: string): string {\n  return `Hello ${name}`;\n}',
    'Generics': 'function identity<T>(arg: T): T {\n  return arg;\n}',
    'Arrays': 'const items: number[] = [1, 2, 3];',
    'Optional Props': 'interface Config {\n  name: string;\n  debug?: boolean;\n}',
    'Union Types': 'let value: string | number;',
    'Enums': 'enum Status {\n  Active,\n  Inactive\n}',
    'Classes': 'class Dog {\n  constructor(public name: string) {}\n}',
  },
  java: {
    'Variables': 'int x = 10;\nString name = "Lee";',
    'Methods': 'public String greet(String name) {\n  return "Hello " + name;\n}',
    'Arrays': 'int[] nums = {1, 2, 3};\nArrayList<Integer> list = new ArrayList<>();',
    'Loops': 'for (int i = 0; i < 10; i++) {\n  System.out.println(i);\n}',
    'For-Each': 'for (String item : items) {\n  System.out.println(item);\n}',
    'Classes': 'public class Dog {\n  private String name;\n  public Dog(String name) {\n    this.name = name;\n  }\n}',
    'Interfaces': 'public interface Animal {\n  void speak();\n}',
    'Try/Catch': 'try {\n  risky();\n} catch (Exception e) {\n  e.printStackTrace();\n}',
    'Inheritance': 'public class Puppy extends Dog {\n  // inherits from Dog\n}',
    'Static': 'public static void main(String[] args) {\n  // entry point\n}',
  },
  sql: {
    'SELECT': 'SELECT name, age FROM users\nWHERE age > 18;',
    'INSERT': 'INSERT INTO users (name, age)\nVALUES ("Lee", 30);',
    'UPDATE': 'UPDATE users\nSET age = 31\nWHERE name = "Lee";',
    'DELETE': 'DELETE FROM users\nWHERE age < 18;',
    'JOIN': 'SELECT * FROM orders\nJOIN users ON orders.user_id = users.id;',
    'GROUP BY': 'SELECT country, COUNT(*)\nFROM users\nGROUP BY country;',
    'ORDER BY': 'SELECT * FROM users\nORDER BY age DESC;',
    'WHERE Clauses': 'WHERE age > 18 AND country = "UK"\nWHERE name LIKE "L%"',
    'Aggregates': 'SELECT COUNT(*), AVG(age), MAX(salary)\nFROM employees;',
    'CREATE TABLE': 'CREATE TABLE users (\n  id INT PRIMARY KEY,\n  name VARCHAR(100)\n);',
  },
};

// Syntax Highlighting (moved to inside component for colors access)

// Helper function to manage localStorage safely
const getStoredData = (key: string, defaultValue: any) => {
  if (typeof window === 'undefined') return defaultValue;
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch {
    return defaultValue;
  }
};

const setStoredData = (key: string, value: any) => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error('Failed to save to localStorage:', e);
  }
};

export default function RAVENTerminal({ onClose }: RAVENTerminalProps) {
  // State with localStorage persistence
  const [mode, setMode] = useState(() => getStoredData('raven-mode', 'generate'));
  const [language, setLanguage] = useState(() => getStoredData('raven-language', 'python'));
  const [targetLanguage, setTargetLanguage] = useState(() => getStoredData('raven-target-language', 'javascript'));
  const [englishInput, setEnglishInput] = useState('');
  const [codeInput, setCodeInput] = useState('');
  const [output, setOutput] = useState('');
  const [practiceCode, setPracticeCode] = useState('');
  const [isRavenCollapsed, setIsRavenCollapsed] = useState(false);
  // Session-based theme (not persisted, resets on clear)
  const [currentTheme, setCurrentTheme] = useState<keyof typeof colorThemes>('green');

  // Get current colors based on theme
  const colors = colorThemes[currentTheme];

  // Syntax Highlighting function (now has access to colors)
  const highlightCode = (code: string, language: string): JSX.Element[] => {
    const lines = code.split('\n');
    return lines.map((line, i) => {
      if (!line) return <div key={i}>&nbsp;</div>;

      // Simple highlighting patterns
      const patterns = {
        python: {
          keywords: /\b(def|class|return|if|elif|else|for|while|import|from|try|except|with|lambda|True|False|None|async|await|and|or|not|in|is)\b/g,
          strings: /(["'])((?:(?!\1)[^\\]|\\.)*)(\1)/g,
          numbers: /\b\d+\.?\d*\b/g,
          comments: /#.*/g,
        },
        javascript: {
          keywords: /\b(const|let|var|function|return|if|else|for|while|class|import|export|async|await|this|new|true|false|null|undefined)\b/g,
          strings: /(["'`])((?:(?!\1)[^\\]|\\.)*)(\1)/g,
          numbers: /\b\d+\.?\d*\b/g,
          comments: /\/\/.*/g,
        },
        typescript: {
          keywords: /\b(const|let|var|function|return|if|else|for|while|class|interface|type|import|export|async|await|this|new|true|false|null|undefined|string|number|boolean|any)\b/g,
          strings: /(["'`])((?:(?!\1)[^\\]|\\.)*)(\1)/g,
          numbers: /\b\d+\.?\d*\b/g,
          comments: /\/\/.*/g,
        },
        java: {
          keywords: /\b(public|private|class|static|void|return|if|else|for|while|new|import|this|true|false|null|int|String|boolean)\b/g,
          strings: /(["'])((?:(?!\1)[^\\]|\\.)*)(\1)/g,
          numbers: /\b\d+\.?\d*\b/g,
          comments: /\/\/.*/g,
        },
        sql: {
          keywords: /\b(SELECT|FROM|WHERE|INSERT|UPDATE|DELETE|CREATE|TABLE|JOIN|ON|AND|OR|ORDER|BY|GROUP|HAVING|LIMIT|INTO|VALUES|SET)\b/gi,
          strings: /(["'])((?:(?!\1)[^\\]|\\.)*)(\1)/g,
          numbers: /\b\d+\.?\d*\b/g,
          comments: /--.*/g,
        },
      };

      const langPatterns = patterns[language as keyof typeof patterns] || patterns.javascript;
      let highlighted = line;

      // Apply highlighting
      highlighted = highlighted.replace(langPatterns.keywords, `<span style="color:${colors.keyword}">$&</span>`);
      highlighted = highlighted.replace(langPatterns.strings, `<span style="color:${colors.string}">$&</span>`);
      highlighted = highlighted.replace(langPatterns.numbers, `<span style="color:${colors.number}">$&</span>`);
      highlighted = highlighted.replace(langPatterns.comments, `<span style="color:${colors.comment};font-style:italic">$&</span>`);

      // Handle functions (words followed by parentheses)
      highlighted = highlighted.replace(/\b([a-zA-Z_][a-zA-Z0-9_]*)\s*(?=\()/g, `<span style="color:${colors.function}">$1</span>`);

      return <div key={i} dangerouslySetInnerHTML={{ __html: highlighted }} />;
    });
  };

  // Workspace context for maintaining code history
  const [workspaceContext, setWorkspaceContext] = useState<{
    lastGeneratedCode: string;
    lastAnalyzedCode: string;
    codeHistory: Array<{ code: string; operation: string; timestamp: Date }>;
  }>(() => getStoredData('raven-workspace', {
    lastGeneratedCode: '',
    lastAnalyzedCode: '',
    codeHistory: []
  }));

  // Load chat history from localStorage with timestamp pruning (24 hours)
  const loadChatHistory = () => {
    const stored = getStoredData('raven-chat-history', []);
    const now = new Date();
    const filtered = stored.filter((msg: any) => {
      const msgDate = new Date(msg.timestamp);
      const hoursDiff = (now.getTime() - msgDate.getTime()) / (1000 * 60 * 60);
      return hoursDiff < 24; // Keep messages from last 24 hours
    }).slice(-50).map((msg: any) => ({
      ...msg,
      timestamp: new Date(msg.timestamp) // Ensure timestamp is a Date object
    }));
    return filtered;
  };

  // AI Agent Chat State with persistence
  const [agentMessages, setAgentMessages] = useState<Array<{
    id: string;
    type: 'user' | 'agent';
    content: string;
    timestamp: Date;
    isProcessing?: boolean;
  }>>(loadChatHistory());
  const [agentInput, setAgentInput] = useState('');
  const [isAgentProcessing, setIsAgentProcessing] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showColorLegend, setShowColorLegend] = useState(false);
  const [showDictionary, setShowDictionary] = useState(false);
  const [showAbout, setShowAbout] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [copied, setCopied] = useState(false);
  const [selectedConcept, setSelectedConcept] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);
  const [streamingContent, setStreamingContent] = useState('');
  const [executionResult, setExecutionResult] = useState<string>('');
  const [syntaxErrors, setSyntaxErrors] = useState<string[]>([]);

  // Refs
  const debounceRef = useRef<NodeJS.Timeout | null>(null);
  const streamIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Cleanup effect for debounce timeout and streaming
  useEffect(() => {
    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
      if (streamIntervalRef.current) {
        clearTimeout(streamIntervalRef.current);
      }
    };
  }, []);

  // Save chat history to localStorage when it changes
  useEffect(() => {
    if (agentMessages.length > 0) {
      const filtered = agentMessages.filter(msg => !msg.isProcessing);
      setStoredData('raven-chat-history', filtered);
    }
  }, [agentMessages]);

  // Save workspace context when it changes
  useEffect(() => {
    setStoredData('raven-workspace', workspaceContext);
  }, [workspaceContext]);

  // Save preferences when they change
  useEffect(() => {
    setStoredData('raven-mode', mode);
  }, [mode]);

  useEffect(() => {
    setStoredData('raven-language', language);
  }, [language]);

  useEffect(() => {
    setStoredData('raven-target-language', targetLanguage);
  }, [targetLanguage]);

  // Function to check JavaScript syntax
  const checkSyntax = (code: string): string[] => {
    const errors: string[] = [];
    if (language === 'javascript' || language === 'typescript') {
      try {
        // Basic syntax check using Function constructor
        new Function(code);
      } catch (e: any) {
        errors.push(e.message);
      }
    }
    return errors;
  };

  // Function to execute JavaScript code safely
  const executeCode = (code: string): string => {
    if (language !== 'javascript') {
      return 'Live execution only available for JavaScript';
    }

    try {
      // Create a sandboxed environment
      const sandbox = {
        console: {
          log: (...args: any[]) => args.join(' '),
          error: (...args: any[]) => `ERROR: ${args.join(' ')}`,
          warn: (...args: any[]) => `WARN: ${args.join(' ')}`
        },
        result: null
      };

      // Wrap code to capture output
      const wrappedCode = `
        let output = [];
        const console = {
          log: (...args) => output.push(args.join(' ')),
          error: (...args) => output.push('ERROR: ' + args.join(' ')),
          warn: (...args) => output.push('WARN: ' + args.join(' '))
        };
        ${code}
        return output.join('\n');
      `;

      const func = new Function(wrappedCode);
      const result = func();
      return result || 'Code executed successfully (no output)';
    } catch (e: any) {
      return `Execution Error: ${e.message}`;
    }
  };

  // Handle send message - now without streaming
  const handleSendMessage = useCallback(async () => {
    const input = mode === 'generate' ? englishInput.trim() : codeInput.trim();
    if (!input || isProcessing) return;

    // Clear output immediately to remove old content
    setOutput('');
    setIsProcessing(true);
    setIsStreaming(false);

    // Clear any existing streaming interval
    if (streamIntervalRef.current) {
      clearInterval(streamIntervalRef.current);
      streamIntervalRef.current = null;
    }

    const lang = language || 'python';
    let aiMode = mode;
    let targetLang = targetLanguage || 'javascript';

    // Build context-aware input
    const contextAwareInput = input;

    // System prompt based on selected mode
    const prompts: Record<string, string> = {
      generate: `You are RAVEN, an expert programming instructor specializing in teaching ${lang}.
Generate complete, working ${lang} code based on this description:
${contextAwareInput}

🎓 EDUCATIONAL CODE GENERATION - Teaching-first approach with comprehensive explanations.

FORMAT YOUR RESPONSE WITH THESE COMPREHENSIVE SECTIONS:

🌍 **REAL-WORLD ANALOGY**
- Compare the programming concept to something familiar from everyday life
- Explain why this comparison helps understand the code logic
- Connect abstract programming ideas to tangible examples

🧠 **LEARNING OBJECTIVES**
- What programming concepts will this teach?
- Which skills will the reader develop?
- What knowledge can be applied to other projects?

💻 **THE CODE SOLUTION**
Generate complete, working ${lang} code with EXTENSIVE EDUCATIONAL COMMENTS:

EVERY SINGLE FUNCTION, LOOP, CONDITIONAL, AND MAJOR CODE BLOCK must include these four comment lines:
${lang === 'python' ? `# 🎯 WHAT: Describe what this section accomplishes
# 🔧 HOW: Explain the specific technique or method used
# 💡 WHY: Justify why this approach is chosen over alternatives
# 📚 CONCEPT: Name the programming concept being demonstrated` :
`// 🎯 WHAT: Describe what this section accomplishes
// 🔧 HOW: Explain the specific technique or method used
// 💡 WHY: Justify why this approach is chosen over alternatives
// 📚 CONCEPT: Name the programming concept being demonstrated`}

IMPORTANT: Apply these comments to EVERY:
- Function definition
- Loop structure (for, while, etc.)
- Conditional statement (if/else)
- Class definition
- Important variable declaration
- Algorithm implementation
- Data structure operation

🔍 **STEP-BY-STEP BREAKDOWN**
For each major section of code:
1. **Purpose**: What does this part do?
2. **Input**: What data goes in?
3. **Process**: How is the data transformed?
4. **Output**: What comes out?
5. **Concept**: What programming principle is demonstrated?

🏗️ **ARCHITECTURE EXPLANATION**
- Overall code structure and organization
- How different parts work together
- Design patterns or principles used
- Scalability and maintainability considerations

📖 **BEGINNER TO ADVANCED BREAKDOWN**
- **Beginner Level**: Basic concepts a new programmer should understand
- **Intermediate Level**: More complex ideas and their applications
- **Advanced Level**: Sophisticated techniques and optimizations

💡 **ALTERNATIVE APPROACHES**
- Show 2-3 different ways to solve the same problem
- Compare pros/cons of each approach
- Explain when to use each method

🧪 **PRACTICAL EXAMPLES**
- Provide 2-3 specific use cases where this code would be valuable
- Show how to modify the code for different scenarios
- Demonstrate edge cases and how to handle them

🔧 **DEBUGGING & TROUBLESHOOTING**
- Common errors beginners might encounter
- How to test and verify the code works
- Tips for debugging and problem-solving

🌟 **BEST PRACTICES DEMONSTRATED**
- Code organization and readability
- Error handling and validation
- Performance considerations
- Security implications (if applicable)

🚀 **NEXT STEPS & EXTENSIONS**
- How to expand this code further
- Related concepts to explore
- Suggested practice exercises
- Advanced features to add

📚 **COMPREHENSIVE SUMMARY**
- **Key Programming Concepts Learned**: List all major concepts covered
- **Skills Developed**: What abilities were gained from this exercise
- **Real-World Applications**: Where this knowledge applies in professional development
- **Foundation for Future Learning**: What advanced topics this prepares you for
- **Practice Recommendations**: Suggested exercises to reinforce learning
- **Related Technologies**: Connected tools, frameworks, or languages to explore

🎯 **LEARNING CHECKPOINT**
End with 3-5 questions the reader should be able to answer after studying this code to test their understanding.`,

      explain: `You are RAVEN, an expert code analysis instructor. Provide comprehensive educational explanation of this ${lang} code:
${contextAwareInput}

🎓 EDUCATIONAL CODE ANALYSIS - Deep-dive learning experience for understanding existing code.

FORMAT YOUR RESPONSE WITH THESE COMPREHENSIVE SECTIONS:

📋 **CODE OVERVIEW & PURPOSE**
- **Primary Functionality**: What this code accomplishes
- **Problem Domain**: What real-world problem this solves
- **Use Cases**: Where and when you'd use this in production
- **Code Quality**: Initial assessment of structure and style

🧠 **LEARNING OBJECTIVES**
- **Programming Concepts**: What you'll learn by studying this code
- **Skills Development**: Abilities gained from understanding this implementation
- **Knowledge Transfer**: How this applies to other programming challenges

🏗️ **ARCHITECTURE & DESIGN ANALYSIS**
- **Overall Structure**: How the code is organized and why
- **Design Patterns**: Recognized software engineering patterns used
- **Data Flow**: How information moves through the system
- **Dependencies**: External libraries or modules used and their purposes

🔍 **LINE-BY-LINE EDUCATIONAL BREAKDOWN**
For each significant section, provide:
- **What It Does**: Plain English explanation
- **How It Works**: Technical implementation details
- **Why It's Written This Way**: Design decisions and alternatives
- **Concepts Demonstrated**: Programming principles shown

💡 **KEY INSIGHTS & BEST PRACTICES**
- **Smart Design Choices**: What the code does well
- **Potential Improvements**: Areas that could be enhanced
- **Learning Points**: Important takeaways for a programmer
- **Common Pitfalls**: What to avoid when writing similar code

🌍 **REAL-WORLD CONNECTIONS**
- **Industry Applications**: Where you'd see this in professional development
- **Similar Patterns**: Other places these techniques appear
- **Scalability Considerations**: How this approach handles growth

📖 **EDUCATIONAL LAYERS**
- **For Beginners**: Fundamental concepts to grasp first
- **For Intermediate Developers**: Deeper technical understanding
- **For Advanced Programmers**: Optimization and architectural insights

🧪 **EXPERIMENTATION SUGGESTIONS**
- **Modifications to Try**: Changes to better understand the code
- **Test Cases to Write**: How to verify the code works
- **Extensions to Build**: Features you could add for practice

🚀 **LEARNING EXTENSIONS**
- **Related Topics**: What to study next
- **Similar Problems**: Other challenges using these concepts
- **Advanced Techniques**: Higher-level approaches to explore

📚 **COMPREHENSIVE SUMMARY**
- **Core Concepts Mastered**: Essential programming principles learned
- **Technical Skills Gained**: Specific abilities developed
- **Problem-Solving Patterns**: Reusable approaches for other projects
- **Professional Relevance**: How this knowledge applies in the workplace

🎯 **UNDERSTANDING CHECK**
End with 3-5 questions to verify comprehension of the code's functionality and design principles.`,

      debug: `You are RAVEN, an expert debugging instructor. Analyze and fix this ${lang} code with comprehensive educational guidance:
${contextAwareInput}

🐛 EDUCATIONAL DEBUGGING SESSION - Learn professional debugging techniques while fixing code.

FORMAT YOUR RESPONSE WITH THESE COMPREHENSIVE SECTIONS:

🔍 **INITIAL DIAGNOSTIC ANALYSIS**
- **Symptoms**: What problems are visible in the code
- **Error Types**: Classification of issues (syntax, logic, runtime, design)
- **Impact Assessment**: What breaks when this code runs
- **Root Cause Hypothesis**: Initial theories about the problems

🧠 **DEBUGGING METHODOLOGY**
- **Systematic Approach**: Step-by-step debugging process
- **Tools & Techniques**: Professional debugging methods to apply
- **Mental Model**: How to think about finding and fixing bugs
- **Common Patterns**: Recognizing typical error patterns

🛠️ **DETAILED FIX IMPLEMENTATION**
For each bug found:
1. **Bug Description**: What's wrong and why it's a problem
2. **Root Cause**: The underlying reason for the error
3. **The Fix**: Corrected code with explanations
4. **Prevention Strategy**: How to avoid this bug in future

💻 **CORRECTED CODE SOLUTION**
Provide the fully debugged, working code with:
- Comments explaining each fix
- Improved error handling
- Better code structure
- Enhanced readability

🧪 **TESTING & VERIFICATION**
- **Test Cases**: Specific inputs to verify fixes work
- **Edge Cases**: Boundary conditions to check
- **Regression Testing**: Ensuring fixes don't break other parts
- **Performance Impact**: How fixes affect code efficiency

💡 **DEBUGGING LESSONS**
- **Key Takeaways**: Important debugging principles learned
- **Pattern Recognition**: How to spot similar bugs quickly
- **Tool Usage**: When and how to use debugging tools
- **Problem-Solving Skills**: Systematic thinking development

🛡️ **PREVENTIVE MEASURES**
- **Coding Standards**: Best practices to prevent these bugs
- **Code Review Points**: What to check before committing
- **Testing Strategies**: How to catch bugs early
- **Documentation**: Comments and docs to prevent confusion

📈 **SKILL DEVELOPMENT**
- **Debugging Techniques Learned**: New troubleshooting methods
- **Code Quality Improvements**: How to write more robust code
- **Error Pattern Recognition**: Identifying common bug types
- **Professional Practices**: Industry-standard debugging approaches

🚀 **ADVANCED DEBUGGING**
- **Complex Scenarios**: Harder debugging challenges to tackle
- **Tool Mastery**: Advanced debugger features to learn
- **Performance Debugging**: Finding and fixing bottlenecks
- **Production Debugging**: Techniques for live systems

📚 **COMPREHENSIVE SUMMARY**
- **Bugs Fixed**: Complete list of issues resolved
- **Techniques Applied**: Debugging methods used
- **Skills Developed**: Abilities gained from this exercise
- **Knowledge Gained**: Concepts learned about code quality

🎯 **DEBUGGING MASTERY CHECK**
End with scenarios to test debugging skills and understanding of the fixes applied.`,

      optimize: `You are RAVEN, an expert performance optimization instructor. Optimize this ${lang} code with comprehensive educational guidance:
${contextAwareInput}

⚡ EDUCATIONAL OPTIMIZATION SESSION - Learn professional performance engineering while improving code.

FORMAT YOUR RESPONSE WITH THESE COMPREHENSIVE SECTIONS:

📊 **PERFORMANCE ANALYSIS**
- **Current Performance**: Baseline metrics and bottlenecks
- **Big O Complexity**: Time and space complexity analysis
- **Resource Usage**: Memory, CPU, and I/O patterns
- **Scalability Issues**: Problems as data/load increases

🧠 **OPTIMIZATION STRATEGY**
- **Prioritization**: Which optimizations matter most
- **Trade-offs**: Balancing performance vs readability/maintainability
- **Methodology**: Systematic approach to optimization
- **Measurement**: How to benchmark improvements

💻 **OPTIMIZED CODE SOLUTION**
Provide the performance-enhanced code with:
- Detailed comments explaining each optimization
- Before/after comparisons
- Performance impact measurements
- Trade-off explanations

🔬 **OPTIMIZATION TECHNIQUES APPLIED**
For each optimization:
1. **Technique Name**: What optimization method is used
2. **How It Works**: The mechanism behind the improvement
3. **Performance Gain**: Expected speedup or resource savings
4. **When to Use**: Appropriate scenarios for this technique

📈 **PERFORMANCE METRICS**
- **Time Complexity**: From O(?) to O(?)
- **Space Complexity**: Memory usage improvements
- **Actual Benchmarks**: Real-world performance gains
- **Scalability**: How it handles larger datasets

🧮 **ALGORITHMIC IMPROVEMENTS**
- **Better Algorithms**: More efficient approaches
- **Data Structure Changes**: Optimal structure selection
- **Computational Shortcuts**: Mathematical optimizations
- **Caching Strategies**: Memoization and result reuse

💡 **OPTIMIZATION INSIGHTS**
- **Key Principles**: Fundamental optimization concepts
- **Common Pitfalls**: Over-optimization and premature optimization
- **Real-World Impact**: When these optimizations matter
- **Best Practices**: Industry-standard approaches

🚀 **ADVANCED OPTIMIZATIONS**
- **Parallel Processing**: Concurrent execution opportunities
- **Async Operations**: Non-blocking improvements
- **Memory Management**: Efficient resource handling
- **System-Level**: OS and hardware optimizations

📖 **EDUCATIONAL BREAKDOWN**
- **Beginner Level**: Basic optimization concepts
- **Intermediate Level**: Standard optimization techniques
- **Advanced Level**: Sophisticated performance engineering

🧪 **TESTING & BENCHMARKING**
- **Performance Tests**: How to measure improvements
- **Profiling Tools**: Professional performance analysis
- **Benchmark Scenarios**: Representative test cases
- **Regression Prevention**: Ensuring optimizations don't break functionality

📚 **COMPREHENSIVE SUMMARY**
- **Optimizations Applied**: Complete list of improvements
- **Performance Gains**: Quantified speed/resource improvements
- **Concepts Learned**: Optimization principles mastered
- **Skills Developed**: Performance engineering abilities gained

🎯 **OPTIMIZATION MASTERY CHECK**
End with challenges to test understanding of performance optimization principles and techniques.`,

      convert: `You are RAVEN, an expert programming language translation instructor. Convert this ${lang} code to ${targetLang} with comprehensive educational guidance:
${contextAwareInput}

🔄 EDUCATIONAL CODE CONVERSION - Master multiple programming languages through translation.

FORMAT YOUR RESPONSE WITH THESE COMPREHENSIVE SECTIONS:

🧠 **LANGUAGE COMPARISON OVERVIEW**
- **Source Language (${lang})**: Key characteristics and paradigms
- **Target Language (${targetLang})**: Key characteristics and paradigms
- **Fundamental Differences**: Syntax, typing, execution model
- **Conversion Challenges**: What makes this translation interesting

📋 **CONVERSION STRATEGY**
- **Mapping Approach**: How concepts translate between languages
- **Idioms & Patterns**: Language-specific best practices
- **Feature Availability**: What's available/missing in each language
- **Design Adaptations**: Structural changes needed

💻 **CONVERTED CODE SOLUTION**
Provide the complete ${targetLang} translation with:
- Line-by-line mapping comments
- Idiomatic ${targetLang} patterns
- Language-specific optimizations
- Equivalent functionality verification

🔄 **TRANSLATION ANALYSIS**
For each significant code section:
1. **Original ${lang} Code**: What we're converting from
2. **${targetLang} Translation**: The converted version
3. **Translation Decisions**: Why specific choices were made
4. **Language Differences**: How approaches differ

🎯 **LANGUAGE-SPECIFIC FEATURES**
- **${lang} Unique Features**: What doesn't translate directly
- **${targetLang} Advantages**: Better ways to implement in target
- **Workarounds**: Handling missing features
- **Enhancements**: Improvements possible in ${targetLang}

💡 **CROSS-LANGUAGE INSIGHTS**
- **Paradigm Shifts**: Different thinking required
- **Performance Implications**: Speed/memory differences
- **Ecosystem Differences**: Libraries and tools comparison
- **Best Practice Variations**: Style guide differences

📖 **EDUCATIONAL LAYERS**
- **Syntax Translation**: Basic conversion rules
- **Semantic Translation**: Preserving meaning and intent
- **Idiomatic Translation**: Writing natural ${targetLang} code
- **Optimized Translation**: Leveraging ${targetLang} strengths

🧪 **TESTING & VALIDATION**
- **Functional Equivalence**: Verifying same behavior
- **Performance Comparison**: Speed and resource usage
- **Edge Case Handling**: Ensuring robust translation
- **Testing Strategies**: Language-specific testing approaches

🚀 **ADVANCED CONCEPTS**
- **Design Pattern Translation**: Converting architectural patterns
- **Concurrency Models**: Different threading/async approaches
- **Memory Management**: GC vs manual vs RAII
- **Type System Differences**: Static vs dynamic considerations

🌟 **BEST PRACTICES**
- **${targetLang} Conventions**: Following community standards
- **Code Organization**: Language-appropriate structure
- **Documentation Style**: Language-specific commenting
- **Tool Integration**: Build systems and package managers

📚 **COMPREHENSIVE SUMMARY**
- **Translation Techniques**: Methods used for conversion
- **Concepts Mastered**: Cross-language programming skills
- **Language Proficiency**: Understanding gained of both languages
- **Professional Applications**: When to use each language

🎯 **MULTI-LANGUAGE MASTERY CHECK**
End with exercises to test understanding of both languages and translation principles.`
    };

    try {
      const response = await fetch('/api/ai/python', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-session-token': sessionStorage.getItem('raven-session') || '',
        },
        body: JSON.stringify({
          message: prompts[aiMode] || prompts.generate,
          history: []
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        setOutput(`❌ Error: ${errorData.message || 'Unknown error occurred'}`);
        setIsProcessing(false);
        return;
      }

      const data = await response.json();
      const fullResponse = data.message || 'No response received';

      // Display the full response immediately (no streaming)
      setOutput(fullResponse);

      // Update workspace context with generated code
      if (aiMode === 'generate') {
        setWorkspaceContext(prev => ({
          ...prev,
          lastGeneratedCode: fullResponse
        }));
      }
    } catch (error: any) {
      setOutput(`❌ Connection Error: ${error.message}\n\nPlease check your internet connection and try again.`);
    } finally {
      setIsProcessing(false);
    }
  }, [mode, englishInput, codeInput, isProcessing, language, targetLanguage]);

  // Legacy processWithAI - replaced by handleSendMessage
  // Keeping for reference but not used
  const processWithAI = useCallback(async (inputText: string, aiMode: string, lang: string, targetLang?: string) => {
    if (!inputText.trim()) {
      setOutput('');
      return;
    }

    // Check syntax for JavaScript/TypeScript
    if ((aiMode === 'debug' || aiMode === 'optimize') && (lang === 'javascript' || lang === 'typescript')) {
      const errors = checkSyntax(inputText);
      setSyntaxErrors(errors);
    } else {
      setSyntaxErrors([]);
    }

    // Check if user is referencing previous context
    let contextAwareInput = inputText;
    if (inputText.includes('that') || inputText.includes('previous') || inputText.includes('last')) {
      if (workspaceContext.lastGeneratedCode && aiMode !== 'generate') {
        contextAwareInput = workspaceContext.lastGeneratedCode;
      } else if (workspaceContext.lastAnalyzedCode) {
        contextAwareInput = workspaceContext.lastAnalyzedCode;
      }
    }

    // Update workspace context
    setWorkspaceContext(prev => ({
      ...prev,
      lastAnalyzedCode: contextAwareInput,
      codeHistory: [...prev.codeHistory.slice(-9), {
        code: contextAwareInput,
        operation: aiMode,
        timestamp: new Date()
      }]
    }));

    setIsProcessing(true);
    setIsStreaming(true);
    setStreamingContent('Processing...');
    setOutput(`Processing ${aiMode} with RAVEN AI...`);

    const prompts: Record<string, string> = {
      generate: `You are RAVEN, an expert coding instructor and mentor. Create comprehensive, educational ${lang} code for: "${contextAwareInput}"

🎓 EDUCATIONAL GOAL: This is a LEARNING TERMINAL - provide detailed explanations that teach programming concepts step-by-step.

FORMAT YOUR RESPONSE WITH THESE COMPREHENSIVE SECTIONS:

🎯 **UNDERSTANDING THE REQUEST**
- Break down what exactly needs to be built
- Identify the core programming concepts involved
- Explain the problem-solving approach

🌍 **REAL-WORLD ANALOGY**
- Compare the programming concept to something familiar from everyday life
- Explain why this comparison helps understand the code logic
- Connect abstract programming ideas to tangible examples

🧠 **LEARNING OBJECTIVES**
- What programming concepts will this teach?
- Which skills will the reader develop?
- What knowledge can be applied to other projects?

💻 **THE CODE SOLUTION**
Generate complete, working ${lang} code with EXTENSIVE EDUCATIONAL COMMENTS:

EVERY SINGLE FUNCTION, LOOP, CONDITIONAL, AND MAJOR CODE BLOCK must include these four comment lines:
${lang === 'python' ? `# 🎯 WHAT: Describe what this section accomplishes
# 🔧 HOW: Explain the specific technique or method used
# 💡 WHY: Justify why this approach is chosen over alternatives
# 📚 CONCEPT: Name the programming concept being demonstrated` :
`// 🎯 WHAT: Describe what this section accomplishes
// 🔧 HOW: Explain the specific technique or method used
// 💡 WHY: Justify why this approach is chosen over alternatives
// 📚 CONCEPT: Name the programming concept being demonstrated`}

IMPORTANT: Apply these comments to EVERY:
- Function definition
- Loop structure (for, while, etc.)
- Conditional statement (if/else)
- Class definition
- Important variable declaration
- Algorithm implementation
- Data structure operation

🔍 **STEP-BY-STEP BREAKDOWN**
For each major section of code:
1. **Purpose**: What does this part do?
2. **Input**: What data goes in?
3. **Process**: How is the data transformed?
4. **Output**: What comes out?
5. **Concept**: What programming principle is demonstrated?

🏗️ **ARCHITECTURE EXPLANATION**
- Overall code structure and organization
- How different parts work together
- Design patterns or principles used
- Scalability and maintainability considerations

📖 **BEGINNER TO ADVANCED BREAKDOWN**
- **Beginner Level**: Basic concepts a new programmer should understand
- **Intermediate Level**: More complex ideas and their applications
- **Advanced Level**: Sophisticated techniques and optimizations

💡 **ALTERNATIVE APPROACHES**
- Show 2-3 different ways to solve the same problem
- Compare pros/cons of each approach
- Explain when to use each method

🧪 **PRACTICAL EXAMPLES**
- Provide 2-3 specific use cases where this code would be valuable
- Show how to modify the code for different scenarios
- Demonstrate edge cases and how to handle them

🔧 **DEBUGGING & TROUBLESHOOTING**
- Common errors beginners might encounter
- How to test and verify the code works
- Tips for debugging and problem-solving

🌟 **BEST PRACTICES DEMONSTRATED**
- Code organization and readability
- Error handling and validation
- Performance considerations
- Security implications (if applicable)

🚀 **NEXT STEPS & EXTENSIONS**
- How to expand this code further
- Related concepts to explore
- Suggested practice exercises
- Advanced features to add

📚 **COMPREHENSIVE SUMMARY**
- **Key Programming Concepts Learned**: List all major concepts covered
- **Skills Developed**: What abilities were gained from this exercise
- **Real-World Applications**: Where this knowledge applies in professional development
- **Foundation for Future Learning**: What advanced topics this prepares you for
- **Practice Recommendations**: Suggested exercises to reinforce learning
- **Related Technologies**: Connected tools, frameworks, or languages to explore

🎯 **LEARNING CHECKPOINT**
End with 3-5 questions the reader should be able to answer after studying this code to test their understanding.`,

      explain: `You are RAVEN, an expert code analysis instructor. Provide comprehensive educational explanation of this ${lang} code:
${contextAwareInput}

🎓 EDUCATIONAL CODE ANALYSIS - Deep-dive learning experience for understanding existing code.

FORMAT YOUR RESPONSE WITH THESE COMPREHENSIVE SECTIONS:

📋 **CODE OVERVIEW & PURPOSE**
- **Primary Functionality**: What this code accomplishes
- **Problem Domain**: What real-world problem this solves
- **Use Cases**: Where and when you'd use this in production
- **Code Quality**: Initial assessment of structure and style

🧠 **LEARNING OBJECTIVES**
- **Programming Concepts**: What you'll learn by studying this code
- **Skills Development**: Abilities gained from understanding this implementation
- **Knowledge Transfer**: How this applies to other programming challenges

🏗️ **ARCHITECTURE & DESIGN ANALYSIS**
- **Overall Structure**: How the code is organized and why
- **Design Patterns**: Recognized software engineering patterns used
- **Data Flow**: How information moves through the system
- **Architectural Decisions**: Why the code is structured this way

🔍 **LINE-BY-LINE EDUCATIONAL BREAKDOWN**
For each significant section/function:
- **📝 Purpose**: What this section accomplishes
- **📥 Inputs**: Parameters, their types, and expected values
- **⚙️ Process**: Step-by-step logic explanation
- **📤 Outputs**: Return values and side effects
- **🛡️ Error Handling**: How problems are managed
- **💡 Programming Concept**: The principle being demonstrated

⚙️ **TECHNICAL DEEP DIVE**
- **Time Complexity**: Big O analysis with explanation
- **Space Complexity**: Memory usage patterns
- **Performance Characteristics**: Speed and efficiency analysis
- **Memory Management**: How resources are handled
- **Scalability**: How it performs with larger inputs

🌍 **REAL-WORLD ANALOGY**
- Compare the code logic to familiar everyday processes
- Step-by-step parallel between code execution and real-world workflow
- Why this analogy helps understand the programming concepts

💻 **TECHNOLOGY & TOOLS ANALYSIS**
- **Language Features**: Specific ${lang} capabilities utilized
- **Libraries/Frameworks**: External tools and why they're chosen
- **Platform Considerations**: Environment-specific aspects
- **Dependencies**: What this code relies on

🔄 **EXECUTION FLOW VISUALIZATION**
- **Step 1-N**: Trace through the code execution path
- **Decision Points**: Where the code makes choices
- **Loop Analysis**: How iterations work
- **Function Calls**: How different parts interact

⚡ **OPTIMIZATION OPPORTUNITIES**
- **Current Inefficiencies**: Areas that could be improved
- **Performance Enhancements**: Specific optimization suggestions
- **Alternative Approaches**: Different ways to solve the same problem
- **Trade-offs**: Pros and cons of different implementation choices

🔒 **SECURITY & BEST PRACTICES**
- **Security Considerations**: Potential vulnerabilities or protections
- **Code Quality Assessment**: Readability, maintainability, reliability
- **${lang} Best Practices**: Language-specific conventions followed
- **Professional Standards**: Industry-standard approaches demonstrated

🎯 **EDUCATIONAL INSIGHTS**
- **Design Principles**: Software engineering concepts demonstrated
- **Problem-Solving Approach**: How the developer thought through the challenge
- **Reusable Patterns**: Code structures you can apply elsewhere
- **Common Pitfalls**: What this code avoids and how

🚀 **LEARNING EXTENSIONS**
- **Related Concepts**: Additional topics to explore
- **Practice Exercises**: Suggested modifications to try
- **Advanced Variations**: More complex implementations
- **Real-World Applications**: Where you'd encounter similar code

📚 **COMPREHENSIVE ANALYSIS SUMMARY**
- **Key Programming Concepts Learned**: Complete list of principles covered
- **Technical Skills Developed**: Specific abilities gained from this analysis
- **Code Reading Skills**: How to approach understanding complex code
- **Pattern Recognition**: Design patterns and structures identified
- **Professional Applications**: How this knowledge applies in software development
- **Foundation for Future Learning**: What advanced topics this prepares you for
- **Code Quality Lessons**: Standards and practices demonstrated

🎯 **CODE COMPREHENSION CHECK**
End with 3-5 questions to test understanding of the code structure, logic, and underlying concepts.`,

      debug: `You are RAVEN, an expert debugging instructor. Provide comprehensive debugging education for this ${lang} code:
${contextAwareInput}

🎓 EDUCATIONAL DEBUGGING SESSION - Teach debugging methodology step-by-step.

FORMAT YOUR RESPONSE WITH THESE COMPREHENSIVE SECTIONS:

🔍 **INITIAL CODE ANALYSIS**
- First impression of the code structure
- Potential problem areas identified by visual inspection
- Code quality assessment

🔴 **ISSUES FOUND**
For each issue discovered:
- **Issue #**: Brief description
- **Location**: Where exactly in the code
- **Type**: Syntax error, logic error, runtime error, etc.
- **Severity**: Critical, Major, Minor
- **Impact**: What happens when this error occurs
- **Root Cause**: Why this error exists

🧠 **DEBUGGING METHODOLOGY**
- **Step 1**: How to identify this type of error
- **Step 2**: Debugging tools and techniques to use
- **Step 3**: Testing strategies to confirm the fix
- **Professional Tip**: Industry best practices for this error type

✅ **FIXED CODE**
Complete corrected ${lang} code with educational comments:
${lang === 'python' ? `# 🔧 FIX: Explain what was changed and why
# 🎯 IMPROVEMENT: How this prevents the original error
# 📚 CONCEPT: Programming principle demonstrated` :
`// 🔧 FIX: Explain what was changed and why
// 🎯 IMPROVEMENT: How this prevents the original error
// 📚 CONCEPT: Programming principle demonstrated`}

🛡️ **PREVENTION STRATEGIES**
- **Code Review Checklist**: What to look for to prevent these errors
- **Testing Approaches**: How to catch these issues early
- **Development Practices**: Coding habits that prevent these problems
- **Tools & Linters**: Automated ways to detect similar issues

🌍 **REAL-WORLD DEBUGGING ANALOGY**
- Compare debugging process to detective work or medical diagnosis
- Step-by-step parallel between code debugging and real-world problem-solving
- Why systematic debugging approaches work better than random fixes

🧪 **TESTING & VERIFICATION**
- How to test that the fixes actually work
- Edge cases to consider
- Regression testing recommendations

📈 **DEBUGGING SKILLS DEVELOPED**
- **Pattern Recognition**: Types of errors to watch for
- **Systematic Thinking**: Methodical debugging approach
- **Tool Usage**: Debugging tools and techniques learned
- **Prevention Mindset**: How to write more robust code

📚 **COMPREHENSIVE DEBUGGING SUMMARY**
- **Errors Fixed**: Complete list of all issues resolved
- **Debugging Techniques Used**: Methods and tools applied
- **Key Learning Points**: Most important takeaways
- **Prevention Strategies**: How to avoid similar issues
- **Professional Growth**: Skills developed through this debugging session
- **Advanced Debugging**: Next-level techniques to explore

🎯 **DEBUGGING MASTERY CHECK**
End with 3-5 questions to test understanding of the debugging process and prevention strategies.`,

      optimize: `You are RAVEN, an expert performance optimization instructor. Provide comprehensive optimization education for this ${lang} code:
${contextAwareInput}

🎓 EDUCATIONAL OPTIMIZATION SESSION - Teach performance optimization methodology step-by-step.

FORMAT YOUR RESPONSE WITH THESE COMPREHENSIVE SECTIONS:

📊 **PERFORMANCE ANALYSIS**
- **Current Bottlenecks**: Identify slow or inefficient parts
- **Time Complexity**: Current Big O notation analysis
- **Space Complexity**: Memory usage assessment
- **Resource Utilization**: CPU, memory, I/O analysis
- **Scalability Issues**: How performance degrades with larger inputs

🔬 **OPTIMIZATION METHODOLOGY**
- **Profiling Approach**: How to measure performance scientifically
- **Benchmarking Strategy**: Setting up proper performance tests
- **Optimization Priorities**: Which improvements provide most benefit
- **Trade-offs**: Performance vs readability vs maintainability

🚀 **OPTIMIZED CODE**
Complete optimized ${lang} code with detailed educational comments:
${lang === 'python' ? `# ⚡ OPTIMIZATION: Specific technique used and why
# 📈 IMPROVEMENT: Expected performance gain
# 🧠 CONCEPT: Computer science principle applied
# ⚖️ TRADE-OFF: What we gained vs what we might have sacrificed` :
`// ⚡ OPTIMIZATION: Specific technique used and why
// 📈 IMPROVEMENT: Expected performance gain
// 🧠 CONCEPT: Computer science principle applied
// ⚖️ TRADE-OFF: What we gained vs what we might have sacrificed`}

📈 **PERFORMANCE IMPROVEMENTS**
For each optimization made:
- **Technique Used**: Specific optimization method
- **Before vs After**: Concrete performance comparison
- **Why It Works**: Computer science principles behind the improvement
- **When to Use**: Scenarios where this optimization is beneficial
- **When NOT to Use**: Cases where this optimization might backfire

🌍 **REAL-WORLD OPTIMIZATION ANALOGY**
- Compare code optimization to optimizing traffic flow, factory assembly lines, or restaurant operations
- Explain how efficiency principles apply across domains
- Show how small improvements can compound into major gains

🧮 **ALGORITHMIC IMPROVEMENTS**
- **Algorithm Selection**: Why certain algorithms are faster
- **Data Structure Choices**: How the right data structure improves performance
- **Caching Strategies**: When and how to store computed results
- **Lazy Loading**: Deferring expensive operations until needed

🔧 **OPTIMIZATION TECHNIQUES DEMONSTRATED**
- **Micro-optimizations**: Small code-level improvements
- **Macro-optimizations**: Architecture and algorithm changes
- **Memory Optimization**: Reducing memory footprint
- **I/O Optimization**: Efficient data access patterns

⚡ **ADVANCED OPTIMIZATION CONCEPTS**
- **Parallel Processing**: Opportunities for concurrency
- **Asynchronous Operations**: Non-blocking execution patterns
- **Batch Processing**: Grouping operations for efficiency
- **Resource Pooling**: Reusing expensive objects

🎯 **OPTIMIZATION BEST PRACTICES**
- **Measure First**: Always profile before optimizing
- **Premature Optimization**: When NOT to optimize
- **Maintainable Performance**: Keeping code readable while fast
- **Documentation**: Recording optimization decisions and rationale

📚 **COMPREHENSIVE OPTIMIZATION SUMMARY**
- **Performance Gains Achieved**: Quantified improvements
- **Optimization Techniques Used**: Complete list of methods applied
- **Computer Science Concepts**: Algorithms and data structures knowledge gained
- **Professional Skills**: Performance analysis and optimization skills developed
- **Scalability Improvements**: How the code now handles growth
- **Future Optimization Opportunities**: Areas for continued improvement
- **Industry Applications**: Where these optimization techniques are crucial

🎯 **OPTIMIZATION MASTERY CHECK**
End with 3-5 questions to test understanding of performance analysis and optimization techniques.`,

      convert: `You are RAVEN, an expert programming language instructor. Provide comprehensive code conversion education from ${lang} to ${targetLang || 'javascript'}:
${contextAwareInput}

🎓 EDUCATIONAL LANGUAGE CONVERSION - Teach cross-language programming concepts step-by-step.

FORMAT YOUR RESPONSE WITH THESE COMPREHENSIVE SECTIONS:

🔄 **CONVERSION OVERVIEW**
- **Source Language**: ${lang} characteristics and strengths
- **Target Language**: ${targetLang || 'javascript'} characteristics and strengths
- **Conversion Complexity**: Easy/Medium/Complex and why
- **Key Challenges**: Main differences to address

🧠 **LANGUAGE PARADIGM COMPARISON**
- **Syntax Differences**: How the languages express the same concepts
- **Type Systems**: Static vs dynamic typing implications
- **Memory Management**: Garbage collection vs manual management
- **Execution Models**: Interpreted vs compiled vs JIT

✨ **CONVERTED CODE**
Complete ${targetLang || 'javascript'} code with educational migration comments:
${(targetLang || 'javascript') === 'python' ? `# 🔄 CONVERSION: How this ${lang} concept translates to Python
# 🎯 ADAPTATION: Language-specific best practices applied
# 📚 CONCEPT: Programming principle that transcends languages
# ⚡ OPTIMIZATION: ${targetLang}-specific improvements made` :
`// 🔄 CONVERSION: How this ${lang} concept translates to ${targetLang || 'javascript'}
// 🎯 ADAPTATION: Language-specific best practices applied
// 📚 CONCEPT: Programming principle that transcends languages
// ⚡ OPTIMIZATION: ${targetLang || 'javascript'}-specific improvements made`}

⚡ **LINE-BY-LINE CONVERSION ANALYSIS**
For each significant change:
- **Original ${lang} Code**: The source code section
- **${targetLang || 'javascript'} Equivalent**: The converted version
- **Why Different**: Language-specific reasons for the change
- **Alternative Approaches**: Other ways to achieve the same result
- **Best Practice**: Which approach is preferred and why

🌍 **LANGUAGE PHILOSOPHY COMPARISON**
- Compare ${lang} and ${targetLang || 'javascript'} to different spoken languages or tools
- Explain how language design influences problem-solving approaches
- Show how the same logic can be expressed differently

🔧 **LANGUAGE-SPECIFIC FEATURES**
- **${lang} Features**: Unique capabilities of the source language
- **${targetLang || 'javascript'} Features**: Unique capabilities of the target language
- **Feature Mapping**: How to achieve source language features in target language
- **Idiomatic Patterns**: Writing code that feels natural in each language

📚 **CONCEPTS THAT TRANSFER**
- **Universal Programming Concepts**: Logic, algorithms, patterns that work in both languages
- **Cross-Language Skills**: Knowledge that applies regardless of syntax
- **Problem-Solving Approaches**: How the core thinking remains the same

🚀 **MIGRATION STRATEGIES**
- **Gradual Conversion**: How to migrate large codebases
- **Testing Approach**: Ensuring functionality is preserved
- **Performance Considerations**: Speed differences between languages
- **Library Ecosystem**: Finding equivalent tools and frameworks

💡 **LEARNING OPPORTUNITIES**
- **New Concepts**: What ${targetLang || 'javascript'} teaches that ${lang} doesn't emphasize
- **Different Perspectives**: How each language approaches problems
- **Career Benefits**: Why knowing multiple languages is valuable

📚 **COMPREHENSIVE CONVERSION SUMMARY**
- **Conversion Techniques Used**: Methods for translating between languages
- **Key Differences Addressed**: Major language disparities handled
- **Programming Concepts Reinforced**: Universal principles demonstrated
- **Language-Specific Knowledge**: New syntax and features learned
- **Cross-Platform Skills**: Abilities gained for working with multiple languages
- **Professional Applications**: When and why to choose each language
- **Further Learning**: Advanced features in ${targetLang || 'javascript'} to explore

🎯 **MULTI-LANGUAGE MASTERY CHECK**
End with 3-5 questions to test understanding of language differences and conversion principles.`
    };

    try {
      const response = await fetch('/api/ai/python', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-session-token': sessionStorage.getItem('raven-session') || '',
        },
        body: JSON.stringify({
          message: prompts[aiMode] || prompts.generate,
          history: []
        })
      });


      if (!response.ok) {
        const errorData = await response.json();
        setOutput(`❌ Error: ${errorData.message || 'Unknown error occurred'}`);
        return;
      }

      const data = await response.json();
      const fullResponse = data.message || 'No response received';

      // Display full response without streaming
      setOutput(fullResponse);

      // Update workspace context with generated code
      if (aiMode === 'generate') {
        setWorkspaceContext(prev => ({
          ...prev,
          lastGeneratedCode: fullResponse
        }));
      }
    } catch (error: any) {
      setOutput(`❌ Connection Error: ${error.message}\n\nPlease check your internet connection and try again.`);
    } finally {
      setIsProcessing(false);
    }
  }, []);

  // Enhanced input handling with better debouncing and syntax checking
  const handleInputChange = useCallback((value: string, isCode: boolean) => {
    if (isCode) {
      setCodeInput(value);
      // Check syntax for JavaScript/TypeScript code input
      if (language === 'javascript' || language === 'typescript') {
        const errors = checkSyntax(value);
        setSyntaxErrors(errors);
      }
    } else {
      setEnglishInput(value);
      setSyntaxErrors([]); // Clear syntax errors for English input
    }

    // Clear previous timeout
    if (debounceRef.current) clearTimeout(debounceRef.current);

    // Show typing indicator immediately
    if (value.trim() && !isProcessing) {
      setOutput('Analyzing your input...');
    }

    // Optimized debounce - shorter for better UX
    debounceRef.current = setTimeout(() => {
      const input = mode === 'generate' ? (isCode ? '' : value) : (isCode ? value : codeInput);
      if (input.trim() && input.length > 3) { // Minimum length check
        processWithAI(input, mode, language, targetLanguage);
      } else if (!input.trim()) {
        setOutput(''); // Clear output if input is empty
        setExecutionResult(''); // Clear execution result
      }
    }, 800); // Reduced from 1000ms
  }, [mode, language, targetLanguage, codeInput, isProcessing, processWithAI]);

  // Handle mode change
  const handleModeChange = (newMode: string) => {
    setMode(newMode);
    const input = newMode === 'generate' ? englishInput : codeInput;
    if (input.trim()) {
      processWithAI(input, newMode, language, targetLanguage);
    }
  };

  // Enhanced copy output to clipboard
  const copyOutput = useCallback(async () => {
    try {
      // Strip HTML tags and copy plain text
      const plainText = output.replace(/<[^>]*>/g, '');
      await navigator.clipboard.writeText(plainText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch (error) {
      console.error('Failed to copy:', error);
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = output.replace(/<[^>]*>/g, '');
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  }, [output]);

  // Keyboard shortcuts for enhanced UX
  useEffect(() => {
    const handleKeyboard = (e: KeyboardEvent) => {
      // Ctrl/Cmd + Enter to trigger AI processing
      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault();
        const input = mode === 'generate' ? englishInput : codeInput;
        if (input.trim() && !isProcessing) {
          processWithAI(input, mode, language, targetLanguage);
        }
      }

      // Ctrl/Cmd + K to clear output
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setOutput('');
      }

      // Ctrl/Cmd + C to copy output (when no text is selected)
      if ((e.ctrlKey || e.metaKey) && e.key === 'c' && !window.getSelection()?.toString() && output) {
        copyOutput();
      }
    };

    document.addEventListener('keydown', handleKeyboard);
    return () => document.removeEventListener('keydown', handleKeyboard);
  }, [mode, englishInput, codeInput, language, targetLanguage, isProcessing, output, processWithAI, copyOutput]);

  // Move output to practice editor
  const moveToEditor = () => {
    setPracticeCode(output);
  };

  // Analyze practice code
  const analyzePracticeCode = () => {
    if (practiceCode.trim()) {
      setCodeInput(practiceCode);
      const analysisMode = mode === 'generate' ? 'explain' : mode;
      setMode(analysisMode);
      processWithAI(practiceCode, analysisMode, language, targetLanguage);
    }
  };

  // Send message to AI Agent
  const sendAgentMessage = async () => {
    if (!agentInput.trim() || isAgentProcessing) return;

    const userMessage = {
      id: Date.now().toString(),
      type: 'user' as const,
      content: agentInput.trim(),
      timestamp: new Date()
    };

    setAgentMessages(prev => [...prev, userMessage]);
    setAgentInput('');
    setIsAgentProcessing(true);

    // Add processing indicator
    const processingMessage = {
      id: (Date.now() + 1).toString(),
      type: 'agent' as const,
      content: '',
      timestamp: new Date(),
      isProcessing: true
    };
    setAgentMessages(prev => [...prev, processingMessage]);

    try {
      // Create conversation context from recent messages
      const recentMessages = agentMessages.slice(-8).map(msg => ({
        role: msg.type === 'user' ? 'user' : 'assistant',
        content: msg.content
      }));

      const response = await fetch('/api/ai/python', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: `You are RAVEN, a friendly and enthusiastic coding companion. You have personality, use emojis, and love helping people learn to code.

Current context:
- User is working with ${language} programming
- They are learning in an interactive coding environment
- Keep responses conversational, helpful, and encouraging
- Use code examples when helpful
- Ask follow-up questions to keep the conversation engaging

User message: ${userMessage.content}`,
          history: recentMessages
        })
      });

      if (!response.ok) {
        throw new Error('Failed to get response from AI');
      }

      const data = await response.json();

      // Replace processing message with actual response
      setAgentMessages(prev => prev.filter(msg => msg.id !== processingMessage.id).concat({
        id: processingMessage.id,
        type: 'agent',
        content: data.message,
        timestamp: new Date(),
        isProcessing: false
      }));

    } catch (error: any) {
      // Replace processing message with error
      setAgentMessages(prev => prev.filter(msg => msg.id !== processingMessage.id).concat({
        id: processingMessage.id,
        type: 'agent',
        content: `😅 Oops! I'm having trouble connecting right now. ${error.message}`,
        timestamp: new Date(),
        isProcessing: false
      }));
    } finally {
      setIsAgentProcessing(false);
    }
  };

  // Format timestamp for display
  const formatTimestamp = (date: Date | string) => {
    const dateObj = date instanceof Date ? date : new Date(date);
    return dateObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  // Reset everything
  const reset = () => {
    setEnglishInput('');
    setCodeInput('');
    setOutput('');
    setPracticeCode('');
    setMode('generate');
  };

  // Enhanced format output with better spacing and colors
  const formatOutput = (text: string): JSX.Element[] => {
    if (!text) return [<span key="0" style={{ color: colors.muted, fontStyle: 'italic' }}>// AI output will appear here...</span>];

    const lines = text.split('\n');
    let inCodeBlock = false;
    let codeBlockLang = 'python';
    let codeBuffer: string[] = [];
    let lineCounter = 1;
    const elements: JSX.Element[] = [];

    lines.forEach((line, i) => {
      // Section headers with emojis - enhanced styling
      if (line.match(/^[🎯💻🔍🌍💡📋🔴✅🛡️📊🚀📈🔄✨⚡🧪⚠️❌🛠️📁🗄️🔌]/)) {
        elements.push(
          <div key={i} style={{
            color: colors.primary,
            fontWeight: 700,
            fontSize: '15px',
            marginTop: '20px',
            marginBottom: '12px',
            borderLeft: `3px solid ${colors.variable}`,
            paddingLeft: '12px',
            background: `${colors.panelBg}80`,
            padding: '8px 12px',
            borderRadius: '4px'
          }}>
            {line}
          </div>
        );
        return;
      }

      // Code block detection
      if (line.startsWith('```')) {
        if (!inCodeBlock) {
          inCodeBlock = true;
          const match = line.match(/```(\w+)?/);
          codeBlockLang = match?.[1] || language;
          elements.push(
            <div key={`header-${i}`} style={{
              marginTop: '16px',
              marginBottom: '8px',
              color: colors.muted,
              fontSize: '11px',
              fontWeight: 600
            }}>
              📝 {codeBlockLang.toUpperCase()} CODE:
            </div>
          );
        } else {
          // End of code block - render with react-syntax-highlighter
          inCodeBlock = false;
          if (codeBuffer.length > 0) {
            elements.push(
              <div key={`code-${i}`} style={{
                marginLeft: '12px',
                borderLeft: `3px solid ${colors.success}`,
                borderRadius: '0 4px 4px 0',
                overflow: 'hidden',
                background: 'rgba(10, 10, 10, 0.9)',
                boxShadow: 'inset 0 0 10px rgba(0, 255, 0, 0.1)'
              }}>
                <SyntaxHighlighter
                  language={codeBlockLang}
                  style={customSyntaxTheme}
                  showLineNumbers={true}
                  lineNumberStyle={{
                    color: '#404040',
                    fontSize: '11px',
                    minWidth: '30px',
                    paddingRight: '12px'
                  }}
                  customStyle={{
                    margin: 0,
                    background: 'transparent',
                    border: 'none',
                    boxShadow: 'none',
                    fontSize: '14px',
                    padding: '16px 20px'
                  }}
                >
                  {codeBuffer.join('\n')}
                </SyntaxHighlighter>
              </div>
            );
            codeBuffer = [];
          }
          elements.push(
            <div key={`divider-${i}`} style={{
              marginBottom: '16px',
              height: '1px',
              background: `linear-gradient(90deg, ${colors.border}, transparent)`,
              margin: '12px 0'
            }} />
          );
        }
        return;
      }

      // Collect code lines
      if (inCodeBlock) {
        codeBuffer.push(line);
        return;
      }

      // What/How/Why explanations with special highlighting
      if (line.match(/^(WHAT|HOW|WHY|EXPLANATION|BREAKDOWN|CONCEPT):/i)) {
        const [label, ...rest] = line.split(':');
        elements.push(
          <div key={i} style={{
            marginTop: '14px',
            marginBottom: '8px',
            padding: '8px 12px',
            background: `${colors.variable}20`,
            borderLeft: `4px solid ${colors.variable}`,
            borderRadius: '0 6px 6px 0'
          }}>
            <span style={{ color: colors.variable, fontWeight: 700, fontSize: '12px' }}>
              {label.trim()}:
            </span>
            <span style={{ color: colors.primary, marginLeft: '8px', lineHeight: '1.6' }}>
              {rest.join(':').trim()}
            </span>
          </div>
        );
        return;
      }

      // Comments and explanations (lines starting with #, //, or "Note:")
      if (line.match(/^(\s*)(#|\/\/|Note:|Tip:|Important:)/i)) {
        elements.push(
          <div key={i} style={{
            color: colors.comment,
            fontStyle: 'italic',
            fontSize: '12px',
            lineHeight: '1.7',
            padding: '4px 8px',
            background: `${colors.comment}10`,
            borderRadius: '4px',
            margin: '4px 0'
          }}>
            {line}
          </div>
        );
        return;
      }

      // Directory tree with better styling
      if (line.match(/^[│├└]/)) {
        elements.push(
          <div key={i} style={{
            color: colors.variable,
            fontFamily: 'Monaco, monospace',
            fontSize: '12px',
            lineHeight: '1.4',
            padding: '2px 0'
          }}>
            {line}
          </div>
        );
        return;
      }

      // API endpoints with enhanced styling
      if (line.match(/^\[(GET|POST|PUT|DELETE|PATCH)\]/)) {
        const method = line.match(/\[(GET|POST|PUT|DELETE|PATCH)\]/)?.[1];
        const methodColors: Record<string, string> = {
          GET: colors.success,
          POST: colors.variable,
          PUT: colors.type,
          DELETE: colors.error,
          PATCH: colors.warning
        };
        const color = methodColors[method || 'GET'];
        elements.push(
          <div key={i} style={{
            padding: '6px 12px',
            margin: '4px 0',
            background: `${color}15`,
            borderLeft: `3px solid ${color}`,
            borderRadius: '0 4px 4px 0'
          }}>
            <span style={{ color, fontWeight: 700, fontSize: '11px' }}>[{method}]</span>
            <span style={{ color: colors.primary, marginLeft: '8px', fontFamily: 'monospace' }}>
              {line.replace(/\[.*?\]/, '')}
            </span>
          </div>
        );
        return;
      }

      // Bullet points with better indentation
      if (line.trim().match(/^[•\-\*]/)) {
        const indent = line.search(/[•\-\*]/);
        elements.push(
          <div key={i} style={{
            color: colors.secondary,
            paddingLeft: `${20 + indent * 8}px`,
            lineHeight: '1.7',
            margin: '3px 0'
          }}>
            <span style={{ color: colors.variable, fontWeight: 600, marginRight: '6px' }}>
              {line.trim()[0]}
            </span>
            {line.trim().substring(1).trim()}
          </div>
        );
        return;
      }

      // Error messages
      if (line.match(/^(Error|ERROR|❌)/i)) {
        elements.push(
          <div key={i} style={{
            color: colors.error,
            background: `${colors.error}20`,
            padding: '8px 12px',
            borderLeft: `4px solid ${colors.error}`,
            borderRadius: '0 6px 6px 0',
            margin: '8px 0',
            fontWeight: 500
          }}>
            {line}
          </div>
        );
        return;
      }

      // Success messages
      if (line.match(/^(Success|SUCCESS|✅)/i)) {
        elements.push(
          <div key={i} style={{
            color: colors.success,
            background: `${colors.success}20`,
            padding: '8px 12px',
            borderLeft: `4px solid ${colors.success}`,
            borderRadius: '0 6px 6px 0',
            margin: '8px 0',
            fontWeight: 500
          }}>
            {line}
          </div>
        );
        return;
      }

      // Warning messages
      if (line.match(/^(Warning|WARNING|⚠️)/i)) {
        elements.push(
          <div key={i} style={{
            color: colors.warning,
            background: `${colors.warning}20`,
            padding: '8px 12px',
            borderLeft: `4px solid ${colors.warning}`,
            borderRadius: '0 6px 6px 0',
            margin: '8px 0',
            fontWeight: 500
          }}>
            {line}
          </div>
        );
        return;
      }

      // Empty lines for spacing
      if (line.trim() === '') {
        elements.push(<div key={i} style={{ height: '8px' }} />);
        return;
      }

      // Regular text with better spacing
      elements.push(
        <div key={i} style={{
          color: colors.gray,
          lineHeight: '1.7',
          margin: '2px 0',
          fontSize: '13px'
        }}>
          {line}
        </div>
      );
    });

    // Handle any remaining code buffer if still in code block (incomplete code block)
    if (inCodeBlock && codeBuffer.length > 0) {
      elements.push(
        <div key="code-final" style={{
          marginLeft: '12px',
          borderLeft: `3px solid ${colors.success}`,
          borderRadius: '0 4px 4px 0',
          overflow: 'hidden',
          background: 'rgba(10, 10, 10, 0.9)',
          boxShadow: 'inset 0 0 10px rgba(0, 255, 0, 0.1)'
        }}>
          <SyntaxHighlighter
            language={codeBlockLang}
            style={customSyntaxTheme}
            showLineNumbers={true}
            lineNumberStyle={{
              color: '#404040',
              fontSize: '11px',
              minWidth: '30px',
              paddingRight: '12px'
            }}
            customStyle={{
              margin: 0,
              background: 'transparent',
              border: 'none',
              boxShadow: 'none',
              fontSize: '14px',
              padding: '16px 20px'
            }}
          >
            {codeBuffer.join('\n')}
          </SyntaxHighlighter>
        </div>
      );
    }

    return elements;
  };

  return (
    <>
      {/* CSS Animations */}
      <style>
        {`
          @keyframes pulse {
            0%, 100% { opacity: 1; transform: scale(1); }
            50% { opacity: 0.5; transform: scale(1.2); }
          }
          @keyframes fadeInOut {
            0%, 100% { opacity: 0.7; }
            50% { opacity: 1; }
          }
          @keyframes slideIn {
            from { opacity: 0; transform: translateY(-10px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .code-highlight {
            animation: slideIn 0.3s ease-out;
          }
        `}
      </style>
      <div style={{
        position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: colors.bg,
      color: colors.primary,
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden'
    }}>
      {/* Header */}
      <div style={{
        background: colors.panelBg,
        borderBottom: `1px solid ${colors.border}`,
        padding: '12px 20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexShrink: 0
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          {/* Logo (clickable for reset) */}
          <div onClick={reset} style={{ cursor: 'pointer' }}>
            <div style={{ fontSize: '24px', fontWeight: 800, letterSpacing: '3px', color: colors.primary }}>
              RAVEN
            </div>
            <div style={{ fontSize: '8px', color: colors.muted, letterSpacing: '1px', marginTop: '-2px' }}>
              TERMINAL
            </div>
          </div>

          {/* Mode selector */}
          <div style={{ display: 'flex', gap: '4px', background: colors.bg, padding: '4px', borderRadius: '6px' }}>
            {aiModes.map(m => (
              <button
                key={m.id}
                onClick={() => handleModeChange(m.id)}
                title={`${m.name}: ${m.description}`}
                style={{
                  background: mode === m.id ? colors.border : colors.panelBg,
                  border: `1px solid ${mode === m.id ? colors.borderLight : colors.border}`,
                  borderRadius: '4px',
                  padding: '6px 10px',
                  color: mode === m.id ? colors.primary : colors.secondary,
                  cursor: 'pointer',
                  fontSize: '16px',
                  transition: 'all 0.2s'
                }}
              >
                {m.icon}
              </button>
            ))}
          </div>
        </div>

        {/* Right controls */}
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          {/* Theme Color Selector */}
          <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
            <span style={{ fontSize: '10px', color: colors.muted }}>THEME:</span>
            <div style={{ display: 'flex', gap: '4px' }}>
              {Object.entries(colorThemes).map(([key, theme]) => (
                <button
                  key={key}
                  onClick={() => setCurrentTheme(key as keyof typeof colorThemes)}
                  title={theme.name}
                  style={{
                    width: '24px',
                    height: '24px',
                    borderRadius: '4px',
                    border: currentTheme === key ? `2px solid ${colors.primary}` : `1px solid ${colors.border}`,
                    background: key === 'green' ? '#00ff00' :
                                key === 'red' ? '#ff3333' :
                                key === 'orange' ? '#ff9933' :
                                key === 'purple' ? '#cc66ff' : '#3399ff',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    transform: currentTheme === key ? 'scale(1.1)' : 'scale(1)'
                  }}
                />
              ))}
            </div>
          </div>

          {/* Language selector */}
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            style={{
              background: colors.panelBg,
              border: `1px solid ${colors.border}`,
              borderRadius: '6px',
              padding: '6px 12px',
              color: colors.primary,
              fontSize: '12px',
              cursor: 'pointer'
            }}
          >
            {languages.map(l => (
              <option key={l.id} value={l.id}>{l.name}</option>
            ))}
          </select>

          {/* Target language for convert mode */}
          {mode === 'convert' && (
            <>
              <span style={{ color: colors.muted }}>→</span>
              <select
                value={targetLanguage}
                onChange={(e) => setTargetLanguage(e.target.value)}
                style={{
                  background: colors.panelBg,
                  border: `1px solid ${colors.border}`,
                  borderRadius: '6px',
                  padding: '6px 12px',
                  color: colors.primary,
                  fontSize: '12px',
                  cursor: 'pointer'
                }}
              >
                {languages.map(l => (
                  <option key={l.id} value={l.id}>{l.name}</option>
                ))}
              </select>
            </>
          )}


          {/* Dictionary button */}
          <button
            onClick={() => setShowDictionary(!showDictionary)}
            style={{
              background: showDictionary ? colors.border : colors.panelBg,
              border: `1px solid ${colors.border}`,
              borderRadius: '6px',
              padding: '6px 12px',
              color: colors.primary,
              fontSize: '12px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            {Icons.dictionary}
            <span>Dictionary</span>
          </button>

          {/* Help & About buttons */}
          <button
            onClick={() => setShowHelp(true)}
            style={{
              background: colors.panelBg,
              border: `1px solid ${colors.border}`,
              borderRadius: '6px',
              padding: '6px 12px',
              color: colors.primary,
              fontSize: '12px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '4px'
            }}
          >
            {Icons.help}
            <span>Help</span>
          </button>

          <button
            onClick={() => setShowAbout(true)}
            style={{
              background: colors.panelBg,
              border: `1px solid ${colors.border}`,
              borderRadius: '6px',
              padding: '6px 12px',
              color: colors.primary,
              fontSize: '12px',
              cursor: 'pointer'
            }}
          >
            About
          </button>

          {/* Close button */}
          {onClose && (
            <button
              onClick={onClose}
              style={{
                background: colors.panelBg,
                border: `1px solid ${colors.border}`,
                borderRadius: '6px',
                padding: '6px 12px',
                color: colors.error,
                fontSize: '16px',
                cursor: 'pointer'
              }}
            >
              {Icons.close}
            </button>
          )}
        </div>
      </div>


      {/* Dictionary Dropdown */}
      {showDictionary && (
        <div style={{
          position: 'absolute',
          top: '60px',
          right: '20px',
          background: colors.panelBg,
          border: `1px solid ${colors.border}`,
          borderRadius: '8px',
          padding: '12px',
          width: '320px',
          maxHeight: '400px',
          overflowY: 'auto',
          zIndex: 100,
          boxShadow: '0 4px 12px rgba(0,0,0,0.5)'
        }}>
          <div style={{ fontSize: '10px', color: colors.secondary, marginBottom: '12px', fontWeight: 600, letterSpacing: '1px' }}>
            {languages.find(l => l.id === language)?.name} QUICK REFERENCE
          </div>
          {Object.entries(languageDictionary[language] || {}).map(([concept, code]) => (
            <div key={concept} style={{ marginBottom: '4px' }}>
              <button
                onClick={() => setSelectedConcept(selectedConcept === concept ? '' : concept)}
                style={{
                  width: '100%',
                  textAlign: 'left',
                  background: selectedConcept === concept ? colors.border : 'transparent',
                  border: 'none',
                  padding: '8px',
                  color: colors.primary,
                  fontSize: '12px',
                  cursor: 'pointer',
                  borderRadius: '4px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              >
                <span>{concept}</span>
                <span style={{ color: colors.muted }}>{selectedConcept === concept ? '−' : '+'}</span>
              </button>
              {selectedConcept === concept && (
                <div style={{
                  background: colors.bg,
                  border: `1px solid ${colors.border}`,
                  borderRadius: '4px',
                  padding: '12px',
                  margin: '4px 0 8px 0',
                  fontFamily: 'monospace',
                  fontSize: '11px',
                  lineHeight: '1.5'
                }}>
                  {highlightCode(code, language)}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Main Content - Dynamic Column Layout */}
      <div style={{
        flex: 1,
        display: 'grid',
        gridTemplateColumns: isRavenCollapsed ? '1fr 2fr 60px' : '1fr 1.3fr 1fr',
        gap: '12px',
        padding: '12px',
        overflow: 'hidden',
        transition: 'grid-template-columns 0.3s ease'
      }}>
        {/* Left Panel - Input */}
        <div style={{
          background: colors.panelBg,
          borderRadius: '8px',
          border: `1px solid ${colors.border}`,
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden'
        }}>
          <div style={{
            padding: '10px 14px',
            borderBottom: `1px solid ${colors.border}`,
            fontSize: '10px',
            fontWeight: 600,
            color: colors.secondary,
            letterSpacing: '1px'
          }}>
            {mode === 'generate' ? 'DESCRIBE IN ENGLISH' : 'PASTE CODE'}
          </div>
          <textarea
            value={mode === 'generate' ? englishInput : codeInput}
            onChange={(e) => handleInputChange(e.target.value, mode !== 'generate')}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
                e.preventDefault();
                if ((mode === 'generate' ? englishInput : codeInput).trim()) {
                  handleSendMessage();
                }
              }
            }}
            placeholder={mode === 'generate' ? 'Describe what you want to build...' : 'Paste your code here...'}
            style={{
              flex: 1,
              background: 'transparent',
              border: 'none',
              padding: '14px',
              color: colors.primary,
              fontSize: '13px',
              lineHeight: '1.5',
              resize: 'none',
              outline: 'none',
              fontFamily: mode === 'generate' ? 'inherit' : 'monospace'
            }}
          />
          <div style={{
            padding: '10px 14px',
            borderTop: `1px solid ${colors.border}`,
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center',
            gap: '8px'
          }}>
            <span style={{
              fontSize: '11px',
              color: colors.muted
            }}>
              Press Ctrl+Enter to send
            </span>
            <button
              onClick={() => {
                if ((mode === 'generate' ? englishInput : codeInput).trim()) {
                  handleSendMessage();
                }
              }}
              disabled={!(mode === 'generate' ? englishInput : codeInput).trim() || isProcessing}
              style={{
                background: ((mode === 'generate' ? englishInput : codeInput).trim() && !isProcessing)
                  ? colors.success
                  : colors.border,
                color: ((mode === 'generate' ? englishInput : codeInput).trim() && !isProcessing)
                  ? '#000'
                  : colors.muted,
                border: 'none',
                borderRadius: '6px',
                padding: '8px 20px',
                fontSize: '13px',
                fontWeight: 600,
                cursor: ((mode === 'generate' ? englishInput : codeInput).trim() && !isProcessing)
                  ? 'pointer'
                  : 'not-allowed',
                transition: 'all 0.2s ease',
                opacity: isProcessing ? 0.5 : 1
              }}
              onMouseEnter={(e) => {
                if ((mode === 'generate' ? englishInput : codeInput).trim() && !isProcessing) {
                  e.currentTarget.style.transform = 'translateY(-1px)';
                  e.currentTarget.style.boxShadow = `0 4px 12px ${colors.success}40`;
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              {isProcessing ? 'Processing...' : 'Send'}
            </button>
          </div>
        </div>

        {/* Center Panel - Output */}
        <div style={{
          background: colors.outputBg,
          borderRadius: '8px',
          border: `1px solid ${colors.borderLight}`,
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden'
        }}>
          <div style={{
            padding: '10px 14px',
            borderBottom: `1px solid ${colors.border}`,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '10px', fontWeight: 600, color: colors.secondary, letterSpacing: '1px' }}>
                {aiModes.find(m => m.id === mode)?.name.toUpperCase()} OUTPUT
              </span>
              {isStreaming && (
                <span style={{ fontSize: '9px', color: colors.warning, fontStyle: 'italic' }}>
                  Streaming...
                </span>
              )}
              {isProcessing && !isStreaming && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <div style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    background: colors.warning,
                    animation: 'pulse 1.5s ease-in-out infinite'
                  }} />
                  <span style={{
                    fontSize: '9px',
                    color: colors.warning,
                    fontWeight: 500,
                    animation: 'fadeInOut 2s ease-in-out infinite'
                  }}>
                    AI Processing...
                  </span>
                </div>
              )}
            </div>
            <div style={{ display: 'flex', gap: '6px' }}>
              <button
                onClick={() => setShowColorLegend(!showColorLegend)}
                style={{
                  background: showColorLegend ? colors.border : colors.panelBg,
                  border: `1px solid ${colors.border}`,
                  borderRadius: '4px',
                  padding: '4px 8px',
                  color: colors.primary,
                  fontSize: '10px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '3px'
                }}
              >
                {Icons.colors}
                <span>Colors</span>
              </button>
              <button
                onClick={moveToEditor}
                style={{
                  background: colors.panelBg,
                  border: `1px solid ${colors.border}`,
                  borderRadius: '4px',
                  padding: '4px 8px',
                  color: colors.primary,
                  fontSize: '10px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '3px'
                }}
              >
                {Icons.arrow}
                <span>Editor</span>
              </button>
              {/* Action Buttons */}
              <div style={{ display: 'flex', gap: '6px' }}>
                {/* Execute Button - Only for JavaScript */}
                {language === 'javascript' && output && (
                  <button
                    onClick={() => {
                      const result = executeCode(output.replace(/<[^>]*>/g, ''));
                      setExecutionResult(result);
                    }}
                    style={{
                      background: colors.variable,
                      border: `1px solid ${colors.border}`,
                      borderRadius: '4px',
                      padding: '4px 8px',
                      color: colors.bg,
                      fontSize: '10px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '3px'
                    }}
                  >
                    {Icons.play || '▶'}
                    <span>Execute</span>
                  </button>
                )}

                {/* Copy Button */}
                <button
                  onClick={copyOutput}
                  style={{
                    background: copied ? colors.success : colors.panelBg,
                    border: `1px solid ${colors.border}`,
                    borderRadius: '4px',
                    padding: '4px 8px',
                    color: copied ? colors.bg : colors.primary,
                    fontSize: '10px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '3px'
                  }}
                >
                  {copied ? Icons.check : Icons.copy}
                  <span>{copied ? 'Copied' : 'Copy'}</span>
                </button>

                {/* Clear Context Button */}
                <button
                  onClick={() => {
                    setWorkspaceContext({
                      lastGeneratedCode: '',
                      lastAnalyzedCode: '',
                      codeHistory: []
                    });
                    setOutput('');
                    setExecutionResult('');
                    setSyntaxErrors([]);
                    setCurrentTheme('green'); // Reset theme to default
                  }}
                  style={{
                    background: colors.panelBg,
                    border: `1px solid ${colors.border}`,
                    borderRadius: '4px',
                    padding: '4px 8px',
                    color: colors.muted,
                    fontSize: '10px',
                    cursor: 'pointer'
                  }}
                  title="Clear workspace context"
                >
                  Clear
                </button>
              </div>
            </div>
          </div>

          {/* Color Legend */}
          {showColorLegend && (
            <div style={{
              padding: '8px 14px',
              borderBottom: `1px solid ${colors.border}`,
              background: colors.panelBg,
              display: 'flex',
              flexWrap: 'wrap',
              gap: '12px'
            }}>
              {[
                { name: 'Keywords', color: colors.keyword },
                { name: 'Functions', color: colors.function },
                { name: 'Strings', color: colors.string },
                { name: 'Numbers', color: colors.number },
                { name: 'Comments', color: colors.comment },
                { name: 'Variables', color: colors.variable },
                { name: 'Types', color: colors.type },
              ].map(item => (
                <div key={item.name} style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: item.color }} />
                  <span style={{ fontSize: '10px', color: colors.gray }}>{item.name}</span>
                </div>
              ))}
            </div>
          )}

          <div style={{
            flex: 1,
            padding: '16px 20px',
            overflowY: 'auto',
            fontSize: '13px',
            lineHeight: '1.6',
            fontFamily: 'Monaco, "Cascadia Code", "SF Mono", Consolas, monospace',
            background: `linear-gradient(135deg, ${colors.outputBg} 0%, ${colors.bg}40 100%)`,
            scrollbarWidth: 'thin',
            scrollbarColor: `${colors.border} transparent`
          }}>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '4px',
              minHeight: '100%'
            }}>
              {formatOutput(output)}

              {/* Syntax Errors Display */}
              {syntaxErrors.length > 0 && (
                <div style={{
                  marginTop: '12px',
                  padding: '8px',
                  background: `${colors.error}20`,
                  border: `1px solid ${colors.error}40`,
                  borderRadius: '4px'
                }}>
                  <div style={{ fontSize: '10px', color: colors.error, fontWeight: 600, marginBottom: '4px' }}>
                    ⚠️ Syntax Errors Detected:
                  </div>
                  {syntaxErrors.map((error, i) => (
                    <div key={i} style={{ fontSize: '11px', color: colors.error, marginLeft: '12px' }}>
                      • {error}
                    </div>
                  ))}
                </div>
              )}

              {/* Execution Result Display */}
              {executionResult && (
                <div style={{
                  marginTop: '12px',
                  padding: '8px',
                  background: `${colors.success}10`,
                  border: `1px solid ${colors.success}30`,
                  borderRadius: '4px'
                }}>
                  <div style={{ fontSize: '10px', color: colors.success, fontWeight: 600, marginBottom: '4px' }}>
                    ▶ Execution Result:
                  </div>
                  <pre style={{
                    fontSize: '11px',
                    color: colors.primary,
                    marginLeft: '12px',
                    fontFamily: 'monospace',
                    whiteSpace: 'pre-wrap',
                    wordBreak: 'break-word'
                  }}>
                    {executionResult}
                  </pre>
                  <button
                    onClick={() => setExecutionResult('')}
                    style={{
                      marginTop: '6px',
                      background: 'transparent',
                      border: `1px solid ${colors.success}30`,
                      borderRadius: '3px',
                      padding: '2px 6px',
                      color: colors.success,
                      fontSize: '9px',
                      cursor: 'pointer'
                    }}
                  >
                    Clear Result
                  </button>
                </div>
              )}

              {/* Workspace Context Info */}
              {workspaceContext.codeHistory.length > 0 && (
                <div style={{
                  marginTop: '12px',
                  padding: '6px',
                  background: colors.panelBg,
                  border: `1px solid ${colors.border}`,
                  borderRadius: '4px'
                }}>
                  <div style={{ fontSize: '9px', color: colors.muted }}>
                    📚 Context: {workspaceContext.codeHistory.length} operations in workspace
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Panel - AI Agent Chat (Collapsible) */}
        <div style={{
          background: colors.panelBg,
          borderRadius: '8px',
          border: `1px solid ${colors.border}`,
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          position: 'relative'
        }}>
          {!isRavenCollapsed ? (
            <>
              {/* Agent Header */}
              <div style={{
                padding: '10px 14px',
                borderBottom: `1px solid ${colors.border}`,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ color: colors.success }}>{Icons.agent}</span>
                  <span style={{ fontSize: '10px', fontWeight: 600, color: colors.secondary, letterSpacing: '1px' }}>
                    THE RAVEN'S SOUL
                  </span>
                </div>
                <button
                  onClick={() => setIsRavenCollapsed(true)}
                  style={{
                    background: 'transparent',
                    border: `1px solid ${colors.border}`,
                    borderRadius: '4px',
                    padding: '4px 8px',
                    color: colors.muted,
                    cursor: 'pointer',
                    fontSize: '10px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = colors.primary;
                    e.currentTarget.style.color = colors.primary;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = colors.border;
                    e.currentTarget.style.color = colors.muted;
                  }}
                >
                  <span>Hide</span>
                  <span style={{ fontSize: '12px' }}>→</span>
                </button>
              </div>

              {/* Chat Messages */}
              <div style={{
            flex: 1,
            overflowY: 'auto',
            padding: '8px',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px'
          }}>
            {agentMessages.map((message) => (
              <div key={message.id} style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: message.type === 'user' ? 'flex-end' : 'flex-start'
              }}>
                <div style={{
                  maxWidth: '85%',
                  padding: '8px 12px',
                  borderRadius: '12px',
                  background: message.type === 'user'
                    ? `linear-gradient(135deg, ${colors.success}20, ${colors.success}30)`
                    : `linear-gradient(135deg, ${colors.variable}20, ${colors.variable}30)`,
                  border: `1px solid ${message.type === 'user' ? colors.success : colors.variable}40`,
                  fontSize: '11px',
                  lineHeight: '1.4',
                  wordBreak: 'break-word'
                }}>
                  {message.isProcessing ? (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: colors.muted }}>
                      <div style={{
                        width: '4px',
                        height: '4px',
                        background: colors.variable,
                        borderRadius: '50%',
                        animation: 'pulse 1s infinite'
                      }} />
                      <span style={{ fontStyle: 'italic' }}>RAVEN is thinking...</span>
                    </div>
                  ) : (
                    <span style={{
                      color: message.type === 'user' ? colors.primary : colors.primary,
                      whiteSpace: 'pre-wrap'
                    }}>
                      {message.content}
                    </span>
                  )}
                </div>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  marginTop: '2px',
                  fontSize: '9px',
                  color: colors.muted
                }}>
                  <span style={{ color: message.type === 'user' ? colors.success : colors.variable }}>
                    {message.type === 'user' ? Icons.user : Icons.agent}
                  </span>
                  <span>{Icons.clock}</span>
                  <span>{formatTimestamp(message.timestamp)}</span>
                </div>
              </div>
            ))}
          </div>

              {/* Chat Input */}
              <div style={{
            borderTop: `1px solid ${colors.border}`,
            padding: '8px',
            display: 'flex',
            gap: '6px',
            alignItems: 'flex-end'
          }}>
            <textarea
              value={agentInput}
              onChange={(e) => setAgentInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  sendAgentMessage();
                }
              }}
              placeholder="Ask RAVEN anything about coding..."
              style={{
                flex: 1,
                background: colors.bg,
                border: `1px solid ${colors.border}`,
                borderRadius: '6px',
                padding: '6px 8px',
                color: colors.primary,
                fontSize: '11px',
                lineHeight: '1.3',
                resize: 'none',
                outline: 'none',
                minHeight: '20px',
                maxHeight: '60px',
                fontFamily: 'inherit'
              }}
              rows={1}
            />
            <button
              onClick={sendAgentMessage}
              disabled={!agentInput.trim() || isAgentProcessing}
              style={{
                background: agentInput.trim() && !isAgentProcessing
                  ? `linear-gradient(135deg, ${colors.success}, ${colors.success}DD)`
                  : colors.bg,
                border: `1px solid ${colors.border}`,
                borderRadius: '6px',
                padding: '6px 8px',
                color: agentInput.trim() && !isAgentProcessing ? '#000' : colors.muted,
                cursor: agentInput.trim() && !isAgentProcessing ? 'pointer' : 'not-allowed',
                transition: 'all 0.2s ease',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
                {Icons.send}
              </button>
            </div>
            </>
          ) : (
            /* Collapsed State */
            <div style={{
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '12px',
              gap: '12px'
            }}>
              <button
                onClick={() => setIsRavenCollapsed(false)}
                style={{
                  background: `linear-gradient(135deg, ${colors.success}20, ${colors.variable}20)`,
                  border: `1px solid ${colors.border}`,
                  borderRadius: '8px',
                  padding: '8px',
                  color: colors.success,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '8px'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = colors.success;
                  e.currentTarget.style.transform = 'scale(1.05)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = colors.border;
                  e.currentTarget.style.transform = 'scale(1)';
                }}
                title="Expand RAVEN Soul Chat"
              >
                <span style={{ fontSize: '16px' }}>←</span>
                <span style={{
                  writingMode: 'vertical-rl',
                  textOrientation: 'mixed',
                  fontSize: '10px',
                  fontWeight: 600,
                  letterSpacing: '1px'
                }}>RAVEN</span>
              </button>
              <div style={{
                color: colors.muted,
                fontSize: '9px',
                writingMode: 'vertical-rl',
                textOrientation: 'mixed'
              }}>
                {agentMessages.length} msgs
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <div style={{
        background: colors.panelBg,
        borderTop: `1px solid ${colors.border}`,
        padding: '8px 20px',
        display: 'flex',
        justifyContent: 'space-between',
        fontSize: '10px',
        color: colors.muted,
        flexShrink: 0
      }}>
        <span>Powered by Claude AI • {aiModes.find(m => m.id === mode)?.name} Mode</span>
        <span>© 2025 NAVADA • Real-time AI Visual English Notation</span>
      </div>

      {/* About Modal */}
      {showAbout && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.8)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            backdropFilter: 'blur(4px)'
          }}
          onClick={() => setShowAbout(false)}
        >
          <div
            style={{
              background: colors.panelBg,
              border: `1px solid ${colors.border}`,
              borderRadius: '12px',
              padding: '32px',
              maxWidth: '500px',
              maxHeight: '80vh',
              overflowY: 'auto'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h2 style={{ fontSize: '24px', fontWeight: 800, marginBottom: '8px', letterSpacing: '2px' }}>
              RAVEN Terminal
            </h2>
            <p style={{ fontSize: '11px', color: colors.secondary, marginBottom: '20px' }}>
              Real-time AI Visual English Notation
            </p>
            <div style={{ color: colors.gray, lineHeight: '1.8', fontSize: '13px' }}>
              <p style={{ marginBottom: '16px' }}>
                RAVEN Terminal is an intelligent code learning and generation platform that bridges the gap between natural language and programming.
              </p>
              <p style={{ fontWeight: 600, color: colors.primary, marginBottom: '8px' }}>Core Features:</p>
              <ul style={{ marginLeft: '20px', marginBottom: '16px' }}>
                <li>Natural language to code generation</li>
                <li>Code explanation with real-life analogies</li>
                <li>Intelligent debugging and optimization</li>
                <li>Multi-language support and conversion</li>
                <li>Comprehensive test generation</li>
              </ul>
              <p style={{ fontWeight: 600, color: colors.primary, marginBottom: '8px' }}>Philosophy:</p>
              <p>
                Learning to code should be intuitive. RAVEN uses real-world analogies and visual cues to make programming accessible to everyone.
              </p>
            </div>
            <button
              onClick={() => setShowAbout(false)}
              style={{
                marginTop: '24px',
                background: colors.border,
                border: 'none',
                borderRadius: '6px',
                padding: '8px 16px',
                color: colors.primary,
                cursor: 'pointer',
                width: '100%'
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Help Modal */}
      {showHelp && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.8)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            backdropFilter: 'blur(4px)'
          }}
          onClick={() => setShowHelp(false)}
        >
          <div
            style={{
              background: colors.panelBg,
              border: `1px solid ${colors.border}`,
              borderRadius: '12px',
              padding: '32px',
              maxWidth: '600px',
              maxHeight: '80vh',
              overflowY: 'auto'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h2 style={{ fontSize: '24px', fontWeight: 800, marginBottom: '20px' }}>
              How to Use RAVEN
            </h2>

            <div style={{ marginBottom: '20px' }}>
              <div style={{
                background: colors.bg,
                border: `1px solid ${colors.border}`,
                borderRadius: '8px',
                padding: '16px',
                marginBottom: '12px'
              }}>
                <p style={{ fontWeight: 700, color: colors.success, marginBottom: '8px' }}>
                  ⚡ Generate Mode
                </p>
                <p style={{ color: colors.gray, fontSize: '12px' }}>
                  Type any description in plain English. Get focused code for simple tasks or complete blueprints for complex projects.
                </p>
              </div>

              <div style={{
                background: colors.bg,
                border: `1px solid ${colors.border}`,
                borderRadius: '8px',
                padding: '16px',
                marginBottom: '12px'
              }}>
                <p style={{ fontWeight: 700, color: colors.variable, marginBottom: '8px' }}>
                  📖 Explain Mode
                </p>
                <p style={{ color: colors.gray, fontSize: '12px' }}>
                  Paste code to receive detailed breakdowns with line-by-line explanations and real-life analogies.
                </p>
              </div>

              <div style={{
                background: colors.bg,
                border: `1px solid ${colors.border}`,
                borderRadius: '8px',
                padding: '16px',
                marginBottom: '12px'
              }}>
                <p style={{ fontWeight: 700, color: colors.error, marginBottom: '8px' }}>
                  🐛 Debug Mode
                </p>
                <p style={{ color: colors.gray, fontSize: '12px' }}>
                  Identify bugs, get corrected code, and learn prevention strategies.
                </p>
              </div>

              <div style={{
                background: colors.bg,
                border: `1px solid ${colors.border}`,
                borderRadius: '8px',
                padding: '16px'
              }}>
                <p style={{ fontWeight: 700, color: colors.type, marginBottom: '8px' }}>
                  🚀 Optimize, Convert & Test
                </p>
                <p style={{ color: colors.gray, fontSize: '12px' }}>
                  Improve performance, translate between languages, or generate comprehensive test suites automatically.
                </p>
              </div>
            </div>

            <div style={{ color: colors.gray, fontSize: '12px' }}>
              <p style={{ fontWeight: 600, color: colors.primary, marginBottom: '8px' }}>Pro Tips:</p>
              <ul style={{ marginLeft: '20px' }}>
                <li>Click the RAVEN logo to reset everything</li>
                <li>Use "→ Editor" to copy output to practice panel</li>
                <li>Processing happens automatically after 1 second</li>
                <li>Toggle "Colors" to see syntax highlighting legend</li>
              </ul>
            </div>

            <button
              onClick={() => setShowHelp(false)}
              style={{
                marginTop: '24px',
                background: colors.border,
                border: 'none',
                borderRadius: '6px',
                padding: '8px 16px',
                color: colors.primary,
                cursor: 'pointer',
                width: '100%'
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
    </>
  );
}