import TutorDetailsPage from '@/app/components/pages/TutorDetailsPage'
import React from 'react'
import { fetchTutorDetailsById } from '@/app/lib/actions'

// Dynamic Metadata Title Function
export async function generateMetadata({ params }) {
  const { id } = await params;

  try {
    // API/Database থেকে টিউটরের ডেটা ফেচ করুন
    const result = await fetchTutorDetailsById(id);
    const tutor = result?.data
    

    if (!tutor) {
      return {
        title: "Tutor Not Found | TutorApp",
        description: "The requested tutor profile could not be found.",
      };
    }

    return {
      title: `${tutor.tutorName} - ${tutor.subject || 'Tutor Profile'} | TutorApp`,
      description: `Book a session with ${tutor.tutorName}. Tuition Fee: ৳${tutor.hourlyFee}/hr.`,
    };
  } catch (error) {
    return {
      title: "Tutor Details | TutorApp",
      description: "View tutor details and book a session.",
    };
  }
}

const page = async ({ params }) => {
  const { id } = await params;
  console.log({ id });

  return (
    <div>
      <TutorDetailsPage id={id} />
    </div>
  );
};

export default page;