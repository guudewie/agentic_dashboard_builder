// components/ChartRenderer.tsx
"use client";

import { componentRegistry } from "@/lib/registry/componentRegistry";
import { Block } from "@/types/types";

interface ChartRendererProps {
  block: Block;
}

export function ChartRenderer({ block }: ChartRendererProps) {
  const componentDef = componentRegistry.find(
    (c) => c.id === block.componentId,
  );

  if (!componentDef) {
    return (
      <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
        <p className="text-red-600 font-semibold">Component not found</p>
        <p className="text-red-500 text-sm mt-1">
          No component with ID &quot;{block.componentId}&quot; exists in the
          registry
        </p>
      </div>
    );
  }

  // Get the dynamically imported component
  const Component = componentDef.component;

  return (
    <>
      {/* Render the dynamic component with data and label */}
      <Component block={block} />
    </>
  );
}
