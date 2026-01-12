import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: NextRequest) {
  try {
    const { email, message } = await request.json();

    if (!email || !message) {
      return NextResponse.json(
        { error: 'Email and message are required' },
        { status: 400 }
      );
    }

    // Create Gmail transporter
    // Note: For production, you should use an App Password or OAuth2
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER || 'Send2chopstix@gmail.com',
        pass: process.env.GMAIL_APP_PASSWORD || '' // You need to set this in .env.local
      }
    });

    // Email options
    const mailOptions = {
      from: `"NAVADA/RAVEN Waitlist" <${process.env.GMAIL_USER || 'Send2chopstix@gmail.com'}>`,
      to: 'lee@navada.info',
      subject: 'New NAVADA/RAVEN Waitlist Signup',
      text: `New signup from: ${email}\n\nMessage:\n${message}\n\nTimestamp: ${new Date().toISOString()}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">New NAVADA/RAVEN Waitlist Signup</h2>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Message:</strong></p>
          <p style="background: #f5f5f5; padding: 15px; border-radius: 5px;">${message}</p>
          <p style="color: #666; font-size: 12px;">Timestamp: ${new Date().toISOString()}</p>
        </div>
      `
    };

    // Try to send email
    try {
      if (process.env.GMAIL_APP_PASSWORD) {
        await transporter.sendMail(mailOptions);
        console.log('Email sent successfully to lee@navada.info');
      } else {
        // Fallback: just log if no password is configured
        console.log('Email would be sent to lee@navada.info:', {
          from: email,
          message: message
        });
      }
    } catch (emailError) {
      console.error('Error sending email:', emailError);
      // Don't fail the request if email fails, still return success to user
    }

    // Return success response
    return NextResponse.json({
      success: true,
      message: 'Thank you for contacting us! We will get back to you soon.'
    });

  } catch (error) {
    console.error('Error processing contact form:', error);
    return NextResponse.json(
      { error: 'Failed to process contact form' },
      { status: 500 }
    );
  }
}