import { redirect } from "next/navigation";

interface Props {
  searchParams: Promise<{ order_id: string }>;
}

export default async function OrderRedirectPage({ searchParams }: Props) {
  const { order_id } = await searchParams;

  if (!order_id) {
    redirect("/");
  }

  redirect(`/order/${order_id}`);
}
