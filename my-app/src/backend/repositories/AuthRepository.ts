import { BaseRepository } from "./BaseRepository";

export class AuthRepository extends BaseRepository {
  async findByEmail(email: string) {
    return this.prisma.user.findUnique({ where: { email } });
  }

  async createUser(data: {
    name: string;
    email: string;
    passwordHash: string;
  }) {
    return this.prisma.user.create({ data });
  }

  async findById(id: string) {
    return this.prisma.user.findUnique({ where: { id } });
  }
}
