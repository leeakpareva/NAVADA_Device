# RAVEN OS - AI-Powered Micro-Display Operating System

A modern, intelligent operating system interface optimized for 64x96mm micro-displays with integrated AI assistant. Features a sleek dark design with ultra-compact layouts and OpenAI-powered chat capabilities.

![RAVEN Device](public/Front-Website1.png)

## 🚀 Features

- 📱 **Micro Display Optimized** - Designed specifically for 64x96mm touchscreen displays
- 🤖 **AI Assistant (Leslie)** - Integrated OpenAI GPT-3.5-turbo powered chat assistant
- 🐍 **THE RAVEN'S SOUL** - Conversational AI Agent with session memory and personality
- 🛡️ **Session Rate Limiting** - Smart protection (20 requests/hour, 3/minute) without login required
- 🎨 **Modern Dark Theme** - Sleek interface with transparent glass effects
- 🪟 **Multi-Window System** - Full window management with drag, resize, minimize, maximize
- 📺 **YouTube Integration** - Built-in YouTube video player with full-screen viewing
- 🖼️ **Dynamic Content** - Auto-loading image galleries and PDF viewers
- 📚 **Learn Center** - PDF document management and viewing system
- 💬 **Real-time Chat** - AI conversations with message history and timestamps
- ⌨️ **Touch-Optimized** - All elements sized for micro screen interactions
- 🚀 **Auto-Deploy Pipeline** - Staging environment with production protection

## 🎯 Applications Included

| App | Icon | Description |
|-----|------|-------------|
| **Terminal** | 💻 | Advanced terminal app with multiple commands and system info |
| **YouTube** | 📺 | Full-featured YouTube video player with URL support |
| **Leslie (AI)** | 🤖 | OpenAI-powered AI assistant with chat interface |
| **RAVEN Terminal** | 🐍 | AI-powered educational coding terminal with Claude integration |
| **DeepSeek AI** | 🧠 | DeepSeek-powered AI agent for advanced reasoning |
| **Screensaver** | 🖼️ | Dynamic image gallery and screensaver system |

## 🤖 RAVEN Terminal - Advanced AI-Powered Learning Platform

The RAVEN Terminal is a comprehensive educational coding environment that combines intelligent AI assistance with advanced development tools. It's designed as a **learning-first platform** that teaches programming concepts while providing powerful productivity features.

### 🎓 Educational AI Modes

#### **GENERATE Mode** - Complete Learning Experience
- **🎯 Learning Objectives**: Clear educational goals for each session
- **🌍 Real-World Analogies**: Connect programming to familiar concepts
- **💻 Extensive Code Comments**: What/How/Why/Concept format for every line
- **🔍 Step-by-Step Breakdowns**: Input → Process → Output → Concept flow
- **📖 Multi-Level Explanations**: Beginner, intermediate, and advanced concepts
- **💡 Alternative Approaches**: Multiple solutions with pros/cons analysis
- **🧪 Practical Examples**: Real use cases, edge cases, and modifications
- **🔧 Debugging Education**: Common errors and troubleshooting strategies
- **🌟 Best Practices**: Professional coding standards demonstrated
- **🚀 Learning Extensions**: Next steps, practice exercises, and advanced features
- **📚 Comprehensive Summaries**: Complete skill and concept recaps
- **🎯 Learning Checkpoints**: Questions to test understanding

#### **EXPLAIN Mode** - Deep Code Analysis
- **📋 Code Overview**: Complete functionality and purpose analysis
- **🏗️ Architecture Analysis**: Structure, patterns, and design decisions
- **🔄 Execution Flow Visualization**: Step-by-step code trace
- **💻 Technology Analysis**: Platform, dependencies, and tool insights
- **🎯 Educational Insights**: Design principles and programming patterns
- **🚀 Learning Extensions**: Related concepts and practice opportunities

#### **DEBUG Mode** - Professional Debugging Education
- **🔍 Systematic Analysis**: Professional debugging methodology
- **🧠 Error Pattern Recognition**: Understanding different error types
- **🛡️ Prevention Strategies**: Avoiding future issues through better practices
- **🧪 Testing & Verification**: Ensuring fixes work properly
- **📈 Debugging Skills**: Tool usage and systematic thinking development

#### **OPTIMIZE Mode** - Performance Engineering Education
- **📊 Performance Analysis**: Bottleneck identification and complexity analysis
- **🔬 Optimization Methodology**: Scientific performance improvement approach
- **🧮 Algorithmic Improvements**: Computer science principles in practice
- **⚡ Advanced Concepts**: Parallel processing, caching, and async patterns

#### **CONVERT Mode** - Cross-Language Mastery
- **🧠 Language Paradigms**: Deep comparison of programming philosophies
- **⚡ Translation Analysis**: Line-by-line conversion explanations
- **🔧 Language-Specific Features**: Unique capabilities and best practices
- **💡 Multi-Language Skills**: Cross-platform development abilities

### 🚀 Advanced Development Features

#### **Enhanced Context Memory & Session Persistence**
- **💾 Persistent Chat History**: Stores last 50 messages with 24-hour retention
- **🧠 Workspace Context**: Maintains history of last 10 code operations
- **🔄 Smart Context References**: "optimize that function" works automatically
- **⚙️ Session Preferences**: Saves language, mode, and settings
- **🔄 Auto-Restore**: Continue conversations across page refreshes

#### **Intelligent Code Streaming & Live Preview**
- **⚡ Streaming Responses**: Real-time word-by-word AI response display
- **🏃‍♂️ Live JavaScript Execution**: Sandboxed code testing with console output
- **🔍 Real-Time Syntax Checking**: Validates JavaScript/TypeScript as you type
- **📊 Execution Results Panel**: Clear output formatting with error handling
- **🧹 Context Management**: Easy workspace reset and cleanup

#### **Session-Based Color Themes**
Choose from 5 professional color schemes (resets on session clear):
- **🟢 Matrix Green** - Classic terminal aesthetic
- **🔴 Cyber Red** - Cyberpunk-inspired warm tones
- **🟠 Solar Orange** - Amber/golden technical theme
- **🟣 Neon Purple** - Vibrant violet highlights
- **🔵 Deep Blue** - Ocean-inspired cool palette

### 🛠️ Technical Capabilities

#### **Language Support**
- **Python** - Complete syntax highlighting and AI assistance
- **JavaScript** - Live execution with console output capture
- **TypeScript** - Real-time error detection and type checking
- **Java** - Professional enterprise development support
- **SQL** - Database query optimization and explanation
- **More Languages** - Extensible support for additional languages

#### **Development Tools**
- **Syntax Highlighting** - Custom color-coded display for all supported languages
- **Error Detection** - Real-time syntax validation with helpful messages
- **Code Execution** - Safe sandboxed environment for testing JavaScript
- **Performance Analysis** - Big O complexity analysis and optimization suggestions
- **Cross-Language Conversion** - Intelligent translation between programming languages

#### **AI-Powered Features**
- **Context-Aware Processing** - References previous code automatically
- **Educational Focus** - Every response designed for learning
- **Professional Standards** - Industry best practices integrated
- **Comprehensive Coverage** - End-to-end explanations with summaries

## 🌐 Web Pages

- **About** - Comprehensive product information and team details
- **Designs** - Auto-loading image gallery from `/public/Designs/` folder
- **Learn** - PDF document center with auto-detection from `/public/Learn/` folder
- **Signup** - Email capture system with SQLite database storage
- **Agent** - RAVEN Terminal Agent with interactive loading sequence

## 🛠️ Getting Started

```bash
# Clone the repository
git clone https://github.com/leeakpareva/NAVADA_Device.git
cd navada-os

# Install dependencies
npm install

# Set up environment variables
cp .env.local.example .env.local
# Add your API keys to .env.local

# Run development server
npm run dev

# Run Prisma Studio (Database Management)
npm run studio

# Build for production
npm run build

# Start production server
npm start
```

Open [http://localhost:3000](http://localhost:3000) to see the result.

## 🔧 Environment Setup

Create a `.env.local` file with:

```env
OPENAI_API_KEY=your_openai_api_key_here
ANTHROPIC_API_KEY=your_anthropic_api_key_here
```

## 💾 Database Features

- **Email Capture**: Automatic SQLite database for signup emails
- **Auto-Creation**: Database and tables created automatically on first run
- **Email Validation**: Built-in email format validation and duplicate prevention
- **Statistics**: Real-time signup counter display
- **Prisma Studio**: Visual database management interface
- **Secure Access**: Email app requires lock code "2222" for viewing

### Database Management

#### Frontend Email Viewer (In-App)
- **App Name**: Emails
- **Lock Code**: `2222`
- **Features**: View emails, copy to clipboard, export as .txt file
- **Security**: Password-protected interface with lock/unlock functionality

#### Backend Database Management (Prisma Studio)
```bash
# Start Prisma Studio
npm run studio
```
- **URL**: http://localhost:5555
- **Features**:
  - Visual data browser and editor
  - Export data as CSV/JSON
  - Advanced query builder
  - Real-time data editing
  - Database schema visualization
  - Full CRUD operations

### Database API Endpoints

- `POST /api/signup` - Add email to waitlist
- `GET /api/signup?action=count` - Get total signup count
- `GET /api/signup?action=list` - Get all signup emails (admin use)

## 🎨 Tech Stack

- **Framework**: Next.js 16.1.1 (App Router with Turbopack)
- **AI Integration**:
  - OpenAI GPT-3.5-turbo API (Leslie Assistant)
  - Anthropic Claude 3.5 Haiku (RAVEN Terminal Educational AI)
  - DeepSeek API (DeepSeek AI Agent)
- **Database**: SQLite3 with Prisma ORM and TypeScript types
- **Database Management**: Prisma Studio for visual data management
- **Styling**: Tailwind CSS with glass morphism effects
- **State Management**: Zustand for window and app management
- **Language**: TypeScript with strict type checking
- **Linting**: ESLint v9 with flat config
- **Build Tool**: Turbopack for faster builds
- **UI Components**: Custom micro-display optimized components
- **Target Hardware**: Raspberry Pi 4B + micro touchscreen displays
- **Deployment**: Vercel with automatic GitHub integration

## 📱 Layout Architecture

### Desktop Layout
```
Row 1: [Terminal 💻] [YouTube 📺] [Leslie 🤖] [RAVEN 🐍] [DeepSeek 🧠] [Screensaver 🖼️]
```

### Navigation
- **Fixed Header**: Transparent glass effect with RAVEN branding
- **Page Navigation**: About | Designs | Learn | Signup
- **Window Controls**: Standard minimize, maximize, close functionality

## 🔧 Core Features

### AI Assistant (Leslie)
- **OpenAI Integration**: GPT-3.5-turbo powered responses
- **Chat Interface**: Real-time messaging with history
- **Window Controls**: Full window management capabilities
- **Smart Responses**: Context-aware conversations optimized for micro-displays

### Dynamic Content Management
- **Auto Image Detection**: Scans `/public/Designs/` for new images
- **PDF Auto-Loading**: Automatically detects PDFs in `/public/Learn/`
- **API-Driven**: RESTful endpoints for content management

### Window System
- **Draggable Windows**: Click and drag window title bars
- **Resize Support**: Responsive window sizing
- **Z-Index Management**: Proper window layering
- **Focus Management**: Click to bring windows to front
- **Standardized Sizing**: All apps fit within screen dimensions

## 📂 Project Structure

```
raven-os/
├── public/
│   ├── Designs/              # Auto-loading image gallery
│   ├── Learn/                # Auto-loading PDF documents
│   └── Front-Website1.png    # Device frame image
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── ai/
│   │   │   │   ├── chat/      # OpenAI chat endpoint (Leslie)
│   │   │   │   └── python/    # Anthropic Claude endpoint (Python AI)
│   │   │   ├── designs/      # Dynamic image API
│   │   │   ├── pdfs/         # PDF auto-detection API
│   │   │   └── signup/       # Email capture API
│   │   ├── globals.css       # Micro-display optimized styles
│   │   ├── layout.tsx        # Root layout
│   │   └── page.tsx          # Main application
│   ├── components/
│   │   ├── apps/
│   │   │   ├── AIAgentApp.tsx    # Leslie AI chat interface (OpenAI)
│   │   │   ├── RavenApp.tsx      # Python AI assistant (Anthropic)
│   │   │   ├── EmailsApp.tsx     # Secure email database viewer
│   │   │   ├── YouTubeApp.tsx    # YouTube video player
│   │   │   ├── TerminalApp.tsx   # Advanced terminal
│   │   │   └── ScreensaverApp.tsx # Image gallery
│   │   ├── device/
│   │   │   └── DeviceFrame.tsx   # Device wrapper
│   │   ├── layout/
│   │   │   ├── Header.tsx        # Navigation header
│   │   │   └── ScrollablePage.tsx # Scrollable page wrapper
│   │   ├── os/
│   │   │   ├── Desktop.tsx       # Main desktop environment
│   │   │   ├── DesktopIcons.tsx  # App icon grid
│   │   │   ├── Window.tsx        # Window management
│   │   │   └── Taskbar.tsx       # Bottom taskbar
│   │   └── pages/
│   │       ├── AboutPage.tsx     # About page
│   │       ├── DesignsPage.tsx   # Image gallery page
│   │       ├── LearnPage.tsx     # PDF viewer page
│   │       └── SignupPage.tsx    # Email capture page
│   ├── lib/
│   │   ├── database.ts       # SQLite database utilities
│   │   └── storage.ts        # Local storage management
│   └── stores/
│       └── osStore.ts        # Window and app state management
├── prisma/
│   └── schema.prisma        # Prisma database schema
├── data/
│   └── signups.db           # SQLite database (auto-created)
├── vercel.json              # Vercel deployment config
├── prisma.config.ts         # Prisma configuration
└── package.json
```

## 🚀 Deployment & Pipeline

### Automated Staging Pipeline ✅
The project includes a comprehensive deployment pipeline with automated staging and manual production promotion:

#### 🔄 **Pipeline Flow:**
```
Development → staging branch → GitHub Action → Testing Repo → Vercel Staging
                                                                    ↓
Production Vercel ← Manual Promotion (Protected) ← Review & Test
```

#### 📋 **Workflow:**
1. **Develop**: Work on `master` branch normally
2. **Stage**: `git checkout staging && git merge master && git push origin staging`
3. **Auto-Deploy**: GitHub Action automatically builds and deploys to testing repository
4. **Vercel Staging**: Testing environment auto-deploys to staging URL
5. **Review**: Test thoroughly on staging environment
6. **Manual Promotion**: Promote to production in Vercel when ready

#### 🔗 **URLs:**
- **Staging**: https://navada-testing.vercel.app (auto-updates from staging branch)
- **Production**: https://navada.vercel.app (manual promotion only)
- **Testing Repository**: https://github.com/leeakpareva/NAVADA_Device_Testing

#### ⚙️ **Pipeline Configuration:**
- **GitHub Secrets**: `ANTHROPIC_API_KEY`, `TESTING_REPO_TOKEN`
- **Node.js Version**: 20+ (required for Next.js 16.1.1)
- **Build Target**: Static export for testing environment
- **Rate Limiting**: Session-based (20 requests/hour, 3/minute)

#### 🛡️ **Safety Features:**
- ✅ **Production Protected**: No automatic production deployments
- ✅ **Staging Testing**: Every change automatically tested
- ✅ **Easy Rollback**: Quick revert capabilities
- ✅ **Session Rate Limiting**: Protects from abuse
- ✅ **AI Agent Integration**: "THE RAVEN'S SOUL" with conversational interface

### Vercel Production Setup
1. Connect your GitHub repository to Vercel
2. Add environment variables in Vercel dashboard:
   - `ANTHROPIC_API_KEY`: Your Anthropic API key
   - `OPENAI_API_KEY`: Your OpenAI API key (optional)
   - `DEEPSEEK_API_KEY`: Your DeepSeek API key (optional)
3. Manual promotion from staging to production

#### ⚠️ Common Deployment Issues & Fixes

**Issue 1: GitHub Action Build Failures (Static Export Issues)**

**Failed Commit**: `2acf8e1` - "Setup complete deployment pipeline with staging environment"

**Root Cause**: The GitHub Action failed because:
1. **Node.js Version**: Initially used Node.js 18, but Next.js 16.1.1 requires >=20.9.0
2. **API Routes**: Missing `export const dynamic = 'force-static'` in API routes for static export
3. **Static Export**: Routes like `/api/designs`, `/api/pdfs`, `/api/screensaver` weren't configured for static builds

**Error Messages:**
```bash
# Node.js version error
You are using Node.js 18.20.8. For Next.js, Node.js version ">=20.9.0" is required.

# Static export error
Error: export const dynamic = "force-static"/export const revalidate not configured on route "/api/designs"
```

**Solutions Applied:**
1. **Updated Node.js version** in GitHub Action from 18 to 20
2. **Added force-static exports** to all file-serving API routes:
   ```typescript
   export const dynamic = 'force-static';
   ```
3. **Fixed build configuration** for static export compatibility

**Final Result**: Commit `e164174` successfully deployed with all fixes ✅

**Issue 2: TypeScript Error in RAVENTerminal.tsx**

**Error Message:**
```
Type error: Type '(Element | null)[]' is not assignable to type 'Element[]'.
Type 'Element | null' is not assignable to type 'Element'.
Type 'null' is not assignable to type 'ReactElement<any, any>'.
```

**Solution:**
In `src/components/RAVENTerminal.tsx`, add a filter to remove null values from the map result:
```tsx
return lines.map((line, i) => {
  // ... existing mapping logic that may return null
}).filter((element): element is JSX.Element => element !== null);
```

This ensures the function returns `JSX.Element[]` instead of `(JSX.Element | null)[]`.

**Issue 2: Cross-Origin Request Blocking (CORS) for Local Network Access**

**Error Message:**
```
⚠ Blocked cross-origin request from 192.168.0.18 to /_next/* resource
```

**Solution:**
Configure proper CORS headers in `next.config.js`:
```javascript
const nextConfig = {
  // ... other config

  // Configure headers for CORS
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Access-Control-Allow-Origin',
            value: '*', // In production, replace with specific origins
          },
          {
            key: 'Access-Control-Allow-Methods',
            value: 'GET, POST, PUT, DELETE, OPTIONS',
          },
          {
            key: 'Access-Control-Allow-Headers',
            value: 'X-Requested-With, Content-Type, Authorization',
          },
        ],
      },
    ];
  },

  // Allow connections from any host in development
  webpack: (config, { dev }) => {
    if (dev) {
      config.devServer = {
        ...config.devServer,
        allowedHosts: 'all',
      };
    }
    return config;
  },
};
```

After making these changes, restart the development server for the configuration to take effect.

**Issue 3: Hydration Mismatch with Browser Extensions**

Browser extensions (like Jetski, React DevTools, etc.) can inject attributes into the HTML element causing hydration mismatches.

**Error Message:**
```
A tree hydrated but some attributes of the server rendered HTML didn't match the client properties
- data-jetski-tab-id="..." attribute added by browser extension
```

**Solution:**
Add `suppressHydrationWarning` to the `<html>` and `<body>` elements in `src/app/layout.tsx`:
```tsx
<html lang="en" suppressHydrationWarning>
  <body className="..." suppressHydrationWarning>
    {children}
  </body>
</html>
```

**Issue 4: "Environment Variable 'OPENAI_API_KEY' references Secret 'openai_api_key', which does not exist"**

This error occurs when `vercel.json` contains secret references (`@secret_name`) instead of using environment variables directly.

**Solution:**
1. Remove secret references from `vercel.json`:
   ```json
   {
     "functions": {
       "src/app/api/ai/chat/route.ts": { "maxDuration": 30 }
     }
   }
   ```
   ❌ Remove this section if present:
   ```json
   "env": {
     "OPENAI_API_KEY": "@openai_api_key"
   }
   ```

2. Use Vercel CLI to add environment variables properly:
   ```bash
   # Add for all environments
   echo "your_api_key" | npx vercel env add OPENAI_API_KEY production
   echo "your_api_key" | npx vercel env add OPENAI_API_KEY preview
   echo "your_api_key" | npx vercel env add OPENAI_API_KEY development
   ```

3. If CLI deployment fails, create fresh project:
   ```bash
   npx vercel remove project-name --yes
   rm -rf .vercel
   npx vercel --prod --yes
   ```

**Fix Summary:**
- Remove secret references from `vercel.json`
- Add environment variables via CLI or dashboard
- Use plain encrypted values, not secret references
- Delete and recreate project if persistent issues

### Local Production
```bash
npm run build
npm start
```

### Raspberry Pi Setup
1. Install Node.js 18+ on Raspberry Pi OS
2. Clone repository and install dependencies
3. Configure environment variables
4. Set up systemd service for auto-start
5. Connect micro-display hardware

## 📊 Analytics & Data

- **Email Signups**: Captured in local SQLite database
- **Real-time Counters**: Live signup statistics
- **Data Export**: Admin endpoints for data retrieval
- **Privacy**: All data stored locally, no external analytics

## 🔐 Security Features

- **Input Validation**: Email format validation and sanitization
- **SQL Injection Protection**: Parameterized queries
- **Rate Limiting**: Built-in request throttling
- **Environment Variables**: Secure API key management
- **CORS Protection**: Configured for production deployment

## 🎯 Roadmap

- [ ] User authentication system
- [ ] Multi-language AI responses
- [ ] Voice integration
- [ ] Mobile app companion
- [ ] Hardware integration APIs
- [ ] Plugin system for custom apps

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📄 License

MIT © RAVEN OS

---

**Built with 🤖 AI and 💜 by RAVEN Team | Version 2.0**