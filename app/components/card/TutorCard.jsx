"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Clock, MapPin, Calendar, GraduationCap, ArrowRight, CheckCircle2 } from "lucide-react";
import { formatDate } from "@/app/utils/helpers";

export default function TutorCard({ tutor, index }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      whileHover={{ y: -6 }}
      className="group overflow-hidden rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 shadow-lg shadow-slate-900/5 dark:shadow-black/20 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-300"
    >
      {/* Tutor Image Section */}
      <div className="relative h-56 w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
        <Image
          src={tutor?.image || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500"}
          alt={tutor?.tutorName || "Tutor"}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

        <span className="absolute top-3 right-3 px-3 py-1.5 rounded-full bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border border-white/20 text-[10px] font-bold text-blue-600 dark:text-blue-400 shadow-sm">
          {tutor?.teachingMode || "Online"}
        </span>

        <div className="absolute bottom-3 left-4 flex items-baseline gap-1">
          <span className="text-xl font-black text-white">৳{tutor?.hourlyFee}</span>
          <span className="text-[10px] text-white/70">/ hour</span>
        </div>
      </div>

      {/* Details Section */}
      <div className="p-5">
        <div className="mb-4">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            {tutor?.tutorName}
          </h3>
          <p className="text-xs font-semibold text-blue-600 dark:text-blue-400 mt-1">
            {tutor?.subject}
          </p>
        </div>

        <div className="flex items-center gap-2 p-3 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5 mb-4">
          <GraduationCap className="w-4 h-4 text-blue-500 shrink-0" />
          <span className="text-xs text-slate-500 dark:text-slate-400 truncate">
            {tutor?.institution} • {tutor?.experience}
          </span>
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-2.5">
            <Clock className="w-4 h-4 text-slate-400 shrink-0" />
            <span className="text-xs text-slate-500 dark:text-slate-400 truncate">
              {tutor?.availableDays} ({tutor?.availableTimeSlot})
            </span>
          </div>

          <div className="flex items-center gap-2.5">
            <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
            <span className="text-xs text-slate-500 dark:text-slate-400 truncate">
              {tutor?.location}
            </span>
          </div>

          <div className="flex items-center gap-2.5">
            <Calendar className="w-4 h-4 text-slate-400 shrink-0" />
            <span className="text-xs text-slate-500 dark:text-slate-400">
              Starts{" "}
              <strong className="text-slate-700 dark:text-slate-200">
                {formatDate(tutor?.sessionStartDate)}
              </strong>
            </span>
          </div>
        </div>

        <div className="h-px bg-slate-100 dark:bg-white/10 my-5" />

        <div className="flex items-center justify-between mb-4">
          <span className="text-xs font-medium text-slate-400">Available slots</span>
          {tutor?.totalSlot > 0 ? (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-100 dark:border-emerald-500/20 text-[10px] font-bold text-emerald-600 dark:text-emerald-400">
              <CheckCircle2 className="w-3 h-3" />
              {tutor?.totalSlot} Slots
            </span>
          ) : (
            <span className="px-2.5 py-1 rounded-full bg-red-50 dark:bg-red-500/10 text-[10px] font-bold text-red-500">
              Fully Booked
            </span>
          )}
        </div>

        <Link
          href={`/tutors/${tutor?._id}`}
          className="group/btn w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-sm font-bold shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30 transition-all"
        >
          <span>View & Book</span>
          <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
        </Link>
      </div>
    </motion.article>
  );
}