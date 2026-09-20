import React from "react";
import Link from "next/link";
import { getTutors } from "@/app/lib/data";
import TutorFilters from "@/app/components/card/TutorFilter";

export default async function TutorHomePage({ searchParams }) {
  const params = searchParams ? await searchParams : {};
  console.log("Resolved searchParams:", params);

  const page = Number(params?.page) || 1;
  const search = params?.search || "";
  const subject = params?.subject || "";
  const fromDate = params?.fromDate || "";
  const toDate = params?.toDate || "";
  const limit = 6;

  const data = await getTutors({
    page,
    limit,
    search,
    subject,
    fromDate,
    toDate,
  });

  const tutors = data?.tutors || [];
  const availableSubjects = data?.availableSubjects || [];
  const totalPages = data?.totalPages || 0;
  const currentPage = data?.currentPage || 1;
  const totalCount = data?.totalCount || 0;

  const createPageUrl = (pageNum) => {
    const query = new URLSearchParams();
    query.set("page", String(pageNum));
    if (search) query.set("search", search);
    if (subject) query.set("subject", subject);
    if (fromDate) query.set("fromDate", fromDate);
    if (toDate) query.set("toDate", toDate);
    return `/tutors?${query.toString()}`;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 space-y-8">
      <div>
        <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">
          Browse Tutors
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Found {totalCount} matching tutors available for booking
        </p>
      </div>

      <TutorFilters subjects={availableSubjects} />

      {tutors.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tutors.map((tutor) => (
            <div
              key={tutor._id || tutor.id}
              className="p-6 rounded-3xl border border-gray-200/80 dark:border-white/10 bg-white dark:bg-gray-950 shadow-sm space-y-3"
            >
              <div className="flex justify-between items-start">
                <h3 className="font-bold text-lg text-gray-900 dark:text-white">
                  {tutor.tutorName}
                </h3>
                <span className="text-xs px-2.5 py-1 rounded-full bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 font-semibold">
                  ${tutor.hourlyFee}/hr
                </span>
              </div>
              <p className="text-sm font-semibold text-blue-600 dark:text-blue-400">
                {tutor.subject}
              </p>
              <p className="text-xs text-gray-500">{tutor.institution}</p>
              {tutor.sessionStartDate && (
                <p className="text-xs text-emerald-600 dark:text-emerald-400">
                  Session Start:{" "}
                  {new Date(tutor.sessionStartDate).toLocaleDateString()}
                </p>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-950 rounded-3xl border border-gray-100 dark:border-white/5">
          No tutors found matching your search and date range criteria.
        </div>
      )}

      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 pt-8">
          <Link
            href={createPageUrl(currentPage - 1)}
            className={`px-4 py-2 text-sm rounded-xl border transition-all ${
              currentPage <= 1
                ? "pointer-events-none opacity-40 border-gray-200"
                : "border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800"
            }`}
          >
            Previous
          </Link>

          {[...Array(totalPages)].map((_, i) => {
            const pageNum = i + 1;
            return (
              <Link
                key={pageNum}
                href={createPageUrl(pageNum)}
                className={`px-4 py-2 text-sm rounded-xl border transition-all ${
                  currentPage === pageNum
                    ? "bg-blue-600 text-white border-blue-600 font-bold"
                    : "border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800"
                }`}
              >
                {pageNum}
              </Link>
            );
          })}

          <Link
            href={createPageUrl(currentPage + 1)}
            className={`px-4 py-2 text-sm rounded-xl border transition-all ${
              currentPage >= totalPages
                ? "pointer-events-none opacity-40 border-gray-200"
                : "border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800"
            }`}
          >
            Next
          </Link>
        </div>
      )}
    </div>
  );
}
