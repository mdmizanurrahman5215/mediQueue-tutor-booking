import axios from "axios";

const API_URL = "http://localhost:5000";

export async function getTutors() {
  try {
    const response = await axios.get(`${API_URL}/api/tutors`);

    return response.data;
  } catch (error) {
    console.error("Failed to fetch tutors:", error);

    return [];
  }
}