import Banner from "@/src/components/MainPage/Banner";
import NavbarMainPage from "@/src/components/MainPage/NavbarMainPage";
import Image from "next/image";

export default function Home() {
  return (
    <div className="bg-[#F5F5F5] w-full min-h-screen flex flex-col  justify-start items-center">
      {/* Awal Navigation Bar */}
      <NavbarMainPage />
      {/* Akhir Navigation Bar */}
      {/* Awal Banner dan Beberapa Menu */}
      <Banner />
      {/* Akhir Banner dan Beberapa Menu */}
      <h1>Halo</h1>
      <h1>Halo</h1>
    </div>
  );
}
