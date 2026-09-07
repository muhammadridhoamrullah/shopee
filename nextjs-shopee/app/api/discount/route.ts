import { schemaCreateDiscount } from "@/src/helpers/zod";
import { createDiscount } from "@/src/models/discount/discount";
import { NextRequest, NextResponse } from "next/server";
import z from "zod";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const schemaCreate = schemaCreateDiscount.safeParse(body);

    if (!schemaCreate.success) throw schemaCreate.error;

    const userId = request.headers.get("UserId");

    if (!userId) throw new Error("Unauthorized: UserId header is missing");

    const discountId = await createDiscount({
      userId,
      ...schemaCreate.data,
    });

    return NextResponse.json(
      {
        success: true,
        data: { discountId },
        message: "Discount created successfully",
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
