"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { extractProfileFromStory } from "@/lib/schemeMatcher";
import {
  Sparkles,
  Brain,
  FileSearch,
  Calculator,
  CheckCircle2,
  ChevronRight,
  School,
  HelpCircle,
  Landmark,
  UserCheck,
  Tractor,
} from "lucide-react";

interface LoadingOverlayProps {
  storyText: string;
  onComplete: (clarifyingAnswer?: string) => void;
}

export function LoadingOverlay({ storyText, onComplete }: LoadingOverlayProps) {
  const [stepIndex, setStepIndex] = useState(0);
  const [showClarifyingModal, setShowClarifyingModal] = useState(false);
  const [selectedClarification, setSelectedClarification] = useState<string | null>(null);

  const profile = extractProfileFromStory(storyText);

  // Determine dynamic relevant question based on profile
  let questionData: {
    title: string;
    subtitle: string;
    icon: any;
    options: { label: string; subtext: string; value: string }[];
  } | null = null;

  if (profile.isStudent && (profile.age || 20) >= 17) {
    questionData = {
      title: "College Institution Category Verification",
      subtitle: `To accurately verify scholarship tier for your ${profile.course || "higher education"} profile:`,
      icon: School,
      options: [
        {
          label: "Government or Aided College",
          subtext: "Eligible for 100% full fee waiver & monthly hostel stipend via e-Grantz 3.0",
          value: "Government / Aided College Student",
        },
        {
          label: "Self-Financed / Private College",
          subtext: "Eligible for PM-USP Central Sector Scholarship & fee concession vouchers",
          value: "Recognized Private College Student",
        },
      ],
    };
  } else if (profile.isFarmer) {
    questionData = {
      title: "Cultivable Landholding Verification",
      subtitle: "To verify PM-KISAN and agricultural welfare pension entitlement:",
      icon: Tractor,
      options: [
        {
          label: "Registered Landholder with Land Tax Receipt",
          subtext: "Eligible for PM-KISAN ₹6,000/yr direct bank transfer & crop insurance",
          value: "Verified Landholding Farmer",
        },
        {
          label: "Tenant / Lease Cultivator",
          subtext: "Eligible for Kisan Credit Card & State Farm Laborer Pension",
          value: "Tenant Cultivator",
        },
      ],
    };
  } else if (profile.isSeniorCitizen) {
    questionData = {
      title: "Senior Pension Entitlement Check",
      subtitle: "To verify IGNOAPS Old Age Pension eligibility:",
      icon: UserCheck,
      options: [
        {
          label: "No other government/service pension received",
          subtext: "100% match for monthly ₹1,600 Kerala IGNOAPS pension",
          value: "Zero Other Pension Received",
        },
        {
          label: "Receiving private/EPF monthly pension",
          subtext: "Income ceiling criteria re-checked against welfare rules",
          value: "EPF Pensioner",
        },
      ],
    };
  } else if (profile.isWidow && profile.childrenInSchool > 0) {
    questionData = {
      title: "School Enrollment Verification",
      subtitle: "To match Vidyadhanam & e-Grantz educational scholarships for your children:",
      icon: School,
      options: [
        {
          label: "Government or Aided School",
          subtext: "Eligible for 100% full stipend & lump-sum book grants",
          value: "Government / Aided School",
        },
        {
          label: "Recognized Un-aided Private School",
          subtext: "Eligible for specialized fee concession & scholarship vouchers",
          value: "Private School",
        },
      ],
    };
  }

  const steps = [
    {
      title: "Understanding your profile...",
      subtitle: `Extracting ${profile.gender} ${profile.occupation} parameters (Income: ₹${profile.annualIncomeRupees.toLocaleString("en-IN")})`,
      icon: Brain,
      color: "text-teal-600 bg-teal-50 border-teal-200",
    },
    {
      title: "Reading official scheme documents...",
      subtitle: `Scanning ${profile.state} Government Orders & Union Ministry gazettes`,
      icon: FileSearch,
      color: "text-indigo-600 bg-indigo-50 border-indigo-200",
    },
    {
      title: "Calculating Benefit Potential Score...",
      subtitle: "Reasoning over statutory clauses & estimating annual entitlement values",
      icon: Calculator,
      color: "text-emerald-600 bg-emerald-50 border-emerald-200",
    },
  ];

  useEffect(() => {
    // Step 0 -> Step 1 after 1.2s
    const timer1 = setTimeout(() => {
      setStepIndex(1);
    }, 1200);

    // Step 1 -> Trigger Clarifying Modal ONLY IF questionData exists
    const timer2 = setTimeout(() => {
      if (questionData) {
        setShowClarifyingModal(true);
      } else {
        setStepIndex(2);
        setTimeout(() => {
          onComplete();
        }, 1200);
      }
    }, 2800);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  const handleSelectClarification = (answer: string) => {
    setSelectedClarification(answer);
    setShowClarifyingModal(false);
    setStepIndex(2);

    setTimeout(() => {
      onComplete(answer);
    }, 1400);
  };

  const QuestionIcon = questionData?.icon || HelpCircle;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-xl p-4"
    >
      {/* Background ambient lighting */}
      <div className="absolute w-[500px] h-[500px] bg-teal-500/20 rounded-full blur-3xl pointer-events-none -top-20 -left-20" />
      <div className="absolute w-[500px] h-[500px] bg-indigo-500/20 rounded-full blur-3xl pointer-events-none -bottom-20 -right-20" />

      <div className="relative w-full max-w-xl bg-white rounded-3xl p-8 sm:p-10 shadow-2xl border border-slate-200 text-center overflow-hidden">
        {/* Top AI Indicator */}
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 rounded-2xl gradient-score flex items-center justify-center text-teal-300 shadow-xl shadow-indigo-900/30 ai-pulse">
            <Sparkles className="w-8 h-8 animate-spin-slow" />
          </div>
        </div>

        <h3 className="text-2xl font-heading font-bold text-slate-900 tracking-tight mb-2">
          BenefitMax AI Reasoning Engine
        </h3>
        <p className="text-xs text-slate-500 max-w-md mx-auto mb-8 line-clamp-2 italic">
          "{storyText}"
        </p>

        {/* Progressive Steps */}
        <div className="space-y-4 mb-8 text-left">
          {steps.map((step, idx) => {
            const IconComponent = step.icon;
            const isDone = idx < stepIndex;
            const isCurrent = idx === stepIndex;

            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.15 }}
                className={`p-4 rounded-2xl border transition-all duration-300 flex items-start gap-4 ${
                  isCurrent
                    ? "bg-slate-50 border-indigo-300 shadow-md ring-2 ring-indigo-500/20"
                    : isDone
                    ? "bg-emerald-50/50 border-emerald-200 opacity-90"
                    : "bg-slate-50/50 border-slate-200 opacity-40"
                }`}
              >
                <div
                  className={`p-2.5 rounded-xl border shrink-0 ${
                    isDone
                      ? "bg-emerald-500 text-white border-emerald-600"
                      : step.color
                  }`}
                >
                  {isDone ? (
                    <CheckCircle2 className="w-5 h-5 text-white" />
                  ) : (
                    <IconComponent
                      className={`w-5 h-5 ${isCurrent ? "animate-bounce" : ""}`}
                    />
                  )}
                </div>

                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold text-slate-900 text-sm">
                      {step.title}
                    </h4>
                    {isCurrent && (
                      <span className="text-[10px] uppercase font-bold text-indigo-700 bg-indigo-100 px-2 py-0.5 rounded-full tracking-wider animate-pulse">
                        In Progress
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {step.subtitle}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom Loading Progress Bar */}
        <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
          <motion.div
            className="h-full gradient-teal"
            initial={{ width: "15%" }}
            animate={{
              width:
                stepIndex === 0
                  ? "33%"
                  : stepIndex === 1
                  ? "66%"
                  : "100%",
            }}
            transition={{ duration: 0.8 }}
          />
        </div>
      </div>

      {/* Dynamic Clarifying Question Modal Overlay */}
      <AnimatePresence>
        {showClarifyingModal && questionData && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md"
          >
            <div className="w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-indigo-100 relative">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2.5 rounded-xl bg-teal-100 text-teal-800 border border-teal-200">
                  <QuestionIcon className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[10px] uppercase tracking-wider font-extrabold text-teal-800 bg-teal-50 px-2.5 py-0.5 rounded-full border border-teal-200">
                    Profile Clarification
                  </span>
                  <h4 className="text-lg font-heading font-bold text-slate-900 mt-1">
                    {questionData.title}
                  </h4>
                </div>
              </div>

              <p className="text-sm text-slate-600 mb-6 leading-relaxed">
                {questionData.subtitle}
              </p>

              <div className="space-y-3 mb-6">
                {questionData.options.map((opt, i) => (
                  <button
                    key={i}
                    onClick={() => handleSelectClarification(opt.value)}
                    className="w-full text-left p-4 rounded-2xl border border-slate-200 hover:border-teal-500 hover:bg-teal-50/50 transition-all flex items-center justify-between group"
                  >
                    <div>
                      <span className="font-semibold text-slate-900 text-sm block">
                        {opt.label}
                      </span>
                      <span className="text-xs text-slate-500">
                        {opt.subtext}
                      </span>
                    </div>
                    <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-teal-600 group-hover:translate-x-1 transition-all shrink-0" />
                  </button>
                ))}
              </div>

              <div className="text-center">
                <button
                  onClick={() =>
                    handleSelectClarification("Standard Profile Defaults")
                  }
                  className="text-xs text-slate-400 hover:text-slate-600 underline font-medium"
                >
                  Skip clarification & evaluate standard official rules
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
