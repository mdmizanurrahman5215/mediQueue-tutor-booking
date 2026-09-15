"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sun,
  Moon,
  Menu,
  X,
  LogOut,
  Loader2,
  ChevronDown,
  LayoutDashboard,
  Users,
  CalendarCheck,
  Plus,
  Sparkles,
} from "lucide-react";

import { authClient } from "@/app/lib/auth-client";
import toast from "react-hot-toast";

export default function Navbar() {
  const router = useRouter();

  const [darkMode, setDarkMode] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  // Theme
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  // Logout
  const handleLogout = async () => {
    const toastId = toast.loading("Logging out...");

    try {
      await authClient.signOut({
        fetchOptions: {
          onSuccess: () => {
            toast.success("Logged out successfully!", {
              id: toastId,
            });

            setIsProfileOpen(false);
            setIsMenuOpen(false);

            router.refresh();
            router.push("/login");
          },

          onError: (ctx) => {
            toast.error(ctx?.error?.message || "Failed to logout!", {
              id: toastId,
            });
          },
        },
      });
    } catch (error) {
      toast.error("Something went wrong!", {
        id: toastId,
      });

      console.error(error);
    }
  };

  const navItems = [
    {
      name: "Home",
      href: "/",
      icon: LayoutDashboard,
    },
    {
      name: "Tutors",
      href: "/tutors",
      icon: Users,
    },
  ];

  const protectedItems = [
    {
      name: "Add Tutor",
      href: "/add-tutor",
      icon: Plus,
    },
    {
      name: "My Tutors",
      href: "/my-tutors",
      icon: Users,
    },
    {
      name: "My Sessions",
      href: "/my-booked-sessions",
      icon: CalendarCheck,
    },
  ];

  return (
    <>
      {/* NAVBAR */}
      <header className="fixed top-4 left-0 right-0 z-50 px-4">
        <nav
          className="
            mx-auto max-w-7xl
            h-[68px]
            px-3 sm:px-5
            rounded-2xl
            border border-gray-200/70 dark:border-white/10
            bg-white/80 dark:bg-gray-950/80
            backdrop-blur-xl
            shadow-lg shadow-gray-900/5 dark:shadow-black/20
          "
        >
          <div className="h-full flex items-center justify-between">
            {/* LOGO */}
            <Link href="/" className="flex items-center gap-3 group shrink-0">
              <div
                className="
                  relative
                  w-10 h-10
                  rounded-xl
                  bg-gradient-to-br
                  from-blue-500
                  via-indigo-500
                  to-purple-600
                  flex items-center justify-center
                  shadow-lg shadow-blue-500/25
                  group-hover:scale-105
                  transition-transform
                "
              >
                <span className="text-white font-black text-xl">M</span>

                <div className="absolute inset-0 rounded-xl bg-white/10" />
              </div>

              <div className="hidden sm:block">
                <h1
                  className="
                    text-lg font-extrabold tracking-tight
                    text-gray-900 dark:text-white
                  "
                >
                  Medi<span className="text-blue-500">Queue</span>
                </h1>

                <p className="text-[9px] uppercase tracking-[0.2em] text-gray-400">
                  Learn smarter
                </p>
              </div>
            </Link>

            {/* DESKTOP NAV */}
            <div className="hidden lg:flex items-center gap-1 ml-8">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="
                    group relative
                    flex items-center gap-2
                    px-4 py-2.5
                    rounded-xl
                    text-sm font-medium
                    text-gray-600 dark:text-gray-300
                    hover:text-blue-600
                    dark:hover:text-blue-400
                    hover:bg-blue-50
                    dark:hover:bg-blue-500/10
                    transition-all
                  "
                >
                  <item.icon className="w-4 h-4 opacity-70 group-hover:opacity-100" />
                  {item.name}
                </Link>
              ))}

              {user &&
                protectedItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="
                      group
                      flex items-center gap-2
                      px-4 py-2.5
                      rounded-xl
                      text-sm font-medium
                      text-gray-600 dark:text-gray-300
                      hover:text-blue-600
                      dark:hover:text-blue-400
                      hover:bg-blue-50
                      dark:hover:bg-blue-500/10
                      transition-all
                    "
                  >
                    <item.icon className="w-4 h-4 opacity-70 group-hover:opacity-100" />
                    {item.name}
                  </Link>
                ))}
            </div>

            {/* RIGHT SIDE */}
            <div className="flex items-center gap-2">
              {/* Theme */}
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="
                  w-10 h-10
                  rounded-xl
                  flex items-center justify-center
                  text-gray-600 dark:text-gray-300
                  hover:bg-gray-100 dark:hover:bg-white/10
                  transition-all
                "
              >
                {darkMode ? (
                  <Sun className="w-[18px] h-[18px] text-amber-400" />
                ) : (
                  <Moon className="w-[18px] h-[18px]" />
                )}
              </button>

              {/* Loading */}
              {isPending ? (
                <Loader2 className="w-5 h-5 animate-spin text-blue-500" />
              ) : user ? (
                /* PROFILE */
                <div className="relative">
                  <button
                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                    className="
                      flex items-center gap-2
                      pl-1 pr-2 py-1
                      rounded-xl
                      border border-gray-200
                      dark:border-white/10
                      hover:bg-gray-100
                      dark:hover:bg-white/5
                      transition-all
                    "
                  >
                    <img
                      src={user?.image || "https://via.placeholder.com/150"}
                      alt={user?.name || "User"}
                      className="
                        w-9 h-9
                        rounded-lg
                        object-cover
                        ring-2 ring-blue-500/20
                      "
                    />

                    <div className="hidden sm:block text-left max-w-[100px]">
                      <p className="text-xs font-semibold text-gray-800 dark:text-white truncate">
                        {user?.name}
                      </p>

                      <p className="text-[10px] text-gray-400 truncate">
                        Account
                      </p>
                    </div>

                    <ChevronDown
                      className={`
                        hidden sm:block
                        w-4 h-4 text-gray-400
                        transition-transform
                        ${isProfileOpen ? "rotate-180" : ""}
                      `}
                    />
                  </button>

                  {/* PROFILE DROPDOWN */}
                  <AnimatePresence>
                    {isProfileOpen && (
                      <motion.div
                        initial={{
                          opacity: 0,
                          y: -8,
                          scale: 0.96,
                        }}
                        animate={{
                          opacity: 1,
                          y: 0,
                          scale: 1,
                        }}
                        exit={{
                          opacity: 0,
                          y: -8,
                          scale: 0.96,
                        }}
                        className="
                          absolute
                          right-0
                          mt-3
                          w-64
                          overflow-hidden
                          rounded-2xl
                          border border-gray-200
                          dark:border-white/10
                          bg-white
                          dark:bg-gray-900
                          shadow-2xl
                        "
                      >
                        {/* User info */}
                        <div className="p-4">
                          <div className="flex items-center gap-3">
                            <img
                              src={
                                user?.image || "https://via.placeholder.com/150"
                              }
                              alt={user?.name || "User"}
                              className="w-11 h-11 rounded-xl object-cover"
                            />

                            <div className="min-w-0">
                              <p className="font-semibold text-sm text-gray-900 dark:text-white truncate">
                                {user?.name}
                              </p>

                              <p className="text-xs text-gray-400 truncate">
                                {user?.email}
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="h-px bg-gray-100 dark:bg-white/10" />

                        {/* Menu */}
                        <div className="p-2">
                          <Link
                            href="/my-booked-sessions"
                            onClick={() => setIsProfileOpen(false)}
                            className="
                              flex items-center gap-3
                              px-3 py-2.5
                              rounded-xl
                              text-sm
                              text-gray-600
                              dark:text-gray-300
                              hover:bg-gray-100
                              dark:hover:bg-white/5
                              transition
                            "
                          >
                            <CalendarCheck className="w-4 h-4" />
                            My Sessions
                          </Link>

                          <button
                            onClick={handleLogout}
                            className="
                              w-full
                              flex items-center gap-3
                              px-3 py-2.5
                              rounded-xl
                              text-sm
                              text-red-500
                              hover:bg-red-50
                              dark:hover:bg-red-500/10
                              transition
                            "
                          >
                            <LogOut className="w-4 h-4" />
                            Logout
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                /* AUTH BUTTONS */
                <div className="hidden sm:flex items-center gap-2">
                  <Link
                    href="/login"
                    className="
                      px-4 py-2.5
                      rounded-xl
                      text-sm font-semibold
                      text-gray-600
                      dark:text-gray-300
                      hover:bg-gray-100
                      dark:hover:bg-white/5
                      transition
                    "
                  >
                    Login
                  </Link>

                  <Link
                    href="/register"
                    className="
                      group
                      relative
                      overflow-hidden
                      px-5 py-2.5
                      rounded-xl
                      bg-gradient-to-r
                      from-blue-600
                      to-indigo-600
                      text-white
                      text-sm font-semibold
                      shadow-lg shadow-blue-500/20
                      hover:shadow-blue-500/30
                      transition-all
                    "
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      <Sparkles className="w-4 h-4" />
                      Get Started
                    </span>
                  </Link>
                </div>
              )}

              {/* MOBILE MENU BUTTON */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="
                  lg:hidden
                  w-10 h-10
                  rounded-xl
                  flex items-center justify-center
                  text-gray-600 dark:text-gray-300
                  hover:bg-gray-100
                  dark:hover:bg-white/10
                "
              >
                {isMenuOpen ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>
        </nav>

        {/* MOBILE MENU */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{
                opacity: 0,
                y: -10,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                y: -10,
              }}
              className="
                lg:hidden
                mt-2
                rounded-2xl
                border border-gray-200
                dark:border-white/10
                bg-white/95
                dark:bg-gray-950/95
                backdrop-blur-xl
                shadow-2xl
                p-3
              "
            >
              {[...navItems, ...(user ? protectedItems : [])].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="
                      flex items-center gap-3
                      px-4 py-3
                      rounded-xl
                      text-sm font-medium
                      text-gray-600
                      dark:text-gray-300
                      hover:bg-blue-50
                      dark:hover:bg-blue-500/10
                      hover:text-blue-600
                      dark:hover:text-blue-400
                      transition
                    "
                >
                  <item.icon className="w-4 h-4" />
                  {item.name}
                </Link>
              ))}

              {!user && !isPending && (
                <div className="grid grid-cols-2 gap-2 mt-3 pt-3 border-t border-gray-100 dark:border-white/10">
                  <Link
                    href="/login"
                    onClick={() => setIsMenuOpen(false)}
                    className="
                      py-2.5
                      text-center
                      rounded-xl
                      bg-gray-100
                      dark:bg-white/5
                      text-sm font-semibold
                    "
                  >
                    Login
                  </Link>

                  <Link
                    href="/register"
                    onClick={() => setIsMenuOpen(false)}
                    className="
                      py-2.5
                      text-center
                      rounded-xl
                      bg-blue-600
                      text-white
                      text-sm font-semibold
                    "
                  >
                    Register
                  </Link>
                </div>
              )}

              {user && (
                <button
                  onClick={handleLogout}
                  className="
                    w-full
                    mt-2
                    flex items-center gap-3
                    px-4 py-3
                    rounded-xl
                    text-sm font-medium
                    text-red-500
                    hover:bg-red-50
                    dark:hover:bg-red-500/10
                  "
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Prevent content from hiding under fixed navbar */}
      <div className="h-[92px]" />
    </>
  );
}
