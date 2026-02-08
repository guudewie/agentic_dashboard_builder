import { convertToModelMessages } from "ai";
import { uiArchitectAgent } from "@/lib/ai/agents/initalAgent";

export async function POST(req: Request) {
  const { messages } = await req.json();

  try {
    const result = await uiArchitectAgent.stream({
      messages: await convertToModelMessages(messages),
    });

    return result.toUIMessageStreamResponse();
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: "Agent failed to execute" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
