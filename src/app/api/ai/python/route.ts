import { NextRequest, NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export async function POST(request: NextRequest) {
  try {
    const { message, history } = await request.json();

    if (!message) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    // Create context from message history for Anthropic format
    const contextMessages = history?.slice(-5).map((msg: any) => ({
      role: msg.type === 'user' ? 'user' : 'assistant',
      content: msg.content
    })) || [];

    const systemPrompt = `You are a Python AI Assistant specializing in Python development and programming. Your expertise includes:

🐍 Python Programming:
- Code examples, debugging, and best practices
- Python libraries: NumPy, Pandas, Matplotlib, Django, Flask, FastAPI
- Object-oriented programming and design patterns
- Error handling and optimization techniques

🛠️ Development Environment:
- Virtual environments (venv, conda)
- Package management (pip, poetry)
- IDE setup and debugging tools
- Testing frameworks (pytest, unittest)

📊 Data Science & AI:
- Data analysis and visualization
- Machine learning with scikit-learn, TensorFlow, PyTorch
- Jupyter notebooks and data workflows
- Statistical analysis and modeling

🔧 Terminal & System:
- Command line operations
- Git workflows for Python projects
- Environment variables and configuration
- Deployment and DevOps for Python applications

Provide concise, practical answers with code examples when helpful. Format code blocks clearly and explain complex concepts in simple terms. Use emojis sparingly to enhance readability in the terminal interface.`;

    const response = await anthropic.messages.create({
      model: 'claude-3-5-haiku-20241022',
      max_tokens: 500,
      temperature: 0.7,
      system: systemPrompt,
      messages: [
        ...contextMessages,
        { role: 'user', content: message }
      ]
    });

    const aiResponse = response.content[0]?.type === 'text'
      ? response.content[0].text
      : 'I apologize, but I encountered an error processing your request.';

    return NextResponse.json({ message: aiResponse });

  } catch (error: any) {
    console.error('Python AI API Error:', error);

    if (error.status === 401) {
      return NextResponse.json({
        message: '⚠️ Invalid Anthropic API key. Please check your configuration.'
      }, { status: 401 });
    }

    if (error.status === 429) {
      return NextResponse.json({
        message: '⚠️ API rate limit exceeded. Please try again later.'
      }, { status: 429 });
    }

    return NextResponse.json({
      message: '⚠️ Python AI services are temporarily unavailable. Please try again later.'
    }, { status: 500 });
  }
}