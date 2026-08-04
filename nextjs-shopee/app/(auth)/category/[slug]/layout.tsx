import NavbarMainPage from "@/src/components/MainPage/Navbar/NavbarMainPage";
import { getCategoryBySlug } from "@/src/models/category/category";
import { Metadata } from "next";

interface Props {
  params: Promise<{ slug: string }>;
  children: React.ReactNode;
}

// _id: string;
// name: string;
// slug: string;
// ancestorsId: string[];
// createdAt: Date;
// updatedAt: Date;
// deletedAt?: Date;

export async function generateMetadata({
  params,
}: Omit<Props, "children">): Promise<Metadata> {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);

  if (!category) {
    return {
      title: "Kategori Tidak Ditemukan | Shopee Indonesia",
    };
  }

  const description = `Beli produk di kategori ${category.name} hanya di Shopee Indonesia.`;

  return {
    title: `${category.name} | Shopee Indonesia`,
    description,
    openGraph: {
      title: category.name,
      description,
      images: [
        {
          url: "/shopee1.png",
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
