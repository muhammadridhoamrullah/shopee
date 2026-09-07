import { getProductByStoreIdWithSort } from "@/src/models/product/product";
import CardStoreProductSection from "./CardStoreProductSection";

interface Props {
  storeId: string;
  type: string;
}

const SECTION_CONFIG = {
  mungkinKamuSuka: { title: "MUNGKIN KAMU SUKA", path: "mungkin-kamu-suka" },
  terlaris: { title: "TERLARIS", path: "terlaris" },
};

export default async function StoreProdukSectionByType({
  storeId,
  type,
}: Props) {
  const { title, path } = SECTION_CONFIG[type as keyof typeof SECTION_CONFIG];
  const produk = await getProductByStoreIdWithSort(storeId, type);

  console.log(produk, "Store - Produk Terlaris Mungkin Kamu Suka");
  

  return (
    <CardStoreProductSection
      title={title}
      link={`/store/${storeId}/${path}`}
      produk={produk}
    />
  );
}
