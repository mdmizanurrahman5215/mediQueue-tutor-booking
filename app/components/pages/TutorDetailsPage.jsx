"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Calendar,
  Clock,
  MapPin,
  Award,
  GraduationCap,
  ShieldCheck,
  Loader2,
} from "lucide-react";

import { fetchTutorDetailsById } from "@/app/lib/actions";
import Modal from "../modals/Modal";
import BookingForm from "../BookingForm";
// import Modal from "@/components/Modal";
// import BookingForm from "@/components/BookingForm";

export default function TutorDetailsPage({ id }) {
  const [tutorData, setTutorData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const loadTutorDetails = async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await fetchTutorDetailsById(id);

      if (!result?.success) {
        throw new Error(result?.message || "Failed to load tutor profile.");
      }

      setTutorData(result?.data);
    } catch (error) {
      console.error("Tutor details error:", error);
      setError(error?.message || "Failed to fetch tutor details.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) loadTutorDetails();
  }, [id]);

  const handleBookingSuccess = () => {
    setIsModalOpen(false);
    loadTutorDetails(); // রিফ্রেশ দিলে Total Slot কমার আপডেট দেখতে পাবে
  };

  // Date Logic for disabling the primary button
  const today = new Date().setHours(0, 0, 0, 0);
  const sessionStartDate = tutorData?.sessionStartDate
    ? new Date(tutorData.sessionStartDate).setHours(0, 0, 0, 0)
    : null;

  const isBeforeSessionDate = sessionStartDate && today < sessionStartDate;
  const isFullyBooked = tutorData?.totalSlot <= 0;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950">
        <div className="flex items-center space-x-2 text-blue-600">
          <Loader2 className="w-8 h-8 animate-spin" />
          <span className="text-lg font-semibold">Loading Tutor Profile...</span>
        </div>
      </div>
    );
  }

  if (error || !tutorData) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-950 text-center px-4">
        <h2 className="text-2xl font-bold text-red-600 mb-2">Error Loading Profile</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">{error || "Tutor not found"}</p>
        <Link
          href="/tutors"
          className="px-4 py-2 bg-blue-600 text-white rounded-xl text-sm font-semibold hover:bg-blue-700 transition"
        >
          Back to All Tutors
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 py-10 transition-colors">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* Back Link */}
        <Link
          href="/tutors"
          className="inline-flex items-center space-x-2 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Tutors</span>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Details */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white dark:bg-gray-900 rounded-3xl p-6 sm:p-8 border border-gray-100 dark:border-gray-800 shadow-sm space-y-6">
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
                <img
                  src={tutorData.image}
                  alt={tutorData.tutorName || "Tutor"}
                  className="w-32 h-32 rounded-2xl object-cover shadow-sm border border-gray-200 dark:border-gray-700"
                />

                <div className="space-y-2 text-center sm:text-left flex-1">
                  <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                    <span className="bg-blue-100 text-blue-700 dark:bg-blue-950/60 dark:text-blue-400 text-xs font-bold px-3 py-1 rounded-full">
                      {tutorData.teachingMode}
                    </span>
                    <span className="bg-green-100 text-green-700 dark:bg-green-950/60 dark:text-green-400 text-xs font-bold px-3 py-1 rounded-full">
                      Verified Tutor
                    </span>
                  </div>

                  <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
                    {tutorData.tutorName}
                  </h1>

                  <p className="text-base font-semibold text-blue-600 dark:text-blue-400">
                    {tutorData.subject}
                  </p>

                  <p className="text-sm text-gray-600 dark:text-gray-400 flex items-center justify-center sm:justify-start gap-1.5">
                    <GraduationCap className="w-4 h-4 text-gray-400" />
                    <span>{tutorData.institution}</span>
                  </p>
                </div>
              </div>

              {/* Bio */}
              <div className="pt-6 border-t border-gray-100 dark:border-gray-800 space-y-2">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">About the Tutor</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                  {tutorData.bio}
                </p>
              </div>

              {/* Highlights */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-gray-100 dark:border-gray-800">
                <div className="flex items-center space-x-3">
                  <div className="p-2.5 bg-blue-50 dark:bg-gray-800 rounded-xl text-blue-600 dark:text-blue-400">
                    <Award className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs text-gray-500 dark:text-gray-400 block">Experience</span>
                    <span className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                      {tutorData.experience}
                    </span>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="p-2.5 bg-blue-50 dark:bg-gray-800 rounded-xl text-blue-600 dark:text-blue-400">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs text-gray-500 dark:text-gray-400 block">Location</span>
                    <span className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                      {tutorData.location}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Schedule */}
            <div className="bg-white dark:bg-gray-900 rounded-3xl p-6 sm:p-8 border border-gray-100 dark:border-gray-800 shadow-sm space-y-4">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">Teaching Schedule</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-2xl border border-gray-100 dark:border-gray-800 space-y-1">
                  <div className="flex items-center space-x-2 text-gray-500 dark:text-gray-400 text-xs">
                    <Clock className="w-4 h-4" />
                    <span>Days & Slot</span>
                  </div>
                  <p className="text-sm font-bold text-gray-900 dark:text-white">
                    {tutorData.availableDays}
                  </p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    {tutorData.availableTimeSlot}
                  </p>
                </div>

                <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-2xl border border-gray-100 dark:border-gray-800 space-y-1">
                  <div className="flex items-center space-x-2 text-gray-500 dark:text-gray-400 text-xs">
                    <Calendar className="w-4 h-4" />
                    <span>Session Starts On</span>
                  </div>
                  <p className="text-sm font-bold text-gray-900 dark:text-white">
                    {tutorData.sessionStartDate
                      ? new Date(tutorData.sessionStartDate).toLocaleDateString(undefined, {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })
                      : "N/A"}
                  </p>
                  <p className="text-xs text-green-600 dark:text-green-400 font-semibold">
                    Immediate Enrollment
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Action Sidebar */}
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-900 rounded-3xl p-6 border border-gray-100 dark:border-gray-800 shadow-sm space-y-6 sticky top-6">

              <div className="space-y-1 text-center sm:text-left">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                  Tuition Fee
                </span>
                <div className="flex items-baseline justify-center sm:justify-start space-x-1">
                  <span className="text-3xl font-extrabold text-gray-900 dark:text-white">
                    ৳{tutorData.hourlyFee}
                  </span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">/ hour</span>
                </div>
              </div>

              <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-2xl border border-gray-100 dark:border-gray-800 space-y-3">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Available Slots</span>
                  <span
                    className={`font-bold px-2.5 py-0.5 rounded-full text-xs ${
                      tutorData.totalSlot > 0
                        ? "bg-green-100 text-green-700 dark:bg-green-950/60 dark:text-green-400"
                        : "bg-red-100 text-red-700 dark:bg-red-950/60 dark:text-red-400"
                    }`}
                  >
                    {tutorData.totalSlot > 0 ? `${tutorData.totalSlot} Slots Left` : "Fully Booked"}
                  </span>
                </div>

                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Mode</span>
                  <span className="font-semibold text-gray-900 dark:text-white">
                    {tutorData.teachingMode}
                  </span>
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={() => setIsModalOpen(true)}
                disabled={isFullyBooked || isBeforeSessionDate}
                className={`w-full py-3.5 px-4 rounded-xl font-bold text-sm transition-all shadow-sm ${
                  isFullyBooked || isBeforeSessionDate
                    ? "bg-gray-200 dark:bg-gray-800 text-gray-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700 text-white shadow-blue-500/20 active:scale-95"
                }`}
              >
                {isFullyBooked
                  ? "Fully Booked"
                  : isBeforeSessionDate
                  ? "Booking Not Available Yet"
                  : "Book Session Now"}
              </button>

              <div className="flex items-center justify-center space-x-2 text-xs text-gray-500 dark:text-gray-400 pt-2">
                <ShieldCheck className="w-4 h-4 text-blue-600" />
                <span>Conflict-free Booking Guarantee</span>
              </div>

            </div>
          </div>

        </div>
      </div>

      {/* Reusable Modal Wrapping the Booking Form */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Confirm Session Booking"
      >
        <BookingForm tutor={tutorData} onSuccess={handleBookingSuccess} />
      </Modal>
    </div>
  );
}