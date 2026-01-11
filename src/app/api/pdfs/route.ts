import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    const pdfsDir = path.join(process.cwd(), 'public', 'pdfs');

    // Check if directory exists
    if (!fs.existsSync(pdfsDir)) {
      return NextResponse.json({ pdfs: [] });
    }

    // Read all files in the pdfs directory
    const files = fs.readdirSync(pdfsDir);

    // Filter for PDF files and create PDF data
    const pdfs = files
      .filter(file => file.toLowerCase().endsWith('.pdf'))
      .map((file, index) => {
        // Generate title from filename by removing extension and formatting
        const nameWithoutExt = file.replace(/\.pdf$/i, '');
        const title = nameWithoutExt
          .replace(/_/g, ' ')
          .replace(/-/g, ' ')
          .replace(/([A-Z])/g, ' $1')
          .trim()
          .replace(/\s+/g, ' ')
          .split(' ')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
          .join(' ');

        // Generate description based on filename patterns
        let description = 'Technical documentation and learning material';
        if (nameWithoutExt.toLowerCase().includes('protocol')) {
          description = 'Protocol documentation for NAVADA system implementation';
        } else if (nameWithoutExt.toLowerCase().includes('education')) {
          description = 'Educational resources and learning materials';
        } else if (nameWithoutExt.toLowerCase().includes('guide')) {
          description = 'Step-by-step guide and instructions';
        } else if (nameWithoutExt.toLowerCase().includes('api')) {
          description = 'API documentation and reference material';
        }

        return {
          id: nameWithoutExt.toLowerCase().replace(/[^a-z0-9]/g, '-'),
          title,
          description,
          filename: file,
          path: `/pdfs/${file}`
        };
      })
      .sort((a, b) => a.title.localeCompare(b.title));

    return NextResponse.json({ pdfs });
  } catch (error) {
    console.error('Error reading pdfs directory:', error);
    return NextResponse.json({ pdfs: [], error: 'Failed to load PDFs' }, { status: 500 });
  }
}