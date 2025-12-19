import jwt from "jsonwebtoken";
import { AuthError } from "../errors/AuthError";

type JwtPayload = {
  userId: string;
  email: string;
};

export class JWT {
  private static accessSecret = process.env.JWT_ACCESS_SECRET!;
  private static refreshSecret = process.env.JWT_REFRESH_SECRET!;

  static signAccess(payload: JwtPayload) {
    return jwt.sign(payload, this.accessSecret, { expiresIn: "15m" });
  }

  static signRefresh(payload: JwtPayload) {
    return jwt.sign(payload, this.refreshSecret, { expiresIn: "7d" });
  }

  static verifyAccess(token: string): JwtPayload {
    try {
      return jwt.verify(token, this.accessSecret) as JwtPayload;
    } catch {
      throw new AuthError("Invalid or expired access token");
    }
  }
}
