import { schemaLogin } from "@/src/helpers/zod";
import { loginUser } from "@/src/models/user/user";
import { NextRequest, NextResponse } from "next/server";
import z from "zod";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validasi menggunakan Zod Schema
    const validationSchema = schemaLogin.safeParse(body);

    if (!validationSchema.success) {
      throw validationSchema.error;
    }

    const access_token = await loginUser(body);
    console.log(access_token, "acc token API");

    const response = NextResponse.json(
      {
        success: true,
        message: "Login Successfully",
        data: access_token,
      },
      {
        status: 200,
      },
    );

    response.cookies.set("access_token", access_token, {
      httpOnly: true,
      secure: false,
      // secure: process.env.NODE_ENV === "production", nanti pas sudah https
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return response;
  } catch (error) {
    console.log(error, "err");

    if (error instanceof z.ZodError) {
      const path = error.issues[0].path[0];
      const message = error.issues[0].message;

      return NextResponse.json(
        {
          success: false,
          message: `Invalid on ${String(path)}: ${message}`,
          data: null,
        },
        {
          status: 400,
        },
      );
    } else if (error instanceof Error) {
      return NextResponse.json(
        {
          success: false,
          message: error.message,
          data: null,
        },
        {
          status: 500,
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
