import { IssueRepository } from "../repositories/IssueRepository";
import { ApiError } from "../errors/ApiError";

export class IssueService {
  constructor(private readonly repo: IssueRepository) {}

  async create(userId: string, input: any) {
    return this.repo.create({
      ...input,
      userId,
    });
  }

  async list(userId: string, type?: string) {
    return this.repo.findAllByUser(userId, type);
  }

  async getById(userId: string, issueId: string) {
    const issue = await this.repo.findById(issueId, userId);
    if (!issue) {
      throw new ApiError("Issue not found", 404);
    }
    return issue;
  }

  async update(userId: string, issueId: string, data: any) {
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
