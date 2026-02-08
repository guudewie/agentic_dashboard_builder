import { streamText, UIMessage, convertToModelMessages, stepCountIs } from "ai";
import { model } from "../../../lib/connections/model";
import { tools } from "@/lib/ai/tools";

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json();

  const result = streamText({
    model: model,
    messages: await convertToModelMessages(messages),
    stopWhen: stepCountIs(5),
    tools: tools,
  });

  return result.toUIMessageStreamResponse();
}
