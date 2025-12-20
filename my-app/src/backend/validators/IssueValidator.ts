import { BaseValidator } from "./BaseValidator";

export type CreateIssueInput = {
  title: string;
  description: string;
  type: "CLOUD_SECURITY" | "REDTEAM_ASSESSMENT" | "VAPT";
  priority?: number;
};

export type UpdateIssueInput = Partial<CreateIssueInput> & {
  status?: "OPEN" | "IN_PROGRESS" | "RESOLVED";
};

export class IssueValidator extends BaseValidator<any> {
  validateCreate(data: any): CreateIssueInput {
    if (!data?.title || !data?.description || !data?.type) {
      this.throw("title, description and type are required");
    }

    return data;
  }

  validateUpdate(data: any): UpdateIssueInput {
    if (!data || Object.keys(data).length === 0) {
      this.throw("At least one field must be provided");
    }

    return data;
  }
}
