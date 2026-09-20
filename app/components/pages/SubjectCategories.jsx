import Link from "next/link";
import {
  Stethoscope,
  Atom,
  Dna,
  Calculator,
  BookOpen,
  Brain,
  Languages,
  Microscope,
  ArrowRight,
} from "lucide-react";

export default function SubjectCategories() {
  const categories = [
    {
      name: "Medical Science",
      icon: Stethoscope,
      tutorsCount: "12+ Tutors",
      href: "/tutors?subject=Medical%20Science",
      color: "from-blue-500/10 to-indigo-500/10 text-blue-600 dark:text-blue-400",
    },
    {
      name: "Biology & Biochemistry",
      icon: Dna,
      tutorsCount: "18+ Tutors",
      href: "/tutors?subject=Biology",
      color: "from-emerald-500/10 to-teal-500/10 text-emerald-600 dark:text-emerald-400",
    },
    {
      name: "Physics",
      icon: Atom,
      tutorsCount: "15+ Tutors",
      href: "/tutors?subject=Physics",
      color: "from-purple-500/10 to-pink-500/10 text-purple-600 dark:text-purple-400",
    },
    {
      name: "Chemistry",
      icon: Microscope,
      tutorsCount: "14+ Tutors",
      href: "/tutors?subject=Chemistry",
      color: "from-amber-500/10 to-orange-500/10 text-amber-600 dark:text-amber-400",
    },
    {
      name: "Mathematics",
      icon: Calculator,
      tutorsCount: "20+ Tutors",
      href: "/tutors?subject=Mathematics",
      color: "from-cyan-500/10 to-blue-500/10 text-cyan-600 dark:text-cyan-400",
    },
    {
      name: "English & IELTS",
      icon: Languages,
      tutorsCount: "10+ Tutors",
      href: "/tutors?subject=English",
      color: "from-rose-500/10 to-red-500/10 text-rose-600 dark:text-rose-400",
    },
  ];

  return (
    <section className="py-16 px-4">
      <div className="max-w-7xl mx-auto space-y-10">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400">
              Browse by Subject
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white mt-1">
              Explore Popular Disciplines
            </h2>
          </div>
          <Link
            href="/tutors"
            className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 dark:text-blue-400 hover:gap-3 transition-all"
          >
            <span>View All Subjects</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat, idx) => {
            const Icon = cat.icon;
            return (
              <Link
                key={idx}
                href={cat.href}
                className="
                  group relative p-6 rounded-3xl
                  border border-gray-200/80 dark:border-white/10
                  bg-white/80 dark:bg-gray-950/80
                  backdrop-blur-xl
                  hover:border-blue-500/50 dark:hover:border-blue-500/50
                  shadow-sm hover:shadow-xl hover:shadow-blue-500/5
                  transition-all duration-300
                "
              >
                <div className="flex items-start justify-between">
                  <div
                    className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${cat.color} flex items-center justify-center`}
                  >
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-medium text-gray-400 dark:text-gray-500">
                    {cat.tutorsCount}
                  </span>
                </div>

                <div className="mt-6 space-y-1">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {cat.name}
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Connect with expert instructors
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}