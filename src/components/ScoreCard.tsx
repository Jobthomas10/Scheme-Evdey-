"use client";

import { motion } from "framer-motion";
import { formatCurrency } from "@/lib/utils";
import { Sparkles, CheckCircle2, AlertCircle, FileText, IndianRupee, ShieldCheck } from "lucide-react";

interface ScoreCardProps {
  score: number; // e.g. 91
  estimatedAnnualBenefits: number; // e.g. 218000
  readyApplicationsCount: number; // e.g. 3
  missingDocumentsCount: number; // e.g. 2
  totalSchemesCount?: number;
  scoreDescription?: string;
  applicantType: string;
  incomeBand: string;
}

export function ScoreCard({
  score,
  estimatedAnnualBenefits,
  readyApplicationsCount,
  missingDocumentsCount,
  totalSchemesCount = 4,
  scoreDescription,
  applicantType,
  incomeBand,
}: ScoreCardProps) {
  // Radial SVG calculation for score circle
  const radius = 64;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <div className="w-full bg-slate-900 rounded-3xl p-6 sm:p-10 text-white shadow-2xl border border-slate-800 relative overflow-hidden">
      {/* Background ambient gradient glow */}
      <div className="absolute -top-32 -right-32 w-96 h-96 bg-teal-500/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />

      {/* Top Header Tagline */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <span className="p-2 rounded-xl bg-teal-500/20 text-teal-400 border border-teal-500/30">
            <ShieldCheck className="w-5 h-5" />
          </span>
          <div>
            <span className="text-xs uppercase font-extrabold tracking-wider text-teal-400 block">
              Verified Family Profile
            </span>
            <h2 className="text-sm font-semibold text-slate-200">
              {applicantType} • Income: {incomeBand}
            </h2>
          </div>
        </div>

        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800 text-xs text-slate-300 border border-slate-700">
          <Sparkles className="w-3.5 h-3.5 text-teal-400" />
          <span>Statutory G.O. Matched</span>
        </div>
      </div>

      {/* Main Metric Section */}
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Radial Score Visual Centerpiece */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center p-6 rounded-2xl bg-slate-950/60 border border-slate-800/90 text-center relative group">
          <div className="relative w-44 h-44 flex items-center justify-center">
            {/* SVG Circular Progress */}
            <svg className="w-full h-full transform -rotate-90">
              {/* Background Track */}
              <circle
                cx="88"
                cy="88"
                r={radius}
                className="text-slate-800"
                strokeWidth="12"
                stroke="currentColor"
                fill="transparent"
              />
              {/* Dynamic Score Arc */}
              <motion.circle
                cx="88"
                cy="88"
                r={radius}
                className="text-teal-400"
                strokeWidth="12"
                strokeDasharray={circumference}
                initial={{ strokeDashoffset: circumference }}
                animate={{ strokeDashoffset }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                strokeLinecap="round"
                stroke="currentColor"
                fill="transparent"
              />
            </svg>

            {/* Inner Score Value */}
            <div className="absolute flex flex-col items-center justify-center text-center">
              <motion.span
                key={score}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.4 }}
                className="text-5xl font-heading font-extrabold text-white tracking-tight"
              >
                {score}
              </motion.span>
              <span className="text-[11px] font-bold uppercase tracking-widest text-slate-400 mt-0.5">
                Out of 100
              </span>
            </div>
          </div>

          <h3 className="text-lg font-heading font-bold text-teal-300 mt-4">
            Benefit Potential Score
          </h3>
          <p className="text-xs text-slate-400 max-w-xs mt-1">
            {scoreDescription || "Dynamic readiness score proportional to document availability and scheme eligibility."}
          </p>
        </div>

        {/* 3 Metric Cards */}
        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Estimated Annual Rupees Card */}
          <div className="sm:col-span-3 p-6 rounded-2xl bg-gradient-to-r from-teal-950/40 to-indigo-950/40 border border-teal-500/30 flex items-center justify-between">
            <div>
              <span className="text-xs uppercase font-extrabold tracking-wider text-teal-400 block mb-1">
                Estimated Annual Benefits
              </span>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl sm:text-4xl font-heading font-extrabold text-white">
                  {formatCurrency(estimatedAnnualBenefits)}
                </span>
                <span className="text-xs text-teal-300 font-medium">/ year</span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Combined pensions, health insurance coverage & student scholarships.
              </p>
            </div>
            <div className="w-14 h-14 rounded-2xl bg-teal-500/20 text-teal-300 border border-teal-500/30 flex items-center justify-center shrink-0">
              <IndianRupee className="w-7 h-7" />
            </div>
          </div>

          {/* Applications Ready Today */}
          <div className="p-5 rounded-2xl bg-slate-950/60 border border-slate-800 flex flex-col justify-between">
            <div className="flex items-center justify-between text-emerald-400 mb-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Ready Today
              </span>
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <span className="text-3xl font-heading font-bold text-white block">
                {readyApplicationsCount}
              </span>
              <span className="text-xs text-slate-400 mt-0.5 block">
                Applications ready to submit
              </span>
            </div>
          </div>

          {/* Missing Documents */}
          <div className="p-5 rounded-2xl bg-slate-950/60 border border-slate-800 flex flex-col justify-between">
            <div className="flex items-center justify-between text-amber-400 mb-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Missing Docs
              </span>
              <AlertCircle className="w-5 h-5" />
            </div>
            <div>
              <span className="text-3xl font-heading font-bold text-white block">
                {missingDocumentsCount}
              </span>
              <span className="text-xs text-slate-400 mt-0.5 block">
                Certificates to acquire
              </span>
            </div>
          </div>

          {/* Total Schemes */}
          <div className="p-5 rounded-2xl bg-slate-950/60 border border-slate-800 flex flex-col justify-between">
            <div className="flex items-center justify-between text-indigo-400 mb-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Schemes Found
              </span>
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <span className="text-3xl font-heading font-bold text-white block">
                {totalSchemesCount}
              </span>
              <span className="text-xs text-slate-400 mt-0.5 block">
                High-confidence schemes
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
