import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export const dynamic = 'force-static';

export async function GET() {
  try {
    const screensaverDir = path.join(process.cwd(), 'public', 'screensaver');

    // Check if screensaver directory exists
    if (!fs.existsSync(screensaverDir)) {
      return NextResponse.json({ images: [] });
    }

    // Read all files in the screensaver directory
    const files = fs.readdirSync(screensaverDir);

    // Filter for image files
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.webp', '.svg'];
    const images = files
      .filter(file => {
        const ext = path.extname(file).toLowerCase();
        return imageExtensions.includes(ext);
      })
      .map(file => `/screensaver/${file}`)
      .sort(); // Sort alphabetically

    return NextResponse.json({ images });
  } catch (error) {
    console.error('Error reading screensaver directory:', error);
    return NextResponse.json({ error: 'Failed to load images' }, { status: 500 });
  }
}