# NAVADA OS - Protocol 26/1

A modern, clean operating system interface optimized for 64x96mm Osoyoo touchscreen displays and Raspberry Pi 4B. Features a dark Raspberry Pi-inspired design with ultra-compact layouts for micro displays.

![NAVADA Device](public/Front-Website1.png)

## Features

- 📱 **Micro Display Optimized** - Designed specifically for 64x96mm Osoyoo touchscreen displays
- 🎨 **Raspberry Pi Theme** - Dark background with green accents matching Pi OS aesthetics
- 🪟 **Ultra-Compact Windows** - Touch-friendly micro-sized windows and controls
- 🚀 **Minimal Interface** - Single app design with micro text (6-8px fonts)
- ⌨️ **Touch-Optimized** - All elements sized appropriately for tiny screen dimensions
- 📱 **Raspberry Pi 4B Ready** - Optimized for extremely small display real estate

## Applications Included

| App | Description |
|-----|-------------|
| App | Single simplified terminal application optimized for micro display |

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Open [http://localhost:3000](http://localhost:3000) to see the result.

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS with custom touch optimizations
- **State Management**: Zustand
- **Design System**: Clean, modern with accessibility focus
- **Language**: TypeScript
- **Target Hardware**: Raspberry Pi 4B + Osoyoo Touchscreen

## Customization

### Screen Position Calibration

⚠️ **IMPORTANT**: The screen position is **LOCKED** and calibrated for optimal display.

The screen overlay position is defined in `src/components/device/DeviceFrame.tsx`:

```typescript
const screenPosition = {
  top: 11.425,    // % from top - LOCKED
  left: 32.5,     // % from left - LOCKED
  width: 34.75,   // % of device width - LOCKED
  height: 35.05,  // % of device height - LOCKED
};
```

**DO NOT MODIFY** these values when changing the `Front-Website1.png` image. The position has been precisely calibrated to fit the screen area perfectly.

### 64x96mm Micro Display Optimization Rules

⚠️ **CRITICAL**: All future development MUST follow these micro display optimization rules:

#### Text Sizing Rules
- **Base font size**: 7-9px optimal range
- **Terminal text**: 7px (`text-[7px]`)
- **Window titles**: 7px (`text-[7px]`)
- **Window controls**: 9.3px (`text-[9.3px]`) - no background colors, text-only
- **Desktop icon text**: 9px (`text-[9px]`)
- **Clock overlay**: 6px (`text-[6px]`)
- **Line height**: Use `leading-none` or `leading-tight`

#### Component Sizing Rules
- **Window control buttons**: Text-only symbols (−□×) with 4px spacing (`gap-1`)
- **Desktop icons**: 20px (w-5 h-5) with transparent background, no borders
- **Icon container**: 24px width maximum
- **Taskbar height**: 20px maximum
- **Window title bar**: 12px height maximum
- **Padding/margins**: Use 0.5px, 1px, 2px maximum

#### Layout Rules
- **No borders** on desktop icons (use `bg-transparent`)
- **No background colors** on window controls - text-only symbols
- **Minimize gaps**: Use `gap-0`, `gap-0.5`, `gap-1` for optimal spacing
- **Ultra-compact spacing**: Prefer `p-0.5`, `m-0.5`, `px-1`, `py-1`
- **Clock positioning**: Top-right corner with minimal padding

#### Performance Rules
- **Single app maximum** - interface cannot handle multiple apps
- **Minimal animations** - reduce visual overhead
- **Essential elements only** - every pixel counts
- **Clean codebase** - removed unused app components for optimization

#### Testing Requirements
Before committing any changes, verify:
1. All text is readable on 64x96mm display
2. Touch targets are accessible (minimum 16px)
3. No UI elements extend beyond screen boundaries
4. Text fits within designated containers
5. Icons scale proportionally to screen dimensions

**FAILURE TO FOLLOW THESE RULES WILL BREAK THE MICRO DISPLAY OPTIMIZATION**

### Adding New Apps

1. Create component in `src/components/apps/YourApp.tsx`
2. Add app definition to `src/stores/osStore.ts` in the `defaultApps` array
3. Import and register component in `src/components/os/Desktop.tsx`

### Customizing Boot Sequence

Edit `src/components/os/BootSequence.tsx` to modify:
- ASCII art logo
- Boot messages and timing
- Progress bar behavior

## Terminal Commands

- `help` - Show available commands
- `about` - System information
- `neofetch` - Display system info art
- `ls` - List files
- `cat <file>` - View file contents
- `clear` - Clear terminal
- `date` - Show current date/time
- `whoami` - Current user
- `echo <text>` - Echo text
- `matrix` - Easter egg 🐰

## Project Structure

```
navada-os/
├── public/
│   └── Front-Website1.png   # Device frame image (DO NOT change screen position when updating)
├── src/
│   ├── app/
│   │   ├── globals.css      # Global styles optimized for 64x96mm display
│   │   ├── layout.tsx       # Root layout with fonts
│   │   └── page.tsx         # Main page component
│   ├── components/
│   │   ├── device/
│   │   │   └── DeviceFrame.tsx    # Device wrapper with locked screen position
│   │   ├── os/
│   │   │   ├── BootSequence.tsx   # Boot animation
│   │   │   ├── Desktop.tsx        # Main desktop
│   │   │   ├── DesktopIcons.tsx   # Micro-optimized app icons
│   │   │   ├── Taskbar.tsx        # Ultra-compact taskbar
│   │   │   └── Window.tsx         # Micro-sized draggable window
│   │   └── apps/
│   │       └── TerminalApp.tsx    # Single optimized terminal app
│   └── stores/
│       └── osStore.ts             # Zustand state (single app config)
├── tailwind.config.js
├── tsconfig.json
└── package.json
```

## Deployment

### Raspberry Pi 4B Setup

1. **Install Raspberry Pi OS Lite**
2. **Install Node.js**:
   ```bash
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt-get install -y nodejs
   ```
3. **Clone and build the project**:
   ```bash
   git clone <repository>
   cd navada-os
   npm install
   npm run build
   npm start
   ```
4. **Configure Osoyoo display** (follow manufacturer instructions)
5. **Set up auto-start** (optional)

### Other Deployment Options

Deploy to Vercel:
```bash
npm run build
# Then deploy via Vercel CLI or GitHub integration
```

Or any static hosting:
```bash
npm run build
npm run start
```

## License

MIT © NAVADA

---

Built with 💜 by NAVADA | Protocol 26/1
