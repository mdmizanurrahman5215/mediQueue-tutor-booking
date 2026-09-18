"use client";

import { motion } from "framer-motion";
import {
  Calendar,
  Clock,
  CheckCircle2,
  Clock3,
  XCircle,
  Edit3,
  Trash2,
  Phone,
  User,
  Sparkles,
} from "lucide-react";

export default function BookingCard({ item, onDeleteClick, onEditClick }) {
  const isCancelled = item?.status === "Cancelled";
  const isConfirmed = item?.status === "Confirmed";

  const getStatusConfig = () => {
    if (isCancelled) {
      return {
        badgeBg: "bg-rose-500/10 text-rose-400 border-rose-500/20",
        glowColor: "from-rose-500/20 via-rose-500/5 to-transparent",
        accentBg: "bg-rose-500",
        icon: <XCircle className="w-3 h-3 text-rose-400" />,
        label: "Cancelled",
      };
    }
    if (isConfirmed) {
      return {
        badgeBg: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
        glowColor: "from-emerald-500/20 via-teal-500/5 to-transparent",
        accentBg: "bg-emerald-400 shadow-[0_0_10px_#34d399]",
        icon: <CheckCircle2 className="w-3 h-3 text-emerald-400" />,
        label: "Confirmed",
      };
    }
    return {
      badgeBg: "bg-amber-500/10 text-amber-400 border-amber-500/20",
      glowColor: "from-amber-500/20 via-orange-500/5 to-transparent",
      accentBg: "bg-amber-400 shadow-[0_0_10px_#fbbf24]",
      icon: <Clock3 className="w-3 h-3 text-amber-400 animate-spin-slow" />,
      label: "Pending",
    };
  };

  const config = getStatusConfig();

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: isCancelled ? 0 : -5 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className={`relative group rounded-[22px] transition-all duration-500 ${
        isCancelled ? "opacity-60 grayscale-[40%]" : ""
      }`}
    >
      {!isCancelled && (
        <div
          className={`absolute -inset-px rounded-[23px] bg-gradient-to-b ${config.glowColor} opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm pointer-events-none`}
        />
      )}

      {/* Main Glass Body */}
      <div className="relative rounded-[22px] bg-slate-900/90 dark:bg-slate-950/80 backdrop-blur-xl border border-slate-800/80 group-hover:border-slate-700/80 p-4 shadow-xl shadow-black/40 transition-all duration-300 overflow-hidden">
        {/* Header */}
        <div className="flex items-center gap-3 pb-3 border-b border-slate-800/60">
          <div className="relative shrink-0">
            <img
              src={item?.tutorImage || "https://via.placeholder.com/150"}
              alt={item?.tutorName || "Tutor"}
              className="w-10 h-10 rounded-full object-cover ring-1 ring-slate-700/60 shadow-inner"
            />
            <span
              className={`absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border-2 border-slate-900 ${config.accentBg}`}
            />
          </div>

          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-slate-100 text-xs tracking-wide truncate group-hover:text-cyan-400 transition-colors">
              {item?.tutorName || "Tutor Name"}
            </h3>
            <div className="flex items-center gap-1 mt-0.5">
              <Sparkles className="w-2.5 h-2.5 text-cyan-400 shrink-0" />
              <span className="text-[11px] font-medium text-slate-400 truncate">
                {item?.subject || "Subject"}
              </span>
            </div>
          </div>

          <span className="text-[9px] font-bold tracking-widest uppercase px-2.5 py-1 rounded-full bg-slate-800/80 text-slate-400 border border-slate-700/50 shrink-0">
            {item?.teachingMode || "Online"}
          </span>
        </div>

        {/* Schedule & Time */}
        <div className="py-3 space-y-2 text-[11px]">
          <div className="flex items-center justify-between text-slate-300">
            <span className="flex items-center gap-1.5 text-slate-400">
              <Calendar className="w-3 h-3 text-cyan-400" /> Date:
            </span>
            <span className="font-semibold text-slate-200">
              {item?.bookingDate
                ? new Date(item?.bookingDate).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })
                : "N/A"}
            </span>
          </div>

          <div className="flex items-center justify-between text-slate-300">
            <span className="flex items-center gap-1.5 text-slate-400">
              <Clock className="w-3 h-3 text-indigo-400" /> Time:
            </span>
            <span className="font-semibold text-slate-200 truncate max-w-[130px]">
              {item?.preferredTimeSlot || "N/A"}
            </span>
          </div>
        </div>

        {/* Minimal Student Info */}
        <div className="px-3 py-2 rounded-xl bg-slate-900/60 border border-slate-800/40 space-y-1 text-[10px]">
          <div className="flex justify-between">
            <span className="text-slate-500 flex items-center gap-1">
              <User className="w-2.5 h-2.5" /> Student
            </span>
            <span className="font-medium text-slate-300 truncate max-w-[110px]">
              {item?.studentName || "N/A"}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-slate-500 flex items-center gap-1">
              <Phone className="w-2.5 h-2.5" /> Phone
            </span>
            <span className="font-medium text-slate-400">
              {item?.phone || "N/A"}
            </span>
          </div>
        </div>

        {/* Footer: Fee & Status */}
        <div className="pt-3 mt-1 flex items-center justify-between">
          <div>
            <span className="text-[8px] uppercase tracking-wider font-extrabold text-slate-500 block">
              Total Fee
            </span>
            <span className="text-base font-black tracking-tight text-white">
              ৳{(item?.hourlyFee || 0) * (item?.totalHours || 1)}
            </span>
          </div>

          <span
            className={`px-3 py-1 rounded-full text-[10px] font-bold border flex items-center gap-1.5 backdrop-blur-md ${config.badgeBg}`}
          >
            {config.icon}
            {config.label}
          </span>
        </div>

        {/* Actions */}
        {!isCancelled && (
          <div className="pt-3 mt-2 border-t border-slate-800/60 flex gap-2">
            <motion.button
              whileTap={{ scale: 0.96 }}
              onClick={() => onEditClick(item)}
              className="flex-1 py-1.5 px-2 bg-slate-800/80 hover:bg-slate-700/80 text-slate-200 rounded-xl text-[11px] font-semibold flex items-center justify-center gap-1.5 transition-all border border-slate-700/40"
            >
              <Edit3 className="w-3 h-3 text-cyan-400" />
              Edit
            </motion.button>

            <motion.button
              whileTap={{ scale: 0.96 }}
              onClick={() => onDeleteClick(item?._id, item?.tutorId)}
              className="py-1.5 px-3 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/20 rounded-xl text-[11px] font-semibold flex items-center justify-center gap-1.5 transition-all"
            >
              <Trash2 className="w-3 h-3" />
              Cancel
            </motion.button>
          </div>
        )}
      </div>
    </motion.div>
  );
}