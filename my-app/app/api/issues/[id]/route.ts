export const runtime = "nodejs";

import { IssueHandler } from "@/src/backend/handlers/IssueHandler";
import { IssueService } from "@/src/backend/services/IssueService";
import { IssueRepository } from "@/src/backend/repositories/IssueRepository";
import { IssueValidator } from "@/src/backend/validators/IssueValidator";

const handler = new IssueHandler(
  new IssueService(new IssueRepository()),
  new IssueValidator()
);

export async function GET(req: Request) {
  return handler.handle(req);
}

export async function PUT(req: Request) {
  return handler.handle(req);
}

export async function DELETE(req: Request) {
  return handler.handle(req);
}
