"use client";

import { motion } from "framer-motion";
import { Search, Calendar, SlidersHorizontal } from "lucide-react";

export default function TutorFilter({
  searchQuery,
  setSearchQuery,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
}) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="mb-10 rounded-3xl border border-slate-200 dark:border-white/10 bg-white/80 dark:bg-slate-900/70 backdrop-blur-xl shadow-xl shadow-slate-900/5 dark:shadow-black/20 p-4 sm:p-5"
    >
      <div className="flex items-center gap-2 mb-4">
        <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-500/10 flex items-center justify-center">
          <SlidersHorizontal className="w-4 h-4 text-blue-600 dark:text-blue-400" />
        </div>
        <div>
          <h2 className="text-sm font-bold text-slate-800 dark:text-white">
            Find your tutor
          </h2>
          <p className="text-[11px] text-slate-400">
            Search by name or availability
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {/* Search Input */}
        <div className="relative group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search tutor by name..."
            className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-sm text-slate-800 dark:text-white placeholder:text-slate-400 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all"
          />
        </div>

        {/* Start Date */}
        <div className="relative group">
          <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-sm text-slate-700 dark:text-white outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all [color-scheme:light] dark:[color-scheme:dark]"
          />
        </div>

        {/* End Date */}
        <div className="relative group">
          <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-sm text-slate-700 dark:text-white outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all [color-scheme:light] dark:[color-scheme:dark]"
          />
        </div>
      </div>
    </motion.section>
  );
}