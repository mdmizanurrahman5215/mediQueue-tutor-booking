'use server';

import axios from "axios";

const API_URL = "http://localhost:5000";

export async function createTutor(formData) {
  try {
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
        ? new Date(formData?.sessionStartDate)?.toISOString()
        : new Date()?.toISOString(),
      institution: formData?.institution,
      experience: formData?.experience,
      location: formData?.location,
      teachingMode: formData?.teachingMode,
      rating: 5.0,
      reviewCount: 0,
      languages: Array.isArray(formData?.languages) ? formData?.languages : [],
      skills: Array.isArray(formData?.skills) ? formData?.skills : [],
      createdByEmail: formData?.createdByEmail,
      createdAt: new Date()?.toISOString(),
    };

    const response = await axios.post(`${API_URL}/api/tutors`, payload);

    return response?.data;
  } catch (error) {
    console.error("Failed to create tutor profile:", error);

    return {
      success: false,
      message: error?.response?.data?.message ?? error?.message ?? "Failed to create tutor profile",
    };
  }
}