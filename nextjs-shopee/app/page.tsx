import NavbarMainPage from "@/src/components/NavbarMainPage";
import Image from "next/image";

export default function Home() {
  return (
    <div className="bg-[#F5F5F5] w-full min-h-screen flex flex-col gap-2 justify-start items-center">
      {/* Awal Navigation Bar */}
      <NavbarMainPage />
      {/* Akhir Navigation Bar */}
      <h1>Halo</h1>
      <h1>Halo</h1>
      <h1>Halo</h1>
    </div>
  );
}
