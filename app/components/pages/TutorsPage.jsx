"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { CheckCircle2 } from "lucide-react";



import TutorFilter from "@/app/components/card/TutorFilter";
import TutorEmptyState from "@/app/components/card/TutorEmptyState";
import TutorCard from "@/app/components/card/TutorCard";
import TutorHero from "@/app/components/card/TutorHero";


export default function TutorsPage({ tutors = [] }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // Filter Logic
  const filteredTutors = tutors.filter((tutor) => {
    const matchesName = tutor?.tutorName
      ?.toLowerCase()
      .includes(searchQuery.toLowerCase());

    const sessionStart = tutor?.sessionStartDate
      ? new Date(tutor.sessionStartDate)
      : null;

    const startFilter = startDate ? new Date(startDate) : null;
    const endFilter = endDate ? new Date(endDate) : null;

    let matchesDate = true;

    if (sessionStart && !Number.isNaN(sessionStart.getTime())) {
      if (startFilter && !Number.isNaN(startFilter.getTime())) {
        matchesDate = matchesDate && sessionStart >= startFilter;
      }
      if (endFilter && !Number.isNaN(endFilter.getTime())) {
        matchesDate = matchesDate && sessionStart <= endFilter;
      }
    }

    return matchesName && matchesDate;
  });

  return (
    <main className="relative min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 overflow-hidden transition-colors duration-300">
      {/* Background Orbs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 left-1/4 w-[500px] h-[500px] rounded-full bg-blue-500/10 dark:bg-blue-500/10 blur-[120px]" />
        <div className="absolute top-1/2 -right-40 w-[450px] h-[450px] rounded-full bg-indigo-500/10 blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-purple-500/5 blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* 1. Hero Section */}
        <TutorHero totalTutors={tutors.length} />

        {/* 2. Filter Inputs */}
        <TutorFilter
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          startDate={startDate}
          setStartDate={setStartDate}
          endDate={endDate}
          setEndDate={setEndDate}
        />

        {/* Results Info */}
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              Available Tutors
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              {filteredTutors.length} tutor
              {filteredTutors.length !== 1 ? "s" : ""} found
            </p>
          </div>

          <div className="hidden sm:flex items-center gap-2 text-xs font-medium text-slate-400">
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            Verified profiles
          </div>
        </div>

        {/* 3. Empty State OR Tutor Cards Grid */}
        {!filteredTutors || filteredTutors.length === 0 ? (
          <TutorEmptyState />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            <AnimatePresence>
              {filteredTutors.map((tutor, index) => (
                <TutorCard
                  key={tutor._id || tutor.id}
                  tutor={tutor}
                  index={index}
                />
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </main>
  );
}