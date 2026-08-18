import InputFormFlashSale from "@/src/components/Portal/FlashSale/InputFormFlashSale";
import { tanggalHariIni } from "@/src/helpers/flashSale";
import {
  getProductsMilikStore,
  getStoreByUserId,
} from "@/src/models/store/store";
import { headers } from "next/headers";

export default async function FormFlashSale() {
  const headerLists = await headers();
  const userId = headerLists.get("UserId")!;

  const myStore = await getStoreByUserId(userId);

  if (!myStore) {
    return (
      <div className=" flex-1 h-full p-5 flex justify-center items-start">
        <h1 className="text-2xl font-bold">
          Kamu belum punya toko, jadi belum bisa membuat flash sale.
        </h1>
      </div>
    );
  }

  const products = await getProductsMilikStore(myStore._id);

  return (
    <InputFormFlashSale products={products} tanggalHariIni={tanggalHariIni()} />
  );
}

// productId: "",
// flashPrice: "",
// flashStock: "",
// tanggal: "",
// slotStart: "",
