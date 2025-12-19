type RateLimitEntry = {
    count: number;
    resetAt: number;
  };
  
  export class RateLimiter {
    private store = new Map<string, RateLimitEntry>();
  
    constructor(
      private readonly limit: number,
      private readonly windowMs: number
    ) {}
  
    check(key: string) {
      const now = Date.now();
      const entry = this.store.get(key);
  
      if (!entry || now > entry.resetAt) {
        this.store.set(key, {
          count: 1,
          resetAt: now + this.windowMs,
        });
        return;
      }
  
      if (entry.count >= this.limit) {
        throw new Error("RATE_LIMIT_EXCEEDED");
      }
  
      entry.count++;
    }
  }
  