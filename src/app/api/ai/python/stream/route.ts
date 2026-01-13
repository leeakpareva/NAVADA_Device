import { NextRequest } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export async function POST(request: NextRequest) {
  try {
    const { message, history } = await request.json();

    if (!message) {
      return new Response(JSON.stringify({ error: 'Message is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Create context from message history for Anthropic format
    const contextMessages = history?.slice(-5).map((msg: any) => ({
      role: msg.type === 'user' ? 'user' : 'assistant',
      content: msg.content
    })) || [];

    const systemPrompt = `You are RAVEN, an expert coding assistant. Generate code with comprehensive inline comments.

IMPORTANT: Include detailed comments using the what/how/why format:
- WHAT: Explain what the code does
- HOW: Explain how it works
- WHY: Explain why this approach is used

Format your responses with clear sections and use syntax highlighting markers.
Always provide working, production-ready code with excellent documentation.`;

    // Create streaming response
    const stream = await anthropic.messages.create({
      model: 'claude-3-5-haiku-20241022',
      max_tokens: 2000,
      temperature: 0.7,
      system: systemPrompt,
      messages: [
        ...contextMessages,
        { role: 'user', content: message }
      ],
      stream: true,
    });

    // Create a ReadableStream for the response
    const encoder = new TextEncoder();
    const readable = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of stream) {
            if (chunk.type === 'content_block_delta' && chunk.delta.type === 'text_delta') {
              const text = chunk.delta.text;
              // Send as Server-Sent Events format
              controller.enqueue(encoder.encode(`data: ${JSON.stringify({ text })}\n\n`));
            }
          }
          // Send completion signal
          controller.enqueue(encoder.encode('data: [DONE]\n\n'));
          controller.close();
        } catch (error) {
          controller.error(error);
        }
      },
    });

    return new Response(readable, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    });

  } catch (error: any) {
    console.error('Python AI Stream API Error:', error);

    if (error.status === 401) {
      return new Response(JSON.stringify({
        message: '⚠️ Invalid Anthropic API key. Please check your configuration.'
      }), { status: 401, headers: { 'Content-Type': 'application/json' } });
    }

    if (error.status === 429) {
      return new Response(JSON.stringify({
        message: '⚠️ API rate limit exceeded. Please try again later.'
      }), { status: 429, headers: { 'Content-Type': 'application/json' } });
    }

    return new Response(JSON.stringify({
      message: '⚠️ Python AI services are temporarily unavailable. Please try again later.'
    }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
}