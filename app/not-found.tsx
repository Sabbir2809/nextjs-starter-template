import Link from "next/link";

export default function NotFound() {
  return (
    <section className="bg-gray-100 h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-9xl font-extrabold text-red-500 mb-6">404</h1>
        <p className="text-2xl md:text-4xl font-semibold text-gray-800 mb-4">
          Oops! Page Not Found
        </p>
        <Link
          href="/"
          className="inline-flex items-center justify-center bg-red-500 text-white hover:bg-red-600 focus:ring-4 focus:ring-red-300 rounded-lg text-sm px-6 py-3 font-medium shadow-lg transition-all">
          Back to Homepage
        </Link>
      </div>
    </section>
  );
}
