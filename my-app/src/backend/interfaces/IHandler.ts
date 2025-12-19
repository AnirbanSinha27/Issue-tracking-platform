export interface IHandler {
    handle(req: Request, context?: any): Promise<Response>;
  }
  