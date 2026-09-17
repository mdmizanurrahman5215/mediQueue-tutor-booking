"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { BookOpen, Loader2 } from "lucide-react";
import { deleteBooking, getMyBookings } from "@/app/lib/actions";

import BookingCard from "../card/BookingCard";
import ConfirmDeleteModal from "../modals/ConfirmDeleteModal";
import toast from "react-hot-toast";

export default function MyBookingsPage() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

 
  const [selectedForCancel, setSelectedForCancel] = useState(null); // { bookingId, tutorId }


  const fetchMyBookings = async () => {
    try {
      setLoading(true);
      const result = await getMyBookings();
      setBookings(result || []);
    } catch (err) {
      console.error("Failed to fetch bookings:", err);
      setError("Failed to load your booking list.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyBookings();
  }, []);


const handleConfirmCancel = async () => {
  if (!selectedForCancel) return;

  const { bookingId } = selectedForCancel;

  try {
    const response = await deleteBooking(bookingId);

    if (response?.success) {
      // ১. UI থেকে ডিলিট হওয়া বুকিংটি সরিয়ে ফেলা
      setBookings((prev) => prev.filter((item) => item._id !== bookingId));

      // ২. সাকসেস টোস্ট দেখানো
      toast.success(response?.message || "Booking cancelled successfully!");

      // ৩. মোডাল স্টেট ক্লিয়ার করা
      setSelectedForCancel(null);
    } else {
      // ৪. এরর টোস্ট দেখানো
      toast.error(response?.message || "Failed to cancel booking.");
    }
  } catch (err) {
    console.error("Error cancelling booking:", err);
    toast.error(
      err?.response?.data?.message || err?.message || "Failed to cancel booking."
    );
  }
};

  if (loading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-3">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
        <p className="text-sm text-slate-600 font-medium">Loading your bookings...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 my-8 rounded-xl bg-red-50 text-red-700 border border-red-200 text-center max-w-md mx-auto">
        <p>{error}</p>
      </div>
    );
  }

  if (bookings.length === 0) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center text-center p-6">
        <BookOpen className="w-12 h-12 text-slate-400 mb-3" />
        <h3 className="text-lg font-bold text-slate-800 dark:text-white">
          No Bookings Found
        </h3>
        <p className="text-slate-500 text-sm mt-1">
          You haven't booked any tutoring sessions yet.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
          My Booked Sessions
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Manage, update, or cancel your upcoming tutor bookings.
        </p>
      </div>

      {/* Bookings Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {bookings.map((item) => (
          <BookingCard
            key={item?._id}
            item={item}
            onDeleteClick={(bookingId, tutorId) =>
              setSelectedForCancel({ bookingId, tutorId })
            }
          />
        ))}
      </div>

      {/* Standalone Cancel Confirmation Modal */}
      <ConfirmDeleteModal
        isOpen={Boolean(selectedForCancel)}
        onClose={() => setSelectedForCancel(null)}
        onConfirm={handleConfirmCancel}
        title="Cancel Booking Session?"
        message="Are you sure you want to cancel this booking session? This action cannot be undone."
        cancelText="Keep Booking"
        confirmText="Yes, Cancel"
      />
    </div>
  );
}