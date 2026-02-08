"use client";

import { useChat } from "@ai-sdk/react";
import { useState } from "react";
import { ChartRenderer } from "@/components/ChartRenderer";
import { Block } from "@/types/types";
import { DefaultChatTransport, ToolUIPart } from "ai";
import { ToolCallDisplay } from "@/components/ToolCallDisplay";
import { SubmitBlockOutput } from "@/lib/ai/tools/submitBlock";

export default function Chat() {
  const [input, setInput] = useState("");
  const [blocks, setBlocks] = useState<Block[]>([]);

  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({
      api: "/api/agent",
    }),
    onFinish: (result) => {
      result.message.parts?.forEach((part) => {
        // 1. Check if this is the correct tool part
        if (
          part.type === "tool-submitBlock" &&
          "output" in part &&
          part.output
        ) {
          // 2. Type cast the output to your Tool's return interface
          const output = part.output as SubmitBlockOutput;

          // 3. Verify success and existence of the block
          if (output.success && output.block) {
            console.log("Found valid block:", output.block.id);

            // Use the functional update to ensure you have the latest state
            setBlocks((prev) => {
              // Prevent duplicates if onFinish triggers twice
              if (prev.find((b) => b.id === output.block!.id)) return prev;
              return [...prev, output.block!];
            });
          }
        }
      });
    },
  });

  const isLoading = status === "streaming" || status === "submitted";

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Left Panel - Chat & Tool Calls */}
      <div className="w-96 border-r border-gray-200 bg-white flex flex-col">
        <div className="p-4 border-b border-gray-200">
          <h1 className="text-xl font-semibold text-gray-900">
            Dashboard Builder
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Ask for charts and visualizations
          </p>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div key={message.id}>
              {/* User/Assistant Message */}
              <div
                className={`mb-2 ${
                  message.role === "user" ? "text-right" : "text-left"
                }`}
              >
                {message.parts.map((part, i) => {
                  if (part.type === "text") {
                    return (
                      <div
                        key={`${message.id}-${i}`}
                        className={`inline-block px-4 py-2 rounded-lg max-w-[85%] ${
                          message.role === "user"
                            ? "bg-blue-600 text-white"
                            : "bg-gray-100 text-gray-900"
                        }`}
                      >
                        {part.text}
                      </div>
                    );
                  }
                  return null;
                })}
              </div>

              {/* Tool Calls */}
              {message.parts.map((part, i) => {
                if (part.type.startsWith("tool-")) {
                  return (
                    <ToolCallDisplay
                      key={`${message.id}-${i}`}
                      part={part as ToolUIPart}
                    />
                  );
                }
                return null;
              })}
            </div>
          ))}

          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-gray-100 rounded-lg px-4 py-2">
                <div className="flex space-x-2">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div
                    className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                    style={{ animationDelay: "0.2s" }}
                  ></div>
                  <div
                    className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                    style={{ animationDelay: "0.4s" }}
                  ></div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Input */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (input.trim()) {
              sendMessage({ text: input });
              setInput("");
            }
          }}
          className="p-4 border-t border-gray-200"
        >
          <div className="flex space-x-2">
            <input
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={input}
              placeholder="Describe the chart you want..."
              onChange={(e) => setInput(e.currentTarget.value)}
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
            >
              Send
            </button>
          </div>
        </form>
      </div>

      {/* Right Panel - Dashboard */}
      <div className="flex-1 overflow-auto">
        <div className="p-6">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Dashboard</h2>
              <p className="text-gray-600 mt-1">
                {blocks.length > 0
                  ? `Showing ${blocks.length} component${blocks.length !== 1 ? "s" : ""}`
                  : "No components yet. Ask me to create some!"}
              </p>
            </div>

            {blocks.length > 0 && (
              <button
                onClick={() => setBlocks([])}
                className="px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              >
                Clear All
              </button>
            )}
          </div>

          {blocks.length === 0 ? (
            <div className="flex items-center justify-center h-64 bg-white rounded-lg border-2 border-dashed border-gray-300">
              <div className="text-center text-gray-500" key={"OnlyOne"}>
                <svg
                  className="mx-auto h-12 w-12 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
                <p className="mt-2 text-sm font-medium">
                  No components to display
                </p>
                <p className="mt-1 text-xs text-gray-400">
                  Try: &quot;Show me total revenue as a KPI&quot;
                </p>
                <p className="text-xs text-gray-400">
                  Or: &quot;Create a bar chart of sales by region&quot;
                </p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {blocks.map((block) => (
                <div
                  key={block.id}
                  className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
                >
                  <ChartRenderer block={block} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
