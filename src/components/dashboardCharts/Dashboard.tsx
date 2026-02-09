"use client";

import { ChartRenderer } from "@/components/ChartRenderer";
import { Block } from "@/types/types";
import { exampleBlocks } from "@/lib/data/exampleBlocks";

interface DashboardProps {
  blocks: Block[];
  onClear?: () => void;
  selectedBlockId: string | null;
  onSelectBlock: (blockId: string) => void;
  onAddBlocks: (blocks: Block[]) => void;
}

export function Dashboard({
  blocks,
  onClear,
  selectedBlockId,
  onSelectBlock,
  onAddBlocks,
}: DashboardProps) {
  return (
    <div className="h-full bg-gray-50 flex flex-col">
      <div className="p-4 border-b border-gray-200 bg-white">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Dashboard</h2>
            <p className="text-sm text-gray-500 mt-1">
              {blocks.length > 0
                ? `Showing ${blocks.length} component${
                    blocks.length !== 1 ? "s" : ""
                  }`
                : "No components yet. Ask me to create some!"}
            </p>
          </div>

          <div className="flex gap-1">
            <button
              onClick={() => onAddBlocks(exampleBlocks)}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm"
            >
              Add Block
            </button>
            {blocks.length > 0 && onClear && (
              <button
                onClick={onClear}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-sm"
              >
                Clear all
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        <div className="grid gap-4">
          {blocks.map((block) => (
            <div
              key={block.id}
              onClick={() => onSelectBlock(block.id)}
              className={`cursor-pointer transition-all rounded-lg ${
                selectedBlockId === block.id
                  ? "ring-2 ring-blue-500 shadow-lg"
                  : "hover:shadow-md"
              }`}
            >
              <ChartRenderer block={block} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
