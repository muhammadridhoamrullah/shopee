import ButtonCheckoutCart from "@/src/components/Cart/ButtonCheckoutCart";
import { formatRupiah } from "@/src/helpers/utils";
import { getCartByUserId } from "@/src/models/cart/cart";
import { headers } from "next/headers";

export default async function CartPage() {
  const headerList = await headers();
  const userId = headerList.get("UserId")!;
  const username = headerList.get("Username");

  const { items, totalPrice } = await getCartByUserId(userId);
  return (
    <div>
      <h1>
        My Mine Cart {userId} - {username}
      </h1>

      <div>{formatRupiah(totalPrice)}</div>

      {items.map((item) => (
        <div key={item.productId}>
          {item.name} x {item.quantity}
        </div>
      ))}

      <ButtonCheckoutCart />
    </div>
  );
}
