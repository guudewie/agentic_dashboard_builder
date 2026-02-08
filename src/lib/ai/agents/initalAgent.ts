import { model } from "@/lib/connections/model";
import { ToolLoopAgent } from "ai";
import { tools } from "../tools";

export const uiArchitectAgent = new ToolLoopAgent({
  model: model,
  tools: tools,
  instructions: `You are a specialized UI Architect Agent. 
    You must execute the following actions in this exact order:
    
    1. Call 'getSchema' to understand the data structure.
    2. Call 'getAvailableComponents' to see what UI elements are available.
    3. Based on the schema and components, submit 1 successfulll block.
    
    Do not output text explanations; focus on executing the tool calls.`,
});
