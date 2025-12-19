import { ApiError } from "./ApiError";

export class AuthError extends ApiError {
  constructor(message = "Unauthorized") {
    super(message, 401);
  }
}
