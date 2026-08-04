import { getSearchProducts } from "@/src/models/product/product";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const keyword = request.nextUrl.searchParams.get("keyword");

    if (!keyword || keyword.trim().length < 3) {
      return NextResponse.json(
        {
          success: false,
          message: "Keyword is required and must be at least 3 characters long",
          data: null,
        },
        {
          status: 400,
        },
      );
    }

    const hasilSuggest = await getSearchProducts(keyword.trim(), 1);

    return NextResponse.json({
      success: true,
      message: "Search results fetched successfully",
      data: hasilSuggest.products.slice(0, 5),
    });
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
