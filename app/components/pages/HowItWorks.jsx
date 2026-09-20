import { Search, CalendarCheck, GraduationCap } from "lucide-react";

export default function HowItWorks() {
  const steps = [
    {
      icon: Search,
      title: "1. Search Tutors",
      desc: "Browse through top-rated tutors filtering by subject, location, and fees.",
    },
    {
      icon: CalendarCheck,
      title: "2. Book a Slot",
      desc: "Pick your preferred date and time slot, then confirm your session effortlessly.",
    },
    {
      icon: GraduationCap,
      title: "3. Start Learning",
      desc: "Connect with your tutor online or offline and boost your academic preparation.",
    },
  ];

  return (
    <section className="py-16 px-4 bg-gray-50/50 dark:bg-gray-900/50">
      <div className="max-w-7xl mx-auto text-center space-y-12">
        <div>
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">
            How <span className="text-blue-600">MediQueue</span> Works
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
            Get started with personalized 1-on-1 tutoring in just 3 simple steps
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, idx) => (
            <div
              key={idx}
              className="p-8 rounded-3xl bg-white dark:bg-gray-950 border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-md transition-all text-center space-y-4"
            >
              <div className="w-14 h-14 mx-auto rounded-2xl bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                <step.icon className="w-7 h-7" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                {step.title}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}