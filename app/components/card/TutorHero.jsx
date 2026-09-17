"use client";

import { motion } from "framer-motion";
import { Sparkles, Users } from "lucide-react";

export default function TutorHero({ totalTutors = 0 }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="text-center max-w-3xl mx-auto mb-10"
    >
      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 dark:bg-blue-500/10 border border-blue-100 dark:border-blue-500/20 text-blue-600 dark:text-blue-400 text-xs font-bold tracking-wide mb-5">
        <Sparkles className="w-3.5 h-3.5" />
        Trusted Tutors
      </div>

      <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 dark:text-white leading-tight">
        Learn From
        <span className="ml-2 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 dark:from-blue-400 dark:via-indigo-400 dark:to-purple-400 bg-clip-text text-transparent">
          Expert Tutors
        </span>
      </h1>

      <p className="mt-5 text-sm sm:text-base leading-7 text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
        Find experienced tutors, explore their availability, and book personalized learning sessions that fit your schedule.
      </p>

      <div className="flex justify-center mt-7">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/80 dark:bg-white/5 border border-slate-200 dark:border-white/10 shadow-sm">
          <Users className="w-4 h-4 text-blue-500" />
          <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">
            {totalTutors}
          </span>
          <span className="text-sm text-slate-400">Tutors Available</span>
        </div>
      </div>
    </motion.section>
  );
}