"use client";

import { useCountdownFlashSale } from "@/src/helpers/hooks";
import { flashSaleEndTime, pad } from "@/src/helpers/utils";

export default function TimerFlashSale() {
  const { hours, minutes, seconds, isExpired } =
    useCountdownFlashSale(flashSaleEndTime);

  if (isExpired) {
    return (
      <span className="bg-gray-400 px-2 py-1 rounded text-white text-sm">
        Berakhir
      </span>
    );
  }
  return (
    <div className="flex items-center gap-1">
      <span className="bg-[#EE4D2D] text-white text-xs font-bold px-1.5 py-0.5 rounded">
        {pad(hours)}
      </span>
      <span className="text-white font-bold">:</span>
      <span className="bg-[#EE4D2D] text-white text-xs font-bold px-1.5 py-0.5 rounded">
        {pad(minutes)}
      </span>
      <span className="text-white font-bold">:</span>
      <span className="bg-[#EE4D2D] text-white text-xs font-bold px-1.5 py-0.5 rounded">
        {pad(seconds)}
      </span>
    </div>
  );
}
