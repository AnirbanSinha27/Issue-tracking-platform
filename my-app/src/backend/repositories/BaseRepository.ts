import { prisma } from "@/src/lib/prisma";

export abstract class BaseRepository {
  protected prisma = prisma;
}
