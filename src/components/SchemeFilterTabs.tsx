"use client";

import { SchemeCategory } from "@/lib/types";
import { Sparkles, HeartPulse, GraduationCap, Home, Briefcase, Landmark, Grid } from "lucide-react";

interface SchemeFilterTabsProps {
  activeCategory: SchemeCategory;
  onSelectCategory: (category: SchemeCategory) => void;
  counts: Record<SchemeCategory, number>;
}

export function SchemeFilterTabs({
  activeCategory,
  onSelectCategory,
  counts,
}: SchemeFilterTabsProps) {
  const categories: { id: SchemeCategory; label: string; icon: any }[] = [
    { id: "all", label: "All Schemes", icon: Grid },
    { id: "pension", label: "Social Pensions", icon: Landmark },
    { id: "health", label: "Healthcare", icon: HeartPulse },
    { id: "education", label: "Education", icon: GraduationCap },
    { id: "housing", label: "Housing", icon: Home },
    { id: "livelihood", label: "Livelihood", icon: Briefcase },
  ];

  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none no-print">
      {categories.map((cat) => {
        const Icon = cat.icon;
        const isActive = activeCategory === cat.id;
        const count = counts[cat.id] || 0;

        return (
          <button
            key={cat.id}
            onClick={() => onSelectCategory(cat.id)}
            className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 shrink-0 ${
              isActive
                ? "bg-slate-900 text-white shadow-md shadow-slate-950/20 ring-2 ring-teal-500/30"
                : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50 hover:text-slate-900"
            }`}
          >
            <Icon className={`w-4 h-4 ${isActive ? "text-teal-400" : "text-slate-400"}`} />
            <span>{cat.label}</span>
            {count > 0 && (
              <span
                className={`px-2 py-0.5 rounded-full text-[10px] ${
                  isActive
                    ? "bg-teal-500/20 text-teal-300 font-extrabold"
                    : "bg-slate-100 text-slate-600"
                }`}
              >
                {count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
