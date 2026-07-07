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
import { doRegister } from "@/src/store/slice/registerSlice";
import NonAuthHeader from "@/src/components/auth/NonAuthHeader";

export default function Register() {
  const { loadingRegister, errorRegister, dataRegister, isRegister } =
    useAppSelector((state) => state.register);
  console.log(dataRegister, "register");

  const router = useRouter();
  const dispatch = useAppDispatch();
  const [formDataRegister, setFormDataRegister] = useState({
    username: "",
    email: "",
    password: "",
    phoneNumber: "",
  });
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordMatchError, setPasswordMatchError] = useState(false);

  // useEffect untuk redirect ke halaman dashboard jika register berhasil
  useEffect(() => {
    if (isRegister) {
      router.push("/login");
    }
  }, [isRegister, router]);

  // useEffect untuk menampilkan error register jika ada
  useEffect(() => {
    if (errorRegister) {
      alert(errorRegister);
    }
  }, [errorRegister]);

  // useEffect untuk check password dan confirm password
  useEffect(() => {
    const delay = setTimeout(() => {
      if (confirmPassword && formDataRegister.password !== confirmPassword) {
        // alert("Password and Confirm Password do not match");
        setPasswordMatchError(true);
      } else {
        setPasswordMatchError(false);
      }
    }, 500); // Delay 500ms

    return () => clearTimeout(delay);
  }, [confirmPassword, formDataRegister.password]);

  // useEffect untuk pindah ke halaman login jika sudah register
  useEffect(() => {
    if (isRegister) {
      router.push("/login");
    }
  }, [isRegister, router]);

  function togglePassword() {
    setShowPassword(!showPassword);
  }

  function toggleConfirmPassword() {
    setShowConfirmPassword(!showConfirmPassword);
  }

  function changeHandler(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;

    setFormDataRegister({
      ...formDataRegister,
      [name]: value,
    });
  }

  async function submitHandler(
    e: React.SyntheticEvent<HTMLFormElement, SubmitEvent>,
  ) {
    e.preventDefault();

    if (formDataRegister.password !== confirmPassword) {
      alert("Password and Confirm Password do not match");
      return;
    }

    dispatch(doRegister(formDataRegister));
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

        {/* Awal Form Register */}
        <div className="bg-white rounded-xl w-175 h-full overflow-hidden px-6 py-4 flex flex-col  justify-between">
          {/* Awal Sign Up */}
          <div className="w-full h-fit flex justify-between items-center">
            {/* Awal Sign Up */}
            <div className="text-lg text-[#EE4D2D] font-semibold">Sign Up</div>
            {/* Akhir Sign Up */}
          </div>
          {/* Akhir Sign Up*/}

          {/* Awal Form */}
          <form
            onSubmit={submitHandler}
            className=" w-full h-fit flex flex-col gap-4 "
          >
            {/* Awal Username */}
            <input
              type="text"
              name="username"
              id="username"
              placeholder="Username"
              className="w-full h-10 px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#EE4D2D] text-sm"
              onChange={changeHandler}
              value={formDataRegister.username}
            />
            {/* Akhir Username */}

            {/* Awal Email */}
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Email"
              className="w-full h-10 px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#EE4D2D] text-sm"
              onChange={changeHandler}
              value={formDataRegister.email}
            />
            {/* Akhir Email */}

            <div className="w-full h-10 flex justify-center items-center gap-2">
              {/* Awal Password  */}
              <div className="w-full h-10  border border-gray-300 rounded-md text-sm relative">
                {/* Awal Input Password */}
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  id="password"
                  placeholder="Password"
                  className="w-full h-full px-2 py-1 focus:outline-none focus:ring-2 focus:ring-[#EE4D2D] rounded-md "
                  onChange={changeHandler}
                  value={formDataRegister.password}
                />
                {/* Akhir Input Password */}

                {/* Awal Toggle Hide Password */}
                <button
                  type="button"
                  onClick={togglePassword}
                  className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-400 hover:text-[#EE4D2D] cursor-pointer"
                >
                  {showPassword ? <RiEyeLine /> : <RiEyeCloseLine />}
                </button>
                {/* Akhir Toggle Hide Password */}
              </div>
              {/* Akhir Password  */}

              {/* Awal Confirm Password  */}
              <div className="w-full h-10  border border-gray-300 rounded-md text-sm relative">
                {/* Awal Input Confirm Password */}
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  id="confirmPassword"
                  placeholder="Confirm Password"
                  className={`w-full h-full px-2 py-1 focus:outline-none focus:ring-2   rounded-md ${passwordMatchError ? "bg-red-500 focus:ring-red-500 animate-pulse" : "focus:ring-[#EE4D2D]"} transition-colors duration-1000 ease-in-out`}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  value={confirmPassword}
                />
                {/* Akhir Input Confirm Password */}

                {/* Awal Toggle Hide Password */}
                <button
                  type="button"
                  onClick={toggleConfirmPassword}
                  className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-400 hover:text-[#EE4D2D] cursor-pointer"
                >
                  {showConfirmPassword ? <RiEyeLine /> : <RiEyeCloseLine />}
                </button>
                {/* Akhir Toggle Hide Password */}
              </div>
              {/* Akhir Confirm Password  */}
            </div>

            {/* Awal Phone Number */}
            <input
              type="text"
              name="phoneNumber"
              id="phoneNumber"
              placeholder="Phone Number"
              className="w-full h-10 px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#EE4D2D] text-sm"
              onChange={changeHandler}
              value={formDataRegister.phoneNumber}
            />
            {/* Akhir Phone Number */}

            {/* Awal Button Login */}
            <button
              type="submit"
              disabled={loadingRegister || passwordMatchError}
              className={`bg-[#EE4D2D] mt-4 w-full h-12 text-white font-semibold rounded-md hover:bg-[#D93A1A] ${loadingRegister || passwordMatchError ? "opacity-50 cursor-not-allowed" : ""} transition-all duration-300 ease-in-out cursor-pointer`}
            >
              SIGN UP
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

          {/* Awal Link Register */}
          <div className=" w-full h-fit flex justify-center items-center text-sm gap-1 ">
            <p className="font-light text-gray-500">Have an account?</p>
            <Link href={"/login"} className="text-[#EE4D2D] font-semibold">
              Log In
            </Link>
          </div>
          {/* Akhir Link Register */}
        </div>
        {/* Akhir Form Register */}
      </div>
      {/* Akhir Form */}

      {/* Awal Footer */}
      <Footer />
      {/* Akhir Footer */}
    </div>
  );
}
