import { NextRequest, NextResponse } from 'next/server';
import { addEmail, getAllEmails, getEmailCount } from '@/lib/database';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email } = body;

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Invalid email format' }, { status: 400 });
    }

    await addEmail(email.toLowerCase().trim());

    const count = await getEmailCount();

    return NextResponse.json({
      message: 'Email added successfully',
      totalSignups: count
    });
  } catch (error: any) {
    console.error('Signup error:', error);

    if (error.code === 'SQLITE_CONSTRAINT') {
      return NextResponse.json(
        { error: 'Email already registered' },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to process signup' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const action = searchParams.get('action');

    if (action === 'count') {
      const count = await getEmailCount();
      return NextResponse.json({ count });
    } else if (action === 'list') {
      const emails = await getAllEmails();
      return NextResponse.json({ emails });
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
  } catch (error) {
    console.error('GET signup error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch signup data' },
      { status: 500 }
    );
  }
}