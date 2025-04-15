import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar";
import TanStackQueryProvider from "@/lib/TanStackQuery";
import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { ToastContainer } from "react-toastify";
import "./globals.css";

// Geist Sans font
const geistSans = Geist({
  variable: "--font-geist-sans",
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
        className={`${geistSans.variable} antialiased suppressHydrationWarning`}
      >
        {/* TanStack React Query */}
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
