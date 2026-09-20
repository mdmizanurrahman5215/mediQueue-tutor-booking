// data.js

const API_URL = process.env.NEXT_PUBLIC_SERVER_URL;

export async function getTutors() {
  try {
    // 🟢 ISR / Caching: ৬০ সেকেন্ড ক্যাশ থাকবে এবং 'tutors-list' ট্যাগে ট্যাগ করা থাকবে
    const response = await fetch(`${API_URL}/api/tutors`, {
      next: { 
        revalidate: 60,          // প্রতি ৬০ সেকেন্ড পর ব্যাকগ্রাউন্ডে অটো রিফ্রেশ হবে
        tags: ["tutors-list"]    // Server Action দিয়ে যখন খুশি ক্যাশ ইনভ্যালিডেট করার জন্য
      }
    });

    if (!response.ok) {
      throw new Error("Failed to fetch tutors");
    }

    return await response.json();
  } catch (error) {
    console.error("Failed to fetch tutors:", error);
    return [];
  }
}