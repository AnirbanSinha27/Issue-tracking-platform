import { BaseValidator } from "./BaseValidator";

type RegisterInput = {
  name: string;
  email: string;
  password: string;
};

type LoginInput = {
  email: string;
  password: string;
};

export class AuthValidator extends BaseValidator<
  RegisterInput | LoginInput
> {
  validate(data: any) {
    if (!data?.email || !data?.password) {
      this.throw("Email and password are required");
    }

    if (data.password.length < 6) {
      this.throw("Password must be at least 6 characters");
    }

    return data;
  }
}
