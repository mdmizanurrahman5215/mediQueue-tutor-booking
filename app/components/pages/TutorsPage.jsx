"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Calendar,
  MapPin,
  Clock,
  BookOpen,
  ArrowRight,
  Sparkles,
  GraduationCap,
  SlidersHorizontal,
  Users,
  CheckCircle2,
} from "lucide-react";
import Image from "next/image";

const formatDate = (date) => {
  if (!date) return "N/A";

  const d = new Date(date);

  if (Number.isNaN(d.getTime())) {
    return "Invalid Date";
  }

  return `${String(d.getDate()).padStart(2, "0")}/${String(
    d.getMonth() + 1
  ).padStart(2, "0")}/${d.getFullYear()}`;
};

export default function TutorsPage({ tutors = [] }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // Search
  const filteredTutors = tutors.filter((tutor) => {
    const matchesName = tutor?.tutorName
      ?.toLowerCase()
      .includes(searchQuery.toLowerCase());

    return matchesName;
  });

  return (
    <main
      className="
        relative min-h-screen
        bg-slate-50 dark:bg-slate-950
        text-slate-900 dark:text-slate-100
        overflow-hidden
        transition-colors duration-300
      "
    >
      {/* =====================================================
          BACKGROUND
      ====================================================== */}

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="
            absolute -top-40 left-1/4
            w-[500px] h-[500px]
            rounded-full
            bg-blue-500/10
            dark:bg-blue-500/10
            blur-[120px]
          "
        />

        <div
          className="
            absolute top-1/2 -right-40
            w-[450px] h-[450px]
            rounded-full
            bg-indigo-500/10
            blur-[120px]
          "
        />

        <div
          className="
            absolute bottom-0 left-0
            w-[400px] h-[400px]
            rounded-full
            bg-purple-500/5
            blur-[120px]
          "
        />
      </div>

      {/* =====================================================
          MAIN CONTAINER
      ====================================================== */}

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        {/* =====================================================
            HERO HEADER
        ====================================================== */}

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-10"
        >
          {/* Small badge */}

          <div
            className="
              inline-flex items-center gap-2
              px-4 py-2
              rounded-full
              bg-blue-50 dark:bg-blue-500/10
              border border-blue-100 dark:border-blue-500/20
              text-blue-600 dark:text-blue-400
              text-xs font-bold
              tracking-wide
              mb-5
            "
          >
            <Sparkles className="w-3.5 h-3.5" />

            Trusted Tutors
          </div>

          {/* Heading */}

          <h1
            className="
              text-4xl sm:text-5xl lg:text-6xl
              font-black
              tracking-tight
              text-slate-900 dark:text-white
              leading-tight
            "
          >
            Learn From
            <span
              className="
                ml-2
                bg-gradient-to-r
                from-blue-600
                via-indigo-600
                to-purple-600
                dark:from-blue-400
                dark:via-indigo-400
                dark:to-purple-400
                bg-clip-text
                text-transparent
              "
            >
              Expert Tutors
            </span>
          </h1>

          <p
            className="
              mt-5
              text-sm sm:text-base
              leading-7
              text-slate-500
              dark:text-slate-400
              max-w-2xl
              mx-auto
            "
          >
            Find experienced tutors, explore their availability,
            and book personalized learning sessions that fit your schedule.
          </p>

          {/* Stats */}

          <div className="flex justify-center mt-7">
            <div
              className="
                inline-flex items-center gap-2
                px-4 py-2
                rounded-xl
                bg-white/80 dark:bg-white/5
                border border-slate-200 dark:border-white/10
                shadow-sm
              "
            >
              <Users className="w-4 h-4 text-blue-500" />

              <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                {tutors.length}
              </span>

              <span className="text-sm text-slate-400">
                Tutors Available
              </span>
            </div>
          </div>
        </motion.section>

        {/* =====================================================
            SEARCH / FILTER
        ====================================================== */}

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="
            mb-10
            rounded-3xl
            border border-slate-200
            dark:border-white/10
            bg-white/80
            dark:bg-slate-900/70
            backdrop-blur-xl
            shadow-xl
            shadow-slate-900/5
            dark:shadow-black/20
            p-4 sm:p-5
          "
        >
          {/* Filter heading */}

          <div className="flex items-center gap-2 mb-4">
            <div
              className="
                w-8 h-8
                rounded-lg
                bg-blue-50
                dark:bg-blue-500/10
                flex items-center justify-center
              "
            >
              <SlidersHorizontal className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            </div>

            <div>
              <h2 className="text-sm font-bold text-slate-800 dark:text-white">
                Find your tutor
              </h2>

              <p className="text-[11px] text-slate-400">
                Search by name or availability
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">

            {/* Search */}

            <div className="relative group">
              <Search
                className="
                  absolute left-4 top-1/2
                  -translate-y-1/2
                  w-4 h-4
                  text-slate-400
                  group-focus-within:text-blue-500
                  transition-colors
                "
              />

              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search tutor by name..."
                className="
                  w-full
                  pl-11 pr-4
                  py-3.5
                  rounded-xl
                  bg-slate-50
                  dark:bg-white/5
                  border border-slate-200
                  dark:border-white/10
                  text-sm
                  text-slate-800
                  dark:text-white
                  placeholder:text-slate-400
                  outline-none
                  focus:border-blue-500
                  focus:ring-4
                  focus:ring-blue-500/10
                  transition-all
                "
              />
            </div>

            {/* Start Date */}

            <div className="relative group">
              <Calendar
                className="
                  absolute left-4 top-1/2
                  -translate-y-1/2
                  w-4 h-4
                  text-slate-400
                  group-focus-within:text-blue-500
                  transition-colors
                "
              />

              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="
                  w-full
                  pl-11 pr-4
                  py-3.5
                  rounded-xl
                  bg-slate-50
                  dark:bg-white/5
                  border border-slate-200
                  dark:border-white/10
                  text-sm
                  text-slate-700
                  dark:text-white
                  outline-none
                  focus:border-blue-500
                  focus:ring-4
                  focus:ring-blue-500/10
                  transition-all
                  [color-scheme:light]
                  dark:[color-scheme:dark]
                "
              />
            </div>

            {/* End Date */}

            <div className="relative group">
              <Calendar
                className="
                  absolute left-4 top-1/2
                  -translate-y-1/2
                  w-4 h-4
                  text-slate-400
                  group-focus-within:text-blue-500
                  transition-colors
                "
              />

              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="
                  w-full
                  pl-11 pr-4
                  py-3.5
                  rounded-xl
                  bg-slate-50
                  dark:bg-white/5
                  border border-slate-200
                  dark:border-white/10
                  text-sm
                  text-slate-700
                  dark:text-white
                  outline-none
                  focus:border-blue-500
                  focus:ring-4
                  focus:ring-blue-500/10
                  transition-all
                  [color-scheme:light]
                  dark:[color-scheme:dark]
                "
              />
            </div>
          </div>
        </motion.section>

        {/* =====================================================
            RESULTS HEADER
        ====================================================== */}

        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              Available Tutors
            </h2>

            <p className="text-xs text-slate-400 mt-1">
              {filteredTutors.length} tutor
              {filteredTutors.length !== 1 ? "s" : ""} found
            </p>
          </div>

          <div
            className="
              hidden sm:flex
              items-center gap-2
              text-xs font-medium
              text-slate-400
            "
          >
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            Verified profiles
          </div>
        </div>

        {/* =====================================================
            EMPTY STATE
        ====================================================== */}

        {!filteredTutors || filteredTutors.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="
              rounded-3xl
              border border-slate-200
              dark:border-white/10
              bg-white/80
              dark:bg-slate-900/70
              backdrop-blur-xl
              py-24
              text-center
            "
          >
            <div
              className="
                w-16 h-16
                mx-auto mb-5
                rounded-2xl
                bg-blue-50
                dark:bg-blue-500/10
                flex items-center justify-center
              "
            >
              <BookOpen className="w-7 h-7 text-blue-500" />
            </div>

            <h3 className="text-xl font-bold text-slate-800 dark:text-white">
              No Tutors Found
            </h3>

            <p className="text-sm text-slate-400 mt-2">
              Try searching with a different tutor name.
            </p>
          </motion.div>
        ) : (

          /* ===================================================
             TUTOR GRID
          ==================================================== */

          <div
            className="
              grid
              grid-cols-1
              md:grid-cols-2
              lg:grid-cols-3
              gap-5
            "
          >
            <AnimatePresence>
              {filteredTutors.map((tutor, index) => (
                <motion.article
                  key={tutor._id || tutor.id}
                  initial={{
                    opacity: 0,
                    y: 20,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    duration: 0.4,
                    delay: index * 0.05,
                  }}
                  whileHover={{
                    y: -6,
                  }}
                  className="
                    group
                    overflow-hidden
                    rounded-3xl
                    bg-white
                    dark:bg-slate-900
                    border
                    border-slate-200
                    dark:border-white/10
                    shadow-lg
                    shadow-slate-900/5
                    dark:shadow-black/20
                    hover:shadow-2xl
                    hover:shadow-blue-500/10
                    transition-all
                    duration-300
                  "
                >
                  {/* =========================================
                      IMAGE
                  ========================================== */}

                  <div
                    className="
                      relative
                      h-56
                      w-full
                      overflow-hidden
                      bg-slate-100
                      dark:bg-slate-800
                    "
                  >
                    <Image
                      src={
                        tutor?.image ||
                        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500"
                      }
                      alt={tutor?.tutorName || "Tutor"}
                      fill
                      className="
                        object-cover
                        transition-transform
                        duration-700
                        group-hover:scale-105
                      "
                      sizes="
                        (max-width: 768px) 100vw,
                        (max-width: 1024px) 50vw,
                        33vw
                      "
                    />

                    {/* Image overlay */}

                    <div
                      className="
                        absolute inset-0
                        bg-gradient-to-t
                        from-black/70
                        via-black/10
                        to-transparent
                      "
                    />

                    {/* Teaching mode */}

                    <span
                      className="
                        absolute
                        top-3 right-3
                        px-3 py-1.5
                        rounded-full
                        bg-white/90
                        dark:bg-slate-900/90
                        backdrop-blur-md
                        border border-white/20
                        text-[10px]
                        font-bold
                        text-blue-600
                        dark:text-blue-400
                        shadow-sm
                      "
                    >
                      {tutor?.teachingMode || "Online"}
                    </span>

                    {/* Price */}

                    <div
                      className="
                        absolute
                        bottom-3 left-4
                        flex items-baseline gap-1
                      "
                    >
                      <span className="text-xl font-black text-white">
                        ৳{tutor?.hourlyFee}
                      </span>

                      <span className="text-[10px] text-white/70">
                        / hour
                      </span>
                    </div>
                  </div>

                  {/* =========================================
                      CARD CONTENT
                  ========================================== */}

                  <div className="p-5">

                    {/* Name */}

                    <div className="mb-4">
                      <h3
                        className="
                          text-lg
                          font-bold
                          text-slate-900
                          dark:text-white
                          group-hover:text-blue-600
                          dark:group-hover:text-blue-400
                          transition-colors
                        "
                      >
                        {tutor?.tutorName}
                      </h3>

                      <p className="text-xs font-semibold text-blue-600 dark:text-blue-400 mt-1">
                        {tutor?.subject}
                      </p>
                    </div>

                    {/* Institution */}

                    <div
                      className="
                        flex items-center gap-2
                        p-3
                        rounded-xl
                        bg-slate-50
                        dark:bg-white/5
                        border border-slate-100
                        dark:border-white/5
                        mb-4
                      "
                    >
                      <GraduationCap className="w-4 h-4 text-blue-500 shrink-0" />

                      <span
                        className="
                          text-xs
                          text-slate-500
                          dark:text-slate-400
                          truncate
                        "
                      >
                        {tutor?.institution} • {tutor?.experience}
                      </span>
                    </div>

                    {/* Details */}

                    <div className="space-y-3">

                      <div className="flex items-center gap-2.5">
                        <Clock className="w-4 h-4 text-slate-400 shrink-0" />

                        <span
                          className="
                            text-xs
                            text-slate-500
                            dark:text-slate-400
                            truncate
                          "
                        >
                          {tutor?.availableDays} (
                          {tutor?.availableTimeSlot})
                        </span>
                      </div>

                      <div className="flex items-center gap-2.5">
                        <MapPin className="w-4 h-4 text-slate-400 shrink-0" />

                        <span
                          className="
                            text-xs
                            text-slate-500
                            dark:text-slate-400
                            truncate
                          "
                        >
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

                    {/* Divider */}

                    <div className="h-px bg-slate-100 dark:bg-white/10 my-5" />

                    {/* Slots */}

                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs font-medium text-slate-400">
                        Available slots
                      </span>

                      {tutor?.totalSlot > 0 ? (
                        <span
                          className="
                            inline-flex
                            items-center gap-1.5
                            px-2.5 py-1
                            rounded-full
                            bg-emerald-50
                            dark:bg-emerald-500/10
                            border border-emerald-100
                            dark:border-emerald-500/20
                            text-[10px]
                            font-bold
                            text-emerald-600
                            dark:text-emerald-400
                          "
                        >
                          <CheckCircle2 className="w-3 h-3" />

                          {tutor?.totalSlot} Slots
                        </span>
                      ) : (
                        <span
                          className="
                            px-2.5 py-1
                            rounded-full
                            bg-red-50
                            dark:bg-red-500/10
                            text-[10px]
                            font-bold
                            text-red-500
                          "
                        >
                          Fully Booked
                        </span>
                      )}
                    </div>

                    {/* Book button */}

                    <Link
                      href={`/tutors/${tutor?._id}`}
                      className="
                        group/btn
                        w-full
                        flex items-center justify-center gap-2
                        py-3
                        px-4
                        rounded-xl
                        bg-gradient-to-r
                        from-blue-600
                        to-indigo-600
                        hover:from-blue-500
                        hover:to-indigo-500
                        text-white
                        text-sm
                        font-bold
                        shadow-lg
                        shadow-blue-500/20
                        hover:shadow-blue-500/30
                        transition-all
                      "
                    >
                      <span>View & Book</span>

                      <ArrowRight
                        className="
                          w-4 h-4
                          group-hover/btn:translate-x-1
                          transition-transform
                        "
                      />
                    </Link>
                  </div>
                </motion.article>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </main>
  );
}