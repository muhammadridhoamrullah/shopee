import Link from "next/link";

export default function NotFound() {
  return (
    <div className="w-full min-h-screen bg-[#EE4D2D] flex flex-col justify-center items-center gap-4 text-white">
      <h2 className="text-3xl font-semibold">Page Not Found</h2>
      <p className="text-sm text-gray-300">
        Sorry, the page you are looking for does not exist.
      </p>
      <Link
        href="/"
        className="bg-white text-[#EE4D2D] px-4 py-2 rounded-md font-semibold"
      >
        Back to Home
      </Link>
    </div>
  );
}
