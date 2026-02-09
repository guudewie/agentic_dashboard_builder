"use client";
import { ToolUIPart, UIDataTypes, UIMessage, UITools } from "ai";
import { ToolCallDisplay } from "@/components/ToolCallDisplay";

interface ChatPanelProps {
  messages: UIMessage<unknown, UIDataTypes, UITools>[];
  input: string;
  setInput: (value: string) => void;
  onSubmit: (e: React.SubmitEvent) => void;
  isLoading: boolean;
}

export function ChatPanel({
  messages,
  input,
  setInput,
  onSubmit,
  isLoading,
}: ChatPanelProps) {
  return (
    <div className="h-full border-r border-gray-200 bg-white flex flex-col">
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
      <form onSubmit={onSubmit} className="p-4 border-t border-gray-200">
        <div className="flex space-x-2">
          <input
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
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
  );
}
