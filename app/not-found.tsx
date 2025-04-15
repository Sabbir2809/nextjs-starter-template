import Image from "next/image";
import Link from "next/link";

export default function NotFoundPage() {
  return (
    <section className="flex items-center justify-center min--h-screen px-6">
      <div className="text-center w-full max-w-md p-8">
        <Image
          src="/images/404.png"
          alt="Page Not Found"
          width={300}
          height={300}
          className="mx-auto mb-6"
        />
        <h1 className="text-3xl font-semibold text-green-600 mb-4">
          Page Not Found!
        </h1>
        <p className="text-lg text-gray-600 mb-6 leading-relaxed">
          Sorry! The page you are looking for does not exist. Please return to
          the homepage.
        </p>
        <Link
          href="/"
          className="inline-block px-6 py-3 bg-green-600 text-white font-semibold uppercase hover:bg-green-700 transition"
        >
          Go to Homepage
        </Link>
      </div>
    </section>
  );
}
