"use server";

import axios from "axios";
import { headers } from "next/headers";
import { revalidateTag, revalidatePath } from "next/cache"; // 🟢 Cache Invalidation Utils
import { auth } from "@/app/lib/auth";

const API_URL = process.env.NEXT_PUBLIC_SERVER_URL;

// Reusable: Better Auth থেকে existing JWT নেওয়া
async function getAuthToken() {
  try {
    const requestHeaders = await headers();

    const tokenData = await auth.api.getToken({
      headers: requestHeaders,
    });

    return tokenData?.token || null;
  } catch (error) {
    console.error("Failed to get auth token:", error);
    return null;
  }
}

// Reusable: authenticated axios config
async function getAuthConfig() {
  const token = await getAuthToken();

  if (!token) {
    throw new Error("You are not authenticated. Please login first.");
  }

  return {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };
}

// Create Tutor
export async function createTutor(formData) {
  try {
    const config = await getAuthConfig();

    const payload = {
      tutorName: formData?.tutorName,
      image: formData?.image,
      subject: formData?.subject,
      bio: formData?.bio,
      qualification: formData?.qualification ?? "",
      availableDays: formData?.availableDays ?? "Sun - Thu",
      availableTimeSlot: formData?.availableTimeSlot ?? "05:00 PM - 08:00 PM",
      hourlyFee: Number(formData?.hourlyFee ?? 0),
      totalSlot: Number(formData?.totalSlot ?? 0),
      sessionStartDate: formData?.sessionStartDate
        ? new Date(formData.sessionStartDate).toISOString()
        : new Date().toISOString(),
      institution: formData?.institution,
      experience: formData?.experience,
      location: formData?.location,
      teachingMode: formData?.teachingMode,
      rating: 5.0,
      reviewCount: 0,
      languages: Array.isArray(formData?.languages) ? formData.languages : [],
      skills: Array.isArray(formData?.skills) ? formData.skills : [],
      userId: formData?.userId || "",
      createdByEmail: formData?.createdByEmail || "",
      userEmail: formData?.createdByEmail || "",
      createdByName: formData?.createdByName || "",
      createdAt: new Date().toISOString(),
    };

    const response = await axios.post(`${API_URL}/api/tutors`, payload, config);

    // 🟢 Cache Invalidation: টিউটর ক্রিয়েট হলে পাবলিক টিউটর লিস্ট ও পেজের ক্যাশ মুছে যাবে
    revalidateTag("tutors-list");
    revalidatePath("/tutors");
    revalidatePath("/my-tutors");

    return {
      success: true,
      message: response?.data?.message || "Tutor profile created successfully.",
      data: response?.data,
    };
  } catch (error) {
    console.error("Failed to create tutor profile:", error);
    return {
      success: false,
      message:
        error?.response?.data?.message ||
        error?.message ||
        "Failed to create tutor profile.",
    };
  }
}

// Update Tutor
export async function updateTutor(id, formData) {
  try {
    const config = await getAuthConfig();

    const payload = {
      tutorName: formData?.tutorName,
      image: formData?.image,
      subject: formData?.subject,
      bio: formData?.bio,
      qualification: formData?.qualification ?? "",
      availableDays: formData?.availableDays ?? "Sun - Thu",
      availableTimeSlot: formData?.availableTimeSlot ?? "05:00 PM - 08:00 PM",
      hourlyFee: Number(formData?.hourlyFee ?? 0),
      totalSlot: Number(formData?.totalSlot ?? 0),
      sessionStartDate: formData?.sessionStartDate
        ? new Date(formData.sessionStartDate).toISOString()
        : new Date().toISOString(),
      institution: formData?.institution,
      experience: formData?.experience,
      location: formData?.location,
      teachingMode: formData?.teachingMode,
      languages: Array.isArray(formData?.languages) ? formData.languages : [],
      skills: Array.isArray(formData?.skills) ? formData.skills : [],
      updatedAt: new Date().toISOString(),
    };

    const response = await axios.put(`${API_URL}/api/tutors/${id}`, payload, config);

    // 🟢 Cache Invalidation: নির্দিষ্ট টিউটরের প্রোফাইল ও লিস্ট রিফ্রেশ করবে
    revalidateTag("tutors-list");
    revalidateTag(`tutor-${id}`);
    revalidatePath(`/tutors/${id}`);
    revalidatePath("/my-tutors");

    return {
      success: true,
      message: response?.data?.message || "Tutor profile updated successfully.",
      data: response?.data,
    };
  } catch (error) {
    console.error("Failed to update tutor profile:", error);
    return {
      success: false,
      message:
        error?.response?.data?.message ||
        error?.message ||
        "Failed to update tutor profile.",
    };
  }
}

// Get Tutor Details By ID (No cache needed here for form editing, fetches fresh data)
export async function fetchTutorDetailsById(id) {
  try {
    if (!id) {
      throw new Error("Tutor ID is required.");
    }

    const config = await getAuthConfig();
    const response = await axios.get(`${API_URL}/api/tutors/${id}`, config);

    return {
      success: true,
      data: response?.data,
    };
  } catch (error) {
    console.error("Failed to fetch tutor details:", error);
    return {
      success: false,
      message:
        error?.response?.data?.message ||
        error?.message ||
        "Failed to fetch tutor details.",
    };
  }
}

// Create Booking
export async function createBooking(formData) {
  try {
    const config = await getAuthConfig();

    const payload = {
      userId: formData?.userId || null,
      studentName: formData?.studentName,
      studentEmail: formData?.studentEmail || "",
      phone: formData?.phone,
      studentImage: formData?.studentImage || "",
      tutorId: formData?.tutorId,
      tutorName: formData?.tutorName,
      tutorEmail: formData?.tutorEmail || "",
      tutorImage: formData?.tutorImage || "",
      subject: formData?.subject,
      hourlyFee: Number(formData?.hourlyFee ?? 0),
      teachingMode: formData?.teachingMode || "Online",
      bookingDate: formData?.bookingDate
        ? new Date(formData.bookingDate).toISOString()
        : new Date().toISOString(),
      preferredTimeSlot: formData?.preferredTimeSlot ?? "05:00 PM - 08:00 PM",
      totalHours: Number(formData?.totalHours ?? 1),
    };

    const response = await axios.post(`${API_URL}/api/bookings`, payload, config);

    // 🟢 Cache Invalidation: বুকিং পেজ রিফ্রেশ করে তাজা ডাটা এনসিওর করবে
    revalidatePath("/my-booked-sessions");

    return {
      success: true,
      message: response?.data?.message || "Session booked successfully.",
      data: response?.data,
    };
  } catch (error) {
    console.error("Failed to create booking:", error);
    return {
      success: false,
      message:
        error?.response?.data?.message ||
        error?.message ||
        "Failed to create booking.",
    };
  }
}

// Get My Bookings (🔴 Private User Data - Never Cached)
export async function getMyBookings() {
  const config = await getAuthConfig();
  try {
    const response = await axios.get(`${API_URL}/api/bookings`, config);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch bookings:", error);
    return [];
  }
}

export async function deleteBooking(bookingId) {
  const config = await getAuthConfig();
  try {
    const response = await axios.delete(`${API_URL}/api/bookings/${bookingId}`, config);

    // 🟢 Cache Invalidation
    revalidatePath("/my-booked-sessions");

    return response.data;
  } catch (error) {
    console.error("Failed to delete booking:", error);
    return {
      success: false,
      message: error.response?.data?.message || "Failed to delete booking",
    };
  }
}

// Update Booking
export async function updateBooking(bookingId, formData) {
  try {
    const config = await getAuthConfig();

    const payload = {
      ...(formData?.studentName && { studentName: formData.studentName.trim() }),
      ...(formData?.phone && { phone: formData.phone.trim() }),
      ...(formData?.bookingDate && {
        bookingDate: new Date(formData.bookingDate).toISOString(),
      }),
      ...(formData?.teachingMode && { teachingMode: formData.teachingMode }),
      ...(formData?.notes !== undefined && { notes: formData.notes }),
    };

    const response = await axios.patch(
      `${API_URL}/api/bookings/${bookingId}`,
      payload,
      config
    );

    // 🟢 Cache Invalidation
    revalidatePath("/my-booked-sessions");

    return {
      success: true,
      message: response?.data?.message || "Booking updated successfully.",
      data: response?.data,
    };
  } catch (error) {
    console.error("Failed to update booking:", error);
    return {
      success: false,
      message:
        error?.response?.data?.message ||
        error?.message ||
        "Failed to update booking.",
    };
  }
}

// Get My Tutors (🔴 Private User Data - Never Cached)
export async function getMyTutors(userId) {
  try {
    const config = await getAuthConfig();

    const response = await axios.get(`${API_URL}/api/tutors/my-tutors`, {
      ...config,
      params: { userId },
    });

    return response?.data?.data || [];
  } catch (error) {
    console.error("Failed to fetch my tutors:", error);
    return [];
  }
}

// Delete Tutor
export async function deleteTutorWithBookings(tutorId) {
  try {
    const config = await getAuthConfig();

    const response = await axios.delete(`${API_URL}/api/tutors/${tutorId}`, config);

    // 🟢 Cache Invalidation: টিউটর মুছে গেলে সাথে সাথে ক্যাশ ক্লিয়ার হবে
    revalidateTag("tutors-list");
    revalidateTag(`tutor-${tutorId}`);
    revalidatePath("/tutors");
    revalidatePath("/my-tutors");

    return response.data;
  } catch (error) {
    console.error("Failed to delete tutor:", error);
    return {
      success: false,
      message: error.response?.data?.message || "Failed to delete tutor",
    };
  }
}