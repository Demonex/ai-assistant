import {
	type ExecutionContext,
	HttpException,
	HttpStatus,
	createParamDecorator,
} from "@nestjs/common";
import { get } from "lodash-es";

import { HttpStatusMessages } from "../messages/http.js";

export const UserId = createParamDecorator(
	(key: string, ctx: ExecutionContext): number => {
		return Number(get(ctx.switchToHttp().getRequest(), "session.user.id"));
	},
);
export const TenantId = createParamDecorator(
	(key: string, ctx: ExecutionContext): number => {
		const res = Number(
			get(ctx.switchToHttp().getRequest(), "headers.x-tenant", 1),
		);
		if (Number.isNaN(res)) {
			throw new HttpException(
				HttpStatusMessages.BAD_REQUEST,
				HttpStatus.BAD_REQUEST,
			);
		}

		return res;
	},
);
export const ExternalEmail = createParamDecorator(
	(_key: string, ctx: ExecutionContext): number | undefined => {
		return get(ctx.switchToHttp().getRequest(), "headers.x-ad-user");
	},
);
export const UserEmail = createParamDecorator(
	(_key: string, ctx: ExecutionContext): number | undefined => {
		return get(ctx.switchToHttp().getRequest(), "session.user.email");
	},
);
