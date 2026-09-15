import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "../app/components/layout/Navbar";
import { Toaster } from "react-hot-toast";



const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MediQueue Tutor Booking",
  description: "MediQueue is a tutor booking platform that helps students discover qualified tutors, view their profiles, check availability, and book personalized learning sessions.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body className="bg-slate-950 text-slate-100 antialiased min-h-screen flex flex-col">
        {/* Navbar */}
        <Navbar />

        {/* Main Content Area - নির্দিষ্ট Width ধরে রাখবে */}
        <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {children}
        </main>

        {/* Footer */}
        {/* <Footer /> */}
      </body>
    </html>
  );
}
