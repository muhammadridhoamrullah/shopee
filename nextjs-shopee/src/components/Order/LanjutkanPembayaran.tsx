"use client";

import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

interface Props {
  snapToken: string;
  orderId: string;
}

export default function LanjutkanPembayaran({ snapToken, orderId }: Props) {
  const router = useRouter();

  function handleLanjutkanPembayaran() {
    if (window.snap) {
      window.snap.pay(snapToken, {
        onSuccess: () => {
          toast.success("Pembayaran berhasil");
          router.push(`/order/${orderId}`);
          router.refresh();
        },
        onPending: () => {
          toast.info("Menunggu pembayaran");
          router.push(`/order/${orderId}`);
        },
        onError: () => {
          toast.error("Pembayaran gagal, silahkan coba lagi");
        },
        onClose: () => {
          toast.info("Anda menutup popup pembayaran");
        },
      });
    }
  }

  return (
    <button
      onClick={handleLanjutkanPembayaran}
      className="bg-[#EE4D2D] px-4 py-2 rounded-md font-semibold text-white hover:bg-[#d13f1f] transition-colors duration-300 ease-in-out"
    >
      Lanjutkan Pembayaran
    </button>
  );
}
