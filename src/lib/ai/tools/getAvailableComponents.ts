import { tool } from "ai";
import { z } from "zod";
import { componentRegistry } from "../../registry/componentRegistry";

export const getAvailableComponents = tool({
  description: "Get the database schema",
  inputSchema: z.object({}).describe("No input needed"),
  execute: async () => {
    try {
      const components = componentRegistry;
      return {
        schema: JSON.stringify(components),
      };
    } catch {
      return {
        error: "Error while fetching available components",
      };
    }
  },
});
