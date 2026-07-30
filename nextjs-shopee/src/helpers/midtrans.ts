import midtransClient from "midtrans-client";

export const snap = new midtransClient.Snap({
  isProduction: false,
  serverKey: process.env.MIDTRANS_SERVER_KEY!,
  clientKey: process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY!,
});

export async function getTransaction(orderId: string) {
  const auth = Buffer.from(`${process.env.MIDTRANS_SERVER_KEY!}:`).toString(
    "base64",
  );

  const response = await fetch(
    `https://api.sandbox.midtrans.com/v2/${orderId}/status`,
    {
      method: "GET",
      headers: {
        Authorization: `Basic ${auth}`,
        Accept: "application/json",
      },
      cache: "no-store",
    },
  );

  return response.json();
}
