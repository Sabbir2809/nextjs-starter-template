import Footer from "@/components/common/Footer";
import Navbar from "@/components/common/Navbar";
import TanStackQueryProvider from "@/lib/TanStackQueryProvider";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ToastContainer } from "react-toastify";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Metadata for SEO
export const metadata: Metadata = {
  title: "Next.js Starter Template",
  description: "Next.js Starter Template",
};

// Root layout component
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased suppressHydrationWarning`}>
        {/* TanStack React Query Provider */}
        <TanStackQueryProvider>
          <Navbar></Navbar>
          {/* Main content passed as children */}
          {children}
          <Footer></Footer>
        </TanStackQueryProvider>
        <ToastContainer />
      </body>
    </html>
  );
}
