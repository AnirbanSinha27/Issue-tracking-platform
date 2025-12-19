import { ValidationError } from "../errors/ValidationError";

export abstract class BaseValidator<T> {
  abstract validate(data: unknown): T;

  protected throw(message: string, details?: unknown): never {
    throw new ValidationError(message, details);
  }
}
