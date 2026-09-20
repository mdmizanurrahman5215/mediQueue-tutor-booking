

const API_URL = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:5000";

export async function getTutors({
  page = 1,
  limit = 6,
  search = "", 
  subject = "",
  fromDate = "",
  toDate = "",
} = {}) {
  try {
   
    const cleanSearch = search.trim();
    const cleanSubject = subject.trim();

    const queryParams = new URLSearchParams({
      page: String(page),
      limit: String(limit),
      ...(cleanSearch && { search: cleanSearch }),
      ...(cleanSubject && cleanSubject.toLowerCase() !== "all" && { subject: cleanSubject }),
      ...(fromDate && { fromDate }),
      ...(toDate && { toDate }),
    });

    const response = await fetch(
      `${API_URL}/api/tutors?${queryParams.toString()}`,
      {
       
        next: {
          revalidate: 60,
          tags: ["tutors-list"],
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch tutors with status: ${response.status}`);
    }

    const result = await response.json();

    return {
      tutors: result?.data || [],
      availableSubjects: result?.availableSubjects || [],
      totalPages: result?.pagination?.totalPages || 1,
      currentPage: result?.pagination?.currentPage || Number(page),
      totalCount: result?.pagination?.totalCount || 0,
    };
  } catch (error) {
    console.error("Failed to fetch tutors:", error.message);
    return {
      tutors: [],
      availableSubjects: [],
      totalPages: 1,
      currentPage: 1,
      totalCount: 0,
    };
  }
}