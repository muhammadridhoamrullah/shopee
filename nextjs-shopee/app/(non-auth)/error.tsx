"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="w-full min-h-screen bg-[#EE4D2D] flex flex-col justify-center items-center gap-4">
      <h2 className="text-xl font-semibold">An error occurred</h2>
      <p className="text-sm text-white">{error.message}</p>
      <button
        onClick={() => reset()}
        className="bg-[#EE4D2D]/50 text-white px-6 py-2 rounded-md"
      >
        Try again
      </button>
    </div>
  );
}
