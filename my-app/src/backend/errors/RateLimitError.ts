import { ApiError } from "./ApiError";

export class RateLimitError extends ApiError {
  constructor(message = "Too many requests") {
    super(message, 429);
  }
}
