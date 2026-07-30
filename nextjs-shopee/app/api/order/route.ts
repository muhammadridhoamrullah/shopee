import { schemaAddToCartDanBeliSekarang } from "@/src/helpers/zod";
import { beliSekarang } from "@/src/models/order/order";
import { NextRequest, NextResponse } from "next/server";
import z from "zod";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const validationSchema = schemaAddToCartDanBeliSekarang.safeParse(body);

    if (!validationSchema.success) {
      throw validationSchema.error;
    }

    const userId = request.headers.get("UserId");

    if (!userId) {
      throw new Error("Unauthorized: UserId header is missing");
    }

    const { orderId, token } = await beliSekarang(
      userId,
      validationSchema.data.productId,
      validationSchema.data.quantity,
    );

    return NextResponse.json(
      {
        success: true,
        message: "Order berhasil dibuat, silahkan lakukan pembayaran",
        data: { orderId, token },
      },
      {
        status: 201,
      },
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      const path = error.issues[0].path[0];
      const message = error.issues[0].message;
      return NextResponse.json(
        {
          success: false,
          data: null,
          message: `Validation error on ${String(path)}: ${message}`,
        },
        {
          status: 400,
        },
      );
    } else if (error instanceof Error) {
      return NextResponse.json(
        {
          success: false,
          data: null,
          message: error.message,
        },
        {
          status: 400,
        },
      );
    } else {
      return NextResponse.json(
        {
          success: false,
          data: null,
          message: "Internal Server Error",
        },
        {
          status: 500,
        },
      );
    }
  }
}
