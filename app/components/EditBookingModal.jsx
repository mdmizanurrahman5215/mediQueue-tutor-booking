"use client";

import { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";
import Modal from "./Modal"; // আপনার জেনেরিক মোডাল

export default function EditBookingModal({ booking, onClose, onUpdate }) {
  const [formData, setFormData] = useState({
    studentName: "",
    phone: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (booking) {
      setFormData({
        studentName: booking?.studentName || "",
        phone: booking?.phone || "",
      });
    }
  }, [booking]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    await onUpdate(booking._id, formData);
    setIsSubmitting(false);
  };

  return (
    <Modal
      isOpen={Boolean(booking)}
      onClose={onClose}
      title="Edit Contact Details"
    >
      {/* এই পুরো ফর্মটি children হিসেবে Modal কম্পোনেন্টে চলে যাবে */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="text-xs font-semibold text-slate-600 dark:text-slate-300 block mb-1">
            Student Name
          </label>
          <input
            type="text"
            required
            value={formData.studentName}
            onChange={(e) =>
              setFormData({ ...formData, studentName: e.target.value })
            }
            className="w-full text-sm p-2.5 rounded-lg border border-slate-300 dark:border-slate-700 dark:bg-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="text-xs font-semibold text-slate-600 dark:text-slate-300 block mb-1">
            Phone Number
          </label>
          <input
            type="text"
            required
            value={formData.phone}
            onChange={(e) =>
              setFormData({ ...formData, phone: e.target.value })
            }
            className="w-full text-sm p-2.5 rounded-lg border border-slate-300 dark:border-slate-700 dark:bg-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex gap-2 pt-2 justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg dark:bg-slate-800 dark:text-slate-300"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg disabled:opacity-50 flex items-center gap-1"
          >
            {isSubmitting && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
            {isSubmitting ? "Updating..." : "Save Changes"}
          </button>
        </div>
      </form>
    </Modal>
  );
}