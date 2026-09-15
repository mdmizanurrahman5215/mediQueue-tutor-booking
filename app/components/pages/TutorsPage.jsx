"use client";

import Link from "next/link";
import {
  Search,
  Calendar,
  MapPin,
  Clock,
  BookOpen,
  ArrowRight,
} from "lucide-react";
import Image from "next/image";

const formatDate = (date) => {
  if (!date) return "N/A";

  const d = new Date(date);

  if (Number.isNaN(d.getTime())) return "Invalid Date";

  return `${String(d.getDate()).padStart(2, "0")}/${String(
    d.getMonth() + 1
  ).padStart(2, "0")}/${d.getFullYear()}`;
};

export default function TutorsPage({ tutors = [] }) {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 py-10 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Page Header */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white">
            Find Your Expert Tutor
          </h1>

          <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">
            Browse through top-rated tutors, check availability, and book online
            learning sessions without slot conflicts.
          </p>
        </div>

        {/* Search & Date Filter */}
        <div className="bg-white dark:bg-gray-900 p-4 sm:p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />

              <input
                type="text"
                placeholder="Search tutor by name..."
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Start Date */}
            <div className="relative">
              <Calendar className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />

              <input
                type="date"
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* End Date */}
            <div className="relative">
              <Calendar className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />

              <input
                type="date"
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Tutors */}
        {!tutors || tutors.length === 0 ? (
          <div className="text-center py-16 bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800">
            <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-3" />

            <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200">
              No Tutors Available
            </h3>

            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              There are currently no tutors to display.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tutors?.map((tutor) => (
              <div
                key={tutor._id || tutor.id}
                className="bg-white dark:bg-gray-900 rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  {/* Tutor Image */}
                  <div className="relative h-48 w-full bg-gray-100 dark:bg-gray-800">
                    <Image
                      src={
                        tutor?.image ||
                        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500"
                      }
                      alt={tutor?.tutorName || "Tutor Image"}
                      fill
                         className="object-contain"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />

                    <span className="absolute top-3 right-3 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm">
                      {tutor?.teachingMode}
                    </span>
                  </div>

                  {/* Tutor Details */}
                  <div className="p-5 space-y-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                          {tutor?.tutorName}
                        </h2>

                        <p className="text-xs font-semibold text-blue-600 dark:text-blue-400">
                          {tutor?.subject}
                        </p>
                      </div>

                      <div className="text-right">
                        <span className="text-base font-extrabold text-gray-900 dark:text-white">
                          ৳{tutor?.hourlyFee}
                        </span>

                        <span className="text-xs text-gray-500 block">
                          / hour
                        </span>
                      </div>
                    </div>

                    <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-1">
                      {tutor?.institution} • {tutor?.experience}
                    </p>

                    <div className="pt-2 border-t border-gray-100 dark:border-gray-800 space-y-1.5 text-xs text-gray-600 dark:text-gray-300">
                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4 text-gray-400" />
                        <span>
                          {tutor?.availableDays} ({tutor?.availableTimeSlot})
                        </span>
                      </div>

                      <div className="flex items-center space-x-2">
                        <MapPin className="w-4 h-4 text-gray-400" />
                        <span>{tutor?.location}</span>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4 text-gray-400" />

                        <span>
                          Session Starts: {formatDate(tutor?.sessionStartDate)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer */}
                <div className="p-5 pt-0">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-xs font-medium text-gray-500">
                      Available Slots:
                    </span>

                    <span
                      className={`text-xs font-bold px-2 py-0.5 rounded ${
                        tutor?.totalSlot > 0
                          ? "bg-green-100 text-green-700 dark:bg-green-950/40 dark:text-green-400"
                          : "bg-red-100 text-red-700 dark:bg-red-950/40 dark:text-red-400"
                      }`}
                    >
                      {tutor.totalSlot > 0
                        ? `${tutor?.totalSlot} Slots Left`
                        : "Fully Booked"}
                    </span>
                  </div>

                  <Link
                    href={`/tutors/${tutor?._id}`}
                    className="w-full inline-flex items-center justify-center space-x-2 py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-semibold transition-colors shadow-sm"
                  >
                    <span>Book Session</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}