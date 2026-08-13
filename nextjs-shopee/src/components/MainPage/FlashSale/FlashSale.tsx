import TimerFlashSale from "./TimerFlashSale";
import { getActiveFlashSale } from "@/src/models/flashSale/flashSale";
import SectionHeader from "../Section/SectionHeader";
import ProdukCarousel from "../Section/ProdukCarousel";
import CardFlashSale from "./CardFlashSale";

export default async function FlashSale() {
  const itemsFlashSale = await getActiveFlashSale();
  console.log(itemsFlashSale, "FLASH SALE GWEH");

  if (itemsFlashSale.length === 0) {
    return null;
  }

  return (
    <div className="bg-white w-full h-75 flex flex-col justify-between items-start">
      {/* Awal Section Header */}
      <SectionHeader title="FLASH SALE" link="flash-sale">
        <TimerFlashSale endTime={itemsFlashSale[0].endTime} />
      </SectionHeader>
      {/* Akhir Section Header */}

      {/* Awal Mapping Produk Flash Sale */}
      <ProdukCarousel>
        {itemsFlashSale.map((item) => (
          <CardFlashSale produk={item} key={item._id} />
        ))}
      </ProdukCarousel>
      {/* Akhir Mapping Produk Flash Sale */}
    </div>
  );
}
