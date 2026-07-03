import { verifyEmail } from "@/src/models/user/user";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const token = request.nextUrl.searchParams.get("token");
    console.log(token, "token");

    if (!token) {
      throw new Error("Token is missing");
    }

    const verifyToken = await verifyEmail(token);

    return NextResponse.json(
      {
        success: true,
        message: "Email verified successfully",
        data: verifyToken,
      },
      {
        status: 200,
      },
    );
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(
        { success: false, message: error.message, data: null },
        { status: 400 },
      );
    } else {
      return NextResponse.json(
        {
          success: false,
          message: "Internal Server Error",
        },
        { status: 500 },
      );
    }
  }
}
