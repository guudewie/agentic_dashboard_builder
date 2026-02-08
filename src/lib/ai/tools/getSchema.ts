import { tool } from "ai";
import { getDatabaseSchema } from "@/lib/queries/getSchema";
import { z } from "zod";

export const getSchema = tool({
  description: "Get the database schema",
  inputSchema: z.object({}).describe("No input needed"),
  execute: async () => {
    try {
      const schemaString: string = await getDatabaseSchema();
      return {
        schema: JSON.stringify(schemaString),
      };
    } catch {
      return {
        error: "Error while fetching db schema",
      };
    }
  },
});
