import NavbarMainPage from "@/src/components/MainPage/Navbar/NavbarMainPage";
import { getProductsBySlug } from "@/src/models/category/category";
import { Metadata } from "next";

interface Props {
  params: Promise<{ slug: string }>;
  children: React.ReactNode;
}

export async function generateMetadata({
  params,
}: Omit<Props, "children">): Promise<Metadata> {
  const { slug } = await params;
  const category = await getProductsBySlug(slug);

  if (!category) {
    return {
      title: "Kategori Tidak Ditemukan | Shopee Indonesia",
    };
  }

  const description = `Beli produk di kategori ${category.category.name} hanya di Shopee Indonesia.`;

  return {
    title: `${category.category.name} | Shopee Indonesia`,
    description,
    openGraph: {
      title: category.category.name,
      description,
      images: [
        {
          url: category.products[0]?.images[0] || "/shopee1.png",
          width: 800,
          height: 800,
        },
      ],
    },
  };
}

export default function CategorySlugLayout({ children }: Props) {
  return (
    <>
      <NavbarMainPage />
      {children}
    </>
  );
}
