import { ApiError } from "../errors/ApiError";
import { RateLimiter } from "../rate-limiters/RateLimiter";
import { RateLimitKey } from "../utils/RateLimitKey";

export abstract class BaseHandler {
  protected rateLimiter?: RateLimiter;

  async handle(req: Request, context?: any): Promise<Response> {
    try {
      if (this.rateLimiter) {
        const key = RateLimitKey.fromRequest(req, context?.userId);
        this.rateLimiter.check(key);

        const response = await this.execute(req, context);
        const headers = this.rateLimiter.headers(key);

        Object.entries(headers).forEach(([k, v]) =>
          response.headers.set(k, v)
        );

        return response;
      }

      return await this.execute(req, context);
    } catch (error) {
      return this.handleError(error);
    }
  }

  protected abstract execute(
    req: Request,
    context?: any
  ): Promise<Response>;

  protected handleError(error: unknown): Response {
    if (error instanceof ApiError) {
      return Response.json(
        { error: error.message },
        { status: error.statusCode }
      );
    }

    console.error(error);
    return Response.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
