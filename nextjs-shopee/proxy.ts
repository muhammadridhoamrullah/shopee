import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "./src/components/VerifyToken";

const protectedPaths = ["/dashboard"];
const guestOnlyPaths = ["/login", "/register"];

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("access_token")?.value;

  const isProtected = protectedPaths.some((p) => pathname.startsWith(p));
  const isGuestOnly = guestOnlyPaths.some((p) => pathname.startsWith(p));

  // Halaman butuh login (dashboard dll)
  if (isProtected) {
    if (!token) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
    try {
      const payload = await verifyToken(token);

      const reqHeaders = new Headers(request.headers);
      reqHeaders.set("UserId", payload._id);
      reqHeaders.set("Username", payload.username);
      reqHeaders.set("Email", payload.email);
      reqHeaders.set("Role", payload.role);
      return NextResponse.next({ request: { headers: reqHeaders } });
    } catch {
      const response = NextResponse.redirect(new URL("/login", request.url));
      response.cookies.delete("access_token");
      return response;
    }
  }

  // Halaman khusus tamu (login, register)
  if (isGuestOnly && token) {
    try {
      await verifyToken(token);
      return NextResponse.redirect(new URL("/dashboard", request.url));
    } catch {
      const response = NextResponse.next();
      response.cookies.delete("access_token");
      return response;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/login", "/register"],
};
