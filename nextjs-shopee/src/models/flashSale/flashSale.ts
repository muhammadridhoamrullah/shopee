import { ProductRepository } from "../product/product.repository";
import { FlashSaleRepository } from "./flashSale.repository";

export async function getActiveFlashSale() {
  // Ambil semua item flash sale yang sedang berlangsung
  const items = await FlashSaleRepository.findActiveFlashSaleItems();

  // Jika tidak ada item flash sale yang sedang berlangsung, kembalikan []
  if (items.length === 0) {
    return [];
  }

  // Ambil semua productId dari item flash sale yang sedang berlangsung
  const productIds = items.map((item) => item.productId);

  // Ambil semua produk yang sedang flash sale
  const products = await ProductRepository.findByIds(productIds);

  //   Peta produk
  const petaProduk = new Map(
    products.map((product) => [product._id.toString(), product]),
  );

  return items
    .map((item) => {
      const product = petaProduk.get(item.productId.toString());

      // Produk sudah dihapus tapi entri flash sale masih ada -- lewati
      if (!product) return null;

      return {
        _id: item._id.toString(),
        productId: item.productId.toString(),
        name: product.name,
        slug: product.slug,
        image: product.images[0],
        flashPrice: item.flashPrice,
        normalPrice: product.price,
        discountPercent: Math.round(
          ((product.price - item.flashPrice) / product.price) * 100,
        ),
        flashStock: item.flashStock,
        flashSold: item.flashSold,
        endTime: item.endTime,
      };
    })
    .filter((item) => item !== null); // Filter out null values
}
