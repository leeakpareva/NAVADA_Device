'use client';

import { useState, useEffect, useRef, useCallback } from 'react';

// Types
interface RAVENTerminalProps {
  onClose?: () => void;
}

// Enhanced Color Palette - Vibrant Terminal Colors
const colors = {
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

  // Enhanced Syntax highlighting - More Vibrant
  keyword: '#ff006a',        // Bright magenta for keywords
  function: '#00ff00',       // Bright green for functions
  string: '#00ffaa',         // Bright cyan for strings
  number: '#ffaa00',         // Bright orange for numbers
  comment: '#ffff00',        // Bright yellow for comments
  operator: '#ff4444',       // Bright red for operators
  variable: '#00aaff',       // Bright blue for variables
  type: '#ff00ff',           // Bright purple for types
  boolean: '#ff00aa',        // Pink for booleans
  decorator: '#ffaa00',      // Gold for decorators
  builtin: '#00ffff',        // Cyan for built-in functions
  className: '#88ff00',      // Lime green for classes
  bracket: '#ffffff',        // White for brackets
  punctuation: '#808080',    // Gray for punctuation

  // Status colors
  success: '#00ff00',
  error: '#ff0000',
  warning: '#ffaa00',
  info: '#00aaff',
};

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
  test: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polyline points="20 6 9 17 4 12" />
      <circle cx="12" cy="12" r="10" />
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
};

// AI Modes
const aiModes = [
  { id: 'generate', name: 'Generate', icon: Icons.generate, description: 'Convert English to code' },
  { id: 'explain', name: 'Explain', icon: Icons.explain, description: 'Understand code' },
  { id: 'debug', name: 'Debug', icon: Icons.debug, description: 'Find and fix errors' },
  { id: 'optimize', name: 'Optimize', icon: Icons.optimize, description: 'Improve performance' },
  { id: 'convert', name: 'Convert', icon: Icons.convert, description: 'Translate languages' },
  { id: 'test', name: 'Test', icon: Icons.test, description: 'Generate tests' },
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

  // Cleanup effect for debounce timeout
  useEffect(() => {
    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, []);

  // Process with AI
  const processWithAI = useCallback(async (inputText: string, aiMode: string, lang: string, targetLang?: string) => {
    if (!inputText.trim()) {
      setOutput('');
      return;
    }

    setIsProcessing(true);
    setOutput(`Processing ${aiMode} with RAVEN AI...`);

    const prompts: Record<string, string> = {
      generate: `You are RAVEN, an expert coding assistant. Generate ${lang} code for: "${inputText}"

IMPORTANT: Include comprehensive inline comments using the what/how/why format:
- WHAT: Explain what the code does
- HOW: Explain how it works
- WHY: Explain why this approach is used

Format your response with these sections:
🎯 UNDERSTANDING - What you're building
🌍 REAL-LIFE ANALOGY - Compare to something familiar
💻 THE CODE - Working ${lang} code with detailed comments

For the code section, ensure EVERY significant line or block has comments explaining:
${lang === 'python' ? `# WHAT: What this line/block accomplishes
# HOW: The mechanism or technique used
# WHY: The reason for this approach` :
`// WHAT: What this line/block accomplishes
// HOW: The mechanism or technique used
// WHY: The reason for this approach`}

🔍 LINE-BY-LINE BREAKDOWN - Explain each part
💡 KEY CONCEPTS - Important takeaways

For complex projects, also include:
🛠️ TECH STACK - Technologies used
📁 PROJECT STRUCTURE - Directory tree
🗄️ DATABASE SCHEMA - If applicable
🔌 API ENDPOINTS - If applicable`,

      explain: `Provide an in-depth explanation of this ${lang} code:
${inputText}

Format your response with these comprehensive sections:

📋 PURPOSE & OVERVIEW
- Primary functionality and use case
- Problem this code solves
- Where this would be used in production

🏗️ ARCHITECTURE & DESIGN
- Overall structure and design patterns
- Data flow through the code
- Key algorithms or techniques used

🔍 DETAILED CODE ANALYSIS
For each significant section/function:
- Purpose of the section
- Input parameters and their types
- Processing logic step-by-step
- Return values and side effects
- Error handling mechanisms

⚙️ TECHNICAL DEEP DIVE
- Time complexity: O(?)
- Space complexity: O(?)
- Performance characteristics
- Memory management considerations
- Potential bottlenecks

🌍 REAL-WORLD ANALOGY
- Compare to a familiar real-life process
- Step-by-step parallel with the code logic

⚡ OPTIMIZATION OPPORTUNITIES
- Current inefficiencies
- Suggested improvements
- Alternative approaches

🔒 SECURITY & BEST PRACTICES
- Security considerations
- Code quality assessment
- Adherence to language conventions

🎯 KEY TAKEAWAYS
- Core concepts demonstrated
- Reusable patterns
- Important lessons for developers`,

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

      test: `Analyze edge cases and validation for this ${lang} code:
${inputText}

Format with:
🔬 VALIDATION ANALYSIS - Input validation and error handling review
✅ HAPPY PATH - Expected behavior with valid inputs
⚠️ EDGE CASES - Boundary conditions and special scenarios
❌ FAILURE MODES - How the code handles errors and invalid inputs
🛡️ DEFENSIVE PROGRAMMING - Suggestions for more robust code
💡 RECOMMENDED VALIDATIONS - Additional checks to implement`
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

  // Enhanced input handling with better debouncing
  const handleInputChange = useCallback((value: string, isCode: boolean) => {
    if (isCode) {
      setCodeInput(value);
    } else {
      setEnglishInput(value);
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
      }
    }, 800); // Reduced from 1000ms
  }, [mode, language, targetLanguage, codeInput, isProcessing]);

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

  // Reset everything
  const reset = () => {
    setEnglishInput('');
    setCodeInput('');
    setOutput('');
    setPracticeCode('');
    setMode('generate');
  };

  // Enhanced syntax highlighting function with vibrant colors and comment detection
  const applySyntaxHighlighting = (code: string, lang: string): JSX.Element => {
    const keywords: Record<string, string[]> = {
      python: ['def', 'class', 'import', 'from', 'if', 'else', 'elif', 'for', 'while', 'try', 'except', 'with', 'as', 'return', 'yield', 'lambda', 'global', 'nonlocal', 'and', 'or', 'not', 'in', 'is', 'None', 'True', 'False', 'pass', 'break', 'continue', 'raise', 'assert', 'del'],
      javascript: ['function', 'const', 'let', 'var', 'if', 'else', 'for', 'while', 'return', 'class', 'extends', 'import', 'export', 'default', 'async', 'await', 'try', 'catch', 'finally', 'new', 'this', 'super', 'typeof', 'instanceof', 'delete', 'void', 'throw', 'switch', 'case', 'break', 'continue', 'do', 'debugger'],
      typescript: ['function', 'const', 'let', 'var', 'if', 'else', 'for', 'while', 'return', 'class', 'extends', 'import', 'export', 'default', 'async', 'await', 'try', 'catch', 'finally', 'interface', 'type', 'enum', 'namespace', 'module', 'declare', 'abstract', 'implements', 'private', 'public', 'protected', 'readonly', 'keyof', 'typeof', 'as', 'is'],
      rust: ['fn', 'let', 'mut', 'if', 'else', 'for', 'while', 'loop', 'match', 'struct', 'enum', 'impl', 'trait', 'mod', 'use', 'pub', 'return', 'self', 'Self', 'super', 'crate', 'move', 'ref', 'static', 'const', 'unsafe', 'async', 'await', 'dyn'],
      go: ['func', 'var', 'const', 'if', 'else', 'for', 'range', 'return', 'struct', 'interface', 'type', 'package', 'import', 'go', 'defer', 'chan', 'select', 'case', 'default', 'break', 'continue', 'fallthrough', 'goto', 'map', 'make'],
      java: ['public', 'private', 'protected', 'static', 'final', 'class', 'interface', 'extends', 'implements', 'if', 'else', 'for', 'while', 'return', 'try', 'catch', 'finally', 'throw', 'throws', 'new', 'this', 'super', 'import', 'package', 'void', 'int', 'String', 'boolean', 'double', 'float', 'char', 'byte', 'short', 'long', 'abstract', 'synchronized'],
      cpp: ['int', 'char', 'float', 'double', 'bool', 'void', 'if', 'else', 'for', 'while', 'return', 'class', 'public', 'private', 'protected', 'virtual', 'static', 'const', 'new', 'delete', 'this', 'template', 'typename', 'namespace', 'using', 'try', 'catch', 'throw', 'friend', 'inline', 'extern', 'sizeof', 'typedef', 'auto'],
      csharp: ['public', 'private', 'protected', 'static', 'readonly', 'class', 'interface', 'if', 'else', 'for', 'while', 'return', 'try', 'catch', 'finally', 'using', 'namespace', 'new', 'this', 'base', 'virtual', 'override', 'abstract', 'sealed', 'async', 'await', 'var', 'dynamic', 'object', 'string', 'int', 'bool', 'double', 'float', 'decimal', 'byte', 'char', 'void']
    };

    const builtins: Record<string, string[]> = {
      python: ['print', 'len', 'range', 'str', 'int', 'float', 'list', 'dict', 'set', 'tuple', 'open', 'input', 'type', 'isinstance', 'hasattr', 'getattr', 'setattr', 'abs', 'all', 'any', 'min', 'max', 'sum', 'sorted', 'reversed', 'enumerate', 'zip', 'map', 'filter'],
      javascript: ['console', 'Math', 'Date', 'Array', 'Object', 'String', 'Number', 'Boolean', 'Promise', 'JSON', 'parseInt', 'parseFloat', 'isNaN', 'isFinite', 'undefined', 'null', 'window', 'document', 'setTimeout', 'setInterval'],
      typescript: ['console', 'Math', 'Date', 'Array', 'Object', 'String', 'Number', 'Boolean', 'Promise', 'JSON', 'parseInt', 'parseFloat', 'isNaN', 'isFinite', 'undefined', 'null', 'Record', 'Partial', 'Required', 'Readonly', 'Pick', 'Omit']
    };

    let highlightedCode = code;
    const currentKeywords = keywords[lang] || keywords.python;
    const currentBuiltins = builtins[lang] || [];

    // Escape HTML entities first
    highlightedCode = highlightedCode
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');

    // Special comment patterns (WHAT, HOW, WHY) - make them stand out
    if (lang === 'python') {
      highlightedCode = highlightedCode.replace(/#\s*(WHAT|HOW|WHY):(.*?)$/gm,
        `<span style="color: ${colors.warning}; font-weight: bold; background: rgba(255,170,0,0.15); padding: 2px 6px; border-radius: 3px; display: inline-block; margin: 2px 0;"># <span style="color: #ff00ff; text-shadow: 0 0 3px #ff00ff;">$1:</span><span style="color: #ffffff;">$2</span></span>`);
      // Regular comments
      highlightedCode = highlightedCode.replace(/#(?!\s*(WHAT|HOW|WHY):)(.*)$/gm,
        `<span style="color: ${colors.comment}; font-style: italic;">#$2</span>`);
    } else {
      highlightedCode = highlightedCode.replace(/\/\/\s*(WHAT|HOW|WHY):(.*?)$/gm,
        `<span style="color: ${colors.warning}; font-weight: bold; background: rgba(255,170,0,0.15); padding: 2px 6px; border-radius: 3px; display: inline-block; margin: 2px 0;">// <span style="color: #ff00ff; text-shadow: 0 0 3px #ff00ff;">$1:</span><span style="color: #ffffff;">$2</span></span>`);
      // Regular comments
      highlightedCode = highlightedCode.replace(/\/\/(?!\s*(WHAT|HOW|WHY):)(.*)$/gm,
        `<span style="color: ${colors.comment}; font-style: italic;">//$2</span>`);
      // Multi-line comments
      highlightedCode = highlightedCode.replace(/\/\*(.*?)\*\//gs,
        `<span style="color: ${colors.comment}; font-style: italic;">/*$1*/</span>`);
    }

    // Store strings to preserve them
    const stringMap = new Map();
    let stringIndex = 0;

    // Triple quotes for Python
    if (lang === 'python') {
      highlightedCode = highlightedCode.replace(/(\"\"\"|''')([\s\S]*?)\1/g, (match, quote, content) => {
        const placeholder = `__STRING_${stringIndex++}__`;
        stringMap.set(placeholder, `<span style="color: ${colors.string}; font-weight: 500;">${quote}${content}${quote}</span>`);
        return placeholder;
      });
    }

    // Template literals for JS/TS
    if (lang === 'javascript' || lang === 'typescript') {
      highlightedCode = highlightedCode.replace(/`([^`]*)`/g, (match, content) => {
        const placeholder = `__STRING_${stringIndex++}__`;
        stringMap.set(placeholder, `<span style="color: ${colors.string}; font-weight: 500;">\`${content}\`</span>`);
        return placeholder;
      });
    }

    // Regular strings
    highlightedCode = highlightedCode.replace(/(['"])((?:\\.|(?!\1)[^\\])*?)\1/g, (match, quote, content) => {
      const placeholder = `__STRING_${stringIndex++}__`;
      stringMap.set(placeholder, `<span style="color: ${colors.string}; font-weight: 500;">${quote}${content}${quote}</span>`);
      return placeholder;
    });

    // Booleans and special values
    if (lang === 'python') {
      highlightedCode = highlightedCode.replace(/\b(True|False|None)\b/g,
        `<span style="color: ${colors.boolean}; font-weight: bold;">$1</span>`);
    } else if (lang === 'javascript' || lang === 'typescript') {
      highlightedCode = highlightedCode.replace(/\b(true|false|null|undefined)\b/g,
        `<span style="color: ${colors.boolean}; font-weight: bold;">$1</span>`);
    }

    // Numbers (including decimals, hex, scientific notation)
    highlightedCode = highlightedCode.replace(/\b(0x[0-9a-fA-F]+|0b[01]+|\d+\.?\d*([eE][+-]?\d+)?)\b/g,
      `<span style="color: ${colors.number}; font-weight: 600;">$1</span>`);

    // Decorators (Python)
    if (lang === 'python') {
      highlightedCode = highlightedCode.replace(/@(\w+)/g,
        `<span style="color: ${colors.decorator}; font-weight: bold;">@$1</span>`);
    }

    // Types and classes
    if (lang === 'typescript' || lang === 'java' || lang === 'csharp' || lang === 'cpp') {
      highlightedCode = highlightedCode.replace(/\b(string|number|boolean|any|void|unknown|never)\b/g,
        `<span style="color: ${colors.type}; font-weight: 600;">$1</span>`);
    }

    // Keywords
    currentKeywords.forEach(keyword => {
      const regex = new RegExp(`\\b(${keyword})\\b(?![^&lt;]*&gt;)`, 'g');
      highlightedCode = highlightedCode.replace(regex,
        `<span style="color: ${colors.keyword}; font-weight: bold;">$1</span>`);
    });

    // Built-in functions
    currentBuiltins.forEach(builtin => {
      const regex = new RegExp(`\\b(${builtin})\\b(?![^&lt;]*&gt;)`, 'g');
      highlightedCode = highlightedCode.replace(regex,
        `<span style="color: ${colors.builtin}; font-weight: 600;">$1</span>`);
    });

    // Function/method definitions
    if (lang === 'python') {
      highlightedCode = highlightedCode.replace(/\b(def|class)\s+(\w+)/g,
        `<span style="color: ${colors.keyword}; font-weight: bold;">$1</span> <span style="color: ${colors.function}; font-weight: bold;">$2</span>`);
    } else if (lang === 'javascript' || lang === 'typescript') {
      highlightedCode = highlightedCode.replace(/\b(function|class)\s+(\w+)/g,
        `<span style="color: ${colors.keyword}; font-weight: bold;">$1</span> <span style="color: ${colors.function}; font-weight: bold;">$2</span>`);
    }

    // Function calls
    highlightedCode = highlightedCode.replace(/\b(\w+)(?=\s*\()/g, (match, name) => {
      if (currentKeywords.includes(name) || currentBuiltins.includes(name)) {
        return match;
      }
      return `<span style="color: ${colors.function}; font-weight: 600;">${name}</span>`;
    });

    // Operators
    highlightedCode = highlightedCode.replace(/([+\-*/%=&lt;&gt;!&|^~]+|\b(and|or|not|in|is)\b)/g,
      `<span style="color: ${colors.operator}; font-weight: bold;">$1</span>`);

    // Brackets and punctuation
    highlightedCode = highlightedCode.replace(/([{}[\]()])/g,
      `<span style="color: ${colors.bracket}; font-weight: bold;">$1</span>`);
    highlightedCode = highlightedCode.replace(/([;,.])/g,
      `<span style="color: ${colors.punctuation};">$1</span>`);

    // Restore strings
    stringMap.forEach((value, key) => {
      highlightedCode = highlightedCode.replace(key, value);
    });

    return <span dangerouslySetInnerHTML={{ __html: highlightedCode }} />;
  };

  // Enhanced format output with better spacing and colors
  const formatOutput = (text: string): JSX.Element[] => {
    if (!text) return [<span key="0" style={{ color: colors.muted, fontStyle: 'italic' }}>// AI output will appear here...</span>];

    const lines = text.split('\n');
    let inCodeBlock = false;
    let codeBlockLang = 'python';
    let lineCounter = 1;

    return lines.map((line, i) => {
      // Section headers with emojis - enhanced styling
      if (line.match(/^[🎯💻🔍🌍💡📋🔴✅🛡️📊🚀📈🔄✨⚡🧪⚠️❌🛠️📁🗄️🔌]/)) {
        return (
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
      }

      // Code block detection
      if (line.startsWith('```')) {
        if (!inCodeBlock) {
          inCodeBlock = true;
          const match = line.match(/```(\w+)?/);
          codeBlockLang = match?.[1] || language;
          return (
            <div key={i} style={{
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
          inCodeBlock = false;
          return (
            <div key={i} style={{
              marginBottom: '16px',
              height: '1px',
              background: `linear-gradient(90deg, ${colors.border}, transparent)`,
              margin: '12px 0'
            }} />
          );
        }
      }

      // Code inside code blocks - with enhanced terminal-like formatting
      if (inCodeBlock && line.trim()) {
        return (
          <div key={i} style={{
            fontFamily: '"Fira Code", "Cascadia Code", Monaco, "Courier New", monospace',
            fontSize: '14px',
            lineHeight: '1.6',
            padding: '6px 20px',
            background: 'rgba(10, 10, 10, 0.9)',
            borderLeft: `3px solid ${colors.success}`,
            marginLeft: '12px',
            borderRadius: '0 4px 4px 0',
            position: 'relative',
            overflow: 'auto',
            boxShadow: 'inset 0 0 10px rgba(0, 255, 0, 0.1)'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'flex-start'
            }}>
              <span style={{
                color: '#404040',
                fontSize: '11px',
                marginRight: '12px',
                userSelect: 'none',
                fontFamily: 'monospace',
                minWidth: '30px',
                textAlign: 'right',
                paddingTop: '2px'
              }}>
                {lineCounter++}
              </span>
              <div style={{ flex: 1, whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
                {applySyntaxHighlighting(line, codeBlockLang)}
              </div>
            </div>
          </div>
        );
      }

      // What/How/Why explanations with special highlighting
      if (line.match(/^(WHAT|HOW|WHY|EXPLANATION|BREAKDOWN|CONCEPT):/i)) {
        const [label, ...rest] = line.split(':');
        return (
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
      }

      // Comments and explanations (lines starting with #, //, or "Note:")
      if (line.match(/^(\s*)(#|\/\/|Note:|Tip:|Important:)/i)) {
        return (
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
      }

      // Directory tree with better styling
      if (line.match(/^[│├└]/)) {
        return (
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
        return (
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
      }

      // Bullet points with better indentation
      if (line.trim().match(/^[•\-\*]/)) {
        const indent = line.search(/[•\-\*]/);
        return (
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
      }

      // Error messages
      if (line.match(/^(Error|ERROR|❌)/i)) {
        return (
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
      }

      // Success messages
      if (line.match(/^(Success|SUCCESS|✅)/i)) {
        return (
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
      }

      // Warning messages
      if (line.match(/^(Warning|WARNING|⚠️)/i)) {
        return (
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
      }

      // Empty lines for spacing
      if (line.trim() === '') {
        return <div key={i} style={{ height: '8px' }} />;
      }

      // Regular text with better spacing
      return (
        <div key={i} style={{
          color: colors.gray,
          lineHeight: '1.7',
          margin: '2px 0',
          fontSize: '13px'
        }}>
          {line}
        </div>
      );
    }).filter((element): element is JSX.Element => element !== null);
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
            </div>
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
    </>
  );
}