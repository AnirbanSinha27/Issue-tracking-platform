import { BaseValidator } from "./BaseValidator";

export type RegisterInput = {
  name: string;
  email: string;
  password: string;
};

export type LoginInput = {
  email: string;
  password: string;
};

export class AuthValidator extends BaseValidator<RegisterInput | LoginInput> {
  validate(data: unknown): RegisterInput | LoginInput {
    if (typeof data !== "object" || data === null) {
      this.throw("Invalid input data");
    }
    return data as RegisterInput | LoginInput;
  }

  validateRegister(data: unknown): RegisterInput {
    if (typeof data !== "object" || data === null) {
      this.throw("Invalid input data");
    }

    const input = data as Record<string, unknown>;

    if (!input.name || typeof input.name !== "string") {
      this.throw("name is required and must be a string");
    }

    if (!input.email || typeof input.email !== "string") {
      this.throw("email is required and must be a string");
    }

    if (!input.password || typeof input.password !== "string") {
      this.throw("password is required and must be a string");
    }

    if (input.password.length < 6) {
      this.throw("Password must be at least 6 characters");
    }

    return {
      name: input.name,
      email: input.email,
      password: input.password,
    };
  }

  validateLogin(data: unknown): LoginInput {
    if (typeof data !== "object" || data === null) {
      this.throw("Invalid input data");
    }

    const input = data as Record<string, unknown>;

    if (!input.email || typeof input.email !== "string") {
      this.throw("email is required and must be a string");
    }

    if (!input.password || typeof input.password !== "string") {
      this.throw("password is required and must be a string");
    }

    return {
      email: input.email,
      password: input.password,
    };
  }
}
