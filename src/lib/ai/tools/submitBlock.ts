import { tool } from "ai";
import { componentRegistry } from "@/lib/registry/componentRegistry";
import { z } from "zod";
import { db } from "@/lib/connections/db";
import { Block } from "@/types/types";

export interface SubmitBlockOutput {
  success: boolean;
  block?: Block;
  error?: string;
  details?: string;
}

export const submitBlock = tool({
  description: "Submit a block, ie a pair of a component and a query",
  inputSchema: z.object({
    componentId: z.string().describe("The ID of the component to use"),
    query: z.string().describe("The SQL query to run for this block"),
    explanation: z
      .string()
      .describe("A short explanation of the submitted block"),
    title: z
      .string()
      .describe("The title of the chart to be displayed in the UI"),
    subtitle: z
      .string()
      .describe("The sub-title of the chart to be displayed in the UI"),
  }),
  execute: async ({ componentId, query, explanation, title, subtitle }) => {
    try {
      const component = componentRegistry.find(
        (comp) => comp.id === componentId,
      );

      if (!component) {
        return {
          // idea: add available components to the error message
          success: false,
          error: `The component with id ${componentId} does not exist`,
          block: null,
        };
      }

      const result = await db.query(query);
      const data = result.rows;

      console.log("Query result:", data);
      console.log("Query:", query);

      const validationResult = component.dataSchema.safeParse(data);

      const validatedBlock: Block = {
        id: `${componentId}-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
        componentId,
        data,
        query,
        explanation,
        title,
        subtitle,
      };

      if (!validationResult.success) {
        return {
          success: false,
          error: `Query returned data that doesn't match ${component.label} format`,
          // potentially to be inlcuded, but seems to waste a lot of tokens
          // validationErrors: validationResult.error.issues,
          block: null,
          details: `Expected schema: ${JSON.stringify(component.dataSchema)}`,
        };
      }

      return {
        success: true,
        block: validatedBlock,
      };
    } catch (error) {
      return {
        success: false,
        error: "Error while submitting component",
        block: null,
        details: error instanceof Error ? error.message : String(error),
      };
    }
  },
});
