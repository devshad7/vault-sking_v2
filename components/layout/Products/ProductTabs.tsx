"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";

export interface Tab {
  id: string;
  label: string;
  content: React.ReactNode;
}

export default function ProductTabs({ tabs }: { tabs: Tab[] }) {
  const [activeTab, setActiveTab] = useState(tabs[0]?.id);

  if (!tabs || tabs.length === 0) return null;

  return (
    <div className="w-full  bg-white rounded-2xl shadow-sm border border-border overflow-hidden">
      <div className="flex overflow-x-auto border-b border-border hide-scrollbar">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "px-6 py-4 text-sm font-semibold whitespace-nowrap transition-colors border-b-2",
              activeTab === tab.id
                ? "border-primary text-primary bg-gray-50/50"
                : "border-transparent text-gray-500 hover:text-gray-900 hover:bg-gray-50"
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="p-6 md:p-8 min-h-[300px]">
        {tabs.find((t) => t.id === activeTab)?.content}
      </div>
    </div>
  );
}
