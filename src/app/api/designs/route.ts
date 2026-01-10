import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    const designsDir = path.join(process.cwd(), 'public', 'Designs');

    // Check if directory exists
    if (!fs.existsSync(designsDir)) {
      return NextResponse.json({ images: [] });
    }

    // Read all files in the Designs directory
    const files = fs.readdirSync(designsDir);

    // Filter for PNG files and create image data
    const images = files
      .filter(file => file.toLowerCase().endsWith('.png'))
      .map((file, index) => ({
        id: index + 1,
        filename: file,
        image: `/Designs/${file}`,
        title: file.replace(/\.(png|jpg|jpeg|gif)$/i, '').replace(/[-_]/g, ' '),
        category: 'Design'
      }))
      .sort((a, b) => a.filename.localeCompare(b.filename, undefined, { numeric: true }));

    return NextResponse.json({ images });
  } catch (error) {
    console.error('Error reading designs directory:', error);
    return NextResponse.json({ images: [], error: 'Failed to load designs' }, { status: 500 });
  }
}