import { UseGuards } from "@nestjs/common";
import { AuthorizedGuard, UnAuthorizedGuard } from "@repo/backend/middlewares/auth.guard.js";

export function Unauthorized() {
  return UseGuards(UnAuthorizedGuard);
}

export function Authorized() {
  return UseGuards(AuthorizedGuard);
}
