import Image from "next/image";
import { Star, Quote } from "lucide-react";

export default function Testimonials() {
  const reviews = [
    {
      id: "1",
      name: "Dr. Ayesha Rahman",
      role: "Medical Resident",
      image: "https://images.unsplash.com/photo-1594824813566-88855ce7896c?w=150&auto=format&fit=crop&q=80",
      review:
        "Finding an Anatomy tutor who could match my tight hospital schedule was impossible before MediQueue. The queue scheduling system saved my exam preparation!",
      rating: 5,
    },
    {
      id: "2",
      name: "Tanvir Ahmed",
      role: "3rd Year MBBS Student",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
      review:
        "Booking 1-on-1 sessions and getting instant digital session tokens makes the process so smooth. The Biochemistry tutors here are world-class.",
      rating: 5,
    },
    {
      id: "3",
      name: "Nusrat Jahan",
      role: "HSC Science Candidate",
      image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80",
      review:
        "The physics sessions helped me clear my core concepts for medical admission tests. Highly recommended for any serious medical aspirant!",
      rating: 5,
    },
  ];

  return (
    <section className="py-16 px-4">
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="text-center max-w-xl mx-auto space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400">
            Student Stories
          </span>
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">
            Trusted by Hundreds of Medical Scholars
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="
                relative p-8 rounded-3xl
                border border-gray-200/80 dark:border-white/10
                bg-white/80 dark:bg-gray-950/80
                backdrop-blur-xl shadow-sm
                flex flex-col justify-between space-y-6
              "
            >
              <Quote className="absolute top-6 right-6 w-8 h-8 text-blue-500/10 dark:text-blue-400/10" />

              <div className="space-y-4">
                {/* Rating Stars */}
                <div className="flex gap-1">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-amber-400 text-amber-400"
                    />
                  ))}
                </div>

                <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed italic">
                  "{rev.review}"
                </p>
              </div>

              {/* User Profile Info with Next.js Image */}
              <div className="flex items-center gap-3 pt-4 border-t border-gray-100 dark:border-white/10">
                <div className="relative w-11 h-11 shrink-0">
                  <Image
                    src={rev.image}
                    alt={rev.name}
                    width={44}
                    height={44}
                    quality={80}
                    className="rounded-xl object-cover ring-2 ring-blue-500/20"
                  />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-gray-900 dark:text-white">
                    {rev.name}
                  </h3>
                  <p className="text-xs text-gray-400">{rev.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}