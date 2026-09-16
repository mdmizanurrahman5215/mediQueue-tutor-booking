"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";

import {
  ArrowLeft,
  Calendar,
  Clock,
  MapPin,
  Award,
  GraduationCap,
  CheckCircle2,
  X,
  ShieldCheck,
  Loader2,
} from "lucide-react";
import { fetchTutorDetailsById } from "@/app/lib/actions";



export default function TutorDetailsPage({ id }) {
  const [tutorData, setTutorData] = useState(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState(null);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [bookingLoading, setBookingLoading] = useState(false);

  const [bookingSuccess, setBookingSuccess] = useState(false);

  useEffect(() => {
    const loadTutorDetails = async () => {
      try {
        setLoading(true);
        setError(null);

        const result = await fetchTutorDetailsById(id);

        if (!result?.success) {
          throw new Error(
            result?.message || "Failed to load tutor profile."
          );
        }

        setTutorData(result?.data);
      } catch (error) {
        console.error("Tutor details error:", error);

        setError(
          error?.message ||
            "Failed to fetch tutor details."
        );
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      loadTutorDetails();
    }
  }, [id]);

  const handleBookingSubmit = async (e) => {
    e.preventDefault();

    // Booking API এখনো তোমার দেওয়া হয়নি,
    // তাই এখানে fake success দেখানো হচ্ছে না।
    toast.error("Booking API is not connected yet.");
  };

  // Loading
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950">
        <div className="flex items-center space-x-2 text-blue-600">
          <Loader2 className="w-8 h-8 animate-spin" />

          <span className="text-lg font-semibold">
            Loading Tutor Profile...
          </span>
        </div>
      </div>
    );
  }

  // Error / Not Found
  if (error || !tutorData) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-950 text-center px-4">
        <h2 className="text-2xl font-bold text-red-600 mb-2">
          Error Loading Profile
        </h2>

        <p className="text-gray-600 dark:text-gray-400 mb-6">
          {error || "Tutor not found"}
        </p>

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

        {/* Back Button */}
        <Link
          href="/tutors"
          className="inline-flex items-center space-x-2 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />

          <span>Back to All Tutors</span>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* LEFT */}
          <div className="lg:col-span-2 space-y-6">

            {/* Profile Card */}
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

                    <span>
                      {tutorData.institution}
                    </span>
                  </p>

                </div>
              </div>

              {/* Bio */}
              <div className="pt-6 border-t border-gray-100 dark:border-gray-800 space-y-2">

                <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                  About the Tutor
                </h3>

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
                    <span className="text-xs text-gray-500 dark:text-gray-400 block">
                      Experience
                    </span>

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
                    <span className="text-xs text-gray-500 dark:text-gray-400 block">
                      Location
                    </span>

                    <span className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                      {tutorData.location}
                    </span>
                  </div>

                </div>

              </div>
            </div>

            {/* Schedule */}
            <div className="bg-white dark:bg-gray-900 rounded-3xl p-6 sm:p-8 border border-gray-100 dark:border-gray-800 shadow-sm space-y-4">

              <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                Teaching Schedule
              </h3>

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
                      ? new Date(
                          tutorData.sessionStartDate
                        ).toLocaleDateString(undefined, {
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

          {/* RIGHT */}
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

                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    / hour
                  </span>

                </div>
              </div>

              <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-2xl border border-gray-100 dark:border-gray-800 space-y-3">

                <div className="flex justify-between items-center text-sm">

                  <span className="text-gray-600 dark:text-gray-400">
                    Available Slots
                  </span>

                  <span
                    className={`font-bold px-2.5 py-0.5 rounded-full text-xs ${
                      tutorData.totalSlot > 0
                        ? "bg-green-100 text-green-700 dark:bg-green-950/60 dark:text-green-400"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {tutorData.totalSlot > 0
                      ? `${tutorData.totalSlot} Slots Left`
                      : "Fully Booked"}
                  </span>

                </div>

                <div className="flex justify-between items-center text-sm">

                  <span className="text-gray-600 dark:text-gray-400">
                    Mode
                  </span>

                  <span className="font-semibold text-gray-900 dark:text-white">
                    {tutorData.teachingMode}
                  </span>

                </div>

              </div>

              <button
                onClick={() => setIsModalOpen(true)}
                disabled={tutorData.totalSlot <= 0}
                className={`w-full py-3.5 px-4 rounded-xl font-bold text-sm transition-all shadow-sm ${
                  tutorData.totalSlot > 0
                    ? "bg-blue-600 hover:bg-blue-700 text-white shadow-blue-500/20"
                    : "bg-gray-200 dark:bg-gray-800 text-gray-400 cursor-not-allowed"
                }`}
              >
                {tutorData.totalSlot > 0
                  ? "Book Session Now"
                  : "Slots Unavailable"}
              </button>

              <div className="flex items-center justify-center space-x-2 text-xs text-gray-500 dark:text-gray-400 pt-2">

                <ShieldCheck className="w-4 h-4 text-blue-600" />

                <span>
                  Conflict-free Booking Guarantee
                </span>

              </div>

            </div>
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">

          <div className="bg-white dark:bg-gray-900 rounded-3xl max-w-md w-full p-6 space-y-6 border border-gray-100 dark:border-gray-800 shadow-xl relative">

            <div className="flex justify-between items-center border-b border-gray-100 dark:border-gray-800 pb-4">

              <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                Confirm Session Booking
              </h3>

              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 p-1 rounded-full"
              >
                <X className="w-5 h-5" />
              </button>

            </div>

            {bookingSuccess ? (
              <div className="text-center py-8 space-y-3">

                <CheckCircle2 className="w-14 h-14 text-green-500 mx-auto" />

                <h4 className="text-xl font-bold text-gray-900 dark:text-white">
                  Booking Confirmed!
                </h4>

                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Your tutoring session with{" "}
                  {tutorData.tutorName} has been booked.
                </p>

              </div>
            ) : (
              <form
                onSubmit={handleBookingSubmit}
                className="space-y-4"
              >

                <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-2xl space-y-2 text-xs text-gray-600 dark:text-gray-300">

                  <div className="flex justify-between">
                    <span>Tutor Name:</span>

                    <span className="font-bold text-gray-900 dark:text-white">
                      {tutorData.tutorName}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span>Subject:</span>

                    <span className="font-semibold text-gray-900 dark:text-white">
                      {tutorData.subject}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span>Fee:</span>

                    <span className="font-bold text-blue-600 dark:text-blue-400">
                      ৳{tutorData.hourlyFee} / hr
                    </span>
                  </div>

                </div>

                <div className="space-y-1">

                  <label className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                    Student Name
                  </label>

                  <input
                    type="text"
                    required
                    placeholder="Enter full name"
                    className="w-full px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />

                </div>

                <div className="space-y-1">

                  <label className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                    Contact Email
                  </label>

                  <input
                    type="email"
                    required
                    placeholder="student@example.com"
                    className="w-full px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />

                </div>

                <button
                  type="submit"
                  disabled={bookingLoading}
                  className="w-full py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white rounded-xl font-bold text-sm transition-colors shadow-sm mt-2"
                >
                  {bookingLoading
                    ? "Processing..."
                    : `Confirm & Pay ৳${tutorData.hourlyFee}`}
                </button>

              </form>
            )}

          </div>
        </div>
      )}
    </div>
  );
}