import { ToolUIPart } from "ai";

export function ToolCallDisplay({ part }: { part: ToolUIPart }) {
  // Check if it's a tool part (starts with "tool-")
  if (!part.type.startsWith("tool-")) {
    return null;
  }

  // Extract tool name from type (e.g., "tool-submitBlock" -> "submitBlock")
  const toolName = part.type.replace("tool-", "");

  const getToolInfo = (name: string) => {
    switch (name) {
      case "submitBlock":
        return {
          icon: "📊",
          color: "bg-emerald-50 border-emerald-200 text-emerald-700",
        };
      case "getAvailableComponents":
        return {
          icon: "🧩",
          color: "bg-blue-50 border-blue-200 text-blue-700",
        };
      case "getSchema":
        return {
          icon: "📋",
          color: "bg-purple-50 border-purple-200 text-purple-700",
        };
      case "getComponentDetails":
        return {
          icon: "🔍",
          color: "bg-green-50 border-green-200 text-green-700",
        };
      default:
        return {
          icon: "🔧",
          color: "bg-gray-50 border-gray-200 text-gray-700",
        };
    }
  };

  const toolInfo = getToolInfo(toolName);
  const state = part.state;

  const renderInput = () => {
    if (
      (state === "input-available" ||
        state === "output-available" ||
        state === "output-error") &&
      part.input
    ) {
      return (
        <div className="mt-2 text-xs">
          <details className="cursor-pointer">
            <summary className="hover:underline">View input</summary>
            <pre className="mt-1 p-2 bg-white/50 rounded overflow-x-auto">
              {JSON.stringify(part.input, null, 2)}
            </pre>
          </details>
        </div>
      );
    }
    return null;
  };

  const renderStreamingInput = () => {
    if (part.state === "input-streaming" && part.input) {
      return (
        <div className="mt-2 text-xs opacity-75">
          <span>⏳ Streaming input...</span>
          <pre className="mt-1 p-2 bg-white/50 rounded overflow-x-auto text-[10px]">
            {JSON.stringify(part.input, null, 2)}
          </pre>
        </div>
      );
    }
    return null;
  };

  const renderOutput = () => {
    if (part.state === "output-available" && part.output != null) {
      return (
        <div className="mt-2 text-xs">
          <details className="cursor-pointer">
            <summary className="hover:underline">View output</summary>
            <pre className="mt-1 p-2 bg-white/50 rounded overflow-x-auto">
              {JSON.stringify(part.output, null, 2)}
            </pre>
          </details>
        </div>
      );
    }
    return null;
  };

  const renderError = () => {
    if (part.state === "output-error" && part.errorText) {
      return (
        <div className="mt-2 text-xs bg-red-100 border border-red-300 rounded p-2 text-red-700">
          <span className="font-semibold">Error:</span> {part.errorText}
        </div>
      );
    }
    return null;
  };

  return (
    <div
      className={`mx-4 mb-2 p-3 rounded-lg border ${toolInfo.color} text-sm`}
    >
      <div className="flex items-center space-x-2 font-medium">
        <span>{toolInfo.icon}</span>
        <span>{toolName}</span>
        <span className="ml-auto text-xs opacity-60">{state}</span>
      </div>

      {renderInput()}
      {renderStreamingInput()}
      {renderOutput()}
      {renderError()}
    </div>
  );
}
