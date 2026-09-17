"use client";

import { motion } from "framer-motion";
import { BookOpen } from "lucide-react";

export default function TutorEmptyState() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="rounded-3xl border border-slate-200 dark:border-white/10 bg-white/80 dark:bg-slate-900/70 backdrop-blur-xl py-24 text-center"
    >
      <div className="w-16 h-16 mx-auto mb-5 rounded-2xl bg-blue-50 dark:bg-blue-500/10 flex items-center justify-center">
        <BookOpen className="w-7 h-7 text-blue-500" />
      </div>
      <h3 className="text-xl font-bold text-slate-800 dark:text-white">
        No Tutors Found
      </h3>
      <p className="text-sm text-slate-400 mt-2">
        Try searching with a different tutor name or date range.
      </p>
    </motion.div>
  );
}