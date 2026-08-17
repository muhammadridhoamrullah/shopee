import DaftarFlashSale from "@/src/components/Portal/FlashSale/DaftarFlashSale";
import {
  getProductsMilikStore,
  getStoreByUserId,
} from "@/src/models/store/store";
import { headers } from "next/headers";
import { RiErrorWarningFill } from "react-icons/ri";

export default async function FlashSalePage() {
  const headerLists = await headers();
  const userId = headerLists.get("UserId")!;

  const myStore = await getStoreByUserId(userId);
  console.log(myStore, "myStore flash-sale");

  if (!myStore) {
    return (
      <div className=" flex-1 h-full p-5 flex justify-center items-start">
        <h1 className="text-2xl font-bold">
          Kamu belum punya toko, jadi belum bisa membuat flash sale.
        </h1>
      </div>
    );
  }

  const myProducts = await getProductsMilikStore(myStore._id);

  return (
    <div className=" flex-1 h-full p-5 flex flex-col justify-start items-start gap-5">
      {/* Awal Penting */}
      <div className="border border-yellow-500 w-full h-fit flex justify-between items-start text-sm gap-2 p-2 text-gray-500 rounded-md">
        {/* Awal Icon Warning */}
        <RiErrorWarningFill className="text-yellow-500 text-lg" />
        {/* Akhir Icon Warning */}

        {/* Awal Text Penting */}
        <span className="flex-1">
          PENTING: Daftar & data Promo Toko, Flash Sale, dan Flash Sale Toko
          Saya yang telah berakhir per 30 Apr 2020 akan secara otomatis hilang &
          tidak dapat dilihat lagi.
        </span>
        {/* Akhir Text Penting */}
      </div>
      {/* Akhir Penting */}

      {/* Awal Performa Flash Sale Toko Saya */}
      <div className="bg-green-500">Performa Flash Sale Toko Saya</div>
      {/* Akhir Performa Flash Sale Toko Saya */}

      {/* Awal Daftar Flash Sale */}
      <DaftarFlashSale products={myProducts} />
      {/* Akhir Daftar Flash Sale */}
    </div>
  );
}

// {
//   _id: '6a8000000000000000000001',
//   userId: '6a572ab6e15a597dfea5bcbc',
//   name: 'Haerin Jersey Collection',
//   slug: 'haerin-jersey-collection',
//   image: 'https://i.pinimg.com/474x/19/eb/32/19eb32ead6d19cf5f54f7e7b48c1a56f.jpg',
//   phone: '081234567890',
//   city: 'Seoul',
//   description: 'Toko jersey bola original untuk klub dan timnas favoritmu',
//   createdAt: 2026-08-09T07:29:21.798Z,
//   updatedAt: 2026-08-09T07:29:21.798Z,
//   lastLogin: 2026-08-08T07:29:21.798Z,
//   deletedAt: null
// } My Store

// {
//   _id: '6a8000000000000000000001',
//   userId: '6a572ab6e15a597dfea5bcbc',
//   name: 'Haerin Jersey Collection',
//   slug: 'haerin-jersey-collection',
//   image: 'https://i.pinimg.com/474x/19/eb/32/19eb32ead6d19cf5f54f7e7b48c1a56f.jpg',
//   phone: '081234567890',
//   city: 'Seoul',
//   description: 'Toko jersey bola original untuk klub dan timnas favoritmu',
//   createdAt: 2026-08-09T07:29:21.798Z,
//   updatedAt: 2026-08-09T07:29:21.798Z,
//   lastLogin: 2026-08-08T07:29:21.798Z,
//   deletedAt: null
// } myStore flash-sale

// [
//   {
//     _id: '6a6ee56e0798c70ca1aa83ff',
//     name: 'Jersey Arsenal Third 25/26',
//     slug: 'jersey-arsenal-third-25-26',
//     images: [
//       'https://picsum.photos/600/600?random=5',
//       'https://picsum.photos/600/600?random=55',
//       'https://picsum.photos/600/600?random=105',
//       'https://picsum.photos/600/600?random=155',
//       'https://picsum.photos/600/600?random=205',
//       'https://picsum.photos/600/600?random=255'
//     ],
//     price: 275000,
//     sold: 890
//   },
//   {
//     _id: '6a6ee56e0798c70ca1aa83fb',
//     name: 'Jersey Manchester United Home 25/26',
//     slug: 'jersey-manchester-united-home-25-26',
//     images: [
//       'https://picsum.photos/600/600?random=1',
//       'https://picsum.photos/600/600?random=51',
//       'https://picsum.photos/600/600?random=101',
//       'https://picsum.photos/600/600?random=151',
//       'https://picsum.photos/600/600?random=201',
//       'https://picsum.photos/600/600?random=251'
//     ],
//     price: 299000,
//     discountPercent: 29,
//     sold: 1900
//   },
//   {
//     _id: '6a6ee56e0798c70ca1aa83fc',
//     name: 'Jersey Real Madrid Home 25/26',
//     slug: 'jersey-real-madrid-home-25-26',
//     images: [
//       'https://picsum.photos/600/600?random=2',
//       'https://picsum.photos/600/600?random=52',
//       'https://picsum.photos/600/600?random=102',
//       'https://picsum.photos/600/600?random=152',
//       'https://picsum.photos/600/600?random=202',
//       'https://picsum.photos/600/600?random=252'
//     ],
//     price: 315000,
//     discountPercent: 30,
//     sold: 2400
//   },
//   {
//     _id: '6a6ee56e0798c70ca1aa8401',
//     name: 'Jersey Argentina Home 2026',
//     slug: 'jersey-argentina-home-2026',
//     images: [
//       'https://picsum.photos/600/600?random=7',
//       'https://picsum.photos/600/600?random=57',
//       'https://picsum.photos/600/600?random=107',
//       'https://picsum.photos/600/600?random=157',
//       'https://picsum.photos/600/600?random=207',
//       'https://picsum.photos/600/600?random=257'
//     ],
//     price: 285000,
//     discountPercent: 29,
//     sold: 2700
//   },
//   {
//     _id: '6a6ee56e0798c70ca1aa8403',
//     name: 'Jersey Manchester City Home 25/26',
//     slug: 'jersey-manchester-city-home-25-26',
//     images: [
//       'https://picsum.photos/600/600?random=9',
//       'https://picsum.photos/600/600?random=59',
//       'https://picsum.photos/600/600?random=109',
//       'https://picsum.photos/600/600?random=159',
//       'https://picsum.photos/600/600?random=209',
//       'https://picsum.photos/600/600?random=259'
//     ],
//     price: 295000,
//     discountPercent: 28,
//     sold: 1150
//   },
//   {
//     _id: '6a6ee56e0798c70ca1aa8402',
//     name: 'Jersey Brazil Away 2026',
//     slug: 'jersey-brazil-away-2026',
//     images: [
//       'https://picsum.photos/600/600?random=8',
//       'https://picsum.photos/600/600?random=58',
//       'https://picsum.photos/600/600?random=108',
//       'https://picsum.photos/600/600?random=158',
//       'https://picsum.photos/600/600?random=208',
//       'https://picsum.photos/600/600?random=258'
//     ],
//     price: 279000,
//     sold: 1400
//   },
//   {
//     _id: '6a6ee56e0798c70ca1aa8404',
//     name: 'Jersey Inter Milan Home 25/26',
//     slug: 'jersey-inter-milan-home-25-26',
//     images: [
//       'https://picsum.photos/600/600?random=10',
//       'https://picsum.photos/600/600?random=60',
//       'https://picsum.photos/600/600?random=110',
//       'https://picsum.photos/600/600?random=160',
//       'https://picsum.photos/600/600?random=210',
//       'https://picsum.photos/600/600?random=260'
//     ],
//     price: 269000,
//     discountPercent: 28,
//     sold: 641
//   },
//   {
//     _id: '6a6ee56e0798c70ca1aa83fd',
//     name: 'Jersey Barcelona Away 25/26',
//     slug: 'jersey-barcelona-away-25-26',
//     images: [
//       'https://picsum.photos/600/600?random=3',
//       'https://picsum.photos/600/600?random=53',
//       'https://picsum.photos/600/600?random=103',
//       'https://picsum.photos/600/600?random=153',
//       'https://picsum.photos/600/600?random=203',
//       'https://picsum.photos/600/600?random=253'
//     ],
//     price: 289000,
//     discountPercent: 28,
//     sold: 1600
//   },
//   {
//     _id: '6a6ee56e0798c70ca1aa83fe',
//     name: 'Jersey Liverpool FC Away Authentic 25/26',
//     slug: 'jersey-liverpool-fc-away-authentic-25-26',
//     images: [
//       'https://picsum.photos/600/600?random=4',
//       'https://picsum.photos/600/600?random=54',
//       'https://picsum.photos/600/600?random=104',
//       'https://picsum.photos/600/600?random=154',
//       'https://picsum.photos/600/600?random=204',
//       'https://picsum.photos/600/600?random=254'
//     ],
//     price: 1190000,
//     discountPercent: 18,
//     sold: 210
//   },
//   {
//     _id: '6a6ee56e0798c70ca1aa8400',
//     name: 'Jersey Timnas Indonesia Home 2026',
//     slug: 'jersey-timnas-indonesia-home-2026',
//     images: [
//       'https://picsum.photos/600/600?random=6',
//       'https://picsum.photos/600/600?random=56',
//       'https://picsum.photos/600/600?random=106',
//       'https://picsum.photos/600/600?random=156',
//       'https://picsum.photos/600/600?random=206',
//       'https://picsum.photos/600/600?random=256'
//     ],
//     price: 349000,
//     discountPercent: 30,
//     sold: 8700
//   }
// ] myProducts flash-sale
