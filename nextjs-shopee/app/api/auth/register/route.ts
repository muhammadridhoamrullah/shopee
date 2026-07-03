import { schemaRegister } from "@/src/helpers/zod";
import { registerUser } from "@/src/models/user/user";
import { NextRequest, NextResponse } from "next/server";
import z, { success } from "zod";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validasi menggunakan Zod Schema
    const validationSchema = schemaRegister.safeParse(body);

    if (!validationSchema.success) {
      throw validationSchema.error;
    }

    const creatingUser = await registerUser(body);

    return NextResponse.json(
      {
        success: true,
        message: "Register Successfully",
        data: creatingUser,
      },
      {
        status: 201,
      },
    );
  } catch (error) {
    console.log(error, "error");
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
