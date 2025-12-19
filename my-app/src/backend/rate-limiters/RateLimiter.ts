import { RateLimitError } from "../errors/RateLimitError";

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
    let entry = this.store.get(key);

    if (!entry || now > entry.resetAt) {
      entry = {
        count: 0,
        resetAt: now + this.windowMs,
      };
      this.store.set(key, entry);
    }

    if (entry.count >= this.limit) {
      throw new RateLimitError();
    }

    entry.count++;
  }

  headers(key: string) {
    const entry = this.store.get(key);

    return {
      "X-RateLimit-Limit": this.limit.toString(),
      "X-RateLimit-Remaining": entry
        ? Math.max(this.limit - entry.count, 0).toString()
        : this.limit.toString(),
      "X-RateLimit-Reset": entry
        ? Math.ceil(entry.resetAt / 1000).toString()
        : Math.ceil((Date.now() + this.windowMs) / 1000).toString(),
    };
  }
}
