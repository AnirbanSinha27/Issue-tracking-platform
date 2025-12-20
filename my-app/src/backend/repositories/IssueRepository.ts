import { BaseRepository } from "./BaseRepository";
import { IssueType, IssueStatus, Prisma } from "@prisma/client";

export class IssueRepository extends BaseRepository {
  async create(data: {
    title: string;
    description: string;
    type: IssueType;
    priority?: number;
    userId: string;
  }) {
    return this.prisma.issue.create({ data });
  }

  async findAllByUser(userId: string, type?: IssueType) {
    return this.prisma.issue.findMany({
      where: {
        userId,
        ...(type ? { type } : {}),
      },
      orderBy: { createdAt: "desc" },
    });
  }

  async findById(id: string, userId: string) {
    return this.prisma.issue.findFirst({
      where: { id, userId },
    });
  }

  async update(
    id: string,
    userId: string,
    data: Prisma.IssueUpdateInput
  ) {
    return this.prisma.issue.updateMany({
      where: { id, userId },
      data,
    });
  }

  async delete(id: string, userId: string) {
    return this.prisma.issue.deleteMany({
      where: { id, userId },
    });
  }
}
