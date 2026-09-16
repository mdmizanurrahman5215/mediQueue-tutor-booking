import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_SERVER_URL;

export async function getTutors() {
  try {
    const response = await axios.get(`${API_URL}/api/tutors`);

    return response.data;
  } catch (error) {
    console.error("Failed to fetch tutors:", error);

    return [];
  }
}