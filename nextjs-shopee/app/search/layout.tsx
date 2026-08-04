import NavbarMainPage from "@/src/components/MainPage/Navbar/NavbarMainPage";

export default function SearchPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <NavbarMainPage />
      {children}
    </>
  );
}
