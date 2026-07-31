"use client";

import { useEffect, useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { extractProfileFromStory, evaluateProfileSchemes } from "@/lib/schemeMatcher";
import { BenefitReport, SchemeCategory, UserProfileSummary } from "@/lib/types";
import { Header } from "@/components/Header";
import { ScoreCard } from "@/components/ScoreCard";
import { SchemeCard } from "@/components/SchemeCard";
import { SchemeFilterTabs } from "@/components/SchemeFilterTabs";
import { RoadmapTimeline } from "@/components/RoadmapTimeline";
import { DocumentChecklist } from "@/components/DocumentChecklist";
import { ProfileTab } from "@/components/ProfileTab";
import { MySchemesTab } from "@/components/MySchemesTab";
import {
  Download,
  RotateCcw,
  Sparkles,
  CheckCircle2,
  ChevronLeft,
  FileCode2,
  AlertCircle,
  Cpu,
} from "lucide-react";

function ReportContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [reportData, setReportData] = useState<BenefitReport | null>(null);
  const [userStory, setUserStory] = useState<string | null>(null);
  const [clarification, setClarification] = useState<string | null>(null);
  const [showJsonModal, setShowJsonModal] = useState<boolean>(false);
  const [isLoadingApi, setIsLoadingApi] = useState<boolean>(true);

  // UI States
  const [activeTab, setActiveTab] = useState<"dashboard" | "my_schemes" | "profile">("dashboard");
  const [lang, setLang] = useState<"en" | "ml">("en");
  const [activeCategory, setActiveCategory] = useState<SchemeCategory>("all");
  const [bookmarkedSchemeIds, setBookmarkedSchemeIds] = useState<string[]>([]);

  useEffect(() => {
    let currentStory = searchParams.get("story");
    
    if (!currentStory && typeof window !== "undefined") {
      currentStory = sessionStorage.getItem("userStory");
    }

    if (!currentStory || currentStory.trim().length === 0) {
      currentStory = "I am a 21-year-old male B.Tech student from Kerala with an annual income of ₹2.5 lakh.";
    }

    setUserStory(currentStory);

    let savedClarification: string | undefined;
    if (typeof window !== "undefined") {
      savedClarification = sessionStorage.getItem("clarification") || undefined;
      if (savedClarification) {
        setClarification(savedClarification);
      }
    }

    // Call live API (powered by xAI Grok)
    setIsLoadingApi(true);
    fetch("/api/benefits", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ story: currentStory, clarifyingAnswer: savedClarification }),
    })
      .then((res) => res.json())
      .then((resData) => {
        if (resData.success && resData.data) {
          setReportData(resData.data);
        } else {
          // Fallback to local rule engine
          const profile = extractProfileFromStory(currentStory!);
          setReportData(evaluateProfileSchemes(profile));
        }
      })
      .catch(() => {
        const profile = extractProfileFromStory(currentStory!);
        setReportData(evaluateProfileSchemes(profile));
      })
      .finally(() => {
        setIsLoadingApi(false);
      });

    // Trigger celebratory confetti on initial report render
    try {
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.6 },
        colors: ["#0d9488", "#312e81", "#10b981", "#38bdf8"],
      });
    } catch (e) {
      // Ignore if confetti unavailable
    }
  }, [searchParams]);

  const handleToggleBookmark = (schemeId: string) => {
    setBookmarkedSchemeIds((prev) =>
      prev.includes(schemeId)
        ? prev.filter((id) => id !== schemeId)
        : [...prev, schemeId]
    );
  };

  const handleDownloadPDF = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  const handleStartOver = () => {
    if (typeof window !== "undefined") {
      sessionStorage.removeItem("userStory");
      sessionStorage.removeItem("clarification");
    }
    router.push("/");
  };

  const handleUpdateProfile = (updatedProfile: UserProfileSummary) => {
    if (!reportData) return;
    
    // Re-extract & re-evaluate schemes dynamically
    const reconstructedText = `Profile: ${updatedProfile.gender || "Individual"} ${updatedProfile.occupation || "Applicant"} from ${updatedProfile.state}, Income: ₹${updatedProfile.annualIncomeRupees}, Age: ${updatedProfile.age}`;
    const newExtracted = extractProfileFromStory(reconstructedText);
    newExtracted.annualIncomeRupees = updatedProfile.annualIncomeRupees || 200000;
    newExtracted.childrenInSchool = updatedProfile.childrenInSchool || 0;
    newExtracted.occupation = updatedProfile.occupation || "Applicant";
    
    const newReport = evaluateProfileSchemes(newExtracted);
    setReportData(newReport);
  };

  if (isLoadingApi || !reportData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900 text-white">
        <div className="text-center p-8 space-y-4">
          <div className="w-16 h-16 rounded-2xl gradient-score flex items-center justify-center text-teal-300 mx-auto animate-pulse border border-teal-500/30">
            <Cpu className="w-8 h-8 animate-spin" />
          </div>
          <h3 className="text-xl font-heading font-bold text-white">
            xAI Grok Reasoning Engine Active
          </h3>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            Extracting JSON profile & evaluating official Government of India + Kerala State gazette rules...
          </p>
        </div>
      </div>
    );
  }

  // Filter schemes by category
  const filteredSchemes = reportData.schemes.filter((scheme) => {
    if (activeCategory === "all") return true;
    return scheme.category === activeCategory;
  });

  // Calculate category counts
  const categoryCounts: Record<SchemeCategory, number> = {
    all: reportData.schemes.length,
    pension: reportData.schemes.filter((s) => s.category === "pension").length,
    health: reportData.schemes.filter((s) => s.category === "health").length,
    education: reportData.schemes.filter((s) => s.category === "education").length,
    housing: reportData.schemes.filter((s) => s.category === "housing").length,
    livelihood: reportData.schemes.filter((s) => s.category === "livelihood").length,
    agriculture: reportData.schemes.filter((s) => s.category === "agriculture").length,
    women_child: 0,
  };

  const savedSchemesList = reportData.schemes.filter((s) =>
    bookmarkedSchemeIds.includes(s.id)
  );

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Top Header Navigation */}
      <Header
        onStartOver={handleStartOver}
        lang={lang}
        setLang={setLang}
        hasReport={true}
        onOpenExport={handleDownloadPDF}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        savedSchemesCount={bookmarkedSchemeIds.length}
      />

      <main className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
        {/* Top Breadcrumb & Quick Actions */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 no-print">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-600 hover:text-indigo-600 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Back to Story Search</span>
          </Link>

          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-xs font-bold">
              <Cpu className="w-3.5 h-3.5 text-teal-600" />
              <span>xAI Grok Reasoning Engine Live</span>
            </span>

            <button
              onClick={() => setShowJsonModal(true)}
              className="px-3.5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-all flex items-center gap-1.5 border border-slate-200"
              title="View Extracted JSON Profile (Step 1)"
            >
              <FileCode2 className="w-4 h-4 text-teal-600" />
              <span>Extracted JSON Profile</span>
            </button>

            <button
              onClick={handleStartOver}
              className="px-4 py-2.5 rounded-xl border border-slate-300 hover:bg-slate-100 text-slate-700 text-xs font-bold transition-all flex items-center gap-2 shadow-sm"
            >
              <RotateCcw className="w-4 h-4 text-slate-500" />
              <span>Start Over</span>
            </button>

            <button
              onClick={handleDownloadPDF}
              className="px-6 py-2.5 rounded-xl gradient-score text-white text-xs font-bold shadow-lg shadow-indigo-950/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2"
            >
              <Download className="w-4 h-4 text-teal-300" />
              <span>Download Report (PDF)</span>
            </button>
          </div>
        </div>

        {/* User Story Banner */}
        {userStory && activeTab === "dashboard" && (
          <div className="bg-indigo-50/80 border border-indigo-200/80 rounded-2xl p-4 sm:p-5 flex items-start gap-3 no-print">
            <Sparkles className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
            <div className="flex-1">
              <span className="text-[10px] uppercase font-bold tracking-wider text-indigo-800 block mb-0.5">
                Evaluated Profile Situation
              </span>
              <p className="text-xs sm:text-sm text-indigo-950 font-medium italic">
                "{userStory}"
              </p>
              {clarification && (
                <div className="mt-2 pt-2 border-t border-indigo-200/60 flex items-center gap-2 text-xs text-indigo-900">
                  <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
                  <span>
                    <strong>Clarified Details:</strong> {clarification}
                  </span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Tab 1: Main Dashboard Report */}
        {activeTab === "dashboard" && (
          <div className="space-y-10">
            {/* Centerpiece Hero ScoreCard */}
            <ScoreCard
              score={reportData.benefitPotentialScore}
              estimatedAnnualBenefits={reportData.estimatedAnnualBenefitsRupees}
              readyApplicationsCount={reportData.applicationsReadyCount}
              missingDocumentsCount={reportData.missingDocsCount}
              applicantType={`${reportData.extractedProfile.gender || "Citizen"} • ${reportData.extractedProfile.occupation || "Applicant"}`}
              incomeBand={`₹${(
                reportData.extractedProfile.annualIncomeRupees || 200000
              ).toLocaleString("en-IN")} / yr`}
            />

            {/* Scheme Category Filter Bar */}
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-4">
                <div>
                  <span className="text-xs uppercase font-extrabold tracking-wider text-teal-700 block mb-1">
                    Verified Entitlements
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-heading font-bold text-slate-900">
                    Official Scheme Matches ({reportData.schemes.length})
                  </h2>
                </div>
                <p className="text-xs text-slate-500">
                  Showing {filteredSchemes.length} of {reportData.schemes.length} verified government schemes
                </p>
              </div>

              <SchemeFilterTabs
                activeCategory={activeCategory}
                onSelectCategory={setActiveCategory}
                counts={categoryCounts}
              />
            </div>

            {/* Priority Scheme Cards */}
            {reportData.schemes.length === 0 ? (
              <div className="bg-amber-50 border border-amber-200 rounded-3xl p-10 text-center space-y-3 shadow-sm">
                <AlertCircle className="w-8 h-8 text-amber-600 mx-auto" />
                <p className="text-base font-bold text-amber-900">
                  No official Government of India or State Government scheme matches the provided profile.
                </p>
                <p className="text-xs text-amber-700 max-w-md mx-auto">
                  BenefitMax AI strictly enforces official eligibility requirements. Adjust income, occupation, or age parameters in the Profile tab to test other criteria.
                </p>
              </div>
            ) : filteredSchemes.length === 0 ? (
              <div className="bg-white border border-slate-200 rounded-3xl p-10 text-center space-y-3 shadow-sm">
                <p className="text-base font-bold text-slate-800">
                  No official scheme matches this specific filter category.
                </p>
                <button
                  onClick={() => setActiveCategory("all")}
                  className="px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-bold"
                >
                  View All Schemes ({reportData.schemes.length})
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-6">
                {filteredSchemes.map((scheme, index) => (
                  <SchemeCard
                    key={scheme.id}
                    scheme={scheme}
                    lang={lang}
                    onBookmarked={handleToggleBookmark}
                    isBookmarked={bookmarkedSchemeIds.includes(scheme.id)}
                  />
                ))}
              </div>
            )}

            {/* Vertical Roadmap Timeline */}
            {reportData.schemes.length > 0 && reportData.roadmap && (
              <RoadmapTimeline steps={reportData.roadmap} />
            )}

            {/* Document Checklist */}
            {reportData.schemes.length > 0 && reportData.documents && (
              <DocumentChecklist documents={reportData.documents} />
            )}
          </div>
        )}

        {/* Tab 2: My Saved Schemes */}
        {activeTab === "my_schemes" && (
          <MySchemesTab
            savedSchemes={savedSchemesList}
            lang={lang}
            onRemoveBookmark={handleToggleBookmark}
            onNavigateHome={() => setActiveTab("dashboard")}
          />
        )}

        {/* Tab 3: Profile Settings & Parameters */}
        {activeTab === "profile" && (
          <ProfileTab
            profile={reportData.extractedProfile}
            onUpdateProfile={handleUpdateProfile}
            lang={lang}
          />
        )}
      </main>

      {/* JSON Extracted Profile Modal (Step 1 Inspection) */}
      <AnimatePresence>
        {showJsonModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-lg bg-slate-900 text-slate-100 rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-800 relative"
            >
              <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-4">
                <div className="flex items-center gap-2">
                  <FileCode2 className="w-5 h-5 text-teal-400" />
                  <h3 className="text-lg font-heading font-bold text-white">
                    Step 1: Extracted Profile JSON
                  </h3>
                </div>
                <button
                  onClick={() => setShowJsonModal(false)}
                  className="text-xs font-bold text-slate-400 hover:text-white px-2 py-1 bg-slate-800 rounded-lg"
                >
                  Close ✕
                </button>
              </div>

              <p className="text-xs text-slate-400 mb-4">
                Structured criteria extracted from your natural language description according to BenefitMax AI rules:
              </p>

              <pre className="bg-slate-950 p-4 rounded-2xl border border-slate-800 text-xs font-mono text-teal-300 overflow-x-auto max-h-80 leading-relaxed">
                {JSON.stringify(reportData.extractedProfile, null, 2)}
              </pre>

              <div className="mt-6 text-right">
                <button
                  onClick={() => setShowJsonModal(false)}
                  className="px-5 py-2 rounded-xl gradient-score text-white text-xs font-bold"
                >
                  Done
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Floating Action Bar */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-30 w-full max-w-md px-4 no-print">
        <div className="glass-panel p-3 rounded-2xl shadow-2xl border border-slate-300 flex items-center justify-between gap-3">
          <div className="pl-2">
            <span className="text-[10px] uppercase font-bold text-slate-500 block">
              Estimated Annual Entitlements
            </span>
            <span className="text-sm font-heading font-bold text-teal-700">
              ₹{reportData.estimatedAnnualBenefitsRupees.toLocaleString("en-IN")} / Year
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleStartOver}
              className="p-2.5 rounded-xl border border-slate-200 hover:bg-slate-100 text-slate-700 text-xs font-semibold transition-colors"
              title="Start Over"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            <button
              onClick={handleDownloadPDF}
              className="px-5 py-2.5 rounded-xl gradient-score text-white text-xs font-bold shadow-md hover:scale-105 transition-all flex items-center gap-2"
            >
              <Download className="w-4 h-4 text-teal-300" />
              <span>Download PDF</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ReportPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-slate-900 text-white">
          <div className="text-center p-8 space-y-4">
            <div className="w-16 h-16 rounded-2xl gradient-score flex items-center justify-center text-teal-300 mx-auto animate-pulse border border-teal-500/30">
              <Cpu className="w-8 h-8 animate-spin" />
            </div>
            <h3 className="text-xl font-heading font-bold text-white">
              Connecting to xAI Grok Engine...
            </h3>
          </div>
        </div>
      }
    >
      <ReportContent />
    </Suspense>
  );
}
