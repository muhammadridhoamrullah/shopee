export default function LoginLoading() {
  return (
    <div className="w-full min-h-screen bg-[#EE4D2D] flex flex-col animate-pulse">
      {/* Skeleton Header */}
      <div className="w-full h-20 bg-white" />

      <div className="w-full h-129.5 flex justify-around items-center px-30 py-4">
        {/* Skeleton Logo */}
        <div className="w-full h-full flex justify-end items-center pr-10">
          <div className="w-[50%] h-[50%] bg-white/20 rounded-md" />
        </div>

        {/* Skeleton Form Card */}
        <div className="bg-white rounded-xl w-175 h-full overflow-hidden px-6 py-5 flex flex-col justify-between">
          <div className="w-full h-15 flex justify-between items-center">
            <div className="h-6 w-20 bg-gray-200 rounded" />
            <div className="h-10 w-10 bg-gray-200 rounded" />
          </div>

          <div className="w-full flex flex-col gap-4">
            <div className="h-10 bg-gray-200 rounded-md" />
            <div className="h-10 bg-gray-200 rounded-md" />
            <div className="h-12 bg-gray-200 rounded-md mt-4" />
          </div>

          <div className="w-full flex justify-center items-center gap-4">
            <div className="w-full h-px bg-gray-200" />
            <div className="h-3 w-6 bg-gray-200 rounded" />
            <div className="w-full h-px bg-gray-200" />
          </div>

          <div className="w-full flex justify-between items-center gap-4">
            <div className="h-10 w-full bg-gray-200 rounded-md" />
            <div className="h-10 w-full bg-gray-200 rounded-md" />
          </div>
        </div>
      </div>
    </div>
  );
}
