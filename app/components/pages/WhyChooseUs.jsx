import { ShieldCheck, CalendarRange, Clock, Users, Award, Zap } from "lucide-react";

export default function WhyChooseUs() {
  const features = [
    {
      icon: ShieldCheck,
      title: "100% Verified Tutors",
      desc: "Every tutor undergoes thorough background and credential verification from top medical colleges & universities.",
    },
    {
      icon: CalendarRange,
      title: "Smart Queue Scheduling",
      desc: "Our automated slot booking prevents time conflicts and eliminates double bookings completely.",
    },
    {
      icon: Clock,
      title: "Instant Session Tokens",
      desc: "Receive digital session tokens instantly upon booking confirmation for smooth, trackable attendance.",
    },
    {
      icon: Users,
      title: "1-on-1 Personalized Care",
      desc: "Tailored lesson plans designed around your exam schedules, weakness areas, and learning pace.",
    },
    {
      icon: Award,
      title: "Top Tier Academics",
      desc: "Learn directly from high achievers, residents, and domain experts with proven teaching track records.",
    },
    {
      icon: Zap,
      title: "Flexible Online Learning",
      desc: "Join sessions online or request in-person home tutoring according to your personal preference.",
    },
  ];

  return (
    <section className="py-16 px-4 bg-gray-50/50 dark:bg-gray-900/40">
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400">
            Why MediQueue
          </span>
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">
            Designed for Smarter & Conflict-Free Learning
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            We solve traditional tutoring hassles with smart technology and guaranteed educational quality.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <div
                key={idx}
                className="
                  p-6 rounded-3xl
                  border border-gray-200/80 dark:border-white/10
                  bg-white dark:bg-gray-950
                  shadow-sm space-y-3
                "
              >
                <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-gray-900 dark:text-white">
                  {feature.title}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                  {feature.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}