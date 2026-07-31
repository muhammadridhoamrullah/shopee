import { getStarFills } from "@/src/utils/rating";
import { FaStar } from "react-icons/fa";

interface Props {
  rating: number;
  total?: number;
}

export default function StarRating({ rating, total = 5 }: Props) {
  const starFills = getStarFills(rating, total);

  return (
    <div className="flex items-center gap-0.5">
      {starFills.map((percent, index) => (
        <div key={index} className="relative w-4 h-4">
          {/* Awal Lapis Bawah Abu */}
          <FaStar className="w-4 h-4 shrink-0  text-gray-300" />
          {/* Akhir Lapis Bawah Abu */}

          {/* Awal Lapis Atas Kuning */}
          <div
            className="absolute left-0 top-0 h-full overflow-hidden"
            style={{ width: `${percent}%` }}
          >
            <FaStar className="w-4 h-4 shrink-0  text-yellow-500" />
          </div>
          {/* Akhir Lapis Atas Kuning */}
        </div>
      ))}
    </div>
  );
}
