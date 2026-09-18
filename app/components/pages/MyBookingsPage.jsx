"use client";

import { useEffect, useState } from "react";
import { BookOpen, Loader2 } from "lucide-react";
import toast from "react-hot-toast";

// Actions
import { deleteBooking, getMyBookings, updateBooking } from "@/app/lib/actions";

// Components & Modals
import BookingCard from "../card/BookingCard";
import ConfirmDeleteModal from "../modals/ConfirmDeleteModal";
import EditBookingForm from "../EditBookingForm";
import Modal from "../modals/Modal";

export default function MyBookingsPage() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Modals Management States
  const [selectedForCancel, setSelectedForCancel] = useState(null); // { bookingId, tutorId }
  const [selectedForEdit, setSelectedForEdit] = useState(null); // booking object
  const [isUpdating, setIsUpdating] = useState(false);

  // Fetch Initial Bookings
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

  // 🔴 Cancel Booking Logic
  const handleConfirmCancel = async () => {
    if (!selectedForCancel) return;

    const { bookingId } = selectedForCancel;

    try {
      const response = await deleteBooking(bookingId);

      if (response?.success) {
        setBookings((prev) => prev.filter((item) => item._id !== bookingId));
        toast.success(response?.message || "Booking cancelled successfully!");
        setSelectedForCancel(null);
      } else {
        toast.error(response?.message || "Failed to cancel booking.");
      }
    } catch (err) {
      console.error("Error cancelling booking:", err);
      toast.error(
        err?.response?.data?.message || err?.message || "Failed to cancel booking."
      );
    }
  };

  // ✏️ Edit/Update Booking Logic
  const handleSaveUpdate = async (updatedFields) => {
    if (!selectedForEdit?._id) return;

    try {
      setIsUpdating(true);

      const response = await updateBooking(selectedForEdit._id, updatedFields);

      if (response?.success) {
        // UI স্টেট আপডেট করা
        setBookings((prev) =>
          prev.map((item) =>
            item._id === selectedForEdit._id
              ? { ...item, ...updatedFields }
              : item
          )
        );

        toast.success(response?.message || "Booking updated successfully!");
        setSelectedForEdit(null); 
      } else {
        toast.error(response?.message || "Failed to update booking.");
      }
    } catch (err) {
      console.error("Error updating booking:", err);
      toast.error(
        err?.response?.data?.message ||
          err?.message ||
          "Failed to update booking."
      );
    } finally {
      setIsUpdating(false);
    }
  };

  // Loading State UI
  if (loading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-3">
        <Loader2 className="w-8 h-8 animate-spin text-cyan-500" />
        <p className="text-sm text-slate-400 font-medium">Loading your bookings...</p>
      </div>
    );
  }

  // Error State UI
  if (error) {
    return (
      <div className="p-4 my-8 rounded-xl bg-rose-500/10 text-rose-400 border border-rose-500/20 text-center max-w-md mx-auto">
        <p>{error}</p>
      </div>
    );
  }

  // Empty State UI
  if (bookings.length === 0) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center text-center p-6">
        <BookOpen className="w-12 h-12 text-slate-500 mb-3" />
        <h3 className="text-lg font-bold text-slate-100">
          No Bookings Found
        </h3>
        <p className="text-slate-400 text-sm mt-1">
          You haven't booked any tutoring sessions yet.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-100">
          My Booked Sessions
        </h1>
        <p className="text-sm text-slate-400 mt-1">
          Manage, update, or cancel your upcoming tutor bookings.
        </p>
      </div>

      {/* Bookings Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {bookings.map((item) => (
          <BookingCard
            key={item?._id}
            item={item}
            onEditClick={(bookingItem) => setSelectedForEdit(bookingItem)}
            onDeleteClick={(bookingId, tutorId) =>
              setSelectedForCancel({ bookingId, tutorId })
            }
          />
        ))}
      </div>

      <ConfirmDeleteModal
        isOpen={Boolean(selectedForCancel)}
        onClose={() => setSelectedForCancel(null)}
        onConfirm={handleConfirmCancel}
        title="Cancel Booking Session?"
        message="Are you sure you want to cancel this booking session? This action cannot be undone."
        cancelText="Keep Booking"
        confirmText="Yes, Cancel"
      />

      <Modal
        isOpen={Boolean(selectedForEdit)}
        onClose={() => setSelectedForEdit(null)}
        title="Edit Session Details"
      >
        <EditBookingForm
          bookingData={selectedForEdit}
          onSave={handleSaveUpdate}
          onClose={() => setSelectedForEdit(null)}
          isLoading={isUpdating}
        />
      </Modal>
    </div>
  );
}