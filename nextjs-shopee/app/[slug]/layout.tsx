import type { Metadata } from "next";
import { getProductBySlug } from "@/src/models/product/product";
import { formatRupiah } from "@/src/helpers/utils";
import NavbarMainPage from "@/src/components/MainPage/Navbar/NavbarMainPage";

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
  const product = await getProductBySlug(slug);

  if (!product) {
    return {
      title: "Produk Tidak Ditemukan | Shopee Indonesia",
    };
  }

  const description = `Beli ${product.name} seharga ${formatRupiah(
    product.price,
  )} hanya di Shopee Indonesia.`;

  return {
    title: `${product.name} | Shopee Indonesia`,
    description,
    openGraph: {
      title: product.name,
      description,
      images: [
        {
          url: product.image,
          width: 800,
          height: 800,
        },
      ],
    },
  };
}

export default function ProdukDetailLayout({ children }: Props) {
  return (
    <>
  <NavbarMainPage />
  {children}</>
  );
}
