"use client";

import { Scheme } from "@/lib/types";
import { formatCurrency } from "@/lib/utils";
import { BookmarkCheck, ExternalLink, Trash2, ArrowRight } from "lucide-react";

interface MySchemesTabProps {
  savedSchemes: Scheme[];
  lang?: "en" | "ml";
  onSelectScheme?: (scheme: Scheme) => void;
  onRemoveBookmark: (schemeId: string) => void;
  onNavigateHome: () => void;
}

export function MySchemesTab({
  savedSchemes,
  lang = "en",
  onSelectScheme,
  onRemoveBookmark,
  onNavigateHome,
}: MySchemesTabProps) {
  const totalValue = savedSchemes.reduce(
    (acc, curr) => acc + curr.estimatedAnnualValue,
    0
  );

  return (
    <div className="max-w-5xl mx-auto py-6 space-y-6">
      {/* Header Banner */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-teal-50 text-teal-800 text-xs font-extrabold mb-2 border border-teal-200">
            <BookmarkCheck className="w-3.5 h-3.5 text-teal-600" />
            <span>Saved Benefit Packages</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-heading font-extrabold text-slate-900 tracking-tight">
            My Saved Schemes & Trackers
          </h2>
          <p className="text-xs text-slate-500 mt-1 font-medium">
            Keep track of the schemes you have bookmarked, review requirements, and complete filing.
          </p>
        </div>

        {/* Total Value Counter */}
        <div className="bg-slate-900 text-white border border-slate-800 p-5 rounded-2xl text-left md:text-right shrink-0 shadow-lg">
          <span className="text-[10px] font-bold uppercase tracking-wider text-teal-300 block">
            Combined Saved Value
          </span>
          <span className="text-2xl font-heading font-extrabold text-white">
            {formatCurrency(totalValue)} / yr
          </span>
        </div>
      </div>

      {savedSchemes.length === 0 ? (
        <div className="bg-white border border-slate-200 rounded-3xl p-12 text-center space-y-4 shadow-xl">
          <div className="w-16 h-16 rounded-2xl bg-teal-50 text-teal-700 flex items-center justify-center mx-auto border border-teal-200">
            <BookmarkCheck className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-heading font-extrabold text-slate-900">
            No saved schemes yet
          </h3>
          <p className="text-xs text-slate-500 max-w-md mx-auto font-medium leading-relaxed">
            Browse through your Benefit Assessment or Priority Schemes and click the bookmark icon to save schemes here for quick tracking.
          </p>
          <button
            onClick={onNavigateHome}
            className="px-6 py-3.5 rounded-2xl gradient-score text-white font-extrabold text-xs shadow-lg hover:scale-105 transition-all"
          >
            Explore Schemes Now
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {savedSchemes.map((scheme) => (
            <div
              key={scheme.id}
              className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xl hover:shadow-2xl transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              <div className="space-y-1.5 flex-1">
                <div className="flex items-center space-x-2 text-xs text-slate-500">
                  <span className="font-bold text-teal-700">
                    {scheme.department}
                  </span>
                  <span>•</span>
                  <span>{scheme.stateOrCentral}</span>
                </div>

                <h3 className="text-lg font-heading font-extrabold text-slate-900">
                  {scheme.title}
                </h3>
                {scheme.malayalamTitle && (
                  <p className="text-xs font-bold text-teal-700 font-sans">
                    {scheme.malayalamTitle}
                  </p>
                )}

                <p className="text-xs text-slate-600 line-clamp-2 font-medium pt-1">
                  {scheme.shortSummary}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center gap-3 shrink-0 pt-3 md:pt-0 border-t md:border-t-0 border-slate-100">
                <div className="text-left sm:text-right pr-2">
                  <span className="text-[10px] font-bold text-slate-400 uppercase block">
                    Value
                  </span>
                  <span className="text-base font-heading font-extrabold text-teal-700">
                    {formatCurrency(scheme.estimatedAnnualValue)}/yr
                  </span>
                </div>

                <div className="flex items-center space-x-2">
                  {scheme.officialPortalUrl && (
                    <a
                      href={scheme.officialPortalUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="px-4 py-2.5 rounded-xl bg-slate-900 text-white font-bold text-xs hover:bg-slate-800 transition-colors flex items-center space-x-1.5"
                    >
                      <span>Apply</span>
                      <ExternalLink className="w-3.5 h-3.5 text-teal-300" />
                    </a>
                  )}

                  <button
                    onClick={() => onRemoveBookmark(scheme.id)}
                    className="p-2.5 rounded-xl bg-rose-50 text-rose-700 border border-rose-200 hover:bg-rose-100 transition-colors"
                    title="Remove bookmark"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
