import { handlePaymentNotification } from "@/src/models/order/order";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    console.log(body, "body webhook midtrans");

    await handlePaymentNotification(body);

    return NextResponse.json(
      {
        success: true,
        message: "Payment notification processed successfully",
        data: null,
      },
      {
        status: 200,
      },
    );
  } catch (error) {
    console.error("Error handling payment notification:", error);

    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error ? error.message : "Internal Server Error",
        data: null,
      },
      {
        status: 500,
      },
    );
  }
}
