import Link from "next/link";
import { ShieldCheck, FileCheck2, Lock, Heart, ExternalLink, Landmark } from "lucide-react";

export function Footer() {
  return (
    <footer className="w-full bg-slate-900 text-slate-300 border-t border-slate-800 mt-20 no-print">
      {/* Trust Badges Banner */}
      <div className="border-b border-slate-800 bg-slate-950/60 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
          <div className="flex items-start gap-4 p-4 rounded-xl bg-slate-900/50 border border-slate-800/80">
            <div className="p-2.5 rounded-lg bg-teal-500/10 text-teal-400 shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-semibold text-white text-sm">
                Powered by Official G.O. Documents
              </h4>
              <p className="text-xs text-slate-400 mt-1">
                Reads authentic Kerala Government Orders, Sevana rules, and Gazetted notifications.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-4 rounded-xl bg-slate-900/50 border border-slate-800/80">
            <div className="p-2.5 rounded-lg bg-indigo-500/10 text-indigo-400 shrink-0">
              <FileCheck2 className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-semibold text-white text-sm">
                Clause-Level Explanations
              </h4>
              <p className="text-xs text-slate-400 mt-1">
                Every benefit recommendation includes exact rule numbers and statutory citations.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-4 rounded-xl bg-slate-900/50 border border-slate-800/80">
            <div className="p-2.5 rounded-lg bg-emerald-500/10 text-emerald-400 shrink-0">
              <Lock className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-semibold text-white text-sm">
                100% Privacy-First & Secure
              </h4>
              <p className="text-xs text-slate-400 mt-1">
                No personal identifiers or Aadhaar numbers stored. Your profile stays strictly private.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg gradient-score flex items-center justify-center text-white">
                <Landmark className="w-5 h-5 text-teal-300" />
              </div>
              <span className="font-heading font-extrabold text-xl text-white">
                Scheme <span className="text-teal-400 font-sans">എവിടെ?</span>
              </span>
            </div>
            <p className="text-xs leading-relaxed text-slate-400 max-w-md">
              Scheme എവിടെ? bridges the gap between citizens and public welfare. By parsing complex state and central schemes into personalized Family Benefit Reports, we ensure no deserving family in Kerala misses out on their statutory entitlements.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h5 className="text-sm font-semibold text-white mb-3">Official Portals</h5>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <a
                  href="https://sevana.kerala.gov.in"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-teal-400 transition-colors inline-flex items-center gap-1.5"
                >
                  <span>Kerala Sevana Pension</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
              <li>
                <a
                  href="https://edistrict.kerala.gov.in"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-teal-400 transition-colors inline-flex items-center gap-1.5"
                >
                  <span>Kerala e-District Portal</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
              <li>
                <a
                  href="https://egrantz.kerala.gov.in"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-teal-400 transition-colors inline-flex items-center gap-1.5"
                >
                  <span>e-Grantz 3.0 Scholarships</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
              <li>
                <a
                  href="https://sha.kerala.gov.in"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-teal-400 transition-colors inline-flex items-center gap-1.5"
                >
                  <span>Karunya KASP Health Scheme</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
            </ul>
          </div>

          {/* Supported Schemes */}
          <div>
            <h5 className="text-sm font-semibold text-white mb-3">Categories Covered</h5>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>• Social Security & Widow Pensions</li>
              <li>• Student Educational Grants & Stipends</li>
              <li>• Cashless Healthcare Coverage (KASP)</li>
              <li>• Housing & Land Assistance (LIFE Mission)</li>
              <li>• Kudumbashree Micro-Credit Schemes</li>
            </ul>
          </div>
        </div>

        {/* Disclaimer Notice */}
        <div className="mt-12 pt-6 border-t border-slate-800 text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p className="bg-slate-950 px-4 py-2.5 rounded-lg border border-slate-800/80 text-amber-300/90 max-w-3xl">
            <strong className="text-white font-semibold">Disclaimer:</strong> This is an advisory tool. Final eligibility is determined by the respective government departments and statutory officers.
          </p>
          <div className="flex items-center gap-1 text-slate-400 shrink-0">
            <span>Built with care for Kerala Citizens</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline" />
          </div>
        </div>
      </div>
    </footer>
  );
}
