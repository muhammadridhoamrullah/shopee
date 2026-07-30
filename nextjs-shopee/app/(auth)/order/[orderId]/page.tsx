import LanjutkanPembayaran from "@/src/components/Order/LanjutkanPembayaran";
import { formatRupiah } from "@/src/helpers/utils";
import { getOrderByOrderId } from "@/src/models/order/order";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{ orderId: string }>;
}

export default async function OrderDetailPage({ params }: Props) {
  const { orderId } = await params;
  const order = await getOrderByOrderId(orderId);
  console.log(order, "order halaman /orderId");

  if (!order) {
    notFound();
  }

  return (
    <div className="w-full min-h-screen flex flex-col items-center p-5 gap-3">
      {order.status === "paid" && (
        <p className="text-green-600 font-semibold">
          Pembayaran berhasil! Terima kasih.
        </p>
      )}
      {order.status === "pending" && (
        <>
          <p className="text-yellow-600 font-semibold">
            Menunggu konfirmasi pembayaran...
          </p>
          {order.snapToken && (
            <LanjutkanPembayaran
              snapToken={order.snapToken}
              orderId={order.orderId}
            />
          )}
        </>
      )}
      {order.status === "cancelled" && (
        <p className="text-red-600 font-semibold">
          Pembayaran dibatalkan atau gagal.
        </p>
      )}

      <div className="font-bold">Total: {formatRupiah(order.totalPrice)}</div>

      {order.items.map((item) => (
        <div key={item.productId}>
          {item.name} x {item.quantity}
        </div>
      ))}
    </div>
  );
}
