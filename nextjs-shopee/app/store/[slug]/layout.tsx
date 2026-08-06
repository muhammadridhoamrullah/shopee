import NavbarMainPage from "@/src/components/MainPage/Navbar/NavbarMainPage";
import { getStoreBySlug } from "@/src/models/store/store";
import { Metadata } from "next";

interface Props {
  params: Promise<{
    slug: string;
  }>;
  children: React.ReactNode;
}

export async function generateMetadata({
  params,
}: Omit<Props, "children">): Promise<Metadata> {
  const { slug } = await params;
  const store = await getStoreBySlug(slug);

  if (!store) {
    return {
      title: "Toko Tidak Ditemukan | Shopee Indonesia",
    };
  }

  const description = `Beli produk dari ${store.name} hanya di Shopee Indonesia.`;

  return {
    title: `${store.name} | Shopee Indonesia`,
    description,
    openGraph: {
      title: store.name,
      description,
      images: [
        {
          url: store.image,
          width: 800,
          height: 800,
        },
      ],
    },
  };
}

export default function StorePageLayout({ children }: Props) {
  return (
    <>
      <NavbarMainPage />
      {children}
    </>
  );
}
