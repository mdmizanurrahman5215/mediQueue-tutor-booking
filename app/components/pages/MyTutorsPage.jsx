"use client";

import React, { useEffect, useState } from "react";
import DynamicTable from "../common/DynamicTable";
import { getMyTutors } from "@/app/lib/actions";
import { authClient } from "@/app/lib/auth-client";
import { Loader2, Calendar, MapPin, Laptop, User as UserIcon, Clock, Users } from "lucide-react";

const MyTutorsPage = () => {
  const { data: session, isPending: isAuthPending } = authClient.useSession();
  const user = session?.user;

  const [tutors, setTutors] = useState([]);
  const [loading, setLoading] = useState(true);

  // 📋 Assignment Requirement অনুযায়ী Table Columns Setup
  const columns = [
    {
      key: "tutorName",
      label: "Tutor Name",
      render: (_, row) => (
        <div className="flex items-center gap-3">
          <img
            src={row?.image || "https://via.placeholder.com/150"}
            alt={row?.tutorName || "Tutor"}
            className="w-9 h-9 rounded-lg object-cover ring-1 ring-slate-200 dark:ring-slate-700"
          />
          <div>
            <h4 className="font-semibold text-slate-900 dark:text-slate-100">
              {row?.tutorName || "N/A"}
            </h4>
            
          </div>
        </div>
      ),
    },
    {
      key: "subject",
      label: "Subject / Category",
      render: (sub) => (
        <span className="font-medium text-slate-800 dark:text-slate-200">
          {sub || "N/A"}
        </span>
      ),
    },
    {
      key: "availableTimeSlot",
      label: "Available Days & Time",
      render: (_, row) => (
        <div>
          <span className="font-medium text-slate-800 dark:text-slate-200 block text-xs">
            {row?.availableDays || "Sun - Thu"}
          </span>
          <span className="text-[10px] text-slate-500 dark:text-slate-400 flex items-center gap-1 mt-0.5">
            <Clock className="w-3 h-3 text-cyan-600 dark:text-cyan-400" />
            {row?.availableTimeSlot || "N/A"}
          </span>
        </div>
      ),
    },
    {
      key: "hourlyFee",
      label: "Hourly Fee",
      render: (fee) => (
        <span className="font-bold text-cyan-700 dark:text-cyan-400">
          ৳{fee || 0}/hr
        </span>
      ),
    },
    {
      key: "totalSlot",
      label: "Total Slot",
      render: (slot) => (
        <span className="inline-flex items-center gap-1 text-slate-700 dark:text-slate-300 font-medium">
          <Users className="w-3 h-3 text-slate-400" />
          {slot ?? 0}
        </span>
      ),
    },
    {
      key: "sessionStartDate",
      label: "Session Start Date",
      render: (date) => (
        <span className="text-slate-600 dark:text-slate-300 flex items-center gap-1 text-xs">
          <Calendar className="w-3.5 h-3.5 text-slate-400" />
          {date ? new Date(date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : "N/A"}
        </span>
      ),
    },
    {
      key: "institution",
      label: "Institution & Exp.",
      render: (_, row) => (
        <div>
          <span className="font-medium text-slate-800 dark:text-slate-200 block truncate max-w-[120px]">
            {row?.institution || "N/A"}
          </span>
          <span className="text-[10px] text-slate-500 dark:text-slate-400 block">
            {row?.experience ? `${row.experience} Exp.` : "N/A"}
          </span>
        </div>
      ),
    },
    {
      key: "location",
      label: "Location",
      render: (loc) => (
        <span className="flex items-center gap-1 text-slate-600 dark:text-slate-300 text-xs">
          <MapPin className="w-3.5 h-3.5 text-slate-400" />
          {loc || "N/A"}
        </span>
      ),
    },
    {
      key: "teachingMode",
      label: "Teaching Mode",
      render: (mode) => (
        <span
          className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold ${
            mode === "Online"
              ? "bg-cyan-50 dark:bg-cyan-500/10 text-cyan-700 dark:text-cyan-300 border border-cyan-200 dark:border-cyan-500/20"
              : "bg-amber-50 dark:bg-amber-500/10 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-500/20"
          }`}
        >
          {mode === "Online" ? <Laptop className="w-3 h-3" /> : <UserIcon className="w-3 h-3" />}
          {mode || "Online"}
        </span>
      ),
    },
  ];

  // userId ধরে ডাটা ফেচ করা
  useEffect(() => {
    async function fetchTutors() {
      const currentUserId = user?.id || user?._id;
      if (currentUserId) {
        setLoading(true);
        const data = await getMyTutors(currentUserId);
        setTutors(data || []);
        setLoading(false);
      } else if (!isAuthPending) {
        setLoading(false);
      }
    }

    fetchTutors();
  }, [user, isAuthPending]);

  // Action Handlers
  const handleView = (tutor) => {
    console.log("Viewing tutor:", tutor);
    alert(`Viewing details of ${tutor.tutorName}`);
  };

  const handleEdit = (tutor) => {
    console.log("Editing tutor:", tutor);
    alert(`Editing ${tutor.tutorName}`);
  };

  const handleDelete = (tutor) => {
    console.log("Deleting tutor:", tutor);
    if (confirm(`Are you sure you want to delete ${tutor.tutorName}?`)) {
      alert(`${tutor.tutorName} deleted.`);
    }
  };
  console.log({tutors});
  

  return (
    <div className="p-4 sm:p-6 bg-slate-50 dark:bg-slate-950 min-h-screen text-slate-800 dark:text-slate-200">
      <div className="max-w-7xl mx-auto space-y-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
            My Tutors List
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Manage, update, or remove tutors created by you.
          </p>
        </div>

        {/* Loading State */}
        {loading || isAuthPending ? (
          <div className="p-12 text-center bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <Loader2 className="w-6 h-6 animate-spin mx-auto text-cyan-600 dark:text-cyan-400" />
            <p className="text-xs text-slate-500 mt-2">Loading your tutors...</p>
          </div>
        ) : (
          <DynamicTable
            columns={columns}
            data={tutors}
            emptyMessage="You haven't added any tutors yet."
            actions={{
              onView: handleView,
              onEdit: handleEdit,
              onDelete: handleDelete,
            }}
          />
        )}
      </div>
    </div>
  );
};

export default MyTutorsPage;