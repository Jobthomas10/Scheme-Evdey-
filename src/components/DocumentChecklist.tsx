"use client";

import { motion } from "framer-motion";
import { CheckCircle2, FileCheck2 } from "lucide-react";

interface DocumentAvailabilityProps {
  uniqueDocuments: string[];
  availableDocs: string[];
  onToggleDoc: (docName: string) => void;
  onSelectAll: () => void;
}

export function DocumentChecklist({
  uniqueDocuments,
  availableDocs,
  onToggleDoc,
  onSelectAll,
}: DocumentAvailabilityProps) {
  const allSelected = uniqueDocuments.length > 0 && uniqueDocuments.every((d) => availableDocs.includes(d));

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-200/80 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
        <div>
          <span className="text-xs uppercase font-extrabold tracking-wider text-teal-700 block mb-1">
            Dynamic Verification Flow
          </span>
          <h3 className="text-2xl font-heading font-bold text-slate-900 flex items-center gap-2">
            <FileCheck2 className="w-6 h-6 text-teal-600" />
            <span>Document Availability</span>
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            Select the government documents you currently possess to instantly calculate your application readiness for matched schemes.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <span className="text-xs font-bold text-teal-900 bg-teal-50 px-3 py-1.5 rounded-full border border-teal-200">
            {availableDocs.length} of {uniqueDocuments.length} Selected
          </span>

          <button
            onClick={onSelectAll}
            className="text-xs font-bold text-indigo-700 hover:text-indigo-900 hover:underline px-2 py-1"
          >
            {allSelected ? "Deselect All" : "Select All"}
          </button>
        </div>
      </div>

      {/* Checkbox Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
        {uniqueDocuments.map((docName, idx) => {
          const isChecked = availableDocs.includes(docName);

          return (
            <motion.label
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              onClick={() => onToggleDoc(docName)}
              className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between group ${
                isChecked
                  ? "bg-teal-50/90 border-teal-300 ring-2 ring-teal-500/20 text-slate-900 shadow-sm"
                  : "bg-slate-50/60 border-slate-200 hover:bg-slate-100/80 text-slate-600"
              }`}
            >
              <div className="flex items-center gap-3 pr-2">
                <div
                  className={`w-5 h-5 rounded-lg border flex items-center justify-center transition-all ${
                    isChecked
                      ? "bg-teal-600 border-teal-600 text-white"
                      : "border-slate-300 bg-white group-hover:border-slate-400"
                  }`}
                >
                  {isChecked && <CheckCircle2 className="w-3.5 h-3.5 stroke-[3]" />}
                </div>

                <span className={`text-xs font-semibold ${isChecked ? "font-bold text-teal-950" : "text-slate-700"}`}>
                  {docName}
                </span>
              </div>

              <span
                className={`text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0 ${
                  isChecked
                    ? "bg-teal-100 text-teal-800"
                    : "bg-slate-200/80 text-slate-500"
                }`}
              >
                {isChecked ? "Available" : "Missing"}
              </span>
            </motion.label>
          );
        })}
      </div>
    </div>
  );
}
