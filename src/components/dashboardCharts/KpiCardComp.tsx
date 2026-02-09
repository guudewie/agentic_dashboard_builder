"use client";

import { KpiCardData } from "@/lib/registry/componentRegistry";
import { Block } from "@/types/types";

interface KPIChartCardProps {
  block: Block<KpiCardData>;
}

export default function KPIChartCard({ block }: KPIChartCardProps) {
  const value = block.data[0].value;
  const label = block.data[0].label;

  return (
    <div className="bg-white rounded-lg shadow-md p-6 h-full flex flex-col justify-center transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5">
      <div className="text-center">
        {block.title && (
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
            {block.title}
          </p>
        )}

        <p className="text-4xl font-bold text-blue-600 my-3 leading-tight">
          {value.toLocaleString()}
        </p>

        {label && <p className="text-sm font-medium text-gray-600">{label}</p>}

        {block.subtitle && (
          <p className="text-xs text-gray-400 mt-2">{block.subtitle}</p>
        )}
      </div>
    </div>
  );
}
