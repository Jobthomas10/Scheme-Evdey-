"use client";

import { useState } from "react";
import { Scheme } from "@/lib/types";
import { formatCurrency } from "@/lib/utils";
import {
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  FileText,
  AlertCircle,
  BookmarkCheck,
  Building2,
  Sparkles,
  ShieldCheck,
  XCircle,
} from "lucide-react";

interface SchemeCardProps {
  scheme: Scheme;
  userAvailableDocs?: string[];
  lang?: "en" | "ml";
  onBookmarked?: (schemeId: string) => void;
  isBookmarked?: boolean;
}

export function SchemeCard({
  scheme,
  userAvailableDocs = [],
  lang = "en",
  onBookmarked,
  isBookmarked,
}: SchemeCardProps) {
  const [showCitation, setShowCitation] = useState<boolean>(false);
  const [showDetails, setShowDetails] = useState<boolean>(true);

  // Document Readiness Comparison
  const requiredDocs = scheme.requiredDocuments || [];
  const availableDocs = requiredDocs.filter((doc) =>
    userAvailableDocs.some(
      (userDoc) =>
        userDoc.toLowerCase().trim() === doc.toLowerCase().trim() ||
        userDoc.toLowerCase().includes(doc.toLowerCase()) ||
        doc.toLowerCase().includes(userDoc.toLowerCase())
    )
  );
  const missingDocs = requiredDocs.filter(
    (doc) => !availableDocs.includes(doc)
  );

  const readinessPercent =
    requiredDocs.length > 0
      ? Math.round((availableDocs.length / requiredDocs.length) * 100)
      : 100;

  // Status badge styling based on document readiness
  const getStatusBadge = () => {
    if (readinessPercent === 100) {
      return {
        label: lang === "en" ? "Ready Today (100%)" : "അടിയന്തര അപേക്ഷ",
        bg: "bg-emerald-100 text-emerald-800 border-emerald-300",
      };
    } else if (readinessPercent >= 50) {
      return {
        label: lang === "en" ? `Action Needed (${readinessPercent}% Ready)` : "ഭാഗിക വിവരങ്ങൾ",
        bg: "bg-amber-100 text-amber-800 border-amber-300",
      };
    } else {
      return {
        label: lang === "en" ? `Missing Docs (${readinessPercent}% Ready)` : "രേഖകൾ ആവശ്യമാണ്",
        bg: "bg-rose-100 text-rose-800 border-rose-300",
      };
    }
  };

  const statusInfo = getStatusBadge();

  return (
    <div
      id={`scheme-card-${scheme.id}`}
      className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xl hover:shadow-2xl transition-all duration-300 relative"
    >
      {/* Top Bar: Dept + State/Central Tag + Readiness Pill */}
      <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
        <div className="flex items-center space-x-2 text-xs text-slate-500 font-medium">
          <Building2 className="w-4 h-4 text-teal-600 shrink-0" />
          <span className="font-semibold text-slate-800 truncate max-w-[200px] sm:max-w-xs">
            {scheme.department}
          </span>
          <span>•</span>
          <span className="font-bold px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 border border-slate-200">
            {scheme.stateOrCentral}
          </span>
        </div>

        <div className="flex items-center space-x-2">
          {/* Document Readiness percentage badge */}
          <div
            className={`flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-extrabold border ${
              readinessPercent === 100
                ? "bg-emerald-50 text-emerald-800 border-emerald-300"
                : readinessPercent >= 50
                ? "bg-amber-50 text-amber-800 border-amber-300"
                : "bg-rose-50 text-rose-800 border-rose-300"
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Document Readiness: {readinessPercent}%</span>
          </div>

          {/* Bookmark Button */}
          {onBookmarked && (
            <button
              onClick={() => onBookmarked(scheme.id)}
              className={`p-2 rounded-xl border text-xs transition-colors cursor-pointer ${
                isBookmarked
                  ? "bg-teal-100 text-teal-800 border-teal-300"
                  : "bg-slate-100 text-slate-400 border-slate-200 hover:text-slate-700"
              }`}
              title="Save Scheme"
            >
              <BookmarkCheck className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Main Scheme Title & Annual Benefit Value */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-4">
        <div>
          <h3 className="text-xl sm:text-2xl font-heading font-extrabold text-slate-900 tracking-tight leading-snug">
            {scheme.title}
          </h3>
          {scheme.malayalamTitle && (
            <p className="text-xs font-bold text-teal-700 mt-1 font-sans">
              {scheme.malayalamTitle}
            </p>
          )}
        </div>

        {/* Estimated Annual Value Box */}
        <div className="bg-gradient-to-br from-slate-900 to-indigo-950 text-white rounded-2xl px-5 py-3 shrink-0 text-left sm:text-right shadow-md border border-slate-800">
          <span className="text-[10px] font-bold uppercase tracking-wider text-teal-300 block">
            {lang === "en" ? "Est. Annual Value" : "വാർഷിക തുക"}
          </span>
          <span className="text-2xl font-heading font-extrabold text-white">
            {formatCurrency(scheme.estimatedAnnualValue)}
          </span>
        </div>
      </div>

      {/* Status Pill + Short Summary */}
      <div className="flex flex-wrap items-center gap-2 mb-4">
        <span
          className={`px-3 py-1 rounded-full text-xs font-extrabold border ${statusInfo.bg}`}
        >
          {statusInfo.label}
        </span>
        <span className="text-xs text-slate-600 font-medium">
          {scheme.shortSummary}
        </span>
      </div>

      {/* Natural AI Recommendation Box */}
      <div className="p-3.5 rounded-2xl bg-indigo-50/70 border border-indigo-200/80 mb-4 text-xs text-indigo-950 flex items-start gap-2.5">
        <Sparkles className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
        <div>
          <span className="font-bold block mb-0.5">Scheme Recommendation Note:</span>
          <span>
            {readinessPercent === 100
              ? `${scheme.title} is recommended because you are eligible and already have all required documents (100% ready). You can apply immediately today.`
              : `${scheme.title} is recommended because you are eligible and already have ${availableDocs.length} of ${requiredDocs.length} required documents (${readinessPercent}% ready). You only need to obtain ${missingDocs.join(", ")} before applying.`}
          </span>
        </div>
      </div>

      {/* Document Availability Breakdown Section */}
      <div className="my-4 p-4 rounded-2xl bg-slate-50 border border-slate-200/90 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs uppercase font-extrabold text-slate-800 tracking-wider">
            Document Breakdown for this Scheme
          </span>
          <span className="text-xs font-bold text-slate-600">
            {availableDocs.length} / {requiredDocs.length} Available
          </span>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
          <div
            className={`h-full transition-all duration-500 ${
              readinessPercent === 100
                ? "bg-emerald-500"
                : readinessPercent >= 50
                ? "bg-amber-500"
                : "bg-rose-500"
            }`}
            style={{ width: `${readinessPercent}%` }}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs pt-1">
          {/* Available Docs List */}
          <div className="p-3 rounded-xl bg-emerald-50/80 border border-emerald-200">
            <span className="font-bold text-emerald-950 block mb-1.5 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>Available Documents ({availableDocs.length})</span>
            </span>
            {availableDocs.length > 0 ? (
              <ul className="space-y-1 pl-1">
                {availableDocs.map((doc, idx) => (
                  <li key={idx} className="text-[11px] text-emerald-900 font-medium flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 shrink-0" />
                    <span>{doc}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <span className="text-[11px] text-emerald-800 italic">None selected yet</span>
            )}
          </div>

          {/* Missing Docs List */}
          <div className="p-3 rounded-xl bg-rose-50/80 border border-rose-200">
            <span className="font-bold text-rose-950 block mb-1.5 flex items-center gap-1">
              <XCircle className="w-3.5 h-3.5 text-rose-600" />
              <span>Missing Documents ({missingDocs.length})</span>
            </span>
            {missingDocs.length > 0 ? (
              <ul className="space-y-1 pl-1">
                {missingDocs.map((doc, idx) => (
                  <li key={idx} className="text-[11px] text-rose-900 font-medium flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-600 shrink-0" />
                    <span>{doc}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <span className="text-[11px] text-emerald-700 font-bold">✓ All required documents available!</span>
            )}
          </div>
        </div>
      </div>

      {/* Accordion: Why Eligible / Why Not */}
      {showDetails && (
        <div className="my-4 pt-2 space-y-3">
          {/* Why Eligible List */}
          <div className="bg-emerald-50/70 p-4 rounded-2xl border border-emerald-200/80">
            <h4 className="text-xs font-extrabold text-emerald-900 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>
                {lang === "en" ? "Why You Are Eligible" : "അർഹതാ കാരണങ്ങൾ"}
              </span>
            </h4>
            <ul className="space-y-1.5 pl-1">
              {scheme.whyEligible.map((reason, idx) => (
                <li
                  key={idx}
                  className="text-xs text-slate-800 font-medium flex items-start space-x-2"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-1.5 shrink-0" />
                  <span>{reason}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* Clause Citation Box (Expandable) */}
      <div className="mt-4 pt-3 border-t border-slate-100">
        <button
          onClick={() => setShowCitation(!showCitation)}
          className="w-full flex items-center justify-between text-xs font-bold text-indigo-700 hover:text-indigo-900 transition-colors py-1 cursor-pointer"
        >
          <span className="flex items-center space-x-1.5">
            <FileText className="w-4 h-4 text-teal-600" />
            <span>
              {lang === "en"
                ? "View Official Scheme Citation & Clause"
                : "ഔദ്യോഗിക ഉത്തരവ് വിവരങ്ങൾ"}
            </span>
          </span>
          {showCitation ? (
            <ChevronUp className="w-4 h-4 text-indigo-600" />
          ) : (
            <ChevronDown className="w-4 h-4 text-indigo-600" />
          )}
        </button>

        {showCitation && (
          <div className="mt-3 p-4 rounded-2xl bg-slate-900 text-slate-200 border border-slate-800 text-xs space-y-2.5">
            <div className="flex items-center justify-between text-[11px] font-bold text-teal-400 border-b border-slate-800 pb-2">
              <span>{scheme.citation.docName}</span>
              <span className="font-mono bg-slate-800 px-2 py-0.5 rounded text-teal-300">
                {scheme.citation.clauseNumber}
              </span>
            </div>
            <p className="italic text-slate-300 leading-relaxed bg-slate-950 p-3 rounded-xl border border-slate-800 font-medium">
              "{scheme.citation.excerpt}"
            </p>
            {scheme.citation.officialUrl && (
              <a
                href={scheme.citation.officialUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center text-[11px] font-bold text-teal-400 hover:underline pt-1"
              >
                <span>Verify on Official Government Gazette Portal</span>
                <ExternalLink className="w-3 h-3 ml-1" />
              </a>
            )}
          </div>
        )}
      </div>

      {/* Action Footer Bar */}
      <div className="mt-4 pt-3 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <span className="text-[11px] text-slate-500 font-medium">
          How to Apply:{" "}
          <span className="text-slate-800 font-bold">{scheme.howToApply}</span>
        </span>

        {scheme.officialPortalUrl && (
          <a
            href={scheme.officialPortalUrl}
            target="_blank"
            rel="noreferrer"
            className="px-5 py-2.5 rounded-xl gradient-score hover:opacity-95 text-white font-bold text-xs transition-all shadow-md flex items-center justify-center space-x-1.5 shrink-0"
          >
            <span>
              {lang === "en" ? "Apply on Official Portal" : "അപേക്ഷിക്കുക"}
            </span>
            <ExternalLink className="w-3.5 h-3.5 text-teal-300" />
          </a>
        )}
      </div>
    </div>
  );
}
