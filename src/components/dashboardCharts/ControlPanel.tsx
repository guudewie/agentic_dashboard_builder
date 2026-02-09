"use client";

import { Block } from "@/types/types";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { format } from "sql-formatter";

interface ControlPanelProps {
  selectedBlock: Block | null;
}

export function ControlPanel({ selectedBlock }: ControlPanelProps) {
  return (
    <div className="h-full bg-white flex flex-col">
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-900">Details</h2>
        <p className="text-sm text-gray-500 mt-1">
          Select a chart to view details
        </p>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        {selectedBlock ? (
          <div className="space-y-6">
            {/* Block Title */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {selectedBlock.title}
              </h3>
              <span className="text-xs text-gray-500 font-mono">
                ID: {selectedBlock.id}
              </span>
            </div>

            {/* Chart Type */}
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-2">
                Chart Type
              </label>
              <div className="px-3 py-2 bg-gray-50 rounded-lg border border-gray-200">
                <span className="text-sm text-gray-900">
                  {selectedBlock.componentId}
                </span>
              </div>
            </div>

            {/* Explanation */}
            {selectedBlock.explanation && (
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-2">
                  Explanation
                </label>
                <div className="px-3 py-2 bg-gray-50 rounded-lg border border-gray-200">
                  <p className="text-sm text-gray-700 leading-relaxed">
                    {selectedBlock.explanation}
                  </p>
                </div>
              </div>
            )}

            {/* Query */}
            {selectedBlock.query && (
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-2">
                  Query
                </label>
                <div className="relative group">
                  <SyntaxHighlighter
                    language="sql"
                    style={vscDarkPlus}
                    customStyle={{
                      margin: 0,
                      borderRadius: "0.5rem",
                      fontSize: "0.875rem",
                      padding: "1rem",
                    }}
                    showLineNumbers={true}
                  >
                    {format(selectedBlock.query, {
                      language: "sql",
                      tabWidth: 2,
                      keywordCase: "upper",
                    })}
                  </SyntaxHighlighter>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(selectedBlock.query!);
                    }}
                    className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity px-3 py-1.5 bg-gray-700 hover:bg-gray-600 text-white text-xs rounded-md font-medium"
                  >
                    Copy
                  </button>
                </div>
              </div>
            )}

            {/* Data Preview */}
            {selectedBlock.data && (
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-2">
                  Data Preview
                </label>
                <div className="px-3 py-2 bg-gray-50 rounded-lg border border-gray-200 max-h-64 overflow-auto">
                  <pre className="text-xs text-gray-900 font-mono">
                    {JSON.stringify(selectedBlock.data, null, 2)}
                  </pre>
                </div>
              </div>
            )}

            {/* Position */}
            {selectedBlock.position && (
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-2">
                  Layout Values
                </label>
                <div className="px-3 py-2 bg-gray-50 rounded-lg border border-gray-200 max-h-64 overflow-auto">
                  <pre className="text-xs text-gray-900 font-mono">
                    {JSON.stringify(selectedBlock.position, null, 2)}
                  </pre>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="flex items-center justify-center h-full text-gray-400">
            <div className="text-center">
              <svg
                className="w-16 h-16 mx-auto mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
              <p className="text-sm">No chart selected</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
