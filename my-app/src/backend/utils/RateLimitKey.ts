export class RateLimitKey {
    static fromRequest(req: Request, userId?: string) {
      if (userId) return `user:${userId}`;
  
      const forwarded = req.headers.get("x-forwarded-for");
      const ip = forwarded?.split(",")[0] ?? "unknown";
  
      return `ip:${ip}`;
    }
  }
  