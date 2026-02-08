import { tool } from "ai";
import { z } from "zod";
import { componentRegistry } from "../../registry/componentRegistry";

export const getComponentDetails = tool({
  description: "Get the details of a specified component",
  inputSchema: z.object({
    componentId: z
      .string()
      .describe("The ID of the component to fetch details for"),
  }),
  execute: async ({ componentId }) => {
    try {
      const component = componentRegistry.find(
        (comp) => comp.id === componentId,
      );

      if (!component) {
        return {
          error: `The component with id ${componentId} does not exist`,
        };
      }

      return {
        componentDetails: JSON.stringify(component),
      };
    } catch {
      return {
        error: "Error while getting component details",
      };
    }
  },
});
