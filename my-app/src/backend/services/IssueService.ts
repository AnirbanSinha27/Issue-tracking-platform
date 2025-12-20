import { IssueRepository } from "../repositories/IssueRepository";
import { ApiError } from "../errors/ApiError";
import { EmailService } from "./EmailService";
import { CreateIssueInput, UpdateIssueInput } from "../validators/IssueValidator";
import { IssueType } from "@prisma/client";
import { prisma } from "@/src/lib/prisma";

export class IssueService {
  constructor(
    private readonly repo: IssueRepository,
    private readonly emailService = new EmailService()
  ) {}

  async create(userId: string, input: CreateIssueInput) {
    const issue = await this.repo.create({
      ...input,
      userId,
    });

    // Send email notification asynchronously
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (user) {
      this.emailService.sendIssueCreatedEmail(user.email, {
        title: issue.title,
        type: issue.type,
        description: issue.description,
      }).catch(console.error);
    }

    return issue;
  }

  async list(userId: string, type?: string) {
    const issueType = type as IssueType | undefined;
    return this.repo.findAllByUser(userId, issueType);
  }

  async getById(userId: string, issueId: string) {
    const issue = await this.repo.findById(issueId, userId);
    if (!issue) {
      throw new ApiError("Issue not found", 404);
    }
    return issue;
  }

  async update(userId: string, issueId: string, data: UpdateIssueInput) {
    const result = await this.repo.update(issueId, userId, data);
    if (result.count === 0) {
      throw new ApiError("Issue not found", 404);
    }
    return result;
  }

  async delete(userId: string, issueId: string) {
    const result = await this.repo.delete(issueId, userId);
    if (result.count === 0) {
      throw new ApiError("Issue not found", 404);
    }
    return;
  }
}
