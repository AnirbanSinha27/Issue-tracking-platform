import { BaseHandler } from "./BaseHandler";
import { IssueService } from "../services/IssueService";
import { IssueValidator } from "../validators/IssueValidator";
import { JWT } from "../utils/JWT";
import { AuthError } from "../errors/AuthError";
import { RateLimiter } from "../rate-limiters/RateLimiter"
export class IssueHandler extends BaseHandler {
  constructor(
    private readonly service: IssueService,
    private readonly validator: IssueValidator
  ) {
    super();
    this.rateLimiter = new RateLimiter(100, 15 * 60 * 1000);
  }

  protected async execute(req: Request): Promise<Response> {
    const userId = this.getUserId(req);
    const url = new URL(req.url);

    if (req.method === "GET" && url.pathname.endsWith("/issues")) {
      const type = url.searchParams.get("type") ?? undefined;
      const issues = await this.service.list(userId, type);
      return Response.json({ issues });
    }

    if (req.method === "POST" && url.pathname.endsWith("/issues")) {
      const body = await this.safeJson(req);
      const data = this.validator.validateCreate(body);
      const issue = await this.service.create(userId, data);
      return Response.json({ issue }, { status: 201 });
    }

    const issueId = url.pathname.split("/").pop()!;

    if (req.method === "GET") {
      const issue = await this.service.getById(userId, issueId);
      return Response.json({ issue });
    }

    if (req.method === "PUT") {
      const body = await this.safeJson(req);
      const data = this.validator.validateUpdate(body);
      await this.service.update(userId, issueId, data);
      return Response.json({ success: true });
    }

    if (req.method === "DELETE") {
      await this.service.delete(userId, issueId);
      return Response.json({ success: true });
    }

    throw new AuthError("Route not found");
  }

  private getUserId(req: Request): string {
    const cookie = req.headers.get("cookie");
    if (!cookie) throw new AuthError();

    const match = cookie.match(/access_token=([^;]+)/);
    if (!match) throw new AuthError();

    const payload = JWT.verifyAccess(match[1]);
    return payload.userId;
  }

  private async safeJson(req: Request) {
    try {
      return await req.json();
    } catch {
      throw new AuthError("Invalid JSON body");
    }
  }
}
