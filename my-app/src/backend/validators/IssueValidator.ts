import { BaseValidator } from "./BaseValidator";
import { IssueType, IssueStatus } from "@prisma/client";

export type CreateIssueInput = {
  title: string;
  description: string;
  type: IssueType;
  priority?: number;
};

export type UpdateIssueInput = Partial<CreateIssueInput> & {
  status?: IssueStatus;
};

export class IssueValidator extends BaseValidator<CreateIssueInput | UpdateIssueInput> {
  validate(data: unknown): CreateIssueInput | UpdateIssueInput {
    if (typeof data !== "object" || data === null) {
      this.throw("Invalid input data");
    }
    return data as CreateIssueInput | UpdateIssueInput;
  }

  validateCreate(data: unknown): CreateIssueInput {
    if (typeof data !== "object" || data === null) {
      this.throw("Invalid input data");
    }

    const input = data as Record<string, unknown>;

    if (!input.title || typeof input.title !== "string") {
      this.throw("title is required and must be a string");
    }

    if (!input.description || typeof input.description !== "string") {
      this.throw("description is required and must be a string");
    }

    if (!input.type || typeof input.type !== "string") {
      this.throw("type is required and must be a string");
    }

    const validTypes: IssueType[] = [
      "CLOUD_SECURITY",
      "REDTEAM_ASSESSMENT",
      "VAPT",
    ];
    if (!validTypes.includes(input.type as IssueType)) {
      this.throw(
        `type must be one of: ${validTypes.join(", ")}`
      );
    }

    if (input.priority !== undefined && typeof input.priority !== "number") {
      this.throw("priority must be a number");
    }

    return {
      title: input.title,
      description: input.description,
      type: input.type as IssueType,
      priority: input.priority as number | undefined,
    };
  }

  validateUpdate(data: unknown): UpdateIssueInput {
    if (typeof data !== "object" || data === null) {
      this.throw("Invalid input data");
    }

    const input = data as Record<string, unknown>;

    if (Object.keys(input).length === 0) {
      this.throw("At least one field must be provided");
    }

    const result: UpdateIssueInput = {};

    if (input.title !== undefined) {
      if (typeof input.title !== "string") {
        this.throw("title must be a string");
      }
      result.title = input.title;
    }

    if (input.description !== undefined) {
      if (typeof input.description !== "string") {
        this.throw("description must be a string");
      }
      result.description = input.description;
    }

    if (input.type !== undefined) {
      if (typeof input.type !== "string") {
        this.throw("type must be a string");
      }
      const validTypes: IssueType[] = [
        "CLOUD_SECURITY",
        "REDTEAM_ASSESSMENT",
        "VAPT",
      ];
      if (!validTypes.includes(input.type as IssueType)) {
        this.throw(
          `type must be one of: ${validTypes.join(", ")}`
        );
      }
      result.type = input.type as IssueType;
    }

    if (input.status !== undefined) {
      if (typeof input.status !== "string") {
        this.throw("status must be a string");
      }
      const validStatuses: IssueStatus[] = [
        "OPEN",
        "IN_PROGRESS",
        "RESOLVED",
      ];
      if (!validStatuses.includes(input.status as IssueStatus)) {
        this.throw(
          `status must be one of: ${validStatuses.join(", ")}`
        );
      }
      result.status = input.status as IssueStatus;
    }

    if (input.priority !== undefined) {
      if (typeof input.priority !== "number") {
        this.throw("priority must be a number");
      }
      result.priority = input.priority;
    }

    return result;
  }
}
