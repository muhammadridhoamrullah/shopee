"use client";

import { useAppDispatch, useAppSelector } from "@/src/store/hooks";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { toast } from "react-toastify";
import { VscLoading } from "react-icons/vsc";
import { doVerifyEmail } from "@/src/store/slice/verifyEmailSlice";

export default function VerifyEmail() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const email = searchParams.get("email");
  const router = useRouter();
  const dispatch = useAppDispatch();

  const {
    loadingVerifyEmail,
    errorVerifyEmail,
    dataVerifyEmail,
    isVerifyEmail,
  } = useAppSelector((state) => state.verifyEmail);

  // useEffect untuk errorVerifyEmail
  useEffect(() => {
    if (errorVerifyEmail) {
      toast.error(errorVerifyEmail);
    }
  }, [errorVerifyEmail]);

  // useEffect untuk redirect ke halaman login jika email sudah terverifikasi
  useEffect(() => {
    if (isVerifyEmail) {
      toast.success("Email verified successfully! Please login.");
      router.push("/login");
    }
  }, [isVerifyEmail, router]);

  async function clickVerifyEmail() {
    if (!token || !email) {
      toast.error("Token or email is missing");
      return;
    }

    dispatch(doVerifyEmail(token));
  }

  return (
    <div className="bg-[#EE4D2D] w-full min-h-screen flex justify-center items-center">
      {/* Awal Kotak */}
      <div className="bg-white  w-120 h-85 rounded-md flex flex-col justify-center items-center gap-4 p-4">
        {/* Awal Icon Checkmark */}
        <FaCheckCircle className="text-[#EE4D2D] text-6xl" />
        {/* Akhir Icon Checkmark */}
        {/* Awal Text Verify Your Email */}
        <p className="text-2xl text-[#EE4D2D] font-bold">Verify Your Email</p>
        {/* Akhir Text Verify Your Email */}
        {/* Awal Text Email Verified */}
        <div className="text-center text-sm text-gray-600">
          You have entered <span className="font-semibold">{email}</span> as the
          email address. Please check your email for a verification link to
          complete the registration process.
        </div>
        {/* Akhir Text Email Verified */}
        {/* Awal Tombol Verify */}
        <button
          type="button"
          disabled={loadingVerifyEmail}
          className="mt-4 bg-[#EE4D2D] text-white w-full h-10 text-center rounded-md hover:bg-[#d43c1a] cursor-pointer"
          onClick={clickVerifyEmail}
        >
          {loadingVerifyEmail ? (
            <VscLoading className="animate-spin mx-auto text-2xl" />
          ) : (
            "Verify Your Email"
          )}
        </button>
        {/* Akhir Tombol Verify */}
      </div>
      {/* Akhir Kotak */}
    </div>
  );
}
