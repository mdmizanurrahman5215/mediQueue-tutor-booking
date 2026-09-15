'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules';
import { ArrowRight, BookOpen, Clock, ShieldCheck } from 'lucide-react';

export default function Banner() {
  // Slides Data tailored for MediQueue Assignment Theme
  const slides = [
    {
      id: 1,
      title: "Find Expert Tutors for Any Subject Easily",
      subtitle: "Eliminate manual scheduling and book verified tutors with real-time slot tracking and instant session tokens.",
      badge: "Smart Scheduling",
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&auto=format&fit=crop&q=80",
    },
    {
      id: 2,
      title: "1-on-1 Online & Offline Interactive Sessions",
      subtitle: "Connect with top academic tutors from renowned institutions like BUET, DU, and BRAC University.",
      badge: "Top Rated Educators",
      image: "https://images.unsplash.com/photo-1577896851231-70ef18881754?w=1200&auto=format&fit=crop&q=80",
    },
    {
      id: 3,
      title: "No Time Slot Conflicts, Guaranteed Slots",
      subtitle: "Real-time session availability ensures smooth booking without double-booking hassles.",
      badge: "Instant Confirmation",
      image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=1200&auto=format&fit=crop&q=80",
    },
  ];

  return (
    <section className="relative w-full overflow-hidden bg-gray-900 text-white">
      <Swiper
        modules={[Navigation, Pagination, Autoplay, EffectFade]}
        effect="fade"
        speed={1000}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        navigation={true}
        loop={true}
        className="w-full h-[550px] sm:h-[600px] lg:h-[650px] mySwiper"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="relative w-full h-full flex items-center">
              
              {/* Background Image with Dark Overlay */}
              <div 
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: `url(${slide.image})` }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-gray-950/90 via-gray-900/80 to-transparent" />
              </div>

              {/* Animated Content using Framer Motion */}
              <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10">
                <motion.div 
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  viewport={{ once: false }}
                  className="max-w-2xl space-y-6"
                >
                  {/* Category Badge */}
                  <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-blue-600/30 border border-blue-500/50 backdrop-blur-md">
                    <BookOpen className="w-4 h-4 text-blue-400" />
                    <span className="text-xs sm:text-sm font-medium text-blue-300">
                      {slide.badge}
                    </span>
                  </div>

                  {/* Slide Title */}
                  <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight">
                    {slide.title}
                  </h1>

                  {/* Subtitle */}
                  <p className="text-base sm:text-lg text-gray-300 line-clamp-3">
                    {slide.subtitle}
                  </p>

                  {/* CTA Button (Document Requirement: Redirects to /tutors) */}
                  <div className="pt-2 flex flex-wrap gap-4 items-center">
                    <Link
                      href="/tutors"
                      className="inline-flex items-center justify-center space-x-2 px-6 py-3.5 rounded-xl font-semibold bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-600/30 transition-all hover:scale-105 active:scale-95"
                    >
                      <span>Browse All Tutors</span>
                      <ArrowRight className="w-5 h-5" />
                    </Link>
                  </div>
                </motion.div>
              </div>

            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}