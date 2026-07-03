import { NextRequest, NextResponse } from "next/server";
import * as jose from "jose";

const tokenCache = new Map<
  string,
  {
    payload: {
      _id: string;
      username: string;
      email: string;
      role: string;
    };
    timestamp: number;
  }
>();

const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes in milliseconds

export async function proxy(request: NextRequest) {
  try {
    const token = request.cookies.get("access_token")?.value;
    console.log(token, "token middleware");

    if (!token) {
      return NextResponse.redirect(new URL("/", request.url), {
        status: 302,
      });
    }

    // Cek apakah token sudah ada di cache
    const cachedToken = tokenCache.get(token);
    const now = Date.now();

    // Check apakah masih valid dan belum expired
    if (cachedToken && now - cachedToken.timestamp < CACHE_DURATION) {
      console.log("Ini Cache");

      const reqHeaders = new Headers(request.headers);

      reqHeaders.set("UserId", cachedToken.payload._id);
      reqHeaders.set("Username", cachedToken.payload.username);
      reqHeaders.set("Email", cachedToken.payload.email);
      reqHeaders.set("Role", cachedToken.payload.role);

      return NextResponse.next({
        request: {
          headers: reqHeaders,
        },
      });
    }

    // Jika tidak ada di cache, lakukan verifikasi token
    console.log("Token Verificaiton");

    const secret = new TextEncoder().encode(process.env.JWT_SECRET!);

    // Verifikasi token menggunakan jose
    const decoded = await jose.jwtVerify<{
      _id: string;
      username: string;
      email: string;
      role: string;
    }>(token, secret);

    // Setelah verifikasi, simpan token ke cache
    tokenCache.set(token, {
      payload: decoded.payload,
      timestamp: now,
    });

    const reqHeaders = new Headers(request.headers);

    reqHeaders.set("UserId", decoded.payload._id);
    reqHeaders.set("Username", decoded.payload.username);
    reqHeaders.set("Email", decoded.payload.email);
    reqHeaders.set("Role", decoded.payload.role);

    return NextResponse.next({
      request: {
        headers: reqHeaders,
      },
    });
  } catch (error) {
    if (error instanceof Error) {
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

// Buat matcher untuk menentukan route mana yang akan di protect
export const config = {
  matcher: ["/dashboard/:path*"],
};
