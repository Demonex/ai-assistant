import {
	type CanActivate,
	type ExecutionContext,
	HttpException,
	HttpStatus,
	Injectable,
	UnauthorizedException,
} from "@nestjs/common";
import { HttpStatusMessages } from "@repo/backend/messages/http.js";

@Injectable()
export class ApiKeyGuard implements CanActivate {
	canActivate(context: ExecutionContext): boolean | Promise<boolean> {
		const request = context.switchToHttp().getRequest();
		const apiKey = request.headers["x-api-key"];

		if (!apiKey) {
			throw new UnauthorizedException("API Key is missing");
		}

		if (apiKey !== "your-secret-api-key-123sigma") {
			// лучше хранить в .env
			throw new UnauthorizedException("Invalid API Key");
		}

		return true;
	}
}

@Injectable()
export class UserEmailGuard implements CanActivate {
	canActivate(context: ExecutionContext): boolean | Promise<boolean> {
		const request = context.switchToHttp().getRequest();
		const userEmailKey = request.headers["x-ad-user"];

		if (!userEmailKey) {
			throw new UnauthorizedException("Key is missing");
		}

		return true;
	}
}

@Injectable()
export class AuthorizedGuard implements CanActivate {
	canActivate(context: ExecutionContext): boolean {
		const { session } = context.switchToHttp().getRequest();
		const authorized = session.user;
		if (!authorized) {
			throw new HttpException(
				{
					statusCode: HttpStatus.UNAUTHORIZED,
					// message:[headers['cookie'].includes('i18n_redirected=ru')? HttpStatusMessagesRu.UNAUTHORIZED: HttpStatusMessages.UNAUTHORIZED]
					message: HttpStatusMessages.UNAUTHORIZED,
				},
				HttpStatus.UNAUTHORIZED,
			);
		}
		return true;
	}
}

@Injectable()
export class UnAuthorizedGuard implements CanActivate {
	canActivate(context: ExecutionContext): boolean {
		const { session } = context.switchToHttp().getRequest();
		const unAuthorized = !session.user;
		if (!unAuthorized) {
			throw new HttpException(
				{
					statusCode: HttpStatus.METHOD_NOT_ALLOWED,
					// message:[headers['cookie'].includes('i18n_redirected=ru')? HttpStatusMessagesRu.METHOD_NOT_ALLOWED: HttpStatusMessages.METHOD_NOT_ALLOWED]
					message: HttpStatusMessages.METHOD_NOT_ALLOWED,
				},
				HttpStatus.METHOD_NOT_ALLOWED,
			);
		}
		return unAuthorized;
	}
}
