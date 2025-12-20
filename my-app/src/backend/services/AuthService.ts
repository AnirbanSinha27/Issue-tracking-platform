import { AuthRepository } from "../repositories/AuthRepository";
import { Password } from "../utils/Password";
import { JWT } from "../utils/JWT";
import { AuthError } from "../errors/AuthError";
import { EmailService } from "./EmailService";

export class AuthService {
  constructor(private readonly repo: AuthRepository,
    private readonly emailService = new EmailService()
  ) {}

  async register(input: {
    name: string;
    email: string;
    password: string;
  }) {
    const existing = await this.repo.findByEmail(input.email);
    if (existing) {
      throw new AuthError("Email already registered");
    }

    const passwordHash = await Password.hash(input.password);

    const user = await this.repo.createUser({
      name: input.name,
      email: input.email,
      passwordHash,
    });

    this.emailService.sendWelcomeEmail(user.email, user.name)
      .catch(console.error);

    return {
      user,
      accessToken: JWT.signAccess({
        userId: user.id,
        email: user.email,
      }),
    };
  }

  async login(input: { email: string; password: string }) {
    const user = await this.repo.findByEmail(input.email);
    if (!user) {
      throw new AuthError("Invalid credentials");
    }

    const valid = await Password.compare(
      input.password,
      user.passwordHash
    );

    if (!valid) {
      throw new AuthError("Invalid credentials");
    }

    return {
      user,
      accessToken: JWT.signAccess({
        userId: user.id,
        email: user.email,
      }),
    };
  }

  async me(userId: string) {
    const user = await this.repo.findById(userId);
    if (!user) {
      throw new AuthError();
    }

    return user;
  }
}
