import { AuthHandler } from "@/src/backend/handlers/AuthHandler";
import { AuthService } from "@/src/backend/services/AuthService";
import { AuthRepository } from "@/src/backend/repositories/AuthRepository";
import { AuthValidator } from "@/src/backend/validators/AuthValidator";


const handler = new AuthHandler(
  new AuthService(new AuthRepository()),
  new AuthValidator()
);

export async function POST(req: Request) {
  return handler.handle(req);
}
