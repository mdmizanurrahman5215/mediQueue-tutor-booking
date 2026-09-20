
import React from "react";
import Link from "next/link";
import { getTutors } from "@/app/lib/data";
import TutorFilters from "@/app/components/card/TutorFilter";
import TutorCard from "@/app/components/card/TutorCard";

export default async function TutorHomePage({ searchParams }) {
  const params = await searchParams;
  console.log({params});
  

  const page = Number(params?.page) || 1;
  const search = params?.search || "";
  const subject = params?.subject || "";
  const fromDate = params?.fromDate || "";
  const toDate = params?.toDate || "";
  const limit = 6;

  const { tutors, availableSubjects, totalPages, currentPage, totalCount } =
    await getTutors({
      page,
      limit,
      search,
      subject,
      fromDate,
      toDate,
    });


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
          {tutors.map((tutor,index) => (
            <div
              key={tutor._id}
           
            >
              <TutorCard tutor={tutor} index={index}/>
            
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
            className={`px-4 py-2 text-sm rounded-xl border ${
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
                className={`px-4 py-2 text-sm rounded-xl border ${
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
            className={`px-4 py-2 text-sm rounded-xl border ${
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