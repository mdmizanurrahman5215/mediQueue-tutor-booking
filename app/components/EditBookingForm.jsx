"use client";

import { useState, useEffect } from "react";
import {
  Calendar,
  Sparkles,
  MessageSquare,
  Monitor,
  CheckCircle2,
  Loader2,
  X,
  GraduationCap,
  User,
  Phone,
  Laptop
} from "lucide-react";

export default function EditBookingForm({ bookingData, onSave, onClose, isLoading }) {
  // ১. লোকাল স্টেট ম্যানেজমেন্ট
  const [formData, setFormData] = useState({
    studentName: "",
    phone: "",
    bookingDate: "",
    teachingMode: "Online",
    notes: "",
  });

  // bookingData আপডেট হলে স্টেট সিঙ্ক করা
  useEffect(() => {
    if (bookingData) {
      setFormData({
        studentName: bookingData?.studentName || "",
        phone: bookingData?.phone || "",
        bookingDate: bookingData?.bookingDate
          ? new Date(bookingData.bookingDate).toISOString().split("T")[0]
          : "",
        teachingMode: bookingData?.teachingMode || "Online",
        notes: bookingData?.notes || "",
      });
    }
  }, [bookingData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleModeSelect = (mode) => {
    setFormData((prev) => ({ ...prev, teachingMode: mode }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5 text-slate-800 dark:text-slate-200 bg-white dark:bg-slate-950 p-1 rounded-xl">
      
      {/* 🔒 Read-Only Hero Card: টিউটর ও ফিক্সড ইনফরমেশন */}
      <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 space-y-3">
        <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-2">
          <span className="text-[11px] font-bold uppercase tracking-wider text-cyan-700 dark:text-cyan-400 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" /> Session Context
          </span>
          <span className="text-[10px] font-medium text-slate-600 dark:text-slate-400 bg-slate-200/70 dark:bg-slate-800 px-2 py-0.5 rounded">
            Fixed Info
          </span>
        </div>

        <div className="flex items-center gap-3">
          <img
            src={bookingData?.tutorImage || "https://via.placeholder.com/150"}
            alt={bookingData?.tutorName || "Tutor"}
            className="w-11 h-11 rounded-lg object-cover ring-1 ring-slate-200 dark:ring-slate-700 shadow-sm"
          />
          <div className="flex-1 min-w-0">
            <h4 className="font-semibold text-sm text-slate-900 dark:text-slate-100 truncate">
              {bookingData?.tutorName || "N/A"}
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 flex items-center gap-1 mt-0.5">
              <GraduationCap className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
              {bookingData?.subject || "Subject"}
            </p>
          </div>
          <div className="text-right">
            <span className="text-[11px] text-slate-500 dark:text-slate-400 block">Time Slot</span>
            <span className="text-xs font-semibold text-indigo-700 dark:text-indigo-300 bg-indigo-50 dark:bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-200 dark:border-indigo-500/20 inline-block mt-0.5">
              {bookingData?.preferredTimeSlot || "N/A"}
            </span>
          </div>
        </div>
      </div>

      {/* ✏️ Editable Section */}
      <div className="space-y-4">
        
        {/* Student Info: Name & Phone */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          {/* Student Name */}
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
              Student Name <span className="text-rose-500 dark:text-rose-400">*</span>
            </label>
            <input
              type="text"
              name="studentName"
              value={formData.studentName}
              onChange={handleChange}
              required
              placeholder="Enter your name"
              className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 rounded-lg text-xs text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 dark:focus:ring-cyan-500/30 focus:border-cyan-600 dark:focus:border-cyan-500 transition-all shadow-sm"
            />
          </div>

          {/* Contact Phone */}
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
              Phone Number <span className="text-rose-500 dark:text-rose-400">*</span>
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              placeholder="+8801XXXXXXXXX"
              className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 rounded-lg text-xs text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 dark:focus:ring-cyan-500/30 focus:border-cyan-600 dark:focus:border-cyan-500 transition-all shadow-sm"
            />
          </div>
        </div>

        {/* Reschedule Date */}
        <div className="space-y-1">
          <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
            Booking Date <span className="text-rose-500 dark:text-rose-400">*</span>
          </label>
          <input
            type="date"
            name="bookingDate"
            value={formData.bookingDate}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 rounded-lg text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 dark:focus:ring-cyan-500/30 focus:border-cyan-600 dark:focus:border-cyan-500 transition-all shadow-sm"
          />
        </div>

        {/* Teaching Mode Toggle */}
        <div className="space-y-1">
          <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
            <Monitor className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
            Teaching Mode
          </label>
          <div className="grid grid-cols-2 gap-3 pt-0.5">
            <button
              type="button"
              onClick={() => handleModeSelect("Online")}
              className={`p-2.5 rounded-lg border text-left transition-all flex items-center justify-between shadow-sm ${
                formData.teachingMode === "Online"
                  ? "bg-cyan-50 dark:bg-cyan-500/10 border-cyan-500 text-cyan-800 dark:text-cyan-300 font-semibold ring-1 ring-cyan-500"
                  : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:border-slate-700"
              }`}
            >
              <span className="text-xs flex items-center gap-1.5">
                <Laptop className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" /> Online Class
              </span>
              {formData.teachingMode === "Online" && (
                <CheckCircle2 className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
              )}
            </button>

            <button
              type="button"
              onClick={() => handleModeSelect("Offline")}
              className={`p-2.5 rounded-lg border text-left transition-all flex items-center justify-between shadow-sm ${
                formData.teachingMode === "Offline"
                  ? "bg-cyan-50 dark:bg-cyan-500/10 border-cyan-500 text-cyan-800 dark:text-cyan-300 font-semibold ring-1 ring-cyan-500"
                  : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:border-slate-700"
              }`}
            >
              <span className="text-xs flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" /> In-Person
              </span>
              {formData.teachingMode === "Offline" && (
                <CheckCircle2 className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
              )}
            </button>
          </div>
        </div>

        {/* Special Notes / Topics */}
        <div className="space-y-1">
          <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
            <MessageSquare className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
            Notes / Topics to Cover
          </label>
          <textarea
            name="notes"
            rows="3"
            value={formData.notes}
            onChange={handleChange}
            placeholder="Mention specific chapters or topics you want to cover..."
            className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 rounded-lg text-xs text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 dark:focus:ring-cyan-500/30 focus:border-cyan-600 dark:focus:border-cyan-500 transition-all resize-none shadow-sm"
          />
        </div>
      </div>

      {/* Action Buttons */}
      <div className="pt-3 flex items-center justify-end gap-2.5 border-t border-slate-100 dark:border-slate-800">
        <button
          type="button"
          onClick={onClose}
          disabled={isLoading}
          className="px-4 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg text-xs font-medium transition-colors disabled:opacity-50 flex items-center gap-1 border border-slate-200 dark:border-slate-700"
        >
          <X className="w-3.5 h-3.5" /> Cancel
        </button>

        <button
          type="submit"
          disabled={isLoading}
          className="px-4 py-2 bg-cyan-600 hover:bg-cyan-700 dark:hover:bg-cyan-500 text-white rounded-lg text-xs font-semibold shadow-sm shadow-cyan-600/20 transition-all disabled:opacity-50 flex items-center gap-1.5"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <CheckCircle2 className="w-3.5 h-3.5" />
              Save Changes
            </>
          )}
        </button>
      </div>
    </form>
  );
}