import { ApiError } from "./ApiError";

export class ValidationError extends ApiError {
  constructor(message = "Invalid input", details?: unknown) {
    super(message, 400, details);
  }
}
