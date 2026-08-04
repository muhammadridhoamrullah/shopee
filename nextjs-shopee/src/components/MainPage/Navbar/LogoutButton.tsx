"use client";

import { useAppDispatch, useAppSelector } from "@/src/store/hooks";
import { doLogout } from "@/src/store/slice/logoutSlice";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "react-toastify";

interface Props {
  user: {
    _id: string;
    username: string;
    email: string;
    role: string;
  };
}

export default function LogoutButton({ user }: Props) {
  const { dataLogout, errorLogout, loadingLogout } = useAppSelector(
    (state) => state.logout,
  );
  const router = useRouter();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (errorLogout) {
      toast.error(errorLogout);
    }
  }, [errorLogout]);

  useEffect(() => {
    if (dataLogout) {
      toast.success("Successfully logged out!");
      router.refresh();
    }
  }, [dataLogout, router]);

  function handleLogout() {
    // Panggil API logout

    dispatch(doLogout());
  }

  const foto =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYCvh28vxeu-b1NkyId4bXXkRK1NFzjKPBzpskKWOTPZzql6B0mABj1yk&s=10";

  return (
    <button
      className="bg-red-500 flex items-center gap-1 px-2 py-1 rounded-md hover:bg-red-600 transition-colors duration-300"
      onClick={handleLogout}
    >
      {/* Awal Foto Profil */}
      <Image
        src={foto}
        alt="Profile Picture"
        width={20}
        height={10}
        className="rounded-full object-cover"
      />
      {/* Akhir Foto Profil */}

      {/* Awal Username */}
      <span>{user.username}</span>
      {/* Akhir Username */}
    </button>
  );
}
