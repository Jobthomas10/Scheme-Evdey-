"use client";

import { motion } from "framer-motion";
import { RoadmapStep } from "@/lib/types";
import { Clock, Landmark, CheckCircle2, AlertCircle, ArrowRight, CornerDownRight } from "lucide-react";

interface RoadmapTimelineProps {
  steps: RoadmapStep[];
}

export function RoadmapTimeline({ steps }: RoadmapTimelineProps) {
  return (
    <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-xl border border-slate-200/80">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-slate-100">
        <div>
          <span className="text-xs uppercase font-extrabold tracking-wider text-teal-700 block mb-1">
            Application Execution Order
          </span>
          <h3 className="text-2xl font-heading font-bold text-slate-900">
            Step-by-Step Application Roadmap
          </h3>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100 text-xs font-semibold text-slate-700">
          <Clock className="w-4 h-4 text-indigo-600" />
          <span>Total Timeline: 1–3 Weeks</span>
        </div>
      </div>

      {/* Vertical Numbered Timeline */}
      <div className="relative pl-6 sm:pl-10 space-y-8 before:absolute before:left-3 sm:before:left-5 before:top-3 before:bottom-3 before:w-0.5 before:bg-slate-200">
        {steps.map((step, idx) => {
          const isReady = step.priority === "Immediate" || step.priority === "High";

          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="relative flex flex-col sm:flex-row items-start justify-between gap-6 p-6 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-indigo-300 hover:bg-slate-50/80 transition-all group"
            >
              {/* Timeline Circle Marker */}
              <div
                className={`absolute -left-6 sm:-left-10 top-6 w-8 h-8 rounded-full font-heading font-bold text-xs flex items-center justify-center border-2 transition-transform duration-200 group-hover:scale-110 ${
                  isReady
                    ? "bg-emerald-600 text-white border-emerald-500 shadow-md shadow-emerald-600/20"
                    : "bg-indigo-900 text-white border-indigo-700"
                }`}
              >
                {step.stepNumber}
              </div>

              {/* Main Content */}
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <span className="text-[10px] uppercase font-bold text-indigo-700 bg-indigo-100 px-2 py-0.5 rounded-md">
                    Step {step.stepNumber}
                  </span>
                  <span className="text-xs text-slate-500 font-semibold flex items-center gap-1">
                    <Landmark className="w-3.5 h-3.5 text-slate-400" />
                    <span>{step.department}</span>
                  </span>
                  <span className="text-[10px] font-bold text-teal-800 bg-teal-50 px-2 py-0.5 rounded-md border border-teal-200">
                    Channel: {step.channel}
                  </span>
                </div>

                <h4 className="text-lg font-heading font-bold text-slate-900 mb-2">
                  {step.title}
                </h4>

                {/* Action & Prerequisites */}
                <div className="space-y-2 pt-2 border-t border-slate-200/60">
                  <div className="flex items-start gap-2 text-xs text-indigo-950 font-medium">
                    <ArrowRight className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                    <span>
                      <strong>Action:</strong> {step.actionRequired}
                    </span>
                  </div>

                  {step.dependencies && step.dependencies.length > 0 && (
                    <div className="flex items-start gap-2 text-xs text-slate-500">
                      <CornerDownRight className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                      <span>
                        <strong>Requires:</strong> {step.dependencies.join(", ")}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Status & Duration Badge */}
              <div className="shrink-0 flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto pt-4 sm:pt-0 border-t sm:border-t-0 border-slate-200">
                <span className="text-xs font-bold text-slate-700 bg-white px-3 py-1 rounded-lg border border-slate-200 shadow-sm">
                  {step.estimatedTime}
                </span>

                <span
                  className={`mt-2 text-[11px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1 ${
                    isReady
                      ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                      : "bg-amber-100 text-amber-800 border border-amber-300"
                  }`}
                >
                  {isReady ? (
                    <>
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Ready Today</span>
                    </>
                  ) : (
                    <>
                      <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
                      <span>Pending Step 1</span>
                    </>
                  )}
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
