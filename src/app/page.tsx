"use client";

import { useChat } from "@ai-sdk/react";
import { useState } from "react";
import { Block } from "@/types/types";
import { DefaultChatTransport } from "ai";
import { SubmitBlockOutput } from "@/lib/ai/tools/submitBlock";
import { Dashboard } from "@/components/dashboardCharts/Dashboard";
import { ChatPanel } from "@/components/dashboardCharts/ChatPanel";
import { ControlPanel } from "@/components/dashboardCharts/ControlPanel";
import { Panel, Group, Separator } from "react-resizable-panels";

export default function Chat() {
  const [input, setInput] = useState("");
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [selectedBlockId, setSelectedBlockId] = useState<string | null>(null);

  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({
      api: "/api/agent",
    }),
    onFinish: (result) => {
      result.message.parts?.forEach((part) => {
        if (
          part.type === "tool-submitBlock" &&
          "output" in part &&
          part.output
        ) {
          const output = part.output as SubmitBlockOutput;

          if (output.success && output.block) {
            console.log("Found valid block:", output.block.id);

            setBlocks((prev) => {
              if (prev.find((b) => b.id === output.block!.id)) return prev;
              return [...prev, output.block!];
            });
          }
        }
      });
    },
  });

  const isLoading = status === "streaming" || status === "submitted";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      sendMessage({ text: input });
      setInput("");
    }
  };

  const selectedBlock = blocks.find((b) => b.id === selectedBlockId) || null;

  return (
    <div className="h-screen w-full">
      <Group orientation="horizontal">
        {/* Chat Panel */}
        <Panel defaultSize={"22%"} minSize={"10%"} maxSize={"30%"}>
          <ChatPanel
            messages={messages}
            input={input}
            setInput={setInput}
            onSubmit={handleSubmit}
            isLoading={isLoading}
          />
        </Panel>

        <Separator className="w-1 bg-gray-200 hover:bg-blue-400 transition-colors cursor-col-resize" />

        {/* Dashboard Panel */}
        <Panel>
          <Dashboard
            blocks={blocks}
            onClear={() => setBlocks([])}
            onAddBlocks={(blocks: Block[]) =>
              setBlocks((prev) => [...prev, ...blocks])
            }
            selectedBlockId={selectedBlockId}
            onSelectBlock={setSelectedBlockId}
          />
        </Panel>

        <Separator className="w-1 bg-gray-200 hover:bg-blue-400 transition-colors cursor-col-resize" />

        {/* Control Panel */}
        <Panel defaultSize={"22%"} minSize={"10%"} maxSize={"30%"}>
          <ControlPanel selectedBlock={selectedBlock} />
        </Panel>
      </Group>
    </div>
  );
}
