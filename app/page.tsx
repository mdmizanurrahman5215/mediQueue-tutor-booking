import Banner from "./components/layout/Banner";
import TutorHomePage from "./tutors/page";
import HowItWorks from "@/app/components/pages/HowItWorks";
import SubjectCategories from "@/app/components/pages/SubjectCategories";
import Testimonials from "@/app/components/pages/Testimonials";
import WhyChooseUs from "@/app/components/pages/WhyChooseUs";

// Props er Type define kora holo
interface PageProps {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }> | { [key: string]: string | string[] | undefined };
}

export default async function Home({ searchParams }: PageProps) {
  const resolvedParams = (await searchParams) || {};

  return (
    <>
      <Banner />
      <TutorHomePage searchParams={resolvedParams} />
      <HowItWorks />
      <SubjectCategories />
      <WhyChooseUs />
      <Testimonials />
    </>
  );
}