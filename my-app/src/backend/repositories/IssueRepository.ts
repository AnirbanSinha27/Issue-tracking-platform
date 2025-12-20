import { BaseRepository } from "./BaseRepository";

export class IssueRepository extends BaseRepository {
  async create(data: {
    title: string;
    description: string;
    type: any;
    priority?: number;
    userId: string;
  }) {
    return this.prisma.issue.create({ data });
  }

  async findAllByUser(userId: string, type?: string) {
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

  async update(id: string, userId: string, data: any) {
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
