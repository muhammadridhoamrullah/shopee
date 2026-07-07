"use client";

import { BsQrCode } from "react-icons/bs";
import Link from "next/link";
import { RiEyeCloseLine } from "react-icons/ri";
import { RiEyeLine } from "react-icons/ri";
import React, { useEffect, useState } from "react";
import { FaFacebook } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";
import Footer from "@/src/components/Footer";
import { useAppDispatch, useAppSelector } from "@/src/store/hooks";
import { doLogin } from "@/src/store/slice/loginSlice";
import { useRouter } from "next/navigation";
import NonAuthHeader from "@/src/components/auth/NonAuthHeader";
import { toast } from "react-toastify";
import { VscLoading } from "react-icons/vsc";

export default function LoginClient() {
  const { loadingLogin, errorLogin, dataLogin, isLogin } = useAppSelector(
    (state) => state.login,
  );
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [formDataLogin, setFormDataLogin] = useState({
    identifier: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  // useEffect untuk redirect ke halaman dashboard jika login berhasil
  useEffect(() => {
    if (isLogin) {
      toast.success("Successfully logged in!");
      router.push("/dashboard");
    }
  }, [isLogin, router]);

  // useEffect untuk menampilkan error login jika ada
  useEffect(() => {
    if (errorLogin) {
      toast.error(errorLogin);
    }
  }, [errorLogin]);

  function togglePassword() {
    setShowPassword(!showPassword);
  }

  function changeHandler(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;

    setFormDataLogin({
      ...formDataLogin,
      [name]: value,
    });
  }

  async function submitHandler(
    e: React.SyntheticEvent<HTMLFormElement, SubmitEvent>,
  ) {
    e.preventDefault();
    dispatch(doLogin(formDataLogin));
  }

  return (
    <div className="w-full min-h-screen bg-[#EE4D2D] flex flex-col">
      {/* Awal Navbar */}
      <NonAuthHeader />
      {/* Akhir Navbar */}

      {/* Awal Form */}
      <div className="w-full h-129.5 flex justify-around items-center px-30 py-4">
        {/* Awal Logo Shopee */}
        <div className="w-full h-full flex justify-end items-center pr-10 relative">
          <img
            src={"/shopee3.png"}
            alt="Logo Shopee"
            className="absolute w-[50%] h-[50%] object-contain"
          />
        </div>
        {/* Akhir Logo Shopee */}

        {/* Awal Form Login */}
        <div className="bg-white rounded-xl w-175 h-full overflow-hidden px-6 py-5 flex flex-col  justify-between">
          {/* Awal Log In & QR */}
          <div className="w-full h-15 flex justify-between items-center">
            {/* Awal Log In */}
            <div className="text-lg text-[#EE4D2D] font-semibold">Log In</div>
            {/* Akhir Log In */}

            {/* Awal QR Code */}
            <BsQrCode className="text-[#EE4D2D] text-5xl" />
            {/* Akhir QR Code */}
          </div>
          {/* Akhir Log In & QR */}

          {/* Awal Form */}
          <form
            onSubmit={submitHandler}
            className=" w-full h-fit flex flex-col gap-4 "
          >
            {/* Awal No HP/Email/Username */}
            <input
              type="text"
              name="identifier"
              id="identifier"
              placeholder="No. Handphone/Username/Email"
              className="w-full h-10 px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#EE4D2D] text-sm"
              onChange={changeHandler}
              value={formDataLogin.identifier}
            />
            {/* Akhir No HP/Email/Username */}

            {/* Awal Password dan Lupa Password */}
            <div className="w-full h-10 px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#EE4D2D] text-sm flex justify-between items-center gap-1 ">
              {/* Awal Password */}
              <div className="w-4/6 h-fit relative">
                {/* Awal Input Password */}
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  id="password"
                  placeholder="Password"
                  className="w-full h-fit focus:outline-none "
                  onChange={changeHandler}
                  value={formDataLogin.password}
                />
                {/* Akhir Input Password */}

                {/* Awal Toggle Hide Passwoord */}
                <button
                  type="button"
                  onClick={togglePassword}
                  className="absolute right-3 top-1/2 -translate-y-1/2 hover: text-[#EE4D2D] cursor-pointer"
                >
                  {showPassword ? <RiEyeLine /> : <RiEyeCloseLine />}
                </button>
                {/* Akhir Toggle Hide Passwoord */}
              </div>
              {/* Akhir Password */}

              {/* Awal Pemisah */}
              <div className="w-0.5 h-full bg-gray-300"></div>
              {/* Akhir Pemisah */}

              {/* Awal Lupa Password */}
              <Link
                className=" w-2/6 h-fit text-xs text-gray-400 hover:text-[#EE4D2D] cursor-pointer px-2"
                href={"/forgot=password"}
              >
                Lupa Password?
              </Link>
              {/* Akhir Lupa Password */}
            </div>
            {/* Awal Password dan Lupa Password */}

            {/* Awal Button Login */}
            <button
              type="submit"
              disabled={loadingLogin}
              className="bg-[#EE4D2D] mt-4 w-full h-12 text-white font-semibold rounded-md hover:bg-[#D93A1A] cursor-pointer"
            >
              {loadingLogin ? (
                <VscLoading className="animate-spin mx-auto text-2xl" />
              ) : (
                "LOG IN"
              )}
            </button>
            {/* Akhir Button Login */}
          </form>
          {/* Akhir Form */}

          {/* Awal OAuth */}
          {/* Awal Atau */}
          <div className="w-full h-fit flex justify-center items-center gap-4">
            {/* Awal Garis 1 */}
            <div className="w-full h-px bg-gray-300"></div>
            {/* Akhir Garis 1 */}

            {/* Awal Atau */}
            <p className="text-gray-400 text-xs">OR</p>
            {/* Akhir Atau */}

            {/* Awal Garis 2 */}
            <div className="w-full h-px bg-gray-300"></div>
            {/* Akhir Garis 2 */}
          </div>
          {/* Akhir Atau */}

          {/* Awal OAuth Facebook dan Google */}
          <div className=" w-full h-fit flex justify-between items-center gap-4">
            {/* Awal Facebook */}
            <div className=" w-full h-10 border border-gray-300 flex justify-center items-center gap-2 hover:bg-gray-200 cursor-pointer rounded-md">
              {/* Awal Icon Facebook */}
              <FaFacebook className="text-[#1877F2] text-2xl" />
              {/* Akhir Icon Facebook */}

              {/* Awal Text Facebook */}
              <p className="text-sm">Facebook</p>
              {/* Akhir Text Facebook */}
            </div>
            {/* Akhir Facebook */}

            {/* Awal Google */}
            <div className="w-full h-10 border border-gray-300 flex justify-center items-center gap-2 hover:bg-red-400 cursor-pointer rounded-md">
              {/* Awal Icon Google */}
              <FcGoogle className="text-2xl" />
              {/* Akhir Icon Google */}

              {/* Awal Text Google */}
              <p className="text-sm">Google</p>
              {/* Akhir Text Google */}
            </div>
            {/* Akhir Google */}
          </div>
          {/* Akhir OAuth Facebook dan Google */}
          {/* Akhir OAuth */}
          {/* Awal Footer Form */}
          <div className=" w-full h-fit text-xs px-14 text-center">
            Dengan login, kamu menyetujui{" "}
            <Link className="text-[#EE4D2D]" href={"/portal/article/123"}>
              Syarat, Ketentuan, dan Kebijakan dari Shopee
            </Link>{" "}
            &{" "}
            <Link className="text-[#EE4D2D]" href={"/portal/article/456"}>
              Kebijakan Privasi Shopee
            </Link>
          </div>
          {/* Akhir Footer Form */}

          {/* Awal Link Register */}
          <div className=" w-full h-fit flex justify-center items-center text-sm gap-1 ">
            <p className="font-light text-gray-500">Don't have an account?</p>
            <Link href={"/register"} className="text-[#EE4D2D] font-semibold">
              Sign Up
            </Link>
          </div>
          {/* Akhir Link Register */}
        </div>
        {/* Akhir Form Login */}
      </div>
      {/* Akhir Form */}

      {/* Awal Footer */}
      <Footer />
      {/* Akhir Footer */}
    </div>
  );
}
