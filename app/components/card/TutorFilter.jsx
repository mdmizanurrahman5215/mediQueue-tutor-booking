"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useState, useEffect, useTransition } from "react";
import { Search, Calendar, Filter, RotateCcw } from "lucide-react";

export default function TutorFilters({ subjects = [] }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [subject, setSubject] = useState(searchParams.get("subject") || "All");
  const [fromDate, setFromDate] = useState(searchParams.get("fromDate") || "");
  const [toDate, setToDate] = useState(searchParams.get("toDate") || "");
  useEffect(() => {
    setSearch(searchParams.get("search") || "");
    setSubject(searchParams.get("subject") || "All");
    setFromDate(searchParams.get("fromDate") || "");
    setToDate(searchParams.get("toDate") || "");
  }, [searchParams]);

  const updateUrl = (
    updatedSearch,
    updatedSubject,
    updatedFromDate,
    updatedToDate,
  ) => {
    const params = new URLSearchParams();
    params.set("page", "1");

    if (updatedSearch.trim()) params.set("search", updatedSearch.trim());
    if (updatedSubject && updatedSubject !== "All")
      params.set("subject", updatedSubject);
    if (updatedFromDate) params.set("fromDate", updatedFromDate);
    if (updatedToDate) params.set("toDate", updatedToDate);

    startTransition(() => {
      router.push(`${pathname}?${params.toString()}`);
    });
  };

  useEffect(() => {
    const currentUrlSearch = searchParams.get("search") || "";

    if (search === currentUrlSearch) return;

    const timer = setTimeout(() => {
      updateUrl(search, subject, fromDate, toDate);
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  const applyFilters = (e) => {
    if (e) e.preventDefault();
    updateUrl(search, subject, fromDate, toDate);
  };

  const resetFilters = () => {
    setSearch("");
    setSubject("All");
    setFromDate("");
    setToDate("");

    startTransition(() => {
      router.push(pathname);
    });
  };

  return (
    <form
      onSubmit={applyFilters}
      className="p-6 rounded-3xl bg-white dark:bg-gray-950 border border-gray-200/80 dark:border-white/10 shadow-sm space-y-4"
    >
      <div className="flex items-center justify-between pb-2 border-b border-gray-100 dark:border-white/5">
        <div className="flex items-center gap-2 text-sm font-bold text-gray-900 dark:text-white">
          <Filter className="w-4 h-4 text-blue-600 dark:text-blue-400" />
          <span>Filter Tutors & Sessions</span>
        </div>
        <button
          type="button"
          onClick={resetFilters}
          className="text-xs text-gray-400 hover:text-rose-500 flex items-center gap-1 transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset All</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="space-y-1">
          <label className="text-xs font-semibold text-gray-500">
            Tutor / Institution (Live Search)
          </label>
          <div className="relative">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Type name or college..."
              className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50"
            />
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-xs font-semibold text-gray-500">Subject</label>
          <select
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="w-full py-2.5 px-3 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50"
          >
            <option value="All">All Subjects</option>
            {subjects.map((sub, idx) => (
              <option key={idx} value={sub}>
                {sub}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-1">
          <label className="text-xs font-semibold text-gray-500">
            From Date
          </label>
          <div className="relative">
            <input
              type="date"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
              className="w-full pl-9 pr-3 py-2 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50"
            />
            <Calendar className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-xs font-semibold text-gray-500">To Date</label>
          <div className="relative">
            <input
              type="date"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
              className="w-full pl-9 pr-3 py-2 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50"
            />
            <Calendar className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          </div>
        </div>
      </div>

      <div className="flex justify-end pt-2">
        <button
          type="submit"
          disabled={isPending}
          className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm rounded-xl transition-all shadow-sm flex items-center gap-2 disabled:opacity-50"
        >
          {isPending ? "Filtering..." : "Apply Filters"}
        </button>
      </div>
    </form>
  );
}
