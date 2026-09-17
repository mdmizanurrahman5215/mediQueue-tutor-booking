"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { User, Mail, Phone, BookOpen, Calendar, Loader2, AlertCircle } from "lucide-react";
import { createBooking } from "../lib/actions";
import { authClient } from "../lib/auth-client";

export default function BookingForm({ tutor, onSuccess }) {
  const [loading, setLoading] = useState(false);
  const { data: session, isPending } = authClient.useSession();
    const user = session?.user;

  // Auto-filled and generated fields
  const [formData, setFormData] = useState({
    studentName: "",
    phone: "",
    tutorId: tutor?._id || tutor?.id || "",
    tutorName: tutor?.tutorName || "",
    studentEmail: user?.email, // Logged-in user email
    bookStatus: "Pending", // Auto-generated
  });
  

    console.log({user});
    

  // Date Logic check
  const today = new Date().setHours(0, 0, 0, 0);
  const sessionStartDate = tutor?.sessionStartDate
    ? new Date(tutor.sessionStartDate).setHours(0, 0, 0, 0)
    : null;

  const isBeforeSessionDate = sessionStartDate && today < sessionStartDate;
  const isFullyBooked = tutor?.totalSlot <= 0;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };



const handleSubmit = async (e) => {
  e.preventDefault();

  if (isBeforeSessionDate) {
    toast.error("Booking is not available yet for this tutor!");
    return;
  }

  if (isFullyBooked) {
    toast.error("This session is fully booked. No slots available!");
    return;
  }
  if (!formData.studentName.trim() || !formData.phone.trim()) {
    toast.error("Please fill in all required fields.");
    return;
  }
 
  const payload = {

    studentName: formData.studentName,
    phone: formData.phone,
    studentEmail: user?.email,
    studentImage: user?.image || "",
    userId: user?.id || user?._id,

    
    tutorId: tutor?._id || tutor?.id,
    tutorName: tutor?.tutorName,
    tutorEmail: tutor?.createdByEmail || tutor?.tutorEmail,
    tutorImage: tutor?.image || "",
    subject: tutor?.subject,
    hourlyFee: tutor?.hourlyFee,
    teachingMode: tutor?.teachingMode || "Online",


    bookingDate: tutor?.sessionStartDate,
    preferredTimeSlot: tutor?.availableTimeSlot,
    totalHours: 1,
  };

  try {
    setLoading(true);


    const res = await createBooking(payload);

    if (!res.success) {
      toast.error(res.message);
      return;
    }

    toast.success(res.message || "Booking successfully completed!");
    if (onSuccess) onSuccess();
  } catch (err) {
    toast.error(err?.message || "Something went wrong!");
  } finally {
    setLoading(false);
  }
};

  return (
   <div className="space-y-4 text-slate-900 dark:text-gray-100">
      {/* Warning Message: Slots Unavailable */}
      {isFullyBooked && (
        <div className="p-4 rounded-2xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800/50 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 shrink-0 mt-0.5" />
          <p className="text-xs font-bold text-red-800 dark:text-red-300 leading-relaxed">
            No available slots left. This session is fully booked. You can’t join at the moment.
          </p>
        </div>
      )}

      {/* Warning Message: Session Date Restriction */}
      {!isFullyBooked && isBeforeSessionDate && (
        <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/50 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
          <p className="text-xs font-bold text-amber-800 dark:text-amber-300 leading-relaxed">
            Booking is not available yet for this tutor.
          </p>
        </div>
      )}

      {/* Tutor Auto-filled Summary Card */}
      <div className="p-4 bg-slate-100 dark:bg-gray-800/80 rounded-2xl border border-slate-200 dark:border-gray-700 space-y-2.5 text-xs">
        <div className="flex justify-between items-center">
          <span className="flex items-center gap-1.5 font-semibold text-slate-700 dark:text-gray-300">
            <User className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" /> Tutor Name:
          </span>
          <span className="font-bold text-slate-900 dark:text-white">{tutor?.tutorName}</span>
        </div>

        <div className="flex justify-between items-center">
          <span className="flex items-center gap-1.5 font-semibold text-slate-700 dark:text-gray-300">
            <BookOpen className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" /> Subject:
          </span>
          <span className="font-bold text-slate-900 dark:text-white">{tutor?.subject}</span>
        </div>

        <div className="flex justify-between items-center">
          <span className="flex items-center gap-1.5 font-semibold text-slate-700 dark:text-gray-300">
            <Calendar className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" /> Fee:
          </span>
          <span className="font-extrabold text-blue-700 dark:text-blue-400 text-sm">
            ৳{tutor?.hourlyFee} / hr
          </span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 pt-1">
        {/* Student Name Input */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-900 dark:text-gray-200 flex items-center gap-1.5">
            <User className="w-3.5 h-3.5 text-slate-600 dark:text-gray-400" /> Student Name
          </label>
          <input
            type="text"
            name="studentName"
            value={formData.studentName}
            onChange={handleChange}
            required
            placeholder="Enter full name"
            disabled={isFullyBooked || isBeforeSessionDate}
            className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-gray-800 border-2 border-slate-300 dark:border-gray-700 text-sm text-black dark:text-white placeholder-slate-400 dark:placeholder-gray-500 focus:outline-none focus:border-blue-600 dark:focus:border-blue-500 transition-all disabled:opacity-50"
          />
        </div>

        {/* Phone Input */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-900 dark:text-gray-200 flex items-center gap-1.5">
            <Phone className="w-3.5 h-3.5 text-slate-600 dark:text-gray-400" /> Phone
          </label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            placeholder="e.g. +880 1700 000000"
            disabled={isFullyBooked || isBeforeSessionDate}
            className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-gray-800 border-2 border-slate-300 dark:border-gray-700 text-sm text-black dark:text-white placeholder-slate-400 dark:placeholder-gray-500 focus:outline-none focus:border-blue-600 dark:focus:border-blue-500 transition-all disabled:opacity-50"
          />
        </div>

        {/* Auto-filled Student Email */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-900 dark:text-gray-200 flex items-center gap-1.5">
            <Mail className="w-3.5 h-3.5 text-slate-600 dark:text-gray-400" /> Student Email (Auto-filled)
          </label>
          <input
            type="email"
            value={formData.studentEmail}
            readOnly
            className="w-full px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-gray-800/50 border-2 border-slate-200 dark:border-gray-700 text-sm text-slate-800 dark:text-gray-300 font-semibold cursor-not-allowed"
          />
        </div>

        {/* Hidden Fields */}
        <input type="hidden" name="tutorId" value={formData.tutorId} />
        <input type="hidden" name="tutorName" value={formData.tutorName} />
        <input type="hidden" name="bookStatus" value={formData.bookStatus} />

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading || isFullyBooked || isBeforeSessionDate}
          className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 dark:disabled:bg-gray-800 disabled:text-slate-500 text-white rounded-xl font-bold text-sm transition-all shadow-md shadow-blue-500/20 active:scale-[0.99] flex items-center justify-center space-x-2 mt-4"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Processing...</span>
            </>
          ) : (
            <span>Confirm & Pay ৳{tutor?.hourlyFee}</span>
          )}
        </button>
      </form>
    </div>
  );
}