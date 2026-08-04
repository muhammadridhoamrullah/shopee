import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    console.log(
      request.cookies.get("access_token"),
      "ini cookie access_token sebelum dihapus",
    );
    const response = NextResponse.json(
      {
        success: true,
        message: "Logout Successfully",
        data: "Logout Successfully",
      },
      {
        status: 200,
      },
    );

    response.cookies.delete("access_token");
    return response;
  } catch (error) {
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
