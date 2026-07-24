"use client";

import { useEffect, useState } from "react";
import { TimeLeftFlashSale } from "../type/type";
import { calculateTimeLeft } from "./utils";

export function useCountdownFlashSale(endTime: Date) {
  const [timeLeft, setTimeLeft] = useState<TimeLeftFlashSale>(
    calculateTimeLeft(endTime),
  );

  useEffect(() => {
    const timer = setInterval(() => {
      const updated = calculateTimeLeft(endTime);
      setTimeLeft(updated);

      if (updated.isExpired) {
        clearInterval(timer);
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [endTime]);

  return timeLeft;
}

export function getItemRandomly(arr: string[], count: number): string[] {
  const shuffled = [...arr].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

