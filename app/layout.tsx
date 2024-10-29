import TanStackQueryProvider from "@/lib/TanStackQueryProvider";
import type { Metadata } from "next";
import localFont from "next/font/local";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./globals.css";

// Local Fonts
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

// Metadata configuration for the HTML document
export const metadata: Metadata = {
  title: "Next Js Template",
  description: "Next Js Template",
};

// Root layout component
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {/* Main provider component for TanStack React Query */}
        <TanStackQueryProvider>
          {/* Wrapping the main content passed as children */}
          {children}
        </TanStackQueryProvider>
        <ToastContainer />
      </body>
    </html>
  );
}
