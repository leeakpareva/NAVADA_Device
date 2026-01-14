import { NextRequest, NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';
import { checkBackendRateLimit } from '@/lib/rate-limit-server';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

// Define tools
const tools: Anthropic.Tool[] = [
  {
    name: "search_documentation",
    description: "Search for official Python documentation, best practices, and examples. Use this when the user asks about a specific library, function, or concept.",
    input_schema: {
      type: "object",
      properties: {
        query: { type: "string", description: "The search query, e.g., 'list comprehension', 'pandas dataframe', 'asyncio'" }
      },
      required: ["query"]
    }
  },
  {
    name: "get_package_info",
    description: "Get information about a Python package from PyPI, including version, description, and installation instructions.",
    input_schema: {
      type: "object",
      properties: {
        package_name: { type: "string", description: "Name of the package, e.g., 'pandas', 'requests'" }
      },
      required: ["package_name"]
    }
  },
  {
    name: "analyze_code_snippet",
    description: "Analyze a Python code snippet for potential errors, style issues, and performance improvements.",
    input_schema: {
      type: "object",
      properties: {
        code: { type: "string", description: "The Python code to analyze" }
      },
      required: ["code"]
    }
  }
];

// Mock tool implementations
async function handleToolCall(toolName: string, toolInput: any): Promise<any> {
  // Simulate delay
  await new Promise(resolve => setTimeout(resolve, 500));

  switch (toolName) {
    case 'search_documentation':
      return {
        result: `[Simulated Documentation Result for "${toolInput.query}"]
- **Overview**: Detailed technical documentation found for ${toolInput.query}.
- **Common Use Cases**: Explanation of how and when to use this feature.
- **Example**:
  \`\`\`python
  # Standard implementation example
  # (Actual docs would provide specific code here)
  pass
  \`\`\`
- **Note**: This is a simulated response for demonstration purposes.`
      };

    case 'get_package_info':
      return {
        name: toolInput.package_name,
        latest_version: "X.Y.Z (Simulated)",
        summary: `Simulated package info for ${toolInput.package_name}. In a production environment, this would fetch real data from PyPI.`,
        installation: `pip install ${toolInput.package_name}`,
        home_page: `https://pypi.org/project/${toolInput.package_name}/`
      };

    case 'analyze_code_snippet':
      return {
        analysis: "Simulated Code Analysis",
        status: "Completed",
        note: "This is a simulated analysis tool. In a full implementation, this would run static analysis (pylint/mypy).",
        general_guidance: [
            "Check for PEP 8 style compliance.",
            "Verify variable naming conventions.",
            "Ensure efficient time complexity for loops."
        ]
      };

    default:
      return { error: `Tool ${toolName} not found` };
  }
}

export async function POST(request: NextRequest) {
  try {
    const ip = (request as any).ip || request.headers.get('x-forwarded-for') || 'anonymous';
    const sessionToken = request.headers.get('x-session-token') || ip;
    const rateLimit = checkBackendRateLimit(sessionToken as string);

    if (!rateLimit.allowed) {
      return NextResponse.json({
        message: `⚠️ ${rateLimit.message}`
      }, { status: 429 });
    }

    const { message, history } = await request.json();

    if (!message) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    // Create context from message history
    // Fix: Handle both 'role' (from frontend) and 'type' (legacy/fallback)
    const contextMessages = history?.slice(-5).map((msg: any) => ({
      role: (msg.role === 'user' || msg.type === 'user') ? 'user' : 'assistant',
      content: msg.content
    })) || [];

    const systemPrompt = `You are RAVEN (Real-time AI Visual English Notation), an intelligent coding companion powered by advanced AI.

Your goal is to help users learn, write, and debug code effectively. You have access to tools that make you more capable:
- Use \`search_documentation\` to look up specific concepts or libraries.
- Use \`get_package_info\` when users ask about packages or installation.
- Use \`analyze_code_snippet\` to provide deep insights into code.

When using tools:
1. Don't mention you are using a tool unless necessary.
2. Integrate the tool output naturally into your response.
3. If a tool fails or returns simulated data, provide the best helpful answer you can.

Personality:
- Friendly, encouraging, and emoji-friendly (but don't overdo it).
- Expert in Python but explains things simply.
- Loves to teach "Why" and "How", not just "What".

Current context: User is in the RAVEN Terminal environment.`;

    let messages = [
        ...contextMessages,
        { role: 'user', content: message }
      ];

    // First call to model
    let response = await anthropic.messages.create({
      model: 'claude-3-5-haiku-20241022',
      max_tokens: 1000,
      temperature: 0.7,
      system: systemPrompt,
      tools: tools,
      messages: messages as any
    });

    // Handle tool use loop with safety limits and parallel support
    let loopCount = 0;
    const MAX_LOOPS = 5;

    while (response.stop_reason === 'tool_use' && loopCount < MAX_LOOPS) {
        loopCount++;

        // Identify all tool use blocks
        const toolUseBlocks = response.content.filter(block => block.type === 'tool_use');

        if (toolUseBlocks.length === 0) break;

        // Append assistant's response (including the tool_use blocks) to history
        messages.push({
            role: 'assistant',
            content: response.content
        } as any);

        // Execute all requested tools in parallel
        // We map over the blocks. Type casting needed as filter doesn't narrow cleanly in all TS versions without a type guard fn
        const toolResults = await Promise.all(toolUseBlocks.map(async (block: any) => {
            const toolName = block.name;
            const toolInput = block.input;
            const toolUseId = block.id;

            const result = await handleToolCall(toolName, toolInput);

            return {
                type: 'tool_result',
                tool_use_id: toolUseId,
                content: JSON.stringify(result)
            };
        }));

        // Append all tool results as a single user message
        messages.push({
            role: 'user',
            content: toolResults
        } as any);

        // Call model again with the new history containing tool results
        response = await anthropic.messages.create({
            model: 'claude-3-5-haiku-20241022',
            max_tokens: 1000,
            temperature: 0.7,
            system: systemPrompt,
            tools: tools,
            messages: messages as any
        });
    }

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
