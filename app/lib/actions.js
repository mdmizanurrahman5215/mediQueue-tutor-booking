"use server";

import axios from "axios";
import { headers } from "next/headers";
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

      availableDays:
        formData?.availableDays ?? "Sun - Thu",

      availableTimeSlot:
        formData?.availableTimeSlot ??
        "05:00 PM - 08:00 PM",

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

      languages: Array.isArray(formData?.languages)
        ? formData.languages
        : [],

      skills: Array.isArray(formData?.skills)
        ? formData.skills
        : [],

      createdByEmail: formData?.createdByEmail,

      createdAt: new Date().toISOString(),
    };

    const response = await axios.post(
      `${API_URL}/api/tutors`,
      payload,
      config
    );

    return {
      success: true,
      message:
        response?.data?.message ||
        "Tutor profile created successfully.",
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

// Get Tutor Details By ID
export async function fetchTutorDetailsById(id) {
  try {
    if (!id) {
      throw new Error("Tutor ID is required.");
    }

    const config = await getAuthConfig();

    const response = await axios.get(
      `${API_URL}/api/tutors/${id}`,
      config
    );

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

      preferredTimeSlot:
        formData?.preferredTimeSlot ?? "05:00 PM - 08:00 PM",

      totalHours: Number(formData?.totalHours ?? 1),
    };

    const response = await axios.post(
      `${API_URL}/api/bookings`,
      payload,
      config
    );

    return {
      success: true,
      message:
        response?.data?.message ||
        "Session booked successfully.",
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

export async function getMyBookings() {
     const config = await getAuthConfig();
  try {
    const response = await axios.get(`${API_URL}/api/bookings`,config);

    return response.data;
  } catch (error) {
    console.error("Failed to fetch tutors:", error);

    return [];
  }
}