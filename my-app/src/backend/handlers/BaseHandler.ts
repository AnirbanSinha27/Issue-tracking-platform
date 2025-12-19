import { IHandler } from "../interfaces/IHandler";
import { ApiError } from "../errors/ApiError";

export abstract class BaseHandler implements IHandler {
  async handle(req: Request, context?: any): Promise<Response> {
    try {
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
        { error: error.message, details: error.details },
        { status: error.statusCode }
      );
    }

    console.error("Unhandled error:", error);

    return Response.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
