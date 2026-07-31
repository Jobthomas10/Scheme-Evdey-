"use client";

import { motion } from "framer-motion";
import { DocumentItem } from "@/lib/types";
import { CheckCircle2, AlertCircle } from "lucide-react";

interface DocumentChecklistProps {
  documents: DocumentItem[];
}

export function DocumentChecklist({ documents }: DocumentChecklistProps) {
  return (
    <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-xl border border-slate-200/80">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-slate-100">
        <div>
          <span className="text-xs uppercase font-extrabold tracking-wider text-indigo-700 block mb-1">
            Verification & Prerequisites
          </span>
          <h3 className="text-2xl font-heading font-bold text-slate-900">
            Document Readiness Checklist
          </h3>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full border border-emerald-300">
            3 Ready
          </span>
          <span className="text-xs font-bold text-amber-800 bg-amber-100 px-3 py-1 rounded-full border border-amber-300">
            2 Missing / Action Needed
          </span>
        </div>
      </div>

      {/* Documents List */}
      <div className="grid grid-cols-1 gap-4">
        {documents.map((doc, idx) => {
          const isReady = doc.status === "ready";
          const isEasy = doc.status === "easy_to_obtain";

          return (
            <motion.div
              key={doc.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.08 }}
              className={`p-5 rounded-2xl border transition-all flex flex-col md:flex-row md:items-center justify-between gap-4 ${
                isReady
                  ? "bg-emerald-50/40 border-emerald-200/80"
                  : isEasy
                  ? "bg-amber-50/40 border-amber-200/80"
                  : "bg-rose-50/40 border-rose-200/80"
              }`}
            >
              <div className="flex items-start gap-4">
                <div
                  className={`p-2.5 rounded-xl shrink-0 mt-0.5 ${
                    isReady
                      ? "bg-emerald-500 text-white"
                      : isEasy
                      ? "bg-amber-500 text-white"
                      : "bg-rose-500 text-white"
                  }`}
                >
                  {isReady ? (
                    <CheckCircle2 className="w-5 h-5" />
                  ) : (
                    <AlertCircle className="w-5 h-5" />
                  )}
                </div>

                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <span className="font-heading font-bold text-slate-900 text-base">
                      {doc.name}
                    </span>
                    {doc.malayalamName && (
                      <span className="text-xs font-bold text-teal-700 font-sans">
                        ({doc.malayalamName})
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-slate-600 mb-2">
                    <span className="font-semibold text-slate-700">Authority:</span>{" "}
                    {doc.issuingAuthority}
                  </p>

                  <p className="text-xs text-slate-500 bg-white/80 p-2.5 rounded-xl border border-slate-200/60 font-mono">
                    <span className="font-sans font-bold text-slate-700">How to get:</span>{" "}
                    {doc.howToObtain}
                  </p>
                </div>
              </div>

              {/* Status Badge */}
              <div className="shrink-0 text-left md:text-right">
                <span
                  className={`inline-flex items-center gap-1 text-xs font-bold px-3 py-1.5 rounded-full ${
                    isReady
                      ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                      : isEasy
                      ? "bg-amber-100 text-amber-800 border border-amber-300"
                      : "bg-rose-100 text-rose-800 border border-rose-300"
                  }`}
                >
                  {isReady
                    ? "✓ Verified Ready"
                    : isEasy
                    ? "⚡ Easy to Obtain"
                    : "⚠️ Action Required"}
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
