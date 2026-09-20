"use client";

import Link from "next/link";
import {
  LayoutDashboard,
  Users,
  Plus,
  CalendarCheck,
  Sparkles,
  Heart,
  Mail,
  ArrowRight,
  ShieldCheck,
  Globe,
  CheckCircle2,
} from "lucide-react";
import { authClient } from "@/app/lib/auth-client";
import { useState } from "react";

export default function Footer() {
  const { data: session } = authClient.useSession();
  const user = session?.user;
  const [subscribed, setSubscribed] = useState(false);
  const [email, setEmail] = useState("");

// ./app/components/layout/Footer.jsx

const handleSubscribe = (e) => {
  e.preventDefault();
  if (email) {
    setSubscribed(true);
  }
};

  const navigation = {
    platform: [
      { name: "Home Overview", href: "/", icon: LayoutDashboard },
      { name: "Explore Tutors", href: "/tutors", icon: Users },
      { name: "How It Works", href: "/#how-it-works" },
      { name: "Pricing & Plans", href: "/#pricing" },
    ],
    account: [
      { name: "Tutor Profile Setup", href: "/add-tutor", icon: Plus },
      { name: "My Saved Tutors", href: "/my-tutors", icon: Users },
      { name: "Session Bookings", href: "/my-booked-sessions", icon: CalendarCheck },
    ],
    company: [
      { name: "About MediQueue", href: "/about" },
      { name: "Careers", href: "/careers" },
      { name: "Contact Support", href: "/contact" },
      { name: "Trust & Safety", href: "/trust" },
    ],
    legal: [
      { name: "Privacy Policy", href: "/privacy" },
      { name: "Terms of Service", href: "/terms" },
      { name: "Cookie Settings", href: "/cookies" },
    ],
  };

  return (
    <footer className="w-full mt-24 pb-8 px-4 sm:px-6 lg:px-8">
      <div
        className="
          mx-auto max-w-7xl
          rounded-3xl
          border border-gray-200/80 dark:border-white/10
          bg-white/80 dark:bg-gray-950/80
          backdrop-blur-xl
          shadow-2xl shadow-gray-900/5 dark:shadow-black/40
          p-8 sm:p-12 lg:p-16
        "
      >
        {/* TOP SECTION: NEWSLETTER CTA */}
        <div className="pb-12 border-b border-gray-200/60 dark:border-white/10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-6 space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/50 border border-blue-200/60 dark:border-blue-800/40 text-blue-600 dark:text-blue-400 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Stay Ahead in Medical Education</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              Subscribe to the MediQueue Dispatch
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 max-w-md">
              Receive weekly updates on top-rated tutors, specialized medical study resources, and exam prep insights.
            </p>
          </div>

          <div className="lg:col-span-6">
            {subscribed ? (
              <div className="flex items-center gap-3 p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300">
                <CheckCircle2 className="w-5 h-5 shrink-0" />
                <span className="text-sm font-medium">
                  Thank you for subscribing! Check your inbox for your confirmation email.
                </span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your academic email address"
                  className="
                    flex-1 px-4 py-3 rounded-xl text-sm
                    bg-gray-50 dark:bg-gray-900
                    border border-gray-200 dark:border-gray-800
                    text-gray-900 dark:text-white
                    placeholder:text-gray-400 dark:placeholder:text-gray-500
                    focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500
                    transition-all
                  "
                />
                <button
                  type="submit"
                  className="
                    inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl
                    bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600
                    hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700
                    text-white font-semibold text-sm shadow-md shadow-blue-500/20
                    transition-all active:scale-[0.98] shrink-0
                  "
                >
                  <span>Subscribe</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* MAIN NAVIGATION MATRIX */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 py-12 border-b border-gray-200/60 dark:border-white/10">
          {/* BRAND COLUMN */}
          <div className="md:col-span-4 space-y-5">
            <Link href="/" className="flex items-center gap-3 group w-fit">
              <div
                className="
                  relative w-10 h-10 rounded-xl
                  bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600
                  flex items-center justify-center
                  shadow-lg shadow-blue-500/25
                  group-hover:scale-105 transition-transform
                "
              >
                <span className="text-white font-black text-xl">M</span>
                <div className="absolute inset-0 rounded-xl bg-white/10" />
              </div>

              <div>
                <h2 className="text-xl font-extrabold tracking-tight text-gray-900 dark:text-white">
                  Medi<span className="text-blue-600 dark:text-blue-400">Queue</span>
                </h2>
                <p className="text-[9px] uppercase tracking-[0.25em] font-semibold text-gray-400">
                  Medical Education Platform
                </p>
              </div>
            </Link>

            <p className="text-sm text-gray-600 dark:text-gray-400 max-w-sm leading-relaxed">
              Connecting medical students with verified expert tutors through intelligent queue scheduling and seamless session management.
            </p>

            {/* SECURITY & VERIFICATION BADGES */}
            <div className="flex items-center gap-4 pt-2 text-xs text-gray-500 dark:text-gray-400">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-500" /> Verified Tutors
              </span>
              <span className="flex items-center gap-1.5">
                <Globe className="w-4 h-4 text-blue-500" /> Global Network
              </span>
            </div>

            {/* SOCIAL CHANNELS */}
            <div className="flex items-center gap-2 pt-2">
              {/* Twitter / X */}
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Twitter"
                className="
                  w-9 h-9 rounded-xl
                  border border-gray-200 dark:border-white/10
                  bg-gray-50/50 dark:bg-gray-900/50
                  flex items-center justify-center
                  text-gray-600 dark:text-gray-400
                  hover:text-blue-600 dark:hover:text-blue-400
                  hover:border-blue-500/40 hover:bg-blue-50 dark:hover:bg-blue-500/10
                  transition-all
                "
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>

              {/* GitHub */}
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                className="
                  w-9 h-9 rounded-xl
                  border border-gray-200 dark:border-white/10
                  bg-gray-50/50 dark:bg-gray-900/50
                  flex items-center justify-center
                  text-gray-600 dark:text-gray-400
                  hover:text-blue-600 dark:hover:text-blue-400
                  hover:border-blue-500/40 hover:bg-blue-50 dark:hover:bg-blue-500/10
                  transition-all
                "
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                </svg>
              </a>

              {/* LinkedIn */}
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="
                  w-9 h-9 rounded-xl
                  border border-gray-200 dark:border-white/10
                  bg-gray-50/50 dark:bg-gray-900/50
                  flex items-center justify-center
                  text-gray-600 dark:text-gray-400
                  hover:text-blue-600 dark:hover:text-blue-400
                  hover:border-blue-500/40 hover:bg-blue-50 dark:hover:bg-blue-500/10
                  transition-all
                "
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>

              {/* Email Support */}
              <a
                href="mailto:support@mediqueue.com"
                aria-label="Email Support"
                className="
                  w-9 h-9 rounded-xl
                  border border-gray-200 dark:border-white/10
                  bg-gray-50/50 dark:bg-gray-900/50
                  flex items-center justify-center
                  text-gray-600 dark:text-gray-400
                  hover:text-blue-600 dark:hover:text-blue-400
                  hover:border-blue-500/40 hover:bg-blue-50 dark:hover:bg-blue-500/10
                  transition-all
                "
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* LINK GROUPS */}
          <div className="md:col-span-8 grid grid-cols-2 sm:grid-cols-3 gap-8">
            {/* Platform Column */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-gray-900 dark:text-white mb-4">
                Platform
              </h4>
              <ul className="space-y-3">
                {navigation.platform.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="
                        text-sm text-gray-600 dark:text-gray-400
                        hover:text-blue-600 dark:hover:text-blue-400
                        inline-flex items-center gap-2 transition-colors
                      "
                    >
                      {item.icon && <item.icon className="w-3.5 h-3.5 text-gray-400" />}
                      <span>{item.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Dashboard / Workspace Column */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-gray-900 dark:text-white mb-4">
                Workspace
              </h4>
              <ul className="space-y-3">
                {user ? (
                  navigation.account.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className="
                          text-sm text-gray-600 dark:text-gray-400
                          hover:text-blue-600 dark:hover:text-blue-400
                          inline-flex items-center gap-2 transition-colors
                        "
                      >
                        {item.icon && <item.icon className="w-3.5 h-3.5 text-gray-400" />}
                        <span>{item.name}</span>
                      </Link>
                    </li>
                  ))
                ) : (
                  <>
                    <li>
                      <Link
                        href="/login"
                        className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                      >
                        Sign In
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/register"
                        className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                      >
                        Create Account
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/add-tutor"
                        className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                      >
                        Become a Tutor
                      </Link>
                    </li>
                  </>
                )}
              </ul>
            </div>

            {/* Company & Organization */}
            <div className="col-span-2 sm:col-span-1">
              <h4 className="text-xs font-bold uppercase tracking-wider text-gray-900 dark:text-white mb-4">
                Organization
              </h4>
              <ul className="space-y-3">
                {navigation.company.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* LEGAL & COPYRIGHT BAR */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500 dark:text-gray-400">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4">
            <p>© {new Date().getFullYear()} MediQueue Technologies, Inc. All rights reserved.</p>
            <div className="hidden md:flex items-center gap-4 border-l border-gray-200 dark:border-white/10 pl-4">
              {navigation.legal.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="hover:text-gray-900 dark:hover:text-white transition-colors"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          <p className="flex items-center gap-1.5 font-medium">
            Designed with <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" /> for medical scholars worldwide.
          </p>
        </div>
      </div>
    </footer>
  );
}