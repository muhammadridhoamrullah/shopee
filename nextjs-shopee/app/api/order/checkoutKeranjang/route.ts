import { checkoutKeranjang } from "@/src/models/order/order";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const userId = request.headers.get("UserId");

    if (!userId) {
      throw new Error("UserId header is required");
    }

    const { orderId, token } = await checkoutKeranjang(userId);

    return NextResponse.json(
      {
        success: true,
        message: "Checkout berhasil, silahkan lakukan pembayaran",
        data: {
          orderId: orderId,
          token: token,
        },
      },
      {
        status: 201,
      },
    );
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(
        {
          success: false,
          message: error.message,
          data: null,
        },
        {
          status: 400,
        },
      );
    } else {
      return NextResponse.json(
        {
          success: false,
          message: "Internal Server Error",
          data: null,
        },
        {
          status: 500,
        },
      );
    }
  }
}
