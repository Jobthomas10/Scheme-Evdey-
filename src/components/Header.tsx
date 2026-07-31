"use client";

import Link from "next/link";
import {
  ShieldCheck,
  FileText,
  RotateCcw,
  User,
  LayoutDashboard,
  BookmarkCheck,
  Landmark,
} from "lucide-react";

interface HeaderProps {
  onStartOver?: () => void;
  lang?: "en" | "ml";
  setLang?: (lang: "en" | "ml") => void;
  hasReport?: boolean;
  onOpenExport?: () => void;
  activeTab?: "dashboard" | "my_schemes" | "profile";
  setActiveTab?: (tab: "dashboard" | "my_schemes" | "profile") => void;
  savedSchemesCount?: number;
}

export function Header({
  onStartOver,
  lang = "en",
  setLang,
  hasReport = false,
  onOpenExport,
  activeTab = "dashboard",
  setActiveTab,
  savedSchemesCount = 0,
}: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 w-full glass-panel border-b border-slate-200/80 bg-white/85">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <Link
          href="/"
          onClick={() => setActiveTab?.("dashboard")}
          className="flex items-center gap-3 group"
        >
          <div className="w-10 h-10 rounded-xl gradient-score flex items-center justify-center text-white shadow-md shadow-indigo-900/20 group-hover:scale-105 transition-transform">
            <Landmark className="w-5 h-5 text-teal-300" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-heading font-extrabold text-lg sm:text-xl tracking-tight text-slate-900">
                Scheme <span className="text-teal-600 font-sans">എവിടെ?</span>
              </span>
              <span className="bg-teal-50 border border-teal-200/80 text-teal-800 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider hidden sm:inline-block">
                Kerala AI
              </span>
            </div>
          </div>
        </Link>

        {/* Center Nav Tabs: Dashboard | My Schemes | Profile */}
        {setActiveTab && (
          <nav className="hidden md:flex items-center space-x-1 bg-slate-100 p-1 rounded-full border border-slate-200">
            <button
              onClick={() => setActiveTab("dashboard")}
              className={`px-4 py-1.5 text-xs font-bold rounded-full transition-all flex items-center space-x-1.5 cursor-pointer ${
                activeTab === "dashboard"
                  ? "gradient-score text-white shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <LayoutDashboard className="w-3.5 h-3.5" />
              <span>Dashboard</span>
            </button>

            <button
              onClick={() => setActiveTab("my_schemes")}
              className={`px-4 py-1.5 text-xs font-bold rounded-full transition-all flex items-center space-x-1.5 cursor-pointer ${
                activeTab === "my_schemes"
                  ? "gradient-score text-white shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <BookmarkCheck className="w-3.5 h-3.5" />
              <span>My Schemes</span>
              {savedSchemesCount > 0 && (
                <span className="ml-1 px-1.5 py-0.2 rounded-full text-[10px] bg-teal-500 text-white font-extrabold">
                  {savedSchemesCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab("profile")}
              className={`px-4 py-1.5 text-xs font-bold rounded-full transition-all flex items-center space-x-1.5 cursor-pointer ${
                activeTab === "profile"
                  ? "gradient-score text-white shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <User className="w-3.5 h-3.5" />
              <span>Profile</span>
            </button>
          </nav>
        )}

        {/* Right Actions & Language Selector */}
        <div className="flex items-center space-x-2.5">
          {/* Language Toggle (EN / ML) */}
          {setLang && (
            <div className="flex bg-slate-100 p-1 rounded-full border border-slate-200">
              <button
                onClick={() => setLang("en")}
                className={`px-2.5 py-0.5 text-xs font-bold rounded-full transition-all cursor-pointer ${
                  lang === "en"
                    ? "bg-white text-teal-700 shadow-xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                EN
              </button>
              <button
                onClick={() => setLang("ml")}
                className={`px-2.5 py-0.5 text-xs font-bold rounded-full transition-all cursor-pointer ${
                  lang === "ml"
                    ? "bg-white text-teal-700 shadow-xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                മല
              </button>
            </div>
          )}

          {/* Download/Export Button */}
          {hasReport && onOpenExport && (
            <button
              onClick={onOpenExport}
              className="hidden sm:flex items-center space-x-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold gradient-score text-white shadow-sm transition-all cursor-pointer"
            >
              <FileText className="w-3.5 h-3.5 text-teal-300" />
              <span>{lang === "en" ? "Report" : "റിപ്പോർട്ട്"}</span>
            </button>
          )}

          {/* Start Over Button */}
          {onStartOver && (
            <button
              onClick={onStartOver}
              className="flex items-center space-x-1 px-3 py-1.5 rounded-full text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-200 transition-colors cursor-pointer"
              title="Start Over"
            >
              <RotateCcw className="w-3.5 h-3.5 text-teal-600" />
              <span className="hidden sm:inline">
                {lang === "en" ? "Start Over" : "വീണ്ടും"}
              </span>
            </button>
          )}
        </div>
      </div>

      {/* Mobile Sub-Nav Bar */}
      {setActiveTab && (
        <div className="md:hidden flex items-center justify-around bg-slate-50 border-t border-slate-200 px-4 py-2">
          <button
            onClick={() => setActiveTab("dashboard")}
            className={`flex items-center space-x-1 text-xs font-bold px-3 py-1 rounded-full ${
              activeTab === "dashboard"
                ? "gradient-score text-white"
                : "text-slate-600"
            }`}
          >
            <LayoutDashboard className="w-3.5 h-3.5" />
            <span>Dashboard</span>
          </button>

          <button
            onClick={() => setActiveTab("my_schemes")}
            className={`flex items-center space-x-1 text-xs font-bold px-3 py-1 rounded-full ${
              activeTab === "my_schemes"
                ? "gradient-score text-white"
                : "text-slate-600"
            }`}
          >
            <BookmarkCheck className="w-3.5 h-3.5" />
            <span>My Schemes</span>
          </button>

          <button
            onClick={() => setActiveTab("profile")}
            className={`flex items-center space-x-1 text-xs font-bold px-3 py-1 rounded-full ${
              activeTab === "profile"
                ? "gradient-score text-white"
                : "text-slate-600"
            }`}
          >
            <User className="w-3.5 h-3.5" />
            <span>Profile</span>
          </button>
        </div>
      )}
    </header>
  );
}
