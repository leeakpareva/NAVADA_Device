'use client';

import { useState, useEffect, useRef, useCallback } from 'react';

// Types
interface RAVENTerminalProps {
  onClose?: () => void;
}

// Color Palette - Dracula-inspired
const colors = {
  // Background colors
  bg: '#000000',
  panelBg: '#0a0a0a',
  outputBg: '#050505',
  border: '#222222',
  borderLight: '#333333',

  // Text colors
  primary: '#ffffff',
  secondary: '#666666',
  muted: '#444444',
  gray: '#888888',

  // Syntax highlighting
  keyword: '#ff79c6',
  function: '#50fa7b',
  string: '#f1fa8c',
  number: '#bd93f9',
  comment: '#6272a4',
  operator: '#ff5555',
  variable: '#8be9fd',
  type: '#ffb86c',

  // Status colors
  success: '#50fa7b',
  error: '#ff5555',
  warning: '#f1fa8c',
  info: '#8be9fd',
};

// AI Modes
const aiModes = [
  { id: 'generate', name: 'Generate', icon: '⚡', description: 'Convert English to code' },
  { id: 'explain', name: 'Explain', icon: '📖', description: 'Understand code' },
  { id: 'debug', name: 'Debug', icon: '🐛', description: 'Find and fix errors' },
  { id: 'optimize', name: 'Optimize', icon: '🚀', description: 'Improve performance' },
  { id: 'convert', name: 'Convert', icon: '🔄', description: 'Translate languages' },
  { id: 'test', name: 'Test', icon: '✅', description: 'Generate tests' },
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

// Syntax Highlighting
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

export default function RAVENTerminal({ onClose }: RAVENTerminalProps) {
  // State
  const [mode, setMode] = useState('generate');
  const [language, setLanguage] = useState('python');
  const [targetLanguage, setTargetLanguage] = useState('javascript');
  const [englishInput, setEnglishInput] = useState('');
  const [codeInput, setCodeInput] = useState('');
  const [output, setOutput] = useState('');
  const [practiceCode, setPracticeCode] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [showColorLegend, setShowColorLegend] = useState(false);
  const [showDictionary, setShowDictionary] = useState(false);
  const [showAbout, setShowAbout] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [copied, setCopied] = useState(false);
  const [selectedConcept, setSelectedConcept] = useState('');

  // Refs
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  // Process with AI
  const processWithAI = useCallback(async (inputText: string, aiMode: string, lang: string, targetLang?: string) => {
    if (!inputText.trim()) {
      setOutput('');
      return;
    }

    setIsProcessing(true);
    setOutput('🤖 Processing your request...');

    const prompts: Record<string, string> = {
      generate: `You are RAVEN. Generate ${lang} code for: "${inputText}"

Format your response with these sections using emoji headers:
🎯 UNDERSTANDING - What you're building
🌍 REAL-LIFE ANALOGY - Compare to something familiar
💻 THE CODE - Working ${lang} code
🔍 LINE-BY-LINE BREAKDOWN - Explain each part
💡 KEY CONCEPTS - Important takeaways

For complex projects, also include:
🛠️ TECH STACK - Technologies used
📁 PROJECT STRUCTURE - Directory tree
🗄️ DATABASE SCHEMA - If applicable
🔌 API ENDPOINTS - If applicable`,

      explain: `Explain this ${lang} code for beginners:
${inputText}

Format with:
📋 OVERVIEW - What this code does
🔍 LINE-BY-LINE - Detailed breakdown
🌍 REAL-LIFE ANALOGY - Relatable comparison
🎯 TAKEAWAYS - Key learning points`,

      debug: `Debug this ${lang} code:
${inputText}

Format with:
🔴 ISSUES FOUND - Problems identified
✅ FIXED CODE - Corrected version
🛡️ PREVENTION TIPS - How to avoid these issues
🌍 DEBUGGING ANALOGY - Debugging process comparison`,

      optimize: `Optimize this ${lang} code for better performance:
${inputText}

Format with:
📊 ANALYSIS - Current performance issues
🚀 OPTIMIZED CODE - Improved version
📈 IMPROVEMENTS - What got better and why
🌍 OPTIMIZATION ANALOGY - Performance comparison`,

      convert: `Convert this code to ${targetLang || 'javascript'}:
${inputText}

Format with:
🔄 CONVERSION - From ${lang} to ${targetLang}
✨ CONVERTED CODE - The ${targetLang} version
⚡ KEY DIFFERENCES - Language-specific changes
🌍 LANGUAGE ANALOGY - Comparison between languages`,

      test: `Generate comprehensive tests for this ${lang} code:
${inputText}

Format with:
🧪 TEST SUITE - Complete test implementation
✅ NORMAL CASES - Standard scenarios
⚠️ EDGE CASES - Boundary conditions
❌ ERROR CASES - Failure scenarios
🌍 TESTING ANALOGY - Testing strategy comparison`
    };

    try {
      const response = await fetch('/api/ai/python', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
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
      setOutput(data.message || 'No response received');
    } catch (error: any) {
      setOutput(`❌ Connection Error: ${error.message}\n\nPlease check your internet connection and try again.`);
    } finally {
      setIsProcessing(false);
    }
  }, []);

  // Handle input changes with debounce
  const handleInputChange = (value: string, isCode: boolean) => {
    if (isCode) {
      setCodeInput(value);
    } else {
      setEnglishInput(value);
    }

    // Debounce AI processing
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      const input = mode === 'generate' ? (isCode ? '' : value) : (isCode ? value : codeInput);
      if (input.trim()) {
        processWithAI(input, mode, language, targetLanguage);
      }
    }, 1000);
  };

  // Handle mode change
  const handleModeChange = (newMode: string) => {
    setMode(newMode);
    const input = newMode === 'generate' ? englishInput : codeInput;
    if (input.trim()) {
      processWithAI(input, newMode, language, targetLanguage);
    }
  };

  // Copy output to clipboard
  const copyOutput = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

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

  // Reset everything
  const reset = () => {
    setEnglishInput('');
    setCodeInput('');
    setOutput('');
    setPracticeCode('');
    setMode('generate');
  };

  // Format output for display
  const formatOutput = (text: string): JSX.Element[] => {
    if (!text) return [<span key="0" style={{ color: colors.muted }}>// Output will appear here...</span>];

    const lines = text.split('\n');
    return lines.map((line, i) => {
      // Section headers with emojis
      if (line.match(/^[🎯💻🔍🌍💡📋🔴✅🛡️📊🚀📈🔄✨⚡🧪⚠️❌🛠️📁🗄️🔌]/)) {
        return <div key={i} style={{ color: colors.primary, fontWeight: 700, fontSize: '14px', marginTop: '16px', marginBottom: '8px' }}>{line}</div>;
      }

      // Code blocks (simple detection)
      if (line.startsWith('```')) {
        return null; // Skip code fence markers
      }

      // Directory tree
      if (line.match(/^[│├└]/)) {
        return <div key={i} style={{ color: colors.variable, fontFamily: 'monospace', fontSize: '12px' }}>{line}</div>;
      }

      // API endpoints
      if (line.match(/^\[(GET|POST|PUT|DELETE)\]/)) {
        const method = line.match(/\[(GET|POST|PUT|DELETE)\]/)?.[1];
        const methodColors: Record<string, string> = {
          GET: colors.success,
          POST: colors.variable,
          PUT: colors.type,
          DELETE: colors.error
        };
        const color = methodColors[method || 'GET'];
        return (
          <div key={i}>
            <span style={{ color, fontWeight: 600 }}>[{method}]</span>
            <span style={{ color: colors.primary }}>{line.replace(/\[.*?\]/, '')}</span>
          </div>
        );
      }

      // Bullet points
      if (line.trim().startsWith('•') || line.trim().startsWith('-')) {
        return <div key={i} style={{ color: colors.secondary, paddingLeft: '20px' }}>{line}</div>;
      }

      // Regular text
      return <div key={i} style={{ color: colors.gray, lineHeight: '1.6' }}>{line}</div>;
    }).filter((element): element is JSX.Element => element !== null);
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
            📖 Dictionary {showDictionary ? '▲' : '▼'}
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
              cursor: 'pointer'
            }}
          >
            Help
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
              ×
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

      {/* Main Content - Three Column Layout */}
      <div style={{
        flex: 1,
        display: 'grid',
        gridTemplateColumns: '1fr 1.3fr 1fr',
        gap: '12px',
        padding: '12px',
        overflow: 'hidden'
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
              {isProcessing && (
                <span style={{ fontSize: '9px', color: colors.warning }}>Processing...</span>
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
                  cursor: 'pointer'
                }}
              >
                Colors
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
                  cursor: 'pointer'
                }}
              >
                → Editor
              </button>
              <button
                onClick={copyOutput}
                style={{
                  background: copied ? colors.success : colors.panelBg,
                  border: `1px solid ${colors.border}`,
                  borderRadius: '4px',
                  padding: '4px 8px',
                  color: copied ? colors.bg : colors.primary,
                  fontSize: '10px',
                  cursor: 'pointer'
                }}
              >
                {copied ? '✓ Copied' : 'Copy'}
              </button>
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
            padding: '14px',
            overflowY: 'auto',
            fontSize: '12px',
            lineHeight: '1.5',
            fontFamily: 'monospace'
          }}>
            {formatOutput(output)}
          </div>
        </div>

        {/* Right Panel - Practice Editor */}
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
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <span style={{ fontSize: '10px', fontWeight: 600, color: colors.secondary, letterSpacing: '1px' }}>
              PRACTICE EDITOR
            </span>
            <button
              onClick={analyzePracticeCode}
              style={{
                background: colors.bg,
                border: `1px solid ${colors.border}`,
                borderRadius: '4px',
                padding: '4px 8px',
                color: colors.primary,
                fontSize: '10px',
                cursor: 'pointer'
              }}
            >
              Analyze
            </button>
          </div>
          <div style={{ flex: 1, position: 'relative' }}>
            <div style={{
              position: 'absolute',
              inset: 0,
              padding: '14px',
              overflowY: 'auto',
              fontSize: '12px',
              lineHeight: '1.5',
              fontFamily: 'monospace',
              pointerEvents: 'none'
            }}>
              {practiceCode ? highlightCode(practiceCode, language) : (
                <span style={{ color: colors.muted }}>// Practice {languages.find(l => l.id === language)?.name} here...</span>
              )}
            </div>
            <textarea
              value={practiceCode}
              onChange={(e) => setPracticeCode(e.target.value)}
              spellCheck={false}
              style={{
                width: '100%',
                height: '100%',
                background: 'transparent',
                border: 'none',
                padding: '14px',
                color: 'transparent',
                caretColor: colors.primary,
                fontSize: '12px',
                lineHeight: '1.5',
                resize: 'none',
                outline: 'none',
                fontFamily: 'monospace',
                position: 'relative',
                zIndex: 1
              }}
            />
          </div>
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
  );
}