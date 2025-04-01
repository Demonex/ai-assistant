import { UseGuards } from "@nestjs/common";
import {
	AuthorizedGuard,
	UnAuthorizedGuard,
	ApiKeyGuard,
	UserEmailGuard,
} from "@repo/backend/middlewares/auth.guard.js";

export function Unauthorized() {
	return UseGuards(UnAuthorizedGuard);
}

export function Authorized() {
	return UseGuards(AuthorizedGuard);
}

export function ApiKey() {
	return UseGuards(ApiKeyGuard);
}

export function UserEmailKey() {
	return UseGuards(UserEmailGuard);
}
