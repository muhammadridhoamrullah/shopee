"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="id">
      <body>
        <div className="min-h-screen flex flex-col justify-center items-center gap-4">
          <h2 className="text-xl font-semibold">A fatal error occurred</h2>
          <p className="text-sm text-white">{error.message}</p>
          <button
            onClick={() => reset()}
            className="bg-[#EE4D2D]/50 text-white px-6 py-2 rounded-md"
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
