import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { message, history } = await request.json();

    if (!message) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    const apiKey = process.env.DEEPSEEK_API_KEY;
    if (!apiKey) {
      return NextResponse.json({
        message: '⚠️ DeepSeek API key not configured. Please add DEEPSEEK_API_KEY to your environment variables.'
      }, { status: 500 });
    }

    // Create context from message history
    const contextMessages = history?.slice(-5).map((msg: any) => ({
      role: msg.type === 'user' ? 'user' : 'assistant',
      content: msg.content
    })) || [];

    const systemPrompt = `You are DeepSeek, an advanced AI assistant specialized in:

🚀 Advanced Capabilities:
- Complex reasoning and problem-solving
- Advanced mathematics and algorithms
- System design and architecture
- Code generation and debugging across all languages
- Deep technical explanations

💡 Expertise Areas:
- Software engineering best practices
- Data structures and algorithms
- Machine learning and AI concepts
- System optimization and performance
- Security and cryptography

🔧 Development Support:
- Full-stack development guidance
- API design and implementation
- Database design and optimization
- DevOps and deployment strategies

Provide detailed, accurate, and practical solutions. Use examples and code snippets when helpful. Focus on clarity and depth in explanations.`;

    const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: [
          { role: 'system', content: systemPrompt },
          ...contextMessages,
          { role: 'user', content: message }
        ],
        temperature: 0.7,
        max_tokens: 1000,
        top_p: 0.9,
        frequency_penalty: 0.0,
        presence_penalty: 0.0
      })
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('DeepSeek API Error:', errorData);

      if (response.status === 401) {
        return NextResponse.json({
          message: '⚠️ Invalid DeepSeek API key. Please check your configuration.'
        }, { status: 401 });
      }

      if (response.status === 429) {
        return NextResponse.json({
          message: '⚠️ API rate limit exceeded. Please try again later.'
        }, { status: 429 });
      }

      throw new Error(`DeepSeek API error: ${response.status}`);
    }

    const data = await response.json();
    const aiResponse = data.choices?.[0]?.message?.content ||
      'I apologize, but I encountered an error processing your request.';

    return NextResponse.json({ message: aiResponse });

  } catch (error: any) {
    console.error('DeepSeek API Error:', error);

    return NextResponse.json({
      message: '⚠️ DeepSeek services are temporarily unavailable. Please try again later.'
    }, { status: 500 });
  }
}