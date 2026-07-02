import jwt, { JwtPayload } from "jsonwebtoken";

const SECRET = process.env.JWT_SECRE!;

export function signToken(payload: JwtPayload): string {
  return jwt.sign(payload, SECRET);
}
