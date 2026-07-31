"use client";

import { useState } from "react";
import { UserProfileSummary } from "@/lib/types";
import { User, Sparkles, CheckCircle2 } from "lucide-react";

interface ProfileTabProps {
  profile: UserProfileSummary;
  onUpdateProfile: (updated: UserProfileSummary) => void;
  lang?: "en" | "ml";
}

export function ProfileTab({
  profile,
  onUpdateProfile,
  lang = "en",
}: ProfileTabProps) {
  const [formData, setFormData] = useState<UserProfileSummary>(profile);
  const [savedMessage, setSavedMessage] = useState<boolean>(false);

  const handleChange = (field: keyof UserProfileSummary, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateProfile(formData);
    setSavedMessage(true);
    setTimeout(() => setSavedMessage(false), 3000);
  };

  return (
    <div className="max-w-4xl mx-auto py-6 space-y-6">
      {/* Top Banner */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-teal-50 text-teal-800 text-xs font-extrabold mb-2 border border-teal-200">
            <User className="w-3.5 h-3.5 text-teal-600" />
            <span>Family Profile Parameters</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-heading font-extrabold text-slate-900 tracking-tight">
            User Demographics & Criteria
          </h2>
          <p className="text-xs text-slate-500 mt-1 font-medium">
            Update your family profile attributes to recalculate benefit potential scores.
          </p>
        </div>

        {savedMessage && (
          <div className="bg-emerald-50 border border-emerald-300 text-emerald-800 px-4 py-2 rounded-2xl text-xs font-bold flex items-center space-x-1.5 animate-bounce shadow-sm">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Profile Updated & Score Recalculated!</span>
          </div>
        )}
      </div>

      {/* Form Card */}
      <form
        onSubmit={handleSubmit}
        className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* State */}
          <div>
            <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-500 mb-2">
              State
            </label>
            <input
              type="text"
              value={formData.state}
              onChange={(e) => handleChange("state", e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-3.5 text-sm text-slate-900 font-semibold focus:bg-white focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10 outline-none transition-all"
              required
            />
          </div>

          {/* District */}
          <div>
            <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-500 mb-2">
              District
            </label>
            <input
              type="text"
              value={formData.district || "Thiruvananthapuram"}
              onChange={(e) => handleChange("district", e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-3.5 text-sm text-slate-900 font-semibold focus:bg-white focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10 outline-none transition-all"
            />
          </div>

          {/* Annual Household Income */}
          <div>
            <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-500 mb-2">
              Annual Household Income (₹)
            </label>
            <input
              type="number"
              value={formData.annualIncomeRupees || 0}
              onChange={(e) =>
                handleChange("annualIncomeRupees", Number(e.target.value))
              }
              className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-3.5 text-sm text-slate-900 font-semibold focus:bg-white focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10 outline-none transition-all"
            />
          </div>

          {/* Ration Card Type */}
          <div>
            <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-500 mb-2">
              Ration Card Category
            </label>
            <select
              value={
                formData.rationCardType ||
                "Priority Household (PHH / Pink Card)"
              }
              onChange={(e) => handleChange("rationCardType", e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-3.5 text-sm text-slate-900 font-semibold focus:bg-white focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10 outline-none transition-all"
            >
              <option value="Priority Household (PHH / Pink Card)">
                Pink / Priority Household (PHH)
              </option>
              <option value="Antyodaya Anna Yojana (AAY / Yellow Card)">
                Yellow / Antyodaya (AAY)
              </option>
              <option value="Non-Priority Subsidy (Blue Card)">
                Blue / Non-Priority Subsidy
              </option>
              <option value="Non-Priority Non-Subsidy (White Card)">
                White / Non-Priority
              </option>
            </select>
          </div>

          {/* Children in school */}
          <div>
            <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-500 mb-2">
              Children in School
            </label>
            <input
              type="number"
              value={formData.childrenInSchool || 0}
              onChange={(e) =>
                handleChange("childrenInSchool", Number(e.target.value))
              }
              className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-3.5 text-sm text-slate-900 font-semibold focus:bg-white focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10 outline-none transition-all"
            />
          </div>

          {/* Occupation */}
          <div>
            <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-500 mb-2">
              Occupation
            </label>
            <input
              type="text"
              value={formData.occupation || "Self-Employed / Home Tailor"}
              onChange={(e) => handleChange("occupation", e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-3.5 text-sm text-slate-900 font-semibold focus:bg-white focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10 outline-none transition-all"
            />
          </div>
        </div>

        {/* Submit */}
        <div className="pt-4 border-t border-slate-100 flex items-center justify-end">
          <button
            type="submit"
            className="px-8 py-4 rounded-2xl gradient-score text-white font-heading font-extrabold text-xs shadow-lg hover:scale-105 transition-all flex items-center space-x-2 cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-teal-300" />
            <span>Recalculate Benefit Potential</span>
          </button>
        </div>
      </form>
    </div>
  );
}
