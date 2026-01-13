# RAVEN OS - AI-Powered Micro-Display Operating System

A modern, intelligent operating system interface optimized for 64x96mm micro-displays with integrated AI assistant. Features a sleek dark design with ultra-compact layouts and OpenAI-powered chat capabilities.

![RAVEN Device](public/Front-Website1.png)

## 🚀 Features

- 📱 **Micro Display Optimized** - Designed specifically for 64x96mm touchscreen displays
- 🤖 **AI Assistant (Leslie)** - Integrated OpenAI GPT-3.5-turbo powered chat assistant
- 🎨 **Modern Dark Theme** - Sleek interface with transparent glass effects
- 🪟 **Multi-Window System** - Full window management with drag, resize, minimize, maximize
- 📺 **YouTube Integration** - Built-in YouTube video player with full-screen viewing
- 🖼️ **Dynamic Content** - Auto-loading image galleries and PDF viewers
- 📚 **Learn Center** - PDF document management and viewing system
- 💬 **Real-time Chat** - AI conversations with message history and timestamps
- ⌨️ **Touch-Optimized** - All elements sized for micro screen interactions

## 🎯 Applications Included

| App | Icon | Description |
|-----|------|-------------|
| **Terminal** | 💻 | Advanced terminal app with multiple commands and system info |
| **YouTube** | 📺 | Full-featured YouTube video player with URL support |
| **Leslie (AI)** | 🤖 | OpenAI-powered AI assistant with chat interface |
| **RAVEN Terminal** | 🐍 | Integrated AI-powered terminal with Anthropic Claude API |
| **DeepSeek AI** | 🧠 | DeepSeek-powered AI agent for advanced reasoning |
| **Screensaver** | 🖼️ | Dynamic image gallery and screensaver system |

## 🤖 RAVEN Terminal Features

The RAVEN Terminal is a fully integrated AI-powered command-line interface that combines traditional terminal commands with advanced AI capabilities:

### Terminal Commands
- `help` - Display available commands
- `ls` - List directory contents
- `cd` - Change directory
- `pwd` - Print working directory
- `cat` - Display file contents
- `clear` - Clear terminal screen
- `echo` - Print messages
- `env` - Display environment variables
- `export` - Set environment variables
- `alias` - Create command shortcuts
- `history` - View command history
- `theme` - Change terminal theme

### AI Commands (Powered by Anthropic Claude)
- `raven generate "description"` - Convert natural language to code
- `raven explain [file]` - Get code explanations
- `raven debug [code]` - Find and fix errors
- `raven optimize [code]` - Improve performance
- `raven convert [code]` - Translate between languages
- `raven test [code]` - Generate comprehensive tests

### Configuration Commands
- `lang [language]` - Set programming language (javascript, python, typescript, etc.)
- `setkey [api_key]` - Configure Anthropic API key for AI features

### Features
- Real-time syntax highlighting
- Command history with arrow key navigation
- Tab autocomplete for commands
- Virtual file system navigation
- Customizable themes
- Integrated with RAVEN loading sequence

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
  - Anthropic Claude 3.5 Haiku (Python/RAVEN Assistant)
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

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Add environment variables in Vercel dashboard:
   - `OPENAI_API_KEY`: Your OpenAI API key
   - `ANTHROPIC_API_KEY`: Your Anthropic API key
   - `DEEPSEEK_API_KEY`: Your DeepSeek API key
   - `TTS_PROMPT_ID`: Your TTS prompt ID
3. Deploy automatically on push to main branch

#### ⚠️ Common Deployment Issues & Fixes

**Issue 1: TypeScript Error in RAVENTerminal.tsx**

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