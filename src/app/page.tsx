"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  FileCheck2,
  CheckCircle2,
  Landmark,
} from "lucide-react";
import { EXAMPLE_PROMPTS } from "@/lib/mockData";
import { LoadingOverlay } from "@/components/LoadingOverlay";

export default function Home() {
  const router = useRouter();
  const [story, setStory] = useState(
    "I am a 21-year-old male B.Tech student from Kerala with an annual income of ₹2.5 lakh."
  );
  const [isLoading, setIsLoading] = useState(false);

  const handleChipClick = (text: string) => {
    setStory(text);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!story.trim()) return;
    setIsLoading(true);
  };

  const handleLoadingComplete = (clarifyingAnswer?: string) => {
    if (typeof window !== "undefined") {
      sessionStorage.setItem("userStory", story);
      if (clarifyingAnswer) {
        sessionStorage.setItem("clarification", clarifyingAnswer);
      }
    }
    // Navigate with URL query string to guarantee story propagation
    router.push(`/report?story=${encodeURIComponent(story)}`);
  };

  return (
    <div className="relative min-h-screen">
      {/* Background Decorative Blur Spheres */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-10 left-1/4 w-[450px] h-[450px] bg-teal-300/30 rounded-full blur-[120px]" />
        <div className="absolute top-20 right-1/4 w-[500px] h-[500px] bg-indigo-300/30 rounded-full blur-[130px]" />
      </div>

      {/* Hero Section */}
      <section className="pt-12 sm:pt-20 pb-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-center">
        {/* Badge Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-100/80 border border-indigo-200 text-indigo-900 text-xs sm:text-sm font-semibold mb-6 shadow-sm"
        >
          <Sparkles className="w-4 h-4 text-teal-600 animate-pulse" />
          <span>Scheme എവിടെ? • Verified Government Benefit Reasoning Engine</span>
        </motion.div>

        {/* Main Title */}
        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-4xl sm:text-6xl font-heading font-extrabold text-slate-900 tracking-tight leading-[1.15] mb-6"
        >
          Discover Verified Government Schemes for Your Family
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-lg sm:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed mb-10"
        >
          Describe your situation in your own words. Scheme എവിടെ? parses 140+ official Government of India & Kerala State gazettes to return verified schemes for your exact profile.
        </motion.p>

        {/* Main Form Box */}
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          onSubmit={handleSubmit}
          className="w-full bg-white rounded-3xl p-4 sm:p-6 shadow-2xl border border-slate-200/90 text-left relative"
        >
          <div className="relative">
            <label
              htmlFor="story-input"
              className="block text-xs uppercase font-extrabold tracking-wider text-slate-500 mb-2"
            >
              Describe your situation in your own words
            </label>
            <textarea
              id="story-input"
              value={story}
              onChange={(e) => setStory(e.target.value)}
              rows={4}
              placeholder="e.g. I am a 21-year-old male B.Tech student from Kerala with an annual income of ₹2.5 lakh."
              className="w-full text-base sm:text-lg text-slate-900 placeholder:text-slate-400 bg-slate-50/80 rounded-2xl p-4 sm:p-5 border border-slate-200 focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all resize-none font-sans leading-relaxed"
            />

            <div className="flex items-center justify-between mt-2 px-1 text-xs text-slate-400">
              <span>Supports natural English & Malayalam descriptions for any profile</span>
              <span>{story.length} / 500 chars</span>
            </div>
          </div>

          {/* Example Chips */}
          <div className="mt-6 pt-4 border-t border-slate-100">
            <span className="text-xs font-semibold text-slate-500 block mb-3">
              Click any example story below to test dynamic matching:
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {EXAMPLE_PROMPTS.map((prompt, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleChipClick(prompt.prompt || prompt.text)}
                  className={`text-left p-3 rounded-xl border text-xs transition-all flex items-start justify-between group ${
                    story === (prompt.prompt || prompt.text)
                      ? "bg-indigo-50/90 border-indigo-300 ring-2 ring-indigo-500/20 text-indigo-950 font-medium"
                      : "bg-slate-50/70 border-slate-200/80 hover:bg-slate-100 hover:border-slate-300 text-slate-700"
                  }`}
                >
                  <div className="pr-2">
                    <span className="font-bold text-slate-900 block text-xs">
                      {prompt.title || prompt.label}
                    </span>
                    <span className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">
                      "{prompt.prompt || prompt.text}"
                    </span>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white border border-slate-200 text-slate-600 shrink-0">
                    {prompt.badge || prompt.tag}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Primary CTA Submit */}
          <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-100">
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Official Government Gazettes • 100% Verifiable Data</span>
            </div>

            <button
              type="submit"
              disabled={!story.trim()}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl gradient-score text-white font-heading font-bold text-base shadow-xl shadow-indigo-950/20 hover:shadow-indigo-950/30 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3 disabled:opacity-50 disabled:pointer-events-none group"
            >
              <span>Find My Benefits</span>
              <ArrowRight className="w-5 h-5 text-teal-300 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </motion.form>
      </section>

      {/* Feature Pillars / Trust Section */}
      <section className="py-16 bg-white border-y border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <h2 className="text-3xl font-heading font-bold text-slate-900 tracking-tight">
              Scheme എവിടെ? Verification Protocol
            </h2>
            <p className="text-slate-600 text-base mt-2">
              Every scheme recommendation is cross-referenced with statutory rules from official portals before being recommended.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-3xl bg-slate-50 border border-slate-200/80 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 rounded-2xl bg-teal-100 border border-teal-200 flex items-center justify-center text-teal-700 mb-6">
                <Landmark className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-heading font-bold text-slate-900 mb-3">
                100% Official Source Data
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Indexed directly from Kerala Social Justice, e-Grantz, Sevana, PM-KISAN, NSP, and Civil Supplies official databases.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-slate-50 border border-slate-200/80 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 rounded-2xl bg-indigo-100 border border-indigo-200 flex items-center justify-center text-indigo-700 mb-6">
                <FileCheck2 className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-heading font-bold text-slate-900 mb-3">
                Clause-Level Citations
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Every recommended scheme cites exact rule numbers and statutory government orders so officials cannot arbitrarily reject applications.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-slate-50 border border-slate-200/80 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 border border-emerald-200 flex items-center justify-center text-emerald-700 mb-6">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-heading font-bold text-slate-900 mb-3">
                Dynamic Profile Matching
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Evaluates every criteria field (Age, Income, Gender, Course, Occupation) dynamically for any citizen profile.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Loading Overlay Integration */}
      <AnimatePresence>
        {isLoading && (
          <LoadingOverlay
            storyText={story}
            onComplete={handleLoadingComplete}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
