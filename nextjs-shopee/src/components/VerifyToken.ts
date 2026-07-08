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

export async function verifyToken(token: string) {
  const cached = tokenCache.get(token);
  const now = Date.now();

  if (cached && now - cached.timestamp < CACHE_DURATION) {
    console.log("token lama");

    return cached.payload;
  }

  const secret = new TextEncoder().encode(process.env.JWT_SECRET!);
  const decoded = await jose.jwtVerify<{
    _id: string;
    username: string;
    email: string;
    role: string;
  }>(token, secret);
  console.log(decoded, "token baru");

  tokenCache.set(token, { payload: decoded.payload, timestamp: now });
  return decoded.payload;
}
