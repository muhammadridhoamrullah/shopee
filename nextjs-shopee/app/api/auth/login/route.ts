import { schemaLogin } from "@/src/helpers/zod";
import { loginUser } from "@/src/models/user/user";
import { NextRequest, NextResponse } from "next/server";
import z from "zod";

export async function POST(request: NextRequest) {
  try {
    console.log("Login Cuy");

    const body = await request.json();
    console.log(body, "body");

    // Validasi menggunakan Zod Schema
    // const validationSchema = schemaLogin.safeParse(body);
    // console.log(validationSchema, "validationSchemaLogin");

    // if (!validationSchema.success) {
    //   throw validationSchema.error;
    // }

    // const access_token = await loginUser(body);

    return NextResponse.json(
      {
        success: true,
        message: "Login Successfully",
        // data: access_token,
        data: body,
      },
      {
        status: 200,
      },
    );
  } catch (error) {
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
