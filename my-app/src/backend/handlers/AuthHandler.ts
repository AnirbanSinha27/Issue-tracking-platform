import { BaseHandler } from "./BaseHandler";
import { AuthService } from "../services/AuthService";
import { AuthValidator } from "../validators/AuthValidator";
import { JWT } from "../utils/JWT";
import { RateLimiter } from "../rate-limiters/RateLimiter";
import { AuthError } from "../errors/AuthError";

export class AuthHandler extends BaseHandler {
  constructor(
    private readonly service: AuthService,
    private readonly validator: AuthValidator
  ) {
    super();
    this.rateLimiter = new RateLimiter(100, 15 * 60 * 1000);
  }

  protected async execute(req: Request): Promise<Response> {
    const url = new URL(req.url);

    if (req.method === "POST" && url.pathname.endsWith("/register")) {
      const body = await this.safeJson(req);
      const data = this.validator.validateRegister(body);
      const result = await this.service.register(data);
      return this.respond(result);
    }
    
    if (req.method === "POST" && url.pathname.endsWith("/login")) {
      const body = await this.safeJson(req);
      const data = this.validator.validateLogin(body);
      const result = await this.service.login(data);
      return this.respond(result);
    }
       

    if (req.method === "GET" && url.pathname.endsWith("/me")) {
      const token = this.extractToken(req);
      const payload = JWT.verifyAccess(token);
      const user = await this.service.me(payload.userId);

      return Response.json({ user });
    }

    throw new AuthError("Route not found");
  }

  private respond(result: any) {
    return new Response(
      JSON.stringify({
        user: result.user,
      }),
      {
        status: 200,
        headers: {
          "Set-Cookie": `access_token=${result.accessToken}; HttpOnly; Path=/; SameSite=Strict`,
          "Content-Type": "application/json",
        },
      }
    );
  }

  private async safeJson(req: Request) {
    try {
      return await req.json();
    } catch {
      throw new AuthError("Request body must be valid JSON");
    }
  }
  

  private extractToken(req: Request): string {
    const cookie = req.headers.get("cookie");
    if (!cookie) throw new AuthError();

    const match = cookie.match(/access_token=([^;]+)/);
    if (!match) throw new AuthError();

    return match[1];
  }
}
