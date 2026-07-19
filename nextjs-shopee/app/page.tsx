import Banner from "@/src/components/MainPage/Banner";
import KategoriToRekomendasi from "@/src/components/MainPage/KategoriToRekomendasi";
import NavbarMainPage from "@/src/components/MainPage/NavbarMainPage";

export default function Home() {
  return (
    <div className="bg-[#F5F5F5] w-full min-h-screen flex flex-col  justify-start items-center">
      {/* Awal Navigation Bar */}
      <NavbarMainPage />
      {/* Akhir Navigation Bar */}
      {/* Awal Banner dan Beberapa Menu */}
      <Banner />
      {/* Akhir Banner dan Beberapa Menu */}

      {/* Awal Kategori to Rekomendasi */}
      <KategoriToRekomendasi />
      {/* Akhir Kategori to Rekomendasi */}
    </div>
  );
}
